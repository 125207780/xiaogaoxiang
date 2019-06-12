package com.bonc.kpi.dao.entity;

/**
 * 指标基本信息实体类
 * 
 * @author yangdong@bonc.com.cn
 *
 */
public class BaseKpi {

	private Integer id;
	private String kpiCode;
	private String typeLevel1;
	private String typeLevel2;
	private String typeLevel3;
	private String typeTree;
	private String kpiFrom;
	private String kpiColumn;
	private String kpiName;
	private String kpiUnit;
	private String granularity;
	private String statisCycle;
	private String storageCycle;
	private String busiInterface;
	private String techInterface;
	private String codeId;
	private String codeContent;
	private String interfaceMgr;
	private String busiMgr;
	private String developCompany;
	private String developer;
	private String operationsCompany;
	private String operationsStaff;
	private String produceDate;
	private String kpiStatus;
	private String onlineDate;
	private String offlineDate;
	private String modifyDate;
	private String kpiResultTable;
	private String kpiProcedure;
	private String procedurePath;
	private String BDIName;
	private String dateFrom;
	private String auditRuleCode;
	private String applicationType;
	private String remark;
	private String finishDate;
	private String isShow;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getKpiCode() {
		return kpiCode;
	}

	public void setKpiCode(String kpiCode) {
		this.kpiCode = kpiCode;
	}

	public String getTypeLevel1() {
		return typeLevel1;
	}

	public void setTypeLevel1(String typeLevel1) {
		this.typeLevel1 = typeLevel1;
	}

	public String getTypeLevel2() {
		return typeLevel2;
	}

	public void setTypeLevel2(String typeLevel2) {
		this.typeLevel2 = typeLevel2;
	}

	public String getTypeLevel3() {
		return typeLevel3;
	}

	public void setTypeLevel3(String typeLevel3) {
		this.typeLevel3 = typeLevel3;
	}

	public String getTypeTree() {
		return typeTree;
	}

	public void setTypeTree(String typeTree) {
		this.typeTree = typeTree;
	}

	public String getKpiFrom() {
		return kpiFrom;
	}

	public void setKpiFrom(String kpiFrom) {
		this.kpiFrom = kpiFrom;
	}

	public String getKpiColumn() {
		return kpiColumn;
	}

	public void setKpiColumn(String kpiColumn) {
		this.kpiColumn = kpiColumn;
	}

	public String getKpiName() {
		return kpiName;
	}

	public void setKpiName(String kpiName) {
		this.kpiName = kpiName;
	}

	public String getKpiUnit() {
		return kpiUnit;
	}

	public void setKpiUnit(String kpiUnit) {
		this.kpiUnit = kpiUnit;
	}

	public String getGranularity() {
		return granularity;
	}

	public void setGranularity(String granularity) {
		this.granularity = granularity;
	}

	public String getStatisCycle() {
		return statisCycle;
	}

	public void setStatisCycle(String statisCycle) {
		this.statisCycle = statisCycle;
	}

	public String getStorageCycle() {
		return storageCycle;
	}

	public void setStorageCycle(String storageCycle) {
		this.storageCycle = storageCycle;
	}

	public String getBusiInterface() {
		return busiInterface;
	}

	public void setBusiInterface(String busiInterface) {
		this.busiInterface = busiInterface;
	}

	public String getTechInterface() {
		return techInterface;
	}

	public void setTechInterface(String techInterface) {
		this.techInterface = techInterface;
	}

	public String getCodeId() {
		return codeId;
	}

	public void setCodeId(String codeId) {
		this.codeId = codeId;
	}

	public String getCodeContent() {
		return codeContent;
	}

	public void setCodeContent(String codeContent) {
		this.codeContent = codeContent;
	}

	public String getInterfaceMgr() {
		return interfaceMgr;
	}

	public void setInterfaceMgr(String interfaceMgr) {
		this.interfaceMgr = interfaceMgr;
	}

	public String getBusiMgr() {
		return busiMgr;
	}

	public void setBusiMgr(String busiMgr) {
		this.busiMgr = busiMgr;
	}

	public String getDevelopCompany() {
		return developCompany;
	}

	public void setDevelopCompany(String developCompany) {
		this.developCompany = developCompany;
	}

	public String getDeveloper() {
		return developer;
	}

	public void setDeveloper(String developer) {
		this.developer = developer;
	}

	public String getOperationsCompany() {
		return operationsCompany;
	}

	public void setOperationsCompany(String operationsCompany) {
		this.operationsCompany = operationsCompany;
	}

	public String getOperationsStaff() {
		return operationsStaff;
	}

	public void setOperationsStaff(String operationsStaff) {
		this.operationsStaff = operationsStaff;
	}

	public String getProduceDate() {
		return produceDate;
	}

	public void setProduceDate(String produceDate) {
		this.produceDate = produceDate;
	}

	public String getKpiStatus() {
		return kpiStatus;
	}

	public void setKpiStatus(String kpiStatus) {
		this.kpiStatus = kpiStatus;
	}

	public String getOnlineDate() {
		return onlineDate;
	}

	public void setOnlineDate(String onlineDate) {
		this.onlineDate = onlineDate;
	}

	public String getOfflineDate() {
		return offlineDate;
	}

	public void setOfflineDate(String offlineDate) {
		this.offlineDate = offlineDate;
	}

	public String getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(String modifyDate) {
		this.modifyDate = modifyDate;
	}

	public String getKpiResultTable() {
		return kpiResultTable;
	}

	public void setKpiResultTable(String kpiResultTable) {
		this.kpiResultTable = kpiResultTable;
	}

	public String getKpiProcedure() {
		return kpiProcedure;
	}

	public void setKpiProcedure(String kpiProcedure) {
		this.kpiProcedure = kpiProcedure;
	}

	public String getProcedurePath() {
		return procedurePath;
	}

	public void setProcedurePath(String procedurePath) {
		this.procedurePath = procedurePath;
	}

	public String getBDIName() {
		return BDIName;
	}

	public void setBDIName(String bDIName) {
		BDIName = bDIName;
	}

	public String getDateFrom() {
		return dateFrom;
	}

	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}

	public String getAuditRuleCode() {
		return auditRuleCode;
	}

	public void setAuditRuleCode(String auditRuleCode) {
		this.auditRuleCode = auditRuleCode;
	}

	public String getApplicationType() {
		return applicationType;
	}

	public void setApplicationType(String applicationType) {
		this.applicationType = applicationType;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getFinishDate() {
		return finishDate;
	}

	public void setFinishDate(String finishDate) {
		this.finishDate = finishDate;
	}

	public String getIsShow() {
		return isShow;
	}

	public void setIsShow(String isShow) {
		this.isShow = isShow;
	}

}
