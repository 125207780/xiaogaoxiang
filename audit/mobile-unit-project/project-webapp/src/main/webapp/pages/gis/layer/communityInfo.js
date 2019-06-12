$(function(){
	getCommunityInfo();//入格小区基础信息
	OverContent();//鼠标放在省略号显示全部信息
})


function getCommunityInfo(){
	var community_id = $("#community_id").text();
	$("#CITY_CODE").empty();
	$("#CITY_NAME").empty();
	$("#CNTY_CODE").empty();
	$("#CNTY_NAME").empty();
	$("#GRID_CODE").empty();
	$("#GRID_NAME").empty();
	$("#CELL_ID").empty();
	$("#CELL_NAME").empty();
	$("#CELL_LONGITUDE").empty();
	$("#CELL_LATITUDE").empty();
	$("#CELL_ADDR").empty();
	$("#CELL_CNT").empty();
	$("#CELL_USER_CNT").empty();
	$("#KD_USER_CNT").empty();
	$("#CELL_VALUE").empty();
	$("#ZDCELL").empty();
	$("#PORT_COUNT").empty();
	$("#PORT_USE").empty();
	$("#PORT_RATE").empty();
	$("#ADDR_COUNT").empty();
	$("#IS_HVLH").empty();
	$.ajax({
		url : $.cxt + '/communityInfo/getBaseCommunityInfo',
		data : {communityId : community_id},
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
				$("#CELL_ID").append(data.data[0].CELL_ID);
				$("#CELL_NAME").append(data.data[0].CELL_NAME == null || data.data[0].CELL_NAME == "" ? 0 : data.data[0].CELL_NAME);
				$("#CELL_LONGITUDE").append(data.data[0].CELL_LONGITUDE);
				$("#CELL_LATITUDE").append(data.data[0].CELL_LATITUDE == null || data.data[0].CELL_LATITUDE == "" ? 0 : data.data[0].CELL_LATITUDE);
				$("#CELL_ADDR").append(data.data[0].CELL_ADDR);
				$("#CELL_CNT").append(data.data[0].CELL_CNT == null || data.data[0].CELL_CNT == "" ? 0 : data.data[0].CELL_CNT);
				$("#CELL_USER_CNT").append(data.data[0].CELL_USER_CNT);
				$("#KD_USER_CNT").append(data.data[0].KD_USER_CNT == null || data.data[0].KD_USER_CNT == "" ? 0 : data.data[0].KD_USER_CNT);
				$("#CELL_VALUE").append(data.data[0].CELL_VALUE);
				$("#ZDCELL").append(data.data[0].ZDCELL);
				$("#PORT_COUNT").append(data.data[0].PORT_COUNT);
				$("#PORT_USE").append(data.data[0].PORT_USE);
				$("#PORT_RATE").append(data.data[0].PORT_RATE);
				$("#ADDR_COUNT").append(data.data[0].ADDR_COUNT);
				$("#IS_HVLH").append(data.data[0].IS_HVLH);
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