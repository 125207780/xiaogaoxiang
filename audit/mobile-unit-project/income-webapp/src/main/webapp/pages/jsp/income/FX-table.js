$(function (){
	 $("#areaId").html($("#index4").val());
})

 function initParam(){
	$('#statisMonth').datepicker({
			language : "zh-CN",
			todayHighlight : true,
			format : 'yyyymm',
			autoclose : true,
			startView : 'months',
			maxViewMode : 'years',
			minViewMode : 'months'
		});
	}

function initGrid(){
	$('#FX_table').jqGrid({
		datatype : "local",
		mtype: "POST",
		height : "auto",
		height: '100%',
		colNames : ['区县ID','账期','产品ID','包id','活动名称','活动类型','订购前为潜在流失用户','订购后仍通信在网用户','存活度','存活度','订购用户数','订购后潜在流失用户','潜在流失率','潜在流失率','订购用户数','订购后流失用户','流失率','流失率'],
		colModel : [  
			  {name : 'AREA_ID',align : 'center', width: 90,hidden:true}, //区县ID
			  {name : 'STATIS_MONTH',align : 'center', width: 90,hidden:true}, //账期
			  {name : 'PROD_ID',align : 'center', width: 90,hidden:true}, //产品ID
			  {name : 'PACKAGE_ID',align : 'center',hidden:true}, //包id
		      {name : 'PACKAGE_NAME',align : 'center' ,width: 90}, //活动名称
		      {name : 'CAMPN_TYP',align : 'center' ,width: 90}, //活动类型
		      {name : 'BF_MLOST_USR',align : 'center',width: 90}, //订购前为潜在流失用户
		      {name : 'AF_ONNET_TX_USR',align : 'center',width: 90}, //订购后仍通信在网用户
		      {name : 'LIVE_RA',align : 'center',hidden:true}, //	存活度
		      {name : 'a',align : 'center',formatter :LIVE_RA,width: 90}, //	存活度
		      {name : 'A',align : 'center',width: 90}, //订购用户数
		      {name : 'AF_MLOST_USR',align : 'center',width: 90}, //订购后潜在流失用户
		      {name : 'MLOST_RA',align : 'center',hidden:true}, //	潜在流失率
		      {name : 'b',align : 'center',formatter :MLOST_RA,width: 90}, //	潜在流失率
		      {name : 'B',align : 'center',width: 90}, //订购用户数
		      {name : 'AF_LOST_USR',align : 'center',width: 90}, //订购后流失用户
		      {name : 'LOST_RA',align : 'center',hidden: true}, //	流失率
		      {name : 'c',align : 'center',formatter :LOST_RA,width: 90}, //	流失率
		     ],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#FX_pager',
		loadComplete : function(){
			updatePagerIcons();
			var datalist = $("#FX_table").jqGrid("getRowData");
			if(datalist&&datalist.length>0){
				$("#FX_table").jqGrid('setSelection',1,true);
			}
		},
		gridComplete: function() { 
	    	setNiceScroll();
		}, 
		onSelectRow:function(rowid,state, e) {
			console.log(53);
			var obj = $(this).jqGrid("getRowData",rowid);
			var object = new Object();
			object.areaId=obj.AREA_ID;
			object.statisMonth=obj.STATIS_MONTH;
			object.PROD_ID=obj.PROD_ID;
			object.PACKAGE_ID=obj.PACKAGE_ID;
			var objectStr = JSON.stringify(object);
			
			initEcharts1(objectStr);
			
			initEcharts3(objectStr);
		
		},
	});	
	$("#FX_table").jqGrid('setGroupHeaders', {
	    useColSpanStyle: true,
	    groupHeaders:[
	        {startColumnName:'BF_MLOST_USR', numberOfColumns:4, titleText: '潜在流失用户订购存活度'},
	        {startColumnName:'A', numberOfColumns: 4, titleText: '订购后潜在流失用户'} ,
	        {startColumnName:'B', numberOfColumns: 4, titleText: '订购后流失用户'} 
	    ] 
	});
	queryTable();
}
function LIVE_RA (cellvalue, options, rowdata){
	html = "<a >"+(rowdata.LIVE_RA*100).toFixed(2)+"%</a>";
	return html ;
}
function MLOST_RA (cellvalue, options, rowdata){
	html = "<a >"+(rowdata.MLOST_RA*100).toFixed(2)+"%</a>";
	return html ;
}
function LOST_RA (cellvalue, options, rowdata){
	html = "<a >"+(rowdata.LOST_RA*100).toFixed(2)+"%</a>";
	return html ;
}
function queryTable(){
	var areaId= $("#areaId").val();
	var statisMonth = $("#statisMonth").val();
	 
	if(statisMonth==""){
		messageAlert("账期不能为空");
		return false;
	}
	var param = new Object();
	param.areaId= areaId;
	param.statisMonth= statisMonth;
 
	$("#FX_table").jqGrid('clearGridData');  //清空表格
	$("#FX_table").jqGrid('setGridParam',{  // 重新加载数据
		mtype: "POST",
		  url : $.cxt + "/page5/selectTable",
		  postData: param,	 
	      datatype:'json',      
	      page:1
	}).trigger("reloadGrid");
}
$("#search").on("click",search);
function search(){
	var areaId= $("#areaId").val();
	var statisMonth = $("#statisMonth").val();
	if(statisMonth==""){
		messageAlert("账期不能为空");
		return false;
	}
	console.log(areaId);
	console.log(statisMonth);
	var param = new Object();
	param.areaId= areaId;
	param.statisMonth= statisMonth;
	$("#FX_table").jqGrid('clearGridData');  //清空表格
	$("#FX_table").jqGrid('setGridParam',{  // 重新加载数据
		mtype: "POST",
		  url : $.cxt + "/page5/selectTable",
		  postData: param,	 
	      datatype:'json',      
	      page:1
	}).trigger("reloadGrid");
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
function setNiceScroll(){
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight:$(window).height()-190,
	    cursorcolor:"#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
}
