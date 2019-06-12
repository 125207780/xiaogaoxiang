//声明desktop空间,封装相关操作
myLib.NS("desktop");
myLib.desktop={
	winWH:function(){
		$('body').data('winWh',{'w':$(window).width(),'h':$(window).height()});
 	},
	desktopPanel:function(){
		$('body').data('panel',{
					   'taskBar':{
					   '_this':$('#taskBar'),
					   'task_lb':$('#task_lb')
										},
					   'lrBar':{
					   '_this':$('#lr_bar'),	   
					   'default_app':$('#default_app'),
				       'start_block':$('#start_block'),
				       'start_btn':$('#start_btn'),
					   'start_item':$('#start_item'),
					   'default_tools':$('#default_tools')
							},				
						'deskIcon':{
							'_this':$('#deskIcon'),
							'icon':$('.desktop_icon')
							},
						'powered_by':$('a.powered_by')
						});
		},
	getMydata:function(){
		return $('body').data();
		},
	mouseXY:function(){
		var mouseXY=[];
		$(document).bind('mousemove',function(e){ 
			mouseXY[0]=e.pageX;
			mouseXY[1]=e.pageY;
           });
		return mouseXY;
		},	
	contextMenu:function(jqElem,data,menuName,textLimit){
		  var _this=this
		      ,mXY=_this.mouseXY();
		  
          jqElem
		  .smartMenu(data,{
            name: menuName,
			textLimit:textLimit,
			afterShow:function(){
				var menu=$("#smartMenu_"+menuName);
				var myData=myLib.desktop.getMydata(),
		            wh=myData.winWh;//获取当前document宽高
 				var menuXY=menu.offset(),menuH=menu.height(),menuW=menu.width();
				if(menuXY.top>wh['h']-menuH){
					menu.css('top',mXY[1]-menuH-2);
					}
				if(menuXY.left>wh['w']-menuW){
					menu.css('left',mXY[0]-menuW-2);
					}	
				}
           });
		  $(document.body).click(function(event){
			event.preventDefault(); 			  
			$.smartMenu.hide();
						  });
		}	
	}
	
//窗口相关操作
myLib.NS("desktop.win");
myLib.desktop.win={
	winHtml:function(title,url,id){
		return "<div class='windows corner rgba' id="
		+id
		+"><div class='win_title'><b>"
		+title
		//屏蔽最大化按钮
		//+"</b><span class='win_btnblock'><a href='#' class='winMinimize' title='最小化'></a><a href='#' class='winMaximize' title='最大化'></a><a href='#' class='winHyimize' title='还原'></a><a href='#' class='winClose' title='关闭'></a></span></div><iframe frameborder='0' name='myFrame_"
		+"</b><span class='win_btnblock'><a href='#' class='winMinimize' title='最小化'></a><a href='#' class='winHyimize' title='还原'></a><a href='#' class='winClose' title='关闭'></a></span></div><iframe frameborder='0' name='myFrame_"
		+id
		+"' id='myFrame_"
		+id
		+"' class='winframe' scrolling='auto' width='100%' src='"
		+url
		+"'></iframe><a class='back_tri' onclick='window.history.go(-1);'></a></div>";
		},
	 //添加遮障层，修复iframe 鼠标经过事件bug	
	iframFix:function(obj){
		obj.each(function(){
		var o=$(this);								
		if(o.find('.zzDiv').size()<=0)
		o.append($("<div class='zzDiv' style='width:100%;height:"+(o.innerHeight()-45)+"px;position:absolute;z-index:900;left:0;top:45px;'></div>"));
				 })
		},	
	//获取当前窗口最大的z-index值
	maxWinZindex:function($win){
		   return Math.max.apply(null, $.map($win, function (e, n) {
           if ($(e).css('position') == 'absolute')
            return parseInt($(e).css('z-index')) || 1;
              }));
			},
	findTopWin:function($win,maxZ){
		var topWin;
		$win.each(function(index){
 						   if($(this).css("z-index")==maxZ){
							   topWin=$(this);
							   return false;
							   } 
 						   });
		return topWin;  
		},		
	//关闭窗口	
	closeWin:function(obj){
		var _this=this,$win=$('div.windows').not(":hidden"),maxZ,topWin;
 		myLib.desktop.taskBar.delWinTab(obj);
		obj.hide('slow',function(){
			$(this).remove();
				         });
		//当关闭窗口后寻找最大z-index的窗口并使其出入选择状态
		if($win.size()>1){
		maxZ=_this.maxWinZindex($win.not(obj));
		topWin=_this.findTopWin($win,maxZ);
		_this.switchZindex(topWin);
		}
		},
	minimize:function(obj){
		var _this=this,$win=$('div.windows').not(":hidden"),maxZ,topWin,objTab;
		obj.hide();
		//最小化窗口后，寻找最大z-index窗口至顶
		if($win.size()>1){
		maxZ=_this.maxWinZindex($win.not(obj));
		topWin=_this.findTopWin($win,maxZ);
		_this.switchZindex(topWin);
		}else{
			objTab=myLib.desktop.taskBar.findWinTab(obj);
			objTab.removeClass('selectTab').addClass('defaultTab');
			}
		},	
	//最大化窗口函数	
	maximizeWin:function(obj){
		var myData=myLib.desktop.getMydata(),
		    wh=myData.winWh;//获取当前document宽高
		obj
		.css({'width':wh['w'],'height':wh['h']-35,'left':0,'top':0})
		.draggable( "disable" )
		.resizable( "disable" )
		.fadeTo("fast",1)
		.find(".winframe")
		.css({'width':wh['w'],'height':wh['h']});
		},
	//还原窗口函数	
	hyimizeWin:function(obj){
		var myData=obj.data(),
		    winLocation=myData.winLocation;//获取窗口最大化前的位置大小
			
		obj.css({'width':winLocation['w'],'height':winLocation['h'],'left':winLocation['left'],'top':winLocation['top']})
		.draggable( "enable" )
		.resizable( "enable" ) 
		.find(".winframe")
		.css({'width':winLocation['w'],'height':winLocation['h']-45});
		},	
	//交换窗口z-index值		
	switchZindex:function(obj){
		var myData=myLib.desktop.getMydata()
		    ,$topWin=myData.topWin
			,$topWinTab=myData.topWinTab
		    ,curWinZindex=obj.css("z-index")
			,maxZ=myData.maxZindex
			,objTab=myLib.desktop.taskBar.findWinTab(obj);
			
		if(!$topWin.is(obj)){
			
		obj.css("z-index",maxZ);
		objTab.removeClass('defaultTab').addClass('selectTab');
		
		$topWin.css("z-index",curWinZindex);
		$topWinTab.removeClass('selectTab').addClass('defaultTab');
		this.iframFix($topWin);
		//更新最顶层窗口对象
		$('body').data("topWin",obj).data("topWinTab",objTab);
		}
		},
	//新建窗口实例	
    newWin:function(options){
		var _this=this;
		
		var myData=myLib.desktop.getMydata(),
		    wh=myData.winWh,//获取当前document宽高
			$windows=$("div.windows"),
			curwinNum=myLib._is(myData.winNum,"Number")?myData.winNum:0;//判断当前已有多少窗口
			_this.iframFix($windows);
		//默认参数配置
        var defaults = {
            WindowTitle:          null,
			WindowsId:            null,
            WindowPositionTop:    'center',                          /* Posible are pixels or 'center' */
            WindowPositionLeft:   'center',                          /* Posible are pixels or 'center' */
            WindowWidth:          Math.round(wh['w']),           /* Only pixels */
            WindowHeight:         Math.round(wh['h']),           /* Only pixels */
            WindowMinWidth:       250,                               /* Only pixels */
            WindowMinHeight:      250,                               /* Only pixels */
		    iframSrc:             null,                              /* 框架的src路径*/ 
            WindowResizable:      true,                              /* true, false*/
            WindowMaximize:       true,                              /* true, false*/
            WindowMinimize:       true,                              /* true, false*/
            WindowClosable:       true,                              /* true, false*/
            WindowDraggable:      true,                              /* true, false*/
            WindowStatus:         'regular',                         /* 'regular', 'maximized', 'minimized' */
            WindowAnimationSpeed: 500,
            WindowAnimation:      'none'
        };
		  
		var options = $.extend(defaults, options);
 		 
		//判断窗口位置，否则使用默认值
		var wLeft=myLib._is(options['WindowPositionLeft'],"Number")?options['WindowPositionLeft']:(wh['w']-options['WindowWidth'])/2;
		var wTop=myLib._is(options['WindowPositionTop'],"Number")?options['WindowPositionTop']:(wh['h']-options['WindowHeight'])/2;
 		 
		//给窗口赋予新的z-index值
		var zindex=curwinNum+100;
		var id="myWin_"+options['WindowsId'];//根据传来的id将作为新窗口id
 		$('body').data("winNum",curwinNum+1);//更新窗口数量
		
		//判断如果此id的窗口存在，则不创建窗口
		if($("#"+id).size()<=0){
			//在任务栏里添加tab
			myLib.desktop.taskBar.addWinTab(options['WindowTitle'],options['WindowsId']);
			//初始化新窗口并显示
			$("body").append($(_this.winHtml(options['WindowTitle'],options['iframSrc'],id)));
		
		var $newWin=$("#"+id)
		   ,$icon=$("#"+options['WindowsId'])
		   ,$iconOffset=$icon.offset()
		   ,$fram=$newWin.children(".winframe")
		   //屏蔽最大化按钮
		   //,winMaximize_btn=$newWin.find('a.winMaximize')//最大化按钮
		   ,winMinimize_btn=$newWin.find('a.winMinimize')//最小化按钮
		   ,winClose_btn=$newWin.find('a.winClose')//关闭按钮
		   ,winHyimize_btn=$newWin.find('a.winHyimize');//还原按钮
		   
		   winHyimize_btn.hide();
		   //屏蔽最大化按钮
		   //if(!options['WindowMaximize']) winMaximize_btn.hide();
		   if(!options['WindowMinimize']) winMinimize_btn.hide();
		   if(!options['WindowClosable']) winClose_btn.hide();
		
		//存储窗口最大的z-index值,及最顶层窗口对象
		$('body').data({"maxZindex":zindex,"topWin":$newWin});
		
		//判断窗口是否启用动画效果
		if(options.WindowAnimation=='none'){
			$newWin
			.css({"width":options['WindowWidth'],"height":options['WindowHeight'],"left":wLeft,"top":wTop,"z-index":zindex})
			.addClass("loading")
			.show();
		}else{
			$newWin
			.css({"left":$iconOffset.left,"top":$iconOffset.top,"z-index":zindex})
			.addClass("loading")
			.show()
			.animate({ 
				width: options['WindowWidth'], 
				height:options['WindowHeight'],
				top: wTop, 
				left: wLeft}, 500);
		}
				
        $newWin
		.data('winLocation',{
			  'w':options['WindowWidth'],
			  'h':options['WindowHeight'],
			  'left':wLeft,
			  'top':wTop
			  })
		.find(".winframe")
		.css({"width":options['WindowWidth'],"height":options['WindowHeight']-45})
		
		//等待iframe加载完毕
		//.load(function(){
					   
 		   //调用窗口拖动,参数可拖动的范围上下左右，窗口id和，浏览器可视窗口大小
		   if(options['WindowDraggable']){
		   _this.drag([0,0,wh['w']-options['WindowWidth']-10,wh['h']-options['WindowHeight']-35],id,wh);
		   }
		   //调用窗口resize,传递最大最小宽度和高度，新窗口对象id，浏览器可视窗口大小
		   if(options['WindowResizable']){
		   _this.resize(options['WindowMinWidth'],options['WindowMinHeight'],wh['w']-wLeft,wh['h']-wTop-35,id,wh);
		   }
		   //当改变浏览器窗口大小时，更新其拖动和拖曳区域大小
		   $(window).wresize(function(){
 						_this.upWinDrag_block($newWin);
						_this.upWinResize_block($newWin);
										  });
		      
							//});
		
		//如果有多个窗口，当单击某个窗口，则使此窗口显示到最上面
		if(curwinNum){
			var $allwin=$("div.windows");
			$allwin.bind({
						 "mousedown":function(event){  
				                _this.switchZindex($(this));
									},
						 "mouseup":function(){
							 $(this).find('.zzDiv').remove();
							 }		
								});
			}
			
		//窗口最大化，最小化，及关闭
		winClose_btn.click(function(event){
					 event.stopPropagation();
 					 _this.closeWin($(this).parent().parent().parent());
									  });
		//最大化
//		winMaximize_btn.click(function(event){
//					 event.stopPropagation();			   
//					 if(options['WindowStatus']=="regular"){								 
//					 _this.maximizeWin($(this).parent().parent().parent());
//					 $(this).hide();
//					 winHyimize_btn.show();
//					 options['WindowStatus']="maximized";
//					 }
// 						});
		//还原窗口
		winHyimize_btn.click(function(event){
					 event.stopPropagation();				  
					 if(options['WindowStatus']=="maximized"){								 
					 _this.hyimizeWin($(this).parent().parent().parent());
					 $(this).hide();
					 //winMaximize_btn.show();
					 options['WindowStatus']="regular";
					 }		  
									  });
		//最小化窗口
		winMinimize_btn.click(function(){
						_this.minimize($(this).parent().parent().parent());		   
									   });
		             }else{//如果已存在此窗口，判断是否隐藏
					     var wins=$("#"+id),objTab=myLib.desktop.taskBar.findWinTab(wins);
						 if(wins.is(":hidden")){
							  wins.show();
							  objTab.removeClass('defaultTab').addClass('selectTab');//当只有一个窗口时
						      myLib.desktop.win.switchZindex(wins);
							 }
						
						 }
		},
	upWinResize_block:function(win){
		    
			//更新窗口可改变大小范围,wh为浏览器窗口大小
            var offset=win.offset();
		    win.resizable( "option" ,{'maxWidth':$(window).width()-offset.left-10,'maxHeight':$(window).height()-offset.top-35})
		},
	upWinDrag_block:function(win){
		   var h=win.innerHeight()
		      ,w=win.innerWidth();
			
			//更新窗口可拖动区域大小
		    win.draggable( "option", "containment", [10,10,$(window).width()-w-10,$(window).height()-h-35] )
		},	
	drag:function(arr,win_id,wh){
		var _this=this;
		$("#"+win_id)
		.draggable({ 
	    handle: "#"+win_id+' .win_title',
	    iframeFix:false,
	    containment:arr,
		delay: 50 ,
		distance: 30
		})
		.bind("dragstart",function(event,ui){
 					_this.iframFix($(this));	  
						  })
		.bind( "dragstop", function(event, ui) {
			var obj_this=$(this);	
			
			var offset=obj_this.offset();
			//计算可拖曳范围
			_this.upWinResize_block(obj_this);
			
		    obj_this
			//更新窗口存储的位置属性
			.data('winLocation',{
			'w':obj_this.width(),
			'h':obj_this.height(),
			'left':offset.left,
			'top':offset.top
			})
			.find('.zzDiv').remove();
         }); 
		
		   //$("div.win_title").css("cursor","move");
		},
	resize:function(minW,minH,maxW,maxH,win_id,wh){
		var _this=this;
		$("#"+win_id)
		.resizable({
		minHeight:minH,
		minWidth:minW,
		containment:'document',
		maxWidth:maxW,
		maxHeight:maxH
		})
		.css("position","absolute")
		.bind( "resize", function(event, ui) {
			var h=$(this).innerHeight(),w=$(this).innerWidth(); 	
 			 _this.iframFix($(this));
			 
			//拖曳改变窗口大小，更新iframe宽度和高度，并显示iframe					 
			$(this).children(".winframe").css({"width":w,"height":h-45});
				
        })
	   .bind( "resizestop", function(event, ui) {					 
			var obj_this=$(this);
			var offset=obj_this.offset();
			var h=obj_this.innerHeight(),w=obj_this.innerWidth();
			
			//更新窗口可拖动区域大小
			_this.upWinDrag_block(obj_this);
			
		    obj_this
			//更新窗口存储的位置属性
			.data('winLocation',{
			'w':w,
			'h':h,
			'left':offset.left,
			'top':offset.top
			  })
			 //删除遮障iframe的层
			.find(".zzDiv").remove();
       });
		}
	}
	


/*----------------------------------------------------------------------------------	
//声明任务栏空间，任务栏相关js操作
----------------------------------------------------------------------------------*/
myLib.NS("desktop.taskBar");
myLib.desktop.taskBar={
	timer:function(obj){
		 var curDaytime=new Date().toLocaleString().split(" ");
		 obj.innerHTML=curDaytime[1];
		 obj.title=curDaytime[0];
		 setInterval(function(){obj.innerHTML=new Date().toLocaleString().split(" ")[1];},1000);
		},
	upTaskWidth:function(){
		var myData=myLib.desktop.getMydata()
		    ,$task_bar=myData.panel.taskBar['_this'];
		var maxHdTabNum=Math.floor($(window).width()/100);
		    //计算任务栏宽度
		    $task_bar.width(maxHdTabNum*100);	
			//存储活动任务栏tab默认组数
			$('body').data("maxHdTabNum",maxHdTabNum-2);
		},	
	init:function(){
		//读取元素对象数据
		var myData=myLib.desktop.getMydata();
 		var $task_lb=myData.panel.taskBar['task_lb']
		    ,$task_bar=myData.panel.taskBar['_this']
			,wh=myData.winWh;
 
		 var _this=this;
		 _this.upTaskWidth();
		 //当改变浏览器窗口大小时，重新计算任务栏宽度
		 $(window).wresize(function(){
						_this.upTaskWidth();   
								   });
  		 
 		},
	contextMenu:function(tab,id){
		var _this=this;
		 //初始化任务栏Tab右键菜单
		 var data=[
					/*[{
					text:"最大化",
					func:function(){
 						$("#myWin_"+tab.data('win')).find('a.winMaximize').trigger('click');
						}
					  },{
					text:"最小化",
					func:function(){
						myLib.desktop.win.minimize($("#myWin_"+tab.data('win')));
						}
						  }]
					,*/[{
					  text:"关闭",
					  func:function(){
						  $("#smartMenu_taskTab_menu"+id).remove();
 						  myLib.desktop.win.closeWin($("#myWin_"+tab.data('win')));
						  } 
					  }]
					];
		 myLib.desktop.contextMenu(tab,data,"taskTab_menu"+id,10);
		},
	addWinTab:function(text,id){
		var myData=myLib.desktop.getMydata();
 		var $task_lb=myData.panel.taskBar['task_lb']
		    ,$task_bar=myData.panel.taskBar['_this']
		    ,tid="myWinTab_"+id
		    ,$close="myWinTab_"+id
			,allTab=$task_lb.find('a')
			,curTabNum=allTab.size()
		    ,docHtml="<a href='#' id='"+tid+"'>"+text+"<div class='"+$close+" closeBtn' title='点击关闭'><i class='fa fa-times'></i></div></a>";
			
			//添加新的tab
		    $task_lb.append($(docHtml));
			var $newTab=$("#"+tid);
			//右键菜单
			//this.contextMenu($newTab,id);
			//底部菜单关闭按钮
			$(".myWinTab_"+id).click(function(){
				$("#smartMenu_taskTab_menu"+id).remove();
 				myLib.desktop.win.closeWin($("#myWin_"+$newTab.data('win')));
			});
			$task_lb
			.find('a.selectTab')
			.removeClass('selectTab')
			.addClass('defaultTab');
			 
			$newTab
			.data('win',id)
			.addClass('selectTab')
			.click(function(){
					var win=$("#myWin_"+$(this).data('win'));	
					
					if(win.is(":hidden")){
						win.show();
 						$(this).removeClass('defaultTab').addClass('selectTab');//当只有一个窗口时
						myLib.desktop.win.switchZindex(win);
  						}else{
							if($(this).hasClass('selectTab')){
							myLib.desktop.win.minimize(win);
  							}else{
								myLib.desktop.win.switchZindex(win);
								} 
							  }
 							});
			
			$('body').data("topWinTab",$newTab);
			
			//当任务栏活动窗口数超出时
			if(curTabNum>myData.maxHdTabNum-1){
				var LeftBtn=$('#leftBtn')
				    ,rightBtn=$('#rightBtn')
					,bH;
				
                LeftBtn
				.show()
				.find("a")
				.click(function(){
							        var pos=$task_lb.position();
									if(pos.top<0){
										$task_lb.animate({
                                                  "top":pos.top+40
                                                      }, 50);
										}
									 });
				
				rightBtn
				.show()
				.find("a")
				.click(function(){
									var pos=$task_lb.position(),h=$task_lb.height(),row=h/40;
									if(pos.top>(row-1)*(-40)){
									$task_lb.animate({
                                                  "top": pos.top-40
                                                      }, 50);   
									}
									   });
				
				$task_lb.parent().css("margin","0 100");
				}
	 
		},
	delWinTab:function(wObj){
		var myData=myLib.desktop.getMydata()
 		    ,$task_lb=myData.panel.taskBar['task_lb']
			,$task_bar=myData.panel.taskBar['_this']
			,LeftBtn=$('#leftBtn')
			,rightBtn=$('#rightBtn')
		    ,pos=$task_lb.position();
			
		this.findWinTab(wObj).remove();
		
		var newH=$task_lb.height();
		if(Math.abs(pos.top)==newH){
			LeftBtn.find('a').trigger("click");
			}
		if(newH==40){
			LeftBtn.hide();
			rightBtn.hide();
			$task_lb.parent().css("margin",0);
			}	
		},
	findWinTab:function(wObj){
		var myData=myLib.desktop.getMydata(),
		    $task_lb=myData.panel.taskBar['task_lb'],
		    objTab;
		    $task_lb.find('a').each(function(index){
								var id="#myWin_"+$(this).data("win");		 
								if($(id).is(wObj)){
									objTab=$(this);
									}		 
 										 });
		    return objTab;
		}	
	}
	
//桌面图标
myLib.NS("desktop.deskIcon");
myLib.desktop.deskIcon={
	//桌面图标排列
	arrangeIcons:function(){
		 var myData=myLib.desktop.getMydata()
		    ,winWh=myData.winWh
			,$deskIconBlock=myData.panel.deskIcon['_this']
			,$icon=myData.panel.deskIcon['icon'];					
 		return $icon;
		},
	init:function(){
		 //将当前窗口宽度和高度数据存储在body元素上
		 myLib.desktop.winWH();
		 var _this=this;//调用父级对象
		 var $icon=_this.arrangeIcons();		 
		 //单击图标打开窗口
		 $icon.click(function(){
							var title=$(this).find(".text").text(),wid=this.id;
							//点击模块添加到审计表 （李洪亮 2017、05、10）
							$.ajax({
								type : "post",
								async: false,
								loading:false,
								url : $.cxt + "/index/addAccessLog",
								data : {name : title},
								dataType: "json"
							});
							
							var href= this.getAttribute("path");
							
							myLib.desktop.win.newWin({
													 WindowTitle:title,
													 iframSrc:href,
													 WindowsId:wid,
													 WindowAnimation:'none'
 										});					
						});
	 
			}
	}

//当页面加载完毕执行
$(function(){
		   //存储桌面布局元素的jquery对象
		   myLib.desktop.desktopPanel();
		   //初始化任务栏
		   myLib.desktop.taskBar.init();
		   //初始化桌面图标
		   myLib.desktop.deskIcon.init();		  		   
		   })