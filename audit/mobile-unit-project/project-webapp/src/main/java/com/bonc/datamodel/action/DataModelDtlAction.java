package com.bonc.datamodel.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.jsoup.helper.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.datamodel.dao.entity.DataModel;
import com.bonc.datamodel.dao.entity.DataModelDtl;
import com.bonc.datamodel.dao.entity.ZTree;
import com.bonc.datamodel.dao.mapper.DataModelDtlMapper;
import com.bonc.datamodel.service.DataModelDelService;
import com.bonc.system.dao.entity.SysCode;
import com.bonc.system.dao.mapper.SysCodeMapper;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/datamodeldtl")
public class DataModelDtlAction {

	@Autowired
	private DataModelDelService service;
	@Autowired
	private DataModelDtlMapper mapper;
	@Autowired
	private SysCodeMapper sysCodeMapper;

	@RequestMapping(value = "/selectdatamodeldtlpagelist")
	@ResponseBody
	public List<DataModelDtl> selectDataModelDtlPageList(HttpServletRequest request) {
		DataModelDtl modelResultConfig = new DataModelDtl();
		modelResultConfig.setDataModelId((String) request.getSession().getAttribute("d"));
		List<DataModelDtl> list = mapper.selectDataModelDtlList(modelResultConfig);
		return list;
	}

	@RequestMapping(value = "/selectdatamodelpagelist")
	@ResponseBody
	public PageJqGrid<DataModel> selectDataModelPageList(DataModel dataModel, Integer page, Integer rows) {
		Page<DataModel> pageList = this.service.selectDataModelList(dataModel, page, rows);
		PageJqGrid<DataModel> pageJqGrid = new PageJqGrid<DataModel>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/deletedatamodeldtl")
	@ResponseBody
	public boolean deleteDataModelDtl(String id) {
		DataModelDtl modelResultConfig = new DataModelDtl();
		modelResultConfig.setId(id);
		service.deleteDataModelDtl(modelResultConfig);
		return true;
	}

	@RequestMapping(value = "/deletedatamodel")
	@ResponseBody
	public boolean deleteDataModel(String id) {
		DataModel dataModel = new DataModel();
		dataModel.setId(id);
		mapper.deleteByDataModelId(id);
		service.deleteDataModel(dataModel);
		return true;
	}

	@RequestMapping(value = "/showdatamodeldtlform")
	public String showDataModelDtlForm(String id, HttpServletRequest request) {
		DataModel d = new DataModel();
		d.setId(id);
		d = service.selectDataModelById(d);
		request.setAttribute("dataModelDtl", d);
		SysCode isCode = new SysCode();
		isCode.setTreeLevel("1");
		List<SysCode> isCodeList = sysCodeMapper.selectList(isCode);
		request.setAttribute("isCodeList", isCodeList);
		request.getSession().setAttribute("d", d.getId());
		return "/pages/jsp/datamodeldtl/dataModelDtlForm";
	}

	@RequestMapping(value = "/showdatamodelform")
	public String showDateModelForm(String id, HttpServletRequest request) {
		DataModel d = new DataModel();
		d.setId(id);
		d = service.selectDataModelById(d);
		request.setAttribute("dataModelDtl", d);
		return "/pages/jsp/datamodeldtl/dataModelForm";
	}

	@RequestMapping(value = "/showforinsertdatamodelform")
	public String showForInsertDateModelForm() {
		return "/pages/jsp/datamodeldtl/dataModelForm";
	}

	@RequestMapping(value = "/updatebysortby")
	@ResponseBody
	public boolean updateBySortBy(String a, String b, String a1, String b1) {
		DataModelDtl m1 = new DataModelDtl();
		m1.setId(a);
		m1 = mapper.selectDataModelDtlList(m1).get(0);
		m1.setSortBy(b1);
		service.updateDataModelDtl(m1);
		DataModelDtl m2 = new DataModelDtl();
		m2.setId(b);
		m2 = mapper.selectDataModelDtlList(m2).get(0);
		m2.setSortBy(a1);
		service.updateDataModelDtl(m2);
		return true;
	}

	@RequestMapping(value = "/updatedatamodel")
	@ResponseBody
	public boolean updateDataModel(DataModel dataModel) {
		service.updateDataModel(dataModel);
		return true;
	}

	@RequestMapping(value = "/adddatamodel")
	@ResponseBody
	public boolean addDataModel(DataModel dataModel) {
		service.insertDataModel(dataModel);
		return true;
	}

	@RequestMapping(value = "/adddatamodeldtl")
	@ResponseBody
	public boolean addDataModelDtl(DataModelDtl dataModelDtl) {
		Map<String, String> map = getSysCode();
		for (String s : map.keySet()) {
			if (s.equals(dataModelDtl.getShowFormat())) {
				dataModelDtl.setShowFormat(map.get(s));
				break;
			}
		}
		if (StringUtil.isBlank(dataModelDtl.getId())) {
			service.insertDataModelDtl(dataModelDtl);
		} else {
			service.updateDataModelDtl(dataModelDtl);
		}
		return true;
	}

	@RequestMapping(value = "/getdatemModeldtlbyid")
	@ResponseBody
	public DataModelDtl getDateModelDtlById(String id, HttpServletRequest request) {
		DataModelDtl ModelResultConfig = new DataModelDtl();
		ModelResultConfig.setId(id);
		ModelResultConfig = mapper.selectDataModelDtlList(ModelResultConfig).get(0);
		return ModelResultConfig;
	}

	@RequestMapping(value = "/getForZtree")
	@ResponseBody
	public List<ZTree> getMessage() {
		List<SysCode> list = new ArrayList<>();
		SysCode sysCode = new SysCode();
		sysCode.setCodeType("showFormat");
		list = sysCodeMapper.selectList(sysCode);
		List<ZTree> zTreeList = new ArrayList<>();
		for (SysCode s : list) {
			ZTree z = new ZTree();
			z.setName(s.getCodeValue());
			z.setId(s.getId());
			z.setpId(s.getParentId());
			if (!StringUtil.isBlank(z.getName())) {
				zTreeList.add(z);
			}
		}
		return zTreeList;
	}

	public Map<String, String> getSysCode() {
		Map<String, String> map = new HashMap<>();
		List<SysCode> list = new ArrayList<>();
		SysCode sysCode = new SysCode();
		sysCode.setCodeType("showFormat");
		list = sysCodeMapper.selectList(sysCode);
		for (SysCode s : list) {
			map.put(s.getCodeValue(), s.getCodeKey());
		}
		return map;
	}
}
