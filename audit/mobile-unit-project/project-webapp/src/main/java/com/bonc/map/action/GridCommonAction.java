package com.bonc.map.action;

import java.awt.Polygon;
import java.awt.geom.Area;
import java.awt.geom.PathIterator;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.common.cst.CST;
import com.bonc.common.page.Page;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.common.utils.PoiDistanceUtil;
import com.bonc.map.dao.entity.MapInfo;
import com.bonc.map.dao.entity.MapPoi;
import com.bonc.map.dao.mapper.MapIndexMapper;
import com.bonc.map.service.GridCommonService;
import com.bonc.school.service.SchoolIndexService;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysOrgService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

/**
 * 
 * @FileName GridCommonAction.java
 * @Author administration
 * @At 2018年11月16日 上午11:48:56
 * @Desc 网格初始化Action
 */
@Controller
@RequestMapping(value = "/gridCommon")
public class GridCommonAction {

	@Resource
	private GridCommonService gridCommonService;

	@Resource
	private SysOrgService sysOrgService;

	@Autowired
	private SchoolIndexService schoolIndexService;

	@Resource
	private MapIndexMapper mapIndexMapper;

	@RequestMapping(value = "/getLeftTree")
	@ResponseBody
	public JSONArray getLeftTree(HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		JSONArray treeList = new JSONArray();
		if (user != null && !StringUtils.isBlank(user.getOrgId())) {
			String orgId = user.getOrgId();

			SysOrg s = sysOrgService.selectSysOrgById(orgId);
			// s.setTreeCode("/"+orgId);
			SysOrg param = new SysOrg();
			param.setTreeCode(s.getTreeCode());
			List<SysOrg> list = gridCommonService.selectList(param);
			for (SysOrg t : list) {
				JSONObject o = new JSONObject();
				o.put("id", t.getOrgId());
				o.put("pId", t.getPid());
				o.put("name", t.getName());
				o.put("title", "");
				o.put("orglevel", t.getOrgLevel());
				treeList.add(o);
			}
		}
		return treeList;
	}

	/**
	 * 查询当前orgId的子部门地图，当前ORG的orglevel为3时，按照百度地图方式呈现
	 * 
	 * @Title getEmap
	 * @Author administration
	 * @param orgId
	 * @return JSONObject
	 */
	@RequestMapping(value = "/getEmap")
	@ResponseBody
	public JSONObject getEmap(String orgId) {
		JSONObject result = new JSONObject();
		SysOrg sysOrg = sysOrgService.selectSysOrgById(orgId);
		result.put("info", sysOrg);

		List<MapInfo> infoShape = gridCommonService.selectSysOrgPolygon(orgId); // 获得网格轮廓信息

		// 有的是多个区域
		result.put("cp", getCenter(infoShape)); // 添加中心点信息
		int orgLevel = Integer.parseInt(sysOrg.getOrgLevel()) + 1;

		JSONArray features = new JSONArray();
		// 当前点击的是网格
		if (sysOrg.getOrgLevel().equals("4")) {
			JSONObject mpobj = this.toEchartsMap(sysOrg, infoShape);
			features.add(mpobj);
		} else {
			SysOrg param = new SysOrg();
			param.setPid(orgId);
			param.setOrgLevel(String.valueOf(orgLevel)); // 添加父一级别orgId和orgLevel
			List<SysOrg> childrenlist = gridCommonService.selectList(param);
			// List<MapInfo> shape = null;
			JSONObject mpobj = null;
			// 修改
			List<String> list = new ArrayList<String>();
			for (SysOrg c : childrenlist) {
				list.add(c.getOrgId());
			}
			List<MapInfo> shapes = gridCommonService.selectSysOrgPolygons(list);
			List<MapInfo> shape = null;
			for (SysOrg i : childrenlist) {
				for (MapInfo c : shapes) {
					shape = new ArrayList<>();
					if (i.getOrgId().equals(c.getOrgId())) {
						shape.add(c);
						mpobj = this.toEchartsMap(i, shape);
						features.add(mpobj);
					}
				}
			}
		}
		/*
		 * for (SysOrg c : childrenlist) { shape =
		 * gridCommonService.selectSysOrgPolygon(c.getOrgId()); mpobj =
		 * this.toEchartsMap(c, shape); features.add(mpobj); }
		 */
		JSONObject mapObj = new JSONObject();
		mapObj.put("type", "FeatureCollection");
		mapObj.put("features", features);
		result.put("mapObj", mapObj);
		return result;
	}

	/**
	 * 获取中心点信息
	 * 
	 * @Title getCenter
	 * @Author administration
	 * @param shape
	 * @return JSONObject
	 */
	private JSONObject getCenter(List<MapInfo> shape) {
		JSONObject result = new JSONObject();
		double cplng = 0.0;
		double cplat = 0.0;
		int k = 0;
		for (MapInfo s : shape) {
			k += 1;
			cplng += s.getCplng();
			cplat += s.getCplat();
		}
		cplng = cplng / k;
		cplat = cplat / k;
		result.put("cplng", cplng);
		result.put("cplat", cplat);

		return result;
	}

	private JSONObject toBDMap(SysOrg o, List<MapInfo> shape) {
		JSONObject result = new JSONObject();
		result.put("id", o.getOrgId());
		result.put("name", o.getName());
		result.put("orgLevel", o.getOrgLevel());
		JSONArray coordinates = new JSONArray();
		for (MapInfo s : shape) {
			String shp = s.getShape();
			String color = s.getColor();
			JSONObject llo = new JSONObject();
			llo.put("color", color);
			llo.put("shape", shp);
			coordinates.add(llo);
		}
		result.put("coordinates", coordinates);
		return result;
	}

	/**
	 * 
	 * @Title toEchartsMap
	 * @Author xiaogaoxiang
	 * @param o
	 * @param shape
	 * @return JSONObject
	 */
	private JSONObject toEchartsMap(SysOrg o, List<MapInfo> shape) {
		JSONObject result = new JSONObject();
		result.put("type", "Feature");
		JSONArray coordinates = new JSONArray();
		double cplng = 0.0;
		double cplat = 0.0;
		String color = "";
		List<String> shapeInfo = new ArrayList<>();
		for (MapInfo s : shape) {

			String shp = s.getShape();

			cplng += s.getCplng();
			cplat += s.getCplat();
			JSONArray spo = JSONArray.parseArray(shp);

			JSONArray li = new JSONArray();
			for (int i = 0; i < spo.size(); i++) {
				JSONObject llo = spo.getJSONObject(i);
				JSONArray ll = new JSONArray();
				ll.add(llo.getDouble("lng"));
				ll.add(llo.getDouble("lat"));
				li.add(ll);
			}
			shapeInfo.add(shp);
			coordinates.add(li);
			color = s.getColor();
		}

		JSONObject geometry = new JSONObject();
		geometry.put("type", "Polygon");
		geometry.put("coordinates", coordinates);

		JSONObject properties = new JSONObject();
		properties.put("id", o.getOrgId());
		properties.put("name", o.getName());
		properties.put("orgLevel", o.getOrgLevel());
		properties.put("color", color);
		// properties.put("childNum",1);
		JSONArray cp = new JSONArray();
		cplng = cplng / shape.size();
		cplat = cplat / shape.size();
		cp.add(cplng);
		cp.add(cplat);
		properties.put("cp", cp);

		result.put("properties", properties);
		result.put("geometry", geometry);
		result.put("shape", shapeInfo);

		return result;
	}

	@RequestMapping(value = "/getAreaMenu")
	@ResponseBody
	public List<SysOrg> getAreaMenu(String orgId, HttpSession session) {
		List<SysOrg> result = new ArrayList<>();
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String userOrgId = user.getOrgId();
		String tmpId = orgId;
		SysOrg sysOrg = null;
		while (true) {
			sysOrg = sysOrgService.selectSysOrgById(tmpId);
			result.add(sysOrg);
			if (userOrgId.equals(tmpId) || sysOrg.getOrgLevel().equals("1") || StringUtils.isBlank(sysOrg.getPid())) {
				break;
			} else {
				tmpId = sysOrg.getPid();
			}
		}
		return result;
	}

	/**
	 * 初始化查询所有渠道信息（本地数据库查询）
	 * 
	 * @Title selectAllChannelByOrgId
	 * @Author administration
	 * @param orgId
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllChannelByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllChannelByOrgId(String setRange, String uId, String poiInfo, String rangeInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllChannelByOrgId(user, setRange, uId, poiInfo, rangeInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有基站信息（本地数据库查询）
	 * 
	 * @Title selectAllStationByOrgId
	 * @Author administration
	 * @param orgId
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllStationByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllStationByOrgId(String setRange, String uId, String poiInfo, String rangeInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllStationByOrgId(user, setRange, uId, poiInfo, rangeInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有商场，超市信息（本地数据库查询）
	 * 
	 * @Title selectAllMallByOrgId
	 * @Author xiaogaoxiang
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param session
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllMallByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllMallByOrgId(String setRange, String uId, String poiInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllMallByOrgId(user, setRange, uId, poiInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有校园信息（本地数据库查询）
	 * 
	 * @Title selectAllNewSchoolByOrgId
	 * @Author xiaogaoxiang
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param session
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllNewSchoolByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllNewSchoolByOrgId(String setRange, String uId, String poiInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllNewSchoolByOrgId(user, setRange, uId, poiInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有村庄信息（本地数据库查询）
	 * 
	 * @Title selectAllVillageByOrgId
	 * @Author xiaogaoxiang
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param session
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllVillageByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllVillageByOrgId(String setRange, String uId, String poiInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllVillageByOrgId(user, setRange, uId, poiInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有乡镇信息（本地数据库查询）
	 * 
	 * @Title selectAllTownByOrgId
	 * @Author xiaogaoxiang
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param session
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllTownByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllTownByOrgId(String setRange, String uId, String poiInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllTownByOrgId(user, setRange, uId, poiInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有聚类市场信息（本地数据库查询）
	 * 
	 * @Title selectAllMarketByOrgId
	 * @Author xiaogaoxiang
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param session
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllMarketByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllMarketByOrgId(String setRange, String uId, String poiInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllMarketByOrgId(user, setRange, uId, poiInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有AB集团
	 * 
	 * @Title selectAllAbGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @param session
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllAbGroupByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllAbGroupByOrgId(String setRange, String uId, String poiInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllAbGroupByOrgId(user, setRange, uId, poiInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有CD集团
	 * 
	 * @Title selectAllCdGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @param session
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllCdGroupByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllCdGroupByOrgId(String setRange, String uId, String poiInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllCdGroupByOrgId(user, setRange, uId, poiInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有入格小区
	 * 
	 * @Title selectAllCommunityInfoByOrgId
	 * @Author xiaogaoxiang
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @param session
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllCommunityInfoByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllCommunityInfoByOrgId(String setRange, String uId, String poiInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllCommunityInfoByOrgId(user, setRange, uId, poiInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有未入格小区
	 * 
	 * @Title selectAllNonCommunityInfoByOrgId
	 * @Author xiaogaoxiang
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @param session
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllNonCommunityInfoByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllNonCommunityInfoByOrgId(String setRange, String uId, String poiInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllNonCommunityInfoByOrgId(user, setRange, uId, poiInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有未入格AB集团
	 * 
	 * @Title selectAllNonAbGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @param session
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllNonAbGroupByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllNonAbGroupByOrgId(String setRange, String uId, String poiInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllNonAbGroupByOrgId(user, setRange, uId, poiInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有未入格CD集团
	 * 
	 * @Title selectAllNonCdGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @param session
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllNonCdGroupByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllNonCdGroupByOrgId(String setRange, String uId, String poiInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllNonCdGroupByOrgId(user, setRange, uId, poiInfo, orgId);
		return list;
	}

	/**
	 * 查询所有重点小区
	 * 
	 * @Title selectImportantCommunityByOrgId
	 * @Author administration
	 * @param orgId
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllImportantCommunityByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllImportantCommunityByOrgId(String setRange, String uId, String poiInfo, String rangeInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllImportantCommunityByOrgId(user, setRange, uId, poiInfo, rangeInfo, orgId);
		return list;
	}

	/**
	 * 查询所有网格学校
	 * 
	 * @Title selectGridSchoolOrgId
	 * @Author caoxiaojuan
	 * @param orgId
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectGridSchoolOrgId")
	@ResponseBody
	public List<MapPoi> selectGridSchoolOrgId(String setRange, String uId, String poiInfo, String rangeInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectGridSchoolOrgId(user, setRange, uId, poiInfo, rangeInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有写字楼
	 * 
	 * @Title selectAllOfficeBuilding
	 * @Author caoxiaojuan
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @param session
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllOfficeBuildingOrgId")
	@ResponseBody
	public List<MapPoi> selectAllOfficeBuilding(String setRange, String uId, String poiInfo, String rangeInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllOfficeBuildingOrgId(user, setRange, uId, poiInfo, rangeInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有政府单位
	 * 
	 * @Title selectAllGovernmentUnitOrgId
	 * @Author caoxiaojuan
	 * @param setRange
	 * @param uId
	 * @param poiInfo
	 * @param orgId
	 * @param session
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllGovernmentUnitOrgId")
	@ResponseBody
	public List<MapPoi> selectAllGovernmentUnitOrgId(String setRange, String uId, String poiInfo, String rangeInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllGovernmentUnitOrgId(user, setRange, uId, poiInfo, rangeInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有渠道信息（调用中心接口）
	 * 
	 * @Title selectAllChannelInter
	 * @Author administration
	 * @param orgId
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllChannelInter")
	@ResponseBody
	public List<MapPoi> selectAllChannelInter(String orgId) {
		// 接口方式
		List<MapPoi> list = selectAllChannelByInter(orgId);
		return list;
	}

	/**
	 * 初始化查询所有基站信息（调用中心接口）
	 * 
	 * @Title selectAllStationInter
	 * @Author administration
	 * @param orgId
	 * @return String
	 */
	@RequestMapping(value = "/selectAllStationInter")
	@ResponseBody
	public String selectAllStationInter(String orgId) {
		// 查询地市下全部学校的POI，但是输入参数是区县
		String url = "http://10.154.52.159:4002/ressearch/search.spr?method=getResultJson";
		Map<String, Object> param = new HashMap<>();
		param.put("sysId", "1a332d30-9067-4f9e-9b73-a2f608e6477f");
		param.put("categoryId", "b4c597e1-a55e-4906-972f-c2b635ed2c0b");
		param.put("keyWord", "");
		param.put("condition", "[{\"fieldName\":\"org_id\",\"fieldValue\":\"" + orgId + "\"},{\"fieldName\":\"type\",\"fieldValue\":\"BTS\"}]");
		param.put("begin", 0);
		param.put("count", 99999);
		String r = "";
		try {
			r = getPostData(url, param);
			System.out.println("selectAllStation:result::" + r);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return r;
	}

	@RequestMapping(value = "/initSearchName")
	@ResponseBody
	public List<String> initSearchName(String orgId) {
		List<String> list = gridCommonService.initSearchName(orgId);
		return list;
	}

	@RequestMapping(value = "/initSearchPlaceName")
	@ResponseBody
	public List<String> initSearchPlaceName(String orgId, String paramPlace) {
		// 本地方式
		List<String> list = gridCommonService.initSearchPlaceName(orgId, paramPlace);
		return list;
	}

	@RequestMapping(value = "/initSearchPlaceNameInter")
	@ResponseBody
	public List<String> initSearchPlaceNameInter(String orgId, String paramPlace) {
		// 接口方式，调用中兴数据
		List<String> list = searchNameByInter(orgId, paramPlace);
		return list;
	}

	@RequestMapping(value = "/selectSearchList")
	@ResponseBody
	public String selectSearchList(String name, String orgId, Integer page, Integer rows) {
		/* 本地方式 */
		PageHelper.startPage(page, rows);
		List<MapPoi> list = gridCommonService.selectSearchList(name, orgId);
		Page<MapPoi> result = new Page<MapPoi>(new PageInfo<MapPoi>(list));

		return Ajax.responseString(CST.RES_SECCESS, result, true);
	}

	@RequestMapping(value = "/selectSearchListInter")
	@ResponseBody
	public String selectSearchListInter(String name, String orgId, Integer page, Integer rows) {

		/* 接口方式 */
		Page<MapPoi> result = searchListByInter(name, orgId, page, rows);
		return Ajax.responseString(CST.RES_SECCESS, result, true);
	}

	/**
	 * 初始化查询基础单元（本地数据库查询）
	 * 
	 * @Title selectAllPoiByOrgId
	 * @Author administration
	 * @param orgId
	 * @param flag
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllPoiByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllPoiByOrgId(String orgId, String flag) {
		/* 本地方式 */
		long start = System.currentTimeMillis();
		List<MapPoi> list = gridCommonService.selectAllPoiByOrgId(orgId, flag);
		System.out.println("基础单元查询耗时：" + (System.currentTimeMillis() - start) + " 毫秒");
		return list;
	}

	/**
	 * 初始化查询基础单元（调用中心接口）
	 * 
	 * @Title selectAllPoiByOrgIdInter
	 * @Author administration
	 * @param orgId
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllPoiByOrgIdInter")
	@ResponseBody
	public List<MapPoi> selectAllPoiByOrgIdInter(String orgId) {
		/* 接口方式 */
		List<MapPoi> list = searchAoiByInter(orgId, null);
		return list;
	}

	@RequestMapping(value = "/selectAreaShape")
	@ResponseBody
	public List<MapPoi> selectAreaShape(String orgId) {

		return gridCommonService.selectAreaShape(orgId);
	}

	@RequestMapping(value = "/selectHouse", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String, String> selectHouse(String physical_id) {
		Map<String, String> houseMap = gridCommonService.selectHouse(physical_id);
		if (houseMap == null) {
			houseMap = new HashMap<>();
		}
		return houseMap;
	}

	@RequestMapping(value = "/selectSchool", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String, String> selectSchool(String physical_id) {
		Map<String, String> schoolMap = gridCommonService.selectSchool(physical_id);
		if (schoolMap == null) {
			schoolMap = new HashMap<>();
		}
		return schoolMap;
	}

	@RequestMapping(value = "/selectSchoolOrHouse")
	public String selectSchoolOrHouse(String physicalId, String level) {
		String resultString = "/pages/gis/layer/notFound";
		Map<String, String> schoolOrHouse = gridCommonService.selectSchoolOrHouse(physicalId);
		String type = schoolOrHouse.get("BIG_TYPE");
		if ("家居小区".equals(type)) {
			resultString = "/pages/gis/layer/house";
		}
		if ("文化教育".equals(type)) {
			Map<String, Object> inMap = new HashMap<String, Object>();
			inMap.put("schoolId", physicalId);
			Map<String, String> resultMap = schoolIndexService.selectSchoolInfo(inMap);
			if (resultMap == null) {
				resultString = "/pages/gis/school/errorPage";
			} else {
				resultString = "/pages/gis/school/schoolIndex";
			}
		}
		return resultString;
	}

	private final int TIMES = 100000;

	/**
	 * 筛选出所有小区轮廓信息
	 * 
	 * @Title intersectCommunity
	 * @Author xiaogaoxiang
	 * @param polygon_a
	 * @param polygon_b
	 * @param orgId
	 * @param cellId
	 * @return JSONArray
	 */
	@RequestMapping(value = "/intersectCommunity", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public JSONArray intersectCommunity(String polygon_a, String polygon_b, String orgId, String cellId) {
		Area pa = this.str2Pl(polygon_a);
		Area pb = this.str2Pl(polygon_b);

		JSONArray result = new JSONArray();
		pa.intersect(pb);
		// 得到该区县下的所有小区轮廓
		List<MapInfo> ShapeList = this.gridCommonService.getCommunityShapeByGriCode(orgId, cellId);
		for (int i = 0; i < ShapeList.size(); i++) {
			MapInfo mif = ShapeList.get(i);
			String polygon_o = mif.getShape();
			Area pc = this.str2Pl(polygon_o);
			pa.subtract(pc);
		}
		PathIterator iterator = pa.getPathIterator(null);
		float[] floats = new float[6];
		JSONArray pl = new JSONArray();
		while (!iterator.isDone()) {
			int type = iterator.currentSegment(floats);

			float lng = floats[0] / TIMES;
			float lat = floats[1] / TIMES;
			JSONObject o = new JSONObject();
			o.put("lng", lng);
			o.put("lat", lat);

			boolean repeat = false;
			if (pl.size() > 0) {
				JSONObject p = new JSONObject();
				for (int j = 0; j < pl.size(); j++) {

					if ((o.getFloatValue("lng") == pl.getJSONObject(j).getFloat("lng")) && (o.getFloatValue("lat") == pl.getJSONObject(j).getFloat("lat"))) {
						p = pl.getJSONObject(j);
						repeat = true;
					}
				}
				if (!repeat) {
					pl.add(o);
				} else {
					pl.remove(p);
					pl.add(o);
				}

			} else {
				pl.add(o);
			}

			if (type == PathIterator.SEG_CLOSE) {
				if (pl.size() > 2) {
					for (int i = 0; i < pl.size() - 3; i++) {
						float pl1_lng = pl.getJSONObject(i).getFloatValue("lng"); // x1
						float pl1_lat = pl.getJSONObject(i).getFloatValue("lat"); // y1
						float pl2_lng = pl.getJSONObject(i + 1).getFloatValue("lng"); // x2
						float pl2_lat = pl.getJSONObject(i + 1).getFloatValue("lat"); // y2
						float pl3_lng = pl.getJSONObject(i + 2).getFloatValue("lng"); // x3
						float pl3_lat = pl.getJSONObject(i + 2).getFloatValue("lat"); // y3
						if (pl2_lng == pl1_lng) {
							continue;
						}
						float k = (pl2_lat - pl1_lat) / (pl2_lng - pl1_lng);
						// b = y1-k*x1;
						float b = pl1_lat - k * (pl1_lng);
						// t = k*x3 + b;
						float t = k * (pl3_lng) + b;
						if (Math.abs((pl3_lat - t)) > 0.000001) {
							break;
						}
					}
					result.add(pl);
				}

				pl = new JSONArray();
			}
			iterator.next();
		}
		return result;
	}

	/**
	 * 筛选出所有网格轮廓信息
	 * 
	 * @Title intersect
	 * @Author xiaogaoxiang
	 * @param polygon_a
	 * @param polygon_b
	 * @param orgId
	 * @param gridCode
	 * @return
	 * @throws SQLException
	 *             JSONArray
	 */
	@RequestMapping(value = "/intersect", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public JSONArray intersect(String polygon_a, String polygon_b, String orgId, String gridCode) throws SQLException {
		Area pa = this.str2Pl(polygon_a);
		Area pb = this.str2Pl(polygon_b);

		JSONArray result = new JSONArray();
		pa.intersect(pb);
		// 得到该区县下的所有网格
		List<MapInfo> ShapeList = this.gridCommonService.getShapeByGriCode(orgId, gridCode);
		for (int i = 0; i < ShapeList.size(); i++) {
			MapInfo mif = ShapeList.get(i);
			String polygon_o = mif.getShape();
			Area pc = this.str2Pl(polygon_o);
			pa.subtract(pc);
		}
		PathIterator iterator = pa.getPathIterator(null);
		float[] floats = new float[6];
		JSONArray pl = new JSONArray();
		// float lastLng = 0;
		// float lastLat = 0;
		// boolean pflag = false;
		while (!iterator.isDone()) {
			int type = iterator.currentSegment(floats);

			float lng = floats[0] / TIMES;
			float lat = floats[1] / TIMES;
			JSONObject o = new JSONObject();
			o.put("lng", lng);
			o.put("lat", lat);

			boolean repeat = false;
			if (pl.size() > 0) {
				JSONObject p = new JSONObject();
				for (int j = 0; j < pl.size(); j++) {
					// System.out.println(pl.getJSONObject(j).getFloat("lng"));
					// System.out.println(pl.getJSONObject(j).getFloat("lat"));
					// System.out.println(o.getFloatValue("lng"));
					// System.out.println(o.getFloatValue("lat"));

					if ((o.getFloatValue("lng") == pl.getJSONObject(j).getFloat("lng")) && (o.getFloatValue("lat") == pl.getJSONObject(j).getFloat("lat"))) {
						p = pl.getJSONObject(j);
						repeat = true;
					}
				}
				if (!repeat) {
					pl.add(o);
				} else {
					pl.remove(p);
					pl.add(o);
				}

			} else {
				pl.add(o);
			}

			if (type == PathIterator.SEG_CLOSE) {
				if (pl.size() > 2) {
					for (int i = 0; i < pl.size() - 3; i++) {
						float pl1_lng = pl.getJSONObject(i).getFloatValue("lng"); // x1
						float pl1_lat = pl.getJSONObject(i).getFloatValue("lat"); // y1
						float pl2_lng = pl.getJSONObject(i + 1).getFloatValue("lng"); // x2
						float pl2_lat = pl.getJSONObject(i + 1).getFloatValue("lat"); // y2
						float pl3_lng = pl.getJSONObject(i + 2).getFloatValue("lng"); // x3
						float pl3_lat = pl.getJSONObject(i + 2).getFloatValue("lat"); // y3
						if (pl2_lng == pl1_lng) {
							continue;
						}
						float k = (pl2_lat - pl1_lat) / (pl2_lng - pl1_lng);
						// b = y1-k*x1;
						float b = pl1_lat - k * (pl1_lng);
						// t = k*x3 + b;
						float t = k * (pl3_lng) + b;
						if (Math.abs((pl3_lat - t)) > 0.000001) {
							break;
						}
					}
					result.add(pl);
				}

				pl = new JSONArray();
			}
			iterator.next();
		}
		return result;
	}

	private Area str2Pl(String plJson) {
		Polygon pl = new Polygon();

		JSONArray p = JSONArray.parseArray(plJson);
		for (int i = 0; i < p.size(); i++) {
			JSONObject o = p.getJSONObject(i);
			double lng = o.getDoubleValue("lng");
			double lat = o.getDoubleValue("lat");
			pl.addPoint((int) (lng * TIMES), (int) (lat * TIMES));
		}
		return new Area(pl);
	}

	@RequestMapping(value = "/selectPoiByUid")
	@ResponseBody
	public MapPoi selectPoiByUid(String uid) {

		return gridCommonService.selectPoiByUid(uid);
	}

	@RequestMapping(value = "/convexHull")
	@ResponseBody
	public static JSONArray convexHull(String pointsStr) { // point :
															// [{"lng":123.12,"lat":23.433},{"lng":"124.44","lat":22.55}]
		JSONArray points = JSONArray.parseArray(pointsStr);

		JSONArray result = new JSONArray();
		if (points.size() < 4) {
			return points;
		}
		// 先找到初始点 ，Y最小 的情况下,X最小
		double startLat = Double.MAX_VALUE;
		double startLng = Double.MAX_VALUE;
		for (int i = 0; i < points.size(); i++) {
			JSONObject point = points.getJSONObject(i);
			double lng = point.getDoubleValue("lng");
			double lat = point.getDoubleValue("lat");
			if (startLat > lat) {
				startLat = lat;
				startLng = lng;

			} else if (startLat == lat) {
				if (startLng > lng) {
					startLng = lng;
				}
			}
		}
		JSONObject startPoint = new JSONObject();
		startPoint.put("lng", startLng);
		startPoint.put("lat", startLat);
		result.add(startPoint);

		// 判断线段起点与其他点的夹角，取最小夹角，作为新的起始点
		double aLng = startLng;
		double aLat = startLat;

		int lastArea = 0;

		while (true) {
			double zLng = 0.0;
			double zLat = 0.0;
			double lineLength = 0.0;
			int areaNum = 5;
			for (int j = 0; j < points.size(); j++) {
				JSONObject point = points.getJSONObject(j);
				double lng = point.getDoubleValue("lng");
				double lat = point.getDoubleValue("lat");
				int pAreaNum = 0;
				if (lng == aLng && lat == aLat) { // 当前点与线段起点重合，不计算。
					continue;
				}

				if (lng >= aLng && lat >= aLat) {
					pAreaNum = 1;
				} else if (lng < aLng && lat >= aLat) {
					pAreaNum = 2;
				} else if (lng <= aLng && lat < aLat) {
					pAreaNum = 3;
				} else if (lng > aLng && lat < aLat) {
					pAreaNum = 4;
				}
				double length = (lng - aLng) * (lng - aLng) + (lat - aLat) * (lat - aLat);
				if (pAreaNum < lastArea) {
					continue;
				}

				if (lineLength == 0.0) { // 第一个点，不需要比较;
					zLng = lng;
					zLat = lat;
					lineLength = length;
					areaNum = pAreaNum;
					continue;
				}
				if (pAreaNum > areaNum) {// 当前点对比临时z所在象限要大，那么夹角就一定会大，直接舍去
					continue;
				} else if (pAreaNum < areaNum) { // 象限已经比临时z要小了，夹角必然小，不用比较其他了
					zLng = lng;
					zLat = lat;
					lineLength = length;
					areaNum = pAreaNum;
					continue;
				}
				// 相同象限的情况
				if ((zLat - aLat) * (lng - aLng) > (lat - aLat) * (zLng - aLng)) {// 新的点比已保存的点夹角小
					zLng = lng;
					zLat = lat;
					lineLength = length;
					areaNum = pAreaNum;
				} else if ((zLat - aLat) * (lng - aLng) == (lat - aLat) * (zLng - aLng)) { // 相同夹角，线段长度大的代替小的
					if (length > lineLength) {
						zLng = lng;
						zLat = lat;
						lineLength = length;
						areaNum = pAreaNum;
					}
				}
			}

			JSONObject tmpoint = new JSONObject();
			tmpoint.put("lng", zLng);
			tmpoint.put("lat", zLat);
			result.add(tmpoint);
			lastArea = areaNum;
			aLng = zLng;
			aLat = zLat;
			if (zLng == startLng && zLat == startLat) { // 和起始点一样，绕了一圈
				break;
			}

		}
		return result;

	}

	@RequestMapping(value = "/initSchoolName")
	@ResponseBody
	public List<String> initSchoolName(String orgId) { // 查询地市下的全部学校，但是输入参数是区县
		SysOrg sysOrg = sysOrgService.selectSysOrgById(orgId);
		List<MapPoi> tlist = gridCommonService.selectSchoolPoi(null, sysOrg.getPid());
		List<String> list = new ArrayList<>();
		for (MapPoi p : tlist) {
			list.add(p.getName());
		}
		return list;
	}

	@RequestMapping(value = "/selectSchoolList")
	@ResponseBody
	public String selectSchoolList(String name, String orgId, Integer page, Integer rows) {
		SysOrg sysOrg = sysOrgService.selectSysOrgById(orgId);
		PageHelper.startPage(page, rows);
		List<MapPoi> list = gridCommonService.selectSchoolPoi(name, sysOrg.getPid());
		Page<MapPoi> result = new Page<MapPoi>(new PageInfo<MapPoi>(list));
		return Ajax.responseString(CST.RES_SECCESS, result, true);
	}

	/**
	 * 查询地市下全部学校的POI，但是输入参数是区县
	 * 
	 * @Title selectAllSchoolPoiByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllSchoolPoiByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllSchoolPoiByOrgId(String orgId) {
		SysOrg sysOrg = sysOrgService.selectSysOrgById(orgId);
		return gridCommonService.selectSchoolPoi(null, sysOrg.getPid());
	}

	@RequestMapping(value = "/selectCityShape")
	@ResponseBody
	public List<MapPoi> selectCityShape(String orgId) {
		SysOrg sysOrg = sysOrgService.selectSysOrgById(orgId);
		return gridCommonService.selectAreaShape(sysOrg.getPid());
	}

	private List<String> searchNameByInter(String orgId, String paramPlace) {
		List<String> list = new ArrayList<>();
		paramPlace = paramPlace.trim();
		if (paramPlace.equals("")) {
			return list;
		}
		String url = "http://10.154.52.159:4002/ressearch/search.spr?method=getGuide";
		Map<String, Object> param = new HashMap<>();
		param.put("sysId", "1a332d30-9067-4f9e-9b73-a2f608e6477f");
		param.put("categoryId", "b4c597e1-a55e-4906-972f-c2b635ed2c0b");
		param.put("keyWord", paramPlace);
		param.put("condition", "[{\"fieldName\":\"org_id\",\"fieldValue\":\"" + orgId + "\"}]");
		String r = "";
		try {
			r = getPostData(url, param);
			System.out.println("searchNameByInter:result::" + r);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (!"".equals(r)) {
			JSONObject j = JSONObject.parseObject(r);
			JSONArray row = j.getJSONArray("rows");
			for (int i = 0; i < row.size(); i++) {
				String name = row.getJSONObject(i).getString("name");
				list.add(name);
				if (i == 4) {// 只显示5条
					break;
				}
			}
		}
		return list;
	}

	private Page<MapPoi> searchListByInter(String name, String orgId, Integer page, Integer rows) {
		Page<MapPoi> list = new Page<>();
		name = name.trim();
		String url = "http://10.154.52.159:4002/ressearch/search.spr?method=getResultJson";
		Map<String, Object> param = new HashMap<>();
		param.put("sysId", "1a332d30-9067-4f9e-9b73-a2f608e6477f");
		param.put("categoryId", "b4c597e1-a55e-4906-972f-c2b635ed2c0b");
		param.put("keyWord", name);
		param.put("condition", "[{\"fieldName\":\"org_id\",\"fieldValue\":\"" + orgId + "\"}]");
		param.put("begin", (page - 1) * rows);
		param.put("count", rows);
		String r = "";
		try {
			r = getPostData(url, param);
			System.out.println("searchListByInter:result::" + r);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (r.equals("")) {
			return list;
		}
		JSONObject obj = JSONObject.parseObject(r);
		list.setPage(page);
		list.setPageSize(rows);
		// 总记录数
		long records = obj.getLongValue("total");
		list.setRecords(records);
		// 总页数
		Integer total = (int) (records % rows == 0 ? records / rows : (records / rows + 1));
		list.setTotal(total);
		JSONArray results = obj.getJSONArray("results");
		List<MapPoi> poiList = new ArrayList<>();
		for (int i = 0; i < results.size(); i++) {
			JSONObject poiObj = results.getJSONObject(i);
			MapPoi poi = new MapPoi();
			String address = "";
			String uid = "";
			String pname = poiObj.getString("name");
			String type = poiObj.getString("type");
			if ("CHNL".equals(type)) {
				type = "CHANNEL";
				uid = poiObj.getString("chnl_code");
			} else if ("BTS".equals(type)) {
				type = "STATION";
				uid = poiObj.getString("lac_id") + poiObj.getString("cell_id");
			} else if ("POI".equals(type)) {
				address = poiObj.getString("address");
				uid = poiObj.getString("uid_");
				List<MapPoi> idxNumList = gridCommonService.selectAoiIdxNum(orgId, uid);
				if (idxNumList.size() > 0) {
					poi.setIndexNum(idxNumList.get(0).getIndexNum());
				}
				String is_has_aoi = poiObj.getString("is_has_aoi");
				if ("1".equals(is_has_aoi)) {
					List<MapPoi> aoiList = searchAoiByInter(orgId, uid);
					if (aoiList.size() > 0) {
						MapPoi aoi = aoiList.get(i);
						poi.setShape(aoi.getShape());
					}
				}
			}

			Double lng = poiObj.getDouble("x");
			Double lat = poiObj.getDouble("y");

			poi.setAddr(address);
			poi.setName(pname);
			poi.setLng(lng);
			poi.setLat(lat);
			poi.setUid(uid);
			poi.setType(type);
			poiList.add(poi);

			// NAME, UID, IMAGEURL,LNG,LAT,ADDR,TAG,SHAPE,TYPE
		}
		list.setRows(poiList);
		return list;
	}

	private List<MapPoi> selectAllChannelByInter(String orgId) {
		List<MapPoi> list = new ArrayList<>();
		String url = "http://10.154.52.159:4002/ressearch/search.spr?method=getResultJson";
		Map<String, Object> param = new HashMap<>();
		param.put("sysId", "1a332d30-9067-4f9e-9b73-a2f608e6477f");
		param.put("categoryId", "b4c597e1-a55e-4906-972f-c2b635ed2c0b");
		param.put("keyWord", "");
		param.put("condition", "[{\"fieldName\":\"org_id\",\"fieldValue\":\"" + orgId + "\"},{\"fieldName\":\"type\",\"fieldValue\":\"CHNL\"}]");
		param.put("begin", 0);
		param.put("count", 999999);
		String r = "";
		try {
			r = getPostData(url, param);
			System.out.println("selectAllChannelByInter:result::" + r);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (r.equals("")) {
			return list;
		}
		JSONObject obj = JSONObject.parseObject(r);
		JSONArray results = obj.getJSONArray("results");

		for (int i = 0; i < results.size(); i++) {
			JSONObject o = results.getJSONObject(i);
			String uid = o.getString("chnl_code");
			String name = o.getString("name");
			Double lng = o.getDouble("x");
			Double lat = o.getDouble("y");
			MapPoi poi = new MapPoi();
			poi.setName(name);
			poi.setUid(uid);
			poi.setLng(lng);
			poi.setLat(lat);
			list.add(poi);
		}

		return list;
	}

	private List<MapPoi> selectAllStationByInter(String orgId) {
		List<MapPoi> list = new ArrayList<>();
		String url = "http://10.154.52.159:4002/ressearch/search.spr?method=getResultJson";
		Map<String, Object> param = new HashMap<>();
		param.put("sysId", "1a332d30-9067-4f9e-9b73-a2f608e6477f");
		param.put("categoryId", "b4c597e1-a55e-4906-972f-c2b635ed2c0b");
		param.put("keyWord", "");
		param.put("condition", "[{\"fieldName\":\"org_id\",\"fieldValue\":\"" + orgId + "\"},{\"fieldName\":\"type\",\"fieldValue\":\"BTS\"}]");
		param.put("begin", 0);
		param.put("count", 99999);
		String r = "";
		try {
			r = getPostData(url, param);
			System.out.println("selectAllStationByInter:result::" + r);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (r.equals("")) {
			return list;
		}
		JSONObject obj = JSONObject.parseObject(r);
		JSONArray results = obj.getJSONArray("results");

		for (int i = 0; i < results.size(); i++) {
			JSONObject o = results.getJSONObject(i);
			String uid = o.getString("lac_id") + o.getString("cell_id");
			String name = o.getString("name");
			Double lng = o.getDouble("x");
			Double lat = o.getDouble("y");
			MapPoi poi = new MapPoi();
			poi.setName(name);
			poi.setUid(uid);
			poi.setLng(lng);
			poi.setLat(lat);
			list.add(poi);
		}

		return list;
	}

	/**
	 * 调用中心接口初始化查询基础单元信息
	 * 
	 * @param orgId
	 * @param uid
	 * @return
	 */
	private List<MapPoi> searchAoiByInter(String orgId, String uid) {

		Map<String, Integer> idxMap = new HashMap<>();
		//
		List<MapPoi> list = new ArrayList<>();
		String url = "http://10.154.52.159:4000/portal/zgspapi/geometryManager/getGeometryData";
		Map<String, Object> param = new HashMap<>();
		// param.put("extent", "{rings:[]}");
		// param.put("geoType", "GeometryTypePolygon");
		param.put("tbName", "map_aoi");
		if (uid != null) {
			param.put("where", "uid_='" + uid + "'");

		} else {
			param.put("where", "dcode='" + orgId + "'");
			List<MapPoi> idxNumList = gridCommonService.selectAoiIdxNum(orgId, uid);
			for (MapPoi poi : idxNumList) {
				idxMap.put(poi.getUid(), poi.getIndexNum());
			}
		}
		param.put("isReturnGeometry", "true");
		param.put("coorSystem", 5);
		Map<String, Object> data = new HashMap<>();
		data.put("data", JSONObject.toJSONString(param));
		String r = "";
		try {
			r = getPostData(url, data);
			System.out.println("searchAoiByInter:result::" + r);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (r.equals("")) {
			return list;
		}
		JSONObject o = JSONObject.parseObject(r);
		JSONArray l = o.getJSONArray("data");

		for (int i = 0; i < l.size(); i++) {
			MapPoi poi = new MapPoi();
			JSONArray shape = new JSONArray();
			JSONObject obj = l.getJSONObject(i);
			JSONArray rings = obj.getJSONObject("geometry").getJSONArray("rings").getJSONArray(0);
			for (int j = 0; j < rings.size(); j++) {
				JSONArray ll = rings.getJSONArray(j);
				JSONObject llo = new JSONObject();
				llo.put("lng", ll.getDouble(0));
				llo.put("lat", ll.getDouble(1));
				shape.add(llo);
			}
			poi.setShape(shape.toJSONString());
			JSONObject attributes = obj.getJSONObject("attributes");
			String name = attributes.getString("NAME");
			Double clng = attributes.getDouble("CENTER_XBD");
			Double clat = attributes.getDouble("CENTER_YBD");
			poi.setName(name);
			poi.setLng(clng);
			poi.setLat(clat);

			String uid_ = attributes.getString("UID_");
			poi.setUid(uid_);
			Integer idxNum = idxMap.get(uid_);
			if (idxNum == null) {
				idxNum = 0;
			}
			poi.setIndexNum(idxNum);

			list.add(poi);
		}

		return list;
	}

	private String getPostData(String urlStr, Map<String, Object> params) throws Exception {
		URL url = new URL(urlStr);
		// post参数

		// 开始访问
		StringBuilder postData = new StringBuilder();
		for (Map.Entry<String, Object> param : params.entrySet()) {
			if (postData.length() != 0)
				postData.append('&');
			postData.append(URLEncoder.encode(param.getKey(), "UTF-8"));
			postData.append('=');
			postData.append(URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8"));
		}
		byte[] postDataBytes = postData.toString().getBytes("UTF-8");

		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setConnectTimeout(100000);
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		conn.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
		conn.setDoOutput(true);
		conn.getOutputStream().write(postDataBytes);

		Reader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

		StringBuilder sb = new StringBuilder();
		for (int c; (c = in.read()) >= 0;)
			sb.append((char) c);
		String response = sb.toString();

		in.close();

		return response;
	}

	/**
	 * 初始化获取网格信息
	 * 
	 * @Title initGridInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return JSONArray
	 */
	@RequestMapping(value = "/initGridInfo")
	@ResponseBody
	public JSONArray initGridInfo(String orgId) {
		List<SysOrg> gridMapList = gridCommonService.selectGridInfoByPid(orgId);
		JSONArray result = JSONArray.parseArray(JSON.toJSONString(gridMapList));
		return result;
	}

	public static void main(String[] args) {
		// searchListByInter("城北芙蓉区喜来指定专营店","A31K",1,10);
		// searchAoiByInter("A31K","55fa2c0b24683c2d1ce99937");
		// selectAllChannelByInter("A31K");

		// selectAllStationByInter("A31K");

		// searchNameByInter("A31K", "王府花园");
		// searchListByInter("王府花园", "A31K", 1, 10);
		// searchAoiByInter("A31K", null);
		new GridCommonAction().toBDMap(null, null);
		new GridCommonAction().selectAllStationByInter(null);
	}

	/**
	 * 初始化查询所有未入格渠道信息（本地数据库查询）
	 * 
	 * @Title selectNonChannelByOrgId
	 * @Author administration
	 * @param orgId
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllNonChannelByOrgId")
	@ResponseBody
	public List<MapPoi> selectNonChannelByOrgId(String setRange, String uId, String poiInfo, String rangeInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllNonChannelByOrgId(user, setRange, uId, poiInfo, rangeInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有未入格小区信息（本地数据库查询）
	 * 
	 * @Title selectAllChannelByOrgId
	 * @Author administration
	 * @param orgId
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllNonCommunityByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllNonCommunityByOrgId(String setRange, String uId, String poiInfo, String rangeInfo, String orgId, HttpSession session) {
		// 获取session用户，获取orgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 本地查询数据库方式
		List<MapPoi> list = gridCommonService.selectAllNonCommunityByOrgId(user, setRange, uId, poiInfo, rangeInfo, orgId);
		return list;
	}

	/**
	 * 初始化查询所有未入格基站信息
	 * 
	 * @Title selectAllNonStationByOrgId
	 * @Author administration
	 * @param orgId
	 * @return List<MapPoi>
	 */
	@RequestMapping(value = "/selectAllNonStationByOrgId")
	@ResponseBody
	public List<MapPoi> selectAllNonStationByOrgId(String setRange, String uId, String poiInfo, String rangeInfo, String orgId, HttpSession session) {
		// 鑾峰彇session鐢ㄦ埛锛岃幏鍙杘rgId
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 鏈湴鏌ヨ鏁版嵁搴撴柟寮�
		List<MapPoi> list = gridCommonService.selectAllNonStationByOrgId(user, setRange, uId, poiInfo, rangeInfo, orgId);
		return list;
	}

	/**
	 * 
	 * 网格划配判断是否被占用 0,可以修改，1，不可以
	 * 
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/isChanged", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getGridTeamInfo(HttpSession session, String orgId) {
		try {
			List<MapInfo> mapinfo = gridCommonService.getMapper().selectGridDetail(orgId);
			return Ajax.responseString(CST.RES_SECCESS, mapinfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "网格团队信息查询失败！");
		}
	}

	@RequestMapping(value = "/getAround", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getAround(HttpSession session, double lat, double lon, int raidus) {
		try {
			double[] round = PoiDistanceUtil.getAround(lat, lon, raidus);
			return Ajax.responseString(CST.RES_SECCESS, round);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "");
		}
	}

	@RequestMapping(value = "/getStationByShape", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getStationByShape(String orgId, String maxLng, String maxLat, String minLng, String minLat) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);
		List<Map<String, Object>> channelList = mapIndexMapper.getStationByShape(param);
		String json = JSONObject.toJSONString(channelList);
		return json;
	}
	
	@RequestMapping(value = "/getDataByShapeList", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getDataByShapeList(String json,int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
	
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
//		// 当选择的是地市
//		if (StringUtils.isNotBlank(params.get("city").toString())) {
//			// 将地市编码5位转为3位
//			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("city").toString());
//			params.remove("city");
//			params.put("city", orgIdMap.get("OLD_ORG_ID"));
//		}
		PageHelper.startPage(page, rows);
		com.github.pagehelper.Page<Map<String, Object>> tableInfoList = null;
		tableInfoList = (com.github.pagehelper.Page<Map<String, Object>>) mapIndexMapper.getDataByShapeList(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		return tableInfoJqGrid;
	}
	
	@RequestMapping(value = "/getImportantCommunityByShape", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getImportantCommunityByShape(String orgId, String maxLng, String maxLat, String minLng, String minLat) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);
		List<Map<String, Object>> channelList = mapIndexMapper.getImportantCommunityByShape(param);
		String json = JSONObject.toJSONString(channelList);
		return json;
	}
	
	@RequestMapping(value = "/getCommunityByShape", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getCommunityByShape(String orgId, String maxLng, String maxLat, String minLng, String minLat) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);
		List<Map<String, Object>> channelList = mapIndexMapper.getCommunityByShape(param);
		String json = JSONObject.toJSONString(channelList);
		return json;
	}

	@RequestMapping(value = "/getNonCommunityByShape", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getNonCommunityByShape(String orgId, String maxLng, String maxLat, String minLng, String minLat) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);
		List<Map<String, Object>> channelList = mapIndexMapper.getNonCommunityByShape(param);
		String json = JSONObject.toJSONString(channelList);
		return json;
	}
	
	
	@RequestMapping(value = "/getAllABGroupByShape", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getAllABGroupByShape(String orgId, String maxLng, String maxLat, String minLng, String minLat) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);
		List<Map<String, Object>> channelList = mapIndexMapper.getAllABGroupByShape(param);
		String json = JSONObject.toJSONString(channelList);
		return json;
	}
	
	@RequestMapping(value = "/getAllCDGroupByShape", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getAllCDGroupByShape(String orgId, String maxLng, String maxLat, String minLng, String minLat) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);
		List<Map<String, Object>> channelList = mapIndexMapper.getAllCDGroupByShape(param);
		String json = JSONObject.toJSONString(channelList);
		return json;
	}
	
	@RequestMapping(value = "/getNonABGroupByShape", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getNonABGroupByShape(String orgId, String maxLng, String maxLat, String minLng, String minLat) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);
		List<Map<String, Object>> channelList = mapIndexMapper.getNonABGroupByShape(param);
		String json = JSONObject.toJSONString(channelList);
		return json;
	}

	@RequestMapping(value = "/getNonCDGroupByShape", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getNonCDGroupByShape(String orgId, String maxLng, String maxLat, String minLng, String minLat) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);
		List<Map<String, Object>> channelList = mapIndexMapper.getNonCDGroupByShape(param);
		String json = JSONObject.toJSONString(channelList);
		return json;
	}
	
	@RequestMapping(value = "/getGridSchoolByShape", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getGridSchoolByShape(String orgId, String maxLng, String maxLat, String minLng, String minLat) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);
		List<Map<String, Object>> channelList = mapIndexMapper.getGridSchoolByShape(param);
		String json = JSONObject.toJSONString(channelList);
		return json;
	}
	
	@RequestMapping(value = "/getOfficeBuildingByShape", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getOfficeBuildingByShape(String orgId, String maxLng, String maxLat, String minLng, String minLat) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);
		List<Map<String, Object>> channelList = mapIndexMapper.getOfficeBuildingByShape(param);
		String json = JSONObject.toJSONString(channelList);
		return json;
	}
	
	@RequestMapping(value = "/getGovernmentUnitByShape", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getGovernmentUnitByShape(String orgId, String maxLng, String maxLat, String minLng, String minLat) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);
		List<Map<String, Object>> channelList = mapIndexMapper.getGovernmentUnitByShape(param);
		String json = JSONObject.toJSONString(channelList);
		return json;
	}
	/**
	 * 查询渠道
	 * 
	 * @Title getChannelByShape
	 * @Author xiaogaoxiang
	 * @param chnlCode
	 * @param maxLng
	 * @param maxLat
	 * @param minLng
	 * @param minLat
	 * @return String
	 */
	@RequestMapping(value = "/getChannelByShape", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getChannelByShape(String orgId, String maxLng, String maxLat, String minLng, String minLat) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);
		List<Map<String, Object>> channelList = mapIndexMapper.getChannelByShape(param);
		String json = JSONObject.toJSONString(channelList);
		return json;
	}

	@RequestMapping(value = "/getSmallArea", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getSmallArea(String orgId) {

		List<Map<String, Object>> list = gridCommonService.getSmallArea(orgId);
		String json = JSONObject.toJSONString(list);
		return json;
	}


/**
 * 精准定位报表导出
 * 
 * @Title exportDataByShapeList
 * @Author caoxiaojuan
 * @param response
 * @param request
 * @param session
 *            void
 */
@RequestMapping(value = "/exportDataByShapeList", method = RequestMethod.POST)
public void exportewxfybinfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
	//SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
	String flag = request.getParameter("flag");
	String orgId = request.getParameter("orgId");
	String maxLng = request.getParameter("maxLng");
	String maxLat = request.getParameter("maxLat");
	String minLng = request.getParameter("minLng");
	String minLat = request.getParameter("minLat");
	try {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);  
		param.put("flag", flag);
		response.reset();
//		if(flag.equals(""))){
//			
//		}else if(){
//			
//		}else if(){
//			
//		}else if(){
//			
//		}else if(){
//			
//		}else if(){
//			
//		}else if(){
//			
//		}
		String exportName = "任务下发月报报表导出";
		// 设置响应的编码
		response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
		response.setCharacterEncoding("utf-8");
		// 设置浏览器响应头对应的Content-disposition
		response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
		// 输出流
		ServletOutputStream outputStream = response.getOutputStream();
		// 导出报表

//		rptFirstPageThreeService.exportRwxfybInfo(user, params, outputStream, session);
		if (outputStream != null) {
			outputStream.close();
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
}

}
