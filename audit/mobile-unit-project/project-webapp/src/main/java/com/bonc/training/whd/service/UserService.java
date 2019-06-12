package com.bonc.training.whd.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.training.whd.bean.User;
import com.bonc.training.whd.mapper.UserMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
public class UserService {

	@Resource
	private UserMapper mapper;

	public void insert(User user) {
		mapper.insert(user);
	}

	public void delete(int userid) {
		mapper.delete(userid);
	}

	public void update(User user) {
		mapper.update(user);
	}

	public User select(int userid) {
		User user = new User();
		user.setUserId(userid);
		return mapper.getById(user).get(0);
	}

	public Page<User> queryAll(User user, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<User> list = (Page<User>) mapper.queryAll(user);
		return list;
	}

}
