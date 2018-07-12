//首页

var userId = $.cookie('userId');
var nickname = $.cookie('nickname');
var userMobile = $.cookie('userMobile');
var user_token = $.cookie('user_token');	
var ucenter_url = $.cookie('ucenter_url');	
$('#ifUrl').attr('src',''+ucenter_url+'');  

goodsList();	
//var global_remain;//立即参与，加入购物车传递的变量
function goodsList(){	
$.ajax({  
	  type:'post',  
	  url:''+ajaxUrl+'/Home/Index/homePage',  
	  data:{
		  user_token:user_token
		  },  
	  cache:false,  
	  async:false,
	  dataType:'json', 
	  timeout:60000,
	  beforeSend: function(){
		  $(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
		  },
	  success:function(data){  
		
		//slide轮播图
		var info=data['info'];
		if(data['code']!=200){
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

		 
		//首页轮播图	
		 var imgSrc=data['host']+data['slide'][0]['path'];
		 var L = "";X='';//定义l
			X+='<li data-target="#myCarousel" data-slide-to="0" class="active"></li>'; 
				L+=' <div class="item active">';
				L+=' <a href="'+data['slide'][0]['url']+'" target="_blank">';
				L+=' <img class="first-slide" src="'+data['host']+data['slide'][0]['path']+'" alt="'+data['host']+data['slide'][0]['path']+'"/>';  
				L+='</a>';
				L+='</div>';//alert(data['slide'].length);
				
			 for(var i=1;i<data['slide'].length;i++){//遍历输出列表  
			
				X+='<li data-target="#myCarousel" data-slide-to="'+i+'"></li>';
  
				L+=' <div class="item">';
				L+=' <a href="'+data['slide'][i]['url']+'" target="_blank">';
				L+=' <img class="first-slide" src="'+data['host']+data['slide'][i]['path']+'" alt="'+data['host']+data['slide'][i]['path']+'"/>';
			    L+='</a>';
				L+='</div>';
				
			}
  
			$("#pic").html(L);
			$("#indicators-item").html(X);
			
			//垂直菜单
			//var menuLink=data['host']+data['slide'][0]['path']
			var str = "";
			//垂直菜单链接地址传递参数
			var categoryLink=data['category'][i]['id'];
			for(var i=0;i<data['category'].length;i++){
				var categoryLink=data['category'][i]['id'];
				var categoryEngName=data['category'][i]['name'];
				var categoryTitle=data['category'][i]['title'];//分类名称
				//编码传递
				categoryTitle=escape(categoryTitle);
				
				str+='<div class="item bo">';
				str+='<h3>';

				str+='<a href="category.html?categoryId='+categoryLink+'&categoryTitle='+categoryTitle+'" id="'+categoryLink+'" class="menuBg_'+i+'">';
				str+=''+data['category'][i]['title']+'';
				str+='</a>';



				/*str+='<a href="category.html?categoryId='+categoryLink+'&categoryTitle='+categoryTitle+'">';
				//str+='<span class="glyphicon glyphicon-fire"></span>';
				str+=''+data['category'][i]['title']+'';
				str+='</a>';*/


				str+='</h3>';
				str+='</div>';
				
			}
			
			$("#menu-list").html(str);
			$("#menu-list_0").html(str);
			//给左上角菜单加点击样式
			$('#menu-list .item a').each(function () {
				if ($($(this))[0].href == String(window.location))
					$(this).addClass('text-danger').css("font-weight","700");
			});
			 
			 
			//公告
			var notice="";
			for(var i=0;i<data['notice'].length;i++){
				var id=data['notice'][i]['id'];
				var title=data['notice'][i]['title'];
				notice+='<li><a href="notice-article.html?id='+id+'" target="_blank">'+title+'</a></li>';
			}
			$("#notice").html(notice);
			//热门推荐
			var str2 = "";
			
            
			for(var i=0;i<data['$hotProduct'].length;i++){
				
				
				//var dataFromLi=[$("#Teachername").text(),$("#Credit_hour").text()];
				
				var pidLink=data['$hotProduct'][i]['pid'];
				       
				var lottery_idLink=data['$hotProduct'][i]['lottery_id'];
				         
				var need_countLink=data['$hotProduct'][i]['need_count'];
				var attend_countLink=data['$hotProduct'][i]['attend_count'];
				var titleLink=data['$hotProduct'][i]['title'];
				//对浏览器传递的字符进行编码
				    //titleLink = escape(titleLink);
				var limit_countLink=data['$hotProduct'][i]['limit_count'];
				var pics=data['$hotProduct'][i]['pics'];
				var goods_link=pidLink+'&'+'lottery_id='+lottery_idLink;//给链接地址赋值
				var progress='';
				//var progress=(data['$hotProduct'][i]['need_count'])/(data['$hotProduct'][i]['attend_count']);

				if(data['$hotProduct'][i]['need_count']<1){
					progress=0;
				 }else{
					progress=(attend_countLink/need_countLink)*100;
					 }
				var remain=need_countLink-attend_countLink;
				//global_remain=remain; //全局变量

				str2+='<div class="col-md-3 col-sm-3 goods-listBorder">';
				str2+='<div class="product-item">';
				str2+='<div class="product-img text-center">';
				str2+='<a href="goods-details.html?pid='+goods_link+'" target="_blank">';
				str2+='<img src="'+data['host']+data['$hotProduct'][i]['path']+'" alt="'+data['$hotProduct'][i]['title']+'" title="'+data['$hotProduct'][i]['title']+'">';
				str2+='</a>';
				str2+='</div>';
				str2+='<h3 class="product-title margin-b-5"><a href="goods-details.html?pid='+goods_link+'" target="_blank" title="'+data['$hotProduct'][i]['title']+'">'+data['$hotProduct'][i]['title']+'</a></h3>';
				str2+='<p>价值：￥'+need_countLink+'</p>';
				str2+='<div>';
				str2+='<div class="progress cg-progress">';
				str2+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%">';
				str2+='<span class="sr-only">'+progress+'% Complete (warning)</span>';
				str2+='</div>';
				str2+='</div>';
				str2+='</div>';
				
				/*str2+='<p>';
				str2+=''+data['$hotProduct'][i]['attend_count']+'/'+data['$hotProduct'][i]['need_count']+'';
				str2+='<span class="text-danger">(剩余'+remain+'人次)</span>';
				str2+='</p>';*/
				str2+='<ul class="list-group cg-progress-text_goods clearfix">';
				str2+='<li class="list-group-item pull-left clearfix col-md-4 text-center">';
				str2+='<p class="text-gray nomargin" id="attend_count">'+data['$hotProduct'][i]['attend_count']+'</p>';
				str2+='<p class="nomargin">已参与人次</p>';
				str2+='</li>';
				str2+='<li class="list-group-item pull-left clearfix col-md-4 text-center">';
				str2+='<p class="text-gray nomargin" id="attend_count">'+data['$hotProduct'][i]['need_count']+'</p>';
				str2+='<p class="nomargin">总需人次</p>';
				str2+='</li>';
				str2+='<li class="list-group-item pull-right clearfix col-md-4 text-center">';
				str2+='<p class="text-danger nomargin" id="remain">'+remain+'</p>';
				str2+='<p class="text-danger nomargin">剩余人次</p>';
				str2+='</li>';
				str2+='</ul>';
				
				str2+='<div class="review">';
				str2+='<a href="javascript:;" onClick="goToCar('+lottery_idLink+','+pidLink+','+1+');"><button type="button" class="btn btn-danger cg-btn-danger btn-go cg-btn-radius">立即参与</button></a>';
				/*str2+='<button type="button" class="btn btn-warning cg-btn-warning btn-add btnCart" onClick="addToCar('+lottery_idLink+','+pidLink+','+1+');"><span class="glyphicon glyphicon-shopping-cart"></span></button>';*/
				str2+='<button type="button" class="btn btn-add btnCart cg-btn-radius cg-btn-empty" onClick="addToCar('+lottery_idLink+','+pidLink+','+1+');"></button>';
				str2+='</div>';
				
				str2+='</div>';
				str2+='</div>';
			}
			
			
			
			$("#hotProduct").html(str2);
			
			 /*显示购物按****钮等DOM结构完全加载才执行**/

			 //点击加入购物车按钮时显示+1
			 /*$(".btn").click(function() {
				 if(typeof(user_token) != "undefined"){
					 
				  $.tipsBox({
					  obj: $(this),
					  str: "<b style='font-family:Microsoft YaHei;'>+1</b>",
					  callback: function() {
						  
					  }
				  });
				  return;
				 } 
			  });*/
			
			//$(".product-item .product-img a").attr("href","goods-details.html?data="+goods_link);//传参数给详情页
            /*******************值得参与******************/
			//热门推荐
			var WorthProductStr = "";


			  for(var i=0;i<data['WorthProduct'].length;i++){


				  //var dataFromLi=[$("#Teachername").text(),$("#Credit_hour").text()];

				  var pidLink=data['WorthProduct'][i]['pid'];

				  var lottery_idLink=data['WorthProduct'][i]['lottery_id'];

				  var need_countLink=data['WorthProduct'][i]['need_count'];
				  var attend_countLink=data['WorthProduct'][i]['attend_count'];
				  var titleLink=data['WorthProduct'][i]['title'];
				  //对浏览器传递的字符进行编码
				  //titleLink = escape(titleLink);
				  var limit_countLink=data['WorthProduct'][i]['limit_count'];
				  var path=data['WorthProduct'][i]['path'];
				  var goods_link=pidLink+'&'+'lottery_id='+lottery_idLink;//给链接地址赋值
				  var progress='';
				  //var progress=(data['$hotProduct'][i]['need_count'])/(data['$hotProduct'][i]['attend_count']);

				  if(data['WorthProduct'][i]['need_count']<1){
					  progress=0;
				  }else{
					  progress=(attend_countLink/need_countLink)*100;
				  }
				  var remain=need_countLink-attend_countLink;
				  //global_remain=remain; //全局变量

				  WorthProductStr+='<div class="col-md-3 col-sm-3 goods-listBorder">';
				  WorthProductStr+='<div class="product-item">';
				  WorthProductStr+='<div class="product-img text-center">';
				  WorthProductStr+='<a href="goods-details.html?pid='+goods_link+'" target="_blank">';
				  WorthProductStr+='<img src="'+data['host']+path+'" alt="'+titleLink+'" title="'+titleLink+'">';
				  WorthProductStr+='</a>';
				  WorthProductStr+='</div>';
				  WorthProductStr+='<h3 class="product-title margin-b-5"><a href="goods-details.html?pid='+goods_link+'" target="_blank" title="'+titleLink+'">'+titleLink+'</a></h3>';
				  WorthProductStr+='<p>价值：￥'+need_countLink+'</p>';
				  WorthProductStr+='<div>';
				  WorthProductStr+='<div class="progress cg-progress">';
				  WorthProductStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%">';
				  WorthProductStr+='<span class="sr-only">'+progress+'% Complete (warning)</span>';
				  WorthProductStr+='</div>';
				  WorthProductStr+='</div>';
				  WorthProductStr+='</div>';

				  /*str2+='<p>';
				   str2+=''+data['$hotProduct'][i]['attend_count']+'/'+data['$hotProduct'][i]['need_count']+'';
				   str2+='<span class="text-danger">(剩余'+remain+'人次)</span>';
				   str2+='</p>';*/
				  WorthProductStr+='<ul class="list-group cg-progress-text_goods clearfix">';
				  WorthProductStr+='<li class="list-group-item pull-left clearfix col-md-4 text-center">';
				  WorthProductStr+='<p class="text-gray nomargin" id="attend_count">'+attend_countLink+'</p>';
				  WorthProductStr+='<p class="nomargin">已参与人次</p>';
				  WorthProductStr+='</li>';
				  WorthProductStr+='<li class="list-group-item pull-left clearfix col-md-4 text-center">';
				  WorthProductStr+='<p class="text-gray nomargin" id="attend_count">'+need_countLink+'</p>';
				  WorthProductStr+='<p class="nomargin">总需人次</p>';
				  WorthProductStr+='</li>';
				  WorthProductStr+='<li class="list-group-item pull-right clearfix col-md-4 text-center">';
				  WorthProductStr+='<p class="text-danger nomargin" id="remain">'+remain+'</p>';
				  WorthProductStr+='<p class="text-danger nomargin">剩余人次</p>';
				  WorthProductStr+='</li>';
				  WorthProductStr+='</ul>';

				  WorthProductStr+='<div class="review">';
				  WorthProductStr+='<a href="javascript:;" onClick="goToCar('+lottery_idLink+','+pidLink+','+1+');"><button type="button" class="btn btn-danger cg-btn-danger btn-go cg-btn-radius">立即参与</button></a>';
				  /*str2+='<button type="button" class="btn btn-warning cg-btn-warning btn-add btnCart" onClick="addToCar('+lottery_idLink+','+pidLink+','+1+');"><span class="glyphicon glyphicon-shopping-cart"></span></button>';*/
				  WorthProductStr+='<button type="button" class="btn btn-add btnCart cg-btn-radius cg-btn-empty" onClick="addToCar('+lottery_idLink+','+pidLink+','+1+');"></button>';
				  WorthProductStr+='</div>';

				  WorthProductStr+='</div>';
				  WorthProductStr+='</div>';
			  }



			  $("#WorthProductStr").html(WorthProductStr);
			
			//新品上架
			var str3 = "";
			var newProduct=data['$newProduct'];
			for(var i=0;i<newProduct.length;i++){
				var progress='';
				//var progress=(data['$hotProduct'][i]['need_count'])/(data['$hotProduct'][i]['attend_count']);

				var need_count=data['$newProduct'][i]['need_count'];
				var attend_count=data['$newProduct'][i]['attend_count'];
				var path=data['host']+data['$newProduct'][i]['path'];
				var title=data['$newProduct'][i]['title'];
				var lottery_id=data['$newProduct'][i]['lottery_id'];
				var pid=data['$newProduct'][i]['pid'];
				if(need_count<1){
					progress=0;
				 }else{
					progress=(attend_count/need_count)*100;
					 }
				var remain=need_count-attend_count;
				
				var goods_linkNew=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值新品上架
				
				
				str3+='<div class="col-md-3 col-sm-3 goods-listBorder">';
				str3+='<div class="product-item">';
				
				str3+='<div class="product-img text-center">';
				str3+='<a href="goods-details.html?pid='+goods_linkNew+'" target="_blank">';//给链接地址赋值新品上架
				str3+='<img src="'+path+'" alt="'+title+'" title="'+title+'">';
				str3+='</a>';
				str3+='</div>';
				
				str3+='<h3 class="product-title margin-b-5"><a href="goods-details.html?pid='+goods_linkNew+'" target="_blank" title="'+title+'">'+title+'</a></h3>';
				str3+='<p>价值：￥'+need_count+'</p>';
				str3+='<div>';
				str3+='<div class="progress cg-progress">';
				str3+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%">';
				str3+='<span class="sr-only">'+progress+'% Complete (warning)</span>';
				str3+='</div>';
				str3+='</div>';
				str3+='</div>';
				
				/*str3+='<p>';
				str3+=''+attend_count+'/'+need_count+'';
				str3+='<span class="text-danger">(剩余'+remain+'人次)</span>';
				str3+='</p>';*/

				str3+='<ul class="list-group cg-progress-text_goods clearfix">';
				str3+='<li class="list-group-item pull-left clearfix col-md-4 text-center">';
				str3+='<p class="text-gray nomargin" id="attend_count">'+attend_count+'</p>';
				str3+='<p class="nomargin">已参与人次</p>';
				str3+='</li>';
				str3+='<li class="list-group-item pull-left clearfix col-md-4 text-center">';
				str3+='<p class="text-gray nomargin" id="attend_count">'+need_count+'</p>';
				str3+='<p class="nomargin">总需人次</p>';
				str3+='</li>';
				str3+='<li class="list-group-item pull-right clearfix col-md-4 text-center">';
				str3+='<p class="text-danger nomargin" id="remain">'+remain+'</p>';
				str3+='<p class="text-danger nomargin">剩余人次</p>';
				str3+='</li>';
				str3+='</ul>';


				str3+='<div class="review">';
				str3+='<a href="javascript:;" onClick="goToCar('+lottery_id+','+pid+','+1+');"><button type="button" class="btn btn-danger cg-btn-danger btn-go cg-btn-radius">立即参与</button></a>';
				/*str3+='<button type="button" class="btn btn-warning cg-btn-warning btn-add btnCart" onClick="addToCar('+lottery_id+','+pid+','+1+');"><span class="glyphicon glyphicon-shopping-cart"></span></button>';*/
				str3+='<button type="button" class="btn btn-add btnCart cg-btn-radius cg-btn-empty" onClick="addToCar('+lottery_id+','+pid+','+1+');"></button>';
				
				str3+='</div>';
				
				str3+='</div>';
				str3+='</div>';
			}
			$("#newProduct").html(str3);
			/*显示购物按****钮等DOM结构完全加载才执行**/

			   /*显示购物按钮*/
			   /*$(".product-item").hover(function(){
				  // $(this).addClass("hover-display").siblings().removeClass("hover-display");
				  $(this).find('div.review').stop(false,true).fadeIn(300);
				 },function(){
				   //$(this).removeClass("hover-display");
				   $(this).find('div.review').stop(false,true).fadeOut(100);
				 });*/

			   //点击加入购物车按钮时显示+1
			   $(".btn").click(function() {
				   if(typeof(userId) != "undefined"){
					$.tipsBox({
						obj: $(this),
						str: "<b style='font-family:Microsoft YaHei;'>+1</b>",
						callback: function() {
							
							
						}
					});

					return;
				   } 
				});

				
		    //一元传奇
			var oneLegend=data['$oneLegend'];	
			var oneLegendStr='';
			for(i=0;i<oneLegend.length;i++){
				var lottery_id=oneLegend[i]['lottery_id'];
			    var pid=oneLegend[i]['pid'];
				var uid=oneLegend[i]['uid'];
				var lottery_time=oneLegend[i]['lottery_time'];
				var need_count=oneLegend[i]['need_count'];
				var attend_count=oneLegend[i]['attend_count'];
				var title=oneLegend[i]['title'];
				var nickname=oneLegend[i]['nickname'];
				var pic_host=data['pic_host']
				var path=oneLegend[i]['path'];
				//rightContentMarking=1为参与记录，2为中奖记录，3为晒单列表
				var user_uid=uid+'&'+'nickname='+escape(nickname)+'&'+'rightContentMarking='+2;//给链接地址赋值,传递用户ID
				
				
				//时间戳格式化
				  var timestamp_0 = lottery_time;
				  var newDate_0 = new Date();
				  newDate_0.setTime(timestamp_0 * 1000);
				  var newLottery_time_0=newDate_0.format('yyyy-MM-dd hh:mm:ss');
				
				oneLegendStr+='<li class="marquee-item">';
				oneLegendStr+='<div class="product-item prize">';
                oneLegendStr+='<div class="media">';        
				oneLegendStr+='<div class="media-left">';  
				//根据uID号是否等于登录的id判断用户点击的头像是自己的还是他人的以及有没有头像，没有的给默认头像，进行不同页面的跳转
				
				//判断中奖用户是不是自己并且是否有头像
				  var p = picHostUrl(pic_host,path);//此函数定义在common.js函数中
				  if(typeof(userId) == "undefined"||uid!=userId){
					   oneLegendStr+='<a href="personal-index-other.html?uid='+user_uid+'" target="_blank"><img class="media-object"  alt="'+nickname+'" style="width: 40px; height: 40px;" src="'+p+'"></a>';
					  
					}else{
						oneLegendStr+='<a href="personal-index.html?per_market=2" target="_blank"><img class="media-object"  alt="'+nickname+'" style="width: 40px; height: 40px;" src="'+p+'"></a>';
					
					}

                oneLegendStr+='</div>';               
                oneLegendStr+='<div class="media-body">'; 
				//"="为赋值，"=="为相等
				if(uid==userId){
					oneLegendStr+='<h4 class="media-heading"><a href="personal-index.html?per_market=2" target="_blank">'+nickname+'</a></h4>';
					}else{
						oneLegendStr+='<h4 class="media-heading"><a href="personal-index-other.html?uid='+user_uid+'" target="_blank">'+nickname+'</a></h4>';
						}
				     
				oneLegendStr+='<p class="text-gray2">'+newLottery_time_0+'</p>';               
                oneLegendStr+='</div>';                  
                oneLegendStr+='</div>';              
                oneLegendStr+='<p><span class="text-danger">1人次</span><a href="#">'+title+'</a></p>';
			    oneLegendStr+='<p class="count-p">共需：<span>'+need_count+'</span>人次</p>';
				oneLegendStr+='</div>';
                oneLegendStr+='</li>';                
                              
				
			}

			var shopcartNum
			//少于四个时隐藏
			if(oneLegend.length<4){
				$("#marquee1").parent().hide();
				$(".help").parent().addClass("margin-t-20");
				}else{
					$("#oneLegend").html(oneLegendStr);
					}
			
			 //自动滚动，数据小于4时不滚动
			 if($("#oneLegend .marquee-item").length>4){
				 $("#marquee1").kxbdMarquee({direction:"left",isEqual:true});
				 return;
			 }
			
			
			$(".loading").empty();//当页面加载完后隐藏加载中图标
			$(".loading").hide();
	  },  
	  complete: function(){
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
		
	    }  
	  
	  });

}

$(function(){

  $(window).resize(function(){
	 //垂直菜单的高度与导航图的高度一致

	  var picHeight=$("#pic").height();
	 
	  //if(picHeight>=445){
		  $("#menu-list").height(picHeight);
	  //}
  });
   //垂直菜单的高度与导航图的高度一致----window.load等待所有元素加载完之后再去获取图片的高度
   $(window).load(function(){
	   
	  var picHeight=$("#pic").height()
	  $("#menu-list").height(picHeight);
	  $(".cg-slide").height(picHeight);
   });
})
