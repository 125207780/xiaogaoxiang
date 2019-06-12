var mapObj;

var marker ;
var selectArr=[];
$(function(){
	var  emap = showEmap(nowOrgId,"main",callBack);
	mapObj= null;
	
	function callBack(_orgId,orgLevel){
		nowOrgId = _orgId;
		  if(orgLevel=="4"){//当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
		   }else{
			   mapObj=this.next();
			   initIdxGridList();
			   initIdxTable();
		   }
	}
	
	$("#idx_detailBtn").click(function(){
		doSearch();
	});
	$("#confrimsign").click(function(){
		
		var flag= $("#batch").val();
		if(flag==null||flag==undefined||flag==""){
			 messageAlert("没有可以签约的渠道");
			 return false;
		}
		var isEmpty = $.isEmptyObject(selectArr);
		var ids1 = $("#idx_table").jqGrid('getGridParam','selarrrow');
		if(ids1.length==0){
			var SIGNING_ID=$("#batch").val();
			topshowdialog("是否确定全部退签？", function(){
					$.ajax({
						url:$.cxt + "/firstPage/updateStatusRturnAll", 
				  		data:{"signingId":SIGNING_ID},
                        dataType : "json",
					 	type : "POST",
					 	success : function(json){
								topshowAlertSuccessDiv();//操作提示
								topwindow.removeWindow();//关闭窗口
								topwindow.removeWindow();//关闭窗口
								//重新加载
								//channelAndStatusChange();
								initIdxGridList();
								doSearch();
								messageAlert("退签成功");
								return false;

					 	}
					 });
					});
		}
		var ids = $("#idx_table").jqGrid('getGridParam','selarrrow');//多条选中行的数据
		//var rowId=$("#idx_table").jqGrid('getGridParam','selrow');//一行选中行的数据
		//var rowData = $("#idx_table").jqGrid('getRowData',rowId);//得到数据的关键rowId 根据id得到数据
		//var jsonStr = JSON.stringify(rowData); //将字符串转换成json
		if(ids.length > 0){
			var rowData = $("#idx_table").jqGrid('getRowData',ids[0]);
			var signid=rowData.SIGNING_ID;
			var physicalid='';
			
			for(var key in selectArr){
				var rowData = selectArr[key];
				physicalid+=rowData.PHYSICAL_ID+",";
			}
			physicalid=physicalid.substring(0,physicalid.length-1);
			showManagerConfirm(signid,physicalid);
	    }else{/*
	    	//不选择的情况
	    	var SIGNING_ID=$("#idx_gridName").val();
	    	$.ajax({
	  		  url:$.cxt + "/firstPage/updateStatusRturnAll", 
	  		  data:{"signingId":SIGNING_ID},
	  		  type: "POST",
	  		  async:false,
	  		  success : function (map){
	  			  messageAlert("退签成功");
	  			  initIdxGridList();
	  			  doSearch();
	  			 
	  		  }
	  	});
	    */}
	});
	initResbtn();
	
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
		$("#main").animate({width:""},function(){
			$(".msc_input.ui-autocomplete-input").parent().width(500);
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
    function setIdxGridType(){}
    function initIdxStatus(){}    
    function initIdxChnlName(){}   
   
	var arr = [];
   
    
});
function initIdxTable(){
	selectArr=[];
	var signingId = $("#batch").val();
	if(signingId==null||signingId==undefined||signingId==""){
		 //messageAlert("没有可以签约的渠道");
		 $('#idx_table').jqGrid("clearGridData");
		 return false;
	}
	$('#idx_table').jqGrid({
		url : $.cxt + "/firstPage/getMapTableList",
		postData:{"signingId":signingId},
		datatype : "json",
		mtype: "POST",
		height : "auto",
		autowidth : true,
		colNames : ['渠道签约' ,'最小单元','渠道名称', '基础单元名称','基础单元地址','二级分类','状态','大类','操作' ],
		colModel : [ 
			  {name : 'SIGNING_ID',align : 'center',hidden : true},
			  {name : 'PHYSICAL_ID',align : 'center',hidden : true},
		      {name : 'CHNL_NAME',align : 'center'}, 
		      {name : 'PHYSICAL_NAME',align : 'center'}, 
		      {name : 'ADDRESS',align : 'center'},
		      {name : 'SMALL_TYPE',align : 'center'}, 
		      {name : 'STATUS',align : 'center',formatter : ststusFormat}, 
		      {name : 'BIG_TYPE',align : 'center',hidden : true},
		      {name : 'edit',align : 'center',formatter : addButton}, 
		     ],
		//多选框，
		multiselect: true,
		//cellEdit: true,
		//true的时候
		//multiboxonly: true,
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10,20,30 ],
		multiselect: true,  					//这个是前面复选框显示的
		pager : '#idx_grid-pager',
		loadComplete : topjqGridLoadComplete,  //这里是上下页箭头显示的
		gridComplete:function() {
		    var _this = this;
		    var rowData = $(_this).jqGrid('getRowData');
		    for(var i =0,n=rowData.length;i<n;i++){
		    	var obj = rowData[i];
		    	// var rowData = $("#idx_table").jqGrid('getRowData',rowId);
		    	if(selectArr[obj.KPI_ID]){
		    		 $(_this).jqGrid('setSelection',i+1,false);
		    	}
		    }
		},
		// 这里和beforeSelectRow()俩个函数，一起组合让jqGrid表格单选，
		onSelectRow:function(rowid,state, e) {
			var obj = $(this).jqGrid('getRowData',rowid);
		    if(state){
		    	selectArr[obj.KPI_ID]=obj;
		    }else{
		    	if(selectArr[obj.KPI_ID]){
		    		delete  selectArr[obj.KPI_ID];
		    	} 
		    }
		},
		onSelectAll:function(aRowids,status) {
            var _this = this;
            var rowData = $(_this).jqGrid('getRowData');
            for(var i=0,n=rowData.length;i<n;i++){
            	var obj = rowData[i];
            	if(status){
            		selectArr[obj.KPI_ID]=obj;
	            }else{
	            	if(selectArr[obj.KPI_ID]){
	            		delete  selectArr[obj.KPI_ID];
			    	} 
	            }    
            }
                   
        },
		onSelectRow : selectRow,
	});
	
	
}

function selectRow(rowid, status){
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
}
function initIdxGridList(){
	$.ajax({
		  url:$.cxt + "/firstPage/getMapOptionList", 
		  data:{"loginId":loginId},
		  type: "POST",
		  async:false,
		  success : function (list){
			 
			 var gridNameSel= $("#batch");
			 gridNameSel.empty();
			 for(var i=0,n=list.length;i<n;i++){
				 var grid =list[i];
				 var option= $("<option value='"+grid.SIGNING_ID+"' >"+"第"+(i+1)+"批"+"</option>");
				if(i==0){
					option.attr("selected","selected");
				}
				 gridNameSel.append(option);
			 }
			 
		  }
	});
	var signingId=$("#batch").val();
	$.ajax({
		  url:$.cxt + "/firstPage/getMapChannelName", 
		  data:{"signingId":signingId},
		  type: "POST",
		  async:false,
		  success : function (json){
			 var data  = JSON.parse(json);
			 var gridNameSel= $("#idx_gridName");
			 gridNameSel.empty();
			 var option= $("<option value='' >"+data.data.CHNL_NAME+"</option>");
			 gridNameSel.append(option);
			 
			 
		  }
	});
	
	$("#batch").on("change", function(event) {
		var signingId=$("#batch").val();
		$.ajax({
			  url:$.cxt + "/firstPage/getMapChannelName", 
			  data:{"signingId":signingId},
			  type: "POST",
			  async:false,
			  success : function (json){
				 var data  = JSON.parse(json);
				 var gridNameSel= $("#idx_gridName");
				 gridNameSel.empty();
				 var option= $("<option value='' >"+data.data.CHNL_NAME+"</option>");
				 gridNameSel.append(option);
				 
				 
			  }
		}); 
	});
	
}
//var PHYSICAL_ID='';
function stateOperation(cellvalue, options, rowObject) {
//	    console.log(cellvalue);  //当前cell的值
//	    console.log(options);	//该cell的options设置，包括{rowId, colModel,pos,gid}
//	    console.log(rowObject);  //当前cell所在row的值，如{ id=1, name="name1", price=123.1, ...}就是当前行对象
//		jsonStr = JSON.stringify(rowObject);//需要修改的对象，转成json，传到后台
	   // PHYSICAL_ID=rowObject.PHYSICAL_ID;
		var html = "";
		html += "<a onclick=\"showChannelInfo('" + rowObject.SIGNING_ID+ "','" + rowObject.PHYSICAL_ID+ "')\" href=\"#\">查看</a>";
		return html;
	}

function showChannelInfo(rowObject,PHYSICAL_ID){
	//alert(PHYSICAL_ID);		//基础单元编码code
	//console.log(rowObject); 
	topwindow.showWindow({
		   title : '详细信息',
		    data:{'SIGNING_ID':rowObject,'PHYSICAL_ID':PHYSICAL_ID},
		    
			url : $.cxt + "/pages/gis/layer/mapManagerConfirmPop.jsp",
			bottons : [] 
	   })
}
function showManagerConfirm(signid,physicalid){
	topwindow.showWindow({
		   title : '详细信息',
		    data:{'SIGNING_ID':signid,'PHYSICAL_ID':physicalid},
		    width:1000,
		    height:520, 
			url : $.cxt + "/pages/gis/layer/mapManagerConfirmPop.jsp",
			bottons : [ 
				{
					title : "取消",
					fun : function() {
						//alert(22);
						topwindow.removeWindow();
					}
				},{
					title : "确定",
					fun : function() {
						$.ajax({
							  url:$.cxt + "/firstPage/updateStatus", 
							  data:{"signingId":signid,"physicalId":physicalid},
							  type: "POST",
							  async:false,
							  success : function (map){
								  initIdxGridList();
								  doSearch();
								  topwindow.removeWindow();
								  messageAlert("签约成功");
								 
							  }
						});
						

						topwindow.removeWindow();
					}
				} ] 
	   })
}


/*function updateChannelInfo(unitId) {
	alert(unitId);
	var uid = "fbf84fb622ec24d581a12e88";
	topwindow.showWindow({
				title : "渠道列表",
				width : 1000,
				url : $.cxt + "/pages/gis/contract/channelList.jsp",
				datatype : "json",
				mtype : "POST",
				data : {
					uid : uid
				},
				bottons : [ {
					title : "确定",
					fun : function() {
						// 获取选择的行数，如果大于1，提示有误 (获得选中行的ID数组：)
						var ids = $("#channelTable").jqGrid('getGridParam',
								'selarrrow');
						if (ids.length > 1) {
							alert("只能选择一行数据");
							return false;
						}
						if (ids.length < 1) {
							alert("至少选择一行数据");
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

						topwindow.showWindow({
									title : "提示信息",
									width : 300,
									height : 200,
									url : $.cxt + "/pages/gis/contract/updateMessage.jsp",
									datatype : "json",
									mtype : "POST",
									data : {
										uid : uid
									},
									bottons : [
									           {
													title : "取消",
													fun : function() {
														alert(22);
														topwindow.removeWindow();
													}
												},
										{
											title : "确定",
											fun : function() {
												alert(jsonStr);
												// 通过ajax将这行数据传递到后台，保存到数据库
												$.ajax({
															url : $.cxt + "/channel/insertMsContractArea",
															dataType : "json",
															type : "POST",
															data : {
																jsonStr : jsonStr
															},
															success : function(json) {
																alert(json);
																var data = JSON
																		.parse(json);
																if (data.code == '0') {
																	topwindow.removeWindow();//关闭窗口
																	topshowAlertSuccessDiv();//操作提示
																	//刷新父窗口，重新查询
																	//searchExamModel(1,9,"","");
																}
															}
														});
												//把窗口除去
												topwindow.removeWindow();
												}
											} ]

								});
					}
				} ]
			});

}*/

function ststusFormat(cellValue) {
	return cellValue == 'F' ? '未签约' : '已签约';
}
function doSearch(){
	selectArr=[];
	var signingId = $("#batch").val();
	if(signingId==null||signingId==undefined||signingId==""){
		 //messageAlert("没有可以签约的渠道");
		 $('#idx_table').jqGrid("clearGridData");
		 return false;
	}
	$("#idx_table").jqGrid("setGridParam",{
		url:$.cxt+"/firstPage/getMapTableList",
		datatype:"json",
		postData : {"signingId":signingId},
		
	}).trigger('reloadGrid');
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
function addButton (cellvalue, options, rowdata){	
	var html =""
	if (rowdata.BIG_TYPE=='家居小区'){
		html += "<a onclick=\"showVillage('" + rowdata.PHYSICAL_ID+ "')\" href=\"#\">查看</a>";
        return  html;
	}else if(rowdata.BIG_TYPE=='文化教育'){
		html += "<a onclick=\"showSchool('" + rowdata.PHYSICAL_ID+ "')\" href=\"#\">查看</a>";
        return  html;   
	}else{
		html += "<a href=\"#\" style=\"display:none\">查看</a>";
        return  html;
	}
}
function showVillage(physicalId){
	//alert(physicalId)
	topwindow.showWindow({
		title : "小区信息",
		width : 1000,
		url : $.cxt + "/pages/gis/layer/house.jsp",
		datatype: "json",
		mtype: "POST",
		data : {physicalId:physicalId},
	})
}
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







