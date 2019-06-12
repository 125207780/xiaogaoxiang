<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cxt" uri="http://www.bonc.com.cn/common/tag/cxt"%>
	<% String url=request.getParameter("url");%> 
<!-- 编辑表单div -->
<div class="page-content">
	<!-- iframe引入页面 -->
	<iframe id="contentLoader" src='<%=url %>'  name="ifrmname" width="100%" height="400px" frameborder="0" style="overflow:hidden;">
	</iframe>
</div>
<style type="text/css">
#topwindow102context{
left: 430px !important;
width: 500px !important; 
height: 300px !important;
}
</style>