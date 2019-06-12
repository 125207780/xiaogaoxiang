package com.bonc.exam.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.bonc.exam.dao.entity.GridRankDetail;
import com.bonc.kpi.dao.entity.OrgSearch;

public interface GridRankDetailMapper {

	public List<GridRankDetail> getGridRankDetailInfo(@Param("girdRankDetail") GridRankDetail girdRankDetail,
			@Param("gridInfoList") List<OrgSearch> gridInfoList, @Param("sql") String sql);

	public List<GridRankDetail> getEvaluateCycle();

	public List<GridRankDetail> getRankDetail(@Param("id") String id, @Param("ect") String ect, @Param("et") String et, @Param("ot") String ot);

	public List<GridRankDetail> getGridRankDetailInfoModify(@Param("girdRankDetail") GridRankDetail girdRankDetail,
			@Param("gridInfoList") List<OrgSearch> gridInfoList);

	public List<GridRankDetail> getGridRankInfoModify(@Param("girdRankDetail") GridRankDetail girdRankDetail,
			@Param("gridInfoList") List<OrgSearch> gridInfoList);
}
