<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<cxt:commonLinks />
	<title>前台组件</title>
</head>
<body>
	<div class="page-content">
		<!-- 头部文字 -->
		<div class="page-header">
			<h1>
				前台组件
				<small>
					<i class="ace-icon fa fa-angle-double-right"></i>
					常见的表格及jqgrid表格
				</small>
			</h1>
		</div>
		<div class="col-xs-12 row">
			<div class="col-xs-12 clearfix">
				<h5 class="label label-danger arrowed-in">常规jqgrid表格</h5>
			</div>
			<div class="col-xs-12">
				<div class="table-content">
					<table id="grid-table"></table><!-- grid表格主体部分 -->
					<div id="grid-pager"></div><!-- grid表格分页部分 -->
				</div>
			</div>
		</div>
		<div class="col-xs-12 row">
			<div class="col-xs-12 clearfix">
				<h5 class="label label-danger arrowed-in">下拉树jqgrid表格</h5>
			</div>
			<div class="col-xs-12">
				<div class="table-content">
					<table id="grid-table1"></table><!-- grid表格主体部分 -->
					<div id="grid-pager1"></div><!-- grid表格分页部分 -->
				</div>
			</div>
		</div>
	</div>
<script>
$(function(){
	
	
	var grid_data = 
		[ 
			{id:"1",name:"宽度",note:"width",stock:"$(window).width()-30",ship:"固定宽度：800px", sdate:"2007-12-03"},
			{id:"2",name:"高度",note:"height",stock:"$(window).height()-100",ship:"固定高度：500px",sdate:"2007-12-03"},
			{id:"3",name:"复选框",note:"multiselect",stock:"true",ship:"false",sdate:"2007-12-03"},
			{id:"4",name:"下拉框",note:"colModelcolModel",stock:"true",ship:"false",sdate:"2007-12-03"},
			{id:"5",name:"复选框",note:"multiselect",stock:"true",ship:"false",sdate:"2007-12-03"},
			{id:"6",name:"宽度",note:"width",stock:"$(window).width()-30",ship:"固定宽度：800px", sdate:"2007-12-03"},
			{id:"7",name:"高度",note:"height",stock:"$(window).height()-100",ship:"固定高度：500px",sdate:"2007-12-03"},
			{id:"8",name:"复选框",note:"multiselect",stock:"true",ship:"false",sdate:"2007-12-03"},
			{id:"9",name:"下拉框",note:"colModelcolModel",stock:"true",ship:"false",sdate:"2007-12-03"},
			{id:"10",name:"复选框",note:"multiselect",stock:"true",ship:"false",sdate:"2007-12-03"}
		];
	var subgrid_data = 
		[
			{id:"1",name:"宽度",note:"width",stock:"$(window).width()-30",ship:"固定宽度：800px", sdate:"2007-12-03"}
		];
	var lastsel2;
	$('#grid-table').jqGrid({//加载表格
		data: grid_data,
		datatype: "local",
		mtype : "POST",
		height : $(window).height()-200,
		width:$(window).width()-30,
		//autowidth : true,
		colNames : [ '名称', '属性','属性值','说明','备注','编辑'],
		colModel : [ 
		      {name : 'name',hidden : false}, 
		      {name : 'note',align : 'center'}, 
		      {name : 'stock',align : 'center'},
		      {name : 'ship',align : 'center'},
		      {name : 'sdate',align : 'center'}, 
		      {name :'stateName',align : 'center', formatter : stateOperation}
		],
		multiselect: true,
		cellEdit:true,
		rowNum : 10,
		cellsubmit : 'clientArray',
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "常规jqgrid表格",
		onSelectRow : function(id) {
		      if (id && id !== lastsel2) {
		        jQuery('#grid-table').jqGrid('restoreRow', lastsel2);
		        jQuery('#grid-table').jqGrid('editRow', id, true);
		        lastsel2 = id;
		      }
		    },
	    loadComplete : function() {
			var table = this;
				updatePagerIcons(table);
		}
	});
	
	$('#grid-table1').jqGrid({//加载表格
		subGrid : true,
		//subGridModel: [{ name : ['No','Item Name','Qty'], width : [55,200,80] }],
		//datatype: "xml",
		subGridOptions : {
			plusicon : "ace-icon fa fa-plus center bigger-110 blue",
			minusicon  : "ace-icon fa fa-minus center bigger-110 blue",
			openicon : "ace-icon fa fa-chevron-right center orange"
		},
		subGridRowExpanded: function (subgridDivId, rowId) {
			var subgridTableId = subgridDivId + "_t";
			$("#" + subgridDivId).html("<table id='" + subgridTableId + "'></table>");
			$("#" + subgridTableId).jqGrid({
				datatype: 'local',
				data: subgrid_data,
				colNames: [ '名称', '属性','属性值','说明','备注',],
				colModel: [
				           {name : 'name',hidden : false}, 
						   {name : 'note',align : 'center'}, 
						   {name : 'stock',align : 'center'},
						   {name : 'ship',align : 'center'},
						   {name : 'sdate',align : 'center'}, 
				]
			});
		},
		data: grid_data,
		datatype: "local",
		mtype : "POST",
		height : $(window).height()-200,
		width:$(window).width()-30,
		//autowidth : true,
		colNames : [ '名称', '属性','属性值','说明','备注','编辑'],
		colModel : [ 
		      {name : 'name',hidden : false}, 
		      {name : 'note',align : 'center'}, 
		      {name : 'stock',align : 'center'},
		      {name : 'ship',align : 'center'},
		      {name : 'sdate',align : 'center'}, 
		      {name : 'edit',align : 'center', formatter : stateOperation}
		],
		multiselect: true,
		cellEdit:true,
		rowNum : 10,
		cellsubmit : 'clientArray',
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager1',
		caption : "下拉树jqGrid表格",
		loadComplete : function() {
			var table = this;
				updatePagerIcons(table);
		}
	});
	$("td").css("text-align", "center");
	$(".ui-jqgrid-sortable").css("text-align","center");
    function stateOperation(){
    	var html = $("<div></div>")
    	           .append($("<span class='text-warning bigger-110 orange'></span>").append('添加').attr('title','添加').css({"cursor":"pointer",'margin':"0px 5px"}))
    	           .append($("<span class='text-danger bigger-110 red'></span>").append('查看').attr('title','查看').css({"cursor":"pointer",'margin':"0px 5px"}))
    	           .append($("<span class='text-success bigger-110 '></span>").append('删除').attr('title','删除').css({"cursor":"pointer",'margin':"0px 5px"})).html();
           return html;
    }
    /**
     * 
     * @param table
     */
    function updatePagerIcons(table) {
    	var replacement = {
    		'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
    		'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
    		'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
    		'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
    	};
    	$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon')
    			.each(function() {
    				var icon = $(this);
    				var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

    				if ($class in replacement)
    					icon.attr('class', 'ui-icon ' + replacement[$class]);
    			})
    }
});
</script>
</body>
</html>