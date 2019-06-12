package com.bonc.school.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.school.dao.entity.SchoolUserDetail;

public interface SchoolUserDetailMapper {

	List<SchoolUserDetail> findSchoolUserDetailInfo(SchoolUserDetail statisMonth);

	SchoolUserDetail findUserInfo(SchoolUserDetail statisMonth);

	List<SchoolUserDetail> selectAll(@Param("statisMonth") int statisMonth, @Param("actviTypeId") String actviTypeId, @Param("usrType") String usrType,
			@Param("feeLevelId") String feeLevelId, @Param("gprsLevelId") String gprsLevelId, @Param("schoolId") String schoolId,
			@Param("voiceLevelId") String voiceLevelId, @Param("appTypeId") String appTypeId, @Param("discFeeId") String discFeeId);

	List<Map<String, String>> findContractType();

	List<Map<String, String>> findStockAdditions();

	List<Map<String, String>> findIncomeFiling();

	List<Map<String, String>> findAPPFiling();

	List<Map<String, String>> findTaocanFiling();

	List<Map<String, String>> findFlowFiling();

	List<Map<String, String>> findPhoneticFiling();
}
