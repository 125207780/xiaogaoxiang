<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<cxt:commonLinks />
<title>总览-表格</title>
 	 
</head>
<body>
	 
<table id="idx_table">
 
</table>
<div id="idx_table-page"></div> 
</body>
<script type="text/javascript">
$(function(){
	 
	 initIdxTable();
	 

		function initIdxTable(){
		
		var mydata = [ 
			{A:"终端活动",B:"折扣1",C:"购机送费",D:99,E:87,F:76,G:40,H:56,I:64,J:89,K:24,L:66},
			{A:"终端活动",B:"折扣2",C:"购机送费5",D:99,E:87,F:76,G:40,H:56,I:64,J:89,K:24,L:66},
			{A:"终端活动",B:"折扣3",C:"购机送费6",D:99,E:87,F:76,G:40,H:56,I:64,J:89,K:24,L:66},
			{A:"终端活动",B:"折扣4",C:"购机送费7",D:99,E:87,F:76,G:40,H:56,I:64,J:89,K:24,L:66},
			{A:"存费活动",B:"折扣4",C:"购机送费7",D:99,E:87,F:76,G:40,H:56,I:64,J:89,K:24,L:66},
			{A:"存费活动",B:"折扣4",C:"购机送费7",D:99,E:87,F:76,G:40,H:56,I:64,J:89,K:24,L:66},
			{A:"存费活动",B:"折扣4",C:"购机送费7",D:99,E:87,F:76,G:40,H:56,I:64,J:89,K:24,L:66},
			{A:"存费活动",B:"折扣4",C:"购机送费7",D:99,E:87,F:76,G:40,H:56,I:64,J:89,K:24,L:66},
			{A:"宽带活动",B:"折扣4",C:"购机送费7",D:99,E:87,F:76,G:40,H:56,I:64,J:89,K:24,L:66},
			{A:"宽带活动",B:"折扣4",C:"购机送费7",D:99,E:87,F:76,G:40,H:56,I:64,J:89,K:24,L:66},
			{A:"宽带活动",B:"折扣4",C:"购机送费7",D:99,E:87,F:76,G:40,H:56,I:64,J:89,K:24,L:66},
			
	        ];
	    grid = $("#idx_table"); 
		grid.jqGrid({ 
	    datatype: 'local', 
	    data: mydata, 
	    autowidth:true,
	    height: '100%',
	    colNames: [ '', '折扣折让', '类型', '综合评分', '投入产出比','ARPU提升率','增收用户比','MOU提升率','DOU提升率','存活率','潜在流失率','潜在流失存活率'], 
	    colModel: [ 
	        { name: 'A', index: 'A', width: 30, align: 'center', cellattr: function(rowId, tv, rawObject, cm, rdata) { 
	                return 'id=\'A' + rowId + "\'"; 
	            } 
	        }, 
	        { name: 'B', index: 'B', width: 70, align: 'center',
	            
	        }, 
	        { name: 'C', index: 'C', width: 70,align: 'center',   }, 
	        { name: 'D', index: 'D', width: 70,align: 'center',   }, 
	        { name: 'E', index: 'E', width: 70,align: 'center',   }, 
	        { name: 'F', index: 'F', width: 70,align: 'center',   }, 
	        { name: 'G', index: 'G', width: 70,align: 'center',   }, 
	        { name: 'H', index: 'H', width: 70,align: 'center',   }, 
	        { name: 'I', index: 'I', width: 70,align: 'center',   }, 
	        { name: 'J', index: 'J', width: 70,align: 'center',   }, 
	        { name: 'K', index: 'K', width: 70,align: 'center',   }, 
	        { name: 'L', index: 'L', width: 70,align: 'center',   }, 
	    ], 
	    rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#idx_table-page',
	  
	    gridview: false, 
	    viewrecords: false, 
	    gridComplete: function() { 
	        //②在gridComplete调用合并方法 
	        var gridName = "idx_table"; 
	        Merger(gridName, 'A');
	        updatePagerIcons();
	   } 
	}); 
	 
	 

	$("#idx_table").jqGrid('setGroupHeaders', {
	    useColSpanStyle: true, 
	    groupHeaders:[
	    {startColumnName: 'E', numberOfColumns: 8, titleText: '评价因子'},
	    ]  
	  });

	 }
	 
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
 
})

</script>
</html>