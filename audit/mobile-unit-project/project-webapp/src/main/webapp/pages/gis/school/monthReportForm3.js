$(function(){
	monthReportForm3DetailListGrid()
})

function monthReportForm3DetailListGrid(){
	var lastMonth = monthInitDate3();
	   $("#monthReportForm3InfoListGrid").jqGrid('clearGridData');
	   $("#monthReportForm3InfoListGrid").GridUnload();
	   grid = $("#monthReportForm3InfoListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/getReportForm/getReportForm9",
		   datatype : "json",
		   mtype : "POST",
		   postData : {statisMonth:lastMonth},
		   height : 200,
		   width:900,
		   autowidth : false,
		   colNames: [ '地市名称','区县','学校编码','学校名称','客户号码','ARPU','DOU','MOU','当前主套餐编码','当前主套餐名称','是否4G','是否V网','是否宽带客户','合约活动类型','产品编码','合约活动产品名称','优惠编码','合约活动优惠名称','到期时间','网龄','当月折扣折让金额','折扣优惠编码','折扣优惠档次','套餐减免优惠编码','套餐减免优惠名称'], 
		   colModel: [ 
				{ name: 'AREA_NAME', index:'AREA_NAME',align:'center',width:140},
				{ name: 'QX_NAME', index:'QX_NAME',align:'center',width:140},
				{ name: 'SCH_ID', index:'SCH_ID',align:'center',width:140},
				{ name: 'SCH_NAME', index:'SCH_NAME',align:'center',width:140},
				{ name: 'SVC_CODE', index:'SVC_CODE',align:'center',width:140},
				{ name: 'ARPU', index:'ARPU',align:'center',width:140},
				{ name: 'DOU', index:'DOU',align:'center',width:140},
				{ name: 'MOU', index:'MOU',align:'center',width:140},
				{ name: 'TAOCAN_ID', index:'TAOCAN_ID',align:'center',width:140},
				{ name: 'TAOCAN_NAME', index:'TAOCAN_NAME',align:'center',width:140},
				{ name: 'IS_4G', index:'IS_4G',align:'center',width:140},
				{ name: 'IS_VNET', index:'IS_VNET',align:'center',width:140},
				{ name: 'IS_KD', index:'IS_KD',align:'center',width:140},
				{ name: 'CONTRACT_CAT', index:'CONTRACT_CAT',align:'center',width:140},
				{ name: 'CONT_PRODUCT_ID', index:'CONT_PRODUCT_ID',align:'center',width:140},
				{ name: 'CONT_PRODUCT_NAME', index:'CONT_PRODUCT_NAME',align:'center',width:140},
				{ name: 'CONT_PACKAGE_ID', index:'CONT_PACKAGE_ID',align:'center',width:140},
				{ name: 'CONT_PACKAGE_NAME', index:'CONT_PACKAGE_NAME',align:'center',width:140},
				{ name: 'CONT_INVAL', index:'CONT_INVAL',align:'center',width:140},
				{ name: 'ONLINE_MONTH', index:'ONLINE_MONTH',align:'center',width:140},
				{ name: 'FEE_DISCNT', index:'FEE_DISCNT',align:'center',width:140},
				{ name: 'DISCNT_YOUHUI_ID', index:'DISCNT_YOUHUI_ID',align:'center',width:140},
				{ name: 'DISCNT_YOUHUI_RANK', index:'DISCNT_YOUHUI_RANK',align:'center',width:140},
				{ name: 'DISCNT_ID', index:'DISCNT_ID',align:'center',width:140},
				{ name: 'DISCNT_NAME', index:'DISCNT_NAME',align:'center',width:140},
		   ], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			viewrecords: false, 
			pager : '#monthReportForm3InfoListPagers',
			loadComplete : function(){
				 topjqGridLoadComplete();
				 setNiceScroll();
			},
			
	}); 
	 //查询按钮
		$("#monthSearchList3").click(function(){
			monthReloadBasicUnitJqGrid3("search");
		});
}
var monthReloadBasicUnitJqGrid3 = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	statisMonth = $("#monthAccountPeriod3").val();
	if(statisMonth == undefined){
		statisMonth = "";
	}
	
	$("#monthReportForm3InfoListGrid").jqGrid('setGridParam',{    
        postData : {
        	statisMonth :statisMonth
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}
function monthInitDate3(){
	//上月
	var now = new Date();
	now.setTime(now.getTime()-24*60*60*1000);
	var year = now.getFullYear();
	var month = now.getMonth();
    month = month ;
    if (month < 10) 
 	   month = "0" + month;
 	var lastMonth = year.toString()+ month.toString();
 	$("#monthAccountPeriod3").datepicker({
 		language : "zh-CN",
		todayHighlight : true,
		format : 'yyyymm',
		autoclose : true,
		startView : 'months',
		maxViewMode : 'years',
		minViewMode : 'months'
	});
	$("#monthAccountPeriod3").val(lastMonth);
	return lastMonth;
}
function setNiceScroll(){
	/*$(".ui-jqgrid-bdiv").scrollBar({
	    barWidth: 6, //滚动条的宽度(这里根据需要写数值即可，不设置是10,即默认10px)
	    position: "x,y", //写“x”代表只出水平滚动条，写“y”表示只出垂直滚动条，写“x,y”则出水平和垂直滚动条（只有在内容超出容器时才出现滚动条）
	    wheelDis: 15 //滚轮滚动一次向下或向上滚动的距离，默认是15，可根据需要修改数值
	});*/
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight:$(window).height()-190,
	    cursorcolor:"#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
}