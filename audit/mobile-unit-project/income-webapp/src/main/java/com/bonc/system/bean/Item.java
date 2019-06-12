/**
 * 
 */
package com.bonc.system.bean;

/**
 * @author songhao
 *
 */
public class Item {
	
    public static final String NODE_FOLDER = "folder";
    
    public static final String NODE_ITEM = "item";

	/** 
     * node name
     */
	private String text;
	
	/** 
     * node type:'folder' or 'item'
     */ 
	private String type;
	
	/** 
     * node parameters info and subnode info
     */
	private AdditionalParameters additionalParameters;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public AdditionalParameters getAdditionalParameters() {
		return additionalParameters;
	}

	public void setAdditionalParameters(AdditionalParameters additionalParameters) {
		this.additionalParameters = additionalParameters;
	}
}
