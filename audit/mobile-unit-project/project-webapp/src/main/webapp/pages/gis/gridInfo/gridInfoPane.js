 function initGridInfoPane(gridCode){
	    incomeInfoLinkage(gridCode);
		businessInfoLinkage(gridCode);
		getGridInfoLinkage(gridCode);//网格基本信息
 }

function getGridInfoLinkage(gridCode){
	  gridManagementClick(gridCode);
	 
		$.ajax({
			url : $.cxt + '/gridInfo/gridBaseInfo',
			type : "POST",
			data :{gridCode :gridCode},
			dataType: "json",
			success : function(json){
				var data = JSON.parse(json);
				if(data.code == '0'){
					//网格统计信息-基本信息
					$("#gridName").empty()
					$("#gridType").empty()
					$("#gridManager").empty()
					$("#phoneNumber").empty()
					$("#saleDeptName").empty()
					$("#groupNum").empty()
					$("#userNum").empty()
//					$("#kdPercent").empty()
					$("#physicalNum").empty()
					$("#gridArea").empty()
					$("#createDate").empty()
					$("#kdNum").empty()
					$("#totalFee").empty()
					$("#totalFeeLast").empty()
					$("#compare").empty()
					$("#kdFee").empty()
					$("#ywFee").empty()
					$("#newUserNum").empty()
					$("#outnetNum").empty()
//					$("#voiceNum").empty()
//					$("#voicePortNum").empty()
//					$("#dataNum").empty()
//					$("#dataPortNum").empty()
//					$("#voicePer").empty()
//					$("#voicePortPer").empty()
//					$("#dataPer").empty()
//					$("#dataPortPer").empty()
					$("#remarks").empty()
					$("#tabname").empty()
					$("#tableCreaterTime").empty()
					$("#owner").empty()
					$("#minTime").empty()
					$("#maxTime").empty()
					$("#gridCode").empty()
					$("#gridName1").empty()
					$("#gridType1").empty()
					$("#gridManager1").empty()
					$("#phoneNumber1").empty()
					$("#branchCompany").empty()
					$("#branchSubstation").empty()
					$("#creater").empty()
					$("#createTime").empty()
					
					$("#endFiberNum").empty()
					$("#endFiberUnused").empty()
					$("#equiproomFiberNum").empty()
					$("#equiproomFiberUnused").empty()
					
					//网格统计信息-基本信息
					$("#gridName").append(data.data[0].gridName)
					$("#gridType").append(data.data[0].gridType)
					$("#gridManager").append(data.data[0].gridManager)
					$("#phoneNumber").append(data.data[0].phoneNumber)
//					$("#saleDeptName").append(data.data[0].saleDeptName)
					$("#groupNum").append(data.data[0].groupNum)
					$("#userNum").append(data.data[0].userNum)
//					$("#kdPercent").append(data.data[0].kdPercent)
					$("#physicalNum").append(data.data[0].physicalNum)
					$("#gridArea").append(data.data[0].gridArea)
					$("#createDate").append(data.data[0].createDate)
					
					$("#endFiberNum").append(data.data[0].endFiberNum)
					$("#endFiberUnused").append(data.data[0].endFiberUnused)
					//网格统计信息 -统计信息
					$("#kdNum").append(data.data[0].kdNum)
					$("#totalFee").append(data.data[0].totalFee)
					$("#totalFeeLast").append(data.data[0].totalFeeLast)
					$("#compare").append(data.data[0].compare)
					$("#kdFee").append(data.data[0].kdFee)
					$("#ywFee").append(data.data[0].ywFee)
					$("#newUserNum").append(data.data[0].newUserNum)
					$("#outnetNum").append(data.data[0].outnetNum)
					
					$("#equiproomFiberNum").append(data.data[0].equiproomFiberNum)
					$("#equiproomFiberUnused").append(data.data[0].equiproomFiberUnused)
					//网格基本信息-资源信息
//					$("#voiceNum").append(data.data[0].voiceNum)
//					$("#voicePortNum").append(data.data[0].voicePortNum)
//					$("#dataNum").append(data.data[0].dataNum)
//					$("#dataPortNum").append(data.data[0].dataPortNum)
//					$("#voicePer").append(data.data[0].voicePer)
//					$("#voicePortPer").append(data.data[0].voicePortPer)
//					$("#dataPer").append(data.data[0].dataPer)
//					$("#dataPortPer").append(data.data[0].dataPortPer)
					//网格基本信息-网格基本信息
					$("#remarks").append(data.data[0].remarks)
					$("#tabname").append(data.data[0].tabname)
					$("#tableCreaterTime").append(data.data[0].tableCreaterTime)
					$("#owner").append(data.data[0].owner)
					$("#minTime").append(data.data[0].minTime)
					$("#maxTime").append(data.data[0].maxTime)
					$("#gridCode").append(data.data[0].gridCode)
					$("#gridName1").append(data.data[0].gridName)
					$("#gridType1").append(data.data[0].gridType)
					$("#gridManager1").append(data.data[0].gridManager)
					$("#phoneNumber1").append(data.data[0].phoneNumber)
					$("#branchCompany").append(data.data[0].branchCompany)
					$("#branchSubstation").append(data.data[0].branchSubstation)
					$("#creater").append(data.data[0].creater)
					$("#createTime").append(data.data[0].createTime)
				}
			}
			
		})
	}
	function incomeInfoLinkage(gridCode){
		$.ajax({
			url : $.cxt + '/gridInfo/gridBaseInfo',
			type : "POST",
			data :{gridCode :gridCode},
			dataType: "json",
			success : function(json){
				var data = JSON.parse(json);
				var incomeInfoDom= document.getElementById('incomeInfo')
				//incomeInfoDom.style.width = '359.59px';
				//incomeInfoDom.style.height = '250px';				
				var incomeInfo = echarts.init(incomeInfoDom);
				//incomeInfo.resize();
				option = {
						//backgroundColor: '#192469',
						tooltip: {
							trigger: 'item',
							 borderWidth: 1,
							formatter: "{a}{b}&nbsp;: {c} <br/>&nbsp;&nbsp;&nbsp;&nbsp;占比&nbsp;:&nbsp;&nbsp;{d}%",
						},
						legend: {
							right:40,
							top:40,
							orient: 'vertical',
							y: 'top',
							itemWidth: 14,
							itemHeight: 24,
							align: 'left',
							data:['2/3G收入','4G收入','家宽收入'],
							textStyle: {
								color: '#fff'
							}
						},
						series: [
						         
						         {
						        	 name:'',
						        	 type:'pie',
						        	 radius: '50%',
						        	 center:['40%','50%'],
						        	 color: [ '#01FFFF','#0BB4E4','#9F85FF','#2828FF','#C76B73','#808040'],
						        	 label: {
						        		 normal: {
						        			 formatter: '{b}\n{d}%',
						        		 },
						        		 
						        	 },
						        	 data:[
						        	       {value:data.data[0].fee2g3g,name:'2/3G收入'},
						        	       {value:data.data[0].fee4g,name:'4G收入'},
						        	       {value:data.data[0].kdFee,name:'家宽收入'},
						        	      /* {value:data.data[0].terminalFee,name:'终端收入'},
						        	       {value:data.data[0].xhjtFee,name:'新和家庭收入'},
						        	       {value:data.data[0].tvFee,name:'魔百盒收入'}*/
						        	       ]
						         }
						         ]
				};
				
				incomeInfo.setOption(option,true);
				window.onreszie = function(){ 
					incomeInfo.resize()
				};
			}
		})
	} 
	
	function businessInfoLinkage(gridCode){
		$.ajax({
		url : $.cxt + '/gridInfo/gridBaseInfo',
		type : "POST",
		data :{gridCode :gridCode},
		dataType: "json",
		success : function(json){
			var data = JSON.parse(json);
			var businessInfoDom= document.getElementById('businessInfo')
			businessInfoDom.style.width = '359.59px';
			businessInfoDom.style.height = '180px';
			var businessInfo = echarts.init(businessInfoDom);
			var data1=[data.data[0].new2g3gNum,data.data[0].new4gNum,data.data[0].kdNewNum,data.data[0].terminalNewNum,data.data[0].newXhjtNum,data.data[0].tvNewNum];
			var option = {
					tooltip : {
						trigger: 'axis',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					color:['#01f99b','#3366ff'],
					legend: {
						data: [
						       '月接口表', '日接口表'
						       ],
						       bottom:'bottom',
						       textStyle:{
						    	   color:"#fff",
						    	   fontSize:10
						       },
						       show:false,
						       itemWidth:20,
						       itemHeight:10
					},
					grid: {
						left: '5%',
						right: '5%',
						top: '5%',
						bottom:'10%',
						containLabel: true
					},
					xAxis : [
					         /*{
		            type : 'category',
		            data : ['新增','增量','全量'],
		            axisLine:{
		                lineStyle:{
		                    color:'#fff'
		                }
		            }	
		        },*/
					         {
					        	 type : 'category',
					        	 position:'bottom',
					        	 offset:10,
					        	 data : ['2G/3G用户','4G用户','家宽用户'],
					        	 axisLine:{
					        		 show:false,
					        		 lineStyle:{
					        			 color:'#0099ff',
					        			 width:0,
					        			 opacity:0
					        		 }
					        	 },
					        	 axisTick:{
					        		 show:false
					        	 },
					        	 axisLabel: {
	                                 interval:0,
	                                 rotate:0
	                              }
					        	 
					         }
					         ],
					         yAxis : [{
					        	 type : 'value',
					        	 name: '单位:个',
					        	 axisLine:{
					        		 lineStyle:{
					        			 color:'#ccc',
					        			 width:0,
					        			 opacity :0
					        		 }
					        	 }
					         
					         }],
					         series : [
					                   {
					                	   name:'',
					                	   type:'bar',
					                	   barWidth :10,
					                	   barGap:0.4,
					                	   data:data1,
					                	   label: {
					                		   normal: {
					                			   show: true,
					                			   position: 'top',
					                			   formatter: function(params) {
					                				   return params.value
					                			   },
					                			   textStyle: {color: '#fff'}
					                		   }
					                	   }
					                   
					                   }
					                   ]
			};
			businessInfo.setOption(option,true);
		}
		
	})
		
	}
 function gridManagementClick(orgId){
	 $("#gridManagement").off("click");
	 $("#gridManagement").click(function(){
		 
		 gridIWindow(orgId);
	});
	 
 }	
	
	//网格信息窗口
  function gridIWindow(orgId){
		var msg='管理人员信息'
		topwindow.showWindow({
			   title : msg,
			   data:{},
				url : $.cxt + "/pages/gis/gridInfo/gridManagerInfo.jsp?orgId="+orgId,
				/* bottons : [{
					title : "关闭" ,
					fun : function() {
						topwindow.removeWindow();
					}
				}]  */
		   })
	}