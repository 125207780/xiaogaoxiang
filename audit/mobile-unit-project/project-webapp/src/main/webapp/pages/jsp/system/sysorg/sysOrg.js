$(function() {
	//加载表格
	$('#grid-table').jqGrid({
		url : $.cxt + "/sysorg/selectpagelist",
		datatype : "json",
		mtype : "POST",
		height : topjqGridHeight(),
		autowidth : true,
		colNames : [ '机构ID', '机构名称','级别','排序','操作'],
		colModel : [ 
		      {name : 'orgId',hidden : true}, 
		      {name : 'name',align : 'center'}, 
		      {name : 'orgLevel',align : 'center'},
		      {name : 'displayOrder',align : 'center'}, 
		      {name : 'operation',align : 'center', formatter : renderOperation}],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "机构列表",
		loadComplete : topjqGridLoadComplete
	});
	reloadSysOrgTree();
	//查询按钮
	$("#searchOrgList").click(function(){
		reloadJqGrid("search");
	});
	//新建按钮
	$("#createOrgBtn").click(function(){
		showSysOrgForm();
	})
})
//格式化最后一列
var renderOperation = function(cellvalue, options, cell) {
	var html = "<a onclick=\"showSysOrgForm('" + cell.orgId + "')\" href=\"#\">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a onclick=\"deleteSysOrg('" + cell.treeCode + "','" + cell.orgId + "','" + cell.orgLevel + "')\" href=\"#\">删除</a>"
	return html;
}
//重新加载表格
var reloadJqGrid = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	$("#grid-table").jqGrid('setGridParam',{    
        postData : topgetObjByObj($("#gridSearch .searchField")),  
        page : 1    
    }).trigger("reloadGrid"); 
}
//加载树
var reloadSysOrgTree = function() {
	//重新加载
	//用于新增
	$("#pid").val("");
	//用于查询
	$("#treeCode").val("");
	//加载机构
	topgetSysOrgTreeDiv({
		id : "sysOrgTreeDiv",
		onClick : function(obj) {
			$("#pid").val(obj.orgId);
			$("#treeCode").val(obj.treeCode);
			reloadJqGrid();
		},
		clearClick : function() {
			$("#pid").val("");
			$("#treeCode").val("");
			reloadJqGrid();
		}
	});
}
//弹出窗口
var showSysOrgForm = function(id) {
	var obj = {};
	if(id == undefined) {
		obj.pid = $("#pid").val();
	} else {
		obj.id = id;
	}
	topwindow.showWindow({
		//窗口名称
		title : "机构编辑",
		//参数
		data : obj,
		//url
		url : $.cxt + "/sysorg/showsysorgform",
		bottons : [{
			title : "确认",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("sysOrgForm")){
					$.ajax({
						url : $.cxt + "/sysorg/insertorupdatesysorg", 
						data : topgetObjByObj($("#sysOrgForm .formField")),
						type: "POST",
						success : function(data) {
							//要先重新加载树
							reloadSysOrgTree();
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
var deleteSysOrg = function(treeCode,orgId,orgLevel) {
	if(4 != orgLevel){
		messageAlert("此级菜单不可删除！");
	}else{
		topshowdialog("确认删除？", function(){
			$.ajax({
				url : $.cxt + "/sysorg/deletesysorgbytreecode", 
				data : {treeCode : treeCode,orgId : orgId},
				type: "POST",
				success : function(data) {
					//要先重新加载树
					reloadSysOrgTree();
					//重新加载表格
					reloadJqGrid();
					//操作提示
					topshowAlertSuccessDiv();
				}
			})
		})
	}
}

function messageAlert(message){
	bootbox.dialog({
        message: "<span style=\"color:#000\">"+message+"</span>",
        title: "消息提示",
        buttons: {
            OK: {
                label: "确定",
                className: "btn-success",
            }
        }
    });
}
