<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div style="text-align: center; width: 100%">
	<div style="margin-left: 100px">
		<table id="table1">
			<tr>
				<td>校园基本信息</td>
				<td>值</td>
			</tr>

			<tr>
				<td>学校名称</td>
				<td id="info_schoolName"></td>
			</tr>

			<tr>
				<td>学校地址</td>
				<td id="info_schoolAddress"></td>
			</tr>

			<tr>
				<td>学校类型</td>
				<td id="info_schoolType"></td>
			</tr>

			<tr>
				<td>学校属性</td>
				<td id="info_schoolProperty"></td>
			</tr>

			<tr>
				<td>主管单位</td>
				<td id="info_super"></td>
			</tr>

			<tr>
				<td>学生人数</td>
				<td id="info_schoolPerson"></td>
			</tr>

			<tr>
				<td>新生人数</td>
				<td id="info_schoolNewPerson"></td>
			</tr>

			<tr>
				<td>本网校园用户数</td>
				<td id="info_schoolThisUser"></td>
			</tr>

			<tr>
				<td>本网市场占有率</td>
				<td id="info_schoolProportion"></td>
			</tr>

			<tr>
				<td>市场份额排名</td>
				<td id="info_schoolRanking"></td>
			</tr>

			<tr>
				<td>异网校园用户数</td>
				<td id="info_schoolThatUser"></td>
			</tr>
		</table>
	</div>
	
	<div></div>
	
</div>

<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/schoolInfo.js"></script>