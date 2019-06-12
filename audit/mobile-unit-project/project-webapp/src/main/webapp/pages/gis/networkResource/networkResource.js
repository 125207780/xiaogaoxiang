$(function(){
	initLeftTree();
	$("#infoTree").css({"height":$(".infoDetail").height()});
	$(".setHeight").each(function(index,ele){
		$(this).click(function(){
			var setHeight = $(".tab-pane").eq(index).height()+58
			$("#infoTree").css({"height":setHeight});
			setNiceScroll();
		})
	})


	//loadting tree有封装好的，暂时先用这个
	
	function initLeftTree(){
		
	
	var setting = {
			check: {
		        enable: true,     //这里设置是否显示复选框
		       /* chkboxType: { "Y": "", "N": "" }      //设置复选框是否与 父/子 级相关联
*/		    },
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
		  url:$.cxt + "/netResources/getLeftTree", 
		  type: "POST",
		  success : function (zNodes){
			var  treeObj =	$.fn.zTree.init($("#infoTree"), setting, zNodes);
//				treeObj.expandAll(false);
			var nodes = treeObj.getNodes();
			for (var i = 0; i < nodes.length; i++) { //设置节点展开
                treeObj.expandNode(nodes[i], true, false, true);
            }
		  }
	  })
	//該方法點擊樹可做操作
	function zTreeOnClick(event, treeId, treeNode){
		  console.log(treeNode);
	  }
	}
	
});

