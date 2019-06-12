package com.bonc.training.dhy;

import java.io.Serializable;

public class Student implements Serializable {

	private static final long serialVersionUID = -1L;

	private String studentId;
	// private String studentNum;
	/*
	 * private String createId; private String loginId; private String password;
	 * private String orgId;
	 */
	private String studentName;
	private String studentSchool;
	private String studentTime;
	// private String treeCode;
	/*
	 * private String userSex; private String userSexName; private String
	 * userMobile; private String userTelephone; private String userMail;
	 * private String pwdState; private String createTime; private String
	 * updateTime; private String userLevel; private String memo; private String
	 * empNo; private String userState; private String orgName;
	 */
	// private List<Student> studentList;
	// private SysRoleUser loginSysRoleUser;

	public String getStudentId() {
		return studentId;
	}

	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getStudentSchool() {
		return studentSchool;
	}

	public void setStudentSchool(String studentSchool) {
		this.studentSchool = studentSchool;
	}

	public String getStudentTime() {
		return studentTime;
	}

	public void setStudentTime(String studentTime) {
		this.studentTime = studentTime;
	}
	/*
	 * public String getStudentNum() { return studentNum; } public void
	 * setStudentNum(String studentNum) { this.studentNum= studentNum; }
	 */

	/*
	 * public String getTreeCode() { return treeCode; } public void
	 * setTreeCode(String treeCode) { this.treeCode = treeCode; }
	 */
	/*
	 * public String getCreateId() { return createId; } public void
	 * setCreateId(String createId) { this.createId = createId; } public String
	 * getLoginId() { return loginId; } public void setLoginId(String loginId) {
	 * this.loginId = loginId; } public String getPassword() { return password;
	 * } public void setPassword(String password) { this.password = password; }
	 * public String getOrgId() { return orgId; } public void setOrgId(String
	 * orgId) { this.orgId = orgId; } public String getUserSex() { return
	 * userSex; } public void setUserSex(String userSex) { this.userSex =
	 * userSex;
	 * this.setUserSexName(SysCodeUtils.getSysCodeValue(SysCodeUtils.SEX,
	 * userSex)); } public String getUserMobile() { return userMobile; } public
	 * void setUserMobile(String userMobile) { this.userMobile = userMobile; }
	 * public String getUserTelephone() { return userTelephone; } public void
	 * setUserTelephone(String userTelephone) { this.userTelephone =
	 * userTelephone; } public String getUserMail() { return userMail; } public
	 * void setUserMail(String userMail) { this.userMail = userMail; } public
	 * String getPwdState() { return pwdState; } public void setPwdState(String
	 * pwdState) { this.pwdState = pwdState; } public String getCreateTime() {
	 * return createTime; } public void setCreateTime(String createTime) {
	 * this.createTime = createTime; } public String getUpdateTime() { return
	 * updateTime; } public void setUpdateTime(String updateTime) {
	 * this.updateTime = updateTime; } public String getUserLevel() { return
	 * userLevel; } public void setUserLevel(String userLevel) { this.userLevel
	 * = userLevel; } public String getMemo() { return memo; } public void
	 * setMemo(String memo) { this.memo = memo; } public String getEmpNo() {
	 * return empNo; } public void setEmpNo(String empNo) { this.empNo = empNo;
	 * } public String getUserState() { return userState; } public void
	 * setUserState(String userState) { this.userState = userState; } public
	 * String getOrgName() { return orgName; } public void setOrgName(String
	 * orgName) { this.orgName = orgName; } public String getUserSexName() {
	 * return userSexName; } public void setUserSexName(String userSexName) {
	 * this.userSexName = userSexName; }
	 */
	/*
	 * public List<Student> getStudentList() { return studentList; } public void
	 * setStudentList(List<Student> studentList) { this.studentList =
	 * studentList; }
	 */
	// public SysRoleUser getLoginSysRoleUser() {
	// return loginSysRoleUser;
	// }
	// public void setLoginSysRoleUser(SysRoleUser loginSysRoleUser) {
	// this.loginSysRoleUser = loginSysRoleUser;
	// }
}
