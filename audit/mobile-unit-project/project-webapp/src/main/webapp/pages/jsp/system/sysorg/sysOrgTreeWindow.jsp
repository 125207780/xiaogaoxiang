<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="sysOrgTreeWindow"></div>
<script type="text/javascript">
$(function(){
	topgetSysOrgTreeDiv({
		id : "sysOrgTreeWindow",
		onClick : function(obj) {
			var temp = {};
			temp.orgId = obj.orgId;
			temp.name = obj.name;
			topobj["sysOrgTreeWindowObj"] = temp;
		},
		clearClick : function() {
			topobj["sysOrgTreeWindowObj"] = undefined;
		}
	});
})
</script>
