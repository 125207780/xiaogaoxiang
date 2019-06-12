function schoolInfoInit(schoolId){
	$.ajax({
		url : $.cxt + "/school/schoolInfo",
		dataType : "json",
		type : "POST",
		data : {schoolId:schoolId},
		success : function(data){
			if(data){
				var info_schoolName = data.SCH_NAME;
				$("#info_schoolName").html(info_schoolName);
				
				var info_schoolAddress = data.SCH_ADDR;
				$("#info_schoolAddress").html(info_schoolAddress);
				
				var info_schoolType = data.TYPE_NAME;
				$("#info_schoolType").html(info_schoolType);
				
				var info_schoolProperty = data.SCH_PROPERTY;
				$("#info_schoolProperty").html(info_schoolProperty);
				
				var info_super = data.SCH_COMPETENT_ORG;
				$("#info_super").html(info_super);
				
				var info_schoolPerson = data.SCH_USERS;
				$("#info_schoolPerson").html(info_schoolPerson);
				
				var info_schoolNewPerson = data.NEW_SCH_USER;
				$("#info_schoolNewPerson").html(info_schoolNewPerson);
				
				var info_schoolThisUser = data.CMCC_SCH_USERS;
				$("#info_schoolThisUser").html(info_schoolThisUser);

				var info_schoolProportion = data.CMCC_PERCNT;
				$("#info_schoolProportion").html(info_schoolProportion);
				
				var info_schoolRanking = data.SUP_RANK;
				$("#info_schoolRanking").html(info_schoolRanking);
				
				var info_schoolThatUser = data.OTH_SCH_USERS;
				$("#info_schoolThatUser").html(info_schoolThatUser);
				
			}
		}
	});
	
}

