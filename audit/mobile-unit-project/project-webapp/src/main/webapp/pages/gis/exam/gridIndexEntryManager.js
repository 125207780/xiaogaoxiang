var selectArr=[];
$(function(){
    initTable();
	initOption();
	$("#searchList").click(function(){
		doSearch();
	});
	$("#myModalClose").click(function(){
		$('#myModal').modal('hide');
	});
	$("#change").click(function(){
		doChangeVal();
	});
	$("#submit").click(function(){
		doSubmit();
	});
	$("#reject").click(function(){
		doReject();
	});
	$("#adc").click(function(){
		$('#myModal').modal('hide');
		addName();
	});
	 initNameOption();
})


var num=0;	
function initTable(){
	
   $("#gridInfoListGrid").jqGrid('clearGridData');
   $("#gridInfoListGrid").jqGrid({ 
	   url : $.cxt + "/firstPage/getManagerTable",
	   datatype : "json",
	   mtype : "POST",
	   postData : {orgId:orgId},
	   height : "auto",
	   autowidth : true,
	   colNames: [ '周期类型', '指标分类', '指标名称', '指标定义','目标值','权重' ,'UUID','STATUS','ORG_ID'], 
	   colModel: [ 
	       { name: 'CYCLE_TYPE', index: 'CYCLE_TYPE',align: 'center' ,formatter : parseData}, 
	       { name: 'KPI_TYPE', index: 'KPI_TYPE', align: 'center'}, 
	       { name: 'KPI_NAME', index: 'KPI_NAME',align: 'center'}, 
	       { name: 'KPI_DEFINE', index: 'KPI_DEFINE',align: 'center'}, 
	       { name: 'TARGET_VALUE',index:'TARGET_VALUE',align:'center',formatter : addInput},
	       { name: 'KPI_WEIGHT',index:'KPI_WEIGHT',align:'center'},
	       { name: 'KPI_ID', index: 'KPI_ID',  align:'center',  hidden:'true',formatter : tirmInside}, 
	       { name: 'STATUS', index: 'STATUS',  align:'center',  hidden:'true'}, 
	       { name: 'ORG_ID', index: 'ORG_ID',  align:'center',  hidden:'true'}
	       /*  {name : 'BIG_TYPE',align : 'center',hidden : true},
		      {name : 'edit',align : 'center',formatter : addButton}, */
	   ], 
		//shrinkToFit:false,
		multiselect: true,
		//autoScroll: true,
		viewrecords : true,
		//beforeSelectRow: beforeSelectRow,
		//rownumbers: true,
		rowNum : 10,
		rowList : [ 10,20, 30 ],
		pager : '#gridInfoListPagers',
		loadComplete : topjqGridLoadComplete,
		gridComplete:function() {
		    var _this = this;
		    var rowData = $(_this).jqGrid('getRowData');
		    for(var i =0,n=rowData.length;i<n;i++){
		    	var obj = rowData[i];
		    	//var rowData = $("#idx_table").jqGrid('getRowData',rowId);
		    	if(selectArr[obj.KPI_ID]){
		    		 $(_this).jqGrid('setSelection',i+1,false);
		    	}
		    }
		},
		//这里和beforeSelectRow()俩个函数，一起组合让jqGrid表格单选，
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
 //查询按钮
	
}
function initOption(){
	$("#girdDateType").empty();
	$("#girdDateType").append($("<option value=''>"+'请选择...'+"</option>")).append(
			$("<option value=month>"+"月"+"</option>")
	    ).append(
			$("<option value=quarter>"+'季'+"</option>")
	    ).append(
			$("<option value=year>"+'年'+"</option>")
	    );
	$("#girdStatus").empty();
	$("#girdStatus").append($("<option value=''>"+'请选择...'+"</option>")).append(
			$("<option value=F>"+'已录入'+"</option>")
	    ).append(
			$("<option value=S>"+'已同意'+"</option>")
	    );
	 
	}

function doSearch(){
	selectArr=[];
	var date = $("#girdDateType").val() ?  $("#girdDateType").val() : '';
	var name = $.trim($("#girdIndex").val()) ?  $.trim($("#girdIndex").val()) : '';
	var status =$("#girdStatus").val() ?  $("#girdStatus").val() : '';
	$("#gridInfoListGrid").jqGrid("setGridParam",{
		url:$.cxt+"/firstPage/getSearchManagerTable",
		datatype:"json",
		postData : {"orgId":orgId,"date":date,"name":name,"status":status},
		
	}).trigger('reloadGrid');
}
function doSubmit(){
	 
	var isEmpty = $.isEmptyObject(selectArr);
	if(isEmpty){
		messageAlert("至少选择一条数据");
		return false;
	}
	
	var KPI_ID1='';
	for(var key in selectArr){
		var rowData = selectArr[key];
		var a=rowData.KPI_ID;
		var n=$("#Z_"+a+"").val();
		var num=$.trim(n);
		//alert(num);
		if(rowData.STATUS=='F' && num!=null && num!=''){
			KPI_ID1+=$.trim(rowData.KPI_ID)+",";
		}else{
			KPI_ID1='';
			messageAlert("所选的数据不能提交");
			return false;
		}
	}
	KPI_ID1=KPI_ID1.substring(0,KPI_ID1.length-1);
	$.ajax({
		url : $.cxt + "/firstPage/getManagerUpdateTable",
		type: "POST",
		data:{
			orgId:orgId,
			KPI_ID:KPI_ID1
		},
		async : false,
		success: function(json){
			var data  = JSON.parse(json)
			if(data.code == '0'){
				doSearch();
				messageAlert("更新成功");
			}
		}
	}) 
	//doSubmit();
	
}
function doReject(){
	var isEmpty = $.isEmptyObject(selectArr);
	if(isEmpty){
		messageAlert("至少选择一条数据");
		return false;
	}
	
	var KPI_ID1='';
	for(var key in selectArr){
		var rowData = selectArr[key];
			if(rowData.STATUS=='F'){
				KPI_ID1+=$.trim(rowData.KPI_ID)+",";
			}else{
				KPI_ID1='';
				messageAlert("所选的数据不能驳回");
				return false;
			}
	}
	KPI_ID1=KPI_ID1.substring(0,KPI_ID1.length-1);
	$.ajax({
		url : $.cxt + "/firstPage/getManagerRejectTable",
		type: "POST",
		data:{
			orgId:orgId,
			KPI_ID:KPI_ID1
		},
		async : false,
		success: function(json){
			var data  = JSON.parse(json)
			if(data.code == '0'){
				doSearch();
				messageAlert("更新成功");
			}
		}
	}) 
	//doSubmit();
	
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
function beforeSelectRow(rowId, e) {
	/*alert("重新加载");
    $("#channelTable").jqGrid("resetSelection");
    return true;*/
	var selId=$(this).jqGrid("getGridParam","selrow");
		$(this).jqGrid("resetSelection");
	if(selId==rowId){
		$(this).jqGrid("setSelection",rowId,false);
	}
	return true;
	
}
function tirmInside(cellValue) {
	return $.trim(cellValue);
}
function handleVal(rowObject,cellValue){
	var n=$("#Z_"+rowObject+"").val();
	var num=$.trim(n);
	if(isNaN(num)){
		messageAlert("请填写正确的数字");
	}
	if(!isNaN(num)&&num!=''&&num!=null && cellValue!=num){
		$.ajax({
			url : $.cxt + "/firstPage/getManagerBlur",
			type: "POST",
			data:{
				orgId:orgId,
				KPI_ID:rowObject,
				val:num
			},
			async : false,
			success: function(json){
				var data  = JSON.parse(json)
				if(data.code == '0'){
					doSearch();
					//messageAlert("更新成功");
				}
			}
		})
	}
	
     //alert($("#Z_"+rowObject+"").val());
}
function addInput(cellValue, options, rowObject) {
	if(cellValue=='' || cellValue==null ||cellValue==undefined){
		var a=$.trim(rowObject.KPI_ID);
		//alert(a);
		var b=$.trim(rowObject.STATUS);
		if(b=="F"){
			var html = $("<div></div>")
	        .append($("<input id=Z_"+a+"  onmouseout=handleVal('"+a+"','"+cellValue+"') type=\"text\">")).html();
			//var m = $('<li class="search-choice"><span  value="market' + othernum + '">' + name + "[" + phone + "]" + '</span></li>');
	        return html;
		}else{
			var html = $("<div></div>")
	        .append($("<input id=Z_"+a+" type=\"text\">")).html();
	        return html;
		}
		
	}else{
		var a=$.trim(rowObject.KPI_ID);
		var b=$.trim(rowObject.STATUS);
		//alert(b);
		if(b=="F"){
			var html = $("<div></div>")
	        .append($("<input id=Z_"+a+"  onmouseout=handleVal('"+a+"','"+cellValue+"') type=\"text\" value="+cellValue+">")).html();
	        return html;
		}else{
			var html = $("<div></div>")
	        .append($("<input id=Z_"+a+" type=\"text\" value="+cellValue+">")).html();
	        return html;
		}
		
		
	}
	
	
}

function doChangeVal(){
	 
	var isEmpty = $.isEmptyObject(selectArr);
	if(isEmpty){
		messageAlert("至少选择一条数据");
		return false;
	}
	
	var KPI_ID1='';
	for(var key in selectArr){
		var rowData = selectArr[key];
		if(rowData.STATUS=='F'){
			KPI_ID1+=$.trim(rowData.KPI_ID)+",";
		}else{
			KPI_ID1='';
			messageAlert("所选的数据不能修改目标值");
			return false;
		}
	}
	KPI_ID1=KPI_ID1.substring(0,KPI_ID1.length-1);
	messageVal("请填写合理的目标值",KPI_ID1);
	
}
function messageVal(message,KPI_ID){
	bootbox.dialog({
        message: "<span style=\"color:#000\">"+message+"</span><input id='target' type='number'>",
        title: "消息提示",
        buttons: {
            OK: {
                label: "确定",
                className: "btn-success",
                callback: function() {
                	var valnum= $.trim($("#target").val());
                	if(valnum!=null &&valnum!=''&&valnum!=undefined){
                	$.ajax({
                		url : $.cxt + "/firstPage/getManagerUpdateValTable",
                		type: "POST",
                		data:{
                			orgId:orgId,
                			KPI_ID:KPI_ID,
                			val:$.trim($("#target").val())
                		},
                		async : false,
                		success: function(json){
                			var data  = JSON.parse(json)
                			if(data.code == '0'){
                				doSearch();
                				messageAlert("修改成功");
                			}
                		}
                	})
                	}else{
                		//messageAlert("修改成功");
                	}
                }
            }
        }
    });
}
function initNameOption(){
	$("#form-field-select-4").empty();
	$.ajax({
		url : $.cxt + "/firstPage/getSupplyOptionName",
		type: "POST",
		data:{
			orgId:orgId
		},
		async : false,
		success: function(json){
			var data  = JSON.parse(json)
			if(data.code == '0'){
				var list=data.data;
				for(var i=0;i<list.length;i++){
					$("#form-field-select-4").append(
							$("<option value="+list[i].KPI_NAME+">"+list[i].KPI_NAME+"</option>")	
					).chosen();
					$("#form-field-select-4").trigger("chosen:updated");
					//$("#form-field-select-4").trigger("chosen:updated");   .chosen(); 使select好用的两句
				}
			}
		}
	})
	/*$("#form-field-select-4").append($("<option value=''>"+'请选择...'+"</option>")).append(
			$("<option value=month>"+"月"+"</option>")
	    ).append(
			$("<option value=quarter>"+'季'+"</option>")
	    ).append(
			$("<option value=year>"+'年'+"</option>")
	    );
	$("#girdStatus").empty();
	$("#girdStatus").append($("<option value=''>"+'请选择...'+"</option>")).append(
			$("<option value=F>"+'已录入'+"</option>")
	    ).append(
			$("<option value=S>"+'已同意'+"</option>")
	    );*/
	 
	}
function addName(){
	
	
	var name= $("#form-field-select-4").val();
	if(name==""||name==null||name!=undefined){
		return false;
	}
	if(name!=""&&name!=null&&name!=undefined){
		var nameVal='';
		for(var i=0;i<name.length;i++){
			nameVal+=name[i]+",";
		}
	}
	$.ajax({
		url : $.cxt + "/firstPage/saveSupplyName",
		type: "POST",
		data:{
			orgId:orgId,
			nameVal:nameVal
		},
		async : false,
		success: function(json){
			var data  = JSON.parse(json)
			if(data.code == '0'){
				var list=data.data;
				
			}
		}
	})
	
	 
	}
function parseData(cellValue, options, rowObject) {
	if('month'==cellValue){
		return '月';
	}
	if('year'==cellValue){
		return '年';
	}
	if('quarter'==cellValue){
		return '季度';
	}
	return cellValue;
	
}