package com.bonc.training.dhy;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import com.bonc.training.dhy.Student;
import com.bonc.training.dhy.StudentMapperSql;

public interface StudentMapper {

	@SelectProvider(type = StudentMapperSql.class, method = "selectStudentPageList")
	List<Student> selectStudentPageList(Student student);

	@SelectProvider(type = StudentMapperSql.class, method = "selectStudentById")
	Student selectStudentById(String studentId);

	/*
	 * @SelectProvider(type = StudentMapperSql.class, method =
	 * "selectSysUserByLoginId") SysUser selectSysUserByLoginId(String loginId);
	 */
	@InsertProvider(type = StudentMapperSql.class, method = "insertStudent")
	Boolean insertStudent(Student student);

	@UpdateProvider(type = StudentMapperSql.class, method = "updateStudent")
	Boolean updateStudent(Student student);

	@DeleteProvider(type = StudentMapperSql.class, method = "deleteStudentById")
	Boolean deleteStudentById(String id);

	@SelectProvider(type = StudentMapperSql.class, method = "selectCheck")
	Integer selectCheck(Student student);
	/*
	 * @SelectProvider(type = StudentMapperSql.class, method =
	 * "selectStudentByIds") List<Student> selectStudentByIds(String
	 * assigneeIds);
	 */

}
