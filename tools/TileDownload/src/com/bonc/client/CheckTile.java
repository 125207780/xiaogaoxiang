package com.bonc.client;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;


public class CheckTile extends ClientThread {
	 private int z =0;
	
     public CheckTile(String path ,int z ) {
    	super();
        System.out.println("核查程序开始运行");
    	this.localPath=path;
    	this.z= z;
    	this.threadSize=20;
    	 
     }
	 
     @Override
     public synchronized void completeJob() {
    	 this.jobNum --;
    	 System.out.println("当前任务数："+this.jobNum);
 		if(this.jobNum==0) {//所有线程都完成任务退出
 			 System.exit(0);
 		}
     }

    private Integer[] getFileList(String filePath) { //获取当前目录下文件名，文件名必须都是数字，别乱放其他的文件
    	List<Integer> fileList = new ArrayList<>();
    	File file = new File(filePath);
    	//获取子目录下的文件名
    	
    	String [] fileNames= file.list();
    	 String regEx = "\\d+";
    	 Pattern pattern = Pattern.compile(regEx);
    	 Matcher matcher = null;
    	for(String name :fileNames) {
    		 matcher = pattern.matcher(name);
    		 if(matcher.find()) {
    			 fileList.add(new Integer(matcher.group()));
    		 }
    	}
    	Integer[] list = new Integer[fileList.size()]; 
    
    	fileList.toArray(list);
    	Arrays.sort(list);
    	return list;
    }
    
    private List<Map<String,Integer>> checkX(Integer[] xlist){
    	List<Map<String,Integer>> result = new ArrayList();
    	Integer min = xlist[0];
    	Integer max = xlist[xlist.length-1];
    	if(max-min+1 !=xlist.length) {
    		for(int i=min,j=0;i<max;i++) {
    			if(i!=xlist[j]) {
    				Map<String,Integer> lost= new HashMap();
    				lost.put("sx", i);
    				lost.put("ex", i);
    				result.add(lost);
    			}else {
    				j++;
    			}
    		}
    		
    	}
    	
    	return result;
    }
    
    private Map<String,Integer> checkY(Integer[] ylist){
    	Map<String,Integer> result = new HashMap<>();
    	Integer min = ylist[0];
    	Integer max = ylist[ylist.length-1];
    	Integer sy =0;
    	Integer ey = 0;
    	if(max-min+1 !=ylist.length) {
    		for(int i =0;i<=ylist.length;i++) {
    			if(min+i!=ylist[i]) {
    				sy = min+i;
    				break;
    			}
    		}
    		
    		for (int i =ylist.length -1 ;i>=0;i--) {
    			if(max-i!=ylist[i]) {
    				ey=max-i;
    			}
    		}
    		result.put("sy", sy);
    		result.put("ey", ey);
    		
    	}
    	
    	
    	return result;
    }
    private void deleteError(String Xpath,Integer[] ylist) {
    	for(int i=0;i<ylist.length;i++) {
    		File file = new File(Xpath+"/"+ylist[i]+".png");
    		try {
				BufferedImage image=ImageIO.read(file);
				if(image==null) {
					System.out.println("文件错误删除："+file.getPath());
					file.delete();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				System.out.println("文件错误删除："+file.getPath());
				file.delete();
			}
    	}
    }
    
    
    public void doCheck() {
    	List<Map<String,Integer>> ylostList = new ArrayList<>();
    	Integer[] xlist = getFileList(this.localPath+"/"+this.z);
//    	System.out.println("核查X缺失");
    	List<Map<String,Integer>> xlostList  = this.checkX(xlist);
    	System.out.println("核查X缺失结束：缺失目录数："+xlostList.size());
    	int miny=0,maxy=0;
    	for(Integer x:xlist) {
//    		System.out.println("核查"+x+"目录下Y缺失");
    		Integer[] ylist = getFileList(this.localPath+"/"+this.z+"/"+x);
    		
    		if(ylist.length>0) {
    			//找到最大和最小的y。X缺失
    			if(miny==0) {
        			miny =ylist[0];
        		}else if(miny>ylist[0]) {
        			miny = ylist[0];
        		}
    			
    			if(maxy<ylist[ylist.length-1]) {
    				maxy = ylist[ylist.length-1];
    			}
    			
//    			this.deleteError(this.localPath+"/"+this.z+"/"+x,ylist);
    			//检查Y是否缺失
    			Map<String,Integer> checkYResult = this.checkY(ylist);
    			if(!checkYResult.isEmpty()) {
    				
    				checkYResult.put("sx", x);
    				checkYResult.put("ex", x);
    				ylostList.add(checkYResult);
    				System.out.println("核查"+x+"目录下Y缺失结束，缺失瓦片");
    			}
    		}else {
    			Map<String,Integer> lost= new HashMap();
				lost.put("sx", x);
				lost.put("ex", x);
				xlostList.add(lost);
    		}
    		
    	}
    	for(Map<String,Integer> xlost : xlostList) {
    		xlost.put("sy", miny);
    		xlost.put("ey", maxy);
    		File file = new File(this.localPath+"/"+z+"/"+xlost.get("sx"));
			if  (!file .exists()  && !file .isDirectory())      
			{       
//			   System.out.println("创建目录"+file.getPath());
			    file.mkdirs();    
			}
    	}
    	
    	ylostList.addAll(xlostList);
    	
    	for(Map<String,Integer> lost:ylostList) {
    		int sx = lost.get("sx");
    		int ex = lost.get("ex");
    		int sy =  lost.get("sy");
    		int ey =  lost.get("ey");
    		int tmpy = (ey-sy+1)/this.threadSize+1;
    		for(int i =0 ;i<this.threadSize;i++ ) {
    			int tsy =  sy+tmpy*i;
    			int tey = tsy+tmpy;
    			if(tey> ey+1) {
    				tey =  ey+1;
    			}
    			if(tsy> ey+1||tsy>=tey) {
    				break;
    			}
    			
    			Map<String,String> tileMap = new HashMap(); 
				tileMap.put("localPath", this.localPath);
				tileMap.put("type", "png");
				tileMap.put("z", String.valueOf(z));
				tileMap.put("sx", String.valueOf(sx));
				tileMap.put("ex", String.valueOf(ex));
				tileMap.put("sy", String.valueOf(tsy));
				tileMap.put("ey", String.valueOf(tey));
				this.threads[this.jobNum%this.threadSize].addTile(tileMap);
				this.jobNum++;
    		  
    		}
    	}
    	if(ylostList.size()==0) {
    		System.out.println("没有缺失");
    		System.exit(0);
    	}
    	
    	
    }
    
    
    
    
    public static void main(String[] args) {
    	args = new String[] {"d:/ningxia","18"};
		if(args.length<2) {
			System.err.println("需要输入2个参数 ，参数1：文件保存路径，参数2：第几层");
		 	System.exit(1);
		}
		String path=args[0];
		int z = Integer.parseInt(args[1]);
		
		CheckTile check = new CheckTile(path,z);
		check.doCheck();
	}
}
