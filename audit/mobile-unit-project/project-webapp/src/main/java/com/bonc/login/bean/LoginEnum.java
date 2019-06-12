package com.bonc.login.bean;

public enum LoginEnum {
	/**
	 * 密码验证成功
	 */
	PASSWORD_CHECKED_SUCCESS("0"),
	/**
	 * 密码验证失败
	 */
	PASSWORD_CHECKED_FAIL("1"),
	/**
	 * 用户不存在
	 */
	USER_NON_EXISTENT("2");

	private String value;

	LoginEnum(String value) {
		this.value = value;
	}

	public String value() {
		return value;
	}
}
