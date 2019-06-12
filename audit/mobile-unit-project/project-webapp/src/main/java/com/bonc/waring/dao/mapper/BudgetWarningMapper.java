package com.bonc.waring.dao.mapper;

import java.util.List;
import java.util.Map;

import com.bonc.waring.dao.entity.RuleWarning;
import com.bonc.waring.dao.entity.WgYjWarnObj;

public interface BudgetWarningMapper {

	public List<RuleWarning> getRuleWarning(RuleWarning ruleWarning);

	public List<Map<String, Object>> getChnlInfo(String orgId);

	public List<Map<String, Object>> getRangeInfo();

	public List<Map<String, Object>> getWarnType();

	public List<Map<String, Object>> getWarnStyle();

	public List<Map<String, Object>> getWarnRule();

	public List<Map<String, Object>> getKpiInfo();

	public List<Map<String, Object>> getObject(String orgId);

	public void addWarnRule(RuleWarning ruleWarning);

	public void addWgYjWarnObj(WgYjWarnObj wgYjWarnObj);

	public void updateWarnRule(RuleWarning ruleWarning);

	public void deleteWgYjWarnObj(String warnId);

	public List<Map<String, Object>> checkRuleWarning(String warnId);

	public void updateStauts(String warnId);

	public List<Map<String, Object>> getGridObject(String gridCode);

	public List<Map<String, Object>> getchnlObject(String chnlCode);

	public List<Map<String, Object>> selectObjectNameAndId(String warnId);
}
