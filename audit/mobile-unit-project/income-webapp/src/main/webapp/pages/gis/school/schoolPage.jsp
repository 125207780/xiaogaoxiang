<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<cxt:commonLinks />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>校园专题</title>
<style type="text/css">
html, body {
	width: 100%;
	height: 100%;
}
.menu {
	margin: 0px;
	padding: :0px;
	height: 5%;
	background-color:#4141a7
}

.menu ul {
	margin: 0px;
	padding: 0px;
	width: 25%;
	height: 5%;
	background-color: #4141a7;
	color: #FFFFFF;
	text-align: center;
	list-style: none;
	font-family: "宋体";
}

.menu ul li {
	position: relative;
	margin-left: 0px;
	padding-left: 0px;
	height: 30px;
	line-height:30px;
	width: 33.3%;
	border: none;
	float: left
}

.menu ul li ul {
	visibility: hidden;
	width: 100%;
	position: absolute;
	top: 30px;
}

.menu ul li ul li {
	width: 100%;
	float: none;
	height: 25px;
	padding-top: 3px;
	padding-bottom: :3px;
	position: relative;
	line-height: 22px;
}

.menu ul li ul li ul {
	visibility: hidden;
	position: absolute;
	left: 100%;
	top: 0px;
	width: 80%;
}

.menu ul li:hover ul li ul {
	visibility: hidden;
}

.menu ul li:hover ul li:hover {
	background-color:#29a0ce;
}

.menu ul li ul li:hover ul {
	visibility: visible;
	background-color: #29a0ce;
	color: #fff;
	top: 10px;
}

.menu ul li ul li:hover ul li {
	background-color: #4141a7;
	color: #fff;
}

.menu ul li:hover {
	background-color: #29a0ce;
}

.menu ul li:hover ul {
	visibility: visible;
}

.menu ul li:hover ul li {
	background-color: #4141a7;
	color: #fff;
}
li {
	cursor: pointer;
}
</style>
</head>
<body>
	<div class="menu" >
     <ul>
         <li>
         	<a class="a" data-src="/income/pages/gis/school/indexOverview.jsp"><font color="white">指标总览</font></a>
         </li>
         <li>
         	<a ><font color="white">报表专区</font></a>
             <ul>
                 <li>
                 	<a class="a" data-src="/income/pages/gis/school/schooloneStatement1.jsp" ><font color="white">一经报表</font></a>
                 </li>
                 <li>
                 	<a ><font color="white">营销报表</font></a>
                 	<ul >
                         <li class="titles setHeight" value="1">
                         	<a class="a" data-src="/income/pages/gis/school/schooldailyReport.jsp" ><font color="white">日报表</font></a>
                         </li>
                         <li class="titles setHeight">
                         	<a class="a" data-src="/income/pages/gis/school/schoolmonthReport.jsp" ><font color="white">月报表</font></a>
                         </li>
                     </ul>
                 </li>
                 <li>
                 	<a class="a" data-src="/income/pages/gis/school/schoolcampusBaseStationInformation1.jsp" ><font color="white">校园基站信息</font></a>
                 </li>
             </ul>
         </li>
         <li>
            <a class="a" data-src="/income/pages/gis/school/helpCenter.jsp" ><font color="white">帮助中心</font></a>
         </li>
     </ul>
 </div>
 <iframe id="loaderJsp" src="/income/pages/gis/school/indexOverview.jsp" style="height: 95%;width: 100%; border: none;"></iframe>
</body>
<script type="text/javascript">
	$(function(){
		$(".a").on('click',function(){
			var url = $(this).attr("data-src");
			$("#loaderJsp").attr("src",url)
		})
	})
</script>
</html>