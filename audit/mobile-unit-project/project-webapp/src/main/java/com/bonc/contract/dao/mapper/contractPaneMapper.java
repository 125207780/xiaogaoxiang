package com.bonc.contract.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface contractPaneMapper {
	List<Map<String, String>> selectGridName(@Param("nowOrgId") String nowOrgId);

	List<Map<String, String>> selectTypeOne();

	List<Map<String, String>> selectTypeTwo(@Param("code") String code);

	List<Map<String, String>> initGrid(Map<String, Object> map);

	List<Map<String, String>> selectChannl(@Param("chnl_code") String chnl_code);

	int insertContract(Map<String, Object> map);

	int insertPhysical(Map<String, String> map);

	Map<String, String> initManagerType(@Param("chnl_code") String chnl_code);

	List<Map<String, String>> tableManager(Map<String, Object> map);

	int insertChnlManager(Map<String, Object> map);

	Map<String, String> selectGridUserByGridCode(String gridCode);

	int insertGridItemInfo(Map<String, Object> map);

	void updateMsContractAreaById(String id);
}
