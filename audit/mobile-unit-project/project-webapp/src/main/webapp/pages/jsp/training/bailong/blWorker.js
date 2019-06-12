$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/worker/selectworkerpagelist",		//获取数据的地址
		datatype : "json",			//从服务器端返回的数据类型 可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
		mtype : "POST",			//ajax提交方式。POST或者GET，默认GET
		height : topjqGridHeight(),
		/*postData : {
			"json" : JSON.stringify({"reportId":reportId})
		},*/
		autowidth : true,
		colNames : [ '员工ID', '员工编号', '员工姓名', '性别', '部门ID', '职位', '直属领导', '籍贯', '家庭所在地', '联系电话', '自我评价', '操作' ],			//数组  列显示名称
		colModel : [ 
		      {name : 'workerId',align : 'center',hidden : true},			//常用到的属性：name 列显示的名称；index 传到服务器端用来排序用的列名称
		      {name : 'workerNum',align : 'center'}, 
		      {name : 'workerName',align : 'center'}, 
		      {name : 'workerSexName',align : 'center'},
		      {name : 'treeCode',align : 'center',hidden : true},
		      {name : 'workerPosition',align : 'center'}, 
		      {name : 'workerLeader',align : 'center'},
		      {name : 'workerNativePlace',align : 'center',hidden : true},
		      {name : 'workerHomeplace',align : 'center',hidden : true},
		      {name : 'workerTel',align : 'center',hidden : true},
		      {name : 'workerSelfEvaluation',align : 'center',hidden : true},
		      {name : 'act',align : 'center', formatter : renderOperation}],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,		//在grid上显示记录条数，这个参数是要被传递到后台
		rowList : [ 10, 20, 30 ],		//一个下拉选择框，用来改变显示记录数，当选择时会覆盖rowNum参数传递到后台
		pager : '#grid-pager',		
		caption : "员工信息列表",		//表格名称
		loadComplete : topjqGridLoadComplete
	});
	//查询按钮  jq方式
	$("#workerSearchList").click(function(){
		reloadJqGrid("search");
	}); 
	//新建按钮   同上
	$("#workerCreateBtn").click(function(){
		showWorkerForm();
	})
	//上传按钮
	$("#upload").click(function(){
		uploadshowWorkerForm();
	})
	//下载按钮
	$("#download").click(function(){
		downloadshowWorkerForm();
	})
})

//格式化最后一列
var renderOperation = function(cellvalue, options, cell) {
	var html = ""; 
	html += "<a  onclick=\"showWorkerForm('" + cell.workerId + "')\" href=\"#\">修改详细信息</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a  onclick=\"workerDelete('" + cell.workerId + "')\" href=\"#\">删除</a>"
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
var showWorkerForm = function(id) {
	topwindow.showWindow({
		//窗口名称
		title : "员工信息",
		//参数
		data : {id : id},
		//url
		url : $.cxt + "/worker/showworkerform",		//action中的方法
		
		bottons : [{
			title : "信息确认", 
			fun : function() { 
				//校验，参数为表单父级id
				if(topcheckoutForm("workerForm")){		//表格id		
					$.ajax({
						url : $.cxt + "/worker/workerinsertorupdate", 
						data : topgetObjByObj($("#workerForm .formField")),		//id.class
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

//员工信息删除
var workerDelete = function(id) {
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/worker/deleteworkerbyid",		//cxt 获取过的根目录地址
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
//弹出窗口
var uploadshowWorkerForm = function(id) {
	topwindow.showWindow({
		//窗口名称
		title : "上传简历",
		//参数
		data : {id : id},
		//url
		url : $.cxt + "/worker/uploadshowworkerform",		//action中的方法
	});
}
//弹出窗口
/*
var downloadshowWorkerForm = function(id) {
	topwindow.showWindow({
		//窗口名称
		title : "上传简历",
		//参数
		data : {id : id},
		//url
		url : $.cxt + "/worker/downloadshowworkerform",		//action中的方法
	});
}
*/