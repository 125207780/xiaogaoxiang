// 校园报表
function getXybbBottom() {
	var twoType = $("#twoType option:selected").val();
	var oneType = $("#oneType option:selected").val();
	$('#idx_table').GridUnload();
	// 校园报表-默认第一个选项
	if("XYBB" == oneType) {
		$("#conditionDivFive").css("display", "block");
		$("#conditionDivSix").css("display", "block");
		getSchoolUserMonth();
	} 
	// 校园营销报表-用户表(月)
	else if("XYYXBBYHBM" == twoType) {
		$("#conditionDivFive").css("display", "block");
		$("#conditionDivSix").css("display", "block");
		getSchoolUserMonth();
	} 
	// 校园用户画像表(月)
	else if("XYYHHXBM" == twoType) {
		$("#conditionDivFive").css("display", "block");
		$("#conditionDivSix").css("display", "block");
		getSchoolUserPortraitMonth();
	} 
	// 校园营销报表-校园客户情况(日)
	else if("XYYXBBXYKHQKD" == twoType) {
		$("#conditionDivFive").css("display", "block");
		$("#conditionDivSix").css("display", "block");
		getSchoolUserStatusDay();
	} 
	// 校园营销报表-校园客户情况(月)
	else if("XYYXBBXYKHQKM" == twoType) {
		$("#conditionDivFive").css("display", "block");
		$("#conditionDivSix").css("display", "block");
		getSchoolUserStatusMonth();
	} 
	// 校园营销报表-校园重点活动办理情况(日)
	else if("XYYXBBXYZDHDBLQKD" == twoType) {
		$("#conditionDivFive").css("display", "block");
		$("#conditionDivSix").css("display", "block");
		getSchoolImportantActiveStatusDay();
	} 
	// 校园营销报表-校园重点活动办理明细情况(日)
	else if("XYYXBBXYZDHDBLMXQKD" == twoType) {
		$("#conditionDivFive").css("display", "block");
		$("#conditionDivSix").css("display", "block");
		getSchoolImportantActiveDetailStatusDay();
	} 
	// 校园营销报表-存量校园客户保有情况日报表(日)
	else if("XYYXBBCLXYKHBYQKRBBD" == twoType) {
		$("#conditionDivFive").css("display", "block");
		$("#conditionDivSix").css("display", "block");
		getSchoolStockUserTenureStatusDay();
	} 
	// 校园用户份额分布(日)
	else if("XYYHFEFBD" == twoType) {
		$("#conditionDivFive").css("display", "block");
		$("#conditionDivSix").css("display", "block");
		getSchoolUserShareDistributionDay();
	}
	// 校园用户份额分布(月)
	else if("XYYHFEFBM" == twoType) {
		$("#conditionDivFive").css("display", "block");
		$("#conditionDivSix").css("display", "block");
		getSchoolUserShareDistributionMonth();
	}
	// 校园异网用户表(日)
	else if("XYYWYHBM" == twoType) {
		$("#conditionDivFive").css("display", "block");
		$("#conditionDivSix").css("display", "block");
		getOutNetUserDay();
	}
	// 校园信息表(月)
	else if("XYXXBM" == twoType) {
		$("#conditionDivFive").css("display", "none");
		$("#conditionDivSix").css("display", "block");
		getSchoolInfoMonth();
	} else {
		$("#conditionDivFive").css("display", "none");
		$("#conditionDivSix").css("display", "none");
	}
}

// 校园营销报表-用户表(月)
function getSchoolUserMonth() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethreeschool/getschoolusermonth";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val().substring(0, 6);
	var schoolName = $("#schoolName").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType,
		statisDate: statisDate,
		schoolName: schoolName
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '学校编码', '学校名称', '分校区编码', '分校区名称', '用户id', '用户号码', '归属运营商', '当前主套餐编码', '当前主套餐名称',
	                '网龄', '是否本月新增', '是否20180801起以后新增', '是否本月通话', '是否本月通信', '是否4G客户', '是否不限量套餐客户', '是否v网用户', '是否宽带用户', '是否缴费用户', '是否套餐减免用户',
	                '套餐减免优惠编码', '套餐减免优惠名称', '是否有效存费合约类用户', '是否有效终端合约类用户', '是否有效宽带合约类用户', '是否其他有效合约类用户', '合约产品编码', '合约产品名称', '合约办理时间',
	                '合约生效时间', '合约失效时间', '当月ARPU', '本月ARPU-上月ARPU', '三月月均ARPU', '当月MOU', '本月MOU-上月MOU', '三月月均MOU', '当月DOU', '本月DOU-上月DOU', '三月月均DOU',
	                '本月折扣折让金额', '折扣优惠编码', '折扣优惠档次', '合约优惠编码', '合约优惠名称', '是否上月新增用户', '上月ARPU', '上月MOU', '上月ARPU', '通话次数', '开户日期', '是否出账用户',
	                '性别', '年龄', '终端品牌', '终端型号', '缴费金额', '产品编码', '产品名称', '宽带优惠类型', 'APRU除折扣折让', '不限量套餐类型', 'APP偏好类别', '主套餐费用'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr,frozen: 'ture' }, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr,frozen: 'ture' }, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr,frozen: 'ture' }, 
		{name: 'SCH_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'USR_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SVC_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'HOME_TYP_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'TAOCAN_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'TAOCAN_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'ONLINE_MONTH', align: 'center', cellattr: addCellAttr}, 
		{name: 'IS_NEWUSER_MONTH', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_NEWUSER_AFTER0801', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_CALL', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_COMMUNICATION', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_4G', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_UNLIMIT', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_VNET', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_KD', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_CHARGE', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_DISCNT', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'DISCNT_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'DISCNT_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'IS_CONTRACT', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_CONTRACT_PHONE', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_CONTRACT_KD', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_CONTRACT_OTHER', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'CONT_PRODUCT_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONT_PRODUCT_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONT_TIME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONT_VAL', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONT_INVAL', align: 'center', cellattr: addCellAttr}, 
		{name: 'ARPU', align: 'center', cellattr: addCellAttr}, 
		{name: 'ARPU_TWO_MONTH', align: 'center', cellattr: addCellAttr}, 
		{name: 'ARPU_MEAN', align: 'center', cellattr: addCellAttr}, 
		{name: 'MOU', align: 'center', cellattr: addCellAttr}, 
		{name: 'MOU_TWO_MONTH', align: 'center', cellattr: addCellAttr}, 
		{name: 'MOU_MEAN', align: 'center', cellattr: addCellAttr}, 
		{name: 'DOU', align: 'center', cellattr: addCellAttr}, 
		{name: 'DOU_TWO_MONTH', align: 'center', cellattr: addCellAttr}, 
		{name: 'DOU_MEAN', align: 'center', cellattr: addCellAttr}, 
		{name: 'FEE_DISCNT', align: 'center', cellattr: addCellAttr}, 
		{name: 'DISCNT_YOUHUI_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'DISCNT_YOUHUI_RANK', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONT_PACKAGE_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONT_PACKAGE_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'IS_NEWUSER_LM', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'ARPU_LM', align: 'center', cellattr: addCellAttr}, 
		{name: 'MOU_LM', align: 'center', cellattr: addCellAttr}, 
		{name: 'DOU_LM', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_FREQ', align: 'center', cellattr: addCellAttr}, 
		{name: 'OPEN_DATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'IS_ACCT_USR', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'SEX', align: 'center', cellattr: addCellAttr}, 
		{name: 'AGE', align: 'center', cellattr: addCellAttr}, 
		{name: 'TERM_BRND', align: 'center', cellattr: addCellAttr}, 
		{name: 'TERM_TYP', align: 'center', cellattr: addCellAttr}, 
		{name: 'PAY_FEE', align: 'center', cellattr: addCellAttr}, 
		{name: 'PRODUCT_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'PRODUCT_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'KD_DISCNT_TYPE', align: 'center', cellattr: addCellAttr}, 
		{name: 'APRU_REAL_FEE', align: 'center', cellattr: addCellAttr}, 
		{name: 'BXL_TYP_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'APP_TYPE_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'MAIN_DISC_FEE', align: 'center', cellattr: addCellAttr}
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
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
	// 将列表th和列表的td宽度做适配
	softThWidth();
	 $("#idx_table").jqGrid('setFrozenColumns');//设置冻结列生效
}

// 校园用户画像表(月)
function getSchoolUserPortraitMonth() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethreeschool/getschooluserportraitmonth";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val().substring(0, 6);
	var schoolName = $("#schoolName").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType,
		statisDate: statisDate,
		schoolName: schoolName
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '学校编码', '学校名称', '用户编码', '手机号码', '套餐编码', '套餐名称', '在网时间', '开户时间', '用户类型',
	                '性别', '年龄', '是否4G用户', '是否不限量用户', '是否V网用户', '是否宽带用户', '是否套餐减免用户', '套餐减免优惠编码', '套餐减免优惠名称', '合约类型', '合约类型名称',
	                '合约产品编码', '合约产品名称', '合约生效时间', '合约失效时间', 'APRU', 'MOU', 'DOU', '通话次数', '流量分档标识', '流量分档', '通话时长分档标识', '通话时长分档',
	                'ARPU除折让分档标识', 'ARPU除折让分档', '本月折扣折让金额', '终端品牌', '终端型号', '产品编码', '产品名称', 'APP偏好类别编码', 'APP偏好类别', '主套餐费用分档标识', '主套餐费用分档'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'USR_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SVC_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'TAOCAN_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'TAOCAN_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'ONLINE_MONTH', align: 'center', cellattr: addCellAttr}, 
		{name: 'OPEN_DATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'USR_TYPE', align: 'center', cellattr: addCellAttr}, 
		{name: 'SEX', align: 'center', cellattr: addCellAttr}, 
		{name: 'AGE', align: 'center', cellattr: addCellAttr}, 
		{name: 'IS_4G', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_UNLIMIT', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_VNET', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_KD', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'IS_DISCNT', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'DISCNT_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'DISCNT_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACTVI_TYPE_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACTVI_TYPE', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACTVI_PROD', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACTVI_PROD_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACTVI_EFF_DATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACTVI_EXP_DATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'ARPU', align: 'center', cellattr: addCellAttr}, 
		{name: 'MOU', align: 'center', cellattr: addCellAttr}, 
		{name: 'DOU', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_FREQ', align: 'center', cellattr: addCellAttr}, 
		{name: 'GPRS_LEVEL_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'GPRS_LEVEL', align: 'center', cellattr: addCellAttr}, 
		{name: 'VOICE_LEVEL_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'VOICE_LEVEL', align: 'center', cellattr: addCellAttr},
		{name: 'FEE_LEVEL_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'FEE_LEVEL', align: 'center', cellattr: addCellAttr}, 
		{name: 'FEE_DISCNT', align: 'center', cellattr: addCellAttr}, 
		{name: 'TERM_BRND', align: 'center', cellattr: addCellAttr}, 
		{name: 'TERM_TYP', align: 'center', cellattr: addCellAttr}, 
		{name: 'PRODUCT_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'PRODUCT_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'APP_TYPE_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'APP_TYPE_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'DISC_FEE_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'DISC_FEE_NAME', align: 'center', cellattr: addCellAttr}
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

// 校园营销报表-校园客户情况(日)
function getSchoolUserStatusDay() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethreeschool/getschooluserstatusday";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val();
	var schoolName = $("#schoolName").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType,
		statisDate: statisDate,
		schoolName: schoolName
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '学校编码', '学校名称', '分校区编码', '分校区名称', '当日移动新增通话校园客户 ', '当日移动新增校园通话客户份额X%', '当月移动累计新增通话校园客户',
	                '当月联通累计新增通话校园客户', '当月电信累计新增通话校园客户', '当月移动累计新增通话校园客户市场份额X%', '当月移动累计新增通话校园客户市场份额排名', '8月1日起移动累计新增通话校园客户',
	                '8月1日起联通累计新增通话校园客户', '8月1日起电信累计新增通话校园客户', '8月1日起移动累计新增通话校园客户市场份额X%', '8月1日起移动累计新增通话校园客户市场份额排名',
	                '期末移动通话客户数', '期末联通通话客户数', '期末电信通话客户数', '期末移动通话客户市场份额X%', '期末移动通话客户市场份额排名', '期末联通通话市场份额X%', '期末电信通话市场份额X%',
	                '期末移动通信客户数', '期末联通通信客户数', '期末电信通信客户数', '期末通信客户市场份额X%', '期末通信客户市场份额排名', '联通期末通信市场份额X%', '电信期末通信市场份额X%', '当日新增4G客户数',
	                '当月新增4G客户数', '期末4G客户数', '4G客户渗透率X%', '4G客户渗透率排名', '当日新增不限量套餐客户数', '当月新增不限量套餐客户数', '期末不限量套餐客户数', '不限量套餐客户渗透率X%',
	                '不限量套餐客户渗透率排名', '其中：不限量流量包渗透率', '当月ARPU', '当月ARPU环比变化', '当月DOU', '当月DOU环比变化', '当月MOU', '当月MOU环比变化', '当前V网客户数', 
	                'V网客户渗透率', '本月缴费用户数', '本月缴费用户渗透率', '当日新增宽带客户数', '当月新增宽带客户数', '期末宽带客户数 ', '宽带客户渗透率', '期末存费类客户数', '期末终端类客户数', 
	                '期末宽带类客户数', '期末其他类客户数', '小计', '合约率'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_CMCC_D', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_SHARE_CMCC_D', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_CMCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_CUCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_CTCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_SHARE_CMCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'RANK_ADD_CMCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_CMCC_AFTER0801', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_CUCC_AFTER0801', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_CTCC_AFTER0801', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_SHARE_CMCC_AFTER0801', align: 'center', cellattr: addCellAttr}, 
		{name: 'RANK_ADD_CMCC_AFTER0801', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_CUCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_CTCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_SHARE_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_RANK_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_SHARE_CUCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_SHARE_CTCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_CUCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_CTCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_SHARE_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_RANK_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_SHARE_CUCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_SHARE_CTCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'G4_CMCC_D', align: 'center', cellattr: addCellAttr}, 
		{name: 'G4_CMCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'G4_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'G4_RATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'G4_RANK', align: 'center', cellattr: addCellAttr}, 
		{name: 'UMLIMIT_CMCC_D', align: 'center', cellattr: addCellAttr}, 
		{name: 'UMLIMIT_CMCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'UNLIMIT_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'UNLIMIT_RATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'UNLIMIT_RANK', align: 'center', cellattr: addCellAttr}, 
		{name: 'UNLIMIT_DIEJIA', align: 'center', cellattr: addCellAttr}, 
		{name: 'ARPU', align: 'center', cellattr: addCellAttr}, 
		{name: 'ARPU_HB', align: 'center', cellattr: addCellAttr}, 
		{name: 'DOU', align: 'center', cellattr: addCellAttr}, 
		{name: 'DOU_HB', align: 'center', cellattr: addCellAttr}, 
		{name: 'MOU', align: 'center', cellattr: addCellAttr}, 
		{name: 'MOU_HB', align: 'center', cellattr: addCellAttr}, 
		{name: 'VNET', align: 'center', cellattr: addCellAttr}, 
		{name: 'VNET_RATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CHARGE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CHARGE_RATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'KD_CMCC_D', align: 'center', cellattr: addCellAttr}, 
		{name: 'KD_CMCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'KD_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'KD_RATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONTRACT_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONTRACT_PHONE_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONTRACT_KD_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONTRACT_OTHER_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONTRACT_CMCC_TOL', align: 'center', cellattr: addCellAttr}, 
		{name: 'HY_RATE', align: 'center', cellattr: addCellAttr}
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

// 校园营销报表-校园客户情况(月)
function getSchoolUserStatusMonth() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethreeschool/getschooluserstatusmonth";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val().substring(0, 6);
	var schoolName = $("#schoolName").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType,
		statisDate: statisDate,
		schoolName: schoolName
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '学校编码', '学校名称', '分校区编码', '分校区名称', '当月移动累计新增通话校园客户', '当月联通累计新增通话校园客户', '当月电信累计新增通话校园客户',
	                '当月移动累计新增通话校园客户份额X%', '当月移动累计新增通话校园客户份额排名', '8月1日起移动累计新增通话校园客户', '8月1日起联通累计新增通话校园客户', '8月1日起电信累计新增通话校园客户',
	                '8月1日起移动累计新增通话校园客户市场份额X%', '8月1日起移动累计新增通话校园客户市场份额排名', '期末移动通话客户数', '期末联通通话客户数', '期末电信通话客户数', '期末移动通话客户市场份额X%', 
	                '期末移动通话客户市场份额排名', '期末联通通话市场份额X%', '期末电信通话市场份额X%', '期末移动通信客户数', '期末联通通信客户数', '期末电信通信客户数', '期末通信客户市场份额X%',
	                '期末通信客户市场份额排名', '联通期末通信市场份额X%', '电信期末通信市场份额X%', '当月新增4G客户数', '期末4G客户数', '4G客户渗透率X%', '4G客户渗透率排名', '当月新增不限量套餐客户数',
	                '期末不限量套餐客户数', '不限量套餐客户渗透率X%', '不限量套餐客户渗透率排名', '其中：不限量流量包渗透率', '当月ARPU', '当月ARPU环比变化', '累计月均ARPU', '当月DOU(G)',
	                '当月DOU环比变化', '累计月均DOU', '当月MOU', '当月MOU环比变化', '累计月均MOU', '当前V网客户数', 'V网客户渗透率', '本月缴费用户数', '缴费客户渗透率', '当月新增宽带客户数',
	                '期末宽带客户数 ', '宽带客户渗透率%', '期末存费类客户数', '期末终端类客户数', '期末宽带类客户数', '期末其他类客户数', '小计', '合约率'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_CMCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_CUCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_CTCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_SHARE_CMCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'RANK_ADD_CMCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_CMCC_AFTER0801', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_CUCC_AFTER0801', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_CTCC_AFTER0801', align: 'center', cellattr: addCellAttr}, 
		{name: 'ADD_SHARE_CMCC_AFTER0801', align: 'center', cellattr: addCellAttr}, 
		{name: 'RANK_ADD_CMCC_AFTER0801', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_CUCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_CTCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_SHARE_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_RANK_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_SHARE_CUCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_SHARE_CTCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_CUCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_CTCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_SHARE_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_RANK_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_SHARE_CUCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'COMMUNI_SHARE_CTCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'G4_CMCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'G4_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'G4_RATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'G4_RANK', align: 'center', cellattr: addCellAttr}, 
		{name: 'UMLIMIT_CMCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'UNLIMIT_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'UNLIMIT_RATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'UNLIMIT_RANK', align: 'center', cellattr: addCellAttr}, 
		{name: 'UNLIMIT_DIEJIA', align: 'center', cellattr: addCellAttr}, 
		{name: 'ARPU', align: 'center', cellattr: addCellAttr}, 
		{name: 'ARPU_TWO_MONTH', align: 'center', cellattr: addCellAttr}, 
		{name: 'ARPU_MEAN', align: 'center', cellattr: addCellAttr}, 
		{name: 'MOU', align: 'center', cellattr: addCellAttr}, 
		{name: 'MOU_TWO_MONTH', align: 'center', cellattr: addCellAttr}, 
		{name: 'MOU_MEAN', align: 'center', cellattr: addCellAttr}, 
		{name: 'DOU', align: 'center', cellattr: addCellAttr}, 
		{name: 'DOU_TWO_MONTH', align: 'center', cellattr: addCellAttr}, 
		{name: 'DOU_MEAN', align: 'center', cellattr: addCellAttr}, 
		{name: 'VNET', align: 'center', cellattr: addCellAttr}, 
		{name: 'VNET_RATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CHARGE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CHARGE_RATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'KD_CMCC_M', align: 'center', cellattr: addCellAttr}, 
		{name: 'KD_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'KD_RATE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONTRACT_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONTRACT_PHONE_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONTRACT_KD_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONTRACT_OTHER_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CONTRACT_CMCC_TOL', align: 'center', cellattr: addCellAttr}, 
		{name: 'HY_RATE', align: 'center', cellattr: addCellAttr}
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

// 校园营销报表-校园重点活动办理情况(日)
function getSchoolImportantActiveStatusDay() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethreeschool/getschoolimportantactivestatusday";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val();
	var schoolName = $("#schoolName").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType,
		statisDate: statisDate,
		schoolName: schoolName
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '学校编码', '学校名称', '分校区编码', '分校区名称', '校园和享包', '畅享包', '区域流量包', '语音叠加包', '流量提速包',
	                '入网送费', '入网送和包券', '入网办甜言蜜语包', '入网送高校集团网', '存费送费', '存费送和包券', '不限量叠加包', '校园明星机', '信用购', '融合宽带', '叠加型宽带', '单宽带', '套餐功能费减免'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'PACK_HE', align: 'center', cellattr: addCellAttr}, 
		{name: 'PACK_CHANG', align: 'center', cellattr: addCellAttr}, 
		{name: 'PACK_DISTRI_FLOW', align: 'center', cellattr: addCellAttr}, 
		{name: 'PACK_VOICE', align: 'center', cellattr: addCellAttr}, 
		{name: 'PACK_FLOW_SPEED_UP', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACCESS_DISC_FEE', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACCESS_DISC_TICKET', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACCESS_DISC_VOICE', align: 'center', cellattr: addCellAttr}, 
		{name: 'ACCESS_DISC_GROUP', align: 'center', cellattr: addCellAttr}, 
		{name: 'DISC_FEE', align: 'center', cellattr: addCellAttr}, 
		{name: 'DISC_TICKET', align: 'center', cellattr: addCellAttr}, 
		{name: 'DISC_UNLIMIT', align: 'center', cellattr: addCellAttr}, 
		{name: 'TERMI_DISC_HOT', align: 'center', cellattr: addCellAttr}, 
		{name: 'TERMI_DISC_CREDIT', align: 'center', cellattr: addCellAttr}, 
		{name: 'KD_DISC_MULTI', align: 'center', cellattr: addCellAttr}, 
		{name: 'KD_DISC_DIAJIA', align: 'center', cellattr: addCellAttr}, 
		{name: 'KD_DISC_SINGAL', align: 'center', cellattr: addCellAttr}, 
		{name: 'DISC_TAOCAN', align: 'center', cellattr: addCellAttr}
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

// 校园营销报表-校园重点活动办理明细情况(日)
function getSchoolImportantActiveDetailStatusDay() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethreeschool/getschoolimportantactivedetailstatusday";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val();
	var schoolName = $("#schoolName").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType,
		statisDate: statisDate,
		schoolName: schoolName
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '学校编码', '学校名称', '分校区编码', '分校区名称', '业务类型',
	                '优惠编码', '优惠名称', '当日办理量', '当月办理量', '累计办理量'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'LEVEL_1_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'DISCNT_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'DISCNT_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'ORDER_TODAY', align: 'center', cellattr: addCellAttr}, 
		{name: 'ORDER_MONTH', align: 'center', cellattr: addCellAttr}, 
		{name: 'ORDER_TOTAL', align: 'center', cellattr: addCellAttr}
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

// 校园营销报表-存量校园客户保有情况日报表(日)
function getSchoolStockUserTenureStatusDay() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethreeschool/getschoolstockusertenurestatusday";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val();
	var schoolName = $("#schoolName").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType,
		statisDate: statisDate,
		schoolName: schoolName
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '学校编码', '学校名称', '分校区编码', '分校区名称', '拍照客户数', '当前保有客户数', '客户保有率'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'PZ_USRS', align: 'center', cellattr: addCellAttr}, 
		{name: 'ONNET_USRS', align: 'center', cellattr: addCellAttr}, 
		{name: 'ONNET_RATE', align: 'center', cellattr: addCellAttr}
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

// 校园用户份额分布(日)
function getSchoolUserShareDistributionDay() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethreeschool/getschoolusersharedistributionday";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val();
	var schoolName = $("#schoolName").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType,
		statisDate: statisDate,
		schoolName: schoolName
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '学校编码', '学校名称', '分校区编码', '分校区名称', '学生数', '本网学生数', '异网学生数', '其中：异网联通学生数',
	                '其中：异网电信学生数', '本网：学生用户占比', '异网：学生用户占比', '学生数', '本网学生数', '异网学生数', '其中：异网联通学生数', '其中：异网电信学生数',
	                '本网：学生用户占比', '异网：学生用户占比', '学生数', '本网学生数', '异网学生数', '其中：异网联通学生数', '其中：异网电信学生数', '本网：学生用户占比',
	                '异网：学生用户占比', '学生数', '本网学生数', '异网学生数', '其中：异网联通学生数', '其中：异网电信学生数', '本网：学生用户占比', '异网：学生用户占比'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_NUM', align: 'center', cellattr: addCellAttr}, 
		{name: 'CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_COMPI', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CTCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_BENWANG', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_COMPI', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_NEW_NUM', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_NEW_COMPI', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_CUCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_CTCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_NEW_BENWANG', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_NEW_COMPI', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_NUM_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'CMCC_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_COMPI_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUCC_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'CTCC_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_BENWANG_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_COMPI_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_NEW_NUM_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_CMCC_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_COMPI_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_CUCC_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_CTCC_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_NEW_BENWANG_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_NEW_COMPI_S', align: 'center', cellattr: addCellAttr}
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

// 校园用户份额分布(月)
function getSchoolUserShareDistributionMonth() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethreeschool/getschoolusersharedistributionmonth";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val().substring(0, 6);
	var schoolName = $("#schoolName").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType,
		statisDate: statisDate,
		schoolName: schoolName
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '学校编码', '学校名称', '分校区编码', '分校区名称', '学生数', '本网学生数', '异网学生数', '其中：异网联通学生数',
	                '其中：异网电信学生数', '本网：学生用户占比', '异网：学生用户占比', '学生数', '本网学生数', '异网学生数', '其中：异网联通学生数', '其中：异网电信学生数', '本网：学生用户占比',
	                '异网：学生用户占比', '学生数', '本网学生数', '异网学生数', '其中：异网联通学生数', '其中：异网电信学生数', '本网：学生用户占比', '异网：学生用户占比', '学生数',
	                '本网学生数', '异网学生数', '其中：异网联通学生数', '其中：异网电信学生数', '本网：学生用户占比', '异网：学生用户占比'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_NUM', align: 'center', cellattr: addCellAttr}, 
		{name: 'CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_COMPI', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'CTCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_BENWANG', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_COMPI', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_NEW_NUM', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_CMCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_NEW_COMPI', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_CUCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_CTCC', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_NEW_BENWANG', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_NEW_COMPI', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_NUM_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'CMCC_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_COMPI_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'CUCC_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'CTCC_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_BENWANG_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_COMPI_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'ALL_NEW_NUM_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_CMCC_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_COMPI_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_CUCC_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_CTCC_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_NEW_BENWANG_S', align: 'center', cellattr: addCellAttr}, 
		{name: 'RATE_NEW_COMPI_S', align: 'center', cellattr: addCellAttr}
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

// 校园异网用户表(月)
function getOutNetUserDay() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethreeschool/getoutnetuserday";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val();
	var schoolName = $("#schoolName").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType,
		statisDate: statisDate,
		schoolName: schoolName
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '异网号码', '异网号码归属地编码', '异网号码归属运营商', '学校编码', '学校名称', '联系该异网号码的本网学生数',
	                '通话次数', '通话时长', '联系该异网号码的同城本网学生数', '联系该异网号码的同城本网学生通话次数', '联系该异网号码的同城本网学生通话时长',
	                '学校所属地市名称', /*'学校所属地市编码', '是否当日新增用户', '是否当月新增用户', '入网时间',*/ '分校区编码', '分校区名称'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'OTHR_PARTY', align: 'center', cellattr: addCellAttr}, 
		{name: 'OTHER_HOME_AREA_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'OTHER_OPRAT_TYP_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_USERS', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_FREQ', align: 'center', cellattr: addCellAttr}, 
		{name: 'CALL_DUR', align: 'center', cellattr: addCellAttr}, 
		{name: 'LOCAL_SCH_USERS', align: 'center', cellattr: addCellAttr}, 
		{name: 'LOCAL_CALL_FREQ', align: 'center', cellattr: addCellAttr}, 
		{name: 'LOCAL_CALL_DUR', align: 'center', cellattr: addCellAttr}, 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
//		{name: 'AREA_ID', align: 'center', cellattr: addCellAttr}, 
//		{name: 'IF_DANGYUE', align: 'center', cellattr: addCellAttr}, 
//		{name: 'IF_DANGRI', align: 'center', cellattr: addCellAttr}, 
//		{name: 'INNET_TIME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PART_NAME', align: 'center', cellattr: addCellAttr}
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

// 校园信息表(月)
function getSchoolInfoMonth() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethreeschool/getschoolinfomonth";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var schoolName = $("#schoolName").val();
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType,
		schoolName: schoolName
	};
	colNamesData = ['地市名称', '区县名称', '网格名称', '学校编码', '学校名称', '学校主页', '办学层次', '主管单位', '学生人数', '新生人数', '教职工人数', '移动市场占有率',
	                '学校类型', '学校归属', '注释', '学校所在地市编码', '学校编码（集团编码）', '校园所在CMCC运营公司标识', '校园所在CMCC运营公司名称', '办学层次编码', '学校地址', '是否重点院校', '经度', '纬度'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_NAME', align: 'center', cellattr: addCellAttr},
		{name: 'SCH_WEB_ADDR', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_LEVEL', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_COMPETENT_ORG', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_USER', align: 'center', cellattr: addCellAttr}, 
		{name: 'NEW_SCH_USER', align: 'center', cellattr: addCellAttr}, 
		{name: 'TEACH_WORKS', align: 'center', cellattr: addCellAttr}, 
		{name: 'CMCC_PERCNT', align: 'center', cellattr: addCellAttr}, 
		{name: 'TYPE_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_PROPERTY', align: 'center', cellattr: addCellAttr}, 
		{name: 'REMARK', align: 'center', cellattr: addCellAttr}, 
		{name: 'AREA_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'CMCC_SCH_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'CMCC_AREA_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'CMCC_AREA_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_LEVEL_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_ADDR', align: 'center', cellattr: addCellAttr}, 
		{name: 'IF_KEY_SCH', align: 'center', cellattr: addCellAttr,formatter: YAndNFormat}, 
		{name: 'SCH_LONGTITUDE', align: 'center', cellattr: addCellAttr}, 
		{name: 'SCH_LATITUDE', align: 'center', cellattr: addCellAttr}
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

// 返回页面
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