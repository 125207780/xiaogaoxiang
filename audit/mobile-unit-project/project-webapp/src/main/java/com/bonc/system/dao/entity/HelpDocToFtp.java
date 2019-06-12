package com.bonc.system.dao.entity;

import java.io.Serializable;

public class HelpDocToFtp implements Serializable {
	private static final long serialVersionUID = -1626279724469471193L;
	private String id;
	private String helpName;
	private String helpCont;
	private String timeId;
	private String textRoad;
	private String helpFindKey;
	private String state;
	private String helpFileName;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getHelpName() {
		return helpName;
	}

	public void setHelpName(String helpName) {
		this.helpName = helpName;
	}

	public String getHelpCont() {
		return helpCont;
	}

	public void setHelpCont(String helpCont) {
		this.helpCont = helpCont;
	}

	public String getTimeId() {
		return timeId;
	}

	public void setTimeId(String timeId) {
		this.timeId = timeId;
	}

	public String getTextRoad() {
		return textRoad;
	}

	public void setTextRoad(String textRoad) {
		this.textRoad = textRoad;
	}

	public String getHelpFindKey() {
		return helpFindKey;
	}

	public void setHelpFindKey(String helpFindKey) {
		this.helpFindKey = helpFindKey;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getHelpFileName() {
		return helpFileName;
	}

	public void setHelpFileName(String helpFileName) {
		this.helpFileName = helpFileName;
	}

	public HelpDocToFtp() {
		super();
		// TODO Auto-generated constructor stub
	}

}
