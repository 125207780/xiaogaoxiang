<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 
	<div class="mainContent clearfix" style="width: 100%;height:100%;">
		<div class="infoDetail">
			<ul id="myTab" class="nav nav-tabs">
			    <li class="active titles setHeight" value="1" id=myTable1>
			    	<a href="#Month_AddCostAndRevenue"  chartId="nue_echart1" class="income_a" data-toggle="tab">当月新增订购成本与收入</a>
			    </li>	
			    <li class="titles setHeight">
				    <a href="#Month_AddCostAndRevenueBar"  chartId="nue_echart2" class="income_a" data-toggle="tab">当月月总成本与收入</a>
			    </li>
			</ul>
		</div>
		<div id="myTabContent" class="tab-content" style="width: 100%;height: 100%" >
		    <div class="tab-pane  in active clearfix" id="Month_AddCostAndRevenue" style="width: 100%;height: 100%">
		    	<jsp:include page="/pages/jsp/income/nue-echart1.jsp"/> 
		    </div>
		    <div class="tab-pane " id="Month_AddCostAndRevenueBar" style="width: 100%;height: 100%;">
		     	<jsp:include page="/pages/jsp/income/nue-echart2.jsp"/>
		    </div>
		</div>
	</div>
	
	
 
