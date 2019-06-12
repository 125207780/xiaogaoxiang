$(function() {
	$('#grid_table').jqGrid({
		url : $.cxt + "/exam/selectIndicator",
/*		postData:{examid:'9aacbcb08eec46e58a212e0e555dd14b'},
*/		datatype : "json",
		mtype: "POST",
		height : topjqGridHeight(),
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
		      {name : 'CYCLE_TYPE',align : 'center'}, 
		      {name : 'KPI_ROLESTR',align : 'center'},
		      {name : 'EXAM_ID',align : 'center'}
		     ],
		viewrecords : true,
		rownumbers: true,
        multiselect: true,//复选框   
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "考核指标表",
		loadComplete : topjqGridLoadComplete,
		onSelectRow:function(rowid,state, e) {
			var obj = $(this).jqGrid('getRowData',rowid);
		    if(state){
		    	selectArr[obj.KPI_ID]=obj;
		    }else{
		    	if(selectArr[obj.KPI_ID]){
		    		delete  selectArr[obj.KPI_ID];
		    	} 
		    }
		},
		onSelectAll:function(aRowids,status) {
            var _this = this;
            var rowData = $(_this).jqGrid('getRowData');
            for(var i=0,n=rowData.length;i<n;i++){
            	var obj = rowData[i];
            	if(status){
            		selectArr[obj.KPI_ID]=obj;
	            }else{
	            	if(selectArr[obj.KPI_ID]){
	            		delete  selectArr[obj.KPI_ID];
			    	} 
	            }    
            }
                   
        },
	});	
	})
	
		

/*	function getSelecteds(){
	var ids = $("#grid-table").jqGrid("getGridParam", "selarrrow");
	$(ids).each(function (index, id){
	var row = $("#grid-table").jqGrid('getRowData', id);
	alert("row.ID:"+row.ID+"  "+"row.fieldName:"+row.fieldName);
	}
}*/
