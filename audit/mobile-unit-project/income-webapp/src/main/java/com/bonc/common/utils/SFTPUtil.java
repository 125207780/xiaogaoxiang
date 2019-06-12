package com.bonc.common.utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bonc.common.tool.bean.FtpConfig;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;
/**
 * 
 * @author liulin
 *
 */
public class SFTPUtil {

	private static Logger logger = LoggerFactory.getLogger(SFTPUtil.class);
	private FtpConfig ftpConfig;
	private ChannelSftp sftp;
    private Session session;
    /** SFTP 登录用户名*/
    private String username;
    /** SFTP 登录密码*/
    private String password;
    /** SFTP 服务器地址IP地址*/
    private String host;
    /** SFTP 端口*/
    private int port;
    
    /**
     * 构造基于密码认证的sftp对象
     * @param username
     * @param password
     * @param host
     * @param port
     */
    public SFTPUtil(String username, String password, String host, int port) {
        this.username = username;
        this.password = password;  
        this.host = host;
        this.port = port;  
    }
    
    public SFTPUtil(){}
    
    public void setFtpConfig(FtpConfig ftpConfig) {
		this.ftpConfig = ftpConfig;
	}

    /**
     * 连接sftp服务器
     * @throws JSchException 
     */
    public void login() throws Exception {
    	JSch jsch = new JSch();
    	session = jsch.getSession(username, host, port);
    	session.setPassword(password);
    	session.setTimeout(100000);
    	Properties config = new Properties();
    	config.put("StrictHostKeyChecking", "no");
    	session.setConfig(config);
    	try {
			session.connect();
		} catch (Exception e) {
			if(session.isConnected()){
				session.disconnect();
				logger.error("连接SFTP服务器失败！！！");
			}
			e.printStackTrace();
		}
    	Channel channel = session.openChannel("sftp");
    	try {
    		channel.connect();
    	} catch (Exception e) {
			if(channel.isConnected()){
				channel.disconnect();
				logger.error("连接SFTP服务器失败！！！");
			}
			e.printStackTrace();
		}
    	sftp = (ChannelSftp) channel;
    }
    
    /**
     * 关闭连接 server
     */
    public void logout(){
        if (sftp != null) {
            if (sftp.isConnected()) {
                sftp.disconnect();
            }
        }
        if (session != null) {
            if (session.isConnected()) {
                session.disconnect();
            }
        }
    }
    
    /**
     * 文件上传
     * @param basePath SFTP服务器上传的目录
     * @param fileName 文件名
     * @param input    输入流
     * @throws Exception 
     */
    @SuppressWarnings("static-access")
	public void upload(String directory,String fileName, InputStream input) throws Exception {  
    	System.out.println("upload==================directory================"+directory);
    	System.out.println("upload==================fileName================"+fileName);
    	try{
    		login();
    		sftp.cd(directory); //进入目录
    	}catch(SftpException sException){
    		if(sftp.SSH_FX_NO_SUCH_FILE == sException.id){ //指定上传路径不存在
                sftp.mkdir(directory);//创建目录
                sftp.cd(directory);  //进入目录
            }
    	}
    	System.out.println("upload==================================start upload");
    	sftp.put(input, fileName);  //上传文件
    	logout();
    	System.out.println("upload==================================end upload");
    }
    
    /**
	 * 如果SFTP器配置Nginx，可通过URL路径直接下载文件
	 * @param url               文件访问路径
	 * @param realName          文件名称
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void fileDownNg(String url, String realName, HttpServletRequest request, HttpServletResponse response) throws IOException {
		BufferedInputStream dis = null;
        BufferedOutputStream fos = null;

        try {
        	String srtname = url.substring(url.lastIndexOf("/") + 1);
        	url = url.substring(0,url.lastIndexOf("/"))+"/"+URLEncoder.encode(srtname,"utf-8");
            URL httpUrl = new URL(url);
            response.setContentType("application/x-msdownload;");
            response.setHeader("Content-disposition", "attachment; filename=" + new String(realName.getBytes("UTF-8"), "ISO-8859-1"));
            response.setHeader("Content-Length", String.valueOf(httpUrl.openConnection().getContentLength()));

            dis = new BufferedInputStream(httpUrl.openStream());
            fos = new BufferedOutputStream(response.getOutputStream());

            byte[] buff = new byte[1024];
            int bytesRead;
            while (-1 != (bytesRead = dis.read(buff, 0, buff.length))) {
                fos.write(buff, 0, bytesRead);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (dis != null)
                dis.close();
            if (fos != null)
                fos.close();
        }
	}
	
	/**
	 * 校验html文件是否存在
	 * @param tableId
	 * @return
	 */
	public boolean isExistFile(String tableId){
		boolean isExist = true;
		String filePath = ftpConfig.getFtpServerAddress() + "previews/" + tableId + "/";
		try {
			sftp.cd(filePath);
			sftp.stat(filePath+tableId+".html");
		} catch (Exception e) {
			isExist = false;
		}
		return isExist;
	}
	
	/**
	 * 获取文件流
	 * @param directory
	 * @param downloadFile
	 * @return
	 */
	public InputStream getFile(String directory, String downloadFile) {
		InputStream is = null;
		try {
			sftp.cd(directory);
			is = sftp.get(downloadFile);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return is;
    }
    
    /**
     * 删除本地工程文件目录
     *
     * @param deletePath
     */
    private void delete(String deletePath) {
        delAllFile(deletePath);
        String filePath = deletePath;
        File file = new File(filePath);
        file.delete();
    }

    /**
     * 删除本地工程文件目录下所有文件
     *
     * @param path
     */
    public void delAllFile(String path) {
        File file = new File(path);
        if (!file.exists()) {
            return;
        }
        if (!file.isDirectory()) {
            return;
        }
        String[] tempList = file.list();
        File temp = null;
        for (int i = 0; i < tempList.length; i++) {
            temp = new File(path + tempList[i]);
            if (temp.isFile()) {
                temp.delete();
            }
            if (temp.isDirectory()) {
                delAllFile(path + tempList[i] + "/");
                delete(path + tempList[i] + "/");
            }
        }
    }
	
}
