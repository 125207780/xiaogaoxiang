package com.bonc.server;

public class Download {
   private int z ;
   private long total;
   private long now ; 
   
   public Download(int z,long total){
	   this.z = z;
	   this.total = total;
   }
   public synchronized void add(){
	   this.now++;
   }
   
   public int getZ(){
	   return this.z;
   }
   
   public String progress(){
	  return (float)(Math.round(now/(float)total *10000))/100+"%";
   }
   
   public int getState(){
	   return 1- (int)(now/total);
   }
}
