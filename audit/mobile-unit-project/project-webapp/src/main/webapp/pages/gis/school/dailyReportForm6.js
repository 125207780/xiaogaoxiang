$(function(){
	dailyReportForm6DetailListGrid()
})

function dailyReportForm6DetailListGrid(){
	var lastMonth = dailyInitDate6();
	   $("#dailyReportForm6InfoListGrid").jqGrid('clearGridData');
	   $("#dailyReportForm6InfoListGrid").GridUnload();
	   grid = $("#dailyReportForm6InfoListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/getReportForm/getReportForm14",
		   datatype : "json",
		   mtype : "POST",
		   postData : {statisMonth:lastMonth},
		   height : 200,
		   width:900,
		   autowidth : false,
		   colNames: [ '日期','地市','学校编码','学校名称','分校区编码','分校区名称','学生数','本网学生数','异网学生数','其中：异网联通学生数','其中：异网电信学生数','本网：学生用户占比','异网：学生用户占比','学生数','本网学生数','异网学生数','其中：异网联通学生数','其中：异网电信学生数','本网：学生用户占比','异网：学生用户占比','学生数','本网学生数','异网学生数','其中：异网联通学生数','其中：异网电信学生数','本网：学生用户占比','异网：学生用户占比','学生数','本网学生数','异网学生数','其中：异网联通学生数','其中：异网电信学生数','本网：学生用户占比','异网：学生用户占比'], 
		   colModel: [ 
			{ name: 'STATIS_DATE', index:'STATIS_DATE',align:'center', width:140},
			{ name: 'CITY_NAME', index:'CITY_NAME',align:'center', width:140},
			{ name: 'SCH_ID', index:'SCH_ID',align:'center', width:140},
			{ name: 'SCH_NAME', index:'SCH_NAME',align:'center', width:140},
			{ name: 'SCH_PART_ID', index:'SCH_PART_ID',align:'center', width:140},
			{ name: 'SCH_PART_NAME', index:'SCH_PART_NAME',align:'center', width:140},
			{ name: 'ALL_NUM', index:'ALL_NUM',align:'center', width:140},
			{ name: 'CMCC', index:'CMCC',align:'center', width:140},
			{ name: 'ALL_COMPI', index:'ALL_COMPI',align:'center', width:140},
			{ name: 'CUCC', index:'CUCC',align:'center', width:140},
			{ name: 'CTCC', index:'CTCC',align:'center', width:140},
			{ name: 'RATE_BENWANG', index:'RATE_BENWANG',align:'center', width:140},
			{ name: 'RATE_COMPI', index:'RATE_COMPI',align:'center', width:140},
			{ name: 'ALL_NEW_NUM', index:'ALL_NEW_NUM',align:'center', width:140},
			{ name: 'NEW_CMCC', index:'NEW_CMCC',align:'center', width:140},
			{ name: 'ALL_NEW_COMPI', index:'ALL_NEW_COMPI',align:'center', width:140},
			{ name: 'NEW_CUCC', index:'NEW_CUCC',align:'center', width:140},
			{ name: 'NEW_CTCC', index:'NEW_CTCC',align:'center', width:140},
			{ name: 'RATE_NEW_BENWANG', index:'RATE_NEW_BENWANG',align:'center', width:140},
			{ name: 'RATE_NEW_COMPI', index:'RATE_NEW_COMPI',align:'center', width:140},
			{ name: 'ALL_NUM_S', index:'ALL_NUM_S',align:'center', width:140},
			{ name: 'CMCC_S', index:'CMCC_S',align:'center', width:140},
			{ name: 'ALL_COMPI_S', index:'ALL_COMPI_S',align:'center', width:140},
			{ name: 'CUCC_S', index:'CUCC_S',align:'center', width:140},
			{ name: 'CTCC_S', index:'CTCC_S',align:'center', width:140},
			{ name: 'RATE_BENWANG_S', index:'RATE_BENWANG_S',align:'center', width:140},
			{ name: 'RATE_COMPI_S', index:'RATE_COMPI_S',align:'center', width:140},
			{ name: 'ALL_NEW_NUM_S', index:'ALL_NEW_NUM_S',align:'center', width:140},
			{ name: 'NEW_CMCC_S', index:'NEW_CMCC_S',align:'center', width:140},
			{ name: 'NEW_COMPI_S', index:'NEW_COMPI_S',align:'center', width:140},
			{ name: 'NEW_CUCC_S', index:'NEW_CUCC_S',align:'center', width:140},
			{ name: 'NEW_CTCC_S', index:'NEW_CTCC_S',align:'center', width:140},
			{ name: 'RATE_NEW_BENWANG_S', index:'RATE_NEW_BENWANG_S',align:'center', width:140},
			{ name: 'RATE_NEW_COMPI_S', index:'RATE_NEW_COMPI_S',align:'center', width:140},
			], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			viewrecords: false, 
			pager : '#dailyReportForm6InfoListPagers',
			loadComplete : function(){
				 topjqGridLoadComplete();
				 setNiceScroll();
			},
			
	});
	   //查询按钮
	   $("#dailySearchList6").click(function(){
		   dailyReloadBasicUnitJqGrid6("search");
		 });
}
var dailyReloadBasicUnitJqGrid6 = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	statisMonth = $("#dailyAccountPeriod6").val();
	if(statisMonth == undefined){
		statisMonth = "";
	}
	
	$("#dailyReportForm6InfoListGrid").jqGrid('setGridParam',{    
        postData : {
        	statisMonth :statisMonth
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}
function dailyInitDate6(){
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
 	$("#dailyAccountPeriod6").datepicker({
 		format: 'yyyymmdd',
		language:  'zh-CN',
		todayBtn : "linked",
		autoclose:true,
		minview : "3"
	});
	
	$("#dailyAccountPeriod6").val(lastMonth);
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