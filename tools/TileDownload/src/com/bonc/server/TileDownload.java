package com.bonc.server;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bonc.client.ClientThread;

/**
 * Servlet implementation class TileDownload
 */
@WebServlet(loadOnStartup=1,urlPatterns="/TileDownload" )
public class TileDownload extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private ServerThread server ;
    private ClientThread client ;
	 
	
	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		super.init();
		System.out.println("系统启动.....");
		try {
			server = new ServerThread();
			server.start();
		 client = new ClientThread("D:/AAA", "127.0.0.1");
		 client.start();
			 
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.err.println("服务启动异常，系统关闭");
			e.printStackTrace();
			System.exit(1);
		}
		
	}
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TileDownload() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println(request);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
 
		String basePath = request.getParameter("basePath");
		basePath =basePath.replace("\\", "/");
		String[] tiles = request.getParameter("tiles").split("#");  // size ,z,sx,ex,sy,ey;
		String type =request.getParameter("type");
		if(type==null){ 
			type="png";
		}
		DownloadState.clearStates();
		server.clearJob();
		client.setLocalPath(basePath);
		for(String tile:tiles){
			String[]  t =  tile.split(",");
			int z =Integer.valueOf(t[1]);
			int sx = Integer.parseInt(t[2]);
			int ex = Integer.parseInt(t[3]);
			int sy = Integer.parseInt(t[4]);
			int ey = Integer.parseInt(t[5]);
			Download d = new Download(z,(ex-sx+1)*(ey-sy+1));
			System.out.println("---------服务端发布下载任务-------z:"+z+";sx:"+sx+";ex:"+ex+";sy:"+sy+";ey:"+ey);
			 
			this.server.setJob(z, sx, ex, sy, ey, type);
		}
	}
}
