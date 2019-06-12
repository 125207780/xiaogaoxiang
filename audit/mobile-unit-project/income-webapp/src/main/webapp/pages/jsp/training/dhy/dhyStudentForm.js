$(function() {		//选择按钮js动作
	$("#studentShowOrgWin").click(function(){
		topgetSysOrgTreeWindow({
			orgName : "orgName",
			orgId : "orgId",
			width : 400,
			height : 500
		})
	})
})
