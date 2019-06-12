var kpiDataList = [];
var scaleTypeNum = "";
var	smallTypeIdNum = "";
var mapOrgId = null;
$(function(){
	$(".date-picker").datepicker({
 		format: 'yyyymmdd',
		language:  'zh-CN',
		todayBtn : "linked",
		autoclose:true,
		minview : "3"
	});
	$("#accountMonth").val(getYesterDay());
	
	$("#accountMonth").on("changeDate", function(){
		kpiRadio();
	});
	$("#smallType").on("change", function(){
		kpiRadio();
	});
	
	var orgId = $(".orgId").val();
	bigType();
	var emap = showEmap(orgId, "mainMap", callBack);
	var pubScaleType = 'chnl';
	var pubSmallTypeId = '1';
	var mapObj = null;
	function callBack(_orgId, orgLevel) {
		mapOrgId = _orgId;
		$("#hiddenOrgId").val(_orgId);
		// 当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
		if(orgLevel == "4") {
			$(".glyphicon-fullscreen").remove();
			$(".firstPage-left").hide();
			$(".firstPage-right").hide();
			$(".titleLeveL1").hide();
			$(".operateMonitor").hide();
			$(".targetResourceList").hide();
			$(".firstPage-middle").css("width", "100%");
			$(".titleLevel1Content").css("height", "100%");
			$(".titleLevel1Content > div").css("height", "100%");
			$(".middle-up").height("100%");
			$("#topPanel").remove();
			$("#lastPanel").remove();
			mapObj = emap.mapObj;
		} else if(orgLevel == "1" || orgLevel == "2") {
			if (orgLevel == "1"){
				$(".monthAssessTitle").html("省公司月度考核指标完成情况");
			} else {
				$(".monthAssessTitle").html("地市公司月度考核指标完成情况");
			}
			$(".visual-left").show();
			$(".visual-right").show();
			$(".middle-down").show();
			$(".visual-middle").width("34%");
			$(".middle-up").height("80%");
			$(".glyphicon-fullscreen").remove();
			var showMaxBtn = $('<span style="font-size: 15px; cursor: pointer; position: absolute; z-index: 10; right: 10px;" class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>');
			$("#mainMap").append(showMaxBtn);
			windowMax();
			mapObj = this.next();
			kpiRadio();
			//加载页面数据
			laodData(_orgId);
			//加载考核得分数据
			initAssessScoreContent(_orgId);
			showTop(_orgId, pubScaleType, pubSmallTypeId);
			$(".append-all").hide();
		} else {
			$(".glyphicon-fullscreen").remove();
			
			$(".firstPage-left").hide();
			$(".firstPage-right").hide();
			$(".titleLeveL1").hide();
			$(".operateMonitor").hide();
			$(".targetResourceList").hide();
			$(".firstPage-middle").css("width", "100%");
			$(".titleLevel1Content").css("height", "100%");
			$(".titleLevel1Content > div").css("height", "100%");
		   	$(".middle-up").height("100%");
		   	$("#topPanel").remove();
		   	$("#lastPanel").remove();
		   	mapObj = this.next();
		   	areaAndGridPage(_orgId);
		}
		selectRadio();
	}
	
	function windowMax() {
		//窗口缩放
		$(".glyphicon-fullscreen").unbind();
		$(".glyphicon-fullscreen").click(function() {
			topwindow.showHtmlWindow($("#mainMap"), {
				width: 700,
				height: 400,
				title: "信息展示",
				closeBtnFun: function() {
					$(".middle-up").append($("#mainMap"));
					$(".glyphicon-fullscreen").show();
					mapObj.resize(); 
				},
				fun: function() {
					$(".glyphicon-fullscreen").hide();
					mapObj.resize();
				}
			});
		});
	}
	
	
	//指标数据单选框选中
	function selectRadio() {
		$(".rateRadio input[type='radio']").unbind();
		$(".rateRadio input[type='radio']").click(function() {
			var kpiId = $(this).attr('rangeid');
			$(this).attr('checked', 'checked');
			$(".rateRadio input[type='radio']").each(function(index, element) {
				var _kpiId = $(element).attr('rangeid');
				if(_kpiId != kpiId) {
					$(element).removeAttr("checked");
				}
			});
			kpiRadio();
		});
	}
	
	
	
	$(".scaleTypeName").click(function() {
		kpiDataList = [];
		var scaleType = $(this).attr("bigScaleType");
		var smallScaleType = $(this).attr("smallScaleType");
		pubScaleType = scaleType;
		pubSmallTypeId = smallScaleType;
		showTop(mapOrgId, scaleType, smallScaleType);
	});
	
	//地图右侧栏数据
	var areaAndGridPage = function(orgId) {
		var appendAll = $("<div class='append-all'></div>");
		$(".append-all").remove();
		$("#mainMap").append(appendAll);
		var mapOrg = "<div class='org-map'>"
			+ "<div class='map-select'>"
			+ "<span>地市：</span>"
			+ "<select id='mapCity' class='orgMap'></select>"
			+ "</div>"
			+ "<div class='map-select'>"
			+ "<span>区县：</span>"
			+ "<select id='mapArea' class='orgMap'></select>"
		   	+ "</div>"
		   	+ "<div class='map-select'>"
		   	+ "<span>网格：</span>"
		   	+ "<select id='mapGrid' class='orgMap'></select>"
		   	+ "</div>"
		   	+"<input type='hidden' id='orgIdHidden01' />"
		   	+"<input type='hidden' id='incomeIdHidden' />"
		   	+ "</div>";
		var bigType = "<div class='kpi-checkbox' style=''>"
			+ "<div class='kpiCheckbox'>"
			+ "<input type='radio' id='chnl' checked='checked'>"
			+ "<span>渠道</span>"
			+ "</div>"
			+ "<div class='kpiCheckbox'>"
			+ "<input type='radio' id='stat'>"
			+ "<span>基站</span>"
			+ "</div>"
			+"<div>"
			+"<button class='btn btn-primary' id='exportGridTable'>导出</button>"
			+"</div>"
			+ "</div>";
		var table = "<div class='mapGrid'>"
			+ "<table id='mapTable'></table>"
			+ "<div id='grid-pager5'></div> "
			+ "</div>";
		appendAll.append(mapOrg);
		appendAll.append(bigType);
		appendAll.append(table);
		initMapOrg(mapOrgId);
		getMapChildrenOrg();
		mapRadio();//单选框切换事件
		mapTableInfo(mapOrgId);
		$("#exportGridTable").on('click',exportGridTable);
	}
	
	//一类、二类级联
	$("#bigType").change(function() {
		var kpiType = $(this).find("option:selected").val();
		smallType(kpiType);
		kpiRadio();
	});
	
	
	$(".scaleNum").on("click", function() {
		$("#scaleModal").modal("show");
		initOrgWindow1(mapOrgId);
		childrenOrgWindow1();
		var scaleType = $(this).prev().attr("bigScaleType");
		var smallTypeId = $(this).prev().attr("smallScaleType");
		$("#scaleTypeHidden").val(scaleType);
		$("#smallScaleIdHidden").val(smallTypeId);
		scaleTypeNum = scaleType;
		smallTypeIdNum = smallTypeId;
		scaleWindow(mapOrgId, scaleType, smallTypeId)
	})
	
});



function laodData(orgId){
	$.ajax({
		url : $.cxt + "/firstPageNew/getGridInfoOverView",
		type : "post",
		data : {"orgId" : orgId},
		dataType : "json",
		success : function(data){
			writeStatisValue(data);
		}
	})
}

function writeStatisValue(data){
	var gridCount = data.gridCount == null ? 0 : data.gridCount;
	gridCount += "个";
	$("#gridTotal").html(gridCount);//网格总数(个)
	
	var gridType1Count = data.gridType1Count == null ? 0 : data.gridType1Count;
	gridType1Count += "个";
	$("#gridType1Count").html(gridType1Count);//一类网格数(个)
	
	var gridType2Count = data.gridType2Count == null ? 0 : data.gridType2Count;
	gridType2Count += "个";
	$("#gridType2Count").html(gridType2Count);//二类网格数(个)
	
	var gridType3Count = data.gridType3Count == null ? 0 : data.gridType3Count;
	gridType3Count += "个";
	$("#gridType3Count").html(gridType3Count);//三类网格数(个)
	
	var directorsCount = data.directorsCount == null ? 0 : data.directorsCount;
	directorsCount += "个";
	$("#regionalDirectorCount").html(directorsCount);//区域总监数(个)
	
	var gridManagerCount = data.gridManagerCount == null ? 0 : data.gridManagerCount;
	gridManagerCount += "个";
	$("#gridManagerCount").html(gridManagerCount);//网格经理数(个)
	
	var gridManagerCount = data.gridManagerCount == null ? 0 : data.gridManagerCount;
	gridManagerCount += "个";
	$("#channelManagerCount").html(gridManagerCount);//渠道经理数(个)
	
	var directUserCount = data.directUserCount == null ? 0 : data.directUserCount;
	directUserCount += "个";
	$("#directSalesStaffCount").html(directUserCount);//直销人员数(个)
	
	var repairUserCount = data.repairUserCount == null ? 0 : data.repairUserCount;
	repairUserCount += "个";
	$("#maintenanceStaffCount").html(repairUserCount);//装维人员数(个)
	
	var incomeScale = data.incomeScale == null ? 0 : data.incomeScale;
	incomeScale += "万";
	$("#incomeScale").html(incomeScale);//收入规模(万)
	
	var cdcustomerScale = data.cdcustomerScale == null ? 0 : data.cdcustomerScale;
	cdcustomerScale += "个";
	$("#groupCustomerSize").html(cdcustomerScale);//CD集团客户规模(个)
	
	var cellScale = data.cellScale == null ? 0 : data.cellScale;
	cellScale += "个";
	$("#communitySize").html(cellScale);//小区规模(个)
	
	var channelScale = data.channelScale == null ? 0 : data.channelScale;
	channelScale += "个";
	$("#channelSize").html(channelScale);//渠道规模(个)
	
	var customerScale = data.customerScale == null ? 0 : data.customerScale;
	customerScale += "个";
	$("#clientSize").html(customerScale);//客户规模(个)
	
	var channelCount = data.channelCount == null ? 0 : data.channelCount;
	channelCount += "个";
	$("#channelTotal").html(channelCount);//渠道总数(个)
	
	var channelCountSt = data.channelCountSt == null ? 0 : data.channelCountSt;
	channelCountSt += "个";
	$("#physicalChannelCount").html(channelCountSt);//实体渠道(个)
	
	var channelCountZx = data.channelCountZx == null ? 0 : data.channelCountZx;
	channelCountZx += "个";
	$("#directSalesChannelCount").html(channelCountZx);//直销渠道(个)
	
	var channelCountFx = data.channelCountFx == null ? 0 : data.channelCountFx;
	channelCountFx += "个";
	$("#distributionChannelCount").html(channelCountFx);//分销渠道(个)
	
	var agencyCount = data.agencyCount == null ? 0 : data.agencyCount;
	agencyCount += "个";
	$("#proxyCount").html(agencyCount);//代理/加盟厅(个)
	
	var ownHallCount = data.ownHallCount == null ? 0 : data.ownHallCount;
	ownHallCount += "个";
	$("#ownHallCount").html(ownHallCount);//自有厅(个)
	
	var stationCount = data.stationCount == null ? 0 : data.stationCount;
	stationCount += "个";
	$("#baseStationTotal").html(stationCount);//基站总数(个)
	
	var station23gCount = data.station23gCount == null ? 0 : data.station23gCount;
	station23gCount += "个";
	$("#baseStation2_3GCount").html(station23gCount);//2/3G基站(个)
	
	var station4gCount = data.station4gCount == null ? 0 : data.station4gCount;
	station4gCount += "个";
	$("#baseStation4GCount").html(station4gCount);//4G基站个数(个)
	
	var customersCallCount = data.customersCallCount == null ? 0 : data.customersCallCount;
	customersCallCount += "个";
	$("#finalCallsCustomerCount").html(customersCallCount);//期末通话客户数(个)
	
	var customersCallAdd = data.customersCallAdd == null ? 0 : data.customersCallAdd;
	customersCallAdd += "个";
	$("#addCallsCustomerCount").html(customersCallAdd);//新增通话客户数(个)
	
	var customersCallNet = data.customersCallNet == null ? 0 : data.customersCallNet;
	customersCallNet += "个";
	$("#netIncreCallsCustomer").html(customersCallNet);//净增通话客户数(个)
	
	var customersRate23g = data.customersRate23g == null ? 0 : data.customersRate23g;
	customersRate23g += "个";
	$("#traffic23GCustomerCount").html(customersRate23g);//2/3G流量客户数(个)
	
	var customersRate4g = data.customersRate4g == null ? 0 : data.customersRate4g;
	customersRate4g += "个";
	$("#traffic4GCustomerCount").html(customersRate4g);//4G流量客户说(个)
	
	var broadUserCount = data.broadUserCount == null ? 0 : data.broadUserCount;
	broadUserCount += "个";
	$("#homeBroadbandUserCount").html(broadUserCount);//家庭宽带用户数(个)
	
	var income = data.income == null ? 0 : data.income;
	income += "万";
	$("#incomeCount").html(income);//收入(万)
	
	var broCount = data.broCount == null ? 0 : data.broCount;
	broCount += "个";
	$("#broadbandCount").html(broCount);//宽带(个)
	
	var goverCusSum = data.goverCusSum == null ? 0 : data.goverCusSum;
	goverCusSum += "个";
	$("#governmentCompanyCount").html(goverCusSum);//政企(个)
	
	var businessAdd = data.businessAdd == null ? 0 : data.businessAdd;
	businessAdd += "个";
	$("#increament").html(businessAdd);//新增(个)
	
	var teleCount = data.teleCount == null ? 0 : data.teleCount;
	teleCount += "个";
	$("#putNumberCount").html(teleCount);//放号量(个)
	
	var userCount4g = data.userCount4g == null ? 0 : data.userCount4g;
	userCount4g += "个";
	$("#4GCount").html(userCount4g);//4G(个)
	
	var loginDirSum = data.loginDirSum == null ? 0 : data.loginDirSum;
	loginDirSum += "次";
	$("#regionalDirectorLoginCount").html(loginDirSum);//区域总监登陆系统次数(次)
	
	var channelSignCount = data.channelSignCount == null ? 0 : data.channelSignCount;
	channelSignCount += "个";
	$("#channelGuaranteeCount").html(channelSignCount);//渠道包保数(个)
	
	var physicalSignCount = data.physicalSignCount == null ? 0 : data.physicalSignCount;
	physicalSignCount += "个";
	$("#guaranteeBasicUnitCount").html(physicalSignCount);//包保基础单元数(个)
	
	var taskCount = data.taskCount == null ? 0 : data.taskCount;
	taskCount += "个";
	$("#TaskOrderDistributeCount").html(taskCount);//任务工单派发数(个)
	
	var taskDone = data.taskDone == null ? 0 : data.taskDone;
	taskDone += "个";
	$("#TaskOrderCompleteCount").html(taskDone);//任务工单完成数(个)
	
	var taskAlarm = data.taskAlarm == null ? 0 : data.taskAlarm;
	taskAlarm += "次";
	$("#TaskOrderAlarmCount").html(taskAlarm);//任务工单告警次数(次)
	
	var cellCount = data.cellCount == null ? 0 : data.cellCount;
	cellCount += "个";
	$("#communityCount").html(cellCount);//小区总数(个)
	
	var collegesCount = data.collegesCount == null ? 0 : data.collegesCount;
	collegesCount += "个";
	$("#shoolCount").html(collegesCount);//高校总数(个)
	
	var storeCount = data.storeCount == null ? 0 : data.storeCount;
	storeCount += "个";
	$("#streetShopsCount").html(storeCount);//沿街商铺数(个)
	
	var broCellCount = data.broCellCount == null ? 0 : data.broCellCount;
	broCellCount += "个";
	$("#broadbandCommunityCount").html(broCellCount);//宽带小区数(个)
	
	var marketCount = data.marketCount == null ? 0 : data.marketCount;
	marketCount += "个";
	$("#clusterMarketCount").html(marketCount);//聚类市场数(个)
	
	var businessCount = data.businessCount == null ? 0 : data.businessCount;
	businessCount += "个";
	$("#businessDistrictCount").html(businessCount);//商圈数(个)
}
//加载考核得分
function initAssessScoreContent(orgId){
	/*$.ajax({
		url: $.cxt + "/firstPageNew/getAssessmentEcharts",
		type: "post",
		data:{"orgId": orgId},
		success:function(data){
			var scoreInfo = data.data;
			
		}
	});*/
	var title = [];
	var dataArr = [];
	title.push("长沙市");
	dataArr.push(100);
	title.push("株洲市");
	dataArr.push(95);
	title.push("常德市");
	dataArr.push(90);
	title.push("岳阳市");
	dataArr.push(85);
	title.push("娄底市");
	dataArr.push(80);
	title.push("张家界");
	dataArr.push(75);
	title.push("湘潭市");
	dataArr.push(70);
	title.push("岳阳市");
	dataArr.push(65);
	title.push("郴州市");
	dataArr.push(60);
	title.push("邵阳市");
	dataArr.push(55);
	title.push("怀化市");
	dataArr.push(50);
	var myChart = echarts.init(document.getElementById('assessScoreContent'));
	option = {
			tooltip: {
	            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
                    textStyle: {
                        color: '#666',
                    },
                },
            },
            backgroundColor: 'rgba(255,255,255,0.8)',
            extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
            textStyle: {
                color: '#666',
                /*fontSize: 18*/
            },
        },
        toolbox: {
            'show': false,
            // orient: 'vertical',
            //x: 'right',
            //y: 'center',
            feature: {
                'magicType': {
                    'show': true,
                    'type': ['bar', 'line']
                },
                restore: {
                    'show': true
                },
                saveAsImage: {
                    'show': true
                }
            }
        },
        /*legend: {//不需要此处标题
        	textStyle: {
	    		color:'#fff',
	    		fontSize: 12
	    	},
	    	top:0,
	    	data: ['考核得分'],
        },*/
        grid: {
        	top: '4%',
            left: '1%',
            right: '1%',
            bottom: '2%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: title,
            axisLabel: {     // 坐标轴刻度标签的相关设置。
                interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
                rotate:0,
                textStyle: {
                    color: '#fff',
                    fontSize: '10',
                },
                formatter:function(value){
                	return value.split("").join("\n");
                }
            },
            axisLine: {      // 坐标轴轴线相关设置
                lineStyle: {
                    color: '#666',
                    opacity: 1
                }
            },
            splitLine: {     // 坐标轴在 grid 区域中的分隔线。
                show: false,
            }
        }],
        yAxis: [{
            name: '',
            nameTextStyle : {
	        	color: '#000',
	        	fontSize:11,
	        },
            type: 'value',
            position : 'left',
            axisLabel: {
                textStyle: {
                    color: '#fff',
                    fontSize: '10'
                }
            },
            axisLine: {
            	lineStyle: {
                    color: '#666',
                    opacity: 1
                },
                show: true
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false,
            }

        }, {
            name: '',
            nameTextStyle : {
	        	color: '#000',
	        	fontSize:11,
	        },
	        show : false,
            type: 'value',
            position: 'right',
            axisLabel: {
                textStyle: {
                    color: '#fff',
                    fontSize: '10',
                }
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false,
            }
        }],
        series: [{
            'name': '考核得分',
            'type': 'bar',
             barWidth: 6,
            'data': dataArr,
            itemStyle: {
                normal: {
                    // barBorderRadius: 15,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [{
                                offset: 0,
                                color: '#229aff'
                            },
                            {
                                offset: 1,
                                color: '#13bfe8'
	                            }
	                        ]
	                    )
	                }
	            }
	        }]
		};
 	myChart.clear();
 	myChart.setOption(option);
}


//前五名
function showTop(orgId, scaleType, smallScaleType) {
	$("#topPanel").remove();
	$("#lastPanel").remove();
	var topPanel = $("<div class='topPanel' id='topPanel'><div class='topPanelUp'>前五名TOP</div><div class='topPanelDown'></div></div>");
	var lastPanel = $("<div class='lastPanel' id='lastPanel'><div class='lastPanelUp'>后五名TOP</div><div class='lastPanelDown'></div></div>");
	$("#mainMap").append(topPanel);
	$("#mainMap").append(lastPanel);
	$.ajax({
		url: $.cxt + "/firstPageNew/getTopScale",
		type: 'POST',
		data: {
			orgId: orgId,
			scaleType: scaleType,
			smallScaleType: smallScaleType
		},
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0'){
				kpiDataList = json.data;
			}
		}
	});
	var topList = kpiDataList.slice(0, 5);
	var lastList = kpiDataList.slice(kpiDataList.length - 5, kpiDataList.length);
	var topHtml = "";
	var lastHtml = "";
	for(var i = 0, n = topList.length; i < n; i++) {
		topHtml += "<div class='topValue'>NO." + (i + 1) + "&nbsp;" 
		+ topList[i].ORG_NAME + "&nbsp;" + topList[i].PUB_DATA + "</div>";
	}
	for(var i = lastList.length - 1; i >= 0; i--) {
		lastHtml += "<div class='topValue'>NO." + (lastList.length - i) + "&nbsp;" 
		+ lastList[i].ORG_NAME + "&nbsp;" + lastList[i].PUB_DATA + "</div>";
	}
	$(".topPanelDown").html(topHtml);
	$(".lastPanelDown").html(lastHtml);
	if (topList.length == 0){
		$(".topPanelDown").hide();
	} else{
		$(".topPanelDown").show();
	}
	if (lastList.length == 0){
		$(".lastPanelDown").hide();
	} else{
		$(".lastPanelDown").show();
	}
}

//加载一类类型
var bigType = function() {
	var firstKpiType = "";
	$.ajax({
		url: $.cxt + "/dataVisualization2/getBigType",
		type: 'POST',
		data: {},
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				$("#bigType").empty();
				var html = "";
				for(var i = 0, n = json.data.length; i < n; i++) {
					if(i == 0) {
						firstKpiType = json.data[i].KPI_TYPE;
					}
					 html += "<option value = '"+json.data[i].KPI_TYPE+"'>"+ json.data[i].KPI_TYPE_NAME + "</option>"
				}
			    $("#bigType").append(html);
				smallType(firstKpiType);
			}
		}
	});
}

//加载二类类型
var smallType = function(kpiType) {
	$.ajax({
		url: $.cxt + "/dataVisualization2/getSmallType",
		type: 'POST',
		data: {kpiType: kpiType},
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			$("#smallType").empty();
			if(json.code == '0') {
				var html = "";
				for(var i = 0, n = json.data.length; i < n; i++) {
					html += "<option value = '"+json.data[i].KPI_CODE+"'>"+ json.data[i].KPI_NAME + "</option>"
				}
				$("#smallType").append(html);
			}
		}
	});
}

//地图右侧select数据
var initMapOrg = function(orgId){
	$.ajax({
		url: $.cxt + "/dataVisualization2/initOrg",
		type: 'POST',
		data: {orgId : orgId},
		success: function(data){
			var json = JSON.parse(data);
			var orgInfo = json.data;
			if(json.code == '0'){
				if(json.msg == '1'){
					$("#mapCity").empty();
					$("#mapArea").empty();
					$("#mapGrid").empty();
					$("#mapCity").append($("<option>"+'请选择...'+"</option>"))
					$("#mapArea").append($("<option>"+'请选择...'+"</option>"))
					$("#mapGrid").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#mapCity").append(html);
					//	$("#mapCity").append(
					//			$("<option>"+orgInfo.cityInfo[i].cityName+"</option>").attr('value',orgInfo.cityInfo[i].cityId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#mapArea").append(html);
					//	$("#mapArea").append(
					//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#mapGrid").append(html);
					//	$("#mapGrid").append(
					//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	)
					//}
				}else if(json.msg == '2'){
					$("#mapCity").empty();
					$("#mapArea").empty();
					$("#mapGrid").empty();
					$("#mapArea").append($("<option>"+'请选择...'+"</option>"))
					$("#mapGrid").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#mapCity").append(html);
					//	$("#mapCity").append(
					//			$("<option>"+orgInfo.cityInfo[i].cityName+"</option>").attr('value',orgInfo.cityInfo[i].cityId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#mapArea").append(html);
					//	$("#mapArea").append(
					//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#mapGrid").append(html);
					//	$("#mapGrid").append(
					//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	)
					//}
				}else if(json.msg == '3'){
					$("#mapCity").empty();
					$("#mapArea").empty();
					$("#mapGrid").empty();
					$("#mapGrid").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#mapCity").append(html);
					//	$("#mapCity").append(
					//			$("<option>"+orgInfo.cityInfo[i].cityName+"</option>").attr('value',orgInfo.cityInfo[i].cityId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#mapArea").append(html);
					//	$("#mapArea").append(
					//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#mapGrid").append(html);
					//	$("#mapGrid").append(
					//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	)
					//}
				}else if(json.msg == '4'){
					$("#mapCity").empty();
					$("#mapArea").empty();
					$("#mapGrid").empty();
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#mapCity").append(html);
					//	$("#mapCity").append(
					//			$("<option>"+orgInfo.cityInfo[i].cityName+"</option>").attr('value',orgInfo.cityInfo[i].cityId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#mapArea").append(html);
					//	$("#mapArea").append(
					//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#mapGrid").append(html);
					//	$("#mapGrid").append(
					//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	)
					//}
				}else if(json.msg == '5'){}
			}
		}
	})
}

var mapTableInfo = function(orgId){
	var colNames = [];
	var colModel = [];
	var incomeId = "";
	$(".kpiCheckbox input[type='radio']").each(function(){
		if($(this).attr("checked") == 'checked'){
			incomeId = $(this).attr("id");
		}
	})
	$("#orgIdHidden01").val(orgId);
	$("#incomeIdHidden").val(incomeId);
	
	if(incomeId == "chnl"){
		colNames = ["区县编码","区县名称","网格编码","网格名称","渠道编码","渠道名称","收入","业务量"]
	}else{
		colNames = ["区县编码","区县名称","网格编码","网格名称","基站编码","基站名称","收入","业务量"]
	}
	$('#mapTable').GridUnload();
	$('#mapTable').jqGrid({
		url: $.cxt + "/dataVisualization2/getMapTableInfo",
		datatype: "json",
		mtype: "POST",
		postData: {
			orgId: orgId,
			incomeId: incomeId
        },
		height:($(".mapGrid").height() - 60),
		autowidth: false,
		width: $(".mapGrid").width(),
		colNames: colNames,
		colModel: [
					{name : 'AREA_ID',align : 'center',hidden:true,sortable: false}, 
					{name : 'AREA_NAME',align : 'center',sortable: false}, 
					{name : 'GRID_CODE',align : 'center',hidden:true,sortable: false}, 
					{name : 'GRID_NAME',align : 'center',sortable: false}, 
					{name : 'PHYSICAL_ID',align : 'center',hidden:true,sortable: false}, 
					{name : 'PHYSICAL_NAME',align : 'center',sortable: false}, 
					{name : 'INCOME',align : 'center'}, 
					{name : 'CUSTOMER',align : 'center'}, 
		           ],
		shrinkToFit:true,
		autoScroll: true,
		viewrecords: true,
		sortable: true,
		sortorder: "desc",
		rownumbers: true,
		rowNum: 10,
		rowList: [ 10,20, 30 ],
		pager : '#grid-pager5',
		loadComplete: topjqGridLoadComplete,
		gridComplete : setNiceScroll
	});
}
var setNiceScroll = function(id){
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight: $(window).height()-190,
	    cursorcolor: "#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
}

//加载数据详细信息条件
var initOrgWindow1 = function(orgId){
	$.ajax({
		url: $.cxt + "/dataVisualization2/initOrg",
		type: 'POST',
		data: {orgId : orgId},
		success: function(data){
			var json = JSON.parse(data);
			var orgInfo = json.data;
			if(json.code == '0'){
				if(json.msg == '1'){
					$("#cityWindow1").empty();
					$("#areaWindow1").empty();
					$("#deptWindow1").empty();
					$("#gridWindow1").empty();
					$("#cityWindow1").append($("<option>"+'请选择...'+"</option>"))
					$("#areaWindow1").append($("<option>"+'请选择...'+"</option>"))
					$("#deptWindow1").append($("<option>"+'请选择...'+"</option>"))
					$("#gridWindow1").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					$("#cityWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					$("#areaWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.saleDeptInfo.length;i++){
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode + "'>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					$("#deptWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					$("#gridWindow1").append(html);
				}else if(json.msg == '2'){
					$("#cityWindow1").empty();
					$("#areaWindow1").empty();
					$("#deptWindow1").empty();
					$("#gridWindow1").empty();
					$("#areaWindow1").append($("<option>"+'请选择...'+"</option>"))
					$("#deptWindow1").append($("<option>"+'请选择...'+"</option>"))
					$("#gridWindow1").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					$("#cityWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					$("#areaWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.saleDeptInfo.length;i++){
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode + "'>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					$("#deptWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					$("#gridWindow1").append(html);
				}else if(json.msg == '3'){
					$("#cityWindow1").empty();
					$("#areaWindow1").empty();
					$("#deptWindow1").empty();
					$("#gridWindow1").empty();
					$("#deptWindow1").append($("<option>"+'请选择...'+"</option>"))
					$("#gridWindow1").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					$("#cityWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					$("#areaWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.saleDeptInfo.length;i++){
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode + "'>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					$("#deptWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					$("#gridWindow1").append(html);
				}else if(json.msg == '4'){
					$("#cityWindow1").empty();
					$("#areaWindow1").empty();
					$("#deptWindow1").empty();
					$("#gridWindow1").empty();
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					$("#cityWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					$("#areaWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.saleDeptInfo.length;i++){
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode + "'>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					$("#deptWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					$("#gridWindow1").append(html);
				}else if(json.msg == '5'){
					$("#cityWindow1").empty();
					$("#areaWindow1").empty();
					$("#deptWindow1").empty();
					$("#gridWindow1").empty();
					$("#gridWindow1").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					$("#cityWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					$("#areaWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.saleDeptInfo.length;i++){
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode + "'>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					$("#deptWindow1").append(html);
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					$("#gridWindow1").append(html);
				}
			}
		}
	})
}

//数据详细信息条件级联
function childrenOrgWindow1() {
	$(".orgWindow1").change(function() {
		var selectId = $(this).attr('id');
		var optionValue = $(this).find("option:selected").val();
		if(selectId == 'cityWindow1') {
			if(optionValue != '请选择...') {
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId: optionValue},
					success: function(data) {
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0') {
							$("#areaWindow1").empty();
							$("#deptWindow1").empty();
							$("#gridWindow1").empty();
							$("#areaWindow1").append($("<option>" + '请选择...' + "</option>"))
							$("#deptWindow1").append($("<option>" + '请选择...' + "</option>"))
							$("#gridWindow1").append($("<option>" + '请选择...' + "</option>"))
							var html = "";
							for(var i = 0, n = orgInfo.areaInfo.length; i < n; i++) {
								 html += "<option value = '"+orgInfo.areaInfo[i].areaId+"'>"+ orgInfo.areaInfo[i].areaName + "</option>"
							}
							$("#areaWindow1").append(html);
						    var html = "";
							for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
								 html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode+"'>"+ orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
							}
							$("#deptWindow1").append(html);
							var html = "";
							for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
								 html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+ orgInfo.gridInfo[i].gridName + "</option>"
							}
							$("#gridWindow1").append(html);
						}
						scaleWindow(optionValue,scaleTypeNum,smallTypeIdNum);
					}
				});
			} else {
				initOrgWindow1("1");
				scaleWindow('1', scaleTypeNum, smallTypeIdNum);
			}
		} else if(selectId == 'areaWindow1') {
			if(optionValue != '请选择...') {
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId: optionValue},
					success: function(data) {
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0') {
							$("#deptWindow1").empty();
							$("#gridWindow1").empty();
							$("#deptWindow1").append($("<option>" + '请选择...' + "</option>"))
							$("#gridWindow1").append($("<option>" + '请选择...' + "</option>"))
							var html = "";
							for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
								 html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode+"'>"+ orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
							}
							$("#deptWindow1").append(html);
							var html = "";
							for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
								 html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+  orgInfo.gridInfo[i].gridName + "</option>"
							}
							$("#gridWindow1").append(html);
						}
						scaleWindow(optionValue,scaleTypeNum,smallTypeIdNum);
					}
				});
			} else {
				var cityId = $("#cityWindow1").find("option:selected").val();//cityWindow1
				if(cityId == '请选择...') {
					initOrgWindow1("1");
					scaleWindow('1', scaleTypeNum, smallTypeIdNum);
					return;
				} else {
					$.ajax({
						url: $.cxt + "/dataVisualization2/getChildren",
						type: 'POST',
						data: {orgId: cityId},
						success: function(data) {
							var json = JSON.parse(data);
							var orgInfo = json.data;
							if(json.code == '0') {
								$("#deptWindow1").empty();
								$("#gridWindow1").empty();
								$("#deptWindow1").append($("<option>" + '请选择...' + "</option>"))
								$("#gridWindow1").append($("<option>" + '请选择...' + "</option>"))
								var html = "";
								for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
									 html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode+"'>"+  orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
								}
								$("#deptWindow1").append(html);
								var html = "";
								for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
									 html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+   orgInfo.gridInfo[i].gridName + "</option>"
								}
								$("#gridWindow1").append(html);
								scaleWindow(cityId,scaleTypeNum,smallTypeIdNum);
							}
						}
					});
				}
			}
		} else if(selectId == 'deptWindow1') {
			if(optionValue != '请选择...') {
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId: optionValue},
					success: function(data) {
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0') {
							$("#gridWindow1").empty();
							$("#gridWindow1").append($("<option>" + '请选择...' + "</option>"));
							var html = "";
							for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
								 html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+   orgInfo.gridInfo[i].gridName + "</option>"
							}
							$("#gridWindow1").append(html);
						}
						scaleWindow(optionValue, scaleTypeNum, smallTypeIdNum);
					}
				});
			} else {
				var areaId = $("#areaWindow1").find("option:selected").val();
				if(areaId == '请选择...') {
					areaId = $("#cityWindow1").find("option:selected").val();
				}
				if(areaId == '请选择...') {
					initOrgWindow1("1");
					scaleWindow('1', scaleTypeNum, smallTypeIdNum);
					return;
				} else {
					$.ajax({
						url: $.cxt + "/dataVisualization2/getChildren",
						type: 'POST',
						data: {orgId: areaId},
						success: function(data) {
							var json = JSON.parse(data);
							var orgInfo = json.data;
							if(json.code == '0') {
								$("#gridWindow1").empty();//有问题
								$("#gridWindow1").append($("<option>" + '请选择...' + "</option>"))
								var html = "";
								for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
									 html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+   orgInfo.gridInfo[i].gridName + "</option>"
								}
								$("#gridWindow1").append(html);
								scaleWindow(area_id, scaleTypeNum, smallTypeIdNum);
							}
						}
					});
				}
			}
		} else if (selectId == 'gridWindow1') {
			if (optionValue == '请选择...'){
				optionValue =  $("#deptWindow1").find("option:selected").val();
				if (optionValue == '请选择...'){
					optionValue =  $("#areaWindow1").find("option:selected").val();
					if (optionValue == '请选择...'){
						optionValue =  $("#cityWindow1").find("option:selected").val();
						if (optionValue == '请选择...'){
							optionValue = '1';
						}
					}
				}
			}
			scaleWindow(optionValue, scaleTypeNum, smallTypeIdNum);
		}
	});
}
//数据详细详细数据表格
var scaleWindow = function(orgId,scaleType,smallScaleId){
	$("#orgIdHidden").val(orgId);
	var colNames = []
	var colModel = []
	if(scaleType == "grid"){
		colNames = [
		            	'网格名称', '所在地市', '所在区县', '移动渠道数','联通渠道数','电信渠道数','基站数','乡镇数','行政村数','渠道常客数',
		            	'基站23G客户数','基站4G客户数','集团客户数','家宽客户数','网格常驻人口','收入','同比','环比',
		            	'客户份额','渠道份额','4G普及率','宽带资源利用率','通话客户数','不限量套餐渗透率'
		           ]
		colModel = [
		            	{name : 'GRID_NAME',align : 'center'}, 
		            	{name : 'CITY_NAME',align : 'center'},
		            	{name : 'AREA_NAME',align : 'center'}, 
		            	{name : 'MOBILE_CHNL_NUM',align : 'center'}, 
		            	{name : 'UNICOM_CHNL_NUM',align : 'center'}, 
		            	{name : 'TELECOM_CHNL_NUM',align : 'center'}, 
		            	{name : 'STATION_NUM',align : 'center'}, 
		            	{name : 'TOWN_NUM',align : 'center'}, 
		            	{name : 'VILLAGE_NUM',align : 'center'}, 
		            	{name : 'CHNL_USER_NUM',align : 'center'}, 
		            	{name : 'STATION_23G_USER',align : 'center'}, 
		            	{name : 'STATION_4G_USER',align : 'center'}, 
		            	{name : 'GROUP_NUM',align : 'center'},
		            	{name : 'KD_USER_NUM',align : 'center'}, 
		            	{name : 'GRID_RESIDENT_USER',align : 'center'}, 
		            	{name : 'FEE',align : 'center'},
		            	{name : 'COMPARE_LAST_MONTH',align : 'center'}, 
		            	{name : 'COMPARE__YSE',align : 'center'}, 
		            	{name : 'USER_PER',align : 'center'},
		            	{name : 'CHNL_SHAPE',align : 'center'}, 
		            	{name : '4G_PER',align : 'center'}, 
		            	{name : 'KD_PORT_USED_PER',align : 'center'},
		            	{name : 'VOICE_USER_NUM',align : 'center'}, 
		            	{name : 'BXL_BRAND_PER',align : 'center'}
		           ]
		
	}else if(scaleType == "chnl" || scaleType == "chnlLevel1"){
		colNames = [
	            	'渠道编码','渠道名称', '所在地市', '所在区县', '一级类型','二级类型','渠道星级','渠道地址','渠道经理姓名','渠道经理电话'
	            	/*,
	            	'终端销量','新增家庭网','新增入网即不限量客户数','新增入网即4G客户数','新和家庭新增量'*/
	           ]
		colModel = [
	            	{name : 'CHNL_CODE',align : 'center'}, 
	            	{name : 'CHNL_NAME',align : 'center'}, 
	            	{name : 'CITY_NAME',align : 'center'}, 
	            	{name : 'AREA_NAME',align : 'center'}, 
	            	{name : 'CHNL_TYPE_LEVEL1',align : 'center'}, 
	            	{name : 'CHNL_TYPE_LEVEL2',align : 'center'}, 
	            	{name : 'CHNL_STAR',align : 'center'}, 
	            	{name : 'CHNL_ADDR',align : 'center'}, 
	            	{name : 'CHNL_MNGR_NAME',align : 'center'}, 
	            	{name : 'CHNL_MNGR_NUMBER',align : 'center'}
	            	/*, 
	            	{name : 'INDEX_01',align : 'center'}, 
	            	{name : 'INDEX_02',align : 'center'}, 
	            	{name : 'INDEX_03',align : 'center'},
	            	{name : 'INDEX_04',align : 'center'}, 
	            	{name : 'INDEX_05',align : 'center'}*/
	            ]
		
	} else if(scaleType == "stat"){
		colNames = [
	            	'基站编码','基站名称','所在地市', '所在区县','归属网格','通话客户数','人均流量DOU','新增通话客户数','人均MOU','同比',
	            	'环比','总收入','基站常驻居住地用户数','基站常驻工作地用户数'
	           ]
		colModel = [
	            	{name : 'STATION_CODE',align : 'center'}, 
	            	{name : 'STATION_NAME',align : 'center'}, 
	            	{name : 'CITY_NAME',align : 'center'}, 
	            	{name : 'AREA_NAME',align : 'center'}, 
	            	{name : 'GRID_CODE',align : 'center'}, 
	            	{name : 'VOICE_USER_NUM',align : 'center'}, 
	            	{name : 'AVG_DOU',align : 'center'}, 
	            	{name : 'NEW_VOICE_USER',align : 'center'}, 
	            	{name : 'AVG_MOU',align : 'center'}, 
	            	{name : 'COMPARE_LAST',align : 'center'}, 
	            	{name : 'COMPARE_YES',align : 'center'}, 
	            	{name : 'TOTAL_FEE',align : 'center'}, 
	            	{name : 'HOME_NUM',align : 'center'},
	            	{name : 'WORK_NUM',align : 'center'}
	            ]
	} else if(scaleType == "staff"){
		colNames = [
	            	'用户名称','用户类型','用户号码','所属地市','所属区县','网格名称','网格类型'
	           ]
		colModel = [
	            	{name : 'USER_NAME',align : 'center'}, 
	            	{name : 'USER_TYPE',align : 'center'}, 
	            	{name : 'USER_PHONE',align : 'center'}, 
	            	{name : 'AREA_NAME',align : 'center'}, 
	            	{name : 'CNTY_NAME',align : 'center'}, 
	            	{name : 'GRID_NAME',align : 'center'}, 
	            	{name : 'GRID_TYPE',align : 'center'}
	            ]
	}
	$('#scaleTable').GridUnload();
	$('#scaleTable').jqGrid({
		url: $.cxt + "/firstPageNew/getTableDataByScaleType",
		datatype: "json",
		mtype: "POST",
		postData: {
			orgId: orgId,
			scaleType: scaleType,
			smallScaleType: smallScaleId
        },
		height:270,
		autowidth: false,
		width: 670,
		colNames: colNames,
		colModel: colModel,
		shrinkToFit:false,
		autoScroll: true,
		viewrecords: true,
		rownumbers: true,
		rowNum: 10,
		rowList: [ 10,20, 30 ],
		pager : '#grid-pager4',
		loadComplete: topjqGridLoadComplete,
		gridComplete : setNiceScroll
	});
}

//网格规模导出模板
$("#exportTable").on('click', exportTable);
function exportTable(){
	//拼接到text标签中
	var html="<input type='text' value='"+ $("#orgIdHidden").val()+"' name= 'orgId' />" ;
	html+= "<input type='text' value='"+$("#scaleTypeHidden").val()+"' name= 'scaleType' />" ;
	html+= "<input type='text' value='"+$("#smallScaleIdHidden").val()+"' name= 'smallScaleType' />" ;
	//封装一个form表单，，将上面text便签放进去，通过POST方式提交，无论多长多可以提交，不会报request提交的字符串太长，最后用remove()移除这个表单
	$("<form method='POST' action='"+$.cxt+"/firstPageNew/addGridScale'>"+html+ "< /form>").appendTo("body").submit().remove();
}

//地图网格类型change事件
var getMapChildrenOrg = function(){
	$(".orgMap").change(function(){
		var selectId = $(this).attr('id');
		var optionValue = $(this).find("option:selected").val();
		if(selectId == 'mapCity'){
			if(optionValue != '请选择...'){
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId : optionValue},
					success: function(data){
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0'){
							$("#mapArea").empty();
							$("#mapGrid").empty();
							$("#mapArea").append($("<option>"+'请选择...'+"</option>"))
							$("#mapGrid").append($("<option>"+'请选择...'+"</option>"))
							var html = "";
							for(var i=0;i<orgInfo.areaInfo.length;i++){
								html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
							}
							    $("#mapArea").append(html);
							//	$("#mapArea").append(
							//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
							//	)
							//}
							var html = "";
							for(var i=0;i<orgInfo.gridInfo.length;i++){
								html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
							}
							    $("#mapGrid").append(html);
							//	$("#mapGrid").append(
							//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
							//	)
							//}
						}
					}
				})
			}else{
				initOrg("1")
			}
		}else if(selectId == 'mapArea'){
			if(optionValue != '请选择...'){
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId : optionValue},
					success: function(data){
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0'){
							$("#mapGrid").empty();
							$("#mapGrid").append($("<option>"+'请选择...'+"</option>"))
							var html = "";
							for(var i=0;i<orgInfo.gridInfo.length;i++){
								html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
							}
							    $("#sumGrid").append(html);
							//	$("#sumGrid").append(
							//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
							//	)
							//}
						}
					}
				})
			}else{
				var cityId = $("#mapCity").find("option:selected").val()
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId : cityId},
					success: function(data){
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0'){
							$("#mapGrid").empty();
							$("#sumGrid").append($("<option>"+'请选择...'+"</option>"))
							var html = "";
							for(var i=0;i<orgInfo.gridInfo.length;i++){
								html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
							}
							    $("#mapGrid").append(html);
							//	$("#mapGrid").append(
							//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
							//	)
							//}
						}
					}
				})
			}
		}else if(selectId == 'mapGrid'){
			if(optionValue != '请选择...'){
				mapTableInfo(optionValue);
			}else{
				var areaId = $("#areaCity").find("option:selected").val();
				mapTableInfo(areaId);
			}
		}
		
	})
}
//地图单选框切换
function mapRadio() {
	$(".kpiCheckbox input[type='radio']").unbind();
	$(".kpiCheckbox input[type='radio']").click(function() {
		var kpiId = $(this).attr('id')
		$(this).attr('checked', 'checked')
		$(".kpiCheckbox input[type='radio']").each(function(index, element) {
			var _kpiId = $(element).attr('id')
			if(_kpiId != kpiId) {
				$(element).removeAttr("checked");
			}
		});
		var gridType = $("#mapGrid").val();
		if (gridType != null && gridType != ""){
			mapTableInfo(gridType);
		} else{
			mapTableInfo(mapOrgId);
		}
	});
}
//到处map查询数据
function exportGridTable(){
	var html = "<input type='text' value='"+$("#orgIdHidden01").val()+"' name='orgId' />";
	html+= "<input type='text' value='"+$("#incomeIdHidden").val()+"' name='incomeId' />";
	//封装到表单
	$("<form method='POST' action='"+$.cxt+"/dataVisualization2/exportGridTable'>"+html+"</form>").appendTo("body").submit().remove();
}

//获取昨天日期
function getYesterDay(){
	var now = new Date();
	now.setTime(now.getTime()-24*60*60*1000);
	var year = now.getFullYear();
	var month = now.getMonth();
	var date = now.getDate();
    month = month + 1;
    if (month < 10) 
 	   month = "0" + month;
    if (date < 10)  
 	   date = "0" + date;
 	return year.toString()+ month.toString() + date.toString();
}

//考核指标数据加载
var kpiRadio = function(){
	var kpiCode = $("#smallType").find("option:selected").val();
	var statisDate = $("#accountMonth").val();
	var rangeId = "";
	var orgId = $("#hiddenOrgId").val();
	$(".rateRadio input[type='radio']").each(function(){
		var checked = $(this).attr('checked');
		if(checked == 'checked'){
			rangeId = $(this).attr("rangeId");
		}
	})
	if(rangeId == ""){
		rangeId = "G"
	}
	$('#twoTypeTable').GridUnload();
	$('#twoTypeTable').jqGrid({
		url: $.cxt + "/dataVisualization2/getKpiRatio",
		datatype: "json",
		mtype: "POST",
		postData: {
			orgId: orgId,
			kpiCode: kpiCode,
			rangeId: rangeId,
			statisDate:statisDate
        },
		height: ($(".twotype-grid").height() - 50),
		width: $(".twotype-grid").width(),
		autowidth: true,
		colNames: [ '组织机构','指标量', '环比','同比'],
		colModel: [ 
		      {name : 'PARENT_NAME',align : 'center'}, 
		      {name : 'KPI_VALUE',align : 'center'},
		      {name : 'KPI_VALUE_HB',align : 'center'},
		      {name : 'KPI_VALUE_TB',align : 'center'}
		],
		autoScroll: true,
		viewrecords: false,
		rownumbers: false,
		rowNum: 10,
		rowList: [ 10,20, 30 ],
		pager : '#grid-pager1',
		loadComplete: function() {
			topjqGridLoadComplete()
		}
	});
}
