package com.bonc.training.dhy;

import org.apache.commons.lang3.StringUtils;

/*
 * 用于返回数据库语句
 * @author dragon
 */
public class DhyEduMapperSql {

	public String selectList(DhyEduUser eduer) {
		String sql = this.getSql();
		/*
		 * if(!StringUtils.isBlank(eduer.getEduerName())) { sql +=
		 * " and t.eduer_name like '%'||#{eduerName}||'%' "; }
		 * if(!StringUtils.isBlank(eduer.getEduerId())) { sql +=
		 * " and t.eduer_id=#{eduer} "; } /*
		 * if(!StringUtils.isBlank(eduer.getLoginId())) { sql +=
		 * " and t.login_id=#{loginId} "; }
		 * if(!StringUtils.isBlank(eduer.getPassword())) { 暂时不知道有没有用 sql +=
		 * " and t.password=#{password} "; }
		 */
		return sql;
	}

	public String selectEduerById(String userId) {
		String sql = this.getSql() + " and eduer_id=#{eduerId} ";
		return sql;
	}

	public String selectEduerByIds(String assigneeIds) {
		String[] assigneeIdsArr = assigneeIds.split(",");
		String eduerIdsCollect = "(";
		for (String assigneeId : assigneeIdsArr) {
			eduerIdsCollect += "'" + assigneeId + "',";
		}
		eduerIdsCollect = eduerIdsCollect.substring(0, eduerIdsCollect.length() - 1);
		eduerIdsCollect += ")";
		String sql = this.getSql() + " and eduer_id in " + eduerIdsCollect;
		return sql;
	}

	public String selectEduerByLoginId(String loginId) {
		String sql = this.getSql() + " and t.login_id=#{loginId} ";
		return sql;
	}

	public String selectCheck(DhyEduUser eduer) {
		String sql = " select count(*) from dhy_test t where 1=1 ";
		if (!StringUtils.isBlank(eduer.getEduerId())) {
			sql += " and t.eduer_id != #{eduerId} ";
		}
		/*
		 * if(!StringUtils.isBlank(eduer.getLoginId())) { sql +=
		 * " and t.login_id = #{loginId} "; }
		 */
		if (!StringUtils.isBlank(eduer.getEduerName())) {
			sql += " and t.eduer_name = #{eduerName} ";
		}
		return sql;
	}

	public String deleteEduerById(String id) {
		String sql = "delete from dhy_test where eduer_id=#{id}";
		return sql;
	}

	public String insertEduer(DhyEduUser eduer) {
		String sql = "insert into dhy_test(eduer_id,eduer_num,eduer_name) " + "values(#{eduerId},#{eduerNum},#{eduerName})";
		return sql;
	}

	public String updateEduer(DhyEduUser eduer) {
		String sql = "update dhy_test set " + "eduer_name=#{eduerName},eduer_num=#{eduerNum} " + " where eduer_id=#{eduerId} ";
		return sql;
	}

	private String getSql() {
		String sql = "select " + " t.eduer_id eduerId," + " t.eduer_num eduerNum,"
		// + " t.login_id loginId,"
				+ " t.eduer_name eduerName"
				// + " t.user_sex userSex,"
				// + " t.user_mobile userMobile,"
				// + " t.user_telephone userTelephone,"
				// + " t.user_mail userMail,"
				// + " t.pwd_state pwdState,"
				// + " t.create_time createTime,"
				// + " t.update_time updateTime,"
				// + " t.user_level userLevel,"
				// + " t.memo,"
				// + " t.emp_no empNo,"
				// + " t.user_state userState,"
				// + " t.incharge_flag inchargeFlag,"
				// + " tt.name orgName "
				+ " from " + " DHY_TEST  t "
				// + " left join sys_org tt on t.org_id=tt.org_id "
				+ " where 1=1 ";
		return sql;
	}
}
