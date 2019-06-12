package com.bonc.common.service.datasyc;

/**
 * 
 * @ClassName: DataSycService
 * @Description: 数据接口
 * @author 杜岩 duyan@bonc.com.cn
 * @date 2016年4月18日16:17:59
 *
 */
public interface IOrgSycService {


	/**
	 * 
	* @Title: addOrganization
	* @Description: 新增机构
	* @param prm:参数
	* @param id：返回值
	* @throws Exception
	 */
	public void addOrganization(Object prm, String rtn) throws RuntimeException;


	/**
	 * 
	* @Title: updateOrganization
	* @Description: 更新机构
	* @param prm:参数
	* @param id：返回值
	* @throws Exception
	 */
	public void updateOrganization(Object prm, String rtn) throws RuntimeException;


	/**
	 * 
	* @Title: delOrganizationalService
	* @Description: 删除机构
	* @param prm:参数
	* @param id：返回值
	* @throws Exception
	 */
	public void delOrganization(Object prm, String rtn) throws RuntimeException;

}