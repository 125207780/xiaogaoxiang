$(function(){
//	myLineBarChart();
	myLineBarChart1();
});



function myLineBarChart(){
	require.config({
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
            		                $.getJSON('dist/city/' + geoJsonName + '.json', callback);
            		            }
            		        })(city)
            		    }
            		}
            		 
            		var ecConfig = require('echarts/config');
            		var zrEvent = require('zrender/tool/event');
            		document.getElementById('map').onmousewheel = function (e){
            		   
            		};
            		myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
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
            		    mt='湖南';
            		  }
            		    option.series[0].mapType = mt;
            		     
            		    option.title.subtext = mt + ' （点击切换）';
            		    myChart.setOption(option, true);
            		});
            		option = {
            		    title: {
            		        text : '湖南省主要城市（县）地图',
            		        subtext : '湖南省 （点击切换）'
            		    },
            		    tooltip : {
            		        trigger: 'item'
            		    },
            		  	dataRange: {
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
            		        color: ['#E0022B', '#E09107', '#A3E00B']
            		    },
            		    series : [
            		        {
            		            name: '指标值',
            		            type: 'map',
            		            mapType: '湖南',
            		          	roam: false,
            		            selectedMode : 'single',
            		            itemStyle:{
            		                normal:{
            		                    label:{
            		                        show:true,
            		                        textStyle: {
            		                           color: "rgb(249, 249, 249)"
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
            		              	{name: '株洲市',value: Math.round(Math.random()*2000)}
            		            ]
            		        }
            		    ]
            		};
            myChart.setOption(option);
        }
    );
}


function myLineBarChart1(){
	
	require.config({
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
            		    "延边朝鲜族自治州": "222400",
            		    "吉林市": "220200",
            		    "白城市": "220800",
            		    "松原市": "220700",
            		    "长春市": "220100",
            		    "白山市": "220600",
            		    "通化市": "220500",
            		    "四平市": "220300",
            		    "辽源市": "220400"
            		   
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
            		                $.getJSON('dist/city1/' + geoJsonName + '.json', callback);
            		            }
            		        })(city)
            		    }
            		}
            		 
            		var ecConfig = require('echarts/config');
            		var zrEvent = require('zrender/tool/event');
            		document.getElementById('map').onmousewheel = function (e){
            		   
            		};
            		myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
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
            		    mt='吉林';
            		  }
            		    option.series[0].mapType = mt;
            		     
            		    option.title.subtext = mt + ' （点击切换）';
            		    myChart.setOption(option, true);
            		});
            		option = {
            		    title: {
            		        text : '吉林省主要城市（县）地图',
            		        link : 'http://www.pactera.com/',
            		        subtext : '吉林省 （点击切换）'
            		    },
            		    tooltip : {
            		        trigger: 'item'
            		    },
            		  	dataRange: {
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
            		        color: ['#E0022B', '#E09107', '#A3E00B']
            		    },
            		    series : [
            		        {
            		            name: '指标值',
            		            type: 'map',
            		            mapType: '吉林',
            		          	roam: false,
            		            selectedMode : 'single',
            		            itemStyle:{
            		                normal:{
            		                    label:{
            		                        show:true,
            		                        textStyle: {
            		                           color: "rgb(249, 249, 249)"
            		                        }
            		                    }
            		                },
            		                normal:{label:{show:true}},
            		                emphasis:{label:{show:true}}
            		            },
            		            data:[
            		                {name: '延边朝鲜族自治州',value: Math.round(Math.random()*2000)},
            		                {name: '吉林市',value: Math.round(Math.random()*2000)},
            		                {name: '白城市',value: Math.round(Math.random()*2000)},
            		                {name: '松原市',value: Math.round(Math.random()*2000)},
            		                {name: '长春市',value: Math.round(Math.random()*2000)},
            		                {name: '白山市',value: Math.round(Math.random()*2000)},
            		                {name: '通化市',value: Math.round(Math.random()*2000)},
            		                {name: '四平市',value: Math.round(Math.random()*2000)},
            		                {name: '辽源市',value: Math.round(Math.random()*2000)},
            		              	{name: '农安县',value: Math.round(Math.random()*2000)}
            		            ]
            		        }
            		    ]
            		};
            myChart.setOption(option);
        }
    );
}

