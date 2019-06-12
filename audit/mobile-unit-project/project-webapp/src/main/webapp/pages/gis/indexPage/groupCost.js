$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/map/vipcustomerlist",
		postData:{uids:uids},
		 datatype : "json",
		 mtype: "POST",
		 height : "auto",
		autowidth : true,
		colNames : ['集团类型' ,'集团规模'],
		colModel : [ 	   
		      {name : 'GROUP_TYPE',align : 'center'}, 
		      {name : 'GROUP_NUM',align : 'center'}, 
		  
		     ],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "集团规模明细表",
		loadComplete : topjqGridLoadComplete
	});
	
	})