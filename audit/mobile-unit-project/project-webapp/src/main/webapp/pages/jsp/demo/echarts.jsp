<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<cxt:commonLinks />
				<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/echarts4.min.js"></script>
				<title>前台组件</title>
				</head>
				<body class="clearfix">
				<div class="page-content">
					<!-- 头部文字 -->
					<div class="page-header">
						<h1>
							前台组件
				<small>
					<i class="ace-icon fa fa-angle-double-right"></i>
					Echarts4.0部分展示
				</small>
			</h1>
		</div>
			<div class="col-xs-12 clearfix">
				<div class="col-xs-6 row">
					<p>
						<h6>
							<span class="label label-danger arrowed-in">关系图谱</span>
						</h6>
					</p>
					<div class="col-xs-12" id="echarts-graph" style=height:500px;"></div>
				</div>
				<div class="col-xs-6 row">
					<p>
						<h6>
							<span class="label label-danger arrowed-in">仪表盘</span>
						</h6>
					</p>
					<div class="col-xs-12" id="echarts-gauge" style=height:500px;"></div>
				</div>
				<div class="col-xs-6 row"">
					<p>
						<h6>
							<span class="label label-danger arrowed-in">矩形树</span>
						</h6>
					</p>
					<div class="col-xs-12" id="echarts-tree" style=height:500px;"></div>
				</div>
			</div>
		</div>
	</div>
<script>
	var option1 = {
		    title: {
		        //text: 'Graph 简单示例'
		    },
		    tooltip: {},
		    animationDurationUpdate: 1500,
		    animationEasingUpdate: 'quinticInOut',
		    series : [
		        {
		            type: 'graph',
		            layout: 'none',
		            symbolSize: 50,
		            roam: true,
		            draggable:true,
		            label: {
		                normal: {
		                    show: true
		                }
		            },
		            edgeSymbol: ['circle', 'arrow'],
		            edgeSymbolSize: [2, 4],
		            edgeLabel: {
		                normal: {
		                    textStyle: {
		                        fontSize: 20
		                    }
		                }
		            },
		            data: [
		             /* 一级分类 */
		             {
		                name: '费用',
		                x: 600,
		                y: 300,
		                value:10000000,
		                symbolSize:60,
		                label:{
		                	fontSize:14
		                },
		                itemStyle:{
		                	color:'#8721bf'
		                }
		            }, 
		            
		            /* 二级分类 */
		            {
		                name: '押金',
		                x: 600,
		                y: 200,
		                symbolSize:50,
		                label:{
		                	fontSize:14
		                },
		                itemStyle:{
		                	color:'#4c68cf'
		                }
		            },
		            /* 三级分类 */
		            {
		                name: '押金1',
		                x: 480,
		                y: 180,
		                symbolSize:40,
		                label:{
		                	fontSize:12
		                },
		                itemStyle:{
		                	color:'#61c5fe'
		                }
		            }, 
		            {
		                name: '押金2',
		                x: 580,
		                y: 100,
		                symbolSize:40,
		                label:{
		                	fontSize:12
		                },
		                itemStyle:{
		                	color:'#61c5fe'
		                }
		            }, 
		            {
		                name: '押金3',
		                x: 700,
		                y: 90,
		                symbolSize:40,
		                label:{
		                	fontSize:12
		                },
		                itemStyle:{
		                	color:'#61c5fe'
		                }
		            }, 
		            /* 二级分类 */
		            {
		                name: '总费用',
		                x: 500,
		                y: 400,
		                symbolSize:50,
		                label:{
		                	fontSize:12
		                },
		                itemStyle:{
		                	color:'#4c68cf'
		                }
		            }, 
		            /* 三级分类 */
		            {
		                name: '医疗支出',
		                x: 360,
		                y: 360,
		                symbolSize:40,
		                label:{
		                	fontSize:12
		                },
		                itemStyle:{
		                	color:'#61c5fe'
		                }
		            }, 
		            {
		                name: '药品费用',
		                x: 320,
		                y: 450,
		                symbolSize:40,
		                label:{
		                	fontSize:12
		                },
		                itemStyle:{
		                	color:'#61c5fe'
		                }
		            }, 
		            {
		                name: 'XX费用',
		                x: 340,
		                y: 540,
		                symbolSize:40,
		                label:{
		                	fontSize:12
		                },
		                itemStyle:{
		                	color:'#61c5fe'
		                }
		            }, 
		            
		            /* 二级分类 */
		            {
		                name: '其他费用',
		                x: 700,
		                y: 400,
		                symbolSize:50,
		                label:{
		                	fontSize:14
		                },
		                itemStyle:{
		                	color:'#4c68cf'
		                }
		            }, 
		            /* 三级分类 */
		            {
		                name: '某某费用',
		                x: 900,
		                y: 400,
		                symbolSize:40,
		                label:{
		                	fontSize:12
		                },
		                itemStyle:{
		                	color:'#4c68cf'
		                }
		            }
		            ],
		            // links: [],
		            links: [{
		                source: '费用',
		                target: '押金'
		            }, {
		                source: '费用',
		                target: '总费用'
		            }, {
		                source: '费用',
		                target: '其他费用'
		            }, {
		                source: '押金',
		                target: '押金1'
		            }, {
		                source: '押金',
		                target: '押金2'
		            }, {
		                source: '押金',
		                target: '押金3'
		            }, {
		                source: '总费用',
		                target: '医疗支出'
		            }, {
		                source: '总费用',
		                target: 'XX费用'
		            }, {
		                source: '其他费用',
		                target: '某某费用'
		            }],
		            lineStyle: {
		                normal: {
		                    opacity: 0.6,
		                    width: 2,
		                    curveness: 0.4
		                }
		            }
		        }
		    ]
		}; 
	var myGraph = echarts.init(document.getElementById('echarts-graph'));
	myGraph.setOption(option1, true);
	
</script>
<script>
	var option2 = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        series : [
            {
                name: '',
                type: 'gauge',
                radius: '80%',
                min: 10,
                max: 90,
                startAngle: 160,
                endAngle: -160,
                splitNumber: 8,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 20
                    }
                },
                axisTick: {            // 坐标轴小标记
                    //splitNumber:10,
                    length:26,        // 属性length控制线长
                    lineStyle: {        // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    distance:10,
                    fontSize:16,
                    formatter:function(v){
                        switch (v + '') {
                            case '10' : return 'AAA';
                            case '20' : return 'BBB';
                            case '30' : return 'CCC';
                            case '40' : return 'DDD';
                            case '50' : return 'EEE';
                            case '60' : return 'FFF';
                            case '70' : return 'GGG';
                            case '80' : return 'HHH';
                            case '90' : return 'III';
                        }
                    }
                },
                splitLine: {           // 分隔线
                    length: 22,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width:10
                },
                title : {
                    show: true,
                    color:'#1b88d6',
                    fontSize:20,
                    offsetCenter:['-50%','-10%']
                },
                detail : {
                    show: true,
                    color:'#1b88d6',
                    fontSize:36,
                    fontWeight:'bold',
                    offsetCenter:['-50%','10%'],
                    formatter: function (value) {
                        return value.toFixed(0) + '%';
                    }
                },
                data:[{value: 60, name: '完成率(%)'}]
            }
        ]
    };

    var myGauge = echarts.init(document.getElementById('echarts-gauge'));
    myGauge.setOption(option2, true);

</script>
<script>
	var option3 = {
        series: [{
            type: 'treemap',
            data: [
                {
                    name: 'nodeA',            // First tree
                    value: 60,
                    children: [{
                        name: 'nodeAA',       // First leaf of first tree
                        value: 4,
                        children: [{
                            name: 'nodeAAA',       // First leaf of first tree
                            value: 4,
                            itemStyle:{
                                color:'#37A2DA'
                            }
                        }, {
                            name: 'nodeBBB',       // Second leaf of first tree
                            value: 6,
                            itemStyle:{
                                color:'#ff9f7f'
                            }
                        }]
                    }, {
                        name: 'nodeAb',       // Second leaf of first tree
                        value: 6,
                        color:'#dadada'
                    }]
                },
                {
                    name: 'nodeB',            // Second tree
                    value: 20,
                    children: [{
                        name: 'nodeBa',       // Son of first tree
                        value: 20,
                        children: [{
                            name: 'nodeBa1',  // Granson of first tree
                            value: 20
                        }]
                    }]
                }]
        }]
    };


    var myTree = echarts.init(document.getElementById('echarts-tree'));
	myTree.setOption(option3, true);

</script>
</body>
</html>