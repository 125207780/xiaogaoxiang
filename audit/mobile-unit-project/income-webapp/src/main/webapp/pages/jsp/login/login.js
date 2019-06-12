$(function() {
	$(".login-left, .login-right").css("height",$(window).height());
	$('#loginForm').bootstrapValidator({
        message: '输入不正确',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok light-green',
            invalid: 'glyphicon glyphicon-remove light-red',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '请输入用户名'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '不存在该用户'
                    },
                    stringLength: {
                        message: '该用户没有分配角色'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '请输入登录密码'
                    } ,
                    regexp: {
                        regexp: /^.*$/,
                        message: '密码不正确'
                    }
                }
            }
        },
        submitHandler: function(validator, form, submitButton) {
    		var username = $("#username").val();
			var password = $.md5($("#password").val());
			var data = {"loginId":username,"password":password};
			$.ajax({
				url : $.cxt + '/login',
				type : "POST",
				async : false,
				data:data,
				success : function(data) {
					if(data != "-1" && data != "-2") {
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
					} else if(data == "-1") {
						validator.updateStatus("password", 'INVALID', "regexp");
					} else if(data == "-2") {
						validator.updateStatus("username", 'INVALID', "regexp");
					}
					$('#submitBtn').removeAttr("disabled");
				}
			});
        }
    });
});

