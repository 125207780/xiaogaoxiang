package com.bonc.training.dhy;

import org.apache.commons.lang3.StringUtils;

/*
 * 用于返回数据库语句
 * @author dragon
 */
public class StudentMapperSql {
	public String selectStudentPageList(Student student) {
		String sql = this.getSql();
		/*
		 * if(!StringUtils.isBlank(student.getStudentNum())) { sql +=
		 * " and t.student_num like concat('%',#{studentNum},'%') "; }
		 */

		if (!StringUtils.isBlank(student.getStudentName())) {
			sql += " and t.student_name like concat(concat('%',#{studentName}),'%') ";
		}

		return sql;
	}

	public String selectStudentById(String studentId) {
		String sql = this.getSql(); // + " and student_id=#{studentId} ";
		return sql;
	}

	public String selectStudentByIds(String assigneeIds) {
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

	/*
	 * public String selectEduerByLoginId(String loginId) { String sql =
	 * this.getSql() + " and t.login_id=#{loginId} "; return sql; }
	 */

	public String selectCheck(Student student) {
		String sql = " select count(*) from DHY_TEST t where 1=1 ";
		if (!StringUtils.isBlank(student.getStudentId())) {
			sql += " and t.student_id != #{studentId} ";
		}
		/*
		 * if(!StringUtils.isBlank(eduer.getLoginId())) { sql +=
		 * " and t.login_id = #{loginId} "; }
		 */
		if (!StringUtils.isBlank(student.getStudentName())) {
			sql += " and t.student_name = #{studentName} ";
		}
		return sql;
	}

	public String deleteStudentById(String id) {
		String sql = "delete from dhy_test where student_id=#{id}";
		return sql;
	}

	public String insertStudent(Student student) {
		String sql = "insert into dhy_test(student_id,student_name,student_school,student_time) "
				+ "values(#{studentId},#{studentName},#{studentSchool},#{studentTime})";
		return sql;
	}

	public String updateStudent(Student student) {
		String sql = "update dhy_test set " + "STUDENT_NAME=#{studentName},STUDENT_SCHOOL=#{studentSchool},STUDENT_TIME=#{studentTime} "
				+ " where STUDENT_ID=#{studentId} ";
		return sql;
	}

	private String getSql() {
		String sql = "select " + " t.student_id studentId,"
		// + " t.student_num studentNum,"
		// + " t.login_id loginId,"
				+ " t.student_name studentName" + " t.student_school studentSchool" + " t.student_time studentTime"
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
