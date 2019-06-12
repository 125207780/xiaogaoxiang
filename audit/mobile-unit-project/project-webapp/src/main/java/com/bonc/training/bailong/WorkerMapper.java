package com.bonc.training.bailong;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

public interface WorkerMapper {

	@SelectProvider(type = WorkerMapperSql.class, method = "selectWorkerPageList")
	List<Worker> selectWorkerPageList(Worker worker);

	@SelectProvider(type = WorkerMapperSql.class, method = "selectWorkerById")
	Worker selectWorkerById(String workerId);

	/*
	 * @SelectProvider(type = WorkerMapperSql.class, method =
	 * "selectSysUserByLoginId") SysUser selectSysUserByLoginId(String loginId);
	 */
	@InsertProvider(type = WorkerMapperSql.class, method = "insertWorker")
	Boolean insertWorker(Worker worker);

	@UpdateProvider(type = WorkerMapperSql.class, method = "updateWorker")
	Boolean updateWorker(Worker worker);

	@DeleteProvider(type = WorkerMapperSql.class, method = "deleteWorkerById")
	Boolean deleteWorkerById(String id);

	@SelectProvider(type = WorkerMapperSql.class, method = "selectCheck")
	Integer selectCheck(Worker worker);
	/*
	 * @SelectProvider(type = WorkerMapperSql.class, method =
	 * "selectWorkerByIds") List<Worker> selectWorkerByIds(String assigneeIds);
	 */
}
