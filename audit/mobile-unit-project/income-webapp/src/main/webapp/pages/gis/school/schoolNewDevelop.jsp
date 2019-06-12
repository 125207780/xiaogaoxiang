<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div style="text-align: center; width: 100%; height: 350px;">
	<div style="margin-left: 100px">

		<table id="table3">

			<tr>
				<td>校园新发展</td>
				<td>本月累计</td>
				<td>环比</td>
			</tr>

			<tr>
				<td>校园用户</td>
				<td id="new_userTotal"></td>
				<td id="new_userCycle" onclick="newClick('校园用户');"></td>
			</tr>

			<tr>
				<td>校园宽带用户</td>
				<td id="new_schoolBandUser"></td>
				<td id="new_bandUserFilter" onclick="newClick('校园宽带用户');"></td>
			</tr>

			<tr>
				<td>校园不限量用户</td>
				<td id="new_schoolUnlimit"></td>
				<td id="new_unlimitFilter" onclick="newClick('校园不限量用户');"></td>
			</tr>

			<tr>
				<td>不限量套餐</td>
				<td id="new_unlimitTaocan"></td>
				<td id="new_unlimitTaocaoFilter"></td>
			</tr>

			<tr>
				<td>不限量流量包</td>
				<td id="new_unlimitPackage"></td>
				<td id="new_unlimitPackageFilter"></td>
			</tr>

			<tr>
				<td>校园合约用户</td>
				<td id="new_schoolContractUser"></td>
				<td id="new_contractUserFilter" onclick="newClick('校园合约用户');"></td>
			</tr>

			<tr>
				<td>终端合约</td>
				<td id="new_endContract"></td>
				<td id="new_endContractFilter"></td>
			</tr>

			<tr>
				<td>存费送费</td>
				<td id="new_saveAndGive"></td>
				<td id="new_saveAndGiveFilter"></td>
			</tr>

			<tr>
				<td>存费送业务</td>
				<td id="new_saveAndGiveBus"></td>
				<td id="new_saveAndGiveBusFilter"></td>
			</tr>

			<tr>
				<td>宽带合约</td>
				<td id="new_bandContract"></td>
				<td id="new_bandContractFilter"></td>
			</tr>

			<tr>
				<td>校园4G用户</td>
				<td id="new_4g"></td>
				<td id="new_4gFilter" onclick="newClick('校园4G用户');"></td>
			</tr>

			<tr>
				<td>校园V网用户</td>
				<td id="new_V"></td>
				<td id="new_vFilter" onclick="newClick('校园V网用户');"></td>
			</tr>

		</table>
	</div>
	
	
	<div id="chart2">
	   <select  id="newSelect" style="width:135px;right:107px;">
	   
	   </select>
		<div id="newEchart" style="width:430px;height:270px">
		
		</div>
	</div>
	
</div>

<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/schoolNewDevelop.js"></script>