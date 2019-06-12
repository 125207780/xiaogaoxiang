<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="sysRoleMenuTreeWindow"></div>
<script type="text/javascript">
$(function(){
	topgetSysMenuTreeDiv({
		id : "sysRoleMenuTreeWindow",//div的id
		data : {roleId : "${roleId}"},//设置参数
		enable: true,//启用checkbox
		clearClick : function(treeId) {//清空事件
			var zTree = $.fn.zTree.getZTreeObj(treeId);//获取树对象
			zTree.checkAllNodes(false);//取消所有选中checkbox
			var inputs = $("input[name^='operation_']")//取消所有选中操作权限
			inputs.removeAttr("checked");
			inputs.removeProp("checked");
		},
		onCheck : function(e, treeId, treeNode) {//点击checkbox
			var zTree = $.fn.zTree.getZTreeObj(treeId);//获取树对象
			setMenuWindowOnCheck(zTree, treeNode);//设置树上所有的checkbox选中或者取消
			getCheckData(zTree);//拼装树上所有的checkbox数据，并添加到缓存中
		},
		addDiyDom : function(treeId, treeNode) {//添加自定义控件
			var zTree = $.fn.zTree.getZTreeObj(treeId);//获取树
			var aObj = $("#" + treeNode.tId + "_a");//获取添加自定义控件的jquery对象，这里为固定写法
			var operations = treeNode.sysMenuOperationList;//获取每个菜单的操作权限
			var html = "";
			for(var i = 0; i < operations.length; i ++) {//循环操作权限
				var name = operations[i].operationName;//操作权限名称
				var code = operations[i].operationCode;//操作权限编码
				var checked = "";//选中标识
				if(operations[i].checked) {
					checked = "checked=\"checked\""
				}
				var html = "<input " + checked + " style=\"margin:0px 3px 0px 8px;\" type=\"checkbox\" name=\"operation_" + treeNode.menuId + "\" value=\"" + code + "\" />" + name;//组装添加的input
				aObj.append(html)//添加控件
			}
			$("[name='operation_" + treeNode.menuId + "']").bind("click", function(){//所有的操作权限绑定事件
				if($(this).is(":checked") && !treeNode.checked) {//如果该操作权限被选中了且菜单权限没有被选中
					zTree.checkNode(treeNode, true, true);//将该菜单checkedbox设为选中
				}
				getCheckData(zTree);//获取所有权限
			});
		},
		complete : function(treeId) {
			var zTree = $.fn.zTree.getZTreeObj(treeId);//获取树对象
			getCheckData(zTree);
		}
	});
})
//操作所有的checkbox
var setMenuWindowOnCheck = function(zTree, treeNode) {
	var checkNodes = zTree.getCheckedNodes(true);//获取所有选中节点
	for(var i = 0; i < checkNodes.length; i ++) {
		var checkNode = checkNodes[i];//选中节点
		//alert(checkNode.treeCode + "---" + treeNode.treeCode + "---" + checkNode.treeCode.indexOf(treeNode.treeCode));
		var inputs = $("[name='operation_" + checkNode.menuId + "']");//操作权限
		if(!inputs.is(":checked") && checkNode.treeCode.indexOf(treeNode.treeCode) == 0) {//如果操作权限都没有选中，而且点击的节点为该节点的父节点则操作权限全部选中
			inputs.attr("checked", "checked");
			inputs.prop("checked", "checked");
		}
	}
	var nocheckNodes = zTree.getCheckedNodes(false);//获取没有选中的所有节点
	for(var i = 0; i < nocheckNodes.length; i ++) {
		var nocheckNode = nocheckNodes[i];//未选中节点
		var inputs = $("[name='operation_" + nocheckNode.menuId + "']");//将该节点的所有操作权限都取消选中
		inputs.removeAttr("checked");
		inputs.removeProp("checked");
	}
}
//拼装数据
var getCheckData = function(zTree) {
	var menuIds = "";
	var checkNodes = zTree.getCheckedNodes(true);//获取所有选中节点
	for(var i = 0; i < checkNodes.length; i ++) {
		var checkNode = checkNodes[i];//选中节点
		var inputValue = "";
		$("[name='operation_" + checkNode.menuId + "']:checked").each(function(){//如果操作权限被选中，则追加到inputValue
			inputValue += $(this).val() + "#";
		})
		menuIds += checkNode.menuId + "_" + inputValue + ",";//拼接该菜单权限
	}
	topobj["sysRoleMenuTreeWindowMenuIds"] = menuIds;//缓存菜单权限
}
</script>
