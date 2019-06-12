package com.bonc.gridinfo.dao.entity;

/**
 * 竞争对手实体类
 * 
 * @author yangdong@bonc.com.cn
 *
 */

public class Competitor {
	private String gridCode;
	private String physicalGridCode;
	private String physicalGridType;
	private String physicalGridName;
	private int liveNum;
	private double mobileBroadbandPer;
	private double unicomBroadbandPer;
	private double telecomBroadbandPer;
	private int noBroadbandNum;
	private int mobileUser;
	private int unicomUser;
	private int telecomUser;
	private int mobileUserPer;
	private int unicomUserPer;
	private int telecomUserPer;
	private double collectionRate;
	private String listValue;
	private String listType;
	private int rowNum;

	public String getGridCode() {
		return gridCode;
	}

	public void setGridCode(String gridCode) {
		this.gridCode = gridCode;
	}

	public String getPhysicalGridName() {
		return physicalGridName;
	}

	public void setPhysicalGridName(String physicalGridName) {
		this.physicalGridName = physicalGridName;
	}

	public String getPhysicalGridType() {
		return physicalGridType;
	}

	public void setPhysicalGridType(String physicalGridType) {
		this.physicalGridType = physicalGridType;
	}

	public String getPhysicalGridCode() {
		return physicalGridCode;
	}

	public void setPhysicalGridCode(String physicalGridCode) {
		this.physicalGridCode = physicalGridCode;
	}

	public int getLiveNum() {
		return liveNum;
	}

	public void setLiveNum(int liveNum) {
		this.liveNum = liveNum;
	}

	public double getMobileBroadbandPer() {
		return mobileBroadbandPer;
	}

	public void setMobileBroadbandPer(double mobileBroadbandPer) {
		this.mobileBroadbandPer = mobileBroadbandPer;
	}

	public double getUnicomBroadbandPer() {
		return unicomBroadbandPer;
	}

	public void setUnicomBroadbandPer(double unicomBroadbandPer) {
		this.unicomBroadbandPer = unicomBroadbandPer;
	}

	public double getTelecomBroadbandPer() {
		return telecomBroadbandPer;
	}

	public void setTelecomBroadbandPer(double telecomBroadbandPer) {
		this.telecomBroadbandPer = telecomBroadbandPer;
	}

	public int getNoBroadbandNum() {
		return noBroadbandNum;
	}

	public void setNoBroadbandNum(int noBroadbandNum) {
		this.noBroadbandNum = noBroadbandNum;
	}

	public int getUnicomUser() {
		return unicomUser;
	}

	public void setUnicomUser(int unicomUser) {
		this.unicomUser = unicomUser;
	}

	public int getTelecomUser() {
		return telecomUser;
	}

	public void setTelecomUser(int telecomUser) {
		this.telecomUser = telecomUser;
	}

	public double getCollectionRate() {
		return collectionRate;
	}

	public void setCollectionRate(double collectionRate) {
		this.collectionRate = collectionRate;
	}

	public String getListValue() {
		return listValue;
	}

	public void setListValue(String listValue) {
		this.listValue = listValue;
	}

	public String getListType() {
		return listType;
	}

	public void setListType(String listType) {
		this.listType = listType;
	}

	public int getMobileUser() {
		return mobileUser;
	}

	public void setMobileUser(int mobileUser) {
		this.mobileUser = mobileUser;
	}

	public int getMobileUserPer() {
		return mobileUserPer;
	}

	public void setMobileUserPer(int mobileUserPer) {
		this.mobileUserPer = mobileUserPer;
	}

	public int getUnicomUserPer() {
		return unicomUserPer;
	}

	public void setUnicomUserPer(int unicomUserPer) {
		this.unicomUserPer = unicomUserPer;
	}

	public int getTelecomUserPer() {
		return telecomUserPer;
	}

	public void setTelecomUserPer(int telecomUserPer) {
		this.telecomUserPer = telecomUserPer;
	}

	public int getRowNum() {
		return rowNum;
	}

	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}

}
