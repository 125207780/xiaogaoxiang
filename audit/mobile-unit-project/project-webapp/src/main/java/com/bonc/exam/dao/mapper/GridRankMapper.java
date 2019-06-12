package com.bonc.exam.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.bonc.exam.dao.entity.GridRank;
import com.bonc.exam.dao.entity.GridRankDetail;
import com.bonc.kpi.dao.entity.OrgSearch;

public interface GridRankMapper {

	public List<GridRank> getGridRankInfo(@Param("girdRank") GridRank girdRank, @Param("gridInfoList") List<OrgSearch> gridInfoList, @Param("sql") String sql);

	// 结果发布
	public List<GridRank> getResultReleaseInfo(@Param("girdRank") GridRank girdRank, @Param("gridInfoList") List<OrgSearch> gridInfoList,
			@Param("sql") String sql);

	public List<GridRank> selectGridRankId(String[] ids);

	public void updateStauts(String id);

	public List<GridRankDetail> getGridRankInfoModify(@Param("girdRankDetail") GridRankDetail girdRankDetail,
			@Param("gridInfoList") List<OrgSearch> gridInfoList);
}
