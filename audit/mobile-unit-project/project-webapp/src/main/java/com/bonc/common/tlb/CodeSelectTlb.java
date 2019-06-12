package com.bonc.common.tlb;

import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.lang.StringUtils;

import com.bonc.system.dao.entity.SysCode;
import com.bonc.system.service.SysCodeUtils;

@SuppressWarnings({ "serial", "static-access" })
public class CodeSelectTlb extends TagSupport {

	private String id;
	private String name;
	private String cssClass;
	private String value;
	private String codeType;
	private String width;
	private String defaultyn;
	private String defaultValue;
	private String style;

	public int doStartTag() {
		try {
			JspWriter out = this.pageContext.getOut();
			List<SysCode> list = SysCodeUtils.getSysCodeList(codeType);
			StringBuffer sbb = new StringBuffer();
			if (width != null) {
				sbb.append(" style=\"width: " + width + "px;\"");
			}
			if (id != null) {
				sbb.append(" id=\"" + id + "\"");
			}
			if (name != null) {
				sbb.append(" name=\"" + name + "\"");
			}
			if (cssClass != null) {
				sbb.append(" class=\"" + cssClass + "\"");
			}
			if (style != null) {
				sbb.append(" style=\"" + style + "\"");
			}
			StringBuffer sb = new StringBuffer();
			sb.append("<select " + sbb + ">");
			if (!"n".equals(defaultyn)) {
				sb.append("<option value=\"\">--- 请选择 ---</option>");
			}
			for (SysCode sysCode : list) {
				if (!StringUtils.isBlank(defaultValue)) {
					Boolean bl = false;
					for (String defaultValueTemp : defaultValue.split(",")) {
						if (defaultValueTemp.equals(sysCode.getCodeKey())) {
							bl = true;
							break;
						}
					}
					if (!bl) {
						continue;
					}
				}
				if (value != null && value.equals(sysCode.getCodeKey())) {
					sb.append("<option selected=\"selected\" value=\"" + sysCode.getCodeKey() + "\">");
				} else {
					sb.append("<option value=\"" + sysCode.getCodeKey() + "\">");
				}
				sb.append(sysCode.getCodeValue());
				sb.append("</option>");
			}
			sb.append("</select>");
			out.println(sb);
			return this.EVAL_PAGE;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("select自定义标签错误！");
		}
	}

	public int doEndTag() throws JspException {
		return this.SKIP_BODY;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCssClass() {
		return cssClass;
	}

	public void setCssClass(String cssClass) {
		this.cssClass = cssClass;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public String getCodeType() {
		return codeType;
	}

	public void setCodeType(String codeType) {
		this.codeType = codeType;
	}

	public String getDefaultyn() {
		return defaultyn;
	}

	public void setDefaultyn(String defaultyn) {
		this.defaultyn = defaultyn;
	}
}
