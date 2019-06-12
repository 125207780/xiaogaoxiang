<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 
  
 
	<div class="mainContent clearfix" style="width: 100%;height:100%;">
	<div class="infoDetail">
		<ul id="myTab" class="nav nav-tabs">
		    <li class="active titles setHeight" value="1">
		    	<a href="#ARP1" chartId="arp_echart1" class="income_a"  data-toggle="tab">ARPU</a>
		    </li>	
		    <li class="titles setHeight">
			    <a href="#ARP2" chartId="arp_echart2"  class="income_a"  data-toggle="tab">MOU</a>
		    </li>
		    <li class="titles setHeight">
			    <a href="#ARP3" chartId="arp_echart3" class="income_a"  data-toggle="tab">DOU</a>
		    </li>
		</ul>
	</div>
	
	<div id="myTabContent" class="tab-content" style="width: 100%;height: 100%" >
			    <div class="tab-pane  in active clearfix" id="ARP1"  style="width: 100%;height:100%">
			    <jsp:include page="/pages/jsp/income/ARP-echart1.jsp"/> 
			    </div>
			    <div class="tab-pane " id="ARP2"   style="width:100%;height: 100%">
			     <jsp:include page="/pages/jsp/income/ARP-echart2.jsp"/>
			    </div>
			      <div class="tab-pane " id="ARP3"  style="width: 100%;height: 100%">
			     <jsp:include page="/pages/jsp/income/ARP-echart3.jsp"/>
			    </div>
			    
	</div>
	</div>
