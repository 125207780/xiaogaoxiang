var gridData=[];
var selectArr=[];
var flag4=true;//用于自定义行数据的  因为自己添加的行数据也会调用这个函数
var cmcc='1';
$(function(){
	//上月
	var now = new Date();
	now.setTime(now.getTime()-24*60*60*1000);
	var year = now.getFullYear();
	var month = now.getMonth();
    month = month ;
    if (month < 10) 
 	   month = "0" + month;
 	var lastMonth = year.toString()+ month.toString();
 	$("#AccountPeriod").datepicker({
 		language : "zh-CN",
		todayHighlight : true,
		format : 'yyyymm',
		autoclose : true,
		startView : 'months',
		maxViewMode : 'years',
		minViewMode : 'months',
		onSelect:accountPeriodDate
	}).on('changeDate',accountPeriodDate);
	$("#AccountPeriod").val(lastMonth);
	
	/*
	$("#uploadEntry").click(function(){
		uploadWindow("暂无上传权限")
	})*/
	
	function uploadWindow(message){
		bootbox.dialog({
	        message: "<span style=\"color:#171414\">"+message+"</span>",
	        title: "消息提示",
	        buttons: {
	            OK: {
	                label: "确定",
	                className: "btn-success",
	            }
	        }
	    });
	}
	
	fileDetailListGrid()//帮助中心
	userDetail()//帮助中心的联系人信息
	findOAUserInfo()//查询当前联系人OA信息
	
	$("#improtFile").click(function(){
		$('#myModal1').modal('hide');
		importVal();
	});
	$("#myModal1Close").click(function(){
		$('#myModal1').modal('hide');
	});
	$('#helpCenterFile').ace_file_input({
		no_file:'没有文件 ...',
		btn_choose:'选择',
		btn_change:'转换',
		droppable:false,
		onchange:null,
		thumbnail:false // | true | large
		// whitelist:'gif|png|jpg|jpeg'
		// blacklist:'exe|php'
		// onchange:''
		//
	});
	
	var opOption = {
			"PoiLayer":  BMapLib.SchoolLayer,
			  "ChannelLayer":false,
			  "StationLayer":false,
			 "AreaLayer" :BMapLib.CityLayer,
			 "SearchControl":BMapLib.SearchSchoolControl,
			 "GridLayer":false
	}
	//initGridTable();
	var  emap = showEmap(orgId,"main",callBack,{},opOption);
	var mapOrgId = orgId;
	var mapObj = null;
	var mapLevel = null;
	function callBack(_orgId,orgLevel){
		mapLevel = orgLevel;
		mapOrgId = _orgId;
		  if(orgLevel=="4"){//当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
			  
		   }else{
			  
			   if(orgLevel=="3"){
				   $("#leftpanel").hide();
				   $("#rightpanel").hide();
				   $("#main").css("width","100%");
				   mapObj=this.next();
				 
			   }else if(orgLevel=="2"){
				   $("#leftpanel").show();
				   $("#rightpanel").show();
				   $("#main").css("width","40%");
				   $("#leftpanel").css("width","25%");
				   mapObj=this.next();
				   initLeftCityTable(mapOrgId);
				   areaGaoxiaoNum(mapOrgId)
				   initGridAreaTable();
				   getLocalAreaData(mapOrgId);
//				   getLocalData();
				   //QUERY DISHI
			   }else if(orgLevel=="1"){
				   $("#leftpanel").show();
				   $("#rightpanel").show();
				   $("#main").css("width","40%");
				   $("#leftpanel").css("width","25%");
				   $("#rightpanel").css("width","35%");
				   mapObj=this.next();
				   //QUERY SHENG
				   initGridTable();
				   initLeftTable();
				   getLocalData();
				   cityGaoxiaoNum()
			   }
			  
		   }
	}
	
	
	$(".gridClick").on("click", function(){
		
		if(mapLevel == '1'){
			 var a=['RANK','AREA_NAME','CMCC_SCH_USERS','CMCC_P',
			    	   'RANK1','UNI_SCH_USERS','SCH_USERS_P',
			    	   'RANK2','TELE_SCH_USERS','TELE_SCH_USERS_P',
			    	   'RANK3','CMCC_SCH_KD_USERS','CMCC_SCH_KD_USERS_P',
			    	   'RANK4','CMCC_SCH_UNLIM_USERS','CMCC_SCH_UNLIM_USERS_P',
			    	   'RANK5','CMCC_SCH_ACTIV_USERS','CMCC_SCH_ACTIV_USERS_P',
			    	   'RANK6','CMCC_SCH_VNET_USERS','CMCC_SCH_VNET_USERS_P'
			    	   ];
			    $("#gridInfoListGrid").jqGrid( 'hideCol', a);
			var flag= $(this).attr("id");
			if(flag=='cmcc_sch_user'){
				$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK','AREA_NAME','CMCC_SCH_USERS','CMCC_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
				
			}
	        if(flag=='unit_sch_user'){
	        	$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK1','AREA_NAME','UNI_SCH_USERS','SCH_USERS_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
			}
	        if(flag=='tele_sch_user'){
	        	$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK2','AREA_NAME','TELE_SCH_USERS','TELE_SCH_USERS_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
			}
	        if(flag=='cmcc_sch_kd'){
	        	$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK3','AREA_NAME','CMCC_SCH_KD_USERS','CMCC_SCH_KD_USERS_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
	        }
	        if(flag=='cmcc_sch_unlim'){
	        	$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK4','AREA_NAME','CMCC_SCH_UNLIM_USERS','CMCC_SCH_UNLIM_USERS_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
			}
	        if(flag=='cmcc_sch_hy'){
	        	$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK5','AREA_NAME','CMCC_SCH_ACTIV_USERS','CMCC_SCH_ACTIV_USERS_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
			}
	        if(flag=='cmcc_sch_v'){
	        	$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK6','AREA_NAME','CMCC_SCH_VNET_USERS','CMCC_SCH_VNET_USERS_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
	        }
		}else if(mapLevel == '2'){
			 var a=['RANK','CNTY_NAME','CMCC_SCH_USERS','CMCC_P',
			    	   'RANK1','UNI_SCH_USERS','SCH_USERS_P',
			    	   'RANK2','TELE_SCH_USERS','TELE_SCH_USERS_P',
			    	   'RANK3','CMCC_SCH_KD_USERS','CMCC_SCH_KD_USERS_P',
			    	   'RANK4','CMCC_SCH_UNLIM_USERS','CMCC_SCH_UNLIM_USERS_P',
			    	   'RANK5','CMCC_SCH_ACTIV_USERS','CMCC_SCH_ACTIV_USERS_P',
			    	   'RANK6','CMCC_SCH_VNET_USERS','CMCC_SCH_VNET_USERS_P'
			    	   ];
			    $("#gridInfoListGrid").jqGrid( 'hideCol', a);
			var flag= $(this).attr("id");
			if(flag=='cmcc_sch_user'){
				$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK','CNTY_NAME','CMCC_SCH_USERS','CMCC_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
				
			}
	        if(flag=='unit_sch_user'){
	        	$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK1','CNTY_NAME','UNI_SCH_USERS','SCH_USERS_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
			}
	        if(flag=='tele_sch_user'){
	        	$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK2','CNTY_NAME','TELE_SCH_USERS','TELE_SCH_USERS_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
			}
	        if(flag=='cmcc_sch_kd'){
	        	$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK3','CNTY_NAME','CMCC_SCH_KD_USERS','CMCC_SCH_KD_USERS_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
	        }
	        if(flag=='cmcc_sch_unlim'){
	        	$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK4','CNTY_NAME','CMCC_SCH_UNLIM_USERS','CMCC_SCH_UNLIM_USERS_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
			}
	        if(flag=='cmcc_sch_hy'){
	        	$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK5','CNTY_NAME','CMCC_SCH_ACTIV_USERS','CMCC_SCH_ACTIV_USERS_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
			}
	        if(flag=='cmcc_sch_v'){
	        	$("#gridInfoListGrid").jqGrid( 'hideCol', a);
				var c=['RANK6','CNTY_NAME','CMCC_SCH_VNET_USERS','CMCC_SCH_VNET_USERS_P'];
				$("#gridInfoListGrid").jqGrid( 'showCol', c);
	        }
		}
		   
		
		});
		function accountPeriodDate(){
			var valueDate = $(this).val();
			if(mapLevel=="1"){
				initLeftTable()
				getLocalData()
			}else if(mapLevel == "2"){
				initLeftCityTable(mapOrgId)
			}
		}
		
		var cityGaoxiaoNum = function(){
			var schlDataList = []
			var lastMonth = $("#AccountPeriod").val();
			$.ajax({
				url : $.cxt + "/schoolMap/getCityGaoxiaoNum", 
				type: "POST",
				data:{
					statisMonth:lastMonth
				}, 
				async : false,
				success : function(data) {
					var json = JSON.parse(data);
					if(json.code == '0'){
						schlDataList = json.data
					}
				}
			})
			var data = []
			var option = mapObj.getOption();
			option.tooltip = 
			{
					trigger: 'item',
					formatter: function (params) {
						if(typeof(params.data.value) == "undefined"){
							return params.data.name + ' : ' + '无数据';
						}else{
							return params.data.name + ' : ' + params.data.value[2];
						}
					}
			};

			var mapId= mapObj.mapId;
			var cityList = echarts.getMap(mapId).geoJson.features;
			for(var i=0,k=cityList.length;i<k;i++){
				var tmpObj=cityList[i].properties;
				for(var j=0;j<schlDataList.length;j++){
					if(tmpObj.id==schlDataList[j].AREA_CITY_ID){
						data.push({
							"name":tmpObj.name,
							"value":tmpObj.cp.concat(schlDataList[j].SCH_N)
						})
					}
				}
			}
			var colorMap = {
					type: 'map',
					geoIndex:0,
					data: data
			}	
			option.series = [];
			option.series.push(colorMap);
			mapObj.clear();
			mapObj.setOption(option);
		}

		var areaGaoxiaoNum = function(orgId){
			var schlDataList = []
			var lastMonth = $("#AccountPeriod").val();
			$.ajax({
				url : $.cxt + "/schoolMap/getAreaGaoxiaoNum", 
				type: "POST",
				data:{
					orgId:orgId,
					statisMonth:lastMonth
				}, 
				async : false,
				success : function(data) {
					var json = JSON.parse(data);
					if(json.code == '0'){
						schlDataList = json.data
					}
				}
			})
			var data = []
			var option = mapObj.getOption();
			option.tooltip = 
			{
					trigger: 'item',
					formatter: function (params) {
						if(typeof(params.data.value) == "undefined"){
							return params.data.name + ' : ' + '无数据';
						}else{
							return params.data.name + ' : ' + params.data.value[2];
						}
					}
			};

			var mapId= mapObj.mapId;
			var cityList = echarts.getMap(mapId).geoJson.features;
			for(var i=0,k=cityList.length;i<k;i++){
				var tmpObj=cityList[i].properties;
				for(var j=0;j<schlDataList.length;j++){
					if(tmpObj.id==schlDataList[j].CNTY_ID){
						data.push({
							"name":tmpObj.name,
							"value":tmpObj.cp.concat(schlDataList[j].SCH_N)
						})
					}
				}
			}
			var colorMap = {
					type: 'map',
					geoIndex:0,
					data: data
			}	
			option.series = [];
			option.series.push(colorMap);
			mapObj.clear();
			mapObj.setOption(option);
		}
});
function initLeftTable(){
	var lastMonth = $("#AccountPeriod").val();
	gaoxiaoClick(lastMonth)
	$.ajax({
		url : $.cxt + "/schoolMap/getMapLeft",
		type: "POST",
		data:{
			statisMonth:lastMonth
		},
		async : false,
		success: function(json){
			var data  = JSON.parse(json);
			if(data.code == '0'){
				var map=data.data;
				/*$("#schP_gaoxiao").append(map.SCH_N);
				$("#schP_benke").append(map.B_SCH);
				$("#schP_zhuanke").append(map.Z_SCH);
				$("#sch_user_num").append(map.TELE_SCH_USERS);
				$("#cmcc_user").append(map.CMCC_SCH_USERS);
				$("#cmcc_rate").append(strToNum(map.CMCC_P));
				$("#UNI_SCH_USERS").append(map.UNI_SCH_USERS);
				$("#uni_rate").append(strToNum(map.SCH_USERS_P));
				$("#tele_user").append(map.TELE_SCH_USERS);
				$("#tele_rate").append(strToNum(map.TELE_SCH_USERS_P));
				$("#cmcc_kd_user").append(map.CMCC_SCH_KD_USERS);
				$("#cmcc_kd_rate").append(strToNum(map.CMCC_SCH_KD_USERS_P));
				$("#cmcc_unlim_user").append(map.CMCC_SCH_UNLIM_USERS);
				$("#cmcc_unlim_rate").append(strToNum(map.CMCC_SCH_UNLIM_USERS_P));
				$("#cmcc_hy_user").append(map.CMCC_SCH_ACTIV_USERS);
				$("#cmcc_hy_rate").append(strToNum(map.CMCC_SCH_ACTIV_USERS_P));
				$("#cmcc_v_user").append(map.CMCC_SCH_VNET_USERS);
				$("#cmcc_v_rate").append(strToNum(map.CMCC_SCH_VNET_USERS_P));
				$("#arpu").append(map.CMCC_SCH_FEE);
				$("#mou").append(map.CMCC_SCH_CALL_DURATION);
				$("#dou").append(map.CMCC_SCH_GPRS);
				$("#this_month_del").append(map.CMCC_SCH_DEV_USERS);
				$("#this_month_unlim").append(map.CMCC_SCH_UNLIM_DEV_USERS);
				$("#this_month_kd").append(map.CMCC_SCH_KD_DEV_USERS);
				$("#this_month_hy").append(map.CMCC_SCH_ACTIV_DEV_USERS);*/
				$("#schP_gaoxiao").empty();
				$("#schP_gaoxiao").append('&nbsp;'+'<a href="#">'+map.SCH_N+'</a>');
				$("#schP_benke").empty();
				$("#schP_benke").append('&nbsp;'+map.B_SCH);
				$("#schP_zhuanke").empty();
				$("#schP_zhuanke").append('&nbsp;'+map.Z_SCH);
				$("#sch_user_num").empty();
				$("#sch_user_num").append('校园用户数:'+map.TELE_SCH_USERS);
				$("#cmcc_user").empty();
				$("#cmcc_user").append('移动校园用户:'+map.CMCC_SCH_USERS);
				$("#cmcc_rate").empty();
				$("#cmcc_rate").append('市场占有率:'+strToNum(map.CMCC_P));
				$("#UNI_SCH_USERS").empty();
				$("#UNI_SCH_USERS").append('联通校园用户:'+map.UNI_SCH_USERS);
				$("#uni_rate").empty();
				$("#uni_rate").append('市场占有率:'+strToNum(map.SCH_USERS_P));
				$("#tele_user").empty();
				$("#tele_user").append('电信校园用户:'+map.TELE_SCH_USERS);
				$("#tele_rate").empty();
				$("#tele_rate").append('市场占有率:'+strToNum(map.TELE_SCH_USERS_P));
				$("#cmcc_kd_user").empty();
				$("#cmcc_kd_user").append('移动校园宽带用户:'+map.CMCC_SCH_KD_USERS);
				$("#cmcc_kd_rate").empty();
				$("#cmcc_kd_rate").append('渗透率:'+strToNum(map.CMCC_SCH_KD_USERS_P));
				$("#cmcc_unlim_user").empty();
				$("#cmcc_unlim_user").append('移动校园不限量用户:'+map.CMCC_SCH_UNLIM_USERS);
				$("#cmcc_unlim_rate").empty();
				$("#cmcc_unlim_rate").append('渗透率:'+strToNum(map.CMCC_SCH_UNLIM_USERS_P));
				$("#cmcc_hy_user").empty();
				$("#cmcc_hy_user").append('移动校园合约用户:'+map.CMCC_SCH_ACTIV_USERS);
				$("#cmcc_hy_rate").empty();
				$("#cmcc_hy_rate").append('渗透率:'+strToNum(map.CMCC_SCH_ACTIV_USERS_P));
				$("#cmcc_v_user").empty();
				$("#cmcc_v_user").append('移动校园V网用户:'+map.CMCC_SCH_VNET_USERS);
				$("#cmcc_v_rate").empty();
				$("#cmcc_v_rate").append('渗透率:'+strToNum(map.CMCC_SCH_VNET_USERS_P));
				$("#arpu").empty();
				$("#arpu").append('移动校园用户ARPU:'+parseFloat(map.CMCC_SCH_FEE).toFixed(2));
				$("#mou").empty();
				$("#mou").append('移动校园用户MOU:'+parseFloat(map.CMCC_SCH_CALL_DURATION).toFixed(2));
				$("#dou").empty();
				$("#dou").append('移动校园用户DOU:'+parseFloat(map.CMCC_SCH_GPRS).toFixed(2));
				$("#this_month_del").empty();
				$("#this_month_del").append('本月累计发展校园用户:'+map.CMCC_SCH_DEV_USERS);
				$("#this_month_unlim").empty();
				$("#this_month_unlim").append('本月累计发展校园不限量:'+map.CMCC_SCH_UNLIM_DEV_USERS);
				$("#this_month_kd").empty();
				$("#this_month_kd").append('本月累计发展校园宽带用户:'+map.CMCC_SCH_KD_DEV_USERS);
				$("#this_month_hy").empty();
				$("#this_month_hy").append('本月累计发展合约用户:'+map.CMCC_SCH_ACTIV_DEV_USERS);
			}
		}
	})
	
	
}
function initLeftCityTable(mapOrgId){
	var lastMonth = $("#AccountPeriod").val();
	cityGaoxiaoClick(mapOrgId,lastMonth);
	$.ajax({
		url : $.cxt + "/schoolMap/getMapCityLeft",
		type: "POST",
		data:{
			mapOrgId:mapOrgId,
			statisMonth:lastMonth
		},
		async : false,
		success: function(json){
			var data  = JSON.parse(json);
			if(data.code == '0'){
				var map=data.data;
				$("#schP_gaoxiao").empty();
				$("#schP_gaoxiao").append('&nbsp;'+'<a href="#">'+map.SCH_N+'</a>');
				$("#schP_benke").empty();
				$("#schP_benke").append('&nbsp;'+map.B_SCH);
				$("#schP_zhuanke").empty();
				$("#schP_zhuanke").append('&nbsp;'+map.Z_SCH);
				$("#sch_user_num").empty();
				$("#sch_user_num").append('校园用户数:'+map.TELE_SCH_USERS);
				$("#cmcc_user").empty();
				$("#cmcc_user").append('移动校园用户:'+map.CMCC_SCH_USERS);
				$("#cmcc_rate").empty();
				$("#cmcc_rate").append('市场占有率:'+strToNum(map.CMCC_P));
				$("#UNI_SCH_USERS").empty();
				$("#UNI_SCH_USERS").append('联通校园用户:'+map.UNI_SCH_USERS);
				$("#uni_rate").empty();
				$("#uni_rate").append('市场占有率:'+strToNum(map.SCH_USERS_P));
				$("#tele_user").empty();
				$("#tele_user").append('电信校园用户:'+map.TELE_SCH_USERS);
				$("#tele_rate").empty();
				$("#tele_rate").append('市场占有率:'+strToNum(map.TELE_SCH_USERS_P));
				$("#cmcc_kd_user").empty();
				$("#cmcc_kd_user").append('移动校园宽带用户:'+map.CMCC_SCH_KD_USERS);
				$("#cmcc_kd_rate").empty();
				$("#cmcc_kd_rate").append('渗透率:'+strToNum(map.CMCC_SCH_KD_USERS_P));
				$("#cmcc_unlim_user").empty();
				$("#cmcc_unlim_user").append('移动校园不限量用户:'+map.CMCC_SCH_UNLIM_USERS);
				$("#cmcc_unlim_rate").empty();
				$("#cmcc_unlim_rate").append('渗透率:'+strToNum(map.CMCC_SCH_UNLIM_USERS_P));
				$("#cmcc_hy_user").empty();
				$("#cmcc_hy_user").append('移动校园合约用户:'+map.CMCC_SCH_ACTIV_USERS);
				$("#cmcc_hy_rate").empty();
				$("#cmcc_hy_rate").append('渗透率:'+strToNum(map.CMCC_SCH_ACTIV_USERS_P));
				$("#cmcc_v_user").empty();
				$("#cmcc_v_user").append('移动校园V网用户:'+map.CMCC_SCH_VNET_USERS);
				$("#cmcc_v_rate").empty();
				$("#cmcc_v_rate").append('渗透率:'+strToNum(map.CMCC_SCH_VNET_USERS_P));
				$("#arpu").empty();
				$("#arpu").append('移动校园用户ARPU:'+parseFloat(map.CMCC_SCH_FEE).toFixed(2));
				$("#mou").empty();
				$("#mou").append('移动校园用户MOU:'+parseFloat(map.CMCC_SCH_CALL_DURATION).toFixed(2));
				$("#dou").empty();
				$("#dou").append('移动校园用户DOU:'+parseFloat(map.CMCC_SCH_GPRS).toFixed(2));
				$("#this_month_del").empty();
				$("#this_month_del").append('本月累计发展校园用户:'+map.CMCC_SCH_DEV_USERS);
				$("#this_month_unlim").empty();
				$("#this_month_unlim").append('本月累计发展校园不限量:'+map.CMCC_SCH_UNLIM_DEV_USERS);
				$("#this_month_kd").empty();
				$("#this_month_kd").append('本月累计发展校园宽带用户:'+map.CMCC_SCH_KD_DEV_USERS);
				$("#this_month_hy").empty();
				$("#this_month_hy").append('本月累计发展合约用户:'+map.CMCC_SCH_ACTIV_DEV_USERS);
			}
		}
	})
	
	
}

function getLocalAreaData(mapOrgId){
	var lastMonth = $("#AccountPeriod").val();
	$.ajax({
		url : $.cxt + "/schoolMap/getMapRightArea",
		type: "POST",
		data:{
			orgId:mapOrgId,
			statisMonth:lastMonth
		},
		async : false,
		success: function(json){
			var data  = JSON.parse(json);
			console.log(data)
			if(data.code == '0'){
				gridAreaData=data.data;
				//console.log(gridData);
				$("#gridInfoListGrid").jqGrid('clearGridData');
				for ( var i = 0; i <= gridAreaData.length; i++){
				    $("#gridInfoListGrid").jqGrid('addRowData', i+1, gridAreaData[i]);
				  }
			}
		}
	})
	
	
}

function initGridAreaTable(){
	   $("#gridInfoListGrid").jqGrid('clearGridData');
	   $("#gridInfoListGrid").jqGrid('GridUnload');
	   $('#gridInfoListGrid').jqGrid({
		    //url : $.cxt + "/schoolMap/getMapRight",
		    datatype : "local",
			//mtype : "POST",
			postData : {},
			autowidth : false,
			height:($("#rightpanel").height()-50),
			colNames: [ '排名','排名','排名','排名','排名','排名','排名','区县','移动校园用户数','市场占有率'
				        ,'联通校园用户数','市场占有率'
				        ,'电信校园用户数','市场占有率'
				        ,'移动校园宽带用户','渗透率'
				        ,'移动校园不限量用户','渗透率'
				        ,'移动校园合约用户数','渗透率'
				        ,'移动校园V网用户','渗透率'
				       ],
			//colNames:colNames, 
			colModel: [ 
				 { name: 'RANK', index: 'RANK', align: 'center' ,sortable : false,width:80},
				 { name: 'RANK1', index: 'RANK1', align: 'center' ,hidden:true ,sortable : false,width:80},
				 { name: 'RANK2', index: 'RANK2', align: 'center',hidden:true ,sortable : false,width:80},
				 { name: 'RANK3', index: 'RANK3', align: 'center',hidden:true ,sortable : false,width:80},
				 { name: 'RANK4', index: 'RANK4', align: 'center',hidden:true ,sortable : false,width:80},
				 { name: 'RANK5', index: 'RANK5', align: 'center',hidden:true ,sortable : false,width:80},
				 { name: 'RANK6', index: 'RANK6', align: 'center',hidden:true ,sortable : false,width:80},
				 { name: 'CNTY_NAME', index: 'CNTY_NAME', align: 'center',sortable : false,width:125},
				 { name: 'CMCC_SCH_USERS', index: 'CMCC_SCH_USERS', align: 'center',sortable : false,width:125},
				 { name: 'CMCC_P', index: 'CMCC_P', align: 'center',sortable : false,formatter:strToNum,width:125},
				 { name: 'UNI_SCH_USERS', index: 'UNI_SCH_USERS', align: 'center',sortable : false,hidden:true,width:125},
				 { name: 'SCH_USERS_P', index: 'SCH_USERS_P', align: 'center',sortable : false,hidden:true,formatter:strToNum,width:125},
				 { name: 'TELE_SCH_USERS', index: 'TELE_SCH_USERS', align: 'center',sortable : false,hidden:true,width:125},
				 { name: 'TELE_SCH_USERS_P', index: 'TELE_SCH_USERS_P', align: 'center',sortable : false,hidden:true,formatter:strToNum,width:125},
				 { name: 'CMCC_SCH_KD_USERS', index: 'CMCC_SCH_KD_USERS', align: 'center',sortable : false,hidden:true,width:125},
				 { name: 'CMCC_SCH_KD_USERS_P', index: 'CMCC_SCH_KD_USERS_P', align: 'center',sortable : false,hidden:true,formatter:strToNum,width:125},
				 { name: 'CMCC_SCH_UNLIM_USERS', index: 'CMCC_SCH_UNLIM_USERS', align: 'center',sortable : false,hidden:true,width:125},
				 { name: 'CMCC_SCH_UNLIM_USERS_P', index: 'CMCC_SCH_UNLIM_USERS_P', align: 'center',sortable : false,hidden:true,formatter:strToNum,width:125},
				 { name: 'CMCC_SCH_ACTIV_USERS', index: 'CMCC_SCH_ACTIV_USERS', align: 'center',sortable : false,hidden:true,width:125},
				 { name: 'CMCC_SCH_ACTIV_USERS_P', index: 'CMCC_SCH_ACTIV_USERS_P', align: 'center',sortable : false,hidden:true,formatter:strToNum,width:125},
				 { name: 'CMCC_SCH_VNET_USERS', index: 'CMCC_SCH_VNET_USERS', align: 'center',sortable : false,hidden:true,width:125},
				 { name: 'CMCC_SCH_VNET_USERS_P', index: 'CMCC_SCH_VNET_USERS_P', align: 'center',sortable : false,hidden:true,formatter:strToNum,width:125}
			  	       
			  	   ], 
			//colModel: colModel, 
			sortable:true,
			//shrinkToFit:false,
			shrinkToFit:false,
			//sortorder:'desc', 
			//sortname:'RANK5',
			viewrecords : true,
			rownumbers: false,
			rowNum : 15,
			rowList : [15],
			//pager : '#gridInfoListPagers',
			/*gridComplete: function() { 
				for ( var i = 0; i <= gridData.length; i++){
				    $("#gridInfoListGrid").jqGrid('addRowData', i + 1, gridData[i]);
				  }
			  } ,*/
			loadComplete : function() { 
//				console.log(gridData)
//				if(flag1){
				
//				}
//				flag1=false;
			  } ,
		});
	   
		
}

function getLocalData(){
	var lastMonth = $("#AccountPeriod").val();
	$.ajax({
		url : $.cxt + "/schoolMap/getMapRight",
		type: "POST",
		data:{
			statisMonth:lastMonth
		},
		async : false,
		success: function(json){
			var data  = JSON.parse(json);
			if(data.code == '0'){
				gridData=data.data;
				//console.log(gridData);
				$("#gridInfoListGrid").jqGrid('clearGridData');
				for ( var i = 0; i <= gridData.length; i++){
				    $("#gridInfoListGrid").jqGrid('addRowData', i+1, gridData[i]);
				  }
			}
		}
	})
	
	
}
function initGridTable(){
	   $("#gridInfoListGrid").jqGrid('clearGridData');
	   $("#gridInfoListGrid").jqGrid('GridUnload');
	   $('#gridInfoListGrid').jqGrid({
		    //url : $.cxt + "/schoolMap/getMapRight",
		    datatype : "local",
			//mtype : "POST",
			postData : {},
			autowidth : false,
			height:($("#rightpanel").height()-50),
			colNames: [ '排名','排名','排名','排名','排名','排名','排名','地市','移动校园用户数','市场占有率'
				        ,'联通校园用户数','市场占有率'
				        ,'电信校园用户数','市场占有率'
				        ,'移动校园宽带用户','渗透率'
				        ,'移动校园不限量用户','渗透率'
				        ,'移动校园合约用户数','渗透率'
				        ,'移动校园V网用户','渗透率'
				       ],
			//colNames:colNames, 
			colModel: [ 
				 { name: 'RANK', index: 'RANK', align: 'center' ,sortable : false,width:80},
				 { name: 'RANK1', index: 'RANK1', align: 'center' ,hidden:true ,sortable : false,width:80},
				 { name: 'RANK2', index: 'RANK2', align: 'center',hidden:true ,sortable : false,width:80},
				 { name: 'RANK3', index: 'RANK3', align: 'center',hidden:true ,sortable : false,width:80},
				 { name: 'RANK4', index: 'RANK4', align: 'center',hidden:true ,sortable : false,width:80},
				 { name: 'RANK5', index: 'RANK5', align: 'center',hidden:true ,sortable : false,width:80},
				 { name: 'RANK6', index: 'RANK6', align: 'center',hidden:true ,sortable : false,width:80},
				 { name: 'AREA_NAME', index: 'AREA_NAME', align: 'center',sortable : false,width:125},
				 { name: 'CMCC_SCH_USERS', index: 'CMCC_SCH_USERS', align: 'center',sortable : false,width:125},
				 { name: 'CMCC_P', index: 'CMCC_P', align: 'center',sortable : false,formatter:strToNum,width:125},
				 { name: 'UNI_SCH_USERS', index: 'UNI_SCH_USERS', align: 'center',sortable : false,hidden:true,width:125},
				 { name: 'SCH_USERS_P', index: 'SCH_USERS_P', align: 'center',sortable : false,hidden:true,formatter:strToNum,width:125},
				 { name: 'TELE_SCH_USERS', index: 'TELE_SCH_USERS', align: 'center',sortable : false,hidden:true,width:125},
				 { name: 'TELE_SCH_USERS_P', index: 'TELE_SCH_USERS_P', align: 'center',sortable : false,hidden:true,formatter:strToNum,width:125},
				 { name: 'CMCC_SCH_KD_USERS', index: 'CMCC_SCH_KD_USERS', align: 'center',sortable : false,hidden:true,width:125},
				 { name: 'CMCC_SCH_KD_USERS_P', index: 'CMCC_SCH_KD_USERS_P', align: 'center',sortable : false,hidden:true,formatter:strToNum,width:125},
				 { name: 'CMCC_SCH_UNLIM_USERS', index: 'CMCC_SCH_UNLIM_USERS', align: 'center',sortable : false,hidden:true,width:125},
				 { name: 'CMCC_SCH_UNLIM_USERS_P', index: 'CMCC_SCH_UNLIM_USERS_P', align: 'center',sortable : false,hidden:true,formatter:strToNum,width:125},
				 { name: 'CMCC_SCH_ACTIV_USERS', index: 'CMCC_SCH_ACTIV_USERS', align: 'center',sortable : false,hidden:true,width:125},
				 { name: 'CMCC_SCH_ACTIV_USERS_P', index: 'CMCC_SCH_ACTIV_USERS_P', align: 'center',sortable : false,hidden:true,formatter:strToNum,width:125},
				 { name: 'CMCC_SCH_VNET_USERS', index: 'CMCC_SCH_VNET_USERS', align: 'center',sortable : false,hidden:true,width:125},
				 { name: 'CMCC_SCH_VNET_USERS_P', index: 'CMCC_SCH_VNET_USERS_P', align: 'center',sortable : false,hidden:true,formatter:strToNum,width:125}
			  	       
			  	   ], 
			sortable:true,
			shrinkToFit:false,
			//sortorder:'desc', 
			//sortname:'RANK5',
			viewrecords : true,
			rownumbers: false,
			rowNum : 15,
			rowList : [15],
			loadComplete : function() { 
//				console.log(gridData)
//				if(flag1){
				
//				}
//				flag1=false;
			  } ,
		});
	   
		
}

function findOAUserInfo(){
	$.ajax({
		url : $.cxt +"/getReportForm/findByOaId",
		datatype : "json",
		type: "POST",
		data:{
			oaId:currentOaId
		},
		async : false,
		success:function(json){
			var data  = JSON.parse(json);
			if(data.code == '0'){
				if(data.data != '0'){
					
				}else{
					$(".deleteId").hide()
					$("#uploadEntry").hide()
				}
			}
		}
	})
}

function userDetail(){
	$.ajax({
		url : $.cxt +"/getReportForm/findByUser",
		datatype : "json",
		type: "POST",
		async : false,
		success: function(json){
			var data  = JSON.parse(json);
			if(data.code == '0'){
				$("#contacts").empty();
				$("#contactNumber").empty();
				$("#contacts").text("联系人:"+data.data.OA_NAME);
				$("#contactNumber").text("联系电话:"+data.data.MOBILE);
				}
			}
		
	})
}

function fileDetailListGrid(){
	 	$("#fileInfoListGrid").jqGrid('clearGridData');
	   $("#fileInfoListGrid").GridUnload();
	   grid = $("#fileInfoListGrid");
	   grid.jqGrid({
		   url : $.cxt + "/getReportForm/findFile",
		   datatype : "json",
		   mtype : "POST",
		   postData : {},
		   height : 200,
		   width:550,
		   autowidth : false,
		   colNames:['文件名称','文件路径','操作'],
		   colModel:[
		             { name: 'FILE_NAME', index: 'FILE_NAME',align: 'center', width:200},
		             { name: 'ADDRES', index: 'ADDRES',align: 'center', width:200}, 
		             {name : 'action',align : 'center',formatter:function(cellvalue, options, cell){
				    	  	var html = ""; 
				    	  	html += "<a onclick=\"findFileByFileName('" + cell.FILE_NAME + "')\" href=\"#\">下载</a>&nbsp;&nbsp;&nbsp;&nbsp;"
				    	  	html += "<a class='deleteId' onclick=\"deleteFile('" + cell.FILE_NAME + "')\" href=\"#\">删除</a>"
				    		return html;
				      }}
		             ],
		   shrinkToFit:false,
		   autoScroll: true,
		   viewrecords : true,
		   rownumbers: false,
		   rowNum : 10,
		   rowList : [ 10,20, 30 ],
		   viewrecords: false, 
		   pager : '#fileInfoListPagers',
		   loadComplete : function(){
			   topjqGridLoadComplete();
		   },
	   })
}

function importVal(){
	var param={};
	if($("#helpCenterFile").val()==""){
		//alert("请选择上传的数据文件");
		messageAlert("请选择上传的数据文件");
		return;
	}
	var fileExtension = $("#helpCenterFile").val().split('.').pop().toLowerCase();
	//alert(getFileSize("stationFile"));
	if(getFileSize("helpCenterFile") > 30){
		messageAlert("数据文件不能大于30M"); 
		return;
	 }
    $("#upform").submit();
 	return;
}

function getFileSize(eleId) {
	try {
		var size = 0;
		size = $('#' + eleId)[0].files[0].size;// byte
		size = size / 1024;// kb
		size = size / 1024;// mb
		// alert('上传文件大小为' + size + 'M');
		return size;
	} catch (e) {
		alert("错误：" + e);
		return -1;
	}
}
function findFileByFileName(FILE_NAME){
	bootbox.dialog({
		message: "是否确认下载?",
		title: "提示信息",
		buttons: {
			OK: {
				label: "确认",
				className: "btn-primary",
				callback: function () {
					$.ajax({
						url:$.cxt + "/getReportForm/downFile", 
						type: "POST",
						data : {
							fileName : FILE_NAME
						},
						success : function (json){
							
						}
					})
					
				}
			},
			Cancel: {
				label: "取消",
				className: "btn-default",
				callback: function () {
					
				}
			}
		}
	});
}

function deleteFile(FILE_NAME){
	bootbox.dialog({
		message: "是否确认删除?",
		title: "提示信息",
		buttons: {
			OK: {
				label: "确认",
				className: "btn-primary",
				callback: function () {
					$.ajax({
						url:$.cxt + "/getReportForm/deleteFileByFileName", 
						type: "POST",
						data : {
							fileName : FILE_NAME
						},
						success : function (json){
							$("#fileInfoListGrid").jqGrid({
								url : $.cxt + "/getReportForm/findFile",
								datatype : "json",
								mtype : "POST",
								postData : {},
							}).trigger("reloadGrid");
						}
					})
					
				}
			},
			Cancel: {
				label: "取消",
				className: "btn-default",
				callback: function () {
					
				}
			}
		}
	});
}

function gaoxiaoClick(lastMonth){
	 $("#schP_gaoxiao").off("click");
	 $("#schP_gaoxiao").click(function(){
		 
		 gridIWindow(lastMonth);
	});
	 
}	
function gridIWindow(lastMonth){
	var msg='省高校信息'
	topwindow.showWindow({
		   title : msg,
		   data:{},
			url : $.cxt + "/pages/gis/school/gaoxiaoInfo.jsp?lastMonth="+lastMonth,
			/* bottons : [{
				title : "关闭" ,
				fun : function() {
					topwindow.removeWindow();
				}
			}]  */
	   })
}

function cityGaoxiaoClick(mapOrgId,lastMonth){
	 $("#schP_gaoxiao").off("click");
	 $("#schP_gaoxiao").click(function(){
		 
		 cityGridIWindow(mapOrgId,lastMonth);
	});
	 
}	
function cityGridIWindow(mapOrgId,lastMonth){
	var msg='地市高校信息'
	topwindow.showWindow({
		   title : msg,
		   data:{},
			url : $.cxt + "/pages/gis/school/cityGaoxiaoInfo.jsp?mapOrgId="+mapOrgId+"&lastMonth="+lastMonth,
			/* bottons : [{
				title : "关闭" ,
				fun : function() {
					topwindow.removeWindow();
				}
			}]  */
	   })
}

function strToNum(cellValue){
	
	var num = Math.round(parseFloat(cellValue) * 100);
	return num + "%";
	
	
}

