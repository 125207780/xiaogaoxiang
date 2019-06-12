package com.bonc.map.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.common.utils.DateUtils;
import com.bonc.common.utils.MD5Util;
import com.bonc.common.utils.PolygonUtil;
import com.bonc.gridinfo.dao.entity.StationInfo;
import com.bonc.gridinfo.service.StationInfoService;
import com.bonc.map.dao.entity.DirectSaleUserInfo;
import com.bonc.map.dao.entity.MapInfo;
import com.bonc.map.dao.entity.MapPoi;
import com.bonc.map.dao.entity.MarketManager;
import com.bonc.map.dao.entity.OrgDetail;
import com.bonc.map.dao.mapper.MapIndexMapper;
import com.bonc.map.service.i.MapIndexServiceI;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysOrgService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Service
@Transactional(rollbackFor = Exception.class)
public class MapIndexService implements MapIndexServiceI {

	// 默认密码
	private final String defaultPassword = "123456";

	@Resource
	private MapIndexMapper mapIndexMapper;

	@Resource
	private SysOrgService sysOrgService;

	@Resource
	private StationInfoService stationInfoService;

	@Resource
	private GridCommonService gridCommonService;

	@Resource
	private FirstPageThreeService firstPageThreeService;

	public List<String> selectByOrgId(String orgId) {
		List<String> districtArray = new ArrayList<String>();
		List<MapPoi> list = mapIndexMapper.selectByOrgId(orgId);
		for (MapPoi mapIndex : list) {
			districtArray.add(mapIndex.getName());
		}
		return districtArray;
	}

	public List<MapPoi> selectByTextLabel(String textLabel, String orgId) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("name", textLabel);
		map.put("orgId", orgId);
		return mapIndexMapper.selectByTextLabel(map);
	}

	public List<MapPoi> selectAllShapeByOrgId(String orgId) {
		return mapIndexMapper.selectAllShapeByOrgId(orgId);
	}

	public List<MapPoi> selectShapeByOrgId(String orgId, double minlng, double maxlng, double minlat, double maxlat) {
		Map<String, Object> param = new HashMap<>();
		param.put("orgId", orgId);
		param.put("minlng", minlng);
		param.put("maxlng", maxlng);
		param.put("minlat", minlat);
		param.put("maxlat", maxlat);
		return mapIndexMapper.selectShapeByOrgId(param);
	}

	public List<Map<String, Object>> selectUser(String userType, String orgId) {
		int usertype = Integer.parseInt(userType);
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("orgId", orgId);
		param.put("userType", usertype);
		return mapIndexMapper.selectUser(param);
	}

	public List<Map<String, Object>> initsale_user(String userType, String orgId) {
		Map<String, String> param = new HashMap<String, String>();
		param.put("orgId", orgId);
		param.put("userType", userType);
		return mapIndexMapper.initsale_user(param);
	}

	public List<Map<String, Object>> selectUsers(String userType, String orgId) {
		Map<String, String> param = new HashMap<String, String>();
		param.put("orgId", orgId);
		param.put("userType", userType);
		return mapIndexMapper.selectUsers(param);
	}

	public List<Map<String, Object>> selectType() {
		return mapIndexMapper.selectType();
	}

	/**
	 * 导入基站excel保存
	 * 
	 * @Title stationCreate
	 * @Author xiaogaoxiang
	 * @param record
	 * @param user
	 * @return
	 * @throws NoSuchAlgorithmException
	 *             String
	 */
	public String stationCreate(Map<String, String> record, SysUser user) throws NoSuchAlgorithmException {

		// 1、判断上传的excel基站，是否网格不为空，必须全部为空才能继续下一步操作
		// 2、将网格信息根据操作人所属的组织，将网格划分到该组织下，获取网格的组织编码orgId
		// 3、保存网格信息
		// 4、通过网格信息返回的Org_Id，将基站信息表内的GRID_CODE字段进行更新
		// 获取excel基站表信息
		String gridInfos = record.get("stationInfoList");
		// 获取传过来的归属网格信息
		String gridName = record.get("gridName");
		// 根据传过来的excel基站表信息，通过Gson来解析成基站对象集合
		List<StationInfo> stationInfoList = new Gson().fromJson(gridInfos, new TypeToken<List<StationInfo>>() {
		}.getType());

		// 封装网格组织对象集合
		SysOrg sysOrg = new SysOrg();
		sysOrg.setPid(user.getOrgId());
		sysOrg.setName(gridName);
		// 根据当前登录人组织编码，查询该组织下的基站的最大编码
		SysOrg sysOrgPid = sysOrgService.selectMaxDisplayOrderSysOrgInfo(user.getOrgId());
		if (null != sysOrgPid)
			sysOrg.setDisplayOrder(String.valueOf(Integer.valueOf(sysOrgPid.getDisplayOrder()) + 1));
		else
			sysOrg.setDisplayOrder("1");
		sysOrg.setOrgLevel("4");
		// 保存网格组织对象信息
		sysOrgService.insertSysOrg(sysOrg);

		// 定义Shape，作为设置最大最小经纬度，中心经纬度的拼接字符串
		StringBuffer shapeInfo = new StringBuffer("[");
		for (int i = 0; i < stationInfoList.size(); i++) {
			if (gridName.equals(stationInfoList.get(i).getGridName())) {
				shapeInfo.append("{\"lng\":" + stationInfoList.get(i).getStationLon() + ",\"lat\":" + stationInfoList.get(i).getStationLat() + "},");
			}
		}
		StringBuffer shape = new StringBuffer(shapeInfo.substring(0, shapeInfo.length() - 1));
		shape.append("]");
		// 初始化网格信息集合对象
		Map<String, Object> mapInfo = new HashMap<String, Object>();
		mapInfo.put("orgId", sysOrg.getOrgId());
		mapInfo.put("shape", shape.toString());
		mapInfo.put("color", "#995cb0");
		// 调用获取最大最小经纬度，中心经纬度的封装方法
		setShapeMM(shape.toString(), mapInfo);
		// 调用方法保存网格信息，网格组织对象新增成功后，保存网格信息，将所属网格下的基站给保存进去
		mapIndexMapper.insertMapInfo(mapInfo);

		// 根据导入的excel，将有划分归属网格的基站，更新他们的网格编码（这是一句说明语句）
		// 初始化基站信息表集合对象
		List<StationInfo> stationInfoLists = new ArrayList<>();
		StationInfo stationInfo = null;
		for (StationInfo si : stationInfoList) {
			// 判断哪些是等于页面选择的归属网格的基站信息
			if (gridName.equals(si.getGridName())) {
				stationInfo = new StationInfo();
				stationInfo.setStationCode(si.getStationCode());
				stationInfo.setStationName(si.getStationName());
				stationInfo.setGridCode(sysOrg.getOrgId());
				stationInfo.setGridName(sysOrg.getName());
				stationInfo.setStationLon(si.getStationLon());
				stationInfo.setStationLat(si.getStationLat());
				stationInfoLists.add(stationInfo);
			}
		}
		// 更新基站信息
		stationInfoService.updateStationInfoGridCode(stationInfoLists);

		// 定义OA用户map
		Map<String, String> OAmap = new HashMap<String, String>();
		// 定义系统用户map
		Map<String, Object> mapUser = new HashMap<String, Object>();
		// 定义Set集合，将loginid去重，存储在 sys_user系统登陆表中
		Set<Object> setOa = new TreeSet<Object>();

		// 网格经理 3
		if (StringUtils.isNotEmpty(record.get("mapManagerlist"))) {
			System.out.println(record.get("mapManagerlist"));
			if (record.get("mapManagerlist").startsWith("A:")) {
				String[] mapManagerlists = record.get("mapManagerlist").split(":")[1].split(",");
				for (int i = 0; i < mapManagerlists.length; i++) {
					String mapLoginid = mapManagerlists[i].trim();
					setOa.add(mapLoginid);
				}
			} else {
				String mapLoginid = record.get("mapManagerlist").trim();
				setOa.add(mapLoginid);
			}
		}

		// CD经理 2
		if (StringUtils.isNotEmpty(record.get("cdManagerlist"))) {
			if (record.get("cdManagerlist").startsWith("A:")) {
				String[] cdManagerlists = record.get("cdManagerlist").split(":")[1].split(",");
				for (int i = 0; i < cdManagerlists.length; i++) {
					String cdLogin = cdManagerlists[i].trim();
					setOa.add(cdLogin);
				}
			} else {
				String cdLogin = record.get("cdManagerlist").trim();
				setOa.add(cdLogin);
			}
		}
		System.out.println(setOa);

		// 直销渠道经理 4
		if (StringUtils.isNotEmpty(record.get("heapManagerlist"))) {
			if (record.get("heapManagerlist").startsWith("A:")) {
				String[] heapManagerlists = record.get("heapManagerlist").split(":")[1].split(",");
				for (int i = 0; i < heapManagerlists.length; i++) {
					String heapLogin = heapManagerlists[i].trim();
					setOa.add(heapLogin);
				}
			} else {
				String heapLogin = record.get("heapManagerlist").trim();
				setOa.add(heapLogin);
			}
		}

		// 社会渠道经理 1
		if (StringUtils.isNotEmpty(record.get("directManagerlist"))) {
			if (record.get("directManagerlist").startsWith("A:")) {
				String[] directManagerlists = record.get("directManagerlist").split(":")[1].split(",");
				for (int i = 0; i < directManagerlists.length; i++) {
					String dirLogin = directManagerlists[i].trim();
					setOa.add(dirLogin);
				}
			} else {
				String dirLogin = record.get("directManagerlist").trim();
				setOa.add(dirLogin);
			}
		}

		List<String> itlist = new ArrayList<String>();
		Iterator<Object> it = setOa.iterator();
		while (it.hasNext()) {
			String str = (String) it.next();
			itlist.add(str);
		}
		System.out.println(itlist);
		Map<String, Object> mapUserSys = new HashMap<String, Object>();
		for (int i = 0; i < itlist.size(); i++) {
			// 先判断sys_user表是否存在，通过OA_ID
			Map<String, Object> mm = mapIndexMapper.selectCountSYS(itlist.get(i));
			// 来统计个数
			int max = Integer.valueOf((String) mm.get("M"));
			System.out.println(max);
			if (max == 0) {
				// 从select表查询信息，如果sys_user不存在创建第一个_1
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(itlist.get(i));
				String oaId = mapUserTemp.get(0).get("OA_ID").toString().trim();
				String logId = mapUserTemp.get(0).get("LOGIN_ID") + "_1";
				OAmap.put(oaId, logId);
				mapUserSys.put("userId", UUID.randomUUID().toString());
				mapUserSys.put("loginId", logId);
				mapUserSys.put("orgId", sysOrg.getOrgId());
				mapUserSys.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUserSys.put("oaid", oaId);
				mapUserSys.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUserSys.put("memo", "1");
				mapUserSys.put("password", MD5Util.getHash(defaultPassword).toLowerCase());
				mapIndexMapper.insertMapSYS(mapUserSys);
			} else {
				int max_memo = max;
				max_memo++;
				// 从sys_user表查询信息memo
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(itlist.get(i));
				String oaId = mapUserTemp.get(0).get("OA_ID").toString().trim();
				String logId = mapUserTemp.get(0).get("LOGIN_ID") + "_" + String.valueOf(max_memo);
				OAmap.put(oaId, logId);
				mapUserSys.put("loginId", logId);
				mapUserSys.put("orgId", sysOrg.getOrgId());
				mapUserSys.put("userId", UUID.randomUUID().toString());
				mapUserSys.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUserSys.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUserSys.put("oaid", oaId);
				mapUserSys.put("memo", String.valueOf(max_memo));
				mapUserSys.put("password", MD5Util.getHash(defaultPassword).toLowerCase());
				mapIndexMapper.insertMapSYS(mapUserSys);
			}
		}

		// 网格经理 3
		if (StringUtils.isNotEmpty(record.get("mapManagerlist"))) {
			if (record.get("mapManagerlist").startsWith("A:")) {
				String[] mapManagerlists = record.get("mapManagerlist").split(":")[1].split(",");
				for (int i = 0; i < mapManagerlists.length; i++) {
					List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(mapManagerlists[i]);
					String oaId = mapUserTemp.get(0).get("OA_ID").toString().trim();
					mapUser.put("loginId", OAmap.get(oaId));
					mapUser.put("orgId", sysOrg.getOrgId());
					mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
					mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
					mapUser.put("usertype", 3);
					mapUser.put("oaid", oaId);
					mapIndexMapper.insertMapUser(mapUser);
				}
			} else {
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(record.get("mapManagerlist"));
				String oaId = mapUserTemp.get(0).get("OA_ID").toString().trim();
				mapUser.put("loginId", OAmap.get(oaId));
				mapUser.put("orgId", sysOrg.getOrgId());
				mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUser.put("usertype", 3);
				mapUser.put("oaid", oaId);
				mapIndexMapper.insertMapUser(mapUser);
			}
		}

		// cd经理 2
		if (StringUtils.isNotEmpty(record.get("cdManagerlist"))) {
			if (record.get("cdManagerlist").startsWith("A:")) {
				String[] cdManagerlists = record.get("cdManagerlist").split(":")[1].split(",");
				for (int i = 0; i < cdManagerlists.length; i++) {
					List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(cdManagerlists[i]);
					String oaId = mapUserTemp.get(0).get("OA_ID").toString().trim();
					mapUser.put("loginId", OAmap.get(oaId));
					mapUser.put("orgId", sysOrg.getOrgId());
					mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
					mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
					mapUser.put("usertype", 2);
					mapUser.put("oaid", oaId);
					mapIndexMapper.insertMapUser(mapUser);
				}
			} else {
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(record.get("cdManagerlist"));
				String oaId = mapUserTemp.get(0).get("OA_ID").toString().trim();
				mapUser.put("loginId", OAmap.get(oaId));
				mapUser.put("orgId", sysOrg.getOrgId());
				mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUser.put("usertype", 2);
				mapUser.put("oaid", oaId);
				mapIndexMapper.insertMapUser(mapUser);
			}
		}

		// 社会渠道经理 1
		if (StringUtils.isNotEmpty(record.get("heapManagerlist"))) {
			if (record.get("heapManagerlist").startsWith("A:")) {
				String[] heapManagerlists = record.get("heapManagerlist").split(":")[1].split(",");
				for (int i = 0; i < heapManagerlists.length; i++) {
					List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(heapManagerlists[i]);
					String oaId = mapUserTemp.get(0).get("OA_ID").toString().trim();
					mapUser.put("loginId", OAmap.get(oaId));
					mapUser.put("orgId", sysOrg.getOrgId());
					mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
					mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
					mapUser.put("usertype", 1);
					mapUser.put("oaid", oaId);
					mapIndexMapper.insertMapUser(mapUser);
				}
			} else {
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(record.get("heapManagerlist"));
				String oaId = mapUserTemp.get(0).get("OA_ID").toString().trim();
				mapUser.put("loginId", OAmap.get(oaId));
				mapUser.put("orgId", sysOrg.getOrgId());
				mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUser.put("usertype", 1);
				mapUser.put("oaid", oaId);
				mapIndexMapper.insertMapUser(mapUser);
			}
		}

		// 直销渠道经理 4
		if (StringUtils.isNotEmpty(record.get("directManagerlist"))) {
			if (record.get("directManagerlist").startsWith("A:")) {
				String[] directManagerlists = record.get("directManagerlist").split(":")[1].split(",");
				for (int i = 0; i < directManagerlists.length; i++) {
					List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(directManagerlists[i]);
					String oaId = mapUserTemp.get(0).get("OA_ID").toString().trim();
					mapUser.put("loginId", OAmap.get(oaId));
					mapUser.put("orgId", sysOrg.getOrgId());
					mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
					mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
					mapUser.put("usertype", 4);
					mapUser.put("oaid", oaId);
					mapIndexMapper.insertMapUser(mapUser);
				}
			} else {
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(record.get("directManagerlist"));
				String oaId = mapUserTemp.get(0).get("OA_ID").toString().trim();
				mapUser.put("loginId", OAmap.get(oaId));
				mapUser.put("orgId", sysOrg.getOrgId());
				mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUser.put("usertype", 4);
				mapUser.put("oaid", oaId);
				mapIndexMapper.insertMapUser(mapUser);
			}
		}

		// 直销人员
		if (StringUtils.isNotEmpty(record.get("direct_sale_user_infolist"))) {
			if (record.get("direct_sale_user_infolist").startsWith("A:")) {
				String[] direct_sale_user_infolists = record.get("direct_sale_user_infolist").split(":")[1].split(",");
				for (int i = 0; i < direct_sale_user_infolists.length; i++) {
					Map<String, Object> mapUserTemp = mapIndexMapper.selectUserBYuid(direct_sale_user_infolists[i]);
					Map<String, Object> saleMapUser = new HashMap<String, Object>();
					saleMapUser.put("loginId", mapUserTemp.get("UID"));
					saleMapUser.put("orgId", sysOrg.getOrgId());
					saleMapUser.put("userName", mapUserTemp.get("USER_NAME"));
					saleMapUser.put("userMobile", mapUserTemp.get("USER_NUMBER"));
					saleMapUser.put("usertype", 6);
					mapIndexMapper.insertMapUser(saleMapUser);
				}
			} else {
				Map<String, Object> mapUserTemp = mapIndexMapper.selectUserBYuid(record.get("direct_sale_user_infolist"));
				Map<String, Object> saleMapUser = new HashMap<String, Object>();
				saleMapUser.put("loginId", mapUserTemp.get("UID"));
				saleMapUser.put("orgId", sysOrg.getOrgId());
				saleMapUser.put("userName", mapUserTemp.get("USER_NAME"));
				saleMapUser.put("userMobile", mapUserTemp.get("USER_NUMBER"));
				saleMapUser.put("usertype", 6);
				mapIndexMapper.insertMapUser(saleMapUser);
			}
		}

		// 装维人员
		if (StringUtils.isNotEmpty(record.get("societyManagerlist"))) {
			System.out.println(record.get("societyManagerlist"));
			String[] societyManagerlists = record.get("societyManagerlist").split("-");
			System.out.println(societyManagerlists);
			for (int i = 0; i < societyManagerlists.length; i++) {
				System.out.println(societyManagerlists[i]);
				JSONObject JSsociety = JSONArray.parseObject(societyManagerlists[i]);
				String name = JSsociety.getString("name").trim();
				String phone = JSsociety.getString("phone").trim();
				Map<String, Object> mapUser1 = new HashMap<String, Object>();
				mapUser1.put("loginId", "");
				mapUser1.put("orgId", sysOrg.getOrgId());
				mapUser1.put("userName", name);
				mapUser1.put("userMobile", phone);
				mapUser1.put("usertype", 7);
				System.out.println(mapUser1);
				mapIndexMapper.insertMapUser(mapUser1);
			}
		}

		// 销售经理
		if (StringUtils.isNotEmpty(record.get("MarketManagerList"))) {
			System.out.println(record.get("MarketManagerList"));
			String[] MarketManagerLists = record.get("MarketManagerList").split("-");
			System.out.println(MarketManagerLists);
			for (int i = 0; i < MarketManagerLists.length; i++) {
				System.out.println(MarketManagerLists[i]);
				JSONObject JSsociety = JSONArray.parseObject(MarketManagerLists[i]);
				String name = JSsociety.getString("name").trim();
				String phone = JSsociety.getString("phone").trim();
				Map<String, Object> mapUser1 = new HashMap<String, Object>();
				mapUser1.put("loginId", "");
				mapUser1.put("orgId", sysOrg.getOrgId());
				mapUser1.put("userName", name);
				mapUser1.put("userMobile", phone);
				mapUser1.put("usertype", 8);
				System.out.println(mapUser1);
				mapIndexMapper.insertMapUser(mapUser1);
			}
		}

		return sysOrg.getOrgId() + "&" + shape.toString();
	}

	/**
	 * 小区轮廓信息保存
	 * 
	 * @Title createOrUpdateCommunity
	 * @Author xiaogaoxiang
	 * @param record
	 * @return String
	 */
	public String createOrUpdateCommunity(Map<String, Object> record) {
		String cellId = record.get("cellId").toString();
		// 根据小区的编码查询小区信息
		Map<String, Object> communityMapList = mapIndexMapper.selectTaDtCellMGxhByCellId(cellId);
		if (null != communityMapList && communityMapList.size() > 0) {
			// 修改小区轮廓信息
			mapIndexMapper.updateCommunity(record);
		} else {
			// 新增小区轮廓信息
			mapIndexMapper.insertCommunity(record);
		}
		return null;
	}

	/**
	 * 网格信息保存
	 * 
	 * @Title create
	 * @Author xiaogaoxiang
	 * @param record
	 * @return
	 * @throws ClassNotFoundException
	 * @throws SQLException
	 * @throws NoSuchAlgorithmException
	 *             String
	 */
	public String create(Map<String, String> record) throws ClassNotFoundException, SQLException, NoSuchAlgorithmException {
		Map<String, String> OAmap = new HashMap<String, String>();
		// loginid 去重 存储在 sys_user,系统的登陆表
		Set<Object> setOa = new TreeSet<Object>();

		// 将个表的 loginid 放在list中
		// 存储在 griduser
		// List<Object> listOa = new ArrayList<Object>();

		Map<String, Object> mapInfo = new HashMap<String, Object>();
		Map<String, Object> mapUser = new HashMap<String, Object>();
		Map<String, Object> mapOrg = new HashMap<String, Object>();
		String orgId = UUID.randomUUID().toString();// 网格ID
		String address = record.get("address");
		mapInfo.put("orgId", orgId);
		mapInfo.put("shape", address);
		mapInfo.put("typeId", "1");
		mapInfo.put("color", "#995cb0");
		setShapeMM(address, mapInfo);
		mapIndexMapper.insertMapInfo(mapInfo);
		/********/
		/*
		 * if(StringUtils.isNotEmpty(record.get("MarketManagerList"))){ //销售经理
		 * 8\ String [] MarketManagerLists =
		 * record.get("MarketManagerList").split("-"); for(int
		 * i=0;i<MarketManagerLists.length;i++) { JSONObject JSsociety
		 * =JSONArray.parseObject(MarketManagerLists[i]); String name
		 * =JSsociety.getString("name"); String loginId =
		 * JSsociety.getString("loginId"); //loginid 账号 MarketMap.put(loginId,
		 * name); System.out.println(loginId); setOa.add(loginId); } }
		 * System.out.println(MarketMap); System.out.println(setOa);
		 */

		// 网格经理 3
		if (StringUtils.isNotEmpty(record.get("mapManagerlist"))) {
			System.out.println(record.get("mapManagerlist"));
			if (record.get("mapManagerlist").startsWith("A:")) {
				String[] mapManagerlists = record.get("mapManagerlist").split(":")[1].split(",");
				for (int i = 0; i < mapManagerlists.length; i++) {
					String mapLoginid = mapManagerlists[i];
					setOa.add(mapLoginid);
				}
			} else {
				String mapLoginid = record.get("mapManagerlist");
				setOa.add(mapLoginid);
			}
		}

		// cd经理 2
		if (StringUtils.isNotEmpty(record.get("cdManagerlist"))) {
			if (record.get("cdManagerlist").startsWith("A:")) {
				String[] cdManagerlists = record.get("cdManagerlist").split(":")[1].split(",");
				for (int i = 0; i < cdManagerlists.length; i++) {
					String cdLogin = cdManagerlists[i];
					setOa.add(cdLogin);
				}
			} else {
				String cdLogin = record.get("cdManagerlist");
				setOa.add(cdLogin);
			}
		}

		// 直销渠道经理 4
		if (StringUtils.isNotEmpty(record.get("heapManagerlist"))) {
			if (record.get("heapManagerlist").startsWith("A:")) {
				String[] heapManagerlists = record.get("heapManagerlist").split(":")[1].split(",");
				for (int i = 0; i < heapManagerlists.length; i++) {
					String heapLogin = heapManagerlists[i];
					setOa.add(heapLogin);
				}
			} else {
				String heapLogin = record.get("heapManagerlist");
				setOa.add(heapLogin);
			}
		}

		// 社会渠道经理 1
		if (StringUtils.isNotEmpty(record.get("directManagerlist"))) {
			if (record.get("directManagerlist").startsWith("A:")) {
				String[] directManagerlists = record.get("directManagerlist").split(":")[1].split(",");
				for (int i = 0; i < directManagerlists.length; i++) {
					String dirLogin = directManagerlists[i];
					setOa.add(dirLogin);
				}
			} else {
				String dirLogin = record.get("directManagerlist");
				setOa.add(dirLogin);
			}
		}

		List<String> itlist = new ArrayList<String>();
		Iterator<Object> it = setOa.iterator();
		while (it.hasNext()) {
			String str = (String) it.next();
			itlist.add(str);
		}
		System.out.println(itlist);
		Map<String, Object> mapUserSys = new HashMap<String, Object>();
		for (int i = 0; i < itlist.size(); i++) {
			// 先判断sys_user表是否存在
			// 通过OA_ID
			Map<String, Object> mm = mapIndexMapper.selectCountSYS(itlist.get(i));

			// 来统计个数
			int max = Integer.valueOf((String) mm.get("M"));
			System.out.println(max);
			if (max == 0) {
				// 如果sys_user不存在创建第一个_1，从select表查询信息
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(itlist.get(i));
				String oaId = mapUserTemp.get(0).get("OA_ID").toString();
				String logId = mapUserTemp.get(0).get("LOGIN_ID") + "_1";
				OAmap.put(oaId, logId);
				mapUserSys.put("userId", UUID.randomUUID().toString());
				mapUserSys.put("loginId", logId);
				mapUserSys.put("orgId", orgId);
				mapUserSys.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				// mapUser.put("usertype",String.valueOf(mapUserTemp.get("USER_TYPE")));
				mapUserSys.put("oaid", oaId);
				mapUserSys.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUserSys.put("memo", "1");
				mapUserSys.put("password", MD5Util.getHash(defaultPassword).toLowerCase());
				mapIndexMapper.insertMapSYS(mapUserSys);
			} else {
				int max_memo = max;
				max_memo++;
				// 从 sys_user 表查询信息 memo
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(itlist.get(i));
				String oaId = mapUserTemp.get(0).get("OA_ID").toString();
				String logId = mapUserTemp.get(0).get("LOGIN_ID") + "_" + String.valueOf(max_memo);
				OAmap.put(oaId, logId);
				mapUserSys.put("loginId", logId);
				mapUserSys.put("orgId", orgId);
				mapUserSys.put("userId", UUID.randomUUID().toString());
				mapUserSys.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUserSys.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUserSys.put("oaid", oaId);
				// mapUser.put("usertype",String.valueOf(mapUserTemp.get("USER_TYPE")));
				mapUserSys.put("memo", String.valueOf(max_memo));
				mapUserSys.put("password", MD5Util.getHash(defaultPassword).toLowerCase());
				mapIndexMapper.insertMapSYS(mapUserSys);
			}

		}

		// 网格经理 3,2018 - 9 - 3
		if (StringUtils.isNotEmpty(record.get("mapManagerlist"))) {
			if (record.get("mapManagerlist").startsWith("A:")) {
				String[] mapManagerlists = record.get("mapManagerlist").split(":")[1].split(",");
				for (int i = 0; i < mapManagerlists.length; i++) {
					List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(mapManagerlists[i]);
					String oaId = mapUserTemp.get(0).get("OA_ID").toString();
					mapUser.put("loginId", OAmap.get(oaId));
					mapUser.put("orgId", orgId);
					mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
					mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
					mapUser.put("usertype", 3);
					mapUser.put("oaid", oaId);
					mapIndexMapper.insertMapUser(mapUser);
				}
			} else {
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(record.get("mapManagerlist"));
				String oaId = mapUserTemp.get(0).get("OA_ID").toString();
				mapUser.put("loginId", OAmap.get(oaId));
				mapUser.put("orgId", orgId);
				mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUser.put("usertype", 3);
				mapUser.put("oaid", oaId);
				mapIndexMapper.insertMapUser(mapUser);
			}
		}

		// cd经理 2
		if (StringUtils.isNotEmpty(record.get("cdManagerlist"))) {
			if (record.get("cdManagerlist").startsWith("A:")) {
				String[] cdManagerlists = record.get("cdManagerlist").split(":")[1].split(",");
				for (int i = 0; i < cdManagerlists.length; i++) {
					List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(cdManagerlists[i]);
					String oaId = mapUserTemp.get(0).get("OA_ID").toString();
					mapUser.put("loginId", OAmap.get(oaId));
					mapUser.put("orgId", orgId);
					mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
					mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
					mapUser.put("usertype", 2);
					mapUser.put("oaid", oaId);

					mapIndexMapper.insertMapUser(mapUser);
				}
			} else {
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(record.get("cdManagerlist"));
				String oaId = mapUserTemp.get(0).get("OA_ID").toString();
				mapUser.put("loginId", OAmap.get(oaId));
				mapUser.put("orgId", orgId);
				mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUser.put("usertype", 2);
				mapUser.put("oaid", oaId);

				mapIndexMapper.insertMapUser(mapUser);
			}
		}

		// 社会渠道经理 1
		if (StringUtils.isNotEmpty(record.get("heapManagerlist"))) {
			if (record.get("heapManagerlist").startsWith("A:")) {
				String[] heapManagerlists = record.get("heapManagerlist").split(":")[1].split(",");
				for (int i = 0; i < heapManagerlists.length; i++) {
					List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(heapManagerlists[i]);
					String oaId = mapUserTemp.get(0).get("OA_ID").toString();
					mapUser.put("loginId", OAmap.get(oaId));
					mapUser.put("orgId", orgId);
					mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
					mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
					mapUser.put("usertype", 1);
					mapUser.put("oaid", oaId);

					mapIndexMapper.insertMapUser(mapUser);
				}
			} else {
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(record.get("heapManagerlist"));
				String oaId = mapUserTemp.get(0).get("OA_ID").toString();
				mapUser.put("loginId", OAmap.get(oaId));
				mapUser.put("orgId", orgId);
				mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUser.put("usertype", 1);
				mapUser.put("oaid", oaId);

				mapIndexMapper.insertMapUser(mapUser);
			}
		}

		// 直销渠道经理 4
		if (StringUtils.isNotEmpty(record.get("directManagerlist"))) {
			if (record.get("directManagerlist").startsWith("A:")) {
				String[] directManagerlists = record.get("directManagerlist").split(":")[1].split(",");
				for (int i = 0; i < directManagerlists.length; i++) {
					List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(directManagerlists[i]);
					String oaId = mapUserTemp.get(0).get("OA_ID").toString();
					mapUser.put("loginId", OAmap.get(oaId));
					mapUser.put("orgId", orgId);
					mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
					mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
					mapUser.put("usertype", 4);
					mapUser.put("oaid", oaId);
					mapIndexMapper.insertMapUser(mapUser);
				}
			} else {
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(record.get("directManagerlist"));
				String oaId = mapUserTemp.get(0).get("OA_ID").toString();
				mapUser.put("loginId", OAmap.get(oaId));
				mapUser.put("orgId", orgId);
				mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUser.put("usertype", 4);
				mapUser.put("oaid", oaId);

				mapIndexMapper.insertMapUser(mapUser);
			}
		}

		// 直销人员 6
		if (StringUtils.isNotEmpty(record.get("direct_sale_user_infolist"))) {
			if (record.get("direct_sale_user_infolist").startsWith("A:")) {
				String[] direct_sale_user_infolists = record.get("direct_sale_user_infolist").split(":")[1].split(",");
				for (int i = 0; i < direct_sale_user_infolists.length; i++) {
					Map<String, Object> mapUserTemp = mapIndexMapper.selectUserBYuid(direct_sale_user_infolists[i]);
					Map<String, Object> saleMapUser = new HashMap<String, Object>();
					saleMapUser.put("loginId", mapUserTemp.get("UID"));
					saleMapUser.put("orgId", orgId);
					saleMapUser.put("userName", mapUserTemp.get("USER_NAME"));
					saleMapUser.put("userMobile", mapUserTemp.get("USER_NUMBER"));
					saleMapUser.put("usertype", 6);
					// mapUser.put("oaid", "");
					mapIndexMapper.insertMapUser(saleMapUser);
				}
			} else {
				Map<String, Object> mapUserTemp = mapIndexMapper.selectUserBYuid(record.get("direct_sale_user_infolist"));
				Map<String, Object> saleMapUser = new HashMap<String, Object>();

				saleMapUser.put("loginId", mapUserTemp.get("UID"));
				saleMapUser.put("orgId", orgId);
				saleMapUser.put("userName", mapUserTemp.get("USER_NAME"));
				saleMapUser.put("userMobile", mapUserTemp.get("USER_NUMBER"));
				saleMapUser.put("usertype", 6);
				// mapUser.put("oaid", "");
				mapIndexMapper.insertMapUser(saleMapUser);
			}

		}

		// 装维人员 7
		if (StringUtils.isNotEmpty(record.get("societyManagerlist"))) {
			System.out.println(record.get("societyManagerlist"));
			String[] societyManagerlists = record.get("societyManagerlist").split("-");
			System.out.println(societyManagerlists);
			for (int i = 0; i < societyManagerlists.length; i++) {
				System.out.println(societyManagerlists[i]);
				JSONObject JSsociety = JSONArray.parseObject(societyManagerlists[i]);
				String name = JSsociety.getString("name");
				String phone = JSsociety.getString("phone");
				Map<String, Object> mapUser1 = new HashMap<String, Object>();
				mapUser1.put("loginId", "");
				mapUser1.put("orgId", orgId);
				mapUser1.put("userName", name);
				mapUser1.put("userMobile", phone);
				mapUser1.put("usertype", 7);
				// mapUser1.put("oaid", "");
				System.out.println(mapUser1);
				mapIndexMapper.insertMapUser(mapUser1);
			}
		}

		// 销售经理
		if (StringUtils.isNotEmpty(record.get("MarketManagerList"))) {
			System.out.println(record.get("MarketManagerList"));
			String[] MarketManagerLists = record.get("MarketManagerList").split("-");
			System.out.println(MarketManagerLists);
			for (int i = 0; i < MarketManagerLists.length; i++) {
				System.out.println(MarketManagerLists[i]);
				JSONObject JSsociety = JSONArray.parseObject(MarketManagerLists[i]);
				String name = JSsociety.getString("name");
				String phone = JSsociety.getString("phone");
				Map<String, Object> mapUser1 = new HashMap<String, Object>();
				mapUser1.put("loginId", "");
				mapUser1.put("orgId", orgId);
				mapUser1.put("userName", name);
				mapUser1.put("userMobile", phone);
				mapUser1.put("usertype", 8);
				// mapUser1.put("oaid", "");
				System.out.println(mapUser1);
				mapIndexMapper.insertMapUser(mapUser1);
			}
		}

		Map<String, Object> mapOrgTemp = mapIndexMapper.selectOrg(record.get("pid"));
		int order = mapIndexMapper.selectOrgOrder(record.get("pid"));
		mapOrg.put("orgId", orgId);
		mapOrg.put("pid", mapOrgTemp.get("ORG_ID"));
		mapOrg.put("name", record.get("mapName"));
		mapOrg.put("displayOrder", order + 1);
		mapOrg.put("orgLevel", 4);
		mapOrg.put("treeCode", mapOrgTemp.get("TREE_CODE") + "/" + orgId);
		mapIndexMapper.insertMapOrg(mapOrg);

		String[] poiList = record.get("poiList").split(",");
		List<String> listpoil = new ArrayList<String>();
		for (String s : poiList) {
			listpoil.add(s);
		}
		String[] channelList = record.get("channelList").split(",");
		List<String> channel = new ArrayList<String>();
		for (String s : channelList) {
			channel.add(s);
		}

		String[] stationList = record.get("stationList").split(",");
		List<String> station = new ArrayList<String>();
		for (String s : stationList) {
			station.add(s);
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("uid", listpoil);
		map.put("gridCode", orgId);
		mapIndexMapper.updateMapBdPoi(map);

		Map<String, Object> map1 = new HashMap<String, Object>();
		map1.put("uid", channel);
		map1.put("gridCode", orgId);
		mapIndexMapper.updateChannelInfo(map1);

		Map<String, Object> map2 = new HashMap<String, Object>();
		map2.put("uid", station);
		map2.put("gridCode", orgId);
		mapIndexMapper.updateStationInfo(map2);

		return orgId;
	}

	public String edit(Map<String, String> record) throws ClassNotFoundException, SQLException, NoSuchAlgorithmException {
		Map<String, String> OAmap = new HashMap<String, String>();
		// Map<String, String> delOAmap = new HashMap<String, String>();
		// Map<String, Object> oldGridUser = new HashMap<String, Object>();
		// OA_id 去重 存储在 sys_user
		// 系统的登陆表
		Set<Object> setOa = new TreeSet<Object>();

		// OA_id 去重 删除在 sys_user
		// 系统的登陆表
		Set<Object> setOa1 = new TreeSet<Object>();

		// 将个表的 oa_id 放在list中 存储在
		// griduser
		// List<Object> listOa = new ArrayList<Object>();

		Map<String, Object> mapInfo = new HashMap<String, Object>();
		Map<String, Object> mapUser = new HashMap<String, Object>();
		Map<String, Object> mapOrg = new HashMap<String, Object>();
		String orgId = record.get("orgId");
		mapInfo.put("orgId", orgId);
		mapInfo.put("shape", record.get("address"));
		setShapeMM(record.get("address"), mapInfo);
		mapIndexMapper.updateMapInfo(mapInfo);

		List<String> mapList = new ArrayList<String>(); // yuanlai
		List<String> mapManagerList = new ArrayList<String>(); // quanbu
		List<String> cdlist = new ArrayList<String>();
		List<String> cdManagerList = new ArrayList<String>();
		List<String> headList = new ArrayList<String>();
		List<String> headManagerList = new ArrayList<String>();
		List<String> dirList = new ArrayList<String>();
		List<String> dirManagerList = new ArrayList<String>();

		List<String> mapList1 = new ArrayList<String>();
		List<String> cdlist1 = new ArrayList<String>();
		List<String> headList1 = new ArrayList<String>();
		List<String> dirList1 = new ArrayList<String>();

		/*
		 * mapList.removeAll(mapManagerList); //网格经理要删除的
		 * mapManagerList.removeAll(mapList1); //网格经理要增加的
		 */

		/********** mapManager ***************/
		String useridF = record.get("userId");
		String[] useridFs = useridF.split(",");
		if (useridFs.length > 1) {
			for (int i = 0; i < useridFs.length; i++) {
				// Map<String, Object> map1 = new HashMap<String, Object>();
				setOa1.add(useridFs[i]);
				mapList.add(useridFs[i]);
				mapList1.add(useridFs[i]);
			}
		} else {
			// Map<String, Object> map1 = new HashMap<String, Object>();
			setOa1.add(useridFs[0]);
			mapList.add(useridFs[0]);
			mapList1.add(useridFs[0]);
		}
		if (StringUtils.isNotEmpty(record.get("mapManagerlist"))) {
			// cd 2
			if (record.get("mapManagerlist").startsWith("A:")) {
				String[] mapManagerlists = record.get("mapManagerlist").split(":")[1].split(",");
				List<Map<String, Object>> mapUserTemp = null;
				for (int i = 0; i < mapManagerlists.length; i++) {
					mapUserTemp = mapIndexMapper.selectUserOne(mapManagerlists[i]);
					if (null != mapUserTemp && mapUserTemp.size() > 0) {
						setOa.add(mapUserTemp.get(0).get("OA_ID"));
						mapManagerList.add(mapManagerlists[i]);
					}
				}
			} else {
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(record.get("mapManagerlist"));
				if (null != mapUserTemp && mapUserTemp.size() > 0) {
					setOa.add(mapUserTemp.get(0).get("OA_ID"));
					mapManagerList.add(record.get("mapManagerlist"));
				}
			}
		}

		String cdidF = record.get("cdId");
		String[] cdidFs = cdidF.split(","); // 1,11, 1 11
		if (cdidFs.length > 1) {
			for (int i = 0; i < cdidFs.length; i++) {
				// Map<String, Object> map3 = new HashMap<String, Object>();
				setOa1.add(cdidFs[i]);
				cdlist.add(cdidFs[i]);
				cdlist1.add(cdidFs[i]);
			}
		} else {
			// Map<String, Object> map3 = new HashMap<String, Object>();
			setOa1.add(cdidFs[0]);
			cdlist.add(cdidFs[0]);
			cdlist1.add(cdidFs[0]);
		}

		if (StringUtils.isNotEmpty(record.get("cdManagerlist"))) { // 4
			if (record.get("cdManagerlist").startsWith("A:")) {
				String[] cdManagerlists = record.get("cdManagerlist").split(":")[1].split(",");
				List<Map<String, Object>> mapUserTemp = null;
				for (int i = 0; i < cdManagerlists.length; i++) {
					mapUserTemp = mapIndexMapper.selectUserOne(cdManagerlists[i]);
					if (null != mapUserTemp && mapUserTemp.size() > 0) {
						setOa.add(mapUserTemp.get(0).get("OA_ID"));
						cdManagerList.add(cdManagerlists[i]);
					}
				}
			} else {
				String dd = record.get("cdManagerlist");
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(dd);
				if (null != mapUserTemp && mapUserTemp.size() > 0) {
					setOa.add(mapUserTemp.get(0).get("OA_ID"));
					cdManagerList.add(dd);
				}
			}
		}

		String heapidF = "";
		heapidF = record.get("heapId");// .substring(0,record.get("heapId").length()-1);
		String[] heapidFs = heapidF.split(","); // 1,11, 1 11
		if (heapidFs.length > 1) {
			for (int i = 0; i < heapidFs.length; i++) {
				// Map<String, Object> map4 = new HashMap<String, Object>();
				setOa1.add(heapidFs[i]);
				headList.add(heapidFs[i]);
				headList1.add(heapidFs[i]);
			}
		} else {
			// Map<String, Object> map4 = new HashMap<String, Object>();
			setOa1.add(heapidFs[0]);
			headList.add(heapidFs[0]);
			headList1.add(heapidFs[0]);
		}
		if (StringUtils.isNotEmpty(record.get("heapManagerlist"))) { // 4
			if (record.get("heapManagerlist").startsWith("A:")) {
				String[] heapManagerlists = record.get("heapManagerlist").split(":")[1].split(",");
				List<Map<String, Object>> mapUserTemp = null;
				for (int i = 0; i < heapManagerlists.length; i++) {
					mapUserTemp = mapIndexMapper.selectUserOne(heapManagerlists[i]);
					if (null != mapUserTemp && mapUserTemp.size() > 0) {
						setOa.add(mapUserTemp.get(0).get("OA_ID"));
						headManagerList.add(heapManagerlists[i]);
					}
				}
			} else {
				String dd = record.get("heapManagerlist");
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(dd);
				if (null != mapUserTemp && mapUserTemp.size() > 0) {
					setOa.add(mapUserTemp.get(0).get("OA_ID"));
					headManagerList.add(dd);
				}
			}
		}

		String directidF = "";
		directidF = record.get("directId");
		String[] directidFs = directidF.split(",");
		if (directidFs.length > 1) {
			for (int i = 0; i < directidFs.length; i++) {
				// Map<String, Object> map4 = new HashMap<String, Object>();
				setOa1.add(directidFs[i]);
				dirList.add(directidFs[i]);
				dirList1.add(directidFs[i]);
			}
		} else {
			// Map<String, Object> map4 = new HashMap<String, Object>();
			setOa1.add(directidFs[0]);
			dirList.add(directidFs[0]);
			dirList1.add(directidFs[0]);
		}

		if (StringUtils.isNotEmpty(record.get("directManagerlist"))) { // 1
			if (record.get("directManagerlist").startsWith("A:")) {
				String[] directManagerlists = record.get("directManagerlist").split(":")[1].split(",");
				List<Map<String, Object>> mapUserTemp = null;
				for (int i = 0; i < directManagerlists.length; i++) {
					mapUserTemp = mapIndexMapper.selectUserOne(directManagerlists[i]);
					if (null != mapUserTemp && mapUserTemp.size() > 0) {
						setOa.add(mapUserTemp.get(0).get("OA_ID"));
						dirManagerList.add(directManagerlists[i]);
					}
				}
			} else {
				String dd = record.get("directManagerlist");
				List<Map<String, Object>> mapUserTemp = mapIndexMapper.selectUserOne(dd);
				if (null != mapUserTemp && mapUserTemp.size() > 0) {
					setOa.add(mapUserTemp.get(0).get("OA_ID"));
					dirManagerList.add(dd);
				}
			}
		}

		// 存储的是邢增的sys_user
		List<String> list = new ArrayList<>();
		Iterator<Object> it = setOa.iterator();
		String str = null;
		while (it.hasNext()) {
			str = (String) it.next();
			list.add(str);
		}

		// 存储的是邢增的sys_user
		List<String> listold = new ArrayList<>();
		Iterator<Object> itold = setOa.iterator();
		while (itold.hasNext()) {
			str = (String) itold.next();
			listold.add(str);
		}

		// 已经存在的Sys_user
		List<String> listnew = new ArrayList<>();
		Iterator<Object> itnew = setOa1.iterator();
		while (itnew.hasNext()) {
			str = (String) itnew.next();
			listnew.add(str);
		}

		// 已经存在的Sys_user
		List<String> list1 = new ArrayList<>();
		Iterator<Object> it1 = setOa1.iterator();
		while (it1.hasNext()) {
			str = (String) it1.next();
			list1.add(str);
		}

		// 已经存在的Sys_user
		List<String> list2 = new ArrayList<>();
		Iterator<Object> it2 = setOa1.iterator();
		while (it2.hasNext()) {
			str = (String) it2.next();
			list2.add(str);
		}
		// 需要删除
		list1.removeAll(list);
		// 需要增加的
		list.removeAll(list2);
		// 不变的
		listold.retainAll(listnew);
		// 删除
		if (list1.size() != 0) {
			List<Map<String, Object>> mapUserTemp = null;
			Map<String, Object> mmp = null;
			for (int i = 0; i < list1.size(); i++) {
				if (list1.get(i) == null || "".equals(list1.get(i))) {
					continue;
				}
				mapUserTemp = mapIndexMapper.selectUserOne(list1.get(i));// 原始的
				if (null != mapUserTemp && mapUserTemp.size() > 0) {
					mmp = new HashMap<>();
					mmp.put("orgId", orgId);
					// mmp.put("usertype",
					// String.valueOf(mapUserTemp.get(0).get("USER_TYPE")));
					mmp.put("loginId", mapUserTemp.get(0).get("LOGIN_ID"));
					// mmp.put("OA_ID", mapUserTemp.get(0).get("OA_ID"));
					mapIndexMapper.deleteMapRoleSys(mmp);
					mapIndexMapper.deleteMapSYS(mmp);
				}
			}
		}
		// 插入新的
		if (list.size() != 0) {
			Map<String, Object> mm = null;
			int max = 0;
			List<Map<String, Object>> mapUserTemp = null;
			String oaId = null;
			String logId = null;
			String logn = null;
			for (int i = 0; i < list.size(); i++) {
				// 先判断sys_user表是否存在
				mm = mapIndexMapper.selectCountSYS(list.get(i));
				max = Integer.valueOf((String) mm.get("M"));
				if (max == 0) {
					// 如果sys_user 不存在创建第一个_1，从select表查询信息
					mapUserTemp = mapIndexMapper.selectUserOne(list.get(i));
					if (null != mapUserTemp && mapUserTemp.size() > 0) {
						oaId = mapUserTemp.get(0).get("OA_ID").toString();
						logId = mapUserTemp.get(0).get("LOGIN_ID") + "_1";
						OAmap.put(oaId, logId);
						mapUser.put("userId", UUID.randomUUID().toString());
						mapUser.put("loginId", logId);
						mapUser.put("orgId", orgId);
						mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
						mapUser.put("oaid", oaId);
						mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
						mapUser.put("memo", "1");
						mapUser.put("password", MD5Util.getHash(defaultPassword).toLowerCase());
						mapIndexMapper.insertMapSYS(mapUser);
					}
				} else {
					int max_memo = max;
					max_memo++;
					// 从 sys_user 表查询信息 memo
					mapUserTemp = mapIndexMapper.selectUserOne(list.get(i));
					if (null != mapUserTemp && mapUserTemp.size() > 0) {
						oaId = mapUserTemp.get(0).get("OA_ID").toString();
						logn = mapUserTemp.get(0).get("LOGIN_ID") + "_" + String.valueOf(max_memo);
						OAmap.put(oaId, logn);
						mapUser.put("loginId", logn);
						mapUser.put("orgId", orgId);
						mapUser.put("userId", UUID.randomUUID().toString());
						mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
						mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
						mapUser.put("oaid", oaId);
						mapUser.put("memo", String.valueOf(max_memo));
						mapUser.put("password", MD5Util.getHash(defaultPassword).toLowerCase());
						mapIndexMapper.insertMapSYS(mapUser);
					}
				}
			}
		}

		// 不变的
		Map<String, String> nochange = new HashMap<String, String>();
		if (listold.size() != 0) {
			List<Map<String, String>> mapUserTemp = null;
			String loginid = null;
			for (int i = 0; i < listold.size(); i++) {
				nochange.put("orgid", orgId);
				nochange.put("oaid", listold.get(i));
				mapUserTemp = mapIndexMapper.selectGridUserLoginAndOA(nochange);
				if (null != mapUserTemp && mapUserTemp.size() > 0) {
					loginid = mapUserTemp.get(0).get("LOGIN_ID");
					OAmap.put(listold.get(i), loginid);
				}
			}
		}

		/********** mapManager ***************/
		// 网格经理要删除的
		mapList.removeAll(mapManagerList);
		// 网格经理要增加的
		mapManagerList.removeAll(mapList1);
		Map<String, Object> deMap = null;
		for (String deMapManager : mapList) {
			deMap = new HashMap<String, Object>();
			deMap.put("login_id", deMapManager);
			deMap.put("orgId", orgId);
			deMap.put("usertype", 3);
			mapIndexMapper.deleteUserS(deMap);
		}
		if (null != mapManagerList && mapManagerList.size() > 0 && null != mapManagerList.get(0)) {
			List<Map<String, Object>> mapUserTemp = null;
			String oaId = null;
			String loginID = null;
			for (String addMapManager : mapManagerList) {
				if (null != addMapManager) {
					mapUserTemp = mapIndexMapper.selectUserOne(addMapManager);
					if (null != mapUserTemp && mapUserTemp.size() > 0) {
						oaId = mapUserTemp.get(0).get("OA_ID").toString();
						loginID = OAmap.get(oaId);
						mapUser.put("loginId", loginID);
						mapUser.put("orgId", orgId);
						mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
						mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
						mapUser.put("usertype", 3);
						mapUser.put("oaid", oaId);
						mapIndexMapper.insertMapUser(mapUser);
					}
				}
			}
		}

		/*
		 * if(StringUtils.isNotEmpty(record.get("mapManagerlist"))){ //cd 2
		 * if(record.get("mapManagerlist").startsWith("A:")) { String []
		 * mapManagerlists
		 * =record.get("mapManagerlist").split(":")[1].split(","); for(int
		 * i=0;i<mapManagerlists.length;i++) { List<Map<String, Object>>
		 * mapUserTemp = mapIndexMapper.selectUserOne(mapManagerlists[i]);
		 * String oaId = mapUserTemp.get(0).get("OA_ID").toString() ;
		 * if(OAmap.containsKey(oaId)) { String loginId= OAmap.get(oaId);
		 * mapUser.put("loginId",loginId); mapUser.put("orgId", orgId);
		 * mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
		 * mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
		 * mapUser.put("usertype", 3); mapUser.put("oaid", oaId);
		 * mapIndexMapper.insertMapUser(mapUser); } } }else { List<Map<String,
		 * Object>> mapUserTemp =
		 * mapIndexMapper.selectUserOne(record.get("mapManagerlist")); String
		 * oaId = mapUserTemp.get(0).get("OA_ID").toString() ;
		 * if(OAmap.containsKey(oaId)) { String loginId= OAmap.get(oaId);
		 * mapUser.put("loginId",loginId); mapUser.put("orgId", orgId);
		 * mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
		 * mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
		 * mapUser.put("usertype", 3); mapUser.put("oaid", oaId);
		 * mapIndexMapper.insertMapUser(mapUser); }else
		 * if(list1.contains(oaId)){ Map<String,Object> deMap = new
		 * HashMap<String,Object>(); deMap.put("login_id",oaId);
		 * deMap.put("orgId", orgId); deMap.put("usertype", 3);
		 * mapIndexMapper.deleteUserS(deMap); } } }
		 */

		/********** busiManager ***************/

		/*
		 * String busid=record.get("busiId"); String[] busids=busid.split(",");
		 * if(busids.length>1) { for(int i =0;i<busids.length;i++) { Map<String
		 * ,Object> map2 = new HashMap<String,Object>();
		 * map2.put("login_id",busids[i]); map2.put("orgId", orgId);
		 * map2.put("usertype", 5); mapIndexMapper.deleteUserS(map2); } }else {
		 * Map<String ,Object> map2 = new HashMap<String,Object>();
		 * map2.put("login_id",busids[0]); map2.put("orgId", orgId);
		 * map2.put("usertype", 5); mapIndexMapper.deleteUserS(map2); }
		 * if(StringUtils.isNotEmpty(record.get("busiManagerlist"))){
		 * if(record.get("busiManagerlist").startsWith("A:")) { String []
		 * busiManagerlists
		 * =record.get("busiManagerlist").split(":")[1].split(","); for(int
		 * i=0;i<busiManagerlists.length;i++) { Map<String, Object> mapUserTemp
		 * = mapIndexMapper.selectUserOnes(busiManagerlists[i]);
		 * mapUser.put("userId", UUID.randomUUID().toString());
		 * mapUser.put("loginId", mapUserTemp.get("LOGIN_ID"));
		 * mapUser.put("orgId", orgId); mapUser.put("userName",
		 * mapUserTemp.get("USER_NAME")); mapUser.put("userMobile",
		 * mapUserTemp.get("USER_MOBILE")); mapUser.put("usertype",5);
		 * mapUser.put("oaid", ""); mapIndexMapper.insertMapUser(mapUser); }
		 * }else { Map<String, Object> mapUserTemp =
		 * mapIndexMapper.selectUserOnes(record.get("busiManagerlist"));
		 * mapUser.put("userId", UUID.randomUUID().toString());
		 * mapUser.put("loginId", mapUserTemp.get("LOGIN_ID"));
		 * mapUser.put("orgId", orgId); mapUser.put("userName",
		 * mapUserTemp.get("USER_NAME")); mapUser.put("userMobile",
		 * mapUserTemp.get("USER_MOBILE")); mapUser.put("usertype",5);
		 * mapUser.put("oaid", ""); mapIndexMapper.insertMapUser(mapUser); } }
		 */

		/********** cdManager ***************/
		// cd经理要删除的
		cdlist.removeAll(cdManagerList);
		// cd经理要增加的
		cdManagerList.removeAll(cdlist1);

		for (String deCdManager : cdlist) {
			deMap = new HashMap<String, Object>();
			deMap.put("login_id", deCdManager);
			deMap.put("orgId", orgId);
			deMap.put("usertype", 5);
			mapIndexMapper.deleteUserS(deMap);
		}
		List<Map<String, Object>> mapUserTemp = null;
		String oaId = null;
		String loginID = null;
		for (String addCdManager : cdManagerList) {
			mapUserTemp = mapIndexMapper.selectUserOne(addCdManager);
			if (null != mapUserTemp && mapUserTemp.size() > 0) {
				oaId = mapUserTemp.get(0).get("OA_ID").toString();
				loginID = OAmap.get(oaId);
				mapUser.put("loginId", loginID);
				mapUser.put("orgId", orgId);
				mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUser.put("usertype", 5);
				mapUser.put("oaid", oaId);
				mapIndexMapper.insertMapUser(mapUser);
			}
		}
		/*
		 * if(StringUtils.isNotEmpty(record.get("cdManagerlist"))){ //4
		 * if(record.get("cdManagerlist").startsWith("A:")) { String []
		 * cdManagerlists =record.get("cdManagerlist").split(":")[1].split(",");
		 * for(int i=0;i<cdManagerlists.length;i++) { List<Map<String, Object>>
		 * mapUserTemp = mapIndexMapper.selectUserOne(cdManagerlists[i]); String
		 * oaId = mapUserTemp.get(0).get("OA_ID").toString() ;
		 * if(OAmap.containsKey(oaId)) { String loginId= OAmap.get(oaId);
		 * mapUser.put("loginId",loginId); mapUser.put("orgId", orgId);
		 * mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
		 * mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
		 * mapUser.put("usertype",2); mapUser.put("oaid", oaId);
		 * mapIndexMapper.insertMapUser(mapUser); } } }else { String
		 * dd=record.get("cdManagerlist").split(",")[0]; List<Map<String,
		 * Object>> mapUserTemp = mapIndexMapper.selectUserOne(dd); String oaId
		 * = mapUserTemp.get(0).get("OA_ID").toString() ;
		 * if(OAmap.containsKey(oaId)) { String loginId= OAmap.get(oaId);
		 * mapUser.put("loginId",loginId); mapUser.put("orgId", orgId);
		 * mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
		 * mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
		 * mapUser.put("usertype",2); mapUser.put("oaid", oaId);
		 * mapIndexMapper.insertMapUser(mapUser); } } }
		 * 
		 */

		/********** heapManager ***************/
		// 社会经理要删除的
		headList.removeAll(headManagerList);
		// 社会经理要增加的
		headManagerList.removeAll(headList1);

		for (String deHeapManager : headList) {
			deMap = new HashMap<String, Object>();
			deMap.put("login_id", deHeapManager);
			deMap.put("orgId", orgId);
			deMap.put("usertype", 1);
			mapIndexMapper.deleteUserS(deMap);
		}
		for (String addHeapManager : headManagerList) {
			mapUserTemp = mapIndexMapper.selectUserOne(addHeapManager);
			if (null != mapUserTemp && mapUserTemp.size() > 0) {
				oaId = mapUserTemp.get(0).get("OA_ID").toString();
				loginID = OAmap.get(oaId);
				mapUser.put("loginId", loginID);
				mapUser.put("orgId", orgId);
				mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUser.put("usertype", 1);
				mapUser.put("oaid", oaId);
				mapIndexMapper.insertMapUser(mapUser);
			}
		}
		/*
		 * String heapid = "";
		 * heapid=record.get("heapId");//.substring(0,record.get("heapId").
		 * length()-1); String[] heapids=heapid.split(","); //1,11, 1 11
		 * if(heapids.length>1) { for(int i =0;i<heapids.length;i++) {
		 * Map<String ,Object> map4 = new HashMap<String,Object>();
		 * map4.put("OA_ID",heapids[i]); map4.put("orgId", orgId);
		 * map4.put("usertype",1); mapIndexMapper.deleteUser(map4); } }else {
		 * Map<String ,Object> map4 = new HashMap<String,Object>();
		 * map4.put("OA_ID",heapids[0]); map4.put("orgId", orgId);
		 * map4.put("usertype", 1); mapIndexMapper.deleteUser(map4); }
		 * if(StringUtils.isNotEmpty(record.get("heapManagerlist"))){ //4
		 * if(record.get("heapManagerlist").startsWith("A:")) { String []
		 * heapManagerlists
		 * =record.get("heapManagerlist").split(":")[1].split(","); for(int
		 * i=0;i<heapManagerlists.length;i++) { List<Map<String, Object>>
		 * mapUserTemp = mapIndexMapper.selectUserOne(heapManagerlists[i]);
		 * String oaId = mapUserTemp.get(0).get("OA_ID").toString() ;
		 * if(OAmap.containsKey(oaId)) { String loginId= OAmap.get(oaId);
		 * mapUser.put("loginId",loginId); mapUser.put("orgId", orgId);
		 * mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
		 * mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
		 * mapUser.put("usertype",1); mapUser.put("oaid", oaId);
		 * mapIndexMapper.insertMapUser(mapUser); } } }else { String
		 * dd=record.get("heapManagerlist").split(",")[0]; List<Map<String,
		 * Object>> mapUserTemp = mapIndexMapper.selectUserOne(dd); String oaId
		 * = mapUserTemp.get(0).get("OA_ID").toString() ;
		 * if(OAmap.containsKey(oaId)) { String loginId= OAmap.get(oaId);
		 * mapUser.put("loginId",loginId); mapUser.put("orgId", orgId);
		 * mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
		 * mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
		 * mapUser.put("usertype",1); mapUser.put("oaid", oaId);
		 * mapIndexMapper.insertMapUser(mapUser); } } }
		 */

		/********** directManager ***************/
		// 直销经理
		// 直销经理要删除的
		dirList.removeAll(dirManagerList);
		// 直销经理要增加的
		dirManagerList.removeAll(dirList1);
		for (String deDirManager : dirList) {
			deMap = new HashMap<String, Object>();
			deMap.put("login_id", deDirManager);
			deMap.put("orgId", orgId);
			deMap.put("usertype", 4);
			mapIndexMapper.deleteUserS(deMap);
		}
		for (String addDirpManager : dirManagerList) {
			mapUserTemp = mapIndexMapper.selectUserOne(addDirpManager);
			if (null != mapUserTemp && mapUserTemp.size() > 0) {
				oaId = mapUserTemp.get(0).get("OA_ID").toString();
				loginID = OAmap.get(oaId);
				mapUser.put("loginId", loginID);
				mapUser.put("orgId", orgId);
				mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
				mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
				mapUser.put("usertype", 4);
				mapUser.put("oaid", oaId);
				mapIndexMapper.insertMapUser(mapUser);
			}
		}

		/*
		 * if(StringUtils.isNotEmpty(record.get("directManagerlist"))){ //1
		 * if(record.get("directManagerlist").startsWith("A:")) { String []
		 * directManagerlists
		 * =record.get("directManagerlist").split(":")[1].split(","); for(int
		 * i=0;i<directManagerlists.length;i++) { List<Map<String, Object>>
		 * mapUserTemp = mapIndexMapper.selectUserOne(directManagerlists[i]);
		 * String oaId = mapUserTemp.get(0).get("OA_ID").toString() ;
		 * if(OAmap.containsKey(oaId)) { String loginId= OAmap.get(oaId);
		 * mapUser.put("loginId",loginId); mapUser.put("orgId", orgId);
		 * mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
		 * mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
		 * mapUser.put("usertype", 4); mapUser.put("oaid", oaId);
		 * mapIndexMapper.insertMapUser(mapUser); } } }else { String
		 * dd=record.get("directManagerlist").split(",")[0]; List<Map<String,
		 * Object>> mapUserTemp = mapIndexMapper.selectUserOne(dd); String oaId
		 * = mapUserTemp.get(0).get("OA_ID").toString() ;
		 * if(OAmap.containsKey(oaId)) { String loginId= OAmap.get(oaId);
		 * mapUser.put("loginId",loginId); mapUser.put("orgId", orgId);
		 * mapUser.put("userName", mapUserTemp.get(0).get("USER_NAME"));
		 * mapUser.put("userMobile", mapUserTemp.get(0).get("USER_MOBILE"));
		 * mapUser.put("usertype", 4); mapUser.put("oaid", oaId);
		 * mapIndexMapper.insertMapUser(mapUser); } } }
		 */

		/********** direct_sale_user_info ***************/
		String dicid = "";
		dicid = record.get("direct_sale_user_infoId");
		String[] dicids = dicid.split(",");
		if (dicids.length > 1) {
			Map<String, Object> map4 = null;
			for (int i = 0; i < dicids.length; i++) {
				map4 = new HashMap<String, Object>();
				map4.put("orgId", orgId);
				map4.put("usertype", 6);
				mapIndexMapper.deleteUser(map4);
			}
		} else {
			Map<String, Object> map4 = new HashMap<String, Object>();
			map4.put("orgId", orgId);
			map4.put("usertype", 6);
			mapIndexMapper.deleteUser(map4);
		}
		if (StringUtils.isNotEmpty(record.get("direct_sale_user_infolist"))) {
			if (record.get("direct_sale_user_infolist").startsWith("A:")) {
				String[] direct_sale_user_infolists = record.get("direct_sale_user_infolist").split(":")[1].split(",");
				Map<String, Object> mapUserTemps = null;
				for (int i = 0; i < direct_sale_user_infolists.length; i++) {
					mapUserTemps = mapIndexMapper.selectUserBYuid(direct_sale_user_infolists[i].split(",")[0]);
					if (null != mapUserTemps && mapUserTemps.size() > 0) {
						mapUser.put("loginId", mapUserTemps.get("UID"));
						mapUser.put("orgId", orgId);
						mapUser.put("userName", mapUserTemps.get("USER_NAME"));
						mapUser.put("userMobile", mapUserTemps.get("USER_NUMBER"));
						mapUser.put("usertype", 6);
						mapUser.put("oaid", "");
						mapIndexMapper.insertMapUser(mapUser);
					}
				}
			} else {
				String dd = record.get("direct_sale_user_infolist").split(",")[0];
				Map<String, Object> mapUserTemps = mapIndexMapper.selectUserBYuid(dd);
				if (null != mapUserTemps && mapUserTemps.size() > 0) {
					mapUser.put("loginId", mapUserTemps.get("UID"));
					mapUser.put("orgId", orgId);
					mapUser.put("userName", mapUserTemps.get("USER_NAME"));
					mapUser.put("userMobile", mapUserTemps.get("USER_NUMBER"));
					mapUser.put("usertype", 6);
					mapUser.put("oaid", "");
					mapIndexMapper.insertMapUser(mapUser);
				}
			}
		}

		/********** societyManagerlist ***************/
		Map<String, Object> map7 = new HashMap<String, Object>();
		map7.put("orgId", orgId);
		map7.put("usertype", 7);
		mapIndexMapper.deleteUser(map7);
		if (StringUtils.isNotEmpty(record.get("societyManagerlist"))) {
			String[] societyManagerlists = record.get("societyManagerlist").split("-");
			JSONObject JSsociety = null;
			String name = null;
			String phone = null;
			Map<String, Object> mapUser1 = null;
			for (int i = 0; i < societyManagerlists.length; i++) {
				JSsociety = JSONArray.parseObject(societyManagerlists[i]);
				name = JSsociety.getString("name");
				phone = JSsociety.getString("phone");
				mapUser1 = new HashMap<String, Object>();
				mapUser1.put("loginId", "");
				mapUser1.put("orgId", orgId);
				mapUser1.put("userName", name);
				mapUser1.put("userMobile", phone);
				mapUser1.put("usertype", 7);
				// mapUser1.put("oaid", "");
				mapIndexMapper.insertMapUser(mapUser1);
			}
		}

		/********** MarketList ***************/
		Map<String, Object> map8 = new HashMap<String, Object>();
		map8.put("orgId", orgId);
		map8.put("usertype", 8);
		mapIndexMapper.deleteUser(map8);
		if (StringUtils.isNotEmpty(record.get("MarketManagerList"))) {
			String[] MarketManagerLists = record.get("MarketManagerList").split("-");
			JSONObject JSsociety = null;
			String name = null;
			String phone = null;
			Map<String, Object> mapUser1 = null;
			for (int i = 0; i < MarketManagerLists.length; i++) {
				JSsociety = JSONArray.parseObject(MarketManagerLists[i]);
				name = JSsociety.getString("name");
				phone = JSsociety.getString("phone");
				mapUser1 = new HashMap<String, Object>();
				mapUser1.put("loginId", "");
				mapUser1.put("orgId", orgId);
				mapUser1.put("userName", name);
				mapUser1.put("userMobile", phone);
				mapUser1.put("usertype", 8);
				// mapUser1.put("oaid", "");
				mapIndexMapper.insertMapUser(mapUser1);
			}
		}

		mapOrg.put("orgId", orgId);
		mapOrg.put("name", record.get("mapName"));
		mapIndexMapper.updateMapOrg(mapOrg);

		String[] poiList = record.get("poiList").split(",");
		List<String> listpoil = new ArrayList<String>();
		for (String s : poiList) {
			listpoil.add(s);
		}
		String[] channelList = record.get("channelList").split(",");
		List<String> channel = new ArrayList<String>();
		for (String s : channelList) {
			channel.add(s);
		}
		String[] stationList = record.get("stationList").split(",");
		List<String> station = new ArrayList<String>();
		for (String s : stationList) {
			station.add(s);
		}
		Map<String, Object> mappoi = new HashMap<String, Object>();
		mappoi.put("uid", listpoil);
		mappoi.put("gridCode", orgId);
		mapIndexMapper.updateMapBdPoi(mappoi);

		Map<String, Object> mapchannel = new HashMap<String, Object>();
		mapchannel.put("uid", channel);
		mapchannel.put("gridCode", orgId);
		mapIndexMapper.updateChannelInfo(mapchannel);

		Map<String, Object> mapstation = new HashMap<String, Object>();
		mapstation.put("uid", station);
		mapstation.put("gridCode", orgId);
		mapIndexMapper.updateStationInfo(mapstation);

		return orgId;
	}

	/**
	 * 删除网格信息
	 * 
	 * @Title delete
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return String
	 */
	public String delete(String orgId) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("uid", "");
		map.put("gridCode", orgId);
		mapIndexMapper.deleteUpdateMapBdPoi(map);

		Map<String, String> map1 = new HashMap<String, String>();
		map1.put("uid", "");
		map1.put("gridCode", orgId);
		mapIndexMapper.deleteUpdateChannelInfo(map1);

		Map<String, String> map2 = new HashMap<String, String>();
		map2.put("uid", "");
		map2.put("gridCode", orgId);
		mapIndexMapper.deleteUpdateStationInfo(map2);

		mapIndexMapper.deleteMapInfo(orgId);
		mapIndexMapper.deleteMapOrg(orgId);
		mapIndexMapper.deleteMapRoleSyss(orgId);
		mapIndexMapper.deleteSysUser(orgId);
		mapIndexMapper.deleteMapUser(orgId);
		return null;
	}

	/**
	 * 根据小区编码删除小区轮廓信息
	 * 
	 * @Title deleteCommunity
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return String
	 */
	public String deleteCommunity(String cellId) {
		mapIndexMapper.deleteCommunity(cellId);
		return null;
	}

	/**
	 * 查询网格轮廓信息
	 * 
	 * @Title selectGridByPid
	 * @Author xiaogaoxiang
	 * @param pid
	 * @return List<MapInfo>
	 */
	public List<MapInfo> selectGridByPid(String pid) {
		return mapIndexMapper.selectGridByPid(pid);
	}

	/**
	 * 查询小区轮廓信息
	 * 
	 * @Title selectCommunityGridByPid
	 * @Author xiaogaoxiang
	 * @param pid
	 * @return List<MapInfo>
	 */
	public List<MapInfo> selectCommunityGridByPid(String pid) {
		return mapIndexMapper.selectCommunityGridByPid(pid);
	}

	public List<Map<String, Object>> selectUserOne(String orgId, int userType) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("orgId", orgId);
		param.put("userType", userType);
		return mapIndexMapper.selectUserByOrgIdAndUserType(param);
	}

	public List<Map<String, Object>> selectUserOneS(String orgId, int userType) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("orgId", orgId);
		param.put("userType", userType);
		return mapIndexMapper.selectUserByOrgIdAndUserTypeS(param);
	}

	public List<Map<String, Object>> selectUserOneSale(String areaid, String orgId, int userType) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("areaid", areaid);
		param.put("orgId", orgId);
		param.put("userType", userType);
		return mapIndexMapper.selectUserOneSale(param);
	}

	public List<OrgDetail> getOrgDetail(String orgId) {
		return mapIndexMapper.getOrgDetail(orgId);
	}

	private void setShapeMM(String shape, Map<String, Object> info) {
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

	public Connection connect() throws SQLException, ClassNotFoundException {
		Connection connection = null;
		Class.forName(prop().getProperty("jdbc.driverClassName"));
		connection = (Connection) DriverManager.getConnection(prop().getProperty("jdbc.url"), prop().getProperty("jdbc.username"),
				prop().getProperty("jdbc.password"));
		return connection;
	}

	public Properties prop() {
		Properties prop = new Properties();
		InputStream inputStream = null;
		try {
			inputStream = getClass().getResourceAsStream("/sysConfig.properties");
			prop.load(inputStream);
		} catch (Exception exe) {
			exe.printStackTrace();
		} finally {
			try {
			} catch (Exception exe) {
			}
		}
		return prop;
	}

	public List<Map<String, String>> save_station_list(String orgId, String maxLng, String maxLat, String minLng, String minLat, String sharp)
			throws ClassNotFoundException, SQLException {
		PreparedStatement pstmt = connect().prepareStatement(
				"SELECT B.STATION_CODE AS ID,B.STATION_LON AS LNG,B.STATION_LAT AS LAT,B.STATION_NAME AS NAME FROM STATION_INFO B WHERE B.STATION_LON >= ? AND B.STATION_LON <= ? AND B.STATION_LAT >= ? AND B.STATION_LAT <= ? AND B.ORG_ID= ?");
		pstmt.setDouble(1, Double.parseDouble(minLng));
		pstmt.setDouble(2, Double.parseDouble(maxLng));
		pstmt.setDouble(3, Double.parseDouble(minLat));
		pstmt.setDouble(4, Double.parseDouble(maxLat));
		pstmt.setString(5, orgId);
		ResultSet rs = pstmt.executeQuery();
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		while (rs.next()) {
			if (PolygonUtil.isInside(JSONArray.parseArray(sharp), Double.parseDouble(rs.getString("LNG")), Double.parseDouble(rs.getString("LAT")))) {
				Map<String, String> temp = new HashMap<String, String>();
				temp.put("uid", rs.getString("ID"));
				list.add(temp);
			}
		}
		connect().close();
		return list;
	}

	public List<Map<String, String>> save_channel_list(String orgId, String maxLng, String maxLat, String minLng, String minLat, String sharp)
			throws ClassNotFoundException, SQLException {
		PreparedStatement pstmt = connect().prepareStatement(
				"SELECT B.CHNL_CODE AS ID,B.LON AS LNG,B.LAT AS LAT,B.CHNL_NAME AS NAME FROM CHANNEL_INFO B WHERE B.LON >= ? AND B.LON <= ? AND B.LAT >= ? AND B.LAT <= ? AND B.ORG_ID= ?");
		pstmt.setDouble(1, Double.parseDouble(minLng));
		pstmt.setDouble(2, Double.parseDouble(maxLng));
		pstmt.setDouble(3, Double.parseDouble(minLat));
		pstmt.setDouble(4, Double.parseDouble(maxLat));
		pstmt.setString(5, orgId);
		ResultSet rs = pstmt.executeQuery();
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		while (rs.next()) {
			if (PolygonUtil.isInside(JSONArray.parseArray(sharp), Double.parseDouble(rs.getString("LNG")), Double.parseDouble(rs.getString("LAT")))) {
				Map<String, String> temp = new HashMap<String, String>();
				temp.put("uid", rs.getString("ID"));
				list.add(temp);
			}
		}
		connect().close();
		return list;
	}

	public List<Map<String, String>> save_physical_list(String orgId, String maxLng, String maxLat, String minLng, String minLat, String sharp)
			throws ClassNotFoundException, SQLException {
		PreparedStatement pstmt = connect().prepareStatement(
				"SELECT B.uid AS ID,B.LNG AS LNG,B.LAT AS LAT,B.NAME AS NAME,B.TAG AS TAG FROM MAP_BD_POI B WHERE B.LNG >= ? AND B.LNG <= ? AND B.LAT >= ? AND B.LAT <= ? AND B.ORG_ID= ?");
		pstmt.setDouble(1, Double.parseDouble(minLng));
		pstmt.setDouble(2, Double.parseDouble(maxLng));
		pstmt.setDouble(3, Double.parseDouble(minLat));
		pstmt.setDouble(4, Double.parseDouble(maxLat));
		pstmt.setString(5, orgId);
		ResultSet rs = pstmt.executeQuery();
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		while (rs.next()) {
			if (PolygonUtil.isInside(JSONArray.parseArray(sharp), Double.parseDouble(rs.getString("LNG")), Double.parseDouble(rs.getString("LAT")))) {
				Map<String, String> temp = new HashMap<String, String>();
				temp.put("uid", rs.getString("ID"));
				list.add(temp);
			}
		}
		connect().close();
		return list;
	}

	public List<String> sql_point_list(String orgId, String maxLng, String maxLat, String minLng, String minLat, String sharp)
			throws ClassNotFoundException, SQLException {
		PreparedStatement pstmt = connect().prepareStatement(
				"SELECT B.uid AS ID,B.LNG AS LNG,B.LAT AS LAT FROM MAP_BD_POI B WHERE B.LNG >= ? AND B.LNG <= ? AND B.LAT >= ? AND B.LAT <= ? AND B.ORG_ID= ?");
		pstmt.setDouble(1, Double.parseDouble(minLng));
		pstmt.setDouble(2, Double.parseDouble(maxLng));
		pstmt.setDouble(3, Double.parseDouble(minLat));
		pstmt.setDouble(4, Double.parseDouble(maxLat));
		pstmt.setString(5, orgId);
		ResultSet rs = pstmt.executeQuery();
		List<String> list = new ArrayList<String>();
		while (rs.next()) {
			if (PolygonUtil.isInside(JSONArray.parseArray(sharp), Double.parseDouble(rs.getString("LNG")), Double.parseDouble(rs.getString("LAT")))) {
				list.add(rs.getString("ID"));
			}
		}
		connect().close();
		return list;
	}

	public int sql_channel_list(String orgId, String maxLng, String maxLat, String minLng, String minLat, String sharp)
			throws ClassNotFoundException, SQLException {
		PreparedStatement pstmt = connect().prepareStatement(
				"SELECT B.LON AS LNG,B.LAT AS LAT FROM CHANNEL_INFO B WHERE B.LON >= ? AND B.LON <= ? AND B.LAT >= ? AND B.LAT <= ? AND B.ORG_ID= ?");
		pstmt.setDouble(1, Double.parseDouble(minLng));
		pstmt.setDouble(2, Double.parseDouble(maxLng));
		pstmt.setDouble(3, Double.parseDouble(minLat));
		pstmt.setDouble(4, Double.parseDouble(maxLat));
		pstmt.setString(5, orgId);
		ResultSet rs = pstmt.executeQuery();
		int i = 0;
		while (rs.next()) {
			if (PolygonUtil.isInside(JSONArray.parseArray(sharp), Double.parseDouble(rs.getString("LNG")), Double.parseDouble(rs.getString("LAT")))) {
				i++;
			}
		}
		connect().close();
		return i;
	}

	public int getErrChannelNum(String orgId) {
		List<Map<String, String>> l = this.mapIndexMapper.getErr(orgId);
		int errNum = l.size();
		return errNum;
	}

	public Map<String, Object> getResultCost(String orgId, String maxLng, String maxLat, String minLng, String minLat, String shapeStr)
			throws ClassNotFoundException, SQLException {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("minLng", minLng);
		param.put("maxLng", maxLng);
		param.put("minLat", minLat);
		param.put("maxLat", maxLat);
		param.put("orgId", orgId);
		List<Map<String, Object>> poiList = mapIndexMapper.getPoiByShape(param);
		System.out.println(param);
		List<Map<String, Object>> channelList = mapIndexMapper.getChannelByShape(param);

		List<Map<String, Object>> stationList = mapIndexMapper.getStationByShape(param);

		List<String> poiInsideList = getInsideList(poiList, shapeStr);
		List<String> channelInsideList = getInsideList(channelList, shapeStr);
		List<String> stationlInsideList = getInsideList(stationList, shapeStr);
		Map<String, Object> result = new HashMap<String, Object>();

		Map<String, Object> temp = new HashMap<String, Object>();

		// ---收入规模：根据渠道常客和基站常驻用户统计收入，数据来源表：Grid_income_detail，该表包含所有基础单元（渠道和基站）下的用户及收入，
		List<String> dayCostPoint = new ArrayList<>();
		dayCostPoint.addAll(channelInsideList);
		dayCostPoint.addAll(stationlInsideList);

		// SQL超长不好玩啊，分段查询，一段长度就是uidsSize
		int uidsSize = 2000;

		// 根据渠道常客和基站常驻用户统计收入
		double dayCost = 0;
		if (dayCostPoint.size() > 0) {
			for (int i = 0; i < dayCostPoint.size(); i += uidsSize) {
				temp.put("uids", dayCostPoint.subList(i, Math.min(i + uidsSize, dayCostPoint.size())));

				dayCost += mapIndexMapper.selectDayCost(temp);
			}

		}
		result.put("dayCost", dayCost);

		// ----客户规模：使用圈到该圈中的基础单元编码关联grid_customer_detail，
		// 该表为全量客户基础单元明细。展示明细字段有：客户类型、规模。
		int customCost = 0;
		/*
		 * if(poiInsideList.size()>0) {
		 * 
		 * for(int i=0;i<poiInsideList.size();i+=uidsSize) { temp.put("uids",
		 * poiInsideList.subList(i, Math.min(i+uidsSize,poiInsideList.size())));
		 * 
		 * customCost += mapIndexMapper.selectCustomCost(temp); }
		 * 
		 * }
		 */
		if (dayCostPoint.size() > 0) {
			for (int i = 0; i < dayCostPoint.size(); i += uidsSize) {
				temp.put("uids", dayCostPoint.subList(i, Math.min(i + uidsSize, dayCostPoint.size())));

				customCost += mapIndexMapper.selectCustomCost(temp);
			}

		}
		result.put("customCost", customCost);

		/// ----小区规模：使用圈到该圈中的属于小区的基础单元编，该表为全量小区基础单元明细。展示字段有：小区类型、规模。
		int villageCost = 0;
		if (poiInsideList.size() > 0) {
			for (int i = 0; i < poiInsideList.size(); i += uidsSize) {
				temp.put("uids", poiInsideList.subList(i, Math.min(i + uidsSize, poiInsideList.size())));
				villageCost += mapIndexMapper.selectVillageCost(temp);
			}
		}
		result.put("villageCost", villageCost);

		/// ---集团规模：使用圈到该圈中的基础单元编码关联 grid_vip_customer_detail 
		///  ，该表为全量集团客户基础单元明细。展示字段有：集团名称、直属管理部门、规模。
		/// ---集团规模：网格划分完毕局方会提供每个网格的相关集团用户，在界面展示集团类型 （C类 D类），集团规模
		double groupCost = 0;
		if (poiInsideList.size() > 0) {
			for (int i = 0; i < poiInsideList.size(); i += uidsSize) {
				temp.put("uids", poiInsideList.subList(i, Math.min(i + uidsSize, poiInsideList.size())));
				groupCost += mapIndexMapper.selectGroupCost(temp);
			}
		}
		result.put("groupCost", groupCost);

		// ----渠道规模：直接关联全量渠道信息，展示明细字段有：渠道类型、一级类型、二级类型、规模。
		double channelCost = channelInsideList.size();

		result.put("channelCost", channelCost);

		// ----基站规模：stationlInsideList.size()
		double stationCost = stationlInsideList.size();
		result.put("stationCost", stationCost);

		result.put("channelCost", channelCost);

		result.put("poiList", poiInsideList);
		result.put("channelList", channelInsideList);
		result.put("stationList", stationlInsideList);
		System.out.println(result);
		return result;
	}

	private List<String> getInsideList(List<Map<String, Object>> pointList, String shapeStr) {
		List<String> uidList = new ArrayList<>();
		JSONArray shape = JSONArray.parseArray(shapeStr);
		for (Map<String, Object> point : pointList) {
			Double lng = Double.parseDouble(point.get("LNG").toString());
			Double lat = Double.parseDouble(point.get("LAT").toString());

			if (PolygonUtil.isInside(shape, lng, lat)) {
				if (null != point && !"".equals(point) && null != point.get("UID") && !"".equals(point.get("UID"))) {
					uidList.add(point.get("UID").toString());
				}
			}
		}
		return uidList;
	}

	public Page<Map<String, String>> getChannel(String[] uids, Integer page, Integer rows) {
		PageHelper.startPage(1, rows);
		Map<String, Object> Param = new HashMap<>();
		List<String> uidsArr = new ArrayList<>();
		for (int i = (page - 1) * rows; i < Math.min(uids.length, page * rows); i++) {
			uidsArr.add(uids[i]);
		}
		Param.put("uids", uidsArr);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.mapIndexMapper.getChannel(Param);
		pageList.pageNum(page);
		pageList.setTotal(uids.length);
		return pageList;
	}

	public List<Map<String, String>> getCountryGrid(String orgid, String countTryName) {

		Map<String, Object> ParamMap = new HashMap<>();
		ParamMap.put("orgid", orgid);
		ParamMap.put("countTryName", countTryName);

		List<Map<String, String>> pageList = this.mapIndexMapper.getCountryGrid(ParamMap);
		return pageList;
	}

	/**
	 * 根据当前登陆人的组织编码，基站名称，查询基站信息
	 * 
	 * @param orgid
	 * @param stationName
	 * @return
	 */
	public List<Map<String, Object>> getStationGrid(String orgid, String stationName) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("orgid", orgid);
		paramMap.put("stationName", stationName);
		List<Map<String, Object>> pageList = this.mapIndexMapper.getStationGrid(paramMap);
		return pageList;
	}

	public Page<Map<String, String>> getIncome(String[] uids, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Map<String, String[]> param = new HashMap<>();
		param.put("uids", uids);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.mapIndexMapper.getIncome(param);
		return pageList;
	}

	public Page<Map<String, String>> getCustomer(String[] uids, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Map<String, String[]> param = new HashMap<>();
		param.put("uids", uids);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.mapIndexMapper.getCustomer(param);
		return pageList;
	}

	public Page<Map<String, String>> getVillage(String[] uids, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Map<String, String[]> Param = new HashMap<>();
		Param.put("uids", uids);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.mapIndexMapper.getVillage(Param);
		return pageList;
	}

	public Page<Map<String, String>> getVipCustomer(String[] uids, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Map<String, String[]> Param = new HashMap<>();
		Param.put("uids", uids);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.mapIndexMapper.getVipCustomer(Param);
		return pageList;
	}

	public Page<Map<String, String>> getStation(String[] uids, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Map<String, String[]> Param = new HashMap<>();
		Param.put("uids", uids);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.mapIndexMapper.getStation(Param);
		return pageList;
	}

	public Page<Map<String, String>> getErr(String orgId, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.mapIndexMapper.getErr(orgId);
		return pageList;
	}

	public List<Map<String, String>> getErrExcel(String orgId) {
		return this.mapIndexMapper.getErr(orgId);

	}

	public List<Map<String, String>> initName(String orgId) {
		return this.mapIndexMapper.initName(orgId);
	}

	public int completeMap(String orgId) {
		Date date = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.YEAR, 1);
		// 增加一天
		cal.add(Calendar.DATE, 1);
		Date data1 = cal.getTime();
		SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd");
		String afterDate = SDF.format(data1);
		String status = "Y";
		Map<String, Object> ParamMap = new HashMap<String, Object>();
		ParamMap.put("date", afterDate);
		ParamMap.put("status", status);
		ParamMap.put("orgId", orgId);

		Map<String, Object> paramCusKey = new HashMap<String, Object>();

		paramCusKey.put("nowDate", new SimpleDateFormat("yyyyMMdd").format(new Date()));
		paramCusKey.put("orgId", orgId);

		this.mapIndexMapper.CallDb2(paramCusKey);
		return this.mapIndexMapper.UpdateCompleteMap(ParamMap);
	}

	public Map<String, Object> initPage(String orgId) {
		Map<String, Object> result = this.mapIndexMapper.initPage(orgId);
		return result;
	}

	public void exportDirectUserExcel(List<Map<String, Object>> mapList, ServletOutputStream outputStream, Boolean flag) {
		try {
			String[] titles = { "地市编码", "地市名称", "区县名称	", "区县编码", "网格名称", "网格编码", "工号编码", "工号姓名", "归属渠道名称", "渠道8位编码", "归属渠道经度", "归属渠道维度", "身份证号码", "性别",
					"参加移动直销工作时间", "移动电话", "直销员工号状态" };
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号
			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);
			// 设置表头居中
			style2.setAlignment(HorizontalAlignment.CENTER);
			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("网格直销经理信息录入模板");
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(17);
			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			HSSFRow row1 = sheet.createRow(0);
			HSSFCell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("网格直销经理信息录入模板");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (mapList != null) {
				for (int j = 0; j < mapList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					HSSFCell cell27 = row.createCell(0);
					cell27.setCellValue(mapList.get(j).get("city_id").toString());
					HSSFCell cell11 = row.createCell(1);
					cell11.setCellValue(mapList.get(j).get("city_name").toString());
					HSSFCell cell12 = row.createCell(2);
					cell12.setCellValue(mapList.get(j).get("cnty_name").toString());
					HSSFCell cell13 = row.createCell(3);
					cell13.setCellValue(mapList.get(j).get("cnty_id").toString());
					HSSFCell cell14 = row.createCell(4);
					cell14.setCellValue(mapList.get(j).get("grid_name").toString());
					HSSFCell cell15 = row.createCell(5);
					cell15.setCellValue(mapList.get(j).get("grid_code").toString());
					HSSFCell cell16 = row.createCell(6);
					cell16.setCellValue(mapList.get(j).get("office_id").toString());
					HSSFCell cell17 = row.createCell(7);
					cell17.setCellValue(mapList.get(j).get("name").toString());
					HSSFCell cell18 = row.createCell(8);
					cell18.setCellValue(mapList.get(j).get("belong_chnl_name").toString());
					HSSFCell cell19 = row.createCell(9);
					cell19.setCellValue(mapList.get(j).get("belong_chnl_code").toString());
					HSSFCell cell20 = row.createCell(10);
					cell20.setCellValue(mapList.get(j).get("lng").toString());
					HSSFCell cell21 = row.createCell(11);
					cell21.setCellValue(mapList.get(j).get("lat").toString());
					HSSFCell cell22 = row.createCell(12);
					cell22.setCellValue(mapList.get(j).get("cust_id").toString());
					HSSFCell cell23 = row.createCell(13);
					cell23.setCellValue(mapList.get(j).get("sex").toString());
					HSSFCell cell24 = row.createCell(14);
					cell24.setCellValue(mapList.get(j).get("work_date").toString());
					HSSFCell cell25 = row.createCell(15);
					cell25.setCellValue(mapList.get(j).get("phone").toString());
					HSSFCell cell26 = row.createCell(16);
					cell26.setCellValue(mapList.get(j).get("status").toString());
				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void exportExcel(List<DirectSaleUserInfo> empList, ServletOutputStream outputStream, Boolean flag) {
		try {
			String[] titles = { "姓名", "OA账号(邮箱@之前)" };
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("直销人员信息导入模板");
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(25);

			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			HSSFRow row1 = sheet.createRow(0);
			HSSFCell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("直销人员信息导入模板");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					HSSFCell cell11 = row.createCell(0);
					cell11.setCellValue(empList.get(j).getUserName());
					HSSFCell cell12 = row.createCell(1);
					cell12.setCellValue(empList.get(j).getUid());

				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/*
	 * private static HSSFCellStyle createCellStyle(HSSFWorkbook workbook, short
	 * fontSize) { HSSFCellStyle style = workbook.createCellStyle(); //创建字体
	 * HSSFFont font = workbook.createFont();
	 * font.setFontHeightInPoints(fontSize); //加载字体 style.setFont(font); return
	 * style; }
	 */

	public void exportExcel(List<MarketManager> empList, ServletOutputStream outputStream) {
		try {
			String[] titles = { "姓名(重名请在后面_n)", "手机号" };
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("销售经理信息导入模板");
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(25);

			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			HSSFRow row1 = sheet.createRow(0);
			HSSFCell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("销售经理信息导入模板");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					HSSFCell cell11 = row.createCell(0);
					cell11.setCellValue(empList.get(j).getUserName());
					HSSFCell cell12 = row.createCell(1);
					cell12.setCellValue(empList.get(j).getUserNumber());
				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 根据传入的网格编码和要导出的基础单元，分sheet单元导出
	 * 
	 * @Title exportGridExcel
	 * @Author xiaogaoxiang
	 * @param gridCode
	 * @param outputStream
	 * @param gridInfos
	 *            void
	 * @param gridInfos2
	 * @throws IOException
	 */
	public void exportGridExcel(String orgId, String gridCode, String gridName, String gridInfo, ServletOutputStream outputStream) throws IOException {
		// 解析选择的要导出的基础单元信息
		String[] gridInfos = gridInfo.split(",");
		// 根据登录人的orgId查询所有的网格信息
		List<SysOrg> sysOrgList = null;
		List<String> gridIds = null;
		Map<String, Object> map = new HashMap<>();
		// 判断网格编码是否为空，如果为空，则导出所有的网格信息
		if (null == gridCode || "".equals(gridCode)) {
			// 当选择的网格信息为全部时，则根据当前登录人orgId查询所有网格信息
			sysOrgList = gridCommonService.selectGridInfoByPid(orgId);
			map.put("orgLevel", 3);
		} else {
			// 当选择的网格信息不为空时，则根据当前选择的网格编码查询网格信息
			sysOrgList = gridCommonService.selectGridInfoByGridCode(gridCode);
			map.put("orgLevel", 4);
		}
		gridIds = new ArrayList<>();
		for (SysOrg so : sysOrgList) {
			gridIds.add(so.getOrgId());
		}
		map.put("gridIds", gridIds);

		// 定义整合所有的基础单元集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();

		// 创建对象
		HSSFWorkbook workbook = new HSSFWorkbook();
		// 将基础单元按照gridInfos进行分sheet
		for (String gi : gridInfos) {

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);
			// 2、创建工作表
			String name = null;
			String sheetName = null;
			// 查询出对应选择的基础单元的信息
			if ("channels".equals(gi)) {
				sheetName = "渠道Sheet";
				name = "渠道名称";
			} else if ("stations".equals(gi)) {
				sheetName = "基站Sheet";
				name = "基站名称";
			} else if ("community".equals(gi)) {
				sheetName = "小区Sheet";
				name = "小区名称";
			} else if ("building".equals(gi)) {
				sheetName = "楼宇Sheet";
				name = "楼宇名称";
			}
			HSSFSheet sheet = workbook.createSheet(sheetName);

			// 设置默认列宽
			sheet.setDefaultColumnWidth(25);
			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			HSSFRow row1 = sheet.createRow(0);
			HSSFCell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("基础单元信息模板");
			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = null;
			if ("community".equals(gi)) {
				titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "归属网格名称", "小区编码", "所属小区名称", "小区占地面积", "小区栋数", "小区户数", "小区地址", "小区经度", "小区纬度",
						"小区价值", "宽带用户数" };
			} else {
				titles = new String[] { "地市名称", "区县名称", "网格名称", "网格类别", name };
			}
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			HSSFCell cell2 = null;
			for (int i = 0; i < titles.length; i++) {
				cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}
			if (null != map && map.size() > 0) {
				// 查询出对应选择的基础单元的信息
				if ("channels".equals(gi)) {
					// 根据归属网格，查询所有的渠道信息
					allPoiLists = gridCommonService.selectChannelByGridCodes(map);
				} else if ("stations".equals(gi)) {
					// 根据归属网格，查询所有的基站信息
					allPoiLists = gridCommonService.selectStationByGridCodes(map);
				} else if ("community".equals(gi)) {
					// 根据归属网格，查询所有小区信息
					allPoiLists = gridCommonService.selectCommunityByGridCodes(map);
				} else if ("building".equals(gi)) {
					// 根据归属网格，查询所有楼宇信息
					allPoiLists = gridCommonService.selectBuildingByGridCodes(map);
				}
				// 4、操作单元格；将基站列表写入excel
				if (allPoiLists != null) {
					HSSFRow row = null;
					Cell cell11 = null;
					Cell cell12 = null;
					Cell cell13 = null;
					Cell cell14 = null;
					Cell cell15 = null;
					Cell cell16 = null;
					Cell cell17 = null;
					Cell cell18 = null;
					Cell cell19 = null;
					Cell cell20 = null;
					Cell cell21 = null;
					Cell cell22 = null;
					Cell cell23 = null;
					Cell cell24 = null;
					Cell cell25 = null;
					Cell cell26 = null;
					if ("community".equals(gi)) {
						for (int j = 0; j < allPoiLists.size(); j++) {
							row = sheet.createRow(j + 2);
							cell11 = row.createCell(0);
							cell11.setCellValue(allPoiLists.get(j).get("CITY_ID") == null ? "" : allPoiLists.get(j).get("CITY_ID").toString());
							cell12 = row.createCell(1);
							cell12.setCellValue(allPoiLists.get(j).get("CITY_NAME") == null ? "" : allPoiLists.get(j).get("CITY_NAME").toString());
							cell13 = row.createCell(2);
							cell13.setCellValue(allPoiLists.get(j).get("CNTY_ID") == null ? "" : allPoiLists.get(j).get("CNTY_ID").toString());
							cell14 = row.createCell(3);
							cell14.setCellValue(allPoiLists.get(j).get("CNTY_NAME") == null ? "" : allPoiLists.get(j).get("CNTY_NAME").toString());
							cell15 = row.createCell(4);
							cell15.setCellValue(allPoiLists.get(j).get("GRID_CODE") == null ? "" : allPoiLists.get(j).get("GRID_CODE").toString());
							cell16 = row.createCell(5);
							cell16.setCellValue(allPoiLists.get(j).get("GRID_NAME") == null ? "" : allPoiLists.get(j).get("GRID_NAME").toString());
							cell17 = row.createCell(6);
							cell17.setCellValue(allPoiLists.get(j).get("CELL_ID") == null ? "" : allPoiLists.get(j).get("CELL_ID").toString());
							cell18 = row.createCell(7);
							cell18.setCellValue(allPoiLists.get(j).get("CELL_NAME") == null ? "" : allPoiLists.get(j).get("CELL_NAME").toString());
							cell19 = row.createCell(8);
							cell19.setCellValue(
									allPoiLists.get(j).get("CELL_OCCUPY_AREA") == null ? "" : allPoiLists.get(j).get("CELL_OCCUPY_AREA").toString());
							cell20 = row.createCell(9);
							cell20.setCellValue(allPoiLists.get(j).get("CELL_CNT") == null ? "" : allPoiLists.get(j).get("CELL_CNT").toString());
							cell21 = row.createCell(10);
							cell21.setCellValue(allPoiLists.get(j).get("CELL_USER_CNT") == null ? "" : allPoiLists.get(j).get("CELL_USER_CNT").toString());
							cell22 = row.createCell(11);
							cell22.setCellValue(allPoiLists.get(j).get("CELL_ADDR") == null ? "" : allPoiLists.get(j).get("CELL_ADDR").toString());
							cell23 = row.createCell(12);
							cell23.setCellValue(allPoiLists.get(j).get("CELL_LONGITUDE") == null ? "" : allPoiLists.get(j).get("CELL_LONGITUDE").toString());
							cell24 = row.createCell(13);
							cell24.setCellValue(allPoiLists.get(j).get("CELL_LATITUDE") == null ? "" : allPoiLists.get(j).get("CELL_LATITUDE").toString());
							cell25 = row.createCell(14);
							cell25.setCellValue(allPoiLists.get(j).get("CELL_VALUE") == null ? "" : allPoiLists.get(j).get("CELL_VALUE").toString());
							cell26 = row.createCell(15);
							cell26.setCellValue(allPoiLists.get(j).get("KD_USER_CNT") == null ? "" : allPoiLists.get(j).get("KD_USER_CNT").toString());
						}
					} else {
						for (int j = 0; j < allPoiLists.size(); j++) {
							row = sheet.createRow(j + 2);
							cell11 = row.createCell(0);
							cell11.setCellValue(allPoiLists.get(j).get("AREANAME") == null ? "" : allPoiLists.get(j).get("AREANAME").toString());
							cell12 = row.createCell(1);
							cell12.setCellValue(allPoiLists.get(j).get("COUNTYNAME") == null ? "" : allPoiLists.get(j).get("COUNTYNAME").toString());
							cell13 = row.createCell(2);
							cell13.setCellValue(allPoiLists.get(j).get("GRIDNAME") == null ? "" : allPoiLists.get(j).get("GRIDNAME").toString());
							cell14 = row.createCell(3);
							cell14.setCellValue(allPoiLists.get(j).get("GRIDTYPE") == null ? "" : allPoiLists.get(j).get("GRIDTYPE").toString());
							cell15 = row.createCell(4);
							cell15.setCellValue(allPoiLists.get(j).get("NAME") == null ? "" : allPoiLists.get(j).get("NAME").toString());
						}
					}
				}
			}
		}
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 根据传入的网格编码和要导出的基础单元，分sheet单元导出
	 * 
	 * @Title exportGridExcel01
	 * @Author xiaogaoxiang
	 * @param gridCode
	 * @param outputStream
	 * @param gridInfos
	 *            void
	 * @param gridInfos2
	 * @throws IOException
	 */
	public void exportGridExcel01(String orgId, String oldOrgId, String orgLevel, String gridCode, String gridName, String gridInfo,
			ServletOutputStream outputStream) throws IOException {
		// 解析选择的要导出的基础单元信息
		String[] gridInfos = gridInfo.split(",");
		/*
		 * // 根据登录人的orgId查询所有的网格信息 List<SysOrg> sysOrgList = null; Set<String>
		 * gridIds = new HashSet<>(); Map<String, Object> map = new HashMap<>();
		 * // 判断网格编码是否为空，如果为空，则导出所有的网格信息 if (null == gridCode ||
		 * "".equals(gridCode) || "undefined".equals(gridCode)) {
		 * 
		 * // 根据orgId查询该组织下所有网格编码信息 List<SysOrg> allSysOrgList =
		 * sysOrgService.selectAllSysOrg(); SysOrg sysOrg =
		 * sysOrgService.selectSysOrgById(orgId); List<SysOrg>
		 * childrenSysOrgList =
		 * SysUserTreeMenuUtil.getChildrenOrgId(allSysOrgList, orgId);
		 * childrenSysOrgList.add(sysOrg); for (SysOrg so : childrenSysOrgList)
		 * { if (so.getOrgLevel().equals("3")) { gridIds.add(so.getOrgId()); } }
		 * map.put("orgLevel", 3); } else { // 当选择的网格信息不为空时，则根据当前选择的网格编码查询网格信息
		 * sysOrgList = gridCommonService.selectGridInfoByGridCode(gridCode);
		 * for (SysOrg so : sysOrgList) { gridIds.add(so.getOrgId()); }
		 * map.put("orgLevel", 4); } List<String> gridIdss = new
		 * ArrayList<>(gridIds); map.put("gridIds", gridIdss);
		 */
		// 定义参数map,包含orgId和OrgLevel
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgLevel", orgLevel);
		// 定义整合所有的基础单元集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();

		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 将基础单元按照gridInfos进行分sheet
		for (String gi : gridInfos) {
			// 1.2、头标题样式
			CellStyle style1 = createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 1.3、列标题样式
			CellStyle style2 = createCellStyle(workbook, (short) 13);
			// 2、创建工作表
			String name = null;
			String sheetName = null;
			String code = null;
			// 查询出对应选择的基础单元的信息
			if ("channels".equals(gi)) {
				sheetName = "渠道Sheet";
				name = "渠道名称";
				code = "渠道编码";
			} else if ("stations".equals(gi)) {
				sheetName = "基站Sheet";
				name = "基站名称";
				code = "基站编码";
			} else if ("community".equals(gi)) {
				sheetName = "小区Sheet";
				name = "小区名称";
				code = "小区编码";
			} else if ("building".equals(gi)) {
				sheetName = "楼宇Sheet";
				name = "楼宇名称";
				code = "楼宇编码";
			} else if ("gridInfo".equals(gi)) {
				sheetName = "网格信息Sheet";
				/* name = "网格信息名称"; */
			} else if ("ABGroupInfo".equals(gi)) {
				sheetName = "AB集团单位信息Sheet";
			} else if ("CDGroupInfo".equals(gi)) {
				sheetName = "CD集团单位信息Sheet";
			}
			Sheet sheet = workbook.createSheet(sheetName);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(25);
			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			Row row1 = sheet.createRow(0);
			Cell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("基础单元信息模板");
			// 3.2、创建列标题行；并且设置列标题
			Row row2 = sheet.createRow(1);
			String[] titles = null;
			String[] columns = null;
			if ("gridInfo".equals(gi)) {
				titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "网格类型", "区域总监", "直销人员", "移动渠道数", "联通渠道数", "电信渠道数", "基站数", "乡镇数", "行政村数",
						"渠道常客数", "基站23G客户数", "基站4G客户数", "集团客户数", "家宽客户数", "网格常驻人口", "收入", "同比", "环比", "渠道份额", "4G普及率", "通话客户数", "不限量套餐渗透率" };
			} else if ("community".equals(gi)) {
				titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "归属网格名称", "小区编码", "所属小区名称", "小区占地面积", "小区栋数", "小区户数", "小区地址", "小区经度", "小区纬度",
						"小区价值", "宽带用户数", "是否重点小区" };
			} else if ("ABGroupInfo".equals(gi)) {
				titles = new String[] { "地市名称", "区县名称", "归属网格名称", "集团编码", "集团名称", "经度", "纬度" };
				columns = new String[] { "AREA_NAME", "CNTY_NAME", "NAME", "GC_CODE", "GC_NAME", "JING_DU", "WEI_DU" };
			} else if ("CDGroupInfo".equals(gi)) {
				titles = new String[] { "地市名称", "区县名称", "归属网格名称", "集团编码", "集团名称", "经度", "纬度", "详细地址", "联系人", "联系电话", "成员数", "是否开通小微宽带", "是否开通专线", "是否开通家庭宽带",
						"是否开通企业上云" };
				columns = new String[] { "AREA_NAME", "CNTY_NAME", "NAME", "GC_CODE", "GC_NAME", "JING_DU", "WEI_DU", "GC_ADDR", "LINKMAN", "LINKMAN_MSISDN",
						"EMP_NUM", "IS_XWKD", "IS_KTZX", "IS_JTKD", "IS_QYSY" };
			} else {
				titles = new String[] { "地市名称", "区县名称", "网格编码", "网格名称", "网格类别", code, name, "经度", "纬度" };
			}
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = null;
			cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			Cell cell2 = null;
			for (int i = 0; i < titles.length; i++) {
				cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}
			if (null != map && map.size() > 0) {
				map.put("orgId", orgId);
				map.put("gridCode", gridCode);
				// 查询出对应选择的基础单元的信息
				if ("channels".equals(gi)) {
					// 根据归属网格，查询所有的渠道信息
					allPoiLists = gridCommonService.selectChannelByGridCodes(map);
				} else if ("stations".equals(gi)) {
					// 根据归属网格，查询所有的基站信息
					allPoiLists = gridCommonService.selectStationByGridCodes(map);
				} else if ("community".equals(gi)) {
					// 根据归属网格，查询所有小区信息
					allPoiLists = gridCommonService.selectCommunityByGridCodes(map);
				} else if ("building".equals(gi)) {
					// 根据归属网格，查询所有楼宇信息
					List<String> orgIds = new ArrayList<String>();
					if (orgLevel.equals("2")) {
						List<Map<String, Object>> orgIdMap = firstPageThreeService.getCntyCode(oldOrgId);
						for (Map<String, Object> maps : orgIdMap) {
							orgIds.add(maps.get("ORG_ID").toString());
						}
					} else {
						orgIds.add(orgId);
					}
					map.put("orgIds", orgIds);
					allPoiLists = gridCommonService.selectBuildingByGridCodes(map);
				} else if ("gridInfo".equals(gi)) {
					// 根据归属网格,查询所有网格信息
					allPoiLists = gridCommonService.selectGridInfoByGridCodes(map);
				} else if ("ABGroupInfo".equals(gi) || "CDGroupInfo".equals(gi)) {
					List<String> classIds = new ArrayList<String>();
					if ("ABGroupInfo".equals(gi)) {
						classIds.add("A");
						classIds.add("B");
						map.put("classIds", classIds);
						// 查询AB集团或则CD集团信息
						allPoiLists = gridCommonService.selectGroupInfoByGridCodes(map);
					} else {
						classIds.add("C");
						classIds.add("D");
						map.put("classIds", classIds);
						// 查询AB集团或则CD集团信息
						allPoiLists = gridCommonService.selectCDGroupInfoByGridCodes(map);
					}

				}
				// 4、操作单元格；将基站列表写入excel
				if (allPoiLists != null) {
					Row row = null;
					Cell cell11 = null;
					Cell cell12 = null;
					Cell cell13 = null;
					Cell cell14 = null;
					Cell cell15 = null;
					Cell cell16 = null;
					Cell cell17 = null;
					Cell cell18 = null;
					Cell cell19 = null;
					Cell cell20 = null;
					Cell cell21 = null;
					Cell cell22 = null;
					Cell cell23 = null;
					Cell cell24 = null;
					Cell cell25 = null;
					Cell cell26 = null;
					Cell cell27 = null;
					Cell cell28 = null;
					Cell cell29 = null;
					Cell cell30 = null;
					Cell cell31 = null;
					Cell cell32 = null;
					Cell cell33 = null;
					Cell cell34 = null;
					Cell cell35 = null;
					Cell cell36 = null;
					Cell cell37 = null;
					Cell cell38 = null;
					Cell cell = null;
					if ("gridInfo".equals(gi)) {
						// 网格信息
						for (int j = 0; j < allPoiLists.size(); j++) {
							row = sheet.createRow(j + 2);
							cell11 = row.createCell(0);
							cell11.setCellValue(allPoiLists.get(j).get("CITY_ID") == null ? "" : allPoiLists.get(j).get("CITY_ID").toString());
							cell12 = row.createCell(1);
							cell12.setCellValue(allPoiLists.get(j).get("CITY_NAME") == null ? "" : allPoiLists.get(j).get("CITY_NAME").toString());
							cell13 = row.createCell(2);
							cell13.setCellValue(allPoiLists.get(j).get("CNTY_ID") == null ? "" : allPoiLists.get(j).get("CNTY_ID").toString());
							cell14 = row.createCell(3);
							cell14.setCellValue(allPoiLists.get(j).get("CNTY_NAME") == null ? "" : allPoiLists.get(j).get("CNTY_NAME").toString());
							cell15 = row.createCell(4);
							cell15.setCellValue(allPoiLists.get(j).get("GRID_CODE") == null ? "" : allPoiLists.get(j).get("GRID_CODE").toString());
							cell16 = row.createCell(5);
							cell16.setCellValue(allPoiLists.get(j).get("GRID_NAME") == null ? "" : allPoiLists.get(j).get("GRID_NAME").toString());
							cell17 = row.createCell(6);
							cell17.setCellValue(allPoiLists.get(j).get("GRID_TYPE") == null ? "" : allPoiLists.get(j).get("GRID_TYPE").toString());
							cell18 = row.createCell(7);
							cell18.setCellValue(
									allPoiLists.get(j).get("MARKETING_DIRECTOR") == null ? "" : allPoiLists.get(j).get("MARKETING_DIRECTOR").toString());
							cell19 = row.createCell(8);
							cell19.setCellValue(allPoiLists.get(j).get("DIRECT_SELLER") == null ? "" : allPoiLists.get(j).get("DIRECT_SELLER").toString());
							cell20 = row.createCell(9);
							cell20.setCellValue(allPoiLists.get(j).get("MOBILE_CHNL_NUM") == null ? "" : allPoiLists.get(j).get("MOBILE_CHNL_NUM").toString());
							cell21 = row.createCell(10);
							cell21.setCellValue(allPoiLists.get(j).get("UNICOM_CHNL_NUM") == null ? "" : allPoiLists.get(j).get("UNICOM_CHNL_NUM").toString());
							cell22 = row.createCell(11);
							cell22.setCellValue(
									allPoiLists.get(j).get("TELECOM_CHNL_NUM") == null ? "" : allPoiLists.get(j).get("TELECOM_CHNL_NUM").toString());
							cell23 = row.createCell(12);
							cell23.setCellValue(allPoiLists.get(j).get("STATION_NUM") == null ? "" : allPoiLists.get(j).get("STATION_NUM").toString());
							cell24 = row.createCell(13);
							cell24.setCellValue(allPoiLists.get(j).get("TOWN_NUM") == null ? "" : allPoiLists.get(j).get("TOWN_NUM").toString());
							cell25 = row.createCell(14);
							cell25.setCellValue(allPoiLists.get(j).get("VILLAGE_NUM") == null ? "" : allPoiLists.get(j).get("VILLAGE_NUM").toString());
							cell26 = row.createCell(15);
							cell26.setCellValue(allPoiLists.get(j).get("CHNL_USER_NUM") == null ? "" : allPoiLists.get(j).get("CHNL_USER_NUM").toString());
							cell27 = row.createCell(16);
							cell27.setCellValue(
									allPoiLists.get(j).get("STATION_23G_USER") == null ? "" : allPoiLists.get(j).get("STATION_23G_USER").toString());
							cell28 = row.createCell(17);
							cell28.setCellValue(allPoiLists.get(j).get("STATION_4G_USER") == null ? "" : allPoiLists.get(j).get("STATION_4G_USER").toString());
							cell29 = row.createCell(18);
							cell29.setCellValue(allPoiLists.get(j).get("GROUP_NUM") == null ? "" : allPoiLists.get(j).get("GROUP_NUM").toString());
							cell30 = row.createCell(19);
							cell30.setCellValue(allPoiLists.get(j).get("KD_USER_NUM") == null ? "" : allPoiLists.get(j).get("KD_USER_NUM").toString());
							cell31 = row.createCell(20);
							cell31.setCellValue(
									allPoiLists.get(j).get("GRID_RESIDENT_USER") == null ? "" : allPoiLists.get(j).get("GRID_RESIDENT_USER").toString());
							cell32 = row.createCell(21);
							cell32.setCellValue(allPoiLists.get(j).get("FEE") == null ? "" : allPoiLists.get(j).get("FEE").toString());
							cell33 = row.createCell(22);
							cell33.setCellValue(
									allPoiLists.get(j).get("COMPARE_LAST_MONTH") == null ? "" : allPoiLists.get(j).get("COMPARE_LAST_MONTH").toString());
							cell34 = row.createCell(23);
							cell34.setCellValue(allPoiLists.get(j).get("COMPARE_YSE") == null ? "" : allPoiLists.get(j).get("COMPARE_YSE").toString());
							cell35 = row.createCell(24);
							cell35.setCellValue(allPoiLists.get(j).get("CHNL_SHAPE") == null ? "" : allPoiLists.get(j).get("CHNL_SHAPE").toString());
							cell36 = row.createCell(25);
							cell36.setCellValue(allPoiLists.get(j).get("USER_4G_PER") == null ? "" : allPoiLists.get(j).get("USER_4G_PER").toString());
							cell37 = row.createCell(26);
							cell37.setCellValue(allPoiLists.get(j).get("VOICE_USER_NUM") == null ? "" : allPoiLists.get(j).get("VOICE_USER_NUM").toString());
							cell38 = row.createCell(27);
							cell38.setCellValue(allPoiLists.get(j).get("BXL_BRAND_PER") == null ? "" : allPoiLists.get(j).get("BXL_BRAND_PER").toString());
						}
					} else if ("community".equals(gi)) {
						for (int j = 0; j < allPoiLists.size(); j++) {
							row = sheet.createRow(j + 2);
							cell11 = row.createCell(0);
							cell11.setCellValue(allPoiLists.get(j).get("CITY_ID") == null ? "" : allPoiLists.get(j).get("CITY_ID").toString());
							cell12 = row.createCell(1);
							cell12.setCellValue(allPoiLists.get(j).get("CITY_NAME") == null ? "" : allPoiLists.get(j).get("CITY_NAME").toString());
							cell13 = row.createCell(2);
							cell13.setCellValue(allPoiLists.get(j).get("CNTY_ID") == null ? "" : allPoiLists.get(j).get("CNTY_ID").toString());
							cell14 = row.createCell(3);
							cell14.setCellValue(allPoiLists.get(j).get("CNTY_NAME") == null ? "" : allPoiLists.get(j).get("CNTY_NAME").toString());
							cell15 = row.createCell(4);
							cell15.setCellValue(allPoiLists.get(j).get("GRID_CODE") == null ? "" : allPoiLists.get(j).get("GRID_CODE").toString());
							cell16 = row.createCell(5);
							cell16.setCellValue(allPoiLists.get(j).get("GRID_NAME") == null ? "" : allPoiLists.get(j).get("GRID_NAME").toString());
							cell17 = row.createCell(6);
							cell17.setCellValue(allPoiLists.get(j).get("CELL_ID") == null ? "" : allPoiLists.get(j).get("CELL_ID").toString());
							cell18 = row.createCell(7);
							cell18.setCellValue(allPoiLists.get(j).get("CELL_NAME") == null ? "" : allPoiLists.get(j).get("CELL_NAME").toString());
							cell19 = row.createCell(8);
							cell19.setCellValue(
									allPoiLists.get(j).get("CELL_OCCUPY_AREA") == null ? "" : allPoiLists.get(j).get("CELL_OCCUPY_AREA").toString());
							cell20 = row.createCell(9);
							cell20.setCellValue(allPoiLists.get(j).get("CELL_CNT") == null ? "" : allPoiLists.get(j).get("CELL_CNT").toString());
							cell21 = row.createCell(10);
							cell21.setCellValue(allPoiLists.get(j).get("CELL_USER_CNT") == null ? "" : allPoiLists.get(j).get("CELL_USER_CNT").toString());
							cell22 = row.createCell(11);
							cell22.setCellValue(allPoiLists.get(j).get("CELL_ADDR") == null ? "" : allPoiLists.get(j).get("CELL_ADDR").toString());
							cell23 = row.createCell(12);
							cell23.setCellValue(allPoiLists.get(j).get("CELL_LONGITUDE") == null ? "" : allPoiLists.get(j).get("CELL_LONGITUDE").toString());
							cell24 = row.createCell(13);
							cell24.setCellValue(allPoiLists.get(j).get("CELL_LATITUDE") == null ? "" : allPoiLists.get(j).get("CELL_LATITUDE").toString());
							cell25 = row.createCell(14);
							cell25.setCellValue(allPoiLists.get(j).get("CELL_VALUE") == null ? "" : allPoiLists.get(j).get("CELL_VALUE").toString());
							cell26 = row.createCell(15);
							cell26.setCellValue(allPoiLists.get(j).get("KD_USER_CNT") == null ? "" : allPoiLists.get(j).get("KD_USER_CNT").toString());
							cell27 = row.createCell(16);
							cell27.setCellValue(allPoiLists.get(j).get("CELL_TYPE") == null ? "" : allPoiLists.get(j).get("CELL_TYPE").toString());
						}
					} else if ("ABGroupInfo".equals(gi) || "CDGroupInfo".equals(gi)) {
						for (int j = 0; j < allPoiLists.size(); j++) {
							row = sheet.createRow(j + 2);
							for (int k = 0; k < columns.length; k++) {
								cell = row.createCell(k);
								if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
									cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
								}
							}
						}
					} else {
						for (int j = 0; j < allPoiLists.size(); j++) {
							row = sheet.createRow(j + 2);
							cell11 = row.createCell(0);
							cell11.setCellValue(allPoiLists.get(j).get("AREANAME") == null ? "" : allPoiLists.get(j).get("AREANAME").toString());
							cell12 = row.createCell(1);
							cell12.setCellValue(allPoiLists.get(j).get("COUNTYNAME") == null ? "" : allPoiLists.get(j).get("COUNTYNAME").toString());
							cell13 = row.createCell(2);
							cell13.setCellValue(allPoiLists.get(j).get("GRIDCODE") == null ? "" : allPoiLists.get(j).get("GRIDCODE").toString());
							cell14 = row.createCell(3);
							cell14.setCellValue(allPoiLists.get(j).get("GRIDNAME") == null ? "" : allPoiLists.get(j).get("GRIDNAME").toString());
							cell15 = row.createCell(4);
							cell15.setCellValue(allPoiLists.get(j).get("GRIDTYPE") == null ? "" : allPoiLists.get(j).get("GRIDTYPE").toString());
							cell16 = row.createCell(5);
							cell16.setCellValue(allPoiLists.get(j).get("NEWCODE") == null ? "" : allPoiLists.get(j).get("NEWCODE").toString());
							cell17 = row.createCell(6);
							cell17.setCellValue(allPoiLists.get(j).get("NAME") == null ? "" : allPoiLists.get(j).get("NAME").toString());
							cell18 = row.createCell(7);
							cell18.setCellValue(allPoiLists.get(j).get("LNG") == null ? "" : allPoiLists.get(j).get("LNG").toString());
							cell28 = row.createCell(8);
							cell28.setCellValue(allPoiLists.get(j).get("LAT") == null ? "" : allPoiLists.get(j).get("LAT").toString());
						}
					}
				}
			}
		}
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 根据传入的网格编码和要导出的基础单元，分sheet单元导出
	 * 
	 * @Title exportGridExcel01
	 * @Author xiaogaoxiang
	 * @param gridCode
	 * @param outputStream
	 * @param gridInfos
	 *            void
	 * @param gridInfos2
	 * @throws IOException
	 */
	public void exportGridExcelNotEnter(String orgId, String oldOrgId, String orgLevel, String gridInfo, ServletOutputStream outputStream) throws IOException {
		// 解析选择的要导出的基础单元信息
		String[] gridInfos = gridInfo.split(",");
		// 定义整合所有的基础单元集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		map.put("orgLevel", orgLevel);
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 将基础单元按照gridInfos进行分sheet
		for (String gi : gridInfos) {
			// 1.2、头标题样式
			CellStyle style1 = createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 1.3、列标题样式
			CellStyle style2 = createCellStyle(workbook, (short) 13);
			// 2、创建工作表
			String name = null;
			String sheetName = null;
			String code = null;
			// 查询出对应选择的基础单元的信息
			if ("channels".equals(gi)) {
				sheetName = "渠道Sheet";
				name = "渠道名称";
				code = "渠道编码";
			} else if ("stations".equals(gi)) {
				sheetName = "基站Sheet";
				name = "基站名称";
				code = "基站编码";
			} else if ("community".equals(gi)) {
				sheetName = "小区Sheet";
				name = "小区名称";
				code = "小区编码";
			} else if ("building".equals(gi)) {
				sheetName = "楼宇Sheet";
				name = "楼宇名称";
				code = "楼宇编码";
			} else if ("gridInfo".equals(gi)) {
				sheetName = "网格信息Sheet";
				/* name = "网格信息名称"; */
			} else if ("ABGroupInfo".equals(gi)) {
				sheetName = "AB集团单位信息Sheet";
			} else if ("CDGroupInfo".equals(gi)) {
				sheetName = "CD集团单位信息Sheet";
			}
			Sheet sheet = workbook.createSheet(sheetName);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(25);
			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			Row row1 = sheet.createRow(0);
			Cell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("基础单元信息模板");
			// 3.2、创建列标题行；并且设置列标题
			Row row2 = sheet.createRow(1);
			String[] titles = null;
			String[] columns = null;
			if ("gridInfo".equals(gi)) {
				titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "网格类型", "区域总监", "直销人员", "移动渠道数", "联通渠道数", "电信渠道数", "基站数", "乡镇数", "行政村数",
						"渠道常客数", "基站23G客户数", "基站4G客户数", "集团客户数", "家宽客户数", "网格常驻人口", "收入", "同比", "环比", "渠道份额", "4G普及率", "通话客户数", "不限量套餐渗透率" };
			} else if ("community".equals(gi)) {
				titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "归属网格名称", "小区编码", "所属小区名称", "小区占地面积", "小区栋数", "小区户数", "小区地址", "小区经度", "小区纬度",
						"小区价值", "宽带用户数", "是否重点小区" };
			} else if ("ABGroupInfo".equals(gi) || "CDGroupInfo".equals(gi)) {
				titles = new String[] { "地市名称", "区县名称", "归属网格名称", "集团编码", "集团名称", "经度", "纬度" };
				columns = new String[] { "AREA_NAME", "CNTY_NAME", "NAME", "GC_CODE", "GC_NAME", "JING_DU", "WEI_DU" };
			} else {
				titles = new String[] { "地市名称", "区县名称", "网格编码", "网格名称", "网格类别", code, name, "经度", "纬度" };
			}
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = null;
			cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			Cell cell2 = null;
			for (int i = 0; i < titles.length; i++) {
				cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}
			if (null != orgId && "" != orgId) {
				map.put("orgId", orgId);
				// 查询出对应选择的基础单元的信息
				if ("channels".equals(gi)) {
					// 根据归属网格，查询所有的渠道信息
					allPoiLists = gridCommonService.selectChannelByGridCodesNotEnter(map);
				} else if ("stations".equals(gi)) {
					// 根据归属网格，查询所有的基站信息
					allPoiLists = gridCommonService.selectStationByGridCodesNotEnter(map);
				} else if ("community".equals(gi)) {
					// 根据归属网格，查询所有小区信息
					allPoiLists = gridCommonService.selectCommunityByGridCodesNotEnter(map);
				} else if ("building".equals(gi)) {
					// 根据归属网格，查询所有楼宇信息
					List<String> orgIds = new ArrayList<String>();
					if (orgLevel.equals("2")) {
						List<Map<String, Object>> orgIdMap = firstPageThreeService.getCntyCode(oldOrgId);
						for (Map<String, Object> maps : orgIdMap) {
							orgIds.add(maps.get("ORG_ID").toString());
						}
					} else {
						orgIds.add(orgId);
					}
					map.put("orgIds", orgIds);
					allPoiLists = gridCommonService.selectBuildingByGridCodesNotEnter(map);
				} else if ("gridInfo".equals(gi)) {
					// 根据归属网格,查询所有网格信息
					allPoiLists = gridCommonService.selectGridInfoByGridCodesNotEnter(map);
				} else if ("ABGroupInfo".equals(gi) || "CDGroupInfo".equals(gi)) {
					List<String> classIds = new ArrayList<String>();
					if ("ABGroupInfo".equals(gi)) {
						classIds.add("A");
						classIds.add("B");
						map.put("classIds", classIds);
						// 查询AB集团或则CD集团信息
						allPoiLists = gridCommonService.selectABGroupInfoByGridCodesNotEnter(map);
					} else {
						classIds.add("C");
						classIds.add("D");
						map.put("classIds", classIds);
						// 查询AB集团或则CD集团信息
						allPoiLists = gridCommonService.selectCDGroupInfoByGridCodesNotEnter(map);
					}

					// 集团数据导出获取的是昨天的数据，为全量数据
					/*
					 * String dayBeforeOne = DateUtil.getYestoday("yyyyMMdd");
					 * map.put("statisDate", dayBeforeOne);
					 */

				}
				// 4、操作单元格；将基站列表写入excel
				if (allPoiLists != null) {
					Row row = null;
					Cell cell11 = null;
					Cell cell12 = null;
					Cell cell13 = null;
					Cell cell14 = null;
					Cell cell15 = null;
					Cell cell16 = null;
					Cell cell17 = null;
					Cell cell18 = null;
					Cell cell19 = null;
					Cell cell20 = null;
					Cell cell21 = null;
					Cell cell22 = null;
					Cell cell23 = null;
					Cell cell24 = null;
					Cell cell25 = null;
					Cell cell26 = null;
					Cell cell27 = null;
					Cell cell28 = null;
					Cell cell29 = null;
					Cell cell30 = null;
					Cell cell31 = null;
					Cell cell32 = null;
					Cell cell33 = null;
					Cell cell34 = null;
					Cell cell35 = null;
					Cell cell36 = null;
					Cell cell37 = null;
					Cell cell38 = null;
					Cell cell = null;
					if ("gridInfo".equals(gi)) {
						// 网格信息
						for (int j = 0; j < allPoiLists.size(); j++) {
							row = sheet.createRow(j + 2);
							cell11 = row.createCell(0);
							cell11.setCellValue(allPoiLists.get(j).get("CITY_ID") == null ? "" : allPoiLists.get(j).get("CITY_ID").toString());
							cell12 = row.createCell(1);
							cell12.setCellValue(allPoiLists.get(j).get("CITY_NAME") == null ? "" : allPoiLists.get(j).get("CITY_NAME").toString());
							cell13 = row.createCell(2);
							cell13.setCellValue(allPoiLists.get(j).get("CNTY_ID") == null ? "" : allPoiLists.get(j).get("CNTY_ID").toString());
							cell14 = row.createCell(3);
							cell14.setCellValue(allPoiLists.get(j).get("CNTY_NAME") == null ? "" : allPoiLists.get(j).get("CNTY_NAME").toString());
							cell15 = row.createCell(4);
							cell15.setCellValue(allPoiLists.get(j).get("GRID_CODE") == null ? "" : allPoiLists.get(j).get("GRID_CODE").toString());
							cell16 = row.createCell(5);
							cell16.setCellValue(allPoiLists.get(j).get("GRID_NAME") == null ? "" : allPoiLists.get(j).get("GRID_NAME").toString());
							cell17 = row.createCell(6);
							cell17.setCellValue(allPoiLists.get(j).get("GRID_TYPE") == null ? "" : allPoiLists.get(j).get("GRID_TYPE").toString());
							cell18 = row.createCell(7);
							cell18.setCellValue(
									allPoiLists.get(j).get("MARKETING_DIRECTOR") == null ? "" : allPoiLists.get(j).get("MARKETING_DIRECTOR").toString());
							cell19 = row.createCell(8);
							cell19.setCellValue(allPoiLists.get(j).get("DIRECT_SELLER") == null ? "" : allPoiLists.get(j).get("DIRECT_SELLER").toString());
							cell20 = row.createCell(9);
							cell20.setCellValue(allPoiLists.get(j).get("MOBILE_CHNL_NUM") == null ? "" : allPoiLists.get(j).get("MOBILE_CHNL_NUM").toString());
							cell21 = row.createCell(10);
							cell21.setCellValue(allPoiLists.get(j).get("UNICOM_CHNL_NUM") == null ? "" : allPoiLists.get(j).get("UNICOM_CHNL_NUM").toString());
							cell22 = row.createCell(11);
							cell22.setCellValue(
									allPoiLists.get(j).get("TELECOM_CHNL_NUM") == null ? "" : allPoiLists.get(j).get("TELECOM_CHNL_NUM").toString());
							cell23 = row.createCell(12);
							cell23.setCellValue(allPoiLists.get(j).get("STATION_NUM") == null ? "" : allPoiLists.get(j).get("STATION_NUM").toString());
							cell24 = row.createCell(13);
							cell24.setCellValue(allPoiLists.get(j).get("TOWN_NUM") == null ? "" : allPoiLists.get(j).get("TOWN_NUM").toString());
							cell25 = row.createCell(14);
							cell25.setCellValue(allPoiLists.get(j).get("VILLAGE_NUM") == null ? "" : allPoiLists.get(j).get("VILLAGE_NUM").toString());
							cell26 = row.createCell(15);
							cell26.setCellValue(allPoiLists.get(j).get("CHNL_USER_NUM") == null ? "" : allPoiLists.get(j).get("CHNL_USER_NUM").toString());
							cell27 = row.createCell(16);
							cell27.setCellValue(
									allPoiLists.get(j).get("STATION_23G_USER") == null ? "" : allPoiLists.get(j).get("STATION_23G_USER").toString());
							cell28 = row.createCell(17);
							cell28.setCellValue(allPoiLists.get(j).get("STATION_4G_USER") == null ? "" : allPoiLists.get(j).get("STATION_4G_USER").toString());
							cell29 = row.createCell(18);
							cell29.setCellValue(allPoiLists.get(j).get("GROUP_NUM") == null ? "" : allPoiLists.get(j).get("GROUP_NUM").toString());
							cell30 = row.createCell(19);
							cell30.setCellValue(allPoiLists.get(j).get("KD_USER_NUM") == null ? "" : allPoiLists.get(j).get("KD_USER_NUM").toString());
							cell31 = row.createCell(20);
							cell31.setCellValue(
									allPoiLists.get(j).get("GRID_RESIDENT_USER") == null ? "" : allPoiLists.get(j).get("GRID_RESIDENT_USER").toString());
							cell32 = row.createCell(21);
							cell32.setCellValue(allPoiLists.get(j).get("FEE") == null ? "" : allPoiLists.get(j).get("FEE").toString());
							cell33 = row.createCell(22);
							cell33.setCellValue(
									allPoiLists.get(j).get("COMPARE_LAST_MONTH") == null ? "" : allPoiLists.get(j).get("COMPARE_LAST_MONTH").toString());
							cell34 = row.createCell(23);
							cell34.setCellValue(allPoiLists.get(j).get("COMPARE_YSE") == null ? "" : allPoiLists.get(j).get("COMPARE_YSE").toString());
							cell35 = row.createCell(24);
							cell35.setCellValue(allPoiLists.get(j).get("CHNL_SHAPE") == null ? "" : allPoiLists.get(j).get("CHNL_SHAPE").toString());
							cell36 = row.createCell(25);
							cell36.setCellValue(allPoiLists.get(j).get("USER_4G_PER") == null ? "" : allPoiLists.get(j).get("USER_4G_PER").toString());
							cell37 = row.createCell(26);
							cell37.setCellValue(allPoiLists.get(j).get("VOICE_USER_NUM") == null ? "" : allPoiLists.get(j).get("VOICE_USER_NUM").toString());
							cell38 = row.createCell(27);
							cell38.setCellValue(allPoiLists.get(j).get("BXL_BRAND_PER") == null ? "" : allPoiLists.get(j).get("BXL_BRAND_PER").toString());
						}
					} else if ("community".equals(gi)) {
						for (int j = 0; j < allPoiLists.size(); j++) {
							row = sheet.createRow(j + 2);
							cell11 = row.createCell(0);
							cell11.setCellValue(allPoiLists.get(j).get("CITY_ID") == null ? "" : allPoiLists.get(j).get("CITY_ID").toString());
							cell12 = row.createCell(1);
							cell12.setCellValue(allPoiLists.get(j).get("CITY_NAME") == null ? "" : allPoiLists.get(j).get("CITY_NAME").toString());
							cell13 = row.createCell(2);
							cell13.setCellValue(allPoiLists.get(j).get("CNTY_ID") == null ? "" : allPoiLists.get(j).get("CNTY_ID").toString());
							cell14 = row.createCell(3);
							cell14.setCellValue(allPoiLists.get(j).get("CNTY_NAME") == null ? "" : allPoiLists.get(j).get("CNTY_NAME").toString());
							cell15 = row.createCell(4);
							cell15.setCellValue(allPoiLists.get(j).get("GRID_CODE") == null ? "" : allPoiLists.get(j).get("GRID_CODE").toString());
							cell16 = row.createCell(5);
							cell16.setCellValue(allPoiLists.get(j).get("GRID_NAME") == null ? "" : allPoiLists.get(j).get("GRID_NAME").toString());
							cell17 = row.createCell(6);
							cell17.setCellValue(allPoiLists.get(j).get("CELL_ID") == null ? "" : allPoiLists.get(j).get("CELL_ID").toString());
							cell18 = row.createCell(7);
							cell18.setCellValue(allPoiLists.get(j).get("CELL_NAME") == null ? "" : allPoiLists.get(j).get("CELL_NAME").toString());
							cell19 = row.createCell(8);
							cell19.setCellValue(
									allPoiLists.get(j).get("CELL_OCCUPY_AREA") == null ? "" : allPoiLists.get(j).get("CELL_OCCUPY_AREA").toString());
							cell20 = row.createCell(9);
							cell20.setCellValue(allPoiLists.get(j).get("CELL_CNT") == null ? "" : allPoiLists.get(j).get("CELL_CNT").toString());
							cell21 = row.createCell(10);
							cell21.setCellValue(allPoiLists.get(j).get("CELL_USER_CNT") == null ? "" : allPoiLists.get(j).get("CELL_USER_CNT").toString());
							cell22 = row.createCell(11);
							cell22.setCellValue(allPoiLists.get(j).get("CELL_ADDR") == null ? "" : allPoiLists.get(j).get("CELL_ADDR").toString());
							cell23 = row.createCell(12);
							cell23.setCellValue(allPoiLists.get(j).get("CELL_LONGITUDE") == null ? "" : allPoiLists.get(j).get("CELL_LONGITUDE").toString());
							cell24 = row.createCell(13);
							cell24.setCellValue(allPoiLists.get(j).get("CELL_LATITUDE") == null ? "" : allPoiLists.get(j).get("CELL_LATITUDE").toString());
							cell25 = row.createCell(14);
							cell25.setCellValue(allPoiLists.get(j).get("CELL_VALUE") == null ? "" : allPoiLists.get(j).get("CELL_VALUE").toString());
							cell26 = row.createCell(15);
							cell26.setCellValue(allPoiLists.get(j).get("KD_USER_CNT") == null ? "" : allPoiLists.get(j).get("KD_USER_CNT").toString());
							cell27 = row.createCell(16);
							cell27.setCellValue(allPoiLists.get(j).get("CELL_TYPE") == null ? "" : allPoiLists.get(j).get("CELL_TYPE").toString());
						}
					} else if ("ABGroupInfo".equals(gi) || "CDGroupInfo".equals(gi)) {
						for (int j = 0; j < allPoiLists.size(); j++) {
							row = sheet.createRow(j + 2);
							for (int k = 0; k < columns.length; k++) {
								cell = row.createCell(k);
								if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
									cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
								}
							}
						}
					} else {
						for (int j = 0; j < allPoiLists.size(); j++) {
							row = sheet.createRow(j + 2);
							cell11 = row.createCell(0);
							cell11.setCellValue(allPoiLists.get(j).get("AREANAME") == null ? "" : allPoiLists.get(j).get("AREANAME").toString());
							cell12 = row.createCell(1);
							cell12.setCellValue(allPoiLists.get(j).get("COUNTYNAME") == null ? "" : allPoiLists.get(j).get("COUNTYNAME").toString());
							cell13 = row.createCell(2);
							cell13.setCellValue(allPoiLists.get(j).get("GRIDCODE") == null ? "" : allPoiLists.get(j).get("GRIDCODE").toString());
							cell14 = row.createCell(3);
							cell14.setCellValue(allPoiLists.get(j).get("GRIDNAME") == null ? "" : allPoiLists.get(j).get("GRIDNAME").toString());
							cell15 = row.createCell(4);
							cell15.setCellValue(allPoiLists.get(j).get("GRIDTYPE") == null ? "" : allPoiLists.get(j).get("GRIDTYPE").toString());
							cell16 = row.createCell(5);
							cell16.setCellValue(allPoiLists.get(j).get("NEWCODE") == null ? "" : allPoiLists.get(j).get("NEWCODE").toString());
							cell17 = row.createCell(6);
							cell17.setCellValue(allPoiLists.get(j).get("NAME") == null ? "" : allPoiLists.get(j).get("NAME").toString());
							cell18 = row.createCell(7);
							cell18.setCellValue(allPoiLists.get(j).get("LNG") == null ? "" : allPoiLists.get(j).get("LNG").toString());
							cell28 = row.createCell(8);
							cell28.setCellValue(allPoiLists.get(j).get("LAT") == null ? "" : allPoiLists.get(j).get("LAT").toString());
						}
					}
				}
			}
		}
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	private static CellStyle createCellStyle(Workbook wb, short fontSize) {
		CellStyle style = wb.createCellStyle();
		// 创建字体
		Font font = wb.createFont();
		font.setFontHeightInPoints(fontSize);
		// 加载字体
		style.setFont(font);
		return style;
	}

	/**
	 * 导出基站信息
	 * 
	 * @Title exportStationExcel
	 * @Author xiaogaoxiang
	 * @param stationInfoList
	 * @param outputStream
	 *            void
	 */
	public void exportStationExcel(List<StationInfo> stationInfoList, ServletOutputStream outputStream) {
		try {
			String[] titles = { "基站编码", "基站名称", "基站经度", "基站纬度", "归属网格" };
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号
			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);
			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("基站信息导入模板");
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(25);
			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			HSSFRow row1 = sheet.createRow(0);
			HSSFCell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("基站信息导入模板");
			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			HSSFCell cell2 = null;
			for (int i = 0; i < titles.length; i++) {
				cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}
			// 4、操作单元格；将基站列表写入excel
			if (stationInfoList != null) {
				HSSFRow row = null;
				HSSFCell cell11 = null;
				HSSFCell cell12 = null;
				HSSFCell cell13 = null;
				HSSFCell cell14 = null;
				for (int j = 0; j < stationInfoList.size(); j++) {
					row = sheet.createRow(j + 2);
					cell11 = row.createCell(0);
					cell11.setCellValue(stationInfoList.get(j).getStationCode());
					cell12 = row.createCell(1);
					cell12.setCellValue(stationInfoList.get(j).getStationName());
					cell13 = row.createCell(2);
					cell13.setCellValue(stationInfoList.get(j).getStationLon().doubleValue());
					cell14 = row.createCell(3);
					cell14.setCellValue(stationInfoList.get(j).getStationLat().doubleValue());
				}
			}
			// 5、输出
			workbook.write(outputStream);
			// 6、关流
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static HSSFCellStyle createCellStyle(HSSFWorkbook workbook, short fontSize) {
		HSSFCellStyle style = workbook.createCellStyle();
		// 创建字体
		HSSFFont font = workbook.createFont();
		font.setFontHeightInPoints(fontSize);
		// 加载字体
		style.setFont(font);
		return style;
	}

	public void exportExcel(List<MarketManager> empList, ServletOutputStream outputStream, Boolean flag, Boolean flag1) {
		try {
			String[] titles = { "姓名(重名请在后面_n)", "手机号" };
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("装维人员信息导入模板");
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(25);

			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			HSSFRow row1 = sheet.createRow(0);
			HSSFCell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("装维人员信息导入模板");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					HSSFCell cell11 = row.createCell(0);
					cell11.setCellValue(empList.get(j).getUserName());
					HSSFCell cell12 = row.createCell(1);
					cell12.setCellValue(empList.get(j).getUserNumber());
				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 维护网格直销经理信息
	 * 
	 * @Title readDirectSaleExcelByPath
	 * @Author xiaogaoxiang
	 * @param fileName
	 * @return
	 * @throws IOException
	 *             String
	 */
	public String readDirectSaleExcelByPath(String fileName) throws IOException {
		// 返回message
		String message = null;
		HSSFWorkbook hssfworkbook = null;
		try {
			hssfworkbook = new HSSFWorkbook(new FileInputStream(fileName));
			// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
			HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);
			// 判断是否为空
			List<Map<String, Object>> mapList = readDirectSaleExcelIsNull(hssfsheet);
			if (null != mapList && mapList.size() > 0) {
				if (mapList.get(0).get("flag").equals("false")) {
					return mapList.get(0).get("errorMsg").toString();
				}
				List<Map<String, Object>> directSaleMapInfo = null;
				// 如果都不为空，则表示表内容合适，进行判断
				// 1，对每一条进行查询，并进行关键字判断，如果员工编码一致，则进行修改
				// 2，对每一条进行查询，如果对应一条没有数据，则执行新增
				for (Map<String, Object> map : mapList) {
					// 根据员工编码查询
					directSaleMapInfo = mapIndexMapper.selectDirectSaleByOfficeId(map.get("office_id").toString());
					// 如果查询出来存在，则修改
					if (null != directSaleMapInfo && directSaleMapInfo.size() > 0) {
						// 根据工号编码，修改网格直销经理信息
						mapIndexMapper.updateDirectSaleByOfficeId(map);
					}
					// 如果查询出来不存在，则新增
					else {
						// 新增网格直销经理信息
						mapIndexMapper.insertDirectSale(map);
					}
					message = "导入成功";
				}
			} else {
				message = "没有内容！";
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			hssfworkbook.close();
		}
		return message;
	}

	/**
	 * 判断是否有为空的值，如果为空，则返回空的集合信息
	 * 
	 * @Title readDirectSaleExcelIsNull
	 * @Author xiaogaoxiang
	 * @param hssfsheet
	 * @return List<Map<String,Object>>
	 */
	private List<Map<String, Object>> readDirectSaleExcelIsNull(HSSFSheet hssfsheet) {
		// 结果集
		List<Map<String, Object>> mapList = new ArrayList<>();
		// 结果
		Map<String, Object> map = null;
		boolean flag = true;
		String errorMsg = null;
		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 2; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow row = hssfsheet.getRow(j);
			if (row != null) {
				map = new HashMap<String, Object>();

				String gridName = "";
				String gridCode = "";
				String chnlName = "";
				String lon = "";
				String lat = "";
				// 根据渠道编码查询网格信息和渠道经纬度
				if (row.getCell(9) != null) {
					String channelCode = String.valueOf(getCellValue(row.getCell(9)));
					Map<String, Object> infoMap = mapIndexMapper.queryGridNameCodeAndLonLatByCnlCode(channelCode);
					if (infoMap != null && infoMap.size() > 0) {
						gridName = infoMap.get("NAME") == null ? null : infoMap.get("NAME").toString();
						gridCode = infoMap.get("ORG_ID") == null ? null : infoMap.get("ORG_ID").toString();
						chnlName = infoMap.get("CHNL_NAME") == null ? null : infoMap.get("CHNL_NAME").toString();
						lon = infoMap.get("LON") == null ? null : infoMap.get("LON").toString();
						lat = infoMap.get("LAT") == null ? null : infoMap.get("LAT").toString();
					}
				}
				// 地市编码
				if (row.getCell(0) != null) {
					map.put("city_id", String.valueOf(getCellValue(row.getCell(0))));
				} else {
					map.put("city_id", "");
				}
				// 地市名称
				if (row.getCell(1) != null) {
					map.put("city_name", String.valueOf(getCellValue(row.getCell(1))));
				} else {
					flag = false;
					errorMsg = "地市名称为空";
					break;
				}
				// 区县名称
				if (row.getCell(2) != null) {
					map.put("cnty_name", String.valueOf(getCellValue(row.getCell(2))));
				} else {
					flag = false;
					errorMsg = "区县名称为空";
					break;
				}
				// 区县编码
				if (row.getCell(3) != null) {
					map.put("cnty_id", String.valueOf(getCellValue(row.getCell(3))));
				} else {
					map.put("cnty_id", "");
				}
				// 网格名称
				map.put("grid_name", gridName);
				// 网格编码
				map.put("grid_code", gridCode);
				// 工号编码
				if (row.getCell(6) != null) {
					map.put("office_id", String.valueOf(getCellValue(row.getCell(6))));
				} else {
					flag = false;
					errorMsg = "工号编码为空";
					break;
				}
				// 工号姓名
				if (row.getCell(7) != null) {
					map.put("name", String.valueOf(getCellValue(row.getCell(7))));
				} else {
					flag = false;
					errorMsg = "工号姓名为空";
					break;
				}
				// 归属渠道名称
				map.put("belong_chnl_name", chnlName);
				// 渠道8位编码
				if (row.getCell(9) != null) {
					map.put("belong_chnl_code", String.valueOf(getCellValue(row.getCell(9))));
				} else {
					flag = false;
					errorMsg = "渠道8位编码为空";
					break;
				}
				// 归属渠道经度
				map.put("lng", lon);
				// 归属渠道纬度
				map.put("lat", lat);
				// 身份证号码
				if (row.getCell(12) != null) {
					map.put("cust_id", String.valueOf(getCellValue(row.getCell(12))));
				} else {
					flag = false;
					errorMsg = "身份证号码为空";
					break;
				}
				// 性别
				if (row.getCell(13) != null) {
					map.put("sex", String.valueOf(getCellValue(row.getCell(13))));
				} else {
					flag = false;
					errorMsg = "性别为空";
					break;
				}
				// 参加移动直销工作时间
				if (row.getCell(14) != null) {
					map.put("work_date", String.valueOf(getCellValue(row.getCell(14))));
				} else {
					flag = false;
					errorMsg = "参加移动直销工作时间为空";
					break;
				}
				// 移动电话
				if (row.getCell(15) != null) {
					map.put("phone", String.valueOf(getCellValue(row.getCell(15))));
				} else {
					flag = false;
					errorMsg = "移动电话为空";
					break;
				}
				// 直销员工号状态
				if (row.getCell(16) != null) {
					map.put("status", "1");
				}
				map.put("flag", "true");
				mapList.add(map);
			}
		}
		// 如果判断有为空的，则只返回一条错误信息，并把为空的记录给打印出来
		if (!flag) {
			List<Map<String, Object>> errorList = new ArrayList<>();
			Map<String, Object> errorMap = new HashMap<>();
			errorMap.put("flag", "false");
			errorMap.put("errorMsg", errorMsg);
			errorList.add(errorMap);
			return errorList;
		}
		return mapList;
	}

	/**
	 * 描述：对表格中数值进行格式化
	 * 
	 * @Title getCellValue
	 * @Author xiaogaoxiang
	 * @param cell
	 * @return Object
	 */
	@SuppressWarnings("deprecation")
	public static Object getCellValue(Cell cell) {
		Object value = null;
		DecimalFormat df = new DecimalFormat("0"); // 格式化number String字符
		SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd"); // 日期格式化
		DecimalFormat df2 = new DecimalFormat("0.00"); // 格式化数字

		switch (cell.getCellType()) {
		case Cell.CELL_TYPE_STRING:
			value = cell.getRichStringCellValue().getString();
			break;
		case Cell.CELL_TYPE_NUMERIC:
			if ("General".equals(cell.getCellStyle().getDataFormatString())) {
				value = df.format(cell.getNumericCellValue());
			} else if ("m/d/yy".equals(cell.getCellStyle().getDataFormatString())) {
				value = sdf.format(cell.getDateCellValue());
			} else {
				value = df2.format(cell.getNumericCellValue());
			}
			break;
		case Cell.CELL_TYPE_BOOLEAN:
			value = cell.getBooleanCellValue();
			break;
		case Cell.CELL_TYPE_BLANK:
			value = "";
			break;
		default:
			break;
		}
		return value;
	}

	/**
	 * 查询网格直销经理信息
	 * 
	 * @Title getDirectSaleInfo
	 * @Author xiaogaoxiang
	 * @param page
	 * @param rows
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getDirectSaleInfo(int page, int rows, List<String> orgIds) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		PageHelper.startPage(page, rows);
		result = mapIndexMapper.getDirectSaleInfo(orgIds);
		return result;
	}

	/**
	 * 更改直销经理状态
	 * 
	 * @Title updateDirectSaleStatus
	 * @Author xiaogaoxiang
	 * @param officeId
	 *            void
	 * @param statusType
	 */
	public void updateDirectSaleStatus(String officeId, String statusType) {
		mapIndexMapper.updateDirectSaleStatus(officeId, statusType);
	}

	/**
	 * 导入CD政企客户信息
	 * 
	 * @Title readGovBusExcelByPath
	 * @Author hubin
	 * @param fileName
	 * @return String
	 * @throws IOException
	 */
	public String readGovBusExcelByPath(String fileName) throws IOException {
		// 返回message
		String message = null;
		HSSFWorkbook hssfworkbook = null;
		try {
			hssfworkbook = new HSSFWorkbook(new FileInputStream(fileName));
			// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
			HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);
			// 判断是否为空
			List<Map<String, Object>> mapList = readGovBusExcelIsNull(hssfsheet);
			if (null != mapList && mapList.size() > 0) {
				if (mapList.get(0).get("flag").equals("false")) {
					return mapList.get(0).get("errorMsg").toString();
				}
				Map<String, Object> govBusMapInfo = null;
				// 如果都不为空，则表示表内容合适，进行判断
				// 1，对每一条进行查询，并进行关键字判断，如果CD政企客户编码一致，则进行修改
				// 2，对每一条进行查询，如果对应一条没有数据，则执行新增
				for (Map<String, Object> map : mapList) {
					// 根据CD政客客户名称查询
					govBusMapInfo = mapIndexMapper.selectGovBusByOfficeId(map.get("gc_code").toString());
					// 如果查询出来存在，则修改
					if (null != govBusMapInfo && govBusMapInfo.size() > 0) {
						// 根据CD政企客户编码，修改网格政企客户经理信息
						mapIndexMapper.updateGovBusByOfficeId(map);
					}
					// 如果查询出来不存在，则新增
					else {
						// 新增网格直销经理信息
						mapIndexMapper.insertGovBus(map);
					}
					message = "导入成功";
				}
			} else {
				message = "没有内容！";
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			hssfworkbook.close();
		}
		return message;
	}

	/**
	 * CD类政企客户信息
	 * 
	 * @param hssfsheet
	 * @return
	 */
	private List<Map<String, Object>> readGovBusExcelIsNull(HSSFSheet hssfsheet) {
		// 结果集
		List<Map<String, Object>> mapList = new ArrayList<>();
		// 结果
		Map<String, Object> map = null;
		boolean flag = true;
		String errorMsg = null;
		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 2; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow row = hssfsheet.getRow(j);
			if (row != null) {
				map = new HashMap<String, Object>();
				// 地市名称
				if (row.getCell(0) != null) {
					map.put("city_name", String.valueOf(getCellValue(row.getCell(0))));
				} else {
					flag = false;
					errorMsg = "地市名称为空";
					break;
				}
				// 区县名称
				if (row.getCell(1) != null) {
					map.put("cnty_name", String.valueOf(getCellValue(row.getCell(1))));
				} else {
					flag = false;
					errorMsg = "区县名称为空";
					break;
				}
				// 区县编码
				if (row.getCell(2) != null) {
					map.put("cnty_id", String.valueOf(getCellValue(row.getCell(2))));
				} else {
					flag = false;
					errorMsg = "区县编码为空";
					break;
				}
				// 网格名称
				if (row.getCell(3) != null) {
					map.put("grid_name", String.valueOf(getCellValue(row.getCell(3))));
				} else {
					flag = false;
					errorMsg = "网格名称为空";
					break;
				}
				// 网格编码
				if (row.getCell(4) != null) {
					map.put("grid_code", String.valueOf(getCellValue(row.getCell(4))));
				} else {
					flag = false;
					errorMsg = "网格编码为空";
					break;
				}
				// CD类政企客户名称
				if (row.getCell(5) != null) {
					map.put("gc_name", String.valueOf(getCellValue(row.getCell(5))));
				} else {
					flag = false;
					errorMsg = "CD类政企客户名称为空";
					break;
				}
				// CD类政企客户编码
				if (row.getCell(6) != null) {
					map.put("gc_code", String.valueOf(getCellValue(row.getCell(6))));
				} else {
					flag = false;
					errorMsg = "CD类政企客户编码为空";
					break;
				}
				// 详细地址
				if (row.getCell(7) != null) {
					map.put("addr", String.valueOf(getCellValue(row.getCell(7))));
				} else {
					flag = false;
					errorMsg = "地址为空";
					break;
				}
				// 联系人
				if (row.getCell(8) != null) {
					map.put("manager", String.valueOf(getCellValue(row.getCell(8))));
				} else {
					flag = false;
					errorMsg = "联系人为空";
					break;
				}
				// 联系电话
				if (row.getCell(9) != null) {
					map.put("phone", String.valueOf(getCellValue(row.getCell(9))));
				} else {
					flag = false;
					errorMsg = "联系电话为空";
					break;
				}
				// 经度
				if (row.getCell(10) != null) {
					map.put("lon", new BigDecimal(String.valueOf(row.getCell(10))).setScale(6, BigDecimal.ROUND_HALF_UP));
				} else {
					flag = false;
					errorMsg = "经度为空";
					break;
				}
				// 纬度
				if (row.getCell(11) != null) {
					map.put("lat", new BigDecimal(String.valueOf(row.getCell(11))).setScale(6, BigDecimal.ROUND_HALF_UP));
				} else {
					flag = false;
					errorMsg = "纬度为空";
					break;
				}
				map.put("flag", "true");
				mapList.add(map);
			}
		}
		// 如果判断有为空的，则只返回一条错误信息，并把为空的记录给打印出来
		if (!flag) {
			List<Map<String, Object>> errorList = new ArrayList<>();
			Map<String, Object> errorMap = new HashMap<>();
			errorMap.put("flag", "false");
			errorMap.put("errorMsg", errorMsg);
			errorList.add(errorMap);
			return errorList;
		}
		return mapList;
	}

	/**
	 * CD类政企客户模板
	 * 
	 * @param mapList
	 * @param outputStream
	 * @param flag
	 */
	public void exportGovBusUserExcel(List<Map<String, Object>> mapList, ServletOutputStream outputStream, Boolean flag) {
		try {
			String[] titles = { "地市名称", "区县名称	", "区县编码", "网格名称", "网格编码", "CD类政企客户名称", "CD类政企客户编码", "地址", "联系人", "联系电话", "经度", "纬度" };
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号
			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 12);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);
			// 设置表头居中
			style2.setAlignment(HorizontalAlignment.CENTER);
			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("CD类政企客户信息录入模板");
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(17);
			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			HSSFRow row1 = sheet.createRow(0);
			HSSFCell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("网格直销经理信息录入模板");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (mapList != null) {
				for (int j = 0; j < mapList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					HSSFCell cell11 = row.createCell(0);
					cell11.setCellValue(mapList.get(j).get("city_name").toString());
					HSSFCell cell12 = row.createCell(1);
					cell12.setCellValue(mapList.get(j).get("cnty_name").toString());
					HSSFCell cell13 = row.createCell(2);
					cell13.setCellValue(mapList.get(j).get("cnty_id").toString());
					HSSFCell cell14 = row.createCell(3);
					cell14.setCellValue(mapList.get(j).get("grid_name").toString());
					HSSFCell cell15 = row.createCell(4);
					cell15.setCellValue(mapList.get(j).get("grid_code").toString());
					HSSFCell cell16 = row.createCell(5);
					cell16.setCellValue(mapList.get(j).get("gc_name").toString());
					HSSFCell cell17 = row.createCell(6);
					cell17.setCellValue(mapList.get(j).get("gc_code").toString());
					HSSFCell cell18 = row.createCell(7);
					cell18.setCellValue(mapList.get(j).get("addr").toString());
					HSSFCell cell19 = row.createCell(8);
					cell19.setCellValue(mapList.get(j).get("manager").toString());
					HSSFCell cell20 = row.createCell(9);
					cell20.setCellValue(mapList.get(j).get("phone").toString());
					HSSFCell cell21 = row.createCell(10);
					cell21.setCellValue(mapList.get(j).get("lon").toString());
					HSSFCell cell22 = row.createCell(11);
					cell22.setCellValue(mapList.get(j).get("lat").toString());
				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询网格直销经理信息
	 * 
	 * @Title getGovBusInfo
	 * @Author hubinbin
	 * @param page
	 * @param rows
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getGovBusInfo(int page, int rows, String orgId) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		PageHelper.startPage(page, rows);
		result = mapIndexMapper.getGovBusInfo(orgId);
		return result;
	}

	/**
	 * 根据条件查询直销经理信息
	 * 
	 * @param page
	 * @param rows
	 * @param orgId
	 * @param inGrid
	 * @param city
	 * @param cnty
	 * @return
	 */
	public List<Map<String, Object>> getDirectSaleInfoByParam(int page, int rows, String orgId, String orgLevel, String inGrid) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		PageHelper.startPage(page, rows);
		result = mapIndexMapper.selectDirectSaleInfoByParams(orgId, orgLevel, inGrid);
		return result;
	}

	/**
	 * 根据officeid删除直销人员的网格
	 * 
	 * @author liupeidong
	 * @param idList
	 */
	public void removeDirectSaleGrid(List<String> idList) {
		mapIndexMapper.removeDirectSaleGrid(idList);
	}

	/**
	 * 根据orgid查询网格
	 * 
	 * @author liupeidong
	 * @param orgid
	 */
	public List<Map<String, Object>> selectGridByOrgid(int page, int rows, String orgid) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		PageHelper.startPage(page, rows);
		result = mapIndexMapper.selectGridByOrgid(orgid);
		return result;
	}

	/**
	 * 根据officeid设置人员渠道网格等信息
	 * 
	 * @title updateDirectSaleChannel
	 * @author liuepdiong
	 * @param gridname
	 * @param gridcode
	 * @param idList
	 */
	public void updateDirectSaleChannel(String channelName, String channelCode, List<String> idList) {
		String gridName = "", gridCode = "", chnlName = "", lon = "", lat = "";
		Map<String, Object> infoMap = mapIndexMapper.queryGridNameCodeAndLonLatByCnlCode(channelCode);
		if (infoMap != null && infoMap.size() > 0) {
			gridName = infoMap.get("NAME").toString();
			gridCode = infoMap.get("ORG_ID").toString();
			chnlName = infoMap.get("CHNL_NAME").toString();
			lon = infoMap.get("LON").toString();
			lat = infoMap.get("LAT").toString();
		}
		mapIndexMapper.updateDirectSaleChannel(gridName, gridCode, chnlName, channelCode, lon, lat, idList);
	}

	/**
	 * 根据条件查询CD类政企客户信息
	 * 
	 * @param page
	 * @param rows
	 * @param orgId
	 * @param inGrid
	 * @param city
	 * @param cnty
	 * @return
	 */
	public List<Map<String, Object>> getGovBusInfoByParam(int page, int rows, String orgId, String inGrid) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		PageHelper.startPage(page, rows);
		result = mapIndexMapper.selectGovBusInfoByParams(orgId, inGrid);
		return result;
	}

	/**
	 * 根据gcCode设置人员网格
	 * 
	 * @author hubinbin
	 * @param gridname
	 * @param gridcode
	 * @param idList
	 */
	public void addGovBusGrid(String gridname, String gridcode, List<String> idList) {
		mapIndexMapper.addGovBusGrid(gridname, gridcode, idList);
	}

	/**
	 * 根据gc_code删除cd政企客户的网格
	 * 
	 * @author hubinbin
	 * @param idList
	 */
	public void removeGovBusGrid(List<String> idList) {
		mapIndexMapper.removeGovBusGrid(idList);
	}

	/**
	 * 根据orgid查询渠道
	 * 
	 * @author liupeidong
	 * @param orgid
	 */
	public List<Map<String, Object>> selectChannelByOrgid(int page, int rows, String[] orgids) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		PageHelper.startPage(page, rows);
		result = mapIndexMapper.selectChannelByOrgid(orgids);
		return result;
	}

	/**
	 * 根据cellId查询小区信息
	 * 
	 * @Title selectCommunityCreateByCellId
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return Map<String,Object>
	 * @throws ParseException
	 */
	public Map<String, Object> selectCommunityCreateByCellId(String cellId) throws ParseException {
		// 获取当前月的年月字符串
		String statisMonth = DateUtils.subShortMonth(new Date());
		return mapIndexMapper.selectCommunityCreateByCellId(cellId, statisMonth);
	}

	/**
	 * 根据cellId查询小区信息（修改）
	 * 
	 * @Title selectCommunityEditByCellId
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return Map<String,Object>
	 */
	public Map<String, Object> selectCommunityEditByCellId(String cellId) {
		return mapIndexMapper.selectCommunityEditByCellId(cellId);
	}

	/**
	 * 根据cellId查询小区shape
	 * 
	 * @Title selectCommunityShapeByCellId
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return String
	 */
	public String selectCommunityShapeByCellId(String cellId) {
		return mapIndexMapper.selectCommunityShapeByCellId(cellId);
	}

	/**
	 * 根据cellId查询小区shapeGxh
	 * 
	 * @Title selectCommunityShapeGxhByCellId
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return String
	 */
	public String selectCommunityShapeGxhByCellId(String cellId) {
		return mapIndexMapper.selectCommunityShapeGxhByCellId(cellId);
	}

	/**
	 * 基础信息类型选择后，获取基础信息下拉框内容
	 * 
	 * @Title getBasicPoiInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param basicPoiOneInfoSelect
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getBasicPoiInfo(String orgId, String basicPoiOneInfoSelect) {
		List<Map<String, Object>> mapList = new ArrayList<>();
		// 渠道
		if ("basicChannel".equals(basicPoiOneInfoSelect)) {
			mapList = mapIndexMapper.selectChannelByOrgIdNew(orgId);
		}
		// 基站
		else if ("basicStation".equals(basicPoiOneInfoSelect)) {
			mapList = mapIndexMapper.selectStationByOrgId(orgId);
		}
		// 小区
		else if ("basicCommunity".equals(basicPoiOneInfoSelect)) {
			mapList = mapIndexMapper.selectCommunityByOrgId(orgId);
		}
		// AB集团
		else if ("basicAbGroup".equals(basicPoiOneInfoSelect)) {
			mapList = mapIndexMapper.selectAbGroupByOrgId(orgId);
		}
		// CD集团
		else if ("basicCdGroup".equals(basicPoiOneInfoSelect)) {
			mapList = mapIndexMapper.selectCdGroupByOrgId(orgId);
		}
		return mapList;
	}

	/**
	 * 根据基础单元类型，基础单元查询对应的经纬度
	 * 
	 * @Title getBasicPoiInfoById
	 * @Author xiaogaoxiang
	 * @param basicPoiOneInfoSelect
	 * @param basicPoiTwoInfoSelect
	 * @return Map<String, Object>
	 */
	public Map<String, Object> getBasicPoiInfoById(String basicPoiOneInfoSelect, String basicPoiTwoInfoSelect) {
		Map<String, Object> mapList = new HashMap<>();
		// 渠道
		if ("basicChannel".equals(basicPoiOneInfoSelect)) {
			mapList = mapIndexMapper.selectChannelByChannelCode(basicPoiTwoInfoSelect);
		}
		// 基站
		else if ("basicStation".equals(basicPoiOneInfoSelect)) {
			mapList = mapIndexMapper.selectChannelByStationName(basicPoiTwoInfoSelect);
		}
		// 小区
		else if ("basicCommunity".equals(basicPoiOneInfoSelect)) {
			mapList = mapIndexMapper.selectCommunityByCellId(basicPoiTwoInfoSelect);
		}
		// AB集团
		else if ("basicAbGroup".equals(basicPoiOneInfoSelect)) {
			mapList = mapIndexMapper.selectAbGroupByAbId(basicPoiTwoInfoSelect);
		}
		// CD集团
		else if ("basicCdGroup".equals(basicPoiOneInfoSelect)) {
			mapList = mapIndexMapper.selectCdGroupByCdId(basicPoiTwoInfoSelect);
		}
		return mapList;
	}

}
