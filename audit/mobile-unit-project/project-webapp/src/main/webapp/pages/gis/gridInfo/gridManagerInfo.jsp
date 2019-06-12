<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
#topwindow102context {
	background: url(../../images/frameBg.png) center !important;
}
#topwindow102context>.modal-body {
	border: none;
	background: none !important;
}
#topwindow102context>.modal-bottom {
	display: block !important;
	height: 15px !important;
	border: none;
	background: none !important;	
}
</style>
</head>
<body>
	<div class="page-content clearfix">
		<div class="col-sm-12 grid-full">
			<!-- 列表div -->
			<div id="gridManagerInfo">
		 		<table width="98%" border="0" cellspacing="0" cellpadding="0">
	      			<tr>
	        			<td colspan="2">
	          				<table width="100%" border="0" cellspacing="0" cellpadding="0">
	            				<tr>
	              					<td>
	                					<table width="100%" border="1" align="center" cellspacing="0" style="border-collapse:collapse;border:solid #00E1FD;border-width:1px 0 0 1px;">
						                 	<!-- <tr>
						                    	<td align="center" width="10%" style="height:30px;color: #fffbfcf2;">归属营业部</td>
						                    	<td align="center" width="15%" style="height:30px;color: #fffbfcf2;" colspan="3" id="managerSaleDeptName"></td>
						                  	</tr>
						                  	<tr>
						                    	<td align="center" width="10%" style="height:30px;color: #fffbfcf2;">营业部负责人</td>
						                    	<td align="center" width="15%" style="height:30px;color: #fffbfcf2;" id="managerName"></td>
									    		<td align="center" width="12%" style="height:30px;color: #fffbfcf2;">电话</td>
									    		<td align="center" width="15%" style="height:30px;color: #fffbfcf2;" id="managerNumber"></td>
						                  	</tr> -->
						                  	<tr>
						                    	<td align="center" width="10%" style="height:30px;color: #fffbfcf2;">区域总监</td>
						                    	<td align="center" width="15%" style="height:30px;color: #fffbfcf2;" colspan="3"id="gridManager"></td>
						                  	</tr>
						                   	<tr>
						                    	<td align="center" width="10%" style="height:30px;color: #fffbfcf2;">渠道经理</td>
						                    	<td align="center" width="15%" style="height:30px;color: #fffbfcf2;" colspan="3" id="directChnlManager"></td>
						                  	</tr>
						                  	<tr>
							                    <td align="center" width="10%" style="height:30px;color: #fffbfcf2;">客户经理</td>
							                    <td align="center" width="15%" style="height:30px;color: #fffbfcf2;" colspan="3"id="cdManager"></td>
							                  </tr>
						                   	<!-- <tr>
						                    	<td align="center" width="10%" style="height:30px;color: #fffbfcf2;">社会渠道经理</td>
						                    	<td align="center" width="15%" style="height:30px;color: #fffbfcf2;" colspan="3" id="socialChnlManager"></td>
						                  	</tr> -->
						                   	<tr>
						                    	<td align="center" width="10%" style="height:30px;color: #fffbfcf2;">直销人员</td>
						                    	<td align="center" width="15%" style="height:30px;color: #fffbfcf2;" colspan="3" id="directUser"></td>
						                  	</tr>
						                   	<tr>
						                    	<td align="center" width="10%" style="height:30px;color: #fffbfcf2;">装维人员</td>
						                    	<td align="center" width="15%" style="height:30px;color: #fffbfcf2;" colspan="3" id="repairUser"></td>
						                  	</tr>
	                					</table>
	              					</td>
	            				</tr>
	          				</table>
	       	 			</td>
    				</tr>
				</table>
			</div>
		</div>
	</div>
</body>
<script src="<%=request.getContextPath()%>/pages/gis/gridInfo/gridManagerInfo.js"></script>
<script type="text/javascript">
$(function() {
	gridManagerUserInfoLinkage("<%=request.getParameter("orgId")%>");
});
</script>
</html>