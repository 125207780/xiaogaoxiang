$(function(){
	
	//时间
	$("#startTime").datepicker({
		format: 'yyyy-mm-dd',
		language:  'zh-CN',
		todayBtn : "linked",
		autoclose:true,
		minview : "3"
	});
	$("#endTime").datepicker({
		format: 'yyyy-mm-dd',
		language:  'zh-CN',
		todayBtn : "linked",
		autoclose:true,
		minview : "3"
	});
	
	//清除条件
	$("#clearButton").click(function(){
		$("input").val('');
	})
	//查询创建的任务
	$('#taskCreate').jqGrid({
		url : $.cxt + "/task/getTaskCreateInfo",
		datatype : "json",
		mtype : "POST",
		height : 165,
		postData : {orgId:orgId},
		autowidth : true,
		colNames : [ '活动名称', '战役名称','活动开始日期','活动结束日期', '产品名称',  
		             '总任务量','办理量','操作' ],
		colModel : [ 
		      {name : 'activityName',align : 'center'}, 
		      {name : 'campaignName',align : 'center'}, 
		      {name : 'activityBeginDate',align : 'center'}, 
		      {name : 'activityEndDate',align : 'center'},
		      {name : 'offeringName',align : 'center'}, 
		      {name : 'taskTotal',align : 'center'}, 
		      {name : 'handleNum',align : 'center'},
		     /* {name : 'saleId',align : 'center',formatter : function(cellvalue, options, cell){
		    	  if(cellvalue == '1') return '外呼';
		    	  if(cellvalue == '2') return '上门';
		    	  if(cellvalue == '3') return 'CRM';
		    	  if(cellvalue == '4') return '其他';
		    	  else return '';
		      }}, */
		    /*  {name : 'statusId',align : 'center',formatter : function(cellvalue, options, cell){
		    	  if(cellvalue == '0') return '执行中';
		    	  if(cellvalue == '1') return '完成';
		    	  if(cellvalue == '2') return '暂停';
		    	  if(cellvalue == '3') return '终止';
		    	  else return '';
		      }}, */
		      {name : 'act',align : 'center',formatter : function(cellvalue, options, cell) {
			  		var html = "<a onclick=\"updateListener('"+cell.activityId+"','"+cell.isMonitor+"')\" href=\"#\">监控</a>&nbsp;&nbsp;&nbsp;&nbsp;";
					html += "<a onclick=\"cancelTask('"+cell.activityId+"','"+cell.campaignId+"')\" href=\"#\">取消</a>"
					return html;
			}}
		],
		shrinkToFit:false,
		autoScroll: true,
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10,20, 30 ],
		pager : '#grid-pager1',
		gridComplete : setNiceScroll,
		loadComplete : topjqGridLoadComplete
	});
	
/*	$('#taskhandle').jqGrid({
		url : $.cxt + "/task/getTaskHandleInfo",
		datatype : "json",
		mtype : "POST",
		height : 165,
		postData : {orgId:orgId},
		autowidth : true,
		colNames : [ '任务编码', '任务名称','任务大类','任务小类', '任务目标', '执行人', '执行人归属',
		             '任务状态','执行时间','创建时间', '要求完成时间', '目标用户',
		             '完成情况','问题记录','操作' ],
		colModel : [ 
		      {name : 'taskCode',align : 'center'}, 
		      {name : 'taskName',align : 'center'}, 
		      {name : 'taskBigtype',align : 'center'}, 
		      {name : 'taskSmalltype',align : 'center'},
		      {name : 'taskTargetDesc',align : 'center'}, 
		      {name : 'taskHandler',align : 'center'}, 
		      {name : 'taskOwner',align : 'center'}, 
		      {name : 'taskStatus',align : 'center',formatter : function(cellvalue, options, cell){
		    	  if(cellvalue == '0') return '执行中';
		    	  if(cellvalue == '1') return '已完成';
		    	  if(cellvalue == '2') return '未执行';
		    	  if(cellvalue == '3') return '暂停';
		    	  else return '';
		      }}, 
		      {name : 'handleDate',align : 'center'}, 
		      {name : 'createDate',align : 'center'}, 
		      {name : 'finishDate',align : 'center'},
		      {name : 'taskTarget',align : 'center'}, 
		      {name : 'finishState',align : 'center'}, 
		      {name : 'problemRecode',align : 'center',formatter : function(cellvalue, options, cell) {
		    	  	if(cellvalue == '0') return '无';
		    	  	if(cellvalue == '1') return "<a onclick=\"showProblem('"+cell.taskCode+"')\" href=\"#\">有</a>";
		    	  	else return '';
		      }}, 
		      {name : 'option',align : 'center',formatter : function(cellvalue, options, cell) {
			  		var html = "<a onclick=\"updateListener('"+cell.taskCode+"','"+cell.isMonitor+"')\" href=\"#\">监控</a>&nbsp;&nbsp;&nbsp;&nbsp;";
					html += "<a onclick=\"cancelTask('"+cell.taskCode+"')\" href=\"#\">取消</a>"
					return html;
			}}
		],
		shrinkToFit:false,
		autoScroll: true,
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10,20, 30 ],
		pager : '#grid-pager2',
		loadComplete : topjqGridLoadComplete,
		gridComplete : setNiceScroll
	});*/
	
	//查询按钮
	$("#searchButton").click(function(){
		reloadBaseTaskJqGrid("search");
	});
	
	//重新基础单元信息
	var reloadBaseTaskJqGrid = function(flag) {
		var taskName = $("#taskName").val();
		var startTime = $("#startTime").val();
		var endTime = $("#endTime").val();
		if(flag == undefined) {
			//清空查询条件
			topclear('gridSearch')
		}
		$("#taskCreate").jqGrid('setGridParam',{    
	        postData : {
	        	activityName:taskName,
	        	activityBeginDate:startTime,
	        	activityEndDate:endTime
	        },  
	        page : 1    
	    }).trigger("reloadGrid"); 
		
		/*$("#taskhandle").jqGrid('setGridParam',{    
	        postData : {
	        	taskName:taskName,
	        	startTime:startTime,
	        	endTime:endTime
	        },  
	        page : 1    
	    }).trigger("reloadGrid");*/
	}
	
})

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

var updateListener = function(activityId,isMonitor){
	if(isMonitor == 'A'){
		messageConfirm('任务已监控！');
	}else{
		bootbox.dialog({
			message: "是否确认监控?",
			title: "提示信息",
			buttons: {
				OK: {
					label: "确认",
					className: "btn-primary",
					callback: function () {
						$.ajax({
							url:$.cxt + "/task/updateListener", 
							type: "POST",
							data : {
								activityId : activityId,
								orgId:orgId
							},
							success : function (json){
								var data = JSON.parse(json);
								if(data.code=='0'){
									$("#taskhandle").jqGrid('setGridParam',{    
								        page : 1    
								    }).trigger("reloadGrid");
									$("#taskCreate").jqGrid('setGridParam',{    
								        page : 1    
								    }).trigger("reloadGrid");
								}
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
	}
}

function cancelTask(activityId,campaignId){
	bootbox.dialog({
		message: "是否确认取消任务?",
		title: "提示信息",
		buttons: {
			OK: {
				label: "确认",
				className: "btn-primary",
				callback: function () {
					$.ajax({
						url:$.cxt + "/task/cancelTask", 
						type: "POST",
						data : {
							activityId : activityId,
							campaignId:campaignId,
							orgId:orgId
						},
						success : function (json){
							var data = JSON.parse(json);
							if(data.code=='0'){
								$("#taskhandle").jqGrid('setGridParam',{    
							        page : 1    
							    }).trigger("reloadGrid");
								$("#taskCreate").jqGrid('setGridParam',{    
							        page : 1    
							    }).trigger("reloadGrid");
							}
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
}

function showProblem(taskCode){
	topwindow.showWindow({
		   title : '问题列表',
		   data:{},
			url : $.cxt + "/pages/jsp/task/problemTask.jsp?taskCode="+taskCode,
			bottons : [{
				fun : function() {
					topwindow.removeWindow();
				}
			}] 
	   })
}

function messageConfirm(msg){
	bootbox.alert({
	    buttons: {
		   ok: {
			    label: '关闭',
			    className: 'btn-myStyle'
		    }
	    },
	    message: msg,
	    callback: function() {
		    
	    },
	    title: "消息提示",
    })
}