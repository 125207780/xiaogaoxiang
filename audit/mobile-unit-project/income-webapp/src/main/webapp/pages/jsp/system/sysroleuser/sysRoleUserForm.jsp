<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="sysRoleUserForm" style="padding-left:50px;padding-top:20px;">
</div>
<script type="text/javascript">
$(function(){
	var s = eval('('+"${s}"+')');
	topLeftAndRight({
		divId : "sysRoleUserForm",
		leftJson : s.left,
		rightJson : s.right,
		width : 349,
		height : 350
	});
})
</script>
