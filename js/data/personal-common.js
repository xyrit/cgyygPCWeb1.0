// 个人中心 --公共函数，检测cookie中的uid是否存在，不存在表示未登录，只显示左侧的参与记录与中奖记录以及晒单，若已经登录则显示全部菜单
//个人中心合成一个页面来做！！
var userId = $.cookie('userId');
var nickname = $.cookie('nickname');
var userMobile = $.cookie('userMobile');
var user_token = $.cookie('user_token');

if(typeof(user_token) == "undefined") {
	$("#myAccount").hide();//我的账户菜单
	$("#moneyDetail").hide();//我的资金明细
	$('#attendRecord').hide();
	$("#luckyRecord").hide();
	$("#myComment").hide();
	$("#myIntegral").hide();//我的积分
	$("#myMoney").hide();//我的红包
	$("#inviteFriend").hide();//邀请好友
	$("#myAddres").hide();//我的收货地址
	$("#mySystem").hide();//我的个人中心设置
	$("#myBtnGroup").hide();//签到，修改密码，收货地址 按钮
}else{
	$("#personalMenu li").show();
	$("#myBtnGroup").show();//签到，修改密码，收货地址 按钮
	//调用签到接口，检查用户是否已经签到
	//
	
	
	//ok			 
	$("#signA").click(function(){
		if($("#signInText").text()=='今日签到'){
			sign_inAdd();
		}
		
	});
	sign_in();
	
	//当个人中心页面加载时读取 读取手机号码 用于判断在修改和增加地址时手机号是否存在
    getUserInfo();

}

function getUserInfo(){
	$.ajax({  
		  type:'post',  
		  url:''+ajaxUrl+'/Home/ucenter/userInfo',  
		  data:{
			  user_token:user_token
			  },  
		  cache:false,  
		  dataType:'json',
		  async:false,
		  beforeSend:function(){
		  },
		  success:function(data){  
			  var code=data['code'];
			  var info=data['info'];
			  var list=data['list'];
			  if(code==200){
				  var mobile =list['mobile'];
				 
				  var phost=list['phost'];	//头像地址前缀
				  var face=list['face'];//用户头像
				  //成功后把手机号码再次存进cookie
				  $.cookie('userMobile', mobile, { expires:1, path: '/' });



				  //$("#userPhone").html(mobile);
				  //写入用户头像
				  var p=picHostUrl(phost,face);//验证有没有头像，是本地登录还是第三方登录
				  $("#userPic").html('<img src="'+p+'"/>');
				   
				}
				  
		  }
	});
}
function sign_in(){
   $.ajax({  
		type:'post',  
		url:''+ajaxUrl+'/Home/ucenter/sign',  
		data:{
			user_token:user_token
			},  
		cache:false,  
		dataType:'json',  
		beforeSend:function(){
			//$("#rightContent").html('<div class="loading"></div>');
			//$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
		},
		success:function(data){  
		    var code=data['code'];
			var info=data['info'];
			//500为已经签到
		    if(code==500){
				$("#signInText").text('已签到');
				
			}
			
			else{
			  $("#signInText").text("今日签到");
			}	
			
		}
	});	
}
//点击加入购物车按钮时显示+1
 $("#signA").click(function() {
	 if($("#signInText").text()=='已签到'){
		$.tipsBox({
			obj: $(this),
			str: "<b style='font-family:Microsoft YaHei;font-size:12px'>您今天已经签到过了</b>",
			callback: function() {
				
			}
		});
	   return;
	 }
  });
//点击签到
function sign_inAdd(){
   	
   $.ajax({  
		type:'post',  
		url:''+ajaxUrl+'/Home/ucenter/signAdd',  
		data:{
			user_token:user_token
			},  
		cache:false,  
		dataType:'json',  
		beforeSend:function(){
			//$("#rightContent").html('<div class="loading"></div>');
			//$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
		},
		success:function(data){  
		    var code=data['code'];
			var info=data['info'];
			//500为已经签到
		    if(code==500){
				$("#signInText").text('已签到');
				return;
			}
			//200为点击签到成功
				
			if(code==200){
				$("#signInText").text("已签到");
			    return;
			}
					
			
		}
	});	
	$.tipsBox({
		obj: $(this),
		str: "<b style='font-family:Microsoft YaHei;font-size:12px'>+50积分</b>",
		callback: function() {
			
		}
	});
}

