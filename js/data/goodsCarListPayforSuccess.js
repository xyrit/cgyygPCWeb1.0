// 支付成功，获得幸运码
var userId = $.cookie('userId');
var nickname = $.cookie('nickname');
var userMobile = $.cookie('userMobile');
var user_token = $.cookie('user_token');
$.ajax({
	type:'post',
	 url:''+ajaxUrl+'/Home/Lottery/attendLottery',
	 dataType:'json',
	 data:{
		 user_token:user_token,
		 
		 },
	 cache:false,
	 timeout:60000,
	 beforeSend: function(){
		 $(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
	 },
	 success: function(data){
		 var info=data['info'];
		  if(data['code']!=200){
			    if(data['code']==517){
                   window.location.href='login.html';
				}
			   else{
					swal({
						title: "",
						text: ''+info+'！',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
				}

				return;
			}
		 var startCode=data['startCode'];//幸运码的开始码
		// var list=data['list'];
		// var tip=data['list'][0]['tip'];//提示信息
	
		 var getLottery=data['list'];
		 var goodsPayforSuccessStr='';
		 var attCount=0;
		 for(i=0;i<getLottery.length;i++){
			 var title=getLottery[i]['attendCode']['name'];//商品名称
			 var pid=getLottery[i]['attendCode']['pid'];
			 var attendCode=getLottery[i]['attendCode']['attendCode'];
			 var lottery_id=getLottery[i]['attendCode']['lottery_id'];
			 var attend_count=getLottery[i]['attendCode']['attend_count'];
			 var attend_time=getLottery[i]['attendCode']['attend_time'];
			 var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值
			 //时间戳格式化
			/*var timestamp_0 = attend_time;
			var newDate_0 = new Date();
			newDate_0.setTime(timestamp_0 * 1000);
			var newAttend_time_0=newDate_0.format('yyyy-MM-dd h:m:s');*/
					  
			 
			 var trueAttendCode='';//把startCode分离出来，然后以分号连接成一个新数字，这个是全部幸运码
			 var trueAttendCode2='';//把startCode分离出来，然后以分号连接成一个新数字 按钮前面的幸运码集合
			 var trueAttendCode_min='';//当幸运码小于等于7的时候，不显示按钮使用的 幸运码集合
			 var s=attendCode.split(',');//把startCode分离出来，然后以分号连接成一个新数字
			 // alert(s.length);
			  for(var k=0;k<s.length;k++){
				 //trueAttendCode+=(startCode+Number(s[k]))+'，';
				 trueAttendCode+='<span class="display-ib">'+(startCode+Number(s[k]))+'</span>'; 
				 trueAttendCode_min+='<span class="display-ib padding-l-r-5">'+(startCode+Number(s[k]))+'</span>'; 
				 
			  }//把startCode分离出来，然后以分号连接成一个新数字
			 trueAttendCode=trueAttendCode.substring(0,trueAttendCode.length-1);//去掉最后一个分号
			 
			//先显示几条，点击后弹出全部数据
			  for(var j = 0;j<7;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
				//把startCode分离出来，然后以分号连接成一个新数字
				if(j>(s.length-1)){
					break;
				}
				//这里不能使用加class的方法 只能用空格代替，否则出错
				 trueAttendCode2+=(startCode+Number(s[j]))+'&nbsp;&nbsp;';
				 
			  }
			  trueAttendCode2=trueAttendCode2.substring(0,trueAttendCode2.length-1);//去掉最后一个分号
			
			 goodsPayforSuccessStr+='<tr>';
			 goodsPayforSuccessStr+='<td class="text-center noline">'+attend_time+'</td>'; 
			 goodsPayforSuccessStr+='<td class="goods text-left">';
			// goodsPayforSuccessStr+='<a href="#" class="pull-left"><img src="'+path+'" alt=""/></a>';
			 goodsPayforSuccessStr+='<a href="goods-details.html?pid='+goods_link+'"><h3>'+title+'</h3></a>';           
			// goodsPayforSuccessStr+='<p class="text-gray">价值：￥<em>'+marketprice+'</em></p>';  
			 goodsPayforSuccessStr+='</td>';               
			 //goodsPayforSuccessStr+='<td class="price text-center">'+remain_count+'</td>';              
			 goodsPayforSuccessStr+='<td class="text-center">'+parseInt(attend_count)+'</td>';    
			         
			 //goodsPayforSuccessStr+='<td class="text-left"><p style="word-break:break-all;word-wrap:break-word;" class="nomargin text-left">'+trueAttendCode+'</p></td>';  
			 if(attend_count<=7){
			   goodsPayforSuccessStr+='<td><p class="word-break nomargin">'+trueAttendCode_min+'</p</td>';
			  }
			  else{
				  //goodsPayforSuccessStr+='<td><p class="word-break nomargin">'+trueAttendCode2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder mypopover margin-l-10" title="本次参与'+parseInt(attend_count)+'人次" data-content="'+trueAttendCode+'" data-trigger="focus" data-placement="left" data-toggle="popover"> 查看全部</button></p</td>';
				  goodsPayforSuccessStr+='<td><p class="word-break nomargin">'+trueAttendCode2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder margin-l-10 mypopover" id="mypopover'+i+'" data-placement="left" data-toggle="popover"> 查看全部</button></p</td>';
				  //右侧弹出参与次数
					goodsPayforSuccessStr+='<div id="popover-head'+i+'" class="hide popover-head">';
					
				   goodsPayforSuccessStr+='<span>本次参与<em>'+parseInt(attend_count)+'</em>人次</span>';
				   goodsPayforSuccessStr+='</div>';  
				   goodsPayforSuccessStr+='<div id="popover-content'+i+'" class="hide popover-content">';    
				   goodsPayforSuccessStr+='<p>'+trueAttendCode+'</p>'; 
				   goodsPayforSuccessStr+='</div>';
			  }
			 
			 
			 goodsPayforSuccessStr+='</tr>';
			 
			 attCount+=parseInt(attend_count);
			
		}
		 
		 $("#attCount").html(attCount);//一共参与人次
		// var attendCodeBox=list['attendCode'];
		//人气推荐
		 var HotList=data['hotProduct']; 
		 if(HotList.length<=0){
			 $("#hotList").html('<p class="text-center margin-t-b-40">没有更多推荐。</p>');
		  }else{
			  var hotlListStr='';
			  for(i=0;i<HotList.length;i++){
				  var lottery_id=HotList[i]['lottery_id'];
				  var pid=HotList[i]['pid'];
				  var need_count=HotList[i]['need_count'];
				  var attend_count=HotList[i]['attend_count'];
				  var attend_limit=HotList[i]['attend_limit'];
				  var max_attend_limit=HotList[i]['max_attend_limit'];
				  var title=HotList[i]['title'];
				  var path=data['host']+HotList[i]['path'];
				  var progress='';
				  if(need_count<1){
					  progress=0;
				   }else{
					  progress=(attend_count/need_count)*100;
					   }
				  var remain=need_count-attend_count;
				  var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值
				  
				  hotlListStr+='<div class="col-md-3 col-sm-3 goods-listBorder">';
				  hotlListStr+='<div class="product-item">';
				  hotlListStr+='<div class="product-img text-center">';
				  hotlListStr+='<a href="goods-details.html?pid='+goods_link+'" target="_blank">';
				  hotlListStr+='<img src="'+path+'" alt="'+title+'">';
				  hotlListStr+='</a>';
				  hotlListStr+='</div>';
				  hotlListStr+='<h3 class="product-title margin-b-5"><a href="goods-details.html?pid='+goods_link+'" target="_blank">'+title+'</a></h3>';
				  hotlListStr+='<p>价值：￥'+need_count+'</p>';
				  hotlListStr+='<div>';
				  hotlListStr+='<div class="progress cg-progress">';
				  hotlListStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%">';
				  hotlListStr+='<span class="sr-only">'+progress+'% Complete (warning)</span>';
				  hotlListStr+='</div>';
				  hotlListStr+='</div>';
				  hotlListStr+='</div>';
				  
				  hotlListStr+='<p>';
				  hotlListStr+=''+attend_count+'/'+need_count+'';
				  hotlListStr+='<span class="text-danger">(剩余'+remain+'人次)</span>';
				  hotlListStr+='</p>';
				  
				  hotlListStr+='<div class="review">';
				  hotlListStr+='<a href="javascript:;" onClick="goToCar('+lottery_id+','+pid+','+1+');"><button type="button" class="btn btn-danger cg-btn-danger btn-go cg-btn-radius">立即参与</button></a>';
				  hotlListStr+='<button type="button" class="btn btn-add cg-btn-radius cg-btn-empty" onClick="addToCar('+lottery_id+','+pid+','+1+');"></button>';
				  hotlListStr+='</div>';
				  
				  hotlListStr+='</div>';
				  hotlListStr+='</div>';
			  } 
		  }
					   
		 $("#hotList").html(hotlListStr);
		 /*显示购物按钮*/
		/* $(".product-item").hover(function(){

			$(this).find('div.review').stop(false,true).fadeIn(300);
		   },function(){

			 $(this).find('div.review').stop(false,true).fadeOut(100);
		   }); */
		  //点击加入购物车按钮时显示+1
		 $(".btn-add").click(function() {
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
		  
		 
		 //$("#tip").text(tip);
		 $("#tip").text('支付成功，已获得幸运码');
						
		 if(getLottery.length<=0){
			  var nullStr='';
			  nullStr+='<tr>'
			  nullStr+='<td colspan="6"><p class="text-center margin-t-b-40">您已完成了此次交易，<a href="index.html" class="text-danger">返回首页</a>，或者点击查看<a href="personal-index.html?per_market=1" class="text-danger">参与记录</a>，<a href="personal-index.html?per_market=2" class="text-danger">中奖记录</a></p></td>';
			  nullStr+='</tr>'
			  $("#goodsPayforSuccess").html(nullStr); 
			  $("#attCount").parent().hide();
		  }else{
			  $("#goodsPayforSuccess").html(goodsPayforSuccessStr);
			  
			  }
		 //自定义popover显示的内容
		 $('.mypopover').popover({
			 trigger:'click',
			 html : true,
			 title: function() {
				 var idnum=parseInt($(this).attr("id").replace(/[^0-9]/ig,""));
				 return $("#popover-head"+idnum+"").html();
			 },
			 content: function() {
				 var idnum=parseInt($(this).attr("id").replace(/[^0-9]/ig,""));
				 return $("#popover-content"+idnum+"").html();
			 }
		 }).on('show.bs.popover', function () { //展示时,关闭非当前所有弹窗
			 $(this).parent().parent().parent().siblings().find('.popover').popover('hide');
		 });

		 //给Body加一个Click监听事件,监听点击按钮
		 $('body').on('click', function(event) {
			 var target = $(event.target);
			 //弹窗内部点击不关闭
			 if (!target.hasClass('popover')
				 && target.parents('.popover-content').length === 0
				 && target.parents('.popover-title').length === 0
				 && target.parent('.popover').length === 0
				 && target.data("toggle") !== "popover"
			 )
			 {
				 //弹窗触发列不关闭，否则显示后隐藏
				 $('.popover').popover('hide');
			 }
		 });
		 
		 $(".loading").empty();
		 },
	 complete:function(){
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