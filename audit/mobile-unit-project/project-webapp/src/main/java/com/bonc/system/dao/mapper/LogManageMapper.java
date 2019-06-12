/**
 * 
 */
package com.bonc.system.dao.mapper;

import java.util.List;
import java.util.Map;

import com.bonc.system.bean.Logger;

/**
 * @author songhao
 *
 */
public interface LogManageMapper {

	List<Logger> getLogList(Map<String, String> prmMap);

	void opInsert(Logger logger);

	void opSuccess(Logger logger);
}
