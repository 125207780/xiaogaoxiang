package com.bonc.exam.dao.mapper;

import java.util.List;
import java.util.Map;

import com.bonc.exam.dao.entity.KpiIndex;

/**
 * 网格考核模块
 * 
 * @author luxing@bonc.com.cn
 *
 */

public interface KpiIndexMapper {

	List<KpiIndex> selectKpiGrid(Map<String, String> map);

	void insertExamKpi(List<Map<String, Object>> list);

	void insertObjType(Map<String, String> map);

	void insertExamModel(Map<String, String> map);

	// void insertObj(List list);

	List<String> selectKpiTypeByOrgId(String orgId);
}
