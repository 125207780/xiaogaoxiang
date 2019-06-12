package com.bonc.gridinfo.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.gridinfo.dao.mapper.GridInfoMapper;

@Service
public class GridInfoService {

	@Resource
	private GridInfoMapper gridInfoMapper;

	public GridInfoMapper getMapper() {
		return gridInfoMapper;
	}

}
