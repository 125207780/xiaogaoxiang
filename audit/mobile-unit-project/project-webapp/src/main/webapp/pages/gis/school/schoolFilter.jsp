<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div style="text-align: center; width: 100%; height: 350px;">

	<div style="margin-left: 100px">
		<table id="filterTable">

			<tr>
				<td>校园渗透率</td>
				<td>用户数</td>
				<td>渗透率</td>
			</tr>

			<tr>
				<td>校园用户</td>
				<td id="filter_schoolUser"></td>
				<td id="filter_userFilter" onclick="filterClick('校园用户');"></td>
			</tr>

			<tr>
				<td>校园宽带用户</td>
				<td id="filter_schoolBandUser"></td>
				<td id="filter_bandUserFilter" onclick="filterClick('校园宽带用户');"></td>
			</tr>

			<tr>
				<td>校园不限量用户</td>
				<td id="filter_schoolUnlimit"></td>
				<td id="filter_unlimitFilter" onclick="filterClick('校园不限量用户');"></td>
			</tr>

			<tr>
				<td>不限量套餐</td>
				<td id="filter_unlimitTaocan"></td>
				<td id="filter_unlimitTaocaoFilter"></td>
			</tr>

			<tr>
				<td>不限量流量包</td>
				<td id="filter_unlimitPackage"></td>
				<td id="filter_unlimitPackageFilter"></td>
			</tr>

			<tr>
				<td>校园合约用户</td>
				<td id="filter_schoolContractUser"></td>
				<td id="filter_contractUserFilter" onclick="filterClick('校园合约用户');"></td>
			</tr>

			<tr>
				<td>终端合约</td>
				<td id="filter_endContract"></td>
				<td id="filter_endContractFilter"></td>
			</tr>

			<tr>
				<td>存费送费</td>
				<td id="filter_saveAndGive"></td>
				<td id="filter_saveAndGiveFilter"></td>
			</tr>

			<tr>
				<td>存费送业务</td>
				<td id="filter_saveAndGiveBus"></td>
				<td id="filter_saveAndGiveBusFilter"></td>
			</tr>

			<tr>
				<td>宽带合约</td>
				<td id="filter_bandContract"></td>
				<td id="filter_bandContractFilter"></td>
			</tr>

			<tr>
				<td>校园4G用户</td>
				<td id="filter_4g"></td>
				<td id="filter_4gFilter" onclick="filterClick('校园4G用户');"></td>
			</tr>

			<tr>
				<td>校园V网用户</td>
				<td id="filter_V"></td>
				<td id="filter_vFilter" onclick="filterClick('校园V网用户');"></td>
			</tr>

		</table>
	</div>
	
	<div id="chart1">  
	   <select  id="filterSelect" style="width:135px;">
	   
	   </select>
		 <div id="filterEchart" style="width:430px;height:270px">
			
		</div> 
	</div>
	
</div>

<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/schoolFilter.js"></script>