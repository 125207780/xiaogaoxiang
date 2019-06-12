$(function() {
})

$("#improtGovBusInfo").on("click", improtGovBusInfo);
function improtGovBusInfo() {
		if(topcheckoutForm("sysHelpForm")){//校验，参数为表单父级id
			$("#sysHelpForm").submit();
		}
		return;
}