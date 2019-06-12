package com.bonc.gridinfo.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.bonc.gridinfo.dao.entity.Competitor;

/**
 * 竞争对手mapper
 * 
 * @author yangdong@bonc.com.cn
 *
 */
public interface CompetitorInfoMapper {

	/**
	 * 查询竞争对手信息
	 * 
	 * @return
	 */
	public List<Competitor> getCompetitorInfo(Competitor competitor);

	public List<Competitor> selectAll(@Param("gridCode") String gridCode, @Param("physicalGridName") String physicalGridName);

	public List<Competitor> getOperator();

	public List<Competitor> getPhysicalGridName(String gridCode);

	//public List<Competitor> getTypeAndName(@Param("physicalGridType") String physicalGridType, @Param("gridCode") String gridCode);

	public Competitor getCompetitorRatio(@Param("gridCode") String gridCode, @Param("physicalGridCode") String physicalGridCode,
			@Param("listType") String listType);
}
