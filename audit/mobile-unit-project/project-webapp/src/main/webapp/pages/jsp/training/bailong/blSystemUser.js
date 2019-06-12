$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/testsysuser/testselectpagelist",		//获取数据的地址
		datatype : "json",			//从服务器端返回的数据类型 可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
		mtype : "POST",			//ajax提交方式。POST或者GET，默认GET
		height : topjqGridHeight(),
		autowidth : true,
		colNames : [ '用户ID', '员工工号','姓名','性别', '联系方式', '所属机构', '操作' ],			//数组  列显示名称
		colModel : [ 
		      {name : 'userId',align : 'center',hidden : true},			//常用到的属性：name 列显示的名称；index 传到服务器端用来排序用的列名称
		      {name : 'loginId',align : 'center'}, 
		      {name : 'userName',align : 'center'}, 
		      {name : 'userSexName',align : 'center'},
		      {name : 'userMobile',align : 'center'}, 
		      {name : 'orgName',align : 'center'}, 
		      {name : 'act',align : 'center', formatter : renderOperation}],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,		//在grid上显示记录条数，这个参数是要被传递到后台
		rowList : [ 10, 20, 30 ],		//一个下拉选择框，用来改变显示记录数，当选择时会覆盖rowNum参数传递到后台
		pager : '#grid-pager',		
		caption : "用户信息列表",		//表格名称
		loadComplete : topjqGridLoadComplete
	});
	//查询按钮  jq方式
	$("#testSearchUserList").click(function(){
		reloadJqGrid("search");
	}); 
	//新建按钮   同上
	$("#testCreateUserBtn").click(function(){
		testShowSysUserForm();
	})
})
//格式化最后一列
var renderOperation = function(cellvalue, options, cell) {
	var html = ""; 
	html += "<a  onclick=\"testShowSysUserForm('" + cell.userId + "')\" href=\"#\">修改1</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a  onclick=\"testDeleteSysUser('" + cell.userId + "')\" href=\"#\">删除1</a>&nbsp;&nbsp;&nbsp;&nbsp;"
	html += "<a  onclick=\"testShowSysUserRoleForm('" + cell.userId + "')\" href=\"#\">分配角色1</a>"
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
//角色分配弹出窗口      不在八个文件之内 需要其他action支持
var testShowSysUserRoleForm = function(userId) {
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
var testShowSysUserForm = function(id) {
	topwindow.showWindow({
		//窗口名称
		title : "用户编辑1",
		//参数
		data : {id : id},
		//url
		url : $.cxt + "/testsysuser/testshowsysuserform",		//action中的方法
		
		bottons : [{
			title : "确认1",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("testSysUserForm")){		//更改后TestSysUserForm的id		
					$.ajax({
						url : $.cxt + "/testsysuser/testinsertorupdatesysuser", 
						data : topgetObjByObj($("#testSysUserForm .formField")),		//id.class
						type: "POST",
						async:false,
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

//已经搞定删除不用看
var testDeleteSysUser = function(id) {
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/testsysuser/testdeletesysuserbyid",		//cxt 获取过的根目录地址
			data : {id : id},
			type: "POST",
			success : function(data) {		//返回html		
				//重新加载表格
				reloadJqGrid();
				//操作提示
				topshowAlertSuccesDiv();
			}
		})
	})
}
