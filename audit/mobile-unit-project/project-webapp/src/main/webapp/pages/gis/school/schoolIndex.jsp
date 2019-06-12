<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
 <%
 	String uid = request.getParameter("physicalId");
 	String level = request.getParameter("level");
 %>
 
 <script type="text/javascript">
		var schoolId = "<%=uid%>";
		var level = "<%=level%>";
</script>
<html>
<style>
	table{
		width:50%;
	}
	#table1{
		width:100%;
	}
	#table1 tr td{		
		font-size:15px;
		padding-top:6px;
		color:#0ab8b6;
		width:50%;
		text-align:left;
	}
	#table4 tr td{		
		font-size:15px;
		padding-top:25px;
		color:#0ab8b6;
		width:33%;
		text-align:left;
	}
	#filterTable tr td,#table3 tr td{		
		font-size:15px;
		padding-top:3px;
		color:#0ab8b6;
		width:33%;
		text-align:left;
	}
	#table1 tr td:first-child,#filterTable tr td:first-child,#table3 tr td:first-child,
	#table4 tr td:first-child{
		color:#fff;
	}
	#chart1{
		position: absolute;
		width: 50%;
	    height: 100%;
	    right: 0;
	    top: 0;
	}
	#filterEchart{
		width: 100%;
    	height: 74%;
	}
	#chart2{
		position: absolute;
	    top: 0;
	    right: 0;
	    width: 50%;
	    height: 100%;
	}
	#newEchart{
		width: 100%;
    	height: 73%;
	}
	#chart3{
		position: absolute;
	    width: 50%;
	    height: 100%;
	    top: 0;
	    right: 0;
	}
	#useEchart{
		width: 100%;
    	height: 79%;
	}
	
	
</style>

<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

	<div id="myCarouselIndex" class="carousel slide" style="height: 370px;" data-interval=false>
		<!-- 轮播（Carousel）指标 -->
		<ol class="carousel-indicators" style="bottom: 7px;">
			<li data-target="#myCarouselIndex" data-slide-to="0" class="active"></li>
			<li data-target="#myCarouselIndex" data-slide-to="1"></li>
			<li data-target="#myCarouselIndex" data-slide-to="2"></li>
			<li data-target="#myCarouselIndex" data-slide-to="3"></li>
			<li data-target="#myCarouselIndex" data-slide-to="4"></li>
		</ol>   
		
		<!-- 轮播（Carousel）项目 -->
		<div class="carousel-inner">
			<div class="item active">
			 	<jsp:include page="schoolInfo.jsp" ></jsp:include>
			</div>
			<div class="item">
				<jsp:include page="schoolFilter.jsp" ></jsp:include>
			</div>
			<div class="item">
				 <jsp:include page="schoolNewDevelop.jsp" ></jsp:include>
			</div>
			<div class="item">
				<jsp:include page="schoolUse.jsp" ></jsp:include>
			</div>
			<div class="item" style="height: 369px;">
				<jsp:include page="schoolUserDetail.jsp" ></jsp:include>
			</div>
		</div>
		
		<!-- 轮播（Carousel）导航 -->
	
	</div>

<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/schoolIndex.js"></script>

</html>