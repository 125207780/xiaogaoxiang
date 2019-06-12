package com.bonc.common.service.datasyc;

import org.springframework.stereotype.Service;

/**
 * 
 * @ClassName: UserSycService
 * @Description: 数据同步（角色信息）
 * @author 李博强 liboqiang@bonc.com.cn
 * @date 2016年4月12日 上午10:03:37
 *
 */
@Service
public interface IRoleSycService {

	/**
	 * 新增角色
	 * 
	 * @param prm
	 * @throws Exception
	 */
	public void addRole(Object prm, String rtn) throws RuntimeException;

	/**
	 * 删除角色
	 * 
	 * @param roleId
	 * @throws Exception
	 */
	public void delRole(Object prm, String rtn) throws RuntimeException;

	/**
	 * 同步角色的权限信息
	 * 
	 * @param roleId
	 * @throws Exception
	 */
	public void modifyAuthOfRole(Object prm, String rtn) throws RuntimeException;

	/**
	 * 修改角色
	 * 
	 * @param prmMap
	 * @throws RuntimeException
	 */
	public void modifyRole(Object prm, String rtn) throws RuntimeException;

	/**
	 * 
	 * @Title: modifyUserOfRole
	 * @Description: 更改角色下的用户
	 * @param prm
	 * @param rtn
	 * @throws RuntimeException
	 */
	public void modifyUserOfRole(Object prm, String rtn) throws RuntimeException;

	/**
	 * 
	 * @Title: modifyUserOfRole
	 * @Description: 批量处理资源申请
	 * @param prm
	 * @param rtn
	 * @throws RuntimeException
	 */
	public void batchAuthApply(Object prm, String rtn) throws RuntimeException;
}
