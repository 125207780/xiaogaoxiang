package com.bonc.gridinfo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.annotation.Resource;
import javax.jdo.annotations.Transactional;

import org.springframework.stereotype.Service;

import com.bonc.gridinfo.dao.entity.StationInfo;
import com.bonc.gridinfo.dao.mapper.StationInfoMapper;
import com.bonc.map.dao.mapper.MapIndexMapper;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.service.SysOrgService;
import com.google.gson.Gson;

@Service
public class StationInfoService {

	@Resource
	private StationInfoMapper stationInfoMapper;

	@Resource
	private SysOrgService sysOrgService;

	@Resource
	private MapIndexMapper mapIndexMapper;

	public StationInfoMapper getMapper() {
		return stationInfoMapper;
	}

	/**
	 * 
	 * 解析文件信息，获取文件内容 1、根据归属网格，将所有相同归属网格的基站信息进行数据库持久化 2、将基站归属网格信息，封装成json，返回到前端页面
	 * 
	 * @param kpi
	 * @return
	 */
	@Transactional
	public String saveStationInfo(List<StationInfo> kpi) {
		// 1、判断上传的excel基站，是否网格不为空，必须全部为空才能继续下一步操作
		// 2、将网格信息根据操作人所属的组织，将网格划分到该组织下，获取网格的组织编码orgId
		// 3、保存网格信息
		// 4、通过网格信息返回的Org_Id，将基站信息表内的GRID_CODE字段进行更新
		Set<String> gridNames = new TreeSet<>();
		for (int i = 0; i < kpi.size(); i++) {
			if (null != kpi.get(i).getGridCode()
					&& !"".equals(kpi.get(i).getGridCode()))
				gridNames.add(kpi.get(i).getGridCode());
		}
		String msg = this.checkGridName(gridNames);
		// 判断是否为空，有值，无值
		if (("GRID_NONE").equals(msg.split("&")[0])
				|| ("GRID_REPEAT").equals(msg.split("&")[0])) {
			return msg;
		} else {
			msg = new String();
			// 查询导出的基站信息，是否已经有归属网格，如果有则不做操作
			List<String> stationCodeList = new ArrayList<>();
			for (int i = 0; i < kpi.size(); i++) {
				if (null != kpi.get(i).getGridCode()
						&& !"".equals(kpi.get(i).getGridCode()))
					stationCodeList.add(kpi.get(i).getStationCode());
			}
			msg = checkStationCode(stationCodeList);
			if (("STATION_NONE").equals(msg.split("&")[0])
					|| ("STATION_REPEAT").equals(msg.split("&")[0])) {
				return msg;
			} else {
				return "SUCCESS";
			}
		}
	}

	/**
	 * 根据网格名称，检测是否有重复的网格信息
	 * 
	 * @param gridNameList
	 * @return
	 */
	public String checkGridName(Set<String> gridNameList) {
		List<String> gridNames = new ArrayList<>();
		if (null != gridNameList && gridNameList.size() > 0) {
			// 将去重的名字全部存放到集合中
			for (String gn : gridNameList) {
				gridNames.add(gn);
			}
			// 根据名字查询是否有重复的，如果有重复的，则返回失败
			List<SysOrg> sysOrgList = sysOrgService.checkGridName(gridNames);
			if (null != sysOrgList && sysOrgList.size() > 0)
				return "GRID_REPEAT&" + new Gson().toJson(sysOrgList.get(0));
			else
				return "GRID_UNREPEAT";
		} else {
			return "GRID_NONE";
		}
	}

	/**
	 * 根据基站编码，查询是否已有归属网格
	 * 
	 * @param stationInfo
	 * @return
	 */
	public String checkStationCode(List<String> stationCodeLists) {
		List<String> stationCodes = new ArrayList<>();
		if (null != stationCodeLists && stationCodeLists.size() > 0) {
			// 将去重的名字全部存放到集合中
			for (String gn : stationCodeLists) {
				stationCodes.add(gn);
			}
			// 根据名字查询是否有重复的，如果有重复的，则返回失败
			List<StationInfo> stationInfos = stationInfoMapper
					.getStationInfoList(stationCodes);
			if (null != stationInfos && stationInfos.size() > 0)
				return "STATION_REPEAT&"
						+ new Gson().toJson(stationInfos.get(0));
			else
				return "STATION_UNREPEAT";
		} else {
			return "STATION_NONE";
		}
	}

	/**
	 * 更新基站的网格编码
	 * 
	 * @param stationInfoLists
	 * @return
	 */
	public List<StationInfo> updateStationInfoGridCode(
			List<StationInfo> stationInfoLists) {
		for (StationInfo si : stationInfoLists) {
			stationInfoMapper.updateStationInfoGridCode(si);
		}
		return stationInfoLists;
	}

	/**
	 * 查询所有基站信息
	 * 
	 * @param string
	 * 
	 * @Title selectAll
	 * @Author xiaogaoxiang
	 * @return List<StationInfo>
	 */
	public List<StationInfo> selectAll(String orgId) {
		return stationInfoMapper.selectAll(orgId);
	}

	public Map<String, Object> getImportantAreaInfo(String importantId) {
		Map<String, Object> resultMap = stationInfoMapper
				.getImportantAreaInfo(importantId);
		return resultMap;
	}
}
