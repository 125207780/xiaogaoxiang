package com.bonc.common.bean;

import java.io.Serializable;

public class IncomeUser implements Serializable {
	private String userId;
	private String place;

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

}
