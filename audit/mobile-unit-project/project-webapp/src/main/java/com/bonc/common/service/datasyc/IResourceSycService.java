package com.bonc.common.service.datasyc;

/**
 * 
 * @ClassName: UserSycService
 * @Description: 数据同步（资源）
 * @author 李博强 liboqiang@bonc.com.cn
 * @date 2016年4月12日 上午10:03:37
 *
 */
public interface IResourceSycService {

	/**
	 * 添加系统
	 * 
	 * @param prmMap
	 * @param string
	 * @param userId
	 */
	public void addApp(Object prm, String rtn) throws RuntimeException;

	/**
	 * 修改系统
	 * 
	 * @param prmMap
	 * @param userId
	 */
	public void updateApp(Object prm, String rtn) throws RuntimeException;

	/**
	 * 删除系统
	 * 
	 * @param prmMap
	 * @param userId
	 */
	public void delApp(Object prm, String rtn) throws RuntimeException;

	/**
	 * 添加模块
	 * 
	 * @param prmMap
	 * @param userId
	 */
	public void addModule(Object prm, String rtn) throws RuntimeException;

	/**
	 * 修改模块
	 * 
	 * @param prmMap
	 * @param userId
	 */
	public void updateModule(Object prm, String rtn) throws RuntimeException;

	/**
	 * 删除模块
	 * 
	 * @param prmMap
	 * @param userId
	 */
	public void delModule(Object prm, String rtn) throws RuntimeException;

	/**
	 * 添加菜单
	 * 
	 * @param prmMap
	 * @param userId
	 */
	public void addMenu(Object prm, String rtn) throws RuntimeException;

	/**
	 * 修改菜单
	 * 
	 * @param prmMap
	 * @param userId
	 */
	public void updateMenu(Object prm, String rtn) throws RuntimeException;

	/**
	 * 删除菜单
	 * 
	 * @param prmMap
	 * @param userId
	 */
	public void delMenu(Object prm, String rtn) throws RuntimeException;
}
