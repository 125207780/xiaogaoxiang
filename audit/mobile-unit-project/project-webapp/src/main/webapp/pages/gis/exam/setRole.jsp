<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<style type="text/css">
.rol_indexName {
	padding-left: 5px !important;
	padding-right: 5px !important;
	text-align: center;
}
.rol_op{
	width: 55px;
}
.rol_rang{
	width:40px;
	padding-left: 5px !important;
	padding-right: 5px !important;
}
.rol_sub {
	width:210px;
}
input[type='radio']{
	margin-top:-2px;
	vertical-align:middle;
	margin-left:10px;
}
#rol_div1_sub,#rol_div3_sub,#rol_div2_sub{
	background-color:transparent !important;
}
</style>
<div style="width: 100%">
	<table>
		<tr>
			<td colspan="2"><label>分段区间</label> <input type="radio"
				name="rol_rang" value="2" checked="checked">二段 <input
				type="radio" name="rol_rang" value="3">三段</td>
		</tr>
		<tr>
			<td>分段区间</td>
			<td>计算规则</td>
		</tr>
		<tr id="rol_div1">
			<td><input class="rol_indexName" id="rol_div1_1"
				style="width: 193px" type="text" disabled="disabled"> <select
				class="rol_op" id="rol_div1_2">
			</select> <input class="rol_rang" id="rol_div1_3" type="text"></td>
			<td>
				<input type="text" class="rol_sub" id="rol_div1_sub" readonly="true" />
			</td>
			
			<td>
				<button class="btn btn-primary" name="" value="" id="edit1">编辑</button>
			</td>
			
		</tr>
		<tr id="rol_div2" style="display: none">
			<td><input type="text" class="rol_rang" id="rol_div2_1">
				<select class="rol_op" id="rol_div2_2">
			</select> <input class="rol_indexName" id="rol_div2_3" style="width: 90px"
				type="text" disabled="disabled"> <select class="rol_op"
				id="rol_div2_4">
			</select> <input type="text" id="rol_div2_5" class="rol_rang"></td>
			<td>
				<input type="text" id="rol_div2_sub" class="rol_sub" readonly="true" />
			</td>
			
			<td>
				<button name="" class="btn btn-primary" value="" id="edit2">编辑</button>
			</td>
			
		</tr>
		
		<tr id="rol_div3">
			<td><input class="rol_indexName" id="rol_div3_1"
				style="width: 193px" type="text" disabled="disabled"> <select
				class="rol_op" id="rol_div3_2">
			</select> <input type="text" class="rol_rang" id="rol_div3_3"></td>
			<td><input type="text" class="rol_sub" id="rol_div3_sub" readonly="true" />
			</td>
			
			<td>
				<button name="" class="btn btn-primary" value="" id="edit3">编辑</button>
			</td>
		</tr>

		<tr>
			<td colspan="2" id="">
				<div id="example">列子: 4G+终端 &lt; 30, 自动线性得分</div>
			</td>
		</tr>

		<tr>
			<td colspan="2" id="rol_str"></td>
		</tr>
	</table>

</div>
<script type="text/javascript">
	$(function() {
		var opArr = [ "&gt;", "&gt;=", "=", "&lt;=", "&lt;" ];

		$(".rol_indexName").each(function() {
			$(this).val(indexName);
		})
		for (var i = 0, n = opArr.length; i < n; i++) {
			$(".rol_op").append(
					"<option value='"+i+"' >" + opArr[i] + "</option>");
		}

		$(".rol_rang").change(setRoleStr);
		$(".rol_op").change(setRoleStr);
		$(".rol_sub").change(setRoleStr);
		$('input:radio[name="rol_rang"]').click(selectRang);
		
		$("#edit1").click(function(){
			var id1 = "rol_div1_sub";
			editClick(id1);
		});
		$("#edit2").click(function(){
			var id2 = "rol_div2_sub";
			editClick(id2);
		});
		$("#edit3").click(function(){
			var id3 = "rol_div3_sub";
			editClick(id3);
		});
		
		initSetRole();
		function initSetRole() {
			$("#rol_str").append(roleStr);
			if (roleJson) {
				$(
						'input:radio[name="rol_rang"][value="'
								+ roleJson.rol_rang + '"]').attr("checked",
						true);
				$("#rol_div1_1").val(roleJson.div1_1);
				$("#rol_div1_2").val(roleJson.div1_2);
				$("#rol_div1_3").val(roleJson.div1_3);
				$("#rol_div1_sub").val(roleJson.div1_sub);
				if (roleJson.rol_rang == "3") {
					$("#rol_div2_1").val(roleJson.div2_1);
					$("#rol_div2_2").val(roleJson.div2_2);
					$("#rol_div2_3").val(roleJson.div2_3);
					$("#rol_div2_4").val(roleJson.div2_4);
					$("#rol_div2_5").val(roleJson.div2_5);
					$("#rol_div2_sub").val(roleJson.div2_sub);
					$("#rol_div2").show();
				}
				$("#rol_div3_1").val(roleJson.div3_1);
				$("#rol_div3_2").val(roleJson.div3_2);
				$("#rol_div3_3").val(roleJson.div3_3);
				$("#rol_div3_sub").val(roleJson.div3_sub);
			}
		}

		function selectRang() {
			var val = $('input:radio[name="rol_rang"]:checked').val();
			if (val == "3") {
				$("#rol_div2").show();
			} else {
				$("#rol_div2").hide();
			}
			setRoleStr();
		}

		function setRoleStr() {
			$("#rol_str").empty();
			var val = $('input:radio[name="rol_rang"]:checked').val();
			roleJson = {};
			roleStr = "";
			roleJson.rol_rang = val;
			///-------------------1-------------------
			roleStr += $("#rol_div1_1").val();
			roleJson.div1_1 = $("#rol_div1_1").val();
			roleStr += opArr[$("#rol_div1_2").val()];
			roleJson.div1_2 = $("#rol_div1_2").val();
			roleStr += $("#rol_div1_3").val();
			roleJson.div1_3 = $("#rol_div1_3").val();
			roleStr += ","
			roleStr += $("#rol_div1_sub").val();
			roleJson.div1_sub = $("#rol_div1_sub").val();
			roleStr += "<br>";

			if (val == "3") {
				roleStr += $("#rol_div2_1").val();
				roleJson.div2_1 = $("#rol_div2_1").val();
				roleStr += opArr[$("#rol_div2_2").val()];
				roleJson.div2_2 = $("#rol_div2_2").val();
				roleStr += $("#rol_div2_3").val();
				roleJson.div2_3 = $("#rol_div2_3").val();
				roleStr += opArr[$("#rol_div2_4").val()];
				roleJson.div2_4 = $("#rol_div2_4").val();
				roleStr += $("#rol_div2_5").val();
				roleJson.div2_5 = $("#rol_div2_5").val();
				roleStr += ","
				roleStr += $("#rol_div2_sub").val();
				roleJson.div2_sub = $("#rol_div2_sub").val();
				roleStr += "<br>";
			}

			roleStr += $("#rol_div3_1").val();
			roleJson.div3_1 = $("#rol_div3_1").val();
			roleStr += opArr[$("#rol_div3_2").val()];
			roleJson.div3_2 = $("#rol_div3_2").val();
			roleStr += $("#rol_div3_3").val();
			roleJson.div3_3 = $("#rol_div3_3").val();
			roleStr += ","
			roleStr += $("#rol_div3_sub").val();
			roleJson.div3_sub = $("#rol_div3_sub").val();
			roleStr += "<br>";

			$("#rol_str").append(roleStr)
		}
		
		//修改规则配置方法，使用弹出窗
		function editClick(id) {
			topwindow.showWindow({
				title : "计算规则",
				height : 500,
				url : $.cxt + "/pages/gis/exam/ruleEdit.jsp",
				bottons:[{
					title : "确认",
					fun : function(){
						//获取规则配置的值，去掉前后空格
						var content = $("#content").val().trim();
						if(content == ""){
							alert("规则不能为空");
							return false;
						}
						//根据传递不同的id，在规则页面显示不同的值，每一次确认之后，重新加载onchange事件
						if(id == "rol_div1_sub"){
							$("#rol_div1_sub").val(content);
							setRoleStr();
						}
						if(id == "rol_div2_sub"){
							$("#rol_div2_sub").val(content);
							setRoleStr();
						}
						if(id == "rol_div3_sub"){
							$("#rol_div3_sub").val(content);
							setRoleStr();
							
						}
						topwindow.removeWindow();//关闭窗口
					  }
					},
					{
					title : "清除",
					fun : function(){
						$("#content").val("");
					}
				}],
				//这里是在弹出窗(新页面加载完成之后),执行的方法
				fun : function (){
					//这里的id是点击事件，传过来的id,在最上面,点击的id不同时，取的值是不同的，但是设置的值是一样的，所有统一设置就行
					if(id == "rol_div1_sub"){
						var value1 = $("#rol_div1_sub").val();
					}
					if(id == "rol_div2_sub"){
						var value1 = $("#rol_div2_sub").val();
					}
					if(id == "rol_div3_sub"){
						var value1 = $("#rol_div3_sub").val();
					}
					//回显，往新页面中的id设置值
					$("#content").val(value1);
				}
			});
		}
		
	});

	
	
	
</script>