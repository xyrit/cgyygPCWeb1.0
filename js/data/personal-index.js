// 个人账户，个人参与记录
//已经登录的情况下，读取个人中心的信息

//显示欢迎信息


if(typeof(user_token) == "undefined") {

    var attendStr='';
	attendStr+='<div class="row">';
	attendStr+='<div class="per-goods-box nomargin">';
	attendStr+='<div class="per_time_tab-content text-center">';
	attendStr+='您还没有登录哦';
	attendStr+='</div>';
	attendStr+='</div>';
	attendStr+='</div>';
	$(".per-head").hide();  
	$("#rightContent").removeClass("col-md-10 col-sm-10");
	$("#rightContent").addClass("margin-t-b-40 col-md-12 col-sm-12");
	$("#rightContent").html(attendStr);//把获取到的数据加载进右边内容容器中
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
	window.location.href='login.html';
    
}

else{	
	$("#myName").html(nickname);
	$("#myName2").html(nickname);
	$("#userId").html(userId);
	$("#userPhone").html(userMobile);

}
	
	
	if(per_market==1){
		
		//如果点击了 顶部导航栏的查看参与记录时，则模拟打开  $("#myAccount").click() 事件
		getMyattendFirst();
		//$("#attendRecord").trigger("click");
		
	  }
	  else if(per_market==2){
		  //如果点击了 顶部导航栏的查看中奖记录时，则模拟打开$("#luckyRecord").click() 事件
		  getLotteryFirst();  
				
	   }
	   else if(per_market==3){
		   sys_info();
		   }
	  else{
		myCount();
		}
	
	function myCount(){
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

			return;
		  }
		
		  $.ajax({  
				  type:'post',  
				  url:''+ajaxUrl+'/Home/ucenter/MyAccount',  
				  data:{
					  mobile:userMobile,
					  user_token:user_token
					  },  
				  cache:false,  
				  dataType:'json',  
				  beforeSend:function(){
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
					  //菜单改变颜色
	                  $("#myAccount").addClass("active");
					  var account=data['list']['account'];//余额
					  var red_packet=data['list']['red_packet'];//红包
					  var brokerage=data['list']['brokerage'];//佣金
					  var score=data['list']['score'];//积分
					  
					  var accountStr='';
					  //搭建个人账户右边内容结构
					  //佣金，红包，积分
					  accountStr+='<div class="row per-money">';
					  accountStr+='<div class="col-md-10 col-sm-10">';
					  accountStr+='<div class="row">';
					  accountStr+='<div class="col-md-3 col-sm-3 per-money-con">';
					  accountStr+='<p class="margin-t-20">账户橙果币</p>'; 
					  accountStr+='<p class="num">'+parseInt(account)+'</p>';
					  accountStr+='</div>';          
					  /*accountStr+='<div class="col-md-3 col-sm-3 per-money-con">';            
					  accountStr+='<p class="margin-t-20">可用红包（元）</p>';                 
					  accountStr+='<p class="num">'+red_packet+'</p>';                  
					  accountStr+='</div>'; */
					  accountStr+='<div class="col-md-3 col-sm-3 per-money-con">';                 
					  accountStr+='<p class="margin-t-20">可用佣金（元）</p>';                 
					  accountStr+='<p class="num">'+brokerage+'</p>';                       
					  accountStr+='</div>';
					  /*accountStr+='<div class="col-md-3 col-sm-3 per-money-con">';
					  accountStr+='<p class="margin-t-20">可用积分</p>';                 
					  accountStr+='<p class="num">'+score+'</p>';                       
					  accountStr+='</div>';*/
					  accountStr+='</div>';                  
					  accountStr+='</div>';                  
					  
					  accountStr+='<div class="col-md-2 col-sm-2">'; 
					  accountStr+='<div class="row">'; 
					  accountStr+='<div class="col-md-12">';   
					  accountStr+='<p><a href="recharge.html" target="_blank"><button type="button" class="btn cg-btn-danger cg-btn-fixed-round margin-t-8">充值</button></a></p>';               // accountStr+='<p><button type="button" class="btn cg-btn-danger cg-btn-fixed-round cg-btn-orange">积分兑换</button></p>';
					  accountStr+='</div>';   
					  accountStr+='</div>';          
					  accountStr+='</div>';            
					  accountStr+='</div>';            
					 //佣金，红包，积分----end 
							  
					 //我关注的，我看过的商品记录，现在是静态的     
					 /*accountStr+='<div class="row">';		 
					 accountStr+='<div class="per-goods-box">';	*/ 
					   //Nav tabs 
					 /*accountStr+='<ul class="nav nav-tabs" role="tablist">';	  
					 accountStr+='<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">我关注的</a></li>';
					 accountStr+='<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">我看过的</a></li>';	   accountStr+='</ul>';	*/	
						  //Tab panes -->
					/* accountStr+='<div class="tab-content">';		
					 accountStr+='<div role="tabpanel" class="tab-pane active" id="home">';	*/	     
						  //关注的商品列表--> 
					 /*accountStr+='<div class="row">';		          
					 accountStr+='<div class="col-md-3 col-sm-3">';	          
					 accountStr+='<div class="product-item">';              
					 accountStr+='<div class="product-img text-center">';               
					 accountStr+='<a href="#"><img src="images/cp1.jpg"></a>';                        
					 accountStr+='</div>';                    
					 accountStr+='<h3 class="product-title">小蚁运动相机 套装小蚁运动相机小蚁运动相机</h3>';                          
					 accountStr+='<div class="cg-progress-pre">';                       
					 accountStr+='<div class="progress cg-progress">';                    
					 accountStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">';  
					 accountStr+='<span class="sr-only">60% Complete (warning)</span>';                        
					 accountStr+='</div>';
					 accountStr+='</div>';
					 accountStr+='</div>';                         
					 accountStr+='<p>900/1200<span class="text-danger">(剩余1200人次)</span></p>';                                
					 accountStr+='<div class="review">';                          
					 accountStr+='<button type="button" class="btn btn-danger cg-btn-danger">立即抢购</button>';                     
					 accountStr+='<button type="button" class="btn btn-warning cg-btn-warning"><span class="glyphicon glyphicon-shopping-cart"></span></button>';                    
					 accountStr+='</div>';
					 accountStr+='</div>';
					 accountStr+='</div>';                       
					 accountStr+='</div>';
					 accountStr+='</div>';*/                       
						//我关注的商品列表结束-->
					 /*accountStr+='<div role="tabpanel" class="tab-pane" id="profile">';*/           
							
						 //看过的商品列表-->
					 /*accountStr+='<div class="row">';		          
					 accountStr+='<div class="col-md-3 col-sm-3">';	          
					 accountStr+='<div class="product-item">';              
					 accountStr+='<div class="product-img text-center">';               
					 accountStr+='<a href="#"><img src="images/cp1.jpg"></a>';                        
					 accountStr+='</div>';                    
					 accountStr+='<h3 class="product-title">小蚁运动相机 套装小蚁运动相机小蚁运动相机</h3>';                          
					 accountStr+='<div class="cg-progress-pre">';                       
					 accountStr+='<div class="progress cg-progress">';                    
					 accountStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">';  
					 accountStr+='<span class="sr-only">60% Complete (warning)</span>';                        
					 accountStr+='</div>';
					 accountStr+='</div>';
					 accountStr+='</div>';                         
					 accountStr+='<p>900/1200<span class="text-danger">(剩余0人次)</span></p>';                                
					 accountStr+='<div class="review">';                          
					 accountStr+='<button type="button" class="btn btn-danger cg-btn-danger">立即抢购</button>';                     
					 accountStr+='<button type="button" class="btn btn-warning cg-btn-warning"><span class="glyphicon glyphicon-shopping-cart"></span></button>';                    
					 accountStr+='</div>';
					 accountStr+='</div>';
					 accountStr+='</div>';                       
					 accountStr+='</div>';*/
					 accountStr+='</div>';	
					 //我看过的商品列表结束-->
					  
					 $("#rightContent").html(accountStr);//把获取到的数据加载进右边内容容器中
					 /*显示购物按钮,页面加载完才能执行此方法*/
					 $(".product-item").hover(function(){
						 $(this).addClass("hover-display").siblings().removeClass("hover-display");
						
					   },function(){
						 $(this).removeClass("hover-display");
					   });
					 $(".loading").empty();
				  },complete:function(){
					 $(".loading").empty();
				  },error:function(){
					  swal({
							title: "",
							text: '获取数据失败！<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
							html: true,
							type: "error",
							confirmButtonText:"确定",
							confirmButtonColor: "#ff4800",
						});
				  }
		  });
	}	
	  
//}

//我的账户菜单调用
$("#myAccount").click(function(){
	myCount();
	$("#myAccount").addClass("active").siblings().removeClass("active");
})
/*********我的参与明细*********/
//,我的参与明细
//参与明细状态
//定义全局变量，当点击相应的查询条件或者翻页时，如果需要恢复默认值的变量就 变默认值，其他照写
var index=0;
var state_num=0;
var soso_num=0;

$("#attendRecord").click(function(){
	 index=0;
	 state_num=0;
	 soso_num=0;
	 
	 getMyattendFirst();
	  
});
/******我的参与明细中的 进行中的商品，即将揭晓的商品，已经揭晓的商品，点击再次调用我的参与明细的接口*******/
//点击左侧参与明细以及从顶部导航进来调用，不需要传参数
var glo_List;
var glo_startcode;
function getMyattendFirst(){
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
		//$('#attendRecord').removeAttr("id");
		//$("#luckyRecord").removeAttr("id");
		//$("#myComment").removeAttr("id");
	  return;
	}
	
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Attend/attendDetail',  
			data:{
				user_token:user_token,
				pageSize:10,
				pageIndex:0,
				state:0,  //参与明细状态 0 为进行中商品,1为即将揭晓商品,2为已揭晓商品. (必须)
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
						text: ''+info+'<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					return;
				}
				$("#attendRecord").addClass("active").siblings().removeClass("active");
				var attend_pageCount=data['pageCount'];
				var att_list=data['list'];
				var startCode=data['startCode'];
				glo_startcode=startCode;//全局变量，开始码
				glo_List=att_list;//全局变量，参与列表
				//建立DOM结构
				var attendStr='';
				attendStr+='<div class="row">';
					attendStr+='<div class="per-goods-box nomargin">';
					 // Nav tabs -->
					attendStr+='<ul class="nav nav-tabs" role="tablist">';
					
					attendStr+='<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab" id="ingMenu" aria-expanded="true">进行中商品</a></li>';
					attendStr+='<li role="presentation"><a href="#home" aria-controls="profile" role="tab" data-toggle="tab" id="soonMenu"  aria-expanded="false">等待揭晓商品</a></li>';
					attendStr+='<li role="presentation"><a href="#home" aria-controls="profile" role="tab" data-toggle="tab" id="readyMenu" aria-expanded="false">已揭晓商品</a></li>';
					
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
					/*attendStr+='<div class="per-time-select pull-right">';
					attendStr+='<label>选择时间段：</label>';
					attendStr+='<input type="text" class="cg_input Wdate" onClick="WdatePicker()">';
					attendStr+='<span class="select-time" style="width:10px">-</span>';
					attendStr+='<input type="text" class="cg_input Wdate" onClick="WdatePicker()">';
					attendStr+='<button type="button" class="btn btn-sm cg-btn-square">搜索</button>';
					attendStr+='</div>';*/
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
					attendStr+='<th width="85">云购状态</th>';
					attendStr+='<th>参与人次</th>';
					attendStr+='<th width="170">参与码</th>';
					attendStr+='<th width="120">操作</th>';
					attendStr+='</tr>'; 
					attendStr+='</thead>'; 
					attendStr+='<tbody id="goodsIng">'; 
					
					attendStr+='</tbody>';
					attendStr+='</table>';
					//商品列表结束
					attendStr+='</div>';
					
					var attendIngStr='';
					
					/*else{
						
						}*/
						for(i=0;i<att_list.length;i++){
							var id=att_list[i]['id'];
							var pid=att_list[i]['pid'];
							var title=att_list[i]['title'];
							//var lucky_code=att_list[i]['lucky_code'];
							var lottery_id=att_list[i]['lottery_id'];
							var attend_count=att_list[i]['attend_count'];
							var need_count=att_list[i]['need_count'];
							var path=data['host']+att_list[i]['path'];
							//var create_time=att_list[i]['create_time'];
							var cover_id=att_list[i]['cover_id'];
							var lottery_code=att_list[i]['lottery_code'];
							var nickname=att_list[i]['nickname'];
							var lottery_time=att_list[i]['lottery_time'];
							var remain_count=att_list[i]['remain_count'];
							var startCode=data['startCode'];
							var attend_all=att_list[i]['attend_all'];//此商品所有的已参与人次
							//幸运码
							
							var lucky_code_0=att_list[i]['time_code'][0]['lucky_code'];
							var code_create_time_0=att_list[i]['time_code'][0]['create_time'];
							//把startCode分离出来，然后以分号连接成一个新数字
							var my_trueAttendCode_2='';
							var s=lucky_code_0.split(',');//把startCode分离出来，然后以分号连接成一个新数字
							//先显示几条，点击后弹出全部数据
							for(var j = 0;j<1;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
							  //把startCode分离出来，然后以分号连接成一个新数字
							   my_trueAttendCode_2+=(startCode+Number(s[j]))+'，';
							}
							my_trueAttendCode_2=my_trueAttendCode_2.substring(0,my_trueAttendCode_2.length-1);//去掉最后一个分号
							
							var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
							
							var progress_attend='';
							 if(need_count<1){
								  progress_attend=0;
							   }else{
								  progress_attend=(attend_all/need_count)*100;
								}
							
							//时间戳格式化
							//参与时间
							var  time_attend= code_create_time_0;
							var newDate_attend = new Date();
							newDate_attend.setTime(time_attend * 1000);
							var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');
							

							attendIngStr+='<tr>';
							attendIngStr+='<td scope="row"><a href="goods-details.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" alt="" width="60"></a></td>';
							attendIngStr+='<td class="row_1">';
							attendIngStr+='<div class="cg-progress-pre">';
							attendIngStr+='<div class="pre-tip"><a href="goods-details.html?pid='+goods_link+'" class="text-danger" target="_blank">'+title+'</a></div>';
							attendIngStr+='<div class="progress cg-progress">';
							attendIngStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress_attend+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress_attend+'%">';
							attendIngStr+='<span class="sr-only">'+progress_attend+'% Complete (warning)</span>';
							attendIngStr+='</div>';
							attendIngStr+='</div>';
							attendIngStr+='<div class="pre-tip">';
							attendIngStr+='<p class="nomargin">'+attend_all+'/'+need_count+' (剩余'+remain_count+'人次)</p>';
							attendIngStr+='<p class="nomargin">参与时间：'+my_create_time_attend+'</p>';
							attendIngStr+='</div>';
							attendIngStr+='</div>';
							attendIngStr+='</td>';
							attendIngStr+='<td>正在进行中</td>';
							attendIngStr+='<td>'+attend_count+'人次<br/><a href="javascript:;" class="text-danger" onClick="goToCar('+lottery_id+','+pid+','+1+');">立即参与</a></td>';
							/*if(attend_count==1){
								 attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode+'</p</td>';
								}
								else{
									attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder mypopover margin-l-10" title="本次参与'+attend_count+'人次" data-content="('+my_trueAttendCode+')" data-trigger="focus" data-placement="left" data-toggle="popover"> 查看全部</button></p</td>';
								}*/
							if(attend_count==1){
								//只有一条数据时 不显示按钮
							  attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'</p</td>';
							  }else{
								  //attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder margin-l-10" onClick="alertList('+i+');">查看全部</button></p</td>';
								  attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder margin-l-10" onClick="alertList('+userId+','+lottery_id+');">查看全部</button></p</td>';
								  }	
							
							
							
							attendIngStr+='<td><a href="goods-details.html?pid='+goods_link+'" class="linkIk"  target="_blank">查看详情>></a></td>';
							attendIngStr+='</tr>';
							
						}
               
				   
				$("#rightContent").html(attendStr);//把获取到的数据加载进右边内容容器中
				

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
				 count=pageCount;
				 var paginationStr='';
				 paginationStr+='<li><a href="javascript:;" onClick="preGoods();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
				 for(i=1;i<=pageCount;i++){
					 if((i-1)==index){
						paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }

				  }


				  paginationStr+='<li><a href="javascript:;" onClick="nextGoods();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
				  //*****************分页
				 $("#rightContent").append(attendPageStr);
				 if(pageCount<=0){
					 $("#pagination").parent().hide();
				   }else{
					   $("#pagination").parent().show();
					   $("#pagination").html(paginationStr);
					   $("#pageCount").html(pageCount);
					   
					   }


				//如果是当前标签打开的情况下，不调用接口
				
				$("#ingMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getMyattendDetails(0,0,0);
						
						state_num=0;
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
						index=0;
                    	// state_num=0;
	                    soso_num=0;
					}
				});
				$("#soonMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getMyattendDetails(0,1,0);
						state_num=1;
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
						index=0;
	                    // state_num=0;
	                    soso_num=0;
					}
				});
				$("#readyMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getMyattendDetails(0,2,0);
						state_num=2;
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
						index=0;
	                   //state_num=0;
	                    soso_num=0;
					}
				});
				//按照时间呈现数据,全部，今天，....
				$(".timeMenu").click(function(){
					var new_soso_num=$(this).attr("data-num");
					$(this).addClass("active").siblings().removeClass("active");
					//每切换一次，页码从0开始
					index=0;
	               // state_num=0;
	               
					getMyattendDetails(0,state_num,new_soso_num);
					 //把获取到的值赋给全局变量，否则点击翻页时，soso_num又会变为0了
					 soso_num=new_soso_num;

				});

				  if(att_list.length<=0){

					$("#goodsIng").html('<tr><td colspan="6" class="text-center"><div class="text-gray"><img src="images/noresult.jpg"/>&nbsp&nbsp小主，您还没有参与记录，<a href="index.html" class="text-danger">立即参与</a>&nbsp橙果云购&nbsp吧~</div></td></tr>');
					}else{
						$("#goodsIng").html(attendIngStr);//数据写进
						}
				//开启tips；
				$('[data-toggle="popover"]').popover();
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
//参与记录弹出框
function alertList(userId,lottery_id){
  //在此循环参与记录的全局变量 循环幸运码和时间出来
  //现在的做法是 调用新接口，而不是全局变量
  //var luckyCodeStr='';
  /*for(k=0;k<glo_List[i]['time_code'].length;k++){
	  var lucky_code=glo_List[i]['time_code'][k]['lucky_code'];
	  var code_create_time=glo_List[i]['time_code'][k]['create_time'];
	  var attend_count=glo_List[i]['attend_count'];
	  
	  //把startCode分离出来，然后以分号连接成一个新数字
	  var my_trueAttendCode='';
	  var my_trueAttendCode_2='';
	  var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
	  for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
		//把startCode分离出来，然后以分号连接成一个新数字
		// my_trueAttendCode+=(glo_startcode+Number(s[j]))+'，';
		 my_trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startcode+Number(s[j]))+'</span>';
	  }
	  my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号
	  //时间戳格式化
	  //参与时间
	  var  time_attend= code_create_time;
	  var newDate_attend = new Date();
	  newDate_attend.setTime(time_attend * 1000);
	  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');
	  
	  luckyCodeStr+='<div class="well nomargin">';
	  luckyCodeStr+='<p class="text-gray2">'+my_create_time_attend+'</p>';//创建时间
	  luckyCodeStr+='<p class="word-break margin-r_8">'+my_trueAttendCode+'</p>';//幸运码,弹出框中的
	  luckyCodeStr+='</div>';
	  
  }*/
  $.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Attend/getAttendInfo',  
			data:{
				uid:userId,
				lottery_id:lottery_id,
				
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				/*$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); */
			},
			success:function(data){  
			   
				var code=data['code'];
				var info=data['info'];
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
			   var list=data['list'];	
			   var list_num=data['sum'];//总共参与的人次
			   var luckyCodeStr='';
			   for(i=0;i<list.length;i++){
				   var id=list[i]['id'];//参与序号
				   var code_create_time=list[i]['create_time'];//参与时间
				   var lucky_code=list[i]['lucky_code'];//参与码
				   var my_trueAttendCode='';
				   var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
					for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
					  //把startCode分离出来，然后以分号连接成一个新数字
					  // my_trueAttendCode+=(glo_startcode+Number(s[j]))+'，';
					   my_trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startcode+Number(s[j]))+'</span>';
					}
					
				   //时间戳格式化
				  //参与时间
				  var  time_attend= code_create_time;
				  var newDate_attend = new Date();
				  newDate_attend.setTime(time_attend * 1000);
				  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');	
				  luckyCodeStr+='<div class="well nomargin">';
				  luckyCodeStr+='<p class="text-gray2">'+my_create_time_attend+'</p>';//创建时间
				  luckyCodeStr+='<p class="word-break margin-r_8">'+my_trueAttendCode+'</p>';//幸运码,弹出框中的
				  luckyCodeStr+='</div>';	
			   }
			   
			  $("#myAttend_count2").html('我一共参与了<span class="text-danger">'+list_num+'</span>人次');
			  $("#luckyCode").html(luckyCodeStr);

			   
		  }
		  
  });
  
  $("#myModal").modal("toggle"); 
  
}
//参与记录弹出框--翻页后
/*function alertList2(i){
	
	//$("#myAttend_count2").html('');
    //$("#luckyCode").html('');
	
  //在此循环参与记录的全局变量 循环幸运码和时间出来  注意区分glo_List（为未翻页前的变量）与glo_List2（翻页后的全局变量）
  var luckyCodeStr2='';
  for(k=0;k<glo_List2[i]['time_code'].length;k++){
	  var lucky_code=glo_List2[i]['time_code'][k]['lucky_code'];
	  var code_create_time=glo_List2[i]['time_code'][k]['create_time'];
	  var attend_count=glo_List2[i]['attend_count'];
	  
	  //把startCode分离出来，然后以分号连接成一个新数字
	  var my_trueAttendCode='';
	  var my_trueAttendCode_2='';
	  var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
	  for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
		//把startCode分离出来，然后以分号连接成一个新数字
		 //my_trueAttendCode+=(glo_startcode+Number(s[j]))+'，';
		 my_trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startcode+Number(s[j]))+'</span>';
	  }
	  my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号
	  //时间戳格式化
	  //参与时间
	  var  time_attend= code_create_time;
	  var newDate_attend = new Date();
	  newDate_attend.setTime(time_attend * 1000);
	  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');
	  
	  luckyCodeStr2+='<div class="well nomargin">';
	  luckyCodeStr2+='<p class="text-gray2">'+my_create_time_attend+'</p>';//创建时间
	  luckyCodeStr2+='<p class="word-break margin-r_8">'+my_trueAttendCode+'</p>';//幸运码,弹出框中的
	  luckyCodeStr2+='</div>';
	  
  }
  $("#myModal").modal("toggle");
  $("#myAttend_count2").html('我一共参与了<span class="text-danger">'+attend_count+'</span>人次');
  $("#luckyCode").html(luckyCodeStr2);
 
  
}*/
//翻页等调用---我的参与明细，需要传参数
var glo_List2;
var glo_startcode2;
function getMyattendDetails(index,state_num,soso_num){
	var attend_num_2=state_num;
	var index1=index;
	var soso_num_2=soso_num
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Attend/attendDetail',  
			data:{
				user_token:user_token,
				pageSize:10,
				pageIndex:index1,
				state:attend_num_2, //参与明细状态 0 为进行中商品,1为即将揭晓商品,2为已揭晓商品. (必须)
				soso:soso_num_2
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				$("#goodsIng").html('<div class="loading"></div>');
				$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			},
			success:function(data){  
			   
				var code=data['code'];
				var info=data['info'];
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
				var startCode=data['startCode'];
				glo_startcode2=startCode;
				glo_List2=att_list;
				
				
				if(att_list.length<=0){
					//$("#goodsIng").html('<tr><td colspan="6" class="text-center"><span class="text-gray">没有记录</span></td></tr>');
					$("#goodsIng").html('<tr><td colspan="6" class="text-center"><div class="text-gray"><img src="images/noresult.jpg"/>&nbsp&nbsp小主，您还没有参与记录，<a href="index.html" class="text-danger">立即参与</a>&nbsp橙果云购&nbsp吧~</div></td></tr>');
					//$("#pageNav").empty();
					
					}
				else{	
					  var attendIngStr='';
					  for(i=0;i<att_list.length;i++){
						  var id=att_list[i]['id'];
						  var pid=att_list[i]['pid'];
						  var title=att_list[i]['title'];
						 // var lucky_code=att_list[i]['lucky_code'];
						  var lottery_id=att_list[i]['lottery_id'];
						  var attend_count=att_list[i]['attend_count'];
						  var need_count=att_list[i]['need_count'];
						  var path=data['host']+att_list[i]['path'];
						  //var create_time=att_list[i]['create_time'];
						  var cover_id=att_list[i]['cover_id'];
						  var lottery_code=Number(att_list[i]['lottery_code']);
						  var nickname=att_list[i]['nickname'];
						  var lottery_time=att_list[i]['lottery_time'];
						  var remain_count=att_list[i]['remain_count'];
						  var startCode=Number(data['startCode']);
						  var luckyNum=startCode+lottery_code;//这是幸运号码
						  var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
						  
						  var lucky_code_0=att_list[i]['time_code'][0]['lucky_code'];
						  var code_create_time_0=att_list[i]['time_code'][0]['create_time'];
						 // alert(att_list[i]['time_code'].length);
						  var uid=att_list[i]['lp_uid'];//中奖用户ID
						  var attend_all=att_list[i]['attend_all'];//此商品所有的已参与人次
						  
						  var progress_attend='';
						   if(need_count<1){
								progress_attend=0;
							 }else{
								progress_attend=(attend_all/need_count)*100;
							  }
						  var user_uid=uid+'&'+'nickname='+escape(nickname)+'&'+'rightContentMarking='+2;//给链接地址赋值,传递用户ID 
						  //时间戳格式化
						  //参与时间
						  var  time_attend= code_create_time_0;
						  var newDate_attend = new Date();
						  newDate_attend.setTime(time_attend * 1000);
						  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');
						  //揭晓时间
						  var  time_lottery= lottery_time;
						  var newDate_lottery = new Date();
						  newDate_lottery.setTime(time_lottery * 1000);
						  var my_lottery_time=newDate_lottery.format('yyyy-MM-dd hh:mm:ss');
						  
						  //把startCode分离出来，然后以分号连接成一个新数字
						 // var my_trueAttendCode='';
						  var my_trueAttendCode_2='';
						  var s=lucky_code_0.split(',');//把startCode分离出来，然后以分号连接成一个新数字
						  /*for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
							//把startCode分离出来，然后以分号连接成一个新数字
							 my_trueAttendCode+=(startCode+Number(s[j]))+'，';
						  }
						  my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号*/
						  //先显示几条，点击后弹出全部数据
						  for(var j = 0;j<1;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
							//把startCode分离出来，然后以分号连接成一个新数字
							 my_trueAttendCode_2+=(startCode+Number(s[j]))+'，';
						  }
						  my_trueAttendCode_2=my_trueAttendCode_2.substring(0,my_trueAttendCode_2.length-1);//去掉最后一个分号
						  
						  //构建DOM,根据attend_num的不同构建不同的结构
						  
						  attendIngStr+='<tr>';
						  
						  if(state_num==2){
							   attendIngStr+='<td scope="row"><a href="ready-publish.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" alt="" width="60"></a></td>';
							  }else if(state_num==1){
								  attendIngStr+='<td scope="row"><a href="soon-publish.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" alt="" width="60"></a></td>';
								  }else{
									    attendIngStr+='<td scope="row"><a href="goods-details.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" alt="" width="60"></a></td>';
									  }
						  
						  if(state_num==2){
							  attendIngStr+='<td>';
							  attendIngStr+='<a href="ready-publish.html?pid='+goods_link+'" class="text-danger" target="_blank">'+title+'</a>';
							  attendIngStr+='<p class="nomargin">总需：'+need_count+'人次</p>';
							  
							  
							  if(typeof(userId) == "undefined"||uid!=userId){
							    attendIngStr+='<p class="nomargin">获得者：<a href="personal-index-other.html?uid='+user_uid+'" class="text-danger">'+nickname+'</a></p>';
							   }else{
									attendIngStr+='<p class="nomargin">获得者：<a href="personal-index.html?per_market=2" class="text-danger">'+nickname+'</a></p>';
								   } 
							 // attendIngStr+='<p class="nomargin">获得者：<a  href="#" class="text-danger">'+nickname+'</a>（本期共参与1人次）</p>';
							  attendIngStr+='<p class="nomargin">获奖幸运码：'+luckyNum+'</p>';
							  attendIngStr+='<p class="nomargin">揭晓时间：'+my_lottery_time+'</p>';
							  attendIngStr+='<p class="nomargin">参与时间：'+my_create_time_attend+'</p>';
							  attendIngStr+='</td>';
							  }else{
								  
							   attendIngStr+='<td class="row_1">';
							  attendIngStr+='<div class="cg-progress-pre">';
							  if(state_num==1){
								  attendIngStr+='<div class="pre-tip"><a href="soon-publish.html?pid='+goods_link+'" class="text-danger" target="_blank">'+title+'</a></div>';
								  }else{
									  //正在进行中，需要进度条
									  attendIngStr+='<div class="pre-tip"><a href="goods-details.html?pid='+goods_link+'" class="text-danger" target="_blank">'+title+'</a></div>';
									  attendIngStr+='<div class="progress cg-progress">';
									  attendIngStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress_attend+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress_attend+'%">';
									  attendIngStr+='<span class="sr-only">'+progress_attend+'% Complete (warning)</span>';
									  attendIngStr+='</div>';
									  attendIngStr+='</div>';
									  attendIngStr+='<div class="pre-tip">';
									  attendIngStr+='<p class="nomargin">'+attend_all+'/'+need_count+' (剩余'+remain_count+'人次)</p>';
									  //attendIngStr+='<p class="nomargin">参与时间：'+my_create_time_attend+'</p>';
									  }
							  
							  
							  /*attendIngStr+='<div class="progress cg-progress">';
							  attendIngStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress_attend+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress_attend+'%">';
							  attendIngStr+='<span class="sr-only">'+progress_attend+'% Complete (warning)</span>';
							  attendIngStr+='</div>';
							  attendIngStr+='</div>';*/
							  attendIngStr+='<div class="pre-tip">';
							 // attendIngStr+='<p class="nomargin">'+attend_count+'/'+need_count+' (剩余'+remain_count+'人次)</p>';
							  attendIngStr+='<p class="nomargin">参与时间：'+my_create_time_attend+'</p>';
							  attendIngStr+='</div>';
							  attendIngStr+='</div>';
							  attendIngStr+='</td>';	
						  }
						  if(state_num==0){
							  attendIngStr+='<td>正在进行中</td>';
						  }else if(state_num==1){
							  attendIngStr+='<td>即将揭晓</td>';
							  }else{
								  attendIngStr+='<td>已经揭晓</td>';
								  }
						  if(state_num==0){
							  attendIngStr+='<td>'+attend_count+'人次<br/><a href="javascript:;" class="text-danger" onClick="goToCar('+lottery_id+','+pid+','+1+');">立即参与</a></td>';
							  }
							  else{
								  attendIngStr+='<td>'+attend_count+'人次</td>';
								  }
						  //如果只参与一次，就不用显示查看全部按钮
						  /*if(attend_count==1){
								 attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'</p</td>';
								}
								else{
									attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder mypopover margin-l-10" title="本次参与'+attend_count+'人次" data-content="'+my_trueAttendCode+'" data-trigger="focus" data-placement="left" data-toggle="popover"> 查看全部</button></p</td>';
								}*/
						  if(attend_count==1){
							  attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'</p</td>';
							  }else{
								  //attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder margin-l-10" onClick="alertList2('+i+');">查看全部</button></p</td>';
								  attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder margin-l-10" onClick="alertList('+userId+','+lottery_id+');">查看全部</button></p</td>';
								  
								  } 
						  
						 
						  if(state_num==2){
							 
							   attendIngStr+='<td><a href="ready-publish.html?pid='+goods_link+'" target="_blank">查看详情>></a></td>';
							  }else if(state_num==1){
								 
								  attendIngStr+='<td><a href="soon-publish.html?pid='+goods_link+'" target="_blank">查看详情>></a></td>';
								  }else{
									   
										attendIngStr+='<td><a href="goods-details.html?pid='+goods_link+'" target="_blank">查看详情>></a></td>';
									  }
						 
						  
						  attendIngStr+='</tr>';
						  
					  }
					 
					  $("#goodsIng").html(attendIngStr);
				
				}
				//*****************分页
				 var pageCount=data['pageCount'];
				 count=pageCount;
				 var paginationStr='';
				 paginationStr+='<li><a href="javascript:;" onClick="preGoods();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
				 for(i=1;i<=pageCount;i++){
					 if((i-1)==index){
						paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }

				  }

				  paginationStr+='<li><a href="javascript:;" onClick="nextGoods();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
				  //*****************分页
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
				//开启tips；
				$('[data-toggle="popover"]').popover();
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
//按照时间检索

/****我的参与记录****翻页按钮函数*********/
function getPageGoods(pos){ 

     index=pos;
    getMyattendDetails(index,state_num,soso_num);

	
}

function preGoods(){ 
    index=index-1;
	if(index<0){
		index=0;
		return;
	}

	getMyattendDetails(index,state_num,soso_num);
}

function nextGoods(){ 
    index=index+1;
	if(index>(count-1)){
		index=count-1;
		return;
	}

	getMyattendDetails(index,state_num,soso_num);
}
