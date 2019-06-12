$(function() {
	// 初始化左侧树
	mapInitLeftTree();
	// 账期时间插件
	$("#statisDateHeader").datepicker({
		format: 'yyyymmdd',
		language: 'zh-CN',
		todayBtn: "linked",
		autoclose: true,
		minview: "3"
	});
	$("#statisDate").datepicker({
		format: 'yyyymmdd',
		language: 'zh-CN',
		todayBtn: "linked",
		autoclose: true,
		minview: "3"
	});
	$("#statisDateHeader").datepicker('setEndDate',new Date()); 
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
	$("#statisDateHeader").val(now);
	// 当前登录人层级是区县和网格层级的，则首页不显示地图和echart图，直接显示报表
	if(nowOrgLevel >= 3) {
		$("#resourcePanel").css("display", "none");
		$("#tablePanel").css("display", "block");
		$("#topPanel").css("display", "none");
		$("#zbTypeSelectDiv").css("display", "none");
	} 
	// 当前登录人层级是省和地市层级的，则首页显示地图和echart图
	else {
		$("#resourcePanel").css("display", "block");
		$("#tablePanel").css("display", "none");
		$("#topPanel").css("display", "block");
		// 获取首页账期文本框
		$.ajax({
			url: $.cxt + "/firstpagethree/initmaxstatisdate",
			type: "POST",
			data: {orgId: $("#hiddenOrgId").val(),orgLevel: $("#hiddenOrgLevel").val()},
			async: false,
			success: function(result) {
				var json = JSON.parse(result);
				if(json.code == "0") {
					$("#statisDateHeader").val(json.data.STATISDATE);
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
					$("#statisDateHeader").val(now);
				}
			}
		});
		// 初始化地图
		initMap();
		// 初始化echart图
		initEcharts("",nowOrgLevel);
	}
	// 中间上：指标资源概况：每个正六边形点击后，点击的那个六边形颜色变为原型设计中的颜色
	$('.Hexagon').click(function() {
		$(this).addClass('HexagoAlive').siblings().removeClass('HexagoAlive');
		var hexagonType = $(".HexagoAlive").find(".hexagonType").attr("id");
		initEcharts($("#hiddenOrgId").val(),nowOrgLevel);
	});
	$('.Hexagon').on('mousemove',function() {
		$('#title').empty();
		var hexagonType = $(this).find(".text-lg").attr("id");
		var showDiv = document.getElementById('title');
		showDiv.style.left = ($(this).position().left+150)+'px';
		showDiv.style.top = ($(this).position().top+50)+'px';
		showDiv.style.display = 'block';
		if(hexagonType=="FH_SUM"){
			 showDiv.innerHTML = '从月初累计到当前的放号量总数';
		}
		if(hexagonType=="XZKD_SUM"){
			 showDiv.innerHTML = '从月初累计到当前宽带新增总数';
		}
		if(hexagonType=="ZDHY_SUM"){
			 showDiv.innerHTML = '当月手机终端合约和泛终端合约合计值';
		}
		if(hexagonType=="JTWXZ_SUM"){
			 showDiv.innerHTML = '从月初累计到当前家庭网新增总数';
		}
//		if(hexagonType=="GJZDZXQSTTS_SUM"){
//			 showDiv.innerHTML = '高价值低占小区渗透率情况';
//		}
//		if(hexagonType=="XZJZWD_SUM"){
//			 showDiv.innerHTML = '从月初累计到当前90后到达客户总数';
//		}
//		if(hexagonType=="TBKHGYRHL_SUM"){
//			 showDiv.innerHTML = '当月累计头部客户固移融合率';
//		}
		if(hexagonType=="ZXWQYQDXD_SUM"){
			 showDiv.innerHTML = '从月初累计到当前小微宽带和企业上云总数';
		}
		if(hexagonType=="GRKHZJFSR_SUM"){
			 showDiv.innerHTML = '从月初累计到当前个人客户出账收入合计';
		}
//		if(hexagonType=="XZKHZJFSR_SUM"){
//			 showDiv.innerHTML = '当月新增入网客户累计收入';
//		}
		if(hexagonType=="GJDZXQKDXZ_SUM"){
			 showDiv.innerHTML = '从月初累计到当前7000个高价值低占小区宽带新增总数';
		}
		if(hexagonType=="90HKHGMTS_SUM"){
			 showDiv.innerHTML = '当月90后净增完成值';
		}
		if(hexagonType=="TBKHKDXZ_SUM"){
			 showDiv.innerHTML = '从月初累计到当前头部客户宽带新增完成值';
		}
	});
	
	$('.Hexagon').on('mouseout',function() {
		 var showDiv = document.getElementById('title');
	        showDiv.style.display = 'none';
	});

	// 初始化指标类型下拉框信息
	initMultipleSelectInfo();
});

// 初始化指标类型下拉框信息
function initMultipleSelectInfo() {
	$.ajax({
		url: $.cxt + "/firstpagethree/initmultipleselectinfo",
		type: "POST",
		success: function(result) {
			$("#multipleSelectInfo").empty();
			var json = JSON.parse(result);
			if(json.code == '0') {
				var htmltv = "";
				json = json.data;
				for(var i = 0; i < json.length; i++) { 
					if(i < 6)
						htmltv += "<option selected='selected' value='" + json[i].NETCODE + "'>" + json[i].NETNAME + "</option>";
					else 
						htmltv += "<option value='" + json[i].NETCODE + "'>" + json[i].NETNAME + "</option>";
				}
				$("#multipleSelectInfo").html(htmltv);
				$('#multipleSelectInfo').multipleSelect({
					placeholder: "---请选择指标类型---",
					width: 153,
					filter: true,
				});
			}
		}
	});
}

// 指标复选框多选点击事件
var selects="";

$("#multipleSelectInfo").on("change", multipleSelectInfo);
function multipleSelectInfo() {
//	$("#zhibiaoPanel").empty();
//	$("#echartInfo").empty();
//	$("#map").empty();
	// 获取多选下拉框的值
//	
	if($(this).val()==null){
		messageAlert("请至少选择一项！");
		return;
	}
	var selectInfo = $("#multipleSelectInfo option:selected");
	// 提示最多选择6个指标，如果超过六个则不生效
	if(selectInfo.length > 6) {
		messageAlert("最多选择6项！");
	}else if(6>=selectInfo.length>0){
		$("#zhibiaoPanel").empty();
		var htmltv = "";
		// 拼接6个指标的div
		for(var i = 0; i < selectInfo.length; i++) {
			if(selectInfo.length == 1 || i == 0) {
				htmltv += "<div class='Hexagon HexagoAlive'>";
			} else {
				htmltv += "<div class='Hexagon'>";
			}
			htmltv += "<div class='pie-chart percentage' id='" + selectInfo[i].value + "_info'></div>";
			htmltv += "<div class='num-box'>";
			htmltv += "<div class='circle-bg'>";
			if(selectInfo[i].value=="XZKHZJFSR"){
				htmltv += "<div class='text-weight'><span id='" + selectInfo[i].value + "_SUM' class='text-lg'></span>万</div>";
			}else if(selectInfo[i].value=="FH"||selectInfo[i].value=="XZKD"||selectInfo[i].value=="JTWXZ"||selectInfo[i].value=="GJDZXQKDXZ"||selectInfo[i].value=="TBKHKDXZ"){
				htmltv += "<div class='text-weight'><span id='" + selectInfo[i].value + "_SUM' class='text-lg'></span>户</div>";
			}else if(selectInfo[i].value=="GJZDZXQSTTS"||selectInfo[i].value=="TBKHGYRHL"){
				htmltv += "<div class='text-weight'><span id='" + selectInfo[i].value + "_SUM' class='text-lg'></span>%</div>";
			}else if(selectInfo[i].value=="ZDHY"){
				htmltv += "<div class='text-weight'><span id='" + selectInfo[i].value + "_SUM' class='text-lg'></span>台</div>";
			}else if(selectInfo[i].value=="GRKHZJFSR"){
				htmltv += "<div class='text-weight'><span id='" + selectInfo[i].value + "_SUM' class='text-lg'></span>亿</div>";
			}else{
				htmltv += "<div class='text-weight'><span id='" + selectInfo[i].value + "_SUM' class='text-lg'></span>个</div>";
			}
			htmltv += "</div></div>";
			htmltv += "<div class='zbDivClassInfo'>";
			htmltv += "<span class='zhibiaoFont' id='" + selectInfo[i].value + "'>" + selectInfo[i].text + "</span></div></div>";
		}
		// 将拼接好的div，追加到zhibiaoPannel后面
		$("#zhibiaoPanel").append(htmltv);
		// 中间上：指标资源概况：每个正六边形点击后，点击的那个六边形颜色变为原型设计中的颜色
		$('.Hexagon').click(function() {
			$(this).addClass('HexagoAlive').siblings().removeClass('HexagoAlive');
			var hexagonType = $(".HexagoAlive").find(".hexagonType").attr("id");
			initEcharts($("#hiddenOrgId").val(),nowOrgLevel);
		});
		$('.Hexagon').on('mousemove',function() {
			$('#title').empty();
			var hexagonType = $(this).find(".text-lg").attr("id");
			var showDiv = document.getElementById('title');
			showDiv.style.left = ($(this).position().left+150)+'px';
			showDiv.style.top = ($(this).position().top+50)+'px';
			showDiv.style.display = 'block';
	        if(hexagonType=="FH_SUM"){
				 showDiv.innerHTML = '从月初累计到当前的放号量总数';
			}
			if(hexagonType=="XZKD_SUM"){
				 showDiv.innerHTML = '从月初累计到当前宽带新增总数';
			}
			if(hexagonType=="ZDHY_SUM"){
				 showDiv.innerHTML = '当月手机终端合约和泛终端合约合计值';
			}
			if(hexagonType=="JTWXZ_SUM"){
				 showDiv.innerHTML = '从月初累计到当前家庭网新增总数';
			}
//			if(hexagonType=="GJZDZXQSTTS_SUM"){
//				showDiv.innerHTML = '高价值低占小区渗透率情况';
//			}
//			if(hexagonType=="XZJZWD_SUM"){
//				showDiv.innerHTML = '从月初累计到当前90后到达客户总数';
//			}
//			if(hexagonType=="TBKHGYRHL_SUM"){
//				showDiv.innerHTML = '当月累计头部客户固移融合率';
//			}
			if(hexagonType=="ZXWQYQDXD_SUM"){
				 showDiv.innerHTML = '从月初累计到当前小微宽带和企业上云总数';
			}
			if(hexagonType=="GRKHZJFSR_SUM"){
				 showDiv.innerHTML = '从月初累计到当前个人客户出账收入合计';
			}
//			if(hexagonType=="XZKHZJFSR_SUM"){
//				showDiv.innerHTML = '当月新增入网客户累计收入';
//			}
			if(hexagonType=="GJDZXQKDXZ_SUM"){
				 showDiv.innerHTML = '从月初累计到当前7000个高价值低占小区宽带新增总数';
			}
			if(hexagonType=="90HKHGMTS_SUM"){
				 showDiv.innerHTML = '当月90后净增完成值';
			}
			if(hexagonType=="TBKHKDXZ_SUM"){
				 showDiv.innerHTML = '从月初累计到当前头部客户宽带新增完成值';
			}
		});
		$('.Hexagon').on('mouseout',function() {
			 var showDiv = document.getElementById('title');
		        showDiv.style.display = 'none';
		});
		// 初始化echart图
		initEcharts($("#hiddenOrgId").val(),nowOrgLevel);
		// 初始化地图
		initPiePercent($("#hiddenOrgId").val(),nowOrgLevel);
	}
	
}

// 更改账期，首页echart图数据跟着改变
$("#statisDateHeader").on("change", statisDateHeader);
function statisDateHeader() {
	// 环形进度条
	initPiePercent($("#hiddenOrgId").val(),nowOrgLevel);
	// Echart图
	initEcharts($("#hiddenOrgId").val(),nowOrgLevel);
	// 地图
	initPiePercent($("#hiddenOrgId").val(),nowOrgLevel);
}

// 获取当前时间
function getNow(s) {
	return s < 10 ? '0' + s : s;
}

// 环形进度条
function initPiePercent(orgId,orgLevel) {
    var zhibiaoFont = "";
    $(".zhibiaoFont").each(function(){
    	zhibiaoFont += $(this).attr("id") + ",";
    });
    var type = zhibiaoFont.substring(0, zhibiaoFont.length-1);
    // 获取账期
    var statisDate = $("#statisDateHeader").val();
    // 初始化查询所有的信息
    $.ajax({
    	url: $.cxt + "/firstpagethree/getzbechartsum",
    	type: "POST",
    	data: {orgId: orgId, orgLevel:orgLevel,type: type, statisDate: statisDate},
    	success: function(result) {
    		var json = JSON.parse(result).data;
    		var text_lg = "";
    		$(".text-lg").each(function(i){
    			var types=type.split(',');
    			if(types[i].indexOf("GJZDZXQSTTS")!=-1||$(this).attr("id") == "TBKHGYRHL_SUM"){
    				$(this).html(json[i] == null || json[i] == "" ? 0 : (json[i].PUB_DATA*100).toFixed(2));
    			}else if($(this).attr("id") == "GRKHZJFSR_SUM") {
        			$(this).html(json[i] == null || json[i] == "" ? 0 : (json[i].PUB_DATA/10000).toFixed(2));
        		}else if($(this).attr("id") == "XZKHZJFSR_SUM") {
        			$(this).html(json[i] == null || json[i] == "" ? 0 : (json[i].PUB_DATA).toFixed(2));
        		}else{
    				$(this).html(json[i] == null || json[i] == "" ? 0 : json[i].PUB_DATA);
    			}
    			
//    			if($(this).attr("id") == "GRKHZJFSR_SUM"||$(this).attr("id") == "XZKHZJFSR_SUM") {
//        			$(this).html(json[i] == null || json[i] == "" ? 0 : (json[i].PUB_DATA/10000).toFixed(1));
//    			} else {
//        			$(this).html(json[i] == null || json[i] == "" ? 0 : (json[i].PUB_DATA).toFixed(0));
//    			}
    		});
    	}
    });
}

// 初始化左侧树
function mapInitLeftTree() {
	var setting = {
		check: {
			// 这里设置是否显示复选框
	        enable: false,
	        // 设置复选框是否与 父/子 级相关联
	        chkboxType: { "Y": "", "N": "" } 
	    },
	    view: {  
	    	selectedMulti: false  
	    },
	    data: {  
	    	keep: {  
	    		parent: true,  
	    		leaf: true  
	    	},  
	    	simpleData: {  
	    		enable: true  
	    	}
	    },
	    // 点击事件
	    callback: {
	    	onClick: zTreeOnCheck
	    }
    };
	setting.check.chkboxType = { "Y": "s", "N": "s" }
	// 加载左侧树，并判断当前登录人是区县/网格 还是 省/地市层级的人，如果是区县/网格层级，默认加载一次点击事件
	$.ajax({
		url: $.cxt + "/firstpagethree/getlefttree",
		type: "POST",
		success: function (zNodes) {
			treeObj = $.fn.zTree.init($("#firstInfoTree"), setting, zNodes);
			if(nowOrgLevel > 2) {
	            var node = treeObj.getNodes()[0];
	            treeObj.selectNode(node);
	            setting.callback.onClick(null, treeObj.setting.treeId, node);
			}
		}
	});
	
	// 該方法點擊樹可做操作
	function zTreeOnCheck(event, treeId, treeNode) {
		$("#conditionTwo").css("display", "none");
		$("#conditionDivFive").css("display", "none");
		$("#conditionDivSix").css("display", "none");
		$("#conditionDivSeven").css("display", "none");
		$("#showMap").css("display", "none");
		$("#showMap").css("display", "none");
		$("#statisInfo").css("display", "none");
		$("#zbTypeSelectDiv").css("display", "none");
		// 将路径给显示出来
		$("#treeRoadInfo").empty();
		var name = getFilePath(treeNode);
		$("#treeRoadInfo").html("当前位置：" + name);
		// 判断TYPE==ORG
		if("ORG" == treeNode.type) {
			$("#searchBtn").removeAttr("data");
			$("#selfHelpReportForms").empty();
			// 基础信息
			if(null == treeNode.netType) {
				$("#city").empty();
				$("#town").empty();
				$("#grid").empty();
				$("#benchmarkingAnalysis").css("display", "none");
				$("#topParentConditionDiv").css("display", "block");
				$("#middleFourInfoDiv").css("display", "block");
				$("#bottomDetailDiv").css("display", "block");
				if("jcxx" == treeNode.id.split("-")[0] && treeNode.netType == null) {
					// 基础信息方法
					jcxxMethod(treeNode);
				} 
				// 指标现状
				else if("zbxz" == treeNode.id.split("-")[0]) {
					// 指标现状方法
					zbxzMethod(treeNode);
				} 
				// 资源信息
				else if("zyxx" == treeNode.id.split("-")[0]) {
					// 资源信息方法
					zyxxMethod(treeNode);
				} 
				// 营销任务
				else if("yxrw" == treeNode.id.split("-")[0]) {
					// 营销任务方法
					yxrwMethod(treeNode);
				} 
			} 
			// 当点击的不是省，地市，区县，网格，点击的是下面的具体报表
			else {
				if("DBFX" == treeNode.id || "DBFXD" == treeNode.id) {
					dbfxMethod(treeNode);
				} else {
					$("#benchmarkingAnalysis").css("display", "none");
					$("#topParentConditionDiv").css("display", "block");
					$("#middleFourInfoDiv").css("display", "block");
					$("#bottomDetailDiv").css("display", "block");
				}
				var parentNode = null;
				if(treeNode.level == 2) {
					parentNode = treeNode.getParentNode().getParentNode();
				} else {
					parentNode = treeNode.getParentNode();
				}
				if("jcxx" == parentNode.id.split("-")[0]) {
					// 基础信息方法
					jcxxMethod(treeNode);
				} else if("zbxz" == parentNode.id.split("-")[0]) {
					// 指标现状方法
					zbxzMethod(treeNode);
				} else if("zyxx" == parentNode.id.split("-")[0]) {
					// 资源信息方法
					zyxxMethod(treeNode);
				} else if("yxrw" == parentNode.id.split("-")[0]) {
					// 营销任务方法
					yxrwMethod(treeNode);
				}
			}
		}
		// 判断TYPE==NEWORG
		else {
			$("#searchBtn").attr("data", "selfHelpReport");
			// 自助报表分析方法
			selfHelpReportMethod(treeNode);
		}
	}
	
	// 获取所有父节点及自己节点信息
	function getFilePath(treeNode) {
        if (treeNode == null) return "";
        var filename = treeNode.name;
        var pNode = treeNode.getParentNode();
        if (pNode != null) {
        	// 递归调用自己查询父节点信息
            filename = getFilePath(pNode) + ">" + filename;
        }
        return filename;
    }
}

// 查询
$("#searchBtn").on("click", searchBasicInfo);
function searchBasicInfo() {
	var searchDataBtn = $("#searchBtn").attr("data"); 
	// 如果属性不为空，则表示查询自助分析报表
	if(null != searchDataBtn && "" != searchDataBtn && undefined != searchDataBtn) {
		var oneType = $("#oneType option:selected").val();
		var twoType = $("#twoType option:selected").val();
		var twoTypeUnSelect = $("#twoType");
		if(null != twoType && "" != twoType) {
			getSelfHelpReportBottom(twoType);
		} else {
			if(twoTypeUnSelect[0].length > 1) {
				getSelfHelpReportBottom(twoTypeUnSelect[0][1].value);
			} else {
				getSelfHelpReportBottom(oneType);
			}
		}
	} 
	// 如果属性为空，则表示正常查询
	else {
		var type = $("#hiddenType").val();
		if("jcxx" == type) {
			// 查询基础信息头部
			getJcxxHeader();
			// 查询基础信息列表
			getJcxxBottom();
		} else if("zbxz" == type) {
			// 查询指标现状列表
			getZbxzBottom();
		} else if("zyxx" == type) {
			// 查询资源信息列表
			getZyxxBottom();
		} else if("yxrw" == type) {
			//查询营销任务列表
			getYxrwBottom();
		}
	}
}

// 获取子节点
function getChildren(ids, treeNode) {
	ids.push(treeNode);
	if(treeNode.isParent) {
		for(var obj in treeNode.children) {
			getChildren(ids, treeNode.children[obj]);
		}
	}
	return ids;
}

// 选择地市，改变区县值
$("#city").on("change", city);
function city() {
	$("#town").empty();
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
				$("#town").html(htmltv);
				htmltv = "<option value=''>---网格---</option>";
				$("#grid").html(htmltv);
			}
		});
	} 
	// 如果地市选择为空，则将区县、网格下拉框全部置为空
	else {
		var htmltv = "<option value=''>---区县---</option>";
		$("#town").html(htmltv);
		htmltv = "<option value=''>---网格---</option>";
		$("#grid").html(htmltv);
	}
}

// 选择区县，改变网格值
$("#town").on("change", town);
function town() {
	$("#grid").empty();
	var orgId = $("#town option:selected").val();
	// 判断区县是否有无选择，有选择，则加载网格信息
	if(null != orgId && "" != orgId) {
		$.ajax({
			url: $.cxt + "/firstpagethree/getchildrensysorgbyorgid",
			data: {orgId: orgId},
			type: "POST",
			success: function(result) {
				var json = JSON.parse(result).data;
				var htmltv = "<option value=''>--网格---</option>";
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

//选择网格
$("#grid").on("change", grid);
function grid() {
	var grid = $("#grid option:selected").val();
	if(null != grid && "" != grid) {
		$("#gridTypeInfoTr").css("display", "none");
	} else {
		$("#gridTypeInfoTr").css("display", "contents");
	}
}

// 点击一级分类，获取二级分类信息
$("#oneType").on("change", oneType);
function oneType() {
	$("#twoType").empty();
	var oneType = $("#oneType option:selected").val();
	if("RYXX" == oneType) {
		$("#gridTypeInfoTr").css("display", "none");
		$("#conditionDivFive").css("display", "none");
	} else if("WGXX" == oneType) {
		$("#gridTypeInfoTr").show();
		var twoType = $("#twoType option:selected").val();
		if(twoType=="网格基础信息"){
			$("#conditionDivFive").css("display", "block");	
		}else{
			$("#conditionDivFive").css("display", "none");
		}
	} else if("zdyw" == oneType) {
		$("#topPanel").css("display", "block");
		$("#zhibiaoPanel").css("display", "none");
		$("#importantPanel").css("display", "block");
		$("#countOne").css("display", "block");
		$("#countOnes").css("display", "block");
		$("#conditionTwo").css("display", "block");
		$("#conditionDivFive").css("display", "block");
	} else if("KHXXD" == oneType || "KHXXM" == oneType) {
		$("#conditionDivFive").css("display", "block");
	}  else if("WGJCXX" == oneType) {
		$("#conditionDivFive").css("display", "block");
	} else {
		$("#topPanel").css("display", "none");
		$("#zhibiaoPanel").css("display", "none");
		$("#importantPanel").css("display", "none");
		$("#countOne").css("display", "none");
		$("#countOnes").css("display", "none");
		$("#countThree").css("display", "none");
		$("#conditionTwo").css("display", "none");
		$("#conditionDivFive").css("display", "none");
		$("#conditionDivSix").css("display", "none");
	}
	$.ajax({ 
		url: $.cxt + "/firstpagethree/getchildrennetrresourcebyorgId",
		data: {netCode: oneType},
		type: "POST",
		success: function(result) {
			var json = JSON.parse(result).data;
			var htmltv = "<option value=''>---二级分类---</option>";
			if("zdyw" == oneType) {
				htmltv = "";
			}
			if(null != json && "" != json && undefined != json && json.length > 0)
				for(var i = 0; i < json.length; i++) {
					htmltv += "<option value='" + json[i].netCode + "'>" + json[i].netName + "</option>";
				}
			$("#twoType").html(htmltv);
		}
	});
}

// 第二级下拉框选择
$("#twoType").on("change", twoType);
function twoType() {
	$("#selfHelpReportForms").empty();
	var searchDataBtn = $("#searchBtn").attr("data"); 
	// 如果属性不为空，则表示查询自助分析报表
	if(null != searchDataBtn && "" != searchDataBtn && undefined != searchDataBtn) {
		var oneType = $("#oneType option:selected").val();
		var twoType = $("#twoType option:selected").val();
		var twoTypeUnSelect = $("#twoType");
		if(null != twoType && "" != twoType) {
			showSelfHelpReportByTwoType(twoType);
		} else {
			if(twoTypeUnSelect[0].length > 1) {
				showSelfHelpReportByTwoType(twoTypeUnSelect[0][1].value);
			} else {
				showSelfHelpReportByTwoType(oneType);
			}
		}
	} else {
		var twoType = $("#twoType option:selected").val();
		if("FH" == twoType || "XZKD" == twoType || "ZDHY" == twoType || "JTWXZ" == twoType || "ZXWQYQDXD" == twoType) {
			$("#conditionTwo").css("display", "block");
			$("#conditionDivFive").css("display", "block");
		} else if("GJZDZXQSTTS" == twoType || "XZJZWD" == twoType || "TBKHGYRHL" == twoType || "XWSC" == twoType || "XYKH" == twoType
				|| "TBKHZTQK" == twoType || "GRKHZJFSR" == twoType || "XZKHZJFSR" == twoType || "XZKHZJFSR" == twoType) {
			$("#conditionTwo").css("display", "none");
			$("#conditionDivFive").css("display", "block");
		} else if("KHXXM" == twoType.split("-")[0] || "KHXXD" == twoType.split("-")[0]) {
			$("#conditionDivFive").css("display", "block");
		} else if("XYYXBBYHBM" == twoType || "XYYHHXBM" == twoType || "XYYXBBXYKHQKD" == twoType || "XYYXBBXYKHQKM" == twoType 
				|| "XYYXBBXYZDHDBLQKD" == twoType || "XYYXBBXYZDHDBLMXQKD" == twoType || "XYYXBBCLXYKHBYQKRBBD" == twoType || "XYYHFEFBD" == twoType
				|| "XYYHFEFBM" == twoType || "XYYWYHBD" == twoType) {
			$("#conditionDivFive").css("display", "block");
			$("#conditionDivSix").css("display", "block");
		} else if("XYXXBM" == twoType) {
			$("#conditionDivFive").css("display", "none");
			$("#conditionDivSix").css("display", "block");
		} else if("WGYWBLD" == twoType || "WGYWBLW" == twoType || "WGYWBLM" == twoType) {
			$("#conditionTwo").css("display", "none");
			$("#conditionDivFive").css("display", "block");
		} else if("TBKHKDXZ" == twoType) {
			$("#conditionTwo").css("display", "none");
			$("#conditionDivFive").css("display", "block");
		} else if("KHFZD" == twoType || "KHFZW" == twoType || "KHFZM" == twoType) {
			$("#conditionTwo").css("display", "none");
			$("#conditionDivFive").css("display", "block");
		} else {
			$("#conditionTwo").css("display", "none");
			$("#conditionDivFive").css("display", "none");
			$("#conditionDivSix").css("display", "none");
		}
	}
}


//选择日月
$("#conditionTwo").on("change", conditionTwo);
function conditionTwo() {
	var conditionTwo = $("#conditionTwo option:selected").val();
	if(conditionTwo=="day"){
		$("#countThree").css("display", "none");
	}else{
		var percent=getTime();
		if(percent!=""){
			$("#countThree").css("display", "block");
			$("#tjInfoThree").text("时间进度:");
			var numThree = $("#numberThree");
			numThree.animate({count: percent}, {
					// 持续时间
				duration: 1000, 
				step: function() {
					numThree.text(Math.round(this.count));
				}
			});
			numThree.animate({count: percent}, {
					// 持续时间 
					duration: 1, 
					step: function() {
						numThree.text(percent);
					}
				});
			
		}
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

// 小数点转化成百分号
function rateFormat(celval, options, rowdata){
	return (celval * 100).toFixed(2) + "%";
}

// 返回页面
$("#backBtn").on("click", backBtn);
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

// 获取最大的账期
function getMaxStatisDate(twoTypeIds) {
	$.ajax({
		url: $.cxt + "/rptcomposite/getMaxDate",
		data: {conditionOne: twoTypeIds},
		type: "POST",
		async: false,
		success: function(result) {
			var json = JSON.parse(result);
			if(json.data!=undefined){
				$("#statisDate").val(json.data.STATIS_DATE);
			}else{
				var month="";
				var day="";
				var date=new Date();
				if(((date.getMonth()+1)+"").length==1){
					 month="0"+(date.getMonth()+1);
				}else{
					 month=(date.getMonth()+1);
				}
				if((date.getDate()+"").length==1){
					day="0"+date.getDate();
				}else{
					day=date.getDate();
				}
				$("#statisDate").val(date.getFullYear()+""+month+""+day);
			}
		}
	});
}

// 将头部适配列表td宽度
function softThWidth() {
	var width = parseFloat($("#idx_table").width()/$("#idx_table").find("tr").eq(0).find("td:visible").length).toFixed(1);
	$(".ui-jqgrid .ui-jqgrid-labels th").css("width", width + "px");
}

// 将头部适配列表td宽度
function softThWidthbenchmarkingAnalysis() {
	var width = parseFloat($("#benchmarkingAnalysisJqGridTable").width()/$("#benchmarkingAnalysisJqGridTable").find("tr").eq(0).find("td:visible").length).toFixed(1);
	$(".ui-jqgrid-htable .ui-jqgrid-labels th").css("width", width + "px");
}

// 封装select标签
function changeSelectInfo(treeNode) {
	$("#city").html("");
	$("#town").html("");
	$("#grid").html("");
	// 当前登录人为省级或地市级进入点击事件
	if(nowOrgLevel < 3) {
		changeProvinceOrCitySelectInfo(treeNode);
	} 
	// 当前登录人为区县或网格级进入点击事件
	else {
		changeCntyOrGridSelectInfo(treeNode);
	}
}

// 当前登录人为区县或网格级进入点击事件
function changeCntyOrGridSelectInfo(treeNode) {
	$("#jcxx").css("display", "none");
	$("#zbxz").css("display", "none");
	$("#zyxx").css("display", "none");
	$("#yxrw").css("display", "none");
	var htmlCity = "<option value=''>---地市---</option>";
	var htmlTown = "<option value=''>---区县---</option>";
	var htmlGrid = "<option value=''>---网格---</option>";
	var htmlOne = "";
	var htmlTwo = "<option value=''>---二级分类---</option>";
	$("#resourcePanel").css("display", "none");
	$("#tablePanel").css("display", "block");
	$("#topPanel").css("display", "none");
	$("#oneType").css("display", "block");
	$("#twoType").css("display", "block");
	// 选择的不是地市区县网格
	if(null != treeNode.netType) {
		$("#oneType").empty();
		$("#twoType").empty();
		// 把原有的组织架构树原样保留
		var city = $("#city").html();
		var town = $("#town").html();
		var grid = $("#grid").html();
		// 加载地市区县
		if(null != city && "" != city && null != town && "" != town && null != grid && "" != grid) {
			$("#city").empty();
			$("#town").empty();
			$("#grid").empty();
			$("#city").html(city);
			$("#town").html(town);
			$("#grid").html(grid);
		} else {
			var parentNode = null;
			var childrenNode = null;
			if(treeNode.level == 2) {
				parentNode = treeNode.getParentNode().getParentNode();
			} else if(treeNode.level == 1) {
				parentNode = treeNode.getParentNode();
			} else if(treeNode.level == 3) {
				parentNode = treeNode.getParentNode().getParentNode().getParentNode();
			}
			childrenNode = parentNode.children[0];
			if("2" == nowOrgLevel) {
				htmlCity = "";
				htmlTown = "";
				for(var i = 0; i < childrenNode.children.length; i++) {
					htmlCity += "<option value='" + childrenNode.children[i].id.substring(5, childrenNode.children[i].id.length) + "'>" + childrenNode.children[i].name + "</option>";
				}
				// 获取地市节点
				var grandChildrenNode = childrenNode.children[0];
				// 获取地市节点下所有的区县名称，编码
				for(var i = 0; i < grandChildrenNode.children.length; i++) {
					htmlTown += "<option value='" + grandChildrenNode.children[i].id.substring(5, grandChildrenNode.children[i].id.length) + "'>" + grandChildrenNode.children[i].name + "</option>";
				}
			}
			
			if("3" == nowOrgLevel) {
				htmlCity = "";
				htmlTown = "";
				for(var i = 0; i < childrenNode.children.length; i++) {
					htmlCity += "<option value='" + childrenNode.children[i].id.substring(5, childrenNode.children[i].id.length) + "'>" + childrenNode.children[i].name + "</option>";
				}
				// 获取地市节点
				var grandChildrenNode = childrenNode.children[0];
				// 获取地市节点下所有的区县名称，编码
				for(var i = 0; i < grandChildrenNode.children.length; i++) {
					htmlTown += "<option value='" + grandChildrenNode.children[i].id.substring(5, grandChildrenNode.children[i].id.length) + "'>" + grandChildrenNode.children[i].name + "</option>";
				}
				// 获取区县节点
				var grandGrandChildrenNode = grandChildrenNode.children[0];
				// 获取区县节点下所有的网格名称，编码
				for(var i = 0; i < grandGrandChildrenNode.children.length; i++) {
					htmlGrid += "<option value='" + grandGrandChildrenNode.children[i].id.substring(5, grandGrandChildrenNode.children[i].id.length) + "'>" + grandGrandChildrenNode.children[i].name + "</option>";
				}
			}
			$("#city").html(htmlCity);
			$("#town").html(htmlTown);
			$("#grid").html(htmlGrid);
		}
		// 点击了第一级（人员信息/网格信息）
		if(treeNode.level == 1) {
			// 加载一级，二级分类
			var parentNode;
			var childrenNode;
			if(treeNode.children!=undefined){
				if(treeNode.children[0].children!=undefined){
					parentNode=treeNode.children;
					childrenNode=treeNode.children[0].children;
				}else{
					parentNode=treeNode.getParentNode().children;
					childrenNode=treeNode.children;
				}
			}else{
				parentNode=treeNode.getParentNode().children;
				childrenNode=treeNode;
			}
			for(var i = 0; i < parentNode.length; i++) {
				if(null != parentNode[i].netType && "" != parentNode[i].netType) {
				if(parentNode[i].id == treeNode.id)
					// 加载一级菜单
					htmlOne += "<option selected='selected' value='" + parentNode[i].id + "'>" + parentNode[i].name + "</option>";
				else 
					// 加载一级菜单
					htmlOne += "<option value='" + parentNode[i].id + "'>" + parentNode[i].name + "</option>";
				}
			}
			if("zdyw" == treeNode.id) {
				htmlTwo = "";
				$("#conditionDivFive").css("display", "block");
				$("#conditionTwo").css("display", "block");
				getMaxStatisDate(treeNode.children[0].id);
			}
			// 加载二级菜单
			for(var j = 0; j < childrenNode.length; j++) {
				if(childrenNode[j].id == treeNode.id)
					// 加载二级菜单
					htmlTwo += "<option selected='selected' value='" + childrenNode[j].id + "'>" + childrenNode[j].name + "</option>";
				else 
					// 加载二级菜单
					htmlTwo += "<option value='" + childrenNode[j].id + "'>" + childrenNode[j].name + "</option>";
			}
			
		} 
		// 点击一级分类下的二级分类
		else {
			var parentNode;
			var childrenNode=treeNode.children;
			if(childrenNode!=undefined){
				parentNode=treeNode;
			}else{
				 parentNode = treeNode.getParentNode();
			}
			// 如果是重点业务，则二级菜单默认选择第一个
			if("zdyw" == parentNode.id) {
				getMaxStatisDate(treeNode.id);
				htmlTwo = "";
			}
			var grandParentNode = parentNode.getParentNode().children;
			// 加载一级菜单
			for(var i = 0; i < grandParentNode.length; i++) {
				if(null != grandParentNode[i].netType && "" != grandParentNode[i].netType) {
					if(grandParentNode[i].id == parentNode.id)
						// 加载一级菜单
						htmlOne += "<option selected='selected' value='" + grandParentNode[i].id + "'>" + grandParentNode[i].name + "</option>";
					else 
						// 加载一级菜单
						htmlOne += "<option value='" + grandParentNode[i].id + "'>" + grandParentNode[i].name + "</option>";
				}
			}
			// 加载二级菜单
			for(var i = 0; i < parentNode.children.length; i++) {
				if(parentNode.children[i].id == treeNode.id)
					// 加载二级菜单
					htmlTwo += "<option selected='selected' value='" + parentNode.children[i].id + "'>" + parentNode.children[i].name + "</option>";
				else 
					// 加载二级菜单
					htmlTwo += "<option value='" + parentNode.children[i].id + "'>" + parentNode.children[i].name + "</option>";
			}
		}
		$("#oneType").html(htmlOne);
		$("#twoType").html(htmlTwo);
	} else {
		// 当前登录人是区县层级
		if(nowOrgLevel == 3) {
			htmlCity = "";
			htmlTown = "";
			if(treeNode.level == 0) {
				// 获取省级节点
				var childrenNode = treeNode.children[0];
				// 获取所有地市的名称，编码
				for(var i = 0; i < childrenNode.children.length; i++) {
					htmlCity += "<option value='" + childrenNode.children[i].id.substring(5, childrenNode.children[i].id.length) + "'>" + childrenNode.children[i].name + "</option>";
				}
				// 获取地市节点
				var grandChildrenNode = childrenNode.children[0];
				// 获取地市节点下所有的区县名称，编码
				for(var i = 0; i < grandChildrenNode.children.length; i++) {
					htmlTown += "<option value='" + grandChildrenNode.children[i].id.substring(5, grandChildrenNode.children[i].id.length) + "'>" + grandChildrenNode.children[i].name + "</option>";
				}
				// 获取区县节点
				var greatChildrenNode = grandChildrenNode.children[0];
				// 获取区县节点下所有的网格名称，编码
				for(var i = 0; i < greatChildrenNode.children.length; i++) {
					htmlGrid += "<option value='" + greatChildrenNode.children[i].id.substring(5, greatChildrenNode.children[i].id.length) + "'>" + greatChildrenNode.children[i].name + "</option>";
				}
				childrenNode = treeNode.children;
				if("zdyw" == childrenNode[1].id) {
					$("#conditionDivFive").css("display", "block");
					$("#conditionTwo").css("display", "block");
					getMaxStatisDate(childrenNode[1].children[0].id);
					htmlTwo = "";
				}
				for(var i = 0; i < childrenNode.length; i++) {
					if(null != childrenNode[i].netType && "" != childrenNode[i].netType) {
						if(childrenNode[i].id == treeNode.id)
							// 加载一级菜单
							htmlOne += "<option selected='selected' value='" + childrenNode[i].id + "'>" + childrenNode[i].name + "</option>";
						else 
							// 加载一级菜单
							htmlOne += "<option value='" + childrenNode[i].id + "'>" + childrenNode[i].name + "</option>";
					}
				}
				// 加载二级菜单
				var secondMenuNode = childrenNode[1];
				if(secondMenuNode.isParent)
					for(var i = 0; i < secondMenuNode.children.length; i++) {
						htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
					}
			}
			// 点击省公司
			else if(treeNode.level == 1) {
				// 获取所有地市的名称，编码
				for(var i = 0; i < treeNode.children.length; i++) {
					htmlCity += "<option value='" + treeNode.children[i].id.substring(5, treeNode.children[i].id.length) + "'>" + treeNode.children[i].name + "</option>";
				}
				// 获取地市节点
				var childrenNode = treeNode.children[0];
				// 获取地市节点下所有的区县名称，编码
				for(var i = 0; i < childrenNode.children.length; i++) {
					htmlTown += "<option value='" + childrenNode.children[i].id.substring(5, childrenNode.children[i].id.length) + "'>" + childrenNode.children[i].name + "</option>";
				}
				// 获取区县节点
				var grandChildrenNode = childrenNode.children[0];
				// 获取区县节点下所有的网格名称，编码
				for(var i = 0; i < grandChildrenNode.children.length; i++) {
					htmlGrid += "<option value='" + grandChildrenNode.children[i].id.substring(5, grandChildrenNode.children[i].id.length) + "'>" + grandChildrenNode.children[i].name + "</option>";
				}
				var parentNode = treeNode.getParentNode();
				if("zdyw" == parentNode.children[1].id) {
					$("#conditionDivFive").css("display", "block");
					$("#conditionTwo").css("display", "block");
					getMaxStatisDate(parentNode.children[1].children[0].id);
					htmlTwo = "";
				}
				for(var i = 0; i < parentNode.children.length; i++) {
					if(null != parentNode.children[i].netType && "" != parentNode.children[i].netType) {
						// 加载一级菜单
						htmlOne += "<option value='" + parentNode.children[i].id + "'>" + parentNode.children[i].name + "</option>";
					}
				}
				// 加载二级菜单
				var secondMenuNode = parentNode.children[1];
				if(secondMenuNode.isParent){
					for(var i = 0; i < secondMenuNode.children.length; i++) {
						htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
					}
				}	
			} 
			// 点击地市
			else if(treeNode.level == 2) {
				var parentNode = treeNode.getParentNode();
				// 获取所有地市名称，编码
				for(var i = 0; i < parentNode.children.length; i++) {
					if(parentNode.children[i].id == treeNode.id)
						htmlCity += "<option selected='selected' value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
					else
						htmlCity += "<option value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
				}
				// 获取所有区县名称，编码
				for(var i = 0; i < treeNode.children.length; i++) {
					htmlTown += "<option value='" + treeNode.children[i].id.substring(5, treeNode.children[i].id.length) + "'>" + treeNode.children[i].name + "</option>";
				}
				// 获取区县节点
				var children = treeNode.children[0];
				// 获取区县节点下所有的网格名称，编码
				for(var i = 0; i < children.children.length; i++) {
					htmlGrid += "<option value='" + children.children[i].id.substring(5, children.children[i].id.length) + "'>" + children.children[i].name + "</option>";
				}
				var grandParentNode = parentNode.getParentNode();
				if("zdyw" == grandParentNode.children[1].id) {
					$("#conditionDivFive").css("display", "block");
					$("#conditionTwo").css("display", "block");
					getMaxStatisDate(grandParentNode.children[1].children[0].id);
					htmlTwo = "";
				}
				for(var i = 0; i < grandParentNode.children.length; i++) {
					if(null != grandParentNode.children[i].netType && "" != grandParentNode.children[i].netType) {
						// 加载一级菜单
						htmlOne += "<option value='" + grandParentNode.children[i].id + "'>" + grandParentNode.children[i].name + "</option>";
					}
				}
				// 加载二级菜单
				var secondMenuNode = grandParentNode.children[1];
				if(secondMenuNode.isParent){
					for(var i = 0; i < secondMenuNode.children.length; i++) {
						htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
					}
				}
				
				
			} 
			// 点击区县
			else if(treeNode.level == 3) {
				var parentNode = treeNode.getParentNode();
				var grandParentNode = parentNode.getParentNode();
				// 获取所有地市名称，编码
				for(var i = 0; i < grandParentNode.children.length; i++) {
					if(grandParentNode.children[i].id == parentNode.id)
						htmlCity += "<option selected='selected' value='" + grandParentNode.children[i].id.substring(5, grandParentNode.children[i].id.length) + "'>" + grandParentNode.children[i].name + "</option>";
					else
						htmlCity += "<option value='" + grandParentNode.children[i].id.substring(5, grandParentNode.children[i].id.length) + "'>" + grandParentNode.children[i].name + "</option>";
				}
				// 获取所有区县名称，编码
				for(var i = 0; i < parentNode.children.length; i++) {
					if(parentNode.children[i].id == treeNode.id)
						htmlTown += "<option selected='selected' value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
					else
						htmlTown += "<option value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
				}
				// 获取所有网格名称，编码
				for(var i = 0; i < treeNode.children.length; i++) {
					htmlGrid += "<option value='" + treeNode.children[i].id.substring(5, treeNode.children[i].id.length) + "'>" + treeNode.children[i].name + "</option>";
				}
				var greatGrandParentNode = grandParentNode.getParentNode();
				if("zdyw" == greatGrandParentNode.children[1].id) {
					$("#conditionDivFive").css("display", "block");
					$("#conditionTwo").css("display", "block");
					getMaxStatisDate(greatGrandParentNode.children[1].children[0].id);
					htmlTwo = "";
				}
				for(var i = 0; i < greatGrandParentNode.children.length; i++) {
					if(null != greatGrandParentNode.children[i].netType && "" != greatGrandParentNode.children[i].netType) {
						// 加载一级菜单
						htmlOne += "<option value='" + greatGrandParentNode.children[i].id + "'>" + greatGrandParentNode.children[i].name + "</option>";
					}
				}
				// 加载二级菜单
				var secondMenuNode = greatGrandParentNode.children[1];
				if(secondMenuNode.isParent){
					for(var i = 0; i < secondMenuNode.children.length; i++) {
						htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
					}
				}		
			} 
			// 点击网格
			else if(treeNode.level == 4) {
				var parentNode = treeNode.getParentNode();
				var grandParentNode = parentNode.getParentNode();
				var greatGrandParentNode = grandParentNode.getParentNode();
				// 获取所有地市名称，编码
				for(var i = 0; i < greatGrandParentNode.children.length; i++) {
					if(greatGrandParentNode.children[i].id == grandParentNode.id)
						htmlCity += "<option selected='selected' value='" + greatGrandParentNode.children[i].id.substring(5, greatGrandParentNode.children[i].id.length) + "'>" + greatGrandParentNode.children[i].name + "</option>";
					else
						htmlCity += "<option value='" + greatGrandParentNode.children[i].id.substring(5, greatGrandParentNode.children[i].id.length) + "'>" + greatGrandParentNode.children[i].name + "</option>";
				}
				// 获取所有区县名称，编码
				for(var i = 0; i < grandParentNode.children.length; i++) {
					if(grandParentNode.children[i].id == parentNode.id)
						htmlTown += "<option selected='selected' value='" + grandParentNode.children[i].id.substring(5, grandParentNode.children[i].id.length) + "'>" + grandParentNode.children[i].name + "</option>";
					else
						htmlTown += "<option value='" + grandParentNode.children[i].id.substring(5, grandParentNode.children[i].id.length) + "'>" + grandParentNode.children[i].name + "</option>";
				}
				// 获取所有网格名称，编码
				for(var i = 0; i < parentNode.children.length; i++) {
					if(parentNode.children[i].id == treeNode.id)
						htmlGrid += "<option selected='selected' value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
					else
						htmlGrid += "<option value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
				}
				var greatBigGrandParentNode = greatGrandParentNode.getParentNode();
				if("zdyw" == greatBigGrandParentNode.children[1].id) {
					$("#conditionDivFive").css("display", "block");
					$("#conditionTwo").css("display", "block");
					getMaxStatisDate(greatBigGrandParentNode.children[1].children[0].id);
					htmlTwo = "";
				}
				for(var i = 0; i < greatBigGrandParentNode.children.length; i++) {
					if(null != greatBigGrandParentNode.children[i].netType && "" != greatBigGrandParentNode.children[i].netType) {
						// 加载一级菜单
						htmlOne += "<option value='" + greatBigGrandParentNode.children[i].id + "'>" + greatBigGrandParentNode.children[i].name + "</option>";
					}
				}
				// 加载二级菜单
				var secondMenuNode = greatBigGrandParentNode.children[1];
				if(secondMenuNode.isParent){
				for(var i = 0; i < secondMenuNode.children.length; i++) {
					htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
				}
				}
			}
		} 
		// 当前登录人是网格层级
		else {
			htmlCity = "";
			htmlTown = "";
			htmlGrid = "";
			if(treeNode.level == 0) {
				// 获取省级节点
				var childrenNode = treeNode.children[0];
				// 获取所有地市的名称，编码
				for(var i = 0; i < childrenNode.children.length; i++) {
					htmlCity += "<option value='" + childrenNode.children[i].id.substring(5, childrenNode.children[i].id.length) + "'>" + childrenNode.children[i].name + "</option>";
				}
				// 获取地市节点
				var grandChildrenNode = childrenNode.children[0];
				// 获取地市节点下所有的区县名称，编码
				for(var i = 0; i < grandChildrenNode.children.length; i++) {
					htmlTown += "<option value='" + grandChildrenNode.children[i].id.substring(5, grandChildrenNode.children[i].id.length) + "'>" + grandChildrenNode.children[i].name + "</option>";
				}
				// 获取区县节点
				var greatGrandChildrenNode = grandChildrenNode.children[0];
				// 获取区县节点下所有的网格名称，编码
				for(var i = 0; i < greatGrandChildrenNode.children.length; i++) {
					htmlGrid += "<option value='" + greatGrandChildrenNode.children[i].id.substring(5, greatGrandChildrenNode.children[i].id.length) + "'>" + greatGrandChildrenNode.children[i].name + "</option>";
				}
				childrenNode = treeNode.children;
				if("zdyw" == childrenNode[1].id) {
					$("#conditionDivFive").css("display", "block");
					$("#conditionTwo").css("display", "block");
					getMaxStatisDate(childrenNode[1].children[0].id);
					htmlTwo = "";
				}
				for(var i = 0; i < childrenNode.length; i++) {
					if(null != childrenNode[i].netType && "" != childrenNode[i].netType) {
						if(childrenNode[i].id == treeNode.id)
							// 加载一级菜单
							htmlOne += "<option selected='selected' value='" + childrenNode[i].id + "'>" + childrenNode[i].name + "</option>";
						else 
							// 加载一级菜单
							htmlOne += "<option value='" + childrenNode[i].id + "'>" + childrenNode[i].name + "</option>";
					}
				}
				// 加载二级菜单
				var secondMenuNode = childrenNode[1];
				if(secondMenuNode.isParent){
				for(var i = 0; i < secondMenuNode.children.length; i++) {
					htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
				}
				}
			}
			// 点击省公司
			else if(treeNode.level == 1) {
				// 获取所有地市的名称，编码
				for(var i = 0; i < treeNode.children.length; i++) {
					htmlCity += "<option value='" + treeNode.children[i].id.substring(5, treeNode.children[i].id.length) + "'>" + treeNode.children[i].name + "</option>";
				}
				// 获取地市节点
				var childrenNode = treeNode.children[0];
				// 获取地市节点下所有的区县名称，编码
				for(var i = 0; i < childrenNode.children.length; i++) {
					htmlTown += "<option value='" + childrenNode.children[i].id.substring(5, childrenNode.children[i].id.length) + "'>" + childrenNode.children[i].name + "</option>";
				}
				// 获取区县节点
				var grandChildrenNode = childrenNode.children[0];
				// 获取区县节点下所有的网格名称，编码
				for(var i = 0; i < grandChildrenNode.children.length; i++) {
					htmlGrid += "<option value='" + grandChildrenNode.children[i].id.substring(5, grandChildrenNode.children[i].id.length) + "'>" + grandChildrenNode.children[i].name + "</option>";
				}
				var parentNode = treeNode.getParentNode();
				if("zdyw" == parentNode.children[1].id) {
					$("#conditionDivFive").css("display", "block");
					$("#conditionTwo").css("display", "block");
					getMaxStatisDate(parentNode.children[1].children[0].id);
					htmlTwo = "";
				}
				for(var i = 0; i < parentNode.children.length; i++) {
					if(null != parentNode.children[i].netType && "" != parentNode.children[i].netType) {
						// 加载一级菜单
						htmlOne += "<option value='" + parentNode.children[i].id + "'>" + parentNode.children[i].name + "</option>";
					}
				}
				// 加载二级菜单
				var secondMenuNode = parentNode.children[1];
				if(secondMenuNode.isParent){
				for(var i = 0; i < secondMenuNode.children.length; i++) {
					htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
				}
				}
			} 
			// 点击地市
			else if(treeNode.level == 2) {
				var parentNode = treeNode.getParentNode();
				// 获取所有地市名称，编码
				for(var i = 0; i < parentNode.children.length; i++) {
					if(parentNode.children[i].id == treeNode.id)
						htmlCity += "<option selected='selected' value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
					else
						htmlCity += "<option value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
				}
				// 获取所有区县名称，编码
				for(var i = 0; i < treeNode.children.length; i++) {
					htmlTown += "<option value='" + treeNode.children[i].id.substring(5, treeNode.children[i].id.length) + "'>" + treeNode.children[i].name + "</option>";
				}
				// 获取区县节点
				var childrenNode = treeNode.children[0];
				// 获取区县节点下所有的网格名称，编码
				for(var i = 0; i < childrenNode.children.length; i++) {
					htmlGrid += "<option value='" + childrenNode.children[i].id.substring(5, childrenNode.children[i].id.length) + "'>" + childrenNode.children[i].name + "</option>";
				}
				var grandParentNode = parentNode.getParentNode();
				if("zdyw" == grandParentNode.children[1].id) {
					$("#conditionDivFive").css("display", "block");
					$("#conditionTwo").css("display", "block");
					getMaxStatisDate(grandParentNode.children[1].children[0].id);
					htmlTwo = "";
				}
				for(var i = 0; i < grandParentNode.children.length; i++) {
					if(null != grandParentNode.children[i].netType && "" != grandParentNode.children[i].netType) {
						// 加载一级菜单
						htmlOne += "<option value='" + grandParentNode.children[i].id + "'>" + grandParentNode.children[i].name + "</option>";
					}
				}
				// 加载二级菜单
				var secondMenuNode = grandParentNode.children[1];
				if(secondMenuNode.isParent){
				for(var i = 0; i < secondMenuNode.children.length; i++) {
					htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
				}
				}
				htmlGrid += "<option value=''>---网格---</option>";
			} 
			// 点击区县
			else if(treeNode.level == 3) {
				var parentNode = treeNode.getParentNode();
				var grandParentNode = parentNode.getParentNode();
				// 获取所有地市名称，编码
				for(var i = 0; i < grandParentNode.children.length; i++) {
					if(grandParentNode.children[i].id == parentNode.id)
						htmlCity += "<option selected='selected' value='" + grandParentNode.children[i].id.substring(5, grandParentNode.children[i].id.length) + "'>" + grandParentNode.children[i].name + "</option>";
					else
						htmlCity += "<option value='" + grandParentNode.children[i].id.substring(5, grandParentNode.children[i].id.length) + "'>" + grandParentNode.children[i].name + "</option>";
				}
				// 获取所有区县名称，编码
				for(var i = 0; i < parentNode.children.length; i++) {
					if(parentNode.children[i].id == treeNode.id)
						htmlTown += "<option selected='selected' value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
					else
						htmlTown += "<option value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
				}
				// 获取所有网格名称，编码
				for(var i = 0; i < treeNode.children.length; i++) {
					htmlGrid += "<option value='" + treeNode.children[i].id.substring(5, treeNode.children[i].id.length) + "'>" + treeNode.children[i].name + "</option>";
				}
				var greatGrandParentNode = grandParentNode.getParentNode();
				if("zdyw" == greatGrandParentNode.children[1].id) {
					$("#conditionDivFive").css("display", "block");
					$("#conditionTwo").css("display", "block");
					getMaxStatisDate(greatGrandParentNode.children[1].children[0].id);
					htmlTwo = "";
				}
				for(var i = 0; i < greatGrandParentNode.children.length; i++) {
					if(null != greatGrandParentNode.children[i].netType && "" != greatGrandParentNode.children[i].netType) {
						// 加载一级菜单
						htmlOne += "<option value='" + greatGrandParentNode.children[i].id + "'>" + greatGrandParentNode.children[i].name + "</option>";
					}
				}
				// 加载二级菜单
				var secondMenuNode = greatGrandParentNode.children[1];
				if(secondMenuNode.isParent){
				for(var i = 0; i < secondMenuNode.children.length; i++) {
					htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
				}
				}
			} 
			// 点击网格
			else if(treeNode.level == 4) {
				var parentNode = treeNode.getParentNode();
				var grandParentNode = parentNode.getParentNode();
				var greatGrandParentNode = grandParentNode.getParentNode();
				// 获取所有地市名称，编码
				for(var i = 0; i < greatGrandParentNode.children.length; i++) {
					if(greatGrandParentNode.children[i].id == grandParentNode.id)
						htmlCity += "<option selected='selected' value='" + greatGrandParentNode.children[i].id.substring(5, greatGrandParentNode.children[i].id.length) + "'>" + greatGrandParentNode.children[i].name + "</option>";
					else
						htmlCity += "<option value='" + greatGrandParentNode.children[i].id.substring(5, greatGrandParentNode.children[i].id.length) + "'>" + greatGrandParentNode.children[i].name + "</option>";
				}
				// 获取所有区县名称，编码
				for(var i = 0; i < grandParentNode.children.length; i++) {
					if(grandParentNode.children[i].id == parentNode.id)
						htmlTown += "<option selected='selected' value='" + grandParentNode.children[i].id.substring(5, grandParentNode.children[i].id.length) + "'>" + grandParentNode.children[i].name + "</option>";
					else
						htmlTown += "<option value='" + grandParentNode.children[i].id.substring(5, grandParentNode.children[i].id.length) + "'>" + grandParentNode.children[i].name + "</option>";
				}
				// 获取所有网格名称，编码
				for(var i = 0; i < parentNode.children.length; i++) {
					if(parentNode.children[i].id == treeNode.id)
						htmlGrid += "<option selected='selected' value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
					else
						htmlGrid += "<option value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
				}
				var greatBigGrandParentNode = greatGrandParentNode.getParentNode();
				if("zdyw" == greatBigGrandParentNode.children[1].id) {
					$("#conditionDivFive").css("display", "block");
					$("#conditionTwo").css("display", "block");
					getMaxStatisDate(greatBigGrandParentNode.children[1].children[0].id);
					htmlTwo = "";
				}
				for(var i = 0; i < greatBigGrandParentNode.children.length; i++) {
					if(null != greatBigGrandParentNode.children[i].netType && "" != greatBigGrandParentNode.children[i].netType) {
						// 加载一级菜单
						htmlOne += "<option value='" + greatBigGrandParentNode.children[i].id + "'>" + greatBigGrandParentNode.children[i].name + "</option>";
					}
				}
				// 加载二级菜单
				var secondMenuNode = greatBigGrandParentNode.children[1];
				if(secondMenuNode.isParent){
				for(var i = 0; i < secondMenuNode.children.length; i++) {
					htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
				}
				}
			}
		}
		$("#oneType").html(htmlOne);
		$("#twoType").html(htmlTwo);
		$("#city").html(htmlCity);
		$("#town").html(htmlTown);
		$("#grid").html(htmlGrid);
	}
	searchBasicInfo();
	if("RYXX" == $("#oneType option:selected").val()) {
		$("#gridTypeInfoTr").css("display", "none");
	} else {
		$("#gridTypeInfoTr").css("display", "contents");
	}
}

// 当前登录人为省级或地市级进入点击事件
function changeProvinceOrCitySelectInfo(treeNode) {
	$("#jcxx").css("display", "none");
	$("#zbxz").css("display", "none");
	$("#zyxx").css("display", "none");
	$("#yxrw").css("display", "none");
	var htmlCity = "<option value=''>---地市---</option>";
	var htmlTown = "<option value=''>---区县---</option>";
	var htmlGrid = "<option value=''>---网格---</option>";
	var htmlOne = "";
	var htmlTwo = "<option value=''>---二级分类---</option>";
	$("#resourcePanel").css("display", "none");
	$("#tablePanel").css("display", "block");
	$("#topPanel").css("display", "none");
	$("#oneType").css("display", "block");
	$("#twoType").css("display", "block");
	// 选择的不是地市区县网格
	if(null != treeNode.netType) {
		$("#oneType").empty();
		$("#twoType").empty();
		// 把原有的组织架构树原样保留
		var city = $("#city").html();
		var town = $("#town").html();
		var grid = $("#grid").html();
		// 加载地市区县
		if(null != city && "" != city && null != town && "" != town && null != grid && "" != grid) {
			$("#city").empty();
			$("#town").empty();
			$("#grid").empty();
			$("#city").html(city);
			$("#town").html(town);
			$("#grid").html(grid);
		} else {
			var parentNode = null;
			var childrenNode = null;
			if(treeNode.level == 2) {
				parentNode = treeNode.getParentNode().getParentNode();
			} else if(treeNode.level == 1) {
				parentNode = treeNode.getParentNode();
			} else if(treeNode.level == 3) {
				parentNode = treeNode.getParentNode().getParentNode().getParentNode();
			}
			childrenNode = parentNode.children[0];
			if("1" == nowOrgLevel) {
				// 获取所有地市的名称，编码
				for(var i = 0; i < childrenNode.children.length; i++) {
					htmlCity += "<option value='" + childrenNode.children[i].id.substring(5, childrenNode.children[i].id.length) + "'>" + childrenNode.children[i].name + "</option>";
				}
			}
			
			if("2" == nowOrgLevel) {
				htmlCity = "";
				for(var i = 0; i < childrenNode.children.length; i++) {
					htmlCity += "<option value='" + childrenNode.children[i].id.substring(5, childrenNode.children[i].id.length) + "'>" + childrenNode.children[i].name + "</option>";
				}
				// 获取地市节点
				var grandChildrenNode = childrenNode.children[0];
				// 获取地市节点下所有的区县名称，编码
				for(var i = 0; i < grandChildrenNode.children.length; i++) {
					htmlTown += "<option value='" + grandChildrenNode.children[i].id.substring(5, grandChildrenNode.children[i].id.length) + "'>" + grandChildrenNode.children[i].name + "</option>";
				}
			}
			$("#city").html(htmlCity);
			$("#town").html(htmlTown);
			$("#grid").html(htmlGrid);
		}
		// 点击了第一级（人员信息/网格信息）
		if(treeNode.level == 1) {
			// 如果是重点业务，则二级菜单默认选择第一个
			if("zdyw" == treeNode.id) {
				$("#conditionDivFive").css("display", "block");
				$("#conditionTwo").css("display", "block");
				getMaxStatisDate(treeNode.children[0].id);
				htmlTwo = "";
			}
			// 加载一级，二级分类
			var parentNode;
			var children;
			if(treeNode.children!=undefined){
				if(treeNode.children[0].children!=undefined){
					parentNode=treeNode.children;
					children=treeNode.children[0].children;
				}else{
					parentNode=treeNode.getParentNode().children;
					children=treeNode.children;
				}
			}else{
				parentNode=treeNode.getParentNode().children;
				children=treeNode;
			}
			for(var i = 0; i < parentNode.length; i++) {
				if(null != parentNode[i].netType && "" != parentNode[i].netType) {
					if(parentNode[i].id == treeNode.id)
						// 加载一级菜单
						htmlOne += "<option selected='selected' value='" + parentNode[i].id + "'>" + parentNode[i].name + "</option>";
					else 
						// 加载一级菜单
						htmlOne += "<option value='" + parentNode[i].id + "'>" + parentNode[i].name + "</option>";
				}
			}
			// 加载二级菜单
			for(var j = 0; j < children.length; j++) {
				if(children[j].id == treeNode.id)
					// 加载二级菜单
					htmlTwo += "<option selected='selected' value='" + children[j].id + "'>" + children[j].name + "</option>";
				else 
					// 加载二级菜单
					htmlTwo += "<option value='" + children[j].id + "'>" + children[j].name + "</option>";
				}
		} 
		// 
		else {
			var parentNode;
			var childrenNode=treeNode.children;
			if(childrenNode!=undefined){
				parentNode=treeNode;
			}else{
				 parentNode = treeNode.getParentNode();
			}
			// 如果是重点业务，则二级菜单默认选择第一个
			if("zdyw" == parentNode.id) {
				getMaxStatisDate(treeNode.id);
				htmlTwo = "";
			}
			var grandParentNode = parentNode.getParentNode().children;
			// 加载一级菜单
			for(var i = 0; i < grandParentNode.length; i++) {
				if(null != grandParentNode[i].netType && "" != grandParentNode[i].netType) {
					if(grandParentNode[i].id == parentNode.id)
						// 加载一级菜单
						htmlOne += "<option selected='selected' value='" + grandParentNode[i].id + "'>" + grandParentNode[i].name + "</option>";
					else 
						// 加载一级菜单
						htmlOne += "<option value='" + grandParentNode[i].id + "'>" + grandParentNode[i].name + "</option>";
				}
			}
			// 加载二级菜单
			for(var i = 0; i < parentNode.children.length; i++) {
				if(parentNode.children[i].id == treeNode.id)
					// 加载二级菜单
					htmlTwo += "<option selected='selected' value='" + parentNode.children[i].id + "'>" + parentNode.children[i].name + "</option>";
				else 
					// 加载二级菜单
					htmlTwo += "<option value='" + parentNode.children[i].id + "'>" + parentNode.children[i].name + "</option>";
			}
		}
		$("#oneType").html(htmlOne);
		$("#twoType").html(htmlTwo);
	} else {
		
		if("2" == nowOrgLevel) 
			htmlCity = "";
		if(treeNode.level == 0) {
			// 获取省级节点
			var childrenNode = treeNode.children[0];
			// 获取所有地市的名称，编码
			for(var i = 0; i < childrenNode.children.length; i++) {
				htmlCity += "<option value='" + childrenNode.children[i].id.substring(5, childrenNode.children[i].id.length) + "'>" + childrenNode.children[i].name + "</option>";
			}
			// 加载一级菜单
			childrenNode = treeNode.children;
			if("zdyw" == childrenNode[1].id) {
				$("#conditionDivFive").css("display", "block");
				$("#conditionTwo").css("display", "block");
				getMaxStatisDate(childrenNode[1].children[0].id);
				htmlTwo = "";
			}
			for(var i = 0; i < childrenNode.length; i++) {
				if(null != childrenNode[i].netType && "" != childrenNode[i].netType) {
					if(childrenNode[i].id == treeNode.id)
						// 加载一级菜单
						htmlOne += "<option selected='selected' value='" + childrenNode[i].id + "'>" + childrenNode[i].name + "</option>";
					else 
						// 加载一级菜单
						htmlOne += "<option value='" + childrenNode[i].id + "'>" + childrenNode[i].name + "</option>";
				}
			}
			// 加载二级菜单
			var secondMenuNode = childrenNode[1];
			if(secondMenuNode.isParent)
				for(var i = 0; i < secondMenuNode.children.length; i++) {
					htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
				}
		}
		// 点击省公司
		else if(treeNode.level == 1) {
			// 获取所有地市的名称，编码
			for(var i = 0; i < treeNode.children.length; i++) {
				htmlCity += "<option value='" + treeNode.children[i].id.substring(5, treeNode.children[i].id.length) + "'>" + treeNode.children[i].name + "</option>";
			}
			var parentNode = treeNode.getParentNode();
			if("zdyw" == parentNode.children[1].id) {
				$("#conditionDivFive").css("display", "block");
				$("#conditionTwo").css("display", "block");
				getMaxStatisDate(parentNode.children[1].children[0].id);
				htmlTwo = "";
			}
			for(var i = 0; i < parentNode.children.length; i++) {
				if(null != parentNode.children[i].netType && "" != parentNode.children[i].netType) {
					// 加载一级菜单
					htmlOne += "<option value='" + parentNode.children[i].id + "'>" + parentNode.children[i].name + "</option>";
				}
			}
			// 加载二级菜单
			var secondMenuNode = parentNode.children[1];
			if(secondMenuNode.isParent)
				for(var i = 0; i < secondMenuNode.children.length; i++) {
					htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
				}
		} 
		// 点击地市
		else if(treeNode.level == 2) {
			var parentNode = treeNode.getParentNode();
			// 获取所有地市名称，编码
			for(var i = 0; i < parentNode.children.length; i++) {
				if(parentNode.children[i].id == treeNode.id)
					htmlCity += "<option selected='selected' value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
				else
					htmlCity += "<option value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
			}
			// 获取所有区县名称，编码
			for(var i = 0; i < treeNode.children.length; i++) {
				htmlTown += "<option value='" + treeNode.children[i].id.substring(5, treeNode.children[i].id.length) + "'>" + treeNode.children[i].name + "</option>";
			}
			var grandParentNode = parentNode.getParentNode();
			if("zdyw" == grandParentNode.children[1].id) {
				$("#conditionDivFive").css("display", "block");
				$("#conditionTwo").css("display", "block");
				getMaxStatisDate(grandParentNode.children[1].children[0].id);
				htmlTwo = "";
			}
			for(var i = 0; i < grandParentNode.children.length; i++) {
				if(null != grandParentNode.children[i].netType && "" != grandParentNode.children[i].netType) {
					// 加载一级菜单
					htmlOne += "<option value='" + grandParentNode.children[i].id + "'>" + grandParentNode.children[i].name + "</option>";
				}
			}
			// 加载二级菜单
			var secondMenuNode = grandParentNode.children[1];
			if(secondMenuNode.isParent)
				for(var i = 0; i < secondMenuNode.children.length; i++) {
					htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
				}
		} 
		// 点击区县
		else if(treeNode.level == 3) {
			var parentNode = treeNode.getParentNode();
			var grandParentNode = parentNode.getParentNode();
			// 获取所有地市名称，编码
			for(var i = 0; i < grandParentNode.children.length; i++) {
				if(grandParentNode.children[i].id == parentNode.id)
					htmlCity += "<option selected='selected' value='" + grandParentNode.children[i].id.substring(5, grandParentNode.children[i].id.length) + "'>" + grandParentNode.children[i].name + "</option>";
				else
					htmlCity += "<option value='" + grandParentNode.children[i].id.substring(5, grandParentNode.children[i].id.length) + "'>" + grandParentNode.children[i].name + "</option>";
			}
			// 获取所有区县名称，编码
			for(var i = 0; i < parentNode.children.length; i++) {
				if(parentNode.children[i].id == treeNode.id)
					htmlTown += "<option selected='selected' value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
				else
					htmlTown += "<option value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
			}
			// 获取所有网格名称，编码
			for(var i = 0; i < treeNode.children.length; i++) {
				htmlGrid += "<option value='" + treeNode.children[i].id.substring(5, treeNode.children[i].id.length) + "'>" + treeNode.children[i].name + "</option>";
			}
			var greatGrandParentNode = grandParentNode.getParentNode();
			if("zdyw" == greatGrandParentNode.children[1].id) {
				$("#conditionDivFive").css("display", "block");
				$("#conditionTwo").css("display", "block");
				getMaxStatisDate(greatGrandParentNode.children[1].children[0].id);
				htmlTwo = "";
			}
			for(var i = 0; i < greatGrandParentNode.children.length; i++) {
				if(null != greatGrandParentNode.children[i].netType && "" != greatGrandParentNode.children[i].netType) {
					// 加载一级菜单
					htmlOne += "<option value='" + greatGrandParentNode.children[i].id + "'>" + greatGrandParentNode.children[i].name + "</option>";
				}
			}
			// 加载二级菜单
			var secondMenuNode = greatGrandParentNode.children[1];
			if(secondMenuNode.isParent)
				for(var i = 0; i < secondMenuNode.children.length; i++) {
					htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
				}
		} 
		// 点击网格
		else if(treeNode.level == 4) {
			var parentNode = treeNode.getParentNode();
			var grandParentNode = parentNode.getParentNode();
			var greatGrandParentNode = grandParentNode.getParentNode();
			// 获取所有地市名称，编码
			for(var i = 0; i < greatGrandParentNode.children.length; i++) {
				if(greatGrandParentNode.children[i].id == grandParentNode.id)
					htmlCity += "<option selected='selected' value='" + greatGrandParentNode.children[i].id.substring(5, greatGrandParentNode.children[i].id.length) + "'>" + greatGrandParentNode.children[i].name + "</option>";
				else
					htmlCity += "<option value='" + greatGrandParentNode.children[i].id.substring(5, greatGrandParentNode.children[i].id.length) + "'>" + greatGrandParentNode.children[i].name + "</option>";
			}
			// 获取所有区县名称，编码
			for(var i = 0; i < grandParentNode.children.length; i++) {
				if(grandParentNode.children[i].id == parentNode.id)
					htmlTown += "<option selected='selected' value='" + grandParentNode.children[i].id.substring(5, grandParentNode.children[i].id.length) + "'>" + grandParentNode.children[i].name + "</option>";
				else
					htmlTown += "<option value='" + grandParentNode.children[i].id.substring(5, grandParentNode.children[i].id.length) + "'>" + grandParentNode.children[i].name + "</option>";
			}
			// 获取所有网格名称，编码
			for(var i = 0; i < parentNode.children.length; i++) {
				if(parentNode.children[i].id == treeNode.id)
					htmlGrid += "<option selected='selected' value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
				else
					htmlGrid += "<option value='" + parentNode.children[i].id.substring(5, parentNode.children[i].id.length) + "'>" + parentNode.children[i].name + "</option>";
			}
			var greatBigGrandParentNode = greatGrandParentNode.getParentNode();
			if("zdyw" == greatBigGrandParentNode.children[1].id) {
				$("#conditionDivFive").css("display", "block");
				$("#conditionTwo").css("display", "block");
				getMaxStatisDate(greatBigGrandParentNode.children[1].children[0].id);
				htmlTwo = "";
			}
			for(var i = 0; i < greatBigGrandParentNode.children.length; i++) {
				if(null != greatBigGrandParentNode.children[i].netType && "" != greatBigGrandParentNode.children[i].netType) {
					// 加载一级菜单
					htmlOne += "<option value='" + greatBigGrandParentNode.children[i].id + "'>" + greatBigGrandParentNode.children[i].name + "</option>";
				}
			}
			// 加载二级菜单
			var secondMenuNode = greatBigGrandParentNode.children[1];
			if(secondMenuNode.isParent)
				for(var i = 0; i < secondMenuNode.children.length; i++) {
					htmlTwo += "<option value='" + secondMenuNode.children[i].id + "'>" + secondMenuNode.children[i].name + "</option>";
				}
		}
		$("#oneType").html(htmlOne);
		$("#twoType").html(htmlTwo);
		$("#city").html(htmlCity);
		$("#town").html(htmlTown);
		$("#grid").html(htmlGrid);
	}
	if("2" == nowOrgLevel) {
		this.city();
	}
	if("ORG" == treeNode.type)
		searchBasicInfo();
	if("RYXX" == $("#oneType option:selected").val()) {
		$("#gridTypeInfoTr").css("display", "none");
	} else {
		$("#gridTypeInfoTr").css("display", "contents");
	}
}
