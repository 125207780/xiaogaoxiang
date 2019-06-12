$(function() {
	$('#grid-table').jqGrid({//加载表格
		url : $.cxt + "/syshelp/selectpagelist",
		datatype : "json",
		mtype : "POST",
		height : topjqGridHeight(),
		autowidth : true,
		colNames : [ '帮助ID','帮助标题','帮助文档名称','帮助文档地址','帮忙文档内容','状态编码','操作'],
		colModel : [ 
		      {name : 'id',hidden : true}, 
		      {name : 'helpName',align : 'center'},
		      {name : 'helpFileName',hidden : true},
		      {name : 'textRoad',align : 'center', width : 500},
		      {name : 'helpCont',align : 'center'},
		      {name : 'state',hidden : true},
		      {name : 'operation',align : 'center', formatter : renderOperation, width : 300}
		],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "帮助文档列表",
		loadComplete : topjqGridLoadComplete
	});
//	reloadsyshelpTree();
	$("#searchList").click(function(){//查询按钮
		reloadJqGrid("search");
	});
	$("#createBtn").click(function(){//新建按钮
		showsyshelpForm();
	})
})
//格式化操作列
var renderOperation = function(cellvalue, options, cell) {
	var html = "";
	html += "<a onclick=\"showsyshelpForm('" + cell.id + "')\" href=\"#\">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a onclick=\"deletesyshelp('" + cell.id + "')\" href=\"#\">删除</a>&nbsp;&nbsp;&nbsp;&nbsp;"
	html += "<a onclick=\"downfile('" + cell.id + "')\" href=\"#\">下载</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	return html;
}

var downfile =function(id) {
	var html = "<input type='text' value='" + id +"' name='id' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" enctype="multipart/form-data" action="' + $.cxt + '/syshelp/downLoadsyshelpbyId">' + html + '</form>').appendTo('body').submit().remove();
}

//重新加载表格
var reloadJqGrid = function(flag) {
	if(flag == undefined) {
		topclear('gridSearch')//清空查询条件
	}
	$("#grid-table").jqGrid('setGridParam',{    
        postData : topgetObjByObj($("#gridSearch .searchField")),  
        page : 1    
    }).trigger("reloadGrid"); 
}
//加载树
var reloadsyshelpTree = function() {
	$("#id").val("");//用于新增
	$("#treeCode").val("");//用于查询
	topgetsyshelpTreeDiv({//加载菜单
		id : "syshelpTreeDiv",
		onClick : function(obj) {
			$("#id").val(obj.id);
			$("#treeCode").val(obj.treeCode);
			reloadJqGrid();
		},
		clearClick : function() {
			$("#id").val("");
			$("#treeCode").val("");
			reloadJqGrid();
		}
	});
}
//弹出窗口
var showsyshelpForm = function(id) {
	var obj = {};
	obj.id = id;
	topwindow.showWindow({
		title : "帮助文档编辑",//窗口名称
		data : obj,//参数
		url : $.cxt + "/syshelp/showsyshelpform"//url
		/*bottons : [{
			title : "确认",
			fun : function() {
				if(topcheckoutForm("sysHelpForm")){//校验，参数为表单父级id
					$("#sysHelpForm").submit();
				}
			}
		}]*/
	});
}
var deletesyshelp = function(id) {
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/syshelp/deletesyshelpbyId", 
			data : {id : id},
			type: "POST",
			success : function(data) {
				reloadJqGrid();//重新加载表格
				topshowAlertSuccessDiv();//操作提示
			}
		})
	})
}
var updateState = function(id) {
	topshowdialog("确认修改状态？", function(){
		$.ajax({
			url : $.cxt + "/syshelp/updatestate", 
			data : {id : id},
			type: "POST",
			success : function(data) {
				reloadJqGrid();//重新加载表格
				topshowAlertSuccessDiv();//操作提示
			}
		})
	})
} 
