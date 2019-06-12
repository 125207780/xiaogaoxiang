$(function(){
	console.log("2"+nowOrgId)
	initGridName();
	initType();
	initGrid();
});
var selectedArr=[]
var num=0;
 
function initGridName(){
	 
	$.ajax({
		url:$.cxt+"/contract/selectGridName",
		type:'POST',
		data:{nowOrgId:nowOrgId},
		dataType:'JSON',
		success:function(json){
			var html="<option name value></option>";
			for(var i=0;i<json.length;i++){
				var temp = json[i]
				html += "<option typeId=\"" + temp.TYPE_ID + "\" value=\"" + temp.ORG_ID + "\">" + temp.NAME +"</option>";
			}
			$("#pane_gridNameId").html(html);
		}
	});
}

$("#pane_gridNameId").on("change", changePane_gridType); //周期类型改变时调用

function changePane_gridType(){
	var option= $("#pane_gridNameId").find("option:selected");
	var type =option.attr("typeId")
	console.log("30"+type)
	if(type=="1"){
		$("#pane_gridType").val("一类网格")
	}else if(type=="2"){
		$("#pane_gridType").val("二类网格")
	}else{
		$("#pane_gridType").val("三类网格")
	}
}


function initType(){
	$.ajax({
		url:$.cxt+"/contract/selectTypeOne",
		type:"POST",
		dataType:"JSON",
		success: function(json){
			var html="<option name value></option>";
			for(var i=0;i<json.length;i++){
				var temp = json[i]
				var  code = temp.CONDITION_CODE
				var  name = temp.CONDITION_NAME
				html += "<option codeName=\"" + name + "\" value=\"" + code  + "\">" + name +"</option>";
			}
			$("#pane_typeOne").html(html);
		}
	})
}
$("#pane_typeOne").on("change", changePane_typeTwo); //周期类型改变时调用

function changePane_typeTwo(){
	var option= $("#pane_typeOne").find("option:selected");
	var code =option.val()
	console.log("63"+code)
	$.ajax({
		url :$.cxt +"/contract/selectTypeTwo",
		type:"POST",
		dataType:"JSON",
		data:{code:code},
		success : function(json){
			var html="<option name value></option>";
			for(var i=0;i<json.length;i++){
				var temp = json[i]
				var  code = temp.CONDITION_CODE
				var  name = temp.CONDITION_NAME
				html += "<option codeName=\"" + name + "\" value=\"" + code  + "\">" + name +"</option>";
			}
			$("#pane_typeTwo").html(html);
		}
	})
}
$("#pane_selectButton").on("click",selectGridPage)
function selectGridPage(){
	grid = $("#pane_gridNameId").val();
	
	console.log("84 yes")
	var gridNameOption= $("#pane_gridNameId").find("option:selected");
	var typeOneOption = $("#pane_typeOne").find("option:selected");
	var typeTwoOption = $("#pane_typeTwo").find("option:selected");
	var gridCode = gridNameOption.val()
	var bigType = typeOneOption.attr("codeName")
	var smallType = typeTwoOption.attr("codeName")
	var  phsycialName = $("#pane_stationName").val()
	if(gridCode==""){
		messageAlert("请选择网格名称！")
		return ;
	}
	if(typeOneOption.val()==""){
		messageAlert("请选择一级基础单元")
		return ;
	}
	if(typeTwoOption.val()==""){
		messageAlert("请选择二级基础单元")
		return ;
	}
	$("#pane_grid_table").jqGrid('clearGridData');
	$("#pane_grid_table").jqGrid('setGridParam',{  
		url:$.cxt+"/contract/initGrid",
		postData:{gridCode:gridCode,bigType:bigType,smallType:smallType,phsycialName:phsycialName},
		datatype : "json",
		mtype: "POST",
	    page : 1    
	}).trigger("reloadGrid"); 
	
	
	
}

function initGrid(){
	var  add_indexTableData = $("#pane_grid_table").jqGrid('getRowData');
	for(var i=0,n=add_indexTableData.length;i<n;i++){
		var obj = add_indexTableData[i];
		selectedArr[obj.PHYSICAL_ID]=obj;
	}
	$("#pane_grid_table").jqGrid({
		/*		url:$.cxt+"/contract/initGrid",
				postData:{gridCode:gridCode,bigType:bigType,smallType:smallType,phsycialName:phsycialName},
				datatype : "json",
				mtype: "POST",*/
				data : [],
				datatype : "local",
				height : 220,
				autowidth : true,
				colNames : ['ID', '基础单元名称','基础单元一级级类型','基础单元二级类型','基础单元地址','操作'],
				colModel : [ 
					
					  {name : 'PHYSICAL_ID',align : 'center',hidden:true}, 
					  {name : 'PHYSICAL_NAME',align : 'center'}, 
				      {name : 'BIG_TYPE',align : 'center',hidden:true}, 
				      {name : 'SMALL_TYPE',align : 'center'}, 
				      {name : 'ADDRESS',align : 'center'},
				      {name : '',align : 'center' ,formatter :  addButton},
				     ],
				     	viewrecords : true,
						rownumbers: true,
				        multiselect: true,//复选框   
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : 'pane_grid-pager',
						loadComplete : topjqGridLoadComplete,
						gridComplete:function() {
						    var _this = this;
						    var rowData = $(_this).jqGrid('getRowData');
						    for(var i =0,n=rowData.length;i<n;i++){
						    	var obj = rowData[i];
						    	if(selectedArr[obj.PHYSICAL_ID]){
						    		 $(_this).jqGrid('setSelection',i+1,false);
						    	}
						    }
						},
						onSelectRow:function(rowid,state, e) {
							var obj = $(this).jqGrid('getRowData',rowid);
						    if(state){
						    	selectedArr[obj.PHYSICAL_ID]=obj;
						    	num++;
						    }else{
						    	if(selectedArr[obj.PHYSICAL_ID]){
						    		delete  selectedArr[obj.PHYSICAL_ID];
						    		num--;
						    	} 
						    }
						},
						onSelectAll:function(aRowids,status) {
				            var _this = this;
				            var rowData = $(_this).jqGrid('getRowData');
				            for(var i=0,n=rowData.length;i<n;i++){
				            	var obj = rowData[i];
				            	if(status){
				            		selectedArr[obj.PHYSICAL_ID]=obj;
				            		num++;
					            }else{
					            /*	if(selectedArr[obj.PHYSICAL_ID]){
					            		delete  selectedArr[obj.PHYSICAL_ID];
					            		num--;
							    	} */
				            		delete  selectedArr[obj.PHYSICAL_ID];
				            		num--;
					            }    
				            }        
				        },		
			})
		
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

function addButton (cellvalue, options, rowdata){	
	var html =""
	if (rowdata.BIG_TYPE=='家居小区'){
		html += "<a    onclick=\"showVillage('" + rowdata.PHYSICAL_ID+ "')\" href=\"#\">查看</a>";
        return  html
	}else if(rowdata.BIG_TYPE=='文化教育'){
		html += "<a    onclick=\"showSchool('" + rowdata.PHYSICAL_ID+ "')\" href=\"#\">查看</a>";
        return  html    
	}else{
		html += "<a    href=\"#\" style=\"color : black\">查看</a>";
        return  html
	}
}
function showVillage(physicalId){
	topwindow.showWindow({
		title : "小区信息",
		width : 1000,
		url : $.cxt + "/pages/gis/layer/house.jsp",
		datatype: "json",
		mtype: "POST",
		data : {physicalId:physicalId},
	})
}
function showSchool(physicalId){
	var level = "3";
	topwindow.showWindow({
		title : "学校信息",
		width : 1000,
		url : $.cxt + "/gridCommon/selectSchoolOrHouse",
		datatype: "json",
		mtype: "POST",
		height : 200,
		width : 650,
		data : {physicalId:physicalId,level:level},
	})
}
//修改，取消重置和确定
//$("#pane_Reset").on("click",reset)
//$("#pane_define").on("click",define)
/*function define(){
	var keys = [];
	for (var property in selectedArr)
	keys.push(property);
	console.log(property)

	if(keys.length==0){
		messageAlert("至少选定一个基础单元!")
		return ;
	}

	var StaitionList = []
	for(var i =0 ;i<keys.length ;i++){
		StaitionList[i]=selectedArr[keys[i]]
	}
	console.log(StaitionList)
	var jsonStationStr=JSON.stringify(StaitionList)
	var gridNameOption= $("#pane_gridNameId").find("option:selected");
	var gridCode = gridNameOption.val()
		topwindow.showWindow({
			title : "渠道列表",
			width : 1000,
			url : $.cxt + "/pages/gis/contract/channelList.jsp",
			datatype: "json",
			mtype: "POST",
			data : {gridCode:gridCode},
			bottons : [{
				title : "确定", 
				fun : function(){
				var ids = $("#channelTable").jqGrid('getGridParam','selarrrow');
				alert("长度-》"+ids.length)
				if(ids.length > 1 || ids.length < 1){
					messageAlert("只能选择一行数据");
					return false;
				}
				var rowId=$("#channelTable").jqGrid('getGridParam','selrow');
				var rowData = $("#channelTable").jqGrid('getRowData',rowId);
				var jsonStr = JSON.stringify(rowData);	
				var selectArrStr = JSON.stringify(selectArrStr)
				topwindow.showWindow({
					title : "提示信息！",
					url : $.cxt + "/pages/gis/contract/prompt.jsp",
					width : 300,
					height : 200,
					datatype: "json",
					mtype: "POST",
					bottons : [{
						title : "确定", 
						fun : function(){						
							$.ajax({
								url : $.cxt + "/channel/insertMsContractArea",
								dataType : "json",
							 	type : "POST",
							 	data : {jsonStr:jsonStr,jsonStationStr:jsonStationStr,gridCode:gridCode},
							 	success : function(json){
										topshowAlertSuccessDiv();//操作提示
										topwindow.removeWindow();//关闭窗口
										$("#pane_grid_table").trigger("reloadGrid");//刷新父窗口，重新查询
							 	}
							 });

							topwindow.removeWindow();//关闭窗口
							}	
						},{title : "取消", 
						fun : function(){
							topwindow.removeWindow();//关闭窗口
						}
					}]
				})
				} 
				
			}]
		});
}
function reset(){
	selectedArr=[]
	$("#pane_grid_table").trigger("reloadGrid");
	console.log(selectedArr)
}*/

function seeDetail(){
	
}
