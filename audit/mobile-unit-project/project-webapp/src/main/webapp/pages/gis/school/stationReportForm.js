$(function(){
	reportForm2DetailListGrid()
})

function reportForm2DetailListGrid(){
	   $("#reportForm2InfoListGrid").jqGrid('clearGridData');
	   $("#reportForm2InfoListGrid").GridUnload();
	   grid = $("#reportForm2InfoListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/getReportForm/getReportForm2",
		   datatype : "json",
		   mtype : "POST",
		   postData : {},
		   height : 200,
		   width:900,
		   autowidth : false,
		   colNames: [ '地市','学校编码','学校名称','学校级别','分校编码','分校名称','基站编码','基站名称','基站状态'], 
		   colModel: [ 
		       { name: 'CITY_NAME', index: 'CITY_NAME',align: 'center', width:100}, 
		       { name: 'SCH_ID', index: 'SCH_ID',align: 'center',width:140}, 
		       { name: 'SCH_NAME', index: 'SCH_NAME',align: 'center', width:140}, 
		       { name: 'LEVEL_NAME', index: 'LEVEL_NAME', align: 'center', width:140},
		       { name: 'SCH_PART_ID', index: 'SCH_PART_ID',align: 'center',width:140}, 
		       { name: 'SCH_PART_NAME', index: 'SCH_PART_NAME',align: 'center', width:140}, 
		       { name: 'LAC_CELL_ID', index: 'LAC_CELL_ID', align: 'center', width:140},
		       { name: 'CELL_NAME', index: 'CELL_NAME',align: 'center', width:140}, 
		       { name: 'LIFE_CYC_STATS', index: 'LIFE_CYC_STATS', align: 'center', width:140},
		   ], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			viewrecords: false, 
			pager : '#reportForm2InfoListPagers',
			loadComplete : function(){
				 topjqGridLoadComplete();
				 setNiceScroll();
			},
			
	}); 
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