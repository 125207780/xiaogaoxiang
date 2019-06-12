// 自助报表分析方法
function selfHelpReportMethod(treeNode) {
	// 将条件的前五展示出来
	changeSelectInfo(treeNode);
	$("#resourcePanel").css("display", "none");
	$("#benchmarkingAnalysis").css("display", "none");
	$("#tablePanel").css("display", "block");
	$("#topParentConditionDiv").css("display", "block");
	$("#middleFourInfoDiv").css("display", "block");
	$("#bottomDetailDiv").css("display", "block");
	$("#topConditionOrgDiv").css("display", "none");
	$("#topConditionNewOrgDiv").css("display", "block");
	// 开始制作自助报表
	if(treeNode.isParent) {
		var childrenNode = treeNode.children[0];
		if(childrenNode.isParent){
			childrenNode=childrenNode.children[0];
		}
		showSelfHelpReport(childrenNode);
	} else {
		showSelfHelpReport(treeNode);
	}
}

// 开始制作自助报表
function showSelfHelpReport(treeNode) {
	var colNamesData = [];
	var colModelData = [];
	var tableName = null;
	var tableColumn = null;
	var statisDateCol = null;
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var flag = false;
	// 根据对应的条件，查询自助报表的表结构，查询出要展示的字段，要显示的条件信息
	$.ajax({
		url: $.cxt + "/firstpagethree/getselfhelpreportinfo",
		type: "POST",
		async: false,
		data: {netCode: treeNode.id},
		success: function(result) {
			$("#mapForms").empty();
			var json = JSON.parse(result);
			if(json.code == "0") {
				var json = json.data;
				// 判断返回的json不为空
				if(null != json && "" != json && undefined != json) {
					// 1、判断表信息不为空，并给表信息赋值
					var selfHelpReportVo = json[0].selfHelpReportVo;
					tableName = selfHelpReportVo.SELF_HELP_TABLE_NAME;
					tableColumn = selfHelpReportVo.SELF_HELP_TABLE_COLUMN;
					var tHead = selfHelpReportVo.SELF_HELP_TABLE_THEAD.split(",");
					var tBody = selfHelpReportVo.SELF_HELP_TABLE_COLUMN_SHOW.split(",");
					for(var i = 0; i < tHead.length; i++) {
						debugger;
						if(null != grid && "" != grid) {
							if(tHead[i] != "地市编码" && tHead[i] != "地市名称" && tHead[i] != "区县编码" && tHead[i] != "区县名称" 
								&& tHead[i] != "网格编码" && tHead[i] != "网格名称" && tHead[i] != "渠道编码") {
								if(tHead[i] == '一级排名') {
									colNamesData.push("网格内排名");
								} else if(tHead[i] == '二级排名') {
									colNamesData.push("全县排名");
								} else {
									colNamesData.push(tHead[i]);
								}
								if(tHead[i]=="地市名称"||tHead[i]=="区县名称"||tHead[i]=="网格名称"||tHead[i]=="渠道名称"){
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr,frozen:true,sortable:false});
								}else{
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
								}
							} 
						} else if(null != town && "" != town) {
							if(tHead[i] != "地市编码" && tHead[i] != "地市名称" && tHead[i] != "区县编码"
								&& tHead[i] != "区县名称" && tHead[i] != "网格编码" && tHead[i] != "渠道编码" && tHead[i] != "渠道名称") {
								if(tHead[i] == '一级排名') {
									colNamesData.push("全县排名");
								} else if(tHead[i] == '二级排名') {
									colNamesData.push("全市排名");
								} else {
									colNamesData.push(tHead[i]);
								}
								if(tHead[i]=="地市名称"||tHead[i]=="区县名称"||tHead[i]=="网格名称"||tHead[i]=="渠道名称"){
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr,frozen:true,sortable:false});
								}else{
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
								}
							} 
						} else if(null != city && "" != city) {
							if(tHead[i] != "地市编码" && tHead[i] != "地市名称" && tHead[i] != "区县编码"
								&& tHead[i] != "网格编码" && tHead[i] != "网格名称" && tHead[i] != "渠道编码" && tHead[i] != "渠道名称") {
								if(tHead[i] == '一级排名') {
									colNamesData.push("全市排名");
								} else if(tHead[i] == '二级排名') {
									colNamesData.push("全省排名");
								} else {
									colNamesData.push(tHead[i]);
								}
								if(tHead[i]=="地市名称"||tHead[i]=="区县名称"||tHead[i]=="网格名称"||tHead[i]=="渠道名称"){
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr,frozen:true,sortable:false});
								}else{
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
								}
							} 
						} else {
							if(tHead[i] != "地市编码" && tHead[i] != "区县编码" && tHead[i] != "区县名称" && tHead[i] != "网格编码" 
								&& tHead[i] != "网格名称" && tHead[i] != "渠道编码" && tHead[i] != "渠道名称") {
								if(tHead[i] == '一级排名') {
									colNamesData.push("全省排名");
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});	
								} else if(tHead[i] == '二级排名') {
									
								} else {
									if(tHead[i]=="地市名称"||tHead[i]=="区县名称"||tHead[i]=="网格名称"||tHead[i]=="渠道名称"){
										colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr,frozen:true,sortable:false});
									}else{
										colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
									}
									colNamesData.push(tHead[i]);
								}
							} 
						}
					}
					
					// 2、判断条件不为空，将条件设置到form表单中
					var conditionVo = json[0].selfHelpReportCondtitionVo;
					var contentVo = json[0].selfHelpReportCondtentVo;
					var htmltv = "";
					var html = "";
					var conditionName = null;
					for(var i = 0; i < conditionVo.length; i++) {
						html = "";
						conditionName = conditionVo[i].SELF_HELP_CONDITION_TYPE.split("&")[0];
						// 为下拉框
						if("SELECT" == conditionName) {e
							html += "<select style='float:left;' name='" + conditionVo[i].SELF_HELP_CONDITION_KEY + "' id='" 
								+ conditionVo[i].SELF_HELP_CONDITION_KEY + "'>";
							html += "<option value=''>---" + conditionVo[i].SELF_HELP_CONDITION_TYPE.split("&")[1] + "---</option>";
							for(var j = 0; j < contentVo.length; j++) {
								if(conditionVo[i].SELF_HELP_CONDITION_KEY == contentVo[j].SELF_HELP_CONDITION_KEY) {
									var contentValue = contentVo[j].SELF_HELP_CONDITION_CONTENT_VALUE.split(",");
									var contentText = contentVo[j].SELF_HELP_CONDITION_CONTENT_TEXT.split(",");
									for(var k = 0; k < contentValue.length; k++) {
										html += "<option value='" + contentValue[k] + "'>" + contentText[k] + "</option>";
									}
								}
							}
							html += "</select>";
						}
						// 为文本框
						else if("TEXT" == conditionName) {
							html += "<input style='float:left;' type='text' placeholder='" + conditionVo[i].SELF_HELP_CONDITION_TYPE.split("&")[1] + "' name='" + conditionVo[i].SELF_HELP_CONDITION_KEY + "' value='' id='" + conditionVo[i].SELF_HELP_CONDITION_KEY + "' />";
						}
						// 为日期框
						else if("DATE" == conditionName) {
							html += "<input style='float:left;' class='form-control date-picker' placeholder='" + conditionVo[i].SELF_HELP_CONDITION_TYPE.split("&")[1] + "' value='' name='" + conditionVo[i].SELF_HELP_CONDITION_KEY + "' id='" + conditionVo[i].SELF_HELP_CONDITION_KEY.split("&")[1] + "' type='text' />";
							statisDateCol = conditionVo[i].SELF_HELP_CONDITION_KEY.split("&")[1];
						}
						htmltv += html;
					}
					$("#selfHelpReportForms").html(htmltv);
				}
			}
		}
	});
	if(null != statisDateCol && "" != statisDateCol && undefined != statisDateCol) {
		$.ajax({
			url: $.cxt + "/firstpagethree/getselfhelpreportstatisdate",
			type: "POST",
			async: false,
			data: {tableName: tableName},
			success: function(result) {
				var json = JSON.parse(result);
				if(json.code == "0") {
					json = json.data;
					if(undefined != json) {
						$("#" + statisDateCol).val(json.STATIS_DATE);
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
						$("#" + statisDateCol).val(now);
					}
						
				}
			}
		});
	}
	// 获取form表单的所有内容
	var param = $("#selfHelpReportForms").serializeObject();
	var twoType = $("#twoType option:selected").val();
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
		twoType: twoType,
		tableName: tableName,
		tableColumn: tableColumn
	};
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 120;
	$('#idx_table').jqGrid({
		url: $.cxt + "/firstpagethree/selectselfhelpreportinfolist",
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: "100%",
		autowidth: true,
		postData: {
			json: JSON.stringify(data),
			param: JSON.stringify(param)
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
	softFrozenThWidth();
	// 账期时间插件
	$(".date-picker").datepicker({
		format: 'yyyymmdd',
		language: 'zh-CN',
		todayBtn: "linked",
		autoclose: true,
		minview: "3"
	});
}


//将头部适配列表td宽度
function softFrozenThWidth() {
var height=$("#gview_idx_table .ui-jqgrid-hbox .ui-jqgrid-htable").height();
var width = parseFloat($("#idx_table").width()/$("#idx_table").find("tr").eq(0).find("td:visible").length).toFixed(1);
var length=$(".frozen-div .ui-jqgrid-htable .ui-jqgrid-labels").find("th").length;
$(".frozen-div").css("cssText",  "width:"+width*length +"px !important;position: absolute;left: 0px;top: 0px;height: "+(height)+"px;opacity: 1;");
$(".frozen-bdiv.ui-jqgrid-bdiv").css('top',(height)+'px');
$(".frozen-bdiv.ui-jqgrid-bdiv").css('height',($('.ui-jqgrid-bdiv').height()+'px'));
$(".ui-jqgrid-htable").css('height',(height)+'px');

$('#idx_table_frozen').css("cssText","width:"+(width*length-2)+"px !important;border:0px solid !important;color: rgb(255, 255, 255);overflow-x: hidden;border-collapse: separate;border-spacing: 0px;background: url(../../images/index-body-bg.png) no-repeat;");
//$(".frozen-div .ui-jqgrid .ui-jqgrid-hdiv").css('line-height', '76px');
}

// 点击二级菜单后更新报表
function showSelfHelpReportByTwoType(netCode) {
	var colNamesData = [];
	var colModelData = [];
	var tableName = null;
	var tableColumn = null;
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	// 根据对应的条件，查询自助报表的表结构，查询出要展示的字段，要显示的条件信息
	$.ajax({
		url: $.cxt + "/firstpagethree/getselfhelpreportinfo",
		type: "POST",
		async: false,
		data: {netCode: netCode},
		success: function(result) {
			$("#mapForms").empty();
			var json = JSON.parse(result);
			if(json.code == "0") {
				var json = json.data;
				// 判断返回的json不为空
				if(null != json && "" != json && undefined != json) {
					// 1、判断表信息不为空，并给表信息赋值
					var selfHelpReportVo = json[0].selfHelpReportVo;
					tableName = selfHelpReportVo.SELF_HELP_TABLE_NAME;
					tableColumn = selfHelpReportVo.SELF_HELP_TABLE_COLUMN;
					var tHead = selfHelpReportVo.SELF_HELP_TABLE_THEAD.split(",");
					var tBody = selfHelpReportVo.SELF_HELP_TABLE_COLUMN_SHOW.split(",");
					for(var i = 0; i < tHead.length; i++) {
						if(null != grid && "" != grid) {
							if(tHead[i] != "地市编码" && tHead[i] != "地市名称" && tHead[i] != "区县编码" && tHead[i] != "区县名称" 
								&& tHead[i] != "网格编码" && tHead[i] != "网格名称" && tHead[i] != "渠道编码") {
								if(tHead[i] == '一级排名') {
									colNamesData.push("网格内排名");
								} else if(tHead[i] == '二级排名') {
									colNamesData.push("全县排名");
								} else {
									colNamesData.push(tHead[i]);
								}
								if(tHead[i]=="地市名称"||tHead[i]=="区县名称"||tHead[i]=="网格名称"||tHead[i]=="渠道名称"){
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr,frozen:true,sortable:false});
								}else{
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
								}
							} 
						} else if(null != town && "" != town) {
							if(tHead[i] != "地市编码" && tHead[i] != "地市名称" && tHead[i] != "区县编码"
								&& tHead[i] != "区县名称" && tHead[i] != "网格编码" && tHead[i] != "渠道编码" && tHead[i] != "渠道名称") {
								if(tHead[i] == '一级排名') {
									colNamesData.push("全县排名");
								} else if(tHead[i] == '二级排名') {
									colNamesData.push("全市排名");
								} else {
									colNamesData.push(tHead[i]);
								}
								if(tHead[i]=="地市名称"||tHead[i]=="区县名称"||tHead[i]=="网格名称"||tHead[i]=="渠道名称"){
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr,frozen:true,sortable:false});
								}else{
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
								}
							} 
						} else if(null != city && "" != city) {
							if(tHead[i] != "地市编码" && tHead[i] != "地市名称" && tHead[i] != "区县编码"
								&& tHead[i] != "网格编码" && tHead[i] != "网格名称" && tHead[i] != "渠道编码" && tHead[i] != "渠道名称") {
								if(tHead[i] == '一级排名') {
									colNamesData.push("全市排名");
								} else if(tHead[i] == '二级排名') {
									colNamesData.push("全省排名");
								} else {
									colNamesData.push(tHead[i]);
								}
								if(tHead[i]=="地市名称"||tHead[i]=="区县名称"||tHead[i]=="网格名称"||tHead[i]=="渠道名称"){
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr,frozen:true,sortable:false});
								}else{
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
								}
							} 
						} else {
							if(tHead[i] != "地市编码" && tHead[i] != "区县编码" && tHead[i] != "区县名称" && tHead[i] != "网格编码" 
								&& tHead[i] != "网格名称" && tHead[i] != "渠道编码" && tHead[i] != "渠道名称") {
								if(tHead[i] == '一级排名') {
									colNamesData.push("全省排名");
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
								} else if(tHead[i] == '二级排名') {
									
								} else {
									colNamesData.push(tHead[i]);
									if(tHead[i]=="地市名称"||tHead[i]=="区县名称"||tHead[i]=="网格名称"||tHead[i]=="渠道名称"){
										colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr,frozen:true,sortable:false});
									}else{
										colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
									}
								}
							} 
						}
					}
					
					// 2、判断条件不为空，将条件设置到form表单中
					var conditionVo = json[0].selfHelpReportCondtitionVo;
					var contentVo = json[0].selfHelpReportCondtentVo;
					var htmltv = "";
					var html = "";
					var conditionName = null;
					for(var i = 0; i < conditionVo.length; i++) {
						html = "";
						conditionName = conditionVo[i].SELF_HELP_CONDITION_TYPE.split("&")[0];
						// 为下拉框
						if("SELECT" == conditionName) {
							html += "<select style='float:left;' name='" + conditionVo[i].SELF_HELP_CONDITION_KEY + "' id='" 
								+ conditionVo[i].SELF_HELP_CONDITION_KEY + "'>";
							html += "<option value=''>---" + conditionVo[i].SELF_HELP_CONDITION_TYPE.split("&")[1] + "---</option>";
							for(var j = 0; j < contentVo.length; j++) {
								if(conditionVo[i].SELF_HELP_CONDITION_KEY == contentVo[j].SELF_HELP_CONDITION_KEY) {
									var contentValue = contentVo[j].SELF_HELP_CONDITION_CONTENT_VALUE.split(",");
									var contentText = contentVo[j].SELF_HELP_CONDITION_CONTENT_TEXT.split(",");
									for(var k = 0; k < contentValue.length; k++) {
										html += "<option value='" + contentValue[k] + "'>" + contentText[k] + "</option>";
									}
								}
							}
							html += "</select>";
						}
						// 为文本框
						else if("TEXT" == conditionName) {
							html += "<input style='float:left;' type='text' placeholder='" + conditionVo[i].SELF_HELP_CONDITION_TYPE.split("&")[1] + "' name='" + conditionVo[i].SELF_HELP_CONDITION_KEY + "' value='' id='" + conditionVo[i].SELF_HELP_CONDITION_KEY + "' />";
						}
						// 为日期框
						else if("DATE" == conditionName) {
							html += "<input style='float:left;' class='form-control date-picker' placeholder='" + conditionVo[i].SELF_HELP_CONDITION_TYPE.split("&")[1] + "' value='' name='" + conditionVo[i].SELF_HELP_CONDITION_KEY + "' id='" + conditionVo[i].SELF_HELP_CONDITION_KEY + "' type='text' />";
						}
						htmltv += html;
					}
					$("#selfHelpReportForms").html(htmltv);
				}
			}
		}
	});
	// 获取form表单的所有内容
	var param = $("#selfHelpReportForms").serializeObject();
	var twoType = $("#twoType option:selected").val();
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
		twoType: twoType,
		tableName: tableName,
		tableColumn: tableColumn
	};
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 120;
	$('#idx_table').jqGrid({
		url: $.cxt + "/firstpagethree/selectselfhelpreportinfolist",
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: "100%",
		autowidth: true,
		postData: {
			json: JSON.stringify(data),
			param: JSON.stringify(param)
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
	$("#idx_table").jqGrid('setFrozenColumns');//设置冻结列生效
	softFrozenThWidth();
	// 账期时间插件
	$(".date-picker").datepicker({
		format: 'yyyymmdd',
		language: 'zh-CN',
		todayBtn: "linked",
		autoclose: true,
		minview: "3"
	});
}

// 点击查询后报表
function getSelfHelpReportBottom(netCode) {
	var colNamesData = [];
	var colModelData = [];
	var tableName = null;
	var tableColumn = null;
	// 获取form表单的所有内容
	var param = $("#selfHelpReportForms").serializeObject();
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	// 根据对应的条件，查询自助报表的表结构，查询出要展示的字段，要显示的条件信息
	$.ajax({
		url: $.cxt + "/firstpagethree/getselfhelpreportinfo",
		type: "POST",
		async: false,
		data: {netCode: netCode},
		success: function(result) {
			$("#mapForms").empty();
			var json = JSON.parse(result);
			if(json.code == "0") {
				var json = json.data;
				// 判断返回的json不为空
				if(null != json && "" != json && undefined != json) {
					// 1、判断表信息不为空，并给表信息赋值
					var selfHelpReportVo = json[0].selfHelpReportVo;
					tableName = selfHelpReportVo.SELF_HELP_TABLE_NAME;
					tableColumn = selfHelpReportVo.SELF_HELP_TABLE_COLUMN;
					var tHead = selfHelpReportVo.SELF_HELP_TABLE_THEAD.split(",");
					var tBody = selfHelpReportVo.SELF_HELP_TABLE_COLUMN_SHOW.split(",");
					for(var i = 0; i < tHead.length; i++) {
						if(null != grid && "" != grid) {
							if(tHead[i] != "地市编码" && tHead[i] != "地市名称" && tHead[i] != "区县编码" && tHead[i] != "区县名称" 
								&& tHead[i] != "网格编码" && tHead[i] != "网格名称" && tHead[i] != "渠道编码") {
								if(tHead[i] == '一级排名') {
									colNamesData.push("网格内排名");
								} else if(tHead[i] == '二级排名') {
									colNamesData.push("全县排名");
								} else {
									colNamesData.push(tHead[i]);
								}
								if(tHead[i]=="地市名称"||tHead[i]=="区县名称"||tHead[i]=="网格名称"||tHead[i]=="渠道名称"){
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr,frozen:true,sortable:false});
								}else{
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
								}
							} 
						} else if(null != town && "" != town) {
							if(tHead[i] != "地市编码" && tHead[i] != "地市名称" && tHead[i] != "区县编码"
								&& tHead[i] != "区县名称" && tHead[i] != "网格编码" && tHead[i] != "渠道编码" && tHead[i] != "渠道名称") {
								if(tHead[i] == '一级排名') {
									colNamesData.push("全县排名");
								} else if(tHead[i] == '二级排名') {
									colNamesData.push("全市排名");
								} else {
									colNamesData.push(tHead[i]);
								}
								if(tHead[i]=="地市名称"||tHead[i]=="区县名称"||tHead[i]=="网格名称"||tHead[i]=="渠道名称"){
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr,frozen:true,sortable:false});
								}else{
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
								}
							} 
						} else if(null != city && "" != city) {
							if(tHead[i] != "地市编码" && tHead[i] != "地市名称" && tHead[i] != "区县编码"
								&& tHead[i] != "网格编码" && tHead[i] != "网格名称" && tHead[i] != "渠道编码" && tHead[i] != "渠道名称") {
								if(tHead[i] == '一级排名') {
									colNamesData.push("全市排名");
								} else if(tHead[i] == '二级排名') {
									colNamesData.push("全省排名");
								} else {
									colNamesData.push(tHead[i]);
								}
								if(tHead[i]=="地市名称"||tHead[i]=="区县名称"||tHead[i]=="网格名称"||tHead[i]=="渠道名称"){
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr,frozen:true,sortable:false});
								}else{
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
								}
							} 
						} else {
							if(tHead[i] != "地市编码" && tHead[i] != "区县编码" && tHead[i] != "区县名称" && tHead[i] != "网格编码" 
								&& tHead[i] != "网格名称" && tHead[i] != "渠道编码" && tHead[i] != "渠道名称") {
								if(tHead[i] == '一级排名') {
									colNamesData.push("全省排名");
									colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
								} else if(tHead[i] == '二级排名') {
									
								} else {
									colNamesData.push(tHead[i]);
									if(tHead[i]=="地市名称"||tHead[i]=="区县名称"||tHead[i]=="网格名称"||tHead[i]=="渠道名称"){
										colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr,frozen:true,sortable:false});
									}else{
										colModelData.push({name: tBody[i], align: 'center', cellattr: addCellAttr});
									}
								}
							} 
						}
					}
				}
			}
		}
	});
	var twoType = $("#twoType option:selected").val();
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
		twoType: twoType,
		tableName: tableName,
		tableColumn: tableColumn
	};
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 120;
	$('#idx_table').jqGrid({
		url: $.cxt + "/firstpagethree/selectselfhelpreportinfolist",
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: "100%",
		autowidth: true,
		postData: {
			json: JSON.stringify(data),
			param: JSON.stringify(param)
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
	softFrozenThWidth();
}