
//var userId = $.cookie('userId');

//$("#attend_count").html(attend_count);//参与人数,从商品列表中传过来的参数，放在success里面会有冲突
	
	
/**************在查看用户信息中，，，部分接口的还没有获取uid字段，，，，， 2016-1-11******************/	
	
//定义全局变量

var index=0;
var global_attend_limit;//最低参与次数 例如
var global_max_attend_limit;//每次参与次数最高限制 例如 10  就每次不能超过10
var global_remain;// 剩余参与次数
var global_a_pageCount;
var global_p_pageCount;
//var picReg=/^http[\s\S]*$/;//判断图片图片是否包含http，包含的就是第三方登录的头像
function getHref(){

	$.ajax({  
	
	  type:'post',  
	  url:''+ajaxUrl+'/Home/Index/pDetailById',  
	  data:{
		 pid:pid,
		 uid:userId,
		 //lotteryId:lottery_id,
		 
		 a_pageIndex:index,
		 a_pageSize:20,
	     p_pageIndex:0,
		 p_pageSize:1
		 },  
	  cache:false,  
	  dataType:'json', 
	  timeout:60000, 
	  beforeSend: function(){
		   $(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
		  },
	  success:function(data){ 

	     var p_pageCount=data['p_pageCount']; 
	       global_p_pageCount=p_pageCount;
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
			
			
	       var imgSrc=data['host']+data['detail']['pics'][0]['path'];//商品放大镜
		   
	       var imgStr1='';
		   var imgStr2='';
		   var imgStr3='';
		   var goodsTitle='';//标题
		   var progressStr='';//进度条
		   var luckyCodeStr='';
			  // luckyCodeStr0='';
			   
			   
		   imgStr1+='<a href="'+imgSrc+'">';
		   imgStr1+='<img src="'+imgSrc+'" alt="'+imgSrc+'" rel="'+imgSrc+'" class="jqzoom" />';
           imgStr1+='</a>';   
		   imgStr1+='<li class="tb-selected">';
		   imgStr1+='<div class="tb-pic tb-s40">';
		   imgStr1+='<a href="javascript:;">';
		   imgStr1+='<img src="'+imgSrc+'" mid="'+imgSrc+'" big="'+imgSrc+'">';
		   imgStr1+='</a>';
		   imgStr1+='</div>';
		   imgStr1+='</li>';

	       for(var i=0;i<data['detail']['pics'].length;i++){
			   imgStr2+='<li>';
			   imgStr2+='<div class="tb-pic tb-s40">';
			   imgStr2+='<a href="javascript:;">';
			   imgStr2+='<img src="'+data['host']+data['detail']['pics'][i]['path']+'" mid="'+data['host']+data['detail']['pics'][i]['path']+'" big="'+data['host']+data['detail']['pics'][i]['path']+'">';
			   imgStr2+='</a>';
               imgStr2+='</div>';   
               imgStr2+='</li>';     
			   
			   }
		   var myAttend_countCount=0;//定义全局变量，我参与的总数，是根据每次参与的数量的参与的次数相加  
		   var startCode=data['startCode'];//幸运码的前缀，类似1000000，获取此字段和后面的幸运码组装成类似10000002的新数字
		   
		   var category=data['detail']['product'][0]['category'];//当前位置
		   $("#nowPosition").html(category);

		   for(var i=0;i<data['luckyCode'].length;i++){//幸运码
		       var myAttend_count =Number(data['luckyCode'][i]['attend_count']);
			   myAttend_countCount+=myAttend_count;//赋值给全局变量
			   var lucky_code=data['luckyCode'][i]['lucky_code'];
		           
				  
					  //var newCreate_timeAtt_0 =$.myTime.UnixToDate(data['luckyCode'][i]['create_time'],true);//使用时间插件来初始化时间 
					  //时间戳格式化
					  /*var timestamp_0 = data['luckyCode'][i]['create_time'];
					  var newDate_0 = new Date();
					  newDate_0.setTime(timestamp_0 * 1000);
					  var newCreate_timeAtt_0=newDate_0.format('yyyy-MM-dd h:m:s');*/
					  
					 
					  var trueAttendCode='';//把startCode分离出来，然后以分号连接成一个新数字
				      var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
					  for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
						 trueAttendCode+=(startCode+Number(s[j]))+'，';
						   
					  }//把startCode分离出来，然后以分号连接成一个新数字
			          trueAttendCode=trueAttendCode.substring(0,trueAttendCode.length-1);//去掉最后一个分号
					 
					 // alert(trueAttendCode);
					 // luckyCodeStr0+='<span>'+trueAttendCode+'</span>';//未弹出框前的参与码不需要显示
					  luckyCodeStr+='<div class="well nomargin">';
					  luckyCodeStr+='<p class="text-gray2">'+data['luckyCode'][i]['create_time']+'</p>';//创建时间
					  luckyCodeStr+='<p class="word-break">'+trueAttendCode+'</p>';//幸运码,弹出框中的
					  luckyCodeStr+='</div>';
			   
			   }
			   
			   	
			   var myAttend_countStr='';//我参与的次数
			   myAttend_countStr+=''+myAttend_count+'';
		 
		      // goodsTitle+=''+title+'';//标题
			   
			   var attendList='';//清空TR内容
			   //alert(data['attendList'].length);
			   if(data['attendList'].length==0){
				   attendList='<tr><td colspan="5" style="text-align:center">还没有参与记录哦，赶快来参与吧</td></tr>';
				   }
				   
				else{	
				      
				       for(var i=0;i<data['attendList'].length;i++){//参与记录
					  
					  //var newCreate_timeAtt =$.myTime.UnixToDate(data['attendList'][i]['create_time'],true);//使用时间插件来初始化时间
						
						var lucky_code=data['attendList'][i]['lucky_code'];
						var uid=data['attendList'][i]['uid'];
						var pic_host=data['pic_host'];
						var path=data['attendList'][i]['path'];
						var nickname=data['attendList'][i]['nickname'];
						
						//时间戳格式化
						/*var timestamp_1 = data['attendList'][i]['create_time'];
						var newDate_1 = new Date();
						newDate_1.setTime(timestamp_1 * 1000);
						var newCreate_timeAtt_1=newDate_1.format('yyyy-MM-dd h:m:s');*/
						
					   
						var trueAttendLucky_code='';//把startCode分离出来，然后以分号连接成一个新数字
						var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
						for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
						   //trueAttendLucky_code+=(startCode+Number(s[j]))+'，';
						   trueAttendLucky_code+='<span class="display-ib">'+(startCode+Number(s[j]))+'</span>';	 
						}//把startCode分离出来，然后以分号连接成一个新数字
						trueAttendLucky_code=trueAttendLucky_code.substring(0,trueAttendLucky_code.length-1);//去掉最后一个分号
					   //rightContentMarking=1为参与记录，2为中奖记录，3为晒单列表
				       var user_uid=uid+'&'+'rightContentMarking='+1;//给链接地址赋值,传递用户ID
						  
						attendList+='<tr>'; 
						attendList+='<td>'+data['attendList'][i]['create_time']+'</td>'; //参与时间
						attendList+='<td class="user-img-table">';
						/*attendList+='<a href="personal-index-other.html?uid='+user_uid+'">';
						attendList+='<img src="'+data['host']+data['attendList'][i]['path']+'" width="25" height="25" alt="'+data['attendList'][i]['nickname']+'">';
						attendList+=''+data['attendList'][i]['nickname']+'';
						attendList+='</a>';*/
						
						//判断中奖用户是不是自己并且是否有头像
						 var p = picHostUrl(pic_host,path);//此函数定义在common.js函数中
						 if(typeof(userId) == "undefined"||uid!=userId){
							attendList+='<a href="personal-index-other.html?uid='+user_uid+'" target="_blank"><img src="'+p+'" width="25" height="25">'+nickname+'</a>';
						  }else{
							  attendList+='<a href="personal-index.html?per_market=1" target="_blank"><img src="'+p+'" width="25" height="25">'+nickname+'</a>';
						  }
						
						attendList+='</td>';
						attendList+='<td>';
						attendList+='<div class="table-hover-btn position-re">'+data['attendList'][i]['attend_count']+'';
						//attendList+='<button  type="button" class="btn btn-default mypopover-btn noborder mypopover" title="本次参与'+data['attendList'][i]['attend_count']+'人次" data-container="body" data-content="'+trueAttendLucky_code+'" data-trigger="focus" data-placement="left" data-toggle="popover"> 查看幸运码</button>';
						attendList+='</div>';
						
					  //右侧弹出参与次数
					    attendList+='<div id="popover-head'+i+'" class="hide popover-head">';
						//判断中奖用户是不是自己并且是否有头像
						 var p = picHostUrl(pic_host,path);//此函数定义在common.js函数中
						 if(typeof(userId) == "undefined"||uid!=userId){
							attendList+='<img src="'+p+'" width="25" height="25">';
						  }else{
							  attendList+='<img src="'+p+'" width="25" height="25">';
						  }
					  // attendList+='<img src="'+data['host']+data['attendList'][i]['path']+'" width="25">'+data['attendList'][i]['nickname']+'';
					   attendList+='<span>本次参与<em>'+data['attendList'][i]['attend_count']+'</em>人数</span>';
					   attendList+='</div>';  
					   attendList+='<div id="popover-content'+i+'" class="hide popover-content">';    
					   attendList+='<p>'+trueAttendLucky_code+'</p>'; 
					   attendList+='</div>';
						
						attendList+='</td>';
						attendList+='<td>';
						//点击查看按钮
						attendList+='<button type="button" id="mypopover'+i+'" class="btn btn-default noborder mypopover" data-placement="left" data-toggle="popover">查看幸运码</button>'
						
						attendList+='</td>';
						attendList+='<td>'+data['attendList'][i]['ip_address']+''+data['attendList'][i]['attend_ip']+'</td>';
						attendList+='<td>'+data['attendList'][i]['attend_device']+'</td>';
						attendList+='</tr>'
					   //参与记录
						
					 }
			   
				}
			   //*****************分页
			   var a_pageCount=data['a_pageCount'];
			   global_a_pageCount=a_pageCount;
			   var paginationStr='';
			       paginationStr+='<li><a href="javascript:;" onClick="preGoods();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
			   for(i=1;i<=a_pageCount;i++){
				   //paginationStr+='<li><a href="javascript:;" onClick="getPageGoods('+(i-1)+');">'+i+'</a></li>';
				    if((i-1)==index_attend){
					  paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					 }else{
						  paginationStr+='<li><a href="javascript:;" onClick="getPageGoods('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						 }
				}
			       paginationStr+='<li><a href="javascript:;" onClick="nextGoods();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
				   
			    //*****************分页
			   if(a_pageCount==0){
					$("#pagination").parent().hide();
				}  
				else{
					$("#pagination").html(paginationStr);//翻页
					$("#a_pageCount").html(a_pageCount);//页码总数
				}	
			   //$("#pagination").html(paginationStr);
			   //$("#a_pageCount").html(a_pageCount);//页码总数
			   
			   var lottery_id=data['detail']['product'][0]['lottery_id'];
			   //把期号写入cookie，退出登录时清除cookie
			   $.cookie('glo_lottery_id',''+lottery_id+'',{ expires:1, path: '/' }); 
			   $("#lottery_id").html(lottery_id);//期号
			   
			   var title=data['detail']['product'][0]['title'];//标题
			   var parameters=data['detail']['product'][0]['parameters'];//副标题
			   var need_count=data['detail']['product'][0]['need_count'];//需要参与的总人次
			   var attend_count=data['detail']['product'][0]['attend_count'];//已经参与的人次
			   var attend_limit=data['detail']['product'][0]['attend_limit'];//最低参与次数 例如
			   global_attend_limit=attend_limit;//全局变量
			   var max_attend_limit=data['detail']['product'][0]['max_attend_limit'];//每次参与次数最高限制 例如 10  就每次不能超过10
			   global_max_attend_limit=max_attend_limit;//全局变量
			   var last_attend_time=data['detail']['product'][0]['last_attend_time'];
		       var progress='';
			   if(need_count<1){//进度条
				  progress=0;
			   }else{
				  progress=(attend_count/need_count)*100;
				   }
			  var remain=need_count-attend_count;
			     global_remain=remain; //全局变量 剩余参与次数
				 
			  //rightContentMarking=1为参与记录，2为中奖记录，3为晒单列表
			  var user_uid=uid+'&'+'rightContentMarking='+3;//给链接地址赋值,传递用户ID	 
			  
			  /*进度条*****progressStr已经在上面定义有了*/
			   progressStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%">';//进度条
			   progressStr+='<span class="sr-only">'+progress+'% Complete (warning)</span>';	
			   progressStr+='</div>';
			
			   
			   $("#goodsTitle").html(''+title+'<span class="text-danger">'+parameters+'</span>');//标题等于主标题加副标题
		       $("title").html(''+title+parameters+'-橙果云购');
			   $("#need_count").html(need_count);//总需人数
			   $("#attend_count").html(attend_count);//总需人数
			   $("#remain").html(remain);//剩余人数
			   $("#progress").html(progressStr);//进度条
			   //$("#luckyCode0").prepend(luckyCodeStr0);//参与码不需要显示
			   if(myAttend_countCount<1){
				   $("#takein").html('<span class="top-triangle"></span><p class="nomargin text-center" style="font-size:14px;">您还没有参与本次夺宝哦！</p>');
				   }else{
					   
					   $("#luckyCode").prepend(luckyCodeStr);//参与码
					   $("#myAttend_count").html(myAttend_countCount);//我参与次数
					   $("#myAttend_count2").html("一共参与了<span class='text-danger' style='padding:0 3px'>"+myAttend_countCount+"</span>人次");//我参与次数 
				   }
			   
			   
			   
			   $("#first-img").html(imgStr1);	 //第一张图放大镜
			   $("#thumblist").html(imgStr3);//放大镜列表
			   $("#thumblist").append(imgStr2);	//放大镜列表
			  // $("#addTocarBtn").attr("onClick","addToCar("+lottery_id+","+pid+","+1+");");//加入购物车按钮
			   $("#attendList").html(attendList);//参与列表
			   //$("#pagination").html(paginationStr);//页码
			   $("#content").html(data['detail']['product'][0]['content']);
			  // alert(data['detail'][0]['content']);
			   /*商品放大镜******等DOM结构完全加载才执行******/
			   
			  $(".jqzoom").imagezoom();
				$("#thumblist li a").click(function(){
					$(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
					$(".jqzoom").attr('src',$(this).find("img").attr("mid"));
					$(".jqzoom").attr('rel',$(this).find("img").attr("big"));
				});

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
					  $(this).parent().parent().siblings().find('.popover').popover('hide');
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
				
			/*************开奖信息******商品详情右侧*******/	
			var prizeListStr='';
			var prizeList=data['prize']['prizeList'];	
			var prizeUser=data['prize']['prizeUser'];	

			if(data['prize']['prizeList'].length==0||data['prize']['prizeUser'].length==0){
				 prizeListStr='<p class="text-center">还没有开奖信息哦！</p>';
				}
			else{	 
				  //for(i=0;i<prizeList.length;i++){
					  var lottery_id=prizeList['lottery_id'];
					  var uid=prizeList['uid'];
					  var pidU=prizeList['pid'];
					  var lottery_code=Number(prizeList['lottery_code']);
					  var need_count=prizeList['need_count'];
					  var attend_count=prizeList['attend_count'];
					  var hour_lottery=prizeList['hour_lottery'];//暂时不需要
					  var total_time=prizeList['total_time'];//总时间，需要传到已经揭晓的页面中去
					  var lottery_time=prizeList['lottery_time'];//揭晓时间
					  var last_attend_time=prizeList['last_attend_time'];//最后参与时间，暂时不用
					  var create_time=prizeList['create_time'];//夺宝时间
					  var ip_address=prizeList['ip_address'];
					  //var uid=prizeUser['uid'];
					  var nickname=prizeUser['nickname'];
					  var pic_host=data['pic_host'];
					  var path=pic_host+prizeUser['path'];
					  
					  // var newCreate_time =$.myTime.UnixToDate(create_time,true);//使用时间插件来初始化时间
					   
					  // var newLottery_time =$.myTime.UnixToDate(lottery_time,true);//使用时间插件来初始化时间
					   
					   //时间戳格式化
					   //创建时间
					  /*var timestamp_2 = create_time;
					  var newDate_2 = new Date();
					  newDate_2.setTime(timestamp_2 * 1000);
					  var newCreate_time_2=newDate_2.format('yyyy-MM-dd h:m:s');*/
					  //揭晓时间
					  var timestamp_3 = lottery_time;
					  var newDate_3 = new Date();
					  newDate_3.setTime(timestamp_3 * 1000);
					  var newLottery_time_3=newDate_3.format('yyyy-MM-dd hh:mm:ss.SS');
					  //rightContentMarking=1为参与记录，2为中奖记录，3为晒单列表
				      var user_uid=uid+'&'+'rightContentMarking='+2;//给链接地址赋值,传递用户ID
					  
					  var goods_link=pidU+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
					   
					  
					  prizeListStr+='<div class="clearfix lottery-carousel">';
					  prizeListStr+='<a href="javascript:;" onClick="prePrize();" class="pop_pri position-re">';
					  prizeListStr+='<span class="glyphicon glyphicon-chevron-left"></span>';
					 
					  prizeListStr+='</a>';
					  
					  prizeListStr+='<span>期号：'+lottery_id+'</span>';   
					  prizeListStr+='<a href="javascript:;" onClick="nextPrize();" class="pop_pri position-re">';   
					  prizeListStr+='<span class="glyphicon glyphicon-chevron-right"></span>';   
					  
					  prizeListStr+='</a>';      
					  prizeListStr+='</div>';           
				   //   prizeListStr+='<div class="input-group lottery-search">';         
				   //   prizeListStr+='<span class="input-group-addon">期号：</span>';        
					//  prizeListStr+='<input type="text" class="form-control" placeholder="请输入期号">';        
				   //   prizeListStr+='<span class="input-group-btn">';       
				   //   prizeListStr+='<button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>';       
					  //prizeListStr+='</span>';       
					 // prizeListStr+='</div>';  
					 var p = picHostUrl(pic_host,path);//此函数定义在common.js函数中
					 if(typeof(userId) == "undefined"||uid!=userId){
						prizeListStr+='<div class="user-img"><a href="personal-index-other.html?uid='+user_uid+'" target="_blank"><img src="'+p+'" width="100" alt="'+nickname+'"></a></div>';
					  }else{
						  prizeListStr+='<div class="user-img"><a href="personal-index.html?per_market=2" target="_blank"><img src="'+p+'" width="100" alt="'+nickname+'"></a></div>';
					  }
					  
					  
					  //prizeListStr+='<div class="user-img"><a href="personal-index-other.html?uid='+user_uid+'"><img src="'+path+'" width="100" alt="'+nickname+'"></a></div>';       
					  prizeListStr+='<div class="user-info">';       
					  prizeListStr+='<ol>';    
					  //prizeListStr+='<li class="info-head">恭喜<span class="link-blue">'+nickname+'</span>（'+ip_address+'）获奖</li>';
					  prizeListStr+='<li class="info-head">恭喜';  
					  if(typeof(userId) == "undefined"||uid!=userId){
						  prizeListStr+='<a href="personal-index-other.html?uid='+user_uid+'" class="link-blue" target="_blank">'+nickname+'</a>'; 
						  }else{
							  prizeListStr+='<a href="personal-index.html?per_market=2" class="link-blue" target="_blank">'+nickname+'</a>'; 
							  }
					  prizeListStr+='（'+ip_address+'）获奖</li>';    
					  prizeListStr+='<li class="info-head">用户ID：<span class="">'+uid+'</span>（用户唯一不变标识）</li>';       
					  prizeListStr+='<li class="info-head">获奖幸运码：<span class="text-danger">'+(startCode+lottery_code)+'</span></li>';
					  prizeListStr+='<li class="info-head">本期参与：<span class="text-danger">'+attend_count+'</span>人次</li>';             
					  prizeListStr+='<li class="info-head">揭晓时间：'+newLottery_time_3+'</li>';         
					  prizeListStr+='<li class="info-head">夺宝时间：'+create_time+'</li>';          
					  prizeListStr+='</ol>';             
					  prizeListStr+='</div>';         
					  prizeListStr+='<div class="text-center"><a href="ready-publish.html?pid='+goods_link+'" class="btn cg-btn-default" target="_blank">查看详情</a></div>';   
					  prizeListStr+='<div class="position-ab nomoreTip" id="preTip">前面没有更多了';
					  prizeListStr+='</div>';
					  prizeListStr+='<div class="position-ab nomoreTip" id="nextTip">后面没有更多了';
					  prizeListStr+='</div>';            
                  
			  }
		//	 }
			  $("#lottery-content").html(prizeListStr);	
			 
			  
              /*****评论晒单***********/
			  var disList=data['disList'];
			  //var disList_count=data['disList']['count'];
			  var display=disList['display'];
			  var disList_user_count=display.length;
			  var disListStr='';
			  for(i=0;i<display.length;i++){
				  var pic_host=data['pic_host']; 
				  var lottery_id= display[i]['lottery_id'];
				  var titlename= display[i]['title'];
				  var description= display[i]['description'];
				 // var picsid= display[i]['picsid'];
				  var apply_time= display[i]['apply_time'];//发布时间
				  var uid=display[i]['uid'];//用户id
				  //var newCreate_time =$.myTime.UnixToDate(create_time,true);//使用时间插件来初始化时间
				  
				  //时间戳格式化
				   //创建时间
				  /*var timestamp_5 = create_time;
				  var newDate_5 = new Date();
				  newDate_5.setTime(timestamp_5 * 1000);
				  var newCreate_time_5=newDate_5.format('yyyy-MM-dd hh:mm:ss.SS');*/
				  
				  var nickname= display[i]['nickname'];
				  var userPath=display[i]['path'];
				 // var picsid=display[i]['picsid'];//评论图片，以逗号隔开
				  var pics=display[i]['pics'];//评论图片，以逗号隔开
				  var truePicsid='';//把startCode分离出来，然后以分号连接成一个新数字
				  var s=pics.split(',');//遍历以逗号相隔的字符串
				   //rightContentMarking=1为参与记录，2为中奖记录，3为晒单列表
				   
				   //还需要获取uid字段
				 // var user_uid=uid+'&'+'rightContentMarking='+3;//给链接地址赋值,传递用户ID
				  var user_uid=uid+'&'+'nickname='+escape(nickname)+'&'+'rightContentMarking='+3;//给链接地址赋值,传递用户ID
				  disListStr+='<div class="media">';
				  disListStr+='<div class="media-left">';
				  //判断中奖用户是不是自己并且是否有头像
				  /*if(userPath==pic_host){
						 if(typeof(userId) == "undefined"||uid!=userId){
							 disListStr+='<a href="personal-index-other.html?uid='+user_uid+'" target="_blank"><img src="images/default1.png" alt="'+nickname+'" width="25" height="25"/></a>';
						  }else{
							  disListStr+='<a href="personal-index.html?per_market=3" target="_blank"><img src="images/default1.png" alt="'+nickname+'" width="25" height="25"/></a>';
						  }
					  
				   }else{
						 if(typeof(userId) == "undefined"||uid!=userId){
							 disListStr+='<a href="personal-index-other.html?uid='+user_uid+'" target="_blank"><img src="'+userPath+'" alt="'+nickname+'" width="25" height="25"/></a>';
						  }else{
							  disListStr+='<a href="personal-index.html?per_market=3" target="_blank"><img src="'+userPath+'" alt="'+nickname+'" width="25" height="25"/></a>';
						  } 
					  
				   }*/
				   //判断中奖用户是不是自己并且是否有头像
				   var p = picHostUrl(pic_host,userPath);//此函数定义在common.js函数中
				   if(typeof(userId) == "undefined"||uid!=userId){
					   
					  disListStr+='<div class="user-img"><a href="personal-index-other.html?uid='+user_uid+'" target="_blank"><img src="'+p+'" width="25" height="25"></a></div>';
					}else{
						
						disListStr+='<div class="user-img"><a href="personal-index.html?per_market=3" target="_blank"><img src="'+p+'" width="25" height="25"></a></div>';
					}
				  
				  
				  //disListStr+='<a href="personal-index-other.html?uid='+user_uid+'"><img class="media-object" src="'+userPath+'" width="60" alt=""></a>';
                  disListStr+='</div>';          
                  disListStr+='<div class="media-body">';            
                  //disListStr+='<h4 class="media-heading">'+nickname+' <span class="text-gray">'+apply_time+'</span></h4>
				  disListStr+='<h4 class="media-heading">';   
				  if(typeof(userId) == "undefined"||uid!=userId){
					   disListStr+='<a href="personal-index-other.html?uid='+user_uid+'" class="link-blue" target="_blank">'+nickname+'</a>'; 
					   }else{
						    disListStr+='<a href="personal-index.html?per_market=3" class="link-blue" target="_blank">'+nickname+'</a>'; 
						   }  
				  disListStr+='<span class="text-gray">'+apply_time+'</span></h4>';                  
				  disListStr+='<p class="qishu">第'+lottery_id+'期晒单 <span>'+titlename+'</span></p>';
                  disListStr+=''+description+'';    
				        
                  /*disListStr+='<ul class="piccon">';    
				   for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I         
                        disListStr+='<li><a href="javascript:;" rel="'+pic_host+s[j]+'" class="preview"><img src="'+pic_host+s[j]+'" alt="缩略图" width="100" height="75"></a></li>';   
						
				   }
                  disListStr+='</ul>';*/  
				  if(pics.length>0){
					disListStr+='<ul class="piccon">';
					     for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I         
							  disListStr+='<li><a href="javascript:;" rel="'+pic_host+s[j]+'" class="preview"><img src="'+pic_host+s[j]+'" alt="缩略图" width="100" height="75"></a></li>';   
							 
						 }
					disListStr+='</ul>'; 	 
				  }
				      
                  disListStr+='</div>';              
                  disListStr+='</div>';           
                            
                       
				}
				$("#disList_user_count").html(disList_user_count);
				  /*start 用户评论条数*/
				  /*if(disList_count>0){
				     $("#disList_count").html(disList_count);
				   }else{
				     $("#disList_count").parent().remove();
				   }*/
				  /*end 用户评论条数*/


				
				$("#commentContent").append(disListStr);
				imagePreview();//调用小图显示大图插件
				
	          $(".loading").empty();
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
      });
	
	}
	
getHref();	

//右侧开奖信息的翻页功能，每页只有一条数据，不需要for循环，每点击一次翻页调用一次接口
var prize_index=0;
function prizeList(prize_index_2){
  var	prize_index_b=prize_index_2;
  
  if(prize_index<0){

		$("#preTip").css("display","block");
		$("#nextTip").css("display","none");
		$(".pop_pri").blur(function(){
		  $("#preTip").css("display","none"); 
		  $("#nextTip").css("display","none");
		});
		prize_index=0;
		
		return;
	}
  
  
  if(prize_index>(global_p_pageCount-1)){

		$("#nextTip").css("display","block");
		$("#preTip").css("display","none");
		$(".pop_pri").blur(function(){
		  $("#preTip").css("display","none"); 
		  $("#nextTip").css("display","none");
		});
		prize_index=global_p_pageCount-1;
		
		return;
	}
	

	$.ajax({
		type:'post',
		url:''+ajaxUrl+'/Home/Index/prizeLottery',
		data:{
			pid:pid,
			pageSize:1,
			pageIndex:prize_index_b
			},
	    timeout:60000,
		dataType:'json',
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
				var startCode=data['startCode'];
				
				var prizeList=data['prize']['prizeList'];	
				var prizeUser=data['prize']['prizeUser'];	
				var prizeListStr='';
				//for(i=0;i<prizeList.length;i++){
					var lottery_id=prizeList['lottery_id'];
					var uid=prizeList['uid'];
					var lottery_code=Number(prizeList['lottery_code']);
					var need_count=prizeList['need_count'];
					var attend_count=prizeList['attend_count'];
					var hour_lottery=prizeList['hour_lottery'];//暂时不需要
					var total_time=prizeList['total_time'];//总时间，需要传到已经揭晓的页面中去
					var lottery_time=prizeList['lottery_time'];//揭晓时间
					var last_attend_time=prizeList['last_attend_time'];//最后参与时间，暂时不用
					var create_time=prizeList['create_time'];//夺宝时间
					var ip_address=prizeList['ip_address'];
					//var uid=prizeUser['uid'];
					var nickname=prizeUser['nickname'];
					var pic_host=data['pic_host'];
					var path=prizeUser['path'];
					
					var pid=prizeList['pid'];
					var user_uid=uid+'&'+'nickname='+escape(nickname)+'&'+'rightContentMarking='+2;//给链接地址赋值,传递用户ID 
					var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
					
					//时间戳格式化
					 //创建时间
					/*var timestamp_2 = create_time;
					var newDate_2 = new Date();
					newDate_2.setTime(timestamp_2 * 1000);
					var newCreate_time_2=newDate_2.format('yyyy-MM-dd h:m:s');*/
					//揭晓时间
					var timestamp_3 = lottery_time;
					var newDate_3 = new Date();
					newDate_3.setTime(timestamp_3 * 1000);
					var newLottery_time_3=newDate_3.format('yyyy-MM-dd hh:mm:ss.SS');
					
					
					 /*prizeListStr+='<a href="javascript:;" data-toggle="popover" data-trigger="focus" data-placement="top" data-content="没有更多数据了"  onClick="prePrize();"><span class="glyphicon glyphicon-chevron-left"></span></a>';
					  prizeListStr+='<span>期号：'+lottery_id+'</span>';      
					  prizeListStr+='<a href="javascript:;" data-toggle="popover" data-trigger="focus" data-placement="top" data-content="没有更多数据了"  onClick="nextPrize();"><span class="glyphicon glyphicon-chevron-right"></span></a>';  */
					  
					prizeListStr+='<div class="clearfix lottery-carousel">';
					//prizeListStr+='<a href="javascript:;" data-toggle="popover" data-trigger="focus" data-placement="top"  data-content="没有更多数据了" onClick="prePrize();" class="pop_pri"><span class="glyphicon glyphicon-chevron-left"></span></a>';
					prizeListStr+='<a href="javascript:;" onClick="prePrize();" class="pop_pri position-re">';
					prizeListStr+='<span class="glyphicon glyphicon-chevron-left"></span>';
					prizeListStr+='</a>';
					prizeListStr+='<span>期号：'+lottery_id+'</span>';      
					//prizeListStr+='<a href="javascript:;" data-toggle="popover" data-trigger="focus" data-placement="top"  data-content="没有更多数据了" onClick="nextPrize();" class="pop_pri"><span class="glyphicon glyphicon-chevron-right"></span></a>';   
					prizeListStr+='<a href="javascript:;" onClick="nextPrize();" class="pop_pri position-re">';
					prizeListStr+='<span class="glyphicon glyphicon-chevron-right"></span>';
					prizeListStr+='</a>';
					prizeListStr+='</div>';           
					//prizeListStr+='<div class="input-group lottery-search">';         
					//prizeListStr+='<span class="input-group-addon">期号：</span>';        
					//prizeListStr+='<input type="text" class="form-control" placeholder="请输入期号">';        
					//prizeListStr+='<span class="input-group-btn">';       
					//prizeListStr+='<button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>';       
					//prizeListStr+='</span>';       
					//prizeListStr+='</div>';  
					
					 var p = picHostUrl(pic_host,path);
					 if(typeof(userId) == "undefined"||uid!=userId){
						prizeListStr+='<div class="user-img"><a href="personal-index-other.html?uid='+user_uid+'" target="_blank"><img src="'+p+'" width="100" alt="'+nickname+'"></a></div>';
					  }else{
						  prizeListStr+='<div class="user-img"><a href="personal-index.html?per_market=2" target="_blank"><img src="'+p+'" width="100" alt="'+nickname+'"></a></div>';
					  }
						
					 
					//prizeListStr+='<div class="user-img"><a href=#><img src="'+path+'" width="100" alt="'+nickname+'"></a></div>';       
					prizeListStr+='<div class="user-info">';       
					prizeListStr+='<ol>';    
					//prizeListStr+='<li class="info-head">恭喜<span class="link-blue">'+nickname+'</span>（'+ip_address+'）获奖</li>'; 
					prizeListStr+='<li class="info-head">恭喜';  
					if(typeof(userId) == "undefined"||uid!=userId){
						prizeListStr+='<a href="personal-index-other.html?uid='+user_uid+'" class="link-blue" target="_blank">'+nickname+'</a>'; 
						}else{
							prizeListStr+='<a href="personal-index.html?per_market=2" class="link-blue" target="_blank">'+nickname+'</a>'; 
							}
					 
					
					prizeListStr+='（'+ip_address+'）获奖</li>';     
					prizeListStr+='<li class="info-head">用户ID：<span class="">'+uid+'</span>（用户唯一不变标识）</li>';       
					prizeListStr+='<li class="info-head">获奖幸运码：<span class="text-danger">'+(startCode+lottery_code)+'</span></li>';
					prizeListStr+='<li class="info-head">本期参与：<span class="text-danger">'+attend_count+'</span>人次</li>';             
					prizeListStr+='<li class="info-head">揭晓时间：'+newLottery_time_3+'</li>';         
					prizeListStr+='<li class="info-head">夺宝时间：'+create_time+'</li>';          
					prizeListStr+='</ol>';             
					prizeListStr+='</div>';         
					prizeListStr+='<div class="text-center"><a href="ready-publish.html?pid='+goods_link+'" class="btn cg-btn-default" target="_blank">查看详情</a></div>'; 
					
					prizeListStr+='<div class="position-ab nomoreTip" id="preTip">前面没有更多了';
					prizeListStr+='</div>';
					prizeListStr+='<div class="position-ab nomoreTip" id="nextTip">后面没有更多了';
					prizeListStr+='</div>';
					
					$("#lottery-content").html(prizeListStr);	
					
					$(".loading").empty();
				
			}  	
	});
	
}
//上一页

function prePrize(){ 
    prize_index=prize_index-1;
	/*if(prize_index<0){
		
		//prize_index=0;
		
		//return;
	}*/
	
	prizeList(prize_index);
	/*if(prize_index==0){
		$('[data-toggle="popover"]').popover();
		}*/
}
//下一页
function nextPrize(){ 
    prize_index=prize_index+1;
	
	/*if(prize_index>global_p_pageCount-1){
		
		//prize_index=global_p_pageCount-1;
		
		//return;
	}*/
	prizeList(prize_index);
	/*if(prize_index==(global_p_pageCount-1)){
		$('[data-toggle="popover"]').popover();
		}*/
}


//alert(a_pageCount);
//参与记录的翻页功能
var index_attend=0;
function attendList(index_attend){
	var index_attend_b=index_attend;
	$.ajax({  
	  type:'post',  
	  url:''+ajaxUrl+'/Home/Index/attendListById',  
	  data:{
		 lotteryId:lottery_id,
		 pageIndex:index_attend_b,
		 pageSize:20,
	     
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
		       var attendList='';//清空TR内容
			   for(var i=0;i<data['attendList'].length;i++){//参与记录

					//时间戳格式化
					 //创建时间
					/*var timestamp_4 = data['attendList'][i]['create_time'];
					var newDate_4 = new Date();
					newDate_4.setTime(timestamp_4 * 1000);
					var newCreate_time_4=newDate_4.format('yyyy-MM-dd h:m:s');*/
					
					var trueAttendLucky_code='';//把startCode分离出来，然后以分号连接成一个新数字
					  
					//alert(data['attendList'].length);
					var pic_host=data['pic_host'];
					var path=data['attendList'][i]['path'];
					//var path=data['host']+data['attendList'][i]['path'];
					var uid=data['attendList'][i]['uid'];
					var nickname=data['attendList'][i]['nickname'];
					var attend_countList=data['attendList'][i]['attend_count'];
					var lucky_code=data['attendList'][i]['lucky_code'];
					var ip_address=data['attendList'][i]['ip_address'];
					var attend_ip=data['attendList'][i]['attend_ip'];
					var attend_device=data['attendList'][i]['attend_device'];
					var startCode=data['startCode'];//幸运码的前缀，类似1000000，获取此字段和后面的幸运码组装成类似10000002的新数字
					
					var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
					for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
					   //trueAttendLucky_code+=(startCode+Number(s[j]))+'，';
					   trueAttendLucky_code+='<span class="display-ib">'+(startCode+Number(s[j]))+'</span>';  
					}//把startCode分离出来，然后以分号连接成一个新数字
					trueAttendLucky_code=trueAttendLucky_code.substring(0,trueAttendLucky_code.length-1);//去掉最后一个分号
					
                    //rightContentMarking=1为参与记录，2为中奖记录，3为晒单列表
				    var user_uid=uid+'&'+'rightContentMarking='+1;//给链接地址赋值,传递用户ID

					attendList+='<tr>'; 
					attendList+='<td>'+data['attendList'][i]['create_time']+'</td>'; 
					attendList+='<td class="user-img-table">';
					/*attendList+='<a href="personal-index-other.html?uid='+user_uid+'">';
					attendList+='<img src="'+path+'" width="25" height="25" alt="'+nickname+'">';
					attendList+=''+nickname+'';
					attendList+='</a>';*/
					
					 
					 //判断中奖用户是不是自己并且是否有头像
					 var p = picHostUrl(pic_host,path);
					 if(typeof(userId) == "undefined"||uid!=userId){
						attendList+='<a href="personal-index-other.html?uid='+user_uid+'" target="_blank"><img src="'+p+'" width="25" height="25">'+nickname+'</a>';
					  }else{
						  attendList+='<a href="personal-index.html?per_market=1" target="_blank"><img src="'+p+'" width="25" height="25">'+nickname+'</a>';
					  }
					 
					attendList+='</td>';
					attendList+='<td>';
					attendList+='<div class="table-hover-btn position-re">'+attend_countList+'';
					
					//attendList+='<button  type="button" class="btn btn-default mypopover-btn noborder mypopover" title="本次参与'+attend_countList+'人次" data-container="body" data-content="'+trueAttendLucky_code+'" data-trigger="focus" data-placement="left" data-toggle="popover"> 查看幸运码</button>';
					
					attendList+='</div>';
					
					//右侧弹出参与次数
					attendList+='<div id="popover-head'+i+'" class="hide popover-head">';
					//判断中奖用户是不是自己并且是否有头像
					 var p = picHostUrl(pic_host,path);//此函数定义在common.js函数中
					 if(typeof(userId) == "undefined"||uid!=userId){
						attendList+='<img src="'+p+'" width="25" height="25">';
					  }else{
						  attendList+='<img src="'+p+'" width="25" height="25">';
					  }
				  // attendList+='<img src="'+data['host']+data['attendList'][i]['path']+'" width="25">'+data['attendList'][i]['nickname']+'';
				   attendList+='<span>本次参与<em>'+data['attendList'][i]['attend_count']+'</em>人数</span>';
				   attendList+='</div>';  
				   attendList+='<div id="popover-content'+i+'" class="hide popover-content">';    
				   attendList+='<p>'+trueAttendLucky_code+'</p>'; 
				   attendList+='</div>'; 
					
					attendList+='</td>';
					attendList+='<td>';
					//点击查看按钮
					attendList+='<button type="button" id="mypopover'+i+'" class="btn btn-default noborder mypopover" data-container="body" data-placement="left" data-toggle="popover">查看幸运码</button>'
					
					attendList+='</td>';
					attendList+='<td>'+ip_address+''+attend_ip+'</td>';
					attendList+='<td>'+attend_device+'</td>';
					attendList+='</tr>'
				   //	//参与记录
				  
			   }
		      //*****************分页
			   var a_pageCount=data['a_pageCount'];
			   //global_a_pageCount=a_pageCount;
			   var paginationStr='';
			       paginationStr+='<li><a href="javascript:;" onClick="preGoods();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
			   for(i=1;i<=global_a_pageCount;i++){
				   //paginationStr+='<li><a href="javascript:;" onClick="getPageGoods('+(i-1)+');">'+i+'</a></li>';
				    if((i-1)==index_attend){
					  paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					 }else{
						  paginationStr+='<li><a href="javascript:;" onClick="getPageGoods('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						 }
				}
			       paginationStr+='<li><a href="javascript:;" onClick="nextGoods();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
				   
			    //*****************分页
			   if(global_a_pageCount==0){
					$("#pagination").parent().hide();
				}  
				else{
					$("#pagination").html(paginationStr);//翻页
					$("#a_pageCount").html(a_pageCount);//页码总数
				}
		     
			  $("#attendList").html(attendList);//参与列表
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
				  $(this).parent().parent().siblings().find('.popover').popover('hide');
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

}
//参与记录中的翻页
//页码按钮
function getPageGoods(pos){ 
     index_attend=pos;
	 attendList(index_attend);

	
}
//上一页
function preGoods(){ 
    index_attend=index_attend-1;
	if(index_attend<0){
		index_attend=0;
		return;
	}
	attendList(index_attend)
}
//下一页
function nextGoods(){ 
    index_attend=index_attend+1;
	//alert(global_a_pageCount);
	if(index_attend>(global_a_pageCount-1)){
		index_attend=global_a_pageCount-1;
		return;
	}
	attendList(index_attend)
}
//立即加入购物车按钮
//购物车加减
//取cookie的期号
var glo_lottery_id = $.cookie('glo_lottery_id');
var att_num=$("#count-input").val();
 //输入数字后，input失去焦点后重新赋值（参与数量给立即参与和加入购物车按钮）
 
  $("#count-input").blur(function(att_num){
	  var att_num_blur=$("#count-input").val();
	  var regVerifyNum_find=/^(0|[1-9][0-9]*)$/;//非0开头的数字
	  att_num=att_num_blur;
	  if(!(regVerifyNum_find.test(att_num))){
		  swal({
			  title: "",
			  text: '请输入正确的参与数量。',
			  html: true,
			  type: "error",
			  confirmButtonText:"确定",
			  confirmButtonColor: "#ff4800",
		  }); 
		  
		  $("#count-input").val("1");
		  return;
	   }
	   if(att_num==0){
		   swal({
				title: "",
				text: '请输入正确的参与数量。',
				html: true,
				type: "error",
				confirmButtonText:"确定",
				confirmButtonColor: "#ff4800",
			}); 
			
			$("#count-input").val("1");
			return; 
		}
	  
	  $("#nowAdd").attr("onClick","goToCar_two("+glo_lottery_id+","+pid+","+att_num+");");//立即参与，必须在此，异步，等DOM建立之后
	  $("#addTocarBtn").attr("onClick","addToCar_two("+glo_lottery_id+","+pid+","+att_num+");");//加入购物车按钮
  });


//var att_num=parseInt($("#count-input").val());

//输入数字后，input失去焦点后重新赋值（参与数量给立即参与和加入购物车按钮）
/*$("#count-input").blur(function(att_num){
	var att_num_blur=parseInt($("#count-input").val());
	att_num=att_num_blur;
	$("#nowAdd").attr("onClick","goToCar_two("+lottery_id+","+pid+","+att_num+");");
	$("#addTocarBtn").attr("onClick","addToCar_two("+lottery_id+","+pid+","+att_num+");");//加入购物车按钮
});*/
function add(att_num){
    var attend_count=$("#count-input");
	attend_count.val(parseInt(attend_count.val())+1) 
	att_num=attend_count.val();
		
    $("#nowAdd").attr("onClick","goToCar_two("+glo_lottery_id+","+pid+","+att_num+");");
	$("#addTocarBtn").attr("onClick","addToCar_two("+glo_lottery_id+","+pid+","+att_num+");");//加入购物车按钮

}	

function red(att_num){
   var attend_count=$("#count-input");
   attend_count.val(parseInt(attend_count.val())-1) 
   if(parseInt(attend_count.val())<1){ 
	 attend_count.val(1); 
   } 
   att_num=attend_count.val();
   $("#nowAdd").attr("onClick","goToCar_two("+glo_lottery_id+","+pid+","+att_num+");");
   $("#addTocarBtn").attr("onClick","addToCar_two("+glo_lottery_id+","+pid+","+att_num+");");//加入购物车按钮

}

$("#nowAdd").attr("onClick","goToCar_two("+glo_lottery_id+","+pid+","+att_num+");");//立即参与
$("#addTocarBtn").attr("onClick","addToCar_two("+glo_lottery_id+","+pid+","+att_num+");");//加入购物车按钮
//点击加入购物车按钮时显示+1
 $("#addTocarBtn").click(function() {
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



