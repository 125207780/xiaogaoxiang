$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/map/errChannelList",
		postData:{uids:uids},
		datatype : "json",
		mtype: "POST",
		height : "auto",
		autowidth : true,
		colNames : [ '渠道名称', '类型','一级类型','二级类型' ],
		colModel : [ 
		      {name : 'CHNL_NAME',align : 'center'}, 
		      {name : 'CHNL_TYPE',align : 'center'}, 
		      {name : 'CHNL_TYPE_LEVEL1',align : 'center'}, 
		      {name : 'CHNL_TYPE_LEVEL2',align : 'center'}, 
		     ],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "渠道规模表",
		loadComplete : topjqGridLoadComplete
	});
	})
