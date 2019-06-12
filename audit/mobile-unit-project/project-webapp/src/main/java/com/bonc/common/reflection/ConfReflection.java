package com.bonc.common.reflection;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bonc.common.utils.FormatUtils;
import com.bonc.common.utils.SysCodeUtils;
import com.bonc.datamodel.dao.entity.DataModel;
import com.bonc.datamodel.dao.entity.DataModelDtl;
import com.bonc.datamodel.dao.mapper.DataModelDtlMapper;
import com.bonc.system.dao.entity.SysCode;

@Component
public class ConfReflection {

	@Autowired
	private DataModelDtlMapper dataModelDtlMapper;

	private static ConfReflection confReflection;

	@PostConstruct
	public void init() {
		confReflection = this;
		confReflection.dataModelDtlMapper = this.dataModelDtlMapper;
	}

	public static List<DataModelDtl> getDataModelDtlList(String tableName) {
		DataModel dataModel = new DataModel();
		dataModel.setDataModelName(tableName);
		List<DataModelDtl> dmdList = confReflection.dataModelDtlMapper.selectDataModelDtlByDataModel(dataModel);
		return dmdList;
	}

	@SuppressWarnings("unchecked")
	public static <T> void dataFormat(Collection<Map<T, T>> list, String tableName) throws Exception {
		List<Map<String, String>> codelist = new ArrayList<Map<String, String>>();
		List<Map<String, String>> formatlist = new ArrayList<Map<String, String>>();
		List<DataModelDtl> dmdList = ConfReflection.getDataModelDtlList(tableName);
		for (DataModelDtl dmd : dmdList) {
			if (!StringUtils.equals("0", dmd.getCodeKey())) {
				Map<String, String> map = new HashMap<String, String>();
				map.put("field", dmd.getModelEnglishName());
				map.put("codeType", dmd.getCodeKey());
				codelist.add(map);
			}
			if (!StringUtils.equals("General", dmd.getShowFormat())) {
				Map<String, String> map = new HashMap<String, String>();
				map.put("field", dmd.getModelEnglishName());
				map.put("format", dmd.getShowFormat());
				formatlist.add(map);
			}
		}
		for (Map<T, T> map : list) {
			for (Map<String, String> code : codelist) {
				SysCode sc = new SysCode();
				sc.setCodeKey(map.get(code.get("field")).toString());
				sc.setCodeType(code.get("codeType"));
				String value = SysCodeUtils.Code2Value(sc);
				map.put((T) code.get("field"), (T) value);
			}
			for (Map<String, String> format : formatlist) {
				String value = FormatUtils.format(map.get(format.get("field")).toString(), format.get("format"));
				map.put((T) format.get("field"), (T) value);
			}
		}
	}
}
