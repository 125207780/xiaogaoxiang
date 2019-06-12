/**
 * 需要有百度地图JS，echarts ，jquery js支撑
 */

function showEmap(orgId,divId,callback,eOption,opOption){
	 
	  $("#"+divId).empty()
	 var thisEmap = this;
	  this.mainDiv = $("#"+divId);
	  this.divArr = [];
	  this.callback =callback;
	  this.nowClick = null;
	  this.eOption = eOption||{};
	  this.next=function(){
			return show(this.nowClick);
	  }
	  this.opOption = {
			  "PoiLayer":  BMapLib.PoiLayer,
			  "ChannelLayer":BMapLib.ChannelLayer,
			  "StationLayer":BMapLib.StationLayer,
			 "AreaLayer" :BMapLib.AreaLayer,
			 "SearchControl":BMapLib.SearchControl,
			 "GridLayer":true
	  }
	  if(opOption){
		  if(opOption.PoiLayer!=undefined){
			  this.opOption.PoiLayer = opOption.PoiLayer;
		  }
		  if(opOption.ChannelLayer!=undefined){
			  this.opOption.ChannelLayer=opOption.ChannelLayer;
		  }
		  if(opOption.StationLayer!=undefined){
			  this.opOption.StationLayer = opOption.StationLayer;
		  }
		  if(opOption.AreaLayer!=undefined){
			  this.opOption.AreaLayer =opOption.AreaLayer;
		  }
		  if(opOption.SearchControl!=undefined){
			  this.opOption.SearchControl =opOption.SearchControl;
		  }
		  
		  if(opOption.GridLayer!=undefined){
			  this.opOption.GridLayer =opOption.GridLayer;
		  }
	  }
	  
		var menuList = $('<div style="margin-right:30px;z-index:10;float:right;position:absolute;right:30px;"></div>');
		 
		this.mainDiv.css("position","relative");
		 this.mainDiv.append(menuList);
		 $.ajax({
			  url:$.cxt + "/gridCommon/getAreaMenu", 
			  data:{orgId:orgId},
			  type: "POST",
			  success : function (list){
				  var sysorg = list[0];
				  if(sysorg.orgLevel =="4"){
					  show(sysorg.orgId);
				  }else{
					  call(sysorg.orgId,sysorg.orgLevel);
				  }
 
			  }
		});
	function showAreaMenu(_orgId){
		menuList.empty();
		$.ajax({
			  url:$.cxt + "/gridCommon/getAreaMenu", 
			  data:{orgId:_orgId},
			  type: "POST",
			  success : function (list){
				  var len =list.length;
				  while(len--){
					  var sysorg = list[len];
					  var areaClassName ="areaMenuLevel"+sysorg.orgLevel; 
					  var ifa = (len==list.length-1)?'':'<i class="fa fa-angle-double-right " aria-hidden="true"></i>';
					 var menu = $('<span class="'+areaClassName+'" style="color:#00BFB2;cursor:pointer;padding-right:3px;font-size:16px;" >'+
							 ifa +
						sysorg.name+
					'</span>');
					 menu.orgId= sysorg.orgId;
					 menuList.append(menu);
					 
					 menu.on("click",null,sysorg,function(arg){
						 call(arg.data.orgId,arg.data.orgLevel);
					 })
				  }
			  }
		}
	);
	}
	function call(_orgId,_orgLevel){
		this.nowClick = _orgId;
		if(this.callback){
			this.callback.call(this,_orgId,_orgLevel);
		}
	}
 
	function copyOption(fromOp,toOp){
		if(fromOp&& typeof fromOp =="object"){
			for(var o in fromOp){
				if(toOp[o]&& typeof toOp[o] =="object"){
					copyOption(fromOp[o],toOp[o]);
				}else{
					toOp[o]=fromOp[o];
				}
			}
		} 
	}
	
	
	  function  show(_orgId){
	   showAreaMenu(_orgId);
	  
		   var len = this.divArr.length;
		   while(len--){
			   this.divArr[len].remove();
		   }
		   this.divArr=[];
	   
		var resultObj ;
		$.ajax({
			  url:$.cxt + "/gridCommon/getEmap", 
			  data:{orgId:_orgId},
			  type: "POST",
			  async:false,
			  success : function (result){
				 
				 var info = result.info;
				 var mapObj = result.mapObj;
				 var mapId = 'mapObj'+_orgId;
				 echarts.registerMap(mapId, mapObj);
				 var div = $('<div style="width:100%;height:100%"></div>');
				 this.mainDiv.append(div);
				 div.orgId=_orgId;
				 this.divArr.push(div);
				
				 if(info.orgLevel=="3" || info.orgLevel=="4"){//baidu
					 if(info.orgLevel=="4"){
						// call(info.orgId,info.orgLevel);
						 _orgId=info.pid;
					 }  
					 
					 var cp = result.cp;
					 var ecmap = echarts.init(div[0]);
					 ecmap.setOption({
						    bmap: {
						        center: [cp.cplng,cp.cplat],
						        zoom: 11,
						        roam: true,
						    },
						    series: [ ]
						});
					 var bdmap = ecmap.getModel().getComponent('bmap').getBMap();
//					 var centerPoint = new BMap.Point(cp.cplng,cp.cplat);
//					 bdmap.centerAndZoom(centerPoint,15);//设置地图中心，显示层级
//					 bdmap.enableScrollWheelZoom(true);  //地图可以滚轮放大缩小
//					 bdmap.enableDragging();
					 var  navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});  
					 bdmap.addControl(navigation);      
					 var flag = true;
					 bdmap.addEventListener("tilesloaded",function(){
					 	if(flag){
					 		flag = false;
					 		if(thisEmap.opOption.PoiLayer){
					 			 var poiLayer=new thisEmap.opOption.PoiLayer(_orgId); //小区边框图层
								  bdmap.addOverlay(poiLayer);
					 		}
							  if(thisEmap.opOption.ChannelLayer){
								  var channelLayer =new thisEmap.opOption.ChannelLayer(_orgId); 
								  bdmap.addOverlay(channelLayer);
							  }
							 if(thisEmap.opOption.StationLayer){
								 var stationLayer =new thisEmap.opOption.StationLayer(_orgId); 
								 bdmap.addOverlay(stationLayer);
							 }
							 if(thisEmap.opOption.AreaLayer){
								 var areaLayer =new thisEmap.opOption.AreaLayer(_orgId);  
								 bdmap.addOverlay(areaLayer);
							 }
							 if(thisEmap.opOption.SearchControl){
								 var searchControl =new thisEmap.opOption.SearchControl(_orgId);  
								 bdmap.addControl(searchControl); 
							 }
					 	}
					 })
					 
					 
					
					 if(  thisEmap.opOption.GridLayer){
						 
					
					 var gridlist = mapObj.features;
					 var gridArr =[];
					   
					 
					 for(var i=0,n=gridlist.length;i<n;i++){
						 var grid = gridlist[i];
						 var color = grid.properties.color;
						 
						  var colorRgba= "rgba(" + parseInt("0x" + color.slice(1, 3)) + "," + parseInt("0x" + color.slice(3, 5)) + "," + parseInt("0x" + color.slice(5, 7)) + "," + 0.7 + ")"; 
						 grid.fillStyle=colorRgba;
//						 var gridId= grid.properties.id;
//						 var orgLevel = grid.properties.orgLevel;
//						 var gridName = grid.properties.name;
//						 var coordinates = grid.geometry.coordinates;
//						 var color = grid.properties.color;
//						 for(var j=0,k=coordinates.length;j<k;j++){
//							 
//							 var shape=  coordinates[j];
//							 var points =[];
//					    	    var len =shape.length;
//					    	    while(len--){
//					    	    	points.push(new BMap.Point(shape[len][0],shape[len][1]));
//					    	    }
//							
//							 var polygon = new BMap.Polygon(points, 
//										{strokeColor:"blue", fillColor:color, strokeWeight:2, strokeOpacity:0.5,fillOpacity: 0.7,strokeStyle: 'solid'});  //创建多边形
//								polygon.orgId = gridId;
//								polygon.orgLevel = orgLevel;
//					            // bdmap.addOverlay(polygon);
//					             gridArr.push(polygon);
//			                	polygon.addEventListener('click', function(obj){
//			                		 
//			                		call(this.orgId,this.orgLevel);
//			                	});
//			                	 
//						 }
					 }
					 var dataSet = new mapv.DataSet(gridlist);

				        var options = {
				          lineWidth:1,
				          strokeStyle:'blue',
				        	  methods: {
				                  click: function (item) {
				                	  if(item){
				                		  call(item.properties.id,item.properties.orgLevel);
				                	  }
				                      
				                  }
				              }
				        }

				        var gridLayer = new mapv.baiduMapLayer(bdmap, dataSet, options);
				        
				        
					 bdmap.gridLayer = gridLayer;
					 
					 bdmap.addEventListener("zoomend",function(){
						 var curZoom = bdmap.getZoom();
						 var fillOpacity = 0.7;
						 if(curZoom>13){
							 fillOpacity = 0.2;
						 }
						 for(var i=0,n=gridlist.length;i<n;i++){
							 var colorRgba = gridlist[i].fillStyle;
							 var c=colorRgba.replace(/(?:\(|\)|rgba)*/g,"").split(",");
							 var gOpacity =parseInt(c[3]);
							 if(gOpacity==fillOpacity){
								 break;
							 }
							 gridlist[i].fillStyle = "rgba("+c[0]+","+c[1]+","+c[2]+","+fillOpacity+")"
						 }
						 bdmap.gridLayer.dataSet.set(gridlist);
						 
					 }) 
					 
					 }
					 
					 ecmap.mapId= mapId;
					 resultObj= ecmap; 
					 resultObj.objType="BMap";
					 if(info.orgLevel=="4"){
//							// call(info.orgId,info.orgLevel);
//						 bdmap.addEventListener("tilesloaded", tl);
//						 bdmap.removeEventListener("tilesloaded", tl);
//						function tl(){
//							call(info.orgId,info.orgLevel);
//						} 
						  
					 }  
					 
					 
				 }else{
					 
					
					var geolist = mapObj.features;
					var regions =[];
					for(var i=0,n=geolist.length;i<n;i++){
						regions.push({  
						    name: geolist[i].properties.name ,  
						    itemStyle: {  
						        normal: {  
						            areaColor: geolist[i].properties.color,  
						            color: geolist[i].properties.color 
						        }  
						    }  
						});
					}
					 var ecmap = echarts.init(div[0]);
					 ecmap.mapId= mapId;
					 var option = {
						 
							   geo:{
								   map: 'mapObj'+_orgId,
								   label : {
									normal : {
										 
										show : true,
										color:"#FFFFFF"
									},
									emphasis : {
										show : true,
										areaColor : '#eee'
									}
								} ,
								regions:regions
							   },
							   series: [{
					                 type: 'scatter',  
					            coordinateSystem: 'geo',  
					              
					            }]
					        };
					 if(this.eOption){
						 copyOption(this.eOption,option);
					 }
					 ecmap.setOption(option);
					 
					 ecmap.on('click', function (params) {
						 var  objlist=echarts.getMap('mapObj'+_orgId).geoJson.features;
						 var len = objlist.length;
						 while(len--){
							 if(params.name==objlist[len].properties.name){
								 var obj = objlist[len];
								 call(obj.properties.id,obj.properties.orgLevel);
								 break;
							 }
						 }
						  
						
						});
					 resultObj= ecmap;
					 resultObj.objType="Echarts";
				 }
			  }
		  })
		  return resultObj;
	}
	
	  
}