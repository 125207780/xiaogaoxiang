package com.bonc.gridinfo.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.gridinfo.dao.mapper.BuildDetailInfoMapper;

@Service
public class BuildDetailInfoService {

	@Resource
	private BuildDetailInfoMapper buildDetailInfoMapper;

	public BuildDetailInfoMapper getMapper() {
		return buildDetailInfoMapper;
	}

	public List<Map<String, Object>> getBuildDetailInfoMapper(String listType, String gridCode) {
		return buildDetailInfoMapper.getBuildDetailInfo(listType, gridCode);
	}
}
