/**
 * 
 */
(function ($) {
	//严格模式
	"use strict";
	//初始化方法
    var BoncAceCardList = function (element, options) {
        this.init(element, options);
    };
    
    var old=null;
    
    //定义BoncAceCardList的属性和方法
    BoncAceCardList.prototype = {
		//默认参数
    	defaults :{
			url : "",
			datatype : "json",
			mtype : "POST",
			width:300,                   //card宽
			height:300,                  //card高
			containerMinHeight:450,      //控件最小高度
			postData:{},
			pagination:"pagination-sm",  //分页栏样式
			rowNum : 12,                 //每页card数
			rowList : [ 12, 24, 36 ],    //每页选择数组
			pageFirst:"首页",
			pageLast:"最后",
			pagePre:"<",
			PageNext:">",
			showPage:6,
			labelRightCss:{
	   			"float":"right",
    			"margin-right":"10px",
    			"color":"#666"	
			},
			context:/tenant/,
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
            
            //设置页数
            this.setParameter({rows:this.options.rowNum,page:1});
            
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
        	//创建容器
        	var mainContainer=$("<ul></ul>").css({"list-style":"none","padding-bottom":"70px"}).addClass("clearfix").appendTo(this.$element);
        	
        	//远程获取数据
        	this.doAjax(this,mainContainer);
        	
        	//绑定事件
        	var _this=this;
        	$(this).on("reloadCard",function(){
            	//获取容器
            	var container=_this.$element.children("ul");
            	//清空容器
            	container.empty();
            	//去除分页
            	_this.$element.children("nav").remove();
            	//生成页面
            	_this.doAjax(_this,container);
        	});
        },
        
        /**
         * 设置参数
         */
        setParameter:function(options){
        	 this.options.postData = $.extend({},this.options.postData, options); 
        },
        
        /**
         * 远程获取数据
         */
        doAjax:function(_this,mainContainer){
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
    	        	$.each(data.rows,function(index,val){
    	        		//生成节点
    	        		_this.buildNode(_this,val).appendTo(mainContainer);
    	        	});
    	        	
    	        	//设置容器高度
    	        	mainContainer.css("min-height",_this.options.containerMinHeight);
    	        	
    	          	//设置分页栏
    	        	if(_this.options.pagination){
    	        		_this.$element.append(_this.pagination(_this,data));
    	        		setPageInfo(_this);
    	        	}
    			}
        	});
        },
        
        /**
         * 设置分页
         */
        pagination:function(_this,data){
        	
        	var pageContainer=$("<ul></ul>").addClass("pagination").css({"float":"left"}).addClass(_this.options.pagination);
        	
        	//计算出页数
        	var pageNum=Math.ceil(parseInt(data.records,10)/parseInt(data.pageSize,10));
        	
        	//获取起始顺序
        	var startIndex=_getStartIndex(data.page,_this.options.showPage);
        	
        	_this.resetPage(_this,pageContainer,startIndex,pageNum,pageNum,data.page);
        	
        	var selectObj=$("<select></select>").addClass("chosen-select").attr("id","bonc-ace-cardList-page-select");
        	
        	$.each(_this.options.rowList,function(key,val){
        		selectObj.append($("<option></option>").append(val).attr("value",val));
        	});

        	
        	//分页描述
    		return  $('<nav></nav>')
    				.attr("aria-label","Page navigation")
    				.addClass("addPaginations")
    				.append(pageContainer)
    				.append(
    					$("<ul></ul>")
    					.addClass("pageCounts")
        				.css({"list-style":"none","line-height":"30px","float":"left","margin":"20px 5px"})
        		   		.append(
        		   			$("<li></li>")
        		   			.css({"color":"#666","padding":"0px 5px","float":"left"})
        		   			.append($("<span>第</span>"))
        		 			.append($("<span></span>").css({"color":"#2283c5","padding":"0px 5px"}).append(data.page))		
        		   			.append($("<span>页</span>"))
        		   		)
        		   		.append(
        		   			$("<li></li>")
        		   			.css({"color":"#666","padding":"0px 5px","float":"left"})
        		   			.append($("<span>共</span>"))
        		 			.append($("<span></span>").css({"color":"#2283c5","padding":"0px 5px"}).append(pageNum))		
        		   			.append($("<span>页</span>"))		
        		   		)
        		   		.append(
        		   			$("<li></li>")
        		   			.css({"color":"#666","padding":"0px 5px","float":"left"})
        		   			.append(selectObj)	
        		   		)
    				);
        },
        
        /**
         * 重置分页栏
         */
        resetPage:function(_this,pageContainer,startIndex,endIndex,pageNum,clickIndex){
        	//清空分页栏
        	pageContainer.empty();
        	
        	//添加首页
        	pageContainer.append($("<li></li>").append($("<a></a>").attr("href","#").append(_this.options.pageFirst).on("click",function(e){
        		e.preventDefault() ;
        		_this.setParameter({
        			page:1,
        		});
        		$(_this).trigger("reloadCard");
        	})));
        	
        	//添加前一页
        	pageContainer.append($("<li></li>").append($("<a></a>").attr("href","#").append(_this.options.pagePre).on("click",function(e){
        		e.preventDefault() ;
        		var prePage=parseInt(pageContainer.find("li.active>a").html(),10)-1;
        		if(prePage<1){
        			return;
        		}
        		_this.setParameter({
        			page:prePage,
        		});
        		$(_this).trigger("reloadCard");
        	})));
        	
        	
	        //构造分页栏
	       	for(var i=startIndex;i<endIndex+1;i++){
	       		if(i>startIndex+_this.options.showPage-1){
	       			break;
	       		}
	       		if(i<1){
	       			continue;
	       		}
	       		var liObj=$("<li></li>").append($("<a></a>").attr("href","#").append(i).on("click",function(e){
	        		e.preventDefault();
	        		
	        		//防止重复点击
	        		if($(this).closest("li").hasClass("active")){
	        			return;
	        		}
	        		
	        		//重新加载grid
	        		var currentpage=parseInt($(this).html(),10);
	        		_this.setParameter({
	        			page:currentpage,
	        		});
	        		$(_this).trigger("reloadCard");
	        		
	        	}));
	       		
        		if(clickIndex==i){
        			liObj.addClass("active");
	        	}
	        	pageContainer.append(liObj);
        	}
        	
        	//添加后一页
        	pageContainer.append($("<li></li>").append($("<a></a>").attr("href","#").append(_this.options.PageNext).on("click",function(e){
        		e.preventDefault() ;
        		var prePage=parseInt(pageContainer.find("li.active>a").html(),10)+1;
        		if(prePage>pageNum){
        			return;
        		}
        		_this.setParameter({
        			page:prePage,
        		});
        		$(_this).trigger("reloadCard");
        	})));
	       	
	       	
        	//添加末页
        	pageContainer.append($("<li></li>").append($("<a></a>").attr("href","#").append(_this.options.pageLast).on("click",function(e){
        		e.preventDefault() ;
        		_this.setParameter({
        			page:pageNum,
        		});
        		$(_this).trigger("reloadCard");
        	})));
        },
        
        /**
         * 生成节点
         */
        buildNode:function(_this,nodeObj){
    		var nodeContainerBasicCss={
    				"width":"23%",
    				"float":"left",
    				"margin-right":"2%",
    				"margin-bottom":"10px",
    				"border":"1px solid #ccc"
    		};
    		var nodeContainer=$("<li></li>").css(nodeContainerBasicCss);
    		
    		//获取变量
    		var dataNode=_getData(_this,nodeObj);
    		
    		//生成标题栏
    		_makeTitle(this,dataNode).appendTo(nodeContainer);
    		
    		//生成图片栏
    		_makeImg(this,dataNode,nodeObj).appendTo(nodeContainer);
    		
    		//生成按钮栏
    		if(this.options.button){
    			_makeButton(this,nodeObj).appendTo(nodeContainer);
    		}
    		
    		return nodeContainer;
        }
    };
    
    /**
     * 生成标题
     * @param _this
     * @param nodeObj
     * @returns
     */
    function _makeTitle(_this,dataNode){
    	var rtnObj= $("<div></div>");
    	
    	var titleCss={
    			"width":"100%",
    			"height":"35px",
    			"line-height":"35px"	
    	};
    	
    	var titleNameCss={
    			"float":"left",
    			"margin-left":"5px",
    			"color":"#292929",
    			"font-weight":"bolder"
    	};
    	
    	var labelLeftCss={
    			"float":"left",
    			"margin-left":"10px",
    			"padding":"2px 5px",
    			"margin-top":"9px",
    			"line-height":"16px",
    			"font-size":"12px",
    			"color":"#666"
    	};
    	
    	
    	/*if(dataNode.title){
    		rtnObj.append($("<div></div>").css(titleNameCss).append(dataNode.title));
    	}*/
    	
    	if(dataNode.labelLeft){
    		rtnObj.append($("<div></div>").css(labelLeftCss).append(dataNode.labelLeft));
    	}
    	
    	if(dataNode.labelRight){
    		rtnObj.append($("<div></div>").append($("<span></span>").css(_this.options.labelRightCss).append(dataNode.labelRight)));
    	}
    	
    	return 	rtnObj.css(titleCss)
    }
    
    /**
     * 生成图片栏目
     * @param _this
     * @param dataNode
     * @param nodeObj
     * @returns
     */
    function _makeImg(_this,dataNode,nodeObj){
    	var imgContainerCss={
    			"position":"relative",
    			"cursor":"pointer"
    	};
    	var titleNameCss={
    			"text-align":"center",
    			"width":"100%",
    			"color":"#f7a82f",
    			"font-weight":"bolder",
    			"margin-bottom":"15px"
    	};
    	var labelImgCss={
    			"bottom":"0px",
    			"width":"100%",
    			"color":"#9d9d9d",
    			"height":"30px",
    			"line-height":"30px",
    			"text-align":"center"
    	};
    	return $("<div></div>")
    	       .css(imgContainerCss)
    	       .append(
    	    		$("<div style='padding:10px;padding-top:0px'></div>")
    	    		.append(
    	    			$("<img></img>").css({"width":"100%","height":_this.options.height+"px"}).attr("src",_this.options.context+dataNode.imgUrl)
    	    		)
    	       )
    	       .append($("<div></div>").css(labelImgCss).append(dataNode.labelImg))
    	       .on("click",function(){
    	    	   dataNode.labelImgCallBack(nodeObj);
    	       }).append($("<div></div>").css(titleNameCss).append(dataNode.title));
    }
    
    
    /**
     * 生成按钮
     * @param _this
     * @param dataNode
     * @returns
     */
    function _makeButton(_this,nodeObj){
    	var btnCss={
    			"width":"50%",
    			"height":"35px",
    			"float":"left",
    			"margin":"0",
    			"border-radius":"0",
    			"background":"#f5f5f5",
    			"color":"#676767"
    	};
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
	                "border-radius":"0",
	                "line-height":"35px",
	                "text-align":"center",
	                "font-size":"14px",
	                "font-weight":"bolder",
        			"font-family":"微软雅黑",
        			"margin":"0px",
        			"padding":"0px"
    	          },
    			  {
    	        	"background":"none",
    	        	"border":"none",
    	        	"border-top":"1px solid #dbdbdb",
	                "color":"#68b9d6",
	                "width":"50%",
	                "height":"35px",
	                "border-radius":"0",
	                "line-height":"35px",
	                "text-align":"center",
	                "font-size":"14px",
	                "font-weight":"bolder",
        			"font-family":"微软雅黑",
        			"margin":"0px",
        			"padding":"0px"
    			  }
    			 ]
    	};
    	
    	var iconCss={
    			"iconCss1":[
    	              {
    	            	"color":"#8e8db9",
    	      			"aria-hidden":"true",
    	      			"width":"100%",
    	                "height":"35px",
    	                "line-height":"35px",
    	                "text-align":"center",
    	                "font-size":"14px",
    	                "font-weight":"bolder"
    	              },
    	              {
    	            	"color":"#68b9d6",
    	      			"aria-hidden":"true",
    	      			"width":"100%",
    	                "height":"35px",
    	                "line-height":"35px",
    	                "text-align":"center",
    	                "font-size":"14px",
    	                "font-weight":"bolder"
    	              }
    	              ]
    			
    	};
    	
    	var spanCss={
    			"color":"#676767",
    			"aria-hidden":"true"
    	};
    	
    	var buttonContainer=$("<div></div>");
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
    	var width=((1/buttonArr.length)*100).toFixed(1)+"%";
    	$.each(buttonArr,function(key,val){
    		$("<button></button>")
    		.addClass("btn commenBtn")
    		.css(buttonCss.buttonStyle[key])
    		.css("width",width)
    		.append($("<i></i>").css(iconCss).addClass(val.icon))
    		.append($("<span></span>").css(iconCss.iconCss1[key]).append(val.title))
    		.on("click",function(){
    			val.callBack(nodeObj);
    		})
    		.appendTo(buttonContainer);
    	});
    	return buttonContainer;
    }
    
    /**
     * 参数验证
     * @returns
     */
    function _validateOptions(){
    	//TODO:添加参数验证
    	return true;
    }
    
    /**
     * 获取数据
     */
    function _getData(_this,nodeObj){
    	var dataNode={};
    	var modeArray=_this.options.mode;
    	$.each(modeArray,function(index,val){
			var context=nodeObj[val.name];
			if(val.formatter){
				context=val.formatter(nodeObj);
			}
			
    		if(val.type=="title"){
    			dataNode.title=context;
    		}
    		else if(val.type=="label-left"){
    			dataNode.labelLeft=context;
    		}
    		else if(val.type=="label-right"){
    			dataNode.labelRight=context;
    		}
    		else if(val.type=="label-img"){
    			dataNode.labelImg=context;
    			dataNode.labelImgCallBack=val.callBack;
    		}
    		else if(val.type=="img-url"){
    			dataNode.imgUrl=context;
    		}
    	});
    	return dataNode;
    }
    
    /**
     * 获取起始序号
     */
    function _getStartIndex(pageIndex,showPage){
    	//计算出当前显示页属于第几页
    	var clickMod=Math.floor(pageIndex/showPage);
    	var startIndex=clickMod*showPage;
    	if(startIndex==0){
    		startIndex=1;
    	}
    	return startIndex;
    }
    
    /**
     * 设置分页下拉框
     * @param _this
     * @returns
     */
    function setPageInfo(_this){
		//设置分页位置为居中
		var allWidth=_this.$element.find(".pagination").width()+_this.$element.find(".pageCounts").width()+25;
		$(".addPaginations")
		.css({"width":allWidth+"px","position":"absolute","left":"50%","margin-left":-allWidth/2+"px","bottom":"0px"});
		//初始化下拉框及样式
		var selectObj=$("#bonc-ace-cardList-page-select");
		selectObj.chosen({
			width: "60px",
			disable_search:true
		});
		$("#bonc_ace_cardList_page_select_chosen .chosen-single").css({
			"height":"28px",
			"line-height":"28px",
			"margin-top":"-8px",
			"border-color":"#d4dfe3",
			"color":"#2283c5"
		});
		
		$("#bonc_ace_cardList_page_select_chosen .chosen-drop").css({"top":"-400%"});
		selectObj.val(_this.options.postData.rows);
		selectObj.trigger('chosen:updated');
		selectObj.on('change',function(){	
    		_this.setParameter({
    			rows:$(this).val(),
    		});
    		$(_this).trigger("reloadCard");
		});
    }
    
    
    
    /* TYPEAHEAD PLUGIN DEFINITION
     * =========================== */

    old = $.fn.boncAceCardList;

    $.fn.boncAceCardList = function (option) {
        var args = arguments,
        result = null;
        $(this).each(function (index, item) {
            var $this = $(item),
                data = $this.data('boncAceCardList'),
                options = (typeof option !== 'object') ? null : option;

            if (!data) {
                data = new BoncAceCardList(this, options);
                $this = $(data.$element);
                $this.data('boncAceCardList', data);
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
    $.fn.boncAceCardList.Constructor = BoncAceCardList;
}(window.jQuery));
