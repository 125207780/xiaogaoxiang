$(function() {
	$('#grid-table').jqGrid({//加载表格
		url : $.cxt + "/sysmenu/selectpagelist",
		datatype : "json",
		mtype : "POST",
		height : topjqGridHeight(),
		autowidth : true,
		colNames : [ '菜单id', '菜单名称','菜单url','菜单级别','排序','状态编码','是否弹出','操作'],
		colModel : [ 
		      {name : 'menuId',hidden : true}, 
		      {name : 'menuName',align : 'center'}, 
		      {name : 'menuUrl',align : 'center', width : 500},
		      {name : 'menuLevel',align : 'center'},
		      {name : 'displayOrder',align : 'center'}, 
		      {name : 'state',hidden : true},
		      {name : 'menuAttr',align : 'center',formatter : function(cellvalue, options, cell){
		    	  if(cellvalue == '0') return '是';
		    	  if(cellvalue == '1') return '否';
		    	  else return '';
		      }},
		      {name : 'operation',align : 'center', formatter : renderOperation, width : 300}
		],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "菜单列表",
		loadComplete : topjqGridLoadComplete
	});
	reloadSysMenuTree();
	$("#searchList").click(function(){//查询按钮
		reloadJqGrid("search");
	});
	$("#createBtn").click(function(){//新建按钮
		showSysMenuForm();
	})
})
//格式化操作列
var renderOperation = function(cellvalue, options, cell) {
	var html = "";
	html += "<a onclick=\"showSysMenuForm('" + cell.menuId + "')\" href=\"#\">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a onclick=\"deleteSysMenu('" + cell.treeCode + "')\" href=\"#\">删除</a>&nbsp;&nbsp;&nbsp;&nbsp;"
	html += "<a onclick=\"updateState('" + cell.menuId + "')\" href=\"#\">" + cell.stateName + "</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	if(cell.menuUrl) {
		html += "<a onclick=\"doSysMenuOperation('" + cell.menuId + "')\" href=\"#\">添加权限</a>";
	}
	return html;
}
var doSysMenuOperation = function(menuId) {
	topwindow.showWindow({
		title : "添加权限",//窗口名称
		data : {menuId : menuId},//参数
		url : $.cxt + "/sysmenuoperation/showsysmenuoperationform",//url
	});
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
var reloadSysMenuTree = function() {
	$("#parentId").val("");//用于新增
	$("#treeCode").val("");//用于查询
	topgetSysMenuTreeDiv({//加载菜单
		id : "sysMenuTreeDiv",
		onClick : function(obj) {
			$("#parentId").val(obj.menuId);
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
var showSysMenuForm = function(menuId) {
	var obj = {};
	if(menuId == undefined) {
		obj.parentId = $("#parentId").val();
	} else {
		obj.menuId = menuId;
	}
	topwindow.showWindow({
		title : "菜单编辑",//窗口名称
		data : obj,//参数
		url : $.cxt + "/sysmenu/showsysmenuform",//url
		bottons : [{
			title : "确认",
			fun : function() {
				if(topcheckoutForm("sysMenuForm")){//校验，参数为表单父级id
					$.ajax({
						url : $.cxt + "/sysmenu/insertorupdatesysmenu", 
						data : topgetObjByObj($("#sysMenuForm .formField")),
						type: "POST",
						success : function(data) {
							reloadSysMenuTree();//要先重新加载树
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
var deleteSysMenu = function(treeCode) {
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/sysmenu/deletesysmenubytreecode", 
			data : {treeCode : treeCode},
			type: "POST",
			success : function(data) {
				reloadSysMenuTree();//要先重新加载树
				reloadJqGrid();//重新加载表格
				topshowAlertSuccessDiv();//操作提示
			}
		})
	})
}
var updateState = function(menuId) {
	topshowdialog("确认修改状态？", function(){
		$.ajax({
			url : $.cxt + "/sysmenu/updatestate", 
			data : {menuId : menuId},
			type: "POST",
			success : function(data) {
				reloadJqGrid();//重新加载表格
				topshowAlertSuccessDiv();//操作提示
			}
		})
	})
} 
