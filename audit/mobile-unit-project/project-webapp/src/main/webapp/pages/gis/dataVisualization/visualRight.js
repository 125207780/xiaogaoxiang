$(function(){
	$("#assetButton").on("click",function(){
		$("#assetModal").modal("show");
		$(".modal-backdrop").removeClass("in");
	})
	var id=0;
	$(".glyphicon-plus").click(function(){
		id+=1;
		var html = "<tr class=\"tr-shadow shadowLength\">" +
				"<td>" +
					"<div  style=\"width:100px;BACKGROUND-COLOR: transparent;\">"+
						"<input  class=\"column\" type=\"text\" id=\"columnName\" placeholder=\"请输入字段名称\" name=\"columnName"+id+"\"  onKeyUp=\"value=value.replace(/[^a-zA-Z_]/g,\'\')\" style=\"width:107%;\" >"+
					"</div>"+
				"</td>" +
				"<td>"+
					"<div  style=\"width:100px;BACKGROUND-COLOR: transparent;\">"+
						"<select class=\"column\" data-placeholder=\"请选择字段类型\" id=\"columnType\"  name=\"columnType"+id+"\" style=\"width:107%; padding: 3px 12px;\">"+
							"<option>BIGINT</option>"+
							"<option>TIME</option>"+
							"<option>VARCHAR</option>"+
							"<option>CLOB</option>"+
							"<option>INTEGER</option>"+
							"<option>TIMESTAMP</option>"+
							"<option>DECIMAL</option>"+
							"<option>DOUBLE</option>"+
						"</select>"+
					"</div>"+
				"</td>"+
				"<td>"+
					"<div  style=\"width:100px;BACKGROUND-COLOR: transparent;\">"+
						"<input class=\"column\" type=\"text\" id=\"columnSize\" placeholder=\"请输入字段大小\" name=\"columnSize"+id+"\"  onkeyup = \"value=value.replace(/[^"+'\\'+"d]/g,'') \" style=\"width:107%;\" >"+
					"</div>"+
				"</td>"+
				"<td>"+
					"<div  style=\"width:100px;BACKGROUND-COLOR: transparent;\">"+
						"<input class=\"column\" type=\"text\" id=\"columnRemake\" placeholder=\"请输入备注\" name=\"columnRemake"+id+"\" style=\"width:107%;\" >"+
					"</div>"+
				"</td>"+
				"<td>"+
					"<span class=\"glyphicon glyphicon-minus\"></span>"+
				"</td>"+
				"</tr>"
		$("#tablebody").append(html)
		addClick()
	})
	$(".glyphicon-minus").click(function(){
		$(this).parent().parent().remove()
	})
	$("#submitBtn").on("click",function(){
		var dataObj = topgetObjByObj($("#assetModal .column"));
		var dataLength = $(".shadowLength").length;
		if(validataForm()){
			$.ajax({
				url : $.cxt + "/VisualRight/addTableInfo",
				type: "POST",
				data:{
					param:JSON.stringify(topgetObjByObj($("#assetModal .column"))),
					len:dataLength
				},
				success : function(data) {
					$("#assetModal").modal("hide");
					$("#tableInfoListGrid").jqGrid('setGridParam',{    
						postData : {},
						page : 1    
					}).trigger("reloadGrid"); 
				}
				
			})
		}else{
			messageConfirm('该表名不存在')
		}
	})
	$('#tableInfoListGrid').jqGrid({
		url : $.cxt + "/VisualRight/findTableInfo",
		datatype : "json",
		mtype : "POST",
		postData : {},
		height: ($(".visualRight").height() - 50),
		width: $(".visualRight").width(),
		autowidth: true,
		colNames : [ '表名称', '表备注','模式名','字段名称', '字段类型','字段大小', '字段备注' ],
		colModel : [ 
		      {name : 'tableName',align : 'center'}, 
		      {name : 'tableRemake',align : 'center'},
		      {name : 'tabschema',align : 'center'},
		      {name : 'columnName',align : 'center'},
		      {name : 'columnType',align : 'center'},
		      {name : 'columnSize',align : 'center'}, 
		      {name : 'columnRemake',align : 'center'}
		],
		autoScroll: true,
		viewrecords: false,
		rownumbers: false,
		rowNum: 10,
		rowList: [ 10,20, 30 ],
		pager : '#grid-pager2',
		loadComplete: function() {
			topjqGridLoadComplete();
			setNiceScroll();
		}
	});
	//查询按钮
	$("#searchList").click(function(){
		reloadJqGrid("search");
	});
	
	$("#extportTableInfo").click(function(){
		var tableName = $("#findBytableName").val();
		var rows = $("#grid-pager3_center table tbody tr td select").find("option:selected").val();
		if(tableName != null && tableName != ""){
			window.location.href = $.cxt + "/VisualRight/extPortExcell?tableName="+tableName+"&rows="+rows
		}
	})
	
})

var reloadJqGrid = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	var tableName = $("#findBytableName").val();
	tabelColumName(tableName);
	$("#tableInfoListGrid").jqGrid('setGridParam',{    
        postData : {
        	tableName:tableName
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}
function tabelColumName(tableName){
	$.ajax({
		url : $.cxt + '/VisualRight/findByColumnName',
		type : "POST",
		data :{tableName :tableName},
		async:false,
		success : function(json){
			var columnNameList = []
			var colModel = []
			var data = json
			for(var i=0,n=data.length;i<n;i++){
				columnNameList.push(data[i].COLNAME)
				colModel.push({
					name:data[i].COLNAME,
					align : 'center'
				})
			}
			$("#tableColumnNameListGrid").jqGrid({
				url : $.cxt + "/VisualRight/findColumnContent",
				mtype : "POST",
				postData : {tableName:tableName},
				height: ($(".TabelColumnName").height() - 50),
				autowidth: false,
				width: $(".TabelColumnName").width(),
				autowidth: true,
				colNames :columnNameList,
				colModel :colModel,
				autowidth: false,
				shrinkToFit:false,
				autoScroll: true,
				viewrecords: false,
				rownumbers: false,
				rowNum: 10,
				rowList: [ 10,20, 30 ],
				pager : '#grid-pager3',
				loadComplete: topjqGridLoadComplete,
				gridComplete : setNiceScroll
			})
		}
	})
}

function addClick(){
	$(".glyphicon-minus").click(function(){
		$(this).parent().parent().remove()
	})
}

function validataForm(){
	var flag = false;
	var tableName = $("#tableName").val()
	var tabschema = $("#tabschema").val()
	$.ajax({
		url : $.cxt + "/VisualRight/checkTable",
		type: "POST",
		data:{
			tableName:tableName,
			tabschema:tabschema
		},
		async:false,
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code== '0'){
				if(data.data == '1'){
						
						flag = true
				}
			}
		}
		
	})
	return flag;
}
function messageConfirm(msg){
	bootbox.alert({
	    buttons: {
		   ok: {
			    label: '关闭',
			    className: 'btn-myStyle'
		    }
	    },
	    message: msg,
	    callback: function() {
		    
	    },
	    title: "消息提示",
    })
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

//function getXlsFromTbl(inTblId, inTblContainerId, title, rownumbers) {  
//    try {  
//        var allStr = "";  
//        var curStr = "";  
//        //alert("getXlsFromTbl");  
//        if (inTblId != null && inTblId != "" && inTblId != "null") {  
//            curStr = getTblData($('#' + inTblId), $('#' + inTblContainerId), rownumbers);  
//        }  
//        if (curStr != null) {  
//            allStr += curStr;  
//        }  
//        else {  
//            alert("你要导出的表不存在！");  
//            return;  
//        }  
//        var fileName = getExcelFileName(title);  
//        doFileExport(fileName, allStr);  
//    }  
//    catch (e) {  
//        alert("导出发生异常:" + e.name + "->" + e.description + "!");  
//    }  
//}  
//function getTblData(curTbl, curTblContainer, rownumbers) {  
//  
//    var outStr = "";  
//    if (curTbl != null) {  
//        var rowdata = curTbl.getRowData();  
//        var Lenr = 1;  
//  
//        for (i = 0; i < Lenr; i++) {  
//            //var Lenc = curTbl.rows(i).cells.length;  
//            var th;  
//            if (rownumbers == true) {  
//                th = curTblContainer.find('TH:not(:first-child)');  
//            }  
//            else {  
//                th = curTblContainer.find('TH');  
//            }  
//            th.each(function(index, element) {  
//                //alert($(element).text());  
//                //取得每行的列数  
//                var j = index + 1;  
//                var content = $(element).text();  
//                //alert(j + "|" + content);  
//                outStr += content + "\t";  
//                //赋值  
//  
//            });  
//            outStr += "\r\n";  
//        }  
//        var tmp = "";  
//        for (i = 0; i < rowdata.length; i++) {  
//            var row = eval(rowdata[i]);  
//            for (each in row) {  
//                outStr += row[each] + "\t";  
//            }  
//            outStr += "\r\n";  
//        }  
//  
//  
//    }  
//    else {  
//        outStr = null;  
//        alert(inTbl + "不存在!");  
//    }  
//    return outStr;  
//}  
//function getExcelFileName(title) {  
//    var d = new Date();  
//    var curYear = d.getYear();  
//    var curMonth = "" + (d.getMonth() + 1);  
//    var curDate = "" + d.getDate();  
//    var curHour = "" + d.getHours();  
//    var curMinute = "" + d.getMinutes();  
//    var curSecond = "" + d.getSeconds();  
//    if (curMonth.length == 1) {  
//        curMonth = "0" + curMonth;  
//    }  
//    if (curDate.length == 1) {  
//        curDate = "0" + curDate;  
//    }  
//    if (curHour.length == 1) {  
//        curHour = "0" + curHour;  
//    }  
//    if (curMinute.length == 1) {  
//        curMinute = "0" + curMinute;  
//    }  
//    if (curSecond.length == 1) {  
//        curSecond = "0" + curSecond;  
//    }  
//    var fileName = title + "_" + curYear + curMonth + curDate + "_"  
//            + curHour + curMinute + curSecond + ".csv";  
//    //alert(fileName);   
//    return fileName;  
//}  
//function doFileExport(inName, inStr) {  
//    var xlsWin = null;  
//    if (!!document.all("HideFrm")) {  
////        xlsWin = HideFrm;  
//    }else {  
//        var width = 6;  
//        var height = 4;  
//        var openPara = "left=" + (window.screen.width / 2 - width / 2)  
//                + ",top=" + (window.screen.height / 2 - height / 2)  
//                + ",scrollbars=no,width=" + width + ",height=" + height;  
//        xlsWin = window.open("", "_blank", openPara);  
//    }  
//    xlsWin.document.write(inStr);  
//    xlsWin.document.close();  
//    xlsWin.document.execCommand('Saveas', true, inName);  
//    xlsWin.close();  
//}
