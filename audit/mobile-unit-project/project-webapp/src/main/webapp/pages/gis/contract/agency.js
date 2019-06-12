$(function(){
	/*var physicalArr = ["38bfc23fe3babe42081cc7bb","560e468f711ce7e2f60e7725"];
	var JsonArrphysical = JSON.stringify(physicalArr);
	var gridCode='835645d0-be72-4dc4-9373-e1d58bf53494'

	var chnl_code1='DDA30503';
	var chnl_code='668887555';*/
	console.log("1-->"+JsonArrphysical);
	console.log("2-->"+gridCode);
	console.log("3-->"+chnl_code);
//	chnl_code='668887555'
	$("#agency_define").on("click",define)
	function define(){
		var Requirements=$("#agency_textarea").val();
		if(objType == "1"){
			$.ajax({
				url : $.cxt + "/contract/insertContract",
				dataType : "json",
			 	type : "POST",
			 	async: false,
			 	data : {chnl_code:chnl_code,Requirements:Requirements,JsonArrphysical:JsonArrphysical},
			 	success : function(json){
			 		topwindow.removeWindow();
			 		topshowAlertSuccessDiv();//操作提示
			 	}
			 });
			channelAndStatusChange();
		}else{
			$.ajax({
				url : $.cxt+"/contract/selectChannl",   //获取渠道经理 看是否存在
				type:"POST",
				dataType:"JSON",
				data:{chnl_code:chnl_code},
				success : function(json){
					console.log(json)
					if(json.length==0){   //如果不存在
						topwindow.showWindow({  //弹出框显示表格
							title : "选择渠道经理",
							url : $.cxt + "/pages/gis/contract/addChnlManager.jsp",
							height : 350,
							datatype: "json",
							data:{chnl_code:chnl_code,gridCode:gridCode},
							mtype: "POST",
							bottons : [{
								title : "确定", 
								fun :function(){
									bootbox.dialog({
										message: "是否确认将选中的基础单元包保给该渠道经理？",
										title: "提示信息",
										buttons: {
											OK: {
												label: "确认",
												className: "btn-primary",
												callback: function () {
													$.ajax({
														url :$.cxt+"/contract/insertChnlManager",
														type:"POST",
														async: false,
														dataType:"JSON",
														data:{chnl_code:chnl_code,newManager:newManager},
														success : function(json){		
															topwindow.removeWindow();//关闭窗口
														}
													});
													$.ajax({
														url : $.cxt + "/contract/insertContract",
														dataType : "json",
													 	type : "POST",
													 	async: false,
													 	data : {chnl_code:chnl_code,Requirements:Requirements,JsonArrphysical:JsonArrphysical},
													 	success : function(json){
													 		topshowAlertSuccessDiv();//操作提示
													 	}
													 });
													channelAndStatusChange();
													topwindow.removeWindow();//关闭窗口
													return;
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
//									topwindow.removeWindow();//关闭窗口
								}
							},{title : "取消", 
								fun : function(){
									topwindow.removeWindow();//关闭窗口
									return;
								}
							}]
						});
						
					}else{
						bootbox.dialog({
							message: "是否确认将选中的基础单元包保给该渠道经理？",
							title: "提示信息",
							buttons: {
								OK: {
									label: "确认",
									className: "btn-primary",
									callback: function () {
										$.ajax({
											url : $.cxt + "/contract/insertContract",
											dataType : "json",
										 	type : "POST",
										 	async: false,
										 	data : {chnl_code:chnl_code,Requirements:Requirements,JsonArrphysical:JsonArrphysical},
										 	success : function(json){
										 	}
										 });
										channelAndStatusChange();
										topwindow.removeWindow();//关闭窗口
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
					}
				}
			})
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
