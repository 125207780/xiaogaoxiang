$(function() {
	getGridAll(null);
	getGridDeptInfo(null);
	getNoGridDept(null)
	$("#searchsaleDeptList").click(function() {
		var saleDeptName = $("#saleDeptName").val();
		$(".org-gridInfo").empty();
		getGridAll(saleDeptName);
	});
	
	$("#searchGridDept").bind('input propertychange',function() {
		var saleDeptName = $("#searchGridDept").val();
		$(".scrollBar").empty();
		getGridDeptInfoByName(saleDeptName);
	});
	
	$("#searchNoGridDept").bind('input propertychange',function() {
		var gridName = $("#searchNoGridDept").val();
		$(".scrollBar1").empty();
		getNoGridDept(gridName);
	});
	
	//移除所有网格
	$("#removeAllGrid").click(function() {
		var dataArray = new Array();
		if($("#searchGridDept").val() == '' || $("#searchGridDept").val() == null) {
			messageConfirm("请输入营业部门名称！");
		} else {
			if($(".grid-back1").length == '0') {
        		messageConfirm("无可移除的网格！")
        	} else {
        		bootbox.dialog({
        			message: "是否确认移除?",
        			title: "提示信息",
        			buttons: {
        				OK: {
        					label: "确认",
        					className: "btn-primary",
        					callback: function() {
        						$(".grid-back1").each(function(index, element) {
        							var data = {};
        							data.saleDeptCode = $(element).attr("id");
        							data.gridCode = $(element).children(".grid-back-content").children(".addRemoveBtn").attr("id");
        							data.orgId = $(".orgId").val();
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
	});
	
	//加入多个网格
	$("#addAllGrid").click(function() {
		var dataArray = new Array();
		if($("#searchNoGridDept").val() == '' || $("#searchNoGridDept").val() == null) {
			messageConfirm("请输入网格名称!")
		} else {
			$(".grid-back").each(function(index, element) {
				var data = {};
				data.gridCode = $(element).attr("id");
				data.gridName = $(element).children(".grid-back-content").children(".grid-no-gridName").children(".grid-no-right").text();
				data.gridType = $(element).children(".grid-back-content").children(".grid-no-gridType").children(".grid-no-right").text();
				dataArray.push(data);
			});
			addAllGrid(dataArray);
		}
	});
})

// 获取营业部信息
function getGridAll(saleDeptName) {
	var orgId = $(".orgId").val();
	$.ajax({
		url: $.cxt + "/gridBusinessDepartment/getDepartment", 
		type: "POST",
		data: {
			orgId: orgId,
			saleDeptName: saleDeptName
		},
		success: function(json) {
			var gridInfo = JSON.parse(json);
			if(gridInfo.code == '0') {
				var htmltv = "";
				for(var i = 0; i < gridInfo.data.length; i++) {
					htmltv += "<li>";
					htmltv += "<div class='checkbox-businessName'>";
					htmltv += "<input class='checkbox' type='checkbox' onclick='selectDeptGrid(this)' value='" + gridInfo.data[i].saleDeptCode + "'/>";
					htmltv += "<div class='businessName'>" + gridInfo.data[i].saleDeptName + "</div>";
					htmltv += "</div>";
					htmltv += "<div class='businessInfo'>";
					htmltv += "<div class='businessInfo-around'>";
					htmltv += "<div class='businessInfo-around-left'>营业部归属：</div>";
					htmltv += "<div>" + gridInfo.data[i].countyName + "</div>";
					htmltv += "</div>";
					htmltv += "<div class='businessInfo-around'>";
					htmltv += "<div class='businessInfo-around-left'>营业部经理：</div>";
					htmltv += "<div>" + gridInfo.data[i].managerName + "</div>";
					htmltv += "</div>";
					htmltv += "<div class='businessInfo-around'>";
					htmltv += "<div class='businessInfo-around-left'>联系电话：</div>";
					htmltv += "<div>" + gridInfo.data[i].managerNumber + "</div>";
					htmltv += "</div>";
					htmltv += "</div>";
					htmltv += "</li>";
				}
				$(".org-gridInfo").append(htmltv);
			}
		}
	});
}

// 获取当前营业部与网格关系
function getGridDeptInfo(saleDeptCode) {
	var orgId = $(".orgId").val();
	$.ajax({
		url: $.cxt + "/gridBusinessDepartment/getGridDeptInfo", 
		type: "POST",
		data: {
			orgId: orgId,
			saleDeptCode: saleDeptCode
		},
		success: function(json) {
			var gridDeptInfo = JSON.parse(json);
			if(gridDeptInfo.code == '0') {
				var htmltv = "";
				for(var i = 0; i < gridDeptInfo.data.length; i++) {
					htmltv += "<div>";
					htmltv += "<div class='grid-back1' id='" + gridDeptInfo.data[i].saleDeptCode + "'>";
					htmltv += "<div class='business-title'>";
					htmltv += "<div class='title-left'>营业部名称：</div>";
					htmltv += "<div class='title-right'>" + gridDeptInfo.data[i].saleDeptName + "</div>";
					htmltv += "</div>";
					htmltv += "<div class='grid-back-content'>";
					htmltv += "<div>";
					htmltv += "<div class='grid-no-left'>拥有网格：</div>";
					htmltv += "<div class='grid-no-right'>" + gridDeptInfo.data[i].gridName + "</div>";
					htmltv += "</div>";
					htmltv += "<div>";
					htmltv += "<div class='grid-no-left'>网格类型：</div>";
					htmltv += "<div class='grid-no-right'>" + gridDeptInfo.data[i].gridName + "</div>";
					htmltv += "</div>";
					htmltv += "<span class='addRemoveBtn' onclick='removeSingleGrid(this) id='" + gridDeptInfo.data[i].gridCode + "' name='" + gridDeptInfo.data[i].saleDeptCode + "'>移除</span>";
					htmltv += "</div>";
					htmltv += "</div>";
					htmltv += "</div>";
				}
				$(".scrollBar").append(htmltv);
			}
		}
	})
}

// 根据营业部名称获取当前营业部与网格关系
function getGridDeptInfoByName(saleDeptName) {
	var orgId = $(".orgId").val();
	$.ajax({
		url: $.cxt + "/gridBusinessDepartment/getGridDeptInfoByName", 
		type: "POST",
		data: {
			orgId: orgId,
			saleDeptName: saleDeptName
		},
		success: function (json) {
			var gridDeptInfo = JSON.parse(json);
			if(gridDeptInfo.code == '0') {
				var htmltv = "";
				for(var i = 0; i < gridDeptInfo.data.length; i++) {
					htmltv += "<div class='grid-back1' id='" + gridDeptInfo.data[i].saleDeptCode + "'>";
					htmltv += "<div class='business-title'>";
					htmltv += "<div class='title-left'>营业部名称：</div>";
					htmltv += "<div class='title-right'>" + gridDeptInfo.data[i].saleDeptName + "</div>";
					htmltv += "</div>";
					htmltv += "<div class='grid-back-content'>";
					htmltv += "<div>";
					htmltv += "<div class='grid-no-left'>拥有网格：</div>";
					htmltv += "<div class='grid-no-right'>" + gridDeptInfo.data[i].gridName + "</div>";
					htmltv += "</div>";
					htmltv += "<div>";
					htmltv += "<div class='grid-no-left'>网格类型：</div>";
					htmltv += "<div class='grid-no-right'>" + gridDeptInfo.data[i].gridType + "</div>";
					htmltv += "</div>";
					htmltv += "<span class='addRemoveBtn' onclick='removeSignleGrid(this)' id='" + gridDeptInfo.data[i].gridCode + "' name='" + gridDeptInfo.data[i].saleDeptCode + "'>移除</span>";
					htmltv += "</div>";
					htmltv += "</div>";
				}
				$(".scrollBar").append(htmltv);
			}
		}
	})
}

// 获取未加入营业部的网格信息
function getNoGridDept(gridName) {
	var orgId = $(".orgId").val();
	$.ajax({
		url: $.cxt + "/gridBusinessDepartment/getNoGridDept", 
		type: "POST",
		data: {
			orgId: orgId,
			gridName: gridName
		},
		success: function (json) {
			var gridNoDeptInfo = JSON.parse(json);
			if(gridNoDeptInfo.code == '0'){
				var htmltv = "";
				for(var i = 0; i < gridNoDeptInfo.data.length; i++) {
					htmltv += "<div class='grid-back' id='" + gridNoDeptInfo.data[i].GRID_CODE + "'>";
					htmltv += "<div class='grid-back-content'>";
					htmltv += "<div class='grid-no-gridName'>";
					htmltv += "<div class='grid-no-left'>网格名称：</div>";
					htmltv += "<div class='grid-no-right'>" + gridNoDeptInfo.data[i].GRID_NAME + "</div>";
					htmltv += "</div>";
					htmltv += "<div class='grid-no-gridType'>";
					htmltv += "<div class='grid-no-left'>网格类型：</div>";
					htmltv += "<div class='grid-no-right'>" + gridNoDeptInfo.data[i].GRID_TYPE + "</div>";
					htmltv += "</div>";
					htmltv += "<span class='addRemoveBtn' onclick='addSignleGrid(this)'>加入</span>";
					htmltv += "</div>";
					htmltv += "</div>";
				}
				$(".scrollBar1").append(htmltv);
			}
		}
	})
}

//移除单个网格
function removeSingleGrid(selector) {
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
                	var saleDeptCode = $(selector).attr("name");
                	$.ajax({
                		url: $.cxt + "/gridBusinessDepartment/removeSingleGrid", 
                		type: "POST",
                		data: {
                			orgId: orgId,
                			gridCode: gridCode,
                			saleDeptCode: saleDeptCode
                		},
                		success: function(json) {
                			var data = JSON.parse(json);
                			if(data.code == '0') {
                				$(".scrollBar").empty();
                				getGridDeptInfo(null);
                				$(".scrollBar1").empty();
                				getNoGridDept(null)
                			}
                		}
                	})
                }
            },
            Cancel: {
                label: "取消",
                className: "btn-default",
                callback: function() {
                }
            }
        }
    });
}

// 移除多个网格
function removeAllGrid(data) {
	var orgId = $(".orgId").val();
	$.ajax({
		url: $.cxt + "/gridBusinessDepartment/removeAllGrid",
		type: "POST",
		data: {
			data: JSON.stringify(data),
			orgId: orgId
		},
		success: function(json) {
			var data = JSON.parse(json);
			if(data.code == '0') {
				$(".scrollBar").empty();
				getGridDeptInfo(null);
				$(".scrollBar1").empty();
				getNoGridDept(null)
			}
		}
	});
}

// 加入单个网格
function addSingleGrid(selector) {
	var orgId = $(".orgId").val();
	var gridCode = $(selector).parent().parent().attr("id");
	var gridName = $(selector).prev().prev().children(".grid-no-right").text();
	var gridType = $(selector).prev().children(".grid-no-right").text();
	if($("input[type='checkbox']:checked").length == 0) {
		messageConfirm('请选择要加入的营业部！');
	} else if($("input[type='checkbox']:checked").length == 1) {
		bootbox.dialog({
            message: "是否确认加入?",
            title: "提示信息",
            buttons: {
                OK: {
                    label: "确认",
                    className: "btn-primary",
                    callback: function () {
                    	var checked = $("input[type='checkbox']:checked");
                		var saleDeptCode = $(checked).val();
                		var saleDeptName = $(checked).next().text();
                		$.ajax({
                			url: $.cxt + "/gridBusinessDepartment/addSingleGrid", 
                			type: "POST",
                			data: {
                				orgId: orgId,
                				gridCode: gridCode,
                				gridName: gridName,
                				gridType: gridType,
                				saleDeptCode: saleDeptCode,
                				saleDeptName: saleDeptName
                			},
                			success: function(json) {
                				var data = JSON.parse(json);
                				if(data.code == '0') {
                					$(".scrollBar").empty();
                					getGridDeptInfo(null);
                					$(".scrollBar1").empty();
                					getNoGridDept(null);
                				}
                			}
                		});
                    }
                },
                Cancel: {
                    label: "取消",
                    className: "btn-default",
                    callback: function() {
                    }
                }
            }
        });
	} else {
		messageConfirm('不能加入多个营业部！');
	}
}

// 加入多个网格
function addAllGrid(gridInfo) {
	var orgId = $(".orgId").val();
	if($("input[type='checkbox']:checked").length == 0) {
		messageConfirm('请选择要加入的营业部！！')
	} else if($("input[type='checkbox']:checked").length == 1) {
		if($(".grid-back").length == "0") {
			messageConfirm("无可加入的网格！");
		} else {
			bootbox.dialog({
				message: "是否确认加入?",
				title: "提示信息",
				buttons: {
					OK: {
						label: "确认",
						className: "btn-primary",
						callback: function() {
							var checked = $("input[type='checkbox']:checked");
							var saleDeptCode = $(checked).val();
							var saleDeptName = $(checked).next().text();
							$.ajax({
								url: $.cxt + "/gridBusinessDepartment/addAllGrid", 
								type: "POST",
								data: {
									orgId: orgId,
									gridInfo: JSON.stringify(gridInfo),
									saleDeptCode: saleDeptCode,
									saleDeptName: saleDeptName
								},
								success: function (json) {
									var data = JSON.parse(json);
									if(data.code == '0') {
										$(".scrollBar").empty();
										getGridDeptInfo(null);
										$(".scrollBar1").empty();
										getNoGridDept(null);
									}
								}
							})
						}
					},
					Cancel: {
						label: "取消",
						className: "btn-default",
						callback: function() {
						}
					}
				}
			});
		}
	} else {
		messageConfirm('不能加入多个营业部！');
	}
}

// 多选框
function selectDeptGrid(checkbox) {
	var saleDeptCode = checkbox.value;
	if($("input[type='checkbox']:checked").length > 1) {
		if($(checkbox).is(':checked')) {
			getGridDeptInfo(saleDeptCode);
		} else {
			$('[id=' + saleDeptCode + ']').each(function() {
				$(this).parent().empty();
			})
		}
	} else {
		if($(checkbox).is(':checked')) {
			$(".scrollBar").empty();
			getGridDeptInfo(saleDeptCode);
		} else {
			if($("input[type='checkbox']:checked").length == 0) {
				$(".scrollBar").empty();
				getGridDeptInfo(null);
			} else {
				$('[id=' + saleDeptCode + ']').each(function() {
					$(this).parent().empty();
				})
			}
		}
	}
}

function messageConfirm(msg) {
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
