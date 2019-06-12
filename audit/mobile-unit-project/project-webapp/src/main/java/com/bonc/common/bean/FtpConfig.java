package com.bonc.common.bean;

public class FtpConfig {

	private String ftpServerId;
	private String ftpServerPort;
	private String ftpServerUser;
	private String ftpServerPwd;
	private String ftpServerAddress;
	private String templateName;

	public String getFtpServerId() {
		return ftpServerId;
	}

	public void setFtpServerId(String ftpServerId) {
		this.ftpServerId = ftpServerId;
	}

	public String getFtpServerPort() {
		return ftpServerPort;
	}

	public void setFtpServerPort(String ftpServerPort) {
		this.ftpServerPort = ftpServerPort;
	}

	public String getFtpServerUser() {
		return ftpServerUser;
	}

	public void setFtpServerUser(String ftpServerUser) {
		this.ftpServerUser = ftpServerUser;
	}

	public String getFtpServerPwd() {
		return ftpServerPwd;
	}

	public void setFtpServerPwd(String ftpServerPwd) {
		this.ftpServerPwd = ftpServerPwd;
	}

	public String getFtpServerAddress() {
		return ftpServerAddress;
	}

	public void setFtpServerAddress(String ftpServerAddress) {
		this.ftpServerAddress = ftpServerAddress;
	}

	public String getTemplateName() {
		return templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}

}
