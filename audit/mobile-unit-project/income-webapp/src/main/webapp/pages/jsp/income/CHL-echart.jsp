<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<style>
	
	 #topwindow101 .modal-dialog{
		width:600px !important;
	} 
	.tab-pane {
		margin-left:29% !important;
	}
	
</style>
<script type="text/javascript">
</script>
	<div class="mainContent clearfix">
	<!-- <div class="infoDetail">
		<ul id="myTab" class="nav nav-tabs">
		    <li class="active titles setHeight" value="1">
		    	<a href="#ARP1" data-toggle="tab">ARPU</a>
		    </li>	
		    <li class="titles setHeight">
			    <a href="#ARP2"   data-toggle="tab">。1</a>
		    </li>
		    <li class="titles setHeight">
			    <a href="#ARP3" data-toggle="tab">DOU</a>
		    </li>
		</ul>
	</div> -->
	<div id="myTabContent" class="tab-content">
			    <div class="tab-pane  in active clearfix" id="ARP1" style="width: 933px;">
			    <jsp:include page="/pages/jsp/income/CHL-echart1.jsp"/> 
			    </div>
			    <div class="tab-pane " id="ARP2" style="width: 933px;">
			     <jsp:include page="/pages/jsp/income/CHL-table2.jsp"/>
			    </div>
			     
			    
	</div>
	</div>
