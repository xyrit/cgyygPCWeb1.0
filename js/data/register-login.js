//获取地址栏传过来参数
function GetQueryString(data)
{
     var reg = new RegExp("(^|&)"+ data +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
var code = GetQueryString('code');
if(code){
	$(".form-signin-1").fadeOut(100);
	$(".form-signin-2").fadeIn(500);
}
//var sid=$.cookie('PHPSESSID');

/*
  橙果登录/注册
*/

//浏览器若有load字段，则是圈子那边跳过来的，登录时需要获取发送到服务器
function GetQueryString(data)//获取地址栏传过来参数
{
	var reg = new RegExp("(^|&)"+ data +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}
var load = GetQueryString("load");
/******把load存下来，做个空白引导页*****/
$.cookie('load', load, { expires:1, path: '/' });


//赋值给第三方登录按钮

$(".qq").attr("href",""+ajaxUrl+"/Home/user/login?type=1&load="+load+"");
$(".weixin").attr("href",""+ajaxUrl+"/Home/user/login?type=3&load="+load+"");
$(".sina").attr("href",""+ajaxUrl+"/Home/user/login?type=2&load="+load+"");



var glo_encrypt_key;//token值
var glo_invite_code;//邀请码


var regist=GetQueryString('regist');



if(regist==1){
	$(".form-signin-2").fadeIn();
}
get_verify();
function get_verify(){
	$.ajax({
		type:'post',
		url:''+ajaxUrl+'/Home/User/verify_token',
		data:{

		},
		cache:false,
		dataType:'json',
		success: function(data){
			var encrypt_key=data['encrypt_key'];
			glo_encrypt_key=encrypt_key;
			if(($(".form-signin-3").css("display"))=="block"){

				$("#verify_find_pic").html('<img src="'+ajaxUrl+'/Home/User/verify_code?session_id='+glo_encrypt_key+'&action=find" width="80" height="40" id="verifyImg_find"><a href="javascript:;" onClick="getVerify_code_find();" style="padding-left:5px;">换一换</a>');//z这是找回密码的
			}
			if(regist==1||($("#form-signin-2").css("display"))=="block")
			{
				$("#verify").html('<img src="'+ajaxUrl+'/Home/User/verify_code?session_id='+glo_encrypt_key+'&action=register" width="80" height="40" id="verifyImg"><a href="javascript:;" onClick="getVerify_code();" style="padding-left:5px;">换一换</a>');//z这是注册的
			}
			if(($(".form-signin-1").css("display"))=="block"){
				$("#verify_0").html('<img src="'+ajaxUrl+'/Home/User/verify_code?session_id='+glo_encrypt_key+'&action=login" width="80" height="40" id="verifyImg_1"><a href="javascript:;" onClick="getVerify_code_login();" style="padding-left:5px;">换一换</a>');//zhes 是登录的
			}



		}
	});
}

//这是登录的
function getVerify_code_login(){
	
		//为了清除缓存,加随机数，加以区别，才能替换成功

		$("#verifyImg_1").attr('src',''+ajaxUrl+'/Home/User/verify_code?session_id='+glo_encrypt_key+'&action=login&random='+Math.random());

		$("#Verify_1").val('');
			  
}

//这是注册的
function getVerify_code(){
	
	//为了清除缓存,加随机数，加以区别，才能替换成功
	$("#verifyImg").attr('src',''+ajaxUrl+'/Home/User/verify_code?session_id='+glo_encrypt_key+'&action=register&random='+Math.random());

	$("#valVerify").val('');
}
//这是忘记密码的
function getVerify_code_find(){
	
	//为了清除缓存,加随机数，加以区别，才能替换成功
	$("#verifyImg_find").attr('src',''+ajaxUrl+'/Home/User/verify_code?session_id='+glo_encrypt_key+'&action=find&random='+Math.random());

	$("#Verify_find").val('');
}

//检查手机号是否可以注册
$("#regTip").hide();
var sMobile;
$("#getVerify").click(function(){
	var get_this=this;
	var Verify_0=$("#Verify_0").val();
	var sMobile=$("#regPhone").val();
	var regExPhone=/^1[3|5|7|8][0-9]\d{4,8}$/;//手机号码
	var regVerifyNum=/^[^\u4e00-\u9fa5]{0,}$/;//不能是中文
	
	if(sMobile=='请输入手机号'){
		 $("#regTip").fadeIn();
		 $("#regTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入手机号</span>');
		 return;
		}
	if(!(regExPhone.test(sMobile))){
		 $("#regTip").fadeIn();
		 $("#regTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入正确的手机号</span>');
		 return;
		 }
		 else if(Verify_0=='请输入图形验证码'){
			 $("#regTip").fadeIn();
			 $("#regTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入图形验证码</span>'); 
			 return;
		 } 
		 else if(!(regVerifyNum.test(Verify_0))){
			 $("#regTip").fadeIn();
			 $("#regTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">验证码不能输入中文</span>');
			 return;
			 }else{
			 //$(this).attr("onClick","settime_reg(this);");
			 
			 checkPhoneIsExist();
			 $("#regTip").fadeIn();
			 $("#regTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">手机格式正确，验证码已以发送到手机，请注意查收</span>');
			
		}
		
		function checkPhoneIsExist(){
            $.ajax({
				type:'post',  
				url:''+ajaxUrl+'/Home/User/register_check',  
				data:{
					mobile:sMobile,
					captcha:Verify_0,
					/*token:glo_encrypt_key,*/
					session_id:glo_encrypt_key,
					},  
				cache:false,  
				dataType:'json',
				success: function(data){
					//var code ='';
					var code= data['code'];
					var info=data["info"];

					 
					 if(code!=200){
						 $("#regTip").fadeIn();
						 $("#regTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">'+info+'</span>');
						if(code==500){
							//更换验证码
							getVerify_code();
						}
						 
					}else{
							settime_reg(get_this);//调用倒计时

					}
	  

				}
				
			 });	

       }
		
});
//注册手机的验证码倒计时
var countdown=120; 
document.getElementById("getVerify").disabled = false; 

function settime_reg(obj) { 
    if (countdown == 0) { 
        obj.removeAttribute("disabled");    
        obj.value="免费获取验证码"; 
        countdown= 120; 
        return;
    } else { 
        obj.setAttribute("disabled", true); 
        obj.value="重新发送(" + countdown + ")"; 
        countdown--; 
    } 
setTimeout(function() { 
    settime_reg(obj) }
    ,1000) 
}

//输入手机号和手机短信验证码后验证，同意协议并注册
var glo_mobile_token;
$("#register-btn").click(function(){
      var sMobile=$("#regPhone").val();
  	  var valVerify = $("#valVerify").val();
	  var regExPhone_reg=/^1[3|5|7|8][0-9]\d{4,8}$/;//手机号码
	  //var regVerifyNum=/^[^\u4e00-\u9fa5]{0,}$/;//不能是中文
	  var regVerifyNum_2=/^[0-9]{4,4}$/; //手机验证码只能是4位数字
	  var Verify_0=$("#Verify_0").val();//图形验证码
	  var invite_code = $('#invite_code').val();//邀请码
	  if(sMobile=='请输入手机号'){
		 $("#regTip").fadeIn();
		 $("#regTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入手机号</span>');
		 return;
		}
	  if(!(regExPhone_reg.test(sMobile))){
		   $("#regTip").fadeIn();
		   $("#regTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入正确的手机号</span>');
		  return;
		   }
	   if(Verify_0=='请输入图形验证码'){
		   $("#regTip").fadeIn();
		   $("#regTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入图形验证码</span>'); 
		   return;
	   } 
	  if(valVerify=='请输入4位验证码'){
		   $("#regTip").fadeIn();
		   $("#regTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入4位验证码</span>');
		   return;
		  }	   
	  if(!(regVerifyNum_2.test(valVerify))){
		    $("#regTip").fadeIn();
		    $("#regTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入正确的4位验证码</span>');
			return;
		  }	   
	  

	  checkVerify();
	   //验证码
		function checkVerify(){
			
		   $.ajax({
				type:'post',  
				url:''+ajaxUrl+'/Home/User/verify',  
				data:{
					mobile:sMobile,
					verify:valVerify,
					captcha:Verify_0,
					//token:glo_encrypt_key,
					invite_code:invite_code,
					session_id:glo_encrypt_key,
					},  
				cache:false,  
				dataType:'json',
				success: function(data){
					//alert(data)
					var code=data['code'];
					var info=data['info'];
					if(code!=200){
						$("#regTip").fadeIn();
						$("#regTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">'+info+'</span>');
						//更换验证码
						getVerify_code();
						return;
					};

					$('.form-signin-1').css("display","none");
					$('.form-signin-2').css("display","none");
					$(".register-password").css("display","block");  
					
					//如果手机号可以注册，则把手机号存下来，在注册完成后销掉
					$.cookie('testMobile', sMobile, { expires:1, path: '/' });
					glo_invite_code=invite_code;//保存邀请码
					
					
					//获得手机号的token
					var mobile_token=data['mobile_token'];
					glo_mobile_token=mobile_token;
					}
					
		   });
		
		} 
})
//确认注册
$("#regTip2").hide();
$("#submit-reg").click(function(){
	//var sMobile=$("#regPhone").val();
	var passwordVal=$("#pwdpwd2").val();
	//passwordVal=$.md5(passwordVal);
    var rePasswordVal=$("#pwdpwd3").val();
	var passReg=/^\S{6,20}$/;  //6-20位字符
	var testMobile = $.cookie('testMobile');//获取cookie中的手机号
	if(passwordVal==''){
		$("#regTip2").fadeIn();
		$("#regTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入密码</span>');
		return;
	}
	if(!(passReg.test(passwordVal))){
		$("#regTip2").fadeIn();
		$("#regTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">密码由6-20位字符组成</span>');
		return;
	}
	if(rePasswordVal==''){
		$("#regTip2").fadeIn();
		$("#regTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请再次输入密码</span>');
		return;
	}
	if(passwordVal!=rePasswordVal){
		$("#regTip2").fadeIn();
		$("#regTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">两次密码不相等</span>');
		return;
	}
	$.ajax({
		  type:'post',  
		  url:''+ajaxUrl+'/Home/User/register',  
		  data:{
			  mobile_token:glo_mobile_token, //发送点击同意并注册时获得的手机token
			  password:$.md5(passwordVal),
			  repassword:$.md5(rePasswordVal),
			  invite_code:glo_invite_code
			  },  
		  cache:false,  
		  dataType:'json', 
		  success: function(data){
			  var code=data['code'];
			  var info=data['info'];
			  if(code!=200){
				 $("#regTip2").fadeIn();
		         $("#regTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">'+info+'</span>');
		         return;  
			  }
			  
			  var userId=data['user']['uid'];
			  var userPwd=data['user']['password'];
			  var userMobile=data['user']['mobile'];
			  var nickname=data['user']['nickname'];
			  var user_token=data['user']['user_token'];
			  var pic_host=data['pic_host'];
			  var path=pic_host+data['user']['path'];
			  /*start 注册成功后 返回discuz论坛的链接，与它登录打通*/
			  var ucenter_url=data['user']['ucenter_url'];
			  $.cookie('ucenter_url', ucenter_url, { expires:1, path: '/' });
			  /*end*/
			  $.cookie('path', path, { expires:1, path: '/' });//用户头像
			  $.cookie('userMobile', userMobile, { expires:1, path: '/' });
			  //$.cookie('userPwd', userPwd, { expires:1, path: '/' });
			  $.cookie('userId', userId, { expires:1, path: '/' });
			  $.cookie('nickname', nickname, { expires:1, path: '/' });
			  $.cookie('user_token', user_token, { expires:1, path: '/' });
			 // $.cookie('status', 1, { expires:1, path: '/' });

			  $.cookie('testMobile', '', { expires:-1, path: '/' });
			  location.href = "index.html";
		  }
	})
})
	

//})
//登录

$("#loginTip").hide();
function toLogin(){
   var loginPhone2=$("#loginPhone").val();
    var loginPwd2=$("#pwdpwd").val();
	loginPwd2=$.md5(loginPwd2);
	var valVerify_login=$("#Verify_1").val();

	var regExPhone_login=/^1[3|5|7|8][0-9]\d{4,8}$/;//手机号码
	var regVerifyNum_login=/^[^\u4e00-\u9fa5]{0,}$/;
	if(loginPhone2=='请输入手机号'){
		 $("#loginTip").fadeIn();		
		 $("#loginTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入手机号</span>');
		 return;
		 }	
	if(!(regExPhone_login.test(loginPhone2))){

		 $("#loginTip").fadeIn();	
		// $("#loginTip").html('<img src="images/login/tips.png">请输入正确的手机号');
		 $("#loginTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入正确的手机号</span>');
		 //清空
		 
		return;
		
		 }
	 if(loginPwd2=='d41d8cd98f00b204e9800998ecf8427e'){
		 $("#loginTip").fadeIn();
		// $("#loginTip").html('<img src="images/login/tips.png">请输入密码');
		 $("#loginTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入密码</span>');
		 return;
		 }		 
	 if(!(regVerifyNum_login.test(valVerify_login))){
		 $("#loginTip").fadeIn();	
		// $("#loginTip").html('<img src="images/login/tips.png">请输入正确的验证码');
		 $("#loginTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入正确的验证码</span>');

		 return;
			 
		}

	$.ajax({
		type:'post',
		url:''+ajaxUrl+'/Home/User/login?load='+load+'',  //浏览器若有load字段，则是圈子那边跳过来的，需要获取发送到服务器
		data:{
			mobile:loginPhone2,
			password:loginPwd2,
			captcha:valVerify_login,
			//token:glo_encrypt_key, //验证码token
			session_id:glo_encrypt_key,
			},
		cache:false,
		dataType:'json',
		success: function(data){
			//console.log(data);
		
			 var code=data['code'];
			 var info=data['info'];
			 if(code!=200){

				 $("#loginTip").fadeIn();	
				 $("#loginTip").html('<img src="images/login/tips.png">'+info+'');
				 if(code==500){
					 //验证码不正确
					 //清除验证码
					 //$("#pwdpwd").val('');
					 $("#Verify_1").val('');
					 getVerify_code_login();
				 }
				 if(code==501){
					 //密码不正确
					 //清除密码
					 $("#pwdpwd").val('');
					 //$("#Verify_1").val('');
				 }
				 return;
				}
			
			 var userId2=data['user']['uid'];
			 
			 var nickname2=data['user']['nickname'];
			 var user_token2=data['user']['user_token'];
			 var user_token=data['user']['user_token'];
			 var pic_host=data['pic_host'];

			 var path=data['user']['path'];//用户头像
			 var p=picHostUrl(pic_host,path);//判断用户头像是否是第三方登录 有没有http前缀

			 var load_url=data['load_url'];

			 /*start 登录成功后 返回discuz论坛的链接，与它登录打通*/
			 var ucenter_url=data['user']['ucenter_url'];
			 $.cookie('ucenter_url', ucenter_url, { expires:1, path: '/' });
			 /*end*/
			 if(path==pic_host){
				 path='';
				 }
			   
				$.cookie('userMobile', loginPhone2, { expires:1, path: '/' });
			    //$.cookie('userPwd', loginPwd2, { expires:1, path: '/' });
			    $.cookie('userId', userId2, { expires:1, path: '/' });
				$.cookie('nickname', nickname2, { expires:1, path: '/' });
				$.cookie('user_token', user_token2, { expires:1, path: '/' });
				$.cookie('path', p, { expires:1, path: '/' });
				var userId = $.cookie('userId');

				var load=data['user']['load'];
                if(typeof(load_url)=='undefined'){
					if(load==0){
						//如果有load返回值，则跳到圈子首页
						//$('#ifUrl').attr('src',''+ucenter_url+'');
						location.href = "index.html";
					}else{

						location.href = ""+ucenter_url+"";
					}
				}
				else{
						location.href = ""+load_url+"";
					}

			}
		})	
}
//点击登录时调用登录函数
$("#login-btn").click(function(){
	toLogin();
});
//按enter键时调用登录函数
$(".form-signin-1").keypress(function(e) {
	if (e.which == 13) {
	   toLogin();
	}
});
	
$(window).keydown(function (e) {
	if (e.which == 13) {
		toLogin();
	    return false;
	}

});
//忘记密码
//发送验证码
$("#findTip").hide();
$("#get_find_verify").click(function(){
	var get_this=this;
	var find_phone=$("#find_phone").val();
	var regExPhone_find=/^1[2|3|4|5|6|7|8|9][0-9]\d{4,8}$/;//手机号码
	var Verify_find=$("#Verify_find").val();//图形验证码
	if(find_phone=='请输入手机号'){
		  $("#findTip").fadeIn();
		  $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入手机号</span>');
		 return;
	}
	if(!(regExPhone_find.test(find_phone))){

		$("#findTip").fadeIn();
	    $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入正确的手机号码</span>');
	   return;
	}

	if(Verify_find=='请输入图形验证码'){

		$("#findTip").fadeIn();
	    $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入图形验证码</span>');
	   return;
	}


	$.ajax({
		type:'post',
		url:''+ajaxUrl+'/Home/Verify/getVerify',
		data:{
			cellphone:find_phone,
			captcha:Verify_find,
			state:1,
			//token:glo_encrypt_key,
			type:2,
			session_id:glo_encrypt_key,
			},
		cache:false,
		dataType:'json',
		success: function(data){
			 var code=data['code'];
			 var info=data['info'];
			 if(code!=200){

				  $("#findTip").fadeIn();
	              $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">'+info+'</span>');
				 if(code==500){
					 getVerify_code_find();
				 }
				 return;
			 }else{
				  $("#findTip").fadeIn();
	              $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">'+info+'</span>');
				  settime_reg_find(get_this);

				  //把手机号码存进cookie，在设置新密码时向服务器发送手机号，就不用用户手动输入了
				  $.cookie('find_phone',''+find_phone+'',{ expires:1, path: '/'});

			 }

		}
	});
});
//找回密码的验证码倒计时
var countdown_find=120; 
document.getElementById("get_find_verify").disabled = false; 

function settime_reg_find(obj) { 
 
    if (countdown_find == 0) { 
        obj.removeAttribute("disabled");    
        obj.value="免费获取验证码"; 
        countdown_find= 120; 
        return;
    } else { 
        obj.setAttribute("disabled", true); 
        obj.value="重新发送(" + countdown_find + ")"; 
        countdown_find--; 
    } 
setTimeout(function() { 
    settime_reg_find(obj) }
    ,1000) 
}
//下一步

$("#find_next").click(function(){
	var find_phone=$("#find_phone").val();
	var Verify_find=$("#Verify_find").val();//图形验证码
	var find_verify=$("#find_verify").val();
	var regExPhone_find=/^1[2|3|4|5|6|7|8|9][0-9]\d{4,8}$/;//手机号码
	//var regVerifyNum_find=/^[^\u4e00-\u9fa5]{0,}$/;//验证码只能是数字
	var regVerifyNum_find=/^[0-9]{4,4}$/;  //手机验证码只能是4位数字
	//  /^[0-9]{4,4}$/; //手机验证码只能是4位数字
	if(find_phone=='请输入手机号'){

		$("#findTip").fadeIn();
	    $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入手机号</span>');
	   return;
	}
	if(!(regExPhone_find.test(find_phone))){

		$("#findTip").fadeIn();
	    $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入正确的手机号码！</span>');
	   return;
	}
	if(Verify_find=='请输入图形验证码'){

		$("#findTip").fadeIn();
	    $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入图形验证码</span>');
	   return;
	}
	if(find_verify=='请输入4位验证码'){

		$("#findTip").fadeIn();
	    $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入4位验证码！</span>');
	   return;
	}
	if(!(regVerifyNum_find.test(find_verify))){

		$("#findTip").fadeIn();
	    $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">手机验证码只能输入4位数字！</span>');
	   return;
	}
	$.ajax({
		type:'post',
		url:''+ajaxUrl+'/Home/Verify/checkVerify',
		data:{
			cellphone:find_phone,
			status:1,
			verify:find_verify,
			type:2,
			captcha:Verify_find,//图形验证码
			session_id:glo_encrypt_key
			},
		cache:false,
		dataType:'json',
		success: function(data){
			 var code=data['code'];
			 var info=data['info'];
			 if(code!=200){

				  $("#findTip").fadeIn();
	              $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">'+info+'</span>');
				 if(code=500){
					 getVerify_code_find();
				 }
				 return;
			 }
			 $(".form-signin-3").hide();
			 $(".form-signin-4").show();
			 $(".form-signin-1").hide();
		}
	});
});
$("#findTip2").hide();
$("#find_sibmit").click(function(){
	//var find_phone=$("#find_phone2").val();
	//读取存储的cookie
	var find_phone=$.cookie('find_phone');
	var find_pass=$("#find_pass").val();
	var find_repass=$("#find_repass").val();
	//var regExPhone_find=/^1[3|4|5|8][0-9]\d{4,8}$/;//手机号码
	var passReg=/^\S{6,20}$/;  //6-20位字符

	if(find_pass==''){

		$("#findTip2").fadeIn();
	    $("#findTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入新密码</span>');
	   return;
	}
	if(!(passReg.test(find_pass))){
		$("#findTip2").fadeIn();
		$("#findTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">密码由6-20位字符组成</span>');
		return;
	}
	if(find_repass==''){

		$("#findTip2").fadeIn();
	    $("#findTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请再次输入密码</span>');
	   return;
	}
	if(find_pass!=find_repass){

		$("#findTip2").fadeIn();
	    $("#findTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">两次密码不相等</span>');
	   return;
	}
	$.ajax({
		type:'post',
		url:''+ajaxUrl+'/Home/ucenter/upPassword',
		data:{
			cellphone:find_phone,
			status:1,
			newpassword:$.md5(find_pass),
			renewpassword:$.md5(find_repass)
			},
		cache:false,
		dataType:'json',
		success: function(data){
			 var code=data['code'];
			 var info=data['info'];
			 if(code!=200){

				  $("#findTip2").fadeIn();
	              $("#findTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">'+info+'</span>');
				 return;
			 }
			 swal({
				title: "",
				text: "<span class='text-danger'>重置密码成功</span>",
				type: "success",
				html:true,
				showCancelButton: false,
				confirmButtonColor: "#ff4800",
				confirmButtonText:"确定",
				//cancelButtonText:"取消",
				//confirmButtonText: "确定删除!",
				closeOnConfirm: true //点击确定后执行下面的function
			  },
			  function(){
				//swal("设置新密码成功!", "将会跳回登录页面。", "success");
			    $(".form-signin-4").hide();
				$(".form-signin-1").show();
				//销毁cookie
			    $.cookie('find_phone','',{ expires:-1, path: '/'});
				//清空密码框
				$("#find_pass").val('');
				$("#find_repass").val('');
			  });
			 
			 
		}
	});
});

//验证码及手机验证码框输入指定长度字符 -----4位字符
function check_length(obj){
    	var curLength=obj.val().length; 
		if(curLength>4){ 
		  var num=obj.val().substr(0,4); 
		   obj.val(num); 
		   //alert(obj.val()); 
		} 
		else{ 
	    	obj.text(4-obj.val().length); 
		}
}
//密码输入框不能超过20位
function checkPass_length(obj){
    	var curLength=obj.val().length; 
		if(curLength>20){ 
		  var num=obj.val().substr(0,20); 
		   obj.val(num); 
		   //alert(obj.val()); 
		} 
		else{ 
	    	obj.text(20-obj.val().length); 
		}
}

/**********************服务协议的调用******************************/
function getArticle(help_pid){
	$.ajax({
		type:'post',
		url:''+ajaxUrl+'/Home/Index/docDetail',
		data:{
			id:help_pid
		},
		cache:false,
		dataType:'json',
		timeout:60000,
		beforeSend: function(){

			$(".loading").html("<img src='images/loding.gif'/><br>正在加载中...");
		},
		success:function(data){
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
				return;
			}
			var detail=data['detail'];
			var content=detail[0]['content'];
			var create_time=detail[0]['create_time'];
			var title=detail[0]['title'];
			//时间戳格式化
			var timestamp_0 = create_time;
			var newDate_0 = new Date();
			newDate_0.setTime(timestamp_0 * 1000);
			var newcreate_time_0=newDate_0.format('yyyy-MM-dd hh:mm:ss.SS');

			var rightContentStr='';
			rightContentStr+='<div class="row">';
			rightContentStr+='<div class="per-goods-box nomargin">';
			rightContentStr+='<div class="per_time_tab-content">';

			rightContentStr+='<div class="article-text" id="articleContent">'+content+'';
			// rightContentStr+='<div class="loading"></div>';
			rightContentStr+='</div>';
			rightContentStr+='</div>';
			rightContentStr+='</div>';
			rightContentStr+='</div>';

			$("#agreement").html(rightContentStr);
			$(".loading").empty();
		}
	});
}