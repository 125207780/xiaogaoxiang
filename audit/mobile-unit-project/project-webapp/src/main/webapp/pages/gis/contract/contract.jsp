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
<cxt:commonLinks />
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<%-- <link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/contract/contract.css" /> --%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/contract/contractFirstIndex.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/index/dist/echarts.min.js"></script>
<style>
        /* 清样式，如果是项目中，不推荐使用通配符来清样式，建议使用标签清样式，通配符清样式会增加页面压力 */
        *{
            margin:0;
            padding:0;
        }
        /* 宽度为屏宽的一半，高度为屏高的一半，然后居中 */
        .box{
            width:98%;
            height:80%;
            margin:0 auto;
        }
        /* 清除li样式 */
        ul,li{
            list-style: none;
        }
        /* 将ul相对定位，目的是让内容的div绝对定位时相对ul定位，否则会相对body定位 */
        /* ul弹性盒，目的是让li横着排，也可以将li浮动或者转行内块 */
        ul{
            position:relative;
            display:flex;
        }
        /* 将三个li宽度平分，高度60px */
        li{
           /*  flex:1; */
           width:auto;
           height:30px;
        }
        /* input隐藏 */
        .tabInput{
            display:none;
        }
        /* 设置input的下一个节点label的样式 */
        .tabInput+label{
       	    border-radius: 3px; 
            display:block;
            width:100%;
            height:100%;
            background:#fff;
            font-size:18px;
            text-align: center;
            line-height: 30px;
            margin:10px;
            color:#333;
            border:1px;
            cursor:pointer;
        }
        /* 设置div内容的基础样式 隐藏内容div*/
        .tabInput+label+div{
            display:none;
            position: absolute;
            left:0;
            top:40px;
        }
        /* input选中状态时候对应的label的样式 */
        .tabInput:checked+label{
          	border-radius: 3px; 
          /*   background: #0078B3 ; */
            background: linear-gradient(to bottom right, #3E8AF7 , #55BCFC) !important;
            color:#fff;
        }
        /* input选中时候显示对应的div */
        .tabInput:checked+label+div{
            display:block;
        }
        .activeDIV{
        height:600px;
        border:1px solid #009ebc;
        margin:0px 10px;
        width:100%;
        overflow:hidden;
        }
        .left{
        border:1px solid #009ebc;
        width:35%;
        height:80%;
        float:left;
        position:relative;
        margin:10px 5px 10px 10px;
        }
        .right{
         border:1px solid #009ebc;
        width:63%;
        height:80%;
        float:left;
        position:relative;
        margin:10px 0px 10px 5px;
        overflow:hidden;
        }
        .leftTitle{
        width:35%;
        height:30px;
        float:left;
        position:relative;
        margin:10px 5px 10px 10px;
        }
         .rightTitle{
        width:8%;
        height:30px;
        float:left;
        position:relative;
        margin:10px 0px 10px 5px;
        }
        .rightTitle2{
        width:45%;
        height:30px;
        float:right;
        position:relative;
        margin:10px 10px 10px 0px;
        }
        .channel{
        width:50%;
        height:100%;
        float:left;
        position:relative;
        }
        .community{
        width:50%;
        height:100%;
        float:left;
        position:relative;
        }
    </style>

</head>
<body>
<div class="box">
        <ul>
            <li>
                <input type="radio" name="check" id="active1"  class="tabInput" checked><label for="active1">包保统计</label>
                <div class="activeDIV">
            	<div class="leftTitle">
               	  <h3>图例</h3>
                </div>
                <div class="rightTitle">             
               	  <h3>统计</h3>
                </div>
                <div class="rightTitle2"> 
              	  <div style="margin-top:20px;width:468px;float:right;">    
	                <div class="conditionDiv">
						<font>地市：</font>
						<select id="city1"></select>
					</div>
					<div class="conditionDiv">
						<font>区县：</font>
						<select id="cnty1"></select>
					</div>
					<!-- <div class="conditionDiv">
						<font>网格：</font>
						<select id="grid1"></select>
					</div> -->
					<div class="conditionDiv">
						<button class="firstBtn btn btn-sm btn-linear-blue" id='contractAnalysisSearch'>查询</button>
		               	<button class="firstBtn btn btn-sm btn-linear-blue" id='contractAnalysisExport'>导出</button>
					</div>
				</div>
                </div>
                <div class="left">
                <div class="channel" id="channel">
                </div>
                <div class="community" id="community">
                </div>
                </div>
                <div class="right">
	               	<table id="idx_table1"></table>
					<div id="idx_grid-pager1"></div>
                </div>
                </div>
            </li>
            <li>
                <input type="radio" name="check" id="active2" class="tabInput"><label for="active2">小区包保</label>
                <div class="activeDIV">
         <%--  <div id="middleDiv">
		   <div id="importFileDiv">
			<form target="uploadFrame" id="upformContract" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/contract/uploadContractInfo" method="post">
				<div class="form-group">
					<div class="col-xs-12">
						<input type="file" id="contractFileDir" name="contractFileDir"/>
					</div>
				</div>
			</form>
			<button class="firstBtn btn btn-sm btn-linear-blue" id='uploadModel'>导入</button>
		</div>
		<div id="exportFileDiv">
			<button class="firstBtn btn btn-sm btn-linear-blue" id='downloadModel'>模板下载</button>
			<button class="firstBtn btn btn-sm btn-linear-blue" id='exportContractInfo'>导出包保明细</button>
		</div>
	</div> --%>
	<div id="bottomDiv">
		<div id="bottomConditionDiv">
			<div>
				<div class="conditionDiv">
					<font>地市：</font>
					<select id="city"></select>
				</div>
				<div class="conditionDiv">
					<font>区县：</font>
					<select id="cnty"></select>
				</div>
				<div class="conditionDiv">
					<font>网格：</font>
					<select id="grid"></select>
				</div>
				<div class="conditionDiv">
					<font>渠道名称：</font>
					<input type="text" placeholder="请输入渠道名称" id="channelName" />
				</div>
				<div class="conditionDiv">
					<font>小区名称：</font>
					<input type="text" placeholder="请输入小区名称" id="communityName" />
				</div>
				<div class="conditionDiv">
					<button class="firstBtn btn btn-sm btn-linear-blue" id='search'>查询</button>
					<button class="firstBtn btn btn-sm btn-linear-blue" id='exportContractDetail'>导出</button>
				</div>
			</div>
		</div>
		<div id="bottomListDiv">
			<table id="idx_table"></table>
			<div id="idx_grid-pager"></div>
		</div>
	</div></div>
            </li>
        </ul>
    </div>

</body>
<script type="text/javascript">
	var nowOrgId = "<%=orgId%>";
	var nowOrgLevel = "<%=orgLevel%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/contract/contract.js"></script>
</html>