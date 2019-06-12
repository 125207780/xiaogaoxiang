/**
 * 
 */
package com.bonc.common.log;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.bonc.common.annotation.ArchivesLog;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.UUIDUtil;
import com.bonc.system.bean.Logger;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.dao.mapper.LogManageMapper;

/**
 * @author songhao
 *
 */
public class OpLog {

	@Resource
	private LogManageMapper logManageMapper;

	// 操作日志ID
	String id = null;

	/**
	 * 在目标方法前执行 获取目标方法参数并插入操作日志表
	 * 
	 * @param joinpoint
	 * @throws Exception
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
	public void before(JoinPoint joinpoint) throws Exception {
		String userId = null;
		String actionName = null;
		String option = null;
		Logger logger = new Logger();
		String paramStr = "";
		id = UUIDUtil.createUUID();
		// 获取操作时间
		SimpleDateFormat tempDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String opTime = tempDate.format(new java.util.Date());
		try {
			// 获取request对象
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

			// 获取UserId
			HttpSession session = request.getSession();
			SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			if (user != null) {
				userId = user.getUserId();
			}

			// 获取操作用户IP地址
			String userIp = request.getRemoteAddr();
			String methodName = joinpoint.getSignature().getName(); // 获取包含当前方法的对象的名字
			Object[] arguments = joinpoint.getArgs(); // 此方法返回的是一个数组，数组中包括request以及ActionCofig等类对象
			// String actionName =
			// joinpoint.getTarget().getClass().getSimpleName(); // 获取Action名

			// 获取目标方法参数
			String[] parameterNames = ((MethodSignature) joinpoint.getSignature()).getParameterNames();
			if (parameterNames.length > 0) {
				for (int i = 0; i < parameterNames.length; i++) {
					Map<String, String> map = new HashMap<String, String>();
					try {
						if (joinpoint.getArgs()[i] != null) {

							// 判断参数类型，以下几类(如Action中带有地址映射的方法中有其他类型参数,需在下面添加,否则可能会报错)
							// HttpServletRequest,HttpServletResponse,HttpSession,MultipartFile,String,Integer,自定义Java
							// Bean
							if (joinpoint.getArgs()[i].getClass().getName().toLowerCase().indexOf("request") != -1) {
								// HttpServletRequest requestParam =
								// (HttpServletRequest)arguments[i];
								// Map<String, String[]> requestMap =
								// requestParam.getParameterMap();
							} else if (joinpoint.getArgs()[i].getClass().getName().toLowerCase().indexOf("response") != -1) {
								// HttpServletResponse responseParam =
								// (HttpServletResponse)arguments[i];
							} else if (arguments[i].getClass().getName().toLowerCase().indexOf("session") != -1) {
								HttpSession sessionParam = (HttpSession) arguments[i];
								SysUser userParam = (SysUser) sessionParam.getAttribute(CST.SESSION_SYS_USER_INFO);
								map = BeanUtils.describe(userParam);
								String userStr = JSON.toJSONString(userParam);
								paramStr += userStr + "|";
							} else if (arguments[i].getClass().getName().toLowerCase().indexOf("multipartfile") != -1) {
								MultipartFile file = (MultipartFile) arguments[i];
								paramStr += file.getOriginalFilename() + "|";
							} else if (arguments[i].getClass() == String.class) {
								// 登陆时候通过AOP先到这里，不会先到login的登陆类，因此无法获取userId，因此在这里赋值登陆用户的id
								if (i == 2) {
									userId = arguments[i].toString();
								}
								paramStr += arguments[i] + "|";
							} else if (arguments[i].getClass() == Integer.class) {
								paramStr += arguments[i] + "|";
							} else {
								paramStr += JSON.toJSONString(arguments[i]);
							}
						}
					} catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
						e.printStackTrace();
					}
				}
			}

			String targetName = joinpoint.getTarget().getClass().getName();
			Class targetClass = Class.forName(targetName);
			Method[] method = targetClass.getMethods();
			for (Method m : method) {
				if (m.getName().equals(methodName)) {
					Class[] tmpCs = m.getParameterTypes();
					if (tmpCs.length == arguments.length) {
						ArchivesLog methodCache = m.getAnnotation(ArchivesLog.class);
						if (methodCache != null) {
							actionName = methodCache.actionName();
							option = methodCache.option();

							// 封装logger对象
							logger.setId(id);
							logger.setUserId(userId);
							logger.setUserIp(userIp);
							logger.setActionName(actionName);
							logger.setMethodName(option);
							logger.setOpTime(opTime);
							logger.setParam(paramStr);

							// 向表中插入操作记录
//							logManageMapper.opInsert(logger);
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 在目标方法执行成功之后执行 更新操作日志表
	 * 
	 * @param joinpoint
	 * @throws Exception
	 */
	public void afterReturning(JoinPoint joinpoint) throws Exception {
		try {
			Logger logger = new Logger();
			logger.setSuccess(1);
			logger.setId(id);
//			logManageMapper.opSuccess(logger);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
