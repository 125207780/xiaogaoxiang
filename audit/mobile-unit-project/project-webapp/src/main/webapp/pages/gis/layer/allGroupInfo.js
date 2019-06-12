$(function(){
	getAllABGRoupInfo();//AB入格
	initDate();//初始化日期组件
	OverContent();
})



function getAllABGRoupInfo(){
	var GC_Code = $("#GC_Code").text();
	$("#CITY_CODE").empty();
	$("#CITY_NAME").empty();
	$("#CNTY_CODE").empty();
	$("#CNTY_NAME").empty();
	$("#GRID_CODE").empty();
	$("#GRID_NAME").empty();
	$("#GC_TYPE").empty();
	$("#GC_CODE").empty();
	$("#GC_NAME").empty();
	$("#GC_ADDR").empty();
	$("#JING_DU").empty();
	$("#WEI_DU").empty();
	$("#INDUSTRY_TYP_ID").empty();
	$("#INDUSTRY_TYP_NAME").empty();
	$("#INDUSTRY_SUB_TYP_ID").empty();
	$("#INDUSTRY_SUB_TYP_NAME").empty();
	$("#VIP_MNGR_NAME").empty();
	$("#VIP_MNGR_MSISDN").empty();
	$.ajax({
		url : $.cxt + '/groupInfo/getGroupInfo',
		data : {GCCode : GC_Code},
		type : "POST",
		success : function(json){
			var data = JSON.parse(json);
			if(data.code == '0'){
				$("#CITY_CODE").append(data.data[0].CITY_CODE);
				$("#CITY_NAME").append(data.data[0].CITY_NAME);
				$("#CNTY_CODE").append(data.data[0].CNTY_CODE);
				$("#CNTY_NAME").append(data.data[0].CNTY_NAME);
				$("#GRID_CODE").append(data.data[0].GRID_CODE);
				$("#GRID_NAME").append(data.data[0].GRID_NAME);
				$("#GC_TYPE").append(data.data[0].GC_TYPE);
				$("#GC_CODE").append(data.data[0].GC_CODE == null || data.data[0].GC_CODE == "" ? 0 : data.data[0].GC_CODE);
				$("#GC_NAME").append(data.data[0].GC_NAME);
				$("#GC_ADDR").append(data.data[0].GC_ADDR == null || data.data[0].GC_ADDR == "" ? 0 : data.data[0].GC_ADDR);
				$("#JING_DU").append(data.data[0].JING_DU);
				$("#WEI_DU").append(data.data[0].WEI_DU == null || data.data[0].WEI_DU == "" ? 0 : data.data[0].WEI_DU);
				$("#INDUSTRY_TYP_ID").append(data.data[0].INDUSTRY_TYP_ID);
				$("#INDUSTRY_TYP_NAME").append(data.data[0].INDUSTRY_TYP_NAME == null || data.data[0].INDUSTRY_TYP_NAME == "" ? 0 : data.data[0].INDUSTRY_TYP_NAME);
				$("#INDUSTRY_SUB_TYP_ID").append(data.data[0].INDUSTRY_SUB_TYP_ID);
				$("#INDUSTRY_SUB_TYP_NAME").append(data.data[0].INDUSTRY_SUB_TYP_NAME == null || data.data[0].INDUSTRY_SUB_TYP_NAME == "" ? 0 : data.data[0].INDUSTRY_SUB_TYP_NAME);
				$("#VIP_MNGR_NAME").append(data.data[0].VIP_MNGR_NAME);
				$("#VIP_MNGR_MSISDN").append(data.data[0].VIP_MNGR_MSISDN == null || data.data[0].VIP_MNGR_MSISDN == "" ? 0 : data.data[0].VIP_MNGR_MSISDN);
			}
		}
	})
}


function initDate() {
	//昨天日期
	var now = new Date();
	now.setTime(now.getTime()-24*60*60*1000);
	var year = now.getFullYear();
	var month = now.getMonth();
	var date = now.getDate();
    month = month + 1;
	if (month < 10) 
	   month = "0" + month;
	if (date < 10) 
	   date = "0" + date;
	var yesterday = year +"-"+month +"-"+date;
	$("#dayKip").text("渠道日指标("+yesterday+")");
}

function OverContent(){
	$(".channelBaseInfoR").hover(function(){
		var content = $(this).text();
		var contentLength = $(this).text().length;
		if(contentLength > 15 ){
			$(this).attr("title", content);
		}
	})
	
}