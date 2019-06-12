package com.bonc.system.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.SocketException;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bonc.common.bean.FtpConfig;
import com.bonc.common.utils.FtpClientUtil;
import com.bonc.common.utils.JedisClientPool;
import com.bonc.system.dao.entity.HelpDocToFtp;
import com.bonc.system.dao.mapper.HelpManagerMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
public class HelpManagerService {

	@Resource(name = "jedisClientPool")
	private JedisClientPool jedisClientPool;

	@Resource(name = "ftpConfig")
	private FtpConfig ftpConfig;

	@Resource
	private HelpManagerMapper mapper;

	public HelpManagerMapper getMapper() {
		return mapper;
	}

	// 上传至FTP
	public boolean upload(MultipartFile file, HelpDocToFtp help) throws IOException {
		boolean falg = false;
		String path = help.getTextRoad();
		String fileName = file.getOriginalFilename();
		help.setHelpFileName(fileName);
		// 扩展名
		// String fileExtensionName =
		// fileName.substring(fileName.lastIndexOf('.') + 1);
		// 使用UUID防止文件名重复，覆盖别人的文件
		String uuid = UUID.randomUUID().toString();
		help.setId(uuid);
		String uploadFileName = uuid + "-" + fileName;
		InputStream inputStream = null;
		try {
			// 下一步是把文件上传到FTP服务器,与FTP文件服务器对接
			FTPClient ftpClient = new FTPClient();
			if (!isConnectFtp(ftpClient)) {
				return false;
			}
			if (!ftpClient.changeWorkingDirectory(path)) {
				ftpClient.makeDirectory(path);
			}
			ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);// 使用二进制流上传文件
			inputStream = file.getInputStream();
			// 此时的上传路径是由配置文件中配置好的
			// String ftpServerAddress = ftpConfig.getFtpServerAddress();
			// 参数中的地址
			// ftpServerAddress=path;
			// help.setTextRoad(ftpServerAddress); // 文件中的文件地址
			falg = ftpClient.storeFile(new String(uploadFileName.getBytes("GBK"), "iso-8859-1"), inputStream);

			// 数据入库操作
			mapper.intertHelpDocInfo(help);
		} catch (IOException e) {
			return falg;
		} finally {
			if (inputStream != null) {
				inputStream.close();
			}
		}

		return falg;

	}

	public Boolean isConnectFtp(FTPClient ftpClient) throws NumberFormatException, SocketException, IOException {
		ftpClient.connect(ftpConfig.getFtpServerId(), Integer.parseInt(ftpConfig.getFtpServerPort()));
		return ftpClient.isConnected() && ftpClient.login(ftpConfig.getFtpServerUser(), ftpConfig.getFtpServerPwd());
	}

	/**
	 * 分页查询
	 * 
	 * @param po
	 * @param page
	 * @param row
	 * @return
	 */
	public Page<HelpDocToFtp> selectPageList(HelpDocToFtp po, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<HelpDocToFtp> pageList = (Page<HelpDocToFtp>) this.mapper.selectList(po);
		return pageList;
	}

	// 更新上传
	public boolean updateSysHelp(MultipartFile file, HelpDocToFtp po) throws IOException {
		boolean flag = false;
		String path = po.getTextRoad();
		if (file == null) {
			mapper.updateHelpDocInfo(po);
		}
		String uploadFileName = po.getId() + "-" + file.getOriginalFilename();
		FTPClient ftpClient = new FTPClient();
		InputStream inputStream = null;
		try {
			if (!isConnectFtp(ftpClient)) {
				return false;
			}

			if (!ftpClient.changeWorkingDirectory(path)) {
				ftpClient.makeDirectory(path);
			}
			ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);// 使用二进制流上传文件
			inputStream = file.getInputStream();
			// 删除源文件
			flag = ftpClient.deleteFile(new String((po.getId() + "-" + po.getHelpFileName()).getBytes("GBK"), "iso-8859-1"));
			// 插入新的文件
			flag = ftpClient.storeFile(new String(uploadFileName.getBytes("GBK"), "iso-8859-1"), inputStream); // 上传完之后，删除upload下面的文件
			// targetFile.delete();

			po.setHelpFileName(file.getOriginalFilename());
			// 数据入库操作
			mapper.updateHelpDocInfo(po);
		} catch (NumberFormatException | IOException e) {
			e.printStackTrace();
			return false;
		} finally {
			if (inputStream != null) {
				inputStream.close();
			}
		}
		return flag;
	}

	/**
	 * 删除操作，
	 * 
	 * @param file
	 * @param id
	 * @return
	 */
	public boolean deletesyshelpbyId(String id) throws IOException {
		boolean flag = false;
		HelpDocToFtp helpDocToFtp = mapper.selectSysHelpById(id);
		String path = helpDocToFtp.getTextRoad();
		String uploadFileName = id + "-" + helpDocToFtp.getHelpFileName();
		FTPClient ftpClient = new FTPClient();
		if (!isConnectFtp(ftpClient)) {
			return false;
		}
		if (!ftpClient.changeWorkingDirectory(path)) {
			return false;
		}
		ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);// 使用二进制流上传文件
		FTPFile[] listFiles = ftpClient.listFiles(uploadFileName);
		if (listFiles == null) {
			return false;
		}
		// 删除源文件
		flag = ftpClient.deleteFile(new String(uploadFileName.getBytes("GBK"), "iso-8859-1"));

		// 数据入库操作
		mapper.deletesyshelpbyId(id);

		return flag;
	}

	public boolean downLoadsyshelpbyId(MultipartFile file, String id, HttpServletRequest request, HttpServletResponse response) throws IOException {
		HelpDocToFtp helpDocToFtp = mapper.selectSysHelpById(id);
		String path = helpDocToFtp.getTextRoad();
		String uploadFileName = id + "-" + helpDocToFtp.getHelpFileName();
		FtpClientUtil.ftpDownFile(ftpConfig.getFtpServerId(), Integer.parseInt(ftpConfig.getFtpServerPort()), ftpConfig.getFtpServerUser(),
				ftpConfig.getFtpServerPwd(), path + uploadFileName, uploadFileName, request, response);
		return true;
	}

	public HelpDocToFtp selectSysHelpById(String id) {
		HelpDocToFtp po = mapper.selectSysHelpById(id);
		return po;
	}

}
