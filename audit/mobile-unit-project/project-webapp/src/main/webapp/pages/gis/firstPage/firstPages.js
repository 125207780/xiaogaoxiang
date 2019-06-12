$(function(){
	
	var pieces =[{
		gte:   0,
		lte : 20,
		color :'#32e2ff',
		label:'<20%',
		selected:true
	},{
		gt:   20,
		lte : 40,
		color :'#39baff',
		label:'20-40%',
		selected:true
	},
	{
		gt:   40,
		lte : 50,
		color :'#2f9efc',
		label:'40-50%',
		selected:true
	},
	{
		gt:   50,
		lte : 60,
		color :'#307bf5',
		label:'50-60%',
		selected:true
	},
	{
		gt:   60,
		lte : 70,
		color :'#2360ff',
		label:'60-70%',
		selected:true
	},
	{
		gt:   70,
		color :'#0050e3',
		label:'>70%',
		selected:true
	} 
	 ];
	var unSelectColor = "#999999";
	
	
	var mapObj= null;
	var mapOrgId = null;
	var eOption = { geo:{bottom:"30%",top:10}};
	var kpiDataList,kpiColNames,kpiColModel;
	var  emap = showEmap(orgId,"main",callBack,eOption);
	
	initResbtn();
	initTypeList();
	$("#typeList").change(changeTypeList);
	 $("#kpiList").change(queryKpi);
	
	 
	 
	function initPieces(){
		//初始化范围块
		$("#piecesBtns").empty();
		for(var i=0,n=pieces.length;i<n;i++){
			pieces[i].selected=true;
			var btn = $("<span class='sbtn' id='sbtn_"+i+"'><div>&nbsp;</div>"+pieces[i].label+" </span>");
			btn.children(0).css("background-color",pieces[i].color);
			btn.click(function(){
				clickSbtn(this);
			})
			$("#piecesBtns").prepend(btn)
		}
	}
	
	function clickSbtn(btn){
		 
			if(btn){
				var selIndex = parseInt($(btn)[0].id.substr(5));
				pieces[selIndex].selected = !pieces[selIndex].selected;
			}
			var selected = {};
			for(var i =0,n=pieces.length;i<n;i++){
				selected[i]= pieces[i].selected;
			}
			mapObj.dispatchAction({
			    type: 'selectDataRange',
			    selected:selected
			});
	 
	}
	function initResbtn(){
		$("#resbtn").click(function(){
			if($("#resbtn").hasClass("fa-angle-double-right")){
				closeRight();
			}else{
				openRight();
			}
			
			
		})
	}
    function closeRight(){
    	$("#rightpanel").hide();
		$("#main").animate({width:"100%"},function(){
		 
				mapObj.resize();
			 
			
		});
		$("#resbtn").animate({right:"0px"});
		$("#resbtn").removeClass("fa-angle-double-right");
		$("#resbtn").addClass("fa-angle-double-left");
    }
    function openRight(){
    	$("#main").animate({width:"65%"},function(){
			$("#rightpanel").show();
			 
				mapObj.resize();
			 
			});
		$("#resbtn").animate({right:"35%"});
		
		$("#resbtn").addClass("fa-angle-double-right");
		$("#resbtn").removeClass("fa-angle-double-left");
    }
	
     
	function callBack(_orgId,orgLevel){
		mapOrgId = _orgId;
		  if(orgLevel=="4"){//当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
			  
		   }else{
			   
			   mapObj=this.next();
			   queryKpi();
//			   if(orgLevel=="3"){
//				   closeRight();
//			   } 
		   }
	}
	function initTypeList(){
		$.ajax({
			  url:$.cxt + "/firstPage/getTypeList", 
			  
			  type: "POST",
			  async:false,
			  success : function (list){
				  $("#typeList").empty();
				  var option="";
				  for(var i=0,n=list.length;i<n;i++){
					  option += $("<option value='"+list[i].VALUE+"'>"+list[i].NAME+"</option>");
				  }
				  $("#typeList").append(option);
				  initKpiList();
			  }
		});
	}
	
	function initKpiList(){
		var typeId = $("#typeList").val();
		$.ajax({
			  url:$.cxt + "/firstPage/getKpiList", 
			  data:{typeId:typeId},
			  type: "POST",
			  async:false,
			  success : function (list){
				  $("#kpiList").empty();
				  var option = "";
				  for(var i=0,n=list.length;i<n;i++){
					  option += $("<option value='"+list[i].VALUE+"'>"+list[i].NAME+"</option>");
				  }
				  $("#kpiList").append(option); 
			  }
		});
	}
	function changeTypeList(){
		initKpiList();
		queryKpi();
	}
	
	function queryKpi(){
		 var kpiId =  $("#kpiList").val();
		 var typeId =  $("#typeList").val();
		 if(!kpiId||kpiId==""){
			 return;
		 }
		 var kpiName = $("#kpiList").find("option:selected").text();
		 
		$.ajax({
			  url:$.cxt + "/firstPage/getCityKpi", 
			  data:{pid:mapOrgId,kpiId:kpiId,typeId:typeId},
			  type: "POST",
			  success : function (list){
				   kpiColNames =["名称",kpiName];
				   var resultCol=["NAME","KPI"];
				     kpiColModel = [];
					for(var i =0,n=resultCol.length;i<n;i++){
						kpiColModel.push({name:resultCol[i],index:resultCol[i],align:"center"});
					}
					list.sort(function (a, b) {
			             return b.KPI - a.KPI;
			         })
				   kpiDataList = list;
				  if(mapObj.objType=="Echarts"){
					  showKpiInEcharts();
				  }else{
					  showKpiInBdMap();
				  }
				
				  showGrid();
				  showTop();
			  }
		});
			  
		 
	}
	
	function showKpiInEcharts(){
 
				  initPieces();
					var option = mapObj.getOption();
					var mapId= mapObj.mapId;
					var cityList = echarts.getMap(mapId).geoJson.features;
					var data = [];
					var barData = [];
					var barNameData = [];
					for(var i=0,n=kpiDataList.length;i<n;i++){
						var kpi = kpiDataList[i].KPI;
						var orgId= kpiDataList[i].ORG_ID;
						 
						for(var j=0,k=cityList.length;j<k;j++){
							var tmpObj=cityList[j].properties;
							if(tmpObj.id==orgId){
								data.push({
									"name":tmpObj.name,
									"value":tmpObj.cp.concat(kpi)
								})
							 barData.push({
								 "name":tmpObj.name,
									"value":kpi
							 })
							 barNameData.push(tmpObj.name);
							 break;
							}
						}
					}
					
					option.tooltip = 
					  {
			            trigger: 'item',
			            
			            formatter: function (params) {
			              if(typeof(params.data.value)[2] == "undefined"){
			            	  console.log(params);
			              	return params.name + ' : ' + params.value;
			              }else{
			              	return params.name + ' : ' + params.data.value[2];
			              }
			            }
			        } ;
					 
					option.visualMap={
							textStyle:{color:"#FFF"},
							pieces : pieces,
							outOfRange:{color:[unSelectColor]},  //不选中的时候底色
//							seriesIndex: [0],  //只对地图生效，0 对应 地图的 index
					}
					option.series=[];
						
					//地图颜色随指标变化-----
					var colorMap = {
								 type: 'map',
								 geoIndex:0,
								 
						            data: data
						}	
						option.series.push(colorMap);	
						
						
					 
//					var pin ={  //气泡
//				             
//				            type: 'scatter',
//				            coordinateSystem: 'bmap',
//				            symbol: 'pin',
//				            symbolSize: function (val) {
//				                var a = (maxSize4Pin - minSize4Pin) / (max - min);
//				                var b = minSize4Pin - a*min;
//				                b = maxSize4Pin - a*max;
//				                return a*val[2]+b;
//				            },
//				            label: {
//				                normal: {
//				                    show: true,
//				                    textStyle: {
//				                        color: '#fff',
//				                        fontSize: 9,
//				                    }
//				                }
//				            },
//				            itemStyle: {
//				                normal: {
//				                    color: '#F62157', //标志颜色
//				                }
//				            },
//				            zlevel: 6,
//				            data: data
//				        }
//			 option.series.push(pin);
//					var top5 ={
//			            name: 'Top 5',
//			            type: 'effectScatter',
//			            coordinateSystem: 'bmap',
//			            data: data.sort(function (a, b) {
//			                return b.value[2] - a.value[2];
//			            }).slice(0, 5),
//			            symbolSize: function (val) {
//			                return val[2] / 10;
//			            },
//			            showEffectOn: 'render',
//			            rippleEffect: {
//			                brushType: 'stroke'
//			            },
//			            hoverAnimation: true,
//			            label: {
//			                normal: {
//			                    formatter: '{b}',
//			                    position: 'right',
//			                    show: true
//			                }
//			            },
//			            itemStyle: {
//			                normal: {
//			                    color: '#05C3F9',
//			                    shadowBlur: 10,
//			                    shadowColor: '#05C3F9'
//			                }
//			            },
//			           
//			        }
//					
//					
//				 option.series.push(top5);
//				
					option.grid= {
				        left: 120,
				        top: "70%",
				        bottom: 25
				    }
					option.xAxis = {  
					 type: 'category',
					 axisLabel: {
			            interval: 0,
			            textStyle: {
			                color: '#32e2ff'
			            }
			        },
					 data: barNameData
					
					};
					option.yAxis = {
							type:'value',
							splitLine: {
					            show: false
					        },
					        };
					
					option.series.push({
			        name: 'barSer',
			        type: 'bar',
			        roam: false,
			        barMaxWidth: 40,
			        itemStyle: {
			            normal: {
			                color: '#40a9ed'
			            },
			            emphasis: {
			                color: "#3596c0"
			            }
			        },
			        visualMap: false,
			        zlevel: 2,
			        
			   
			     
			        data: barData
			    });
					
					
					mapObj.clear();
					mapObj.setOption(option);
					/***********************************/
					mapObj.off('datarangeselected');
					mapObj.on('datarangeselected', function (params) {
						 
				    for(var i=0,n=pieces.length;i<n;i++){
				    	pieces[i].selected = params.selected[i];
				    	if(params.selected[i]){
				    		$("#sbtn_"+i).children(0).css("background-color",pieces[i].color);
				    	}else{
				    		$("#sbtn_"+i).children(0).css("background-color",unSelectColor);
				    	}
				    }
				    rangeGrid();
				});
					
					 
						 
					
	 
			
	}
	function showKpiInBdMap(){
		initPieces();
		var option = mapObj.getOption();
		var mapId= mapObj.mapId;
		var cityList = echarts.getMap(mapId).geoJson.features;
		var data = [];
	 
		for(var i=0,n=kpiDataList.length;i<n;i++){
			var kpi = kpiDataList[i].KPI;
			var orgId= kpiDataList[i].ORG_ID;
			 
			for(var j=0,k=cityList.length;j<k;j++){
				var tmpObj=cityList[j].properties;
				if(tmpObj.id==orgId){
					data.push({
						"name":tmpObj.name,
						"value":tmpObj.cp.concat(kpi)
					}) 
				 break;
				}
			}
		}
		option.tooltip = 
		  {
          trigger: 'item',
          
          formatter: function (params) {
            if(typeof(params.data.value)[2] == "undefined"){
            	return params.name + ' : ' + params.value;
            }else{
            	return params.name + ' : ' + params.data.value[2];
            }
          }
      } ;
		 
		option.visualMap={
				textStyle:{color:"blue"},
				pieces : pieces,
				outOfRange:{color:[unSelectColor]},  //不选中的时候底色
				bottom:20,
				right:30,
				align:'left',
				show:true
//				seriesIndex: [0],  //只对地图生效，0 对应 地图的 index
		}
//		var pin ={  //气泡
//	             
//	            type: 'scatter',
//	            coordinateSystem: 'bmap',
//	            symbol: 'rect',
//	            symbolSize: function (val) {
//	                
//	                return [20,val[2]];
//	            } ,
//	            
//	            data: data
//	        }
////		option.series=[];
//	option.series.push(pin);
	 	//mapObj.clear();
		mapObj.setOption(option);
		changeMapGridColor();
		
		/***********************************/
		mapObj.off('datarangeselected');
		mapObj.on('datarangeselected', function (params) {
	    for(var i=0,n=pieces.length;i<n;i++){
	    	pieces[i].selected = params.selected[i];
	    	if(params.selected[i]){
	    		$("#sbtn_"+i).children(0).css("background-color",pieces[i].color);
	    		
	    	}else{
	    		$("#sbtn_"+i).children(0).css("background-color",unSelectColor);
	    	}
	    }
	    rangeGrid();
	    changeMapGridColor();
	});
	}
	function changeMapGridColor(){
		var dataSet = mapObj.getModel().getComponent('bmap').getBMap().gridLayer.dataSet;
		var gridArr = dataSet.get();
		var expression="-1";
		for(var i =0,n=pieces.length;i<n;i++){
			if(pieces[i].selected){
				expression+="+((1==1"
				 if( typeof pieces[i].gt!="undefined"){
					 expression += "&&"+pieces[i].gt+"<kpi";
				 }
				if( typeof pieces[i].gte!="undefined"){
					 expression +="&&" +pieces[i].gte+"<=kpi";
				 }
				if( typeof pieces[i].lt!="undefined"){
					 expression +="&&" +pieces[i].lt+">kpi";
				 }
				if( typeof pieces[i].lte!="undefined"){
					 expression +="&&" +pieces[i].lte+">=kpi";
				 }
				expression+=")?"+(i+1)+":0)";
			}
		}
		for(var i=0,n=kpiDataList.length;i<n;i++){
			var k = kpiDataList[i].KPI;
			var id =  kpiDataList[i].ORG_ID;
			for(var j=0,m=gridArr.length;j<m;j++){
				if(gridArr[j].properties.id==id){
					 var colorRgba = gridArr[j].fillStyle;
					 var gOpacity=colorRgba.replace(/(?:\(|\)|rgba)*/g,"").split(",")[3];
					var r = expression.replace(/kpi/g,k);
					 
					var colorIndex = eval(r);
					var gbacolor = unSelectColor;
					if(colorIndex!="-1"){
						gbacolor =pieces[colorIndex].color
					} 
					   colorRgba= "rgba(" + parseInt("0x" + gbacolor.slice(1, 3)) + "," + parseInt("0x" + gbacolor.slice(3, 5)) + "," + parseInt("0x" + gbacolor.slice(5, 7)) + "," + gOpacity  + ")";
					   gridArr[j].fillStyle =colorRgba; 
					 break;
				}
			}
			
		}
		dataSet.set(gridArr);
		
	}
	
	
	function showTop(){
		$("#topPanel").remove();
		var topPanel = $("<div class='topPanel' id='topPanel'></div>");
		$("#main").append(topPanel);
		
		var topList =  kpiDataList.slice(0, 5);
		var html = "";
		for(var i=0,n=topList.length;i<n;i++){
			html += "<div>NO."+(i+1)+"&nbsp;"+topList[i].NAME+"&nbsp;"+topList[i].KPI+"</div>";
		}
		topPanel.append(html);
	}
	
	function showGrid(){
		$('#kpiTable').GridUnload();
		
		
		$('#kpiTable').jqGrid({               
	        datatype: "local", 
	        data: kpiDataList,           
	        altRows:true,
	        autowidth : true,
	        multiselet: false,//checkbox
	        colNames:kpiColNames,
	        colModel:kpiColModel,
	        height : "100%",
	        pager: '#kpiTablePager', 
	        rowNum:10, 
	        viewrecords: true, 
	        rownumbers: true,
	        rowList:[10,20,30],
			loadComplete : topjqGridLoadComplete
	    });
	}
	
	
	
	
	function rangeGrid(){
		var  expression = "1==2";
	 
		for(var i =0,n=pieces.length;i<n;i++){
			if(pieces[i].selected){
				expression+="||(1==1"
				 if( typeof pieces[i].gt!="undefined"){
					 expression += "&&"+pieces[i].gt+"<kpi";
				 }
				if( typeof pieces[i].gte!="undefined"){
					 expression +="&&" +pieces[i].gte+"<=kpi";
				 }
				if( typeof pieces[i].lt!="undefined"){
					 expression +="&&" +pieces[i].lt+">kpi";
				 }
				if( typeof pieces[i].lte!="undefined"){
					 expression +="&&" +pieces[i].lte+">=kpi";
				 }
				expression+=")";
			}
		}
		
		var rangeList= [];
		for(var i=0,n=kpiDataList.length;i<n;i++){
			var k = kpiDataList[i].KPI;
			var r = expression.replace(/kpi/g,k);
			if(eval(r)){
				rangeList.push(kpiDataList[i]);
			}
		}
		
		$('#kpiTable').jqGrid('clearGridData');

        $('#kpiTable').jqGrid('setGridParam',{data:rangeList}).trigger('reloadGrid');
		
	}
});

 
