package com.bonc.gridinfo.dao.mapper;

import java.util.List;

import com.bonc.gridinfo.dao.entity.GridReadInfo;

public interface GridReadInfoMapper {

	List<GridReadInfo> selectList(GridReadInfo record);

	List<GridReadInfo> selectListByReadStatus(GridReadInfo record);

	void updateByState(GridReadInfo record);
}
