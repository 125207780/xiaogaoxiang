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
	
	//查询取消的任务信息
	$('#taskCancel').jqGrid({
		url : $.cxt + "/task/getTaskHistoryInfo",
		datatype : "json",
		mtype : "POST",
		height : 160,
		autowidth : true,
		colNames : [ '任务编码', '任务名称','任务大类','任务小类', '任务目标','创建人', '创建人归属', '执行人', '执行人归属',
		             '取消时间','执行时间','创建时间', '要求完成时间', 
		             '完成情况','任务归类','操作' ],
		colModel : [ 
		      {name : 'taskCode',align : 'center'}, 
		      {name : 'taskName',align : 'center'}, 
		      {name : 'taskBigtype',align : 'center'}, 
		      {name : 'taskSmallType',align : 'center'},
		      {name : 'taskTargetDesc',align : 'center'}, 
		      {name : 'taskCreater',align : 'center'}, 
		      {name : 'createrOwner',align : 'center'}, 
		      {name : 'taskHandler',align : 'center'}, 
		      {name : 'taskOwner',align : 'center'},
		      {name : 'offMonitorDate',align : 'center'}, 
		      {name : 'handleDate',align : 'center'}, 
		      {name : 'createDate',align : 'center'}, 
		      {name : 'finishDate',align : 'center'},
		      {name : 'finishState',align : 'center'}, 
		      {name : 'taskType',align : 'center',formatter : function(cellvalue, options, cell){
		    	  if(cellvalue=='0') return '我创建的任务';
		    	  if(cellvalue=='1') return '我执行的任务'
		      }}, 
		      {name : 'option',align : 'center',formatter : function(cellvalue, options, cell) {
			  		var html = "<a onclick=\"recovery('"+cell.taskCode+"')\" href=\"#\">恢复</a>&nbsp;&nbsp;&nbsp;&nbsp;";
					return html;
			}}
		],
		shrinkToFit:false,
		autoScroll: false,
//		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10,20, 30 ],
		pager : '#grid-pager',
		loadComplete : topjqGridLoadComplete,
		gridComplete: function() { 
		    setNiceScroll()
		} 
	});
	
	//查询按钮
	$("#searchButton").click(function(){
		reloadCancelTaskJqGrid("search");
	});
	
	var reloadCancelTaskJqGrid = function(flag) {
		var taskName = $("#taskName").val();
		var startTime = $("#startTime").val();
		var endTime = $("#endTime").val();
		if(flag == undefined) {
			//清空查询条件
			topclear('gridSearch')
		}
		$("#taskCancel").jqGrid('setGridParam',{    
	        postData : {
	        	taskName:taskName,
	        	startTime:startTime,
	        	endTime:endTime
	        },  
	        page : 1    
	    }).trigger("reloadGrid"); 
	}
	
//	setNiceScroll()
})


function recovery(taskCode){
	bootbox.dialog({
		message: "是否确认恢复?",
		title: "提示信息",
		buttons: {
			OK: {
				label: "确认",
				className: "btn-primary",
				callback: function () {
					$.ajax({
						url:$.cxt + "/task/recoveryTask", 
						type: "POST",
						data : {
							taskCode : taskCode
						},
						success : function (json){
							var data = JSON.parse(json);
							if(data.code=='0'){
								$("#taskCancel").jqGrid('setGridParam',{    
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

//设置滚动条
function setNiceScroll(){
	$(".ui-jqgrid-bdiv").getNiceScroll().resize();
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight:$(window).height()-190,
	    cursorcolor:"#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
}