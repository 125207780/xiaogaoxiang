$(function (){
	initSelect();
	initGrid();
});
function initSelect(){
	var a ='已考核'
	html ="";
	html += "<option  value=\"" + 2 + "\">" + a +"</option>";
	$("#performance_select").html(html);
}
var updateMap={} ;
var initMap =[];

$("#performance_select").on("change",changeTable)
function changeTable(){
	var status = $("#performance_select").val();
	var modelID =$("#modelInput_id").val();
	
	$("#performance_table").jqGrid('clearGridData');
	$("#performance_table").jqGrid('setGridParam',{  // 重新加载数据
		postData: {modelID:modelID,status:status},   //  newdata 是符合格式要求的需要重新加载的数据 
	}).trigger("reloadGrid");

}
function initGrid(){
	var status = $("#performance_select").val();
	var modelID =$("#modelInput_id").val();
	
	$("#performance_table").jqGrid({
			url : $.cxt + "/exam/initPerformaceTable",
			postData:{modelID:modelID,status:status},
			datatype : "json",
			mtype: "POST",
			height : "auto",
			autowidth : true,
			colNames : ['ID', '指标分类', '指标名称','权重','指标定义','考核对象','对象类型','周期类型','指标值','目标值','考核规则','初始得分','得分' ],
			colModel : [ 
				  {name : 'RANK_ID',align : 'center',hidden:true}, 
			      {name : 'KPI_TYPE',align : 'center'}, 
			      {name : 'KPI_NAME',align : 'center'}, 
			      {name : 'KPI_WEIGHT',align : 'center'}, 
			      {name : 'KPI_DEFINE',align : 'center'}, 
			      {name : 'OBJECT_NAME',align : 'center'},   
			      {name : 'OBJECT_TYPE',align : 'center'}, 
			      {name : 'EVALUATE_CYCLE_TYPE',align : 'center'}, 
			      {name : 'KPI_VALUE',align : 'center'}, 
			      {name : 'TARGET_VALUE',align : 'center'}, 
			      {name : 'KPI_ROLEJSON',align : 'center'}, 
			      {name : 'KPI_SCORE',align : 'center',hidden:true}, 
			      {name : 'AAA',align : 'center',formatter : addInput}, 
			     ],
			viewrecords : true,
			rownumbers: true,
			rowNum : 10,
/*			multiselect: true,
*/			rowList : [ 10, 20, 30 ],
			pager : '#performance_grid',
			loadComplete : topjqGridLoadComplete,
			gridComplete:function() {
				for(var key in updateMap){
					$('#'+key).val(updateMap[key]);
				};
				
			},
	});
}

function addInput (cellvalue,options,rowdata){					
			
					var lastScore = rowdata.KPI_SCORE;	
					var input='<input   class="grid-table-input" id="'+rowdata.RANK_ID+'" value="'+lastScore+'" type="text" />';
					return input;   

}
/*function gridTableInput(id){
	
	var rowData = $("#performance_table").jqGrid('getRowData',id);
	console.log(id)   //1
	console.log(rowData)//
	var lastScore = rowData.KPI_SCORE;
	console.log(lastScore)//0
	console.log($('#'+rowData.RANK_ID).val()) //?
	var newScore =$('#'+rowData.RANK_ID).val();
	console.log(newScore)//undefined
	var RANK_ID = rowData.RANK_ID;
	console.log(RANK_ID)//123
	console.log((typeof(parseInt(newScore))))
	console.log(/^[0-9]$/.test(newScore));
	if(newScore==""){  //提示框
		updateMap[RANK_ID]=newScore;
		messageAlert("得分值为空,在点击确认后将会被修改为未考核状态")
	}else if(!/^[0-9,.]*$/.test(newScore)){
		$('#'+rowData.RANK_ID).val(lastScore);
		messageAlert("请输入规范的分数")
		return;
	}else if(parseInt(newScore)>=(parseInt(rowData.KPI_WEIGHT)+1)){
		$('#'+rowData.RANK_ID).val(lastScore);
		messageAlert("不可以超过权重分数")
		return;
	}else if(newScore==lastScore){
		
	}else{
		updateMap[RANK_ID]=newScore;
	}
	console.log(updateMap);
}*/
/*function gridTableInput(id){
	
		var rowData = $("#performance_table").jqGrid('getRowData',id);
		console.log(id)   //1
		console.log(rowData)//
		var lastScore = rowData.KPI_SCORE;
		console.log(lastScore)//0
		console.log($('#'+rowData.RANK_ID).val()) //?
		var newScore =$('#'+rowData.RANK_ID).val();
		console.log(newScore)//undefined
		var RANK_ID = rowData.RANK_ID;
		console.log(RANK_ID)//123
		if(newScore==""){  //提示框
			updateMap[RANK_ID]=newScore;
			messageAlert("得分值为空(0),在点击确认后将会被修改为未考核状态")
		}else if(parseInt(newScore)>parseInt(rowData.KPI_WEIGHT)){
			$('#'+rowData.RANK_ID).val(lastScore);
			messageAlert("不可以超过权重分数")
		}else if(newScore==lastScore){
			
		}else{
			updateMap[RANK_ID]=newScore;
		}
		console.log(updateMap);
}*/

$("#preformacedefine_id").on("click", define);
function define (){
	var ss =JSON.stringify(updateMap);
	console.log(ss)
	$.ajax({
		url : $.cxt + "/exam/updateGridRank",
	 	type : "POST",
	 	dataType : 'json',
	 	data : {UpdataJson:JSON.stringify(updateMap)},
	 	success:function(json){
	 		var status = $("#performance_select").val();
	 		var modelID =$("#modelInput_id").val();
	 		$("#performance_table").jqGrid('clearGridData');
	 		$("#performance_table").jqGrid('setGridParam',{  // 重新加载数据
	 			postData: {modelID:modelID,status:status},   //  newdata 是符合格式要求的需要重新加载的数据 
	 		}).trigger("reloadGrid");
	 		messageAlert("修改成功！")
	 		topwindow.removeWindow();//关闭窗口
	 	}	
		});
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
