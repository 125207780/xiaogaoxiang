package com.bonc.map.service;

import java.io.FileWriter;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.common.annotation.ArchivesLog;
import com.bonc.common.utils.HttpClientUtils;
import com.bonc.common.utils.PoiDistanceUtil;
import com.bonc.common.utils.SysUserTreeMenuUtil;
import com.bonc.gridinfo.dao.entity.StationInfo;
import com.bonc.map.dao.entity.MapInfo;
import com.bonc.map.dao.entity.MapPoi;
import com.bonc.map.dao.mapper.GridCommonMapper;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysOrgService;
import com.bonc.system.service.SysUserService;

@Service
@Transactional(rollbackFor = Exception.class)
public class GridCommonService {

	@Resource
	private GridCommonMapper gridCommonMapper;

	@Resource
	private SysUserService sysUserService;

	@Resource
	private SysOrgService sysOrgService;
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectList，作用：通过父级查找子级地市信息】")
	public List<SysOrg> selectList(SysOrg po) {
		return gridCommonMapper.selectList(po);
	}

	public GridCommonMapper getMapper() {
		return gridCommonMapper;
	}
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectSysOrgPolygon，作用：获得网格轮廓信息】")
	public List<MapInfo> selectSysOrgPolygon(String orgId) {
		return gridCommonMapper.selectSysOrgPolygon(orgId);
	}

	/**
	 * 初始化查询所有渠道信息（本地数据库查询）
	 * 
	 * @Title selectAllChannelByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param rangeInfo
	 * @param orgId
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllChannelByOrgId(SysUser user, String setRange, String uId, String poiInfo, String rangeInfo, String orgId) {

		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);
		// 显示部分
		if ("PART".equals(rangeInfo)) {
			boolean flag = false;
			// 初始化保存所有在范围内的基站集合
			List<MapPoi> rangeMapPoiList = new ArrayList<>();
			// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
			if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
				// 查询MapPoi信息
				List<MapPoi> mapPoiList = gridCommonMapper.selectAllChannelByOrgId(orgIds);
				if (null != mapPoiList && mapPoiList.size() > 0) {
					// 根据uId查询地图信息
					MapPoi mapPoi = this.selectPoiByUid(uId);
					if (null != mapPoi) {
						// 获取显示的范围
						int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
						// 查询出所有在范围设置内的基站点
						for (MapPoi mp : mapPoiList) {
							if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
								rangeMapPoiList.add(mp);
							}
						}
						flag = true;
					}
				}
			}
			if (flag)
				return rangeMapPoiList;
			else
				return null;
		}
		// 显示全部
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 查询MapPoi信息
				return gridCommonMapper.selectAllChannelByOrgId(orgIds);
			} else {
				return null;
			}
		}
	}

	/**
	 * 初始化查询所有基站信息（本地数据库查询）
	 * 
	 * @Title selectAllStationByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param rangeInfo
	 * @param orgId
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllStationByOrgId(SysUser user, String setRange, String uId, String poiInfo, String rangeInfo, String orgId) {

		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		// 显示部分
		if ("PART".equals(rangeInfo)) {
			boolean flag = false;
			// 初始化保存所有在范围内的基站集合
			List<MapPoi> rangeMapPoiList = new ArrayList<>();
			// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
			if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
				// 查询MapPoi信息
				List<MapPoi> mapPoiList = gridCommonMapper.selectAllStationByOrgId(orgIds);
				if (null != mapPoiList && mapPoiList.size() > 0) {
					// 根据uId查询地图信息
					MapPoi mapPoi = this.selectPoiByUid(uId);
					if (null != mapPoi) {
						// 获取显示的范围
						int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
						// 查询出所有在范围设置内的基站点
						for (MapPoi mp : mapPoiList) {
							if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
								rangeMapPoiList.add(mp);
							}
						}
						flag = true;
					}
				}
			}
			if (flag)
				return rangeMapPoiList;
			else
				return null;
		}
		// 显示全部
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 查询MapPoi信息
				return gridCommonMapper.selectAllStationByOrgId(orgIds);
			} else {
				return null;
			}
		}
	}

	/**
	 * 初始化查询所有超市，商铺信息（本地数据库查询）
	 * 
	 * @Title selectAllMallByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllMallByOrgId(SysUser user, String setRange, String uId, String poiInfo, String orgId) {

		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		boolean flag = false;
		// 初始化保存所有在范围内的基站集合
		List<MapPoi> rangeMapPoiList = new ArrayList<>();
		// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
		if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
			// 查询MapPoi信息
			List<MapPoi> mapPoiList = gridCommonMapper.selectAllMallByOrgId(orgIds);
			if (null != mapPoiList && mapPoiList.size() > 0) {
				// 根据uId查询地图信息
				MapPoi mapPoi = this.selectPoiByUid(uId);
				if (null != mapPoi) {
					// 获取显示的范围
					int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
					// 查询出所有在范围设置内的基站点
					for (MapPoi mp : mapPoiList) {
						if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
							rangeMapPoiList.add(mp);
						}
					}
					flag = true;
				}
			}
		}
		if (flag)
			return rangeMapPoiList;
		else
			return null;
	}

	/**
	 * 初始化查询所有校园信息（本地数据库查询）
	 * 
	 * @Title selectAllNewSchoolByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllNewSchoolByOrgId(SysUser user, String setRange, String uId, String poiInfo, String orgId) {

		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		boolean flag = false;
		// 初始化保存所有在范围内的基站集合
		List<MapPoi> rangeMapPoiList = new ArrayList<>();
		// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
		if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
			// 查询MapPoi信息
			List<MapPoi> mapPoiList = gridCommonMapper.selectAllNewSchoolByOrgId(orgIds);
			if (null != mapPoiList && mapPoiList.size() > 0) {
				// 根据uId查询地图信息
				MapPoi mapPoi = this.selectPoiByUid(uId);
				if (null != mapPoi) {
					// 获取显示的范围
					int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
					// 查询出所有在范围设置内的基站点
					for (MapPoi mp : mapPoiList) {
						if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
							rangeMapPoiList.add(mp);
						}
					}
					flag = true;
				}
			}
		}
		if (flag)
			return rangeMapPoiList;
		else
			return null;
	}

	/**
	 * 初始化查询所有村庄信息（本地数据库查询）
	 * 
	 * @Title selectAllVillageByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllVillageByOrgId(SysUser user, String setRange, String uId, String poiInfo, String orgId) {

		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		boolean flag = false;
		// 初始化保存所有在范围内的基站集合
		List<MapPoi> rangeMapPoiList = new ArrayList<>();
		// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
		if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
			// 查询MapPoi信息
			List<MapPoi> mapPoiList = gridCommonMapper.selectAllVillageByOrgId(orgIds);
			if (null != mapPoiList && mapPoiList.size() > 0) {
				// 根据uId查询地图信息
				MapPoi mapPoi = this.selectPoiByUid(uId);
				if (null != mapPoi) {
					// 获取显示的范围
					int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
					// 查询出所有在范围设置内的基站点
					for (MapPoi mp : mapPoiList) {
						if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
							rangeMapPoiList.add(mp);
						}
					}
					flag = true;
				}
			}
		}
		if (flag)
			return rangeMapPoiList;
		else
			return null;
	}

	/**
	 * 初始化查询所有乡镇信息（本地数据库查询）
	 * 
	 * @Title selectAllTownByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllTownByOrgId(SysUser user, String setRange, String uId, String poiInfo, String orgId) {

		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		boolean flag = false;
		// 初始化保存所有在范围内的基站集合
		List<MapPoi> rangeMapPoiList = new ArrayList<>();
		// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
		if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
			// 查询MapPoi信息
			List<MapPoi> mapPoiList = gridCommonMapper.selectAllTownByOrgId(orgIds);
			if (null != mapPoiList && mapPoiList.size() > 0) {
				// 根据uId查询地图信息
				MapPoi mapPoi = this.selectPoiByUid(uId);
				if (null != mapPoi) {
					// 获取显示的范围
					int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
					// 查询出所有在范围设置内的基站点
					for (MapPoi mp : mapPoiList) {
						if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
							rangeMapPoiList.add(mp);
						}
					}
					flag = true;
				}
			}
		}
		if (flag)
			return rangeMapPoiList;
		else
			return null;
	}

	/**
	 * 初始化查询所有聚类市场信息（本地数据库查询）
	 * 
	 * @Title selectAllMarketByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllMarketByOrgId(SysUser user, String setRange, String uId, String poiInfo, String orgId) {

		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		boolean flag = false;
		// 初始化保存所有在范围内的基站集合
		List<MapPoi> rangeMapPoiList = new ArrayList<>();
		// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
		if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
			// 查询MapPoi信息
			List<MapPoi> mapPoiList = gridCommonMapper.selectAllMarketByOrgId(orgIds);
			if (null != mapPoiList && mapPoiList.size() > 0) {
				// 根据uId查询地图信息
				MapPoi mapPoi = this.selectPoiByUid(uId);
				if (null != mapPoi) {
					// 获取显示的范围
					int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
					// 查询出所有在范围设置内的基站点
					for (MapPoi mp : mapPoiList) {
						if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
							rangeMapPoiList.add(mp);
						}
					}
					flag = true;
				}
			}
		}
		if (flag)
			return rangeMapPoiList;
		else
			return null;
	}

	/**
	 * 初始化查询所有AB集团
	 * 
	 * @Title selectAllAbGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllAbGroupByOrgId(SysUser user, String setRange, String uId, String poiInfo, String orgId) {

		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		boolean flag = false;
		// 初始化保存所有在范围内的基站集合
		List<MapPoi> rangeMapPoiList = new ArrayList<>();
		// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
		if (null != uId && !"".equals(uId)) {
			// 查询MapPoi信息
			List<MapPoi> mapPoiList = gridCommonMapper.selectAllAbGroupByOrgId(orgIds);
			if (null != mapPoiList && mapPoiList.size() > 0) {
				// 根据uId查询地图信息
				MapPoi mapPoi = this.selectPoiByUid(uId);
				if (null != mapPoi) {
					// 获取显示的范围
					int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
					// 查询出所有在范围设置内的基站点
					for (MapPoi mp : mapPoiList) {
						if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
							rangeMapPoiList.add(mp);
						}
					}
					flag = true;
				}
			}
		}
		if (flag)
			return rangeMapPoiList;
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 查询MapPoi信息
				return gridCommonMapper.selectAllAbGroupByOrgId(orgIds);
			} else {
				return null;
			}
		}
	}

	/**
	 * 初始化查询所有CD集团
	 * 
	 * @Title selectAllCdGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllCdGroupByOrgId(SysUser user, String setRange, String uId, String poiInfo, String orgId) {
		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		boolean flag = false;
		// 初始化保存所有在范围内的基站集合
		List<MapPoi> rangeMapPoiList = new ArrayList<>();
		// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
		if (null != uId && !"".equals(uId)) {
			// 查询MapPoi信息
			List<MapPoi> mapPoiList = gridCommonMapper.selectAllCdGroupByOrgId(orgIds);
			if (null != mapPoiList && mapPoiList.size() > 0) {
				// 根据uId查询地图信息
				MapPoi mapPoi = this.selectPoiByUid(uId);
				if (null != mapPoi) {
					// 获取显示的范围
					int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
					// 查询出所有在范围设置内的基站点
					for (MapPoi mp : mapPoiList) {
						if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
							rangeMapPoiList.add(mp);
						}
					}
					flag = true;
				}
			}
		}
		if (flag)
			return rangeMapPoiList;
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 查询MapPoi信息
				return gridCommonMapper.selectAllCdGroupByOrgId(orgIds);
			} else {
				return null;
			}
		}
	}

	/**
	 * 初始化查询所有入格小区
	 * 
	 * @Title selectAllCommunityInfoByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllCommunityInfoByOrgId(SysUser user, String setRange, String uId, String poiInfo, String orgId) {
		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		boolean flag = false;
		// 初始化保存所有在范围内的基站集合
		List<MapPoi> rangeMapPoiList = new ArrayList<>();
		// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
		if (null != uId && !"".equals(uId)) {
			// 查询MapPoi信息
			List<MapPoi> mapPoiList = gridCommonMapper.selectAllCommunityInfoByOrgId(orgIds);
			if (null != mapPoiList && mapPoiList.size() > 0) {
				// 根据uId查询地图信息
				MapPoi mapPoi = this.selectPoiByUid(uId);
				if (null != mapPoi) {
					// 获取显示的范围
					int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
					// 查询出所有在范围设置内的基站点
					for (MapPoi mp : mapPoiList) {
						if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
							rangeMapPoiList.add(mp);
						}
					}
					flag = true;
				}
			}
		}
		if (flag)
			return rangeMapPoiList;
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 查询MapPoi信息
				return gridCommonMapper.selectAllCommunityInfoByOrgId(orgIds);
			} else {
				return null;
			}
		}
	}

	/**
	 * 初始化查询所有未入格小区
	 * 
	 * @Title selectAllNonCommunityInfoByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllNonCommunityInfoByOrgId(SysUser user, String setRange, String uId, String poiInfo, String orgId) {
		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		boolean flag = false;
		// 初始化保存所有在范围内的基站集合
		List<MapPoi> rangeMapPoiList = new ArrayList<>();
		// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
		if (null != uId && !"".equals(uId)) {
			// 查询MapPoi信息
			List<MapPoi> mapPoiList = gridCommonMapper.selectAllNonCommunityInfoByOrgId(orgIds);
			if (null != mapPoiList && mapPoiList.size() > 0) {
				// 根据uId查询地图信息
				MapPoi mapPoi = this.selectPoiByUid(uId);
				if (null != mapPoi) {
					// 获取显示的范围
					int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
					// 查询出所有在范围设置内的基站点
					for (MapPoi mp : mapPoiList) {
						if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
							rangeMapPoiList.add(mp);
						}
					}
					flag = true;
				}
			}
		}
		if (flag)
			return rangeMapPoiList;
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 查询MapPoi信息
				return gridCommonMapper.selectAllNonCommunityInfoByOrgId(orgIds);
			} else {
				return null;
			}
		}
	}

	/**
	 * 初始化查询所有未入格AB集团
	 * 
	 * @Title selectAllNonAbGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllNonAbGroupByOrgId(SysUser user, String setRange, String uId, String poiInfo, String orgId) {
		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		boolean flag = false;
		// 初始化保存所有在范围内的基站集合
		List<MapPoi> rangeMapPoiList = new ArrayList<>();
		// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
		if (null != uId && !"".equals(uId)) {
			// 查询MapPoi信息
			List<MapPoi> mapPoiList = gridCommonMapper.selectAllNonAbGroupByOrgId(orgIds);
			if (null != mapPoiList && mapPoiList.size() > 0) {
				// 根据uId查询地图信息
				MapPoi mapPoi = this.selectPoiByUid(uId);
				if (null != mapPoi) {
					// 获取显示的范围
					int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
					// 查询出所有在范围设置内的基站点
					for (MapPoi mp : mapPoiList) {
						if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
							rangeMapPoiList.add(mp);
						}
					}
					flag = true;
				}
			}
		}
		if (flag)
			return rangeMapPoiList;
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 查询MapPoi信息
				return gridCommonMapper.selectAllNonAbGroupByOrgId(orgIds);
			} else {
				return null;
			}
		}
	}

	/**
	 * 初始化查询所有未入格CD集团
	 * 
	 * @Title selectAllNonCdGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllNonCdGroupByOrgId(SysUser user, String setRange, String uId, String poiInfo, String orgId) {
		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		boolean flag = false;
		// 初始化保存所有在范围内的基站集合
		List<MapPoi> rangeMapPoiList = new ArrayList<>();
		// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
		if (null != uId && !"".equals(uId)) {
			// 查询MapPoi信息
			List<MapPoi> mapPoiList = gridCommonMapper.selectAllNonCdGroupByOrgId(orgIds);
			if (null != mapPoiList && mapPoiList.size() > 0) {
				// 根据uId查询地图信息
				MapPoi mapPoi = this.selectPoiByUid(uId);
				if (null != mapPoi) {
					// 获取显示的范围
					int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
					// 查询出所有在范围设置内的基站点
					for (MapPoi mp : mapPoiList) {
						if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
							rangeMapPoiList.add(mp);
						}
					}
					flag = true;
				}
			}
		}
		if (flag)
			return rangeMapPoiList;
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 查询MapPoi信息
				return gridCommonMapper.selectAllNonCdGroupByOrgId(orgIds);
			} else {
				return null;
			}
		}
	}

	/**
	 * 初始化查询所有重点小区
	 * 
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param rangeInfo
	 * @param orgId
	 * @return
	 */
	public List<MapPoi> selectAllImportantCommunityByOrgId(SysUser user, String setRange, String uId, String poiInfo, String rangeInfo, String orgId) {
		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		// 显示部分
		if ("PART".equals(rangeInfo)) {
			boolean flag = false;
			// 初始化保存所有在范围内的基站集合
			List<MapPoi> rangeMapPoiList = new ArrayList<>();
			// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
			if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
				// 查询MapPoi信息
				List<MapPoi> mapPoiList = gridCommonMapper.selectAllImportantCommunityByOrgId(orgIds);
				if (null != mapPoiList && mapPoiList.size() > 0) {
					// 根据uId查询地图信息
					MapPoi mapPoi = this.selectPoiByUid(uId);
					if (null != mapPoi) {
						// 获取显示的范围
						int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
						// 查询出所有在范围设置内的基站点
						for (MapPoi mp : mapPoiList) {
							if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
								rangeMapPoiList.add(mp);
							}
						}
						flag = true;
					}
				}
			}
			if (flag)
				return rangeMapPoiList;
			else
				return null;
		}
		// 显示全部
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 查询MapPoi信息
				return gridCommonMapper.selectAllImportantCommunityByOrgId(orgIds);
			} else {
				return null;
			}
		}
	}

	/**
	 * 初始化查询所有网格学校
	 * 
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param rangeInfo
	 * @param orgId
	 * @return
	 */
	public List<MapPoi> selectGridSchoolOrgId(SysUser user, String setRange, String uId, String poiInfo, String rangeInfo, String orgId) {
		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		// 显示部分
		if ("PART".equals(rangeInfo)) {
			boolean flag = false;
			// 初始化保存所有在范围内的基站集合
			List<MapPoi> rangeMapPoiList = new ArrayList<>();
			// 1，判断是否选择了周边基站类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
			if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
				// 查询MapPoi信息
				List<MapPoi> mapPoiList = gridCommonMapper.selectGridSchoolOrgId(orgIds);
				if (null != mapPoiList && mapPoiList.size() > 0) {
					// 根据uId查询地图信息
					MapPoi mapPoi = this.selectPoiByUid(uId);
					if (null != mapPoi) {
						// 获取显示的范围
						int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
						// 查询出所有在范围设置内的基站点
						for (MapPoi mp : mapPoiList) {
							if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
								rangeMapPoiList.add(mp);
							}
						}
						flag = true;
					}
				}
			}
			if (flag)
				return rangeMapPoiList;
			else
				return null;
		}
		// 显示全部
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 查询MapPoi信息
				return gridCommonMapper.selectGridSchoolOrgId(orgIds);
			} else {
				return null;
			}
		}
	}
	/**
	 * 初始化查询所有写字楼
	 * 
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param rangeInfo
	 * @param orgId
	 * @return
	 */
	public List<MapPoi> selectAllOfficeBuildingOrgId(SysUser user, String setRange, String uId, String poiInfo, String rangeInfo, String orgId) {
		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		// 显示部分
		if ("PART".equals(rangeInfo)) {
			boolean flag = false;
			// 初始化保存所有在范围内的写字楼集合
			List<MapPoi> rangeMapPoiList = new ArrayList<>();
			// 1，判断是否选择了周边写字楼类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
			if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
				// 查询MapPoi信息
				List<MapPoi> mapPoiList = gridCommonMapper.selectAllOfficeBuildingOrgId(orgIds);
				if (null != mapPoiList && mapPoiList.size() > 0) {
					// 根据uId查询地图信息
					MapPoi mapPoi = this.selectPoiByUid(uId);
					if (null != mapPoi) {
						// 获取显示的范围
						int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
						// 查询出所有在范围设置内的写字楼点
						for (MapPoi mp : mapPoiList) {
							if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
								rangeMapPoiList.add(mp);
							}
						}
						flag = true;
					}
				}
			}
			if (flag)
				return rangeMapPoiList;
			else
				return null;
		}
		// 显示全部
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 查询MapPoi信息
				return gridCommonMapper.selectAllOfficeBuildingOrgId(orgIds);
			} else {
				return null;
			}
		}
	}
	
	/**
	 * 初始化查询所有政府单位
	 * 
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param rangeInfo
	 * @param orgId
	 * @return
	 */
	public List<MapPoi> selectAllGovernmentUnitOrgId(SysUser user, String setRange, String uId, String poiInfo, String rangeInfo, String orgId) {
		// 根据登录人，判断是否level < 3，如果 level < 3则表示是领导，则递归查询出登录人下面所有 level =
		// 3的orgId，再做查询
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);

		// 显示部分
		if ("PART".equals(rangeInfo)) {
			boolean flag = false;
			// 初始化保存所有在范围内的写字楼集合
			List<MapPoi> rangeMapPoiList = new ArrayList<>();
			// 1，判断是否选择了周边写字楼类型，没选择就返回空；2，判断是否查询了地图信息，如果没有则返回空
			if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
				// 查询MapPoi信息
				List<MapPoi> mapPoiList = gridCommonMapper.selectAllGovernmentUnitOrgId(orgIds);
				if (null != mapPoiList && mapPoiList.size() > 0) {
					// 根据uId查询地图信息
					MapPoi mapPoi = this.selectPoiByUid(uId);
					if (null != mapPoi) {
						// 获取显示的范围
						int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
						// 查询出所有在范围设置内的写字楼点
						for (MapPoi mp : mapPoiList) {
							if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
								rangeMapPoiList.add(mp);
							}
						}
						flag = true;
					}
				}
			}
			if (flag)
				return rangeMapPoiList;
			else
				return null;
		}
		// 显示全部
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 查询MapPoi信息
				return gridCommonMapper.selectAllGovernmentUnitOrgId(orgIds);
			} else {
				return null;
			}
		}
	}
	
	public List<String> initSearchName(String orgId) {
		return gridCommonMapper.initSearchName(orgId);
	}

	public List<String> initSearchPlaceName(String orgId, String paramPlace) {
		Map<String, String> ParamMap = new HashMap<String, String>();
		ParamMap.put("orgId", orgId);
		ParamMap.put("place", paramPlace);
		return gridCommonMapper.initSearchPlaceName(ParamMap);
	}

	public List<MapPoi> selectSearchList(String name, String orgId) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("name", name);
		map.put("orgId", orgId);
		return gridCommonMapper.selectSearchList(map);
	}

	/**
	 * 初始化查询基础单元
	 * 
	 * @Title selectAllPoiByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param flag
	 * @return List<MapPoi>
	 */
	public List<MapPoi> selectAllPoiByOrgId(String orgId, String flag) {
		// return gridCommonMapper.selectAllPoiByOrgId(orgId);
		if (null == flag || "false".equals(flag)) {
			return gridCommonMapper.selectAllPoiByOrgIds(orgId);
		}
		return gridCommonMapper.selectCommunityPoiByOrgIds(orgId);
	}
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectAoiIdxNum，作用：调用中心接口初始化查询基础单元信息】")
	public List<MapPoi> selectAoiIdxNum(String orgId, String uid) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("uid", uid);
		map.put("orgId", orgId);
		return gridCommonMapper.selectAoiIdxNum(map);
	}
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectAreaShape，作用：查询区域轮廓信息】")
	public List<MapPoi> selectAreaShape(String orgId) {
		return gridCommonMapper.selectAreaShape(orgId);
	}
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectHouse，作用：查询房屋信息】")
	public Map<String, String> selectHouse(String physical_id) {
		Map<String, String> houseMap = gridCommonMapper.selectHouse(physical_id);
		return houseMap;
	}
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectHouse，作用：查询学校信息】")
	public Map<String, String> selectSchool(String physical_id) {
		Map<String, String> schoolMap = gridCommonMapper.selectSchool(physical_id);
		return schoolMap;
	}

	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectSchoolOrHouse，作用：查询学校或房屋信息】")
	public Map<String, String> selectSchoolOrHouse(String uid) {
		Map<String, String> schoolOrHouse = gridCommonMapper.selectSchoolOrHouse(uid);
		return schoolOrHouse;
	}

	/**
	 * 根据UID去查询单个基础单元，本地接口
	 * 
	 * @Title selectPoiByUid
	 * @Author administration
	 * @param uid
	 * @return MapPoi
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectPoiByUid，作用：根据UID去查询单个基础单元】")
	public MapPoi selectPoiByUid(String uid) {
		return gridCommonMapper.selectPoiByUid(uid);
	}

	/**
	 * 得到该区县下的所有小区轮廓
	 * 
	 * @Title getCommunityShapeByGriCode
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param cellId
	 * @return List<MapInfo>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：getCommunityShapeByGriCode，作用：得到该区县下的所有小区轮廓】")
	public List<MapInfo> getCommunityShapeByGriCode(String orgId, String cellId) {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("orgId", orgId);
		paramMap.put("cellId", cellId);
		return this.gridCommonMapper.getCommunityShapeByGriCode(paramMap);
	}

	/**
	 * 得到该区县下所有网格轮廓
	 * 
	 * @Title getShapeByGriCode
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param gridCode
	 * @return List<MapInfo>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：getShapeByGriCode，作用：得到该区县下所有网格轮廓】")
	public List<MapInfo> getShapeByGriCode(String orgId, String gridCode) {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("orgId", orgId);
		paramMap.put("gridCode", gridCode);
		return this.gridCommonMapper.getShapeByGriCode(paramMap);
	}

	public List<MapPoi> selectSchoolPoi(String name, String orgId) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("name", name);
		map.put("orgId", orgId);
		return gridCommonMapper.selectSchoolPoi(map);
	}

	/**
	 * 当选择的网格信息为全部时，则根据当前登录人orgId查询所有网格信息
	 * 
	 * @Title selectGridInfoByPid
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<SysOrg>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectGridInfoByPid，作用：查询当前登录人所在地市的网格信息】")
	public List<SysOrg> selectGridInfoByPid(String orgId) {
		return gridCommonMapper.selectGridInfoByPid(orgId);
	}

	/**
	 * 当选择的网格信息不为空时，则根据当前选择的网格编码查询网格信息
	 * 
	 * @Title selectGridInfoByGridCode
	 * @Author xiaogaoxiang
	 * @param gridCode
	 * @return List<SysOrg>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectGridInfoByGridCode，作用：根据当前选择的网格编码查询网格信息】")
	public List<SysOrg> selectGridInfoByGridCode(String gridCode) {
		return gridCommonMapper.selectGridInfoByGridCode(gridCode);
	}

	/**
	 * 根据归属网格，查询所有的渠道信息（已入格）
	 * 
	 * @Title selectChannelByGridCodes
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectChannelByGridCodes，作用：根据归属网格，查询所有的渠道信息（已入格）】")
	public List<Map<String, Object>> selectChannelByGridCodes(Map<String, Object> map) {
		return gridCommonMapper.selectChannelByGridCodes(map);
	}

	/**
	 * 根据归属网格，查询所有的渠道信息(未入格)
	 * 
	 * @Title selectChannelByGridCodes
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectChannelByGridCodesNotEnter，作用：根据归属网格，查询所有的渠道信息(未入格)】")
	public List<Map<String, Object>> selectChannelByGridCodesNotEnter(Map<String, Object> map) {
		return gridCommonMapper.selectChannelByGridCodesNotEnter(map);
	}

	/**
	 * 根据归属网格，查询所有的基站信息（已入格）
	 * 
	 * @Title selectStationByGridCodes
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectStationByGridCodes，作用：根据归属网格，查询所有的基站信息（已入格）】")
	public List<Map<String, Object>> selectStationByGridCodes(Map<String, Object> map) {
		return gridCommonMapper.selectStationByGridCodes(map);
	}

	/**
	 * 根据归属网格，查询所有的基站信息（未入格）
	 * 
	 * @Title selectStationByGridCodes
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectStationByGridCodesNotEnter，作用：根据归属网格，查询所有的基站信息（未入格）】")
	public List<Map<String, Object>> selectStationByGridCodesNotEnter(Map<String, Object> map) {
		return gridCommonMapper.selectStationByGridCodesNotEnter(map);
	}

	/**
	 * 根据归属网格，查询所有小区信息(已入格)
	 * 
	 * @Title selectCommunityByGridCodes
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectCommunityByGridCodes，作用：根据归属网格，查询所有小区信息(已入格)】")
	public List<Map<String, Object>> selectCommunityByGridCodes(Map<String, Object> map) {
		return gridCommonMapper.selectCommunityByGridCodes(map);
	}

	/**
	 * 根据归属网格，查询所有小区信息（未入格）
	 * 
	 * @Title selectCommunityByGridCodesNotEnter
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectCommunityByGridCodesNotEnter，作用：根据归属网格，查询所有小区信息（未入格）】")
	public List<Map<String, Object>> selectCommunityByGridCodesNotEnter(Map<String, Object> map) {
		return gridCommonMapper.selectCommunityByGridCodesNotEnter(map);
	}

	/**
	 * 根据归属网格，查询所有楼宇信息（已入格）
	 * 
	 * @Title selectBuildingByGridCodes
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectBuildingByGridCodes，作用：根据归属网格，查询所有楼宇信息（已入格）】")
	public List<Map<String, Object>> selectBuildingByGridCodes(Map<String, Object> map) {
		return gridCommonMapper.selectBuildingByGridCodes(map);
	}

	/**
	 * 根据归属网格，查询所有楼宇信息(未入格)
	 * 
	 * @Title selectBuildingByGridCodesNotEnter
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectBuildingByGridCodesNotEnter，作用：根据归属网格，查询所有楼宇信息(未入格)】")
	public List<Map<String, Object>> selectBuildingByGridCodesNotEnter(Map<String, Object> map) {
		return gridCommonMapper.selectBuildingByGridCodesNotEnter(map);
	}

	public List<Map<String, Object>> selectGridInfoByGridCodes(Map<String, Object> map) {
		return gridCommonMapper.selectGridInfoByGridCodes(map);
	}

	/**
	 * 
	 * @Title selectGridInfoByGridCodesNotEnter (未入格) @Author hubinbin @return
	 *        List<Map<String,Object>> @throws
	 */
	public List<Map<String, Object>> selectGridInfoByGridCodesNotEnter(Map<String, Object> map) {
		return gridCommonMapper.selectGridInfoByGridCodesNotEnter(map);
	}

	/**
	 * 查询AB集团或则CD集团信息
	 * 
	 * @param map
	 * @return
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectGroupInfoByGridCodes，作用：查询AB集团集团信息】")
	public List<Map<String, Object>> selectGroupInfoByGridCodes(Map<String, Object> map) {
		return gridCommonMapper.selectGroupInfoByGridCodes(map);
	}
	
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectCDGroupInfoByGridCodes，作用：查询CD集团信息】")
	public List<Map<String, Object>> selectCDGroupInfoByGridCodes(Map<String, Object> map) {
		return gridCommonMapper.selectCDGroupInfoByGridCodes(map);
	}
	
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectZYGLCDGroupInfoByGridCodes，作用：资源管理已入格CD类集团报表导出】")
	public List<Map<String, Object>> selectZYGLCDGroupInfoByGridCodes(Map<String, Object> map) {
		return gridCommonMapper.selectZYGLCDGroupInfoByGridCodes(map);
	}

	/**
	 * 查询AB或CD集团(未入格)
	 * 
	 * @param map
	 * @return
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectABGroupInfoByGridCodesNotEnter，作用：查询AB集团(未入格)】")
	public List<Map<String, Object>> selectABGroupInfoByGridCodesNotEnter(Map<String, Object> map) {
		return gridCommonMapper.selectABGroupInfoByGridCodesNotEnter(map);
	}
	/**
	 * 查询CD集团(未入格)
	 * 
	 * @param map
	 * @return
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectGroupInfoByGridCodesNotEnter，作用：查询CD集团(未入格)】")
	public List<Map<String, Object>> selectCDGroupInfoByGridCodesNotEnter(Map<String, Object> map) {
		return gridCommonMapper.selectCDGroupInfoByGridCodesNotEnter(map);
	}

	/**
	 * 查询行政区域名称，调用haojing接口，获取边界信息，并更新到数据库中
	 * 
	 * @Title updateGeoInfo
	 * @Author xiaogaoxiang void
	 * @throws Exception
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：updateGeoInfo，作用：更新边界信息到数据库】")
	public void updateGeoInfo() throws Exception {
		// 查询行政区域名称，包含orgId和memo（备注）
		List<SysOrg> sysOrgList = sysOrgService.selectCityInfo();
		StringBuilder urlStr = null;
		List<Map<String, Object>> mapList = new ArrayList<>();
		Map<String, Object> map = null;
		StringBuilder errorCity = new StringBuilder("错误的省市区县有：");
		for (SysOrg so : sysOrgList) {
			// 将备注按照_分割
			String[] memos = so.getMemo().split("_");
			String encodedUrl = null;
			if (memos.length > 1) {
				// 进行encode编码
				encodedUrl = URLEncoder.encode("'%" + memos[1] + "%'", "UTF-8");
				// 拼接接口的url
				urlStr = new StringBuilder("http://10.154.144.169:7007/arcgis/rest/services/hn_province_border_bd/MapServer/0/query?where=DISTRICT+LIKE+");
				urlStr.append(encodedUrl);
				urlStr.append(
						"&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=json");
				// 调用接口，查询返回地市的json串
				String json = HttpClientUtils.getPostData(urlStr.toString());
				try {
					// 先将json字符串转换成json对象
					JSONObject jsonObject = JSON.parseObject(json);
					// 取的JSONObject里面features的json字符串
					String features = jsonObject.getString("features");
					if (null != features && !"".equals(features) && features.length() > 0 && !features.equals("[]")) {
						// 将features转换为json对象
						JSONArray jsonObject1 = JSON.parseArray(features.substring(0, features.length()));
						// 取的JSONObject里面的geometry的json字符串
						String geometry = jsonObject1.getJSONObject(0).getString("geometry");

						// 将geometry转换为json对象
						JSONObject jsonObject2 = JSON.parseObject(geometry);

						// 取的JSONObject里面的rings的json字符串
						String rings = jsonObject2.getString("rings");

						rings = rings.substring(1, rings.length() - 1);

						map = new HashMap<String, Object>();
						// 通过]],拆分
						String[] ringss = rings.split("]],");
						// 判断是否长度大于1，如果大于1则表示是复杂多边形
						if (ringss.length > 1) {
							int count = 0;
							StringBuilder ringSb = new StringBuilder();
							for (String rs : ringss) {
								if (count != ringss.length - 1) {
									ringSb.append(rs.substring(1, rs.length()) + "]]&");
								} else {
									ringSb.append(rs.substring(1, rs.length()) + "&");
								}
								count++;
							}
							map.put("shape", ringSb.toString());
						} else {
							map.put("shape", rings);
						}
						map.put("orgId", so.getOrgId());
						map.put("orgName", so.getMemo());
						mapList.add(map);
					} else {
						errorCity.append(so.getMemo() + ",");
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				List<StationInfo> stationInfoList = new ArrayList<>();
				StationInfo stationInfo = null;
				StringBuilder shapeInfo = null;
				// 循环为解析json字符串，拼接shap字段
				for (Map<String, Object> m : mapList) {
					String[] shapes = m.get("shape").toString().substring(0, m.get("shape").toString().length()).split("&");
					if (shapes.length > 1) {
						StringBuilder shapeStr = new StringBuilder();
						for (String ss : shapes) {
							shapeInfo = new StringBuilder("[");
							String[] shapeAry = ss.substring(1, ss.length() - 1).split(",");
							for (int i = 0, n = shapeAry.length; i < n; i++) {
								if (i != shapeAry.length - 1) {
									// 偶数是经度
									if (i % 2 == 0) {
										if (shapeAry[i].startsWith("["))
											shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
										else {
											shapeInfo.append("{\"lng\":" + shapeAry[i].substring(0, shapeAry[i].length()) + ",");
										}
									}
									// 奇数是纬度
									else {
										shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "},");
									}
								} else {
									// 偶数是经度
									if (i % 2 == 0) {
										shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
									}
									// 奇数是纬度
									else {
										shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "}]");
									}
								}
							}
							shapeStr.append(shapeInfo.toString() + "&");
						}
						stationInfo = new StationInfo();
						stationInfo.setOrgId(m.get("orgId").toString());
						stationInfo.setStationName(m.get("orgName").toString());
						stationInfo.setShape(shapeStr.toString());
						stationInfoList.add(stationInfo);
					} else {
						// 初始化字符串对象
						shapeInfo = new StringBuilder("[");
						String[] shapeAry = m.get("shape").toString().substring(1, m.get("shape").toString().length() - 1).split(",");
						for (int i = 0, n = shapeAry.length; i < n; i++) {
							if (i != shapeAry.length - 1) {
								// 偶数是经度
								if (i % 2 == 0) {
									if (shapeAry[i].startsWith("["))
										shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
									else {
										shapeInfo.append("{\"lng\":" + shapeAry[i].substring(0, shapeAry[i].length()) + ",");
									}
								}
								// 奇数是纬度
								else {
									shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "},");
								}
							} else {
								// 偶数是经度
								if (i % 2 == 0) {
									shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
								}
								// 奇数是纬度
								else {
									shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "}]");
								}
							}
						}
						stationInfo = new StationInfo();
						stationInfo.setOrgId(m.get("orgId").toString());
						stationInfo.setStationName(m.get("orgName").toString());
						stationInfo.setShape(shapeInfo.toString());
						stationInfoList.add(stationInfo);
					}
				}
				FileWriter fw = null;
				// SYS_ORG_POLYGON表中，根据根据orgid更新shape字段
				for (StationInfo si : stationInfoList) {
					try {
						fw = new FileWriter("D://token.txt", true);
						fw.write(si.getOrgId() + "--" + si.getStationName() + "\r\n" + si.getShape() + "\r\n");
					} catch (IOException e) {
						e.printStackTrace();
					} finally {
						fw.close();
					}
					String[] shape = si.getShape().split("&");
					// 如果只有一条信息，判断是否存在，不存在则新增，存在则修改
					if (shape.length == 1) {
						// 根据orgId查询SYS_ORG_DETAIL信息
						Map<String, Object> sysOrgDetail = sysOrgService.selectSysOrgDetailByOrgId(si.getOrgId());
						if (null != sysOrgDetail && sysOrgDetail.size() > 0) {
							// 跟新shape字段
							sysOrgService.updateSysOrgDetail(si);
						} else {
							// 新增信息
							// 根据shape，找到对应的最大最小经纬度，中心经纬度
							Map<String, Object> mapInfo = new HashMap<String, Object>();
							mapInfo.put("orgId", si.getOrgId());
							mapInfo.put("shape", shape[0]);
							mapInfo.put("color", "#32e2ff");
							setShapeMM(shape[0], mapInfo);
							if (null != shape[0] && !"".equals(shape[0]) && shape[0].length() > 0)
								// 新增SYS_ORG_DETAIL信息
								sysOrgService.insertSysOrgDetail(mapInfo);
						}
					}
					// 如果有多条信息，则要删除之前那条，然后新增
					else {
						// 根据orgId删除对应的行政边界区域信息
						sysOrgService.deleteSysOrgDetailByOrgId(si.getOrgId());
						for (int i = 0; i < shape.length; i++) {
							// 根据shape，找到对应的最大最小经纬度，中心经纬度
							Map<String, Object> mapInfo = new HashMap<String, Object>();
							mapInfo.put("orgId", si.getOrgId());
							mapInfo.put("shape", shape[i]);
							mapInfo.put("color", "#32e2ff");
							setShapeMM(shape[i].toString(), mapInfo);
							if (null != shape[i] && !"".equals(shape[i]) && shape[i].length() > 0)
								// 新增SYS_ORG_DETAIL信息
								sysOrgService.insertSysOrgDetail(mapInfo);
						}
					}
				}
				System.out.println("更新完成...");
			} else {
				memos = so.getMemo().split("/");
				if (memos.length > 1) {
					for (String ms : memos) {
						// 进行encode编码
						encodedUrl = URLEncoder.encode("'%" + ms + "%'", "UTF-8");
						// 拼接接口的url
						urlStr = new StringBuilder(
								"http://10.154.144.169:7007/arcgis/rest/services/hn_province_border_bd/MapServer/0/query?where=DISTRICT+LIKE+");
						urlStr.append(encodedUrl);
						urlStr.append(
								"&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=json");
						// 调用接口，查询返回地市的json串
						String json = HttpClientUtils.getPostData(urlStr.toString());
						try {
							// 先将json字符串转换成json对象
							JSONObject jsonObject = JSON.parseObject(json);
							// 取的JSONObject里面features的json字符串
							String features = jsonObject.getString("features");
							if (null != features && !"".equals(features) && features.length() > 0 && !features.equals("[]")) {
								// 将features转换为json对象
								JSONArray jsonObject1 = JSON.parseArray(features.substring(0, features.length()));
								// 取的JSONObject里面的geometry的json字符串
								String geometry = jsonObject1.getJSONObject(0).getString("geometry");

								// 将geometry转换为json对象
								JSONObject jsonObject2 = JSON.parseObject(geometry);

								// 取的JSONObject里面的rings的json字符串
								String rings = jsonObject2.getString("rings");

								rings = rings.substring(1, rings.length() - 1);

								map = new HashMap<String, Object>();
								// 通过]],拆分
								String[] ringss = rings.split("]],");
								// 判断是否长度大于1，如果大于1则表示是复杂多边形
								if (ringss.length > 1) {
									int count = 0;
									StringBuilder ringSb = new StringBuilder();
									for (String rs : ringss) {
										if (count != ringss.length - 1) {
											ringSb.append(rs.substring(1, rs.length()) + "]]&");
										} else {
											ringSb.append(rs.substring(1, rs.length()) + "&");
										}
										count++;
									}
									map.put("shape", ringSb.toString());
								} else {
									map.put("shape", rings);
								}
								map.put("orgId", so.getOrgId());
								map.put("orgName", so.getMemo());
								mapList.add(map);
							} else {
								errorCity.append(so.getMemo() + ",");
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
						List<StationInfo> stationInfoList = new ArrayList<>();
						StationInfo stationInfo = null;
						StringBuilder shapeInfo = null;
						// 循环为解析json字符串，拼接shap字段
						for (Map<String, Object> m : mapList) {
							String[] shapes = m.get("shape").toString().substring(0, m.get("shape").toString().length()).split("&");
							if (shapes.length > 1) {
								StringBuilder shapeStr = new StringBuilder();
								for (String ss : shapes) {
									shapeInfo = new StringBuilder("[");
									String[] shapeAry = ss.substring(1, ss.length() - 1).split(",");
									for (int i = 0, n = shapeAry.length; i < n; i++) {
										if (i != shapeAry.length - 1) {
											// 偶数是经度
											if (i % 2 == 0) {
												if (shapeAry[i].startsWith("["))
													shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
												else {
													shapeInfo.append("{\"lng\":" + shapeAry[i].substring(0, shapeAry[i].length()) + ",");
												}
											}
											// 奇数是纬度
											else {
												shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "},");
											}
										} else {
											// 偶数是经度
											if (i % 2 == 0) {
												shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
											}
											// 奇数是纬度
											else {
												shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "}]");
											}
										}
									}
									shapeStr.append(shapeInfo.toString() + "&");
								}
								stationInfo = new StationInfo();
								stationInfo.setOrgId(m.get("orgId").toString());
								stationInfo.setStationName(m.get("orgName").toString());
								stationInfo.setShape(shapeStr.toString());
								stationInfoList.add(stationInfo);
							} else {
								// 初始化字符串对象
								shapeInfo = new StringBuilder("[");
								String[] shapeAry = m.get("shape").toString().substring(1, m.get("shape").toString().length() - 1).split(",");
								for (int i = 0, n = shapeAry.length; i < n; i++) {
									if (i != shapeAry.length - 1) {
										// 偶数是经度
										if (i % 2 == 0) {
											if (shapeAry[i].startsWith("["))
												shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
											else {
												shapeInfo.append("{\"lng\":" + shapeAry[i].substring(0, shapeAry[i].length()) + ",");
											}
										}
										// 奇数是纬度
										else {
											shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "},");
										}
									} else {
										// 偶数是经度
										if (i % 2 == 0) {
											shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
										}
										// 奇数是纬度
										else {
											shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "}]");
										}
									}
								}
								stationInfo = new StationInfo();
								stationInfo.setOrgId(m.get("orgId").toString());
								stationInfo.setStationName(m.get("orgName").toString());
								stationInfo.setShape(shapeInfo.toString());
								stationInfoList.add(stationInfo);
							}
						}
						FileWriter fw = null;
						// SYS_ORG_POLYGON表中，根据根据orgid更新shape字段
						for (StationInfo si : stationInfoList) {
							try {
								fw = new FileWriter("D://token.txt", true);
								fw.write(si.getOrgId() + "--" + si.getStationName() + "\r\n" + si.getShape() + "\r\n");
							} catch (IOException e) {
								e.printStackTrace();
							} finally {
								fw.close();
							}
							String[] shape = si.getShape().split("&");
							// 如果只有一条信息，则直接更新
							if (shape.length == 1) {
								// 根据orgId查询SYS_ORG_DETAIL信息
								Map<String, Object> sysOrgDetail = sysOrgService.selectSysOrgDetailByOrgId(si.getOrgId());
								if (null != sysOrgDetail && sysOrgDetail.size() > 0) {
									// 跟新shape字段
									sysOrgService.updateSysOrgDetail(si);
								} else {
									// 新增信息
									// 根据shape，找到对应的最大最小经纬度，中心经纬度
									Map<String, Object> mapInfo = new HashMap<String, Object>();
									mapInfo.put("orgId", si.getOrgId());
									mapInfo.put("shape", shape[0]);
									mapInfo.put("color", "#32e2ff");
									setShapeMM(shape[0], mapInfo);
									if (null != shape[0] && !"".equals(shape[0]) && shape[0].length() > 0)
										// 新增SYS_ORG_DETAIL信息
										sysOrgService.insertSysOrgDetail(mapInfo);
								}
							}
							// 如果有多条信息，则要删除之前那条，然后新增
							else {
								// 根据orgId删除对应的行政边界区域信息
								sysOrgService.deleteSysOrgDetailByOrgId(si.getOrgId());
								for (int i = 0; i < shape.length; i++) {
									// 根据shape，找到对应的最大最小经纬度，中心经纬度
									Map<String, Object> mapInfo = new HashMap<String, Object>();
									mapInfo.put("orgId", si.getOrgId());
									mapInfo.put("shape", shape[i]);
									mapInfo.put("color", "#32e2ff");
									setShapeMM(shape[i].toString(), mapInfo);
									if (null != shape[i] && !"".equals(shape[i]) && shape[i].length() > 0)
										// 新增SYS_ORG_DETAIL信息
										sysOrgService.insertSysOrgDetail(mapInfo);
								}
							}
						}
						System.out.println("更新完成...");
					}
				} else {
					// 进行encode编码
					encodedUrl = URLEncoder.encode("'%" + memos[0] + "%'", "UTF-8");
					// 拼接接口的url
					urlStr = new StringBuilder("http://10.154.144.169:7007/arcgis/rest/services/hn_province_border_bd/MapServer/0/query?where=DISTRICT+LIKE+");
					urlStr.append(encodedUrl);
					urlStr.append(
							"&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=json");
					// 调用接口，查询返回地市的json串
					String json = HttpClientUtils.getPostData(urlStr.toString());
					try {
						// 先将json字符串转换成json对象
						JSONObject jsonObject = JSON.parseObject(json);
						// 取的JSONObject里面features的json字符串
						String features = jsonObject.getString("features");
						if (null != features && !"".equals(features) && features.length() > 0 && !features.equals("[]")) {
							// 将features转换为json对象
							JSONArray jsonObject1 = JSON.parseArray(features.substring(0, features.length()));
							// 取的JSONObject里面的geometry的json字符串
							String geometry = jsonObject1.getJSONObject(0).getString("geometry");

							// 将geometry转换为json对象
							JSONObject jsonObject2 = JSON.parseObject(geometry);

							// 取的JSONObject里面的rings的json字符串
							String rings = jsonObject2.getString("rings");

							rings = rings.substring(1, rings.length() - 1);

							map = new HashMap<String, Object>();
							// 通过]],拆分
							String[] ringss = rings.split("]],");
							// 判断是否长度大于1，如果大于1则表示是复杂多边形
							if (ringss.length > 1) {
								int count = 0;
								StringBuilder ringSb = new StringBuilder();
								for (String rs : ringss) {
									if (count != ringss.length - 1) {
										ringSb.append(rs.substring(1, rs.length()) + "]]&");
									} else {
										ringSb.append(rs.substring(1, rs.length()) + "&");
									}
									count++;
								}
								map.put("shape", ringSb.toString());
							} else {
								map.put("shape", rings);
							}
							map.put("orgId", so.getOrgId());
							map.put("orgName", so.getMemo());
							mapList.add(map);
						} else {
							errorCity.append(so.getMemo() + ",");
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
					List<StationInfo> stationInfoList = new ArrayList<>();
					StationInfo stationInfo = null;
					StringBuilder shapeInfo = null;
					// 循环为解析json字符串，拼接shap字段
					for (Map<String, Object> m : mapList) {
						String[] shapes = m.get("shape").toString().substring(0, m.get("shape").toString().length()).split("&");
						if (shapes.length > 1) {
							StringBuilder shapeStr = new StringBuilder();
							for (String ss : shapes) {
								shapeInfo = new StringBuilder("[");
								String[] shapeAry = ss.substring(1, ss.length() - 1).split(",");
								for (int i = 0, n = shapeAry.length; i < n; i++) {
									if (i != shapeAry.length - 1) {
										// 偶数是经度
										if (i % 2 == 0) {
											if (shapeAry[i].startsWith("["))
												shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
											else {
												shapeInfo.append("{\"lng\":" + shapeAry[i].substring(0, shapeAry[i].length()) + ",");
											}
										}
										// 奇数是纬度
										else {
											shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "},");
										}
									} else {
										// 偶数是经度
										if (i % 2 == 0) {
											shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
										}
										// 奇数是纬度
										else {
											shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "}]");
										}
									}
								}
								shapeStr.append(shapeInfo.toString() + "&");
							}
							stationInfo = new StationInfo();
							stationInfo.setOrgId(m.get("orgId").toString());
							stationInfo.setStationName(m.get("orgName").toString());
							stationInfo.setShape(shapeStr.toString());
							stationInfoList.add(stationInfo);
						} else {
							// 初始化字符串对象
							shapeInfo = new StringBuilder("[");
							String[] shapeAry = m.get("shape").toString().substring(1, m.get("shape").toString().length() - 1).split(",");
							for (int i = 0, n = shapeAry.length; i < n; i++) {
								if (i != shapeAry.length - 1) {
									// 偶数是经度
									if (i % 2 == 0) {
										if (shapeAry[i].startsWith("["))
											shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
										else {
											shapeInfo.append("{\"lng\":" + shapeAry[i].substring(0, shapeAry[i].length()) + ",");
										}
									}
									// 奇数是纬度
									else {
										shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "},");
									}
								} else {
									// 偶数是经度
									if (i % 2 == 0) {
										shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
									}
									// 奇数是纬度
									else {
										shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "}]");
									}
								}
							}
							stationInfo = new StationInfo();
							stationInfo.setOrgId(m.get("orgId").toString());
							stationInfo.setStationName(m.get("orgName").toString());
							stationInfo.setShape(shapeInfo.toString());
							stationInfoList.add(stationInfo);
						}
					}
					FileWriter fw = null;
					// SYS_ORG_POLYGON表中，根据根据orgid更新shape字段
					for (StationInfo si : stationInfoList) {
						try {
							fw = new FileWriter("D://token.txt", true);
							fw.write(si.getOrgId() + "--" + si.getStationName() + "\r\n" + si.getShape() + "\r\n");
						} catch (IOException e) {
							e.printStackTrace();
						} finally {
							fw.close();
						}
						String[] shape = si.getShape().split("&");
						// 如果只有一条信息，则直接更新
						if (shape.length == 1) {
							// 根据orgId查询SYS_ORG_DETAIL信息
							Map<String, Object> sysOrgDetail = sysOrgService.selectSysOrgDetailByOrgId(si.getOrgId());
							if (null != sysOrgDetail && sysOrgDetail.size() > 0) {
								// 跟新shape字段
								sysOrgService.updateSysOrgDetail(si);
							} else {
								// 新增信息
								// 根据shape，找到对应的最大最小经纬度，中心经纬度
								Map<String, Object> mapInfo = new HashMap<String, Object>();
								mapInfo.put("orgId", si.getOrgId());
								mapInfo.put("shape", shape[0]);
								mapInfo.put("color", "#32e2ff");
								setShapeMM(shape[0], mapInfo);
								if (null != shape[0] && !"".equals(shape[0]) && shape[0].length() > 0)
									// 新增SYS_ORG_DETAIL信息
									sysOrgService.insertSysOrgDetail(mapInfo);
							}
						}
						// 如果有多条信息，则要删除之前那条，然后新增
						else {
							// 根据orgId删除对应的行政边界区域信息
							sysOrgService.deleteSysOrgDetailByOrgId(si.getOrgId());
							for (int i = 0; i < shape.length; i++) {
								// 根据shape，找到对应的最大最小经纬度，中心经纬度
								Map<String, Object> mapInfo = new HashMap<String, Object>();
								mapInfo.put("orgId", si.getOrgId());
								mapInfo.put("shape", shape[i]);
								mapInfo.put("color", "#32e2ff");
								setShapeMM(shape[i].toString(), mapInfo);
								if (null != shape[i] && !"".equals(shape[i]) && shape[i].length() > 0)
									// 新增SYS_ORG_DETAIL信息
									sysOrgService.insertSysOrgDetail(mapInfo);
							}
						}
					}
					System.out.println("更新完成...");
				}
			}
		}
		FileWriter fw = new FileWriter("D://token.txt", true);
		fw.write(errorCity.toString());
		fw.close();
	}

	/**
	 * 更新单个信息
	 * 
	 * 
	 * @Title updateGeoSingleCity
	 * @Author xiaogaoxiang void
	 * @throws Exception
	 */
	public void updateGeoSingleCity() throws Exception {
		String encodedUrl = URLEncoder.encode("'%宁乡%'", "UTF-8");
		// 拼接接口的url
		StringBuilder urlStr = new StringBuilder(
				"http://10.154.144.169:7007/arcgis/rest/services/hn_province_border_bd/MapServer/0/query?where=DISTRICT+LIKE+");
		urlStr.append(encodedUrl);
		urlStr.append(
				"&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=json");
		// 调用接口，查询返回地市的json串
		String json = HttpClientUtils.getPostData(urlStr.toString());
		List<Map<String, Object>> mapList = new ArrayList<>();
		try {
			// 判断是否为空，为空就不需要操作了
			if (null != json && !"".equals(json) && json.length() > 0) {
				// 先将json字符串转换成json对象
				JSONObject jsonObject = JSON.parseObject(json);

				// 取的JSONObject里面features的json字符串
				String features = jsonObject.getString("features");
				if (null != features && !"".equals(features) && features.length() > 0) {
					// 将features转换为json对象
					JSONArray jsonObject1 = JSON.parseArray(features.substring(0, features.length()));
					if (null != jsonObject1 && !"".equals(jsonObject1)) {
						// 取的JSONObject里面的geometry的json字符串
						String geometry = jsonObject1.getJSONObject(0).getString("geometry");

						// 将geometry转换为json对象
						JSONObject jsonObject2 = JSON.parseObject(geometry);

						// 取的JSONObject里面的rings的json字符串
						String rings = jsonObject2.getString("rings");

						rings = rings.substring(1, rings.length() - 1);

						Map<String, Object> map = new HashMap<String, Object>();
						// 通过]],拆分
						String[] ringss = rings.split("]],");
						// 判断是否长度大于1，如果大于1则表示是复杂多边形
						if (ringss.length > 1) {
							int count = 0;
							StringBuilder ringSb = new StringBuilder();
							for (String rs : ringss) {
								if (count != ringss.length - 1) {
									ringSb.append(rs.substring(1, rs.length()) + "]]&");
								} else {
									ringSb.append(rs.substring(1, rs.length()) + "&");
								}
								count++;
							}
							map.put("shape", ringSb.toString());
						} else {
							map.put("shape", rings);
						}

						map.put("orgId", "宁乡");
						mapList.add(map);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<StationInfo> stationInfoList = new ArrayList<>();
		StationInfo stationInfo = null;
		StringBuilder shapeInfo = null;
		// 循环为解析json字符串，拼接shap字段
		for (Map<String, Object> m : mapList) {
			String[] shapes = m.get("shape").toString().substring(0, m.get("shape").toString().length()).split("&");
			if (shapes.length > 1) {
				StringBuilder shapeStr = new StringBuilder();
				for (String ss : shapes) {
					shapeInfo = new StringBuilder("[");
					String[] shapeAry = ss.substring(1, ss.length() - 1).split(",");
					for (int i = 0, n = shapeAry.length; i < n; i++) {
						if (i != shapeAry.length - 1) {
							// 偶数是经度
							if (i % 2 == 0) {
								shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
							}
							// 奇数是纬度
							else {
								shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "},");
							}
						} else {
							// 偶数是经度
							if (i % 2 == 0) {
								shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
							}
							// 奇数是纬度
							else {
								shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "}]");
							}
						}
					}
					shapeStr.append(shapeInfo.toString() + "&");
				}
				stationInfo = new StationInfo();
				stationInfo.setOrgId(m.get("orgId").toString());
				stationInfo.setShape(shapeStr.toString());
				stationInfoList.add(stationInfo);
			} else {
				// 初始化字符串对象
				shapeInfo = new StringBuilder("[");
				String[] shapeAry = m.get("shape").toString().substring(1, m.get("shape").toString().length() - 1).split(",");
				for (int i = 0, n = shapeAry.length; i < n; i++) {
					if (i != shapeAry.length - 1) {
						// 偶数是经度
						if (i % 2 == 0) {
							shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
						}
						// 奇数是纬度
						else {
							shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "},");
						}
					} else {
						// 偶数是经度
						if (i % 2 == 0) {
							shapeInfo.append("{\"lng\":" + shapeAry[i].substring(1, shapeAry[i].length()) + ",");
						}
						// 奇数是纬度
						else {
							shapeInfo.append("\"lat\":" + shapeAry[i].substring(0, shapeAry[i].length() - 1) + "}]");
						}
					}
				}
				stationInfo = new StationInfo();
				stationInfo.setOrgId(m.get("orgId").toString());
				stationInfo.setShape(shapeInfo.toString());
				stationInfoList.add(stationInfo);
			}
		}
		FileWriter fw = null;
		// SYS_ORG_POLYGON表中，根据根据orgid更新shape字段
		for (StationInfo si : stationInfoList) {
			try {
				fw = new FileWriter("D://token.txt", true);
				fw.write(si.getOrgId() + "\r\n" + si.getShape() + "\r\n");
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				fw.close();
			}
			// 跟新shape字段
			sysOrgService.updateSysOrgDetail(si);
		}
		System.out.println("更新完成...");
	}

	public void setShapeMM(String shape, Map<String, Object> info) {
		JSONArray arr = JSONArray.parseArray(shape);
		Double minlng = 0.0;
		Double maxlng = 0.0;
		Double minlat = 0.0;
		Double maxlat = 0.0;

		Double x0 = 0.0;
		Double x1 = 0.0;
		Double x2 = 0.0;
		Double y0 = 0.0;
		Double y1 = 0.0;
		Double y2 = 0.0;
		Double sumx = 0.0;
		Double sumy = 0.0;
		Double sumarea = 0.0;

		for (int i = 0, n = arr.size(); i < n; i++) {
			JSONObject obj = arr.getJSONObject(i);
			Double lng = obj.getDouble("lng");
			Double lat = obj.getDouble("lat");
			if (i == 0) {
				minlng = maxlng = lng;
				minlat = maxlat = lat;
				x0 = lng;
				y0 = lat;
			} else {
				if (minlng > lng) {
					minlng = lng;
				}
				if (maxlng < lng) {
					maxlng = lng;
				}
				if (minlat > lat) {
					minlat = lat;
				}
				if (maxlat < lat) {
					maxlat = lat;
				}

				if (i == 1) {
					x1 = lng;
					y1 = lat;
				} else {
					x2 = lng;
					y2 = lat;
					Double s = ((x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0)) / 2.0;
					sumx += ((x0 + x1 + x2) * s);
					sumy += ((y0 + y1 + y2) * s);
					sumarea += s;
					x1 = x2;
					y1 = y2;
				}

			}
		}
		info.put("minlng", minlng);
		info.put("maxlng", maxlng);
		info.put("minlat", minlat);
		info.put("maxlat", maxlat);
		if (Math.abs(sumarea) > 0) {
			info.put("cplng", sumx / sumarea / 3);
			info.put("cplat", sumy / sumarea / 3);
		} else {
			info.put("cplng", (minlng + maxlng) / 2);
			info.put("cplat", (minlat + maxlat) / 2);
		}
	}

	/**
	 * 根据orgIds查询Shapes (list为多个orgId集合)
	 * 
	 * @Title selectSysOrgPolygons @Author hubinbin @return
	 *        List<List<MapInfo>> @throws
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectSysOrgPolygons，作用：根据orgIds查询Shapes (list为多个orgId集合)】")
	public List<MapInfo> selectSysOrgPolygons(List<String> list) {

		return gridCommonMapper.selectSysOrgPolygons(list);
	}

	/**
	 * 鍒濆鍖栨煡璇㈡墍鏈夋湭鍏ユ牸娓犻亾淇℃伅锛堟湰鍦版暟鎹簱鏌ヨ锛�
	 * 
	 * @Title selectAllChannelByOrgId
	 * @Author xiaogaoxiang
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param rangeInfo
	 * @param orgId
	 * @return List<MapPoi>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectAllNonChannelByOrgId，作用：初始化查询所有未入格渠道信息】")
	public List<MapPoi> selectAllNonChannelByOrgId(SysUser user, String setRange, String uId, String poiInfo, String rangeInfo, String orgId) {

		// 鏍规嵁鐧诲綍浜猴紝鍒ゆ柇鏄惁level < 3锛屽鏋� level <
		// 3鍒欒〃绀烘槸棰嗗锛屽垯閫掑綊鏌ヨ鍑虹櫥褰曚汉涓嬮潰鎵�鏈� level =
		// 3鐨刼rgId锛屽啀鍋氭煡璇�
		List<String> orgIds = new ArrayList<>();
		if (3 > Integer.valueOf(user.getSysOrg().getOrgLevel())) {
			// 鏌ヨ鎵�鏈夌殑SysUser淇℃伅
			List<SysUser> sysUserList = sysUserService.selectAllSysUser();
			orgIds = SysUserTreeMenuUtil.getChildrenOrgId(sysUserList, user.getOrgId(), orgId);
		} else {
			orgIds.add(user.getOrgId());
		}

		// 鏄剧ず閮ㄥ垎
		if ("PART".equals(rangeInfo)) {
			boolean flag = false;
			// 鍒濆鍖栦繚瀛樻墍鏈夊湪鑼冨洿鍐呯殑鍩虹珯闆嗗悎
			List<MapPoi> rangeMapPoiList = new ArrayList<>();
			// 1锛屽垽鏂槸鍚﹂�夋嫨浜嗗懆杈瑰熀绔欑被鍨嬶紝娌￠�夋嫨灏辫繑鍥炵┖锛�2锛屽垽鏂槸鍚︽煡璇簡鍦板浘淇℃伅锛屽鏋滄病鏈夊垯杩斿洖绌�
			if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
				// 鏌ヨMapPoi淇℃伅
				List<MapPoi> mapPoiList = gridCommonMapper.selectAllNonChannelByOrgId(orgIds);
				if (null != mapPoiList && mapPoiList.size() > 0) {
					// 鏍规嵁uId鏌ヨ鍦板浘淇℃伅
					MapPoi mapPoi = this.selectPoiByUid(uId);
					if (null != mapPoi) {
						// 鑾峰彇鏄剧ず鐨勮寖鍥�
						int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
						// 鏌ヨ鍑烘墍鏈夊湪鑼冨洿璁剧疆鍐呯殑鍩虹珯鐐�
						for (MapPoi mp : mapPoiList) {
							if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
								rangeMapPoiList.add(mp);
							}
						}
						flag = true;
					}
				}
			}
			if (flag)
				return rangeMapPoiList;
			else
				return null;
		}
		// 鏄剧ず鍏ㄩ儴
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 鏌ヨMapPoi淇℃伅
				return gridCommonMapper.selectAllNonChannelByOrgId(orgIds);
			} else {
				return null;
			}
		}
	}

	/**
	 * 鍒濆鍖栨煡璇㈡墍鏈夋湭鍏ユ牸鍩虹珯淇℃伅锛堟湰鍦版暟鎹簱鏌ヨ锛�
	 * 
	 * @Title selectNonStationByOrgId
	 * @Author caoxiaojuan
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param rangeInfo
	 * @param orgId
	 * @return List<MapPoi>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectAllNonStationByOrgId，作用：初始化查询所有未入格基站信息】")
	public List<MapPoi> selectAllNonStationByOrgId(SysUser user, String setRange, String uId, String poiInfo, String rangeInfo, String orgId) {
		List<String> orgIds = new ArrayList<>();
		if (3 > Integer.valueOf(user.getSysOrg().getOrgLevel())) {
			// 鏌ヨ鎵�鏈夌殑SysUser淇℃伅
			List<SysUser> sysUserList = sysUserService.selectAllSysUser();
			orgIds = SysUserTreeMenuUtil.getChildrenOrgId(sysUserList, user.getOrgId(), orgId);
		} else {
			orgIds.add(user.getOrgId());
		}

		// 鏄剧ず閮ㄥ垎
		if ("PART".equals(rangeInfo)) {
			boolean flag = false;
			// 鍒濆鍖栦繚瀛樻墍鏈夊湪鑼冨洿鍐呯殑鍩虹珯闆嗗悎
			List<MapPoi> rangeMapPoiList = new ArrayList<>();
			// 1锛屽垽鏂槸鍚﹂�夋嫨浜嗗懆杈瑰熀绔欑被鍨嬶紝娌￠�夋嫨灏辫繑鍥炵┖锛�2锛屽垽鏂槸鍚︽煡璇簡鍦板浘淇℃伅锛屽鏋滄病鏈夊垯杩斿洖绌�
			if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
				// 鏌ヨMapPoi淇℃伅
				List<MapPoi> mapPoiList = gridCommonMapper.selectAllNonStationByOrgId(orgIds);
				if (null != mapPoiList && mapPoiList.size() > 0) {
					// 鏍规嵁uId鏌ヨ鍦板浘淇℃伅
					MapPoi mapPoi = this.selectPoiByUid(uId);
					if (null != mapPoi) {
						// 鑾峰彇鏄剧ず鐨勮寖鍥�
						int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
						// 鏌ヨ鍑烘墍鏈夊湪鑼冨洿璁剧疆鍐呯殑鍩虹珯鐐�
						for (MapPoi mp : mapPoiList) {
							if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
								rangeMapPoiList.add(mp);
							}
						}
						flag = true;
					}
				}
			}
			if (flag)
				return rangeMapPoiList;
			else
				return null;
		}
		// 鏄剧ず鍏ㄩ儴
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 鏌ヨMapPoi淇℃伅
				return gridCommonMapper.selectAllStationByOrgId(orgIds);
			} else {
				return null;
			}
		}
	}

	/**
	 * 鍒濆鍖栨煡璇㈡墍鏈夋湭鍏ユ牸灏忓尯淇℃伅锛堟湰鍦版暟鎹簱鏌ヨ锛�
	 * 
	 * @Title selectAllNonCommunityByOrgId
	 * @Author caoxiaojuan
	 * @param user
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param rangeInfo
	 * @param orgId
	 * @return List<MapPoi>
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：selectAllNonCommunityByOrgId，作用：初始化查询所有未入格小区信息】")
	public List<MapPoi> selectAllNonCommunityByOrgId(SysUser user, String setRange, String uId, String poiInfo, String rangeInfo, String orgId) {

		// 鏍规嵁鐧诲綍浜猴紝鍒ゆ柇鏄惁level < 3锛屽鏋� level <
		// 3鍒欒〃绀烘槸棰嗗锛屽垯閫掑綊鏌ヨ鍑虹櫥褰曚汉涓嬮潰鎵�鏈� level =
		// 3鐨刼rgId锛屽啀鍋氭煡璇�
		List<String> orgIds = new ArrayList<>();
		orgIds.add(orgId);
		// if (3 > Integer.valueOf(user.getSysOrg().getOrgLevel())) {
		// // 鏌ヨ鎵�鏈夌殑SysUser淇℃伅
		// List<SysUser> sysUserList = sysUserService.selectAllSysUser();
		// orgIds = SysUserTreeMenuUtil.getChildrenOrgId(sysUserList,
		// user.getOrgId(), orgId);
		// } else {
		// orgIds.add(user.getOrgId());
		// }

		// 鏄剧ず閮ㄥ垎
		if ("PART".equals(rangeInfo)) {
			boolean flag = false;
			// 鍒濆鍖栦繚瀛樻墍鏈夊湪鑼冨洿鍐呯殑鍩虹珯闆嗗悎
			List<MapPoi> rangeMapPoiList = new ArrayList<>();
			// 1锛屽垽鏂槸鍚﹂�夋嫨浜嗗懆杈瑰熀绔欑被鍨嬶紝娌￠�夋嫨灏辫繑鍥炵┖锛�2锛屽垽鏂槸鍚︽煡璇簡鍦板浘淇℃伅锛屽鏋滄病鏈夊垯杩斿洖绌�
			if (null != poiInfo && !"".equals(poiInfo) && null != uId && !"".equals(uId)) {
				// 鏌ヨMapPoi淇℃伅
				List<MapPoi> mapPoiList = gridCommonMapper.selectAllNonCommunityByOrgId(orgIds);
				if (null != mapPoiList && mapPoiList.size() > 0) {
					// 鏍规嵁uId鏌ヨ鍦板浘淇℃伅
					MapPoi mapPoi = this.selectPoiByUid(uId);
					if (null != mapPoi) {
						// 鑾峰彇鏄剧ず鐨勮寖鍥�
						int range = "".equals(setRange) || null == setRange ? 100 : Integer.valueOf(setRange);
						// 鏌ヨ鍑烘墍鏈夊湪鑼冨洿璁剧疆鍐呯殑鍩虹珯鐐�
						for (MapPoi mp : mapPoiList) {
							if (range >= PoiDistanceUtil.Distance(mapPoi.getLat(), mapPoi.getLng(), mp.getLat(), mp.getLng())) {
								rangeMapPoiList.add(mp);
							}
						}
						flag = true;
					}
				}
			}
			if (flag)
				return rangeMapPoiList;
			else
				return null;
		}
		// 鏄剧ず鍏ㄩ儴
		else {
			if (null != poiInfo && !"".equals(poiInfo)) {
				// 鏌ヨMapPoi淇℃伅
				if (orgIds.size() > 0) {
					return gridCommonMapper.selectAllNonCommunityByOrgId(orgIds);
				} else {
					return gridCommonMapper.selectAllNonCommunityByOrgId(null);
				}

			} else {
				return null;
			}
		}
	}
	
	/**
	 * 查询小方格
	 * @param orgId
	 * @return
	 */
	@ArchivesLog(actionName = "【操作类：GridCommonService】", option = "【方法名：getSmallArea，作用：查询小方格信息】")
	public  List<Map<String, Object>>  getSmallArea(String orgId){
		return gridCommonMapper.getSmallArea(orgId);
	}
}
