package com.bonc.training.bailong;

import java.security.NoSuchAlgorithmException;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.utils.UUIDUtil;
import com.bonc.system.service.i.SysUserServiceI;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class WorkerService implements SysUserServiceI {

	@Resource
	private WorkerMapper workerMapper;

	/*
	 * public SysUser selectListByLogin(String loginId) { SysUser po = new
	 * SysUser(); po.setLoginId(loginId); List<SysUser> list =
	 * this.workerMapper.selectList(po); if(list.size() == 1) { return
	 * list.get(0); } return null; }
	 */
	public Page<Worker> selectWorkerPageList(Worker worker, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<Worker> pageList = (Page<Worker>) this.workerMapper.selectWorkerPageList(worker);
		return pageList;
	}

	public Worker selectWorkerById(String id) {
		Worker worker = this.workerMapper.selectWorkerById(id);
		return worker;
	}

	public Worker insertWorker(Worker worker) throws NoSuchAlgorithmException {
		worker.setWorkerId(UUIDUtil.createUUID());
		this.workerMapper.insertWorker(worker);
		return worker;
	}

	public Worker updateWorker(Worker worker) {
		this.workerMapper.updateWorker(worker);
		return worker;
	}

	public Boolean deleteWorkerById(String id) {

		Boolean bl = this.workerMapper.deleteWorkerById(id);
		return bl;
	}

	public Boolean selectCheck(Worker worker) {
		Integer i = this.workerMapper.selectCheck(worker);
		if (i > 0) {
			return false;
		}
		return true;
	}
}
