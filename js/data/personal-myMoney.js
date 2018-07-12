// 个人中心，我的资金明细
//定义全局变量，当点击相应的查询条件或者翻页时，如果需要恢复默认值的变量就 变默认值，其他照写
//为了防止冲突，全局变量需要加前缀
//var mon_index=0;
//var mon_state_num=0;
//var mon_soso_num=0; //资金明细类型 0消费记录,1充值记录
$("#moneyDetail").click(function(){
	 mon_index=0;
	// mon_state_num=0;
	 mon_soso_num=0;
	 
	  $.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/ucenter/moneyRecords',  
			data:{
				user_token:user_token,
				pageSize:10,
				pageIndex:0,
				//state:0, //资金明细类型 0消费记录,1充值记录
				soso:0
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				$("#rightContent").html('<div class="loading"></div>');
				$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			},
			success:function(data){  
				var code=data['code'];
				var info=data['info'];
				if(code==517){
					swal({
						title: "",
						text: ''+info+'，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					var attendStr='';
					attendStr+='<div class="row">';
					attendStr+='<div class="per-goods-box nomargin">';
					attendStr+='<div class="per_time_tab-content text-center">';
					attendStr+='您还没有登录哦，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>';
					attendStr+='</div>';
					attendStr+='</div>';
					attendStr+='</div>';
					  
					$("#rightContent").html(attendStr);
					return;
				}
				if(code!=200){
					swal({
						title: "",
						text: ''+info+'<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					return;
				}
				var attend_pageCount=data['pageCount'];
				var att_list=data['list'];
				//建立DOM结构
				attendStr='';
				attendStr+='<div class="row">';
					attendStr+='<div class="per-goods-box nomargin">';
					 // Nav tabs -->
					attendStr+='<ul class="nav nav-tabs" role="tablist">';
					
					//attendStr+='<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab" id="readyMenu" aria-expanded="true">消费记录</a></li>';
					attendStr+='<li role="presentation" class="active"><a href="#home" aria-controls="profile" role="tab" data-toggle="tab" id="virtualMenu"  aria-expanded="false">充值记录</a></li>';
					
					attendStr+='</ul>';
					attendStr+='<div class="per_time_tab-content">';
					// Tab panes input -->
					attendStr+='<div class="per-time clearfix">';
					attendStr+='<div class="per-time-left">';
					attendStr+='<a href="javascript:;" class="timeMenu active" data-num="0">全部</a>';
					attendStr+='<a href="javascript:;" class="timeMenu" data-num="1">今天</a>';
					attendStr+='<a href="javascript:;" class="timeMenu" data-num="2">本周</a>';
					attendStr+='<a href="javascript:;" class="timeMenu" data-num="3">本月</a>';
					attendStr+='<a href="javascript:;" class="timeMenu" data-num="4">最近三个月</a>';
					attendStr+='</div>';
				
					attendStr+='</div>';
					// Tab panes input end-->    
					// Tab panes -->
					attendStr+='<div class="tab-content">';
					attendStr+='<div role="tabpanel" class="tab-pane active" id="home">';
					 //商品列表
					attendStr+='<table class="table table-striped table-striped_details_1 table-bordered">';
					attendStr+='<thead>'; 
					attendStr+='<tr>'; 
					//attendStr+='<th>充值通道</th>';
					attendStr+='<th>充值金额（元）</th>';
					attendStr+='<th>充值状态</th>';
					attendStr+='<th width="170">充值时间</th>';
					
					attendStr+='<th width="120">交易号</th>';
					attendStr+='</tr>'; 
					attendStr+='</thead>'; 
					attendStr+='<tbody id="goodsIng">'; 
					
					attendStr+='</tbody>';
					attendStr+='</table>';
					//商品列表结束
					attendStr+='</div>';
					
					//
            
					var attendIngStr='';
					
				for(i=0;i<att_list.length;i++){
					var id=att_list[i]['id'];
					var charge_type=att_list[i]['charge_type'];
					var money=att_list[i]['money'];
					var status=att_list[i]['status'];
					var charge_number=att_list[i]['charge_number'];
					var create_time=att_list[i]['create_time'];
					
					//充值时间
					var  create_time2= create_time;
					var newDate_create = new Date();
					newDate_create.setTime(create_time2 * 1000);
					var my_create_time=newDate_create.format('yyyy-MM-dd hh:mm:ss.SS');
					
					attendIngStr+='<tr>';
					/*if(charge_type==1){
						attendIngStr+='<td>微信</td>';
						}else if(charge_type==2){
							attendIngStr+='<td>支付宝</td>';
							}else if(charge_type==3){
								attendIngStr+='<td>储蓄卡</td>';
								}else{
									attendIngStr+='<td>信用卡</td>';
									}*/
					
					attendIngStr+='<td>'+money+'</td>';
					if(status==0){
						attendIngStr+='<td>未充值</td>';
						}else{
							attendIngStr+='<td>已充值</td>';
							}
					
					attendIngStr+='<td>'+my_create_time+'</td>';
					
					attendIngStr+='<td>'+charge_number+'</td>';
					attendIngStr+='</tr>';
					
				}
               
				$("#rightContent").html(attendStr);//把获取到的数据加载进右边内容容器中
				$("#moneyDetail").addClass("active").siblings().removeClass("active");//结构加载完才让菜单变色
				if(att_list.length<=0){
					 // $("#goodsIng").html('<tr><td colspan="6" class="text-center"><span class="text-gray">没有记录</span></td></tr>');
					 $("#goodsIng").html('<tr><td colspan="6" class="text-center"><div class="text-gray"><img src="images/noresult.jpg"/>&nbsp&nbsp小主，您还没有充值记录哦，马上去&nbsp&nbsp<a href="recharge.html" class="text-danger">充值</a></div></td></tr>');
					 
					}else{
						$("#goodsIng").html(attendIngStr);//数据写进
						}
				
				//构建翻页结构
				 //*****************分页
			   
				var attendPageStr='';
				attendPageStr+='<nav class="text-center page">';
				attendPageStr+='<ul class="pagination clearfix" id="pagination">';
				attendPageStr+='</ul>';
				attendPageStr+='<div class="count-box">';
				attendPageStr+='<div class="count-num">共<em id="pageCount"></em>页</div>';
				attendPageStr+='</div>';
				attendPageStr+='</nav>';	
				  
				 var pageCount=data['pageCount'];
				 mon_count=pageCount;
				 var paginationStr='';
					 paginationStr+='<li><a href="javascript:;" onClick="preGoods_moneyRecord();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
				 for(i=1;i<=pageCount;i++){
					 if((i-1)==index){
						paginationStr+='<li class="active"><a href="javascript:;" onClick="getPageGoods_moneyRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_moneyRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }
					// paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_moneyRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }
					 paginationStr+='<li><a href="javascript:;" onClick="nextGoods_moneyRecord();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
				  //*****************分页
				 $("#rightContent").append(attendPageStr);
				 if(pageCount<=0){
					 $("#pagination").parent().hide();
				   }else{
					   $("#pagination").parent().show();
					   $("#pagination").html(paginationStr);
					   $("#pageCount").html(pageCount);
					   
					   }
				 //$("#pagination").html(paginationStr);
				 //$("#pageCount").html(pageCount);
			   
				
				//给当前按钮添加背景色
				/*$(".pageBtnNum").parent().first().addClass("active");
				$(".pageBtnNum").click(function(){
					  $(this).parent().addClass("active").siblings().removeClass("active");;
				  });*/
				  //如果是当前标签打开的情况下，不调用接口
				//实物
				$("#readyMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getMoneyRecord(0,0);
						mon_state_num=0;
						
						//state_num_lotteryRecord=1;
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
						mon_index=0;
					    mon_soso_num=0;
					}
				});
				//虚物
				$("#virtualMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getMoneyRecord(0,0);
						mon_state_num=1;
						
						//state_num_lotteryRecord=0;
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
						mon_index=0;
					    mon_soso_num=0;
					}
				});
				//按照时间呈现数据,全部，今天，....
				$(".timeMenu").click(function(){
					var new_soso_num=$(this).attr("data-num");
					$(this).addClass("active").siblings().removeClass("active");
					//每切换一次，页码从0开始
					getMoneyRecord(0,new_soso_num);
					//把获取到的值赋给全局变量，否则点击翻页时，soso_num又会变为0了
					mon_soso_num=new_soso_num;
				});
				
				$(".loading").empty();
			},complete:function(){
				$(".loading").empty();
			},
			error:function(){
				  swal({
						title: "",
						text: '获取数据失败！<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
				   $(".loading").empty();
				}
	  });
});

function getMoneyRecord(mon_index,mon_soso_num){
	
//	mon_state_num_2=mon_state_num;
	mon_index_2=mon_index;
	mon_soso_num_2=mon_soso_num;
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/ucenter/moneyRecords',  
			data:{
				user_token:user_token,
				pageSize:10,
				pageIndex:mon_index_2,
				//state:mon_state_num_2, //资金明细类型 0消费记录,1充值记录
				soso:mon_soso_num_2
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				$("#goodsIng").html('<div class="loading"></div>');
				$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			},
			success:function(data){ 
			    var attend_pageCount=data['pageCount'];
				var att_list=data['list'];
				
				if(att_list.length<=0){
					//$("#goodsIng").html('<tr><td colspan="6" class="text-center"><span class="text-gray">没有记录</span></td></tr>');
					//$("#pageNav").empty();
					$("#goodsIng").html('<tr><td colspan="6" class="text-center"><div class="text-gray"><img src="images/noresult.jpg"/>&nbsp&nbsp小主，您还没有充值记录哦，马上去&nbsp&nbsp<a href="recharge.html" class="text-danger">充值</a></div></td></tr>');
					}
				else{	
					  var attendIngStr='';
					  for(i=0;i<att_list.length;i++){
						  var id=att_list[i]['id'];
						  var charge_type=att_list[i]['charge_type'];
						  var money=att_list[i]['money'];
						  var status=att_list[i]['status'];
						  var charge_number=att_list[i]['charge_number'];
						  var create_time=att_list[i]['create_time'];
						  //充值时间
						  var  create_time2= create_time;
						  var newDate_create = new Date();
						  newDate_create.setTime(create_time2 * 1000);
						  var my_create_time=newDate_create.format('yyyy-MM-dd hh:mm:ss.SS');
						  attendIngStr+='<tr>';
						  /*if(charge_type==1){
							  attendIngStr+='<td>微信</td>';
							  }else if(charge_type==2){
								  attendIngStr+='<td>支付宝</td>';
								  }else if(charge_type==3){
									  attendIngStr+='<td>储蓄卡</td>';
									  }else{
										  attendIngStr+='<td>信用卡</td>';
										  }*/
						  
						  attendIngStr+='<td>'+money+'</td>';
						  if(status==0){
							  attendIngStr+='<td>未充值</td>';
							  }else{
								  attendIngStr+='<td>已充值</td>';
								  }
						  
						  attendIngStr+='<td>'+my_create_time+'</td>';
						  
						  attendIngStr+='<td>'+charge_number+'</td>';
						  attendIngStr+='</tr>';
						  
						  
					  }
					  
					  $("#goodsIng").html(attendIngStr);
				
				}
				//*****************分页
				 var pageCount=data['pageCount'];
				 mon_count=pageCount;
				 var paginationStr='';
					 paginationStr+='<li><a href="javascript:;" onClick="preGoods_moneyRecord();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
				 for(i=1;i<=pageCount;i++){
					 if((i-1)==mon_index){
						paginationStr+='<li class="active"><a href="javascript:;" onClick="getPageGoods_moneyRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_moneyRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }
					 //paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_moneyRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }
					 paginationStr+='<li><a href="javascript:;" onClick="nextGoods_moneyRecord();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
				  //*****************分页
				  if(pageCount<=0){
					 $("#pagination").parent().hide();
				   }else{
					   $("#pagination").parent().show();
					   $("#pagination").html(paginationStr);
					   $("#pageCount").html(pageCount);
					   
					   }
				// $("#pagination").html(paginationStr);
				// $("#pageCount").html(pageCount);
				 
				 $(".pageBtnNum").click(function(){
					  $(this).addClass("active").siblings().removeClass("active");;
				  });
			
			     $(".loading").empty();
			
			 },complete:function(){
				$(".loading").empty();
			},
			error:function(){
			  swal({
					title: "",
					text: '获取数据失败！<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
					html: true,
					type: "error",
					confirmButtonText:"确定",
					confirmButtonColor: "#ff4800",
				});
			   $(".loading").empty();
			}
	});
	
	
}

/****我的中奖记录****翻页按钮函数*********/
function getPageGoods_moneyRecord(pos){ 

     mon_index=pos;
    getMoneyRecord(mon_index,mon_soso_num);
	//alert(id+'////'+types+'....'+index);
	
}

function preGoods_moneyRecord(){ 
    mon_index=mon_index-1;
	if(mon_index<0){
		mon_index=0;
		return;
	}
   // getGoods(id,types,index);
	getMoneyRecord(mon_index,mon_soso_num);
}

function nextGoods_moneyRecord(){ 
    mon_index=mon_index+1;
	if(mon_index>(mon_count-1)){
		mon_index=mon_count-1;
		return;
	}
    //getGoods(id,types,index);
	getMoneyRecord(mon_index,mon_soso_num);
}