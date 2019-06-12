package com.bonc.common.service.datasyc;

/**
 * 
 * @ClassName: IUserSycService
 * @Description: 用户数据同步接口
 * @author 李博强 liboqiang@bonc.com.cn
 * @date 2016年4月30日 下午1:06:04
 *
 */
public interface IUserSycService {

	/**
	 * 
	 * @Title: addUser
	 * @Description: 新增用户
	 * @param prm:参数
	 * @param id：返回值
	 * @throws Exception
	 */
	public void addUser(Object prm, String id) throws RuntimeException;

	/**
	 * 
	 * @Title: modifyUserStatus
	 * @Description: 更改用户状态
	 * @param prm:参数
	 * @param id：返回值
	 * @throws Exception
	 */
	public void modifyUserStatus(Object prm, String id) throws RuntimeException;

	/**
	 * 
	 * @Title: modifyUser
	 * @Description: 修改用户
	 * @param prm
	 * @param id
	 * @throws Exception
	 */
	public void modifyUser(Object prm, String id) throws RuntimeException;

	/**
	 * 
	 * @Title: modifyPassword
	 * @Description:修改用户密码
	 * @param prm:参数
	 * @param id：返回值
	 */

	public void modifyPassword(Object prm, String id) throws RuntimeException;

	/**
	 * 修改当前用户的基本信息
	 * 
	 * @param prm
	 * @param id
	 * @throws RuntimeException
	 */
	public void editCurrentUser(Object prm, String id) throws RuntimeException;

}
