$(function(){
	getStationInfo();//渠道基础信息
	OverContent();
})

function getStationInfo(){
	var stationId = $("#stationId").text();
	$("#CITY_CODE").empty();
	$("#CITY_NAME").empty();
	$("#CNTY_CODE").empty();
	$("#CNTY_NAME").empty();
	$("#GRID_CODE").empty();
	$("#GRID_NAME").empty();
	$("#STATION_CODE").empty();
	$("#STATION_NAME").empty();
	$("#STATION_TYPE").empty();
	$("#ENTER_GRID").empty();
	$("#STATION_LON").empty();
	$("#STATION_LAT").empty();
	$("#IS_ONNET").empty();
	$("#BTS_ATTR").empty();
	$("#IS_VILLAGE_STATION").empty();
	$("#STATION_NUM").empty();
	$("#COVER_TYP").empty();
	$("#VIP_CLASS").empty();
	$("#LIFE_CYC_STS").empty();
	$("#COUNTY_COUNT").empty();
	$("#FREQUENCY").empty();
	$("#THEORY_FREQUENCY").empty();
	$("#VOICE_CHAIN").empty();
	$("#SIGNAL_CHAIN").empty();
	$("#GPRS_STATIC_STAT_CONFIG").empty();
	$("#GPRS_DYNAMIC_STAT_CONFIG").empty();
	$("#COVER_SCENE").empty();
	$("#PHYSICAL_STATION_COUNT").empty();
	
	$.ajax({
		url : $.cxt + '/stationInfo/getStationInfo',
		data : {stationId : stationId},
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
				$("#STATION_CODE").append(data.data[0].STATION_CODE);
				$("#STATION_NAME").append(data.data[0].STATION_NAME);
				$("#STATION_TYPE").append(data.data[0].STATION_TYPE);
				if(data.data[0].ENTER_GRID=="1")
				{
					$("#ENTER_GRID").append("是");
				}	else{
					$("#ENTER_GRID").append("否");
				}	
				$("#STATION_LON").append(data.data[0].STATION_LON);
				$("#STATION_LAT").append(data.data[0].STATION_LAT);
				$("#IS_ONNET").append(data.data[0].IS_ONNET);		
				$("#BTS_ATTR").append(data.data[0].BTS_ATTR);
				$("#IS_VILLAGE_STATION").append(data.data[0].IS_VILLAGE_STATION);
				$("#STATION_NUM").append(data.data[0].STATION_NUM);
				$("#COVER_TYP").append(data.data[0].COVER_TYP);
				$("#VIP_CLASS").append(data.data[0].VIP_CLASS);
				$("#LIFE_CYC_STS").append(data.data[0].LIFE_CYC_STS);
				$("#COUNTY_COUNT").append(data.data[0].COUNTY_COUNT);
				$("#FREQUENCY").append(data.data[0].FREQUENCY);
				$("#THEORY_FREQUENCY").append(data.data[0].THEORY_FREQUENCY);
				$("#VOICE_CHAIN").append(data.data[0].VOICE_CHAIN);
				$("#SIGNAL_CHAIN").append(data.data[0].SIGNAL_CHAIN);
				$("#GPRS_STATIC_STAT_CONFIG").append(data.data[0].GPRS_STATIC_STAT_CONFIG);
				$("#GPRS_DYNAMIC_STAT_CONFIG").append(data.data[0].GPRS_DYNAMIC_STAT_CONFIG);
				$("#COVER_SCENE").append(data.data[0].COVER_SCENE);
				$("#PHYSICAL_STATION_COUNT").append(data.data[0].PHYSICAL_STATION_COUNT);
			}
		}
	})
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
