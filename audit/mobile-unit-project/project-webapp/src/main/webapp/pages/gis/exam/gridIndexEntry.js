var selectArr=[];
$(function(){
	initTable();
	initOption();
	$("#searchList").click(function() {
		doSearch();
	});
	$("#myModal1Close").click(function() {
		$('#myModal1').modal('hide');
	});
	$("#myModalClose").click(function() {
		$('#myModal').modal('hide');
	});
	$("#reset").click(function() {
		$("#girdIndex").val('');
		initOption();
		doSearch();
	});
	$("#delete").click(function() {
		
		doDelete();
	});
	$("#submit").click(function() {
		doSubmit();
	});
	$("#improtexcel").click(function() {
		$('#myModal1').modal('hide');
		importVal();
	});
	$("#download").click(function() {
		downLoad();
	});
	initRemind();
	$('#kpiFile').ace_file_input({
		no_file:'没有文件 ...',
		btn_choose:'选择',
		btn_change:'转换',
		droppable:false,
		onchange:null,
		thumbnail:false // | true | large
		// whitelist:'gif|png|jpg|jpeg'
		// blacklist:'exe|php'
		// onchange:''
		//
	});
});

// 初始化表格
function initTable() {
	$("#gridInfoListGrid").jqGrid('clearGridData');
	$("#gridInfoListGrid").jqGrid({ 
		url: $.cxt + "/firstPage/getindexEnryTable",
		datatype: "json",
		mtype: "POST",
		postData: {orgId: orgId},
		autowidth: true,
		height: "auto",
		colNames: [ '周期类型', '指标分类', '指标名称', '指标定义', '权重' ,'UUID', 'STATUS', 'ORG_ID' ], 
		colModel: [ 
			{ name: 'CYCLE_TYPE', index: 'CYCLE_TYPE', align: 'center', formatter: parseData}, 
			{ name: 'KPI_TYPE', index: 'KPI_TYPE', align: 'center'}, 
			{ name: 'KPI_NAME', index: 'KPI_NAME', align: 'center'}, 
			{ name: 'KPI_DEFINE', index: 'KPI_DEFINE', align: 'center'}, 
			{ name: 'KPI_WEIGHT', index: 'KPI_WEIGHT', align: 'center'},
			{ name: 'KPI_ID', index: 'KPI_ID',  align: 'center',  hidden: true}, 
			{ name: 'STATUS', index: 'STATUS',  align: 'center',  hidden: true}, 
			{ name: 'ORG_ID', index: 'ORG_ID',  align: 'center',  hidden: true}
		], 
		// shrinkToFit:false,
		multiselect: true,
		// autoScroll: true,
		viewrecords: true,
		// rownumbers: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#gridInfoListPagers',
		loadComplete: topjqGridLoadComplete,
		gridComplete: function() {
			var _this = this;
			var rowData = $(_this).jqGrid('getRowData');
		    for(var i = 0, n = rowData.length; i < n; i++) {
		    	var obj = rowData[i];
		    	// var rowData = $("#idx_table").jqGrid('getRowData',rowId);
		    	if(selectArr[obj.KPI_ID]) {
		    		 $(_this).jqGrid('setSelection', i + 1, false);
		    	}
		    }
		},
		// 这里和beforeSelectRow()俩个函数，一起组合让jqGrid表格单选，
		onSelectRow: function(rowid, state, e) {
			var obj = $(this).jqGrid('getRowData', rowid);
		    if(state) {
		    	selectArr[obj.KPI_ID] = obj;
		    } else {
		    	if(selectArr[obj.KPI_ID]) {
		    		delete selectArr[obj.KPI_ID];
		    	} 
		    }
		},
		onSelectAll: function(aRowids, status) {
            var _this = this;
            var rowData = $(_this).jqGrid('getRowData');
            for(var i = 0, n = rowData.length; i < n; i++) {
            	var obj = rowData[i];
            	if(status) {
            		selectArr[obj.KPI_ID] = obj;
	            } else {
	            	if(selectArr[obj.KPI_ID]) {
	            		delete  selectArr[obj.KPI_ID];
			    	} 
	            }    
            }
                   
        },
	}); 
	// 查询按钮
}

// 初始化下拉框的值
function initOption() {
	$("#girdDateType").empty();
	$("#girdDateType").append($("<option value=''>" + '请选择...' + "</option>")).append(
		$("<option value=month>" + "月" + "</option>")
	).append(
		$("<option value=quarter>" + '季' + "</option>")
	).append(
		$("<option value=year>" + '年' + "</option>")
	);
	$("#girdStatus").empty();
	$("#girdStatus").append($("<option value=''>" + '请选择...' + "</option>")).append(
		$("<option value=A>" + "未录入" + "</option>")
	).append(
		$("<option value=F>" + '已录入' + "</option>")
	).append(
		$("<option value=P>" + '已驳回' + "</option>")
	);
}

// 查询方法
function doSearch() {
	selectArr = [];
	var date = $("#girdDateType").val() ? $("#girdDateType").val() : '';
	var name = $.trim($("#girdIndex").val()) ? $.trim($("#girdIndex").val()) : '';
	var status = $("#girdStatus").val() ? $("#girdStatus").val() : '';
	$("#gridInfoListGrid").jqGrid("setGridParam",{
		url: $.cxt + "/firstPage/getReloadTable",
		datatype: "json",
		postData: {"orgId": orgId, "date": date, "name": name, "status": status},
	}).trigger('reloadGrid');
}

// 删除方法
function doDelete() {
	
	var isEmpty = $.isEmptyObject(selectArr);
	if(isEmpty) {
		messageAlert("至少选择一条数据");
		return false;
	}
	var KPI_ID = '';
	for(var key in selectArr) {
		var rowData = selectArr[key];
		if(rowData.STATUS == 'A') {
			KPI_ID += rowData.KPI_ID + ",";
		} else {
			KPI_ID = '';
			messageAlert("有不符合条件的数据，请重新选择");
			return false;
		}
	}
	KPI_ID=KPI_ID.substring(0, KPI_ID.length-1);
	$.ajax({
		url: $.cxt + "/firstPage/getDeleteTable",
		type: "POST",
		data: {
			orgId: orgId,
			KPI_ID: KPI_ID
		},
		async: false,
		success: function(json) {
			var data = JSON.parse(json);
			if(data.code == '0') {
				doSearch();
				messageAlert("删除成功");
			}
		}
	});
	KPI_ID = '';
}

// 提交方法
function doSubmit() {
	var KPI_ID = '';
	var isEmpty = $.isEmptyObject(selectArr);
	if(isEmpty) {
		messageAlert("至少选择一条数据");
		return false;
	}	
	for(var key in selectArr) {
		var rowData = selectArr[key];
		if(rowData.STATUS == 'A' || rowData.STATUS == 'P') {
			KPI_ID += rowData.KPI_ID + ",";
		} else {
			KPI_ID = '';
			messageAlert("所选择的数据不符合条件");
			return false;
		}
	}
	KPI_ID = KPI_ID.substring(0, KPI_ID.length - 1);
	$.ajax({
		url: $.cxt + "/firstPage/getOnlyUpdate",
		type: "POST",
		data: {
			orgId: orgId,
			KPI_ID: KPI_ID
		},
		async: false,
		success: function(json) {
			var data = JSON.parse(json);
			if(data.code == '0') {
				$("#gridInfoListGrid").jqGrid("setGridParam", {
					url: $.cxt + "/firstPage/getindexEnryTable",
					datatype: "json",
					postData: {"orgId": orgId},
				}).trigger('reloadGrid');
				messageAlert("提交成功");
			}
		}
	});
}

// 信息提示框
function messageAlert(message) {
	bootbox.dialog({
        message: "<span style=\"color:#000\">" + message + "</span>",
        title: "消息提示",
        buttons: {
            OK: {
                label: "确定",
                className: "btn-success",
            }
        }
    });
}

// 初始化方法
function initRemind() {
	$.ajax({
		url: $.cxt + "/firstPage/getRemindName",
		type: "POST",
		data: {
			orgId: orgId,
		},
		async: false,
		success: function(json) {
			var data = JSON.parse(json)
			if(data.code == '0') {
				var list = data.data;
				$("#modelbody").empty();
				for(var i = 0; i < list.length; i++) {
					var html = "<span style='color: #fff;'>指标名称：" + list[i].CONTENT + "</span><br>"
					$("#modelbody").append(html);
				}
			}
		}
	});
}

// 导入
function importVal() {
	var param = {};
	if($("#kpiFile").val() == "") {
		messageAlert("请选择上传的数据文件");
		return;
	}
	var fileExtension = $("#kpiFile").val().split('.').pop().toLowerCase();
    if(getFileSize("kpiFile") > 31457280) {
		messageAlert("数据文件不能大于300M"); 
		return;
	}
	if(fileExtension != "xls") {
		messageAlert("请选择2003版excel"); 
		return ;
	}
    $("#upform").submit();
 	return;
}

// 定义文件大小
function getFileSize(eleId) {
	  
	var dom = document.getElementById(eleId);  
	try {  
		return dom.files.item(0).fileSize;  
	} catch (e) {  
		try {  
			var img = new Image();  
			img.src = dom.value;  
			img.style.display = 'none';  
			document.body.appendChild(img);  
 			setTimeout(function() {  
				document.body.removeChild(img);  
			},1000);  
			return img.fileSize;  
		} catch (e) {  
			return -1;  
		}  
	}
}

// 下载方法
function downLoad() {
	// 通过form表单方式进行提交。避免url被改变。提交完成后调用remove()将form表单移除
	$('<form method="POST" action="' + $.cxt + '/firstPage/exportExcel"></form>').appendTo('body').submit().remove();
}

// 设置下拉框数据
function parseData(cellValue, options, rowObject) {
	if('month' == cellValue) {
		return '月';
	}
	if('year' == cellValue) {
		return '年';
	}
	if('quarter' == cellValue) {
		return '季度';
	}
	return cellValue;
}