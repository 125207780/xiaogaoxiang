var gridCode= $("#gridCode").val()	
$(function (){
	initGrid();
});
var selectChannelManger = new Array();

function initGrid(){
	$('#MainGridTable').jqGrid({
		url:$.cxt+"/maintence/initTable",
		postData:{gridCode:gridCode},
		datatype : "json",
		mtype: "POST",
		height : "auto",
		autowidth : true,
		colNames : [ '渠道经理', '联系电话','count','已经管理社会渠道个数', 'LOGIN_ID' ],
		colModel : [ 
		      {name : 'NAME',align : 'center'}, 
		      {name : 'PHONE',align : 'center'}, 
		      {name : 'SU',align : 'center',hidden : true}, 
		      {name : '',align : 'center',formatter :  addButton},
		      {name : 'LOGIN_ID',align : 'center',hidden : true},
		],
		//shrinkToFit:false,
		//autoScroll: true,
		viewrecords : true,
		rownumbers: true,
        multiselect: true,//复选框   
		rowNum : 10,
		rowList : [ 10,20, 30 ],
		pager : '#MainGridPage',
		loadComplete : topjqGridLoadComplete,
		beforeSelectRow:function(rowid, e){
			 $(this).jqGrid('resetSelection');
		       return(true);  
		},
		onSelectAll:function(aRowids,status) {
			messageAlert("至多选择一个社会渠道经理");
			$(this).jqGrid('resetSelection');
			return;
        },
        onSelectRow: function (rowid,state, e){
        	delete selectChannelManger[0];
        	selectChannelManger[0]=$(this).jqGrid("getRowdata",rowid);
        	 
		    
        }
	});
}
function addButton(cellvalue, options, rowdata){
	var html =""
	html += "<a    onclick=\"showChnl('" + rowdata.LOGIN_ID+ "')\" href=\"#\">"+rowdata.SU+"</a>";
	return  html;
}

function showChnl(LOGIN_ID){
	var ChnlCode = [] ;
	var chnlArr ="";
	$.ajax({
		url : $.cxt+"/maintence/getChnlCode",
		 data: {'LOGIN_ID':LOGIN_ID},
         type: "POST",
         success : function (json){
        	 for(var i=0;i<json.length;i++){
        		 ChnlCode.push(json[i].CHNL_CODE);
        	 }
        	 console.log(ChnlCode);
        	 chnlArr = ChnlCode.join(",");
        	 console.log(chnlArr);
        	topwindow.showWindow({
     		title : "渠道信息",
     		url : $.cxt + "/pages/gis/channelMaintenance/chnlInformation.jsp",
     		datatype: "json",
     		mtype: "POST",
     		data : {chnlArr:chnlArr},
     	})
         }
			
	});
	
}

function messageAlert(message){
	bootbox.dialog({
        message: "<span style=\"color:#000\">"+message+"</span>",
        title: "消息提示",
        buttons: {
            OK: {
                label: "确定",
                className: "btn-success",
            }
        }
    });
}



$.ajax({
	url : $.cxt + "/maintence/ChannelManager", 
	data : {gridCode:gridCode},
	type: "POST",
	loading:false,
	success : function(data) {
		var textInput =$("#txt");
		var inputDiv = $("#msc_input_div");
		 
		var list = [];
		for(var i=0,n=data.length;i<n;i++){
			list.push(data[i].NAME)
		}
		textInput.autocomplete({
			appendTo :inputDiv,
		      source: function(request, response) {
		    	  var results = $.ui.autocomplete.filter(list, $.trim(request.term));
		    	  response(results.slice(0, 5));
	    	  },
	    	  select: function( event, ui ) {
	    		   
	            }

		 });
	}
});
//
//var now=-1;       //声明一个变量值为-1，是为了在使用上下键的时候记录li的序号
//var resLength=0;  //这个变量是为了存li的长度
//$('#txt').keyup(function(event){
//    if(event.keyCode==38 || event.keyCode==40){    //每按一次上下键都会发送一次请求，所以要先
//        return;                                  //清除一边请求
//    };
//    console.log(event.which)
//    var dat={
//        wd:$('#txt').val()
//    };
//    if($('#txt').val()!=''){  //当输入框的值不为空的时候才能发送请求
//    	var name  = $('#txt').val();
//    	//alert($('#txt').val());
//    	$('#box ul li').remove();
//        $.ajax({
//            type:"POST",
//           /*  url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su", */
//            url: $.cxt+"/maintence/ChannelManager",
//            async:false,
//            data: {gridCode:gridCode,subject_id:name},
//            /*   dataType : 'jsonp',       //已经跨域了
//            jsonp:'cb',         */ 
//            dataType : 'json',
//           /* success: function (data) {
//                if (data != null) {
//                    var html = "<option value=''>请输入要查找的渠道经理</option>";
//                    for (var i = 0; i < data.length; i++) {     
//                    	var temp = data[i]
//        				html += "<option value=\"" + temp.LOGIN_ID + "\">" + temp.NAME +"</option>";	                       
//                    }
//                   $("#subjectId").html(html);
//              }
//            }*/
//            success:function(res){
//                console.log(res);
//                for(var i=0;i<res.length;i++){
//                    resLength=res.length;
//                    oli_i=$('<li value=\'' + res[i].LOGIN_ID + '\'>'+res[i].NAME+'</li>');
//                    console.log(oli_i)
//                    $('#box ul').append(oli_i);
//                    //要实现点击某一条词的时候也能让输入框中出现点击的这条词，所以要在success里面设置
//                    $('#box ul li').eq(i).click(function(){
//                        $('#txt').val($(this).text());
//                        /* $(this).addClass('current').siblings().removeClass('current') */
//                        $('#box ul li').remove();
//                    })
//                };
//
//            },
//            error:function(res){
//                console.log(res)  
//            }
//        });
//    }else{
//        $('#box ul').html('')    //如果输入框的词都删除了，把获取的数据结果也清空，因为已经获取到数据了，即使阻止再次发送请求也不会把已经获得的数据清除，所以这里直接用了最简单的办法，直接清空数据
//    };
//});
//
////在输入框中按上下键的时候对应的每一条数据的样式要有改变，这里使用了keydown这个事件足够了
//$('#txt').keydown(function(ev){
//    if(ev.keyCode==40){         //按下键时，now应该变大
//        now++;
//        $('#box ul li').eq(now).addClass('current').siblings().removeClass('current')
//        $('#txt').val($('#box ul li').eq(now).text())   
//        //resLength表示的是长度，now表示的是序号，所以要用resLength-1
//        if(now==resLength-1){   
//            now=-1;    //当选择的数据已经到了最底部的时候，就要从顶部开始重新循环，所以now又回到-1
//        }
//    };
//    if(ev.keyCode==38){
//        now--;      //按上键的时候，光标往上走，所以now减小  
//        $('#box ul li').eq(now).addClass('current').siblings().removeClass('current');
//        $('#txt').val($('#box ul li').eq(now).text())
//        if(now<-1){
//            now=resLength-1 //当光标走到最上面的时候，再循环到底部重新往上走
//        };
//
//    };
//    if(ev.keyCode==13){   //当按下回车的时候，应该开始查询具体的结果了，所以这里用的是百度查询的接口
//        window.open('https://www.baidu.com/s?wd='+$('#txt').val())
//        $('#txt').val('');
//        $('#box ul').html('')
//    }
//})


//点击百度一下这个按钮的时候也要实现跳转页面
$('#btn').click(function(){
    var subject_id= $('#txt').val();
    console.log(subject_id);
	$("#MainGridTable").jqGrid('clearGridData');
	$("#MainGridTable").jqGrid('setGridParam',{  
		url:$.cxt+"/maintence/initTable",
		postData:{gridCode:gridCode,subject_id:subject_id},
		datatype : "json",
		mtype: "POST",
	    page : 1    
	}).trigger("reloadGrid"); 
        $('#txt').val('');
        $('#box ul').html('')
    

})
