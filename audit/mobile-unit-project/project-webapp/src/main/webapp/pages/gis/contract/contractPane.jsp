<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
input {
	background-color: transparent;
}

div {
	/* width: 100%; */
}

.line1>p {
	width: 30%;
	float: left;
/* 	padding-left: 10px;
	padding-right: 10px;
 */
 }

.line1>p>label {
    width: 42%!important;
    text-align: right;
    float: left;
}

.line1>p>.contain_form{
      width: 44%!important;
    float: left;
    margin-left: 2%;
   
}
.linesty{
 width: 100%;
/*  height:40px; */
}
.line2>p{
  width: 30%;
  margin-left: 0.3%;
   float: left;
}
.line2>p>label{
	width: 42%;
    float: left;
    text-align: right;
    line-height: 25px;
}

.line2>p>.contain_form{
 width:44%;
 float: left;
 margin-left: 2%;
}

.line2>p:first-child{
  margin-left: 0%; 
}
.line2+.ui-jqgrid {
    /* margin: 0 auto; */
    margin-top: 40px;
}
#gview_pane_grid_table{
	width:100%;
}

.line1,.line2 label {
    font-weight: normal;
    font-size: 12px;
}
p label{
	color:#fff;
}
#pane_gridType,#pane_stationName{
	border: 1px solid #008fa7;
	height:28px;
	color: #00e1fd;
	padding: 10px;
}
#topwindow101modal-body {
	overflow: hidden !important;
}
#pane_selectButton {
	width: 42px;
    padding: 8px;
    margin-left: -3%;
}
#topwindow101contextBtn0,#topwindow101contextBtn1 {
	width: 40px;
    padding: 8px;
}
.modal-bottom {
	height: 45px !important;
}
</style>
</head>
<body>
	<div class="line1 linesty">
		<p>
			<label>网格名称： </label> <select class='contain_form'
				id="pane_gridNameId" value name></select>

		</p>

		<p>
			<label>网格类型：</label> <input class='contain_form' id="pane_gridType"></input>
		</p>
		</div>
	<div style="clear: both;"></div>
	<div class="line2 linesty">
		<p>
			<label>基础单元一级分类：</label> 
			<select class='contain_form' id="pane_typeOne" value name></select>
				
		</p>
		<p>
			<label>基础单元二级分类： </label> <select class='contain_form' style="margin-left:3px;" 
				id="pane_typeTwo" value name></select>
		</p>

		<p>
			<label>基础单元名称 ：</label> <input class='contain_form'
				id="pane_stationName" />
		</p>
			<button id="pane_selectButton" class="btn btn-primary">查询</button>

<!-- 		<p><button id="pane_selectButton" class="btn btn-primary">查询</button></p>
 -->		
	</div>

	<table id="pane_grid_table"></tablewa>
	<div id="pane_grid-pager"></div>

	<!-- <button id="pane_Reset">重置</button><button id="pane_define">确定</button> -->

	<script type="text/javascript"
		src="<%=request.getContextPath()%>/pages/gis/contract/contractPane.js"></script>
</body>
</html>
