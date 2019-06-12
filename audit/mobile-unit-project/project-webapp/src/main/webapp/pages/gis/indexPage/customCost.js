$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/map/customerlist",
		postData:{uids:uids},
		datatype : "json",
		mtype: "POST",
		height : "auto",
		autowidth : true,
		colNames : [ '客户归属','客户规模'],
		colModel : [ 
			  {name : 'CUST_BELONG',align : 'center'}, 
			  {name : 'CUST_NUM',align : 'center'}, 
		],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "客户规模明细表",
		loadComplete : topjqGridLoadComplete
	});
})

