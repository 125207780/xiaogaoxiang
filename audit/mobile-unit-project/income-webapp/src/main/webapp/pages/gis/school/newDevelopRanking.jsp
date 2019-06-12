<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

 <%
 	String value = request.getParameter("value");
 %>
 
 <script type="text/javascript">
		var value = "<%=value%>";
</script>    

<div> 
	<div >
  		<label><font color = #FFFFFF>地区排名:</font>
  			<input type="text" id="newRankArea" readonly="true" />
  		</label>
		 
		 <label><font color = #FFFFFF>全省排名:</font>
			 <input type="text" id="newRankCity" readonly="true" />
		 </label>
	</div>
	
	 <div id="newDevelop-ranking">
		<table id="newDevelop-ranking-table">
		</table>
		<div id="newDevelop-ranking-table-page">
		</div>
	</div>
 </div>
 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/newDevelopRanking.js"></script>	
