$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/Whd_User/queryAll",
		datatype : "json",
		mtype : "POST",
		height : topjqGridHeight(),
		autowidth : true,
		colNames : [ 'ID','姓名', '地址','操作' ],
		colModel : [ 
		      {name : 'userId',align : 'center',}, 
		      {name : 'user_Name',align : 'center'}, 
		      {name : 'user_Address',align : 'center'}, 
		      {name : 'act',align : 'center', formatter : renderOperation}],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "用户信息列表",
		loadComplete : topjqGridLoadComplete
	});
	$("#searchUserList").click(function(){
		reloadJqGrid("search");
	});
})
//增加用户
function toInsert(){
	topwindow.showWindow({
		//窗口名称
		title : "用户添加",
		//url
		url : $.cxt + "/Whd_User/toInsert",
		bottons : [{
			title : "确认",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("UserForm")){
					$.ajax({
						url : $.cxt + "/Whd_User/insert", 
						data : topgetObjByObj($("#UserForm .formField")),
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

//格式化最后一列
var renderOperation = function(cellvalue, options, cell) {
	var html = ""; 
	html += "<a onclick=\"showUserForm('" + cell.userId + "')\" href=\"#\">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a onclick=\"deleteUser('" + cell.userId + "')\" href=\"#\">删除</a>&nbsp;&nbsp;&nbsp;&nbsp;"
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
var showUserForm = function(id) {
	topwindow.showWindow({
		//窗口名称
		title : "用户编辑",
		data : {id : id},
		url : $.cxt + "/Whd_User/get",
		bottons : [{
			title : "确认",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("UserForm")){
					$.ajax({
						url : $.cxt + "/Whd_User/update", 
						data : topgetObjByObj($("#UserForm .formField")),
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

var deleteUser = function(id) {
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/Whd_User/delete", 
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