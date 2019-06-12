<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<cxt:commonLinks />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/channelPoint.css" />
	<title>渠道管理</title>
</head>
<body>
	<div class="outLine">
		<div class="outLinesTitle">
			渠道管理
			<div class="orner orner1"></div>
			<div class="orner orner2"></div>
			<div class="orner orner3"></div>
			<div class="orner orner4"></div>
		</div>
		<div class="gridCon">
			<div class="grid">
	            <table id="gridInfo"></table>
	            <div id="grid-pager"></div> 
	        </div>
		</div>
	</div>
</body>
<script>
$(function(){
	 var mydata = [ 
     	{ id: "1", invdate: "A责任网格", name: "移动", nameB: "直营店", amount: "200.00", tax: "10.00", closed: true, ship_via: "TN", total: "210.00" }, 
     	{ id: "2", invdate: "A责任网格", name: "移动", nameB: "授权店", amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" }, 
     	{ id: "3", invdate: "A责任网格", name: "移动", nameB: "加盟店", amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" }, 
     	{ id: "4", invdate: "A责任网格", name: "联通", nameB: "直营店", amount: "200.00", tax: "10.00", closed: true, ship_via: "TN", total: "210.00" }, 
     	{ id: "5", invdate: "A责任网格", name: "联通", nameB: "授权店", amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" }, 
     	{ id: "6", invdate: "A责任网格", name: "联通", nameB: "加盟店", amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" }, 
    	{ id: "7", invdate: "A责任网格", name: "电信", nameB: "直营店", amount: "300.00", tax: "31.00", closed: false, ship_via: "FE", total: "320.00" },
     	{ id: "8", invdate: "A责任网格", name: "电信", nameB: "授权店", amount: "400.00", tax: "32.00", closed: false, ship_via: "FE", total: "430.00" }, 
     	{ id: "9", invdate: "A责任网格", name: "电信", nameB: "加盟店", amount: "600.00", tax: "34.00", closed: false, ship_via: "FE", total: "320.00" },
     	{ id: "10", invdate: "B责任网格", name: "移动", nameB: "直营店", amount: "200.00", tax: "10.00", closed: true, ship_via: "TN", total: "210.00" }, 
     	{ id: "11", invdate: "B责任网格", name: "移动", nameB: "授权店", amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" }, 
     	{ id: "12", invdate: "B责任网格", name: "移动", nameB: "加盟店", amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" }, 
     	{ id: "13", invdate: "B责任网格", name: "联通", nameB: "直营店", amount: "200.00", tax: "10.00", closed: true, ship_via: "TN", total: "210.00" }, 
     	{ id: "14", invdate: "B责任网格", name: "联通", nameB: "授权店", amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" }, 
     	{ id: "15", invdate: "B责任网格", name: "联通", nameB: "加盟店", amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" }, 
     	{ id: "16", invdate: "B责任网格", name: "电信", nameB: "直营店", amount: "300.00", tax: "31.00", closed: false, ship_via: "FE", total: "320.00" },
     	{ id: "17", invdate: "B责任网格", name: "电信", nameB: "授权店", amount: "400.00", tax: "32.00", closed: false, ship_via: "FE", total: "430.00" }, 
		{ id: "18", invdate: "B责任网格", name: "电信", nameB: "加盟店", amount: "600.00", tax: "34.00", closed: false, ship_via: "FE", total: "320.00" },
	];
	grid = $("#gridInfo"); 

	grid.jqGrid({ 
      	datatype: 'local', 
      	data: mydata, 
      	width:$('.outLine').width()-20,
      	height: $(window).height()-100,
      	colNames: [ '网格名称', '市场', '渠道类型', '渠道数量', '销售份额'], 
      	colModel: [ 
          	{ name: 'invdate', index: 'invdate', width: 80, align: 'center', 
          		cellattr: function(rowId, tv, rawObject, cm, rdata) { 
                  	return 'id=\'invdate' + rowId + "\'"; 
              	} 
          	}, 
          	{ name: 'name', index: 'name', width: 70, align: 'center',
              	cellattr: function(rowId, tv, rawObject, cm, rdata) { 
                  	return 'id=\'name' + rowId + "\'"; 
              	} 
          	}, 
          	{ name: 'nameB', index: 'nameB', width: 70,align: 'center',}, 
          	{ name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
          	{ name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'}
		], 
      	rowNum: 15, 
      	rowList: [10, 15, 20, 30], 
      	pager: '#grid-pager', 
      	gridview: false, 
      	viewrecords: false, 
      	gridComplete: function() { 
          	//②在gridComplete调用合并方法 
          	var gridName = "gridInfo"; 
          	Merger(gridName, 'invdate');
          	Merger(gridName, 'name'); 
    
     	} 
  	}); 
	$("#first_grid-pager").find("span").addClass("bigger-150 fa fa-angle-double-left");
	$("#prev_grid-pager").find("span").addClass("bigger-150 fa fa-angle-left");
	$("#next_grid-pager").find("span").addClass("bigger-150 fa fa-angle-right");
	$("#last_grid-pager").find("span").addClass("bigger-150 fa fa-angle-double-right");
});

//公共调用方法 
function Merger(gridName, CellName) { 
	//得到显示到界面的id集合 
    var mya = $("#" + gridName + "").getDataIDs(); 
    //当前显示多少条 
    var length = mya.length; 
    for (var i = 0; i < length; i++) { 
		//从上到下获取一条信息 
        var before = $("#" + gridName + "").jqGrid('getRowData', mya[i]); 
        //定义合并行数 
        var rowSpanTaxCount = 1; 
        for (j = i + 1; j <= length; j++) { 
            //和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏 
            var end = $("#" + gridName + "").jqGrid('getRowData', mya[j]); 
            if (before[CellName] == end[CellName]) { 
                rowSpanTaxCount++; 
                $("#" + gridName + "").setCell(mya[j], CellName, '', { display: 'none' }); 
            } else { 
                rowSpanTaxCount = 1; 
                break; 
            } 
            $("#" + CellName + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount); 
        } 
    } 
} 
</script>
</html>