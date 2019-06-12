package com.bonc.contract.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.contract.dao.mapper.ChannelMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class ChannelService {

	@Resource
	private ChannelMapper channelMapper;

	public List<Map<String, Object>> selectChannelList(String gridCode, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> pageList = (Page<Map<String, Object>>) channelMapper.selectChannelList(gridCode);
		return pageList;
	}

	@SuppressWarnings("unchecked")
	public int insertMsContractArea(String jsonStr, String jsonStationStr, String gridCode, String userName) {
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		Date date = new Date();
		SimpleDateFormat simpleDara = new SimpleDateFormat("yyyy-MM-dd");
		String currentTime = simpleDara.format(date);
		JSONObject channelObject = JSON.parseObject(jsonStr);
		JSONArray StationArr = JSON.parseArray(jsonStationStr);/* CHNL_CODE */
		ParamMap.put("gridCode", gridCode);
		ParamMap.put("userName", userName);
		ParamMap.put("currentTime", currentTime);
		ParamMap.put("status", "A");
		ParamMap.put("chnl_code", channelObject.get("CHNL_CODE"));
		Map<String, Object> StationObjct = null;
		for (int i = 0; i < StationArr.size(); i++) {
			StationObjct = (Map<String, Object>) StationArr.get(i);
			ParamMap.put("physical_id", StationObjct.get("PHYSICAL_ID"));
			channelMapper.insertMsContractArea(ParamMap);
		}
		return 1;
	}

	public void deleteMsContractAreaById(String ids, String userName) {
		// 获取系统当前时间
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
		String currentDate = sdf.format(date);
		// 把json字符串转成list对象
		// 这里的ids是数组
		List<?> arrId = JSONObject.parseObject(ids, List.class);
		Map<String, String> inMap = null;
		String unitId = null;
		Map<String, Object> outMap = null;
		for (int i = 0; i < arrId.size(); i++) {
			inMap = new HashMap<String, String>();
			unitId = (String) arrId.get(i);
			inMap.put("unitId", unitId);
			inMap.put("status", "P");
			// 通过unitId查询数据。
			outMap = (Map<String, Object>) channelMapper.selectMsContractAreaById(unitId);
			// 把数据存在历史表中
			outMap.put("deleteUser", userName);
			outMap.put("deleteDate", currentDate);
			// 把从表中取出来的数据，存在历史表中
			channelMapper.insertMsContractAreaHis(outMap);

			// 更新表的状态
			// channelMapper.updateMsContractAreaById(inMap);
			// 原本是更新数据，现在改为删除
			channelMapper.deleteMsContractAreaById(inMap);
		}

	}

	public void updateMsContractArea(String jsonUnit, String unitId, String gridCode, String userName) {

		// 使用map传递到xml中
		Map<String, String> inMap = new HashMap<String, String>();

		// 获取系统当前时间
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
		String currentDate = sdf.format(date);
		inMap.put("currentDate", currentDate);
		// 设置基础单元编码
		inMap.put("unitId", unitId);
		// 设置网格名称code
		inMap.put("gridCode", gridCode);
		// 设置修改人
		inMap.put("userName", userName);
		inMap.put("status", "A");
		inMap.put("noEquals", "P");
		// 将json字符串转成map对象
		@SuppressWarnings("unchecked")
		Map<String, Object> channelMap = JSONObject.parseObject(jsonUnit, Map.class);
		// 取map中的渠道code
		String channelCode = (String) channelMap.get("CHNL_CODE");
		inMap.put("channelCode", channelCode);
		System.out.println("传入的参数Map------->" + inMap);
		channelMapper.updateMsContractArea(inMap);
	}

	public Map<String, String> selectLngAndLat(String uid) {
		Map<String, String> map = channelMapper.selectLngAndLat(uid);
		return map;
	}

}
