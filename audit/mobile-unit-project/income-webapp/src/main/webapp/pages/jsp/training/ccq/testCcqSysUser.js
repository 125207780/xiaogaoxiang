$(function() {
	//jqGrid表格控件一堆参数设置与datagrid类似，可网上查找具体文档参数
	$('#grid-table').jqGrid({
		url : $.cxt + "/testccqsysuser/testccqselectpagelist",//获取数据地址
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
	$("#testCcqSearchUserList").click(function(){
		//重新加载jqgrid表格
		reloadJqGrid("search");
	});
	//新建按钮
	$("#testCcqCreateUserBtn").click(function(){
		//弹出新增对话框，此处将对话框设置为一个单独页面，也可放入当前页面中
		testCcqShowSysUserForm();
	})
})
//格式化最后一列
var renderOperation = function(cellvalue, options, cell) {
	var html = ""; 
	html += "<a onclick=\"testCcqShowSysUserForm('" + cell.userId + "')\" href=\"#\">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a  onclick=\"testCcqDeleteSysUser('" + cell.userId + "')\" href=\"#\">删除</a>&nbsp;&nbsp;&nbsp;&nbsp;"
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
var testCcqShowSysUserForm = function(id) {
	topwindow.showWindow({
		//窗口名称
		title : "编辑用户",
		//参数
		data : {id : id},
		//url 加载form表单信息如果存在则显示不存在则显示空
		url : $.cxt + "/testccqsysuser/testccqshowsysuserform",	
		//按钮操作
		bottons : [{
			title : "确认",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("testCcqSysUserForm")){
					$.ajax({
						url : $.cxt + "/testccqsysuser/testinsertorupdatesysuser", 
						//提交form的数据
						data : topgetObjByObj($("#testCcqSysUserForm .formField")),
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

//根据id删除用户信息
var testCcqDeleteSysUser = function(id) {
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/testccqsysuser/testdeletesysuserbyid", 
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