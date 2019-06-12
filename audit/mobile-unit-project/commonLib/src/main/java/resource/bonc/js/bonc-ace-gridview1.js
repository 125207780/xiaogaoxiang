/**
 * 
 */
(function ($) {
	//严格模式
	"use strict";
	//初始化方法
    var BoncAceGridView = function (element, options) {
        this.init(element, options);
    };
    
    var old=null;
    
    //定义BoncAceGridView的属性和方法
    BoncAceGridView.prototype = {
		//默认参数
    	defaults :{
			url : "",
			datatype : "json",
			mtype : "POST",
			width:300,
			height:300,
			postData:{},
			context:/tenant/,
			desktop:function(cell){return false},
			colNames:[],
			colModel:[],
			button:[
			        {title:"确定",icon:"fa fa-link",callBack:function(e){},visible:function(cell){return true}},
			        {title:"取消",icon:"fa fa-link",callBack:function(e){},visible:function(cell){return true}}
				]
		},
		
		/**
		 * 初始化函数
		 */
    	init: function (element, options) {
            this.$element = $(element);
            this.setOptions(options);
            this.initialized = true;
        },
        
        /**
         * 参数设置函数
         */
        setOptions: function (options) {
            //清空
            this.$element.empty();
            
            //设置参数
            this.options = $.extend({}, (this.options || this.defaults), options); 
            
            //参数验证
            if(!_validateOptions()){
            	return;
            }
            
            //开始渲染
            this.render();
        },
        
        /**
         * 渲染函数
         */
        render: function () {
        	//1.构造容器
        	var containerBasicCss={
        			"margin":"0",
        			"padding":"0",
        			"list-style":"none",
        			"font-family":"微软雅黑"
        		};
        	
        	//2.容器初始化
        	var container=$("<ul></ul>").addClass("clearfix").css(containerBasicCss);
        	
        	
        	//3.将容器添加到外部对象
        	this.$element.append(container);
        	
        	//4.生成页面
        	this._make(container,this)
        	
        	//绑定重载事件
        	var _this=this;
        	this.$element.on("reload",function(){
            	//获取容器
            	var container=_this.$element.children("ul");
            	//清空容器
            	container.empty();
            	//生成页面
            	_this._make(container,_this);
        	});
        },
        
        /**
         * 设置参数
         */
        setParameter:function(options){
        	 this.options.postData = $.extend({},this.options.postData, options); 
        },
        
        /**
         * 生成页面
         */
        _make:function(container,_this){
        	$.ajax({
    			type : _this.options.mtype,
    			url : _this.options.url,
    			data : _this.options.postData,
    			async:false,
    			dataType: _this.options.datatype,
    			success : function(data) {
    	         	try{
    	         		data=$.parseJSON(data);	
	             	}
	             	catch(e){
	             		data=data;
                	}
	             	
    	        	$.each(data.data,function(index,val){
    	        		//生成节点
    	        		_this.buildNode(val).appendTo(container);
    	        	});
    			}
        	});
        },
        
        /**
         * 生成节点
         */
        buildNode:function(nodeObj){
    		var nodeContainerBasicCss={
    				"border":"1px solid #dbdbdb",
    				
    				"width":"23.1%",
    				"background":"#fff",
    				"margin":"1.455% 10px",
    				"margin-top":"0px",
    				"float":"left",
        			"font-family":"微软雅黑"
    		};
    		
    		var nodeContainer=$("<li></li>").addClass("gridViewCon").css(nodeContainerBasicCss);
    		
    		//生成内容
    		_makeContent(nodeObj,this).appendTo(nodeContainer);
    		
    		//生成说明
    		_makeMemo(nodeObj,this).appendTo(nodeContainer);
    		
    		//生成按钮
    		_makeBtn(nodeObj,this).appendTo(nodeContainer);
    		
    		return nodeContainer;
        }
        
    };
    
    
    /**
     * 生成内容
     * @param nodeObj
     * @param _this
     * @returns
     */
    function _makeContent(nodeObj,_this){
    	var contentContainerCss={
    			
    	};
    	var contentContainer=$("<div></div>").css(contentContainerCss);
    	
    	//构造内容容器
    	var ulContainer=$("<ul></ul>").addClass("clearfix").css({"margin":"0","padding":"0","list-style":"none","font-family":"微软雅黑"}).appendTo(contentContainer);
    	
    	//生成列表
    	_makeList(nodeObj,_this).appendTo(ulContainer);
    	
    	
    	//生成缩略图
    	_makeImg(nodeObj,_this).appendTo(ulContainer);
    	
    	//生成app名称
		_makeName(nodeObj,_this).appendTo(ulContainer);
		
		//生成app名称
		_makeMoney(nodeObj,_this).appendTo(ulContainer);
    	
    	return contentContainer;
    }
    
    
    /**
     * 生成缩略图
     * @param nodeObj
     * @param _this
     * @returns
     */
    function _makeImg(nodeObj,_this){
    	var imgContainerCss={
    			"text-align":"center",
    			"width":"100%",
    			"font-family":"微软雅黑",
    			"padding":"5px"
    	};
    	
    	var imgCss={
    			"width":"100%",
    			"height":"140px"
    	}
    	
    	var imgContainer=$("<li></li>").addClass("imgCon").css(imgContainerCss);
    	
   		//设置desktop
    	var desktopObj=_this.options.desktop(nodeObj);
		if(desktopObj){
			imgContainer
			.addClass("desktop_icon")
			.attr("id", desktopObj.id)
			.attr("path", desktopObj.path)
			.css("cursor","pointer")
			.append($("<div></div>").css("display","none").addClass("text").append(desktopObj.title));
		}
    	
    	var imgUrl=_getData(_this,nodeObj,'img').value;
    	
    	$("<img></img>").addClass("gridViewImg").css(imgCss).attr("src",_this.options.context+imgUrl).appendTo(imgContainer);
    	
    	return imgContainer;
    }
    /**
     * 生成app名称
     * @param nodeObj
     * @param _this
     * @returns
     */
    function _makeName(nodeObj,_this){
    	var memoContainerCss={
    			"color":"#f7a831",
                "height":"25px",
                "line-height":"25px",
                "width":"100%",
                "font-size":"16px",
    			"font-family":"微软雅黑",
    			"text-align":"center"
    	};
    	var dataName=_getData(_this,nodeObj,'name').value;
    	if(dataName.length > 15 ){
    		dataName=dataName.substring(0,15)+"...";
    	}
    	return $("<li></li>").addClass("gridViewName").css(memoContainerCss).append(dataName);
    }
    
    /**
     * 生成app金额
     * @param nodeObj
     * @param _this
     * @returns
     */
    function _makeMoney(nodeObj,_this){
    	var memoContainerCss={
    			"color":"#f7a831",
                "height":"30px",
                "line-height":"30px",
                "width":"100%",
                "font-size":"14px",
    			"font-family":"微软雅黑",
    			"text-align":"center"
    	};
    	var dataCost=_getData(_this,nodeObj,'cost').value;
    	if(dataCost.length > 15 ){
    		dataCost=dataCost.substring(0,15)+"...";
    	}
    	return $("<li></li>").addClass("gridViewCost").css(memoContainerCss).append(dataCost);
    }
    
    /**
     * 生成列表
     * @param nodeObj
     * @param _this
     * @returns
     */
    function _makeList(nodeObj,_this){
    	var listContainerCss={
    			"width":"100%",
    			"font-family":"微软雅黑",
    			"padding-right":"5px",
    			"padding-top":"5px",
    			"padding-left":"5px"
    	};
    	
    	var listLiCss={
    			"font-size":"12px",
    			"color":"#b3b3b3",
    			"padding-bottom":"0px",
    			"font-family":"微软雅黑",
    			"float":"right"
    	}
    	
    	var listContainer=$("<li></li>").addClass("listBorder").css(listContainerCss);
    	
    	var listUlObj=$("<ul></ul>").css("list-style","none").addClass("clearfix").appendTo(listContainer);
    	
    	var listData=_getData(_this,nodeObj,'data');
    	
    	$.each(listData,function(index,val){
    		var tmObj=$("<li></li>");
    		//自定义样式
    		if(val.css){
    			tmObj.css(val.css);
    		}
    		else{
    			tmObj.css(listLiCss);
    		}
    		
    		//是否含有标题
    		if(!val.title){
    			tmObj.append(val.value).appendTo(listUlObj);
    		}
    		else{
    			tmObj
    			.append(val.icon)
    			.append($("<span></span>").append(val.title))
    			/*.append($("<span></span>").append(val.value).css({"color":"#d3604b","font-size":"16px","font-weight":"bolder","margin":"0px 2px"}))*/
    			/*.append("次")*/
    			.appendTo(listUlObj)
    		}
    		
    	});
    	
    	
    	
    	return listContainer;
    }

    /**
     * 生成按钮
     * @param nodeObj
     * @param _this
     * @returns
     */
    function _makeBtn(nodeObj,_this){
    	//生成按钮
    	var buttonCss={
    			"buttonStyle":[
    			 {
				    "background":"none",
				    "border":"none",
				    "border-top":"1px solid #dbdbdb",
				    "border-right":"1px solid #dbdbdb",
	                "color":"#8e8db9",
	                "width":"50%",
	                "height":"35px",
	                "line-height":"35px",
	                "text-align":"center",
	                "font-size":"14px",
	                "font-weight":"bolder",
        			"font-family":"微软雅黑"
    	          },
    			  {
    	        	"background":"none",
    	        	"border":"none",
    	        	"border-top":"1px solid #dbdbdb",
	                "color":"#68b9d6",
	                "width":"50%",
	                "height":"35px",
	                "line-height":"35px",
	                "text-align":"center",
	                "font-size":"14px",
	                "font-weight":"bolder",
        			"font-family":"微软雅黑"
    			  }
    			 ]
    	}
    	var btnLiObj=$("<div></div>");
    	//支持visiable函数
    	var buttonArr=[];
    	$.each(_this.options.button,function(key,val){
    		if(!val.visible){
    			buttonArr.push(val);
    		}
    		else {
    			if(val.visible(nodeObj)){
    				buttonArr.push(val);
    			}
    		}
    	});
    	
    	$.each(buttonArr,function(index,val){
    		btnLiObj
        	.append(
        		$("<button></button>").addClass("gridViewBtn").attr("title",val.title).css(buttonCss.buttonStyle[index]).append(val.title).on("click",function(){
        			val.callBack(nodeObj);
        		})
        	)
    	});
     return btnLiObj;
    	
    }
    /**
     * 生成说明
     * @param nodeObj
     * @param _this
     * @returns
     */
    function _makeMemo(nodeObj,_this){
    	var memoContainerCss={
    			"color":"#828282",
                "height":"44px",
                "line-height":"20px",
                "width":"100%",
                "font-size":"13px",
                "padding":"3px",
    			"font-family":"微软雅黑",
    			"margin":"0 auto"
    	};
    	var memoDetail=_getData(_this,nodeObj,'memo').value;
    	if(memoDetail != undefined){
	    	if(memoDetail.length > 25 ){
	    		memoDetail=memoDetail.substring(0,25)+"...";
	    	}
	    }
    	return $("<div></div>").addClass("gridViewDetail").css(memoContainerCss).append(memoDetail);
    }
    
    /**
     * 获取对象
     * @param colMode
     * @param nodeObj
     * @param type
     * @returns
     */
    function _getData(_this,nodeObj,type){
    	var memoDetail=[];
    	$.each(_this.options.colModel,function(index,val){
    		if(val){
    			if(val.type==type){
        			var tmpObj={};
        			var context=nodeObj[val.name];
        			//格式化
        			if(val.formatter){
        				context=val.formatter(nodeObj);
        			}
        			//提取样式
        			if(val.css){
        				tmpObj.css=val.css;
        			}
        			
        			//提取图标
        			if(val.icon){
        				tmpObj.icon=val.icon;
        			}
        			
        			//提取标题
        			tmpObj.title=_this.options.colNames[index];
        			tmpObj.value=context;
        			memoDetail.push(tmpObj);
        		}
    		}
    	});
    	if(memoDetail.length==1){
    		return memoDetail[0];
    	}
    	return memoDetail;
    }
    
    /**
     * 参数验证
     * @returns
     */
    function _validateOptions(){
    	//TODO:添加参数验证
    	return true;
    }
    
    /* TYPEAHEAD PLUGIN DEFINITION
     * =========================== */

    old = $.fn.boncAceGridView;

    $.fn.boncAceGridView = function (option) {
        var args = arguments,
        result = null;
        $(this).each(function (index, item) {
            var $this = $(item),
                data = $this.data('boncAceGridView'),
                options = (typeof option !== 'object') ? null : option;

            if (!data) {
                data = new BoncAceGridView(this, options);
                $this = $(data.$element);
                $this.data('boncAceGridView', data);
                return;
            }
            if (typeof option === 'string') {
                if (data[option]) {
                    result = data[option].apply(data, Array.prototype.slice.call(args, 1));
                } else {
                    throw "Method " + option + " does not exist";
                }
            } else {
                result = data.setOptions(option);
            }
        });
        return result;
    };
    $.fn.boncAceGridView.Constructor = BoncAceGridView;
}(window.jQuery));
