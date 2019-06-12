package com.bonc.income.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.bonc.income.dao.mapper.Page1Mapper;

@Service
public class filterService {
	@Resource
	private Page1Mapper mapper;
	
	public Map<String,String> IncomPlace(String userId){
		Calendar calendar=Calendar.getInstance();	
		int month=Calendar.MONTH;
		calendar.add(month, 0);
		Date date =calendar.getTime();
		String mo=new SimpleDateFormat("yyyyMM").format(date); 
	    Map<String,Object> paramMap = new HashMap<String,Object>();
	    String tableName = "HNBI3.LU_FRAME_USER_DS15_"+mo;
	    paramMap.put("tableName", tableName);
	    paramMap.put("userId", userId);
	    return mapper.IncomPlace(paramMap);
	}
}
