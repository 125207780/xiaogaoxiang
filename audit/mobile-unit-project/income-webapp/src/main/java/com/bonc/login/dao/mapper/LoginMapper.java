package com.bonc.login.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.bonc.system.dao.entity.SysUser;

public interface LoginMapper {
	SysUser selectUserByLoginId(@Param("loginId")String loginId);
}
