<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
   
 
	<div class="mainContent clearfix" style="width: 100%;height:100%;">
	<div class="infoDetail">
		<ul id="myTab" class="nav nav-tabs">
		    <li class="active titles setHeight" value="1">
		    	<a href="#FX1" chartId="fx_echart1" class="income_a"  data-toggle="tab">潜在流失用户订购存活度</a>
		    </li>	
		    <li class="titles setHeight">
			    <a href="#FX2" chartId="fx_echart3"  class="income_a"  data-toggle="tab">订购后流失分析</a>
		    </li>
		</ul>
	</div>
	
	<div id="myTabContent" class="tab-content" style="width: 100%;height:100%;" >
			    <div class="tab-pane  in active clearfix" id="FX1" style="width: 100%;height: 100%">
			    <jsp:include page="/pages/jsp/income/FX-echart1.jsp"/> 
			    </div>
			    <div class="tab-pane " id="FX2" style="width: 100%;height: 100%">
			     <jsp:include page="/pages/jsp/income/FX-echart3.jsp"/>
			    </div>
			    
			    
	</div>
	</div>
