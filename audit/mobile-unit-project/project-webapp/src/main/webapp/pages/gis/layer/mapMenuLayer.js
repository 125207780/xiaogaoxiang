/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};

// 全局的泡	
var marker;
var overlays = [];
var basicArr = new Array();
var basicArrMarker = new Array();
(function() {
    /** 
     * @exports SearchControlas BMapLib.SearchControl
     */
	var MenuControl = BMapLib.MenuControl = function(orgId, mainDiv) {
    	this.orgId = orgId;
    	this.mainDiv = mainDiv;
//    	initAreaDataByOrgId(orgId,3);
    	initCityInfo(orgId,3);
	}

	MenuControl.prototype = new BMap.Control();

	MenuControl.prototype.initialize = function(map) {
		var treeObj = null;
		this._map = map;
        var me = this;
        // 定义地图上方菜单栏
        var menuInfo = "<div id='menuInfo'>";
        menuInfo += "<span id='hiddenMenuInfo'>>></span>";
        menuInfo += "<span id='poiInfos'><span id='basicInfo'>基础信息</span>";
        menuInfo += "<span id='smallCell'>小格子</span>";
        menuInfo += "<span id='precisionMarketing'>精准营销</span>";
        menuInfo += "<span id='channelGrid'>小区网格</span>";
        menuInfo += "<span id='showTree'>基础单元信息导出</span>";
        menuInfo += "<span id='locationPoint' style='background: #4598F9'>定位</span></span>";
        menuInfo += "</div>";
        // 添加菜单栏
        this.mainDiv.append(menuInfo);
        
        // 定义基础信息弹出面板
        var poiInfo = "<div id='basicPoiInfo' data-display='none' style='display: none'>"
        	+ "<div id='wefwef'>"
        	+ "<div style='color: #000000'>基础信息</div>"
        	+ "<div style='width: 100%; border: 1px solid #4598F9'></div>"
        	+ "</div>"
        	+ "<div class='poiArea'>"
    		+ "<input type='hidden' value='' id='poiUId' />"
    		+ "<div id='poiTbody' style='top: 10px; width: 95%; height: 0px;'>"
    		+ "<table id='poiTable'>"
    		+ "<tr><td style='width:75%' align='left'><img class='poiImageInfo' src='" + $.cxt + "/pages/gis/layer/channel.png'><font style='color: #000000'>入格渠道</font></td><td valign='middle' align='left'><input name='basicPoi' class='basicPoi' type='checkbox' value='allChannel' /></td></tr>"
    		+ "<tr><td style='width:75%' align='left'><img class='poiImageInfo' src='" + $.cxt + "/pages/gis/layer/station.png'><font style='color: #000000'>入格基站</font></td><td valign='middle' align='left'><input name='basicPoi' class='basicPoi' type='checkbox' value='allStation' /></td></tr>"
    		+ "<tr><td style='width:75%' align='left'><img class='poiImageInfo' src='" + $.cxt + "/pages/gis/layer/town.png'><font style='color: #000000'>包保小区</font></td><td valign='middle' align='left'><input name='basicPoi' class='basicPoi' type='checkbox' value='importantCommunity' /></td></tr>"
    		+ "<tr><td style='width:75%' align='left'><img class='poiImageInfo' src='" + $.cxt + "/pages/gis/layer/town.png'><font style='color: #000000'>入格小区</font></td><td valign='middle' align='left'><input name='basicPoi' class='basicPoi' type='checkbox' value='community' /></td></tr>"
    		+ "<tr><td style='width:75%' align='left'><img class='poiImageInfo' src='" + $.cxt + "/pages/gis/layer/town.png'><font style='color: #000000'>未入格小区</font></td><td valign='middle' align='left'><input name='basicPoi' class='basicPoi' type='checkbox' value='nonCommunity' /></td></tr>"
    		+ "<tr><td style='width:75%' align='left'><img class='poiImageInfo' src='" + $.cxt + "/pages/gis/layer/town.png'><font style='color: #000000'>入格AB</font></td><td valign='middle' align='left'><input name='basicPoi' class='basicPoi' type='checkbox' value='allABGroup' /></td></tr>"
    		+ "<tr><td style='width:75%' align='left'><img class='poiImageInfo' src='" + $.cxt + "/pages/gis/layer/town.png'><font style='color: #000000'>入格CD</font></td><td valign='middle' align='left'><input name='basicPoi' class='basicPoi' type='checkbox' value='allCDGroup' /></td></tr>"
    		+ "<tr><td style='width:75%' align='left'><img class='poiImageInfo' src='" + $.cxt + "/pages/gis/layer/town.png'><font style='color: #000000'>未入格AB</font></td><td valign='middle' align='left'><input name='basicPoi' class='basicPoi' type='checkbox' value='nonABGroup' /></td></tr>"
    		+ "<tr><td style='width:75%' align='left'><img class='poiImageInfo' src='" + $.cxt + "/pages/gis/layer/town.png'><font style='color: #000000'>未入格CD</font></td><td valign='middle' align='left'><input name='basicPoi' class='basicPoi' type='checkbox' value='nonCDGroup' /></td></tr>"
    		+ "<tr><td style='width:75%' align='left'><img class='poiImageInfo' src='" + $.cxt + "/pages/gis/layer/market.png'><font style='color: #000000'>校园网格</font></td><td valign='middle' align='left'><input name='basicPoi' class='basicPoi' type='checkbox' value='gridSchool' /></td></tr>"
    		+ "<tr><td style='width:75%' align='left'><img class='poiImageInfo' src='" + $.cxt + "/pages/gis/layer/town.png'><font style='color: #000000'>写字楼</font></td><td valign='middle' align='left'><input name='basicPoi' class='basicPoi' type='checkbox' value='officeBuilding' /></td></tr>"
    		+ "<tr><td style='width:75%' align='left'><img class='poiImageInfo' src='" + $.cxt + "/pages/gis/layer/market.png'><font style='color: #000000'>政府单位</font></td><td valign='middle' align='left'><input name='basicPoi' class='basicPoi' type='checkbox' value='governmentUnit' /></td></tr>"
    		+ "</table></div></div>";
        this.mainDiv.append(poiInfo);
        
        // 定义小格子弹出面板
        var smallCellInfo ="<div id='smallCellInfo' data-display='none' style='display: none'>"
			+ "<div id='smallCellfirst'>"
	    	+ "<font style='color: #000000'>一&nbsp;&nbsp;级&nbsp;:</font>"
	    	+ "<select id='smallCellfirstInfo'>"
	    	+ "</select>"
	    	+ "</div>"
	    	+ "<div id='smallCellsecond'>" 
        	+ "<font style='color: #000000'>二&nbsp;&nbsp;级&nbsp;:</font>"
        	+ "<select id='smallCellsecondInfo'style='width:76px;'>"
        	+ "<option value=''>请选择...</option>"
        	+ "</select>"
        	+ "</div>"
			+ "</div>";
        this.mainDiv.append(smallCellInfo);
        
        // 精准营销弹出面板
        var precisionMarketingInfo = "<div id='precisionMarketingInfo' data-display='none' style='display: none'>";
        precisionMarketingInfo += "<div id='precisionMarketingInfoDiv'><div style='margin-top: 15px'><font style='color: #000000'>基础信息类型：</font><select class='basicPoiSelect' id='basicPoiOneInfo'>";
        precisionMarketingInfo += "<option value=''>---请选择基础信息类型---</option>";
        precisionMarketingInfo += "<option value='basicChannel'>渠道</option>";
        precisionMarketingInfo += "<option value='basicStation'>基站</option>";
        precisionMarketingInfo += "<option value='basicCommunity'>小区</option>";
        precisionMarketingInfo += "<option value='basicAbGroup'>AB集团</option>";
        precisionMarketingInfo += "<option value='basicCdGroup'>CD集团</option></select>";
        precisionMarketingInfo += "<font style='color: #000000'>基础信息：</font><select class='basicPoiSelect' id='basicPoiTwoInfo'>";
        precisionMarketingInfo += "<option value=''>---请选择基础信息---</option></select></div>";
        precisionMarketingInfo += "<div style='margin-top: 10px'><font style='color: #000000'>展示周边信息：</font><select id='basicPoiImgInfo' multiple='multiple'>";
        precisionMarketingInfo += "<option value='channel'>入格渠道</option>";
        precisionMarketingInfo += "<option value='station'>入格基站</option>";
        precisionMarketingInfo += "<option value='importantCommunity'>包保小区</option>";
        precisionMarketingInfo += "<option value='community'>入格小区</option>";
        precisionMarketingInfo += "<option value='nonCommunity'>未入格小区</option>";
        precisionMarketingInfo += "<option value='allABGroup'>入格AB</option>";
        precisionMarketingInfo += "<option value='allCDGroup'>入格CD</option>";
        precisionMarketingInfo += "<option value='nonABGroup'>未入格AB</option>";
        precisionMarketingInfo += "<option value='nonCDGroup'>未入格CD</option>";
        precisionMarketingInfo += "<option value='gridSchool'>校园网格</option>";
        precisionMarketingInfo += "<option value='officeBuilding'>写字楼</option>";
        precisionMarketingInfo += "<option value='governmentUnit'>政府单位</option></select>";
        precisionMarketingInfo += "<font style='color: #000000'>显示距离：</font><input type='text' style='width: 153px !important' value='1000' name='distance' id='distance' /></div>";
        precisionMarketingInfo += "</div></div>";
        this.mainDiv.append(precisionMarketingInfo);
        $('.basicPoiSelect').multipleSelect({
			width: 153,
			filter: true,
			single: true
		});
        $('#basicPoiImgInfo').multipleSelect({
        	placeholder: '---请选择周边基础信息---',
			width: 153,
			filter: true,
		});
        $("#basicPoiImgInfo").multipleSelect('uncheckAll');
        // 定义左下角关闭/显示网格信息
        var showGridInfoDiv = "<div id='showGridInfoDiv' attr-data='true'>关闭显示网格信息</div>";
        this.mainDiv.append(showGridInfoDiv);
        this.mainDiv.append(showGridInfo());
        $('#gridInfoDivId').css('display','block');
        // 定义左下角关闭/显示渠道信息
        var downChannelInfoDiv = "<div id='downChannelInfoDivId'>区县渠道信息展示</div>";
        this.mainDiv.append(downChannelInfoDiv);
        
//        // 定义左下角区县弹出面板信息
//        var channelInfoDiv = '<div id="channelInfoDivId">' 
//        	+ "<div id='areaNameId'><font id='cntyInfoName'>///</font>区县渠道信息展示</div>"
//        	+ "<div id='backInfo'>最小化</div>"
//        	+ "<table id='channelInfoTable'>"
//        	+ "<tr>"
//    		+ "<td style='style='width: 110px;' align='left'>区县名称：<span style='color: #000000' id='CNTY_NAME'></span></td>"
//    		+ "<td style='style='width: 110px;' align='left'>网格总数：<span id='GRID_COUNT'></span></td>"
//    		+ "</tr>"
//    		+ "<tr>"
//    		+ "<td style='style='width: 110px;' align='left'>一类网格：<span style='color: #000000' id='GRID_TYPE1'></td>"
//    		+ "<td style='style='width: 110px;' align='left'>二类网格：<span style='color: #000000' id='GRID_TYPE2'></td>"
//    		+ "</tr>"
//    		+ "<tr>"
//    		+ "<td style='style='width: 110px;' align='left'>三类网格：<span style='color: #000000' id='GRID_TYPE3'></td>"
//    		+ "<td style='style='width: 110px;' align='left'>渠道数：<span style='color: #000000' id='CHNL_COUNT'></td>"
//    		+ "</tr>"
//    		+ "<tr>"
//    		+ "<td style='style='width: 110px;' align='left'>基站数：<span style='color: #000000' id='STATION_COUNT'></td>"
//    		+ "<td style='style='width: 110px;' align='left'>小区数：<span style='color: #000000' id='CELL_COUNT'></td>"
//    		+ "</tr>"
//    		+ "<tr>"
//    		+ "<td style='style='width: 110px;' align='left'>重点小区数：<span style='color: #000000' id='ZDCELL_COUNT'></td>"
//    		+ "<td style='style='width: 110px;' align='left'>高价值低占小区数：<span style='color: #000000' id='HIGHVALUE_CELL_COUNT'></td>"
//    		+ "</tr>"
//    		+ "<tr>"
//    		+ "<td style='style='width: 110px;' align='left'>AB集团数：<span style='color: #000000' id='AB_JT_COUNT'></td>"
//    		+ "<td style='style='width: 110px;' align='left'>CD集团数：<span style='color: #000000' id='CD_JT_COUNT'></td>"
//    		+ "</tr>"
//    		+ "<tr>"
//    		+ "<td style='style='width: 110px;' align='left'>端口数：<span style='color: #000000' id='PORT_COUNT'></td>"
//    		+ "<td style='style='width: 110px;' align='left'>九级地址数：<span style='color: #000000' id='ADDR9_COUNT'></td>"
//    		+ "</tr>"
//    		+ "<tr>"
//    		+ "<td style='style='width: 110px;' align='left'>个人客户总计费收入(万)：<span style='color: #000000' id='INCOME'></td>"
//    		+ "<td style='style='width: 110px;' align='left'>放号量(户)：<span style='color: #000000' id='TELE_COUNT'></td>"
//    		+ "</tr>"
//    		+ "<tr>"
//    		+ "<td style='style='width: 110px;' align='left'>新增宽带(户)：<span style='color: #000000' id='BRO_ADD_COUNT'></td>"
//    		+ "<td style='style='width: 110px;' align='left'>终端合约(台)：<span style='color: #000000' id='TERMINAL_COUNT'></td>"
//    		+ "</tr>"
//    		+ "<tr>"
//    		+ "<td style='style='width: 110px;' align='left'>家庭网新增(户)：<span style='color: #000000' id='HOMENET_ADD_COUNT'></td>"
//    		+ "<td style='style='width: 110px;' align='left'>高价低占小区宽带新增(户)：<span style='color: #000000' id='CELLRATE_ADD_SUM'></td>"
//    		+ "</tr>"
//    		+ "<tr>"
//    		+ "<td style='style='width: 110px;' align='left'>90后客户规模提升(个)：<span style='color: #000000' id='ADD_VALUE_COUNT'></td>"
//    		+ "<td style='style='width: 110px;' align='left'>头部客户宽带新增(户)：<span style='color: #000000' id='FUSE_RATE'></td>"
//    		+ "</tr>"
//    		+ "<tr>"
//    		+ "<td style='style='width: 110px;' align='left'>商客拓展(个)：<span style='color: #000000' id='ENCLOSURE_COUNT'></td>"
//    		+ "<td></td>"
//    		+ "</tr>"
//			+ "</table>"
//			+ "</div>";
       var channelInfoDiv = "<div id='channelInfoDivId'  style='display:none;'>"
    	+ "<div id='areaNameId'>"
    	+ "<font id='cityInfoName'>///全省</font><font style='margin-right:12px;float:right;' id='channelClose'>关闭</font>"
    	+ "</div>"
    	+ "<div id='channelInfoDiv'>"
    	+ "<table id='channelInfoTable'>"
    	+ "<tr><td style='width: 110px;' align='left'>网格总数<span id='GRID_COUNT1'></span></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>一类网格<span style='color: #000000' id='GRID_TYPE11'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>二类网格<span style='color: #000000' id='GRID_TYPE21'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>三类网格<span style='color: #000000' id='GRID_TYPE31'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>总渠道数<span style='color: #000000' id='CHNL_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>已入格渠道数<span style='color: #000000' id='CHNL_WG_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>总基站数<span id='STATION_COUNT1'></span></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>已入格基站数<span style='color: #000000' id='STATION_WG_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>基站小区数<span style='color: #000000' id='STATION_CELL_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>已入格基站小区<span style='color: #000000' id='STATION_CELL_WG_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>宽带小区数<span style='color: #000000' id='CHNL_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>已入格宽带小区数<span style='color: #000000' id='CELL_WG_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>AB集团数<span style='color: #000000' id='AB_JT_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>已入格AB集团数<span id='ABJT_WG_COUNT1'></span></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>CD集团数<span style='color: #000000' id='CD_JT_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>已入格CD集团数<span style='color: #000000' id='CDJT_WG_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>高价值低占小区数<span style='color: #000000' id='GJDZ_CELL_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>已入格高价值低占小区<span style='color: #000000' id='GJDZ_CELL_WG_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>放号量（户）<span style='color: #000000' id='TELE_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>个人客户总计费收入（万）<span id='CUS_INCOME1'></span></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>新增宽带（户）<span style='color: #000000' id='BRO_ADD_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>终端合约（台）<span style='color: #000000' id='TERMINAL_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>家庭网新增（户）<span style='color: #000000' id='HOMENET_ADD_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>高价值低占小区宽带新增（户）<span style='color: #000000' id='GJDZ_ADD_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>90后客户规模提升（个）<span style='color: #000000' id='AFTER90_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>头部客户宽带新增（户）<span style='color: #000000' id='FUSEUSR_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>商客拓展（个）<span id='ENCLOSURE_COUNT1'></span></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>客户发展（个）<span style='color: #000000' id='CUS_DVP_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>宽带新增（个）<span style='color: #000000' id='KD_ADD_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>合约融合（个）<span style='color: #000000' id='CONTRACT_INT_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>九级地址数<span style='color: #000000' id='ADDR9_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>总端口数<span style='color: #000000' id='PORT_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>空闲端口数<span id='PORT_FEE_COUNT1'></span></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>楼栋数<span style='color: #000000' id='BUILDING_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>光纤箱（是否光交箱）<span style='color: #000000' id='GXX_COUNT1'></td></tr>"
    	+ "<tr><td style='width: 110px;' align='left'>分纤箱<span style='color: #000000' id='FXX_COUNT1'></td></tr>"
    	+ "</table></div>" +
    	+ "</div>";
        this.mainDiv.append(channelInfoDiv);
        
        // 定位变量定义
        var locationDiv = "<div id='locationDiv'></div>";
        this.mainDiv.append(locationDiv);
        
        var showDetailHtml = '<div id="showDetailDiv">'
        + '<div>'
        + '<div style="float:right;padding:10px; id="closeShowDetailDiv"><span>X</span></div>'
        + '<div style="float:right;padding:10px;"><button class="firstBtn btn btn-sm btn-linear-blue" id="showDetailExport">导出</button></div>'
        + '</div>'
        + '<div>'
        + '<table id="showDetail_table" data-option="fitColumns: true, scrollbarSize: 0" style="width: 29px; color: #fff; overflow-x: auto; border-collapse: separate; border-spacing: 0px 0px;"></table>'
		+ '<div id="showDetail_grid-pager"></div>'
		 + '</div>'
	    + '</div>';
        this.mainDiv.append(showDetailHtml);
        $("#downChannelInfoDivId").on("click", downChannelInfoDivId);
        function downChannelInfoDivId() {
        	$("#channelInfoDivId").toggle("blind", {direction:'left'});
        	$("#downChannelInfoDivId").css("display", "none");
        	showLocation(false);
        	showSmallArea(false);
        	destroyLocationInfo();
        }

        // 打开/关闭上方菜单信息
        $("#hiddenMenuInfo").on("click", hiddenMenuInfo);
        function hiddenMenuInfo() {
        	var hiddenMenuInfoFlag = $("#hiddenMenuInfo").text();
        	if(hiddenMenuInfoFlag == ">>") {
        		$("#hiddenMenuInfo").html("<<");
            	$("#poiInfos").toggle("blind", {direction:'left'});
            	$("#menuInfoPrevThree").toggle("blind", {direction:'left'});
        	} else {
        		$("#hiddenMenuInfo").html(">>");
            	$("#poiInfos").toggle("blind", {direction:'left'});
            	$("#menuInfoPrevThree").toggle("blind", {direction:'left'});
        	}
        }
        
        // 打开/关闭网格显示信息
        $("#showGridInfoDiv").on("click", showGridInfoDivId);
        function showGridInfoDivId() {
        	var isShowGridInfo = $("#showGridInfoDiv").attr("attr-data");
        	if(isShowGridInfo == "true") {
        		$('#gridInfoDivId').css('display','none');
        		$("#showGridInfoDiv").html("打开显示网格信息");
        		$("#showGridInfoDiv").css("color", "#FFFFFF");
        		$("#showGridInfoDiv").attr("attr-data", "false");
        	} else {
        		emptyGridInfo();
        		$('#gridInfoDivId').css('display','block');
        		$("#showGridInfoDiv").html("关闭显示网格信息");
        		$("#showGridInfoDiv").css("color", "cyan");
        		$("#showGridInfoDiv").attr("attr-data", "true");
        	}
        }
        
        $("#gridClose").on("click", gridClose);
        function gridClose() {
        	var isShowGridInfo = $("#showGridInfoDiv").attr("attr-data");
        	if(isShowGridInfo == "true") {
        		$('#gridInfoDivId').css('display','none');
        		$("#showGridInfoDiv").html("打开显示网格信息");
        		$("#showGridInfoDiv").css("color", "#FFFFFF");
        		$("#showGridInfoDiv").attr("attr-data", "false");
        	} else {
        		emptyGridInfo();
        		$('#gridInfoDivId').css('display','block');
        		$("#showGridInfoDiv").html("关闭显示网格信息");
        		$("#showGridInfoDiv").css("color", "cyan");
        		$("#showGridInfoDiv").attr("attr-data", "true");
        	}
        }
        
        
        
        
        
        
        
        //清除网格列表信息
        function emptyGridInfo(){
        	$("#GRID_COUNT").html("");
	 		$("#GRID_TYPE1").html("");
	 		$("#GRID_TYPE2").html("");
	 		$("#GRID_TYPE3").html("");
	 		$("#CHNL_COUNT").html("");
	 		$("#CHNL_WG_COUNT").html("");
	 		$("#STATION_COUNT").html("");
	 		$("#STATION_WG_COUNT").html("");
	 		$("#STATION_CELL_COUNT").html("");
	 		$("#STATION_CELL_WG_COUNT").html("");
	 		$("#CELL_COUNT").html("");
	 		$("#CELL_WG_COUNT").html("");
	 		$("#AB_JT_COUNT").html("");
	 		$("#ABJT_WG_COUNT").html("");
	 		$("#CD_JT_COUNT").html("");
	 		$("#CDJT_WG_COUNT").html("");
	 		$("#GJDZ_CELL_COUNT").html("");
	 		$("#GJDZ_CELL_WG_COUNT").html("");
	 		$("#CUS_INCOME").html("");
	 		$("#TELE_COUNT").html("");
	 		$("#BRO_ADD_COUNT").html("");
	 		$("#TERMINAL_COUNT").html("");
	 		$("#HOMENET_ADD_COUNT").html("");
	 		$("#GJDZ_ADD_COUNT").html("");
	 		$("#AFTER90_COUNT").html("");
	 		$("#FUSEUSR_COUNT").html("");
	 		$("#ENCLOSURE_COUNT").html("");
	 		$("#CUS_DVP_COUNT").html("");
	 		$("#KD_ADD_COUNT").html("");
	 		$("#CONTRACT_INT_COUNT").html("");
	 		$("#PORT_COUNT").html("");
	 		$("#ADDR9_COUNT").html("");
	 		$("#PORT_FEE_COUNT").html("");
	 		$("#BUILDING_COUNT").html("");
	 		$("#GXX_COUNT").html("");
	 		$("#FXX_COUNT").html("");
        }
        function showGridInfo(){
        	var gridInfoDiv = "<div id='gridInfoDivId'  style='display:none;'>"
            	+ "<div id='areaNameId'>"
            	+ "<font id='gridInfoName'>///网格名称</font><font style='margin-right:12px;float:right;' id='gridClose'>关闭</font>"
            	+ "</div>"
            	+ "<div id='gridInfoDivTable'>"
            	+ "<table id='gridInfoTable'>"
            	+ "<tr><td style='width: 110px;' align='left'>网格总数<span id='GRID_COUNT'></span></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>一类网格<span style='color: #000000' id='GRID_TYPE1'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>二类网格<span style='color: #000000' id='GRID_TYPE2'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>三类网格<span style='color: #000000' id='GRID_TYPE3'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>总渠道数<span style='color: #000000' id='CHNL_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>已入格渠道数<span style='color: #000000' id='CHNL_WG_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>总基站数<span id='STATION_COUNT'></span></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>已入格基站数<span style='color: #000000' id='STATION_WG_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>基站小区数<span style='color: #000000' id='STATION_CELL_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>已入格基站小区<span style='color: #000000' id='STATION_CELL_WG_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>宽带小区数<span style='color: #000000' id='CHNL_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>已入格宽带小区数<span style='color: #000000' id='CELL_WG_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>AB集团数<span style='color: #000000' id='AB_JT_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>已入格AB集团数<span id='ABJT_WG_COUNT'></span></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>CD集团数<span style='color: #000000' id='CD_JT_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>已入格CD集团数<span style='color: #000000' id='CDJT_WG_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>高价值低占小区数<span style='color: #000000' id='GJDZ_CELL_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>已入格高价值低占小区<span style='color: #000000' id='GJDZ_CELL_WG_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>放号量（户）<span style='color: #000000' id='TELE_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>个人客户总计费收入（万）<span id='CUS_INCOME'></span></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>新增宽带（户）<span style='color: #000000' id='BRO_ADD_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>终端合约（台）<span style='color: #000000' id='TERMINAL_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>家庭网新增（户）<span style='color: #000000' id='HOMENET_ADD_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>高价值低占小区宽带新增（户）<span style='color: #000000' id='GJDZ_ADD_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>90后客户规模提升（个）<span style='color: #000000' id='AFTER90_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>头部客户宽带新增（户）<span style='color: #000000' id='FUSEUSR_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>商客拓展（个）<span id='ENCLOSURE_COUNT'></span></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>客户发展（个）<span style='color: #000000' id='CUS_DVP_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>宽带新增（个）<span style='color: #000000' id='KD_ADD_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>合约融合（个）<span style='color: #000000' id='CONTRACT_INT_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>九级地址数<span style='color: #000000' id='ADDR9_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>总端口数<span style='color: #000000' id='PORT_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>空闲端口数<span id='PORT_FEE_COUNT'></span></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>楼栋数<span style='color: #000000' id='BUILDING_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>光纤箱（是否光交箱）<span style='color: #000000' id='GXX_COUNT'></td></tr>"
            	+ "<tr><td style='width: 110px;' align='left'>分纤箱<span style='color: #000000' id='FXX_COUNT'></td></tr>"
            	+ "</table></div></div>";
                return gridInfoDiv;
        }
        
     // 关闭渠道面板
        $("#channelClose").on("click", channelClose);
        function channelClose() {
        	$("#downChannelInfoDivId").toggle("blind", {direction:'left'});
        	$("#channelInfoDivId").css("display", "none");
        	showLocation(false);
        	showSmallArea(false);
        	destroyLocationInfo();
        }
        //关闭精准营销明细面板
        $("#closeShowDetailDiv").on("click", closeShowDetailDiv);
        function closeShowDetailDiv() {
        	$("#showDetailDiv").css("display", "none");
        }
        //导出
        $("#showDetailExport").on("click", function(e) {
        	alert("0000");
        });
    
        
        // 点击菜单基础信息展示树信息，并隐藏其他信息
        $("#basicInfo").on("click", basicInfo);
        function basicInfo() {
        	if($("#basicPoiInfo").attr("data-display") == "none") {
        		$("#basicPoiInfo").toggle("blind", {direction: 'left'});
        		$("#basicPoiInfo").attr("data-display", "block");
        	} else {
        		$("#basicPoiInfo").toggle("blind", {direction: 'left'});
        		$("#basicPoiInfo").attr("data-display", "none");
        	}
    		$("#smallCellInfo").css("display", "none");
    		$("#smallCellInfo").attr("data-display", "none");
    		$("#precisionMarketingInfo").css("display", "none");
    		$("#precisionMarketingInfo").attr("data-display", "none");
    		showLocation(false);
    		showSmallArea(false);
    		destroyLocationInfo();
        }
        
        // 点击菜单小格子展示小格子信息，并隐藏其他信息
        $("#smallCell").on("click", smallCell);
        initFirstTypeInfo();
        function smallCell() {
        	showLocation(false);
        	showSmallArea(false);
        	destroyLocationInfo();
        	if($("#smallCellInfo").attr("data-display") == "none") {
        		$("#smallCellInfo").toggle("blind", {direction: 'left'});
        		$("#smallCellInfo").attr("data-display", "block");
        		
        		$("#smallCellfirstInfo").val("");
        		var htmltv = "<option value=''>请选择...</option>";
        		$("#smallCellsecondInfo").empty();
        		$("#smallCellsecondInfo").html(htmltv);
        		if(me._map.gridLayer) {
        			me._map.gridLayer.hideInfo();
        		}
        	} else {
        		$("#smallCellInfo").toggle("blind", {direction: 'left'});
        		$("#smallCellInfo").attr("data-display", "none");
        		if(me._map.gridLayer) {
        			me._map.gridLayer.showInfo();
        		}
        	}
    		$("#basicPoiInfo").css("display", "none");
    		$("#basicPoiInfo").attr("data-display", "none");
    		$("#precisionMarketingInfo").css("display", "none");
    		$("#precisionMarketingInfo").attr("data-display", "none");
        }
        
        // 基础单元信息导出
        $("#showTree").on("click", showTree);
        function showTree() {
        	$('#modal-map-BUI .modal-title').empty();
			$('#modal-map-BUI .modal-title').append("基础单元信息导出");
			$('#modal-map-BUI').modal({
				backdrop : 'static',
				keyboard : false,
				show : true
			});
			
			$("#checkAllPoiInfo").on("change", checkAllPoiInfo);
			//未入格全选
			$("#checkAllPoiInfoNotEnter").on("change", checkAllPoiInfoNotEnter);
			//网格导出功能(未入格)
			$("#exportGridInfoNotEnter").on("click", exportGridInfoNotEnter);
			//网格导出功能
			$("#exportGridInfo").on("click", exportGridInfo);
			initGridMapGrid();
        	showLocation(false);
        	showSmallArea(false);
        	destroyLocationInfo();
        }
        
        // 全选/反选已入格复选框
        function checkAllPoiInfo() {
        	if ($("#checkAllPoiInfo").prop("checked")) { // 全选
        		$("input[type='checkbox'][name='exportInfos']").prop("checked",true);
        	} else { // 取消全选     
        		$("input[type='checkbox'][name='exportInfos']").prop("checked",false);
        	}  
        }
        
        // 全选/反选未入格复选框
        function checkAllPoiInfoNotEnter() {
        	if ($("#checkAllPoiInfoNotEnter").prop("checked")) { 
        		// 全选
                $("input[type='checkbox'][name='exportInfosNotEnter']").prop("checked",true);
            } else { 
            	// 取消全选     
                $("input[type='checkbox'][name='exportInfosNotEnter']").prop("checked",false);
            }  
        }
        
        // 已入格基础信息导出
        function exportGridInfoNotEnter() {
        	var gridInfos = [];
        	// 循环遍历复选框的值
        	$.each($('input[name="exportInfosNotEnter"]:checked'),function(i){
        		gridInfos[i] = $(this).val();
            });
        	// 判断是否有选择基础单元信息，没有选择则提示选择
        	if(null == gridInfos || gridInfos.length == 0 || undefined == gridInfos) {
        		messageAlert("请选择要导出的基础单元!");
        	} else {
        		// 拼接到一个text标签中
        		var  orgId = $("#hiddenOrgId").val();
        		var orgLevel=$("#hiddenOrgLevel").val();
        		var html = "<input type='text' value='" + gridInfos +"' name='gridInfos' />";
        		html += "<input type='text' value='" + orgId + "' name='orgId' />";
        		html += "<input type='text' value='" + orgLevel + "' name='orgLevel' />";
        		// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
        		$('<form method="POST" action="' + $.cxt + '/map/exportGridInfoNotEnter">' + html + '</form>').appendTo('body').submit().remove();
        	}
        }
        
        // 未入格基础信息导出
        function exportGridInfo() {
        	var gridInfos = [];
        	var gridCode = $("#gridInfos option:selected").val();
        	var gridName = $("#gridInfos option:selected").text();
        	// 循环遍历复选框的值
        	$.each($('input[name="exportInfos"]:checked'),function(i){
        		gridInfos[i] = $(this).val();
            });
        	// 判断是否有选择基础单元信息，没有选择则提示选择
        	if(null == gridInfos || gridInfos.length == 0 || undefined == gridInfos) {
        		messageAlert("请选择要导出的基础单元!");
        	} else {
        		// 拼接到一个text标签中
        		var  orgId = $("#hiddenOrgId").val();
        		var orgLevel=$("#hiddenOrgLevel").val();
        		var html = "<input type='text' value='" + gridInfos +"' name='gridInfos' />";
        		html += "<input type='text' value='" + gridCode + "' name='gridCode' />";
        		html += "<input type='text' value='" + gridName + "' name='gridName' />";
        		html += "<input type='text' value='" + orgId + "' name='orgId' />";
        		html += "<input type='text' value='" + orgLevel + "' name='orgLevel' />";
        		// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
        		$('<form method="POST" action="' + $.cxt + '/map/exportGridInfo01">' + html + '</form>').appendTo('body').submit().remove();
        	}
        }
        
        // 初始化网格地图
        function initGridMapGrid() {
        	var orgId =$("#hiddenOrgId").val();
        	$.ajax({
        		url: $.cxt + "/gridCommon/initGridInfo",
        		data: {orgId: orgId},
        		type: "POST",
        		success: function(data) {
        			var htmltv = "<option value=''>全部</option>";
        			for(var i = 0, n = data.length; i < n; i++) {
        				htmltv += "<option value='" + data[i].orgId + "'>" + data[i].name + "</option>";
        			}
        			$("#gridInfos").html(htmltv);
        		}
        	});
        }

        // 点击精准营销展示精准营销信息，并隐藏其他信息
        $("#precisionMarketing").on("click", precisionMarketing);
        function precisionMarketing() {
        	showLocation(false);
        	showSmallArea(false);
        	destroyLocationInfo();
        	if($("#precisionMarketingInfo").attr("data-display") == "none") {
        		$("#precisionMarketingInfo").toggle("blind", {direction: 'left'});
        		$("#precisionMarketingInfo").attr("data-display", "block");
        	} else {
        		$("#precisionMarketingInfo").toggle("blind", {direction: 'left'});
        		$("#precisionMarketingInfo").attr("data-display", "none");
        	}
    		$("#smallCellInfo").css("display", "none");
    		$("#smallCellInfo").attr("data-display", "none");
    		$("#basicPoiInfo").css("display", "none");
    		$("#basicPoiInfo").attr("data-display", "none");
        }
        
        // 基础信息类型选择后，获取基础信息下拉框内容
        $("#basicPoiOneInfo").on("change", basicPoiOneInfo);
        function basicPoiOneInfo() {
        	$("#locationDiv").empty();
        	$("#locationDiv").show();
        	if(locationChannelInfoList) {
    			var len = locationChannelInfoList.length;
    			while(len--) {
    				locationChannelInfoList[len].destroy();
    			}
    		}
        	locationChannelInfoList = [];
        	if(locationStationInfoList) {
        		var len = locationStationInfoList.length;
    			while(len--) {
    				locationStationInfoList[len].destroy();
    			}
        	}
        	locationStationInfoList = [];
        	destroyLocationInfo();
        	showSmallArea(false);
        	pointLngLat = [];
	    	// 先删除泡
        	me._map.removeOverlay(marker);
        	points = [];
        	// 先把之前画的清除
			if(locationBasicInfo) {
        		me._map.removeOverlay(locationBasicInfo);
        	}
        	var basicPoiOneInfoSelect = $("#basicPoiOneInfo option:selected").val();
        	$.ajax({
        		url: $.cxt + "/map/getBasicPoiInfo",
        		type: "POST",
        		data: {orgId: $("#hiddenOrgId").val(), basicPoiOneInfoSelect: basicPoiOneInfoSelect},
        		success: function(result) {
        			var json = JSON.parse(result);
        			if(json.code == "0") {
        				if(undefined != json.data && null != json.data && "" != json.data) {
        					var htmltv = "<option value=''>---请选择基础信息---</option>";
        					var data = json.data;
        					for(var i = 0, n = data.length; i < n; i++) {
        						htmltv += "<option value='" + data[i].ID + "'>" + data[i].NAME + "</option>";
        					}
        					$("#basicPoiTwoInfo").html(htmltv);
        					$('#basicPoiTwoInfo').multipleSelect('refresh');
        				}
        			} else {
        				var htmltv = "<option value=''>---请选择基础信息---</option>";
        				$("#basicPoiTwoInfo").html(htmltv);
    					$('#basicPoiTwoInfo').multipleSelect('refresh');
        			}
        		}
        	});
        	// 如果基础信息下拉框改变了，则将展示周边信息下拉框清空
        	if($("#basicPoiImgInfo option:selected").length > 0)
        		$("#basicPoiImgInfo").multipleSelect('uncheckAll');
        }

        // 定义定位变量
        var locationBasicInfo;
        var pointLngLat = [];
        // 选择了基础信息后，在地图上打点定位
        $("#basicPoiTwoInfo").on("change", basicPoiTwoInfo);
        function basicPoiTwoInfo() {
        	destroyLocationInfo();
        	showSmallArea(false);
        	pointLngLat = [];
        	var basicPoiOneInfoSelect = $("#basicPoiOneInfo option:selected").val();
        	var basicPoiTwoInfoSelect = $("#basicPoiTwoInfo option:selected").val();
        	// 根据基础单元类型，基础单元查询对应的经纬度
        	$.ajax({
        		url: $.cxt + "/map/getBasicPoiInfoById",
        		type: "POST",
        		async: false,
        		data: {basicPoiOneInfoSelect: basicPoiOneInfoSelect, basicPoiTwoInfoSelect: basicPoiTwoInfoSelect},
        		success: function(result) {
        			var json = JSON.parse(result);
        			if(json.code == "0") {
        				json = json.data;
        				if(undefined != json) {
        					pointLngLat.push(json.LNG, json.LAT);
        					// 根据该点，画出一个distance文本框中距离的文本框（比如显示1000米范围内）
        					drawSquare(pointLngLat, $("#distance").val());
                	    	// 先删除泡
                        	me._map.removeOverlay(marker);
                        	// 中心点
        			    	var centerPoint = new BMap.Point(json.LNG, json.LAT);
        			    	// 地图中心点
        			    	me._map.centerAndZoom(centerPoint, 11);
        			    	// 新的泡
        			    	marker = new BMap.Marker(centerPoint);
        			    	// 添加新的泡
        			    	me._map.addOverlay(marker);
        				}
        			}
        		}
        	});
        	// 如果基础信息下拉框改变了，则将展示周边信息下拉框清空
        	if($("#basicPoiImgInfo option:selected").length > 0)
        		$("#basicPoiImgInfo").multipleSelect('uncheckAll');
        }
        
        var points = [];
        // 根据该点，画出一个distance文本框中距离的文本框（比如显示1000米范围内）
        function drawSquare(pointLngLats, raidus) {
        	points = [];
        	// 先把之前画的清除
			if(locationBasicInfo) {
        		me._map.removeOverlay(locationBasicInfo);
        	}
        	$.ajax({
        		url: $.cxt + "/gridCommon/getAround",
        		type: "POST",
        		async: false,
        		data: {lat: pointLngLats[1], lon: pointLngLats[0], raidus: raidus},
        		success: function(r) {
        			 //获取中心点
        	        var pointCenter = {lng: pointLngLats[0], lat: pointLngLats[1]}
        			var data = JSON.parse(r).data;
//        			var locationBasicInfos = new BMap.Polygon([
//                		new BMap.Point(data[1], data[0]),
//                		new BMap.Point(data[1], data[2]),
//                		new BMap.Point(data[3], data[2]),
//                		new BMap.Point(data[3], data[0])
//                	], {strokeColor: "red", strokeWeight: 2, strokeOpacity: 0.5}); // 创建多边形
        			locationBasicInfo = new BMap.Circle(pointCenter, raidus, {
        	            strokeColor: "red",
        	            strokeWeight: 2,
        	            fillColor: "#E2E8F1",
        	            fillOpacity: 0.7
        	        });
                	me._map.addOverlay(locationBasicInfo);
                	points.push(data[3], data[2], data[1], data[0]);
        		}
        	});
        }

        var locationChannelInfoList = [];
        var locationStationInfoList = [];
        var locationImportantCommunityInfoList = [];
        var locationCommunityInfoList = [];
        var locationNonCommunityInfoList = [];
        var locationAllABGroupInfoList = [];
        var locationAllCDGroupInfoList = [];
        var locationNonABGroupInfoList = [];
        var locationNonCDGroupInfoList = [];
        var locationGridSchoolCostInfoList = [];
        var locationOfficeBuildingInfoList = [];
        var locationGovernmentUnitInfoList = [];
        
        // 选择了展示周边信息，在地图上打点
        $("#basicPoiImgInfo").on("change", basicPoiImgInfo);
        function basicPoiImgInfo(){
        	var basicPoiTwoInfoSelect = $("#basicPoiTwoInfo option:selected").val();
        	if(null == basicPoiTwoInfoSelect || "" == basicPoiTwoInfoSelect) {
        		messageAlert("请选择基础信息进行定位！");
        	} else {
        		var basicPoiImgInfoSelect = $("#basicPoiImgInfo option:selected");
        		$("#locationDiv").empty();
            	$("#locationDiv").show();
            	if(locationChannelInfoList) {
        			var len = locationChannelInfoList.length;
        			while(len--) {
        				locationChannelInfoList[len].destroy();
        			}
        		}
            	locationChannelInfoList = [];
            	
            	if(locationStationInfoList) {
            		var len = locationStationInfoList.length;
        			while(len--) {
        				locationStationInfoList[len].destroy();
        			}
            	}
            	locationStationInfoList = [];
            	
            	if(locationCommunityInfoList) {
            		var len = locationCommunityInfoList.length;
        			while(len--) {
        				locationCommunityInfoList[len].destroy();
        			}
            	}
            	locationCommunityInfoList = [];
            	
            	if(locationImportantCommunityInfoList) {
            		var len = locationImportantCommunityInfoList.length;
        			while(len--) {
        				locationImportantCommunityInfoList[len].destroy();
        			}
            	}
            	locationImportantCommunityInfoList = [];
            	
            	if(locationNonCommunityInfoList) {
            		var len = locationNonCommunityInfoList.length;
        			while(len--) {
        				locationNonCommunityInfoList[len].destroy();
        			}
            	}
            	locationNonCommunityInfoList = [];
            	
            	if(locationAllABGroupInfoList) {
            		var len = locationAllABGroupInfoList.length;
        			while(len--) {
        				locationAllABGroupInfoList[len].destroy();
        			}
            	}
            	locationAllABGroupInfoList = [];
            	
            	if(locationAllCDGroupInfoList) {
            		var len = locationAllCDGroupInfoList.length;
        			while(len--) {
        				locationAllCDGroupInfoList[len].destroy();
        			}
            	}
            	locationAllCDGroupInfoList = [];
            	
            	if(locationNonABGroupInfoList) {
            		var len = locationNonABGroupInfoList.length;
        			while(len--) {
        				locationNonABGroupInfoList[len].destroy();
        			}
            	}
            	locationNonABGroupInfoList = [];
            	
            	if(locationNonCDGroupInfoList) {
            		var len = locationNonCDGroupInfoList.length;
        			while(len--) {
        				locationNonCDGroupInfoList[len].destroy();
        			}
            	}
            	locationNonCDGroupInfoList = [];
            	
            	if(locationGridSchoolCostInfoList) {
            		var len = locationGridSchoolCostInfoList.length;
        			while(len--) {
        				locationGridSchoolCostInfoList[len].destroy();
        			}
            	}
            	locationGridSchoolCostInfoList = [];
            	
             	if(locationOfficeBuildingInfoList) {
            		var len = locationOfficeBuildingInfoList.length;
        			while(len--) {
        				locationOfficeBuildingInfoList[len].destroy();
        			}
            	}
             	locationOfficeBuildingInfoList = [];
             	
             	if(locationGovernmentUnitInfoList) {
            		var len = locationGovernmentUnitInfoList.length;
        			while(len--) {
        				locationGovernmentUnitInfoList[len].destroy();
        			}
            	}
             	locationGovernmentUnitInfoList = [];
            	var html="<table  width='100%' height='100%'  ><tr class='firstTr' style='background:#108dec;height:27px;'><td  colspan='2'><span>周边资源</span></td></tr>"
            	for(var i = 0; i < basicPoiImgInfoSelect.length; i++) {
            		if("channel" == basicPoiImgInfoSelect[i].value) {
            			$.ajax({
                    		url: $.cxt + "/gridCommon/getChannelByShape",
                    		type: "POST",
                    		async: false,
                    		data: {orgId: me.orgId, maxLng: points[0], maxLat: points[1], minLng: points[2], minLat: points[3]},
                    		success: function(list) {
                    			list = JSON.parse(list);
                    			var img = new Image();
                    			img.src = $.cxt + "/pages/gis/layer/channel.png";
                    			var len = list.length;
             				
                    			var channelList =[];
                    			var markerlist = [];
                    			while(len--) {
                    				var lng = list[len].LNG;
                    				var lat = list[len].LAT;	
                    				var point = new BMap.Point(lng, lat);
                    				//判断点是否在
                    	            if(BMapLib.GeoUtils.isPointInCircleNew(point,locationBasicInfo)){
                    	            	var marker = {
                        					geometry: {
                        						type: 'Point',
                        						coordinates: [lng, lat]
                        					},
                        					uid: list[len].UID,
                        					icon: img
                        				}
                        				markerlist.push(marker);
                        				channelList.push(list[len].UID);
                    	            }
                    			}
            				
                    			var options = {
            						draw: 'icon',
            						width: 30,
            			        	height: 30,
            					}
            				
                    			var dataSet = new mapv.DataSet(markerlist);
                    			var layer= new mapv.baiduMapLayer(me._map, dataSet, options);
                    			layer.show();
            				  
                    			locationChannelInfoList.push(layer);
                    			 html += "<tr class='numTr' onclick=\"showDetail('"+basicPoiImgInfoSelect[i].value+"','"+me.orgId+"','"+points[0]+"','"+points[1]+"','"+points[2]+"','"+points[3]+"')\"><td>渠道数量</td><td>" + list.length + "</td></tr>";
                    		}
                    	});
            		} else if("station" == basicPoiImgInfoSelect[i].value) {
            			$.ajax({
                    		url: $.cxt + "/gridCommon/getStationByShape",
                    		type: "POST",
                    		async: false,
                    		data: {orgId: me.orgId, maxLng: points[0], maxLat: points[1], minLng: points[2], minLat: points[3]},
                    		success: function(list) {
                    			list = JSON.parse(list);
                    			var img = new Image();
                    			img.src = $.cxt + "/pages/gis/layer/station.png";
                    			var len = list.length;
             				
                    			var stationList =[];
                    			var markerlist = [];
                    			while(len--) {
                    				
                    				var lng = list[len].LNG;
                    				var lat = list[len].LAT;	
                    				var point = new BMap.Point(lng, lat);
                    				//判断点是否在
                    	            if(BMapLib.GeoUtils.isPointInCircleNew(point,locationBasicInfo)){
                    	            	var marker = {
                        					geometry: {
                        						type: 'Point',
                        						coordinates: [lng, lat]
                        					},
                        					uid: list[len].UID,
                        					icon: img
                        				}
                        				markerlist.push(marker);
                    	            	stationList.push(list[len].UID);
                    	            }
                    			}
            				
                    			var options = {
            						draw: 'icon',
            						width: 30,
            			        	height: 30,
            					}
            				
                    			var dataSet = new mapv.DataSet(markerlist);
                    			var layer= new mapv.baiduMapLayer(me._map, dataSet, options);
                    			layer.show();
            				  
                    			locationStationInfoList.push(layer);
                    			 html += "<tr class='numTr' onclick=\"showDetail('"+basicPoiImgInfoSelect[i].value+"')\"><td>基站数量</td><td>" + list.length + "</td></tr>";
                    			
                    		}
                    	});
            		} else if("importantCommunity" == basicPoiImgInfoSelect[i].value) {
            			$.ajax({
                    		url: $.cxt + "/gridCommon/getImportantCommunityByShape",
                    		type: "POST",
                    		async: false,
                    		data: {orgId: me.orgId, maxLng: points[0], maxLat: points[1], minLng: points[2], minLat: points[3]},
                    		success: function(list) {
                    			list = JSON.parse(list);
                    			var img = new Image();
                    			img.src = $.cxt + "/pages/gis/layer/station.png";
                    			var len = list.length;
             				
                    			var importantCommunityList =[];
                    			var markerlist = [];
                    			while(len--) {
                    				var lng = list[len].LNG;
                    				var lat = list[len].LAT;	
                    				var point = new BMap.Point(lng, lat);
                    				//判断点是否在
                    	            if(BMapLib.GeoUtils.isPointInCircleNew(point, locationBasicInfo)){
                    	            	var marker = {
                        					geometry: {
                        						type: 'Point',
                        						coordinates: [lng, lat]
                        					},
                        					uid: list[len].UID,
                        					icon: img
                        				}
                        				markerlist.push(marker);
                    	            	importantCommunityList.push(list[len].UID);
                    	            }
                    			}
            				
                    			var options = {
            						draw: 'icon',
            						width: 30,
            			        	height: 30,
            					}
            				
                    			var dataSet = new mapv.DataSet(markerlist);
                    			var layer= new mapv.baiduMapLayer(me._map, dataSet, options);
                    			layer.show();
            				  
                    			locationImportantCommunityInfoList.push(layer);
                    			 html += "<tr class='numTr' onclick=\"showDetail('"+basicPoiImgInfoSelect[i].value+"')\"><td>重点小区数量</td><td>" + list.length + "</td></tr>";
                    		}
                    	});
            		} else if("community" == basicPoiImgInfoSelect[i].value) {
            			$.ajax({
                    		url: $.cxt + "/gridCommon/getCommunityByShape",
                    		type: "POST",
                    		async: false,
                    		data: {orgId: me.orgId, maxLng: points[0], maxLat: points[1], minLng: points[2], minLat: points[3]},
                    		success: function(list) {
                    			list = JSON.parse(list);
                    			var img = new Image();
                    			img.src = $.cxt + "/pages/gis/layer/station.png";
                    			var len = list.length;
             				
                    			var communityList =[];
                    			var markerlist = [];
                    			while(len--) {
                    				var lng = list[len].LNG;
                    				var lat = list[len].LAT;	
                    				var point = new BMap.Point(lng, lat);
                    				//判断点是否在
                    	            if(BMapLib.GeoUtils.isPointInCircleNew(point, locationBasicInfo)){
                    	            	var marker = {
                        					geometry: {
                        						type: 'Point',
                        						coordinates: [lng, lat]
                        					},
                        					uid: list[len].UID,
                        					icon: img
                        				}
                        				markerlist.push(marker);
                    	            	communityList.push(list[len].UID);
                    	            }
                    			}
            				
                    			var options = {
            						draw: 'icon',
            						width: 30,
            			        	height: 30,
            					}
            				
                    			var dataSet = new mapv.DataSet(markerlist);
                    			var layer= new mapv.baiduMapLayer(me._map, dataSet, options);
                    			layer.show();
            				  
                    			locationCommunityInfoList.push(layer);
                    			 html += "<tr  class='numTr' onclick=\"showDetail('"+basicPoiImgInfoSelect[i].value+"')\"><td>小区数量</td><td>" + list.length + "</td></tr>";
                    		}
                    	});
            		} else if("nonCommunity" == basicPoiImgInfoSelect[i].value) {
            			$.ajax({
                    		url: $.cxt + "/gridCommon/getNonCommunityByShape",
                    		type: "POST",
                    		async: false,
                    		data: {orgId: me.orgId, maxLng: points[0], maxLat: points[1], minLng: points[2], minLat: points[3]},
                    		success: function(list) {
                    			list = JSON.parse(list);
                    			var img = new Image();
                    			img.src = $.cxt + "/pages/gis/layer/station.png";
                    			var len = list.length;
             				
                    			var nonCommunityList =[];
                    			var markerlist = [];
                    			while(len--) {
                    				var lng = list[len].LNG;
                    				var lat = list[len].LAT;	
                    				var point = new BMap.Point(lng, lat);
                    				//判断点是否在
                    	            if(BMapLib.GeoUtils.isPointInCircleNew(point, locationBasicInfo)){
                    	            	var marker = {
                        					geometry: {
                        						type: 'Point',
                        						coordinates: [lng, lat]
                        					},
                        					uid: list[len].UID,
                        					icon: img
                        				}
                        				markerlist.push(marker);
                    	            	nonCommunityList.push(list[len].UID);
                    	            }
                    			}
            				
                    			var options = {
            						draw: 'icon',
            						width: 30,
            			        	height: 30,
            					}
            				
                    			var dataSet = new mapv.DataSet(markerlist);
                    			var layer= new mapv.baiduMapLayer(me._map, dataSet, options);
                    			layer.show();
            				  
                    			locationNonCommunityInfoList.push(layer);
                    			 html += "<tr  class='numTr' onclick=\"showDetail('"+basicPoiImgInfoSelect[i].value+"')\"><td>未入格小区数量</td><td>" + list.length + "</td></tr>";
                    		}
                    	});
            		} else if("allABGroup" == basicPoiImgInfoSelect[i].value) {
            			$.ajax({
                    		url: $.cxt + "/gridCommon/getAllABGroupByShape",
                    		type: "POST",
                    		async: false,
                    		data: {orgId: me.orgId, maxLng: points[0], maxLat: points[1], minLng: points[2], minLat: points[3]},
                    		success: function(list) {
                    			list = JSON.parse(list);
                    			var img = new Image();
                    			img.src = $.cxt + "/pages/gis/layer/station.png";
                    			var len = list.length;
             				
                    			var allABGroupByShapeList =[];
                    			var markerlist = [];
                    			while(len--) {
                    				var lng = list[len].LNG;
                    				var lat = list[len].LAT;	
                    				var point = new BMap.Point(lng, lat);
                    				//判断点是否在
                    	            if(BMapLib.GeoUtils.isPointInCircleNew(point, locationBasicInfo)){
                    	            	var marker = {
                        					geometry: {
                        						type: 'Point',
                        						coordinates: [lng, lat]
                        					},
                        					uid: list[len].UID,
                        					icon: img
                        				}
                        				markerlist.push(marker);
                    	            	allABGroupByShapeList.push(list[len].UID);
                    	            }
                    			}
            				
                    			var options = {
            						draw: 'icon',
            						width: 30,
            			        	height: 30,
            					}
            				
                    			var dataSet = new mapv.DataSet(markerlist);
                    			var layer= new mapv.baiduMapLayer(me._map, dataSet, options);
                    			layer.show();
            				  
                    			locationAllABGroupInfoList.push(layer);
                    			 html += "<tr  class='numTr' onclick=\"showDetail('"+basicPoiImgInfoSelect[i].value+"')\"><td>入格AB集团数量</td><td>" + list.length + "</td></tr>";
                    		}
                    	});
            		}else if("allCDGroup" == basicPoiImgInfoSelect[i].value) {
            			$.ajax({
                    		url: $.cxt + "/gridCommon/getAllCDGroupByShape",
                    		type: "POST",
                    		async: false,
                    		data: {orgId: me.orgId, maxLng: points[0], maxLat: points[1], minLng: points[2], minLat: points[3]},
                    		success: function(list) {
                    			list = JSON.parse(list);
                    			var img = new Image();
                    			img.src = $.cxt + "/pages/gis/layer/station.png";
                    			var len = list.length;
             				
                    			var allCDGroupByShapeList =[];
                    			var markerlist = [];
                    			while(len--) {
                    				var lng = list[len].LNG;
                    				var lat = list[len].LAT;	
                    				var point = new BMap.Point(lng, lat);
                    				//判断点是否在
                    	            if(BMapLib.GeoUtils.isPointInCircleNew(point, locationBasicInfo)){
                    	            	var marker = {
                        					geometry: {
                        						type: 'Point',
                        						coordinates: [lng, lat]
                        					},
                        					uid: list[len].UID,
                        					icon: img
                        				}
                        				markerlist.push(marker);
                    	            	allCDGroupByShapeList.push(list[len].UID);
                    	            }
                    			}
            				
                    			var options = {
            						draw: 'icon',
            						width: 30,
            			        	height: 30,
            					}
            				
                    			var dataSet = new mapv.DataSet(markerlist);
                    			var layer= new mapv.baiduMapLayer(me._map, dataSet, options);
                    			layer.show();
            				  
                    			locationAllCDGroupInfoList.push(layer);
                    			 html += "<tr  class='numTr' onclick=\"showDetail('"+basicPoiImgInfoSelect[i].value+"')\"><td>入格CD集团数量</td><td>" + list.length + "</td></tr>";
                    		}
                    	});
            		}else if("nonABGroup" == basicPoiImgInfoSelect[i].value) {
            			$.ajax({
                    		url: $.cxt + "/gridCommon/getNonABGroupByShape",
                    		type: "POST",
                    		async: false,
                    		data: {orgId: me.orgId, maxLng: points[0], maxLat: points[1], minLng: points[2], minLat: points[3]},
                    		success: function(list) {
                    			list = JSON.parse(list);
                    			var img = new Image();
                    			img.src = $.cxt + "/pages/gis/layer/station.png";
                    			var len = list.length;
             				
                    			var nonABGroupByShapeList =[];
                    			var markerlist = [];
                    			while(len--) {
                    				var lng = list[len].LNG;
                    				var lat = list[len].LAT;	
                    				var point = new BMap.Point(lng, lat);
                    				//判断点是否在
                    	            if(BMapLib.GeoUtils.isPointInCircleNew(point, locationBasicInfo)){
                    	            	var marker = {
                        					geometry: {
                        						type: 'Point',
                        						coordinates: [lng, lat]
                        					},
                        					uid: list[len].UID,
                        					icon: img
                        				}
                        				markerlist.push(marker);
                    	            	nonABGroupByShapeList.push(list[len].UID);
                    	            }
                    			}
            				
                    			var options = {
            						draw: 'icon',
            						width: 30,
            			        	height: 30,
            					}
            				
                    			var dataSet = new mapv.DataSet(markerlist);
                    			var layer= new mapv.baiduMapLayer(me._map, dataSet, options);
                    			layer.show();
            				 
                    			locationNonABGroupInfoList.push(layer);
                    			 html += "<tr  class='numTr' onclick=\"showDetail('"+basicPoiImgInfoSelect[i].value+"')\"><td>未入格AB集团数量</td><td>" + list.length + "</td></tr>";
                    		}
                    	});
            		}else if("nonCDGroup" == basicPoiImgInfoSelect[i].value) {
            			$.ajax({
                    		url: $.cxt + "/gridCommon/getNonCDGroupByShape",
                    		type: "POST",
                    		async: false,
                    		data: {orgId: me.orgId, maxLng: points[0], maxLat: points[1], minLng: points[2], minLat: points[3]},
                    		success: function(list) {
                    			list = JSON.parse(list);
                    			var img = new Image();
                    			img.src = $.cxt + "/pages/gis/layer/station.png";
                    			var len = list.length;
             				
                    			var nonCDGroupByShapeList =[];
                    			var markerlist = [];
                    			while(len--) {
                    				var lng = list[len].LNG;
                    				var lat = list[len].LAT;	
                    				var point = new BMap.Point(lng, lat);
                    				//判断点是否在
                    	            if(BMapLib.GeoUtils.isPointInCircleNew(point, locationBasicInfo)){
                    	            	var marker = {
                        					geometry: {
                        						type: 'Point',
                        						coordinates: [lng, lat]
                        					},
                        					uid: list[len].UID,
                        					icon: img
                        				}
                        				markerlist.push(marker);
                    	            	nonCDGroupByShapeList.push(list[len].UID);
                    	            }
                    			}
            				
                    			var options = {
            						draw: 'icon',
            						width: 30,
            			        	height: 30,
            					}
            				
                    			var dataSet = new mapv.DataSet(markerlist);
                    			var layer= new mapv.baiduMapLayer(me._map, dataSet, options);
                    			layer.show();
            				 
                    			locationNonCDGroupInfoList.push(layer);
                    			html += "<tr  class='numTr' onclick=\"showDetail('"+basicPoiImgInfoSelect[i].value+"')\"><td>未入格CD集团数量</td><td>" + list.length + "</td></tr>";
                    		}
                    	});
            		}else if("gridSchool" == basicPoiImgInfoSelect[i].value) {
            			$.ajax({
                    		url: $.cxt + "/gridCommon/getGridSchoolByShape",
                    		type: "POST",
                    		async: false,
                    		data: {orgId: me.orgId, maxLng: points[0], maxLat: points[1], minLng: points[2], minLat: points[3]},
                    		success: function(list) {
                    			list = JSON.parse(list);
                    			var img = new Image();
                    			img.src = $.cxt + "/pages/gis/layer/station.png";
                    			var len = list.length;
             				
                    			var gridSchoolByShapeList =[];
                    			var markerlist = [];
                    			while(len--) {
                    				var lng = list[len].LNG;
                    				var lat = list[len].LAT;	
                    				var point = new BMap.Point(lng, lat);
                    				//判断点是否在
                    	            if(BMapLib.GeoUtils.isPointInCircleNew(point, locationBasicInfo)){
                    	            	var marker = {
                        					geometry: {
                        						type: 'Point',
                        						coordinates: [lng, lat]
                        					},
                        					uid: list[len].UID,
                        					icon: img
                        				}
                        				markerlist.push(marker);
                    	            	gridSchoolByShapeList.push(list[len].UID);
                    	            }
                    			}
            				
                    			var options = {
            						draw: 'icon',
            						width: 30,
            			        	height: 30,
            					}
            				
                    			var dataSet = new mapv.DataSet(markerlist);
                    			var layer= new mapv.baiduMapLayer(me._map, dataSet, options);
                    			layer.show();
            				 
                    			locationGridSchoolCostInfoList.push(layer);
                    			html += "<tr  class='numTr' onclick=\"showDetail('"+basicPoiImgInfoSelect[i].value+"')\"><td>校园网络数量</td><td>" + list.length + "</td></tr>";
                    		}
                    	});
            		}else if("officeBuilding" == basicPoiImgInfoSelect[i].value) {
            			$.ajax({
                    		url: $.cxt + "/gridCommon/getOfficeBuildingByShape",
                    		type: "POST",
                    		async: false,
                    		data: {orgId: me.orgId, maxLng: points[0], maxLat: points[1], minLng: points[2], minLat: points[3]},
                    		success: function(list) {
                    			list = JSON.parse(list);
                    			var img = new Image();
                    			img.src = $.cxt + "/pages/gis/layer/station.png";
                    			var len = list.length;
             				
                    			var officeBuildingByShapeList =[];
                    			var markerlist = [];
                    			while(len--) {
                    				var lng = list[len].LNG;
                    				var lat = list[len].LAT;	
                    				var point = new BMap.Point(lng, lat);
                    				//判断点是否在
                    	            if(BMapLib.GeoUtils.isPointInCircleNew(point, locationBasicInfo)){
                    	            	var marker = {
                        					geometry: {
                        						type: 'Point',
                        						coordinates: [lng, lat]
                        					},
                        					uid: list[len].UID,
                        					icon: img
                        				}
                        				markerlist.push(marker);
                    	            	officeBuildingByShapeList.push(list[len].UID);
                    	            }
                    			}
            				
                    			var options = {
            						draw: 'icon',
            						width: 30,
            			        	height: 30,
            					}
            				
                    			var dataSet = new mapv.DataSet(markerlist);
                    			var layer= new mapv.baiduMapLayer(me._map, dataSet, options);
                    			layer.show();
            				 
                    			locationOfficeBuildingInfoList.push(layer);
                    			html += "<tr  class='numTr' onclick=\"showDetail('"+basicPoiImgInfoSelect[i].value+"')\")'><td>写字楼数量</td><td>" + list.length + "</td></tr>";
                    		}
                    	});
            		}else if("governmentUnit" == basicPoiImgInfoSelect[i].value) {
            			$.ajax({
                    		url: $.cxt + "/gridCommon/getGovernmentUnitByShape",
                    		type: "POST",
                    		async: false,
                    		data: {orgId: me.orgId, maxLng: points[0], maxLat: points[1], minLng: points[2], minLat: points[3]},
                    		success: function(list) {
                    			list = JSON.parse(list);
                    			var img = new Image();
                    			img.src = $.cxt + "/pages/gis/layer/station.png";
                    			var len = list.length;
             				
                    			var governmentUnitByShapeList =[];
                    			var markerlist = [];
                    			while(len--) {
                    				var lng = list[len].LNG;
                    				var lat = list[len].LAT;	
                    				var point = new BMap.Point(lng, lat);
                    				//判断点是否在
                    	            if(BMapLib.GeoUtils.isPointInCircleNew(point, locationBasicInfo)){
                    	            	var marker = {
                        					geometry: {
                        						type: 'Point',
                        						coordinates: [lng, lat]
                        					},
                        					uid: list[len].UID,
                        					icon: img
                        				}
                        				markerlist.push(marker);
                    	            	governmentUnitByShapeList.push(list[len].UID);
                    	            }
                    			}
            				
                    			var options = {
            						draw: 'icon',
            						width: 30,
            			        	height: 30,
            					}
            				
                    			var dataSet = new mapv.DataSet(markerlist);
                    			var layer= new mapv.baiduMapLayer(me._map, dataSet, options);
                    			layer.show();
            				 
                    			locationGovernmentUnitInfoList.push(layer);
                    			html +="<tr  class='numTr' onclick=\"showDetail('"+basicPoiImgInfoSelect[i].value+"')\"><td>政府单位数量</td><td>" + list.length + "</td></tr>";
                    		}
                    	});
            		}
            	}
            	html += "</table>";
            	$("#locationDiv").append(html);
        	}
        }
        

        // 当输入距离失去焦点后，重新绘制地图
        $("#distance").on("blur", distance);
        function distance() {
        	if(pointLngLat.length == 0) {
        		messageAlert("请先选择基础信息！");
        		return;
        	}
        	drawSquare(pointLngLat, $("#distance").val());
        	basicPoiImgInfo();
        }
        
        // 菜单定位点击事件
        $("#locationPoint").click(function(){
        	destroyLocationInfo();
        	showSmallArea(false);
        	$("#smallCellInfo").css("display", "none");
    		$("#smallCellInfo").attr("data-display", "none");
    		$("#basicPoiInfo").css("display", "none");
    		$("#basicPoiInfo").attr("data-display", "none");
    		$("#precisionMarketingInfo").css("display", "none");
    		$("#precisionMarketingInfo").attr("data-display", "none");
        	if($("#locationPoint").attr("data-select")=="selected"){
        		showLocation(false)
        	}else{
        		showLocation(true)
        	}
        });
        // 定义定位变量
        var locationInfo;
        function showLocation(flag) {
        	if(locationInfo) {
        		me._map.removeOverlay(locationInfo);
        		$("#locationDiv").hide();
        	}
        	if(flag) {
        		$("#locationPoint").css("background-color", "#4598F9");
        		$("#locationPoint").attr("data-select", "selected");
        		if(me._map.gridLayer) {
        			me._map.gridLayer.hideInfo();
        			
        		}
        		me._map.addEventListener("click", clickLocation);
        	} else {
        		$("#locationPoint").css("background-color", "#4598F9");
        		$("#locationPoint").attr("data-select", "unselected");
        		if(me._map.gridLayer) {
        			me._map.gridLayer.showInfo();
        		}
        		me._map.removeEventListener("click", clickLocation);
        	}
        }
       
        function clickLocation(e) {
        	if(locationInfo) {
        		me._map.removeOverlay(locationInfo);
        	}
        	$.ajax({
        		url: $.cxt + "/gridCommon/getAround",
        		type: "POST",
        		async: false,
        		data: {lat: e.point.lat, lon: e.point.lng, raidus: 500},
        		success: function(r) {
        			var data = JSON.parse(r).data;
        			locationInfo = new BMap.Polygon([
                		new BMap.Point(data[1], data[0]),
                		new BMap.Point(data[1], data[2]),
                		new BMap.Point(data[3], data[2]),
                		new BMap.Point(data[3], data[0])
                	], {strokeColor: "red", strokeWeight: 2, strokeOpacity: 0.5});  //创建多边形
                	me._map.addOverlay(locationInfo);
                	showLocationInfo(data[3], data[2], data[1], data[0]);
        		}
        	});
        }
        var locationInfoList = [];
        function showLocationInfo(maxLng, maxLat, minLng, minLat) {
        	$("#locationDiv").empty();
        	$("#locationDiv").show();
        	if(locationInfoList) {
    			var len = locationInfoList.length;
    			while(len--) {
    				locationInfoList[len].destroy();
    			}
    		}
        	locationInfoList = [];
        	$.ajax({
        		url: $.cxt + "/gridCommon/getStationByShape",
        		type: "POST",
        		async: false,
        		data: {orgId: me.orgId, maxLng: maxLng, maxLat: maxLat, minLng: minLng, minLat: minLat},
        		success: function(list) {
        			list = JSON.parse(list);
        			var img = new Image();
        			img.src = $.cxt + "/pages/gis/layer/station.png";
        			var len = list.length;
 				
        			var stationList =[];
        			var markerlist = [];
        			while(len--) {
        				var lng = list[len].LNG;
        				var lat = list[len].LAT;	
					 
        				var marker = {
        					geometry: {
        						type: 'Point',
        						coordinates: [lng, lat]
        					},
        					uid: list[len].UID,
        					icon: img
        				}
        				markerlist.push(marker);
        				stationList.push(list[len].UID);
        			}
				
        			var options = {
						draw: 'icon',
						width: 30,
			        	height: 30,
					}
				
        			var dataSet = new mapv.DataSet(markerlist);
        			var layer= new mapv.baiduMapLayer(me._map, dataSet, options);
        			layer.show();
				  
        			locationInfoList.push(layer);
        			var stationCost = $("<div>基站数量:" + list.length + "</div>");
        			stationCost.click(function() {
						topwindow.showWindow({
							title: '基站规模',
							data: {uids: stationList.join(",")},
							url: $.cxt + "/pages/gis/indexPage/stationCost.jsp",
							bottons: [{
								title: "关闭" ,
								fun: function() {
									topwindow.removeWindow();
								}
							}]
						});
			        });
				  
        			$("#locationDiv").append(stationCost);
        		}
        	})
        	//再有其他的数据 接着往下写 ，
        }
        
        // 清除其他的样式
        function destroyLocationInfo() {
        	if(locationInfoList) {
        		var len = locationInfoList.length;
        		while(len--) {
        			locationInfoList[len].destroy();
        		}
        	}
        	$("#locationDiv").empty();
        	$("#locationDiv").hide();
        }
        
        function initFirstTypeInfo() {
        	$.ajax({
        		url: $.cxt + "/netResources/firstTypeInfo",
        		type: "POST",
        		async: false,
        		data: {},
        		success: function(data) {
        			var data = JSON.parse(data);
        			if (data.code == '0') {
        				$("#smallCellfirstInfo").empty();
        				var htmltv = "<option value=''>" + '请选择...' + "</option>";
        				for (i = 0; i < data.data.length; i++) {
        					htmltv += "<option value='" + data.data[i].NET_CODE + "'>" + data.data[i].NET_NAME+ "</option>";
        				}
        				$("#smallCellfirstInfo").append(htmltv);
        			}
        			
        		}
        	})
        	$("#smallCellfirstInfo").unbind();
        	$("#smallCellfirstInfo").change(function(){
				smallCellsecondType();
        	});
        }
        
        function smallCellsecondType() {
        	var pId = $("#smallCellfirstInfo").find("option:selected").val();
        	$.ajax({
        		url: $.cxt + "/netResources/secondTypeInfo",
        		type: "POST",
        		async: false,
        		data: {
        			pId: pId
        		},
        		success: function(data) {
        			var data = JSON.parse(data);
        			if (data.code == '0') {
        				$("#smallCellsecondInfo").empty();
        				var htmltv = "<option value=''>" + '请选择...' + "</option>";
        				for (i = 0; i < data.data.length; i++) {
        					htmltv += "<option value='" + data.data[i].P_ID + "'>" + data.data[i].NET_NAME + "</option>";
        				}
        				$("#smallCellsecondInfo").append(htmltv);
        			}
        		}
        	})
        }
        
        $("#smallCellsecondInfo").change(function() {
        	showSmallArea(true);
        })
        var smallAreaLayer;
        function showSmallArea(flag) {
        	if(smallAreaLayer) {
        		smallAreaLayer.destroy();
        	}
        	
        	var smallCellsecondInfo = $("#smallCellsecondInfo").val();
        	
        	if(smallCellsecondInfo != ""&&flag) {
        		$.ajax({
            		url: $.cxt + "/gridCommon/getSmallArea",
            		type: "POST",
            		async: false,
            		data: {orgId: me.orgId},
            		success: function(list){
            			list = JSON.parse(list);
            			var len = list.length;
            			var data = [];
            			while(len--) {
            				var obj = list[len];
            				data.push({
            					geometry: {
            						type: 'Polygon',
            		            	coordinates: [
            		            		[[obj.MINLNG, obj.MINLAT], [obj.MINLNG, obj.MAXLAT], [obj.MAXLNG,obj.MAXLAT], [obj.MAXLNG, obj.MINLAT]]
            		             	]
            		         	},
            		        	fillStyle: getColor(),
            		        	obj:obj
            		       	});
            			}
            			var dataSet = new mapv.DataSet(data);
            			var options = {
            				// 边界样式
         					strokeStyle: 'rgba(145, 174, 233, 0.8)',
         					// 轮廓线条宽度
         					lineWidth: 2,
         					draw: 'intensity',
            				methods: {
            					click: function(item) {
            						if(item) {
            			        		var obj = item.obj;
            			        		showLocationInfo(obj.MAXLNG,obj.MAXLAT,obj.MINLNG,obj.MINLAT);
            			        	}
            			     	}
            				}
            			}
            			smallAreaLayer = new mapv.baiduMapLayer(me._map, dataSet, options);
            		}
            	});
        	}
        }
        // 根据指标值返回颜色 ，测试阶段就随机生成了
        function getColor(index) { 
        	var r = parseInt(55 + 200 * Math.random());
        	var g = parseInt(55 + 200 * Math.random());
        	var b = parseInt(55 + 200 * Math.random());
        	return 'rgba(' + r+',' + g + ',' + b + ',0.5)';
        }
        
        $(".basicPoi").on("click", basicPoi);
        function basicPoi() {
    		if($(this).val() == "channel") {
    			if($(this).is(":checked")) {
					// 根据渠道开关，显示设置范围内的渠道信息
					poiInfo = new BMapLib.ChannelLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), "PART", $("#hiddenOrgId").val()); 
				} else {
					// 根据渠道开关，隐藏渠道信息
					poiInfo = new BMapLib.ChannelLayer(null, null, null, "PART", this.orgId);
				}
    		} else if($(this).val() == "station") {
    			if($(this).is(":checked")) {
					// 根据基站开关，显示设置范围内的基站信息
					poiInfo = new BMapLib.StationLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), "PART", $("#hiddenOrgId").val());
				} else {
					// 根据基站开关，隐藏基站信息
					poiInfo = new BMapLib.StationLayer(null, null, null, "PART", this.orgId);  
				}
    		} else if($(this).val() == "mall") {
    			if($(this).is(":checked")) {
					// 根据商场开关，显示设置范围内的商场信息
					poiInfo = new BMapLib.MallLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据商场开关，隐藏商场信息
					poiInfo = new BMapLib.MallLayer(null, null, null, $("#hiddenOrgId").val()); 
				}
    		} else if($(this).val() == "school") {
    			if($(this).is(":checked")) {
					// 根据学校开关，显示设置范围内的学校信息
					poiInfo = new BMapLib.NewSchoolLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据学校开关，隐藏学校信息
					poiInfo = new BMapLib.NewSchoolLayer(null, null, null, $("#hiddenOrgId").val());  
				}
    		} else if($(this).val() == "gridSchool") {
    			if($(this).is(":checked")) {
					// 根据网格学校开关，显示设置范围内的网格学校信息
					poiInfo = new BMapLib.GridSchoolLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据学校开关，隐藏学校信息
					poiInfo = new BMapLib.GridSchoolLayer(null, null, null, $("#hiddenOrgId").val());  
				}
    		}else if($(this).val() == "village") {
    			if($(this).is(":checked")) {
					// 根据村庄开关，显示设置范围内的村庄镇信息
					poiInfo = new BMapLib.GridSchoolLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据村庄开关，隐藏村庄信息
					poiInfo = new BMapLib.GridSchoolLayer(null, null, null, $("#hiddenOrgId").val()); 
				}
    		} else if($(this).val() == "town") {
    			if($(this).is(":checked")) {
					// 根据乡镇开关，显示设置范围内的乡镇信息
					poiInfo = new BMapLib.TownLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val()); 
				} else {
					// 根据乡镇开关，隐藏乡镇信息
					poiInfo = new BMapLib.TownLayer(null, null, null, $("#hiddenOrgId").val());
				}
    		} else if($(this).val() == "market") {
    			if($(this).is(":checked")) {
					// 根据市场开关，显示设置范围内的市场信息
					poiInfo = new BMapLib.MarketLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据市场开关，隐藏市场信息
	        		poiInfo = new BMapLib.MarketLayer(null, null, null, $("#hiddenOrgId").val()); 
				}
    		} else if($(this).val() == "allChannel") {
    			if($(this).is(":checked")) {
					// 根据渠道开关，显示设置范围内的渠道信息
					poiInfo = new BMapLib.ChannelLayer(null, null, $(this).val(), "ALL_CHANNEL", $("#hiddenOrgId").val());
				} else {
					// 根据渠道开关，隐藏渠道信息
					poiInfo = new BMapLib.ChannelLayer(null, null, null, "ALL_CHANNEL", $("#hiddenOrgId").val()); 
				}
    		} else if($(this).val() == "allStation") {
    			if($(this).is(":checked")) {
					// 根据基站开关，显示设置范围内的基站信息
					poiInfo = new BMapLib.StationLayer(null, null, $(this).val(), "ALL_STATION", $("#hiddenOrgId").val());
				} else {
					// 根据基站开关，隐藏基站信息
	        		poiInfo = new BMapLib.StationLayer(null, null, null, "ALL_STATION", $("#hiddenOrgId").val()); 
				}
    		} else if($(this).val() == "allABGroup") {
    			if($(this).is(":checked")) {
					// 根据全部AB集团，显示设置范围内的全部AB集团
					poiInfo = new BMapLib.AbGroupLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据全部AB集团，隐藏全部AB集团
	        		poiInfo = new BMapLib.AbGroupLayer(null, null, null, $("#hiddenOrgId").val()); 
				}
    		} else if($(this).val() == "allCDGroup") {
    			if($(this).is(":checked")) {
					// 根据全部CD集团，显示设置范围内的市场信息
					poiInfo = new BMapLib.CdGroupLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据全部CD集团，隐藏全部CD集团
	        		poiInfo = new BMapLib.CdGroupLayer(null, null, null, $("#hiddenOrgId").val()); 
				}
    		} else if($(this).val() == "community") {
    			if($(this).is(":checked")) {
					// 根据未入格小区，显示设置范围内的未入格小区
					poiInfo = new BMapLib.CommunityLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据未入格小区，隐藏未入格小区
	        		poiInfo = new BMapLib.CommunityLayer(null, null, null, $("#hiddenOrgId").val()); 
				}
    		} else if($(this).val() == "nonCommunity") {
    			if($(this).is(":checked")) {
					// 根据未入格小区，显示设置范围内的未入格小区
					poiInfo = new BMapLib.NonCommunityLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据未入格小区，隐藏未入格小区
	        		poiInfo = new BMapLib.NonCommunityLayer(null, null, null, $("#hiddenOrgId").val()); 
				}
    		} else if($(this).val() == "nonABGroup") {
    			if($(this).is(":checked")) {
					// 根据未入格AB集团，显示设置范围内的未入格AB集团
					poiInfo = new BMapLib.NonAbGroupLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据未入格AB集团，隐藏未入格AB集团
	        		poiInfo = new BMapLib.NonAbGroupLayer(null, null, null, $("#hiddenOrgId").val()); 
				}
    		} else if($(this).val() == "nonCDGroup") {
    			if($(this).is(":checked")) {
					// 根据未入格CD，显示设置范围内的未入格CD
					poiInfo = new BMapLib.NonCdGroupLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据未入格CD，隐藏未入格CD
	        		poiInfo = new BMapLib.NonCdGroupLayer(null, null, null, $("#hiddenOrgId").val()); 
				}
    		} else if($(this).val() == "importantCommunity") {
    			if($(this).is(":checked")) {
					// 根据重点，显示设置范围内的重点小区
					poiInfo = new BMapLib.ImportantCommunityLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据重点小区，隐藏重点小区
	        		poiInfo = new BMapLib.ImportantCommunityLayer(null, null, null, $("#hiddenOrgId").val()); 
				}
    		}else if($(this).val() == "officeBuilding") {
    			if($(this).is(":checked")) {
					// 根据写字楼，显示设置范围内的写字楼
					poiInfo = new BMapLib.OfficeBuildingLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据写字楼，隐藏写字楼
	        		poiInfo = new BMapLib.OfficeBuildingLayer(null, null, null, $("#hiddenOrgId").val()); 
				}
    		}else if($(this).val() == "governmentUnit") {
    			if($(this).is(":checked")) {
					// 根据政府单位，显示设置范围内的政府单位
					poiInfo = new BMapLib.GovernmentUnitLayer($("#setRange").val(), $("#poiUId").val(), $(this).val(), $("#hiddenOrgId").val());
				} else {
					// 根据政府单位，隐藏政府单位
	        		poiInfo = new BMapLib.GovernmentUnitLayer(null, null, null, $("#hiddenOrgId").val()); 
				}
    		}
			// 将周边基础单元的渲染对象放入map中
	    	map.addOverlay(poiInfo);
        }
	}
	// 向命名空间注册.
	BMapLib.MenuControl = MenuControl;
})()

// 区县查看基础单元数据
function initAreaDataByOrgId(orgId,orgLevel) {
//	$.ajax({
//		url : $.cxt + "/compositeView/initAreaDataByOrgId",
//	 	type : "POST",
//	 	data : {'orgId':orgId},
//	 	success : function(data){
//	 		var json = data[0];
//	 		var CNTY_NAME="";
//			if(json.CNTY_NAME!=undefined){
//				CNTY_NAME=json.CNTY_NAME;
//			}
//			var GRID_COUNT="";
//			if(json.GRID_COUNT!=undefined){
//				GRID_COUNT=json.GRID_COUNT;
//			}
//			var GRID_TYPE1="";
//			if(json.GRID_TYPE1_COUNT!=undefined){
//				GRID_TYPE1=json.GRID_TYPE1_COUNT;
//			}
//			var GRID_TYPE2="";
//			if(json.GRID_TYPE2_COUNT!=undefined){
//				GRID_TYPE2=json.GRID_TYPE2_COUNT;
//			}
//			var GRID_TYPE3="";
//			if(json.GRID_TYPE3_COUNT!=undefined){
//				GRID_TYPE3=json.GRID_TYPE3_COUNT;
//			}
//			var CHNL_COUNT="";
//			if(json.CHNL_COUNT!=undefined){
//				CHNL_COUNT=json.CHNL_COUNT;
//			}
//			var STATION_COUNT="";
//			if(json.STATION_COUNT!=undefined){
//				STATION_COUNT=json.STATION_COUNT;
//			}
//			var CELL_COUNT="";
//			if(json.CELL_COUNT!=undefined){
//				CELL_COUNT=json.CELL_COUNT;
//			}
//			var ZDCELL_COUNT="";
//			if(json.ZDCELL_COUNT!=undefined){
//				ZDCELL_COUNT=json.ZDCELL_COUNT;
//			}
//			var HIGHVALUE_CELL_COUNT="";
//			if(json.HIGHVALUE_CELL_COUNT!=undefined){
//				HIGHVALUE_CELL_COUNT=json.HIGHVALUE_CELL_COUNT;
//			}
//			var AB_JT_COUNT="";
//			if(json.AB_JT_COUNT!=undefined){
//				AB_JT_COUNT=json.AB_JT_COUNT;
//			}
//			var CD_JT_COUNT="";
//			if(json.CD_JT_COUNT!=undefined){
//				CD_JT_COUNT=json.CD_JT_COUNT;
//			}
//			var PORT_COUNT="";
//			if(json.PORT_COUNT!=undefined){
//				PORT_COUNT=json.PORT_COUNT;
//			}
//			var ADDR9_COUNT="";
//			if(json.ADDR9_COUNT!=undefined){
//				ADDR9_COUNT=json.ADDR9_COUNT;
//			}
//			var INCOME="";
//			if(json.INCOME!=undefined){
//				INCOME=json.INCOME;
//			}
//			var TELE_COUNT="";
//			if(json.TELE_COUNT!=undefined){
//				TELE_COUNT=json.TELE_COUNT;
//			}
//			var BRO_ADD_COUNT="";
//			if(json.BRO_ADD_COUNT!=undefined){
//				BRO_ADD_COUNT=json.BRO_ADD_COUNT;
//			}
//			var TERMINAL_COUNT="";
//			if(json.TERMINAL_COUNT!=undefined){
//				TERMINAL_COUNT=json.TERMINAL_COUNT;
//			}
//			var HOMENET_ADD_COUNT="";
//			if(json.HOMENET_ADD_COUNT!=undefined){
//				HOMENET_ADD_COUNT=json.HOMENET_ADD_COUNT;
//			}
//			var CELLRATE_ADD_SUM="";
//			if(json.CELLRATE_ADD_SUM!=undefined){
//				CELLRATE_ADD_SUM=json.CELLRATE_ADD_SUM;
//			}
//			var ADD_VALUE_COUNT="";
//			if(json.ADD_VALUE_COUNT!=undefined){
//				ADD_VALUE_COUNT=json.ADD_VALUE_COUNT;
//			}
//			var FUSE_RATE="";
//			if(json.FUSE_RATE!=undefined){
//				FUSE_RATE=json.FUSE_RATE;
//			}
//			var ENCLOSURE_COUNT="";
//			if(json.ENCLOSURE_COUNT!=undefined){
//				ENCLOSURE_COUNT=json.ENCLOSURE_COUNT;
//			}
//	 		$("#CNTY_NAME").html(CNTY_NAME);
//	 		$("#GRID_COUNT").html(GRID_COUNT);
//	 		$("#GRID_TYPE1").html(GRID_TYPE1);
//	 		$("#GRID_TYPE2").html(GRID_TYPE2);
//	 		$("#GRID_TYPE3").html(GRID_TYPE3);
//	 		$("#CHNL_COUNT").html(CHNL_COUNT);
//	 		$("#STATION_COUNT").html(STATION_COUNT);
//	 		$("#CELL_COUNT").html(CELL_COUNT);
//	 		$("#ZDCELL_COUNT").html(ZDCELL_COUNT);
//	 		$("#HIGHVALUE_CELL_COUNT").html(HIGHVALUE_CELL_COUNT);
//	 		$("#AB_JT_COUNT").html(AB_JT_COUNT);
//	 		$("#CD_JT_COUNT").html(CD_JT_COUNT);
//	 		$("#PORT_COUNT").html(PORT_COUNT);
//	 		$("#ADDR9_COUNT").html(ADDR9_COUNT);
//	 		$("#INCOME").html(INCOME);
//	 		$("#TELE_COUNT").html(TELE_COUNT);
//	 		$("#BRO_ADD_COUNT").html(BRO_ADD_COUNT);
//	 		$("#TERMINAL_COUNT").html(TERMINAL_COUNT);
//	 		$("#HOMENET_ADD_COUNT").html(HOMENET_ADD_COUNT);
//	 		$("#CELLRATE_ADD_SUM").html(CELLRATE_ADD_SUM);
//	 		$("#ADD_VALUE_COUNT").html(ADD_VALUE_COUNT);
//	 		$("#FUSE_RATE").html(FUSE_RATE);
//	 		$("#ENCLOSURE_COUNT").html(ENCLOSURE_COUNT);
//		 }
//	});
	
	
}
$('#showDetailExport').on('click',function(){
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + flag +"' name='flag' />";
	html += "<input type='text' value='" + orgId +"' name='orgId' />";
	html += "<input type='text' value='" + maxLng +"' name='maxLng' />";
	html += "<input type='text' value='" + maxLat +"' name='maxLat' />";
	html += "<input type='text' value='" + minLng +"' name='minLng' />";
	html += "<input type='text' value='" + minLat +"' name='minLat' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/gridCommon/exportDataByShapeList">' + html + '</form>').appendTo('body').submit().remove();	
});
var flag,orgId,maxLng,maxLat,minLng,minLat;
function showDetail(flag,orgId,maxLng,maxLat,minLng,minLat){
	alert(flag);
	flag=flag;
	orgId=orgId;
	maxLng=maxLng;
	maxLat=maxLat;
	minLng=minLng;
	minLat=minLat;
	$('#showDetailDiv').css('display','block');
	var url="";
	var data = {
			orgId: orgId,
			maxLng: maxLng,
			maxLat: maxLat,
			minLng: minLng,
			minLat: minLat,
			flag:flag
		};
	$('#showDetail_table').GridUnload();
	var heightB = $(window).height() - $("#showDetail_table").offset().top - 278;
	url = $.cxt + "/gridCommon/getDataByShapeList";
	if(flag == "channel"){
		colNamesData = [ "渠道编码","渠道名称","渠道地址","经度","纬度","渠道一级分类","渠道二级分类","渠道星级","商圈名称","商圈类型","经营性质","经营模式","建设模式","渠道经理","渠道经理电话","开业时间","使用面积","房屋租赁月租金","渠道能力得分","渠道台席数","渠道店员数","运营商"];
		colModelData = [ 
			{name: 'CHNL_CODE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CHNL_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'CHNL_ADDR', align: 'center', cellattr: addCellAttr}, 
			{name: 'LON', align: 'center', cellattr: addCellAttr}, 
			{name: 'LAT', align: 'center', cellattr: addCellAttr}, 
			{name: 'CHNL_TYPE_LEVEL1', align: 'center', cellattr: addCellAttr},
			{name: 'CHNL_TYPE_LEVEL2', align: 'center', cellattr: addCellAttr}, 
			{name: 'CHNL_STAR', align: 'center', cellattr: addCellAttr}, 
			{name: 'BUSICIRCLE_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'BUSICIRCLE_TYPE', align: 'center', cellattr: addCellAttr}, 
			{name: 'BUSINESS_TYPE', align: 'center', cellattr: addCellAttr}, 
			{name: 'BUSINESS_MODEL', align: 'center', cellattr: addCellAttr},	
			{name: 'CONSTRUCTION_TYPE', align: 'center', cellattr: addCellAttr}, 
			{name: 'CHNL_MNGR_NAME', align: 'center', cellattr: addCellAttr}, 
			{name: 'CHNL_MNGR_NUMBER', align: 'center', cellattr: addCellAttr},
			{name: 'OPEN_DATE', align: 'center', cellattr: addCellAttr}, 
			{name: 'USE_AREA', align: 'center', cellattr: addCellAttr}, 
			{name: 'MON_RENTAL', align: 'center', cellattr: addCellAttr}, 
			{name: 'CHNL_CAPACITY_SCORE', align: 'center', cellattr: addCellAttr},
			{name: 'CHNL_COUNTER_NUM', align: 'center', cellattr: addCellAttr}, 
			{name: 'CHNL_CLERK_NUM', align: 'center', cellattr: addCellAttr}, 
			{name: 'POER_NAME', align: 'center', cellattr: addCellAttr}
		];	

	}else if(flag == "station"){
		
	}
		
			
			$('#showDetail_table').jqGrid({
				url: url,
				datatype: "json",
				mtype: "POST",
				height: heightB,
				width: 'auto',
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
				pager: '#showDetail_grid-pager',
				gridComplete: dayReportFormsetNiceScroll,
				loadComplete: function() {
					topjqGridLoadComplete();
					
				}
			});
			
			// 将列表th和列表的td宽度做适配
			softShowDetailThWidth();
}

//字体颜色修改
function addCellAttr(rowId, val, rawObject, cm, rdata) {
	return "style='color:white'";
}
//滚动条样式
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
  
var topjqGridLoadComplete = function() {
	var table = this
	styleCheckbox();
	updatePagerIcons();
	//enableTooltips(table);
}

//将头部适配列表td宽度
function softShowDetailThWidth() {
	var width = parseFloat($("#showDetail_table").width()/$("#showDetail_table").find("tr").eq(0).find("td:visible").length).toFixed(1);
	$(".ui-jqgrid .ui-jqgrid-labels th").css("width", width + "px");
}