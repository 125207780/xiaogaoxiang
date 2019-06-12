package com.bonc.contract.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface ChannelMapper {

	List<Map<String, Object>> selectChannelList(String gridCode);

	int insertMsContractArea(Map<String, Object> mapObj);

	void updateMsContractArea(Map<String, String> inMap);

	void updateMsContractAreaById(Map<String, String> inMap);

	void insertMsContractAreaHis(Map<String, Object> outMap);

	Map<String, Object> selectMsContractAreaById(String unitId);

	Map<String, String> selectLngAndLat(@Param("uid") String uid);

	void deleteMsContractAreaById(Map<String, String> inMap);

}
