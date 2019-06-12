<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%> 
<style>
label{
	color:#fff !important;
}
.chosen-container.chosen-container-multi .chosen-choices,.chosen-container.chosen-container-multi .chosen-choices .search-choice{
	border:1px solid #008fa7;
}
.chosen-container.chosen-container-multi .chosen-choices .search-choice span{
	color:#fff;
}
</style>
<input type="hidden" id="orgId" name="orgId" value="" />
<div style="width: 100%">
	<div style="margin-bottom:10px;">
		<label>周期类型：</label> 
		<select id="add_cycleType" style="width: 150px; display: inline-block;">
			<option value="month">月度考核</option>
			<option value="quarter">季度考核</option>
			<option value="year">年度考核</option>
		</select> 
		<label>考核周期：</label> 
		<input style="width: 150px; display: inline-block;height:28px;padding-bottom:0;" class="form-control date-picker" id="add_startDate" type="text"
			data-date-format="yyyy-mm" /> 
			<span id="add_endDateDiv" style="display: none;">~
				<input type="text" class="form-control" style="width: 100px; display: inline-block;" disabled="disabled" id="add_endDate">
			</span>
		<button style="float: right;" type="button" class="btn btn-primary"  id="selectIndexBtn">选择指标</button>
	</div>
	<div style="margin-bottom:10px;">
		<label>对象类型：</label>
		<select id="add_objectType" style="width: 150px; display: inline-block;">
			<option value="gridLevel1">一类网格</option>
			<option value="gridLevel2">二类网格</option>
			<option value="gridLevel3">三类网格</option>
			<option value="gridManager">网格经理</option>
			<option value="cdManager">CD政企客户经理</option>
			<option value="directManager">直销渠道经理</option>
			<option value="societyManager">社会渠道经理</option>
		</select> <span id="add_gridNameDiv" style="display: none"> 
		<label>网格名称：</label>
			<select id="add_gridName" class="chosen-select"></select>
		</span>
		<label>对象名称：</lable>
		<select multiple="" style="width: 400px;" id="add_objectName" data-placeholder="请选择..."></select>
	</div>
	<div style="margin-bottom:10px;">
		<label>模板描述：</lable>
		<input type="text" id="desc" style="width: 628px; display: inline-block;height:28px;padding-bottom:0;">
	</div>
</div>
<table id="add_indexTable"></table>

<script type="text/javascript">
	var roleStr = "";
	var roleJson = {};
	var indexName = "";
	$(function() {

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
			
			var Datevalue = $('#add_startDate').val();
			if(!Datevalue){
				$("#add_endDate").val("");
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
//			alert("orgId="+org+"对象类型="+objectType);
			$.ajax({
				url : $.cxt + "/exam/selectOrgByPid",
				//请求方式
				type : "POST",
				async : false,
				//传递到后台的参数
				data : {
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

			$('#add_indexTable').jqGrid(
					{

						data : [],
						datatype : "local",
						mtype : "POST",
						height : topjqGridHeight(),
						autowidth : true,
						height:"auto",
						colNames : [ '指标分类', '目标值' ,'指标名称', '权重', '指标定义', '周期类型',
								'考核规则', '操作', 'ID', '规则JSON' ],
						colModel : [ {
							name : 'KPI_TYPE',
							align : 'center'
						}, {
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
							align : 'center'
						}, {
							name : 'KPI_ROLESTR',
							align : 'left'
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
						}, ],
						viewrecords : true,
						rownumbers : true,
						loadComplete : topjqGridLoadComplete
					});

			function stateOperation(cellvalue, options, cell) {
				var html = "";
				html += "<a    onclick=\"showSetRole('" + options.rowId
						+ "')\" href=\"#\">规则配置</a>";

				return html;
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
				width:980,
				bottons : [ {
					title : "保存",
					fun : function() {
						
						var isEmpty = $.isEmptyObject(selectArr);
						if(isEmpty){
							messageAlert("至少选择一条数据");
							return false;
						}
						
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
		
		
	});
	
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
</script>
