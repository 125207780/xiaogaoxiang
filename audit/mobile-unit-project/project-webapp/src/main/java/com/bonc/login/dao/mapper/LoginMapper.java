package com.bonc.login.dao.mapper;

import org.apache.ibatis.annotations.Param;

import com.bonc.system.dao.entity.SysUser;

public interface LoginMapper {
	SysUser selectUserByLoginId(@Param("loginId") String loginId);
}
