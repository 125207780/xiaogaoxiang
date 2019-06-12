$(function(){
 	var  emap = showEmap(orgId,"main",callBack);
 
	function callBack(_orgId,orgLevel){
		  if(orgLevel=="4"){//当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
			  
		   }else{
			 var obj=this.next();
			 if(obj.objType=="Echarts"){// 
				 showKpiInEcharts(_orgId,obj);
			 }else{
				 
			 }
		   }
	}
	
	function showKpiInEcharts(_orgId,obj){
	
		$.ajax({
			  url:$.cxt + "/firstPage/getCityKpi", 
			  data:{pid:_orgId},
			  type: "POST",
		 
			  success : function (list){
					var option = obj.getOption();
					var mapId= option.geo[0].map;
					var cityList = echarts.getMap(mapId).geoJson.features;
					var data = [];
					 var max = 0, min = 0;  
			        var maxSize4Pin = 100, minSize4Pin = 20;
					for(var i=0,n=list.length;i<n;i++){
						var kpi = list[i].KPI;
						var orgId= list[i].ORG_ID;
						if(i==0){
							max=kpi;
							min=kpi;
						}
						for(var j=0,k=cityList.length;j<k;j++){
							var tmpObj=cityList[j].properties;
							if(tmpObj.id==orgId){
								data.push({
									"name":tmpObj.name,
									"value":tmpObj.cp.concat(kpi)
								})
							if(max<kpi){
								max=kpi;
							}
							 if(min>kpi){
								 min =kpi;
							 }
							 break;
							}
						}
					}
					
					option.tooltip = 
					  {
			            trigger: 'item',
			            position: function (pos, params, dom, rect, size) {
			                  // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
			                  /*var compare=pos[0] < size.viewSize[0] / 2;
			                  if(compare){
			                      return [pos[0]-100,pos[1]];
			                  }else{
			                      return [pos[0]+50,pos[1]];
			                  }*/
			              },
			            formatter: function (params) {
			              if(typeof(params.value)[2] == "undefined"){
			              	return params.name + ' : ' + params.value;
			              }else{
			              	return params.name + ' : ' + params.value[2];
			              }
			            }
			        } ;
					
					var pin ={  //气泡
				             
				            type: 'scatter',
				            coordinateSystem: 'geo',
				            symbol: 'pin',
				            symbolSize: function (val) {
				                var a = (maxSize4Pin - minSize4Pin) / (max - min);
				                var b = minSize4Pin - a*min;
				                b = maxSize4Pin - a*max;
				                return a*val[2]+b;
				            },
				            label: {
				                normal: {
				                    show: true,
				                    textStyle: {
				                        color: '#fff',
				                        fontSize: 9,
				                    }
				                }
				            },
				            itemStyle: {
				                normal: {
				                    color: '#F62157', //标志颜色
				                }
				            },
				            zlevel: 6,
				            data: data
				        }
					option.series.push(pin);
					
					var top5 ={
			            name: 'Top 5',
			            type: 'effectScatter',
			            coordinateSystem: 'geo',
			            data: data.sort(function (a, b) {
			                return b.value[2] - a.value[2];
			            }).slice(0, 5),
			            symbolSize: function (val) {
			                return val[2] / 10;
			            },
			            showEffectOn: 'render',
			            rippleEffect: {
			                brushType: 'stroke'
			            },
			            hoverAnimation: true,
			            label: {
			                normal: {
			                    formatter: '{b}',
			                    position: 'right',
			                    show: true
			                }
			            },
			            itemStyle: {
			                normal: {
			                    color: '#05C3F9',
			                    shadowBlur: 10,
			                    shadowColor: '#05C3F9'
			                }
			            },
			           
			        }
					option.series.push(top5);
					obj.clear();
					obj.setOption(option);
					
					
			  }
		});
			
	}
	function showKpiInBdMap(_orgId,myBdM){
		
	}
});


var cityMap = {
    	'长沙市':'changsha',
    	'岳阳市':'yueyang',
    	'常德市':'changde',
    	'张家界市':'zhangjiajie',
    	'怀化市':'huaihua',
    	'株洲市':'zhuzhou',
    	'永州市':'yongzhou',
    	'湘潭市':'xiangtan',
    	'湘西州':'xiangxi',
    	'益阳市':'yiyang',
    	'衡阳市':'hengyangshi',
    	'邵阳市':'shaoyang',
    	'郴州市':'chenzhou',
    	'娄底市':'loudi'
    }
var mapType = [];
		for (var city in cityMap) {
		    mapType.push(city);
	}
function setCitys(city){
	for(index in mapType){
		var index_ = index;
		var citys = mapType[index_];
		if(city==citys){
			resetCity = city;
			$.ajax({
				type: "GET",  
       			url: $.cxt+'/pages/jsp/index/dist/citys/'+cityMap[citys]+'.json?k=1',
       			dataType: "json",  
       			success:function(data){
       				console.log(data)
       				echarts.registerMap('changsha',data);
					var chart =echarts.init(document.getElementById('map'));
					chart.on('click',function(propities){
						var pname= propities.name;
						//setMap();
						$("iframe",parent.document).attr({"src":"../../gis/indexPage/indexPage.jsp?district="+pname})
					});
					chart.setOption({
			            series: [{
			                type: 'map',
			                map: 'changsha'
			            }]
			        });
       			}
			})
		}
	}
}

function myLineBarChart(){
	/*require.config({
        paths: {
            echarts: 'dist'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/map'
        ],
        function (ec) {
            var myChart = ec.init(document.getElementById('map'));
            var cityMap = {
            		    "常德市": "200100",
            		    "郴州市": "200200",
            		    "衡阳市": "200300",
            		    "怀化市": "200400",
            		    "娄底市": "200500",
            		    "邵阳市": "200600",
            		    "湘潭市": "200700",
            		    "湘西土家族苗族自治州": "200800",
            		    "益阳市": "200900",
	            		"永州市": "201000",
	            		"岳阳市": "201100",
	            		"张家界市": "201200",
	            		"长沙市": "201300",
	            		"株洲市": "201400"
            		   
            		};
            		var curIndx = 0;
            		var mapType = [];
            		var mapGeoData = require('echarts/util/mapData/params');
            		for (var city in cityMap) {
            		    mapType.push(city);
            		    // 自定义扩展图表类型
            		    mapGeoData.params[city] = {
            		        getGeoJson: (function (c) {
            		            var geoJsonName = cityMap[c];
            		            return function (callback) {
            		                $.getJSON('dist/city2/' + geoJsonName + '.json', callback);
            		            }
            		        })(city)
            		    }
            		}
            		 
            		var ecConfig = require('echarts/config');
            		var zrEvent = require('zrender/tool/event');
            		document.getElementById('map').onmousewheel = function (e){
            		   
            		};
            		myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
            			var selected=param.selected;
            			console.log(selected);
            		    var mt = param.target;
            		    var len = mapType.length;
            		    var f= false;
            		    for(var i=0;i<len;i++){
            		        if(mt == mapType[i]){
            		              f =true;
            		              mt=mapType[i];
            		        }
            		    }
            		    if(!f){
            				$("iframe",parent.document).attr({"src":"../../gis/indexPage/indexPage.jsp?district="+mt})
            		    }
            		    option.series[0].mapType = mt;
            		     
            		    option.title.subtext = mt + ' （点击切换）';
            		    myChart.setOption(option, true);
            		});
            		option = {
            		    title: {
//            		        text : '湖南省主要城市（县）地图',
            		        subtext : '湖南省 （点击切换）'
            		    },
            		    backgroundColor:{color:'#0A274C'},
            		    tooltip : {
            		        trigger: 'item'
            		    },
            		  	dataRange: {
            		  		show:false,
            		        x: 'left',
            		        y: 'bottom',
            		        splitList: [
            		            {start: 1500},
            		            {start: 900, end: 1500},
            		            {start: 310, end: 1000},
            		            {start: 200, end: 300},
            		            {start: 10, end: 200, label: '10 到 200（自定义label）'},
            		            {start: 5, end: 5, label: '5（自定义特殊颜色）', color: 'black'},
            		            {end: 10}
            		        ],
            		        color: ['#03D1FD', '#052441', '#1A354F']
		                  
            		    },
            		    series : [
            		        {
            		            name: '',
            		            type: 'map',
            		            mapType: '湖南',
            		          	roam: false,
            		            selectedMode : 'single',
			            		tooltip : {
		            		        trigger: 'item',
		            		        formatter: '{b}'
			            		},
            		            itemStyle:{
            		                normal:{
            		                    label:{
            		                        show:true,
            		                        
            		                        textStyle: {
            		                           color: "#CCCCCC"
            		                        }
            		                    }
            		                },
            		                normal:{label:{show:true}},
            		                emphasis:{label:{show:true}}
            		            },
            		            data:[
            		                {name: '常德市',value: Math.round(Math.random()*2000)},
            		                {name: '郴州市',value: Math.round(Math.random()*2000)},
            		                {name: '衡阳市',value: Math.round(Math.random()*2000)},
            		                {name: '怀化市',value: Math.round(Math.random()*2000)},
            		                {name: '娄底市',value: Math.round(Math.random()*2000)},
            		                {name: '邵阳市',value: Math.round(Math.random()*2000)},
            		                {name: '湘潭市',value: Math.round(Math.random()*2000)},
            		                {name: '湘西土家族苗族自治州',value: Math.round(Math.random()*2000)},
            		                {name: '益阳市',value: Math.round(Math.random()*2000)},
            		              	{name: '永州市',value: Math.round(Math.random()*2000)},
            		              	{name: '岳阳市',value: Math.round(Math.random()*2000)},
            		              	{name: '张家界市',value: Math.round(Math.random()*2000)},
            		              	{name: '长沙市',value: Math.round(Math.random()*2000)},
            		              	{name: '株洲市',value: Math.round(Math.random()*2000)},
            		              	//常德市
            		              	{name: '石门县',value: Math.round(Math.random()*2000)},
            		                {name: '澧县',value: Math.round(Math.random()*2000)},
            		                {name: '临澧县',value: Math.round(Math.random()*2000)},
            		                {name: '津市市',value: Math.round(Math.random()*2000)},
            		                {name: '安乡县',value: Math.round(Math.random()*2000)},
            		                {name: '桃源县',value: Math.round(Math.random()*2000)},
            		                {name: '武陵区',value: Math.round(Math.random()*2000)},
            		                {name: '鼎城区',value: Math.round(Math.random()*2000)},
            		                {name: '汉寿县',value: Math.round(Math.random()*2000)},
            		                //郴州市
            		                {name: '安仁县',value: Math.round(Math.random()*2000)},
            		                {name: '永兴县',value: Math.round(Math.random()*2000)},
            		                {name: '资兴市',value: Math.round(Math.random()*2000)},
            		                {name: '桂东县',value: Math.round(Math.random()*2000)},
            		                {name: '桂阳县',value: Math.round(Math.random()*2000)},
            		                {name: '苏仙区',value: Math.round(Math.random()*2000)},
            		                {name: '嘉禾县',value: Math.round(Math.random()*2000)},
            		                {name: '北湖区',value: Math.round(Math.random()*2000)},
            		                {name: '汝城县',value: Math.round(Math.random()*2000)},
            		                {name: '临武县',value: Math.round(Math.random()*2000)},
            		                {name: '宜章县',value: Math.round(Math.random()*2000)},
            		            ]
            		        }
            		    ]
            		};
            myChart.setOption(option);
        }
    );*/
	
	var resetCity = '';
	
	var chart = echarts.init(document.getElementById('map'));
	    var uploadedDataURL = hunan;
			chart.showLoading();
	/*$.getJSON(uploadedDataURL, function(geoJson) {*/
	    echarts.registerMap('hunan', hunan);
	    chart.hideLoading();

	    var geoCoordMap = { 
	    	'常德市':[111.6876297,29.03820992],
		    '郴州市': [113.0286484,25.80229187],
	        '衡阳市':[112.5993576,26.90055466],
	        '怀化市': [109.9542313,27.54740715],
	        '娄底市': [111.4938945,27.74133492],
	        '邵阳市': [111.4773789,27.25023651],
	        '湘潭市': [112.9150238,27.87335014],
	        '湘西土家族苗族自治州': [109.7389287,28.31173554],
	        '益阳市': [112.3340683,28.60197067],
	        '永州市':[111.6121979,26.2112999],
	        '岳阳市': [113.0980682,29.37461853],
	        '张家界市':[110.4814835,29.13187981],
	        '长沙市':[112.9812698,28.20082474],
	        '株洲市':[113.1520615,27.85422325]
	    }

	    var data = [
	         		{name: '常德市',value: 300},
		            {name: '郴州市',value: 100},
	        		{name: '衡阳市',value: 400},
	        		{name: '怀化市',value: 100},
	        		{name: '娄底市',value: 400},
	        	    {name: '邵阳市',value:150},
	        		{name: '湘潭市',value: 101},
	        		{name: '湘西土家族苗族自治州',value: 50},
	        		{name: '益阳市',value: 80},
	        		{name: '永州市',value: 111},
	        		{name: '岳阳市',value: 120},
	        		{name: '张家界市',value: 411},
	        		{name: '长沙市',value: 191},
	        		{name: '株洲市',value: 80}]
	    var max = 480, min = 9; // todo 
	    var maxSize4Pin = 50, minSize4Pin = 20;

	  var convertData = function (data) {
	    var res = [];
	    for (var i = 0; i < data.length; i++) {
	        var geoCoord = geoCoordMap[data[i].name];
	        console.log(geoCoord)
	        if (geoCoord) {
	            res.push({
	                name: data[i].name,
	                value: geoCoord.concat(data[i].value)
	            });
	        }
	    }
	    return res;
	};


	    option = {
	        title: {
	            text: '“网格” - 湖南省',
	            subtext: '',
	            show:false,
	            x: 'center',
	            textStyle: {
	                color: '#ccc'
	            }
	    		
	        },
	        tooltip: {
	            trigger: 'item',
	            position: function (pos, params, dom, rect, size) {
	                  // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
	                  /*var compare=pos[0] < size.viewSize[0] / 2;
	                  if(compare){
	                      return [pos[0]-100,pos[1]];
	                  }else{
	                      return [pos[0]+50,pos[1]];
	                  }*/
	              },
	            formatter: function (params) {
	              if(typeof(params.value)[2] == "undefined"){
	              	return params.name + ' : ' + params.value;
	              }else{
	              	return params.name + ' : ' + params.value[2];
	              }
	            }
	        },
	        legend: {
	            orient: 'vertical',
	            y: 'bottom',
	            x: 'right',
	            data: ['credit_pm2.5'],
	            textStyle: {
	                color: '#fff'
	            }
	        },
	        visualMap: {
	            show: false,
	            min: 0,
	            max: 300,
	            left: 'left',
	            top: 'bottom',
	            text: ['高', '低'], // 文本，默认为数值文本
	            calculable: true,
	            seriesIndex: [1],
	            inRange: {
	                color:['#03D1FD', '#052441', '#1A354F']// 黑紫黑
	            }
	        },
	       
	        geo: {
	            show: true,
	            map: 'hunan',
	            label: {
	                normal: {
	                    show: false
	                },
	                emphasis: {
	                    show: false,
	                }
	            },
	            roam: true,
	            itemStyle: {
	                normal: {
	                    areaColor: '#031525',
	                    borderColor: '#3B5077',
	                },
	                emphasis: {
	                    areaColor: '#2B91B7',
	                }
	            }
	        },
	        series : [
	      {
	            name: '',
	            type: 'scatter',
	            coordinateSystem: 'geo',
	            data: convertData(data),
	            symbolSize: function (val) {
	                return val[2] / 10;
	            },
	            label: {
	                normal: {
	                    formatter: '{b}',
	                    position: 'right',
	                    show: true
	                },
	                emphasis: {
	                    show: true
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: '#05C3F9'
	                }
	            }
	        },
	          
	        {
	            name: '点',
	            type: 'scatter',
	            coordinateSystem: 'geo',
	            symbol: 'pin',
	            symbolSize: function (val) {
	                var a = (maxSize4Pin - minSize4Pin) / (max - min);
	                var b = minSize4Pin - a*min;
	                b = maxSize4Pin - a*max;
	                return a*val[2]+b;
	            },
	            label: {
	                normal: {
	                    show: true,
	                    textStyle: {
	                        color: '#fff',
	                        fontSize: 9,
	                    },
	                    areaColor: '#031525',
	                    borderColor: '#3B5077',
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: '#F62157', //标志颜色
	                    areaColor: '#031525',
	                    borderColor: '#3B5077',
	                }
	            },
	            zlevel: 6,
	            data: convertData(data),
	        },
	        {
	            name: 'Top 5',
	            type: 'effectScatter',
	            coordinateSystem: 'geo',
	            data: convertData(data.sort(function (a, b) {
	                return b.value - a.value;
	            }).slice(0, 5)),
	            symbolSize: function (val) {
	                return val[2] / 10;
	            },
	            showEffectOn: 'render',
	            rippleEffect: {
	                brushType: 'stroke'
	            },
	            hoverAnimation: true,
	            label: {
	                normal: {
	                    formatter: '{b}',
	                    position: 'right',
	                    show: true
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: '#05C3F9',
	                    shadowBlur: 20,
	                    shadowColor: '#05C3F9'
	                }
	            },
	            zlevel: 1
	        },
	         
	    ]
	    };
	    chart.setOption(option);
	    chart.on('click',function(propities){
			var city =propities.name;
				setCitys(city);
				alert(city)
		});
}


