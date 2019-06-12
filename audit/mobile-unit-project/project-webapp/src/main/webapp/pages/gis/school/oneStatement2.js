$(function(){
	oneStatement2DetailListGrid()
})

function oneStatement2DetailListGrid(){
	var lastMonth = oneInitDate2();
	   $("#oneStatement2InfoListGrid").jqGrid('clearGridData');
	   $("#oneStatement2InfoListGrid").GridUnload();
	   grid = $("#oneStatement2InfoListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/getReportForm/getReportForm12",
		   datatype : "json",
		   mtype : "POST",
		   postData : {statisMonth:lastMonth},
		   height : 200,
		   width:900,
		   autowidth : false,
		   colNames: [ '日期','大中专院校数','学生数（万人）','新生数（万人）','活动进驻校园数（所）','竞品情况','移动','电信','联通','流量环比增幅（%）','wlan覆盖校园数（所）','宽带覆盖校园数（所）','渠道覆盖校园数（所）','校园新增用户数（万人）','不限量套餐用户数（万人）','青春卡用户数（万人）','不限量叠加包用户数（万人）','日租不限量用户数（万人）','非不限量用户数（万人）','移动和享包用户数（万人）','互联网畅享包用户数（万人）','校园存量用户数（万人）','不限量主套餐用户数（万人）','不限量主套餐中：青春卡不限量版用户数（万人）','不限量叠加包用户数（万人）','日租不限量用户数（万人）','非不限量用户数（万人）','移动和享包用户数（万人）','互联网畅享包用户数（万人）','开展和包活动的校园数（所）','和包APP使用用户数（万人）','视频彩铃用户数（万人）','和飞信用户数（万人）','宽带订购用户数（万人）','校园V网用户数（万人）','校园WLAN用户数（万人）'], 
		   colModel: [ 
				{ name: 'STATIS_DATE', index:'STATIS_DATE',align:'center',width:140},
				{ name: 'SCH_NUM', index:'SCH_NUM',align:'center',width:140},
				{ name: 'SCH_USER', index:'SCH_USER',align:'center',width:140},
				{ name: 'SCH_NEW_USER', index:'SCH_NEW_USER',align:'center',width:140},
				{ name: 'SCH_ACTIVE', index:'SCH_ACTIVE',align:'center',width:140},
				{ name: 'COMP_INFO', index:'COMP_INFO',align:'center',width:140},
				{ name: 'SCH_ASIT_CMCC', index:'SCH_ASIT_CMCC',align:'center',width:140},
				{ name: 'SCH_ASIT_CUCC', index:'SCH_ASIT_CUCC',align:'center',width:140},
				{ name: 'SCH_ASIT_CTCC', index:'SCH_ASIT_CTCC',align:'center',width:140},
				{ name: 'FLOW_RATE', index:'FLOW_RATE',align:'center',width:140},
				{ name: 'SCH_WLAN', index:'SCH_WLAN',align:'center',width:140},
				{ name: 'SCH_KD', index:'SCH_KD',align:'center',width:140},
				{ name: 'NUM_QUDAO', index:'NUM_QUDAO',align:'center',width:140},
				{ name: 'NEWNUM', index:'NEWNUM',align:'center',width:140},
				{ name: 'NEWNUM_UNLIMIT', index:'NEWNUM_UNLIMIT',align:'center',width:140},
				{ name: 'NEWNUM_YOUTH', index:'NEWNUM_YOUTH',align:'center',width:140},
				{ name: 'NEWNUM_PACK', index:'NEWNUM_PACK',align:'center',width:140},
				{ name: 'NEWNUM_DPACK', index:'NEWNUM_DPACK',align:'center',width:140},
				{ name: 'NEWNUM_LIMIT', index:'NEWNUM_LIMIT',align:'center',width:140},
				{ name: 'NEWNUM_AND_PACK', index:'NEWNUM_AND_PACK',align:'center',width:140},
				{ name: 'NEWNUM_WLAN_PACK', index:'NEWNUM_WLAN_PACK',align:'center',width:140},
				{ name: 'NUM', index:'NUM',align:'center',width:140},
				{ name: 'NUM_UNLIMIT', index:'NUM_UNLIMIT',align:'center',width:140},
				{ name: 'NUM_YOUTH', index:'NUM_YOUTH',align:'center',width:140},
				{ name: 'NUM_PACK', index:'NUM_PACK',align:'center',width:140},
				{ name: 'NUM_DPACK', index:'NUM_DPACK',align:'center',width:140},
				{ name: 'NUM_LIMIT', index:'NUM_LIMIT',align:'center',width:140},
				{ name: 'NUM_AND_PACK', index:'NUM_AND_PACK',align:'center',width:140},
				{ name: 'NUM_WLAN_PACK', index:'NUM_WLAN_PACK',align:'center',width:140},
				{ name: 'SCH_HB', index:'SCH_HB',align:'center',width:140},
				{ name: 'NUM_HB', index:'NUM_HB',align:'center',width:140},
				{ name: 'NUM_SPCL', index:'NUM_SPCL',align:'center',width:140},
				{ name: 'NUM_FEIXIN', index:'NUM_FEIXIN',align:'center',width:140},
				{ name: 'NUM_KD', index:'NUM_KD',align:'center',width:140},
				{ name: 'NUM_VNET', index:'NUM_VNET',align:'center',width:140},
				{ name: 'NUM_WLAN', index:'NUM_WLAN',align:'center',width:140},
			], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			viewrecords: false, 
			pager : '#oneStatement2InfoListPagers',
			loadComplete : function(){
				 topjqGridLoadComplete();
				 setNiceScroll();
			},
			
	});
	   //查询按钮
	   $("#oneSearchList2").click(function(){
		   oneReloadBasicUnitJqGrid2("search");
		 });
}
var oneReloadBasicUnitJqGrid2 = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	statisMonth = $("#oneAccountPeriod2").val();
	if(statisMonth == undefined){
		statisMonth = "";
	}
	
	$("#oneStatement2InfoListGrid").jqGrid('setGridParam',{    
        postData : {
        	statisMonth :statisMonth
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}
function oneInitDate2(){
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
 	$("#oneAccountPeriod2").datepicker({
 		format: 'yyyymmdd',
		language:  'zh-CN',
		todayBtn : "linked",
		autoclose:true,
		minview : "3"
	});
	
	$("#oneAccountPeriod2").val(lastMonth);
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