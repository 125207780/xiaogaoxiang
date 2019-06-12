package com.bonc.training.bailong;

import java.io.Serializable;
import java.util.List;

import com.bonc.system.service.SysCodeUtils;

public class Worker implements Serializable {

	private static final long serialVersionUID = -1L;

	private String workerId;
	private String workerNum;
	private String workerName;
	private String workerSex;
	private String workerSexName;
	private String treeCode;
	private String workerPosition;
	private String workerLeader;
	private String workerNativePlace;
	private String workerHomeplace;
	private String workerTel;
	private String workerSelfEvaluation;
	private List<Worker> workerList;

	public String getWorkerId() {
		return workerId;
	}

	public void setWorkerId(String workerId) {
		this.workerId = workerId;
	}

	public String getWorkerNum() {
		return workerNum;
	}

	public void setWorkerNum(String workerNum) {
		this.workerNum = workerNum;
	}

	public String getWorkerSex() {
		return workerSex;
	}

	public void setWorkerSex(String workerSex) {
		this.workerSex = workerSex;
		this.setWorkerSexName(SysCodeUtils.getSysCodeValue(SysCodeUtils.SEX, workerSex));
	}

	public String getTreeCode() {
		return treeCode;
	}

	public void setTreeCode(String treeCode) {
		this.treeCode = treeCode;
	}

	public String getWorkerName() {
		return workerName;
	}

	public void setWorkerName(String workerName) {
		this.workerName = workerName;
	}

	public String getWorkerPosition() {
		return workerPosition;
	}

	public void setWorkerPosition(String workerPosition) {
		this.workerPosition = workerPosition;
	}

	public String getworkerLeader() {
		return workerLeader;
	}

	public void setworkerLeader(String workerLeader) {
		this.workerLeader = workerLeader;
		// this.setUserSexName(SysCodeUtils.getSysCodeValue(SysCodeUtils.SEX,
		// userSex));
	}

	public String getWorkerNativePlace() {
		return workerNativePlace;
	}

	public void setWorkerNativePlace(String workerNativePlace) {
		this.workerNativePlace = workerNativePlace;
	}

	public String getWorkerHomeplace() {
		return workerHomeplace;
	}

	public void setWorkerHomeplace(String workerHomeplace) {
		this.workerHomeplace = workerHomeplace;
	}

	public String getWorkerTel() {
		return workerTel;
	}

	public void setWorkerTel(String workerTel) {
		this.workerTel = workerTel;
	}

	public String getWorkerSelfEvaluation() {
		return workerSelfEvaluation;
	}

	public void setWorkerSelfEvaluation(String workerSelfEvaluation) {
		this.workerSelfEvaluation = workerSelfEvaluation;
	}

	public List<Worker> getWorkerList() {
		return workerList;
	}

	public void setWorkerList(List<Worker> workerList) {
		this.workerList = workerList;
	}

	public String getWorkerSexName() {
		return workerSexName;
	}

	public void setWorkerSexName(String workerSexName) {
		this.workerSexName = workerSexName;
	}

}
