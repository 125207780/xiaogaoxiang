<%@ tag language="java" pageEncoding="UTF-8"%>

<div id="menuElement"></div>

<script type="text/javascript">
$(function() {
	getMenuList();
});

function getMenuList(){
   var url = location.search; 
   var map = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
    	  map[strs[i].split("=")[0]]=strs[i].split("=")[1];
      }
   }
   $.ajax({
       type: "post",
       url : $.cxt+"/menu/getMenuList",
       data: {key:map["key"],url:document.referrer},
       dataType: "json",
       success: function(data){
    	   if(data.code == 1){
    		   $.ajax({
    		        type: "post",
    		        url : $.cxt+"/operation/logoutSystem",
    		        data: {},
    		        dataType: "json",
    		        success: function(data){
    		        	if("failer" != data){
    		        		window.location.href=data
    		        	}else{
    		        		alert("系统异常，请重新登录！");
    		        	}
    		        }
    			});
    	   }
    	   createMenu(data);
    	   hightMenu(map["showid"]);
    	   doSearchAlarmBell();
    	   var t1 = window.setInterval(sessionTimeOut,50000); 
	    }
   });
}

function createMenu(data){
	var showlist = $("<ul class='nav nav-list'></ul>");
// 	var menulist = {"data": [{ "id": "M001", "name": "首页", "parentId": "0", "path": "/monitor/pages/jsp/monitor/operation/monitor.jsp","showid":"index-index", "children": "" },{ "id": "M002", "name": "车辆买卖", "parentId": "0", "path": "#","showid":"monitor-monitor", "children":[{ "id": "M003", "name": "新车", "parentId": "M002", "path": "#","showid":"monitor-operation1", "children":[{ "id": "M006", "name": "奥迪","parentId": "M003", "path": "/monitor/pages/jsp/monitor/operation/monitor.jsp","showid":"monitor-0-operation", "children": "" },{ "id": "M007", "name": "别克","parentId": "M003", "path": "/monitor/pages/jsp/monitor/operation/monitor.jsp","showid":"monitor-1-operation", "children": "" }]},{ "id": "M004", "name": "二手车","parentId": "M002", "path": "/monitor/pages/jsp/monitor/operation/monitor.jsp","showid":"monitor-database1", "children": "" },{ "id": "M005", "name": "改装车","parentId": "M002", "path": "/monitor/pages/jsp/monitor/operation/monitor.jsp","showid":"monitor-application1", "children": "" }]},{ "id": "M008", "name": "宠物","parentId": "0", "path": "/monitor/pages/jsp/monitor/operation/monitor.jsp","showid":"monitor-analysis", "children": "" }]};
    showMenu(data.data[0].children, showlist,"");
    $("#menuElement").append(showlist);
    $("#menuElement").append('<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">'+
	'<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>'+
	'</div>');
    $.get('/monitor/pages/jsp/index.jsp', function(html) {
    	findParent(data.data[0].children[0].id);
    	if(typeof(drawPageData)=="function"){
    		
    		clearInterval(drawPageData);
        }
		$(".main-content").empty().html(html);
	});
}

function showMenu(menuList, menuhtml,path) {
   	$.each(menuList, function(index, menu){
	   		if(menuList[index].children){
	   			if (menuList[index].children.length > 0) {
	   				var icon ="";
	   				if(menuList[index].name == "监控中心"){
	             	   icon = "fa-desktop"; 
	                }
	                else if(menuList[index].name == "统计分析"){
	             	   icon = "fa-bar-chart"; 
	                }
	                else if(menuList[index].name == "配置管理"){
	             	   icon = "fa-user"; 
	                }
	                var li = $('<li id='+menuList[index].id+' parentid='+menuList[index].parentId+'></li>');
	                $(li).append('<a href="#" class="dropdown-toggle">'
	                		+'<i class="menu-icon fa '+icon+'"></i><span class="menu-text">'+menuList[index].name
	                		+'</span><b class="arrow fa fa-angle-down"></b></a><b class="arrow"></b>')
	                		.append('<ul class="submenu"></ul>')
	                		.appendTo(menuhtml);
	                showMenu(menuList[index].children, $(li).children().eq($(li).children().length-1),menuList[index].path? path + menuList[index].path : path);
	            }else {
	               $('<li id='+menuList[index].id+' parentid='+menuList[index].parentId+'></li>')
	               .append('<a href='+path+menuList[index].path+' class="clickbtn">'
	            		   +'<i class="menu-icon fa fa-caret-right"></i>'+menuList[index].name
	            		   +'</a><b class="arrow"></b>')
	               .appendTo(menuhtml);
	            }
	   		}else {
	   			var icon ="";
               if(menuList[index].name == "首页"){
            	   icon = "fa-home";
               }else{
            	   icon = "fa-caret-right"; 
               }
               $('<li id='+menuList[index].id+' parentid='+menuList[index].parentId+'></li>')
               .append('<a href='+path+menuList[index].path+' class="clickbtn">'
            		   +'<i class="menu-icon fa '+icon+'"></i>'+menuList[index].name
            		   +'</a><b class="arrow"></b>')
               .appendTo(menuhtml);
	        }
       });
}

function hightMenu(menushowid){
	$('a.dropdown-toggle').bind("click", function(e) {
		$('li').removeClass("active open");
		if(!$(this).siblings("ul").hasClass("nav-show")){
			$('ul.submenu').removeClass('nav-show').addClass('nav-hide').css('display','none');
			findParent($(this).parent('li').attr('id'));
		}
	});
	
	$('a.clickbtn').bind("click", function(e) {
		e.preventDefault();
		if($(this).attr('href') != '#'){
			$this = $(this);
			if(!$("#"+$this.parent('li').attr('parentid')).attr('parentid')){
				$('ul.submenu').removeClass('nav-show').addClass('nav-hide').css('display','none');
			}
            $('li').removeClass("active open");
            findParent($this.parent('li').attr('id'));
			$.get($this.attr('href'), function(data) {
				if(typeof(drawPageData)=="function"){
					window.clearInterval(t1);
		        }
				$(".main-content").empty().html(data);
				findParent($this.parent('li').attr('id'));
			});
		}
	});
}

function findParent(id){
	if(id){
		$("#"+id).addClass("active open");
		$("#"+id).parent('ul').removeClass('nav-hide').addClass('nav-show').css('display','block');
		if($("#"+$("#"+id).attr("parentid"))){
			findParent($("#"+id).attr("parentid"));
		}
	}
}
function sessionTimeOut(){
	 $.ajax({
	       type: "post",
	       url : $.cxt+"/menu/sessionTimeOut",
	       dataType: "json",
	       success: function(data){
	    	   if(data == "0"){
	    		   $.ajax({
	    		        type: "post",
	    		        url : $.cxt+"/operation/logoutSystem",
	    		        data: {},
	    		        dataType: "json",
	    		        success: function(data){
	    		        	if("failer" != data){
	    		        		window.location.href=data
	    		        	}else{
	    		        		alert("系统异常，请重新登录！");
	    		        	}
	    		        }
	    			});
	    	   }
		    }
	   });
}
var alertNum = 0;
function doSearchAlarmBell(){
	$.ajax({
        type: "post",
        url : $.cxt+"/getAlermCount",
        data: {},
        dataType: "json",
        success: function(data){
        	if((parseInt(data))>0){
        		$("#alarmCount").html(parseInt(data));
        		if(parseInt(data) > alertNum){
			   		document.getElementById('alarmBell').play();
			   		alertNum = parseInt(data);
        		}
   			}
        }
	});
	setTimeout(function(){doSearchAlarmBell();}, 60000);
}

</script>


