/**
 * 校验
 * @param str 要校验的jquery选择器
 * @return 校验结果
 */
var topcheckoutForm = function(id) {
	var $obj = $("#" + id + " .formField")
	$obj.each(function(){
		var $this = $(this);
		//alert($this.attr("name"));
		//隐藏字段不校验，radio和checkbox校验暂时没有添加，但获取属性可以获取到
		if($this.is(":hidden") || $this.is(":radio") || $this.is(":checkbox")) {
			return true;
		}
		$this.val($.trim($this.val()));
		topgetCheck($this);
	});
	var bl = true;
	$obj.each(function(){
		var $error = $(this).siblings(".formField-error");
		if($error.length > 0) {
			bl = false;
			//终止each
			return false;
		}
	})
	return bl;
	//alert("length:" + getElementByTopcontext(".has-error-my").length);
//	if(getElementByTopcontext(".has-error-my").length == 0) {
//		return true;
//	} else {
//		return false;
//	}
}

var topgetCheck = function($this) {
	//alert("start----name:" + $this.attr("name") + "///value:" + $this.val() + "///class:" + $this.attr("class"));
	//如果不是必填校验而且也为""，则直接跳出该元素
	if(!$this.hasClass("required") && $this.val() == "") {
		return;
	}
	//如果有必填校验，则首先验证必填校验，如果为空直接跳出该元素
	if($this.hasClass("required")) {
		var blTemp = topcheckRequired($this);
		if(blTemp) {
	 		return;
	 	}
	}
	//IE不会判断字符串长度
	if($this.is("[maxlength]")) {
		var blTemp = topcheckMaxlength($this);
		if(blTemp) {
	 		return;
	 	}
	}
	//继续验证重复校验，如果值为""，则直接跳出该元素，不需要校验
	if($this.is("[onlyUrl]")) {
		var blTemp = topcheckOnlyFrame($this);
		if(blTemp) {
	 		return;
	 	}
	}
	if($this.is("[maxFractionNumber]")) {
		//alert("isFloat");
		//验证几位小叔，maxFractionNumber为位数
		var blTemp = topcheckIsFloat($this);
		if(blTemp) {
	 		return;
	 	}
	}
	if($this.hasClass("isNum")) {
		//alert("isNum");
		//验证整数
		var blTemp = topcheckIsNum($this);
		if(blTemp) {
	 		return;
	 	}
	} 
	if($this.is("[maxNum]")) {
		//alert("maxNum");
		//验证数字是否超过最大值，maxNum为最大值
		var blTemp = topcheckIsMaxNum($this);
		if(blTemp) {
	 		return;
	 	}
	}
	if($this.is("[minNum]")) {
		//alert("maxNum");
		//验证数字是否超过最大值，maxNum为最大值
		var blTemp = topcheckIsMinNum($this);
		if(blTemp) {
	 		return;
	 	}
	}
	if($this.hasClass("isW")) {
		//alert("isW");
		//只能输入字母、数字、下划线！
		var blTemp = topcheckIsW($this);
		if(blTemp) {
	 		return;
	 	}
	} 
	if($this.hasClass("isNAndC")) {
		//alert("isNAndC");
		//密码长度介于6位-20位之间，且必须由数字和字母组成！
		var blTemp = topcheckIsNAndC($this);
		if(blTemp) {
	 		return;
	 	}
	} 
	if($this.hasClass("isChinese")) {
		//alert("isChinese");
		//只能输入中文
		var blTemp = topcheckIsChinese($this);
		if(blTemp) {
	 		return;
	 	}
	} 
	if($this.hasClass("isNotChinese")) {
		//alert("isNotChinese");
		//不能输入中文
		var blTemp = topcheckIsNotChinese($this);
		if(blTemp) {
	 		return;
	 	}
	} 
	if($this.hasClass("isNoChar")) {
		//alert("isNoChar");
		//不能输入特殊字符
		var blTemp = topcheckIsNoChar($this);
		if(blTemp) {
	 		return;
	 	}
	} 
	if($this.hasClass("isTelephone")) {
		//alert("isTelephone");
		//电话格式
		var blTemp = topcheckIsTelephone($this)
		if(blTemp) {
	 		return;
	 	}
	} 
	if($this.hasClass("isFax")) {
		//alert("isFax");
		//传真
		var blTemp = topcheckIsFax($this);
		if(blTemp) {
	 		return;
	 	}
	} 
	if($this.hasClass("isMobilephone")) {
		//alert("isMobilephone");
		//手机格式，目前的号段：3、4、5、8；如需变更，自行添加即可
		var blTemp = topcheckIsMobilephone($this);
		if(blTemp) {
	 		return;
	 	}
	} 
	if($this.hasClass("isEmail")){
		//alert("isEmail");
		//电子邮件
		var blTemp = topcheckIsEmail($this);
		if(blTemp) {
	 		return;
	 	}
	} 
	if($this.hasClass("isPostCode")) {
		//alert("isPostCode");
		//邮政编码
		var blTemp = topcheckIsPostCode($this);
		if(blTemp) {
	 		return;
	 	}
	}
	if($this.hasClass("isCard")) {
		//alert("isCard");
		//身份证
		var blTemp = topcheckIsCard($this);
		if(blTemp) {
	 		return;
	 	}
	}
	//alert("end----name:" + $this.attr("name") + "///value:" + $this.val() + "///class:" + $this.attr("class"));
}
/***************************************方法开始*******************************************/
/**
 * 验证身份证
 */
var topcheckIsCard = function($this) {
	//alert("isCard");
	//身份证
 	var flag = true;
 	var iSum = 0;
	var strIDno = $this.val();
	var idCardLength = strIDno.length;
    if (!/^\d{17}(\d|x)$/i.test(strIDno) && !/^\d{15}$/i.test(strIDno)) {
    	  flag = false;
    }
    if (idCardLength == 15) {
	      sBirthday = "19" + strIDno.substr(6, 2) + "-" + Number(strIDno.substr(8, 2)) + "-" + Number(strIDno.substr(10, 2));
	      var d = new Date(sBirthday.replace(/-/g, "/"));
		  var dd = d.getFullYear().toString() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	      if (sBirthday != dd) {
	    	  flag = false;
	      }
	      var year = "19" + strIDno.substr(6, 2);
	      var nowyear = new Date().getFullYear().toString();
	      if (parseFloat(year) < 1900 || parseFloat(year) > parseFloat(nowyear)) {
	    	  flag = false;
	      }
     }
     if (strIDno == "111111111111111") {
    	  flag = false;
     }
     if (strIDno == "111111111111111111") {
    	  flag = false;
      }
     if (idCardLength == 18) {
	       var year = strIDno.substring(6, 10);
	       var nowyear = new Date().getFullYear().toString();
	       if (parseFloat(year) < 1900 || parseFloat(year) > parseFloat(nowyear)) {
	    	    flag = false;
	       }
			strIDno = strIDno.replace(/x$/i, "a");
			sBirthday = strIDno.substr(6, 4) + "-" + Number(strIDno.substr(10, 2)) + "-" + Number(strIDno.substr(12, 2));
			var d = new Date(sBirthday.replace(/-/g, "/"));
			if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
				  flag = false;
			}
			for (var i = 17; i >= 0; i--) {
				iSum += (Math.pow(2, i) % 11) * parseInt(strIDno.charAt(17 - i), 11);
			}
			if (iSum % 11 != 1) {
				  flag = false;
			}
			var words = new Array();
			words = new Array("11111119111111111", "12121219121212121");
			for (var k = 0; k < words.length; k++) {
				if (strIDno.indexOf(words[k]) != -1) {
					  flag = false;
				}
			}
       }
    	  
    var blTemp = !( flag );
	topgetCheckInfo($this, blTemp, topcheckText("身份证格式不正确！")); 
	return blTemp;
}
/*$(document).on("blur", ".isCard", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckIsCard($this);
});*/
/**
 * 验证邮编
 */
var topcheckIsPostCode = function($this) {
	//alert("isPostCode");
	//邮政编码
	var blTemp = !( /^[1-9]\d{5}(?!\d)$/.test($this.val()));
 	topgetCheckInfo($this, blTemp, topcheckText("邮政编码为6位数字！"));
 	return blTemp;
}
/*$(document).on("blur", ".isPostCode", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckIsPostCode($this);
});*/
/**
 * 验证邮箱
 */
var topcheckIsEmail = function($this) {
	//alert("isEmail");
	//电子邮件
	var blTemp = !( /^[a-zA-Z0-9\+_.-]*[@]{1}\w+[.\-]{1}\w+([.]{1}\w+)?$/.test($this.val()));
 	topgetCheckInfo($this, blTemp, topcheckText("Email格式不正确！"));
 	return blTemp;
}
/*$(document).on("blur", ".isEmail", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckIsEmail($this);
});*/
/**
 * 验证手机
 */
var topcheckIsMobilephone = function($this) {
	//alert("isMobilephone");
	//手机格式，目前的号段：3、4、5、8；如需变更，自行添加即可
	var blTemp = !( /^1[3|4|5|7|8][0-9]\d{4,8}$/.test($this.val()));
 	topgetCheckInfo($this, blTemp, topcheckText("手机号格式不正确！"));
 	return blTemp;
}
/*$(document).on("blur", ".isMobilephone", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckIsMobilephone($this);
});*/
/**
 * 验证传真
 */
var topcheckIsFax = function($this) {
	var blTemp = !( /^((\d{7,8})|((\d{4}|\d{3}|\d{2}|\d{1})-(\d{7,8}))|((\d{4}|\d{3}|\d{2}|\d{1})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))|((\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})))$/.test($this.val()));
 	topgetCheckInfo($this, blTemp, topcheckText("传真格式不正确！"));
 	return blTemp;
}
/*$(document).on("blur", ".isFax", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckIsFax($this);
});*/
/**
 * 验证电话
 */
var topcheckIsTelephone = function($this) {
	var blTemp = !( /^((\d{11})|(\d{7,8})|((\d{4}|\d{3}|\d{2}|\d{1})-(\d{7,8}))|((\d{4}|\d{3}|\d{2}|\d{1})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))|((\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})))$/.test($this.val()));
 	topgetCheckInfo($this, blTemp, topcheckText("电话格式不正确！"));
 	return blTemp;
}
/*$(document).on("blur", ".isTelephone", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckIsTelephone($this);
});*/
/**
 * 不能输入特殊字符
 */
var topcheckIsNoChar = function($this) {
	//alert("isNoChar");
	//不能输入特殊字符
	var blTemp = !( /^[^~@#&`|'*><+\/\\^$=$\x22]+$/.test($this.val()));
 	topgetCheckInfo($this, blTemp, topcheckText("不能输入特殊字符！"));
 	return blTemp
}
/*$(document).on("blur", ".isNoChar", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckIsNoChar($this);
});*/
/**
 * 不能输入中文
 */
var topcheckIsNotChinese = function($this) {
	//alert("isNotChinese");
	//不能输入中文
	var blTemp = /^[\u4E00-\u9FA5\s]*$/.test($this.val());
 	topgetCheckInfo($this, blTemp, topcheckText("不能输入中文！"));
 	return blTemp;
}
/*$(document).on("blur", ".isNotChinese", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckIsNotChinese($this);
});*/
/**
 * 只可输入中文
 */
var topcheckIsChinese = function($this) {
	//alert("isChinese");
	//只能输入中文
	var blTemp = !( /^[\u4E00-\u9FA5\s]*$/.test($this.val()));
 	topgetCheckInfo($this, blTemp, topcheckText("只能输入中文！"));
 	return blTemp;
}
/*$(document).on("blur", ".isChinese", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckIsChinese($this);
});*/
/**
 * 密码长度介于6位-20位之间，且必须由数字和字母组成
 */
var topcheckIsNAndC = function($this) {
	//alert("isNAndC");
	//只能输入字母、数字！
	var blTemp = !(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test($this.val()));
 	topgetCheckInfo($this, blTemp, topcheckText("密码长度介于6位-20位之间，且必须由数字和字母组成！"));
 	return blTemp;
}
/*$(document).on("blur", ".isNAndC", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckIsNAndC($this);
});*/
/**
 * 只能输入字母、数字、下划线
 */
var topcheckIsW = function($this) {
	var blTemp = !( /^\w+$/.test($this.val()));
 	topgetCheckInfo($this, blTemp, topcheckText("只能输入字母、数字、下划线！"));
 	return blTemp;
}
/*$(document).on("blur", ".isW", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckIsW($this);
});*/
/**
 * 按maxFractionNumber校验小数
 */
var topcheckIsFloat = function($this) {
	//alert("isFloat");
	//验证几位小叔，maxFractionNumber为位数
	var maxFractionNumber = $this.attr("maxFractionNumber");
	var reg = new RegExp('^\\d+(\\.\\d{0,' + maxFractionNumber + '})?$');		
 	var blTemp = !(reg.test($this.val()));
 	topgetCheckInfo($this, blTemp, topcheckText("只能输入"+ maxFractionNumber+"位以内的小数！"));
 	return blTemp;
}
/*$(document).on("blur", "[maxFractionNumber]", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckIsFloat($this);
});*/
/**
 * 校验整数
 */
var topcheckIsNum = function($this) {
	var blTemp = !( /^\d+$/.test($this.val()));
	topgetCheckInfo($this, blTemp, topcheckText("必须是整数！"));
	return blTemp;
}
/*$(document).on("blur", ".isNum", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckIsNum($this);
})*/
/**
 * 校验长度
 */
var topcheckMaxlength = function($this) {
	var maxLength = $this.attr("maxlength");
	var length = $this.val().length;
	var blTemp = length > maxLength;
	topgetCheckInfo($this, blTemp, topcheckText("输入长度不能超过"+maxLength+"！"));//过长
	return blTemp;
}
/*$(document).on("blur", "[maxlength]", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckMaxlength($this);
})*/
/**
 * 校验空
 */
var topcheckRequired = function($this) {
	$this.val($.trim($this.val()));
	var blTemp = ($this.val() == "");
 	topgetCheckInfo($this, blTemp, topcheckText("不能为空！"));
 	return blTemp;
}
/*$(document).on("blur", ".required", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	topcheckRequired($this);
})*/
/**
 * 校验重复
 */
var topcheckOnlyFrame = function($this) {
	if($.trim($this.val()) == "") {
		topgetCheckInfo($this, false, topcheckText("不能重复！"));
		return;
	} 
	var blTemp = false;
	var obj = {};
	var url = "";
	var fields = $this.attr("onlyUrl").split(",");
	for(var i = 0; i < fields.length; i ++) {
		var field = fields[i];
		if(i == 0) {
			url = field;
		} else {
			obj[field] = $("[name='" + field + "']").val();
		}
	}
	obj[$this.attr("name")] = $this.val();
	$.ajax({
		url : $.cxt + url, 
		data : obj,
		type: "POST",
		async : false,
		success : function(data) {
			if(data == false) {
				blTemp = true;
			}
			topgetCheckInfo($this, blTemp, topcheckText("不能重复！"));
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			topgetCheckInfo($this, true, topcheckText("校验重复错误"));
		}
	});
	return blTemp;
}
/*$(document).on("blur", "[onlyFrame]", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckOnlyFrame($this);
})*/
/**
 * 公共信息编码校验，必须为大写字符或数字，并且不能有I和O
 */
var topcheckNoIndexOf = function($this) {
	$this.val($.trim($this.val()));
	var blTemp = !(/^[0-9A-Z]+$/.test($this.val()));
	topgetCheckInfo($this, blTemp, topcheckText("只可以输入数字和大写字母！"));
	if(blTemp) {
		return;
	}
	var noIndexOfs = ["I","O"];
	for(var i = 0; i < noIndexOfs.length; i++) {
		var temp = noIndexOfs[i];
		blTemp = ($this.val().indexOf(temp) != -1);
		topgetCheckInfo($this, blTemp, topcheckText("不能包含" + noIndexOfs + "字符！"));
		if(blTemp) {
			break;
		}
	}
 	return blTemp;
}
/*$(document).on("blur", ".puinfodep", function(){
	var $this = $(this);
	$this.val($.trim($this.val()));
	var bl = topcheckBefore($this);
	if(!bl) return;
	topcheckNoIndexOf($this);
})*/
/**
 * 校验数字的最大值
 */
var topcheckIsMaxNum = function($this) {
	var maxNum = 0
	var num = 0
	if($this.hasClass("isNum")) {
		maxNum = parseInt($this.attr("maxNum"));
		num = parseInt($this.val());
	} else if($this.is("[maxFractionNumber]")) {
		maxNum = parseFloat($this.attr("maxNum"));
		num = parseFloat($this.val());
	}
	var blTemp = num > maxNum;
	topgetCheckInfo($this, blTemp, topcheckText("不能大于"+maxNum+"！"));//过长
	return blTemp;
}
/**
 * 校验数字的最小值
 */
var topcheckIsMinNum = function($this) {
	var minNum = 0;
	var num = 0;
	if($this.hasClass("isNum")) {
		minNum = parseInt($this.attr("minNum"));
		num = parseInt($this.val());
	} else if($this.is("[maxFractionNumber]")) {
		minNum = parseFloat($this.attr("minNum"));
		num = parseFloat($this.val());
	}
	var blTemp = num < minNum;
	topgetCheckInfo($this, blTemp, topcheckText("不能小于"+minNum+"！"));//过长
	return blTemp;
}

/***************************************方法结束*******************************************/
/**
 * 添加或移除提示
 * @param $this 需要添加或移除的元素的jquery对象
 * @param blTemp 为true的添加提示（如果有提示则不添加），为false时候移除提示（必须提示的info和传来的info是一样的）
 * @param info 提示信息
 */
var topgetCheckInfo = function($this, blTemp, info) {
	//alert($this.attr("name") + "///" + blTemp + "///" + info);
	//需要添加提示
	if(blTemp) {
		//添加新的提示
		topcheckAddClass($this, info);
	//需要移除提示
	} else {
		//获取现有提示信息
		var infoTemp = $this.siblings(".formField-error").html();
		//如果提示信息是一样的则移除该提示
		if(info == infoTemp) {
			topcheckRemoveClass($this);
		}
	}
}

/*var topcheckBefore = function($this) {
	var value = $this.val();
	if(value == "" && !$this.hasClass("required")) {
		var $parent = $this.parent();
		$parent.removeClass("has-error-my");
		$parent.children("span").remove();
		return false;
	}
	return true;
}*/

/**
 * 移除错误提示该元素的校验
 * @param $this 要添加提示的jquery元素
 */
var topcheckRemoveClass = function($this){
	$this.siblings(".formField-error").remove();//移除同辈的错误提示
	$this.css({"border-color":""})//移除边框红色
}

/**
 * 添加错误提示
 * @param $this 要删除提示的jquery元素
 */
var topcheckAddClass = function($this, info){
	topcheckRemoveClass($this);//添加之前移除以前的提示
	var $parent = $this.parent();//再添加此提示
	$parent.append("<div class=\"formField-error\">" + info + "</div>");
	$this.css({"border-color":"#f09784"});//添加边框红色
}

var topcheckText = function(info) {
	var s = "*" + info + "*";
	return s;
}
