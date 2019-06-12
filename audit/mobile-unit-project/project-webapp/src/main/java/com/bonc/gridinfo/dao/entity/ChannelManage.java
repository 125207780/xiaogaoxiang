package com.bonc.gridinfo.dao.entity;

/**
 * 渠道管理实体类
 * 
 * @author yangdong@bonc.com.cn
 *
 */
public class ChannelManage {

	private String gridCode;
	private String gridName;
	private String marketType;
	private String channelType;
	private String chnlTypelevel1;
	private String chnlTypelevel2;
	private String channelCount;
	private String salePercent;
	private double percent;
	private int rowNum;

	public String getGridCode() {
		return gridCode;
	}

	public void setGridCode(String gridCode) {
		this.gridCode = gridCode;
	}

	public String getGridName() {
		return gridName;
	}

	public void setGridName(String gridName) {
		this.gridName = gridName;
	}

	public String getMarketType() {
		return marketType;
	}

	public void setMarketType(String marketType) {
		this.marketType = marketType;
	}

	public String getChannelType() {
		return channelType;
	}

	public void setChannelType(String channelType) {
		this.channelType = channelType;
	}

	public String getChnlTypelevel1() {
		return chnlTypelevel1;
	}

	public void setChnlTypelevel1(String chnlTypelevel1) {
		this.chnlTypelevel1 = chnlTypelevel1;
	}

	public String getChnlTypelevel2() {
		return chnlTypelevel2;
	}

	public void setChnlTypelevel2(String chnlTypelevel2) {
		this.chnlTypelevel2 = chnlTypelevel2;
	}

	public String getChannelCount() {
		return channelCount;
	}

	public void setChannelCount(String channelCount) {
		this.channelCount = channelCount;
	}

	public String getSalePercent() {
		return salePercent;
	}

	public void setSalePercent(String salePercent) {
		this.salePercent = salePercent;
	}

	public double getPercent() {
		return percent;
	}

	public void setPercent(double percent) {
		this.percent = percent;
	}

	public int getRowNum() {
		return rowNum;
	}

	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}

}
