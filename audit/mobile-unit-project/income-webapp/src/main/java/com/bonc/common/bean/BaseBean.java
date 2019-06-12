package com.bonc.common.bean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
/**
 * 
 * 类名: BaseBean<E> <br/>  
 * 说明: 所有bean的基类，用于实现一些共有属性. <br/>  
 * 
 * @author sunce@bonc.com.cn
 * @version 1.0
 * @since JDK 1.6
 */
public class BaseBean<E> implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 返回码
	 */
	private String code;
	
	/**
	 * 返回值
	 */
	private String message;
	
	/**
	 * 返回对象
	 */
	private List<E> data = new ArrayList<E>();
	
	/**
	 * 
	 * 实现了获取调用函数的返回码功能 <br/>
	 * @return code 返回码，0为正常，其它均为操作失败或异常。
	 */
	public String getCode() {
		return code;
	}
	
	/**
	 * 
	 * 实现了设置返回码功能<br/>
	 * @param code 返回码，0为正常，其它均为操作失败或异常
	 */
	public void setCode(String code) {
		this.code = code;
	}
	
	/**
	 * 
	 * 实现了获取返回消息的功能<br/>
	 * @return message 返回消息，String对象或null
	 */
	public String getMessage() {
		return message;
	}
	
	/**
	 * 
	 * 实现了设置返回消息的功能<br/>
	 * @return message 返回消息，String对象或null
	 */
	public void setMessage(String message) {
		this.message = message;
	}
	
	/**
	 * 
	 * 实现了获取返回对象列表的功能<br/>
	 * @return data 返回消息，指定对象的List集合。
	 */
	public List<E> getData() {
		return data;
	}
	
	/**
	 * 
	 * 实现了设置返回对象列表的功能<br/>
	 * @return data 返回消息，指定对象的List集合。
	 */
	public void setData(List<E> data) {
		this.data = data;
	}	

}
