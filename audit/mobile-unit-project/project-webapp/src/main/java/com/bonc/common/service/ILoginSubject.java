package com.bonc.common.service;

import com.bonc.common.enums.LoginResult;

/**
 * @author yantao E-mail:kengsinia@126.com
 * @version
 * @create time : 2016-1-19 下午2:54:52
 * 
 */

public interface ILoginSubject {

	/**
	 * 判断用户名称密码 需要定义常量
	 */
	LoginResult checkUserPassword(String userId, String password, String verificationCode);

}
