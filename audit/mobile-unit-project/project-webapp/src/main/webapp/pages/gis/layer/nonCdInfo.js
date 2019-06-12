$(function(){
	getGridSchoolInfo();//网格学校基础信息
	geGridSchoolInfoDay();//网格学校日指标信息
	initDate();//初始化日期组件
	OverContent();
	abnormal_info();
	cost_whole();
	efficacy__whole();
})
/*   渠道费用整体情况     */
function cost_whole(){
	var data3 = [
		{sale_type:"1",major_type:"2",grid_code:"3",chnl_type3:"4",chnl_type4:"5",manage_dept_code:"6",
			manage_dept:"7",chnl_code:"8",chnl_name:"9",chnl_cost_total:"1",channel_allowance:"1",decorate_allowance:"1",
			rent_allowance:"1",commission_total:"1",nomal_commission:"1",cashback_commission:"1",
			reward_commission:"1",shop_reward_commission:"1",manmade_commission:"1",service_commission:"1",clearup_commission:"1",terminal_commission:"1",
			undefined_commission:"1",terminal_allowance_cost:"1"
			}
		]
	 grid=$("#itemTable2");
	 grid.jqGrid({
		 /* url :$.cxt+'/channelInfo/cost_whole',
			datatype:'json',
			mtype : 'POST',
			postdata : {},
		*/
		    datatype: "local", 
	        data: data3,           
	        height:200,
	        width:800,
		    autowidth : false,//必须要,否则没有水平滚动条
	   		shrinkToFit:false,
	   	    autoScroll: true,	//shrinkToFit: false,autoScroll: true,这两个属性产生水平滚动条   
	   	    multiselet: false,//checkbox
	   		viewrecords : true,
	   		rownumbers: true,
	        colNames:['销售线','专业线','网格','渠道类型（三级）','四级渠道类型','管理本部渠道编码','管理本部','渠道编码','渠道名称',
	        	'统计期间渠道费用总额(元)','渠道补贴','渠道补贴-装修费补贴','渠道补贴-房租补贴','统计期间佣金总额(元)','常规佣金','现返佣金',
	        	'奖罚佣金','奖罚佣金-店奖','人工调整佣金','服务佣金','清欠佣金','终端酬金','未分类佣金','终端补贴成本'
	        		],
	        colModel:[
			            {name:'sale_type',index:'sale_type',align:"center"}, 
	                    {name:'major_type',index:'major_type',align:"center"}, 
	                    {name:'grid_code',index:'grid_code',align:"center"}, 
	                    {name:'chnl_type3',index:'chnl_type3',align:"center"},
	                    {name:'chnl_type4',index:'chnl_type4',align:"center"}, 
	                    {name:'manage_dept_code',index:'manage_dept_code',align:"center"}, 
	                    {name:'manage_dept',index:'manage_dept',align:"center"}, 
	                    {name:'chnl_code',index:'chnl_code',align:"center"},
	                    {name:'chnl_name',index:'chnl_name',align:"center"}, 
	                    {name:'chnl_cost_total',index:'chnl_cost_total',align:"center"},
	                    {name:'channel_allowance',index:'channel_allowance',align:"center"}, 
	                    {name:'decorate_allowance',index:'decorate_allowance',align:"center"}, 
	                    {name:'rent_allowance',index:'rent_allowance',align:"center"}, 
	                    {name:'commission_total',index:'commission_total',align:"center"},
	                    {name:'nomal_commission',index:'nomal_commission',align:"center"}, 
	                    {name:'cashback_commission',index:'cashback_commission',align:"center"},               
	                    {name:'reward_commission',index:'reward_commission',align:"center"}, 
	                    {name:'shop_reward_commission',index:'shop_reward_commission',align:"center"},
	                    {name:'manmade_commission',index:'manmade_commission',align:"center"}, 
	                    {name:'service_commission',index:'service_commission',align:"center"},          
	                    {name:'clearup_commission',index:'clearup_commission',align:"center"}, 
	                    {name:'terminal_commission',index:'terminal_commission',align:"center"},
	                    {name:'undefined_commission',index:'undefined_commission',align:"center"}, 
	                    {name:'terminal_allowance_cost',index:'terminal_allowance_cost',align:"center"}
	                ],
	        loadComplete: function() {
	        var grid3 = $('#itemTable2');
	        var ids = grid3.getDataIDs();
	        for (var i = 0; i < ids.length; i++) {
	            grid3.setRowData ( ids[i], false, {height: 40} );//设置grid行高度
	           }},
	        pager: '#grid-Pager2',
	        shrinkToFit:false,
	   	    autoScroll: true,
	        rowNum:20,
	        viewrecords: true,
	        rowList:[10,20,30]
		 
	 }); 
}
/*效能整体情况*/
function efficacy__whole(){
	var data2 = [
		{sale_type:"1",major_type:"2",grid_code:"3",chnl_type3:"4",chnl_type4:"5",manage_dept_code:"6",
			manage_dept:"7",chnl_code:"8",chnl_name:"9",new_user_num:"1",new_user_account:"1",new_user_arrearage:"1",
			account_num:"1",account_total:"1",arrearage_total:"1",chnl_cost_total:"1",
			net_income:"1",commission_total:"1",channel_allowance:"1",terminal_remuneration:"1",terminal_allowance_cost:"1",channel_cost_percent:"1",
			commission_percent:"1",channel_allowance_percent:"1",terminal_remuneration_percent:"1",terminal_allowance_percent:"1",arrearage_percent:"1"
			}
		]
	     $("#itemTable1").jqGrid({
	    	    /* url :$.cxt+'/channelInfo/efficacy__whole',
	     			datatype:'json',
					mtype : 'POST',
					postdata : {},
	     		*/
		        datatype: "local", 
	            data: data2,           
			    altRows:true, 
	        colNames:['销售线','专业线','网格', '渠道类型（三级）','四级渠道类型','管理本部渠道编码','管理本部','渠道编码','渠道名称',
	        	'新发展用户数（户）','新发展用户出账应收（元）','新发展用户欠费（元）','期末出账用户数（户）','统计期间出账收入总额(元)',
	        	'统计期间欠费总额(元)','统计期间渠道费用总额(元)','统计期间净收入（元）','佣金总额（元）','渠道补贴','终端酬金',
	        	'终端补贴成本','渠道费用占收比','佣金占收比','渠道补贴占收比','终端酬金占收比','终端补贴占收比','欠费率'],
	        colModel:[
			            {name:'sale_type',index:'sale_type',align:"center"}, 
	                    {name:'major_type',index:'major_type',align:"center"}, 
	                    {name:'grid_code',index:'grid_code',align:"center"}, 
	                    {name:'chnl_type3',index:'chnl_type3',align:"center"},
	                    {name:'chnl_type4',index:'chnl_type4',align:"center"}, 
	                    {name:'manage_dept_code',index:'manage_dept_code',align:"center"}, 
	                    {name:'manage_dept',index:'manage_dept',align:"center"}, 
	                    {name:'chnl_code',index:'chnl_code',align:"center"},
	                    {name:'chnl_name',index:'chnl_name',align:"center"}, 
	                    {name:'new_user_num',index:'new_user_num',align:"center"},
	                    {name:'new_user_account',index:'new_user_account',align:"center"}, 
	                    {name:'new_user_arrearage',index:'new_user_arrearage',align:"center"}, 
	                    {name:'account_num',index:'account_num',align:"center"}, 
	                    {name:'account_total',index:'account_total',align:"center"},
	                    {name:'arrearage_total',index:'arrearage_total',align:"center"}, 
	                    {name:'chnl_cost_total',index:'chnl_cost_total',align:"center"}, 
	                    {name:'net_income',index:'net_income',align:"center"}, 
	                    {name:'commission_total',index:'commission_total',align:"center"},
	                    {name:'channel_allowance',index:'channel_allowance',align:"center"}, 
	                    {name:'terminal_remuneration',index:'terminal_remuneration',align:"center"},                   
	                    {name:'terminal_allowance_cost',index:'terminal_allowance_cost',align:"center"}, 
	                    {name:'channel_cost_percent',index:'channel_cost_percent',align:"center"},
	                    {name:'commission_percent',index:'commission_percent',align:"center"}, 
	                    {name:'channel_allowance_percent',index:'channel_allowance_percent',align:"center"}, 
	                    {name:'terminal_remuneration_percent',index:'terminal_remuneration_percent',align:"center"}, 
	                    {name:'terminal_allowance_percent',index:'terminal_allowance_percent',align:"center"},
	                    {name:'arrearage_percent',index:'arrearage_percent',align:"center"}
	                ],
	        loadComplete: function() {
	         var grid2 = $('#itemTable1');
	         var ids = grid2.getDataIDs();
	         for (var i = 0; i < ids.length; i++) {
	            grid2.setRowData ( ids[i], false, {height: 40} );//设置grid行高度
	           }},
	        height:200,
	        width:800,
		    autowidth : false,//必须要,否则没有水平滚动条
	   		shrinkToFit:false,
	   	    autoScroll: true,	//shrinkToFit: false,autoScroll: true,这两个属性产生水平滚动条   
	   	    multiselet: false,//checkbox
	   		viewrecords : true,
	   		rownumbers: true,
	        pager: '#grid-Pager1', 
	       // pagerpos : 'center',
	        rowNum:10,
	        rowList:[10,20,30]
	 });
}
/*   渠道异常识别表       */
function abnormal_info(){
	 var data6 =[
		 {chl_type:"1",chl_code:"2",chl_name:"3",supcard_users:"4",chl_refresh:"5",keep_users:"6",cheap_device_rank:"7",network_mode:"8",register_nickname:'9',belong_city:'10'}
		 ];
	$("#itemTable5").jqGrid({
		 datatype: "local",
		 data:data6,
		/* url : $.cxt + "channelInfo/abnormal_info",
		postdata : {channelId : channelId},
		type : "POST",
		mtype:'JSON', */
		colNames:['渠道类型','渠道编码','渠道名称','疑似养卡用户','渠道刷量','留存用户','低价设备排名','网络使用情况','注册昵称','注册手机号归属'],
		colModel:[
			{name:'chl_type',align:'center'},
			{name:'chl_code',align:'center'},
			{name:'chl_name',align:'center'},
			{name:'supcard_users',align:'center'},
			{name:'chl_refresh',align:'center'},
			{name:'keep_users',align:'center'},
			{name:'cheap_device_rank',align:'center'},
			{name:'network_mode',align:'center'},
			{name:'register_nickname',align:'center'},
			{name:'belong_city',align:'center'}
		],
		loadComplete: function() {
	         var grid2 = $('#itemTable5');
	         var ids = grid2.getDataIDs();
	         for (var i = 0; i < ids.length; i++) {
	            grid2.setRowData ( ids[i], false, {height: 40} );//设置grid行高度
	           }},
	        height:'auto',
	        width:800,  
		    autowidth : false,//必须要,否则没有水平滚动条
	   		shrinkToFit:false,
	   	    autoScroll: true,	//shrinkToFit: false,autoScroll: true,这两个属性产生水平滚动条    
	   	    multiselet: false,//checkbox
	   		viewrecords : true,
	   		rownumbers: true,
	        pager: '#grid-Pager5', 
	       // pagerpos : 'center',
	        rowNum:10,
	        rowList:[10,20,30]
	});
};
function getGridSchoolInfo(){
	var SCH_ID = $("#sch_id").text();
	$("#SCH_ID").empty();
	$("#SCH_NAME").empty();
	$("#SCH_WEB_ADDR").empty();
	$("#SCH_LEVEL").empty();
	$("#SCH_COMPETENT_ORG").empty();
	$("#SCH_USER").empty();
	$("#NEW_SCH_USER").empty();
	$("#TEACH_WORKS").empty();
	$("#CMCC_PERCNT").empty();
	$("#TYPE_NAME").empty();
	$("#SCH_PROPERTY").empty();
	$("#REMARK").empty();
	$("#AREA_ID").empty();
	$("#CMCC_SCH_ID").empty();
	$("#CMCC_AREA_ID").empty();
	$("#CMCC_AREA_NAME").empty();
	$("#SCH_LEVEL_ID").empty();
	$("#SCH_ADDR").empty();
	$("#IF_KEY_SCH").empty();
	$("#SCH_LONGTITUDE").empty();
	$("#SCH_LATITUDE").empty();
	$.ajax({
		url : $.cxt + '/gridSchoolInfo/getBaseGridSchoolInfo',
		data : {schId : SCH_ID},
		type : "POST",
		success : function(json){
			var data = JSON.parse(json);
			if(data.code == '0'){
				$("#SCH_ID").append(data.data[0].SCH_ID);
				$("#SCH_NAME").append(data.data[0].SCH_NAME);
				$("#SCH_WEB_ADDR").append(data.data[0].SCH_WEB_ADDR);
				$("#SCH_LEVEL").append(data.data[0].SCH_LEVEL);
				$("#SCH_COMPETENT_ORG").append(data.data[0].SCH_COMPETENT_ORG);
				$("#SCH_USER").append(data.data[0].SCH_USER);
				$("#NEW_SCH_USER").append(data.data[0].NEW_SCH_USER);
				$("#TEACH_WORKS").append(data.data[0].TEACH_WORKS == null || data.data[0].TEACH_WORKS == "" ? 0 : data.data[0].TEACH_WORKS);
				$("#CMCC_PERCNT").append(data.data[0].CMCC_PERCNT);
				$("#TYPE_NAME").append(data.data[0].TYPE_NAME == null || data.data[0].TYPE_NAME == "" ? 0 : data.data[0].TYPE_NAME);
				$("#SCH_PROPERTY").append(data.data[0].SCH_PROPERTY);
				$("#REMARK").append(data.data[0].REMARK == null || data.data[0].REMARK == "" ? 0 : data.data[0].REMARK);
				$("#AREA_ID").append(data.data[0].AREA_ID);
				$("#CMCC_SCH_ID").append(data.data[0].CMCC_SCH_ID == null || data.data[0].CMCC_SCH_ID == "" ? 0 : data.data[0].CMCC_SCH_ID);
				$("#CMCC_AREA_ID").append(data.data[0].CMCC_AREA_ID);
				$("#CMCC_AREA_NAME").append(data.data[0].CMCC_AREA_NAME);
				$("#SCH_LEVEL_ID").append(data.data[0].SCH_LEVEL_ID);
				$("#SCH_ADDR").append(data.data[0].SCH_ADDR);
				$("#IF_KEY_SCH").append(data.data[0].IF_KEY_SCH);
				$("#SCH_LONGTITUDE").append(data.data[0].SCH_LONGTITUDE);
				$("#SCH_LATITUDE").append(data.data[0].SCH_LATITUDE);
			}
		}
	})
}

function geGridSchoolInfoDay() {
//	var channelId = $("#channelId").text();
//	$.ajax({
//		url : $.cxt + '/channelInfo/getChannelInfoDay',
//		data : {channelId : channelId},
//		type : "POST",
//		success : function(json) {
//			var data = JSON.parse(json);
//			if(data.code == '0') {
//				$("#index_01").append(data.data[0].INDEX_01);
//				$("#index_02").append(data.data[0].INDEX_02);
//				$("#index_03").append(data.data[0].INDEX_03);
//				$("#index_04").append(data.data[0].INDEX_04);
//				$("#index_05").append(data.data[0].INDEX_05);
//			}
//		}
//	})
}

function initDate() {
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
	var yesterday = year +"-"+month +"-"+date;
	$("#dayKip").text("渠道日指标("+yesterday+")");
}

function OverContent(){
	$(".channelBaseInfoR").hover(function(){
		var content = $(this).text();
		var contentLength = $(this).text().length;
		if(contentLength > 15 ){
			$(this).attr("title", content);
		}
	})
	
}