//对象类型数组
var param = [];
//当前页码
var page = $("#page").val();
//显示行数
var rows = $("#rows").val();
//左上角模糊搜索条件
var context;
//行数组
var obj = new Object;
$(function() { 
	
	 
	//增加的方法
	$("#btnAdd").click(function(){

		topwindow.showWindow({
			//窗口名称  
			title : "新增模板",
			width : 1000,
			height:550,
			//url  
			url :  $.cxt + "/pages/gis/exam/addModel.jsp",
			bottons : [{
				title : "保存", 
				fun : function() {
					var examModel = [];
					//获取周期类型
					var type = $("#add_cycleType").val();
					examModel.push(type);
					//获取考核开始时间
					var startDate = $("#add_startDate").val();
					if (startDate === null || startDate === undefined || startDate === '') {
						messageAlert("开始时间不能为空");
						return false;
					} 
					examModel.push(startDate);
					//获取考核结束时间
					var endDate = $("#add_endDate").val();
					examModel.push(endDate);
					//获取描述信息
					var desc = $("#desc").val();
					examModel.push(desc);
					//创建人
					var orgId = $("#orgId").val();
					examModel.push(orgId);
					//获取网格名称
					var gridName = $("#add_gridName").val();
					examModel.push(gridName);
					var examInput = JSON.stringify(examModel);
					
					var objParam = [];
					//获取对象类型
					var objectType = $("#add_objectType").val();
					if (objectType === null || objectType === undefined || objectType === '') {
						messageAlert("对象类型不能为空");
						return false;
					} 
					objParam.push(objectType);
					//获取对象名称
					var objectName = $("#add_objectName").val();
					if (objectName === null || objectName === undefined || objectName === '') {
						messageAlert("对象名称不能为空");
						return false;
					} 
					objParam.push(objectName);
					var objInput = JSON.stringify(objParam);
					
					//获取table表格中所有的记录条数
					var rowData = $("#add_indexTable").jqGrid('getRowData');
					if(rowData == "" || rowData == ''){
						messageAlert("指标不能为空");
						return false;
					}
					for(var i = 0; i < rowData.length; i++){
						obj[i] = rowData[i];
						if( rowData[i].KPI_ROLESTR==""){
							messageAlert("考核规则不能为空");
							return;
						}
					}
					var jsonStr = JSON.stringify(obj);
					
					$.ajax({
						url : $.cxt + "/kpiIndex/insertExamKpi",
						dataType : "json",
						async : false,
					 	type : "POST",
					 	data : {jsonStr:jsonStr,examInput:examInput,objInput:objInput},
					 	success : function(json){
					 		var data = JSON.parse(json);
                			if(data.code == '0'){
                				topwindow.removeWindow();//关闭窗口
                				topshowAlertSuccessDiv();//操作提示
        						//刷新父窗口，重新查询
        						searchExamModel(1,9,"","");
                			}
					 	}
					 });
					 
					 /*$.ajax({
							url : $.cxt + "/exam/insertToGridRankDetail",
							dataType : "json",
						 	type : "POST",
						 	data : {jsonStr:jsonStr,examInput:examInput,objInput:objInput},
						 	success : function(json){
						 		var data = JSON.parse(json);
	                			if(data.code == '0'){
	                				topwindow.removeWindow();//关闭窗口
//	        						topshowAlertSuccessDiv();//操作提示
	        						//刷新父窗口，重新查询
	        						searchExamModel(1,9,"","");
	                			}
						 	}
						 });*/
					 	
					 
				}
			},{
				title:'清除',
				fun:function(){
					//获取周期类型
					var type = $("#add_cycleType").val('');
					//获取考核开始时间
					var startDate = $("#add_startDate").val('');
					//获取考核结束时间
					var endDate = $("#add_endDate").val('');
					//获取描述信息
					var desc = $("#desc").val('');
					//创建人
					var orgId = $("#orgId").val('');
					//获取网格名称
					var gridName = $("#add_gridName").val('');
					
					//获取对象类型
					var objectType = $("#add_objectType").val('');
					//获取对象名称 清空
					$("#add_objectName").empty();
					$("#add_objectName").trigger("chosen:updated")
					
					//清空表格
					$("#add_indexTable").jqGrid('clearGridData'); 
				
				}
				
			}]
		});
	});

	
	//无条件，默认查询
	searchExamModel(page,9,param,context);
	
	//右侧复选框选中查询
	checkBoxSearch();
	
});
	//点击查询按钮，模糊条件查询
	function findByContext(){
		//获取文本值
		context = $("#context").val(); 
		
		searchExamModel(page,rows,param,context);
	}

	//查询方法
	function searchExamModel(page,rows,param,context){
		//如果是上一页点击事件，重新加载右侧复选框选中的选项
		if(param == "" || param.length ==0){
			//获取所有复选框
			var obj= document.getElementsByName("checkName");
			//循环所有选中的对象，添加到param中
			for(var i = 0; i < obj.length; i++){
				if(obj[i].checked){
					//这里不是this(指的是#check对象)，使用obj[i]才是当前对象
					var a = $(obj[i]).val();
					//把选中的元素添加到数组中
					param.push(a);
				}
			}
		}
		//如果是上一页或者复选框点击事件，重新加载模糊查询条件
		if(typeof(context) == "undefined"  || context == ""){
			context = $("#context").val(); 
		}
		//中文传递到后台需要转码,这里是因为每次都会被清空，所以不需要解码
		var data= encodeURI(param); 
		//点击下一页会出现多次编码，导致后台解码有误，所以每次都先解码，再编码
		context= decodeURI(context); 
		context= encodeURI(context); 
		$.ajax({
			url : $.cxt + "/exam/selectExamModel",
			//请求方式
			type : "POST",
			//传递到后台的参数
			data : {inParam:data,p:page,r:rows,context:context},
			success : function(json){
				//解析后台返回值
				var object = $.parseJSON(json);
				//行记录数
  				var list = object.rows;
  				//总页数
  				var total = object.total;
  				//总记录条数
  			    var records = 	object.records;
				//总长度
				var len = list.length;
				//每一次到先把页面清空，再重新加载，这样不会重复
				$("#dataTable").empty();
				$("#pageDiv").empty();
				for (var y = 0; y < 3; y++) {
					var tr = $("<tr></tr>");
					$("#dataTable").append(tr);
					for (var x = 0; x < 3; x++) {
						var index = y * 3 + x;
						var td = null;
						var objDiv = '&nbsp;'
						if (index < len) {
							var obj = list[index];
							//当前对象的id
							var id = obj.id;
							objDiv ='<div class="table-list">'
								+'<div class="title">'+ obj.objectTypeNew +'</div>'
								+'<div class="sec">'
								+'<strong>考核对象 ：</strong>'+obj.examObjectList+'<br><strong>创建时间 ：</strong>'+obj.createTime+' <br>'
								+'<strong>创建人：</strong>'+obj.createPerson+'<br> '
								+'<strong>周期类型：</strong>'+obj.cycleTypeNew+' <br><strong>模板描述 ：</strong>'+obj.templateDescription+'<br>'
								+'</div>'
								+'<div class="btn-groups">'
								+'<button class="btn btn-primary" onClick="showObj(\''+id+'\')">查看</button>'
								+'<button class="btn btn-primary" onClick="editObj(\''+id+'\')">编辑</button>'
								+'<button class="btn btn-primary" onClick="deleteObj(\''+id+'\')">删除</button>'
								+'</div>'
								+'</div>';

						}
						td = $('<td width="33%">' + objDiv + '</td>');
						//拼接
						tr.append(td);
						
					}
				}
				//当记录数大于9条时，才显示上下页，不然就单页显示，
				if(records > 9){
					var beforeBtn = $("<span>上一页</span>");
					var nextBtn =$("<span>下一页<span>");
					//当有多页，并且不是第一页时，可以点击上一页。否则不可以点击
					if(page!=1){
						 beforeBtn.click(function(){
							 searchExamModel(--page,9,param,context);
						 })
						beforeBtn.addClass("pageBtn");
					}else{
						beforeBtn.addClass("pageNoBtn");
					}
					//当有多页，并且不是最后一页时，可以点击下一页，否则不可以点击 
					if(page<total){
						nextBtn.click(function(){
							searchExamModel(++page,9,param,context);
						})
						nextBtn.addClass("pageBtn");
					}else{
						nextBtn.addClass("pageNoBtn");
					}
					
					$("#pageDiv").append(beforeBtn).append(nextBtn);
				}
				
			}
		});
		//每次时间查询之后，重新加载，不然会重复
		param.splice(0,param.length);
	}
	
	function showObj(str) {
		   topwindow.showWindow({
			   title : "网格查看",
			   data:{id:str},
				url : $.cxt + "/pages/gis/exam/showObj.jsp",
				bottons : [] 
		   })
	}
	
	function editObj(str){
		topwindow.showWindow({
			//窗口名称
			title : "网格修改",
			width : 1000,
			data:{id:str},
			url :  $.cxt + "/pages/gis/exam/editObj.jsp",
			bottons : [{
				title : "保存", 
				fun : function() {
					var examModel = {};
					var type = $("#add_cycleType").val(); //周期类型
					var startDate = $("#add_startDate").val();//开始时间
					var endDate = $("#add_endDate").val();//结束时间
					var desc = $("#desc").val();//描述
					var gridName = $("#add_gridName").val();//网格名称
					var objectType = $("#add_objectType").val();//对象类型
					examModel.type=type;
					examModel.startDate=startDate;
					examModel.endDate=endDate;
					examModel.desc=desc;
					examModel.gridName=gridName;
					examModel.objectType=objectType;		
					var examInput = JSON.stringify(examModel);
					if(startDate==""){
						messageAlert("必须填写对象名称！");
						return;
					}
					if($("#add_objectName").val()==null){
						messageAlert("必须填写对象名称！");
						return;
					}
					var objectName = [];
					objectName = $("#add_objectName").val();//对象名称
					var objInput = JSON.stringify(objectName);
					
					var obj =[];
					var kpiRstr="";
					var rowData = $("#add_indexTable").jqGrid('getRowData');
					console.log(rowData[0]);
					if(rowData==""){
						messageAlert("必须填写指标！");
						return;
					}
					for(var i = 0; i < rowData.length; i++){
						if( rowData[i].KPI_ROLESTR==""){
							messageAlert("必须写考核规则！");
							return;
						}
						obj[i] = rowData[i];
					}
					var jsonStr = JSON.stringify(obj);
					console.log("obj------------------")
					console.log(objInput)
					console.log("examModel----------------")
					console.log(examModel)		
					console.log("json--------------")
					console.log(jsonStr)
					
					 $.ajax({
						url : $.cxt + "/exam/UpdateObj",
						dataType : "json",
					 	type : "POST",
					 	data : {jsonStr:jsonStr,examInput:examInput,objInput:objInput,id:str} ,
					 	success : function(data) {
					 		topwindow.removeWindow();//关闭窗口
//							topshowAlertSuccessDiv();//操作提示
							//刷新父窗口，重新查询
							searchExamModel(1,9,"","");
					 }
					 });
					
					var examArr = [];
					var type = $("#add_cycleType").val();
					examArr.push(type);
					var startDate = $("#add_startDate").val();
					examArr.push(startDate);
					var endDate = $("#add_endDate").val();
					examArr.push(endDate);
					var desc = $("#desc").val();
					examArr.push(desc);
					var orgId = $("#orgId").val();
					examArr.push(orgId);
					var gridName = $("#add_gridName").val();
					examArr.push(gridName);
					var examIn = JSON.stringify(examArr);
					
					
					var objIn = [];
					//获取对象类型
					var objectType = $("#add_objectType").val();
					objIn.push(objectType);
					//获取对象名称
					var objectName = $("#add_objectName").val();
					objIn.push(objectName);
					var objIn = JSON.stringify(objIn);
					
					
					//获取table表格中所有的记录条数
					var objList = new Object;
					var rowDataList = $("#add_indexTable").jqGrid('getRowData');
					for(var i = 0; i < rowDataList.length; i++){
						objList[i] = rowDataList[i];
					}
					var jsonArr = JSON.stringify(objList);
					
					 $.ajax({
							url : $.cxt + "/exam/updateGridRankDetail",
							dataType : "json",
						 	type : "POST",
						 	data : {jsonStr:jsonArr,examInput:examIn,objInput:objIn,examId:str} ,
						 	success : function(data) {
						 		topwindow.removeWindow();//关闭窗口
//								topshowAlertSuccessDiv();//操作提示
								//刷新父窗口，重新查询
								searchExamModel(1,9,"","");
						 	}
						 });
					 
					 
					
				}
			}]
		});
	}
	
	function deleteObj(deleteId){
		topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/exam/deleteExamModelById",
			//入参
			data : {id : deleteId},
			type : "POST",
			success : function(result){
				if(result == -1){
					messageAlert("删除失败");
				}else{
					messageAlert("删除成功");
					//刷新父窗口，重新查询
					searchExamModel(1,9,"","");
				}
			}
		});
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
	function checkBoxSearch(){
		//循环遍历复选框
		$.each($("#check"),function(){
			$("input[type='checkbox']").click(function(){
				//获取所有复选框
				var obj= document.getElementsByName("checkName");
				//循环所有选中的对象，添加到param中
				for(var i = 0; i < obj.length; i++){
					if(obj[i].checked){
						//这里不是this(指的是#check对象)，使用obj[i]才是当前对象
						var a = $(obj[i]).val();
						//把选中的元素添加到数组中
						param.push(a);
					}
				}
				//每次点击复选框，查询事件
				searchExamModel(page,9,param,context);
				
			});
		});
		
	}
	
	
	
	
	 
	
	
	