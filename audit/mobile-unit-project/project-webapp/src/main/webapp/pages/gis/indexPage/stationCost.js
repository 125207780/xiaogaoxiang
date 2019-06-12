$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/map/stationlist",
		postData:{uids:uids},
		datatype : "json",
		mtype: "POST",
		height : "auto",
		autowidth : true,
		colNames : [ '基站类型','基站规模'],
		colModel : [ 
		    
		      {name : 'STATION_TYPE',align : 'center'}, 
		      {name : 'NUM',align : 'center'}, 
		     ],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "基站规模明细表",
		loadComplete : topjqGridLoadComplete
	});	
	})

