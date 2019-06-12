package com.bonc.dataVisualization.dao.entity;

public class TableInfo {

	private String tableName;
	private String tableRemake;
	private String tabschema;
	private String columnName;
	private String columnType;
	private String columnSize;
	private String columnRemake;
	private String createTime;
	private String oprUser;

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public String getColumnType() {
		return columnType;
	}

	public void setColumnType(String columnType) {
		this.columnType = columnType;
	}

	public String getColumnSize() {
		return columnSize;
	}

	public void setColumnSize(String columnSize) {
		this.columnSize = columnSize;
	}

	public String getColumnRemake() {
		return columnRemake;
	}

	public void setColumnRemake(String columnRemake) {
		this.columnRemake = columnRemake;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getOprUser() {
		return oprUser;
	}

	public void setOprUser(String oprUser) {
		this.oprUser = oprUser;
	}

	public String getTableRemake() {
		return tableRemake;
	}

	public void setTableRemake(String tableRemake) {
		this.tableRemake = tableRemake;
	}

	public String getTabschema() {
		return tabschema;
	}

	public void setTabschema(String tabschema) {
		this.tabschema = tabschema;
	}

}
