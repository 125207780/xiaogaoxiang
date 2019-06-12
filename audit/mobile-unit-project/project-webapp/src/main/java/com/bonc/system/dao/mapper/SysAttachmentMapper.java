package com.bonc.system.dao.mapper;

import java.util.List;

import com.bonc.system.dao.entity.SysAttachment;

public interface SysAttachmentMapper {

	List<SysAttachment> selectAttachById(String attachId);

	List<SysAttachment> selectAttachByTableId(String tableId);

	void insertAttach(SysAttachment entity);

	void deleteAttach(String attachId);

	void updateAttach(SysAttachment entity);
}