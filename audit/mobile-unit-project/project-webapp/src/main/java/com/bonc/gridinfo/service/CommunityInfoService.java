package com.bonc.gridinfo.service;


import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.gridinfo.dao.mapper.CommunityInfoMapper;


@Service
public class CommunityInfoService {

	@Resource
	private CommunityInfoMapper mapper;

	public CommunityInfoMapper getMapper() {
		return mapper;
	}
}
