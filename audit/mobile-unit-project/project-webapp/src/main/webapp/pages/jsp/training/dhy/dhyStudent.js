$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/student/selectstudentpagelist",
		datatype : "json",//从服务器端返回的数据类型 可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
		mtype : "POST",//ajax提交方式。POST或者GET，默认GET
		height : topjqGridHeight(), //表格高度      
		autowidth : true, //表格在首次被创建时会根据父元素比例重新调整表格宽度
		colNames : [ '用户编号', '用户姓名', '毕业院校', '就学时间', '操作' ],	//列显示名称
		colModel : [ //常用属性
		      {name : 'studentId',align : 'center',hidden : true}, 
		      {name : 'studentName',align : 'center'}, 
		      {name : 'studentSchool',align : 'center',hidden : true},
		      {name : 'studentTime',align : 'center',hidden : true},
		      {name : 'act',align : 'center', formatter : renderOperation}],
		viewrecords : true,//是否显示总记录数
		rownumbers: true,//如果为ture则会在表格左边新增一列，显示行顺序号，从1开始递增
		rowNum : 10,	//在grid上显示记录条数要被传递到后台
		rowList : [ 10, 20, 30 ],//一个下拉选择框，用来改变显示记录数，当选择时会覆盖rowNum参数传递到后台
		caption : "教育经历信息",//表格名称
		loadComplete : topjqGridLoadComplete
	});
	//基础界面查询按钮
	$("#studentSearchList").click(function(){
		reloadJqGrid("search");
	});
	//基础界面新建按钮
	$("#studentCreateBtn").click(function(){
		showStudentForm();
	})
})
//对个人信息的修改以及删除按钮
var renderOperation = function(cellvalue, options, cell) {
	var html = ""; 
	html += "<a  onclick=\"showStudentForm('" + cell.studentId + "')\" href=\"#\">查询详细信息</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<a  onclick=\"studentDelete('" + cell.studentId + "')\" href=\"#\">删除</a>"
	return html;
}
//重新加载表格
var reloadJqGrid = function(flag) {
	if(flag == undefined) {
		//新增和修改的时候清空查询条件
		topclear('gridSearch')
	}
	$("#grid-table").jqGrid('setGridParam',{    
        postData : topgetObjByObj($("#gridSearch .searchField")),  
        page : 1    
    }).trigger("reloadGrid"); 
}
//新建教育信息的弹出窗口
var showStudentForm = function(id) {
	topwindow.showWindow({
		//窗口名称
		title : "新建教育信息",
		//参数
		data : {id : id},
		//url
		url : $.cxt + "/student/showstudentform",	
		bottons : [{
			title : "确认修改",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("studentForm")){
					$.ajax({
						url : $.cxt + "/student/studentinsertorupdate", 
						data : topgetObjByObj($("#studentForm .formField")),
						type: "POST",
						success : function(data) {
							//重新加载表格
							reloadJqGrid();
							//关闭窗口
							topwindow.removeWindow();
							//操作提示
							topshowAlertSuccessDiv();
						}
					});
				}
			}
		}]
	});
}
//删除教育信息
var studentDelete = function(id) {
	topshowdialog("确认删除此条教育信息？", function(){
		$.ajax({
			url : $.cxt + "/student/deletestudentbyid", 
			data : {id : id},
			type: "POST",
			success : function(data) {
				//重新加载表格
				reloadJqGrid();
				//操作提示
				topshowAlertSuccessDiv();
			}
		})
	})
}