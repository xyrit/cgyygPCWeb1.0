// 这是中奖记录
/*********我的中奖记录*********/
//,我的中奖记录
//定义全局变量，当点击相应的查询条件或者翻页时，如果需要恢复默认值的变量就 变默认值，其他照写
//为了防止冲突，全局变量需要加前缀
var lo_index=0;
var lo_state_num=1;
var lo_soso_num=0;

	
$("#luckyRecord").click(function(){
	 lo_index=0;
	 lo_state_num=1;
	 lo_soso_num=0;
	 getLotteryFirst();
});

function getLotteryFirst(){
	   if(typeof(user_token) == "undefined") {
		
		  var attendStr='';
		  attendStr+='<div class="row">';
		  attendStr+='<div class="per-goods-box nomargin">';
		  attendStr+='<div class="per_time_tab-content text-center">';
		  attendStr+='您还没有登录哦，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>';
		  attendStr+='</div>';
		  attendStr+='</div>';
		  attendStr+='</div>';
			
		  $("#rightContent").html(attendStr);
		   window.location.href='login.html';
		   /*swal({
			   title: "",
			   text: '您还没有登录，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
			   html: true,
			   type: "error",
			   confirmButtonText:"确定",
			   confirmButtonColor: "#ff4800",
		   },function(){
			   //设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
			   setTimeout(function(){
				   window.location.href="login.html"
			   }, 500);
		   });*/

		return;
	  }
	
	  $.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/UcenterLottery/lotteryRecord',  
			data:{
				user_token:user_token,
				pageSize:10,
				pageIndex:0,
				state:1, // 0 虚拟商品,1实物商品. (必须)
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
					window.location.href='login.html';
					/*swal({
						title: "",
						text: ''+info+'，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					},function(){
						//设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
						setTimeout(function(){
						  window.location.href="login.html"
						}, 500);
					});*/
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
						text: ''+info+'',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					return;
				}
				$("#luckyRecord").addClass("active").siblings().removeClass("active");
				var attend_pageCount=data['pageCount'];
				var att_list=data['list'];
				//建立DOM结构
				attendStr='';
				attendStr+='<div class="row">';
					attendStr+='<div class="per-goods-box nomargin">';
					 // Nav tabs -->
					attendStr+='<ul class="nav nav-tabs" role="tablist">';
					
					attendStr+='<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab" id="readyMenu" aria-expanded="true">实物商品</a></li>';
					attendStr+='<li role="presentation"><a href="#home" aria-controls="profile" role="tab" data-toggle="tab" id="virtualMenu"  aria-expanded="false">虚拟商品</a></li>';
					
					
					
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
					attendStr+='<th>商品图片</th>'; 
					attendStr+='<th>商品名称</th>';
					attendStr+='<th>商品状态</th>';
					attendStr+='<th width="170">物流信息</th>';
					
					attendStr+='<th width="120">操作</th>';
					attendStr+='</tr>'; 
					attendStr+='</thead>'; 
					attendStr+='<tbody id="goodsIng">'; 
					
					attendStr+='</tbody>';
					attendStr+='</table>';
					//商品列表结束
					attendStr+='</div>';
					
					//即将揭晓
                    //商品列表结束-->
                    $("#rightContent").html(attendStr);//把获取到的数据加载进右边内容容器中
					var attendIngStr='';
					
				for(i=0;i<att_list.length;i++){
					var id=att_list[i]['id'];
					var pid=att_list[i]['pid'];
					var title=att_list[i]['title'];
					var lottery_code=att_list[i]['lottery_code'];
					var lottery_id=att_list[i]['lottery_id'];
					var attend_count=att_list[i]['attend_count'];
					var need_count=att_list[i]['need_count'];
					var path=data['host']+att_list[i]['path'];
					var attend_time=att_list[i]['attend_time'];//参与时间
					var cover_id=att_list[i]['cover_id'];
					var lottery_code=Number(att_list[i]['lottery_code']);
					var nickname=att_list[i]['nickname'];
					var apply_time=att_list[i]['apply_time'];//揭晓时间
					var remain_count=att_list[i]['remain_count'];
					var startCode=Number(data['startCode']);
					var luckyNum=startCode+lottery_code;//这是幸运号码
					var status=att_list[i]['status']; //物流状态：1待发货，2待客户签收，3已签收，4已拒绝，5已申请换货，6已拒绝申请换货
					var express_name=att_list[i]['express_name'];//物流公司名称
					var express_number=att_list[i]['express_number'];//物流单号
					var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
					var progress_attend='';

					 if(need_count<1){
						  progress_attend=0;
					   }else{
						  progress_attend=(attend_count/need_count)*100;
						}
					
					//时间戳格式化
					//参与时间
					/*var  time_attend= create_time;
					var newDate_attend = new Date();
					newDate_attend.setTime(time_attend * 1000);
					var my_create_time_attend=newDate_attend.format('yyyy-MM-dd h:m:s');*/
					//揭晓时间
					/*var  time_lottery= lottery_time;
					var newDate_lottery = new Date();
					newDate_lottery.setTime(time_lottery * 1000);
					var my_lottery_time=newDate_lottery.format('yyyy-MM-dd h:m:s');*/
					
					//把startCode分离出来，然后以分号连接成一个新数字
					/*var my_trueAttendCode='';
					var s=lottery_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
					for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
					  //把startCode分离出来，然后以分号连接成一个新数字
					   my_trueAttendCode+=(startCode+Number(s[j]))+'，';
					}
					my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号*/
					
					
					attendIngStr+='<tr>';
					attendIngStr+='<td scope="row"><a href="ready-publish.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" alt="" width="60"></a></td>';
					attendIngStr+='<td>';
					attendIngStr+='<a href="ready-publish.html?pid='+goods_link+'" target="_blank" class="text-danger">'+title+'</a>';
					attendIngStr+='<p class="nomargin">总需：'+need_count+'人次</p>';
					//attendIngStr+='<p class="nomargin">获得者：<a  href="#" class="text-danger">'+nickname+'</a>（本期共参与1人次）</p>';
					attendIngStr+='<p class="nomargin">获奖幸运码：'+luckyNum+'</p>';
					attendIngStr+='<p class="nomargin">揭晓时间：'+apply_time+'</p>';
					attendIngStr+='<p class="nomargin">参与时间：'+attend_time+'</p>';
					attendIngStr+='</td>';
					if(status==1){
						attendIngStr+='<td>待发货</td>';
					}else if(status==2){
						attendIngStr+='<td>待客户签收</td>';
						}else if(status==3){
						attendIngStr+='<td>已签收</td>';
						}else if(status==4){
						attendIngStr+='<td>已拒绝</td>';
						}else if(status==5){
						attendIngStr+='<td>已申请换货</td>';
						}else{
							attendIngStr+='<td>已拒绝申请换货</td>';
							}
							
					if(status==1){
						
						attendIngStr+='<td>暂无物流信息</td>';
					  }
					  else{
						  
						  attendIngStr+='<td>物流公司：<span class="text-danger">'+express_name+'</span>，单号：<span class="text-danger">'+express_number+'</span></td>';
						  }
					
					if(status==2){
						attendIngStr+='<td><button class="btn btn-danger cg-btn-danger" id="btn'+id+'" onClick="receive('+pid+','+id+','+lottery_id+');">确定收货</button></td>';
					} else if(status==3){
						attendIngStr+='<td><button class="btn btn-danger cg-btn-danger disabled">已确认签收</button></td>';
						}
					else if(status==5){
						attendIngStr+='<td><button class="btn btn-danger cg-btn-danger disabled">申请换货中</button></td>';
					}
					else{
						attendIngStr+='<td><button class="btn btn-danger cg-btn-danger disabled">确定收货</button></td>';
						}
					
					attendIngStr+='</tr>';
					
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
				 lo_count=pageCount;
				 var paginationStr='';
					 paginationStr+='<li><a href="javascript:;" onClick="preGoods_lotteryRecord();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
				 for(i=1;i<=pageCount;i++){
					 if((i-1)==lo_index){
						paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }
					 //paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }
					 paginationStr+='<li><a href="javascript:;" onClick="nextGoods_lotteryRecord();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
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
						getLotteryRecord(0,1,0);
						lo_state_num=1;
						
						//state_num_lotteryRecord=1;
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
						lo_index=0;
					    lo_soso_num=0;
					}
				});
				//虚物
				$("#virtualMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getLotteryRecord(0,0,0);
						lo_state_num=0;
						
						//state_num_lotteryRecord=0;
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
						lo_index=0;
					    lo_soso_num=0;
					}
				});
				//按照时间呈现数据,全部，今天，....
				$(".timeMenu").click(function(){
					var new_soso_num=$(this).attr("data-num");
					$(this).addClass("active").siblings().removeClass("active");
					//每切换一次，页码从0开始
					getLotteryRecord(0,lo_state_num,new_soso_num);
					//把获取到的值赋给全局变量，否则点击翻页时，soso_num又会变为0了
					lo_soso_num=new_soso_num;
				});
				/*if(att_list.length<=0){
					$("#goodsIng").html('<tr><td colspan="6" class="text-center"><span class="text-gray">没有记录</span></td></tr>');
					return;
				  }*/
				 if(att_list.length<=0){
					$("#goodsIng").html('<tr><td colspan="6" class="text-center"><div class="text-gray"><img src="images/noresult.jpg"/>&nbsp&nbsp小主，您还没有中奖记录，<a href="index.html" class="text-danger">立即参与</a>&nbsp橙果云购&nbsp吧~</div></td></tr>');
					
				}else{
					
					$("#goodsIng").html(attendIngStr);//数据写进
				} 
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

function getLotteryRecord(lo_index,lo_state_num,lo_soso_num){
	
	lo_state_num_2=lo_state_num;
	lo_index_2=lo_index;
	lo_soso_num_2=lo_soso_num;
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/UcenterLottery/lotteryRecord',  
			data:{
				user_token:user_token,
				pageSize:10,
				pageIndex:lo_index_2,
				state:lo_state_num_2, //
				soso:lo_soso_num_2
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
					$("#goodsIng").html('<tr><td colspan="6" class="text-center"><div class="text-gray"><img src="images/noresult.jpg"/>&nbsp&nbsp小主，您还没有中奖记录，<a href="index.html" class="text-danger">立即参与</a>&nbsp橙果云购&nbsp吧~</div></td></tr>');
					}
				else{	
					  var attendIngStr='';
					  for(i=0;i<att_list.length;i++){
						  var id=att_list[i]['id'];
						  var pid=att_list[i]['pid'];
						  var title=att_list[i]['title'];
						  var lucky_code=att_list[i]['lucky_code'];
						  var lottery_id=att_list[i]['lottery_id'];
						  var attend_count=att_list[i]['attend_count'];
						  var need_count=att_list[i]['need_count'];
						  var path=data['host']+att_list[i]['path'];
						  var attend_time=att_list[i]['attend_time'];//参与时间
						  var cover_id=att_list[i]['cover_id'];
						  var lottery_code=Number(att_list[i]['lottery_code']);
						  var nickname=att_list[i]['nickname'];
						  var apply_time=att_list[i]['apply_time'];//揭晓时间
						  var remain_count=att_list[i]['remain_count'];
						  var startCode=Number(data['startCode']);
						  var luckyNum=startCode+lottery_code;//这是幸运号码
						  var status=att_list[i]['status']; //物流状态：1待发货，2待客户签收，3已签收，4已拒绝，5已申请换货，6已拒绝申请换货
				       	  var express_name=att_list[i]['express_name'];//物流公司名称
					      var express_number=att_list[i]['express_number'];//物流单号
						  var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
						  var progress_attend='';
						   if(need_count<1){
								progress_attend=0;
							 }else{
								progress_attend=(attend_count/need_count)*100;
							  }
						  
						  //时间戳格式化
						  //参与时间
						 /* var  time_attend= create_time;
						  var newDate_attend = new Date();
						  newDate_attend.setTime(time_attend * 1000);
						  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd h:m:s');*/
						  //揭晓时间
						  /*var  time_lottery= lottery_time;
						  var newDate_lottery = new Date();
						  newDate_lottery.setTime(time_lottery * 1000);
						  var my_lottery_time=newDate_lottery.format('yyyy-MM-dd h:m:s');*/
						  
						  //把startCode分离出来，然后以分号连接成一个新数字
						  /*var my_trueAttendCode='';
						  var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
						  for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
							//把startCode分离出来，然后以分号连接成一个新数字
							 my_trueAttendCode+=(startCode+Number(s[j]))+'，';
						  }
						  my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号*/
						  
						  //构建DOM,获奖记录的结构
						  attendIngStr+='<tr>';
						  attendIngStr+='<td scope="row"><a href="ready-publish.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" alt="" width="60"></a></td>';
						  attendIngStr+='<td>';
						  attendIngStr+='<a href="ready-publish.html?pid='+goods_link+'" target="_blank" class="text-danger">'+title+'</a>';
						  attendIngStr+='<p class="nomargin">总需：'+need_count+'人次</p>';
						  //attendIngStr+='<p class="nomargin">获得者：<a  href="#" class="text-danger">'+nickname+'</a>（本期共参与1人次）</p>';
						  attendIngStr+='<p class="nomargin">获奖幸运码：'+luckyNum+'</p>';
						  attendIngStr+='<p class="nomargin">揭晓时间：'+apply_time+'</p>';
						  attendIngStr+='<p class="nomargin">参与时间：'+attend_time+'</p>';
						  attendIngStr+='</td>';
						  
						  if(status==1){
							  attendIngStr+='<td>待发货</td>';
						  }else if(status==2){
							  attendIngStr+='<td>待客户签收</td>';
							  }else if(status==3){
							  attendIngStr+='<td>已签收</td>';
							  }else if(status==4){
							  attendIngStr+='<td>已拒绝</td>';
							  }else if(status==5){
							  attendIngStr+='<td>已申请换货</td>';
							  }else{
								  attendIngStr+='<td>已拒绝申请换货</td>';
								  }
								  
						  if(status==1){
							  
							  attendIngStr+='<td>暂无物流信息</td>';
							}
							else{
								
								attendIngStr+='<td>物流公司：<span class="text-danger">'+express_name+'</span>，单号：<span class="text-danger">'+express_number+'</span></td>';
								}
						  
						  if(status==2){
							  attendIngStr+='<td><button class="btn btn-danger cg-btn-danger" id="btn'+id+'" onClick="receive('+pid+','+id+','+lottery_id+');">确定收货</button></td>';
						  } else if(status>=3){
							  attendIngStr+='<td><button class="btn btn-danger cg-btn-danger disabled">已确认签收</button></td>';
							  }
						  else{
							  attendIngStr+='<td><button class="btn btn-danger cg-btn-danger disabled">确定收货</button></td>';
							  }
						 // attendIngStr+='<td>正在出库</td>';
						 // attendIngStr+='<td>暂无</td>';
						 // attendIngStr+='<td><button class="btn btn-danger cg-btn-danger disabled">确定收货</button></td>';
						  attendIngStr+='</tr>';
						  
						  
					  }
					  
					  $("#goodsIng").html(attendIngStr);
				
				}
				//*****************分页
				 var pageCount=data['pageCount'];
				 lo_count=pageCount;
				 var paginationStr='';
					 paginationStr+='<li><a href="javascript:;" onClick="preGoods_lotteryRecord();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
					 
				 for(i=1;i<=pageCount;i++){
					 if((i-1)==lo_index){
						paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }
					// paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }
					 paginationStr+='<li><a href="javascript:;" onClick="nextGoods_lotteryRecord();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
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
function getPageGoods_lotteryRecord(pos){ 

     lo_index=pos;
    getLotteryRecord(lo_index,lo_state_num,lo_soso_num);
	//alert(id+'////'+types+'....'+index);
	
}

function preGoods_lotteryRecord(){ 
    lo_index=lo_index-1;
	if(lo_index<0){
		lo_index=0;
		return;
	}
   // getGoods(id,types,index);
	getLotteryRecord(lo_index,lo_state_num,lo_soso_num);
}

function nextGoods_lotteryRecord(){ 
    lo_index=lo_index+1;
	if(lo_index>(lo_count-1)){
		lo_index=lo_count-1;
		
		return;
	}
    //getGoods(id,types,index);
	getLotteryRecord(lo_index,lo_state_num,lo_soso_num);
}
//确定收货
function receive(pid,id,lottery_id){
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/UcenterLottery/delivery',  
			data:{
				user_token:user_token,
				pid:pid,
				id:id,
				lottery_id:lottery_id
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				 
			},
			success:function(data){
				var code=data['code'];
				if(code==200){
					$('#btn'+id+'').attr("disabled","disabled");
					$('#btn'+id+'').text("已确认签收");
					getLotteryRecord(lo_index,lo_state_num,lo_soso_num);
				}
			}
	});
}
