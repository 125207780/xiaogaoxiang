package com.bonc.map.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.map.dao.entity.MapInfo;
import com.bonc.map.dao.entity.MapPoi;
import com.bonc.system.dao.entity.SysOrg;

public interface GridCommonMapper {

	List<SysOrg> selectList(SysOrg po);
	
	List<MapInfo> selectSysOrgPolygon(String orgId);
	
	List<MapInfo> getShapeByGriCode(Map map);
	 
	
	 List<MapPoi> selectAllChannelByOrgId(String orgId);
	 
	 List<MapPoi> selectAllStationByOrgId(String orgId);
	 
	 List<String> initSearchName(String orgId);
	 
	 List<MapPoi> selectSearchList(Map<String, String> map) ;
	 
	 List<MapPoi> selectAllPoiByOrgId(String orgId);
	 
	 List<MapPoi> selectAreaShape(String orgId);

	 Map<String,String> selectHouse(String physical_id);

	 Map<String,String> selectSchool(String physical_id);

	 Map<String,String> selectSchoolOrHouse(String uid);
	 
	 MapPoi  selectPoiByUid(String uid);
	 
 
	 List<MapPoi> selectSchoolPoi(Map<String, String> map) ;
	 
	 
	 
}
