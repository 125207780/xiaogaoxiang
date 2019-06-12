package com.bonc.map.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.map.dao.entity.WgHfScale;

public interface PageOneMapper {

	public List<Map<String, Object>> getTopFive(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgCode") String orgCode,
			@Param("orgName") String orgName, @Param("scale") String scale);

	public List<WgHfScale> getFiveInfo(@Param("orgId") String orgId, @Param("parentId") String parentId);

	public List<Map<String, Object>> getFiveBarInfo(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgCode") String orgCode,
			@Param("orgName") String orgName);

	public List<Map<String, Object>> getTaskByFiveDay(@Param("orgId") String orgId, @Param("orgCode") String orgCode);

	public List<Map<String, Object>> getTaskByFiveMonth(@Param("orgId") String orgId, @Param("orgCode") String orgCode);

	public List<Map<String, Object>> getIncome(@Param("orgId") String orgId, @Param("orgCode") String orgCode);

	public List<Map<String, Object>> getCustomer(@Param("orgId") String orgId, @Param("orgCode") String orgCode);

	public List<Map<String, Object>> getCell(@Param("orgId") String orgId, @Param("orgCode") String orgCode);

	public List<Map<String, Object>> getGroup(@Param("orgId") String orgId, @Param("orgCode") String orgCode);

	public List<Map<String, Object>> getChnl(@Param("orgId") String orgId, @Param("orgCode") String orgCode);

	public List<Map<String, Object>> getIncomeBar(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgCode") String orgCode,
			@Param("orgName") String orgName);

	public List<Map<String, Object>> getCustomerBar(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgCode") String orgCode,
			@Param("orgName") String orgName);

	public List<Map<String, Object>> getCellBar(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgCode") String orgCode,
			@Param("orgName") String orgName);

	public List<Map<String, Object>> getGroupBar(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgCode") String orgCode,
			@Param("orgName") String orgName);

	public List<Map<String, Object>> getChnlBar(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgCode") String orgCode,
			@Param("orgName") String orgName);

	public List<Map<String, Object>> getSexPortrait(@Param("orgId") String orgId, @Param("userType") String userType, @Param("parentId") String parentId);

	public Map<String, Object> getNestingPie(@Param("orgId") String orgId, @Param("userType") String userType, @Param("parentId") String parentId);

	public Map<String, Object> getNestingBar(@Param("orgId") String orgId, @Param("userType") String userType, @Param("parentId") String parentId);

	public Map<String, Object> getInterestFeatures(@Param("orgId") String orgId, @Param("userType") String userType, @Param("parentId") String parentId);

	public Map<String, Object> getConsumeFeatures(@Param("orgId") String orgId, @Param("userType") String userType, @Param("parentId") String parentId);

	public List<Map<String, Object>> getFirstLevel();

	public List<Map<String, Object>> getSecondLevel();

	public List<Map<String, Object>> getSelectChildren(String portraitCode);

	public List<Map<String, Object>> getIncomeTable(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgName") String orgName);

	public List<Map<String, Object>> getCustomerTable(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgName") String orgName);

	public List<Map<String, Object>> getCellTable(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgName") String orgName);

	public List<Map<String, Object>> getGroupTable(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgName") String orgName);

	public List<Map<String, Object>> getChnlTable(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgName") String orgName);

	public Map<String, Object> getAreaAge(@Param("orgId") String orgId, @Param("userType") String userType, @Param("parentId") String parentId);

	public Map<String, Object> getArpuBar(@Param("orgId") String orgId, @Param("userType") String userType, @Param("parentId") String parentId);

	public Map<String, Object> getDouEcharts(@Param("orgId") String orgId, @Param("userType") String userType, @Param("parentId") String parentId);

	public Map<String, Object> getMouEcharts(@Param("orgId") String orgId, @Param("userType") String userType, @Param("parentId") String parentId);

	public Map<String, Object> getPreferenceEcharts(@Param("orgId") String orgId, @Param("userType") String userType, @Param("parentId") String parentId);

	public Map<String, Object> getAppEcharts(@Param("orgId") String orgId, @Param("userType") String userType, @Param("parentId") String parentId);

	public List<Map<String, Object>> getThreearpuEcharts(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgName") String orgName);

	public Map<String, Object> getBroadbandEcharts(@Param("orgId") String orgId, @Param("parentId") String parentId);

	public Map<String, Object> getFlowEcharts(@Param("orgId") String orgId, @Param("parentId") String parentId);

	public Map<String, Object> getUserScale(@Param("orgId") String orgId, @Param("parentId") String parentId);

	public Map<String, Object> getInNet(@Param("orgId") String orgId, @Param("parentId") String parentId);

	public Map<String, Object> getAccessEcharts(@Param("orgId") String orgId, @Param("parentId") String parentId);

	public Map<String, Object> getWarningEcharts(@Param("orgId") String orgId, @Param("parentId") String parentId);

	public Map<String, Object> getChnlnumEcharts(@Param("orgId") String orgId, @Param("parentId") String parentId);

	public List<Map<String, Object>> getChnlstarEcharts(@Param("orgId") String orgId, @Param("parentId") String parentId);

	public List<Map<String, Object>> getChnlNumFull(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgName") String orgName);

	public List<Map<String, Object>> getChnlShare(@Param("orgId") String orgId, @Param("parentId") String parentId, @Param("orgName") String orgName);

}
