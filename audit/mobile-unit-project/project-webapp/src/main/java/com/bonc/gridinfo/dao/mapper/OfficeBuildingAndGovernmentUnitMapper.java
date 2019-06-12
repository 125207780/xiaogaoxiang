package com.bonc.gridinfo.dao.mapper;
import java.util.Map;
/**
 * 写字楼和政府单位信息mapper
 * 
 * @author caoxiaojuan@bonc.com.cn
 *
 */
public interface OfficeBuildingAndGovernmentUnitMapper {
	public Map<String, Object> getOfficeBuilding(String physicCode);
	public Map<String, Object> getGovernmentUnit(String physicCode);

}
