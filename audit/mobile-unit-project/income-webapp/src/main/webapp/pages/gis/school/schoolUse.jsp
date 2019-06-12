<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div style="text-align: center; width: 100%; height: 350px;" >
	<div style="margin-left: 100px">
		<table id="table4">

			<tr>
				<td>校园使用</td>
				<td>值</td>
				<td>环比</td>
			</tr>

			<tr>
				<td>校园用户ARPU</td>
				<td id="use_ARPU"></td>
				<td id="use_ARPUcycle" onclick="userClick('校园用户ARPU');"></td>
			</tr>
			
			<tr>
				<td>ARPU分档（剔除折让后)</td>
				<td id="use_ARPU_REAL_FEE"></td>
				<td id="use_ARPU_REAL_FEEcycle" onclick="userClick('校园用户ARPU(折让后)');"></td>
			</tr>

			<tr>
				<td>校园用户MOU</td>
				<td id="use_MOU"></td>
				<td id="use_MOUcycle" onclick="userClick('校园用户MOU');"></td>
			</tr>

			<tr>
				<td>校园用户DOU</td>
				<td id="use_DOU"></td>
				<td id="use_DOUcycle" onclick="userClick('校园用户DOU');"></td>
			</tr>

			<tr>
				<td>通话用户数</td>
				<td id="use_phoneUser"></td>
				<td id="use_phoneUserCycle" onclick="userClick('通话用户数');"></td>
			</tr>

			<!-- <tr>
				<td>通信用户数</td>
				<td id="use_communication"></td>
				<td id="use_communicationCycle" onclick="userClick(this);"></td>
			</tr> -->
		</table>
	</div>
	
		<div id="chart3">
	   <select  id="useSelect" style="width:135px;right: 45px;">
	   
	   </select>
		<div id="useEchart" style="width:430px;height:270px">
		
		</div>
	</div>
	
	
</div>


<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/schoolUse.js"></script>