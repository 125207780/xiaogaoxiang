$(function(){
	init();
	
	initNow();
});

function init(){
	var colNames =  ['地区名称','学校名称'];
	var colModel =  [
	    {name : 'AREA_NAME',align : 'center'},
	    {name : 'SCH_NAME',align : 'center'}];
	
	if(value == '校园用户'){
		colNames.push("校园用户本月累计");
		colNames.push("校园用户环比");
		
		colModel.push({name : 'CMCC_SCH_DEV_USERS',align : 'center'});
		colModel.push({name : 'CMCC_SCH_USERS_P',align : 'center'});
		colModel.push({name : 'RANK',align : 'center'});
		colModel.push({name : 'RANK6',align : 'center'});
	}else if(value == '校园宽带用户'){
		colNames.push("校园宽带用户本月累计");
		colNames.push("校园宽带用户环比");
		
		colModel.push({name : 'CMCC_SCH_KD_DEV_USERS',align : 'center'});
		colModel.push({name : 'CMCC_SCH_KD_USERS_P',align : 'center'});
		colModel.push({name : 'RANK1',align : 'center'});
		colModel.push({name : 'RANK7',align : 'center'});
	}else if(value == '校园不限量用户'){
		colNames.push("校园不限量用户本月累计");
		colNames.push("校园不限量用户环比");
		
		colModel.push({name : 'CMCC_SCH_UNLIM_DEV_USERS',align : 'center'});
		colModel.push({name : 'CMCC_SCH_UNLIM_USERS_P',align : 'center'});
		colModel.push({name : 'RANK2',align : 'center'});
		colModel.push({name : 'RANK8',align : 'center'});
		
	}else if(value == '校园合约用户'){ 
		colNames.push("校园合约用户本月累计");
		colNames.push("校园合约用户环比");
		
		colModel.push({name : 'CMCC_SCH_ACTIV_DEV_USERS',align : 'center'});
		colModel.push({name : 'CMCC_SCH_ACTIV_USERS_P',align : 'center'});
		colModel.push({name : 'RANK3',align : 'center'});
		colModel.push({name : 'RANK9',align : 'center'});
		
	}else if(value == '校园4G用户'){ 
		colNames.push("校园4G用户本月累计");
		colNames.push("校园4G用户环比");
		
		colModel.push({name : 'CMCC_SCH_4G_DEV_USERS',align : 'center'});
		colModel.push({name : 'CMCC_SCH_4G_USERS_P',align : 'center'});
		colModel.push({name : 'RANK4',align : 'center'});
		colModel.push({name : 'RANK10',align : 'center'});
		
	}else {
		colNames.push("校园V网用户本月累计");
		colNames.push("校园V网用户环比");
		
		colModel.push({name : 'CMCC_SCH_VNET_DEV_USERS',align : 'center'});
		colModel.push({name : 'CMCC_SCH_VNET_USERS_P',align : 'center'});
		colModel.push({name : 'RANK5',align : 'center'});
		colModel.push({name : 'RANK11',align : 'center'});
		
	}
	colNames.push("地区发展率排名");
	colNames.push("全省排名");
	
	$('#newDevelop-ranking-table').jqGrid({
		url : $.cxt + "/school/newRanking",
		datatype: "json",
		mtype: "POST",
		postData : {schoolId:uid,level:level},
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
		pager : '#newDevelop-ranking-table-page',
		loadComplete : topjqGridLoadComplete,
		
	});
	
}


function initNow(){
	var level = "";
	$.ajax({
		url : $.cxt + "/school/newRanking",
		datatype: "json",
		type : "POST",
		data : {schoolId:uid,level:level},
		success : function(json){
			//传过来的是list
			var data = json[0];
			console.log(data)
			if(value == '校园用户'){
				$("#newRankArea").val(data.RANK);
				$("#newRankCity").val(data.RANK6);
			}else if(value == '校园宽带用户'){
				$("#newRankArea").val(data.RANK1);
				$("#newRankCity").val(data.RANK7);
			}else if(value == '校园不限量用户'){
				$("#newRankArea").val(data.RANK2);
				$("#newRankCity").val(data.RANK8);
			}else if(value == '校园合约用户'){ 
				$("#newRankArea").val(data.RANK3);
				$("#newRankCity").val(data.RANK9);
			}else if(value == '校园4G用户'){ 
				$("#newRankArea").val(data.RANK4);
				$("#newRankCity").val(data.RANK10);
			}else {
				$("#newRankArea").val(data.RANK5);
				$("#newRankCity").val(data.RANK11);
			}
		}
	});
}