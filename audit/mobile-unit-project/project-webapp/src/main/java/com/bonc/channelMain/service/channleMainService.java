package com.bonc.channelMain.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.channelMain.dao.mapper.channleMainMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class channleMainService {

	@Autowired
	private channleMainMapper channleMainMapper;

	public List<Map<String, String>> initChanelName(String gridCode) {
		List<Map<String, String>> reusltMap = this.channleMainMapper.initChanelName(gridCode);
		return reusltMap;
	}

	public List<Map<String, String>> initGrid(String gridCode, String chnlCode) {
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		ParamMap.put("gridCode", gridCode);
		ParamMap.put("chnlCode", chnlCode);
		List<Map<String, String>> reusltMap = this.channleMainMapper.initGrid(ParamMap);
		return reusltMap;
	}

	public List<Map<String, String>> changeGrid(String gridCode, String chnlCode) {
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		ParamMap.put("gridCode", gridCode);
		ParamMap.put("chnlCode", chnlCode);
		List<Map<String, String>> reusltMap = this.channleMainMapper.changeGrid(ParamMap);
		return reusltMap;
	}

	public List<Map<String, String>> ChannelManager(String gridCode, String subject_id) {
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		ParamMap.put("gridCode", gridCode);
		ParamMap.put("subject_id", subject_id);
		List<Map<String, String>> reusltMap = this.channleMainMapper.ChannelManager(ParamMap);
		return reusltMap;
	}

	public Page<Map<String, String>> changeTable(String gridCode, String LOGIN_ID, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		ParamMap.put("gridCode", gridCode);
		ParamMap.put("LOGIN_ID ", LOGIN_ID);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.channleMainMapper.changeTable(ParamMap);
		return pageList;
	}

	public Page<Map<String, String>> initTable(String gridCode, String subject_id, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		ParamMap.put("gridCode", gridCode);
		ParamMap.put("subject_id", subject_id);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.channleMainMapper.initTable(ParamMap);
		return pageList;
	}

	public List<Map<String, String>> getChnlCode(String LOGIN_ID) {
		List<Map<String, String>> reusltMap = this.channleMainMapper.getChnlCode(LOGIN_ID);
		return reusltMap;
	}

	public Page<Map<String, String>> chnlInformationGrid(List<String> ChnlList, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.channleMainMapper.chnlInformationGrid(ChnlList);
		return pageList;
	}

	public int UpdatetChnlManager(String LOGIN_ID, String chnlCode) {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("LOGIN_ID", LOGIN_ID);
		paramMap.put("CHNL_CODE", chnlCode);
		int reuslt = this.channleMainMapper.UpdatetChnlManager(paramMap);
		return reuslt;
	}

	public int DoubleInsertChnlManager(String LOGIN_ID, String JsonchnlCodes) {
		String[] chnlCodes = JsonchnlCodes.split(",");
		for (String chnlCode : chnlCodes) {
			Map<String, String> paramMap = new HashMap<String, String>();
			paramMap.put("LOGIN_ID", LOGIN_ID);
			paramMap.put("CHNL_CODE", chnlCode);
			this.channleMainMapper.UpdatetChnlManager(paramMap);
		}
		return 1;
	}

	public int getInFullOA(String text, String gridCode) {
		Map<String, String> paramMap = new HashMap<String, String>();
		Map<String, String> PidMap = this.channleMainMapper.getPID(gridCode);
		paramMap.put("pid", PidMap.get("PID"));
		int num = 0;
		String name = "";
		String OAID = "";
		String[] texts = text.split(",");
		for (String item : texts) {
			name = item.split(":")[0];
			OAID = item.split(":")[1];
			paramMap.put("name", name);
			paramMap.put("OAID", OAID);
			List<Map<String, String>> reusltMap = this.channleMainMapper.getInFullOA(paramMap);
			if (reusltMap.size() != 0) {
				num++;
			}
		}
		return num;
	}

	public int insertCountyInfo(String gridCode, String text, String userName) {
		Map<String, String> getCountyUser = this.channleMainMapper.selectCountyUserByGridCode(gridCode);
		String userId = getCountyUser.get("LOGIN_ID");
		String gridUserName = getCountyUser.get("USERNAME");
		Map<String, String> getGridName = this.channleMainMapper.selectGridName(gridCode);
		String gridName = getGridName.get("NAME");
		String itemCode = UUID.randomUUID().toString().replaceAll("-", "");
		Date date = new Date();
		SimpleDateFormat simpleDara = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String currentTime = simpleDara.format(date);
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		ParamMap.put("userId", userId);
		ParamMap.put("gridName", gridUserName);
		ParamMap.put("itemCode", itemCode);
		ParamMap.put("itemName", "遗漏渠道经理");
		ParamMap.put("itemStatus", "1");
		ParamMap.put("itemContent", "尽快办理");
		ParamMap.put("itemDesc", "请进入网格划分界面点击修改" + gridName + "网格增加分配" + text + "作为该网格的社会渠道经理");
		ParamMap.put("itemHandler", gridUserName);
		ParamMap.put("itemIssueder", userName);
		ParamMap.put("issuedDate", currentTime);
		int result = this.channleMainMapper.insertCountyInfo(ParamMap);
		return result;
	}

	public int insertCountyInfoNoChnl(String gridCode, String userName) {
		Map<String, String> getCountyUser = this.channleMainMapper.selectCountyUserByGridCode(gridCode);
		String userId = getCountyUser.get("LOGIN_ID");
		String gridUserName = getCountyUser.get("USER_NAME");
		// Map<String, String> getGridName =
		// this.channleMainMapper.selectGridName(gridCode);
		String gridName = getCountyUser.get("NAME");
		String itemCode = UUID.randomUUID().toString().replaceAll("-", "");
		Date date = new Date();
		SimpleDateFormat simpleDara = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String currentTime = simpleDara.format(date);
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		ParamMap.put("userId", userId);
		ParamMap.put("gridName", gridUserName);
		ParamMap.put("itemCode", itemCode);
		ParamMap.put("itemName", "无渠道经理");
		ParamMap.put("itemStatus", "1");
		ParamMap.put("itemContent", "尽快办理");
		ParamMap.put("itemDesc", "请进入网格划分界面点击修改" + gridName + "网格增加分配社会渠道经理");
		ParamMap.put("itemHandler", gridUserName);
		ParamMap.put("itemIssueder", userName);
		ParamMap.put("issuedDate", currentTime);
		int result = this.channleMainMapper.insertCountyInfo(ParamMap);
		return result;
	}

	public List<Map<String, String>> getGridChnlManager(String gridCode) {
		List<Map<String, String>> result = this.channleMainMapper.getGridChnlManager(gridCode);
		return result;
	}

	public Map<String, String> initGridCode(String loginId) {
		Map<String, String> result = this.channleMainMapper.initGridCode(loginId);
		return result;
	}

}