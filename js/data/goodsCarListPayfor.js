// *****支付列表*****//
function GetQueryString(data)//获取地址栏传过来参数
{
     var reg = new RegExp("(^|&)"+ data +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


//获取地址栏传过来参数
var id = GetQueryString("id");//获取订单列表传递过来的选中的ID值
var newData;//定义一个变量存储获取到的data对象；
var totalMoney;//应支付总金额
var glo_account;//账户余额
var totalMoney_other;//应支付总金额(选择去其他支付方式)
var userId = $.cookie('userId');
var nickname = $.cookie('nickname');
var userMobile = $.cookie('userMobile');
var user_token = $.cookie('user_token');

//页面一进来就绘制 checkbox按钮，否则每次刷新页面 ，浏览器会记住之前的状态
$("#banceBox").prepend('<input type="checkbox" id="checkBance">');
 $.ajax({
	 type:'post',
	 url:''+ajaxUrl+'/Home/Shopcart/payFor',
	 dataType:'json',
	 data:{
		 user_token:user_token,
		 id:id
		 },
	 cache:false,
	 timeout:60000,
	 beforeSend: function(){
		 $(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
		 },
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
				return;
			}
						  
		 newData=data;//把data存储下来
		 var carInfo=data['cart']['info'];
		 var total=data['cart']['total'];
		 totalMoney=total;//应支付总金额
		 var account=data['cart']['account'];//账户余额
		 glo_account=parseFloat(account).toFixed(2);
		 var ebank=data['cart']['ebank'];//银行卡余额
		 
		 //var newId;
		 
		 var gooodsCarListPayforStr='';
		   for(i=0;i<carInfo.length;i++){
			   var id=carInfo[i]['id'];
			 //  newId+=id;
			   var title=carInfo[i]['title'];
			   var path=data['host']+carInfo[i]['path'];
			  // var marketprice=carInfo[i]['marketprice'];//市场价，此字段已不用
			   var need_count=carInfo[i]['need_count']; //市场价用总需参与人次
			   var lottery_id=carInfo[i]['lottery_id'];
			   var attend_count=carInfo[i]['attend_count']; 
			   var remain_count=carInfo[i]['remain_count']; 
			   var pid=carInfo[i]['pid'];
			   var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值
			   gooodsCarListPayforStr+='<tr>';
			   gooodsCarListPayforStr+='<td class="goods">';
			   gooodsCarListPayforStr+='<input type="hidden" id="id'+id+'">';
			   gooodsCarListPayforStr+='<a href="goods-details.html?pid='+goods_link+'" class="pull-left"><img src="'+path+'" alt=""/></a>';
               gooodsCarListPayforStr+='<a href="goods-details.html?pid='+goods_link+'"><h3>'+title+'</h3></a>';           
               gooodsCarListPayforStr+='<p class="text-gray">价值：￥<em>'+need_count+'</em></p>';  
			   gooodsCarListPayforStr+='</td>';               
               gooodsCarListPayforStr+='<td class="price text-center">'+remain_count+'</td>';                       
               gooodsCarListPayforStr+='<td class="count text-center">'+attend_count+'</td>';              
               gooodsCarListPayforStr+='<td class="subtotal text-center">'+parseFloat(attend_count).toFixed(2)+'</td>';            
               /*gooodsCarListPayforStr+='<td class="operation text-center"><span class="delete">删除</span></td>';   */            gooodsCarListPayforStr+='</tr>';        
               
		   }
		   if(carInfo.length<=0){
			    var nullStr='';
				nullStr+='<tr>'
				nullStr+='<td colspan="6"><p class="text-center margin-t-b-40">您的购物车空空如也，不如点击去<a href="index.html" class="text-danger">首页</a>看看吧</p></td>';
				nullStr+='</tr>'
				$("#gooodsCarListPayfor").html(nullStr);
			    $("#surePayforBtn").remove();
			   }else{
				   $("#gooodsCarListPayfor").html(gooodsCarListPayforStr);
				   }
		   
		   $("#priceCount").html(total);
		   $("#otherPay").html(total);
		   totalMoney_other=total;
		  // $("#banceBox").html('<label><input type="checkbox" id="checkBance">使用账户余额支付，您的余额￥<em id="account" class="text-danger">'+account+'</em></label>');
		   $("#account").html(parseInt(account));
		   
		   //如果余额为0时 禁止用户选择用余额支付
		   if(account==0){
			   $('input[id="checkBance"]').attr("disabled","disabled");
			   $('input[id="checkBance"]').attr("checked",false);
			   $("#tips").html("您的账户余额已不足，请使用以下方式支付");
			   $('input[id="checkBance"]').addClass("text-gray2");
			   $("#banceBox").addClass("text-gray2");
			   }else{
				   $('input[id="checkBance"]').attr("checked",true);
				   }
		  //实际应支付的金额
		  var payCount=totalMoney-account;
		  
		  /*if(payCount>=0){
			  
			  $("#tips").html("您的账户余额已不足，请使用以下方式支付");
			  $("#otherPay").html('￥'+total);	 
			}	*/   
		  if(payCount<0){
			  payCount=0;
			 // $("#otherPay").html('￥'+payCount);
			}

			//在这里先判断下选择框是否选中
			if($('input[id="checkBance"]:checked').length>0){
					  //如果选中了用余额显示，则显示用户的具体余额
					 // glo_account_2=glo_account;
					 $(".pay-btn-a").removeClass("active");
					 $(".pay-btn-a").attr("data-pay","zhifu");
					 $("#otherPay").html(payCount);	 
					 totalMoney_other=payCount;
					 
				}else{
					$("#otherPay").html(total);
					totalMoney_other=total;
					}
			
			//点击选择框时候判断是否选中了
			$('input[id="checkBance"]').click(function(){
	
				if($('input[id="checkBance"]:checked').length>0){
					  //如果选中了用余额显示，则显示用户的具体余额
					 // glo_account_2=glo_account;
					 $(".pay-btn-a").removeClass("active");
					 $(".pay-btn-a").attr("data-pay","zhifu");
					 $("#otherPay").html(payCount);	 
					 totalMoney_other=payCount;
					 
				}else{
					$("#otherPay").html(total);
					totalMoney_other=total;
					}
			});
			
			 
		   $(".loading").empty();
		   
		//   alert(newId);
		 },
     complete: function(){
		 $(".loading").empty();
		 },error: function(){
			 
			swal({
				title: "",
				text: '获取数据失败！<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
				html: true,
				type: "error",
				confirmButtonText:"确定",
				confirmButtonColor: "#ff4800",
			});
		  
		   
		}	 
})
//var payType=0;
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

var glo_account_3;

$("#surePayforBtn").click(function(){
	  var glo_remainMoney=totalMoney-glo_account;//存在异步的问题，点击才能相减，若余额不足时，其他诸如微信或者支付宝应付的金额	 
	  if(glo_remainMoney<0){
		  glo_remainMoney=0;
		  }
	  //未选中的情况下，用于传的用户余额字段值赋值为-1
	  var glo_account_2=-1;
	   glo_account_3=glo_account_2;
	  
	  //除了余额支付之外的  如微信或者支付宝 所要支付的金额，如果这个值大于0，则需要判断用户是否点了微信或者支付宝，点了哪个 相应的支付类型就是什么，如果值为0，则表示余额大于购买总额，当选中用余额支付时，不需要判断是否选了微信还是支付宝，支付类型是 传的是-1
	  var ying_pay=$("#otherPay").text();
	  /*if(ying_pay>0){
		  if($(".pay-btn-a").attr("data-pay")=="zhifu"){
			  swal({
					title: "",
					text: '请选择付款方式',
					html: true,
					type: "error",
					confirmButtonText:"确定",
					confirmButtonColor: "#ff4800",
				});
				return;
		  }
		  
	  }*/
	 if(ying_pay==0){
		 payType_true=0;
		 }
	  if($('input[id="checkBance"]:checked').length>0){
		  //如果选中了用余额显示，则显示用户的具体余额
		  glo_account_2=parseFloat(glo_account).toFixed(2);
		  glo_account_3=glo_account_2;
			//var payType= $(".pay-btn-a").attr("data-pay");
		
	  }
		
		 
	//解析data数据；
		var j=0;
		var postdata = new Array();
		var carInfo=newData['cart']['info'];
		
		for(i=0;i<carInfo.length;i++){
			  
			   var id=carInfo[i]['id'];
			   var title=carInfo[i]['title'];
			   var lottery_id=carInfo[i]['lottery_id'];
			   var attend_count=parseFloat(carInfo[i]['attend_count']).toFixed(2); 
			   var pid=carInfo[i]['pid'];
			   
			   postdata[j] = {id:""+id+"",lottery_id:""+lottery_id+"",pid:""+pid+"",uid:""+userId+"",attend_count:""+attend_count+"",name:""+title+""};
			   j++;
		}
		var r = "{\"list\"" + ":" + $.toJSON(postdata)+"}"
		//var post = $.toJSON(postdata); 
		//var content = $.parseJSON(post);	
		
		var payType_true_2;//去掉了选择支付宝还是微信支付的，直接在其他余额这里做判断，如果 totalMoney_other大于0，则payType_true_2=0；否则是1
		
	    if(totalMoney_other>0){
			payType_true_2=1;
			}else{
				payType_true_2=0
				}
	    $.ajax({
		    type:'post',
			url:''+ajaxUrl+'/Home/Lottery/validateAttend',
			dataType:'json',	
			data:{
				user_token:user_token,
				money:totalMoney,
				//payMoney:glo_remainMoney,
				payMoney:totalMoney_other,
				balance:glo_account_2,//不勾余额传-1，打钩，如果余额为0 传-1.不为0 传余额的值
				//payType:payType_true,//如果余额大于购买总额，则是0 当余额不够时  传1为微信，2为支付宝
				payType:payType_true_2,
				attendDevice:'PC网站',
				content:r,
				},
			success: function(data){ 
				var info=data['info'];
				var listTip=data['list'];
				if(data['code']!=200){
					var tips_2='';
					if(listTip.length==0){
						swal({
								title: "",
								text: ''+info+'！',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							});
							return;
					}else {
					  
						  for(i=0;i<listTip.length;i++){
							var tips=listTip[i]['tip'];
							   tips_2+=tips+'；';
							}	
							tips_2=tips_2.substring(0,tips_2.length-1);//去掉最后一个分号 
							 swal({
								title: "",
								text: ''+info+'：'+''+tips_2+'！',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							});
							return;
							
					   }
				  
				  }
			   var pay_token=data['pay_token'];
			 
			   if(typeof(pay_token) =='undefined'){
				   addlotteryRecord();
				   }else{
					   location.href = ''+ajaxUrl+'/Home/YunPay/payfor?pay_token='+pay_token+'';
					   } 
			  
			}
		   
	   });  
	
	    
		
});
function addlotteryRecord(){
	var glo_remainMoney=totalMoney-glo_account;//存在异步的问题，点击才能相减，若余额不足时，其他诸如微信或者支付宝应付的金额	 
	if(glo_remainMoney<0){
	  glo_remainMoney=0;
	  }
	//var glo_account_2=-1;
	//解析data数据；
		var j=0;
		var postdata = new Array();
		var carInfo=newData['cart']['info'];
		
		for(i=0;i<carInfo.length;i++){
			  
			   var id=carInfo[i]['id'];
			   var title=carInfo[i]['title'];
			   var lottery_id=carInfo[i]['lottery_id'];
			   var attend_count=parseFloat(carInfo[i]['attend_count']).toFixed(2); 
			   var pid=carInfo[i]['pid'];
			   
			   postdata[j] = {id:""+id+"",lottery_id:""+lottery_id+"",pid:""+pid+"",uid:""+userId+"",attend_count:""+attend_count+"",name:""+title+""};
			   j++;
		}
		var r = "{\"list\"" + ":" + $.toJSON(postdata)+"}"
		//var post = $.toJSON(postdata); 
		//var content = $.parseJSON(post);
		
		$.ajax({
		  type:'post',
		  url:''+ajaxUrl+'/Home/Lottery/addAttendLottery',
		  dataType:'json',	
		  data:{
			   //还需要传的字段 money  payMoney   balance  payType  attendDevice
			  user_token:user_token,
			  money:totalMoney,
			  payMoney:glo_remainMoney,
			  balance:glo_account_3,
			  payType:payType_true,//如果余额大于购买总额，则是0 当余额不够时  传1为微信，2为支付宝
			  attendDevice:'PC网站',
			  content:r,
			  },
		  success: function(data){
			  var info=data['info'];
			  var listTip=data['errList'];
				if(data['code']!=200){
					var tips_2='';
					if(listTip.length==0){
						swal({
								title: "",
								text: ''+info+'！',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							});
							return;
					}else {
					  
						  for(i=0;i<listTip.length;i++){
							var tips=listTip[i]['tip'];
							   tips_2+=tips+'；';
							}	
							tips_2=tips_2.substring(0,tips_2.length-1);//去掉最后一个分号 
							 swal({
								title: "",
								text: ''+info+'：'+''+tips_2+'！',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							});
							return;
							
					   }
				 }
			   
			   location.href = "payfor3.html?p";
				 
			  }
		});
}