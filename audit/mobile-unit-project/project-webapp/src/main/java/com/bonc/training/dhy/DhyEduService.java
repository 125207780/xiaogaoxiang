package com.bonc.training.dhy;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.system.service.i.SysUserServiceI;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class DhyEduService implements SysUserServiceI {

	@Resource
	private DhyEduMapper dhyEduMapper;

	/*
	 * public DhyEduUser selectListByLogin(String loginId) { DhyEduUser po = new
	 * DhyEduUser(); //po.setLoginId(loginId); List<DhyEduUser> list =
	 * this.dhyEduMapper.selectList(po); if(list.size() == 1) { return
	 * list.get(0); } return null; }
	 */

	public Page<DhyEduUser> dhyeduselectPageList(DhyEduUser eduer, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<DhyEduUser> pageList = (Page<DhyEduUser>) this.dhyEduMapper.selectList(eduer);
		return pageList;
	}
	/*
	 * public DhyEduUser selectEduerById(String id) { DhyEduUser eduer =
	 * this.dhyEduMapper.selectEduerById(id); return eduer; }
	 */
	/*
	 * public DhyEduUser dhyEduInsertEduer(DhyEduUser eduer) throws
	 * NoSuchAlgorithmException { eduer.setEduerId(UUIDUtil.createUUID());
	 */
	/*
	 * eduer.setCreateTime(DateUtil.formatDate(new Date().getTime()));
	 * eduer.setPassword(MD5Util.getHash(eduer.getPassword()).toLowerCase());
	 */
	/*
	 * Boolean bl = this.dhyEduMapper.insertEduer(eduer); return eduer; }
	 * 
	 * public DhyEduUser updateEduer(DhyEduUser eduer) { Boolean bl =
	 * this.dhyEduMapper.updateEduer(eduer); return eduer; }
	 * 
	 * public Boolean deleteEduerById(String id) { Boolean bl =
	 * this.dhyEduMapper.deleteEduerById(id); return bl; } public Boolean
	 * selectCheck(DhyEduUser eduer) { Integer i =
	 * this.dhyEduMapper.selectCheck(eduer); if(i > 0) { return false; } return
	 * true; }
	 */
}