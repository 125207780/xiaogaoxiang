package com.bonc.gridinfo.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.gridinfo.dao.entity.OrgGridDepartment;
import com.bonc.gridinfo.dao.entity.SaleDeptInfo;

/**
 * 营业部与网格信息mapper
 * 
 * @author yangdong@bonc.com.cn
 *
 */
public interface GridBusinessDepartmentMapper {

	/**
	 * 根据区县机构id查询所有网格信息
	 * 
	 * @param orgId
	 * @return
	 */
	public List<SaleDeptInfo> getDepartment(@Param("orgId") String orgId, @Param("saleDeptName") String saleDeptName);

	/**
	 * 查询当前营业部下的网格
	 * 
	 * @param saleDeptCode
	 * @return
	 */
	public List<OrgGridDepartment> getGridDeptInfo(@Param("orgId") String orgId, @Param("saleDeptCode") String saleDeptCode);

	/**
	 * 根据营业部名称查询当前营业部下的网格
	 * 
	 * @param saleDeptCode
	 * @return
	 */
	public List<OrgGridDepartment> getGridDeptInfoByName(@Param("orgId") String orgId, @Param("saleDeptName") String saleDeptName);

	/**
	 * 根据网格名称查询未加入营业部下的网格
	 * 
	 * @param saleDeptCode
	 * @return
	 */
	public List<Map<String, Object>> getNoGridDept(@Param("orgId") String orgId, @Param("gridName") String gridName);

	/**
	 * 移除单个网格
	 * 
	 * @param orgId
	 * @param gridCode
	 * @param saleDeptCode
	 * @return
	 */
	public void removeSingleGrid(@Param("updateDate") String updateDate, @Param("orgId") String orgId, @Param("gridCode") String gridCode,
			@Param("saleDeptCode") String saleDeptCode);

	/**
	 * 获取上一级机构信息
	 * 
	 * @param orgId
	 * @return
	 */
	public Map<String, Object> getParenOrg(String orgId);

	/**
	 * 加入营业部
	 * 
	 * @param orgGridDepartment
	 */
	public void addSingleGrid(OrgGridDepartment orgGridDepartment);

	/**
	 * 营业部关系维护修改，重跑程序更新数据
	 * 
	 * @param orgGridDepartment
	 */
	void CallDb2GXWH(Map<String, Object> map);

}
