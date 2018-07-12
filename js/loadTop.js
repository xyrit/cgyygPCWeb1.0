// 首页的头部  判断是否是QQ等第三方接口登录的， 首页数据

//调用接口检查是否第三方登录
function GetQueryString(data)//获取地址栏传过来参数
{
     var reg = new RegExp("(^|&)"+ data +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
var token = GetQueryString("token");

if(token){

	$.ajax({  
		  type:'post',  
		  url:''+ajaxUrl+'/Home/User/getInfo',  
		  
		  data:{
			  token:token
			  },  
		  cache:false,  
		  dataType:'json', 
		  timeout:60000,
		  beforeSend: function(){
			 // $(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			  },
		  success:function(data){  
			var code=data['code'];
			var info=data['info'];
			if(code!=200){
				  swal({
					  title: "",
					  text: ''+info+'！',
					  html: true,
					  type: "error",
					  confirmButtonText:"确定",
					  confirmButtonColor: "#ff4800",
				  });
				  return;
			  }
			  var uid=data['user']['uid'];
			  var nickname=data['user']['nickname'];
			  var pic_host=data['pic_host'];
			  var path=data['user']['path'];
			  var mobile=data['user']['mobile'];
			  var user_token=data['user']['user_token'];
			  var picReg=/^http[\s\S]*$/;
			  if(!(picReg.test(path))){

				   path=pic_host+path;
				  
				   $.cookie('path', path, { expires:1, path: '/' });
				  }else{

					  $.cookie('path', path, { expires:1, path: '/' });
					  }
			  
			  //var path=data['user']['path'];
			  $.cookie('userMobile', mobile, { expires:1, path: '/' });
			  $.cookie('userId', uid, { expires:1, path: '/' });
			  $.cookie('nickname', nickname, { expires:1, path: '/' });
			  $.cookie('user_token', user_token, { expires:1, path: '/' });
			  
			  getInfo();
		  }
	});
}


var userId = $.cookie('userId');
var nickname = $.cookie('nickname');
var userMobile = $.cookie('userMobile');
var user_token = $.cookie('user_token');
if(typeof(user_token) != "undefined") {
 /*
	$("#loginBox").html('<a href="login.html">请登录<a>');
	$("#regBox a").html("注册").attr({id:"reg_a",href:"login.html?regist=1"});
	$(".goods_num").html("0");*/

	$("#loginBox").html('<span>欢迎你，<span class="text-danger">'+nickname+'</span></span>');
	$("#regBox a").html("[退出]").attr({"id":'logout',"href":'javascript:;',"onClick":'getInfo();'});
}


//getInfo();
function getInfo(){

		//else{//注销登录

			
			//$("#logout").click(function(){
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
								$("#loginBox").html('<a href="login.html">请登录</a>');
					            $("#regBox a").html("注册").attr({"id":"reg_a","href":"login.html?regist=1"});
							}
						   return;
						 }
					  $("#loginBox").html('<a href="login.html">请登录</a>');
					  $("#regBox a").html("注册").attr({"id":"reg_a","href":"login.html?regist=1"});
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
					  //清空购物车cookie
					  //$.cookie('goods_num','',{ expires:-1, path: '/' });
					  //清空discus登录cookie
					  $.cookie('ucenter_url','',{ expires:-1, path: '/' });
					  
					  var logout_url=data['logout_url'];
					  location.href = "index.html";
					  //替换 登录时的discus跳转的cookie
					   $('#ifUrl').attr('src',''+logout_url+'');
					 
					  
					},error: function(){
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
				  
			
			//});
			
			
		//}
}


	