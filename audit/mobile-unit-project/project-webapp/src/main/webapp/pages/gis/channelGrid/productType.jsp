<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<cxt:commonLinks />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/channelPoint.css" />
	<title>各类产品效能情况</title>
	<style>
		.ui-th-ltr, .ui-jqgrid .ui-jqgrid-htable th.ui-th-ltr{
			border:1px solid #fff !important;
			text-align:center;
		}
	</style>
</head>

<body>
	<div class="outLine clearfix">
		<div class="outLinesTitle">
			各类产品效能情况
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
	var colName = [ '销售线', '专业线', '网格', '渠道类型（三级）', '四级渠道类型','管理本部','渠道编码','渠道名称','新发展用户（户）','新发展用户出账用户数（户）','存量用户出账用户数（户）','期末出账用户数(户)','新发展出账应收金额（元）','新发展欠费金额（元）','存量出账应收金额（元）','存量欠费金额（元）','增量金额（元）','存量金额（元）','佣金合计','终端补贴成本','新发展用户佣金占收比','用户佣金占收比','新发展用户（户）','新发展用户出账用户数（户）','存量用户出账用户数（户）','期末出账用户数(户)','新发展出账应收金额（元）','新发展欠费金额（元）','存量出账应收金额（元）','存量欠费金额（元）','终端补贴成本','增量金额（元）','存量金额（元）','新发展用户（户）','新发展用户出账用户数（户）','存量用户出账用户数（户）','期末出账用户数(户)','新发展出账应收金额（元）','新发展欠费金额（元）','存量出账应收金额（元）','存量欠费金额（元）','终端补贴成本','增量金额（元）','存量金额（元）','新发展用户（户）',
	                '新发展用户出账用户数（户）','存量用户出账用户数（户）','期末出账用户数(户)','新发展出账应收金额（元）','新发展欠费金额（元）','存量出账应收金额（元）','存量欠费金额（元）','增量金额（元）','存量金额（元）','新发展IPTV用户（户）','新发展用户出账用户数（户）','存量用户出账用户数（户）','期末出账用户数(户)','增量金额（元）','新发展用户（户）','新发展用户出账用户数（户）','存量用户出账用户数（户）','期末出账用户数(户)','新发展出账应收金额（元）','新发展欠费金额（元）','存量出账应收金额（元）','存量欠费金额（元）','增量金额（元）','存量金额（元）','渠道级佣金','新发展用户（户）','新发展用户出账用户数（户）','存量用户出账用户数（户）','期末出账用户数(户)','新发展出账应收金额（元）','新发展欠费金额（元）','存量出账应收金额（元）','存量欠费金额（元）','增量金额（元）','存量金额（元）','渠道级佣金','渠道级佣金'
	                ];
	var colModels = [ 
	                 { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
	                 { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
	                 { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
	                 { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
	                 { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 
	                 { name: 'newUsers', index: 'invdate', width: 80, align: 'center'}, 
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
	                 
	                 { name: '3G', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
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
	                 
	                 { name: '4G', index: 'nameB', width: 70,align: 'center'}, 
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
	                 
	                 { name: 'allCount', index: 'invdate', width: 80, align: 'center'}, 
	                 { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
	                 { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
	                 { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
	                 { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
	                 { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
	                 { name: 'nameB', index: 'nameB', width: 70,align: 'center'},
	                 /* 其中：宽带10个 */
	                 { name: 'kuandai', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 /* 其中：IPTV 5 */
	                 { name: 'IPTV', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 /* 其中：新和家庭  10 */
	                 { name: 'newFamily', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
	                 { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'}
	             	];
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
	 	setGrid('#gridInfo',mydata,5000,colName,colModels,'grid-pager')    
});

var setGrid = function(grid,mydata,widths,colName,colModels,pager){
	$(grid).jqGrid({ 
        datatype: 'local', 
        data: mydata, 
        width:widths,
        height: $(window).height()-250,
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
	 $(grid).jqGrid('setGroupHeaders', {
	    useColSpanStyle: true,
	    groupHeaders:[
	        {startColumnName:'newUsers', numberOfColumns:14, titleText: '移动业务总计'},
	        {startColumnName:'3G', numberOfColumns: 11, titleText: '其中:3G'},
	        {startColumnName:'4G', numberOfColumns: 11, titleText: '其中:4G'},
	        {startColumnName:'allCount', numberOfColumns: 13, titleText: '固网业务总计'},
	        {startColumnName:'kuandai', numberOfColumns: 10, titleText: '其中:宽带'},
	        {startColumnName:'IPTV', numberOfColumns: 5, titleText: 'IPTV'},
	        {startColumnName:'newFamily', numberOfColumns: 10, titleText: '其中：新和家庭'}
	    ]
	});
}
</script>
</html>