$(function() {
	showEmap(nowOrgId, "main", callBack);
	function callBack(orgId,orgLevel) {
		$("#hiddenOrgLevel").val(orgLevel);
		$("#hiddenOrgId").val(orgId);
		if(orgLevel == "2") {
			var obj=this.next();
			$('#cityInfoDivId').css("display","block");
			$(".menuArea").css("visibility", "");
			$("#gridDiv").css("display", "block");
			initCityInfo(orgId,orgLevel);
		} else if(orgLevel == "3") {
			var obj=this.next();
			initGridMapGrid();
			$('#downCityInfoDivId').css("display","none");
			$('#cityInfoDivId').css("display","none");
			$(".menuArea").css("visibility", "hidden");
		} else if(orgLevel == "4") {
			// 当前点击的是第4层，地图呈现，再钻取就呈现指标了
			$('#downCityInfoDivId').css("display","none");
			$('#cityInfoDivId').css("display","none");
			gridIWindow(orgId);
		} else {
			$('#cityInfoDivId').css("display","block");
			initCityInfo(orgId,orgLevel);
			var obj=this.next();
		}
	}
	//点击地市显示地市面板信息
    $('#downCityInfoDivId').on('click',function(){
		$('#cityInfoDivId').css("display","block");	
    });
    //点击地市面板影藏面板信息
    $('#cityInfoDivId').on('click',function(){
		$('#cityInfoDivId').css("display","none");	
    });
  
    //关闭地市面板
    $('#cityClose').on('click',function(){
		$('#cityInfoDivId').css("display","none");	
    });
    
	// 网格信息窗口
	var gridIWindow = function(orgId) {
		topwindow.showWindow({
			title: '网格信息',
			width: 1200,
		    height: 490,
		    data:{},
			url: $.cxt + "/pages/gis/gridInfo/gridInfo.jsp?orgId=" + orgId,
		});
	}
});

function initCityInfo(orgId,orgLevel){
		$.ajax({
			url : $.cxt + "/compositeView/cityInfos",
		 	type : "POST",
		 	data : {'orgId':orgId,
		 		    'orgLevel':orgLevel
		 		    },
		 	success : function(data){
		 		var data = JSON.parse(data);
		 		var json = data.data;
		 		var ORG_NAME="";
				if(json.ORG_NAME!=undefined){
					ORG_NAME=json.ORG_NAME;
				}
				$('#cityInfoName').html(ORG_NAME);
				var GRID_COUNT="";
				if(json.GRID_COUNT!=undefined){
					GRID_COUNT=json.GRID_COUNT;
				}
				var GRID_TYPE1="";
				if(json.GRID_TYPE1_COUNT!=undefined){
					GRID_TYPE1=json.GRID_TYPE1_COUNT;
				}
				var GRID_TYPE2="";
				if(json.GRID_TYPE2_COUNT!=undefined){
					GRID_TYPE2=json.GRID_TYPE2_COUNT;
				}
				var GRID_TYPE3="";
				if(json.GRID_TYPE3_COUNT!=undefined){
					GRID_TYPE3=json.GRID_TYPE3_COUNT;
				}
				var CHNL_COUNT="";
				if(json.CHNL_COUNT!=undefined){
					CHNL_COUNT=json.CHNL_COUNT;
				}
				var CHNL_WG_COUNT="";
				if(json.CHNL_WG_COUNT!=undefined){
					CHNL_WG_COUNT=json.CHNL_WG_COUNT;
				}
				var STATION_COUNT="";
				if(json.STATION_COUNT!=undefined){
					STATION_COUNT=json.STATION_COUNT;
				}
				var STATION_WG_COUNT="";
				if(json.STATION_WG_COUNT!=undefined){
					STATION_WG_COUNT=json.STATION_WG_COUNT;
				}
				var STATION_CELL_COUNT="";
				if(json.STATION_CELL_COUNT!=undefined){
					STATION_CELL_COUNT=json.STATION_CELL_COUNT;
				}
				var STATION_CELL_WG_COUNT="";
				if(json.STATION_CELL_WG_COUNT!=undefined){
					STATION_CELL_WG_COUNT=json.STATION_CELL_WG_COUNT;
				}
				
				var CELL_COUNT="";
				if(json.CELL_COUNT!=undefined){
					CELL_COUNT=json.CELL_COUNT;
				}
				var CELL_WG_COUNT="";
				if(json.CELL_WG_COUNT!=undefined){
					CELL_WG_COUNT=json.CELL_WG_COUNT;
				}
				var AB_JT_COUNT="";
				if(json.AB_JT_COUNT!=undefined){
					AB_JT_COUNT=json.AB_JT_COUNT;
				}
				var ABJT_WG_COUNT="";
				if(json.ABJT_WG_COUNT!=undefined){
					ABJT_WG_COUNT=json.ABJT_WG_COUNT;
				}
				var CD_JT_COUNT="";
				if(json.CD_JT_COUNT!=undefined){
					CD_JT_COUNT=json.CD_JT_COUNT;
				}
				var CDJT_WG_COUNT="";
				if(json.CDJT_WG_COUNT!=undefined){
					CDJT_WG_COUNT=json.CDJT_WG_COUNT;
				}
				var GJDZ_CELL_COUNT="";
				if(json.GJDZ_CELL_COUNT!=undefined){
					GJDZ_CELL_COUNT=json.GJDZ_CELL_COUNT;
				}
				
				var GJDZ_CELL_WG_COUNT="";
				if(json.GJDZ_CELL_WG_COUNT!=undefined){
					GJDZ_CELL_WG_COUNT=json.GJDZ_CELL_WG_COUNT;
				}
				
				var CUS_INCOME="";
				if(json.CUS_INCOME!=undefined){
					CUS_INCOME=json.CUS_INCOME;
				}
				
				var TELE_COUNT="";
				if(json.TELE_COUNT!=undefined){
					TELE_COUNT=json.TELE_COUNT;
				}
				var BRO_ADD_COUNT="";
				if(json.BRO_ADD_COUNT!=undefined){
					BRO_ADD_COUNT=json.BRO_ADD_COUNT;
				}
				var TERMINAL_COUNT="";
				if(json.TERMINAL_COUNT!=undefined){
					TERMINAL_COUNT=json.TERMINAL_COUNT;
				}
				var HOMENET_ADD_COUNT="";
				if(json.HOMENET_ADD_COUNT!=undefined){
					HOMENET_ADD_COUNT=json.HOMENET_ADD_COUNT;
				}
				var GJDZ_ADD_COUNT="";
				if(json.GJDZ_ADD_COUNT!=undefined){
					GJDZ_ADD_COUNT=json.GJDZ_ADD_COUNT;
				}
				var AFTER90_COUNT="";
				if(json.AFTER90_COUNT!=undefined){
					AFTER90_COUNT=json.AFTER90_COUNT;
				}
				var FUSEUSR_COUNT="";
				if(json.FUSEUSR_COUNT!=undefined){
					FUSEUSR_COUNT=json.FUSEUSR_COUNT;
				}
				var ENCLOSURE_COUNT="";
				if(json.ENCLOSURE_COUNT!=undefined){
					ENCLOSURE_COUNT=json.ENCLOSURE_COUNT;
				}
				var CUS_DVP_COUNT="";
				if(json.CUS_DVP_COUNT!=undefined){
					CUS_DVP_COUNT=json.CUS_DVP_COUNT;
				}
				
				var KD_ADD_COUNT="";
				if(json.KD_ADD_COUNT!=undefined){
					KD_ADD_COUNT=json.KD_ADD_COUNT;
				}
				var CONTRACT_INT_COUNT="";
				if(json.CONTRACT_INT_COUNT!=undefined){
					CONTRACT_INT_COUNT=json.CONTRACT_INT_COUNT;
				}
				
				var PORT_COUNT="";
				if(json.PORT_COUNT!=undefined){
					PORT_COUNT=json.PORT_COUNT;
				}
				
				var ADDR9_COUNT="";
				if(json.ADDR9_COUNT!=undefined){
					ADDR9_COUNT=json.ADDR9_COUNT;
				}
				
				var PORT_FEE_COUNT="";
				if(json.PORT_FEE_COUNT!=undefined){
					PORT_FEE_COUNT=json.PORT_FEE_COUNT;
				}
				
				var BUILDING_COUNT="";
				if(json.BUILDING_COUNT!=undefined){
					BUILDING_COUNT=json.BUILDING_COUNT;
				}
				
				var GXX_COUNT="";
				if(json.GXX_COUNT!=undefined){
					GXX_COUNT=json.GXX_COUNT;
				}
				
				var FXX_COUNT="";
				if(json.FXX_COUNT!=undefined){
					FXX_COUNT=json.FXX_COUNT;
				}
		 		$("#GRID_COUNT1").html(GRID_COUNT);
		 		$("#GRID_TYPE11").html(GRID_TYPE1);
		 		$("#GRID_TYPE21").html(GRID_TYPE2);
		 		$("#GRID_TYPE31").html(GRID_TYPE3);
		 		$("#CHNL_COUNT1").html(CHNL_COUNT);
		 		$("#CHNL_WG_COUNT1").html(CHNL_WG_COUNT);
		 		$("#STATION_COUNT1").html(STATION_COUNT);
		 		$("#STATION_WG_COUNT1").html(STATION_WG_COUNT);
		 		$("#STATION_CELL_COUNT1").html(STATION_CELL_COUNT);
		 		$("#STATION_CELL_WG_COUNT1").html(STATION_CELL_WG_COUNT);
		 		$("#CELL_COUNT1").html(CELL_COUNT);
		 		$("#CELL_WG_COUNT1").html(CELL_WG_COUNT);
		 		$("#AB_JT_COUNT1").html(AB_JT_COUNT);
		 		$("#ABJT_WG_COUNT1").html(ABJT_WG_COUNT);
		 		$("#CD_JT_COUNT1").html(CD_JT_COUNT);
		 		$("#CDJT_WG_COUNT1").html(CDJT_WG_COUNT);
		 		$("#GJDZ_CELL_COUNT1").html(GJDZ_CELL_COUNT);
		 		$("#GJDZ_CELL_WG_COUNT1").html(GJDZ_CELL_WG_COUNT);
		 		$("#CUS_INCOME1").html(CUS_INCOME);
		 		$("#TELE_COUNT1").html(TELE_COUNT);
		 		$("#BRO_ADD_COUNT1").html(BRO_ADD_COUNT);
		 		$("#TERMINAL_COUNT1").html(TERMINAL_COUNT);
		 		$("#HOMENET_ADD_COUNT1").html(HOMENET_ADD_COUNT);
		 		$("#GJDZ_ADD_COUNT1").html(GJDZ_ADD_COUNT);
		 		$("#AFTER90_COUNT1").html(AFTER90_COUNT);
		 		$("#FUSEUSR_COUNT1").html(FUSEUSR_COUNT);
		 		$("#ENCLOSURE_COUNT1").html(ENCLOSURE_COUNT);
		 		$("#CUS_DVP_COUNT1").html(CUS_DVP_COUNT);
		 		$("#KD_ADD_COUNT1").html(KD_ADD_COUNT);
		 		$("#CONTRACT_INT_COUNT1").html(CONTRACT_INT_COUNT);
		 		$("#PORT_COUNT1").html(PORT_COUNT);
		 		$("#ADDR9_COUNT1").html(ADDR9_COUNT);
		 		$("#PORT_FEE_COUNT1").html(PORT_FEE_COUNT);
		 		$("#BUILDING_COUNT1").html(BUILDING_COUNT);
		 		$("#GXX_COUNT1").html(GXX_COUNT);
		 		$("#FXX_COUNT1").html(FXX_COUNT);
			 }
		});
	
}
function initGridMapGrid() {
	var orgId =$("#hiddenOrgId").val();
	$.ajax({
		url: $.cxt + "/gridCommon/initGridInfo",
		data: {orgId: orgId},
		type: "POST",
		success: function(data) {
			var htmltv = "<option value=''>全部</option>";
			for(var i = 0, n = data.length; i < n; i++) {
				htmltv += "<option value='" + data[i].orgId + "'>" + data[i].name + "</option>";
			}
			$("#gridInfos").html(htmltv);
		}
	});
}

// 基础单元导出伸展
$("#upExportToggle").on("click", upExportToggle);
function upExportToggle(){
	//取消选中状态
	$("input[type='checkbox'][name='exportSecondInfos']").prop("checked",false);
	$("input[type='checkbox'][name='exportSecondInfosNotEnter']").prop("checked",false);
	$("#exportDiv").toggle("blind", null, 0);
	$("#downExportToggleDiv").css("display", "block");
}

// 基础单元导出收缩
$("#downExportToggle").on("click", downExportToggle);
function downExportToggle(){
	$("#exportDiv").toggle("blind", null, 0);
	$("#downExportToggleDiv").css("display", "none");
}

$("#checkSecondAllPoiInfo").on("change", checkSecondAllPoiInfo);
function checkSecondAllPoiInfo() {
	if ($("#checkSecondAllPoiInfo").prop("checked")) { 
		// 全选
        $("input[type='checkbox'][name='exportSecondInfos']").prop("checked",true);
    } else { 
    	// 取消全选     
        $("input[type='checkbox'][name='exportSecondInfos']").prop("checked",false);
    }  
}

$("#checkAllPoiInfo").on("change", checkAllPoiInfo);
function checkAllPoiInfo() {
	if ($("#checkAllPoiInfo").prop("checked")) { 
		// 全选
        $("input[type='checkbox'][name='exportInfos']").prop("checked",true);
    } else { 
    	// 取消全选     
        $("input[type='checkbox'][name='exportInfos']").prop("checked",false);
    }  
}

$("#exportSecondGridInfo").on("click", exportSecondGridInfo);
function exportSecondGridInfo() {
	var gridInfos = [];
	var gridCode = '';
	var gridName = '';
	// 循环遍历复选框的值
	$.each($('input[name="exportSecondInfos"]:checked'),function(i){
		gridInfos[i] = $(this).val();
    });
	// 判断是否有选择基础单元信息，没有选择则提示选择
	if(null == gridInfos || gridInfos.length == 0 || undefined == gridInfos) {
		messageAlert("请选择要导出的基础单元!");
	} else {
		// 拼接到一个text标签中
		var  orgId = $("#hiddenOrgId").val();
		var orgLevel=$("#hiddenOrgLevel").val();
		var html = "<input type='text' value='" + gridInfos +"' name='gridInfos' />";
		html += "<input type='text' value='" + gridCode + "' name='gridCode' />";
		html += "<input type='text' value='" + gridName + "' name='gridName' />";
		html += "<input type='text' value='" + orgId + "' name='orgId' />";
		html += "<input type='text' value='" + orgLevel + "' name='orgLevel' />";
		// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
		$('<form method="POST" action="' + $.cxt + '/map/exportGridInfo01">' + html + '</form>').appendTo('body').submit().remove();
	}
}

//未入格全选
$("#checkSecondAllPoiInfoNotEnter").on("change", checkSecondAllPoiInfoNotEnter);
function checkSecondAllPoiInfoNotEnter() {
	if ($("#checkSecondAllPoiInfoNotEnter").prop("checked")) { 
		// 全选
        $("input[type='checkbox'][name='exportSecondInfosNotEnter']").prop("checked",true);
    } else { 
    	// 取消全选     
        $("input[type='checkbox'][name='exportSecondInfosNotEnter']").prop("checked",false);
    } 
}

$("#checkAllPoiInfoNotEnter").on("change", checkAllPoiInfoNotEnter);
function checkAllPoiInfoNotEnter() {
	if ($("#checkAllPoiInfoNotEnter").prop("checked")) { 
		// 全选
        $("input[type='checkbox'][name='exportInfosNotEnter']").prop("checked",true);
    } else { 
    	// 取消全选     
        $("input[type='checkbox'][name='exportInfosNotEnter']").prop("checked",false);
    }  
}

//未入格导出
$("#exportSecondGridInfoNotEnter").on("click", exportSecondGridInfoNotEnter);
function exportSecondGridInfoNotEnter() {
	var gridInfos = [];
	// 循环遍历复选框的值
	$.each($('input[name="exportSecondInfosNotEnter"]:checked'),function(i){
		gridInfos[i] = $(this).val();
    });
	// 判断是否有选择基础单元信息，没有选择则提示选择
	if(null == gridInfos || gridInfos.length == 0 || undefined == gridInfos) {
		messageAlert("请选择要导出的基础单元!");
	} else {
		// 拼接到一个text标签中
		var  orgId = $("#hiddenOrgId").val();
		var orgLevel=$("#hiddenOrgLevel").val();
		var html = "<input type='text' value='" + gridInfos +"' name='gridInfos' />";
		html += "<input type='text' value='" + orgId + "' name='orgId' />";
		html += "<input type='text' value='" + orgLevel + "' name='orgLevel' />";
		// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
		$('<form method="POST" action="' + $.cxt + '/map/exportGridInfoNotEnter">' + html + '</form>').appendTo('body').submit().remove();
	}
}

//网格导出功能
$("#exportGridInfo").on("click", exportGridInfo);
function exportGridInfo() {
	var gridInfos = [];
	var gridCode = $("#gridInfos option:selected").val();
	var gridName = $("#gridInfos option:selected").text();
	// 循环遍历复选框的值
	$.each($('input[name="exportInfos"]:checked'),function(i){
		gridInfos[i] = $(this).val();
    });
	// 判断是否有选择基础单元信息，没有选择则提示选择
	if(null == gridInfos || gridInfos.length == 0 || undefined == gridInfos) {
		messageAlert("请选择要导出的基础单元!");
	} else {
		// 拼接到一个text标签中
		var  orgId = $("#hiddenOrgId").val();
		var orgLevel=$("#hiddenOrgLevel").val();
		var html = "<input type='text' value='" + gridInfos +"' name='gridInfos' />";
		html += "<input type='text' value='" + gridCode + "' name='gridCode' />";
		html += "<input type='text' value='" + gridName + "' name='gridName' />";
		html += "<input type='text' value='" + orgId + "' name='orgId' />";
		html += "<input type='text' value='" + orgLevel + "' name='orgLevel' />";
		// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
		$('<form method="POST" action="' + $.cxt + '/map/exportGridInfo01">' + html + '</form>').appendTo('body').submit().remove();
	}
}

//网格导出功能(未入格)
$("#exportGridInfoNotEnter").on("click", exportGridInfoNotEnter);
function exportGridInfoNotEnter() {
	var gridInfos = [];
	// 循环遍历复选框的值
	$.each($('input[name="exportInfosNotEnter"]:checked'),function(i){
		gridInfos[i] = $(this).val();
    });
	// 判断是否有选择基础单元信息，没有选择则提示选择
	if(null == gridInfos || gridInfos.length == 0 || undefined == gridInfos) {
		messageAlert("请选择要导出的基础单元!");
	} else {
		// 拼接到一个text标签中
		var  orgId = $("#hiddenOrgId").val();
		var orgLevel=$("#hiddenOrgLevel").val();
		var html = "<input type='text' value='" + gridInfos +"' name='gridInfos' />";
		html += "<input type='text' value='" + orgId + "' name='orgId' />";
		html += "<input type='text' value='" + orgLevel + "' name='orgLevel' />";
		// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
		$('<form method="POST" action="' + $.cxt + '/map/exportGridInfo01">' + html + '</form>').appendTo('body').submit().remove();
	}
}

// 直销人员导出模板
$("#exportDirectSaleInfo").on("click", exportDirectSaleInfo);
function exportDirectSaleInfo() {
	window.location.href = $.cxt + "/map/exportdirectuser";
}

// 直销人员信息导入
$("#improtDirectSaleInfo").on("click", improtDirectSaleInfo);
function improtDirectSaleInfo() {
	var param = {};
	// 提示没有选择文件
	if($("#directSaleFileDir").val() == "") {
  		messageAlert("请选择上传的数据文件");
  		return;
  	}
  	var fileExtension = $("#directSaleFileDir").val().split('.').pop().toLowerCase();
  	// 提示选择文件大小不能超过30M
  	if(getFileSize("directSaleFileDir") > 30) {
  		messageAlert("数据文件不能大于30M");
  		return;
  	}
  	// 提示选择文件类型
  	if(fileExtension != "xls") {
  		messageAlert("请选择2003版excel");
  		return;
  	}
	$("#upformDirDirectSale").submit();
	return;
}

// 直销人员信息导入后给出提示信息
function getJspDirectSale(msg) {
	messageAlert(msg);
}

// 直销经理查看
$("#directSaleViewBtn").on("click", directSaleViewBtn);
function directSaleViewBtn() {
	$('#modal-map-DSPM').modal('hide');
	$("#scaleModal").modal("show");
	var orgId = $("#hiddenOrgId").val();
	var colNames = [];
	var colModel = [];
	colNames = [
		'地市名称', '区县名称', '区县编码', '网格名称', '网格编码', '工号编码', '工号姓名', '归属渠道名称',
		'渠道8位编码', '归属渠道经度', '归属渠道纬度', '身份证号码', '性别', '参加移动直销工作时间', '移动电话', '直销员工号状态', '操作'
	];
	colModel = [
    	{name: 'CITY_NAME', align: 'center'},
    	{name: 'CNTY_NAME', align: 'center'},
    	{name: 'CNTY_ID', align: 'center'},
    	{name: 'GRID_NAME', align: 'center'},
    	{name: 'GRID_CODE', align: 'center'},
    	{name: 'OFFICE_ID', align: 'center'},
    	{name: 'NAME', align: 'center'},
    	{name: 'BELONG_CHNL_NAME', align: 'center'},
    	{name: 'BELONG_CHNL_CODE', align: 'center'},
    	{name: 'LNG', align: 'center'},
    	{name: 'LAT', align: 'center'},
    	{name: 'CUST_ID', align: 'center'},
    	{name: 'SEX', align: 'center'},
    	{name: 'WORK_DATE', align: 'center'},
    	{name: 'PHONE', align: 'center'},
    	{name: 'STATUS', align: 'center', formatter:
    		function(cellvalue, options, rowObject) {
    			if(rowObject.STATUS == 1) {
    				return "启用";
    			} else if(rowObject.STATUS == 2) {
    				return "冻结";
    			} else {
    				return "废止";
    			}
    		}
    	},
    	{name: 'OPTION',  align: 'center',editable: true, formatter: 
    		function(cellvalue, options, rowObject) {
	    		if(rowObject.STATUS == 1) {
	    			var temp = "<a style='cursor:hand' onclick=\"modifyStatusInfo('" + rowObject.OFFICE_ID + "', '2')\">冻结</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a style='cursor:hand' onclick=\"modifyStatusInfo('" + rowObject.OFFICE_ID + "', '3')\">废止</a>";
	        		return temp;
				} else if(rowObject.STATUS == 2) {
					var temp = "<a style='cursor:hand' onclick=\"modifyStatusInfo('" + rowObject.OFFICE_ID + "', '1')\">启用</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a style='cursor:hand' onclick=\"modifyStatusInfo('" + rowObject.OFFICE_ID + "', '3')\">废止</a>";
					return temp;
				} else {
					return "已废止";
				}
    		}
    	}
	];
	$('#scaleTable').GridUnload();
	$('#scaleTable').jqGrid({
		url: $.cxt + "/map/getDirectSaleInfo",
		datatype: "json",
		mtype: "POST",
		postData: {orgId: orgId},
		height: 240,
		autowidth: false,
		width: 670,
		colNames: colNames,
		colModel: colModel,
		shrinkToFit: false,
		autoScroll: true,
		viewrecords: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager : '#grid-pager4',
		loadComplete: topjqGridLoadComplete,
		gridComplete : setNiceScroll
	});
	$('.ui-jqgrid-bdiv').getNiceScroll().show();
	$('.ui-jqgrid-bdiv').getNiceScroll().resize();
}

// 修改直销经理状态
function modifyStatusInfo(officeId, statusType) {
	$.ajax({
		url: $.cxt + "/map/updateDirectSaleStatus",
		data: {officeId: officeId, statusType: statusType},
		type: "POST",
		success: function(data) {
			$("#scaleTable").trigger("reloadGrid");
		}
	});
}

// 控制弹出框滚动条样式
var setNiceScroll = function(id){
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight: $(window).height()-190,
	    cursorcolor: "#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
	$('.ui-jqgrid-bdiv').getNiceScroll().show();
	$('.ui-jqgrid-bdiv').getNiceScroll().resize();
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

//CD类政企客户导出模板
$("#exportGovBusInfo").on("click", exportGovBusInfo);
function exportGovBusInfo() {
	window.location.href = $.cxt + "/map/exportdirectuser01";
}

//CD类政企客户信息导入
$("#improtGovBusInfo").on("click", improtGovBusInfo);
function improtGovBusInfo() {
	var param = {};
	// 提示没有选择文件
	if($("#govBusFileDir").val() == "") {
  		messageAlert("请选择上传的数据文件");
  		return;
  	}
  	var fileExtension = $("#govBusFileDir").val().split('.').pop().toLowerCase();
  	// 提示选择文件大小不能超过30M
  	if(getFileSize("govBusFileDir") > 30) {
  		messageAlert("数据文件不能大于30M");
  		return;
  	}
  	// 提示选择文件类型
  	if(fileExtension != "xls") {
  		messageAlert("请选择2003版excel");
  		return;
  	}
	$("#upformDirGovBus").submit();
	return;
}

//CD类政企客户查看
$("#govBusViewBtn").on("click", govBusViewBtn);
function govBusViewBtn() {
	$('#modal-map-CD').modal('hide');
	$("#govBusModal").modal("show");
	var orgId = $("#hiddenOrgId").val();
	var colNames = [];
	var colModel = [];
	colNames = [
		'地市名称', '区县名称', '区县编码', '网格名称', '网格编码', 'CD类政企客户名称', 'CD类政企客户编码', '地址',
		'联系人', '联系电话', '经度', '纬度'
	];
	colModel = [
    	{name: 'CITY_NAME', align: 'center'},
    	{name: 'CNTY_NAME', align: 'center'},
    	{name: 'CNTY_ID', align: 'center'},
    	{name: 'GRID_NAME', align: 'center'},
    	{name: 'GRID_CODE', align: 'center'},
    	{name: 'GC_NAME', align: 'center'},
    	{name: 'GC_CODE', align: 'center'},
    	{name: 'ADDR', align: 'center'},
    	{name: 'MANAGER', align: 'center'},
    	{name: 'PHONE', align: 'center'},
    	{name: 'LON', align: 'center'},
    	{name: 'LAT', align: 'center'},
	];
	$('#govBusTable').GridUnload();
	$('#govBusTable').jqGrid({
		url: $.cxt + "/map/getGovBusInfo",
		datatype: "json",
		mtype: "POST",
		postData: {orgId: orgId},
		height: 240,
		autowidth: false,
		width: 670,
		colNames: colNames,
		colModel: colModel,
		shrinkToFit: false,
		autoScroll: true,
		viewrecords: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager : '#grid-pager7',
		loadComplete: topjqGridLoadComplete,
		gridComplete : setNiceScroll
	});
	$('.ui-jqgrid-bdiv').getNiceScroll().show();
	$('.ui-jqgrid-bdiv').getNiceScroll().resize();
}

$("#directSaleMaintainBtn").on("click", modifydirectSaleInfo);
//弹出维护直销经理信息窗口
function modifydirectSaleInfo() {
	$('#modal-map-DSPM').modal('hide');
	$("#modifyModal").modal("show");
//	$("#citySelect").empty();
//	$("#citySelect").append("<option value='雨花区' selected='selected'>雨花区</option>");
	queryDirectSaleInfo();
	
}

////根据条件查询直销人员
//function queryDirectSaleInfo(orgId) {
//	var inGrid = $('input:radio[name="gridSelect"]:checked').val();
//	var city = $("#citySelect").val();
//	var cnty = $("#cntySelect").val();
//	
//	var colNames = [];
//	var colModel = [];
//	colNames = [
//		'地市名称', '区县名称', '区县编码', '网格名称', '网格编码', '工号编码', '工号姓名', '归属渠道名称',
//		'渠道8位编码', '归属渠道经度', '归属渠道纬度', '身份证号码', '性别', '参加移动直销工作时间', '移动电话', '直销员工号状态'
//	];
//	colModel = [
// 	{name: 'CITY_NAME', align: 'center'},
// 	{name: 'CNTY_NAME', align: 'center'},
// 	{name: 'CNTY_ID', align: 'center'},
// 	{name: 'GRID_NAME', align: 'center'},
// 	{name: 'GRID_CODE', align: 'center'},
// 	{name: 'OFFICE_ID', align: 'center'},
// 	{name: 'NAME', align: 'center'},
// 	{name: 'BELONG_CHNL_NAME', align: 'center'},
// 	{name: 'BELONG_CHNL_CODE', align: 'center'},
// 	{name: 'LNG', align: 'center'},
// 	{name: 'LAT', align: 'center'},
// 	{name: 'CUST_ID', align: 'center'},
// 	{name: 'SEX', align: 'center'},
// 	{name: 'WORK_DATE', align: 'center'},
// 	{name: 'PHONE', align: 'center'},
// 	{name: 'STATUS', align: 'center', formatter:
// 		function(cellvalue, options, rowObject) {
// 			if(rowObject.STATUS == 1) {
// 				return "启用";
// 			} else if(rowObject.STATUS == 2) {
// 				return "冻结";
// 			} else {
// 				return "废止";
// 			}
// 		}
// 	}
//	];
//	
//	$('#modifyTable').GridUnload();
//	$('#modifyTable').jqGrid({
//		url: $.cxt + "/map/getDirectSaleInfoByParam?ingrid="+inGrid+"&orgid="+$("#hiddenOrgId").val(),
//		datatype: "json",
//		mtype: "POST",
//		postData: {},
//		height: 240,
//		autowidth: false,
//		width: 850,
//		colNames: colNames,
//		colModel: colModel,
//		shrinkToFit: false,
//		autoScroll: true,
//		viewrecords: true,
//		rowNum: 10,
//		rowList: [ 10, 20, 30 ],
//		multiselect:true,
//		pager : '#grid-pager5',
//		loadComplete: topjqGridLoadComplete,
//		gridComplete : function() {
//			$("#modifyTable").niceScroll({
//				cursorheight: $(window).height()-190,
//			    cursorcolor: "#5cd4f8",
//			    cursorborder: "1px solid #5cd4f8",
//			    touchbehavior: false,
//			    spacebarenabled: true,
//			    railoffset: false
//			});
//			$('.ui-jqgrid-bdiv').getNiceScroll().show();
//			$('.ui-jqgrid-bdiv').getNiceScroll().resize();
//		}
//	});
//	
//}

//点击维护中的更新渠道
function selectChannel() {
	var ids=$('#modifyTable').jqGrid('getGridParam','selarrrow');
	if(ids == null || ids.length == 0){
		messageAlert("请先选择要更新渠道的人员！");
		return;
	}
	var selectedOfficeids = new Array();
	for (var i = 0; i < ids.length; i++) {
		selectedOfficeids.push($('#modifyTable').jqGrid('getRowData',ids[i]).OFFICE_ID);
	}
	$("#selectedOfficeids").val(selectedOfficeids);
	$("#channelSelectModal").modal("show");
	var colNames = [];
	var colModel = [];
	colNames = ['渠道名称', '渠道编码'];
	colModel = [
 	{name: 'CHNL_NAME', align: 'center'},
 	{name: 'CHNL_CODE', align: 'center'}
	];
	
	$('#channelSelectTable').GridUnload();
	$('#channelSelectTable').jqGrid({
		url: $.cxt + "/map/selectChannelByOrgid?orgid="+$("#hiddenOrgId").val(),
		datatype: "json",
		mtype: "POST",
		postData: {},
		height: 240,
		autowidth: true,
		width: 500,
		colNames: colNames,
		colModel: colModel,
		shrinkToFit: false,
		autoScroll: true,
		viewrecords: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		multiselect:true,
		pager : '#grid-pager6',
		loadComplete: topjqGridLoadComplete,
		gridComplete : setNiceScroll
	});
}

//在选择网格中点击确定
function sureSelectGrid() {
	var ids=$('#channelSelectTable').jqGrid('getGridParam','selarrrow');
	if(ids == null || ids.length > 1 || ids.length == 0){
		messageAlert("必须且只能选择一个渠道！");
		return;
	}
	alert($('#channelSelectTable').jqGrid('getRowData',ids[0]).CHNL_NAME);
	alert($('#channelSelectTable').jqGrid('getRowData',ids[0]).CHNL_CODE);
	$.ajax({
		url: $.cxt + "/map/updateDirectSaleChannel",
		data: {
			CHNL_NAME:$('#channelSelectTable').jqGrid('getRowData',ids[0]).CHNL_NAME,
			CHNL_CODE:$('#channelSelectTable').jqGrid('getRowData',ids[0]).CHNL_CODE,
			officeids:$("#selectedOfficeids").val()
			},
		type: "POST",
		success: function(data) {
			//queryDirectSaleInfo();
			$("#channelSelectModal").modal("hide");
			$("#modifyTable").trigger("reloadGrid");
		}
	});
}


$("#govBusMaintainBtn").on("click", modifyGovBusInfo);
//弹出维护CD类政企客户信息窗口
function modifyGovBusInfo() {
	$('#modal-map-CD').modal('hide');
	$("#modifyCDModal").modal("show");
//	$("#citySelect").empty();
//	$("#citySelect").append("<option value='雨花区' selected='selected'>雨花区</option>");
	queryGovBusInfo();
}

//根据条件查询CD类政企客户
function queryGovBusInfo() {
	var inGrid = $('input:radio[name="grid"]:checked').val();
	var city = $("#citySelect").val();
	var cnty = $("#cntySelect").val();
	var colNames = [];
	var colModel = [];
	colNames = [
		'地市名称', '区县名称', '区县编码', '网格名称', '网格编码', 'CD类政企客户名称', 'CD类政企客户编码', '地址',
		'联系人', '联系电话', '经度', '纬度'
		
	];
	colModel = [
 	{name: 'CITY_NAME', align: 'center'},
 	{name: 'CNTY_NAME', align: 'center'},
 	{name: 'CNTY_ID', align: 'center'},
 	{name: 'GRID_NAME', align: 'center'},
 	{name: 'GRID_CODE', align: 'center'},
 	{name: 'GC_NAME', align: 'center'},
 	{name: 'GC_CODE', align: 'center'},
 	{name: 'ADDR', align: 'center'},
 	{name: 'MANAGER', align: 'center'},
 	{name: 'PHONE', align: 'center'},
 	{name: 'LON', align: 'center'},
 	{name: 'LAT', align: 'center'}
	];
	
	$('#modifyCDTable').GridUnload();
	$('#modifyCDTable').jqGrid({
		url: $.cxt + "/map/getGovBusInfoByParam?ingrid="+inGrid+"&orgId="+$("#hiddenOrgId").val(),
		datatype: "json",
		mtype: "POST",
		postData: {},
		height: 240,
		autowidth: false,
		width: 850,
		colNames: colNames,
		colModel: colModel,
		shrinkToFit: false,
		autoScroll: true,
		viewrecords: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		multiselect:true,
		pager : '#grid-pager8',
		loadComplete: topjqGridLoadComplete,
		gridComplete : function() {
			$("#modifyCDTable").niceScroll({
				cursorheight: $(window).height()-190,
			    cursorcolor: "#5cd4f8",
			    cursorborder: "1px solid #5cd4f8",
			    touchbehavior: false,
			    spacebarenabled: true,
			    railoffset: false
			});
			$('.ui-jqgrid-bdiv').getNiceScroll().show();
			$('.ui-jqgrid-bdiv').getNiceScroll().resize();
		}
	});	
}

//点击维护中的导入网格
function selectCDGrid() {
	var ids=$('#modifyCDTable').jqGrid('getGridParam','selarrrow');
	if(ids == null || ids.length == 0){
		messageAlert("请先选择要指派网格的人员！");
		return;
	}
	var selectedGcCodes = new Array();
	for (var i = 0; i < ids.length; i++) {
		selectedGcCodes.push($('#modifyCDTable').jqGrid('getRowData',ids[i]).GC_CODE);
	}
	$("#selectedGcCodes").val(selectedGcCodes);
	$("#cdGridSelectModal").modal("show");
	var colNames = [];
	var colModel = [];
	colNames = ['网格名称', '网格编码'];
	colModel = [
 	{name: 'NAME', align: 'center'},
 	{name: 'ORGID', align: 'center'}
	];
	
	$('#cdGridSelectTable').GridUnload();
	$('#cdGridSelectTable').jqGrid({
		url: $.cxt + "/map/selectGridByOrgid?orgid="+$("#hiddenOrgId").val(),
		datatype: "json",
		mtype: "POST",
		postData: {},
		height: 240,
		autowidth: false,
		width: 600,
		colNames: colNames,
		colModel: colModel,
		shrinkToFit: false,
		autoScroll: true,
		viewrecords: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		multiselect:true,
		pager : '#grid-pager9',
		loadComplete: topjqGridLoadComplete,
		gridComplete : setNiceScroll
	});
}

//CD类维护中在选择网格中点击确定
function cdSureSelectGrid() {
	var ids=$('#cdGridSelectTable').jqGrid('getGridParam','selarrrow');
	if(ids == null || ids.length > 1 || ids.length == 0){
		messageAlert("必须且只能选择一个网格！");
		return;
	}
	$.ajax({
		url: $.cxt + "/map/addGovBusGrid",
		data: {
			GRID_NAME:$('#cdGridSelectTable').jqGrid('getRowData',ids[0]).NAME,
			GRID_CODE:$('#cdGridSelectTable').jqGrid('getRowData',ids[0]).ORGID,
			gcCodes:$("#selectedGcCodes").val()
			},
		type: "POST",
		success: function(data) {
			//queryDirectSaleInfo();
			$("#cdGridSelectModal").modal("hide");
			$("#modifyCDTable").trigger("reloadGrid");
		}
	});
}

//CD类点击维护中的删除网格
function deleteCDGrid() {
	var ids=$('#modifyCDTable').jqGrid('getGridParam','selarrrow');
	if(ids == null || ids.length == 0){
		messageAlert("请先选择要删除网格的人员！");
		return;
	}
	var gcCodes = new Array();
	
	for (var i = 0; i < ids.length; i++) {
		gcCodes.push($('#modifyCDTable').jqGrid('getRowData',ids[i]).GC_CODE);
	}
	
	if(confirm("确认移出这些人员的网格吗？")){
		$.ajax({
			url: $.cxt + "/map/removeGovBusGrid?oids="+gcCodes,
			data: { 
					
				  },
			type: "POST",
			success: function(data) {
				if(data == "0"){
					$("#modifyCDTable").trigger("reloadGrid");
				}
				else {
					alert("移除失败，请重试！");
				}
			}
		});
	}
}

