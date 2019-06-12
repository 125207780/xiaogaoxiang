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
  			<input type="text" id="useRankArea" readonly="true" />
  		</label>
		 
		 <label><font color = #FFFFFF>全省排名:</font>
			 <input type="text" id="useRankCity" readonly="true" />
		 </label>
	</div>
	
	 <div id="use-ranking">
		<table id="use-ranking-table">
		</table>
		<div id="use-ranking-table-page">
		</div>
	</div>
 </div>
 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/useRanking.js"></script>	
