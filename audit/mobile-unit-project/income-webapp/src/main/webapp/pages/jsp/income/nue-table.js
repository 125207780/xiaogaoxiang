$(function(){
	console.log($("#index1").val())
	$("#areaId").html($("#index1").val());
})
	 
function initParam(){
	$('#statisMonth').datepicker({
		language : "zh-CN",
		todayHighlight : true,
		format : 'yyyymm',
		autoclose : true,
		startView : 'months',
		maxViewMode : 'years',
		minViewMode : 'months'
	});
}
function initGrid(){
	$('#CostAndRevenue_Table_grid-table').jqGrid({
		datatype : "local",
		shrinkToFit:false,
	    autoScroll: true,
	    height: '100%',
		colNames : ['AREA_ID','PROD_ID','STATIS_MONTH','PACKAGE_ID', '活动名称','活动类型','当月订购用户数','本季度累计订购用户数','存量订购在网用户数','当月订购成本','存量订购在当月成本','当月合计成本','本季度累计成本','当月新增订购收入','存量订购在当月收入','当月合计收入','投入产出比','本季度累计收入'],
		colModel : [ 
			 {name : 'AREA_ID',align : 'center', width: 90,hidden : true},  //地市
			 {name : 'PROD_ID',align : 'center', width: 90,hidden : true},  //产品id
			 {name : 'STATIS_MONTH',align : 'center', width: 90,hidden : true},  //账期
			 {name : 'PACKAGE_ID',align : 'center', width: 90,hidden : true},  //包id
		     {name : 'PACKAGE_NAME', width: 90,align : 'center'}, //活动名称
		     {name : 'CAMPN_KIND', width: 90,align : 'center'}, //活动类型
		     {name : 'ORDER_USR_M', width: 90,align : 'center'}, //当月订购用户数
		     {name : 'ORDER_USR_TQ', width: 90,align : 'center'}, //	本季度累计订购用户数
		     {name : 'ORDER_USR_OLD', width: 90,align : 'center'}, //存量订购在网用户数
		     {name : 'COST_FEE_NEW', width: 90,align : 'center'}, //当月订购成本
		     {name : 'COST_FEE_OLD', width: 90,align : 'center'}, //存量订购在当月成本
		     {name : 'COST_FEE_TOTAL', width: 90,align : 'center'}, //当月合计成本
		     {name : 'COST_FEE_TQ', width: 90,align : 'center'}, //本季度累计成本
		     {name : 'COST_FEE_NEW_N', width: 90,align : 'center'}, //当月新增订购收入
		     {name : 'COST_FEE_OLD_N', width: 90,align : 'center'}, //存量订购在当月收入
		     {name : 'COST_FEE_TOTAL_N', width: 90,align : 'center'}, //当月合计收入
		     {name : 'OUT_IN_RA', width: 90,align : 'center'}, //投入产出比
		     {name : 'INCOME_FEE_TQ', width: 90,align : 'center'}, //本季度累计收入	      
		     ],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#CostAndRevenue_Table_grid-pager',
		loadComplete : function(){
			updatePagerIcons();
			var datalist = $("#CostAndRevenue_Table_grid-table").jqGrid("getRowData");
			if(datalist&&datalist.length>0){
				$("#CostAndRevenue_Table_grid-table").jqGrid('setSelection',1,true);
			}
		},
		gridComplete: function() { 
	    	setNiceScroll();
	   }, 
		onSelectRow : function(rowid, status){
			var data = $(this).jqGrid('getRowData',rowid);
			queryEcharts1(data.STATIS_MONTH,  data.AREA_ID,  data.PROD_ID,  data.PACKAGE_ID);
			queryEcharts2(data.STATIS_MONTH,  data.AREA_ID,  data.PROD_ID,  data.PACKAGE_ID);
			queryEcharts3(data.STATIS_MONTH,  data.AREA_ID,  data.PROD_ID,  data.PACKAGE_ID);
			queryEcharts4(data.STATIS_MONTH,  data.AREA_ID,  data.PROD_ID,  data.PACKAGE_ID);
		}
	});	
	$("#CostAndRevenue_Table_grid-table").jqGrid('setGroupHeaders', {
	    useColSpanStyle: true,
	    groupHeaders:[
	        {startColumnName:'COST_FEE_NEW', numberOfColumns:4, titleText: '成本'},
	        {startColumnName:'COST_FEE_NEW_N', numberOfColumns: 5, titleText: '收入'} 
	    ] 
	})
	queryTable();
}

function queryTable(){
	var areaId= $("#areaId").val();
	var statisMonth = $("#statisMonth").val();
	 
	if(statisMonth==""){
		messageAlert("账期不能为空");
		return false;
	}
	var param = new Object();
	param.areaId= areaId;
	param.statisMonth= statisMonth;
 
	$("#CostAndRevenue_Table_grid-table").jqGrid('clearGridData');  //清空表格
	$("#CostAndRevenue_Table_grid-table").jqGrid('setGridParam',{  // 重新加载数据
	mtype: "POST",
	url : $.cxt + "/page2/selectTable",
	postData: param,
    datatype:'json',
    page:1
	}).trigger("reloadGrid");
}
function messageAlert(message){
	bootbox.dialog({
        message: "<span style=\"color:#000\">"+message+"</span>",
        title: "消息提示",
        buttons: {
            OK: {
                label: "确定",
                className: "btn-success",
            }
        }
    });
}
function setNiceScroll(){
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight:$(window).height()-190,
	    cursorcolor:"#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
}
