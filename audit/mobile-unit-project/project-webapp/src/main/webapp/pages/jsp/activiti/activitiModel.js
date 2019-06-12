$(function() {
	initDataGrid();
	$('#searchModelList').bind('click', function() {
		reloadJqGrid('search');
	});
	$('#createModelBtn').bind("click", function() {
		showActivitiModelForm();
	});
});

function initDataGrid(){
	$('#grid-table').jqGrid(
			{
				url : $.cxt + "/ActivitiCore/selectPageList",
				datatype : "json",
				mtype : "POST",
				height : topjqGridHeight(),
				autowidth : true,
				rownumbers:true,
				colNames : [ '流程编码', '流程主键','流程名称','流程描述','更新时间','操作' ],
				colModel : [ 
				             {name : 'id',align : 'center',index : 'id',editable : false},
				             {name : 'key',align : 'center',index : 'key',editable : false}, 
				             {name : 'name',align : 'center',index : 'name',editable : false},
				             {name : 'metaInfo',align : 'center',index : 'metaInfo',editable : false,formatter:getDescription},
				             {name : 'lastUpdateTime',align : 'center',index : 'lastUpdateTime',editable : false,formatter:getDate},
				             {name : 'act',align : 'center',index : 'act',width : 140,search : false,sortable : false,editable : false,title: false,formatter : renderOperation} 
				            ],
				viewrecords : true,
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#grid-pager',
//				emptyrecords: "当前没有数据可以显示！",
				loadComplete : topjqGridLoadComplete,
				caption: "流程列表"
			});
}

function renderOperation(cellvalue, options, cell) {
	var cellStr = JSON.stringify(cell);
	var div = $("<div></div>")
	.append(
		$("<a></a>")
		.css({"width":"33%","cursor":"pointer"})
		.addClass("pull-left","text-center")
		.attr("onclick", "editActivitiModel('" + cell.id + "')")
		.prop("top-do-role","update")
		.text("编辑")
		.attr("title","编辑")
	).append(
		$("<a></a>")
		.css({"width":"33%","cursor":"pointer"})
		.addClass("pull-left","text-center")
		.attr("onclick", "deployActivitiModel('" + cell.id + "')")
		.prop("top-do-role","add")
		.text("部署")
		.attr("title","部署")
	).append(
		$("<a></a>")
		.css({"width":"33%","cursor":"pointer"})
		.addClass("pull-left","text-center")
		.attr("onclick", "deleteActivitiModel('" + cell.id + "')")
		.prop("top-do-role","delete")
		.text("删除")
		.attr("title","删除")
	);
	return div.html();
}


function getDescription(cellValue){
	var obj = $.parseJSON(cellValue);
	return obj.description;
}

function getDate(tm){
	var tt=new Date(parseInt(tm)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
	var time = new Date(tm);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

function add0(m){
	return m<10?'0'+m:m 
}

function encodeType(cellvalue) {
	if(cellvalue=='0'){
		return "管理租户";
	}
	else if(cellvalue=='1'){
		return "普通租户";
	}
	else{
		return "局方租户";
	}
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

var showActivitiModelForm = function() {
	topwindow.showWindow({
		//窗口名称
		title : "流程编辑",
		//url
		url : $.cxt + "/ActivitiCore/showActivitiModelForm",
		height : 275,
		width : 400,
		bottons : [{
			title : "确认",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("activitiModelForm")){
					$.ajax({
						url : $.cxt + "/ActivitiCore/doSaveOrUpdate", 
						data : {"json": JSON.stringify(topgetObjByObj($("#activitiModelForm .formField")))},
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
				$("#activitiModelForm .formField[type!=hidden]").val("");
			}
		}]
	});
}

function editActivitiModel(id){
	
	$.ajax({
		url : $.cxt + '/ActivitiCore/getEditorUrl',
		type : "POST",
		success : function(data) {
			window.open(data+id);
		},
	});
}

function deployActivitiModel(id){
	
	$.ajax({
		url : $.cxt + '/ActivitiCore/deploy',
		type : "POST",
		data : {modelId:id},
		success : function(json) {
			$('div').remove('.alert');
			var data = $.parseJSON(json);
			if("1" == data){
				//操作提示
				topshowAlertErrorDiv("请先绘制流程图后部署！");
			}else if("2" == data){
				//操作提示
				topshowAlertErrorDiv("请在绘制流程图页面填写名称后部署！");
			}else{
				//重新加载表格
				reloadJqGrid();
				//操作提示
				topshowAlertSuccessDiv();
			}
		}
	});
}

function deleteActivitiModel(id){
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/ActivitiCore/doDelete", 
			data : {"modelId" : id},
			type: "POST",
			success : function(data) {
				//重新加载表格
				reloadJqGrid();
				//操作提示
				topshowAlertSuccessDiv();
			}
		});
	});
}

