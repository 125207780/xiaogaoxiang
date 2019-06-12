$(function() {
//	$('#modal-map-DSPM').modal('show');
//	$("#modifyModal").modal("hide");
	$("#hiddenOrgId").val(nowOrgId);
	directSaleViewBtn();
});

//直销人员导出模板
$("#exportDirectSaleInfo").on("click", exportDirectSaleInfo);
function exportDirectSaleInfo() {
	window.location.href = $.cxt + "/map/exportdirectuser";
}

//直销人员信息导入
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
	$("#viewTable").css("display", "block");
	$("#whTable").css("display", "none");
	$("#directSaleViewBtn").css("display", "none");
	$("#directSaleMaintainBtn").css("display", "block");
	var orgId = $("#hiddenOrgId").val();
	var colNamesData = [];
	var colModelData = [];
	colNamesData = [
		'地市名称', '区县名称', '区县编码', '网格名称', '网格编码', '工号编码', '工号姓名', '归属渠道名称',
		'渠道8位编码', '归属渠道经度', '归属渠道纬度', '身份证号码', '性别', '参加移动直销工作时间', '移动电话', '直销员工号状态', '操作'
	];
	colModelData = [
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
	var heightB = $(window).height() - $("#scaleTable").offset().top - 126;
	var width = $(window).width()*0.9;
	$('#scaleTable').jqGrid({
		url: $.cxt + "/map/getDirectSaleInfo",
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: '90%',
		autowidth: true,
		postData: {orgId: orgId},
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 15,
		rowList: [ 15, 20, 30 ],
		pager: '#grid-pager4',
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

// 修改直销经理状态
function modifyStatusInfo(officeId, statusType) {
	if("3" == statusType) {
		bootbox.confirm({
			message: "<span style=\"color:red\">请确定是否废止员工信息！该操作不可逆转！</span>",
			title: "消息提示",
			buttons: {
				confirm: {
					label: "确定",
					className: "btn-success"
				},
				cancel: {
					label: "取消",
					className: "btn-cancle"
				}
			},
			callback: function(result) {
				if(result) {
					$.ajax({
						url: $.cxt + "/map/updateDirectSaleStatus",
						data: {officeId: officeId, statusType: statusType},
						type: "POST",
						async: false,
						success: function(data) {
							$("#scaleTable").trigger("reloadGrid");
						}
					});
				} else {
					return;
				}
			}
		});
	} else {
		$.ajax({
			url: $.cxt + "/map/updateDirectSaleStatus",
			data: {officeId: officeId, statusType: statusType},
			type: "POST",
			async: false,
			success: function(data) {
				$("#scaleTable").trigger("reloadGrid");
			}
		});
	}
}

$("#directSaleMaintainBtn").on("click", modifydirectSaleInfo);
// 弹出维护直销经理信息窗口
function modifydirectSaleInfo() {
	$("#viewTable").css("display", "none");
	$("#whTable").css("display", "block");
	$("#directSaleViewBtn").css("display", "block");
	$("#directSaleMaintainBtn").css("display", "none");
	queryDirectSaleInfo();
}

// 根据条件查询直销人员
function queryDirectSaleInfo() {
	var inGrid = $('input:radio[name="gridSelect"]:checked').val();
	var city = $("#citySelect").val();
	var cnty = $("#cntySelect").val();
	
	var colNamesData = [];
	var colModelData = [];
	colNamesData = [
		'地市名称', '区县名称', '区县编码', '网格名称', '网格编码', '工号编码', '工号姓名', '归属渠道名称',
		'渠道8位编码', '归属渠道经度', '归属渠道纬度', '身份证号码', '性别', '参加移动直销工作时间', '移动电话', '直销员工号状态'
	];
	colModelData = [
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
	}
	];
	$('#modifyTable').GridUnload();
	var heightB = $(window).height() - $("#modifyTable").offset().top - 126;
	var width = $(window).width()*0.9;
	$('#modifyTable').jqGrid({
		url: $.cxt + "/map/getDirectSaleInfoByParam?ingrid="+inGrid,
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: '90%',
		autowidth: true,
		postData: {},
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		multiselect: true,
		autoScroll: true,
		rowNum: 15,
		rowList: [ 15, 20, 30 ],
		pager: '#grid-pager5',
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

// 点击维护中的更新渠道
function selectChannel() {
	var ids = $('#modifyTable').jqGrid('getGridParam','selarrrow');
	if(ids == null || ids.length == 0){
		messageAlert("请先选择要更新渠道的人员！");
		return;
	}
	var selectedOfficeids = new Array();
	for (var i = 0; i < ids.length; i++) {
		selectedOfficeids.push($('#modifyTable').jqGrid('getRowData',ids[i]).OFFICE_ID);
	}
	var selectedCntyIds = new Array();
	for (var i = 0; i < ids.length; i++) {
		selectedCntyIds.push($('#modifyTable').jqGrid('getRowData',ids[i]).CNTY_ID);
	}
	var cntyIds = selectedCntyIds.join(","); 
	$("#selectedOfficeids").val(selectedOfficeids);
	$("#channelSelectModal").modal("show");
	var colNamesData = [];
	var colModelData = [];
	colNamesData = ['渠道名称', '渠道编码'];
	colModelData = [
		{name: 'CHNL_NAME', align: 'center'},
		{name: 'CHNL_CODE', align: 'center'}
	];
	$('#channelSelectTable').GridUnload();
	var heightB = 440 - $("#channelSelectTable").offset().top - 150;
	$('#channelSelectTable').jqGrid({
		url: $.cxt + "/map/selectChannelByOrgid",
		datatype: "json",
		mtype: "POST",
		height: heightB,
		autowidth: true,
		postData: {cntyIds: cntyIds},
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		multiselect: true,  
		multiboxonly:true, 
		rowNum: 15,
		rowList: [ 15, 20, 30 ],
		pager: '#grid-pager6',
		jsonReader: {
			repeatitems : false
		},
		gridComplete: hideSelectAll,
		beforeSelectRow: beforeSelectRow,
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
	// 将列表th和列表的td宽度做适配
	softThWidth();
}

//在选择网格中点击确定
function sureSelectGrid() {
	var ids=$('#channelSelectTable').jqGrid('getGridParam','selarrrow');
	if(ids == null || ids.length > 1 || ids.length == 0){
		messageAlert("必须且只能选择一个渠道！");
		return;
	}
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

//滚动条样式
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

//将头部的复选框隐藏
function hideSelectAll() {  
 $("#cb_channelSelectTable").hide();  
 return(true);  
} 

//将列表的复选框设置为单选
function beforeSelectRow() {  
 $("#channelSelectTable").jqGrid('resetSelection');  
 return(true);  
}  

//判断文件大小
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