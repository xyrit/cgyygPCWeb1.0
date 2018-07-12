
//公共调用，搜索，判断用户是否已经登录，等等
//*********author：Hong***********//
//判断用户是否已经登录


/***********取cookie start***************/
var userId = $.cookie('userId');
//var nickname = $.cookie('nickname');
var userMobile = $.cookie('userMobile');
var user_token = $.cookie('user_token');

/***********取cookie end***************/
//公共调用 分类菜单等等
//*********author：Hong***********//
function GetQueryString(data)//获取地址栏传过来参数
{
	var reg = new RegExp("(^|&)"+ data +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}


//获取地址栏传过来参数
//rightContentMarking=1为参与记录，2为中奖记录，3为晒单列表
//商品ID
var pid = GetQueryString("pid");
//期号ID
var lottery_id = GetQueryString("lottery_id");
//获取他人user ID，用户ID，根据传过来的值跳转进他人相应的 个人购买记录，中奖记录
var user_uid=GetQueryString("uid");
var	rightContentMarking=GetQueryString("rightContentMarking");
//根据传过来的值跳转进个人中心相应的 个人购买记录，中奖记录，个人设置 1是参与记录，2是中奖记录 3 是中奖记录（查看他人的）
var	per_market=GetQueryString("per_market");//根据传过来的值跳转进个人中心相应的  1是参与记录 2是设置中心（查看自己的）
var	nickname=GetQueryString("nickname");//传递用户昵称，查看他人的
nickname=decodeURI(nickname);


//未揭晓详情页中，占卜功能，根据浏览器是否有flag=1,弹出弹窗
var	flag=GetQueryString("flag");

/****end***/

var picScale='@!cg100';//把用户头像缩小，直接加在.jpg后面

function picHostUrl(picHost,picPath){
	var picReg=/^http[\s\S]*$/;//判断图片图片是否包含http，包含的就是第三方登录的头像
	if(picPath==''){

		picPath='images/default1.png';
		return picPath;
	}
	if(!(picReg.test(picPath))){

		picPath=picHost+picPath+picScale;
		return picPath;
	}else{

		return picPath;

    }
	
    return 'images/default1.png';
}

//检测是否为IE8以下浏览器，如果是就在网页顶部出现提示，建议IE9以上浏览器浏览

/*if(navigator.userAgent.indexOf("MSIE")>0){   
      if(navigator.userAgent.indexOf("MSIE 6.0")>0){   
        alert("ie6");    
      }   
      if(navigator.userAgent.indexOf("MSIE 7.0")>0){  
        alert("ie7");   
      }   
      if(navigator.userAgent.indexOf("MSIE 9.0")>0 && !window.innerWidth){//这里是重点，你懂的
        alert("ie8");  
      }   
      if(navigator.userAgent.indexOf("MSIE 9.0")>0){  
        alert("ie9");  
      }   
} */
//检测ie8以下版本
if (!$.support.leadingWhitespace) {
	
	var alert_warning = '';
	alert_warning += '<div class="alert alert-danger  alert-dismissible fade in nomargin" role="alert">';
	alert_warning += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
	alert_warning += '<span aria-hidden="true">×</span></button>';
    alert_warning += '<strong style="padding-right:10px">警告!</strong>您目前使用的浏览器的版本低于IE9，橙果云购不支持IE9以下浏览器访问，为了您的购物体验，请使用IE9以上版本或使用其他现代浏览器访问！';  
    alert_warning += '</div>';    
	$("body").prepend(alert_warning);
}






	