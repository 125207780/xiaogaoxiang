package com.bonc.common.service.datasyc;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import com.bonc.common.annotation.DataSync;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.PackageUtils;

/**
 * 
 * @ClassName: DataSycService
 * @Description: 数据同步类
 * @author 李博强 liboqiang@bonc.com.cn
 * @date 2016年4月11日 上午11:29:31
 *
 */
@Component
@Aspect
public class BaseSyncService implements ApplicationContextAware {

	/** SpringMVC上下文 **/
	private ApplicationContext cxt;

	@Pointcut("@annotation(com.bonc.common.annotation.DataSync)")
	public void sync() {
	}

	@AfterReturning(value = "sync()", returning = "rtn")
	public void doAfterPure(JoinPoint joinPoint, Object rtn) throws Exception {
		if (CST.DATA_SYC_FLAG) {
			preSyc(joinPoint, rtn);
		}
	}

	/**
	 * 数据同步预处理
	 * 
	 * @param joinPoint
	 * @param rtn
	 * @throws Exception
	 */
	private void preSyc(JoinPoint joinPoint, Object rtn) throws Exception {
		try {
			// 获得注解
			MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
			Method method = methodSignature.getMethod();
			DataSync anno = method.getAnnotation(DataSync.class);
			if (anno == null) {
				return;
			}
			// 获取目标方法参数
			Object[] obj = joinPoint.getArgs();
			if (obj == null || obj.length > 1) {
				// throw new Exception("数据同步的目标方法参数不能为空且不可以存在多个");
			}
			Object prm = obj[0];

			// 目标方法名
			String methodName = method.getName();
			// 如果目标方法名上面带有@syn同步标识
			if (method.isAnnotationPresent(DataSync.class)) {
				// 目标方法名匹配
				Class<?> targetClass = getTargetClass(methodName);
				// 执行数据同步
				doSyc(targetClass, methodName, prm, rtn);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}

	}

	/**
	 * 
	 * @Title: getTargetClass
	 * @Description: 获取接口类
	 * @param methodName
	 * @return
	 */
	private Class<?> getTargetClass(String methodName) {
		Class<?> iUserClass = machByClass(methodName, IUserSycService.class);
		if (iUserClass != null) {
			return iUserClass;
		}

		Class<?> iRoleClass = machByClass(methodName, IRoleSycService.class);
		if (iRoleClass != null) {
			return iRoleClass;
		}

		Class<?> iOrgClass = machByClass(methodName, IOrgSycService.class);
		if (iOrgClass != null) {
			return iOrgClass;
		}

		Class<?> iResourceClass = machByClass(methodName, IResourceSycService.class);
		if (iResourceClass != null) {
			return iResourceClass;
		}

		Class<?> iTenantClass = machByClass(methodName, ITenantSycService.class);
		if (iTenantClass != null) {
			return iTenantClass;
		}

		Class<?> iDbSycService = machByClass(methodName, IDbSycService.class);
		if (iDbSycService != null) {
			return iDbSycService;
		}

		Class<?> iSshSycService = machByClass(methodName, ISshSycService.class);
		if (iSshSycService != null) {
			return iSshSycService;
		}

		Class<?> iFtpSycService = machByClass(methodName, IFtpSycService.class);
		if (iFtpSycService != null) {
			return iFtpSycService;
		}
		return null;
	}

	/**
	 * 根据方法名匹配接口
	 * 
	 * @Title: getTargetClass
	 * @Description: TODO(这里用一句话描述这个方法的作用)
	 * @param methodName
	 * @return
	 */
	private Class<?> machByClass(String methodName, Class<?> clazz) {
		Method[] methods = clazz.getMethods();
		for (Method method : methods) {
			if (methodName.equals(method.getName())) {
				return clazz;
			}
		}
		return null;
	}

	/**
	 * 执行数据同步
	 * 
	 * @param interFace
	 * @param methodName
	 * @param prm
	 * @param rtn
	 * @throws Exception
	 */
	private void doSyc(Class<?> interFace, String methodName, Object prm, Object rtn) throws Exception {
		try {
			// 获取接口的所有实现类
			if (interFace == null) {
				return;
			}
			List<Class<?>> classList = findAllImpByClassName(interFace);
			if (classList == null || classList.isEmpty()) {
				// throw new
				// Exception("没有找到实现接口：["+interFace+"]的数据同步类，如果不需要数据同步，请将数据同步开关设置为false");
				return;
			}
			for (Class<?> clazz : classList) {
				Object[] methodPramas = new Object[] { prm, rtn == null ? null : rtn.toString() };
				Class<?>[] parameterTypes = new Class[] { Object.class, String.class };
				Method method = clazz.getMethod(methodName, parameterTypes);
				String beanName = lowerFirstChar(clazz.getSimpleName());
				Object obj = cxt.getBean(beanName);
				method.invoke(obj, methodPramas);
			}
		} catch (Exception e) {
			InvocationTargetException targetEx = (InvocationTargetException) e;
			Throwable throwable = targetEx.getTargetException();
			throw new RuntimeException(throwable);
		}
	}

	/**
	 * 
	 * @Title: findAllImpByClassName
	 * @Description: 根据接口获取所有实现类
	 * @param interFace
	 * @return
	 */
	private List<Class<?>> findAllImpByClassName(Class<?> interFace) {
		List<Class<?>> returnClassList = new ArrayList<Class<?>>();
		// 获得当前包名
		String packageName = interFace.getPackage().getName();

		try {
			// 获取包下所有接口
			List<String> classList = PackageUtils.getClassName(packageName);
			// 判断是否是一个接口
			for (String className : classList) {
				Class<?> clazz = Class.forName(className);
				if (interFace.isAssignableFrom(clazz) && !interFace.equals(clazz)) {
					returnClassList.add(clazz);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return returnClassList;
	}

	/**
	 * 首字母小写
	 * 
	 * @param typeClass
	 * @return
	 */
	private String lowerFirstChar(String typeClass) {
		char[] cs = typeClass.toCharArray();
		cs[0] += 32;
		return String.valueOf(cs);
	}

	/**
	 * 获取注解
	 * 
	 * @param cxt
	 * @throws BeansException
	 */
	/*
	 * private static DataSync giveController(JoinPoint joinPoint) throws
	 * Exception { Signature signature = joinPoint.getSignature();
	 * MethodSignature methodSignature = (MethodSignature) signature; Method
	 * method = methodSignature.getMethod();
	 * 
	 * if (method != null) { return method.getAnnotation(DataSync.class); }
	 * return null; }
	 */

	@Override
	public void setApplicationContext(ApplicationContext cxt) throws BeansException {
		this.cxt = cxt;
	}
}
