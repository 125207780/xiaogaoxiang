package com.bonc.training.dhy;

import java.security.NoSuchAlgorithmException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.utils.PageJqGrid;
import com.bonc.training.dhy.Student;
import com.bonc.training.dhy.StudentService;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/student")
public class StudentAction {

	@Resource
	private StudentService studentService;

	/**
	 * 分页查询
	 * 
	 * @param sutdent
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "selectstudentpagelist")
	@ResponseBody
	public PageJqGrid<Student> selectStudentPageList(Student student, Integer page, Integer rows) {
		Page<Student> pageList = this.studentService.selectStudentPageList(student, page, rows);
		PageJqGrid<Student> pageJqGrid = new PageJqGrid<Student>(pageList);
		return pageJqGrid;
	}

	/**
	 * 表单弹出
	 * 
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/showstudentform")
	public String showstudentform(HttpServletRequest request, String id) {
		if (!StringUtils.isBlank(id)) {
			Student student = this.studentService.selectStudentById(id);
			request.setAttribute("vo", student);
		}
		return "pages/jsp/training/dhy/dhyStudentForm";
	}

	/**
	 * 新增修改
	 * 
	 * @param student
	 * @return
	 * @throws NoSuchAlgorithmException
	 */
	@RequestMapping(value = "/studentinsertorupdate")
	@ResponseBody
	public Student insertOrUpdateStudent(Student student) throws NoSuchAlgorithmException {
		String studentId = student.getStudentId();
		if (!StringUtils.isBlank(studentId)) {
			student = this.studentService.updateStudent(student);
		} else {
			student = this.studentService.insertStudent(student);
		}
		return student;
	}

	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deletestudentbyid")
	@ResponseBody
	public Boolean deleteStudentById(String id) {
		Boolean bl = this.studentService.deleteStudentById(id);
		return bl;
	}

	/**
	 * 校验重复
	 * 
	 * @param sysUser
	 * @return
	 */
	@RequestMapping(value = "/check")
	@ResponseBody
	public Boolean check(Student student) {
		Boolean bl = this.studentService.selectCheck(student);
		return bl;
	}
}
