package com.bonc.common.enums;

/**
 * @author yantao E-mail:kengsinia@126.com
 * @version
 * @create time : 2016-1-19 下午4:55:27
 */
public enum ApplicationServer {
	/**
	 * OK
	 */
	APP(0),
	/**
	 * invalid input
	 */
	INVALID_INPUT(1),
	/**
	 * invalid verification code
	 */
	INVALID_VERIFICATION_CODE(2),
	/**
	 * user not found
	 */
	USER_NOT_FOUND(3),
	/**
	 * invalid password
	 */
	INVALID_PASSWORD(4),
	/**
	 * user login disabled
	 */
	USER_LOGIN_DISABLED(5),
	/**
	 * group disable
	 */
	GROUP_DISABLED(6);
	private int value;

	ApplicationServer(int value) {
		this.value = value;
	}

	public int value() {
		return value;
	}
}
