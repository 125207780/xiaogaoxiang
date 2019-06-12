

$(function(){
	initSeletOrg();//初始化机构下拉框
//	changeSelectOrg();//选中机构下拉框
	initDate();//初始化日期组件
	initTypeLevel();//初始化123级分类
	initKpiIndex();//初始化指标名称
	initCountPeriod();//初始化统计周期
	//滚动条相关
	niceScrollAll();
	//地图相关
	$("#smallMap").append("<div id='smallMap_main' style='width:100%;height:100%'></div>")
	var showMaxBtn = $('<span style="display:none;top:-4px;font-size:15px;cursor:pointer;position: absolute;z-index:10;right:10px;" class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>');
	$("#smallMap").append(showMaxBtn);
	showMaxBtn.show();
	
	initEmap($(".orgId").val());
	clickRanking();
//	getTopFive($(".orgId").val())
	$("#screenButton").click(function(){
		topwindow.showWindow({
			   title : '筛选列表',
			   data:{},
				url : $.cxt + "/pages/jsp/kpi/kpiScreen.jsp",
				bottons : [{
					title : "确定" ,
					fun : function() {
						var type1 = $("#typeLevel1").find("option:selected").val();
						var type2 = $("#typeLevel2").find("option:selected").val();
						var type3 = $("#typeLevel3").find("option:selected").val();
						$("#typeLevel1").val(type1);
						$("#typeLevel2").val(type2);
						$("#typeLevel3").val(type3);
						
						$(".kpiScreenCheck input[type='checkbox']:checked").each(function(){
							var listValue = $(this).attr('id')
							var listType = $(this).next().text()
							$(".kpi-addKpi .kpi-select .kpiSelect").each(function(index,element){
								var screenId = $(element).attr('id')
								if(screenId != 'typeLevel1' && screenId != 'typeLevel2' && screenId != 'typeLevel3'){
									if(screenId == listValue){
										$(element).parent().remove();
									}
								}
								
							})
							$(".kpi-addKpi").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+listType+'：'+"</span>")
								).append(
										$("<select><select>").addClass("kpiSelect").attr('id',listValue)
								).append(
										$("<i><i>").addClass("glyphicon glyphicon-remove").attr('id',listValue).attr('onclick','deleteScreen(this)')
								)
							)
							$.ajax({
								url : $.cxt + "/kpi/getKpiScreen", 
								type: "POST",
								data:{listValue:listValue}, 
								success : function(data) {
									var json = JSON.parse(data);
									if(json.code == '0'){
										for(var i=0;i<json.data.length;i++){
											if(json.data[i].screenValue != null && json.data[i].screenValue != '' && json.data[i].screenValue != undefined){
												$('#'+listValue).append(
															$("<option>"+json.data[i].screenValue+"</option>").attr('id',json.data[i].screenCode)
												)	
											}
										}
									}
									
								}
								
							})
						})
						topwindow.removeWindow();
						$('.kpi-index').scrollTop(/*$('.kpi-index')[0].scrollHeight*/100);
					}
				}] 
		   })
	})
	$("#addButton").click(function(){
		topwindow.showWindow({
			   title : '指标添加',
			   data:{},
				url : $.cxt + "/pages/jsp/kpi/addKpi.jsp",
				bottons : [{
					title : "确定" ,
					fun : function() {
						var addNum = 0;
						var length = 0;
						$(".addKpi-list").each(function(indexS,elementS){
							var kpiCodeS = $(elementS).children().attr('name')
							var kpiCodeSName = $(elementS).children().text()
							if($(elementS).children().css('color') == 'rgb(255, 0, 0)'){
								$(".kpiNameDiv").each(function(indexH,elementH){
									var kpiCodeH = $(elementH).children('.glyphicon-remove').attr('id')
									if(kpiCodeH == kpiCodeS){
										affterDeleteAddKpi($(elementH).children('.glyphicon-remove'));
									}else{
										
									}
								})
								
								$(".kpiName-content").append(
										$("<div></div>").addClass("kpiNameDiv").append(
												$("<span>"+kpiCodeSName+"</span>")
										).append(
												$("<i></i>").addClass("glyphicon glyphicon-remove").attr('id',kpiCodeS).attr('onclick','deleteKpi(this)')
										)
								)
								$(".middle-input").append(
										$("<div></div>").addClass("inputNameMiddle").append(
												$("<span>"+kpiCodeSName+"</span>").attr('id',kpiCodeS).attr('onclick','clickKpi(this)')/*.css("color",'red').css("font-weight",'bold')*/
										).append(
												$("<input />").css('display','none').attr('type','checkbox').attr('id',kpiCodeS)
										)
								)
//								$(".right-input").append(
//										$("<div></div>").addClass("inputName").append(
//												$("<span>"+kpiCodeSName+"</span>")
//										).append(
//												$("<i></i>").addClass("glyphicon glyphicon-remove").attr('id',kpiCodeS).attr('onclick','deleteKpiRight(this)')
//										)
//								)
								
							}

						})
						
						//删除不在筛选条件中的指标
						$(".kpiNameDiv").each(function(indexH2,elementH2){
							var index = 0;
							var kpiCodeH2 = $(elementH2).children('.glyphicon-remove').attr('id')
							$(".addKpi-list").each(function(indexS2,elementS2){
								var kpiCodeS2 = $(elementS2).children().attr('name')
								if(kpiCodeH2 == kpiCodeS2){
									index++;
								}
							})
							if(index == 0){
								affterDeleteAddKpi($(elementH2).children('.glyphicon-remove'));
							}
						})
						
						if($(".kpiNameDiv").length == 0){
							$(".addKpiCheck .addKpi-name").each(function(){
								if($(this).css('color') == 'rgb(255, 0, 0)'){
									var kpiCode = $(this).attr('name')
									var kpiName = $(this).text()
									$(".kpiName-content").append(
										$("<div></div>").addClass("kpiNameDiv").append(
												$("<span>"+kpiName+"</span>")
										).append(
												$("<i></i>").addClass("glyphicon glyphicon-remove").attr('id',kpiCode).attr('onclick','deleteKpi(this)')
										)
									)
									$(".middle-input").append(
											$("<div></div>").addClass("inputNameMiddle").append(
													$("<span>"+kpiName+"</span>").attr('id',kpiCode).attr('onclick','clickKpi(this)')
											).append(
													$("<input />").css('display','none').attr('type','checkbox').attr('id',kpiCode)
											)
									)
//									$(".right-input").append(
//											$("<div></div>").addClass("inputName").append(
//													$("<span>"+kpiName+"</span>")
//											).append(
//													$("<i></i>").addClass("glyphicon glyphicon-remove").attr('id',kpiCode).attr('onclick','deleteKpiRight(this)')
//											)
//									)
								}
							})
						}
						initResultMsg(null,'addKpi');
						addKpiDefaultColor();
						if(lineOrBar == 'bar'){
							rankingBar(echartsPublicOrgId)
						}else{
							doubleLine(echartsPublicOrgId)
						}
						topwindow.removeWindow();
					}
				}] 
		   })
	})
	
	//指标添加（右边）
	$("#addButtonRight").click(function(){
		topwindow.showWindow({
			   title : '指标添加',
			   data:{},
				url : $.cxt + "/pages/jsp/kpi/addKpi.jsp",
				bottons : [{
					title : "确定" ,
					fun : function() {
						var kpiNum = 0
						var havKpiNum = $('.inputName').length
						var kpiColorNum = 0
						var kpiR = 0
						$(".addKpi-list").each(function(i1,e1){
							var kpiCodeS1 = $(e1).children().attr('name')
							if($(e1).children().css('color') == 'rgb(255, 0, 0)'){
								kpiColorNum++
								$(".inputName").each(function(i2,e2){
									var kpiCodeH1 = $(e2).children('.glyphicon-remove').attr('id')
									if(kpiCodeH1 == kpiCodeS1){
										kpiR++
									}else{
										
									}
								})
							}
						})
						kpiNum = (havKpiNum + kpiColorNum) - kpiR
						if(kpiNum<=5){
							var addNum = 0;
							var length = 0;
							$(".addKpi-list").each(function(indexS,elementS){
								var kpiCodeS = $(elementS).children().attr('name')
								var kpiCodeSName = $(elementS).children().text()
								if($(elementS).children().css('color') == 'rgb(255, 0, 0)'){
									$(".inputName").each(function(indexH,elementH){
										var kpiCodeH = $(elementH).children('.glyphicon-remove').attr('id')
										if(kpiCodeH == kpiCodeS){
											deleteKpiRight($(elementH).children('.glyphicon-remove'));
										}else{
											
										}
									})
									if($(".inputName").length < 5){
										$(".right-input").append(
												$("<div></div>").addClass("inputName").append(
														$("<span>"+kpiCodeSName+"</span>").attr('onclick','clickKpiRight(this)')
												).append(
														$("<i></i>").addClass("glyphicon glyphicon-remove").attr('id',kpiCodeS).attr('onclick','deleteKpiRight(this)')
												)
										)
									}
									
								}
	
							})
							
							//删除不在筛选条件中的指标
							$(".inputName").each(function(indexH2,elementH2){
								var index = 0;
								var kpiCodeH2 = $(elementH2).children('.glyphicon-remove').attr('id')
								$(".addKpi-list").each(function(indexS2,elementS2){
									var kpiCodeS2 = $(elementS2).children().attr('name')
									if(kpiCodeH2 == kpiCodeS2){
										index++;
									}
								})
								if(index == 0){
									deleteKpiRight($(elementH2).children('.glyphicon-remove'));
								}
							})
							
							if($(".inputName").length == 0){
								$(".addKpiCheck .addKpi-name").each(function(){
									if($(this).css('color') == 'rgb(255, 0, 0)'){
										var kpiCode = $(this).attr('name')
										var kpiName = $(this).text()
										if($(".inputName").length < 5){
											$(".right-input").append(
													$("<div></div>").addClass("inputName").append(
															$("<span>"+kpiCodeSName+"</span>").attr('onclick','clickKpiRight(this)')
													).append(
															$("<i></i>").addClass("glyphicon glyphicon-remove").attr('id',kpiCodeS).attr('onclick','deleteKpiRight(this)')
													)
											)
										}
									}
								})
							}
							if(lineOrBar == 'bar'){
								rankingBar(echartsPublicOrgId)
							}else{
								doubleLine(echartsPublicOrgId)
							}
							addKpiDefaultColorRight();
							topwindow.removeWindow();
						}else{
							messageConfirm('所查看的总指标数不能超过5个！')
						}
					}
				}] 
		   })
	})
	//窗口缩放
	$(".glyphicon-fullscreen").click(function(){
		 topwindow.showHtmlWindow($(".openMap"),{
			 width:700,
			 height:400,
			 title:"信息展示",
			 closeBtnFun:function(){
				 $(".middle-map").append($(".openMap"));
				 $(".glyphicon-fullscreen").show();
				 $("#piecesBtns").css('width','18%');
				 mapObj.resize(); 
//				 if("BMap"==mapObj.objType){
//					 mapObj.getModel().getComponent('bmap').getBMap().reset();
//				 }
			 },
			 fun:function(){
				 $(".glyphicon-fullscreen").hide();
				 $("#piecesBtns").css('width','30%');
				 mapObj.resize();
//				 if("BMap"==mapObj.objType){
//					 var zoom = mapObj.getModel().getComponent('bmap').getBMap().getZoom()
//					 window.setTimeout(mapObj.getModel().getComponent('bmap').getBMap().setZoom(zoom) ,10000);
//				 }
			 }
			 
		 });
	})
	
})
var publicOrgId = '';
var mapObj=null;
var unSelectColor = "#999999";
var initEmap = function(orgId){
	var  emap = showEmap(orgId,"smallMap_main",callBack);
	function callBack(_orgId,orgLevel){
		 if(orgLevel=="4"){//当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
			 $("#gridAllMiddle").val(_orgId)
		   }else{
			   mapObj=this.next();
			   if(orgLevel == '1'){
				   $("#cityCompanyMiddle").val('请选择...')
				   $("#areaCompanyMiddle").val('请选择...')
				   $("#gridAllMiddle").val('请选择...')
			   }else if(orgLevel == '2'){
				   $("#cityCompanyMiddle").val(_orgId)
				   $("#areaCompanyMiddle").val('请选择...')
				   $("#gridAllMiddle").val('请选择...')
			   }else if(orgLevel == '3'){
				   $("#areaCompanyMiddle").val(_orgId)
				   $("#gridAllMiddle").val('请选择...')
			   }
		   }
		 getTopFive(_orgId)
		 publicOrgId = _orgId;
	}
	
}

var pieces =[];
var kpiDataList = [];
var getTopFive = function(orgId){
	
	var kpiCode = '';
	var kpiName = '';
	$(".inputNameMiddle span").each(function(){
		if($(this).css('color') == 'rgb(255, 0, 0)'){
			kpiCode = $(this).attr('id')
			kpiName = $(this).text()
		}
	})
	var accountName = $("#countPeriod").find("option:selected").val();
	var accountValue = $("#AccountPeriod").val();
	$.ajax({
		url : $.cxt + "/kpi/getTopFive", 
		type: "POST",
		data:{
			orgId:orgId,
			kpiCode:kpiCode,
			accountName:accountName,
			accountValue:accountValue
		}, 
		async : false,
		success : function(data) {
			var json = JSON.parse(data);
			if(json.code == '0'){
				kpiDataList = json.data
				pieces = []
				pieces.push({
					color :'#6d4568',
					label:'NO.5 '+json.data[4].ORGNAME+' '+json.data[4].TOP,
					selected:true,
					lte:0,
					gte:0
				})
				pieces.push({
					color :'#96418c',
					label:'NO.4 '+json.data[3].ORGNAME+' '+json.data[3].TOP,
					selected:true,
					lte:1,
					gte:1
				})
				pieces.push({
					color :'#b331a3',
					label:'NO.3 '+json.data[2].ORGNAME+' '+json.data[2].TOP,
					selected:true,
					lte:2,
					gte:2
				})
				pieces.push({
					color :'#d41ebe',
					label:'NO.2 '+json.data[1].ORGNAME+' '+json.data[1].TOP,
					selected:true,
					lte:3,
					gte:3
				})
				pieces.push({
					color :'#f904db',
					label:'NO.1 '+json.data[0].ORGNAME+' '+json.data[0].TOP,
					selected:true,
					lte:4,
					gte:4
				})
				
			}
		}
	})
	
	//初始化范围块
	$("#piecesBtns").empty();
	for(var i=0,n=pieces.length;i<n;i++){
		pieces[i].selected=true;
		var btn = $("<span class='sbtn' id='sbtn_"+i+"'><div>&nbsp;</div>"+pieces[i].label+" </span>");
		btn.children(0).css("background-color",pieces[i].color);
		btn.click(function(){
			if(this){
				var selIndex = parseInt($(btn)[0].id.substr(5));
				pieces[selIndex].selected = !pieces[selIndex].selected;
			}
			var selected = {};
			for(var i =0,n=pieces.length;i<n;i++){
				selected[i]= pieces[i].selected;
			}
//			mapObj.dispatchAction({
//			    type: 'selectDataRange',
//			    selected:selected
//			});
		})
	}
	
	if(mapObj.objType=="Echarts"){
		var option = mapObj.getOption();
		option.tooltip = 
		{
		    trigger: 'item',
		    formatter: function (params) {
		      if(typeof(params.data.top5) == 'undefined'){
		      	  return params.name + ' : ' + '无数据';
		      }else{
		    	  return params.name + ' : ' + params.data.top5[2];
		      }
		    }
		};
		option.visualMap={}
		option.visualMap={
//				type:'piecewise',
				textStyle:{color:"gold"},
				pieces : pieces,
				outOfRange:{color:[unSelectColor]},  //不选中的时候底色
				show:true,
				seriesIndex: [0],  //只对地图生效，0 对应 地图的 index
		}
		var data = [];
		var mapId= mapObj.mapId;
		var cityList = echarts.getMap(mapId).geoJson.features;
		for(var i=0,k=cityList.length;i<k;i++){
			var tmpObj=cityList[i].properties;
			for(var j=0;j<kpiDataList.length;j++){
				if(tmpObj.id==kpiDataList[j].ORGID){
					if(j==0){
						data.push({
							"name":tmpObj.name,
							"value":tmpObj.cp.concat(4),
							"top5" :tmpObj.cp.concat(kpiDataList[j].TOP)
						})
					}else if(j==1){
						data.push({
							"name":tmpObj.name,
							"value":tmpObj.cp.concat(3),
							"top5" :tmpObj.cp.concat(kpiDataList[j].TOP)
						})
					}else if(j==2){
						data.push({
							"name":tmpObj.name,
							"value":tmpObj.cp.concat(2),
							"top5" :tmpObj.cp.concat(kpiDataList[j].TOP)
						})
					}else if(j==3){
						data.push({
							"name":tmpObj.name,
							"value":tmpObj.cp.concat(1),
							"top5" :tmpObj.cp.concat(kpiDataList[j].TOP)
						})
					}else if(j==4){
						data.push({
							"name":tmpObj.name,
							"value":tmpObj.cp.concat(0),
							"top5" :tmpObj.cp.concat(kpiDataList[j].TOP)
						})
					}
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
		
	  }else{
		  
	  	var option = mapObj.getOption();
		var mapId= mapObj.mapId;
		var cityList = echarts.getMap(mapId).geoJson.features;
		var data = [];
	 
		for(var i=0,n=kpiDataList.length;i<n;i++){
			var kpi = kpiDataList[i].TOP;
			var orgId= kpiDataList[i].ORGID;
			 
			for(var j=0,k=cityList.length;j<k;j++){
				var tmpObj=cityList[j].properties;
				if(tmpObj.id==orgId){
					if(i==0){
						data.push({
							"name":tmpObj.name,
							"value":tmpObj.cp.concat(4),
							"top5" :tmpObj.cp.concat(kpi)
						})
					}else if(i==1){
						data.push({
							"name":tmpObj.name,
							"value":tmpObj.cp.concat(3),
							"top5" :tmpObj.cp.concat(kpi)
						})
					}else if(i==2){
						data.push({
							"name":tmpObj.name,
							"value":tmpObj.cp.concat(2),
							"top5" :tmpObj.cp.concat(kpi)
						})
					}else if(i==3){
						data.push({
							"name":tmpObj.name,
							"value":tmpObj.cp.concat(1),
							"top5" :tmpObj.cp.concat(kpi)
						})
					}else if(i==4){
						data.push({
							"name":tmpObj.name,
							"value":tmpObj.cp.concat(0),
							"top5" :tmpObj.cp.concat(kpi)
						})
					}
				 break;
				}
			}
		}
		option.tooltip = 
		  {
          trigger: 'item',
          formatter: function (params) {
            if(typeof(params.data.top5) == "undefined"){
            	return params.name + ' : ' + '无数据';
            }else{
            	return params.name + ' : ' + params.data.top5[2];
            }
          }
		};
		option.visualMap={
				textStyle:{color:"#00F"},
				pieces : pieces,
				outOfRange:{color:[unSelectColor]},  //不选中的时候底色
				show:true,
				right:20,
				bottom: 20,
				align:'left'
//				seriesIndex: [0],  //只对地图生效，0 对应 地图的 index
		}
		mapObj.setOption(option);
		changeMapGridColor();
		mapObj.off('datarangeselected');
		mapObj.on('datarangeselected', function (params) {
			for(var i=0,n=pieces.length;i<n;i++){
		    	pieces[i].selected = params.selected[i];
		    }
		    changeMapGridColor();
		});
		
	  }
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
		var k=""
		if(i==0){
			k=4
		}else if(i==1){
			k=3
		}else if(i==2){
			k=2
		}else if(i==3){
			k=1
		}else if(i==4){
			k=0
		}
//		var k = kpiDataList[i].TOP;
		var id =  kpiDataList[i].ORGID;
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

var radioSwitch = function(){
	$("input[type='radio']").click(function(){
	   var radioId = $(this).attr('id');
	   $("input[type='radio']").each(function(index,element){
		   var radio_id = $(element).attr('id');
		   if(radioId == radio_id){
			   $(option).attr('checked','checked');
		   }else{
			   $(element).attr('checked',false);
		   }
	   })
	})
}

var initResultMsg = function(orgLevel,selectId){
	var colNames = [];
	var colModel = [];
	var accountPeriod = $('#AccountPeriod').val();
	var wherePram = '{';
	var orgId = $(".orgId").val();
	if(selectId == null){
		$(".kpiSelect").each(function(index){
			var orgName = $(this).prev().text()
			var id = $(this).attr('id');
			var code = $(this).find("option:selected").attr('id');
			var value = $(this).find('option:selected').text();
			if(orgLevel == '1'){
				if(id == 'cityCompany'){
					wherePram += '\"'+'cityCode'+'\":\"'+code+'\",'
					colNames.push('城市公司')
					colModel.push({
						name : 'CITY_NAME',
						align : 'center'
					})
				}else if(id == 'areaCompany'){
					wherePram += '\"'+'areaCode'+'\":\"'+code+'\",'
					colNames.push('区县')
					colModel.push({
						name : 'AREA_NAME',
						align : 'center'
					})
				}else if(id == 'saleDept'){
					wherePram += '\"'+'saleDeptCode'+'\":\"'+code+'\",'
					colNames.push('营业部')
					colModel.push({
						name : 'SALE_DEPT_NAME',
						align : 'center'
					})
				}else if(id == 'gridAll'){
					wherePram += '\"'+'gridCode'+'\":\"'+code+'\",'
					colNames.push('网格')
					colModel.push({
						name : 'GRID_NAME',
						align : 'center'
					})
				}else if(id == 'village'){
					wherePram += '\"'+'villageId'+'\":\"'+code+'\",'
					colNames.push('乡镇/街道')
					colModel.push({
						name : 'VILLAGE_NAME',
						align : 'center'
					})
				}else if(id == 'community'){
					wherePram += '\"'+'communityId'+'\":\"'+code+'\",'
					colNames.push('村/社区')
					colModel.push({
						name : 'COMMUNITY_NAME',
						align : 'center'
					})
				}else if(id == 'chnlorstation'){
					wherePram += '\"'+'chnlorstationId'+'\":\"'+code+'\",'
					colNames.push('渠道/基站')
					colModel.push({
						name : 'CHNLORSTATION_NAME',
						align : 'center'
					})
				}
			}else if(orgLevel == '2'){
				if(id == 'cityCompany'){
					wherePram += '\"'+'cityCode'+'\":\"'+code+'\",'
					colNames.push('城市公司')
					colModel.push({
						name : 'CITY_NAME',
						align : 'center'
					})
				}
			}else if(orgLevel == '3'){
				if(id == 'cityCompany'){
					wherePram += '\"'+'cityCode'+'\":\"'+code+'\",'
					colNames.push('城市公司')
					colModel.push({
						name : 'CITY_NAME',
						align : 'center'
					})
				}else if(id == 'areaCompany'){
					wherePram += '\"'+'areaCode'+'\":\"'+code+'\",'
					colNames.push('区县')
					colModel.push({
						name : 'AREA_NAME',
						align : 'center'
					})
				}
			}else if(orgLevel == '4'){
				if(id == 'cityCompany'){
					wherePram += '\"'+'cityCode'+'\":\"'+code+'\",'
					colNames.push('城市公司')
					colModel.push({
						name : 'CITY_NAME',
						align : 'center'
					})
				}else if(id == 'areaCompany'){
					wherePram += '\"'+'areaCode'+'\":\"'+code+'\",'
					if($("#areaCompany").find("option:selected").attr('id') != undefined){
						colNames.push('区县')
						colModel.push({
							name : 'AREA_NAME',
							align : 'center'
						})
					}
				}else if(id == 'saleDept'){
					wherePram += '\"'+'saleDeptCode'+'\":\"'+code+'\",'
					if($("#saleDept").find("option:selected").attr('id') != undefined){
						colNames.push('营业部')
						colModel.push({
							name : 'SALE_DEPT_NAME',
							align : 'center'
						})
					}
				}
				else if(id == 'gridAll'){
					wherePram += '\"'+'gridCode'+'\":\"'+code+'\",'
					colNames.push('网格')
					colModel.push({
						name : 'GRID_NAME',
						align : 'center'
					})
				}
			}else if(orgLevel == '5'){
				if(id == 'cityCompany'){
					wherePram += '\"'+'cityCode'+'\":\"'+code+'\",'
					colNames.push('城市公司')
					colModel.push({
						name : 'CITY_NAME',
						align : 'center'
					})
				}else if(id == 'areaCompany'){
					wherePram += '\"'+'areaCode'+'\":\"'+code+'\",'
					if($("#areaCompany").find("option:selected").attr('id') != undefined){
						colNames.push('区县')
						colModel.push({
							name : 'AREA_NAME',
							align : 'center'
						})
					}
				}else if(id == 'saleDept'){
					wherePram += '\"'+'saleDeptCode'+'\":\"'+code+'\",'
					colNames.push('营业部')
					colModel.push({
						name : 'SALE_DEPT_NAME',
						align : 'center'
					})
				}
			}else if(orgLevel == '6'){
				if(id == 'cityCompany'){
					wherePram += '\"'+'cityCode'+'\":\"'+code+'\",'
					colNames.push('城市公司')
					colModel.push({
						name : 'CITY_NAME',
						align : 'center'
					})
				}else if(id == 'areaCompany'){
					wherePram += '\"'+'areaCode'+'\":\"'+code+'\",'
					if($("#areaCompany").find("option:selected").attr('id') != undefined){
						colNames.push('区县')
						colModel.push({
							name : 'AREA_NAME',
							align : 'center'
						})
					}
				}else if(id == 'saleDept'){
					wherePram += '\"'+'saleDeptCode'+'\":\"'+code+'\",'
					if($("#saleDept").find("option:selected").attr('id') != undefined){
						colNames.push('营业部')
						colModel.push({
							name : 'SALE_DEPT_NAME',
							align : 'center'
						})
					}
				}
				else if(id == 'gridAll'){
					wherePram += '\"'+'gridCode'+'\":\"'+code+'\",'
					if($("#gridAll").find("option:selected").attr('id') != undefined){
						colNames.push('网格')
						colModel.push({
							name : 'GRID_NAME',
							align : 'center'
						})
					}
				}else if(id == 'village'){
					wherePram += '\"'+'villageId'+'\":\"'+code+'\",'
					colNames.push('乡镇/街道')
					colModel.push({
						name : 'VILLAGE_NAME',
						align : 'center'
					})
				}
			}else if(orgLevel == '7'){
				if(id == 'cityCompany'){
					wherePram += '\"'+'cityCode'+'\":\"'+code+'\",'
					colNames.push('城市公司')
					colModel.push({
						name : 'CITY_NAME',
						align : 'center'
					})
				}else if(id == 'areaCompany'){
					wherePram += '\"'+'areaCode'+'\":\"'+code+'\",'
					if($("#areaCompany").find("option:selected").attr('id') != undefined){
						colNames.push('区县')
						colModel.push({
							name : 'AREA_NAME',
							align : 'center'
						})
					}
				}else if(id == 'saleDept'){
					wherePram += '\"'+'saleDeptCode'+'\":\"'+code+'\",'
					if($("#saleDept").find("option:selected").attr('id') != undefined){
						colNames.push('营业部')
						colModel.push({
							name : 'SALE_DEPT_NAME',
							align : 'center'
						})
					}
				}
				else if(id == 'gridAll'){
					wherePram += '\"'+'gridCode'+'\":\"'+code+'\",'
					if($("#gridAll").find("option:selected").attr('id') != undefined){
						colNames.push('网格')
						colModel.push({
							name : 'GRID_NAME',
							align : 'center'
						})
					}
				}else if(id == 'village'){
					wherePram += '\"'+'villageId'+'\":\"'+code+'\",'
					if($("#village").find("option:selected").attr('id') != undefined){
						colNames.push('乡镇/街道')
						colModel.push({
							name : 'VILLAGE_NAME',
							align : 'center'
						})
					}
				}else if(id == 'community'){
					wherePram += '\"'+'communityId'+'\":\"'+code+'\",'
					colNames.push('村/社区')
					colModel.push({
						name : 'COMMUNITY_NAME',
						align : 'center'
					})
				}
			}else if(orgLevel == '8'){
				if(id == 'cityCompany'){
					wherePram += '\"'+'cityCode'+'\":\"'+code+'\",'
					colNames.push('城市公司')
					colModel.push({
						name : 'CITY_NAME',
						align : 'center'
					})
				}else if(id == 'areaCompany'){
					wherePram += '\"'+'areaCode'+'\":\"'+code+'\",'
					if($("#areaCompany").find("option:selected").attr('id') != undefined){
						colNames.push('区县')
						colModel.push({
							name : 'AREA_NAME',
							align : 'center'
						})
					}
				}else if(id == 'saleDept'){
					wherePram += '\"'+'saleDeptCode'+'\":\"'+code+'\",'
					if($("#saleDept").find("option:selected").attr('id') != undefined){
						colNames.push('营业部')
						colModel.push({
							name : 'SALE_DEPT_NAME',
							align : 'center'
						})
					}
				}
				else if(id == 'gridAll'){
					wherePram += '\"'+'gridCode'+'\":\"'+code+'\",'
					if($("#gridAll").find("option:selected").attr('id') != undefined){
						colNames.push('网格')
						colModel.push({
							name : 'GRID_NAME',
							align : 'center'
						})
					}
				}else if(id == 'village'){
					wherePram += '\"'+'villageId'+'\":\"'+code+'\",'
					if($("#village").find("option:selected").attr('id') != undefined){
						colNames.push('乡镇/街道')
						colModel.push({
							name : 'VILLAGE_NAME',
							align : 'center'
						})
					}
				}else if(id == 'community'){
					wherePram += '\"'+'communityId'+'\":\"'+code+'\",'
					if($("#community").find("option:selected").attr('id') != undefined){
						colNames.push('村/社区')
						colModel.push({
							name : 'COMMUNITY_NAME',
							align : 'center'
						})
					}
				}else if(id == 'chnlorstation'){
					wherePram += '\"'+'chnlorstationId'+'\":\"'+code+'\",'
					colNames.push('渠道/基站')
					colModel.push({
						name : 'CHNLORSTATION_NAME',
						align : 'center'
					})
				}
			}
			if(value == '请选择...'){
				value = ''
			}
			wherePram += '\"'+id +'\":\"'+value+'\",'
		})
		wherePram += '\"'+'kpi'+'\":\"';
		$(".kpiNameDiv i").each(function(index){
			var kpiId = $(this).attr('id')
			var kpiName = $(this).prev().text()
			if(index == $(".kpiNameDiv i").length -1){
				wherePram += kpiId +':'+kpiName+'\",';
			}else{
				wherePram += kpiId +':'+kpiName+',';
			}
			colNames.push(kpiName)
			colModel.push({
				name : kpiId,
				align : 'center'
			})
		})
		if($(".kpiNameDiv i").length == 0){
			wherePram += '\",'
		}
		wherePram += '\"'+'accountPeriod'+'\":\"'+accountPeriod+'\"}'
	}else{
		if(selectId == 'cityCompany'){
			$(".kpiSelect").each(function(index){
				var orgName = $(this).prev().text()
				var id = $(this).attr('id');
				var code = $(this).find("option:selected").attr('id');
				var value = $(this).find('option:selected').text();
				if(id == 'cityCompany'){
					wherePram += '\"'+'cityCode'+'\":\"'+code+'\",'
					colNames.push('城市公司')
					colModel.push({
						name : 'CITY_NAME',
						align : 'center'
					})
				}else if(id == 'areaCompany'){
					wherePram += '\"'+'areaCode'+'\":\"'+code+'\",'
					colNames.push('区县')
					colModel.push({
						name : 'AREA_NAME',
						align : 'center'
					})
				}else if(id == 'saleDept'){
					wherePram += '\"'+'saleDeptCode'+'\":\"'+code+'\",'
					colNames.push('营业部')
					colModel.push({
						name : 'SALE_DEPT_NAME',
						align : 'center'
					})
				}
				else if(id == 'gridAll'){
					wherePram += '\"'+'gridCode'+'\":\"'+code+'\",'
					colNames.push('网格')
					colModel.push({
						name : 'GRID_NAME',
						align : 'center'
					})
				}else if(id == 'village'){
					wherePram += '\"'+'villageId'+'\":\"'+code+'\",'
					colNames.push('乡镇/街道')
					colModel.push({
						name : 'VILLAGE_NAME',
						align : 'center'
					})
				}else if(id == 'community'){
					wherePram += '\"'+'communityId'+'\":\"'+code+'\",'
					colNames.push('村/社区')
					colModel.push({
						name : 'COMMUNITY_NAME',
						align : 'center'
					})
				}else if(id == 'chnlorstation'){
					wherePram += '\"'+'chnlorstationId'+'\":\"'+code+'\",'
					colNames.push('渠道/基站')
					colModel.push({
						name : 'CHNLORSTATION_NAME',
						align : 'center'
					})
				}
				if(value == '请选择...'){
					value = ''
				}
				wherePram += '\"'+id +'\":\"'+value+'\",'
			})
			wherePram += '\"'+'kpi'+'\":\"';
			$(".kpiNameDiv i").each(function(index){
				var kpiId = $(this).attr('id')
				var kpiName = $(this).prev().text()
				if(index == $(".kpiNameDiv i").length -1){
					wherePram += kpiId +':'+kpiName+'\",';
				}else{
					wherePram += kpiId +':'+kpiName+',';
				}
				colNames.push(kpiName)
				colModel.push({
					name : kpiId,
					align : 'center'
				})
			})
			if($(".kpiNameDiv i").length == 0){
				wherePram += '\",'
			}
			wherePram += '\"'+'accountPeriod'+'\":\"'+accountPeriod+'\"}'
		}else{
			if($("#cityCompany").find("option:selected").attr('id') == undefined){
				$(".kpiSelect").each(function(index){
					var orgName = $(this).prev().text()
					var id = $(this).attr('id');
					var code = $(this).find("option:selected").attr('id');
					var value = $(this).find('option:selected').text();
					if(id == 'cityCompany'){
						wherePram += '\"'+'cityCode'+'\":\"'+code+'\",'
						colNames.push('城市公司')
						colModel.push({
							name : 'CITY_NAME',
							align : 'center'
						})
					}else if(id == 'areaCompany'){
						wherePram += '\"'+'areaCode'+'\":\"'+code+'\",'
						colNames.push('区县')
						colModel.push({
							name : 'AREA_NAME',
							align : 'center'
						})
					}else if(id == 'saleDept'){
						wherePram += '\"'+'saleDeptCode'+'\":\"'+code+'\",'
						colNames.push('营业部')
						colModel.push({
							name : 'SALE_DEPT_NAME',
							align : 'center'
						})
					}
					else if(id == 'gridAll'){
						wherePram += '\"'+'gridCode'+'\":\"'+code+'\",'
						colNames.push('网格')
						colModel.push({
							name : 'GRID_NAME',
							align : 'center'
						})
					}else if(id == 'village'){
						wherePram += '\"'+'villageId'+'\":\"'+code+'\",'
						colNames.push('乡镇/街道')
						colModel.push({
							name : 'VILLAGE_NAME',
							align : 'center'
						})
					}else if(id == 'community'){
						wherePram += '\"'+'communityId'+'\":\"'+code+'\",'
						colNames.push('村/社区')
						colModel.push({
							name : 'COMMUNITY_NAME',
							align : 'center'
						})
					}else if(id == 'chnlorstation'){
						wherePram += '\"'+'chnlorstationId'+'\":\"'+code+'\",'
						colNames.push('渠道/基站')
						colModel.push({
							name : 'CHNLORSTATION_NAME',
							align : 'center'
						})
					}
					if(value == '请选择...'){
						value = ''
					}
					wherePram += '\"'+id +'\":\"'+value+'\",'
				})
				wherePram += '\"'+'kpi'+'\":\"';
				$(".kpiNameDiv i").each(function(index){
					var kpiId = $(this).attr('id')
					var kpiName = $(this).prev().text()
					if(index == $(".kpiNameDiv i").length -1){
						wherePram += kpiId +':'+kpiName+'\",';
					}else{
						wherePram += kpiId +':'+kpiName+',';
					}
					colNames.push(kpiName)
					colModel.push({
						name : kpiId,
						align : 'center'
					})
				})
				if($(".kpiNameDiv i").length == 0){
					wherePram += '\",'
				}
				wherePram += '\"'+'accountPeriod'+'\":\"'+accountPeriod+'\"}'
			}else{
				$(".kpiSelect").each(function(index){
					var orgName = $(this).prev().text()
					var id = $(this).attr('id');
					var code = $(this).find("option:selected").attr('id');
					var value = $(this).find('option:selected').text();
	
					if(id == 'cityCompany'){
						wherePram += '\"'+'cityCode'+'\":\"'+code+'\",'
							if($("#cityCompany").find("option:selected").attr('id') != undefined){
							colNames.push('城市公司')
							colModel.push({
								name : 'CITY_NAME',
								align : 'center'
							})
						}
					}else if(id == 'areaCompany'){
						wherePram += '\"'+'areaCode'+'\":\"'+code+'\",'
						if($("#areaCompany").find("option:selected").attr('id') != undefined){
							colNames.push('区县')
							colModel.push({
								name : 'AREA_NAME',
								align : 'center'
							})
						}
					}else if(id == 'saleDept'){
						wherePram += '\"'+'saleDeptCode'+'\":\"'+code+'\",'
						if($("#saleDept").find("option:selected").attr('id') != undefined){
							colNames.push('营业部')
							colModel.push({
								name : 'SALE_DEPT_NAME',
								align : 'center'
							})
						}
					}
					else if(id == 'gridAll'){
						wherePram += '\"'+'gridCode'+'\":\"'+code+'\",'
						if($("#gridAll").find("option:selected").attr('id') != undefined){
							colNames.push('网格')
							colModel.push({
								name : 'GRID_NAME',
								align : 'center'
							})
						}
					}else if(id == 'village'){
						wherePram += '\"'+'villageId'+'\":\"'+code+'\",'
						if($("#village").find("option:selected").attr('id') != undefined){
							colNames.push('乡镇/街道')
							colModel.push({
								name : 'VILLAGE_NAME',
								align : 'center'
							})
						}
					}else if(id == 'community'){
						wherePram += '\"'+'communityId'+'\":\"'+code+'\",'
						if($("#community").find("option:selected").attr('id') != undefined){
							colNames.push('村/社区')
							colModel.push({
								name : 'COMMUNITY_NAME',
								align : 'center'
							})
						}
					}else if(id == 'chnlorstation'){
						wherePram += '\"'+'chnlorstationId'+'\":\"'+code+'\",'
						if($("#community").find("option:selected").attr('id') != undefined){
							colNames.push('渠道/基站')
							colModel.push({
								name : 'CHNLORSTATION_NAME',
								align : 'center'
							})
						}
					}
				
					if(value == '请选择...'){
						value = ''
					}
					wherePram += '\"'+id +'\":\"'+value+'\",'
				})
				wherePram += '\"'+'kpi'+'\":\"';
				$(".kpiNameDiv i").each(function(index){
					var kpiId = $(this).attr('id')
					var kpiName = $(this).prev().text()
					if(index == $(".kpiNameDiv i").length -1){
						wherePram += kpiId +':'+kpiName+'\",';
					}else{
						wherePram += kpiId +':'+kpiName+',';
					}
					colNames.push(kpiName)
					colModel.push({
						name : kpiId,
						align : 'center'
					})
				})
				if($(".kpiNameDiv i").length == 0){
					wherePram += '\",'
				}
				wherePram += '\"'+'accountPeriod'+'\":\"'+accountPeriod+'\"}'
			}
		}
	}
	var tableWidth = $(".grid").width();
	var tableHeight = $(".grid").height();
	$('#kpiResultGrid').GridUnload();
	$('#kpiResultGrid').jqGrid({
		datatype : "json",
		url : $.cxt + '/kpi/initResultMsg',
		mtype : "POST",
		postData : JSON.parse(wherePram),
		height : (tableHeight-68),
		autowidth : false,
		colNames : colNames,
		colModel : colModel,
		width : (tableWidth-20),
		shrinkToFit:false,
		autoScroll: true,
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10,20, 30 ],
		pager : '#grid-pager',
		loadComplete : topjqGridLoadComplete,
		gridComplete : function(){
			$(".ui-jqgrid-bdiv").getNiceScroll().resize();
			$(".ui-jqgrid-bdiv").niceScroll({
				cursorheight:$(window).height()-190,
			    cursorcolor:"#5cd4f8",
			    cursorborder: "1px solid #5cd4f8",
			    touchbehavior: false,
			    spacebarenabled: true,
			    railoffset: false
			});
		}
	});
	
}

var initCountPeriod = function(){
	$.ajax({//初始化统计周期
		url : $.cxt + "/kpi/getCountPeriod", 
		type: "POST",
		data:{}, 
		async : false,
		success : function(data) {
			var json = JSON.parse(data);
			if(json.code == '0'){
				$("#countPeriod").empty();
				for(var i=0;i<json.data.length;i++){
					if(json.data[i] != null){
						$("#countPeriod").append(
								$("<option>"+json.data[i].statisCycle+"</option>").attr("value",json.data[i].statisCycle)
						)
					}
				}
			}
			$("#countPeriod").val('日');
		}
	})
}

var changeTypeLevel = function(option){
	var screenCode = $(option).find("option:selected").attr('id');
	if(screenCode != undefined){
		$.ajax({
			url : $.cxt + "/kpi/changeTypeLevel", 
			type: "POST",
			data:{screenCode:screenCode},
			async : false,
			success : function(data) {
				var json  = JSON.parse(data);
				if(json.code == '0'){
					var index = 1;
					if(json.data != ''){
						if(json.data[0].screenLevel == '2'){
							var level2Value = $('#typeLevel2').find("option:selected").attr('value')
							var level3Value = $('#typeLevel3').find("option:selected").attr('value')
							if(level2Value != '请选择...' || level3Value != '请选择...'){
								$("#typeLevel2").empty();
								$("#typeLevel3").empty();
								for(var i=0;i<json.data.length;i++){
									if(index == '1'){
										$("#typeLevel2").append(
												$("<option>请选择...</option>").attr('value','请选择...')
										)
										$("#typeLevel3").append(
												$("<option>请选择...</option>").attr('value','请选择...')
										)
										index ++;
									}
									$("#typeLevel2").append(
											$("<option>"+json.data[i].screenValue+"</option>").attr('value',json.data[i].screenCode).attr('id',json.data[i].screenCode)
									)
									if(json.data[i].children != undefined && json.data[i].children != '' && json.data[i].children != null){
										getChildrenScreen(json.data[i].children);
									}
								}
								$('#typeLevel2').val(level2Value)
								$('#typeLevel3').val(level3Value)
							}else{
								$("#typeLevel2").empty();
								$("#typeLevel3").empty();
								for(var i=0;i<json.data.length;i++){
									if(index == '1'){
										$("#typeLevel2").append(
												$("<option>请选择...</option>").attr('value','请选择...')
										)
										$("#typeLevel3").append(
												$("<option>请选择...</option>").attr('value','请选择...')
										)
										index ++;
									}
									$("#typeLevel2").append(
											$("<option>"+json.data[i].screenValue+"</option>").attr('value',json.data[i].screenCode).attr('id',json.data[i].screenCode)
									)
									if(json.data[i].children != undefined && json.data[i].children != '' && json.data[i].children != null){
										getChildrenScreen(json.data[i].children);
									}
								}
							}
						}
						if(json.data[0].screenLevel == '3'){
							var levelValue1 = $('#typeLevel1').find("option:selected").attr('value');
							var levelValue3 = $('#typeLevel3').find("option:selected").attr('value');
							if(levelValue1 != '请选择...' || levelValue3 != '请选择...'){
								$("#typeLevel1").empty();
								$("#typeLevel3").empty();
								$("#typeLevel3").append(
										$("<option>请选择...</option>").attr('value','请选择...')
								)
								for(var i=0;i<json.data.length;i++){
									if(json.data[i].screenValue != undefined){
										$("#typeLevel3").append(
												$("<option>"+json.data[i].screenValue+"</option>").attr('value',json.data[i].screenCode).attr('id',json.data[i].screenCode)
										)
									}
									if(json.data[i].parent != undefined && json.data[i].parent != '' && json.data[i].parent != null){
										getParentScreen(json.data[i].parent);
									}
								}
								$('#typeLevel1').val(levelValue1)
								$('#typeLevel3').val(levelValue3)
							}else{
								$("#typeLevel1").empty();
								$("#typeLevel3").empty();
								$("#typeLevel3").append(
										$("<option>请选择...</option>").attr('value','请选择...')
								)
								for(var i=0;i<json.data.length;i++){
									if(json.data[i].screenValue != undefined){
										$("#typeLevel3").append(
												$("<option>"+json.data[i].screenValue+"</option>").attr('value',json.data[i].screenCode).attr('id',json.data[i].screenCode)
										)
									}
									if(json.data[i].parent != undefined && json.data[i].parent != '' && json.data[i].parent != null){
										getParentScreen(json.data[i].parent);
									}
								}
							}
						}
						if(json.data[0].parent[0].screenLevel == '3'){
							var levelValueOne = $('#typeLevel1').find("option:selected").attr('value');
							var levelValueTwo = $('#typeLevel2').find("option:selected").attr('value');
							if(levelValueOne != '请选择...' || levelValueTwo != '请选择...'){
								$('#typeLevel1').val(levelValueOne)
								$('#typeLevel2').val(levelValueTwo)
							}else{
								$("#typeLevel1").empty();
								$("#typeLevel2").empty();
								for(var i=0;i<json.data[0].parent.length;i++){
									getParentScreen(json.data[0].parent[i].parent);
								}
							}
						}
					}
				}
			}
			
		})	
	}else{
		var levelId = $(option).attr('id')
		if(levelId == 'typeLevel1'){
			reloadTypeLevel()
		}else if(levelId == 'typeLevel2'){
			reloadTypeLevel()
		}else if(levelId == 'typeLevel3'){
			
		}else{
			
		}
	}
}
var getParentScreen = function(parent){
	for(var i=0;i<parent.length;i++){
		if(parent[i].screenLevel == '1'){
			$("#typeLevel1").append(
					$("<option>"+'请选择...'+"</option>").attr('value','请选择...')
			)
			$("#typeLevel1").append(
					$("<option>"+parent[i].screenValue+"</option>").attr('value',parent[i].screenCode).attr('id',parent[i].screenCode)
			)
			removeSelectRepeat('typeLevel1');
		}
		if(parent[i].screenLevel == '2'){
			$("#typeLevel2").append(
					$("<option>"+'请选择...'+"</option>").attr('value','请选择...')
			)
			$("#typeLevel2").append(
					$("<option>"+parent[i].screenValue+"</option>").attr('value',parent[i].screenCode).attr('id',parent[i].screenCode)
			)
			removeSelectRepeat('typeLevel2');
		}
		if(parent[i].parent != undefined){
			getParentScreen(parent[i].parent);
		}
	}

}

var getChildrenScreen = function(children){
	if(children[0].screenLevel == '3'){
		for(var i=0;i<children.length;i++){
			if(children[i].screenValue != undefined){
				$("#typeLevel3").append(
						$("<option>"+children[i].screenValue+"</option>").attr('value',children[i].screenCode).attr('id',children[i].screenCode)	
				)
			}
		}
		/*if(children[i].children != undefined && children[i].children != null && children[i].children != ''){
			getChildrenScreen(children[i].children);
		}*/
	}
		
}

var initTypeLevel = function(){
	$.ajax({
		url : $.cxt + "/kpi/initTypeLevel", 
		type: "POST",
		data:{},
//		async : false,
		success : function(data) {
			var json  = JSON.parse(data);
			if(json.code == '0'){
				$('.kpi-addKpi').append(
						$("<div></div>").addClass('kpi-select').append(
								$("<span>一级分类：</span>")
						).append(
								$("<select></select>").addClass('kpiSelect').attr('id','typeLevel1').attr('onchange','changeTypeLevel(this)')
						)
				).append(
						$("<div></div>").addClass('kpi-select').append(
								$("<span>二级分类：</span>")
						).append(
								$("<select></select>").addClass('kpiSelect').attr('id','typeLevel2').attr('onchange','changeTypeLevel(this)')
						)
				).append(
						$("<div></div>").addClass('kpi-select').append(
								$("<span>三级分类：</span>")
						).append(
								$("<select></select>").addClass('kpiSelect').attr('id','typeLevel3').attr('onchange','changeTypeLevel(this)')
						)
				)
				$('#typeLevel1').append(
						$("<option>"+'请选择...'+"</option>").attr('value','请选择...')
				)
				$('#typeLevel2').append(
						$("<option>"+'请选择...'+"</option>").attr('value','请选择...')
				)
				$('#typeLevel3').append(
						$("<option>"+'请选择...'+"</option>").attr('value','请选择...')
				)
				for(var i=0;i<json.data.typeLevel1.length;i++){
					if(json.data.typeLevel1[i].screenValue != null && json.data.typeLevel1[i].screenValue != '' && json.data.typeLevel1[i].screenValue != undefined){
						$('#typeLevel1').append(
								$("<option>"+json.data.typeLevel1[i].screenValue+"</option>").attr('id',json.data.typeLevel1[i].screenCode).attr('value',json.data.typeLevel1[i].screenCode)
						)
					}
				}
				for(var i=0;i<json.data.typeLevel2.length;i++){
					if(json.data.typeLevel2[i].screenValue != null && json.data.typeLevel2[i].screenValue != '' && json.data.typeLevel2[i].screenValue != undefined){
						$('#typeLevel2').append(
								$("<option>"+json.data.typeLevel2[i].screenValue+"</option>").attr('id',json.data.typeLevel2[i].screenCode).attr('value',json.data.typeLevel2[i].screenCode)
						)
					}
				}
				for(var i=0;i<json.data.typeLevel3.length;i++){
					if(json.data.typeLevel3[i].screenValue != null && json.data.typeLevel3[i].screenValue != '' && json.data.typeLevel3[i].screenValue != undefined){
						$('#typeLevel3').append(
								$("<option>"+json.data.typeLevel3[i].screenValue+"</option>").attr('id',json.data.typeLevel3[i].screenCode).attr('value',json.data.typeLevel3[i].screenCode)
						)
					}
				}
			}
		}
		
	})
}

var initKpiIndex = function(){
	$.ajax({
		url : $.cxt + "/kpi/initKpiIndex", 
		type: "POST",
		data:{},
		async : false,
		success : function(data) {
			var json  = JSON.parse(data);
			if(json.code == '0'){
				for(var i=0;i<8;i++){
					$(".kpiName-content").append(
							$("<div></div>").addClass("kpiNameDiv").append(
									$("<span>"+json.data[i].kpiName+"</span>")
							).append(
									$("<i></i>").addClass("glyphicon glyphicon-remove").attr('id',json.data[i].kpiCode).attr('onclick','deleteKpi(this)')
							)
					)
					if(i==0){
						$(".middle-input").append(
								$("<div></div>").addClass("inputNameMiddle").append(
										$("<span>"+json.data[i].kpiName+"</span>").attr('id',json.data[i].kpiCode).attr('onclick','clickKpi(this)').css("color",'red').css("font-weight",'bold')
								).append(
										$("<input />").css('display','none').attr('type','radio').attr('id',json.data[i].kpiCode)
								)
						)
					}else{
						$(".middle-input").append(
								$("<div></div>").addClass("inputNameMiddle").append(
										$("<span>"+json.data[i].kpiName+"</span>").attr('id',json.data[i].kpiCode).attr('onclick','clickKpi(this)')
								).append(
										$("<input />").css('display','none').attr('type','radio').attr('id',json.data[i].kpiCode)
								)
						)
					}
					if(i<5){
						if(i==0){
							$(".right-input").append(
									$("<div></div>").addClass("inputName").append(
											$("<span>"+json.data[i].kpiName+"</span>").attr('onclick','clickKpiRight(this)').css("color",'red').css("font-weight",'bold')
									).append(
											$("<i></i>").addClass("glyphicon glyphicon-remove").attr('id',json.data[i].kpiCode).attr('onclick','deleteKpiRight(this)')
									)
							)
						}else{
							$(".right-input").append(
									$("<div></div>").addClass("inputName").append(
											$("<span>"+json.data[i].kpiName+"</span>").attr('onclick','clickKpiRight(this)')
									).append(
											$("<i></i>").addClass("glyphicon glyphicon-remove").attr('id',json.data[i].kpiCode).attr('onclick','deleteKpiRight(this)')
									)
							)
						}
					}
				}
				
			}
			
		}
		
	})
}

var initDate = function(){
	//昨天日期
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
	var yesterday = year + "" +month + "" + date;
	$("#AccountPeriod").datepicker({
		format: 'yyyymmdd',
		language:  'zh-CN',
		todayBtn : "linked",
		autoclose:true,
		minview : "3"
	});
	
	$("#AccountPeriod").val(yesterday);
	$("#AccountPeriod").change(function(){
		var valueDate = $(this).val();
		initResultMsg(null,'AccountPeriod')
		getTopFive(publicOrgId)
		if(lineOrBar == 'bar'){
			rankingBar(echartsPublicOrgId)
		}else{
			doubleLine(echartsPublicOrgId)
		}
	})
	
	$("#countPeriod").change(function(){
		var selector = $(this).find("option:selected").val();
		if(selector == '日' || selector == '日累计'){
			$("#AccountPeriod").datepicker('remove');
			$("#AccountPeriod").val(yesterday)
			$("#AccountPeriod").datepicker({
				format: 'yyyymmdd',
				language:  'zh-CN',
				todayBtn : "linked",
				autoclose:true,
				minview : "3"
			})
		}else if(selector == '年累计'){
			$("#AccountPeriod").datepicker('remove');
			$("#AccountPeriod").val(year)
			$("#AccountPeriod").datepicker({
				format: 'yyyy',
				language:  'zh-CN',
				todayBtn : "linked",
				autoclose:true,
				minview : "3"
			})
		}else if(selector == '月' || selector == '月累计'){
			$("#AccountPeriod").datepicker('remove');
			$("#AccountPeriod").val(year+""+month)
			$("#AccountPeriod").datepicker({
				format: 'yyyymm',
				language:  'zh-CN',
				todayBtn : "linked",
				autoclose:true,
				startView: 'months',
		        maxViewMode:'years',
		        minViewMode:'months'
			})
		}
		initResultMsg(null,'countPeriod')
		getTopFive(publicOrgId)
		if(lineOrBar == 'bar'){
			rankingBar(echartsPublicOrgId)
		}else{
			doubleLine(echartsPublicOrgId)
		}
	})
	
}

var changeSelectOrg = function(option){
	var orgId = $(option).find("option:selected").attr('id')
	var selectId = $(option).attr('id')
	var orgLevel = '';
	if(orgId != undefined){
		$.ajax({
			url : $.cxt + '/kpi/getOrgLevelAndLevelMax',
			data : {orgId : orgId},
			type : 'POST',
			async : false,
			success : function(data){
				var json = JSON.parse(data)
				if(json.code == '0'){
					orgLevel = json.data.orgLevel
				}
			}
		})
	}
	if(selectId == 'cityCompany'){
		if(orgId != undefined){
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:orgId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#cityCompanyMiddle").val(orgId);
						$("#cityCompanyRight").val(orgId);
						$("#areaCompany").empty();
						$("#areaCompany").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#areaCompanyMiddle").empty();
						$("#areaCompanyMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#areaCompanyRight").empty();
						$("#areaCompanyRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#saleDept").empty();
						$("#saleDept").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#saleDeptMiddle").empty();
						$("#saleDeptMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#saleDeptRight").empty();
						$("#saleDeptRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAll").empty();
						$("#gridAll").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAllMiddle").empty();
						$("#gridAllMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAllRight").empty();
						$("#gridAllRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						if($("#village").length > 0){
							$("#village").empty();
							$("#villageMiddle").empty();
							$("#villageRight").empty();
							$("#village").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#villageMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#villageRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.villageInfo.length;i++){
								if(json.data.villageInfo[i] != null){
									$("#village").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
									$("#villageMiddle").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
									$("#villageRight").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
								}
							}
						}
						if($("#community").length > 0){
							$("#community").empty();
							$("#communityMiddle").empty();
							$("#communityRight").empty();
							$("#community").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#communityMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#communityRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#community").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
									$("#communityMiddle").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
									$("#communityRight").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstation").length > 0){
							$("#chnlorstation").empty();
							$("#chnlorstationMiddle").empty();
							$("#chnlorstationRight").empty();
							$("#chnlorstation").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#chnlorstationMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#chnlorstationRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstation").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
									$("#chnlorstationMiddle").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
									$("#chnlorstationRight").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						
						for(var i=0;i<json.data.areaInfo.length;i++){
							if(json.data.areaInfo[i] != null){
								$("#areaCompany").append(
										$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
								)
								$("#areaCompanyMiddle").append(
										$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
								)
								$("#areaCompanyRight").append(
										$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
								)
							}
						}
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								$("#saleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptMiddle").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptRight").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
								$("#gridAllMiddle").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
								$("#gridAllRight").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
						
					}
				}
				
			})
			initEmap(orgId);
			if(lineOrBar == 'bar'){
				rankingBar(orgId)
			}else{
				doubleLine(orgId)
			}
		}else{
			$("#cityCompanyMiddle").val('请选择...')
			$("#cityCompanyRight").val('请选择...')
			$(".orgClass").empty();
			$(".orgClassMiddle").empty();
			$(".orgClassRight").empty();
			initSeletOrg();
			initEmap('1');
			if(lineOrBar == 'bar'){
				rankingBar('1')
			}else{
				doubleLine('1')
			}
		}
	}
	
	if(selectId == 'areaCompany'){
		if(orgId != undefined){
			if($("#cityCompany").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							$("#areaCompanyMiddle").val(orgId);
							$("#areaCompanyRight").val(orgId);
							$("#saleDept").empty();
							$("#saleDept").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#saleDeptMiddle").empty();
							$("#saleDeptMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#saleDeptRight").empty();
							$("#saleDeptRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#gridAll").empty();
							$("#gridAll").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#gridAllMiddle").empty();
							$("#gridAllMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#gridAllRight").empty();
							$("#gridAllRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							if($("#village").length > 0){
								$("#village").empty();
								$("#villageMiddle").empty();
								$("#villageRight").empty();
								$("#village").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#villageMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#villageRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.villageInfo.length;i++){
									if(json.data.villageInfo[i] != null){
										$("#village").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
										$("#villageMiddle").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
										$("#villageRight").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
									}
								}
							}
							if($("#community").length > 0){
								$("#community").empty();
								$("#communityMiddle").empty();
								$("#communityRight").empty();
								$("#community").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#communityMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#communityRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.communityInfo.length;i++){
									if(json.data.communityInfo[i] != null){
										$("#community").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
										$("#communityMiddle").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
										$("#communityRight").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
									}
								}
							}
							if($("#chnlorstation").length > 0){
								$("#chnlorstation").empty();
								$("#chnlorstationMiddle").empty();
								$("#chnlorstationRight").empty();
								$("#chnlorstation").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#chnlorstationMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#chnlorstationRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstation").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
										$("#chnlorstationMiddle").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
										$("#chnlorstationRight").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
							for(var i=0;i<json.data.saleDeptInfo.length;i++){
								if(json.data.saleDeptInfo[i] != null){
									$("#saleDept").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
									$("#saleDeptMiddle").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
									$("#saleDeptRight").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
								}
							}
							for(var i=0;i<json.data.gridInfo.length;i++){
								if(json.data.gridInfo[i] != null){
									$("#gridAll").append(
											$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
									)
									$("#gridAllMiddle").append(
											$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
									)
									$("#gridAllRight").append(
											$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
									)
								}
							}
							
						}
						
					}
					
				})
				initEmap(orgId);
				if(lineOrBar == 'bar'){
					rankingBar(orgId)
				}else{
					doubleLine(orgId)
				}
			}else{
				$('#areaCompany').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
		}else{
			var cityId = $('#cityCompany').find("option:selected").attr('id')
			initEmap(cityId);
			if(lineOrBar == 'bar'){
				rankingBar(cityId)
			}else{
				doubleLine(cityId)
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:cityId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#areaCompanyMiddle").val('请选择...')
						$("#areaCompanyRight").val('请选择...')
						$("#saleDept").empty();
						$("#saleDept").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#saleDeptMiddle").empty();
						$("#saleDeptMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#saleDeptRight").empty();
						$("#saleDeptRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAll").empty();
						$("#gridAll").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAllMiddle").empty();
						$("#gridAllMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAllRight").empty();
						$("#gridAllRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						if($("#village").length > 0){
							$("#village").empty();
							$("#villageMiddle").empty();
							$("#villageRight").empty();
							$("#village").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#villageMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#villageRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.villageInfo.length;i++){
								if(json.data.villageInfo[i] != null){
									$("#village").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
									$("#villageMiddle").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
									$("#villageRight").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
								}
							}
						}
						if($("#community").length > 0){
							$("#community").empty();
							$("#communityMiddle").empty();
							$("#communityRight").empty();
							$("#community").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#communityMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#communityRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#community").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
									$("#communityMiddle").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
									$("#communityRight").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstation").length > 0){
							$("#chnlorstation").empty();
							$("#chnlorstationMiddle").empty();
							$("#chnlorstationRight").empty();
							$("#chnlorstation").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#chnlorstationMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#chnlorstationRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstation").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
									$("#chnlorstationMiddle").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
									$("#chnlorstationRight").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								$("#saleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptMiddle").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptRight").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
								$("#gridAllMiddle").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
								$("#gridAllRight").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
						
					}
					
				}
				
			})
		}
	}
	
	if(selectId == 'saleDept'){
		if(orgId != undefined){
			if($("#cityCompany").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							$("#saleDeptMiddle").val(orgId);
							$("#saleDeptRight").val(orgId);
							$("#gridAll").empty();
							$("#gridAll").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#gridAllMiddle").empty();
							$("#gridAllMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#gridAllRight").empty();
							$("#gridAllRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							if($("#village").length > 0){
								$("#village").empty();
								$("#villageMiddle").empty();
								$("#villageRight").empty();
								$("#village").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#villageMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#villageRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.villageInfo.length;i++){
									if(json.data.villageInfo[i] != null){
										$("#village").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
										$("#villageMiddle").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
										$("#villageRight").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
									}
								}
							}
							if($("#community").length > 0){
								$("#community").empty();
								$("#communityMiddle").empty();
								$("#communityRight").empty();
								$("#community").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#communityMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#communityRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.communityInfo.length;i++){
									if(json.data.communityInfo[i] != null){
										$("#community").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
										$("#communityMiddle").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
										$("#communityRight").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
									}
								}
							}
							if($("#chnlorstation").length > 0){
								$("#chnlorstation").empty();
								$("#chnlorstationMiddle").empty();
								$("#chnlorstationRight").empty();
								$("#chnlorstation").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#chnlorstationMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#chnlorstationRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstation").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
										$("#chnlorstationMiddle").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
										$("#chnlorstationRight").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
							for(var i=0;i<json.data.gridInfo.length;i++){
								if(json.data.gridInfo[i] != null){
									$("#gridAll").append(
											$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
									)
									$("#gridAllMiddle").append(
											$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
									)
									$("#gridAllRight").append(
											$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
									)
								}
							}
							
						}
						
					}
					
				})
				if(lineOrBar == 'bar'){
					rankingBar(orgId)
				}else{
					doubleLine(orgId)
				}
			}else{
				$('#saleDept').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			var areaId = $('#areaCompany').find("option:selected").attr('id')
			if(areaId == undefined){
				areaId = $('#cityCompany').find("option:selected").attr('id')
			}
			if(lineOrBar == 'bar'){
				rankingBar(areaId)
			}else{
				doubleLine(areaId)
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:areaId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#saleDeptMiddle").val('请选择...')
						$("#saleDeptRight").val('请选择...')
						$("#gridAll").empty();
						$("#gridAll").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAllMiddle").empty();
						$("#gridAllMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAllRight").empty();
						$("#gridAllRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						if($("#village").length > 0){
							$("#village").empty();
							$("#villageMiddle").empty();
							$("#villageRight").empty();
							$("#village").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#villageMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#villageRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.villageInfo.length;i++){
								if(json.data.villageInfo[i] != null){
									$("#village").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
									$("#villageMiddle").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
									$("#villageRight").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
								}
							}
						}
						if($("#community").length > 0){
							$("#community").empty();
							$("#communityMiddle").empty();
							$("#communityRight").empty();
							$("#community").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#communityMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#communityRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#community").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
									$("#communityMiddle").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
									$("#communityRight").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstation").length > 0){
							$("#chnlorstation").empty();
							$("#chnlorstationMiddle").empty();
							$("#chnlorstationRight").empty();
							$("#chnlorstation").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#chnlorstationMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#chnlorstationRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstation").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
									$("#chnlorstationMiddle").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
									$("#chnlorstationRight").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAll").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
								$("#gridAllMiddle").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
								$("#gridAllRight").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
						
					}
					
				}
				
			})
			
		}
		
	}
	
	if(selectId == 'gridAll'){
		if(orgId != undefined){
			if($("#cityCompany").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							$("#gridAllMiddle").val(orgId);
							$("#gridAllRight").val(orgId);
							if($("#village").length > 0){
								$("#village").empty();
								$("#villageMiddle").empty();
								$("#villageRight").empty();
								$("#village").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#villageMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#villageRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.villageInfo.length;i++){
									if(json.data.villageInfo[i] != null){
										$("#village").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
										$("#villageMiddle").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
										$("#villageRight").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
									}
								}
							}
							if($("#community").length > 0){
								$("#community").empty();
								$("#communityMiddle").empty();
								$("#communityRight").empty();
								$("#community").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#communityMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#communityRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.communityInfo.length;i++){
									if(json.data.communityInfo[i] != null){
										$("#community").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
										$("#communityMiddle").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
										$("#communityRight").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
									}
								}
							}
							if($("#chnlorstation").length > 0){
								$("#chnlorstation").empty();
								$("#chnlorstationMiddle").empty();
								$("#chnlorstationRight").empty();
								$("#chnlorstation").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#chnlorstationMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#chnlorstationRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstation").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
										$("#chnlorstationMiddle").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
										$("#chnlorstationRight").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
						}
						
					}
					
				})
				initEmap(orgId)
				if(lineOrBar == 'bar'){
					rankingBar(orgId)
				}else{
					doubleLine(orgId)
				}
			}else{
				$('#gridAll').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			var saleDeptId = $('#saleDept').find("option:selected").attr('id')
			if(saleDeptId == undefined){
				saleDeptId = $('#areaCompany').find("option:selected").attr('id')
			}
			if(saleDeptId == undefined){
				saleDeptId = $('#cityCompany').find("option:selected").attr('id')
			}
			var areaMapId = $("#areaCompanyMiddle").find("option:selected").attr('id')
			if(areaMapId == undefined){
				areaMapId = $("#cityCompanyMiddle").find("option:selected").attr('id')
			}
			initEmap(areaMapId)
			if(lineOrBar == 'bar'){
				rankingBar(saleDeptId)
			}else{
				doubleLine(saleDeptId)
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:saleDeptId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#gridAllMiddle").val('请选择...')
						$("#gridAllRight").val('请选择...')
						if($("#village").length > 0){
							$("#village").empty();
							$("#villageMiddle").empty();
							$("#villageRight").empty();
							$("#village").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#villageMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#villageRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.villageInfo.length;i++){
								if(json.data.villageInfo[i] != null){
									$("#village").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
									$("#villageMiddle").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
									$("#villageRight").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
								}
							}
						}
						if($("#community").length > 0){
							$("#community").empty();
							$("#communityMiddle").empty();
							$("#communityRight").empty();
							$("#community").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#communityMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#communityRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#community").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
									$("#communityMiddle").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
									$("#communityRight").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstation").length > 0){
							$("#chnlorstation").empty();
							$("#chnlorstationMiddle").empty();
							$("#chnlorstationRight").empty();
							$("#chnlorstation").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#chnlorstationMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#chnlorstationRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstation").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
									$("#chnlorstationMiddle").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
									$("#chnlorstationRight").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						
					}
					
				}
				
			})
			
		}
		
	}
	
	if(selectId == 'village'){
		if(orgId != undefined){
			if($("#cityCompany").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							$("#villageMiddle").val(orgId);
							$("#villageRight").val(orgId);
							if($("#community").length > 0){
								$("#community").empty();
								$("#communityMiddle").empty();
								$("#communityRight").empty();
								$("#community").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#communityMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#communityRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.communityInfo.length;i++){
									if(json.data.communityInfo[i] != null){
										$("#community").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
										$("#communityMiddle").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
										$("#communityRight").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
									}
								}
							}
							if($("#chnlorstation").length > 0){
								$("#chnlorstation").empty();
								$("#chnlorstationMiddle").empty();
								$("#chnlorstationRight").empty();
								$("#chnlorstation").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#chnlorstationMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#chnlorstationRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstation").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
										$("#chnlorstationMiddle").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
										$("#chnlorstationRight").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
						}
						
					}
					
				})
				if(lineOrBar == 'bar'){
					rankingBar(orgId)
				}else{
					doubleLine(orgId)
				}
			}else{
				$('#village').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			var gridCode = $('#gridAll').find("option:selected").attr('id')
			if(gridCode == undefined){
				var gridCode = $('#saleDept').find("option:selected").attr('id')
			}
			if(gridCode == undefined){
				gridCode = $('#areaCompany').find("option:selected").attr('id')
			}
			if(gridCode == undefined){
				gridCode = $('#cityCompany').find("option:selected").attr('id')
			}
			if(lineOrBar == 'bar'){
				rankingBar(gridCode)
			}else{
				doubleLine(gridCode)
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:gridCode
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#villageMiddle").val('请选择...')
						$("#villageRight").val('请选择...')
						if($("#community").length > 0){
							$("#community").empty();
							$("#communityMiddle").empty();
							$("#communityRight").empty();
							$("#community").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#communityMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#communityRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#community").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
									$("#communityMiddle").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
									$("#communityRight").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstation").length > 0){
							$("#chnlorstation").empty();
							$("#chnlorstationMiddle").empty();
							$("#chnlorstationRight").empty();
							$("#chnlorstation").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#chnlorstationMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#chnlorstationRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstation").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
									$("#chnlorstationMiddle").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
									$("#chnlorstationRight").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						
					}
					
				}
				
			})
			
		}
		
	}
	
	if(selectId == 'community'){
		if(orgId != undefined){
			if($("#cityCompany").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							$("#communityMiddle").val(orgId);
							$("#communityRight").val(orgId);
							if($("#chnlorstation").length > 0){
								$("#chnlorstation").empty();
								$("#chnlorstationMiddle").empty();
								$("#chnlorstationRight").empty();
								$("#chnlorstation").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#chnlorstationMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								$("#chnlorstationRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstation").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
										$("#chnlorstationMiddle").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
										$("#chnlorstationRight").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
						}
						
					}
					
				})
				if(lineOrBar == 'bar'){
					rankingBar(orgId)
				}else{
					doubleLine(orgId)
				}
			}else{
				$('#community').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			var villageId = $('#village').find("option:selected").attr('id')
			if(villageId == undefined){
				villageId = $('#gridAll').find("option:selected").attr('id')
			}
			if(villageId == undefined){
				var villageId = $('#saleDept').find("option:selected").attr('id')
			}
			if(villageId == undefined){
				villageId = $('#areaCompany').find("option:selected").attr('id')
			}
			if(villageId == undefined){
				villageId = $('#cityCompany').find("option:selected").attr('id')
			}
			if(lineOrBar == 'bar'){
				rankingBar(village)
			}else{
				doubleLine(village)
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:villageId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#communityMiddle").val('请选择...')
						$("#communityRight").val('请选择...')
						if($("#chnlorstation").length > 0){
							$("#chnlorstation").empty();
							$("#chnlorstationMiddle").empty();
							$("#chnlorstationRight").empty();
							$("#chnlorstation").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#chnlorstationMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#chnlorstationRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstation").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
									$("#chnlorstationMiddle").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
									$("#chnlorstationRight").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						
					}
					
				}
				
			})
			
		
			
		}
		
	}
	
	if(selectId == 'chnlorstation'){
		if(orgId != undefined){
			if($("#cityCompany").find("option:selected").attr('id') != undefined){
				$('#chnlorstationMiddle').val(orgId);
				$('#chnlorstationRight').val(orgId);
				doubleLine(orgId)
			}else{
				$('#chnlorstation').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			$('#chnlorstationMiddle').val('请选择...')
			$('#chnlorstationRight').val('请选择...')
		}
		
	}
	if(orgLevel != '' && orgLevel != null){
		initResultMsg(orgLevel,null);
	}else{
		initResultMsg(null,selectId);
	}
}

var changeSelectOrgMiddle = function(option){
	var orgId = $(option).find("option:selected").attr('id')
	var selectId = $(option).attr('id')
	var orgLevel = '';
	if(orgId != undefined){
		$.ajax({
			url : $.cxt + '/kpi/getOrgLevelAndLevelMax',
			data : {orgId : orgId},
			type : 'POST',
			async : false,
			success : function(data){
				var json = JSON.parse(data)
				if(json.code == '0'){
					orgLevel = json.data.orgLevel
				}
			}
		})
	}
	if(selectId == 'cityCompanyMiddle'){
		if(orgId != undefined){
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:orgId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#areaCompanyMiddle").empty();
						$("#areaCompanyMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#saleDeptMiddle").empty();
						$("#saleDeptMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAllMiddle").empty();
						$("#gridAllMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						if($("#villageMiddle").length > 0){
							$("#villageMiddle").empty();
							$("#villageMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.villageInfo.length;i++){
								if(json.data.villageInfo[i] != null){
									$("#villageMiddle").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
								}
							}
						}
						if($("#communityMiddle").length > 0){
							$("#communityMiddle").empty();
							$("#communityMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#communityMiddle").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstationMiddle").length > 0){
							$("#chnlorstationMiddle").empty();
							$("#chnlorstationMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstationMiddle").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						
						for(var i=0;i<json.data.areaInfo.length;i++){
							if(json.data.areaInfo[i] != null){
								$("#areaCompanyMiddle").append(
										$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
								)
							}
						}
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								$("#saleDeptMiddle").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAllMiddle").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
						initEmap(orgId);
					}
				}
				
			})
		}else{
			$(".orgClassMiddle").empty();
			var orgId = $(".orgId").val()
			$.ajax({
				url : $.cxt + "/kpi/initSeletOrg",
				type: "POST",
				data:{
					orgId:orgId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#cityCompanyMiddle").empty();
						$("#cityCompanyMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#areaCompanyMiddle").empty();
						$("#areaCompanyMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#saleDeptMiddle").empty();
						$("#saleDeptMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAllMiddle").empty();
						$("#gridAllMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇/街道：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/社区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','chnlorstationMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.cityInfo.length;i++){
							if(json.data.cityInfo[i] != null){
								$("#cityCompanyMiddle").append(
										$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
								)
							}
						}
						for(var i=0;i<json.data.areaInfo.length;i++){
							if(json.data.areaInfo[i] != null){
								$("#areaCompanyMiddle").append(
										$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
								)
							}
						}
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								if(json.data.saleDeptInfo[i].saleDeptName != ''){	
									$("#saleDeptMiddle").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
								}
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAllMiddle").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#villageMiddle").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
						for(var i=0;i<json.data.communityInfo.length;i++){
							if(json.data.communityInfo[i] != null){
								$("#communityMiddle").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
							}
						}
						for(var i=0;i<json.data.chnlorstationInfo.length;i++){
							if(json.data.chnlorstationInfo[i] != null){
								$("#chnlorstationMiddle").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
							}
						}
					}
				}
			})
			initEmap('1');
		}
	}
	
	if(selectId == 'areaCompanyMiddle'){
		if(orgId != undefined){
			if($("#cityCompanyMiddle").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							$("#saleDeptMiddle").empty();
							$("#saleDeptMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#gridAllMiddle").empty();
							$("#gridAllMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							if($("#villageMiddle").length > 0){
								$("#villageMiddle").empty();
								$("#villageMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.villageInfo.length;i++){
									if(json.data.villageInfo[i] != null){
										$("#villageMiddle").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
									}
								}
							}
							if($("#communityMiddle").length > 0){
								$("#communityMiddle").empty();
								$("#communityMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.communityInfo.length;i++){
									if(json.data.communityInfo[i] != null){
										$("#communityMiddle").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
									}
								}
							}
							if($("#chnlorstationMiddle").length > 0){
								$("#chnlorstationMiddle").empty();
								$("#chnlorstationMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstationMiddle").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
							for(var i=0;i<json.data.saleDeptInfo.length;i++){
								if(json.data.saleDeptInfo[i] != null){
									$("#saleDeptMiddle").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
								}
							}
							for(var i=0;i<json.data.gridInfo.length;i++){
								if(json.data.gridInfo[i] != null){
									$("#gridAllMiddle").append(
											$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
									)
								}
							}
							
						}
						
					}
					
				})
				initEmap(orgId);
			}else{
				$('#areaCompanyMiddle').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
		}else{
			var cityId = $('#cityCompanyMiddle').find("option:selected").attr('id')
			initEmap(cityId);
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:cityId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#saleDeptMiddle").empty();
						$("#saleDeptMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAllMiddle").empty();
						$("#gridAllMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						if($("#villageMiddle").length > 0){
							$("#villageMiddle").empty();
							$("#villageMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.villageInfo.length;i++){
								if(json.data.villageInfo[i] != null){
									$("#villageMiddle").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
								}
							}
						}
						if($("#communityMiddle").length > 0){
							$("#communityMiddle").empty();
							$("#communityMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#communityMiddle").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstationMiddle").length > 0){
							$("#chnlorstationMiddle").empty();
							$("#chnlorstationMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstationMiddle").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								$("#saleDeptMiddle").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAllMiddle").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
						
					}
					
				}
				
			})
		}
	}
	
	if(selectId == 'saleDeptMiddle'){
		if(orgId != undefined){
			if($("#cityCompanyMiddle").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							$("#gridAllMiddle").empty();
							$("#gridAllMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							if($("#villageMiddle").length > 0){
								$("#villageMiddle").empty();
								$("#villageMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.villageInfo.length;i++){
									if(json.data.villageInfo[i] != null){
										$("#villageMiddle").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
									}
								}
							}
							if($("#communityMiddle").length > 0){
								$("#communityMiddle").empty();
								$("#communityMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.communityInfo.length;i++){
									if(json.data.communityInfo[i] != null){
										$("#communityMiddle").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
									}
								}
							}
							if($("#chnlorstationMiddle").length > 0){
								$("#chnlorstationMiddle").empty();
								$("#chnlorstationMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstationMiddle").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
							for(var i=0;i<json.data.gridInfo.length;i++){
								if(json.data.gridInfo[i] != null){
									$("#gridAllMiddle").append(
											$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
									)
								}
							}
							
						}
						
					}
					
				})
			}else{
				$('#saleDeptMiddle').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			var areaId = $('#areaCompanyMiddle').find("option:selected").attr('id')
			if(areaId == undefined){
				areaId = $('#cityCompanyMiddle').find("option:selected").attr('id')
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:areaId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#gridAllMiddle").empty();
						$("#gridAllMiddle").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						if($("#villageMiddle").length > 0){
							$("#villageMiddle").empty();
							$("#villageMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.villageInfo.length;i++){
								if(json.data.villageInfo[i] != null){
									$("#villageMiddle").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
								}
							}
						}
						if($("#communityMiddle").length > 0){
							$("#communityMiddle").empty();
							$("#communityMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#communityMiddle").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstationMiddle").length > 0){
							$("#chnlorstationMiddle").empty();
							$("#chnlorstationMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstationMiddle").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAllMiddle").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
						
					}
					
				}
				
			})
			
		}
		
	}
	
	if(selectId == 'gridAllMiddle'){
		if(orgId != undefined){
			if($("#cityCompanyMiddle").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							if($("#villageMiddle").length > 0){
								$("#villageMiddle").empty();
								$("#villageMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.villageInfo.length;i++){
									if(json.data.villageInfo[i] != null){
										$("#villageMiddle").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
									}
								}
							}
							if($("#communityMiddle").length > 0){
								$("#communityMiddle").empty();
								$("#communityMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.communityInfo.length;i++){
									if(json.data.communityInfo[i] != null){
										$("#communityMiddle").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
									}
								}
							}
							if($("#chnlorstationMiddle").length > 0){
								$("#chnlorstationMiddle").empty();
								$("#chnlorstationMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstationMiddle").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
						}
						
					}
					
				})
				initEmap(orgId)
			}else{
				$('#gridAllMiddle').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			var saleDeptId = $('#saleDeptMiddle').find("option:selected").attr('id')
			if(saleDeptId == undefined){
				saleDeptId = $('#areaCompanyMiddle').find("option:selected").attr('id')
			}
			if(saleDeptId == undefined){
				saleDeptId = $('#cityCompanyMiddle').find("option:selected").attr('id')
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:saleDeptId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						if($("#villageMiddle").length > 0){
							$("#villageMiddle").empty();
							$("#villageMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.villageInfo.length;i++){
								if(json.data.villageInfo[i] != null){
									$("#villageMiddle").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
								}
							}
						}
						if($("#communityMiddle").length > 0){
							$("#communityMiddle").empty();
							$("#communityMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#communityMiddle").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstationMiddle").length > 0){
							$("#chnlorstationMiddle").empty();
							$("#chnlorstationMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstationMiddle").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						
					}
					
				}
				
			})
			
			var areaMapId = $("#areaCompanyMiddle").find("option:selected").attr('id')
			if(areaMapId == undefined){
				areaMapId = $("#cityCompanyMiddle").find("option:selected").attr('id')
			}
			initEmap(areaMapId)
		}
		
	}
	
	if(selectId == 'villageMiddle'){
		if(orgId != undefined){
			if($("#cityCompanyMiddle").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							if($("#communityMiddle").length > 0){
								$("#communityMiddle").empty();
								$("#communityMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.communityInfo.length;i++){
									if(json.data.communityInfo[i] != null){
										$("#communityMiddle").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
									}
								}
							}
							if($("#chnlorstationMiddle").length > 0){
								$("#chnlorstationMiddle").empty();
								$("#chnlorstationMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstationMiddle").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
						}
						
					}
					
				})
			}else{
				$('#villageMiddle').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			var gridCode = $('#gridAllMiddle').find("option:selected").attr('id')
			if(gridCode == undefined){
				var gridCode = $('#saleDeptMiddle').find("option:selected").attr('id')
			}
			if(gridCode == undefined){
				gridCode = $('#areaCompanyMiddle').find("option:selected").attr('id')
			}
			if(gridCode == undefined){
				gridCode = $('#cityCompanyMiddle').find("option:selected").attr('id')
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:gridCode
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						if($("#communityMiddle").length > 0){
							$("#communityMiddle").empty();
							$("#communityMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#communityMiddle").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstationMiddle").length > 0){
							$("#chnlorstationMiddle").empty();
							$("#chnlorstationMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstationMiddle").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						
					}
					
				}
				
			})
			
		}
		
	}
	
	if(selectId == 'communityMiddle'){
		if(orgId != undefined){
			if($("#cityCompanyMiddle").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							if($("#chnlorstationMiddle").length > 0){
								$("#chnlorstationMiddle").empty();
								$("#chnlorstationMiddle").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstationMiddle").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
						}
						
					}
					
				})
			}else{
				$('#communityMiddle').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			var villageId = $('#villageMiddle').find("option:selected").attr('id')
			if(villageId == undefined){
				villageId = $('#gridAllMiddle').find("option:selected").attr('id')
			}
			if(villageId == undefined){
				var villageId = $('#saleDeptMiddle').find("option:selected").attr('id')
			}
			if(villageId == undefined){
				villageId = $('#areaCompanyMiddle').find("option:selected").attr('id')
			}
			if(villageId == undefined){
				villageId = $('#cityCompanyMiddle').find("option:selected").attr('id')
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:villageId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						if($("#chnlorstationMiddle").length > 0){
							$("#chnlorstationMiddle").empty();
							$("#chnlorstationMiddle").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstationMiddle").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						
					}
					
				}
				
			})
			
		
			
		}
		
	}
	
	if(selectId == 'chnlorstationMiddle'){
		if(orgId != undefined){
			if($("#cityCompanyMiddle").find("option:selected").attr('id') != undefined){
				
			}else{
				$('#chnlorstationMiddle').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			
		}
		
	}
	

}

var changeSelectOrgRight = function(option){

	var orgId = $(option).find("option:selected").attr('id')
	var selectId = $(option).attr('id')
	var orgLevel = '';
	if(orgId != undefined){
		$.ajax({
			url : $.cxt + '/kpi/getOrgLevelAndLevelMax',
			data : {orgId : orgId},
			type : 'POST',
			async : false,
			success : function(data){
				var json = JSON.parse(data)
				if(json.code == '0'){
					orgLevel = json.data.orgLevel
				}
			}
		})
	}
	if(selectId == 'cityCompanyRight'){
		if(orgId != undefined){
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:orgId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#areaCompanyRight").empty();
						$("#areaCompanyRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#saleDeptRight").empty();
						$("#saleDeptRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAllRight").empty();
						$("#gridAllRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						if($("#villageRight").length > 0){
							$("#villageRight").empty();
							$("#villageRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.villageInfo.length;i++){
								if(json.data.villageInfo[i] != null){
									$("#villageRight").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
								}
							}
						}
						if($("#communityRight").length > 0){
							$("#communityRight").empty();
							$("#communityRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#communityRight").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstationRight").length > 0){
							$("#chnlorstationRight").empty();
							$("#chnlorstationRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstationRight").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						
						for(var i=0;i<json.data.areaInfo.length;i++){
							if(json.data.areaInfo[i] != null){
								$("#areaCompanyRight").append(
										$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
								)
							}
						}
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								$("#saleDeptRight").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAllRight").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
						if(lineOrBar == 'bar'){
							rankingBar(orgId)
						}else{
							doubleLine(orgId)
						}
						
					}
				}
				
			})
		}else{
			$(".orgClassRight").empty();
			var orgId = $(".orgId").val()
			$.ajax({
				url : $.cxt + "/kpi/initSeletOrg",
				type: "POST",
				data:{
					orgId:orgId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#cityCompanyRight").empty();
						$("#cityCompanyRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#areaCompanyRight").empty();
						$("#areaCompanyRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#saleDeptRight").empty();
						$("#saleDeptRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAllRight").empty();
						$("#gridAllRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇/街道：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/社区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','chnlorstationMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.cityInfo.length;i++){
							if(json.data.cityInfo[i] != null){
								$("#cityCompanyRight").append(
										$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
								)
							}
						}
						for(var i=0;i<json.data.areaInfo.length;i++){
							if(json.data.areaInfo[i] != null){
								$("#areaCompanyRight").append(
										$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
								)
							}
						}
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								if(json.data.saleDeptInfo[i].saleDeptName != ''){	
									$("#saleDeptRight").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
								}
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAllRight").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#villageRight").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
						for(var i=0;i<json.data.communityInfo.length;i++){
							if(json.data.communityInfo[i] != null){
								$("#communityRight").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
							}
						}
						for(var i=0;i<json.data.chnlorstationInfo.length;i++){
							if(json.data.chnlorstationInfo[i] != null){
								$("#chnlorstationRight").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
							}
						}
					}
				}
			})
			if(lineOrBar == 'bar'){
				rankingBar(orgId)
			}else{
				doubleLine(orgId)
			}
		}
	}
	
	if(selectId == 'areaCompanyRight'){
		if(orgId != undefined){
			if($("#cityCompanyRight").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							$("#saleDeptRight").empty();
							$("#saleDeptRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							$("#gridAllRight").empty();
							$("#gridAllRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							if($("#villageRight").length > 0){
								$("#villageRight").empty();
								$("#villageRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.villageInfo.length;i++){
									if(json.data.villageInfo[i] != null){
										$("#villageRight").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
									}
								}
							}
							if($("#communityRight").length > 0){
								$("#communityRight").empty();
								$("#communityRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.communityInfo.length;i++){
									if(json.data.communityInfo[i] != null){
										$("#communityRight").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
									}
								}
							}
							if($("#chnlorstationRight").length > 0){
								$("#chnlorstationRight").empty();
								$("#chnlorstationRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstationRight").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
							for(var i=0;i<json.data.saleDeptInfo.length;i++){
								if(json.data.saleDeptInfo[i] != null){
									$("#saleDeptRight").append(
											$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
									)
								}
							}
							for(var i=0;i<json.data.gridInfo.length;i++){
								if(json.data.gridInfo[i] != null){
									$("#gridAllRight").append(
											$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
									)
								}
							}
							
						}
						
					}
					
				})
				if(lineOrBar == 'bar'){
					rankingBar(orgId)
				}else{
					doubleLine(orgId)
				}
			}else{
				$('#areaCompanyRight').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
		}else{
			var cityId = $('#cityCompanyRight').find("option:selected").attr('id')
			if(lineOrBar == 'bar'){
				rankingBar(cityId)
			}else{
				doubleLine(cityId)
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:cityId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#saleDeptRight").empty();
						$("#saleDeptRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						$("#gridAllRight").empty();
						$("#gridAllRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						if($("#villageRight").length > 0){
							$("#villageRight").empty();
							$("#villageRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.villageInfo.length;i++){
								if(json.data.villageInfo[i] != null){
									$("#villageRight").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
								}
							}
						}
						if($("#communityRight").length > 0){
							$("#communityRight").empty();
							$("#communityRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#communityRight").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstationRight").length > 0){
							$("#chnlorstationRight").empty();
							$("#chnlorstationRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstationRight").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						for(var i=0;i<json.data.saleDeptInfo.length;i++){
							if(json.data.saleDeptInfo[i] != null){
								$("#saleDeptRight").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAllRight").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
						
					}
					
				}
				
			})
		}
	}
	
	if(selectId == 'saleDeptRight'){
		if(orgId != undefined){
			if($("#cityCompanyRight").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							$("#gridAllRight").empty();
							$("#gridAllRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							if($("#villageRight").length > 0){
								$("#villageRight").empty();
								$("#villageRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.villageInfo.length;i++){
									if(json.data.villageInfo[i] != null){
										$("#villageRight").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
									}
								}
							}
							if($("#communityRight").length > 0){
								$("#communityRight").empty();
								$("#communityRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.communityInfo.length;i++){
									if(json.data.communityInfo[i] != null){
										$("#communityRight").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
									}
								}
							}
							if($("#chnlorstationRight").length > 0){
								$("#chnlorstationRight").empty();
								$("#chnlorstationRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstationRight").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
							for(var i=0;i<json.data.gridInfo.length;i++){
								if(json.data.gridInfo[i] != null){
									$("#gridAllRight").append(
											$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
									)
								}
							}
							
						}
						
					}
					
				})
				if(lineOrBar == 'bar'){
					rankingBar(orgId)
				}else{
					doubleLine(orgId)
				}
			}else{
				$('#saleDeptRight').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			var areaId = $('#areaCompanyRight').find("option:selected").attr('id')
			if(areaId == undefined){
				areaId = $('#cityCompanyRight').find("option:selected").attr('id')
			}
			if(lineOrBar == 'bar'){
				rankingBar(areaId)
			}else{
				doubleLine(areaId)
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:areaId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						$("#gridAllRight").empty();
						$("#gridAllRight").append(
								$("<option>"+'请选择...'+"</option>").val('请选择...')
						)
						if($("#villageRight").length > 0){
							$("#villageRight").empty();
							$("#villageRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.villageInfo.length;i++){
								if(json.data.villageInfo[i] != null){
									$("#villageRight").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
								}
							}
						}
						if($("#communityRight").length > 0){
							$("#communityRight").empty();
							$("#communityRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#communityRight").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstationRight").length > 0){
							$("#chnlorstationRight").empty();
							$("#chnlorstationRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstationRight").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						for(var i=0;i<json.data.gridInfo.length;i++){
							if(json.data.gridInfo[i] != null){
								$("#gridAllRight").append(
										$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
								)
							}
						}
						
					}
					
				}
				
			})
			
		}
		
	}
	
	if(selectId == 'gridAllRight'){
		if(orgId != undefined){
			if($("#cityCompanyRight").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							if($("#villageRight").length > 0){
								$("#villageRight").empty();
								$("#villageRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.villageInfo.length;i++){
									if(json.data.villageInfo[i] != null){
										$("#villageRight").append(
												$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
										)
									}
								}
							}
							if($("#communityRight").length > 0){
								$("#communityRight").empty();
								$("#communityRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.communityInfo.length;i++){
									if(json.data.communityInfo[i] != null){
										$("#communityRight").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
									}
								}
							}
							if($("#chnlorstationRight").length > 0){
								$("#chnlorstationRight").empty();
								$("#chnlorstationRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstationRight").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
						}
						
					}
					
				})
				if(lineOrBar == 'bar'){
					rankingBar(orgId)
				}else{
					doubleLine(orgId)
				}
			}else{
				$('#gridAllRight').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			var saleDeptId = $('#saleDeptRight').find("option:selected").attr('id')
			if(saleDeptId == undefined){
				saleDeptId = $('#areaCompanyRight').find("option:selected").attr('id')
			}
			if(saleDeptId == undefined){
				saleDeptId = $('#cityCompanyRight').find("option:selected").attr('id')
			}
			if(lineOrBar == 'bar'){
				rankingBar(saleDeptId)
			}else{
				doubleLine(saleDeptId)
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:saleDeptId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						if($("#villageRight").length > 0){
							$("#villageRight").empty();
							$("#villageRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.villageInfo.length;i++){
								if(json.data.villageInfo[i] != null){
									$("#villageRight").append(
											$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
									)
								}
							}
						}
						if($("#communityRight").length > 0){
							$("#communityRight").empty();
							$("#communityRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#communityRight").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstationRight").length > 0){
							$("#chnlorstationRight").empty();
							$("#chnlorstationRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstationRight").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						
					}
					
				}
				
			})
			
		}
		
	}
	
	if(selectId == 'villageRight'){
		if(orgId != undefined){
			if($("#cityCompanyRight").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							if($("#communityRight").length > 0){
								$("#communityRight").empty();
								$("#communityRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.communityInfo.length;i++){
									if(json.data.communityInfo[i] != null){
										$("#communityRight").append(
												$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
										)
									}
								}
							}
							if($("#chnlorstationRight").length > 0){
								$("#chnlorstationRight").empty();
								$("#chnlorstationRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstationRight").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
						}
						
					}
					
				})
				if(lineOrBar == 'bar'){
					rankingBar(orgId)
				}else{
					doubleLine(orgId)
				}
			}else{
				$('#villageRight').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			var gridCode = $('#gridAllRight').find("option:selected").attr('id')
			if(gridCode == undefined){
				var gridCode = $('#saleDeptRight').find("option:selected").attr('id')
			}
			if(gridCode == undefined){
				gridCode = $('#areaCompanyRight').find("option:selected").attr('id')
			}
			if(gridCode == undefined){
				gridCode = $('#cityCompanyRight').find("option:selected").attr('id')
			}
			if(lineOrBar == 'bar'){
				rankingBar(gridCode)
			}else{
				doubleLine(gridCode)
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:gridCode
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						if($("#communityRight").length > 0){
							$("#communityRight").empty();
							$("#communityRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.communityInfo.length;i++){
								if(json.data.communityInfo[i] != null){
									$("#communityRight").append(
											$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
									)
								}
							}
						}
						if($("#chnlorstationRight").length > 0){
							$("#chnlorstationRight").empty();
							$("#chnlorstationRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstationRight").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						
					}
					
				}
				
			})
			
		}
		
	}
	
	if(selectId == 'communityRight'){
		if(orgId != undefined){
			if($("#cityCompanyRight").find("option:selected").attr('id') != undefined){
				$.ajax({
					url : $.cxt + '/kpi/getChildrenOrg',
					type: "POST",
					data:{
						orgId:orgId
					},
					async : false,
					success : function(data) {
						var json  = JSON.parse(data)
						if(json.code == '0'){
							if($("#chnlorstationRight").length > 0){
								$("#chnlorstationRight").empty();
								$("#chnlorstationRight").append(
										$("<option>"+'请选择...'+"</option>").val('请选择...')
								)
								for(var i=0;i<json.data.chnlorstationInfo.length;i++){
									if(json.data.chnlorstationInfo[i] != null){
										$("#chnlorstationRight").append(
												$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
										)
									}
								}
							}
							
						}
						
					}
					
				})
				if(lineOrBar == 'bar'){
					rankingBar(orgId)
				}else{
					doubleLine(orgId)
				}
			}else{
				$('#communityRight').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			var villageId = $('#villageRight').find("option:selected").attr('id')
			if(villageId == undefined){
				villageId = $('#gridAllRight').find("option:selected").attr('id')
			}
			if(villageId == undefined){
				var villageId = $('#saleDeptRight').find("option:selected").attr('id')
			}
			if(villageId == undefined){
				villageId = $('#areaCompanyRight').find("option:selected").attr('id')
			}
			if(villageId == undefined){
				villageId = $('#cityCompanyRight').find("option:selected").attr('id')
			}
			if(lineOrBar == 'bar'){
				rankingBar(village)
			}else{
				doubleLine(village)
			}
			$.ajax({
				url : $.cxt + '/kpi/getChildrenOrg',
				type: "POST",
				data:{
					orgId:villageId
				},
				async : false,
				success : function(data) {
					var json  = JSON.parse(data)
					if(json.code == '0'){
						if($("#chnlorstationRight").length > 0){
							$("#chnlorstationRight").empty();
							$("#chnlorstationRight").append(
									$("<option>"+'请选择...'+"</option>").val('请选择...')
							)
							for(var i=0;i<json.data.chnlorstationInfo.length;i++){
								if(json.data.chnlorstationInfo[i] != null){
									$("#chnlorstationRight").append(
											$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
									)
								}
							}
						}
						
					}
					
				}
				
			})
			
		
			
		}
		
	}
	
	if(selectId == 'chnlorstationRight'){
		if(orgId != undefined){
			if($("#cityCompanyRight").find("option:selected").attr('id') != undefined){
				doubleLine(orgId)
			}else{
				$('#chnlorstationRight').val('请选择...')
				messageConfirm('请选择地市公司！')
			}
			
		}else{
			
		}
		
	}

}

var initSeletOrg = function(){
	var orgId = $(".orgId").val();
	var orgLevel = '';
	var orgLevelMax = '';
	$.ajax({
		url : $.cxt + "/kpi/getOrgLevelAndLevelMax",
		type: "POST",
		data:{
			orgId:orgId
		},
		async : false,
		success : function(data) {
			var json  = JSON.parse(data)
			if(json.code == '0'){
				orgLevel = json.data.orgLevel
				orgLevelMax = json.msg
			}
			
		}
		
	})
	$.ajax({
		url : $.cxt + "/kpi/initSeletOrg",
		type: "POST",
		data:{
			orgId:orgId
		},
		async : false,
		success : function(data) {
			var json  = JSON.parse(data)
			if(json.code == '0'){
				if(orgLevel == '1'){
					$("#cityCompany").empty();
					$("#cityCompany").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#cityCompanyMiddle").empty();
					$("#cityCompanyMiddle").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#cityCompanyRight").empty();
					$("#cityCompanyRight").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#areaCompany").empty();
					$("#areaCompany").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#areaCompanyMiddle").empty();
					$("#areaCompanyMiddle").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#areaCompanyRight").empty();
					$("#areaCompanyRight").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#saleDept").empty();
					$("#saleDept").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#saleDeptMiddle").empty();
					$("#saleDeptMiddle").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#saleDeptRight").empty();
					$("#saleDeptRight").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAll").empty();
					$("#gridAll").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAllMiddle").empty();
					$("#gridAllMiddle").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAllRight").empty();
					$("#gridAllRight").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$(".orgClass").append(
							$("<div></div>").addClass("kpi-select").append(
									$("<span>"+'乡镇/街道：'+"</span>")
							).append(
									$("<select></select>").addClass("kpiSelect").attr('id','village').attr('onchange','changeSelectOrg(this)').append(
											$("<option>"+'请选择...'+"</option>").val('请选择...')
									)
							)
					) 
					$(".orgClassMiddle").append(
							$("<div></div>").addClass("middle-select").append(
									$("<span>"+'乡镇/街道：'+"</span>")
							).append(
									$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
											$("<option>"+'请选择...'+"</option>").val('请选择...')
									)
							)
					)
					$(".orgClassRight").append(
							$("<div></div>").addClass("middle-select").append(
									$("<span>"+'乡镇/街道：'+"</span>")
							).append(
									$("<select></select>").addClass("middleSelect").attr('id','villageRight').attr('onchange','changeSelectOrgRight(this)').append(
											$("<option>"+'请选择...'+"</option>").val('请选择...')
									)
							)
					)
					$(".orgClass").append(
							$("<div></div>").addClass("kpi-select").append(
									$("<span>"+'村/社区：'+"</span>")
							).append(
									$("<select></select>").addClass("kpiSelect").attr('id','community').attr('onchange','changeSelectOrg(this)').append(
											$("<option>"+'请选择...'+"</option>").val('请选择...')
									)
							)
					)
					$(".orgClassMiddle").append(
							$("<div></div>").addClass("middle-select").append(
									$("<span>"+'村/社区：'+"</span>")
							).append(
									$("<select></select>").addClass("middleSelect").attr('id','communityMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
											$("<option>"+'请选择...'+"</option>").val('请选择...')
									)
							)
					)
					$(".orgClassRight").append(
							$("<div></div>").addClass("middle-select").append(
									$("<span>"+'村/社区：'+"</span>")
							).append(
									$("<select></select>").addClass("middleSelect").attr('id','communityRight').attr('onchange','changeSelectOrgRight(this)').append(
											$("<option>"+'请选择...'+"</option>").val('请选择...')
									)
							)
					)
					$(".orgClass").append(
							$("<div></div>").addClass("kpi-select").append(
									$("<span>"+'渠道/基站：'+"</span>")
							).append(
									$("<select></select>").addClass("kpiSelect").attr('id','chnlorstation').attr('onchange','changeSelectOrg(this)').append(
											$("<option>"+'请选择...'+"</option>").val('请选择...')
									)
							)
					)
					$(".orgClassMiddle").append(
							$("<div></div>").addClass("middle-select").append(
									$("<span>"+'渠道/基站：'+"</span>")
							).append(
									$("<select></select>").addClass("middleSelect").attr('id','chnlorstationMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
											$("<option>"+'请选择...'+"</option>").val('请选择...')
									)
							)
					)
					$(".orgClassRight").append(
							$("<div></div>").addClass("middle-select").append(
									$("<span>"+'渠道/基站：'+"</span>")
							).append(
									$("<select></select>").addClass("middleSelect").attr('id','chnlorstationRight').attr('onchange','changeSelectOrgRight(this)').append(
											$("<option>"+'请选择...'+"</option>").val('请选择...')
									)
							)
					)
					for(var i=0;i<json.data.cityInfo.length;i++){
						if(json.data.cityInfo[i] != null){
							$("#cityCompany").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
							$("#cityCompanyMiddle").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
							$("#cityCompanyRight").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
						}
					}
					for(var i=0;i<json.data.areaInfo.length;i++){
						if(json.data.areaInfo[i] != null){
							$("#areaCompany").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
							$("#areaCompanyMiddle").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
							$("#areaCompanyRight").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
						}
					}
					for(var i=0;i<json.data.saleDeptInfo.length;i++){
						if(json.data.saleDeptInfo[i] != null){
							if(json.data.saleDeptInfo[i].saleDeptName != ''){	
								$("#saleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptMiddle").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptRight").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
					}
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridAll").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
							$("#gridAllMiddle").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
							$("#gridAllRight").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
					for(var i=0;i<json.data.villageInfo.length;i++){
						if(json.data.villageInfo[i] != null){
							$("#village").append(
									$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
							)
							$("#villageMiddle").append(
									$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
							)
							$("#villageRight").append(
									$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
							)
						}
					}
					for(var i=0;i<json.data.communityInfo.length;i++){
						if(json.data.communityInfo[i] != null){
							$("#community").append(
									$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
							)
							$("#communityMiddle").append(
									$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
							)
							$("#communityRight").append(
									$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
							)
						}
					}
					for(var i=0;i<json.data.chnlorstationInfo.length;i++){
						if(json.data.chnlorstationInfo[i] != null){
							$("#chnlorstation").append(
									$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
							)
							$("#chnlorstationMiddle").append(
									$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
							)
							$("#chnlorstationRight").append(
									$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
							)
						}
					}
				}else if(orgLevel == '2'){
					$("#areaCompanyMiddle").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#areaCompanyRight").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#saleDept").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#saleDeptMiddle").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#saleDeptRight").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAll").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAllMiddle").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAllRight").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<json.data.cityInfo.length;i++){
						if(json.data.cityInfo[i] != null){
							$("#cityCompany").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
							$("#cityCompanyMiddle").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
							$("#cityCompanyRight").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
						}
					}
					for(var i=0;i<json.data.areaInfo.length;i++){
						if(json.data.areaInfo[i] != null){
							$("#areaCompany").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
							$("#areaCompanyMiddle").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
							$("#areaCompanyRight").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
						}
					}
					for(var i=0;i<json.data.saleDeptInfo.length;i++){
						if(json.data.saleDeptInfo[i] != null){
							if(json.data.saleDeptInfo[i].saleDeptName != ''){	
								$("#saleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptMiddle").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptRight").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
					}
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridAll").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
							$("#gridAllMiddle").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
							$("#gridAllRight").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
					if(orgLevelMax == '6'){
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','village').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#village").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageMiddle").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageRight").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
					}
					if(orgLevelMax == '7'){
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','village').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','community').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#village").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageMiddle").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageRight").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
						for(var i=0;i<json.data.communityInfo.length;i++){
							if(json.data.communityInfo[i] != null){
								$("#community").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityMiddle").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityRight").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
							}
						}
					}
					if(orgLevelMax == '8'){
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','village').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','community').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<select>"+'请选择...'+"</select>").val('请选择...')
										)
								)
						)
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','chnlorstation').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','vchnlorstationMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','vchnlorstationRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#village").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageMiddle").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageRight").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
						for(var i=0;i<json.data.communityInfo.length;i++){
							if(json.data.communityInfo[i] != null){
								$("#community").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityMiddle").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityRight").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
							}
						}
						for(var i=0;i<json.data.chnlorstationInfo.length;i++){
							if(json.data.chnlorstationInfo[i] != null){
								$("#chnlorstation").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
								$("#chnlorstationMiddle").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
								$("#chnlorstationRight").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
							}
						}
					}
					
				}else if(orgLevel == '3'){
					$("#saleDept").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#saleDeptMiddle").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#saleDeptRight").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAll").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAllMiddle").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAllRight").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					
					for(var i=0;i<json.data.cityInfo.length;i++){
						if(json.data.cityInfo[i] != null){
							$("#cityCompany").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
							$("#cityCompanyMiddle").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
							$("#cityCompanyRight").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
						}
					}
					for(var i=0;i<json.data.areaInfo.length;i++){
						if(json.data.areaInfo[i] != null){
							$("#areaCompany").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
							$("#areaCompanyMiddle").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
							$("#areaCompanyRight").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
						}
					}
					for(var i=0;i<json.data.saleDeptInfo.length;i++){
						if(json.data.saleDeptInfo[i] != null){
							if(json.data.saleDeptInfo[i].saleDeptName != ''){	
								$("#saleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptMiddle").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptRight").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
					}
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridAll").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
							$("#gridAllMiddle").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
							$("#gridAllRight").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
					if(orgLevelMax == '6'){
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','village').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#village").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageMiddle").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageRight").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
					}
					if(orgLevelMax == '7'){
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','village').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','community').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#village").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageMiddle").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageRight").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
						for(var i=0;i<json.data.communityInfo.length;i++){
							if(json.data.communityInfo[i] != null){
								$("#community").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityMiddle").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityRight").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
							}
						}
					}
					if(orgLevelMax == '8'){
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','village').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','community').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','chnlorstation').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','vchnlorstationMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','vchnlorstationRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#village").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageMiddle").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageRight").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
						for(var i=0;i<json.data.communityInfo.length;i++){
							if(json.data.communityInfo[i] != null){
								$("#community").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityMiddle").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityRight").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
							}
						}
						for(var i=0;i<json.data.chnlorstationInfo.length;i++){
							if(json.data.chnlorstationInfo[i] != null){
								$("#chnlorstation").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
								$("#chnlorstationMiddle").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
								$("#chnlorstationRight").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
							}
						}
					}
					
				}else if(orgLevel == '4'){
					for(var i=0;i<json.data.cityInfo.length;i++){
						if(json.data.cityInfo[i] != null){
							$("#cityCompany").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
							$("#cityCompanyMiddle").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
							$("#cityCompanyRight").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
						}
					}
					for(var i=0;i<json.data.areaInfo.length;i++){
						if(json.data.areaInfo[i] != null){
							$("#areaCompany").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
							$("#areaCompanyMiddle").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
							$("#areaCompanyRight").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
						}
					}
					for(var i=0;i<json.data.saleDeptInfo.length;i++){
						if(json.data.saleDeptInfo[i] != null){
							if(json.data.saleDeptInfo[i].saleDeptName != ''){	
								$("#saleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptMiddle").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptRight").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
					}
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridAll").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
							$("#gridAllMiddle").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
							$("#gridAllRight").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
					if(orgLevelMax == '6'){
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','village').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<select>"+'请选择...'+"</select>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#village").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageMiddle").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageRight").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
					}
					if(orgLevelMax == '7'){
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','village').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','community').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#village").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageMiddle").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageRight").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
						for(var i=0;i<json.data.communityInfo.length;i++){
							if(json.data.communityInfo[i] != null){
								$("#community").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityMiddle").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityRight").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
							}
						}
					}
					if(orgLevelMax == '8'){
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','village').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','community').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','chnlorstation').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','vchnlorstationMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','vchnlorstationRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#village").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageMiddle").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageRight").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
						for(var i=0;i<json.data.communityInfo.length;i++){
							if(json.data.communityInfo[i] != null){
								$("#community").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityMiddle").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityRight").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
							}
						}
						for(var i=0;i<json.data.chnlorstationInfo.length;i++){
							if(json.data.chnlorstationInfo[i] != null){
								$("#chnlorstation").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
								$("#chnlorstationMiddle").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
								$("#chnlorstationRight").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
							}
						}
					}
				}else if(orgLevel == '5'){
					$("#gridAll").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAllMiddle").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					$("#gridAllRight").append(
							$("<option>"+'请选择...'+"</option>").val('请选择...')
					)
					for(var i=0;i<json.data.cityInfo.length;i++){
						if(json.data.cityInfo[i] != null){
							$("#cityCompany").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
							$("#cityCompanyMiddle").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
							$("#cityCompanyRight").append(
									$("<option>"+json.data.cityInfo[i].cityName+"</option>").val(json.data.cityInfo[i].cityId).attr("id",json.data.cityInfo[i].cityId)
							)
						}
					}
					for(var i=0;i<json.data.areaInfo.length;i++){
						if(json.data.areaInfo[i] != null){
							$("#areaCompany").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
							$("#areaCompanyMiddle").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
							$("#areaCompanyRight").append(
									$("<option>"+json.data.areaInfo[i].areaName+"</option>").val(json.data.areaInfo[i].areaId).attr("id",json.data.areaInfo[i].areaId)
							)
						}
					}
					for(var i=0;i<json.data.saleDeptInfo.length;i++){
						if(json.data.saleDeptInfo[i] != null){
							if(json.data.saleDeptInfo[i].saleDeptName != ''){	
								$("#saleDept").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptMiddle").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
								$("#saleDeptRight").append(
										$("<option>"+json.data.saleDeptInfo[i].saleDeptName+"</option>").val(json.data.saleDeptInfo[i].saleDeptCode).attr("id",json.data.saleDeptInfo[i].saleDeptCode)
								)
							}
						}
					}
					for(var i=0;i<json.data.gridInfo.length;i++){
						if(json.data.gridInfo[i] != null){
							$("#gridAll").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
							$("#gridAllMiddle").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
							$("#gridAllRight").append(
									$("<option>"+json.data.gridInfo[i].gridName+"</option>").val(json.data.gridInfo[i].gridCode).attr("id",json.data.gridInfo[i].gridCode)
							)
						}
					}
					if(orgLevelMax == '6'){
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','village').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#village").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageMiddle").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageRight").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
					}
					if(orgLevelMax == '7'){
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','village').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','community').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#village").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageMiddle").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageRight").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
						for(var i=0;i<json.data.communityInfo.length;i++){
							if(json.data.communityInfo[i] != null){
								$("#community").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityMiddle").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityRight").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
							}
						}
					}
					if(orgLevelMax == '8'){
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','village').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'乡镇：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','villageRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','community').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'村/小区：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','communityRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClass").append(
								$("<div></div>").addClass("kpi-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("kpiSelect").attr('id','chnlorstation').attr('onchange','changeSelectOrg(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassMiddle").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','vchnlorstationMiddle').attr('onchange','changeSelectOrgMiddle(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						$(".orgClassRight").append(
								$("<div></div>").addClass("middle-select").append(
										$("<span>"+'渠道/基站：'+"</span>")
								).append(
										$("<select></select>").addClass("middleSelect").attr('id','vchnlorstationRight').attr('onchange','changeSelectOrgRight(this)').append(
												$("<option>"+'请选择...'+"</option>").val('请选择...')
										)
								)
						)
						for(var i=0;i<json.data.villageInfo.length;i++){
							if(json.data.villageInfo[i] != null){
								$("#village").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageMiddle").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
								$("#villageRight").append(
										$("<option>"+json.data.villageInfo[i].villageName+"</option>").val(json.data.villageInfo[i].villageId).attr("id",json.data.villageInfo[i].villageId)
								)
							}
						}
						for(var i=0;i<json.data.communityInfo.length;i++){
							if(json.data.communityInfo[i] != null){
								$("#community").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityMiddle").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
								$("#communityRight").append(
										$("<option>"+json.data.communityInfo[i].communityName+"</option>").val(json.data.communityInfo[i].communityId).attr("id",json.data.communityInfo[i].communityId)
								)
							}
						}
						for(var i=0;i<json.data.chnlorstationInfo.length;i++){
							if(json.data.chnlorstationInfo[i] != null){
								$("#chnlorstation").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
								$("#chnlorstationMiddle").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
								$("#chnlorstationRight").append(
										$("<option>"+json.data.chnlorstationInfo[i].chnlorstationName+"</option>").val(json.data.chnlorstationInfo[i].chnlorstationId).attr("id",json.data.chnlorstationInfo[i].chnlorstationId)
								)
							}
						}
					}
				}
			}
		}
	})
}

var addKpiDefaultColor = function(){
	var index = 0;
	var indexRight = 0;
	$(".inputNameMiddle span").each(function(){
		if($(this).css('color') == 'rgb(255, 0, 0)'){
			index++;
		}
	})
	$(".inputName span").each(function(){
		if($(this).css('color') == 'rgb(255, 0, 0)'){
			indexRight++;
		}
	})
	if(index == 0){
		$(".inputNameMiddle span").first().css('color','rgb(255, 0, 0)').css("font-weight",'bold')
	}else{
		
	}
	getTopFive(publicOrgId)
}

var addKpiDefaultColorRight = function(){
	var indexRight = 0;
	$(".inputName span").each(function(){
		if($(this).css('color') == 'rgb(255, 0, 0)'){
			indexRight++;
		}
	})
	if(indexRight == 0){
		$(".inputName span").first().css('color','rgb(255, 0, 0)').css("font-weight",'bold')
	}else{
		
	}
}

function clickKpi(option){
	event.stopPropagation();
	var kpiId = $(option).attr('id')
	$('.inputNameMiddle>span').each(function(index,element){
		var tempId = $(element).attr('id')
		if(kpiId == tempId){
			$(element).css("color",'red').css("font-weight",'bold');
		}else{
			$(element).css("color",'#fff').css("font-weight",'normal');
		}
	})
	getTopFive(publicOrgId)
}

function clickKpiRight(option){
	event.stopPropagation();
	var kpiId = $(option).next().attr('id')
	$('.inputName>span').each(function(index,element){
		var tempId = $(element).next().attr('id')
		if(kpiId == tempId){
			$(element).css("color",'red').css("font-weight",'bold');
		}else{
			$(element).css("color",'#fff').css("font-weight",'normal');
		}
	})
	if(lineOrBar == 'line'){
		doubleLine(echartsPublicOrgId);
	}
	
}

var deleteScreen = function(option){
	var parent2 = $(option).parent();
	parent2.remove();
}

var deleteKpi = function(option){
	var parent2 = $(option).parent();
	var thisId = $(option).attr('id');
	parent2.remove();
//	$(".right-input .inputName>i").each(function(index){
//		var parentRight = $(this).parent();
//		var rightId = $(this).attr('id')
//		if(rightId == thisId){
//			parentRight.remove();
//		}
//	})
	$(".middle-input .inputNameMiddle>span").each(function(index){
		var parentMiddle = $(this).parent();
		var middleId = $(this).attr('id')
		if(middleId == thisId){
			parentMiddle.remove();
		}
	})
	initResultMsg(null,'deleteKpi')
}
var affterDeleteAddKpi = function(option){
	var parent2 = $(option).parent();
	var thisId = $(option).attr('id');
	parent2.remove();
//	$(".right-input .inputName>i").each(function(index){
//		var parentRight = $(this).parent();
//		var rightId = $(this).attr('id')
//		if(rightId == thisId){
//			parentRight.remove();
//		}
//	})
	$(".middle-input .inputNameMiddle>span").each(function(index){
		var parentMiddle = $(this).parent();
		var middleId = $(this).attr('id')
		if(middleId == thisId){
			parentMiddle.remove();
		}
	})
}
var deleteKpiRight = function(option){
	var parent2 = $(option).parent();
	parent2.remove();
	if(lineOrBar == 'line'){
		doubleLine(echartsPublicOrgId);
	}else{
		rankingBar(echartsPublicOrgId);
	}
}

var echartsPublicOrgId = ''
var lineOrBar = ''
var doubleLine = function(orgId){
	var myChart = echarts.init(document.getElementById('right-echarts'));	
	var data = {
	    id: 'echarLines',
	    legend: [],
	    xAxis: [],
	    color:[],
	    yAxis: []
	}
	echartsPublicOrgId = orgId
	lineOrBar = 'line'
	var orgLevel = '';
	$.ajax({
		url : $.cxt + '/kpi/getOrgLevelAndLevelMax',
		data : {orgId : orgId},
		type : 'POST',
		async : false,
		success : function(data){
			var json = JSON.parse(data)
			if(json.code == '0'){
				orgLevel = json.data.orgLevel
			}
		}
	})
	
	var orgName = []
	var legendName = []
	var kpiCodeArr = []
	var kpiCodeData = []
	var kpiColor = []
	var kpiDefaultColor = ['#f90404','#dff904','#04f90c','#0804f9','#f904f1']
	var tempKpiId='';
	var echartsPram = '{';
	var countPeriod = $("#countPeriod").find("option:selected").val();
	var AccountPeriod = $("#AccountPeriod").val();
	echartsPram += '\"' + 'countPeriod\":\"' + countPeriod + '\",'
	echartsPram += '\"' + 'accountPeriod\":\"' + AccountPeriod + '\",'
	echartsPram += '\"' + 'kpi\":\"'
	$('.inputName i').each(function(index,element){
		if($(element).prev().css('color')=='rgb(255, 0, 0)'){
			tempKpiId = $(element).attr('id')
			echartsPram += $(element).attr('id') + ','
			kpiCodeArr.push($(element).attr('id'))
			legendName.push($(element).prev().text())
		}
	})
	$('.inputName i').each(function(index,element){
		if(tempKpiId == $(element).attr('id')){
			
		}else{
			echartsPram += $(element).attr('id') + ','
			kpiCodeArr.push($(element).attr('id'))
			legendName.push($(element).prev().text())
		}
	})
	echartsPram += '\",' + '\"orgId\":\"' + orgId + '\"}'
	$.ajax({
		url : $.cxt + "/kpi/getNextOrgKpi",
		type: "POST",
		data:JSON.parse(echartsPram), 
		async : false,
		success : function(data) {
			var json = JSON.parse(data);
			if(json.code == '0'){
				for(var j=0;j<kpiCodeArr.length;j++){
					var kpiCodeTemp = []
					for(var i=0;i<json.data.length;i++){
						if(orgLevel == '1'){
							orgName.push(json.data[i].CITY_NAME)
						}else if(orgLevel == '2'){
							orgName.push(json.data[i].AREA_NAME)
						}else if(orgLevel == '3'){
							if(json.data[i].SALE_DEPT_NAME != undefined){
								orgName.push(json.data[i].SALE_DEPT_NAME)
							}else{
								orgName.push(json.data[i].GRID_NAME)
							}
						}else if(orgLevel == '5'){
							orgName.push(json.data[i].GRID_NAME)
						}
						kpiCodeTemp.push(json.data[i][kpiCodeArr[j]])
					}
//					kpiColor.push('#'+Math.floor(Math.random()*16777215).toString(16))
					kpiColor.push(kpiDefaultColor[j])
					kpiCodeData.push(kpiCodeTemp)
				}
			}
		}
	})
	
	data.legend = legendName
	data.xAxis = removeArrRepeat(orgName)
	data.yAxis = kpiCodeData
	data.color = kpiColor
	var legend = data.legend || []
	var seriesArr = []
	var legendSele = {}
	if(data.yAxis != undefined && data.yAxis != null){
		for(var index=0;index<data.yAxis.length;index++){
			var name = legend[index]
			index === 0 ? legendSele[name] = true : legendSele[name] = false
			seriesArr.push({
			       name: name,
			       type: 'line',
			       data: data.yAxis[index],
			       smooth: false,
			       symbol: 'circle',
			       hoverAnimation: true,
			       showAllSymbol: true,
			       symbolSize: '8',
			       label: {
			           normal: {
			               show: index === 0 ? true : false,
			               position: 'top',
			           }
			       },
			   })
		}
		
	}
	
	option = {
	    title: {
	        text: data.title,
	        x: '1%',
	        top: '1%',
	        textStyle: {
	            color: '#4D5562',
	            fontSize: '16',
	            fontWeight: 'normal'
	        }
	    },
	    grid: {
	        x: 20,
	        y: 30,
	        x2: 150,
	        y2:100,	
	    },
	    color: data.color,
	    tooltip: {
	        trigger: 'axis',
	        formatter: function(params) {
	            var time = '';
	            var str = '';
	            for (var i in params) {
	                time = params[i].name + '<br/>';
	                if (params[i].data == 'null' || params[i].data == null) {
	                    str += params[i].seriesName + ' :  无数据' + '<br/>'
	                } else {
	                    str += params[i].seriesName + ' : ' + params[i].data + '<br/>'
	                }

	            }
	            return time + str;
	        }
	    },
	    legend: {
	        icon: 'rect',
	        orient: 'vertical',
	        right: 10,
	        y: 'center',
	        // top: 12,
	        itemWidth: 10,
	        itemHeight: 10,
	        itemGap: 10,
	        borderRadius: 4,
	        data: legend,
	        textStyle: {
	            fontSize: 14,
	            color: '#fff'
	        },
	        selected: legendSele
	    },
	    xAxis: {
	        data: data.xAxis || [],
	        axisLine: { // 坐标轴线
	            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
	                color: '#fff',
	                type: 'solid'
	            },
	        },
	        axisTick: { // 坐标轴小标记
	            show: false, // 属性show控制显示与否，默认不显示
	        },
	        axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
	            show: true,
	            interval: '0',
	            rotate:70,
	            color: '#fff',
	        },
	    },
	    yAxis: {
	        type: 'value',
	        axisTick: { // 坐标轴小标记
	            show: false, // 属性show控制显示与否，默认不显示
	        },
	        splitLine: {
	            show: true,
	            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
	                color: '#F1F3F5',
	                type: 'solid'
	            },
	        },
	        axisLine: { // 坐标轴线
	            show: false, // 默认显示，属性show控制显示与否
	        },
	        axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
	            show: false,
	        },
	    },
	    series: seriesArr
	};
	myChart.clear();
	myChart.setOption(option);
}

var clickRanking = function(){
	$(".ranking").click(function(){
		if($("#cityCompanyRight").find("option:selected").attr('id') != undefined){
			rankingBar(echartsPublicOrgId)
		}else{
			messageConfirm('请选择地市公司！');
		}
	})
	$(".trend").click(function(){
		doubleLine(echartsPublicOrgId)
	})
}

var rankingBar = function(orgId){

	var kpidata = []
	var kpiCode = []
	var kpiName = []
	var myseries = []
	lineOrBar = 'bar'
	var echartsPram = '{';
	var countPeriod = $("#countPeriod").find("option:selected").val();
	var AccountPeriod = $("#AccountPeriod").val();
	echartsPram += '\"' + 'countPeriod\":\"' + countPeriod + '\",'
	echartsPram += '\"' + 'accountPeriod\":\"' + AccountPeriod + '\",'
	echartsPram += '\"' + 'kpi\":\"'
	$('.inputName i').each(function(index,element){
		if(index < 5){
			echartsPram += $(element).attr('id') + ','
			kpiCode.push($(element).attr('id'))
		}
	})
	echartsPram += '\",' + '\"orgId\":\"' + orgId + '\"}'
	$.ajax({
		url : $.cxt + "/kpi/getOrgKpiBar",
		type: "POST",
		data:JSON.parse(echartsPram), 
		async : false,
		success : function(data) {
			var json = JSON.parse(data);
			if(json.code == '0'){
				for(var i=0;i<kpiCode.length;i++){
					kpidata.push(json.data[kpiCode[i]])
				}
				kpidata.sort(compare)
				for(var i=0;i<kpiCode.length;i++){
					for(var j=0;j<kpidata.length;j++){
						var dataKpi = json.data[kpiCode[i]]
						if(dataKpi == kpidata[j]){
							kpiName[j] = $('#'+kpiCode[i]).prev().text()
						}
					}
				}
			}
		}
	})
	
	for(var i=0;i<kpidata.length;i++){
		var tempData = []
		for(var j=0;j<kpidata.length;j++){
			tempData.push(0)
		}
		tempData[i] = kpidata[i]
		myseries.push({
			name: kpiName[i],
            type: 'bar',
            data: tempData,
            barGap:'-100%',
            barWidth:20
		})
	}
	var myChart = echarts.init(document.getElementById('right-echarts'));
	option = {
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        },
	        formatter:function (param) {
	            for(var k in param) {
	                if (param[k].name.indexOf(param[k].seriesName) > -1) {
	                    return '<div style="background-color: '+param[k].color+';height: 10px;width: 10px;border-radius: 5px;display:inline-block"></div>'+param[k].name+'<br/>'+'指标量:'+param[k].value;
	                }
	            }
	        }
	    },
	    legend: {
	        data: kpiName,
	        textStyle:{
	        	color: '#fff'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'value',
	        boundaryGap: [0, 0.05],
	        axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff'
                }
            }
	    },
	    yAxis: {
	        type: 'category',
	        data: kpiName,
	        axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff'
                }
            }
	    },
	    series: myseries
	};
	
	myChart.clear()
	myChart.setOption(option,true)
}

var compare = function (x, y) {//比较函数
    if (x < y) {
        return -1;
    } else if (x > y) {
        return 1;
    } else {
        return 0;
    }
}

//数组去重
function removeArrRepeat(arr){
	var o={};
	var new_arr=[];
	for(var i=0;i<arr.length;i++){
	    var k=arr[i];
	    if(!o[k]){
	        o[k]=true;
	        new_arr.push(k);
	    }
	}
	return new_arr;
}

function messageConfirm(msg){
	bootbox.alert({
	    buttons: {
		   ok: {
			    label: '关闭',
			    className: 'btn-myStyle'
		    }
	    },
	    message: msg,
	    callback: function() {
		    
	    },
	    title: "消息提示",
    })
}

function reloadTypeLevel(){
	$.ajax({
		url : $.cxt + "/kpi/initTypeLevel", 
		type: "POST",
		data:{},
		async : false,
		success : function(data) {
			var json  = JSON.parse(data);
			if(json.code == '0'){
				$('#typeLevel1').empty()
				$('#typeLevel2').empty()
				$('#typeLevel3').empty()
				$("#typeLevel1").append(
						$("<option>"+'请选择...'+"</option>").attr('value','请选择...')
				)
				$("#typeLevel2").append(
						$("<option>"+'请选择...'+"</option>").attr('value','请选择...')
				)
				$("#typeLevel3").append(
						$("<option>"+'请选择...'+"</option>").attr('value','请选择...')
				)
				for(var i=0;i<json.data.typeLevel1.length;i++){
					if(json.data.typeLevel1[i].screenValue != null && json.data.typeLevel1[i].screenValue != '' && json.data.typeLevel1[i].screenValue != undefined){
						$('#typeLevel1').append(
								$("<option>"+json.data.typeLevel1[i].screenValue+"</option>").attr('id',json.data.typeLevel1[i].screenCode).attr('value',json.data.typeLevel1[i].screenCode)
						)
					}
				}
				for(var i=0;i<json.data.typeLevel2.length;i++){
					if(json.data.typeLevel2[i].screenValue != null && json.data.typeLevel2[i].screenValue != '' && json.data.typeLevel2[i].screenValue != undefined){
						$('#typeLevel2').append(
								$("<option>"+json.data.typeLevel2[i].screenValue+"</option>").attr('id',json.data.typeLevel2[i].screenCode).attr('value',json.data.typeLevel2[i].screenCode)
						)
					}
				}
				for(var i=0;i<json.data.typeLevel3.length;i++){
					if(json.data.typeLevel3[i].screenValue != null && json.data.typeLevel3[i].screenValue != '' && json.data.typeLevel3[i].screenValue != undefined){
						$('#typeLevel3').append(
								$("<option>"+json.data.typeLevel3[i].screenValue+"</option>").attr('id',json.data.typeLevel3[i].screenCode).attr('value',json.data.typeLevel3[i].screenCode)
						)
					}
				}
			}
		}
		
	})
}
//select去重
function removeSelectRepeat(id){
	 $("#"+id+" option").each(function() {
         var val = $(this).val();
         if ( $("#"+id+" option[value='" + val + "']").length > 1 )
             $("#"+id+" option[value='" + val + "']:gt(0)").remove();
     })
}

function niceScrollAll(){
//	$(".kpi-index").niceScroll({
//		cursorheight:$(window).height()-190,
//	    cursorcolor:"#5cd4f8",
//	    cursorborder: "1px solid #5cd4f8",
//	    touchbehavior: false,
//	    spacebarenabled: true,
//	    railoffset: false
//	});
	$(".kpiName-content").niceScroll({
		cursorheight:$(window).height()-190,
	    cursorcolor:"#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
	$(".kpi-situation").niceScroll({
		cursorheight:$(window).height()-190,
	    cursorcolor:"#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
	$(".middle-input").niceScroll({
		cursorheight:$(window).height()-190,
	    cursorcolor:"#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
	$(".rightTop").niceScroll({
		cursorheight:$(window).height()-190,
	    cursorcolor:"#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
	$(".right-input").niceScroll({
		cursorheight:$(window).height()-190,
	    cursorcolor:"#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
}
