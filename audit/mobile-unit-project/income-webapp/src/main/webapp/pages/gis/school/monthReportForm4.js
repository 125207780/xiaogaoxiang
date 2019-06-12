$(function() {
	initCityName2()
	monthReportForm4DetailListGrid()
})

function monthReportForm4DetailListGrid() {
	var lastMonth = monthInitDate4();
	$("#monthReportForm4InfoListGrid").jqGrid('clearGridData');
	$("#monthReportForm4InfoListGrid").GridUnload();
	grid = $("#monthReportForm4InfoListGrid");
	grid.jqGrid({
		url : $.cxt + "/getReportForm/getReportForm10",
		datatype : "json",
		mtype : "POST",
		postData : {
			statisMonth : lastMonth
		},
		height : 200,
		width : $(".left").width(),
		autowidth : true,
		colNames : [ '地市', '区县', '学校编码', '学校名称', '异网号码', '运营商', '交往圈个数' ],
		colModel : [ {
			name : 'CITY_NAME',
			index : 'CITY_NAME',
			align : 'center'
		}, {
			name : 'QX_NAME',
			index : 'QX_NAME',
			align : 'center'
		}, {
			name : 'SCH_ID',
			index : 'SCH_ID',
			align : 'center'
		}, {
			name : 'SCH_NAME',
			index : 'SCH_NAME',
			align : 'center'
		}, {
			name : 'OTHR_PARTY',
			index : 'OTHR_PARTY',
			align : 'center'
		}, {
			name : 'OTHER_OPRAT_TYP',
			index : 'OTHER_OPRAT_TYP',
			align : 'center'
		}, {
			name : 'CIRCLE_USERS',
			index : 'CIRCLE_USERS',
			align : 'center'
		},

		],
		shrinkToFit : false,
		autoScroll : true,
		viewrecords : true,
		rownumbers : false,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		viewrecords : false,
		pager : '#monthReportForm4InfoListPagers',
		gridComplete : monthReportForm4setNiceScroll,
		loadComplete : function() {
			topjqGridLoadComplete();
		},

	});
	// 查询按钮
	$("#monthSearchList4").click(function() {
		monthReloadBasicUnitJqGrid4("search");
	});
	// 导出
	$("#getReportForm10Export").click(
			function() {
				var cityName = "";
				var schoolName = "";
				cityName = $("#cityName2").find("option:selected").val();
				if(cityName =="请选择..."){
					cityName = "";
				}
				schoolName = $("#schoolName2").find("option:selected").val();
				if(schoolName =="请选择..."){
					schoolName = "";
				}
				var statisMonth = encodeURI(encodeURI($("#monthAccountPeriod4")
						.val()));
				window.location.href = $.cxt
						+ "/getReportForm/getReportForm10Export?statisMonth="
						+ statisMonth+"&cityName="+encodeURI(encodeURI(cityName))+"&schoolName="+encodeURI(encodeURI(schoolName));
			})
}
var monthReloadBasicUnitJqGrid4 = function(flag) {
	if (flag == undefined) {
		// 清空查询条件
		topclear('gridSearch')
	}
	statisMonth = $("#monthAccountPeriod4").val();
	cityName = $("#cityName2").val();
	schoolName = $("#schoolName2").val();
	if (statisMonth == undefined) {
		statisMonth = "";
	}
	if (cityName == undefined || cityName == "请选择...") {
		cityName = "";
	}
	if (schoolName == undefined || schoolName == "请选择...") {
		schoolName = "";
	}

	$("#monthReportForm4InfoListGrid").jqGrid('setGridParam', {
		postData : {
			statisMonth : statisMonth,
			cityName : cityName,
			schoolName : schoolName
		},
		page : 1
	}).trigger("reloadGrid");
}
function monthInitDate4() {
	//上月
	var now = new Date();
	now.setTime(now.getTime()-24*60*60*1000);
	var year = now.getFullYear();
	var month = now.getMonth();
	if(month == 0){
		year = year -1;
		month = 12;
	}
    if (month < 10) 
 	   month = "0" + month;
 	var lastMonth = year.toString()+ month.toString();
	$("#monthAccountPeriod4").datepicker({
		language : "zh-CN",
		todayHighlight : true,
		format : 'yyyymm',
		autoclose : true,
		startView : 'months',
		maxViewMode : 'years',
		minViewMode : 'months'
	});
	$("#monthAccountPeriod4").val(lastMonth);
	return lastMonth;
}
function monthReportForm4setNiceScroll() {
	/*
	 * $(".ui-jqgrid-bdiv").scrollBar({ barWidth: 6,
	 * //滚动条的宽度(这里根据需要写数值即可，不设置是10,即默认10px) position: "x,y",
	 * //写“x”代表只出水平滚动条，写“y”表示只出垂直滚动条，写“x,y”则出水平和垂直滚动条（只有在内容超出容器时才出现滚动条）
	 * wheelDis: 15 //滚轮滚动一次向下或向上滚动的距离，默认是15，可根据需要修改数值 });
	 */
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight : $(window).height() - 190,
		cursorcolor : "#5cd4f8",
		cursorborder : "1px solid #5cd4f8",
		touchbehavior : false,
		spacebarenabled : true,
		railoffset : false
	});
}

function initCityName2() {
	$.ajax({
		url : $.cxt + "/getReportForm/findCityName2",
		type : "POST",
		async : false,
		data : {},
		success : function(data) {
			var data = JSON.parse(data);
			if (data.code == '0') {
				$("#cityName2").empty();
				$("#cityName2").append(
						$("<option>" + '请选择...' + "</option>").val('请选择...'))
				for (i = 0; i < data.data.length; i++) {
					$("#cityName2")
							.append(
									$(
											"<option>" + data.data[i].CITY_NAME
													+ "</option>").val(
											data.data[i].CITY_NAME))
				}
			}
		}
	})
}

function uppSchool2() {
	$("#schoolName2").empty();
	var cityName = $("#cityName2").val();
	$.ajax({
		url : $.cxt + "/getReportForm/findSchoolName2",
		type : "POST",
		async : false,
		data : {
			cityName : cityName
		},
		success : function(data) {
			var data = JSON.parse(data);
			if (data.code == '0') {
				$("#schoolName2").empty();
				$("#schoolName2").append(
						$("<option>" + '请选择...' + "</option>").val('请选择...'))
				for (i = 0; i < data.data.length; i++) {
					$("#schoolName2").append(
							$("<option>" + data.data[i].SCH_NAME + "</option>")
									.val(data.data[i].SCH_NAME))
				}
			}
		}
	})
}