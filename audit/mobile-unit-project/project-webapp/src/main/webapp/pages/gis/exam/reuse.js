$(function(){
	
	$("#add_cycleType").val(cycleType);
	$("#add_startDate").val(startDate);
	$("#add_endDate").val(endDate);
	
	init();
});

function init(){
	
	if(!(cycleType == "month")){
		$("#add_endDateDiv").show();
	}
}

$('#add_startDate').datepicker({
	language : "zh-CN",
	todayHighlight : true,
	format : 'yyyy-mm',
	autoclose : true,
	startView : 'months',
	maxViewMode : 'years',
	minViewMode : 'months'
}).on('changeDate', changeDate) //考核周期发生改变时调用

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

