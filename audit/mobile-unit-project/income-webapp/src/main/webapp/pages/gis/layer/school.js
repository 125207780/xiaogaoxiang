$( document ).ready(function() {
   
	alert(1)
});
$(function(){
	alert();
	var physicalId = $("#physicalId").val()
	$.ajax({
		url : $.cxt + "/gridCommon/selectSchool",
		dataType : "json",
	 	type : "POST",
	 	data : {physical_id:physicalId},
	 	success : function(mapObj){
	 	
	 		if (mapObj) {
	 			var city = mapObj.ORG_ID;
	 			var unitCode = mapObj.PHYSICAL_ID;
	 			var schoolName = mapObj.SCHOOL_NAME;
	 			var schoolArea = mapObj.CAMPUS;
	 			var address = mapObj.ADDR;
	 			var schoolLevel = mapObj.EDUCATION_LEVEL;
	 			var studentTotal = mapObj.TOTAL_STUDENT_SCALE;
	 			var studentScale = mapObj.STUDENT_SCALE;
	 			var depart = mapObj.MANAGER_DEPT;
	 			$("#city").html(city);
	 			$("#unitCode").html(unitCode);
	 			$("#schoolName").html(schoolName);
	 			$("#schoolArea").html(schoolArea);
	 			$("#address").html(address);
	 			$("#schoolLevel").html(schoolLevel);
	 			$("#studentTotal").html(studentTotal);
	 			$("#studentScale").html(studentScale);
	 			$("#depart").html(depart);
		 	}
	 	}
	 });
	
})