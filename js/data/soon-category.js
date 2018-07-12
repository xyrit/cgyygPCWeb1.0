// 
var global_remain;// 剩余参与次数
var global_attend_limit;//最低参与次数 例如
var global_max_attend_limit;//每次参与次数最高限制 例如 10  就每次不能超过10

//打开页面调用函数
getSoonGoodsList();

function getSoonGoodsList(){
		$.ajax({
		type:'post',
		url:''+ajaxUrl+'/Home/Index/lotterySoon',
		dataType:'json',
		cache:false,
		async:false,
		data:{},
		beforeSend:function(){
			
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
			 //如果last_attend_time>=hourTime，，就用 waitTime， 如果last_attend_time<hourTime,就用nextWaitTime
			 var nextWaitTime=data['nextWaitTime'];
			 var hourTime=data['hourTime'];
			 var waitTime=data['waitTime'];
			 
			 /*var nextWaitTime=5;
			 var hourTime=4;
			 var waitTime=3;*/
			 
			 
			 var glo_countDownTime;
			 var glo_countDownTime_2;
			 var flagTime_1=0;
			 var flagTime_2=0;
			// alert(waitTime);
			 //即将揭晓
			 var soonProduct=data['soonProduct'];
			 var soonProductStr='';
			 for(i=0;i<soonProduct.length;i++){
				 var lottery_id=soonProduct[i]['lottery_id'];
				 var pid=soonProduct[i]['pid'];
				 var need_count=soonProduct[i]['need_count'];
				 var attend_count=soonProduct[i]['attend_count'];
				 var title=soonProduct[i]['title'];
				 var attend_limit=soonProduct[i]['attend_limit'];//最低参与次数 例如
				 global_attend_limit=attend_limit;//全局变量
				 var max_attend_limit=soonProduct[i]['max_attend_limit'];//每次参与次数最高限制 例如 10  就每次不能超过10
				 global_max_attend_limit=max_attend_limit;//全局变量
				 var path=data['host']+soonProduct[i]['path'];
				 var pics=soonProduct[i]['pics'];
				 var remain_count=need_count-attend_count;
				 global_remain=remain_count; //全局变量

				 var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值，传递参数
				 
				 var progress='';
				  if(need_count<1){
					  progress=0;
				   }else{
					  progress=(attend_count/need_count)*100;
					}
				 
				 soonProductStr+='<div class="col-md-3 col-sm-3 goods-listBorder">';
				 soonProductStr+='<div class="product-item">';
				 soonProductStr+='<div class="product-img text-center">';
				 soonProductStr+='<a href="goods-details.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" title="'+title+'" alt="'+title+'"></a>';     
				 soonProductStr+='</div>';       
				 soonProductStr+='<h3 class="product-title"><a href="goods-details.html?pid='+goods_link+'" target="_blank" title="'+title+'">'+title+'</a></h3>';
				 soonProductStr+='<div class="cg-progress-pre margin-t-0">';         
				 soonProductStr+='<div class="progress cg-progress">';        
				 soonProductStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%">';  
				 soonProductStr+='<span class="sr-only">'+progress+'% Complete (warning)</span>';       
				 soonProductStr+='</div>';             
				 soonProductStr+='</div>';
				 soonProductStr+='</div>';

				 //soonProductStr+='<p>'+attend_count+'/'+need_count+'<span class="text-danger">(剩余'+remain_count+'人次)</span></p>';
				 soonProductStr+='<ul class="list-group cg-progress-text_goods clearfix">';
				 soonProductStr+='<li class="list-group-item pull-left clearfix col-md-4 text-center">';
				 soonProductStr+='<p class="text-gray nomargin" id="attend_count">'+attend_count+'</p>';
				 soonProductStr+='<p class="nomargin">已参与人次</p>';
				 soonProductStr+='</li>';
				 soonProductStr+='<li class="list-group-item pull-left clearfix col-md-4 text-center">';
				 soonProductStr+='<p class="text-gray nomargin" id="attend_count">'+need_count+'</p>';
				 soonProductStr+='<p class="nomargin">总需人次</p>';
				 soonProductStr+='</li>';
				 soonProductStr+='<li class="list-group-item pull-right clearfix col-md-4 text-center">';
				 soonProductStr+='<p class="text-danger nomargin" id="remain">'+remain_count+'</p>';
				 soonProductStr+='<p class="text-danger nomargin">剩余人次</p>';
				 soonProductStr+='</li>';
				 soonProductStr+='</ul>';

				 soonProductStr+='<div class="review">';               
				 soonProductStr+='<a href="javascript:;" onClick="goToCar_three('+lottery_id+','+pid+','+remain_count+');"><button type="button" class="btn btn-danger cg-btn-danger btn-block cg-btn-radius">我来包尾</button></a>';
				 soonProductStr+='</div>';             
				 soonProductStr+='</div>';
				 soonProductStr+='</div>';            
				 
				 
				}
				//等待揭晓
				var waitProduct=data['waitProduct'];
				
				var waitProductStr='';
				
				/*for(i=0;i<waitProduct.length;i++){
					var lottery_id=waitProduct[i]['lottery_id'];
					var pid=waitProduct[i]['pid'];
					var need_count=waitProduct[i]['need_count'];
					var attend_count=waitProduct[i]['attend_count'];
					var title=waitProduct[i]['title'];
					var attend_limit=waitProduct[i]['attend_limit'];
					var max_attend_limit=waitProduct[i]['max_attend_limit'];
					var last_attend_time=waitProduct[i]['last_attend_time'];
					var pics=waitProduct[i]['pics'];
					var path=data['host']+waitProduct[i]['path'];
					var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值
					
					waitProductStr+='<div class="col-md-3 col-sm-3">';
					waitProductStr+='<div class="product-item">';
					waitProductStr+='<div class="product-img text-center">'; 
					waitProductStr+='<a href="soon-publish.html?pid='+goods_link+'" target="_blank"><img src="'+path+'"></a>';     
					waitProductStr+='</div>';             
					waitProductStr+='<h3 class="product-title"><a href="soon-publish.html?pid='+goods_link+'" class="text-gray" target="_blank">'+title+'</a></h3>';     
					waitProductStr+='<p class="text-gray2">总需参与人次：<span class="text-danger">'+need_count+'</span></p>';          
					waitProductStr+='<div class="soonCountdown">';      
					waitProductStr+='<p class="text-center">揭晓倒计时</p>';      
					waitProductStr+='<div class="clock clearfix" id="clockTime'+i+'">';   
					if(last_attend_time<=hourTime){
						glo_countDownTime=waitTime;
						waitProductStr+='<span class="hour_show_1"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="minute_show_1"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="second_show_1"></span>'; 
						flagTime_1=1;
						}else{
							glo_countDownTime_2=nextWaitTime;
							waitProductStr+='<span class="hour_show_2"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="minute_show_2"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="second_show_2"></span>'; 
							 flagTime_2=1;
							}       
				  
					waitProductStr+='</div>';          
					waitProductStr+='</div>';     
					waitProductStr+='</div>';     
					waitProductStr+='</div>';                 
					
				}*/
				//var array=new Array();
				$.each(waitProduct, function(key,item){     
				 
				  // alert(item['lottery_id']);   
				   var lottery_id=item['lottery_id'];
					var pid=item['pid'];
					var need_count=item['need_count'];
					var attend_count=item['attend_count'];
					var title=item['title'];
					var attend_limit=item['attend_limit'];
					var max_attend_limit=item['max_attend_limit'];
					var last_attend_time=item['last_attend_time'];
					var pics=item['pics'];
					var path=data['host']+item['path'];
					var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值
					
					waitProductStr+='<div class="col-md-3 col-sm-3 goods-listBorder">';
					waitProductStr+='<div class="product-item">';
					waitProductStr+='<div class="product-img text-center">'; 
					waitProductStr+='<a href="soon-publish.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" title="'+title+'" alt="'+title+'"></a>';     
					waitProductStr+='</div>';             
					waitProductStr+='<h3 class="product-title"><a href="soon-publish.html?pid='+goods_link+'" target="_blank" title="'+title+'">'+title+'</a></h3>';
					waitProductStr+='<p class="text-gray2">总需参与人次：<span class="text-danger">'+need_count+'</span></p>';          
					waitProductStr+='<div class="soonCountdown">';      
					waitProductStr+='<p class="text-center">揭晓倒计时</p>';      
					waitProductStr+='<div class="clock clearfix" id="clockTime'+i+'">';   
				
					if(last_attend_time<=hourTime){
						glo_countDownTime=waitTime;
						
						waitProductStr+='<span class="hour_show_1"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="minute_show_1"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="second_show_1"></span>'; 
						//flagTime_1=1;
						}else{
							glo_countDownTime=nextWaitTime;
							
							//waitProductStr+='<span class="hour_show_2"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="minute_show_2"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="second_show_2"></span>'; 
							waitProductStr+='<span class="hour_show_1"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="minute_show_1"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="second_show_1"></span>'; 
							// flagTime_2=1;
							}  
					
					//把倒计时总数放进数组中		
				//	array[key] = ;     
				
					waitProductStr+='</div>';          
					waitProductStr+='</div>';     
					waitProductStr+='</div>';     
					waitProductStr+='</div>';  
				   
				    timer_1(glo_countDownTime,key);//倒计时
				     
				}); 
				
			//	 time_dowm(array);
				
				
				
				
				//已经揭晓
				var readyProduct=data['resultProduct'];
				//alert(data['resultProduct']['product'].length);
				var product=readyProduct['product'];
				var user=readyProduct['user'];
				var readyProductStr='';
				var startCode=data['startCode'];
				for(i=0;i<product.length;i++){
					 var lottery_id=product[i]['lottery_id'];
					 var pid=product[i]['pid'];
					 var uid=product[i]['uid'];
					 var need_count=product[i]['need_count'];
					 var attend_count=user[i]['attend_count'];
					// var attend_limit=product[i]['attend_limit'];
					 //var max_attend_limit=readyProduct[i]['max_attend_limit'];
					 var lottery_code=Number(product[i]['lottery_code']);
					 var lottery_time=product[i]['lottery_time'];
					 var title=product[i]['title']; 
					 //var pics=readyProduct[i]['pics']; 
					 var path=data['host']+product[i]['path']; 
					
					 var ip_address=user[i]['ip_address']; 
					 var nickname=user[i]['nickname']; 
					 
					 var returnNum=parseInt(need_count/attend_count);
					 
					 var pic_host=data['pic_host'];
					 var userPath=user[i]['path']; 
					 var picReg=/^http[\s\S]*$/;//判断图片图片是否包含http，包含的就是第三方登录的头像
					 //时间戳格式化
					  var timestamp_1 = lottery_time;
					  var newDate_1 = new Date();
					  newDate_1.setTime(timestamp_1 * 1000);
					  var newLottery_time=newDate_1.format('yyyy-MM-dd hh:mm:ss');
					 
					 var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值
					 //rightContentMarking=1为参与记录，2为中奖记录，3为晒单列表
					// var user_uid=uid+'&'+'rightContentMarking='+2;//给链接地址赋值,传递用户ID
					 var user_uid=uid+'&'+'nickname='+escape(nickname)+'&'+'rightContentMarking='+3;//给链接地址赋值,传递用户ID
					 readyProductStr+='<div class="col-md-3 col-sm-3 goods-listBorder">';
					 readyProductStr+='<div class="product-item soonCategoryPrize">';
					 readyProductStr+='<div class="product-img text-center">';
					 readyProductStr+='<a href="ready-publish.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" title="'+title+'" alt="'+title+'"></a>'; 
					 readyProductStr+='</div>';     
					 readyProductStr+='<h3 class="product-title"><a href="ready-publish.html?pid='+goods_link+'" target="_blank" title="'+title+'">'+title+'</a></h3>';
					 readyProductStr+='<p class="text-gray2">总需参与人次：<span class="text-danger">'+need_count+'</span></p>';                
					 readyProductStr+='<div class="product-item_2">';
					 readyProductStr+='<div class="media">';         
					 readyProductStr+='<div class="media-left">';    

					  //判断中奖用户是不是自己并且是否有头像
					 var p = picHostUrl(pic_host,userPath);//此函数定义在common.js函数中
					 if(typeof(userId) == "undefined"||uid!=userId){
						readyProductStr+='<a href="personal-index-other.html?uid='+user_uid+'" target="_blank"><img src="'+p+'" width="40" height="40"></a>';
					  }else{
						  readyProductStr+='<a href="personal-index.html?per_market=3" target="_blank"><img src="'+p+'" width="40" height="40"></a>';
					  }
					 //readyProductStr+='<a href="#"><img class="media-object" alt="64x64" style="width: 40px; height: 40px;"src="images/cp2.jpg"></a>';      
					 readyProductStr+='</div>';        
					 readyProductStr+='<div class="media-body">';  
					 
					 readyProductStr+='<h4 class="media-heading">';   
					  if(typeof(userId) == "undefined"||uid!=userId){
						   readyProductStr+='<a href="personal-index-other.html?uid='+user_uid+'" target="_blank">'+nickname+'</a>'; 
						   }else{
								readyProductStr+='<a href="personal-index.html?per_market=3" target="_blank">'+nickname+'</a>'; 
								//<a href="personal-index-other.html?uid='+user_uid+'">'+nickname+'</a>
							   }  
					  readyProductStr+='</h4>'; 
					 
					         
					 //readyProductStr+='<h4 class="media-heading"></h4>';              
					 readyProductStr+='<p title="'+ip_address+'">'+ip_address+'</p>';
					 readyProductStr+='</div>';             
					 readyProductStr+='</div>';                     
					 readyProductStr+='<p class="magin-b-5">获奖幸运码：<span class="text-danger">'+(startCode+lottery_code)+'</span></p>';
					 readyProductStr+='<p class="margin-b-5">本期参与：<span class="text-danger">'+attend_count+'</span>人次</p>';             
					 readyProductStr+='<p class="margin-b-5 nomargin">揭晓时间：<span>'+newLottery_time+'</span></p>';           
					 readyProductStr+='<span class="huibao text-danger margin-t-8">回报率：'+returnNum+'倍</span>';         
					 readyProductStr+='</div>';                 
					 readyProductStr+='<div class="review">';         
					 readyProductStr+='<a href="ready-publish.html?pid='+goods_link+'" target="_blank"><button type="button" class="btn btn-danger cg-btn-danger btn-block">查看详情</button></a>';         
					 readyProductStr+='</div>';  
					 readyProductStr+='</div>'; 
					 readyProductStr+='</div>';   
					
					 
				}
				
				//当分类下的商品为空时，使用四个图片代替
				 var noListStr='';
				 for(i=0;i<4;i++){
					 noListStr+='<div class="col-md-3 col-sm-3">';
					 noListStr+='<div class="product-item">';
					 noListStr+='<div class="product-img text-center" style="max-height: 100%;height: auto;padding:10px 0">';
					 noListStr+='<img src="images/noList.gif">';     
					 noListStr+='</div>';       
					 noListStr+='</div>';
					 noListStr+='</div>'; 
				  }
				  
				if(waitProduct.length<=0){
					//$("#waitCategoryGoodsList").html('<p class="text-center margin-t-b-40">此分类下的商品为空！</p>');
					$("#waitCategoryGoodsList").html(noListStr);
				}else{
					$("#waitCategoryGoodsList").html(waitProductStr);
					}
				
				if(soonProduct.length<=0){
					$("#soonCategoryGoodsList").html(noListStr);
				}else{
					$("#soonCategoryGoodsList").html(soonProductStr);
					}
				
				if(product.length<=0){
					$("#readyCategoryGoodsList").html(noListStr);
					}else{
					 $("#readyCategoryGoodsList").html(readyProductStr);
					}
				
				/*显示购物按钮*/
			   /*$(".product-item").hover(function(){

				  $(this).find('div.review').stop(false,true).fadeIn(300);
				 },function(){

				   $(this).find('div.review').stop(false,true).fadeOut(100);
				 });*/
				 

				
				$(".loading").empty(); 
			 
			},
			complete:function(){
				 $(".loading").empty();
			   }, 
			error:function(){
				  swal({
					  title: "",
					  text: '获取数据失败！<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
					  html: true,
					  type: "error",
					  confirmButtonText:"确定",
					  confirmButtonColor: "#ff4800",
				  });
				 $(".loading").empty();
			  } 
	})
}



//waitTime------倒计时
/*function time_dowm($arr){
	//循环数组，每个商品倒计时分别调用倒计时
	//console.log($arr)
	$.each($arr,function(key,item){
		//console.log($arr[key]);
		var intDiff_1 = parseInt($arr[key]);//倒计时总秒数量,取数组中的值
	console.log(intDiff_1);
		
				
	});
	
}*/

function timer_1(intDiff_1,key){
	var SetTime= setInterval(function(){
		var day=0,
			hour=0,
			minute=0,
			second=0;//时间默认值		
		if(intDiff_1 > 0){
			day = Math.floor(intDiff_1 / (60 * 60 * 24));
			hour = Math.floor(intDiff_1 / (60 * 60)) - (day * 24);
			//hour = Math.floor(intDiff / (60 * 60));
			minute = Math.floor(intDiff_1 / 60) - (day * 24 * 60) - (hour * 60);
			//minute = Math.floor(intDiff / 60) - (hour * 60);
			second = Math.floor(intDiff_1) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			//second = Math.floor(intDiff)- (hour * 60 * 60) - (minute * 60);
		}
		if(hour <= 9) hour= '0' + hour;
		if (minute <= 9) minute = '0' + minute;
		if (second <= 9) second = '0' + second;
		//$('#day_show').html(day+"天");
	  
		   $('.hour_show_1:eq('+key+')').html('<s id="h"></s>'+hour);
		   $('.minute_show_1:eq('+key+')').html('<s></s>'+minute);
		   $('.second_show_1:eq('+key+')').html('<s></s>'+second); 
	  
		intDiff_1--;
		if(intDiff_1 <-1){
			 clearInterval(SetTime);
			 getSoonGoodsList();
			
			// window.location.reload();
		
			
		}
	}, 1000);
} 
			
		