var bigType="";
function initGridInfoUserList(gridCode){
	
	    typeInfo(gridCode);
	    typeRatioInfo(gridCode);
	    initFirstTypeInfo();
		//查询基础单元信息
		$('#userListGrid').jqGrid({
			url : $.cxt + "/basicUnitInfo/getBasicUnitInfo",
			datatype : "json",
			mtype : "POST",
			postData : {gridCode:gridCode},
			height : 300,
			autowidth : false,
			colNames : [ '序号','基础单元编号', '基础单元名称','基础单元一级类型','基础单元二级类型', '详细地址','负责人', '联系电话' ],
			colModel : [ 
			      {name : 'rowNum',align : 'center',width : 50}, 
			      {name : 'physicalId',align : 'center'}, 
			      {name : 'physicalName',align : 'center'},
			      {name : 'bigType',align : 'center'},
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
			reloadBasicUnitJqGrid1("search",gridCode);
		});
		//导出
		$("#exportBasicUnitList").click(function(){
			var bigType = "";
			var physicalType = "";
			bigType = $("#firstTypeInfo").find("option:selected").text();
			if(bigType =="请选择..."){
				bigType = "";
			}
			physicalType = $("#secondTypeInfo").find("option:selected").val();
			if(physicalType =="请选择..."){
				physicalType = "";
			}
			var physicalName = encodeURI(encodeURI($("#physicalGridName").val()));
			window.location.href=$.cxt +"/basicUnitInfo/export?gridCode="+gridCode+"&physicalName="+physicalName+"&bigType="+encodeURI(encodeURI(bigType))+"&physicalType="+encodeURI(encodeURI(physicalType));
		})
		changeBigTypeSelectLinkage(gridCode);
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
 function changeBigTypeSelectLinkage(gridCode){
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
					/*$("#bigTypeSelect").val('居民小区');*/
					bigType = $(this).find("option:selected").val();
					typeRatioInfoLinkage(gridCode);
				
			}
			
		})

		$("#bigTypeSelect").change(function(){
			var bigType = $(this).find("option:selected").val();
			typeRatioInfoLinkage(gridCode);
		})

	}
 
function typeInfo(gridCode){
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

function typeRatioInfo(gridCode){
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
//重新基础单元信息
var reloadBasicUnitJqGrid1 = function(flag,code) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	var gridCode = code;
	var physicaName = $("#physicalGridName").val();
	var bigType = $("#firstTypeInfo").find("option:selected").text();
	var physicalType= $("#secondTypeInfo").val();	
	if (bigType == undefined || bigType == "请选择...") {
		bigType = "";
	}
	if (physicalType == undefined || physicalType == "请选择...") {
		physicalType = "";
	}
	$("#userListGrid").jqGrid('setGridParam',{    
        postData : {
        	"gridCode":gridCode,
        	"physicaName":physicaName,
        	"bigType":bigType,
        	"physicalType":physicalType
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}


function initFirstTypeInfo() {
	$.ajax({
		url : $.cxt + "/basicUnitInfo/firstTypeInfo",
		type : "POST",
		async : false,
		data : {},
		success : function(data) {
			var data = JSON.parse(data);
			if (data.code == '0') {
				$("#firstTypeInfo").empty();
				$("#firstTypeInfo").append(
						$("<option>" + '请选择...' + "</option>").val('请选择...'))
				for (i = 0; i < data.data.length; i++) {
					$("#firstTypeInfo").append($("<option>" + data.data[i].CONDITION_NAME+ "</option>").val(data.data[i].CONDITION_CODE))
				}
			}
		}
	})
}
function secondType() {
	$("#secondTypeInfo").empty();
	var conditionCode = $("#firstTypeInfo").val();
	$.ajax({
		url : $.cxt + "/basicUnitInfo/secondTypeInfo",
		type : "POST",
		async : false,
		data : {
			conditionCode : conditionCode
		},
		success : function(data) {
			var data = JSON.parse(data);
			if (data.code == '0') {
				$("#secondTypeInfo").empty();
				$("#secondTypeInfo").append(
						$("<option>" + '请选择...' + "</option>").val('请选择...'))
				for (i = 0; i < data.data.length; i++) {
					$("#secondTypeInfo").append(
							$("<option>" + data.data[i].CONDITION_NAME + "</option>")
									.val(data.data[i].CONDITION_NAME))
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