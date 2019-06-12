/*var topjqGridWidth = function() {
	var width = $(window).width() - 20;
	return width;
}*/

/**
 * 显示隐藏按钮权限
 */
var topdoRole = function() {
	var dataOperations = $("#sidebar li.active a", parent.document).attr("data-operations");//查找对应的菜单权限
	if(dataOperations){
		var operations = dataOperations.split("#");//转为array
		$("[top-do-role]").hide();//将页面所有带有权限属性的元素隐藏
		for(var i = 0; i < operations.length; i ++) {
			if(operations[i]) {//如果有权限
				$("[top-do-role='" + operations[i] + "']").show();//将元素显示
			}
		}
	}
	
}

var topgetWindowBaseHtml = function() {
	var html = 
	"<div id=\""+id+"\" style=\"z-index: "+topwindow.i+"\" class=\"fullBackground\"></div>" +
	"<div id=\""+id+"context\" class=\"modal-content\" style=\"margin-top:0px;position:absolute;width: "+obj.width+"px;height:"+obj.height+"px;z-index: "+topwindow.i+";\">" +
		"<div class=\"modal-header\">" + 
			"<button type=\"button\" class=\"close\">" + 
				"<i class=\"confirm-close fa fa-times\"></i>" + 
			"</button>" + 
			"<h4 class=\"modal-title\">" + 
				obj.title +
			"</h4>" +
		"</div>" +
		"<div class=\"modal-body\" style=\"height: "+bodyHeight+"px;overflow:auto;\">" +
		"</div>" +
		"<div class=\"modal-bottom\">" +
		"</div>" + 
	"</div>"
	return html;
}

var topjqGridHeight = function() {
	var height = $(window).height() - 182;
	return height;
}

var topjqGridLoadComplete = function() {
	var table = this
	styleCheckbox();
	updatePagerIcons();
	//enableTooltips(table);
}

/**
 * 拼装传到后台的参数（参数jquery对象），checkbox获取的多个值是用逗号分割的
 * @param $obj 通过选择器获取的所有jquery元素
 * @return 以元素的name为key，value为值拼装的对象
 */
var topgetObjByObj = function($obj) {
	if($obj == undefined) {
		return {};
	}
	var obj = {};
	$obj.each(function(i){
		//取得name
		var name = $(this).attr("name");
		if(name == undefined) {
			//name为undefined直接下个循环
			return true;
		}
		//获取元素值
		var value = topgetFormValue($(this));
		/*if(value == "" && ($(this).hasClass("isNum") || $(this).is("[maxFractionNumber]"))) {
			//如果值必须为整数或者小数，并且值还为空字符串则直接跳出此属性
			return true;
		}*/
		if($(this).hasClass("arr")) {
			//有多个name相同的元素
			//如果为undefined，直接把obj[name]给定义为数组
			if(obj[name] == undefined) {
				obj[name] = []
			}
			//往数组里push值
			obj[name].push(value);
		} else {
			//没有arr类，直接给obj[name]赋值
			obj[name] = value;
		}
		//alert("name=" + name + "///obj[name]=" + obj[name]);
		//alert(name + ":" + topfilterString(value));
	});
	return obj;
}

/**
 * 拼装表单元素获取的value值
 * @param $this 需要获取值的元素
 */
var topgetFormValue = function($this) {
	var value = "";
	var name = $this.attr("name");
	//如果是radio
	if($this.is("[type='radio']")) {
		//拼装radio的值
		value = $("[name='" + name + "']:checked").val();
		value = topfilterString(value);
	} else if($this.is("[type='checkbox']")) {
		//拼装checkbox的值
		$("[name='" + name + "']:checked").each(function(){
			//过滤值
			value += topfilterString($(this).val()) + ",";
		});
	} else {
		//过滤值
		value = topfilterString($this.val());
	}
	return value;
}

/**
 * 过滤字符串，可以过滤
 * "&"
 * "\"
 * "'"
 * ">"
 * "<"
 * " "
 * @param value 需要过滤的字符串
 * @return 过滤后的字符串
 */
var topfilterString = function(value) {
	//去掉前后空格
	value = $.trim(value);
	if(value.indexOf("&") != -1) {
		value = value.replace(/&/g,"&amp;");
	}
	if(value.indexOf("\"") != -1) {
		value = value.replace(/\"/g,"&quot;");
	}
	if(value.indexOf("'") != -1) {
		value = value.replace(/\'/g,"&apos;");
	}
	if(value.indexOf(">") != -1) {
		value = value.replace(/>/g,"&gt;");
	}
	if(value.indexOf("<") != -1) {
		value = value.replace(/</g,"&lt;");
	}
	if(value.indexOf(" ") != -1){
		value = value.replace(/</g,"&nbsp;");
	}
	return value;
}

/**
 * 将元素$obj浏览器居中
 * @param $obj 要居中的元素（jquery对象）
 */
var topsetWindowCenter = function($obj) {
	var width = $obj.width();
	var windowWidth = $(window).width();
	var left = (windowWidth - width)/2;
	var height = $obj.height();
	var windowHeight = $(window).height();
	var top = (windowHeight - height)/2;
	$obj.css("top", top +"px").css("left", left + "px");
}

/**
 * 确认弹出
 */
var topshowdialog = function(message, fun) {
	bootbox.dialog({  
        message: message,  
        title: "确认提示",  
        buttons: {  
            OK: {  
                label: "确认",  
                className: "btn-primary",  
                callback: function () {  
                	fun(); 
                }  
            },
            Cancel: {  
                label: "取消",  
                className: "btn-default" 
            }  
        }  
    });
}

/**
 * 按选择器清空清空所有元素的值
 * @param str 选择器表达式（默认为.searchField）
 */
var topclear = function(id, s) {
	s = s || ".searchField";
	//清空查询条件
	$("#" + id + " " + s).each(function(){
		if(!$(this).is(":hidden")) {
			if($(this).is("select") && $(this).children("option").length > 0) {
				$(this).val($(this).children("option").attr("value"));
			} else {
				$(this).val("");
			}
		}
	});
}

/**
 * 操作成功提示
 */
var topshowAlertSuccessDiv = function() {
	if($("#alertSuccessDiv").length > 0) {
		$("#alertSuccessDiv").remove();
	}
	var html = "" + 
	"<div class=\"alert alert-success fade in\" style=\"position: absolute;z-index:1111\" id=\"alertSuccessDiv\">" + 
		"<strong>&nbsp&nbsp操作成功&nbsp&nbsp!</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 
	"</div>";
	$("body").append(html);
	topsetWindowCenter($("#alertSuccessDiv"));
	setTimeout(function(){
		$("#alertSuccessDiv").remove();
	},3000); 
}

/**
 * 操作失败提示
 */
var topshowAlertErrorDiv = function(msg) {
	if($("#alertErrorDiv").length > 0) {
		$("#alertErrorDiv").remove();
	}
	var html = "" + 
	"<div class=\"alert alert-danger fade in\" style=\"position: absolute;z-index:1111\" id=\"alertErrorDiv\">" + 
	"<strong>&nbsp&nbsp操作失败&nbsp&nbsp!"+msg+"</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 
	"</div>";
	$("body").append(html);
	topsetWindowCenter($("#alertErrorDiv"));
	setTimeout(function(){
		$("#alertErrorDiv").remove();
	},3000); 
}


function styleCheckbox() {
	$('.ui-jqgrid-sortable').css("text-align", "center");
}
function updatePagerIcons(table) {
	var replacement = {
		'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
		'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
		'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
		'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
	};
	$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function() {
		var icon = $(this);
		var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
		if ($class in replacement) {
			icon.attr('class', 'ui-icon ' + replacement[$class]);
		}
	})
}
function enableTooltips(table) {
	$('.navtable .ui-pg-button').tooltip({
		container : 'body'
	});
	$(table).find('.ui-pg-div').tooltip({
		container : 'body'
	});
}

$(document).keydown(function(e){
	//点击回车
	if(e.keyCode == 13) {
		var $this = $(e.target);
		if($this.is("a")) {
			return false;
		}
	}
});