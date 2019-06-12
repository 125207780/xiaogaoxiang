var selectArr = [];
var marker ;
$(function() {
	
	getMaxStatisDate();
	
	// 账期时间插件
	$(".date-picker").datepicker({
		format: 'yyyymmdd',
		language: 'zh-CN',
		todayBtn: "linked",
		autoclose: true,
		minview: "3"
	});
	sysOrgInfo(nowOrgId, nowOrgLevel);
});

// 获取最新账期
function getMaxStatisDate() {
	$.ajax({
		url: $.cxt + "/rptcomposite/getMaxDate",
		data: {conditionOne: $("#conditionOne option:selected").val()},
		type: "POST",
		async: false,
		success: function(result) {
			var json = JSON.parse(result);
			$("#dv_date").val(json.data.STATIS_DATE);
		}
	});
}

// 选择组织信息
function sysOrgInfo(orgId, orgLevel) {
	$("#citySelect11").empty();
	$("#cntySelect11").empty();
	$("#gridSelect11").empty();
	var htmltv = "";
	$.ajax({
		url: $.cxt + "/rptcomposite/getAreaOrChnlInfo",
		data: {orgId: orgId, orgLevel: orgLevel},
		type: "POST",
		success: function(result) {
			var json = JSON.parse(result);
			if (json.code == '0') {
				var html = "";
				var data = json.data;
				var parenthtml=""
				for (var i = 0; i < data.length; i++) {
					html += "<option value = '" + data[i].AREA_ID + "'>" + data[i].AREA_NAME + "</option>";
				}
				if(orgLevel == 1) {
					htmltv = "<option value=''>---全省---</option>";
					$("#citySelect11").append(htmltv);
					$("#citySelect11").append(html);
					htmltv = "<option value=''>---全地市---</option>";
					$("#cntySelect11").append(htmltv);
					htmltv = "<option value=''>---全区县---</option>";
					$("#gridSelect11").append(htmltv);
				} else if(orgLevel == 2) {
					$("#citySelect11").css("display", "none");
					htmltv="<option value=''>---全地市---</option>"
					$("#cntySelect11").append(htmltv);
					$("#cntySelect11").append(html);
					htmltv = "<option value=''>---全区县---</option>";
					$("#gridSelect11").append(htmltv);
				} else {
					$("#citySelect11").css("display", "none");
					$("#cntySelect11").css("display", "none");
					htmltv = "<option value=''>---全区县---</option>";
					$("#gridSelect11").append(htmltv);
					$("#gridSelect11").append(html);
				}
			}
		}
	});
	conditionOne();
}

// 任务资源详情地区级联
function selectLoad(idStr) {
	var areaId = $("#hiddenOrgId").val();
	if ("cntySelect11" == idStr) {
		var citySelectVal = $("#citySelect11").val();
		if (citySelectVal != "") {
			areaId = citySelectVal;
		}
		var html = "<option value=''>---全地市---</option>";
		$("#cntySelect11").empty();
		$("#gridSelect11").empty();
		$("#cntySelect11").append(html);
		html = "<option value=''>---全区县---</option>";
		$("#gridSelect11").append(html);
		if (null == $("#citySelect11 option:selected").val() || "" == $("#citySelect11 option:selected").val() || undefined == $("#citySelect11 option:selected").val()) {
			$("#cntySelect11").empty();
			$("#gridSelect11").empty();
			orgId = nowOrgId;
		}
	} else if ("gridSelect11" == idStr) {
		var cntySelectVal = $("#cntySelect11").val();
		if (cntySelectVal != "") {
			areaId = cntySelectVal;
		}
		var html = "<option value=''>---全区县---</option>";
		$("#gridSelect11").empty();
		$("#gridSelect11").append(html);
		if ($("#cntySelect11 option:selected").val() == '') {
			if(null == $("#citySelect11 option:selected").val()
					|| "" == $("#citySelect11 option:selected")
					|| undefined == $("#citySelect11 option:selected").val()) {
				$("#cntySelect11").empty();
				$("#gridSelect11").empty();
				orgId = nowOrgId;
			} else {
				orgId = $("#citySelect11 option:selected").val();
			}
		}
	} else if ("chnlSelect11" == idStr) {
		var gridSelectVal = $("#gridSelect11").val();
		if (gridSelectVal != "") {
			areaId = gridSelectVal;
		}
		var html = "<option value=''>全选</option>";
		if ($("#gridSelect11 option:selected").val() == '') {
			if(null == $("#cntySelect11 option:selected").val()
					|| "" == $("#cntySelect11 option:selected")
					|| undefined == $("#cntySelect11 option:selected").val()) {
				if(null == $("#citySelect11 option:selected").val()
						|| "" == $("#citySelect11 option:selected")
						|| undefined == $("#citySelect11 option:selected").val()) {
					$("#cntySelect11").empty();
					$("#gridSelect11").empty();
					orgId = nowOrgId;
				} else {
					orgId = $("#citySelect11 option:selected").val();
				}
			} else {
				orgId = $("#cntySelect11 option:selected").val();
			}
		}
	}
	if("cntySelect11" == idStr || "gridSelect11" == idStr) {
		var idObject = $("#" + idStr);
		$.ajax({
			url: $.cxt + "/rptcomposite/getChildrenSysOrgInfo",
			type: 'POST',
			data: {
				orgId: areaId,
				type: idStr
			},
			async: false,
			success: function(result) {
				var json = JSON.parse(result);
				if (json.code == '0') {
					var htmltv = "";
					if("cntySelect11" == idStr) {
						$("#cntySelect11").empty();
						$("#gridSelect11").empty();
						htmltv = "<option value=''>---全区县---</option>";
						$("#gridSelect11").html(htmltv);
						htmltv = "<option value=''>---全地市---</option>";
						for(var i = 0; i < json.data.length; i++) {
							htmltv += "<option value='" + json.data[i].ORGID + "'>" + json.data[i].ORGNAME + "</option>";
						}
						$("#cntySelect11").html(htmltv);
					} else if("gridSelect11" == idStr) {
						$("#gridSelect11").empty();
						htmltv = "<option value=''>---全区县---</option>";
						for(var i = 0; i < json.data.length; i++) {
							htmltv += "<option value='" + json.data[i].ORGID + "'>" + json.data[i].ORGNAME + "</option>";
						}
						$("#gridSelect11").html(htmltv);
					}
				}
				conditionOne();
			}
		});
	} else {
		if(nowOrgLevel >= 3)
			if(null == $("#gridSelect11 option:selected").val() || "" == $("#gridSelect11 option:selected").val()) {
				var idObject = $("#" + idStr);
				$.ajax({
					url: $.cxt + "/rptcomposite/getChildrenSysOrgInfo",
					type: 'POST',
					data: {
						orgId: areaId,
						type: idStr,
						areaId: nowOrgId,
						orgLevel: nowOrgLevel
					},
					async: false,
					success: function(result) {
						var json = JSON.parse(result);
						if (json.code == '0') {
							var htmltv = "";
							$("#gridSelect11").empty();
							htmltv = "<option value=''>---全区县---</option>";
							for(var i = 0; i < json.data.length; i++) {
								htmltv += "<option value='" + json.data[i].ORGID + "'>" + json.data[i].ORGNAME + "</option>";
							}
							$("#gridSelect11").html(htmltv);
						}
					}
				});
			}
		conditionOne();
	}
		
	}
$("#conditionOne").on("change", conditionOne);
function conditionOne() {
	var orgId = "";
	var orgLevel = "";
	var cityCode = $("#citySelect11 option:selected").val();
	var cntyCode = $("#cntySelect11 option:selected").val();
	var gridCode = $("#gridSelect11 option:selected").val();
	if(nowOrgLevel == 1) {
		if(null != cityCode && "" != cityCode && (null == cntyCode || "" == cntyCode || undefined == cntyCode) 
				&& (null == gridCode || "" == gridCode || undefined == gridCode)) {
			// 当前地图组织编码
			orgId = cityCode;
			// 当前地图层级
			orgLevel = 2;
		} 
		if(null != cityCode && "" != cityCode && null != cntyCode && "" != cntyCode
				&& (null == gridCode || "" == gridCode || undefined == gridCode)) {
			// 当前地图组织编码
			orgId = cntyCode;
			// 当前地图层级
			orgLevel = 3;
		}
		if(null != cityCode && "" != cityCode && null != cntyCode && "" != cntyCode && null != gridCode && "" != gridCode) {
			// 当前地图组织编码
			orgId = gridCode;
			// 当前地图层级
			orgLevel = 4;
		}
		if((null == cityCode || "" == cityCode || undefined == cityCode)
				&& (null == cntyCode || "" == cntyCode || undefined == cntyCode)
				&& (null == gridCode || "" == gridCode || undefined == gridCode)) {
			// 当前地图组织编码
			orgId = nowOrgId;
			// 当前地图层级
			orgLevel = nowOrgLevel;
		}
	} else if(nowOrgLevel == 2) {
		if(null != cntyCode && "" != cntyCode && (null == gridCode || "" == gridCode || undefined == gridCode)) {
			// 当前地图组织编码
			orgId = cntyCode;
			// 当前地图层级
			orgLevel = 3;
		}
		if(null != cntyCode && "" != cntyCode && null != gridCode && "" != gridCode) {
			// 当前地图组织编码
			orgId = gridCode;
			// 当前地图层级
			orgLevel = 4;
		}
		if((null == cntyCode || "" == cntyCode || undefined == cntyCode)
				&& (null == gridCode || "" == gridCode || undefined == gridCode)) {
			// 当前地图组织编码
			orgId = nowOrgId;
			// 当前地图层级
			orgLevel = nowOrgLevel;
		}
	} else if(nowOrgLevel == 3) {
		if(null != gridCode && "" != gridCode) {
			// 当前地图组织编码
			orgId = gridCode;
			// 当前地图层级
			orgLevel = 4;
		}
		if(null == gridCode || "" == gridCode || undefined == gridCode) {
			// 当前地图组织编码
			orgId = nowOrgId;
			// 当前地图层级
			orgLevel = nowOrgLevel;
		}
	} else {
		orgId = nowOrgId;
		orgLevel = nowOrgLevel;
	}
	// 当前选择的条件
	var conditionOne = $("#conditionOne option:selected").val();
	// 当前选择的条件是否有当日或当月条件
	if("FH" == conditionOne || "XZKD" == conditionOne || "ZDHY" == conditionOne || "JTWXZ" == conditionOne || "ZXWQYQDXD" == conditionOne) {
		$("#conditionSpanTwo").css("display", "block");
		// 有当日或者当月条件，则直接调用
		conditionTwo(orgId, orgLevel, conditionOne);
	} else if("XWSC" == conditionOne){
		$("#conditionSpanTwoXWSC").css("display", "block");
		$("#conditionSpanTwo").css("display", "none");
		loadCompositeOnlyOneConditionList(orgId, orgLevel, conditionOne);
	}else {
		$("#conditionSpanTwo").css("display", "none");
		$("#conditionSpanTwoXWSC").css("display", "none");
		loadCompositeOnlyOneConditionList(orgId, orgLevel, conditionOne);
	}
	if(4 == $("#hiddenOldOrgLevel").val()) {
		var htmltv = "<label class='conditionLabel'>基础单元分类：</label>";
		htmltv += "<select style='width: 122px' id='conditionThree'>";
		htmltv += "<option value='channel'>渠道</option>";
		htmltv += "<option value='station'>基站</option>";
		htmltv += "<option value='netCommunity'>宽带小区</option>";
		htmltv += "<option value='importantCommunity'>重点小区</option>";
		htmltv += "<option value='abGroup'>AB集团</option>";
		htmltv += "<option value='cdGroup'>CD集团</option>";
		htmltv += "<option value='manager'>区域总监</option>";
		htmltv += "</select>";
		htmltv += "<font style='margin-left: 20px; font-size: 14px;' color='#FFFFFF'>搜索条件：</font><input placeholder='请输入搜索条件' type='text' name='poiInfoName' id='poiInfoName' />";
		htmltv += "<button id='searchPoiInfo' style='text-align: center;'>查询</button>";
		$("#conditionSpanThree").css("display", "block");
		$("#conditionSpanThree").html(htmltv);
		$("#backUpInfo").css("display", "block");
	} else {
		$("#backUpInfo").css("display", "none");
		$("#conditionSpanThree").empty();
	}
}

function countTwo(data1){
	var titlename = [];
	var data = [];
	$.ajax({
		url: $.cxt + "/rptcomposite/allList",
		data: {
			json: JSON.stringify(data1)
		},
		type: "POST",
		async: false,
		success: function(total) {
			if(total != null){
				for(var i = 0; i < total.length; i++) {
					if(total[i].CITY_NAME != "全省") {
						if(data1.conditionOne == 'XZJZWC' || data1.conditionOne == 'TBKHGYRHL') {
							data.push(total[i].RATE * 100);
							if(data1.orgLevel == "1") {
								titlename.push(total[i].CITY_NAME);
							}
							if(data1.orgLevel == "2"){
								titlename.push(total[i].CNTY_NAME);
							}
							if(data1.orgLevel == "3") {
								titlename.push(total[i].GRID_NAME);
							}
							if(data1.orgLevel == "4") {
								titlename.push(total[i].CHNL_NAME);
							}
						} else if(data1.conditionOne == 'GRKHZJFSR' || data1.conditionOne == 'XZKHZJFSR') {
							data.push(total[i].RATE_D * 100);
							if(data1.orgLevel == "1") {
								titlename.push(total[i].CITY_NAME);
							}
							if(data1.orgLevel == "2"){
								titlename.push(total[i].CNTY_NAME);
							}
							if(data1.orgLevel == "3") {
								titlename.push(total[i].GRID_NAME);
							}
							if(data1.orgLevel == "4") {
								titlename.push(total[i].CHNL_NAME);
							}
						} else if(data1.conditionOne == 'GJZDZXQSTTS') {
							data.push(total[i].PERMEABILITY * 100);	
							if(data1.orgLevel == "1") {
								titlename.push(total[i].CITY_NAME);
							}
							if(data1.orgLevel == "2"){
								titlename.push(total[i].CNTY_NAME);
							}
							if(data1.orgLevel == "3") {
								titlename.push(total[i].GRID_NAME);
							}
							if(data1.orgLevel == "4") {
								titlename.push(total[i].CHNL_NAME);
							}
						} else if(data1.conditionOne == 'TBKHZTQK'){
							data.push(total[i].USR_CNT_2018);
							if(data1.orgLevel == "1") {
								titlename.push(total[i].AREA_NAME);
							}
							if(data1.orgLevel == "2"){
								titlename.push(total[i].CNTY_NAME);
							}
							if(data1.orgLevel == "3") {
								titlename.push(total[i].GRID_NAME);
							}
							if(data1.orgLevel == "4") {
								titlename.push(total[i].GRID_NAME);
							}
						} else if(data1.conditionOne == 'XWSC'){
							data.push(total[i].KD_CNT);
							if(data1.orgLevel == "1") {
								titlename.push(total[i].AREA_NAME);
							}
							if(data1.orgLevel == "2"){
								titlename.push(total[i].CNTY_NAME);
							}
							if(data1.orgLevel == "3") {
								titlename.push(total[i].GRID_NAME);
							}
							if(data1.orgLevel == "4") {
								titlename.push(total[i].GC_NAME);
							}
							
						} else if(data1.conditionOne == 'XYKH'){
							data.push(total[i].CMCC_RATE);
							if(data1.orgLevel == "1") {
								titlename.push(total[i].SCH_AREA_NAME);
							}
							if(data1.orgLevel == "2"){
								titlename.push(total[i].CNTY_NAME);
							}
							if(data1.orgLevel == "3") {
								titlename.push(total[i].GRID_NAME);
							}
							if(data1.orgLevel == "4") {
								titlename.push(total[i].SCH_NAME);
							}
						}else if(data1.conditionOne == 'FH'||data1.conditionOne =="XZKD"||data1.conditionOne =="ZDHY"||data1.conditionOne =="JTWXZ"){
							if(data1.orgLevel == "1") {
								titlename.push(total[i].CITY_NAME);
							}
							if(data1.orgLevel == "2"){
								titlename.push(total[i].CNTY_NAME);
							}
							if(data1.orgLevel == "3") {
								titlename.push(total[i].GRID_NAME);
							}
							if(data1.orgLevel == "4") {
								titlename.push(total[i].CHNL_NAME);
							}
						}
						{
							if(data1.conditionTwo == "day") {
								data.push(total[i].RATE_D * 100);
							} else {
								data.push(total[i].RATE_M * 100);
							}
						}
					}
					
				}
			}
		}}
	);
	var myChart = echarts.init(document.getElementById('countTwo'));
	var colors = [];
	var num = 0;
	var i = 0;
	var option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'line',
				lineStyle: {
					opacity: 0
				}
			},
		},
		grid: {
			left: '5%',
			right: '5%',
			bottom: '25%',
			top: '10%',
			height: '75%',
			containLabel: true,
		},
		xAxis: {
			data: titlename,
			axisLabel: {
				interval: 0,
				show: true,
				color: '#fff',
				fontSize: 8,
				rotate: 30,
			},
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: '#0c3b71'
				}
			},
		},
		yAxis : {
			axisLine: {
				lineStyle: {
					color: '#3f67bb',
				}
			},
			axisLabel: {
				color: 'rgb(170, 170, 170)',
				formatter: '{value} '
			},
			splitLine: {
				lineStyle: {
					color: '#3f67bb',
				}
			},
		},
		series: [ {
			type: 'bar',
			data: data,
			barWidth: '30%',
			itemStyle: {
				normal: {
					color: function() {
						num = parseInt(data[i]);
						if(num <= 20) {
							i++;
							return "#2EFEF7";
						} else if(20 < num && num <= 40) {
							i++;
							return "#2EFE2E"; 
						} else if(40 < num && num <= 60) {
							i++;
							return "#F4FA58"; 
						} else if(60 < num && num <= 80) {
							i++;
							return "#FE9A2E"; 
						} else if(80 < num) {
							i++;
							return "#FE2E2E";
						}
					}
				},
				label: {
					show: true,
					position: 'top',
					textStyle: {
						color: 'rgb(170, 170, 170)'
					}
				}
			}
		}]
	};
	myChart.setOption(option);
}

// 二级菜单选项
$("#conditionTwo").on("change", conditionTwo);
function conditionTwo(orgId, orgLevel, conditionOne) {
	var conditionTwo = $("#conditionTwo option:selected").val();
	var orgId = "";
	var orgLevel = "";
	var cityCode = $("#citySelect11 option:selected").val();
	var cntyCode = $("#cntySelect11 option:selected").val();
	var gridCode = $("#gridSelect11 option:selected").val();
	var statisDate = $("#dv_date").val();
	if(nowOrgLevel == 1) {
		if(null != cityCode && "" != cityCode && (null == cntyCode || "" == cntyCode || undefined == cntyCode) 
				&& (null == gridCode || "" == gridCode || undefined == gridCode)) {
			// 当前地图组织编码
			orgId = cityCode;
			// 当前地图层级
			orgLevel = 2;
		} 
		if(null != cityCode && "" != cityCode && null != cntyCode && "" != cntyCode
				&& (null == gridCode || "" == gridCode || undefined == gridCode)) {
			// 当前地图组织编码
			orgId = cntyCode;
			// 当前地图层级
			orgLevel = 3;
		}
		if(null != cityCode && "" != cityCode && null != cntyCode && "" != cntyCode && null != gridCode && "" != gridCode) {
			// 当前地图组织编码
			orgId = gridCode;
			// 当前地图层级
			orgLevel = 4;
		}
		if((null == cityCode || "" == cityCode || undefined == cityCode)
				&& (null == cntyCode || "" == cntyCode || undefined == cntyCode)
				&& (null == gridCode || "" == gridCode || undefined == gridCode)) {
			// 当前地图组织编码
			orgId = nowOrgId;
			// 当前地图层级
			orgLevel = nowOrgLevel;
		}
	} else if(nowOrgLevel == 2) {
		if(null != cntyCode && "" != cntyCode && (null == gridCode || "" == gridCode || undefined == gridCode)) {
			// 当前地图组织编码
			orgId = cntyCode;
			// 当前地图层级
			orgLevel = 3;
		}
		if(null != cntyCode && "" != cntyCode && null != gridCode && "" != gridCode) {
			// 当前地图组织编码
			orgId = gridCode;
			// 当前地图层级
			orgLevel = 4;
		}
		if((null == cntyCode || "" == cntyCode || undefined == cntyCode)
				&& (null == gridCode || "" == gridCode || undefined == gridCode)) {
			// 当前地图组织编码
			orgId = nowOrgId;
			// 当前地图层级
			orgLevel = nowOrgLevel;
		}
	} else if(nowOrgLevel == 3) {
		if(null != gridCode && "" != gridCode) {
			// 当前地图组织编码
			orgId = gridCode;
			// 当前地图层级
			orgLevel = 4;
		}
		if(null == gridCode || "" == gridCode || undefined == gridCode) {
			// 当前地图组织编码
			orgId = nowOrgId;
			// 当前地图层级
			orgLevel = nowOrgLevel;
		}
	} else {
		orgId = nowOrgId;
		orgLevel = nowOrgLevel;
	}
	
	var data = {
		orgId: orgId,
		orgLevel: orgLevel,
		statisDate: statisDate,
		conditionOne: $("#conditionOne option:selected").val(),
		conditionTwo: conditionTwo,
	};
	// 查询出来后，根据当日或者当月将查询列表进行调整
	loadCompositeTwoConditionList(data);
}

// 加载包含一二级表格信息
function loadCompositeTwoConditionList(data) {
	var colNamesData = [];
	var colModelData = [];
	var url = "";
	// 根据conditionOne第一个条件，conditionTwo第二个条件，将表格的表头设置出来
	// 放号
	if ("FH" == data.conditionOne) {
		url = $.cxt + "/rptcomposite/formteleno";
		var name = "";
		if("day" == data.conditionTwo) {
			if(data.orgLevel == "1") {
				name = "地市名称";
				colNamesData = [ name, '当日目标值(户)', '当日放号量(户)', '超欠产量(户)', '进度', '一级排名', '二级排名' ];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TELE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
				];
			} else if(data.orgLevel == "2") {
				name = "区县名称";
				colNamesData = [ name, '当日目标值(户)', '当日放号量(户)', '超欠产量(户)', '进度', '一级排名', '二级排名' ];
				colModelData = [ 
					{name: 'CNTY_NAME', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'TELE_D',align: 'center',cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center',cellattr: addCellAttr,formatter:rateFormat}, 
	    			{name: 'ORDER1_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'ORDER2_D', align: 'center',cellattr: addCellAttr}
				];
			} else if(data.orgLevel == "3") {
				name = "网格名称";
				colNamesData = [ '网格编码', name, '当日目标值(户)', '当日放号量(户)', '超欠产量(户)', '进度', '一级排名', '二级排名' ];
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
			} else if(data.orgLevel == "4") {
				name = "渠道名称";
				colNamesData = [ name, '当日目标值(户)', '当日放号量(户)', '超欠产量(户)', '进度','一级排名', '二级排名' ];
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
		} else if("month" == data.conditionTwo) {
			if(data.orgLevel == "1") {
				name = "地市名称";
				colNamesData = [ name, '当月目标值(户)', '当月放号量(户)', '超欠产量(户)', '进度','一级排名', '二级排名' ];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TELE_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			} else if(data.orgLevel == "2") {
				name = "区县名称";
				colNamesData = [ name, '当月目标值(户)', '当月放号量(户)', '超欠产量(户)', '进度','一级排名', '二级排名'];
				colModelData = [ 
					{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TELE_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			} else if(data.orgLevel == "3") {
				name = "网格名称";
				colNamesData = [ '网格编码', name, '当月目标值(户)', '当月放号量(户)', '超欠产量(户)', '进度','一级排名', '二级排名' ];
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
			} else if(data.orgLevel == "4") {
				name = "渠道名称";
				colNamesData = [ name, '当月目标值(户)', '当月放号量(户)', '超欠产量(户)', '进度','一级排名', '二级排名' ];
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
	else if("XZKD" == data.conditionOne) {
		url = $.cxt + "/rptcomposite/formbroadbandadd";
		var name = "";
		if("day" == data.conditionTwo) {
			if(data.orgLevel == "1") {
				name = "地市名称";
				colNamesData = [ name, '当日目标值(户)', '当日下单量(户)', '完成值(户)', '在途工单(个)', '撤单量(个)', '超欠产(户)', '完成进度','一级排名', '二级排名' ];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_SUM_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDERING_SUM_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
				];
			} else if(data.orgLevel == "2") {
				name = "区县名称";
				colNamesData = [ name, '当日目标值(户)', '当日下单量(户)', '完成值(户)', '在途工单(个)', '撤单量(个)', '超欠产(户)', '完成进度' ,'一级排名', '二级排名' ];
				colModelData = [ 
					{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_SUM_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDERING_SUM_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
				];
			} else if(data.orgLevel == "3") {
				name = "网格名称";
				colNamesData = [ '网格编码', name, '当日目标值(户)', '当日下单量(户)', '完成值(户)', '在途工单(个)', '撤单量(个)', '超欠产(户)', '完成进度','一级排名', '二级排名'];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center',cellattr: addCellAttr}, 
					{name: 'GRID_NAME', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'ORDER_SUM_D',align: 'center',cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'ORDERING_SUM_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_D', align: 'center',cellattr: addCellAttr},
	    			{name: 'OWE_D', align: 'center',cellattr: addCellAttr},
	    			{name: 'RATE_D', align: 'center',cellattr: addCellAttr,formatter:rateFormat},
	    			{name: 'ORDER1_D', align: 'center',cellattr: addCellAttr},
	    			{name: 'ORDER2_D', align: 'center',cellattr: addCellAttr}
				];
			} else if(data.orgLevel == "4") {
				name = "渠道名称";
				colNamesData = [ name, '当日目标值(户)', '当日下单量(户)', '完成值(户)', '在途工单(个)', '撤单量(个)', '超欠产(户)', '完成进度','一级排名', '二级排名' ];
				colModelData = [ 
					{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_SUM_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDERING_SUM_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
				];
			}
		} else if("month" == data.conditionTwo) {
			if(data.orgLevel == "1") {
				name = "地市名称";
				colNamesData = [ name, '当月目标值(户)', '当月下单量(户)', '完成值(户)', '其中高价值小区(个)', '其中低渗透小区(个)', '其中低零小区(个)', '在途工单(个)', '撤单量(个)', '超欠产(个)' ,'一级排名', '二级排名'];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_SUM_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'HIGH_VALUE_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_PER_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_ZERO_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDERING_SUM_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			} else if(data.orgLevel == "2") {
				name = "区县名称";
				colNamesData = [ name, '当月目标值(户)', '当月下单量(户)', '完成值(户)', '其中高价值小区(个)', '其中低渗透小区(个)', '其中低零小区(个)', '在途工单(个)', '撤单量(个)', '超欠产(个)','一级排名', '二级排名' ];
				colModelData = [ 
					{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_SUM_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'HIGH_VALUE_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_PER_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_ZERO_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDERING_SUM_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			} else if(data.orgLevel == "3") {
				name = "网格名称";
				colNamesData = [ '网格编码', name, '当月目标值(户)', '当月下单量(户)', '完成值(户)', '其中高价值小区(个)', '其中低渗透小区(个)', '其中低零小区(个)', '在途工单(个)', '撤单量(个)', '超欠产(个)','一级排名', '二级排名' ];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
					{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_SUM_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'HIGH_VALUE_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_PER_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_ZERO_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDERING_SUM_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			} else if(data.orgLevel == "4") {
				name = "渠道名称";
				colNamesData = [ name, '当月目标值(户)', '当月下单量(户)', '完成值(户)', '其中高价值小区(个)', '其中低渗透小区(个)', '其中低零小区(个)', '在途工单(个)', '撤单量(个)', '超欠产(个)','一级排名', '二级排名' ];
				colModelData = [ 
					{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_SUM_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'HIGH_VALUE_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_PER_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'LOW_ZERO_CELL', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDERING_SUM_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER_REVOKE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			}
		} else {
			return;
		}
	} 
	// 终端合约
	else if("ZDHY" == data.conditionOne) {
		url = $.cxt + "/rptcomposite/getformterminalcontract";
		if("day" == data.conditionTwo) {
			if(data.orgLevel=="1"){
				colNamesData = [ '地市名称','目标值', '当日手机终端合约(台)', '当日泛终端合约(台)', '完成值(台)', '超欠产(台)', '进度','一级排名', '二级排名' ];
				colModelData = [ 
	    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'MOBILE_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TERMINAL_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
		    		{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
		    		{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
				];
			}else if(data.orgLevel=="2"){
				colNamesData = [ '区县名称','目标值', '当日手机终端合约(台)', '当日泛终端合约(台)', '完成值(台)', '超欠产(台)', '进度','一级排名', '二级排名'];
				colModelData = [ 
	    			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'MOBILE_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TERMINAL_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
		    		{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
		    		{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
				];
			}else if(data.orgLevel=="3"){
				colNamesData = [ '网格编码', '网格名称','目标值', '当日手机终端合约(台)', '当日泛终端合约(台)', '完成值(台)', '超欠产(台)', '进度','一级排名', '二级排名'];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
					{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
					{name: 'MOBILE_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'TERMINAL_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'COMPLETE_VALUE_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
				];
			} else if(data.orgLevel == "4") {
				colNamesData = [ '渠道名称','目标值', '当日手机终端合约(台)', '当日泛终端合约(台)', '完成值(台)', '超欠产(台)', '进度','一级排名', '二级排名'];
				colModelData = [ 
	    			{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'MOBILE_CONTRACT_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TERMINAL_CONTRACT_D', align: 'center',cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_VALUE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
		    		{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
		    		{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr},
				];
			}
			
		} else {
			if(data.orgLevel=="1"){
				colNamesData = [ '地市名称', '目标值', '当月手机终端合约(台)', '当月泛终端合约(台)', '完成值(台)', '超欠产(台)', '进度','一级排名', '二级排名' ];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
					{name: 'MOBILE_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'TERMINAL_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			}else if(data.orgLevel=="2"){
				colNamesData = [ '区县名称', '目标值', '当月手机终端合约(台)', '当月泛终端合约(台)', '完成值(台)', '超欠产(台)', '进度','一级排名', '二级排名'];
				colModelData = [ 
					{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
					{name: 'MOBILE_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'TERMINAL_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			}else if(data.orgLevel=="3"){
				colNamesData = [ '网格编码', '网格名称', '目标值', '当月手机终端合约(台)', '当月泛终端合约(台)', '完成值(台)', '超欠产(台)', '进度','一级排名', '二级排名'];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
					{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
					{name: 'MOBILE_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'TERMINAL_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			} else if(data.orgLevel == "4") {
				colNamesData = [ '渠道名称', '目标值', '当月手机终端合约(台)', '当月泛终端合约(台)', '完成值(台)', '超欠产(台)', '进度','一级排名', '二级排名'];
				colModelData = [ 
					{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
					{name: 'MOBILE_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'TERMINAL_CONTRACT_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'COMPLETE_VALUE_M', align: 'center', cellattr: addCellAttr}, 
					{name: 'OWE_M', align: 'center', cellattr: addCellAttr},
					{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			}
			
		}
	} 
	// 家庭网新增
	else if("JTWXZ" == data.conditionOne) {
		url = $.cxt + "/rptcomposite/getformhomenetadd";
		if("day" == data.conditionTwo) {
			if(data.orgLevel=="1"){
				colNamesData = [ '地市名称','目标值(户)', '当日新增家庭网(户)', '超欠产量(户)','进度','一级排名', '二级排名'];
				colModelData = [ 
	    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'HOMENET_ADD_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
					{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
				];
			}else if(data.orgLevel=="2"){
				colNamesData = [ '区县名称','目标值(户)', '当日新增家庭网(户)', '超欠产量(户)','进度','一级排名', '二级排名'];
				colModelData = [ 
	    			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'HOMENET_ADD_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
					{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
				];
			}else if(data.orgLevel=="3"){
				colNamesData = [ '网格编码', '网格名称','目标值(户)', '当日新增家庭网(户)', '超欠产(户)','进度','一级排名', '二级排名'];
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
			} else if(data.orgLevel == "4") {
				colNamesData = [ '渠道名称','目标值(户)', '当日新增家庭网(户)', '超欠产量(户)','进度','一级排名', '二级排名'];
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
			if(data.orgLevel=="1"){
				colNamesData = [ '地市名称', '目标值(户)', '当月新增家庭网(户)', '超欠产量(户)','进度','一级排名', '二级排名' ];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
	    			{name: 'HOMENET_ADD_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
					{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
					{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
	    		];
			}else if(data.orgLevel=="2"){
				colNamesData = [ '区县名称', '目标值(户)', '当月新增家庭网(户)', '超欠产量(户)','进度','一级排名', '二级排名'];
				colModelData = [ 
								{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
				    			{name: 'HOMENET_ADD_M', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
								{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
								{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}];
			}else if(data.orgLevel=="3"){
				colNamesData = [ '网格编码', '网格名称', '目标值(户)', '当月新增家庭网(户)', '超欠产量(户)','进度','一级排名', '二级排名'];
				colModelData = [ 
								{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
								{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
				    			{name: 'HOMENET_ADD_M', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
								{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
								{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}];
			} else if(data.orgLevel == "4") {
				colNamesData = [ '渠道名称', '目标值(户)', '当月新增家庭网(户)', '超欠产量(户)','进度','一级排名', '二级排名'];
				colModelData = [ 
								{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'TARGET_M',align: 'center', cellattr: addCellAttr}, 
				    			{name: 'HOMENET_ADD_M', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
				    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
								{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr},
								{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}];
			}
			
		}
	} 
	// 中小微企业圈地行动
	else if("ZXWQYQDXD" == data.conditionOne) {
		url = $.cxt + "/rptcomposite/formenclosuresum";
		if("day" == data.conditionTwo) {
			if(data.orgLevel == "1"){
				colNamesData = [ '地市名称','当日目标(个)', '当日完成量(个)', '其中小微宽带(个)','其中企业上云(个)','超欠产(个)', '进度','一级排名', '二级排名'];
				colModelData = [ 
					{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
					{name: 'TARGET_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'COMPLETE_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'MIC_BRO_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'ENTERPRISE_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'OWE_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr}, 
					{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
				];
			}else if(data.orgLevel == "2"){
				colNamesData = [ '区县名称','当日目标(个)', '当日完成量(个)', '其中小微宽带(个)','其中企业上云(个)','超欠产(个)', '进度','一级排名', '二级排名'];
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
			}else if(data.orgLevel == "3"){
				colNamesData = [ '网格编码', '网格名称','当日目标(个)', '当日完成量(个)', '其中小微宽带(个)','其中企业上云(个)','超欠产(个)', '进度','一级排名', '二级排名'];
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
			} else if(data.orgLevel == "4") {
				colNamesData = [ '渠道名称','当日目标(个)', '当日完成量(个)', '其中小微宽带(个)','其中企业上云(个)','超欠产(个)', '进度','一级排名', '二级排名'];
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
			if(data.orgLevel=="1"){
				colNamesData = [ '地市名称','当月目标(个)', '当月完成量(个)', '其中小微宽带(个)','其中企业上云(个)','超欠产(个)', '进度','一级排名', '二级排名'];
				colModelData = [ 
	    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'COMPLETE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'MIC_BRO_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ENTERPRISE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'OWE_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'RATE_M', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'ORDER1_M', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'ORDER2_M', align: 'center', cellattr: addCellAttr}
				];
			}else if(data.orgLevel=="2"){
				colNamesData = [ '区县名称','当月目标(个)', '当月完成量(个)', '其中小微宽带(个)','其中企业上云(个)','超欠产(个)', '进度','一级排名', '二级排名'];
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
			}else if(data.orgLevel=="3"){
				colNamesData = [ '网格编码', '网格名称','当月目标(个)', '当月完成量(个)', '其中小微宽带(个)','其中企业上云(个)','超欠产(个)', '进度','一级排名', '二级排名'];
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
			} else if(data.orgLevel == "4") {
				colNamesData = [ '渠道名称','当月目标(个)', '当月完成量(个)', '其中小微宽带(个)','其中企业上云(个)','超欠产(个)', '进度','一级排名', '二级排名'];
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
	$('#idx_table').GridUnload();
	$('#idx_table').jqGrid({
		url: url,
		datatype: "json",
		mtype: "POST",
		height: 402,
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
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#idx_grid-pager',
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			//表格宽度自适应
			topjqGridLoadComplete();
		}
	});
	//字体颜色修改
	function addCellAttr(rowId, val, rawObject, cm, rdata) {
		return "style='color:white'";
	}
	//小数点转化成百分号
	function rateFormat(celval, options, rowdata){
		return (celval * 100).toFixed(2) + "%";
	}

	// 汇总信息
	if ("FH" == data.conditionOne) {
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
					magic_number("当月目标值", "当月放号量", json.data == "" || json.data == null ? 0 : json.data.TARGET_M, json.data == "" || json.data == null ? 0 : json.data.TELE_M);
				}
			}
		});
	} else if("XZKD" == data.conditionOne) {
		$.ajax({
			url: $.cxt + "/rptcomposite/totalinfo",
			data: {
				json: JSON.stringify(data)
	        },
			type: "POST",
			success: function(result) {
				var json = JSON.parse(result);
				if(data.conditionTwo=="day"){
					magic_number("当日目标值", "当日下单量", json.data == "" || json.data == null ? 0 : json.data.TARGET_D, json.data == "" || json.data == null ? 0 : json.data.ORDER_SUM_D);
				}else{
					magic_number("当月目标值", "当月下单量", json.data == "" || json.data == null ? 0 : json.data.TARGET_M, json.data == "" || json.data == null ? 0 : json.data.ORDER_SUM_M);
				}
			
			}
		});
	} else if("ZDHY" == data.conditionOne) {
		$.ajax({
			url: url+"sum",
			type: 'POST',
			data: {json: JSON.stringify(data)},
			async: false,
			success: function(result) {
				if(data.conditionTwo == "day"){
					magic_number("当日目标值", "当日手机终端合约", result == "" || result == null ? 0 : result[0].TARGET_D, result == "" || result == null ? 0 : result[0].MOBILE_CONTRACT_D);
				}else{
					magic_number("当月目标值", "当月手机终端合约", result == "" || result == null ? 0 : result[0].TARGET_M, result == "" || result == null ? 0 : result[0].MOBILE_CONTRACT_M);
				}
			}
		});
	} else if("JTWXZ" == data.conditionOne) {
		$.ajax({
			url: url+"sum",
			type: 'POST',
			data: {json: JSON.stringify(data)},
			async: false,
			success: function(result) {
				var json = JSON.parse(result);
				if(data.conditionTwo == "day") {
					magic_number("当日目标值", "当日新增家庭网", json.data == "" || json.data == null ? 0 : json.data.TARGET_D, json == "" || json.data == null ? 0 : json.data.HOMENET_ADD_D);
				} else {
					magic_number("当月目标值", "当月新增家庭网", json.data == "" || json.data == null ? 0 : json.data.TARGET_M, json == "" || json.data == null ? 0 : json.data.HOMENET_ADD_M);
				}
			}
		});
	} else if("ZXWQYQDXD" == data.conditionOne) {
		$.ajax({
			url : $.cxt + "/rptcomposite/getSumFormEnclosureSum",
			type: 'POST',
			data: {json: JSON.stringify(data)},
			async: false,
			success: function(result) {
				$("#numberOne").empty();
				$("#numberTwo").empty();
			if(data.conditionTwo=="day"){
				if(result!=null&&result!=''){
					magic_number("当日目标", "当日完成量", result.TARGET_D, result.COMPLETE_D);
				}else{
					magic_number("当日目标", "当日目标", 0, 0);
				}
			}else{
				if(result!=null&&result!=''){
					magic_number("当月目标", "当月完成量", result.TARGET_M, result.COMPLETE_M);
				}else{
					magic_number("当月目标", "当月完成量", 0, 0);
				}
			}
				
					
			}
		});
	}
	// 加载顶部echart
	countTwo(data);
}

function magic_number(totalOne, totalTwo, valueOne, valueTwo) {  
	var numOne = $("#numberOne");
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
};

// 没有二级菜单（当日或者当月）条件的查询
function loadCompositeOnlyOneConditionList(orgId, orgLevel, conditionOne) {
	var data = {
		orgId: orgId,
		orgLevel: orgLevel,
		statisDate: $("#dv_date").val(),
		gcFalg:$("#conditionTwoXWSC option:selected").val(),
		conditionOne: conditionOne,
		conditionTwo: conditionTwo,
	};
	var colNamesData = [];
	var colModelData = [];
	var url = "";
	
	// 根据conditionOne第一个条件，将表格的表头设置出来
	// 高价值低占小区渗透提升查询
	if("GJZDZXQSTTS" == conditionOne) {
		url = $.cxt + "/rptcomposite/getInfiltrationCellGroupByArea";
		var areaName = "";
		if (orgLevel == '1'){
			areaName = "地市名称";
		} else if (orgLevel == '2') {
			areaName = "区县名称";
		} else if (orgLevel == '3') {
			areaName = "网格名称";
		} else if (orgLevel == '4') {
			areaName = "渠道名称";
		}
		if (orgLevel == '1') {
			colNamesData=[ areaName , '当月提升目标值', '高价值低占小区宽带九级地址数(个)', '高价值低占小区已用九级地址数(个)', '当月渗透率', '上月渗透率', '提升值', '超欠产(个)','一级排名', '二级排名' ];
			colModelData = [ 
    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET',align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr, width: '210'}, 
    			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr, width: '210'}, 
    			{name: 'PERMEABILITY', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'PERMEABILITY_LASTPERIOD', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
    			{name: 'ADD_SUM', align: 'center', cellattr: addCellAttr, formatter:rateFormat},
    			{name: 'OWE', align: 'center', cellattr: addCellAttr},
    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr}
    		];
		} else if (orgLevel == '2' || orgLevel == '3' || orgLevel == '4') {
			if(orgLevel == "3") {
				colNamesData = [ '网格编码', areaName , '当月提升目标值', '高价值低占小区宽带九级地址数(个)', '高价值低占小区已用九级地址数(个)', '当月渗透率', '上月渗透率', '提升值', '超欠产(个)','一级排名', '二级排名' ];
				colModelData = [ 
					{name: 'GRID_CODE', hidden: true, align: 'center', cellattr: addCellAttr}, 
	    			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
	    			{name: 'TARGET',align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr, width: '210'}, 
	    			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr, width: '210'}, 
	    			{name: 'PERMEABILITY', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
	    			{name: 'PERMEABILITY_LASTPERIOD', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'ADD_SUM', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
	    			{name: 'OWE', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
	    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr}
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
				colNamesData = [ areaName , '当月提升目标值', '高价值低占小区宽带九级地址数(个)', '高价值低占小区已用九级地址数(个)', '当月渗透率', '上月渗透率', '提升值', '超欠产(个)','一级排名', '二级排名' ];
				if(orgLevel == "2"){
					colModelData = [ 
					    			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
					    			{name: 'TARGET',align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr, width: '210'}, 
					    			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr, width: '210'}, 
					    			{name: 'PERMEABILITY', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					    			{name: 'PERMEABILITY_LASTPERIOD', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
					    			{name: 'ADD_SUM', align: 'center', cellattr: addCellAttr},
					    			{name: 'OWE', align: 'center', cellattr: addCellAttr},
					    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
					    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr},
					    		];
				}
				if(orgLevel == "4"){
					colModelData = [ 
					    			{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
					    			{name: 'TARGET',align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr, width: '210'}, 
					    			{name: 'CELL_NUM', align: 'center', cellattr: addCellAttr, width: '210'}, 
					    			{name: 'PERMEABILITY', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
					    			{name: 'PERMEABILITY_LASTPERIOD', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
					    			{name: 'ADD_SUM', align: 'center', cellattr: addCellAttr},
					    			{name: 'OWE', align: 'center', cellattr: addCellAttr},
					    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
					    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr},
					    		];
				}
			}
		}
	} 
	// 新增价值洼地查询
	else if("XZJZWC" == conditionOne) {
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
			colNamesData = [ areaName , '当月目标值(个)', '90后到达客户数(个)', '欠产(个)', '进度','一级排名', '二级排名' ];
			colModelData = [ 
    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET',align: 'center', cellattr: addCellAttr}, 
    			{name: 'CELL_SUM', align: 'center', cellattr: addCellAttr}, 
    			{name: 'OWE', align: 'center', cellattr: addCellAttr}, 
    			{name: 'RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'ORDER1', align: 'center', cellattr: addCellAttr},
    			{name: 'ORDER2', align: 'center', cellattr: addCellAttr}
    		];
		} else if (orgLevel == '2' || orgLevel == '3' || orgLevel == '4') {
			if(orgLevel == "3") {
				colNamesData=[ '网格编码', areaName , '当月目标值(个)', '90后到达客户数(个)', '欠产(个)', '进度','一级排名', '二级排名' ];
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
					oneLevel = "地市";
					twoLevel = "全省";
				} else {
					oneLevel = "网格";
					twoLevel = "区县";
				}
				colNamesData=[ areaName , '当月目标值(个)', '90后到达客户数(个)', '欠产(个)', '进度','一级排名', '二级排名' ];
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
				else if(orgLevel == "4"){
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
	else if("TBKHGYRHL" == conditionOne) {
		url = $.cxt + "/rptcomposite/formcustomerfusion";
		if(orgLevel == 1) {
			colNamesData = ['地市名称', '当月目标值', '头部客户数(个)', '固移融合头部客户(个)', '头部客户固移融合率', '超欠产(个)', '进度','一级排名', '二级排名'];
			colModelData = [
                {name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
                {name: 'TARGET', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
                {name: 'HEAD_CLIENT', align: 'center', cellattr: addCellAttr}, 
                {name: 'FUSE_TYPE_BRO', align: 'center', cellattr: addCellAttr}, 
                {name: 'FUSE_RETA', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
                {name: 'OWE', align: 'center', cellattr: addCellAttr}, 
                {name: 'RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
                {name: 'ORDER1', align: 'center', cellattr: addCellAttr},
                {name: 'ORDER2', align: 'center', cellattr: addCellAttr}
        	];
		} else if(orgLevel == 2) {
			colNamesData = ['区县名称', '当月目标值', '头部客户数(个)', '固移融合头部客户(个)', '头部客户固移融合率', '超欠产(个)', '进度','一级排名', '二级排名'];
			colModelData = [
                {name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
                {name: 'TARGET', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
                {name: 'HEAD_CLIENT', align: 'center', cellattr: addCellAttr}, 
                {name: 'FUSE_TYPE_BRO', align: 'center', cellattr: addCellAttr}, 
                {name: 'FUSE_RETA', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
                {name: 'OWE', align: 'center', cellattr: addCellAttr}, 
                {name: 'RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
                {name: 'ORDER1', align: 'center', cellattr: addCellAttr},
                {name: 'ORDER2', align: 'center', cellattr: addCellAttr}
        	];
		}else if(orgLevel == 3) {
			colNamesData = [ '网格编码', '网格名称', '当月目标值', '头部客户数(个)', '固移融合头部客户(个)', '头部客户固移融合率', '超欠产(个)', '进度','一级排名', '二级排名'];
			colModelData = [
                {name: 'GRID_CODE', align: 'center', hidden: true, cellattr: addCellAttr}, 
                {name: 'GRID_NAME', align: 'center',cellattr: addCellAttr}, 
                {name: 'TARGET', align: 'center',cellattr: addCellAttr, formatter:rateFormat}, 
                {name: 'HEAD_CLIENT', align: 'center',cellattr: addCellAttr}, 
                {name: 'FUSE_TYPE_BRO', align: 'center',cellattr: addCellAttr}, 
                {name: 'FUSE_RETA', align: 'center',cellattr: addCellAttr, formatter:rateFormat}, 
                {name: 'OWE', align: 'center',cellattr: addCellAttr}, 
                {name: 'RATE', align: 'center',cellattr: addCellAttr, formatter:rateFormat}, 
                {name: 'ORDER1', align: 'center',cellattr: addCellAttr},
                {name: 'ORDER2', align: 'center',cellattr: addCellAttr}
        	];
		} else if(orgLevel == 4) {
			colNamesData = [ '渠道名称', '当月目标值', '头部客户数(个)', '固移融合头部客户(个)', '头部客户固移融合率', '超欠产(个)', '进度','一级排名', '二级排名'];
			colModelData = [
                {name: 'CHNL_NAME', align: 'center',cellattr: addCellAttr}, 
                {name: 'TARGET', align: 'center',cellattr: addCellAttr, formatter:rateFormat}, 
                {name: 'HEAD_CLIENT', align: 'center',cellattr: addCellAttr}, 
                {name: 'FUSE_TYPE_BRO', align: 'center',cellattr: addCellAttr}, 
                {name: 'FUSE_RETA', align: 'center',cellattr: addCellAttr, formatter:rateFormat}, 
                {name: 'OWE', align: 'center',cellattr: addCellAttr}, 
                {name: 'RATE', align: 'center',cellattr: addCellAttr, formatter:rateFormat}, 
                {name: 'ORDER1', align: 'center',cellattr: addCellAttr},
                {name: 'ORDER2', align: 'center',cellattr: addCellAttr}
        	];
		}
	} 
	// 小微市场查询
	else if("XWSC" == conditionOne) {
		url = $.cxt + "/rptcomposite/formSmallMarket";
		if(orgLevel == 1) {
			colNamesData = ['地市名称', '中小微企业名称','中小微企业编码','企业规模','标识（1-酒店宾馆/2-楼宇园区/3-沿街商铺）','已办理小微宽带条数','已办理企业上云套餐数','已办理和酒店数','集团V网客户数'];
			colModelData = [
			                {name: 'AREA_NAME', align: 'center', cellattr: addCellAttr}, 
			                {name: 'GC_NAME', align: 'center', cellattr: addCellAttr},
			                {name: 'GC_CODE', align: 'center',hidden: true, cellattr: addCellAttr},
			                {name: 'GC_SIZE', align: 'center', cellattr: addCellAttr},
			                {name: 'GC_FALG', align: 'center', cellattr: addCellAttr},
			                {name: 'KD_CNT', align: 'center', cellattr: addCellAttr},
			                {name: 'QSY_CNT', align: 'center', cellattr: addCellAttr},
			                {name: 'HJD_CNT', align: 'center', cellattr: addCellAttr},
			                {name: 'VUSR_CNT', align: 'center', cellattr: addCellAttr}
			                ];
		} else if(orgLevel == 2) {
			colNamesData = ['区县名称', '中小微企业名称','中小微企业编码','企业规模','标识（1-酒店宾馆/2-楼宇园区/3-沿街商铺）','已办理小微宽带条数','已办理企业上云套餐数','已办理和酒店数','集团V网客户数'];
			colModelData = [
			                {name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
			                {name: 'GC_NAME', align: 'center', cellattr: addCellAttr},
			                {name: 'GC_CODE', align: 'center',hidden: true, cellattr: addCellAttr},
			                {name: 'GC_SIZE', align: 'center', cellattr: addCellAttr},
			                {name: 'GC_FALG', align: 'center', cellattr: addCellAttr},
			                {name: 'KD_CNT', align: 'center', cellattr: addCellAttr},
			                {name: 'QSY_CNT', align: 'center', cellattr: addCellAttr},
			                {name: 'HJD_CNT', align: 'center', cellattr: addCellAttr},
			                {name: 'VUSR_CNT', align: 'center', cellattr: addCellAttr}
			                ];
		}else if(orgLevel == 3) {
			colNamesData = [ '网格编码', '网格名称', '中小微企业名称','中小微企业编码','企业规模','标识（1-酒店宾馆/2-楼宇园区/3-沿街商铺）','已办理小微宽带条数','已办理企业上云套餐数','已办理和酒店数','集团V网客户数'];
			colModelData = [
			                {name: 'GRID_CODE', align: 'center', hidden: true, cellattr: addCellAttr}, 
			                {name: 'GRID_NAME', align: 'center',cellattr: addCellAttr}, 
			                {name: 'GC_NAME', align: 'center', cellattr: addCellAttr},
			                {name: 'GC_CODE', align: 'center',hidden: true, cellattr: addCellAttr},
			                {name: 'GC_SIZE', align: 'center', cellattr: addCellAttr},
			                {name: 'GC_FALG', align: 'center', cellattr: addCellAttr},
			                {name: 'KD_CNT', align: 'center', cellattr: addCellAttr},
			                {name: 'QSY_CNT', align: 'center', cellattr: addCellAttr},
			                {name: 'HJD_CNT', align: 'center', cellattr: addCellAttr},
			                {name: 'VUSR_CNT', align: 'center', cellattr: addCellAttr}
			                ];
		} else if(orgLevel == 4) {
			colNamesData = [ '中小微企业名称','中小微企业编码','企业规模','标识（1-酒店宾馆/2-楼宇园区/3-沿街商铺）','已办理小微宽带条数','已办理企业上云套餐数','已办理和酒店数','集团V网客户数'];
			colModelData = [
			                {name: 'GC_NAME', align: 'center', cellattr: addCellAttr},
			                {name: 'GC_CODE', align: 'center',hidden: true, cellattr: addCellAttr},
			                {name: 'GC_SIZE', align: 'center', cellattr: addCellAttr},
			                {name: 'GC_FALG', align: 'center', cellattr: addCellAttr},
			                {name: 'KD_CNT', align: 'center', cellattr: addCellAttr},
			                {name: 'QSY_CNT', align: 'center', cellattr: addCellAttr},
			                {name: 'HJD_CNT', align: 'center', cellattr: addCellAttr},
			                {name: 'VUSR_CNT', align: 'center', cellattr: addCellAttr}
			                ];
		}
	} 
	//校园客户
	else if("XYKH" == conditionOne) {
		url = $.cxt + "/rptcomposite/formSchoolCustomer";
		if(orgLevel == 1) {
			colNamesData = ['地市名称', '校园编码','校园名称','校园移网到达客户数','已加入校园网集团客户比例','固移融合率','校园移网份额','电信校园移网份额','联通校园移网份额','校园宽带到达客户数','校园固网(宽带)份额','电信校园固网份额','联通校园固网份额'];
			colModelData = [
			                {name: 'SCH_AREA_NAME', align: 'center', cellattr: addCellAttr}, 
			                {name: 'SCH_ID', align: 'center',hidden: true, cellattr: addCellAttr},
			                {name: 'SCH_NAME', align: 'center', cellattr: addCellAttr},
			                {name: 'CMCC_NUM', align: 'center', cellattr: addCellAttr},
			                {name: 'VNET_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'TELE_MOBILE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CMCC_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CTCC_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CUCC_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'KD_NUM', align: 'center', cellattr: addCellAttr},
			                {name: 'CMCC_TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CTCC_TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CUCC_TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}
			                ];
		} else if(orgLevel == 2) {
			colNamesData = ['区县名称', '校园编码','校园名称','校园移网到达客户数','已加入校园网集团客户比例','固移融合率','校园移网份额','电信校园移网份额','联通校园移网份额','校园宽带到达客户数','校园固网(宽带)份额','电信校园固网份额','联通校园固网份额'];
			colModelData = [
			                {name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
			                {name: 'SCH_ID', align: 'center',hidden: true, cellattr: addCellAttr},
			                {name: 'SCH_NAME', align: 'center', cellattr: addCellAttr},
			                {name: 'CMCC_NUM', align: 'center', cellattr: addCellAttr},
			                {name: 'VNET_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'TELE_MOBILE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CMCC_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CTCC_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CUCC_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'KD_NUM', align: 'center', cellattr: addCellAttr},
			                {name: 'CMCC_TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CTCC_TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CUCC_TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}
			                ];
		}else if(orgLevel == 3) {
			colNamesData = [ '网格编码', '网格名称', '校园编码','校园名称','校园移网到达客户数','已加入校园网集团客户比例','固移融合率','校园移网份额','电信校园移网份额','联通校园移网份额','校园宽带到达客户数','校园固网(宽带)份额','电信校园固网份额','联通校园固网份额'];
			colModelData = [
			                {name: 'GRID_CODE', align: 'center', hidden: true, cellattr: addCellAttr}, 
			                {name: 'GRID_NAME', align: 'center',cellattr: addCellAttr}, 
			                {name: 'SCH_ID', align: 'center',hidden: true, cellattr: addCellAttr},
			                {name: 'SCH_NAME', align: 'center', cellattr: addCellAttr},
			                {name: 'CMCC_NUM', align: 'center', cellattr: addCellAttr},
			                {name: 'VNET_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'TELE_MOBILE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CMCC_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CTCC_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CUCC_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'KD_NUM', align: 'center', cellattr: addCellAttr},
			                {name: 'CMCC_TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CTCC_TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
			                {name: 'CUCC_TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}
			                ];
		} else if(orgLevel == 4) {
			colNamesData = [ '校园编码','校园名称','校园移网到达客户数','已加入校园网集团客户比例','固移融合率','校园移网份额','电信校园移网份额','联通校园移网份额','校园宽带到达客户数','校园固网(宽带)份额','电信校园固网份额','联通校园固网份额'];
			colModelData = [
			                {name: 'SCH_ID', align: 'center',hidden: true, cellattr: addCellAttr},
							{name: 'SCH_NAME', align: 'center', cellattr: addCellAttr},
							{name: 'CMCC_NUM', align: 'center', cellattr: addCellAttr},
							{name: 'VNET_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
							{name: 'TELE_MOBILE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
							{name: 'CMCC_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
							{name: 'CTCC_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
							{name: 'CUCC_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
							{name: 'KD_NUM', align: 'center', cellattr: addCellAttr},
							{name: 'CMCC_TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
							{name: 'CTCC_TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
							{name: 'CUCC_TELE_RATE', align: 'center', cellattr: addCellAttr, formatter: rateFormat}
			                ];
		}
	} 
	// 头部客户整体情况查询
	else if("TBKHZTQK" == conditionOne) {
		url = $.cxt + "/rptcomposite/formcustomeroverall";
		if(orgLevel == 1) {
			colNamesData = ['地市名称', '2018期末客户规模','2018年期末其中头部客户','2018年期末其中中部客户','2018年期末其中低端客户','上月期末客户规模','上月期末其中头部客户','上月期末其中中部客户','上月期末其中低端客户','本月期末客户规模','本月期末其中头部客户','本月期末其中中部客户','本月期末其中低端客户','月累计净增','月累计环比','月累计升档至头部客户','月累计降档出头部客户','月累计离网头部客户','月累计其中：网龄1年以内客户占比','月累计其中：网龄1-2年客户占比','月累计其中：网龄2年以上客户占比','年累计净增','年累计净增幅度','年累计升档至头部客户','年累计降档出头部客户','年累计离网头部客户','年累计其中：网龄1年以内客户占比','年累计其中：网龄1-2年客户占比','年累计其中：网龄2年以上客户占比'];
			colModelData = [
                {name: 'AREA_NAME', align: 'center', cellattr: addCellAttr}, 
                {name: 'USR_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'TB_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'ZB_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'DD_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'USR_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'TB_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'ZB_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'DD_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'USR_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'TB_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'ZB_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'DD_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'JINZ_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'GB_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'UP_TB', align: 'center', cellattr: addCellAttr},
                {name: 'DOWN_TB', align: 'center', cellattr: addCellAttr},
                {name: 'LW_TB', align: 'center', cellattr: addCellAttr},
                {name: 'NET_MON_1', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'NET_MON_2', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'NET_MON_3', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_JINZ_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_GB_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_UP_TB', align: 'center', cellattr: addCellAttr},
                {name: 'Y_DOWN_TB', align: 'center', cellattr: addCellAttr},
                {name: 'Y_LW_TB', align: 'center', cellattr: addCellAttr},
                {name: 'Y_NET_MON_1', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_NET_MON_2', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_NET_MON_3', align: 'center', cellattr: addCellAttr, formatter: rateFormat}
        	];
		} else if(orgLevel == 2) {
			colNamesData = ['区县名称', '2018期末客户规模','2018年期末其中头部客户','2018年期末其中中部客户','2018年期末其中低端客户','上月期末客户规模','上月期末其中头部客户','上月期末其中中部客户','上月期末其中低端客户','本月期末客户规模','本月期末其中头部客户','本月期末其中中部客户','本月期末其中低端客户','月累计净增','月累计环比','月累计升档至头部客户','月累计降档出头部客户','月累计离网头部客户','月累计其中：网龄1年以内客户占比','月累计其中：网龄1-2年客户占比','月累计其中：网龄2年以上客户占比','年累计净增','年累计净增幅度','年累计升档至头部客户','年累计降档出头部客户','年累计离网头部客户','年累计其中：网龄1年以内客户占比','年累计其中：网龄1-2年客户占比','年累计其中：网龄2年以上客户占比'];
			colModelData = [
                {name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
                {name: 'USR_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'TB_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'ZB_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'DD_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'USR_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'TB_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'ZB_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'DD_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'USR_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'TB_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'ZB_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'DD_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'JINZ_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'GB_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'UP_TB', align: 'center', cellattr: addCellAttr},
                {name: 'DOWN_TB', align: 'center', cellattr: addCellAttr},
                {name: 'LW_TB', align: 'center', cellattr: addCellAttr},
                {name: 'NET_MON_1', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'NET_MON_2', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'NET_MON_3', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_JINZ_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_GB_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_UP_TB', align: 'center', cellattr: addCellAttr},
                {name: 'Y_DOWN_TB', align: 'center', cellattr: addCellAttr},
                {name: 'Y_LW_TB', align: 'center', cellattr: addCellAttr},
                {name: 'Y_NET_MON_1', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_NET_MON_2', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_NET_MON_3', align: 'center', cellattr: addCellAttr, formatter: rateFormat}
        	];
		}else if(orgLevel == 3) {
			colNamesData = [ '网格编码', '网格名称' ,'2018期末客户规模','2018年期末其中头部客户','2018年期末其中中部客户','2018年期末其中低端客户','上月期末客户规模','上月期末其中头部客户','上月期末其中中部客户','上月期末其中低端客户','本月期末客户规模','本月期末其中头部客户','本月期末其中中部客户','本月期末其中低端客户','月累计净增','月累计环比','月累计升档至头部客户','月累计降档出头部客户','月累计离网头部客户','月累计其中：网龄1年以内客户占比','月累计其中：网龄1-2年客户占比','月累计其中：网龄2年以上客户占比','年累计净增','年累计净增幅度','年累计升档至头部客户','年累计降档出头部客户','年累计离网头部客户','年累计其中：网龄1年以内客户占比','年累计其中：网龄1-2年客户占比','年累计其中：网龄2年以上客户占比'];
			colModelData = [
                {name: 'GRID_CODE', align: 'center', hidden: true, cellattr: addCellAttr}, 
                {name: 'GRID_NAME', align: 'center',cellattr: addCellAttr}, 
                {name: 'USR_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'TB_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'ZB_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'DD_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'USR_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'TB_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'ZB_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'DD_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'USR_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'TB_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'ZB_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'DD_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'JINZ_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'GB_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'UP_TB', align: 'center', cellattr: addCellAttr},
                {name: 'DOWN_TB', align: 'center', cellattr: addCellAttr},
                {name: 'LW_TB', align: 'center', cellattr: addCellAttr},
                {name: 'NET_MON_1', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'NET_MON_2', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'NET_MON_3', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_JINZ_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_GB_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_UP_TB', align: 'center', cellattr: addCellAttr},
                {name: 'Y_DOWN_TB', align: 'center', cellattr: addCellAttr},
                {name: 'Y_LW_TB', align: 'center', cellattr: addCellAttr},
                {name: 'Y_NET_MON_1', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_NET_MON_2', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_NET_MON_3', align: 'center', cellattr: addCellAttr, formatter: rateFormat}
        	];
		} else if(orgLevel == 4) {
			colNamesData = [ '网格名称', '2018期末客户规模','2018年期末其中头部客户','2018年期末其中中部客户','2018年期末其中低端客户','上月期末客户规模','上月期末其中头部客户','上月期末其中中部客户','上月期末其中低端客户','本月期末客户规模','本月期末其中头部客户','本月期末其中中部客户','本月期末其中低端客户','月累计净增','月累计环比','月累计升档至头部客户','月累计降档出头部客户','月累计离网头部客户','月累计其中：网龄1年以内客户占比','月累计其中：网龄1-2年客户占比','月累计其中：网龄2年以上客户占比','年累计净增','年累计净增幅度','年累计升档至头部客户','年累计降档出头部客户','年累计离网头部客户','年累计其中：网龄1年以内客户占比','年累计其中：网龄1-2年客户占比','年累计其中：网龄2年以上客户占比'];
			colModelData = [
                {name: 'GRID_NAME', align: 'center',cellattr: addCellAttr}, 
                {name: 'USR_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'TB_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'ZB_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'DD_CNT_2018', align: 'center', cellattr: addCellAttr},
                {name: 'USR_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'TB_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'ZB_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'DD_CNT_L1M', align: 'center', cellattr: addCellAttr},
                {name: 'USR_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'TB_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'ZB_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'DD_CNT_M', align: 'center', cellattr: addCellAttr},
                {name: 'JINZ_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'GB_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'UP_TB', align: 'center', cellattr: addCellAttr},
                {name: 'DOWN_TB', align: 'center', cellattr: addCellAttr},
                {name: 'LW_TB', align: 'center', cellattr: addCellAttr},
                {name: 'NET_MON_1', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'NET_MON_2', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'NET_MON_3', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_JINZ_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_GB_TB', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_UP_TB', align: 'center', cellattr: addCellAttr},
                {name: 'Y_DOWN_TB', align: 'center', cellattr: addCellAttr},
                {name: 'Y_LW_TB', align: 'center', cellattr: addCellAttr},
                {name: 'Y_NET_MON_1', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_NET_MON_2', align: 'center', cellattr: addCellAttr, formatter: rateFormat},
                {name: 'Y_NET_MON_3', align: 'center', cellattr: addCellAttr, formatter: rateFormat}
        	];
		}
	} 
	// 个人客户总计费收入查询
	else if("GRKHZJFSR" == conditionOne) {
		url = $.cxt + "/rptcomposite/getFormCustomerFeeInfo";
		if(orgLevel == 1 ) {
			colNamesData = ['地市名称', '计费收入目标值(万元)', '当日收入(万元)', '当月累计收入(万元)', '进度','一级排名', '二级排名'];
			colModelData = [ 
    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_D', align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_M', align: 'center', cellattr: addCellAttr},  
    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
    		];
		} else if(orgLevel == 2) {
			colNamesData = ['区县名称', '计费收入目标值(万元)', '当日收入(万元)', '当月累计收入(万元)', '进度','一级排名', '二级排名'];
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
			colNamesData = [ '网格编码', '网格名称', '计费收入目标值(万元)', '当日收入(万元)', '当月累计收入(万元)', '进度','一级排名', '二级排名'];
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
			colNamesData = ['渠道名称', '计费收入目标值(万元)', '当日收入(万元)', '当月累计收入(万元)', '进度','一级排名', '二级排名'];
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
	// 新增客户总计费收入查询
	else if("XZKHZJFSR" == conditionOne) {
		url = $.cxt + "/rptcomposite/getFormCustomerFeeInfo";
		if(orgLevel == 1 ) {
			colNamesData = ['地市名称', '计费收入目标值(万元)', '当日收入(万元)', '当月累计收入(万元)', '进度','一级排名', '二级排名'];
			colModelData = [ 
    			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
    			{name: 'TARGET_D',align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_D', align: 'center', cellattr: addCellAttr}, 
    			{name: 'FEE_M', align: 'center', cellattr: addCellAttr},  
    			{name: 'RATE_D', align: 'center', cellattr: addCellAttr, formatter: rateFormat}, 
    			{name: 'ORDER1_D', align: 'center', cellattr: addCellAttr},
    			{name: 'ORDER2_D', align: 'center', cellattr: addCellAttr}
    		];
		} else if(orgLevel == 2) {
			colNamesData = ['区县名称', '计费收入目标值(万元)', '当日收入(万元)', '当月累计收入(万元)', '进度','一级排名', '二级排名'];
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
			colNamesData=[ '网格编码', '网格名称', '计费收入目标值(万元)', '当日收入(万元)', '当月累计收入(万元)', '进度','一级排名', '二级排名'];
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
			colNamesData = ['渠道名称','计费收入目标值(万元)','当日收入(万元)','当月累计收入(万元)','进度','一级排名', '二级排名'];
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
	$('#idx_table').GridUnload();
	$('#idx_table').jqGrid({
		url: url,
		datatype: "json",
		mtype: "POST",
		height: 402,
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
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#idx_grid-pager',
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			//表格宽度自适应
			topjqGridLoadComplete();
		}
	});
	
	//字体颜色修改
	function addCellAttr(rowId, val, rawObject, cm, rdata) {
		return "style='color: white'";
	}
	
	//小数点转化成百分号
	function rateFormat(celval, options, rowdata){
		return (celval * 100).toFixed(2) + "%";
	}
	
	if ("GRKHZJFSR" == conditionOne) {
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
	} else if("XZKHZJFSR" == conditionOne) {
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
	} else if ("GJZDZXQSTTS" == conditionOne) {
		$.ajax({
			url: $.cxt + "/rptcomposite/getInfiltrationCellSummary",
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
						hzone = '0%';
					} else{
						hzone = (hzone * 100).toFixed(2) + '%';
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
	} else if ("XZJZWC" == conditionOne) {
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
	} else if("TBKHGYRHL" == data.conditionOne) {
		$.ajax({
			url: $.cxt + "/rptcomposite/getSumFormCustomerFusion",
			type: 'POST',
			data: {json: JSON.stringify(data)},
			async: false,
			success: function(data) {
				//客户 HEAD_CLIENT
				$("#numberOne").empty();
				$("#numberTwo").empty();
				if(data != null && data != '') {
					magic_number("目标值", "头部客户融合率", (data.TARGET*100).toFixed(2)+'%', (data.FUSE_RETA*100).toFixed(2)+'%');
				} else {
					magic_number("目标值", "头部客户数", 0, 0);
				}
			}
		});
	}else if("TBKHZTQK" == data.conditionOne) {
		$.ajax({
			url: $.cxt + "/rptcomposite/getSumFormCustomerOverall",
			type: 'POST',
			data: {json: JSON.stringify(data)},
			async: false,
			success: function(data) {
				//客户 HEAD_CLIENT
				$("#numberOne").empty();
				$("#numberTwo").empty();
				if(data != null && data != '') {
					magic_number("上月客户规模", "本月客户规模", data.TARGET, data.FUSE_RETA);
				} else {
					magic_number("上月客户规模", "本月客户规模", 0, 0);
				}
			}
		});
	}else if("XWSC" == data.conditionOne) {
		$.ajax({
			url: $.cxt + "/rptcomposite/getSumFormSmallMarket",
			type: 'POST',
			data: {json: JSON.stringify(data)},
			async: false,
			success: function(data) {
				//客户 HEAD_CLIENT
				$("#numberOne").empty();
				$("#numberTwo").empty();
				if(data != null && data != '') {
					magic_number("中小微企业数量", "已办理小微宽带数", data.TARGET, data.FUSE_RETA);
				} else {
					magic_number("中小微企业数量", "已办理小微宽带数", 0, 0);
				}
			}
		});
	}else if("XYKH" == data.conditionOne) {
		$.ajax({
			url: $.cxt + "/rptcomposite/getSumFormSchoolCustomer",
			type: 'POST',
			data: {json: JSON.stringify(data)},
			async: false,
			success: function(data) {
				//客户 HEAD_CLIENT
				$("#numberOne").empty();
				$("#numberTwo").empty();
				if(data != null && data != '') {
					magic_number("校园移网份额", "异网总数", (data.TARGET*100).toFixed(2)+'%', (data.FUSE_RETA*100).toFixed(2)+'%');
				} else {
					magic_number("校园移网份额", "异网总数", 0, 0);
				}
			}
		});
	}
	// 加载顶部echart
	countTwo(data);
}

// 滚动条样式
function dayReportFormsetNiceScroll() {
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight: $(window).height() - 190,
		cursorcolor: "#5cd4f8",
		cursorborder: "1px solid #5cd4f8",
		touchbehavior: false,
		spacebarenabled: true,
		railoffset: false
	});
}

// 搜索
$("#searchPoiInfo").on("change", searchPoiInfo);
function searchPoiInfo() {
	$("#idx_table").empty();
	var conditionThree = $("#conditionThree option:selected").val();
	var orgId = $("#hiddenOldOrgId").val();
	var data = {
		orgId: orgId,
		conditionThree: conditionThree,
	};
	var colNamesData = [];
	var colModelData = [];
	var url = "";
	if("channel" == conditionThree) {
		
	} else if("station" == conditionThree) {
		
	} else if("netCommunity" == conditionThree) {
		
	} else if("importantCommunity" == conditionThree) {
		
	} else if("abGroup" == conditionThree) {
		
	} else if("cdGroup" == conditionThree) {
		
	} else if("manager" == conditionThree) {
		
	}
	$('#idx_table').GridUnload();
	$('#idx_table').jqGrid({
		url: url,
		datatype: "json",
		mtype: "POST",
		height: 400,
		width: $("#channelStationInfoGrids").width(),
		autowidth: false,
		postData: {
			json: JSON.stringify(data)
        },
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#idx_grid-pager',
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			topjqGridLoadComplete();
		},
	});
}


// 下钻到地图层，可以收缩右侧面板功能
$("#resbtn").on("click", initResbtn);
function initResbtn() {
	if($("#resbtn").hasClass("fa-angle-double-right")){
		closeRight();
		$("#leftPanel").css("width", "100%");
		$("#resbtn").css("right", "0%");
	}else{
		openRight();
		$("#leftPanel").css("width", "45%");
		$("#resbtn").css("right", "55%");
		$("#gview_idx_table").css("width", "100%");
		$("#gbox_idx_table").css("width", "100%");
		$(".ui-jqgrid-bdiv").css("width", "100%");
		$("#idx_grid-pager").css("width", "100%");
	}
}

function closeRight(){reportDiv
	$("#rightPanel").toggle("blind", {direction:'right'});
	$("#resbtn").removeClass("fa-angle-double-right");
	$("#resbtn").addClass("fa-angle-double-left");
}

function openRight(){
	$("#rightPanel").toggle("blind", {direction:'right'});
	$("#resbtn").addClass("fa-angle-double-right");
	$("#resbtn").removeClass("fa-angle-double-left");
}

$("#importReportDiv").on("click", importReportBtn);
function importReportBtn() {
	var orgId = "";
	var orgLevel = ""; 
	var gridSelect11=$("#gridSelect11 option:selected").val();
	var cntySelect11=$("#cntySelect11 option:selected").val();
	var citySelect11=$("#citySelect11 option:selected").val();
	if(gridSelect11!=""){
		orgLevel="4";
		orgId=gridSelect11;
	}else{
		if(cntySelect11!=""){
			orgId=cntySelect11;
			orgLevel="3";
		}else{
			if(citySelect11!=""){
				orgLevel="2";
				orgId=citySelect11;
			}else{
				orgLevel="1";
			}
		}
	}
	var conditionOne = $("#conditionOne option:selected").val();
	var conditionTwo = $("#conditionTwo option:selected").val();
	var gcFalg = $("#conditionTwoXWSC option:selected").val();
	var statisDate = $("#dv_date").val();
	
	
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + orgId +"' name='orgId' />";
	html += "<input type='text' value='" + orgLevel +"' name='orgLevel' />";
	html += "<input type='text' value='" + statisDate +"' name='statisDate' />";
	html += "<input type='text' value='" + conditionOne + "' name='conditionOne' />";
	html += "<input type='text' value='" + conditionTwo + "' name='conditionTwo' />";
	html += "<input type='text' value='" + gcFalg + "' name='gcFalg' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptcomposite/exportRptInfo">' + html + '</form>').appendTo('body').submit().remove();
}

$("#dv_date").on("change", dv_date);
function dv_date() {
	conditionOne();
}
$("#conditionTwoXWSC").on("change", conditionTwoXWSC);
function conditionTwoXWSC() {
	conditionOne();
}