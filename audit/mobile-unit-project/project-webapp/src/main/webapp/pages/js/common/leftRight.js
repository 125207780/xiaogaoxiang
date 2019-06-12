/**
 * 左右移动框
 * obj.divId 刷新的div的id
 * obj.leftJson 后台传过来的左侧的json字符串
 * 	例："[{name:'我是name',value:'我是value'}]"
 * obj.rightJson 后台传过来的右侧的json字符串
 * 	例："[{name:'我是name',value:'我是value'}]"
 * obj.width 宽度
 * obj.height 高度
 */
var topLeftAndRight = function(obj) {
	var divId = obj.divId;
	var leftJson = obj.leftJson;
	var rightJson = obj.rightJson;
	var width = obj.width || 300;
	var height = obj.height || 150;
	var html = "<select id=\"" + divId + "Left\" name=\"" + divId + "\" multiple style=\"width: " + width + " !important;height: " + height + "px;float: left;border:1px solid #ccc;color:#666\">";
	if(leftJson != undefined) {
		for(var i = 0; i < leftJson.length; i++) {
			html += "<option value=\""+leftJson[i].value+"\">"+leftJson[i].name+"</option>";
		}
	}
	html += "</select>";
	html += "<div style=\"float: left;margin: 40px 20px 0px 20px; font-size: 24px\">"
	html += "<div>";
	html += "<a id=\"" + divId + "ARight\" name=\"" + divId + "\" href=\"#\" class=\"btn btn-primary btn-sm\">";
	html += "<span class=\"glyphicon glyphicon-arrow-right\" style=\"margin:0px\"></span>";
	html += "</a>";
	html += "</div>";
	html += "<div>";
	html += "<a id=\"" + divId + "ALeft\" name=\"" + divId + "\" href=\"#\" class=\"btn btn-primary btn-sm\">";
	html += "<span class=\"glyphicon glyphicon-arrow-left\" style=\"margin:0px\"></span>";
	html += "</a>";
	html += "</div>";
	html += "</div>";
	html += "<select id=\"" + divId + "Right\" name=\"" + divId + "\" multiple style=\"width: " + width + " !important;height: " + height + "px;float: left;border:1px solid #ccc;color:#666;\">";
	if(rightJson != undefined) {
		for(var i = 0; i < rightJson.length; i++) {
			html += "<option value=\""+rightJson[i].value+"\">"+rightJson[i].name+"</option>";
		}
	}
	html += "</select>";
	$("#" + divId).html(html);
//	$("#" + id + "Left option").dblclick(function(){
//		var $right = $("#" + id + "Right");
//		var $option = $("#" + id + "Left option[value='" + $(this).val() + "']");
//		$right.append("<option value=\""+$option.attr("value")+"\">"+$option.html()+"</option>")
//		$option.remove();
//	})
//	$("#" + id + "Right option").dblclick(function(){
//		var $left = $("#" + id + "Left");
//		var $option = $("#" + id + "Right option[value='" + $(this).val() + "']");
//		$left.append("<option value=\""+$option.attr("value")+"\">"+$option.html()+"</option>")
//		$option.remove();
//	})
//	$("#" + id + "ALeft").click(function(){
//		var $right = $("#" + id + "Right");
//		var $left = $("#" + id + "Left");
//		$right.find("option:selected").each(function(){
//			var $obj = $(this);
//			$left.append("<option value=\""+$obj.attr("value")+"\">"+$obj.html()+"</option>");
//			$obj.remove();
//		});
//	})
//	$("#" + id + "ARight").click(function(){
//		var $right = $("#" + id + "Right");
//		var $left = $("#" + id + "Left");
//		$left.find("option:selected").each(function(){
//			var $obj = $(this);
//			$right.append("<option value=\""+$obj.attr("value")+"\">"+$obj.html()+"</option>")
//			$obj.remove();
//		});
//	})
}
/**
 * 获取右侧框的所有值
 * @param flag 唯一标识
 * @return 用逗号分割的value的字符串
 */
var topgetRightByLeftAndRight = function(flag) {
	var right = "";
	$("#" + flag + "Right option").each(function(){
		right += $(this).attr("value") + ",";
	});
	return right;
}
/**
 * 获取左侧框的所有值
 * @param flag 唯一标识
 * @return 用逗号分割的value的字符串
 */
var topgetLeftByLeftAndRight = function(flag) {
	var left = "";
	$("#" + flag + "Left option").each(function(){
		left += $(this).attr("value") + ",";
	});
	return left;
}

//左右框的左框双击事件
$(document).on("dblclick", "[id$=Left] option", function(){
	var id = $(this).parent().attr("name")
	var $right = $("#" + id + "Right");
	var $option = $("#" + id + "Left option[value='" + $(this).val() + "']");
	$right.append("<option value=\""+$option.attr("value")+"\">"+$option.html()+"</option>")
	$option.remove();
});
//左右框的右框双击事件
$(document).on("dblclick", "[id$=Right] option", function(){
	var id = $(this).parent().attr("name")
	var $left = $("#" + id + "Left");
	var $option = $("#" + id + "Right option[value='" + $(this).val() + "']");
	$left.append("<option value=\""+$option.attr("value")+"\">"+$option.html()+"</option>")
	$option.remove();
});
//左右框的左移按钮单击事件
$(document).on("click", "[id$=ALeft]", function(){
	var id = $(this).attr("name")
	var $right = $("#" + id + "Right");
	var $left = $("#" + id + "Left");
	$right.find("option:selected").each(function(){
		var $obj = $(this);
		$left.append("<option value=\""+$obj.attr("value")+"\">"+$obj.html()+"</option>");
		$obj.remove();
	});
});
//左右框的右移按钮单击事件
$(document).on("click", "[id$=ARight]", function(){
	var id = $(this).attr("name")
	var $right = $("#" + id + "Right");
	var $left = $("#" + id + "Left");
	$left.find("option:selected").each(function(){
		var $obj = $(this);
		$right.append("<option value=\""+$obj.attr("value")+"\">"+$obj.html()+"</option>")
		$obj.remove();
	});
})
