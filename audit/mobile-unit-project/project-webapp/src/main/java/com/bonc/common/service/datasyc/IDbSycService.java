package com.bonc.common.service.datasyc;

/**
 * 
 * @ClassName: IDbSycService
 * @Description: DB数据同步接口
 * @author 李博强 liboqiang@bonc.com.cn
 * @date 2016年5月3日 上午9:33:28
 *
 */
public interface IDbSycService {

	public void addDatabase(Object prm, String id) throws RuntimeException;

	/**
	 * 更新数据库信息
	 * 
	 * @param prmMap
	 */
	public void modifyDatabase(Object prm, String id) throws RuntimeException;

	/**
	 * 根据ID删除一个database
	 * 
	 * @param prmMap
	 */
	public void delDatabase(Object prm, String id) throws RuntimeException;

	/**
	 * 编辑数据库下的角色
	 * 
	 * @param prmMap
	 */
	public void modifyRoleOfDatabase(Object prm, String id) throws RuntimeException;

	void batchAuthDb(Object prm, String id) throws RuntimeException;

	public void synchroDatasource(Object prm, String id) throws RuntimeException;

}
