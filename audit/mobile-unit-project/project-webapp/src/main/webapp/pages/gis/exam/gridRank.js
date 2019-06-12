var gridCodeList=[];
$(function(){
	initSeletOrg();
	gridRankDetailInfoListGrid(orgId);
	setNiceScroll()
	radio();
	evaluationKpilInfo();
})
$("#reset").click(function(){
	initSeletOrg();
	evaluationKpilInfo();
	$("#girdSaleDept").parent().show();
});
	var gridOrgId = "";
function gridRankDetailInfoListGrid(orgId){
   $("#gridInfoListGrid").jqGrid('clearGridData');
   $("#gridInfoListGrid").GridUnload();
   grid = $("#gridInfoListGrid"); 
   grid.jqGrid({ 
	   url : $.cxt + "/gridRankDetail/getGridRankDetailInfo",
	   datatype : "json",
	   mtype : "POST",
	   postData : {orgId:orgId},
	   height : "atuo",
	   autowidth : true,
	   colNames: [ '序号','周期类型', '考核周期', '被考核对象', '被考核对象类型','考核指标名称' ,'得分'], 
	   colModel: [ 
	       { name: 'rowNum', index: 'rowNum',align: 'center'}, 
	       { name: 'evaluateCycleType', index: 'evaluateCycleType',align: 'center'}, 
	       { name: 'evaluateCycle', index: 'evaluateCycle', align: 'center'}, 
	       { name: 'gridName', index: 'gridName',align: 'center' }, 
	       { name: 'gridType', index: 'gridType',align: 'center'}, 
	       { name: 'kpiName',index:'kpiName',align:'center'},
	       { name: 'kpiScore', index: 'kpiScore',  align:'center'}, 
	   ], 
		shrinkToFit:false,
		autoScroll: true,
		viewrecords : true,
		rownumbers: false,
		rowNum : 10,
		rowList : [ 10,20, 30 ],
		pager : '#gridInfoListPagers',
		loadComplete : topjqGridLoadComplete
}); 
 //查询按钮
	$("#searchList").click(function(){
		reloadBasicUnitJqGrid("search");
	});
}
function gridRankInfoListGrid(orgId){
	$("#gridInfoListGrid").jqGrid('clearGridData');
	$("#gridInfoListGrid").GridUnload();
	   grid = $("#gridInfoListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/gridRank/getGridRankInfo",
		   datatype : "json",
		   mtype : "POST",
		   postData : {orgId:orgId},
		   height : "auto",
		   autowidth : true,
		   colNames: [ '序号','周期类型', '考核周期', '被考核对象', '被考核对象类型','得分','指标得分明细'], 
		   colModel: [ 
		       { name: 'rowNum', index: 'rowNum',align: 'center'}, 
		       { name: 'evaluateCycleType', index: 'evaluateCycleType',align: 'center'}, 
		       { name: 'evaluateCycle', index: 'evaluateCycle', align: 'center'}, 
		       { name: 'gridName', index: 'gridName',align: 'center' }, 
		       { name: 'gridType', index: 'gridType',align: 'center'}, 
		       { name: 'checkScore', index: 'checkScore',  align:'center'}, 
		       { name: '', index: '',align: 'center',  formatter: function(cellvalue, options, cell){	
		    	   var html = $("<div><div>").append(
		    				$("<span onClick=\"seeDetail('"+cell.id+"')\"></span>")
		    				.append("指标得分明细")
		    				.addClass("gridBtns")
		    				.attr("title","指标得分明细")
		    			).html();	
		    	  	return html;
		    		}}
		   ], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			pager : '#gridInfoListPagers',
			gridComplete: function() { 
				   setNiceScroll();
			  } ,
			loadComplete : topjqGridLoadComplete
	}); 
	 //查询按钮
		$("#searchList").click(function(){
			reloadBasicUnitJqGrid("search");
		});
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

var reloadBasicUnitJqGrid = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	var cycleType = "";
	var evaluateCycle = "";
	var kpiId = "";
	cycleType = $("#cycleType").find("option:selected").val();
	if(cycleType =="请选择..."){
		cycleType = "";
	}
	evaluateCycle = $("#evaluateCycle").find("option:selected").val();
	if(evaluateCycle =="请选择..."){
		evaluateCycle = "";
	}
	kpiId = $("#kpiName").find("option:selected").val();
	if(kpiId =="请选择..."){
		kpiId = "";
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
	
	$("#gridInfoListGrid").jqGrid('setGridParam',{    
        postData : {
        	orgId:gridOrgId,
        	evaluateCycleType:cycleType,
        	evaluateCycle:evaluateCycle,
        	kpiId:kpiId,
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}

function seeDetail(id){
		var msg='指标得分明细'
		topwindow.showWindow({
			   title : msg,
			   data:{},
				url : $.cxt + "/pages/gis/exam/gridRankDetail.jsp?id="+id
				,
		   })
	}
function initSeletOrg(){
	var orgId = $(".orgId").val();
	var orgLevel = getOrgLevel(orgId)
	$.ajax({
		url : $.cxt + "/gridRank/initSeletOrg",
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
						gridCodeList=[];
						gridCodeList.push(data.data.gridInfo[i].gridCode);
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
						gridCodeList=[];
						gridCodeList.push(data.data.gridInfo[i].gridCode);
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
						gridCodeList=[];
						gridCodeList.push(data.data.gridInfo[i].gridCode);
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
						gridCodeList=[];
						gridCodeList.push(data.data.gridInfo[i].gridCode);
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
						gridCodeList=[];
						gridCodeList.push(data.data.gridInfo[i].gridCode);
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
				url : $.cxt + '/gridRank/getChildrenOrg',
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
								gridCodeList=[];
								gridCodeList.push(data.data.gridInfo[i].gridCode);
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
				url : $.cxt + '/gridRank/getChildrenOrg',
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
								gridCodeList=[];
								gridCodeList.push(data.data.gridInfo[i].gridCode);
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
				url : $.cxt + '/gridRank/getChildrenOrg',
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
						gridCodeList=[];
						gridCodeList.push(data.data.gridInfo[i].gridCode);
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
				url : $.cxt + '/gridRank/getChildrenOrg',
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
								gridCodeList=[];
								gridCodeList.push(data.data.gridInfo[i].gridCode);
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
				url : $.cxt + '/gridRank/getChildrenOrg',
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
							gridCodeList=[];
							gridCodeList.push(data.data.gridInfo[i].gridCode);
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
function radio(){
	$('input[type="radio"]:first').attr('checked',"checked")
	
	$('input[type="radio"]').click(function(){
		if($(this).val() == '0'){
			$(this).attr('checked',"true")
			$("#radio2").removeAttr("checked");
			gridRankDetailInfoListGrid(orgId);
			$("#selectHidden").show();
		}else{
			$("#radio1").removeAttr("checked")
			$("#radio2").attr('checked',"checked")
			gridRankInfoListGrid(orgId);
			$("#selectHidden").hide();
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

function evaluationKpilInfo(){
	$.ajax({
		url : $.cxt + "/gridRankDetail/evaluationKpilInfo",
		type: "POST",
		async : false,
		success: function(json){
			var data  = JSON.parse(json)
			if(data.code == '0'){
				$("#evaluateCycle").empty();
				$("#evaluateCycle").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				$("#cycleType").empty();
				$("#cycleType").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				$("#kpiName").empty();
				$("#kpiName").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(var i=0;i<data.data.evaluateCycle.length;i++){
					$("#evaluateCycle").append(
							$("<option>"+data.data.evaluateCycle[i].evaluateCycle+"</option>").val(data.data.evaluateCycle[i].evaluateCycle)
					)
				}
				
					$("#cycleType").append(
						$("<option value=month>"+"月"+"</option>")
				    ).append(
						$("<option value=quarter>"+'季'+"</option>")
				    ).append(
						$("<option value=year>"+'年'+"</option>")
					);
					for(var i=0;i<data.data.evaluationKpiInfo.length;i++){
					$("#kpiName").append(
							$("<option>"+data.data.evaluationKpiInfo[i].kpiName+"</option>").val(data.data.evaluationKpiInfo[i].kpiId)
					)
					}
				
			}
		}
	})
}
