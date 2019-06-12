package com.bonc.common.cst;

/**
 * 静态常量类
 * 
 * @author boqiang
 *
 */
public class BaseCST {

	/**
	 * 
	 * 构造函数：BaseCST.(私有构造函数)
	 *
	 */
	protected BaseCST() {
	}

	/**
	 * 常量
	 */

	/** 删除标识 （可用） **/
	public static final String DEL_FLAG_N = "0";

	/** 删除标识 （不可用） **/
	public static final String DEL_FLAG_Y = "1";

	/** 激活标识 （激活） **/
	public static final String ACTIVE_FLAG_ACT = "1";

	/** 权限ID(读取菜单) **/
	public static final String AUTH_ACCESS_MENU = "0";

	/** 空字符串 **/
	public static final String DEFAULT_BLANK = "";

	/** 系统默认工号（000000） **/
	public static final String DEFAULT_EMP_NO = "000000";

	/** 系统默认组织结构 **/
	public static final String DEFAULT_ORG_ID = "0";

	/** 系统默认密码（000000） **/
	public static final String DEFAULT_PASSWORD = "000000";

	/** 系统默认父ID **/
	public static final String DEFAULT_PARENT_ID = "0";

	/** 系统默认角色ID */
	public static final String DEFAULT_ROLE_ID = "0";

	/** 系统默认租户ID */
	public static final String DEFAULT_TENANT_ID = "0";

	/** 系统默认用户ID */
	public static final String DEFAULT_USER_ID = "0";

	/** 初始版本 **/
	public static final String INITIAL_VERSION = "v1.0";

	/** 是否初始密码（是） **/
	public static final String PWD_STATE_INITIAL = "0";

	/** 是否初始密码（否） **/
	public static final String PWD_STATE_ALTERED = "1";

	/** 返回值标识（成功） **/
	public static final String RES_SECCESS = "0";

	/** 返回值标识（业务异常） **/
	public static final String RES_LOGIC_ERROR = "1";

	/** 返回值标识（业务异常2） **/
	public static final String RES_LOGIC_ERROR_2 = "2";

	/** 返回值标识（业务异常3） **/
	public static final String RES_LOGIC_ERROR_3 = "3";

	/** 返回值标识（业务异常4） **/
	public static final String RES_LOGIC_ERROR_4 = "4";

	/** 返回值标识（业务异常5） **/
	public static final String RES_LOGIC_ERROR_5 = "5";

	/** 返回值标识（业务异常6） **/
	public static final String RES_LOGIC_ERROR_6 = "6";

	/** 返回值标识（系统异常） **/
	public static final String RES_EXCEPTION = "-1";

	/** 返回值标识（SESSION过期） **/
	public static final String RES_SESSION_TIME_OUT = "-2";

	/** 资源类型（应用菜单） **/
	public static final String RESOURCE_TYPE_MENU = "1";

	/** 资源类型（存储资源） **/
	public static final String RESOURCE_TYPE_STORAGE = "2";

	/** 资源类型（系统资源） **/
	public static final String RESOURCE_TYPE_SYS = "3";

	/** 根节点 **/
	public static final String TREE_ROOT = "0";

	/** 是否叶子节点（是） **/
	public static final String TREE_LEAF_Y = "1";

	/** 是否叶子节点（否） **/
	public static final String TREE_LEAF_N = "0";

	/** 树根节点所在层 **/
	public static final String TREE_TOP_LEVEL = "1";

	/** 租户状态（启用：0） **/
	public static final String TENANT_STATE_ON = "0";

	/** 租户状态（停用） **/
	public static final String TENANT_STATE_OFF = "1";

	/** 租户类型（管理租户） **/
	public static final String TENANT_TYPE_ADMIN = "0";

	/** 租户类型（普通租户） **/
	public static final String TENANT_TYPE_NORMAL = "1";

	/** 租户类型（运维租户） **/
	public static final String TENANT_TYPE_OPT = "2";

	/** 租户类型（超级租户） **/
	public static final String TENANT_TYPE_SUPER = "-1";

	/** 用户类型：普通用户（0） **/
	public static final String USER_LEVEL_MORMAL = "0";

	/** 用户类型：系统管理员（1） **/
	public static final String USER_LEVEL_SYS = "1";

	/** 用户类型：租户管理员（2） **/
	public static final String USER_LEVEL_TENANT = "2";

	/** 用户性别（男） **/
	public static final String USER_SEX_MALE = "0";

	/** 用户性别（女） **/
	public static final String USER_SEX_FEMALE = "1";

	/** 用户状态（启用:0） **/
	public static final String USER_STATE_ON = "0";

	/** 用户状态（停用:1） **/
	public static final String USER_STATE_OFF = "1";

	/** 连接测试成功 **/
	public static final String CONN_TEST_SUCCESS = "连接成功！";

	/** 连接测试失败 **/
	public static final String CONN_TEST_FAIL1 = "连接失败！";

	/** 无权限与主机连接！ **/
	public static final String CONN_TEST_FAIL2 = "无权限与主机连接！";

	/** 开始申请资源 **/
	public static final String APPLY_RESOURCE_STATE_START = "0";

	/** 申请资源完成 **/
	public static final String APPLY_RESOURCE_STATE_FINISH = "1";

	/** 申请资源失败 **/
	public static final String APPLY_RESOURCE_STATE_CANCEL = "2";

	/** 需要加密 **/
	public static final String ENCRYPT_NEED = "0";

	/** 不需要加密 **/
	public static final String ENCRYPT_NO_NEED = "1";

	/** JSON格式标识 **/
	public static final String PRODUCES_JSON = "application/json";

	/** HTML格式标识 **/
	public static final String PRODUCES_HTML = "text/html;charset=utf-8";

	/** 新增 **/
	public static final String HDN_TYPE_CREATE = "0";

	/** 编辑 **/
	public static final String HDN_TYPE_MODIFY = "1";

	/** resource 中的authId默认值 **/
	public static final String RESOURCE_AUTH_ID_DEFAULT = "0";

}
