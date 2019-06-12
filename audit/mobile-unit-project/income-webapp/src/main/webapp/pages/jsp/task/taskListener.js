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
				url : $.cxt + '/task/getTaskBaseInfo',
				type : "POST",
				data : {monitorCode:treeNode.id},
				success : function(json){
					var data = JSON.parse(json);
					if(data.code == '0'){
						//网格统计信息-基本信息
						//console.log(json);
						$(".taskText").html('');
						$(".taskName").append(data.data[0].taskName);
						$(".taskName").attr('title',data.data[0].taskName);
						$(".taskBigType").append(data.data[0].taskBigType);
						$(".taskBigType").attr('title',data.data[0].taskBigType);
						$(".taskSmallType").append(data.data[0].taskSmallType);
						$(".taskSmallType").attr('title',data.data[0].taskSmallType);
						$(".taskTouchWay").append(data.data[0].touchWay);
						$(".taskTouchWay").attr('title',data.data[0].touchWay);
						$(".taskTarget").append(data.data[0].taskTarget);
						$(".taskTarget").attr('title',data.data[0].taskTarget);
						$(".taskFinishDate").append(data.data[0].finishDate);
						$(".taskFinishDate").attr('title',data.data[0].finishDate);
						$(".taskEvaluateDate").append(data.data[0].evaluateDate);
						$(".taskEvaluateDate").attr('title',data.data[0].evaluateDate);
						$(".taskMarketingPlan").append(data.data[0].marketingPlan);
						$(".taskMarketingPlan").attr('title',data.data[0].marketingPlan);
						$("#suggestion-textarea").append(data.data[0].leaderAdvice);
						$("#suggestion-textarea").attr('title',data.data[0].leaderAdvice);
						$("#monitorCode").attr('value',data.data[0].monitorCode);
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

