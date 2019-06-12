$(function(){
	init();
	
	initNow();
});

function init(){
	var colNames =  ['地区名称','学校名称'];
	var colModel =  [
	    {name : 'AREA_NAME',align : 'center'},
	    {name : 'SCH_NAME',align : 'center'}];
	
	if(value == '校园用户ARPU'){
		colNames.push("校园用户ARPU值");
		colNames.push("校园用户ARPU环比");
		
		colModel.push({name : 'CMCC_SCH_ARPU',align : 'center'});
		colModel.push({name : 'CMCC_SCH_ARPU_P',align : 'center'});
		colModel.push({name : 'RANK',align : 'center'});
		colModel.push({name : 'RANK4',align : 'center'});
	}else if(value == '校园用户ARPU(折让后)'){
		colNames.push("校园用户ARPU(折让后)值");
		colNames.push("校园用户ARPU(折让后)环比");
		
		colModel.push({name : 'CMCC_SCH_ARPU_ZR',align : 'center'});
		colModel.push({name : 'CMCC_SCH_ARPU_ZR_P',align : 'center'});
		colModel.push({name : 'RANK8',align : 'center'});
		colModel.push({name : 'RANK9',align : 'center'});
	}else if(value == '校园用户MOU'){
		colNames.push("校园用户MOU值");
		colNames.push("校园用户MOU环比");
		
		colModel.push({name : 'CMCC_SCH_MOU',align : 'center'});
		colModel.push({name : 'CMCC_SCH_MOU_P',align : 'center'});
		colModel.push({name : 'RANK2',align : 'center'});
		colModel.push({name : 'RANK6',align : 'center'});
		 
	}else if(value == '校园用户DOU'){ 
		colNames.push("校园用户DOU值");
		colNames.push("校园用户DOU环比");
		
		colModel.push({name : 'CMCC_SCH_DOU',align : 'center'});
		colModel.push({name : 'CMCC_SCH_DOU_P',align : 'center'});
		colModel.push({name : 'RANK1',align : 'center'});
		colModel.push({name : 'RANK5',align : 'center'});
		
	}else {
		colNames.push("通话用户数值");
		colNames.push("通话用户环比");
		
		colModel.push({name : 'CMCC_SCH_CALL_USERS',align : 'center'});
		colModel.push({name : 'CMCC_SCH_CALL_USERS_P',align : 'center'});
		colModel.push({name : 'RANK3',align : 'center'});
		colModel.push({name : 'RANK7',align : 'center'});
		
	}
	colNames.push("地区排名");
	colNames.push("全省排名");
	
	$('#use-ranking-table').jqGrid({
		url : $.cxt + "/school/useRanking",
		datatype: "json",
		mtype: "POST",
		postData : {schoolId:schoolId,level:level},
		height : 405,
		viewrecords : true,
		autowidth : true,
		colNames : colNames,
		colModel : colModel,
		viewrecords : true,
		rownumbers: false,
		multiselect: true, 
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#use-ranking-table-page',
		loadComplete : topjqGridLoadComplete,
		
	});
	
}

function initNow(){
	var level = "";
	$.ajax({
		url : $.cxt + "/school/useRanking",
		datatype: "json",
		type : "POST",
		data : {schoolId:schoolId,level:level},
		success : function(json){
			//传过来的是list
			var data = json[0];
			console.log("data")
			console.log(data)
			if(value == '校园用户ARPU'){
				$("#useRankArea").val(data.RANK);
				$("#useRankCity").val(data.RANK4);
			}else if(value == '校园用户ARPU(折让后)'){
				$("#useRankArea").val(data.RANK8);
				$("#useRankCity").val(data.RANK9);
			}else if(value == '校园用户MOU'){
				$("#useRankArea").val(data.RANK1);
				$("#useRankCity").val(data.RANK5);
			}else if(value == '校园用户DOU'){
				$("#useRankArea").val(data.RANK2);
				$("#useRankCity").val(data.RANK6);
			}else if(value == '通话用户数'){ 
				$("#useRankArea").val(data.RANK3);
				$("#useRankCity").val(data.RANK7);
			}
		}
	});
}