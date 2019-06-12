package com.bonc.system.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import com.bonc.system.dao.entity.SysUser;

public interface SysUserMapper {

	@SelectProvider(type = SysUserMapperSql.class, method = "selectList")
	List<SysUser> selectList(SysUser sysUser);

	@SelectProvider(type = SysUserMapperSql.class, method = "selectListByOaId")
	List<SysUser> selectListByOaId(SysUser po);

	@SelectProvider(type = SysUserMapperSql.class, method = "selectSysUserById")
	SysUser selectSysUserById(String userId);

	@SelectProvider(type = SysUserMapperSql.class, method = "selectSysUserByLoginId")
	SysUser selectSysUserByLoginId(String loginId);

	@InsertProvider(type = SysUserMapperSql.class, method = "insertSysUser")
	Boolean insertSysUser(SysUser sysUser);

	@UpdateProvider(type = SysUserMapperSql.class, method = "updateSysUser")
	Boolean updateSysUser(SysUser sysUser);

	@DeleteProvider(type = SysUserMapperSql.class, method = "deleteSysUserById")
	Boolean deleteSysUserById(String id);

	@SelectProvider(type = SysUserMapperSql.class, method = "selectCheck")
	Integer selectCheck(SysUser sysUser);

	@SelectProvider(type = SysUserMapperSql.class, method = "selectSysUserByIds")
	List<SysUser> selectSysUserByIds(String assigneeIds);

	/**
	 * 查询所有用户信息
	 * 
	 * @Title selectAllSysUser
	 * @Author xiaogaoxiang
	 * @return List<SysUser>
	 */
	@SelectProvider(type = SysUserMapperSql.class, method = "selectAllSysUser")
	List<SysUser> selectAllSysUser();

	/**
	 * 根据网格编码，查询系统用户信息
	 * 
	 * @Title selectSysUserByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return SysUser
	 */
	@SelectProvider(type = SysUserMapperSql.class, method = "selectSysUserByOrgId")
	SysUser selectSysUserByOrgId(String orgId);

	/**
	 * 更新SysUser信息，条件用orgId和userLevel=4
	 * 
	 * @Title updateSysUserByOrgIdAndUserLevel
	 * @Author xiaogaoxiang
	 * @param sysUser
	 *            void
	 */
	@SelectProvider(type = SysUserMapperSql.class, method = "updateSysUserByOrgIdAndUserLevel")
	void updateSysUserByOrgIdAndUserLevel(SysUser sysUser);

}
