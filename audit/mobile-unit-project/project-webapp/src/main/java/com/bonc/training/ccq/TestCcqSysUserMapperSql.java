package com.bonc.training.ccq;

import org.apache.commons.lang3.StringUtils;

import com.bonc.system.dao.entity.SysUser;

/**
 * 用于返回数据库语句
 * 
 * @author ccq
 *
 */
public class TestCcqSysUserMapperSql {

	// 根据用户名进行模糊查询，可添加其他条件进行sql拼接
	public String selectList(SysUser sysUser) {
		String sql = this.getSql();
		if (!StringUtils.isBlank(sysUser.getUserName())) {
			// sql += " and t.user_name like '%"+sysUser.getUserName()+"%' ";
			sql += " and t.user_name like concat(concat('%',#{userName}),'%') ";
		}
		return sql;
	}

	// 根据用户id判断用户是否存在
	public String selectSysUserById(String userId) {
		String sql = this.getSql() + " and user_id=#{userId} ";
		return sql;
	}

	// 判断添加的用户名 id 登录id是否已存在
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

	// 通过用户id删除用户信息
	public String deleteSysUserById(String id) {
		String sql = "delete from sys_user where user_id=#{id}";
		return sql;
	}

	// 将数据插入到数据表中
	public String insertSysUser(SysUser sysUser) {
		String sql = "insert into sys_user(user_id,user_name,login_id,user_mobile, org_id, user_sex, password) "
				+ "values(#{userId},#{userName},#{loginId},#{userMobile},#{orgId},#{userSex},#{password})";
		return sql;
	}

	// 更新数据表数据
	public String updateSysUser(SysUser sysUser) {
		String sql = "update sys_user set " + " login_id=#{loginId},user_name=#{userName},user_mobile=#{userMobile},org_id=#{orgId},user_sex=#{userSex} "
				+ " where user_id=#{userId} ";
		return sql;
	}

	// 将常用的查询语句封装成一个方法避免重复编写
	private String getSql() {
		String sql = "select " + " t.user_id userId," + " t.create_id createId," + " t.login_id loginId," + " t.password," + " t.org_id orgId,"
				+ " t.user_name userName," + " t.user_sex userSex," + " t.user_mobile userMobile," + " t.user_telephone userTelephone,"
				+ " t.user_mail userMail," + " t.pwd_state pwdState," + " t.create_time createTime," + " t.update_time updateTime," + " t.user_level userLevel,"
				+ " t.memo," + " t.emp_no empNo," + " t.user_state userState," + " t.incharge_flag inchargeFlag," + " tt.name orgName " + " from "
				+ " SYS_USER t " + " left join sys_org tt on t.org_id=tt.org_id " + " where 1=1 ";
		return sql;
	}
}
