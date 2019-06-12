package com.bonc.training.bailong;

import org.apache.commons.lang3.StringUtils;

/**
 * 用于返回数据库语句
 * 
 * @author dragon
 *
 */
public class WorkerMapperSql {

	public String selectWorkerPageList(Worker worker) {
		String sql = this.getSql();
		if (!StringUtils.isBlank(worker.getWorkerNum())) {
			sql += " and t.WORKER_NUM like concat(concat('%',#{workerNum}),'%') ";
		}

		if (!StringUtils.isBlank(worker.getWorkerName())) {
			sql += " and t.WORKER_NAME like concat(concat('%',#{workerName}),'%') ";
		}

		return sql;
	}

	public String selectWorkerById(String workerId) {
		String sql = this.getSql() + " and WORKER_ID=#{workerId} ";
		return sql;
	}

	/*
	 * public String selectWorkerByIds(String assigneeIds) { String[]
	 * assigneeIdsArr = assigneeIds.split(","); String userIdsCollect = "("; for
	 * (String assigneeId : assigneeIdsArr) { userIdsCollect += "'"+assigneeId
	 * +"',"; } userIdsCollect =
	 * userIdsCollect.substring(0,userIdsCollect.length()-1); userIdsCollect +=
	 * ")"; String sql = this.getSql() + " and user_id in "+userIdsCollect;
	 * return sql; }
	 * 
	 * public String selectSysUserByLoginId(String loginId) { String sql =
	 * this.getSql() + " and t.login_id=#{loginId} "; return sql; }
	 */
	public String selectCheck(Worker worker) {
		String sql = " select count(*) from BL_TEST t where 1=1 ";

		if (!StringUtils.isBlank(worker.getWorkerNum())) {
			sql += " and t.worker_Num = #{workerNum} ";
		}
		/*
		 * //暂时只有工号核对 电话没有 qwq if(!StringUtils.isBlank(worker.getWorkerTel())) {
		 * sql += " and t.worker_Tel = #{workerTel} "; }
		 */
		return sql;

	}

	public String deleteWorkerById(String id) {
		System.out.println("这里是sql 啦啦啦啦啦啦啦啦啦啦啦啦啦啦"); // 运行查看console
		String sql = "delete from BL_TEST where WORKER_ID=#{id}";
		return sql;
	}

	public String insertWorker(Worker worker) {
		String sql = "insert into BL_TEST(WORKER_ID,WORKER_NUM,WORKER_NAME,WORKER_SEX, TREE_CODE, WORKER_POSITION, WORKER_LEADER, WORKER_NATIVE_PLACE, WORKER_HOMEPLACE, WORKER_TEL, WORKER_SELF_EVALUATION) "
				+ "values(#{workerId},#{workerNum},#{workerName},#{workerSex},#{treeCode},#{workerPosition},#{workerLeader},#{workerNativePlace},#{workerHomeplace},#{workerTel},#{workerSelfEvaluation})";
		return sql;
	}

	public String updateWorker(Worker worker) {
		String sql = "update BL_TEST set "
				+ "WORKER_NUM=#{workerNum},WORKER_NAME=#{workerName},WORKER_SEX=#{workerSex},TREE_CODE=#{treeCode},WORKER_POSITION=#{workerPosition},WORKER_LEADER=#{workerLeader},WORKER_NATIVE_PLACE=#{workerNativePlace},WORKER_HOMEPLACE=#{workerHomeplace},WORKER_TEL=#{workerTel},WORKER_SELF_EVALUATION=#{workerSelfEvaluation} "
				+ " where WORKER_ID=#{workerId} ";
		return sql;
	}

	private String getSql() {
		String sql = "select " + " t.WORKER_ID workerId," + " t.WORKER_NUM workerNum," + " t.WORKER_NAME workerName," + " t.WORKER_SEX workerSex,"
				+ " t.TREE_CODE treeCode," + " t.WORKER_POSITION workerPosition," + " t.WORKER_LEADER workerLeader,"
				+ " t.WORKER_NATIVE_PLACE workerNativePlace," + " t.WORKER_HOMEPLACE workerHomeplace," + " t.WORKER_TEL workerTel,"
				+ " t.WORKER_SELF_EVALUATION workerSelfEvaluation" + " from " + " BL_TEST t " + " left join sys_org tt on t.TREE_CODE=tt.org_id "
				+ " where 1=1 ";
		return sql;
	}
}