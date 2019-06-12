package com.bonc.gridinfo.dao.mapper;

import java.util.List;

import com.bonc.gridinfo.dao.entity.GridManagerUser;

/**
 * 管理人员信息mapper
 * 
 * @author liulin@bonc.com.cn
 *
 */
public interface GridManagerUserMapper {

	public List<GridManagerUser> getGridManagerUserInfo(String gridCode);

}
