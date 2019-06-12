package com.bonc.system.service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.system.dao.entity.SysAttachment;
import com.bonc.system.dao.mapper.SysAttachmentMapper;

@Service
public class SysAttachmentService {
	@Resource
	private SysAttachmentMapper attchmentMapper;
//	@Resource
//	private FtpConfig ftpConfig;

//	@Transactional(propagation = Propagation.REQUIRED)
//	public void fileDown(String attchId, HttpServletRequest request, HttpServletResponse response) throws IOException {
//		try{
//			String server_id = ftpConfig.getFtpServerId();
//			String server_port = ftpConfig.getFtpServerPort();
//			String server_user = ftpConfig.getFtpServerUser();
//			String server_pwd = ftpConfig.getFtpServerPwd();
//			SysAttachment entity = new SysAttachment();
//			List<SysAttachment> list = attchmentMapper.selectAttachById(attchId);//查询附件信息
//			if(list != null && list.size() > 0){
//				entity = list.get(0);//得到附件实体
//				//FtpClientUtil.fileDown(entity.getFilePath(), entity.getRealName(), request, response);
//				FtpClientUtil.ftpDownFile(server_id, Integer.parseInt(server_port), server_user, server_pwd, entity.getFilePath(), entity.getRealName(), request, response);
//			}
//		}catch(Exception e){
//			e.printStackTrace();
//			throw e;
//		}
//	}

//	@Transactional(propagation = Propagation.REQUIRED)
//	public String uploadFile(String tableId, String talbeName, String fileName, InputStream inputStream, SysUser user) throws Exception {
//		try{
//			String server_id = ftpConfig.getFtpServerId();
//			String server_port = ftpConfig.getFtpServerPort();
//			String server_user = ftpConfig.getFtpServerUser();
//			String server_pwd = ftpConfig.getFtpServerPwd();
//			String server_address = ftpConfig.getFtpServerAddress();
//			//得到要存库的数据
//			String attchId = UUIDUtil.createUUID();//附件ID
//			String realName = fileName.substring(0, fileName.lastIndexOf("."));//文件名称
//			String fileType = fileName.substring(fileName.lastIndexOf(".") + 1);//文件类型
//			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//			String createTime = sf.format(new Date());//创建日期
//			String res[] = getServerPathName(server_address, realName);//服务器存放文件地址和名称
//			//插入数据
//			SysAttachment entity = new SysAttachment();
//			entity.setId(attchId);
//			entity.setFilePath(res[1]+"/"+res[0]+"."+fileType);
//			entity.setFileType(fileType);
//			entity.setRealName(realName);
//			entity.setCreateTime(createTime);
//			entity.setCreateUser(user.getUserId());
//			entity.setCreateDepart(user.getOrgId());
//			entity.setTableId(tableId);
//			entity.setTableName(talbeName);
//			attchmentMapper.insertAttach(entity);
//			//文件上传
//			FtpClientUtil fcu = new FtpClientUtil(server_id, Integer.parseInt(server_port), server_user, server_pwd);
//			fcu.uploadFile(res[0]+"."+fileType, inputStream, res[1]);
//			return attchId;
//		}catch(Exception e){
//			e.printStackTrace();
//			throw e;
//		}
//	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	public void deleteFile(String attchId) {
		SysAttachment entity = new SysAttachment();
		List<SysAttachment> list = attchmentMapper.selectAttachById(attchId);//得到附件信息
		if(list != null && list.size() > 0){
			//得到附件实体
			entity = list.get(0);
			//删除服务器路径下的文件
			File myFile = new File(entity.getFilePath());
			if(myFile.exists()){
				myFile.delete();
			}
			//删除数据库中文件信息
			attchmentMapper.deleteAttach(attchId);
		}
		
	}
	
	public String[] getServerPathName(String server_address, String realName){
		SimpleDateFormat sdformat = new SimpleDateFormat("yyyyMM");
		String ftpDate = sdformat.format(new Date());
		Date date = new Date();
		long currentTime = date.getTime();
		String[] result = new String[]{realName+"_"+currentTime, server_address+ftpDate};
		return result;
	}
	
	public static String getFileName(String filePath){
		int splitStart = 0;
		if(filePath.lastIndexOf("/") != -1){
			splitStart = filePath.lastIndexOf("/");
		}else if(filePath.lastIndexOf("\\") != -1){
			splitStart = filePath.lastIndexOf("\\");
		}
		if(splitStart != 0){
			splitStart = splitStart + 1;
		}
		int splitEnd = filePath.lastIndexOf(".");
		String fileName = filePath.substring(splitStart, splitEnd);
		return fileName;
	}

//	public String updateFile(String tableId, String talbeName, String fileName, InputStream inputStream) throws Exception {
//		try{
//			String server_id = ftpConfig.getFtpServerId();
//			String server_port = ftpConfig.getFtpServerPort();
//			String server_user = ftpConfig.getFtpServerUser();
//			String server_pwd = ftpConfig.getFtpServerPwd();
//			String server_address = ftpConfig.getFtpServerAddress();
//			//得到要存库的数据
//			String attchId = UUIDUtil.createUUID();//附件ID
//			String realName = fileName.substring(0, fileName.lastIndexOf("."));//文件名称
//			String fileType = fileName.substring(fileName.lastIndexOf(".") + 1);//文件类型
//			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//			String createTime = sf.format(new Date());//创建日期
//			String res[] = getServerPathName(server_address, realName);//服务器存放文件地址和名称
//			//插入数据
//			SysAttachment entity = new SysAttachment();
//			entity.setId(attchId);
//			entity.setFilePath(res[1]+"/"+res[0]+"."+fileType);
//			entity.setFileType(fileType);
//			entity.setRealName(realName);
//			entity.setCreateTime(createTime);
//			entity.setTableId(tableId);
//			entity.setTableName(talbeName);
//			attchmentMapper.updateAttach(entity);
//			//文件上传
//			FtpClientUtil fcu = new FtpClientUtil(server_id, Integer.parseInt(server_port), server_user, server_pwd);
//			fcu.uploadFile(res[0]+"."+fileType, inputStream, res[1]);
//			return attchId;
//		}catch(Exception e){
//			e.printStackTrace();
//			throw e;
//		}
//	}
	
}