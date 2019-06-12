<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%String gridCode = request.getParameter("gridCode"); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
</head>
<body>
<input value="<%=gridCode%>" id ="gridCode"  type="hidden" />
		<div>当前网格在划分网格时区县（分公司）网格管理员未将<input id="inputID" type="text">分配至该网格下作为社会渠道经理，请点击“提交”按钮提示区县（分公司）网格管理员进行分配。</div>
				<lable style='color: #FF0000'>空格处填写格式：姓名1:OA账号 ,姓名2:OA账号</lable>
</body>
</html>