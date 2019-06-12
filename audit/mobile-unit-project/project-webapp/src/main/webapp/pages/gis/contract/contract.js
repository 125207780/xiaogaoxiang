var id;//保存点击行的数据，用于返回上一层获取父ID
var level;
$(function() {
	var leftHeight = $(window).height() - $(".left").offset().top - 50;
	$(".left").css("height", leftHeight + "px");
	$(".right").css("height", leftHeight + "px");
	var activeDivHeight = $(window).height() - $(".activeDIV").offset().top;
	$(".activeDIV").css("height", activeDivHeight + "px");
	// 初始化地市、区县、网格下拉框
	initSelectInfo1();
	// 初始化地市、区县、网格下拉框
	initSelectInfo();
	// 初始化包保统计列表信息
	contractAnalysisSearch();
	
	
});

$("#active1").on("click", active1);
$("#active2").on("click", active2);
function active1(){
	var city = $("#city1 option:selected").val();
	var cnty = $("#cnty1 option:selected").val();
//	var grid = $("#grid1 option:selected").val();
	var orgLevel = null;
	var orgId = null;
	if(null != cnty && "" != cnty) {
		orgLevel = "3";
		orgId = cnty;
	} else if(null != city && "" != city) {
		orgLevel = "2";
		orgId = city;
	} else {
		orgLevel = nowOrgLevel;
		orgId = nowOrgId;
	}
	//调用查询方法，orgLevel==3时，点击返回按钮则将orgId设为city
		if(orgLevel=="3"){
			if(nowOrgLevel=="3"){
				initContractAnalysis(orgId,orgLevel,cnty);
			}else{
				initContractAnalysis(orgId,orgLevel,city);
			}
			
		}else{
			initContractAnalysis(orgId,orgLevel,city);
		}	
}
function active2(){
	// 初始化渠道包保信息
	initContractInfo();
}
// 初始化渠道包保信息
function initContractInfo() {
	var city = $("#city option:selected").val();
	var cnty = $("#cnty option:selected").val();
	var grid = $("#grid option:selected").val();
	var orgLevel = null;
	var orgId = null;
	if(null != grid && "" != grid) {
		orgLevel = "4";
		orgId = grid;
	} else if(null != cnty && "" != cnty) {
		orgLevel = "3";
		orgId = cnty;
	} else if(null != city && "" != city) {
		orgLevel = "2";
		orgId = city;
	} else {
		orgLevel = nowOrgLevel;
		orgId = nowOrgId;
	}
	var data = {
		orgId: orgId,
		orgLevel: orgLevel,
	};
	var colNamesData = [];
	var colModelData = [];
	colNamesData = ["地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "区域总监姓名", 
	                "区域总监电话", "包保渠道编码", "包保渠道名称", "包保宽带小区编码", "包保宽带小区名称"];
	colModelData = [ 
		{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'DIRECTOR_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'DIRECTOR_PHONE', align: 'center', cellattr: addCellAttr}, 
		{name: 'RESPONSIBLE_CHNL_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'RESPONSIBLE_CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'RESPONSIBLE_CELL_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'RESPONSIBLE_CELL_NAME', align: 'center', cellattr: addCellAttr}
	];
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $(".activeDIV").offset().top-180;
	//var heightB = $(window).height() - $("#idx_table").offset().top - 140;
	$('#idx_table').jqGrid({
		url: $.cxt + "/contract/initContractInfo",
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: '90%',
		autowidth: true,
		postData: {
			json: JSON.stringify(data)
        },
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 15,
		rowList: [ 15, 20, 30 ],
		pager: '#idx_grid-pager',
		jsonReader: {
			repeatitems : false
		},
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
	// 将列表th和列表的td宽度做适配 
	softThWidth();
}


//初始化渠道包保信息
function initContractAnalysis(org_ID,org_Level,cityId) {
	if(org_Level==3){
		id=cityId;
	}
	if(org_Level==2){
		id=cityId;
	}
	level=org_Level;
	
	var data = {
		orgId: org_ID,
		orgLevel: org_Level
	};
	echart(data);
	var colNamesData = [];
	var colModelData = [];
	colNamesData = ["归属ID", "归属层级", "归属名称","宽带小区数量", "被包保的宽带小区数量", "渠道数", "参与包保的渠道数"];
	colModelData = [ 
		{name: 'ORG_ID', hidden: true,align: 'center', cellattr: addCellAttr}, 
		{name: 'ORG_LEVEL', hidden: true,align: 'center', cellattr: addCellAttr}, 
		{name: 'ORG_NAME', align: 'center', cellattr: addCellAttr,formatter: clickFormat}, 
		{name: 'CELL_CNT', align: 'center', cellattr: addCellAttr}, 
		{name: 'RESPONSIBLE_CELL_CNT', align: 'center', cellattr: addCellAttr},
		{name: 'CHNL_CNT', align: 'center', cellattr: addCellAttr}, 
		{name: 'RESPONSIBLE_CHNL_CNT', align: 'center', cellattr: addCellAttr}
	];
	$('#idx_table1').GridUnload();
	var heightB = $(window).height() - $(".left").offset().top - 130;
	$('#idx_table1').jqGrid({
		url: $.cxt + "/contract/initContractAnalysis",
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: $('.right').width(),
		autowidth: false,
		postData: {
			json: JSON.stringify(data)
        },
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 15,
		rowList: [ 15, 20, 30 ],
		pager: '#idx_grid-pager1',
		jsonReader: {
			repeatitems : false
		},
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
	// 将列表th和列表的td宽度做适配
	softThWidth1();
	$('#idx_grid-pager1_right').append('<button class="firstBtn btn btn-sm btn-linear-blue" id="analysisBack" onclick="analysisBack()">返回</button>');
}
//点击下钻到区县、网格
function clickFormat(celval, options, rowdata){
	if(rowdata.ORG_LEVEL!=3){
		return '<a href="#" onclick="initContractAnalysis(\''+rowdata.ORG_ID+'\',\''+(rowdata.ORG_LEVEL+1)+'\',\''+rowdata.CITY_CODE+'\')">'+celval+'</a>'
	}else{
		return celval;
	}
	
}

function echart(data){
	$.ajax({
		url: $.cxt + "/contract/initContractEchart",
		data:{json: JSON.stringify(data)},
		type: "POST",
		async: false,
		success: function(result) {
			if(result!=null){
				var data1=[];
				if((result["CHNL_CNT"]-result["RESPONSIBLE_CHNL_CNT"])!=0){
					data1.push({
				 		value:(result["CHNL_CNT"]-result["RESPONSIBLE_CHNL_CNT"]),
				 		name:'未参与包保的数渠道数'
				 	 });
				}
				if(result["RESPONSIBLE_CHNL_CNT"]!=0){
					data1.push({
						value:result["RESPONSIBLE_CHNL_CNT"],
					 	name:'参与包保的渠道数'
				 	 });
				}
	
				var data2=[];
				if((result["CELL_CNT"]-result["RESPONSIBLE_CELL_CNT"])!=0){
					data2.push({
				 		value:(result["CELL_CNT"]-result["RESPONSIBLE_CELL_CNT"]),
				 		name:'未被包保的宽带小区数量'
				 	 });
				}
				if(result["RESPONSIBLE_CELL_CNT"]!=0){
					data2.push({
						value:result["RESPONSIBLE_CELL_CNT"],
					 	name:'被包保的宽带小区数量'
				 	 });
				}
				 // 基于准备好的dom，初始化echarts实例
			    var myChart = echarts.init(document.getElementById('channel'));
			    // 指定图表的配置项和数据
			    option = {
			        title: {
			            text: '渠道',
			            x: 'left'
			        },
			        tooltip: {
			            trigger: 'item',
			            formatter: "{a} <br/>{b} : {c} ({d}%)",
			            position: function (point, params, dom, rect, size) {
			            	var x=point[0];
			            	var y=point[1];
			                return [(x+20), y];
			              }
			        },
			        color: ['#CD5C5C', '#00CED1'],
			        stillShowZeroSum: false,
			        series: [
			            {
			                name: '包保占比',
			                type: 'pie',
			                radius: '80%',
			                center: ['50%', '50%'],
			                data: data1,
			                itemStyle: {
			                    normal: {
			                      label: {
			                        show: true,
			                        position: 'inside',//数据在中间显示
			                        formatter:'{d}%'//百分比显示，模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数    
	                                   // 据名，数据值，百分比。{d}数据会根据value值计算百分比
			                      }
			                    }
			            }
			            }
			        ]
			    };
			    // 使用刚指定的配置项和数据显示图表。
			    myChart.setOption(option);
			    
			    // 基于准备好的dom，初始化echarts实例
			    var myChart1 = echarts.init(document.getElementById('community'));
			    // 指定图表的配置项和数据
			    option1 = {
			        title: {
			            text: '宽带小区',
			            x: 'left'
			        },
			        tooltip: {
			            trigger: 'item',
			            formatter: "{a} <br/>{b} : {c} ({d}%)",
			            position: function (point, params, dom, rect, size) {
			            	var x=point[0];
			            	var y=point[1];
			                return [(x+20), y];
			              }
			        },
			        color: ['#CD5C5C', '#00CED1'],
			        stillShowZeroSum: false,
			        series: [
			            {
			                name: '包保占比',
			                type: 'pie',
			                radius: '80%',
			                center: ['47%', '50%'],
			                data: data2,
			                itemStyle: {
			                    normal: {
			                      label: {
			                        show: true,
			                        position: 'inside',//数据在中间显示
			                        formatter:'{d}%'//百分比显示，模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数    
	                                   // 据名，数据值，百分比。{d}数据会根据value值计算百分比
			                      }
			                    }
			            }
			            }
			        ]
			    };
			    // 使用刚指定的配置项和数据显示图表。
			    myChart1.setOption(option1);
			}
		}
	});
	
}

//返回
function analysisBack(){
	if(nowOrgLevel<level){
		if(level==1){
			initContractAnalysis("",1,"");
			} else if(level==2){
			initContractAnalysis("",1,"");
			} else if(level==3){
			initContractAnalysis(id,2,id);
			}
	}else if(nowOrgLevel==level){
		initContractAnalysis(id,nowOrgLevel,id);
	}else if(nowOrgLevel>level){
		initContractAnalysis(id,nowOrgLevel,"");
	}
	
}

// 初始化进入地市、区县、网格下拉框
function initSelectInfo() {
	$.ajax({
		url: $.cxt + "/contract/initSelectInfo",
		type: "POST",
		async: false,
		success: function(result) {
			// 根据当前登录人的权限，将地市、区县、网格的内容一次性查询出来，并做好权限控制
			var json = JSON.parse(result);
			if(json.code = "0") {
				json = json.data;
				var city = json[0].CITY;
				var cnty = json[1].CNTY;
				var grid = json[2].GRID;
				var cityHtml = "";
				var cntyHtml = "";
				var gridHtml = "";
				// 查询出来只有一条地市信息，则不需要“请选择地市”提示
				if(city.length == 1) {
					cityHtml = "<option value='" + city[0].orgId + "'>" + city[0].name + "</option>";
				} else {
					cityHtml = "<option value=''>---地市---</option>";
					for(var i = 0; i < city.length; i++) {
						cityHtml += "<option value='" + city[i].orgId + "'>" + city[i].name + "</option>";
					}
				}
				// 查询出来没有内容，则表示还未选择地市，则需要给出“请选择区县”提示
				if(null != cnty && "" != cnty && undefined != cnty) {
					if(cnty.length == 1) {
						cntyHtml = "<option value='" + cnty[0].orgId + "'>" + cnty[0].name + "</option>";
					} else {
						cntyHtml = "<option value=''>---区县---</option>";
						for(var i = 0; i < cnty.length; i++) {
							cntyHtml += "<option value='" + cnty[i].orgId + "'>" + cnty[i].name + "</option>";
						}
					}
				} else {
					cntyHtml = "<option value=''>---区县---</option>";
				}
				// 查询出来没有内容，则表示还未选择区县，则需要给出“请选择网格”提示
				if(null != grid && "" != grid && undefined != grid) {
					if(grid.length == 1) {
						gridHtml = "<option value='" + grid[0].orgId + "'>" + grid[0].name + "</option>";
					} else {
						gridHtml = "<option value=''>---网格---</option>";
						for(var i = 0; i < grid.length; i++) {
							gridHtml += "<option value='" + grid[i].orgId + "'>" + grid[i].name + "</option>";
						}
					}
				} else {
					gridHtml = "<option value=''>---网格---</option>";
				}
				$("#city").html(cityHtml);
				$("#cnty").html(cntyHtml);
				$("#grid").html(gridHtml);
			}
		}
	});
}

// 选择地市，改变区县值
$("#city").on("change", city);
function city() {
	$("#cnty").empty();
	$("#grid").empty();
	var orgId = $("#city option:selected").val();
	// 如果地市的值不为空，则加载区县和网格
	if(null != orgId && "" != orgId) {
		$.ajax({
			url: $.cxt + "/firstpagethree/getchildrensysorgbyorgid",
			data: {orgId: orgId},
			type: "POST",
			async:false,  
			success: function(result) {
				var json = JSON.parse(result).data;
				var htmltv = "<option value=''>---区县---</option>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
				}
				$("#cnty").html(htmltv);
				htmltv = "<option value=''>---网格---</option>";
				$("#grid").html(htmltv);
			}
		});
	} 
	// 如果地市选择为空，则将区县、网格下拉框全部置为空
	else {
		var htmltv = "<option value=''>---区县---</option>";
		$("#cnty").html(htmltv);
		htmltv = "<option value=''>---网格---</option>";
		$("#grid").html(htmltv);
	}
}

// 选择区县，改变网格值
$("#cnty").on("change", cnty);
function cnty() {
	$("#grid").empty();
	var orgId = $("#cnty option:selected").val();
	// 判断区县是否有无选择，有选择，则加载网格信息
	if(null != orgId && "" != orgId) {
		$.ajax({
			url: $.cxt + "/firstpagethree/getchildrensysorgbyorgid",
			data: {orgId: orgId},
			type: "POST",
			success: function(result) {
				var json = JSON.parse(result).data;
				var htmltv = "<option value=''>---网格---</option>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
				}
				$("#grid").html(htmltv);
			}
		});
	} 
	// 判断区县是否有无选择，无选择，则将网格下拉框置为空
	else {
		var htmltv = "<option value=''>--网格---</option>";
		$("#grid").html(htmltv);
	}
}

//初始化进入地市、区县、网格下拉框
function initSelectInfo1() {
	$.ajax({
		url: $.cxt + "/contract/initSelectInfo",
		type: "POST",
		async: false,
		success: function(result) {
			// 根据当前登录人的权限，将地市、区县、网格的内容一次性查询出来，并做好权限控制
			var json = JSON.parse(result);
			if(json.code = "0") {
				json = json.data;
				var city = json[0].CITY;
				var cnty = json[1].CNTY;
				var grid = json[2].GRID;
				var cityHtml = "";
				var cntyHtml = "";
				//var gridHtml = "";
				// 查询出来只有一条地市信息，则不需要“请选择地市”提示
				if(city.length == 1) {
					cityHtml = "<option value='" + city[0].orgId + "'>" + city[0].name + "</option>";
				} else {
					cityHtml = "<option value=''>---地市---</option>";
					for(var i = 0; i < city.length; i++) {
						cityHtml += "<option value='" + city[i].orgId + "'>" + city[i].name + "</option>";
					}
				}
				// 查询出来没有内容，则表示还未选择地市，则需要给出“请选择区县”提示
				if(null != cnty && "" != cnty && undefined != cnty) {
					if(cnty.length == 1) {
						cntyHtml = "<option value='" + cnty[0].orgId + "'>" + cnty[0].name + "</option>";
					} else {
						cntyHtml = "<option value=''>---区县---</option>";
						for(var i = 0; i < cnty.length; i++) {
							cntyHtml += "<option value='" + cnty[i].orgId + "'>" + cnty[i].name + "</option>";
						}
					}
				} else {
					cntyHtml = "<option value=''>---区县---</option>";
				}
				// 查询出来没有内容，则表示还未选择区县，则需要给出“请选择网格”提示
				if(null != grid && "" != grid && undefined != grid) {
					if(grid.length == 1) {
						gridHtml = "<option value='" + grid[0].orgId + "'>" + grid[0].name + "</option>";
					} else {
						gridHtml = "<option value=''>---网格---</option>";
						for(var i = 0; i < grid.length; i++) {
							gridHtml += "<option value='" + grid[i].orgId + "'>" + grid[i].name + "</option>";
						}
					}
				} 
//				else {
//					gridHtml = "<option value=''>---请选择网格---</option>";
//				}
				$("#city1").html(cityHtml);
				$("#cnty1").html(cntyHtml);
				//$("#grid1").html(gridHtml);
			}
		}
	});
}

// 选择地市，改变区县值
$("#city1").on("change", city1);
function city1() {
	$("#cnty1").empty();
	//$("#grid1").empty();
	var orgId = $("#city1 option:selected").val();
	// 如果地市的值不为空，则加载区县和网格
	if(null != orgId && "" != orgId) {
		$.ajax({
			url: $.cxt + "/firstpagethree/getchildrensysorgbyorgid",
			data: {orgId: orgId},
			type: "POST",
			async:false,  
			success: function(result) {
				var json = JSON.parse(result).data;
				var htmltv = "<option value=''>---区县---</option>";
				for(var i = 0; i < json.length; i++) {
					htmltv += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
				}
				$("#cnty1").html(htmltv);
//				htmltv = "<option value=''>---请选择网格---</option>";
//				$("#grid1").html(htmltv);
			}
		});
	} 
	// 如果地市选择为空，则将区县、网格下拉框全部置为空
	else {
		var htmltv = "<option value=''>---区县---</option>";
		$("#cnty1").html(htmltv);
//		htmltv = "<option value=''>---请选择网格---</option>";
//		$("#grid1").html(htmltv);
	}
}

//// 选择区县，改变网格值
//$("#cnty1").on("change", cnty1);
//function cnty1() {
//	$("#grid1").empty();
//	var orgId = $("#cnty1 option:selected").val();
//	// 判断区县是否有无选择，有选择，则加载网格信息
//	if(null != orgId && "" != orgId) {
//		$.ajax({
//			url: $.cxt + "/firstpagethree/getchildrensysorgbyorgid",
//			data: {orgId: orgId},
//			type: "POST",
//			success: function(result) {
//				var json = JSON.parse(result).data;
//				var htmltv = "<option value=''>---请选择网格---</option>";
//				for(var i = 0; i < json.length; i++) {
//					htmltv += "<option value='" + json[i].orgId + "'>" + json[i].name + "</option>";
//				}
//				$("#grid1").html(htmltv);
//			}
//		});
//	} 
//	// 判断区县是否有无选择，无选择，则将网格下拉框置为空
//	else {
//		var htmltv = "<option value=''>--网格---</option>";
//		$("#grid1").html(htmltv);
//	}
//}

// 查询
$("#search").on("click", search);
function search() {
	var city = $("#city option:selected").val();
	var cnty = $("#cnty option:selected").val();
	var grid = $("#grid option:selected").val();
	var channelName = $("#channelName").val();
	var communityName = $("#communityName").val();
	var orgLevel = null;
	var orgId = null;
	if(null != grid && "" != grid) {
		orgLevel = "4";
		orgId = grid;
	} else if(null != cnty && "" != cnty) {
		orgLevel = "3";
		orgId = cnty;
	} else if(null != city && "" != city) {
		orgLevel = "2";
		orgId = city;
	} else {
		orgLevel = nowOrgLevel;
		orgId = nowOrgId;
	}
	var data = {
		orgId: orgId,
		orgLevel: orgLevel,
		channelName: channelName,
		communityName: communityName
	};
	var colNamesData = [];
	var colModelData = [];
	colNamesData = ["地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "区域总监姓名", 
	                "区域总监电话", "包保渠道编码", "包保渠道名称", "包保宽带小区编码", "包保宽带小区名称"];
	colModelData = [ 
		{name: 'CITY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CITY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'CNTY_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'GRID_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'DIRECTOR_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'DIRECTOR_PHONE', align: 'center', cellattr: addCellAttr}, 
		{name: 'RESPONSIBLE_CHNL_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'RESPONSIBLE_CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
		{name: 'RESPONSIBLE_CELL_CODE', align: 'center', cellattr: addCellAttr}, 
		{name: 'RESPONSIBLE_CELL_NAME', align: 'center', cellattr: addCellAttr}
	];
	$('#idx_table').GridUnload();
	var heightB = $(window).height() - $(".activeDIV").offset().top-180;
	$('#idx_table').jqGrid({
		url: $.cxt + "/contract/initContractInfo",
		datatype: "json",
		mtype: "POST",
		height: heightB,
		width: "100%",
		autowidth: true,
		postData: {
			json: JSON.stringify(data)
        },
		colNames: colNamesData,
		colModel: colModelData,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 15,
		rowList: [ 15, 20, 30 ],
		pager: '#idx_grid-pager',
		jsonReader: {
			repeatitems : false
		},
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
	// 将列表th和列表的td宽度做适配
	softThWidth();
}


//查询
$("#contractAnalysisSearch").on("click", contractAnalysisSearch);
function contractAnalysisSearch(){
	var city = $("#city1 option:selected").val();
	var cnty = $("#cnty1 option:selected").val();
//	var grid = $("#grid1 option:selected").val();
	var orgLevel = null;
	var orgId = null;
	if(null != cnty && "" != cnty) {
		orgLevel = "3";
		orgId = cnty;
	} else if(null != city && "" != city) {
		orgLevel = "2";
		orgId = city;
	} else {
		orgLevel = nowOrgLevel;
		orgId = nowOrgId;
	}
	//调用查询方法，orgLevel==3时，点击返回按钮则将orgId设为city
		if(orgLevel=="3"){
			if(nowOrgLevel=="3"){
				initContractAnalysis(orgId,orgLevel,cnty);
			}else{
				initContractAnalysis(orgId,orgLevel,city);
			}
			
		}else{
			initContractAnalysis(orgId,orgLevel,city);
		}	
}



//导出小区包保统计
$("#contractAnalysisExport").on("click", contractAnalysisExport);
function contractAnalysisExport(){
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/contract/exportContractAnalysis"></form>').appendTo('body').submit().remove();	
}

// 导出渠道包保明细
$("#exportContractInfo").on("click", exportContractInfo);
function exportContractInfo(){
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/contract/exportContractInfo"></form>').appendTo('body').submit().remove();	
}

// 导出模板
$("#downloadModel").on("click", downloadModel);
function downloadModel() {
	window.location.href = $.cxt + "/contract/exportContractInfoModel";
}

// 导入模板
$("#uploadModel").on("click", uploadModel);
function uploadModel() {
	var param = {};
	// 提示没有选择文件
	if($("#contractFileDir").val() == "") {
  		messageAlert("请选择上传的数据文件");
  		return;
  	}
  	var fileExtension = $("#contractFileDir").val().split('.').pop().toLowerCase();
  	// 提示选择文件大小不能超过30M
  	if(getFileSize("contractFileDir") > 30) {
  		messageAlert("数据文件不能大于30M");
  		return;
  	}
  	// 提示选择文件类型
  	if(fileExtension != "xls") {
  		messageAlert("请选择2003版excel");
  		return;
  	}
	$("#upformContract").submit();
	return;
}

// 导入后给出提示信息
function getJspDirectSale(msg) {
	messageAlert(msg);
}

// 导出明细列表
$("#exportContractDetail").on("click", exportContractDetail);
function exportContractDetail() {
	var city = $("#city option:selected").val();
	var cnty = $("#cnty option:selected").val();
	var grid = $("#grid option:selected").val();
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + city +"' name='city' />";
	html += "<input type='text' value='" + cnty +"' name='cnty' />";
	html += "<input type='text' value='" + grid +"' name='grid' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/contract/exportContractDetail">' + html + '</form>').appendTo('body').submit().remove();
}

// 滚动条样式
function dayReportFormsetNiceScroll() {
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight: $(window).height() - 190,
		cursorcolor: "#5cd4f8",
		cursorborder: "1px solid #5cd4f8",
		touchbehavior: false,
		spacebarenabled: true,
		railoffset: false
	});
}

// 字体颜色修改
function addCellAttr(rowId, val, rawObject, cm, rdata) {
	return "style='color:white'";
}

// 将头部适配列表td宽度
function softThWidth() {
	var width = parseFloat($("#idx_table").width() / $("#idx_table").find("tr").eq(0).find("td:visible").length).toFixed(1);
	$(".ui-jqgrid .ui-jqgrid-labels th").css("width", width + "px");
}

//将头部适配列表td宽度
function softThWidth1() {
	var width = parseFloat($("#idx_table1").width() / $("#idx_table1").find("tr").eq(0).find("td:visible").length).toFixed(1);
	$(".ui-jqgrid .ui-jqgrid-labels th").css("width", width + "px");
}
//提示信息框
function messageAlert(message) {
	bootbox.dialog({
		message: "<span style=\"color:#000\">" + message + "</span>",
		title: "消息提示",
		buttons: {
			OK: {
				label: "确定",
				className: "btn-success"
			}
		}
	});
}

//判断文件大小
function getFileSize(eleId) {
	try {
		var size = 0;
		// byte
		size = $('#' + eleId)[0].files[0].size;
		// kb
		size = size / 1024;
		// mb
		size = size / 1024;
		return size;
	} catch (e) {
		alert("错误：" + e);
		return -1;
	}
}