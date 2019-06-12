$(function(){
	initSeletOrg();
	gridwgMsBuildDetailListGrid(orgId);
	initType();
})
$("#reset").click(function(){
	initSeletOrg();
	initType();
});
	var gridOrgId = "";
function gridwgMsBuildDetailListGrid(orgId){
	$("#wgMsBuildDetailListGrid").jqGrid('clearGridData');
	$("#wgMsBuildDetailListGrid").GridUnload();
	   grid = $("#wgMsBuildDetailListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/wgMsBuildDetail/getWgMsBuildDetailInfo",
		   datatype : "json",
		   mtype : "POST",
		   postData : {orgId:orgId},
		   height : 200,
		   autowidth : true,
		   colNames: [ '序号','归属区县','网格名称','渠道编码','包保渠道名称','渠道类型','基础单元编码','基础单元名称','基础单元地址','基础单元类型','楼宇编码','楼宇名称'], 
		   colModel: [ 
		       { name: 'rowNum', index: 'rowNum',align: 'center',width : 50}, 
		       { name: 'areaName', index: 'areaName',align: 'center'}, 
		       { name: 'gridName', index: 'gridName', align: 'center'}, 
		       { name: 'chnlCode', index: 'chnlCode',align: 'center' }, 
		       { name: 'chnlName', index: 'chnlName',align: 'center'}, 
		       { name: 'chnlType', index: 'chnlType',  align:'center'}, 
		       { name: 'physicalId', index: 'physicalId',align: 'center'}, 
		       { name: 'physicalName', index: 'physicalName', align: 'center'}, 
		       { name: 'addr', index: 'addr',align: 'center' }, 
		       { name: 'smallType', index: 'smallType',align: 'center'}, 
		       { name: 'buildingCode', index: 'buildingCode',  align:'center'}, 
		       { name: 'buildingName', index: 'buildingName',align: 'center'} 
		   ], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			width:880,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			pager : '#wgMsBuildDetailPagers',
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
			var chnlCode = "";
			var buildingCode = "";
			
			chnlCode = $("#chnlName").find("option:selected").val();
			if(chnlCode =="请选择..."){
				chnlCode = "";
			}
			buildingCode = $("#buildingName").find("option:selected").val();
			if(buildingCode =="请选择..."){
				buildingCode = "";
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
			
			window.location.href=$.cxt +"/wgMsBuildDetail/export?orgId="+gridOrgId+"&chnlCode="+ encodeURI(encodeURI(chnlCode))+"&buildingCode="+ encodeURI(encodeURI(buildingCode));
		})
	}
var reloadBasicUnitJqGrid = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	var chnlCode = "";
	var buildingCode = "";
	
	chnlCode = $("#chnlName").find("option:selected").val();
	if(chnlCode =="请选择..."){
		chnlCode = "";
	}
	buildingCode = $("#buildingName").find("option:selected").val();
	if(buildingCode =="请选择..."){
		buildingCode = "";
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
	
	$("#wgMsBuildDetailListGrid").jqGrid('setGridParam',{    
        postData : {
        	orgId:gridOrgId,
        	chnlCode:chnlCode,
        	buildingCode:buildingCode,
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
				$("#chnlName").empty();
				$("#chnlName").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				$("#buildingName").empty();
				$("#buildingName").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
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
				url : $.cxt + '/wgMsBuildDetail/getChildrenOrg',
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
				url : $.cxt + '/wgMsBuildDetail/getChildrenOrg',
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
				url : $.cxt + '/wgMsBuildDetail/getChildrenOrg',
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
				url : $.cxt + '/wgMsBuildDetail/getChildrenOrg',
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
				url : $.cxt + '/wgMsBuildDetail/getChildrenOrg',
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
		channelSelectInfo(gridOrgId);
		buildingInfoSelectInfo(gridOrgId);
	}
}

function channelSelectInfo(gridOrgId){
	$.ajax({
		url : $.cxt + '/wgMsBuildDetail/getChannelInfo',
		type: "POST",
		data:{
			orgId:gridOrgId
		},
		success : function(data){
			var data  = JSON.parse(data)
			if(data.code == '0'){
				$("#chnlName").empty();
				$("#chnlName").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(var i=0;i<data.data.length;i++){
					if(data.data[i] != null){
						$("#chnlName").append(
								$("<option>"+data.data[i].CHNL_NAME+"</option>").val(data.data[i].CHNL_CODE)
						)
					}
				}
			}
		}
	})
}
function buildingInfoSelectInfo(gridOrgId){
	$.ajax({
		url : $.cxt + '/wgMsBuildDetail/getBuildingInfo',
		type: "POST",
		data:{
			orgId:gridOrgId
		},
		success : function(data){
			var data  = JSON.parse(data)
			if(data.code == '0'){
				$("#buildingName").empty();
				$("#buildingName").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(var i=0;i<data.data.length;i++){
					if(data.data[i] != null){
						$("#buildingName").append(
								$("<option>"+data.data[i].BUILDING_NAME+"</option>").val(data.data[i].BUILDING_CODE)
						)
					}
				}
			}
		}
	})

}
function initType(){
	$.ajax({
		url:$.cxt+"/wgMsBuildDetail/selectBigType",
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
		url :$.cxt +"/wgMsBuildDetail/selectSmallType",
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

