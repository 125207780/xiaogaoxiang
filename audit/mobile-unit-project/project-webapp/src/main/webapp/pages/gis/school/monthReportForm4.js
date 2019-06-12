$(function(){
	monthReportForm4DetailListGrid()
})

function monthReportForm4DetailListGrid(){
	var lastMonth = monthInitDate4();
	   $("#monthReportForm4InfoListGrid").jqGrid('clearGridData');
	   $("#monthReportForm4InfoListGrid").GridUnload();
	   grid = $("#monthReportForm4InfoListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/getReportForm/getReportForm10",
		   datatype : "json",
		   mtype : "POST",
		   postData : {statisMonth:lastMonth},
		   height : 200,
		   width:900,
		   autowidth : false,
		   colNames: [ '地市','区县','学校编码','学校名称','异网号码','运营商','交往圈个数'], 
		   colModel: [ 
				{name:'CITY_NAME', index:'CITY_NAME',align:'center',width:140},
				{name:'QX_NAME', index:'QX_NAME',align:'center',width:140},
				{name:'SCH_ID', index:'SCH_ID',align:'center',width:140},
				{name:'SCH_NAME', index:'SCH_NAME',align:'center',width:140},
				{name:'OTHR_PARTY', index:'OTHR_PARTY',align:'center',width:140},
				{name:'OTHER_OPRAT_TYP', index:'OTHER_OPRAT_TYP',align:'center',width:140},
				{name:'CIRCLE_USERS', index:'CIRCLE_USERS',align:'center',width:140},
				
		   ], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			viewrecords: false, 
			pager : '#monthReportForm4InfoListPagers',
			loadComplete : function(){
				 topjqGridLoadComplete();
				 setNiceScroll();
			},
			
	}); 
	 //查询按钮
		$("#monthSearchList4").click(function(){
			monthReloadBasicUnitJqGrid4("search");
		});
}
var monthReloadBasicUnitJqGrid4 = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	statisMonth = $("#monthAccountPeriod4").val();
	if(statisMonth == undefined){
		statisMonth = "";
	}
	
	$("#monthReportForm4InfoListGrid").jqGrid('setGridParam',{    
        postData : {
        	statisMonth :statisMonth
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}
function monthInitDate4(){
	//上月
	var now = new Date();
	now.setTime(now.getTime()-24*60*60*1000);
	var year = now.getFullYear();
	var month = now.getMonth();
    month = month ;
    if (month < 10) 
 	   month = "0" + month;
 	var lastMonth = year.toString()+ month.toString();
 	$("#monthAccountPeriod4").datepicker({
 		language : "zh-CN",
		todayHighlight : true,
		format : 'yyyymm',
		autoclose : true,
		startView : 'months',
		maxViewMode : 'years',
		minViewMode : 'months'
	});
	$("#monthAccountPeriod4").val(lastMonth);
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