$(function(){
	setNiceScroll();
	gridRankInfoListGrid();
	
	
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
	
	//发布按钮
	$("#release").click(function(){
		//获取所有选中的行记录
		var rows = $("#gridInfoListGrid").jqGrid('getGridParam','selarrrow');
		var id = [];
		//如果rows小于1，提示
		if(rows < 1){
			alert("至少选择一条记录");
			messageAlert("至少选择一条记录");
			return false;
		}
		//遍历，得到每一个rankId
		for(var i = 0; i < rows.length; i++){
			var rowId = rows[i];
			var rowData = $("#gridInfoListGrid").jqGrid('getRowData',rowId);
			var rankId = JSON.stringify(rowData);
			id.push(rankId);
		}
		var rankArr = JSON.stringify(id);
		$.ajax({
			url : $.cxt + "/exam/publish",
			type: "POST",
			data:{
				ids:rankArr
			},
			async : false,
			success: function(json){
				topshowAlertSuccessDiv();//操作提示
				gridRankInfoListGrid();
			}
		})
	});
	
	
	//查询按钮
	$("#searchList").click(function(){
		var cycleType = $("#add_cycleType").val();
		var start = $("#add_startDate").val();
		//清空表格，
//		$("#gridInfoListGrid").jqGrid('clearGridData');
		//重新加载
		$("#gridInfoListGrid").jqGrid('setGridParam',{    
	        postData : {
	        	cycleType:cycleType,
	        	start:start,
	        },  
	        page : 1    
	    }).trigger("reloadGrid"); 
	});
	
	//重置
	$("#reset").click(function(){
		$("#add_cycleType").val("");
		$("#add_startDate").val("");
		$("#add_endDate").val("");
		$("#gridInfoListGrid").jqGrid('resetSelection'); 
	});
	
	
});

//初始化jqgrid表格加载
function gridRankInfoListGrid(){
	$("#gridInfoListGrid").jqGrid('clearGridData');
	$("#gridInfoListGrid").GridUnload();
	   grid = $("#gridInfoListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/exam/selectExamResult",
		   datatype : "json",
		   mtype : "POST",
		   postData : {},
		   height : "auto",
		   autowidth : true,
		   colNames: ['对象类型', '考核对象', '周期类型', '考核周期','指标','指标分类','得分','rankId','状态','周期','对象'], 
		   colModel: [ 
//		       { name: 'rowNum', index: 'rowNum',align: 'center'}, 
		       { name: 'objectType', align: 'center'}, 
		       { name: 'OBJECT_NAME', align: 'center'}, 
		       { name: 'cycleType', align: 'center'}, 
		       { name: 'EVALUATE_CYCLE', align: 'center'}, 
		       { name: 'KPI_NAME', align: 'center'}, 
		       { name: 'KPI_TYPE', align: 'center'}, 
		       { name: 'KPI_SCORE', align: 'center'}, 
		       { name: 'RANK_ID', align: 'center',hidden : true}, 
		       { name: 'STATUS', align: 'center',hidden : true}, 
		       { name: 'EVALUATE_CYCLE_TYPE', align: 'center',hidden : true},
		       { name: 'OBJECT_TYPE', align: 'center',hidden : true}, 
		   ], 
		    rownumbers: true,
		   	width : 930,
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			multiselect: true,//复选框   
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			pager : '#gridInfoListPagers',
			loadComplete : topjqGridLoadComplete
	}); 
}

//开始时间改变时发生的事件
$('#add_startDate').datepicker({
	language : "zh-CN",
	todayHighlight : true,
	format : 'yyyy-mm',
	autoclose : true,
	startView : 'months',
	maxViewMode : 'years',
	minViewMode : 'months'
}).on('changeDate', changeDate) //考核周期发生改变时调用

$("#add_cycleType").on("change", changeCycleType); //周期类型改变时调用

//---考核周期发生改变时调用
function changeDate() {
	var startDate = $('#add_startDate').datepicker('getDate');
	var cycleType = $("#add_cycleType").val();
	if (cycleType == "quarter") {
		var endDate = new Date();
		endDate.setFullYear(startDate.getFullYear(), startDate
				.getMonth() + 2, 1);
		var month = endDate.getMonth() + 1 < 10 ? "0"
				+ (endDate.getMonth() + 1) : endDate.getMonth() + 1;
		$("#add_endDate").val(endDate.getFullYear() + "-" + month);
	} else if (cycleType == "year") {
		var endDate = new Date();
		endDate.setFullYear(startDate.getFullYear(), startDate
				.getMonth() + 11, 1);
		var month = endDate.getMonth() + 1 < 10 ? "0"
				+ (endDate.getMonth() + 1) : endDate.getMonth() + 1;
		$("#add_endDate").val(endDate.getFullYear() + "-" + month);
	}
	
	var Datevalue = $('#add_startDate').val();
	if(!Datevalue){
		$("#add_endDate").val("");
	}
	
}

//--周期类型改变时调用
function changeCycleType() {
	var cycleType = $("#add_cycleType").val();
	$('#add_startDate').val('');
	$('#add_endDate').val('');
	if (cycleType == "month") {
		$("#add_endDateDiv").hide();
		$("#add_endDate").val('');
	} else {
		$("#add_endDateDiv").show();
	}
	$("#add_indexTable").jqGrid('clearGridData'); //清空表格
}