function filterClick(value){

	topwindow.showWindow({
		//窗口名称  
		title : "校园渗透率排名",
		width : 1005,
		height:565,
		//url  
		data : {value : value},
		url :  $.cxt + "/pages/gis/school/filterRanking.jsp",
		
	});
	
}



function schoolFilterInit(schoolId){
	
	$.ajax({
		url : $.cxt + "/school/schoolFilter",
		dataType : "json",
		type : "POST",
		data : {schoolId:schoolId},
		success : function(data){
			if(data){
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
	
	initFilterCharts(schoolId);
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
			url : $.cxt + "/school/filterEchart",
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
		mycharts.setOption(option);
		window.onresize = mycharts.resize;
	}
	
}


function strToNum(str){
	var num = Math.round(parseFloat(str) * 100);
	return num + "%";
}
