 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript"></script>
<%
	String uid =request.getParameter("uid");
%>
  <link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
  <link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/datepicker.css">
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.zh-CN.min.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/daterangepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/moment.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datetimepicker.js"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/gridSchoolInfo.js"></script>
<style>

.channelBaseInfo{
	padding:0 30px;
}
.YWBL{
 	padding:0 30px;
	width:100%;
}
.ARPU{
	padding:0 30px;
	width:100%;
}
.YHHX{
	padding:0 0px;
	width:100%;
	height:400px;
	margin-left:0px;
	color:#fff;
	overflow:hidden;
}
 .YHHXTableDiv{
	margin-top:50px;
} 
.gridSchoolInfoL{
	width:50%;
	float:left;
}
.gridSchoolInfoR{
	width:50%;
	float:left;
	height:300px;
	text-align:center;
}
.YHFZQK{
 	padding:0 30px;
	width:100%;
}
#gridSchoolYWBLEchart{
	width:400px;
	top:20px;
	height:500px;
}
#gridSchoolYHFZQKIEchart{
	width:400px;
	height:400px;
}
#gridSchoolARPUEchart{
	width:400px;
	top:20px;
	height:500px;
}
.channelBaseInfo, .channelBaseInfoList{
	margin:0px;
	list-style:none;
}
.channelBaseInfoDiv{
	float:left;
	width:48%;
	height: 42px;
	line-height: 43px;
	margin-left: 2%;
	position: relative;
	display: inline-block;
	vertical-align: top;
}
.gridSchoolDiv{
	float:left;
	width:100%;
	height: 42px;
	line-height: 43px;
	position: relative;
	display: inline-block;
	vertical-align: top;
}
.gridSchool{
	float:left;
	text-align:left;
	color:#fff;
	width: 33.3%;
}
.channelBaseInfoDiv1 .channelBaseInfoL, .channelBaseInfoDiv1 .channelBaseInfoR{
	float:left;
}
.channelBaseInfo{
	padding:0 30px;
}
.channelBaseInfoL{
	float:left;
	text-align:left;
	color:#fff;
	width: 140px;
}
.channelBaseInfoR{
	float:left;
	text-align:left;
	color:#0ab8b6;
	font-size:15px;
	width:229px;
	height: 42px;
	word-break:keep-all;/* 不换行 */
	white-space:nowrap;/* 不换行 */
	overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
	text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden一起使用。*/
}
.nav-tabs > li:hover{
	background: url(../../images/gis/tabBg.png) repeat !important;
}

.tableListUl .tableLis:hover,.tableListUl .tableLis:hover div{
	backgorund: none !important;
}
 .table.table-bordered td{
	border: 1px solid #00E1FD;
	color: #fff;
	text-align:center;
}
.table.table-bordered th,.table.table-bordered thead{
	color: #fff;
	background: #1C374C;
	border: 1px solid #00E1FD;
	text-align:center;
} 

.fun{
	position: absolute;
    right: -5px;
    bottom: 5px;
}

.ui-jqgrid {
	position: relative
}
.ui-jqgrid .ui-jqgrid-view {
	position: relative;
	left: 0;
	top: 0;
	padding: .0em;
	font-size: 11px
}

.ui-jqgrid {
	position: relative
}

.ui-jqgrid .ui-jqgrid-view {
	position: relative;
	left: 0;
	top: 0;
	padding: .0em;
	font-size: 11px
}

.ui-jqgrid .ui-jqgrid-titlebar {
	padding: .3em .2em .2em .3em;
	position: relative;
	border-left: 0 none;
	border-right: 0 none;
	border-top: 0 none
}

.ui-jqgrid .ui-jqgrid-title {
	float: left;
	margin: .1em 0 .2em
}

.ui-jqgrid .ui-jqgrid-hdiv {
	position: relative;
	margin: 0;
	padding: 0;
	background-color: #3DB9EF;
	overflow-x: hidden;
	border-left: 0 none !important;
	border-top: 0 none !important;
	border-right: 0 none !important
}

.ui-jqgrid .ui-jqgrid-bdiv {
	position: relative;
	margin: 0;
	padding: 0;
	overflow: auto;
	text-align: left
}

.ui-jqgrid .ui-jqgrid-btable {
	table-layout: fixed;
	margin: 0;
	outline-style: none
}


.ui-jqgrid tr.ui-row-ltr td {
	text-align: left;
	border-right-width: 1px;
	border-right-color: inherit;
	border-right-style: solid
}

.ui-jqgrid tr.ui-row-rtl td {
	text-align: right;
	border-left-width: 1px;
	border-left-color: inherit;
	border-left-style: solid
}

.ui-jqgrid .ui-jqgrid-pager {
	border-left: 0 none !important;
	border-right: 0 none !important;
	border-bottom: 0 none !important;
	margin: 0 !important;
	padding: 0 !important;
	position: relative;
	height: 25px;
	white-space: nowrap;
	overflow: hidden;
	font-size: 11px
}
.ui-jqgrid tr.ui-row-ltr td, .ui-jqgrid tr.ui-row-rtl td {
    border-color: #ddd !important;
    color: #fff !important;
}
.ui-jqgrid-btable .ui-widget-content.ui-state-highlight {
    background: #ccc !important;
}
#YHHXTablegrid-pager{
	height: 50px;
	margin-top:100px;
}

	table{
		width:50%;
	}
	#table1{
		width:100%;
	}
	#table1 tr td{		
		font-size:15px;
		padding-top:6px;
		color:#fff;
		width:50%;
		text-align:left;
	}
	#table4 tr td{		
		font-size:15px;
		padding-top:25px;
		color:#fff;
		width:33%;
		text-align:left;
	}
	#filterTable tr td,#table3 tr td{		
		font-size:15px;
		padding-top:3px;
		color:#0ab8b6;
		width:33%;
		text-align:left;
	}
	#table1 tr td:first-child,#filterTable tr td:first-child,#table3 tr td:first-child,
	#table4 tr td:first-child{
		color:#fff;
	}
	#chart1{
		position: absolute;
		width: 50%;
	    height: 100%;
	    right: 0;
	    top: 0;
	}
	#filterEchart{
		width: 100%;
    	height: 74%;
	}
	#chart2{
		position: absolute;
	    top: 0;
	    right: 0;
	    width: 50%;
	    height: 100%;
	}
	#newEchart{
		width: 100%;
    	height: 73%;
	}
	#chart3{
		position: absolute;
	    width: 50%;
	    height: 100%;
	    top: 0;
	    right: 0;
	}
	#useEchart{
		width: 100%;
    	height: 79%;
	}
	/*  #person{
            height: 64%;
            width: 59%;
            position: absolute;
            left: 44%;
            top: 45%;
        }
        #person img{
            height: 68%;
            width: 37%;
        } */
        #pp .right{
            width: 50%;
            height: 76%;
            float: right;
            position: relative;
            margin-top: -1.5%;
        }
        #person{
            height: 56%;
            width: 39%;
            position: relative;
            left: 27%;
            top: 22%;
        }
        #person img{
            height: 100%;
            width: 100%;
        }
        .person span{
            position: relative;
            font-size: 1.5em ;
            color: #ffb3a7;
            left: 8%;
            top: -39%;
            -webkit-text-stroke: 1.5px red;
        }
       .gridSchoolInfoR .ele{
            border: 2px solid #632523;
            height: 19%;
            width:28%;
            border-radius:51%;
            box-shadow: 10px 10px 5px #888888;
        }
      
       .gridSchoolInfoR.ele span{
            position: relative;
            left: 16%;
            top: 19%;
            font-size: 1rem;
            
        }
       #pp .top{
            width: 100%;
            height: 20%;
            /* padding: 0.8%; */
        }
       #pp .top>div{
            width: 11.5%;
            height: 50%;
            float: left;
        }
        #img1 {
            position: relative;
            left: 4%;
            top: -43%;
            background-color: #4f81bd;
            border-radius: 50%；
           /*  background: radial-gradient(#00101d, #094778, #00101d); */
        }
        #img2{
            position: relative;
            left: 33%;
            top: -72%;
            background-color: #632523;
             border-radius: 50%；
           /*  background: radial-gradient(#e3f9fd, #815463, #632523); */
        }
        #img3{
            position: relative;
            right: -61%;
            top: -79%;
            background-color: #8064a2;
             border-radius: 50%；
           /*  background: radial-gradient(#e3f9fd, #cca4e3, #8064a2); */
        }
        #img4{
            position: relative;
            right: -66%;
            top: -75%;
             background-color: #000;
              border-radius: 50%；
           /*  background: radial-gradient(#e3f9fd, #665757, #000000); */
        }
        #img5{
            position: relative;
            right: -68%;
            bottom:71%;
            background-color: #ffff00;
             border-radius: 50%；
           /*  background: radial-gradient(#e3f9fd, #ffb61e, #ffff00); */
        }
        #img6{
            position: relative;
            left: 69%;
            bottom: 13%;
            background-color: #262626;
             border-radius: 50%；
           /*  background: radial-gradient(#e3f9fd, #edd1d8, #ef7a82); */
        }
        #img7{
            position: relative;
            left: 44%;
            bottom:4%;
            background-color: #1f497d;
             border-radius: 50%；
          /*   background: radial-gradient(#e3f9fd, #6b6882, #1f497d); */
        }
        #img8{
            position: relative;
            top: -114%;
            left: -1%;
            background-color: #c0504d;
             border-radius: 50%；
           /*  background: radial-gradient(#e3f9fd, #a88462, #c0504d); */
        }
        #img9{
            position: relative;
            left: -3%;
            top: -108%;
            background-color: #f79646;
             border-radius: 50%；
            /* background: radial-gradient(#e3f9fd, #c89b40, #f79646); */
        }
        #img10{
            position: relative;
            bottom: 6%;
            left: 19%;
            background-color: #9bbb59;
             border-radius: 50%；
           /*  background: radial-gradient(#e3f9fd, #bce672, #9bbb59); */
        }
       #pp .left{
            width: 49%;
		    height: 76%;
		    float: left;
		    position: relative;
		    top: 66px;
        }
       #pp .page{
            position: relative;
            bottom: 5%;
            width: 38%;
            text-align: center;
        }
      #pp  #gbox_schoolUserDetailListGrid,#gview_schoolUserDetailListGrid,
        #schoolUserDetailListPagers,.ui-jqgrid-bdiv{
        	width:96% !important;
        }
       #pp #schoolUserDetailListPagers_center{
        	width:80%;
        }
        /* input[type="text"]:not(.ui-pg-input){
		    width: 80px;
		    height: 26px;
		    border-radius: 3px !important;
		    padding-right: 23px;
        } */
        
       #pp .ivu-input-icon {
		    width: 32px;
		    height: 32px;
		    line-height: 32px;
		    font-size: 16px;
		    text-align: center;
		    color: #808695;
		    position: absolute;
		    right: 114px;
		    z-index: 100;
		    bottom: -2px;
		    x: 3;
		}
		#pp .ui-jqgrid-bdiv{
		overflow:  hidden;
		}
		
		#pp .ui-jqgrid-htable>thead>tr{
			background-color:#014e83 !important;
		}
		#myCarousel{
			width: 100%;
		}
		#myCarousel .carousel-inner{
			width: 100%;
   			height: 100%;
		}
		#myCarousel .carousel-inner .active{
			width:100%;
			height:100%;
		}
		.table-condensed {
			width: 100% !important;		
		}
		.multiselect-container {
			height: 200px;
    		overflow-y: auto;
		}
		.dropdown-toggle{
			height:32px;
		}
		
</style>

	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/gridInfo.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>

	<%
	String gridCode = request.getParameter("gridCode");
	String channelCode = request.getParameter("channelCode");
    %>
<script type="text/javascript">
     var dtl_gridCode="<%=gridCode%>";
     var dtl_channelCode="<%=channelCode%>";
	
</script>
 
 <div class="infoDetail1" id="" >
		<ul id="myTab" class="nav nav-tabs">
		    <li class="active titles setHeight" value="1">
		    	<a href="#gridInfo" data-toggle="tab">校园信息</a>
		    	<!-- <div class="tanBg2"></div> -->
		    </li>
		    
		    <li class="titles setHeight">
			    <a href="#gridSchoolYWBLInfo"   data-toggle="tab">业务办理情况</a>
			    <!-- <div class="tanBg2"></div> -->
		    </li>
		    <li class="titles setHeight">
			    <a href="#gridSchoolYHFZQKInfo"   data-toggle="tab">新用户发展情况</a>
			    <!-- <div class="tanBg2"></div> -->
		    </li>
		     <li class="titles setHeight">
			    <a href="#gridSchoolARPUInfo"   data-toggle="tab">用户ARPU信息</a>
			    <!-- <div class="tanBg2"></div> -->
		    </li>
		      <li class="titles setHeight">
			    <a href="#gridSchoolYHHXInfo"   data-toggle="tab">校园用户画像</a>
			    <!-- <div class="tanBg2"></div> -->
		    </li>
		    
		    
		</ul>
		<div class="infoLists">
			<div id="myTabContent" class="tab-content">
			    <div class="tab-pane clearfix in active" id="gridInfo">
			    	<ul class="channelBaseInfo clearfix">
				<li class="channelBaseInfoList clearfix">
				<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">地市编码：</div>
						<div id="AREA_ID" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div id="sch_id" class="channelBaseInfoL" style="display: none"><%=uid %></div>
						<div class="channelBaseInfoL">地市名称：</div>
						<div id="AREA_NAME" class="channelBaseInfoR"></div>
					</div>
					
				</li>
				<li class="channelBaseInfoList clearfix">
				<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">学校标识：</div>
						<div id="SCH_ID" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">学校名称 ：</div>
						<div id="SCH_NAME" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
				    <div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">学校主页：</div>
						<div id="SCH_WEB_ADDR" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">办学层次：</div>
						<div id="SCH_LEVEL" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">学生人数：</div>
						<div id="SCH_USER" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">新生人数：</div>
						<div id="NEW_SCH_USER" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">教职工人数：</div>
						<div id="TEACH_WORKS" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">移动市场占有率：</div>
						<div id="CMCC_PERCNT" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">学校类型：</div>
						<div id="TYPE_NAME" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">学校归属：</div>
						<div id="SCH_PROPERTY" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">主管单位：</div>
						<div id="SCH_COMPETENT_ORG" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">学校编码：</div>
						<div id="CMCC_SCH_ID" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">CMCC运营公司标识：</div>
						<div id="CMCC_AREA_ID" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">CMCC运营公司名称：</div>
						<div id="CMCC_AREA_NAME" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">办学层次编码：</div>
						<div id="SCH_LEVEL_ID" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">学校地址：</div>
						<div id="SCH_ADDR" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">是否重点院校：</div>
						<div id="IF_KEY_SCH" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">经度：</div>
						<div id="SCH_LONGTITUDE" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">纬度：</div>
						<div id="SCH_LATITUDE" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">注释：</div>
						<div id="REMARK" class="channelBaseInfoR"></div>
					</div>
				</li>
			</ul>
			    </div>
			    <div class="tab-pane clearfix" id="gridSchoolYWBLInfo" >
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
			  
			     		
			     		</div>
			    	    <div class="tab-pane clearfix" id="gridSchoolYHFZQKInfo" >	
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
			   
			     	
			    </div>
			      <div class="tab-pane clearfix" id="gridSchoolYHHXInfo" >	
			     
	    <div class="YHHX">
			 	  <div>
			      合约类型：<select style="width:110px;" id="contractType">
								     	<option value="1">
								     	请选择...
								     	</option>
				     			</select>
			    存量/新增：<select style="width:110px;" id="stockAdditions">
						     	<option value="1">
						     	请选择...
						     	</option>
			     			</select>
			 		
			    APP偏好：<select style="width:110px;" id="APPFiling">
						     	<option value="1">
						     	请选择...
						     	</option>
			     			</select>
			     			  流量分档：<select style="width:110px;" id="flowFiling">
						     	<option value="1">
						     	请选择...
						     	</option>
			     			</select> 	 
			    </div>
			    <div style="margin-top:10px;">
			  
			  语音喜好：<select style="width:110px;" id="phoneticFiling">
						     	<option value="1">
						     	请选择...
						     	</option>
			     			</select> 
			 
			套餐分档：<select style="width:110px;" id="taocanFiling">
						     	<option value="1">
						     	请选择...
						     	</option>
			     			</select>
			     			   账期：<input  value=""  id="dv_date"  style="width:110px;" type="text" />
		    ARPU分档(剔除折让后)：<select style="width:110px;" id="incomeFiling">
								     	<option value="1">
								     	请选择...
								     	</option>
			     					  </select>
			     		</div> 
			    <div style="margin-top:10px;float:right;">
			
			     			
			    <button class="btn btn-primary" type="button" id="searchList">查询</button>
				<button class="btn btn-primary" type="button" id="reset">重置</button>
				<button class="btn btn-primary" type="button" id="export">导出</button>
			    </div>
			                
			     	
			     		
			     	
			     
				<div class="gridSchoolInfoL">
				<div class="YHHXTableDiv">
				<table id="YHHXTable" data-option="fitColumns: true, scrollbarSize: 0" style="width: 29px; color: #fff; 
						overflow-x: auto; border-collapse: separate; border-spacing: 0px 0px;"></table>
					<div id="YHHXTablegrid-pager"></div>
				 </div>
				</div>
				<div class="gridSchoolInfoR">
				
			       <div id="person">
                <img src="<%=request.getContextPath()%>/pages/images/person.png">
                <span>who he is?</span>
            </div>
            <div id="img1" class="ele" ><span id="SEX">性别：男</span></div>
            <div id="img2" class="ele" ><span id ="SCH_NAME">在长沙中南大学就读</span></div>
            <div id="img3" class="ele" ><span id="ARPU">月均ARPU值为58元</span></div>
            <div id="img4" class="ele" ><span id ="DOU">使用流量较高5G左右</span></div>
            <div id="img5" class="ele" ><span id ="MOU">通话时长</span></div>
            <div id="img8" class="ele" ><span id="AGE">年龄：22</span></div>
            <div id="img9" class="ele" ><span id ="TERM_INFO">终端偏好：苹果6S</span></div> 
        </div>
				
				
 				</div> 
 				<%--  <jsp:include page="schoolUserDetail.jsp" ></jsp:include>  --%>
 				 </div> 
			  
			     <div class="tab-pane clearfix" id="gridSchoolARPUInfo" >	
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
				<td>校园用户ARPU(除折让后)</td>
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
			    </div>
			   
			</div>
		</div>
	</div>
	