package com.bonc.common.hibernate;

import org.hibernate.engine.jdbc.internal.Formatter;

import com.bonc.common.utils.RegUtils;

/**
 * 格式化DDL文
 * @author lbqrcy
 *
 */
public class BoncDDLFomatterImpl implements Formatter {

	private final String CREATE_HEADER = "(?i)^\\s*create\\s+table";
	private final String CREATE_TITLE = "(?i)\\s*create\\s+table\\s+[^\\(]*";
	private final String COMMENT_HEADER="(?i)\\s*comment\\s+on";
	private final String SEMICOLON=";";
	private final String COMMA=",";
	private final String NEW_LINE="\n";
	private final String BRACKET_LEFT="(";
	private final String BRACKET_RIGHT=")";
	private final String BLANK="   ";

	/**
	 * 格式化DDL
	 */
	public String format(String sql) {
		StringBuffer res = new StringBuffer();
		String[] sentence = sql.split(SEMICOLON);
		for (int j = 0; j < sentence.length; j++) {
			String str = sentence[j];
			if (RegUtils.isMatch(CREATE_HEADER, str)) {
				String columStr = getColumns(str);
				String[] colums = columStr.split(COMMA);
				res.append(RegUtils.match(CREATE_TITLE, str, 0));
				res.append(BRACKET_LEFT);
				res.append(NEW_LINE);
				for (int i = 0; i < colums.length; i++) {
					res.append(BLANK);
					res.append(replaceBlank(colums[i]));
					if (i != colums.length - 1) {
						res.append(COMMA);
					}
					res.append(NEW_LINE);
				}
				res.append(BRACKET_RIGHT);
			} else if (RegUtils.isMatch(COMMENT_HEADER, str)) {
				str = str.replaceAll("^\\s*", "");
				res.append(str);
			}
			if (j != sentence.length - 1) {
				res.append(SEMICOLON);
				res.append(NEW_LINE);
			}
		}
		return res.toString();
	}

	/**
	 * 获取列
	 * 
	 * @param str
	 * @return
	 */
	private String getColumns(String str) {
		StringBuffer res = new StringBuffer();
		int bracket = 0;
		for (char ch : str.toCharArray()) {
			if (ch == '(') {
				bracket++;
				if (bracket == 1) {
					continue;
				}
			} else if (ch == ')') {
				bracket--;
			}
			if (bracket > 0) {
				res.append(ch);
			}
		}
		return res.toString();
	}
	
	/**
	 * 替换空格
	 * replaceBlank:(这里用一句话描述这个方法的作用). <br/> 
	 * 
	 * @author liboqiang
	 * @param str
	 * @return 
	 * @since JDK 1.6
	 */
	private  String replaceBlank(String str) {
		return  str.replaceAll("\\s+", " ");
	}
}
