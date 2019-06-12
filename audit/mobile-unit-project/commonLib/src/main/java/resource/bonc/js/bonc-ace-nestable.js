/**
 * 
 */
(function ($) {
    "use strict";
    var BoncAceNestable = function (element, options) {
        this.init(element, options);
    },
    old = null;
   
    BoncAceNestable.prototype = {
		defaults :{
				icon:{
					plus:"fa-plus",
		    		edit: "fa-pencil",
		    		rm: "fa-trash-o",
		    		auth: "fa-cogs",
				},
				cellBar:{startLevel:0}
		 },
        init: function (element, options) {
            this.$element = $(element);
            this.setOptions(options);
            this.initialized = true;
        },
        setOptions: function (options) {
            //清空树
            this.$element.empty();
            this.options = $.extend({}, (this.options || this.defaults), options);
            this.data=this.options;
            this.render();
        },
        render: function () {
        	var toolBar=new Array();
        	if(this.data.hasOwnProperty("headBar")){
        		for(var bar in this.data.headBar){
        			if(bar=="plus"){
        				var icon = this.data.headBar.plus.icon||this.defaults.icon.plus;
        				toolBar.push(this.button("green","ace-icon fa "+ icon +" bigger-130",this.data.headBar.plus.method,null));
        			}
        			if(bar=="edit"){
        				var icon = this.data.headBar.edit.icon||this.defaults.icon.edit;
        				toolBar.push(this.button("blue","ace-icon fa "+ icon +" bigger-130",this.data.headBar.edit.method,null));
        			}
        			if(bar=="rm"){
        				var icon = this.data.headBar.rm.icon||this.defaults.icon.rm;
        				toolBar.push(this.button("red","ace-icon fa "+ icon +" bigger-130",this.data.headBar.rm.method,null));
        			}
        			if(bar=="auth"){
        				var icon = this.data.headBar.auth.icon||this.defaults.icon.auth;
        				toolBar.push(this.button("red","ace-icon fa "+ icon +" bigger-150",this.data.headBar.auth.method,null));
        			}
        		}
        	}
        	var toolBarContainer=$("<div></div>").addClass("pull-right action-buttons");
        	var toolBarObj=$("<div></div>").addClass("dd2-content").append(this.data.title).append(toolBarContainer);
			for(var i=toolBar.length-1;i>-1;i--){
				toolBarContainer.append(toolBar[i]);
			}
        	
        	//创建菜单头部
        	$("<div></div>").addClass("dd dd-draghandle").attr("id","nestable").append(
        		$("<ol></ol>").addClass("dd-list").append(
        			$("<li></li>").addClass("dd-item dd2-item").attr("data-id","0").append(
        				$("<div></div>").addClass("dd2-content dd2-handle").append(
        					$("<i></i>").addClass("normal-icon ace-icon fa fa-signal orange bigger-130")
        				).append(
        					$("<i></i>").addClass("drag-icon ace-icon fa fa-arrows bigger-125")
        				)
        			).append(toolBarObj).append(
        				$("<ol></ol>").addClass("dd-list").attr('id','root')
        			)		
        		)
        	).appendTo(this.$element);
        	//让树的高度与屏幕可见范围一样高（防止树加载慢时，造成页面渲染异常）
        	$('#nestable').height(this.data.height);
        	
        	//同步加载树
        	var menuList;
        	var authList;
        	var dataList;
        	$.ajax({
        		type : "post",
        		async: false,
        		url : this.data.url,
        		data:this.data.postData,
        		success : function(json) {
        			menuList = $.parseJSON(json);
    				authList=menuList.authList;
    				dataList=menuList.data;
        		}
        	});
        	this.genMenu(dataList, $('#root'));
        	this.nestableLoadData();
			if(authList!=undefined){
				this.initAuthInfo(dataList,authList);
			}	
			
        },
        
        /**
         * 初始化权限信息
         * @param dataList
         * @param authList
         */
        initAuthInfo:function (dataList,authList){
        	for(var i in dataList){	
        		var objChk=$("li[data-id='"+dataList[i].id+"']").find("input[type='checkbox']");
        		if($.inArray(dataList[i].id, authList)!=-1){
        			if(dataList[i].children==undefined){
        				objChk.trigger("click");
        			}
        			else{
        				this.initAuthInfo(dataList[i].children,authList);
        			}
        		}else{//没找到就往下找
        			if(dataList[i].children!=undefined){
        				this.initAuthInfo(dataList[i].children,authList);
        			}
        		}
        	}
        },
        
        /**
         * 生成菜单树
         * @param menuList
         * @param parent
         * @param obj
         */
        genMenu: function(menuList, parent) {
        	for (var menu in menuList) {
	        		if(menuList[menu].children!=undefined && menuList[menu].children.length>0){
	        		     var ol =  $("<ol></ol>").addClass("dd-list").appendTo(
	        		    		 	$("<li></li>").addClass("dd-item").attr("data-id",menuList[menu].id).append(
	        		    	   			 $("<div></div>").addClass("dd2-content").attr( "ddd_id", menuList[menu].id ).attr( "ddd_type", menuList[menu].type ).append(menuList[menu].name).append(this.toolBox(menuList[menu]))
	        		    		   ).attr("disOrd",menuList[menu].disOrd).attr("isLeaf",menuList[menu].isLeaf).attr("treeLevel",menuList[menu].treeLevel). appendTo(parent));
	        		    this.genMenu(menuList[menu].children,ol);
	        		}else{
	        		    $("<li></li>").addClass("dd-item").attr("data-id",menuList[menu].id).append(
	        		    		$("<div></div>").addClass("dd2-content").attr( "ddd_id", menuList[menu].id ).attr( "ddd_type", menuList[menu].type ).append(menuList[menu].name).append(this.toolBox(menuList[menu]))
	        		    ).attr("disOrd",menuList[menu].disOrd).attr("isLeaf",menuList[menu].isLeaf).attr("treeLevel",menuList[menu].treeLevel).appendTo(parent);
	        		}
        	}
        },
        
        /**
         * 工具栏内容
         * @returns
         */
       toolBox:function(node){
    	   if(node.treeLevel == null || node.treeLevel == undefined){
    		   node.treeLevel = 10;
    	   }
    	   var cellBar=new Array();
       	   if(this.data.hasOwnProperty("cellBar")){
	       		for(var bar in this.data.cellBar){
	       			if(bar=="plus"){
	       				var icon = this.data.cellBar.plus.icon||this.defaults.icon.plus;
	       				var startLevel = this.data.cellBar.plus.startLevel ||this.defaults.cellBar.startLevel;
	       				if(node.treeLevel>=startLevel){
	       					cellBar.push(this.button("green","ace-icon fa "+ icon +" bigger-130",this.data.cellBar.plus.method, node));
	       				}
	       			}
	       			if(bar=="edit"){
	       				var icon = this.data.cellBar.edit.icon||this.defaults.icon.edit;
	       				var startLevel = this.data.cellBar.edit.startLevel ||this.defaults.cellBar.startLevel;
	       				if(node.treeLevel>=startLevel){
	       					cellBar.push(this.button("blue","ace-icon fa "+ icon + " bigger-130",this.data.cellBar.edit.method, node));
	       				}
	       			}
	       			if(bar=="rm"){
	       				var icon = this.data.cellBar.rm.icon||this.defaults.icon.rm;
	       				var startLevel = this.data.cellBar.rm.startLevel ||this.defaults.cellBar.startLevel;
	       				if(node.treeLevel>=startLevel){
	       					cellBar.push(this.button("red","ace-icon fa "+ icon + " bigger-130",this.data.cellBar.rm.method, node));
	       				}
	       			}
	       			if(bar=="checkBox"){
	       				var startLevel = this.data.cellBar.checkBox.startLevel ||this.defaults.cellBar.startLevel;
	       				if(node.treeLevel>=startLevel){
	       					cellBar.push(this.checkBox(node));
	       				}
	       			}
	       		}
       	   }
       	
       	    var cellBarObj=$("<div></div>").addClass("pull-right action-buttons");
			for(var i=cellBar.length-1;i>-1;i--){
				cellBarObj.append(cellBar[i]);
			}
        	return  cellBarObj;
        	
        },
        
        /**
         * 按钮对象
         * @param color
         * @param icon
         * @param btnFunc
         * @param node
         * @returns
         */
        button:function(color,icon,btnFunc,node){
        	return  $("<a></a>").addClass(color).attr('href','#').append(
							$("<i></i>").addClass(icon)
						).on("click",function(e){e.preventDefault();btnFunc(node)})
        },
        
        /**
         * 勾选框对象
         * @param color
         * @param icon
         * @param data
         */
        checkBox:function(node){
        	var singleSelect=this.data.hasOwnProperty("singleSelect")?false:this.data.cellBar.singleSelect;
        	var setCheckStatusFunc=this.setCheckStatus;
        	var setIndeterminateFunc=this.setIndeterminate;
        	var obj= $("<input></input>");
        	return obj.attr("type","checkbox").on("click",function(){
					if(obj.prop("checked")){
						setCheckStatusFunc(obj,true,setIndeterminateFunc,singleSelect);
					}else{
						setCheckStatusFunc(obj,false,setIndeterminateFunc,singleSelect);
					}
        		}).addClass("tree-chk").attr("value",node.id);
        },
        
        /**
         * 设置checkBox状态
         * @param obj
         * @param status
         */
        setCheckStatus:function(obj,status,setIndeterminateFunc,singleSelect){
        	if(!singleSelect){
        		setIndeterminateFunc(obj,status,setIndeterminateFunc);
            	obj.closest('li').find("button[data-action='expand']").trigger("click");
            	obj.closest('li').find("input[type='checkbox']").prop("checked",status);
        	}
        	else{
        		$('.tree-chk:checked').prop("checked",false);
        		obj.prop("checked",status);
        	}
        	
        },
        
        /**
         * 设置半选状态
         * @param obj
         * @param status
         */
        setIndeterminate:function(obj,status,checkFunc){
        	if(typeof(obj)==undefined){
        		return;
        	}
        	var allTrueCount=0;
        	var hasIndeter=false;
        	if(obj.prop("indeterminate")){
        		hasIndeter=true;
        	}
        	var sibList=obj.closest('li').siblings();
        	for(var i=0;i<sibList.length;i++){
        		var checkStat=$(sibList[i]).find("input[type='checkbox']").prop("checked");
        		var indeterminate=$(sibList[i]).find("input[type='checkbox']").prop("indeterminate");
        		if (checkStat) {
        			allTrueCount++;
        		}
        		if(indeterminate){
        			hasIndeter=true;
        		}
        	}
        	var parentOl=obj.closest('li').closest('ol');
        	if(parentOl.attr("id")=="root"){
        		return;
        	}
        	var parent=parentOl.closest('li').find("input[type='checkbox']:first");
        	if(allTrueCount==sibList.length && status){
        		parent.prop("checked",true)
        		parent.prop("indeterminate",false);	
        	}
        	else if(allTrueCount==0 && !status){
        		parent.prop("indeterminate",false);
        		parent.prop("checked",false)
        	}
        	else{
        		parent.prop("checked",true)
        		parent.prop("indeterminate",true);
        	}
        	if(hasIndeter){
        		parent.prop("checked",true)
        		parent.prop("indeterminate",true);
        	}
        	checkFunc(parent,status,checkFunc);
        },
         
       /**
        * 树加载完成后的方法（初始化）
        */
       nestableLoadData:function(){
        	//初始化nesttable
        	$('#nestable').nestable( { maxDepth: 1000 } );
        	//合并所有节点
        	$('#nestable').nestable('collapseAll');
        	$('[data-rel="tooltip"]').tooltip();
        	//打开头几个个节点（为了美观。。。。。）
        	$('#nestable').find("li[data-id='0']").children("button[data-action='expand']").trigger("click");
        	var systemLi=$('#nestable').find("li[data-id='0']").children("ol").children("li");
        	for(var i=0;i<systemLi.length;i++){
        		if(i==this.data.initOpenNode){
        			break;
        		}
        		$(systemLi[i]).children("button[data-action='expand']").trigger("click");
        	}
        	$('.dd2-content a').on('mousedown', function(e) {e.stopPropagation();});
        	//删除顶部菜单开合按钮
        	$("li[data-id='0']").children('button').remove();
        	//改变父节点高度
        	this.$element.parent('.modal-body').slimscroll({height:$('#nestable').height()});
        	$("#nestable").css("height","auto");
        },
        
        
        /**
         * 更新节点(新增或者删除节点)
         * @param treeData
         */
        refreshNode:function(treeData){
        	var thisObj=this.getNode(treeData.id);
        	var childeNodeOl;
        	var expBtn;
        	var colBtn;
        	if(thisObj.length!=0){
        		//获取孩子
        		childeNodeOl=this.getChildNodeOl(thisObj);
        		expBtn=this.getExpandBtn(thisObj);
        		colBtn=this.getCollapseBtn(thisObj);
        		thisObj.remove();
        	}
        	var parent=this.getNode(treeData.pid);
        	thisObj=$("<li></li>").addClass("dd-item").attr("data-id",treeData.id).append(
        				$("<div></div>").addClass("dd2-content").attr( "ddd_id", treeData.id ).attr( "ddd_type", treeData.type ).append(treeData.name).append(this.toolBox(treeData))
        			).attr("disOrd",treeData.disOrd).attr("isLeaf",treeData.isLeaf).attr("treeLevel",treeData.treeLevel);
        	//添加孩子
        	if(childeNodeOl != undefined && childeNodeOl.children("li").length>0){
        		thisObj.append(childeNodeOl);
        		//展开按钮
        		thisObj.prepend(colBtn);
        		//合并按钮
        		thisObj.prepend(expBtn);
        	}
        	//获取父亲下的OL节点
        	var ol=parent.children("ol");
        	//如果父亲下没有Ol节点
        	if(ol.length==0){
        		//从父节点取值
        		var nodeData=this.getData(parent);
        		//获取爷爷节点
        		var gradFather=this.getParentNode(nodeData.id);
        		nodeData.pid=this.getIdByElm(gradFather);
        		nodeData.isLeaf="0";
        		this.refreshNode(nodeData);
        		//获取新的父亲节点
        		var newParent=this.getNode(nodeData.id);
        		$("<ol></ol>").addClass("dd-list").append(thisObj).appendTo(newParent);
        		//展开按钮
        		newParent.prepend("<button type=\"button\" data-action=\"collapse\" style=\"display: block;\">Collapse</button>");
        		//合并按钮
        		newParent.prepend("<button type=\"button\" data-action=\"expand\" style=\"display: none;\">Expand</button>");
        	}else{
        		var childrenList=ol.children("li");
        		if(childrenList.length==0){
        			ol.append(thisObj);
        		}else{
        			var addFlg=false;
	        		for(var i=0;i<childrenList.length;i++){
	        			var obj=childrenList[i];
	        			var oldDisOrd=$(obj).attr("disOrd");
	        			if(treeData.disOrd<=oldDisOrd){
	        				$(obj).before(thisObj);
	        				addFlg=true;
	        				break;
	        			}
	        		}
	        		if(!addFlg){
	        			ol.append(thisObj);
	        		}
        		}
        	}
        	$('#nestable').nestable();
        	$('.dd2-content a').on('mousedown', function(e) {
        		e.stopPropagation();
        	});
			this.$element.parent('.modal-body').slimscroll({height:$('#nestable').height()});
        },
        rmNode:function(id){
        	//删除子节点后，父节点相应更新
			var parent=this.getParentNode(id);
			$("li[data-id='"+id+"']").remove();
			var childrenList=this.getChildNodes(parent);
			//如果父节点没有孩子节点，将父节点置为叶子结点
			if(childrenList.length==0){
				//获取父节点数据
				var nodeData=this.getData(parent);
				//设置为叶子节点
				nodeData.isLeaf="1";
				//获取爷爷节点
				var gradFather=this.getParentNode(nodeData.id);
				nodeData.pid=this.getIdByElm(gradFather);
				//更新节点
				this.refreshNode(nodeData);
			}
        	
        },
        getParentNode:function(id){
        	return $("li[data-id='"+id+"']").closest("ol").closest("li");
        },
        getChildNodes:function(elm){
        	return elm.children("ol").children("li");
        },
        getChildNodeOl:function(elm){
        	return elm.children("ol");
        },
        getExpandBtn:function(elm){
        	return elm.children("button[data-action=expand]");
        },
        getCollapseBtn:function(elm){
        	return elm.children("button[data-action=collapse]");
        },
        getData:function(elm){
			var context=elm.children("div");
			//从父节点取值
			var nodeId=elm.attr("data-id");
			var nodeType=context.attr("ddd_type");
			var nodeText=context.text();
			var nodeOrd=elm.attr("disord");
			var isLeaf=elm.attr("isLeaf");
			var treeLevel = elm.attr("treeLevel");
			return {id:nodeId,type:nodeType,name:nodeText,disOrd:nodeOrd,isLeaf:isLeaf,treeLevel:treeLevel};
        },
        getIdByElm:function(elm){
        	return elm.attr("data-id");
        },
        getNode:function(id){
        	return $("li[data-id='"+id+"']");
        }
    };


    /* TYPEAHEAD PLUGIN DEFINITION
     * =========================== */

    old = $.fn.boncAceNestable;

    $.fn.boncAceNestable = function (option) {
        var args = arguments,
            result = null;
        $(this).each(function (index, item) {
            var $this = $(item),
                data = $this.data('boncAceNestable'),
                options = (typeof option !== 'object') ? null : option;

            if (!data) {
                data = new BoncAceNestable(this, options);
                $this = $(data.$element);
                $this.data('boncAceNestable', data);
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
    $.fn.boncAceNestable.Constructor = BoncAceNestable;
}(window.jQuery));
