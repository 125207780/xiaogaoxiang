package com.bonc.gridinfo.dao.entity;

import java.math.BigDecimal;

/**
 * 基站实体类
 * 
 * @author liulin@bonc.com.cn
 *
 */
public class StationInfo {
	private String areaName;
	private String orgId;
	private String stationCode;
	private String stationName;
	private String stationType;
	private BigDecimal stationLon;
	private BigDecimal stationLat;
	private String gridCode;
	private String lacId;
	private String cellId;
	private String cityId;
	private String cityName;
	private String btsAttr;
	private String isOnnet;

	// 增加一个网格名称
	private String gridName;
	// 经度
	private Double lng;
	// 维度
	private Double lat;
	// 最大经度
	private Double maxLng;
	// 最小经度
	private Double minLng;
	// 最大纬度
	private Double maxLat;
	// 最小纬度
	private Double minLat;
	// 中心经度
	private Double cpLng;
	// 中心纬度
	private Double cpLat;
	// 颜色
	private String color;
	// shape
	private String shape;

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getStationCode() {
		return stationCode;
	}

	public void setStationCode(String stationCode) {
		this.stationCode = stationCode;
	}

	public String getStationName() {
		return stationName;
	}

	public void setStationName(String stationName) {
		this.stationName = stationName;
	}

	public String getStationType() {
		return stationType;
	}

	public void setStationType(String stationType) {
		this.stationType = stationType;
	}

	public BigDecimal getStationLon() {
		return stationLon;
	}

	public void setStationLon(BigDecimal stationLon) {
		this.stationLon = stationLon;
	}

	public BigDecimal getStationLat() {
		return stationLat;
	}

	public void setStationLat(BigDecimal stationLat) {
		this.stationLat = stationLat;
	}

	public String getGridCode() {
		return gridCode;
	}

	public void setGridCode(String gridCode) {
		this.gridCode = gridCode;
	}

	public String getLacId() {
		return lacId;
	}

	public void setLacId(String lacId) {
		this.lacId = lacId;
	}

	public String getCellId() {
		return cellId;
	}

	public void setCellId(String cellId) {
		this.cellId = cellId;
	}

	public String getCityId() {
		return cityId;
	}

	public void setCityId(String cityId) {
		this.cityId = cityId;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getBtsAttr() {
		return btsAttr;
	}

	public void setBtsAttr(String btsAttr) {
		this.btsAttr = btsAttr;
	}

	public String getIsOnnet() {
		return isOnnet;
	}

	public void setIsOnnet(String isOnnet) {
		this.isOnnet = isOnnet;
	}

	public String getGridName() {
		return gridName;
	}

	public void setGridName(String gridName) {
		this.gridName = gridName;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getMaxLng() {
		return maxLng;
	}

	public void setMaxLng(Double maxLng) {
		this.maxLng = maxLng;
	}

	public Double getMinLng() {
		return minLng;
	}

	public void setMinLng(Double minLng) {
		this.minLng = minLng;
	}

	public Double getMaxLat() {
		return maxLat;
	}

	public void setMaxLat(Double maxLat) {
		this.maxLat = maxLat;
	}

	public Double getMinLat() {
		return minLat;
	}

	public void setMinLat(Double minLat) {
		this.minLat = minLat;
	}

	public Double getCpLng() {
		return cpLng;
	}

	public void setCpLng(Double cpLng) {
		this.cpLng = cpLng;
	}

	public Double getCpLat() {
		return cpLat;
	}

	public void setCpLat(Double cpLat) {
		this.cpLat = cpLat;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getShape() {
		return shape;
	}

	public void setShape(String shape) {
		this.shape = shape;
	}

}
