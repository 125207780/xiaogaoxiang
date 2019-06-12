package com.bonc.system.dao.entity;

import java.io.Serializable;
import java.util.List;

import com.bonc.system.service.SysCodeUtils;

/**
 * 菜单实体类
 * @author 祝正佳
 *
 */
public class SysMenu implements Serializable{
	
	private static final long serialVersionUID = -1L;
	private String menuId;//菜单ID
	private String menuName;//菜单名称
	private String menuUrl;//菜单URL
	private String memo;//备注
	private String iconPath;//图标地址
	private String displayOrder;//显示顺序
	private String parentId;//父ID
	private String state;//状态
	private String stateName;//对应字典的value
	private String menuLevel;//菜单等级
	private String treeCode;//树编码
	private String menuAttr;//是否弹出
	private String iconUrl;//图标url
	private List<SysMenu> children;//子节点
	private SysMenu parent;//父节点
	private List<SysMenuOperation> sysMenuOperationList;
	private Boolean checked; 
	private String operations;
	private String roleId;
	
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public String getMenuUrl() {
		return menuUrl;
	}
	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getIconPath() {
		return iconPath;
	}
	public void setIconPath(String iconPath) {
		this.iconPath = iconPath;
	}
	public String getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(String displayOrder) {
		this.displayOrder = displayOrder;
	}
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
		this.setStateName(SysCodeUtils.getSysCodeValue(SysCodeUtils.QI_JIN, state));
	}
	public String getMenuLevel() {
		return menuLevel;
	}
	public void setMenuLevel(String menuLevel) {
		this.menuLevel = menuLevel;
	}
	public String getTreeCode() {
		return treeCode;
	}
	public void setTreeCode(String treeCode) {
		this.treeCode = treeCode;
	}
	public String getMenuAttr() {
		return menuAttr;
	}
	public void setMenuAttr(String menuAttr) {
		this.menuAttr = menuAttr;
	}
	public List<SysMenu> getChildren() {
		return children;
	}
	public void setChildren(List<SysMenu> children) {
		this.children = children;
	}
	public SysMenu getParent() {
		return parent;
	}
	public void setParent(SysMenu parent) {
		this.parent = parent;
	}
	public String getIconUrl() {
		return iconUrl;
	}
	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}
	public String getStateName() {
		return stateName;
	}
	public void setStateName(String stateName) {
		this.stateName = stateName;
	}
	public List<SysMenuOperation> getSysMenuOperationList() {
		return sysMenuOperationList;
	}
	public void setSysMenuOperationList(List<SysMenuOperation> sysMenuOperationList) {
		this.sysMenuOperationList = sysMenuOperationList;
	}
	public Boolean getChecked() {
		return checked;
	}
	public void setChecked(Boolean checked) {
		this.checked = checked;
	}
	public String getOperations() {
		return operations;
	}
	public void setOperations(String operations) {
		this.operations = operations;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
}
