package com.bonc.gridinfo.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.gridinfo.dao.entity.GridReadInfo;
import com.bonc.gridinfo.dao.mapper.GridReadInfoMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class GridReadInfoService {
	@Resource
	private GridReadInfoMapper gridReadInfoMapper;

	public GridReadInfoMapper getMapper() {
		return gridReadInfoMapper;
	}

	public void updatePendingStatus(GridReadInfo gridItemInfo) {
		gridReadInfoMapper.updateByState(gridItemInfo);
	}
}
