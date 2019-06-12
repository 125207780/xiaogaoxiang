$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/sysglobalparam/selectpagelist",
		datatype : "json",
		mtype : "POST",
		height : topjqGridHeight(),
		autowidth : true,
		colNames : [ '参数名称', '参数值','描述', '操作' ],
		colModel : [ 
		      {name : 'paramName',align : 'center'},
		      {name : 'paramValue',align : 'center'},
		      {name : 'paramDescription',align : 'center'},
		      {name : 'act',align : 'center', formatter : renderOperation}
		      ],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "全局参数信息列表",
		loadComplete : topjqGridLoadComplete
	});
	//查询按钮
	$("#searchParamList").click(function(){
		reloadJqGrid("search");
	});
	//新建按钮
	$("#createParamBtn").click(function(){
		showSysGlobalParamForm();
	});
	topdoRole();
});
//格式化最后一列
var renderOperation = function(cellvalue, options, cell) {
	var html = ""; 
	// html += "<a top-do-role=\"update\" onclick=\"showSysGlobalParamForm('" + cell.paramName + "')\" href=\"#\">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a onclick=\"showSysGlobalParamForm('" + cell.paramName + "')\" href=\"#\">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	// html += "<a top-do-role=\"delete\" onclick=\"deleteSysGlobalParam('" + cell.paramName + "')\" href=\"#\">删除</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a onclick=\"deleteSysGlobalParam('" + cell.paramName + "')\" href=\"#\">删除</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	return html;
};
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
};
//弹出窗口
var showSysGlobalParamForm = function(paramName) {
	topwindow.showWindow({
		//窗口名称
		title : "全局参数编辑",
		//参数
		data : {paramName : paramName},
		//url
		url : $.cxt + "/sysglobalparam/showsysglobalparamform",
		bottons : [{
			title : "确认",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("sysGlobalParamForm")){
					$.ajax({
						url : $.cxt + "/sysglobalparam/insertorupdatesysglobalparam",
						data : topgetObjByObj($("#sysGlobalParamForm .formField")),
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
var deleteSysGlobalParam = function(paramName) {
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/sysglobalparam/deletesysglobalparambyparamname",
			data : {paramName : paramName},
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
