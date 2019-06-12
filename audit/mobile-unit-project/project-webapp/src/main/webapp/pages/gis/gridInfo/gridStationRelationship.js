$(function(){
	getGridAll(null);
	getGridDeptInfo(null);
	getNoGridStation(null)
	$("#searchGirdList").click(function(){
		var gridName = $("#gridName").val();
		$(".org-gridInfo").empty();
		getGridAll(gridName);
	})
	$("#searchGridStation").bind('input propertychange',function(){
		var stationName = $("#searchGridStation").val();
		$(".scrollBar").empty();
		getGridStationInfoByName(stationName);
	})
	$("#searchNoGridStation").bind('input propertychange',function(){
		var stationName = $("#searchNoGridStation").val();
		$(".scrollBar1").empty();
		getNoGridStation(stationName);
	})
	$("#improtexcel").click(function(){
		$('#myModal1').modal('hide');
		importVal();
	});
	$("#myModal1Close").click(function(){
		$('#myModal1').modal('hide');
	});
	$("#download").click(function(){
		downLoad();
	});
	$('#stationFile').ace_file_input({
		no_file:'没有文件 ...',
		btn_choose:'选择',
		btn_change:'转换',
		droppable:false,
		onchange:null,
		thumbnail:false // | true | large
		// whitelist:'gif|png|jpg|jpeg'
		// blacklist:'exe|php'
		// onchange:''
		//
	});
	//移除所有网格
	$("#removeAllGrid").click(function(){
		var dataArray = new Array();
		if($("#searchGridStation").val() == '' || $("#searchGridStation").val()==null){
			messageConfirm("请输入网格名称！");
		}else{
			if($(".grid-back1").length == '0'){
        		messageConfirm("无可移除的基站！")
        	}else{
        		bootbox.dialog({
        			message: "是否确认移除?",
        			title: "提示信息",
        			buttons: {
        				OK: {
        					label: "确认",
        					className: "btn-primary",
        					callback: function () {
        						$(".grid-back1").each(function(index,element){
        							var data = {};
        							data.stationCode = $(element).attr("id");
        							data.gridCode = $(element).children(".grid-back-content").children(".addRemoveBtn").attr("id");
        							data.areaId = $(".orgId").val();
        							dataArray.push(data);
        						})
        						removeAllGrid(dataArray);
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
	
	//加入多个网格
	$("#addAllGrid").click(function(){
		var dataArray = new Array();
		if($("#searchNoGridStation").val() == '' || $("#searchNoGridStation").val()==null){
			messageConfirm("请输入网格名称!")
		}else{
			$(".grid-back").each(function(index,element){
				var data = {};
				data.stationCode = $(element).attr("id");
				data.stationName = $(element).children(".grid-back-content").children(".grid-no-gridName").children(".grid-no-right").text();
				data.stationType = $(element).children(".grid-back-content").children(".grid-no-gridType").children(".grid-no-right").text();
				dataArray.push(data);
			})
			addAllGrid(dataArray);
		}
	})
})

/*获取网格信息*/
function getGridAll(gridName){
	var orgId = $(".orgId").val();
	$.ajax({
		url:$.cxt + "/gridStation/getGridInfo", 
		type: "POST",
		data : {
			areaId : orgId,
			gridName : gridName
		},
		success : function (json){
			var gridInfo = JSON.parse(json);
			if(gridInfo.code == '0'){
				for(var i=0;i<gridInfo.data.length;i++){
					$(".org-gridInfo").append(
							$("<li></li>").append(
									$("<div></div>").addClass("checkbox-businessName").append(
											$("<input />").addClass("checkbox").attr("type","checkbox").attr("onclick","selectStationGrid(this)").attr("value",gridInfo.data[i].gridCode)
									).append(
											$("<div></div>").addClass("businessName").append(gridInfo.data[i].gridName)
									)
							).append(
									$("<div></div>").addClass("businessInfo").append(
											$("<div></div>").addClass("businessInfo-around").append(
													$("<div></div>").addClass("businessInfo-around-left").append("网格类型：")
											).append(
													$("<div></div>").append(gridInfo.data[i].gridType)
											)
									).append(
											$("<div></div>").addClass("businessInfo-around").append(
													$("<div></div>").addClass("businessInfo-around-left").append("网格经理：")
											).append(
													$("<div></div>").append(gridInfo.data[i].gridManager)
											)
									)
							)
					)
				}
			}
		}
		
	})
}

/*获取当前营业部与网格关系*/
function getGridDeptInfo(saleDeptCode){
	var orgId = $(".orgId").val();
	$.ajax({
		url:$.cxt + "/gridStation/getGridStationInfo", 
		type: "POST",
		data : {
			orgId : orgId,
			gridCode : saleDeptCode
		},
		success : function (json){
			var gridDeptInfo = JSON.parse(json);
			if(gridDeptInfo.code == '0'){
				for(var i=0;i<gridDeptInfo.data.length;i++){
					$(".scrollBar").append(
							$("<div></div>").append(
								$("<div></div>").addClass("grid-back1").attr("id",gridDeptInfo.data[i].gridCode).append(
										$("<div></div>").addClass("business-title").append(
												$("<div></div>").addClass("title-left").append("归属网格：")
										).append(
												$("<div></div>").addClass("title-right").append(gridDeptInfo.data[i].gridName)
										)
								).append(
										$("<div></div>").addClass("grid-back-content").append(
												$("<div></div>").append(
														$("<div></div>").addClass("grid-no-left").append("基站名称：")
												).append(
														$("<div></div>").addClass("grid-no-right").append(gridDeptInfo.data[i].stationName)
												)
										).append(
												$("<div></div>").append(
														$("<div></div>").addClass("grid-no-left").append("基站类型：")
												).append(
														$("<div></div>").addClass("grid-no-right").append(gridDeptInfo.data[i].stationType)
												)
										).append(
												$("<span></span>").addClass("addRemoveBtn").attr("onclick","removeSingleGrid(this)").attr("id",gridDeptInfo.data[i].gridCode).attr("name",gridDeptInfo.data[i].stationCode).append("移除")
										)
								)
							)
					)
				}
			}
		}
	})
}

function downLoad(){
	window.location.href=$.cxt +"/gridStation/exportExcel"; 
}
/*根据基站名称获取当前基站与网格关系*/
function getGridStationInfoByName(stationName){
	var orgId = $(".orgId").val();
	$.ajax({
		url:$.cxt + "/gridStation/getGridStationInfoByName", 
		type: "POST",
		data : {
			orgId : orgId,
			stationName : stationName
		},
		success : function (json){
			var gridDeptInfo = JSON.parse(json);
			if(gridDeptInfo.code == '0'){
				$(".scrollBar").empty();
				for(var i=0;i<gridDeptInfo.data.length;i++){
					$(".scrollBar").append(
							$("<div></div>").addClass("grid-back1").attr("id",gridDeptInfo.data[i].stationCode).append(
									$("<div></div>").addClass("business-title").append(
											$("<div></div>").addClass("title-left").append("归属网格：")
									).append(
											$("<div></div>").addClass("title-right").append(gridDeptInfo.data[i].gridName)
									)
							).append(
									$("<div></div>").addClass("grid-back-content").append(
											$("<div></div>").append(
													$("<div></div>").addClass("grid-no-left").append("基站名称：")
											).append(
													$("<div></div>").addClass("grid-no-right").append(gridDeptInfo.data[i].stationName)
											)
									).append(
											$("<div></div>").append(
													$("<div></div>").addClass("grid-no-left").append("基站类型：")
											).append(
													$("<div></div>").addClass("grid-no-right").append(gridDeptInfo.data[i].stationType)
											)
									).append(
											$("<span></span>").addClass("addRemoveBtn").attr("onclick","removeSingleGrid(this)").attr("id",gridDeptInfo.data[i].gridCode).attr("name",gridDeptInfo.data[i].stationCode).append("移除")
									)
							)
					)
				}
			}
		}
	})
}

/*获取未加入营业部的网格信息*/
function getNoGridStation(stationName){
	var orgId = $(".orgId").val();
	$.ajax({
		url:$.cxt + "/gridStation/getNoGridStation", 
		type: "POST",
		data : {
			areaId : orgId,
			stationName : stationName
		},
		success : function (json){
			var gridNoDeptInfo = JSON.parse(json);
			if(gridNoDeptInfo.code == '0'){
				for(var i=0;i<gridNoDeptInfo.data.length;i++){
					$(".scrollBar1").append(
							$("<div></div>").addClass("grid-back").attr("id",gridNoDeptInfo.data[i].STATION_CODE).append(
									$("<div></div>").addClass("grid-back-content").append(
											$("<div></div>").addClass("grid-no-gridName").append(
													$("<div></div>").addClass("grid-no-left").append("基站名称：")
											).append(
													$("<div></div>").addClass("grid-no-right").append(gridNoDeptInfo.data[i].STATION_NAME)
											)
									).append(
											$("<div></div>").addClass("grid-no-gridType").append(
													$("<div></div>").addClass("grid-no-left").append("基站类型：")
											).append(
													$("<div></div>").addClass("grid-no-right").append(gridNoDeptInfo.data[i].STATION_TYPE)
											)
									).append(
											$("<span></span>").addClass("addRemoveBtn").attr("onclick","addSingleGrid(this)").append("加入")
									)
							)
					)
				}
			}
		}
	})
}

//移除单个网格
function removeSingleGrid(selector){
	bootbox.dialog({
        message: "是否确认移除?",
        title: "提示信息",
        buttons: {
            OK: {
                label: "确认",
                className: "btn-primary",
                callback: function () {
                	var orgId = $(".orgId").val();
                	var gridCode = $(selector).attr("id");
                	var stationCode = $(selector).attr("name");
                	$.ajax({
                		url:$.cxt + "/gridStation/removeSingleGrid", 
                		type: "POST",
                		data : {
                			areaId : orgId,
                			gridCode : gridCode,
                			stationCode : stationCode
                			
                		},
                		success : function (json){
                			var data = JSON.parse(json);
                			if(data.code == '0'){
                				$(".scrollBar").empty();
                				getGridDeptInfo(null);
                				$(".scrollBar1").empty();
                				getNoGridStation(null)
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
	
}

//移除多个网格
function removeAllGrid(data){
	var orgId = $(".orgId").val();
	$.ajax({
		url:$.cxt + "/gridStation/removeAllGrid",
		type: "POST",
		data : {
			data : JSON.stringify(data),
			areaId : orgId
		},
		success : function (json){
			var data = JSON.parse(json);
			if(data.code == '0'){
				$(".scrollBar").empty();
				getGridDeptInfo(null);
				$(".scrollBar1").empty();
				getNoGridStation(null)
			}
		}
	})
}

//加入单个网格
function addSingleGrid(selector){
	var orgId = $(".orgId").val();
	var stationCode = $(selector).parent().parent().attr("id");
	var stationName = $(selector).prev().prev().children(".grid-no-right").text();
	var stationType = $(selector).prev().children(".grid-no-right").text();
	if($("input[type='checkbox']:checked").length == 0){
		messageConfirm('请选择要加入的网格！！')
	}else if($("input[type='checkbox']:checked").length == 1){
		bootbox.dialog({
            message: "是否确认加入?",
            title: "提示信息",
            buttons: {
                OK: {
                    label: "确认",
                    className: "btn-primary",
                    callback: function () {
                    	var checked = $("input[type='checkbox']:checked");
                		var gridCode = $(checked).val();
                		var gridName = $(checked).next().text();
                		var gridType = $(checked).parent().next().children('div:first').children('div:last').text();
                		$.ajax({
                			url:$.cxt + "/gridStation/addSingleGrid", 
                			type: "POST",
                			data : {
                				areaId : orgId,
                				gridCode : gridCode,
                				gridName : gridName,
                				gridType : gridType,
                				stationType : stationType,
                				stationCode : stationCode,
                				stationName : stationName
                			},
                			success : function (json){
                				var data = JSON.parse(json);
                				if(data.code == '0'){
                					$(".scrollBar").empty();
                					getGridDeptInfo(null);
                					$(".scrollBar1").empty();
                					getNoGridStation(null)
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
		
	}else{
		messageConfirm('不能加入多个网格！')
	}
}

//加入多个网格
function addAllGrid(gridInfo){
	var orgId = $(".orgId").val();
	if($("input[type='checkbox']:checked").length == 0){
		messageConfirm('请选择要加入的网格！！')
	}else if($("input[type='checkbox']:checked").length == 1){
		if($(".grid-back").length == "0"){
			messageConfirm("无可加入的网格！");
		}else{
			bootbox.dialog({
				message: "是否确认加入?",
				title: "提示信息",
				buttons: {
					OK: {
						label: "确认",
						className: "btn-primary",
						callback: function () {
							var checked = $("input[type='checkbox']:checked");
							var gridCode = $(checked).val();
	                		var gridName = $(checked).next().text();
	                		var gridType = $(checked).parent().next().children('div:first').children('div:last').text();
							$.ajax({
								url:$.cxt + "/gridStation/addAllGrid", 
								type: "POST",
								data : {
									areaId : orgId,
									gridInfo : JSON.stringify(gridInfo),
									gridCode : gridCode,
									gridName : gridName,
									gridType : gridType
								},
								success : function (json){
									var data = JSON.parse(json);
									if(data.code == '0'){
										$(".scrollBar").empty();
										getGridDeptInfo(null);
										$(".scrollBar1").empty();
										getNoGridStation(null)
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
		}
		
	}else{
		messageConfirm('不能加入多个网格！');
	}
}

//多选框
function selectStationGrid(checkbox){
	var saleDeptCode = checkbox.value;
	if($("input[type='checkbox']:checked").length > 1){
		if($(checkbox).is(':checked')){
			getGridDeptInfo(saleDeptCode);
		}else{
			$('[id='+saleDeptCode+']').each(function(){
				$(this).parent().empty();
			})
		}
	}else{
		if($(checkbox).is(':checked')){
			$(".scrollBar").empty();
			getGridDeptInfo(saleDeptCode);
		}else{
			if($("input[type='checkbox']:checked").length == 0){
				$(".scrollBar").empty();
				getGridDeptInfo(null);
			}else{
				$('[id='+saleDeptCode+']').each(function(){
					$(this).parent().empty();
				})
			}
		}
	}
}

function messageConfirm(msg){
	bootbox.alert({
	    buttons: {
		   ok: {
			    label: '关闭',
			    className: 'btn-myStyle'
		    }
	    },
	    message: msg,
	    callback: function() {
		    
	    },
	    title: "消息提示",
    })
}

function importVal(){
	var param={};
	if($("#stationFile").val()==""){
		//alert("请选择上传的数据文件");
		messageAlert("请选择上传的数据文件");
		return;
	}
	
	var fileExtension = $("#stationFile").val().split('.').pop().toLowerCase();
	//alert(getFileSize("stationFile"));
	if(getFileSize("stationFile") > 30){
		messageAlert("数据文件不能大于30M"); 
		return;
	 }
	 
	if(fileExtension!="xls"){
		//alert("请选择2003版excel");
		messageAlert("请选择2003版excel"); 
		return ;
	}
    $("#upform").submit();
 	return;
	
	

}
function getFileSize(eleId) {
	try {
		var size = 0;
		size = $('#' + eleId)[0].files[0].size;// byte
		size = size / 1024;// kb
		size = size / 1024;// mb
		// alert('上传文件大小为' + size + 'M');
		return size;
	} catch (e) {
		alert("错误：" + e);
		return -1;
	}
}
function messageAlert(message){
	bootbox.dialog({
        message: "<span style=\"color:#171414\">"+message+"</span>",
        title: "消息提示",
        buttons: {
            OK: {
                label: "确定",
                className: "btn-success",
            }
        }
    });
}
