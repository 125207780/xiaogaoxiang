/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};

(function() {
    /** 
     * @exports SearchControlas BMapLib.SearchControl
     */
	var PeripheryControl = BMapLib.PeripheryControl = function(orgId, mainDiv) {
    	this.orgId = orgId;
    	this.mainDiv = mainDiv;
	}

	PeripheryControl.prototype = new BMap.Control();

	PeripheryControl.prototype.initialize = function(map) {
		var treeObj = null;
		this._map = map;
        var me = this;
        var poiInfo = "<div class='poiInfo' style='min-height: 465px; height: 600px; width: 165px; position: absolute; top: 50px; left: 10px; overflow: auto; background: #ffff;'>"
				+ "<div id='returnMenuInfo'>返回</div>"
        		+ "<input type='hidden' id='nowOrgId' value='" + this.orgId + "' />"
				+ "<input type='hidden' value='' id='poiUId' />"
				+ "</div>";
        this.mainDiv.append(poiInfo);
        var periphery = "<div class='pull-left infoTree ztree' id='mapinfoTree'>" + "</div>";
        $(".poiInfo").append(periphery);
        mapInitLeftTree();
		$("#mapinfoTree").css({"height": $(".infoDetail").height()});
		$(".setHeight").each(function(index, ele) {
			$(this).click(function() {
				var setHeight = $(".tab-pane").eq(index).height() + 58
				$("#mapinfoTree").css({"height": setHeight});
			})
		});
		
		$("#returnMenuInfo").on("click", returnMenuInfo);
		function returnMenuInfo() {
			$(".poiInfo").css("display", "none");
    		$("#menuInfo").toggle("blind", {direction: 'left'});
		}
		
		function mapInitLeftTree() {
			var setting = {
				check: {
			        enable: true, // 这里设置是否显示复选框
			        chkboxType: { "Y": "", "N": "" } // 设置复选框是否与 父/子 级相关联
			    },
			    view: {  
			    	selectedMulti: false  
			    },
			    data: {  
			    	keep: {  
			    		parent: true,  
			    		leaf: true  
			    	},  
			    	simpleData: {  
			    		enable: true  
			    	}
			    },
			    callback: {
			    	onCheck: zTreeOnCheck
			    }
	        };
			setting.check.chkboxType = { "Y": "s", "N": "s" }
			$.ajax({
				url: $.cxt + "/netResources/getLeftTree",
				type: "POST",
				success: function (zNodes) {
					treeObj = $.fn.zTree.init($("#mapinfoTree"), setting, zNodes);
					var nodes = treeObj.getChangeCheckedNodes();
					// 设置节点展开
					for(var i = 0; i < nodes.length; i++) { 
		                treeObj.expandNode(nodes[i], true, false, true);
					}
				}
			});
	    			  
			// 該方法點擊樹可做操作
			function zTreeOnCheck(event, treeId, treeNode) {
				var ids = new Array();
				ids = getChildren(ids, treeNode);
				// 定义周边基础单元的渲染对象
				var poiInfo = null;
				for(var i = 0; i < ids.length; i++) {
					if(ids[i].netType == "channel") {
						if(ids[i].checked == true) {
							// 根据渠道开关，显示设置范围内的渠道信息
							poiInfo = new BMapLib.ChannelLayer($("#setRange").val(), $("#poiUId").val(), ids[i].netType, "PART", $("#nowOrgId").val()); 
						} else {
							// 根据渠道开关，隐藏渠道信息
							poiInfo = new BMapLib.ChannelLayer(null, null, null, "PART", $("#nowOrgId").val());
						}
					} else if(ids[i].netType == "station") {
						if(ids[i].checked == true) {
							// 根据基站开关，显示设置范围内的基站信息
							poiInfo = new BMapLib.StationLayer($("#setRange").val(), $("#poiUId").val(), ids[i].netType, "PART", $("#nowOrgId").val());
						} else {
							// 根据基站开关，隐藏基站信息
							poiInfo = new BMapLib.StationLayer(null, null, null, "PART", $("#nowOrgId").val());  
						}
					} else if(ids[i].netType == "mall") {
						if(ids[i].checked == true) {
							// 根据商场开关，显示设置范围内的商场信息
							poiInfo = new BMapLib.MallLayer($("#setRange").val(), $("#poiUId").val(), ids[i].netType, $("#nowOrgId").val());
						} else {
							// 根据商场开关，隐藏商场信息
							poiInfo = new BMapLib.MallLayer(null, null, null, $("#nowOrgId").val()); 
						}
					} else if(ids[i].netType == "school") {
						if(ids[i].checked == true) {
							// 根据学校开关，显示设置范围内的学校信息
							poiInfo = new BMapLib.NewSchoolLayer($("#setRange").val(), $("#poiUId").val(), ids[i].netType, $("#nowOrgId").val());
						} else {
							// 根据学校开关，隐藏学校信息
							poiInfo = new BMapLib.NewSchoolLayer(null, null, null, $("#nowOrgId").val());  
						}
					} else if(ids[i].netType == "village") {
						if(ids[i].checked == true) {
							// 根据村庄开关，显示设置范围内的村庄镇信息
							poiInfo = new BMapLib.VillageLayer($("#setRange").val(), $("#poiUId").val(), ids[i].netType, $("#nowOrgId").val());
						} else {
							// 根据村庄开关，隐藏村庄信息
							poiInfo = new BMapLib.VillageLayer(null, null, null, $("#nowOrgId").val()); 
						}
					} else if(ids[i].netType == "town") {
						if(ids[i].checked == true) {
							// 根据乡镇开关，显示设置范围内的乡镇信息
							poiInfo = new BMapLib.TownLayer($("#setRange").val(), $("#poiUId").val(), ids[i].netType, $("#nowOrgId").val()); 
						} else {
							// 根据乡镇开关，隐藏乡镇信息
							poiInfo = new BMapLib.TownLayer(null, null, null, $("#nowOrgId").val());
						}
					} else if(ids[i].netType == "market") {
						if(ids[i].checked == true){
							// 根据市场开关，显示设置范围内的市场信息
							poiInfo = new BMapLib.MarketLayer($("#setRange").val(), $("#poiUId").val(), ids[i].netType, $("#nowOrgId").val());
						} else {
							// 根据市场开关，隐藏市场信息
			        		poiInfo = new BMapLib.MarketLayer(null, null, null, $("#nowOrgId").val()); 
						}
					} else if(ids[i].netType == "allChannel") {
						if(ids[i].checked == true) {
							// 根据渠道开关，显示设置范围内的渠道信息
							poiInfo = new BMapLib.ChannelLayer(null, null, ids[i].netType, "ALL_CHANNEL", $("#nowOrgId").val());
						} else {
							// 根据渠道开关，隐藏渠道信息
							poiInfo = new BMapLib.ChannelLayer(null, null, null, "ALL_CHANNEL", $("#nowOrgId").val()); 
						}
					} else if(ids[i].netType == "allStation") {
						if(ids[i].checked == true) {
							// 根据基站开关，显示设置范围内的基站信息
							poiInfo = new BMapLib.StationLayer(null, null, ids[i].netType, "ALL_STATION", $("#nowOrgId").val());
						} else {
							// 根据基站开关，隐藏基站信息
			        		poiInfo = new BMapLib.StationLayer(null, null, null, "ALL_STATION", $("#nowOrgId").val()); 
						}
					} else if(ids[i].netType == "allBroadband") {
						  
					} else if(ids[i].netType == "BUI") {
						// 选中基础单元信息导出有弹出框
						if(ids[i].checked == true) {
							$('#modal-map-BUI .modal-title').empty();
							$('#modal-map-BUI .modal-title').append("基础单元信息导出");
							$('#modal-map-BUI').modal({
								backdrop : 'static',
								keyboard : false,
								show : true
							});		
							
							var BUIobj = ids[i];
							// 点击关闭
							$("#modal-map-BUI .modal-dialog .modal-content .modal-header .close").on("click", closeBUIFun);
							function closeBUIFun() {
								// 改变选中的状态，但是还需要更新，要不了没效果
								BUIobj.checked = false;
								treeObj.updateNode(BUIobj);
								// 更新基础单元导出选中状态
								$("input[type='checkbox'][name='exportInfos']").prop("checked", false);
								$("input[type='checkbox'][name='exportSecondInfosNotEnter']").prop("checked", false);
							}
							
							$("#checkAllPoiInfo").on("change", checkAllPoiInfo);
							//未入格全选
							$("#checkAllPoiInfoNotEnter").on("change", checkAllPoiInfoNotEnter);
							//网格导出功能(未入格)
							$("#exportGridInfoNotEnter").on("click", exportGridInfoNotEnter);
							//网格导出功能
							$("#exportGridInfo").on("click", exportGridInfo);
							initGridMapGrid();
							
						}
						
					} else if(ids[i].netType == "PIM") {
						// 选中人员信息维护弹出两个model,把样式进行改变
						if(ids[i].checked == true) {
							document.getElementById("modal-map-CD").style.cssText = "z-index: 30; margin: 0 auto; width: 876px; height: 166px";
							document.getElementById("modal-map-DSPM").style.cssText = "z-index: 30; margin: 0 auto; margin-top: 200px; width: 876px; height: 166px";
						  }
					} else if(ids[i].netType == "DSPM") {
						// 选中直销人员维护有弹出框
						if(ids[i].checked == true) {
							$('#modal-map-DSPM .modal-title').empty();
							$('#modal-map-DSPM .modal-title').append($('<i></i>').addClass("ace-icon fa fa-users")).append("直销人员维护");
							$('#modal-map-DSPM').modal({
								backdrop: 'static',
								keyboard: false,
								show: true
							});
							// 判断父节点是否选中
							if(ids[i].getParentNode().checked == false) {
								document.getElementById("modal-map-DSPM").style.cssText = "z-index: 30";
							}
							var DSPMobj = ids[i];
							//点击关闭
							$("#modal-map-DSPM .modal-dialog .modal-content .modal-header .close").on("click", closeDSPMFun);
							function closeDSPMFun() {
								//改变选中的状态，但是还需要更新，要不了没效果
								DSPMobj.checked = false;
								treeObj.updateNode(DSPMobj);
							}
						}
					} else if(ids[i].netType =="CD") {
						// 选中CD政企客户导入有弹出框
						if(ids[i].checked == true) {
							$('#modal-map-CD .modal-title').empty();
							$('#modal-map-CD .modal-title').append($('<i></i>').addClass("ace-icon fa fa-users")).append("CD政企客户导入");
							$('#modal-map-CD').modal({
								backdrop: 'static',
								keyboard: false,
								show: true
							});	
							// 判断父节点是否选中
							if(ids[i].getParentNode().checked == false) {
								document.getElementById("modal-map-CD").style.cssText = "z-index: 30";
							}
							var CDobj = ids[i];
							// 点击关闭
							$("#modal-map-CD .modal-dialog .modal-content .modal-header .close").on("click", closeCDFun);
							function closeCDFun() {
								// 改变选中的状态，但是还需要更新，要不了没效果
								CDobj.checked = false;
								treeObj.updateNode(CDobj);
							}
						}
					}
					else if(ids[i].netType == "NonCommunity") {
						if(ids[i].checked == true){
							// 根据基站开关，显示设置范围内的未入格小区信息
							poiInfo = new BMapLib.NonCommunityLayer(null, null, ids[i].netType, "Non_Community", $("#nowOrgId").val());
						} else {
							// 根据基站开关，隐藏基站信息
			        		poiInfo = new BMapLib.NonCommunityLayer(null, null, null, "Non_Community", $("#nowOrgId").val()); 
						}
					}
					else if(ids[i].netType == "NonChannel") {
						
						if(ids[i].checked == true) {
							// 根据基站开关，显示设置范围内的未入格渠道信息
							poiInfo = new BMapLib.NonChannelLayer(null, null, ids[i].netType, "NonChannel", $("#nowOrgId").val());
						} else {
							// 根据基站开关，隐藏基站信息
			        		poiInfo = new BMapLib.NonChannelLayer(null, null, null, "NonChannel", $("#nowOrgId").val()); 
						}
					}
					else if(ids[i].netType == "NonStation") {
						if(ids[i].checked == true) {
							// 根据基站开关，显示设置范围内的未入基站信息
							poiInfo = new BMapLib.NonStationLayer(null, null, ids[i].netType, "NonStation", $("#nowOrgId").val());
						} else {
							// 根据基站开关，隐藏基站信息
			        		poiInfo = new BMapLib.NonStationLayer(null, null, null, "NonStation", $("#nowOrgId").val()); 
						}
					}
				}
				// 将周边基础单元的渲染对象放入map中
		    	map.addOverlay(poiInfo);
			}
		}
		
		function getChildren(ids,treeNode) {
			ids.push(treeNode);
			if(treeNode.isParent) {
				for(var obj in treeNode.children) {
					getChildren(ids, treeNode.children[obj]);
				}
			}
			return ids;
		}
       
        $("#mapinfoTree").css({"height": "100%", "width": "170px"}),

        //百度地图搜索框搜索出内容，点击事件（该做法为先有事件，后有节点操作，否则直接用$(".addrssList").onclick(function(){});这种方式没有响应）
        $('body').on('click', '.addressList', initClickInfo);
        function initClickInfo() {
        	$("#poiUId").val("");
        	// 获取地图左表的UID
        	var uId = ($(this).find("span").attr("id") || "").split("_")[1];
        	$("#poiUId").val(uId);
        	// 获取"范围设置"的值
        	var setRange = $("#setRange").val();
			// 将tree对象在tree初始化的时候建立，treeObj为全局变量
        	var nodes = treeObj.getCheckedNodes(true);
        	console.log(nodes);
        	for(var i = 0; i < nodes.length; i++) {
        		// 判断是否渠道
    			if("channel" == nodes[i].netType) {
    				// 将渠道信息在地图上展现出来
    				var channelLayer = new BMapLib.ChannelLayer(setRange, uId, nodes[i].netType, "PART", $("#nowOrgId").val());
    				map.addOverlay(channelLayer);
    			}
    			// 判断是否基站
    			if("station" == nodes[i].netType) {
    				// 将基站信息在地图上展现出来
    				var stationLayer = new BMapLib.StationLayer(setRange, uId, nodes[i].netType, "PART", $("#nowOrgId").val());
    				map.addOverlay(stationLayer);
    			}
    			// 判断是否商场（超市，商铺）
    			if("mall" == nodes[i].netType) {
    				// 将商场信息在地图上展现出来
    				var mallLayer = new BMapLib.MallLayer(setRange, uId, nodes[i].netType, $("#nowOrgId").val());
    				map.addOverlay(mallLayer);
    			}
    			// 判断是否小区
    			if("community" == nodes[i].netType) {
    				// 将小区信息在地图上展现出来
    			}
    			// 判断是否校园
    			if("school" == nodes[i].netType) {
    				// 将校园信息在地图上展现出来
    				var schoolLayer = new BMapLib.NewSchoolLayer(setRange, uId, nodes[i].netType, $("#nowOrgId").val());
    				map.addOverlay(schoolLayer);
    			}
    			// 判断是否村庄
    			if("village" == nodes[i].netType) {
    				// 将村庄信息在地图上展现出来
    				var villageLayer = new BMapLib.VillageLayer(setRange, uId, nodes[i].netType, $("#nowOrgId").val());
    				map.addOverlay(villageLayer);
    			}
    			// 判断是否乡镇
    			if("town" == nodes[i].netType) {
    				// 将乡镇信息在地图上展现出来
    				var townLayer = new BMapLib.TownLayer(setRange, uId, nodes[i].netType, $("#nowOrgId").val());
    				map.addOverlay(townLayer);
    			}
    			// 判断是否聚类市场
    			if("market" == nodes[i].netType) {
    				// 将聚类市场在地图上展现出来
    				var marketLayer = new BMapLib.MarketLayer(setRange, uId, nodes[i].netType, $("#nowOrgId").val());
    				map.addOverlay(marketLayer);
    			}
        		
        	}
        }
	}
	
	// 向命名空间注册.
	BMapLib.PeripheryControl = PeripheryControl;
})()



function initGridMapGrid() {
	var orgId =$("#hiddenOrgId").val();
	$.ajax({
		url: $.cxt + "/gridCommon/initGridInfo",
		data: {orgId: orgId},
		type: "POST",
		success: function(data) {
			var htmltv = "<option value=''>全部</option>";
			for(var i = 0, n = data.length; i < n; i++) {
				htmltv += "<option value='" + data[i].orgId + "'>" + data[i].name + "</option>";
			}
			$("#gridInfos").html(htmltv);
		}
	});
}
function checkAllPoiInfo() {
	if ($("#checkAllPoiInfo").prop("checked"))
	{ // 全选
     $("input[type='checkbox'][name='exportInfos']").prop("checked",true);
	 } else { // 取消全选     
	$("input[type='checkbox'][name='exportInfos']").prop("checked",false);
	 }  
	}

// 基础单元导出伸展
$("#upExportToggle").on("click", upExportToggle);
function upExportToggle(){
	//取消选中状态
	$("input[type='checkbox'][name='exportSecondInfos']").prop("checked",false);
	$("input[type='checkbox'][name='exportSecondInfosNotEnter']").prop("checked",false);
	$("#exportDiv").toggle("blind", null, 0);
	$("#downExportToggleDiv").css("display", "block");
}

// 基础单元导出收缩
$("#downExportToggle").on("click", downExportToggle);
function downExportToggle(){
	$("#exportDiv").toggle("blind", null, 0);
	$("#downExportToggleDiv").css("display", "none");
}
$("#checkSecondAllPoiInfo").on("change", checkSecondAllPoiInfo);
function checkSecondAllPoiInfo() {
	if ($("#checkSecondAllPoiInfo").prop("checked")) { 
		// 全选
        $("input[type='checkbox'][name='exportSecondInfos']").prop("checked",true);
    } else { 
    	// 取消全选     
        $("input[type='checkbox'][name='exportSecondInfos']").prop("checked",false);
    }  
}


$("#exportSecondGridInfo").on("click", exportSecondGridInfo);
function exportSecondGridInfo() {
	var gridInfos = [];
	var gridCode = '';
	var gridName = '';
	// 循环遍历复选框的值
	$.each($('input[name="exportSecondInfos"]:checked'),function(i){
		gridInfos[i] = $(this).val();
    });
	// 判断是否有选择基础单元信息，没有选择则提示选择
	if(null == gridInfos || gridInfos.length == 0 || undefined == gridInfos) {
		messageAlert("请选择要导出的基础单元!");
	} else {
		// 拼接到一个text标签中
		var  orgId = $("#hiddenInput").val();
		var orgLevel=$("#hiddenOrgLevel").val();
		var html = "<input type='text' value='" + gridInfos +"' name='gridInfos' />";
		html += "<input type='text' value='" + gridCode + "' name='gridCode' />";
		html += "<input type='text' value='" + gridName + "' name='gridName' />";
		html += "<input type='text' value='" + orgId + "' name='orgId' />";
		html += "<input type='text' value='" + orgLevel + "' name='orgLevel' />";
		// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
		$('<form method="POST" action="' + $.cxt + '/map/exportGridInfo01">' + html + '</form>').appendTo('body').submit().remove();
	}
}

$("#checkSecondAllPoiInfoNotEnter").on("change", checkSecondAllPoiInfoNotEnter);
function checkSecondAllPoiInfoNotEnter() {
	if ($("#checkSecondAllPoiInfoNotEnter").prop("checked")) { 
		// 全选
        $("input[type='checkbox'][name='exportSecondInfosNotEnter']").prop("checked",true);
    } else { 
    	// 取消全选     
        $("input[type='checkbox'][name='exportSecondInfosNotEnter']").prop("checked",false);
    } 
}


function checkAllPoiInfoNotEnter() {
	if ($("#checkAllPoiInfoNotEnter").prop("checked")) { 
		// 全选
        $("input[type='checkbox'][name='exportInfosNotEnter']").prop("checked",true);
    } else { 
    	// 取消全选     
        $("input[type='checkbox'][name='exportInfosNotEnter']").prop("checked",false);
    }  
}

//未入格导出
$("#exportSecondGridInfoNotEnter").on("click", exportSecondGridInfoNotEnter);
function exportSecondGridInfoNotEnter() {
	var gridInfos = [];
	// 循环遍历复选框的值
	$.each($('input[name="exportSecondInfosNotEnter"]:checked'),function(i){
		gridInfos[i] = $(this).val();
    });
	// 判断是否有选择基础单元信息，没有选择则提示选择
	if(null == gridInfos || gridInfos.length == 0 || undefined == gridInfos) {
		messageAlert("请选择要导出的基础单元!");
	} else {
		// 拼接到一个text标签中
		var  orgId = $("#hiddenInput").val();
		var orgLevel=$("#hiddenOrgLevel").val();
		var html = "<input type='text' value='" + gridInfos +"' name='gridInfos' />";
		html += "<input type='text' value='" + orgId + "' name='orgId' />";
		html += "<input type='text' value='" + orgLevel + "' name='orgLevel' />";
		// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
		$('<form method="POST" action="' + $.cxt + '/map/exportGridInfoNotEnter">' + html + '</form>').appendTo('body').submit().remove();
	}
}


function exportGridInfo() {
	var gridInfos = [];
	var gridCode = $("#gridInfos option:selected").val();
	var gridName = $("#gridInfos option:selected").text();
	// 循环遍历复选框的值
	$.each($('input[name="exportInfos"]:checked'),function(i){
		gridInfos[i] = $(this).val();
    });
	// 判断是否有选择基础单元信息，没有选择则提示选择
	if(null == gridInfos || gridInfos.length == 0 || undefined == gridInfos) {
		messageAlert("请选择要导出的基础单元!");
	} else {
		// 拼接到一个text标签中
		var  orgId = $("#hiddenOrgId").val();
		var orgLevel=$("#hiddenOrgLevel").val();
		var html = "<input type='text' value='" + gridInfos +"' name='gridInfos' />";
		html += "<input type='text' value='" + gridCode + "' name='gridCode' />";
		html += "<input type='text' value='" + gridName + "' name='gridName' />";
		html += "<input type='text' value='" + orgId + "' name='orgId' />";
		html += "<input type='text' value='" + orgLevel + "' name='orgLevel' />";
		// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
		$('<form method="POST" action="' + $.cxt + '/map/exportGridInfo01">' + html + '</form>').appendTo('body').submit().remove();
	}
}


function exportGridInfoNotEnter() {
	var gridInfos = [];
	// 循环遍历复选框的值
	$.each($('input[name="exportInfosNotEnter"]:checked'),function(i){
		gridInfos[i] = $(this).val();
    });
	// 判断是否有选择基础单元信息，没有选择则提示选择
	if(null == gridInfos || gridInfos.length == 0 || undefined == gridInfos) {
		messageAlert("请选择要导出的基础单元!");
	} else {
		// 拼接到一个text标签中
		var  orgId = $("#hiddenOrgId").val();
		var orgLevel=$("#hiddenOrgLevel").val();
		var html = "<input type='text' value='" + gridInfos +"' name='gridInfos' />";
		html += "<input type='text' value='" + orgId + "' name='orgId' />";
		html += "<input type='text' value='" + orgLevel + "' name='orgLevel' />";
		// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
		$('<form method="POST" action="' + $.cxt + '/map/exportGridInfoNotEnter">' + html + '</form>').appendTo('body').submit().remove();
	}
}

// 直销人员导出模板
$("#exportDirectSaleInfo").on("click", exportDirectSaleInfo);
function exportDirectSaleInfo() {
	window.location.href = $.cxt + "/map/exportdirectuser";
}

// 直销人员信息导入
$("#improtDirectSaleInfo").on("click", improtDirectSaleInfo);
function improtDirectSaleInfo() {
	var param = {};
	// 提示没有选择文件
	if($("#directSaleFileDir").val() == "") {
  		messageAlert("请选择上传的数据文件");
  		return;
  	}
  	var fileExtension = $("#directSaleFileDir").val().split('.').pop().toLowerCase();
  	// 提示选择文件大小不能超过30M
  	if(getFileSize("directSaleFileDir") > 30) {
  		messageAlert("数据文件不能大于30M");
  		return;
  	}
  	// 提示选择文件类型
  	if(fileExtension != "xls") {
  		messageAlert("请选择2003版excel");
  		return;
  	}
	$("#upformDirDirectSale").submit();
	return;
}

// 直销人员信息导入后给出提示信息
function getJspDirectSale(msg) {
	messageAlert(msg);
}

// 直销经理查看
$("#directSaleViewBtn").on("click", directSaleViewBtn);
function directSaleViewBtn() {
	$('#modal-map-DSPM').modal('hide');
	$("#scaleModal").modal("show");
	var orgId = $("#hiddenInput").val();
	var colNames = [];
	var colModel = [];
	colNames = [
		'地市名称', '区县名称', '区县编码', '网格名称', '网格编码', '工号编码', '工号姓名', '归属渠道名称',
		'渠道8位编码', '归属渠道经度', '归属渠道纬度', '身份证号码', '性别', '参加移动直销工作时间', '移动电话', '直销员工号状态', '操作'
	];
	colModel = [
    	{name: 'CITY_NAME', align: 'center'},
    	{name: 'CNTY_NAME', align: 'center'},
    	{name: 'CNTY_ID', align: 'center'},
    	{name: 'GRID_NAME', align: 'center'},
    	{name: 'GRID_CODE', align: 'center'},
    	{name: 'OFFICE_ID', align: 'center'},
    	{name: 'NAME', align: 'center'},
    	{name: 'BELONG_CHNL_NAME', align: 'center'},
    	{name: 'BELONG_CHNL_CODE', align: 'center'},
    	{name: 'LNG', align: 'center'},
    	{name: 'LAT', align: 'center'},
    	{name: 'CUST_ID', align: 'center'},
    	{name: 'SEX', align: 'center'},
    	{name: 'WORK_DATE', align: 'center'},
    	{name: 'PHONE', align: 'center'},
    	{name: 'STATUS', align: 'center', formatter:
    		function(cellvalue, options, rowObject) {
    			if(rowObject.STATUS == 1) {
    				return "启用";
    			} else if(rowObject.STATUS == 2) {
    				return "冻结";
    			} else {
    				return "废止";
    			}
    		}
    	},
    	{name: 'OPTION',  align: 'center',editable: true, formatter: 
    		function(cellvalue, options, rowObject) {
	    		if(rowObject.STATUS == 1) {
	    			var temp = "<a style='cursor:hand' onclick=\"modifyStatusInfo('" + rowObject.OFFICE_ID + "', '2')\">冻结</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a style='cursor:hand' onclick=\"modifyStatusInfo('" + rowObject.OFFICE_ID + "', '3')\">废止</a>";
	        		return temp;
				} else if(rowObject.STATUS == 2) {
					var temp = "<a style='cursor:hand' onclick=\"modifyStatusInfo('" + rowObject.OFFICE_ID + "', '1')\">启用</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a style='cursor:hand' onclick=\"modifyStatusInfo('" + rowObject.OFFICE_ID + "', '3')\">废止</a>";
					return temp;
				} else {
					return "已废止";
				}
    		}
    	}
	];
	$('#scaleTable').GridUnload();
	$('#scaleTable').jqGrid({
		url: $.cxt + "/map/getDirectSaleInfo",
		datatype: "json",
		mtype: "POST",
		postData: {orgId: orgId},
		height: 240,
		autowidth: false,
		width: 670,
		colNames: colNames,
		colModel: colModel,
		shrinkToFit: false,
		autoScroll: true,
		viewrecords: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager : '#grid-pager4',
		loadComplete: topjqGridLoadComplete,
		gridComplete : setNiceScroll
	});
	$('.ui-jqgrid-bdiv').getNiceScroll().show();
	$('.ui-jqgrid-bdiv').getNiceScroll().resize();
}

// 修改直销经理状态
function modifyStatusInfo(officeId, statusType) {
	$.ajax({
		url: $.cxt + "/map/updateDirectSaleStatus",
		data: {officeId: officeId, statusType: statusType},
		type: "POST",
		success: function(data) {
			$("#scaleTable").trigger("reloadGrid");
		}
	});
}

// 控制弹出框滚动条样式
var setNiceScroll = function(id){
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight: $(window).height()-190,
	    cursorcolor: "#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
	$('.ui-jqgrid-bdiv').getNiceScroll().show();
	$('.ui-jqgrid-bdiv').getNiceScroll().resize();
}

// 提示信息框
function messageAlert(message) {
	bootbox.dialog({
		message: "<span style=\"color:#000\">" + message + "</span>",
		title: "消息提示",
		buttons: {
			OK: {
				label: "确定",
				className: "btn-success"
			}
		}
	});
}

// 判断文件大小
function getFileSize(eleId) {
	try {
		var size = 0;
		// byte
		size = $('#' + eleId)[0].files[0].size;
		// kb
		size = size / 1024;
		// mb
		size = size / 1024;
		return size;
	} catch (e) {
		alert("错误：" + e);
		return -1;
	}
}

//CD类政企客户导出模板
$("#exportGovBusInfo").on("click", exportGovBusInfo);
function exportGovBusInfo() {
	window.location.href = $.cxt + "/map/exportdirectuser01";
}

//CD类政企客户信息导入
$("#improtGovBusInfo").on("click", improtGovBusInfo);
function improtGovBusInfo() {
	var param = {};
	// 提示没有选择文件
	if($("#govBusFileDir").val() == "") {
  		messageAlert("请选择上传的数据文件");
  		return;
  	}
  	var fileExtension = $("#govBusFileDir").val().split('.').pop().toLowerCase();
  	// 提示选择文件大小不能超过30M
  	if(getFileSize("govBusFileDir") > 30) {
  		messageAlert("数据文件不能大于30M");
  		return;
  	}
  	// 提示选择文件类型
  	if(fileExtension != "xls") {
  		messageAlert("请选择2003版excel");
  		return;
  	}
	$("#upformDirGovBus").submit();
	return;
}

//CD类政企客户查看
$("#govBusViewBtn").on("click", govBusViewBtn);
function govBusViewBtn() {
	$('#modal-map-CD').modal('hide');
	$("#govBusModal").modal("show");
	var orgId = $("#hiddenInput").val();
	var colNames = [];
	var colModel = [];
	colNames = [
		'地市名称', '区县名称', '区县编码', '网格名称', '网格编码', 'CD类政企客户名称', 'CD类政企客户编码', '地址',
		'联系人', '联系电话', '经度', '纬度'
	];
	colModel = [
    	{name: 'CITY_NAME', align: 'center'},
    	{name: 'CNTY_NAME', align: 'center'},
    	{name: 'CNTY_ID', align: 'center'},
    	{name: 'GRID_NAME', align: 'center'},
    	{name: 'GRID_CODE', align: 'center'},
    	{name: 'GC_NAME', align: 'center'},
    	{name: 'GC_CODE', align: 'center'},
    	{name: 'ADDR', align: 'center'},
    	{name: 'MANAGER', align: 'center'},
    	{name: 'PHONE', align: 'center'},
    	{name: 'LON', align: 'center'},
    	{name: 'LAT', align: 'center'},
	];
	$('#govBusTable').GridUnload();
	$('#govBusTable').jqGrid({
		url: $.cxt + "/map/getGovBusInfo",
		datatype: "json",
		mtype: "POST",
		postData: {orgId: orgId},
		height: 240,
		autowidth: false,
		width: 670,
		colNames: colNames,
		colModel: colModel,
		shrinkToFit: false,
		autoScroll: true,
		viewrecords: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager : '#grid-pager7',
		loadComplete: topjqGridLoadComplete,
		gridComplete : setNiceScroll
	});
	$('.ui-jqgrid-bdiv').getNiceScroll().show();
	$('.ui-jqgrid-bdiv').getNiceScroll().resize();
}

$("#directSaleMaintainBtn").on("click", modifydirectSaleInfo);
//弹出维护直销经理信息窗口
function modifydirectSaleInfo() {
	$('#modal-map-DSPM').modal('hide');
	$("#modifyModal").modal("show");
//	$("#citySelect").empty();
//	$("#citySelect").append("<option value='雨花区' selected='selected'>雨花区</option>");
	queryDirectSaleInfo();
	
}

//根据条件查询直销人员
function queryDirectSaleInfo() {
	var inGrid = $('input:radio[name="gridSelect"]:checked').val();
	var city = $("#citySelect").val();
	var cnty = $("#cntySelect").val();
	
	var colNames = [];
	var colModel = [];
	colNames = [
		'地市名称', '区县名称', '区县编码', '网格名称', '网格编码', '工号编码', '工号姓名', '归属渠道名称',
		'渠道8位编码', '归属渠道经度', '归属渠道纬度', '身份证号码', '性别', '参加移动直销工作时间', '移动电话', '直销员工号状态'
	];
	colModel = [
 	{name: 'CITY_NAME', align: 'center'},
 	{name: 'CNTY_NAME', align: 'center'},
 	{name: 'CNTY_ID', align: 'center'},
 	{name: 'GRID_NAME', align: 'center'},
 	{name: 'GRID_CODE', align: 'center'},
 	{name: 'OFFICE_ID', align: 'center'},
 	{name: 'NAME', align: 'center'},
 	{name: 'BELONG_CHNL_NAME', align: 'center'},
 	{name: 'BELONG_CHNL_CODE', align: 'center'},
 	{name: 'LNG', align: 'center'},
 	{name: 'LAT', align: 'center'},
 	{name: 'CUST_ID', align: 'center'},
 	{name: 'SEX', align: 'center'},
 	{name: 'WORK_DATE', align: 'center'},
 	{name: 'PHONE', align: 'center'},
 	{name: 'STATUS', align: 'center', formatter:
 		function(cellvalue, options, rowObject) {
 			if(rowObject.STATUS == 1) {
 				return "启用";
 			} else if(rowObject.STATUS == 2) {
 				return "冻结";
 			} else {
 				return "废止";
 			}
 		}
 	}
	];
	
	$('#modifyTable').GridUnload();
	$('#modifyTable').jqGrid({
		url: $.cxt + "/map/getDirectSaleInfoByParam?ingrid="+inGrid+"&orgid="+$("#hiddenInput").val(),
		datatype: "json",
		mtype: "POST",
		postData: {},
		height: 240,
		autowidth: false,
		width: 850,
		colNames: colNames,
		colModel: colModel,
		shrinkToFit: false,
		autoScroll: true,
		viewrecords: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		multiselect:true,
		pager : '#grid-pager5',
		loadComplete: topjqGridLoadComplete,
		gridComplete : function() {
			$("#modifyTable").niceScroll({
				cursorheight: $(window).height()-190,
			    cursorcolor: "#5cd4f8",
			    cursorborder: "1px solid #5cd4f8",
			    touchbehavior: false,
			    spacebarenabled: true,
			    railoffset: false
			});
			$('.ui-jqgrid-bdiv').getNiceScroll().show();
			$('.ui-jqgrid-bdiv').getNiceScroll().resize();
		}
	});
	
}

//点击维护中的更新渠道
function selectChannel() {
	var ids=$('#modifyTable').jqGrid('getGridParam','selarrrow');
	if(ids == null || ids.length == 0){
		messageAlert("请先选择要更新渠道的人员！");
		return;
	}
	var selectedOfficeids = new Array();
	for (var i = 0; i < ids.length; i++) {
		selectedOfficeids.push($('#modifyTable').jqGrid('getRowData',ids[i]).OFFICE_ID);
	}
	$("#selectedOfficeids").val(selectedOfficeids);
	$("#channelSelectModal").modal("show");
	var colNames = [];
	var colModel = [];
	colNames = ['渠道名称', '渠道编码'];
	colModel = [
 	{name: 'CHNL_NAME', align: 'center'},
 	{name: 'CHNL_CODE', align: 'center'}
	];
	
	$('#channelSelectTable').GridUnload();
	$('#channelSelectTable').jqGrid({
		url: $.cxt + "/map/selectChannelByOrgid?orgid="+$("#hiddenInput").val(),
		datatype: "json",
		mtype: "POST",
		postData: {},
		height: 240,
		autowidth: true,
		width: 500,
		colNames: colNames,
		colModel: colModel,
		shrinkToFit: false,
		autoScroll: true,
		viewrecords: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		multiselect:true,
		pager : '#grid-pager6',
		loadComplete: topjqGridLoadComplete,
		gridComplete : setNiceScroll
	});
}

//在选择网格中点击确定
function sureSelectGrid() {
	var ids=$('#channelSelectTable').jqGrid('getGridParam','selarrrow');
	if(ids == null || ids.length > 1 || ids.length == 0){
		messageAlert("必须且只能选择一个渠道！");
		return;
	}
	alert($('#channelSelectTable').jqGrid('getRowData',ids[0]).CHNL_NAME);
	alert($('#channelSelectTable').jqGrid('getRowData',ids[0]).CHNL_CODE);
	$.ajax({
		url: $.cxt + "/map/updateDirectSaleChannel",
		data: {
			CHNL_NAME:$('#channelSelectTable').jqGrid('getRowData',ids[0]).CHNL_NAME,
			CHNL_CODE:$('#channelSelectTable').jqGrid('getRowData',ids[0]).CHNL_CODE,
			officeids:$("#selectedOfficeids").val()
			},
		type: "POST",
		success: function(data) {
			//queryDirectSaleInfo();
			$("#channelSelectModal").modal("hide");
			$("#modifyTable").trigger("reloadGrid");
		}
	});
}


$("#govBusMaintainBtn").on("click", modifyGovBusInfo);
//弹出维护CD类政企客户信息窗口
function modifyGovBusInfo() {
	$('#modal-map-CD').modal('hide');
	$("#modifyCDModal").modal("show");
//	$("#citySelect").empty();
//	$("#citySelect").append("<option value='雨花区' selected='selected'>雨花区</option>");
	queryGovBusInfo();
}

//根据条件查询CD类政企客户
function queryGovBusInfo() {
	var inGrid = $('input:radio[name="grid"]:checked').val();
	var city = $("#citySelect").val();
	var cnty = $("#cntySelect").val();
	var colNames = [];
	var colModel = [];
	colNames = [
		'地市名称', '区县名称', '区县编码', '网格名称', '网格编码', 'CD类政企客户名称', 'CD类政企客户编码', '地址',
		'联系人', '联系电话', '经度', '纬度'
		
	];
	colModel = [
 	{name: 'CITY_NAME', align: 'center'},
 	{name: 'CNTY_NAME', align: 'center'},
 	{name: 'CNTY_ID', align: 'center'},
 	{name: 'GRID_NAME', align: 'center'},
 	{name: 'GRID_CODE', align: 'center'},
 	{name: 'GC_NAME', align: 'center'},
 	{name: 'GC_CODE', align: 'center'},
 	{name: 'ADDR', align: 'center'},
 	{name: 'MANAGER', align: 'center'},
 	{name: 'PHONE', align: 'center'},
 	{name: 'LON', align: 'center'},
 	{name: 'LAT', align: 'center'}
	];
	
	$('#modifyCDTable').GridUnload();
	$('#modifyCDTable').jqGrid({
		url: $.cxt + "/map/getGovBusInfoByParam?ingrid="+inGrid+"&orgId="+$("#hiddenInput").val(),
		datatype: "json",
		mtype: "POST",
		postData: {},
		height: 240,
		autowidth: false,
		width: 850,
		colNames: colNames,
		colModel: colModel,
		shrinkToFit: false,
		autoScroll: true,
		viewrecords: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		multiselect:true,
		pager : '#grid-pager8',
		loadComplete: topjqGridLoadComplete,
		gridComplete : function() {
			$("#modifyCDTable").niceScroll({
				cursorheight: $(window).height()-190,
			    cursorcolor: "#5cd4f8",
			    cursorborder: "1px solid #5cd4f8",
			    touchbehavior: false,
			    spacebarenabled: true,
			    railoffset: false
			});
			$('.ui-jqgrid-bdiv').getNiceScroll().show();
			$('.ui-jqgrid-bdiv').getNiceScroll().resize();
		}
	});	
}

//点击维护中的导入网格
function selectCDGrid() {
	var ids=$('#modifyCDTable').jqGrid('getGridParam','selarrrow');
	if(ids == null || ids.length == 0){
		messageAlert("请先选择要指派网格的人员！");
		return;
	}
	var selectedGcCodes = new Array();
	for (var i = 0; i < ids.length; i++) {
		selectedGcCodes.push($('#modifyCDTable').jqGrid('getRowData',ids[i]).GC_CODE);
	}
	$("#selectedGcCodes").val(selectedGcCodes);
	$("#cdGridSelectModal").modal("show");
	var colNames = [];
	var colModel = [];
	colNames = ['网格名称', '网格编码'];
	colModel = [
 	{name: 'NAME', align: 'center'},
 	{name: 'ORGID', align: 'center'}
	];
	
	$('#cdGridSelectTable').GridUnload();
	$('#cdGridSelectTable').jqGrid({
		url: $.cxt + "/map/selectGridByOrgid?orgid="+$("#hiddenInput").val(),
		datatype: "json",
		mtype: "POST",
		postData: {},
		height: 240,
		autowidth: false,
		width: 600,
		colNames: colNames,
		colModel: colModel,
		shrinkToFit: false,
		autoScroll: true,
		viewrecords: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		multiselect:true,
		pager : '#grid-pager9',
		loadComplete: topjqGridLoadComplete,
		gridComplete : setNiceScroll
	});
}

//CD类维护中在选择网格中点击确定
function cdSureSelectGrid() {
	var ids=$('#cdGridSelectTable').jqGrid('getGridParam','selarrrow');
	if(ids == null || ids.length > 1 || ids.length == 0){
		messageAlert("必须且只能选择一个网格！");
		return;
	}
	$.ajax({
		url: $.cxt + "/map/addGovBusGrid",
		data: {
			GRID_NAME:$('#cdGridSelectTable').jqGrid('getRowData',ids[0]).NAME,
			GRID_CODE:$('#cdGridSelectTable').jqGrid('getRowData',ids[0]).ORGID,
			gcCodes:$("#selectedGcCodes").val()
			},
		type: "POST",
		success: function(data) {
			//queryDirectSaleInfo();
			$("#cdGridSelectModal").modal("hide");
			$("#modifyCDTable").trigger("reloadGrid");
		}
	});
}

//CD类点击维护中的删除网格
function deleteCDGrid() {
	var ids=$('#modifyCDTable').jqGrid('getGridParam','selarrrow');
	if(ids == null || ids.length == 0){
		messageAlert("请先选择要删除网格的人员！");
		return;
	}
	var gcCodes = new Array();
	
	for (var i = 0; i < ids.length; i++) {
		gcCodes.push($('#modifyCDTable').jqGrid('getRowData',ids[i]).GC_CODE);
	}
	
	if(confirm("确认移出这些人员的网格吗？")){
		$.ajax({
			url: $.cxt + "/map/removeGovBusGrid?oids="+gcCodes,
			data: { 
					
				  },
			type: "POST",
			success: function(data) {
				if(data == "0"){
					$("#modifyCDTable").trigger("reloadGrid");
				}
				else {
					alert("移除失败，请重试！");
				}
			}
		});
	}
}
