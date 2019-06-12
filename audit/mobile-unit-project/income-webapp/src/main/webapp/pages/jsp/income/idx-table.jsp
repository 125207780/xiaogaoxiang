<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.bonc.common.bean.IncomeUser"%>
 
<%
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.add(Calendar.MONTH, -1);
		String lastMonth = String.valueOf( calendar.get(Calendar.YEAR)*100+calendar.get(Calendar.MONTH)+1);
		IncomeUser us = (IncomeUser)session.getAttribute("incomeUser");
		String place = us.getPlace();
%>

<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>

<style>
/* #idx_table-page{
	height: 19% !important;
}
.ui-jqgrid-hbox{
	height: 25%;
    overflow: hidden;
} */
</style>
<input type="hidden" id = "index5" value="<%=place%>">
<div  style="width:100%;height:100%;position: relative;"> 
<div style="width:100%;height:30px;">
		<label class="income_Lable">地市：</label>
				<select id="areaId">
				 <!--   <option value="999" selected="selected">全省</option>
				   <option value="730">岳阳市</option>
					<option value="731">长沙市</option>
					<option value="732">湘潭市</option>
					<option value="733">株洲市</option>
					<option value="734">衡阳市</option>
					<option value="735">郴州市</option>
					<option value="736">常德市</option>
					<option value="737">益阳市</option>
					<option value="738">娄底市</option>
					<option value="739">邵阳市</option>
					<option value="743">吉首市</option>
					<option value="744">张家界市</option>
					<option value="745">怀化市</option>
					<option value="746">永州市</option> -->
				</select> 
				<!-- <input id="areaId" value="999" type="hidden" /> -->
				<label class="income_Lable">账期：</label><input class="form-control date-picker " value="<%=lastMonth %>" style="width: 130px;display: inline-block;" id="statisMonth" type="text" data-date-format="yyyy-mm" />
			 				
				<button id="search" class="income-btn">查询 </button>
				</div>
<div style="position: absolute;top: 35px;bottom: 2px;overflow: auto;left: 0px;right: 0px;">
<table id="idx_table">
 
</table>
<div id="idx_table-page"></div>
</div>
 </div>
 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/income/idx-table.js"  ></script>

 
 