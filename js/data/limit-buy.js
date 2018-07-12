// 限购专区

$.ajax({
	type:'post',
	url:''+ajaxUrl+'/Home/Index/limitProduct',
	dataType:'json',
	cache:false,
	data:{},
	beforeSend:function(){
		
		$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
	},
	success: function(data){
		 var limitGoodsListStr='';
		 for(i=0;i<data['list'].length;i++){
			 var lottery_id=data['list'][i]['lottery_id'];
			 var pid=data['list'][i]['pid'];
			 var need_count=data['list'][i]['need_count'];
			 var attend_count=data['list'][i]['attend_count'];
			 var title=data['list'][i]['title'];
			 var attend_limit=data['list'][i]['attend_limit'];
			 var max_attend_limit=data['list'][i]['max_attend_limit'];
			 var pics=data['list'][i]['pics'];
			 var path=data['host']+data['list'][i]['path'];
			 
			 limitGoodsListStr+='<div class="col-md-3 col-sm-3">';
			 limitGoodsListStr+='<div class="product-item">';
			 limitGoodsListStr+='<div class="product-img text-center">';
             limitGoodsListStr+='<a href="#"><img src="'+path+'"></a>';     
             limitGoodsListStr+='</div>';           
             limitGoodsListStr+='<h3 class="product-title">'+title+'</h3>';            
             limitGoodsListStr+='<div class="cg-progress-pre">';         
             limitGoodsListStr+='<div class="pre-tip">限购专区</div>';         
             limitGoodsListStr+='<div class="progress cg-progress">';               
             limitGoodsListStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">';           
             limitGoodsListStr+='<span class="sr-only">60% Complete (warning)</span>';                      
             limitGoodsListStr+='</div>';                       
             limitGoodsListStr+='</div>';               
             limitGoodsListStr+='</div>';            
             limitGoodsListStr+='<p>'+attend_count+'/'+need_count+'<span class="text-danger">(剩余120人次)</span></p>';      
             limitGoodsListStr+='<div class="review">';        
             limitGoodsListStr+='<a href="javascript:;" onClick="goToCar('+lottery_id+','+pid+','+1+');"><button type="button" class="btn btn-danger cg-btn-danger btn-go">立即参与</button></a>';        
			 limitGoodsListStr+='<a href="javascript:;" onClick="addToCar('+lottery_id+','+pid+','+1+');"><button type="button" class="btn btn-warning cg-btn-warning btn-add"><span class="glyphicon glyphicon-shopping-cart"></span></button></a>';    
			 limitGoodsListStr+='</div>';                       
             limitGoodsListStr+='</div>';               
             limitGoodsListStr+='</div>';        
                    
                    
		 }
		 $("#limitGoodsList").html(limitGoodsListStr);
		/*显示购物按钮*/
		/*$(".product-item").hover(function(){
		   $(this).addClass("hover-display").siblings().removeClass("hover-display");
		  
		 },function(){
		   $(this).removeClass("hover-display");
		 });*/
		 $(".product-item").hover(function(){
			$(this).find('div.review').stop(false,true).fadeIn(300);
		   },function(){
			 //$(this).removeClass("hover-display");
			 $(this).find('div.review').stop(false,true).fadeOut(100);
		   });
		 //点击加入购物车按钮时显示+1
		 $(".btn").click(function() {
			 if(typeof(user_token) != "undefined"){
				 
			  $.tipsBox({
				  obj: $(this),
				  str: "<b style='font-family:Microsoft YaHei;'>+1</b>",
				  callback: function() {
					  
				  }
			  });
			  return;
			 } 
		  });
	},
	complete:function(){
		 $(".loading").empty();
	   }, 
	error:function(){
		  alert("获取数据失败");
		 $(".loading").empty();
	  }
})
