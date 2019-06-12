package com.bonc.map.dao.mapper;

import java.util.List;
import java.util.Map;

/**
 * 
 * @FileName FirstPageThreeSchoolMapper.java
 * @Author xiaogaoxiang
 * @At 2019年3月22日 下午3:52:40
 * @Desc 首页校园报表Mapper
 */
public interface FirstPageThreeSchoolMapper {

	/**
	 * 校园营销报表-用户表(月)
	 * 
	 * @Title getSchoolUserMonth
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getSchoolUserMonth(Map<String, Object> params);

	/**
	 * 校园用户画像表(月)
	 * 
	 * @Title getSchoolUserPortraitMonth
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	List<Map<String, Object>> getSchoolUserPortraitMonth(Map<String, Object> params);

	/**
	 * 校园营销报表-校园客户情况(日)
	 * 
	 * @Title getSchoolUserStatusDay
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getSchoolUserStatusDay(Map<String, Object> params);

	/**
	 * 校园营销报表-校园客户情况(月)
	 * 
	 * @Title getSchoolUserStatusMonth
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getSchoolUserStatusMonth(Map<String, Object> params);

	/**
	 * 校园营销报表-校园重点活动办理情况(日)
	 * 
	 * @Title getSchoolImportantActiveStatusDay
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getSchoolImportantActiveStatusDay(Map<String, Object> params);

	/**
	 * 校园营销报表-校园重点活动办理明细情况(日)
	 * 
	 * @Title getSchoolImportantActiveDetailStatusDay
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getSchoolImportantActiveDetailStatusDay(Map<String, Object> params);

	/**
	 * 校园营销报表-存量校园客户保有情况日报表(日)
	 * 
	 * @Title getSchoolStockUserTenureStatusDay
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getSchoolStockUserTenureStatusDay(Map<String, Object> params);

	/**
	 * 校园用户份额分布(日)
	 * 
	 * @Title getSchoolUserShareDistribution
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getSchoolUserShareDistributionDay(Map<String, Object> params);

	/**
	 * 校园用户份额分布(月)
	 * 
	 * @Title getSchoolUserShareDistributionMonth
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	List<Map<String, Object>> getSchoolUserShareDistributionMonth(Map<String, Object> params);

	/**
	 * 校园异网用户表(日)
	 * 
	 * @Title getOutNetUserDay
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getOutNetUserDay(Map<String, Object> params);

	/**
	 * 校园信息表(月)
	 * 
	 * @Title getSchoolInfoMonth
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getSchoolInfoMonth(Map<String, Object> params);
}
