$(function(){
	
	function initIdxTable(){
    	
    	var gridCode = $("#idx_gridName").val();
    	var chnlCode = $("#idx_chnlName").val();
    	var statusArr = $("#idx_status").val();
    	$('#idx_table').jqGrid({
    		url : $.cxt + "/contract/getIndexTable",
    		postData:{"gridCode":gridCode,"chnlCode":chnlCode,"statusArr":statusArr},
    		 datatype : "json",
    		 mtype: "POST",
    		height : 400,
    		autowidth : true,
    		colNames : [ '网格名称', '渠道名称','一级分类','二级分类','基础单元名称','基础单元地址','基础单元类型','基础单元ID','操作' ],
    		colModel : [ 
    		      {name : 'GRID_NAME',align : 'center'}, 
    		      {name : 'CHNL_NAME',align : 'center'}, 
    		      {name : 'CHNL_TYPE',align : 'center'}, 
    		      {name : 'CHNL_TYPE_LEVEL2',align : 'center'}, 
    		      {name : 'PHYSICAL_NAME',align : 'center'}, 
    		      {name : 'ADDRESS',align : 'center'}, 
    		      {name : 'BIG_TYPE',align : 'center',hidden : true}, 
    		      {name : 'PHYSICAL_ID',align : 'center',hidden : true}, 
    		      {name : 'edit',align : 'center'}, 
    		     ],
    		viewrecords : true,
    		rownumbers: true,
    		rowNum : 10,
    		rowList : [ 10, 20, 30 ],
    		pager : '#idx_grid-pager'
    		 
    	});
    }
});