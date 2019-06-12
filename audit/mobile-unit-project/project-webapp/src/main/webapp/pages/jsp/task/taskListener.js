$(function(){
	//左侧任务树
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
	
	function zTreeOnClick(event, treeId, treeNode){
		  //window.location.href=$.cxt +"/pages/gis/gridInfo/gridInfoInit.jsp?orgId="+treeNode.id+"&canBack=true";
		  $.ajax({
				url : $.cxt + '/task/getTaskListenerInfo',
				type : "POST",
				data : {monitorCode:treeNode.id},
				success : function(json){
					var data = JSON.parse(json);
					if(data.code == '0'){
						//网格统计信息-基本信息
						//console.log(json);
						$(".taskText").html('');
						$(".activityName").append(data.data.activityName);
						$(".activityName").attr('title',data.data.activityName);
						$(".campaignName").append(data.data.campaignName);
						$(".campaignName").attr('title',data.data.campaignName);
						$(".activityBeginDate").append(data.data.activityBeginDate);
						$(".activityBeginDate").attr('title',data.data.activityBeginDate);
						$(".activityEndDate").append(data.data.activityEndDate);
						$(".activityEndDate").attr('title',data.data.activityEndDate);
						$(".offeringName").append(data.data.offeringName);
						$(".offeringName").attr('title',data.data.offeringName);
						$("#suggestion-textarea").append(data.data.leaderAdvice);
						$("#suggestion-textarea").attr('title',data.data.leaderAdvice);
						$("#monitorCode").attr('value',data.data.monitorCode);
						addGridItemInfo(treeNode.id);
						addTaskListenerInfo(treeNode.id);
					}
				}
				
			})
	  }
	 $.ajax({
		  url:$.cxt + "/task/getTaskTree", 
		 //url:$.cxt + "/gridCommon/getLeftTree", 
		  
		  type: "POST",
		  success : function (zNodes){
			var  treeObj =	$.fn.zTree.init($("#taskListenerTree"), setting, zNodes);
//				treeObj.expandAll(false);
			var nodes = treeObj.getNodes();
			for (var i = 0; i < nodes.length; i++) { //设置节点展开
               treeObj.expandNode(nodes[i], true, false, true);
           }
		  }
	  })
	  
})
	function addTaskListenerInfo(monitorCode){
	$("#searchButton").unbind();
	$("#searchButton").bind("click",function(){
	var	textArea  = $("#suggestion-textarea").val();
		$.ajax({
			url:$.cxt + "/task/addLeaderAdviceInfo", 
			type: "POST",
			data : {
				monitorCode:monitorCode,
				leaderAdvice:textArea
				},
			success : function (json){
				var data = JSON.parse(json);
				if(data.code=='0'){
					topwindow.removeWindow();
				}	
			}
		})
	})
}
	function addGridItemInfo (monitorCode){
	$("#clearButton").unbind();
	$("#clearButton").bind("click",function(){
			bootbox.dialog({
				message: "是否确认催办?",
				title: "提示信息",
				buttons: {
					OK: {
						label: "确认",
						className: "btn-primary",
						callback: function () {
							$.ajax({
								url:$.cxt + "/task/addGridItemInfo", 
								type: "POST",
								data : {monitorCode:monitorCode},
								success : function (json){
									var data = JSON.parse(json);
									if(data.code=='0'){
										topwindow.removeWindow();
									}
								}
							})
						}
					},
					Cancel: {
						label: "取消",
						className: "btn-default",
						callback: function () {
							
						}
					}
				}
			});
		})
	}

//给Textarea添加空格
/*function suggestionTextarea(){
	var str = "";
	for(var i=1;i<= 400;i++){
		if(i%75 == 0){
			str += '\n';
		}
		str += ' ';
	}
	document.getElementById("suggestion-textarea").value=str;
}*/

