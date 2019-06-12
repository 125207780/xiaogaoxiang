$(function(){
	console.log($("#index2").val())
	$("#areaId").html($("#index2").val());
	
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
	$('#ARP_table').jqGrid({
		datatype : "local",
		mtype: "POST",
		shrinkToFit:false,
		autoScroll: true,
		height: '100%',
		colNames : ['区县ID','账期', '产品ID','包id','活动名称','活动类型','当月订购用户数','订购前ARPU','订购后ARPU','提升度','提升度','订购前MOU','订购后MOU','提升度','提升度','订购前DOU','订购后DOU','提升度','提升度'],
		colModel : [  
			  {name : 'AREA_ID',width:90,align : 'center',hidden:true}, //区县ID
			  {name : 'STATIS_MONTH',width:90,align : 'center',hidden:true}, //账期
			  {name : 'PROD_ID',width:90,align : 'center',hidden:true}, //产品ID
			  {name : 'PACKAGE_ID',width:90,align : 'center',hidden:true}, //包id
		      {name : 'PACKAGE_NAME',width:90,align : 'center'}, //活动名称
		      {name : 'CAMPN_TYP',width:90,align : 'center'}, //活动类型
		      {name : 'ORDER_USR',width:90,align : 'center'}, //当月订购用户数
		      {name : 'INCOME_FEE_L3M_AG',width:90,align : 'center'}, //订购前ARPU
		      {name : 'INCOME_FEE_M',width:90,align : 'center'}, //	订购后ARPU
		      {name : 'ARPU_RA',width:90,align : 'center',hidden:true}, //提升度
		      {name : 'A',width:90,align:'center',formatter :addbuttonARPU_RA },
		      {name : 'MOU_L3M_AG',width:90,align : 'center'}, //订购前MOU
		      {name : 'MOU_M',width:90,align : 'center'}, //订购后MOU
		      {name : 'MOU_RA',width:90,align : 'center',hidden:true}, //提升度
		      {name : 'B',width:90,align:'center',formatter :addbuttonMOU_RA },
		      {name : 'DOU_L3M_AG',width:90,align : 'center'}, //订购前DOU
		      {name : 'DOU_M',width:90,align : 'center'}, //订购后DOU
		      {name : 'DOU_RA',width:90,align : 'center' ,hidden:true}, //提升度
		      {name : 'C',width:90,align:'center',formatter :addbuttonDOU_RA },
      
		     ],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#ARP_pager',
		loadComplete : function(){
			updatePagerIcons();
			var datalist = $("#ARP_table").jqGrid("getRowData");
			if(datalist&&datalist.length>0){
				$("#ARP_table").jqGrid('setSelection',1,true);
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
			initEcharts2(objectStr);
			initEcharts3(objectStr);
			initEcharts4(objectStr);
			initEcharts5(objectStr);
		},
	});	
	$("#ARP_table").jqGrid('setGroupHeaders', {
	    useColSpanStyle: true,
	    groupHeaders:[
	        {startColumnName:'INCOME_FEE_L3M_AG', numberOfColumns:4, titleText: '月均ARPU'},
	        {startColumnName:'MOU_L3M_AG', numberOfColumns:4, titleText: '月均MOU'} ,
	        {startColumnName:'DOU_L3M_AG', numberOfColumns: 4, titleText: '月均DOU'} 
	    ] 
	});
	queryTable();
}

function addbuttonARPU_RA (cellvalue, options, rowdata){
	html = "<a >"+(rowdata.ARPU_RA*100).toFixed(2)+"%</a>";
	return html ;
}
function addbuttonMOU_RA (cellvalue, options, rowdata){
	html = "<a >"+(rowdata.MOU_RA*100).toFixed(2)+"%</a>";
	return html ;
}
function addbuttonDOU_RA (cellvalue, options, rowdata){
	html = "<a >"+(rowdata.DOU_RA*100).toFixed(2)+"%</a>";
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
 
	$("#ARP_table").jqGrid('clearGridData');  //清空表格
	$("#ARP_table").jqGrid('setGridParam',{  // 重新加载数据
		mtype: "POST",
		  url : $.cxt + "/page3/selectTable",
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
$("#search").on("click",search);
function search(){
	var areaId= $("#areaId").val();
	var statisMonth = $("#statisMonth").val();
	console.log(areaId);
	console.log(statisMonth);
	if(statisMonth==""){
		messageAlert("账期不能为空");
		return false;
	}
	var param = new Object();
	param.areaId= areaId;
	param.statisMonth= statisMonth;
	$("#ARP_table").jqGrid('clearGridData');  //清空表格
	$("#ARP_table").jqGrid('setGridParam',{  // 重新加载数据
		mtype: "POST",
		  url : $.cxt + "/page3/selectTable",
		  postData: param,	 
	      datatype:'json',      
	      page:1
	}).trigger("reloadGrid");
}
