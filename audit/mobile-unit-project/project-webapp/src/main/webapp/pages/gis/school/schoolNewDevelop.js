function newClick(value){
	 
	topwindow.showWindow({
		//窗口名称  
		title : "校园新发展排名",
		width : 1005,
		height:565,
		//url  
		data : {value : value},
		url :  $.cxt + "/pages/gis/school/newDevelopRanking.jsp",
		
	});
}

function schoolNewDevelopInit(schoolId){

	$.ajax({
		url : $.cxt + "/school/schoolNewDevelop",
		dataType : "json",
		type : "POST",
		data : {schoolId:schoolId},
		success : function(data){
			if(data){
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
			url : $.cxt + "/school/newEchart",
			dataType : "json",
			type : "POST",
			async:false,
			data : {selected:val,schoolId:schoolId},
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


function strToNum(str){
	var num = Math.round(parseFloat(str) * 100);
	return num + "%";
}