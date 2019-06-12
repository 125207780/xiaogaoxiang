$(".getSrc").click(function(){
    $("#contentLoader").attr("src",$(this).attr("data-src"))
});
$('[data-toggle="tooltip"]').tooltip()

var firstActiveMenuId = "";
$(function(){
    var iframeheight = $(window).height()-66;
    $("#contentLoader").height(iframeheight);

//	slidMoal();
//	doubleLine();
//	fourGChart();
//	jkChart();
	$.ajax({//请求菜单树
		url : $.cxt + "/sysmenu/selectjoinsysrolemenutree",
		type: "POST",
		success : function(data) {
			var htmlleft="";
			var htmlright="";
			getChildrenMenu(data,htmlleft,htmlright); //添加菜单
			if(null != data[0].menuUrl && "" != data[0].menuUrl) {
				firstActiveMenuId = data[0].menuUrl;
			}
			else {
				firstActiveMenuId = data[0].children[0].menuUrl;
			}
			doContentLoader(firstActiveMenuId);//加载第一个有url的元素
		}
	});
});
//下拉框
var slidMoal = function(){
	var flag = true;
	$(".modalDownBtn").click(function(){
		if(flag){
			flag = false;
			$(".modalDownCon").animate({"height":"565px"});
			$(".modalDownBtn").animate({'top':'614px'});
			$(".modalDownBtn").find('i').removeClass("fa-angle-double-down").addClass("fa-angle-double-up")
		}else{
			flag = true;
			$(".modalDownCon").animate({"height":"0px"});
			$(".modalDownBtn").animate({'top':'51px'});
			$(".modalDownBtn").find('i').removeClass("fa-angle-double-up").addClass("fa-angle-double-down")
		}
		
	})
	$(".modalDownCon").mouseleave(function(){
		flag = true;
		$(".modalDownCon").animate({"height":"0px"});
		$(".modalDownBtn").animate({'top':'51px'});
		$(".modalDownBtn").find('i').removeClass("fa-angle-double-up").addClass("fa-angle-double-down")
	})
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
var doContentLoader = function(firstActiveMenuId) {
		$("#contentLoader").attr("src",$.cxt+firstActiveMenuId);//给iframe赋值src跳转
}

var doLoginRole = function() {
	$.ajax({
		url : $.cxt + '/loginRole',
		type : "POST",
		async : false,
		success : function(data) {
			if(data != "-2") {
				data = eval('(' + data + ')');
				var sysRoleUsers = data.sysRoleUserList;
				if(sysRoleUsers.length > 1) {
					var html = "";
					for(var i = 0; i < sysRoleUsers.length; i ++) {
						html += "<div class=\"align-center radio blue\"><label class=\"radio-inline\"><input type=\"radio\" name=\"sysRoleUser\" value=\"" + sysRoleUsers[i].roleId + "\">&nbsp;&nbsp;" + sysRoleUsers[i].roleName + "</label></div>";
					}
					var $obj = $("#chooseSysRoleUser");
					$obj.append(html);
					// $obj.css({
					// 	"margin-top":-700
					// })
					//topsetWindowCenter($obj);
					$obj.fadeIn();
					$("#chooseSysRoleUserFullBackground").fadeIn();
					$("[name='sysRoleUser']").click(function(){
						location.href =$.cxt+'/pages/jsp/frame/topMenuFrame.jsp?loginRoleId=' + $(this).val();
					})
				}
				if(sysRoleUsers.length == 1) {
					location.href =$.cxt+'/pages/jsp/frame/topMenuFrame.jsp';
				}
				if(sysRoleUsers.length == 0) {
					validator.updateStatus("username", 'INVALID', "stringLength");
				}
			} 
		}
	});
}

function openMenu(url,titleInfo){
	var orgId = $('.orgIdInput').val();
	topwindow.showWindow({
		   title : titleInfo,
		   data:{},
			url : url+'?'+orgId+'='+orgId,
			bottons : [{
				title:"关闭",
				fun : function() {
					topwindow.removeWindow();
				}
			}] 
	   })
}


function getChildrenMenu(menu,htmlleft,htmlright){
	htmlleft+='<ul class="nav">';
	htmlright+='<ul class="nav">';
	
	for(var i = 0; i < menu.length; i ++) {
		if(menu[i].menuName=="首页"||menu[i].menuName=="综合视图"||menu[i].menuName=="网格运营"){
			if(menu[i].menuName=="首页") {
				htmlleft+='<li  ><a href="#" onclick="clickMenu(\''+menu[i].menuId+'\',\''+menu[i].menuUrl+'\')" >'+menu[i].menuName+'</a>';
			} else if(menu[i].menuName=="综合视图"){
				htmlleft+='<li  ><a href="#" onclick="clickMenu(\''+menu[i].menuId+'\',\''+menu[i].menuUrl+'\')" >'+menu[i].menuName+'</a>';
			}else{
				htmlleft+='<li  ><a href="#" >'+menu[i].menuName+'</a>';
			}
			if(menu[i].children!=null){
				htmlleft+='<ul class="second-nav" >';
				for(var j = 0; j < menu[i].children.length; j ++) {
					if(menu[i].children[j].children!=null){
						if(menu[i].children[j].menuName.length>6){
							if(j==(menu[i].children.length-1)){
								htmlleft+='<li><a href="#" title="'+menu[i].children[j].menuName+'">'+menu[i].children[j].menuName.substr(0, 6) +'...&nbsp;&nbsp'
								+'</a>';
							}else{
								htmlleft+='<li ><a class="underline" href="#" title="'+menu[i].children[j].menuName+'">'+menu[i].children[j].menuName.substr(0, 6) +'...&nbsp;&nbsp'
								+'</a>';
							}
						}else{
							if(j==(menu[i].children.length-1)){
								htmlleft+='<li><a href="#">'+ menu[i].children[j].menuName+'&nbsp;&nbsp;</a>';
							}else{
								htmlleft+='<li ><a class="underline" href="#">'+ menu[i].children[j].menuName+'&nbsp;&nbsp;</a>';
							}
						}
						htmlleft+='<ul class="third-nav">';
						for(var k = 0; k < menu[i].children[j].children.length; k ++) {
							
							if(menu[i].children[j].children[k].menuName.length>8){
								if(k==(menu[i].children[j].children.length-1)){
									htmlleft+='<li><a href="#" onclick="clickMenu(\''+menu[i].children[j].children[k].menuId+'\',\''+menu[i].children[j].children[k].menuUrl+'\')"  title="'+menu[i].children[j].children[k].menuName+'">'+ menu[i].children[j].children[k].menuName.substr(0,8)+'...</a></li>';
								}else{
									htmlleft+='<li ><a class="underline" href="#"  onclick="clickMenu(\''+menu[i].children[j].children[k].menuId+'\',\''+menu[i].children[j].children[k].menuUrl+'\')"  title="'+menu[i].children[j].children[k].menuName+'">'+ menu[i].children[j].children[k].menuName.substr(0,8)+'...</a></li>';
								}
							}else{
								if(k==(menu[i].children[j].children[k].length-1)){
									htmlleft+='<li><a href="#"  onclick="clickMenu(\''+menu[i].children[j].children[k].menuId+'\',\''+menu[i].children[j].children[k].menuUrl+'\')" >'+ menu[i].children[j].children[k].menuName+'</a></li>';
								}else{
									htmlleft+='<li ><a  class="underline" href="#"  onclick="clickMenu(\''+menu[i].children[j].children[k].menuId+'\',\''+menu[i].children[j].children[k].menuUrl+'\')" >'+ menu[i].children[j].children[k].menuName+'</a></li>';
								}
							}
							
						}
						htmlleft+='</ul>';
					}else{
						if(menu[i].children[j].menuName.length>8){
							if(j==(menu[i].children.length-1)){
								htmlleft+='<li><a href="#" onclick="clickMenu(\''+menu[i].children[j].menuId+'\',\''+menu[i].children[j].menuUrl+'\')" title="'+menu[i].children[j].menuName+'">'+menu[i].children[j].menuName.substr(0, 8) +'...</a>';
							}else{
								htmlleft+='<li ><a  class="underline" href="#"  onclick="clickMenu(\''+menu[i].children[j].menuId+'\',\''+menu[i].children[j].menuUrl+'\')" title="'+menu[i].children[j].menuName+'">'+menu[i].children[j].menuName.substr(0, 8) +'...</a>';
							}
							
						}else{
							if(j==(menu[i].children.length-1)){
								htmlleft+='<li><a href="#" onclick="clickMenu(\''+menu[i].children[j].menuId+'\',\''+menu[i].children[j].menuUrl+'\')" >'+ menu[i].children[j].menuName+'</a>';
							}else{
								htmlleft+='<li ><a class="underline"  href="#" onclick="clickMenu(\''+menu[i].children[j].menuId+'\',\''+menu[i].children[j].menuUrl+'\')" >'+ menu[i].children[j].menuName+'</a>';
							}
							
						}
					}
					htmlleft+='</li>';
				}
				htmlleft+='</ul>';
			}
			htmlleft+='</li>';	
		}
		
		
		if(menu[i].menuName=="包保管理"||menu[i].menuName=="考核管理"||menu[i].menuName=="系统管理"){
			htmlright+='<li  ><a href="#" >'+menu[i].menuName+'</a>';
			if(menu[i].children!=null){
				htmlright+='<ul class="second-nav" >';
				for(var j = 0; j < menu[i].children.length; j ++) {
					if(menu[i].children[j].children!=null){
						if(menu[i].children[j].menuName.length>6){
                            if(j==(menu[i].children.length-1)){
                            	htmlright+='<li><a href="#" title="'+menu[i].children[j].menuName +'">'+menu[i].children[j].menuName.substr(0, 6) +'...&nbsp;&nbsp;</a>';
                            }else{
                            	htmlright+='<li ><a class="underline" href="#" title="'+menu[i].children[j].menuName +'">'+menu[i].children[j].menuName.substr(0, 6) +'...&nbsp;&nbsp;</a>';
                            }
							
						}else{
							 if(j==(menu[i].children.length-1)){
								 htmlright+='<li><a href="#">'+ menu[i].children[j].menuName+'&nbsp;&nbsp;</a>';
							 }else{
								 htmlright+='<li ><a class="underline"  href="#">'+ menu[i].children[j].menuName+'&nbsp;&nbsp;</a>'; 
							 }
							
						}
						htmlright+='<ul class="third-nav">';
						for(var k = 0; k < menu[i].children[j].children.length; k ++) {
							
							if(menu[i].children[j].children[k].menuName.length>8){
								 if(k==(menu[i].children[j].children.length-1)){
									 htmlright+='<li><a href="#"  onclick="clickMenu(\''+menu[i].children[j].children[k].menuId+'\',\''+menu[i].children[j].children[k].menuUrl+'\')" title="'+menu[i].children[j].children[k].menuName+'">'+ menu[i].children[j].children[k].menuName.substr(0,8)+'...</a>';
								 }else{
									 htmlright+='<li  ><a class="underline" href="#"  onclick="clickMenu(\''+menu[i].children[j].children[k].menuId+'\',\''+menu[i].children[j].children[k].menuUrl+'\')" title="'+menu[i].children[j].children[k].menuName+'">'+ menu[i].children[j].children[k].menuName.substr(0,8)+'...</a>'; 
								 }
								
							}else{
								if(k==(menu[i].children[j].children.length-1)){
									htmlright+='<li><a href="#"  onclick="clickMenu(\''+menu[i].children[j].children[k].menuId+'\',\''+menu[i].children[j].children[k].menuUrl+'\')" >'+ menu[i].children[j].children[k].menuName+'</a>';
								 }else{
									 htmlright+='<li  ><a  class="underline" href="#"  onclick="clickMenu(\''+menu[i].children[j].children[k].menuId+'\',\''+menu[i].children[j].children[k].menuUrl+'\')" >'+ menu[i].children[j].children[k].menuName+'</a>';
								 }
							}
						}
						htmlright+='</ul>';
					}else{
						if(menu[i].children[j].menuName.length>6){
							if(j==(menu[i].children.length-1)){
								htmlright+='<li><a href="#" onclick="clickMenu(\''+menu[i].children[j].menuId+'\',\''+menu[i].children[j].menuUrl+'\')"  title="'+menu[i].children[j].menuName +'">'+menu[i].children[j].menuName.substr(0, 6) +'...&nbsp;&nbsp;</a>';
							 }else{
								 htmlright+='<li  ><a class="underline" href="#" onclick="clickMenu(\''+menu[i].children[j].menuId+'\',\''+menu[i].children[j].menuUrl+'\')"  title="'+menu[i].children[j].menuName +'">'+menu[i].children[j].menuName.substr(0, 6) +'...&nbsp;&nbsp;</a>';
							 }
						}else{
							if(j==(menu[i].children.length-1)){
								htmlright+='<li><a href="#" onclick="clickMenu(\''+menu[i].children[j].menuId+'\',\''+menu[i].children[j].menuUrl+'\')"  >'+ menu[i].children[j].menuName+'&nbsp;&nbsp;</a>';
								
							}else{
								htmlright+='<li ><a class="underline" href="#" onclick="clickMenu(\''+menu[i].children[j].menuId+'\',\''+menu[i].children[j].menuUrl+'\')"  >'+ menu[i].children[j].menuName+'&nbsp;&nbsp;</a>';
							}
							
						}
						
					}
					htmlright+='</li>';
				}
				htmlright+='</ul>';
			}else{
				
			}
			htmlright+='</li>';	
		}
		
	}
	
	htmlleft+='<ul>';
	htmlright+='<ul>';

	$("#middle1").html(htmlleft);
	$("#middle3").html(htmlright);
	
	var _this1=null;
	$('.nav>li').hover(function(){
		
		_this1=$(this);
		_this1.find('.second-nav').show();
		var _this2=null;
		//$(allImg[i]).attr("src", "images/b04.gif");
		_this1.find('.second-nav').find('li').hover(function(){
			
			_this2=$(this);
			//$(this).find("img").attr("src","../../images/topFrame/icon_ExpandSelected.png");
			_this2.find('.third-nav').show();
			_this2.find('.third-nav').hover(function(){
				$(this).show();
			},function(){
				$(this).hide();
			});
		},function(){
			_this2.find('.third-nav').hide();
		});
	},function(){
		_this1.find('.second-nav').hide();
	});
	

	
	
}

function clickMenu(menuId,menuUrl){
	doContentLoader(menuUrl);
}


