$(function(){
	oneStatement1DetailListGrid()
})

function oneStatement1DetailListGrid(){
	var lastMonth = oneInitDate1();
	   $("#oneStatement1InfoListGrid").jqGrid('clearGridData');
	   $("#oneStatement1InfoListGrid").GridUnload();
	   grid = $("#oneStatement1InfoListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/getReportForm/getReportForm11",
		   datatype : "json",
		   mtype : "POST",
		   postData : {statisMonth:lastMonth},
		   height : 200,
		   width:900,
		   autowidth : false,
		   colNames: [ '日期','校园移动用户DOU（GB）','其中不限量用户DOU（GB）','不限量主套餐用户DOU（GB）','DOU为0的用户数（万人）','DOU为（0,100MB）的用户数（万人）','DOU为（100MB，5GB）的用户数（万人）','DOU为（5GB，10GB）的用户数（万人）','DOU为（10GB，15GB）的用户数（万人）','DOU为（15GB，20GB）的用户数（万人）','DOU为（20GB，40GB）以上的用户数（万人）','DOU为40GB以上的用户数（万人）','青春卡不限量版用户DOU（GB）','DOU为0的用户数（万人）','DOU为（0,100MB）的用户数（万人）','DOU为（100MB，5GB）的用户数（万人）','DOU为（5GB，10GB）的用户数（万人）','DOU为（10GB，15GB）的用户数（万人）','DOU为（15GB，20GB）的用户数（万人）','DOU为（20GB，40GB）以上的用户数（万人）','DOU为40GB以上的用户数（万人）','不限量叠加包用户DOU（GB）','DOU为0的用户数（万人）','DOU为（0,100MB）的用户数（万人）','DOU为（100MB，5GB）的用户数（万人）','DOU为（5GB，10GB）的用户数（万人）','DOU为（10GB，15GB）的用户数（万人）','DOU为（15GB，20GB）的用户数（万人）','DOU为（20GB，40GB）以上的用户数（万人）','DOU为40GB以上的用户数（万人）','日租卡不限量用户DOU（GB）','DOU为0的用户数（万人）','DOU为（0,100MB）的用户数（万人）','DOU为（100MB，5GB）的用户数（万人）','DOU为（5GB，10GB）的用户数（万人）','DOU为（10GB，15GB）的用户数（万人）','DOU为（15GB，20GB）的用户数（万人）','DOU为（20GB，40GB）以上的用户数（万人）','DOU为40GB以上的用户数（万人）','其中：非不限量用户DOU（GB）','DOU为0的用户数（万人）','DOU为（0,100MB）的用户数（万人）','DOU为（100MB，5GB）的用户数（万人）','DOU为（5GB，10GB）的用户数（万人）','DOU为（10GB，15GB）的用户数（万人）','DOU为（15GB，20GB）的用户数（万人）','DOU为（20GB，40GB）以上的用户数（万人）','DOU为40GB以上的用户数（万人）','移动和享包DOU（GB）','30GB互联网畅享包DOU（GB）','40GB互联网畅享包DOU（GB）','校园移动用户Wlan流量DOU（GB）','校园移动用户宽带月均时长（小时）'], 
		   colModel: [ 
				{ name: 'STATIS_MONTH', index:'STATIS_MONTH',align:'center',width:140},
				{ name: 'LL_ZONG', index:'LL_ZONG',align:'center',width:140},
				{ name: 'LL_BUXIAL', index:'LL_BUXIAL',align:'center',width:140},
				{ name: 'LL_ZONG_ZHU', index:'LL_ZONG_ZHU',align:'center',width:140},
				{ name: 'ZHU_LL_0', index:'ZHU_LL_0',align:'center',width:140},
				{ name: 'ZHU_LL_100M', index:'ZHU_LL_100M',align:'center',width:140},
				{ name: 'ZHU_LL_5G', index:'ZHU_LL_5G',align:'center',width:140},
				{ name: 'ZHU_LL_10G', index:'ZHU_LL_10G',align:'center',width:140},
				{ name: 'ZHU_LL_15G', index:'ZHU_LL_15G',align:'center',width:140},
				{ name: 'ZHU_LL_20G', index:'ZHU_LL_20G',align:'center',width:140},
				{ name: 'ZHU_LL_40G', index:'ZHU_LL_40G',align:'center',width:140},
				{ name: 'ZHU_LL_50G', index:'ZHU_LL_50G',align:'center',width:140},
				{ name: 'LL_ZONG_QINGCHUN', index:'LL_ZONG_QINGCHUN',align:'center',width:140},
				{ name: 'QC_LL_0', index:'QC_LL_0',align:'center',width:140},
				{ name: 'QC_LL_100M', index:'QC_LL_100M',align:'center',width:140},
				{ name: 'QC_LL_5G', index:'QC_LL_5G',align:'center',width:140},
				{ name: 'QC_LL_10G', index:'QC_LL_10G',align:'center',width:140},
				{ name: 'QC_LL_15G', index:'QC_LL_15G',align:'center',width:140},
				{ name: 'QC_LL_20G', index:'QC_LL_20G',align:'center',width:140},
				{ name: 'QC_LL_40G', index:'QC_LL_40G',align:'center',width:140},
				{ name: 'QC_LL_50G', index:'QC_LL_50G',align:'center',width:140},
				{ name: 'LL_ZONG_DIE', index:'LL_ZONG_DIE',align:'center',width:140},
				{ name: 'DIE_LL_0', index:'DIE_LL_0',align:'center',width:140},
				{ name: 'DIE_LL_100M', index:'DIE_LL_100M',align:'center',width:140},
				{ name: 'DIE_LL_5G', index:'DIE_LL_5G',align:'center',width:140},
				{ name: 'DIE_LL_10G', index:'DIE_LL_10G',align:'center',width:140},
				{ name: 'DIE_LL_15G', index:'DIE_LL_15G',align:'center',width:140},
				{ name: 'DIE_LL_20G', index:'DIE_LL_20G',align:'center',width:140},
				{ name: 'DIE_LL_40G', index:'DIE_LL_40G',align:'center',width:140},
				{ name: 'DIE_LL_50G', index:'DIE_LL_50G',align:'center',width:140},
				{ name: 'LL_ZONG_RIZU', index:'LL_ZONG_RIZU',align:'center',width:140},
				{ name: 'RIZU_LL_0', index:'RIZU_LL_0',align:'center',width:140},
				{ name: 'RIZU_LL_100M', index:'RIZU_LL_100M',align:'center',width:140},
				{ name: 'RIZU_LL_5G', index:'RIZU_LL_5G',align:'center',width:140},
				{ name: 'RIZU_LL_10G', index:'RIZU_LL_10G',align:'center',width:140},
				{ name: 'RIZU_LL_15G', index:'RIZU_LL_15G',align:'center',width:140},
				{ name: 'RIZU_LL_20G', index:'RIZU_LL_20G',align:'center',width:140},
				{ name: 'RIZU_LL_40G', index:'RIZU_LL_40G',align:'center',width:140},
				{ name: 'RIZU_LL_50G', index:'RIZU_LL_50G',align:'center',width:140},
				{ name: 'LL_ZONG_FEIBU', index:'LL_ZONG_FEIBU',align:'center',width:140},
				{ name: 'FEIBU_LL_0', index:'FEIBU_LL_0',align:'center',width:140},
				{ name: 'FEIBU_LL_100M', index:'FEIBU_LL_100M',align:'center',width:140},
				{ name: 'FEIBU_LL_5G', index:'FEIBU_LL_5G',align:'center',width:140},
				{ name: 'FEIBU_LL_10G', index:'FEIBU_LL_10G',align:'center',width:140},
				{ name: 'FEIBU_LL_15G', index:'FEIBU_LL_15G',align:'center',width:140},
				{ name: 'FEIBU_LL_20G', index:'FEIBU_LL_20G',align:'center',width:140},
				{ name: 'FEIBU_LL_40G', index:'FEIBU_LL_40G',align:'center',width:140},
				{ name: 'FEIBU_LL_50G', index:'FEIBU_LL_50G',align:'center',width:140},
				{ name: 'LL_ZONG_HEXING', index:'LL_ZONG_HEXING',align:'center',width:140},
				{ name: 'LL_ZONG_CHANG_30G', index:'LL_ZONG_CHANG_30G',align:'center',width:140},
				{ name: 'LL_ZONG_CHANG_40G', index:'LL_ZONG_CHANG_40G',align:'center',width:140},
				{ name: 'LL_WLAN', index:'LL_WLAN',align:'center',width:140},
				{ name: 'DOU', index:'DOU',align:'center',width:140},
		   ], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			viewrecords: false, 
			pager : '#oneStatement1InfoListPagers',
			loadComplete : function(){
				 topjqGridLoadComplete();
				 setNiceScroll();
			},
			
	}); 
	 //查询按钮
		$("#oneSearchList1").click(function(){
			oneReloadBasicUnitJqGrid1("search");
		});
}
var oneReloadBasicUnitJqGrid1 = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	statisMonth = $("#oneAccountPeriod1").val();
	if(statisMonth == undefined){
		statisMonth = "";
	}
	
	$("#oneStatement1InfoListGrid").jqGrid('setGridParam',{    
        postData : {
        	statisMonth :statisMonth
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}
function oneInitDate1(){
	//上月
	var now = new Date();
	now.setTime(now.getTime()-24*60*60*1000);
	var year = now.getFullYear();
	var month = now.getMonth();
    month = month ;
    if (month < 10) 
 	   month = "0" + month;
 	var lastMonth = year.toString()+ month.toString();
 	$("#oneAccountPeriod1").datepicker({
 		language : "zh-CN",
		todayHighlight : true,
		format : 'yyyymm',
		autoclose : true,
		startView : 'months',
		maxViewMode : 'years',
		minViewMode : 'months'
	});
	
	$("#oneAccountPeriod1").val(lastMonth);
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