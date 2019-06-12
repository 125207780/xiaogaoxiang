<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<cxt:commonLinks />
	<title>前台组件</title>
</head>
<body>
	<div class="page-content">
		<!-- 头部文字 -->
		<div class="page-header">
			<h1>
				前台组件
				<small>
					<i class="ace-icon fa fa-angle-double-right"></i>
					常见的布局.class
				</small>
			</h1>
		</div>
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 cleafix ">
			<table class="table table-bordered">
			  <thead>
			    <tr>
			      <th>名称</th>
			      <th>说明</th>
			      <th>示例</th>
			    </tr>
			  </thead>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
			  <tbody>
				 <tr>
				     <td rowspan="2" >
				      	<span class="text-info">栅格化布局</span>
				     </td>
				     <td>
				       <span class="text-danger">
				      		栅格化:
				      	</span>
				      		将屏幕的宽度均等的分成12份，是响应式的、可适应屏幕分辨率的网格系统；例如：pc端设备，只需在div中添加class为<span class="text-success">。col-md-4</span>，那么
				      		这个div的宽度就为整个屏幕宽度的<span class="text-success">30%</span>；</br>
				      		<span class="text-danger">*注：</span>使用栅格化布局的div，会有默认的内边距，padding为12px，可添加.no-padding去除内边距，<span class="text-success">详见下文</span>；
				      </td>
				      <td>
				      	<div>
				      		<span class="text-danger">屏幕分辨率小于768px：</span>
				      	    .col-xs-*
				      	 </div>
				      	<div> 
				      		<span class="text-danger">屏幕分辨率大于768px：</span>
				      		.col-sm-*
				      	</div>
				      	<div>
				      		<span class="text-danger">屏幕分辨率大于992px：</span>
				      		.col-md-*
				      	</div>
				      </td>
			     </tr>
			     <tr>
				      <td>
				      	<span class="text-danger">列偏移:</span>
				      	.col-xs/md-offsetleft-*:
				      </td>
				      <td>
				      	<div class="col-xs-12 bg-info">
				      		<div class="col-xs-4 bg-danger">
				      			.col-xs-4
				      		</div>
				      		<div class="col-xs-7 col-xs-offset-1 bg-danger">
				      			.col-xs-offset-7
				      		</div>
				      	</div>
				      </td>
				    
			     </tr>
			  	 <tr>
			      <td>
			      	<span class="text-info">.pull-left .pull-right</span>
			      </td>
			      <td>
			      	<span class="text-danger">浮动：</span><span class="text-success">.pull-left</span>向左浮动；<span class="text-success">.pull-right</span>向右浮动</td>
			      <td>
			      	<div class="bg-info">
			      		<div>我是父元素,子元素发生了浮动，我的高度不会被子元素撑开</div>
			      		<div class="pull-left bg-danger">我是向左浮动</div>
			      		<div class="pull-right bg-danger">我是向右浮动</div>
			      	</div>
			      </td>
			    </tr>
			    <tr>
				    <td>
				      	<span class="text-info">.clearfix</span>
			      	</td>
	                 <td>
				      	<span class="text-danger">清除浮动：</span>如果一个父盒子中有一个子盒子，并且父盒子没有设置高度，子盒子在父盒子中进行了浮动，那么将来父盒子的高度为0.由于父盒子的高度为0，下面的元素会自动补位，所以这个时候要进行浮动的清除
				     </td>
				     <td>
				      	<div class="col-xs-12 clearfix bg-info">
				      		<div>我是父元素,我添加了class：.clearfix</div>
				      		<div class="col-xs-6 bg-danger">我是子元素</div>
				      		<div class="col-xs-6 bg-danger">我是子元素</div>
				      	</div>
				     </td>
			    </tr>
			    <tr>
			      <td>
			     	 <span class="text-info">.no-padding</span>
			      </td>
			      <td>
			      	<span class="text-danger">去除内边距:</span>栅格化布局中，例.col-xs-6,会有默认的内边距，当要去除内边距时，则添加.class名称为：<span class="text-success">.no-padding</span>即可
			      </td>
			      <td>
			      	<div class="col-xs-12 clearfix no-padding bg-info">
			      		<div>我是父元素,我添加了class：.no-padding</div>
			      		<div class="col-xs-6 bg-danger">我是子元素</div>
			      		<div class="col-xs-6 bg-danger">我是子元素</div>
			      	</div>
			      </td>
			    </tr>
			    <tr>
			      <td>
			     	 <span class="text-info">背景颜色</span>
			      </td>
			      <td>
			      	<div class="text-danger">背景颜色:</div>只需在dom上添加class名称即可，不同的class对应相应的背景颜色
			        <div class="col-xs-12 col-md-12 no-padding">
			        	<div class="col-xs-2 col-md-2 no-padding bg-primary align-center">
			        	    .bg-primary
			        	</div>
			        	<div class="col-xs-2 col-md-2 no-padding bg-success align-center">
			        	    .bg-success
			        	</div>
			        	<div class="col-xs-2 col-md-2 no-padding bg-info align-center">
			        	    .bg-info
			        	</div>
			        	<div class="col-xs-2 col-md-2 no-padding bg-warning align-center">
			        	    .bg-warning
			        	</div>
			        	<div class="col-xs-2 col-md-2 no-padding bg-danger align-center">
			        	    .bg-danger
			        	</div>
			        </div>
			      </td>
			      <td>
			      </td>
			    </tr>
			     <tr>
			      <td>
			     	 <span class="text-info">文字颜色</span>
			      </td>
			      <td>
			      	<span class="text-danger">文字颜色:</span>只需在dom上添加class名称即可，不同的class对应相应的文字颜色
			      	<div class="col-xs-12 clearfix no-padding">
			      		<div class="col-xs-2 col-md-2 no-padding text-primary align-center">
			        	    .text-primary
			        	</div>
			        	<div class="col-xs-2 col-md-2 no-padding text-success align-center">
			        	    .text-success
			        	</div>
			        	<div class="col-xs-2 col-md-2 no-padding text-info align-center">
			        	    .text-info
			        	</div>
			        	<div class="col-xs-2 col-md-2 no-padding text-warning align-center">
			        	    .text-warning
			        	</div>
			        	<div class="col-xs-2 col-md-2 no-padding text-danger align-center">
			        	    .text-danger
			        	</div>
			      	</div>
			      </td>
			      	<td></td>
			    </tr>
			  </tbody>
		</table>
	</div>
</div>
</body>
</html>