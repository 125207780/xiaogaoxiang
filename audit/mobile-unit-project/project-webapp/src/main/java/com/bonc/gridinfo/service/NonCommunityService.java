package com.bonc.gridinfo.service;



import javax.annotation.Resource;


import org.springframework.stereotype.Service;


import com.bonc.gridinfo.dao.mapper.NonCommunityMapper;


@Service
public class NonCommunityService {

	@Resource
	private NonCommunityMapper nonCommunityMapper;



	public NonCommunityMapper getMapper() {
		return nonCommunityMapper;
	}


}
