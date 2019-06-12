/**
 * 
 */
package com.bonc.common.exception.bussiness;

/**
 * 
 * @author yantao
 * 
 */
public class BaseBussinessException extends RuntimeException {

	public final int ERROR_CODE = 1;

	/**
	 * serialVersionUID
	 */

	/**
	 * 
	 */
	private static final long serialVersionUID = 1638633082214278214L;

	/**
	 * 
	 */
	public BaseBussinessException() {
		super();
	}

	/**
	 * @param message
	 * @param cause
	 */
	public BaseBussinessException(String message, Throwable cause) {
		super(message, cause);
	}

	/**
	 * @param message
	 */
	public BaseBussinessException(String message) {
		super(message);
	}

	/**
	 * @param cause
	 */
	public BaseBussinessException(Throwable cause) {
		super(cause);
	}

}
