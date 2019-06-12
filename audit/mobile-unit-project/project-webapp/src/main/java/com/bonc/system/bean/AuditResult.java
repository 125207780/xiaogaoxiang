package com.bonc.system.bean;

import java.io.Serializable;
import java.text.ParseException;

import com.bonc.common.annotation.ColumnMeta;
import com.bonc.common.annotation.Excel;
import com.bonc.common.annotation.Grid;
import com.bonc.common.utils.FormatUtils;
import com.bonc.common.utils.SysCodeUtils;
import com.bonc.system.dao.entity.SysCode;

public class AuditResult implements Serializable {
	private static final long serialVersionUID = 1L;
	@Grid(colName = "省份", isCodeKey = true)
	@ColumnMeta(description = "省份", columnName = "prov")
	@Excel(exportName = "省份", exportConvertSign = true)
	private String prov;
	@Grid(colName = "ID", hidden = true)
	@ColumnMeta(description = "ID", columnName = "ID")
	private String id;
	@Grid(colName = "审计单位")
	@ColumnMeta(description = "审计单位", columnName = "AUDIT_UNIT")
	@Excel(exportName = "审计单位")
	private String auditUnit;
	@Grid(colName = "审计周期", dateFormat = "yyyy/MM")
	@ColumnMeta(description = "审计周期", columnName = "AUDIT_PERIOD")
	@Excel(exportName = "审计周期", dateFormat = "yyyy-MM")
	private String auditPeriod;
	@Grid(colName = "账单编号", hidden = true)
	@ColumnMeta(description = "账单编号", columnName = "BILL_NO")
	private String billNo;
	@Grid(colName = "问题")
	@ColumnMeta(description = "问题", columnName = "NOTE")
	@Excel(exportName = "问题")
	private String note;
	@Grid(colName = "备注", hidden = true)
	@ColumnMeta(description = "备注", columnName = "REMARK")
	private String remark;
	@Grid(colName = "插入时间", hidden = true)
	@ColumnMeta(description = "插入时间", columnName = "INSERT_TIME")
	private String insertTime;

	public String getProv() {
		return prov;
	}

	public void setProv(String prov) {
		this.prov = prov;
	}

	// 字典项的字段配field+toValue方法
	public String provtoValue() {
		SysCode sc = new SysCode();
		sc.setCodeKey(this.prov);
		sc.setCodeType("province_code");
		return SysCodeUtils.Code2Value(sc);
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAuditUnit() {
		return auditUnit;
	}

	public void setAuditUnit(String auditUnit) {
		this.auditUnit = auditUnit;
	}

	public String getAuditPeriod() {
		return auditPeriod;
	}

	public void setAuditPeriod(String auditPeriod) {
		this.auditPeriod = auditPeriod;
	}

	// 日期项的字段配field+toDate方法
	// 金额项的字段配field+toFee方法
	public String auditPeriodtoDate(String dateFormat) throws ParseException {
		return FormatUtils.dateFormat(this.auditPeriod, dateFormat);
	}

	public String getBillNo() {
		return billNo;
	}

	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getInsertTime() {
		return insertTime;
	}

	public void setInsertTime(String insertTime) {
		this.insertTime = insertTime;
	}
}
