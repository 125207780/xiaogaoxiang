package com.bonc.training.whd.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.utils.PageJqGrid;
import com.bonc.training.whd.bean.User;
import com.bonc.training.whd.service.UserService;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/Whd_User")
public class UserAction {

	@Resource
	private UserService service;

	@RequestMapping(value = "/delete")
	@ResponseBody
	public boolean delete(int id) {
		service.delete(id);
		return true;
	}

	@RequestMapping(value = "/get")
	public String search(int id, HttpServletRequest request) {
		User user = service.select(id);
		request.setAttribute("user", user);
		return "/pages/jsp/training/whd/personMessage";
	}

	@RequestMapping(value = "/update")
	@ResponseBody
	public User update(User user) {
		service.update(user);
		return user;
	}

	@RequestMapping(value = "/insert")
	@ResponseBody
	public User insert(User user) {
		service.insert(user);
		return user;
	}

	@RequestMapping(value = "/toInsert")
	public String toInsert() {
		return "/pages/jsp/training/whd/insertUserMessage";
	}

	@RequestMapping(value = "/queryAll", method = RequestMethod.POST)
	@ResponseBody
	public PageJqGrid<User> queryAll(User user, int page, int rows) {
		Page<User> pageList = service.queryAll(user, page, rows);
		PageJqGrid<User> pageJqGrid = new PageJqGrid<>(pageList);
		return pageJqGrid;
	}
}
