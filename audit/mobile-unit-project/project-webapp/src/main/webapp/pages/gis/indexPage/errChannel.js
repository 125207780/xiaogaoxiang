$(function() {
	$("#export").click(function(){
		batchExport();
	});

	$('#grid-table').jqGrid({
		url : $.cxt + "/map/errlist",
		 postData:{orgId:orgId},
		 datatype : "json",
		 mtype: "POST",
		 height : "auto",
		autowidth : true,
		colNames : [ '渠道名称', '类型','一级类型','二级类型' ],
		colModel : [ 
		      {name : 'CHNL_NAME',align : 'center'}, 
		      {name : 'CHNL_TYPE',align : 'center'}, 
		      {name : 'CHNL_TYPE_LEVEL1',align : 'center'}, 
		      {name : 'CHNL_TYPE_LEVEL2',align : 'center'}, 
		     ],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		caption : "渠道规模表",
		loadComplete : topjqGridLoadComplete
	});
	});

var batchExport = function() {
		$.ajax({
			url: $.cxt + "/map/buildExcel",
			type: "POST",
			data:{orgId:orgId},
			success: function(data) {
				if (data == "0") {
					document.getElementById("exportForm").action = $.cxt
							+ "/map/exportExcel";
					$("#exportForm").submit();
				} else if (data == "1") {
					alert("数据大于400条，无法导出！");
				} else {
					alert("excel导出失败！");
				}
			}
		});
	}

