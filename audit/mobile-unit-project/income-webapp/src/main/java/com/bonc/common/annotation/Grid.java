package com.bonc.common.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({java.lang.annotation.ElementType.FIELD})
public @interface Grid
{
	public String colName();
	public String align() default "center";
	public boolean hidden() default false;
	public boolean isCodeKey() default false;
	public String dateFormat() default "";
	public String feeFormat() default "";
}
