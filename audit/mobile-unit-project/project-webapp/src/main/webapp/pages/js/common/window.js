var topwindow = {
	//整个弹出页面默认 z-index 100，慢慢往上加
	i : 100,
	removeWindow : function() {
		//说明已经没有弹出框，直接退出
		if(topwindow.i == 100) {
			return;
		}
		var iTemp = topwindow.i;
//		var idTemp = topwindow.id;
		topwindow.i --;
//		topwindow.id = "topwindow" + topwindow.i + "context";
//		/*$("#topwindow" + iTemp + "context").remove();
//		$("#topwindow" + iTemp).remove();*/
//		/**/
////		$("#topwindow" + iTemp + "context").removeClass('transitions').addClass('transitioned1');
//		$("#topwindow" + iTemp).fadeOut(300,function(){
////			$("#topwindow" + iTemp + "context").remove();
//			
//		});
		$("#topwindow" + iTemp).modal('hide')
			$("#topwindow" + iTemp).remove();
		/**/
		return iTemp;
	},
	/**
	 * 弹出框右上角按钮关闭方法
	 */
	closeBtn : function() {
		var iTemp = topwindow.i;
		if(topobj["window_closeBtnFun" + iTemp]) {
			topobj["window_closeBtnFun" + iTemp]();
		}
		topwindow.removeWindow();
	},
	/**
	 * 弹出框关闭方法
	 * @param obj 关闭窗口的时候传过来的参数
	 */
	close : function(obj) {
		var iTemp =topwindow.i;
		if(topobj["window_closeFun" + iTemp] && obj) {
			topobj["window_closeFun" + iTemp](obj);
		}
		topwindow.removeWindow();
	},
	/**
	 * 弹出弹出框
	 * @param obj.url 弹出窗后台url
	 * @param obj.data url所需要的参数
	 * @param obj.width 弹出框的宽度
	 * @param obj.height 弹出框的高度
	 * @param obj.title 弹出框的标题
	 * @param obj.closeFun 关闭弹出框的回调方法
	 * @param obj.closeBtnFun 点击弹出框右上角关闭按钮回调方法
	 * @param obj.fun 弹出框加载完成回调方法
	 * @param obj.check 弹出前是否校验当前页面的数据
	 */
	showWindow : function(obj) {
		if(obj.url == undefined) {
			return;
		}
		$.ajax({
			url : obj.url, 
			data : obj.data,
			type: "POST",
			success : function(data) {
				var windowHeight = $(window).height();
				var windowWidth = $(window).width();
				//alert("height:" + windowHeight + "///width:" + windowWidth);
				topwindow.i ++;
				topwindow.id = "topwindow" + topwindow.i + "context";
				var id = "topwindow" + topwindow.i;
				//默认宽度给1000
				if(obj.width == undefined) {
					obj.width = 900;
				}
				//如果给的宽度大于窗口的，则宽度为窗口宽度
				if(obj.width > windowWidth) {
					obj.width = windowWidth;
				}
				 
				 
				//如果给的高度大于窗口的，则高度为窗口高度
				if(obj.height){
					if(obj.height&&obj.height > windowHeight) {
						obj.height = windowHeight+"px";
					}else{
						obj.height = obj.height+"px";
					}
				}else{
					obj.height="auto";
				}
				
				
				/*var titlee = "";
				if(obj.title == undefined) {
					titlee = "<img src=\"themes/themeDefault/img/x_logo.png\"></img>";
				} else {
					titlee = "<h4 class=\"modal-title\">"+obj.title+"</h4>"
				}*/
				var bodyHeight = obj.height - 40;
				//var bodyHeight = obj.height - 93.85;
				var html = 
				"<div class='modal fade' id='"+id+"'  tabindex='-1' role='dialog'   aria-hidden='true' style='z-index: "+topwindow.i+ ">"+
				  "<div class='modal-dialog'>"+
				
				"<div id="+id+"context\" class=\"modal-content clearfix transitioned\"  >" +
				/**/
					"<div class=\"modal-header\">" + 
						"<button type=\"button\" class=\"close\">" + 
							"<i class=\"confirm-close fa fa-times\"></i>" + 
						"</button>" + 
						"<h4 class=\"modal-title\">" + 
							obj.title +
						"</h4>" +
					"</div>" +
					"<div class=\"modal-body\" style=\"height:500px;overflow:auto;background:transparent !important;\">" +
					"</div>" +
					"<div style=\"display:block !important;background:transparent !important;\" class=\"modal-bottom\">" +
					"</div>" + 
				"</div>"+
				"</div>"+
				"</div>";
				
				html = $(html);
				
				html = '<div class="modal fade in" id="'+id+'" tabindex="-1" role="dialog"   aria-hidden="true"  data-keyboard="false" data-backdrop="static"  style="overflow:hidden; display:block;max-height:'+windowHeight+'px" >'+
					'<div class="modal-dialog"  style="width:'+obj.width+'px; " >'+
				'<div class="modal-content" >'+
					'<div class="modal-header">'+
						'<button type="button" class="close" data-dismiss="modal">'+
						'&times;'+
						'</button>'+
					'	<h4 class="modal-title"><i class="ace-icon fa fa-users">'+obj.title+'</i></h4>'+
					'</div>'+
					'<div id="'+id+'modal-body" class="modal-body clearfix" style="height:'+obj.height+';overflow:auto;margin:0 auto;border-radius:0px 0px 8px 8px;background:transparent !important;">'+
				     
					'</div>'+
					"<div style=\"display:block;background:transparent !important;\" class=\"modal-bottom\">"+
				'</div>'+
			'</div>'+
		'</div>';
				$("body").append(html);
				 
				
				/**/
//				$("#"+id).fadeIn(300,function(){
//					$("#"+id+"context").addClass('transitions')
//					$("#"+id+"context").addClass('in');
//				});
				$('#'+id).modal('show');	
				$("#" + id + "modal-body").html(data);
				/**/
				if(obj.bottons != undefined) {
					for(var i = 0; i < obj.bottons.length; i++) {
						var botton = obj.bottons[i];
						var bottonCss = "btn-primary";
						if(botton.css != undefined) {
							bottonCss = botton.css;
						}
						var btnHtml = "<button id=\"" + id + "contextBtn" + i + "\" class=\"btn "
						+ bottonCss + "\"" + (i!=(obj.bottons.length-1)?" style=\"margin-right:10px;\"":"") + ">"
						+ botton.title + "</button>";
							
						$("#" + id + " .modal-bottom").append(btnHtml);
						$("#" + id + "contextBtn" + i).click(botton.fun);
					}
					if( obj.bottons.length ==0){
						$("#" + id + " .modal-bottom").height(20);
					}
				}else{
					$("#" + id + " .modal-bottom").hide();
				}
//				topsetWindowCenter($("#" + id + "context"));
				$("#" + id + " .close").click(function(){
					//关闭按钮调用方法
					topwindow.closeBtn();
				});
//				//手动关闭回调方法
//				topobj["window_closeFun" + topwindow.i] = obj.closeFun;
//				//关闭按钮关闭回调方法
//				topobj["window_closeBtnFun" + topwindow.i] = obj.closeBtnFun;
//				//添加弹出窗内容
				
//				 
				 
				
				$('#'+id).on('shown.bs.modal', function () {
					   var d = $("#" + id + " .modal-dialog");
					   var windowHeight = $(window).height();
					   if(d.height()+d.offset().top>windowHeight){
						   $("#" + id ).height(windowHeight); 
						   $("#" + id + " .modal-backdrop").height(windowHeight); 
						    var t = d.offset().top +d.height() -windowHeight;//总共超出量
						    t= t - (d.offset().top-30)+20 ;  //距离上边界30，下边界20
						    if(t>0){
						    	var m = $("#" + id + "modal-body");
						    	var h = m.height()-t;
						    	m.height(h);
						    } 
						    d.offset({top:30});
					   }
					   
					})
					if(obj.fun) {
							obj.fun();
						}
				$('#'+id).on('hidden.bs.modal', function () {
					$("#topwindow" + topwindow.i).remove();
					topwindow.i --;
				})
			}
		});
	},
 


showHtmlWindow : function(infoHtml,obj) {
			var windowHeight = $(window).height();
			var windowWidth = $(window).width();
			//alert("height:" + windowHeight + "///width:" + windowWidth);
			topwindow.i ++;
			topwindow.id = "topwindow" + topwindow.i + "context";
			var id = "topwindow" + topwindow.i;
			//默认宽度给1000
			if(obj.width == undefined) {
				obj.width = 800;
			}
			//如果给的宽度大于窗口的，则宽度为窗口宽度
			if(obj.width > windowWidth) {
				obj.width = windowWidth;
			}
			//默认高度给700
			if(obj.height == undefined) {
				obj.height = 500;
			}
			//如果给的高度大于窗口的，则高度为窗口高度
			if(obj.height > windowHeight) {
				obj.height = windowHeight;
			}
			/*var titlee = "";
			if(obj.title == undefined) {
				titlee = "<img src=\"themes/themeDefault/img/x_logo.png\"></img>";
			} else {
				titlee = "<h4 class=\"modal-title\">"+obj.title+"</h4>"
			}*/
			
			var bodyHeight = obj.height - 40;
			var html = 
			"<div id=\""+id+"\" style=\"z-index: "+topwindow.i+"\" class=\"fullBackground\"></div>" +
			"<div id=\""+id+"context\" class=\"modal-content fade transitioned\" style=\"margin-top:0px;position:absolute;width: "+obj.width+"px;height:"+obj.height+"px;z-index: "+topwindow.i+";\">" +
			/**/
				"<div class=\"modal-header\">" + 
					"<button type=\"button\" class=\"close\">" + 
						"<i class=\"confirm-close fa fa-times\"></i>" + 
					"</button>" + 
					"<h4 class=\"modal-title\">" + 
						obj.title +
					"</h4>" +
				"</div>" +
				"<div class=\"modal-body\" style=\"height: "+bodyHeight+"px;overflow:auto;background:transparent !important;\">" +
				"</div>" +
				"<div style=\"display:block !important;background:transparent !important;\" class=\"modal-bottom\">" +
				"</div>" + 
			"</div>"
		  	html = '<div class="modal fade in" id="'+id+'" tabindex="-1" role="dialog"   aria-hidden="true" data-keyboard="false"  data-backdrop="static"  style="overflow:hidden; display:block;max-height:'+windowHeight+'px" >'+
			'<div class="modal-dialog"   >'+
			'<div class="modal-content" style="width:'+obj.width+'px; ">'+
				'<div class="modal-header" style="background:transparent !important;">'+
					'<button type="button" class="close" data-dismiss="modal">'+
					'	<i class="confirm-close fa fa-times"></i>'+
					'</button>'+
				'	<h4 class="modal-title">'+obj.title+'</h4>'+
				'</div>'+
				'<div id="'+id+'modal-body" class="modal-body clearfix" style="height:'+obj.height+'px;overflow:auto;margin:0 auto;border-radius:0px 0px 8px 8px;background:transparent !important;">'+
			     
				'</div>'+
				"<div style=\"display:block !important;background:transparent !important;\" class=\"modal-bottom\">"+
			'</div>'+
		'</div>'+
	'</div>';
				
			$("body").append(html);
		 
			$('#'+id).modal('show');	
			$("#" + id + "modal-body").html(infoHtml);
			/**/
			if(obj.bottons != undefined) {
				for(var i = 0; i < obj.bottons.length; i++) {
					var botton = obj.bottons[i];
					var bottonCss = "btn-primary";
					if(botton.css != undefined) {
						bottonCss = botton.css;
					}
					var btnHtml = "<button id=\"" + id + "contextBtn" + i + "\" class=\"btn "
					+ bottonCss + "\"" + (i!=(obj.bottons.length-1)?" style=\"margin-right:10px;\"":"") + ">"
					+ botton.title + "</button>";
					$("#" + id + " .modal-bottom").append(btnHtml);
					$("#" + id + "contextBtn" + i).click(botton.fun);
				}
				if( obj.bottons.length ==0){
					$("#" + id + " .modal-bottom").height(20);
				}
			}else{
				$("#" + id + " .modal-bottom").hide();
			}
//			topsetWindowCenter($("#" + id + "context"));
			$("#" + id + " .close").click(function(){
				//关闭按钮调用方法
				topwindow.closeBtn();
			});
//			//手动关闭回调方法
//			topobj["window_closeFun" + topwindow.i] = obj.closeFun;
//			//关闭按钮关闭回调方法
			topobj["window_closeBtnFun" + topwindow.i] = obj.closeBtnFun;
//			//添加弹出窗内容
			
//			 
			 
			
			$('#'+id).on('shown.bs.modal', function () {
//				
//				   var d = $("#" + id + " .modal-dialog");
//				    
//				   var windowHeight = $(window).height();
//				   if(d.height()+d.offset().top>windowHeight){
//					   $("#" + id ).height(windowHeight); 
//					   $("#" + id + " .modal-backdrop").height(windowHeight); 
//					    var t = d.offset().top +d.height() -windowHeight;//总共超出量
//					    t= t - (d.offset().top-30)+20 ;  //距离上边界30，下边界20
//					    if(t>0){
//					    	var m = $("#" + id + "modal-body");
//					    	var h = m.height()-t;
//					    	m.height(h);
//					    } 
//					    d.offset({top:30});
//				   }
				   
				})
				if(obj.fun) {
						obj.fun();
					}
	 
}
}

var topmyDragging=function(validateHandler){ //参数为验证点击区域是否为可移动区域，如果是返回欲移动元素，负责返回null
    var draggingObj=null; //dragging Dialog
    var diffX=0;
    var diffY=0;
    
    function mouseHandler(e){
        switch(e.type){
            case 'mousedown':
                draggingObj=validateHandler(e);//验证是否为可点击移动区域
                if(draggingObj!=null){
                    diffX=e.clientX-draggingObj.offsetLeft;
                    diffY=e.clientY-draggingObj.offsetTop;
                }
                break;
            
            case 'mousemove':
                if(draggingObj){
                    draggingObj.style.left=(e.clientX-diffX)+'px';
                    draggingObj.style.top=(e.clientY-diffY)+'px';
                }
                break;
            
            case 'mouseup':
                draggingObj =null;
                diffX=0;
                diffY=0;
                break;
        }
    };
    
    return {
        enable:function(){
        	$(document).mousedown(mouseHandler);
        	$(document).mousemove(mouseHandler);
        	$(document).mouseup(mouseHandler);
            /*document.addEventListener('mousedown',mouseHandler);
            document.addEventListener('mousemove',mouseHandler);
            document.addEventListener('mouseup',mouseHandler);*/
        },
        disable:function(){
        	$(document).mousedown(mouseHandler);
        	$(document).mousemove(mouseHandler);
        	$(document).mouseup(mouseHandler);
            /*document.removeEventListener('mousedown',mouseHandler);
            document.removeEventListener('mousemove',mouseHandler);
            document.removeEventListener('mouseup',mouseHandler);*/
        }
    }
}

function getDraggingDialog(e){
    var target=e.target;
    
    while(target &&target.className!=undefined &&typeof(target.className)=="string" && target.className.indexOf('modal-header')==-1 && target.className.indexOf('modal-title')==-1){
        target=target.offsetParent;
    }
    if(target!=null){
        return target.offsetParent;
    }else{
        return null;
    }
}
    
topmyDragging(getDraggingDialog).enable();