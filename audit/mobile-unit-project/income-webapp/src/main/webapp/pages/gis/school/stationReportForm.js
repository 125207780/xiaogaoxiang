$(function(){
	reportForm2DetailListGrid()
	initCityName()
})

function reportForm2DetailListGrid(){
	   $("#reportForm2InfoListGrid").jqGrid('clearGridData');
	   $("#reportForm2InfoListGrid").GridUnload();
	   grid = $("#reportForm2InfoListGrid"); 
	   grid.jqGrid({ 
		   url : $.cxt + "/getReportForm/getReportForm2",
		   datatype : "json",
		   mtype : "POST",
		   postData : {},
		   height : 200,
		   width:$(".left").width(),
		   autowidth : false,
		   colNames: [ '地市','学校编码','学校名称','学校级别','分校编码','分校名称','基站编码','基站名称','基站状态'], 
		   colModel: [ 
		       { name: 'CITY_NAME', index: 'CITY_NAME',align: 'center' }, 
		       { name: 'SCH_ID', index: 'SCH_ID',align: 'center'}, 
		       { name: 'SCH_NAME', index: 'SCH_NAME',align: 'center'}, 
		       { name: 'LEVEL_NAME', index: 'LEVEL_NAME', align: 'center'},
		       { name: 'SCH_PART_ID', index: 'SCH_PART_ID',align: 'center'}, 
		       { name: 'SCH_PART_NAME', index: 'SCH_PART_NAME',align: 'center'}, 
		       { name: 'LAC_CELL_ID', index: 'LAC_CELL_ID', align: 'center'},
		       { name: 'CELL_NAME', index: 'CELL_NAME',align: 'center'}, 
		       { name: 'LIFE_CYC_STATS', index: 'LIFE_CYC_STATS', align: 'center'},
		   ], 
			shrinkToFit:false,
			autoScroll: true,
			viewrecords : true,
			rownumbers: false,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			viewrecords: false, 
			pager : '#reportForm2InfoListPagers',
			loadComplete : function(){
				setNiceScroll();
				 topjqGridLoadComplete();
			},
			
	}); 
	 //查询按钮
		$("#selectCityName").click(function(){
			reloadBasicUnitJqGrid("search");
		});
	 //导出
		$("#getReportForm2Export").click(function(){
			
			debugger
			var cityName = "";
			
			cityName = 	encodeURI(encodeURI($("#cityName").find("option:selected").val()));
			if(cityName =="请选择..."){
				cityName = "";
			}
			window.location.href=$.cxt +"/getReportForm/getReportForm2Export?cityName="+cityName;
		})
}

var reloadBasicUnitJqGrid = function(flag) {
	if(flag == undefined) {
		//清空查询条件
		topclear('gridSearch')
	}
	var cityName = "";
	
	cityName = $("#cityName").find("option:selected").val();
	if(cityName =="请选择..."){
		cityName = "";
	}
	$("#reportForm2InfoListGrid").jqGrid('setGridParam',{    
        postData : {
        	cityName:cityName
        },  
        page : 1    
    }).trigger("reloadGrid"); 
}

function initCityName(){
	$.ajax({
		url : $.cxt + "/getReportForm/findCityName", 
		type: "POST",
		async:false,
		data :{},
		success : function(data) {
			var data = JSON.parse(data);
			if(data.code == '0'){
				$("#cityName").empty();
				$("#cityName").append(
						$("<option>"+'请选择...'+"</option>").val('请选择...')
				)
				for(i=0;i<data.data.length;i++){
					$("#cityName").append(
							$("<option>"+data.data[i].AREA_NAME+"</option>").val(data.data[i].AREA_NAME)
					)
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