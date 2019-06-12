package com.bonc.common.page;

import java.util.List;

import com.github.pagehelper.PageInfo;

/**
 * 
* @ClassName: Page
* @Description: 分页类
* @author 李博强  liboqiang@bonc.com.cn
* @date 2016年3月21日 下午8:36:35
*
* @param <T>
 */
public class Page<T> {
	
	/**
	 * 
	* <p>Title: </p>
	* <p>Description: 构造函数，传入一个com.github.pagehelper.PageInfo对象</p>
	* @param pageInfo
	 */
	public Page(PageInfo<T> pageInfo){
		try{
			this.setPage(pageInfo.getPageNum());
			this.setPageSize(pageInfo.getPageSize());
			this.setRecords(pageInfo.getTotal());
			this.setTotal(pageInfo.getPages());
			this.setRows(pageInfo.getList());
		}
		catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 无参构造函数
	* 构造函数：Page. 
	*
	 */
	public Page() {}
	
	// 当前页
	private Integer page;
	// 总页数
	private Integer total;
	// 每页显示多少
	private Integer pageSize;
	// 总记录数
	private long records;
	// 记录
	private List<T> rows;
	
	
	/**
	 * @return the page
	 */
	public Integer getPage() {
		return page;
	}
	
	
	/**
	 * @param page the page to set
	 */
	public void setPage(Integer page) {
		this.page = page;
	}
	
	
	/**
	 * @return the total
	 */
	public Integer getTotal() {
		return total;
	}
	
	
	/**
	 * @param total the total to set
	 */
	public void setTotal(Integer total) {
		this.total = total;
	}
	
	
	/**
	 * @return the pageSize
	 */
	public Integer getPageSize() {
		return pageSize;
	}
	
	
	/**
	 * @param pageSize the pageSize to set
	 */
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	
	
	/**
	 * @return the records
	 */
	public long getRecords() {
		return records;
	}
	
	
	/**
	 * @param records the records to set
	 */
	public void setRecords(long records) {
		this.records = records;
	}
	
	
	/**
	 * @return the rows
	 */
	public List<T> getRows() {
		return rows;
	}
	
	
	/**
	 * @param rows the rows to set
	 */
	public void setRows(List<T> rows) {
		this.rows = rows;
	}
}
