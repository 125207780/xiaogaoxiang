package com.bonc.training.bailong;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.annotation.ArchivesLog;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.system.dao.entity.SysAttachment;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/worker")
public class WorkerAction {

	@Resource
	private WorkerService workerService;

	@Resource
	private BlSysAttachmentMapper blSysAttachmentMapper;

	/**
	 * 分页查询
	 * 
	 * @param worker
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "selectworkerpagelist")
	@ResponseBody
	public PageJqGrid<Worker> selectWorkerPageList(Worker worker, Integer page, Integer rows) {
		Page<Worker> pageList = this.workerService.selectWorkerPageList(worker, page, rows);
		PageJqGrid<Worker> pageJqGrid = new PageJqGrid<Worker>(pageList);
		return pageJqGrid;
	}

	/**
	 * 表单弹出
	 * 
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/showworkerform")
	public String showWorkerForm(HttpServletRequest request, String id) {
		if (!StringUtils.isBlank(id)) {
			Worker worker = this.workerService.selectWorkerById(id);
			request.setAttribute("vo", worker);
		}
		return "pages/jsp/training/bailong/blWorkerForm";
	}

	/**
	 * 新增修改
	 * 
	 * @param worker
	 * @return
	 * @throws NoSuchAlgorithmException
	 */
	@RequestMapping(value = "/workerinsertorupdate")
	@ResponseBody
	public Worker insertOrUpdateWorker(Worker worker) throws NoSuchAlgorithmException {
		String workerId = worker.getWorkerId();
		if (!StringUtils.isBlank(workerId)) { // 判定方法失效
			worker = this.workerService.updateWorker(worker);
		} else {
			worker = this.workerService.insertWorker(worker);
		}
		return worker;
	}

	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deleteworkerbyid")
	@ResponseBody
	public Boolean deleteWorkerById(String id) {
		System.out.println("这里是action 啦啦啦啦啦啦啦啦啦啦啦啦啦啦");
		Boolean bl = this.workerService.deleteWorkerById(id);
		return bl;
	}

	/**
	 * 校验重复
	 * 
	 * @param worker
	 * @return
	 */
	@RequestMapping(value = "/check")
	@ResponseBody
	public Boolean check(Worker worker) {
		Boolean bl = this.workerService.selectCheck(worker);
		return bl;
	}

	/**
	 * 
	 * getFileName:获得简历名称
	 * 
	 * @param id
	 * @return
	 * @since JDK 1.7
	 */
	@ArchivesLog(actionName = "工单管理类", option = "获得文件名称")
	@RequestMapping(value = "/getFileName")
	@ResponseBody
	public String getFileName(String id) {
		List<SysAttachment> files = this.blSysAttachmentMapper.selectAttachByTableId(id + "_send");
		return files.get(0).getRealName();
	}

	/**
	 * 上表单弹出
	 * 
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/uploadshowworkerform")
	public String uploadShowWorkerForm(HttpServletRequest request, String id) {
		if (!StringUtils.isBlank(id)) {
			Worker worker = this.workerService.selectWorkerById(id);
			request.setAttribute("vo", worker);
		}
		return "pages/jsp/training/bailong/upload";
	}

	/**
	 * 下載表单弹出
	 * 
	 * @param request
	 * @param id
	 * @return
	 */
	/*
	 * @RequestMapping(value = "/downloadshowworkerform") public String
	 * downloadShowWorkerForm(HttpServletRequest request, String id) {
	 * if(!StringUtils.isBlank(id)) { Worker worker =
	 * this.workerService.selectWorkerById(id); request.setAttribute("vo",
	 * worker); } return "pages/jsp/training/bailong/download"; }
	 */

}
