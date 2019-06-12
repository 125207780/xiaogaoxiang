package com.bonc.common.service.datasyc;

public interface ISshSycService {

	void addSsh(Object prm, String id) throws RuntimeException;

	void modifySsh(Object prm, String id) throws RuntimeException;

	void delSsh(Object prm, String id) throws RuntimeException;

	void modifyRoleOfSsh(Object prm, String id) throws RuntimeException;

	void batchAuthSsh(Object prm, String id) throws RuntimeException;
}
