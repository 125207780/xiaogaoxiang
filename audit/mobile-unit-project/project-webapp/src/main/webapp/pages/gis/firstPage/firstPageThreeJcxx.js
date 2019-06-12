// 基础信息方法
function jcxxMethod(treeNode) {
	$("#hiddenType").val('jcxx');
	if("WGXX" == treeNode.id) {
		$("#gridTypeInfoTr").show();
	} else if("RYXX" == treeNode.id) {
		$("#gridTypeInfoTr").css("display", "none");
	} else if("WGJCXX" == treeNode.id) {
		$("#conditionDivFive").css("display", "block");
		$("#middleFourInfoDiv").css("display", "none");
	} else {
		$("#topParentConditionDiv").css("display", "block");
		$("#middleFourInfoDiv").css("display", "block");
		$("#bottomDetailDiv").css("display", "block");
	}
	if(treeNode.id=="网格基础信息"||treeNode.id=="WGJCXX"){
		getMaxStatisDate(treeNode.id);
	}
	changeSelectInfo(treeNode);
}

// 查询基础信息头部
function getJcxxHeader() {
	$("#jcxx").css("display", "block");
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
	var twoType = $("#twoType option:selected").val();
	if(twoType=="网格基础信息"){
		$("#middleFourInfoDiv").css("display", "none");
		$("#conditionDivFive").css("display", "block");
	}else{
	$.ajax({
		url: $.cxt + "/firstpagethree/getjcxxheader",
		data: {orgId: orgId, orgLevel: orgLevel},
		type: "POST",
		success: function(result) {
			var jsonStr = JSON.parse(result);
			if(jsonStr.code == "0") {
				var json = jsonStr.data;
				if(null != json && "" != json) {
					$(".jcxxTd").empty();
					$("#gridCount").text(json.GRIDCOUNT == null ? 0 : json.GRIDCOUNT);
					$("#gridTypeOneCount").text(json.GRIDTYPEONECOUNT == null ? 0 : json.GRIDTYPEONECOUNT);
					$("#gridTypeTwoCount").text(json.GRIDTYPETWOCOUNT == null ? 0 : json.GRIDTYPETWOCOUNT);
					$("#gridTypeThreeCount").text(json.GRIDTYPETHREECOUNT == null ? 0 : json.GRIDTYPETHREECOUNT);
					$("#directorsCount").text(json.DIRECTORSCOUNT == null ? 0 : json.DIRECTORSCOUNT);
					$("#cdManagerCount").text(json.CDMANAGERCOUNT == null ? 0 : json.CDMANAGERCOUNT);
					$("#chnlShManagerCount").text(json.CHNLSHMANAGERCOUNT == null ? 0 : json.CHNLSHMANAGERCOUNT);
					$("#chnlZxManagerCount").text(json.CHNLZXMANAGERCOUNT == null ? 0 : json.CHNLZXMANAGERCOUNT);
					$("#chnlManagerCount").text(json.CHNLMANAGERCOUNT == null ? 0 : json.CHNLMANAGERCOUNT);
					$("#directUserCount").text(json.DIRECTUSERCOUNT == null ? 0 : json.DIRECTUSERCOUNT);
					$("#repairUserCount").text(json.REPAIRUSERCOUNT == null ? 0 : json.REPAIRUSERCOUNT);
					$("#saleManagerCount").text(json.SALEMANAGERCOUNT == null ? 0 : json.SALEMANAGERCOUNT);
				}
			}
		}
	});
	}
}

// 查询基础信息列表
function getJcxxBottom() {
	var colNamesData = [];
	var colModelData = [];
	var groupHeadersData = [];
	var url = "";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = $("#statisDate").val();
	if("RYXX" == oneType) {
		url = $.cxt + "/firstpagethree/getjcxxinfodetail";
		colNamesData = [ "地市名称", "区县名称", "网格名称", "网格类型", "人员类型", "OA工号", "登陆账号", "姓名", "性别", "电话" ];
		colModelData = [ 
			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_TYPE', align: 'center', cellattr: addCellAttr}, 
			{name: 'USER_TYPE', align: 'center', cellattr: addCellAttr}, 
			{name: 'OA_ID', align: 'center', cellattr: addCellAttr}, 
			{name: 'LOGIN_ID', align: 'center', cellattr: addCellAttr}, 
			{name: 'USER_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'SEX', align: 'center', cellattr: addCellAttr}, 
			{name: 'PHONE', align: 'center', cellattr: addCellAttr}
		];
	} else if("WGXX" == oneType) {
		url = $.cxt + "/firstpagethree/getjcxxinfodetail";
		if(twoType=="网格基础信息"){
			colNamesData = [ "地市名称", "区县名称", "网格名称", "网格类型", "渠道数", "基站数", "直销人员数" ,"重点小区数","宽带小区数","AB类集团单位数","CD类集团单位数"];
			colModelData = [ 
				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'GRID_TYPE', align: 'center', cellattr: addCellAttr}, 
				{name: 'CHNL_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'STATION_COUNT', align: 'center', cellattr: addCellAttr}, 
				{name: 'DIRECT_USER_COUNT', align: 'center', cellattr: addCellAttr},
				{name: 'ZDCELL_COUNT', align: 'center', cellattr: addCellAttr},
				{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr},
				{name: 'AB_JT_COUNT', align: 'center', cellattr: addCellAttr},
				{name: 'CD_JT_COUNT', align: 'center', cellattr: addCellAttr}
			];
		}else{
			colNamesData = [ "地市名称", "区县名称", "网格名称", "网格类型", "区域面积", "网格覆盖面积", "覆盖率" ];
			colModelData = [ 
				{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
				{name: 'GRID_TYPE', align: 'center', cellattr: addCellAttr}, 
				{name: 'AREA_SIZE', align: 'center', cellattr: addCellAttr}, 
				{name: 'GRID_SIZE', align: 'center', cellattr: addCellAttr}, 
				{name: 'COVER_RATE', align: 'center', cellattr: addCellAttr}
			];
		}
		
		
	} else if("WGJCXX" == oneType) {
		url = $.cxt + "/firstpagethree/getwgjcxxinfodetail";
		colNamesData = [ "统计周期", "地市编码", "地市", "区县编码", "区县名称", "网格编码", "网格名称", "网格总监编码", "网格总监姓名", "网格总监电话",
						"网格内渠道数", "其中实体渠道", "其中NGBOSS渠道", "其中直销渠道", "网格内有业务量的工号", "其中ngboss渠道有业务量的工号",
						"当前入格客户数", "上月入格客户数", "本月新拓展客户数", "本月流失客户数", "2018年期末入格客户数", "本年新拓展客户数", "本年",
						"2018年期末拍照计费收入", "当月计费收入", "上月计费收入", "当年累计计费收入", "收入保有率", "当月新增客户计费收入", "上月新增客户计费收入", "当年新增客户计费收入",
						"大流量产品渗透率", "上月大流量产品渗透率", "固移融合率", "上月固移融合率", "终端合约率", "上月终端合约率", "话费合约率", "上月话费合约率", "家庭网或集团V网渗透率", "上月家庭网或集团V网渗透率",
						"网格内小区数", "网格内18年期末九级地址数", "网格内18年期末空余九级地址数", "上月网格内九级地址数", "上月网格内空余九级地址数", "当前网格内九级地址数", "当前网格内空余九级地址数",
						"高价值低占小区数", "高价值低占小区入格客户数", "上月入格客户数", "其中当月新增客户数", "其中当月流失客户数", "网格内高价值低占小区数", "网格内18年期末九级地址数", "网格内18年期末空余九级地址数", "上月网格内九级地址数", "上月网格内空余九级地址数", "当前网格内九级地址数", "当前网格内空余九级地址数",
						"当月90后客户规模数", "占比网格内客户规模", "上月90后客户规模数", "本月新拓展90后客户数", "本月流失90后客户数", "18年期末90后客户规模数", "本年新拓展90后客户数", "本年流失90后客户数",
						"当月头部客户数", "其中已固移融合", "头部客户固移融合率", "上月头部客户数", "其中已固移融合", "头部客户固移融合率", "本月升档至头部客户", "本月降档出头部客户", "本月头部客户离网", "18年期末头部客户数", "其中已固移融合", "头部客户固移融合率", "本年升档至头部客户", "本年降档出头部客户", "本年头部客户离网" ];
		colModelData = [ 
			{name: 'STATIS_DATE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_MANAGER_CODE', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_MANAGER_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_MANAGER_PHONE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CHNL_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'CHNL_ENTITY_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'CHNL_NGBOSS_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'CHNL_DIRECT_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'WORK_BS_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'WORK_BS_NGBOSS_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_CUS_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_CUS_COUNT_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'NEW_CUS_COUNT_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'LOSE_CUS_COUNT_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'GRID_CUS_LASTYEAR_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'NEW_CUS_COUNT_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'LOSE_CUS_COUNT_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'FEE_LAST_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'FEE_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'FEE_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'FEE_YEAR', align: 'center', cellattr: addCellAttr}, 
			{name: 'INCOME_RN_RATE', align: 'center', cellattr: addCellAttr}, 
			{name: 'ADD_CUS_FEE_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'ADD_CUS_FEE_M_LAST', align: 'center', cellattr: addCellAttr}, 
			{name: 'ADD_CUS_FEE_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSINFO_STRATE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CUSINFO_STRATE_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_RATE', align: 'center', cellattr: addCellAttr}, 
			{name: 'FUSION_RATE_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_RATE', align: 'center', cellattr: addCellAttr}, 
			{name: 'TERMINAL_RATE_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'HFHY_RATE', align: 'center', cellattr: addCellAttr}, 
			{name: 'HFHY_RATE_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'HOMENET_ST_RATE', align: 'center', cellattr: addCellAttr}, 
			{name: 'HOMENET_ST_RATE_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'CELL_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'ADDR_COUNT_LAST_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'ZEROADDR_COUNT_LAST_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'ADDR_COUNT_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'ZEROADDR_COUNT_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'ADDR_COUNT_D', align: 'center', cellattr: addCellAttr}, 
			{name: 'ZEROADDR_COUNT_D', align: 'center', cellattr: addCellAttr}, 
			{name: 'HLCELL_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'HLCELL_CUS_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'HLCELL_CUS_GRID_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'HLCELL_ADD_CUS_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'HLCELL_LOSE_CUS_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'HLCELL_GRID_COUNT', align: 'center', cellattr: addCellAttr}, 
			{name: 'HLCELL_ADDR_COUNT_LAST_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'HLCELL_ZEROADDR_COUNT_LAST_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'HLCELL_ADDR_COUNT_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'HLCELL_ZEROADDR_COUNT_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'HLCELL_ADDR_COUNT_D', align: 'center', cellattr: addCellAttr}, 
			{name: 'HLCELL_ZEROADDR_COUNT_D', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_COUNT_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_GRID_RATE', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_COUNT_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_ADD_COUNT_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_LOSE_COUNT_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_COUNT_LAST_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_ADD_COUNT_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'DEPADD_LOSE_COUNT_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUS_COUNT_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUS_RH_COUNT_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUT_RATE_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUS_COUNT_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUS_RH_COUNT_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUT_RATE_M_LAST_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUS_UP_COUNT_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUS_DOWN_COUNT_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUS_OFFLINE_COUNT_M', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUS_COUNT_LAST_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUS_RH_COUNT_LAST_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUT_RATE_LAST_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUS_UP_COUNT_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUS_DOWN_COUNT_Y', align: 'center', cellattr: addCellAttr}, 
			{name: 'TBCUS_OFFLINE_COUNT_Y', align: 'center', cellattr: addCellAttr}
		];
		groupHeadersData = [
    		{startColumnName: 'CHNL_COUNT', numberOfColumns: 6, titleText: '渠道情况'},
    		{startColumnName: 'GRID_CUS_COUNT', numberOfColumns: 7, titleText: '客户规模'},
    		{startColumnName: 'FEE_LAST_Y', numberOfColumns: 8, titleText: '收入情况'},
    		{startColumnName: 'CUSINFO_STRATE', numberOfColumns: 10, titleText: '客户特征'},
    		{startColumnName: 'CELL_COUNT', numberOfColumns: 7, titleText: '宽带资源'},
    		{startColumnName: 'HLCELL_COUNT', numberOfColumns: 12, titleText: '高价值低占小区'},
    		{startColumnName: 'DEPADD_COUNT_M', numberOfColumns: 8, titleText: '低价值洼地'},
    		{startColumnName: 'TBCUS_COUNT_M', numberOfColumns: 15, titleText: '头部客户情况'}
    	];
	}
	var data = {
		city: city,
		town: town,
		grid: grid,
		oneType: oneType,
		twoType: twoType,
		statisDate: statisDate
	};
	var heightB = 0;
	$('#idx_table').GridUnload();
	heightB = $(window).height() - $("#idx_table").offset().top - 78;
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
	if("WGJCXX" == oneType) {
		$("#idx_table").jqGrid('setGroupHeaders', {
			useColSpanStyle: true, 
			groupHeaders: groupHeadersData
		});
	}
	// 将列表th和列表的td宽度做适配
	//softThWidth();
}

// 点击网格汇总信息
function getGridInfoTd(type) {
	alert("000");
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethree/getjcxxinfodetail";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	if("gridCount" == type) {
		type = "";
	} else if("gridTypeOneCount" == type) {
		type = "一类网格";
	} else if("gridTypeTwoCount" == type) {
		type = "二类网格";
	} else if("gridTypeThreeCount" == type) {
		type = "三类网格";
	} 
	colNamesData = [ "地市名称", "区县名称", "网格名称", "网格类型", "区域面积", "网格覆盖面积", "覆盖率" ];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_TYPE', align: 'center', cellattr: addCellAttr}, 
		{name: 'AREA_SIZE', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_SIZE', align: 'center', cellattr: addCellAttr}, 
		{name: 'COVER_RATE', align: 'center', cellattr: addCellAttr}
	];
	var data = {
		city: city,
		town: town,
		grid: grid,
		oneType: "WGXX",
		twoType: type,
	};
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 45;
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

// 点击人员汇总信息
function getUserInfoTd(type) {
	alert("222");
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethree/getjcxxinfodetail";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	if("directorsCount" == type) {
		type = "区域总监";
	} else if("cdManagerCount" == type) {
		type = "CD政企经理";
	} else if("chnlShManagerCount" == type) {
		type = "社会渠道经理";
	} else if("chnlZxManagerCount" == type) {
		type = "直销渠道经理";
	} else if("chnlManagerCount" == type) {
		type = "渠道经理";
	} else if("directUserCount" == type) {
		type = "直销人员";
	} else if("repairUserCount" == type) {
		type = "装维人员";
	} else if("saleManagerCount" == type) {
		type = "销售经理";
	}
	colNamesData = [ "地市名称", "区县名称", "网格名称", "网格类型", "人员类型", "OA工号", "登陆账号", "姓名", "性别", "电话" ];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_TYPE', align: 'center', cellattr: addCellAttr}, 
		{name: 'USER_TYPE', align: 'center', cellattr: addCellAttr}, 
		{name: 'OA_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'LOGIN_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'USER_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'SEX', align: 'center', cellattr: addCellAttr}, 
		{name: 'PHONE', align: 'center', cellattr: addCellAttr}
	];
	var data = {
		city: city,
		town: town,
		grid: grid,
		oneType: "RYXX",
		twoType: type,
	};
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 45;
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