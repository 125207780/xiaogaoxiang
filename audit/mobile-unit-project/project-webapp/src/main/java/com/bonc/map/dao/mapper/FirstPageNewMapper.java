package com.bonc.map.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface FirstPageNewMapper {

	/**
	 * 根据orgid查询首页网格数据
	 * 
	 * @author liupeidong
	 * @param orgId
	 */
	List<Map<String, Object>> getGridInfoOverView(@Param("orgId") String orgId);

	/**
	 * 获取网格规模top数据
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getGridTop(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel, @Param("gridType") String gridType);

	/**
	 * 获取渠道规模top数据
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getChnlTop(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel, @Param("gridType") String gridType);

	/**
	 * 获取渠道规模一级top数据
	 * 
	 * @param orgId
	 * @param orgLevel
	 * @param gridType
	 * @return
	 */
	public List<Map<String, Object>> getChnlLevel1Top(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel, @Param("gridType") String gridType);

	/**
	 * 获取基站规模top数据
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getStatTop(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel, @Param("gridType") String gridType);

	/**
	 * 获取人员信息规模top数据
	 */
	public List<Map<String, Object>> getStaffTop(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel, @Param("gridType") String gridType);

	/**
	 * 获取语音规模top数据
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getVoiceTop(@Param("orgId") Integer orgId, @Param("orgLevel") String orgLevel, @Param("gridType") String gridType);

	/**
	 * 获取网格信息
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @param smallScaleType
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getGridTableInfo(@Param("orgId") String orgId, @Param("smallScaleType") String smallScaleType,
			@Param("orgLevel") String orgLevel);

	/**
	 * 获取渠道信息
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @param smallScaleType
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getChnlTableInfo(@Param("orgId") String orgId, @Param("smallScaleType") String smallScaleType,
			@Param("orgLevel") String orgLevel);

	/**
	 * 获取渠道一级详细详细
	 * 
	 * @param orgId
	 * @param smallScaleType
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getChnlLevel1TableInfo(@Param("orgId") String orgId, @Param("smallScaleType") String smallScaleType,
			@Param("orgLevel") String orgLevel);

	/**
	 * 获取基站信息
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @param smallScaleType
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getStatTableInfo(@Param("orgId") String orgId, @Param("smallScaleType") String smallScaleType,
			@Param("orgLevel") String orgLevel);

	/**
	 * 获取基站信息
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @param smallScaleType
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getStaffTableInfo(@Param("orgId") String orgId, @Param("smallScaleType") String smallScaleType, 
			@Param("orgLevel") String orgLevel);

	/**
	 * 获取汇总信息指标一类
	 * 
	 * @author liupeidong
	 * @return
	 */
	public List<Map<String, Object>> getBigType();

	/**
	 * 获取汇总信息指标二类
	 * 
	 * @author liupeidong
	 * @return
	 */
	public List<Map<String, Object>> getSmallType(@Param("kpiType") String kpiType);

	/**
	 * 获取考核得分echart
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @return
	 */
	public List<Map<String, Object>> getAssessmentEcharts(@Param("orgId") String orgId, @Param("orgId") String orgLevel);

	/**
	 * 网格数据详细信息列名称
	 */
	public static String[] GRID_DETAIL_TITLES = { "网格名称", "所在地市", "所在区县", "移动渠道数", "联通渠道数", "电信渠道数", "基站数", "乡镇数", "行政村数", "渠道常客数", "基站23G客户数", "基站4G客户数",
			"集团客户数", "家宽客户数", "网格常驻人口", "收入", "同比", "环比", "客户份额", "渠道份额", "4G普及率", "宽带资源利用率", "通话客户数", "不限量套餐渗透率" };
	/**
	 * 网格数据详细信息列属性名
	 */
	public static String[] GRID_DETAIL_COLUMNS = { "GRID_NAME", "CITY_NAME", "AREA_NAME", "MOBILE_CHNL_NUM", "UNICOM_CHNL_NUM", "TELECOM_CHNL_NUM",
			"STATION_NUM", "TOWN_NUM", "VILLAGE_NUM", "CHNL_USER_NUM", "STATION_23G_USER", "STATION_4G_USER", "GROUP_NUM", "KD_USER_NUM", "GRID_RESIDENT_USER",
			"FEE", "COMPARE_LAST_MONTH", "COMPARE__YSE", "USER_PER", "CHNL_SHAPE", "4G_PER", "KD_PORT_USED_PER", "VOICE_USER_NUM", "BXL_BRAND_PER" };

	/**
	 * 渠道数据详细信息列名称
	 */
//	public static String[] CHNL_DETAIL_TITLES = { "渠道编码", "所属地市", "所属区县公司", "渠道名称", "一级类型", "二级类型", "渠道星级", "渠道地址", "渠道经理姓名", "渠道经理电话", "终端销量", "新增家庭网",
//			"新增入网即不限量客户数", "新增入网即4G客户数", "新和家庭新增量" };
	public static String[] CHNL_DETAIL_TITLES = { "渠道编码", "所属地市", "所属区县公司", "渠道名称", "一级类型", "二级类型", "渠道星级", 
			"渠道地址", "渠道经理姓名", "渠道经理电话" };

	/**
	 * 渠道数据详细信息列属性名
	 */
//	public static String[] CHNL_DETAIL_COLUMNS = { "CHNL_CODE", "CITY_NAME", "AREA_NAME", "CHNL_NAME", "CHNL_TYPE_LEVEL1", "CHNL_TYPE_LEVEL2", "CHNL_STAR",
//			"CHNL_ADDR", "CHNL_MNGR_NAME", "CHNL_MNGR_NUMBER", "INDEX_01", "INDEX_02", "INDEX_03", "INDEX_04", "INDEX_05" };//index_01 ~ index_05数据统计不准确，去掉统计的数据
	public static String[] CHNL_DETAIL_COLUMNS = { "CHNL_CODE", "CITY_NAME", "AREA_NAME", "CHNL_NAME", "CHNL_TYPE_LEVEL1", "CHNL_TYPE_LEVEL2", "CHNL_STAR",
			"CHNL_ADDR", "CHNL_MNGR_NAME", "CHNL_MNGR_NUMBER" };

	/**
	 * 基站数据详细信息列名称
	 */
	public static String[] STAT_DETAIL_TITLES = { "基站编码", "基站名称", "所在地市", "所在区县", "归属网格", "通话客户数", "人均流量DOU", "新增通话客户数", "人均MOU", "同比", "环比", "总收入", "基站常驻居住地用户数",
			"基站常驻工作地用户数" };

	/**
	 * 基站数据详细信息列属性名
	 */
	public static String[] STAT_DETAIL_COLUMNS = { "STATION_CODE", "STATION_NAME", "CITY_NAME", "AREA_NAME", "GRID_CODE", "VOICE_USER_NUM", "AVG_DOU", "NEW_VOICE_USER", "AVG_MOU",
			"COMPARE_LAST", "COMPARE_YES", "TOTAL_FEE", "HOME_NUM", "WORK_NUM" };
	
	/**
	 * 人员详细信息列名称
	 */
	public static String[] STAFF_DETAIL_TITLES = { "用户名称", "用户类型", "用户号码", "所属地市", "所属区县", "网格名称", "网格类型" };
	
	/**
	 * 人员详细信息列属性名
	 */
	public static String[] STAFF_DETAIL_COLUMNS = { "USER_NAME", "USER_TYPE", "USER_PHONE", "AREA_NAME", "CNTY_NAME", "GRID_NAME", "GRID_TYPE" };
}
