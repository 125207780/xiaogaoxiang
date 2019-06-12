package com.bonc.common.utils;

/**
 * 
 * @FileName PoiDistanceUtil.java
 * @Author xiaogaoxiang
 * @At 2018年11月19日 下午7:00:54
 * @Desc 根据经纬度计算两点之间的最短距离
 */
public class PoiDistanceUtil {

	// km 地球半径 平均值，千米
	static final double EARTH_RADIUS = 6371.0;

	// π
	private static final double PI = 3.14159265;

	public static void main(String[] args) {
		Double lat1 = 34.264648; // 纬度
		Double lon1 = 108.952736; // 经度
		int radius = 100; // 半径

		// [34.25566276027792,108.94186385411045,34.27363323972208,108.96360814588955]
		double around[] = getAround(lat1, lon1, radius);
		for (int i = 0; i < around.length; i++) {
			System.out.println(around[i]);
		}
	}

	public static double HaverSin(double theta) {
		double v = Math.sin(theta / 2);
		return v * v;
	}

	/**
	 * 计算两点之间的距离
	 * 
	 * @Title Distance
	 * @Author xiaogaoxiang
	 * @param lat1
	 * @param lon1
	 * @param lat2
	 * @param lon2
	 * @return double
	 */
	public static double Distance(double lat1, double lon1, double lat2, double lon2) {
		// 用haversine公式计算球面两点间的距离。经纬度转换成弧度
		lat1 = ConvertDegreesToRadians(lat1);
		lon1 = ConvertDegreesToRadians(lon1);
		lat2 = ConvertDegreesToRadians(lat2);
		lon2 = ConvertDegreesToRadians(lon2);

		// 差值
		double vLon = Math.abs(lon1 - lon2);
		double vLat = Math.abs(lat1 - lat2);

		// circle就是一个球体上的切面，它的圆心即是球心的一个周长最大的圆。
		double h = HaverSin(vLat) + Math.cos(lat1) * Math.cos(lat2) * HaverSin(vLon);
		// 返回的事千米，这里转换成米
		double distance = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(h)) * 1000;
		return distance;
	}

	public static double ConvertDegreesToRadians(double degrees) {
		return degrees * Math.PI / 180;
	}

	public static double ConvertRadiansToDegrees(double radian) {
		return radian * 180.0 / Math.PI;
	}

	/**
	 * 根据提供的经度和纬度、以及半径，取得此半径内的最大最小经纬度
	 * 
	 * @Title GetAround
	 * @Author xiaogaoxiang
	 * @param lat
	 *            纬度
	 * @param lon
	 *            经度
	 * @param raidus
	 *            半径(米)
	 * @return double[]
	 */
	public static double[] getAround(double lat, double lon, int raidus) {

		Double latitude = lat;
		Double longitude = lon;

		Double degree = (24901 * 1609) / 360.0;
		double raidusMile = raidus;

		Double dpmLat = 1 / degree;
		Double radiusLat = dpmLat * raidusMile;
		Double minLat = latitude - radiusLat;
		Double maxLat = latitude + radiusLat;

		Double mpdLng = degree * Math.cos(latitude * (PI / 180));
		Double dpmLng = 1 / mpdLng;
		Double radiusLng = dpmLng * raidusMile;
		Double minLng = longitude - radiusLng;
		Double maxLng = longitude + radiusLng;
		return new double[] { minLat, minLng, maxLat, maxLng };
	}

}
