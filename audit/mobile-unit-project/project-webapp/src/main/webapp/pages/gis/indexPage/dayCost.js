$(function() {
	console.log(uids)
	$('#grid-table').jqGrid({
		url : $.cxt + "/map/incomelist",
		postData:{uids:uids},
		datatype : "json",
		mtype: "POST",
		height : "auto",
		autowidth : true,
		colNames : ['收入类型','收入'],
		colModel : [     
			{name : 'BUSI_TYPE',align : 'center'}, 
			{name : 'INCOME',align : 'center'},
	    ],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "收入规模明细表",
		loadComplete : topjqGridLoadComplete
	});	
})

