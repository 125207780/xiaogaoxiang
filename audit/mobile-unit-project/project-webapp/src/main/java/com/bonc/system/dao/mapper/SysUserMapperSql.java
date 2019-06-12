package com.bonc.system.dao.mapper;

import org.apache.commons.lang3.StringUtils;

import com.bonc.system.dao.entity.SysUser;

public class SysUserMapperSql {

	public String selectList(SysUser sysUser) {
		String sql = this.getSql();
		if (!StringUtils.isBlank(sysUser.getUserName())) {
			sql += " and t.user_name like concat(concat('%',#{userName}),'%') ";
		}
		if (!StringUtils.isBlank(sysUser.getUserMobile())) {
			sql += " and t.user_mobile like concat(concat('%',#{userMobile}),'%') ";
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

	public String selectListByOaId(SysUser sysUser) {
		String sql = this.getSql();
		if (!StringUtils.isBlank(sysUser.getUserName())) {
			sql += " and t.user_name like concat(concat('%',#{userName}),'%') ";
		}
		if (!StringUtils.isBlank(sysUser.getUserMobile())) {
			sql += " and t.user_mobile like concat(concat('%',#{userMobile}),'%') ";
		}
		if (!StringUtils.isBlank(sysUser.getUserId())) {
			sql += " and t.user_id=#{userId} ";
		}
		if (!StringUtils.isBlank(sysUser.getOaId())) {
			sql += " and t.oa_id=#{oaId} ";
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
		String sql = "insert into sys_user(user_id,user_name,login_id,user_mobile, org_id, password ";
		if (null != sysUser.getUserLevel() && !"".equals(sysUser.getUserLevel())) {
			sql += " ,user_level ";
		}
		if (null != sysUser.getUserSex() && !"".equals(sysUser.getUserSex())) {
			sql += " ,sex ";
		}
		sql += ") ";
		sql += " values(#{userId},#{userName},#{loginId},#{userMobile},#{orgId},#{password}";
		if (null != sysUser.getUserLevel() && !"".equals(sysUser.getUserLevel())) {
			sql += " ,#{userLevel} ";
		}
		if (null != sysUser.getUserSex() && !"".equals(sysUser.getUserSex())) {
			sql += " ,#{sex} ";
		}
		sql += ") ";
		return sql;
	}

	public String updateSysUser(SysUser sysUser) {
		String sql = "update sys_user set " + " login_id=#{loginId},user_name=#{userName},user_mobile=#{userMobile},org_id=#{orgId},user_sex=#{userSex} "
				+ " where user_id=#{userId} ";
		return sql;
	}

	public String selectAllSysUser() {
		String sql = this.getSql();
		return sql;
	}

	private String getSql() {
		String sql = "select " + " t.user_id userId," + " t.create_id createId," + " t.login_id loginId," + " t.password," + " t.org_id orgId,"
				+ " t.user_name userName," + " t.user_sex userSex," + " t.user_mobile userMobile," + " t.user_telephone userTelephone,"
				+ " t.user_mail userMail," + " t.pwd_state pwdState," + " t.create_time createTime," + " t.update_time updateTime," + " t.user_level userLevel,"
				+ " t.memo," + " t.emp_no empNo," + " t.user_state userState," + " t.incharge_flag inchargeFlag," + " t.oa_id oaId," + " tt.name orgName, "
				+ "tt.pid, " + " tt.orglevel orgLevel" + " from " + " SYS_USER t " + " left join sys_org tt on t.org_id=tt.org_id " + " where 1=1 ";
		return sql;
	}

	public String selectSysUserByOrgId(String orgId) {
		String sql = "select * from SYS_USER where org_id = '" + orgId + "' and user_level = '4'";
		return sql;
	}

	public String updateSysUserByOrgIdAndUserLevel(SysUser sysUser) {
		String sql = "update sys_user set create_id=#{createId},login_id=#{loginId},password=#{password},user_name=#{userName},user_mobile=#{userMobile},oa_id=#{oaId} ";
		sql += " where org_id = #{orgId} and user_level = '4'";
		return sql;
	}

}
