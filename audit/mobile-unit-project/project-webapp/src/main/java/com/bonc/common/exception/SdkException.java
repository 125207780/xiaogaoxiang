package com.bonc.common.exception;

/**
 * 类名: SdkException <br/>
 * 说明: 自定义异常，负责处理sdk中的逻辑异常，如返回值不存在等信息. <br/>
 * 
 * @author sunce@bonc.com.cn
 * @version 1.0
 * @since JDK 1.6
 */
public class SdkException extends Exception {

	/**
	 * 序列号
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 构造函数：SdkInvokeException.
	 */
	public SdkException() {
		super();
	}

	/**
	 * 
	 * 构造函数：SdkInvokeException.
	 * 
	 * @param message
	 *            异常信息
	 * @param cause
	 *            异常对象
	 */
	public SdkException(String message, Throwable cause) {
		super(message, cause);
	}

	/**
	 * 构造函数：SdkInvokeException.
	 * 
	 * @param message
	 *            异常信息
	 */
	public SdkException(String message) {
		super(message);
	}

	/**
	 * 构造函数：SdkInvokeException.
	 * 
	 * @param cause
	 *            异常对象
	 */
	public SdkException(Throwable cause) {
		super(cause);
	}

}
