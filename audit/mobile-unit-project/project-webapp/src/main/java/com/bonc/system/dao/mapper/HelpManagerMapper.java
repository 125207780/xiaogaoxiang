package com.bonc.system.dao.mapper;

import java.util.List;

import com.bonc.system.dao.entity.HelpDocToFtp;

public interface HelpManagerMapper {

	public void intertHelpDocInfo(HelpDocToFtp help);

	List<HelpDocToFtp> selectList(HelpDocToFtp po);

	public void updateHelpDocInfo(HelpDocToFtp po);

	public void deletesyshelpbyId(String id);

	public HelpDocToFtp selectSysHelpById(String id);
}
