<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<cxt:commonLinks />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
<script src="<%=request.getContextPath()%>/pages/jsp/system/log/logManage.js"></script>
<style>
	.grids-btn{
    	background: none !important;
    	border: none !important;
	}
	.grid-btn:hover{
		background: none !important;
	}
	.bcl{
		font-size:13px !important;
		color:#199ed9 !important;
	}
	.bco{
		font-size: 13px !important;
		color: #ea5348 !important;
	}
	.bcol{
		font-size: 13px !important;
		color: #ffb752 !important;
	}
	.bcll{
		font-size: 13px !important;
		color: #23ae68 !important;
	}
	.mato5{ margin-top:10px;}		
	td[aria-describedby="grid-table_act"]{
	     	text-align:left !important;
	     }	
	.inputIE{
		height:32px\9;
		top:0px\9;
	}	
</style>
</head>
<body>
	<div class="main-content">
		<div class="col-xs-12" style="margin:10px 0px 10px 0px;">
			<form class="form-inline" id="searchLogForm">
				<input type="text" placeholder="操作人员" class="input-small inputIE" name="userName" style="width:250px !important;">
				<button class="btn btn-primary" type="button" id="searchLog">查询</button>
			</form>
			<div class="col-xs-12">
				<div id="gridContainer" style="width:100%;">
					<table id="grid-table"  style="width:100%;"></table><!-- grid主体 -->
					<div id="grid-pager" style="width:100%;"></div><!-- grid分页 -->
				</div>
			</div>
		</div>
	</div>
</body>
</html>