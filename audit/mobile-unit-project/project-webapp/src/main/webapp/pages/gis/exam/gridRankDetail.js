$(function() {
	
	gridRankDetailListGrid();
	setNiceScroll()
})

function gridRankDetailListGrid(){
	$('#grid-table').jqGrid({
		url : $.cxt + "/gridRank/getRankDetail",
		datatype : "json",
		mtype : "POST",
		postData : {id:id,ect:ect,et:et,ot:ot},
		height : 400,
		autowidth : true,
		colNames: [ '序号','周期类型', '考核周期', '被考核对象', '被考核对象类型','考核指标名称' ,'得分'], 
		colModel: [ 
		           { name: 'rowNum', index: 'rowNum',align: 'center'}, 
		  	       { name: 'evaluateCycleType', index: 'evaluateCycleType',align: 'center',formatter : parseData}, 
		  	       { name: 'evaluateCycle', index: 'evaluateCycle', align: 'center'}, 
		  	       { name: 'objectName', index: 'objectName',align: 'center' }, 
		  	       { name: 'objectType', index: 'objectType',align: 'center',formatter : parseLevel}, 
		  	       { name: 'kpiName',index:'kpiName',align:'center'},
		  	       { name: 'kpiScore', index: 'kpiScore',  align:'center'}, 
		  	   ], 
		viewrecords : true,
		rownumbers: false,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		gridComplete: function() { 
			   setNiceScroll();
		  } ,
		loadComplete : topjqGridLoadComplete
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
