package com.bonc.training.dhy;

import java.util.List;

import org.apache.ibatis.annotations.SelectProvider;

public interface DhyEduMapper {

	@SelectProvider(type = DhyEduMapperSql.class, method = "selectList")
	List<DhyEduUser> selectList(DhyEduUser eduer);
	/*
	 * @SelectProvider(type = DhyEduMapperSql.class, method = "selectEduerById")
	 * DhyEduUser selectEduerById(String eduerId);
	 * 
	 * @SelectProvider(type = DhyEduMapperSql.class, method =
	 * "selectEduerByLoginId") DhyEduUser selectEduerByLoginId(String loginId);
	 * 
	 * @InsertProvider(type = DhyEduMapperSql.class, method = "insertEduer")
	 * Boolean insertEduer(DhyEduUser eduer);
	 * 
	 * @UpdateProvider(type = DhyEduMapperSql.class, method = "updateEduer")
	 * Boolean updateEduer(DhyEduUser eduer);
	 * 
	 * @DeleteProvider(type = DhyEduMapperSql.class, method = "deleteEduerById")
	 * Boolean deleteEduerById(String id);
	 * 
	 * @SelectProvider(type = DhyEduMapperSql.class, method = "selectCheck")
	 * Integer selectCheck(DhyEduUser eduer);
	 * 
	 * @SelectProvider(type = DhyEduMapperSql.class, method =
	 * "selectEduerByIds") List<DhyEduUser> selectEduerByIds(String
	 * assigneeIds);
	 */
}
