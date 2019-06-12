$(function (){
	var ChnlArr =$("#chnlArr").val();
	console.log(ChnlArr);
	$("#chnlInformationGrid").jqGrid({
		url : $.cxt + "/maintence/chnlInformationGrid",
		mtype: "POST",
		postData:{ChnlArr:ChnlArr},
		datatype : "json",
		height : topjqGridHeight(),
		autowidth : true,
		colNames : [ '渠道编码','渠道名称','渠道地址','渠道一级分类','渠道二级分类','渠道开店时间','渠道台席数','渠道星级','渠道能力得分','渠道归属标识','渠道销售经理','销售经理电话','渠道经营面积','渠道店员数'],
		colModel : [ 
			
		      {name : 'CHNL_CODE',align : 'center'}, 
		      {name : 'CHNL_NAME',align : 'center'}, 
		      {name : 'CHNL_ADDR',align : 'center'}, 
		      {name : 'CHNL_TYPE_LEVEL1',align : 'center'}, 
		      {name : 'CHNL_TYPE_LEVEL2',align : 'center'}, 
		      {name : 'OPEN_DATE',align : 'center'}, 
		      {name : 'CHNL_COUNTER_NUM',align : 'center'}, 
		      {name : 'CHNL_STAR',align : 'center'}, 
		      {name : 'CHNL_CAPACITY_SCORE',align : 'center'}, 
		      {name : 'CHNL_TAG',align : 'center'}, 
		      {name : 'CHNL_MNGR_NAME',align : 'center'}, 
		      {name : 'CHNL_MNGR_NUMBER',align : 'center'}, 
		      {name : 'USE_AREA',align : 'center'}, 
		      {name : 'CHNL_CLERK_NUM',align : 'center'},   
		      
	],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#chnlInformationPage',
		caption : "渠道信息表",
		loadComplete : topjqGridLoadComplete
	});

});