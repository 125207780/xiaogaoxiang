package com.bonc.common.service;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.RandomStringUtils;
import org.springframework.stereotype.Service;

/**
 * 生成序列
 * 
 * @author lbqrcy
 *
 */
@Service
public class GenSeqService {

	/**
	 * 
	 * @param 首字母
	 * @return
	 */
	public String genSeq(String topWord) {
		try {
			if (null == topWord || "".equals(topWord) || topWord.length() != 3) {
				return null;
			}
			StringBuffer sb = new StringBuffer();
			// 随机数
			String randomStr = RandomStringUtils.randomNumeric(3);
			// 当前日期
			String now = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
			sb.append(topWord);
			sb.append(now);
			sb.append(randomStr);
			return sb.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}
}
