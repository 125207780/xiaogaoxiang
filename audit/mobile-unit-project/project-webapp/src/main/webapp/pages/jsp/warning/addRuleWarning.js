$(function(){
	initSelectOrg_add()
	changeSelectOrg_add()
	$("#chnl_add").parent().hide()
	//$("#chnl_add").prev().hide()
//	manySelect()
	
	$("#objName_add").chosen();
})

function initSelectOrg_add(){
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
				$("#cityCompany_add").empty()
				$("#areaCompany_add").empty()
				$("#saleDept_add").empty()
				$("#gridAll_add").empty()
			if(orgLevel == '3'){
					$("#saleDept_add").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAll_add").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<json.data.cityInfo.length;i++){
						if(json.data.cityInfo[i] != null){
							$("#cityCompany_add").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
						}
					}
					for(var i=0;i<json.data.areaInfo.length;i++){
						if(json.data.areaInfo[i] != null){
							$("#areaCompany_add").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
						}
					}
					for(var i=0;i<json.data.saleDeptInfo.length;i++){
						if(json.data.saleDeptInfo[i] != null){
							if(json.data.saleDeptInfo[i].saleDeptName != ''){	
								$("#saleDept_add").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
					}
					if(json.data.saleDeptInfo.length == 0){
						$("#saleDept_add").attr("disabled","disabled");
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll_add").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
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
				$("#range_add").empty()
				for(var i=0;i<json.data.length;i++){
					$("#range_add").append(
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
//				
//			}
//		}
//	})
	$.ajax({
		url : $.cxt + "/warning/getWarnStyle",
		type: "POST",
		data:{},
		success : function(data) {
			var json  = JSON.parse(data)
			if(json.code == '0'){
				$("#warningStyle_add").empty()
				for(var i=0;i<json.data.length;i++){
					$("#warningStyle_add").append(
						$("<option>"+json.data[i].LIST_VALUE+"</option>").val(json.data[i].LIST_TYPE)
					)
				}
			}
		}
	})
	$.ajax({
		url : $.cxt + "/warning/getWarnRule",
		type: "POST",
		data:{},
		success : function(data) {
			var json  = JSON.parse(data)
			if(json.code == '0'){
				$("#compareSelect_add").empty()
				for(var i=0;i<json.data.length;i++){
					$("#compareSelect_add").append(
						$("<option>"+json.data[i].LIST_VALUE+"</option>").val(json.data[i].LIST_TYPE)
					)
				}
			}
		}
	})
	$.ajax({
		url : $.cxt + "/warning/getKpiInfo",
		type: "POST",
		data:{},
		success : function(data) {
			var json  = JSON.parse(data)
			if(json.code == '0'){
				$("#kpiSelect_add").empty()
				for(var i=0;i<json.data.length;i++){
					$("#kpiSelect_add").append(
						$("<option>"+json.data[i].KPI_NAME+"</option>").val(json.data[i].KPI_CODE)
					)
				}
			}
		}
	})
}

function changeSelectOrg_add(){
	$("#cityCompany_add").change(function(){
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
						$("#areaCompany_add").empty()
						$("#saleDept_add").empty()
						$("#gridAll_add").empty()
						$("#areaCompany_add").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#saleDept_add").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAll_add").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.areaInfo.length;i++){
							if(json.data.areaInfo[i] != null){
								$("#areaCompany_add").append(
										$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
								)
							}
						}
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								if(json.data.saleDeptInfo[i].saleDeptName != ''){	
									$("#saleDept_add").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
								}
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll_add").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}else{
			initSelectOrg_add()
		}
		
	})
	
	$("#areaCompany_add").change(function(){
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
						$("#saleDept_add").empty()
						$("#gridAll_add").empty()
						$("#saleDept_add").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAll_add").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								if(json.data.saleDeptInfo[i].saleDeptName != ''){	
									$("#saleDept_add").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
								}
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll_add").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}else{
			var cityId = $("#cityCompany_add").find("option:selected").attr('id')
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
						$("#saleDept_add").empty()
						$("#gridAll_add").empty()
						$("#saleDept_add").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAll_add").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								if(json.data.saleDeptInfo[i].saleDeptName != ''){	
									$("#saleDept_add").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
								}
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll_add").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}
		
	})
	
	$("#saleDept_add").change(function(){
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
						$("#gridAll_add").empty()
						$("#gridAll_add").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll_add").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}else{
			var areaId = $("#areaCompany_add").find("option:selected").attr('id')
			if(areaId == undefined){
				areaId = $("#cityCompany_add").find("option:selected").attr('id')
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
						$("#gridAll_add").empty()
						$("#gridAll_add").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll_add").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}
		
	})
	
	$("#gridAll_add").change(function(){
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
						$("#chnl_add").empty()
						$("#chnl_add").append(
								$("<option>"+'请选择...'+"</option>").attr('value','请选择...')
						)
						for(var i=0;i<json.data.length;i++){
							$("#chnl_add").append(
									$("<option>"+json.data[i].CHNL_NAME+"</option>").val(json.data[i].CHNL_CODE).attr('id',json.data[i].CHNL_CODE)
							)
						}
					}
				}
			})
			$.ajax({
				url : $.cxt + "/warning/getGridObject",
				type: "POST",
				data:{gridCode:orgId},
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$(".chosen-select").chosen();
						$("#objName_add").empty()
						var rangeId = $("#range_add").val()
						if(rangeId ==0 ){
							for(var i=0;i<json.data.length;i++){
								$("#objName_add").append(
										$("<option>"+json.data[i].NAME+'('+json.data[i].LOGIN_ID+')'+"</option>").val(json.data[i].LOGIN_ID)	
								)
							}
						}
						$(".chosen-drop").show()
						$("#objName_add").trigger("chosen:updated")	
					}
				}
			})
		}else{
			/*$("#chnl_add").empty()*/
			$("#objName_add").empty()
		}
		
	})
	
	$("#chnl_add").change(function(){
		var orgId = $(this).find("option:selected").attr('id')
		if(orgId != undefined){
			$("#objName_add").empty()
			$.ajax({
				url : $.cxt + "/warning/getchnlObject",
				type: "POST",
				data:{
					chnlCode:orgId
				},
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#objName_add").empty()
						$(".chosen-select").chosen();
						var rangeId = $("#range_add").val()
						if(rangeId == 1 ){
							if(json.data.length > 0){
								for(var i=0;i<json.data.length;i++){
									$("#objName_add").append(
											$("<option>"+json.data[i].USER_NAME+'('+json.data[i].LOGIN_ID+')'+"</option>").val(json.data[i].LOGIN_ID)	
									)
								}
								
								$("#objName_add").trigger("chosen:updated")	
							}else{
								bootbox.dialog({
									message: "该社会渠道没有社会渠道经理！",
									title: "提示信息",
									buttons: {
										OK: {
											label: "确认",
											className: "btn-primary",
											callback: function () {
//												topwindow.removeWindow();//关闭窗口
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
								$(".chosen-drop").hide()
								$("#objName_add").trigger("chosen:updated")
							}
						}
					}
				}
			})
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
	
	$("#range_add").change(function(){
		var rangeId = $(this).find("option:selected").val()
		if(rangeId == '0'){
			$("#gridAll_add").val('请选择...')
			$("#chnl_add").parent().hide()
			//$("#chnl_add").prev().hide()
			$("#objName_add").empty();
			$(".search-choice").remove();
		}else if (rangeId == '1'){
			$("#chnl_add").parents().show()
			//$("#chnl_add").prev().show()
			$("#objName_add").empty();
			$(".search-choice").remove();
		}
	})
	
}
function manySelect(){
	$(".chosen-select").chosen();
	$(window)
	.off('resize.chosen')
	.on('resize.chosen', function() {
		$('.chosen-select').each(function() {
			 var $this = $(this);
			 $this.next().css({'width': $this.parent().width()});
		})
	}).trigger('resize.chosen');
}