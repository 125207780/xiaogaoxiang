   var selectArr = [];
$(function(){
	var gridCode = $("#idx_gridName").val();

	if(grid != null && grid.length > 0 && grid != "null"){
		gridCode = grid;
	}
	
	$('#channelTable').jqGrid({
		url : $.cxt + "/channel/selectChannelList",
		datatype: "json",
		mtype: "POST",
		postData : {gridCode:gridCode},
		height : 340,
		autowidth : true,
		colNames : ['序号', 'ID','包保对象类型','渠道名称', '渠道一级类型','渠道二级类型','渠道三级类型','渠道状态','操作' ],
		colModel : [ 
		      {name : 'rowNum',align : 'center'}, 
		      {name : 'CHNL_CODE',align : 'center',hidden : true},
		      {name : 'OBJ_TYPE',align : 'center',hidden : true}, 
		      {name : 'CHNL_NAME',align : 'center'}, 
		      {name : 'CHNL_TYPE',align : 'center'}, 
		      {name : 'CHNL_TYPE_LEVEL1',align : 'center'}, 
		      {name : 'CHNL_TYPE_LEVEL2',align : 'center'}, 
		      {name : 'CHNL_STATUS',align : 'center'}, 
		      {name : 'edit',align : 'center',formatter : stateOperation},
		     ],
		viewrecords : true,
		rownumbers: false,
		multiselect: true,  
	   // multiboxonly:true,  
	    beforeSelectRow: beforeSelectRow,
//	    onPaging : onPaging,  点击上一页和下一页的时候触发
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#sel_indexTable-pager',
		loadComplete : topjqGridLoadComplete,
		
		gridComplete:function() {
		    var _this = this;
		    var rowData = $(_this).jqGrid('getRowData');
		    for(var i =0,n=rowData.length;i<n;i++){
		    	var obj = rowData[i];
		    	if(selectArr[obj.CHNL_CODE]){
		    		 $(_this).jqGrid('setSelection',i+1,false);
		    	}
		    }
		},
		//这里和beforeSelectRow()俩个函数，一起组合让jqGrid表格单选，
		onSelectRow: function (rowid, status, e) {
			//获取当前行对象
			var obj = $(this).jqGrid('getRowData',rowid);
			//用于记录选中的行，记录唯一的id
			//每次重新点击，都是让他清空，这里做的是单选
			selectArr = [];
		    if(status){
		    	selectArr[obj.CHNL_CODE]=obj;
		    }else{
		    	if(selectArr[obj.CHNL_CODE]){
		    		delete  selectArr[obj.CHNL_CODE];
		    	} 
		    }
			
	        var lastSel;
	        if (obj == lastSel) {
	            $(this).jqGrid("resetSelection");
	            lastSel = undefined;
	            status = false;
	        } else {
	            lastSel = obj;
	        }
	    },
	    
	});
	
	
	function stateOperation(cellvalue, options, rowObject) {
		var html = "";
		html += "<a    onclick=\"showChannelInfo('" + rowObject.CHNL_CODE
				+ "')\" href=\"#\">查看</a>";

		return html;
	}
	
});

//和onSelectRow俩者组合，使jqgrid单选，上一页和下一页也有用
function beforeSelectRow(rowId, e) {
	/*alert("重新加载");
    $("#channelTable").jqGrid("resetSelection");
    return true;*/
	var selId=$(this).jqGrid("getGridParam","selrow");
		$(this).jqGrid("resetSelection");
	if(selId==rowId){
		$(this).jqGrid("setSelection",rowId,false);
	}
	return true;
	
}

/*	这个是点击上一页和下一页触发的事件
 * function onPaging(){
	// 获取选择的行id
	var rowId = $("#channelTable").jqGrid('getGridParam','selrow');
	// 获取这一行的数据
	var rowData = $("#channelTable").jqGrid('getRowData',rowId);
	alert("pang--重新加载");
	$("#channelTable").jqGrid("resetSelection");
    return true;
}
*/

function showChannelInfo(rowId){
	topwindow.showWindow({
		   title : '渠道信息',
		   data:{uid:rowId},
			url : $.cxt + "/pages/gis/layer/channelInfo.jsp",
			bottons : [{
				title : "关闭" ,
				fun : function() {
					topwindow.removeWindow();
				}
			}] 
	   });
}


