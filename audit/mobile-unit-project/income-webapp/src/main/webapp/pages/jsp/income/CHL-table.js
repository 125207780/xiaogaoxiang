 $(function (){
	 $("#areaId").html($("#index3").val());
	 initParam();
	 initGrid();

			
			
	
 });
	 

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
	$('#CHL_table').jqGrid({
		datatype : "local",
		mtype: "POST",
		height : "100%",
		shrinkToFit:false,
		autoScroll: true,
		colNames : ['区县ID','账期','产品ID','包id','活动名称','活动类型','存量订购','本年新增订购','本季度订购','存量订购','本年新增订购','本季度订购','存量订购','本年新增订购','本季度订购','存量订购','本年新增订购','本季度订购'],
		colModel : [  
			  {name : 'AREA_ID',align : 'center', width: 90,hidden:true}, //区县ID
			  {name : 'STATIS_MONTH',align : 'center', width: 90,hidden:true}, //账期
			  {name : 'PROD_ID',align : 'center', width: 90,hidden:true}, //产品ID
			  {name : 'PACKAGE_ID',align : 'center', width: 90,hidden:true}, //包id
		      {name : 'PACKAGE_NAME',align : 'center', width: 90}, //活动名称
		      {name : 'CAMPN_TYP',align : 'center', width: 90}, //活动类型
		      {name : 'OLD_ORDER_USR',align : 'center', width: 90}, //存量订购
		      {name : 'LY_ORDER_USR',align : 'center', width: 90}, //本年新增订购
		      {name : 'LQ_ORDER_USR',align : 'center', width: 90}, //	本季度订购
		      {name : 'OLD_ONNET_TX_USR',align : 'center', width: 90}, //存量订购
		      {name : 'LY_ONNET_TX_USR',align : 'center', width: 90}, //本年新增订购
		      {name : 'LQ_ONNET_TX_USR',align : 'center', width: 90}, //	本季度订购
		      {name : 'OLD_RA',align : 'center', width: 90,hidden:true}, //存量订购
		      {name : 'LY_RA',align : 'center', width: 90,hidden:true}, //本年新增订购
		      {name : 'LQ_RA',align : 'center', width: 90,hidden:true}, //	本季度订购
		      {name : 'OLD_RAt',align : 'center', width: 90,formatter:addbuttonOL}, //存量订购
		      {name : 'LY_RAt',align : 'center', width: 90,formatter:addbuttonLY}, //本年新增订购
		      {name : 'LQ_RAt',align : 'center', width: 90,formatter:addbuttonLQ}, //	本季度订购
      
		     ],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#CHL_pager',
		loadComplete : function(){
			updatePagerIcons();
			var datalist = $("#CHL_table").jqGrid("getRowData");
			if(datalist&&datalist.length>0){
				$("#CHL_table").jqGrid('setSelection',1,true);
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
			console.log(objectStr)
			initEcharts1(objectStr);
		
		},
	});	
	$("#CHL_table").jqGrid('setGroupHeaders', {
	    useColSpanStyle: true,
	    groupHeaders:[
	        {startColumnName:'OLD_ORDER_USR', numberOfColumns:3, titleText: '订购用户数'},
	        {startColumnName:'OLD_ONNET_TX_USR', numberOfColumns: 3, titleText: '截至当前账期仍通信在网用户'} ,
	        {startColumnName:'OLD_RAt', numberOfColumns: 3, titleText: '存活率'} 
	    ] 
	});
	queryTable();
}

function addbuttonOL (cellvalue, options, rowdata){
	html = "<a >"+(rowdata.OLD_RA*100).toFixed(2)+"%</a>";
	return html ;
}
function addbuttonLY (cellvalue, options, rowdata){
	html = "<a >"+(rowdata.LY_RA*100).toFixed(2)+"%</a>";
	return html ;
}
function addbuttonLQ (cellvalue, options, rowdata){
	html = "<a >"+(rowdata.LQ_RA*100).toFixed(2)+"%</a>";
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
 
	$("#CHL_table").jqGrid('clearGridData');  //清空表格
	$("#CHL_table").jqGrid('setGridParam',{  // 重新加载数据
		mtype: "POST",
		  url : $.cxt + "/page4/selectTable",
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
	$("#CHL_table").jqGrid('clearGridData');  //清空表格
	$("#CHL_table").jqGrid('setGridParam',{  // 重新加载数据
		mtype: "POST",
		  url : $.cxt + "/page4/selectTable",
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