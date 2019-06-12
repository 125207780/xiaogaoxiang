$(function(){
	console.log($("#index5").val())
	$("#areaId").html($("#index5").val());
	
}) 

	function initIdxTable(){
		$('#statisMonth').datepicker({
			language : "zh-CN",
			todayHighlight : true,
			format : 'yyyymm',
			autoclose : true,
			startView : 'months',
			maxViewMode : 'years',
			minViewMode : 'months'
		});
		
    grid = $("#idx_table"); 
	grid.jqGrid({ 
    datatype: 'local', 
    shrinkToFit:false,
    autoScroll: true,
    height: '100%',
    colNames: [ '', '折扣折让', '类型', '综合评分', '投入产出比','ARPU提升率','增收用户比','MOU提升率','DOU提升率','存活率','潜在流失率','潜在流失存活率','','','',''], 
    colModel: [ 
        { name: 'CAMPN_TYP', index: 'CAMPN_TYP', width: 30, align: 'center', cellattr: function(rowId, tv, rawObject, cm, rdata) { 
                return 'id=\'CAMPN_TYP' + rowId + "\'"; 
            } ,formatter:function(cellvalue, options, rowObject){
            	var s ="";
            	for(var i=0,n=cellvalue.length;i<n;i++){
            		s+=cellvalue.substr(i,1)+"<br>"
            	}
		    	  return s;
		      }
        }, 
        { name: 'PACKAGE_NAME', index: 'PACKAGE_NAME', width: 90, align: 'center', }, 
        { name: 'CAMPN_KIND', index: 'CAMPN_KIND', width: 90,align: 'center',   }, 
        { name: 'TOTAL_SCORE', index: 'TOTAL_SCORE', width: 90,align: 'center',   }, 
        { name: 'OUT_IN_RA_SCORE', index: 'OUT_IN_RA_SCORE', width: 90,align: 'center',   }, 
        { name: 'ARPU_RA_SCORE', index: 'ARPU_RA_SCORE', width: 90,align: 'center',   }, 
        { name: 'INCOME_RA_SCORE', index: 'INCOME_RA_SCORE', width: 90,align: 'center',   }, 
        { name: 'MOU_RA_SCORE', index: 'MOU_RA_SCORE', width: 90,align: 'center',   }, 
        { name: 'DOU_RA_SCORE', index: 'DOU_RA_SCORE', width: 90,align: 'center',   }, 
        { name: 'SURVIVAL_RA_SCORE', index: 'SURVIVAL_RA_SCORE', width: 90,align: 'center',   }, 
        { name: 'LURK_LOST_RA_SCORE', index: 'LURK_LOST_RA_SCORE', width: 90,align: 'center',   }, 
        { name: 'LURK_LIVE_RA_SCORE', index: 'LURK_LIVE_RA_SCORE', width: 90,align: 'center',   }, 
        { name: 'AREA_ID', index: 'AREA_ID', width: 90,align: 'center', hidden:true  }, 
        { name: 'STATIS_MONTH', index: 'STATIS_MONTH', width: 90,align: 'center',  hidden:true  },
        { name: 'PROD_ID', index: 'PROD_ID', width: 90,align: 'center', hidden:true  }, 
        { name: 'PACKAGE_ID', index: 'PACKAGE_ID', width: 90,align: 'center',  hidden:true  },
    ], 
    rowNum : 10,
	rowList : [ 10, 20, 30 ],
	pager : '#idx_table-page',
	loadComplete : function(){
		updatePagerIcons();
		var datalist = $("#idx_table").jqGrid("getRowData");
		if(datalist&&datalist.length>0){
			$("#idx_table").jqGrid('setSelection',1,true);
//			var data =datalist[0];
//			queryEcharts1(data.STATIS_MONTH,  data.AREA_ID,  data.PROD_ID,  data.PACKAGE_ID);
		}
	},
    gridview: false, 
    viewrecords: false, 
    gridComplete: function() { 
        //②在gridComplete调用合并方法 
    	setNiceScroll();
        var gridName = "idx_table"; 
        Merger(gridName, 'CAMPN_TYP');
        
        
   }, 
   
    onSelectRow:function(rowid, status) {
    	var obj = $(this).jqGrid("getRowData",rowid);
		var object = new Object();
		object.areaId=obj.AREA_ID;
		object.statisMonth=obj.STATIS_MONTH;
		object.PROD_ID=obj.PROD_ID;
		object.PACKAGE_ID=obj.PACKAGE_ID;
		var objectStr = JSON.stringify(object);
		initInfo(objectStr);
		initIdexChr1(objectStr);
		initIdexChr2(objectStr);
		initIdexChr3(objectStr);
		initIdexChr4(objectStr);
		initIdexChr5(objectStr);
	},
}); 
 
 

$("#idx_table").jqGrid('setGroupHeaders', {
    useColSpanStyle: true, 
    groupHeaders:[
    {startColumnName: 'OUT_IN_RA_SCORE', numberOfColumns: 8, titleText: '评价因子'},
    ]  
  });

	queryTable();

 }
 
function Merger(gridName, CellName) { 
    //得到显示到界面的id集合 
    var mya = $("#" + gridName + "").getDataIDs(); 
    //当前显示多少条 
    var length = mya.length; 
    for (var i = 0; i < length; i++) { 
        //从上到下获取一条信息 
        var before = $("#" + gridName + "").jqGrid('getRowData', mya[i]); 
        //定义合并行数 
        var rowSpanTaxCount = 1; 
        for (j = i + 1; j <= length; j++) { 
            //和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏 
            var end = $("#" + gridName + "").jqGrid('getRowData', mya[j]); 

            if (before[CellName] == end[CellName]) { 
                rowSpanTaxCount++; 
                $("#" + gridName + "").setCell(mya[j], CellName, '', { display: 'none' }); 

            } else { 
                rowSpanTaxCount = 1; 
                break; 
            } 
            $("#" + CellName + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount); 
        } 
    } 
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
 
	$("#idx_table").jqGrid('clearGridData');  //清空表格
	$("#idx_table").jqGrid('setGridParam',{  // 重新加载数据
		mtype: "POST",
		url : $.cxt + "/page1/getTable",
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
