// 除首页外的其他页面需要的公共头部  购物车和支付页面除外

//$("#head_content").load('head_2.html #header'); 
/*$("#head_content").load('head_2.html #header',function(){
	


});*/

var userId = $.cookie('userId');
var nickname = $.cookie('nickname');
var userMobile = $.cookie('userMobile');
var user_token = $.cookie('user_token');
var path = $.cookie('path');
if(typeof(user_token) == "undefined") {
	
	//alert(userId+userMobile);
	$("#loginBox").html('<a href="login.html">请登录<a>');
	$("#regBox a").html("注册").attr({id:"reg_a",href:"login.html?regist=1"});
	
}
else{//注销登录
	//$("#loginBox").show();
	
	$("#loginBox").html('<span>您好！'+nickname+'<span>');
	$("#regBox a").html("退出登录").attr({id:'logout',href:'javascript:;'});
	
	 //$("#goods_num").html(goods_num);
	 
	$("#logout").click(function(){
	  $.ajax({
		  type:'POST',
		  url:''+ajaxUrl+'/Home/user/logout',
		  data:{
			  user_token:user_token
			  },
		  cache:false,  
		  dataType:'json',  
		  success:function(data){ 
		        //退出成功后恢复注册登录按钮
				if(data['code']!=200){
				   swal({
						title: "",
						text: ''+data['info']+'',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					if(data['code']==517){
						//517为‘请登录后’再操作，防止出现此类问题，出现登录按钮
						$("#loginBox").html('<a href="login.html">请登录<a>');
						$("#regBox a").html("注册").attr({id:"reg_a",href:"login.html?regist=1"});
					}
				   return;
				 }
			    $("#loginBox").html('<a href="login.html">请登录<a>');
			    $("#regBox a").html("注册").attr({id:"reg_a",href:"login.html?regist=1"});
				 //退出成功后隐藏个人中心的菜单
				$("#myAccount").hide();//我的账户菜单
				$("#moneyDetail").hide();//我的资金明细
				$("#myIntegral").hide();//我的积分
				$("#myMoney").hide();//我的红包
				$("#inviteFriend").hide();//邀请好友
				$("#myAddres").hide();//我的收货地址
				$("#mySystem").hide();//我的个人中心设置
				$("#myBtnGroup").hide();//签到，修改密码，收货地址 按钮
				 //$.cookie('status','0',{ expires:1, path: '/' });
				$.cookie('nickname','',{ expires:-1, path: '/' });
				$.cookie('userId','',{ expires:-1, path: '/' });
				$.cookie('userMobile','',{ expires:-1, path: '/' });
				$.cookie('userPwd','',{ expires:-1, path: '/' });
				$.cookie('user_token','',{ expires:-1, path: '/' });
				//$.cookie('glo_lottery_id','',{ expires:-1, path: '/' }); 
				//清空购物车cookie
				//$.cookie('goods_num','',{ expires:-1, path: '/' });
				//清空discus登录cookie
				$.cookie('ucenter_url','',{ expires:-1, path: '/' });
				
				var logout_url=data['logout_url'];
				location.href = "index.html";
				//替换 登录时的discus跳转的cookie
				$('#ifUrl').attr('src',''+logout_url+'');
				
			},
			error: function(){
				  swal({
					  title: "",
					  text: '操作失败!',
					  html: true,
					  type: "error",
					  confirmButtonText:"确定",
					  confirmButtonColor: "#ff4800",
				  });
			  }
				  
		  });
		  
	
	});
	
	
} 