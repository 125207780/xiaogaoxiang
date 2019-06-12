
$( function() {
	  initParam();
	  initForm();
	  initButton();
	  
  });
	var m=0;
	var Arr = new Array();
	var creatArr = new Array();
	var num=0 ;	
	var name="";
	var phone="";
	var poiList = "";
	var channelList ="";
	var stationList = "";
	var dayCost="";	
	var villageCost="";	
	var customCost="";	
	var groupCost="";	
	var channelCost="";	
	var stationCost="";	
	

  function initParam(){
	  
 
	  $.ajax({
		  url:$.cxt + "/map/getOrgDetail", 
		  data : {orgId:nowOrgId},
		  type: "POST",
		  success : function (data){
			  	var lng=0,lat=0;	  
			  for(var i=0;i<data.length;i++){
				  var tmp =data[i];
				  var polygon = new BMap.Polygon(JSON.parse(tmp.shape), 
							{strokeColor:"blue", fillColor:'', strokeWeight:2, strokeOpacity:0.5,fillOpacity: 0.0,strokeStyle: 'solid'});  //创建多边形
	              
				  map.addOverlay(polygon); 
				  lng += (tmp.maxlng+tmp.minlng)/(2*data.length);
				  lat += (tmp.maxlat+tmp.minlat)/(2*data.length);
			  }
			  initMap(lng,lat);
		  }
	  });
	    redIcon = new BMap.Icon($.cxt+"/pages/images/gis/red.png", new BMap.Size(21,33));
	    blueIcon = new BMap.Icon($.cxt+"/pages/images/gis/blue.png", new BMap.Size(21,33));
	  $("#pid").val(nowOrgId);
	  $.ajax({
			url : $.cxt + "/map/initMap", 
			data : {pid:nowOrgId},
			type: "POST",
			success : function(data) {
				for(var i = 0;i < data.length;i++){
					var temp = data[i];
					var pointArray = [];
					var points = JSON.parse(temp.shape);
					for(var j = 0;j < points.length;j++){
						var point = new BMap.Point(points[j].lng,points[j].lat);
						pointArray.push(point);
					}
					 
					var polygon = new BMap.Polygon(pointArray, 
							{strokeColor:"blue", fillColor:temp.color, strokeWeight:2, strokeOpacity:0.5,fillOpacity: 0.5,strokeStyle: 'solid'});  //创建多边形
					polygon.orgId = temp.orgId;
					polygon.mapName = temp.name;
					polygon.mapType = temp.typeId;
//					polygon.mapUser = temp.loginId;
//					polygon.busiManager = temp.loginId;
//					polygon.cdManager = temp.loginId;
//					polygon.heapManager = temp.loginId;
//					polygon.directManager = temp.loginId;
//					polygon.societyManager = temp.loginId;
					polygon.mapColor = temp.color;
					polygon.mapAddress = temp.shape;
					polygon.mapState = "edit";
                	map.addOverlay(polygon);
                	polygon.addEventListener('click', editPolygon);
				}
			}
	  });
  }
  
  var map = new BMap.Map('allmap');	
  var overlays = [];
  var flag = 0;
  var page = 1;
  var total;
  var tempoverlays = [];
  var edit = 0;
  var areaLayerList ;
  var completePology=[];
  function initMap(lng,lat) {
	  var centerPoint = new BMap.Point(lng,lat);
	  map.centerAndZoom(centerPoint,14);//设置地图中心，显示层级
	  map.enableScrollWheelZoom(true);  //地图可以滚轮放大缩小
	  map.enableDragging();
	  map.enableDoubleClickZoom(false);
	    
//	  var  navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM}); //右上角
//	  map.addControl( navigation);    
	  
	  var  navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});  
	  map.addControl(navigation);       
		  var poiLayer=new BMapLib.PoiLayer(nowOrgId); //小区边框图层
		  map.addOverlay(poiLayer);
		  
		 var channelLayer = new BMapLib.ChannelLayer(nowOrgId); 
		 map.addOverlay(channelLayer);
		 var stationLayer = new BMapLib.StationLayer(nowOrgId); 
		 map.addOverlay(stationLayer);
		 
		 var areaLayer = new BMapLib.AreaLayer(nowOrgId);  
		 map.addOverlay(areaLayer);
		 areaLayerList= areaLayer.getOverlayList();
		  
		 var searchControl = new BMapLib.SearchControl(nowOrgId);  
		 map.addControl(searchControl);
	   
	    var styleOptions = {
	        strokeColor:"blue",    //边线颜色。
	        fillColor:"#A7C0E0",      //填充颜色。当参数为空时，圆形将没有填充效果。
	        strokeWeight: 2,       //边线的宽度，以像素为单位。
	        strokeOpacity: 0.5,	   //边线透明度，取值范围0 - 1。
	        fillOpacity: 0.5,      //填充的透明度，取值范围0 - 1。
	        strokeStyle: 'solid' //边线的样式，solid或dashed。
	    }
	    //实例化鼠标绘制工具
	    var drawingManager = new BMapLib.DrawingManager(map, {
	        isOpen: false, //是否开启绘制模式
	        enableDrawingTool: true, //是否显示工具栏
	        drawingToolOptions: {
	            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
	            offset: new BMap.Size(5, 5), //偏离值
	        },
	        circleOptions: styleOptions, //圆的样式
	        polylineOptions: styleOptions, //线的样式
	        polygonOptions: styleOptions, //多边形的样式
	        rectangleOptions: styleOptions //矩形的样式
	    });  
		 //添加鼠标绘制工具监听事件，用于获取绘制结果
	    drawingManager.addEventListener('overlaycomplete', overlaycomplete);
	    
	    drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);//画矩形
	    //给button绑定个点击事件,点击后可以进行绘制
	    $("#polygon").click(function(){
    		messageAlert("该区县无法划分网格");
/*
	    	if(null !=tempoverlays[0]){
	    		var message1 = "是否对修改过的图形进行保存";
	    		bootbox.dialog({  
					        message: message1,  
					        title: "确认提示",  
					        buttons: {  
					            OK: {  
					                label: "确认",  
					                className: "btn-primary",  
					                callback:editModel()	         
					            },
					            Cancel: {  
					                label: "取消",  
					                className: "btn-default" ,
					                callback:  initParam()
					            }  
					        }  
					    });
	    			tempoverlays.splice(0,1);
	    	}
	    	
	    	$.ajax({
				url : $.cxt + "/map/getErrChannelNum", 
				data : {orgId:nowOrgId},
				type: "POST",
				success : function(data) {
					if(data>0){
					 
						var message = "当前区县下有<a id='errChannelBtn' style='cursor: pointer;'>"+data+"</a>个渠道没有经纬度信息，故未在地图上展现，是否继续划分网格?";
					 bootbox.dialog({  
						        message: message,  
						        title: "确认提示",  
						        buttons: {  
						            OK: {  
						                label: "确认",  
						                className: "btn-primary",  
						                callback: function () {  
						                	
						                	drawingManager.open();
								    		disableEditPolygon();
								    		 
								    		$("path, svg").css({"cursor":""});
								    		if(null != overlays[0] && 'new' == overlays[0].mapState){
								    			map.removeOverlay(overlays[0]);
								    		}
								    		overlays.splice(0, 1);
						                }  
						            },
						            Cancel: {  
						                label: "取消",  
						                className: "btn-default" 
						            }  
						        }  
						    });
						
						$("#errChannelBtn").unbind("click");
				    	$("#errChannelBtn").click(function(){
				    		topwindow.i=1100;
				    		topwindow.showWindow({
								   title : '渠道异常信息',
								   data:{orgId:nowOrgId},
									url : $.cxt + "/pages/gis/indexPage/errChannel.jsp",
									bottons : [{
										title : "关闭" ,
										fun : function() {
											topwindow.removeWindow();
										}
									}] 
							   })
				    		
				    	});
					}else{
						drawingManager.open();
			    		disableEditPolygon();
			    		 
			    		$("path, svg").css({"cursor":""});
			    		if(null != overlays[0] && 'new' == overlays[0].mapState){
			    			map.removeOverlay(overlays[0]);
			    		}
			    		overlays.splice(0, 1);
					}
				}
	    	}
	    	)
    	*/})
    	
//    	$("#submit").click(function(){
//    		var overlaysArray = [];
//    		for(var i = 0; i < overlays.length; i++){
//    			overlaysArray.push(overlays[i].getPath());
//    	    }
//    		disableEditPolygon();
//    		flag = 0;
//    		console.log(overlaysArray);
//    		$("path, svg").css({"cursor":""});
//    	})
    	
    	$("#submit").click(function(){
    		messageAlert("该区县无法划分网格");
    		/*
    		var pointArray= [];
			  completePology=[];
    		if(null != overlays[0]){ 
    			  var data_b=overlays[0].getPath();
    			  var polygon_b = JSON.stringify(data_b);// 转成JSON格式
    			  var areaLayerListLength = areaLayerList.length;
    			  for(var i=0 ;i<areaLayerListLength;i++){
    				 var data_a = areaLayerList[i].getPath();
    				  var polygon_a = JSON.stringify(data_a);// 转成JSON格式
    				  $.ajax ({
    					  url : $.cxt + "/gridCommon/intersect",  
    						data : {polygon_a:polygon_a,polygon_b:polygon_b},
    						type: "POST",
    						async : false,
    					    success : function (data){
    					    	for(var i =0 ; i <data.length;i++){
    					    	 completePology.push(data[i])    	 
    					    	}
    					   }
    				  })
    				  if(completePology.length>1){
    					  messageAlert("所画网格已经跨区域了请重新画！");
    					  completePology=[];
    					  map.removeOverlay(e.overlay);
    					  return;
    				  }else{
    					  var completePologyArr = completePology[0];
    					  console.log(completePology[0]);
    					  for(var i=0;i<completePologyArr.length;i++){
    							pointArray.push(new BMap.Point(completePologyArr[i].lng,completePologyArr[i].lat));
    					  }
    					  overlays[0].setPath(pointArray);
   				  }
    			  }
    			$("#address").val(JSON.stringify(overlays[0].getPath()));
        		disableEditPolygon();
        		$("path, svg").css({"cursor":""});
    			if('new' == overlays[0].mapState){
            		createModel();
            		console.log("------------>"+creatArr);
    			}else{
    				editModel();
    			}
    		}else{
    			messageAlert("没有可保存的网格！");
    		}
    	*/})
    	
    	$("#edit").click(function(){
    		/*flag = 1;
    		$("path, svg").css({"cursor":""});*/
    		messageAlert("该区县无法划分网格");
    	})
    	
    	$("#delete").click(function(){
    		/*disableEditPolygon();
    		flag = 2;
    		$("path, svg").css({"cursor":"url(../../images/gis/delect.ico),auto"});*/
    		messageAlert("该区县无法划分网格");
    	})
    	
    	$("#complete").click(function(){
    		messageAlert("该区县无法划分网格");/*
    		alert(1);
    		bootbox.dialog({
    			message: "是否确认将选中的基础单元包保给该渠道经理？",
				title: "提示信息",
				buttons:{
					OK: {
						label: "确认",
						className: "btn-primary",
						callback: function () {
							alert(nowOrgId)
							$.ajax({
								url : $.cxt + "/map/complete",
							 	type : "POST",
							 	data : {orgId:nowOrgId},
							 	success : function(json){
							 	messageAlert("保存成功!");
							 	}
							 });
							}
						},
					Cancel: {
						label: "取消",
						className: "btn-default",
						callback: function () {
							
						}
					}
				
				}
    		})
							$.ajax({
								url : $.cxt + "/map/complete",
								dataType : "json",
							 	type : "POST",
							 	data : {orgId:orgId},
							 	success : function(json){
							 	messageAlert("保存成功!");
							 	}
							 });
			
    	*/})
    	
    	
    	$(".menuAreaList").each(function(index,ele){
    		$(this).click(function(){
    			$(".menuAreaList").css({"color":"#d9e6f2","background":"rgba(3,36,62,0.8)"});
    			$(".menuAreaList").eq(index).css({"color":"#ab8a2d","background":"rgba(3,36,62,0.8)"});
    		})
    		
    	})
    	$('body').mousedown(function(e){ 
	          if(3 == e.which){ 
	        	
	        	  $(".menuAreaList").each(function(index,ele){
	          			$(".menuAreaList").css({"color":"#d9e6f2","background":"rgba(3,36,62,0.8)"});
	          	  })
	        	  
	        	  $("path, svg").css({"cursor":""});
	        	  if(flag==1){
	        		  disableEditPolygon();
	        		  editModel();
	        	  }else{
	        		  disableEditPolygon();
	        	  }
	          }
    	})
    	
  }
  
  var overlaycomplete = function(e){
	  var pointArray= [];
	  completePology=[];
	  e.overlay.mapState = "new";
	  e.overlay.addEventListener('click', editPolygon);
	  var data_b=e.overlay.getPath();
	  var polygon_b = JSON.stringify(data_b);// 转成JSON格式
	  var areaLayerListLength = areaLayerList.length;
	  for(var i=0 ;i<areaLayerListLength;i++){
		 var data_a = areaLayerList[i].getPath();
		  var polygon_a = JSON.stringify(data_a);// 转成JSON格式
		  $.ajax ({
			  url : $.cxt + "/gridCommon/intersect",  
				data : {polygon_a:polygon_a,polygon_b:polygon_b},
				type: "POST",
				async : false,
			    success : function (data){
			    	for(var i =0 ; i <data.length;i++){
			    	 completePology.push(data[i])    	 
			    	}
			   }
		  })
		  if(completePology.length>1){
			  messageAlert("所画网格已经跨区域了请重新画！");
			  completePology=[];
			  map.removeOverlay(e.overlay);
			  return;
		  }else{
			  var completePologyArr = completePology[0];
			  console.log(completePology[0]);
			  for(var i=0;i<completePologyArr.length;i++){
					pointArray.push(new BMap.Point(completePologyArr[i].lng,completePologyArr[i].lat));
			  }
			  console.log(pointArray);
			  e.overlay.setPath(pointArray);
		  }
	  }
	  
	  overlays.push(e.overlay);
      $(".menuAreaList").each(function(index,ele){
			$(".menuAreaList").css({"color":"#d9e6f2","background":"rgba(3,36,62,0.8)"});
	  })
 
      $("#address").val(JSON.stringify(overlays[0].getPath()));
//      createModel();
  };
  
  function clearAll() {
	  for(var i = 0; i < overlays.length; i++){
          map.removeOverlay(overlays[i]);
      }
      overlays.length = 0   
  }
  
  var editPolygon = function(e){
	  var overlay = this;
	  if(flag == 1&&overlay.mapState=="edit"){
		  if(null != overlays[0] && 'new' == overlays[0].mapState){
				map.removeOverlay(overlays[0]);     // 判断 如果overlays
		  }
		  //tempoverlays.push(overlays[0]);
		  overlays.splice(0, 1);  //删除数组中
		  disableEditPolygon();
		  flag == 1;
		  overlay.enableEditing();
	  	  overlays.splice(0, 1);
	  	  overlays.push(overlay);
	  }else if(flag == 1&&overlay.mapState=="new"){	  
		//  tempoverlays.push(overlays[0]);
		  disableEditPolygon();
		  flag == 1;
		  overlay.enableEditing();
	  	  overlays.splice(0, 1);
	  	  overlays.push(overlay);
	  }else if(flag == 2){
		    $('#confirmModal').modal({
				backdrop : 'static',
				keyboard : false,
				show : true
			});
			$('#confirmBtnModal').off();
			$('#confirmBtnModal').on("click", function() {
				  map.removeOverlay(overlay);
				  overlays.splice(0, 1);
				  if(overlay.orgId){
				  $.ajax({
						url : $.cxt + "/map/delete", 
						data : {orgId:overlay.orgId},
						type: "POST",
						success : function(data) {
							messageAlert("删除成功！");
						}
					});
				  }
				  $('#confirmModal').modal('hide');
				  $("path, svg").css({"cursor":""});
				  $(".menuAreaList").each(function(index,ele){
						$(".menuAreaList").css({"color":"#d9e6f2","background":"rgba(3,36,62,0.8)"});
				  })
				  flag=0;
			});
			$('#cancelBtnModal').on("click", function() {
				$('#confirmModal').modal('hide');
			});
	  }
  };
  
  var disableEditPolygon = function(){
	  for(var i = 0; i < overlays.length; i++){
		  overlays[i].disableEditing();
      }
	  flag=0;
  };
  
   
   
  
  function initForm(){
	  $('#mapForm').bootstrapValidator({
			fields : {
					mapName : {validators : {
									notEmpty : {message : '请填写网格名称'},
									regexp : { regexp : /^.{1,15}$/,message : '网格名字不能超过15个字'}
								}
					},
					imgSelMam : {validators : {
									notEmpty : {message : '请选择网格颜色'}
								}
					},
					mapType : {validators : {
									notEmpty : {message : '请选择网格类型'}
								}
					}
			},
			submitHandler : function(validator, form, submitButton) {
				
				if($('#mapForm select[name=mapManager]').val()=='mr'){
					messageAlert("必须填写网格经理！");
					$("#submitBtn").removeAttr("disabled");
					return;
				}
				var url;
				if(1 == edit){
					url = "/map/edit";
				}else{
					url = "/map/create";
				}
				$('#mapForm input[name=color]').val($("#mapType option:selected").attr("color"));
				$('#mapForm input[name=orgOldId]').val(nowOrgId);
				$('#mapForm input[name=maxLng]').val(overlays[0].getBounds().getNorthEast().lng);
				$('#mapForm input[name=maxLat]').val(overlays[0].getBounds().getNorthEast().lat);
				$('#mapForm input[name=minLng]').val(overlays[0].getBounds().getSouthWest().lng);
				$('#mapForm input[name=minLat]').val(overlays[0].getBounds().getSouthWest().lat);
				$('#mapForm input[name=sharp]').val(JSON.stringify(overlays[0].getPath()));
				console.log("------------>"+JSON.stringify(overlays[0].getBounds().getSouthWest()));
				console.log("------------>"+JSON.stringify(overlays[0].getBounds().getNorthEast()));
				console.log($("#mapForm").serializeObject())
				
				console.log("----poiList-------->"+poiList);
				
				console.log("----creatArr-------->"+typeof(creatArr));
				var param=$("#mapForm").serializeObject();
				console.log(param);
				
				var busiManagerlist=param.busiManager;
				console.log(typeof(busiManagerlist));	
				console.log(busiManagerlist);
				param.busiManagerlist="";
				if(typeof(busiManagerlist)=="object"){
					busiManagerlist="A:"+busiManagerlist.join(",")
					param.busiManagerlist=busiManagerlist;
				}else if(typeof(busiManagerlist)=="string"){
					busiManagerlist=busiManagerlist;
					param.busiManagerlist=busiManagerlist
				}else{
					busiManagerlist="";
					param.busiManagerlist=busiManagerlist
				}
				
				var cdManagerlist =param.cdManager;
				console.log(typeof(cdManagerlist));	
				param.cdManagerlist="";
				if(typeof(cdManagerlist)=="object"){
					cdManagerlist="A:"+cdManagerlist.join(",")
					param.cdManagerlist=cdManagerlist;
				}else if(typeof(cdManagerlist)=="string"){
					cdManagerlist=cdManagerlist;
					param.cdManagerlist=cdManagerlist;
				}else{
					cdManagerlist="";
					param.cdManagerlist=cdManagerlist;
				}
				
				var mapManagerlist = param.mapManager;
				param.mapManagerlist="";
				console.log(typeof(mapManagerlist));		
				if(typeof(mapManagerlist)=="object"){
					mapManagerlist="A:"+mapManagerlist.join(",");
					param.mapManagerlist=mapManagerlist;
				}else if(typeof(mapManagerlist)=="string"){
					mapManagerlist=mapManagerlist;
					param.mapManagerlist=mapManagerlist;
				}else{
					mapManagerlist="";
					param.mapManagerlist=mapManagerlist;
				}
				
				var heapManagerlist= param.heapManager;
				console.log(typeof(heapManagerlist));
				param.heapManagerlist='';
				if(typeof(heapManagerlist)=="object"){
					heapManagerlist="A:"+heapManagerlist.join(",");
					param.heapManagerlist=heapManagerlist;
				}else if(typeof(heapManagerlist)=="string"){
					heapManagerlist=heapManagerlist;
					param.heapManagerlist=heapManagerlist;
				}else{
					heapManagerlist="";
					param.heapManagerlist=heapManagerlist;
				}
				
				var directManagerlist= param.directManager;
				console.log(typeof(directManagerlist));
				param.directManagerlist="";
				if(typeof(directManagerlist)=="object"){
					directManagerlist="A:"+directManagerlist.join(",");
					param.directManagerlist=directManagerlist;
				}else if(typeof(directManagerlist)=="string"){
					directManagerlist=directManagerlist;
					param.directManagerlist=directManagerlist;
				}else{
					directManagerlist="";
					param.directManagerlist=directManagerlist;
				}
				
				var direct_sale_user_infolist= param.direct_sale_user_info;
				console.log(typeof(directManagerlist));
				param.direct_sale_user_infolist="";
				if(typeof(direct_sale_user_infolist)=="object"){
					direct_sale_user_infolist="A:"+direct_sale_user_infolist.join(",");
					param.direct_sale_user_infolist=direct_sale_user_infolist;
				}else if(typeof(direct_sale_user_infolist)=="string"){
					direct_sale_user_infolist=direct_sale_user_infolist;
					param.direct_sale_user_infolist=direct_sale_user_infolist;
				}else{
					direct_sale_user_infolist="";
					param.direct_sale_user_infolist=direct_sale_user_infolist;
				}
				
				param.poiList=poiList.join(",");
				param.channelList=channelList.join(",");
				param.stationList=stationList.join(",");
				param.societyManagerlist=creatArr.join(",");
				console.log(param.channelList)
				console.log(param.stationList)
				
				param.dayCost=dayCost;
				param.villageCost=villageCost;
				param.customCost=customCost;
				param.groupCost=groupCost;
				param.channelCost=channelCost;
				param.stationCost=stationCost;
				
			
				$.ajax({
					url : $.cxt + url,
					data :  param,  //识别name 标签
					type : "POST",
					success : function(json) {	
						console.log("------------>"+json);
						var pointArray= [];
						
						var points = JSON.parse($('#mapForm input[name=address]').val());
						for(var j = 0;j < points.length;j++){
							pointArray.push(new BMap.Point(points[j].lng,points[j].lat));
						}
						var polygon = new BMap.Polygon(pointArray, 
								{strokeColor:"blue", fillColor:$('#mapForm input[name=color]').val(), strokeWeight:2, strokeOpacity:0.5,fillOpacity: 0.5,strokeStyle: 'solid'});  //创建多边形
						polygon.orgId = json;
						polygon.mapName = $('#mapForm input[name=mapName]').val();
						polygon.mapType = $('#mapForm select[name=mapType]').val();
						polygon.mapUser = $('#mapForm select[name=mapManager]').val();//网格经理
						polygon.busiManager = $('#mapForm select[name=busiManager]').val(); //营业负责人
						polygon.cdManager = $('#mapForm select[name=cdManager]').val();//CD政企客户经理
						polygon.heapManager = $('#mapForm select[name=heapManager]').val();//直销渠道经理
						polygon.directManager = $('#mapForm select[name=directManager]').val();//社会渠道经理
						polygon.direct_sale_user_info = $('#mapForm select[name=direct_sale_user_info]').val();//直销人员
/*						polygon.societyManager = $('#mapForm div[name=societyManager]').val();//装维
*/					
						polygon.mapColor = $('#mapForm input[name=color]').val("#995cb0");
						polygon.mapAddress = $('#mapForm input[name=address]').val();
						polygon.mapState = "edit";
						map.removeOverlay(overlays[0]);
	                	overlays.splice(0, 1);
	                	polygon.setFillColor("#995cb0");
	                	overlays.push(polygon);          
	                	map.addOverlay(polygon);
	                	polygon.addEventListener('click', editPolygon);
						
						$('#modal-map').modal('hide');
						messageAlert("保存成功！");
					}
				});
			}
		});
	  
	  Tipped.create("#imgSelMam_chosen", function(elm) {
			return createTippedFonts($(this.element));
	  }, {
			position : 'right',
			skin : 'purple',
			radius : true,
			size : 'large'
	  });
	  
	  $('#resetButton').bind('click',function(){
		  document.getElementById("mapForm").reset();
			$('#imgSelMam').val('');
			$("#imgSelMam").trigger('chosen:updated');
			$("#color").val('');
			$('#mapManager').val('');  //网格经理
			$("#mapManager").trigger('chosen:updated');
			$('#busiManager').val('');//营业部
			$("#busiManager").trigger('chosen:updated');
			$('#cdManager').val('');//cd
			$("#cdManager").trigger('chosen:updated');		
			$('#heapManager').val('');
			$("#heapManager").trigger('chosen:updated');
			$('#directManager').val('');
			$("#directManager").trigger('chosen:updated');
			$('#direct_sale_user_info').val('');
			$("#direct_sale_user_info").trigger('chosen:updated');
			$("#ul_id").empty();
			resetFontVal();
		});
	  
	  $("#modal-map").on("hidden.bs.modal", function() {
			$("#mapForm").data('bootstrapValidator').resetForm();
	  });
  }
  
  function resetFontVal(){
		$("#imgSelMam_chosen").remove();
		$("#imgSelMam").remove();
		$("#imgSelMamSpan").prepend(
			$("<select></select>")
			.addClass("chosen-select")
			.attr("id","imgSelMam")
			.attr("multiple","")
			.attr("data-placeholder","选择图标...")
			.attr("title","字体图标")
		);
		$("#imgSelMam").chosen({width: "100%",disable_search_threshold:7});
		Tipped.create("#imgSelMam_chosen", function(elm) {
			return createTippedFonts($(this.element));
		}, {
			position : 'right',
			skin : 'purple',
			radius : true,
			size : 'large'
		});
	}
	function createTippedFonts(elm){
		var ulObj=$("<ul></ul>").addClass("icon-ul");
		var faArrays=[
		  			"#2798ca",
		  			"#0eac91",
		  			"#72c7f3",
		  			"#1a6f9e",
		  			"#1fc069",
		  			"#995cb0",
		  			"#ef6e44",
		  			"#666666",
		  			"#cdcd66",
		  			"#20bead"
		  				];
		for(var index in faArrays){
			ulObj.append($("<li style='background:"+faArrays[index]+";width:40px;margin-right:5px;margin-bottom:5px'></li>").attr("onclick","setFontVal('"+faArrays[index]+"')"));
		}
		$(".tpd-content").slimscroll({
			height:"60px",
			alwaysVisible : true	
		});
		return $("<div><div>").append(ulObj).html();
	}
	function setFontVal(value){
		$("#color").val(value);
		$("#imgSelMam_chosen").empty();
		$("#imgSelMam_chosen").append(
			$("<ul></ul>").addClass("chosen-choices").append($("<li style='background:"+value
							+";width:30px;height:30px;border-radius:5px;margin:0 auto;'></li>").addClass("search-choice"))
		);
	}
	function resetFontVal(){
		$("#imgSelMam_chosen").remove();
		$("#imgSelMam").remove();
		$("#imgSelMamSpan").prepend(
			$("<select></select>")
			.addClass("chosen-select")
			.attr("id","imgSelMam")
			.attr("multiple","")
			.attr("data-placeholder","选择颜色...")
			.attr("title","图标颜色")
		);
		$("#imgSelMam").chosen({width: "100%",disable_search_threshold:7});
		Tipped.create("#imgSelMam_chosen", function(elm) {
			return createTippedFonts($(this.element));
		}, {
			position : 'right',
			skin : 'purple',
			radius : true,
			size : 'large'
		});
	}
	
	function messageAlert(message){
		bootbox.dialog({
	        message: "<span style=\"color:#000\">"+message+"</span>",
	        title: "消息提示",
	        buttons: {
	            OK: {
	                label: "确定",
	                className: "btn-success",
	            }
	        }
	    });
	}
	function initButton(){
		$("#addsocietyManager").click(function(){	
			$("#inputName").val("");
			$("#inputPhone").val("");
		})  // 弹出表单
			
			$("#confirm_btn").click(function(){	
				
				name  = $("#inputName").val()
				phone = $("#inputPhone").val()
				var m = $('<li class="search-choice pull-left"><span value='+num+'>'+name+"["+phone+"]"+' ， </span></li>');
				console.log("addbefor"+num);
				var liLength = $("#ul_id li").length
				var a = $('<a class="search-choice-close" data-option-array-index=\"'+(liLength+1)+'\"></a>');
				m.append(a);	
				arval = name+"-"+phone;
				creatArr[num]=arval;		
				$("#ul_id").append(m);		
				num++;
				console.log("addafter"+num);
				
				$(".search-choice-close").click(function(){	
					 var tm= $(this).parent();
					 var mm=tm.children("span").attr("value");
					 tm.remove();
					 creatArr.splice(mm, 1);
				 })	
			}) 
			
			
	}
	function createModel(){
		initGridSelect();   //获取个位置的下拉框的内容
		edit = 0;
		$('#modal-map .modal-title').empty();
		$('#modal-map .modal-title').append($('<i></i>').addClass("ace-icon fa fa-users")).append("网格信息保存");
		$('#modal-map').modal({
			backdrop : 'static',
			keyboard : false,
			show : true
		});	
		document.getElementById("mapForm").reset();
		$('#color').val('');
		$('#orgId').val('');	
		$('#userId').val('');//mapManager
		$('#busiId').val('');//
		$('#cdId').val('');
		$('#heapId').val('');
		$('#directId').val('');
		$('#direct_sale_user_infoId').val('');
		$('#societyId').val('');	
		$('#mapName').val('');
		$('#mapManager').val('');
		$("#mapManager").trigger('chosen:updated');
		$('#busiManager').val('');
		$("#busiManager").trigger('chosen:updated');
		$('#cdManager').val('');
		$("#cdManager").trigger('chosen:updated');
		$('#heapManager').val('');
		$("#heapManager").trigger('chosen:updated');
		$('#directManager').val('');
		$("#directManager").trigger('chosen:updated');
		$('#direct_sale_user_info').val('');
		$("#direct_sale_user_info").trigger('chosen:updated');
		/*$('#societyManager').val('');
		$("#societyManager").trigger('chosen:updated'); //$("#societyManager").trigger('chosen:updated'); 动态更新select下的选项*/
		$('#imgSelMam').val('');
		$("#imgSelMam").trigger('chosen:updated');
		$("#color").val('#995cb0');
		$('#mapType').val('1');
		
		$("#ul_id").val("");
		resetFontVal();
		
	}
	
	function editModel(){
		initGridSelect();   //清空数组
		 
		edit = 1;
		$('#modal-map .modal-title').empty();
		$('#modal-map .modal-title').append($('<i></i>').addClass("ace-icon fa fa-users")).append("网格保存");
		$('#modal-map').modal({
			backdrop : 'static',
			keyboard : false,
			show : true
		});	
		document.getElementById("mapForm").reset();
		$('#color').val(overlays[0].mapColor);
		$('#pid').val(nowOrgId);
		$('#address').val(JSON.stringify(overlays[0].getPath()));
		$('#orgId').val(overlays[0].orgId);
		$('#mapName').val(overlays[0].mapName);
		
		$.ajax({
			url : $.cxt + "/map/editUser",  //从sys 表中查找 initUserOne
			data : {orgId:overlays[0].orgId,userType:3},
			type: "POST",
			async : false,
			success : function(data) {
				var arr = new Array();
				var arrs = "";
				for(var i=0;i<data.length;i++){
				if(data[i]==""){return;};
				arr[i]=data[i].OA_ID;
				arrs +=data[i].OA_ID+","		
			}
				$('#mapManager').val(arr);
				$("#mapManager").trigger('chosen:updated');
				$('#userId').val(arrs);
			}
		});
		$.ajax({
			url : $.cxt + "/map/editUser", //y营业部 5 
			data : {orgId:overlays[0].orgId,userType:5},
			type: "POST",
			async : false,
			success : function(data) {
				var arr = new Array();
				var arrs = "";
				for(var i=0;i<data.length;i++){
				if(data[i]==""){return;};
				arr[i]=data[i].LOGIN_ID;
				arrs +=data[i].LOGIN_ID+","		
			}
				$('#busiManager').val(arr);
				$("#busiManager").trigger('chosen:updated');
				$('#busiId').val(arrs);
			}
			
		});
		$.ajax({
			url : $.cxt + "/map/editUser", //cd
			data : {orgId:overlays[0].orgId,userType:2},
			type: "POST",
			async : false,
			success : function(data) {
				var arr = new Array();
				var arrs = "";
				for(var i=0;i<data.length;i++){
				if(data[i]==""){return;};
				arr[i]=data[i].OA_ID;
				arrs +=data[i].OA_ID+","		
			}
				$('#cdManager').val(arr);
				$("#cdManager").trigger('chosen:updated');
				$('#cdId').val(arrs);
			}
		});
		$.ajax({
			url : $.cxt + "/map/editHeapDirect",  //直销经理
			data : {orgId:overlays[0].orgId,userType:4},
			type: "POST",
			async : false,
			success : function(data) {/*heapManager*/
				var arr = new Array();
				var arrs = "";
				for(var i=0;i<data.length;i++){
				if(data[i]==""){return;};
				arr[i]=data[i].OA_ID;
				arrs += data[i].OA_ID+","
			}
				$('#heapManager').val(arr);
				$("#heapManager").trigger('chosen:updated');
				$('#heapId').val(arrs);
			}
		});
		
		$.ajax({
			url : $.cxt + "/map/editHeapDirect",   //社会渠道经理
			data : {orgId:overlays[0].orgId,userType:1},
			type: "POST",/*directManager*/
			async : false,
			success : function(data) {
				var arr = new Array();
				var arrs = "";
				for(var i=0;i<data.length;i++){
				if(data[i]==""){return;};
				arr[i]=data[i].OA_ID;
				arrs +=data[i].OA_ID+","		
			}
				$('#directManager').val(arr);
				$("#directManager").trigger('chosen:updated');
				$('#directId').val(arrs);
			}
		});
		$.ajax({
		url : $.cxt + "/map/edit_sale_user",   //直销人员
		data : {areaid:nowOrgId,orgId:overlays[0].orgId,userType:6},
		type: "POST",
		async : false,
		success : function(data) {
			var arr = new Array();
			var arrs = "";
			var html="";
			for(var i=0;i<data.length;i++){
			if(data[i]==""){return;};
			arr[i]=data[i].UID;		
			arrs +=data[i].UID+","
			var temp = data[i];
			html += "<option value=\"" + temp.UID + "\">" + temp.USER_NAME+"["+temp.USER_NUMBER+"]"+ "</option>";
		}
			$('#direct_sale_user_info').append(html);
			$('#direct_sale_user_info').val(arr);
			$("#direct_sale_user_info").trigger('chosen:updated');
			$('#direct_sale_user_infoId').val(arrs);
		}
	});
		/***/
		$.ajax({
			url : $.cxt + "/map/editHeapDirect", 
			data : {orgId:overlays[0].orgId,userType:7},
			type: "POST",
			async : false,
			success : function(data) {
				for(var i=0;i<data.length;i++){//装维人员
					if(data[i]==""){return;};
					   name  =  data[i].NAME;
					   phone =  data[i].PHONE;
					var m = $('<li class="search-choice"><span value='+num+'>'+name+"["+phone+"]"+'</span></li>');
					var liLength = $("#ul_id li").length
					var a = $('<a class="search-choice-close" data-option-array-index=\"'+(liLength+1)+'\"></a>');
					m.append(a);
					arval = name+"-"+phone;
					creatArr[num]=arval;		
					$("#ul_id").append(m);		
					$(".search-choice-close").click(function(){	
						var tm= $(this).parent();
						var mm=tm.children("span").attr("value");
						tm.remove();
						creatArr.splice(mm, 1);
					})		
					num++;
					
			}
			}
		});
		$('#mapType').val(overlays[0].mapType);
		$("#mapType").trigger('chosen:updated');
		resetFontVal();
		setFontVal(overlays[0].mapColor);
	}
	
	function initGridSelect (){
		$("#ul_id").empty();
		creatArr=[];
		num=0 ;	
		$.ajax({
			url : $.cxt + "/map/initName",
			data : {orgId:nowOrgId},
			async : false,
			success : function(json) {
				var html = "";
				html = json[1].NAME+json[0].NAME;
				$("#Sname").html(html);
				}
		})
		//营业部负责人
		$.ajax({
			url : $.cxt + "/map/initBusi",//initUsers
			data : {userType:"5",orgId:nowOrgId},
			async : false,
			success : function(json) {
				var html ="<option value='mr'></option>";
				for(var i = 0; i < json.length; i++) {
					var temp = json[i]
					html += "<option value=\"" + temp.LOGIN_ID + "\">" + temp.USER_NAME+"["+temp.LOGIN_ID+"]"+ "</option>";
				}
				$("#busiManager").html(html);
			}
		})
		//CD政企客户经理
		$.ajax({
			url : $.cxt + "/map/initUser",
			async : false,
			data : {userType:"2",orgId:nowOrgId},
			success : function(json) {
				var html ="<option value='mr'></option>";
				for(var i = 0; i < json.length; i++) {
					var temp = json[i]
					html += "<option value=\"" + temp.OA_ID + "\">" + temp.USER_NAME+"["+temp.OA_ID+"]"+ "</option>";
				}
				$("#cdManager").html(html);
			}
		})
		//网格经理
		$.ajax({
			url : $.cxt + "/map/initUser",
			async : false,
			data : {userType:"3",orgId:nowOrgId},
			success : function(json) {
				var html ="<option value='mr'></option>";
				for(var i = 0; i < json.length; i++) {
					var temp = json[i]
					html += "<option value=\"" + temp.OA_ID + "\">" + temp.USER_NAME+"["+temp.OA_ID+"]"+ "</option>";
				}
				$("#mapManager").html(html);
			}
		})
	//直销渠道经理 （多选）
		
		$.ajax({
			url : $.cxt + "/map/initUser",
			async : false,
			data : {userType:"4",orgId:nowOrgId},
			success : function(json) {
				var html = "";
				for(var i = 0; i < json.length; i++) {
					var temp = json[i]
					html += "<option value=\"" + temp.OA_ID + "\">" + temp.USER_NAME+"["+temp.OA_ID+"]"+ "</option>";
				}
				$("#heapManager").html(html);
			}
		})
		//社会渠道经理
		$.ajax({
			url : $.cxt + "/map/initUser",
			async : false,
			data : {userType:"1",orgId:nowOrgId},
			success : function(json) {
				var html = "";
				for(var i = 0; i < json.length; i++) {
					var temp = json[i]
					
					html += "<option value=\"" + temp.OA_ID + "\">" + temp.USER_NAME+"["+temp.OA_ID+"]"+ "</option>";
				}
				$("#directManager").html(html);
			
			}
		})
		//直销人员
		$.ajax({
			url : $.cxt + "/map/initsale_user", //从直销人员表//i
			async : false,
			data : {userType:"6",orgId:nowOrgId},
			success : function(json) {
				var html = "";
				for(var i = 0; i < json.length; i++) {
					var temp = json[i]
					
					html += "<option value=\"" + temp.UID + "\">" + temp.USER_NAME+"["+temp.USER_NUMBER+"]"+ "</option>";
				}
				$("#direct_sale_user_info").html(html);
			
			}
		})
	
			
		var reloadJqGrid = function(flag) {
		if(flag == undefined) {
			//新增和修改的时候清空查询条件
			topclear('gridSearch')
		}
		$("#grid-table").jqGrid('setGridParam',{    
	        postData : topgetObjByObj($("#gridSearch .searchField")),  
	        page : 1    
	    }).trigger("reloadGrid"); 
		}
		   
		
		$.ajax({
			url : $.cxt + "/map/initType",
			async : false, 
			type: "POST",
			success : function(json) {
				var html="";
				for(var i = 0; i < json.length; i++) {
					var temp = json[i]
					html += "<option value=\"" + temp.TYPE_ID + "\" color=\"" + temp.COLOR + "\">" + temp.TYPE_NAME + "</option>";
				}
				$("#mapType").html(html);
			}
		})
		//弹出框
		
		
		
		$(".chosen-select").chosen();
		$(window)
		.off('resize.chosen')
		.on('resize.chosen', function() {
			$('.chosen-select').each(function() {
				 var $this = $(this);
				 $this.next().css({'width': $this.parent().width()});
			})
		}).trigger('resize.chosen');
		
		
		$.ajax({
			url : $.cxt + "/map/initData",
			data : {maxLng:overlays[0].getBounds().getNorthEast().lng,
					maxLat:overlays[0].getBounds().getNorthEast().lat,
					minLng:overlays[0].getBounds().getSouthWest().lng,
					minLat:overlays[0].getBounds().getSouthWest().lat,
					sharp:JSON.stringify(overlays[0].getPath()),
					orgId:nowOrgId},
			async : false,
			type: "POST",
			success : function(json) {
				dayCost		=json.dayCost;
				customCost	=json.customCost;
				villageCost	=json.villageCost;
				groupCost	=json.groupCost;
				channelCost	=json.channelCost;
				stationCost	=json.dayCost;
				
				$('#dayCost').html(json.dayCost);   //收入规模
				$('#customCost').html( json.customCost);//客户规模
				$('#villageCost').html(json.villageCost);//小区规模
				$('#groupCost').html(json.groupCost);//集团规模
				$('#channelCost').html(json.channelCost);//渠道规模
				$('#stationCost').html(json.stationCost);  //基站规模
				
				 poiList = json.poiList;
				 channelList = json.channelList;
				 stationList = json.stationList;
				
				var dayCostList = [];
				for(var i=0,n=channelList.length;i<n;i++){
					dayCostList.push(channelList[i]);
				}
				for(var i=0,n=stationList.length;i<n;i++){
					dayCostList.push(stationList[i]);
				}
				$('#dayCost').unbind("click");
					$('#dayCost').click(function(){
						topwindow.showWindow({
							   title : '收入规模',
							   data:{uids:dayCostList.join(",")},
								url : $.cxt + "/pages/gis/indexPage/dayCost.jsp",
								/*bottons : [{
									title : "关闭" ,
									fun : function() {
										topwindow.removeWindow();
									}
								}] */
						   })
					})
				$('#customCost').unbind("click");
				$('#customCost').click(function(){
					topwindow.showWindow({
						   title : '客户规模',
						   data:{uids:poiList.join(",")},
							url : $.cxt + "/pages/gis/indexPage/customCost.jsp",
							/*bottons : [{
								title : "关闭" ,
								fun : function() {
									topwindow.removeWindow();
								}
							}] */
					   })
					
				})  
					$('#villageCost').unbind("click");
			 		$('#villageCost').click(function(){
					topwindow.showWindow({
						   title : '小区规模',
						   data:{uids:poiList.join(",")},
							url : $.cxt + "/pages/gis/indexPage/villageCost.jsp",
							/*bottons : [{
								title : "关闭" ,
								fun : function() {
									topwindow.removeWindow();
								}
							}] */
					   })
					
				})
				$('#groupCost').unbind("click");
				$('#groupCost').click(function(){
					topwindow.showWindow({
						   title : '集团规模',
						   data:{uids:poiList.join(",")},
							url : $.cxt + "/pages/gis/indexPage/groupCost.jsp",
							/*bottons : [{
								title : "关闭" ,
								fun : function() {
									topwindow.removeWindow();
								}
							}] */
					   })
					
				}) 	
				$('#channelCost').unbind("click");
		        $('#channelCost').click(function(){
					topwindow.showWindow({
						   title : '渠道规模',
						   data:{uids:channelList.join(",")},
							url : $.cxt + "/pages/gis/indexPage/channelCost.jsp",
							/*bottons : [{
								title : "关闭" ,
								fun : function() {
									topwindow.removeWindow();
								}
							}] */
					   })
				}) 
				$('#stationCost').unbind("click");
		        $('#stationCost').click(function(){
					topwindow.showWindow({
						   title : '基站规模',
						   data:{uids:channelList.join(",")},
							url : $.cxt + "/pages/gis/indexPage/stationCost.jsp",
							/*bottons : [{
								title : "关闭" ,
								fun : function() {
									topwindow.removeWindow();
								}
							}] */
					   })
				}) 
				
			}
		})
	}

  