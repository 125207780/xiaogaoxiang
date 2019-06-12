package com.bonc.map.action;

import java.awt.Polygon;
import java.awt.geom.Area;
import java.awt.geom.PathIterator;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.common.cst.CST;
import com.bonc.common.page.Page;
import com.bonc.common.utils.Ajax;
import com.bonc.map.dao.entity.MapInfo;
import com.bonc.map.dao.entity.MapPoi;
import com.bonc.map.service.GridCommonService;
import com.bonc.school.service.SchoolIndexService;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysOrgService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;



@Controller
@RequestMapping(value = "/gridCommon")
public class GridCommonAction {
	
	@Resource
	private GridCommonService gridCommonService;
	@Resource
	private SysOrgService sysOrgService;
	
	@Autowired
	private SchoolIndexService schoolIndexService;
	
	@RequestMapping(value = "/getLeftTree")
	@ResponseBody
  public JSONArray getLeftTree(HttpSession session){
		SysUser user = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO); 
		JSONArray treeList = new JSONArray();
		if(user!=null&&!StringUtils.isBlank( user.getOrgId())) {
			String orgId = user.getOrgId();
		 
			SysOrg s =sysOrgService.selectSysOrgById(orgId);
		//	s.setTreeCode("/"+orgId);
			SysOrg param = new SysOrg();
			param.setTreeCode(s.getTreeCode());
			List<SysOrg>  list =gridCommonService.selectList(param);
			for(SysOrg t:list) {
				JSONObject o = new JSONObject();
				o.put("id",t.getOrgId());
				o.put("pId",t.getPid());
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
	 * @param orgId
	 * @return 
	 */
	@RequestMapping(value = "/getEmap")
	@ResponseBody
	public JSONObject getEmap(String orgId) {
		JSONObject result = new JSONObject();
	  SysOrg	sysOrg =sysOrgService.selectSysOrgById(orgId);
	  result.put("info", sysOrg);
	  
	  List<MapInfo> infoShape = gridCommonService.selectSysOrgPolygon(orgId);
	  JSONObject cp = new JSONObject();
	  
	  result.put("cp",getCenter(infoShape));//有的是多个区域，
	  int orgLevel = Integer.parseInt(sysOrg.getOrgLevel())+1;
	  
	  JSONArray features = new JSONArray();
	  if(sysOrg.getOrgLevel().equals("4")) {//当前点击的是 网格，
//		  orgId = sysOrg.getPid();
		  JSONObject mpobj = this.toEchartsMap(sysOrg,infoShape);
		  features.add(mpobj);
	  }else {
		  SysOrg param = new SysOrg();
		  param.setPid(orgId);
		  param.setOrgLevel(String.valueOf(orgLevel));
		  List<SysOrg>  childrenlist = gridCommonService.selectList(param);
		  for(SysOrg c : childrenlist) {
//			  
//			  if(sysOrg.getOrgLevel().equals("3")) {//当前点击第3级，查询第4级，百度地图呈现
//				  List<MapInfo> shape = gridCommonService.selectGridDetail(c.getOrgId());
//				  JSONObject mpobj = this.toBDMap(c,shape);s
//				  features.add(mpobj);
//			  }else {
				  List<MapInfo> shape = gridCommonService.selectSysOrgPolygon(c.getOrgId());
				  JSONObject mpobj = this.toEchartsMap(c,shape);
				  features.add(mpobj);
//			  }
		  }
	  }
		
	 
	  JSONObject mapObj = new JSONObject();
	  mapObj.put("type", "FeatureCollection");
	  mapObj.put("features", features);
	  result.put("mapObj", mapObj);
	  return result;
	  
	}
	private JSONObject getCenter(List<MapInfo> shape) {
		JSONObject result = new JSONObject();
		double cplng = 0.0;
		double cplat = 0.0 ;
		int k = 0 ;
		for(MapInfo s:shape) {
			k+=1;
			cplng+=s.getCplng();
			cplat+=s.getCplat();
		}
		cplng = cplng/k;
		cplat = cplat/k;
		result.put("cplng",cplng);
		result.put("cplat",cplat);
		
		return result;
	}
	
	private JSONObject toBDMap (SysOrg o ,List<MapInfo> shape) {
		JSONObject result = new JSONObject();
		result.put("id", o.getOrgId());
		result.put("name", o.getName());
		result.put("orgLevel", o.getOrgLevel());
		JSONArray coordinates = new JSONArray();
		for(MapInfo s:shape) {
			String shp =  s.getShape();
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
	 * @param o
	 * @param shape
	 * @return
	 */
	private JSONObject toEchartsMap (SysOrg o ,List<MapInfo> shape) {
		JSONObject result = new JSONObject();
		result.put("type", "Feature");
		JSONArray coordinates = new JSONArray();
		double cplng = 0.0;
		double cplat = 0.0 ;
		String color = "";
		for(MapInfo s:shape) {
			 
			String shp =  s.getShape();
			 
			cplng+=s.getCplng();
			cplat+=s.getCplat();
			JSONArray spo = JSONArray.parseArray(shp);
			
			JSONArray li = new JSONArray();
			for(int i=0;i<spo.size();i++) {
				JSONObject llo = spo.getJSONObject(i);
				JSONArray ll = new JSONArray();
				ll.add(llo.getDouble("lng"));
				ll.add(llo.getDouble("lat"));
				li.add(ll);
			}
			coordinates.add(li);
			color = s.getColor();
		}
		 
		
		JSONObject geometry = new  JSONObject();
		geometry.put("type", "Polygon");
		geometry.put("coordinates", coordinates);
		
		JSONObject properties = new  JSONObject();
		properties.put("id", o.getOrgId());
		properties.put("name", o.getName());
		properties.put("orgLevel", o.getOrgLevel());
		properties.put("color", color);
		//properties.put("childNum",1);
		JSONArray cp = new JSONArray();
		cplng = cplng/shape.size();
		cplat = cplat/shape.size();
		cp.add(cplng);
		cp.add(cplat);
		properties.put("cp", cp);
		
		result.put("properties", properties);
		result.put("geometry", geometry);
		
		return result;
	}
	@RequestMapping(value = "/getAreaMenu")
	@ResponseBody
	public List<SysOrg>  getAreaMenu(String orgId,HttpSession session) {
		List<SysOrg> result = new ArrayList<SysOrg>();
		/*SysUser user = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO); 
		String userOrgId =user.getOrgId();*/
		String userOrgId  ="1";
		String tmpId = orgId;
		while(true) {
			  SysOrg	sysOrg =sysOrgService.selectSysOrgById(tmpId);
			  result.add(sysOrg);
			  if(userOrgId.equals(tmpId)||sysOrg.getOrgLevel().equals("1")||StringUtils.isBlank(sysOrg.getPid())) {
				  break;
			  }else {
				  tmpId = sysOrg.getPid();
			  }
		}
		return result;
	}
	
	@RequestMapping(value = "/selectAllChannelByOrgId")
	@ResponseBody
	public  List<MapPoi> selectAllChannelByOrgId(String orgId) {
	 
		return  gridCommonService.selectAllChannelByOrgId(orgId);
	}
	@RequestMapping(value = "/selectAllStationByOrgId")
	@ResponseBody
	public  List<MapPoi> selectAllStationByOrgId(String orgId) {
	 
		return  gridCommonService.selectAllStationByOrgId(orgId);
	}
	
	@RequestMapping(value = "/initSearchName")
	@ResponseBody
	public List<String> initSearchName(String orgId) {
		List<String> list = gridCommonService.initSearchName(orgId);
		return list;
	}
	
	@RequestMapping(value = "/selectSearchList")
	@ResponseBody
	public String selectSearchList(String name, String orgId, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		List<MapPoi> list = gridCommonService.selectSearchList(name, orgId);
		Page<MapPoi> result = new Page<MapPoi>(new PageInfo<MapPoi>(list));
		return Ajax.responseString(CST.RES_SECCESS, result,true);
	}
	
	@RequestMapping(value = "/selectAllPoiByOrgId")
	@ResponseBody
	public  List<MapPoi> selectAllPoiByOrgId(String orgId) {
	 
		return  gridCommonService.selectAllPoiByOrgId(orgId);
	}
	
	@RequestMapping(value = "/selectAreaShape")
	@ResponseBody
	public  List<MapPoi> selectAreaShape(String orgId) {
	 
		return  gridCommonService.selectAreaShape(orgId);
	}
	
	
	
	@RequestMapping(value = "/selectHouse",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String,String> selectHouse(String physical_id){
		Map<String,String> houseMap = gridCommonService.selectHouse(physical_id);
		if(houseMap==null) {
			houseMap=new HashMap<>();
		}
		return houseMap;
	}
	
	@RequestMapping(value = "/selectSchool",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String,String> selectSchool(String physical_id){
		Map<String,String> schoolMap = gridCommonService.selectSchool(physical_id);
		if(schoolMap==null) {
			schoolMap=new HashMap<>();
		}
		return schoolMap;
	}
	
	@RequestMapping(value = "/selectSchoolOrHouse")
	public String selectSchoolOrHouse(String physicalId,String level){
		String resultString = "/pages/gis/layer/notFound";
		Map<String,String> schoolOrHouse = gridCommonService.selectSchoolOrHouse(physicalId);
		String type = schoolOrHouse.get("BIG_TYPE");
		if("家居小区".equals(type)){
			resultString = "/pages/gis/layer/house";
		}
		if("文化教育".equals(type)){
			Map<String,Object> inMap = new HashMap<String,Object>();
			inMap.put("schoolId",physicalId);
			Map<String,String> resultMap = schoolIndexService.selectSchoolInfo(inMap);
			if(resultMap == null){
				resultString =  "/pages/gis/school/errorPage";
			}else{
				resultString =  "/pages/gis/school/schoolIndex";
			}
		}
		return resultString;
	}
	
	private final int TIMES= 100000;
	@RequestMapping(value = "/intersect",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public JSONArray intersect(String polygon_a,String polygon_b,String orgId,String gridCode) throws SQLException {
		System.out.println(polygon_a);
		Area pa = this.str2Pl(polygon_a);
		Area pb =  this.str2Pl(polygon_b);
		
		JSONArray result = new JSONArray();
		pa.intersect(pb);  
		//得到该区县下的所有网格
		List<MapInfo> ShapeList = this.gridCommonService.getShapeByGriCode(orgId,gridCode);
		for(int i=0 ;i<ShapeList.size();i++) {
			MapInfo mif = ShapeList.get(i);
			String polygon_o =mif.getShape();
			System.out.println(polygon_o);
			Area pc = this.str2Pl(polygon_o);
			pa.subtract(pc); 
		}	
		 PathIterator iterator = pa.getPathIterator(null);
		 float[] floats = new float[6];
		 JSONArray pl = new JSONArray();
		 float lastLng =0;
		 float lastLat =0;
		 boolean pflag = false;
		 while (!iterator.isDone()) {
			 int type = iterator.currentSegment(floats);
			 
			 float lng = floats[0]/TIMES;
			 float lat = floats[1]/TIMES;
			 JSONObject o = new JSONObject();
			 o.put("lng", lng);
			 o.put("lat", lat);
			 
			 boolean repeat = false;
			 if(pl.size()>0) {
				 JSONObject p = new JSONObject();
			 for(int j=0;j<pl.size();j++) {
				 System.out.println(pl.getJSONObject(j).getFloat("lng"));
				 System.out.println(pl.getJSONObject(j).getFloat("lat"));
				 System.out.println(o.getFloatValue("lng"));
				 System.out.println(o.getFloatValue("lat"));

				 if((o.getFloatValue("lng")==pl.getJSONObject(j).getFloat("lng"))&&(o.getFloatValue("lat")==pl.getJSONObject(j).getFloat("lat"))) {
					 p=pl.getJSONObject(j);
					 repeat = true;		
				 }
			 }
			 if (!repeat) {
				 pl.add(o);
		        }else {
		        pl.remove(p);
		        pl.add(o);
		       }
			 
			 }else {
				 pl.add(o); 
			 }
			 
			 if(type==PathIterator.SEG_CLOSE) {
				 System.out.println("----------------------------------------");
				 System.out.println(pl);
				 if(pl.size()>2) {
					 for(int i =0 ; i<pl.size()-3;i++) {
						float pl1_lng=pl.getJSONObject(i).getFloatValue("lng") ; //x1
						float pl1_lat=pl.getJSONObject(i).getFloatValue("lat") ; //y1
						float pl2_lng=pl.getJSONObject(i+1).getFloatValue("lng") ; //x2
						float pl2_lat=pl.getJSONObject(i+1).getFloatValue("lat") ; //y2
						float pl3_lng=pl.getJSONObject(i+2).getFloatValue("lng") ; //x3
						float pl3_lat=pl.getJSONObject(i+2).getFloatValue("lat") ; //y3
						if(pl2_lng==pl1_lng) {
							continue;
						}
						float k = (pl2_lat-pl1_lat)/(pl2_lng-pl1_lng);
						//b = y1-k*x1;
						float b =pl1_lat-k*(pl1_lng);   
						//t = k*x3 + b;
						float t =k *(pl3_lng)+b;
						if(Math.abs((pl3_lat-t))>0.000001) {
							break ;
						}
					 } 
					 result.add(pl); 
				 }
				 
				 pl = new JSONArray();
			 }
			 iterator.next();
		 }
		System.out.println("------------------------------------------------------------");
		System.out.println(result);
		return result;
	}
	
	private Area str2Pl(String plJson) {
		Polygon pl = new Polygon();
		
		JSONArray p  = JSONArray.parseArray(plJson);
		for(int i =0;i<p.size();i++) {
			JSONObject o = p.getJSONObject(i);
			double lng =o.getDoubleValue("lng");
			double lat = o.getDoubleValue("lat");
			pl.addPoint((int)(lng*TIMES), (int)(lat*TIMES));
		}
		return  new Area(pl);
	}
	
	
		
	@RequestMapping(value = "/selectPoiByUid")
	@ResponseBody
	public    MapPoi  selectPoiByUid(String uid) {
	 
		return  gridCommonService.selectPoiByUid(uid);
	}
	

	@RequestMapping(value = "/convexHull")
	@ResponseBody
	public static JSONArray  convexHull(String pointsStr) { //point : [{"lng":123.12,"lat":23.433},{"lng":"124.44","lat":22.55}]
		JSONArray  points = JSONArray.parseArray(pointsStr);
 
		JSONArray result = new JSONArray();
		if(points.size()<4) {
			return points;
		}
		//先找到初始点 ，Y最小 的情况下,X最小
		double startLat = Double.MAX_VALUE;
		double startLng = Double.MAX_VALUE;
		for(int i =0;i<points.size();i++) {
			JSONObject point = points.getJSONObject(i);
			double lng = point.getDoubleValue("lng");
			double lat = point.getDoubleValue("lat");
			if(startLat>lat) {
				startLat = lat;
				startLng =lng;
				
			}else if(startLat==lat) {
				if(startLng >lng) {
					startLng =lng;
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
	 
		int lastArea =0;
		
	    while(true) {
	    	double zLng = 0.0;
			double zLat = 0.0;
			double lineLength = 0.0;
			int areaNum = 5;
			for(int j =0;j<points.size();j++) {
				JSONObject point = points.getJSONObject(j);
				double  lng = point.getDoubleValue("lng");
				double  lat = point.getDoubleValue("lat");
				int pAreaNum =  0;
				if( lng==aLng &&  lat == aLat) { //当前点与线段起点重合，不计算。
					continue;
				}
				 
				if(lng>=aLng&&lat>=aLat) {
					pAreaNum  =1;
				}else if(lng <aLng && lat>=aLat) {
					pAreaNum  =2;
				}else if(lng <=aLng && lat <aLat) {
					pAreaNum =3 ;
				}else  if(lng > aLng && lat < aLat) {
					pAreaNum =4 ;
				}
				double length =  (lng-aLng)*(lng-aLng) +(lat-aLat)*(lat-aLat)  ;
				if(pAreaNum <lastArea) { 
					continue;
				}
				
				if(lineLength ==0.0) { //第一个点，不需要比较;
					zLng = lng;
					zLat = lat ; 
					lineLength= length;
					areaNum = pAreaNum;
					continue;
				}
				if(pAreaNum>areaNum) {//当前点对比临时z所在象限要大，那么夹角就一定会大，直接舍去
					continue;
				}else if(pAreaNum <areaNum) { //象限已经比临时z要小了，夹角必然小，不用比较其他了
					zLng = lng;
					zLat = lat ; 
					lineLength= length;
					areaNum = pAreaNum;
					continue;
				}
				//相同象限的情况
				if((zLat-aLat)*(lng-aLng)>(lat-aLat)*(zLng-aLng)) {//新的点比已保存的点夹角小
					zLng = lng;
					zLat = lat ; 
					lineLength= length;
					areaNum = pAreaNum;
				}else if((zLat-aLat)*(lng-aLng)==(lat-aLat)*(zLng-aLng)) { //相同夹角，线段长度大的代替小的
					if(length>lineLength) {
						zLng = lng;
						zLat = lat ; 
						lineLength= length;
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
			if(zLng ==startLng && zLat ==startLat  ) { //和起始点一样，绕了一圈
				break;
			}
			
	    }
		return result;	
		
	}	
	public static void main(String[] args) {
		String str = "[{\"lng\":\"112.987691\",\"lat\":\"28.314086\"},{\"lng\":\"112.999074\",\"lat\":\"28.223197\"},{\"lng\":\"113.01702\",\"lat\":\"28.32815\"},{\"lng\":\"113.038891\",\"lat\":\"28.371051\"}]";
				JSONArray p = convexHull(str);
		System.out.println(p.toJSONString());
	}
 

	@RequestMapping(value = "/initSchoolName")
	@ResponseBody
	public List<String> initSchoolName(String orgId) { //查询地市下的全部学校，但是输入参数是区县
		SysOrg	sysOrg =sysOrgService.selectSysOrgById(orgId);
		List<MapPoi>  tlist = gridCommonService.selectSchoolPoi(null,sysOrg.getPid());
		List<String> list = new ArrayList();
		
		for(MapPoi p :tlist) {
			list.add(p.getName());
		}
		return list;
	}
	
	@RequestMapping(value = "/selectSchoolList")
	@ResponseBody
	public String selectSchoolList(String name, String orgId, Integer page, Integer rows) {
		SysOrg	sysOrg =sysOrgService.selectSysOrgById(orgId);
		PageHelper.startPage(page, rows);
		List<MapPoi> list = gridCommonService.selectSchoolPoi(name, sysOrg.getPid());
		Page<MapPoi> result = new Page<MapPoi>(new PageInfo<MapPoi>(list));
		return Ajax.responseString(CST.RES_SECCESS, result,true);
	}
	
	@RequestMapping(value = "/selectAllSchoolPoiByOrgId")
	@ResponseBody
	public  List<MapPoi> selectAllSchoolPoiByOrgId(String orgId) { //查询地市下全部学校的POI ，但是输入参数是区县
		SysOrg	sysOrg =sysOrgService.selectSysOrgById(orgId);
		return  gridCommonService.selectSchoolPoi(null,sysOrg.getPid());
	}
	
	@RequestMapping(value = "/selectCityShape")
	@ResponseBody
	public  List<MapPoi> selectCityShape(String orgId) {
		SysOrg	sysOrg =sysOrgService.selectSysOrgById(orgId); 
		return  gridCommonService.selectAreaShape(sysOrg.getPid());
	}
}
