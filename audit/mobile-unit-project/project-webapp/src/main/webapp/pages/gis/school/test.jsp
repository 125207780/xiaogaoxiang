<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

	<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<cxt:commonLinks />
	<jsp:include page="/pages/gis/common/mapjs.jsp" />
	<button id="btn">
	test</button>
	
	
	<script type="text/javascript"  >
			$("#btn").click(function(){
				var schoolId = "81d6a5097540e1406e20b92b";
				var level = "2";
				topwindow.showWindow({
					title : "详细信息",
					url : $.cxt + "/pages/gis/school/schoolIndex.jsp",
					datatype : "json",
					mtype : "POST",
					data : {
						"physicalId" : schoolId, 
						"level" : level,
					},
		    	});	
			})
	</script>