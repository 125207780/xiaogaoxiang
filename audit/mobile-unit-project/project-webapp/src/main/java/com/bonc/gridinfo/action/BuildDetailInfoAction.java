package com.bonc.gridinfo.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.gridinfo.dao.entity.BuildDetailInfo;
import com.bonc.gridinfo.service.BuildDetailInfoService;

/**
 * 楼宇详情信息控制类
 * 
 * @author liulin@bonc.com.cn
 *
 */

@Controller
@RequestMapping(value = "/buildDetailInfo")
public class BuildDetailInfoAction {

	@Resource
	private BuildDetailInfoService buildDetailInfoService;

	@RequestMapping(value = "/gridBuildDetailInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getBuildingInfo(BuildDetailInfo buildDetailInfo, String gridCode, String listType) {
		try {
			List<Map<String, Object>> buildDetailInfoMapper = this.buildDetailInfoService.getBuildDetailInfoMapper(listType, gridCode);
			return Ajax.responseString(CST.RES_SECCESS, buildDetailInfoMapper);

		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "楼宇详情信息查询失败！");
		}
	}

	@RequestMapping(value = "/buildDetailTypeInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String BuildDetailTypeInfo(HttpSession session) {
		try {
			List<BuildDetailInfo> gridInfo = this.buildDetailInfoService.getMapper().getBuildDetailInfoType();
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "楼宇详情信息查询失败！");
		}
	}
}
