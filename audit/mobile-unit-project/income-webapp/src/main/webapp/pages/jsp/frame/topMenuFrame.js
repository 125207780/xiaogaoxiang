$(".getSrc").click(function(){
    $("#contentLoader").attr("src",$(this).attr("data-src"))
});
$('[data-toggle="tooltip"]').tooltip()
/* iframeg高度自适应 */
$("#contentLoader").load(function(){
    var iframeheight = $(window).height()-100;
    $(this).height(iframeheight);
});



var firstActiveMenuId = "";
$(function(){
	
	slidMoal();
	doubleLine();
	fourGChart();
	jkChart();
	$.ajax({//请求菜单树
		url : $.cxt + "/sysmenu/selectjoinsysrolemenutree",
		type: "POST",
		success : function(data) {
			var html = "<ul class=\"nav nav-list\">";//顶级ul
			for(var i = 0; i < data.length; i ++) {
				var menu = data[i];
				//if(i == 0) {
				//	html += "<li class=\"active hover getSrc oneLeve\">";//一级菜单的li默认open
				//} else {
					html += "<li class=\"hover hsub\">";
				//}
				html += getChildrenMenu(menu);//添加菜单
				html += "</li>";
			}
			html += "</ul>";
			$("#sidebar").html(html);//添加拼装好的菜单html
			$(".getSrc").click(function(){//有url的元素点击事件
				doContentLoader($(this));
			});
			var iframeheight = $(window).height() - 146;//计算iframe应该的高度
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
var doubleLine = function(){
	var myChartL3 = echarts.init(document.getElementById('superMarkedChart'));	
	option = {
			title: {
			    text: '放号量',
			    left: 0,
			    top: 0,
			    textStyle:{
			        color:'#fff',
			        fontSize:12
			    }
			  },
    legend: {
      show: true,
      right: '0%',
      itemWidth: 5,
      itemHeight: 5,
      itemGap: 3,
      data: [{
        name: '移动',
        icon: 'circle',
        textStyle: {
        fontSize: '10',
        color: '#366b97'
        }
      },
      {
          name: '联通',
          icon: 'circle',
          textStyle: {
          fontSize: '10',
          color: '#96a057'
          }
        },
      {
          name: '电信',
          icon: 'circle',
          textStyle: {
          fontSize: '10',
          color: '#26685a'
          }
        }]
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            label: {
               // backgroundColor: '#6a7985'
            },
            itemStyle:{
                        normal: {
                            color:'#f3c334'
                    }
                },
            }
    },
    grid: {
      left: '10px',
      right: '10px',
      top: '25px',
      bottom: '0px',
      containLabel: true
    },
    textStyle: {
      fontSize: '10',
      fontWeight: 'normal',
      color: '#ffffff'
    },
    xAxis: {
      show: true,
      type: 'category',
      boundaryGap: false,
      "textStyle": {
          "fontSize": 12
      },
      axisLine: {
      lineStyle: {
        show: true,
        color: "#ffffff",
        width: 1
      		}
    },
      data: ['08月','09月','10月','11月','12月'],
    },
    yAxis: {
      show: true,
      type: 'value',
      splitLine: {
        show: false,
        lineStyle: { 
          color: 'rgba(255, 255, 255, 0.06)',
        }
      },
      axisLabel: {
        formatter: function(params) {
          if (params === 0) {
            return ''
          } else {
            return params
          }
        }
      },
      lineStyle: {
          show: true,
          color: "#ffffff",
          width: 1
        		}
    },
    series: [{
      name: '移动',
      type: 'line',
      smooth: false,
      showSymbol: true,
      symbol: "circle", 
      symbolSize:5,
      label: {normal: {
           show: false
       }},
      itemStyle: {
        normal: {
          label:{show: false},
          lineStyle: {
            color: '#366b97'
          },
          color:'#366b97'
        }
      },
      data: [15,11,12,12,10]
    },
    {
      name: '联通',
      type: 'line',
      smooth: false,
      showSymbol: true,
      symbol: "circle", 
      symbolSize:5,
      label: {normal: {

           show: false

       }},
      itemStyle: {
        normal: {
          lineStyle: {
            color: '#96a057'
          },
           color:'#96a057'
        }
      },
    data: [20,13,16,12,12]
    },
    {
        name: '电信',
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: "circle", 
        symbolSize:5,
        label: {normal: {

             show: false

         }},
        itemStyle: {
          normal: {
            lineStyle: {
              color: '#26685a'
            },
             color:'#26685a'
          }
        },
      data: [21,23,13,10,15]
      }]
};

// 使用刚指定的配置项和数据显示图表。
		myChartL3.setOption(option);
}
var fourGChart = function(){
	var myChart = echarts.init(document.getElementById('fourGChart'));	
	option = {
			title: {
			    text: '4G客户净增',
			    left: 0,
			    top: 0,
			    textStyle:{
			        color:'#fff',
			        fontSize:12
			    }
			  },
    legend: {
      show: false,
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            label: {
               // backgroundColor: '#6a7985'
            },
            itemStyle:{
                        normal: {
                            color:'#f3c334'
                    }
                },
            }
    },
    grid: {
    	left: '10px',
        right: '10px',
        top: '25px',
        bottom: '0px',
      containLabel: true
    },
    textStyle: {
      fontSize: '14',
      fontWeight: 'normal',
      color: '#ffffff'
    },
    xAxis: {
      show: true,
      type: 'category',
      boundaryGap: false,
      axisLine: {
      lineStyle: {
        show: true,
        color: "#ffffff",
        width: 1
      		}
    },
      data: ['08月','09月','10月','11月','12月'],
    },
    yAxis: {
      show: true,
      type: 'value',
      splitLine: {
        show: false,
        lineStyle: { 
          color: 'rgba(255, 255, 255, 0.06)',
        }
      },
      axisLabel: {
        formatter: function(params) {
          if (params === 0) {
            return ''
          } else {
            return params
          }
        }
      },
      lineStyle: {
          show: true,
          color: "#ffffff",
          width: 1
        		}
    },
    series: [{
      name: '数据1',
      type: 'line',
      showSymbol: true,
      symbol:'none',  //这句就是去掉点的  
      smooth:true,  //这句就是让曲线变平滑的 
      label: {normal: {
           show: false
       }},
      itemStyle: {
        normal: {
          label:{show: false},
          lineStyle: {
            color: '#43d3ca'
          },
          color:'#43d3ca'
        }
      },
      areaStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(80, 212, 216, 0.9)',
              }, {
                offset: 1,
                color: 'rgba(20, 42, 56, 0.5)',
              }],
              globalCoord: false
            },
          }
        },
      data: [15,11,12,12,10]
    }]
};

// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}
var jkChart = function(){
	var myChart = echarts.init(document.getElementById('jkChart'));	
	var data = ['08月','09月','10月','11月','12月'];
	var data1 = ['75','23','65','45','54'];
	option = {
	  title: {
	    text: '有线宽带净增',
	    left: 0,
	    top: 0,
	    textStyle:{
	        color:'#fff',
	        fontSize:12
	    }
	  },
	  grid: {
		  left: '30px',
	      right: '10px',
	      top: '25px',
	      bottom: '20px',
	  },
	  tooltip: {
	    trigger: 'axis',
	    axisPointer: {
	      type: 'shadow',
	    }
	  },
	  legend: {
	    show:false,
	  },
	 xAxis: [{
		    name:'',
		    triggerEvent: false,
		    data: data,
		    axisLabel: {
		      interval: 0,
		      show: true,
		      textStyle: {
		        color: "#ffffff"
		      }
		    },
		    axisTick: {
		        show: false
		    },
		    axisLine: {
		      lineStyle: {
		        show: false,
		        color: "#ffffff",
		        width: 1
		      		}
		    },
		    splitLine:{ 
		               show:false
		              }
			}],
	yAxis: {
	      show: true,
	      type: 'value',
	      splitLine: {
	        show: false
	      },
	      axisLabel: {
	        formatter: function(params) {
	          if (params === 0) {
	            return ''
	          } else {
	            return params
	          }
	        }
	      },
	      axisLabel: {
              textStyle: {
                  color: '#fff'
              }
          },
	      lineStyle: {
	          show: true,
	          color: "#ffffff",
	          width: 1
	        		}
	    },
	series: [{
	    name: '指标1',
	    type: 'bar',
	    silent: true,
	   /* itemStyle: {
	      normal: {
	        color: '#d0dd71'
	      }
	    },*/
	    itemStyle: {
            normal: {
                barBorderRadius: 0,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#dae67a'
                }, {
                    offset: 1,
                    color: '#586549'
                }]),
                shadowColor: 'rgba(0, 0, 0, 0.4)',
                shadowBlur: 20
            }
        },
	    data: data1
	  }]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
}
//添加菜单
var getChildrenMenu = function(menu) {
	var html = "";
	if(menu.menuUrl != null && menu.menuUrl != "") {//有url给url赋值，没有则不赋值
		if(menu.menuAttr == '1'){
			html += "<a menuName=\"" + menu.menuName + "\" menuAttr=\"" + menu.menuAttr + "\" menuLevel=\"" + menu.menuLevel + "\" menuId=\"" + menu.menuId + "\" href=\"#\" data-operations=\""
			+ menu.operations + "\" data-src=\"" + ($.cxt + menu.menuUrl) + "\" class=\"dropdown-toggle getSrc\">";
		}else{
			html += "<a menuLevel=\"" + menu.menuLevel + "\" menuId=\"" + menu.menuId + "\" href=\"#\" data-operations=\""
				+ menu.operations + "\" data-src=\"" + ($.cxt + menu.menuUrl) + "\" class=\"dropdown-toggle getSrc\">";
		}
		if(firstActiveMenuId == "") {
			firstActiveMenuId = menu.menuId;//保存第一个url的菜单id
		}
	} else {
		html += "<a href=\"#\" class=\"dropdown-toggle\">";
	}
	var icons=menu.iconPath;
	if(icons == null ){
		icons='fa-caret-right';//子菜单默认图标
	}
	html += "<i class=\"menu-icon fa "+icons+"\"></i>";//菜单前面的小图标
	html += "<span class=\"menu-text\">" + menu.menuName + "</span>";//菜单名称
	if(menu.children != null&&parseInt(menu.menuLevel)>1){
 	   html += "<i class=\"fa fa-angle-double-right \" style='float:right;padding-right:4px'></i>";//有子菜单的右侧放》小图标
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
	var html = "<ul class=\"submenu mlevel"+(parseInt(menu.menuLevel)+1)+"\">";//添加子菜单的ul
	var children = menu.children;//获取子菜单
	for(var i = 0; i < children.length; i ++) {
		if(children[i].children){
			html += "<li class=\"twoLeve hover hsub\">";//子菜单li
		}else{
			html += "<li class=\"twoLeve\">";//子菜单li
		}
			
		
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
	if($this.attr('menuAttr') == '1'){
		openMenu($this.attr('data-src'),$this.attr('menuName'));
	}else{
		$("#contentLoader").attr("src",$this.attr("data-src"))//给iframe赋值src跳转
	}
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
					$obj.css({
						"margin-top":-($obj.height()/2)
					})
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