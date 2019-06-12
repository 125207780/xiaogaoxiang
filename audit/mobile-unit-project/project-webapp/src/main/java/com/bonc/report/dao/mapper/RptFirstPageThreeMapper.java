package com.bonc.report.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;

/**
 * 
 * @FileName RptFirstPageThreeMapper.java
 * @Author xiaogaoxiang
 * @At 2019年4月4日 上午11:08:25
 * @Desc 首页报表导出类Mapper
 */
public interface RptFirstPageThreeMapper {

	/**
	 * 查询网格业务办理（日）报表数据
	 * 
	 * @Title rptGridBusinessTargetDoneD
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> rptGridBusinessTargetDoneD(Map<String, Object> params);

	/**
	 * 根据NET_CODE查询要导出的数据库表名，表字段，列表名称
	 * 
	 * @Title selectSelfHelpReportByNetCode
	 * @Author xiaogaoxiang
	 * @param netCode
	 * @return Map<String,Object>
	 */
	Map<String, Object> selectSelfHelpReportByNetCode(@Param("netCode") String netCode);

	/**
	 * 自助报表导出
	 * 
	 * @Title selectSelfHelpReportInfo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@SelectProvider(type = RptFirstPageThreeMapperSql.class, method = "selectSelfHelpReportInfo")
	List<Map<String, Object>> selectSelfHelpReportInfo(Map<String, Object> params);

}
