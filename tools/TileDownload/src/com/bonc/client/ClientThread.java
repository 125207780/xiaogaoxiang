package com.bonc.client;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;


public class ClientThread extends Thread{

	 
	protected String localPath = null;//文件保存路径
	protected int threadSize = 10;
	protected   DownloadThread[] threads=null;
	private String serverIp = "";
	private int serverPort = 8376;
	protected  int jobNum = 0;
	private int clientPort = 0;
	private ServerSocket clientServer =null;
    
	public ClientThread() {
		 initDownloadThread();
	}
	
	public ClientThread(String path,String serverIp) throws UnknownHostException, IOException {
		this();
		this.serverIp =serverIp;
		this.localPath=path.replace("\\", "/");
		while(true) {
			this.clientPort =(int) Math.ceil(Math.random()*9000+1000);
			try {
				clientServer = new ServerSocket(this.clientPort);
			
			break;
			}catch (Exception e) {
				// TODO: handle exception
			}
		}
		this.sendMsg("init#"+this.clientPort);
		
	}
	
	protected void initDownloadThread() {
		
		threads = new DownloadThread[threadSize];
		for(int i=0 ;  i<threadSize;i++){
			threads[i]=new DownloadThread(this);
			threads[i].start();
		}
	}
	
	public void setLocalPath(String path) {
		this.localPath=path.replace("\\", "/");
	}
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		while(true) {
			try {
				Socket server = this.clientServer.accept() ;
			 BufferedReader br = new BufferedReader(new InputStreamReader(server.getInputStream()));
			 String msg = br.readLine();
		    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		    if(msg!=null ) {
		    	
		    	 BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(server.getOutputStream()));
				   bw.write("accept"+"\n");
				   bw.flush();
		    	String tile[] = msg.trim().split(",");
				int z = Integer.parseInt(tile[0]);
				 
				int sx = Integer.parseInt(tile[1]);
				int ex = Integer.parseInt(tile[2]);
				int sy = Integer.parseInt(tile[3]);
				int ey = Integer.parseInt(tile[4]);
				String type=tile[5];
				System.out.println(df.format(System.currentTimeMillis())+ "客户端获取批量任务:z"+z+",sx:"+sx+",ex:"+ex+",sy:"+sy+",ey:"+ey);
				//没目录的话先创建目录
				for(int x=sx;x<=ex;x++){
					File file = new File(this.localPath+"/"+z+"/"+x);
					if  (!file .exists()  && !file .isDirectory())      
					{       
//					   System.out.println("创建目录"+file.getPath());
					    file.mkdirs();    
					}
				}
				this.jobNum = 0;
				//主进程是按X分任务的，Client按照Y进行多线程下载
				
				int tmpy = (ey-sy+1)/this.threadSize+1;
				 
				for(int i =0 ;i<this.threadSize;i++ ) {
					int tsy = sy+tmpy*i;
					int tey = tsy+tmpy;
					if(tey>ey+1) {
						tey = ey+1;
					}
					if(tsy>ey+1||tsy>=tey) {
						break;
					}
					
					Map<String,String> tileMap = new HashMap(); 
					tileMap.put("localPath", this.localPath);
					tileMap.put("type", type);
					tileMap.put("z", String.valueOf(z));
					tileMap.put("sx", String.valueOf(sx));
					tileMap.put("ex", String.valueOf(ex));
					tileMap.put("sy", String.valueOf(tsy));
					tileMap.put("ey", String.valueOf(tey));
					threads[i].addTile(tileMap);
					this.jobNum++;
				}
		    }
		    server.close();
		}catch (Exception e) {
			e.printStackTrace();
		}
		}
		 
	}
	
	public synchronized void completeJob() {
		this.jobNum --;
		if(this.jobNum==0) {//所有线程都完成任务，通知服务端当前客户端空闲
			sendMsg("end#"+this.clientPort);
		}
	}
	
	public   void sendMsg(String msg)   {
		Socket client  =null;
		PrintWriter	 pw =null; 
		try {
		  client = new Socket(serverIp,this.serverPort);
			
		 	 pw = new PrintWriter(client.getOutputStream(), true);
		
			pw.println(msg);
			
		}catch (Exception e) {
			e.printStackTrace();
			System.err.println("与服务器连接中断，系统停止");
			System.exit(1);
			// TODO: handle exception
		}finally {
			try{
				pw.close();
				client.close();
			}catch (Exception e) {
				// TODO: handle exception
			}
			
			
		}
		 
	}
	
	public static void main(String[] args) {
 	args = new String[] {"D:\\apache-tomcat-7.0.78-tenant\\webapps\\mapserver\\tiles","192.168.8.66"};
		if(args.length<2) {
			System.err.println("需要输入2个参数 ，参数1：文件保存路径，参数2：服务端IP");
		 	System.exit(1);
		}
		String path=args[0];
		String ip = args[1];
		try {
			ClientThread c = new ClientThread(path,ip);
			c.start();
			System.out.println("客户端启动成功");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.err.println("启动失败，可能是无法连接服务端");
			e.printStackTrace();
		} 
	} 
	
	
}
