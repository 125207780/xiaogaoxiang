package com.bonc.gridinfo.dao.entity;

/**
 * 楼宇实体类
 * 
 * @author yangdong@bonc.com.cn
 *
 */

public class BuildingInfo {

	private String buildingCode;
	private String buildingName;
	private String gridCode;
	private String buildingNumber;
	private String houseNum;
	private String liveNum;
	private String tenantNum;
	private String address;
	private int rowNum;

	public String getBuildingCode() {
		return buildingCode;
	}

	public void setBuildingCode(String buildingCode) {
		this.buildingCode = buildingCode;
	}

	public String getBuildingName() {
		return buildingName;
	}

	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}

	public String getGridCode() {
		return gridCode;
	}

	public void setGridCode(String gridCode) {
		this.gridCode = gridCode;
	}

	public String getBuildingNumber() {
		return buildingNumber;
	}

	public void setBuildingNumber(String buildingNumber) {
		this.buildingNumber = buildingNumber;
	}

	public String getHouseNum() {
		return houseNum;
	}

	public void setHouseNum(String houseNum) {
		this.houseNum = houseNum;
	}

	public String getLiveNum() {
		return liveNum;
	}

	public void setLiveNum(String liveNum) {
		this.liveNum = liveNum;
	}

	public String getTenantNum() {
		return tenantNum;
	}

	public void setTenantNum(String tenantNum) {
		this.tenantNum = tenantNum;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public int getRowNum() {
		return rowNum;
	}

	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}

}
