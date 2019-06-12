$(function() {		//选择按钮js动作
	$("#testWhsShowOrgWin").click(function(){
		topgetSysOrgTreeWindow({
			orgName : "orgName",
			orgId : "orgId",
			width : 400,
			height : 500
		})
	})
})
