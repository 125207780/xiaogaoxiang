var selectArr = [];

function initschoolUserDetail(schoolId){
	$("#sud_schoolId").val(schoolId);
	schoolUserDetailListGrid();
	initContractType();
	initStockAdditions();
	initIncomeFiling();
	initFlowFiling();
	initPhoneticFiling();
	initAPPFiling();
	initTaocanFiling();
}
	
 
$("#reset").click(function(){
	schoolUserDetailListGrid()
	initContractType();
	initStockAdditions();
	initIncomeFiling();
	initFlowFiling();
	initPhoneticFiling()
	initAPPFiling();
	initTaocanFiling();
});
function schoolUserDetailListGrid(){
	var lastMonth = initDate();
   $("#schoolUserDetailListGrid").jqGrid('clearGridData');
   $("#schoolUserDetailListGrid").GridUnload();
   var schoolId=$("#sud_schoolId").val();
   grid = $("#schoolUserDetailListGrid"); 
   
   
   grid.jqGrid({ 
	   url : $.cxt + "/schoolUserDeatil/schoolUserDetail",
	   datatype : "json",
	   mtype : "POST",
	   postData : {statisMonth:lastMonth,schoolId:schoolId},
	   height : 200,
	   width:300,
	   autowidth : true,
	   colNames: [ '地市','用户ID','当前主套餐名称','账期'], 
	   colModel: [ 
	       { name: 'schAreaName', index: 'schAreaName',align: 'center', width:100}, 
	       { name: 'usrId', index: 'usrId',align: 'center',width:140}, 
	       { name: 'taocanName', index: 'taocanName',align: 'center', width:140}, 
	       { name: 'statisMonth', index: 'statisMonth', hidden:true},
	   ], 
		shrinkToFit:false,
		autoScroll: true,
		viewrecords : true,
		rownumbers: false,
		rowNum : 10,
		rowList : [ 10,20, 30 ],
		viewrecords: false, 
		pager : '#schoolUserDetailListPagers',
		gridComplete: function() { 
			   setNiceScroll();
		  } ,
		loadComplete : function(){
			var list=$("#schoolUserDetailListGrid").jqGrid('getRowData');
			if(list.length>0){
				$("#schoolUserDetailListGrid").jqGrid('setSelection',1,true);
			}
			 topjqGridLoadComplete();
		},
		onSelectRow : function(rowid, status){
			var obj = $("#schoolUserDetailListGrid").jqGrid('getRowData',rowid);
			   if(status){
			    	selectArr[obj.usrId]=obj;
			    }else{
			    	if(selectArr[obj.usrId]){
			    		delete  selectArr[obj.usrId];
			    	} 
			    }
			   var usrId = obj.usrId;
			   var statisMonth = obj.statisMonth;
			   $.ajax({
				   url : $.cxt + "/schoolUserDeatil/getUserInfo", 
					type: "POST",
					async:false,
					data :{
						usrId:usrId,
						statisMonth:statisMonth
						},
					success : function(data){
						var data = JSON.parse(data);
						if(data.code == '0'){
							$("#SEX").empty();
							$("#SCH_NAME").empty();
							$("#ARPU").empty();
							$("#DOU").empty();
							$("#MOU").empty();
							$("#AGE").empty();
							$("#TERM_INFO").empty();
							 var sex = "";
							if(data.data.sex == "F"){
								 sex ="女"
							}else{
								sex ="男"
							}
							$("#SEX").css("color","#FFFFFF").text("性别:"+sex);
							$("#SCH_NAME").css("color","#FFFFFF").text(data.data.schName);
							$("#ARPU").css("color","#FFFFFF").text("月均ARPU值为:"+data.data.arpu+"元");
							$("#DOU").css("color","#FFFFFF").text("使用流量:"+data.data.dou+"G左右");
							$("#MOU").text("月均通话时长:"+data.data.mou+"分钟");
							$("#AGE").css("color","#FFFFFF").text("年龄:"+data.data.age);
							$("#TERM_INFO").css("color","#FFFFFF").text("终端偏好:"+data.data.termInfo);
						}
					}
			   })
		}
}); 
 //查询按钮
	$("#searchList").click(function(){
		reloadBasicUnitJqGrid("search");
	});
	//导出
	$("#export").click(function(){
		statisMonth = $("#AccountPeriod").val();
		if(statisMonth == undefined){
			statisMonth = "";
		}
		var contractType= "";
		var stockAdditions= "";
		var incomeFiling= "";
		var flowFiling= "";
		var appFiling="";
		var taocanFiling="";
		var phoneticFiling= "";
		
		contractType = $("#contractType").find("option:selected").val();
		if(contractType =="请选择..."){
			contractType = "";
		}
		stockAdditions = $("#stockAdditions").find("option:selected").val();
		if(stockAdditions =="请选择..."){
			stockAdditions = "";
		}
		incomeFiling = $("#incomeFiling").find("option:selected").val();
		if(incomeFiling =="请选择..."){
			incomeFiling = "";
		}
		flowFiling = $("#flowFiling").find("option:selected").val();
		if(flowFiling =="请选择..."){
			flowFiling = "";
		}
		appFiling = $("#APPFiling").find("option:selected").val();
		if(appFiling =="请选择..."){
			appFiling = "";
		}
		taocanFiling = $("#taocanFiling").find("option:selected").val();
		if(taocanFiling =="请选择..."){
			taocanFiling = "";
		}
		phoneticFiling = $("#phoneticFiling").find("option:selected").val();
		if(phoneticFiling =="请选择..."){
			phoneticFiling = "";
		}
		var schoolId=$("#sud_schoolId").val();
		window.location.href=$.cxt +"/schoolUserDeatil/export?statisMonth="+statisMonth+"&actviTypeId="+ contractType+"&usrType="+ stockAdditions+"&feeLevelId="+ incomeFiling+"&gprsLevelId="+ flowFiling+"&schoolId="+schoolId+"&voiceLevelId="+ phoneticFiling+"&appTypeId="+ appFiling+"&discFeeId="+ taocanFiling;
	})
//	
//	var user = $("#schoolUserDetailListGrid").jqGrid('getRowData',1);
//	 if(status){
//	    	selectArr[user.usrId]=obj;
//	    }else{
//	    	if(selectArr[user.usrId]){
//	    		delete  selectArr[user.usrId];
//	    	} 
//	    }
//	  var usrId = user.usrId;
//	   var statisMonth = user.statisMonth;
//	   $.ajax({
//		   url : $.cxt + "/schoolUserDeatil/getUserInfo", 
//			type: "POST",
//			async:false,
//			data :{
//				usrId:usrId,
//				statisMonth:statisMonth
//				},
//			success : function(data){
//				var data = JSON.parse(data);
//				if(data.code == '0'){
//					$("#SEX").empty();
//					$("#SCH_NAME").empty();
//					$("#ARPU").empty();
//					$("#DOU").empty();
//					$("#MOU").empty();
//					$("#AGE").empty();
//					$("#TERM_INFO").empty();
//					 var sex = "";
//						if(data.data.sex == "F"){
//							 sex ="女"
//						}else{
//							sex ="男"
//						}
//					$("#SEX").css("color","#FFFFFF").text("性别:"+sex);
//					$("#SCH_NAME").css("color","#FFFFFF").text(data.data.schName);
//					$("#ARPU").css("color","#FFFFFF").text("月均ARPU值为:"+data.data.arpu+"元");
//					$("#DOU").css("color","#FFFFFF").text("使用流量较高:"+data.data.dou+"G左右");
//					$("#MOU").text("月均通话时长:"+data.data.mou+"分钟");
//					$("#AGE").css("color","#FFFFFF").text("年龄:"+data.data.age);
//					$("#TERM_INFO").css("color","#FFFFFF").text("终端偏好:"+data.data.termInfo);
//				}
//			}
//	   
//	   })
}
var reloadBasicUnitJqGrid = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	statisMonth = $("#AccountPeriod").val();
	if(statisMonth == undefined){
		statisMonth = "";
	}
	var contractType= "";
	var stockAdditions= "";
	var incomeFiling= "";
	var flowFiling= "";
	var phoneticFiling= "";
	var appFiling = "";
	var taocanFiling = "";
	
	contractType = $("#contractType").find("option:selected").val();
	if(contractType =="请选择..."){
		contractType = "";
	}
	stockAdditions = $("#stockAdditions").find("option:selected").val();
	if(stockAdditions =="请选择..."){
		stockAdditions = "";
	}
	incomeFiling = $("#incomeFiling").find("option:selected").val();
	if(incomeFiling =="请选择..."){
		incomeFiling = "";
	}
	appFiling = $("#APPFiling").find("option:selected").val();
	if(appFiling =="请选择..."){
		appFiling = "";
	}
	taocanFiling = $("#taocanFiling").find("option:selected").val();
	if(taocanFiling =="请选择..."){
		taocanFiling = "";
	}
	flowFiling = $("#flowFiling").find("option:selected").val();
	if(flowFiling =="请选择..."){
		flowFiling = "";
	}
	phoneticFiling = $("#phoneticFiling").find("option:selected").val();
	if(phoneticFiling =="请选择..."){
		phoneticFiling = "";
	}
	var schoolId=$("#sud_schoolId").val();
	$("#schoolUserDetailListGrid").jqGrid('setGridParam',{    
        postData : {
        	statisMonth :statisMonth,
        	schoolId:schoolId,
        	actviTypeId : contractType,
        	usrType : stockAdditions,
        	feeLevelId :incomeFiling,
        	gprsLevelId : flowFiling,
        	voiceLevelId :phoneticFiling,
        	appTypeId:appFiling,
        	discFeeId:taocanFiling
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}
function initDate(){
	//上月
	var now = new Date();
	now.setTime(now.getTime()-24*60*60*1000);
	var year = now.getFullYear();
	var month = now.getMonth();
    month = month ;
    if (month < 10) 
 	   month = "0" + month;
 	var lastMonth = year.toString()+ month.toString();
 	$("#AccountPeriod").datepicker({
 		language : "zh-CN",
		todayHighlight : true,
		format : 'yyyymm',
		autoclose : true,
		startView : 'months',
		maxViewMode : 'years',
		minViewMode : 'months'
	});
	
	$("#AccountPeriod").val(lastMonth);
	return lastMonth;
}

function initContractType(){
	$.ajax({
		url : $.cxt + "/schoolUserDeatil/findContractType", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#contractType").empty();
				$("#contractType").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#contractType").append(
							$("<option>"+data.data[i].ACTVI_TYPE+"</option>").val(data.data[i].ACTVI_TYPE_ID)
					)
				}
			}
		}
	})
}
function initStockAdditions(){
	$.ajax({
		url : $.cxt + "/schoolUserDeatil/findStockAdditions", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#stockAdditions").empty();
				$("#stockAdditions").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#stockAdditions").append(
							$("<option>"+data.data[i].USR_TYPE+"</option>").val(data.data[i].TYPE_ID)
					)
				}
			}
		}
	})
}
function initIncomeFiling(){
	$.ajax({
		url : $.cxt + "/schoolUserDeatil/findIncomeFiling", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#incomeFiling").empty();
				$("#incomeFiling").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#incomeFiling").append(
							$("<option>"+data.data[i].FEE_LEVEL+"</option>").val(data.data[i].FEE_LEVEL_ID)
					)
				}
			}
		}
	})
}

function initAPPFiling(){
	$.ajax({
		url : $.cxt + "/schoolUserDeatil/findAPPFiling", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#APPFiling").empty();
				$("#APPFiling").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#APPFiling").append(
							$("<option>"+data.data[i].APP_TYPE_NAME+"</option>").val(data.data[i].APP_TYPE_ID)
					)
				}
			}
		}
	})
}

function initTaocanFiling(){
	$.ajax({
		url : $.cxt + "/schoolUserDeatil/findTaocanFiling", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#taocanFiling").empty();
				$("#taocanFiling").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#taocanFiling").append(
							$("<option>"+data.data[i].DISC_FEE_NAME+"</option>").val(data.data[i].DISC_FEE_ID)
					)
				}
			}
		}
	})
}

function initFlowFiling(){
	$.ajax({
		url : $.cxt + "/schoolUserDeatil/findFlowFiling", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#flowFiling").empty();
				$("#flowFiling").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#flowFiling").append(
							$("<option>"+data.data[i].GPRS_LEVEL+"</option>").val(data.data[i].GPRS_LEVEL_ID)
					)
				}
			}
		}
	})
}
function initPhoneticFiling(){
	$.ajax({
		url : $.cxt + "/schoolUserDeatil/findPhoneticFiling", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#phoneticFiling").empty();
				$("#phoneticFiling").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#phoneticFiling").append(
							$("<option>"+data.data[i].VOICE_LEVEL+"</option>").val(data.data[i].VOICE_LEVEL_ID)
					)
				}
			}
		}
	})
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

