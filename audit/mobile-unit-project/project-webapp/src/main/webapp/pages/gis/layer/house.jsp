<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!-- 这里是引入cxt这个前缀，这样请求后台的时候才能引用到路径 -->
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%
	String physicalId = request.getParameter("physicalId");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!-- 这个是引入js 等资源，单独的jsp是需要引用这个的，如果只是弹窗，这个就不需要引用 -->
<%-- <cxt:commonLinks /> --%>
<title>小区信息</title>
</head>
<body>
	 <input type="hidden" value="<%=physicalId%>" id="physicalId" />
	 <table border="3" width="100%" style="background: beige;">
	 	<tr>
	 		<td width="25%">区县编码</td>
	 		<td width="25%" id="cityCode"></td>
	 		<td width="25%">区县名称</td>
	 		<td width="25%" id="cityName"></td>
	 	</tr>   
	 	       
	 	<tr>           
	 		<td width="25%">小区名称</td>
	 		<td width="25%" id="houseName"></td>
	 		<td width="25%">友商促销情况</td>
	 		<td width="25%" id="sale"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="25%">小区编码</td>
	 		<td width="25%" id="houseCode"></td>
	 		<td width="25%">物业名称</td>
	 		<td width="25%" id="propertyName"></td>
	 	</tr>   
	 	       
	 	<tr>           
	 		<td width="25%">小区地址</td>
	 		<td width="25%" id="houseAddress"></td>
	 		<td width="25%">物业办公电话</td>
	 		<td width="25%" id="propertyTelephone"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="25%">小区类型</td>
	 		<td width="25%" id="houseType"></td>
	 		<td width="25%">物业办公地址</td>
	 		<td width="25%" id="propertyAddress"></td>
	 	</tr>   
	 	       
	 	<tr>           
	 		<td width="25%">小区经度</td>
	 		<td width="25%" id="longitude"></td>
	 		<td width="25%">小区纬度</td>
	 		<td width="25%" id="latitude"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="25%">建筑面积</td>
	 		<td width="25%" id="buildingArea"></td>
	 		<td width="25%">关键人(领导)</td>
	 		<td width="25%" id="person"></td>
	 	</tr>   
	 	       
	 	<tr>           
	 		<td width="25%">占地面积</td>
	 		<td width="25%" id="landArea"></td>
	 		<td width="25%">关键人职务</td>
	 		<td width="25%" id="personPosition"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="25%">小区栋数</td>
	 		<td width="25%" id="houseBuilder"></td>
	 		<td width="25%">关键人电话</td>
	 		<td width="25%" id="keyTel"></td>
	 	</tr>   
	 	       
	 	<tr>           
	 		<td width="25%">小区户数</td>
	 		<td width="25%" id="houseNumber"></td>
	 		<td width="25%">物业联系人</td>
	 		<td width="25%" id="propertyPerson"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="25%">小区入住户数</td>
	 		<td width="25%" id="houseIn"></td>
	 		<td width="25%">物业联系人职务</td>
	 		<td width="25%" id="propertyPosition"></td>
	 	</tr>   
	 	       
	 	<tr>           
	 		<td width="25%">人口规模</td>
	 		<td width="25%" id="personScale"></td>
	 		<td width="25%">物业联系人电话</td>
	 		<td width="25%" id="propertyTel"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="25%">小区端口数</td>
	 		<td width="25%" id="housePort"></td>
	 		<td width="25%">开发商名称</td>
	 		<td width="25%" id="developerName"></td>
	 	</tr>   
	 	       
	 	<tr>           
	 		<td width="25%">已使用端口数</td>
	 		<td width="25%" id="usePort"></td>
	 		<td width="25%">开发商联系人名称</td>
	 		<td width="25%" id="developerPersonName"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="25%">端口利用率</td>
	 		<td width="25%" id="portUsed"></td>
	 		<td width="25%">开发商联系人电话</td>
	 		<td width="25%" id="developerPersonTel"></td>
	 	</tr>   
	 	       
	 	<tr>           
	 		<td width="25%">是否电信覆盖</td>
	 		<td width="25%" id="isTele"></td>
	 		<td width="25%">开发商办公电话</td>
	 		<td width="25%" id="developerTel"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="25%">是否联通覆盖</td>
	 		<td width="25%" id="isUnicom"></td>
	 		<td width="25%">性别</td>
	 		<td width="25%" id="sex"></td>
	 	</tr>   
	 	       
	 	<tr>           
	 		<td width="25%">是否广电覆盖</td>
	 		<td width="25%" id="isRadio"></td>
	 		<td width="25%">宽带用户数</td>
	 		<td width="25%" id="useNumber"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="25%">是否具备传输资源</td>
	 		<td width="25%" id="isTran"></td>
	 		<td width="25%">宽带到期用户数</td>
	 		<td width="25%" id="expireNumber"></td>
	 	</tr>   
	 	       
	 	<tr>           
	 		<td width="25%">资源建设难易程度(九级地址数)</td>
	 		<td width="25%" id="degree"></td>
	 		<td width="25%">小区价值</td>
	 		<td width="25%" id="houseValue"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="25%">友商网络接入类型</td>
	 		<td width="25%" id="inType"></td>
	 		<td width="25%">是否覆盖宽带资源</td>
	 		<td width="25%" id="isOverride"></td>
	 	</tr>   
	 	       
	 	<tr>           
	 		<td width="25%">友商独家进驻情况</td>
	 		<td width="25%" id="stationed"></td>
	 		<td width="25%">宽带收入</td>
	 		<td width="25%" id="income"></td>
	 	</tr>
	 	
	 	<tr>           
	 		<td width="25%">电信用户数</td>
	 		<td width="25%" id="teleperson"></td>
	 		<td width="25%">小区网络覆盖类型</td>
	 		<td width="25%" id="network"></td>
	 	</tr>
	 	
	 	<tr>           
	 		<td width="25%">联通用户数</td>
	 		<td width="25%" id="unicomPerson"></td>
	 		<td width="25%">宽带资源饱和率</td>
	 		<td width="25%" id="source"></td>
	 	</tr>
	 	 
	 	 <tr>           
	 		<td width="25%">广电用户数</td>
	 		<td width="25%" id="radioPerson"></td>
	 		<td width="25%">潜在离网用户占比</td>
	 		<td width="25%" id="goAway"></td>
	 	</tr>
	 	
	 	<tr>           
	 		<td width="25%">移动宽带份额</td>
	 		<td width="25%" id="mobile"></td>
	 		<td width="25%">潜在发展用户占比</td>
	 		<td width="25%" id="developerUser"></td>
	 	</tr>
	 	
	 	<tr>           
	 		<td width="25%">友商产品</td>
	 		<td width="25%" id="product"></td>
	 		<td width="25%">离网占比</td>
	 		<td width="25%" id="goAwayProportion"></td>
	 	</tr>
	 	
	 	<tr>           
	 		<td width="25%">是否攻坚小区</td>
	 		<td width="25%" id="isHouse"></td>
	 		<td width="25%">上月目标客户数</td>
	 		<td width="25%" id="custermer"></td>
	 	</tr>
	 	
	 	
	 </table>

<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/house.js"></script>	
</body>
</html>