package com.bonc.common.tool.bean;

import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
/**
 * 
 * @author liulin
 *
 */
public class FtpConfig extends GenericObjectPoolConfig {
	
	private String ftpServerId;
	private String ftpServerPort;
	private String ftpServerUser;
	private String ftpServerPwd;
	private String ftpServerAddress;
	private String templateName;
	private String ftpAccessAddress;
	private String ftpNginxAddress;
	private String ftpConnectType;
	private int connectTimeOut;
    private int bufferSize;
    private int fileType;
    private int dataTimeout;
    private boolean useEPSVwithIPv4;
    private boolean passiveMode;
    private String localCharSet;
    private String serverCharSet;
	
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
	public String getFtpAccessAddress() {
		return ftpAccessAddress;
	}
	public void setFtpAccessAddress(String ftpAccessAddress) {
		this.ftpAccessAddress = ftpAccessAddress;
	}
	public String getFtpNginxAddress() {
		return ftpNginxAddress;
	}
	public void setFtpNginxAddress(String ftpNginxAddress) {
		this.ftpNginxAddress = ftpNginxAddress;
	}
	public String getFtpConnectType() {
		return ftpConnectType;
	}
	public void setFtpConnectType(String ftpConnectType) {
		this.ftpConnectType = ftpConnectType;
	}
	public int getConnectTimeOut() {
		return connectTimeOut;
	}
	public void setConnectTimeOut(int connectTimeOut) {
		this.connectTimeOut = connectTimeOut;
	}
	public int getBufferSize() {
		return bufferSize;
	}
	public void setBufferSize(int bufferSize) {
		this.bufferSize = bufferSize;
	}
	public int getFileType() {
		return fileType;
	}
	public void setFileType(int fileType) {
		this.fileType = fileType;
	}
	public int getDataTimeout() {
		return dataTimeout;
	}
	public void setDataTimeout(int dataTimeout) {
		this.dataTimeout = dataTimeout;
	}
	public boolean isUseEPSVwithIPv4() {
		return useEPSVwithIPv4;
	}
	public void setUseEPSVwithIPv4(boolean useEPSVwithIPv4) {
		this.useEPSVwithIPv4 = useEPSVwithIPv4;
	}
	public boolean isPassiveMode() {
		return passiveMode;
	}
	public void setPassiveMode(boolean passiveMode) {
		this.passiveMode = passiveMode;
	}
	public String getLocalCharSet() {
		return localCharSet;
	}
	public void setLocalCharSet(String localCharSet) {
		this.localCharSet = localCharSet;
	}
	public String getServerCharSet() {
		return serverCharSet;
	}
	public void setServerCharSet(String serverCharSet) {
		this.serverCharSet = serverCharSet;
	}
}
