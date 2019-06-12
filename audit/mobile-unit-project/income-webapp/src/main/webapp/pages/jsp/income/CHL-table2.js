$(function(){
	initGrid();
});

function initGrid(){
	var time = $("#CHL-id").val();
	var data = new Object();
	data.month= time.split("-")[0];
	data.year= time.split("-")[1];
	var dataJstr = JSON.stringify(data);
	var data = [
		{"zhangqi":"9","ACTION_NAME":"大王卡","活动类型":"流量","A":"1","B":"1","C":"1","D":"1","E":"1","F":"1","G":"1","H":"1","I":"1"}
		]
	$('#CHL_table2').jqGrid({
		/*url : $.cxt + "//",
		postData:{time : time},*/
		datatype : "local",
		//datatype : "JSON",
		data:data,
		mtype: "POST",
		height : "auto",
		autowidth : true,
		colNames : [ '统计账期','存量订购','活动类型','存量订购','本年新增订购','其中：本季度订购','存量订购','本年订购','其中：本季度订购','本年订购','本年新增订购存活率','本季度订购存活率'],
		colModel : [ 
			  {name : 'zhangqi',align : 'center'}, //账期
		      {name : 'ACTION_NAME',align : 'center'}, //活动名称
		      {name : 'ACTION_TYPE',align : 'center'}, //活动类型
		      {name : 'A',align : 'center'}, //存量订购
		      {name : 'B',align : 'center'}, //	本年新增订购
		      {name : 'C',align : 'center'}, //其中：本季度订购
		      {name : 'D',align : 'center'}, //存量订购
		      {name : 'E',align : 'center'}, //本年订购
		      {name : 'F',align : 'center'}, //其中：本季度订购
		      {name : 'G',align : 'center'}, //本年订购
		      {name : 'H',align : 'center'}, //本年新增订购存活率
		      {name : 'I',align : 'center'}, //本年新增订购存活率
      
		     ],
		//	caption:["成本","收入"],  
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#CHL_grid2',
		//caption : "小区规模明细表",
		loadComplete : topjqGridLoadComplete
	});	
	$("#CHL_table2").jqGrid('setGroupHeaders', {
	    useColSpanStyle: true,
	    groupHeaders:[
	        {startColumnName:'A', numberOfColumns:3, titleText: '订购用户数'},
	        {startColumnName:'D', numberOfColumns: 3, titleText: '截止当前账期仍通信在网用户'} ,
	        {startColumnName:'G', numberOfColumns: 3, titleText: '存活率'} 
	    ] 
	})
}
$("#search").on("click",search);
function search(){
	var time = $("#CHL-id").val();
	var data = new Object();
	data.month= time.split("-")[0];
	data.year= time.split("-")[1];
	var dataJstr = JSON.stringify(data);
	console.log(dataJstr);
	//var time = $("#id-date-picker-1").val();
	$("#CHL_table2").jqGrid('clearGridData');  //清空表格
	$("#CHL_table2").jqGrid('setGridParam',{  // 重新加载数据
		  
	      datatype:'json',
	      data : dataJstr,   //  newdata 是符合格式要求的需要重新加载的数据 
	      page:1
	}).trigger("reloadGrid");
	
	
}
