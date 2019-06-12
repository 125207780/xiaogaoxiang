<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 
 
 
 <style>
 
 #tbody{
 overflow ： auto
 }
 
 </style>
<table class="table table-bordered">
	<!-- <caption>边框表格布局</caption> -->
	<thead>
		<tr>
			<th align='center'>渠道大类</th>
			<th>渠道小类</th>
			<th>数量</th>
		</tr>
	</thead>
	<tbody id="tbody" >
		<!-- <tr>
			<td>Tanmay</td>
			<td>Bangalore</td>
			<td>560001</td>
		</tr>
		<tr>
			<td>Sachin</td>
			<td>Mumbai</td>
			<td>400003</td>
		</tr>
		<tr>
			<td>Uma</td>
			<td>Pune</td>
			<td>411027</td>
		</tr> -->
	</tbody>
</table>
 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/channelCount.js"></script>
 