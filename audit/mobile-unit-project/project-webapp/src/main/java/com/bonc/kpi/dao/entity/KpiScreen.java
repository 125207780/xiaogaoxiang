package com.bonc.kpi.dao.entity;

import java.util.List;

/**
 * 指标筛选实体类
 * 
 * @author yangdong@bonc.com.cn
 *
 */
public class KpiScreen {

	private String screenCode;
	private String screenName;
	private String kpiTypeColumn;
	private String screenValue;
	private String pid;
	private String screenLevel;
	private List<KpiScreen> children;
	private List<KpiScreen> parent;

	public String getScreenLevel() {
		return screenLevel;
	}

	public void setScreenLevel(String screenLevel) {
		this.screenLevel = screenLevel;
	}

	public List<KpiScreen> getChildren() {
		return children;
	}

	public void setChildren(List<KpiScreen> children) {
		this.children = children;
	}

	public List<KpiScreen> getParent() {
		return parent;
	}

	public void setParent(List<KpiScreen> parent) {
		this.parent = parent;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getScreenCode() {
		return screenCode;
	}

	public void setScreenCode(String screenCode) {
		this.screenCode = screenCode;
	}

	public String getScreenName() {
		return screenName;
	}

	public void setScreenName(String screenName) {
		this.screenName = screenName;
	}

	public String getKpiTypeColumn() {
		return kpiTypeColumn;
	}

	public void setKpiTypeColumn(String kpiTypeColumn) {
		this.kpiTypeColumn = kpiTypeColumn;
	}

	public String getScreenValue() {
		return screenValue;
	}

	public void setScreenValue(String screenValue) {
		this.screenValue = screenValue;
	}

}
