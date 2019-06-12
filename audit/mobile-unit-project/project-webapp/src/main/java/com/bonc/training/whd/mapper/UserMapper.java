package com.bonc.training.whd.mapper;

import java.util.List;

import com.bonc.training.whd.bean.User;

public interface UserMapper {

	public void insert(User user);

	public void delete(int userid);

	public void update(User user);

	public List<User> getById(User user);

	public List<User> queryAll(User user);

}
