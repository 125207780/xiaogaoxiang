<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- <cxt:commonLinks /> --%>
<html>
<head>

<div >
	<label>周期类型</label><select ></select>
	<label>考核周期</label><select ></select>
	<label>指标名称</label><select ></select><button>补充指标提醒</button>
	<br/>
	<label>录入状态</label><select ></select> <button>查询</button><button>清除</button><button>录入</button>
	</div>
		<table id="grid_table"></table>
		<div id="grid-pager"></div>	
	
		<button>删除</button><button>提交</button>

<script type="text/javascript">

</script>
</head>
</html>
<!-- /project-webapp/src/main/webapp/pages/gis/exam/Indicator.js
 --><script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/exam/indicator.js"></script>