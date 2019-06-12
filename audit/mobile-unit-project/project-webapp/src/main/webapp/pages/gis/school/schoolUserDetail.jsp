<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Title</title>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/datepicker.css">
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.zh-CN.min.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/daterangepicker.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/moment.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
    <style>
        html,body{
            height: 100%;
            width:100%;
        }
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
            position: absolute;
            left: 27%;
            top: 22%;
        }
        #person img{
            height: 100%;
            width: 100%;
        }
        #person span{
            position: absolute;
            font-size: 1.5em ;
            color: #ffb3a7;
            left: 30%;
            top: 59%;
            -webkit-text-stroke: 1.5px red;
        }
       #pp .ele{
            border: 2px solid #632523;
            height: 19%;
            width:28%;
            border-radius:51%;
            box-shadow: 10px 10px 5px #888888;
        }
       #pp .ele span{
            position: absolute;
            left: 16%;
            top: 19%;
            font-size: 1rem;
            color: #3d3b4f;
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
            position: absolute;
            left: 4%;
            top: 15%;
            background-color: #4f81bd;
           /*  background: radial-gradient(#00101d, #094778, #00101d); */
        }
        #img2{
            position: absolute;
            left: 32%;
            top: 2%;
            background-color: #632523;
           /*  background: radial-gradient(#e3f9fd, #815463, #632523); */
        }
        #img3{
            position: absolute;
            right: 10%;
            top: 15%;
            background-color: #8064a2;
           /*  background: radial-gradient(#e3f9fd, #cca4e3, #8064a2); */
        }
        #img4{
            position: absolute;
            right: 8%;
            top: 37%;
             background-color: #000;
           /*  background: radial-gradient(#e3f9fd, #665757, #000000); */
        }
        #img5{
            position: absolute;
            right: 8%;
            bottom:22%;
            background-color: #ffff00;
           /*  background: radial-gradient(#e3f9fd, #ffb61e, #ffff00); */
        }
        #img6{
            position: absolute;
            left: 69%;
            bottom: 13%;
            background-color: #262626;
           /*  background: radial-gradient(#e3f9fd, #edd1d8, #ef7a82); */
        }
        #img7{
            position: absolute;
            left: 44%;
            bottom:4%;
            background-color: #1f497d;
          /*   background: radial-gradient(#e3f9fd, #6b6882, #1f497d); */
        }
        #img8{
            position: absolute;
            top: 36%;
            left: -1%;
            background-color: #c0504d;
           /*  background: radial-gradient(#e3f9fd, #a88462, #c0504d); */
        }
        #img9{
            position: absolute;
            left: -2%;
            top: 58%;
            background-color: #f79646;
            /* background: radial-gradient(#e3f9fd, #c89b40, #f79646); */
        }
        #img10{
            position: absolute;
            bottom: 6%;
            left: 19%;
            background-color: #9bbb59;
           /*  background: radial-gradient(#e3f9fd, #bce672, #9bbb59); */
        }
       #pp .left{
            width: 49%;
		    height: 76%;
		    float: left;
		    position: absolute;
		    top: 66px;
        }
       #pp .page{
            position: absolute;
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
    </style>

</head>
<body>
    <div style="height: 100%;width: 100%;" id="pp">
       <div class="grid-search-div clearfix no-padding">
            <div class="pull-left">
            <input type="hidden" id="sud_schoolId">
               <font color=#FFFFFF> 合约类型：</font>
               <select  style="width:80px" size="small" id="contractType">
               </select>
            </div>
            <!--  <div>
               <font color=#FFFFFF> 账期：</font>
           		<input type="text" class="form-control" id="AccountPeriod"  placeholder="请输入日期" style="width: 89%" data-date-format="yyyy-mm" >
            </div> -->
            <div class="pull-left" style="margin-left: 10px;">
                <font color=#FFFFFF>存量/新增：</font>
               <select  style="width:80px" size="small" id="stockAdditions">
               </select>
            </div>
            <!--<br>-->
            <div class="pull-left" style="margin-left: 10px;">
                <font color=#FFFFFF>APP偏好：</font>
               <select  style="width:80px" size="small" id="APPFiling">
               </select>
            </div>
            <div class="pull-left" style="margin-left: 10px;">
                <font color=#FFFFFF>ARPU分档（折让后的）：</font>
               <select  style="width:80px" size="small" id="incomeFiling">
               </select>
            </div>
            <!-- <div class="pull-left" style="margin-left: 25px;">
                <font color=#FFFFFF>套餐分档：</font>
               <select  style="width:80px" size="small" id="taocanFiling">
               </select>
            </div> -->
         </div>
       <div class="grid-search-div clearfix no-padding">
            <div class="pull-left" style="margin-top: 7px;">
               <font color=#FFFFFF> 流量分档：</font>
               <select  style="width:80px" size="small" id="flowFiling">
               </select>
            </div>
            <div class="pull-left" style="margin-left: 14px;margin-top: 7px;">
                <font color=#FFFFFF>语音喜好：</font>
               <select  style="width:80px" size="small" id="phoneticFiling">
               </select>
            </div>
             <div class="pull-left" style="margin-left:8px;margin-top: 7px;"> 
               <font color=#FFFFFF> 账&nbsp;&nbsp;&nbsp;&nbsp;期：</font>
           		<input type="text" class="form-control" id="AccountPeriod"  placeholder="请输入日期" style="width: 45%;top: -20px;left: 76px;height:25px;" data-date-format="yyyy-mm" >
            </div>
            <div class="pull-left" style="margin-left: -23px; margin-top: 7px">
                <font color=#FFFFFF>套餐分档：</font>
               <select  style="width:80px" size="small" id="taocanFiling">
               </select>
            </div>
            <div style="width:auto;top: 10%;right: 18%;position: absolute;">
            	<button class="btn btn-primary" id="searchList">查询</button>
            </div>
             <div style="width:auto;top: 10%;right: 11%;position: absolute;">
            	<button class="btn btn-primary" id="reset">重置</button>
            </div>
            <div style="width:auto;top: 10%;right: 4%;position: absolute;">
            	<button class="btn btn-primary" id="export">导出</button>
            </div>
            
        </div>
        <div class="left">
            <table id="schoolUserDetailListGrid"></table>
	         <div id="schoolUserDetailListPagers"></div> 
        </div>
        <div class="right" >
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
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/schoolUserDetail.js"></script>
</html>