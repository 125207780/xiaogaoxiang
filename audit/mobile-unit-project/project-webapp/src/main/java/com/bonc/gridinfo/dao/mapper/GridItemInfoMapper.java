package com.bonc.gridinfo.dao.mapper;

import java.util.List;

import com.bonc.gridinfo.dao.entity.GridItemInfo;

public interface GridItemInfoMapper {

	List<GridItemInfo> selectList(GridItemInfo record);

	List<GridItemInfo> selectListByReadStatus(GridItemInfo record);

	void updateByStautes(GridItemInfo record);
}
