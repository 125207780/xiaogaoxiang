package com.bonc.datamodel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bonc.datamodel.dao.entity.DataModel;
import com.bonc.datamodel.dao.entity.DataModelDtl;
import com.bonc.datamodel.dao.mapper.DataModelDtlMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
public class DataModelDelService {

	@Autowired
	private DataModelDtlMapper mapper;

	public Page<DataModelDtl> selectDataModelDtlList(DataModelDtl dataModelDtl, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<DataModelDtl> pageList = (Page<DataModelDtl>) this.mapper.selectDataModelDtlList(dataModelDtl);
		return pageList;
	}

	public Page<DataModel> selectDataModelList(DataModel dataModel, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<DataModel> pageList = (Page<DataModel>) this.mapper.selectDataModelList(dataModel);
		return pageList;
	}

	public DataModelDtl selectDataModelDtlById(DataModelDtl dataModelDtl) {
		return mapper.selectDataModelDtlById(dataModelDtl);
	}

	public void updateDataModelDtl(DataModelDtl dataModelDtl) {
		mapper.updateDataModelDtl(dataModelDtl);
	}

	public void insertDataModelDtl(DataModelDtl dataModelDtl) {
		mapper.insertDataModelDtl(dataModelDtl);
	}

	public void deleteDataModelDtl(DataModelDtl dataModelDtl) {
		mapper.deleteDataModelDtl(dataModelDtl);
	}

	public DataModel selectDataModelById(DataModel dataModel) {
		return mapper.selectDataModelById(dataModel);
	}

	public void updateDataModel(DataModel dataModel) {
		mapper.updateDataModel(dataModel);
	}

	public void insertDataModel(DataModel dataModel) {
		mapper.insertDataModel(dataModel);
	}

	public void deleteDataModel(DataModel dataModel) {
		mapper.deleteDataModel(dataModel);
	}
}
