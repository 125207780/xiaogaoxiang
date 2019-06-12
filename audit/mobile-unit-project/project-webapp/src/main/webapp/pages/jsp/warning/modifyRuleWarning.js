$(function(){
	initSelectOrg_update()
	changeSelectOrg_update()
	getRangeInfo();//范围
	getWarnStyle();//预警方式
	getWarnRule();//预警规则配置的符号
	getKpiInfo();//
	setTimeout(modifyRuleWarning,1000);
	$("#objName_update").chosen();
})


function initSelectOrg_update(){
	var orgId = $(".orgId").val();
	var orgLevel = getOrgLevel(orgId)
	$.ajax({
		url : $.cxt + "/warning/initSelectOrg",
		type: "POST",
		data:{
			orgId:orgId
		},
		async:false,
		success : function(data) {
			var json  = JSON.parse(data)
			if(json.code == '0'){
				
				$("#cityCompany_update").empty()
				$("#areaCompany_update").empty()
				$("#saleDept_update").empty()
				$("#gridAll_update").empty()
				 if(orgLevel == '3'){
					$("#saleDept_update").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAll_update").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<json.data.cityInfo.length;i++){
						if(json.data.cityInfo[i] != null){
							$("#cityCompany_update").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
						}
					}
					for(var i=0;i<json.data.areaInfo.length;i++){
						if(json.data.areaInfo[i] != null){
							$("#areaCompany_update").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
						}
					}
					for(var i=0;i<json.data.saleDeptInfo.length;i++){
						if(json.data.saleDeptInfo[i] != null){
							if(json.data.saleDeptInfo[i].saleDeptName != ''){	
								$("#saleDept_update").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
					}
					if(json.data.saleDeptInfo.length == 0){
						$("#saleDept_update").attr("disabled","disabled");
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll_update").append(
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
				$("#range_update").empty()
				for(var i=0;i<json.data.length;i++){
					$("#range_update").append(
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
				$("#warningStyle_update").empty()
				for(var i=0;i<json.data.length;i++){
					$("#warningStyle_update").append(
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
				$("#compareSelect_update").empty()
				for(var i=0;i<json.data.length;i++){
					$("#compareSelect_update").append(
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
				$("#kpiSelect_update").empty()
				for(var i=0;i<json.data.length;i++){
					$("#kpiSelect_update").append(
						$("<option>"+json.data[i].KPI_NAME+"</option>").val(json.data[i].KPI_CODE)
					)
				}
			}
		}
	})
}

function changeSelectOrg_update(){
	$("#cityCompany_update").change(function(){
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
						$("#areaCompany_update").empty()
						$("#saleDept_update").empty()
						$("#gridAll_update").empty()
						$("#areaCompany_update").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#saleDept_update").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAll_update").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.areaInfo.length;i++){
							if(json.data.areaInfo[i] != null){
								$("#areaCompany_update").append(
										$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
								)
							}
						}
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								if(json.data.saleDeptInfo[i].saleDeptName != ''){	
									$("#saleDept_update").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
								}
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll_update").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}else{
			initSelectOrg_update()
		}
		
	})
	
	$("#saleDept_update").change(function(){
		var orgId = $(this).find("option:selected").attr('id')
		
			initSaleDeptUpdate(orgId);
			inintChnlInfo();
	})
	
	$("#gridAll_update").change(function(){
		var orgId = $(this).find("option:selected").attr('id')
		if(orgId != undefined){
			inintChnlInfo();
			inintGridObject(orgId);
		}else{
			/*$("#chnl_update").empty()*/
			$("#objName_update").empty()
		}
		
	})
	
	$("#chnl_update").change(function(){
		var orgId = $(this).find("option:selected").attr('id')
		inintChnlObject(orgId);
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
	
	$("#range_update").change(function(){
		var rangeId = $(this).find("option:selected").val()
		if(rangeId == '0'){
			$("#gridAll_update").val('请选择...')
			$("#chnl_update").parent().hide()
			//$("#chnl_update").prev().hide()
			$(".search-choice").remove();
			var orgId = $("#gridAll_update").val();
			inintGridObject(orgId);
			
		}else if (rangeId == '1'){
			$("#chnl_update").parent().show()
			//$("#chnl_update").prev().show()
			inintChnlInfo();
			$(".search-choice").remove();
			var orgId = $("chnl_update").val();
			inintChnlObject(orgId);
		}
	})
	
}


function getRangeInfo(){
	$.ajax({
		url : $.cxt + "/warning/getRangeInfo",
		type: "POST",
		data:{},
		async:false,
		success : function(json) {
			var json  = JSON.parse(json)
			if(json.code == '0'){
				$("#range_update").empty();
				for(var i=0;i<json.data.length;i++){
					$("#range_update").append(
							$("<option>"+json.data[i].LIST_VALUE+"</option>").attr('value',json.data[i].LIST_TYPE)
					)
				}
			}
		}
	})
}

function inintChnlInfo(){
	var orgId = $("#gridAll_update").val();
	$.ajax({
		url : $.cxt + "/warning/getChnlInfo",
		type: "POST",
		data:{
			orgId:orgId
		},
		async:false,
		success : function(data) {
			var json  = JSON.parse(data)
			if(json.code == '0'){
				$("#chnl_update").empty()
				$("#chnl_update").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
				for(var i=0;i<json.data.length;i++){
					$("#chnl_update").append(
							$("<option>"+json.data[i].CHNL_NAME+"</option>").val(json.data[i].CHNL_CODE).attr('id',json.data[i].CHNL_CODE)
					)
				}
			}
		}
	})
}
function inintGridObject(orgId){
	$("#objName_update").empty();
	$("#objName_update").val("");
	$("#objName_update").trigger("chosen:updated")
	$.ajax({
		url : $.cxt + "/warning/getGridObject",
		type: "POST",
		data:{gridCode:orgId},
		async:false,
		success : function(data) {
			var json  = JSON.parse(data)
			if(json.code == '0'){
				var rangeId = $("#range_update").val();
				if(rangeId ==0 ){
					for(var i=0;i<json.data.length;i++){
						$("#objName_update").append(
								$("<option>"+json.data[i].NAME+'('+json.data[i].LOGIN_ID+')'+"</option>").val(json.data[i].LOGIN_ID)	
						)
					}
				}
				$(".chosen-drop").show()
				$("#objName_update").trigger("chosen:updated")	
				
			}
		}
	})
}
function inintChnlObject(orgId){
	$("#objName_update").empty();
	$("#objName_update").val("");
	$("#objName_update").trigger("chosen:updated")	
	if(orgId != undefined){
		
		$.ajax({
			url : $.cxt + "/warning/getchnlObject",
			type: "POST",
			data:{
				chnlCode:orgId
			},
			async:false,
			success : function(data) {
				var json  = JSON.parse(data)
				if(json.code == '0'){
					$("#objName_update").empty()
					$("#objName_update").val("");
					var rangeId = $("#range_update").val()
					if(rangeId == 1 ){
						if(json.data.length > 0){
							for(var i=0;i<json.data.length;i++){
								$("#objName_update").append(
										$("<option>"+json.data[i].USER_NAME+'('+json.data[i].LOGIN_ID+')'+"</option>").val(json.data[i].LOGIN_ID)	
								)
							}
							
							$("#objName_update").trigger("chosen:updated")	
						}else{
							bootbox.dialog({
								message: "该社会渠道没有社会渠道经理！",
								title: "提示信息",
								buttons: {
									OK: {
										label: "确认",
										className: "btn-primary",
										callback: function () {
											//topwindow.removeWindow();//关闭窗口
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
				}
			}
		})
	}
}
function inintAreaCompanyUpdate(orgId){
	if(orgId != undefined){
		$.ajax({
			url : $.cxt + "/warning/getChildrenOrg",
			type: "POST",
			data:{
				orgId:orgId
			},
			async : false,
			success : function(data) {
				var json  = JSON.parse(data)
				if(json.code == '0'){
					$("#gridAll_update").empty()
					$("#gridAll_update").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridAll_update").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
				}
			}
		})
	}
}
function initSaleDeptUpdate(orgId){
	$("#gridAll_update").empty()
	if(orgId != undefined){
		$.ajax({
			url : $.cxt + "/warning/getChildrenOrg",
			type: "POST",
			data:{
				orgId:orgId
			},
			async : false,
			success : function(data) {
				var json  = JSON.parse(data)
				if(json.code == '0'){
					$("#gridAll_update").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridAll_update").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
				}
			}
		})
	}
}

function getWarnStyle(){
	$.ajax({
		url : $.cxt + "/warning/getWarnStyle",
		type : "POST",
		data:{},
		async:false,
		success :function(json){
			var json = JSON.parse(json)
				if(json.code == '0'){
					$("#warningStyle_update").empty();
					for(var i=0;i<json.data.length;i++){
						$("#warningStyle_update").append(
								$("<option>"+json.data[i].LIST_VALUE+"</option>").attr('value',json.data[i].LIST_TYPE)
						)
					}
				}
			}
		})
}

function getWarnRule(){
	$.ajax({
		url : $.cxt + "/warning/getWarnRule",
		type : "POST",
		data:{},
		async:false,
		success :function(json){
			var json = JSON.parse(json)
				if(json.code == '0'){
					$("#compareSelect_update").empty();
					for(var i=0;i<json.data.length;i++){
						$("#compareSelect_update").append(
								$("<option>"+json.data[i].LIST_VALUE+"</option>").attr('value',json.data[i].LIST_TYPE)
						)
					}
				}
			}
		})
}

function getKpiInfo(){
	$.ajax({
		url : $.cxt + "/warning/getKpiInfo",
		type: "POST",
		data:{},
		async:false,
		success : function(data) {
			var json  = JSON.parse(data)
			if(json.code == '0'){
				$("#kpiSelect_update").empty();
				for(var i=0;i<json.data.length;i++){
					$("#kpiSelect_update").append(
						$("<option>"+json.data[i].KPI_NAME+"</option>").val(json.data[i].KPI_CODE)
					)
				}
			}
		}
	})
}

function modifyRuleWarning(){
	$.ajax({
		url : $.cxt + "/warning/checkRuleWarning",
		type: "POST",
		data:{
			warnId:warnId
		},
		success : function(json) {
			var data  = JSON.parse(json)
			if(data.code == '0'){
				
				$("#cityCompany_update").val(data.data[0].CITY_ID);
				$("#areaCompany_update").val(data.data[0].AREA_ID)
				$("#range_update").val(data.data[0].SCOPE)	
				if(data.data[0].SALE_DEPT_CODE != ""){
					$("#saleDept_update").val(data.data[0].SALE_DEPT_CODE)
					initSaleDeptUpdate(data.data[0].SALE_DEPT_CODE);//有营业部加载网格
				}else{
					inintAreaCompanyUpdate(data.data[0].AREA_ID)//没有营业部，就根据区县加载网格
				}
				$("#gridAll_update").val(data.data[0].GRID_CODE);
				
				if(data.data[0].SCOPE == "0"){
					inintGridObject(data.data[0].GRID_CODE)
					$("#chnl_update").parent().hide()
					//$("#chnl_update").prev().hide()
				}else if(data.data[0].SCOPE == "1" ){
					inintChnlInfo();
					inintChnlObject(data.data[0].CHNLORSTATION_ID)
					$("#chnl_update").parent().show()
					//$("#chnl_update").prev().show()
				}
				
				$("#chnl_update").val(data.data[0].CHNLORSTATION_ID)
				$("#warningStyle_update").val(data.data[0].WARN_WAY)
				$("#warnCycle_update").val(data.data[0].WARN_CYCLE);
				$("#warnType_update").val(data.data[0].WARN_TYPE)
				$("#kpiSelect_update").val(data.data[0].WARN_KPI_ID)	
				$("#compareSelect_update").val(data.data[0].WARN_RULE)
				$("#kpiValue_update").val(data.data[0].WARN_VALUE);
				$("#remark_update").val(data.data[0].REMARK);
				selectObjectNameAndId()
				
			}
		}
	})
	
}

function selectObjectNameAndId(){
	$.ajax({
		url : $.cxt + "/warning/selectObjectNameAndId",
		type: "POST",
		data:{
			warnId:warnId
		},
		async:false,
		success : function(json) {
			var data  = JSON.parse(json)
			if(data.code == '0'){
				var html = "";
				var temId = []
				for(var i=0;i<data.data.length;i++){
					temId.push(data.data[i].LOGIN_ID)
				}
				$("#objName_update").val(temId)
				$("#objName_update").trigger("chosen:updated")
				
			}
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