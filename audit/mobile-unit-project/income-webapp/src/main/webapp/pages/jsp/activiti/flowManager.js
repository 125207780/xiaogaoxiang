$(function() {
	
	// 初始化DataGrid
	initDataGrid();
	
	// 初始化搜索按钮
	$('#searchProcessList').bind('click', function() {
		reloadJqGrid('search');
	});
	
	$('#createApplyBtn').bind("click", function() {
		showFlowManagerForm();
	});
	
});

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
var showFlowManagerForm = function(appid) {
	topwindow.showWindow({
		//窗口名称
		title : "关联编辑",
		//参数
		data : {appid : appid},
		height : 275,
		width : 400,
		//url
		url : $.cxt + "/flowManager/showFlowManagerForm",
		bottons : [{
			title : "确认",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("flowManagerForm")){
					var data = topgetObjByObj($("#flowManagerForm .formField"));
					$.ajax({
						url : $.cxt + "/flowManager/doSaveOrUpdate", 
						data : data,
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
		},
		{
			title : "重置",
			fun : function() {
				// 手动清空所有显示的表单元素的值
				$("#flowManagerForm .formField[type!=hidden]").val("");
				// 初始化下拉框选项
				$('#flowManagerForm select[name=processid]').trigger("chosen:updated");
			}
		}]
	});
}

/**
 * 初始化DataGrid
 */
function initDataGrid(){
	//初始化JqGrid
	$('#grid-table').jqGrid({
				url : $.cxt + "/flowManager/selectPageList",
				datatype : "json",
				mtype : "POST",
				height : topjqGridHeight(),
				autowidth : true,
				rownumbers:true,
				colNames : [ '主键','部署编码','流程编码','流程名称','方法名','说明','操作' ],
				colModel : [ 
				             {name : 'appid',align : 'center',index : 'appid',editable : false},
				             {name : 'deployid',align : 'center',index : 'deployid',editable : false},
				             {name : 'processid',align : 'center',index : 'processid',editable : false},
				             {name : 'processname',align : 'center',index : 'processname',editable : false},
				             {name : 'appclassname',align : 'center',index : 'appclassname',editable : false},
				             {name : 'memo',align : 'center',index : 'memo',editable : false},
				             {name : 'act',align : 'center',index : 'act',width : 140,search : false,sortable : false,title: false,editable : false,formatter : renderOperation} 
				            ],
				viewrecords : true,
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#grid-pager',
				altRows : true,
				multiselect : false,
				multiboxonly : false,
				loadComplete : topjqGridLoadComplete,
				caption : "关联列表"
			});
}

/**
 * 渲染操作列
 */
function renderOperation(cellvalue, options, cell) {
	var cellStr = JSON.stringify(cell);
	var div = $("<div></div>")
	.append(
		$("<a></a>")
		.css({"width":"50%","cursor":"pointer"})
		.addClass("pull-left text-center")
		.attr("onclick", "showFlowManagerForm('" + cell.appid + "')")
		.prop("top-do-role","update")
		.text("编辑")
		.attr("title","编辑")
	).append(
		$("<a></a>")
		.css({"width":"50%","cursor":"pointer"})
		.addClass("pull-left text-center")
		.attr("onclick", "deleteActivitiProcess('" + cell.appid + "')")
		.prop("top-do-role","delete")
		.text("删除")
		.attr("title","删除")
	);
	return div.html();
}

/**
 * 删除工作流
 * @param appid
 */
function deleteActivitiProcess(appid){
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/flowManager/delete", 
			data : {appid : appid},
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
