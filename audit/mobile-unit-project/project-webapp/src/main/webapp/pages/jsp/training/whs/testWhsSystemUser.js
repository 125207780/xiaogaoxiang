$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/testwhssysuser/testwhsselectpagelist",//获取数据地址
		datatype : "json",//从服务器端返回的数据类型 可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
		mtype : "POST",//ajax提交方式。POST或者GET，默认GET
		height : topjqGridHeight(), //表格高度      
		autowidth : true, //表格在首次被创建时会根据父元素比例重新调整表格宽度
		colNames : [ '用户ID', '员工工号','姓名','性别', '联系方式', '所属机构', '操作' ],	//列显示名称
		colModel : [ //常用属性
		      {name : 'userId',align : 'center',hidden : true}, 
		      {name : 'loginId',align : 'center'}, 
		      {name : 'userName',align : 'center'}, 
		      {name : 'userSexName',align : 'center'},
		      {name : 'userMobile',align : 'center'}, 
		      {name : 'orgName',align : 'center'}, 
		      {name : 'act',align : 'center', formatter : renderOperation}],
		viewrecords : true,//是否显示总记录数
		rownumbers: true,//如果为ture则会在表格左边新增一列，显示行顺序号，从1开始递增
		rowNum : 10,	//在grid上显示记录条数要被传递到后台
		rowList : [ 10, 20, 30 ],//一个下拉选择框，用来改变显示记录数，当选择时会覆盖rowNum参数传递到后台
		pager : '#grid-pager',//定义翻页用的导航栏
		caption : "用户信息列表",//表格名称
		loadComplete : topjqGridLoadComplete
	});
	//查询按钮
	$("#testWhsSearchUserList").click(function(){
		reloadJqGrid("search");
	});
	//新建按钮
	$("#testWhsCreateUserBtn").click(function(){
		testWhsShowSysUserForm();
	})
})
//格式化最后一列
var renderOperation = function(cellvalue, options, cell) {
	var html = ""; 
	html += "<a  onclick=\"testWhsShowSysUserForm('" + cell.userId + "')\" href=\"#\">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a onclick=\"testWhsDeleteSysUser('" + cell.userId + "')\" href=\"#\">删除</a>&nbsp;&nbsp;&nbsp;&nbsp;"
	html += "<a onclick=\"testWhsShowSysUserRoleForm('" + cell.userId + "')\" href=\"#\">分配角色</a>"
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
var testWhsShowSysUserRoleForm = function(userId) {
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
var testWhsShowSysUserForm = function(id) {
	topwindow.showWindow({
		//窗口名称
		title : "用户编辑测试",
		//参数
		data : {id : id},
		//url
		url : $.cxt + "/testwhssysuser/testwhsshowsysuserform",	
		bottons : [{
			title : "确认测试",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("testWhsSysUserForm")){
					$.ajax({
						url : $.cxt + "/testsysuser/testinsertorupdatesysuser", 
						data : topgetObjByObj($("#testWhsSysUserForm .formField")),
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
var testWhsDeleteSysUser = function(id) {
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/testsysuser/testdeletesysuserbyid", 
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