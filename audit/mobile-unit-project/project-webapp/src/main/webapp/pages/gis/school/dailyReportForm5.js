$(function(){
	dailyReportForm5DetailListGrid()
})

function dailyReportForm5DetailListGrid(){
	var lastMonth = dailyInitDate5();
	   $("#dailyReportForm5InfoListGrid").jqGrid('clearGridData');
	   $("#dailyReportForm5InfoListGrid").GridUnload();
	   grid = $("#dailyReportForm5InfoListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/getReportForm/getReportForm8",
		   datatype : "json",
		   mtype : "POST",
		   postData : {statisMonth:lastMonth},
		   height : 200,
		   width:900,
		   autowidth : false,
		   colNames: [ '日期','地市名称','区县名称','学校名称','分校区编码','分校区名称',,'拍照客户数','当前保有客户数','客户保有率'], 
		   colModel: [ 
				{ name: 'STATIS_DATE', index:'STATIS_DATE',align:'center', width:140},
				{ name: 'SCH_AREA_NAME', index:'SCH_AREA_NAME',align:'center', width:140},
				{ name: 'CNTY_NAME', index:'CNTY_NAME',align:'center', width:140},
				{ name: 'SCH_ID',index: 'SCH_ID',align: 'center', width:140},
				{ name: 'SCH_NAME', index:'SCH_NAME',align:'center', width:140},
				{ name: 'SCH_PART_ID',index: 'SCH_PART_ID',align: 'center', width:140},
				{ name: 'SCH_PART_NAME',index: 'SCH_PART_NAME',align: 'center', width:140},
				{ name: 'PZ_USRS', index:'PZ_USRS',align:'center', width:140},
				{ name: 'ONNET_USRS', index:'ONNET_USRS',align:'center', width:140},
				{ name: 'ONNET_RATE', index: 'ONNET_RATE' ,align: 'center', width:140},
			], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			viewrecords: false, 
			pager : '#dailyReportForm5InfoListPagers',
			loadComplete : function(){
				 topjqGridLoadComplete();
				 setNiceScroll();
			},
			
	});
	   //查询按钮
	   $("#dailySearchList5").click(function(){
		   dailyReloadBasicUnitJqGrid5("search");
		 });
}
var dailyReloadBasicUnitJqGrid5 = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	statisMonth = $("#dailyAccountPeriod5").val();
	if(statisMonth == undefined){
		statisMonth = "";
	}
	
	$("#dailyReportForm5InfoListGrid").jqGrid('setGridParam',{    
        postData : {
        	statisMonth :statisMonth
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}
function dailyInitDate5(){
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
 	$("#dailyAccountPeriod5").datepicker({
 		format: 'yyyymmdd',
		language:  'zh-CN',
		todayBtn : "linked",
		autoclose:true,
		minview : "3"
	});
	
	$("#dailyAccountPeriod5").val(lastMonth);
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