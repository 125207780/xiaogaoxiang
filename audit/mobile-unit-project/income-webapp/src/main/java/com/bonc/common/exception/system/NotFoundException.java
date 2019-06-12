/**
 * 
 */
package com.bonc.common.exception.system;

/**
 * the not found exception
 * 
 * @author yantao
 * 
 */
public class NotFoundException extends RuntimeException {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -8482417659818731233L;

	/**
	 * 
	 */
	public NotFoundException() {
		super();
	}

	/**
	 * @param message
	 * @param cause
	 */
	public NotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	/**
	 * @param message
	 */
	public NotFoundException(String message) {
		super(message);
	}

	/**
	 * @param cause
	 */
	public NotFoundException(Throwable cause) {
		super(cause);
	}

}
