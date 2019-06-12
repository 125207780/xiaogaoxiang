/**
 * 机构树弹出
 * obj.orgId 要赋值orgId的元素id
 * obj.orgName 要赋值orgName的元素id
 * obj.width 设置的弹出框宽度
 * obj.height 设置的弹出框高度
 */
var topgetSysOrgTreeWindow = function(obj) {
	var height = obj.height;
	var width = obj.width;
	topwindow.showWindow({
		width : width,
		height : height,
		title : "机构",//窗口名称
		url : $.cxt + "/sysorg/showsysorgtreewindow",//url
		bottons : [{
			title : "确认",
			fun : function() {
				topwindow.removeWindow();
				var temp = topobj["sysOrgTreeWindowObj"];//点击机构树的缓存对象
				if(temp == undefined) {
					return;
				}
				$("#" + obj.orgId).val(temp.orgId);
				$("#" + obj.orgName).val(temp.name);
				topobj["sysOrgTreeWindowObj"] = undefined;//将缓存设置为空
			}
		}]
	});
}

/**
 * 菜单权限树弹出
 * obj.height 高度
 * obj.width 宽度
 * obj.roleId 角色id
 */
var topgetSysRoleMenuTreeWindow = function(obj) {
	var height = obj.height;
	var width = obj.width;
	topwindow.showWindow({
		width : width,
		height : height,
		title : "菜单权限",//窗口名称
		data : {roleId : obj.roleId},
		url : $.cxt + "/sysrolemenu/showsysrolemenutreewindow",//url
		bottons : [{
			title : "确认",
			fun : function() {
				$.ajax({
					url : $.cxt + "/sysrolemenu/insertsysrolemenu", 
					data : {roleId : obj.roleId, s : topobj["sysRoleMenuTreeWindowMenuIds"]},//topobj["sysRoleMenuTreeWindowMenuIds"]为弹出框里面选中的权限的缓存
					type: "POST",
					success : function(data) {
						topwindow.removeWindow();//关闭窗口
						topshowAlertSuccessDiv();//操作提示
						topobj["sysRoleMenuTreeWindowMenuIds"] = undefined;//缓存设置为空
					}
				});
			}
		}]
	});
}

/**
 * 获取字典树div
 */
var topgetSysCodeTreeDiv = function(obj) {
	obj.name = "codeValue";
	obj.url = "/syscode/selecttree";
	topgetSysTreeDiv(obj);
}

/**
 * 获取机构树div
 */
var topgetSysOrgTreeDiv = function(obj) {
	obj.name = "name";
	obj.url = "/sysorg/selecttree";
	topgetSysTreeDiv(obj);
}

/**
 * 获取菜单树div
 */
var topgetSysMenuTreeDiv = function(obj) {
	obj.name = "menuName";
	obj.url = "/sysmenu/selecttree";
	topgetSysTreeDiv(obj);
}

/**
 * 获取组织机构树div
 */
var topgetOrganizationMenuTreeDiv = function(obj) {
	obj.name = "menuName";
	obj.url = "/sysmenu/selecttree";
	topgetOrganizationTreeDiv(obj);
}

/**
 * 获取树div
 * obj.id 放树的元素的id
 * obj.onClick 点击树的回掉方法
 * obj.clearClick 清空按钮的回调方法
 * obj.height div中body的高度
 * obj.name 数显示哪个字段
 * obj.url 获取树数据url
 * obj.data 获取树数据的参数
 * obj.enable 是否需要checkbox
 * obj.addDiyDom 是否需要自定义控件
 * obj.onCheck 点击checkbox回调方法
 */
var topgetSysTreeDiv = function(obj) {
	var treeId = "sysTree_" + obj.id;//树id
	var treeIdMain = "sysTree_" + obj.id + "_main";//上层bodyid
	var $div = $("#" + obj.id);//获取添加树的jquery元素
	var onClick = obj.onClick || function(a){};//点击树回调方法
	var clearClick = obj.clearClick || function(a){};//点击清空按钮回调方法
	var complete = obj.complete || function(a){};//点击清空按钮回调方法
	var enable = obj.enable || false;//是否启用checkbox
	var addDiyDom = obj.addDiyDom || function(a, b) {};//自定义控件方法
	var name = obj.name;//显示哪个字段
	var onCheck = obj.onCheck || function(a, b) {};//checkbox点击方法
	var html = "" +
	"<div class=\"widget-box widget-color-blue\">" + 
		"<div class=\"widget-header\">" +
			"<h5 class=\"widget-title\"></h5>" +
			"<botton class=\"btn btn-xs btn-primary pull-right widget-header-btn\" id=\"clearClick\">清空所选 </botton>" +
			"<botton class=\"btn btn-xs btn-primary pull-right widget-header-btn\" id=\"expandAllFalse\">合闭</botton>" +
			"<botton class=\"btn btn-xs btn-primary pull-right widget-header-btn\" id=\"expandAllTrue\">展开 </botton>" +
		"</div>" +
		"<div style=\"padding: 0px;\" class=\"widget-body\" id=\"" + treeIdMain + "\" style=\"overflow:auto;\">" +
			"<ul id=\"" + treeId + "\" class=\"ztree\"></ul>" +
		"</div>" +
	"</div>";
	$div.html(html);//添加固定的html
	$.ajax({//请求tree数据
		url : $.cxt + obj.url, 
		type: "POST",
		data : obj.data,//参数
		success : function(data) {
			$.fn.zTree.destroy(treeIdMain);//销毁树
			$.fn.zTree.init($("#" + treeId), {//按新的数据初始化树
				check: {
					enable : enable//是否启用checkbox
				},
				view: {
					addDiyDom : addDiyDom//是否启用自定义控件
				},
				data: {
					key: {
						name : name//显示哪个字段
					},
					simpleData: {
						enable: true//启用简单数据
					}
				},
				callback: {
					onClick: function(event, treeId, treeNode, clickFlag) {//点击事件
						$div.find(".widget-title").html(treeNode[name]);//.widget-title显示点击的节点name
						onClick(treeNode);//调用回调方法
					},
					onCheck : onCheck//checkbox回调方法
				}
			}, data);
			topexpandAllByTreeId(treeId, true);//将树展开
			$("#clearClick").click(function(){//清空方法
				$div.find(".widget-title").html("");//清空.widget-title显示点击的节点name
				topcancelSelectedByTreeId(treeId);//取消树点击
				clearClick(treeId);//清空回调
			});
			$("#expandAllTrue").click(function(){//展开方法
				topexpandAllByTreeId(treeId, true)
			});
			$("#expandAllFalse").click(function(){//闭合方法
				topexpandAllByTreeId(treeId, false)
			});
			complete(treeId);//树加载完成
		}
	});
	$("#" + treeIdMain).height($div.parent().innerHeight() - 70);//设置树的父div的高度
}

/**
 * 树展开或合闭
 * @param treeId 树元素id
 * @param flag true为展开，false为合闭
 */
var topexpandAllByTreeId = function(treeId, flag) {
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	treeObj.expandAll(flag);
}

/**
 * 树取消所有已选
 * @param treeId 树id
 */
var topcancelSelectedByTreeId = function(treeId) {
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	var nodes = treeObj.getSelectedNodes();
	for(var i = 0; i<nodes.length;i++){
		treeObj.cancelSelectedNode(nodes[i]);
	}
}