package com.bonc.common.cst;

/**
 * 静态常量类
 *
 * @author boqiang
 *
 */
public class CST {

	public static final String SESSION_SYS_USER_INFO = "sysUserInfo";

	/**
	 *
	 * 构造函数：CST.(私有构造函数)
	 *
	 */
	private CST() {
	}

	/**
	 * 常量
	 */
	/** ETL超管ID **/
	public final static String ETL_ADMIN_ID = "0";

	/** 删除标识 （可用） **/
	public final static String DEL_FLAG_N = "0";

	/** 删除标识 （不可用） **/
	public final static String DEL_FLAG_Y = "1";

	/** 激活标识 （激活） **/
	public final static String ACTIVE_FLAG_ACT = "1";

	/** 权限ID(读取菜单) **/
	public final static String AUTH_ACCESS_MENU = "0";

	/** 空字符串 **/
	public final static String DEFAULT_BLANK = "";

	/** 系统默认工号（000000） **/
	public static final String DEFAULT_EMP_NO = "000000";

	/** 系统默认组织结构 **/
	public final static String DEFAULT_ORG_ID = "0";

	/** 系统默认密码（000000） **/
	public static final String DEFAULT_PASSWORD = "000000";

	/** 系统默认父ID **/
	public final static String DEFAULT_PARENT_ID = "0";

	/** 系统默认角色ID */
	public final static String DEFAULT_ROLE_ID = "0";

	/** 系统默认租户ID */
	public final static String DEFAULT_TENANT_ID = "0";

	/** 系统默认用户ID */
	public final static String DEFAULT_USER_ID = "0";

	/** 初始版本 **/
	public final static String INITIAL_VERSION = "v1.0";

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
	public final static String RESOURCE_TYPE_MENU = "1";

	/** 资源类型（存储资源） **/
	public final static String RESOURCE_TYPE_STORAGE = "2";

	/** 资源类型（系统资源） **/
	public final static String RESOURCE_TYPE_SYS = "3";

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

	/** session中app的key **/
	public static final String SESSION_KEY_APP = "login_user_app";

	/** cache的key **/
	public static final String GLOBAL_CACHE = "globalCache";

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

	/** 用户配置类型(皮肤) **/
	public static final String USER_CONFIG_SKIN = "SKIN";

	/** 共享文件夹ID **/
	public static final String FILE_SHARE_FOLDER = "1";

	/** 垃圾箱ID **/
	public static final String FILE_TRASH_FOLDER = "2";

	/** 文件拥有类型：0 (本地文件) **/
	public static final String FILE_OWN_TYPE_LOCAL = "0";

	/** 文件拥有类型：1 (共享文件) **/
	public static final String FILE_OWN_TYPE_SHARED = "1";

	/** 文件夹类型（普通） **/
	public static final String FOLDER_TYPE_NORMAL = "0";

	/** 文件夹类型（回收站） **/
	public static final String FOLDER_TYPE_TRASH = "2";

	/*********************** API manager begin *************************/
	// 状态（3、未接入;4,已接入;5、已下架;6、上架;7、已删除）
	public static final String API_STATE_UNREGISTER = "3";
	public static final String API_STATE_REGISTER = "4";
	public static final String API_STATE_NOTDEPLOYED = "5";
	public static final String API_STATE_DEPLOYED = "6";
	public static final String API_STATE_DELETED = "7";
	// 工作流名称
	public static final String API_FLOW_APIINVOKE = "APIINVOKE";
	public static final String API_FLOW_APIREGISTER = "APIREGISTER";
	public static final String APP_FLOW_APPINVOKE = "APPINVOKE";
	public static final String APP_APPLY_FLOW_APPINVOKE = "APPAPPLYINVOKE";
	public static final String SANDBOX_FLOW_APPINVOKE = "SANDBOXINVOKE";
	public static final String WORKORDER_FLOW_WORKORDERSEND = "WORKORDERSEND";

	public static final String DATA_PRODUCT_FLOW_REGISTER = "DATAPRODUCTREGISTER";

	public static final String API_FLOW_URL = "/pages/jsp/api/apiFlowDetail.jsp?id=";
	public static final String DATA_PRODUCT_URL = "/pages/jsp/dataProduct/dataProductDetail.jsp?id=";

	/** 待办列表状态（0：待审批） **/
	public static final String FLOW_STATE_WAITE = "0";
	/** 待办列表状态(1:已审批) **/
	public static final String FLOW_STATE_APPROVAL = "1";
	/** 待办列表状态(2:已完成) **/
	public static final String FLOW_STATE_COMPLETE = "2";
	/** 待办列表详情URL **/
	public static final String FLOW_TODODETAIL_URL = "/pages/jsp/activiti/toDetail.jsp?waitId=";
	/** 待办状态，通过 **/
	public static final String FLOW_APPROVAL_STATE_AGREE = "agree";
	/** 待办状态，退回上一步 **/
	public static final String FLOW_APPROVAL_STATE_REJECT_PRE = "rejectPre";
	/** 待办状态，退回到开始 **/
	public static final String FLOW_APPROVAL_STATE_REJECT = "rejectStart";
	/** 任务类型(发起) **/
	public static final String FLOW_TYPE_START = "0";
	/** 任务类型(审批) **/
	public static final String FLOW_TYPE_APPROVE = "1";
	/** 工作流日志状态(待发送) **/
	public static final String FLOW_STATE_LOG_UNSENDED = "0";
	/** 工作流日志状态(办理中) **/
	public static final String FLOW_STATE_LOG_HANDLING = "1";
	/** 工作流日志状态(审核中) **/
	public static final String FLOW_STATE_LOG_AUDITING = "2";
	/** 工作流日志状态(已完成) **/
	public static final String FLOW_STATE_LOG_FINISHED = "3";
	/*********************** API manager end ***************************/
	/******************** data product begin ********************/
	// 状态（0、审批中、1、审批已通过、2、审批未通过 、3、未接入、4,已接入、5、已下架,6、上架,7、已删除）
	public static final String DATA_PRODUCT_UNREGISTER = "3";
	public static final String DATA_PRODUCT_REGISTER = "4";
	public static final String DATA_PRODUCT_NOTDEPLOYED = "5";
	public static final String DATA_PRODUCT_DEPLOYED = "6";
	public static final String DATA_PRODUCT_DELETED = "7";
	// 是否免费0、否;1、是
	public static final String DATA_PRODUCT_ISFREE = "1";
	public static final String DATA_PRODUCT_NOTFREE = "0";
	/********************** data product end *********************/

	/************************ 计费方式 **********************/
	/** 计费方式:按次 **/
	public static final String CHARGING_TYPE_TIME = "0";
	/** 计费方式:周期 **/
	public static final String CHARGING_TYPE_CYCLE = "1";
	/** 计费方式:无限制 **/
	public static final String CHARGING_TYPE_UNLIMITED = "2";
	/**
	 * 变量
	 */
	/** 是否通过4a认证 **/
	public static boolean IS_LOGIN_4A = false;

	/** 数据同步开关 默认为false **/
	public static boolean DATA_SYC_FLAG = true;

	/** 登出URL**(如果是单点登录，会由单点登录初始化该参数) **/
	public static String LOGOUT_URL = "";

	/** ETL系统地址 **/
	public static String ETL_NET = "";

	/** XBUILDER系统地址 **/
	public static String XBUILDER_NET = "";

	/** BCM系统地址 **/
	public static String BCM_NET = "";
	/** 外部系统地址 **/
	public static String EXTPORTAL_NET = "";
	/** 深度云地址 **/
	public static String SANDBOX_NET = "";
	/** 深度云审批详情页 **/
	public static String SANDBOX_DETAIL = "";

	/** 上传图片目录 **/
	public static String FILE_IMG_DIR;

	/** 云文件共享 **/
	public static String FILE_CLOUD_DIR = "";

	/** 共享文件标识 **/
	public static String FILE_SHARE_FLAG = "1";

	public static String APP_STORE_FLAG = "com.bonc.common.service.activity.impl.AppStoreServiceImpl";

	public static String APP_STORE_URL = "/pages/jsp/app/appDetail.jsp?flag=1&appId=";

	public static String APP_APPLY_OUT_URL = "/pages/jsp/app/appApplyOutDetail.jsp?flag=1&appId=";

	public static String APP_APPLY_OUT_FLAG = "com.bonc.common.service.activity.impl.AppApplyOutServiceImpl";

	public static String APP_APPLY_FLAG = "com.bonc.common.service.activity.impl.AppApplyServiceImpl";

	public static String APP_APPLY_URL = "/pages/jsp/app/appApplyDetail.jsp?flag=1&appId=";

	/** 应用超市 **/
	// 资源类型：0：数据模型 1：报表应用 2：GIS应用
	public final static String RESOURCE_MARKET_TYPE_DATA = "0";
	public final static String RESOURCE_MARKET_TYPE_REPORT = "1";
	public final static String RESOURCE_MARKET_TYPE_GIS = "2";

	public static final String FLOW_CHARGING_INVOKE = "FLOWCHARGINGINVOKE";

	public static final String FLOW_CHARGING_CLASSPATH = "com.bonc.common.service.activity.impl.ChargingServiceImpl";
	/**
	 * 资源状态3,不可用
	 */
	public static final String RESOURCE_KEY_STATE_DISABLED = "3";
	/**
	 * 0、按次；
	 */
	public final static String RESOURCE_KEY_APPLY_TYPE_TIMES = "0";
	/**
	 * 1、按时间；
	 */
	public final static String RESOURCE_KEY_APPLY_TYPE_MONTH = "1";
	/**
	 * 2、无限制
	 */
	public final static String RESOURCE_KEY_APPLY_TYPE_FREE = "2";

	/** 截图所需的Jar包地址 **/
	public static Object SNAPSHOT_JAR = "";

	public static String NEW_SANDBOX = "";

	/** 数据源类型(mysql) **/
	public static final String DATABASE_TYPE_MYSQL = "2";

	/** 数据源类型(hive) **/
	public static final String DATABASE_TYPE_HIVE = "6";

	/** 数据源类型(hive2) **/
	public static final String DATABASE_TYPE_HIVE2 = "7";

	/** 工单默认名字 **/
	public static final String WORKORDER_DEFAULT_NAME = "系统工单";

	/** 工单办理人整改 **/
	public static final String WORKORDER_ASSIGNEE_COMPLETE = "1";

	/** 工单办理人退回 **/
	public static final String WORKORDER_ASSIGNEE_ROLLBACK = "2";

	/** 工单审核人归档 **/
	public static final String WORKORDER_AUDIT_COMPLETE = "3";

	/** 工单审核人退回 **/
	public static final String WORKORDER_AUDIT_ROLLBACK = "0";

	/** 我的工单页面 **/
	public static final String WORKORDER_SEND_PAGE = "send";

	/** 待办工单页面 **/
	public static final String WORKORDER_HANDLE_PAGE = "handle";

	/** 参与工单页面 **/
	public static final String WORKORDER_PARTICIPATE_PAGE = "participate";

	/** 历史工单页面 **/
	public static final String WORKORDER_HISTORY_PAGE = "history";

	/** 全部工单页面 **/
	public static final String WORKORDER_TOTAL_PAGE = "total";

	/** 工单表名 **/
	public static final String WORKORDER_TABLE_NAME = "WF_WORKORDER";

	/** WorkOrderImpl路径 **/
	public static final String WORKORDER_IMPL_PATH = "com.bonc.workbench.service.impl.WorkOrderImpl";

	public static final String TOO_MANY_DATAS_EXCEPTION = "1";

	public static final int CELL_MAX_LENGTH = 6144;

	public static final String AUDIT_PERIOD_FORMAT = "yyyyMM";

	public static final String DEFAULT_FEE_FORMAT = "#,##0.00";

	public static final String DEFAULT_DATE_FORMAT = "yyyy-MM";

	public static final String DEFAULT_BEAN_PACKAGE = "com.bonc.system.bean";

	public static final String SHEET_PROTECT_PASSWORD = "1qaz@WSX";
}
