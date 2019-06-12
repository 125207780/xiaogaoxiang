package com.bonc.export.bean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ExportConf implements Serializable {
	private static final long serialVersionUID = 1L;
	private List<String> titles = new ArrayList<String>();
	private List<String> names = new ArrayList<String>();
	private List<Integer> widths = new ArrayList<Integer>();

	public ExportConf(List<String> titles, List<String> names, List<Integer> widths) {
		super();
		this.titles = titles;
		this.names = names;
		this.widths = widths;
	}

	public List<String> getTitles() {
		return titles;
	}

	public void setTitles(List<String> titles) {
		this.titles = titles;
	}

	public List<String> getNames() {
		return names;
	}

	public void setNames(List<String> names) {
		this.names = names;
	}

	public List<Integer> getWidths() {
		return widths;
	}

	public void setWidths(List<Integer> widths) {
		this.widths = widths;
	}
}
