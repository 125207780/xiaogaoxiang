package com.bonc.common.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.SocketException;
import java.net.URL;
import java.net.URLDecoder;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;

/**
 * FTP上传文件
 * @author 刘峰
 */
public class FtpClientUtil {

	private FTPClient ftpClient;
	private String hostname;
	private int port;
	private String password;
	private String username;

	/**
	 * @param hostname 服务器地址
	 * @param port 服务器端口
	 * @param username 服务器用户名
	 * @param password 服务器密码
	 */

	public FtpClientUtil(String hostname, int port, String username, String password){
		this.hostname = hostname;
		this.port = port;
		this.password = password;
		this.username = username;
		ftpClient = new FTPClient();
	}

	/**
	 * FTPClient连接
	 * @param hostname 服务器地址
	 * @param port 服务器端口
	 * @return
	 * @throws SocketException
	 * @throws IOException
	 */
	private boolean connectServer(String hostname, int port) throws SocketException, IOException {
		this.ftpClient.connect(hostname, port);
		return this.ftpClient.isConnected();
	}

	/**
	 * FTPClient登陆
	 * @param username 服务器用户名
	 * @param password 服务器密码
	 * @return
	 * @throws IOException
	 */
	private boolean login(String username, String password) throws IOException {
		return this.ftpClient.login(username, password);
	}

	/**
	 * 通过输入流上传本地文件
	 * @param fileName 上传到服务器后文件名称
	 * @param inputStream 本地文件流
	 * @param remotePath 服务器路径
	 * @return 返回上传成功标志
	 * @throws SocketException
	 * @throws IOException
	 */
	public boolean uploadFile(String fileName, InputStream inputStream, String remotePath) throws IOException {
		boolean flag = false;
		try{
			if(this.connectServer(this.hostname, this.port) && this.login(this.username, this.password)){
				//this.ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
				this.ftpClient.makeDirectory(remotePath);//创建文件夹
				this.ftpClient.changeWorkingDirectory(remotePath);//跳转到服务器对应目录
				this.ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);//使用二进制流上传文件
				flag = this.ftpClient.storeFile(new String(fileName.getBytes("GBK"), "iso-8859-1") , inputStream);
				if(flag){
					this.ftpClient.rename(fileName+".bak", fileName);//修改文件名称
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			if(inputStream != null){
				inputStream.close();
			}
		}
		return flag;
	}

	/**
	 * 把服务器文件下载到本地
	 * @param filePath 文件在服务器地址
	 * @param realName 文件上传前的真实名称
	 * @throws IOException
	 */
	public static void fileDown(String filePath, String realName, HttpServletRequest request, HttpServletResponse response) throws IOException {
		FileInputStream fin = null;
		ServletOutputStream out = null;
		try{
			response.setContentType("text/plain; charset=UTF-8");
			request.setCharacterEncoding("UTF-8");
			response.setBufferSize(100 * 1024);
			String fileType = filePath.substring(filePath.lastIndexOf(".") + 1);
			String realfilename = realName + "." + fileType;
			realfilename = URLDecoder.decode(realfilename, "utf-8");
			realfilename = java.net.URLEncoder.encode(realfilename, "utf-8");
			if(request.getHeader("User-Agent").indexOf("MSIE 5.5") != -1) {
				response.setHeader("Content-Disposition", "filename=\"" + realfilename + "\"");
			}else{
				response.setHeader("Content-Disposition", "attachment; filename=\"" + new String((realfilename).getBytes(), "UTF-8") + "\"");
			}
			int len;
			byte[] b = new byte[1024];
			fin = new FileInputStream(filePath);
			out = response.getOutputStream();
			while((len = fin.read(b, 0, 1024)) > 0){
				out.write(b, 0, len);
			}
		}catch(IOException e){
			e.printStackTrace();
			throw e;
		}finally{
			if(out != null){
				out.flush();
				out.close();
			}
			if(fin != null){
				fin.close();
			}
		}
	}

	public static void ftpDownFile(String ip, int port, String username, String password, String remotePath, String realName, HttpServletRequest request, HttpServletResponse response){
		FTPClient ftp = new FTPClient();
		String localPath = null;
		String fileName = null;
		OutputStream is = null;
		try {
			//ftp下载到工程目录tomcat下
			ftp.setControlEncoding("GBK");
			ftp.connect(ip, port);
			ftp.login(username, password);//登录
			int reply = ftp.getReplyCode();
			if(!FTPReply.isPositiveCompletion(reply)){
				ftp.disconnect();
			}else{
				int area = remotePath.lastIndexOf("/") + 1;
				String remote = remotePath.substring(0, area);
				fileName = remotePath.substring(area, remotePath.length());
				//String fileType = remotePath.substring(remotePath.lastIndexOf(".") + 1);//文件类型
				//String fileName = realName + "." + fileType;
				ftp.changeWorkingDirectory(remote);//转移到FTP服务器目录
				//String localPath = request.getRealPath("report") + File.separator;
				URL url = Thread.currentThread().getContextClassLoader().getResource("/");
				localPath = url.getPath();

				File localFile = new File(localPath+fileName);
				is = new FileOutputStream(localFile);
				ftp.retrieveFile(fileName, is);
				ftp.logout();
				is.flush();
				//从工程目录下载到本地
				fileDown(localPath+fileName, realName, request, response);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try{
				is.close();
				if (ftp.isConnected()) {
					ftp.disconnect();
				}
				if(localPath!=null && fileName!=null){
					//下载后删除工程目录临时文件
					File myFile = new File(localPath+fileName);
					if(myFile.exists()){
						myFile.delete();
					}
				}
			}catch(Exception e){
				e.printStackTrace();
			}
		}
	}

	/**
	 * @return
	 */
	public FTPClient getFtpClientInstance(){
		return ftpClient;
	}

	/**
	 * FTOClient 连接
	 * @throws IOException
	 */
	public void disposeFtpClient() throws IOException {
		if(this.ftpClient != null){
			if(this.ftpClient.isConnected())
				this.ftpClient.disconnect();
			this.ftpClient = null;
		}
	}

	public static void main(String[] args) {
		try{
			//FtpClientUtil fcu = new FtpClientUtil("192.168.0.12", 21, "audit_app", "123456");
			//fcu.uploadFile("云南_201705_客户欠费审计报告_bak.doc", new FileInputStream("D:\\bonc\\word\\test\\云南_201705_客户欠费审计报告.doc"), "/home/audit_app/bonc/template/");
		}catch(Exception e){
			e.printStackTrace();
		}

	}

}