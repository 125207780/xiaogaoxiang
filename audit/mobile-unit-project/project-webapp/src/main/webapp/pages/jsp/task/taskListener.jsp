<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>Insert title here</title>
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/task/task.css">
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
	<style>
	.listener-leftContent {
		height: 97%;
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
	width: 60%;
    height: 100%;
    /* border-right: 1px solid #00E1FD; */
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
	
	.modal-bottom {
		height:0;
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
						<div class="baseInfo-div-left">
							<div class="baseInfo-leftone">活动名称：</div>
							<div class="baseInfo-rightText activityName taskText"></div>
						</div>
						<div class="baseInfo-div-right">
							<div class="baseInfo-leftone">战役名称：</div>
							<div class="baseInfo-rightText campaignName taskText"></div>
						</div>
					</li>
					<li  class="baseInfo-li">
						<div class="baseInfo-div-left">
							<div class="baseInfo-leftone">活动开始时间：</div>
							<div class="baseInfo-rightText activityBeginDate taskText"></div>
						</div>
						<div class="baseInfo-div-right">
							<div class="baseInfo-leftone">活动结束时间：</div>
							<div class="baseInfo-rightText activityEndDate taskText"></div>
						</div>
					</li>
					<li  class="baseInfo-li" id="li-bottom">
						<div class="baseInfo-leftone-all">产品名称：</div>
						<div class="baseInfo-rightTextAll offeringName taskText"></div>
					</li>
					<!-- <li  class="baseInfo-li">
						<div class="baseInfo-div-left">
							<div class="baseInfo-leftone">要求完成时间：</div>
							<div class="baseInfo-rightText taskFinishDate taskText"></div>
						</div>
						<div class="baseInfo-div-right">
							<div class="baseInfo-leftone">效果评估时间：</div>
							<div class="baseInfo-rightText taskEvaluateDate taskText"></div>
						</div>
					</li>
					<li  class="baseInfo-li" id="li-bottom">
						<div class="baseInfo-leftone-all">营销策略：</div>
						<div class="baseInfo-rightTextAll taskMarketingPlan taskText"></div>
					</li> -->
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
				<button class="btn btn-primary closeWindows" type="button" id="searchButton">确定</button>
				<button class="btn btn-primary closeWindows" type="button" id="clearButton">催办</button>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/task/taskListener.js"></script>
</html>