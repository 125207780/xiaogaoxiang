$(function(){
	monthReportForm2DetailListGrid()
})

function monthReportForm2DetailListGrid(){
	var lastMonth = monthInitDate2();
	   $("#monthReportForm2InfoListGrid").jqGrid('clearGridData');
	   $("#monthReportForm2InfoListGrid").GridUnload();
	   grid = $("#monthReportForm2InfoListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/getReportForm/getReportForm5",
		   datatype : "json",
		   mtype : "POST",
		   postData : {statisMonth:lastMonth},
		   height : 200,
		   width:900,
		   autowidth : false,
		   colNames: [ '日期','地市名称','区县名称','学校编码','学校名称','分校区编码','分校区名称','当月移动累计新增通话校园客户','当月联通累计新增通话校园客户','当月电信累计新增通话校园客户','当月移动累计新增通话校园客户份额X%','当月移动累计新增通话校园客户份额排名','8月1日起移动累计新增通话校园客户','8月1日起联通累计新增通话校园客户','8月1日起电信累计新增通话校园客户','8月1日起移动累计新增通话校园客户市场份额X%','8月1日起移动累计新增通话校园客户市场份额排名','期末移动通话客户数','期末联通通话客户数','期末电信通话客户数','期末移动通话客户市场份额X%','期末移动通话客户市场份额排名','期末联通通话市场份额X%','期末电信通话市场份额X%','期末移动通信客户数','期末联通通信客户数','期末电信通信客户数','期末通信客户市场份额X%','期末通信客户市场份额排名','联通期末通信市场份额X%','电信期末通信市场份额X%','当月新增4G客户数','期末4G客户数','4G客户渗透率X%','4G客户渗透率排名','当月新增不限量套餐客户数','期末不限量套餐客户数','不限量套餐客户渗透率X%','不限量套餐客户渗透率排名','其中：不限量流量包渗透率','当月ARPU','当月ARPU环比变化','累计月均ARPU','当月DOU(G)','当月DOU环比变化','累计月均DOU','当月MOU','当月MOU环比变化','累计月均MOU','当前V网客户数','V网客户渗透率','本月缴费用户数','本月缴费用户渗透率','当月新增宽带客户数','期末宽带客户数 ','宽带客户渗透率%','期末存费类客户数','期末终端类客户数','期末宽带类客户数','期末其他类客户数','小计','合约率'], 
		   colModel: [ 
			{ name: 'STATIS_MONTH', index:'STATIS_MONTH',align: 'center', width:140},
			{ name: 'SCH_AREA_NAME', index:'SCH_AREA_NAME',align: 'center', width:140},
			{ name: 'CNTY_NAME', index:'CNTY_NAME',align: 'center', width:140},
			{ name: 'SCH_ID', index:'SCH_ID',align: 'center', width:140},
			{ name: 'SCH_NAME', index:'SCH_NAME',align: 'center', width:140},
			{ name: 'SCH_PART_ID',index: 'SCH_PART_ID',align: 'center', width:140},
			{ name: 'SCH_PART_NAME',index: 'SCH_PART_NAME',align: 'center', width:140},
			{ name: 'ADD_CMCC_M', index:'ADD_CMCC_M',align: 'center', width:140},
			{ name: 'ADD_CUCC_M', index:'ADD_CUCC_M',align: 'center', width:140},
			{ name: 'ADD_CTCC_M', index:'ADD_CTCC_M',align: 'center', width:140},
			{ name: 'ADD_SHARE_CMCC_M', index:'ADD_SHARE_CMCC_M',align: 'center', width:140},
			{ name: 'RANK_ADD_CMCC_M', index:'RANK_ADD_CMCC_M',align: 'center', width:140},
			{ name: 'ADD_CMCC_AFTER0801',index: 'ADD_CMCC_AFTER0801',align: 'center', width:140},
			{ name: 'ADD_CUCC_AFTER0801',index: 'ADD_CUCC_AFTER0801',align: 'center', width:140},
			{ name: 'ADD_CTCC_AFTER0801',index: 'ADD_CTCC_AFTER0801',align: 'center', width:140},
			{ name: 'ADD_SHARE_CMCC_AFTER0801', index:'ADD_SHARE_CMCC_AFTER0801',align: 'center', width:140},
			{ name: 'RANK_ADD_CMCC_AFTER0801', index:'RANK_ADD_CMCC_AFTER0801',align: 'center', width:140},
			{ name: 'CALL_CMCC', index:'CALL_CMCC',align: 'center', width:140},
			{ name: 'CALL_CUCC', index:'CALL_CUCC',align: 'center', width:140},
			{ name: 'CALL_CTCC', index:'CALL_CTCC',align: 'center', width:140},
			{ name: 'CALL_SHARE_CMCC', index:'CALL_SHARE_CMCC',align: 'center', width:140},
			{ name: 'CALL_RANK_CMCC', index:'CALL_RANK_CMCC',align: 'center', width:140},
			{ name: 'CALL_SHARE_CUCC', index:'CALL_SHARE_CUCC',align: 'center', width:140},
			{ name: 'CALL_SHARE_CTCC', index:'CALL_SHARE_CTCC',align: 'center', width:140},
			{ name: 'COMMUNI_CMCC', index:'COMMUNI_CMCC',align: 'center', width:140},
			{ name: 'COMMUNI_CUCC', index:'COMMUNI_CUCC',align: 'center', width:140},
			{ name: 'COMMUNI_CTCC', index:'COMMUNI_CTCC',align: 'center', width:140},
			{ name: 'COMMUNI_SHARE_CMCC', index:'COMMUNI_SHARE_CMCC',align: 'center', width:140},
			{ name: 'COMMUNI_RANK_CMCC', index:'COMMUNI_RANK_CMCC',align: 'center', width:140},
			{ name: 'COMMUNI_SHARE_CUCC', index:'COMMUNI_SHARE_CUCC',align: 'center', width:140},
			{ name: 'COMMUNI_SHARE_CTCC',index: 'COMMUNI_SHARE_CTCC',align: 'center', width:140},
			{ name: 'G4_CMCC_M', index:'G4_CMCC_M',align: 'center', width:140},
			{ name: 'G4_CMCC', index:'G4_CMCC',align: 'center', width:140},
			{ name: 'G4_RATE', index:'G4_RATE',align: 'center', width:140},
			{ name: 'G4_RANK', index:'G4_RANK',align: 'center', width:140},
			{ name: 'UMLIMIT_CMCC_M', index:'UMLIMIT_CMCC_M',align: 'center', width:140},
			{ name: 'UNLIMIT_CMCC', index:'UNLIMIT_CMCC',align: 'center', width:140},
			{ name: 'UNLIMIT_RATE', index:'UNLIMIT_RATE',align: 'center', width:140},
			{ name: 'UNLIMIT_RANK', index:'UNLIMIT_RANK',align: 'center', width:140},
			{ name: 'UNLIMIT_DIEJIA', index:'UNLIMIT_DIEJIA',align: 'center', width:140},
			{ name: 'ARPU', index:'ARPU',align: 'center', width:140},
			{ name: 'ARPU_TWO_MONTH', index:'ARPU_TWO_MONTH',align: 'center', width:140},
			{ name: 'ARPU_MEAN',index: 'ARPU_MEAN',align: 'center', width:140},
			{ name: 'MOU', index:'MOU',align: 'center', width:140},
			{ name: 'MOU_TWO_MONTH', index:'MOU_TWO_MONTH',align: 'center', width:140},
			{ name: 'MOU_MEAN', index:'MOU_MEAN',align: 'center', width:140},
			{ name: 'DOU', index:'DOU',align: 'center', width:140},
			{ name: 'DOU_TWO_MONTH', index:'DOU_TWO_MONTH',align: 'center', width:140},
			{ name: 'DOU_MEAN', index:'DOU_MEAN',align: 'center', width:140},
			{ name: 'VNET', index:'VNET',align: 'center', width:140},
			{ name: 'VNET_RATE', index:'VNET_RATE',align: 'center', width:140},
			{ name: 'CHARGE', index:'CHARGE',align: 'center', width:140},
			{ name: 'CHARGE_RATE', index:'CHARGE_RATE',align: 'center', width:140},
			{ name: 'KD_CMCC_M',index: 'KD_CMCC_M',align: 'center', width:140},
			{ name: 'KD_CMCC', index:'KD_CMCC',align: 'center', width:140},
			{ name: 'KD_RATE', index:'KD_RATE',align: 'center', width:140},
			{ name: 'CONTRACT_CMCC',index: 'CONTRACT_CMCC',align: 'center', width:140},
			{ name: 'CONTRACT_PHONE_CMCC', index:'CONTRACT_PHONE_CMCC',align: 'center', width:140},
			{ name: 'CONTRACT_KD_CMCC',index: 'CONTRACT_KD_CMCC',align: 'center', width:140},
			{ name: 'CONTRACT_OTHER_CMCC', index:'CONTRACT_OTHER_CMCC',align: 'center', width:140},
			{ name: 'CONTRACT_CMCC_TOL', index:'CONTRACT_CMCC_TOL',align: 'center', width:140},
			{ name: 'HY_RATE',index: 'HY_RATE',align: 'center', width:140},
		   ], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			viewrecords: false, 
			pager : '#monthReportForm2InfoListPagers',
			loadComplete : function(){
				 topjqGridLoadComplete();
				 setNiceScroll();
			},
			
	}); 
	 //查询按钮
		$("#monthSearchList2").click(function(){
			monthReloadBasicUnitJqGrid2("search");
		});
}
var monthReloadBasicUnitJqGrid2 = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	statisMonth = $("#monthAccountPeriod2").val();
	if(statisMonth == undefined){
		statisMonth = "";
	}
	
	$("#monthReportForm2InfoListGrid").jqGrid('setGridParam',{    
        postData : {
        	statisMonth :statisMonth
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}
function monthInitDate2(){
	//上月
	var now = new Date();
	now.setTime(now.getTime()-24*60*60*1000);
	var year = now.getFullYear();
	var month = now.getMonth();
    month = month ;
    if (month < 10) 
 	   month = "0" + month;
 	var lastMonth = year.toString()+ month.toString();
 	$("#monthAccountPeriod2").datepicker({
 		language : "zh-CN",
		todayHighlight : true,
		format : 'yyyymm',
		autoclose : true,
		startView : 'months',
		maxViewMode : 'years',
		minViewMode : 'months'
	});
	$("#monthAccountPeriod2").val(lastMonth);
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