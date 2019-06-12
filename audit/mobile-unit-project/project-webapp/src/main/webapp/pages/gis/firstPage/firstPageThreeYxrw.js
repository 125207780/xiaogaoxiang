// 营销任务方法
function yxrwMethod(treeNode) {
	$('#idx_table').GridUnload();
	$("#hiddenType").val('yxrw');
	//任务月报、行销任务、
	if(treeNode.id.indexOf("yxrw")!=-1||treeNode.id=="XXRW"||treeNode.id=="RWYB"){
		getMaxStatisDate(treeNode.id);
	}
	changeSelectInfo(treeNode);
	$("#oneType").css("display", "none");
	$("#twoType").css("display", "none");
	$("#conditionDivSeven").css("display", "none");
	$("#conditionDivFive").css("display","block");
	$("#showMap").css("display", "none");
}

// 查询营销任务列表
function getYxrwBottom() {
	var oneType = $("#oneType option:selected").val();
	// 任务月报
	if("RWYB" == oneType) {
		getRwybBottom();
	} 
	// 行销任务
	if("XXRW" == oneType) {
		getXxrwBottom();
	}
	// 营销任务指标
	else if("yxrwzb" == oneType) {
		getYxrwzbBottom();
	}
}

// 任务月报
function getRwybBottom() {
	var colNamesData = [];
	var colModelData = [];
	var groupHeadersData = [];
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
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
	var statisDate = $("#statisDate").val();
	if(statisDate!=""){
		statisDate=statisDate.substring(0, 6);
	}
	var data = {
		city: city,
		grid: grid,
		town: town,
		orgId: orgId,
		orgLevel: orgLevel,
		statisDate: statisDate
	};
	
	var url = $.cxt + "/firstpagethree/getrwybdetail";
	colNamesData = ["任务ID", "任务父ID", "任务月份", "任务名称", "任务级别", "全省编码( 固定值：1)", "全省名称(固定值：Z_全省)",
					"地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "网格总监姓名", "网格总监工号",
					"网格总监联系电话", "渠道编码", "渠道名称", "个人客户总计费收入（万元）", "新增客户总计费收入（万元）",
					"放号（户）", "宽带新增（户）", "泛终端合约（户）", "新增家庭网（户）", "高价值小区提渗透",
					"新增价值洼地", "重点客户固移融合率", "中小微企业圈地行动（小微宽带+企业上云）"];
	colModelData = [ 
		{name: 'TASK_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'TASK_PID', align: 'center', cellattr: addCellAttr}, 
		{name: 'TASK_PERIOD', align: 'center', cellattr: addCellAttr}, 
		{name: 'TASK_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'TASK_LEVEL', align: 'center', cellattr: addCellAttr}, 
		{name: 'PROVINCE_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'PROVINCE_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'MANAGER_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CHNL_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'TARGET_CUS_FEE', align: 'center', cellattr: addCellAttr}, 
		{name: 'TARGET_ADD_FEE', align: 'center', cellattr: addCellAttr},
		{name: 'TARGER_TELE_NO', align: 'center', cellattr: addCellAttr}, 
		{name: 'TARGET_BROADBAND_ADD', align: 'center', cellattr: addCellAttr}, 
		{name: 'TARGET_TERMINAL_CONTRACT', align: 'center', cellattr: addCellAttr}, 
		{name: 'TARGET_HOMENET_ADD', align: 'center', cellattr: addCellAttr}, 
		{name: 'TARGET_INFILTRATION_CELL', align: 'center', cellattr: addCellAttr}, 
		{name: 'TARGET_DEPRESSION_ADD', align: 'center', cellattr: addCellAttr}, 
		{name: 'TARGET_CUSTOMER_FUSION', align: 'center', cellattr: addCellAttr}, 
		{name: 'TARGET_ENCLOSURE_SUM', align: 'center', cellattr: addCellAttr}
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

// 营销任务指标
function getYxrwzbBottom() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethree/getyxrwinfodetail";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
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
	var statisDate = $("#statisDate").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		orgId: orgId,
		orgLevel: orgLevel,
		statisDate: statisDate
	};
	colNamesData = ['任务月份','任务名称','任务级别','地市编码','地市名称','区县编码','区县名称','网格编码','网格名称','网格总监姓名','网格总监工号','网格总监联系电话','渠道编码','渠道名称','个人客户总计费收入（万元）','新增客户总计费收入（万元）','放号（户）','宽带新增（户）','泛终端合约（户）','新增家庭网（户）','高价值小区提渗透','新增价值洼地','重点客户固移融合率','中小微企业圈地行动（小微宽带+企业上云）'];
	colModelData = [ 
	        {name: 'PERIOD', align: 'center', cellattr: addCellAttr},
			{name: 'TASK_NAME', align: 'center', cellattr: addCellAttr},
			{name: 'TASK_LEV', align: 'center', cellattr: addCellAttr,
				formatter:function(celval, options, rowdata){
					if(celval == "1") 
						return '全省';
					else if(celval == "2"){
						return '地市';
					}else if(celval == "3"){
						return '区县';
					}else if(celval == "4"){
						return '网格';
					}else if(celval == "5"){
						return '渠道';
					}
				}
			},
			{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr},
			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr},
			{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr},
			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr},
			{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr},
			{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr},
			{name: 'MANAGER_NAME', align: 'center', cellattr: addCellAttr},
			{name: 'MANAGER_ID', align: 'center', cellattr: addCellAttr},
			{name: 'MANAGER_PHONE', align: 'center', cellattr: addCellAttr},
			{name: 'CHNL_CODE', align: 'center', cellattr: addCellAttr},
			{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr},
			{name: 'TARGET_CUS_FEE', align: 'center', cellattr: addCellAttr},
			{name: 'TARGET_ADD_FEE', align: 'center', cellattr: addCellAttr},
			{name: 'TARGET_TELE_NO', align: 'center', cellattr: addCellAttr},
			{name: 'TARGET_BROADBAND_ADD', align: 'center', cellattr: addCellAttr},
			{name: 'TARGET_TERMINAL_CONTRACT', align: 'center', cellattr: addCellAttr},
			{name: 'TARGET_HOMENET_ADD', align: 'center', cellattr: addCellAttr},
			{name: 'TARGET_INFILTRATION_CELL', align: 'center', cellattr: addCellAttr,formatter: rateFormat},
			{name: 'TARGET_DEPRESSION_ADD', align: 'center', cellattr: addCellAttr},
			{name: 'TARGET_CUSTOMER_FUSION', align: 'center', cellattr: addCellAttr,formatter: rateFormat},
			{name: 'TARGET_ENCLOSURE_SUM', align: 'center', cellattr: addCellAttr}
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

// 行销任务
function getXxrwBottom() {
	var colNamesData = [];
	var colModelData = [];
	var groupHeadersData = [];
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
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
	var statisDate = $("#statisDate").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		orgId: orgId,
		orgLevel: orgLevel,
		statisDate: statisDate
	};
	var url = $.cxt + "/firstpagethree/getxxrwdetail";
	colNamesData = ["日期", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", "完成量", "促销场次"];
	colModelData = [ 
		{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CHNL_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'VAL', align: 'center', cellattr: addCellAttr}, 
		{name: 'SALES_COUNT', align: 'center', cellattr: addCellAttr}
	];
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 80;
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