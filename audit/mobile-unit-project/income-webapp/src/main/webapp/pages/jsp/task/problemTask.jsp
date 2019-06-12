<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/task/task.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
<title>问题记录</title>
</head>
<body>
	<div class="problem-all">
		<div class="grid">
            <table id="taskProblem"></table>
            <div id="grid-pager3"></div> 
        </div>
	</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/task/checkTask.js"></script>
</body>
<%String taskCode = request.getParameter("taskCode"); %>
<script type="text/javascript">
	var taskCode = <%=taskCode%>
	$(function(){
		$('#taskProblem').jqGrid({
			url : $.cxt + "/task/getTaskProblem",
			datatype : "json",
			mtype : "POST",
			postData : {
				taskCode:taskCode
	        },
			height : 300,
			autowidth : true,
			colNames : [ '问题类型', '问题描述','记录时间','记录人', '是否解决'],
			colModel : [ 
			      {name : 'problemType',align : 'center'}, 
			      {name : 'problemDesc',align : 'center'}, 
			      {name : 'recodeDate',align : 'center'}, 
			      {name : 'recoder',align : 'center'},
			      {name : 'isSolve',align : 'center',formatter : function(cellvalue, options, cell){
			    	  	if(cellvalue == '0') return '是';
			    	  	if(cellvalue == '1') return '否';
			    	  	else return '';
			      }}
			],
			width : 645,
			/* shrinkToFit:false, */
			autoScroll: true,
			viewrecords : true,
			rownumbers: true,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			pager : '#grid-pager3',
			loadComplete : topjqGridLoadComplete
		});
		
		$(".ui-jqgrid-bdiv").niceScroll({
			cursorheight:$(window).height()-190,
		    cursorcolor:"#5cd4f8",
		    cursorborder: "1px solid #5cd4f8",
		    touchbehavior: false,
		    spacebarenabled: true,
		    railoffset: false
		});
	})
</script>
</html>