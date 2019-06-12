$(function(){
	initData(id);
	initAddIndexTable
});
var roleStr = "";
var roleJson = {};
var indexName = "";
function initData(id) {
	
	$.ajax({
		url : $.cxt +"/exam/editObj",
		type:"POST",
		data:{examid:id},
		success: function(data){
			 var cycle = data.CYCLETYPE;	
			 var objType= data.CREATEOBJECT;
			 if(cycle=="mouth"){
				 $("#add_cycleType").val(cycle);
				 $("#add_cycleType").trigger("chosen:updated");
				 $("#add_startDate").val(data.STARTDATE);
				 $("#add_endDateDiv").hide();
				 $("#add_endDate").val();
			 }else{
				 $("#add_endDateDiv").show();
				 $("#add_cycleType").val(cycle);
				 $("#add_cycleType").trigger("chosen:updated");
				 $("#add_startDate").val(data.STARTDATE);
				 $("#add_endDate").val(data.ENDDATE);
			 }
			  $("#desc").val(data.TEMPLATEDESCRIPTION);
			  $("#add_objectType").val(data.CREATEOBJECT);
			  $("#add_objectType").trigger("chosen:updated"); //对象类型改变
			  changeObjectType();
					$.ajax({
						url : $.cxt+"/exam/editObjectS",
						type:"POST",
						data:{
							examId:id,objType:objType
							},
						success:function(json){
							console.log(json)
							var objectType = $("#add_objectType").val();
							if (objectType == "gridLevel1" || objectType == "gridLevel2"
									|| objectType == "gridLevel3") {
								initObjectNameByGrid();
									var arr = new Array();
								for(var i=0;i<json.length;i++){
									if(json[i]==""){return;};		
										arr[i]=json[i].OBJECT_ID;	
								}							
								$("#add_objectName").val(arr)
								$("#add_objectName").trigger("chosen:updated")
							} else {
								var arr = new Array();
								var html = "";
								var gType = "";
								var gName = json[0].GRIDNAME
								
								$("#add_gridName").val(gName);
								initObjectNameByUser()
									for(var i=0;i<json.length;i++){
										if(json[i]==""){return;};		
										arr[i]=json[i].MANAGERNAME;						
									}	
								$("#add_objectName").val(arr);
								$("#add_objectName").trigger("chosen:updated")
							}
						}
					});
		}
	});
	
}
//-----------------初始化，对页面元素绑定事件 ----------------------------
$('#add_startDate').datepicker({
	language : "zh-CN",
	todayHighlight : true,
	format : 'yyyy-mm',
	autoclose : true,
	startView : 'months',
	maxViewMode : 'years',
	minViewMode : 'months'
}).on('changeDate', changeDate) //考核周期发生改变时调用

$("#add_cycleType").on("change", changeCycleType); //周期类型改变时调用
$("#add_objectType").on("change", changeObjectType); //对象类型改变
$("#add_gridName").on("change", initObjectNameByUser);//网格名称改变
$("#add_objectName").chosen();
//initGridName();
initObjectNameByGrid();
//initObjectNameByOrgId();
initAddIndexTable();
$("#selectIndexBtn").click(showSelectIndex)

//------------------初始化结束 -------------------------
//---考核周期发生改变时调用
function changeDate() {
	var startDate = $('#add_startDate').datepicker('getDate');
	var cycleType = $("#add_cycleType").val();
	if (cycleType == "quarter") {
		var endDate = new Date();
		endDate.setFullYear(startDate.getFullYear(), startDate
				.getMonth() + 2, 1);
		var month = endDate.getMonth() + 1 < 10 ? "0"
				+ (endDate.getMonth() + 1) : endDate.getMonth() + 1;
		$("#add_endDate").val(endDate.getFullYear() + "-" + month);
	} else if (cycleType == "year") {
		var endDate = new Date();
		endDate.setFullYear(startDate.getFullYear(), startDate
				.getMonth() + 11, 1);
		var month = endDate.getMonth() + 1 < 10 ? "0"
				+ (endDate.getMonth() + 1) : endDate.getMonth() + 1;
		$("#add_endDate").val(endDate.getFullYear() + "-" + month);
	}
}
//--周期类型改变时调用
function changeCycleType() {
	var cycleType = $("#add_cycleType").val();
	$('#add_startDate').val('');
	$('#add_endDate').val('');
	if (cycleType == "month") {
		$("#add_endDateDiv").hide();
		$("#add_endDate").val('');
	} else {
		$("#add_endDateDiv").show();
	}
	$("#add_indexTable").jqGrid('clearGridData'); //清空表格
}

function changeObjectType() {

	var objectType = $("#add_objectType").val();
	if (objectType == "gridLevel1" || objectType == "gridLevel2"
			|| objectType == "gridLevel3") {
		$("#add_gridNameDiv").hide();

		//当前对象类型为网格时，对象名称呈现网格
		initObjectNameByGrid();
	} else {
		$("#add_gridNameDiv").show();

		//当前对象为人时，查询
		initObjectNameByOrgId();

		//当前对象类型为人时，先显示网格名称
		$("#add_gridName").val("");
		$("#add_objectName").empty();
		$("#add_objectName").trigger("chosen:updated")
	}
}
//---当前对象类型为网格时，对象名称呈现网格
function initObjectNameByGrid() {

	var org = $("#orgId").val();
	var objectType = $("#add_objectType").val();
	//alert("orgId="+org+"对象类型="+objectType);
	//根据当前选择的是一类网格，还是二类，三类查询 区县下对应网格
	var gridType = objectType.substr(objectType.length - 1, 1);
	//返回值
	var gridlist;
	$.ajax({
		url : $.cxt + "/exam/selectOrgByPid",
		//请求方式
		type : "POST",
		async : false,
		//传递到后台的参数
		data : {
			org : org,
			objectType : objectType
		},
		success : function(json) {
			//将返回值转成list对象
			var list = $.parseJSON(json);
			//获取list中的每一行
			gridlist = list.rows;
		}
	});

	$("#add_objectName").empty();
	for (var i = 0, n = gridlist.length; i < n; i++) {
		var grid = gridlist[i];
		var type = grid.typeId;
		if (type == 1) {
			type = "一类网格";
		} else if (type == 2) {
			type = "二类网格";
		} else if (type == 3) {
			type = "三类网格";
		}
		var option = $("<option value='"+grid.orgId+"'>" + grid.name
				+ "</option>");
		$("#add_objectName").append(option);
	}

	$("#add_objectName").trigger("chosen:updated");

}
//当对象类型是人时，执行此方法
function initObjectNameByOrgId() {
	//pid
	var org = $("#orgId").val();
	var gridId = null;
	var objectType = null;
	var userlist;
//	alert("orgId="+org+"对象类型="+objectType);
	$.ajax({
		url : $.cxt + "/exam/selectOrgByPid",
		//请求方式
		type : "POST",
		async : false,
		//传递到后台的参数
		data : {
			org : org,
			objectType : objectType,
			strName : gridId
		},
		success : function(json) {

			//将返回值转成list对象
			var list = $.parseJSON(json);

			//获取list中的每一行
			userlist = list.rows;

		}
	});

	//循环，往网格名称中增加字段,先清空
	$("#add_gridName").empty();
	$("#add_gridName").append("<option value=''>请选择网格</option>")
	for (var i = 0; i < userlist.length; i++) {
		var user = userlist[i];
		var type = user.typeId;
		if (type == 1) {
			type = "一类网格";
		} else if (type == 2) {
			type = "二类网格";
		} else if (type == 3) {
			type = "三类网格";
		}
		var option = $("<option value='"+ user.orgId +"'>" + user.name
				+ "[" + type + "]" + "</option>");

		$("#add_gridName").append(option);
	}

	$("#add_gridName").trigger("chosen:updated");

}

//依据 对象类型，网格名称 查询对象名称
function initObjectNameByUser() {
	//获取当前网格名称的orgId,这个是通过页面的orgId(pid)获取的
	var org = $("#add_gridName").val();
	//对象类型
	var objectType = $("#add_objectType").val();
	//接受返回值
	var userlist;
	//alert("orgId="+org+"对象类型="+objectType);
	$.ajax({
		url : $.cxt + "/exam/selectObjNameByType",
		//请求方式
		type : "POST",
		async : false,
		//传递到后台的参数
		data : {
			org : org,
			objectType : objectType
		},
		success : function(json) {
			//将返回值转成list对象
			var list = $.parseJSON(json);
			//获取list中的每一行
			userlist = list.rows;
		}
	});

	$("#add_objectName").empty();
	for (var i = 0, n = userlist.length; i < n; i++) {
		var user = userlist[i];
		//这里sql返回的是map，所以取值的时候大写
		var loginId = user.LOGIN_ID;
		var option = $("<option value='"+loginId+"'>" + user.NAME
				+ "</option>");
		$("#add_objectName").append(option);
	}

	$("#add_objectName").trigger("chosen:updated");

}
//-----------初始化网格名称,当前区县下，所有网格
function initGridName() {
	var gridlist = [];//
	for (var i = 0; i < 10; i++) {
		gridlist.push({
			"name" : "网格名称" + i,
			"orgId" : "orgId" + i,
			"type" : (i % 3 + 1)
		})
	}
	//使用数据
	$("#add_gridName").empty();
	$("#add_gridName").append("<option value=''>请选择网格</option>")
	for (var i = 0, n = gridlist.length; i < n; i++) {
		var grid = gridlist[i];
		var type = grid.type;
		if (type == 1) {
			type = "一类网格";
		} else if (type == 2) {
			type = "二类网格";
		} else if (type == 3) {
			type = "三类网格";
		}
		var option = $("<option value='"+grid.orgId+"'>" + grid.name
				+ "[" + type + "]" + "</option>");
		$("#add_gridName").append(option);
	}
	$("#add_gridName").chosen();
}
function initAddIndexTable() {
	$('#add_indexTable').jqGrid({
		url : $.cxt + "/exam/initGrid",
		postData:{examid:id},
		datatype : "json",
		mtype: "POST",
		height : "auto",
		autowidth : true,
		colNames : [ '指标分类','目标值' ,'指标名称', '权重', '指标定义', '周期类型',
			'考核规则', '操作', 'ID', '规则JSON' ],
			colModel : [ {
				name : 'KPI_TYPE',
				align : 'center'
			},{
				name : 'TARGET_VALUE',
				align : 'center'
			}, {
				name : 'KPI_NAME',
				align : 'center'
			}, {
				name : 'KPI_WEIGHT',
				align : 'center'
			}, {
				name : 'KPI_DEFINE',
				align : 'center'
			}, {
				name : 'CYCLE_TYPE',
				align : 'center',
				formatter : cycleEdit
			}, {
				name : 'KPI_ROLESTR',
				align : 'center'
			}, {
				name : 'edit',
				align : 'center',
				formatter : stateOperation
			}, {
				name : 'KPI_ID',
				align : 'center',
				hidden : true
			}, {
				name : 'KPI_ROLEJSON',
				align : 'center',
				hidden : true
			}],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "考核指标表",
		loadComplete : topjqGridLoadComplete
	});	
//	$('#add_indexTable').jqGrid({
//				url: $.cxt+"/exam/initGrid",	
//				postData:{examid:id},
//				mtype : "POST",
//				height : topjqGridHeight(),
//				autowidth : true,
//				colNames : [ '指标分类', '指标名称', '权重', '指标定义', '周期类型',
//						'考核规则', '操作', 'ID', '规则JSON' ],
//				colModel : [ {
//					name : 'KPI_TYPE',
//					align : 'center'
//				}, {
//					name : 'KPI_NAME',
//					align : 'center'
//				}, {
//					name : 'KPI_WEIGHT',
//					align : 'center'
//				}, {
//					name : 'KPI_DEFINE',
//					align : 'center'
//				}, {
//					name : 'CYCLE_TYPE',
//					align : 'center'
//				}, {
//					name : 'KPI_ROLESTR',
//					align : 'left'
//				}, {
//					name : 'edit',
//					align : 'center',
//					formatter : stateOperation
//				}, {
//					name : 'KPI_ID',
//					align : 'center',
//					hidden : true
//				}, {
//					name : 'KPI_ROLEJSON',
//					align : 'center',
//					hidden : true
//				}],
//				viewrecords : true,
//				rownumbers: true,
//				rowNum : 10,
//				rowList : [ 10, 20, 30 ],
//				pager : '#grid-pager',
//				caption : "考核指标表",
//				loadComplete : topjqGridLoadComplete
//			});
	
	function stateOperation(cellvalue, options, cell) {
		var html = "";
		html += "<a    onclick=\"showSetRole('" + options.rowId
				+ "')\" href=\"#\">规则配置</a>";

		return html;
	}
	
	function cycleEdit(cellvalue, options, cell) {
		var cycle;
		if(cellvalue == "month"){
			cycle = "月度考核";
		}else if(cellvale == "quarter"){
			cycle = "季度考核";
		}else if(cellvale == "year"){
			cycle = "年度考核";
		}
		return cycle;  
	}
	
}
showSetRole = function(rowId) {
	var cell = $('#add_indexTable').jqGrid("getRowData", rowId);
	indexName = cell.KPI_NAME;
	roleStr = cell.KPI_ROLESTR;
	if (cell.KPI_ROLEJSON && cell.KPI_ROLEJSON != "") {
		roleJson = JSON.parse(cell.KPI_ROLEJSON);
	} else {
		roleJson = null;
	}

	topwindow.showWindow({
		//窗口名称
		title : "规则配置",
		//url
		url : "setRole.jsp",
		bottons : [ {
			title : "确认",
			fun : function() {
					//获取规则里面，需要填写的每一个字段值
					var rol1 = $("#rol_div1_3").val();
					var rol1_sub = $("#rol_div1_sub").val();
					var rol2_1 = $("#rol_div2_1").val();
					var rol2_5 = $("#rol_div2_5").val();
					var rol2_sub = $("#rol_div2_sub").val();
					var rol3_3 = $("#rol_div3_3").val();
					var rol3_sub = $("#rol_div3_sub").val();
					//判断第二行是否隐藏，如果是true，则是隐藏，是第二段如果是false，则是第三段
					var isHidden = $("#rol_div2").css('display') === 'none';
					if(isHidden){
						//使用一个方法判断每一个字段值是否为空。如果为空。则不能点击提交
						if(isEmpty(rol1) || isEmpty(rol1_sub)
								|| isEmpty(rol3_3) || isEmpty(rol3_sub) ){
							return false;
						}
					}else{
						if(isEmpty(rol1) || isEmpty(rol1_sub) || isEmpty(rol2_1)
								|| isEmpty(rol2_5) || isEmpty(rol2_sub)
								|| isEmpty(rol3_3) || isEmpty(rol3_sub) ){
							return false;
						}
					}
				$('#add_indexTable').jqGrid('setCell', rowId,
						"KPI_ROLESTR", roleStr);
				$('#add_indexTable').jqGrid('setCell', rowId,
						"KPI_ROLEJSON", JSON.stringify(roleJson));
				topwindow.removeWindow();
			}
		} ]
	});

}
function showSelectIndex() {

	topwindow.showWindow({
		//窗口名称
		title : "指标选择",
		//url
		url : "indexSelect.jsp",
		bottons : [ {
			title : "保存",
			fun : function() {
				var data = [];
				for ( var id in selectArr) { //selectArr在indexSelect.JSP定义的全局变量
					data.push(selectArr[id]);
				}

				$("#add_indexTable").jqGrid('clearGridData'); //清空表格
				$("#add_indexTable").jqGrid('setGridParam', { // 重新加载数据
					datatype : 'local',
					data : data, //  newdata 是符合格式要求的需要重新加载的数据 
					page : 1
				}).trigger("reloadGrid");
				topwindow.removeWindow();
			}
		}, {
			title : '清除',
			fun : function() {
				selectArr = [];
				$("#sel_indexTable").jqGrid('resetSelection');//清空表格选中
			}

		} ]
	});
}

//判断字符串是否为空，为空返回true
function isEmpty(str){
	if (str === null || str === undefined || str === '' ) {
		messageAlert("规则不能为空");
		return true;
	} 
}

