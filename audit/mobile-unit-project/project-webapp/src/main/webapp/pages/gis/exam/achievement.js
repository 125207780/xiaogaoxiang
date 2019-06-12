var param = [];
var page = $("#page").val();
var rows = $("#rows").val();

var obj = new Object;
$(function(){
	initLeftTree();
	 var context = $("#context").val(); 
	 var gridName = $("#gridName").val();
	 var CycleType =$("#CycleType").val();
	searchExamModel(page,9,param,context,gridName,CycleType,"","");
//右侧复选框选中查询
	checkBoxSearch();
});
//loadting tree有封装好的，暂时先用这个

function initLeftTree(){

var setting = {
		 view:{  
                selectedMulti:false  
            } ,
            data: {  
                keep:{  
                    parent:true,  
                    leaf:true  
                },  
                simpleData: {  
                    enable: true  
                }  
            },
            callback: {
        		onClick: zTreeOnClick
        	}
    };
  $.ajax({
	  url:$.cxt + "/gridCommon/getLeftTree", 
	  
	  type: "POST",
	  success : function (zNodes){
		var  treeObj =	$.fn.zTree.init($("#infoTree"), setting, zNodes);
//			treeObj.expandAll(false);
		var nodes = treeObj.getNodes();
		for (var i = 0; i < nodes.length; i++) { //设置节点展开
            treeObj.expandNode(nodes[i], true, false, true);
        }
	  }
  })

function zTreeOnClick(event, treeId, treeNode){
	  console.log(treeNode);
	
	  searchExamModel(page,9,param,"","","",treeNode.id,treeNode.orglevel);
	  
  }
}

	
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
				var object = $.parseJSON(json);
  				var list = object.rows;
  				var total = object.total;
  			    var records = 	object.records;
				var len = list.length;
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
							console.log(obj)
							var id = obj.id;
							objDiv ='<div style="width: 100%">'
								+'<div  style="width: 100%; height: 28px; background-color: #03233C;text-align: center;color: #fff;'
								+'border: 1px solid #00e1fd;">'+ obj.objectTypeNew +'</div>'
								+'<div style="width: 100%; height: 106px; border: 1px solid #00e1fd;border-top: none;color: #fff;border-bottom:none;">'
								+'<p>模板描述 :'+obj.templateDescription+'</p> <p>周期类型 : '+obj.cycleTypeNew+'</p>'
								+'<p>考核对象 :'+obj.examObjectList+'</p> <p>创建时间 : '+obj.createTime+'</p>'
								+'<p>创建人 :'+obj.createPerson+'</p>  <p>考核周期 : '+obj.startDate+'</p>'
								+'</div>'
								+'<div style="width: 100%;  height: 40px; border: 1px solid #00e1fd;border-top: none;">'
								+'<button class="btn btn-primary" onClick="Assessment(\''+id+'\')">考核</button>'
								+'<button class="btn btn-primary" onClick="editAche(\''+id+'\')">修改</button>'
								+'<button  class="btn btn-primary" onClick="reuse(\''+id+','+obj.cycleType+','+obj.startDate+','+obj.endDate+'\')">复用</button>'
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
		param.splice(0,param.length);
	
	}
	
	function findByContext(){
		context = $("#context").val(); 
		
		searchExamModel(page,rows,param,context);
	}
	function checkBoxSearch(){
		$.each($("#check"),function(){
			$("input[type='checkbox']").click(function(){
				var obj= document.getElementsByName("checkName");
				for(var i = 0; i < obj.length; i++){
					if(obj[i].checked){
						var a = $(obj[i]).val();
						param.push(a);
					}
				}
				searchExamModel(page,9,param,context);
				
			});
		});
		
	}
	
	
	function Assessment(modelID){
		var NumTime=0;
		topwindow.showWindow({ 
			title : "业绩考核",
			url : $.cxt + "/pages/gis/exam/performance.jsp?modelID="+modelID,
			datatype: "json",
/*			data:{modelID:modelID},
*/			mtype: "POST",
			bottons : [ { 
				title : "确认",
				fun : function() {
						console.log(1111)
			var ids = jQuery("#performance_table").jqGrid('getDataIDs');	
						var flag = "0";
						var flagMap=new Array();
			for(var i =0;i<ids.length;i++){
				var rowData = jQuery("#performance_table").jqGrid('getRowData',ids[i]);
				var newScore =$('#'+rowData.RANK_ID).val();
				var lastScore = rowData.KPI_SCORE;
				var RANK_ID = rowData.RANK_ID;
				 if(!/^[0-9,.]*$/.test(newScore)){
					 flagMap[ids[i]]="1";
					 $('#'+rowData.RANK_ID).css('border-color','red')
				}else if(parseInt(newScore)>=(parseInt(rowData.KPI_WEIGHT)+1)){
					flagMap[ids[i]]="1";
					$('#'+rowData.RANK_ID).css('border-color','red')
				}else if(newScore==""){
					flagMap[ids[i]]="2";
				}else{
					flagMap[ids[i]]="0";
					updateMap[RANK_ID]=newScore;
				}
			}	
			for(var name in flagMap ){
				if(flagMap[name] =="1"){
					return ;
				}else if(flagMap[name] =="2"){
					NumTime++;
					if(NumTime==1){
					bootbox.dialog({
						message: "修改后得分值为空,在点击确认后将会被修改为未考核状态",
						title: "提示信息",
						buttons: {
							OK: {
								label: "确认",
								className: "btn-primary",
								callback: function () {
									var ss =JSON.stringify(updateMap);
									console.log(ss.size==undefined)
									if(ss!=""){
									$.ajax({
										url : $.cxt + "/exam/updateGridRank",
									 	type : "POST",
									 	dataType : 'json',
									 	data : {UpdataJson:JSON.stringify(updateMap)},
									 	success:function(json){
									 		
									 		messageAlert("考核成功！");
									 		topwindow.removeWindow();//关闭窗口
									 		
									 	}
										});
										
									}else{
											messageAlert("无考核对象！");
											topwindow.removeWindow();//关闭窗口
											
									}
								}
							},	
							Cancel: {
								label: "取消",
								className: "btn-default",
								callback: function () {
									return ;
								}
							}
					}
					})
					}
				}else{
					var ss =JSON.stringify(updateMap);
					console.log(ss.size==undefined)
					if(ss!=""){
					$.ajax({
						url : $.cxt + "/exam/updateGridRank",
					 	type : "POST",
					 	dataType : 'json',
					 	data : {UpdataJson:JSON.stringify(updateMap)},
					 	success:function(json){
					 		
					 		messageAlert("考核成功！");
					 		topwindow.removeWindow();//关闭窗口
					 	}
						});
					}else{
							messageAlert("无考核对象！");
							topwindow.removeWindow();//关闭窗口
					}
				}
			}
			
		
			
		
		
	}
}]
		})
	}
	
	function editAche(modelID){
		
		topwindow.showWindow({ 
			title : "业绩考核",
			url : $.cxt + "/pages/gis/exam/performance.jsp?modelID="+modelID,
			datatype: "json",
/*			data:{modelID:modelID},
*/			mtype: "POST",
			bottons : [ { 
				title : "确认",
				fun : function() {
						console.log(1111)
			var ids = jQuery("#performance_table").jqGrid('getDataIDs');	
						var flag = "0";
						var flagMap=new Array();
			for(var i =0;i<ids.length;i++){
				var rowData = jQuery("#performance_table").jqGrid('getRowData',ids[i]);
				var newScore =$('#'+rowData.RANK_ID).val();
				var lastScore = rowData.KPI_SCORE;
				var RANK_ID = rowData.RANK_ID;
				 if(!/^[0-9,.]*$/.test(newScore)){
					 flagMap[ids[i]]="1";
					 $('#'+rowData.RANK_ID).css('border-color','red')
				}else if(parseInt(newScore)>=(parseInt(rowData.KPI_WEIGHT)+1)){
					flagMap[ids[i]]="1";
					$('#'+rowData.RANK_ID).css('border-color','red')
				}else if(newScore==""){
					flagMap[ids[i]]="2";
				}else{
					flagMap[ids[i]]="0";
					updateMap[RANK_ID]=newScore;
				}
			}	
			for(var name in flagMap ){
				if(flagMap[name] =="1"){
					return ;
				}else if(flagMap[name] =="2"){
					bootbox.dialog({
						message: "修改后得分值为空,在点击确认后将会被修改为未考核状态",
						title: "提示信息",
						buttons: {
							OK: {
								label: "确认",
								className: "btn-primary",
								callback: function () {
									var ss =JSON.stringify(updateMap);
									console.log(ss.size==undefined)
									if(ss!=""){
									$.ajax({
										url : $.cxt + "/exam/updateGridRank",
									 	type : "POST",
									 	dataType : 'json',
									 	data : {UpdataJson:JSON.stringify(updateMap)},
									 	success:function(json){
									 		
									 		messageAlert("考核成功！");
									 		topwindow.removeWindow();//关闭窗口
									 	}
										});
									}else{
											messageAlert("无考核对象！");
											topwindow.removeWindow();//关闭窗口
									}
								}
							},	
							Cancel: {
								label: "取消",
								className: "btn-default",
								callback: function () {
									return ;
								}
							}
					}
					})
				}else{
					var ss =JSON.stringify(updateMap);
					console.log(ss.size==undefined)
					if(ss!=""){
					$.ajax({
						url : $.cxt + "/exam/updateGridRank",
					 	type : "POST",
					 	dataType : 'json',
					 	data : {UpdataJson:JSON.stringify(updateMap)},
					 	success:function(json){
					 		
					 		messageAlert("考核成功！");
					 		topwindow.removeWindow();//关闭窗口
					 	}
						});
					}else{
							messageAlert("无考核对象！");
							topwindow.removeWindow();//关闭窗口
					}
				}
			}
			
		
			
		
		
	}
}]
		})
	}
	
	function reuse(exam){
		var arr = exam.split(",");
		var examId = arr[0];
		var cycleType = arr[1];
		var startDate = arr[2];
		var endDate = arr[3];
		console.log(arr);
		if(endDate == "undefined"){
			endDate = "";
		}
		
		topwindow.showWindow({
			//窗口名称
			title : "是否复用",
			//url
			url : "reuse.jsp",
			data : {endDate:endDate,startDate:startDate,cycleType:cycleType},
			bottons : [ {
				title : "确认",
				fun : function() {
					var examJson = new Object;
					var cycleType = $("#add_cycleType").val();
					examJson.cycleType = cycleType;
					var start = $("#add_startDate").val();
					if (start === null || start === undefined || start === '') {
						messageAlert("开始时间不能为空");
						return false;
					} 
					examJson.start = start;
					var end = $("#add_endDate").val();
					examJson.end = end;
					
					examJson.examId = examId;
					
					var examStr = JSON.stringify(examJson);
					$.ajax({
						url : $.cxt + "/exam/reuseExamModel",
						//请求方式
						type : "POST",
						//传递到后台的参数
						data : {examStr:examStr},
						success : function (data){
							topwindow.removeWindow();//关闭窗口
							//刷新父窗口，重新查询
    						searchExamModel(1,9,"","");
						}
					});
					
				}
			},{
				title : "取消",
				fun : function () {
					topwindow.removeWindow();//关闭窗口
				}
			} ],
			fun : function(){
				$("#add_cycleType").val(cycleType);
				$("#add_startDate").val(startDate);
			}
			
		});
		
		
	}
$("#search").on("click",findByContextGridNameCycle)	
	function findByContextGridNameCycle(){
		//获取文本值
		
		var context = $("#context").val(); 
		var gridName = $("#gridName").val();
		var CycleType =$("#CycleType").val();
		searchExamModel(page,rows,param,context,gridName,CycleType,"","");
	}
$("#research").on("click",research)	
function research(){
	//获取文本值
	
	$("#context").val(""); 
	$("#gridName").val("");
	$("#CycleType").val("");
	searchExamModel(page,rows,param,"","","","","");
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
	
	
	