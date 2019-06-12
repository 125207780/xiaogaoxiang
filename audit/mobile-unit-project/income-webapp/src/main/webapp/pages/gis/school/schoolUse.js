function userClick(value){
	
	topwindow.showWindow({
		//窗口名称  
		title : "校园使用排名",
		width : 1005,
		height:565,
		//url  
		data : {value : value},
		url :  $.cxt + "/pages/gis/school/useRanking.jsp",
		
	});
}


function schoolUseInit(schoolId){
	$.ajax({
		url : $.cxt + "/school/schoolUse",
		dataType : "json",
		type : "POST",
		data : {schoolId:schoolId},
		success : function(data){
			if(data){
				var use_ARPU = data.CMCC_SCH_ARPU;
				$("#use_ARPU").html(use_ARPU);
				var use_ARPUcycle = data.LM1_CMCC_SCH_ARPU_P;
				$("#use_ARPUcycle").html(strToNum(use_ARPUcycle));
				
				var use_ARPU_REAL_FEE = data.CMCC_SCH_ARPU_REAL_FEE;
				$("#use_ARPU_REAL_FEE").html(use_ARPU_REAL_FEE);
				var use_ARPU_REAL_FEEcycle = data.LM1_CMCC_SCH_ARPU_REAL_FEE_P;
				$("#use_ARPU_REAL_FEEcycle").html(strToNum(use_ARPU_REAL_FEEcycle));
				
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
					  {value:"03",name:"校园用户MOU"},
					  {value:"05",name:"校园用户ARPU(剔除折让后)"}];
	
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
			url : $.cxt + "/school/useEchart",
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
			         //orient: 'vertical',
			         top:5,
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
		             radius : '70%',
		             center : ['50%', '58%'],
		             itemStyle: {
		                 normal: {
		                     label: {
		                         textStyle: {
		                             fontSize: 14,
		                             /*fontWeight:'bolder'*/
		                         }
		                     }
		                 }
		             },
		            /* roseType : 'area',*/
		             data:result,
		             color:[
	                          '#1E90FF','#87CEFA','#CD3333','#B8860B','#9AFF9A',
	                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
	                           '#D7504B','#C6E579','#a64d79','#073763','#274e13',
	                           '#a14f4f','#b93232'
			                   ],
			        }
			    ]
		}
		mycharts.clear();
		mycharts.resize();
		mycharts.setOption(option);
	}
	
}


function strToNum(str){
	var num = Math.round(parseFloat(str) * 100);
	return num + "%";
}