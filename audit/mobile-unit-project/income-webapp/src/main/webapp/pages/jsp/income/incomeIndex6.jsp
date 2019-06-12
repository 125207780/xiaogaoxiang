<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
    <cxt:commonLinks /> 
     <%@page import="com.bonc.common.bean.IncomeUser"%>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
 <style type="text/css">
 html,body {
		width:100%;
		height:100%;
	}
	.btnSelect {
 background-color: #1677D2;
 color:#FFF;
}
.yc-span{
	font-size : 12px;
	text-align : center;
} 
	
	<%
	Calendar cal_yesterday=Calendar.getInstance();	
	cal_yesterday.add(Calendar.DATE,-1);		
	Date time=cal_yesterday.getTime();		
	String yesterday=new SimpleDateFormat("yyyyMMdd").format(time); 
	String yesterdayX = new SimpleDateFormat("yyyy-MM-dd").format(time); 
	
	Calendar cal_lastmonth=Calendar.getInstance();	
	cal_lastmonth.add(Calendar.MONTH,-1);		
	Date time_lastmonth=cal_lastmonth.getTime();		
	String lastMonth=new SimpleDateFormat("yyyyMM").format(time_lastmonth);
	String lastMonthX=new SimpleDateFormat("yyyy-MM").format(time_lastmonth);
	
	Calendar cal_month=Calendar.getInstance();		
	Date time_month=cal_month.getTime();		
	String thisMonth=new SimpleDateFormat("yyyyMM").format(time_month);
	 
	
	Calendar cal_today=Calendar.getInstance();			
	Date time_Nowmonth=cal_month.getTime();		
	String today=new SimpleDateFormat("yyyyMMdd").format(time_Nowmonth);
	 
	
	IncomeUser us = (IncomeUser)session.getAttribute("incomeUser");
	String place = us.getPlace();
	%>
 
 </style>
<title>Insert title here</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/defineIncome.css" />

  <script type="text/javascript" src="<%=request.getContextPath() %>/pages/js/echarts4.min.js"></script>
 
 

</head>
<body class="linear">
 
   <input type="hidden" id = "index6" value="<%=place%>">
   	
   		<div id="head" style="/* position: relative; */float:left;width:100%;height:10%">
   			<div style="color:#FFF;font-weight: bold; background-color:#09153F;height: 80px;padding-top: 5px;">
   		<div style="float: left;margin-left: 20px;width:15%;"> 昨天0点到昨天24点</div> <div style="float:left;width:80% ">更新时间：<span id="yc_createTime"></span></div>
   		 <table style="width: 26%;height: 60px ;float:left;"  >
   		 <tr >
   		 <td style="width: 110px;text-align: center;color:#000">
   		    <button   style="border:none;padding: 5px 7px;margin-right: 20px;" id="yc_dayBtn" onclick="selDay()">日</button><button  id="yc_monthBtn" style="border:none;padding: 5px 7px;" onclick="selMonth()">月</button>
   		 </td>
   		 <td style="width: 160px;">
   		   <label class="income_Lable">地市：</label>
				<select id="areaId" style="width:130px;height:34px;">
				<!-- onchange="changeArea() -->"
				 <!--   <option value="999" selected="selected" >全省</option>
				   <option value="730">岳阳市</option>
					<option value="731">长沙市</option>
					<option value="732">湘潭市</option>
					<option value="733">株洲市</option>
					<option value="734">衡阳市</option>
					<option value="735">郴州市</option>
					<option value="736">常德市</option>
					<option value="737">益阳市</option>
					<option value="738">娄底市</option>
					<option value="739">邵阳市</option>
					<option value="743">吉首市</option>
					<option value="744">张家界市</option>
					<option value="745">怀化市</option>
					<option value="746">永州市</option> -->
				</select>
   		 </td>
   		<!--  <td style="color: #FFF">
   		   <span style="width: 100%;" id="yc_daySpan" >
   		      <div style="width: 29%;display: inline-block;">预测出账收入:<br><span id="yc_dfore"></span></div>
   		      <div style="width: 29%;display: inline-block;">实际出账收入:<br><span id="yc_dreal"></span></div>
   		      <div style="width: 17%;display: inline-block;">偏差:<br><span id="yc_dfx"></span></div>
   		      <div style="width: 17%;display: inline-block;">偏差率:<br><span id="yc_dfxra"></span></div>
   		   </span>
   		    <span style="width: 100%;display: none" id="yc_monthSpan">
   		     <div style="width: 29%;display: inline-block;">预测通服收入:<br><span id="yc_mfore"></span></div>
   		      <div style="width: 29%;display: inline-block;">实际通服收入:<br><span id="yc_mreal"></span></div>
   		      <div style="width: 17%;display: inline-block;">偏差:<br><span id="yc_mfx"></span></div>
   		      <div style="width: 17%;display: inline-block;">偏差率:<br><span id="yc_mfxra"></span></div>
   		       
   		   </span>
   		 </td> -->
   		 </tr>
   		 </table>
   		  <div style="width: 40%;float:left;height:100%;padding-top:13px; " id="yc_dTableDiv">
     <label class="income_Lable">账期：</label><input class="form-control date-picker " style="width: 130px;display: inline-block;" id="yc_ddate" type="text"   />
     <button  class="income-btn" onclick="queryDayTable()">查询</button></div>
	 
	  <div style="width: 40%;  float:left;height:100%;padding-top:13px;" id="yc_mTableDiv">
      <label class="income_Lable">账期：</label><input class="form-control date-picker " style="width: 130px;display: inline-block;" id="yc_mdate" type="text"   />
     <button  class="income-btn" onclick="queryMonthTable()">查询</button> </div>
   		</div>
   		</div>
 <div style="width: 50%;height: 90%;position: relative;float:left;">
 	
	 <div style="width: 100%; border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color:#00ACEB;height: 50px;font-size: 16px;color: #000;padding-top: 10px; margin-top: 25px; ">
	    <div style="float: left;margin-left: 20px;color:#fff">逐时预测</div>
	     <div style="float: left;margin-left: 50px;display: none" id="yc_daySelectDiv" >
	     <select id="yc_daySelect">
	     <option value="">全月</option>
	     <option value="10">10天</option>
	     <option value="15">15天</option>
	     </select>
	     预测
	     </div>
	     <div style="color:#fff;float: right;margin-right: 30px;display: none" id="yc_feeTypeDiv">
	       数据来源：<select id="yc_feeType">
	         
	       </select>
	     </div>
	 </div>
	 
	 <div id="yc_chart1" style="width: 100%;position: absolute;top: 90px;bottom: 0px;"></div>
 </div>
 <div style="width: 50%;height: 90%;float:left;padding-top:37px">
     
    <!--  <div style="width: 100%; " id="yc_dTableDiv">
     <label class="income_Lable">账期：</label><input class="form-control date-picker " style="width: 130px;display: inline-block;" id="yc_ddate" type="text"   />
     <button  class="income-btn" onclick="queryDayTable()">查询</button></div> -->
     		 
     		
     
     <!--  <div style="width: 100%; display: none" id="yc_mTableDiv">
      <label class="income_Lable">账期：</label><input class="form-control date-picker " style="width: 130px;display: inline-block;" id="yc_mdate" type="text"   />
     <button  class="income-btn" onclick="queryMonthTable()">查询</button> </div>-->
       <table id="yc_Table" style="width: 95%;"></table>
      <div id="yc_Table_page" style="margin-top:82px;"></div> 
    
 </div>
 <script type="text/javascript">
 var myChart  = null;
$(function(){
	$("#areaId").html($("#index6").val());
	initFeeType();
	initTable();
 
	  myChart = echarts.init($("#yc_chart1")[0]);
	  selDay();
}) 
 
 
function selDay(){
	$("#yc_dayBtn").addClass("btnSelect");
	$("#yc_monthBtn").removeClass("btnSelect");
	showDaySpan();
  //$("#yc_daySelectDiv").show();
 //	$("#yc_daySelect").val("");
	showDayChart();
	$("#yc_feeTypeDiv").hide();
	
	//表格查询
	$('#yc_ddate').datepicker( 'setDate', '<%=yesterdayX%>' )
	queryDayTable();
	 
} 
function selMonth(){
	$("#yc_monthBtn").addClass("btnSelect");
	$("#yc_dayBtn").removeClass("btnSelect");
	showMonthSpan();
 //	$("#yc_daySelectDiv").hide();
 showMonthChart();
   $("#yc_feeTypeDiv").show();
   $('#yc_mdate').datepicker( 'setDate', '<%=lastMonthX%>' )
   queryMonthTable();
}

/*   功能已改为和日期联动查询
function changeArea(){
	if($("#yc_dayBtn").hasClass("btnSelect")){
		selDay();
	}else if($("#yc_monthBtn").hasClass("btnSelect")){
		selMonth();
	}
} 
 */
function showDaySpan(){
	$("#yc_daySpan").show();
	$("#yc_monthSpan").hide();
	//查询日数据 对 yc_daySpan 赋值
	 
	var  areaId = $("#areaId").val();
	var  feeData = $("#yc_ddate").val();
	$.ajax({
		 url : $.cxt +"/page6/selectDay",
		 data:{"areaId":areaId,"feeDate":feeData}, 
		 type: "POST",
		 success:function (data){
			 
			if(data&&data.length>0){
				var obj = data[0];
				$("#yc_dfore").html(obj.FORE_FEE+"万");
				$("#yc_dreal").html(obj.REAL_FEE+"万");
				$("#yc_dfx").html(obj.FEE_FX+"万");
				$("#yc_dfxra").html((obj.FEE_FX_RA*100).toFixed(2)+"%");
				var createTime = new Date();
				createTime.setTime(obj.CREATE_TIME);
				var ct = createTime.getFullYear()+"年"+(createTime.getMonth()+1)+"月"+createTime.getDate()+"日 "+createTime.getHours()+":"+createTime.getMinutes()
				$("#yc_createTime").html(ct);
			}
		 }
	});
}


function showMonthSpan(){
	$("#yc_monthSpan").show();
	$("#yc_daySpan").hide();
	var  areaId = $("#areaId").val();
	var  feeData = $("#yc_mdate").val();
	$.ajax({
		 url : $.cxt +"/page6/selectMonth",
		 data:{"areaId":areaId,"feeDate":feeData,"statisMonth":<%=lastMonth%>,"feeType":"100"},
		 type: "POST",
		 success:function (data){
			 
			if(data&&data.length>0){
				var obj = data[0];
				$("#yc_mfore").html(obj.FORE_FEE+"万");
				$("#yc_mreal").html(obj.REAL_FEE+"万");
				$("#yc_mfx").html(obj.FEE_FX+"万");
				$("#yc_mfxra").html((obj.FEE_FX_RA*100).toFixed(2)+"%");
				var createTime = new Date();
				createTime.setTime(obj.CREATE_DATE);
				var ct = createTime.getFullYear()+"年"+(createTime.getMonth()+1)+"月"+createTime.getDate()+"日 "+createTime.getHours()+":"+createTime.getMinutes()
				$("#yc_createTime").html(ct);
			}
		 }
	});
	
}

function initFeeType(){
	$("#yc_feeType").empty();
	$.ajax({
		url : $.cxt +"/page6/getFreeType",
		type: "POST",
		success:function (list){
			if(null!=list)
				for(var i=0,n=list.length;i<n;i++){
					var option="<option value='"+list[i].FEE_TYPE_CODE+"'>"+list[i].FEE_TYPE_NAME+"</option>";
					$("#yc_feeType").append(option);
				} 
		}
	});
	$("#yc_feeType").off("change");
	$("#yc_feeType").on("change",showMonthChart);
}

 
function translateWeek(dateStr){
	var week = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
	var d = new Date();
	dateStr = dateStr.toString();
	d.setFullYear(dateStr.substr(0,4),(parseInt(dateStr.substr(4,2))-1),dateStr.substr(6,2));
	return week[d.getDay()]+"\n\n"+dateStr.substr(4,2)+"-"+dateStr.substr(6,2);
}
function showDayChart(){
	 myChart.clear();
		var  areaId = $("#areaId").val();
		var  feeData = $("#yc_ddate").val();
		$.ajax({
			 url : $.cxt +"/page6/selectDay",
			 data:{"areaId":areaId,"feeData" : feeData},
			 type: "POST",
			 success:function (data){
				  var day1 = new Date();
				   var today = $("#yc_ddate").val();
				   var realArr =[];
				   var foreArr=[];
				   var xArr = [];
			 	for(var i=0,n=data.length;i<n;i++){
			 		if(data[i].FEE_DATE<today){
			 			realArr.push((data[i].REAL_FEE).toFixed(2));
			 		}
			 		foreArr.push({value:(data[i].FORE_FEE).toFixed(2),feeDate:data[i].FEE_DATE});
			 		xArr.push(translateWeek(data[i].FEE_DATE));
			 	}

		var option = {
						tooltip : {
							trigger : 'axis',
							axisPointer : { // 坐标轴指示器，坐标轴触发有效
								type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
							},
							formatter : function(params, ticket, callback){
							     
					        	var t = params[0].axisValueLabel+"<br>"+
					        			params[0].marker+" "+params[0].seriesName+" : "+params[0].value+"万";
					        	 if(params[1]){
					        		 t+="<br>"+params[1].marker+" "+params[1].seriesName+" : "+ params[1].value+"万";
					        	 }		
					        	return  t
							   },
							   textStyle:{
								   color:'#fff',
							   }
						},
						xAxis : {
							type : 'category',
							data : xArr,
							position : "top",
							axisLine : {
								show : false,
								lineStyle: {
					                color: '#fff'
					            }
							},
							axisTick : {
								show : true
							}
						},
						yAxis : {
							type : 'value',
							show : true,
							 axisLabel: {
					                //formatter: '{value}',
				                	show: true,
				                	color :'#fff',
					                textStyle: {
				                        color: '#fff'
				                    }
					            },
							axisLine:{
								lineStyle :{
									color : '#fff',
								}
							}
						},

						series : [ {
							name : "实际值",
							data : realArr,
							type : 'line',
							lineStyle : {
								color : "#00AAE7"
							},
							itemStyle : {
								color : "#00AAE7"

							},
							label : {
								show : false,
								color : "#fff",
								formatter : "{c}万"
								
							},
							symbol : 'circle',
							symbolSize : 12
						}, {
							name : "预测值",
							data : foreArr,
							type : 'line',
							lineStyle : {
								color : "#F7BA00"
							},
							itemStyle : {
								color : "#F7BA00"

							},
							label : {
								show : false,
								color : "#fff",
								formatter : "{c}万"
								
							},
							symbol : 'circle',
							symbolSize : 12
						} ]
					};
					myChart.setOption(option);
					
					myChart.off('click');
					myChart.on('click', function (params) {
					    if("预测值"==params.seriesName){
					    	var feeDate = params.data.feeDate.toString();
					    	$('#yc_ddate').datepicker( 'setDate',feeDate.substr(0,4)+"-"+feeDate.substr(4,2)+"-"+feeDate.substr(6,2) )
					    	queryDayTable();
					    }
					});
				}
			});

		}
 
   function translateMonth(monthStr){
	 monthStr = monthStr.toString();
	    return monthStr.substr(0,4)+"-"+monthStr.substr(4,2);
    }
		function showMonthChart() {
			 
				
				myChart.clear();
				var  areaId = $("#areaId").val();
				var feeType = $("#yc_feeType").val();
				$.ajax({
					 url : $.cxt +"/page6/selectMonth",
					 data:{"areaId":areaId,"statisMonth":<%=thisMonth%>,"feeType":feeType },
					 type: "POST",
					 success:function (data){
						  var day1 = new Date();
						   var thisMonth = $("#yc_mdate").val();
						   var realArr =[];
						   var foreArr=[];
						   var xArr = [];
					 	for(var i=0,n=data.length;i<n;i++){
					 		if(data[i].FEE_DATE<thisMonth){
					 			realArr.push((data[i].REAL_FEE/1).toFixed(2));
					 		}
					 		foreArr.push({value:(data[i].FORE_FEE/1).toFixed(2),feeDate:data[i].FEE_DATE});
					 		xArr.push(translateMonth(data[i].FEE_DATE));
					 	}

				var option = {
								tooltip : {
									trigger : 'axis',
									axisPointer : { // 坐标轴指示器，坐标轴触发有效
										type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
									     
									},
									formatter : function(params, ticket, callback){
									     
								        	var t = params[0].axisValueLabel+"<br>"+
								        			params[0].marker+" "+params[0].seriesName+" : "+params[0].value+"万 ";
								        			if(params[1]){
										        		 t+="<br>"+params[1].marker+" "+params[1].seriesName+" : "+ params[1].value+"万";
										        	 }		        			 		
								        	return  t
										   }
								},
								xAxis : {
									type : 'category',
									data : xArr,
									position : "top",
									show : true,
									axisLine : {
										show : true,
										lineStyle: {
							                color: '#fff'
							            }
									},
									axisTick : {
										show : false,
									}
								},
								yAxis : {
									type : 'value',
									show : true,
									color: '#fff',
									axisLine: {
										lineStyle :{
											color : "#fff"
										}
									}
								},

								series : [ {
									name : "实际值",
									data : realArr,
									type : 'line',
									lineStyle : {
										color : "#00AAE7"
									},
									itemStyle : {
										color : "#00AAE7"

									},
									label : {
										show : false,
										color : "#fff",
										formatter : "{c}万"
									},
									symbol : 'circle',
									symbolSize : 12
								}, {
									name : "预测值",
									data : foreArr,
									type : 'line',
									lineStyle : {
										color : "#F7BA00"
									},
									itemStyle : {
										color : "#F7BA00"

									},
									label : {
										show : false,
										color : "#fff",
										formatter : "{c}万"
									},
									symbol : 'circle',
									symbolSize : 12
								} ]
							};
							myChart.setOption(option);
							
							myChart.off('click');
							myChart.on('click', function (params) {
							    if("预测值"==params.seriesName){
							    	var feeDate = params.data.feeDate.toString();
							    	$('#yc_mdate').datepicker( 'setDate',feeDate.substr(0,4)+"-"+feeDate.substr(4,2) )
							    	queryMonthTable();
							    }
							});
						}
					});
		}
		
		
	/////table--------------------
	 
		function initTable(){
		$('#yc_mdate').datepicker({
			language : "zh-CN",
			 
			format : 'yyyymm',
			autoclose : true,
			startView : 'months',
			maxViewMode : 'years',
			minViewMode : 'months'
		});
		$('#yc_mdate').datepicker( 'setDate', '<%=lastMonthX%>' )
		$('#yc_ddate').datepicker({
			language : "zh-CN",
			 
			format : 'yyyymmdd',
			autoclose : true,
		});
		$('#yc_ddate').datepicker( 'setDate', '<%=yesterdayX%>' )
		
		
		$('#yc_Table').jqGrid({
			datatype : "local",
			height : "auto",
			autowidth : true,
			colNames : ['地市名称','收入月份','费用类型','预测收入（万）','实际收入（万）','偏差值（万）', '偏差率'],
			colModel : [ 
				 {name : 'AREA_NAME',align : 'center'},  
				 {name : 'FEE_DATE',align : 'center'},   
				 {name : 'FEE_TYPE_NAME',align : 'center'},   
				 {name : 'FORE_FEE',align : 'center' },  
				 {name : 'REAL_FEE',align : 'center' },   
			      {name : 'FEE_FX',align : 'center'},  
			      {name : 'FEE_FX_RA',align : 'center',formatter:function(cellvalue, options, rowObject){
			    	  return (cellvalue*100).toFixed(2)+"%";
			      }},     
			     ],
			 
			viewrecords : true,
			rownumbers: true,
			rowNum : 10,
			rowList : [ 10, 20, 30 ],
			pager : '#yc_Table_page',
			loadComplete:updatePagerIcons
			 			 
		});	
		
	}
	function queryDayTable(){
		$("#yc_dTableDiv").show();
		$("#yc_mTableDiv").hide();
		
		var feeDate = $("#yc_ddate").val();
		if(feeDate==""){
			messageAlert("账期不能为空");
			return false;
		}
		var  areaId = $("#areaId").val();
		$("#yc_Table").jqGrid('clearGridData');  //清空表格
		
		$("#yc_Table").jqGrid ('hideCol','FEE_TYPE_NAME');
		$("#yc_Table").jqGrid ('setLabel','FEE_DATE','收入日期');
		$("#yc_Table").jqGrid('setGridParam',{  // 重新加载数据
			mtype: "POST",
			url : $.cxt + "/page6/selectDayTable",
			postData: {"feeDate":feeDate,"areaId":areaId},
		      datatype:'json',
		      page:1
		}).trigger("reloadGrid");
		showDaySpan();
		showDayChart(); 
	}
	
	

	
	function queryMonthTable(){
		$("#yc_mTableDiv").show();
		$("#yc_dTableDiv").hide();
		
		var feeDate = $("#yc_mdate").val();
		if(feeDate==""){
			messageAlert("账期不能为空");
			return false;
		}
		var  areaId = $("#areaId").val();
		$("#yc_Table").jqGrid('clearGridData');  //清空表格
		$("#yc_Table").jqGrid ('showCol','FEE_TYPE_NAME');
		$("#yc_Table").jqGrid ('setLabel','FEE_DATE','收入月份');
		$("#yc_Table").jqGrid('setGridParam',{  // 重新加载数据
			mtype: "POST",
			url : $.cxt + "/page6/selectMonthTable",
			postData: {"feeDate":feeDate,"areaId":areaId,"statisMonth":"<%=thisMonth%>"},
		      datatype:'json',
		      page:1
		}).trigger("reloadGrid");
		showMonthSpan();
		showMonthChart();
	}
	
	</script>

 



</body>
</html>