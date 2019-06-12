$(function(){
	initSeletOrg();
	initDate();
	gridWgMsContractAreaDevelopfoListGrid(orgId);
	initType();
})
$("#reset").click(function(){
	initSeletOrg();
	initType();
	$("#AccountPeriod").val("");
});
function initDate(){
	console.log($("#AccountPeriod"))
	$("#AccountPeriod").datepicker({
		format: 'yyyymmdd',
		language:  'zh-CN',
		todayBtn : "linked",
		autoclose:true,
		minview : "3"
	});
	$("#AccountPeriod").change(function(){
		var valueDate = $(this).val();
	})
}
	var gridOrgId = "";
function gridWgMsContractAreaDevelopfoListGrid(orgId){
	$("#wgMsContractAreaDevelopListGrid").jqGrid('clearGridData');
	$("#wgMsContractAreaDevelopListGrid").GridUnload();
	   grid = $("#wgMsContractAreaDevelopListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/wgMsContractAreaDevelop/getWgMsContractAreaDevelopInfo",
		   datatype : "json",
		   mtype : "POST",
		   postData : {orgId:orgId},
		   height : 200,
		   autowidth : true,
		   colNames: [ '序号','归属区县', '网格名称', '包保渠道名称', '渠道类型','基础单元名称','基础单元地址','基础单元类型','专线','宽带','移动','其他','合计'], 
		   colModel: [ 
		       { name: 'rowNum', index: 'rowNum',align: 'center' ,width : 50}, 
		       { name: 'areaName', index: 'areaName',align: 'center'}, 
		       { name: 'gridName', index: 'gridName', align: 'center'}, 
		       { name: 'chnlName', index: 'chnlName',align: 'center' }, 
		       { name: 'chnlType', index: 'chnlType',align: 'center'}, 
		       { name: 'physicalName', index: 'physicalName',  align:'center'}, 
		       { name: 'addr', index: 'addr',align: 'center'}, 
		       { name: 'smallType', index: 'smallType', align: 'center'}, 
		       { name: 'lineNum', index: 'lineNum',align: 'center' }, 
		       { name: 'kdNum', index: 'kdNum',align: 'center'}, 
		       { name: 'mobileNum', index: 'mobileNum',  align:'center'}, 
		       { name: 'qtNum', index: 'qtNum',align: 'center'}, 
		       { name: 'totalNum', index: 'totalNum',  align:'center'}
		   ], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			width:880,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			pager : '#wgMsContractAreaDevelopPagers',
			gridComplete: function() { 
				$(".ui-jqgrid-bdiv").getNiceScroll().resize();
				   setNiceScroll();
			  } ,
			loadComplete : topjqGridLoadComplete
	}); 
	   	//查询按钮
		$("#searchList").click(function(){
			reloadBasicUnitJqGrid("search");
		});
		//导出
		$("#export").click(function(){
			var bigType = "";
			var smallType = "";
			var statisDate = "";
			
			statisDate = $("#AccountPeriod").val();
			if(statisDate == undefined){
				statisDate = "";
			}
			bigType = $("#bigType").find("option:selected").text();
			if(bigType =="请选择..."){
				bigType = "";
			}
			smallType = $("#smallType").find("option:selected").text();
			if(smallType =="请选择..."){
				smallType = "";
			}
			gridName = $("#gridName").find("option:selected").val();
			if(gridName == "请选择..."){
				gridOrgId = $("#girdSaleDept").find("option:selected").val();
				if(gridOrgId == '请选择...'){
					gridOrgId = $("#girdAreaCompany").find("option:selected").val();
					if(gridOrgId == '请选择...'){
						gridOrgId = $("#girdCityCompany").find("option:selected").val();
						if(gridOrgId == '请选择...'){
							gridOrgId = '1'
						}
					}
				}
				
			}
			window.location.href=$.cxt +"/wgMsContractAreaDevelop/export?orgId="+gridOrgId+"&bigType="+ encodeURI(encodeURI(bigType))+"&smallType="+ encodeURI(encodeURI(smallType))+"&statisDate="+ encodeURI(encodeURI(statisDate));
		})
	}
var reloadBasicUnitJqGrid = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	var bigType = "";
	var smallType = "";
	var statisDate = "";
	
	statisDate = $("#AccountPeriod").val();
	if(statisDate == undefined){
		statisDate = "";
	}
	bigType = $("#bigType").find("option:selected").text();
	if(bigType =="请选择..."){
		bigType = "";
	}
	smallType = $("#smallType").find("option:selected").text();
	if(smallType =="请选择..."){
		smallType = "";
	}
	gridName = $("#gridName").find("option:selected").val();
	if(gridName == "请选择..."){
		gridOrgId = $("#girdSaleDept").find("option:selected").val();
		if(gridOrgId == '请选择...'){
			gridOrgId = $("#girdAreaCompany").find("option:selected").val();
			if(gridOrgId == '请选择...'){
				gridOrgId = $("#girdCityCompany").find("option:selected").val();
				if(gridOrgId == '请选择...'){
					gridOrgId = '1'
				}
			}
		}
		
	}
	$("#wgMsContractAreaDevelopListGrid").jqGrid('setGridParam',{    
        postData : {
        	orgId:gridOrgId,
        	bigType:bigType,
        	smallType:smallType,
        	statisDate:statisDate,
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}

function initSeletOrg(){
	var orgId = $(".orgId").val();
	var orgLevel = getOrgLevel(orgId)
	$.ajax({
		url : $.cxt + "/wgMsContractAreaDevelop/initSeletOrg",
		type: "POST",
		data:{
			orgId:orgId
		},
		async : false,
		success: function(json){
			var data  = JSON.parse(json)
			if(data.code == '0'){
				
				$("#girdCityCompany").empty();
				$("#girdAreaCompany").empty();
				$("#girdSaleDept").empty();
				$("#gridName").empty();
				if(orgLevel == '1'){
					$("#girdCityCompany").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#girdAreaCompany").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#girdSaleDept").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridName").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<data.data.cityInfo.length;i++){
						$("#girdCityCompany").append(
								$("<option>"+data.data.cityInfo[i].cityName+"</option>").val(data.data.cityInfo[i].cityId).attr("id",data.data.cityInfo[i].cityId)
						)
					}
					for(var i=0;i<data.data.areaInfo.length;i++){
						$("#girdAreaCompany").append(
								$("<option>"+data.data.areaInfo[i].areaName+"</option>").val(data.data.areaInfo[i].areaId).attr("id",data.data.areaInfo[i].areaId)
						)
					}
					for(var i=0;i<data.data.saleDeptInfo.length;i++){
						$("#girdSaleDept").append(
								$("<option>"+data.data.saleDeptInfo[i].saleDeptName+"</option>").val(data.data.saleDeptInfo[i].saleDeptCode).attr("id",data.data.saleDeptInfo[i].saleDeptCode)
						)
					}
					for(var i=0;i<data.data.gridInfo.length;i++){
						$("#gridName").append(
								$("<option>"+data.data.gridInfo[i].gridName+"</option>").val(data.data.gridInfo[i].gridCode).attr("id",data.data.gridInfo[i].gridCode)
						)
					}
				}else if(orgLevel == '2'){
					$("#girdAreaCompany").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#girdSaleDept").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridName").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<data.data.cityInfo.length;i++){
						$("#girdCityCompany").append(
								$("<option>"+data.data.cityInfo[i].cityName+"</option>").val(data.data.cityInfo[i].cityId).attr("id",data.data.cityInfo[i].cityId)
						)
					}
					for(var i=0;i<data.data.areaInfo.length;i++){
						$("#girdAreaCompany").append(
								$("<option>"+data.data.areaInfo[i].areaName+"</option>").val(data.data.areaInfo[i].areaId).attr("id",data.data.areaInfo[i].areaId)
						)
					}
					for(var i=0;i<data.data.saleDeptInfo.length;i++){
						$("#girdSaleDept").append(
								$("<option>"+data.data.saleDeptInfo[i].saleDeptName+"</option>").val(data.data.saleDeptInfo[i].saleDeptCode).attr("id",data.data.saleDeptInfo[i].saleDeptCode)
						)
					}
					for(var i=0;i<data.data.gridInfo.length;i++){
						$("#gridName").append(
								$("<option>"+data.data.gridInfo[i].gridName+"</option>").val(data.data.gridInfo[i].gridCode).attr("id",data.data.gridInfo[i].gridCode)
						)
					}
				}else if(orgLevel == '3'){
					$("#girdSaleDept").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridName").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<data.data.cityInfo.length;i++){
						$("#girdCityCompany").append(
								$("<option>"+data.data.cityInfo[i].cityName+"</option>").val(data.data.cityInfo[i].cityId).attr("id",data.data.cityInfo[i].cityId)
						)
					}
					for(var i=0;i<data.data.areaInfo.length;i++){
						$("#girdAreaCompany").append(
								$("<option>"+data.data.areaInfo[i].areaName+"</option>").val(data.data.areaInfo[i].areaId).attr("id",data.data.areaInfo[i].areaId)
						)
					}
					for(var i=0;i<data.data.saleDeptInfo.length;i++){
						$("#girdSaleDept").append(
								$("<option>"+data.data.saleDeptInfo[i].saleDeptName+"</option>").val(data.data.saleDeptInfo[i].saleDeptCode).attr("id",data.data.saleDeptInfo[i].saleDeptCode)
						)
					}
					for(var i=0;i<data.data.gridInfo.length;i++){
						$("#gridName").append(
								$("<option>"+data.data.gridInfo[i].gridName+"</option>").val(data.data.gridInfo[i].gridCode).attr("id",data.data.gridInfo[i].gridCode)
						)
					}
				}else if(orgLevel == '4'){
					for(var i=0;i<data.data.cityInfo.length;i++){
						$("#girdCityCompany").append(
								$("<option>"+data.data.cityInfo[i].cityName+"</option>").val(data.data.cityInfo[i].cityId).attr("id",data.data.cityInfo[i].cityId)
						)
					}
					for(var i=0;i<data.data.areaInfo.length;i++){
						$("#girdAreaCompany").append(
								$("<option>"+data.data.areaInfo[i].areaName+"</option>").val(data.data.areaInfo[i].areaId).attr("id",data.data.areaInfo[i].areaId)
						)
					}
					for(var i=0;i<data.data.saleDeptInfo.length;i++){
						$("#girdSaleDept").append(
								$("<option>"+data.data.saleDeptInfo[i].saleDeptName+"</option>").val(data.data.saleDeptInfo[i].saleDeptCode).attr("id",data.data.saleDeptInfo[i].saleDeptCode)
						)
					}
					for(var i=0;i<data.data.gridInfo.length;i++){
						$("#gridName").append(
								$("<option>"+data.data.gridInfo[i].gridName+"</option>").val(data.data.gridInfo[i].gridCode).attr("id",data.data.gridInfo[i].gridCode)
						)
					}
				}else if(orgLevel == '5'){
					$("#gridName").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<data.data.cityInfo.length;i++){
						$("#girdCityCompany").append(
								$("<option>"+data.data.cityInfo[i].cityName+"</option>").val(data.data.cityInfo[i].cityId).attr("id",data.data.cityInfo[i].cityId)
						)
					}
					for(var i=0;i<data.data.areaInfo.length;i++){
						$("#girdAreaCompany").append(
								$("<option>"+data.data.areaInfo[i].areaName+"</option>").val(data.data.areaInfo[i].areaId).attr("id",data.data.areaInfo[i].areaId)
						)
					}
					for(var i=0;i<data.data.saleDeptInfo.length;i++){
						$("#girdSaleDept").append(
								$("<option>"+data.data.saleDeptInfo[i].saleDeptName+"</option>").val(data.data.saleDeptInfo[i].saleDeptCode).attr("id",data.data.saleDeptInfo[i].saleDeptCode)
						)
					}
					for(var i=0;i<data.data.gridInfo.length;i++){
						$("#gridName").append(
								$("<option>"+data.data.gridInfo[i].gridName+"</option>").val(data.data.gridInfo[i].gridCode).attr("id",data.data.gridInfo[i].gridCode)
						)
					}
				}
			}
		}
	})
}
//选中机构下拉框
function changeSelectOrg(option){
	var orgId = $(option).find("option:selected").attr('id')
	var selectId = $(option).attr('id')
	if(selectId == 'girdCityCompany'){
		if(orgId != undefined){
			gridOrgId = orgId
			$.ajax({
				url : $.cxt + '/wgMsContractAreaDevelop/getChildrenOrg',
				type: "POST",
				data:{
					orgId:orgId
				},
				async : false,
				success : function(data){
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#girdAreaCompany").empty();
						$("#girdAreaCompany").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#girdSaleDept").empty();
						$("#girdSaleDept").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridName").empty();
						$("#gridName").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.areaInfo.length;i++){
							if(json.data.areaInfo[i] != null){
								$("#girdAreaCompany").append(
										$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
								)
							}
						}
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								$("#girdSaleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridName").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}else{
			initSeletOrg();
			gridOrgId = 1;
		}
	}
	if(selectId == 'girdAreaCompany'){
		gridOrgId = orgId;
		if(orgId != undefined){
			$.ajax({
				url : $.cxt + '/wgMsContractAreaDevelop/getChildrenOrg',
				type: "POST",
				data:{
					orgId:orgId
				},
				async : false,
				success : function(data){
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#girdSaleDept").empty();
						$("#girdSaleDept").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridName").empty();
						$("#gridName").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								$("#girdSaleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridName").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}else{
			var saleDeptId = $('#girdCityCompany').find("option:selected").attr('id')
			gridOrgId = saleDeptId
			$.ajax({
				url : $.cxt + '/wgMsContractAreaDevelop/getChildrenOrg',
				type: "POST",
				data:{
					orgId:saleDeptId
				},
				async : false,
				success : function(data){
					var json  = JSON.parse(data)
					$("#girdSaleDept").empty();
					$("#gridName").empty();
					$("#girdSaleDept").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridName").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<json.data.saleDeptInfo.length;i++){
						if(json.data.saleDeptInfo[i] != null){
							$("#girdSaleDept").append(
									$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
							)
						}
					}
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridName").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
				}
			})
		
		}
	}
	if(selectId == 'girdSaleDept'){
		gridOrgId = orgId
		if(orgId != undefined){
			$.ajax({
				url : $.cxt + '/wgMsContractAreaDevelop/getChildrenOrg',
				type: "POST",
				data:{
					orgId:orgId
				},
				async : false,
				success : function(data){
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#gridName").empty();
						$("#gridName").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridName").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
					}
				}
			})
		}else{
			var saleDeptId = $('#girdAreaCompany').find("option:selected").attr('id')
			gridOrgId = saleDeptId
			if(saleDeptId == undefined){
				saleDeptId = $('#girdCityCompany').find("option:selected").attr('id')
			}
			$.ajax({
				url : $.cxt + '/wgMsContractAreaDevelop/getChildrenOrg',
				type: "POST",
				data:{
					orgId:saleDeptId
				},
				async : false,
				success : function(data){
					var json  = JSON.parse(data)
					$("#gridName").empty();
						$("#gridName").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridName").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
				}
			})
		
		}
	}
	if(selectId == 'gridName'){
		gridOrgId = orgId;
	}
}

function initType(){
	$.ajax({
		url:$.cxt+"/wgMsContractAreaDevelop/selectBigType",
		type:"POST",
		dataType:"JSON",
		success: function(json){
			var html="<option name value>请选择...</option>";
			for(var i=0;i<json.length;i++){
				var temp = json[i]
				var  code = temp.CONDITION_CODE
				var  name = temp.CONDITION_NAME
				html += "<option codeName=\"" + name + "\" value=\"" + code  + "\">" + name +"</option>";
			}
			$("#bigType").html(html);
			$("#smallType").empty();
			$("#smallType").append(
					$("<option>"+'请选择...'+"</option>").val('请选择...')
			)
		}
	})
}
$("#bigType").on("change", changeSmallType); 

function changeSmallType(){
	var option= $("#bigType").find("option:selected");
	var code =option.val()
	$.ajax({
		url :$.cxt +"/wgMsContractAreaDevelop/selectSmallType",
		type:"POST",
		dataType:"JSON",
		data:{code:code},
		success : function(json){
			var html="<option name value>请选择...</option>";
			for(var i=0;i<json.length;i++){
				var temp = json[i]
				var  code = temp.CONDITION_CODE
				var  name = temp.CONDITION_NAME
				html += "<option codeName=\"" + name + "\" value=\"" + code  + "\">" + name +"</option>";
			}
			$("#smallType").html(html);
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

function setNiceScroll(){
	/*$(".ui-jqgrid-bdiv").scrollBar({
	    barWidth: 6, //滚动条的宽度(这里根据需要写数值即可，不设置是10,即默认10px)
	    position: "x,y", //写“x”代表只出水平滚动条，写“y”表示只出垂直滚动条，写“x,y”则出水平和垂直滚动条（只有在内容超出容器时才出现滚动条）
	    wheelDis: 15 //滚轮滚动一次向下或向上滚动的距离，默认是15，可根据需要修改数值
	});*/
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight:$(window).height()-190,
	    cursorcolor:"#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
}

