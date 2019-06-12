package com.bonc.gridinfo.dao.entity;

/**
 * 网格信息实体类
 * 
 * @author liulin@bonc.com.cn
 *
 */
public class GridInfo {

	private String remarks;// 表名称 表备注
	private String tabname;// 表名
	private String tableCreateTime;// 表创建时间
	private String owner;// 表创建人
	private String maxTime;// 最新数据时间
	private String minTime;// 最早数据时间
	private String gridCode;
	private String gridName;// 网格名称
	private String gridType;// 网格类型
	private String gridScore;// 网格评分
	private String gridManager;// 网格经理
	private int groupNum;// 集团客户数
	private int userNum;// 网格用户数
	private String kdPercent;// 家宽占有率
	private int chnlNum;// 渠道数
	private int kdNum;// 家宽用户
	private double totalFee;// 总收入
	private double totalFeeLast;// 上月收入
	private String compare;// 环比收入
	private double kdFee;// 家宽收入
	private double ywFee;// 移网收入
	private double fee4g;// 4g收入
	private double fee2g3g;// 2/3g收入
	private double xhjtFee;// 新和家庭套餐收入
	private double tvFee;// TV收入
	private double terminalFee;// 终端收入
	private int newUserNum;// 当月新发展用户
	private int outnetNum;// 当月离网用户
	private int kdNewNum;// 当月新发展家宽用户
	private int new4gNum;// 当月新发展4g用户
	private int new2g3gNum;// 当月新发展2g3g用户
	private int newXhjtNum;// 当月新发展新和家庭用户
	private int tvNewNum;// 当月新发展TV用户
	private int terminalNewNum;// 终端发展量
	private String phoneNumber;
	private String branchCompany;
	private String branchSubstation;
	private String creater;
	private String createTime;
	private String voiceNum;// 语音数
	private String voicePortNum;// 语言端口数
	private String voicePer;// 语音占有率
	private String voicePortPer;// 语音端口占有率;
	private String dataNum;// 数据数
	private String dataPortNum;// 数据端口数
	private String dataPer;// 数据占有率
	private String dataPortPer;// 数据端口占有率
	private String createDate;// 创建时间
	private int physicalNum;// 基础单元数
	private double gridArea;// 网格面积
	private String saleDeptName;// 所属营业部
	private int communityNum;// 小区数
	private int villageNum;// 行政村数
	private long endFiberNum;
	private long endFiberUnused;
	private long equiproomFiberNum;
	private long equiproomFiberUnused;

	public long getEndFiberNum() {
		return endFiberNum;
	}

	public void setEndFiberNum(long endFiberNum) {
		this.endFiberNum = endFiberNum;
	}

	public long getEndFiberUnused() {
		return endFiberUnused;
	}

	public void setEndFiberUnused(long endFiberUnused) {
		this.endFiberUnused = endFiberUnused;
	}

	public long getEquiproomFiberNum() {
		return equiproomFiberNum;
	}

	public void setEquiproomFiberNum(long equiproomFiberNum) {
		this.equiproomFiberNum = equiproomFiberNum;
	}

	public long getEquiproomFiberUnused() {
		return equiproomFiberUnused;
	}

	public void setEquiproomFiberUnused(long equiproomFiberUnused) {
		this.equiproomFiberUnused = equiproomFiberUnused;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getTabname() {
		return tabname;
	}

	public void setTabname(String tabname) {
		this.tabname = tabname;
	}

	public String getTableCreateTime() {
		return tableCreateTime;
	}

	public void setTableCreateTime(String tableCreateTime) {
		this.tableCreateTime = tableCreateTime;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getMaxTime() {
		return maxTime;
	}

	public void setMaxTime(String maxTime) {
		this.maxTime = maxTime;
	}

	public String getMinTime() {
		return minTime;
	}

	public void setMinTime(String minTime) {
		this.minTime = minTime;
	}

	public String getGridCode() {
		return gridCode;
	}

	public void setGridCode(String gridCode) {
		this.gridCode = gridCode;
	}

	public String getGridName() {
		return gridName;
	}

	public void setGridName(String gridName) {
		this.gridName = gridName;
	}

	public String getGridType() {
		return gridType;
	}

	public void setGridType(String gridType) {
		this.gridType = gridType;
	}

	public String getGridManager() {
		return gridManager;
	}

	public void setGridManager(String gridManager) {
		this.gridManager = gridManager;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getBranchCompany() {
		return branchCompany;
	}

	public void setBranchCompany(String branchCompany) {
		this.branchCompany = branchCompany;
	}

	public String getBranchSubstation() {
		return branchSubstation;
	}

	public void setBranchSubstation(String branchSubstation) {
		this.branchSubstation = branchSubstation;
	}

	public String getCreater() {
		return creater;
	}

	public void setCreater(String creater) {
		this.creater = creater;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getGridScore() {
		return gridScore;
	}

	public void setGridScore(String gridScore) {
		this.gridScore = gridScore;
	}

	public int getGroupNum() {
		return groupNum;
	}

	public void setGroupNum(int groupNum) {
		this.groupNum = groupNum;
	}

	public int getUserNum() {
		return userNum;
	}

	public void setUserNum(int userNum) {
		this.userNum = userNum;
	}

	public String getKdPercent() {
		return kdPercent;
	}

	public void setKdPercent(String kdPercent) {
		this.kdPercent = kdPercent;
	}

	public int getChnlNum() {
		return chnlNum;
	}

	public void setChnlNum(int chnlNum) {
		this.chnlNum = chnlNum;
	}

	public int getKdNum() {
		return kdNum;
	}

	public void setKdNum(int kdNum) {
		this.kdNum = kdNum;
	}

	public double getTotalFee() {
		return totalFee;
	}

	public void setTotalFee(double totalFee) {
		this.totalFee = totalFee;
	}

	public double getTotalFeeLast() {
		return totalFeeLast;
	}

	public void setTotalFeeLast(double totalFeeLast) {
		this.totalFeeLast = totalFeeLast;
	}

	public String getCompare() {
		return compare;
	}

	public void setCompare(String compare) {
		this.compare = compare;
	}

	public double getKdFee() {
		return kdFee;
	}

	public void setKdFee(double kdFee) {
		this.kdFee = kdFee;
	}

	public double getYwFee() {
		return ywFee;
	}

	public void setYwFee(double ywFee) {
		this.ywFee = ywFee;
	}

	public double getFee4g() {
		return fee4g;
	}

	public void setFee4g(double fee4g) {
		this.fee4g = fee4g;
	}

	public double getFee2g3g() {
		return fee2g3g;
	}

	public void setFee2g3g(double fee2g3g) {
		this.fee2g3g = fee2g3g;
	}

	public double getXhjtFee() {
		return xhjtFee;
	}

	public void setXhjtFee(double xhjtFee) {
		this.xhjtFee = xhjtFee;
	}

	public double getTvFee() {
		return tvFee;
	}

	public void setTvFee(double tvFee) {
		this.tvFee = tvFee;
	}

	public double getTerminalFee() {
		return terminalFee;
	}

	public void setTerminalFee(double terminalFee) {
		this.terminalFee = terminalFee;
	}

	public int getNewUserNum() {
		return newUserNum;
	}

	public void setNewUserNum(int newUserNum) {
		this.newUserNum = newUserNum;
	}

	public int getOutnetNum() {
		return outnetNum;
	}

	public void setOutnetNum(int outnetNum) {
		this.outnetNum = outnetNum;
	}

	public int getKdNewNum() {
		return kdNewNum;
	}

	public void setKdNewNum(int kdNewNum) {
		this.kdNewNum = kdNewNum;
	}

	public int getNew4gNum() {
		return new4gNum;
	}

	public void setNew4gNum(int new4gNum) {
		this.new4gNum = new4gNum;
	}

	public int getNew2g3gNum() {
		return new2g3gNum;
	}

	public void setNew2g3gNum(int new2g3gNum) {
		this.new2g3gNum = new2g3gNum;
	}

	public int getNewXhjtNum() {
		return newXhjtNum;
	}

	public void setNewXhjtNum(int newXhjtNum) {
		this.newXhjtNum = newXhjtNum;
	}

	public int getTvNewNum() {
		return tvNewNum;
	}

	public void setTvNewNum(int tvNewNum) {
		this.tvNewNum = tvNewNum;
	}

	public int getTerminalNewNum() {
		return terminalNewNum;
	}

	public void setTerminalNewNum(int terminalNewNum) {
		this.terminalNewNum = terminalNewNum;
	}

	public int getCommunityNum() {
		return communityNum;
	}

	public void setCommunityNum(int communityNum) {
		this.communityNum = communityNum;
	}

	public int getVillageNum() {
		return villageNum;
	}

	public void setVillageNum(int villageNum) {
		this.villageNum = villageNum;
	}

	public String getVoiceNum() {
		return voiceNum;
	}

	public void setVoiceNum(String voiceNum) {
		this.voiceNum = voiceNum;
	}

	public String getVoicePortNum() {
		return voicePortNum;
	}

	public void setVoicePortNum(String voicePortNum) {
		this.voicePortNum = voicePortNum;
	}

	public String getVoicePer() {
		return voicePer;
	}

	public void setVoicePer(String voicePer) {
		this.voicePer = voicePer;
	}

	public String getVoicePortPer() {
		return voicePortPer;
	}

	public void setVoicePortPer(String voicePortPer) {
		this.voicePortPer = voicePortPer;
	}

	public String getDataNum() {
		return dataNum;
	}

	public void setDataNum(String dataNum) {
		this.dataNum = dataNum;
	}

	public String getDataPortNum() {
		return dataPortNum;
	}

	public void setDataPortNum(String dataPortNum) {
		this.dataPortNum = dataPortNum;
	}

	public String getDataPer() {
		return dataPer;
	}

	public void setDataPer(String dataPer) {
		this.dataPer = dataPer;
	}

	public String getDataPortPer() {
		return dataPortPer;
	}

	public void setDataPortPer(String dataPortPer) {
		this.dataPortPer = dataPortPer;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public int getPhysicalNum() {
		return physicalNum;
	}

	public void setPhysicalNum(int physicalNum) {
		this.physicalNum = physicalNum;
	}

	public double getGridArea() {
		return gridArea;
	}

	public void setGridArea(double gridArea) {
		this.gridArea = gridArea;
	}

	public String getSaleDeptName() {
		return saleDeptName;
	}

	public void setSaleDeptName(String saleDeptName) {
		this.saleDeptName = saleDeptName;
	}

}
