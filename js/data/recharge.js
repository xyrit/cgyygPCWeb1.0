// 账户余额充值
var userId = $.cookie('userId');
var nickname = $.cookie('nickname');
var userMobile = $.cookie('userMobile');
var user_token = $.cookie('user_token');

if(typeof(user_token) == "undefined"){
   /*$("#nologin").html('<p class="margin-t-b-40">您还没有登录，请您点这里去<a href="login.html" class="text-danger">登陆或者注册</a>后进行充值</p>');*/
   $("#readyLogin1").hide();
   $("#readyLogin2").hide();
   $("#surePayforBtn").hide();
	window.location.href='login.html';

   /*swal({
		title: "",
		text: '您还没有登录！',
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
   
   
}
//已经登录才执行
else{
	
	
		var payType_true=0;
		$(".pay-btn-a").click(function(){
			$(this).addClass("active").parent().siblings().children().removeClass("active");
			var payBtnContent=$(this).text();
			if(payBtnContent=='微信支付'){
				$(this).attr("data-pay","weixin").parent().siblings().children().removeAttr("data-pay");
				payType_true=1;
				$("#payTip").html("使用微信支付");
				}
			if(payBtnContent=='支付宝支付'){
				$(this).attr("data-pay","zhifubao").parent().siblings().children().removeAttr("data-pay");
				 payType_true=2;
				 $("#payTip").html("使用支付宝支付");
				}	
			
		});
		
		//$(".rechargeSpan").first().addClass("rech_active");
		//var money_num=$(".rechargeSpan").first().text();
		//选择充值面额
		var money_num='';
		//定义一个充值数额的变量，当只选择充值面额时，值就是选择面额的值，当输入充值面额时，值就是  输入的值
		var GloMoney;
		$(".rechargeSpan").click(function(){
			$(this).addClass("rech_active").parent().siblings().children().removeClass("rech_active");
			var money_num2=$(this).text();
			var money_num3=parseInt(money_num2.replace(/[^0-9]/ig,""));//提取字符串中的数字
			money_num=money_num3;
			//清空输入其他金额的值
			$("#otherMoney").val('');
			
		});
		//定义输入其他金额的值的变量
		var otherMoney;
		//页面加载初始化输入框的值
		$("#otherMoney").val('');
		$("#otherMoney").focus(function(){
			$(".rechargeSpan").removeClass("rech_active");
			$(".rechargeSpan2").css("border-color","#ff4800");
			//当点击输入其他金额后，选择充值面额的赋值为空
			money_num='';

		});
		$("#otherMoney").blur(function(){
			/*var otherMoneyValue=$(this).val();
			var regVerifyNum_find=/^(0|[1-9][0-9]*)$/;//非0开头的数字
			if(!(regVerifyNum_find.test(otherMoneyValue))){
				swal({
					title: "",
					text: '请输入正确的充值数额。',
					html: true,
					type: "error",
					confirmButtonText:"确定",
					confirmButtonColor: "#ff4800",
				}); 
				
				$(this).val("");
				return;
			 }*/
			$(".rechargeSpan2").css("border-color","#ccc");
			
		});
		/*var glo_WIDout_trade_no;
		var	glo_WIDsubject;
		var	glo_WIDtotal_fee;
		var	glo_WIDre_url;
		var	glo_WIDno_url;
		var glo_url;*/
		$("#surePayforBtn").click(function(){
			var otherMoney2=$("#otherMoney").val();//输入其他金额的值
			otherMoney=otherMoney2;
			var regVerifyNum_find=/^(0|[1-9][0-9]*)$/;//非0开头的数字
			//alert(otherMoney);
			if(money_num==''&&otherMoney==''){
				 swal({
					  title: "",
					  text: '请选择或输入充值金额，请输入1-10000的正整数！',
					  html: true,
					  type: "error",
					  confirmButtonText:"确定",
					  confirmButtonColor: "#ff4800",
				  }); 
				  
			}else if(otherMoney=='0'){
				swal({
					  title: "",
					  text: '输入充值金额不能为0，请输入1-10000的正整数！',
					  html: true,
					  type: "error",
					  confirmButtonText:"确定",
					  confirmButtonColor: "#ff4800",
				  }); 
			}else if((parseInt(otherMoney)>10000)||(parseInt(otherMoney)<0)){
				  swal({
					  title: "",
					  text: '请输入1-10000的正整数！',
					  html: true,
					  type: "error",
					  confirmButtonText:"确定",
					  confirmButtonColor: "#ff4800",
				  }); 
				  $("#otherMoney").val("");
				}
			
			else{
				 if(otherMoney==''){
					GloMoney=money_num;
				 }
				 else{
					 if(!(regVerifyNum_find.test(otherMoney))){
						  swal({
							title: "",
							text: '请输入1-10000的正整数！',
							html: true,
							type: "error",
							confirmButtonText:"确定",
							confirmButtonColor: "#ff4800",
						}); 
						$("#otherMoney").val("");
						return;
					  }
					 GloMoney=otherMoney;
					 }
				//alert(money_num+'...'+otherMoney);
				if(typeof(user_token) == "undefined"){
					  
						swal({
							title: "",
							text: '请登录后再操作！',
							html: true,
							type: "error",
							confirmButtonText:"确定",
							confirmButtonColor: "#ff4800",
						});
						return;
							
					}else{
						
						  $.ajax({
							  type:'post',
							  url:''+ajaxUrl+'/Home/ucenter/recharge',
							  dataType:'json',	
							  data:{
								   //还需要传的字段 money  payMoney   balance  payType  attendDevice
								  user_token:user_token,
								  money:GloMoney,
								  charge_type:1, //1微信,2支付宝,3储蓄卡,4信用卡
								  
								  },
							  success: function(data){
								  var code=data['code'];
								  var info=data['info'];
								  //var charge_token=data['pay_token'];
								  
								  if(code!=200){
										swal({
											title: "",
											text: ''+info+'！',
											html: true,
											type: "error",
											confirmButtonText:"确定",
											confirmButtonColor: "#ff4800",
										});
										if(code==517){
											swal({
												title: "",
												text: ''+info+'！，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
												html: true,
												type: "error",
												confirmButtonText:"确定",
												confirmButtonColor: "#ff4800",
											},function(){
												//设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
												setTimeout(function(){
												  window.location.href="login.html"
												}, 500);
											});
											
										}
										return;
									}
									else{
										/*swal({
											title: "",
											text: ''+info+'！',
											html: true,
											type: "success",
											confirmButtonText:"确定",
											confirmButtonColor: "#ff4800",
										});*/
										
										var charge_token=data['charge_token'];
										
										location.href = ''+ajaxUrl+'/Home/YunPay/charge?charge_token='+charge_token+'';
									}
							  },error: function(){
								   swal({
										title: "",
										text: '操作失败！<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
										html: true,
										type: "error",
										confirmButtonText:"确定",
										confirmButtonColor: "#ff4800",
									}); 
							  }
						});
				}
			}
		});
}		
