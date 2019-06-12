/**
 * 
 */
package com.bonc.common.exception.system;

/**
 * 
 * @author yantao
 * 
 */
public class DuplicateException extends RuntimeException {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -557252238603381764L;

	/**
	 * 
	 */
	public DuplicateException() {
		super();
	}

	/**
	 * @param message
	 * @param cause
	 */
	public DuplicateException(String message, Throwable cause) {
		super(message, cause);
	}

	/**
	 * @param message
	 */
	public DuplicateException(String message) {
		super(message);
	}

	/**
	 * @param cause
	 */
	public DuplicateException(Throwable cause) {
		super(cause);
	}

}
