package com.bonc.activiti.service;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import com.bonc.activiti.entity.LocalProcessVariables;

 
public class BaseProcessService implements ProcessInterface, ApplicationContextAware {

	/** SpringMVC上下文 **/
	private ApplicationContext cxt;
	
	@Override
	public void updateProjectPhase(String taskPeriod, LocalProcessVariables localProcessVariables) {
		try {
			
			// 获取类名
			Class<?> clazz = Class.forName(localProcessVariables.getClassPath());
			// 定义访问方法名
			String methodName = taskPeriod;
			Object[] methodPramas = new Object[] {localProcessVariables};
			Class<?>[] parameterTypes = new Class[] {LocalProcessVariables.class };
			Method method = clazz.getMethod(methodName, parameterTypes);
			String beanName = lowerFirstChar(clazz.getSimpleName());
			Object obj = cxt.getBean(beanName);
			method.invoke(obj, methodPramas);
		} catch (Exception e) {
			e.printStackTrace();
			InvocationTargetException targetEx = (InvocationTargetException) e;
			Throwable throwable = targetEx.getTargetException();
			throw new RuntimeException(throwable);
		}

	}
	
	public void updateProjectPhase(String taskPeriod, LocalProcessVariables localProcessVariables, String taskId) {
		localProcessVariables.setTaskId(taskId);
		updateProjectPhase(taskPeriod, localProcessVariables);
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

	@Override
	public void setApplicationContext(ApplicationContext cxt) throws BeansException {
		this.cxt = cxt;
	}

}
