package com.bonc.dataVisualization.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.dataVisualization.dao.entity.TableInfo;

public interface VisualRightMapper {

	public void addTableInfo(TableInfo tableInfo);

	public List<TableInfo> findTableInfo(@Param("tableName") String tableName);

	public int checkTable(@Param("tableName") String tableName, @Param("tabschema") String tabschema);

	public String findTabschema(@Param("tableName") String tableName);

	public List<Map<String, Object>> findColumnName(@Param("tableName") String tableName, @Param("tabschema") String tabschema);

	public List<Map<String, Object>> findColumnContent(@Param("sql") String sql, @Param("field") String field);

}
