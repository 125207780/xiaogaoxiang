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

// pageType工单类型（send：发送工单,handle：待办事项,participate：已办事项,all：工单查询）
// detailOperation（生成操作列方法）
// hidden（对象类型，设置哪些col字段隐藏，目前支持curAssignee和duration字段，需要其他的自行添加）
function initDataGrid(pageType,detailOperation,hidden){
	if (hidden==null) {
		hidden={};
	}
	$('#grid-table').jqGrid(
			{
				url : $.cxt + "/workOrder/selectPageList",
				datatype : "json",
				mtype : "POST",
				height : topjqGridHeight(),
				autowidth: true,
				postData : {"pageType":pageType},
				colNames : [ '工单id', '流程实例ID', '工单名称', '创建人', '创建时间', '工单状态', '当前处理人', '当前处理耗时', '操作'],
				colModel : [
							{name : 'id', hidden: true, align : 'center', index : 'id', width : 130, editable : false},
							{name : 'procId', hidden: true, align : 'center', index : 'procId', width : 130, editable : false},
				            {name : 'workOrderName', align : 'center', index : 'workOrderName', width : 170, editable : false},
				            {name : 'creatorName', align : 'center', index : 'creatorName', width : 120, editable : false},
				            {name : 'createTime', align : 'center', index : 'createTime', width : 130, editable : false},
				            {name : 'status', align : 'center', index : 'status', width : 130, editable : true, formatter : statusTransform, cellattr: addCellAttr},
						    {name : 'curAssignee', hidden: hidden.curAssignee==null?false:hidden.curAssignee, align : 'center', index : 'curAssignee', width : 130, editable : false, formatter : assigneeTrans},
						    {name : 'duration', hidden: hidden.duration==null?false:hidden.duration, align : 'center', index : 'duration', width : 130, editable : false},
						    {name : 'act', align : 'center', index : 'act', width : 100, search : false,title:false, sortable : false, editable : false, formatter : detailOperation} 
						    ],
				viewrecords : true,
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#grid-pager',
				altRows : true,
				rownumbers : true,
				multiselect : false, // 定义是否可以多选
				multiboxonly : false,// 当multiboxonly为ture时只有选择checkbox才会起作用
				loadComplete : topjqGridLoadComplete,
				caption : "工单列表"
			});
}

function addCellAttr(rowId, val, rawObject, cm, rdata) {
	if (rawObject.status=="0") {
		return "style='color:blue;'";
	}
	else if (rawObject.status=="1") {
		return "style='color:red;'";
	}
	else if (rawObject.status=="2") {
		return "style='color:green;'";
	}
	else {
		return "style='color:black;'";
	}
}

function statusTransform(cellvalue, options, cell) {
	var status = null;
	if (cell.status === "0") {
		status = "待发送"
	}
	else if (cell.status === "1") {
		status = "办理中";
	}
	else if (cell.status === "2") {
		status = "待审核";
	}
	else {
		status = "已完成";
	}
	return status;
}

function cuOrgTrans(cellvalue, options, cell) {
	if (cell.cuOrg!=null&&cell.cuOrg!="") {
		return cell.cuOrg;
	}
	else {
		return "无";
	}
}
//数组去重
function unique(arr){
	 var res = [];
	 var json = {};
	 for(var i = 0; i < arr.length; i++){
	  if(!json[arr[i]]){
	   res.push(arr[i]);
	   json[arr[i]] = 1;
	  }
	 }
	 return res;
	}

function assigneeTrans(cellvalue, options, cell) {
	if (cell.curAssignee!=null&&cell.curAssignee!="") {
		var assArr = cell.curAssignee.split(",");
		var curAssignee = unique(assArr).join(",");
		return curAssignee;
	}
	else {
		return "无";
	}
}
// id为工单主键，procId为流程主键
// pageType为工单类型（send：发送工单,handle：待办事项,participate：已办事项,all：工单查询）
// title为弹窗标题
var showDetailForm=function(id, procId, pageType, title) {
	topwindow.showWindow({
		//窗口名称
		title : title,
		//参数
		data : {"id" : id, "procId" : procId, "pageType" : pageType},
		//url
		url : $.cxt + "/workOrder/showDetailForm",
		bottons : []
	});
}