$(function() {
	// 初始化获取整个屏幕高度，让高度自适应
	var activeDivHeight = $(window).height() - $(".activeDIV").offset().top;
	$(".activeDIV").css("height", activeDivHeight + "px");
	// 初始化地市、区县、网格下拉框
	initSelectInfo();
	// 初始化网格总监信息
	initDirectInfo();
});

// 网格总监信息维护点击事件
$("#activeOne").on("click", activeOne);
function activeOne(){
	// 初始化地市、区县、网格下拉框
	initSelectInfo();
	// 初始化网格总监信息
	initDirectInfo();
}

// 网格内人员信息维护点击事件
$("#activeTwo").on("click", activeTwo);
function activeTwo() {
	// 初始化地市、区县、网格下拉框
	initSelectTwoInfo();
	// 初始化网格人员信息
	initGridUsrInfo();
}

// 初始化网格人员信息
function initGridUsrInfo() {
	var city = $("#cityTwo option:selected").val();
	var cnty = $("#cntyTwo option:selected").val();
	var grid = $("#gridTwo option:selected").val();
	var orgLevel = null;
	var orgId = null;
	if(null != grid && "" != grid) {
		orgLevel = "4";
		orgId = grid;
	} else if(null != cnty && "" != cnty) {
		orgLevel = "3";
		orgId = cnty;
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
	};
	var colNamesData = [];
	var colModelData = [];
	colNamesData = ["地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", 
	                "网格总监姓名", "网格内人员名称", "网格内人员类型", "网格内人员Boss工号", "网格内人员电话",
	                "性别", "年龄", "政治面貌", "身份", "职级", "Boss工号归属渠道", "归属渠道类型", "管理模式", "身份证号","网格区域属性","员工类型"];
	colModelData = [ 
		{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'DIRECTOR_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'USR_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'USR_TYPE', align: 'center', cellattr: addCellAttr}, 
		{name: 'USR_BOSS_CODE', align: 'center', cellattr: addCellAttr},
		{name: 'USR_PHONE', align: 'center', cellattr: addCellAttr},
		{name: 'USR_SEX', align: 'center', cellattr: addCellAttr},
		{name: 'USR_AGE', align: 'center', cellattr: addCellAttr},
		{name: 'USR_POUTLOOK', align: 'center', cellattr: addCellAttr},
		{name: 'USR_IDENTITY', align: 'center', cellattr: addCellAttr},
		{name: 'USR_RANK', align: 'center', cellattr: addCellAttr},
		{name: 'USR_BOSS_CHNL', align: 'center', cellattr: addCellAttr},
		{name: 'CHNL_TYPE', align: 'center', cellattr: addCellAttr},
		{name: 'MANA_MODEL', align: 'center', cellattr: addCellAttr},
		{name: 'ID_NUMBER', align: 'center', cellattr: addCellAttr},
		{name: 'GRID_ATTRIBUTE', align: 'center', cellattr: addCellAttr,formatter: gridAttribute},
		{name: 'USR_MOLD', align: 'center', cellattr: addCellAttr,formatter: usrMold}
	];
	$('#idx_table1').GridUnload();
	var heightB = $(window).height() - $("#idx_table1").offset().top - 150;
	$('#idx_table1').jqGrid({
		url: $.cxt + "/gridUsrInfo/initGridUsrInfo",
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: '90%',
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
		pager: '#idx_grid-pager1',
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

//网格区域属性
function gridAttribute(celval, options, rowdata){
	if(celval == '1') {
		return "农村网格";
	} else if(celval == '0') {
		return "城区网格";
	} else {
		return "未填写";
	}	
}

// 员工类型
function usrMold(celval, options, rowdata){
	if(celval == '1'){
		return "劳务合同制员工";
	} else if(celval == '2') {
		return "劳务派遣人员";
	} else if(celval == '0'){
		return "无";
	} else {
		return "未填写";
	}	
}

// 初始化网格总监信息
function initDirectInfo() {
	var city = $("#city option:selected").val();
	var cnty = $("#cnty option:selected").val();
	var grid = $("#grid option:selected").val();
	var orgLevel = null;
	var orgId = null;
	if(null != grid && "" != grid) {
		orgLevel = "4";
		orgId = grid;
	} else if(null != cnty && "" != cnty) {
		orgLevel = "3";
		orgId = cnty;
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
	};
	var colNamesData = [];
	var colModelData = [];
	colNamesData = ["地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", 
	                "网格总监编码", "网格总监登陆账号", "网格总监姓名", "网格总监电话"];
	colModelData = [ 
		{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'JB_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'LOGIN_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'PHONE', align: 'center', cellattr: addCellAttr}
	];
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 150;
	$('#idx_table').jqGrid({
		url: $.cxt + "/gridUsrInfo/initDirectInfo",
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: '90%',
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

// 查询网格人员信息
$("#searchGridUsrInfo").on("click", searchGridUsrInfo);
function searchGridUsrInfo() {
	var city = $("#cityTwo option:selected").val();
	var cnty = $("#cntyTwo option:selected").val();
	var grid = $("#gridTwo option:selected").val();
	var orgLevel = null;
	var orgId = null;
	if(null != grid && "" != grid) {
		orgLevel = "4";
		orgId = grid;
	} else if(null != cnty && "" != cnty) {
		orgLevel = "3";
		orgId = cnty;
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
	};
	var colNamesData = [];
	var colModelData = [];
	colNamesData = ["地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", 
	                "网格总监姓名", "网格内人员名称", "网格内人员类型", "网格内人员Boss工号", "网格内人员电话",
	                "性别", "年龄", "政治面貌", "身份", "职级", "Boss工号归属渠道", "归属渠道类型", "管理模式", "身份证号","网格区域属性","员工类型"];
	colModelData = [ 
		{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'DIRECTOR_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'USR_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'USR_TYPE', align: 'center', cellattr: addCellAttr}, 
		{name: 'USR_BOSS_CODE', align: 'center', cellattr: addCellAttr},
		{name: 'USR_PHONE', align: 'center', cellattr: addCellAttr},
		{name: 'USR_SEX', align: 'center', cellattr: addCellAttr},
		{name: 'USR_AGE', align: 'center', cellattr: addCellAttr},
		{name: 'USR_POUTLOOK', align: 'center', cellattr: addCellAttr},
		{name: 'USR_IDENTITY', align: 'center', cellattr: addCellAttr},
		{name: 'USR_RANK', align: 'center', cellattr: addCellAttr},
		{name: 'USR_BOSS_CHNL', align: 'center', cellattr: addCellAttr},
		{name: 'CHNL_TYPE', align: 'center', cellattr: addCellAttr},
		{name: 'MANA_MODEL', align: 'center', cellattr: addCellAttr},
		{name: 'ID_NUMBER', align: 'center', cellattr: addCellAttr},
		{name: 'GRID_ATTRIBUTE', align: 'center', cellattr: addCellAttr,formatter: gridAttribute},
		{name: 'USR_MOLD', align: 'center', cellattr: addCellAttr,formatter: usrMold}
	];
	$('#idx_table1').GridUnload();
	var heightB = $(window).height() - $("#idx_table1").offset().top - 150;
	$('#idx_table1').jqGrid({
		url: $.cxt + "/gridUsrInfo/initGridUsrInfo",
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: '90%',
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
		pager: '#idx_grid-pager1',
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

// 查询网格总监信息
$("#searchDirectInfo").on("click", searchDirectInfo);
function searchDirectInfo() {
	var city = $("#city option:selected").val();
	var cnty = $("#cnty option:selected").val();
	var grid = $("#grid option:selected").val();
	var orgLevel = null;
	var orgId = null;
	if(null != grid && "" != grid) {
		orgLevel = "4";
		orgId = grid;
	} else if(null != cnty && "" != cnty) {
		orgLevel = "3";
		orgId = cnty;
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
	};
	var colNamesData = [];
	var colModelData = [];
	colNamesData = ["地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", 
	                "网格总监编码", "网格总监登陆账号", "网格总监姓名", "网格总监电话"];
	colModelData = [ 
		{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'JB_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'LOGIN_ID', align: 'center', cellattr: addCellAttr}, 
		{name: 'NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'PHONE', align: 'center', cellattr: addCellAttr}
	];
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $("#idx_table").offset().top - 150;
	$('#idx_table').jqGrid({
		url: $.cxt + "/gridUsrInfo/initDirectInfo",
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: '90%',
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

// 导出网格总监模板
$("#downloadDirectModel").on("click", downloadDirectModel);
function downloadDirectModel() {
	window.location.href = $.cxt + "/gridUsrInfo/exportDirectInfoModel";
}
// 组织机构下载
$("#downloadNetResourceModel").on("click", downloadNetResourceModel);
function downloadNetResourceModel() {
	window.location.href = $.cxt + "/gridUsrInfo/downloadNetResourceModel";
}

//组织机构下载
$("#downloadNetResourceModel1").on("click", downloadNetResourceModel);


//导出网格总监模板
$("#downloadGridUsrModel").on("click", downloadGridUsrModel);
function downloadGridUsrModel() {
	window.location.href = $.cxt + "/gridUsrInfo/exportGridUsrInfoModel";
}

// 导入网格总监模板
$("#uploadDirectModel").on("click", uploadDirectModel);
function uploadDirectModel() {
	var param = {};
	// 提示没有选择文件
	if($("#directInfoFileDir").val() == "") {
  		messageAlert("请选择上传的数据文件");
  		return;
  	}
  	var fileExtension = $("#directInfoFileDir").val().split('.').pop().toLowerCase();
  	// 提示选择文件大小不能超过30M
  	if(getFileSize("directInfoFileDir") > 30) {
  		messageAlert("数据文件不能大于30M");
  		return;
  	}
  	// 提示选择文件类型
  	if(fileExtension != "xls") {
  		messageAlert("请选择2003版excel");
  		return;
  	}
  	
  	var form = document.getElementById('upformDirectInfo');
    var formData = new FormData(form);
    $.ajax({
	    url: $.cxt + "/gridUsrInfo/uploadDirectInfo",
	    type: "post",
	    data: formData,
	    processData: false,
	    contentType: false,
	    async: false,
	    success: function(result) {
	    	var json = JSON.parse(result);
	        if(json.code == "0") {
        		messageAlert(json.msg.split("&")[0]);
	            // 初始化地市、区县、网格下拉框
	        	initSelectInfo();
	        	// 初始化网格总监信息
	        	initDirectInfo();
	        } else {
	        	if(undefined != json.msg.split("&")[1]) {
	        		var htmltv = "<input type='text' name='jsonList' id='jsonList' value='" + json.msg.split("&")[1] + "'/>";
		        	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
		        	$('<form method="POST" action="' + $.cxt + '/gridUsrInfo/exportErrorDirectInfo">"' + htmltv + '"</form>').appendTo('body').submit().remove();	
	        	}
	        }
	    },
	    error: function(err) {
	    	messageAlert("网络连接失败,稍后重试", err);
	    }
    });
    return false;
}

// 导入网格人员模板
$("#uploadGridUsrModel").on("click", uploadGridUsrModel);
function uploadGridUsrModel() {
	var param = {};
	// 提示没有选择文件
	if($("#gridUsrInfoFileDir").val() == "") {
  		messageAlert("请选择上传的数据文件");
  		return;
  	}
  	var fileExtension = $("#gridUsrInfoFileDir").val().split('.').pop().toLowerCase();
  	// 提示选择文件大小不能超过30M
  	if(getFileSize("gridUsrInfoFileDir") > 30) {
  		messageAlert("数据文件不能大于30M");
  		return;
  	}
  	// 提示选择文件类型
  	if(fileExtension != "xls") {
  		messageAlert("请选择2003版excel");
  		return;
  	}
  	
  	var form = document.getElementById('upformGridUsrInfo');
    var formData = new FormData(form);
    $.ajax({
	    url: $.cxt + "/gridUsrInfo/uploadGridUsrInfo",
	    type: "post",
	    data: formData,
	    processData: false,
	    contentType: false,
	    async: false,
	    success: function(result) {
	    	var json = JSON.parse(result);
	        if(json.code == "0") {
        		messageAlert(json.msg.split("&")[0]);
	            // 初始化地市、区县、网格下拉框
	        	initSelectTwoInfo();
	        	// 初始化网格总监信息
	        	initGridUsrInfo();
	        } else {
	        	if(undefined != json.msg.split("&")[1]) {
	        		var htmltv = "<input type='text' name='jsonList' id='jsonList' value='" + json.msg.split("&")[1] + "'/>";
		        	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
		        	$('<form method="POST" action="' + $.cxt + '/gridUsrInfo/exportErrorGridUsrInfo">"' + htmltv + '"</form>').appendTo('body').submit().remove();	
	        	}
	        }
	    },
	    error: function(err) {
	    	messageAlert("网络连接失败,稍后重试", err);
	    }
    });
    return false;
}

// 网格网格总监导出明细列表
$("#exportDirectInfoDetail").on("click", exportDirectInfoDetail);
function exportDirectInfoDetail() {
	var city = $("#city option:selected").val();
	var cnty = $("#cnty option:selected").val();
	var grid = $("#grid option:selected").val();
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + city +"' name='city' />";
	html += "<input type='text' value='" + cnty +"' name='cnty' />";
	html += "<input type='text' value='" + grid +"' name='grid' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/gridUsrInfo/exportDirectInfoDetail">' + html + '</form>').appendTo('body').submit().remove();
}

// 网格人员信息导出明细列表
$("#exportGridUsrInfoDetail").on("click", exportGridUsrInfoDetail);
function exportGridUsrInfoDetail() {
	var city = $("#city option:selected").val();
	var cnty = $("#cnty option:selected").val();
	var grid = $("#grid option:selected").val();
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + city +"' name='city' />";
	html += "<input type='text' value='" + cnty +"' name='cnty' />";
	html += "<input type='text' value='" + grid +"' name='grid' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/gridUsrInfo/exportGridUsrInfoDetail">' + html + '</form>').appendTo('body').submit().remove();
}

// 初始化进入地市、区县、网格下拉框
function initSelectTwoInfo() {
	$.ajax({
		url: $.cxt + "/contract/initSelectInfo",
		type: "POST",
		async: false,
		success: function(result) {
			// 根据当前登录人的权限，将地市、区县、网格的内容一次性查询出来，并做好权限控制
			var json = JSON.parse(result);
			if(json.code = "0") {
				json = json.data;
				var city = json[0].CITY;
				var cnty = json[1].CNTY;
				var grid = json[2].GRID;
				var cityHtml = "";
				var cntyHtml = "";
				var gridHtml = "";
				// 查询出来只有一条地市信息，则不需要“请选择地市”提示
				if(city.length == 1) {
					cityHtml = "<option value='" + city[0].orgId + "'>" + city[0].name + "</option>";
				} else {
					cityHtml = "<option value=''>---地市---</option>";
					for(var i = 0; i < city.length; i++) {
						cityHtml += "<option value='" + city[i].orgId + "'>" + city[i].name + "</option>";
					}
				}
				// 查询出来没有内容，则表示还未选择地市，则需要给出“请选择区县”提示
				if(null != cnty && "" != cnty && undefined != cnty) {
					if(cnty.length == 1) {
						cntyHtml = "<option value='" + cnty[0].orgId + "'>" + cnty[0].name + "</option>";
					} else {
						cntyHtml = "<option value=''>---区县---</option>";
						for(var i = 0; i < cnty.length; i++) {
							cntyHtml += "<option value='" + cnty[i].orgId + "'>" + cnty[i].name + "</option>";
						}
					}
				} else {
					cntyHtml = "<option value=''>---区县---</option>";
				}
				// 查询出来没有内容，则表示还未选择区县，则需要给出“请选择网格”提示
				if(null != grid && "" != grid && undefined != grid) {
					if(grid.length == 1) {
						gridHtml = "<option value='" + grid[0].orgId + "'>" + grid[0].name + "</option>";
					} else {
						gridHtml = "<option value=''>---网格---</option>";
						for(var i = 0; i < grid.length; i++) {
							gridHtml += "<option value='" + grid[i].orgId + "'>" + grid[i].name + "</option>";
						}
					}
				} else {
					gridHtml = "<option value=''>---网格---</option>";
				}
				$("#cityTwo").html(cityHtml);
				$("#cntyTwo").html(cntyHtml);
				$("#gridTwo").html(gridHtml);
			}
		}
	});
}

// 初始化进入地市、区县、网格下拉框
function initSelectInfo() {
	$.ajax({
		url: $.cxt + "/contract/initSelectInfo",
		type: "POST",
		async: false,
		success: function(result) {
			// 根据当前登录人的权限，将地市、区县、网格的内容一次性查询出来，并做好权限控制
			var json = JSON.parse(result);
			if(json.code = "0") {
				json = json.data;
				var city = json[0].CITY;
				var cnty = json[1].CNTY;
				var grid = json[2].GRID;
				var cityHtml = "";
				var cntyHtml = "";
				var gridHtml = "";
				// 查询出来只有一条地市信息，则不需要“请选择地市”提示
				if(city.length == 1) {
					cityHtml = "<option value='" + city[0].orgId + "'>" + city[0].name + "</option>";
				} else {
					cityHtml = "<option value=''>---地市---</option>";
					for(var i = 0; i < city.length; i++) {
						cityHtml += "<option value='" + city[i].orgId + "'>" + city[i].name + "</option>";
					}
				}
				// 查询出来没有内容，则表示还未选择地市，则需要给出“请选择区县”提示
				if(null != cnty && "" != cnty && undefined != cnty) {
					if(cnty.length == 1) {
						cntyHtml = "<option value='" + cnty[0].orgId + "'>" + cnty[0].name + "</option>";
					} else {
						cntyHtml = "<option value=''>---区县---</option>";
						for(var i = 0; i < cnty.length; i++) {
							cntyHtml += "<option value='" + cnty[i].orgId + "'>" + cnty[i].name + "</option>";
						}
					}
				} else {
					cntyHtml = "<option value=''>---区县---</option>";
				}
				// 查询出来没有内容，则表示还未选择区县，则需要给出“请选择网格”提示
				if(null != grid && "" != grid && undefined != grid) {
					if(grid.length == 1) {
						gridHtml = "<option value='" + grid[0].orgId + "'>" + grid[0].name + "</option>";
					} else {
						gridHtml = "<option value=''>---网格---</option>";
						for(var i = 0; i < grid.length; i++) {
							gridHtml += "<option value='" + grid[i].orgId + "'>" + grid[i].name + "</option>";
						}
					}
				} else {
					gridHtml = "<option value=''>---网格---</option>";
				}
				$("#city").html(cityHtml);
				$("#cnty").html(cntyHtml);
				$("#grid").html(gridHtml);
			}
		}
	});
}

// 选择地市，改变区县值
$("#cityTwo").on("change", city);
function city() {
	$("#cntyTwo").empty();
	$("#gridTwo").empty();
	var orgId = $("#cityTwo option:selected").val();
	// 如果地市的值不为空，则加载区县和网格
	if(null != orgId && "" != orgId) {
		$.ajax({
			url: $.cxt + "/firstpagethree/getchildrensysorgbyorgid",
			data: {orgId: orgId},
			type: "POST",
			async:false,  
			success: function(result) {
				var json = JSON.parse(result).data;
				var htmltv = "<option value=''>---区县---</option>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
				}
				$("#cntyTwo").html(htmltv);
				htmltv = "<option value=''>---网格---</option>";
				$("#gridTwo").html(htmltv);
			}
		});
	} 
	// 如果地市选择为空，则将区县、网格下拉框全部置为空
	else {
		var htmltv = "<option value=''>---区县---</option>";
		$("#cntyTwo").html(htmltv);
		htmltv = "<option value=''>---网格---</option>";
		$("#gridTwo").html(htmltv);
	}
}

// 选择地市，改变区县值
$("#city").on("change", city);
function city() {
	$("#cnty").empty();
	$("#grid").empty();
	var orgId = $("#city option:selected").val();
	// 如果地市的值不为空，则加载区县和网格
	if(null != orgId && "" != orgId) {
		$.ajax({
			url: $.cxt + "/firstpagethree/getchildrensysorgbyorgid",
			data: {orgId: orgId},
			type: "POST",
			async:false,  
			success: function(result) {
				var json = JSON.parse(result).data;
				var htmltv = "<option value=''>---区县---</option>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
				}
				$("#cnty").html(htmltv);
				htmltv = "<option value=''>---网格---</option>";
				$("#grid").html(htmltv);
			}
		});
	} 
	// 如果地市选择为空，则将区县、网格下拉框全部置为空
	else {
		var htmltv = "<option value=''>---区县---</option>";
		$("#cnty").html(htmltv);
		htmltv = "<option value=''>---网格---</option>";
		$("#grid").html(htmltv);
	}
}

// 选择区县，改变网格值
$("#cntyTwo").on("change", cntyTwo);
function cntyTwo() {
	$("#gridTwo").empty();
	var orgId = $("#cntyTwo option:selected").val();
	// 判断区县是否有无选择，有选择，则加载网格信息
	if(null != orgId && "" != orgId) {
		$.ajax({
			url: $.cxt + "/firstpagethree/getchildrensysorgbyorgid",
			data: {orgId: orgId},
			type: "POST",
			success: function(result) {
				var json = JSON.parse(result).data;
				var htmltv = "<option value=''>---网格---</option>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
				}
				$("#gridTwo").html(htmltv);
			}
		});
	} 
	// 判断区县是否有无选择，无选择，则将网格下拉框置为空
	else {
		var htmltv = "<option value=''>--网格---</option>";
		$("#gridTwo").html(htmltv);
	}
}

// 选择区县，改变网格值
$("#cnty").on("change", cnty);
function cnty() {
	$("#grid").empty();
	var orgId = $("#cnty option:selected").val();
	// 判断区县是否有无选择，有选择，则加载网格信息
	if(null != orgId && "" != orgId) {
		$.ajax({
			url: $.cxt + "/firstpagethree/getchildrensysorgbyorgid",
			data: {orgId: orgId},
			type: "POST",
			success: function(result) {
				var json = JSON.parse(result).data;
				var htmltv = "<option value=''>---网格---</option>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
				}
				$("#grid").html(htmltv);
			}
		});
	} 
	// 判断区县是否有无选择，无选择，则将网格下拉框置为空
	else {
		var htmltv = "<option value=''>--网格---</option>";
		$("#grid").html(htmltv);
	}
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

// 字体颜色修改
function addCellAttr(rowId, val, rawObject, cm, rdata) {
	return "style='color:white'";
}

// 将头部适配列表td宽度
function softThWidth() {
	var width = parseFloat($("#idx_table").width() / $("#idx_table").find("tr").eq(0).find("td:visible").length).toFixed(1);
	$(".ui-jqgrid .ui-jqgrid-labels th").css("width", width + "px");
}

// 将头部适配列表td宽度
function softThWidth1() {
	var width = parseFloat($("#idx_table1").width() / $("#idx_table1").find("tr").eq(0).find("td:visible").length).toFixed(1);
	$(".ui-jqgrid .ui-jqgrid-labels th").css("width", width + "px");
}

// 提示信息框
function messageAlert(message) {
	bootbox.dialog({
		message: "<span style=\"color:#000\">" + message + "</span>",
		title: "消息提示",
		buttons: {
			OK: {
				label: "确定",
				className: "btn-success"
			}
		}
	});
}

// 判断文件大小
function getFileSize(eleId) {
	try {
		var size = 0;
		// byte
		size = $('#' + eleId)[0].files[0].size;
		// kb
		size = size / 1024;
		// mb
		size = size / 1024;
		return size;
	} catch (e) {
		alert("错误：" + e);
		return -1;
	}
}