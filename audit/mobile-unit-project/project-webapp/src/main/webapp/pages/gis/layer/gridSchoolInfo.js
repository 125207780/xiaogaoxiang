var selectArr = [];
var	statisMonth ="";
var contractType= "";
var stockAdditions= "";
var incomeFiling= "";
var flowFiling= "";
var phoneticFiling= "";
var appFiling = "";
var taocanFiling = "";
$(function(){
	var SCH_ID = $("#sch_id").text();
	getGridSchoolBaseInfo();//网格学校基础信息
	schoolFilterInit(SCH_ID);//网格学校业务办理信息
	schoolNewDevelopInit(SCH_ID);//校园用户发展情况
	schoolUseInit(SCH_ID);//校园用户ARPU信息
	initschoolUserDetail(SCH_ID);//用户画像信息
	initDate();//初始化日期组件
	OverContent();
	
})

function getGridSchoolBaseInfo(){
	var SCH_ID = $("#sch_id").text();
	$("#SCH_ID").empty();
	$("#SCH_NAME").empty();
	$("#SCH_WEB_ADDR").empty();
	$("#SCH_LEVEL").empty();
	$("#SCH_COMPETENT_ORG").empty();
	$("#SCH_USER").empty();
	$("#NEW_SCH_USER").empty();
	$("#TEACH_WORKS").empty();
	$("#CMCC_PERCNT").empty();
	$("#TYPE_NAME").empty();
	$("#SCH_PROPERTY").empty();
	$("#REMARK").empty();
	$("#AREA_ID").empty();
	$("#CMCC_SCH_ID").empty();
	$("#CMCC_AREA_ID").empty();
	$("#CMCC_AREA_NAME").empty();
	$("#SCH_LEVEL_ID").empty();
	$("#SCH_ADDR").empty();
	$("#IF_KEY_SCH").empty();
	$("#SCH_LONGTITUDE").empty();
	$("#SCH_LATITUDE").empty();
	$.ajax({
		url : $.cxt + '/gridSchoolInfo/getBaseGridSchoolInfo',
		data : {schId : SCH_ID},
		type : "POST",
		success : function(json){
			var data = JSON.parse(json);
			if(data.code == '0'){
				$("#SCH_ID").append(data.data[0].SCH_ID);
				$("#SCH_NAME").append(data.data[0].SCH_NAME);
				$("#SCH_WEB_ADDR").append(data.data[0].SCH_WEB_ADDR);
				$("#SCH_LEVEL").append(data.data[0].SCH_LEVEL);
				$("#SCH_COMPETENT_ORG").append(data.data[0].SCH_COMPETENT_ORG);
				$("#SCH_USER").append(data.data[0].SCH_USER);
				$("#NEW_SCH_USER").append(data.data[0].NEW_SCH_USER);
				$("#TEACH_WORKS").append(data.data[0].TEACH_WORKS == null || data.data[0].TEACH_WORKS == "" ? 0 : data.data[0].TEACH_WORKS);
				$("#CMCC_PERCNT").append(data.data[0].CMCC_PERCNT);
				$("#TYPE_NAME").append(data.data[0].TYPE_NAME == null || data.data[0].TYPE_NAME == "" ? 0 : data.data[0].TYPE_NAME);
				$("#SCH_PROPERTY").append(data.data[0].SCH_PROPERTY);
				$("#REMARK").append(data.data[0].REMARK == null || data.data[0].REMARK == "" ? 0 : data.data[0].REMARK);
				$("#AREA_ID").append(data.data[0].AREA_ID);
				$("#CMCC_SCH_ID").append(data.data[0].CMCC_SCH_ID == null || data.data[0].CMCC_SCH_ID == "" ? 0 : data.data[0].CMCC_SCH_ID);
				$("#CMCC_AREA_ID").append(data.data[0].CMCC_AREA_ID);
				$("#CMCC_AREA_NAME").append(data.data[0].CMCC_AREA_NAME);
				$("#SCH_LEVEL_ID").append(data.data[0].SCH_LEVEL_ID);
				$("#SCH_ADDR").append(data.data[0].SCH_ADDR);
				$("#IF_KEY_SCH").append(data.data[0].IF_KEY_SCH);
				$("#SCH_LONGTITUDE").append(data.data[0].SCH_LONGTITUDE);
				$("#SCH_LATITUDE").append(data.data[0].SCH_LATITUDE);
			}
		}
	})
}

//function schoolFilterInit(){
//	var SCH_ID = $("#sch_id").text();
//	$.ajax({
//		url : $.cxt + '/gridSchoolInfo/getGridSchoolYWBLInfo',
//		data : {schId : SCH_ID},
//		type : "POST",
//		success : function(json){
//			var data = JSON.parse(json);
//			if(data.code == '0'){
////				$("#SCH_ID").append(data.data[0].SCH_ID);
////				$("#SCH_NAME").append(data.data[0].SCH_NAME);
////				$("#SCH_WEB_ADDR").append(data.data[0].SCH_WEB_ADDR);
////				$("#SCH_LEVEL").append(data.data[0].SCH_LEVEL);
////				$("#SCH_COMPETENT_ORG").append(data.data[0].SCH_COMPETENT_ORG);
////				$("#SCH_USER").append(data.data[0].SCH_USER);
////				$("#NEW_SCH_USER").append(data.data[0].NEW_SCH_USER);
////				$("#TEACH_WORKS").append(data.data[0].TEACH_WORKS == null || data.data[0].TEACH_WORKS == "" ? 0 : data.data[0].TEACH_WORKS);
////				$("#CMCC_PERCNT").append(data.data[0].CMCC_PERCNT);
////				$("#TYPE_NAME").append(data.data[0].TYPE_NAME == null || data.data[0].TYPE_NAME == "" ? 0 : data.data[0].TYPE_NAME);
////				$("#SCH_PROPERTY").append(data.data[0].SCH_PROPERTY);
////				$("#REMARK").append(data.data[0].REMARK == null || data.data[0].REMARK == "" ? 0 : data.data[0].REMARK);
////				$("#AREA_ID").append(data.data[0].AREA_ID);
////				$("#CMCC_SCH_ID").append(data.data[0].CMCC_SCH_ID == null || data.data[0].CMCC_SCH_ID == "" ? 0 : data.data[0].CMCC_SCH_ID);
////				$("#CMCC_AREA_ID").append(data.data[0].CMCC_AREA_ID);
////				$("#CMCC_AREA_NAME").append(data.data[0].CMCC_AREA_NAME);
////				$("#SCH_LEVEL_ID").append(data.data[0].SCH_LEVEL_ID);
////				$("#SCH_ADDR").append(data.data[0].SCH_ADDR);
////				$("#IF_KEY_SCH").append(data.data[0].IF_KEY_SCH);
////				$("#SCH_LONGTITUDE").append(data.data[0].SCH_LONGTITUDE);
////				$("#SCH_LATITUDE").append(data.data[0].SCH_LATITUDE);
//			}
//		}
//	})
//	
//	
//	var myChart = echarts.init(document.getElementById('gridSchoolYWBLEchart'));
//	option = {
//		    tooltip : {
//		        trigger: 'item',
//		        formatter: "{a} <br/>{b} : {c} ({d}%)"
//		    },
//		    legend: {
//		        orient : 'horizontal',
//		        x : 'top',
//		        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
//		        textStyle: {
//		            color: '#fff'
//		        }
//		    },
//		    series : [
//		        {
//		            name:'访问来源',
//		            type:'pie',
//		            radius : '55%',
//		            center: ['50%', '30%'],
//		            data:[
//		                {value:335, name:'直接访问'},
//		                {value:310, name:'邮件营销'},
//		                {value:234, name:'联盟广告'},
//		                {value:135, name:'视频广告'},
//		                {value:1548, name:'搜索引擎'}
//		            ]
//		        }
//		    ]
//		};
//	myChart.setOption(option);
//}

function schoolFilterInit(){
	var SCH_ID = $("#sch_id").text();
	$.ajax({
		url : $.cxt + '/gridSchoolInfo/getGridSchoolYWBLInfo',
		data : {schId : SCH_ID},
		type : "POST",
		success : function(json){
			if(json){
				var data= json.left[0];
				var filter_schoolUser = data.CMCC_SCH_USERS;
				$("#filter_schoolUser").html(filter_schoolUser);
				var filter_userFilter = data.CMCC_SCH_USERS_P;
				$("#filter_userFilter").html(strToNum(filter_userFilter));
				
				var filter_schoolBandUser = data.CMCC_SCH_KD_USERS;
				$("#filter_schoolBandUser").html(filter_schoolBandUser);
				var filter_bandUserFilter = data.CMCC_SCH_KD_USERS_P;
				$("#filter_bandUserFilter").html(strToNum(filter_bandUserFilter));
				
				var filter_schoolUnlimit = data.CMCC_SCH_UNLIM_USERS;
				$("#filter_schoolUnlimit").html(filter_schoolUnlimit);
				var filter_unlimitFilter = data.CMCC_SCH_UNLIM_USERS_P;
				$("#filter_unlimitFilter").html(strToNum(filter_unlimitFilter));

				var filter_unlimitTaocan = data.CMCC_SCH_UNLIMDIN_USERS;
				$("#filter_unlimitTaocan").html(filter_unlimitTaocan);
				var filter_unlimitTaocaoFilter = data.CMCC_SCH_UNLIMDIN_USERS_P;
				$("#filter_unlimitTaocaoFilter").html(strToNum(filter_unlimitTaocaoFilter));
				
				
				
				var filter_unlimitPackage = data.CMCC_SCH_UNLIMFLUX_USERS;
				$("#filter_unlimitPackage").html(filter_unlimitPackage);
				var filter_unlimitPackageFilter = data.CMCC_SCH_UNLIMFLUX_USERS_P;
				$("#filter_unlimitPackageFilter").html(strToNum(filter_unlimitPackageFilter));
			
				
				var filter_schoolContractUser = data.CMCC_SCH_ACTIV_USERS;
				$("#filter_schoolContractUser").html(filter_schoolContractUser);
				var filter_contractUserFilter = data.CMCC_SCH_ACTIV_USERS_P;
				$("#filter_contractUserFilter").html(strToNum(filter_contractUserFilter));
				
				var filter_endContract = data.CMCC_SCH_TERM_ACTIV_USERS;
				$("#filter_endContract").html(filter_endContract);
				var filter_endContractFilter = data.CMCC_SCH_TERM_ACTIV_USERS_P;
				$("#filter_endContractFilter").html(strToNum(filter_endContractFilter));
				
				var filter_saveAndGive = data.CMCC_SCH_FEE_ACTIV_USERS;
				$("#filter_saveAndGive").html(filter_saveAndGive);
				var filter_saveAndGiveFilter = data.CMCC_SCH_FEE_ACTIV_USERS_P;
				$("#filter_saveAndGiveFilter").html(strToNum(filter_saveAndGiveFilter));

				var filter_saveAndGiveBus = data.CMCC_SCH_SERV_ACTIV_USERS;
				$("#filter_saveAndGiveBus").html(filter_saveAndGiveBus);
				var filter_saveAndGiveBusFilter = data.CMCC_SCH_SERV_ACTIV_USERS_P;
				$("#filter_saveAndGiveBusFilter").html(strToNum(filter_saveAndGiveBusFilter));
				
				var filter_bandContract = data.CMCC_SCH_OTH_ACTIV_USERS;
				$("#filter_bandContract").html(filter_bandContract);
				var filter_bandContractFilter = data.CMCC_SCH_OTH_ACTIV_USERS_P;
				$("#filter_bandContractFilter").html(strToNum(filter_bandContractFilter));
				

				var filter_4g = data.CMCC_SCH_4G_USERS;
				$("#filter_4g").html(filter_4g);
				var filter_4gFilter = data.CMCC_SCH_4G_USERS_P;
				$("#filter_4gFilter").html(strToNum(filter_4gFilter));
				
				var filter_V = data.CMCC_SCH_VNET_USERS;
				$("#filter_V").html(filter_V);
				var filter_vFilter = data.CMCC_SCH_VNET_USERS_P;
				$("#filter_vFilter").html(strToNum(filter_vFilter));
			}	
		}
	});
	
	initFilterCharts(SCH_ID);
}

function initFilterCharts(schoolId){
	var select =$("#filterSelect");
	
	var selOptions = [
	                  {value:"02",name:"校园不限量类型"},
	                  {value:"01",name:"校园宽带"},
					  {value:"03",name:"校园合约类型"},
					  {value:"04",name:"校园4G类型"}
					  ];
	
	for(var i=0,n=selOptions.length;i<n;i++){
		var selectOption = selOptions[i];
		var opt = $("<option value='"+selectOption.value+"'>"+selectOption.name+"</option>");
		select.append(opt);
	}
	var mycharts = echarts.init(document.getElementById('filterEchart'));
 
	select.change(setCharts);
	setCharts();
	
	
	function setCharts(){
		var val = select.val();
		var echartData;
		$.ajax({
			url : $.cxt + '/gridSchoolInfo/getGridSchoolYWBLEchart',
			dataType : "json",
			type : "POST",
			async:false,
			data : {selected:val,schoolId:schoolId},
			success : function(list){
				echartData = list;
			}
		});	
		
		
		
		var result = [];
		for(var i = 0 ; i < echartData.length; i++){
			var data = echartData[i];
			result.push({value : data.CMCC_SCH_USERS, name : data.SERV_NAME});
		}
//		console.log(result);
		var option = {
				 tooltip : {
			         trigger: 'item',
			         formatter: "{b} : {c} ({d}%)"
			    },
			    legend: {
			         type: 'scroll',
			         //orient: 'vertical',
			         right: 5,
			         top: 10,
			         bottom: 'center',
			         textStyle:{
			        	 color:'#ffffff'
			         },
			         data:result
			    },
			    series : [
			        {
		             type:'pie',
		             radius : '70%',
		             center : ['50%', '60%'],
		            /* roseType : 'area',*/
		             itemStyle: {
		                 normal: {
		                     label: {
		                         textStyle: {
		                             fontSize: 14,
		                            /* fontWeight:'bolder'*/
		                         }
		                     }
		                 }
		             },
		             data:result,
		             color:[
                          '#90EE90','#A52A2A','#B8860B','#27727B',
                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                           '#D7504B','#C6E579','#a64d79','#073763','#274e13',
                           '#a14f4f','#b93232'
		                   ],
			        }
			    ]
		}
		mycharts.clear();
		mycharts.setOption(option);
		window.onresize = mycharts.resize;
	}
	
}

function gridSchoolYHFZQKInfo(){
	var myChart = echarts.init(document.getElementById('gridSchoolYHFZQKIEchart'));
	option = {
			   tooltip: {
			       trigger: "item",
			       formatter: "{a} <br/>{b} : {c}"
			   },
			   xAxis: [
			       {
			           type: "category",
			           splitLine: {show: false},
			           data: ["一", "二", "三", "四", "五", "六", "七", "八", "九"],
			           axisLine: {
		                    lineStyle: {
		                        type: 'solid',
		                        color: '#fff',//左边线的颜色
		                      //  width:'2'//坐标线的宽度
		                    }
		                },
			           axisLabel: {
		                    textStyle: {
		                        color: '#fff',//坐标值得具体的颜色
		 
		                    }
		                }
			       }
			   ],
			   yAxis: [
			       {
			           type: "log"
			       }
			   ],
			   calculable: true,
			   series: [
			       {
			           name: "2的指数",
			           type: "line",
			           data: [1, 2, 20, 10, 40, 35, 64, 128, 256]
			       }
			   ]
			};
	myChart.setOption(option);
}

function schoolNewDevelopInit(schoolId){

	$.ajax({
		url : $.cxt + '/gridSchoolInfo/getGridSchoolNewDevelopInit',
		dataType : "json",
		type : "POST",
		data : {schId:schoolId},
		success : function(json){
			if(json){
				var data=json[0];
				var new_userTotal = data.CMCC_SCH_DEV_USERS;
				$("#new_userTotal").html(new_userTotal);
				var new_userCycle = data.CMCC_SCH_USERS_P;
				$("#new_userCycle").html(strToNum(new_userCycle));
				
				var new_schoolBandUser = data.CMCC_SCH_KD_DEV_USERS;
				$("#new_schoolBandUser").html(new_schoolBandUser);
				var new_bandUserFilter = data.CMCC_SCH_KD_USERS_P;
				$("#new_bandUserFilter").html(strToNum(new_bandUserFilter));
				
				var new_schoolUnlimit = data.CMCC_SCH_UNLIM_DEV_USERS;
				$("#new_schoolUnlimit").html(new_schoolUnlimit);
				var new_unlimitFilter = data.CMCC_SCH_UNLIM_USERS_P;
				$("#new_unlimitFilter").html(strToNum(new_unlimitFilter));
				
				var new_unlimitTaocan = data.CMCC_SCH_UNLIMDIN_DEV_USERS;
				$("#new_unlimitTaocan").html(new_unlimitTaocan);
				var new_unlimitTaocaoFilter = data.CMCC_SCH_UNLIMDIN_DEV_USERS_P;
				$("#new_unlimitTaocaoFilter").html(strToNum(new_unlimitTaocaoFilter));
				
				var new_unlimitPackage = data.CMCC_SCH_UNLIMFLUX_DEV_USERS;
				$("#new_unlimitPackage").html(new_unlimitPackage);
				var new_unlimitPackageFilter = data.CMCC_SCH_UNLIMFLUX_DEV_USERS_P;
				$("#new_unlimitPackageFilter").html(strToNum(new_unlimitPackageFilter));
				
				var new_schoolContractUser = data.CMCC_SCH_ACTIV_DEV_USERS;
				$("#new_schoolContractUser").html(new_schoolContractUser);
				var new_contractUserFilter = data.CMCC_SCH_ACTIV_USERS_P;
				$("#new_contractUserFilter").html(strToNum(new_contractUserFilter));
				
				var new_endContract = data.CMCC_SCH_TERM_ACTIV_DEV_USERS;
				$("#new_endContract").html(new_endContract);
				var new_endContractFilter = data.CMCC_SCH_TERM_ACTIV_DEV_USERS_P;
				$("#new_endContractFilter").html(strToNum(new_endContractFilter));
				
				var new_saveAndGive = data.CMCC_SCH_FEE_ACTIV_DEV_USERS;
				$("#new_saveAndGive").html(new_saveAndGive);
				var new_saveAndGiveFilter = data.CMCC_SCH_FEE_ACTIV_DEV_USERS_P;
				$("#new_saveAndGiveFilter").html(strToNum(new_saveAndGiveFilter));
				
				var new_saveAndGiveBus = data.CMCC_SCH_SERV_ACTIV_DEV_USERS;
				$("#new_saveAndGiveBus").html(new_saveAndGiveBus);
				var new_saveAndGiveBusFilter = data.CMCC_SCH_SERV_ACTIV_DEV_USERS_P;
				$("#new_saveAndGiveBusFilter").html(strToNum(new_saveAndGiveBusFilter));
				
				var new_bandContract = data.CMCC_SCH_OTH_ACTIV_DEV_USERS;
				$("#new_bandContract").html(new_bandContract);
				var new_bandContractFilter = data.CMCC_SCH_OTH_ACTIV_DEV_USERS_P;
				$("#new_bandContractFilter").html(strToNum(new_bandContractFilter));
				
				var new_4g = data.CMCC_SCH_4G_DEV_USERS;
				$("#new_4g").html(new_4g);
				var new_4gFilter = data.CMCC_SCH_4G_USERS_P;
				$("#new_4gFilter").html(strToNum(new_4gFilter));
				
				var new_V = data.CMCC_SCH_VNET_DEV_USERS;
				$("#new_V").html(new_V);
				var new_vFilter = data.CMCC_SCH_VNET_USERS_P;
				$("#new_vFilter").html(strToNum(new_vFilter));
				
			}
		}
	});
	initNewCharts(schoolId)
 }

function initNewCharts(schoolId){
	var select =$("#newSelect");
	
	var selOptions = [{value:"00",name:"校园用户"},{value:"01",name:"校园宽带"},
					  {value:"02",name:"校园不限量类型"},{value:"03",name:"校园合约类型"},
					  {value:"04",name:"校园4G类型"},{value:"05",name:"校园V网类型"}];
	
	for(var i=0,n=selOptions.length;i<n;i++){
		var selectOption = selOptions[i];
		var opt = $("<option value='"+selectOption.value+"'>"+selectOption.name+"</option>");
		select.append(opt);
	}
	var mycharts = echarts.init(document.getElementById('newEchart'));
 
	select.change(setCharts);
	setCharts();
	
	
	function setCharts(){
		var val = select.val();
		var echartData;
		$.ajax({
			url : $.cxt + '/gridSchoolInfo/getGridSchoolNewDevelopEchart',
			dataType : "json",
			type : "POST",
			async:false,
			data : {selected:val,schId:schoolId},
			success : function(list){
				echartData = list;
			}
		});	
		
		var rowData = [];
		var result = [];
		for(var i = 0 ; i < echartData.length; i++){
			var data = echartData[i];
			rowData.push(data.DEV_DATE)
			result.push({value : data.CMCC_SCH_USERS, name : data.DEV_DATE});
		}
//		console.log(result);
		
		option = {
			    tooltip: {
			        trigger: 'axis',
			    },
			    
			    xAxis:  {
			        type: 'category',
			        axisLine:{
	                    lineStyle:{
	                        color:'#fff'
	                    }
	                },
			        data:rowData,
			    },
			    yAxis: {
			        type: 'value',
			        axisLabel: {
			            formatter: '{value}',
			            textStyle:{
			                color:'#fff'//x轴，y轴的数字颜色，如图1
			           }
			        }
			    },
			    
			    series: [
			        {
			            name:'用户数',
			            type:'line',
			            data:result,
			        },
			    ]
			};
		mycharts.clear();
		mycharts.resize();
		mycharts.setOption(option);
	}
	
}

function schoolUseInit(schoolId){
	$.ajax({
		url : $.cxt + '/gridSchoolInfo/getGridSchoolUseInit',
		dataType : "json",
		type : "POST",
		data : {schId:schoolId},
		success : function(json){
			if(json){
				var data=json[0];
				var use_ARPU = data.CMCC_SCH_ARPU;
				$("#use_ARPU").html(use_ARPU);
				var use_ARPUcycle = data.LM1_CMCC_SCH_ARPU_P;
				$("#use_ARPUcycle").html(strToNum(use_ARPUcycle));
				
				var use_ARPU_REAL_FEE = data.CMCC_SCH_ARPU_REAL_FEE;
				$("use_ARPU_REAL_FEE").html(use_ARPU_REAL_FEE);
				var use_ARPU_REAL_FEEcycle = data.LM1_CMCC_SCH_ARPU_REAL_FEE_P;
				$("use_ARPU_REAL_FEEcycle").html(strToNum(use_ARPU_REAL_FEEcycle));
				
				var use_MOU = data.CMCC_SCH_MOU;
				$("#use_MOU").html(use_MOU);
				var use_MOUcycle = data.LM1_CMCC_SCH_MOU_P;
				$("#use_MOUcycle").html(strToNum(use_MOUcycle));
				
				var use_DOU = data.CMCC_SCH_DOU;
				$("#use_DOU").html(use_DOU);
				var use_DOUcycle = data.LM1_CMCC_SCH_DOU_P;
				$("#use_DOUcycle").html(strToNum(use_DOUcycle));
				
				var use_phoneUser = data.CMCC_SCH_CALL_USERS;
				$("#use_phoneUser").html(use_phoneUser);
				var use_phoneUserCycle = data.LM1_CMCC_SCH_CALL_USERS_P;
				$("#use_phoneUserCycle").html(strToNum(use_phoneUserCycle));
				
				
			}	
		}
	});
	initUseCharts(schoolId);
}

function initUseCharts(schoolId){
	var select =$("#useSelect");
	
	var selOptions = [{value:"01",name:"校园用户ARPU"},{value:"02",name:"校园用户DOU"},
					  {value:"03",name:"校园用户MOU"},{value:"04",name:"通话次数"},
					  {value:"05",name:"校园用户ARPU(折让后)"}];
	
	for(var i=0,n=selOptions.length;i<n;i++){
		var selectOption = selOptions[i];
		var opt = $("<option value='"+selectOption.value+"'>"+selectOption.name+"</option>");
		select.append(opt);
	}
	var mycharts = echarts.init(document.getElementById('useEchart'));
 
	select.change(setCharts);
	setCharts();
	
	
	function setCharts(){
		var val = select.val();
		var echartData;
		$.ajax({
			url : $.cxt + '/gridSchoolInfo/getGridSchoolUseEchart',
			dataType : "json",
			type : "POST",
			async:false,
			data : {selected:val,schId:schoolId},
			success : function(list){
				echartData = list;
			}
		});	
		
		var result = [];
		for(var i = 0 ; i < echartData.length; i++){
			var data = echartData[i];
			result.push({value : data.CMCC_SCH_USERS, name : data.LVL_TYPE});
		}
//		console.log(result);
		
		var option = {
				 tooltip : {
			         trigger: 'item',
			         formatter: "  {b} : {c} ({d}%)"
			    },
			    legend: {
			         type: 'scroll',
			         orient: 'vertical',
			         right: 5,
			         bottom: 'center',
			         textStyle:{
			        	 color:'#fff'
			         },
			         data:result
			    },
			    series : [
			        {
		             type:'pie',
		             radius : [30, 110],
		             center : ['50%', '50%'],
		             roseType : 'area',
		             data:result
			        }
			    ]
		}
		mycharts.clear();
		mycharts.resize();
		mycharts.setOption(option);
	}
	
}




function initschoolUserDetail(schoolId){
	YHHXTable();
	initContractType();
	initStockAdditions();
	initIncomeFiling();
	initFlowFiling();
	initPhoneticFiling();
	initAPPFiling();
	initTaocanFiling();
}
	
 
$("#reset").click(function(){
	YHHXTable()
	initContractType();
	initStockAdditions();
	initIncomeFiling();
	initFlowFiling();
	initPhoneticFiling()
	initAPPFiling();
	initTaocanFiling();
});
function YHHXTable(){
	var lastMonth ="";
	if(statisMonth==""){
	   lastMonth = initDate();
	}else{
		lastMonth=statisMonth;
	}
	
   $("#YHHXTable").jqGrid('clearGridData');
   $("#YHHXTable").GridUnload();
   var schoolId= $("#sch_id").text();;
   grid = $("#YHHXTable");  
   grid.jqGrid({ 
		url : $.cxt + '/gridSchoolInfo/getGridSchoolUserDetailInit',
	   datatype : "json",
	   mtype : "POST",
	   postData : {
       	statisMonth :lastMonth,
       	schId:schoolId,
       	actviTypeId : contractType,
       	usrType : stockAdditions,
       	feeLevelId :incomeFiling,
       	gprsLevelId : flowFiling,
       	voiceLevelId :phoneticFiling,
       	appTypeId:appFiling,
       	discFeeId:taocanFiling
       },  
	   height : 200,
	   width:300,
	   autowidth : true,
	   colNames: [ '地市','用户ID','当前主套餐名称','账期'], 
	   colModel: [ 
	       { name: 'schAreaName', index: 'schAreaName',align: 'center', width:100, cellattr: addCellAttr}, 
	       { name: 'usrId', index: 'usrId',align: 'center',width:140, cellattr: addCellAttr}, 
	       { name: 'taocanName', index: 'taocanName',align: 'center', width:140, cellattr: addCellAttr}, 
	       { name: 'statisMonth', index: 'statisMonth', hidden:true, cellattr: addCellAttr},
	   ], 
		shrinkToFit:false,
		autoScroll: true,
		viewrecords : true,
		rownumbers: false,
		rowNum : 10,
		rowList : [ 10,20, 30 ],
		viewrecords: false, 
		pager : '#YHHXTablegrid-pager',
		gridComplete: function() { 
			   setNiceScroll();
		  } ,
		loadComplete : function(){
			var list=$("#YHHXTable").jqGrid('getRowData');
			if(list.length>0){
				$("#YHHXTable").jqGrid('setSelection',1,true);
			}
			 topjqGridLoadComplete();
		},
		onSelectRow : function(rowid, status){
			var obj = $("#YHHXTable").jqGrid('getRowData',rowid);
			   if(status){
			    	selectArr[obj.usrId]=obj;
			    }else{
			    	if(selectArr[obj.usrId]){
			    		delete  selectArr[obj.usrId];
			    	} 
			    }
			   var usrId = obj.usrId;
			   var statisMonth = obj.statisMonth;
			   $.ajax({
				   url : $.cxt + "/gridSchoolInfo/getUserInfo", 
					type: "POST",
					async:false,
					data :{
						usrId:usrId,
						statisMonth:statisMonth
						},
					success : function(data){
						var data = JSON.parse(data);
						if(data.code == '0'){
							$("#SEX").empty();
							$("#SCH_NAME").empty();
							$("#ARPU").empty();
							$("#DOU").empty();
							$("#MOU").empty();
							$("#AGE").empty();
							$("#TERM_INFO").empty();
							 var sex = "";
							if(data.data.sex == "F"){
								 sex ="女"
							}else{
								sex ="男"
							}
							$("#SEX").css("color","#C0C0C0").text("性别:"+sex);
							$("#SCH_NAME").css("color","#FFFFFF").text(data.data.schName);
							$("#ARPU").css("color","#FFFFFF").text("月均ARPU值为:"+data.data.arpu+"元");
							$("#DOU").css("color","#FFFFFF").text("使用流量:"+data.data.dou+"G左右");
							$("#MOU").css("color","#000000").text("月均通话时长:"+data.data.mou+"分钟");
							$("#AGE").css("color","#FFFFFF").text("年龄:"+data.data.age);
							$("#TERM_INFO").css("color","#FFFFFF").text("终端偏好:"+data.data.termInfo);
						}
					}
			   })
		}
}); 
 //查询按钮
	$("#searchList").click(function(){
		reloadBasicUnitJqGrid("search");
	});
	//导出
	$("#export").click(function(){
		statisMonth = $("#dv_date").val();
		if(statisMonth == undefined){
			statisMonth = "";
		}
		var contractType= "";
		var stockAdditions= "";
		var incomeFiling= "";
		var flowFiling= "";
		var appFiling="";
		var taocanFiling="";
		var phoneticFiling= "";
		
		contractType = $("#contractType").find("option:selected").val();
		if(contractType =="请选择..."){
			contractType = "";
		}
		stockAdditions = $("#stockAdditions").find("option:selected").val();
		if(stockAdditions =="请选择..."){
			stockAdditions = "";
		}
		incomeFiling = $("#incomeFiling").find("option:selected").val();
		if(incomeFiling =="请选择..."){
			incomeFiling = "";
		}
		flowFiling = $("#flowFiling").find("option:selected").val();
		if(flowFiling =="请选择..."){
			flowFiling = "";
		}
		appFiling = $("#APPFiling").find("option:selected").val();
		if(appFiling =="请选择..."){
			appFiling = "";
		}
		taocanFiling = $("#taocanFiling").find("option:selected").val();
		if(taocanFiling =="请选择..."){
			taocanFiling = "";
		}
		phoneticFiling = $("#phoneticFiling").find("option:selected").val();
		if(phoneticFiling =="请选择..."){
			phoneticFiling = "";
		}
		var schoolId= $("#sch_id").text();;
		window.location.href=$.cxt +"/gridSchoolInfo/export?statisMonth="+statisMonth+"&actviTypeId="+ contractType+"&usrType="+ stockAdditions+"&feeLevelId="+ incomeFiling+"&gprsLevelId="+ flowFiling+"&schoolId="+schoolId+"&voiceLevelId="+ phoneticFiling+"&appTypeId="+ appFiling+"&discFeeId="+ taocanFiling;
	})
//	
	var user = $("#YHHXTable").jqGrid('getRowData',1);
	 if(status){
	    	selectArr[user.usrId]=obj;
	    }else{
	    	if(selectArr[user.usrId]){
	    		delete  selectArr[user.usrId];
	    	} 
	    }
	  var usrId = user.usrId;
	   var statisMonth = user.statisMonth;
	   $.ajax({
		   url : $.cxt + "/gridSchoolInfo/getUserInfo", 
			type: "POST",
			async:false,
			data :{
				usrId:usrId,
				statisMonth:statisMonth
				},
			success : function(data){
				var data = JSON.parse(data);
				if(data.code == '0'){
					$("#SEX").empty();
					$("#SCH_NAME").empty();
					$("#ARPU").empty();
					$("#DOU").empty();
					$("#MOU").empty();
					$("#AGE").empty();
					$("#TERM_INFO").empty();
					 var sex = "";
						if(data.data.sex == "F"){
							 sex ="女"
						}else{
							sex ="男"
						}
					$("#SEX").css("color","#FFFFFF").text("性别:"+sex);
					$("#SCH_NAME").css("color","#FFFFFF").text(data.data.schName);
					$("#ARPU").css("color","#FFFFFF").text("月均ARPU值为:"+data.data.arpu+"元");
					$("#DOU").css("color","#FFFFFF").text("使用流量较高:"+data.data.dou+"G左右");
					$("#MOU").text("月均通话时长:"+data.data.mou+"分钟");
					$("#AGE").css("color","#FFFFFF").text("年龄:"+data.data.age);
					$("#TERM_INFO").css("color","#FFFFFF").text("终端偏好:"+data.data.termInfo);
				}
			}
	   
	   })
}
var reloadBasicUnitJqGrid = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
		statisMonth = $("#dv_date").val();
	if(statisMonth == undefined){
		statisMonth = "";
	}
	contractType = $("#contractType").find("option:selected").val();
	if(contractType =="请选择..."){
		contractType = "";
	}
	stockAdditions = $("#stockAdditions").find("option:selected").val();
	if(stockAdditions =="请选择..."){
		stockAdditions = "";
	}
	incomeFiling = $("#incomeFiling").find("option:selected").val();
	if(incomeFiling =="请选择..."){
		incomeFiling = "";
	}
	appFiling = $("#APPFiling").find("option:selected").val();
	if(appFiling =="请选择..."){
		appFiling = "";
	}
	taocanFiling = $("#taocanFiling").find("option:selected").val();
	if(taocanFiling =="请选择..."){
		taocanFiling = "";
	}
	flowFiling = $("#flowFiling").find("option:selected").val();
	if(flowFiling =="请选择..."){
		flowFiling = "";
	}
	phoneticFiling = $("#phoneticFiling").find("option:selected").val();
	if(phoneticFiling =="请选择..."){
		phoneticFiling = "";
	}
	var schoolId= $("#sch_id").text();
	$("#YHHXTable").jqGrid().setGridParam(
			{
				datatype:'json',
				 postData : {
				       	statisMonth :statisMonth,
				       	schId:schoolId,
				       	actviTypeId : contractType,
				       	usrType : stockAdditions,
				       	feeLevelId :incomeFiling,
				       	gprsLevelId : flowFiling,
				       	voiceLevelId :phoneticFiling,
				       	appTypeId:appFiling,
				       	discFeeId:taocanFiling
				       }
					}).trigger('reloadGrid');
}
function initDate(){
	var lastMonth = "";
	//上月
	$("#dv_date").datepicker({
 		language : "zh-CN",
		todayHighlight : true,
		format : 'yyyymm',
		autoclose : true,
		startView : 'months',
		maxViewMode : 'years',
		minViewMode : 'months'
	});
	$.ajax({
		url : $.cxt + "/gridSchoolInfo/findByDate", 
		type: "POST",
		data:{
		}, 
		async : false,
		success : function(data) {
			var json = JSON.parse(data);
			if(json.code == '0'){
				lastMonth = json.msg
				$("#dv_date").val(lastMonth);
			}
		}
	})
}

function initContractType(){
	$.ajax({
		url : $.cxt + "/gridSchoolInfo/findContractType", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#contractType").empty();
				$("#contractType").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#contractType").append(
							$("<option>"+data.data[i].ACTVI_TYPE+"</option>").val(data.data[i].ACTVI_TYPE_ID)
					)
				}
			}
		}
	})
}
function initStockAdditions(){
	$.ajax({
		url : $.cxt + "/gridSchoolInfo/findStockAdditions", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#stockAdditions").empty();
				$("#stockAdditions").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#stockAdditions").append(
							$("<option>"+data.data[i].USR_TYPE+"</option>").val(data.data[i].TYPE_ID)
					)
				}
			}
		}
	})
}
function initIncomeFiling(){
	$.ajax({
		url : $.cxt + "/gridSchoolInfo/findIncomeFiling", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#incomeFiling").empty();
				$("#incomeFiling").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#incomeFiling").append(
							$("<option>"+data.data[i].FEE_LEVEL+"</option>").val(data.data[i].FEE_LEVEL_ID)
					)
				}
			}
		}
	})
}

function initAPPFiling(){
	$.ajax({
		url : $.cxt + "/gridSchoolInfo/findAPPFiling", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#APPFiling").empty();
				$("#APPFiling").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#APPFiling").append(
							$("<option>"+data.data[i].APP_TYPE_NAME+"</option>").val(data.data[i].APP_TYPE_ID)
					)
				}
			}
		}
	})
}

function initTaocanFiling(){
	$.ajax({
		url : $.cxt + "/gridSchoolInfo/findTaocanFiling", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#taocanFiling").empty();
				$("#taocanFiling").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#taocanFiling").append(
							$("<option>"+data.data[i].DISC_FEE_NAME+"</option>").val(data.data[i].DISC_FEE_ID)
					)
				}
			}
		}
	})
}

function initFlowFiling(){
	$.ajax({
		url : $.cxt + "/gridSchoolInfo/findFlowFiling", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#flowFiling").empty();
				$("#flowFiling").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#flowFiling").append(
							$("<option>"+data.data[i].GPRS_LEVEL+"</option>").val(data.data[i].GPRS_LEVEL_ID)
					)
				}
			}
		}
	})
}
function initPhoneticFiling(){
	$.ajax({
		url : $.cxt + "/gridSchoolInfo/findPhoneticFiling", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#phoneticFiling").empty();
				$("#phoneticFiling").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#phoneticFiling").append(
							$("<option>"+data.data[i].VOICE_LEVEL+"</option>").val(data.data[i].VOICE_LEVEL_ID)
					)
				}
			}
		}
	})
}
function setNiceScroll(){
	/*$(".ui-jqgrid-bdiv").scrollBar({
	    barWidth: 6, //滚动条的宽度(这里根据需要写数值即可，不设置是10,即默认10px)
	    position: "x,y", //写“x”代表只出水平滚动条，写“y”表示只出垂直滚动条，写“x,y”则出水平和垂直滚动条（只有在内容超出容器时才出现滚动条）
	    wheelDis: 15 //滚轮滚动一次向下或向上滚动的距离，默认是15，可根据需要修改数值
	});*/
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight:$(window).height()-190,
	    cursorcolor:"#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
}

//字体颜色修改
function addCellAttr(rowId, val, rawObject, cm, rdata) {
	return "style='color:white'";
}


function OverContent(){
	$(".channelBaseInfoR").hover(function(){
		var content = $(this).text();
		var contentLength = $(this).text().length;
		if(contentLength > 15 ){
			$(this).attr("title", content);
		}
	})
	
}


function strToNum(str){
	var num = Math.round(parseFloat(str) * 100);
	return num + "%";
}