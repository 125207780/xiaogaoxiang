$(function(){
	dailyReportForm4DetailListGrid()
})

function dailyReportForm4DetailListGrid(){
	var lastMonth = dailyInitDate4();
	   $("#dailyReportForm4InfoListGrid").jqGrid('clearGridData');
	   $("#dailyReportForm4InfoListGrid").GridUnload();
	   grid = $("#dailyReportForm4InfoListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/getReportForm/getReportForm7",
		   datatype : "json",
		   mtype : "POST",
		   postData : {statisMonth:lastMonth},
		   height : 200,
		   width:($("#gview_dailyReportForm4InfoListGrid").width()),
		   autowidth : false,
		   colNames: [ '日期','地市','区县','学校编码','学校名称','分校区编码','分校区名称','业务类型','优惠编码','优惠名称','当日办理量','当月办理量','累计办理量'], 
		   colModel: [ 
			{ name: 'STATIS_DATE', index:'STATIS_DATE',align:'center', width:140},
			{ name: 'SCH_AREA_NAME', index:'SCH_AREA_NAME',align:'center', width:140},
			{ name: 'CNTY_NAME', index:'CNTY_NAME',align:'center', width:140},
			{ name: 'SCH_ID', index:'SCH_ID',align:'center', width:140},
			{ name: 'SCH_NAME', index:'SCH_NAME',align:'center', width:140},
			{ name: 'SCH_PART_ID', index:'SCH_PART_ID',align:'center', width:140},
			{ name: 'SCH_PART_NAME', index:'SCH_PART_NAME',align:'center', width:140},
			{ name: 'LEVEL_1_NAME', index:'LEVEL_1_NAME',align:'center', width:140},
			{ name: 'DISCNT_ID', index:'DISCNT_ID',align:'center', width:140},
			{ name: 'DISCNT_NAME', index:'DISCNT_NAME',align:'center', width:140},
			{ name: 'ORDER_TODAY', index:'ORDER_TODAY',align:'center', width:140},
			{ name: 'ORDER_MONTH', index:'ORDER_MONTH',align:'center', width:140},
			{ name: 'ORDER_TOTAL',index: 'ORDER_TOTAL',align: 'center', width:140},
			], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			viewrecords: false, 
			pager : '#dailyReportForm4InfoListPagers',
			gridComplete : dailyReportForm4setNiceScroll,
			loadComplete : function(){
				 topjqGridLoadComplete();
			},
			
	});
	   //查询按钮
	   $("#dailySearchList4").click(function(){
		   dailyReloadBasicUnitJqGrid4("search");
		 });
	 //导出
		$("#getReportForm7Export").click(function(){
			var statisMonth = encodeURI(encodeURI($("#dailyAccountPeriod4").val()));
			window.location.href=$.cxt +"/getReportForm/getReportForm7Export?statisMonth="+statisMonth;
		})
}
var dailyReloadBasicUnitJqGrid4 = function(flag) {
	debugger
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	statisMonth = $("#dailyAccountPeriod4").val();
	if(statisMonth == undefined){
		statisMonth = "";
	}
	
	$("#dailyReportForm4InfoListGrid").jqGrid('setGridParam',{    
        postData : {
        	statisMonth :statisMonth
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}
function dailyInitDate4(){
	//昨日
	var now = new Date();
	now.setTime(now.getTime()-24*60*60*1000);
	var year = now.getFullYear();
	var month = now.getMonth();
	var date = now.getDate();
    month = month + 1;
    if (month < 10) 
 	   month = "0" + month;
    if (date < 10)  
 	   date = "0" + date;
 	var lastMonth = year.toString()+ month.toString() + date.toString();
 	$("#dailyAccountPeriod4").datepicker({
 		format: 'yyyymmdd',
		language:  'zh-CN',
		todayBtn : "linked",
		autoclose:true,
		minview : "3"
	});
	
	$("#dailyAccountPeriod4").val(lastMonth);
	return lastMonth;
}
function dailyReportForm4setNiceScroll(){
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