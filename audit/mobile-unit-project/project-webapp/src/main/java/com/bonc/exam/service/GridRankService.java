package com.bonc.exam.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.exam.dao.entity.GridRank;
import com.bonc.exam.dao.entity.GridRankDetail;
import com.bonc.exam.dao.mapper.GridRankMapper;
import com.bonc.kpi.dao.entity.OrgSearch;
import com.bonc.kpi.service.KpiManagerService;

@Service
@Transactional(rollbackFor = Exception.class)
public class GridRankService {

	@Autowired
	private KpiManagerService kpiManagerService;

	@Resource
	private GridRankMapper gridRankMapper;

	public GridRankMapper getMapper() {

		return gridRankMapper;
	}

	public Map<String, List<OrgSearch>> initSeletOrg(String orgId) {

		return kpiManagerService.initSeletOrg(orgId);
	}

	public Map<String, List<OrgSearch>> getChildrenOrg(String orgId) {

		return kpiManagerService.getChildrenOrg(orgId);
	}

	public List<GridRank> getGridRankInfo(GridRank girdRank, List<OrgSearch> gridInfoList) {
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
		return gridRankMapper.getGridRankInfo(girdRank, gridInfoList, sql);
	}

	public List<GridRankDetail> getGridRankInfoModify(GridRankDetail girdRankDetail, List<OrgSearch> gridInfoList) {

		return gridRankMapper.getGridRankInfoModify(girdRankDetail, gridInfoList);
	}

	/**
	 * 结果发布
	 * 
	 * @param girdRank
	 * @param gridInfoList
	 * @return
	 */
	public List<GridRank> getResultReleaseInfo(GridRank girdRank, List<OrgSearch> gridInfoList) {
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
		return gridRankMapper.getResultReleaseInfo(girdRank, gridInfoList, sql);
	}

	/**
	 * 修改状态
	 * 
	 * @param ids
	 */
	public String updateStautsInfo(String ids) {
		String info = "";
		for (String id : ids.split(",")) {
			this.gridRankMapper.updateStauts(id);
			info = "更新成功";
		}
		return info;
	}
}
