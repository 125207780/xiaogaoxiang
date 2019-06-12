package com.bonc.gridinfo.dao.entity;

/**
 * 基站实体类
 * 
 * @author yangdong@bonc.com.cn
 *
 */
public class BaseStation {

	private String gridCode;
	private String physicalGridCode;
	private String physicalGridName;
	private String stationType;
	private int stationNum;
	private int stationNum2G;
	private int stationNum3G;
	private int stationNum4G;
	private double stationPer2G;
	private double stationPer3G;
	private double stationPer4G;
	private int czMobileUser;
	private int czCallUser;
	private double num;
	private double per2G;
	private double per3G;
	private double per4G;
	private int rowNum;

	public String getGridCode() {
		return gridCode;
	}

	public void setGridCode(String gridCode) {
		this.gridCode = gridCode;
	}

	public String getPhysicalGridCode() {
		return physicalGridCode;
	}

	public void setPhysicalGridCode(String physicalGridCode) {
		this.physicalGridCode = physicalGridCode;
	}

	public String getPhysicalGridName() {
		return physicalGridName;
	}

	public void setPhysicalGridName(String physicalGridName) {
		this.physicalGridName = physicalGridName;
	}

	public String getStationType() {
		return stationType;
	}

	public void setStationType(String stationType) {
		this.stationType = stationType;
	}

	public int getStationNum() {
		return stationNum;
	}

	public void setStationNum(int stationNum) {
		this.stationNum = stationNum;
	}

	public int getStationNum2G() {
		return stationNum2G;
	}

	public void setStationNum2G(int stationNum2G) {
		this.stationNum2G = stationNum2G;
	}

	public int getStationNum3G() {
		return stationNum3G;
	}

	public void setStationNum3G(int stationNum3G) {
		this.stationNum3G = stationNum3G;
	}

	public int getStationNum4G() {
		return stationNum4G;
	}

	public void setStationNum4G(int stationNum4G) {
		this.stationNum4G = stationNum4G;
	}

	public double getStationPer2G() {
		return stationPer2G;
	}

	public void setStationPer2G(double stationPer2G) {
		this.stationPer2G = stationPer2G;
	}

	public double getStationPer3G() {
		return stationPer3G;
	}

	public void setStationPer3G(double stationPer3G) {
		this.stationPer3G = stationPer3G;
	}

	public double getStationPer4G() {
		return stationPer4G;
	}

	public void setStationPer4G(double stationPer4G) {
		this.stationPer4G = stationPer4G;
	}

	public int getCzMobileUser() {
		return czMobileUser;
	}

	public void setCzMobileUser(int czMobileUser) {
		this.czMobileUser = czMobileUser;
	}

	public int getCzCallUser() {
		return czCallUser;
	}

	public void setCzCallUser(int czCallUser) {
		this.czCallUser = czCallUser;
	}

	public double getNum() {
		return num;
	}

	public void setNum(double num) {
		this.num = num;
	}

	public double getPer2G() {
		return per2G;
	}

	public void setPer2G(double per2g) {
		per2G = per2g;
	}

	public double getPer3G() {
		return per3G;
	}

	public void setPer3G(double per3g) {
		per3G = per3g;
	}

	public double getPer4G() {
		return per4G;
	}

	public void setPer4G(double per4g) {
		per4G = per4g;
	}

	public int getRowNum() {
		return rowNum;
	}

	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}

}
