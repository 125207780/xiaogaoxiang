package com.bonc.contract.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.bonc.contract.dao.mapper.contractPaneMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class contractPaneService {

	@Autowired
	private contractPaneMapper contractPaneMapper;

	public List<Map<String, String>> selectGridName(String nowOrgId) {
		List<Map<String, String>> reusltMap = this.contractPaneMapper.selectGridName(nowOrgId);
		return reusltMap;
	}

	public List<Map<String, String>> selectTypeOne() {
		List<Map<String, String>> reusltMap = this.contractPaneMapper.selectTypeOne();
		return reusltMap;
	}

	public List<Map<String, String>> selectTypeTwo(String code) {
		List<Map<String, String>> reusltMap = this.contractPaneMapper.selectTypeTwo(code);
		return reusltMap;
	}

	public List<Map<String, String>> selectChannl(String chnl_code) {
		List<Map<String, String>> reusltMap = this.contractPaneMapper.selectChannl(chnl_code);
		return reusltMap;
	}

	public int insertContract(String chnl_code, String userName, String Requirements, String JsonArrphysical, String id) { // 渠道id
		String contractResult = insertContract(chnl_code, userName, Requirements, id);
		String physicalResult = insertPhysical(chnl_code, JsonArrphysical, id);
		this.contractPaneMapper.updateMsContractAreaById(id);
		if (contractResult.equals("1") && physicalResult.equals("1")) {
			return 1;
		}
		return 0;
	}

	public Page<Map<String, String>> initGrid(String gridCode, String smallType, String bigType, String phsycialName, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		ParamMap.put("gridCode", gridCode);
		ParamMap.put("smallType", smallType);
		ParamMap.put("bigType", bigType);
		ParamMap.put("phsycialName", phsycialName);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.contractPaneMapper.initGrid(ParamMap);
		return pageList;
	}

	public String insertPhysical(String chnl_code, String JsonArrphysical, String id) {
		JSONArray jsonStrArr = JSON.parseArray(JsonArrphysical);
		Map<String, String> physicalMap = new HashMap<String, String>();
		String physical = null;
		for (int i = 0; i < jsonStrArr.size(); i++) {
			physical = jsonStrArr.getString(i);
			physicalMap.put("PHYSICAL_ID", physical);
			physicalMap.put("SIGNING_ID", id);
			physicalMap.put("STATUS", "F");
			this.contractPaneMapper.insertPhysical(physicalMap);
		}

		return "1";

	}

	public String insertContract(String chnl_code, String userName, String Requirements, String id) {
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		Date date = new Date();
		SimpleDateFormat simpleDara = new SimpleDateFormat("yyyy-MM-dd");
		String currentTime = simpleDara.format(date);
		ParamMap.put("SIGNING_ID", id);
		ParamMap.put("CREATE_USER", userName);
		ParamMap.put("CREATE_DATE", currentTime);
		ParamMap.put("CHNL_CODE", chnl_code);
		ParamMap.put("SIGING_REQUIRE", Requirements);
		ParamMap.put("STATUS", 'F');
		this.contractPaneMapper.insertContract(ParamMap);
		return "1";

	}

	public Page<Map<String, String>> tableManager(int ManagerType, String OrgId, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		ParamMap.put("USER_TYPE", ManagerType);
		ParamMap.put("ORG_ID", OrgId);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.contractPaneMapper.tableManager(ParamMap);
		return pageList;
	}

	public Map<String, String> initManagerType(String chnl_code) {
		Map<String, String> result = this.contractPaneMapper.initManagerType(chnl_code);
		return result;
	}

	public int insertChnlManager(String chnl_code, String newManager) {
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		ParamMap.put("chnl_code", chnl_code);
		ParamMap.put("newManager", newManager);
		int result = this.contractPaneMapper.insertChnlManager(ParamMap);
		return result;
	}

	public int insertGridItemInfo(String gridCode, String chnl_code, String userName) {
		Map<String, String> getGridUser = this.contractPaneMapper.selectGridUserByGridCode(gridCode);
		String userId = getGridUser.get("LOGIN_ID");
		String gridName = getGridUser.get("NAME");
		String itemCode = UUID.randomUUID().toString().replaceAll("-", "");
		Date date = new Date();
		SimpleDateFormat simpleDara = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String currentTime = simpleDara.format(date);
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		ParamMap.put("userId", userId);
		ParamMap.put("gridName", gridName);
		ParamMap.put("itemCode", itemCode);
		ParamMap.put("itemName", "无渠道经理");
		ParamMap.put("itemStatus", "1");
		ParamMap.put("itemContent", "尽快办理");
		ParamMap.put("itemDesc", chnl_code + "在进行发起签约的时候无法选中渠道经理请尽快设置");
		ParamMap.put("itemHandler", gridName);
		ParamMap.put("itemIssueder", userName);
		ParamMap.put("issuedDate", currentTime);
		int result = this.contractPaneMapper.insertGridItemInfo(ParamMap);
		return result;
	}
}
