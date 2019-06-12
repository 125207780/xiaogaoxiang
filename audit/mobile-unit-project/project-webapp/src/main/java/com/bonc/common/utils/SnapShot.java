package com.bonc.common.utils;

import com.bonc.common.cst.CST;

/**
 * 
 * ClassName: SnapShot <br/>
 * Reason: 网页截图类. <br/>
 * date: 2017年3月27日 下午5:21:08 <br/>
 * 
 * @author liboqiang
 * @version
 * @since JDK 1.6
 */
public class SnapShot {

	/**
	 * 
	 * shortCut:(截图类). <br/>
	 * 
	 * @author liboqiang
	 * @param url
	 * @param fileName
	 * @return
	 * @since JDK 1.6
	 */
	public static void shortCut(String url, String fileName) {
		try {
			StringBuffer shell = new StringBuffer();
			shell.append("java -jar ");
			shell.append(CST.SNAPSHOT_JAR);
			shell.append(" ");
			shell.append(url);
			shell.append(" ");
			shell.append(fileName);
			shell.append(" ");
			shell.append(10);
			System.out.println("++++++++++++++++++++++++++++++++++++++++++++++++shell:" + shell);
			Runtime.getRuntime().exec(shell.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
