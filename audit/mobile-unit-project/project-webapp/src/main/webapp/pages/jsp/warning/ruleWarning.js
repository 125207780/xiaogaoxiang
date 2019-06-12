$(function(){
	addRuleWarning()
	getRuleWarning()
	initSelectOrg()
	reloadJqGrid('search')
	changeSelectOrg()
	$("#channel").parent().hide()
	
})

$("#clearButton").click(function(){
	initSelectOrg();
	changeSelectOrg();
	$("#warningType option:first").prop("selected", 'selected');//默认选中第一个
	$("#channel").parent().hide();
})
function changeSelectOrg(){
	$("#cityCompany").change(function(){
		var orgId = $(this).find("option:selected").attr('id')
		if(orgId != undefined){
			$.ajax({
				url : $.cxt + "/warning/getChildrenOrg",
				type: "POST",
				data:{
					orgId:orgId
				},
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#areaCompany").empty()
						$("#saleDept").empty()
						$("#gridAll").empty()
						$("#areaCompany").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#saleDept").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAll").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.areaInfo.length;i++){
							if(json.data.areaInfo[i] != null){
								$("#areaCompany").append(
										$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
								)
							}
						}
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								if(json.data.saleDeptInfo[i].saleDeptName != ''){	
									$("#saleDept").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
								}
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}else{
			initSelectOrg()
		}
		
	})
	
	$("#areaCompany").change(function(){
		var orgId = $(this).find("option:selected").attr('id')
		if(orgId != undefined){
			$.ajax({
				url : $.cxt + "/warning/getChildrenOrg",
				type: "POST",
				data:{
					orgId:orgId
				},
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#saleDept").empty()
						$("#gridAll").empty()
						$("#saleDept").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAll").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								if(json.data.saleDeptInfo[i].saleDeptName != ''){	
									$("#saleDept").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
								}
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}else{
			var cityId = $("#cityCompany").find("option:selected").attr('id')
			if(cityId == undefined){
				cityId = $(".orgId").val()
			}
			$.ajax({
				url : $.cxt + "/warning/getChildrenOrg",
				type: "POST",
				data:{
					orgId:cityId
				},
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#saleDept").empty()
						$("#gridAll").empty()
						$("#saleDept").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAll").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								if(json.data.saleDeptInfo[i].saleDeptName != ''){	
									$("#saleDept").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
								}
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}
		
	})
	
	$("#saleDept").change(function(){
		var orgId = $(this).find("option:selected").attr('id')
		if(orgId != undefined){
			$.ajax({
				url : $.cxt + "/warning/getChildrenOrg",
				type: "POST",
				data:{
					orgId:orgId
				},
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#gridAll").empty()
						$("#gridAll").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}else{
			var areaId = $("#areaCompany").find("option:selected").attr('id')
			if(areaId == undefined){
				areaId = $("#cityCompany").find("option:selected").attr('id')
			}
			if(areaId == undefined){
				areaId = $(".orgId").val()
			}
			$.ajax({
				url : $.cxt + "/warning/getChildrenOrg",
				type: "POST",
				data:{
					orgId:areaId
				},
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#gridAll").empty()
						$("#gridAll").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}
		
	})
	
	$("#gridAll").change(function(){
		var orgId = $(this).find("option:selected").attr('id')
		if(orgId != undefined){
			$.ajax({
				url : $.cxt + "/warning/getChnlInfo",
				type: "POST",
				data:{
					orgId:orgId
				},
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						console.log(json)
						$("#channel").empty()
						for(var i=0;i<json.data.length;i++){
							$("#channel").append(
									$("<option>"+json.data[i].CHNL_NAME+"</option>").attr('value',json.data[i].CHNL_CODE)
							)
						}
					}
				}
			})
		}else{
			$("#channel").empty()
		}
		
	})
	
//	$("#channel").change(function(){
//		var gridCode = $("#gridAll").find("option:seleted").val()
//		if(gridCode != undefined){
//			
//		}else{
//			$("#channel").empty()
//			messageConfirm('请选择网格！')
//		}
//	})
	
	$("#range").change(function(){
		var rangeId = $(this).find("option:selected").val()
		if(rangeId == '0'){
			$("#channel").parent().hide()
		}else if (rangeId == '1'){
			$("#channel").parent().show()
		}
	})
	
}

function initSelectOrg(){
	var orgId = $(".orgId").val();
	var orgLevel = getOrgLevel(orgId)
	$.ajax({
		url : $.cxt + "/warning/initSelectOrg",
		type: "POST",
		data:{
			orgId:orgId
		},
		success : function(data) {
			var json  = JSON.parse(data)
			if(json.code == '0'){
				$("#cityCompany").empty()
				$("#areaCompany").empty()
				$("#saleDept").empty()
				$("#gridAll").empty()
				if(orgLevel == '1'){
					$("#cityCompany").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#areaCompany").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#saleDept").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAll").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					
					for(var i=0;i<json.data.cityInfo.length;i++){
						if(json.data.cityInfo[i] != null){
							$("#cityCompany").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
						}
					}
					for(var i=0;i<json.data.areaInfo.length;i++){
						if(json.data.areaInfo[i] != null){
							$("#areaCompany").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
						}
					}
					for(var i=0;i<json.data.saleDeptInfo.length;i++){
						if(json.data.saleDeptInfo[i] != null){
							if(json.data.saleDeptInfo[i].saleDeptName != ''){	
								$("#saleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
					}
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridAll").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
					
				}else if(orgLevel == '2'){
					$("#areaCompany").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#saleDept").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAll").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<json.data.cityInfo.length;i++){
						if(json.data.cityInfo[i] != null){
							$("#cityCompany").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
						}
					}
					for(var i=0;i<json.data.areaInfo.length;i++){
						if(json.data.areaInfo[i] != null){
							$("#areaCompany").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
						}
					}
					for(var i=0;i<json.data.saleDeptInfo.length;i++){
						if(json.data.saleDeptInfo[i] != null){
							if(json.data.saleDeptInfo[i].saleDeptName != ''){	
								$("#saleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
					}
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridAll").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
					
				}else if(orgLevel == '3'){
					$("#saleDept").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAll").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<json.data.cityInfo.length;i++){
						if(json.data.cityInfo[i] != null){
							$("#cityCompany").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
						}
					}
					for(var i=0;i<json.data.areaInfo.length;i++){
						if(json.data.areaInfo[i] != null){
							$("#areaCompany").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
						}
					}
					for(var i=0;i<json.data.saleDeptInfo.length;i++){
						if(json.data.saleDeptInfo[i] != null){
							if(json.data.saleDeptInfo[i].saleDeptName != ''){	
								$("#saleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
					}
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridAll").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
					
				}else if(orgLevel == '4'){
					for(var i=0;i<json.data.cityInfo.length;i++){
						if(json.data.cityInfo[i] != null){
							$("#cityCompany").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
						}
					}
					for(var i=0;i<json.data.areaInfo.length;i++){
						if(json.data.areaInfo[i] != null){
							$("#areaCompany").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
						}
					}
					for(var i=0;i<json.data.saleDeptInfo.length;i++){
						if(json.data.saleDeptInfo[i] != null){
							if(json.data.saleDeptInfo[i].saleDeptName != ''){	
								$("#saleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
					}
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridAll").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
					
				}else if(orgLevel == '5'){
					$("#gridAll").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<json.data.cityInfo.length;i++){
						if(json.data.cityInfo[i] != null){
							$("#cityCompany").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
						}
					}
					for(var i=0;i<json.data.areaInfo.length;i++){
						if(json.data.areaInfo[i] != null){
							$("#areaCompany").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
						}
					}
					for(var i=0;i<json.data.saleDeptInfo.length;i++){
						if(json.data.saleDeptInfo[i] != null){
							if(json.data.saleDeptInfo[i].saleDeptName != ''){	
								$("#saleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
					}
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridAll").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
				}
			}
		}
	})
	
	$.ajax({
		url : $.cxt + "/warning/getRangeInfo",
		type: "POST",
		data:{},
		success : function(data) {
			var json  = JSON.parse(data)
			if(json.code == '0'){
				$("#range").empty()
				for(var i=0;i<json.data.length;i++){
					$("#range").append(
						$("<option>"+json.data[i].LIST_VALUE+"</option>").val(json.data[i].LIST_TYPE)
					)
				}
			}
		}
	})
//	$.ajax({
//		url : $.cxt + "/warning/getWarnType",
//		type: "POST",
//		data:{},
//		success : function(data) {
//			var json  = JSON.parse(data)
//			if(json.code == '0'){
//				console.log(json)
//				$("#warningType").empty()
//				for(var i=0;i<json.data.length;i++){
//					$("#warningType").append(
//						$("<option>"+json.data[i].LIST_VALUE+"</option>").val(json.data[i].LIST_TYPE)	
//					)
//				}
//			}
//		}
//	})
}

function getRuleWarning(){
	$('#waringResultGrid').jqGrid({
		
		datatype:'local',
		mtype : "POST",
		postData : {},
		height : "auto",
		autowidth : true,
		colNames : [ '预警规则名称', '预警对象名称','预警范围', '预警周期','生成时间', '操作' ],
		colModel : [ 
		      {name : 'warnRule',align : 'center',formatter:function(cellvalue, options, cell){
		    	  if(cellvalue == '0'){
		    		  return '>';
		    	  }else if(cellvalue == '1'){
		    		  return '<';
		    	  } if(cellvalue == '2'){
		    		  return '=';
		    	  }else if(cellvalue == '3'){
		    		  return '!=';
		    	  } if(cellvalue == '4'){
		    		  return '>=';
		    	  }else if(cellvalue == '5'){
		    		  return '<=';
		    	  }
		      }}, 
		      {name : 'objName',align : 'center'}, 
		      {name : 'scope',align : 'center',formatter:function(cellvalue, options, cell){
		    	  if(cellvalue == '0'){
		    		  return '网格';
		    	  }else if(cellvalue == '1'){
		    		  return '渠道';
		    	  }
		      }},
		      {name : 'warnCycle',align : 'center'},
		      {name : 'createDate',align : 'center'}, 
		      {name : 'action',align : 'center',formatter:function(cellvalue, options, cell){
		    	  	var html = ""; 
		    	  	html += "<a onclick=\"checkRuleWaring('" + cell.warnId + "')\" href=\"#\">查看</a>&nbsp;&nbsp;&nbsp;&nbsp;"
		    	  	if(rule_level){
		    	  		html += "<a onclick=\"updateRuleWaring('" + cell.warnId + "')\" href=\"#\">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;";
		    	  		html += "<a onclick=\"deleteRuleWaring('" + cell.warnId + "')\" href=\"#\">注销</a>"
		    	  	}
		    		return html;
		      }}
		],
		width : 750,
		autoScroll: true,
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10,20, 30 ],
		pager : '#grid-pager',
		loadComplete : topjqGridLoadComplete
	});
	//查询按钮
	$("#checkButton").click(function(){
		reloadJqGrid("search");
	});
}
//重新加载信息
function reloadJqGrid(flag) {
	var scope = $("#range").find("option:selected").val()
	var objId = $("#gridAll").find("option:selected").attr('id')
	if($("#channel").parent().css('display') != 'none'){
		var chnlCode = $("#channel").find("option:selected").val()
		if(chnlCode != '请选择...'){
			objId = chnlCode
		}
		
	}
	var warnType = $("#warningType").find("option:selected").val()
	$("#waringResultGrid").jqGrid('clearGridData'); 
	$("#waringResultGrid").jqGrid('setGridParam',{    
		url : $.cxt + "/warning/getRuleWarning",
		datatype : "json",
        postData : {
        	scope : scope,
        	objId : objId,
        	warnType : warnType
        },  
        page : 1    
    }).trigger("reloadGrid");
}

function addRuleWarning(){
	$("#addButton").click(function(){
		topwindow.showWindow({
			   title : '预警规则增加',
			   data:{},
			   url : $.cxt + "/pages/jsp/warning/addRuleWarning.jsp",
			   bottons : [{
				   title : "确定" ,
				   fun : function() {
					   var loginId =  $("#objName_add").val().join(',');
						if(validataForm()){
							var scope = $("#range_add").find("option:selected").val()
							var objId = $("#gridAll_add").find("option:selected").val()
							var objName = $("#gridAll_add").find("option:selected").text()
							if($("#chnl_add").parent().css('display') != 'none'){
								objId = $("#chnl_add").find("option:selected").val()
								objName = $("#chnl_add").find("option:selected").text()
							}
							var warnWay = $("#warningStyle_add").find("option:selected").val()
							var warnCycle = $("#warnCycle_add").val()
							var warnType = $("#warnType_add").find("option:selected").val()
							
							var warnKpiId = $("#kpiSelect_add").find("option:selected").val()
							var warnKpiName = $("#kpiSelect_add").find("option:selected").text()
							var warnRule = $("#compareSelect_add").find("option:selected").val()
							var warnValue = $("#kpiValue").val()
							var remark = $("#remark_add").val()
							
							//var loginId = $("#objName_add").find("option:selected").val()
							
							$.ajax({
								url : $.cxt + "/warning/addWarnRule",
								type: "POST",
								data:{
									scope:scope,
									objName:objName,
									objId:objId,
									loginId:loginId,
									warnWay:warnWay,
									warnCycle:warnCycle,
									warnType:warnType,
									warnKpiId:warnKpiId,
									warnKpiName:warnKpiName,
									warnRule:warnRule,
									warnValue:warnValue,
									warnKpiName:warnKpiName,
									remark:remark
								},
								success : function(data) {
									reloadJqGrid("search");
									topwindow.removeWindow();
								}
								
							})
						}
				   }
				   
			   },{
				   title : "重置" ,
				   fun : function() {
					   initSelectOrg_add()
					   $("#chnl_add").hide()
					   $("#chnl_add").prev().hide()
					   $("#remark_add").val('')
					   $("#kpiValue").val('')
					   $("#warnCycle_add").val('')
				   }
			}]
			   
		})
	})
}

function checkRuleWaring(warnId){
	topwindow.showWindow({
		   title : '预警规则查看',
		   data:{},
		   url : $.cxt + "/pages/jsp/warning/checkRuleWarning.jsp?warnId="+warnId,
		   bottons : [{
			   title : "确定" ,
			   fun : function() {
				   topwindow.removeWindow();
			   }
			   
		   }]
		   
	})
}

function updateRuleWaring(warnId){
	topwindow.showWindow({
		   title : '预警规则修改',
		   data:{},
		   url : $.cxt + "/pages/jsp/warning/modifyRuleWarning.jsp?warnId="+warnId,
		   bottons : [{
			   title : "确定" ,
			   fun : function() {
				   var loginId =  $("#objName_update").val().join(',');
					if(valiUpdatedataForm()){
						var scope = $("#range_update").find("option:selected").val()
						var objId = $("#gridAll_update").find("option:selected").val()
						var objName = $("#gridAll_update").find("option:selected").text()
						if($("#chnl_update").parent().css('display') != 'none'){
							objId = $("#chnl_update").find("option:selected").val()
							objName = $("#chnl_update").find("option:selected").text()
						}
						var warnWay = $("#warningStyle_update").find("option:selected").val()
						var warnCycle = $("#warnCycle_update").val()
						var warnType = $("#warnType_update").find("option:selected").val()
						
						var warnKpiId = $("#kpiSelect_update").find("option:selected").val()
						var warnKpiName = $("#kpiSelect_update").find("option:selected").text()
						var warnRule = $("#compareSelect_update").find("option:selected").val()
						var warnValue = $("#kpiValue_update").val()
						var remark = $("#remark_update").val()
						
						$.ajax({
							url : $.cxt + "/warning/updateWarnRule",
							type: "POST",
							data:{
								warnId:warnId,
								scope:scope,
								objName:objName,
								objId:objId,
								loginId:loginId,
								warnWay:warnWay,
								warnCycle:warnCycle,
								warnType:warnType,
								warnKpiId:warnKpiId,
								warnKpiName:warnKpiName,
								warnRule:warnRule,
								warnValue:warnValue,
								warnKpiName:warnKpiName,
								remark:remark
							},
							success : function(data) {
								reloadJqGrid("search");
								topwindow.removeWindow();
							}
							
						})
					}
			   }
		   }/*,{
			   title : "重置" ,
			   fun : function() {
				   initSelectOrg_add()
				   $("#chnl_update").hide()
				   $("#chnl_update").prev().hide()
			   
			   }
		}*/]
		   
	})

}

function deleteRuleWaring(warnId){
	$.ajax({
		url : $.cxt + "/warning/getStauts",
		type: "POST",
		data:{
			warnId:warnId
		},
		success: function(json){
			reloadJqGrid("search");
		}
	})
}
function getOrgLevel(orgId){
	var orgLevel = '';
	$.ajax({
		url : $.cxt + "/kpi/getOrgLevelAndLevelMax",
		type: "POST",
		data:{
			orgId:orgId
		},
		async : false,
		success : function(data) {
			var json  = JSON.parse(data)
			if(json.code == '0'){
				orgLevel = json.data.orgLevel
			}
			
		}
		
	})
	return orgLevel;
}

function validataForm(){
	var flag;
	if($("#cityCompany_add").find("option:selected").attr('id') == undefined){
		messageConfirm('请选择地市！')
		flag = false
		return flag;
	}
	if($("#areaCompany_add").find("option:selected").attr('id') == undefined){
		messageConfirm('请选择区县！')
		flag = false
		return flag;
	}
	/*if($("#saleDept_add").find("option:selected").attr('id') == undefined){
		messageConfirm('请选择营业部！')
		flag = false
		return flag;
	}*/
	if($("#gridAll_add").find("option:selected").attr('id') == undefined){
		messageConfirm('请选择网格！')
		flag = false
		return flag;
	}
	if($("#chnl_add").parent().css('display') != 'none' && $("#chnl_add").find("option:selected").attr('id') == undefined){
		messageConfirm('请选择渠道！')
		flag = false
		return flag;
	}
	if($("#warnCycle_add").val() == '' || $("#warnCycle_add").val() == null){
		messageConfirm('预警周期不能为空！')
		flag = false
		return flag;
	}
	if($("#objName_add").find("option:selected").val() == undefined){
		messageConfirm('请选择预警通知对象！')
		flag = false
		return flag;
	}
	if($("#kpiValue").val() == '' || $("#kpiValue").val() == null){
		messageConfirm('预警值不能为空！')
		flag = false
		return flag;
	}
	flag = true
	return flag;
}

function valiUpdatedataForm(){
	var flag;
	if($("#cityCompany_update").find("option:selected").attr('id') == undefined){
		messageConfirm('请选择地市！')
		flag = false
		return flag;
	}
	if($("#areaCompany_update").find("option:selected").attr('id') == undefined){
		messageConfirm('请选择区县！')
		flag = false
		return flag;
	}
	/*if($("#saleDept_update").find("option:selected").attr('id') == undefined){
		messageConfirm('请选择营业部！')
		flag = false
		return flag;
	}*/
	if($("#gridAll_update").find("option:selected").attr('id') == undefined){
		messageConfirm('请选择网格！')
		flag = false
		return flag;
	}
	if($("#chnl_update").parent().css('display') != 'none' && $("#chnl_update").find("option:selected").attr('id') == undefined){
		messageConfirm('请选择渠道！')
		flag = false
		return flag;
	}
	if($("#warnCycle_update").val() == '' || $("#warnCycle_update").val() == null){
		messageConfirm('预警周期不能为空！')
		flag = false
		return flag;
	}
	if($("#objName_update").find("option:selected").val() == undefined){
		messageConfirm('请选择预警通知对象！')
		flag = false
		return flag;
	}
	if($("#kpiValue_update").val() == '' || $("#kpiValue_update").val() == null){
		messageConfirm('预警值不能为空！')
		flag = false
		return flag;
	}
	flag = true
	return flag;
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