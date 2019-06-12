package com.bonc.system.bean;
/**
 * 类名: SystemException <br/>  
 * 说明: 自定义异常，负责处理sdk中的程序异常，如连接超时等异常. <br/>  
 * 
 * @author sunce@bonc.com.cn
 * @version 1.0
 * @since JDK 1.6
 */
public class SystemException extends Exception{
	
	/*
	 * 序列号
	 */  
	private static final long serialVersionUID = 1L;
	
	/**
	 * 构造函数：SystemException
	 */
	public SystemException() {
		super();
	}

	/**
	 * 构造函数：SystemException.
	 * @param message 异常信息
	 * @param cause 异常对象
	 */
	public SystemException(String message, Throwable cause) {
		super(message, cause);
	}

	/**
	 * 构造函数：SystemException. 
	 * @param message 异常信息
	 */
	public SystemException(String message) {
		super(message);
	}

	/** 
	 * 构造函数：SdkInvokeException.
	 * @param cause 异常对象
	 */
	public SystemException(Throwable cause) {
		super(cause);
	}

}
