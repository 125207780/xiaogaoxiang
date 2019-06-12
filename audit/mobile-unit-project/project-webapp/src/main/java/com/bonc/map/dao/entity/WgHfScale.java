package com.bonc.map.dao.entity;

import java.math.BigDecimal;

/**
 * 网格数据规模实体类
 * 
 * @author yangdong@bonc.com.cn
 *
 */
public class WgHfScale {

	private String cityId;
	private String cityName;
	private String areaId;
	private String areaName;
	private String gridCode;
	private String gridName;
	private String chnlCode;
	private String chnlName;
	private BigDecimal income;
	private double customer;
	private double cellNum;
	private double groupNum;
	private double chnlNum;
	private double stationNum;
	private String pubOrgId;
	private String pubOrgName;
	private String pubData;

	public String getPubData() {
		return pubData;
	}

	public void setPubData(String pubData) {
		this.pubData = pubData;
	}

	public String getCityId() {
		return cityId;
	}

	public void setCityId(String cityId) {
		this.cityId = cityId;
	}

	public String getAreaId() {
		return areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}

	public String getGridCode() {
		return gridCode;
	}

	public void setGridCode(String gridCode) {
		this.gridCode = gridCode;
	}

	public BigDecimal getIncome() {
		return income;
	}

	public void setIncome(BigDecimal income) {
		this.income = income;
	}

	public double getCustomer() {
		return customer;
	}

	public void setCustomer(double customer) {
		this.customer = customer;
	}

	public double getCellNum() {
		return cellNum;
	}

	public void setCellNum(double cellNum) {
		this.cellNum = cellNum;
	}

	public double getGroupNum() {
		return groupNum;
	}

	public void setGroupNum(double groupNum) {
		this.groupNum = groupNum;
	}

	public double getChnlNum() {
		return chnlNum;
	}

	public void setChnlNum(double chnlNum) {
		this.chnlNum = chnlNum;
	}

	public double getStationNum() {
		return stationNum;
	}

	public void setStationNum(double stationNum) {
		this.stationNum = stationNum;
	}

	public String getPubOrgId() {
		return pubOrgId;
	}

	public void setPubOrgId(String pubOrgId) {
		this.pubOrgId = pubOrgId;
	}

	public String getPubOrgName() {
		return pubOrgName;
	}

	public void setPubOrgName(String pubOrgName) {
		this.pubOrgName = pubOrgName;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public String getGridName() {
		return gridName;
	}

	public void setGridName(String gridName) {
		this.gridName = gridName;
	}

	public String getChnlCode() {
		return chnlCode;
	}

	public void setChnlCode(String chnlCode) {
		this.chnlCode = chnlCode;
	}

	public String getChnlName() {
		return chnlName;
	}

	public void setChnlName(String chnlName) {
		this.chnlName = chnlName;
	}

}
