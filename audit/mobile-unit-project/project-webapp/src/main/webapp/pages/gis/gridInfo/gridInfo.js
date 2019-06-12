$(function(){
	initLeftTree();
	initGridInfoUserList(gridCode);
//	typeInfo();
//	incomeInfoLinkage(gridCode);
//	businessInfoLinkage(gridCode);
//	getGridInfoLinkage(gridCode);//网格基本信息
	initGridInfoPane(gridCode)
	getGridTeamInfo();//网格团队信息
	gridInfoListGrid();
	setNiceScroll()
	changeBigTypeSelect();
//	typeRatioInfo();
	changeBuildTypeSelect();
	buildDetailInfo();
	businessType();
	businessOperator();
	businessDetailInfo();
	channelOperator();
	channelType();
	channelInfo();
	baseStationDetailsInfo();
	radio()
	
	$("#infoTree").css({"height":$(".infoDetail").height()});
	$(".setHeight").each(function(index,ele){
		$(this).click(function(){
			var setHeight = $(".tab-pane").eq(index).height()+58
			$("#infoTree").css({"height":setHeight});
			setNiceScroll();
		})
	})
	//查询基础单元信息
	/*$('#userListGrid').jqGrid({
		url : $.cxt + "/basicUnitInfo/getBasicUnitInfo",
		datatype : "json",
		mtype : "POST",
		postData : {gridCode:gridCode},
		height : 300,
		autowidth : false,
		colNames : [ '基础单元编号', '基础单元名称','基础单元类型', '详细地址','负责人', '联系电话' ],
		colModel : [ 
		      {name : 'physicalId',align : 'center'}, 
		      {name : 'physicalName',align : 'center'}, 
		      {name : 'physicalType',align : 'center'},
		      {name : 'address',align : 'center'},
		      {name : 'master',align : 'center'}, 
		      {name : 'masterNumber',align : 'center'}
		],
		width : 930,
		shrinkToFit:false,
		autoScroll: true,
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10,20, 30 ],
		pager : '#grid-pager1',
		loadComplete : topjqGridLoadComplete
	});
	//查询按钮
	$("#searchBasicUnitList").click(function(){
		reloadBasicUnitJqGrid("search",gridCode);
	});
	//导出
	$("#exportBasicUnitList").click(function(){
		var physicalName = encodeURI(encodeURI($("#physicalGridName").val()));
		window.location.href=$.cxt +"/basicUnitInfo/export?gridCode="+gridCode+"&physicalName="+physicalName;
	})*/
	
	 
	//查询楼宇信息
	$('#buildingListGrid').jqGrid({
		url : $.cxt + "/buildingInfo/gridBuildingInfo",
		datatype : "json",
		mtype : "POST",
		postData : {gridCode:gridCode},
		height : 300,
		autowidth : false,
		colNames : [ '序号','楼宇编号','楼宇名称','详细地址','楼栋号', '设计住户数', '住户数'],
		colModel : [ 
		       {name : 'rowNum',align : 'center',width : 50},
		      {name : 'buildingCode',align : 'center'},
		      {name : 'buildingName',align : 'center'}, 
		      {name : 'address',align : 'center'},
		      {name : 'buildingNumber',align : 'center'},
		      {name : 'houseNum',align : 'center'}, 
		      {name : 'liveNum',align : 'center'}
		      ],
		width : 930,
		shrinkToFit:false,
		autoScroll: true,
		viewrecords : true,
		rownumbers: false,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager2',
		gridComplete: function() { 
			   setNiceScroll()
		  } ,
		loadComplete : topjqGridLoadComplete
	});
	//查询按钮
	$("#searchbuildingList").click(function(){
		reloadJqGrid("search",gridCode);
	});
	//导出
	$("#exportBuildingList").click(function(){
		var buildingName = encodeURI(encodeURI($("#belongPhysicalGrid").val()));
		window.location.href=$.cxt +"/buildingInfo/export?gridCode="+gridCode+"&buildingName="+buildingName;
	})
	//查询竞争对手信息
	$('#businessListGrid').jqGrid({
		url : $.cxt + "/competitorInfo/getCompetitorInfo",
		datatype : "json",
		mtype : "POST",
		postData : {gridCode:gridCode},
		height : 300,
		autowidth : false,
		colNames : [ '序号','基础单元名称','基础单元类型', '实际住户数', '异网联通宽带进线占比', '异网电信宽带进线占比', '未装宽带数', '联通移网用户数', '电信移网用户数', '收集率' ],
		colModel : [ 
		      {name : 'rowNum',align : 'center' ,width : 50},
		      {name : 'physicalGridName',align : 'center'}, 
		      {name : 'physicalGridType',align : 'center'},
		      {name : 'liveNum',align : 'center'}, 
		      {name : 'unicomBroadbandPer',align : 'center'}, 
		      {name : 'telecomBroadbandPer',align : 'center'}, 
		      {name : 'noBroadbandNum',align : 'center'},
		      {name : 'unicomUser',align : 'center'}, 
		      {name : 'telecomUser',align : 'center'}, 
		      {name : 'collectionRate',align : 'center'}
		      ],
		width : 930,
		shrinkToFit:false,
		autoScroll: true,
		viewrecords : true,
		rownumbers: false,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager3',
		gridComplete: function() { 
			   setNiceScroll()
		  } ,
		loadComplete : topjqGridLoadComplete
	});
	//查询按钮
	$("#searchCompetitorList").click(function(){
		reloadCompetitorJqGrid("search",gridCode);
	});
	//导出
	$("#exportCompetitorList").click(function(){
		var physicalGridName = encodeURI(encodeURI($("#businessGridName").val()));
		window.location.href=$.cxt +"/competitorInfo/export?gridCode="+gridCode+"&physicalGridName="+physicalGridName;
	})
	//渠道信息
	$('#channelListGrid').jqGrid({
		url : $.cxt + "/channelStation/getChannelManageInfo",
		datatype : "json",
		mtype : "POST",
		postData : {gridCode:gridCode},
		height : 120,
		autowidth : false,
		colNames : [ '序号','市场','渠道类型', '一级类型', '二级类型', '渠道数量', '市场份额' ],
		colModel : [ 
		      {name : 'rowNum',align : 'center' ,width : 50},
		      {name : 'marketType',align : 'center'}, 
		      {name : 'channelType',align : 'center'},
		      {name : 'chnlTypelevel1',align : 'center'}, 
		      {name : 'chnlTypelevel2',align : 'center'}, 
		      {name : 'channelCount',align : 'center'}, 
		      {name : 'salePercent',align : 'center'}
		      ],
		width : 910,
		shrinkToFit:false,
		autoScroll: true,
		viewrecords : true,
		rownumbers: false,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager4',
		gridComplete: function() { 
			   setNiceScroll()
		  } ,
		loadComplete : topjqGridLoadComplete
	});
	
	//导出
	$("#exportChannelManage").click(function(){
		window.location.href=$.cxt +"/channelStation/exportByChannelManage?gridCode="+gridCode;
	})
	
	//基站信息
	$('#stationListGrid').jqGrid({
		url : $.cxt + "/channelStation/getBaseStationInfo",
		datatype : "json",
		mtype : "POST",
		postData : {gridCode:gridCode},
		height : 120,
		autowidth : false,
		colNames : [ '序号','所属基础单元编码','所属基础单元名称', '基站类型', '基站数量', '常驻移网用户数', '常驻通话用户数' ],
		colModel : [ 
		      {name : 'rowNum',align : 'center' ,width : 50}, 
		      {name : 'physicalGridCode',align : 'center'}, 
		      {name : 'physicalGridName',align : 'center'},
		      {name : 'stationType',align : 'center'}, 
		      {name : 'stationNum',align : 'center'}, 
		      {name : 'czMobileUser',align : 'center'}, 
		      {name : 'czCallUser',align : 'center'}
		      ],
		width : 910,
		shrinkToFit:false,
		autoScroll: true,
		viewrecords : true,
		rownumbers: false,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager5',
		gridComplete: function() { 
			   setNiceScroll()
		  } ,
		loadComplete : topjqGridLoadComplete
	});
	//导出
	$("#exportBaseStation").click(function(){
		window.location.href=$.cxt +"/channelStation/exportByBaseStation?gridCode="+gridCode;
	})
	//loadting tree有封装好的，暂时先用这个
	
	function initLeftTree(){
		
	
	var setting = {
			 view:{  
	                selectedMulti:false  
	            } ,
	            data: {  
	                keep:{  
	                    parent:true,  
	                    leaf:true  
	                },  
	                simpleData: {  
	                    enable: true  
	                }  
	            },
	            callback: {
	        		onClick: zTreeOnClick
	        	}

        };
	 

	  $.ajax({
		  url:$.cxt + "/gridCommon/getLeftTree", 
		  
		  type: "POST",
		  success : function (zNodes){
			var  treeObj =	$.fn.zTree.init($("#infoTree"), setting, zNodes);
//				treeObj.expandAll(false);
			var nodes = treeObj.getNodes();
			for (var i = 0; i < nodes.length; i++) { //设置节点展开
                treeObj.expandNode(nodes[i], true, false, true);
            }
		  }
	  })
	
	function zTreeOnClick(event, treeId, treeNode){
		  console.log(treeNode);
		  if(treeNode.orglevel != 4 && treeNode.orglevel != 5){
			  window.location.href=$.cxt +"/pages/gis/gridInfo/gridInfoInit.jsp?orgId="+treeNode.id+"&canBack=true";
		  }else if(treeNode.orglevel == 4){
			  rightDataInfo(treeNode.id);
		  }
	  }
	
	}
	function rightDataInfo(gridCode){
		
//		getGridInfoLinkage(gridCode);
//		incomeInfoLinkage(gridCode);
//		businessInfoLinkage(gridCode);
		initGridInfoPane(gridCode)
		basicUnitInfoLinkage(gridCode);
		buildingInfoLinkage(gridCode);
		competitorInfoLinkage(gridCode);
		channelStationLinkage(gridCode);
		baseStationInfoLinkage(gridCode);
		typeInfoLinkage(gridCode);
		changeBigTypeSelectLinkage(gridCode);
		typeRatioInfoLinkage(gridCode);
		changeBuildTypeSelectLinkage(gridCode);
		buildDetailInfoLinkage(gridCode);
		businessTypeLinkage(gridCode);
		businessDetailInfoLinkage(gridCode);
		channelOperatorLinkage(gridCode);
		channelTypeLinkage(gridCode);
		channelInfoLinkage(gridCode);
		baseStationDetailsInfoLinkage(gridCode);
	}
	 
	function basicUnitInfoLinkage(gridCode){
		$("#userListGrid").jqGrid('clearGridData');
		$("#userListGrid").GridUnload();
		//查询基础单元信息
		$('#userListGrid').jqGrid({
			url : $.cxt + "/basicUnitInfo/getBasicUnitInfo",
			datatype : "json",
			mtype : "POST",
			postData : {gridCode:gridCode},
			height : 300,
			autowidth : false,
			colNames : [ '序号','基础单元编号', '基础单元名称','基础单元类型', '详细地址','负责人', '联系电话' ],
			colModel : [ 
			      {name : 'rowNum',align : 'center' ,width : 50},     
			      {name : 'physicalId',align : 'center'}, 
			      {name : 'physicalName',align : 'center'}, 
			      {name : 'physicalType',align : 'center'},
			      {name : 'address',align : 'center'},
			      {name : 'master',align : 'center'}, 
			      {name : 'masterNumber',align : 'center'}
			],
			width : 930,
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			pager : '#grid-pager1',
			gridComplete: function() { 
				   setNiceScroll()
			  } ,
			loadComplete : topjqGridLoadComplete
		});
		//查询按钮
		$("#searchBasicUnitList").click(function(){
			reloadBasicUnitJqGrid("search",gridCode);
		});
		//导出
		$("#exportBasicUnitList").click(function(){
			var physicalName = encodeURI(encodeURI($("#physicalGridName").val()));
			window.location.href=$.cxt +"/basicUnitInfo/export?gridCode="+gridCode+"&physicalName="+physicalName;
		})
	}
	function buildingInfoLinkage(gridCode){
		$("#buildingListGrid").jqGrid('clearGridData');
		$("#buildingListGrid").GridUnload();
		//查询楼宇信息
		$('#buildingListGrid').jqGrid({
			url : $.cxt + "/buildingInfo/gridBuildingInfo",
			datatype : "json",
			mtype : "POST",
			postData : {gridCode:gridCode},
			height : 300,
			autowidth : false,
			colNames : [ '序号','楼宇编号','楼宇名称','详细地址','楼栋号', '设计住户数', '住户数'],
			colModel : [ 
			      {name : 'rowNum',align : 'center' ,width : 50},      
			      {name : 'buildingCode',align : 'center'},
			      {name : 'buildingName',align : 'center'}, 
			      {name : 'address',align : 'center'},
			      {name : 'buildingNumber',align : 'center'},
			      {name : 'houseNum',align : 'center'}, 
			      {name : 'liveNum',align : 'center'}
			      ],
			width : 930,
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10, 20, 30 ],
			pager : '#grid-pager2',
			gridComplete: function() { 
				   setNiceScroll()
			  } ,
			loadComplete : topjqGridLoadComplete
		});
		//查询按钮
		$("#searchbuildingList").click(function(){
			reloadJqGrid("search",gridCode);
		});
		//导出
		$("#exportBuildingList").click(function(){
			var buildingName = encodeURI(encodeURI($("#belongPhysicalGrid").val()));
			window.location.href=$.cxt +"/buildingInfo/export?gridCode="+gridCode+"&buildingName="+buildingName;
		})
	}
	function competitorInfoLinkage(gridCode){
		$("#businessListGrid").jqGrid('clearGridData');
		$("#businessListGrid").GridUnload();
		//查询竞争对手信息
		$('#businessListGrid').jqGrid({
			url : $.cxt + "/competitorInfo/getCompetitorInfo",
			datatype : "json",
			mtype : "POST",
			postData : {gridCode:gridCode},
			height : 300,
			autowidth : false,
			colNames : [ '序号','基础单元名称','基础单元类型', '实际住户数', '异网联通宽带进线占比', '异网电信宽带进线占比', '未装宽带数', '联通移网用户数', '电信移网用户数', '收集率' ],
			colModel : [ 
			      {name : 'rowNum',align : 'center' ,width : 50}, 
			      {name : 'physicalGridName',align : 'center'}, 
			      {name : 'physicalGridType',align : 'center'},
			      {name : 'liveNum',align : 'center'}, 
			      {name : 'unicomBroadbandPer',align : 'center'}, 
			      {name : 'telecomBroadbandPer',align : 'center'}, 
			      {name : 'noBroadbandNum',align : 'center'},
			      {name : 'unicomUser',align : 'center'}, 
			      {name : 'telecomUser',align : 'center'}, 
			      {name : 'collectionRate',align : 'center'}
			      ],
			width : 930,
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10, 20, 30 ],
			pager : '#grid-pager3',
			gridComplete: function() { 
				   setNiceScroll()
			  } ,
			loadComplete : topjqGridLoadComplete
		});
		//查询按钮
		$("#searchCompetitorList").click(function(){
			reloadCompetitorJqGrid("search",gridCode);
		});
		//导出
		$("#exportCompetitorList").click(function(){
			var physicalGridName = encodeURI(encodeURI($("#businessGridName").val()));
			window.location.href=$.cxt +"/competitorInfo/export?gridCode="+gridCode+"&physicalGridName="+physicalGridName;
		})
	}
	function channelStationLinkage(gridCode){
		$("#channelListGrid").jqGrid('clearGridData');
		$("#channelListGrid").GridUnload();
		$('#channelListGrid').jqGrid({
			url : $.cxt + "/channelStation/getChannelManageInfo",
			datatype : "json",
			mtype : "POST",
			postData : {gridCode:gridCode},
			height : 120,
			autowidth : false,
			colNames : [ '序号','市场','渠道类型', '一级类型', '二级类型', '渠道数量', '市场份额' ],
			colModel : [ 
			      {name : 'rowNum',align : 'center' ,width : 50}, 
			      {name : 'marketType',align : 'center'}, 
			      {name : 'channelType',align : 'center'},
			      {name : 'chnlTypelevel1',align : 'center'}, 
			      {name : 'chnlTypelevel2',align : 'center'}, 
			      {name : 'channelCount',align : 'center'}, 
			      {name : 'salePercent',align : 'center'}
			      ],
			width : 910,
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10, 20, 30 ],
			pager : '#grid-pager4',
			gridComplete: function() { 
				   setNiceScroll()
			  } ,
			loadComplete : topjqGridLoadComplete
		});
		
		//导出
		$("#exportChannelManage").click(function(){
			window.location.href=$.cxt +"/channelStation/exportByChannelManage?gridCode="+gridCode;
		})
	}
	function baseStationInfoLinkage(gridCode){
		$("#stationListGrid").jqGrid('clearGridData');
		$("#stationListGrid").GridUnload();
		$('#stationListGrid').jqGrid({
			url : $.cxt + "/channelStation/getBaseStationInfo",
			datatype : "json",
			mtype : "POST",
			postData : {gridCode:gridCode},
			height : 120,
			autowidth : false,
			colNames : [ '序号','所属基础单元编码','所属基础单元名称', '基站类型', '基站数量', '常驻移网用户数', '常驻通话用户数' ],
			colModel : [ 
			      {name : 'rowNum',align : 'center' ,width : 50},
			      {name : 'physicalGridCode',align : 'center'}, 
			      {name : 'physicalGridName',align : 'center'},
			      {name : 'stationType',align : 'center'}, 
			      {name : 'stationNum',align : 'center'}, 
			      {name : 'czMobileUser',align : 'center'}, 
			      {name : 'czCallUser',align : 'center'}
			      ],
			width : 910,
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10, 20, 30 ],
			pager : '#grid-pager5',
			gridComplete: function() { 
				   setNiceScroll()
			  } ,
			loadComplete : topjqGridLoadComplete
		});
		//导出
		$("#exportBaseStation").click(function(){
			window.location.href=$.cxt +"/channelStation/exportByBaseStation?gridCode="+gridCode;
		})
	}
	function typeInfoLinkage(gridCode){
		$.ajax({
			url : $.cxt + '/basicUnitInfo/gridTypeInfo',
			type : "POST",
			data :{gridCode :gridCode},
			dataType: "json",
			success : function(json){
				var data = JSON.parse(json);
				var data1 = [];
				var data2 = [];
				var data3 = [];
				for(i=0;i<data.data.length;i++){
					data1.push(data.data[i].bigType);
					data2.push({
						"name": data1[i],
						 "value": data.data[i].num
					});
					data3.push({
						"name": data1[i],
				        "value": data.data[i].percent
					});
				}
				var mycharts = echarts.init(document.getElementById("typeInfo"));
			option = {
			    title: '',
			    grid: {
			        top: '24%',
			        left: '-8px',
			        bottom: '15%',
			        containLabel: true
			    },
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'none'
			        },
			        formatter: function(params) {
			        	console.log(params)
			            return params[0]["data"].name + "<br/>" + '数量: ' + params[1]["data"].value + "<br/>" + '占比率: ' + params[0]["data"].value;
			        }
			    },
			    xAxis: [{
			            type: 'category',
			            show: false,
			            data: data2,
			            axisLabel: {
			                textStyle: {
			                    color: '#b6b5ab'
			                }
			            }
			        },
			        {
			            type: 'category',
			            position: "bottom",
			            data: data1,
			            boundaryGap: true,
			            // offset: 40,
			            axisTick: {
			                show: false
			            },
			            axisLine: {
			                show: false
			            },
			            axisLabel: {
			            	 interval:0,
	                         rotate:60,
			                textStyle: {
			                    color: '#b6b5ab'
			                }
			            }
			        }

			    ],
			    yAxis: [{
			        show: false,
			        offset: 52,
			        splitLine: {
			            show: false,
			            lineStyle: {
			                color: "rgba(255,255,255,0.2)"
			            }
			        },
			        axisTick: {
			            show: false
			        },
			        axisLine: {
			            show: false
			        },
			        axisLabel: {
			            show: true,
			            color: '#b6b5ab'
			        }
			    }, {
			        show: true,
			        type: "value",
			        name: "占比率(%)",
			        position:'left',
			        nameTextStyle: {
			            color: '#ccc'
			        },
			        axisLabel: {
			            color: '#ccc'
			        },
			        splitLine: {
			            show: false
			        },
			        axisLine: {
			            show: true
			        },
			        axisTick: {
			            show: false
			        }
			    }],
			    color: ['#e54035'],
			    series: [{
			            name: '数量',
			            type: 'pictorialBar',
			            xAxisIndex: 1,
			            barCategoryGap: '10%',
			            // barCategoryGap: '-5%',
			            symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
			            itemStyle: {
			                normal: {
			                    color: function(params) {
			                    	var colorList = [
			                                         '#1E90FF','#87CEFA','#8A2BE2','#00008B','#27727B',
			                                          '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
			                                          '#D7504B','#C6E579','#a64d79','#073763','#274e13',
			                                          '#a14f4f','#b93232'
			                                       ];
			                        return colorList[params.dataIndex];
			                    }

			                },
			                emphasis: {
			                    opacity: 1
			                }
			            },
			            data: data2,
			        },
			        {	
			        	 symbol: 'image://data:image/png;base64,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',
			            symbolSize: 30,
			            name: "占比率",
			            type: "line",
			            yAxisIndex: 1,
			            data: data3,
			            itemStyle: {
			                normal: {
			                    borderWidth: 5,
			                    color: {
			                        colorStops: [{
			                                offset: 0,
			                                color: '#821eff'
			                            },

			                            {
			                                offset: 1,
			                                color: '#204fff'
			                            }
			                        ],
			                    }
			                }
			            }
			        }
			    ]
			}
			mycharts.setOption(option,true);
			}
		})
	}
	//有错误的话需要放开代码
	
	/*function changeBigTypeSelectLinkage(gridCode){
		$.ajax({
			url : $.cxt + "/basicUnitInfo/bigTypeInfo", 
			type: "POST",
			async:false,
			data :{gridCode :gridCode},
			success : function(data) {
				var data = JSON.parse(data);
					$("#bigTypeSelect").empty();
					for(i=0;i<data.data.length;i++){
						if(data.data[i].bigType != null){
							$("#bigTypeSelect").append(
									$("<option>"+data.data[i].bigType+"</option>").val(data.data[i].bigType)
							)
						}
					}
					$("#bigTypeSelect").val('居民小区');
					
				
			}
			
		})

		$("#bigTypeSelect").change(function(){
			var bigType = $(this).find("option:selected").val();
			typeRatioInfoLinkage(gridCode);
		})

	}
	function typeRatioInfoLinkage(gridCode){
		var bigType = $("#bigTypeSelect").find("option:selected").val();
		$.ajax({
			url : $.cxt + "/basicUnitInfo/gridTypeRatioInfo", 
			type: "POST",
			data :{
					gridCode :gridCode,
					bigType:bigType
				},
				async:false,
			success : function(json){
				var data = JSON.parse(json);
				var data1=  [];
				for(i=0;i<data.data.length;i++){
					data1.push({
						"name": data.data[i].smallType,
				        "value": data.data[i].percent
					});
				}
				var data = [
				            {"value": 12.2, "name": "峰 会"}, {"value": 8.4, "name": "座 谈 会"}, {
				            	"value": 7.6,
				            	"name": "展 览"
				            }, {"value": 5.9, "name": "洽 谈 会"}, {"value": 3.6, "name": "交 易 会"}, {
				            	"value": 2.9,
				            	"name": "交 流 会"
				            }, {"value": 2.2, "name": "圆桌会议"}, {"value": 1.7, "name": "学术会议"}, {"value": 0.4, "name": "恳 谈 会"}
				            ];
				data_name = [];
				for (var n  in data1){
					data1[n]['name'] = data1[n]['name'] + ' '+data1[n]['value'] +'%';
					data_name.push(data1[n]['name'])
				}
				console.log(data_name)
				var mycharts = echarts.init(document.getElementById("typeRatioInfo1"));
				option = {
						tooltip: {
							trigger: 'item',
							formatter: "{b}"
						},
						legend: {
							orient: 'vertical',
							top: 'center',
							right: 10,
							data:data_name,
							textStyle: {
								color: "#fff",
								fontWeight:'normal',
								fontFamily:'宋体'
							}
						},
						
						series: [
						         
						         {
						        	 name:'',
						        	 type:'pie',
						        	 clockWise : false, 
						        	 radius: ['40%', '55%'],
						        	 center : ['40%', '50%'],
						        	 color: [ '#DC143C','#0BB4E4','#9F85FF','#FFFF00','#C76B73','#808040','#8B008B','#0431B4','#FF4000','#CD853F','#FA5882'],
						        	 data:data1
						         }
						         ]
				};
				mycharts.setOption(option,true);
			}
		})
}*/
	function buildDetailInfoLinkage(gridCode){
		var buildDetailInfoType = $("#buildTypeSelect").find("option:selected").val();
		$.ajax({
			url : $.cxt + "/buildDetailInfo/gridBuildDetailInfo", 
			type: "POST",
			data :{
					listType:buildDetailInfoType,
					gridCode :gridCode
				},
			success : function(json) {
				var data = JSON.parse(json);
				var data1 = [];
				var data2 = [];
				for(i=0;i<data.data.length;i++){
					data1.push(data.data[i].BUILDTYPE);
					data2.push({
						"name": data.data[i].BUILDTYPE,
				        "value": data.data[i].PERCENT
					});
				}
				var  myseries =[];
				var colorList = [
	                             '#1E90FF','#fff000','#8A2BE2','#00008B','#27727B',
	                              '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
	                              '#D7504B','#C6E579','#a64d79','#073763','#274e13',
	                              '#a14f4f','#b93232'
	                           ];
				for(var i=0 ;i<data2.length;i++){
					var tmpData =[];
					for(var j=0 ;j<data2.length;j++){
						tmpData.push(0);
					}
					tmpData[i] = data2[i].value;
					myseries.push({
	                    name:data2[i].name,
	                    type:'bar',
	                    barGap:'-100%',
	                    barWidth:24,
	                    data:tmpData,
	                    itemStyle: {
	                    	 normal: {
	                    		 color: colorList[i%colorList.length]
	                    	 	}
			            }

	                })
				}
				var mycharts = echarts.init(document.getElementById("buildDetailInfo"));
				var data = {info:{xaxis:data1}}
				var lenData=data2
				option = {
				                    title : {
				                        text: '',
				                    },
				                    tooltip : {
				                        trigger: 'axis',
				                        axisPointer:{type:'shadow'},
				                        formatter:function (param) {
				                            console.log("asddasd"+param);
				                            for(var k in param) {
				                                if (param[k].name.indexOf(param[k].seriesName) > -1) {
				                                    return '<div style="background-color: '+param[k].color+';height: 10px;width: 10px;border-radius: 5px;display:inline-block"></div>'+param[k].name+'<br/>'+'占比:'+param[k].value+'%';
				                                }
				                            }
				                        }
				                    },
				                    legend: {
				                       orient: 'vertical',
										/*top: 'center',*/
										right: 10,
				                        data:data1,
				                        textStyle: {
											color: "#fff",
											fontWeight:'normal',
											fontFamily:'宋体'
										},
				                        formatter: function (name) {
				                            for(var i=0,n=lenData.length;i<n;i++){
				                                if(lenData[i].name==name){
				                                   return  name+"  "+lenData[i].value+"%";
				                                }
				                            }
				                             return 'Legend ' + name;
				                         }
				                    },
				                    grid:{
				                      left:15,
				                      right:60,
				                      width: '80%',
				                      bottom:'3%',
				                      containLabel:true
				                    },
				                    xAxis : [
				                        {
				                            type : 'category',
				                            data : data.info.xaxis,
				                            axisLabel:{
				                                interval:0,
				                                rotate:10,
				                                align:'center',
				                                margin:15
				                            },
				                            axisLabel:{
				                                color:"#3c78d8"
				                            }
				                        }
				                    ],
				                    yAxis : [
				                        {
				                            name:'占比率',
				                            type : 'value',
				                            splitNumber:4,
				                            axisLabel:{
				                                color:"#3c78d8"
				                            }
				                        }
				                    ],
				                    series : myseries
				                };
				mycharts.setOption(option,true);

			}
			
		})
	}
	function changeBuildTypeSelectLinkage(gridCode){
		$.ajax({
			url : $.cxt + "/buildDetailInfo/buildDetailTypeInfo", 
			type: "POST",
			async:false,
			success : function(data) {
				var data = JSON.parse(data);
					$("#buildTypeSelect").empty();
					for(i=0;i<data.data.length;i++){
						if(data.data[i].listValue != null){
							$("#buildTypeSelect").append(
									$("<option>"+data.data[i].listValue+"</option>").val(data.data[i].listType)
							)
						}
					}
					/*$("#buildTypeSelect").val('BUILD_AGE');*/

				
			}
			
		})

		$("#buildTypeSelect").change(function(){
			var buildDetailInfoType = $(this).find("option:selected").val();
			buildDetailInfo();
		})


	}
	function businessDetailInfoLinkage(gridCode){
		var operator = $("#Operator").find("option:selected").val();
		var businessTypeSelect = $("#businessTypeSelect").find("option:selected").val();
		$.ajax({
			url : $.cxt + "/competitorInfo/getCompetitorRatio", 
			type: "POST",
			data:{
				listType:operator,
				gridCode :gridCode,
				physicalGridCode:businessTypeSelect
			},
			success : function(json) {
				var data = JSON.parse(json);
				if(data.data.unicomBroadbandPer != null &&  data.data.unicomBroadbandPer != 0 && data.data.unicomBroadbandPer != ""){
					var data1 = [];
						data1.push("宽带份额:"+data.data.unicomBroadbandPer+"%");
						data1.push("联通用户份额:"+data.data.unicomUserPer+"%")
				}
				if(data.data.telecomBroadbandPer != null && data.data.telecomBroadbandPer !=0 && data.data.telecomBroadbandPer != ""){
					var data1 = [];
						data1.push("宽带份额:"+data.data.telecomBroadbandPer+"%");
						data1.push("电信用户份额:"+data.data.telecomUserPer+"%")
					
				}
				if(data.data.mobileBroadbandPer != null && data.data.mobileBroadbandPer != 0 && data.data.mobileBroadbandPer != ""){
					var data1 = [];
						data1.push("宽带份额:"+data.data.mobileBroadbandPer+"%");
						data1.push("移动用户份额:"+data.data.mobileUserPer+"%")
					
				}
				var mycharts = echarts.init(document.getElementById("businessDetailInfo"));
				function getData(percent) {
				    return [{
				        value: percent,
				        name: percent,
				       
				    }, {
				        value: 1 - percent,
				        itemStyle: {
				            normal: {
				                color: 'transparent'
				            }
				        }
				    }];
				}

				placeHolderStyle1 = {
				    normal: {
				        label: {
				            show: false,
				        },
				        labelLine: {
				            show: false,
				        },
				        color:'#FF0000',

				    }
				};
				placeHolderStyle2 = {
					    normal: {
					        label: {
					            show: false,
					        },
					        labelLine: {
					            show: false,
					        },
					        color:'#CD853F',

					    }
					};

				option = {
				    tooltip: {
				        trigger: 'item',
				        formatter: function(params, ticket, callback) {

				            return params.seriesName ;
				        }
				    },
				    legend: {
				    	orient: 'vertical',
				        left: "10%",
				        itemHeight: 18,
				        data: data1,
				        textStyle: {
				            color: '#fff'
				        },

				        selectedMode: true,
				        orient: "vertical",

				    },
				    series: [{
				        name: '实勘率',
				        type: 'pie',
				        clockWise: true, //顺时加载
				        hoverAnimation: false, //鼠标移入变大
				        radius: [180, 200],
				        itemStyle: placeHolderStyle1,

				        label: {
				            normal: {
				                show: false,
				            }
				        },
				        data:getData(0.5)
				    }, {
				        name: '户型图比例',
				        type: 'pie',
				        clockWise: true, //顺时加载
				        hoverAnimation: false, //鼠标移入变大
				        radius: [155, 175],
				        itemStyle: placeHolderStyle2,
				        data: getData(0.5)
				    }]
				};
				
				if(data.data.unicomBroadbandPer != null &&  data.data.unicomBroadbandPer != 0 && data.data.unicomBroadbandPer != ""){
						option.series[0].name=[];
						option.series[0].name ="宽带份额:"+data.data.unicomBroadbandPer+"%";
						option.series[1].name=[];
						option.series[1].name ="联通用户份额:"+data.data.unicomUserPer+"%";
						option.series[0].data=[];
						option.series[0].data=getData(data.data.unicomBroadbandPer/100);
						option.series[1].data=[];
						option.series[1].data=getData(data.data.unicomUserPer/100);
				}
				if(data.data.telecomBroadbandPer != null && data.data.telecomBroadbandPer !=0 && data.data.telecomBroadbandPer != ""){
						option.series[0].name=[];
						option.series[0].name ="宽带份额:"+data.data.telecomBroadbandPer+"%";
						option.series[1].name=[];
						option.series[1].name ="电信用户份额:"+data.data.telecomUserPer+"%";
						option.series[0].data=[];
						option.series[0].data=getData(data.data.telecomBroadbandPer/100);
						option.series[1].data=[];
						option.series[1].data=getData(data.data.telecomUserPer/100);
					
				}
				if(data.data.mobileBroadbandPer != null && data.data.mobileBroadbandPer != 0 && data.data.mobileBroadbandPer != ""){
						option.series[0].name=[];
						option.series[0].name ="宽带份额:"+data.data.mobileBroadbandPer+"%";
						option.series[1].name=[];
						option.series[1].name ="移动用户份额:"+data.data.mobileUserPer+"%";
						option.series[0].data=[];
						option.series[0].data=getData(data.data.mobileBroadbandPer/100);
						option.series[1].data=[];
						option.series[1].data=getData(data.data.mobileUserPer/100);
					
				}
				mycharts.clear();
				console.log(option.series)
				mycharts.setOption(option,true);
			}
			
		})

	}
	function businessTypeLinkage(gridCode){
		$.ajax({
			url : $.cxt + "/competitorInfo/getPhysicalGridName", 
			type: "POST",
			data :{
				gridCode :gridCode,
			},
			async:false,
			success : function(data) {
				var data = JSON.parse(data);
					$("#businessTypeSelect").empty();
					for(i=0;i<data.data.length;i++){
						if(data.data[i].physicalGridName != null){
							$("#businessTypeSelect").append(
									$("<option>"+data.data[i].physicalGridName+"</option>").val(data.data[i].physicalGridCode)
							)
						}
					}
					/*$("#businessTypeSelect").val('阳光家园-A栋');*/

				
			}
			
		})

		$("#businessTypeSelect").change(function(){
			var buildDetailInfoType = $(this).find("option:selected").val();
			businessDetailInfo();
		})



	}
	function channelOperatorLinkage(gridCode){
		$.ajax({
			url : $.cxt + "/channelStation/getOperatorInfo", 
			type: "POST",
			async:false,
			data:{
				gridCode:gridCode
			},
			success : function(data) {
				var data = JSON.parse(data);
					$("#channelOperator").empty();
					for(i=0;i<data.data.length;i++){
						if(data.data[i].marketType != null){
							$("#channelOperator").append(
									$("<option>"+data.data[i].marketType+"</option>").val(data.data[i].marketType)
							)
						}
					}
				
			}
			
		})

		$("#channelOperator").change(function(){
			var marketType = $(this).find("option:selected").val();
			channelTypeLinkage(gridCode);
			channelInfoLinkage(gridCode);
		})
	}
	function channelTypeLinkage(gridCode){
		var marketType = $("#channelOperator").find("option:selected").val();
		$.ajax({
			url : $.cxt + "/channelStation/getChannelType", 
			type: "POST",
			async:false,
			data:{
				gridCode:gridCode,
				marketType:marketType
			},
			success : function(data) {
				var data = JSON.parse(data);
					$("#channelTypeSelect").empty();
					for(i=0;i<data.data.length;i++){
						if(data.data[i].channelType != null){
							$("#channelTypeSelect").append(
									$("<option>"+data.data[i].channelType+"</option>").val(data.data[i].channelType)
							)
						}
					}
				
			}
			
		})

		$("#channelTypeSelect").change(function(){
			var channelType = $(this).find("option:selected").val();
			channelInfoLinkage(gridCode);
		})

	}
	function channelInfoLinkage(gridCode){
		var marketType = $("#channelOperator").find("option:selected").val();
		var channelType = $("#channelTypeSelect").find("option:selected").val();
		$.ajax({
			url : $.cxt + "/channelStation/getChnlTypelevel2Ratio", 
			type: "POST",
			data:{
				gridCode:gridCode,
				marketType:marketType,
				channelType:channelType
			},
			success : function(json) {
				var data = JSON.parse(json);
				var mycharts = echarts.init(document.getElementById("channelInfo1"));
				var data1=  [];
				for(i=0;i<data.data.length;i++){
					data1.push( data.data[i].chnlTypelevel2+':'+data.data[i].percent+'%' );
				}
				function getData(percent) {
				    return [{
				        value: percent,
				        name: percent,
				       
				    }, {
				        value: 1 - percent,
				        itemStyle: {
				            normal: {
				                color: 'transparent'
				            }
				        }
				    }];
				}

				placeHolderStyle = {
				    normal: {
				        label: {
				            show: false,
				        },
				        labelLine: {
				            show: false,
				        }
				        

				    }
				};

				option = {
				    tooltip: {
				        trigger: 'item',
				        formatter: function(params, ticket, callback) {

				            return params.seriesName ;
				        }
				    },
				    legend: {
				    	orient: 'vertical',
				        left: "10%",
				        itemHeight: 18,
				        data: data1,
				        textStyle: {
				            color: '#fff'
				        },

				        selectedMode: true,
				        orient: "vertical",

				    },
				    series: []
				};
				 var colorList = [
	                              '#1E90FF','#87CEFA','#8A2BE2','#00008B','#27727B',
	                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
	                               '#D7504B','#C6E579','#a64d79','#073763','#274e13',
	                               '#a14f4f','#b93232'
	                            ];
				for(i=0;i<data.data.length;i++){
					option.series.push({
				        name: data.data[i].chnlTypelevel2+':'+data.data[i].percent+'%',
				        type: 'pie',
				        clockWise: true, //顺时加载
				        hoverAnimation: false, //鼠标移入变大
				        radius: [20+30*i, 40+30*i],
				        itemStyle: {
						    normal: {
						        label: {
						            show: false,
						        },
						        labelLine: {
						            show: false,
						        },
						        color:colorList[i%colorList.length]

						    }
						},
				        data: getData(data.data[i].percent/100)
				    })
				}
				mycharts.setOption(option,true);
			}
			
		})

	}
	function baseStationDetailsInfoLinkage(gridCode){
		$.ajax({
			url : $.cxt + "/channelStation/getBaseStationDetailsRatio", 
			type: "POST",
			data:{
				gridCode:gridCode,
			},
			success : function(json) {
				var data = JSON.parse(json);
				var mycharts = echarts.init(document.getElementById("baseStationInfo1"));
				var data1 = [];
				var data2 = [];
				var data3 = [];
				var data4 = [];
				for (i=0;i<data.data.length;i++) {
			        data1.push(data.data[i].stationType);
			        data2.push(data.data[i].per2G);
			        data3.push(data.data[i].per3G);
			        data4.push(data.data[i].per4G);
			    }
				var xData = function() {
				    var data2 = [];
				    for (i=0;i<data.data.length;i++) {
				        data2.push(data.data[i].stationType  + "");
				    }
				    return data2;
				}();

				option = {
				    "tooltip": {
				        "trigger": "axis",
				        "axisPointer": {
				            "type": "shadow",
				            textStyle: {
				                color: "#fff"
				            }

				        },
				    },
				    "grid": {
				        "borderWidth": 0,
				        "top": 110,
				        "bottom": 95,
				        textStyle: {
				            color: "#fff"
				        }
				    },
				    "legend": {
				        x: '4%',
				        top: '11%',
				        textStyle: {
				            color: '#90979c',
				        },
				        "data": ["2G","3G","4G"]
				    },
				     

				    "calculable": true,
				    "xAxis": [{
				        "type": "category",
				        "axisLine": {
				            lineStyle: {
				                color: '#90979c'
				            }
				        },
				        "splitLine": {
				            "show": false
				        },
				        "axisTick": {
				            "show": false
				        },
				        "splitArea": {
				            "show": false
				        },
				        "axisLabel": {
				            "interval": 0,
				            rotate:45,

				        },
				        "data": xData,
				    }],
				    "yAxis": [{
				    	"name":'占比率',
				        "type": "value",
				        "splitLine": {
				            "show": false
				        },
				        "axisLine": {
				            lineStyle: {
				                color: '#90979c'
				            }
				        },
				        "axisTick": {
				            "show": false
				        },
				        "axisLabel": {
				            "interval": 0,

				        },
				        "splitArea": {
				            "show": false
				        },

				    }],
				    "dataZoom": [{
				        "show": true,
				        "height": 30,
				        "xAxisIndex": [
				            0
				        ],
				        bottom: 30,
				        "start": 10,
				        "end": 80,
				        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
				        handleSize: '110%',
				        handleStyle:{
				            color:"#d3dee5",
				            
				        },
				           textStyle:{
				            color:"#fff"},
				           borderColor:"#90979c"
				        
				        
				    }, {
				        "type": "inside",
				        "show": true,
				        "height": 15,
				        "start": 1,
				        "end": 35
				    }],
				    "series": [{
				            "name": "2G",
				            "type": "bar",
				            "stack": "总量",
				            "barWidth":"22",
				            "barMaxWidth": "35",
				            "barGap": "30%",
				            "itemStyle": {
				                "normal": {
				                    "color": "rgba(255,144,128,1)",
				                    "label": {
				                        "show": true,
				                        "textStyle": {
				                            "color": "#fff"
				                        },
				                        "position": "insideTop",
				                        formatter: function(p) {
				                            return p.value > 0 ? (p.value) : '';
				                        }
				                    }
				                }
				            },
				            "data": data2,
				        },

				        {
				            "name": "3G",
				            "type": "bar",
				            "stack": "总量",
				            "barWidth":"22",
				            "barGap": "30%",
				            "itemStyle": {
				                "normal": {
				                    "color": "rgba(0,191,183,1)",
				                    "barBorderRadius": 0,
				                    "label": {
				                        "show": true,
				                        "position": "insideTop",
				                        formatter: function(p) {
				                            return p.value > 0 ? (p.value) : '';
				                        }
				                    }
				                }
				            },
				            "data": data3
				        },
				        {
				            "name": "4G",
				            "type": "bar",
				            "stack": "总量",
				            "barWidth":"22",
				            "barGap": "30%",
				            "itemStyle": {
				                "normal": {
				                    "color": "rgba(122, 103, 238)",
				                    "barBorderRadius": 0,
				                    "label": {
				                        "show": true,
				                        "position": "insideTop",
				                        formatter: function(p) {
				                            return p.value > 0 ? (p.value) : '';
				                        }
				                    }
				                }
				            },
				            "data": data4
				        }
				    ]
				}
				mycharts.setOption(option,true);
			}
			
		})

	}
	var init = {
			dataInit:function(){
				var data2 = this.data2;
				var colNames2 = this.colNames2;
				var colModels2 = this.colModels2;
				this.setJqgrid(data2,'#businessListGrid',colNames2,colModels2,"grid-pager3");
			},
			data2:
				[ 
	                {id:"1",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"2",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"3",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"4",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"5",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"6",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"7",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"8",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"9",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"10",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"11",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"12",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"13",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"14",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"15",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''},
	                {id:"16",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4",note:''}
	            ]
			,
			colNames2:['test1','test2','test3', 'test4'],
	        colModels2:[ {name:'data',index:'data',align:"center"}, 
	                     {name:'data0',index:'data1',align:"center"}, 
	                     {name:'data1',index:'data2',align:"center"}, 
	                     {name:'data2',index:'data3',align:"center"}                  
	                 ],
			setJqgrid:function(setData,setDivs,colNames,colModels,gridPager){
				$(setDivs).jqGrid({               
	                datatype: "local", 
	                data: setData,           
	                altRows:true,
	                width:$(window).width()-260,
	                height: $(window).height()-200,
	                multiselet: false,//checkbox
	                colNames:colNames,
	                colModel:colModels,
	                loadComplete: function() {
	                var grid = $(setDivs);
	                var ids = grid.getDataIDs();
	                for (var i = 0; i < ids.length; i++) {
	                    grid.setRowData ( ids[i], false, {height: 40} );//设置grid行高度
	                   }},
	                pager: '#'+gridPager, 
	                rowNum:20, 
	                viewrecords: true, 
	                rowList:[10,20,30],
	                viewrecords : true
	            });
				/*$(".ui-jqgrid-bdiv").slimScroll({
		            height:$(window).height()-190,
		            width: '100%', 
		            color:"#5cd4f8",
		            opacity: 1,
		            alwaysVisible: true
		        });*/
				/*$(".ui-jqgrid-bdiv").scrollBar({
				    barWidth: 6, //滚动条的宽度(这里根据需要写数值即可，不设置是10,即默认10px)
				    position: "x,y", //写“x”代表只出水平滚动条，写“y”表示只出垂直滚动条，写“x,y”则出水平和垂直滚动条（只有在内容超出容器时才出现滚动条）
				    wheelDis: 15 //滚轮滚动一次向下或向上滚动的距离，默认是15，可根据需要修改数值
				});*/
				
				$("#first_"+gridPager).find("span").addClass("bigger-150 fa fa-angle-double-left");
	            $("#prev_"+gridPager).find("span").addClass("bigger-150 fa fa-angle-left");
	            $("#next_"+gridPager).find("span").addClass("bigger-150 fa fa-angle-right");
	            $("#last_"+gridPager).find("span").addClass("bigger-150 fa fa-angle-double-right");
				
			},
			addButton:function (cellvalue, options, cell){			
				return $("<div><div>").append(
						$("<span></span>")
						.append("操作")
						.addClass("gridBtns")
						.attr("title","操作")
					).append(
						$("<span></span>")
						.append("查看")
						.addClass("gridBtns")
						.attr("title","查看")
					).html();			
			}
	}
	init.dataInit();
	
})

//网格统计信息-基本信息&&网格基本信息-网格基本信息/资源信息 
//function getGridInfo(){
//	$.ajax({
//		url : $.cxt + '/gridInfo/gridBaseInfo',
//		type : "POST",
//		data :{gridCode :gridCode},
//		dataType: "json",
//		success : function(json){
//			var data = JSON.parse(json);
//			if(data.code == '0'){
//				//网格统计信息-基本信息
//				$("#gridName").append(data.data[0].gridName)
//				$("#gridType").append(data.data[0].gridType)
//				$("#gridManager").append(data.data[0].gridManager)
//				$("#phoneNumber").append(data.data[0].phoneNumber)
//				$("#gridScore").append(data.data[0].gridScore)
//				$("#groupNum").append(data.data[0].groupNum)
//				$("#userNum").append(data.data[0].userNum)
//				$("#kdPercent").append(data.data[0].kdPercent)
//				$("#physicalNum").append(data.data[0].physicalNum)
//				$("#gridArea").append(data.data[0].gridArea)
//				$("#createDate").append(data.data[0].createDate)
//				//网格统计信息 -统计信息
//				$("#kdNum").append(data.data[0].kdNum)
//				$("#totalFee").append(data.data[0].totalFee)
//				$("#totalFeeLast").append(data.data[0].totalFeeLast)
//				$("#compare").append(data.data[0].compare)
//				$("#kdFee").append(data.data[0].kdFee)
//				$("#ywFee").append(data.data[0].ywFee)
//				$("#newUserNum").append(data.data[0].newUserNum)
//				$("#outnetNum").append(data.data[0].outnetNum)
//				//网格基本信息-资源信息
//				$("#voiceNum").append(data.data[0].voiceNum)
//				$("#voicePortNum").append(data.data[0].voicePortNum)
//				$("#dataNum").append(data.data[0].dataNum)
//				$("#dataPortNum").append(data.data[0].dataPortNum)
//				$("#voicePer").append(data.data[0].voicePer)
//				$("#voicePortPer").append(data.data[0].voicePortPer)
//				$("#dataPer").append(data.data[0].dataPer)
//				$("#dataPortPer").append(data.data[0].dataPortPer)
//				//网格基本信息-网格基本信息
//				$("#remarks").append(data.data[0].remarks)
//				$("#tabname").append(data.data[0].tabname)
//				$("#tableCreaterTime").append(data.data[0].tableCreaterTime)
//				$("#owner").append(data.data[0].owner)
//				$("#minTime").append(data.data[0].minTime)
//				$("#maxTime").append(data.data[0].maxTime)
//				$("#gridCode").append(data.data[0].gridCode)
//				$("#gridName1").append(data.data[0].gridName)
//				$("#gridType1").append(data.data[0].gridType)
//				$("#gridManager1").append(data.data[0].gridManager)
//				$("#phoneNumber1").append(data.data[0].phoneNumber)
//				$("#branchCompany").append(data.data[0].branchCompany)
//				$("#branchSubstation").append(data.data[0].branchSubstation)
//				$("#creater").append(data.data[0].creater)
//				$("#createTime").append(data.data[0].createTime)
//			}
//		}
//		
//	})
//}

//网格基本信息-网格团队信息
function getGridTeamInfo(){
	$.ajax({
		url : $.cxt + '/gridInfo/getGridTeamInfo',
		type : "POST",
		success : function(json){
			var gridTeamInfo = JSON.parse(json);
			if(gridTeamInfo.code == '0'){
				for(var i=0;i<gridTeamInfo.data.length;i++){
					$(".teamInfoListUl").append(
							$("<li></li>").addClass("teamInfoList clearfix").append(
									$("<div></div>").addClass("teamInfoLITitle").append(gridTeamInfo.data[i].staffCode)
							).append(
									$("<div></div>").addClass("teamInfoLITitle").append(gridTeamInfo.data[i].staffName)
							).append(
									$("<div></div>").addClass("teamInfoLITitle").append(gridTeamInfo.data[i].role)
							).append(
									$("<div></div>").addClass("teamInfoLITitle").append(gridTeamInfo.data[i].phoneNumber)
							).append(
									$("<div></div>").addClass("teamInfoLITitle").append(gridTeamInfo.data[i].department)
							).append(
									$("<div></div>").addClass("teamInfoLITitle").append(gridTeamInfo.data[i].company)
							)
					)
				}
			}
		}
		
	})
}

//重新加载楼宇表格
var reloadJqGrid = function(flag,code) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	var physicalGridName = $("#belongPhysicalGrid").val();
	var gridCode = code;
	$("#buildingListGrid").jqGrid('setGridParam',{    
        postData : {
        	"gridCode":gridCode,
        	"physicalGridName":physicalGridName
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}

//重新加载竞争对手信息
var reloadCompetitorJqGrid = function(flag,code) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	var gridCode = code;
	var physicalGridName = $("#businessGridName").val();
	$("#businessListGrid").jqGrid('setGridParam',{    
        postData : {
        	"gridCode":gridCode,
        	"physicalGridName":physicalGridName
        },  
        page : 1    
    }).trigger("reloadGrid"); }

//重新基础单元信息
var reloadBasicUnitJqGrid = function(flag,code) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	var gridCode = code;
	var physicaName = $("#physicalGridName").val();
	$("#userListGrid").jqGrid('setGridParam',{    
        postData : {
        	"gridCode":gridCode,
        	"physicaName":physicaName
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}
//编辑基础单元信息
/*var showBasicUnitForm = function(physicalGridCode) {
	topwindow.showWindow({
		title : '基础信息单元编辑',
		data : {physicalGridCode : physicalGridCode},
		url : $.cxt + "/basicUnitInfo/showBasicUnitInfo",
		bottons : [{
			title: "确认",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("basicUnitEditForm")){
					$.ajax({
						url : $.cxt + "/sysuser/insertorupdatesysuser", 
						data : topgetObjByObj($("#basicUnitEditForm .form-control")),
						type: "POST",
						success : function(data) {
							//重新加载表格
							reloadJqGrid();
							//关闭窗口
							topwindow.removeWindow();
							//操作提示
							topshowAlertSuccessDiv();
						}
					});
				}
			}
		}],
		fun:function(){
		}
	});
}*/
//function incomeInfo(){
//	$.ajax({
//		url : $.cxt + '/gridInfo/gridBaseInfo',
//		type : "POST",
//		data :{gridCode :gridCode},
//		dataType: "json",
//		success : function(json){
//			var data = JSON.parse(json);
//			var incomeInfoDom= document.getElementById('incomeInfo')
//			incomeInfoDom.style.width = '359.59px';
//			incomeInfoDom.style.height = '250px';
//			var incomeInfo = echarts.init(incomeInfoDom);
//			option = {
//					//backgroundColor: '#192469',
//					tooltip: {
//						trigger: 'item',
//						 borderWidth: 1,
//						formatter: "{a}{b}&nbsp;: {c} <br/>&nbsp;&nbsp;&nbsp;&nbsp;占比&nbsp;:&nbsp;&nbsp;{d}%",
//					},
//					legend: {
//						orient: 'vertical',
//						x: 'right',
//						y: 'top',
//						itemWidth: 14,
//						itemHeight: 24,
//						align: 'left',
//						data:['2/3G收入','4G收入','家宽收入','终端收入','新和家庭收入','魔百盒收入'],
//						textStyle: {
//							color: '#fff'
//						}
//					},
//					series: [
//					         
//					         {
//					        	 name:'',
//					        	 type:'pie',
//					        	 radius: ['0%', '80%'],
//					        	 center:['50%','56%'],
//					        	 color: [ '#01FFFF','#0BB4E4','#9F85FF','#2828FF','#C76B73','#808040'],
//					        	 label: {
//					        		 normal: {
//					        			 formatter: '{b}\n{d}%',
//					        		 },
//					        		 
//					        	 },
//					        	 data:[
//					        	       {value:data.data[0].fee2g3g,name:'2/3G收入'},
//					        	       {value:data.data[0].fee4g,name:'4G收入'},
//					        	       {value:data.data[0].kdFee,name:'家宽收入'},
//					        	       {value:data.data[0].terminalFee,name:'终端收入'},
//					        	       {value:data.data[0].xhjtFee,name:'新和家庭收入'},
//					        	       {value:data.data[0].tvFee,name:'魔百盒收入'}
//					        	       ]
//					         }
//					         ]
//			};
//			incomeInfo.setOption(option,true);
//		}
//	})
//}
//function businessInfo(){$.ajax({
//	url : $.cxt + '/gridInfo/gridBaseInfo',
//	type : "POST",
//	data :{gridCode :gridCode},
//	dataType: "json",
//	success : function(json){
//		var data = JSON.parse(json);
//		var businessInfoDom= document.getElementById('businessInfo')
//		businessInfoDom.style.width = '359.59px';
//		businessInfoDom.style.height = '200px';
//		var businessInfo = echarts.init(businessInfoDom);
//		var data1=[data.data[0].new2g3gNum,data.data[0].new4gNum,data.data[0].kdNewNum,data.data[0].terminalNewNum,data.data[0].newXhjtNum,data.data[0].tvNewNum];
//		var option = {
//				tooltip : {
//					trigger: 'axis',
//					axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//						type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//					}
//				},
//				color:['#01f99b','#3366ff'],
//				legend: {
//					data: [
//					       '月接口表', '日接口表'
//					       ],
//					       bottom:'bottom',
//					       textStyle:{
//					    	   color:"#fff",
//					    	   fontSize:10
//					       },
//					       show:false,
//					       itemWidth:20,
//					       itemHeight:10
//				},
//				grid: {
//					left: '5%',
//					right: '5%',
//					top: '5%',
//					containLabel: true
//				},
//				xAxis : [
//				         /*{
//	            type : 'category',
//	            data : ['新增','增量','全量'],
//	            axisLine:{
//	                lineStyle:{
//	                    color:'#fff'
//	                }
//	            }	
//	        },*/
//				         {
//				        	 type : 'category',
//				        	 position:'bottom',
//				        	 offset:10,
//				        	 data : ['2G/3G用户','4G用户','家宽用户','终端发展','新和家庭','魔百盒'],
//				        	 axisLine:{
//				        		 show:false,
//				        		 lineStyle:{
//				        			 color:'#0099ff',
//				        			 width:0,
//				        			 opacity:0
//				        		 }
//				        	 },
//				        	 axisTick:{
//				        		 show:false
//				        	 },
//				        	 axisLabel: {
//                                 interval:0,
//                                 rotate:0
//                              }
//				        	 
//				         }
//				         ],
//				         yAxis : [{
//				        	 type : 'value',
//				        	 name: '单位:个',
//				        	 axisLine:{
//				        		 lineStyle:{
//				        			 color:'#ccc',
//				        			 width:0,
//				        			 opacity :0
//				        		 }
//				        	 }
//				         
//				         }],
//				         series : [
//				                   {
//				                	   name:'',
//				                	   type:'bar',
//				                	   barWidth :10,
//				                	   barGap:0.4,
//				                	   data:data1,
//				                	   label: {
//				                		   normal: {
//				                			   show: true,
//				                			   position: 'top',
//				                			   formatter: function(params) {
//				                				   return params.value
//				                			   },
//				                			   textStyle: {color: '#fff'}
//				                		   }
//				                	   }
//				                   
//				                   }
//				                   ]
//		};
//		businessInfo.setOption(option,true);
//	}
//	
//})
//	
//}
function typeInfo(){
	$.ajax({
		url : $.cxt + '/basicUnitInfo/gridTypeInfo',
		type : "POST",
		data :{gridCode :gridCode},
		dataType: "json",
		success : function(json){
			var data = JSON.parse(json);
			var data1 = [];
			var data2 = [];
			var data3 = [];
			for(i=0;i<data.data.length;i++){
				data1.push(data.data[i].bigType);
				data2.push({
					"name": data1[i],
					 "value": data.data[i].num
				});
				data3.push({
					"name": data1[i],
			        "value": data.data[i].percent
				});
			}
			var mycharts = echarts.init(document.getElementById("typeInfo"));
		option = {
		    title: '',
		    grid: {
		        top: '24%',
		        left: '-8px',
		        bottom: '15%',
		        containLabel: true
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'none'
		        },
		        formatter: function(params) {
		        	console.log(params)
		            return params[0]["data"].name + "<br/>" + '数量: ' + params[1]["data"].value + "<br/>" + '占比率: ' + params[0]["data"].value;
		        }
		    },
		    xAxis: [{
		            type: 'category',
		            show: false,
		            data: data2,
		            axisLabel: {
		                textStyle: {
		                    color: '#b6b5ab'
		                }
		            }
		        },
		        {
		            type: 'category',
		            position: "bottom",
		            data: data1,
		            boundaryGap: true,
		            // offset: 40,
		            axisTick: {
		                show: false
		            },
		            axisLine: {
		                show: false
		            },
		            axisLabel: {
		            	 interval:0,
                         rotate:60,
		                textStyle: {
		                    color: '#b6b5ab'
		                }
		            }
		        }

		    ],
		    yAxis: [{
		        show: false,
		        offset: 52,
		        splitLine: {
		            show: false,
		            lineStyle: {
		                color: "rgba(255,255,255,0.2)"
		            }
		        },
		        axisTick: {
		            show: false
		        },
		        axisLine: {
		            show: false
		        },
		        axisLabel: {
		            show: true,
		            color: '#b6b5ab'
		        }
		    }, {
		        show: true,
		        type: "value",
		        name: "占比率(%)",
		        position:'left',
		        nameTextStyle: {
		            color: '#ccc'
		        },
		        axisLabel: {
		            color: '#ccc'
		        },
		        splitLine: {
		            show: false
		        },
		        axisLine: {
		            show: true
		        },
		        axisTick: {
		            show: false
		        }
		    }],
		    color: ['#e54035'],
		    series: [{
		            name: '数量',
		            type: 'pictorialBar',
		            xAxisIndex: 1,
		            barCategoryGap: '10%',
		            // barCategoryGap: '-5%',
		            symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                    	var colorList = [
		                                         '#1E90FF','#87CEFA','#8A2BE2','#00008B','#27727B',
		                                          '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
		                                          '#D7504B','#C6E579','#a64d79','#073763','#274e13',
		                                          '#a14f4f','#b93232'
		                                       ];
		                        return colorList[params.dataIndex];
		                    }

		                },
		                emphasis: {
		                    opacity: 1
		                }
		            },
		            data: data2,
		        },
		        {	
		        	 symbol: 'image://data:image/png;base64,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',
		            symbolSize: 30,
		            name: "占比率",
		            type: "line",
		            yAxisIndex: 1,
		            data: data3,
		            itemStyle: {
		                normal: {
		                    borderWidth: 5,
		                    color: {
		                        colorStops: [{
		                                offset: 0,
		                                color: '#821eff'
		                            },

		                            {
		                                offset: 1,
		                                color: '#204fff'
		                            }
		                        ],
		                    }
		                }
		            }
		        }
		    ]
		}
		mycharts.setOption(option,true);
		}
	})
}
function typeRatioInfo(){
	var bigType = $("#bigTypeSelect").find("option:selected").val();
	$.ajax({
		url : $.cxt + "/basicUnitInfo/gridTypeRatioInfo", 
		type: "POST",
		data :{
				gridCode :gridCode,
				bigType:bigType
			},
			async:false,
		success : function(json){
			var data = JSON.parse(json);
			var data1=  [];
			for(i=0;i<data.data.length;i++){
				data1.push({
					"name": data.data[i].smallType,
			        "value": data.data[i].percent
				});
			}
		/*	var data = [
			            {"value": 12.2, "name": "峰 会"}, {"value": 8.4, "name": "座 谈 会"}, {
			            	"value": 7.6,
			            	"name": "展 览"
			            }, {"value": 5.9, "name": "洽 谈 会"}, {"value": 3.6, "name": "交 易 会"}, {
			            	"value": 2.9,
			            	"name": "交 流 会"
			            }, {"value": 2.2, "name": "圆桌会议"}, {"value": 1.7, "name": "学术会议"}, {"value": 0.4, "name": "恳 谈 会"}
			            ];*/
			data_name = [];
			for (var n  in data1){
				data1[n]['name'] = data1[n]['name'] + ' '+data1[n]['value'] +'%';
				data_name.push(data1[n]['name'])
			}
			console.log(data_name)
			var mycharts = echarts.init(document.getElementById("typeRatioInfo1"));
			option = {
					tooltip: {
						trigger: 'item',
						formatter: "{b}"
					},
					legend: {
						orient: 'vertical',
						top: 'center',
						right: 10,
						data:data_name,
						textStyle: {
							color: "#fff",
							fontWeight:'normal',
							fontFamily:'宋体'
						}
					},
					
					series: [
					         
					         {
					        	 name:'',
					        	 type:'pie',
					        	 clockWise : false, 
					        	 radius: ['40%', '55%'],
					        	 center : ['40%', '50%'],
					        	 color: [ '#DC143C','#0BB4E4','#9F85FF','#FFFF00','#C76B73','#808040','#8B008B','#0431B4','#FF4000','#CD853F','#FA5882'],
					        	 data:data1
					         }
					         ]
			};
			mycharts.setOption(option,true);
		}
	})
}
function changeBigTypeSelect(){
			$.ajax({
				url : $.cxt + "/basicUnitInfo/bigTypeInfo", 
				type: "POST",
				async:false,
				data :{gridCode :gridCode},
				success : function(data) {
					var data = JSON.parse(data);
						$("#bigTypeSelect").empty();
						var flag=true;
						for(i=0;i<data.data.length;i++){
							if(data.data[i].bigType != null){
								if(flag){
									$("#bigTypeSelect").append(
											$("<option selected = 'selected'>"+data.data[i].bigType+"</option>").val(data.data[i].bigType)
													
											);
									flag=false;
								}else{
									$("#bigTypeSelect").append(
											$("<option >"+data.data[i].bigType+"</option>").val(data.data[i].bigType)
													
											);
								}
								
							}
						}
						/*$("#bigTypeSelect").val('居民小区');*/

					
				}
				
			})
	
			$("#bigTypeSelect").change(function(){
				var bigType = $(this).find("option:selected").val();
				typeRatioInfo();
			})
	
}
function buildDetailInfo(){
	var buildDetailInfoType = $("#buildTypeSelect").find("option:selected").val();
	$.ajax({
		url : $.cxt + "/buildDetailInfo/gridBuildDetailInfo", 
		type: "POST",
		data :{
				listType:buildDetailInfoType,
				gridCode :gridCode
			},
		success : function(json) {
			var data = JSON.parse(json);
			var data1 = [];
			var data2 = [];
			for(i=0;i<data.data.length;i++){
				data1.push(data.data[i].BUILDTYPE);
				data2.push({
					"name": data.data[i].BUILDTYPE,
			        "value": data.data[i].PERCENT
				});
			}
			var  myseries =[];
			var colorList = [
                             '#1E90FF','#fff000','#8A2BE2','#00008B','#27727B',
                              '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                              '#D7504B','#C6E579','#a64d79','#073763','#274e13',
                              '#a14f4f','#b93232'
                           ];
			for(var i=0 ;i<data2.length;i++){
				var tmpData =[];
				for(var j=0 ;j<data2.length;j++){
					tmpData.push(0);
				}
				tmpData[i] = data2[i].value;
				myseries.push({
                    name:data2[i].name,
                    type:'bar',
                    barGap:'-100%',
                    barWidth:24,
                    data:tmpData,
                    itemStyle: {
                    	 normal: {
                    		 color: colorList[i%colorList.length]
                    	 	}
		            }

                })
			}
			var mycharts = echarts.init(document.getElementById("buildDetailInfo"));
			var data = {info:{xaxis:data1}}
			var lenData=data2
			option = {
			                    title : {
			                        text: '',
			                    },
			                    tooltip : {
			                        trigger: 'axis',
			                        axisPointer:{type:'shadow'},
			                        formatter:function (param) {
			                            console.log("asddasd"+param);
			                            for(var k in param) {
			                                if (param[k].name.indexOf(param[k].seriesName) > -1) {
			                                    return '<div style="background-color: '+param[k].color+';height: 10px;width: 10px;border-radius: 5px;display:inline-block"></div>'+param[k].name+'<br/>'+'占比:'+param[k].value+'%';
			                                }
			                            }
			                        }
			                    },
			                    legend: {
			                       orient: 'vertical',
									/*top: 'center',*/
									right: 10,
			                        data:data1,
			                        textStyle: {
										color: "#fff",
										fontWeight:'normal',
										fontFamily:'宋体'
									},
			                        formatter: function (name) {
			                            for(var i=0,n=lenData.length;i<n;i++){
			                                if(lenData[i].name==name){
			                                   return  name+" "+lenData[i].value+"%";
			                                }
			                            }
			                             return 'Legend ' + name;
			                         }
			                    },
			                    grid:{
			                      left:15,
			                      right:60,
			                      width: '80%',
			                      bottom:'3%',
			                      containLabel:true
			                    },
			                    xAxis : [
			                        {
			                            type : 'category',
			                            data : data.info.xaxis,
			                            axisLabel:{
			                                interval:0,
			                                rotate:10,
			                                align:'center',
			                                margin:15
			                            },
			                            axisLabel:{
			                                color:"#3c78d8"
			                            }
			                        }
			                    ],
			                    yAxis : [
			                        {
			                            name:'占比率',
			                            type : 'value',
			                            splitNumber:4,
			                            axisLabel:{
			                                color:"#3c78d8"
			                            }
			                        }
			                    ],
			                    series : myseries
			                };
			mycharts.setOption(option,true);

		}
		
	})

}

function changeBuildTypeSelect(){
	$.ajax({
		url : $.cxt + "/buildDetailInfo/buildDetailTypeInfo", 
		type: "POST",
		async:false,
		success : function(data) {
			var data = JSON.parse(data);
				$("#buildTypeSelect").empty();
				for(i=0;i<data.data.length;i++){
					if(data.data[i].listValue != null){
						$("#buildTypeSelect").append(
								$("<option>"+data.data[i].listValue+"</option>").val(data.data[i].listType)
						)
					}
				}
				/*$("#buildTypeSelect").val('BUILD_AGE');*/

			
		}
		
	})

	$("#buildTypeSelect").change(function(){
		var buildDetailInfoType = $(this).find("option:selected").val();
		buildDetailInfo();
	})

}
function businessDetailInfo(){
	var operator = $("#Operator").find("option:selected").val();
	var businessTypeSelect = $("#businessTypeSelect").find("option:selected").val();
	$.ajax({
		url : $.cxt + "/competitorInfo/getCompetitorRatio", 
		type: "POST",
		data:{
			listType:operator,
			gridCode :gridCode,
			physicalGridCode:businessTypeSelect
		},
		success : function(json) {
			var data = JSON.parse(json);
			if(data.data.unicomBroadbandPer != null &&  data.data.unicomBroadbandPer != 0 && data.data.unicomBroadbandPer != ""){
				var data1 = [];
					data1.push("宽带份额:"+data.data.unicomBroadbandPer+"%");
					data1.push("联通用户份额:"+data.data.unicomUserPer+"%")
			}
			if(data.data.telecomBroadbandPer != null && data.data.telecomBroadbandPer !=0 && data.data.telecomBroadbandPer != ""){
				var data1 = [];
					data1.push("宽带份额:"+data.data.telecomBroadbandPer+"%");
					data1.push("电信用户份额:"+data.data.telecomUserPer+"%")
				
			}
			if(data.data.mobileBroadbandPer != null && data.data.mobileBroadbandPer != 0 && data.data.mobileBroadbandPer != ""){
				var data1 = [];
					data1.push("宽带份额:"+data.data.mobileBroadbandPer+"%");
					data1.push("移动用户份额:"+data.data.mobileUserPer+"%")
				
			}
			var mycharts = echarts.init(document.getElementById("businessDetailInfo"));
			function getData(percent) {
			    return [{
			        value: percent,
			        name: percent,
			       
			    }, {
			        value: 1 - percent,
			        itemStyle: {
			            normal: {
			                color: 'transparent'
			            }
			        }
			    }];
			}

			placeHolderStyle1 = {
			    normal: {
			        label: {
			            show: false,
			        },
			        labelLine: {
			            show: false,
			        },
			        color:'#FF0000',

			    }
			};
			placeHolderStyle2 = {
				    normal: {
				        label: {
				            show: false,
				        },
				        labelLine: {
				            show: false,
				        },
				        color:'#CD853F',

				    }
				};

			option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: function(params, ticket, callback) {

			            return params.seriesName ;
			        }
			    },
			    legend: {
			    	orient: 'vertical',
			        left: "10%",
			        itemHeight: 18,
			        data: data1,
			        textStyle: {
			            color: '#fff'
			        },

			        selectedMode: true,
			        orient: "vertical",

			    },
			    series: [{
			        name: '实勘率',
			        type: 'pie',
			        clockWise: true, //顺时加载
			        hoverAnimation: false, //鼠标移入变大
			        radius: [180, 200],
			        itemStyle: placeHolderStyle1,

			        label: {
			            normal: {
			                show: false,
			            }
			        },
			        data:getData(0.5)
			    }, {
			        name: '户型图比例',
			        type: 'pie',
			        clockWise: true, //顺时加载
			        hoverAnimation: false, //鼠标移入变大
			        radius: [155, 175],
			        itemStyle: placeHolderStyle2,
			        data: getData(0.5)
			    }]
			};
			
			if(data.data.unicomBroadbandPer != null &&  data.data.unicomBroadbandPer != 0 && data.data.unicomBroadbandPer != ""){
					option.series[0].name=[];
					option.series[0].name ="宽带份额:"+data.data.unicomBroadbandPer+"%";
					option.series[1].name=[];
					option.series[1].name ="联通用户份额:"+data.data.unicomUserPer+"%";
					option.series[0].data=[];
					option.series[0].data=getData(data.data.unicomBroadbandPer/100);
					option.series[1].data=[];
					option.series[1].data=getData(data.data.unicomUserPer/100);
			}
			if(data.data.telecomBroadbandPer != null && data.data.telecomBroadbandPer !=0 && data.data.telecomBroadbandPer != ""){
					option.series[0].name=[];
					option.series[0].name ="宽带份额:"+data.data.telecomBroadbandPer+"%";
					option.series[1].name=[];
					option.series[1].name ="电信用户份额:"+data.data.telecomUserPer+"%";
					option.series[0].data=[];
					option.series[0].data=getData(data.data.telecomBroadbandPer/100);
					option.series[1].data=[];
					option.series[1].data=getData(data.data.telecomUserPer/100);
				
			}
			if(data.data.mobileBroadbandPer != null && data.data.mobileBroadbandPer != 0 && data.data.mobileBroadbandPer != ""){
					option.series[0].name=[];
					option.series[0].name ="宽带份额:"+data.data.mobileBroadbandPer+"%";
					option.series[1].name=[];
					option.series[1].name ="移动用户份额:"+data.data.mobileUserPer+"%";
					option.series[0].data=[];
					option.series[0].data=getData(data.data.mobileBroadbandPer/100);
					option.series[1].data=[];
					option.series[1].data=getData(data.data.mobileUserPer/100);
				
			}
			mycharts.clear();
			console.log(option.series)
			mycharts.setOption(option,true);
		}
		
	})
}
function businessOperator(){
	$.ajax({
		url : $.cxt + "/competitorInfo/getOperatorInfo", 
		type: "POST",
		async:false,
		success : function(data) {
			var data = JSON.parse(data);
				$("#Operator").empty();
				for(i=0;i<data.data.length;i++){
					if(data.data[i].listValue != null){
						$("#Operator").append(
								$("<option>"+data.data[i].listValue+"</option>").val(data.data[i].listType)
						)
					}
				}
				/*$("#Operator").val('unicom');
*/
			
		}
		
	})

	$("#Operator").change(function(){
		var operator = $(this).find("option:selected").val();
		businessDetailInfo();
	})

}
function  businessType(){
	$.ajax({
		url : $.cxt + "/competitorInfo/getPhysicalGridName", 
		type: "POST",
		data :{
			gridCode :gridCode,
		},
		async:false,
		success : function(data) {
			var data = JSON.parse(data);
				$("#businessTypeSelect").empty();
				for(i=0;i<data.data.length;i++){
					if(data.data[i].physicalGridName != null){
						$("#businessTypeSelect").append(
								$("<option>"+data.data[i].physicalGridName+"</option>").val(data.data[i].physicalGridCode)
						)
					}
				}
				/*$("#businessTypeSelect").val('阳光家园-A栋');*/

			
		}
		
	})

	$("#businessTypeSelect").change(function(){
		var buildDetailInfoType = $(this).find("option:selected").val();
		businessDetailInfo();
	})


}
function channelInfo(){
	var marketType = $("#channelOperator").find("option:selected").val();
	var channelType = $("#channelTypeSelect").find("option:selected").val();
	$.ajax({
		url : $.cxt + "/channelStation/getChnlTypelevel2Ratio", 
		type: "POST",
		data:{
			gridCode:gridCode,
			marketType:marketType,
			channelType:channelType
		},
		success : function(json) {
			var data = JSON.parse(json);
			var mycharts = echarts.init(document.getElementById("channelInfo1"));
			var data1=  [];
			for(i=0;i<data.data.length;i++){
				data1.push( data.data[i].chnlTypelevel2+':'+data.data[i].percent+'%' );
			}
			function getData(percent) {
			    return [{
			        value: percent,
			        name: percent,
			       
			    }, {
			        value: 1 - percent,
			        itemStyle: {
			            normal: {
			                color: 'transparent'
			            }
			        }
			    }];
			}

			placeHolderStyle = {
			    normal: {
			        label: {
			            show: false,
			        },
			        labelLine: {
			            show: false,
			        }
			        

			    }
			};

			option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: function(params, ticket, callback) {

			            return params.seriesName ;
			        }
			    },
			    legend: {
			    	orient: 'vertical',
			        left: "10%",
			        itemHeight: 18,
			        data: data1,
			        textStyle: {
			            color: '#fff'
			        },

			        selectedMode: true,
			        orient: "vertical",

			    },
			    series: []
			};
			 var colorList = [
                              '#1E90FF','#87CEFA','#8A2BE2','#00008B','#27727B',
                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                               '#D7504B','#C6E579','#a64d79','#073763','#274e13',
                               '#a14f4f','#b93232'
                            ];
			for(i=0;i<data.data.length;i++){
				option.series.push({
			        name: data.data[i].chnlTypelevel2+':'+data.data[i].percent+'%',
			        type: 'pie',
			        clockWise: true, //顺时加载
			        hoverAnimation: false, //鼠标移入变大
			        radius: [20+30*i, 40+30*i],
			        itemStyle: {
					    normal: {
					        label: {
					            show: false,
					        },
					        labelLine: {
					            show: false,
					        },
					        color:colorList[i%colorList.length]

					    }
					},
			        data: getData(data.data[i].percent/100)
			    })
			}
			mycharts.setOption(option,true);
		}
		
	})
}
function channelOperator(){
	$.ajax({
		url : $.cxt + "/channelStation/getOperatorInfo", 
		type: "POST",
		async:false,
		data:{
			gridCode:gridCode
		},
		success : function(data) {
			var data = JSON.parse(data);
				$("#channelOperator").empty();
				for(i=0;i<data.data.length;i++){
					if(data.data[i].marketType != null){
						$("#channelOperator").append(
								$("<option>"+data.data[i].marketType+"</option>").val(data.data[i].marketType)
						)
					}
				}
			
		}
		
	})

	$("#channelOperator").change(function(){
		var marketType = $(this).find("option:selected").val();
		channelType();
		channelInfo();
	})


}
function channelType(){
	var marketType = $("#channelOperator").find("option:selected").val();
	$.ajax({
		url : $.cxt + "/channelStation/getChannelType", 
		type: "POST",
		async:false,
		data:{
			gridCode:gridCode,
			marketType:marketType
		},
		success : function(data) {
			var data = JSON.parse(data);
				$("#channelTypeSelect").empty();
				for(i=0;i<data.data.length;i++){
					if(data.data[i].channelType != null){
						$("#channelTypeSelect").append(
								$("<option>"+data.data[i].channelType+"</option>").val(data.data[i].channelType)
						)
					}
				}
			
		}
		
	})

	$("#channelTypeSelect").change(function(){
		var channelType = $(this).find("option:selected").val();
		channelInfo();
	})



}
function baseStationDetailsInfo(){
	$.ajax({
		url : $.cxt + "/channelStation/getBaseStationDetailsRatio", 
		type: "POST",
		data:{
			gridCode:gridCode,
		},
		success : function(json) {
			var data = JSON.parse(json);
			var mycharts = echarts.init(document.getElementById("baseStationInfo1"));
			var data1 = [];
			var data2 = [];
			var data3 = [];
			var data4 = [];
			for (i=0;i<data.data.length;i++) {
		        data1.push(data.data[i].stationType);
		        data2.push(data.data[i].per2G);
		        data3.push(data.data[i].per3G);
		        data4.push(data.data[i].per4G);
		    }
			var xData = function() {
			    var data2 = [];
			    for (i=0;i<data.data.length;i++) {
			        data2.push(data.data[i].stationType  + "");
			    }
			    return data2;
			}();

			option = {
			    "tooltip": {
			        "trigger": "axis",
			        "axisPointer": {
			            "type": "shadow",
			            textStyle: {
			                color: "#fff"
			            }

			        },
			    },
			    "grid": {
			        "borderWidth": 0,
			        "top": 110,
			        "bottom": 95,
			        textStyle: {
			            color: "#fff"
			        }
			    },
			    "legend": {
			        x: '4%',
			        top: '11%',
			        textStyle: {
			            color: '#90979c',
			        },
			        "data": ["2G","3G","4G"]
			    },
			     

			    "calculable": true,
			    "xAxis": [{
			        "type": "category",
			        "axisLine": {
			            lineStyle: {
			                color: '#90979c'
			            }
			        },
			        "splitLine": {
			            "show": false
			        },
			        "axisTick": {
			            "show": false
			        },
			        "splitArea": {
			            "show": false
			        },
			        "axisLabel": {
			            "interval": 0,
			            rotate:45,

			        },
			        "data": xData,
			    }],
			    "yAxis": [{
			    	"name":'占比率',
			        "type": "value",
			        "splitLine": {
			            "show": false
			        },
			        "axisLine": {
			            lineStyle: {
			                color: '#90979c'
			            }
			        },
			        "axisTick": {
			            "show": false
			        },
			        "axisLabel": {
			            "interval": 0,

			        },
			        "splitArea": {
			            "show": false
			        },

			    }],
			    "dataZoom": [{
			        "show": true,
			        "height": 30,
			        "xAxisIndex": [
			            0
			        ],
			        bottom: 30,
			        "start": 10,
			        "end": 80,
			        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
			        handleSize: '110%',
			        handleStyle:{
			            color:"#d3dee5",
			            
			        },
			           textStyle:{
			            color:"#fff"},
			           borderColor:"#90979c"
			        
			        
			    }, {
			        "type": "inside",
			        "show": true,
			        "height": 15,
			        "start": 1,
			        "end": 35
			    }],
			    "series": [{
			            "name": "2G",
			            "type": "bar",
			            "stack": "总量",
			            "barWidth":"22",
			            "barMaxWidth": "35",
			            "barGap": "30%",
			            "itemStyle": {
			                "normal": {
			                    "color": "rgba(255,144,128,1)",
			                    "label": {
			                        "show": true,
			                        "textStyle": {
			                            "color": "#fff"
			                        },
			                        "position": "insideTop",
			                        formatter: function(p) {
			                            return p.value > 0 ? (p.value) : '';
			                        }
			                    }
			                }
			            },
			            "data": data2,
			        },

			        {
			            "name": "3G",
			            "type": "bar",
			            "stack": "总量",
			            "barWidth":"22",
			            "barGap": "30%",
			            "itemStyle": {
			                "normal": {
			                    "color": "rgba(0,191,183,1)",
			                    "barBorderRadius": 0,
			                    "label": {
			                        "show": true,
			                        "position": "insideTop",
			                        formatter: function(p) {
			                            return p.value > 0 ? (p.value) : '';
			                        }
			                    }
			                }
			            },
			            "data": data3
			        },
			        {
			            "name": "4G",
			            "type": "bar",
			            "stack": "总量",
			            "barWidth":"22",
			            "barGap": "30%",
			            "itemStyle": {
			                "normal": {
			                    "color": "rgba(122, 103, 238)",
			                    "barBorderRadius": 0,
			                    "label": {
			                        "show": true,
			                        "position": "insideTop",
			                        formatter: function(p) {
			                            return p.value > 0 ? (p.value) : '';
			                        }
			                    }
			                }
			            },
			            "data": data4
			        }
			    ]
			}
			mycharts.setOption(option,true);
		}
		
	})
}
function gridInfoListGrid(){
	var mydata = [ 
	    { id: "1", invdate: "季度考核", time: "2018.3.1", gridName: "王府花园网格", amount: "一类", tax: "10.00"}, 
	    { id: "2", invdate: "年度考核", time: "2018.3.1", gridName: "王府花园网格", amount: "二类", tax: "10.00"}, 
	    { id: "3", invdate: "季度考核", time: "2018.3.1", gridName: "王府花园网格", amount: "三类", tax: "10.00"},
	];
   grid = $("#gridInfoListGrid"); 
   grid.jqGrid({ 
	   datatype: 'local', 
	   data: mydata, 
	   width:930,
	   height:250,
	   colNames: [ '周期类型', '考核周期', '被考核对象', '被考核对象类型', '得分', '操作'], 
	   colModel: [ 
	       { name: 'invdate', index: 'invdate',align: 'center'}, 
	       { name: 'time', index: 'time', align: 'center'}, 
	       { name: 'gridName', index: 'gridName',align: 'center' }, 
	       { name: 'amount', index: 'amount',align: 'left'}, 
	       { name: 'tax', index: 'tax',  formatter: 'number'}, 
	       { name: '', index: '',align: 'left',  formatter: addButton}
	   ], 
	   rowNum: 15, 
	   rowList: [10, 15, 20, 30], 
	   pager: '#gridInfoListPagers', 
	   gridview: false, 
	   viewrecords: false, 
	   gridComplete: function() { 
		   setNiceScroll()
	  } 
}); 
	$("#first_gridInfoListPagers").find("span").addClass("bigger-150 fa fa-angle-double-left");
	$("#prev_gridInfoListPagers").find("span").addClass("bigger-150 fa fa-angle-left");
	$("#next_gridInfoListPagers").find("span").addClass("bigger-150 fa fa-angle-right");
	$("#last_gridInfoListPagers").find("span").addClass("bigger-150 fa fa-angle-double-right");
}
function gridInfoDetailGrid(){
var mydata = [ 
    { id: "1", invdate: "4G发展", name: "放号", nameB: "40", amount: "根据本网格内所属渠道业务积分目标的完成率考评：计分规则1：若当月100%完成目标，则得满分；未完成目标任务的60%，不得分；若实际完成率在60%—100%之间，则线性得分；计分规则2：若全区无100%完成的网格内渠道，则取最高完成率为目标值，实际完成率按线性得分。", tax: "10.00"}, 
    { id: "2", invdate: "4G发展", name: "宽带", nameB: "40", amount: "根据本网格内所属渠道业务积分目标的完成率考评：计分规则1：若当月100%完成目标，则得满分；未完成目标任务的60%，不得分；若实际完成率在60%—100%之间，则线性得分；计分规则2：若全区无100%完成的网格内渠道，则取最高完成率为目标值，实际完成率按线性得分。", tax: "10.00"}, 
    { id: "3", invdate: "4G发展", name: "4G+终端", nameB: "40", amount: "根据本网格内所属渠道业务积分目标的完成率考评：计分规则1：若当月100%完成目标，则得满分；未完成目标任务的60%，不得分；若实际完成率在60%—100%之间，则线性得分；计分规则2：若全区无100%完成的网格内渠道，则取最高完成率为目标值，实际完成率按线性得分。", tax: "20.00" }, 
    { id: "4", invdate: "4G发展", name: "存量客户  迁转/升档", nameB: "40", amount: "根据本网格内所属渠道业务积分目标的完成率考评：计分规则1：若当月100%完成目标，则得满分；未完成目标任务的60%，不得分；若实际完成率在60%—100%之间，则线性得分；计分规则2：若全区无100%完成的网格内渠道，则取最高完成率为目标值，实际完成率按线性得分。；", tax: "20.00"},
    { id: "5", invdate: "渠道营销力", name: "渠道业务综合营销能力", nameB: "20", amount: "根据本网格内所属渠道当月综合营销能力得分情况进行考评：综合营销能力包括月重点业务承载率、优质渠道占比、重点业务单店办理量、重点业务单位面积办理量、酬金占收比、重点业务单业务酬金、新入网99及以上不限量占比、和家庭搭载率。得分=（网格数+1-N)/网格数*分值；N为网格排名（按指标从高到低）", tax: "10.00"}, 
    { id: "6", invdate: "渠道营销力", name: "包保渠道月度考评结果", nameB: "25", amount: "根据本网格内参与包保的渠道店均月度考评得分结果进行考评：即：得分=包保渠道店均月度考评得分*本项分值权重，宽带小区包保、存量客户包保、聚类市场包保营销活动组织、宣贯、督导；包括与小区物业合作情况等。", tax: "10.00"}, 
    { id: "9", invdate: "渠道份额	", name: "渠道份额	", nameB: "10", amount: "根据本网格内所属渠道份额的目标值完成情况进行考评：计分规则：若当月100%完成目标，则得满分；未完成目标任务的60%，不得分；若实际完成率在60%—100%之间，则线性得分", tax: "10.00"}, 
    { id: "10", invdate: "分公司自行设置考核指标", name: "分公司自行设置考核指标", nameB: "5", amount: "由分公司自行设置", tax: "10.00"}, 
    { id: "11", invdate: "加分项（目标渠道回流/异业渠道拓展）	", name: "加分项（目标渠道回流/异业渠道拓展）", nameB: "最多加15分", amount: "1、对于本网格内的目标渠道回流建设成为有效专营渠道，按照2分/家进行加分，最多加10分。2、对于本网格内的异业渠道发展为有效二级渠道，按照0.5分/家进行加分，最多加5分。", tax: "20.00" }, 
    { id: "12", invdate: "基础工作", name: "政策落实", nameB: "最多扣10分", amount: "1、4G+终端上柜率：要求渠道经理所辖渠道不得销售非4G+终端，若发现违规按0.5分/家，最多扣5分/月。2、渠道规范经营（含实名制、专营、业务违规等）：若发现违规按0.5分/家，最多扣5分/月。", tax: "20.00"},
    { id: "13", invdate: "基础工作", name: "其他日常工作", nameB: "按照相关文件标准执行考核扣罚", amount: "其它宣传布置、政策传达、巡检服务、促销组织、渠道满意度等日常工作。", tax: "10.00"}, 
];
grid = $("#gridInfoDetailGrid"); 
grid.jqGrid({ 
   datatype: 'local', 
   data: mydata, 
   width:930,
   height:250,
   colNames: [ '类别', '指标名称', '权重', '考核内容', '得分'], 
   colModel: [ 
       { name: 'invdate',width:80, index: 'invdate',align: 'center', cellattr: function(rowId, tv, rawObject, cm, rdata) { 
               return 'id=\'invdate' + rowId + "\'"; 
           } 
       }, 
       { name: 'name',width:80,  index: 'name', align: 'center',
           cellattr: function(rowId, tv, rawObject, cm, rdata) { 
               return 'id=\'name' + rowId + "\'"; 
       } 
       }, 
       { name: 'nameB', width:76, index: 'nameB',align: 'center', cellattr: function(rowId, tv, rawObject, cm, rdata) { 
           return 'id=\'nameB' + rowId + "\'"; 
       } }, 
       { name: 'amount', index: 'amount',align: 'left',width:650, 
    	   cellattr: function(rowId, tv, rawObject, cm, rdata) { 
               return 'id=\'amount' + rowId + "\'"; 
           }}, 
       { name: 'tax', width:100, index: 'tax',  formatter: 'number', align: 'center',
    	   cellattr: function(rowId, tv, rawObject, cm, rdata) { 
               return 'id=\'tax' + rowId + "\'"; 
           } }
   ], 
   rowNum: 15, 
   rowList: [10, 15, 20, 30], 
   pager: '#gridInfoDetailPagers', 
   gridview: false, 
   viewrecords: false, 
   gridComplete: function() { 
	   var gridName = "gridInfoDetailGrid"
       Merger(gridName, 'invdate');
       Merger(gridName, 'name'); 
       Merger(gridName, 'nameB'); 
       Merger(gridName, 'tax'); 
       Merger(gridName, 'amount'); 
       setNiceScroll()
  } 
}); 

$("#first_gridInfoDetailPagers").find("span").addClass("bigger-150 fa fa-angle-double-left");
$("#prev_gridInfoDetailPagers").find("span").addClass("bigger-150 fa fa-angle-left");
$("#next_gridInfoDetailPagers").find("span").addClass("bigger-150 fa fa-angle-right");
$("#last_gridInfoDetailPagers").find("span").addClass("bigger-150 fa fa-angle-double-right");
}
//表格合并
function Merger(gridName, CellName) { 
//得到显示到界面的id集合 
var mya = $("#" + gridName + "").getDataIDs(); 
//当前显示多少条 
var length = mya.length; 
for (var i = 0; i < length; i++) { 
    //从上到下获取一条信息 
    var before = $("#" + gridName + "").jqGrid('getRowData', mya[i]); 
    //定义合并行数 
    var rowSpanTaxCount = 1; 
    for (j = i + 1; j <= length; j++) { 
        //和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏 
        var end = $("#" + gridName + "").jqGrid('getRowData', mya[j]); 

        if (before[CellName] == end[CellName]) { 
            rowSpanTaxCount++; 
            $("#" + gridName + "").setCell(mya[j], CellName, '', { display: 'none' }); 

        } else { 
            rowSpanTaxCount = 1; 
            break; 
        } 
        $("#" + CellName + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount); 
    } 
} 
}
function addButton (cellvalue, options, cell){	
return $("<div><div>").append(
		$("<span onClick='seeDetail("+cell.id+")'></span>")
		.append("操作")
		.addClass("gridBtns")
		.attr("title","操作")
	).html();			
}
function seeDetail(cell){
	$("#gridInfoDetailGrid, #gridInfoDetailPagers").css({'display':'block'});
	$(".infoList, #gridInfoList>.grid-search-div").css({'display':'none'});
	$(".infoDetails, .fanhui").css({"display":"block"})
	gridInfoDetailGrid();
	$('.fanhui').click(function(){
		$("#gridInfoDetailGrid, #gridInfoDetailPagers").css({'display':'none'});
		$(".infoList, #gridInfoList>.grid-search-div").css({'display':'block'});
		$(".infoDetails, .fanhui").css({"display":"none"})
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

function radio(){
	$('input[type="radio"]:first').attr('checked',"checked")
	
	$('input[type="radio"]').click(function(){
		if($(this).val() == '0'){
			$(this).attr('checked',"true")
			$("#radio2").removeAttr("checked");
			$("#selectHidden").show()
		}else{
			$("#radio1").removeAttr("checked")
			$("#radio2").attr('checked',"checked")
			$("#selectHidden").hide()
		}
	})
}
