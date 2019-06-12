package com.bonc.gridinfo.dao.entity;

/**
 * 信息类
 * 
 * @author liulin@bonc.com.cn
 *
 */
public class GridReadInfo {

	private String userId;
	private String userName;
	private String contentCode;// 阅读编号
	private String contentName;// 阅读名
	private String readStatus;// 1:待阅;2:已阅
	private String contentDesc;// 阅读内容说明
	private String readContent;// 阅读内容
	private String reader;// 阅读人
	private String sender;// 发布人
	private String senderDate;// 发布时间
	private String readDate;// 阅读时间
	private String url;// 阅读链接
	private int rowNum;

	public GridReadInfo() {

	}

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

	public String getContentCode() {
		return contentCode;
	}

	public void setContentCode(String contentCode) {
		this.contentCode = contentCode;
	}

	public String getContentName() {
		return contentName;
	}

	public void setContentName(String contentName) {
		this.contentName = contentName;
	}

	public String getReadStatus() {
		return readStatus;
	}

	public void setReadStatus(String readStatus) {
		this.readStatus = readStatus;
	}

	public String getContentDesc() {
		return contentDesc;
	}

	public void setContentDesc(String contentDesc) {
		this.contentDesc = contentDesc;
	}

	public String getReaderContent() {
		return readContent;
	}

	public void setReaderContent(String readerContent) {
		this.readContent = readerContent;
	}

	public String getReader() {
		return reader;
	}

	public void setReader(String reader) {
		this.reader = reader;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getSenderDate() {
		return senderDate;
	}

	public void setSenderDate(String senderDate) {
		this.senderDate = senderDate;
	}

	public String getReadDate() {
		return readDate;
	}

	public void setReadDate(String readDate) {
		this.readDate = readDate;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public int getRowNum() {
		return rowNum;
	}

	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}

}
