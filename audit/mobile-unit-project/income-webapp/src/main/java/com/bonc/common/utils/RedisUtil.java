 package com.bonc.common.utils;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class RedisUtil {
	private  static JedisPool pool = null;  
	private   String host;
	private  int port;
	private  int timeout;
	private  String password;
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public int getPort() {
		return port;
	}
	public void setPort(int port) {
		this.port = port;
	}
	public int getTimeout() {
		return timeout;
	}
	public void setTimeout(int timeout) {
		this.timeout = timeout;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
    /** 
     * 获取jedis连接池 
     * */  
	public JedisPool getPool()  
    {  
        if(pool == null)  
        {  
            //创建jedis连接池配置  
            JedisPoolConfig config = new JedisPoolConfig();
            
           
            //最大连接数  
            config.setMaxTotal(100);  
            //最大空闲连接  
            config.setMaxIdle(5);  
            //创建redis连接池  
            if("".equals(password)) {
            	 pool = new JedisPool(config,host ,port,1000);  
            }else {
            	 pool = new JedisPool(config,host ,port,1000,password);  
            }
           
        }  
        return pool;  
    }  
      
    /** 
     * 获取jedis连接 
     * */  
    public Jedis getConn()  
    {  
        return getPool().getResource();  
    }  
    
    public String get(String key) {
    	String value = "";
    	try {
    		Jedis con = getConn();
        	
        	if(con.exists(key)) {
        		  value = con.get(key);
        	}
        	con.close();
    	}catch (Exception e) {
			// TODO: handle exception
		}
    	
    	return value;
    }
    
    public String set(String key, String value, int cacheSeconds) {
		String result = null;
		Jedis jedis = null;
		try {
			jedis = getConn();
			result = jedis.set(key, value);
			if (cacheSeconds != 0) {
				jedis.expire(key, cacheSeconds);
			}

		} catch (Exception e) {
		} finally {
			 jedis.close();;
		}
		return result;
	}
}
