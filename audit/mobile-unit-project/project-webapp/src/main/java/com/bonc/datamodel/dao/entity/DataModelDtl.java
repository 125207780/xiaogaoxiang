package com.bonc.datamodel.dao.entity;

import java.io.Serializable;

import com.bonc.system.service.SysCodeUtils;

/**
 * 数据模型详细model
 * 
 * @author weihongda
 */
public class DataModelDtl implements Comparable<DataModelDtl>, Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * id
	 */
	private String id;
	/**
	 * 模型id
	 */
	private String dataModelId;
	/**
	 * 数据模型中文名
	 */
	private String modelChineseName;
	/**
	 * 数据模型英文名
	 */
	private String modelEnglishName;
	/**
	 * 数据模型是否显示
	 */
	private String showFlag;

	private String showFlagName;
	/**
	 * 数据模型显示格式
	 */
	private String showFormat;
	/**
	 * 数据模型是否为查询字段
	 */
	private String queryFlag;

	private String queryFlagName;
	/**
	 * 数据模型中文名
	 */
	private String pkFlag;
	/**
	 * 数据模型中文名
	 */
	private String fkFlag;
	/**
	 * 数据模型数据字典
	 */
	private String codeKey;

	private String codeKeyName;

	/**
	 * 数据模型名显示格式名称
	 */
	private String showFormatName;
	/**
	 * 数据模型显示顺序
	 */
	private String sortBy;

	private int columnWidth = 6144;

	public int getColumnWidth() {
		return columnWidth;
	}

	public void setColumnWidth(int columnWidth) {
		this.columnWidth = columnWidth;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDataModelId() {
		return dataModelId;
	}

	public void setDataModelId(String dataModelId) {
		this.dataModelId = dataModelId;
	}

	public String getModelChineseName() {
		return modelChineseName;
	}

	public void setModelChineseName(String modelChineseName) {
		this.modelChineseName = modelChineseName;
	}

	public String getModelEnglishName() {
		return modelEnglishName;
	}

	public void setModelEnglishName(String modelEnglishName) {
		this.modelEnglishName = modelEnglishName;
	}

	public String getShowFlag() {
		return showFlag;
	}

	public void setShowFlag(String showFlag) {
		this.showFlag = showFlag;
		this.setShowFlagName(SysCodeUtils.getSysCodeValue(SysCodeUtils.YES_NO, showFlag));
	}

	public String getShowFormat() {
		return showFormat;
	}

	public void setShowFormat(String showFormat) {
		this.showFormat = showFormat;
		this.setShowFormatName(SysCodeUtils.getSysCodeValue(SysCodeUtils.SHOW_FORMAT, showFormat));
	}

	public String getQueryFlag() {
		return queryFlag;
	}

	public void setQueryFlag(String queryFlag) {
		this.queryFlag = queryFlag;
		this.setQueryFlagName(SysCodeUtils.getSysCodeValue(SysCodeUtils.YES_NO, queryFlag));
	}

	public String getPkFlag() {
		return pkFlag;
	}

	public void setPkFlag(String pkFlag) {
		this.pkFlag = pkFlag;
	}

	public String getFkFlag() {
		return fkFlag;
	}

	public void setFkFlag(String fkFlag) {
		this.fkFlag = fkFlag;
	}

	public String getCodeKey() {
		return codeKey;
	}

	public void setCodeKey(String codeKey) {
		this.codeKey = codeKey;
		this.setCodeKeyName(SysCodeUtils.getSysCodeValue(SysCodeUtils.IS_CODE, codeKey));
	}

	public String getShowFormatName() {
		return showFormatName;
	}

	public void setShowFormatName(String showFormatName) {
		this.showFormatName = showFormatName;
	}

	public String getSortBy() {
		return sortBy;
	}

	public void setSortBy(String sortBy) {
		this.sortBy = sortBy;
	}

	public String getShowFlagName() {
		return showFlagName;
	}

	public void setShowFlagName(String showFlagName) {
		this.showFlagName = showFlagName;
	}

	public String getQueryFlagName() {
		return queryFlagName;
	}

	public void setQueryFlagName(String queryFlagName) {
		this.queryFlagName = queryFlagName;
	}

	public String getCodeKeyName() {
		return codeKeyName;
	}

	public void setCodeKeyName(String codeKeyName) {
		this.codeKeyName = codeKeyName;
	}

	@Override
	public int compareTo(DataModelDtl o) {
		return Integer.valueOf(this.getSortBy()).compareTo(Integer.valueOf(o.getSortBy()));
	}

	@Override
	public String toString() {
		return "ModelResultConfig [id=" + id + ", dataModelId=" + dataModelId + ", modelChineseName=" + modelChineseName + ", modelEnglishName="
				+ modelEnglishName + ", showFlag=" + showFlag + ", showFlagName=" + showFlagName + ", showFormat=" + showFormat + ", queryFlag=" + queryFlag
				+ ", queryFlagName=" + queryFlagName + ", pkFlag=" + pkFlag + ", fkFlag=" + fkFlag + ", codeKey=" + codeKey + ", codeKeyName=" + codeKeyName
				+ ", showFormatName=" + showFormatName + ", sortBy=" + sortBy + "]";
	}
}
