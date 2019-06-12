package com.bonc.gridinfo.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.bonc.gridinfo.dao.entity.BaseStation;
import com.bonc.gridinfo.dao.entity.ChannelManage;

/**
 * 
 * 渠道基站mapper
 * 
 * @author yangdong@bonc.com.cn
 *
 */
public interface ChannelStationMapper {

	/**
	 * 渠道信息
	 * 
	 * @return
	 */
	public List<ChannelManage> getChannelManageInfo(ChannelManage channelManage);

	/**
	 * 基站信息
	 * 
	 * @return
	 */
	public List<BaseStation> getBaseStationInfo(BaseStation baseStation);

	public List<ChannelManage> selectChannelManageAll(String gridCode);

	public List<BaseStation> selectBaseStationAll(String gridCode);

	public List<ChannelManage> getOperator(String gridCode);

	public List<ChannelManage> getChannelType(@Param("gridCode") String gridCode, @Param("marketType") String marketType);

	public List<ChannelManage> getChnlTypelevel2Ratio(@Param("gridCode") String gridCode, @Param("marketType") String marketType,
			@Param("channelType") String channelType);

	public List<BaseStation> getBaseStationDetailsRatio(String gridCode);
}
