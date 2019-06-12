 
function initCnCountTable(channelCode){
	
	$.ajax({
		url : $.cxt + '/firstPage/getChannelTable',
		
		type : 'GET',
		async : false,
		data : {
			'code' : dtl_gridCode,
			
		},
		dataType : "json",
		success : function(list) {
			var a=[];
			var flag="";
            for(var i=0;i<list.length;i++){
            	 if(i==0){
            		 a.push(0);
            		 flag=list[i].CHNL_TYPE;
            	 }
            	var newflag=list[i].CHNL_TYPE;
            	if(flag==newflag){
            		
            	}else{
            		 a.push(i);
            		 flag=list[i].CHNL_TYPE;
            	}
            	 
            }
            a.push(list.length);
           // alert(a);
            /*var html="";
            for(var j=0;j<list.length;j++){
            	for(var n=0;n<a.length;n++){
            		
            	}
            }*/
            var table=$("#tbody")
            for(var n=0;n<a.length;n++){
            	var html="";
            	var count=1;
        		for(var m=a[n];m<a[n+1];m++){
        			
        		   if(count==1){
        			   html+="<tr>";
        			   html+="<td align='center' style='vertical-align:middle;text-align:center;' rowspan="+(a[n+1]-a[n])+">"+list[m].CHNL_TYPE+"</td>";
        			   html+="<td >"+list[m].CHNL_TYPE_LEVEL2+"</td>";
        			   html+="<td >"+list[m].NUM+"</td>";
        			   html+="</tr>";
        			   count=2;
        		   }else{
        			   html+="<tr>";
        			   html+="<td >"+list[m].CHNL_TYPE_LEVEL2+"</td>";
        			   html+="<td >"+list[m].NUM+"</td>";
        			   html+="</tr>";
        		   }
        		   
        		}
        		 count=1;
        		
        		 table.append(html);
        	}
			
		}
	});
}
