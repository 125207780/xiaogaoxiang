<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<cxt:commonLinks />
<jsp:include page="/pages/gis/common/mapjs.jsp"/>
<style>
ul,li{
    list-style: none;
    margin: 0;
    padding: 0;
}
li{
    line-height:30px;
    font-size:16px;
    padding:5px 10px;
}
li.current{
    background:#CCCCCC;
    color:#0000FF;
    cursor: pointer;
}
</style>
<button id="a" class="success"> show</button>
<button id="b" class="success"> show1</button>
<button id="c" class="success"> show2</button>
 <form id="uploadForm" enctype="multipart/form-data" action="#">
    <table>
        <tr>
            <td style="width: 10%">
                <input class="file" id="upfile" type="file" name="upfile"/>
            </td>
        </tr>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <tr>&nbsp;&nbsp;&nbsp;&nbsp;
            <td style="width: 15%">
                <input class="btn btn-primary btn-md" type="button" value="导入" id="upLoadPayerCreditInfoExcel"
                       name="btn"/>

            </td>
        </tr>

    </table>
</form>
 
<script>
var gridCode ="40cf7baf-c777-40c0-a7ec-591dd9003a19";
var channelCode="";//DY000379
$("#a").click(function(){
	topwindow.showWindow({
		title : '详细信息',
		width : 1200,
		data:{'channelCode':channelCode,'gridCode':gridCode},		    
		url : $.cxt + "/pages/gis/contract/detail.jsp",
		bottons : [] 
	})
});
$("#b").click(function(){	
	topwindow.showWindow({
		    title : '详细信息',
		    width : 1100,
		    data:{},
		     
			url : $.cxt + "/pages/gis/exam/gridIndexEntry.jsp",
			bottons : [] 
	   })
});
$("#c").click(function(){
	
	topwindow.showWindow({
		    title : '详细信息',
		    data:{},
		    width : 1100,
			url : $.cxt + "/pages/gis/exam/gridIndexEntryManager.jsp",
			bottons : [ ] 
	   })
});
/* $('#upLoadPayerCreditInfoExcel').click(function () {
    if (checkData()) {
        var formData = new FormData();
        formData.append("upfile", document.getElementById("upfile").files[0]);
        $.ajax({
            url: ,
            type: "post",
            data: formData,
            contentType: false,
            processData: false,

            success: function (data) {

                    alert(data.status);


            },
        });
    }
}); */

//JS校验form表单信息
function checkData() {
    var fileDir = $("#upfile").val();
    var suffix = fileDir.substr(fileDir.lastIndexOf("."));
    if ("" == fileDir) {
        alert("选择需要导入的Excel文件！");
        return false;
    }
    if (".xls" != suffix || ".xlsx" != suffix) {
        alert("选择Excel格式的文件导入！");
        return false;
    }
    return true;
}
</script>