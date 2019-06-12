<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>Insert title here</title>
<cxt:commonLinks />
<jsp:include page="/pages/gis/common/mapjs.jsp"/>
<style type="text/css">
html, body, #main {
	width:100%;height: 100%;
}
#smallMap {
	width: 600px;
	height: 600px;
	position: relative;
  	/* 缩减比例 X缩小： 0.6倍, Y 0.5倍，也就是 width实际为：600 * 0.6 = 360，height: 600 * 0.5 = 300 */
	transform: scale(0.6, 0.5);
  	/* 偏移量计算 ：上下偏移量依据height计算：(600 - 600 * 0.5) / 2 = 150 ,左右偏移量依据宽度计算  (600 - 600 * 0.6) / 2 = 120 */
	margin: -150px -120px;
}
</style>
</head>
<body>
	<table>
		<tr>
			<td colspan="3">
				<div style="background-color: gray;width: 100%;height: 100px"></div>
			</td>
		</tr>
 	<tr>
 		<td><div style="background-color: fuchsia; width: 300px; height: 300px;">其他内容</div></td>
 		<td><div id="smallMap"></div></td>
 		<td><div style="background-color: fuchsia; width: 300px; height: 300px;">其他内容</div></td>
 	</tr>
	<tr>
		<td colspan="3"><div style="background-color: gray;width: 100%;height: 100px"></div></td>
	</tr>
	</table>
</body>
<script type="text/javascript">
<%
	// 获取当前登录用户
	SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);
	String orgId = sysUser.getOrgId(); 
%>
var orgId = "<%=orgId%>";
$( function() {
	$("#smallMap").append("<div id='smallMap_main' style='width: 100%; height: 100%'></div>");
	var showMaxBtn = $('<i style="display: none; font-size: 24px; cursor: pointer; position: absolute; top: 10px; z-index: 10; right: 10px;" class="fa fa-window-maximize" aria-hidden="true"></i>');
	$("#smallMap").append(showMaxBtn);
	$("#smallMap").on("mouseover", function() {
		showMaxBtn.show();
	});
	$("#smallMap").on("mouseout", function() {
		showMaxBtn.hide();
	});
	var mapObj = null;
	var emap = showEmap(orgId, "smallMap_main", callBack);
	function callBack(_orgId, orgLevel) {
		// 当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
		if(orgLevel == "4") {
		} else {
			mapObj = this.next();
		}
	}
	showMaxBtn.click(function() {
		topwindow.showHtmlWindow($("#smallMap_main"), {
			width: 900,
			height: 700,
			title: "信息展示",
			closeBtnFun: function() {
				$("#smallMap").append($("#smallMap_main"));
				mapObj.resize(); 
			},
			fun: function() {
				window.setTimeout(mapObj.resize(), 1000);
			}
		});
	});
});
</script>
</html>