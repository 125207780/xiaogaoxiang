<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

				<div class="gridInfo1">
			    		<div class="tableList clearfix">
			    			<div class="tableListTitle">
			    				基本信息
			    			</div>
			    			<ul class="tableListUl clearfix">
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">网格名称：</div>
			    					<div class="tableLisRight hiddenText" id="gridName"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">网格类型：</div>
			    					<div class="tableLisRight hiddenText" id="gridType"></div>
			    				</li>
			    				<!-- <li class="tableLis">
			    					<div class="tableLisLeft hiddenText">所属营业部：</div>
			    					<div class="tableLisRight hiddenText" id="saleDeptName"></div>
			    				</li> -->
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">管理人员：</div>
			    					<a href="#">
			    						<div class="tableLisRight hiddenText" id="gridManagement">详细信息</div>
			    					</a>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">集团客户数：</div>
			    					<div class="tableLisRight hiddenText" id="groupNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">网格用户数：</div>
			    					<div class="tableLisRight hiddenText" id="userNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">基础单元数：</div>
			    					<div class="tableLisRight hiddenText" id="physicalNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">网格面积：</div>
			    					<div class="tableLisRight hiddenText" id="gridArea"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">创建时间：</div>
			    					<div class="tableLisRight hiddenText" id="createDate"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText" title="光交至分纤箱的落地纤芯总数量">光交至分纤箱的落地纤芯总数量：</div>
			    					<div id="endFiberNum" class="tableLisRight hiddenText" ></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText" title="光交至分纤箱的落地纤芯空闲数量">光交至分纤箱的落地纤芯空闲数量：</div>
			    					<div class="tableLisRight hiddenText" id="endFiberUnused"></div>
			    				</li>
			    				<!-- <li class="tableLis">
			    					<div class="tableLisLeft hiddenText">语音占有率：</div>
			    					<div class="tableLisRight hiddenText" id="voicePer"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">端口占有率：</div>
			    					<div class="tableLisRight hiddenText" id="voicePortPer"></div>
			    				</li> -->
			    			</ul>
			    		</div>
			    		
			    		<!-- <div class="tableList clearfix">
			    			<div class="tableListTitle">
			    				网格信息
			    			</div>
			    			<ul class="tableListUl clearfix">
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">角色</div>
			    					<div class="tableLisRight hiddenText">人数</div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">客户经理</div>
			    					<div class="tableLisRight hiddenText">6人</div>
			    				</li>
			    			</ul>
			    		</div> -->
			    		
			    		<!-- <div class="tableList clearfix">
			    			<div class="tableListTitle">
			    				网格用户信息统计信息
			    			</div>
			    			<ul class="tableListUl clearfix">
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">网格客户数：</div>
			    					<div class="tableLisRight hiddenText">1999</div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">网格用户数：</div>
			    					<div class="tableLisRight hiddenText">888</div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">网格产权客户数：</div>
			    					<div class="tableLisRight hiddenText">888</div>
			    				</li>
			    			</ul>
			    		</div> -->
			    	</div>
			    	<div class="gridInfo2">
			    		<div class="chartTitle">
			    			网格业务收入构成信息
			    		</div>
			    		<div id="incomeInfo">
			    			
			    		</div>
			    		<div class="chartTitle">
			    			网格业务发展量构成信息
			    		</div>
			    		<div id="businessInfo">
			    			
			    		</div>
			    	</div>
			    	<div class="gridInfo3">
			    		<div class="tableList clearfix">
			    			<div class="tableListTitle">
			    				统计信息
			    			</div>
			    			<ul class="tableListUl clearfix">
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">家宽用户：</div>
			    					<div class="tableLisRight hiddenText" id="kdNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">总收入：</div>
			    					<div class="tableLisRight hiddenText" id="totalFee"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">上月收入：</div>
			    					<div class="tableLisRight hiddenText" id="totalFeeLast"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">环比收入：</div>
			    					<div class="tableLisRight hiddenText" id="compare"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">家宽收入：</div>
			    					<div class="tableLisRight hiddenText" id="kdFee"></div>
			    				</li>
			    				<!-- <li class="tableLis">
			    					<div class="tableLisLeft hiddenText">家宽占有率：</div>
			    					<div class="tableLisRight hiddenText" id="kdPercent"></div>
			    				</li> -->
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">移网收入：</div>
			    					<div class="tableLisRight hiddenText" id= "ywFee"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">当月新发展用户：</div>
			    					<div class="tableLisRight hiddenText" id= "newUserNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">当月离网用户：</div>
			    					<div class="tableLisRight hiddenText" id="outnetNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText" title="主用机房至光交箱落地总纤芯数">主用机房至光交箱落地总纤芯数：</div>
			    					<div id="equiproomFiberNum" class="tableLisRight hiddenText" ></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText" title="主用机房至光交箱落地空闲纤芯数">主用机房至光交箱落地空闲纤芯数：</div>
			    					<div class="tableLisRight hiddenText" id="equiproomFiberUnused"></div>
			    				</li>
			    				<!-- <li class="tableLis">
			    					<div class="tableLisLeft hiddenText">数据占有率：</div>
			    					<div class="tableLisRight hiddenText" id="dataPer"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">端口占有率：</div>
			    					<div class="tableLisRight hiddenText" id="dataPortPer"></div>
			    				</li> -->
			    			</ul>
			    		</div>
			    		
			    	</div>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/gridInfo/gridInfoPane.js"></script>		    	