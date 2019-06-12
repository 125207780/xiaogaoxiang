/**
 * 
 */
package com.bonc.system.bean;

import java.util.Map;

/**
 * @author songhao
 *
 */
public class AdditionalParameters {

	/**
	 * node id
	 */
	private String id;

	/**
	 * subnode ifno
	 */
	private Map<String, Item> children;

	/**
	 * node chosen
	 */
	// @JsonProperty(value="item-selected")
	// private boolean itemSelected;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Map<String, Item> getChildren() {
		return children;
	}

	public void setChildren(Map<String, Item> children) {
		this.children = children;
	}
}
