package com.bonc.netResources.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.netResources.dao.entity.NetResources;

public interface NetResourcesMapper {

	List<NetResources> selectList();

	/**
	 * 一级
	 * 
	 * @return
	 */
	public List<Map<String, Object>> getFirstType();

	/**
	 * 二级
	 * 
	 * @param pId
	 * @return
	 */
	public List<Map<String, Object>> getSecondType(String pId);

	/**
	 * 全省网格基础数据入格日通报
	 * 
	 * @return
	 */
	List<Map<String, Object>> getDayReportForm();

	/**
	 * 根据一级菜单，查询二级分类
	 * 
	 * @Title getChildrenNetRresourceByOrgId
	 * @Author xiaogaoxiang
	 * @param netCode
	 * @return List<NetResources>
	 */
	List<NetResources> getChildrenNetRresourceByOrgId(@Param("netCode") String netCode);

}
