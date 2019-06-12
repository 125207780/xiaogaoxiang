package com.bonc.system.dao.entity;

import java.io.Serializable;
import java.util.List;

import com.bonc.system.service.SysCodeUtils;

/**
 * 菜单实体类
 * @author 祝正佳
 *
 */
public class SysMenuOperation implements Serializable{
	
	private static final long serialVersionUID = -1L;
	private String id;//主键
	private String menuId;//菜单id
	private String operationCode;//操作编码
	private String operationName;//操作名称
	private Boolean checked;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	public String getOperationCode() {
		return operationCode;
	}
	public void setOperationCode(String operationCode) {
		this.operationCode = operationCode;
	}
	public String getOperationName() {
		return operationName;
	}
	public void setOperationName(String operationName) {
		this.operationName = operationName;
	}
	public Boolean getChecked() {
		return checked;
	}
	public void setChecked(Boolean checked) {
		this.checked = checked;
	}
}
