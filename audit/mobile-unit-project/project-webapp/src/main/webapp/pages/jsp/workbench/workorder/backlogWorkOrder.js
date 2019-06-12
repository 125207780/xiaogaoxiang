$(function(){
	initDataGrid("handle",detailOperation);
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
		.attr("onclick", "showDetailForm('" + cell.id + "','" + cell.procId + "','handle','工单办理')")
		.prop("top-do-role","select")
		.attr("id", "detail")
		.text("办理")
	);
	return div.html();
}
