$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/sysuser/selectpagelist",
		datatype : "json",
		mtype : "POST",
		height : topjqGridHeight(),
		autowidth : true,
		colNames : [ '用户ID', '员工工号','姓名','性别', '联系方式', '所属机构', '操作' ],
		colModel : [ 
		      {name : 'userId',align : 'center',hidden : true}, 
		      {name : 'loginId',align : 'center'}, 
		      {name : 'userName',align : 'center'}, 
		      {name : 'userSexName',align : 'center'},
		      {name : 'userMobile',align : 'center'}, 
		      {name : 'orgName',align : 'center'}, 
		      {name : 'act',align : 'center', formatter : renderOperation}],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "用户信息列表",
		loadComplete : topjqGridLoadComplete
	});
	//查询按钮
	$("#searchUserList").click(function(){
		reloadJqGrid("search");
	});
	//新建按钮
	$("#createUserBtn").click(function(){
		showSysUserForm();
	})
})
//格式化最后一列
var renderOperation = function(cellvalue, options, cell) {
	var html = ""; 
	html += "<a top-do-role=\"update\" onclick=\"showSysUserForm('" + cell.userId + "')\" href=\"#\">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a top-do-role=\"delete\" onclick=\"deleteSysUser('" + cell.userId + "')\" href=\"#\">删除</a>&nbsp;&nbsp;&nbsp;&nbsp;"
	html += "<a top-do-role=\"delete\" onclick=\"showSysUserRoleForm('" + cell.userId + "')\" href=\"#\">分配角色</a>"
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
//角色分配弹出窗口
var showSysUserRoleForm = function(userId) {
	topwindow.showWindow({
		title : "角色分配",//窗口名称
		data : {userId : userId},//参数
		url : $.cxt + "/sysroleuser/showsysroleuserform",//url
		bottons : [{
			title : "确认",
			fun : function() {
				var roleIds = topgetRightByLeftAndRight("sysRoleUserForm");
				$.ajax({
					url : $.cxt + "/sysroleuser/insertsysroleuser", 
					data : {userId : userId, roleIds : roleIds},
					type: "POST",
					success : function(data) {
						topwindow.removeWindow();//关闭窗口
						topshowAlertSuccessDiv();//操作提示
					}
				});
			}
		}]
	});
}
//弹出窗口
var showSysUserForm = function(id) {
	topwindow.showWindow({
		//窗口名称
		title : "用户编辑",
		//参数
		data : {id : id},
		//url
		url : $.cxt + "/sysuser/showsysuserform",
		bottons : [{
			title : "确认",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("sysUserForm")){
					$.ajax({
						url : $.cxt + "/sysuser/insertorupdatesysuser", 
						data : topgetObjByObj($("#sysUserForm .formField")),
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
var deleteSysUser = function(id) {
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/sysuser/deletesysuserbyid", 
			data : {id : id},
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
