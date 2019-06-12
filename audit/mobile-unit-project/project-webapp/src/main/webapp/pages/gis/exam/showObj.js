$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/exam/showObj",
		postData:{examid:id},
		datatype : "json",
		mtype: "POST",
		height : "auto",
		autowidth : true,
		colNames : [ '主键ID','指标ID','规则JSON','指标分类','指标名称','权重','指标定义','周期类型','考核规则','模板ID'],
		colModel : [ 
/*			   SELECT ID,KPI_ID,KPI_ROLEJSON,KPI_TYPE,KPI_NAME,KPI_WEIGHT,KPI_DEFINE,CYCLE_TYPE,KPI_ROLESTR,EXAM_ID
*/		      {name : 'ID',align : 'center'}, 
		      {name : 'KPI_ID',align : 'center'}, 
		      {name : 'KPI_ROLEJSON',align : 'center'},
		      {name : 'KPI_TYPE',align : 'center'}, 
		      {name : 'KPI_NAME',align : 'center'}, 
		      {name : 'KPI_WEIGHT',align : 'center'},
		      {name : 'KPI_DEFINE',align : 'center'}, 
		      {name : 'CYCLE_TYPE',align : 'center',formatter : cycleEdit}, 
		      {name : 'KPI_ROLESTR',align : 'center'},
		      {name : 'EXAM_ID',align : 'center'}
		     ],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "考核指标表",
		loadComplete : topjqGridLoadComplete
	});
	
	function cycleEdit(cellvalue, options, cell) {
		var cycle;
		if(cellvalue == "month"){
			cycle = "月度考核";
		}else if(cellvale == "quarter"){
			cycle = "季度考核";
		}else if(cellvale == "year"){
			cycle = "年度考核";
		}
		return cycle;  
	}
	
	})

