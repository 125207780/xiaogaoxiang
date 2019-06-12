
function cityGaoxiaoLeft(mapOrgId,lastMonth){
	$.ajax({
		url : $.cxt + '/schoolMap/getCityGaoxiaoLeft',
		type : "POST",
		data :{mapOrgId:mapOrgId,
			statisMonth :lastMonth
			},
		dataType: "json",
		success: function(json){
			var data = JSON.parse(json);
			if(data.code == '0'){
				gridData=data.data;
				//console.log(gridData);
				$("#cityGaoxiaoInfoListGrid").jqGrid('clearGridData');
				for ( var i = 0; i <= gridData.length; i++){
				    $("#cityGaoxiaoInfoListGrid").jqGrid('addRowData', i+1, gridData[i]);
				  }	
			}
		}
	})
}

function initGridTable(){
	   $("#cityGaoxiaoInfoListGrid").jqGrid('clearGridData');
	   $('#cityGaoxiaoInfoListGrid').jqGrid({
		    //url : $.cxt + "/schoolMap/getMapRight",
		    datatype : "local",
			//mtype : "POST",
			postData : {},
			autowidth : true,
			height:($("#rightpanel").height()-50),
			colNames: [ '区县','高校数','本科数','专科数'
				       
				       ],
			//colNames:colNames, 
			colModel: [ 
				 { name: 'CNTY_NAME', index: 'AREA_NAME', align: 'center'},
				 { name: 'SCH_N', index: 'RANK1', align: 'center'},
				 { name: 'B_SCH', index: 'RANK2', align: 'center'},
				 { name: 'Z_SCH', index: 'RANK3', align: 'center'}
			     
			  	   ], 
			//colModel: colModel, 
			sortable:true,
			//shrinkToFit:false,
			shrinkToFit:true,
			//sortorder:'desc', 
			//sortname:'RANK5',
			viewrecords : true,
			rownumbers: false,
			rowNum : 15,
			rowList : [15],
			//pager : '#gridInfoListPagers',
			/*gridComplete: function() { 
				for ( var i = 0; i <= gridData.length; i++){
				    $("#gridInfoListGrid").jqGrid('addRowData', i + 1, gridData[i]);
				  }
			  } ,*/
			loadComplete : function() { 
//				console.log(gridData)
//				if(flag1){
				
//				}
//				flag1=false;
			  } ,
		});
	   
		
}