var payList;//银行卡信息数组
var state; //状态
var page = 0;//第几页
var pageSize = 10 ;//转账;//显示条数
var glo_pageNum1;//佣金来源总页数
var glo_pageNumxf;//佣金消费总页数

var sort='all';//所有数据

//倒计时效果
var InterValObj;//timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount;//当前剩余秒数

/**左侧菜单切换**/
function business(){
	$('#business').addClass('active').siblings('li').removeClass('active');
	var business = '';//定义结构变量
   	$.ajax({
   		type:"post",
   		url:ajaxUrl+"/Home/Commission/invitation",
   		data:{
   			user_token:user_token
   		},
   		dataType:'json',
   		success:function(data){
   			var code = data['data']['code'];
   			var zhuceUrl = 'http://192.168.1.250/login.html?code=';
   			var zhucecode= zhuceUrl+code;

   			business+='<script type="text/javascript" >';

			business+='var jiathis_config={';
			business+="url:'"+zhucecode+"',";
			business+='summary:"橙果云购正式上线啦！",';
			business+='title:"橙果云购正式上线啦！ ##",';

			business+='hideMore:false';
			business+='}';
			business+='</script>';
   
   	
   	
   	
	   	business+='<div class="row">';
		business+='<div class="per-goods-box nomargin">';
		
		business+='<ul class="nav nav-tabs" role="tablist">';
		business+='<li class="active"><a id="yaoqing" onclick="business();" href="#home" role="tab" data-toggle="tab"  aria-expanded="true">邀请有奖</a></li>';
		business+='<li><a id="tuijianren" href="#home" role="tab" data-toggle="tab"  aria-expanded="false">我的推荐人</a></li>';
		business+='<li><a id="yongjinlaiyuan" href="#home" role="tab" data-toggle="tab"  aria-expanded="false">佣金来源</a></li>';
		business+='<li><a id="yongjinxiaofei" href="#home" role="tab" data-toggle="tab"  aria-expanded="false">佣金消费</a></li>';
		business+='<li><a id="yinghanka" href="#home" role="tab" data-toggle="tab"  aria-expanded="false">我的银行卡</a></li>';
		business+='</ul>';
		
		
		business+='<div class="user_business_list">';
		business+='<div class="loading"></div>';
		business+='<div class="business_img"><img width="100%" src="images/user/u394.png"/></div>';
		
		business+='<div class="business_url">';
		business+='<span class="color">您的专属邀请链接:</span>';
		business+='<input id="fooUrl" name="url" value=""/>';
		business+='<button class="right_bottonUrl btnsublic" data-clipboard-target="#fooUrl">复制链接</botton>';
		business+='</div>';

		business+='<div class="business_url">';
		business+='<span class="color">您的专属邀请号码:</span>';
		business+='<input id="fooUr2" name="url" value=""/>';
		business+='<button class="right_bottonUrl btnsublic2" data-clipboard-target="#fooUr2" class="right_bottonUrl" >复制邀请码</button>';
		business+='</div>';
										
		business+='<div class="fenxian_box">';
		business+='<ul>';
		
		business+='<li class="fenxiang_qq" ><i class="qq_img"></i>QQ分享</li>';

		business+='<div class="fenxiang_click">';


	//分享代码开始
		business+='<div class="jiathis_style_32x32">';
		business+='<a class="jiathis_button_qzone"></a>';
		business+='<a class="jiathis_button_tsina"></a>';
		business+='<a class="jiathis_button_tqq"></a>';
		business+='<a class="jiathis_button_weixin"></a>';
		business+='<a class="jiathis_button_renren"></a>';
		business+='<a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jtico jtico_jiathis" target="_blank"></a>';
		
		business+='</div>';
		
		business+='<script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script>';

	//分享代码结束

		business+='</div>';
		business+='<li class="weixin_hover">';
		business+='<i class="weixin_img"></i>微信分享';
		business+='<div class="erwe_box">';
		business+='<img src="images/user/erweima_img.jpg" alt="微信分享"/>';
		business+='</div>';
		business+='</li>';
		
		business+='<li class="duanxin_hover">';
		business+='<i class="duanxin_img"></i>短信分享';
		business+='<div class="duanxin_box">';
		business+='<p class="text_duanxin">短信内容</p>';
		business+='<p class="user_xinxi">';
		business+='<input type="text" name="mobile" placeholder="请输入手机号码" value="" />';
		business+='<input type="text" placeholder="请输入验证码" name="viter" value=""/>';
		business+='</p>';
		business+='<button class="bott_post" type="button">发送</button>';
		business+='</div>';
		business+='</li>';
		business+='</ul>';
		business+='</div>';
		business+='<h4 class="fenxiao_tite">规则说明：</h4>';
		business+='<div class="jieshao_text">';
		business+='<div class="jieshao_center">';
		business+='<p>1.用户B通过A分享的连接注册后成为A的一级，用户B购买商品后，用户A获得佣金</p>';
		business+='<p>2.用户C通过B分享的连接注册后成为B的一级，A的二级，用户C购买商品后，A和B都可以获得各自的佣金</p>';
		business+='<p>3.用户D通过C分享的连接注册后成为C的一级，B的二级，与A无关</p>';
		business+='</div>';
		business+='</div>';
		business+='</div>';

		business+='<script>';
		business+='$(".fenxian_box .weixin_hover").hover(function(){';
		business+='$(".erwe_box").slideDown();';
		business+='},function(){';
		business+='$(".erwe_box").slideUp();';
		business+='});';

		business+='$(".fenxian_box .fenxiang_qq").click(function(){';
		business+='$(".fenxiang_click").slideToggle();';
		business+='});';


		business+='$(".fenxian_box .duanxin_hover").hover(function(){';
		business+='$(".duanxin_box").slideDown();';
		business+='},function(){';
		business+='$(".duanxin_box").slideUp();';
		business+='});';
		business+='</script>';

		$('#rightContent').html(business);//更新dom
		/**我的推荐人**/
		$('#tuijianren').click(function(){
			tuijianren();
		});

		/**佣金来源**/
		$('#yongjinlaiyuan').click(function(){
			yongjinlaiyuan(page,pageSize)
		});
		
		/**佣金消费**/
		$('#yongjinxiaofei').click(function(){
			
			yongjinxiaofei(page,pageSize,'all',0,0);
		});
		
		/**我的银行卡**/
		$('#yinghanka').click(function(){
			yinghanka();
		});

		$('#fooUrl').val(zhucecode);
	   	$('#fooUr2').val(code);
	}

   	});
}

//我的积分
var glo_score_remain;//用户积分
function myIntegral(){
	$('#myIntegral').addClass('active').siblings('li').removeClass('active');
	var myIntegral = '';//定义积分结构
	$.ajax({
		type:"post",
		url:ajaxUrl+"/Home/ucenter/score_info",
		data:{
			user_token:user_token
		},
		dataType:'json',
		success:function(data){
			if(data['code']==200){
				var score_total = data['score_total'];//累计总积分
				var score_expense = data['score_expense'];//已兑换的积分
				var score_remain = data['score_remain'];////剩余积分
				if(score_remain==null){
					score_remain=0;
				}
				if(score_expense==null){
					score_expense=0;
				}
				if(score_total==null){
					score_total=0;
				}
				glo_score_remain=score_remain;//用户剩余积分

				if(parseInt(score_remain)<200){
					$('.jifenbutt').attr("disabled","disabled");//禁止积分按钮
					$('.jifenbutt').css({"background":"none"});
				}
				$('.score_total').text(score_total);//累计获得积分 赋值
				$('.score_remain').text(score_remain);//剩余积分
				$('.score_expense').text(score_expense);//已兑换积分
			}else{
				$('.cgButton').attr("disabled","disabled");
				$('.cgButton').css("background","#ccc");
				return;
			}
		},
		error:function(data){
			 $('.jifenbutt').attr("disabled","disabled");
			 $('.jifenbutt').css({"background":"#ccc","border":"none"});
		}
	});
	myIntegral+='<div class="row">';
	myIntegral+='<div class="per-goods-box nomargmyIntegral" style="margin-top:0px;">';
	myIntegral+='<ul class="nav nav-tabs" role="tablist" style="border-bottom:none;">';
	myIntegral+='<li class="active"><a id="yaoqing" onclick="business();" href="#home" role="tab" data-toggle="tab"  aria-expanded="true">积分消费</a></li>';
	myIntegral+='</ul>';
	myIntegral+='</div>';
	myIntegral+='</div>';

	myIntegral+='<div class="yongjin_list">';
	myIntegral+='<div class="yongjin_text">';
	myIntegral+='<p>累计总积分&nbsp;<span  class="color score_total">0</span></p>';
	myIntegral+='<p>已兑换积分&nbsp;<span id="" class="color score_expense">0</span></p>';
	myIntegral+='<p>剩余总积分&nbsp;<span id="" class="color score_remain">0</span></p>';
	myIntegral+='</div>';

	myIntegral+='<div class="cgb_boxman">';
	myIntegral+='<div class="cgbImg">';
	myIntegral+='<img src="images/cgb.png">';
	myIntegral+='</div>';
	myIntegral+='<p>&nbsp;&nbsp;&nbsp;200积分<button type="button" onclick="duihuan();" class="cgbutton jifenbutt">立即兑换</button></p>';

	myIntegral+='</div>';

	$('#rightContent').html(myIntegral);//我的积分

}

//兑换商品
function duihuan(){
	$.ajax({
		type:"post",
		url:ajaxUrl+"/Home/ucenter/score_exchange",
		data:{
			user_token:user_token,
			score_remain:glo_score_remain
		},
		dataType:'json',
		success:function(data){
			if(data['code']==200){
				var score = data['score'];//剩余积分积分
				var coin  = data['coin'];//兑换橙果币
				tanchuan_0('恭喜兑换成功啦！','success');
				myIntegral();
			}else{
				tanchuan_0(''+data['info']+'','success');
			}
		}
	});

}	
//复制url
var clipboard = new Clipboard('.btnsublic');
var clipboard2 = new Clipboard('.btnsublic2');

clipboard.on('success', function(e) {
  console.info('Action:', e.action);
  console.info('Text:', e.text);
  console.info('Trigger:', e.trigger);
  tanchuan_0('复制成功,可以立马分享啦！','success');
  e.clearSelection();
});
//复制code 码
clipboard2.on('success', function(e) {
  console.info('Action:', e.action);
  console.info('Text:', e.text);
  console.info('Trigger:', e.trigger);
  tanchuan_0('复制成功,可以立马分享啦！','success');
  e.clearSelection();
});

//微信显示二维码
function show(){

	$('.fenxian_box .weixin_hover').hover(function(){
		$('.erwe_box').slideDown();
	},function(){
		$('.erwe_box').slideUp();
	});
	$('.fenxian_box .duanxin_hover').hover(function(){
		$('.duanxin_box').slideDown();
	},function(){
		$('.duanxin_box').slideUp();
	});
}

/**我的推荐人**/
function tuijianren(){
  var tuijianren = '';
	$.ajax({
		type:"post",
		url:ajaxUrl+"/Home/Commission/recommendedList",
		data:{
			
			user_token:user_token
		},
		dataType:'json',
		beforeSend:function(){
			$('.loading').show();
			$('.loading').html('<img src="images/loding.gif"/><br/>正在加载中...');
		},
		success:function(data){
			$('.loading').hide();
			var host = data['host'];//图像地址前缀

			var list = data['list'];//推荐人信息数组
			if(list==''){
				tuijianren+='<div class="tuijian_list">';
				tuijianren+='<table  class="table table-hover">';
				tuijianren+='<th>推荐人头像</th>';
				tuijianren+='<th>推荐人ID</th>';
				tuijianren+='<th>推荐人昵称</th>';
				tuijianren+='<th>手机号码</th>';
				tuijianren+='<th>级别</th>';
				tuijianren+='<th>推荐人获得佣金</th>';
				
				tuijianren+='</table>';
				tuijianren+='<p style="width: 100%;height: 30px;line-height: 30px;text-align:center;color: #666;">暂时没有内容哦</p>';
				tuijianren+='</div>';
				$('.user_business_list').html(tuijianren);//改变dom
				return false;
			}
			tuijianren+='<div class="loading"></div>';
			tuijianren+='<div class="tuijian_list">';
			tuijianren+='<table class="table table-hover">';
			tuijianren+='<th>推荐人头像</th>';
			tuijianren+='<th>推荐人ID</th>';
			tuijianren+='<th>推荐人昵称</th>';
			tuijianren+='<th>手机号码</th>';
			tuijianren+='<th>级别</th>';
			tuijianren+='<th>推荐人获得佣金</th>';
	
			$.each(list, function(k,v) {
				var level = list[k]['level'];//级别
				if(level==1){
					level='一级';
				}else{
					level='二级';
				}
				var commission=list[k]['commission'];//佣金
				var uid 	 = list[k]['userInfo']['uid'];//uid
				var nickname = list[k]['userInfo']['nickname'];//名称
				var face 	 = list[k]['userInfo']['face'];//头像地址
				if(face==''){
					face='images/default1.png';
				}
				var mobile 	 = list[k]['userInfo']['mobile'];//手机号码
				var urlUser	 = 'personal-index-other.html?uid='+uid+'&nickname='+nickname+'';
				var url = encodeURI(encodeURI(urlUser));
				if(commission==null){
					commission=0;
				}
				//http://192.168.1.211/PCWeb/cgyygPCWeb1.0/personal-index-other.html?uid=10000322&nickname=%u5BF9%u4F60%u7231%u7231%u7231%u4E0D%u5B8C&rightContentMarking=2
				//构建结构
				tuijianren+='<tr>';
			 	tuijianren+='<td><img width="35" src="'+face+'"/></td>';
			 	tuijianren+='<td>'+uid+'</td>';
			 	tuijianren+='<td><a href="'+url+'">'+nickname+'</a></td>';
			 	tuijianren+='<td>'+mobile+'</td>';
			 	tuijianren+='<td>'+level+'</td>';
			 	tuijianren+='<td>'+commission+'</td>';
			 	tuijianren+='</tr>';
				
			});
			tuijianren+='</table>';
			tuijianren+='</div>';
			$('.user_business_list').html(tuijianren);//改变dom
		}
		
	});
	
}

/**佣金来源**/
function yongjinlaiyuan(page,pageSize){
	var yongjinlaiyuan ='';
	$.ajax({
		type:"post",
		url:ajaxUrl+"/Home/Commission/commissionList",
		data:{
			user_token:user_token,
			pageIndex:page,
			pageSize:pageSize
		},
		beforeSend:function(){
			$('.loading').show();
			$('.loading').html('<img src="images/loding.gif"/><br/>正在加载中...');
		},
		dataType:'json',
		success:function(data){
			$(".loading").hide();
			var list_list = data['list']['list'];//总数组
			
			if(list_list==''){
				yongjinlaiyuan+='<div class="yongjin_list">';
				yongjinlaiyuan+='<div class="yongjin_text">';
				yongjinlaiyuan+='<p>已邀请好友<span id="count_num" class="color">0</span>人</p>';
				yongjinlaiyuan+='<p>一级好友消费<span id="onecommission" class="color">0.00</span>元</p>';
				yongjinlaiyuan+='<p>二级好友消费<span id="towcommission" class="color">0.00</span>元</p>';
				yongjinlaiyuan+='<p>累计获得佣金<span id="sumcommission" class="color">0.00</span>元</p>';
				yongjinlaiyuan+='</div>';
			
				yongjinlaiyuan+='<div class="souso_box">';
				yongjinlaiyuan+='<div class="sousuo_right">';
				yongjinlaiyuan+='<input type="text" placeholder="请输入好友ID"/><a href="javascript:;">搜索</a>';
				yongjinlaiyuan+='</div>';
				yongjinlaiyuan+='</div>';
				yongjinlaiyuan+='<div class="main_center">';

				yongjinlaiyuan+='<p style="width: 100%;height: 50px;line-height: 50px;text-align:center;color: #666;">暂时没有内容哦</p>';

				yongjinlaiyuan+='</div>';

				yongjinlaiyuan+='</div>';
				
				$('.user_business_list').html(yongjinlaiyuan);//改变dom
				return false;
			}


			var pagecount = data['list']['count'];//总页数
			glo_pageNum1=pagecount;
			
			var count = data['list']['countuser'];//总邀请好友
			var onecommission = data['list']['onecommission'];//一级
			var towcommission = data['list']['towcommission'];//二级
			var sumcommission = data['list']['sumcommission'];//总金额
			var commission	  = data['list']['commission'];//佣金

			if(onecommission==null){
				onecommission=0;
			}
			if(towcommission==null){
				towcommission=0;
			}
			if(sumcommission==null){
				sumcommission=0;
			}
			if(commission==null){
				commission=0;
			}
			
			yongjinlaiyuan+='<div class="yongjin_list">';
			yongjinlaiyuan+='<div class="yongjin_text">';
			yongjinlaiyuan+='<p>已邀请好友<span id="count_num" class="color">0</span>人</p>';
			yongjinlaiyuan+='<p>一级好友消费<span id="onecommission" class="color">0.00</span>元</p>';
			yongjinlaiyuan+='<p>二级好友消费<span id="towcommission" class="color">0.00</span>元</p>';
			yongjinlaiyuan+='<p>累计获得佣金<span id="sumcommission" class="color">0.00</span>元</p>';
			yongjinlaiyuan+='</div>';
		
			yongjinlaiyuan+='<div class="souso_box">';
			yongjinlaiyuan+='<div class="sousuo_right">';
			yongjinlaiyuan+='<input type="text" placeholder="请输入好友ID"/><a href="javascript:;">搜索</a>';
			yongjinlaiyuan+='</div>';
			yongjinlaiyuan+='</div>';
			yongjinlaiyuan+='<div class="main_center">';
			
			yongjinlaiyuan+='<table class="table table-hover">';
			yongjinlaiyuan+='<th>好友</th>';
			yongjinlaiyuan+='<th>好友ID</th>';
			yongjinlaiyuan+='<th>好友名称</th>';
			yongjinlaiyuan+='<th>手机号码</th>';
			yongjinlaiyuan+='<th>级别</th>';
			yongjinlaiyuan+='<th>所属</th>';
			yongjinlaiyuan+='<th>充值金额(元)</th>';
			yongjinlaiyuan+='<th>获得佣金(元)</th>';

			$.each(list_list, function(k,v) {
				var level = list_list[k]['level'];//级别
				if(level==1){
					level='一级';
				}else{
					level='二级';
				}
				var uid = list_list[k]['userInfo']['uid'];//uid
				var fid = list_list[k]['fid'];//fid

				var nickname = list_list[k]['userInfo']['nickname'];//名称
				var face = list_list[k]['userInfo']['face'];//头像
				if(face==''){
					face='images/default1.png';
				}
				var mobile = list_list[k]['userInfo']['mobile'];//手机
				var commission2 = list_list[k]['commission'];//佣金
				var consumption	 = list_list[k]['consumption'];//消费总金额

				var urlUser	 = 'personal-index-other.html?uid='+uid+'&nickname='+nickname+'';
				var url = encodeURI(encodeURI(urlUser));
			
					yongjinlaiyuan+='<tr>';
					yongjinlaiyuan+='<td><img src="'+face+'" width="35"/></td>';
					yongjinlaiyuan+='<td>'+uid+'</td>';
					yongjinlaiyuan+='<td><a href="'+url+'">'+nickname+'</a></td>';
					yongjinlaiyuan+='<td>'+mobile+'</td>';
					yongjinlaiyuan+='<td>'+level+'</td>';
					yongjinlaiyuan+='<td><a onclick="click_name(this,'+fid+')" href="javascript:;">点击查看</a></td>';
					yongjinlaiyuan+='<td>'+consumption+'</td>';
					yongjinlaiyuan+='<td>'+commission2+'</td>';
					yongjinlaiyuan+='</tr>';

			});
			yongjinlaiyuan+='</table>';
			
			yongjinlaiyuan+='<nav class="text-center page page_click">';
			yongjinlaiyuan+='<ul class="pagination clearfix">';
			yongjinlaiyuan+='<li><a onclick="reducepage();" href="javascript:;">';
			yongjinlaiyuan+='<span class="glyphicon glyphicon-chevron-left"></span>上一页</a>';
			yongjinlaiyuan+='</li>';
			//分页显示页码
		 	for (var m = 0; m < glo_pageNum1; m++) {

		 		if(m==page){//当前页设置选中效果
					yongjinlaiyuan+='<li class="active">';
					yongjinlaiyuan+='<a class="pageBtnNum2" href="javascript:yongjinlaiyuan('+(m)+','+pageSize+');">'+(m+1)+'</a>';
					yongjinlaiyuan+='</li>';
				}else{
					//不选中
					yongjinlaiyuan+='<li>';
					yongjinlaiyuan+='<a class="pageBtnNum2" href="javascript:yongjinlaiyuan('+(m)+','+pageSize+');">'+(m+1)+'</a>';
					yongjinlaiyuan+='</li>';
				}
		 	}

			yongjinlaiyuan+='<li><a onclick="addpage();" href="javascript:;">';
			yongjinlaiyuan+='<span class="glyphicon glyphicon-chevron-right"></span>';
			yongjinlaiyuan+='下一页</a></li>';
			yongjinlaiyuan+='</ul>';
			yongjinlaiyuan+='<div class="count-box">';
			yongjinlaiyuan+='<div class="count-num">共<em class="pageCountheji"></em>页</div></div></nav>';
			
			yongjinlaiyuan+='<font class="h4color">规则说明：</font>';
			yongjinlaiyuan+='<div class="jieshao_text">';

			yongjinlaiyuan+='<p>1、一级好友充值金额的4%做为佣金，二级好友充值金额的2%做为佣金</p>';
			yongjinlaiyuan+='<p>2、累计获得佣金=一级好友佣金+二级好友佣金</p>';

			yongjinlaiyuan+='</div>';
			yongjinlaiyuan+='</div>';
			yongjinlaiyuan+='</div>';
			$('.user_business_list').html(yongjinlaiyuan);//改变dom
			if(glo_pageNum1<=1){	
					$('.page_click').hide();
			}
			$('.pageCountheji').text(glo_pageNum1);//总页数
			$('#count_num').text(count);
			$('#onecommission').text(onecommission);
			$('#towcommission').text(towcommission);
			$('#sumcommission').text(sumcommission);
			if(!glo_pageNum1){
					
					$('.page_click').hide();
			}
		}
	});

		
}

//查看所属
function click_name(v,fid){
	//alert(v.innerHTML);
	//alert(fid);

	$.ajax({
		type:'post',
		url:ajaxUrl+'/Home/Commission/getFidCommission',
		data:{
			fid:fid
		},	
		dataType:'json',
		success:function(data){
			if(data['code']==200){
				var nickname = data['nickname'];
			}
			v.innerHTML=nickname;
		}

	});
}


//佣金来源下一页
var j=0;
function addpage(){
	j++;
	if(j>(glo_pageNum1-1)){
		j=glo_pageNum1-1;
		return false;
	}
	
	yongjinlaiyuan(j,pageSize);
}

function reducepage(){
	j--;
	if(j<0){
		j=0;
		return false;
	}
	
	yongjinlaiyuan(j,pageSize);
}
//请求我的银行卡账户信息
function payuserlist(){
	$.ajax({
		type:"post",
		url:ajaxUrl+"/Home/Commission/member_banks",
		data:{
			user_token:user_token
		},
		beforeSend:function(){
			$('.loading').show();
			$('.loading').html('<img src="images/loding.gif"/><br/>正在加载中...');
		},
		dataType:'json',
		success:function(data){
			var list = data['list'];
			payList=list;//把银行卡 数组 赋值给全局变量
		}
	});	
}



//佣金消费
function yongjinxiaofei(page,pageSize,sort,starttime,endtime){

	payuserlist();
	var yongjinxiaofei = '';
	$.ajax({
		type:"post",
		url:ajaxUrl+"/Home/Commission/consumptionsList",
		data:{
			user_token:user_token,
			pageIndex:page,
			pageSize:pageSize,
			sort:sort,
			starttime:starttime,
			endtime:endtime
		},
		
		dataType:'json',
		success:function(data){
			
			var sumcommission = data['list']['sumcommission'];//累计佣金
			var withdraw_bank = data['list']['withdraw_bank'];//提现到账
			var withdraw_user = data['list']['withdraw_user'];//转账
			var sumconsumption= data['list']['sumconsumption'];//累计消费佣金
			
			
			var remain 		  = data['list']['remain'];//可提现用佣金
			if(remain==null){
				remain=0.00;
			}
			var list		  =	data['list']['list'];//数据数组
			//如果佣金消费为空的 
			if(list==''){
				
				yongjinxiaofei+='<div class="yongjin_list">';
				yongjinxiaofei+='<div class="yongjin_text">';
				yongjinxiaofei+='<p class="xiaofei_text">累计获得佣金<span id="sumcommission" class="color">0.00</span>元</p>';
				yongjinxiaofei+='<p class="xiaofei_text">累计提现银行卡<span id="withdraw_bank" class="color">0.00</span>元</p>';
				yongjinxiaofei+='<p class="xiaofei_text">累计转账到账<span id="withdraw_user" class="color">0.00</span>元</p>';
				yongjinxiaofei+='<div class="pay_rightBubbon"><a href="javascript:showtixianBox();">提现</a><a href="javascript:zhuanzhanshow();">转账</a></div>';
				yongjinxiaofei+='</div>';


				//提现申请 结构开始
				yongjinxiaofei+='<div style="display:none" class="addpayBox tixianshen">';
				yongjinxiaofei+='<div class="addInput">';
				yongjinxiaofei+='<div class="input_pay"><span>可提佣金：</span><font class="color">'+remain+'</font> 元</div>';
				yongjinxiaofei+='<div class="input_pay"><span>银行账户：';
				yongjinxiaofei+='<select id="yinhangka" class="form-control payinput bank_name">';
				$.each(payList, function(k,v) {
					var bank_name = payList[k]['bank_name'];//银行名称
					var bank_code = payList[k]['bank_code'];//银行账户
					var id = payList[k]['id'];//银行卡id
					yongjinxiaofei+='<option value="'+id+'">'+bank_name+'-'+bank_code+'</option>';
				});
				
				yongjinxiaofei+='</select>';
				yongjinxiaofei+='</div>';
				yongjinxiaofei+='<div class="input_pay"><span>提现金额：</span><input  class="form-control payinput bank_monir" type="text" placeholder="请输入提现金额 必须为整数" name="payuser" value=""/></div>';
				yongjinxiaofei+='<div class="input_pay"><span>验证码：&nbsp;&nbsp;&nbsp;&nbsp;</span><input  style="width: 25%;" class="form-control payinput" type="text" placeholder="请输入绑定手机验证码" name="payuser" value=""/>';
				yongjinxiaofei+='<button onclick="click_yanzmtixian();" class="cgbutton cgbuttontixian" type="button">获取验证码</button>';
				yongjinxiaofei+='</div>';
				yongjinxiaofei+='<div class="payaddSubmit">';
				yongjinxiaofei+='<a class="payaddbutton submic_button" href="javascript:PostModifytixian();">提交申请</a>';
				yongjinxiaofei+='<input id="pay_id" type="hidden" name="id" value=""/>';
				yongjinxiaofei+='<a style="background: #333;" class="payaddbutton" href="javascript:remotixianBox();">关闭</a>';
				yongjinxiaofei+='</div>';
				yongjinxiaofei+='</div>';
				yongjinxiaofei+='</div>';
				
				//提现申请 结构结束
				
			//转账申请结构开始
			yongjinxiaofei+='<div style="display:none" class="addpayBox zhuanzhanBox">';
			yongjinxiaofei+='<div class="addInput">';
			yongjinxiaofei+='<div class="input_pay"><span>可提佣金：</span><font class="color">'+remain+'</font> 元</div>';
			yongjinxiaofei+='<div class="input_pay"><span>转账金额：<input  class="form-control payinput zhuanzha_monir" type="text" placeholder="请输入转账金额" name="payuser" value=""/></div>';
			yongjinxiaofei+='<div class="payaddSubmit">';
			yongjinxiaofei+='<a class="payaddbutton submic_button" href="javascript:zhuanzhanPost();">确认转账</a>';
			yongjinxiaofei+='<a style="background: #333;" class="payaddbutton" href="javascript:zhuanzhanhide();">关闭</a>';
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='</div>';
			//转账申请结构结束

			yongjinxiaofei+='<div class="souso_box">';
			yongjinxiaofei+='<div class="sousuo_left">';

			if(sort=='all'){
				yongjinxiaofei+='<a class="hover_boder" onclick="yongjinxiaofei(page,pageSize,\'all\');">全部</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'today\');">今天</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'week\');">本周</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'month\');">本月</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'three_months\');">最近三个月</a>';
			}
			
			if(sort=='today'){
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'all\');">全部</a>';
				yongjinxiaofei+='<a class="hover_boder" onclick="yongjinxiaofei(page,pageSize,\'today\');">今天</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'week\');">本周</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'month\');">本月</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'three_months\');">最近三个月</a>';
			}

			if(sort=='week'){
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'all\');">全部</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'today\');">今天</a>';
				yongjinxiaofei+='<a class="hover_boder" onclick="yongjinxiaofei(page,pageSize,\'week\');">本周</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'month\');">本月</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'three_months\');">最近三个月</a>';
			}

			if(sort=='month'){
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'all\');">全部</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'today\');">今天</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'week\');">本周</a>';
				yongjinxiaofei+='<a class="hover_boder" onclick="yongjinxiaofei(page,pageSize,\'month\');">本月</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'three_months\');">最近三个月</a>';
			}

			if(sort=='three_months'){
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'all\');">全部</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'today\');">今天</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'week\');">本周</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'month\');">本月</a>';
				yongjinxiaofei+='<a class="hover_boder" onclick="yongjinxiaofei(page,pageSize,\'three_months\');">最近三个月</a>';
			}
			
			 
			 
			yongjinxiaofei+='</div>';
			
			yongjinxiaofei+='<div class="sousuo_right">';
			yongjinxiaofei+='<div class="demo1">';
			
			yongjinxiaofei+='<input placeholder="开始时间" onclick="laydate()" type="text" id="Jxl">&nbsp;至&nbsp;';
			yongjinxiaofei+='<input placeholder="结束时间" onclick="laydate()" type="text" id="Jxl2">';
  
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='<a href="javascript:sousuo();">搜索</a>';
			yongjinxiaofei+='</div>';
			
			
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='<div class="main_center">';
			yongjinxiaofei+='<p style="width: 100%;height: 50px;line-height: 50px;text-align:center;color: #666;">暂时没有内容哦！</p>';
			yongjinxiaofei+='</div>';
			$('.user_business_list').html(yongjinxiaofei);//改变dom
				return false;

			}

			pageNumxf	  =	data['list']['count'];//总页数;
			
			glo_pageNumxf=pageNumxf;//赋值给全局变量
		
			yongjinxiaofei+='<div class="yongjin_list">';
			yongjinxiaofei+='<div class="yongjin_text">';
			yongjinxiaofei+='<p class="xiaofei_text">累计获得佣金<span id="sumcommission" class="color">0.00</span>元</p>';
			yongjinxiaofei+='<p class="xiaofei_text">累计提现银行卡<span id="withdraw_bank" class="color">0.00</span>元</p>';
			yongjinxiaofei+='<p class="xiaofei_text">累计转账到账<span id="withdraw_user" class="color">0.00</span>元</p>';
			yongjinxiaofei+='<div class="pay_rightBubbon"><a href="javascript:showtixianBox();">提现</a><a href="javascript:zhuanzhanshow();">转账</a></div>';
			yongjinxiaofei+='</div>';
			
			
			//提现申请 结构开始
			yongjinxiaofei+='<div style="display:none" class="addpayBox tixianshen">';
			yongjinxiaofei+='<div class="addInput">';
			yongjinxiaofei+='<div class="input_pay"><span>可提佣金：</span><font class="color">'+remain+'</font> 元</div>';
			yongjinxiaofei+='<div class="input_pay"><span>银行账户：';
			yongjinxiaofei+='<select id="yinhangka" class="form-control payinput bank_name">';
			$.each(payList, function(k,v) {
				var bank_name = payList[k]['bank_name'];//银行名称
				var bank_code = payList[k]['bank_code'];//银行账户
				var id = payList[k]['id'];//银行卡id
				yongjinxiaofei+='<option value="'+id+'">'+bank_name+'-'+bank_code+'</option>';
			});
			
			yongjinxiaofei+='</select>';
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='<div class="input_pay"><span>提现金额：</span><input  class="form-control payinput bank_monir" type="text" placeholder="请输入提现金额 必须为整数" name="payuser" value=""/></div>';
			yongjinxiaofei+='<div class="input_pay"><span>验证码：&nbsp;&nbsp;&nbsp;&nbsp;</span><input  style="width: 25%;" class="form-control payinput" type="text" placeholder="手机验证码" name="payuser" value=""/>';
			yongjinxiaofei+='<button onclick="click_yanzmtixian();" class="cgbutton cgbuttontixian" type="button">获取验证码</button>';
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='<div class="payaddSubmit">';
			yongjinxiaofei+='<a class="payaddbutton submic_button" href="javascript:PostModifytixian();">提交申请</a>';
			yongjinxiaofei+='<input id="pay_id" type="hidden" name="id" value=""/>';
			yongjinxiaofei+='<a style="background: #333;" class="payaddbutton" href="javascript:remotixianBox();">关闭</a>';
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='</div>';
			
			//提现申请 结构结束
			
			//转账申请结构开始
			yongjinxiaofei+='<div style="display:none" class="addpayBox zhuanzhanBox">';
			yongjinxiaofei+='<div class="addInput">';
			yongjinxiaofei+='<div class="input_pay"><span>可提佣金：</span><font class="color">'+remain+'</font> 元</div>';
			yongjinxiaofei+='<div class="input_pay"><span>转账金额：<input  class="form-control payinput zhuanzha_monir" type="text" placeholder="请输入转账金额" name="payuser" value=""/></div>';
			yongjinxiaofei+='<div class="payaddSubmit">';
			yongjinxiaofei+='<a class="payaddbutton submic_button" href="javascript:zhuanzhanPost();">确认转账</a>';
			yongjinxiaofei+='<a style="background: #333;" class="payaddbutton" href="javascript:zhuanzhanhide();">关闭</a>';
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='</div>';
			//转账申请结构结束

			yongjinxiaofei+='<div class="souso_box">';
			yongjinxiaofei+='<div class="sousuo_left">';
			
			 
			if(sort=='all'){
				yongjinxiaofei+='<a class="hover_boder" onclick="yongjinxiaofei(page,pageSize,\'all\');">全部</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'today\');">今天</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'week\');">本周</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'month\');">本月</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'three_months\');">最近三个月</a>';
			}
			
			if(sort=='today'){
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'all\');">全部</a>';
				yongjinxiaofei+='<a class="hover_boder" onclick="yongjinxiaofei(page,pageSize,\'today\');">今天</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'week\');">本周</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'month\');">本月</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'three_months\');">最近三个月</a>';
			}

			if(sort=='week'){
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'all\');">全部</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'today\');">今天</a>';
				yongjinxiaofei+='<a class="hover_boder" onclick="yongjinxiaofei(page,pageSize,\'week\');">本周</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'month\');">本月</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'three_months\');">最近三个月</a>';
			}

			if(sort=='month'){
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'all\');">全部</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'today\');">今天</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'week\');">本周</a>';
				yongjinxiaofei+='<a class="hover_boder" onclick="yongjinxiaofei(page,pageSize,\'month\');">本月</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'three_months\');">最近三个月</a>';
			}

			if(sort=='three_months'){
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'all\');">全部</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'today\');">今天</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'week\');">本周</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'month\');">本月</a>';
				yongjinxiaofei+='<a class="hover_boder" onclick="yongjinxiaofei(page,pageSize,\'three_months\');">最近三个月</a>';
			}
			 
			if(sort=='time'){
				yongjinxiaofei+='<a class="hover_boder" onclick="yongjinxiaofei(page,pageSize,\'all\');">全部</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'today\');">今天</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'week\');">本周</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'month\');">本月</a>';
				yongjinxiaofei+='<a onclick="yongjinxiaofei(page,pageSize,\'three_months\');">最近三个月</a>';
			} 

			yongjinxiaofei+='</div>';
			
			yongjinxiaofei+='<div class="sousuo_right">';
			yongjinxiaofei+='<div class="demo1">';
			
			yongjinxiaofei+='<input placeholder="开始时间" onclick="laydate()" type="text" id="Jxl">&nbsp;至&nbsp;';
			yongjinxiaofei+='<input placeholder="结束时间" onclick="laydate()" type="text" id="Jxl2">';
  
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='<a href="javascript:sousuo();">搜索</a>';
			yongjinxiaofei+='</div>';
			
			
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='<div class="main_center">';
			yongjinxiaofei+='<table class="table table-hover">';
			
			yongjinxiaofei+='<th>消费方式</th>';
			yongjinxiaofei+='<th>消费状况</th>';
			yongjinxiaofei+='<th>消费金额(元)</th>';
			yongjinxiaofei+='<th>消费时间</th>';
			yongjinxiaofei+='<th>流水号</th>';
			//循环开始
			$.each(list, function(k,v) {
				var bank_id = list[k]['bank_id'];//银行卡
				if(bank_id==0){
					bank_id='提现银行卡';
				}else{
					bank_id='充值到账'
				}
				var consumption_status = list[k]['consumption_status'];//银行卡
				if(consumption_status==0){
					consumption_status='未到账';
				}else if(consumption_status==1){
					consumption_status='已到账';
				}else if(consumption_status==2){
					consumption_status='未通过';
				}
				var consumption_money = list[k]['consumption_money'];//消费金额
				var addtime 		  = list[k]['addtime'];//消费时间
				var seriall_number 	  = list[k]['seriall_number'];//流水号
				
				var timestamp_3 = addtime;
				var newDate_3 = new Date();
				newDate_3.setTime(timestamp_3 * 1000);
				var newLottery_time_3=newDate_3.format('yyyy-MM-dd hh:mm:ss');



				yongjinxiaofei+='<tr>';
				yongjinxiaofei+='<td>'+bank_id+'</td>';
				yongjinxiaofei+='<td>'+consumption_status+'</td>';
				yongjinxiaofei+='<td>'+consumption_money+'</td>';
				yongjinxiaofei+='<td>'+newLottery_time_3+'</td>';
				yongjinxiaofei+='<td>'+seriall_number+'</td>';
				yongjinxiaofei+='</tr>';
			});
			yongjinxiaofei+='</table>';
			
			yongjinxiaofei+='<nav id="xiaofei_page" class="text-center page page_click">';
			yongjinxiaofei+='<ul class="pagination clearfix">';
			yongjinxiaofei+='<li><a onclick="reducepagexiaofei();" href="javascript:;">';
			yongjinxiaofei+='<span class="glyphicon glyphicon-chevron-left"></span>上一页</a>';
			yongjinxiaofei+='</li>';
			//class="active" 选中	
		//判断当总页数大于6页的时候 只显示前6页
	
			for (var i = 0; i < glo_pageNumxf; i++) {

		 		if(i==page){//当前页设置选中效果
					yongjinxiaofei+='<li class="active">';
					yongjinxiaofei+='<a class="pageBtnNum2" href="javascript:yongjinxiaofei('+(i)+','+pageSize+');">'+(i+1)+'</a>';
					yongjinxiaofei+='</li>';
				}else{
					//不选中
					yongjinxiaofei+='<li>';
					yongjinxiaofei+='<a class="pageBtnNum2" href="javascript:yongjinxiaofei('+(i)+','+pageSize+');">'+(i+1)+'</a>';
					yongjinxiaofei+='</li>';
				}
	 		}


	  /*		
	  for (var i = 0; i < glo_pageNumxf; i++) {
			if(page>2 && page<=(glo_pageNumxf-4)){
				var	c1=page+5
				for(c=page;c<c1;c++){
					if(c==page){//当前页设置选中效果
					yongjinxiaofei+='<li class="active">';
					yongjinxiaofei+='<a class="pageBtnNum2" href="javascript:;">'+(c+1)+'</a>';
					yongjinxiaofei+='</li>';
						}else{
					//不选中
					yongjinxiaofei+='<li>';
					yongjinxiaofei+='<a class="pageBtnNum2" href="javascript:;">'+(c+1)+'</a>';
					yongjinxiaofei+='</li>';
						}
							
				}	
					break;
			}else if(page>(glo_pageNumxf-4)){

				for(d=(glo_pageNumxf-4);d<=glo_pageNumxf-1;d++){
						if(d==page){//当前页设置选中效果
							yongjinxiaofei+='<li class="active">';
							yongjinxiaofei+='<a class="pageBtnNum2" href="javascript:;">'+(d+1)+'</a>';
							yongjinxiaofei+='</li>';
						}else{
							//不选中
							yongjinxiaofei+='<li>';
							yongjinxiaofei+='<a dlass="pageBtnNum2" href="javascript:;">'+(d+1)+'</a>';
							yongjinxiaofei+='</li>';
						}

				}
				break;
			}else{
				if(i==page){//当前页设置选中效果
					yongjinxiaofei+='<li class="active">';
					yongjinxiaofei+='<a class="pageBtnNum2" href="javascript:;">'+(i+1)+'</a>';
					yongjinxiaofei+='</li>';
				}else{
					//不选中
					yongjinxiaofei+='<li>';
					yongjinxiaofei+='<a class="pageBtnNum2" href="javascript:;">'+(i+1)+'</a>';
					yongjinxiaofei+='</li>';
				}
					if(i>=4){
						break;
					}
				}
			}*/
			yongjinxiaofei+='<li><a onclick="addpagexiaofei();" href="javascript:;">';
			yongjinxiaofei+='<span class="glyphicon glyphicon-chevron-right"></span>';
			yongjinxiaofei+='下一页</a></li>';
			yongjinxiaofei+='</ul>';
			yongjinxiaofei+='<div class="count-box">';
			yongjinxiaofei+='<div class="count-num">共<em id="pageCountxiaofei"></em>页</div></div></nav>';

			yongjinxiaofei+='<font class="h4color">规则说明：</font>';
			yongjinxiaofei+='<div class="jieshao_text">';
			yongjinxiaofei+='<p>1、佣金转账到帐号，只需整数即可转账，无需审核</p>';
			yongjinxiaofei+='<p>2、佣金提现到银行卡，需满100元才可以提现，需要等待审核（审核时间10~15个工作日）</p>';
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='</div>';
			yongjinxiaofei+='</div>';
			
			if(!glo_pageNumxf){
					$('#xiaofei_page').hide();	
			}


			$('.user_business_list').html(yongjinxiaofei);//改变dom
			if(glo_pageNumxf==1){
				$('#xiaofei_page').hide();
			}
			$('#pageCountxiaofei').text(glo_pageNumxf);//总页数
			$('#sumcommission').text(sumcommission);
			$('#withdraw_bank').text(withdraw_bank);
			$('#withdraw_user').text(withdraw_user);
			if(!glo_pageNumxf){
					
					$('.page_click').hide();
			}
		}
	});

}

//function transdate(endTime){
//var date=new Date();
//date.setFullYear(endTime.substring(0,4));
//date.setMonth(endTime.substring(5,7)-1);
//date.setDate(endTime.substring(8,10));
//date.setHours(endTime.substring(11,13));
//date.setMinutes(endTime.substring(14,16));
//date.setSeconds(endTime.substring(17,19));
//return Date.parse(date)/1000;
//} 
//按时间搜索
function sousuo(){
	var Jxl = $('#Jxl').val();
	var Jxl2 = $('#Jxl2').val();
	var time_Jxl = Date.parse(new Date(Jxl));
	var time_Jxl2 = Date.parse(new Date(Jxl2));
	var new_time = Date.parse(new Date());
	
	if(time_Jxl> new_time || time_Jxl2> new_time){
		tanchuan_0('时间选择错误','error');
		return;
	}
	if(time_Jxl > time_Jxl2)
	{
		tanchuan_0('时间选择错误','error');
		return;
	}
	yongjinxiaofei(page,pageSize,'time',Jxl,Jxl2);
}

//隐藏转账输入 结构
function zhuanzhanhide(){
	$('.zhuanzhanBox').hide();

}
//显示转账输入 结构
function zhuanzhanshow(){
	remotixianBox();
	$('.zhuanzhanBox').show();
	
}

//确认转账
function zhuanzhanPost(){
	var zhuanzha_monir = $('.zhuanzha_monir').val();//转账金额
	
	if(zhuanzha_monir==''){
		tanchuan_0('转账金额不能为空','error');
		 return;
	}
	if(zhuanzha_monir<0){
		tanchuan_0('转账金额不能小于0','error');
		 return;
	}

	if(!isNaN(zhuanzha_monir)){
		$.ajax({
			type:"post",
			url:ajaxUrl+"/Home/Commission/bring_forward",
			data:{
				user_token:user_token,
				consumption_money:zhuanzha_monir
			},
			dataType:'json',
			success:function(data){
				var info = data['info'];
				if(data['code']==200){
					tanchuan_0(''+info+'','success');
				}else{
					tanchuan_0(''+info+'','error');
				}
			}
		});
	}else{
		tanchuan_0('转账金额必须是数字','error');
	}
}

function SetRemainTime2() {
            if (curCount == 0) {                
                window.clearInterval(InterValObj);
                $(".cgbuttontixian").removeAttr("disabled");
                $(".cgbuttontixian").text("重新发送");
                $(".cgbuttontixian").css({'background':'#ff4800'});
            }
            else {
                curCount--;
                $(".cgbuttontixian").css({'background':'#A0A0A0'});
                $(".cgbuttontixian").text(curCount + "秒内重发");
                
            }
}

//发送验提现验证码
function click_yanzmtixian(){
	var bank_monir = $('.bank_monir').val();//提现佣金
	if(bank_monir==''){
		tanchuan_0('请输入完整信息','error');
		return;
	}

	$.ajax({
		type:'post',
		url:ajaxUrl+'/Home/Verify/getVerify',
		data:{
			user_token:user_token,
			cellphone:userMobile,
			type:7
		},
		dataType:'json',
		success:function(data){
			if(data['code']!=200){
				tanchuan_0(data['info'],'error','确定');
				return false;
			}else{
				tanchuan_0('验证码已发送至-'+userMobile+'','success','确定');
				 curCount = count;
			     $(".cgbuttontixian").attr("disabled", "true");
			     $(".cgbuttontixian").text(curCount + "秒内重发");
			     InterValObj = window.setInterval(SetRemainTime2, 1000); //启动计时器，1秒执行一次
			}
		}

	});
}





//提现申请
function PostModifytixian(){
	var bank_code = $('.bank_code').val();//银行账号
	var bank_monir = $('.bank_monir').val();//提现佣金
	var bank_id = $('.bank_name').find("option:selected").val();
	var payinput = $('.payinput').val();//验证码
	if(bank_code!='' || bank_monir!=''){
		$.ajax({
			type:"post",
			url:ajaxUrl+"/Home/Commission/transfer_accounts",
			data:{
				user_token:user_token,
				consumption_money:parseInt(bank_monir),
				bank_id:bank_id,
				code:payinput,
				type:7
			},
			dataType:'json',
			success:function(data){
				var info = data['info'];
				if(data['code']==200){
					tanchuan_0('申请成功','success');
				}else{
					tanchuan_0(''+info+'','error');
				}
				
			}
		});
	}else{
		tanchuan_0('请输入完整内容','error');
		return false;
	}
}
//显示提现申请
function showtixianBox(){
	zhuanzhanhide();
	$('.tixianshen').show();
}
//关闭提现申请
function remotixianBox(){
	$('.tixianshen').hide();
}
//佣金消费下一页
var s=0;
function addpagexiaofei(){
	s++;
	if(s>(glo_pageNumxf-1)){
		s=glo_pageNumxf-1;
		return false;
	}
	yongjinxiaofei(s,pageSize);
}

//佣金消费上一页
function reducepagexiaofei(){
	s--;
	if(s<0){
		s=0;
		return false;
	}
	yongjinxiaofei(s,pageSize);
}
//我的银行卡
function yinghanka(){
	var payMoren;
	var payNum;//当前银行卡的总张数
	var yinghanka = '';//结构变量
	$.ajax({
		type:"post",
		url:ajaxUrl+"/Home/Commission/member_banks",
		data:{
			user_token:user_token
		},
		beforeSend:function(){
			$('.loading').show();
			$('.loading').html('<img src="images/loding.gif"/><br/>正在加载中...');
		},
		dataType:'json',
		success:function(data){
			$('.loading').hide();
			yinghanka+='<div class="pay_list yongjin_list">';
			yinghanka+='<div class="yongjin_text">';
			yinghanka+='<p style="width:100%">您已绑定<span class="color payNum">0</span>张银行卡，还可以绑定<span class="color payMoren">3</span>张银行卡</p>';
			yinghanka+='</div>';
			yinghanka+='<div class="pay_box">';
			
			$('.loading').hide();
			var list = data['list'];
			payNum=data['count'];
			
			payList=list;//把银行卡 数组 赋值给全局变量
			if(payNum){
				payMoren=3-payNum;
			}else{
				payMoren=3;
			}
			$.each(list, function(k,v) {
				var bank_name = list[k]['bank_name'];//银行名称
				var bank_code = list[k]['bank_code'];//银行账户
				var id 		  = list[k]['id'];//银行卡id
				yinghanka+='<div class="pay_main">';
				yinghanka+='<a class="remoPay icon-remove" href="javascript:remoPay('+id+');"></a>';
				yinghanka+='<div class="pay_img">';

				if(bank_name.indexOf('招商银行')!=-1){
					yinghanka+='<img src="images/user/zhaoshan.png" />';
				}else if(bank_name.indexOf('工商银行')!=-1){
					yinghanka+='<img style="margin-top:8px;" src="images/user/gongshan.png" />';
				}else if(bank_name.indexOf('建设银行')!=-1){
					yinghanka+='<img style="margin-top:8px;" src="images/user/jianshen.png" />';
				}else if(bank_name.indexOf('农业银行')!=-1){
					yinghanka+='<img style="margin-top:8px;" src="images/user/nongye.png" />';
				}
				
				yinghanka+='</div>';
				yinghanka+='<p>'+bank_code+'</p>';
				yinghanka+='<div class="xiugai_pay">';
				yinghanka+='<a href="javascript:Modify('+k+');">修改</a>';
				yinghanka+='</div>';
				yinghanka+='</div>';
			});
			yinghanka+='<div class="pay_main addPay">';
			yinghanka+='<a href="javascript:addpayBox();"><i class="glyphicon glyphicon-plus"></i>添加银行卡</a>';
			yinghanka+='</div>';
			yinghanka+='</div>';
			yinghanka+='</div>';
			
			yinghanka+='<div style="display:none" class="addpayBox">';
			yinghanka+='<p>为确保您申请的金额能够正确无误的转入您的账户，请填写真实有效的账户信息，以下信息均为必填项！</p>';
			yinghanka+='<div class="addInput">';
			yinghanka+='<div class="input_pay"><span>开户姓名：</span><input class="form-control payinput account_name" type="text" placeholder="请输入开户姓名" name="payuser" value=""/></div>';
			yinghanka+='<div class="input_pay"><span>开户银行：</span>';
			yinghanka+='<select id="yinhangka" class="form-control payinput bank_name">';
			yinghanka+='<option>招商银行 </option>';
			yinghanka+='<option>农业银行 </option>';
			yinghanka+='<option>工商银行 </option>';
			yinghanka+='<option>建设银行 </option>';
			yinghanka+='</select>';
			yinghanka+='</div>';
							
			yinghanka+='<div class="input_pay"><span>银行账户：</span><input  class="form-control payinput bank_code" type="text" maxlength="20" placeholder="请输入银行账户" name="payuser" value=""/></div>';
							
			yinghanka+='<div class="input_pay"><span>开户支行：</span><input  class="form-control payinput sub_branch" type="text" placeholder="请输入开户支行" name="payuser" value=""/></div>';
							
			yinghanka+='<div class="input_pay"><span>验证码：&nbsp;&nbsp;&nbsp;&nbsp;</span><input  style="width: 25%;" class="form-control payinput" type="text" placeholder="请输入验证码" name="payuser" value=""/>';
			yinghanka+='<button onclick="click_yanzm();" class="cgbutton" type="button">获取验证码</button>';
			yinghanka+='</div>';
			yinghanka+='<div class="payaddSubmit">';
			yinghanka+='<a class="payaddbutton submic_button" href="javascript:PostModify();">提交</a>';
			yinghanka+='<input id="pay_id" type="hidden" name="id" value=""/>';
			
			yinghanka+='<a style="background: #ff6c00;" class="payaddbutton" href="javascript:remoAddinput();">返回</a>';
			yinghanka+='</div>';
			yinghanka+='</div>';
			yinghanka+='</div>';

			$('.user_business_list').html(yinghanka);//改变dom
			$('.payMoren').text(payMoren);
			$('.payNum').text(payNum);
			if(payNum>=3){
				$('.addPay').hide();
			}
		}
	});	
}

	

//显示添加银行卡
function addpayBox(){
	remoAddinput();
	$('#pay_id').val('');
	$('.account_name').val('');
	$('.bank_code').val('');
	$('.bank_name').find("option:selected").text();
	$('.sub_branch').val('');
	$('.addpayBox').slideDown();
}


//隐藏添加银行表单
function remoAddinput(){
	$('.addpayBox').slideUp();//隐藏
}

//修改银行卡 信息
function Modify(k){
		state=0; 
		var id			 = payList[k]['id'];//名字
		var account_name = payList[k]['account_name'];//名字
		var bank_name    = payList[k]['bank_name'];//银行名称
		var bank_code    = payList[k]['bank_code'];//银行卡号
		var sub_branch   = payList[k]['sub_branch'];//开户支行
		$('.account_name').val(account_name);
		$('.bank_name').find("option:selected").text(bank_name);
	
		$('.bank_code').val(bank_code);

		$('.sub_branch').val(sub_branch);
		$('.addpayBox').slideDown();
		$('#pay_id').val(id);//保存银行卡id
}

function SetRemainTime() {
            if (curCount == 0) {                
                window.clearInterval(InterValObj);
                $(".cgbutton").removeAttr("disabled");
                $(".cgbutton").text("重新发送");
                $(".cgbutton").css({'background':'#ff4800'});
            }
            else {
                curCount--;
                $(".cgbutton").css({'background':'#A0A0A0'});
                $(".cgbutton").text(curCount + "秒内重发");
                
            }
}
//发送验证码
function click_yanzm(){
	var account_name = $('.account_name').val();//名字
	var bank_code    = $('.bank_code').val();//银行卡号
	var sub_branch   = $('.sub_branch').val();//开户支行
	var bank_name    = $('.bank_name').val();//银行名称
	if(account_name=='' || bank_code=='' || sub_branch=='' || bank_name==''){
		tanchuan_0('请输入完成信息','error');
		return;
	}

	$.ajax({
		type:'post',
		url:ajaxUrl+'/Home/Verify/getVerify',
		data:{
			user_token:user_token,
			cellphone:userMobile,
			type:8
		},
		dataType:'json',
		success:function(data){
			if(data['code']!=200){
				tanchuan_0(data['info'],'error','确定');
				return false;
			}else{
				tanchuan_0('验证码已发送至-'+userMobile+'','success','确定');
				 curCount = count;
			     $(".cgbutton").attr("disabled", "true");
			     $(".cgbutton").text(curCount + "秒内重发");
			     InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
			}
		}

	});
}

//添加银行卡
function PostModify(){
	var type = 8;
	if(state==0){
		var id = $('#pay_id').val();//银行卡id
		type=9;
	}

	var account_name = $('.account_name').val();//名字
	var bank_code    = $('.bank_code').val();//银行卡号
	var sub_branch   = $('.sub_branch').val();//开户支行
	var bank_name    = $('.bank_name').val();//银行名称
	var payinput     = $('.payinput').val();//验证码
	


	if(account_name=='' || bank_code=='' || sub_branch=='' || bank_name==''){
		tanchuan_0('请输入完成信息','error');
		return;
	}else if(payinput==''){
		tanchuan_0('验证码不能为空','error');
		return;
	}else if(isNaN(bank_code)){
		tanchuan_0('银行账户必须是数字','error');
		return;
	}else{
		$.ajax({
			type:"post",
			url:ajaxUrl+"/Home/Commission/member_banksEdit",
			data:{
				account_name:account_name,
				id:id,
				bank_name:bank_name,
				bank_code:bank_code,
				sub_branch:sub_branch,
				user_token:user_token,
				code:payinput,
				type:type
			},
			dataType:'json',
			success:function(data){
				var info = data['info'];
				if(data['code']==200){
					tanchuan_0('成功','success');
					$('.addpayBox').hide();
					yinghanka();
				}else{
					tanchuan_0(''+info+'','error');
					return;
				}
			}
		});
	}
}


//删除银行卡
function remoPay(id){
	swal({
		  title: "温馨提示",
		  text: "<span class='text-danger'>您确定要删除此银行卡吗？</span>",
		  type: "warning",
		  html:true,
		  showCancelButton: true,
		  confirmButtonColor: "#ff4800",
		  confirmButtonText:"确定",
		  cancelButtonText:"取消",
		  //confirmButtonText: "确定删除!",
		  closeOnConfirm: false
		},function(){
			$.ajax({
		type:"post",
		url:ajaxUrl+"/Home/Commission/member_banksdel",
		data:{
			id:id,
			user_token:user_token
		},
		dataType:'json',
		success:function(data){
			if(data['code']==200){
				tanchuan_0('成功','success');
					yinghanka();
			}else{
				tanchuan_0('删除失败','error');
			}
		}
	});
			
  });
}

//弹窗
function tanchuan_0(font,star){
	swal({
			title: "",
			text: font,
			html: true,
			type: star,
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
}
