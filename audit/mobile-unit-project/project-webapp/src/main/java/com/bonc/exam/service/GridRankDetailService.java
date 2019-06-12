package com.bonc.exam.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.exam.dao.entity.GridRankDetail;
import com.bonc.exam.dao.mapper.EvaluationKpilMapper;
import com.bonc.exam.dao.mapper.GridRankDetailMapper;
import com.bonc.kpi.dao.entity.OrgSearch;

@Service
@Transactional(rollbackFor = Exception.class)
public class GridRankDetailService {

	@Resource
	private GridRankDetailMapper gridRankDetailMapper;

	@Resource
	private EvaluationKpilMapper evaluationKpilMapper;

	public GridRankDetailMapper getMapper() {

		return gridRankDetailMapper;
	}

	public EvaluationKpilMapper getEvaluationKpilMapper() {

		return evaluationKpilMapper;
	}

	public List<GridRankDetail> getGridRankDetailInfo(GridRankDetail gridRankDetail, List<OrgSearch> gridInfoList) {
		String sql = "";
		if (gridInfoList.size() > 0) {
			for (int i = 0; i < gridInfoList.size(); i++) {
				if (i == gridInfoList.size() - 1) {
					sql += "'" + gridInfoList.get(i).getGridCode() + "'";
				} else {
					sql += "'" + gridInfoList.get(i).getGridCode() + "',";
				}
			}
		} else {
			sql += "''";
		}
		return gridRankDetailMapper.getGridRankDetailInfo(gridRankDetail, gridInfoList, sql);
	}

	public List<GridRankDetail> getGridRankDetailInfoModify(GridRankDetail gridRankDetail, List<OrgSearch> gridInfoList) {

		return gridRankDetailMapper.getGridRankDetailInfoModify(gridRankDetail, gridInfoList);
	}

	public List<GridRankDetail> getGridRankInfoModify(GridRankDetail gridRankDetail, List<OrgSearch> gridInfoList) {

		return gridRankDetailMapper.getGridRankInfoModify(gridRankDetail, gridInfoList);
	}

}
