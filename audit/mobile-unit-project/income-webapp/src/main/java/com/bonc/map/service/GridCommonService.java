package com.bonc.map.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.map.dao.entity.MapInfo;
import com.bonc.map.dao.entity.MapPoi;
import com.bonc.map.dao.mapper.GridCommonMapper;
import com.bonc.school.dao.mapper.SchoolMapMapper;
import com.bonc.system.dao.entity.SysOrg;

@Service
@Transactional(rollbackFor = Exception.class)
public class GridCommonService {
	@Resource
	private GridCommonMapper gridCommonMapper;
	
	@Autowired
	private SchoolMapMapper schoolMapMapper;
	
	
	public List<SysOrg> selectList(SysOrg po){
		return gridCommonMapper.selectList(po);
	}
	
	public List<MapInfo> selectSysOrgPolygon(String orgId){
		return gridCommonMapper.selectSysOrgPolygon(orgId);
	}
	
	 
	public  List<MapPoi> selectAllChannelByOrgId(String orgId) {
		return gridCommonMapper.selectAllChannelByOrgId(orgId);
	}
	public  List<MapPoi> selectAllStationByOrgId(String orgId) {
		return gridCommonMapper.selectAllStationByOrgId(orgId);
	}
	
	public List<String> initSearchName(String orgId) {
		return gridCommonMapper.initSearchName(orgId);
	}
	
	
	public  List<MapPoi> selectSearchList(String name,String orgId) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("name", name);
		map.put("orgId", orgId);
		return gridCommonMapper.selectSearchList(map);
	}
	
	public  List<MapPoi> selectAllPoiByOrgId(String orgId) {
		return gridCommonMapper.selectAllPoiByOrgId(orgId);
	}
	
	public  List<MapPoi> selectAreaShape(String orgId) {
		return gridCommonMapper.selectAreaShape(orgId);
	}

	public Map<String,String> selectHouse(String physical_id) {
		Map<String,String> houseMap = gridCommonMapper.selectHouse(physical_id);
		return houseMap;
	}

	public Map<String,String> selectSchool(String physical_id) {
		Map<String,String> schoolMap = gridCommonMapper.selectSchool(physical_id);
		return schoolMap;
	}

	public Map<String,String> selectSchoolOrHouse(String uid) {
		Map<String,String> schoolOrHouse = gridCommonMapper.selectSchoolOrHouse(uid);
		return schoolOrHouse;
	}
	
	///根据UID去查询单个基础单元，本地接口
	public MapPoi selectPoiByUid(String uid) {
		return gridCommonMapper.selectPoiByUid(uid);
	}
	
	public List<MapInfo> getShapeByGriCode (String orgId,String gridCode){
		Map<String,String> paramMap = new HashMap<String,String>();
		paramMap.put("orgId", orgId);
		paramMap.put("gridCode", gridCode);
		return this.gridCommonMapper.getShapeByGriCode(paramMap);
	}
	
	 
	

	public  List<MapPoi> selectSchoolPoi(String name,String orgId) {
		String	statisMonth = schoolMapMapper.findByDate();
		Map<String, String> map = new HashMap<String, String>();
		map.put("name", name);
		map.put("orgId", orgId);
		map.put("statisMonth", statisMonth);
		return gridCommonMapper.selectSchoolPoi(map);
	}
	
	 
	
}

