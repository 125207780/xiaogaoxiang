package com.bonc.gridinfo.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.gridinfo.dao.mapper.GridManagerUserMapper;

@Service
public class GridManagerUserService {

	@Resource
	private GridManagerUserMapper gridManagerUserMapper;

	public GridManagerUserMapper getMapper() {

		return gridManagerUserMapper;
	}

}
