var selectArr = [];

//全局  网格名称code
var grid;

var marker ;
$(function(){
	var  emap = showEmap(nowOrgId,"main",callBack);
	var mapObj= null;
	initResbtn();
	initDetailBtn();
	initIdxStatus();
	initIdxTable();
	
	
	function callBack(_orgId,orgLevel){
		nowOrgId = _orgId;
		  if(orgLevel=="4"){//当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
		   }else{
			   mapObj=this.next();
			   initIdxGridList();
			   initGridName();
		   }
	}
	
	function initDetailBtn(){
		$("#idx_detailBtn").click(function(){
			var gridCode = $("#idx_gridName").val();
			var chnCode = $("#idx_chnlName").val();
			topwindow.showWindow({
				title : "详细信息",
				url : $.cxt + "/pages/gis/contract/detail.jsp",
				datatype : "json",
				mtype : "POST",
				data : {
//					unitIdArr : unit_arr,//基础单元id数组(字符串)
					"gridCode" : gridCode,//网格code
					"channelCode" : chnCode//渠道名称Code
				},
	    	});	
			
			
		})
	}
	
	function initResbtn(){
		$("#resbtn").click(function(){
			if($("#resbtn").hasClass("fa-angle-double-right")){
				closeRight();
			}else{
				openRight();
			}
			
			
		})
	}
    function closeRight(){
    	$("#rightpanel").hide();
		$("#main").animate({width:"100%"},function(){
		 
				mapObj.resize();
			 
			
		});
		$("#resbtn").animate({right:"0px"});
		$("#resbtn").removeClass("fa-angle-double-right");
		$("#resbtn").addClass("fa-angle-double-left");
    }
    function openRight(){
    	$("#main").animate({width:"65%"},function(){
			$("#rightpanel").show();
			 
				mapObj.resize();
			 
			});
		$("#resbtn").animate({right:"35%"});
		
		$("#resbtn").addClass("fa-angle-double-right");
		$("#resbtn").removeClass("fa-angle-double-left");
    }
	
    function initIdxGridList(){
    	$.ajax({
			  url:$.cxt + "/contract/getIndexGridList", 
			  data:{"pid":nowOrgId},
			  type: "POST",
			  async:false,
			  success : function (list){
				 
				 var gridNameSel= $("#idx_gridName");
				 gridNameSel.empty();
				 for(var i=0,n=list.length;i<n;i++){
					 var grid =list[i];
					 var option= $("<option value='"+grid.ORG_ID+"' typeData ='"+grid.TYPE_ID+"'>"+grid.NAME+"</option>");
					if(i==0){
						option.attr("selected","selected");
					}
					 gridNameSel.append(option);
				 }
				 gridNameSel.off("change");
				 gridNameSel.on("change",initGridName);
				 if(list.length>0){
					 initIdxChnlName();
					 setIdxGridType();
				 }
			  }
		});
    }
    function setIdxGridType(){
    	var option = $("#idx_gridName").find("option:selected");
    	var typeId = option.attr("typeData");
    	var gridType="";
    	$("#idx_gridType").empty();
    	if(typeId=="1"){
    		gridType ="一类网格";
    	}else if(typeId=="2"){
    		gridType ="二类网格";
    	}else if(typeId=="3"){
    		gridType ="三类网格";
    	}
    	
    	$("#idx_gridType").append("<option value='A'>"+gridType+"</option>");
    	
    }
    function initIdxStatus(){
    	$("#idx_status").empty();
    	$("#idx_status").append("<option value='A'>未签约</option>");
    	$("#idx_status").append("<option value='F'>签约中</option>");
    	$("#idx_status").append("<option value='S'>已签约</option>");
    	$("#idx_status").append("<option value='R'>被退回</option>");
    	$("#idx_status").chosen();
    	$("#idx_status").trigger('chosen:updated');
    }
    
    function initIdxChnlName(){
    	var gridCode = $("#idx_gridName").val();
    	if(gridCode==""){
    		return;
    	}
    	$.ajax({
			  url:$.cxt + "/contract/getIndexChannelList", 
			  data:{"gridCode":gridCode},
			  type: "POST",
			  async:false,
			  success : function (list){
				 var chnlNameSel= $("#idx_chnlName");
				 chnlNameSel.empty();
				 chnlNameSel.append("<option value=''>不设置</option>")
				 for(var i=0,n=list.length;i<n;i++){
					 var chnl =list[i];
					 var option= $("<option value='"+chnl.CHNL_CODE+"' >"+chnl.CHNL_NAME+"</option>");
					chnlNameSel.append(option);
				 }
				 chnlNameSel.off("change");
				 chnlNameSel.on("change",channelAndStatusChange)
			  }
		});
    	
    }
    
    function initIdxTable(){
    	$('#idx_table').jqGrid({
    		data : [],
			datatype : "local",
    		height : "auto",
    		autowidth : true,
    		colNames : [ '网格名称', '渠道名称','一级分类','二级分类','基础单元名称','基础单元地址','基础单元类型','基础单元ID','操作','渠道code','bigType','chanStatus','包保对象类型'],
    		colModel : [ 
    		      {name : 'GRID_NAME',align : 'center'}, 
    		      {name : 'CHNL_NAME',align : 'center'}, 
    		      {name : 'CHNL_TYPE',align : 'center'}, 
    		      {name : 'CHNL_TYPE_LEVEL2',align : 'center'}, 
    		      {name : 'PHYSICAL_NAME',align : 'center'}, 
    		      {name : 'ADDRESS',align : 'center'}, 
    		      {name : 'BIG_TYPE',align : 'center',hidden : true}, 
    		      {name : 'PHYSICAL_ID',align : 'center',hidden : true}, 
    		      {name : 'edit',align : 'center',formatter : stateOperation}, 
    		      {name : 'CHNL_CODE',align : 'center',hidden : true}, 
    		      {name : 'BIG_TYPE',align : 'center',hidden : true}, 
    		      {name : 'STATUS',align : 'center',hidden : true}, 
    		      {name : 'OBJ_TYPE',align : 'center',hidden : true}, 
    		     ],
    		//多选框，
    		multiselect: true,
    		//cellEdit: true,
    		//true的时候
    		//multiboxonly: true,
    		viewrecords : true,
    		rownumbers: true,
    		rowNum : 10,
    		rowList : [ 10, 20, 30 ],
    		multiselect: true,  					//这个是前面复选框显示的
    		pager : '#idx_grid-pager',
    		loadComplete : topjqGridLoadComplete,  //这里是上下页箭头显示的
    		pagerpos: 'left' ,
    		recordpos:'center',    
    		
    		gridComplete:function() {
			    var _this = this;
			    var rowData = $(_this).jqGrid('getRowData');
			    for(var i =0,n=rowData.length;i<n;i++){
			    	var obj = rowData[i];
			    	if(selectArr[obj.PHYSICAL_ID]){
			    		 $(_this).jqGrid('setSelection',i+1,false);
			    	}
			    }
			},
    		
    		onSelectRow : function(rowid, status){
    			
				var obj = $(this).jqGrid('getRowData',rowid);
			    if(status){
			    	selectArr[obj.PHYSICAL_ID]=obj;
			    }else{
			    	if(selectArr[obj.PHYSICAL_ID]){
			    		delete  selectArr[obj.PHYSICAL_ID];
			    	} 
			    }
    			
    			//获取鼠标选中行数据
    			var rowData = $("#idx_table").jqGrid('getRowData',rowid); 
    			//获取这行的基础单元id
    			var unitId = rowData.PHYSICAL_ID;
    			//使用ajax，查询这行数据的经度和纬度
    			 $.ajax({
						url : $.cxt + "/channel/selectLngAndLat",
						dataType : "json",
					 	type : "POST",
					 	data : {uid:unitId},
					 	success : function(obj){
					 		
					 		//获取后台传过来的经度
					 		var lng = obj.LNG;
					 		//获取纬度
					 		var lat = obj.LAT;
					 		//百度地图api    main是jsp的div
					 		var map =  mapObj.getModel().getComponent('bmap').getBMap();
					 		//获取所有的标记， 这里其实是只有一个的，
					 		//map.getOverlay()
					 		/*var allOverlay = map.getOverlays();
					 		//清空所有以前标记了的中心点
				 	        for(var i = 0;i<allOverlay.length;i++) {
				 	            map.removeOverlay(allOverlay[i]);
				 	        }*/
					 		if(marker){
					 			 map.removeOverlay(marker);
					 		}
					 		//设置中心点
					 		var point = new BMap.Point(lng,lat);
					 		//后面的数字是级别，级别越小，比例尺越大，  设置中心点
					 		map.centerAndZoom(point,15);
					 		//添加标注
					 		marker = new BMap.Marker(point);
					 		//将标注添加到地图中
					 		map.addOverlay(marker);
					 		//设置标注不可拖拽
					 		marker.disableDragging();
					 	}
					 });
    		},
    		onSelectAll:function(aRowids,status) {
	            var _this = this;
	            var rowData = $(_this).jqGrid('getRowData');
	            for(var i=0,n=rowData.length;i<n;i++){
	            	var obj = rowData[i];
	            	if(status){
	            		selectArr[obj.PHYSICAL_ID]=obj;
		            }else{
		            	if(selectArr[obj.PHYSICAL_ID]){
		            		delete  selectArr[obj.PHYSICAL_ID];
				    	} 
		            }    
	            }
	                   
	        },
    	
    			
    	
    	});
    	
    }

    function initGridName(){
    	initIdxChnlName();
    	setIdxGridType();
    	channelAndStatusChange();
    }
    
    //状态改变时
    $("#idx_status").on("change", channelAndStatusChange); 
    
    //点击发起签约
    $("#signing").click(function(){
    	//网格名称code
    	var gridCode = $("#idx_gridName").val();
    	
    	//渠道名称code
    	var chnlNameCode = $("#idx_chnlName").val();
    	if(chnlNameCode === null || chnlNameCode === undefined || chnlNameCode === ''){
    		messageAlert("渠道名称不能为空");
    		return false;
    	}
    	
    	
    	//接收基础单元id
    	var unitIdArr = [];
    	//接收渠道名称
    	var channelNameArr = [];
    	
    	var objType = ""
     
    	var isEmpty = $.isEmptyObject(selectArr);
    	if(isEmpty){
    		messageAlert("至少选择一条数据");
    		return false;
    	}
    	//获取选择的每一行id
    		
    	for(key in selectArr){
        	//获取这一行的数据，这个rowId就是数组中的每一个，
        	var rowData = selectArr[key];
//        	alert(JSON.stringify(rowData));
        	var physicalId = rowData.PHYSICAL_ID;
//        	alert("基础单元id--》"+physicalId);
        	var channelName = rowData.CHNL_NAME;
        	var objType = rowData.OBJ_TYPE;
        	var chanStatus = rowData.STATUS;
        	if(chanStatus == "F" || chanStatus =="S"){
        		messageAlert("请选择未签约的数据");
        		return false;
        	}
        	//把每一个基础单元id放到数组中，再将数组传递到后台
        	unitIdArr.push(physicalId);
        	channelNameArr.push(channelName);
    	}
    	
//    	alert("数组-----》"+JSON.stringify(unitIdArr));
//    	alert("gridCode="+gridCode);
//    	alert("chnlNameCode="+chnlNameCode);
    	var unit_arr = JSON.stringify(unitIdArr);
    	console.log(objType)
//    	alert(unit_arr);
    	//使用Set集合去重
    	var oldChannelNameArr = Array.from(new Set(channelNameArr));
//    	alert("去重后的长度---"+oldChannelNameArr.length)
    	if(oldChannelNameArr.length != 1){
    		messageAlert("必须是同一渠道");
    		return false;
    	}
//    	return false;
    	topwindow.showWindow({
    		title : "发起签约",
			url : $.cxt + "/pages/gis/contract/agency.jsp?unitIdArr="+unit_arr,
			datatype : "json",
			mtype : "POST",
			data : {
//				unitIdArr : unit_arr,//基础单元id数组(字符串)
				gridCode : gridCode,//网格code
				chnlNameCode : chnlNameCode,//渠道名称Code
				objType:objType//包保对象类型 1直销经理 0渠道
			},
    	});	
//    	channelAndStatusChange();
    });
    
	/*//网格名称改变
	$("#idx_gridName").on("change",gridCodeChange);
	//渠道名称改变
	$("#idx_chnlName").on("change",function(){alert();channelAndStatusChange()});
	//状态改变
	$("#idx_status").on("change",function(){channelAndStatusChange()});*/
	
    //点击包保，转到另一个jsp
    $("#baobao").click(function(){
    	var uid = "";
    	topwindow.showWindow({
    		title : "基础单元列表",
			url : $.cxt + "/pages/gis/contract/contractPane.jsp",
			datatype : "json",
			mtype : "POST",
			bottons : [
						{
							title : "重置",
							fun : function() {
								selectedArr = [];
								$("#pane_grid_table").jqGrid('resetSelection'); 
//								topwindow.removeWindow();
							}
						},{
							title : "确定",
							fun : function() {
								
								var keys = [];
								for (var property in selectedArr)
								keys.push(property);
								console.log(property)

								if(keys.length==0){
									messageAlert("至少选定一个基础单元!")
									return ;
								}

								var StaitionList = []
								for(var i =0 ;i<keys.length ;i++){
									StaitionList[i]=selectedArr[keys[i]]
								}
								console.log(StaitionList)
								var jsonStationStr=JSON.stringify(StaitionList)
								var gridNameOption= $("#pane_gridNameId").find("option:selected");
								var gridCode = gridNameOption.val()
									topwindow.showWindow({
										title : "渠道列表",
										width : 1000,
										url : $.cxt + "/pages/gis/contract/channelList.jsp",
										datatype: "json",
										mtype: "POST",
										data : {gridCode:grid},
										bottons : [{
											title : "确定", 
											fun : function(){
											var ids = $("#channelTable").jqGrid('getGridParam','selarrrow');
											if(ids.length > 1){
												messageAlert("只能选择一行数据");
												return false;
											}
											if(ids.length < 1){
												messageAlert("必须选择一行数据");
												return false;
											}
											var rowId=$("#channelTable").jqGrid('getGridParam','selrow');
											var rowData = $("#channelTable").jqGrid('getRowData',rowId);
											var jsonStr = JSON.stringify(rowData);	
											var selectArrStr = JSON.stringify(selectArrStr)
												topshowdialog("是否确定将选中的基础单元包保给该渠道？", function(){
	 												$.ajax({
	 													url : $.cxt + "/channel/insertMsContractArea",
	 													dataType : "json",
	 												 	type : "POST",
	 												 	data : {jsonStr:jsonStr,jsonStationStr:jsonStationStr,gridCode:gridCode},
	 												 	success : function(json){
	 															topshowAlertSuccessDiv();//操作提示
	 															topwindow.removeWindow();//关闭窗口
	 															topwindow.removeWindow();//关闭窗口
	 															//重新加载
	 															channelAndStatusChange();
	 //															$("#pane_grid_table").trigger("reloadGrid");//刷新父窗口，重新查询
	 												 	}
	 												 });
	 												});
											} 
											
										}]
									});

							}
						} ]
    	});	
    });
    
    
    //重置   取消选中
    $("#reset").click(function(){
    	selectArr = [];
    	$("#idx_table").jqGrid('resetSelection'); 
    });
    
    //用于接收每一个数据(可以是id，也可以是对象)
	var arr = [];
    //删除操作
    $("#delete").click(function (){
    	var isEmpty = $.isEmptyObject(selectArr);
    	if(isEmpty){
    		messageAlert("至少选择一条数据");
    		return false;
    	}
    	
    	//获取选择的每一行id
    	for(var key in selectArr){
        	//获取这一行的数据，这个rowId就是数组中的每一个，
        	var rowData = selectArr[key];
        	var status = rowData.STATUS;
        	if(status == "F" || status == "S"){
        		messageAlert("该数据不允许删除");
        		return false;
        	}
//        	alert(JSON.stringify(rowData));
        	var physicalId = rowData.PHYSICAL_ID;
        	//把每一个基础单元id放到数组中，再将数组传递到后台
        	arr.push(physicalId);
    	}
    	
    	var uid = JSON.stringify(arr);

    	topshowdialog("确认删除？", function(){
			 // 通过ajax将这行数据传递到后台，保存到数据库
					$.ajax({
					url : $.cxt + "/channel/deleteMsContractAreaByIds",
					dataType : "json",
					type : "POST",
					data : {ids : uid},
					success : function(json) {
					var data = JSON.parse(json);
						if (data.code == '0') {
							topwindow.removeWindow();//关闭窗口
							topshowAlertSuccessDiv();//操作提示
							//刷新父窗口，重新查询
							$("#idx_table").trigger("reloadGrid");
								}
							}
						});
					topwindow.removeWindow();
    			});
    	
    }); 
    
});


function stateOperation(cellvalue, options, rowObject) {
//	    console.log(cellvalue);  //当前cell的值
//	    console.log(options);	//该cell的options设置，包括{rowId, colModel,pos,gid}
//	    console.log(rowObject);  //当前cell所在row的值，如{ id=1, name="name1", price=123.1, ...}就是当前行对象
//		jsonStr = JSON.stringify(rowObject);//需要修改的对象，转成json，传到后台
		var html =""
		var status = rowObject.STATUS;
		if (rowObject.BIG_TYPE=='家居小区'){
			html += "<a    onclick=\"showHouse('" + rowObject.PHYSICAL_ID+ "')\" href=\"#\">查看</a>";
			if(status == "F" || status == "S"){
				html += " <a    href=\"#\" style=\"color : lightblue\">修改</a>"
			}else{
				html += " <a    onclick=\"updateChannelInfo('" + rowObject.PHYSICAL_ID+ "')\" href=\"#\">修改</a>";
			}
	        return  html
		}else if(rowObject.BIG_TYPE=='文化教育'){
			html += "<a    onclick=\"showSchool('" + rowObject.PHYSICAL_ID+ "')\" href=\"#\">查看</a>"
			if(status == "F" || status == "S"){
				html += " <a    href=\"#\" style=\"color : lightblue\">修改</a>"
			}else{
				html += " <a    onclick=\"updateChannelInfo('" + rowObject.PHYSICAL_ID+ "')\" href=\"#\">修改</a>";
			}
	        return  html    
		}else{
			html += "<a    href=\"#\" style=\"color : lightblue\">查看</a>"
				if(status == "F" || status == "S"){
					html += " <a    href=\"#\" style=\"color : lightblue\">修改</a>"
				}else{
					html += " <a    onclick=\"updateChannelInfo('" + rowObject.PHYSICAL_ID+ "')\" href=\"#\">修改</a>";
				}
	        return  html
		}
	}

function showChannelInfo(rowObject){
	//这个是获取所有行
	var  object = $("#idx_table").jqGrid('getRowData');
	//获取选择的每一行id
	for(var i = 0; i < object.length; i++){
		//这里是获取每一行数据
		var rowObj = object[i];
    	//获取这一行的数据的一个字段
    	var big_type = rowObj.BIG_TYPE;
    	//获取唯一id
    	var uid =  rowObj.PHYSICAL_ID
    	//判断这个字段的值
    	if(big_type=='家居小区'){
    		showHouse(uid);
    	}else if(big_type=='文化教育'){
    		showSchool(uid);
    	}else{
    		var a = $("#showId").attr("disabled",true);
    	}
    	
	}
	
}



function updateChannelInfo(unitId) {
	var gridCode= $("#idx_gridName").val();
	topwindow.showWindow({
				title : "渠道列表",
				width : 1000,
				url : $.cxt + "/pages/gis/contract/channelList.jsp",
				datatype : "json",
				mtype : "POST",
				data : {
					uid : unitId
				},
				bottons : [ {
					title : "确定",
					fun : function() {
						// 获取选择的行数，如果大于1，提示有误 (获得选中行的ID数组：)
						var ids = $("#channelTable").jqGrid('getGridParam',
								'selarrrow');
						if (ids.length > 1) {
							messageAlert("只能选择一行数据");
							return false;
						}
						if (ids.length < 1) {
							messageAlert("至少选择一行数据");
							return false;
						}
						// 获取选择的行id
						var rowId = $("#channelTable").jqGrid('getGridParam',
								'selrow');
						// 获取这一行的数据
						var rowData = $("#channelTable").jqGrid('getRowData',
								rowId);
						// 将object对象转成json字符串，将这个需要插入的数据传递到后台
						var jsonStr = JSON.stringify(rowData);
						
						topshowdialog("是否确定将选中的基础单元包保给该渠道？", function(){
							// 通过ajax将这行数据传递到后台，保存到数据库
							$.ajax({
										url : $.cxt + "/channel/updateMsContractArea",
										dataType : "json",
										type : "POST",
										data : {
											jsonUnit : jsonStr,
											unitId : unitId,//基础单元编码,
											gridCode : gridCode//不确定这里是否需要传递网格名称code
										},
										success : function(json) {
											var data = JSON.parse(json);
											if (data.code == '0') {
												topwindow.removeWindow();//关闭窗口
												topshowAlertSuccessDiv();//操作提示
												//刷新父窗口，重新查询
												//flushTabel();
												channelAndStatusChange();
											}
										}
									});
							//把窗口除去
							topwindow.removeWindow();
							});
					}
				} ]
			});

}


function messageAlert(message){
	bootbox.dialog({
        message: "<span style=\"color:#000\">"+message+"</span>",
        title: "消息提示",
        buttons: {
            OK: {
                label: "确定",
                className: "btn-success",
            }
        }
    });
}

//展示小区信息
function showHouse(physicalId){
	topwindow.showWindow({
		title : "小区信息",
		width : 1000,
		url : $.cxt + "/pages/gis/layer/house.jsp",
		datatype: "json",
		mtype: "POST",
		data : {physicalId:physicalId},
	})
}

//展示学校信息
function showSchool(physicalId){
	var level = "3";
	topwindow.showWindow({
		title : "学校信息",
		width : 1000,
		url : $.cxt + "/gridCommon/selectSchoolOrHouse",
		datatype: "json",
		mtype: "POST",
		height : 200,
		width : 650,
		data : {physicalId:physicalId,level:level},
	})
}


//当网格名称。渠道名称，状态改变时，重新加载
function gridCodeChange(){
	var chnlCode = "";
	var gridCode = $("#idx_gridName").val();
	var status= $("#idx_status").val();
	//将状态所选数组，转成字符串
	var state = JSON.stringify(status); 
	//每次重新加载表格，清空选中数组
	selectArr = [];
	$("#idx_table").jqGrid('clearGridData');
	$("#idx_table").jqGrid('setGridParam',{ // 重新加载数据
		url : $.cxt + "/contract/getIndexTable",
		postData : {gridCode:gridCode,chnlCode:chnlCode,statusArr:state}, //  data 是符合格式要求的需要重新加载的数据 
		datatype : "json",
		mtype: "POST",
		page : 1
	}).trigger("reloadGrid");
}


//当网格名称。渠道名称，状态改变时，重新加载
function channelAndStatusChange(){
	var gridCode = $("#idx_gridName").val();
	var chnlCode = $("#idx_chnlName").val();
	var status= $("#idx_status").val();
	//将状态所选数组，转成字符串
	var state = JSON.stringify(status); 
	//每次重新加载表格，清空选中数组
	selectArr = [];
	$("#idx_table").jqGrid('clearGridData');
	$("#idx_table").jqGrid('setGridParam',{ // 重新加载数据
		url : $.cxt + "/contract/getIndexTable",
		postData : {gridCode:gridCode,chnlCode:chnlCode,statusArr:state}, //  data 是符合格式要求的需要重新加载的数据 
		datatype : "json",
		mtype: "POST",
		page : 1
	}).trigger("reloadGrid");
}



