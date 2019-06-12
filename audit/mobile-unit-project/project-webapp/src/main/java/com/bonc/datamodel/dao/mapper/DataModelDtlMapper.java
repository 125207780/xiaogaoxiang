package com.bonc.datamodel.dao.mapper;

import java.util.List;

import com.bonc.datamodel.dao.entity.DataModel;
import com.bonc.datamodel.dao.entity.DataModelDtl;

/**
 * @author weihongda 数据模型以及数据模型详细mapper层
 */
public interface DataModelDtlMapper {

	List<DataModelDtl> selectDataModelDtlList(DataModelDtl dataModelDtl);

	DataModelDtl selectDataModelDtlById(DataModelDtl dataModelDtl);

	void updateDataModelDtl(DataModelDtl dataModelDtl);

	void insertDataModelDtl(DataModelDtl dataModelDtl);

	void deleteDataModelDtl(DataModelDtl dataModelDtl);

	List<DataModel> selectDataModelList(DataModel dataModel);

	DataModel selectDataModelById(DataModel dataModel);

	void updateDataModel(DataModel dataModel);

	void insertDataModel(DataModel dataModel);

	void deleteDataModel(DataModel dataModel);

	void deleteByDataModelId(String dataModelId);

	List<DataModelDtl> selectDataModelDtlByDataModel(DataModel dataModel);
}
