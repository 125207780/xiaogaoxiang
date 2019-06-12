package com.bonc.gridinfo.dao.entity;

/**
 * 事项信息类
 * 
 * @author liulin@bonc.com.cn
 *
 */
public class GridItemInfo {

	private String userId;
	private String userName;
	private String itemCode;
	private String itemName;
	private String itemStatus;// 1:待办;2:已办
	private String itemDesc;
	private String itemContent;
	private String itemHandler;
	private String itemIssueder;
	private String issuedDate;
	private String handleDate;
	private String itemUrl;
	private int rowNum;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getItemCode() {
		return itemCode;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemStatus() {
		return itemStatus;
	}

	public void setItemStatus(String itemStatus) {
		this.itemStatus = itemStatus;
	}

	public String getItemDesc() {
		return itemDesc;
	}

	public void setItemDesc(String itemDesc) {
		this.itemDesc = itemDesc;
	}

	public String getItemContent() {
		return itemContent;
	}

	public void setItemContent(String itemContent) {
		this.itemContent = itemContent;
	}

	public String getItemHandler() {
		return itemHandler;
	}

	public void setItemHandler(String itemHandler) {
		this.itemHandler = itemHandler;
	}

	public String getItemIssueder() {
		return itemIssueder;
	}

	public void setItemIssueder(String itemIssueder) {
		this.itemIssueder = itemIssueder;
	}

	public String getIssuedDate() {
		return issuedDate;
	}

	public void setIssuedDate(String issuedDate) {
		this.issuedDate = issuedDate;
	}

	public String getHandleDate() {
		return handleDate;
	}

	public void setHandleDate(String handleDate) {
		this.handleDate = handleDate;
	}

	public String getItemUrl() {
		return itemUrl;
	}

	public void setItemUrl(String itemUrl) {
		this.itemUrl = itemUrl;
	}

	public int getRowNum() {
		return rowNum;
	}

	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}

}
