<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
 

<div>
	<label>指标分类</label>
	<select id="sel_indexType" style="width:150px;">
		<option>请选择</option>
	</select>
	<button type="button" class="btn btn-primary" id="sel_queryBtn"  >查询</button>
</div>
<div>
	<table id="sel_indexTable"></table>
</div>
<div id="sel_indexTable-pager" ></div>
<script type="text/javascript">
var selectArr =[];
$( function() {
	$("#sel_queryBtn").click(queryIndexTable);	
	initIndexTable();  	
	
	initKpiType();

	function initIndexTable(){
		//先根据父页面的表格，初始化selectArr
		var  add_indexTableData = $("#add_indexTable").jqGrid('getRowData');
		for(var i=0,n=add_indexTableData.length;i<n;i++){
			var obj = add_indexTableData[i];
			selectArr[obj.KPI_ID]=obj;
			console.log(obj)
		}
		
		//对象类型
		var  objectType = $("#add_objectType").val();
		//指标分类下拉框
		var  indexType = $("#sel_indexType").val();
		//周期类型必选条件
		var  cycleType = $("#add_cycleType").val();

		$('#sel_indexTable').jqGrid({
			url : $.cxt + "/kpiIndex/selectKpiGrid",
			datatype: "json",
			mtype: "POST",
			postData : {cycleType:cycleType,indexType:indexType},
			height : "auto",
			autowidth : true,
			colNames : [ '指标分类','目标值', '指标名称','权重','指标定义','周期类型','ID' ],
			colModel : [ 
			      {name : 'KPI_TYPE',align : 'center'}, 
			      {name : 'TARGET_VALUE',align : 'center'}, 
			      {name : 'KPI_NAME',align : 'center'}, 
			      {name : 'KPI_WEIGHT',align : 'center'}, 
			      {name : 'KPI_DEFINE',align : 'center'}, 
			      {name : 'CYCLE_TYPE',align : 'center'}, 
			      {name : 'KPI_ID',align : 'center',hidden : true}, 
			     ],
			viewrecords : true,
			rownumbers: true,
			multiselect: true,
			rowNum : 10,
			rowList : [ 10, 20, 30 ],
			pager : '#sel_indexTable-pager',
			 
			loadComplete : topjqGridLoadComplete,
			gridComplete:function() {
			    var _this = this;
			    var rowData = $(_this).jqGrid('getRowData');
			    for(var i =0,n=rowData.length;i<n;i++){
			    	var obj = rowData[i];
			    	if(selectArr[obj.KPI_ID]){
			    		 $(_this).jqGrid('setSelection',i+1,false);
			    	}
			    }
			},
			onSelectRow:function(rowid,state, e) {
				var obj = $(this).jqGrid('getRowData',rowid);
			    if(state){
			    	selectArr[obj.KPI_ID]=obj;
			    }else{
			    	if(selectArr[obj.KPI_ID]){
			    		delete  selectArr[obj.KPI_ID];
			    	} 
			    }
			},
			onSelectAll:function(aRowids,status) {
	            var _this = this;
	            var rowData = $(_this).jqGrid('getRowData');
	            for(var i=0,n=rowData.length;i<n;i++){
	            	var obj = rowData[i];
	            	if(status){
	            		selectArr[obj.KPI_ID]=obj;
		            }else{
		            	if(selectArr[obj.KPI_ID]){
		            		delete  selectArr[obj.KPI_ID];
				    	} 
		            }    
	            }
	                   
	        },

		});
	}
		
	function queryIndexTable(){
		//指标分类下拉框
		var  indexType = $("#sel_indexType").val();
		//周期类型必选条件
		var  cycleType = $("#add_cycleType").val();
		//获取当前页
		//var page = $('#sel_indexTable').getGridParam('page');
		
		
		//alert("周期类型="+cycleType);
		//alert("标分类下拉框="+indexType); 
	 
		
		
		$("#sel_indexTable").jqGrid('setGridParam',{    
		    postData : {
		    	"cycleType":cycleType,
		    	"indexType":indexType
		    },  
		    page : 1    
		}).trigger("reloadGrid"); 
		
	}
	
	
	function initKpiType(){
		$.ajax({
			url : $.cxt + "/kpiIndex/selectKpiTypeByOrgId",
			datatype: "json",
			mtype: "POST",
			success: function(data){
				for(var i = 0; i < data.length; i++){
					var kpiType = data[i].KPI_TYPE;
					var option = $("<option value='"+kpiType+"'>" + kpiType
							+ "</option>");
					$("#sel_indexType").append(option);
				}
				$("#sel_indexType").trigger("chosen:updated");
			}
		});
	}
	
});
</script>
 