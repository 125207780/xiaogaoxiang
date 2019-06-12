$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/map/villagelist",
		postData:{uids:uids},
		datatype : "json",
		mtype: "POST",
		height : "auto",
		autowidth : true,
		colNames : [ '小区类型','小区规模'],
		colModel : [ 
		      {name : 'SMALL_TYPE',align : 'center'}, 
		      {name : 'XIAOQU_NUM',align : 'center'}, 
		     ],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "小区规模明细表",
		loadComplete : topjqGridLoadComplete
	});	
	})

