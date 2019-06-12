<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>


  <cxt:commonLinks />

<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<title>折扣折让</title>
 <link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/defineIncome.css" />
<style type="text/css">
	html,body{
		width:100%;
		height:100%;
	}
	 #myTab {
	 background:rgba(0,0,0,0);
	 }
    #myTab li{
	 background:rgba(0,0,0,0);
	 width: 33px;
	 height: 38px;
	 }
  #myTab  li   a, #myTab  .nav-tabs   li   a:focus {
background: url("<%=request.getContextPath()%>/pages/images/nav-tabs-btn_normal.png")  no-repeat left 50%;
border : none;
margin: 0px;
 
}  
#myTab .active   a{
 background: url("<%=request.getContextPath()%>/pages/images/nav-tabs-btn_hover.png")  no-repeat left 50%;
 border : none;
}
#myContent iframe{
 width: 100%;
 height: 99%;
 border: none;
 
}
</style>

</head>
<body >
<div style="width:100%;height:100%;" class="linear"   >

	 <div class="infoDetail tabbable tabs-right"  style="top: 40%;position: absolute;right: 10px;z-index: 10">
		<ul id="myTab" class="nav nav-tabs">
		    <li class="active titles  "  >
		    	<a href="#page1"  title="营销活动效益评估"  data-toggle="tab" >&nbsp;</a>
		    </li>	
		    <li class="titles ">
			    <a href="#page2"  title="投入产出分析" id="tb_p2" data-toggle="tab">&nbsp;</a>
		    </li>
		    <li class="titles ">
			    <a href="#page3"  title="ARPU-MOU-DOU" id="tb_p3"  data-toggle="tab">&nbsp;</a>
		    </li>
		    <li class="titles ">
			    <a href="#page4"  title="活动用户存活率分析" id="tb_p4"  data-toggle="tab">&nbsp;</a>
		    </li>
		    <li class="titles ">
			    <a href="#page5"  title="活动用户潜在流失率分析" id="tb_p5"  data-toggle="tab">&nbsp;</a>
		    </li>
		    <li class="titles ">
			    <a href="#page6"  title="收入预测" id="tb_p6"  data-toggle="tab">&nbsp;</a>
		    </li>
		     
		</ul>
	</div>
	<div   class="tab-content"  id="myContent" style="padding: 0px 50px 0px 10px"  >
			    <div class="tab-pane    active  " id="page1"  >
			    
			     <iframe src="incomeIndex.jsp"></iframe>
			    </div>
			     <div class="tab-pane " id="page2"  >
			    
			     <iframe  id="tb_i2"    ></iframe>
			    </div>
			     <div class="tab-pane " id="page3"  >
			    
			     <iframe  id="tb_i3"  ></iframe>
			    </div>
			     <div class="tab-pane " id="page4"  >
			    
			     <iframe id="tb_i4"   ></iframe>
			    </div>
			     <div class="tab-pane " id="page5"  >
			    
			     <iframe  id="tb_i5"  ></iframe>
			    </div>
			     <div class="tab-pane " id="page6"  >
			    
			     <iframe  id="tb_i6"  ></iframe>
			    </div>
			    
	</div>
	
	  </div>
</body>
 <script type="text/javascript">
 $(function(){
	$("#tb_p2").one("click",function(){
		$("#tb_i2").attr("src","incomeIndex2.jsp");
	});
	$("#tb_p3").one("click",function(){
		$("#tb_i3").attr("src","incomeIndex3.jsp");
	})
	$("#tb_p4").one("click",function(){
		$("#tb_i4").attr("src","incomeIndex4.jsp");
	})
	$("#tb_p5").one("click",function(){
		$("#tb_i5").attr("src","incomeIndex5.jsp");
	})
	$("#tb_p6").one("click",function(){
		$("#tb_i6").attr("src","incomeIndex6.jsp");
	})
	 
 })
 
 </script>
</html>