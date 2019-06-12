<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
   <div id="myCarousel" class="carousel slide" data-interval=false>
					<!-- 轮播（Carousel）指标 -->
					<ol class="carousel-indicators">
						<li data-target="#myCarousel" data-slide-to="0" class="active" style="margin-bottom: -123px;"></li>
						<li data-target="#myCarousel" data-slide-to="1" style="margin-bottom: -123px; "></li>
					</ol>   
					<!-- 轮播（Carousel）项目 -->
					<div class="carousel-inner" style="height: 500px">
						<div class="item active">
						 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						 <div style="margin-top:20px; height: 457px;border: 1px solid;color:#00E1FD">
			                <div id="type" style="width:50%; float:left">
				                <div class="view-title" style="margin-bottom: -20px; margin-top: -10px;margin-left:167px;">
									基础单元大类
									<div class="myOrners myOrner1"></div>
									<div class="myOrners myOrner2"></div>
									<div class="myOrners myOrner3"></div>
									<div class="myOrners myOrner4"></div>
								</div>
				               <!--  <div class="chartTitle" style="margin-top: 1px;">
			    				基础单元大类
			    				</div> -->
			    				<div id="typeInfo" style="width: 400px;height: 400px;margin-left: 30px;padding-top:23px;" >
			    			
			    				</div>
		    				</div>
		    				<div id="typeRatioInfo" style="width:50%; float:right">
			    				 <div class="view-title" id="Export" style=" margin-left: 79px;margin-top: -10px;">
									 基础单元小类
									<div class="myOrners myOrner1"></div>
									<div class="myOrners myOrner2"></div>
									<div class="myOrners myOrner3"></div>
									<div class="myOrners myOrner4"></div>
								 </div>
				               <!--  <div class="chartTitle" style="margin-top:4px;">
			    				基础单元小类
			    				</div> -->
			    				<div class="kpi-select" style="margin-top: 23px;">
									<span style="color:#ffffff !important">类型：</span>
									<select class="typeSelect" id="bigTypeSelect" style="width:90px">
									</select>
								</div>
			    				<div id="typeRatioInfo1" style="width: 550px;height: 400px;margin-left: -71px" >
			    			
			    				</div>
		    				</div>
		    			 </div>
						</div>
						<div class="item">
							 <div class="grid-search-div" style="margin-left: 1%;margin-top: 7px;"> 
	               				<font color=#FFFFFF>一级类型:</font>
	               				<select  style="width:90px" size="small" id="firstTypeInfo" onchange="secondType()" >
	               				</select>
	            			</div>
				       		<div class="grid-search-div" style="margin-left:20%;margin-top: -38px;"> 
				                <font color=#FFFFFF>二级类型:</font>
				                <select  style="width:90px" size="small" id="secondTypeInfo">
				               	<option>请选择...</option>	
				               </select>
				            </div>
		    				<div class="grid-search-div" id="gridSearch" style="margin-left: 373px;margin-top: -40px;">
								<input type="text" placeholder="查询" class="searchField input-md" id="physicalGridName" name="physicalGridName" style="height: 29px;">
								<button class="btn btn-primary" type="button" id="searchBasicUnitList">查询</button>
							</div>
							<div class="grid-search-div" id="gridExport" style="margin-left: 582px;margin-top: -42px;">
								<button class="btn btn-primary" type="button" id="exportBasicUnitList">导出</button>
							</div>
				    		<div class="grid">
					            <table id="userListGrid"></table>
					            <div id="grid-pager1"></div> 
				        	</div>
				        </div>
					</div>
				</div>
				<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/gridInfo/gridInfoUserList.js"></script>