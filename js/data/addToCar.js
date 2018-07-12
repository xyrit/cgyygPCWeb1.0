// 添加商品到购物车
//需要cookie的地方都要 每调用一次 之前取一次cookie，以防第三方登录和 账户登录冲突
//alert(status);


var attend_count=1;
//alert(userMobile);
//商品列表中加入购物车 不跳转进购物车
function addToCar(lottery_idToCar,pidToCar,attend_count){
	var userId = $.cookie('userId');
	var nickname = $.cookie('nickname');
	var userMobile = $.cookie('userMobile');
	var user_token = $.cookie('user_token');
	
	if(typeof(user_token) == "undefined"){
	   window.location.href='login.html';
      /*swal({
			title: "",
			text: '您还没有登录哦！点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
			html: true,
			type: "warning",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});*/
     }

	 else{

		   $.ajax({
			   type:'POST',
			   url:''+ajaxUrl+'/Home/Shopcart/addItem',
			   data:{
				   attend_count:attend_count,
				   lottery_id:lottery_idToCar,
				   id:pidToCar,
				   user_token:user_token
				   },
			   cache:false,
			   dataType:'json',
			   success: function(data){
				      var info=data['info'];
					  if(data['code']!=200){
							swal({
								title: "",
								text: ''+info+'！<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							});
							if(data['code']==517){
								window.location.href='login.html';
								/*swal({
									title: "",
									text: ''+info+'！，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
									html: true,
									type: "error",
									confirmButtonText:"确定",
									confirmButtonColor: "#ff4800",
								},function(){
									//设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
									setTimeout(function(){
									  window.location.href="index.html"  
									}, 500);
								});*/
								
							}
							return;
						}
						getCartNum();
				   }	   
			   })
		   
		 }
	 
	 
	/*$(".close").bind("click",function(){
		$(".frame").fadeOut(500);
		$("#bgframe").fadeOut(500);
	 });*/
	 
}
//详情页加入购物车，不跳转进购物车
function addToCar_two(lottery_idToCar,pidToCar,attend_count){
	var userId = $.cookie('userId');
	var nickname = $.cookie('nickname');
	var userMobile = $.cookie('userMobile');
	var user_token = $.cookie('user_token');
	
	if(typeof(user_token) == "undefined"){
		window.location.href='login.html';
      /*swal({
			title: "",
			text: '您还没有登录哦！点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
			html: true,
			type: "warning",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});*/
     }else if(global_remain==0){
		swal({
			title: "",
			text: '本期商品剩余次数为0，下一期很快就来了哦！',
			html: true,
			type: "warning",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		
	}
	 else if(attend_count>global_remain){
		swal({
			title: "",
			text: '购买次数不能大于剩余次数哦！',
			html: true,
			type: "warning",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		
	}else if(global_attend_limit>0 && attend_count<global_attend_limit){
			swal({
				title: "",
				text: '最小购买次数是'+global_attend_limit+'哦！',
				html: true,
				type: "warning",
				confirmButtonText:"确定",
				confirmButtonColor: "#ff4800",
			});
			
	}else if(global_max_attend_limit>0 && attend_count>global_max_attend_limit){
	
			swal({
				title: "",
				text: '最大购买次数是'+global_max_attend_limit+'哦！',
				html: true,
				type: "warning",
				confirmButtonText:"确定",
				confirmButtonColor: "#ff4800",
			});
	
	}
	 else{

		   $.ajax({
			   type:'POST',
			   url:''+ajaxUrl+'/Home/Shopcart/addItem',
			   data:{
				   attend_count:attend_count,
				   lottery_id:lottery_idToCar,
				   id:pidToCar,
				   user_token:user_token
				   },
			   cache:false,
			   dataType:'json',
			   success: function(data){
				      var info=data['info'];
					  if(data['code']!=200){
							swal({
								title: "",
								text: ''+info+'！<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							});
							if(data['code']==517){
								window.location.href='login.html';
								/*swal({
									title: "",
									text: ''+info+'！，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
									html: true,
									type: "error",
									confirmButtonText:"确定",
									confirmButtonColor: "#ff4800",
								},function(){
									//设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
									setTimeout(function(){
									  window.location.href="index.html"  
									}, 500);
								});*/
								
							}
							return;
						}
						getCartNum();
				   }	   
			   })
		   
		 }
	 

	 
}
//商品列表中的加入购物车立即参与
function goToCar(lottery_idToCar,pidToCar,attend_count){
	var userId = $.cookie('userId');
	var nickname = $.cookie('nickname');
	var userMobile = $.cookie('userMobile');
	var user_token = $.cookie('user_token');
	
	if(typeof(user_token) == "undefined"){
		window.location.href='login.html';
	  /*swal({
			title: "",
			text: '您还没有登录哦！点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
			html: true,
			type: "warning",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});*/
     }
	 else{

		   $.ajax({
			   type:'POST',
			   url:''+ajaxUrl+'/Home/Shopcart/addItem',
			   data:{
				   attend_count:attend_count,
				   lottery_id:lottery_idToCar,
				   id:pidToCar,
				   user_token:user_token
				   },
			   cache:false,
			   dataType:'json',
			   success: function(data){
				     var info=data['info'];
					if(data['code']!=200){
						  swal({
							  title: "",
							  text: ''+info+'！<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
							  html: true,
							  type: "error",
							  confirmButtonText:"确定",
							  confirmButtonColor: "#ff4800",
						  });
						  if(data['code']==517){
							    window.location.href='login.html';
								/*swal({
									title: "",
									text: ''+info+'！，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
									html: true,
									type: "error",
									confirmButtonText:"确定",
									confirmButtonColor: "#ff4800",
								},function(){
									//设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
									setTimeout(function(){
									  window.location.href="index.html"  
									}, 500);
								});*/
								
							}

					  }
				     else{
					    location.href = "payfor1.html";
					  }
		  
				   }	   
			   })
		   
		 }
	 

	 
}
//详情页中的加入购物车中的立即参与，以及首页，分类列表等  有参与限制的地方，（首页或者其他列表也可以用goToCar，需要付款的时候再进行判断也是可以的）

//var global_attend_limit;//最低参与次数 例如
//var global_max_attend_limit;//每次参与次数最高限制 例如 10  就每次不能超过10
//var global_remain;// 剩余参与次数

function goToCar_two(lottery_idToCar,pidToCar,attend_count){

	var userId = $.cookie('userId');
	var nickname = $.cookie('nickname');
	var userMobile = $.cookie('userMobile');
	var user_token = $.cookie('user_token');
	if(typeof(user_token) == "undefined"){
		window.location.href='login.html';
	  /*swal({
			title: "",
			text: '您还没有登录哦！点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
			html: true,
			type: "warning",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});*/
     }else if(global_remain==0){
		swal({
			title: "",
			text: '本期商品剩余次数为0，下一期很快就来了哦！',
			html: true,
			type: "warning",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		
	}
	 else if(attend_count>global_remain){

		swal({
			title: "",
			text: '购买次数不能大于剩余次数哦！',
			html: true,
			type: "warning",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		
	}else if(global_attend_limit>0 && attend_count<global_attend_limit){
		
			swal({
				title: "",
				text: '最小购买次数是'+global_attend_limit+'哦！',
				html: true,
				type: "warning",
				confirmButtonText:"确定",
				confirmButtonColor: "#ff4800",
			});
			
		
	}else if(global_max_attend_limit>0 && attend_count>global_max_attend_limit){
		
			swal({
				title: "",
				text: '最大购买次数是'+global_max_attend_limit+'哦！',
				html: true,
				type: "warning",
				confirmButtonText:"确定",
				confirmButtonColor: "#ff4800",
			});
		
	
	}
	 else{

		   $.ajax({
			   type:'POST',
			   url:''+ajaxUrl+'/Home/Shopcart/addItem',
			   data:{
				   attend_count:attend_count,
				   lottery_id:lottery_idToCar,
				   id:pidToCar,
				   user_token:user_token
				   },
			   cache:false,
			   dataType:'json',
			   success: function(data){
				     var info=data['info'];
					  if(data['code']!=200){
							swal({
								title: "",
								text: ''+info+'！',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							});
							if(data['code']==517){
								window.location.href='login.html';
								/*swal({
									title: "",
									text: ''+info+'！，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
									html: true,
									type: "error",
									confirmButtonText:"确定",
									confirmButtonColor: "#ff4800",
								},function(){
									//设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
									setTimeout(function(){
									  window.location.href="index.html"  
									}, 500);
								});*/
								
							}
							return;
						}
					   else{
						  location.href = "payfor1.html";
						}
		  
				   }	   
			   })
		   
		 }
	 

	 
}
function goToCar_three(lottery_idToCar,pidToCar,attend_count){

	var userId = $.cookie('userId');
	var nickname = $.cookie('nickname');
	var userMobile = $.cookie('userMobile');
	var user_token = $.cookie('user_token');
	if(typeof(user_token) == "undefined"){
		window.location.href='login.html';
		/*swal({
		 title: "",
		 text: '您还没有登录哦！点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
		 html: true,
		 type: "warning",
		 confirmButtonText:"确定",
		 confirmButtonColor: "#ff4800",
		 });*/
	}else if(attend_count==0){
		swal({
			title: "",
			text: '本期商品剩余次数为0，下一期很快就来了哦！',
			html: true,
			type: "warning",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});

	}
	else{
		$.ajax({
			type:'POST',
			url:''+ajaxUrl+'/Home/Shopcart/addItem',
			data:{
				attend_count:attend_count,
				lottery_id:lottery_idToCar,
				id:pidToCar,
				user_token:user_token
			},
			cache:false,
			dataType:'json',
			success: function(data){
				var info=data['info'];
				if(data['code']!=200){
					swal({
						title: "",
						text: ''+info+'！',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					if(data['code']==517){
						window.location.href='login.html';
						/*swal({
						 title: "",
						 text: ''+info+'！，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
						 html: true,
						 type: "error",
						 confirmButtonText:"确定",
						 confirmButtonColor: "#ff4800",
						 },function(){
						 //设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
						 setTimeout(function(){
						 window.location.href="index.html"
						 }, 500);
						 });*/

					}
					return;
				}
				else{
					location.href = "payfor1.html";
				}

			}
		})

	}



}
	

	