package com.bonc.server;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class DownloadState
 */
@WebServlet("/DownloadState")
public class DownloadState extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	private static LinkedHashMap<String,Download> states = new LinkedHashMap<String,Download>();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DownloadState() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		PrintWriter out = response.getWriter();
		StringBuffer bf= new StringBuffer();
		int state =0;
		for(Download d : states.values()){
			bf.append(d.getZ()).append(","+d.progress()+"#");
			state+=d.getState();
		}
		if( states.values().size()==0){
			state =1;
		}
		bf.append(state);
		out.print(bf.toString());
		
	}

		
	public static void clearStates(){
		states.clear();
	}
	
	public static void addDownload(Download d){
		states.put(String.valueOf(d.getZ()), d);
	}
	
	public static Download getDownload(String z){
		return states.get(z);
	}
	
	
	
}
