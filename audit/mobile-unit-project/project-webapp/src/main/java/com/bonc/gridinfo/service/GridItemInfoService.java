package com.bonc.gridinfo.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.gridinfo.dao.entity.GridItemInfo;
import com.bonc.gridinfo.dao.mapper.GridItemInfoMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class GridItemInfoService {
	@Resource
	private GridItemInfoMapper gridItemInfoMapper;

	public GridItemInfoMapper getMapper() {
		return gridItemInfoMapper;
	}

	public void updateFinishStatus(GridItemInfo gridItemInfo) {
		gridItemInfoMapper.updateByStautes(gridItemInfo);
	}
}
