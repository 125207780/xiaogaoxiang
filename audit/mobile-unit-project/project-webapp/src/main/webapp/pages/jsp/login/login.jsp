<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%
SysUser sysUser = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<cxt:commonLinks />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/login/login.css" />
<script type="text/javascript" src="login.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/bonc/js/md5.js"></script>
<title>东方国信-移动事业部</title>
<style type="text/css">
.rightBg{
	background:url(../../images/login/login-background.png) center 0px !important;
	box-shadow: 0px 0px 25px #012334;
}
.input-group >.input-group-addon{
	 background-color:transparent !important;
}
.input-group{
	background-color:transparent !important;
}
#username, #password {
	border: none;
	margin-top:-1px;
}
.input-group-addon{
	background-color:rgba(220,38,38,0.2) !important;
}
.submit{
	width: 100% !important;
	float: left !important;
}
.reset{
	width: 100% !important;
	float: left !important;
	text-align:right;
}
.reset button{
	width:34px;
	background:none !important;
	padding:0;
	margin:0;
	color:#00e1fd; 
	opacity:0.6;
}
input.form-control:-webkit-autofill{
   -webkit-box-shadow: 0 0 0px 1000px #023751 inset !important;
   -webkit-text-fill-color: #fff !important;
} 
</style>
</head>
<body>
	<div class="left clearfix" >
		<div class="leftBg mainCon">
			<div class="login-left">
				<div style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;z-index:0;">
					<img src="../../images/login/loginBg1.png" style="width:100%;height:100%;">
				</div>
			</div>
		</div>
		<div class="mainCon rightBg">
			<div class="login-box">
				<div class="login-title text-center">
					<h1>
						<small>
							<img src="../../images/login/dl.png">
						</small>
					</h1>
				</div>
				<div class="login-content ">
					<div class="form">
						<div id="errorMsg" />
						<form id="loginForm" method="post" autocomplete="off">
							<div class="form-group">
								<div>
									<div class="input-group">
										<span class="input-group-addon">
											<img src="../../images/login/icon_username.png">
										</span>
										</span>
										<input type="text" id="username" name="username"  style= "background-color:transparent !important;color: #ffffff" class="form-control" placeholder="用户名">
									</div>
								</div>
							</div>
							<div class="form-group" style="height:40px;">
								<div>
									<div class="input-group">
										<span class="input-group-addon">
											<img src="../../images/login/icon_password.png">
										</span>
										<input type="password" id="password" name="password" style= "background-color:transparent !important;color: #ffffff" class="form-control" placeholder="密码">
									</div>
								</div>
							</div>
							<div class="form-group form-actions">
								<div class="reset">
									<button class="widb" type="reset" class="btn btn-block btn-primary" id="resetBtn">重置</button>
								</div>
								<div  class="submit">
									<button class="widb" type="submit" class="btn btn-block btn-primary" id="submitBtn">登&nbsp;&nbsp;录</button>
								</div>
								
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="chooseSysRoleUserFullBackground" class="fullBackground" style="z-index: 1000;display: none;"></div>
	<div id="chooseSysRoleUser">
		<div class="mailtop"></div>
		<div class="align-center">
			请选择角色<i class="fa fa-check red"></i>
		</div>
	</div>
	<script type="text/javascript">
		// 获取session中封装成json的用户信息，将json解析，赋值到弹出框中
		$(function(){
			var data = eval('(' + '<%=sysUser%>' + ')');
			if(null != data && undefined != data && data.length>0) {
				// 解析json，并将json的值赋值给弹出框
				var html = "";
				for(var i = 0; i < data.length; i++) {
					html += "<div class=\"align-center radio blue\"><label class=\"radio-inline\"><input type=\"radio\" name=\"sysUser\" value=\"" + data[i].password + "\">&nbsp;&nbsp;<font>" + data[i].loginId + "</font></label></div>";
				}
				var $obj = $("#chooseSysRoleUser");
				$obj.append(html);
				$obj.css({
					"margin-top": -($obj.height()/2),
				})
				//topsetWindowCenter($obj);
				$obj.fadeIn();
				$("#chooseSysRoleUserFullBackground").fadeIn();
				$("[name='sysUser']").click(function(){
					location.href =$.cxt+'/oaLogin?password=' +  $(this).val() + '&loginId=' + $(this).parent().find("font").text() + "&isOa=" + true;
				})
			}
		});
	</script>
</body>
</html>