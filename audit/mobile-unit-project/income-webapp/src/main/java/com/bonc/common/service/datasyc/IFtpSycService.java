package com.bonc.common.service.datasyc;

public interface IFtpSycService {

	void addFtp(Object prm, String id) throws RuntimeException;
		
	void modifyFtp(Object prm, String id) throws RuntimeException;

	void delFtp(Object prm, String id) throws RuntimeException;
	
	void modifyRoleOfFtp(Object prm, String id) throws RuntimeException;
	
	void batchAuthFtp(Object prm, String id) throws RuntimeException;
}
