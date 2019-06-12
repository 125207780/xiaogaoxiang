var firstActiveMenuId = "";
$(function(){
	$.ajax({//请求菜单树
		url : $.cxt + "/sysmenu/selectjoinsysrolemenutree", 
		type: "POST",
		success : function(data) {
			var html = "<ul class=\"nav nav-list\">";//顶级ul
			for(var i = 0; i < data.length; i ++) {
				var menu = data[i];
				if(i == 0) {
					html += "<li class=\"open\">";//一级菜单的li默认open
				} else {
					html += "<li class=\"\">";
				}
				html += getChildrenMenu(menu);//添加菜单
				html += "</li>";
			}		
			html += "</ul>";
			$("#sidebar").html(html);//添加拼装好的菜单html
			$(".getSrc").click(function(){//有url的元素点击事件
				doContentLoader($(this));
			});
			var iframeheight = $(window).height() - 129;//计算iframe应该的高度
			$("#contentLoader").height(iframeheight);//设置高度
			var $firstActive = $("[menuId='" + firstActiveMenuId + "']");//获取第一个url的元素，进来的时候默认显示该页面
			if($firstActive.attr("menuLevel") == "1") {//如果第一个有url的元素菜单级别为1
				$firstActive.parent("li").removeClass("open");//则去掉默认的open
			}
			doContentLoader($firstActive);//加载第一个有url的元素
		}
	});
	$('[data-toggle="tooltip"]').tooltip()//
	$(".menuControl").click(function(){
		if($(".sidebar").hasClass("menu-min")){
			$(".sidebar").removeClass("menu-min");
		}else{
			$(".sidebar").addClass("menu-min");
		}
	})
})
//添加菜单
var getChildrenMenu = function(menu) {
	var html = "";
	if(menu.menuUrl != null && menu.menuUrl != "") {//有url给url赋值，没有则不赋值
		html += "<a menuLevel=\"" + menu.menuLevel + "\" menuId=\"" + menu.menuId + "\" href=\"#\" data-operations=\"" + menu.operations + "\" data-src=\"" + ($.cxt + menu.menuUrl) + "\" class=\"dropdown-toggle getSrc\">";
		if(firstActiveMenuId == "") {
			firstActiveMenuId = menu.menuId;//保存第一个url的菜单id
		}
	} else {
		html += "<a href=\"#\" class=\"dropdown-toggle\">";
	}
	var icons=menu.iconPath;
	if(icons == null){
		icons='fa-caret-right';//子菜单默认图标
	}
	html += "<i class=\"menu-icon fa "+icons+"\"></i>";//菜单前面的小图标
	html += "<span class=\"menu-text\">" + menu.menuName + "</span>";//菜单名称
	if(menu.children != null) {//如果有子菜单则在右侧添加向下的小箭头
		html += "<b class=\"arrow fa fa-angle-down\"></b>"
	}
	html += "</a>";
	html += "<b class=\"arrow\"></b>";//添加线
	if(menu.children != null) {//如果有子菜单递归添加子菜单
		html += getChildrenMenu1(menu);				
	}
	return html;
}
//递归添加子菜单
var getChildrenMenu1 = function(menu) {
	var html = "<ul class=\"submenu\">";//添加子菜单的ul
	var children = menu.children;//获取子菜单
	for(var i = 0; i < children.length; i ++) {
		html += "<li class=\"\">";//子菜单li
		html += getChildrenMenu(children[i]);//添加子菜单
		html += "</li>";
	}
	html += "</ul>";
	return html;
}
//退出
var doLoginOut = function() {
	topshowdialog("确认退出？", function(){
		$.ajax({
			url : $.cxt + "/loginout", 
			type: "POST",
			success : function(data) {
				if(data == "1") {
					location.href = $.cxt + "/pages/jsp/login/login.jsp";
				}
			}
		});
	})
}
var doContentLoader = function($this) {
	$("#contentLoader").attr("src",$this.attr("data-src"))//给iframe赋值src跳转
	var $active = $("#sidebar li.active");//查找有.active的菜单
	$active.removeClass("active");//移除active样式
	$this.parent().addClass("active");//给最新点击的li添加active样式
	//添加菜单导航条
	var $lis = $this.parents("li");//获取所有上级li元素
	var breadcrumbsHtml = "";//导航条的html
	for(var i = $lis.length - 1; i >= 0 ; i --) {//倒叙循环，这样就能让顶级菜单在第一个
		var $li = $($lis[i]);
		var text = $li.find(".menu-text").html();//获取菜单名称
		breadcrumbsHtml += "<li>" + text + "</li>";//拼装导航条html
	}
	$("#breadcrumbs ul").html(breadcrumbsHtml);//添加导航条的html
	$("#breadcrumbs ul li:first-child").append($("<i class='fa fa-home'></i>").css({"float":"left","margin":"1px 3px 0px","font-size":"16px"}));
}