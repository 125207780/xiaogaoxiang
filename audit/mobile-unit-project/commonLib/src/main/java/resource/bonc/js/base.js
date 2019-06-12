var topobj = {}
/**
 * 扩展Jquery命名空间
 */
$(function(){
	$.cxt=getContextPath();
	
	$.imgCxt="/img";
	
	/**
	 * 获取GET参数
	 * @returns
	 */
	$.getArgs=function(str) {
	    var args = {};
	    var match = null;
	    var search = decodeURIComponent(location.search.substring(1));
	    var reg = /(?:([^&]+)=([^&]+))/g;
	    while((match = reg.exec(search))!==null){
	        args[match[1]] = match[2];
	    }
	    if(str){
	    	return args[str];
	    }
	    return args;
	 }
	
	/**
	 * 获取顶级对象（Iframe嵌套时获取顶部对象）
	 */
	$.getTopObj=function(obj){
		var _parent;
		if(obj==obj.parent){
			return obj.location;
		}
		else{
			_parent=obj.parent;
		}
		return $.getTopObj(_parent);
	}
	
	/*把表单转成json,并且name为key,value为值*/
	$.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined){
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};
	
	/**
	 * Jquery Ajax扩展
	 */
	
    // 1.备份jquery的ajax方法    
    var _ajax=$.ajax;  
    
    // 重写ajax方法，先判断状态在执行success函数   
    $.ajax=function(opt){  
    
    	//登录方法排除
    	if(opt.url!=$.cxt+'/index/login'){
	        var _success = opt && opt.success || function(a, b){};
	        var _complete = opt && opt.complete || function(a, b){};
	        var _error = opt && opt.error || function(a, b, c){};
	        var _opt = $.extend(opt, {
	        	beforeSend: function(){
	        			if(opt.loading==undefined){
	        					var bodyHeight=$(window).height(); 	        					
	        					var loading="<div class='modal-backdrop fade in' id='loadings' style='height:"+bodyHeight+"px;width:100%;position:fixed;z-index:99999;text-align:center;line-height:"+bodyHeight+"px;'></div>";
	        					$("body").append(loading);
	        					$.fn.spin = function(opts) {
	        						this.each(function() {
	        						var $this = $(this),
	        							data = $this.data();
	        							data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);	        						  
	        						});
	        						return this;
	        					};
	        				    $("#loadings").spin({
	        				    	lines: 12,      
	        				        length: 7,           
	        				        width: 5
	        				    })    				      
	        				}
	        		    },
	            success:function(data, textStatus){ 
	            	if(opt.loading==undefined){
	            		$("#loadings").remove();
	            		
	            	}
	            	var _data;
	             	try{
	             		_data=$.parseJSON(data);	
	             	}
	             	catch(e){
	             		_data=data;
                	}
	             	if(_data.code){
		                if(_data.code=="-2") {  
		                	var ulObj=$("<ul></ul>").addClass("list-unstyled spaced2")
					                	.append(
					                		$("<li></li>")
					                		.addClass("text-warning bigger-110 orange")
					                		.append($("<i></i>").addClass("ace-icon fa fa-exclamation-triangle"))
					                		.append("您的登录会话已经超时")
					                	)
					                	.append(
					                		$("<li></li>")
					                		.addClass("text-warning bigger-110 orange")
					                		.append($("<i></i>").addClass("ace-icon fa fa-exclamation-triangle"))
					                		.append("请重新登录")
					                	)
		                	var msgHtml=$("<div></div>").append(ulObj).html();
		                    bootbox.confirm({
		                        message: msgHtml,
		                        title: "消息提示",
		                        buttons: {
		                            confirm: {
		                                label: '确定',
		                                className: 'btn-blue'
		                            },
		                            cancel: {
		                                label: '关闭',
		                                className: 'btn-grey'
		                            }
		                        },
		                        callback: function (result) {
		                          if(result){
		                        	  var topObj=$.getTopObj(window);
		                        	  topObj.href =$.cxt+'/pages/jsp/login/login.jsp';
		                          }
		                        }
		                    });
		                    return;  
		                }  else if(_data.code=="-1"){
		                	 bootbox.dialog({
		                         message: _data.msg,
		                         title: "消息提示",
		                         buttons: {
		                            OK: {
		                               label: "确定",
		                               className: "btn-blue",
		                            }
		                         }
		                      });
		                }
	             	}
	                _success(data, textStatus);    
	            },
	        complete:function(XHR, TS){
	        		if(opt.loading==undefined){
	            		$("#loadings").remove();
	        		
	            	}
	        		_complete(XHR, TS)
	        		topdoRole();//权限控制
	        	},
	        error:function(XMLHttpRequest, textStatus, errorThrown){
	        		if(opt.loading==undefined){
	            		$("#loadings").remove();
	            	}
	        		bootbox.dialog({
                        message: opt.url + "    访问错误！",
                        title: "消息提示",
                        buttons: {
                           OK: {
                              label: "确定",
                              className: "btn-blue",
                           }
                        }
                     });
	        		_error(XMLHttpRequest, textStatus, errorThrown)
	        	}	
	        });  
	        _ajax(_opt);  
    	}else{
    		_ajax(opt);  
    	}
       
    };  
})

/**
 * 获取工程上下文路径
 * @returns
 */
function getContextPath() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
}
