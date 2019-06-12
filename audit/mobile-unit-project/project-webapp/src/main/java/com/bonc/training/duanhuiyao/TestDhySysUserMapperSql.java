package com.bonc.training.duanhuiyao;

import org.apache.commons.lang3.StringUtils;

import com.bonc.system.dao.entity.SysUser;

/**
 * 用于返回数据库语句
 * 
 * @author dragon
 *
 */
public class TestDhySysUserMapperSql {

	public String selectList(SysUser sysUser) {
		String sql = this.getSql();
		if (!StringUtils.isBlank(sysUser.getUserName())) {
			sql += " and t.user_name like '%'||#{userName}||'%' ";
		}
		if (!StringUtils.isBlank(sysUser.getUserMobile())) {
			sql += " and t.user_mobile like '%'||#{userMobile}||'%' ";
		}
		if (!StringUtils.isBlank(sysUser.getUserId())) {
			sql += " and t.user_id=#{userId} ";
		}
		if (!StringUtils.isBlank(sysUser.getLoginId())) {
			sql += " and t.login_id=#{loginId} ";
		}
		if (!StringUtils.isBlank(sysUser.getPassword())) {
			sql += " and t.password=#{password} ";
		}
		return sql;
	}

	public String selectSysUserById(String userId) {
		String sql = this.getSql() + " and user_id=#{userId} ";
		return sql;
	}

	public String selectSysUserByIds(String assigneeIds) {
		String[] assigneeIdsArr = assigneeIds.split(",");
		String userIdsCollect = "(";
		for (String assigneeId : assigneeIdsArr) {
			userIdsCollect += "'" + assigneeId + "',";
		}
		userIdsCollect = userIdsCollect.substring(0, userIdsCollect.length() - 1);
		userIdsCollect += ")";
		String sql = this.getSql() + " and user_id in " + userIdsCollect;
		return sql;
	}

	public String selectSysUserByLoginId(String loginId) {
		String sql = this.getSql() + " and t.login_id=#{loginId} ";
		return sql;
	}

	public String selectCheck(SysUser sysUser) {
		String sql = " select count(*) from sys_user t where 1=1 ";
		if (!StringUtils.isBlank(sysUser.getUserId())) {
			sql += " and t.user_id != #{userId} ";
		}
		if (!StringUtils.isBlank(sysUser.getLoginId())) {
			sql += " and t.login_id = #{loginId} ";
		}
		if (!StringUtils.isBlank(sysUser.getUserName())) {
			sql += " and t.user_name = #{userName} ";
		}
		return sql;
	}

	public String deleteSysUserById(String id) {
		String sql = "delete from sys_user where user_id=#{id}";
		return sql;
	}

	public String insertSysUser(SysUser sysUser) {
		String sql = "insert into sys_user(user_id,user_name,login_id,user_mobile, org_id, user_sex, password) "
				+ "values(#{userId},#{userName},#{loginId},#{userMobile},#{orgId},#{userSex},#{password})";
		return sql;
	}

	public String updateSysUser(SysUser sysUser) {
		String sql = "update sys_user set " + " login_id=#{loginId},user_name=#{userName},user_mobile=#{userMobile},org_id=#{orgId},user_sex=#{userSex} "
				+ " where user_id=#{userId} ";
		return sql;
	}

	private String getSql() {
		String sql = "select " + " t.user_id userId," + " t.create_id createId," + " t.login_id loginId," + " t.password," + " t.org_id orgId,"
				+ " t.user_name userName," + " t.user_sex userSex," + " t.user_mobile userMobile," + " t.user_telephone userTelephone,"
				+ " t.user_mail userMail," + " t.pwd_state pwdState," + " t.create_time createTime," + " t.update_time updateTime," + " t.user_level userLevel,"
				+ " t.memo," + " t.emp_no empNo," + " t.user_state userState," + " t.incharge_flag inchargeFlag," + " tt.name orgName " + " from "
				+ " SYS_USER t " + " left join sys_org tt on t.org_id=tt.org_id " + " where 1=1 ";
		return sql;
	}
}
