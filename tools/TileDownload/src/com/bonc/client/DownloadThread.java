package com.bonc.client;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Map;
import java.util.Vector;


public class DownloadThread extends Thread {
	 
	
	private Vector<Map<String,String>> tileVector = new Vector();
	private ClientThread client = null;
	/** 常规 **/ 
//	private static final String[] baiduServers = {"http://online0.map.bdimg.com/tile/?qt=tile&styles=pl",
//		"http://online1.map.bdimg.com/tile/?qt=tile&styles=pl",
//		"http://online2.map.bdimg.com/tile/?qt=tile&styles=pl",
//		"http://online3.map.bdimg.com/tile/?qt=tile&styles=pl",
//		"http://online4.map.bdimg.com/tile/?qt=tile&styles=pl"};
	
	/** 定制 **/
	private static final String[] 	baiduServers = {
			
			"http://api1.map.bdimg.com/customimage/tile?",
			"http://api2.map.bdimg.com/customimage/tile?",
			"http://api3.map.bdimg.com/customimage/tile?"
	};
	
	
	public DownloadThread(ClientThread client){
		this.client=client;
		 
	}
	 
	@Override
	public void run() {
		// TODO Auto-generated method stub
		super.run();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		while(true){
		if(tileVector.size()==0){
//			System.out.println("等待下载任务");
			try{
				Thread.sleep(10000);
			}catch(Exception e){
				e.printStackTrace();
			}
		}else{
			Map<String,String> tile = tileVector.remove(0);
			int z = Integer.parseInt(tile.get("z"));
			int sx = Integer.parseInt(tile.get("sx"));
			int ex = Integer.parseInt(tile.get("ex"));
			int sy = Integer.parseInt(tile.get("sy"));
			int ey = Integer.parseInt(tile.get("ey"));
			String localPath =tile.get("localPath");
			String type = tile.get("type");
			int u =  baiduServers.length;
			System.out.println(df.format(System.currentTimeMillis())+ "线程"+this.getId()+"开始下载#z:"+z+";sx:"+sx+";ex:"+ex+";sy:"+sy+";ey:"+ey);
			for(int x =  sx;x<=ex;x++){
				for (int y=sy;y<ey;y++)
				{
					 
					
				  boolean flag=	downloadFile(z,x,y,localPath,type,baiduServers[(x+y)%u]);
				  if(!flag){
					  for(int i=0;i<u;i++){
						  flag = downloadFile(z,x,y,localPath,type,baiduServers[i]);
						  if(flag){
							  break;
						  }
					  }
					  if(!flag){
						  System.err.println(df.format(System.currentTimeMillis())+"图片下载失败"+baiduServers[0]+"&z="+z+"&x="+x+"&y="+y);
						   
					  }
				  }
			}
			 
		}
			System.out.println(df.format(System.currentTimeMillis())+ "线程"+this.getId()+"完成下载#z:"+z+";sx:"+sx+";ex:"+ex+";sy:"+sy+";ey:"+ey);
			this.client.completeJob();//通知客户端当前下载线程完成任务
		}
		}
	}
	
	private boolean downloadFile(int z,int x,int y,String localPath,String type,String server){
		String style =""; // "&udt=20150629&scale=1&styles=t%3Aland%7Ce%3Ag%7Cc%3A%231f3451%2Ct%3Awater%7Ce%3Aall%7Cc%3A%2396b5d6%2Ct%3Agreen%7Ce%3Aall%7Cc%3A%23b0d3dd%2Ct%3Ahighway%7Ce%3Ag.f%7Cc%3A%231f3451%2Ct%3Ahighway%7Ce%3Ag.s%7Cc%3A%231f3451%2Ct%3Aarterial%7Ce%3Ag.f%7Cc%3A%231f3451%2Ct%3Aarterial%7Ce%3Ag.s%7Cc%3A%237dabb3%2Ct%3Alocal%7Ce%3Al.t.f%7Cc%3A%237a959a%2Ct%3Alocal%7Ce%3Al.t.s%7Cc%3A%23d6e4e5%2Ct%3Aarterial%7Ce%3Al.t.f%7Cc%3A%23374a46%2Ct%3Ahighway%7Ce%3Al.t.f%7Cc%3A%23374a46%2Ct%3Ahighway%7Ce%3Al.t.s%7Cc%3A%23e9eeed";
		 try{
			 /**常规 *
			 URL url   = new URL(server+"&z="+z+"&x="+x+"&y="+y);*/ 
			 /** 定制 **/
			 
			 File f  = new File(localPath+"/"+z+"/"+x+"/"+y+"."+type) ; 
			 if(!f.exists()) { //文件不存在就下载，存在就不重新下载了
			 URL url   = new URL(server+"&z="+z+"&x="+x+"&y="+y+style);
			 HttpURLConnection  huc = (HttpURLConnection)url.openConnection(); 
			 huc.setConnectTimeout(10000); 
			 huc.setReadTimeout(10000); 
			 huc.setRequestMethod("GET"); 
			 InputStream   in = url.openStream(); 
			 byte[] buffer = new byte[4096]; 
			   int bytes_read; 
			   
			    f.createNewFile();
			    FileOutputStream   fos  = new FileOutputStream(f); 
			 while ((bytes_read = in.read(buffer)) != -1) 
			   { 
				 fos.write(buffer,0,bytes_read); 
			   }
			 fos.flush();
			  fos.close();
			  in.close();
			 
			 }
//			 System.out.println("成功保存图片"+tile.getLocalPath());
//			 this.client.sendMsg(String.valueOf(z));
			 
			 return true;
		 }catch(Exception e){
//			  e.printStackTrace();
			 return false;
		 }
	}
	
	public void addTile(Map<String,String> t){
		this.tileVector.add(t);
	}
	 
  }
