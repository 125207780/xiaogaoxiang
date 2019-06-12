<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!-- 这里是引入cxt这个前缀，这样请求后台的时候才能引用到路径 -->
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
	#edit{
		height: 100%;
	}
	#div1,#div2{
		width: 100%;
    	height: 50%;
	}
	#rule,#content{
		border-top:1px solid #000;
		background-color:#9999CC;
	}
</style>
</head>
<body>
	 
	 <div id="edit" >
		 <div id="div1" >
		 	<textarea id="content" name="content"   
		 		style="width: 100%;height: 100%;">
		 	</textarea>	  
		 </div>
		 <div id="div2" >
		 	<textarea id="rule" name="rule" readonly="true" 
		 			style="width: 100%;height: 100%;">
		 		1、未完成的60% 	<br>
		 		2、	未完成的60%	<br>
		 		3、未完成的60%		<br>
		 	</textarea>
		 </div>
	</div>
 
 
	
</body>
</html>