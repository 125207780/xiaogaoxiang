package com.bonc.common.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 
 * @ClassName: DataSyc
 * @Description: 同步数据注解
 * @author 李博强 liboqiang@bonc.com.cn
 * @date 2016年4月11日 下午2:43:39
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Documented
public @interface DataSync {
}
