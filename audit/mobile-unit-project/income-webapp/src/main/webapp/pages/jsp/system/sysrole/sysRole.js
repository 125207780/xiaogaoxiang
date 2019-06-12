$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/sysrole/selectpagelist",
		datatype : "json",
		mtype : "POST",
		height : topjqGridHeight(),
		autowidth : true,
		colNames : [ '角色ID', '角色名称','创建时间', '操作' ],
		colModel : [ 
		      {name : 'roleId',align : 'center',hidden : true}, 
		      {name : 'roleName',align : 'center'}, 
		      {name : 'createTime',align : 'center'}, 
		      {name : 'operation',align : 'center', formatter : operation}],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "角色信息列表",
		loadComplete : topjqGridLoadComplete
	});
	//查询按钮
	$("#searchBtn").click(function(){
		reloadJqGrid("search");
	});
	//新建按钮
	$("#createBtn").click(function(){
		showSysRoleForm();
	})
})
//格式化最后一列
var operation = function(cellvalue, options, cell) {
	var html = "<a onclick=\"showSysRoleForm('" + cell.roleId + "')\" href=\"#\">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a onclick=\"deleteSysRole('" + cell.roleId + "')\" href=\"#\">删除</a>&nbsp;&nbsp;&nbsp;&nbsp;"
	html += "<a onclick=\"showRoleMenu('" + cell.roleId + "')\" href=\"#\">分配权限</a>";
	return html;
}
//重新加载表格
var reloadJqGrid = function(flag) {
	if(flag == undefined) {
		//新增和修改的时候清空查询条件
		topclear('gridSearch')
	}
	$("#grid-table").jqGrid('setGridParam',{    
        postData : topgetObjByObj($("#gridSearch .searchField")),  
        page : 1    
    }).trigger("reloadGrid"); 
}
//弹出窗口
var showSysRoleForm = function(roleId) {
	topwindow.showWindow({
		//窗口名称
		title : "角色编辑",
		//参数
		data : {roleId : roleId},
		//url
		url : $.cxt + "/sysrole/showsysroleform",
		bottons : [{
			title : "确认",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("sysRoleForm")){
					$.ajax({
						url : $.cxt + "/sysrole/insertorupdatesysrole", 
						data : topgetObjByObj($("#sysRoleForm .formField")),
						type: "POST",
						success : function(data) {
							//重新加载表格
							reloadJqGrid();
							//关闭窗口
							topwindow.removeWindow();
							//操作提示
							topshowAlertSuccessDiv();
						}
					});
				}
			}
		}]
	});
}
var deleteSysRole = function(roleId) {
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/sysrole/deletesysrolebyid", 
			data : {roleId : roleId},
			type: "POST",
			success : function(data) {
				//重新加载表格
				reloadJqGrid();
				//操作提示
				topshowAlertSuccessDiv();
			}
		})
	})
}
var showRoleMenu = function(roleId) {
	topgetSysRoleMenuTreeWindow({
		roleId : roleId,
		width : 500,
		height : 500
	})
}