package com.bonc.common.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanMap;

import com.bonc.common.cst.CST;

/**
 * 
 * @ClassName: SessionUtils
 * @Description: Session工具类
 * @author 李博强 liboqiang@bonc.com.cn
 * @date 2016年4月28日 下午7:29:10
 *
 */
public class Session extends BaseSession {

	/**
	 * 
	 * @Title: getUserId
	 * @Description: 获取用户Id
	 * @param session
	 * @return
	 */
	public static String getUserId() {
		try {
			return getSessionContent().get(0).get("userId");
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}

	/**
	 * 
	 * @Title: getUserName
	 * @Description: 获取用户名
	 * @param session
	 * @return
	 */
	public static String getUserName() {
		try {
			return getSessionContent().get(0).get("userName");
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}

	/**
	 * 
	 * getLoginId:(获取登录id). <br/>
	 * 
	 * @author liboqiang
	 * @return
	 * @since JDK 1.6
	 */
	public static String getLoginId() {
		try {
			return getSessionContent().get(0).get("loginId");
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}

	/**
	 * 
	 * @Title: getTenantType
	 * @Description: 获取租户类型
	 * @param session
	 * @return
	 */
	public static String getTenantType() {
		try {
			// TODO:这个地方需要做用户跨租户的支持，暂时先不做
			return getSessionContent().get(0).get("tenantType");
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}

	/**
	 * 
	 * @Title: getTenantIds
	 * @Description: 获取租户ID列表
	 * @param session
	 * @return
	 */
	public static List<String> getTenantIds() {
		try {
			List<String> tenantList = new ArrayList<String>();
			for (Map<String, String> map : getSessionContent()) {
				String tenantId = map.get("tenantId");
				if (!tenantList.contains(tenantId)) {
					tenantList.add(tenantId);
				}
			}
			return tenantList;
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<String>();
		}
	}

	/**
	 * 
	 * getSessionId:(获取Session id). <br/>
	 * 
	 * @author liboqiang
	 * @return
	 * @since JDK 1.6
	 */
	public static String getId() {
		try {
			return getSession().getId();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 
	 * @Title: getRoleList
	 * @Description: 获取角色列表
	 * @param session
	 * @return
	 */
	public static List<String> getRoleIds() {
		try {
			List<String> roleList = new ArrayList<String>();
			for (Map<String, String> map : getSessionContent()) {
				String roleId = map.get("roleId");
				if (!roleList.contains(roleId)) {
					roleList.add(roleId);
				}
			}
			return roleList;
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<String>();
		}
	}

	/**
	 * 
	 * @Title: getUserInfo
	 * @Description: 获取登陆信息
	 * @param session
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static List<Map<String, String>> getSessionContent() {
		try {
			Map<String, String> map = new BeanMap(getSession().getAttribute("userInfo"));
			List<Map<String, String>> list = new ArrayList<Map<String, String>>();
			list.add(map);
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<Map<String, String>>();
		}
	}

	/**
	 * 
	 * getPwdState:(获取密码状态). <br/>
	 * 
	 * @author liboqiang
	 * @return
	 * @since JDK 1.6
	 */
	public static String getPwdState() {
		try {
			return getSessionContent().get(0).get("pwdState");
		} catch (Exception e) {
			e.printStackTrace();
			return CST.PWD_STATE_INITIAL;
		}
	}

	/**
	 * 
	 * @Title: isSuperAdmin
	 * @Description: 超级管理员认证
	 * @return
	 */
	public static boolean isSuperAdmin() {
		try {
			return getUserId().equals(CST.DEFAULT_USER_ID) ? true : false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * 
	 * @Title: isTenantAdmin
	 * @Description: 租户管理员认证(在多个租户中，只要是一个租户的管理员则被认证为租户管理员)
	 * @return
	 */
	public static boolean isOneOfTenantAdmin() {
		try {
			return getTenantIds().contains(getUserId()) ? true : false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * 
	 * getEhcacheKey:(获取ehcache key). <br/>
	 * 
	 * @author liboqiang
	 * @return
	 * @since JDK 1.6
	 */
	public static String getEhcacheKey() {
		try {
			return (String) getSession().getAttribute("ehcacheKey");
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}
}
