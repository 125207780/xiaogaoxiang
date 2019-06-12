package com.bonc.gridschoolinfo.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.school.dao.entity.SchoolUserDetail;

public interface GridSchoolInfoMapper {

	/**
	 * 查询网格学校基础信息
	 * 
	 * @param schId
	 * @return
	 */
	public List<Map<String, Object>> getBaseGridSchoolInfo(@Param("schId")String schId);
	
	/**
	 * 查询网格学校业务办理信息左边数据
	 * 
	 * @param schId
	 * @return
	 */
	public List<Map<String, Object>> getBaseGridSchoolYWBLInfoL(@Param("schId")String schId);
	/**
	 * 查询网格学校业务办理信息右边数据
	 * 
	 * @param schId
	 * @return
	 */
	public List<Map<String, Object>> getBaseGridSchoolYWBLInfoR(@Param("selected")String selected,@Param("schoolId")String schoolId);

	/**
	 * 查询网格学校校园新用户信息左边数据
	 * 
	 * @param schId
	 * @return
	 */
	public List<Map<String, Object>> getGridSchoolNewDevelopL(@Param("schId")String schId);
	/**
	 * 查询网格学校校园新用户信息右边数据
	 * 
	 * @param schId
	 * @return
	 */
	public List<Map<String, Object>> getGridSchoolNewDevelopR(@Param("selected")String selected,@Param("schId")String schId);
	public List<Map<String, Object>> getGridSchoolUseL(@Param("schId")String schId);
	
	public List<Map<String, Object>> getGridSchoolUseR(@Param("selected")String selected,@Param("schId")String schId);
	
	public List<SchoolUserDetail> getGridSchoolUserDetailInit(@Param("schoolUserDetail")SchoolUserDetail schoolUserDetail);
	
	
List<SchoolUserDetail> findSchoolUserDetailInfo(@Param("schoolUserDetail")SchoolUserDetail schoolUserDetail);
	
	SchoolUserDetail findUserInfo(SchoolUserDetail statisMonth);
	
	List<SchoolUserDetail> selectAll(@Param("statisMonth")int statisMonth,@Param("actviTypeId")String actviTypeId,@Param("usrType")String usrType,@Param("feeLevelId")String feeLevelId,@Param("gprsLevelId")String gprsLevelId,@Param("schoolId")String schoolId,@Param("voiceLevelId")String voiceLevelId,@Param("appTypeId")String appTypeId,@Param("discFeeId")String discFeeId);
	
	List<Map<String,String>> findContractType();
	
	List<Map<String,String>> findStockAdditions();
	
	List<Map<String,String>> findIncomeFiling();
	
	List<Map<String,String>> findAPPFiling();
	
	List<Map<String,String>> findTaocanFiling();
	
	List<Map<String,String>> findFlowFiling();
	
	List<Map<String,String>> findPhoneticFiling();
	String findByDate();
}
