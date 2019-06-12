<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>Insert title here</title>
<cxt:commonLinks />
<jsp:include page="/pages/gis/common/mapjs.jsp" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/datepicker.css">
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.zh-CN.min.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/daterangepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/moment.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datetimepicker.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/js/multiselect/multiple-select.css" type="text/css"/>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/multiselect/multiple-select.js"></script>
<style type="text/css">
html, body, #main {
	width: 100%;
	height: 100%;
	overflow: hidden;
	margin:0;
}
#topwindow101context {
	background: url(../../images/frameBg.png) center;
	background-size: 100% 100%;
}
#topwindow101context .modal-body, #topwindow101context .modal-bottom {
	background: none;
}
.BMap_stdMpZoom {
	top: -6px !important;
}
.BMap_stdMpPan {
	top: -55px !important;
}
.menuArea{
	position: absolute;
	top:10px;
	right:10px;
	width:22%;
}
.exportFont{
	color:white;
}
.directSaleBtn {
	vertical-align: top;
	border-radius: 0px;
	width: 17%;
	height: 30px;
	text-align: center;
	font-size: 10px;
	position: relative;
	background: #3385FE;
	border-color: #3385FE;
	color: white;
}
#datashow {
    background-color:white;
    right:10px;
    bottom:10px;
    height:auto;
	position:absolute;
}
</style>
</head>
<body>
	<div id="main"></div>
	<div class="menuArea" style = "visibility: hidden;">
		<!-- 导出excel start -->
		<div style="width: 100%; height: 40px; background-color: rgba(101, 101, 126, 0.8); margin-top: 34px;" id="downExportToggleDiv">
			<span style="margin-top: 10px; margin-left: 10px; float: left; color: white;">基础单元信息导出</span>
			<span style="float: right; color: white; padding-right: 13px; margin-top: 5px;">
				<span id="downExportToggleSpan">
					<a id="downExportToggle" style="cursor: pointer;"><font style="font-size: 20px; color: white;">v</font></a>
				</span>
			</span>
		</div>
		<!-- 导出excel end -->
		<!-- 导出 start -->
		<div class="page-content clearfix" id="exportDiv" style="height: 450px; display: none;width: 100%; background-color: rgba(101, 101, 126, 0.8); margin-top: 34px;">
			<div class="col-sm-12 grid-full">
				<div style="width: 100%;">
					<span style="color: white;">基础单元信息导出</span>
					<span style="float: right; color: white;">
						<span id="upExportToggleSpan">
							<a id="upExportToggle" style="cursor: pointer; padding-top: -3px;"><font style="font-size: 18px; color: white;">^</font></a>
						</span>
					</span>
				</div>
				<div id="gridSecondContainers">
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<div style="margin-top: 5px;">
						<button class="exportBtn" id="exportSecondGridInfo">导出</button>
					</div>
					<div id="exportMapTableInfo" style="margin-top: 10px; position: relative; height: 81%;">
						<li>
							<input type="checkbox" id="checkSecondAllPoiInfo" />
							<font color="#FFFFFF" style="font-size: 14px">已入格数据导出</font>
						</li>
						<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 10px;"></li>
						<table class="poiAreaList">
							<tr>
								<span class="exportSpans">
									<td style="width: 10%;">
								      	<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="channels" />
								      	</td>
								      	<td style="width: 20%;">
									  	<font class="exportFont">渠道信息</font>
									</td>
								    <td style="width: 10%;">
								      	<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="stations" />
										</td>
									  	<td style="width: 20%;">
									  	<font class="exportFont">基站信息</font>
									</td>
							 	</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="community" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">小区信息</font>
							    	</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="building" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">楼宇信息</font>
									</td>
							  	</span>
							</tr>
							<tr>
							  	<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="gridInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">网格信息</font>
									</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="ABGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">AB集团单位信息</font>
									</td>
							  	</span>
							</tr>
							<tr>
							  	<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="CDGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">CD集团单位信息</font>
									</td>
							  	</span>
							</tr>
						</table>
					</div>
					<!-- 未入格导出 -->
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<div style="margin-top: 5px;">
						<button class="exportBtn" id="exportSecondGridInfoNotEnter">导出</button>
					</div>
					<div id="exportMapTableInfoNotEnter" style="margin-top: 10px; position: relative; height: 81%;">
						<li>
							<input type="checkbox" id="checkSecondAllPoiInfoNotEnter" />
							<font color="#FFFFFF" style="font-size: 14px">未入格导出</font>
						</li>
						<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 10px;"></li>
						<table class="poiAreaList">
							<tr>
								<span class="exportSpans">
									<td style="width: 10%;">
								      	<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="channels" />
								      	</td>
								      	<td style="width: 20%;">
									  	<font class="exportFont">渠道信息</font>
									</td>
								    <td style="width: 10%;">
								      	<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="stations" />
										</td>
									  	<td style="width: 20%;">
									  	<font class="exportFont">基站信息</font>
									</td>
							 	</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="community" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">小区信息</font>
							    	</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="building" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">楼宇信息</font>
									</td>
							  	</span>
							</tr>
							<tr>
							  	<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="gridInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">网格信息</font>
									</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="ABGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">AB集团单位信息</font>
									</td>
							  	</span>
							</tr>
							<tr>
							  	<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="CDGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">CD集团单位信息</font>
									</td>
							  	</span>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
		<!-- 导出 end -->
	</div>

	
<!-- 	<div id='downCityInfoDivId' style="display:none;">地市信息展示</div> -->
	<!-- <div id="cityInfoDivId"  style="display:none;">
	<div id='areaNameId'>
	<font id='cntyInfoName'>///</font>地市信息展示
	</div>
	<div id='backInfo'>最小化</div>
	<table id='cityInfoTable'>
	<tr><td style='width: 110px;' align='left'>地市名称：<span style='color: #000000' id='CITY_NAME'></span></td><td style='width: 110px;' align='left'>网格总数：<span id='GRID_COUNT'></span></td></tr>
	<tr><td style='width: 110px;' align='left'>一类网格：<span style='color: #000000' id='GRID_TYPE1'></td><td style='width: 110px;' align='left'>二类网格：<span style='color: #000000' id='GRID_TYPE2'></td></tr>
	<tr><td style='width: 110px;' align='left'>三类网格：<span style='color: #000000' id='GRID_TYPE3'></td><td style='width: 110px;' align='left'>渠道数：<span style='color: #000000' id='CHNL_COUNT'></td></tr>
	<tr><td style='width: 110px;' align='left'>入格渠道数：<span style='color: #000000' id='CHNL_WG_COUNT'></td><td style='width: 110px;' align='left'>基站数：<span style='color: #000000' id='STATION_COUNT'></td></tr>
	<tr><td style='width: 110px;' align='left'>入格基站数：<span style='color: #000000' id='STATION_WG_COUNT'></td><td style='width: 110px;' align='left'>小区数：<span style='color: #000000' id='CELL_COUNT'></td></tr>
	<tr><td style='width: 110px;' align='left'>入格小区数：<span style='color: #000000' id='CELL_WG_COUNT'></td><td style='width: 110px;' align='left'>重点小区数：<span style='color: #000000' id='ZDCELL_COUNT'></td></tr>
	<tr><td style='width: 110px;' align='left'>入格重点小区数：<span style='color: #000000' id='ZDCELL_WG_COUNTZDCELL'></td><td style='width: 110px;' align='left'>高价值低占小区数：<span style='color: #000000' id='HIGHVALUE_CELL_COUNT'></td></tr>
	<tr><td style='width: 110px;' align='left'>AB集团数：<span style='color: #000000' id='AB_JT_COUNT'></td><td style='width: 110px;' align='left'>CD集团数：<span style='color: #000000' id='CD_JT_COUNT'></td></tr>
	<tr><td style='width: 110px;' align='left'>端口数：<span style='color: #000000' id='PORT_COUNT'></td><td style='width: 110px;' align='left'>九级地址数：<span style='color: #000000' id='ADDR9_COUNT'></td></tr>
	<tr><td style='width: 110px;' align='left'>个人客户总计费收入(万)：<span style='color: #000000' id='INCOME'></td><td style='width: 110px;' align='left'>放号量(户)：<span style='color: #000000' id='TELE_COUNT'></td></tr>
	<tr><td style='width: 110px;' align='left'>新增宽带(户)：<span style='color: #000000' id='BRO_ADD_COUNT'></td><td style='width: 110px;' align='left'>终端合约(台)：<span style='color: #000000' id='TERMINAL_COUNT'></td></tr>
	<tr><td style='width: 110px;' align='left'>家庭网新增(户)：<span style='color: #000000' id='HOMENET_ADD_COUNT'></td><td style='width: 110px;' align='left'>高价低占小区宽带新增(户)：<span style='color: #000000' id='CELLRATE_ADD_SUM'></td></tr>
	<tr><td style='width: 110px;' align='left'>90后客户规模提升(个)：<span style='color: #000000' id='ADD_VALUE_COUNT'></td><td style='width: 110px;' align='left'>头部客户宽带新增(户)：<span style='color: #000000' id='FUSE_RATE'></td></tr>
	<tr><td style='width: 110px;' align='left'>商客拓展(个)：<span style='color: #000000' id='ENCLOSURE_COUNT'></td><td></td></tr>
	</table></div> -->
	
	<!-- <div id='downCityInfoDivId' style="display:none;">全省信息展示</div> -->
	<div id="cityInfoDivId"  style="display:none;">
	<div id='areaNameId' style="width:100%;">
	<font id='cityInfoName'>///全省</font><font style="margin-right:12px;float:right;" id='cityClose'>关闭</font>
	</div>
	<div id='cityInfoDiv'>
	<table id='cityInfoTable'>
	<tr><td style='width: 110px;' align='left'>网格总数<span id='GRID_COUNT1'></span></td></tr>
	<tr><td style='width: 110px;' align='left'>一类网格<span style='color: #000000' id='GRID_TYPE11'></td></tr>
	<tr><td style='width: 110px;' align='left'>二类网格<span style='color: #000000' id='GRID_TYPE21'></td></tr>
	<tr><td style='width: 110px;' align='left'>三类网格<span style='color: #000000' id='GRID_TYPE31'></td></tr>
	<tr><td style='width: 110px;' align='left'>总渠道数<span style='color: #000000' id='CHNL_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>已入格渠道数<span style='color: #000000' id='CHNL_WG_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>总基站数<span id='STATION_COUNT1'></span></td></tr>
	<tr><td style='width: 110px;' align='left'>已入格基站数<span style='color: #000000' id='STATION_WG_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>基站小区数<span style='color: #000000' id='STATION_CELL_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>已入格基站小区<span style='color: #000000' id='STATION_CELL_WG_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>宽带小区数<span style='color: #000000' id='CHNL_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>已入格宽带小区数<span style='color: #000000' id='CELL_WG_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>AB集团数<span style='color: #000000' id='AB_JT_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>已入格AB集团数<span id='ABJT_WG_COUNT1'></span></td></tr>
	<tr><td style='width: 110px;' align='left'>CD集团数<span style='color: #000000' id='CD_JT_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>已入格CD集团数<span style='color: #000000' id='CDJT_WG_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>高价值低占小区数<span style='color: #000000' id='GJDZ_CELL_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>已入格高价值低占小区<span style='color: #000000' id='GJDZ_CELL_WG_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>放号量（户）<span style='color: #000000' id='TELE_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>个人客户总计费收入（万）<span id='CUS_INCOME1'></span></td></tr>
	<tr><td style='width: 110px;' align='left'>新增宽带（户）<span style='color: #000000' id='BRO_ADD_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>终端合约（台）<span style='color: #000000' id='TERMINAL_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>家庭网新增（户）<span style='color: #000000' id='HOMENET_ADD_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>高价值低占小区宽带新增（户）<span style='color: #000000' id='GJDZ_ADD_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>90后客户规模提升（个）<span style='color: #000000' id='AFTER90_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>头部客户宽带新增（户）<span style='color: #000000' id='FUSEUSR_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>商客拓展（个）<span id='ENCLOSURE_COUNT1'></span></td></tr>
	<tr><td style='width: 110px;' align='left'>客户发展（个）<span style='color: #000000' id='CUS_DVP_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>宽带新增（个）<span style='color: #000000' id='KD_ADD_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>合约融合（个）<span style='color: #000000' id='CONTRACT_INT_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>九级地址数<span style='color: #000000' id='ADDR9_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>总端口数<span style='color: #000000' id='PORT_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>空闲端口数<span id='PORT_FEE_COUNT1'></span></td></tr>
	<tr><td style='width: 110px;' align='left'>楼栋数<span style='color: #000000' id='BUILDING_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>光纤箱（是否光交箱）<span style='color: #000000' id='GXX_COUNT1'></td></tr>
	<tr><td style='width: 110px;' align='left'>分纤箱<span style='color: #000000' id='FXX_COUNT1'></td></tr>
	</table></div>
	</div>
	<input type="hidden" value="" id="hiddenOrgId" />
	<input type="hidden" value="" id="hiddenOrgLevel" />
	<!-- 基站直销经理弹出框 start -->
	<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel1">直销人员信息表</h4>
				</div>
				<div class="modal-body" style="display:grid;">
					<div style="height:5px;width:50px">
						<iframe style="height: 36px;" id="uploadFrame" name="uploadFrame"></iframe>
					</div>
					<form  target="uploadFrame" id="upformDirDirectSale" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/map/uploadDirectSaleFiles" method="post">
	                	<div class="form-group">
							<div class="col-xs-12">
								<input type="file" id="directSaleFileDir" name="directSaleFileDir"/>
							</div>
				   		</div>
					</form>
					<div style="text-align: right;margin-top:-31px;margin-left:285px;margin-right:-10px;">
						<button  type="button" class="btn btn-primary" data-target="#myFormInline"  id="exportDirectSaleInfo" style="width:84px;height: 36px;margin-left:0;border-radius:0;">导出模板</button>			
						<button id="improtDirectSaleInfo" type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">确定</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 基站直销经理弹出框 end -->
	<!-- CD类政企客户弹出框 start -->
	<div class="modal fade" id="myModal01" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel1">CD类政企客户信息表</h4>
				</div>
				<div class="modal-body" style="display:grid;">
					<div style="height:5px;width:50px">
						<iframe style="height: 36px;" id="uploadFrame" name="uploadFrame"></iframe>
					</div>
					<form  target="uploadFrame" id="upformDirGovBus" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/map/uploadGovBusFiles" method="post">
	                	<div class="form-group">
							<div class="col-xs-12">
								<input type="file" id="govBusFileDir" name="govBusFileDir"/>
							</div>
				   		</div>
					</form>
					<div style="text-align: right;margin-top:-31px;margin-left:285px;margin-right:-10px;">
						<button  type="button" class="btn btn-primary" data-target="#myFormInline"  id="exportGovBusInfo" style="width:84px;height: 36px;margin-left:0;border-radius:0;">导出模板</button>			
						<button id="improtGovBusInfo" type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">确定</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- CD类政企客户弹出框 end -->
	<!-- 规模模态框 -->
	<div class="modal fade" id="scaleModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 800px;">
			<div class="modal-content clearfix" style="margin:0 auto;background: url(../../images/gis/dataVisual/u372.png) !important;background-size: 100% 100% !important;">
				<div class="modal-header" style="display: none;">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	            </div>
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">
	            	<div class="grid-type-all">
	            		<div class="org-modal">
	            		</div>
	            		<div class="scale-table" style="margin-top: 10px;">
	            			<table id="scaleTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            			<div id="grid-pager4"></div> 
	            		</div>
	            		<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
	            	</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- CD类规模模态框 -->
	<div class="modal fade" id="govBusModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 800px;">
			<div class="modal-content clearfix" style="margin:0 auto;background: url(../../images/gis/dataVisual/u372.png) !important;background-size: 100% 100% !important;">
				<div class="modal-header" style="display: none;">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	            </div>
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">
	            	<div class="grid-type-all">
	            		<div class="org-modal">
	            		</div>
	            		<div class="scale-table" style="margin-top: 10px;">
	            			<table id="govBusTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            			<div id="grid-pager7"></div> 
	            		</div>
	            		<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
	            	</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 直销人员维护框 -->
	<div class="modal fade" id="modifyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 929px;">
			<div class="modal-content clearfix" style="margin:0 auto;background: url(../../images/gis/dataVisual/u372.png) !important;background-size: 100% 100% !important;">
				
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">
	            	<div style="width: 100%;margin-top: 5px;">
	            		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	            		<!-- <select id="citySelect" style="width: 100px"></select>&nbsp;&nbsp;
	            		<select id="cntySelect" style="width: 100px"></select>&nbsp;&nbsp; -->
	            		<input type="radio" name="gridSelect" value="0"><font color="white">未入网格</font>
	            		<input type="radio" name="gridSelect" value="1" checked="checked"><font color="white">已入网格</font>&nbsp;&nbsp;
	            		<button class="directSaleBtn" data-toggle="modal" data-target="#myModal2" onclick="queryDirectSaleInfo()" style="height: 30px;width:100px;border-radius:0;">查询</button>&nbsp;&nbsp;&nbsp;&nbsp;
	            		<button class="directSaleBtn" data-toggle="modal" data-target="#myModal2" onclick="selectChannel()" style="height: 30px;width:100px;margin-left:0;border-radius:0;">更新渠道</button>
	            	</div>
	            	<div class="grid-type-all">
	            		<div class="scale-table" style="margin-top: 10px;">
	            			<table id="modifyTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            			<div id="grid-pager5"></div> 
	            			<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
	            		</div>
	            	</div>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div>
	<!-- 网格选择框 -->
	<div class="modal fade" id="channelSelectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 629px;">
			<div class="modal-content clearfix" style="margin:0 auto;background: url(../../images/gis/dataVisual/u372.png) !important;background-size: 100% 100% !important;">		
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">	         
	            	<div class="grid-type-all">
	            		<div class="scale-table" style="margin-top: 10px;">
	            			<table id="channelSelectTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            			<div id="grid-pager6"></div> 
	            			<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
	            			<div>
	            				<center>
	            					<button class="directSaleBtn" data-toggle="modal" data-target="#myModal2" onclick="sureSelectGrid()" style="height: 30px;width:100px;margin-left:0;border-radius:0;">确认选择</button>
	            					<input type="hidden" id="selectedOfficeids">
	            				</center>
	            			</div>
	            		</div>
	            	</div>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div>
	
		<!-- CD类政企客户人员维护框 -->
	<div class="modal fade" id="modifyCDModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 929px;">
			<div class="modal-content clearfix" style="margin:0 auto;background: url(../../images/gis/dataVisual/u372.png) !important;background-size: 100% 100% !important;">
				
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">
	            	<div style="width: 100%;margin-top: 5px;">
	            		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	            		<!-- <select id="citySelect" style="width: 100px"></select>&nbsp;&nbsp;
	            		<select id="cntySelect" style="width: 100px"></select>&nbsp;&nbsp; -->
	            		<input type="radio" name="grid" value="0"><font color="white">未入网格</font>
	            		<input type="radio" name="grid" value="1" checked="checked"><font color="white">已入网格</font>&nbsp;&nbsp;
	            		<button class="directSaleBtn" data-toggle="modal" data-target="#myModal02" onclick="queryGovBusInfo()" style="height: 30px;width:100px;border-radius:0;">查询</button>&nbsp;&nbsp;&nbsp;&nbsp;
	            		<button class="directSaleBtn" data-toggle="modal" data-target="#myModal02" onclick="selectCDGrid()" style="height: 30px;width:100px;margin-left:0;border-radius:0;">导入网格</button>&nbsp;&nbsp;
	            		<button class="directSaleBtn" data-toggle="modal" data-target="#myModal02" onclick="deleteCDGrid()" style="height: 30px;width:100px;margin-left:0;border-radius:0;">删除网格</button>
	            	</div>
	            	<div class="grid-type-all">
	            		<div class="scale-table" style="margin-top: 10px;">
	            			<table id="modifyCDTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            			<div id="grid-pager8"></div> 
	            			<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
	            		</div>
	            	</div>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div>
	
	<!-- CD网格选择框 -->
	<div class="modal fade" id="cdGridSelectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 629px;">
			<div class="modal-content clearfix" style="margin:0 auto;background: url(../../images/gis/dataVisual/u372.png) !important;background-size: 100% 100% !important;">		
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">	         
	            	<div class="grid-type-all">
	            		<div class="scale-table" style="margin-top: 10px;">
	            			<table id="cdGridSelectTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            			<div id="grid-pager9"></div> 
	            			<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
	            			<div>
	            				<center>
	            					<button class="directSaleBtn" data-toggle="modal" data-target="#myModal2" onclick="cdSureSelectGrid()" style="height: 30px;width:100px;margin-left:0;border-radius:0;">确认选择</button>
	            					<input type="hidden" id="selectedGcCodes">
	            				</center>
	            			</div>
	            		</div>
	            	</div>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div>
	<!-- 基础单元信息导出弹出框 -->
	<div class="modal fade" id="modal-map-BUI" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 1030"> 
	<div class="modal-dialog">
		<div class="modal-content clearfix" style="width:400px;height:450px;margin:0 auto;">
			<div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">确认</h4>
            </div>
            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;">
            	<div id="gridContainers">
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<div style="margin-top: 5px;">
						<div id="gridDiv">
							<font color="#FFFFFF" style="font-size: 14px">网格信息：</font>
							<select id="gridInfos" style="width: 175px; text-align: center"></select>
						</div>
						<button class="exportBtn" id="exportGridInfo">导出</button>
					</div>
					<!-- 已入格数据导出 -->
					<div id="exportMapTableInfo" style="margin-top: 10px; position: relative; height: 81%;">
						<li>
							<input type="checkbox" id="checkAllPoiInfo" />
							<font color="#FFFFFF" style="font-size: 14px">已入格数据导出</font>
						</li>
						<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 10px;"></li>
						<table class="poiAreaList">
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="channels" />
							      	</td>
							      	<td style="width: 20%;">
								  		<font class="exportFont">渠道信息</font>
									</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="stations" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">基站信息</font>
									</td>
							  	</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="community" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">小区信息</font>
							    	</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="building" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">楼宇信息</font>
									</td>
								</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="gridInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">网格信息</font>
									</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="ABGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">AB集团单位信息</font>
									</td>
								</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="CDGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">CD集团单位信息</font>
									</td>
								</span>
							</tr>
						</table>
					</div>
					<!-- 未入格导出 -->
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<div style="margin-top: 5px;">
						<button class="exportBtn" id="exportGridInfoNotEnter">导出</button>
					</div>
					<div id="exportMapTableInfo" style="margin-top: 10px; position: relative; height: 81%;">
						<li>
							<input type="checkbox" id="checkAllPoiInfoNotEnter" />
							<font color="#FFFFFF" style="font-size: 14px">未入格数据导出</font>
						</li>
						<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 10px;"></li>
						<table class="poiAreaList">
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="channels" />
							      	</td>
							      	<td style="width: 20%;">
								  		<font class="exportFont">渠道信息</font>
									</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="stations" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">基站信息</font>
									</td>
							  	</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="community" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">小区信息</font>
							    	</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="building" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">楼宇信息</font>
									</td>
								</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="gridInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">网格信息</font>
									</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="ABGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">AB集团单位信息</font>
									</td>
								</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="CDGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">CD集团单位信息</font>
									</td>
								</span>
							</tr>
						</table>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 直销人员维护弹出框start -->
<div class="modal fade" id="modal-map-DSPM" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
	<div class="modal-dialog">
		<div class="modal-content clearfix" style="width:730px;margin:0 auto;">
			<div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">确认</h4>
            </div>
            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;">
            	<div id="gridDirectSaleContainers">
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<div style="margin-top: 5px;">
						<li>
							<button class="directSaleBtn" data-toggle="modal" data-target="#myModal1" id="directSaleImportBtn" style="height: 30px;margin-left:0;border-radius:0;">导入</button>
							<button class="directSaleBtn" data-toggle="modal" data-target="#myModal2" id="directSaleViewBtn" style="height: 30px;margin-left:0;border-radius:0;">查看</button>
							<button class="directSaleBtn" data-toggle="modal" data-target="#myModal2" id="directSaleMaintainBtn" style="height: 30px;margin-left:0;border-radius:0;">维护</button>
						</li>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

	
<!-- CD政企客户导入弹出框start -->
<div class="modal fade" id="modal-map-CD" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
	<div class="modal-dialog">
		<div class="modal-content clearfix" style="width:730px;margin:0 auto;">
			<div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">确认</h4>
            </div>
            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;">
            	<div id="gridGovBusContainers">
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<div style="margin-top: 5px;">
						<li>
							<button class="directSaleBtn" data-toggle="modal" data-target="#myModal01" id="govBusImportBtn" style="height: 30px;margin-left:0;border-radius:0;">导入</button>
							<button class="directSaleBtn" data-toggle="modal" data-target="#myModal02" id="govBusViewBtn" style="height: 30px;margin-left:0;border-radius:0;">查看</button>
							<button class="directSaleBtn" data-toggle="modal" data-target="#myModal02" id="govBusMaintainBtn" style="height: 30px;margin-left:0;border-radius:0;">维护</button>						
						</li>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>	
	 <div id="datashow" class="datashow" >
        </div>	
</body>
<script type="text/javascript">
<%
	String orgId = request.getParameter("orgId");
	if (orgId == null) {
		// 获取当前登录用户
		SysUser sysUser = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		orgId = sysUser.getOrgId();
	}
%>
var nowOrgId = "<%=orgId%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/gridInfo/gridInfoInit.js"></script>
</html>
