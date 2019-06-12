package com.bonc.common.utils;

import java.util.List;

import com.github.pagehelper.Page;

public class PageJqGrid<T> {
	
	public PageJqGrid(Page<T> pageList){
		this.setPage(pageList.getPageNum());
		this.setPageSize(pageList.getPageSize());
		this.setRecords(pageList.getTotal());
		this.setTotal(pageList.getPages());
		this.setRows(pageList);
	}
	
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
	
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public long getRecords() {
		return records;
	}
	public void setRecords(long records) {
		this.records = records;
	}
	public List<T> getRows() {
		return rows;
	}
	public void setRows(List<T> rows) {
		this.rows = rows;
	}
}
