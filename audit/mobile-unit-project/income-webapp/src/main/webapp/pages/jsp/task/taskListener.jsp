<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/task/task.css">
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
	<style>
	.listener-leftContent {
		height:137px;
	    width: 100%;
	    overflow: auto;
	}
	.ztree li span.button.roots_open {
   		background: url(../../images/table/ztreeSelectDown.png) no-repeat center !important;
	}
	.ztree li span.button.roots_close{
		background: url(../../images/table/ztreeSelectRight.png) no-repeat center !important;
	}
	.ztree li span.button.center_open, .ztree li span.button.bottom_open{
		background: url(../../images/table/ztreeSelectDown.png) no-repeat center !important;
	}
	.ztree li span.button.center_close, .ztree li span.button.bottom_close{
		background: url(../../images/table/ztreeSelectRight.png) no-repeat center !important;
	}
	.baseInfo-rightText{
	width: 24%;
    height: 100%;
    border-right: 1px solid #00E1FD;
    display: block;
    float: left;
    line-height: 30px;
    text-align: left;
    overflow:hidden;		/* 内容超出宽度时隐藏超出部分的内容 */ 
	white-space:nowrap;		/* 不换行 */
	text-overflow:ellipsis;	/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用*/   
	}
	.baseInfo-rightTextAll{
	width: 74%;
    height: 100%;
    display: block;
    float: left;
    line-height: 30px;
    text-align: left;
	}
	
</style>
</head>
<body>
	<div class="listener-all">
		<div class="listener-left">
			<div class="view-title">
					完成情况
					<div class="myOrners myOrner1"></div>
					<div class="myOrners myOrner2"></div>
					<div class="myOrners myOrner3"></div>
					<div class="myOrners myOrner4"></div>
			</div>

			<div class="listener-leftContent">
				<div class="left-full taskListenerTree ztree" id="taskListenerTree">
				</div>
			</div>		
		</div>
		<div class="listener-task">
			<div class="view-title">
					任务基础信息
					<div class="myOrners myOrner1"></div>
					<div class="myOrners myOrner2"></div>
					<div class="myOrners myOrner3"></div>
					<div class="myOrners myOrner4"></div>
			</div>
			<div class="baseInfo">
				<ul class="baseInfo-content">
					<li  class="baseInfo-li">
						<div class="baseInfo-leftone">任务名称：</div>
						<div class="baseInfo-rightText taskName taskText"></div>
						
					</li>
					<li  class="baseInfo-li">
						<div class="baseInfo-leftone">任务大类：</div>
						<div class="baseInfo-rightText taskBigType taskText"></div>
					</li>
					<li  class="baseInfo-li">
						<div class="baseInfo-leftone">任务小类：</div>
						<div class="baseInfo-rightText taskSmallType taskText"></div>
						
					</li>
					<li  class="baseInfo-li">
						<div class="baseInfo-leftone">建议接触方式：</div>
						<div class="baseInfo-rightText taskTouchWay taskText"></div>
					</li>
					<li  class="baseInfo-li">
						<div class="baseInfo-leftone">任务目标：</div>
						<div class="baseInfo-rightTextAll taskTarget taskText"></div>
					</li>
					<li  class="baseInfo-li">
						<div class="baseInfo-leftone">要求完成时间：</div>
						<div class="baseInfo-rightText taskFinishDate taskText"></div>
						
					</li>
					<li  class="baseInfo-li">
						<div class="baseInfo-leftone">效果评估时间：</div>
						<div class="baseInfo-rightText taskEvaluateDate taskText"></div>
					</li>
					<li  class="baseInfo-li" id="li-bottom">
						<div class="baseInfo-leftone">营销策略：</div>
						<div class="baseInfo-rightTextAll taskMarketingPlan taskText"></div>
					</li>
				</ul>
			</div>	
		</div>
		<div class="listener-suggestion">
			<div class="view-title" style="margin-left:0;margin-top:-27px;">
				建议
				<div class="myOrners myOrner1"></div>
				<div class="myOrners myOrner2"></div>
				<div class="myOrners myOrner3"></div>
				<div class="myOrners myOrner4"></div>
			</div>	
			<div class="suggestion-div">
				<div id = "monitorCode" class="hidden"></div>
				<textarea rows="" cols="45" id="suggestion-textarea" class="taskText"></textarea>
			</div>
			<div class="suggestion-button">
				<button class="btn btn-primary" type="button" id="searchButton">确定</button>
				<button class="btn btn-primary" type="button" id="clearButton">催办</button>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/task/taskListener.js"></script>
</html>