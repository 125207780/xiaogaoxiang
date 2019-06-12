
$(function(){
	initType(chnl_code);
});
var newManager="";
function initType(chnl_code){
	$.ajax({
		url :$.cxt +"/contract/initType",
		type:"POST",
		dataType:"JSON",
		data:{chnl_code:chnl_code},
		success : function(json){
			if(json.CHNL_TYPE=="分销渠道"||json.CHNL_TYPE=="实体渠道"){
				console.log("分销渠道")
				ManagerType=1
				initjqGrid(ManagerType)	
			}else if(json.CHNL_TYPE=="直销渠道"){
				console.log("直销渠道")
				ManagerType=4
				initjqGrid(ManagerType)
			}else{
				console.log("无")

				bootbox.dialog({
					message: "由于该网格下没有渠道经理是否发送给该渠道的渠道经理进行维护！",
					title: "提示信息",
					buttons: {
						OK: {
							label: "确认",
							className: "btn-primary",
							callback: function () {
								$.ajax({
									url : $.cxt + "/contract/insertGridItemInfo",
									dataType : "json",
								 	type : "POST",
								 	data : {gridCode:gridCode,chnl_code:chnl_code},
								 	success : function(json){
								 	}
								 });
								topwindow.removeWindow();//关闭窗口
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
		}
	});
}

function initjqGrid(ManagerType){
	console.log(gridCode)
	$("#chnl_table").jqGrid({
		url : $.cxt + "/contract/tableManager",
		datatype: "json",
		mtype: "POST",
		postData : {ManagerType:ManagerType,OrgId:gridCode},
		height : 200,
		autowidth : true,
		colNames : [ '名字','电话','LOGIN_ID'],
		colModel : [ 
		      {name : 'NAME',align : 'center'}, 
		      {name : 'PHONE',align : 'center'}, 
		      {name : 'LOGIN_ID',align : 'center',hidden:true},
		     ],
		viewrecords : true,
		rownumbers: true,
		multiselect: true,  
	    multiboxonly:true,  
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#chnl_page',
		loadComplete : function(){
			var ids = jQuery("#chnl_table").jqGrid('getDataIDs');
			if(ids.length==0&&ManagerType=="1"){
				
				messageAlert("该网格下缺少分销渠道经理，请进行直销渠道经理与渠道经理维护！")
			}else if(ids.length==0&&ManagerType=="4"){
				
				messageAlert("该网格下缺少直销渠道经理，请进行直销渠道经理与渠道经理维护！")
			}
		},
		onSelectRow:function(rowid,state, e) {
			var rowData = $(this).jqGrid('getRowData',rowid);
			newManager=rowData.LOGIN_ID
		},
	});
	
}
function messageAlert(message){
	bootbox.dialog({
        message: "<span style=\"color:#000\">"+message+"</span>",
        title: "消息提示",
        buttons: {
            OK: {
                label: "确定",
                className: "btn-success",
            }
        }
    });
}
