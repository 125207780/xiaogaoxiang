package com.bonc.gisuitl;

public class Point {
  private double lng ;
  private double lat ;
  private int pointID;
  public int getPointID() {
	return pointID;
}
public void setPointID(int pointID) {
	this.pointID = pointID;
}
public Point(double lng ,double lat){
	  this.lng=lng ;
	  this.lat=lat;
  }
public double getLng() {
	return lng;
}
public void setLng(double lng) {
	this.lng = lng;
}
public double getLat() {
	return lat;
}
public void setLat(double lat) {
	this.lat = lat;
}
}
