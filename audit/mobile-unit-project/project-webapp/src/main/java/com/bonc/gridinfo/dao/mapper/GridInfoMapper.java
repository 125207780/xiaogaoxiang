package com.bonc.gridinfo.dao.mapper;

import java.util.List;

import com.bonc.gridinfo.dao.entity.GridInfo;

/**
 * 网格信息mapper
 * 
 * @author yangdong@bonc.com.cn
 *
 */
public interface GridInfoMapper {

	/**
	 * 网格统计信息-基本信息&&网格基本信息-网格基本信息/资源信息
	 * 
	 * @param gridCode
	 * @return
	 */
	public List<GridInfo> getGridInfo(String gridCode);

	/**
	 * 网格基本信息-网格团队信息
	 * 
	 * @param gridCode
	 * @return
	 */
	public List<GridInfo> getGridTeamInfo();

}
