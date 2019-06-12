// 报表导出
$("#importReportBtn").on("click", importReportBtn);
function importReportBtn() {
	var searchDataBtn = $("#searchBtn").attr("data"); 
	// 如果属性不为空，则表示查询自助分析报表
	if(null != searchDataBtn && "" != searchDataBtn && undefined != searchDataBtn) {
		var oneType = $("#oneType option:selected").val();
		var oneTypeName = $("#oneType option:selected").text();
		var twoType = $("#twoType option:selected").val();
		var twoTypeName = $("#twoType option:selected").text();
		var twoTypeUnSelect = $("#twoType");
		if(null != twoType && "" != twoType) {
			selfHelpReportExportByTwoType(twoType, twoTypeName);
		} else {
			if(twoTypeUnSelect[0].length > 1) {
				selfHelpReportExportByTwoType(twoTypeUnSelect[0][1].value, twoTypeUnSelect[0][1].text);
			} else {
				selfHelpReportExportByTwoType(oneType, oneTypeName);
			}
		}
	} else {
		var conditionOne = $("#twoType option:selected").val();
		var oneType = $("#oneType option:selected").val();
		// 重点业务导出
		if("zdyw" == oneType) {
			exportZdyw();
		}
		// 业务办理导出
		else if("YWBL" == oneType) {
			exportYwbl();
		}
		// 集团单位导出
		else if("JTDW-34" == oneType) {
			exportJtdw();
		}
		// 人员/网格/网格基础信息导出
		else if("RYXX" == oneType || "WGXX" == oneType || "WGJCXX" == oneType) {
			exportRyxxOrWgxx();
		}
		// 校园报表信息导出
		else if("XYBB" == oneType) {
			exportXybb();
		} 
		// 酬金月报信息导出
		else if("CJXX" == oneType) {
			exportCJbb();
		} 
		// 装维报表信息导出
		else if("ZWXX" == oneType) {
			exportZWbb();
		} // 投诉信息报表导出
		else if("TSXX" == oneType) {
			exportTSbb();
		} 
		else if("JFBB" == oneType) {
			exportJFbb();
		}
		// 基站信息
		if("JZXX-5" == oneType) {
			exportZyxxbb();
		} 
		// 渠道信息
		else if("QDXX-1" == oneType) {
			exportZyxxbb();
		} 
		// 小区信息
		else if("XQXX-2" == oneType) {
			exportZyxxbb();
		} 
		// 重点小区信息
		else if("ZDXQ-7" == oneType) {
			exportZdxqbb();
		}
		// 端口信息
		else if("DKXX-6" == oneType) {
			exportZyxxbb();
		}
		//任务月报
		else if("RWYB" == oneType) {
			exportRwybbb();
		} 
		// 行销任务
		else if("XXRW" == oneType) {
			exportXxrwbb();
		}
		// 客户发展
		else if("KHFZ" == oneType) {
			exportKhfzbb();
		}
	}
}

function exportZyxxbb(){
	var oneType = $("#oneType option:selected").val().split("-")[1];
	var twoType = $("#twoType option:selected").val();
	if(null != twoType && "" != twoType) {
		twoType = twoType.split("-")[1] == "1" ? "是" : "否";
	}
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + oneType +"' name='oneType' />";
	html += "<input type='text' value='" + twoType +"' name='twoType' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptfirstpagethree/exportzyxxinfo">' + html + '</form>').appendTo('body').submit().remove();	
}
function exportZdxqbb(){
	var oneType = $("#oneType option:selected").val().split("-")[1];
	var twoType = $("#twoType option:selected").val();
	if(null != twoType && "" != twoType) {
		twoType = twoType.split("-")[1] == "1" ? "是" : "否";
	}
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + oneType +"' name='oneType' />";
	   html +="<input type='text' value='" + twoType +"' name='twoType' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptfirstpagethree/exportzdxqinfo">' + html + '</form>').appendTo('body').submit().remove();	
}
// 自助分析报表工具导出
function selfHelpReportExportByTwoType(netCode, netName) {
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
    var param = $("#selfHelpReportForms").serializeObject();
    param= JSON.stringify(param);
	// 拼接到一个text标签中
	var html  = "<input type='text' value='" + netCode + "' name='netCode' />";
	    html += "<input type='text' value='" + netName + "' name='netName' />";
	    html += "<input type='text' value='" + param + "' name='param' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptfirstpagethree/exportselfhelprptexportinfo">' + html + '</form>').appendTo('body').submit().remove();
}                                                             

// 集团单位导出
function exportJtdw() {
	var conditionOne = $("#twoType option:selected").val();
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var orgId = "";
	var orgLevel = ""; 
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
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + orgId +"' name='orgId' />";
	    html += "<input type='text' value='" + orgLevel +"' name='orgLevel' />";
	    html += "<input type='text' value='" + conditionOne + "' name='conditionOne' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptcomposite/exportRptInfo">' + html + '</form>').appendTo('body').submit().remove();
}

// 重点业务导出
function exportZdyw() {
	var conditionOne = $("#twoType option:selected").val();
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var conditionTwo = $("#conditionTwo option:selected").val();
	var statisDate = $("#statisDate").val();
	var orgId = "";
	var orgLevel = ""; 
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
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + orgId +"' name='orgId' />";
	html += "<input type='text' value='" + orgLevel +"' name='orgLevel' />";
	html += "<input type='text' value='" + statisDate +"' name='statisDate' />";
	html += "<input type='text' value='" + conditionOne + "' name='conditionOne' />";
	html += "<input type='text' value='" + conditionTwo + "' name='conditionTwo' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptcomposite/exportRptInfo">' + html + '</form>').appendTo('body').submit().remove();
}

// 导出业务办理
function exportYwbl() {
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
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
	}
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + statisDate +"' name='statisDate' />";
	   html += "<input type='text' value='" + twoType + "' name='twoType' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptfirstpagethree/exportywblinfo">' + html + '</form>').appendTo('body').submit().remove();
}

// 人员/网格/网格基础信息导出
function exportRyxxOrWgxx() {
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
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
	}
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + orgId +"' name='orgId' />";
	html += "<input type='text' value='" + orgLevel +"' name='orgLevel' />";
	html += "<input type='text' value='" + oneType + "' name='oneType' />";
	html += "<input type='text' value='" + twoType + "' name='twoType' />";
	html += "<input type='text' value='" + statisDate + "' name='statisDate' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptfirstpagethree/exportryxxorwgxxinfo">' + html + '</form>').appendTo('body').submit().remove();
}
//酬金月报信息导出
function exportCJbb(){
	var statisDate = $("#statisDate").val();
	if(statisDate!=""){
		statisDate=statisDate.substring(0, 6);
	}
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + statisDate +"' name='statisDate' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptfirstpagethree/exportcjybinfo">' + html + '</form>').appendTo('body').submit().remove();	
}

//装维信息导出
function exportZWbb(){
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptfirstpagethree/exportzwxxinfo"></form>').appendTo('body').submit().remove();	
}
//投诉信息报表导出
function exportTSbb(){
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptfirstpagethree/exporttsxxinfo"></form>').appendTo('body').submit().remove();	
}

//经分信息报表导出
function exportJFbb(){
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var statisDate = $("#statisDate").val();
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + city +"' name='city' />";
	html += "<input type='text' value='" + town +"' name='town' />";
	html += "<input type='text' value='" + grid +"' name='grid' />";
	html += "<input type='text' value='" + statisDate +"' name='statisDate' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptfirstpagethree/exportjfbbinfo">' + html + '</form>').appendTo('body').submit().remove();	
}

//客户发展报表导出
function exportKhfzbb(){
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var statisDate = $("#statisDate").val();
	var oneType = $("#oneType option:selected").val();
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
	}
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + orgId +"' name='orgId' />";
	html += "<input type='text' value='" + orgLevel +"' name='orgLevel' />";
	html += "<input type='text' value='" + oneType + "' name='oneType' />";
	html += "<input type='text' value='" + twoType + "' name='twoType' />";
	html += "<input type='text' value='" + statisDate +"' name='statisDate' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptfirstpagethree/exportkhfzinfo">' + html + '</form>').appendTo('body').submit().remove();
}

//任务下发月报导出
function exportRwybbb(){
	var statisDate = $("#statisDate").val();
	if(statisDate!=""){
		statisDate=statisDate.substring(0, 6);
	}
	// 拼接到一个text标签中
	var html ="<input type='text' value='" + statisDate +"' name='statisDate' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptfirstpagethree/exportrwxfybinfo">' + html + '</form>').appendTo('body').submit().remove();	
}
//行销任务导出
function exportXxrwbb(){
	var statisDate = $("#statisDate").val();
	// 拼接到一个text标签中
	var html ="<input type='text' value='" + statisDate +"' name='statisDate' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptfirstpagethree/exportxxrwinfo">' + html + '</form>').appendTo('body').submit().remove();	
}
// 校园报表信息导出
function exportXybb() {
	var city = $("#city option:selected").val();
	var town = $("#town option:selected").val();
	var grid = $("#grid option:selected").val();
	var oneType = $("#oneType option:selected").val();
	var twoType = $("#twoType option:selected").val();
	var statisDate = null;
	if("XYYXBBYHBM" == twoType||"XYYWYHBM" == twoType || "XYYHHXBM" == twoType || "XYYXBBXYKHQKM" == twoType || "XYYHFEFBM" == twoType) {
		statisDate = $("#statisDate").val().substring(0, 6);
	} else if("XYYXBBXYKHQKD" == twoType || "XYYXBBXYZDHDBLQKD" == twoType || "XYYXBBXYZDHDBLMXQKD" == twoType
			|| "XYYXBBCLXYKHBYQKRBBD" == twoType || "XYYHFEFBD" == twoType) {
		statisDate = $("#statisDate").val();
	}
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + city +"' name='city' />";
	html += "<input type='text' value='" + town +"' name='town' />";
	html += "<input type='text' value='" + grid +"' name='grid' />";
	html += "<input type='text' value='" + statisDate +"' name='statisDate' />";
	html += "<input type='text' value='" + oneType + "' name='oneType' />";
	html += "<input type='text' value='" + twoType + "' name='twoType' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/rptfirstpagethree/exportxybbinfo">' + html + '</form>').appendTo('body').submit().remove();
}