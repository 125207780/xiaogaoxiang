$(function(){
	dailyReportForm3DetailListGrid()
})

function dailyReportForm3DetailListGrid(){
	var lastMonth = dailyInitDate3();
	   $("#dailyReportForm3InfoListGrid").jqGrid('clearGridData');
	   $("#dailyReportForm3InfoListGrid").GridUnload();
	   grid = $("#dailyReportForm3InfoListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/getReportForm/getReportForm6",
		   datatype : "json",
		   mtype : "POST",
		   postData : {statisMonth:lastMonth},
		   height : 200,
		   width:($("#gview_dailyReportForm3InfoListGrid").width()),
		   autowidth : false,
		   colNames: [ '日期','地市','区县','学校编码','学校名称','分校区编码','分校区名称','校园和享包','畅享包','区域流量包','语音叠加包','流量提速包','入网送费','入网送和包券','入网办甜言蜜语包','入网送高校集团网','存费送费','存费送和包券','不限量叠加包','校园明星机','信用购','融合宽带','叠加型宽带','单宽带','套餐功能费减免'], 
		   colModel: [ 
			{ name: 'STATIS_DATE', index:'STATIS_DATE',align:'center', width:140},
			{ name: 'SCH_AREA_NAME', index:'SCH_AREA_NAME',align:'center', width:140},
			{ name: 'CNTY_NAME', index:'CNTY_NAME',align:'center', width:140},
			{ name: 'SCH_ID', index:'SCH_ID',align:'center', width:140},
			{ name: 'SCH_NAME', index:'SCH_NAME',align:'center', width:140},
			{ name: 'SCH_PART_ID', index:'SCH_PART_ID',align:'center', width:140},
			{ name: 'SCH_PART_NAME', index:'SCH_PART_NAME',align:'center', width:140},
			{ name: 'PACK_HE', index:'PACK_HE',align:'center', width:140},
			{ name: 'PACK_CHANG', index:'PACK_CHANG',align:'center', width:140},
			{ name: 'PACK_DISTRI_FLOW', index:'PACK_DISTRI_FLOW',align:'center', width:140},
			{ name: 'PACK_VOICE', index:'PACK_VOICE',align:'center', width:140},
			{ name: 'PACK_FLOW_SPEED_UP', index:'PACK_FLOW_SPEED_UP',align:'center', width:140},
			{ name: 'ACCESS_DISC_FEE', index:'ACCESS_DISC_FEE',align:'center', width:140},
			{ name: 'ACCESS_DISC_TICKET', index:'ACCESS_DISC_TICKET',align:'center', width:140},
			{ name: 'ACCESS_DISC_VOICE', index:'ACCESS_DISC_VOICE',align:'center', width:140},
			{ name: 'ACCESS_DISC_GROUP', index:'ACCESS_DISC_GROUP',align:'center', width:140},
			{ name: 'DISC_FEE', index:'DISC_FEE',align:'center', width:140},
			{ name: 'DISC_TICKET', index:'DISC_TICKET',align:'center', width:140},
			{ name: 'DISC_UNLIMIT', index:'DISC_UNLIMIT',align:'center', width:140},
			{ name: 'TERMI_DISC_HOT', index:'TERMI_DISC_HOT',align:'center', width:140},
			{ name: 'TERMI_DISC_CREDIT', index:'TERMI_DISC_CREDIT',align:'center', width:140},
			{ name: 'KD_DISC_MULTI', index:'KD_DISC_MULTI',align:'center', width:140},
			{ name: 'KD_DISC_DIAJIA', index:'KD_DISC_DIAJIA',align:'center', width:140},
			{ name: 'KD_DISC_SINGAL', index:'KD_DISC_SINGAL',align:'center', width:140},
			{ name: 'DISC_TAOCAN',index: 'DISC_TAOCAN',align: 'center', width:140},

			], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			viewrecords: false, 
			pager : '#dailyReportForm3InfoListPagers',
			gridComplete : dailyReportForm3setNiceScroll,
			loadComplete : function(){
				topjqGridLoadComplete();
			},
			
	});
	   //查询按钮
	   $("#dailySearchList3").click(function(){
		   dailyReloadBasicUnitJqGrid3("search");
		 });
	 //导出
		$("#getReportForm6Export").click(function(){
			var statisMonth = encodeURI(encodeURI($("#dailyAccountPeriod3").val()));
			window.location.href=$.cxt +"/getReportForm/getReportForm6Export?statisMonth="+statisMonth;
		})
}
var dailyReloadBasicUnitJqGrid3 = function(flag) {
	debugger
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	statisMonth = $("#dailyAccountPeriod3").val();
	if(statisMonth == undefined){
		statisMonth = "";
	}
	
	$("#dailyReportForm3InfoListGrid").jqGrid('setGridParam',{    
        postData : {
        	statisMonth :statisMonth
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}
function dailyInitDate3(){
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
 	$("#dailyAccountPeriod3").datepicker({
 		format: 'yyyymmdd',
		language:  'zh-CN',
		todayBtn : "linked",
		autoclose:true,
		minview : "3"
	});
	
	$("#dailyAccountPeriod3").val(lastMonth);
	return lastMonth;
}
function dailyReportForm3setNiceScroll(){
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