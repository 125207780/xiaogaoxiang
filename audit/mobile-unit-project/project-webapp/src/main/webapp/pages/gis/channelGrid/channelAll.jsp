<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<cxt:commonLinks />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/channelPoint.css" />
	<title>渠道费用整体情况</title>
</head>
<body>
	<div class="outLine clearfix">
		<div class="outLinesTitle">
			渠道费用整体情况
			<div class="orner orner1"></div>
			<div class="orner orner2"></div>
			<div class="orner orner3"></div>
			<div class="orner orner4"></div>
		</div>
		<div class="gridCon" style='overflow-x:auto;'>
			<div class="grid">
	            <table id="gridInfo"></table>
	            <div id="grid-pager"></div> 
	        </div>
		</div>
	</div>
</body>
<script>
$(function(){
	var colName = [ '销售线', '专业线', '网格', '渠道类别(三级)','四级渠道类型','管理本部渠道编码','管理本部','渠道编码','渠道名称','统计期间渠道费用总额(元)','渠道补贴','渠道补贴-装修费补贴','渠道补贴-房租补贴','统计期间佣金总额(元)','常规佣金','现返佣金','奖罚佣金','奖罚佣金-店奖','人工调整佣金','服务佣金','清欠佣金','终端酬金','未分类佣金','终端补贴成本'];
	var colModels = [ 
	    { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
	    { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
	    { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
	    { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	    { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
	    { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
	    { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
	    { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	    { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
	    { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
	    { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
	    { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	    { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
	    { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
	    { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
	    { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	    { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
	    { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
	    { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
	    { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	    { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
	    { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
	    { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
	    { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'}
	]
	var mydata = [ 
	    { id: "1", invdate: "A责任网格", name: "移动", nameB: "直营店", amount: "200.00", tax: "10.00", closed: true, ship_via: "TN", total: "210.00" }, 
	    { id: "2", invdate: "A责任网格", name: "移动", nameB: "授权店", amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" }, 
	    { id: "3", invdate: "A责任网格", name: "移动", nameB: "加盟店", amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" },
	    { id: "1", invdate: "A责任网格", name: "移动", nameB: "直营店", amount: "200.00", tax: "10.00", closed: true, ship_via: "TN", total: "210.00" }, 
	    { id: "2", invdate: "A责任网格", name: "移动", nameB: "授权店", amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" }, 
	    { id: "3", invdate: "A责任网格", name: "移动", nameB: "加盟店", amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" },
	    { id: "1", invdate: "A责任网格", name: "移动", nameB: "直营店", amount: "200.00", tax: "10.00", closed: true, ship_via: "TN", total: "210.00" }, 
	    { id: "2", invdate: "A责任网格", name: "移动", nameB: "授权店", amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" }, 
	    { id: "3", invdate: "A责任网格", name: "移动", nameB: "加盟店", amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" }
	];
	setGrid('#gridInfo',mydata,2300,colName,colModels,'grid-pager')    
});

var setGrid = function(grid, mydata, widths, colName, colModels, pager){
	$(grid).jqGrid({ 
 		datatype: 'local', 
        data: mydata, 
        width:widths,
        height: $(window).height()-200,
        colNames:colName, 
        colModel: colModels, 
        rowNum: 15, 
        rowList: [10, 15, 20, 30], 
        pager: "#"+pager, 
        gridview: false, 
        viewrecords: false, 
        gridComplete: function() { 
      
       } 
    }); 
	$("#first_"+pager).find("span").addClass("bigger-150 fa fa-angle-double-left");
 	$("#prev_"+pager).find("span").addClass("bigger-150 fa fa-angle-left");
 	$("#next_"+pager).find("span").addClass("bigger-150 fa fa-angle-right");
 	$("#last_"+pager).find("span").addClass("bigger-150 fa fa-angle-double-right");
}
</script>
</html>