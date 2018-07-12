/**
 * Created by Hong on 2016/3/25.
 */
//获取地址栏传过来参数
function GetQueryString(data)
{
    var reg = new RegExp("(^|&)"+ data +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var othertoken = GetQueryString('othertoken'); //第三方登陆othertoken
//把第三方登录的token存下来，提交验证码时提交给服务器
//$.cookie('othertoken',''+othertoken+'',{ expires:1, path: '/'});
/*******获取用户的昵称，头像等信息 start************/
$.ajax({
    type:'post',
    url:''+ajaxUrl+'/Home/User/get_Bind_Info',
    data:{

        othertoken:othertoken,

    },
    cache:false,
    dataType:'json',
    success: function(data){
        var code=data['code'];
        var info=data['info'];
        if(code!=200){

        }else{
            var nickname=data['user']['nickname'];
            var path=data['user']['path'];
            $(".bind_pic").attr('src',''+path+'');
            $(".bind_nickname").html('欢迎您，'+nickname+'！');
        }


    }
});
/*******获取用户的昵称，头像等信息 end************/
//发送手机验证码
$("#get_find_verify").click(function(){

    var get_this=$(this);
    var find_phone=$("#find_phone").val();
    var regExPhone_find=/^1[2|3|4|5|6|7|8|9][0-9]\d{4,8}$/;//手机号码

    if(find_phone=='请输入手机号'){
        $(".tip").show();
        $("#findTip").fadeIn();
        $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入手机号</span>');
        return;
    }
    if(!(regExPhone_find.test(find_phone))){
        $(".tip").show();
        $("#findTip").fadeIn();
        $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入正确的手机号码</span>');
        return;
    }

    $.ajax({
        type:'post',
        url:''+ajaxUrl+'/Home/User/register_check',
        data:{
            mobile:find_phone,
            othertoken:othertoken,

        },
        cache:false,
        dataType:'json',
        success: function(data){
            var code=data['code'];
            var info=data['info'];
            if(code!=200){
                $(".tip").show();
                $("#findTip").fadeIn();
                $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">'+info+'</span>');
                return;
            }else{
                $(".tip").show();
                $("#findTip").fadeIn();
                $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">验证码已发送，请注意查收。</span>');
                settime_reg_find(get_this);
                var login_type=data['login_type']; //登录类型
                //发送验证码成功时发手机号码存进cookie，为后面输入密码提交使用
                $.cookie('find_phone',''+find_phone+'',{ expires:1, path: '/'});
                $.cookie('login_type',''+login_type+'',{ expires:1, path: '/'});
            }


        }
    });
});
$(".tip").hide();
/***点击绑定按钮时检测验证码 start****/
$("#find_next").click(function(){
    //读取存储的cookie的login_type；
    var login_type=$.cookie('login_type');
    var find_phone=$("#find_phone").val();
    var find_verify=$("#find_verify").val();
    var regExPhone_find=/^1[2|3|4|5|6|7|8|9][0-9]\d{4,8}$/;//手机号码
    //var regVerifyNum_find=/^[^\u4e00-\u9fa5]{0,}$/;//验证码只能是数字
    var regVerifyNum_find=/^[0-9]{4,4}$/;  //手机验证码只能是4位数字
    //  /^[0-9]{4,4}$/; //手机验证码只能是4位数字
    if(find_phone=='请输入手机号'){
        $(".tip").show();
        $("#findTip").fadeIn();
        $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入手机号</span>');
        return;
    }
    if(!(regExPhone_find.test(find_phone))){
        $(".tip").show();
        $("#findTip").fadeIn();
        $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入正确的手机号码！</span>');
        return;
    }

    if(find_verify=='请输入4位验证码'){
        $(".tip").show();
        $("#findTip").fadeIn();
        $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入4位验证码！</span>');
        return;
    }
    if(!(regVerifyNum_find.test(find_verify))){
        $(".tip").show();
        $("#findTip").fadeIn();
        $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">手机验证码只能输入4位数字！</span>');
        return;
    }
    $.ajax({
        type:'post',
        url:''+ajaxUrl+'/Home/User/verify',
        data:{
            mobile:find_phone,
            verify:find_verify,
            othertoken:othertoken,
        },
        cache:false,
        dataType:'json',
        success: function(data){
            var code=data['code'];
            var info=data['info'];
            if(code!=200){
                $(".tip").show();
                $("#findTip").fadeIn();
                $("#findTip").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">'+info+'</span>');
                return;
            }

            var mobile_token=data['mobile_token'];
            //存进cookie，设置密码时发送到服务器
            $.cookie('mobile_token',''+mobile_token+'',{ expires:1, path: '/'});
            var pic_host=data['pic_host'];

            //如果uid不存在，则该手机号没有绑定过，进入设置密码步骤，否则直接跳去首页
            if(typeof(data['user'])=='undefined')
            {

                $(".form-signin-3").hide();
                $(".form-signin-4").show();
            }
            else
            {
                var uid=data['user']['uid'];
                var nickname=data['user']['nickname'];
                var path=data['user']['path'];
                var mobile=data['user']['mobile'];
                var user_token=data['user']['user_token'];
                var load_url=data['user']['load_url'];
                var p=picHostUrl(pic_host,path);//判断用户头像是否是第三方登录 有没有http前缀
                $.cookie('path', p, { expires:1, path: '/' });
                $.cookie('userMobile', mobile, { expires:1, path: '/' });
                $.cookie('userId', uid, { expires:1, path: '/' });
                $.cookie('nickname', nickname, { expires:1, path: '/' });
                $.cookie('user_token', user_token, { expires:1, path: '/' });
                 if(typeof(load_url)=='undefined'){
                     window.location.href = "index.html";
                 }else{
                     window.location.href = ""+load_url+"";
                 }



            }


        }
    });
})
/***点击绑定按钮时检测验证码 start****/
/***密码提交 start***/
$("#find_sibmit").click(function(){
    //读取存储的cookie的mobile_token；
    var mobile_token=$.cookie('mobile_token');
    var find_pass=$("#find_pass").val();
    var find_repass=$("#find_repass").val();
    var passReg=/^\S{6,20}$/;  //6-20位字符

    if(find_pass==''){
        $(".tip").show();
        //$("#findTip2").fadeIn();
        $("#findTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请输入新密码</span>');
        return;
    }
    if(!(passReg.test(find_pass))){
        $(".tip").show();
       // $("#regTip2").fadeIn();
        $("#findTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">密码由6-20位字符组成</span>');
        return;
    }
    if(find_repass==''){
        $(".tip").show();
        $("#findTip2").fadeIn();
        $("#findTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">请再次输入密码</span>');
        return;
    }
    if(find_pass!=find_repass){
        $(".tip").show();
        $("#findTip2").fadeIn();
        $("#findTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">两次密码不相等</span>');
        return;
    }
    $.ajax({
        type:'post',
        url:''+ajaxUrl+'/Home/User/register',
        data:{
            mobile_token:mobile_token,
            password:$.md5(find_pass),
            repassword:$.md5(find_repass),
            othertoken:othertoken
        },
        cache:false,
        dataType:'json',
        success: function(data){
            var code=data['code'];
            var info=data['info'];
            if(code!=200){
                $(".tip").show();
                $("#findTip2").fadeIn();
                $("#findTip2").html('<span class="glyphicon glyphicon-exclamation-sign errTipIcon pull-left"></span><span class="pull-left">'+info+'</span>');
                return;
            }
            var userId2=data['user']['uid'];

            var nickname2=data['user']['nickname'];
            var user_token2=data['user']['user_token'];
            var user_token=data['user']['user_token'];
            var pic_host=data['pic_host'];
            var path=data['user']['path'];//用户头像

            var load=data['user']['load']; //load=1跳回圈子，否则跳到首页。
            var ucenter_url=data['user']['ucenter_url'];
            //销毁cookie
            //$.cookie('find_phone','',{ expires:-1, path: '/'});
            $.cookie('mobile_token','',{ expires:-1, path: '/'});
            $.cookie('login_type','',{ expires:1, path: '/'});
            //存储cookie

            var find_phone=$.cookie('find_phone');
            $.cookie('userMobile', find_phone, { expires:1, path: '/' });
            $.cookie('userId', userId2, { expires:1, path: '/' });
            $.cookie('nickname', nickname2, { expires:1, path: '/' });
            $.cookie('user_token', user_token2, { expires:1, path: '/' });
            $.cookie('path', path, { expires:1, path: '/' });
            //清空密码框
            $("#find_pass").val('');
            $("#find_repass").val('');

            if(load==0){
                //load=1跳回圈子，否则跳到首页。
                location.href = "index.html";
            }else{

                location.href = ""+ucenter_url+"";
            }
        }
    });
});
/***密码提交 end***/
//找回密码的验证码倒计时
var countdown_find=120;
//document.getElementById("get_find_verify").disabled = false;
$("#get_find_verify").attr("disabled",false);
function settime_reg_find(obj) {

    if (countdown_find == 0) {
        //obj.removeAttribute("disabled");
        obj.removeAttr("disabled");
        //obj.value="免费获取验证码";
        obj.text("免费获取验证码");
        countdown_find= 120;
        return;
    } else {
       // obj.setAttribute("disabled", true);
        obj.attr("disabled","disabled");
       // obj.value="重新发送(" + countdown_find + ")";
        obj.text("重新发送(" + countdown_find + ")");
        countdown_find--;
    }
    setTimeout(function() {
            settime_reg_find(obj) }
        ,1000)
}
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