package com.bonc.server;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Date;

public class Client {
	private String ip ="";
	private int port =0;
	private boolean isBusy = false;
	private Job job;
	private String name = "";
	public Client(String ip,int port) {
		this.ip=ip;
		this.port =port;
		this.name = this.ip+":"+this.port;
	}
	
	public boolean isBusy () {
		return isBusy;
	}
	
	public String getName() {
		return this.name;
	}
	
	public boolean is(String ip,int port) {
		if(this.ip.equals(ip)&&this.port==port) {
			return true;
		}else {
			return false;
		}
	}
	public Job getJob() {
		return this.job;
	}
	
	public void completeJob() {
		this.job.setState(2);
		DownloadState.getDownload(this.job.getZ()).add();
		
		this.job=null;
		this.isBusy=false;
		
	}
	
	public boolean sendJob(Job job) {
		this.job=job;
		Socket client  =null;
		PrintWriter	 pw =null; 
		try {
		  client = new Socket(this.ip,this.port);
			
		 	 pw = new PrintWriter(client.getOutputStream(), true);
		
			pw.println(job.getJobMsg());
			 BufferedReader br = new BufferedReader(new InputStreamReader(client.getInputStream()));
			 String msg = br.readLine();
			if(msg!=null&&msg.trim().equals("accept")) {
				job.setState(1);
				job.setJobClient(this);
				job.setSendTime(new Date());
				this.isBusy=true;
				return true;
			}else {
				return false;
			}
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}finally {
			try {
				pw.close();
				client.close();
			} catch (Exception e2) {
				// TODO: handle exception
			}
		}
	}
}
