$(function() {
	$('#grid-table').jqGrid({//加载表格
		url : $.cxt + "/syscode/selectpagelist",
		datatype : "json",
		mtype : "POST",
		height : topjqGridHeight(),
		autowidth : true,
		colNames : [ 'id', '字典类型','字典key','字典value','级别','操作'],
		colModel : [ 
		      {name : 'id',hidden : true}, 
		      {name : 'codeType',align : 'center'},
		      {name : 'codeKey',align : 'center'}, 
		      {name : 'codeValue',align : 'center'},
		      {name : 'treeLevel',align : 'center'}, 
		      {name : 'operation',align : 'center', formatter : renderOperation}
		],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "字典列表",
		loadComplete : topjqGridLoadComplete
	});
	reloadSysCodeTree();
	$("#searchList").click(function(){//查询按钮
		reloadJqGrid("search");
	});
	$("#createBtn").click(function(){//新建按钮
		showSysCodeForm();
	})
})
//格式化最后一列
var renderOperation = function(cellvalue, options, cell) {
	var html = "";
	html += "<a onclick=\"showSysCodeForm('" + cell.id + "')\" href=\"#\">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a onclick=\"deleteSysCode('" + cell.treeCode + "')\" href=\"#\">删除</a>"
	return html;
}
//重新加载表格
var reloadJqGrid = function(flag) {
	if(flag == undefined) {
		topclear('gridSearch')//清空查询条件
	}
	$("#grid-table").jqGrid('setGridParam',{    
        postData : topgetObjByObj($("#gridSearch .searchField")),  
        page : 1    
    }).trigger("reloadGrid"); 
}
//加载树
var reloadSysCodeTree = function() {
	$("#parentId").val("");//用于新增
	$("#treeCode").val("");//用于查询
	topgetSysCodeTreeDiv({//加载菜单
		id : "sysCodeTreeDiv",
		onClick : function(obj) {
			$("#parentId").val(obj.id);
			$("#treeCode").val(obj.treeCode);
			reloadJqGrid();
		},
		clearClick : function() {
			$("#parentId").val("");
			$("#treeCode").val("");
			reloadJqGrid();
		}
	});
}
//弹出窗口
var showSysCodeForm = function(id) {
	var obj = {};
	if(id == undefined) {
		obj.parentId = $("#parentId").val();
	} else {
		obj.id = id;
	}
	topwindow.showWindow({
		title : "菜单编辑",//窗口名称
		data : obj,//参数
		url : $.cxt + "/syscode/showsyscodeform",//url
		bottons : [{
			title : "确认",
			fun : function() {
				if(topcheckoutForm("sysCodeForm")){//校验，参数为表单父级id
					$.ajax({
						url : $.cxt + "/syscode/insertorupdatesyscode", 
						data : topgetObjByObj($("#sysCodeForm .formField")),
						type: "POST",
						success : function(data) {
							reloadSysCodeTree();//要先重新加载树
							reloadJqGrid();//重新加载表格
							topwindow.removeWindow();//关闭窗口
							topshowAlertSuccessDiv();//操作提示
						}
					});
				}
			}
		}]
	});
}
var deleteSysCode = function(treeCode) {
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/syscode/deletesyscodebytreecode", 
			data : {treeCode : treeCode},
			type: "POST",
			success : function(data) {
				reloadSysCodeTree();//要先重新加载树
				reloadJqGrid();//重新加载表格
				topshowAlertSuccessDiv();//操作提示
			}
		})
	})
}
