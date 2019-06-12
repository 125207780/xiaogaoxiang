// 指标现状方法
function zbxzMethod(treeNode) {
	$("#hiddenType").val("zbxz");
	var parentNode = treeNode.getParentNode();
	// 点击的是父节点
	if(null != parentNode && "" != parentNode) {
		if("XYBB"==treeNode.id){
			getMaxStatisDate(treeNode.children[0].id);
			$("#conditionDivFive").css("display", "block");
			$("#conditionDivSix").css("display", "block");
		}
		//日月累计报表、业务办理、校园查询最新账期
		else if(treeNode.id=="KHFZD"||treeNode.id=="KHFZW"||treeNode.id=="KHFZM"||treeNode.id=="RYLJBB"||treeNode.id=="CJYB"||treeNode.id=="WGYWBLMONTH"||treeNode.id=="WGYWBLWEEK"||treeNode.id=="WGYWBLDAY"||treeNode.id=="XYYXBBYHBM"||treeNode.id=="XYYHHXBM"||treeNode.id=="XYYXBBXYKHQKD"||treeNode.id=="XYYXBBXYKHQKM"||treeNode.id=="XYYXBBXYZDHDBLQKD"||treeNode.id=="XYYXBBXYZDHDBLMXQKD"||treeNode.id=="XYYXBBCLXYKHBYQKRBBD"||treeNode.id=="XYYHFEFBD"||treeNode.id=="XYYHFEFBM"||treeNode.id=="XYYWYHBM")
			{
			getMaxStatisDate(treeNode.id);
			$("#conditionDivFive").css("display", "block");
			}
		else if("zdyw" == treeNode.id || "zdyw" == parentNode.id || "1" == treeNode.id) {
			$("#zhibiaoPanel1").css("display", "none");
			$("#conditionTwo").css("display", "block");
			if("GJZDZXQSTTS" == treeNode.id || "XZJZWD" == treeNode.id
					|| "TBKHGYRHL" == treeNode.id || "GRKHZJFSR" == treeNode.id || "XZKHZJFSR" == treeNode.id) {
				$("#conditionTwo").css("display", "none");
			} 
			$("#topConditionOrgDiv").css("display", "block");
			$("#conditionDivFive").css("display", "block");
			$("#conditionDivSix").css("display", "none");
		} else if("KHXXD" == treeNode.id || "KHXXM" == treeNode.id || "KHXXD" == parentNode.id || "KHXXM" == parentNode.id) {
			$("#conditionDivFive").css("display", "block");
			$("#conditionDivSix").css("display", "none");
		} else if("SRXX" == treeNode.id || "SRXX" == parentNode.id || "YWBL" == treeNode.id || "YWBL" == parentNode.id) {
			$("#conditionDivFive").css("display", "block");
			getMaxStatisDate(treeNode.id);
		} else if("CJXX" == treeNode.id || "CJXX" == parentNode.id) {
			$("#conditionDivFive").css("display", "block");
		}  else if("JFBB" == treeNode.id || "JFBB" == parentNode.id) {
			$("#conditionDivFive").css("display", "block");
		} else if("KHFZ" == treeNode.id || "KHFZ" == parentNode.id) {
			$("#conditionDivFive").css("display", "block");
		} else {
			$("#conditionTwo").css("display", "none");
			$("#conditionDivFive").css("display", "none");
		} 
	} else {
		if("zdyw" == treeNode.id) {
			$("#zhibiaoPanel1").css("display", "none");
			$("#conditionTwo").css("display", "block");
			$("#conditionDivFive").css("display", "block");
			$("#conditionDivSix").css("display", "none");
		} else if("zbxz" == treeNode.id) {
			$("#zhibiaoPanel1").css("display", "none");
			$("#topConditionOrgDiv").css("display", "block");
			$("#conditionTwo").css("display", "block");
			$("#conditionDivFive").css("display", "block");
			$("#conditionDivSix").css("display", "none");
		} else if("KHXXD" == treeNode.id || "KHXXM" == treeNode.ids) {
			$("#conditionDivFive").css("display", "block");
			$("#conditionDivSix").css("display", "none");
		} else if("SRXX" == treeNode.id || "YWBL" == treeNode.id) {
			$("#conditionDivFive").css("display", "block");
		} else if("CJXX" == treeNode.id) {
			$("#conditionDivFive").css("display", "block");
		} else if("JFBB" == treeNode.id) {
			$("#conditionDivFive").css("display", "block");
		}  else if("KHFZD" == treeNode.id || "KHFZW" == treeNode.id || "KHFZM" == treeNode.id) {
			$("#conditionDivFive").css("display", "block");
		} else {
			$("#conditionTwo").css("display", "none");
			$("#conditionDivFive").css("display", "none");
		}
	}
	changeSelectInfo(treeNode);
}

// 单独方法：对标分析
function dbfxMethod() {
	$("#benchmarkingAnalysis").css("display", "block");
	$("#resourcePanel").css("display", "none");
	$("#tablePanel").css("display", "none");
	$("#topParentConditionDiv").css("display", "none");
	$("#middleFourInfoDiv").css("display", "none");
	$("#bottomDetailDiv").css("display", "none");
	benchmarkingAnalysisRatio();
}

// 地市、区县、网格对标选择
$("#cityRatio").on("click", benchmarkingAnalysisRatio);
$("#townRatio").on("click", benchmarkingAnalysisRatio);
$("#gridRatio").on("click", benchmarkingAnalysisRatio);
function benchmarkingAnalysisRatio() {
	$("#midBenchmarkingAnalysisSelect").empty();
	$("#btmBenchmarkingAnalysis").empty();
	$('.firstBtn').each(function() {
		$(this).removeClass('btn-selected');
	});
	if(undefined == $(this).attr("data")) {
		$("#cityRatio").addClass('btn-selected');
	}
	$(this).addClass('btn-selected');
	// 地市对标
	var benchmarkingAnalysisRatio = $(this).attr("data") == undefined ? 1 : $(this).attr("data");
	// 获取最新账期
	$.ajax({
		url: $.cxt + "/firstpagethree/getmaxbenchmarkingsnalysisstatisdate",
		type: "POST",
		async: false,
		data: {type: benchmarkingAnalysisRatio},
		success: function(result) {
			var json = JSON.parse(result);
			if(json.code == 0) {
				if(null != json.data && undefined != json.data) {
					json = json.data;
					$("#benchmarkingAnalysisStatisDate").val(json.STATIS_DATE);
				} else {
					var myDate = new Date();
					// 获取当前年
					var year = myDate.getFullYear();
					// 获取当前月
					var month = myDate.getMonth()+1;
					// 获取当前日
					var date = myDate.getDate(); 
					if(date != "01") {
						date = myDate.getDate() - 1; 
					}
					var now = year + '' + getNow(month) + "" + getNow(date);
					$("#benchmarkingAnalysisStatisDate").val(now);
				}
			}
		}
	});
	if("1" == benchmarkingAnalysisRatio) {
		// 根据当前登录人获取到地市信息下拉框
		$.ajax({
			url: $.cxt + "/firstpagethree/getcityinfo",
			type: "POST",
			data: {type: benchmarkingAnalysisRatio},
			async: false,
			success: function(result) {
				var json = JSON.parse(result);
				if(json.code == 0) {
					var htmltv = "<select id='multipleCitySelectInfo' multiple='multiple'>";
					json = json.data;
					for(var i = 0; i < json.length; i++) {
						if(i < 10)
							htmltv += "<option selected='selected' value='" + json[i].orgId + "'>" + json[i].name + "</option>";
						else 
							htmltv += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
					}
					htmltv += "</select>";
					$("#midBenchmarkingAnalysisSelect").html(htmltv);
					$('#multipleCitySelectInfo').multipleSelect({
						placeholder: "---请选择地市---",
						width: 153,
						filter: true
					});
				}
			}
		});
		var cityInfo = $("#multipleCitySelectInfo option:selected");
		var cityCode = "";
		if(cityInfo.length > 0) {
			for(var i = 0; i < cityInfo.length; i++) {
				if(i != 9)
					cityCode += cityInfo[i].value + ",";
				else 
					cityCode += cityInfo[i].value;
			}
		}
		getBenchmarkingAnalysisTableInfo(benchmarkingAnalysisRatio, cityCode);
	} else if("2" == benchmarkingAnalysisRatio) {
		// 根据当前登录人获取到地市，区县下拉框
		$.ajax({
			url: $.cxt + "/firstpagethree/gettowninfo",
			type: "POST",
			data: {type: benchmarkingAnalysisRatio},
			async: false,
			success: function(result) {
				var json = JSON.parse(result);
				if(json.code == 0) {
					var htmlCity = "<select id='multipleCitySelectInfo' multiple='multiple'>";
					var htmlCnty = "<select id='multipleCntySelectInfo' multiple='multiple'>";
					json = json.data;
					var count = 0;
					for(var i = 0; i < json.length; i++) {
						if(json[i].orgLevel == 2)
							htmlCity += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
						else {
							if(count < 10)
								htmlCnty += "<option selected='selected' value='" + json[i].orgId + "'>" + json[i].name + "</option>";
							else 
								htmlCnty += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
							count++;
						}
					}
					htmlCity += "</select>";
					htmlCnty += "</select>";
					$("#midBenchmarkingAnalysisSelect").append(htmlCity);
					$("#midBenchmarkingAnalysisSelect").append(htmlCnty);
					$('#multipleCitySelectInfo').multipleSelect({
						placeholder: "---请选择地市---",
						width: 153,
						filter: true
					});
					$('#multipleCntySelectInfo').multipleSelect({
						placeholder: "---请选择区县---",
						width: 153,
						filter: true
					});
				}
			}
		});
		var cntyInfo = $("#multipleCntySelectInfo option:selected");
		var cntyCode = "";
		if(cntyInfo.length > 0) {
			for(var i = 0; i < cntyInfo.length; i++) {
				if(i != 9)
					cntyCode += cntyInfo[i].value + ",";
				else 
					cntyCode += cntyInfo[i].value;
			}
		}
		getBenchmarkingAnalysisTableInfo(benchmarkingAnalysisRatio, cntyCode);
	} else {
		// 根据当前登录人获取到地市，区县，网格下拉框
		$.ajax({
			url: $.cxt + "/firstpagethree/getgridinfo",
			type: "POST",
			data: {type: benchmarkingAnalysisRatio, gridType: 1},
			async: false,
			success: function(result) {
				var json = JSON.parse(result);
				if(json.code == 0) {
					var htmlCity = "<select id='multipleCitySelectInfo' multiple='multiple'>";
					var htmlCnty = "<select id='multipleCntySelectInfo' multiple='multiple'>";
					var htmlGrid = "<select id='multipleGridSelectInfo' multiple='multiple'>";
					json = json.data;
					var count = 0;
					for(var i = 0; i < json.length; i++) {
						if(json[i].orgLevel == 2)
							htmlCity += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
						else if(json[i].orgLevel == 3)
							htmlCnty += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
						else {
							if(count < 10) 
								htmlGrid += "<option selected='selected' value='" + json[i].orgId + "'>" + json[i].name + "</option>";
							else 
								htmlGrid += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
							count++;
						}
					}
					htmlCity += "</select>";
					htmlCnty += "</select>";
					htmlGrid += "</select>";
					var htmlGridType = "<select id='gridType'>";
					htmlGridType += "<option value='1'>一类网格</option>";
					htmlGridType += "<option value='2'>二类网格</option>";
					htmlGridType += "<option value='3'>三类网格</option>";
					$("#midBenchmarkingAnalysisSelect").append(htmlCity);
					$("#midBenchmarkingAnalysisSelect").append(htmlCnty);
					$("#midBenchmarkingAnalysisSelect").append(htmlGridType);
					$("#midBenchmarkingAnalysisSelect").append(htmlGrid);
					$('#multipleCitySelectInfo').multipleSelect({
						placeholder: "---请选择地市---",
						width: 153,
						filter: true
					});
					$('#multipleCntySelectInfo').multipleSelect({
						placeholder: "---请选择区县---",
						width: 153,
						filter: true
					});
					$('#multipleGridSelectInfo').multipleSelect({
						placeholder: "---请选择网格---",
						width: 153,
						filter: true
					});
				}
			}
		});
		var gridInfo = $("#multipleGridSelectInfo option:selected");
		var gridCode = "";
		if(gridInfo.length > 0) {
			for(var i = 0; i < gridInfo.length; i++) {
				if(i != 9)
					gridCode += gridInfo[i].value + ",";
				else 
					gridCode += gridInfo[i].value;
			}
		}
		getBenchmarkingAnalysisTableInfo(benchmarkingAnalysisRatio, gridCode);
	}
}

// 当选择排序后，改变排序内容
$("body").on("change", "#orderBenchmarkingAnalysis", orderBenchmarkingAnalysisChange);
function orderBenchmarkingAnalysisChange() {
	// 获取选择的排序方式
	var orderBenchmarkingAnalysis = $("#orderBenchmarkingAnalysis option:selected").val();
	// 获取账期
	var statisDate = $("#benchmarkingAnalysisStatisDate").val();
	// 获取是哪种对标
	var benchmarkingAnalysisRatio = $(".btn-selected").attr("data");
	$.ajax({
		url: $.cxt + "/firstpagethree/getbenchmarkinganalysisorder",
		type: "POST",
		data: {type: benchmarkingAnalysisRatio, statisDate: statisDate, orderType: orderBenchmarkingAnalysis},
		success: function(result) {
			// 地市对标
			if("1" == benchmarkingAnalysisRatio) {
				// 将下拉框中选项去掉，并勾选上查询出的结果
				$("#multipleCitySelectInfo").each(function(i) {
					$(this).find("option").removeAttr("selected");
				});
				var json = JSON.parse(result);
				if(json.code == "0") {
					var jsonStr = json.data;
					if(null != jsonStr && "" != jsonStr && undefined != jsonStr) {
						// 循环的作用是将查询出来的排序好的结果，将对应对标下拉框中的值给替换勾选上
						for(var i = 0; i < jsonStr.length; i++) {
							$("#multipleCitySelectInfo option").each(function(j) {
								if($(this)[0].value == jsonStr[i].CITY_CODE) {
									$(this)[0].selected = true;
								}
							});
						}
					}
					// 刷新表格
					refreshBenchmarkingAnalysisJqGridTable(json);
				}
				// 刷新下拉框
				$("#multipleCitySelectInfo").multipleSelect('refresh');
			}
			// 区县对标
			else if("2" == benchmarkingAnalysisRatio) {
				// 将下拉框中选项去掉，并勾选上查询出的结果
				$("#multipleCntySelectInfo").each(function(i) {
					$(this).find("option").removeAttr("selected");
				});
				var json = JSON.parse(result);
				if(json.code == "0") {
					var jsonStr = json.data;
					if(null != jsonStr && "" != jsonStr && undefined != jsonStr) {
						// 循环的作用是将查询出来的排序好的结果，将对应对标下拉框中的值给替换勾选上
						for(var i = 0; i < jsonStr.length; i++) {
							$("#multipleCntySelectInfo option").each(function(j) {
								if($(this)[0].value == jsonStr[i].CNTY_CODE) {
									$(this)[0].selected = true;
								}
							});
						}
					}
					// 刷新表格
					refreshBenchmarkingAnalysisJqGridTable(json);
				}
				// 刷新下拉框
				$("#multipleCitySelectInfo").multipleSelect('refresh');
			}
			// 网格对标
			else if("3" == benchmarkingAnalysisRatio) {
				// 将下拉框中选项去掉，并勾选上查询出的结果
				$("#multipleGridSelectInfo").each(function(i) {
					$(this).find("option").removeAttr("selected");
				});
				var json = JSON.parse(result);
				if(json.code == "0") {
					var jsonStr = json.data;
					if(null != jsonStr && "" != jsonStr && undefined != jsonStr) {
						// 循环的作用是将查询出来的排序好的结果，将对应对标下拉框中的值给替换勾选上
						for(var i = 0; i < jsonStr.length; i++) {
							$("#multipleGridSelectInfo option").each(function(j) {
								if($(this)[0].value == jsonStr[i].GRID_CODE) {
									$(this)[0].selected = true;
								}
							});
						}
					}
					// 刷新表格
					refreshBenchmarkingAnalysisJqGridTable(json);
				}
				// 刷新下拉框
				$("#multipleCitySelectInfo").multipleSelect('refresh');
			}
		}
	});
}

// 刷新表格
function refreshBenchmarkingAnalysisJqGridTable(json) {
	$("#btmBenchmarkingAnalysis").empty();
	json = json.data;
	if(null != json && "" != json && json.length > 0) {
		var htmltv = "<table id='benchmarkingAnalysisJqGridTable'data-option='fitColumns: true, " +
				"scrollbarSize: 0' style='width: 29px; color: #fff; overflow-x: auto; border-collapse: separate; border-spacing: 0px 0px;'><thead><tr>";
		htmltv += "<th style='text-align: center;'>指标信息</th>";
		for(var i = 0; i < json.length; i++) {
			htmltv += "<th style='text-align: center;'>" + json[i].CITY_NAME + "</th>";
		}
		htmltv += "</tr></thead><tbody>";
		for(var j = 0; j < 11; j++) {
			htmltv += "<tr>";
			if(j == 0) {
				htmltv += "<td>放号量</td>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<td>" + json[i].TELE_COUNT + "</td>";
				}
			}
			else if(j == 1) {
				htmltv += "<td>新增宽带</td>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<td>" + json[i].BRO_ADD_COUNT + "</td>";
				}
			}
			else if(j == 2) {
				htmltv += "<td>终端合约</td>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<td>" + json[i].TERMINAL_COUNT + "</td>";
				}
			}
			else if(j == 3) {
				htmltv += "<td>家庭网新增</td>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<td>" + json[i].HOMENET_ADD_COUNT + "</td>";
				}
			}
			else if(j == 4) {
				htmltv += "<td>高价低占小区宽带新增</td>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<td>" + json[i].CELLRATE_ADD_SUM + "</td>";
				}
			}
			else if(j == 5) {
				htmltv += "<td>90后客户规模</td>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<td>" + json[i].ADD_VALUE_COUNT + "</td>";
				}
			}
			else if(j == 6) {
				htmltv += "<td>头部客户宽带新增</td>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<td>" + json[i].FUSE_RATE + "</td>";
				}
			}
			else if(j == 7) {
				htmltv += "<td>商客拓展</td>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<td>" + json[i].ENCLOSURE_COUNT + "</td>";
				}
			}
			else if(j == 8) {
				htmltv += "<td>个人客户总计费收入</td>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<td>" + json[i].INCOME + "</td>";
				}
			}
			else if(j == 9) {
				htmltv += "<td>新增客户总计费收入</td>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<td>" + json[i].ADDCUS_INCOME + "</td>";
				}
			}
			else if(j == 10) {
				htmltv += "<td>得分</td>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<td>" + json[i].SCORE + "</td>";
				}
			}
			htmltv += "</tr>";
		}
		htmltv += "</tbody></table>";
		$("#btmBenchmarkingAnalysis").html(htmltv);
		tableToGrid("#benchmarkingAnalysisJqGridTable");
		$(".jqgfirstrow").remove();
		$('#benchmarkingAnalysisJqGridTable').jqGrid({
			height: 500,
			width: "100%",
			autowidth: true,
			viewrecords: false,
			rownumbers: false,
			shrinkToFit: false,
			autoScroll: true,
			gridComplete: dayReportFormsetNiceScroll,
			loadComplete: function() {
				topjqGridLoadComplete();
			}
		});
		softThWidthbenchmarkingAnalysis();
		$(".ui-jqgrid-bdiv").css("height", "400px");
	} else {
		var htmltv = "<table style='width: 100%; height: 36px;' id='benchmarkingAnalysisJqGridTable'><thead><tr>";
		htmltv += "<th style='width: 100%; text-align: center;'>暂无数据</th>";
		htmltv += "</tr></thead></table>";
		$("#btmBenchmarkingAnalysis").html(htmltv);
		tableToGrid("#benchmarkingAnalysisJqGridTable");
	}
}

// 账期改变后，交互事件
$('body').on('change', '#benchmarkingAnalysisStatisDate', benchmarkingAnalysisStatisDateChange);
function benchmarkingAnalysisStatisDateChange() {
	var benchmarkingAnalysisRatio = $(".btn-selected").attr("data");
	// 如果是地市对标，则用地市编码查询
	if("1" == benchmarkingAnalysisRatio) {
		var cityInfo = $("#multipleCitySelectInfo option:selected");
		var cityCode = "";
		if(cityInfo.length > 0) {
			for(var i = 0; i < cityInfo.length; i++) {
				if(i != 9)
					cityCode += cityInfo[i].value + ",";
				else 
					cityCode += cityInfo[i].value;
			}
		}
		getBenchmarkingAnalysisTableInfo(benchmarkingAnalysisRatio, cityCode);
	} 
	// 如果是区县对标，则用区县编码查询
	else if("2" == benchmarkingAnalysisRatio) {
		var cntyInfo = $("#multipleCntySelectInfo option:selected");
		var cntyCode = "";
		if(cntyInfo.length > 0) {
			for(var i = 0; i < cntyInfo.length; i++) {
				if(i != 9)
					cntyCode += cntyInfo[i].value + ",";
				else 
					cntyCode += cntyInfo[i].value;
			}
		}
		getBenchmarkingAnalysisTableInfo(benchmarkingAnalysisRatio, cntyCode);
	} 
	// 如果是网格对标，则用网格编码查询
	else {
		var gridInfo = $("#multipleGridSelectInfo option:selected");
		var gridCode = "";
		if(gridInfo.length > 0) {
			for(var i = 0; i < gridInfo.length; i++) {
				if(i != 9)
					gridCode += gridInfo[i].value + ",";
				else 
					gridCode += gridInfo[i].value;
			}
		}
		getBenchmarkingAnalysisTableInfo(benchmarkingAnalysisRatio, gridCode);
	}
}

// 刷新表格数据
function getBenchmarkingAnalysisTableInfo(benchmarkingAnalysisRatio, orgId) {
	$("#btmBenchmarkingAnalysis").empty();
	var benchmarkingAnalysisStatisDate = $("#benchmarkingAnalysisStatisDate").val();
	$.ajax({
		url: $.cxt + "/firstpagethree/getbenchmarkinganalysis",
		type: "POST",
		data: {type: benchmarkingAnalysisRatio, orgId: orgId, statisDate: benchmarkingAnalysisStatisDate},
		async: false,
		success: function(result) {
			var json = JSON.parse(result);
			if(json.code == 0) {
				json = json.data;
				if(null != json && "" != json && json.length > 0) {
					var htmltv = "<table id='benchmarkingAnalysisJqGridTable'><thead><tr>";
					htmltv += "<th style='text-align: center;'>指标信息</th>";
					for(var i = 0; i < json.length; i++) {
						htmltv += "<th style='text-align: center;'>" + json[i].CITY_NAME + "</th>";
					}
					htmltv += "</tr></thead><tbody>";
					for(var j = 0; j < 11; j++) {
						htmltv += "<tr>";
						if(j == 0) {
							htmltv += "<td>放号量</td>";
							for(var i = 0; i < json.length; i++) {
								htmltv += "<td>" + json[i].TELE_COUNT + "</td>";
							}
						}
						else if(j == 1) {
							htmltv += "<td>新增宽带</td>";
							for(var i = 0; i < json.length; i++) {
								htmltv += "<td>" + json[i].BRO_ADD_COUNT + "</td>";
							}
						}
						else if(j == 2) {
							htmltv += "<td>终端合约</td>";
							for(var i = 0; i < json.length; i++) {
								htmltv += "<td>" + json[i].TERMINAL_COUNT + "</td>";
							}
						}
						else if(j == 3) {
							htmltv += "<td>家庭网新增</td>";
							for(var i = 0; i < json.length; i++) {
								htmltv += "<td>" + json[i].HOMENET_ADD_COUNT + "</td>";
							}
						}
						else if(j == 4) {
							htmltv += "<td>高价低占小区宽带新增</td>";
							for(var i = 0; i < json.length; i++) {
								htmltv += "<td>" + json[i].CELLRATE_ADD_SUM + "</td>";
							}
						}
						else if(j == 5) {
							htmltv += "<td>90后客户规模</td>";
							for(var i = 0; i < json.length; i++) {
								htmltv += "<td>" + json[i].ADD_VALUE_COUNT + "</td>";
							}
						}
						else if(j == 6) {
							htmltv += "<td>头部客户宽带新增</td>";
							for(var i = 0; i < json.length; i++) {
								htmltv += "<td>" + json[i].FUSE_RATE + "</td>";
							}
						}
						else if(j == 7) {
							htmltv += "<td>商客拓展</td>";
							for(var i = 0; i < json.length; i++) {
								htmltv += "<td>" + json[i].ENCLOSURE_COUNT + "</td>";
							}
						}
						else if(j == 8) {
							htmltv += "<td>个人客户总计费收入</td>";
							for(var i = 0; i < json.length; i++) {
								htmltv += "<td>" + json[i].INCOME + "</td>";
							}
						}
						else if(j == 9) {
							htmltv += "<td>新增客户总计费收入</td>";
							for(var i = 0; i < json.length; i++) {
								htmltv += "<td>" + json[i].ADDCUS_INCOME + "</td>";
							}
						}
						else if(j == 10) {
							htmltv += "<td>得分</td>";
							for(var i = 0; i < json.length; i++) {
								htmltv += "<td>" + json[i].SCORE + "</td>";
							}
						}
						htmltv += "</tr>";
					}
					htmltv += "</tbody></table>";
					$("#btmBenchmarkingAnalysis").html(htmltv);
					tableToGrid("#benchmarkingAnalysisJqGridTable");
					$(".jqgfirstrow").remove();
					$('#benchmarkingAnalysisJqGridTable').jqGrid({
						height: 400,
						width: "100%",
						autowidth: true,
						viewrecords: false,
						rownumbers: false,
						shrinkToFit: false,
						autoScroll: true,
						gridComplete: dayReportFormsetNiceScroll,
						loadComplete: function() {
							topjqGridLoadComplete();
						}
					});
					softThWidthbenchmarkingAnalysis();
					$(".ui-jqgrid-bdiv").css("height", "400px");
				} else {
					var htmltv = "<table style='width: 100%; height: 36px;' id='benchmarkingAnalysisJqGridTable'><thead><tr>";
					htmltv += "<th style='width: 100%; text-align: center;'>暂无数据</th>";
					htmltv += "</tr></thead></table>";
					$("#btmBenchmarkingAnalysis").html(htmltv);
					tableToGrid("#benchmarkingAnalysisJqGridTable");
				}
			}
		}
	});
}

// 地市点击事件
$('body').on('change', '#multipleCitySelectInfo', multipleCitySelectInfoChange);
function multipleCitySelectInfoChange() {
	var benchmarkingAnalysisRatio = $(".btn-selected").attr("data");
	// 地市对标
	if("1" == benchmarkingAnalysisRatio) {
		// 直接进行数据展示
		var cityInfo = $("#multipleCitySelectInfo option:selected");
		var cityCode = "";
		if(cityInfo.length >= 1) {
			for(var i = 0; i < cityInfo.length; i++) {
				if(i != cityInfo.length - 1) {
					cityCode += cityInfo[i].value + ",";
				} else {
					cityCode += cityInfo[i].value;
				}
			}
		}
		getBenchmarkingAnalysisTableInfo(benchmarkingAnalysisRatio, cityCode);
	} 
	// 区县、网格对标
	else {
		var cityInfo = $("#multipleCitySelectInfo option:selected");
		var cityCode = "";
		for(var i = 0; i < cityInfo.length; i++) {
			if(i != cityInfo.length - 1) 
				cityCode += cityInfo[i].value + ",";
			else
				cityCode += cityInfo[i].value;
		}
		$("#multipleCntySelectInfo").empty();
		if(cityCode.length > 0) {
			$.ajax({
				url: $.cxt + "/firstpagethree/getchildreninfobyids",
				type: "POST",
				data: {orgId: cityCode, gridType: null},
				success: function(result) {
					var json = JSON.parse(result);
					if(json.code == 0) {
						json = json.data;
						var htmlCnty = "";
						for(var i = 0; i < json.length; i++) {
							htmlCnty += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
						}
						$("#multipleCntySelectInfo").html(htmlCnty);
						$("#multipleCntySelectInfo").multipleSelect('refresh');
					}
				}
			});
		} else {
			// 根据当前登录人获取到地市，区县下拉框
			$.ajax({
				url: $.cxt + "/firstpagethree/gettowninfo",
				type: "POST",
				data: {type: benchmarkingAnalysisRatio},
				success: function(result) {
					var json = JSON.parse(result);
					if(json.code == 0) {
						var htmlCnty = "";
						json = json.data;
						var count = 0;
						for(var i = 0; i < json.length; i++) {
							if(json[i].orgLevel == 3) {
								if(count < 10) 
									htmlCnty += "<option selected='selected' value='" + json[i].orgId + "'>" + json[i].name + "</option>";
								else 
									htmlCnty += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
								count++;
							}
						}
						$("#multipleCntySelectInfo").html(htmlCnty);
						$("#multipleCntySelectInfo").multipleSelect('refresh');
					}
				}
			});
		}
	} 
}

// 区县点击事件
$('body').on('change', '#multipleCntySelectInfo', multipleCntySelectInfoChange);
function multipleCntySelectInfoChange() {
	var benchmarkingAnalysisRatio = $(".btn-selected").attr("data");
	// 网格对标
	if("3" == benchmarkingAnalysisRatio) {
		var cntyInfo = $("#multipleCntySelectInfo option:selected");
		var cntyCode = "";
		for(var i = 0; i < cntyInfo.length; i++) {
			if(i != cntyInfo.length - 1) 
				cntyCode += cntyInfo[i].value + ",";
			else
				cntyCode += cntyInfo[i].value;
		}
		var gridType = $("#gridType option:selected").val();
		$("#multipleGridSelectInfo").empty();
		if(cntyCode.length > 0) {
			$.ajax({
				url: $.cxt + "/firstpagethree/getchildreninfobyids",
				type: "POST",
				data: {orgId: cntyCode, gridType: gridType},
				success: function(result) {
					var json = JSON.parse(result);
					if(json.code == 0) {
						json = json.data;
						var htmlGrid = "";
						for(var i = 0; i < json.length; i++) {
							if(i < 10)
								htmlGrid += "<option selected='selected' value='" + json[i].orgId + "'>" + json[i].name + "</option>";
							else 
								htmlGrid += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
						}
						$("#multipleGridSelectInfo").html(htmlGrid);
						$("#multipleGridSelectInfo").multipleSelect('refresh');
						var gridInfo = $("#multipleGridSelectInfo option:selected");
						var gridCode = "";
						if(gridInfo.length >= 1) {
							for(var i = 0; i < gridInfo.length; i++) {
								if(i != gridInfo.length - 1) {
									gridCode += gridInfo[i].value + ",";
								} else {
									gridCode += gridInfo[i].value;
								}
							}
						}
						getBenchmarkingAnalysisTableInfo(benchmarkingAnalysisRatio, gridCode);
					}
				}
			});
		} else {
			// 根据当前登录人获取到地市，区县，网格下拉框
			$.ajax({
				url: $.cxt + "/firstpagethree/getgridinfo",
				type: "POST",
				data: {type: benchmarkingAnalysisRatio, gridType: gridType},
				success: function(result) {
					var json = JSON.parse(result);
					if(json.code == 0) {
						var htmlGrid = "";
						json = json.data;
						var count = 0;
						for(var i = 0; i < json.length; i++) {
							if(json[i].orgLevel == 4) {
								if(count < 10) 
									htmlGrid += "<option selected='selected' value='" + json[i].orgId + "'>" + json[i].name + "</option>";
								else 
									htmlGrid += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
								count++;
							}
						}
						$("#multipleGridSelectInfo").html(htmlGrid);
						$("#multipleGridSelectInfo").multipleSelect('refresh');
						var gridInfo = $("#multipleGridSelectInfo option:selected");
						var gridCode = "";
						if(gridInfo.length >= 1) {
							for(var i = 0; i < gridInfo.length; i++) {
								if(i != gridInfo.length - 1) {
									gridCode += gridInfo[i].value + ",";
								} else {
									gridCode += gridInfo[i].value;
								}
							}
						}
						getBenchmarkingAnalysisTableInfo(benchmarkingAnalysisRatio, gridCode);
					}
				}
			});
		}
	} else if("2" == benchmarkingAnalysisRatio) {
		var cntyInfo = $("#multipleCntySelectInfo option:selected");
		var cntyCode = "";
		if(cntyInfo.length >= 1) {
			for(var i = 0; i < cntyInfo.length; i++) {
				if(i != cntyInfo.length - 1) {
					cntyCode += cntyInfo[i].value + ",";
				} else {
					cntyCode += cntyInfo[i].value;
				}
			}
		}
		getBenchmarkingAnalysisTableInfo(benchmarkingAnalysisRatio, cntyCode);
	}
}

// 网格类型点击事件
$('body').on('change', '#gridType', gridTypeChange);
function gridTypeChange() {
	multipleCntySelectInfoChange();
}

// 网格点击事件
$('body').on('change', '#multipleGridSelectInfo', multipleGridSelectInfoChange);
function multipleGridSelectInfoChange() {
	var benchmarkingAnalysisRatio = $(".btn-selected").attr("data");
	var gridInfo = $("#multipleGridSelectInfo option:selected");
	var gridCode = "";
	if(gridInfo.length >= 1) {
		for(var i = 0; i < gridInfo.length; i++) {
			if(i != gridInfo.length - 1) {
				gridCode += gridInfo[i].value + ",";
			} else {
				gridCode += gridInfo[i].value;
			}
		}
	}
	getBenchmarkingAnalysisTableInfo(benchmarkingAnalysisRatio, gridCode);
}

// 查询指标现状列表
function getZbxzBottom() {
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var conditionTwo = $("#conditionTwo option:selected").val();
	// 如果是重点业务
	if("zdyw" == oneType) {
		$("#topPanel").css("display", "block");
		$("#importantPanel").css("display", "block");
		$("#zhibiaoPanel").css("display", "none");
		$("#countOne").css("display", "block");
        $("#countOnes").css("display", "block");
        var conditionTwoDisplay=$('#conditionTwo').css("display");
        if(conditionTwoDisplay=="block"&&conditionTwo=="month"){
        	$("#countThree").css("display", "block");
        }else{
        	$("#countThree").css("display", "none");
        }
        $("#countTwo").css("display", "none");
        // echart图
        getEchartInfo();
		// 获取重点业务头部
		getZdywHeader();
		// 获取重点业务列表
		getZdywBottom();
	} 
	// 客户信息（日）
	else if("KHXXD" == oneType) {
		getKhxxdBottom();
	} 
	// 客户信息（月）
	else if("KHXXM" == oneType) {
		getKhxxmBottom();
	} 
	// 收入信息
	else if("SRXX" == oneType) {
		getSrxxBottom();
	} 
	// 校园报表
	else if("XYBB" == oneType) {
		
		getXybbBottom();
	} 
	// 业务办理报表
	else if("YWBL" == oneType) {
		getYwblBottom();
	}
	// 酬金信息
	else if("CJXX" == oneType) {
		getCjxxBottom();
	}
	// 装维信息
	else if("ZWXX" == oneType) {
		getZwxxBottom();
	}
	// 投诉信息
	else if("TSXX" == oneType) {
		getTsxxBottom();
	}
	// 经分报表
	else if("JFBB" == oneType) {
		getJfbbBottom();
	} 
	// 客户发展
	else if("KHFZ" == oneType) {
		getKhfzBottom();
	}
}

//获取重点业务头部
function getZdywHeader() {
	// 两个汇总
	getTwoSum();
	// echart图
	getEchartInfo();
}

// echart图
function getEchartInfo() {
//	var url = $.cxt + "/firstpagethree/getzbxzinfodetail";
//	var city = $("#city option:selected").val();
//	var town = $("#town option:selected").val();
//	var grid = $("#grid option:selected").val();
//	var oneType = $("#oneType option:selected").val();
//	var twoType = $("#twoType option:selected").val();
//	var conditionTwo = $("#conditionTwo option:selected").val();
//	var statisDate = $("#statisDate").val();
//	var orgLevel = null;
//	var orgId = null;
//	if(null != grid && "" != grid) {
//		orgLevel = "4";
//		orgId = grid;
//	} else if(null != town && "" != town) {
//		orgLevel = "3";
//		orgId = town;
//	} else if(null != city && "" != city) {
//		orgLevel = "2";
//		orgId = city;
//	} else {
//		orgLevel = nowOrgLevel;
//		orgId = nowOrgId;
//	}
//	var data1 = {
//		orgId: orgId,
//		orgLevel: orgLevel,
//		statisDate: statisDate,
//		conditionOne: twoType,
//		conditionTwo: conditionTwo,
//	};
//	var data = [];
//	var titlename = [];
//	if(null != twoType && "" != twoType && null != conditionTwo && "" != conditionTwo && null != statisDate && "" != statisDate) {
//		$.ajax({
//			url: $.cxt + "/rptcomposite/allList",
//			data: {
//				json: JSON.stringify(data1)
//			},
//			type: "POST",
//			async: false,
//			success: function(total) {
//				if(total != null){
//					for(var i = 0; i < total.length; i++) {
//						if(total[i].CITY_NAME != "全省") {
//							if(twoType == 'XZJZWC' || twoType == 'TBKHGYRHL') {
//								data.push(total[i].RATE * 100);
//							} else if(twoType == 'GRKHZJFSR' || twoType == 'XZKHZJFSR') {
//								data.push(total[i].RATE_D * 100);	
//							} else if(twoType == 'GJZDZXQSTTS') {
//								data.push(total[i].PERMEABILITY * 100);	
//							} else {
//								if(conditionTwo == "day") {
//									data.push(total[i].RATE_D * 100);
//								} else {
//									data.push(total[i].RATE_M * 100);
//								}
//							}
//							if(orgLevel == "1") {
//								titlename.push(total[i].CITY_NAME);
//							}
//							if(orgLevel == "2"){
//								titlename.push(total[i].CNTY_NAME);
//							}
//							if(orgLevel == "3") {
//								titlename.push(total[i].GRID_NAME);
//							}
//						}
//						
//					}
//				}
//			}}
//		);
//		var myChart = echarts.init(document.getElementById('countTwo'));
//		var colors = [];
//		var num = 0;
//		var i = 0;
//		var option = {
//			tooltip: {
//				trigger: 'axis',
//				axisPointer: {
//					type: 'line',
//					lineStyle: {
//						opacity: 0
//					}
//				},
//			},
//			grid: {
//				x: 30,
//				x2: 30,
//				y: 15,
//				y2: 24
//			},
//			xAxis: {
//				data: titlename,
//				axisLabel: {
//					interval: 0,
//					show: true,
//					color: '#999',
//					fontSize: 10,
//					rotate: 20,
//				},
//				splitLine: {
//					show: false
//				},
//				axisLine: {
//					lineStyle: {
//						color: '#ddd'
//					}
//				},
//				axisTick:{
//                    show: false
//				}
//			},
//			yAxis : {
//                splitLine: {
//                    show: false
//                },
//                axisLine: {
//                    lineStyle: {
//                        color: '#ddd'
//                    }
//                },
//				axisLabel: {
//					color: 'rgb(170, 170, 170)',
//					formatter: '{value} '
//				},
//                axisTick:{
//                    show: false
//                }
//			},
//			series: [ {
//				type: 'bar',
//				data: data,
//				barWidth: '30%',
//				itemStyle: {
//					normal: {
//						color: function() {
//							num = parseInt(data[i]);
//							if(num <= 20) {
//								i++;
//								return "#63E4DE";
//							} else if(20 < num && num <= 40) {
//								i++;
//								return "#4AC8E9";
//							} else if(40 < num && num <= 60) {
//								i++;
//								return "#41BEED";
//							} else if(60 < num && num <= 80) {
//								i++;
//								return "#38B4F1";
//							} else if(80 < num) {
//								i++;
//								return "#1991ff";
//							}
//						}
//					},
//					label: {
//						show: true,
//						position: 'top',
//						textStyle: {
//							color: 'rgb(170, 170, 170)'
//						}
//					}
//				}
//			}]
//		};
//		myChart.setOption(option);
//	}
}

// 两个汇总
function getTwoSum() {
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var conditionTwo = $("#conditionTwo option:selected").val();
	var statisDate = $("#statisDate").val();
	var orgLevel = null;
	var orgId = null;
	if(null != grid && "" != grid) {
		orgLevel = "4";
		orgId = grid;
	} else if(null != town && "" != town) {
		orgLevel = "3";
		orgId = town;
	} else if(null != city && "" != city) {
		orgLevel = "2";
		orgId = city;
	} else {
		orgLevel = nowOrgLevel;
		orgId = nowOrgId;
	}
	var data = {
		orgId: orgId,
		orgLevel: orgLevel,
		statisDate: statisDate,
		conditionOne: twoType,
		conditionTwo: conditionTwo,
	};
	// 汇总信息
	if ("FH" == twoType) {
		$.ajax({
			url: $.cxt + "/rptcomposite/totalinfo",
			data: {
				json: JSON.stringify(data)
	        },
			type: "POST",
			success: function(result) {
				var json = JSON.parse(result);
				if(data.conditionTwo=="day"){
					magic_number("当日目标值", "当日放号量", json.data == "" || json.data == null ? 0 : json.data.TARGET_D, json.data == "" || json.data == null ? 0 : json.data.TELE_D);
				}else{
					if(getTime()==""){
						$("#countThree").css("display", "none");
						magic_number("当月目标值", "当月放号量",json.data == "" || json.data == null ? 0 : json.data.TARGET_M, json.data == "" || json.data == null ? 0 : json.data.TELE_M);
					}else{
						magic_number("当月目标值", "当月放号量",json.data == "" || json.data == null ? 0 : json.data.TARGET_M, json.data == "" || json.data == null ? 0 : json.data.TELE_M,"时间进度",getTime());
					}
				}
			}
		});
	} else if("XZKD" == twoType) {
		$.ajax({
			url: $.cxt + "/rptcomposite/totalinfo",
			data: {
				json: JSON.stringify(data)
	        },
			type: "POST",
			success: function(result) {
				var json = JSON.parse(result);
				if(data.conditionTwo=="day"){
					magic_number("当日目标值", "当日家庭宽带下单量", json.data == "" || json.data == null ? 0 : json.data.TARGET_D, json.data == "" || json.data == null ? 0 : json.data.ORDER_SUM_D);	
				}else{
					if(getTime()==""){
						$("#countThree").css("display", "none");
						magic_number("当月目标值", "当月家庭宽带下单量", json.data == "" || json.data == null ? 0 : json.data.TARGET_M, json.data == "" || json.data == null ? 0 : json.data.ORDER_SUM_M);
					}else{
						magic_number("当月目标值", "当月家庭宽带下单量", json.data == "" || json.data == null ? 0 : json.data.TARGET_M, json.data == "" || json.data == null ? 0 : json.data.ORDER_SUM_M,"时间进度",getTime());
					}	
				}
			
			}
		});
	} else if("ZDHY" == twoType) {
		$.ajax({
			url: $.cxt + "/rptcomposite/getformterminalcontractsum",
			type: 'POST',
			data: {json: JSON.stringify(data)},
			async: false,
			success: function(result) {
				if(data.conditionTwo == "day"){
					magic_number("当日目标值", "当日手机终端合约", result == "" || result == null ? 0 : result[0].TARGET_D, result == "" || result == null ? 0 : result[0].MOBILE_CONTRACT_D);
				}else{
					if(getTime()==""){
						$("#countThree").css("display", "none");
						magic_number("当月目标值", "当月手机终端合约", result == "" || result == null ? 0 : result[0].TARGET_M, result == "" || result == null ? 0 : result[0].MOBILE_CONTRACT_M);
					}else{
						magic_number("当月目标值", "当月手机终端合约", result == "" || result == null ? 0 : result[0].TARGET_M, result == "" || result == null ? 0 : result[0].MOBILE_CONTRACT_M,"时间进度",getTime());
					}
					
				}
			}
		});
	} else if("JTWXZ" == twoType) {
		$.ajax({
			url: $.cxt + "/rptcomposite/getformhomenetaddsum",
			type: 'POST',
			data: {json: JSON.stringify(data)},
			async: false,
			success: function(result) {
				var json = JSON.parse(result);
				if(data.conditionTwo == "day") {
					magic_number("当日目标值", "当日新增家庭网", json.data == "" || json.data == null ? 0 : json.data.TARGET_D, json == "" || json.data == null ? 0 : json.data.HOMENET_ADD_D);
				} else {
					if(getTime()==""){
						$("#countThree").css("display", "none");
						 magic_number("当月目标值", "当月新增家庭网", json.data == "" || json.data == null ? 0 : json.data.TARGET_M, json == "" || json.data == null ? 0 : json.data.HOMENET_ADD_M);
					}else{
						 magic_number("当月目标值", "当月新增家庭网", json.data == "" || json.data == null ? 0 : json.data.TARGET_M, json == "" || json.data == null ? 0 : json.data.HOMENET_ADD_M,"时间进度",getTime());
					}
				}
			}
		});
	} else if("ZXWQYQDXD" == twoType) { // 中小微企业圈地行动（商户拓展）
		$.ajax({
			url : $.cxt + "/rptcomposite/getSumFormEnclosureSum",
			type: 'POST',
			data: {json: JSON.stringify(data)},
			async: false,
			success: function(result) {
				$("#numberOne").empty();
				$("#numberTwo").empty();
				$("#numberThree").empty();
				if(data.conditionTwo=="day"){
					if(result!=null&&result!=''){
						magic_number("当日目标值", "当日完成量", result.TARGET_D, result.COMPLETE_D);
					}else{
						magic_number("当日目标值", "当日完成量", 0, 0);
					}
				}else{
					$("#numberThree").empty();
					if(result!=null&&result!=''){
						if(getTime()==""){
							$("#countThree").css("display", "none");
							magic_number("当月目标值", "当月完成量", result.TARGET_M, result.COMPLETE_M);
						}else{
							magic_number("当月目标值", "当月完成量", result.TARGET_M, result.COMPLETE_M, "时间进度", getTime());
						}
					}else{
						if(getTime()==""){
							$("#countThree").css("display", "none");
							magic_number("当月目标值", "当月完成量", 0, 0);
						}else{
							magic_number("当月目标值", "当月完成量", 0, 0, "时间进度", getTime());
						}
					}
				}
			}
		});
	} else if ("GRKHZJFSR" == twoType) {
		$.ajax({
			url: $.cxt + "/rptcomposite/totalFormCustomerFeeInfo",
			data: {
				json: JSON.stringify(data)
	        },
			type: "POST",
			success: function(result) {
				var json = JSON.parse(result);
				var data = json.data;
				var target_d = 0;
				var fee_m = 0;
				if (data != undefined && data != null) {
					target_d = data.TARGET_D;
					fee_m = data.FEE_M;
					if (target_d == undefined) {
						target_d = 0;
					}
					if (fee_m == undefined){
						fee_m = 0;
					}
				}
				magic_number("计费收入目标值", "当月累计收入", target_d+"万元", fee_m+"万元");
			}
		});
	} else if("XZKHZJFSR" == twoType) {
		$.ajax({
			url: $.cxt + "/rptcomposite/totalFormCustomerFeeInfo",
			data: {
				json: JSON.stringify(data)
	        },
			type: "POST",
			success: function(result) {
				var json = JSON.parse(result);
				var json = JSON.parse(result);
				var data = json.data;
				var target_d = 0;
				var fee_m = 0;
				if (data != undefined && data != null) {
					target_d = data.TARGET_D;
					fee_m = data.FEE_M;
					if (target_d == undefined) {
						target_d = 0;
					}
					if (fee_m == undefined) {
						fee_m = 0;
					}
				}
				magic_number("计费收入目标值", "当月累计收入", target_d+"万元", fee_m+"万元");
			}
		});
	} else if ("GJZDZXQSTTS" == twoType) {
		$.ajax({
			url: $.cxt + "/rptcomposite/getInfiltrationCellSummary",
			data: {
				json: JSON.stringify(data)
	        },
			type: "POST",
			success: function(result) {
				var json = JSON.parse(result);
				var data = json.data;
				var hzone = '0';
				var hztwo = '0%';
				if (data != undefined && data != null) {
					hzone = data.HZONE;
					hztwo = data.HZTWO;
					if (hzone == undefined) {
						hzone = '0';
					}
					if (hztwo == undefined){
						hztwo = '0%';
					} else{
						hztwo = (hztwo * 100).toFixed(2) + '%';
					}
				}
				magic_number("当月提升目标值", "当月渗透率", hzone, hztwo);
			}
		});
	}else if ("TBKHKDXZ" == twoType) {
		$.ajax({
			url: $.cxt + "/rptcomposite/getheadcustomeraddinfoSummary",
			data: {
				json: JSON.stringify(data)
	        },
			type: "POST",
			success: function(result) {
				var hzone = '0';
				var hztwo = '0';
				if (result != undefined && result != null&&result!="") {
					hzone = result.HZONE;
					hztwo = result.HZTWO;
					if (hzone == undefined) {
						hzone = '0';
					} else{
						hzone = hzone;
					}
					if (hztwo == undefined){
						hztwo = '0';
					} else{
						hztwo = hztwo;
					}
				}
				if(data.conditionTwo=="month"){
					if(getTime()==""){
						$("#countThree").css("display", "none");
						magic_number("当月头部客户宽带新增目标值", "当月头部客户宽带新增完成值", hzone, hztwo);
					}else{
						magic_number("当月头部客户宽带新增目标值", "当月头部客户宽带新增完成值", hzone, hztwo, "时间进度", getTime());
					}
				}else{
					magic_number("当日头部客户宽带新增目标值", "当日头部客户宽带新增完成值", hzone, hztwo);
				}
			}
		});
	} else if ("GJDZXQKDXZ" == twoType) {//高价低占小区宽带新增*
		$.ajax({
			url: $.cxt + "/rptcomposite/getInfiltrationCellSummary1",
			data: {
				json: JSON.stringify(data)
	        },
			type: "POST",
			success: function(result) {
				var json = JSON.parse(result);
				var data = json.data;
				var hzone = '0%';
				var hztwo = '0%';
				if (data != undefined && data != null) {
					hzone = data.HZONE;
					hztwo = data.HZTWO;
					if (hzone == undefined) {
						hzone = '0';
					} else{
						hzone = hzone;
					}
					if (hztwo == undefined){
						hztwo = '0';
					} else{
						hztwo = hztwo;
					}
				}
				if(conditionTwo == "month") {
					if(getTime() == ""){
						$("#countThree").css("display", "none");
						magic_number("当月高价低占小区宽带新增目标值", "当月高价低占小区宽带新增完成值", hzone, hztwo);
					}else{
						magic_number("当月高价低占小区宽带新增目标值", "当月高价低占小区宽带新增完成值", hzone, hztwo, "时间进度", getTime());
					}
				}else{
					magic_number("当日高价低占小区宽带新增目标值", "当日高价低占小区宽带新增完成值", hzone, hztwo);
				}
			}
		});
	} else if ("90HKHGMTS" == twoType) {//90后客户规模提升
		$.ajax({
			url: $.cxt + "/rptcomposite/getFormCusaddAfterNinetySummary",
			data: {
				json: JSON.stringify(data)
	        },
			type: "POST",
			success: function(result) {
				var json = JSON.parse(result);
				var data = json.data;
				var hzone = '0';
				var hztwo = '0';
				if (data != undefined && data != null) {
					hzone = data.HZONE;
					hztwo = data.HZTWO;
					if (hzone == undefined) {
						hzone = '0';
					} else{
						hzone = hzone;
					}
					if (hztwo == undefined){
						hztwo = '0';
					} else{
						hztwo = hztwo;
					}
				}
				if(conditionTwo == "month") {
					if(getTime() == "") {
						$("#countThree").css("display", "none");
						magic_number("当月90后净增目标值", "当月90后净增完成值", hzone, hztwo);
					}else{
						magic_number("当月90后净增目标值", "当月90后净增完成值", hzone, hztwo, "时间进度", getTime());
					}
				} else {
					magic_number("当日90后净增目标值", "当日90后净增完成值", hzone, hztwo);
				}
				
			}
		});
	} else if ("XZJZWD" == twoType) {
		$.ajax({
			url: $.cxt + "/rptcomposite/getDepressionAddSummary",
			data: {
				json: JSON.stringify(data)
	        },
			type: "POST",
			success: function(result) {
				var json = JSON.parse(result);
				var data = json.data;
				var hzone = 0;
				var hztwo = 0;
				if (data != undefined && data != null) {
					hzone = data.HZONE;
					hztwo = data.HZTWO;
					if (hzone == undefined) {
						hzone = 0;
					}
					if (hztwo == undefined) {
						hztwo = 0;
					}
				}
				magic_number("当月目标值", "90后到达客户数", hzone, hztwo);	
			}
		});
	} else if("TBKHGYRHL" == twoType) {
		$.ajax({
			url: $.cxt + "/rptcomposite/getSumFormCustomerFusion",
			type: 'POST',
			data: {json: JSON.stringify(data)},
			async: false,
			success: function(data) {
				//客户 HEAD_CLIENT
				$("#numberOne").empty();
				$("#numberTwo").empty();
				$("#numberThree").empty();
				if(data != null && data != '') {
					magic_number("目标值", "头部客户融合率", data.TARGET, (data.FUSE_RETA*100).toFixed(2)+'%');
				} else {
					magic_number("目标值", "头部客户数", 0, 0);
				}
			}
		});
	}
}

// 重点业务列表
function getZdywBottom() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethree/getzbxzinfodetail";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var conditionTwo = $("#conditionTwo option:selected").val();
	var statisDate = $("#statisDate").val();
	var orgLevel = null;
	var orgId = null;
	if(null != grid && "" != grid) {
		orgLevel = "4";
		orgId = grid;
	} else if(null != town && "" != town) {
		orgLevel = "3";
		orgId = town;
	} else if(null != city && "" != city) {
		orgLevel = "2";
		orgId = city;
	} else {
		orgLevel = nowOrgLevel;
		orgId = nowOrgId;
	}
	if ("FH" == twoType) {
		url = $.cxt + "/rptcomposite/formteleno";
		var name = "";
		if("day" == conditionTwo) {
			if(orgLevel == "1") {
				name = "地市名称";
				colNamesData = [ name, '当日目标值(户)', '当日放号量(户)', '超欠产量(户)', '进度', '全省排名' ];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center', cellattr: addCellAttr }, 
	    			{name: 'TELE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr}
				];
			} else if(orgLevel == "2") {
				name = "区县名称";
				colNamesData = [ name, '当日目标值(户)', '当日放号量(户)', '超欠产量(户)', '进度', '全市排名', "全省排名" ];
				colModelData = [ 
					{name: 'CNTY_NAME', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'TELE_D',align: 'center',cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center',cellattr: addCellAttr,formatter:rateFormat}, 
	    			{name: 'ORDER1_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'ORDER2_D', align: 'center',cellattr: addCellAttr}
				];
			} else if(orgLevel == "3") {
				name = "网格名称";
				colNamesData = [ '网格编码', name, '当日目标值(户)', '当日放号量(户)', '超欠产量(户)', '进度', '全县排名', "全市排名" ];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
					{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TELE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
				];
			} else if(orgLevel == "4") {
				name = "渠道名称";
				colNamesData = [ name, '当日目标值(户)', '当日放号量(户)', '超欠产量(户)', '进度', '网格内排名', "全县排名" ];
				colModelData = [ 
					{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TELE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
				];
			}
		} else if("month" == conditionTwo) {
			if(orgLevel == "1") {
				name = "地市名称";
				colNamesData = [ name, '当月目标值(户)', '当月放号量(户)', '较时间进度超欠产', '较时间进度完成率', '全省排名' ];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TELE_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr}
				];
			} else if(orgLevel == "2") {
				name = "区县名称";
				colNamesData = [ name, '当月目标值(户)', '当月放号量(户)', '较时间进度超欠产', '较时间进度完成率', '全市排名', "全省排名" ];
				colModelData = [ 
					{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TELE_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			} else if(orgLevel == "3") {
				name = "网格名称";
				colNamesData = [ '网格编码', name, '当月目标值(户)', '当月放号量(户)', '较时间进度超欠产', '较时间进度完成率', '全县排名', "全市排名" ];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
					{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TELE_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				]; 
			} else if(orgLevel == "4") {
				name = "渠道名称";
				colNamesData = [ name, '当月目标值(户)', '当月放号量(户)', '较时间进度超欠产', '较时间进度完成率', '网格内排名', "全县排名" ];
				colModelData = [ 
					{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TELE_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			}
		} else {
			return;
		}
	}
	// 新增宽带
	else if("XZKD" == twoType) {
		url = $.cxt + "/rptcomposite/formbroadbandadd";
		var name = "";
		if("day" == conditionTwo) {
			if(orgLevel == "1") {
				name = "地市名称";
				colNamesData = [ name, '当日目标值(户)',"当日家庭宽带新增完工量", '超欠产(户)', '完成进度', '全省排名','当日家庭宽带下单量' ,'当日家庭宽带撤单量','当日家庭宽带在途工单' ];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER_SUM_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDERING_SUM_D', align: 'center', cellattr: addCellAttr}
				];
			} else if(orgLevel == "2") {
				name = "区县名称";
				colNamesData = [ name, '当日目标值(户)',"当日家庭宽带新增完工量", '超欠产(户)', '完成进度', '全市排名', "全省排名",'当日家庭宽带下单量' ,'当日家庭宽带撤单量','当日家庭宽带在途工单' ];
				colModelData = [ 
					{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER_SUM_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDERING_SUM_D', align: 'center', cellattr: addCellAttr}
				];
			} else if(orgLevel == "3") {
				name = "网格名称";
				colNamesData = [ '网格编码', name, '当日目标值(户)','当日家庭宽带新增完工量',  '超欠产(户)', '完成进度', '全县排名', "全市排名",'当日家庭宽带下单量' ,'当日家庭宽带撤单量','当日家庭宽带在途工单' ];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center',cellattr: addCellAttr}, 
					{name: 'GRID_NAME', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center',cellattr: addCellAttr},
	    			{name: 'OWE_D', align: 'center',cellattr: addCellAttr},
	    			{name: 'RATE_D', align: 'center',cellattr: addCellAttr,formatter:rateFormat},
	    			{name: 'ORDER1_D', align: 'center',cellattr: addCellAttr},
	    			{name: 'ORDER2_D', align: 'center',cellattr: addCellAttr},
	    			{name: 'ORDER_SUM_D',align: 'center',cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'ORDERING_SUM_D', align: 'center',cellattr: addCellAttr}
				];
			} else if(orgLevel == "4") {
				name = "渠道名称";
				colNamesData = [ name, '当日目标值(户)','当日家庭宽带新增完工量',  '超欠产(户)', '完成进度', '网格内排名', "全县排名" ,'当日家庭宽带下单量' ,'当日家庭宽带撤单量','当日家庭宽带在途工单' ];
				colModelData = [ 
					{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center',cellattr: addCellAttr},
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER_SUM_D',align: 'center',cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'ORDERING_SUM_D', align: 'center',cellattr: addCellAttr}
				];
			}
		} else if("month" == conditionTwo) {
			if(orgLevel == "1") {
				name = "地市名称";
				colNamesData = [ name, '当月目标值(户)', '当月家庭宽带新增完工量', '其中高价值小区(个)', '其中低渗透小区(个)', '其中低零小区(个)',  '较时间进度超欠产','较时间进度完成率', '全省排名' ,'当月家庭宽带下单量' ,'当月家庭宽带撤单量','当月家庭宽带在途工单'];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'HIGH_VALUE_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_PER_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_ZERO_CELL', align: 'center', cellattr: addCellAttr}, 	
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER_SUM_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDERING_SUM_M', align: 'center', cellattr: addCellAttr}
				];
			} else if(orgLevel == "2") {
				name = "区县名称";
				colNamesData = [ name, '当月目标值(户)', '当月家庭宽带新增完工量', '其中高价值小区(个)', '其中低渗透小区(个)', '其中低零小区(个)',  '较时间进度超欠产','较时间进度完成率', '全市排名','全省排名' ,'当月家庭宽带下单量' ,'当月家庭宽带撤单量','当月家庭宽带在途工单'];
				colModelData = [ 
					{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'HIGH_VALUE_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_PER_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_ZERO_CELL', align: 'center', cellattr: addCellAttr}, 	
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER_SUM_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDERING_SUM_M', align: 'center', cellattr: addCellAttr}
				];
			} else if(orgLevel == "3") {
				name = "网格名称";
				colNamesData = [ '网格编码',name, '当月目标值(户)', '当月家庭宽带新增完工量', '其中高价值小区(个)', '其中低渗透小区(个)', '其中低零小区(个)',  '较时间进度超欠产','较时间进度完成率','全县排名', '全市排名' ,'当月家庭宽带下单量' ,'当月家庭宽带撤单量','当月家庭宽带在途工单'];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
					{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'HIGH_VALUE_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_PER_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_ZERO_CELL', align: 'center', cellattr: addCellAttr}, 	
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER_SUM_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDERING_SUM_M', align: 'center', cellattr: addCellAttr}
				];
			} else if(orgLevel == "4") {
				name = "渠道名称";
				colNamesData = [ name, '当月目标值(户)', '当月家庭宽带新增完工量', '其中高价值小区(个)', '其中低渗透小区(个)', '其中低零小区(个)',  '较时间进度超欠产','较时间进度完成率', '网格内排名','全县排名' ,'当月家庭宽带下单量' ,'当月家庭宽带撤单量','当月家庭宽带在途工单'];
				colModelData = [ 
					{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'HIGH_VALUE_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_PER_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_ZERO_CELL', align: 'center', cellattr: addCellAttr}, 	
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER_SUM_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDERING_SUM_M', align: 'center', cellattr: addCellAttr}
				];
			}
		} else {
			return;
		}
	} 
	
	// 终端合约
	else if("ZDHY" == twoType) {
		url = $.cxt + "/rptcomposite/getformterminalcontract";
		if("day" == conditionTwo) {
			if(orgLevel=="1"){
				colNamesData = [ '地市名称','当日目标值', '当日终端合约量','其中4G手机', '其中泛终端', '超欠产(台)', '进度', '全省排名' ];
				colModelData = [ 
	    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'MOBILE_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TERMINAL_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
		    		{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
				];
			}else if(orgLevel=="2"){
				colNamesData = [ '区县名称','当日目标值', '当日终端合约量','其中4G手机', '其中泛终端', '超欠产(台)', '进度', '全市排名', '全省排名'];
				colModelData = [ 
	    			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'MOBILE_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TERMINAL_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
		    		{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
		    		{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
				];
			}else if(orgLevel=="3"){
				colNamesData = [ '网格编码', '网格名称','当日目标值', '当日终端合约量','其中4G手机', '其中泛终端', '超欠产(台)', '进度', '全县排名', '全市排名'];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
					{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
					{name: 'COMPLETE_VALUE_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'MOBILE_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'TERMINAL_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
				];
			} else if(orgLevel == "4") {
				colNamesData = [ '渠道名称','当日目标值', '当日终端合约量','其中4G手机', '其中泛终端', '超欠产(台)', '进度', '网格内排名', '全县排名'];
				colModelData = [ 
	    			{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'MOBILE_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TERMINAL_CONTRACT_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
		    		{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
		    		{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
				];
			}
			
		} else {
			if(orgLevel=="1"){
				colNamesData = [ '地市名称', '当月目标值','当月终端合约量','其中4G手机', '其中泛终端', '较时间进度超欠产','较时间进度完成率', '全省排名' ];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
					{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr},
					{name: 'MOBILE_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'TERMINAL_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr}
				];
			}else if(orgLevel=="2"){
				colNamesData = [ '区县名称', '当月目标值', '当月终端合约量','其中4G手机', '其中泛终端', '较时间进度超欠产','较时间进度完成率', '全市排名', '全省排名'];
				colModelData = [ 
					{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
					{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'MOBILE_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'TERMINAL_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			}else if(orgLevel=="3"){
				colNamesData = [ '网格编码', '网格名称', '当月目标值','当月终端合约量','其中4G手机', '其中泛终端', '较时间进度超欠产','较时间进度完成率', '全县排名', '全市排名'];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
					{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
					{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'MOBILE_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'TERMINAL_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			} else if(orgLevel == "4") {
				colNamesData = [ '渠道名称', '当月目标值', '当月终端合约量','其中4G手机', '其中泛终端', '较时间进度超欠产','较时间进度完成率', '网格内排名', '全县排名'];
				colModelData = [ 
					{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_M',align: 'center', cellattr: addCellAttr},
					{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'MOBILE_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'TERMINAL_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			}
			
		}
	} 
	// 家庭网新增
	else if("JTWXZ" == twoType) {
		url = $.cxt + "/rptcomposite/getformhomenetadd";
		if("day" == conditionTwo) {
			if(orgLevel=="1"){
				colNamesData = [ '地市名称','当日目标值', '当日家庭网新增', '超欠产量(户)','进度','全省排名' ];
				colModelData = [ 
	    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'HOMENET_ADD_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
					{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr}
				]; 
			}else if(orgLevel=="2"){
				colNamesData = [ '区县名称','当日目标值', '当日家庭网新增', '超欠产量(户)','进度','全市排名' ,'全省排名'];
				colModelData = [ 
	    			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'HOMENET_ADD_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
					{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
				];
			}else if(orgLevel=="3"){
				colNamesData = [ '网格编码', '网格名称','当日目标值', '当日家庭网新增', '超欠产(户)','进度','全县排名' ,'全市排名'];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
					{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'HOMENET_ADD_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
					{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
				];
			} else if(orgLevel == "4") {
				colNamesData = [ '渠道名称','当日目标值', '当日家庭网新增', '超欠产量(户)','进度','网格内排名' ,'全县排名'];
				colModelData = [ 
	    			{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'HOMENET_ADD_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
					{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
				];
			}
			
		} else {
			if(orgLevel=="1"){
				colNamesData = [ '地市名称', '当月目标值', '当月家庭网新增', '较时间进度超欠产','较时间进度完成率','全省排名' ];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'HOMENET_ADD_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
					{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr}
	    		];
			}else if(orgLevel=="2"){
				colNamesData = [ '区县名称', '当月目标值', '当月家庭网新增', '较时间进度超欠产','较时间进度完成率','全市排名' ,'全省排名'];
				colModelData = [ 
								{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
				    			{name: 'HOMENET_ADD_M', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
								{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
								{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}];
			}else if(orgLevel=="3"){
				colNamesData = [ '网格编码', '网格名称', '当月目标值', '当月家庭网新增', '较时间进度超欠产','较时间进度完成率','全县排名' ,'全市排名'];
				colModelData = [ 
								{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
								{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
				    			{name: 'HOMENET_ADD_M', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
								{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
								{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}];
			} else if(orgLevel == "4") {
				colNamesData = [ '渠道名称', '当月目标值', '当月家庭网新增', '较时间进度超欠产','较时间进度完成率','网格内排名' ,'全县排名'];
				colModelData = [ 
					{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'HOMENET_ADD_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
					{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			}
		}
	} 
	
	// 中小微企业圈地行动（商户拓展）
	else if("ZXWQYQDXD" == twoType) {
		url = $.cxt + "/rptcomposite/formenclosuresum";
		if("day" == conditionTwo) {
			if(orgLevel == "1"){
				colNamesData = [ '地市名称','当日目标值', '当日完成量', '其中199-399小微宽带','其中企业上云','超欠产(个)', '进度', '全省排名' ];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'MIC_BRO_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'ENTERPRISE_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},  
				];
			}else if(orgLevel == "2"){
				colNamesData = [ '区县名称','当日目标值', '当日完成量', '其中199-399小微宽带','其中企业上云','超欠产(个)', '进度', '全市排名', '全省排名'];
				colModelData = [ 
	    			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'MIC_BRO_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ENTERPRISE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}, 
				];
			}else if(orgLevel == "3"){
				colNamesData = [ '网格编码', '网格名称','当日目标值', '当日完成量', '其中199-399小微宽带','其中企业上云','超欠产(个)', '进度', '全县排名', '全市排名'];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
	    			{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'MIC_BRO_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ENTERPRISE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}, 
				];
			} else if(orgLevel == "4") {
				colNamesData = [ '渠道名称','当日目标值', '当日完成量', '其中199-399小微宽带','其中企业上云','超欠产(个)', '进度', '网格内排名', '全县排名'];
				colModelData = [ 
	    			{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'MIC_BRO_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ENTERPRISE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}, 
				];
			}
		} else {
			if(orgLevel=="1"){
				colNamesData = [ '地市名称','当月目标值', '当月完成量', '其中199-399小微宽带','其中企业上云','较时间进度超欠产','较时间进度完成率', '全省排名' ];
				colModelData = [ 
	    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'MIC_BRO_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ENTERPRISE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr}, 
				];
			}else if(orgLevel=="2"){
				colNamesData = [ '区县名称','当月目标值', '当月完成量', '其中199-399小微宽带','其中企业上云','较时间进度超欠产','较时间进度完成率', '全市排名', '全省排名'];
				colModelData = [ 
	    			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'MIC_BRO_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ENTERPRISE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}, 
				];
			}else if(orgLevel=="3"){
				colNamesData = [ '网格编码', '网格名称','当月完成量', '当月完成值量', '其中199-399小微宽带','其中企业上云','较时间进度超欠产','较时间进度完成率', '全县排名', '全市排名'];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
	    			{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'MIC_BRO_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ENTERPRISE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}, 
				];
			} else if(orgLevel == "4") {
				colNamesData = [ '渠道名称','当月目标值', '当月完成量', '其中199-399小微宽带','其中企业上云','较时间进度超欠产','较时间进度完成率', '网格内排名', '全县排名'];
				colModelData = [ 
	    			{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'MIC_BRO_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ENTERPRISE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}, 
				];
			}
		}
	}
	// 高价值低占小区渗透提升查询
	else if("GJZDZXQSTTS" == twoType) {
		url = $.cxt + "/rptcomposite/getInfiltrationCellGroupByArea";
		var areaName = "";
		var colAreaName = "";
		if (orgLevel == '1'){
			areaName = "地市名称";
			colAreaName = "CITY_NAME";
		} else if (orgLevel == '2') {
			areaName = "区县名称";
			colAreaName = "CNTY_NAME";
		} else if (orgLevel == '3') {
			areaName = "网格名称";
			colAreaName = "GRID_NAME";
		} else if (orgLevel == '4') {
			areaName = "渠道名称";
			colAreaName = "CHNL_NAME";
		}
		if (orgLevel == '1') {
			colNamesData=[ areaName , '当月提升目标值', '高价值低占小区宽带九级地址数(个)', '高价值低占小区已用九级地址数(个)', '当月渗透率', '上月渗透率', '提升值', '超欠产', '全省排名' ];
			colModelData = [ 
    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET',align: 'center', cellattr: addCellAttr}, 
    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
    			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
    			{name: 'PERMEABILITY', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'PERMEABILITY_LASTPERIOD', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
    			{name: 'ADD_SUM', align: 'center', cellattr: addCellAttr, formatter:rateFormat},
    			{name: 'OWE', align: 'center', cellattr: addCellAttr},
    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr}
    		];
		} else if (orgLevel == '2' || orgLevel == '3' || orgLevel == '4') {
			if(orgLevel == "3") {
				colNamesData = [ '网格编码', areaName , '当月提升目标值', '高价值低占小区宽带九级地址数(个)', '高价值低占小区已用九级地址数(个)', '当月渗透率', '上月渗透率', '提升值', '超欠产', '全县排名', '全市排名' ];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
	    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'PERMEABILITY', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'PERMEABILITY_LASTPERIOD', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ADD_SUM', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'OWE', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr},
	    		];
			} else {
				var oneLevel = "";
				var twoLevel = "";
				if(orgLevel == "2") {
					oneLevel = "地市";
					twoLevel = "全省";
				} else {
					oneLevel = "网格";
					twoLevel = "区县";
				}
				colNamesData = [ areaName , '当月提升目标值', '高价值低占小区宽带九级地址数(个)', '高价值低占小区已用九级地址数(个)', '当月渗透率', '上月渗透率', '提升值', '超欠产', oneLevel, twoLevel ];
				colModelData = [ 
	    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'PERMEABILITY', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'PERMEABILITY_LASTPERIOD', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ADD_SUM', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'OWE', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr},
	    		];
			}
		}
	} 
	// 高价值低占小区渗透提升查询*版本1
	else if("GJDZXQKDXZ" == twoType) {
		url = $.cxt + "/rptcomposite/getInfiltrationCellGroupByArea1";
		var areaName = "";
		var colAreaName = "";
		if (orgLevel == '1'){
			areaName = "地市名称";
			colAreaName = "CITY_NAME";
		} else if (orgLevel == '2') {
			areaName = "区县名称";
			colAreaName = "CNTY_NAME";
		} else if (orgLevel == '3') {
			areaName = "网格名称";
			colAreaName = "GRID_NAME";
		} else if (orgLevel == '4') {
			areaName = "渠道名称";
			colAreaName = "CHNL_NAME";
		}
		if("day" == conditionTwo) {
			if (orgLevel == '1') {
				colNamesData=[ areaName , '当日高价低占小区宽带新增目标值', '当日高价低占小区宽带新增完成', '超欠产', '完成率', '全省排名','当前高价低占小区九级地址数', '当前高价低占小区已用九级地址数', '当前高价低占小区渗透率','昨日高价低占小区已用地址数', '当日已用地址数月净增' ];
				colModelData = [ 
	    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'CELL_COUNT_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr},
	    			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr},
	    			{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr,formatter: rateFormat},
	    			{name: 'CELL_NUM_YS_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'CELL_NUM_JZ_D', align: 'center', cellattr: addCellAttr}
	    		];
			} else if (orgLevel == '2' || orgLevel == '3' || orgLevel == '4') {
				if(orgLevel == "3") {
					colNamesData = [ '网格编码', areaName , '当日高价低占小区宽带新增目标值', '当日高价低占小区宽带新增完成', '超欠产', '完成率','全县排名', '全市排名','当前高价低占小区九级地址数', '当前高价低占小区已用九级地址数', '当前高价低占小区渗透率','昨日高价低占小区已用地址数', '当日已用地址数月净增' ];
					colModelData = [ 
						{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
		    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
		    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
		    			{name: 'CELL_COUNT_D', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
		    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr},
		    			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr},
		    			{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr,formatter: rateFormat},
		    			{name: 'CELL_NUM_YS_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'CELL_NUM_JZ_D', align: 'center', cellattr: addCellAttr}
		    		];
				} else {
					var oneLevel = "";
					var twoLevel = "";
					if(orgLevel == "2") {
						oneLevel = "地市";
						twoLevel = "全省";
					} else {
						oneLevel = "网格";
						twoLevel = "区县";
					}
					colNamesData = [ areaName ,'当日高价低占小区宽带新增目标值', '当日高价低占小区宽带新增完成', '超欠产', '完成率',oneLevel,twoLevel,'当前高价低占小区九级地址数', '当前高价低占小区已用九级地址数', '当前高价低占小区渗透率','昨日高价低占小区已用地址数', '当日已用地址数月净增' ];
					colModelData = [ 
		    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
		    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
		    			{name: 'CELL_COUNT_D', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
		    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr},
		    			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr},
		    			{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr,formatter: rateFormat},
		    			{name: 'CELL_NUM_YS_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'CELL_NUM_JZ_D', align: 'center', cellattr: addCellAttr}
		    		];
				}
			}
		} else { 
			if (orgLevel == '1') {
				colNamesData=[ areaName , '当月高价低占小区宽带新增目标值', '当月高价低占小区宽带新增完成',  '较时间进度超欠产','较时间进度完成率', '全省排名','当前高价低占小区九级地址数', '当前高价低占小区已用九级地址数', '当前高价低占小区渗透率','上月高价低占小区已用地址数', '当月已用地址数月净增' ];
				colModelData = [ 
					{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
					{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr}, 
					{name: 'CELL_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
					{name: 'CELL_TIME_RATE', align: 'center', cellattr: addCellAttr,formatter: rateFormat}, 
					{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
					{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr},
					{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr},
					{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr,formatter: rateFormat},
					{name: 'CELL_NUM_LAST_D', align: 'center', cellattr: addCellAttr},
					{name: 'CELL_NUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}
				];
			} else if (orgLevel == '2' || orgLevel == '3' || orgLevel == '4') {
				if(orgLevel == "3") {
					colNamesData = [ '网格编码', areaName , '当月高价低占小区宽带新增目标值', '当月高价低占小区宽带新增完成','较时间进度超欠产', '较时间进度完成率', '全县排名', '全市排名','当前高价低占小区九级地址数', '当前高价低占小区已用九级地址数', '当前高价低占小区渗透率','上月高价低占小区已用地址数', '当月已用地址数月净增' ];
					colModelData = [ 
						{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
		    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
		    			{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
		    			{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'CELL_TIME_OWE', align: 'center', cellattr: addCellAttr},
		    			{name: 'CELL_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},  
		    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
		    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr},
		    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr},
		    			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr},
		    			{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
		    			{name: 'CELL_NUM_LAST_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'CELL_NUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}
		    		];
				} else {
					var oneLevel = "";
					var twoLevel = "";
					if(orgLevel == "2") {
						oneLevel = "全市排名";
						twoLevel = "全省排名";
					} else {
						oneLevel = "网格内排名";
						twoLevel = "全县排名";
					}
					colNamesData = [ areaName , '当月高价低占小区宽带新增目标值', '当月高价低占小区宽带新增完成', '较时间进度超欠产','较时间进度完成率',oneLevel, twoLevel,'当前高价低占小区九级地址数', '当前高价低占小区已用九级地址数', '当前高价低占小区渗透率','上月高价低占小区已用地址数', '当月已用地址数月净增' ];
					colModelData = [ 
		    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
		    			{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
		    			{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'CELL_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'CELL_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
		    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
		    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr},
		    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr},
		    			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr},
		    			{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
		    			{name: 'CELL_NUM_LAST_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'CELL_NUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}
		    		];
				}
			} 
		}
	} 	
	// 90后客户规模提升
	else if("90HKHGMTS" == twoType) {
		url = $.cxt + "/rptcomposite/getFormCusaddAfterNinety";
		var areaName = "";
		var colAreaName = "";
		if (orgLevel == '1'){
			areaName = "地市名称";
			colAreaName = "CITY_NAME";
		} else if (orgLevel == '2') {
			areaName = "区县名称";
			colAreaName = "CNTY_NAME";
		} else if (orgLevel == '3') {
			areaName = "网格名称";
			colAreaName = "GRID_NAME";
		} else if('4' == orgLevel) {
			areaName = "渠道名称";
			colAreaName = "CHNL_NAME";
		}
		if("day" == conditionTwo) {
			if (orgLevel == '1') {
				colNamesData=[ areaName , '当日90后净增目标值', '当日90后净增完成值', '超欠产', '完成率','全省排名', '当月90后规模<br/>到达目标值', '上月期末90后<br/>规模到达值', '当前90后<br/>规模到达值','当月90后客户<br/>规模净增' ];
				colModelData = [ 
	    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
	    			{name: 'DEPADD_TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'DEPADD_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'DEPADD_OWE', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'DEPADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'DEPADD_SUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}
	    		];
			} else if (orgLevel == '2' || orgLevel == '3' || orgLevel == '4') {
				if(orgLevel == "3") {
					colNamesData = [ '网格编码', areaName , '当日90后净增目标值', '当日90后净增完成值', '超欠产', '完成率','全县排名', '全市排名','当月90后规模<br/>到达目标值', '上月期末90<br/>后规模到达值', '当前90后<br/>规模到达值','当月90后客户<br/>规模净增' ];
					colModelData = [ 
						{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
		    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_TARGET_D',align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_D', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_OWE', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
		    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}
		    		];
				} else {
					var oneLevel = "";
					var twoLevel = "";
					if(orgLevel == "2") {
						oneLevel = "全市排名";
						twoLevel = "全省排名";
					} else {
						oneLevel = "网格内排名";
						twoLevel = "全县排名";
					}
					colNamesData = [ areaName ,'当日90后净增目标值', '当日90后净增完成值', '超欠产', '完成率',oneLevel, twoLevel,'当月90后规模<br/>到达目标值', '上月期末90<br/>后规模到达值', '当前90后<br/>规模到达值','当月90后客户<br/>规模净增' ];
					colModelData = [ 
		    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_TARGET_D',align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_D', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_OWE', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
		    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}
		    		];
				}
			}
		} else {
			if (orgLevel == '1') {
				colNamesData=[ areaName , '当月90后净增目标值', '当月90后净增完成值', '较时间进度超欠产','较时间进度完成率', '全省排名', '当月90后规模<br/>到达目标值', '上月期末90<br/>后规模到达值', '当前90后<br/>规模到达值','当月90后客户<br/>规模净增' ];
				colModelData = [ 
	    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
	    			{name: 'DEPADD_TARGET_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'DEPADD_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'DEPADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'DEPADD_TIME_RATE', align: 'center', cellattr: addCellAttr,formatter: rateFormat}, 			
	    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
	    			{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'DEPADD_SUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}
	    		];
			} else if (orgLevel == '2' || orgLevel == '3' || orgLevel == '4') {
				if(orgLevel == "3") {
					colNamesData = [ '网格编码', areaName , '当月90后净增目标值', '当月90后净增完成值','较时间进度超欠产', '较时间进度完成率', '全县排名', '全市排名', '当月90后规模<br/>到达目标值', '上月期末90<br/>后规模到达值', '当前90后<br/>规模到达值','当月90后客户<br/>规模净增'];
					colModelData = [ 
						{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
		    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_TARGET_M',align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_M', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
		    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
		    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}
		    		];
				} else {
					var oneLevel = "";
					var twoLevel = "";
					if(orgLevel == "2") {
						oneLevel = "全市排名";
						twoLevel = "全省排名";
					} else {
						oneLevel = "网格内排名";
						twoLevel = "全县排名";
					}
					colNamesData = [ areaName , '当月90后净增目标值', '当月90后净增完成值', '较时间进度超欠产','较时间进度完成率',oneLevel, twoLevel, '当月90后规模<br/>到达目标值', '上月期末90<br/>后规模到达值', '当前90后<br/>规模到达值','当月90后客户<br/>规模净增'];
					colModelData = [ 
		    			{name: colAreaName, align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_TARGET_M',align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_M', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'DEPADD_TIME_RATE', align: 'center', cellattr: addCellAttr,formatter: rateFormat}, 
		    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
		    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr},
		    			{name: 'DEPADD_SUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}
		    		];
				}
			}
		}
	}
	// 新增价值洼地查询
	else if("XZJZWD" == twoType) {
		url = $.cxt + "/rptcomposite/getDepressionAddGroupByArea";
		var areaName = "";
		if (orgLevel == '1') {
			areaName = "地市名称";
		} else if (orgLevel == '2') {
			areaName = "区县名称";
		} else if (orgLevel == '3') {
			areaName = "网格名称";
		} else if (orgLevel == '4') {
			areaName = "渠道名称";
		}
		if (orgLevel == '1') {
			colNamesData = [ areaName , '当月目标值(个)', '90后到达客户数(个)', '超欠产(个)', '进度','全省排名' ];
			colModelData = [ 
    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET',align: 'center', cellattr: addCellAttr}, 
    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
    			{name: 'OWE', align: 'center', cellattr: addCellAttr}, 
    			{name: 'RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr}
    		];
		} else if (orgLevel == '2' || orgLevel == '3' || orgLevel == '4') {
			if(orgLevel == "3") {
				colNamesData=[ '网格编码', areaName , '当月目标值(个)', '90后到达客户数(个)', '超欠产(个)', '进度','全县排名', '全市排名',];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
	    			{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr}
	    		];
			} else {
				var oneLevel = "";
				var twoLevel = "";
				if(orgLevel == "2") {
					oneLevel = "全市排名";
					twoLevel = "全省排名";
				} else {
					oneLevel = "网格内排名";
					twoLevel = "全县排名";
				}
				colNamesData=[ areaName , '当月目标值(个)', '90后到达客户数(个)', '超欠产(个)', '进度',oneLevel,twoLevel];
				if(orgLevel == "2"){
					colModelData = [ 
		    			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'TARGET',align: 'center', cellattr: addCellAttr}, 
		    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'OWE', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
		    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
		    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr}
		    		];
				}
				else if(orgLevel == "4") {
					colModelData = [ 
		    			{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'TARGET',align: 'center', cellattr: addCellAttr}, 
		    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'OWE', align: 'center', cellattr: addCellAttr}, 
		    			{name: 'RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
		    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
		    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr}
		    		];
				}
			}
		}
	} 
	// 头部客户固移融合率查询
	else if("TBKHGYRHL" == twoType) {
		url = $.cxt + "/rptcomposite/formcustomerfusion";
		if(orgLevel == 1) {
			colNamesData = ['地市名称', '当月目标值', '头部客户数(个)', '固移融合头部客户(个)', '头部客户固移融合率', '超欠产', '进度', '全省排名'];
			colModelData = [
                {name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
                {name: 'TARGET', align: 'center', cellattr: addCellAttr}, 
                {name: 'HEAD_CLIENT', align: 'center', cellattr: addCellAttr}, 
                {name: 'FUSE_TYPE_BRO', align: 'center', cellattr: addCellAttr}, 
                {name: 'FUSE_RETA', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
                {name: 'OWE', align: 'center', cellattr: addCellAttr}, 
                {name: 'RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
                {name: 'ORDER1', align: 'center', cellattr: addCellAttr}
        	];
		} else if(orgLevel == 2) {
			colNamesData = ['区县名称', '当月目标值', '头部客户数(个)', '固移融合头部客户(个)', '头部客户固移融合率', '超欠产', '进度', '全市排名', '全省排名'];
			colModelData = [
                {name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
                {name: 'TARGET', align: 'center', cellattr: addCellAttr}, 
                {name: 'HEAD_CLIENT', align: 'center', cellattr: addCellAttr}, 
                {name: 'FUSE_TYPE_BRO', align: 'center', cellattr: addCellAttr}, 
                {name: 'FUSE_RETA', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
                {name: 'OWE', align: 'center', cellattr: addCellAttr}, 
                {name: 'RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
                {name: 'ORDER1', align: 'center', cellattr: addCellAttr},
                {name: 'ORDER2', align: 'center', cellattr: addCellAttr}
        	];
		}else if(orgLevel == 3) {
			colNamesData = [ '网格编码', '网格名称', '当月目标值', '头部客户数(个)', '固移融合头部客户(个)', '头部客户固移融合率', '超欠产', '进度', '全县排名', '全市排名'];
			colModelData = [
                {name: 'GRID_CODE', align: 'center', hidden: true, cellattr: addCellAttr}, 
                {name: 'GRID_NAME', align: 'center',cellattr: addCellAttr}, 
                {name: 'TARGET', align: 'center',cellattr: addCellAttr}, 
                {name: 'HEAD_CLIENT', align: 'center',cellattr: addCellAttr}, 
                {name: 'FUSE_TYPE_BRO', align: 'center',cellattr: addCellAttr}, 
                {name: 'FUSE_RETA', align: 'center',cellattr: addCellAttr, formatter:rateFormat}, 
                {name: 'OWE', align: 'center',cellattr: addCellAttr}, 
                {name: 'RATE', align: 'center',cellattr: addCellAttr, formatter:rateFormat}, 
                {name: 'ORDER1', align: 'center',cellattr: addCellAttr},
                {name: 'ORDER2', align: 'center',cellattr: addCellAttr}
        	];
		} else if(orgLevel == 4) {
			colNamesData = [ '渠道名称', '当月目标值', '头部客户数(个)', '固移融合头部客户(个)', '头部客户固移融合率', '超欠产', '进度', '网格内排名', '全县排名'];
			colModelData = [
                {name: 'CHNL_NAME', align: 'center',cellattr: addCellAttr}, 
                {name: 'TARGET', align: 'center',cellattr: addCellAttr}, 
                {name: 'HEAD_CLIENT', align: 'center',cellattr: addCellAttr}, 
                {name: 'FUSE_TYPE_BRO', align: 'center',cellattr: addCellAttr}, 
                {name: 'FUSE_RETA', align: 'center',cellattr: addCellAttr, formatter: rateFormat}, 
                {name: 'OWE', align: 'center',cellattr: addCellAttr}, 
                {name: 'RATE', align: 'center',cellattr: addCellAttr, formatter:rateFormat}, 
                {name: 'ORDER1', align: 'center',cellattr: addCellAttr},
                {name: 'ORDER2', align: 'center',cellattr: addCellAttr}
        	];
		}
	} 
	// 个人客户总计费收入查询
	else if("GRKHZJFSR" == twoType) {
		url = $.cxt + "/rptcomposite/getFormCustomerFeeInfo";
		if(orgLevel == 1 ) {
			colNamesData = ['地市名称', '当月目标值', '当月完成值量', '较时间进度超欠产', '较时间进度完成率', '全省排名'];
			colModelData = [ 
    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_M', align: 'center', cellattr: addCellAttr},  
    			{name: 'OWE', align: 'center', cellattr: addCellAttr}, 
    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr}
    		];
		} else if(orgLevel == 2) {
			colNamesData = ['区县名称', '当月目标值', '当月完成值量', '较时间进度超欠产', '较时间进度完成率', '全市排名', '全省排名'];
			colModelData = [ 
    			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_M', align: 'center', cellattr: addCellAttr},  
    			{name: 'OWE', align: 'center', cellattr: addCellAttr}, 
    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
    		];
		} else if(orgLevel == 3) {
			colNamesData = [ '网格编码', '网格名称', '当月目标值', '当月完成值量', '较时间进度超欠产', '较时间进度完成率', '全县排名', '全市排名'];
			colModelData = [ 
    			{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
    			{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_M', align: 'center', cellattr: addCellAttr},  
    			{name: 'OWE', align: 'center', cellattr: addCellAttr}, 
    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
    		];
		} else if(orgLevel == 4) {
			colNamesData = ['渠道名称', '当月目标值', '当月完成值量', '较时间进度超欠产', '较时间进度完成率', '网格内排名', '全县排名'];
			colModelData = [ 
    			{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_M', align: 'center', cellattr: addCellAttr},  
    			{name: 'OWE', align: 'center', cellattr: addCellAttr}, 
    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
    		];
		}
	} 
	// 新增客户总计费收入查询
	else if("XZKHZJFSR" == twoType) {
		url = $.cxt + "/rptcomposite/getFormCustomerFeeInfo";
		if(orgLevel == 1 ) {
			colNamesData = ['地市名称', '计费收入目标值(万元)', '当日收入(万元)', '当月累计收入(万元)', '进度', '全省排名'];
			colModelData = [ 
    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_D', align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_M', align: 'center', cellattr: addCellAttr},  
    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr}
    		];
		} else if(orgLevel == 2) {
			colNamesData = ['区县名称', '计费收入目标值(万元)', '当日收入(万元)', '当月累计收入(万元)', '进度', '全市排名', '全省排名'];
			colModelData = [ 
    			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_D', align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_M', align: 'center', cellattr: addCellAttr},  
    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
    		];
		} else if(orgLevel == 3) {
			colNamesData=[ '网格编码', '网格名称', '计费收入目标值(万元)', '当日收入(万元)', '当月累计收入(万元)', '进度', '全县排名', '全市排名'];
			colModelData = [ 
    			{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr},
    			{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_D', align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_M', align: 'center', cellattr: addCellAttr},  
    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
    		];
		} else if(orgLevel == 4) {
			colNamesData = ['渠道名称','计费收入目标值(万元)','当日收入(万元)','当月累计收入(万元)','进度','网格内排名','全县排名'];
			colModelData = [ 
    			{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_D', align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_M', align: 'center', cellattr: addCellAttr},  
    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
    		];
		}
	}
	// 头部客户宽带新增
	else if("TBKHKDXZ" == twoType) {
		url = $.cxt + "/rptcomposite/getheadcustomeraddinfo";
		if("day" == conditionTwo) {
			if(orgLevel == 1 ) {
				colNamesData = ['地市名称', '当日头部客户<br/>宽带新增目标值', '当日头部客户<br/>宽带新增完成值', '超欠产', '完成率', '全省排名','上月期末头部客户数', 
				                '当前头部客户<br/>已固移融合量', '头部客户固移融合率', '昨日期末头部客户<br/>已固移融合量', '头部客户已固移<br/>融合日净增量' ];
				colModelData = [ 
	    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'FUSION_TARGET_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_RH_RATE_D', align: 'center', cellattr: addCellAttr,formatter: rateFormat},
	    			{name: 'FUSION_SUM_LAST_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_JZ', align: 'center', cellattr: addCellAttr}
	    		];
			} else if(orgLevel == 2) {
				colNamesData = ['区县名称', '当日头部客户<br/>宽带新增目标值', '当日头部客户<br/>宽带新增完成值', '超欠产', '完成率', '全市排名','全省排名','上月期末头部客户数', 
				                '当前头部客户<br/>已固移融合量', '头部客户固移融合率', '昨日期末头部客户<br/>已固移融合量', '头部客户已固移<br/>融合日净增量' ];
				colModelData = [ 
	    			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'FUSION_TARGET_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_RH_RATE', align: 'center', cellattr: addCellAttr,formatter: rateFormat},
	    			{name: 'FUSION_RATE_LAST_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_JZ_JZ', align: 'center', cellattr: addCellAttr}
	    		];
			} else if(orgLevel == 3) {
				colNamesData = [ '网格编码', '网格名称', '当日头部客户<br/>宽带新增目标值', '当日头部客户<br/>宽带新增完成值', '超欠产', '完成率','全县排名', '全市排名','上月期末头部客户数', 
					                '当前头部客户<br/>已固移融合量', '头部客户固移融合率', '昨日期末头部客户<br/>已固移融合量', '头部客户已固移<br/>融合日净增量' ];
				colModelData = [ 
	    			{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr},
	    			{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'FUSION_TARGET_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_RH_RATE', align: 'center', cellattr: addCellAttr,formatter: rateFormat},
	    			{name: 'FUSION_RATE_LAST_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_JZ_JZ', align: 'center', cellattr: addCellAttr}
	    		];
			} else if(orgLevel == 4) {
				colNamesData = [ '渠道名称', '当日头部客户<br/>宽带新增目标值', '当日头部客户<br/>宽带新增完成值', '超欠产', '完成率','网格内排名','全县排名','上月期末头部客户数', 
					                '当前头部客户<br/>已固移融合量', '头部客户固移融合率', '当日头部客户<br/>已固移融合量', '头部客户已固移<br/>融合日净增量' ];
				colModelData = [ 
	    			{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'FUSION_TARGET_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_RH_RATE_D', align: 'center', cellattr: addCellAttr,formatter: rateFormat},
	    			{name: 'FUSION_SUM_LAST_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_JZ', align: 'center', cellattr: addCellAttr}
	    		];
			}
		} else {
			if(orgLevel == 1 ) {
				colNamesData = ['地市名称', '当月头部客户<br/>宽带新增目标值', '当月头部客户<br/>宽带新增完成值', '较时间进度超欠产','较时间进度完成率',  '全省排名','上月期末头部客户数', 
				                '当前头部客户<br/>已固移融合量', '头部客户固移融合率', '上月期末头部客户<br/>已固移融合量', '头部客户已固移<br/>融合月净增量' ];
				colModelData = [ 
	    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'FUSION_TARGET_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_TIME_OWE', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_RH_RATE', align: 'center', cellattr: addCellAttr,formatter: rateFormat},
	    			{name: 'FUSION_RATE_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_JZ_COUNT', align: 'center', cellattr: addCellAttr}
	    		];
			} else if(orgLevel == 2) {
				colNamesData = ['区县名称', '当月头部客户<br/>宽带新增目标值', '当月头部客户<br/>宽带新增完成值','较时间进度超欠产','较时间进度完成率', '全市排名', '全省排名','上月期末头部客户数', 
				                '当前头部客户<br/>已固移融合量', '头部客户固移融合率', '上月期末头部客户<br/>已固移融合量', '头部客户已固移<br/>融合月净增量' ];
				colModelData = [ 
	    			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'FUSION_TARGET_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_TIME_OWE', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_RH_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'FUSION_RATE_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_JZ_COUNT', align: 'center', cellattr: addCellAttr}
	    		];
			} else if(orgLevel == 3) {
				colNamesData = [ '网格编码', '网格名称', '当月头部客户<br/>宽带新增目标值', '当月头部客户<br/>宽带新增完成值','较时间进度超欠产','较时间进度完成率', '全县排名', '全市排名','上月期末头部客户数', 
					                '当前头部客户<br/>已固移融合量', '头部客户固移融合率', '上月期末头部客户<br/>已固移融合量', '头部客户已固移<br/>融合月净增量' ];
				colModelData = [ 
	    			{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr},
	    			{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'FUSION_TARGET_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_TIME_OWE', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_RH_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'FUSION_RATE_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_JZ_COUNT', align: 'center', cellattr: addCellAttr}
	    		];
			} else if(orgLevel == 4) {
				colNamesData = [ '渠道名称', '当月头部客户<br/>宽带新增目标值', '当月头部客户<br/>宽带新增完成值',  '较时间进度超欠产', '较时间进度完成率','网格内排名', '全县排名','上月期末头部客户数', 
					                '当前头部客户<br/>已固移融合量', '头部客户固移融合率', '上月期末头部客户<br/>已固移融合量', '头部客户已固移<br/>融合月净增量' ];
				colModelData = [ 
	    			{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'FUSION_TARGET_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_TIME_OWE', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_RH_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'FUSION_RATE_LAST_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'FUSION_JZ_COUNT', align: 'center', cellattr: addCellAttr}
	    		];
			}
		}
	}
	var data = {
		orgId: orgId,
		orgLevel: orgLevel,
		statisDate: statisDate,
		conditionOne: twoType,
		conditionTwo: conditionTwo,
	};
	$('#idx_table').GridUnload();
	if(null != twoType && "" != twoType && null != conditionTwo && "" != conditionTwo && null != statisDate && "" != statisDate) {
		var heightB = 0;
		if("GJDZXQKDXZ" == twoType||"90HKHGMTS" == twoType|| "TBKHKDXZ" == twoType) {
			heightB = $(window).height() - $("#idx_table").offset().top - 120;
		} else {
			heightB = $(window).height() - $("#idx_table").offset().top - 78;
		}
		$('#idx_table').jqGrid({
			url: url,
			datatype: "json",
			mtype: "POST",
			height: heightB,
			width: 'auto',
			autowidth: true,
			postData: {
				json: JSON.stringify(data)
	        },
			colNames: colNamesData,
			colModel: colModelData,
			viewrecords: false,
			rownumbers: false,
			shrinkToFit: false,
			autoScroll: true,
			rowNum: 15,
			rowList: [ 15, 20, 30 ],
			pager: '#idx_grid-pager',
			gridComplete: dayReportFormsetNiceScroll,
			loadComplete: function() {
				topjqGridLoadComplete();
				
			}
		});
	}
	// 将列表th和列表的td宽度做适配
	softThWidth();
}
  
function magic_number(totalOne, totalTwo, valueOne, valueTwo,totalThree,valueThree) {   
	$("#numberOne").empty();
	$("#numberTwo").empty();
	$("#numberThree").empty();
	var numOne = $("#numberOne");
	if(valueOne==undefined){
		valueOne=0;
	}
	if(valueTwo==undefined){
		valueTwo=0;
	}
	$("#tjInfoOne").text(totalOne + ":");
	$("#tjInfoTwo").text(totalTwo + ":");
	numOne.animate({count: valueOne}, {
		// 持续时间
		duration: 1000, 
		step: function() {
			numOne.text(Math.round(this.count));
		}
	});
	numOne.animate({count: valueOne}, {
		// 持续时间 
		duration: 1, 
		step: function() {
			numOne.text(valueOne);
		}
	});
	var numTwo = $("#numberTwo");
	numTwo.animate({count: valueTwo}, {
		// 持续时间
		duration: 1000, 
		step: function() {
			numTwo.text(Math.round(this.count));
		}
	});
	numTwo.animate({count: valueTwo}, {
		// 持续时间 
		duration: 1, 
		step: function() {
			numTwo.text(valueTwo);
		}
	});
	if(valueThree!=null&&valueThree!=undefined){
		$("#tjInfoThree").text(totalThree + ":");
		var numThree = $("#numberThree");
		numThree.animate({count: valueThree}, {
			// 持续时间
			duration: 1000, 
			step: function() {
				numThree.text(Math.round(this.count));
			}
		});
		numThree.animate({count: valueThree}, {
			// 持续时间 
			duration: 1, 
			step: function() {
				numThree.text(valueThree);
			}
		});
	}
	
};

// 客户信息（日）报表
function getKhxxdBottom() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethree/getkhxxdinfodetail";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType == null || twoType == '' ? '' : twoType.split("-")[1],
		statisDate: statisDate,
		periodType: 1
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '客户类型', '客户编码', '客户姓名', '账期', '客户预留信息1', '客户预留信息2', '客户预留信息3', '客户预留信息4'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUS_TYPE', align: 'center', cellattr: addCellAttr, 
			formatter:function(celval, options, rowdata){
				if(celval == "1") 
					return '总体客户';
				else if(celval == '2')
					return '新入网客户';
				else if(celval == '3')
					return '新增通话客户';
				else if(celval == '4')
					return '净增通话客户';
				else if(celval == '5')
					return '重点客户保有数';
				else if(celval == '6')
					return '离网数';
				else if(celval == '7')
					return '集团客户';
			}
		},  
		{name: 'CUS_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUS_NAME', align: 'center', cellattr: addCellAttr},
		{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr},
		{name: 'CUS_INFO1', align: 'center', cellattr: addCellAttr},
		{name: 'CUS_INFO2', align: 'center', cellattr: addCellAttr},
		{name: 'CUS_INFO3', align: 'center', cellattr: addCellAttr},
		{name: 'CUS_INFO4', align: 'center', cellattr: addCellAttr},
	];
	$('#idx_table').GridUnload();
	if(null != statisDate && "" != statisDate) {
		var heightB = $(window).height() - $("#idx_table").offset().top - 78;
		$('#idx_table').jqGrid({
			url: url,
			datatype: "json",
			mtype: "POST",
			height: heightB,
			width: "100%",
			autowidth: true,
			postData: {
				json: JSON.stringify(data)
	        },
			colNames: colNamesData,
			colModel: colModelData,
			viewrecords: false,
			rownumbers: false,
			shrinkToFit: false,
			autoScroll: true,
			rowNum: 15,
			rowList: [ 15, 20, 30 ],
			pager: '#idx_grid-pager',
			gridComplete: dayReportFormsetNiceScroll,
			loadComplete: function() {
				topjqGridLoadComplete();
			}
		});
		// 将列表th和列表的td宽度做适配
		softThWidth();
	}
}

// 客户信息（月）报表
function getKhxxmBottom() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethree/getkhxxminfodetail";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val().substring(0, 6);
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType == null || twoType == '' ? '' : twoType.split("-")[1],
		statisDate: statisDate,
		periodType: 2
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '客户类型', '客户编码', '客户姓名', '账期', '客户预留信息1', '客户预留信息2', '客户预留信息3', '客户预留信息4'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUS_TYPE', align: 'center', cellattr: addCellAttr, 
			formatter:function(celval, options, rowdata){
				if(celval == "1") 
					return '总体客户';
				else if(celval == '2')
					return '新入网客户';
				else if(celval == '3')
					return '新增通话客户';
				else if(celval == '4')
					return '净增通话客户';
				else if(celval == '5')
					return '重点客户保有数';
				else if(celval == '6')
					return '离网数';
				else if(celval == '7')
					return '集团客户';
			}
		},  
		{name: 'CUS_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUS_NAME', align: 'center', cellattr: addCellAttr},
		{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr},
		{name: 'CUS_INFO1', align: 'center', cellattr: addCellAttr},
		{name: 'CUS_INFO2', align: 'center', cellattr: addCellAttr},
		{name: 'CUS_INFO3', align: 'center', cellattr: addCellAttr},
		{name: 'CUS_INFO4', align: 'center', cellattr: addCellAttr},
	];
	$('#idx_table').GridUnload();
	if(null != statisDate && "" != statisDate) {
		var heightB = $(window).height() - $("#idx_table").offset().top - 78;
		$('#idx_table').jqGrid({
			url: url,
			datatype: "json",
			mtype: "POST",
			height: heightB,
			width: "100%",
			autowidth: true,
			postData: {
				json: JSON.stringify(data)
	        },
			colNames: colNamesData,
			colModel: colModelData,
			viewrecords: false,
			rownumbers: false,
			shrinkToFit: false,
			autoScroll: true,
			rowNum: 15,
			rowList: [ 15, 20, 30 ],
			pager: '#idx_grid-pager',
			gridComplete: dayReportFormsetNiceScroll,
			loadComplete: function() {
				topjqGridLoadComplete();
			}
		});
		// 将列表th和列表的td宽度做适配
		softThWidth();
	}
}

// 收入信息报表
function getSrxxBottom() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethree/getsrxxinfodetail";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType == null || twoType == "" ? '' : twoType.split("-")[1]
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '收入类型', '客户编码', '客户类型', '套餐类型', '套餐描述', '收入', '预留信息1', '预留信息2', '预留信息3', '预留信息4'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'FEE_TYPE', align: 'center', cellattr: addCellAttr, 
			formatter:function(celval, options, rowdata){
				if(celval == "1") 
					return '出账收入';
				else if(celval == '2')
					return '套餐固定费';
				else if(celval == '3')
					return '超套餐收入';
				else if(celval == '4')
					return '超套餐流量收入';
				else if(celval == '5')
					return '超套餐语音收入';
				else if(celval == '6')
					return '政企收入（其中大额出账产品收入）';
			}
		},  
		{name: 'CUS_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUS_NAME', align: 'center', cellattr: addCellAttr},
		{name: 'SETMEAL_TYPE', align: 'center', cellattr: addCellAttr},
		{name: 'SETMEAL_INFO', align: 'center', cellattr: addCellAttr},
		{name: 'FEE', align: 'center', cellattr: addCellAttr},
		{name: 'FEE_INFO1', align: 'center', cellattr: addCellAttr},
		{name: 'FEE_INFO2', align: 'center', cellattr: addCellAttr},
		{name: 'FEE_INFO3', align: 'center', cellattr: addCellAttr},
		{name: 'FEE_INFO4', align: 'center', cellattr: addCellAttr},
	];
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 78;
	$('#idx_table').jqGrid({
		url: url,
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: "100%",
		autowidth: true,
		postData: {
			json: JSON.stringify(data)
        },
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 15,
		rowList: [ 15, 20, 30 ],
		pager: '#idx_grid-pager',
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
	// 将列表th和列表的td宽度做适配
	softThWidth();
}

// 业务办理报表
function getYwblBottom() {
	var colNamesData = [];
	var colModelData = [];
	var groupHeadersData = [];
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var conditionTwo = $("#conditionTwo option:selected").val();
	var statisDate = $("#statisDate").val();
	var orgLevel = null;
	var orgId = null;
	if(null != grid && "" != grid) {
		orgLevel = "4";
		orgId = grid;
	} else if(null != town && "" != town) {
		orgLevel = "3";
		orgId = town;
	} else if(null != city && "" != city) {
		orgLevel = "2";
		orgId = city;
	} else {
		orgLevel = nowOrgLevel;
		orgId = nowOrgId;
	}
	var data = {
		orgId: orgId,
		orgLevel: orgLevel,
		statisDate: statisDate,
		conditionOne: twoType,
		conditionTwo: conditionTwo,
	};
	var url = "";
	// 网格业务办理（日）
	if("WGYWBLD" == twoType || "" == twoType) {
		url = $.cxt + "/firstpagethree/gridbusinesstargetdoned";
		colNamesData = ["统计周期", "组织编码", "组织层级", "地市名称", "区县名称", "网格名称", "网格总监姓名", "网格总监电话", 
		                "权重", "日任务", "日完成", "日完成率", "超欠产", "得分", 
		                "权重", "日任务", "日完成", "日完成率", "超欠产", "得分", 
		                "权重", "日任务", "日完成", "日完成率", "超欠产", "得分", 
		                "权重", "日任务", "日完成", "日完成率", "超欠产", "得分", 
		                "权重", "日任务", "日完成", "其中手机合约", "其中泛终端合约", "日完成率", "超欠产", "得分",
		                "权重", "日任务", "日完成", "日完成率", "超欠产", "得分", 
		                "权重", "渗透率提升目标", "上月期末高价值低占小区九级地址数", "上月期末高价值低占小区已用地址数", "上月渗透率", 
		                "当前高价值低占小区九级地址数", "当前高价值低占小区已用地址数", "昨日高价值低占小区已用地址数", "日任务", "日完成", "日完成率", "超欠产", "得分", 
		                "权重", "当月期末拟达到90后规模数", "上月期末90后到达规模数", "当前90后到达规模数", "昨日90后到达规模数", "日任务", "日完成", "日完成率", "超欠产", "得分", 
		                "权重", "本月期末拟达到头部客户固移融合率", "上月期末头部客户数", "上月期末头部客户融合量", "当前头部客户融合量", "昨日头部客户融合量", "日任务", "日完成", "日完成率", "超欠产", "得分", 
		                "权重", "日任务",  "日完成", "其中199-399小微宽带", "其中企业上云", "日完成率", "超欠产", "得分", 
		                "当日得分", "全省排名", "全市排名", "全县排名","地市编码","区县编码","网格编码","网格总监编码"];
		colModelData = [ 
			{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
			{name: 'ORG_ID', align: 'center', hidden: true, cellattr: addCellAttr}, 
			{name: 'ORG_LEVEL', align: 'center', hidden: true, cellattr: addCellAttr}, 
			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr},
			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr},
			{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr},
			{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr},
			{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr},
			{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr},
			{name: 'CUSTOMER_FEE_TARGET_D', align: 'center', cellattr: addCellAttr},
			{name: 'CUSTOMER_FEE_D', align: 'center', cellattr: addCellAttr},
			{name: 'CUSTOMER_FEE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'CUSTOMER_FEE_OWE', align: 'center', cellattr: addCellAttr},
			{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr},
			{name: 'CUSTOMER_ADD_WEIGHT', align: 'center', cellattr: addCellAttr},
			{name: 'CUSTOMER_ADD_TARGET_D', align: 'center', cellattr: addCellAttr},
			{name: 'CUSTOMER_ADD_D', align: 'center', cellattr: addCellAttr},
			{name: 'CUSTOMER_ADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'CUSTOMER_ADD_OWE', align: 'center', cellattr: addCellAttr},
			{name: 'CUSTOMER_ADD_SCORE', align: 'center', cellattr: addCellAttr},
			{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr},
			{name: 'TELE_TARGET_D', align: 'center', cellattr: addCellAttr},
			{name: 'TELE_D', align: 'center', cellattr: addCellAttr},
			{name: 'TELE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'TELE_OWE', align: 'center', cellattr: addCellAttr},
			{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr},
			{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr},
			{name: 'BROADADD_TARGET_D', align: 'center', cellattr: addCellAttr},
			{name: 'BROADADD_D', align: 'center', cellattr: addCellAttr},
			{name: 'BROADADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'BROADADD_OWE', align: 'center', cellattr: addCellAttr},
			{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr},
			{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr},
			{name: 'TERMINAL_TARGET_D', align: 'center', cellattr: addCellAttr},
			{name: 'TERMINAL_COMPLETE_D', align: 'center', cellattr: addCellAttr},
			{name: 'MOBILE_CONTRACT_D', align: 'center', cellattr: addCellAttr},
			{name: 'TERMINAL_CONTRACT_D', align: 'center', cellattr: addCellAttr},
			{name: 'TERMINAL_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'TERMINAL_OWE', align: 'center', cellattr: addCellAttr},
			{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr},
			{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr},
			{name: 'HOMENET_ADD_TARGET_D', align: 'center', cellattr: addCellAttr},
			{name: 'HOMENET_ADD_D', align: 'center', cellattr: addCellAttr},
			{name: 'HOMENET_ADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'HOMENET_ADD_OWE', align: 'center', cellattr: addCellAttr},
			{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr},
			{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr},
			{name: 'CELL_TARGET', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'CELL_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
			{name: 'CELL_NUM_LAST_M', align: 'center', cellattr: addCellAttr},
			{name: 'PERMEABILITY_LAST_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr},
			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr},
			{name: 'CELL_NUM_LAST_D', align: 'center', cellattr: addCellAttr},
			{name: 'CELL_TARGET_D', align: 'center', cellattr: addCellAttr},
			{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'CELL_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'CELL_OWE', align: 'center', cellattr: addCellAttr},
			{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr},
			{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr},
			{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr},
			{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
			{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr},
			{name: 'DEPADD_SUM_LAST_D', align: 'center', cellattr: addCellAttr},
			{name: 'DEPADD_TARGET_D', align: 'center', cellattr: addCellAttr},
			{name: 'DEPADD_D', align: 'center', cellattr: addCellAttr},
			{name: 'DEPADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'DEPADD_OWE', align: 'center', cellattr: addCellAttr},
			{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr},
			{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr},
			{name: 'FUSION_SUM_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr},
			{name: 'FUSION_RATE_LAST_M', align: 'center', cellattr: addCellAttr},
			{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr},
			{name: 'FUSION_SUM_LAST_D', align: 'center', cellattr: addCellAttr},
			{name: 'FUSION_TARGET_D', align: 'center', cellattr: addCellAttr},
			{name: 'FUSION_D', align: 'center', cellattr: addCellAttr},
			{name: 'FUSION_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr},
			{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr},
			{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr},
			{name: 'ENCLOSURE_TARGET_D', align: 'center', cellattr: addCellAttr},
			{name: 'ENCLOSURE_D', align: 'center', cellattr: addCellAttr},
			{name: 'MIC_BRO_D', align: 'center', cellattr: addCellAttr},
			{name: 'ENTERPRISE_D', align: 'center', cellattr: addCellAttr},
			{name: 'ENCLOSURE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			{name: 'ENCLOSURE_OWE', align: 'center', cellattr: addCellAttr},
			{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr},
			{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr},
			{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr},
			{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr},
			{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr},
			{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr},
			{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr},
			{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr},
			{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr}
		];
		groupHeadersData = [
    		{startColumnName: 'CUSTOMER_FEE_WEIGHT', numberOfColumns: 6, titleText: '个人客户计费收入（单位：万元）'},
    		{startColumnName: 'CUSTOMER_ADD_WEIGHT', numberOfColumns: 6, titleText: '新增客户计费收入（单位：万元）'},
    		{startColumnName: 'TELE_WEIGHT', numberOfColumns: 6, titleText: '放号'},
    		{startColumnName: 'BROADADD_WEIGHT', numberOfColumns: 6, titleText: '家庭宽带'},
    		{startColumnName: 'TERMINAL_WEIGHT', numberOfColumns: 8, titleText: '终端合约'},
    		{startColumnName: 'HOMENET_ADD_WEIGHT', numberOfColumns: 6, titleText: '家庭网新增'},
    		{startColumnName: 'CELL_WEIGHT', numberOfColumns: 13, titleText: '高价值低占小区渗透率提升'},
    		{startColumnName: 'DEPADD_WEIGHT', numberOfColumns: 10, titleText: '新增价值洼地'},
    		{startColumnName: 'FUSION_WEIGHT', numberOfColumns: 11, titleText: '头部客户固移融合率'},
    		{startColumnName: 'ENCLOSURE_WEIGHT', numberOfColumns: 8, titleText: '中小微企业圈地行动'}
    	];
	} 
	// 网格业务办理（周）
	else if("WGYWBLW" == twoType) {
		url = $.cxt + "/firstpagethree/gridbusinesstargetdonew";
		colNamesData = ["统计周期", "组织编码", "组织层级",  "地市名称", "区县名称", "网格名称",  "网格总监姓名", "网格总监电话", 
						"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", 
						"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", 
						"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", 
						"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", 
						"权重", "周任务", "周完成", "其中手机合约", "其中泛终端合约", "周完成率",  "超欠产", "得分", 
						"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", 
						"权重", "渗透率提升目标", "上月期末高价值低占小区九级地址数", "上月期末高价值低占小区已用地址数", "上月渗透率", "当前高价值低占小区九级地址数", 
						"当前高价值低占小区已用地址数", "上周期末高价值低占小区已用地址数", "周任务", "周完成", "周完成率", "超欠产", "得分", 
						"权重", "当月期末拟达到90后规模数", "上月期末90后到达规模数", "当前90后到达规模数", "上周期末90后到达规模数", "周任务", "周完成", "周完成率", "超欠产", "得分", 
						"权重", "本月期末拟达到头部客户固移融合率", "上月期末头部客户数", "上月期末头部客户融合量", "当前头部客户融合量", 
						"上周期末头部客户融合量",  "周任务", "周完成", "周完成率", "超欠产", "得分", 
						"权重", "周任务", "周完成", "其中199-399小微宽带", "其中企业上云", "周完成率", "超欠产", "得分", 
						"当周得分", "全省排名", "全市排名", "全县排名","地市编码","区县编码","网格编码","网格总监编码"];
		colModelData = [ 
			{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
			{name: 'ORG_ID', align: 'center', hidden: true, cellattr: addCellAttr}, 
			{name: 'ORG_LEVEL', align: 'center', hidden: true, cellattr: addCellAttr}, 		
			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 			
			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 			
			{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_FEE_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_FEE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_FEE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'CUSTOMER_FEE_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_ADD_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_ADD', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_ADD_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'CUSTOMER_ADD_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'TELE_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'TELE', align: 'center', cellattr: addCellAttr}, 
			{name: 'TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'TELE_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'BROADADD_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'BROADADD', align: 'center', cellattr: addCellAttr}, 
			{name: 'BROADADD_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'BROADADD_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_COMPLETE', align: 'center', cellattr: addCellAttr}, 
			{name: 'MOBILE_CONTRACT', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_CONTRACT', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'TERMINAL_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'HOMENET_ADD_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'HOMENET_ADD', align: 'center', cellattr: addCellAttr}, 
			{name: 'HOMENET_ADD_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'HOMENET_ADD_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_TARGET', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'CELL_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_NUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'PERMEABILITY_LAST_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_NUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_TARGET_W', align: 'center', cellattr: addCellAttr}, 
			{name: 'PERMEABILITY_W', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'CELL_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_SUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_TARGET_W', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_W', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'DEPADD_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_SUM_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_RATE_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_SUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_TARGET_W', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_W', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'ENCLOSURE_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'ENCLOSURE', align: 'center', cellattr: addCellAttr}, 
			{name: 'MIC_BRO', align: 'center', cellattr: addCellAttr}, 
			{name: 'ENTERPRISE', align: 'center', cellattr: addCellAttr}, 
			{name: 'ENCLOSURE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'ENCLOSURE_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
			{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
			{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr},
			{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr},
			{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr},
			{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr},
			{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr}
		];
		groupHeadersData = [
    		{startColumnName: 'CUSTOMER_FEE_WEIGHT', numberOfColumns: 6, titleText: '个人客户计费收入（单位：万元）'},
    		{startColumnName: 'CUSTOMER_ADD_WEIGHT', numberOfColumns: 6, titleText: '新增客户计费收入（单位：万元）'},
    		{startColumnName: 'TELE_WEIGHT', numberOfColumns: 6, titleText: '放号'},
    		{startColumnName: 'BROADADD_WEIGHT', numberOfColumns: 6, titleText: '家庭宽带'},
    		{startColumnName: 'TERMINAL_WEIGHT', numberOfColumns: 8, titleText: '终端合约'},
    		{startColumnName: 'HOMENET_ADD_WEIGHT', numberOfColumns: 6, titleText: '家庭网新增'},
    		{startColumnName: 'CELL_WEIGHT', numberOfColumns: 13, titleText: '高价值低占小区渗透率提升'},
    		{startColumnName: 'DEPADD_WEIGHT', numberOfColumns: 10, titleText: '新增价值洼地'},
    		{startColumnName: 'FUSION_WEIGHT', numberOfColumns: 11, titleText: '头部客户固移融合率'},
    		{startColumnName: 'ENCLOSURE_WEIGHT', numberOfColumns: 8, titleText: '中小微企业圈地行动'}
    	];
	} 
	// 网格业务办理（月）
	else if("WGYWBLM" == twoType) {
		url = $.cxt + "/firstpagethree/gridbusinesstargetdonem";
		colNamesData = ["统计周期", "组织编码", "组织层级", "地市名称", "区县名称", "网格名称","网格总监姓名", "网格总监电话",
						"权重", "月任务", "累计完成", "较时间进度完成率", "较时间进度超欠产", "得分",
						"权重", "月任务", "累计完成", "较时间进度完成率", "较时间进度超欠产", "得分",
						"权重", "月任务", "累计完成", "较时间进度完成率", "较时间进度超欠产", "得分",
						"权重", "月任务", "累计完成", "较时间进度完成率", "较时间进度超欠产", "得分",
						"权重", "月任务", "累计完成", "其中手机合约", "其中泛终端合约", "较时间进度完成率", "较时间进度超欠产", "得分",
						"权重", "月任务", "累计完成", "较时间进度完成率", "较时间进度超欠产", "得分",
						"权重", "渗透率提升目标", "上月期末高价值低占小区九级地址数", "上月期末高价值低占小区已用地址数", "上月渗透率", "当前高价值低占小区九级地址数",
						"当前高价值低占小区已用地址数", "当前渗透率", "昨日高价值低占小区已用地址数", "月任务", "累计完成", "较时间进度完成率", "较时间进度超欠产", "渗透率提升值", "得分",
						"权重", "当月期末拟达到90后规模数", "上月期末90后到达规模数", "当前90后到达规模数", "月任务", "累计完成", "较时间进度完成率", "较时间进度超欠产", "得分",
						"权重", "本月期末拟达到头部客户固移融合率", "上月期末头部客户数", "上月期末头部客户融合量", "当前头部客户融合量", "月任务", "累计完成", "较时间进度完成率", "较时间进度超欠产", "得分",
						"权重", "月任务", "累计完成", "其中199-399小微宽带", "其中企业上云", "较时间进度完成率", "较时间进度超欠产", "得分",
						"当月得分", "全省排名", "全市排名", "全县排名","地市编码","区县编码","网格编码","网格总监编码"];
		colModelData = [ 
			{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
			{name: 'ORG_ID', align: 'center', hidden: true, cellattr: addCellAttr}, 
			{name: 'ORG_LEVEL', align: 'center', hidden: true, cellattr: addCellAttr}, 
			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_FEE_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_FEE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMERFEE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'CUSTOMERFEE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_ADD_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_ADD', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMERADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'CUSTOMERADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSTOMER_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'TELE_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'TELE', align: 'center', cellattr: addCellAttr}, 
			{name: 'TELE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'TELE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'BROADADD_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'BROADADD', align: 'center', cellattr: addCellAttr}, 
			{name: 'BROADADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'BROADADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_COMPLETE', align: 'center', cellattr: addCellAttr}, 
			{name: 'MOBILE_CONTRACT', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_CONTRACT', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_TIME_RATE', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'HOMENET_ADD_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'HOMENET_ADD', align: 'center', cellattr: addCellAttr}, 
			{name: 'HOMENETADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'HOMENETADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_TARGET', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'CELL_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_NUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'PERMEABILITY_LAST_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
			{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'CELL_NUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'CELL_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_RATE_UP', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_TARGET_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'DEPADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_SUM_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_RATE_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_TARGET_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'FUSION_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
			{name: 'ENCLOSURE_TARGET', align: 'center', cellattr: addCellAttr}, 
			{name: 'ENCLOSURE', align: 'center', cellattr: addCellAttr}, 
			{name: 'MIC_BRO', align: 'center', cellattr: addCellAttr}, 
			{name: 'ENTERPRISE', align: 'center', cellattr: addCellAttr}, 
			{name: 'ENCLOSURE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
			{name: 'ENCLOSURE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
			{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
			{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
			{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
			{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr},
			{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr},
			{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr},
			{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr},
			{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr}
		];
		groupHeadersData = [
    		{startColumnName: 'CUSTOMER_FEE_WEIGHT', numberOfColumns: 6, titleText: '个人客户计费收入（单位：万元）'},
    		{startColumnName: 'CUSTOMER_ADD_WEIGHT', numberOfColumns: 6, titleText: '新增客户计费收入（单位：万元）'},
    		{startColumnName: 'TELE_WEIGHT', numberOfColumns: 6, titleText: '放号'},
    		{startColumnName: 'BROADADD_WEIGHT', numberOfColumns: 6, titleText: '家庭宽带'},
    		{startColumnName: 'TERMINAL_WEIGHT', numberOfColumns: 8, titleText: '终端合约'},
    		{startColumnName: 'HOMENET_ADD_WEIGHT', numberOfColumns: 6, titleText: '家庭网新增'},
    		{startColumnName: 'CELL_WEIGHT', numberOfColumns: 15, titleText: '高价值低占小区渗透率提升'},
    		{startColumnName: 'DEPADD_WEIGHT', numberOfColumns: 9, titleText: '新增价值洼地'},
    		{startColumnName: 'FUSION_WEIGHT', numberOfColumns: 10, titleText: '头部客户固移融合率'},
    		{startColumnName: 'ENCLOSURE_WEIGHT', numberOfColumns: 8, titleText: '中小微企业圈地行动'}
    	];
	} 
	// 网格业务办理（日）
	else if("WGYWBLDAY" == twoType) {
		//"组织编码", "组织层级","区县名称", "网格名称", "网格总监姓名", "网格总监电话","地市编码", "区县编码", "网格编码", "网格总监编码"
		url = $.cxt + "/firstpagethree/gridbusinesstargetdoneday";
		if(orgLevel=="1"){
			colNamesData = ["统计周期", "地市名称", 
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "其中4G终端合约", "其中泛终端合约", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "昨日高价低占小区已用地址数", "已用地址数日净增",
							"权重", "90后客户规模日净增任务", "当日90后客户规模净增", "日完成率", "超欠产", "得分", "当月90后客户规模目标值", "上月期末90后客户规模", "当前90后客户规模", //"昨日90后客户规模",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "昨日头部客户固移融合量", "头部客户固移融合量日净增",
							"权重", "日任务", "日完成", "其中199-399小微宽带", "其中企业上云", "日完成率", "超欠产", "得分",
							"当日得分", "全省排名"];
			colModelData = [ 
				{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'ORG_ID', align: 'center', cellattr: addCellAttr}, 
//				{name: 'ORG_LEVEL', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CUSTOMER_FEE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TELE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'BROADADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'MOBILE_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TERMINAL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'HOMENET_ADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_NUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM_JZ_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'DEPADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
				//{name: 'DEPADD_SUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RH_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_SUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_JZ', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'MIC_BRO_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENTERPRISE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ENCLOSURE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr}
//				{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr}
			];
		}else if(orgLevel=="2"){
			colNamesData = ["统计周期", "区县名称", 
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "其中4G终端合约", "其中泛终端合约", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "昨日高价低占小区已用地址数", "已用地址数日净增",
							"权重", "90后客户规模日净增任务", "当日90后客户规模净增", "日完成率", "超欠产", "得分", "当月90后客户规模目标值", "上月期末90后客户规模", "当前90后客户规模", //"昨日90后客户规模",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "昨日头部客户固移融合量", "头部客户固移融合量日净增",
							"权重", "日任务", "日完成", "其中199-399小微宽带", "其中企业上云", "日完成率", "超欠产", "得分",
							"当日得分", "全省排名","全市排名"];
			colModelData = [ 
				{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'ORG_ID', align: 'center', cellattr: addCellAttr}, 
//				{name: 'ORG_LEVEL', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CUSTOMER_FEE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TELE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'BROADADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'MOBILE_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TERMINAL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'HOMENET_ADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_NUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM_JZ_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'DEPADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
				//{name: 'DEPADD_SUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RH_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_SUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_JZ', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'MIC_BRO_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENTERPRISE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ENCLOSURE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr}
//				{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr}
			];
		}else if(orgLevel=="3"){
			colNamesData = ["统计周期", "网格名称", 
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "其中4G终端合约", "其中泛终端合约", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "昨日高价低占小区已用地址数", "已用地址数日净增",
							"权重", "90后客户规模日净增任务", "当日90后客户规模净增", "日完成率", "超欠产", "得分", "当月90后客户规模目标值", "上月期末90后客户规模", "当前90后客户规模", //"昨日90后客户规模",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "昨日头部客户固移融合量", "头部客户固移融合量日净增",
							"权重", "日任务", "日完成", "其中199-399小微宽带", "其中企业上云", "日完成率", "超欠产", "得分",
							"当日得分", "全省排名","全市排名","全县排名"];
			colModelData = [ 
				{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'ORG_ID', align: 'center', cellattr: addCellAttr}, 
//				{name: 'ORG_LEVEL', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CUSTOMER_FEE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TELE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'BROADADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'MOBILE_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TERMINAL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'HOMENET_ADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_NUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM_JZ_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'DEPADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
				//{name: 'DEPADD_SUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RH_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_SUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_JZ', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'MIC_BRO_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENTERPRISE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ENCLOSURE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr}
//				{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr}
			];
		}else{
			colNamesData = ["统计周期", "地市名称","区县名称","网格名称", 
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "其中4G终端合约", "其中泛终端合约", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "昨日高价低占小区已用地址数", "已用地址数日净增",
							"权重", "90后客户规模日净增任务", "当日90后客户规模净增", "日完成率", "超欠产", "得分", "当月90后客户规模目标值", "上月期末90后客户规模", "当前90后客户规模", //"昨日90后客户规模",
							"权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "昨日头部客户固移融合量", "头部客户固移融合量日净增",
							"权重", "日任务", "日完成", "其中199-399小微宽带", "其中企业上云", "日完成率", "超欠产", "得分",
							"当日得分", "全省排名","全市排名","全县排名"];
			colModelData = [ 
				{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'ORG_ID', align: 'center', cellattr: addCellAttr}, 
//				{name: 'ORG_LEVEL', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CUSTOMER_FEE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TELE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'BROADADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'MOBILE_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TERMINAL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'HOMENET_ADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_NUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM_JZ_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'DEPADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
				//{name: 'DEPADD_SUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RH_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_SUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_JZ', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'MIC_BRO_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENTERPRISE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ENCLOSURE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr}
//				{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr}
			];
		}
		
		groupHeadersData = [
    		{startColumnName: 'CUSTOMER_FEE_WEIGHT', numberOfColumns: 6, titleText: '个人客户计费收入（单位：万元）'},
    		{startColumnName: 'TELE_WEIGHT', numberOfColumns: 6, titleText: '放号'},
    		{startColumnName: 'BROADADD_WEIGHT', numberOfColumns: 6, titleText: '家庭宽带'},
    		{startColumnName: 'TERMINAL_WEIGHT', numberOfColumns: 8, titleText: '终端合约'},
    		{startColumnName: 'HOMENET_ADD_WEIGHT', numberOfColumns: 6, titleText: '家庭网新增'},
    		{startColumnName: 'CELL_WEIGHT', numberOfColumns: 11, titleText: '高价低占小区宽带新增'},
    		{startColumnName: 'DEPADD_WEIGHT', numberOfColumns: 9, titleText: '90后客户规模'},
    		{startColumnName: 'FUSION_WEIGHT', numberOfColumns: 11, titleText: '头部客户宽带新增'},
    		{startColumnName: 'ENCLOSURE_WEIGHT', numberOfColumns: 8, titleText: '商客拓展'}
    	];
	} 
	// 网格业务办理（周）
	else if("WGYWBLWEEK" == twoType) {
		url = $.cxt + "/firstpagethree/gridbusinesstargetdoneweek";
		if(orgLevel=="1"){
			colNamesData = ["统计周期","地市名称", 
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "其中4G终端合约", "其中泛终端合约", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "上周高价低占小区已用地址数", "已用地址数周净增",
							"权重", "90后客户规模周净增任务", "当周90后客户规模净增", "周完成率", "超欠产", "得分", "4月90后客户规模目标值", "3月期末90后客户规模", "当前90后客户规模", //"上周90后客户规模",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "上周头部客户固移融合量", "头部客户固移融合量周净增",
							"权重", "周任务", "周完成", "其中199-399小微宽带", "其中企业上云", "周完成率", "超欠产", "得分",
							"当周得分", "全省排名"];
			colModelData = [ 
				{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'ORG_ID', align: 'center', cellattr: addCellAttr}, 
//				{name: 'ORG_LEVEL', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CUSTOMER_FEE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TELE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'BROADADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_COMPLETE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MOBILE_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TERMINAL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'HOMENET_ADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_NUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM_JZ_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'DEPADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
				//{name: 'DEPADD_SUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RH_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_SUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_JZ', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MIC_BRO', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENTERPRISE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ENCLOSURE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr},
//				{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr} 
			];
		}else if(orgLevel=="2"){
			colNamesData = ["统计周期","区县名称", 
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "其中4G终端合约", "其中泛终端合约", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "上周高价低占小区已用地址数", "已用地址数周净增",
							"权重", "90后客户规模周净增任务", "当周90后客户规模净增", "周完成率", "超欠产", "得分", "4月90后客户规模目标值", "3月期末90后客户规模", "当前90后客户规模", //"上周90后客户规模",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "上周头部客户固移融合量", "头部客户固移融合量周净增",
							"权重", "周任务", "周完成", "其中199-399小微宽带", "其中企业上云", "周完成率", "超欠产", "得分",
							"当周得分", "全省排名","全市排名"];
			colModelData = [ 
				{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'ORG_ID', align: 'center', cellattr: addCellAttr}, 
//				{name: 'ORG_LEVEL', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CUSTOMER_FEE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TELE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'BROADADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_COMPLETE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MOBILE_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TERMINAL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'HOMENET_ADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_NUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM_JZ_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'DEPADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
				//{name: 'DEPADD_SUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RH_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_SUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_JZ', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MIC_BRO', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENTERPRISE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ENCLOSURE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr},
//				{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr} 
			];
		}else if(orgLevel=="3"){
			colNamesData = ["统计周期","网格名称", 
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "其中4G终端合约", "其中泛终端合约", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "上周高价低占小区已用地址数", "已用地址数周净增",
							"权重", "90后客户规模周净增任务", "当周90后客户规模净增", "周完成率", "超欠产", "得分", "4月90后客户规模目标值", "3月期末90后客户规模", "当前90后客户规模", //"上周90后客户规模",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "上周头部客户固移融合量", "头部客户固移融合量周净增",
							"权重", "周任务", "周完成", "其中199-399小微宽带", "其中企业上云", "周完成率", "超欠产", "得分",
							"当周得分", "全省排名","全市排名","全县排名"];
			colModelData = [ 
				{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr},  
				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CUSTOMER_FEE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TELE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'BROADADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_COMPLETE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MOBILE_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TERMINAL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'HOMENET_ADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_NUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM_JZ_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'DEPADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
				//{name: 'DEPADD_SUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RH_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_SUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_JZ', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MIC_BRO', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENTERPRISE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ENCLOSURE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr}, 
			];
		}else{
			colNamesData = ["统计周期","地市名称","区县名称","网格名称", 
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "其中4G终端合约", "其中泛终端合约", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "上周高价低占小区已用地址数", "已用地址数周净增",
							"权重", "90后客户规模周净增任务", "当周90后客户规模净增", "周完成率", "超欠产", "得分", "4月90后客户规模目标值", "3月期末90后客户规模", "当前90后客户规模", //"上周90后客户规模",
							"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "上周头部客户固移融合量", "头部客户固移融合量周净增",
							"权重", "周任务", "周完成", "其中199-399小微宽带", "其中企业上云", "周完成率", "超欠产", "得分",
							"当周得分", "全省排名","全市排名","全县排名"];
			colModelData = [ 
				{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr},  
				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CUSTOMER_FEE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TELE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'BROADADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_COMPLETE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MOBILE_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TERMINAL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'HOMENET_ADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_NUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM_JZ_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'DEPADD_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
				//{name: 'DEPADD_SUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RH_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_SUM_LAST_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_JZ', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MIC_BRO', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENTERPRISE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ENCLOSURE_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr}, 
			];
		}
		
		groupHeadersData = [
    		{startColumnName: 'CUSTOMER_FEE_WEIGHT', numberOfColumns: 6, titleText: '个人客户计费收入（单位：万元）'},
    		{startColumnName: 'TELE_WEIGHT', numberOfColumns: 6, titleText: '放号'},
    		{startColumnName: 'BROADADD_WEIGHT', numberOfColumns: 6, titleText: '家庭宽带'},
    		{startColumnName: 'TERMINAL_WEIGHT', numberOfColumns: 8, titleText: '终端合约'},
    		{startColumnName: 'HOMENET_ADD_WEIGHT', numberOfColumns: 6, titleText: '家庭网新增'},
    		{startColumnName: 'CELL_WEIGHT', numberOfColumns: 11, titleText: '高价低占小区宽带新增'},
    		{startColumnName: 'DEPADD_WEIGHT', numberOfColumns: 9, titleText: '90后客户规模'},
    		{startColumnName: 'FUSION_WEIGHT', numberOfColumns: 11, titleText: '头部客户宽带新增'},
    		{startColumnName: 'ENCLOSURE_WEIGHT', numberOfColumns: 8, titleText: '商客拓展'}
    	];
	} 
	// 网格业务办理（月）
	else if("WGYWBLMONTH" == twoType) {
		url = $.cxt + "/firstpagethree/gridbusinesstargetdonemonth";
		if(orgLevel=="1"){
			colNamesData = ["统计周期", "地市名称",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "其中4G终端合约", "其中泛终端合约任务", "其中泛终端合约", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "上月高价低占小区已用地址数", "已用地址数月净增",
							"权重", "90后客户规模月净增任务", "当月90后客户规模净增", "较时间进度完成率", "较时间进度超欠产", "得分", "当月90后客户规模目标值", "上月期末90后客户规模", "当前90后客户规模", //"当月90后客户规模净增",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "上月头部客户固移融合量", "头部客户固移融合量月净增",
							"权重", "月任务", "月完成", "其中199-399小微宽带", "其中企业上云", "较时间进度完成率", "较时间进度超欠产", "得分",
							"当月得分", "全省排名"];
			colModelData = [ 
				{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr},
//				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMERFEE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CUSTOMERFEE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TELE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'BROADADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_COMPLETE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MOBILE_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TERMINAL_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENETADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'HOMENETADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_NUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'DEPADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
				//{name: 'DEPADD_SUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RH_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_RATE_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_JZ_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MIC_BRO', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENTERPRISE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ENCLOSURE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr}
//				{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr},  
//				{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr}
			];
		}else if(orgLevel=="2"){
			colNamesData = ["统计周期", "区县名称",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "其中4G终端合约", "其中泛终端合约任务", "其中泛终端合约", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "上月高价低占小区已用地址数", "已用地址数月净增",
							"权重", "90后客户规模月净增任务", "当月90后客户规模净增", "较时间进度完成率", "较时间进度超欠产", "得分", "当月90后客户规模目标值", "上月期末90后客户规模", "当前90后客户规模", //"当月90后客户规模净增",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "上月头部客户固移融合量", "头部客户固移融合量月净增",
							"权重", "月任务", "月完成", "其中199-399小微宽带", "其中企业上云", "较时间进度完成率", "较时间进度超欠产", "得分",
							"当月得分", "全省排名", "全市排名"];
			colModelData = [ 
				{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr},
//				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMERFEE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CUSTOMERFEE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TELE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'BROADADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_COMPLETE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MOBILE_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TERMINAL_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENETADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'HOMENETADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_NUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'DEPADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
				//{name: 'DEPADD_SUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RH_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_RATE_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_JZ_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MIC_BRO', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENTERPRISE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ENCLOSURE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr}
//				{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr},  
//				{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr}
			];
		}else if(orgLevel=="3"){
			colNamesData = ["统计周期", "网格名称",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "其中4G终端合约", "其中泛终端合约任务", "其中泛终端合约", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "上月高价低占小区已用地址数", "已用地址数月净增",
							"权重", "90后客户规模月净增任务", "当月90后客户规模净增", "较时间进度完成率", "较时间进度超欠产", "得分", "当月90后客户规模目标值", "上月期末90后客户规模", "当前90后客户规模", //"当月90后客户规模净增",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "上月头部客户固移融合量", "头部客户固移融合量月净增",
							"权重", "月任务", "月完成", "其中199-399小微宽带", "其中企业上云", "较时间进度完成率", "较时间进度超欠产", "得分",
							"当月得分", "全省排名", "全市排名","全县排名"];
			colModelData = [ 
				{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr},
				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMERFEE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CUSTOMERFEE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TELE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'BROADADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_COMPLETE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MOBILE_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TERMINAL_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENETADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'HOMENETADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_NUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'DEPADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
				//{name: 'DEPADD_SUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RH_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_RATE_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_JZ_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MIC_BRO', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENTERPRISE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ENCLOSURE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr}
//				{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr},  
//				{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr}
			];
		}else{
			colNamesData = ["统计周期","地市名称","区县名称", "网格名称",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "其中4G终端合约", "其中泛终端合约任务", "其中泛终端合约", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "上月高价低占小区已用地址数", "已用地址数月净增",
							"权重", "90后客户规模月净增任务", "当月90后客户规模净增", "较时间进度完成率", "较时间进度超欠产", "得分", "当月90后客户规模目标值", "上月期末90后客户规模", "当前90后客户规模", //"当月90后客户规模净增",
							"权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "上月头部客户固移融合量", "头部客户固移融合量月净增",
							"权重", "月任务", "月完成", "其中199-399小微宽带", "其中企业上云", "较时间进度完成率", "较时间进度超欠产", "得分",
							"当月得分", "全省排名", "全市排名","全县排名"];
			colModelData = [ 
				{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr},
				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMERFEE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CUSTOMERFEE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUSTOMER_FEE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TELE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'BROADADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'BROADADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_COMPLETE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MOBILE_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_CONTRACT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'TERMINAL_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'TERMINAL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENETADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'HOMENETADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'HOMENET_ADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr}, 
				{name: 'PERMEABILITY_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'CELL_NUM_LAST_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CELL_NUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'DEPADD_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'DEPADD_SUM_D', align: 'center', cellattr: addCellAttr}, 
				//{name: 'DEPADD_SUM_JZ_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_SUM_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_RH_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'FUSION_RATE_LAST_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'FUSION_JZ_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_WEIGHT', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TARGET', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE', align: 'center', cellattr: addCellAttr}, 
				{name: 'MIC_BRO', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENTERPRISE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_TIME_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ENCLOSURE_TIME_OWE', align: 'center', cellattr: addCellAttr}, 
				{name: 'ENCLOSURE_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'DAY_SCORE', align: 'center', cellattr: addCellAttr}, 
				{name: 'PROVINCE_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CITY_ORDER', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_ORDER', align: 'center', cellattr: addCellAttr}
//				{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr},  
//				{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
//				{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr}
			];
		}
		
		groupHeadersData = [
    		{startColumnName: 'CUSTOMER_FEE_WEIGHT', numberOfColumns: 6, titleText: '个人客户计费收入（单位：万元）'},
    		{startColumnName: 'TELE_WEIGHT', numberOfColumns: 6, titleText: '放号'},
    		{startColumnName: 'BROADADD_WEIGHT', numberOfColumns: 6, titleText: '家庭宽带'},
    		{startColumnName: 'TERMINAL_WEIGHT', numberOfColumns: 8, titleText: '终端合约'},
    		{startColumnName: 'HOMENET_ADD_WEIGHT', numberOfColumns: 6, titleText: '家庭网新增'},
    		{startColumnName: 'CELL_WEIGHT', numberOfColumns: 11, titleText: '高价低占小区宽带新增'},
    		{startColumnName: 'DEPADD_WEIGHT', numberOfColumns: 9, titleText: '90后客户规模'},
    		{startColumnName: 'FUSION_WEIGHT', numberOfColumns: 11, titleText: '头部客户宽带新增'},
    		{startColumnName: 'ENCLOSURE_WEIGHT', numberOfColumns: 8, titleText: '商客拓展'}
    	];
	} 
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 150;
	$('#idx_table').jqGrid({
		url: url,
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: "100%",
		autowidth: true,
		postData: {
			json: JSON.stringify(data)
        },
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 15,
		rowList: [ 15, 20, 30 ],
		pager: '#idx_grid-pager',
		jsonReader: {
			repeatitems : false
		},
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
	// 将列表th和列表的td宽度做适配
	softThWidth();
	$("#idx_table").jqGrid('setGroupHeaders', {
		useColSpanStyle: true, 
		groupHeaders: groupHeadersData
	});
}

// 酬金信息
function getCjxxBottom() {
	var colNamesData = [];
	var colModelData = [];
	var groupHeadersData = [];
	
	
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val().substring(0, 6);
	var orgLevel = null;
	var orgId = null;
	if(null != grid && "" != grid) {
		orgLevel = "4";
		orgId = grid;
	} else if(null != town && "" != town) {
		orgLevel = "3";
		orgId = town;
	} else if(null != city && "" != city) {
		orgLevel = "2";
		orgId = city;
	} else {
		orgLevel = nowOrgLevel;
		orgId = nowOrgId;
	}
	var data = {
		orgId: orgId,
		orgLevel: orgLevel,
		statisDate: statisDate,
		oneType: oneType,
		twoType: twoType,
	};
	var url = $.cxt + "/firstpagethree/getcjybdetail";
	colNamesData = ["地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道标识", "渠道编码", 
	                "渠道名称", "放号酬金", "宽带酬金", "不限量酬金", "套餐酬金", "集团酬金", "调整金额", "统计月份"];
	colModelData = [ 
		{name: 'AREA_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'AREA_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CHNL_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'CHNL_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'OPEN_REWARD', align: 'center', cellattr: addCellAttr}, 
		{name: 'KD_REWARD', align: 'center', cellattr: addCellAttr}, 
		{name: 'UNLIMIT_REWARD', align: 'center', cellattr: addCellAttr}, 
		{name: 'DISC_REWARD', align: 'center', cellattr: addCellAttr}, 
		{name: 'BUSI_REWARD', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADJUST_FEE', align: 'center', cellattr: addCellAttr}, 
		{name: 'STATIS_MONTH', align: 'center', cellattr: addCellAttr}, 
	];
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 78;
	$('#idx_table').jqGrid({
		url: url,
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: "100%",
		autowidth: true,
		postData: {
			json: JSON.stringify(data)
        },
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 15,
		rowList: [ 15, 20, 30 ],
		pager: '#idx_grid-pager',
		jsonReader: {
			repeatitems : false
		},
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
	// 将列表th和列表的td宽度做适配
	softThWidth();
}

// 装维信息
function getZwxxBottom() {
	var colNamesData = [];
	var colModelData = [];
	var groupHeadersData = [];
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType
	};
	var url = $.cxt + "/firstpagethree/getzwxxdetail";
	colNamesData = ["地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "装维人员编码", "装维人员名称"];
	colModelData = [ 
		{name: 'AREA_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'AREA_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'REPAIR_USER_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'REPAIR_USER_NAME', align: 'center', cellattr: addCellAttr}
	];
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 78;
	$('#idx_table').jqGrid({
		url: url,
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: "100%",
		autowidth: true,
		postData: {
			json: JSON.stringify(data)
        },
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 15,
		rowList: [ 15, 20, 30 ],
		pager: '#idx_grid-pager',
		jsonReader: {
			repeatitems : false
		},
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
	// 将列表th和列表的td宽度做适配
	softThWidth();
}

// 投诉信息
function getTsxxBottom() {
	var colNamesData = [];
	var colModelData = [];
	var groupHeadersData = [];
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType
	};
	var url = $.cxt + "/firstpagethree/gettsxxdetail";
	colNamesData = ["工单流水号", "主工单编号", "签收状态0未签收1签收", "工单内容的简短说明信息", "工单状态", "工单共享状态",
					"工单类型01普通工单04现场解决单", "工单所处环节", "受理类型", "受理类型名称", "来话号码", "手机号码",
					"客户名称", "联系号码", "备用手机号码", "是否头部客户", "客户数据办理渠道", "归属县市", "归属地区",
					"客户级别", "受理时间", "业务开通县市", "受理部门", "设置客户投诉的归属地", "受理员工", "更新时间",
					"更新市县", "更新部门", "更新员工", "工单时限", "紧急程度", "期望反馈时限", "期望反馈方式", "期望处理结果", "分区字段（YYYYMM）"];
	colModelData = [ 
		{name: 'WORKFORM_ID', align: 'center', cellattr: addCellAttr,frozen:true,sortable:false}, 
		{name: 'P_WORKFORM_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SIGN_STS', align: 'center', cellattr: addCellAttr}, 
		{name: 'WORKFORM_TITLE', align: 'center', cellattr: addCellAttr}, 
		{name: 'WORKFORM_STS', align: 'center', cellattr: addCellAttr}, 
		{name: 'WORKFORM_STS_SHARE', align: 'center', cellattr: addCellAttr}, 
		{name: 'LIST_TYP', align: 'center', cellattr: addCellAttr}, 
		{name: 'CURR_NODE_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'TOPIC_TYP_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'TOPIC_TYP_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_PHONE_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'MSISDN', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUST_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'LINK_PHONE_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'OTH_PHONE_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'TB_FALG', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUST_DATAOPEN_CHNL', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUST_CNTY_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUST_AREA_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUST_CLASS', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACCEPT_TIME', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACCEPT_CNTY_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACCEPT_DEPART_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACCEPT_AREA_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACCEPT_STAFF_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'UPDATE_TIME', align: 'center', cellattr: addCellAttr}, 
		{name: 'UPDATE_CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'UPDATE_DEPART_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'UPDATE_STAFF_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'TIME_LIMIT', align: 'center', cellattr: addCellAttr}, 
		{name: 'URGENT_DEGREE', align: 'center', cellattr: addCellAttr}, 
		{name: 'HOPE_DEAL_TIME', align: 'center', cellattr: addCellAttr}, 
		{name: 'HOPE_FEEDBACK_TYP', align: 'center', cellattr: addCellAttr}, 
		{name: 'HOPE_DEAL_RESULT', align: 'center', cellattr: addCellAttr}, 
		{name: 'PARTITION_MONTH', align: 'center', cellattr: addCellAttr}
	];
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 120;
	$('#idx_table').jqGrid({
		url: url,
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: "100%",
		autowidth: true,
		postData: {
			json: JSON.stringify(data)
        },
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: false,
		rowNum: 15,
		rowList: [ 15, 20, 30 ],
		pager: '#idx_grid-pager',
		jsonReader: {
			repeatitems : false
		},
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
	// 将列表th和列表的td宽度做适配
		softThWidth();
		
		$("#idx_table").jqGrid('setFrozenColumns');//设置冻结列生效
		softFrozenThWidth();
		
}
//将头部适配列表td宽度
function softFrozenThWidth() {
	var height=$("#gview_idx_table .ui-jqgrid-hbox .ui-jqgrid-htable").height();
	var width = parseFloat($("#idx_table").width()/$("#idx_table").find("tr").eq(0).find("td:visible").length).toFixed(1);
	var length=$(".frozen-div .ui-jqgrid-htable .ui-jqgrid-labels").find("th").length;
	$(".frozen-div").css("cssText",  "width:"+width*length +"px !important;position: absolute;left: 0px;top: 0px;height: "+(height)+"px;opacity: 1;");
	$(".frozen-bdiv.ui-jqgrid-bdiv").css('top',(height)+'px');
	$(".ui-jqgrid-htable").css('height',(height)+'px');

	$('#idx_table_frozen').css("cssText","width:"+(width*length)+"px !important;color: rgb(255, 255, 255);overflow-x: hidden;border-collapse: separate;border-spacing: 0px;background: url(../../images/index-body-bg.png) no-repeat;");
	//$(".frozen-div .ui-jqgrid .ui-jqgrid-hdiv").css('line-height', '76px');
}
//经分报表
function getJfbbBottom() {
	var colNamesData = [];
	var colModelData = [];
	var groupHeadersData = [];
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType,
		statisDate: statisDate
	};
	var url = $.cxt + "/firstpagethree/getryljbbdetail";
	colNamesData = ["数据周期", "指标编码", "指标名称", "组织层级", "组织编码", "组织名称", "地市编码", "地市名称", "区县编码", "区县名称",
					"网格编码", "网格名称", "渠道编码", "渠道名称", "目标值", "完成量", "完成量", "完成进度", "环比", "排名"];
	colModelData = [ 
		{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'KPI_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'KPI_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'ORG_LEVEL', align: 'center', cellattr: addCellAttr}, 
		{name: 'ORG_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'ORG_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CHNL_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'TARGET', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATIO', align: 'center', cellattr: addCellAttr}, 
		{name: 'RANK', align: 'center', cellattr: addCellAttr}
	];
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 78;
	$('#idx_table').jqGrid({
		url: url,
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: "100%",
		autowidth: true,
		postData: {
			json: JSON.stringify(data)
        },
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 15,
		rowList: [ 15, 20, 30 ],
		pager: '#idx_grid-pager',
		jsonReader: {
			repeatitems : false
		},
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
	// 将列表th和列表的td宽度做适配
	softThWidth();
}

// 客户发展报表
function getKhfzBottom() {
	var colNamesData = [];
	var colModelData = [];
	var groupHeadersData = [];
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val() == '' ? "KHFZD" : $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val();
	var orgLevel = null;
	var orgId = null;
	if(null != grid && "" != grid) {
		orgLevel = "4";
		orgId = grid;
	} else if(null != town && "" != town) {
		orgLevel = "3";
		orgId = town;
	} else if(null != city && "" != city) {
		orgLevel = "2";
		orgId = city;
	} else {
		orgLevel = nowOrgLevel;
		orgId = nowOrgId;
	}
	var data = {
		orgId: orgId,
		orgLevel: orgLevel,
		statisDate: statisDate,
		twoType: twoType,
	};
	var url = "";
	if("KHFZD" == twoType) {
		url = $.cxt + "/firstpagethree/customerdevelopday";
		if(orgLevel == "1") {
			colNamesData = ["市州名称",
			                "当日任务", "当日完成", "超欠产", "完成率", "全省排名", "附：当日到达客户数", "附：到达客户数当日净增",
			                "当日任务", "当日完成", "超欠产", "完成率", "全省排名", "附：当日90后到达规模", "附：90后到达规模当日净增",
			                "当日任务", "当日完成", "其中新入网", "其中存量迁转", "超欠产", "完成率", "全省排名", "附：当日花卡到达规模", "附：花卡到达规模当日净增"];
			colModelData = [ 
				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_COMPETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_OWE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_TELENO_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_JZ_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_OWE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_90_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_JZ_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_ADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_STOCK_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_OWE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_CARD_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_JZ_D', align: 'center', cellattr: addCellAttr}, 
			];
			groupHeadersData = [
	    		{startColumnName: 'TELENO_TARGET_D', numberOfColumns: 7, titleText: '新入网客户发展'},
	    		{startColumnName: 'AFTER90_TARGET_D', numberOfColumns: 7, titleText: '90后客户新增'},
	    		{startColumnName: 'CARD_TARGET_D', numberOfColumns: 9, titleText: '花卡新增'}
	    	];
		} else if(orgLevel == "2") {
			colNamesData = ["区县名称",
			                "当日任务", "当日完成", "超欠产", "完成率", "全市排名", "全省排名", "附：当日到达客户数", "附：到达客户数当日净增",	
			                "当日任务", "当日完成", "超欠产",	"完成率", "全市排名", "全省排名", "附：当日90后到达规模", "附：90后到达规模当日净增",	
			                "当日任务", "当日完成", "其中新入网", "其中存量迁转", "超欠产", "完成率", "全市排名", "全省排名", "附：当日花卡到达规模", "附：花卡到达规模当日净增"];
			colModelData = [ 
				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_COMPETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_OWE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_TELENO_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_TELENO_02', align: 'center', cellattr: addCellAttr},
				{name: 'CUS_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_JZ_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_OWE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_90_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_90_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_JZ_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_ADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_STOCK_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_OWE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_CARD_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_CARD_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_JZ_D', align: 'center', cellattr: addCellAttr}, 
			];
			groupHeadersData = [
	    		{startColumnName: 'TELENO_TARGET_D', numberOfColumns: 8, titleText: '新入网客户发展'},
	    		{startColumnName: 'AFTER90_TARGET_D', numberOfColumns: 8, titleText: '90后客户新增'},
	    		{startColumnName: 'CARD_TARGET_D', numberOfColumns: 10, titleText: '花卡新增'}
	    	];
		} else if(orgLevel == "3") {
			colNamesData = ["网格名称",
			                "当日任务", "当日完成", "超欠产", "完成率", "全县排名", "全市排名", "附：当日到达客户数", "附：到达客户数当日净增",	
			                "当日任务", "当日完成", "超欠产",	"完成率", "全县排名", "全市排名", "附：当日90后到达规模", "附：90后到达规模当日净增",	
			                "当日任务", "当日完成", "其中新入网", "其中存量迁转", "超欠产", "完成率", "全县排名", "全市排名", "附：当日花卡到达规模", "附：花卡到达规模当日净增"];
			colModelData = [ 
				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_COMPETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_OWE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_TELENO_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_TELENO_02', align: 'center', cellattr: addCellAttr},
				{name: 'CUS_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_JZ_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_OWE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_90_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_90_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_JZ_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_ADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_STOCK_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_OWE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_CARD_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_CARD_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_JZ_D', align: 'center', cellattr: addCellAttr}, 
			];
			groupHeadersData = [
	    		{startColumnName: 'TELENO_TARGET_D', numberOfColumns: 8, titleText: '新入网客户发展'},
	    		{startColumnName: 'AFTER90_TARGET_D', numberOfColumns: 8, titleText: '90后客户新增'},
	    		{startColumnName: 'CARD_TARGET_D', numberOfColumns: 10, titleText: '花卡新增'}
	    	];
		} else {
			colNamesData = ["渠道名称",
			                "当日任务", "当日完成", "超欠产", "完成率", "网格内排名", "全县排名", "附：当日到达客户数", "附：到达客户数当日净增",	
			                "当日任务", "当日完成", "超欠产",	"完成率", "网格内排名", "全县排名", "附：当日90后到达规模", "附：90后到达规模当日净增",	
			                "当日任务", "当日完成", "其中新入网", "其中存量迁转", "超欠产", "完成率", "网格内排名", "全县排名", "附：当日花卡到达规模", "附：花卡到达规模当日净增"];
			colModelData = [ 
				{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_COMPETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_OWE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_TELENO_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_TELENO_02', align: 'center', cellattr: addCellAttr},
				{name: 'CUS_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_JZ_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_OWE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_90_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_90_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_JZ_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_TARGET_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_ADD_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_STOCK_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_OWE_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_CARD_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_CARD_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_JZ_D', align: 'center', cellattr: addCellAttr}, 
			];
			groupHeadersData = [
	    		{startColumnName: 'TELENO_TARGET_D', numberOfColumns: 8, titleText: '新入网客户发展'},
	    		{startColumnName: 'AFTER90_TARGET_D', numberOfColumns: 8, titleText: '90后客户新增'},
	    		{startColumnName: 'CARD_TARGET_D', numberOfColumns: 10, titleText: '花卡新增'}
	    	];
		}
	} else if("KHFZW" == twoType) {
		url = $.cxt + "/firstpagethree/customerdevelopweek";
		if(orgLevel == "1") {
			colNamesData = ["市州名称",
			                "近7天任务", "近7天完成", "超欠产", "完成率", "全省排名", "附：当日到达客户数", "附：到达客户数近7天净增",
			                "近7天任务", "近7天完成", "超欠产", "完成率", "全省排名", "附：当日90后到达规模", "附：90后到达规模近7天净增",
			                "近7天任务", "近7天完成", "其中新入网", "其中存量迁转", "超欠产", "完成率", "全省排名", "附：当日花卡到达规模", "附：花卡到达规模近7天净增"];
			colModelData = [ 
				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_COMPETE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_OWE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_TELENO_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_JZ_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COMPLETE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_OWE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_90_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_JZ_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COMPLETE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_ADD_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_STOCK_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_OWE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_CARD_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_JZ_W', align: 'center', cellattr: addCellAttr}, 
			];
			groupHeadersData = [
	    		{startColumnName: 'TELENO_TARGET_W', numberOfColumns: 7, titleText: '新入网客户发展'},
	    		{startColumnName: 'AFTER90_TARGET_W', numberOfColumns: 7, titleText: '90后客户新增'},
	    		{startColumnName: 'CARD_TARGET_W', numberOfColumns: 9, titleText: '花卡新增'}
	    	];
		} else if(orgLevel == "2") {
			colNamesData = ["区县名称",
			                "近7天任务", "近7天完成", "超欠产", "完成率", "全市排名", "全省排名", "附：当日到达客户数", "附：到达客户数近7天净增",
			                "近7天任务", "近7天完成", "超欠产", "完成率", "全市排名", "全省排名", "附：当日90后到达规模", "附：90后到达规模近7天净增",
			                "近7天任务", "近7天完成", "其中新入网", "其中存量迁转", "超欠产", "完成率", "全市排名", "全省排名", "附：当日花卡到达规模", "附：花卡到达规模近7天净增"];
			colModelData = [ 
				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_COMPETE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_OWE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_TELENO_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_TELENO_02', align: 'center', cellattr: addCellAttr},
				{name: 'CUS_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_JZ_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COMPLETE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_OWE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_90_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_90_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_JZ_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COMPLETE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_ADD_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_STOCK_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_OWE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_CARD_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_CARD_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_JZ_W', align: 'center', cellattr: addCellAttr}, 
			];
			groupHeadersData = [
	    		{startColumnName: 'TELENO_TARGET_W', numberOfColumns: 8, titleText: '新入网客户发展'},
	    		{startColumnName: 'AFTER90_TARGET_W', numberOfColumns: 8, titleText: '90后客户新增'},
	    		{startColumnName: 'CARD_TARGET_W', numberOfColumns: 10, titleText: '花卡新增'}
	    	];
		} else if(orgLevel == "3") {
			colNamesData = ["网格名称",
			                "近7天任务", "近7天完成", "超欠产", "完成率", "全县排名", "全市排名", "附：当日到达客户数", "附：到达客户数近7天净增",
			                "近7天任务", "近7天完成", "超欠产", "完成率", "全县排名", "全市排名", "附：当日90后到达规模", "附：90后到达规模近7天净增",
			                "近7天任务", "近7天完成", "其中新入网", "其中存量迁转", "超欠产", "完成率", "全县排名", "全市排名", "附：当日花卡到达规模", "附：花卡到达规模近7天净增"];
			colModelData = [ 
				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_COMPETE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_OWE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_TELENO_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_TELENO_02', align: 'center', cellattr: addCellAttr},
				{name: 'CUS_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_JZ_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COMPLETE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_OWE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_90_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_90_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_JZ_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COMPLETE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_ADD_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_STOCK_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_OWE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_CARD_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_CARD_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_JZ_W', align: 'center', cellattr: addCellAttr}, 
			];
			groupHeadersData = [
	    		{startColumnName: 'TELENO_TARGET_W', numberOfColumns: 8, titleText: '新入网客户发展'},
	    		{startColumnName: 'AFTER90_TARGET_W', numberOfColumns: 8, titleText: '90后客户新增'},
	    		{startColumnName: 'CARD_TARGET_W', numberOfColumns: 10, titleText: '花卡新增'}
	    	];
		} else {
			colNamesData = ["渠道名称",
			                "近7天任务", "近7天完成", "超欠产", "完成率", "网格内排名", "全县排名", "附：当日到达客户数", "附：到达客户数近7天净增",
			                "近7天任务", "近7天完成", "超欠产", "完成率", "网格内排名", "全县排名", "附：当日90后到达规模", "附：90后到达规模近7天净增",
			                "近7天任务", "近7天完成", "其中新入网", "其中存量迁转", "超欠产", "完成率", "网格内排名", "全县排名", "附：当日花卡到达规模", "附：花卡到达规模近7天净增"];
			colModelData = [ 
				{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_COMPETE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_OWE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_TELENO_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_TELENO_02', align: 'center', cellattr: addCellAttr},
				{name: 'CUS_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_JZ_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COMPLETE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_OWE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_90_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_90_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_JZ_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_TARGET_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COMPLETE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_ADD_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_STOCK_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_OWE_W', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_RATE_W', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_CARD_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_CARD_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COUNT_D', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_JZ_W', align: 'center', cellattr: addCellAttr}, 
			];
			groupHeadersData = [
	    		{startColumnName: 'TELENO_TARGET_W', numberOfColumns: 8, titleText: '新入网客户发展'},
	    		{startColumnName: 'AFTER90_TARGET_W', numberOfColumns: 8, titleText: '90后客户新增'},
	    		{startColumnName: 'CARD_TARGET_W', numberOfColumns: 10, titleText: '花卡新增'}
	    	];
		}
	} else if("KHFZM" == twoType) {
		url = $.cxt + "/firstpagethree/customerdevelopmonth";
		if(orgLevel == "1") {
			colNamesData = ["市州名称",
			                "当月任务", "累计完成", "较时间进度超欠产", "较时间进度完成率", "全省排名", "附：当日到达客户数", "附：到达客户数当月净增",
			                "当月任务", "累计完成", "较时间进度超欠产", "较时间进度完成率", "全省排名", "附：当日90后到达规模", "附：90后到达规模当月净增",
			                "当月任务", "累计完成", "其中新入网", "其中存量迁转", "较时间进度超欠产", "较时间进度完成率", "全省排名", "附：当日花卡到达规模", "附：花卡到达规模当月净增"];
			colModelData = [ 
				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_COMPETE_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_OWE_TIME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_RATE_TIME', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_TELENO_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_JZ_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_OWE_TIME', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_RATE_TIME', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_90_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_JZ_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_ADD_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_STOCK_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_OWE_TIME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_RATE_TIME', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_CARD_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COUNT_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_JZ_M', align: 'center', cellattr: addCellAttr}, 
			];
			groupHeadersData = [
	    		{startColumnName: 'TELENO_TARGET_M', numberOfColumns: 7, titleText: '新入网客户发展'},
	    		{startColumnName: 'AFTER90_TARGET_M', numberOfColumns: 7, titleText: '90后客户新增'},
	    		{startColumnName: 'CARD_TARGET_M', numberOfColumns: 9, titleText: '花卡新增'}
	    	];
		} else if(orgLevel == "2") {
			colNamesData = ["区县名称",
			                "当月任务", "累计完成", "较时间进度超欠产", "较时间进度完成率", "全市排名", "全省排名", "附：当日到达客户数", "附：到达客户数当月净增",
			                "当月任务", "累计完成", "较时间进度超欠产", "较时间进度完成率", "全市排名", "全省排名", "附：当日90后到达规模", "附：90后到达规模当月净增",
			                "当月任务", "累计完成", "其中新入网", "其中存量迁转", "较时间进度超欠产", "较时间进度完成率", "全市排名", "全省排名", "附：当日花卡到达规模", "附：花卡到达规模当月净增"];
			colModelData = [ 
				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_COMPETE_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_OWE_TIME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_RATE_TIME', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_TELENO_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_TELENO_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_JZ_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_OWE_TIME', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_RATE_TIME', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_90_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_90_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_JZ_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_ADD_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_STOCK_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_OWE_TIME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_RATE_TIME', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_CARD_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_CARD_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COUNT_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_JZ_M', align: 'center', cellattr: addCellAttr},  
			];
			groupHeadersData = [
	    		{startColumnName: 'TELENO_TARGET_M', numberOfColumns: 8, titleText: '新入网客户发展'},
	    		{startColumnName: 'AFTER90_TARGET_M', numberOfColumns: 8, titleText: '90后客户新增'},
	    		{startColumnName: 'CARD_TARGET_M', numberOfColumns: 10, titleText: '花卡新增'}
	    	];
		} else if(orgLevel == "3") {
			colNamesData = ["网格名称",
			                "当月任务", "累计完成", "较时间进度超欠产", "较时间进度完成率", "全县排名", "全市排名", "附：当日到达客户数", "附：到达客户数当月净增",
			                "当月任务", "累计完成", "较时间进度超欠产", "较时间进度完成率", "全县排名", "全市排名", "附：当日90后到达规模", "附：90后到达规模当月净增",
			                "当月任务", "累计完成", "其中新入网", "其中存量迁转", "较时间进度超欠产", "较时间进度完成率", "全县排名", "全市排名", "附：当日花卡到达规模", "附：花卡到达规模当月净增"];
			colModelData = [ 
				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_COMPETE_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_OWE_TIME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_RATE_TIME', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_TELENO_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_TELENO_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_JZ_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_OWE_TIME', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_RATE_TIME', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_90_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_90_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_JZ_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_ADD_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_STOCK_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_OWE_TIME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_RATE_TIME', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_CARD_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_CARD_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COUNT_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_JZ_M', align: 'center', cellattr: addCellAttr},  
			];
			groupHeadersData = [
	    		{startColumnName: 'TELENO_TARGET_M', numberOfColumns: 8, titleText: '新入网客户发展'},
	    		{startColumnName: 'AFTER90_TARGET_M', numberOfColumns: 8, titleText: '90后客户新增'},
	    		{startColumnName: 'CARD_TARGET_M', numberOfColumns: 10, titleText: '花卡新增'}
	    	];
		} else {
			colNamesData = ["渠道名称",
			                "当月任务", "累计完成", "较时间进度超欠产", "较时间进度完成率", "网格内排名", "全县排名", "附：当日到达客户数", "附：到达客户数当月净增",
			                "当月任务", "累计完成", "较时间进度超欠产", "较时间进度完成率", "网格内排名", "全县排名", "附：当日90后到达规模", "附：90后到达规模当月净增",
			                "当月任务", "累计完成", "其中新入网", "其中存量迁转", "较时间进度超欠产", "较时间进度完成率", "网格内排名", "全县排名", "附：当日花卡到达规模", "附：花卡到达规模当月净增"];
			colModelData = [ 
				{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_COMPETE_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_OWE_TIME', align: 'center', cellattr: addCellAttr}, 
				{name: 'TELENO_RATE_TIME', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_TELENO_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_TELENO_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CUS_COUNT_JZ_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_OWE_TIME', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_RATE_TIME', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_90_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_90_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'AFTER90_COUNT_JZ_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_TARGET_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_ADD_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_STOCK_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_OWE_TIME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_RATE_TIME', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
				{name: 'ORDER_CARD_01', align: 'center', cellattr: addCellAttr}, 
				{name: 'ORDER_CARD_02', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_COUNT_M', align: 'center', cellattr: addCellAttr}, 
				{name: 'CARD_JZ_M', align: 'center', cellattr: addCellAttr},  
			];
			groupHeadersData = [
	    		{startColumnName: 'TELENO_TARGET_M', numberOfColumns: 8, titleText: '新入网客户发展'},
	    		{startColumnName: 'AFTER90_TARGET_M', numberOfColumns: 8, titleText: '90后客户新增'},
	    		{startColumnName: 'CARD_TARGET_M', numberOfColumns: 10, titleText: '花卡新增'}
	    	];
		}
	} 
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 150;
	$('#idx_table').jqGrid({
		url: url,
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: "100%",
		autowidth: true,
		postData: {
			json: JSON.stringify(data)
        },
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 15,
		rowList: [ 15, 20, 30 ],
		pager: '#idx_grid-pager',
		jsonReader: {
			repeatitems : false
		},
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
	// 将列表th和列表的td宽度做适配
	softThWidth();
	$("#idx_table").jqGrid('setGroupHeaders', {
		useColSpanStyle: true, 
		groupHeaders: groupHeadersData
	});
}

// 小数点转化成百分号
function rateFormat(celval, options, rowdata){
	return (celval * 100).toFixed(2) + "%";
}

//0,1转化成否，是
function YAndNFormat(celval, options, rowdata){
	if(celval=="0"){
		return "否";
	}else if(celval=="1"){
		return "是";
	}else{
		return "";
	}
}
//返回页面
$("#queryBackBtn").on("click", backBtn);
function backBtn() {
	$("#resourcePanel").css("display", "block");
	$("#benchmarkingAnalysis").css("display", "none");
	$("#tablePanel").css("display", "none");
	$("#topPanel").css("display", "block");
	$("#statisInfo").css("display", "block");
	$("#zbTypeSelectDiv").css("display", "block");
	$("#treeRoadInfo").empty();
	$("#treeRoadInfo").html("当前位置：首页");
    $("#zhibiaoPanel").show();
    $("#importantPanel").hide();
}

function getTime() {
    var percent="";
	var statis_date= $("#statisDate").val();
	if(statis_date!=""){
		statis_date=statis_date.substr(0,4)+"-"+statis_date.substr(4,2)+"-"+statis_date.substr(6,2); 
		var myDate = new Date(statis_date);
		var day = myDate.getDate();
		var lastDate = new Date(myDate.getFullYear(), myDate.getMonth()+1, '0');
		var dayNum = lastDate.getDate();
		percent=((day / dayNum) * 100).toFixed(2) + '%';
		
	}
	
	return percent;
}
