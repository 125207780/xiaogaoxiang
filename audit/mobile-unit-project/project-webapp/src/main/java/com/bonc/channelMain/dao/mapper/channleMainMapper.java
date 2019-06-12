package com.bonc.channelMain.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface channleMainMapper {
	List<Map<String, String>> initChanelName(String gridCode);

	List<Map<String, String>> initGrid(Map<String, Object> map);

	List<Map<String, String>> changeGrid(Map<String, Object> map);

	List<Map<String, String>> initTable(Map<String, Object> map);

	List<Map<String, String>> changeTable(Map<String, Object> map);

	List<Map<String, String>> ChannelManager(Map<String, Object> map);

	List<Map<String, String>> getChnlCode(String LOGIN_ID);

	List<Map<String, String>> chnlInformationGrid(@Param("ChnlList") List<String> ChnlList);

	int UpdatetChnlManager(Map<String, String> map);

	List<Map<String, String>> getInFullOA(Map<String, String> paramMap);

	List<Map<String, String>> getGridChnlManager(String gridCode);

	Map<String, String> selectCountyUserByGridCode(String gridCode);

	Map<String, String> selectGridName(String gridCode);

	int insertCountyInfo(Map<String, Object> map);

	Map<String, String> initGridCode(@Param("loginId") String loginId);

	Map<String, String> getPID(String gridCode);
}
