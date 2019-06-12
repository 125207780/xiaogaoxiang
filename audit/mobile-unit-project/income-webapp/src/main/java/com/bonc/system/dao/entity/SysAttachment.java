package com.bonc.system.dao.entity;

public class SysAttachment {

	private String id;//唯一ID
	private String filePath;//文件路径
	private String fileType;//文件类型
	private String realName;//文件真实名称
	private String createUser;//创建人
	private String createTime;//创建时间
	private String createDepart;//创建部门
	private String tableId;//表ID
	private String tableName;//表名称
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getCreateDepart() {
		return createDepart;
	}
	public void setCreateDepart(String createDepart) {
		this.createDepart = createDepart;
	}
	public String getTableId() {
		return tableId;
	}
	public void setTableId(String tableId) {
		this.tableId = tableId;
	}
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

}