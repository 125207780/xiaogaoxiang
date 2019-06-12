$(function(){
	fileDetailListGrid()//帮助中心
	userDetail()//帮助中心的联系人信息
	findOAUserInfo()//查询当前联系人OA信息
	$("#improtFile").click(function(){
		importVal();
		setTimeout(function(){
			$("#fileInfoListGrid").jqGrid('setGridParam',{
				url : $.cxt + "/getReportForm/findFile",
				datatype : "json",
				mtype : "POST",
				postData : {},
			}).trigger('reloadGrid');
		},50);
		$('#myModal1').modal('hide');
	});
	$("#myModal1Close").click(function(){
		$('#myModal1').modal('hide');
	});
	$('#helpCenterFile').ace_file_input({
		no_file:'没有文件 ...',
		btn_choose:'选择',
		btn_change:'转换',
		droppable:false,
		onchange:null,
		thumbnail:false // | true | large
		// whitelist:'gif|png|jpg|jpeg'
		// blacklist:'exe|php'
		// onchange:''
		//
	});
});

function findOAUserInfo(){
	$.ajax({
		url : $.cxt +"/getReportForm/findByOaId",
		datatype : "json",
		type: "POST",
		data:{
			oaId:currentOaId
		},
		async : false,
		success:function(json){
			var data  = JSON.parse(json);
			if(data.code == '0'){
				if(data.data != '0'){
					
				}else{
					$(".deleteId").hide()
					$("#uploadEntry").hide()
				}
			}
		}
	})
}

function userDetail(){
	$.ajax({
		url : $.cxt +"/getReportForm/findByUser",
		datatype : "json",
		type: "POST",
		async : false,
		success: function(json){
			var data  = JSON.parse(json);
			if(data.code == '0'){
				$("#contacts").empty();
				$("#contactNumber").empty();
				$("#artisan").empty();
				$("#artisanNumber").empty();
				$("#contacts").text("联系人:"+data.data.OA_NAME);
				$("#contactNumber").text("联系电话:"+data.data.MOBILE);
				$("#artisan").text("技术人员:"+data.data.TECH_NAME);
				$("#artisanNumber").text("联系电话:"+data.data.TECH_MOBILE);
				}
			}
		
	})
}

function fileDetailListGrid(){
	  $("#fileInfoListGrid").jqGrid('clearGridData');
	   grid = $("#fileInfoListGrid");
	   grid.jqGrid({
		   url : $.cxt + "/getReportForm/findFile",
		   datatype : "json",
		   mtype : "POST",
		   postData : {},
		   height : 200,
		   width:550,
		   autowidth : false,
		   colNames:['文件名称','文件路径','操作'],
		   colModel:[
		             { name: 'FILE_NAME', index: 'FILE_NAME',align: 'center', width:200},
		             { name: 'ADDRES', index: 'ADDRES',align: 'center', width:200}, 
		             {name : 'action',align : 'center',formatter:function(cellvalue, options, cell){
				    	  	var html = ""; 
				    	  	html += "<a onclick=\"findFileByFileName('" + cell.FILE_ID + "')\" href=\"#\">下载</a>&nbsp;&nbsp;&nbsp;&nbsp;"
				    	  	html += "<a class='deleteId' onclick=\"deleteFile('" + cell.FILE_NAME + "')\" href=\"#\">删除</a>"
				    		return html;
				      }}
		             ],
		   shrinkToFit:false,
		   autoScroll: true,
		   viewrecords : true,
		   rownumbers: false,
		   rowNum : 10,
		   rowList : [ 10,20, 30 ],
		   viewrecords: false, 
		   pager : '#fileInfoListPagers',
		   loadComplete : function(){
			   topjqGridLoadComplete();
		   },
	   })
}

function importVal(){
	var param={};
	if($("#helpCenterFile").val()==""){
		//alert("请选择上传的数据文件");
		messageAlert("请选择上传的数据文件");
		return;
	}
	var fileExtension = $("#helpCenterFile").val().split('.').pop().toLowerCase();
	//alert(getFileSize("stationFile"));
	if(getFileSize("helpCenterFile") > 30){
		messageAlert("数据文件不能大于30M"); 
		return;
	 }
    $("#upform").submit();
 	return;
}

function getFileSize(eleId) {
	try {
		var size = 0;
		size = $('#' + eleId)[0].files[0].size;// byte
		size = size / 1024;// kb
		size = size / 1024;// mb
		// alert('上传文件大小为' + size + 'M');
		return size;
	} catch (e) {
		alert("错误：" + e);
		return -1;
	}
}
function findFileByFileName(FILE_ID){
	bootbox.dialog({
		message: "是否确认下载?",
		title: "提示信息",
		buttons: {
			OK: {
				label: "确认",
				className: "btn-primary",
				callback: function () {
					window.location.href=$.cxt +"/getReportForm/downFile?fileId="+FILE_ID;
					/*$.ajax({
						url:$.cxt + "/getReportForm/downFile", 
						type: "POST",
						data : {
							fileName : FILE_NAME
						},
						success : function (json){
							
						}
					})*/
					
				}
			},
			Cancel: {
				label: "取消",
				className: "btn-default",
				callback: function () {
					
				}
			}
		}
	});
}

function deleteFile(FILE_NAME){
	bootbox.dialog({
		message: "是否确认删除?",
		title: "提示信息",
		buttons: {
			OK: {
				label: "确认",
				className: "btn-primary",
				callback: function () {
					$.ajax({
						url:$.cxt + "/getReportForm/deleteFileByFileName", 
						type: "POST",
						data : {
							fileName : FILE_NAME
						},
						success : function (json){
							$("#fileInfoListGrid").jqGrid({
								url : $.cxt + "/getReportForm/findFile",
								datatype : "json",
								mtype : "POST",
								postData : {},
							}).trigger("reloadGrid");
						}
					})
					
				}
			},
			Cancel: {
				label: "取消",
				className: "btn-default",
				callback: function () {
					
				}
			}
		}
	});
}



