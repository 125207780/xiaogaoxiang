// 资源信息方法
function zyxxMethod(treeNode) {
	$('#idx_table').GridUnload();
	$("#hiddenType").val('zyxx');
	$("#showMap").css("display", "none");
	changeSelectInfo(treeNode);
}

// 查询资源信息列表
function getZyxxBottom() {
	$('#idx_table').GridUnload();
	var oneType = $("#oneType option:selected").val();
	var type = null;
	// 基站信息
	if("JZXX-5" == oneType) {
		type = "5";
		getZyxxPoiBottom(type);
	} 
	// 渠道信息
	else if("QDXX-1" == oneType) {
		type = "1";
		getZyxxPoiBottom(type);
	} 
	// 小区信息
	else if("XQXX-2" == oneType) {
		type = "2";
		getZyxxPoiBottom(type);
	} 
	// 重点小区信息
	else if("ZDXQ-7" == oneType) {
		getZdxqBottom();
	}
	// 集团单位信息
	else if("JTDW-34" == oneType) {
		getJtdwBottom();
	}
	// 端口信息
	else if("DKXX-6" == oneType) {
		type = "6";
		getZyxxPoiBottom(type);
	} 
}

// 基础信息报表
function getZyxxPoiBottom(type) {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethree/getzyxxinfodetail";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val().split("-")[1];
	var twoType = $("#twoType option:selected").val();
	if(null != twoType && "" != twoType) {
		twoType = twoType.split("-")[1] == "1" ? "是" : "否";
	}
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType
	};
	var poiCode = null;
	var poiName = null;
	if("1" == type) {
		poiCode = "渠道编码";
		poiName = "渠道名称";
	} else if("2" == type) {
		poiCode = "小区编码";
		poiName = "小区名称";
	} else if("5" == type) {
		poiCode = "基站编码";
		poiName = "基站名称";
	} else if("6" == type) {
		poiCode = "端口编码";
		poiName = "端口名称";
	}
	colNamesData = ['地市名称', '区县名称', '网格名称', poiCode, poiName, '经度', '纬度', '类型', '其他信息', '是否入格'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'PHYSIC_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'PHYSIC_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'PHYSIC_LON', align: 'center', cellattr: addCellAttr}, 
		{name: 'PHYSIC_LAT', align: 'center', cellattr: addCellAttr}, 
		{name: 'PHYSIC_TYPE', align: 'center', cellattr: addCellAttr},  
		{name: 'PHYSIC_REST', align: 'center', cellattr: addCellAttr},  
		{name: 'ENTER_GRID', align: 'center', cellattr: addCellAttr, 
			formatter:function(celval, options, rowdata){
				if(celval == "是") 
					return '已入格';
				else
					return '未入格';
			}
		},
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

// 重点小区列表
function getZdxqBottom() {
	var colNamesData = [];
	var colModelData = [];
	var url = $.cxt + "/firstpagethree/getzdxqinfodetail";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val().split("-")[1];
	var twoType = $("#twoType option:selected").val();
	if(null != twoType && "" != twoType) {
		twoType = twoType.split("-")[1] == "1" ? "是" : "否";
	}
	var data = {
		city: city,
		grid: grid,
		town: town,
		oneType: oneType,
		twoType: twoType
	};
	var poiCode = null;
	var poiName = null;
	colNamesData = ['地市名称', '区县名称', '网格名称', "重点小区编码", "重点小区名称", '经度', '纬度', '类型', '其他信息', '是否入格'];
	colModelData = [ 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'PHYSIC_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'PHYSIC_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'PHYSIC_LON', align: 'center', cellattr: addCellAttr}, 
		{name: 'PHYSIC_LAT', align: 'center', cellattr: addCellAttr}, 
		{name: 'PHYSIC_TYPE', align: 'center', cellattr: addCellAttr},  
		{name: 'PHYSIC_REST', align: 'center', cellattr: addCellAttr},  
		{name: 'ENTER_GRID', align: 'center', cellattr: addCellAttr, 
			formatter:function(celval, options, rowdata){
				if(celval == "是") 
					return '已入格';
				else
					return '未入格';
			}
		},
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
//titles = new String[] { "地市名称", "区县名称", "网格名称", "集团编码", "集团名称", "经度", "纬度","详细地址","联系人","联系电话","成员数","是否开通小微宽带","是否开通专线","是否开通家庭宽带","是否开通企业上云"};
//columns = new String[] { "AREA_NAME", "CNTY_NAME", "NAME", "GC_CODE", "GC_NAME", "JING_DU", "WEI_DU","GC_ADDR","LINKMAN","LINKMAN_MSISDN","EMP_NUM","IS_XWKD","IS_KTZX","IS_JTKD","IS_QYSY"};
// 集团单位报表
function getJtdwBottom() {
	var colNamesData = [];
	var colModelData = [];
	var url = "";
	var orgId="";
	var orgLevel="";
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	if(grid!=""){
		orgId=grid;
		orgLevel="4";
	}else if(town!=""){
		orgId=town;
		orgLevel="3";
	}else if(city!=""){
		orgId=city;
		orgLevel="2";
	}
	var oneType = $("#oneType option:selected").val().split("-")[1];
	var twoType = $("#twoType option:selected").val();
	if(twoType==""){
		twoType="AB-YRG-1";
	}
	if(null != twoType && "" != twoType) {
		oneType = twoType.split("-")[0] == "AB" ? oneType = 3 : oneType = 4;
		twoType = twoType.split("-")[2] == "1" ? "是" : "否";
		
	}
	var data = {
		orgId: orgId,
		oneType: oneType,
		twoType: twoType,
		orgLevel:orgLevel
	};
	var poiCode = null;
	var poiName = null;
	var typetext=$("#twoType option:selected").text();
	if(typetext=="AB类已入格"||typetext=="AB类未入格"||typetext=="---二级分类---"){
		url=$.cxt + "/firstpagethree/getjtdwinfodetail";
		colNamesData = ['地市名称', '区县名称', '网格名称', "集团编码", "集团名称", '经度', '纬度', '类型', '是否入格'];
		colModelData = [ 
			{name: 'AREA_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
			{name: 'NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'GC_CODE', align: 'center', cellattr: addCellAttr}, 
			{name: 'GC_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'JING_DU', align: 'center', cellattr: addCellAttr}, 
			{name: 'WEI_DU', align: 'center', cellattr: addCellAttr},  
			{name: 'CLASS_ID', align: 'center', cellattr: addCellAttr},  
			{name: 'ENTER_GRID', align: 'center', cellattr: addCellAttr, 
				formatter:function(celval, options, rowdata){
					if(typetext == "AB类已入格") 
						return '已入格';
					else
						return '未入格';
				}
			},
		];
	}else{
		 data = {
				orgId: orgId,
				orgLevel:orgLevel,
				isEnter: twoType
			};
		url=$.cxt + "/firstpagethree/selectZYGLCDGroupInfoByGridCodes";
		colNamesData = ["地市名称", "区县名称", "网格名称", "集团编码", "集团名称", "经度", "纬度","详细地址","联系人","联系电话","成员数","是否开通小微宽带","是否开通专线","是否开通家庭宽带","是否开通企业上云"];
		colModelData = [ 
			{name: 'AREA_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'CNTY_NAME',align: 'center', cellattr: addCellAttr}, 
			{name: 'NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'GC_CODE', align: 'center', cellattr: addCellAttr}, 
			{name: 'GC_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'JING_DU', align: 'center', cellattr: addCellAttr}, 
			{name: 'WEI_DU', align: 'center', cellattr: addCellAttr}, 
			{name: 'GC_ADDR', align: 'center', cellattr: addCellAttr},  
			{name: 'LINKMAN', align: 'center', cellattr: addCellAttr},  
			{name: 'LINKMAN_MSISDN', align: 'center', cellattr: addCellAttr},
			{name: 'EMP_NUM', align: 'center', cellattr: addCellAttr}, 
			{name: 'IS_XWKD', align: 'center', cellattr: addCellAttr},  
			{name: 'IS_KTZX', align: 'center', cellattr: addCellAttr},  
			{name: 'IS_JTKD', align: 'center', cellattr: addCellAttr},
			{name: 'IS_QYSY', align: 'center', cellattr: addCellAttr}
		];
	}
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