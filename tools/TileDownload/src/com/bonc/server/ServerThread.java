package com.bonc.server;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Vector;
 
public class ServerThread extends Thread {
	
	private   List<Client> clientList =  new ArrayList<>();
	private final  int point = 8376;
	private ServerSocket server =null;
	private Vector<Job> jobList = new Vector<>(); //任务列表
	 
   
  public ServerThread() throws IOException {
	  server = new ServerSocket(this.point);
	  
  }
   
   @Override
	public void run() {
		// TODO Auto-generated method stub
	    new Thread() {
	    	@Override
	    	public void run() {
	    		// TODO Auto-generated method stub
	    		 while(true) {
	    			sendJob();
	    			 try{
	    					Thread.sleep(10000);
	    				}catch(Exception e){
	    					e.printStackTrace();
	    				}
	    		 }
	    	}
	    }.start();
	   
		 while(true) {
			 try {
				  
			  Socket s =    this.server.accept();
			  String ip = s.getInetAddress().getHostAddress();
			  BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));
			  String msg = br.readLine();
			  if(msg!=null&&msg.startsWith("init")) {
				  int port = Integer.parseInt(msg.split("#")[1]);
				  Client client = new Client(ip,port);
				  clientList.add(client);
				  System.out.println("客户端:"+client.getName()+"已连接到服务器,当前客户端个数:"+clientList.size());
			  }else if(msg!=null&&msg.startsWith("end")) {
				  int port = Integer.parseInt(msg.split("#")[1]);
				  
				  for(Client client:clientList) {
					  if(client.is(ip,port)) {
						  client.completeJob();
					  }
				  }
			  }
			 
			 
			 
			 }catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		 }
		 
	}
   
   public void clearJob() {
	   
	   jobList = new Vector<>();
   }
   
    
   public void setJob(int z,int sx,int ex ,int sy ,int ey,String type) {
	   
	   
	   int cnum = (ex-sx+1)*(ey-sy+1)/2000+1;//1个任务下载2000个瓦片
	   int tmpx = (ex-sx+1)/cnum+1;
	   long jobCount = 0;
		for(int i =0 ;i<cnum;i++ ) {
			int tsx = sx+tmpx*i;
			int tex = tsx+tmpx;
			if(tex>ex+1) {
				tex = ex+1;
			}
			if(tsx>ex+1||tsx>=tex) {
				break;
			}
			String job = z+","+tsx+","+tex+","+sy+","+ey+","+type;
			 this.jobList.add(new Job(String.valueOf(z),job));
			 jobCount++; 
		}
		DownloadState.addDownload(new Download(z, jobCount));
   }
   
   private void sendJob() {
	   int n = jobList.size();
	  
		 for(int i =0;i<n;i++) {
			 Job job = jobList.get(i);
			 if(job.getState()==2) {//已经完成的任务，删了
				 
				 jobList.remove(i);
				 i--;
				 n--;
				 continue;
			 }else if(job.getState()==1 && (new Date().getTime()-job.getSendTime().getTime())>120*60*1000) { //120分钟还没完成的任务
				 job.setState(0);
				 System.err.println(job.getJobClient().getName()+"超过120分钟未完成任务，强制掉线，剩余客户端数量"+(clientList.size()-1));
				 clientList.remove(job.getJobClient());
				 job.setJobClient(null);
			 }else if(job.getState()==0) {
				 Client client =null;
				int j= clientList.size();
				while(j>0) {
					j--;
					client = clientList.get(j);
					if(!client.isBusy()) {
						if(client.sendJob(job)) {//可以成功发送任务
							break;
						}else {
							System.err.println(client.getName()+"掉线，剩余客户端数量"+(clientList.size()-1));
							clientList.remove(j);//无法正常发送任务，删除客户端
							j--;
						}
					}
				}
			 }
		 }
		  
   }
}