package com.bonc.training.dhy;

import java.security.NoSuchAlgorithmException;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.utils.UUIDUtil;
import com.bonc.system.service.i.SysUserServiceI;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class StudentService implements SysUserServiceI {

	@Resource
	private StudentMapper studentMapper;

	/*
	 * public DhyEduUser selectListByLogin(String loginId) { DhyEduUser po = new
	 * DhyEduUser(); //po.setLoginId(loginId); List<DhyEduUser> list =
	 * this.dhyEduMapper.selectList(po); if(list.size() == 1) { return
	 * list.get(0); } return null; }
	 */
	public Page<Student> selectStudentPageList(Student student, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<Student> pageList = (Page<Student>) this.studentMapper.selectStudentPageList(student);
		return pageList;
	}

	public Student selectStudentById(String id) {
		Student student = this.studentMapper.selectStudentById(id);
		return student;
	}

	public Student insertStudent(Student student) throws NoSuchAlgorithmException {
		student.setStudentId(UUIDUtil.createUUID());
		/*
		 * eduer.setCreateTime(DateUtil.formatDate(new Date().getTime()));
		 * eduer.setPassword(MD5Util.getHash(eduer.getPassword()).toLowerCase())
		 * ;
		 */
		this.studentMapper.insertStudent(student);
		return student;
	}

	public Student updateStudent(Student student) {
		this.studentMapper.updateStudent(student);
		return student;
	}

	public Boolean deleteStudentById(String id) {
		Boolean bl = this.studentMapper.deleteStudentById(id);
		return bl;
	}

	public Boolean selectCheck(Student student) {
		Integer i = this.studentMapper.selectCheck(student);
		if (i > 0) {
			return false;
		}
		return true;
	}
}