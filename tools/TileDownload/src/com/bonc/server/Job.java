package com.bonc.server;

import java.util.Date;

public class Job {
  
  private String jobMsg ="";
  private Date sendTime =null ;
  private Client jobClient =null;
  private int state =0 ; //任务状态 0 创建，未发送  ，1 已发送，下载中， 2 下载完成
  private String z = "";
  public Job(String z ,String msg) {
	  this.z =z;
	  this.jobMsg=msg;
  }
  
  public String getJobMsg() {
	  return this.jobMsg;
  }

public Date getSendTime() {
	return sendTime;
}

public void setSendTime(Date sendTime) {
	this.sendTime = sendTime;
}

public Client getJobClient() {
	return jobClient;
}

public void setJobClient(Client jobClient) {
	this.jobClient = jobClient;
}

public int getState() {
	return state;
}

public void setState(int state) {
	this.state = state;
}

public String getZ() {
	return z;
}
  
  
}
