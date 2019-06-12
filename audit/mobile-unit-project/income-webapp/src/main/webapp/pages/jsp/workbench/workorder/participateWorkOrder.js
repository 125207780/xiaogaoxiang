$(function(){
	initDataGrid("participate",detailOperation,{
		duration: true
	});
	$("#searchWorkOrderList").bind("click", function() {
		reloadJqGrid('search');
	});
});

/**
 * 渲染操作列
 */
function detailOperation(cellvalue, options, cell){
	var div = $("<div></div>")
	.append(
		$("<a></a>")
		.css({"width":"100%","cursor":"pointer"})
		.addClass("pull-left text-center")
		.attr("onclick", "showDetailForm('" + cell.id + "','" + cell.procId + "','participate','工单详情')")
		.prop("top-do-role","select")
		.attr("id", "detail")
		.text("查看")
	);
	return div.html();
}
