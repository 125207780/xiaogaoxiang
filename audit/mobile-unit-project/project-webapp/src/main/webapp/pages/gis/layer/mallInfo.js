$(function(){
	getStationInfo();//商场信息
	OverContent();
});

function getStationInfo(){
	var physicalId = $("#stationId").text();
	$("#physicalId").empty();
	$("#physicalName").empty();
	$("#address").empty();
	$("#physicalType").empty();
	$.ajax({
		url: $.cxt + '/basicUnitInfo/selectBasicUnitInfo',
		data: {physicalId: physicalId},
		type: "POST",
		success: function(json){
			var data = JSON.parse(json);
			if(data.code == '0'){
				$("#physicalId").append(data.data[0].physicalId);
				$("#physicalName").append(data.data[0].physicalName);
				$("#address").append(data.data[0].address);
				$("#physicalType").append(data.data[0].physicalType);
			}
		}
	});
}

function OverContent() {
	$(".channelBaseInfoR").hover(function() {
		var content = $(this).text();
		var contentLength = $(this).text().length;
		if(contentLength > 15 ){
			$(this).attr("title", content);
		}
	});
}
