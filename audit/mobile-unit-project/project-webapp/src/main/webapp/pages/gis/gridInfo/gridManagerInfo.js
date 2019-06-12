
function gridManagerUserInfoLinkage(orgId){
	$.ajax({
		url : $.cxt + '/gridManagerUser/gridManagerUserInfo',
		type : "POST",
		data :{gridCode :orgId},
		dataType: "json",
		success: function(json){
			var data = JSON.parse(json);
//			if(data.code == '0'){
//				$("#managerSaleDeptName").empty()
//				$("#managerName").empty()
//				$("#managerNumber").empty()
//				$("#gridManager").empty()
//				$("#gridManagerNumber").empty()
//				$("#cdManager").empty()
//				$("#cdManagerNumber").empty()
//				$("#directChnlManager").empty()
//				$("#socialChnlManager").empty()
//				$("#directUser").empty()
//				$("#repairUser").empty()
//				
//				$("#managerSaleDeptName").append(data.data[0].saleDeptName)
//				$("#managerName").append(data.data[0].managerName)
//				$("#managerNumber").append(data.data[0].managerNumber)
//				$("#gridManager").append(data.data[0].gridManager)
//				$("#gridManagerNumber").append(data.data[0].gridManagerNumber)
//				$("#cdManager").append(data.data[0].cdManager)
//				$("#cdManagerNumber").append(data.data[0].cdManagerNumber)
//				$("#directChnlManager").append(data.data[0].directChnlManager)
//				$("#socialChnlManager").append(data.data[0].socialChnlManager)
//				$("#directUser").append(data.data[0].directUser)
//				$("#repairUser").append(data.data[0].repairUser)
//			}

			$("#managerSaleDeptName").empty()
			$("#managerName").empty()
			$("#managerNumber").empty()
			$("#gridManager").empty()
			$("#gridManagerNumber").empty()
			$("#cdManager").empty()
			$("#cdManagerNumber").empty()
			$("#directChnlManager").empty()
			$("#socialChnlManager").empty()
			$("#directUser").empty()
			$("#repairUser").empty()
			for(var i = 0; i < data.data.length; i++) {
				if(data.data[i].userType == "3") {
					$("#gridManager").html(data.data[i].name + "[" + data.data[i].phone + "]");
				} else if(data.data[i].userType == "2") {
					$("#cdManager").html(data.data[i].name + "[" + data.data[i].phone + "]");
				} else if(data.data[i].userType == "4") {
					$("#directChnlManager").html(data.data[i].name + "[" + data.data[i].phone + "]");
				} else if(data.data[i].userType == "6") {
					$("#directUser").html(data.data[i].name + "[" + data.data[i].phone + "]");
				} else if(data.data[i].userType == "7") {
					$("#repairUser").html(data.data[i].name + "[" + data.data[i].phone + "]");
				}
			}
		}
	})
}