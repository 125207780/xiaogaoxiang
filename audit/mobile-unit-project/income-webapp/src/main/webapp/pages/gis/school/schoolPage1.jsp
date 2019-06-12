<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.bean.IncomeUser" %>
<%@ page import="com.bonc.common.cst.CST"%>
<%
	/* SysUser sysUser = (SysUser)session.getAttribute("incomeUser");//获取当前登录用户
	String oaId  = sysUser.getOaId(); */
	/* IncomeUser incomeUser = (IncomeUser) session.getAttribute("incomeUser");
	String oaId = incomeUser.getUserId();  */ 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/pages/css/common.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/datepicker.css">
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.zh-CN.min.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/daterangepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/moment.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datetimepicker.js"></script>

<cxt:commonLinks />
<jsp:include page="/pages/gis/common/mapjs.jsp" />
<style type="text/css">
html, body {
	width: 100%;
	height: 100%;
}
body{
	background:url(<%=request.getContextPath()%>/pages/images/frameBg.png) no-repeat !important;
	background-size:100% 100% !important;
}
#main {
	height: 100%;
	float: left;
	width: 50%;
	position: relative;
}

#rightpanel {
	width: 25%;
	height: 100%;
	float: right;
	position: relative;
	border: 1px solid rgb(0, 158, 188);
}

#leftpanel {
	width: 25%;
	height: 100%;
	float: left;
	position: relative;
	border: 1px solid rgb(0, 158, 188);
}

.areaMenuLevel3 {
	display: none
}
#leftpanel td{
	color:#009ebc;
	padding-top: 2px;
}
.infoDetail{
	height: 100%;
}
#indexOverview{
	height: 100%;
}
.gridClick:hover {
	background:#8cb4bb;color:000;
	cursor: pointer;
}
#schP_gaoxiao:hover {
	background:#8cb4bb;color:000;
	cursor: pointer;
}
.areaMenuLevel3,.areaMenuLevel2,.areaMenuLevel1 {
	font-weight: bold;
}
.areaMenuLevel3 {
	display: block;
	float: right;
}
</style>
</head>
<body class="clearfix" style="background: none; position: relative">
<div class="infoDetail">
	<ul id="myTab" class="nav nav-tabs">
			<li class="active titles setHeight" value="1">
		    	<a href="#indexOverview" data-toggle="tab">指标总览</a>
		    	<!-- <div class="tanBg2"></div> -->
		    </li>
		    <li class="titles setHeight">
			    <a href="#reportArea"   data-toggle="tab">报表专区</a>
			    <!-- <div class="tanBg2"></div> -->
	
		    </li>
		    <li class="titles setHeight">
			    <a href="#helpCenter" data-toggle="tab">帮助中心</a>
			    <!-- <div class="tanBg2"></div> -->
		    </li>
	</ul>
	<div class="infoLists" style="height: 94%;width: 100%;">
		<div id="myTabContent" class="tab-content" style="height: 100%;width: 100%;">
			<div class="tab-pane in active clearfix" id="indexOverview" >
				<div id='leftpanel'>
				 <div class="pull-left" style="margin-left: 28px;margin-top: 7px;"> 
	               <font color=#FFFFFF> 月&nbsp;&nbsp;&nbsp;&nbsp;份：</font>
	           		<input type="text" class="form-control" id="AccountPeriod"  placeholder="请输入日期" style="width: 45%;top: -20px;left: 72px;height:25px;" data-date-format="yyyy-mm" >
	            </div>
					<table >
						<tr>
							<td >高校</td>
							<td >本科</td>
							<td >专科</td>
							<td>中专及其他</td>
						</tr>
						<tr>
							<td  id="schP_gaoxiao">&nbsp;</td>
							<td  id="schP_benke">&nbsp;</td>
							<td  id="schP_zhuanke">&nbsp;</td>
							<td  id="schP_zhongzhuan">&nbsp;</td>
						</tr>
						
						<tr>
							<td id="sch_user_num">校园用户数:</td>
							<td></td>
							<td></td>
						</tr>
						<tr class="gridClick" id="cmcc_sch_user">
							<td  id="cmcc_user">移动校园用户:</td>
							<td  id="cmcc_rate">市场占有率:</td>
							<td></td>
						</tr>
						<tr class="gridClick" id="unit_sch_user">
							<td  id="UNI_SCH_USERS">联通校园用户:</td>
							<td  id="uni_rate">市场占有率:</td>
							<td></td>
						</tr>
						<tr class="gridClick" id="tele_sch_user">
							<td  id="tele_user">电信校园用户:</td>
							<td  id="tele_rate">市场占有率:</td>
							<td></td>
						</tr>
						<tr class="gridClick" id="cmcc_sch_kd">
							<td  id="cmcc_kd_user">移动校园宽带用户:</td>
							<td  id="cmcc_kd_rate">渗透率:</td>
							<td></td>
						</tr>
						<tr class="gridClick" id="cmcc_sch_unlim">
							<td  id="cmcc_unlim_user">移动校园不限量用户:</td>
							<td  id="cmcc_unlim_rate">渗透率:</td>
							<td></td>
						</tr>
						<tr class="gridClick" id="cmcc_sch_hy">
							<td  id="cmcc_hy_user">移动校园合约用户:</td>
							<td  id="cmcc_hy_rate">渗透率:</td>
							<td></td>
						</tr>
						<tr class="gridClick" id="cmcc_sch_v">
							<td  id="cmcc_v_user">移动校园V网用户:</td>
							<td  id="cmcc_v_rate">渗透率:</td>
							<td></td>
						</tr>
						<tr>
							<td  id="arpu">移动校园用户ARPU:</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td  id="mou">移动校园用户MOU:</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td  id="dou">移动校园用户DOU:</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td  id="this_month_del">本月累计发展校园用户:</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td  id="this_month_unlim">本月累计发展校园不限量:</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td  id="this_month_kd">本月累计发展校园宽带用户:</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td  id="this_month_hy">本月累计发展合约用户:</td>
							<td></td>
							<td></td>
						</tr>
					</table>
					</br>
			
				</div>
			
				<div id="main"></div>
				<div id='rightpanel'>
					<div class="grid infoList" style="margin-top: 10px">
						<table id="gridInfoListGrid"></table>
						<div id="gridInfoListPagers"></div>
					</div>
				</div>
			</div>
			 <div class="tab-pane " id="reportArea">
			 	<div class="infoDetail1">
			    	<ul id="myTab1" class="nav nav-tabs">
			    		<li class="active titles setHeight" value="1">
			    			<a href="#oneStatement1" data-toggle="tab">一经报表</a>
			    		</li>
			    		 <li class="titles setHeight">
			    		 	<a href="#marketingReport1"   data-toggle="tab">营销报表</a>
			    		 </li>
			    		 <li class="titles setHeight">
			    		 	<a href="#campusBaseStationInformation1"   data-toggle="tab">校园基站信息</a>
			    		 </li>
			    	</ul>
			    	<div class="infoLists1" style="height: 94%;width: 100%;">
				    	<div id="myTabContent2" class="tab-content" style="height: 100%;width: 100%;">
				    		<div class="tab-pane in active clearfix" id="oneStatement1" >
				    			 <div id="onemyCarousel2" class="carousel slide" style="height: 500px;" data-interval=false>
									<!-- 轮播（Carousel）指标 -->
									<ol class="carousel-indicators" style="bottom: 7px;">
										<li data-target="#onemyCarousel2" data-slide-to="0" class="active"></li>
										<li data-target="#onemyCarousel2" data-slide-to="1"></li>
									</ol>    
									
									<!-- 轮播（Carousel）项目 -->
									<div class="carousel-inner">
										 <div class="item active">
										 	<jsp:include page="oneStatement1.jsp" ></jsp:include>
										</div>
										<div class="item">
											<jsp:include page="oneStatement2.jsp" ></jsp:include>
										</div> 
									</div>
								</div>
				    		</div>
					    	<div class="tab-pane " id="marketingReport1">
					    		<div class="infoDetail3">
							    	<ul id="myTab3" class="nav nav-tabs">
							    		<li class="active titles setHeight" value="1">
							    			<a href="#dailyReport" data-toggle="tab">日报表</a>
							    		</li>
							    		 <li class="titles setHeight">
							    		 	<a href="#monthReport"   data-toggle="tab">月报表</a>
							    		 </li>
							    	</ul>
							    	<div class="infoLists3" style="height: 94%;width: 100%;">
								    	<div id="myTabContent3" class="tab-content" style="height: 100%;width: 100%;">
								    		<div class="tab-pane in active clearfix" id="dailyReport" >
								    			<div id="myCarousel3" class="carousel slide" style="height: 500px;" data-interval=false>
												<!-- 轮播（Carousel）指标 -->
												<ol class="carousel-indicators" style="bottom: 7px;">
													<li data-target="#myCarousel3" data-slide-to="0" class="active"></li>
													<li data-target="#myCarousel3" data-slide-to="1"></li>
													<li data-target="#myCarousel3" data-slide-to="2"></li>
													<li data-target="#myCarousel3" data-slide-to="3"></li>
													<li data-target="#myCarousel3" data-slide-to="4"></li>
													<li data-target="#myCarousel3" data-slide-to="5"></li>
												</ol>    
												
												<!-- 轮播（Carousel）项目 -->
												<div class="carousel-inner">
													<div class="item active">
													 	<jsp:include page="dailyReportForm1.jsp" ></jsp:include>
													</div>
													 <div class="item">
														<jsp:include page="dailyReportForm2.jsp" ></jsp:include>
													</div>
													 <div class="item">
														<jsp:include page="dailyReportForm3.jsp" ></jsp:include>
													</div>
													<div class="item">
														<jsp:include page="dailyReportForm4.jsp" ></jsp:include>
													</div>
													<div class="item">
														<jsp:include page="dailyReportForm5.jsp" ></jsp:include>
													</div>
													 <div class="item">
														<jsp:include page="dailyReportForm6.jsp" ></jsp:include>
													</div> 
												</div>
												</div>
								    		</div>
								    		 <div class="tab-pane" id="monthReport">
								    		 <div id="myCarousel4" class="carousel slide" style="height: 500px;" data-interval=false>
												<!-- 轮播（Carousel）指标 -->
												<ol class="carousel-indicators" style="bottom: 7px;">
													<li data-target="#myCarousel4" data-slide-to="0" class="active"></li>
													<li data-target="#myCarousel4" data-slide-to="1"></li>
													<li data-target="#myCarousel4" data-slide-to="2"></li>
													<li data-target="#myCarousel4" data-slide-to="3"></li>
													<li data-target="#myCarousel4" data-slide-to="4"></li>
												</ol>    
												
												<!-- 轮播（Carousel）项目 -->
												<div class="carousel-inner">
													 <div class="item active">
													 	<jsp:include page="monthReportForm1.jsp" ></jsp:include>
													</div>
													<div class="item">
														<jsp:include page="monthReportForm2.jsp" ></jsp:include>
													</div>
													<div class="item">
														<jsp:include page="monthReportForm3.jsp" ></jsp:include>
													</div> 
													<div class="item">
														<jsp:include page="monthReportForm4.jsp" ></jsp:include>
													</div>
													 <div class="item">
														<jsp:include page="monthReportForm5.jsp" ></jsp:include>
													</div>   
												</div>
												</div>
								    		 </div>
								    	</div>
							    	</div>
							    </div>
					    	 </div>
				    		 <div class="tab-pane " id="campusBaseStationInformation1">
				    		 <div id="myCarousel" class="carousel slide" style="height: 500px;" data-interval=false>
							<!-- 轮播（Carousel）指标 -->
							<!-- <ol class="carousel-indicators" style="bottom: 7px;">
								<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
							</ol>  -->  
							
							<!-- 轮播（Carousel）项目 -->
							<div class="carousel-inner">
								<div class="item active">
								 	<jsp:include page="stationReportForm.jsp" ></jsp:include>
								</div>
							</div>
							</div>
				    		 </div>
				    	</div>
			    	</div>
			    </div>
		</div>
		 <div class="tab-pane " id="helpCenter">
			 <div style="width: 50%;float: left;height: 584px;">
				 <div class="helpCenterLeft">
				 <button  class="btn btn-primary" id="uploadEntry" data-toggle="modal"
									data-target="#myModal1" style="margin-left: 82%">上传</button>
				 </div>
				
				<div class="modal fade" id="myModal1" tabindex="-1" role="dialog"
						aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<!-- <button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button> -->
								<h4 class="modal-title" id="myModalLabel">文件名称</h4>
							</div>
							<div class="modal-body">
							<div style="display: none">
							<iframe id="uploadFrame" name="uploadFrame"></iframe>
							</div>
								<!-- 多选框 -->
								 <form  target="uploadFrame" id="upform" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/getReportForm/uploadFile" method="post">
		                              <div class="form-group">
								           <div class="col-xs-12">
									         <input type="file" id="helpCenterFile" name="helpCenterFile"/>
								           </div>
							           </div>
								</form>
								<div style="text-align: right;">
									<button id="improtFile" type="button" class="btn btn-primary" 
										>确定</button>
									<button type="button" class="btn btn-primary" id = "myModal1Close"
										>关闭</button>
								</div>
								
							</div>
						</div>
					</div>
				</div>
				
				<div class="page-content clearfix">
					<div class="col-sm-12 grid-full">
						<!-- 列表div -->
						<table id="fileInfoListGrid"></table>
						<div id="fileInfoListPagers"></div>
					</div>
				</div>
			 </div>
			 <div style="width: 50%;float: right;height: 300px;">
			 	<h3 id = "contacts" style="color:white ">联系人:任凤</h3>
			 	<h3 id = "contactNumber" style="color:white ">联系电话:1111111</h3>
			 	<h3 id = "artisan" style="color:white ">技术人员:任凤</h3>
			 	<h3 id = "artisanNumber" style="color:white ">联系电话:1111111</h3>
			 </div>
		 </div>
	 </div>
  </div> 
</div>
		
</body>
<script type="text/javascript">
	var orgId = "1";
 	<%-- var currentOaId = "<%=oaId%>"; --%>
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/schoolPage.js"></script>
</html>
