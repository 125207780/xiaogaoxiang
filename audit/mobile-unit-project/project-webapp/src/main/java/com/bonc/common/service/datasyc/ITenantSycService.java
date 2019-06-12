package com.bonc.common.service.datasyc;

import org.springframework.stereotype.Service;

/**
 * 
 * @ClassName: DataSycService
 * @Description: 租户同步类
 * @author 杜岩 duyan@bonc.com.cn
 * @date 2016年4月21日20:46:57
 *
 */
@Service
public interface ITenantSycService {

	/**
	 * 
	 * @Title: addTenant
	 * @Description: 新建租户
	 * @param prm
	 * @param rtn
	 * @throws RuntimeException
	 */
	public void addTenant(Object prm, String rtn) throws RuntimeException;

	/**
	 * 
	 * @Title: updTenant
	 * @Description: 更新租户
	 * @param prm
	 * @param rtn
	 * @throws RuntimeException
	 */
	public void updTenant(Object prm, String rtn) throws RuntimeException;

	/**
	 * 
	 * @Title: modifyUserOfTenant
	 * @Description: 更改租户下的用户
	 * @param prm
	 * @param rtn
	 * @throws RuntimeException
	 */
	public void modifyUserOfTenant(Object prm, String rtn) throws RuntimeException;

	/**
	 * 
	 * @Title: addTenant
	 * @Description: 新建docker
	 * @param prm
	 * @param rtn
	 * @throws RuntimeException
	 */
	public void createDocker(Object prm, String rtn) throws RuntimeException;

	/**
	 * 
	 * deleteTenant:(删除租户). <br/>
	 * 
	 * @author liboqiang
	 * @param prm
	 * @param rtn
	 * @throws RuntimeException
	 * @since JDK 1.6
	 */
	public void deleteTenant(Object prm, String rtn) throws RuntimeException;

}
