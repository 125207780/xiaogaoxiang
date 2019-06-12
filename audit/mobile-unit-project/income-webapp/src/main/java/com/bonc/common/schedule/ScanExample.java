package com.bonc.common.schedule;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * 
* @ClassName: ScanExample
* @Description: 定时类示例程序
* @author 李博强  liboqiang@bonc.com.cn
* @date 2016年3月25日 上午9:14:30
*
 */
@Component
public class ScanExample{
	
	@Scheduled(cron="0/5 * * * * ?")
	public void execute(){
		//TODO:添加业务逻辑代码
	}
}
