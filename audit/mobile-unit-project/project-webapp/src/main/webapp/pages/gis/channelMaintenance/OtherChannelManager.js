var gridCode= $("#gridCode").val()	
var JsonchnlCodes= $("#JsonchnlCodes").val()	
$(function (){
	
	initSelect();
	initGrid();
});
function initSelect(){
	        $.ajax({
	            url: $.cxt+"/maintence/ChannelManager",
	            data: {gridCode:gridCode},
	            type: "POST",
	            success: function (data) {
	                if (data != null) {
	                    var html = "<option value=''>请输入要查找的渠道经理</option>";
	                    for (var i = 0; i < data.length; i++) {     
	                    	var temp = data[i]
	        				html += "<option value=\"" + temp.LOGIN_ID + "\">" + temp.NAME +"</option>";	                       
	                    }
	                   $("#subjectId").html(html);
              }
	            }
	        });
	    
}
function initGrid(){
	$('#MainGridTable12345').jqGrid({
		url:$.cxt+"/maintence/initTable",
		postData:{gridCode:gridCode},
		datatype : "json",
		mtype: "POST",
		height : 300,
		autowidth : false,
		colNames : [ '渠道经理', '联系电话','count','已经管理社会渠道个数', 'LOGIN_ID' ],
		colModel : [ 
		      {name : 'NAME',align : 'center'}, 
		      {name : 'PHONE',align : 'center'}, 
		      {name : 'SU',align : 'center',hidden : true}, 
		      {name : '',align : 'center',formatter :  addButton},
		      {name : 'LOGIN_ID',align : 'center',hidden : true},
		],
		shrinkToFit:false,
		autoScroll: true,
		viewrecords : true,
		rownumbers: true,
        multiselect: true,//复选框   
		rowNum : 10,
		rowList : [ 10,20, 30 ],
		pager : '#MainGridPage12345',
		loadComplete : topjqGridLoadComplete,
		beforeSelectRow:function(rowid, e){
		            $(this).jqGrid('resetSelection');
		            return(true);    
		},
		onSelectAll:function(aRowids,status) {
			messageAlert("至多选择一个社会渠道经理");
			$(this).jqGrid('resetSelection');
			return;
        },
	});
}
function addButton(cellvalue, options, rowdata){
	var html =""
	html += "<a    onclick=\"showChnl('" + rowdata.LOGIN_ID+ "')\" href=\"#\">"+rowdata.SU+"</a>";
	return  html;
}

function showChnl(LOGIN_ID){
	var ChnlCode = [] ;
	var chnlArr ="";
	$.ajax({
		url : $.cxt+"/maintence/getChnlCode",
		 data: {'LOGIN_ID':LOGIN_ID},
         type: "POST",
         success : function (json){
        	 for(var i=0;i<json.length;i++){
        		 ChnlCode.push(json[i].CHNL_CODE);
        	 }
        	 console.log(ChnlCode);
        	 chnlArr = ChnlCode.join(",");
        	 console.log(chnlArr);
        	topwindow.showWindow({
     		title : "渠道信息",
     		width : 1000,
     		url : $.cxt + "/pages/gis/channelMaintenance/chnlInformation.jsp",
     		datatype: "json",
     		mtype: "POST",
     		data : {chnlArr:chnlArr},
     	})
         }
			
	});
	
}
$("#btn_select").on("click",changeTable)
function changeTable(){
	var chnlManagerOption= $("#subjectId").find("option:selected");
	var LOGIN_ID = chnlManagerOption.val();
	alert(LOGIN_ID)
	$("#MainGridTable12345").jqGrid('clearGridData');
	$("#MainGridTable12345").jqGrid('setGridParam',{  
		url:$.cxt+"/maintence/changeTable",
		postData:{gridCode:gridCode,LOGIN_ID:LOGIN_ID},
		datatype : "json",
		mtype: "POST",
	    page : 1    
	}).trigger("reloadGrid"); 
}
/*$("#btn_define").on("click",define)
function define(){
	var rowId = $("#MainGridTable12345").jqGrid('getGridParam', 'selrow'); 
	var rowdata =$("#MainGridTable12345").jqGrid('getRowData', rowId);
	console.log(rowdata.LOGIN_ID);
	var LOGIN_ID= rowdata.LOGIN_ID ;
	console.log(LOGIN_ID);
	console.log(JsonchnlCodes);
	$.ajax({
		url :$.cxt+"/maintence/OtherDistributionChnlManager",
		 data: {'LOGIN_ID':LOGIN_ID,'JsonchnlCodes':JsonchnlCodes},
         type: "POST",
		 success : function (json){
			 messageAlert("分配成功！");
			 return ;
		}
	});
}
$("#btn_undefine").on("click",undefine)
function undefine (){
	topwindow.showWindow({
		title : "提示信息！",
		url : $.cxt + "/pages/gis/channelMaintenance/undefine.jsp",
		datatype: "json",
		mtype: "POST",
		data : {gridCode:gridCode},
	});
}*/
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
