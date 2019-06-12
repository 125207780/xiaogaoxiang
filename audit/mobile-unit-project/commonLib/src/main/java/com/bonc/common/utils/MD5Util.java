package com.bonc.common.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Util {
	public static char[] hexChar = { '0', '1', '2', '3', '4', '5', '6', '7',
			'8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };

	public static String toHexString(byte[] b) {
		StringBuilder sb = new StringBuilder(b.length * 2);
		for (int i = 0; i < b.length; i++) {
			sb.append(hexChar[(b[i] & 0xf0) >>> 4]);
			sb.append(hexChar[b[i] & 0x0f]);
		}
		return sb.toString();
	}

	public static String getHash(String msg, String hashType) throws NoSuchAlgorithmException {
		MessageDigest md5 = MessageDigest.getInstance(hashType);
		md5.update(msg.getBytes());
		return toHexString(md5.digest());
	}

	/**
	 * 加密过后的字母大写
	 * @throws NoSuchAlgorithmException 
	 */
	public static String getHash(String msg) throws NoSuchAlgorithmException {
		return getHash(msg,"MD5");
	}
	
	public static void main(String[] args) throws NoSuchAlgorithmException {
		System.out.println(getHash("admin").toLowerCase().equals("21232f297a57a5a743894a0e4a801fc3"));
	}
}
