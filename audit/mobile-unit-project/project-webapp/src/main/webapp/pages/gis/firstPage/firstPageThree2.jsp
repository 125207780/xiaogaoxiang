<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%
	// 获取当前登录用户
	SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);
	SysOrg sysOrg =sysUser.getSysOrg();
	String orgId = sysUser.getOrgId();
	Integer orgLevel = sysUser.getOrgLevel();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<cxt:commonLinks />
<jsp:include page="/pages/gis/common/mapjs.jsp" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/firstPageThree.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/jquery.easypiechart.min.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/js/multiselect/multiple-select.css" type="text/css"/>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/multiselect/multiple-select.js"></script>
<style type="text/css">
.rollBox{width:100%;overflow:hidden;margin:0 auto;}
.rollBox .Cont{width:96%;height:130px;float:left;overflow:hidden;margin:0 auto;padding-top:0px;}
.rollBox .ScrCont{width:10000000px;}
.rollBox .Cont .pic{width:24%;height:130px;float:left;text-align:center;padding:0 10px 5px 10px;border-radius:1px}
.picContent{height:100%;background:#ffffff;}
/* .rollBox .Cont .pic:active{padding:1px solid rgba(6, 172, 210, 1);background-color: rgba(204, 234, 249, 1);} */
*+html .rollBox .Cont .pic{width:24%;float:left;text-align:center;padding-right:30px;}
.rollBox .Cont .pic img{padding:4px;display:block;margin:0 auto;}
.rollBox .Cont .pic p{line-height:26px;color:#505050;}
.rollBox .Cont a:link,.rollBox .Cont a:visited{color:#626466;text-decoration:none;}
.rollBox .Cont a:hover{color:#f00;text-decoration:underline;}
.rollBox #List1,.rollBox #List2{float:left;}
.qustion{
position:relative;
bottom:0px; 
height:74px;
}
.imgU53{
float:right;
position:absolute;
right:5px;
bottom:3px; 
}
.imgU55{
float:right;
position:absolute;
right:11px;
bottom:8px; 
}
.imgControl{
float:left;
margin-top:50px;
margin-right: 5px;
margin-left: 5px;
}
#headerInfo{
background:#f2f2f2;
}
#zhibiaoPanel1{
background:#f2f2f2 !important;
}	

.num{
font-size:20px;
color:#FF0000;
}	
.spanMainTitle{
font-weight:bold;
font-size:20px;
margin-top:25px;}  
.solid{
float:left;
width:1px;
height:30px;
margin-top:15px;
border-right:1px solid #666666;
} 
.zbMainContent{
width:100%;
margin-top:10px;
}
.zbContentLeft{
float:left;
width:46%;
}
.zbContentRight{
float:left;
width:46%;
}
.zbContent span{
font-size:18px;
}
.showQuestion{
float:left;
width:7%;
height:100%;
}
.explain{
display:none;
}

.winwarin{
    position:absolute;
    top:50%;
    left:50%;
    width:200px;
    height:100px;
    margin-top:-50px;
    margin-left:-100px;


/*     border:1px solid red; */
    line-height:30px;
    font-size:16px;
    text-align:center;

    }

 </style>
</head>
<body>
	 <input type="hidden" id="hiddenOrgId" value="" /> 
	 <input type="hidden" id="hiddenOrgLevel" value="" /> 
	<input type="hidden" id="hiddenType" value="" />
	<div id="showMapInfo"></div>
	<!-- 主体页面 start -->
	<div id="mainBody">
		<div id="headerInfo">
			<div id="treeRoadInfo">当前位置：首页</div>
			<div id="statisInfo">
				<input class="form-control date-picker " placeholder="请选择账期" value="" id="statisDateHeader" type="text" />
			</div>
		</div>
		<!-- 左侧树 start -->
		<div id="leftPanel">
			<div class="pull-left infoTree ztree" id="firstInfoTree"></div>
		</div>
		<!-- 左侧树 end -->
		<!-- 右侧内容 start -->
		<div id='rightPanel'>
			<!-- 上部内容 start -->
			<div id="topPanel">
<div id="zhibiaoPanel1">
<div class="rollBox">
      <div class="imgControl">
      <img   class="imgLeft" src="<%=request.getContextPath()%>/pages/images/shqm_left_pic.gif" width="12" height="31" />
      </div>
     <div class="Cont" id="ISL_Cont">
      <div class="ScrCont">
       <div id="List1">
        <!-- 图片列表 begin -->
        <!-- 图片列表 end -->
       </div>
       <div id="List2"></div>
      </div>
     </div>
     <div class="imgControl">
		<img   class="imgRight" src="<%=request.getContextPath()%>/pages/images/shqm_right_pic.gif" width="12" height="31" />
     </div>
   </div>
				</div>
				<div id="importantPanel">
					<div id="countAll">
						<div id="countOne">
							<font class='tjInfo' id='tjInfoOne'>汇总一：</font>
							<span id="numberOne" style="color:chartreuse;font-size: 22px;font-weight: bold;">0</span>
						</div>
						<div id="countOnes">
							<font class='tjInfo' id='tjInfoTwo'>汇总二：</font>
							<span id="numberTwo" style="color:chartreuse;font-size: 22px;font-weight: bold;">0</span>
						</div> 
						<div id="countThree">
							<font class='tjInfo' id='tjInfoThree'>汇总三：</font>
							<span id="numberThree" style="color:chartreuse;font-size: 22px;font-weight: bold;">0</span>
						</div>
					</div>
					<div id="countTwo" style="display: none;">
					</div> 
				</div>
			</div>
			<!-- 上部内容 end -->
			
			<!-- 下部内容 start -->
			<div id="bottomPanel">
				
				<!-- 对标分析 start -->
				<div id="benchmarkingAnalysis">
					<!-- 对标分析三个单选按钮 -->
					<div id="topBenchmarkingAnalysisDiv">
						<div id="topBeanchmarkingAnalysisRadioDiv">
							<span class="topBeanchmarkingAnalysisRadioSpan">
								<button class="firstBtn btn btn-sm btn-linear-blue btn-selected" data="1" id='cityRatio'>地市对标</button>
								<!-- <input name="benchmarkingAnalysisRatio" checked="checked" type="radio" value="1" id="cityRatio" >地市对标  -->
							</span>
							<span class="topBeanchmarkingAnalysisRadioSpan">
								<button class="firstBtn btn btn-sm btn-linear-blue" data="2" id='townRatio'>区县对标</button>
								<!-- <input name="benchmarkingAnalysisRatio" type="radio" value="2" id="townRatio" >区县对标 -->
							</span>
							<span class="topBeanchmarkingAnalysisRadioSpan">
								<button class="firstBtn btn btn-sm btn-linear-blue" data="3" id='gridRatio'>网格对标</button>
								<!-- <input name="benchmarkingAnalysisRatio" type="radio" value="3" id="gridRatio" >网格对标 -->
							</span>
							<span style="float: right; padding-right: 10px;">
								<button class="firstBtn btn btn-sm btn-linear-blue" id='backBtn'>返回</button>
							</span>
						</div>
					</div>
					<!-- 对标分析地市、区县、网格下拉框 -->
					<div id="midBenchmarkingAnalysis">
						<div id="midBenchmarkingAnalysisSelect"></div>
						<div id="midBenchmarkingAnalysisStatisDate">
							<input class="form-control date-picker " placeholder="请选择账期" value="" id="benchmarkingAnalysisStatisDate" type="text" />
						</div>
						<div id="midBenchmarkingAnalysisStatisOrder">
							<select id="orderBenchmarkingAnalysis">
								<option value=''>---请选择排序方式---</option>
								<option value='3'>---前3名---</option>
								<option value='5'>---前5名---</option>
								<option value='10'>---前10名---</option>
								<option value='20'>---前20名---</option>
								<option value='30'>---前30名---</option>
								<option value='50'>---前30名---</option>
								<option value='-3'>---后3名---</option>
								<option value='-5'>---后5名---</option>
								<option value='-10'>---后10名---</option>
								<option value='-20'>---后20名---</option>
								<option value='-30'>---后30名---</option>
								<option value='-50'>---后30名---</option>
							</select>
						</div>
					</div>
					<!-- 对标分析指标比对table -->
					<div id="btmBenchmarkingAnalysis">
						
					</div>
				</div>
				<!-- 对标分析 end -->
			
				<!-- 资源层 start -->
				<div id="resourcePanel">
					<div id="leftBottomPanel">
						<div id="echartInfo"></div>
					</div>
					<div id="rightBottomPanel">
						<div id="map"></div>
					</div>
				</div>
				<!-- 资源层 end -->
				
				<!-- 报表列表 start -->
				<div id="tablePanel">
					<!-- 头部查询条件 start -->
					<div id="topParentConditionDiv">
						<div id="topConditionDiv">
							<!-- 前面5个固定条件 start -->
							<div id="topConditionFiveDiv">
								<select id="city" name="city"></select>
								<select id="town" name="town"></select>
								<select id="grid" name="grid"></select>
								<select id="oneType" name="oneType"></select>
								<select id="twoType" name="twoType"></select>
							</div>
							<!-- 前面5个固定条件 end -->
							<!-- type="org"的条件 start -->
							<div id="topConditionOrgDiv">
								<select id="conditionTwo">
									<option value="day">当日</option>
									<option value="month">当月</option>
								</select>
								<span id="conditionDivFive">
									<%--<label class="conditionLabel">账期：</label>--%>
									<input class="form-control date-picker " placeholder="请选择账期" value="" id="statisDate" type="text" />
								</span>
								<span id="conditionDivSix">
									<input type="text" placeholder="请输入学校名字" value="" id="schoolName" />
								</span>
							</div>
							<!-- type="org"的条件 end -->
							<!-- 自助报表分析条件 start -->
							<div id="topConditionNewOrgDiv">
								<form class="form-horizontal clearfix col-xs-12 col-sm-12 no-padding" role="form" id="selfHelpReportForms">
									
								</form>
							</div>
							<!-- 自助报表分析条件 end -->
							<button class="firstBtn btn btn-sm btn-linear-blue" id='searchBtn'>查询</button>
							<button class="firstBtn btn btn-sm btn-linear-blue" id='importReportBtn'>导出</button>
							<button class="firstBtn btn btn-sm btn-linear-blue" id='queryBackBtn'>返回</button>
							<button class="firstBtn btn btn-sm btn-linear-blue" id='showMap'>显示地图</button>
						</div>
					</div>
					<!-- 头部查询条件 end -->
					<!-- 中间统计汇总 start -->
					<div id="middleFourInfoDiv">
						<div id="jcxx">
							<table id="jcxxTableInfo">
								<tr id="gridTypeInfoTr">
									<td width="110" align="left" onclick="getGridInfoTd('gridCount')">网格数：<span class="zbSpan" id="gridCount">0</span></td>
									<td width="110" align="left" onclick="getGridInfoTd('gridTypeOneCount')">一类网格数：<span class="zbSpan" id="gridTypeOneCount">0</span></td>
									<td width="110" align="left" onclick="getGridInfoTd('gridTypeTwoCount')">二类网格数：<span class="zbSpan" id="gridTypeTwoCount">0</span></td>
									<td width="110" align="left" onclick="getGridInfoTd('gridTypeThreeCount')">三类网格数：<span class="zbSpan" id="gridTypeThreeCount">0</span></td>
								</tr>
								<tr>
									<td width="110" align="left" onclick="getUserInfoTd('directorsCount')">区域总监数：<span class="zbSpan" id="directorsCount">0</span></td>
									<td width="110" align="left" onclick="getUserInfoTd('cdManagerCount')">CD政企经理数：<span class="zbSpan" id="cdManagerCount">0</span></td>
									<td width="110" align="left" onclick="getUserInfoTd('chnlShManagerCount')">社会渠道经理数：<span class="zbSpan" id="chnlShManagerCount">0</span></td>
									<td width="110" align="left" onclick="getUserInfoTd('chnlZxManagerCount')">直销渠道经理数：<span class="zbSpan" id="chnlZxManagerCount">0</span></td>
								</tr>
								<tr>
									<td align="left" onclick="getUserInfoTd('chnlManagerCount')">渠道经理数：<span class="zbSpan" id="chnlManagerCount">0</span></td>
									<td align="left" onclick="getUserInfoTd('directUserCount')">直销人员数：<span class="zbSpan" id="directUserCount">0</span></td>
									<td align="left" onclick="getUserInfoTd('repairUserCount')">装维人员数：<span class="zbSpan" id="repairUserCount">0</span></td>
									<td align="left" onclick="getUserInfoTd('saleManagerCount')">销售经理数：<span class="zbSpan" id="saleManagerCount">0</span></td>
								</tr>
							</table>
						</div>
						<div id="zbxz">
							
						</div>
						<div id="zyxx"></div>
						<div id="yxrw"></div>
					</div>
					<!-- 中间统计汇总 end -->
					<!-- 底部明细列表 start -->
					<div id="bottomDetailDiv">
						<table id="idx_table" data-option="fitColumns: true, scrollbarSize: 0" style="width: 29px; color: #fff; 
							overflow-x: auto; border-collapse: separate; border-spacing: 0px 0px;"></table>
						<div id="idx_grid-pager"></div>
					</div>
					<!-- 底部明细列表 end -->
				</div>
				<!-- 报表列表 end -->
			</div>
			<!-- 下部内容 end -->
		</div>
		<!-- 右侧内容 end -->
	</div>
	<!-- 主体页面 end -->
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
	<div id="title" style="display:none;width:auto;height:auto;background:black;color:white;font-size:18px;position:absolute;z-index:999;opacity:0.6;font-family: '微软雅黑' ;border-radius:3px;">
	
	</div>
	<div id="alertDiv" style="display:none;width:auto;height:auto;background:black;color:white;font-size:18px;position:absolute;z-index:999;opacity:0.6;font-family: '微软雅黑' ;border-radius:3px;">
	
	</div>
	
	  <!--信息提示层-->
<div class="winwarin" id="message_box" style="position:absolute;
/* left:350px;top:160px; */
width:300px;height:200px;
filter:dropshadow(color=#666666,offx=3,offy=3,positive=2);
z-index:1000; visibility:hidden">
<div id= "message" style="border:1px #3fa3ef solid;width:95%; height:95%; background:#fff;  font-size:14px;">
<!-- DIV弹出状态行：标题、关闭按钮 -->
<div style="background:#3fa3ef; height:15%;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:12px; padding:3 5 0 5; color:#fff;" >
<span style="display:inline;width:100px; text-align:left;font-size:140%; float:left; ">指标解释</span>
<div style="display:inline; cursor:pointer" onclick="closeProc()">
<img src='<%=request.getContextPath()%>/pages/images/u150.png' style="float:right;padding:5px;"></div>
</div>
<div style="text-align:center; padding:40px 0 0 0;color:#000000;">
<span id="msg" style="font-size:18px;"></span>
</div>
</div>
</div>
	<script type="text/javascript">
		var nowOrgId = "<%=orgId%>";
		var nowOrgLevel = "<%=orgLevel%>";
	</script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/firstPage/firstPageThree1.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/firstPage/firstPageThreeFirst1.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/firstPage/firstPageThreeJcxx.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/firstPage/firstPageThreeZbxz.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/firstPage/firstPageThreeZbxzXybb.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/firstPage/firstPageThreeZyxx.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/firstPage/firstPageThreeYxrw.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/firstPage/firstPageThreeExport.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/firstPage/firstPageThreeSelfHelpReport.js"></script>
<script language="javascript" type="text/javascript">
<!--//--><![CDATA[//><!--
//图片滚动列表 mengjia 070816
var Speed = 500; //速度(毫秒)
var Space = parseInt(($('.Cont').width()/4).toFixed(0)); //每次移动(px)
var PageWidth = $('.Cont').width()/4; //翻页宽度
var fill = 0; //整体移位
var MoveLock = false;
var MoveTimeObj;
var Comp = 0;
$('.Cont').css('width',Space*4);
$('.pic').css('width',Space);
GetObj("List2").innerHTML = GetObj("List1").innerHTML;
GetObj('ISL_Cont').scrollLeft = fill;
/* GetObj("ISL_Cont").onmouseover = function(){clearInterval(AutoPlayObj);}
GetObj("ISL_Cont").onmouseout = function(){AutoPlay();} */

//AutoPlay();
function GetObj(objName){
	if(document.getElementById){
		return eval('document.getElementById("'+objName+'")')
		}else{
			return eval('document.all.'+objName)
			}
	}
$('.imgLeft').click(function(){
	ISL_ScrUp();
});
$('.imgRight').click(function(){
	ISL_ScrDown();
});

/* function ISL_GoUp(){ //上翻开始
if(MoveLock) return;
	//clearInterval(AutoPlayObj);
	MoveLock = true;
	MoveTimeObj = setInterval('ISL_ScrUp();',Speed);
} */
/* function ISL_StopUp(){ //上翻停止
	//clearInterval(MoveTimeObj);
	if(GetObj('ISL_Cont').scrollLeft % PageWidth - fill != 0){
	Comp = fill - (GetObj('ISL_Cont').scrollLeft % PageWidth);
	CompScr();
	}else{
	MoveLock = false;
	}
} */
function ISL_ScrUp(){ //上翻动作
	debugger;
	if(GetObj('ISL_Cont').scrollLeft <= 0){
		GetObj('ISL_Cont').scrollLeft = GetObj('ISL_Cont').scrollLeft + GetObj('List1').offsetWidth
		}else{
		GetObj('ISL_Cont').scrollLeft -= Space ;
		}
}
/* function ISL_GoDown(){ //下翻
	//clearInterval(MoveTimeObj);
	if(MoveLock) return;
	//clearInterval(AutoPlayObj);
	MoveLock = true;
	ISL_ScrDown();
	MoveTimeObj = setInterval('ISL_ScrDown()',Speed);
} */
/* function ISL_StopDown(){ //下翻停止
	//clearInterval(MoveTimeObj);
	if(GetObj('ISL_Cont').scrollLeft % PageWidth - fill != 0 ){
	Comp = PageWidth - GetObj('ISL_Cont').scrollLeft % PageWidth + fill;
	CompScr();
	}else{
	MoveLock = false;
	}
	//AutoPlay();
} */
function ISL_ScrDown(){ //下翻动作
	if(GetObj('ISL_Cont').scrollLeft >= GetObj('List1').scrollWidth){
		GetObj('ISL_Cont').scrollLeft =GetObj('ISL_Cont').scrollLeft - GetObj('List1').offsetWidth;
	}else{
		GetObj('ISL_Cont').scrollLeft += Space ;	
	}
}
function CompScr(){
	var num;
	if(Comp == 0){MoveLock = false;return;}
	if(Comp < 0){ //上翻
	if(Comp < -Space){
	   Comp += Space;
	   num = Space;
	}else{
	   num = -Comp;
	   Comp = 0;
	}
	GetObj('ISL_Cont').scrollLeft -= num;
	//setTimeout('CompScr()',Speed);
	}else{ //下翻
	if(Comp > Space){
	   Comp -= Space;
	   num = Space;
	}else{
	   num = Comp;
	   Comp = 0;
	}
	GetObj('ISL_Cont').scrollLeft += num;
	//setTimeout('CompScr()',Speed);
	}
}







///////////////////////////////////////////////////////
function winwarin(v)
        {
         message_box.style.visibility='visible';
        //创建灰色背景层
         procbg = document.createElement("div"); 
         procbg.setAttribute("id","mybg");
         procbg.style.margin="0"; 
         procbg.style.overflowX="auto";
         procbg.style.background = "#000"; 
         procbg.style.width = "100%"; 
         procbg.style.height = "100%";
         procbg.style.position = "absolute"; 
         procbg.style.top = "0"; 
         procbg.style.left = "0"; 
         procbg.style.zIndex = "500"; 
         procbg.style.opacity = "0.2"; 
         procbg.style.filter = "Alpha(opacity=20)"; 

         //背景层加入页面
         document.body.appendChild(procbg);
         document.body.style.overflow = "hidden";
 		document.getElementById("msg").innerText=v;//.innerHTML 
        }


        //关闭功能
        function closeProc()
        {
          message_box.style.visibility='hidden';

          procbg.style.visibility = "hidden";

        }




//--><!]]>
</script>
</body>
</html>
