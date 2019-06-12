<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<style>
 .infoTable {
 width: 100%;border: none;font-size:14px;font-family:  Regular;color:#38def0
 }
 .infoTable td{
  padding-bottom: 10px;
 }
</style>
<div style="width: 100%; height: 100%;" id="inx_info">
	<p class="income_p">
		活动名称： <span class="income_span" id="idx_info_actName"> </span>
	</p>
	<p class="second">
		活动编码： <span class="income_span" id="idx_info_actCode"> </span>
	</p>
	<p class="second">

	合约类型：<span class="income_span"id="idx_info_hyType"></span>
	</p>
	<p class="income_p">活动开始时间：
	<span class="income_span"id="idx_info_actDate"> </span>
	</p>
	<p class="second">累计订购用户：
	<span class="income_span"id="idx_info_dgUser"> </span>万户
	</p>
	 <p class="second">当月订购用户：
	<span class="income_span"id="idx_info_mdgUser"></span>户
	</p>
	 <p class="second">累计流失用户： 
		<span class="income_span"id="idx_info_lsUser"></span>户
	</p>
	<p class="second">
	 当月流失用户：<span class="income_span"id="idx_info_dgUser_lost"></span>户
	 </p>
	 <table class="infoTable">
	  <tr>
	    <td width="40%">综合评分：
		<span
		class="income_span"id="idx_info_sc"></span>
		</td>
		<td width="30%">排名：
			<span class="income_span"id="idx_info_scNum"></span>
		</td>
		<td width="30%">
		同类型排名：
		<span class="income_span"id="sameTypeRank"></span> 
		</td>
	  </tr>
	  <tr>
	  <td>投入产出比：
		<span class="income_span"id="OUT_IN_RA"></span>
	  </td>
	  <td>
		  排名：<span class="income_span"id="OUT_IN_RA_RANK"></span>
	  </td>
	  <td> 同类型排名：
	<span class="income_span"id="OUT_IN_RA_RANK_SAME"></span></td>
	  </tr>
	  <tr>
	  <td>ARPU提升率：
	<span class="income_span"id="ARPU_UP"></span></td>
	<td>排名：
	<span class="income_span"id="ARPU_RANK"></span>
	</td>
	<td>同类型排名：
	<span class="income_span"id="ARPU_RANK_SAME"></span>
	</td>
	  </tr>
	  <tr>
	  <td>MOU提升率：
	<span class="income_span"id="MOU_UP"></span></td>
	<td>排名：
	<span class="income_span"id="MOU_RANK"></span>
	</td>
	<td>同类型排名：
	<span class="income_span"id="MOU_RANK_SAME"></span>
	</td>
	  </tr>
	  <tr>
	  <td>DOU提升率：
	<span class="income_span"id="DOU_UP"></span></td>
	<td>排名：<span class="income_span"id="DOU_RANK"></span> </td>
	<td>同类型排名：
	<span class="income_span"id="DOU_RANK_SAME"></span></td>
	  </tr>
	  <tr>
	  <td>存活率：
	<span class="income_span"id="sur_rate"></span> 
	  </td>
	  <td>排名：
	<span class="income_span"id="sur_rank"></span> 
	  </td>
	  <td>同类型排名：
	<span class="income_span"id="sur_rank_same"></span>
	  </td>
	  </tr>
	 </table>
	</div>
<script type="text/javascript">
    function  initInfo(obj){
    	var param=JSON.parse(obj); 
    	
    	$.ajax({
    		url : $.cxt + "/page1/getDataInfo",
    		type: "POST",
    		data:{
    			date:param.statisMonth,
    			area:param.areaId,
    			prodId:param.PROD_ID,
    			packageId:param.PACKAGE_ID
    		},
    		async : false,
    		success: function(json){
    			var data  = JSON.parse(json);
    			if(data.code == '0'){
    				var map=data.data;
    				$("#idx_info_actName").empty();
    				$("#idx_info_actName").html(map.PACKAGE_NAME);
    				$("#idx_info_actCode").empty();
    				$("#idx_info_actCode").html(map.PACKAGE_ID);
    				//合约类型
    				$("#idx_info_hyType").empty();
    				$("#idx_info_hyType").html(map.CAMPN_KIND);
    				$("#idx_info_actDate").empty();
    				$("#idx_info_actDate").html(map.CREATE_DATE);
    				$("#idx_info_dgUser").empty();
    				$("#idx_info_dgUser").html(map.ORDER_USR_ALL);
    				$("#idx_info_mdgUser").empty();
    				$("#idx_info_mdgUser").html(map.ORDER_USR_M);
    				$("#idx_info_lsUser").empty();
    				$("#idx_info_lsUser").html(map.LOST_USR_ALL);
    				$("#idx_info_dgUser_lost").empty();
    				$("#idx_info_dgUser_lost").html(map.LOST_USR_M);
    				$("#idx_info_sc").empty();
    				$("#idx_info_sc").html(map.TOTAL_SCORE);
    				$("#idx_info_scNum").empty();
    				$("#idx_info_scNum").html(map.TOTAL_SCORE_RK);
    				$("#sameTypeRank").empty();
    				$("#sameTypeRank").html(map.TOTAL_SCORE_TL_RK);
    				$("#OUT_IN_RA").empty();
    				$("#OUT_IN_RA").html(map.OUT_IN_RA);
    				$("#OUT_IN_RA_RANK").empty();
    				$("#OUT_IN_RA_RANK").html(map.OUT_IN_RA_RK);
    				$("#OUT_IN_RA_RANK_SAME").empty();
    				$("#OUT_IN_RA_RANK_SAME").html(map.OUT_IN_RA_TL_RK);
    				$("#ARPU_UP").empty();
    				$("#ARPU_UP").html(map.ARPU_RA);
    				$("#ARPU_RANK").empty();
    				$("#ARPU_RANK").html(map.ARPU_RA_RK);
    				$("#ARPU_RANK_SAME").empty();
    				$("#ARPU_RANK_SAME").html(map.ARPU_RA_TL_RK);
    				$("#MOU_UP").empty();
    				$("#MOU_UP").html(map.MOU_RA);
    				$("#MOU_RANK").empty();
    				$("#MOU_RANK").html(map.MOU_RA_RK);
    				$("#MOU_RANK_SAME").empty();
    				$("#MOU_RANK_SAME").html(map.MOU_RA_TL_RK);
    				$("#DOU_UP").empty();
    				$("#DOU_UP").html(map.DOU_RA);
    				$("#DOU_RANK").empty();
    				$("#DOU_RANK").html(map.DOU_RA_RK);
    				$("#DOU_RANK_SAME").empty();
    				$("#DOU_RANK_SAME").html(map.DOU_RA_TL_RK);
    				$("#sur_rate").empty();
    				$("#sur_rate").html(map.SURVIVAL_RA);
    				$("#sur_rank").empty();
    				$("#sur_rank").html(map.SURVIVAL_RA_RK);
    				$("#sur_rank_same").empty();
    				$("#sur_rank_same").html(map.SURVIVAL_RA_TL_RK);
    			}
    		}
    	}) 
    }

</script>