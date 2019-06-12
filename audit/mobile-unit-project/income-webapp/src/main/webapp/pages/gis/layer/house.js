$(function(){
	var  physicalId= $("#physicalId").val();
	$.ajax({
		url : $.cxt + "/gridCommon/selectHouse",
		dataType : "json",
	 	type : "POST",
	 	data : {'physical_id':physicalId},
		 	success : function(houseMap) {
			// cityCode 区县编码 cityName 区县名称
			if (houseMap) {
				var cityCode = houseMap.CNTY_ID;
				$("#cityCode").html(cityCode);
				var cityName = houseMap.COUNTY_NAME;
				$("#cityName").html(cityName);

				// houseName 小区名称 sale 友商促销情况
				var houseName = houseMap.CELL_NAME;
				$("#houseName").html(houseName);
				var sale = houseMap.COMPET_PROM;
				$("#sale").html(sale);

				// houseCode 小区编码 propertyName 物业名称
				var houseCode = houseMap.CELL_ID;
				$("#houseCode").html(houseCode);
				var propertyName = houseMap.PROPERTY_COMPANY;
				$("#propertyName").html(propertyName);

				// houseAddress 小区地址 propertyTelephone 物业办公电话
				var houseAddress = houseMap.CELL_ADDR;
				$("#houseAddress").html(houseAddress);
				var propertyTelephone = houseMap.PROPERTY_TEL;
				$("#propertyTelephone").html(propertyTelephone);

				// houseType 小区类型 propertyAddress 物业公司地址

				var houseType = houseMap.CELL_TYPE;
				$("#houseType").html(houseType);
				var propertyAddress = houseMap.PROPERTY_ADDR;
				$("#propertyAddress").html(propertyAddress);

				// longitude 小区经度 latitude 小区纬度
				var longitude = houseMap.CELL_LONGITUDE;
				$("#longitude").html(longitude);
				var latitude = houseMap.CELL_LATITUDE;
				$("#latitude").html(latitude);

				// buildingArea 建筑面积 person 关键人
				var buildingArea = houseMap.CELL_BUILD_AREA;
				$("#buildingArea").html(buildingArea);
				var person = houseMap.KEYMAN;
				$("#person").html(person);

				// id="landArea" 占地面积 id="personPosition" 关键人职务
				var landArea = houseMap.CELL_OCCUPY_AREA;
				$("#landArea").html(landArea);
				var personPosition = houseMap.KEYMAN_POST;
				$("#personPosition").html(personPosition);

				// id="houseBuilder"小区栋数 id="keyTel" 关键人电话
				var houseBuilder = houseMap.CELL_CNT;
				$("#houseBuilder").html(houseBuilder);
				var keyTel = houseMap.KEYMAN_TEL;
				$("#keyTel").html(keyTel);

				// id="houseNumber"小区户数 id="propertyPerson" 物业联系人
				var houseNumber = houseMap.CELL_IN_USER_CNT;
				$("#houseNumber").html(houseNumber);
				var propertyPerson = houseMap.PROPERTY_CONT_NAME;
				$("#propertyPerson").html(propertyPerson);

				// id="houseIn" 小区入住户数 id="propertyPosition" 物业联系人职务
				var houseIn = houseMap.CELL_IN_USER_CNT;
				$("#houseIn").html(houseIn);
				var propertyPosition = houseMap.PROPERTY_CONT_POST;
				$("#propertyPosition").html(propertyPosition);

				// id="personScale"人口规模 id="propertyTel" 物业联系人电话
				var personScale = houseMap.POPU_SCALE;
				$("#personScale").html(personScale);
				var propertyTel = houseMap.PROPERTY_CONT_TEL;
				$("#propertyTel").html(propertyTel);

				// id="housePort" 小区端口数 id="developerName" 开发商名称
				var housePort = houseMap.PORT_CNT;
				$("#housePort").html(housePort);
				var developerName = houseMap.BUILDER_NAME;
				$("#developerName").html(developerName);

				// id="usePort" 已使用端口数 id="developerPersonName" 开发商联系人名称
				var usePort = houseMap.USE_PORT_CNT;
				$("#usePort").html(usePort);
				var developerPersonName = houseMap.BUILDER_CONT_NAME;
				$("#developerPersonName").html(developerPersonName);

				// id="portUsed" 端口利用率 id="developerPersonTel" 开发商联系人电话
				var portUsed = houseMap.PORT_RATIO;
				$("#portUsed").html(portUsed);
				var developerPersonTel = houseMap.BUILDER_CONT_TEL;
				$("#developerPersonTel").html(developerPersonTel);

				// id="isTele" 是否电信覆盖 id="developerTel" 开发商办公电话
				var isTele = houseMap.IS_TELE_COVER;
				$("#isTele").html(isTele);
				var developerTel = houseMap.BUILDER_TEL;
				$("#developerTel").html(developerTel);

				// id="isUnicom" 是否联通覆盖 id="sex" 性别
				var isUnicom = houseMap.IS_UNICOM_COVER;
				$("#isUnicom").html(isUnicom);
				var sex = houseMap.SEX;
				$("#sex").html(sex);

				// id="isRadio" 是否广电覆盖 id="useNumber" 宽带用户数
				var isRadio = houseMap.IS_BROADCAST_COVER;
				$("#isRadio").html(isRadio);
				var useNumber = houseMap.KD_USER_CNT;
				$("#useNumber").html(useNumber);

				// id="isTran" 是否具备传输资源 id="expireNumber" 宽带到期用户数
				var isTran = houseMap.TRAN_RES_FLAG;
				$("#isTran").html(isTran);
				var expireNumber = houseMap.KD_EXP_USER_CNT;
				$("#expireNumber").html(expireNumber);

				// id="degree" 资源建设难易程度(九级地址数) id="houseValue" 小区价值
				var degree = houseMap.DIFFICULTY_LVL;
				$("#degree").html(degree);
				var houseValue = houseMap.CELL_VALUE;
				$("#houseValue").html(houseValue);

				// id="inType" 友商网络接入类型 id="isOverride" 是否覆盖宽带资源
				var inType = houseMap.ACESS_TYPE;
				$("#inType").html(inType);
				var isOverride = houseMap.COVER_FLAG;
				$("#isOverride").html(isOverride);

				// id="stationed" 友商独家进驻情况 id="income" 宽带收入
				var stationed = houseMap.IS_SOLE;
				$("#stationed").html(stationed);
				var income = houseMap.KD_INC;
				$("#income").html(income);

				// id="teleperson"电信用户数 id="network" 小区网络覆盖类型
				var teleperson = houseMap.TELE_USER_CNT;
				$("#teleperson").html(teleperson);
				var network = houseMap.COVER_TYPE;
				$("#network").html(network);

				// id="unicomPerson"联通用户数 id="source" 宽带资源饱和率
				var unicomPerson = houseMap.UNICOM_USER_CNT;
				$("#unicomPerson").html(unicomPerson);
				var source = houseMap.RES_SATURATED_RATIO;
				$("#source").html(source);

				// id="radioPerson"广电用户数 id="goAway" 潜在离网用户占比
				var radioPerson = houseMap.BROADCASE_USER_CNT;
				$("#radioPerson").html(radioPerson);
				var goAway = houseMap.POTENTIAL_CNCL_RATIO;
				$("#goAway").html(goAway);

				// id="mobile" 移动宽带份额 id="developerUser"潜在发展用户占比
				var mobile = houseMap.MOBILE_USER_RATIO;
				$("#mobile").html(mobile);
				var developerUser = houseMap.POTENTIAL_USER_RATIO;
				$("#developerUser").html(developerUser);
				// id="product"友商产品 id="goAwayProportion" 离网占比
				var product = houseMap.COMPET_PROD;
				$("#product").html(product);
				var goAwayProportion = houseMap.CNCL_RATIO;
				$("#goAwayProportion").html(goAwayProportion);

				// id="isHouse"是否攻坚小区 id="custermer"上月目标客户数
				var isHouse = houseMap.REGION_TYPE;
				$("#isHouse").html(isHouse);
				var custermer = houseMap.POTENTIAL_USER_CNT;
				$("#custermer").html(custermer);
	 			
	 		}
	 		// alert(houseMap);
	 		// alert(json);
	 		/*
			 * var data = JSON.parse(json); if(data.code == '0'){
			 * topwindow.removeWindow();//关闭窗口 topshowAlertSuccessDiv();//操作提示
			 * //刷新父窗口，重新查询 //searchExamModel(1,9,"",""); }
			 */
	 	}
	 });
	
})