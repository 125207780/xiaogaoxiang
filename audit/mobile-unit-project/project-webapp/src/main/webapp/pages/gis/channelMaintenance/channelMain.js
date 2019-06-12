//传递参数为登陆网格经理的loginId 
//var gridCode = "8c16119c-f360-4293-bccf-42d931ae26d7"

var selectedArr = [];
$(function(){
	initChanelName();
	initJqGridTable();
	initJqGRIDtABLE();
});

function initChanelName(){
	
	//初始化通过登陆账号 获得 gridCode 一对一
	$.ajax ({
		url : $.cxt+ "/maintence/initGridCode",
		type:"POST",
		dataType:"JSON",
		async:false,
		data:{loginId:loginID},
		 
		success : function(json){
			gridCode=json;
		}	
	});
	//初始画渠道列表
	$.ajax ({
		url : $.cxt+ "/maintence/initChanelName",
		type:"POST",
		dataType:"JSON",
		data:{gridCode:gridCode},
		success : function(json){
			var html="<option  ></option>";
			for(var i=0;i<json.length;i++){
				var temp = json[i]
				html += "<option value=\"" + temp.CHNL_CODE + "\">" + temp.CHNL_NAME +"</option>";
			}
			$("#chnlId").html(html);
		}	
	});
}
/*function setGrid(names,model,json){
	var status = $("#statusId").val() 
	console.log(status);
	if(status=="0"){
		
	}
	$("#MainGridTable").jqGrid("clearGridData");
	$("#MainGridTable").trigger("reloadGrid");
	$("#MainGridTable").jqGrid('GridUnload');  // 重新加载表结构
	if(status =="0"){//未分配
	$("#MainGridTable").jqGrid({
		datatype : "local",
		height : topjqGridHeight(),
		colNames : names,
		colModel : model,
		height:405,
		rowNum : 10,
		data:json,
		shrinkToFit:false,   
		autoScroll: true,  
		autowidth : true,
		rowList : [ 10, 20, 30 ],
		pager : '#MainGridPage',
		viewrecords : true,
        multiselect: true,//复选框   
		loadComplete : function(){
			$(".ui-jqgrid-bdiv").niceScroll({
				cursorheight:$(window).height()-190,
			    cursorcolor:"#5cd4f8",
			    cursorborder: "1px solid #5cd4f8",
			    touchbehavior: false,
			    spacebarenabled: true,
			    railoffset: false
			});
		},
		gridComplete:function() {
			scroll()
		    var _this = this;
		    var rowData = $(_this).jqGrid('getRowData');
		    for(var i =0,n=rowData.length;i<n;i++){
		    	var obj = rowData[i];
		    	if(selectedArr[obj.CHNL_CODE]){
		    		 $(_this).jqGrid('setSelection',i+1,false);
		    	}
		    }
		},
		onSelectRow:function(rowid,state, e) {
			var obj = $(this).jqGrid('getRowData',rowid);
		    if(state){
		    	selectedArr[obj.CHNL_CODE]=obj;
		    }else{
		    	if(selectedArr[obj.CHNL_CODE]){
		    		delete  selectedArr[obj.CHNL_CODE];
		    	} 
		    }
		},
		onSelectAll:function(aRowids,status) {
            var _this = this;
            var rowData = $(_this).jqGrid('getRowData');
            for(var i=0,n=rowData.length;i<n;i++){
            	var obj = rowData[i];
            	if(status){
            		selectedArr[obj.CHNL_CODE]=obj;
            		
	            }else{
	            	if(selectedArr[obj.CHNL_CODE]){
	            		delete  selectedArr[obj.CHNL_CODE];
			    	} 
            		delete  selectedArr[obj.CHNL_CODE];
            	
	            }    
            }        
        },	
		
		
	});
	for (var i = 0; i <= json.length; i++) {
//		$("#MainGridTable").jqGrid('addRowData', i, json[i]);
    }
	$("#MainGridTable>tbody>tr:nth-child(2)>td:first").css('width','25')
	}else{//
		$("#MainGridTable").jqGrid({
			datatype : "local",
			autowidth : true,
			height : topjqGridHeight(),
			colNames : names,
			colModel : model,
			data:json,
			height:405,
			shrinkToFit:false,   
			autoScroll: true,  
			rowNum : 10,
			rowList : [ 10, 20, 30 ],
			pager : '#MainGridPage',
			viewrecords : true,
	        multiselect: true,//复选框   
			loadComplete : topjqGridLoadComplete,
		});
		for (var i = 0; i <= json.length; i++) {
//			$("#MainGridTable").jqGrid('addRowData', i, json[i]);
	    }
		$("#MainGridTable>tbody>tr:nth-child(2)>td:first").css('width','25')
	}
}*/
function initJqGRIDtABLE(){
	var chnlCode = $("#chnlId").val();
	$("#MainGridTable2").jqGrid({
		data:[],
		datatype:'local',
		autowidth : false,
		colNames : [ '渠道名称', '渠道类型','渠道地址','一级分类','二级分类','三级分类','渠道编码','营业性质','渠道星级','管理部门','渠道经理姓名','渠道经理电话'],
		colModel : [ 
			 {name : 'CHNL_NAME',align : 'center'}, //渠道名称
		      {name : 'CHNL_TYPE',align : 'center'}, //渠道类型
		      {name : 'CHNL_ADDR',align : 'center'}, //渠道地址
		      {name : 'CHNL_TYPE_LEVEL1',align : 'center'}, //一级分类
		      {name : 'CHNL_TYPE_LEVEL2',align : 'center'}, //二级分类
		      {name : 'CHNL_TYPE_LEVEL3',align : 'center'},//三级分类
		      {name : 'CHNL_CODE',align : 'center'}, //渠道编码
		      {name : 'BUSICIRCLE_TYPE',align : 'center'}, //营业性质
		      {name : 'CHNL_STAR',align : 'center'}, //渠道星级
		      {name : 'MANAGE_DEPT',align : 'center'}, //管理部门
		      {name : 'NAME',align : 'center'}, //渠道经理姓名
		      {name : 'PHONE',align : 'center'}, //渠道经理电话
		     ],
		    rowNum:10,
			height:260,
		 	width:865,
		 	multiselect: false,
		 	viewrecords : true,
		 	rowList : [ 10, 20, 30 ],
			pager : '#MainGridPage2',
			gridComplete:function() {
		    	 setNiceScroll();
		    	 topjqGridLoadComplete();
			}
	
	});
}
function initJqGridTable(){
	var chnlCode = $("#chnlId").val();
	var status = $("#statusId").val() ;
	var initData= new Array();
	console.log(status);
	$.ajax({  //获取表信息
		url:$.cxt+"/maintence/initGrid",
		datatype: "json",
		mtype: "POST",
		async : false,
		data : {gridCode:gridCode,chnlCode:chnlCode},
		success: function(json){
			initData= json;
		}
	});
	console.log(initData);
	$("#MainGridTable1").jqGrid({
		data:initData,
		datatype:'local',
		autowidth : false,	
		colNames : [ '渠道名称', '渠道类型','渠道地址','一级分类','二级分类','三级分类','渠道编码','营业性质','渠道星级','管理部门','操作'],
		colModel : [ 
		      {name : 'CHNL_NAME',align : 'center'}, //渠道名称
		      {name : 'CHNL_TYPE',align : 'center'}, //渠道类型
		      {name : 'CHNL_ADDR',align : 'center'}, //渠道地址
		      {name : 'CHNL_TYPE_LEVEL1',align : 'center'}, //一级分类
		      {name : 'CHNL_TYPE_LEVEL2',align : 'center'}, //二级分类
		      {name : 'CHNL_TYPE_LEVEL3',align : 'center'},//三级分类
		      {name : 'CHNL_CODE',align : 'center'}, //渠道编码
		      {name : 'BUSICIRCLE_TYPE',align : 'center'}, //营业性质
		      {name : 'CHNL_STAR',align : 'center'}, //渠道星级
		      {name : 'MANAGE_DEPT',align : 'center'}, //管理部门
		      {name : 'A',align : 'center',formatter :addButton}, //分配社会渠道经理
		     ],
		    rowNum:10,
		    shrinkToFit:false,  
		    autoScroll: true, 
		    viewrecords : true,
		 	multiselect: true,
		 	height:260,
		 	width:865,
		 	rowList : [ 10, 20, 30 ],
			pager : '#MainGridPage1',
		     gridComplete:function() {
		    	    setNiceScroll();
		    	    topjqGridLoadComplete();
				    var _this = this;
				    var rowData = $(_this).jqGrid('getRowData');
				    for(var i =0,n=rowData.length;i<n;i++){
				    	var obj = rowData[i];
				    	if(selectedArr[obj.CHNL_CODE]){
				    		 $(_this).jqGrid('setSelection',i+1,false);
				    	}
				    }
				},
				onSelectRow:function(rowid,state, e) {
					var obj = $(this).jqGrid('getRowData',rowid);
				    if(state){
				    	selectedArr[obj.CHNL_CODE]=obj;
				    }else{
				    	if(selectedArr[obj.CHNL_CODE]){
				    		delete  selectedArr[obj.CHNL_CODE];
				    	} 
				    }
				},
				onSelectAll:function(aRowids,status) {
		            var _this = this;
		            var rowData = $(_this).jqGrid('getRowData');
		            for(var i=0,n=rowData.length;i<n;i++){
		            	var obj = rowData[i];
		            	if(status){
		            		selectedArr[obj.CHNL_CODE]=obj;
		            		
			            }else{
			            	if(selectedArr[obj.CHNL_CODE]){
			            		delete  selectedArr[obj.CHNL_CODE];
					    	} 
		            		delete  selectedArr[obj.CHNL_CODE];
		            	
			            }    
		            }        
		        },	 
		     
	});
	

}

function setNiceScroll(){
	$(".ui-jqgrid-bdiv").getNiceScroll().resize();
	//滚动条插件
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight:$(window).height()-190,
	    cursorcolor:"#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
}

function addButton(cellvalue, options, rowdata){
			var html =""
			html += "<a    onclick=\"Assigned('" + rowdata.CHNL_CODE+ "')\" href=\"#\">分配社会渠道经理</a>";
			return  html;
}

function Assigned (chnlCode){
	var OneChnlCode = chnlCode ;
	$.ajax({
		url : $.cxt+ "/maintence/getGridChnlManager",
		datatype: "json",
		mtype: "POST",
		data : {gridCode:gridCode},
		success : function (json){
			if(json==1){
				bootbox.dialog({
				message: "当前网格在划分网格时区县（分公司）网格管理员未分配社会渠道经理，请点击“提交”按钮提示区县（分公司）网格管理员进行分配。！",
				title: "提示信息",
				buttons: {
					OK: {
						label: "发送",
						className: "btn-primary",
						callback: function () {
								$.ajax({
									url : $.cxt + "/maintence/insertCountyInfoNoChnl",
									dataType : "json",
								 	type : "POST",
								 	data : {gridCode:gridCode},
								 	success : function(json){
								 		messageAlert("发送成功！");
										topwindow.removeWindow();//关闭窗口
										changeGrid();//刷新父窗口，重新查询
										
								 	}
								})
						}
					},
					Cancel: {
						label: "取消",
						className: "btn-default",
						callback: function () {
							
						}
					}
				}
				});
			}else{
				topwindow.showWindow({
					title : "社会渠道经理列表",
					width : 1000,
					url : $.cxt + "/pages/gis/channelMaintenance/ChannelManager.jsp",
					datatype: "json",
					mtype: "POST",
					data : {gridCode:gridCode},
					bottons : [{
						title : "确定", 
						fun : function(){						
							var rowId = $("#MainGridTable").jqGrid('getGridParam', 'selrow'); 
							console.log(rowId);
							var rowdata =$("#MainGridTable").jqGrid('getRowData', rowId);
							console.log(selectChannelManger[0]);
							if(rowId==null){
								messageAlert("至少选择一个渠道经理！");
								return ;
							}
							console.log(rowdata.LOGIN_ID);
							var LOGIN_ID= rowdata.LOGIN_ID ;
							console.log(chnlCode);
							$.ajax({
								url :$.cxt+"/maintence/DistributionChnlManager",
								 data: {'LOGIN_ID':LOGIN_ID,'chnlCode':OneChnlCode},
						         type: "POST",
						     	 success : function(json){
						     	 	messageAlert("分配成功！");
									topwindow.removeWindow();//关闭窗口
									changeGrid();
						     	}
							});
							}	
						},{title : "无可选择的人", 
						fun : function(){
							topwindow.showWindow({
								title : "提示信息！",
								url : $.cxt + "/pages/gis/channelMaintenance/undefine.jsp",
								datatype: "json",
								mtype: "POST",
								data : {gridCode:gridCode},
								bottons : [{
									title : "发送", 
									fun : function(json){	
										 var text = $("#inputID").val();
											var texts = text.split(",");
											var length = texts.length;
											for(var i=0;i<length;i++){
												if((texts[i].split(":").length)!=2){
													messageAlert("格式错误");
													return;
												}
											}
											$.ajax({
												url :$.cxt+"/maintence/getInFullOA",
												data: {"text":text,"gridCode":gridCode},
										        type: "POST",
										        success : function(json){
										        	if(json=="1"){
										        		$.ajax({
										        			url : $.cxt + "/maintence/insertCountyInfo",
															dataType : "json",
														 	type : "POST",
														 	data : {"gridCode":gridCode,"text":text},
														 	success :function(json){
														 		messageAlert("发送成功");
														 		topwindow.removeWindow();//关闭窗口
														 		
														 	}
										        		})
										        	}else{
										        		messageAlert("查无此人!");
														return;
										        	}
										        }
											})
											topwindow.removeWindow();//关闭窗口
											/*changeGrid();//刷新父窗口，重新查询
											
											
*/								 return ;
											}
								}]
							});
						}
					}]
				});
			}
		}
	});	
}
$("#selectId").on("click",changeGrid)
function changeGrid(){
	selectedArr=[];
	var status = $("#statusId").val(); //未分配0 
	if(status=="0"){
		$("#channelMain_distributeID").show();
		$("#gridtable1").show();
		$("#gridtable2").hide();
		var chnlCode = $("#chnlId").val();
		var initData= new Array();
		$.ajax({  //获取表信息
			url:$.cxt+"/maintence/initGrid",
			datatype: "json",
			mtype: "POST",
			async : false,
			data : {gridCode:gridCode,chnlCode:chnlCode},
			success: function(json){
				initData= json;
			}
		});
		console.log(initData)
				$("#MainGridTable1").jqGrid("clearGridData");
				$("#MainGridTable1").jqGrid('setGridParam',{
				datatype:'local',
				data: initData,
				page :1 ,
				}).trigger("reloadGrid");
	}else{
		$("#channelMain_distributeID").hide();
		$("#gridtable1").hide();
		$("#gridtable2").show();
		
		var chnlCode = $("#chnlId").val();
		var initData2= new Array();
		$.ajax({  //获取表信息
		url:$.cxt+"/maintence/changeGrid",
		datatype: "json",
		mtype: "POST",
		async : false,
		data : {gridCode:gridCode,chnlCode:chnlCode},
		success: function(json){
			initData2= json;
		}
	});
		console.log(initData2)
		
		$("#MainGridTable2").jqGrid("clearGridData");
		$("#MainGridTable2").jqGrid('setGridParam',{
		datatype:'local',
		data: initData2,
		page :1 ,
		}).trigger("reloadGrid");
	}	
}
$("#channelMain_distributeID").on("click",distributeID)
function distributeID(){
	
	flag = true ;
	var chnlCodes= [] ;

	for(var keys in selectedArr){
		flag=false;
	}
	if(flag==true){
		messageAlert("至少选择一个渠道!");
		return ;
	}else{
		for(var id in selectedArr){
			console.log(2);
			console.log(id);
			chnlCodes.push(id);
			}
		flag=true;
	}
	console.log(chnlCodes)
	var JsonchnlCodes= chnlCodes.join(",")
	console.log(JsonchnlCodes)
	$.ajax({
		url : $.cxt+ "/maintence/getGridChnlManager",
		datatype: "json",
		mtype: "POST",
		data : {gridCode:gridCode},
		success : function (json){
			if(json==1){
				bootbox.dialog({
					message: "当前网格在划分网格时区县（分公司）网格管理员未分配社会渠道经理，请点击“提交”按钮提示区县（分公司）网格管理员进行分配。！",
					title: "提示信息",
					buttons: {
						OK: {
							label: "发送",
							className: "btn-primary",
							callback: function () {
									$.ajax({
										url : $.cxt + "/maintence/insertCountyInfoNoChnl",
										dataType : "json",
									 	type : "POST",
									 	data : {"gridCode":gridCode},
									 	success : function(){
									 		messageAlert("发送成功！");
											changeGrid();//刷新父窗口，重新查询
									}
								})
							}
						},
						Cancel: {
							label: "取消",
							className: "btn-default",
							callback: function () {	
							}
						}
					}
					});
			}else{
				topwindow.showWindow({
					title : "社会渠道经理列表",
					width : 1000,
					url : $.cxt + "/pages/gis/channelMaintenance/ChannelManager.jsp",
					datatype: "json",
					mtype: "POST",
					data : {gridCode:gridCode},
					bottons : [{
						title : "确定", 
						fun : function (){
							var rowId = $("#MainGridTable").jqGrid('getGridParam', 'selrow'); 
							var rowdata =$("#MainGridTable").jqGrid('getRowData', rowId);
							console.log(rowdata.LOGIN_ID);
							var LOGIN_ID= rowdata.LOGIN_ID ;
							console.log(LOGIN_ID);
							console.log(JsonchnlCodes);
							$.ajax({
								url :$.cxt+"/maintence/OtherDistributionChnlManager",
								 data: {'LOGIN_ID':LOGIN_ID,'JsonchnlCodes':JsonchnlCodes},
						         type: "POST",
								 success : function (json){
								 messageAlert("分配成功！");
								 topwindow.removeWindow();//关闭窗口
								 changeGrid();//刷新父窗口，重新查询
								}
							});
						}
						},{
							title : "无可选择的人", 
							fun : function(){
								topwindow.showWindow({
									title : "提示信息！",
									url : $.cxt + "/pages/gis/channelMaintenance/undefine.jsp",
									datatype: "json",
									mtype: "POST",
									data : {gridCode:gridCode},
									bottons : [{
										title : "发送", 
										fun : function(json){	
											 var text = $("#inputID").val();
												var texts = text.split(",");
												var length = texts.length;
												for(var i=0;i<length;i++){
													if((texts[i].split(":").length)!=2){
														messageAlert("格式错误");
														return;
													}
												}
												$.ajax({
													url :$.cxt+"/maintence/getInFullOA",
													data: {"text":text},
											        type: "POST",
											        success : function(json){
											        	if(json=="1"){
											        		$.ajax({
											        			url : $.cxt + "/maintence/insertCountyInfo",
																dataType : "json",
															 	type : "POST",
															 	data : {"gridCode":gridCode,"text":text},
															 	success :function(json){
															 		messageAlert("发送成功");
															 		topwindow.removeWindow();//关闭窗口
															 		changeGrid();
															 	}
											        		})
											        	}else{
											        		messageAlert("查无此人!");
															return;
											        	}
											        }
												})
												topwindow.removeWindow();//关闭窗口
												changeGrid();//刷新父窗口，重新查询
										}
									}]
								});
							}
						}]
				});
			}
		}
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

	
