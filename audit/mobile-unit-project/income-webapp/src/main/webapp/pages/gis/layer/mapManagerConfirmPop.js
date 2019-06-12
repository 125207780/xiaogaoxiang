$(function(){
	initTextArea();
	/*$("#agency_define").click(function(){
		updateStatus12();
	});*/
	
    
});


function initTextArea() {
	$.ajax({
		  url:$.cxt + "/firstPage/getMapTextArea", 
		  data:{"signingId":SIGNING_ID},
		  type: "POST",
		  async:false,
		  success : function (map){
			  $("#agency_textarea").html(map.SIGN_REQUIRE);
		  }
	});
	}


function updateStatus12(){
	$.ajax({
		  url:$.cxt + "/firstPage/updateStatus", 
		  data:{"signingId":SIGNING_ID,"physicalId":PHYSICAL_ID},
		  type: "POST",
		  async:false,
		  success : function (map){
			  topwindow.removeWindow();
			  messageAlert("签约成功");
			 
		  }
	});
}










