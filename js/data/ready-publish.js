// 已经揭晓商品详情

$("#lotteryId").html(lottery_id);
var global_remain;//立即参与，加入购物车传递的变量，最新一期的
var global_attend_limit;//加入购物车的最低参与限制
var global_max_attend_limit;//加入购物车的最高参与限制
var glo_new_lottery_id;//最新一期的期号全局变量
var glo_startcode;//开始码
var glo_ready_lotteryCode;//传递全局变量，开奖码与查看参与码接口中的参与码对比，标红参与码中的开奖码
$.ajax({
	type:'post',
	url:''+ajaxUrl+'/Home/Index/productPrizeByDetail',
	dataType:'json',
	cache:false,
	data:{
		 pid:pid,
		 uid:userId,
		 lotteryId:lottery_id,
		 a_pageIndex:0,
		 a_pageSize:20,
		 p_pageIndex:0,
		 p_pageSize:1//这个必须是1，因为只要一条记录
		},
	beforeSend:function(){
		$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
	},
	success: function(data){
		//alert(data);
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
		var goodsImg=data['host']+data['detail']['pics'][0]['path'];//已经揭晓的商品图片
		//var pid=data['detail']['product'][0]['pid'];//已经揭晓的商品
		var last_attend_time=data['detail']['product'][0]['last_attend_time'];
		var title=data['detail']['product'][0]['title'];
		var content=data['detail']['product'][0]['content'];
		var parameters=data['detail']['product'][0]['parameters'];//小标题
		var startCode=data['startCode'];//开始码
		glo_startcode=startCode;//开始码全局
		//******************期号*********************///
		 var _lottery_id=data['detail']['product'][0]['lottery_id'];
		var category=data['detail']['product'][0]['category']; //当前位置
		$("#nowPosition").html(category);
		
		//var startCode=data['startCode'];
		//var lottery_code=data['detail']['product'][0]['lottery_code'];//幸运码
		//中奖用户信息
		var prizeList=data['prize']['prizeList'];
		//var pri_lottery_id=prizeList[0]['lottery_id'];//期号，不需要获取
		var pri_lottery_code=Number(prizeList['lottery_code']);//开奖幸运码
		var pri_attend_count=prizeList['attend_count'];//本次参与次数
		var pri_lottery_time=prizeList['lottery_time'];//揭晓时间
		var pri_create_time=prizeList['create_time'];//参与时间
		var pri_lucky_code=prizeList['lucky_code'];//所获得的幸运码，以逗号隔开
		var pri_lottery_id=prizeList['lottery_id'];
		var pri_ip_address=prizeList['ip_address'];//ip地址
		var prizeUser=data['prize']['prizeUser'];
		var pri_nickname=prizeUser['nickname'];//用户昵称
		var pic_host=data['pic_host'];
		var pri_path=prizeUser['path'];//用户头像
		var pri_uid=prizeUser['uid'];
		var user_uid=pri_uid+'&'+'nickname='+escape(pri_nickname)+'&'+'rightContentMarking='+2;//给链接地址赋值,传递用户ID 
		//时间戳格式化
		//揭晓时间
		var  time_0= pri_lottery_time;
		var newDate_0 = new Date();
		newDate_0.setTime(time_0 * 1000);
		var pri_time_pri_lottery_time=newDate_0.format('yyyy-MM-dd hh:mm:ss');
		//参与时间
		/*var  time_1= pri_create_time;
		var newDate_1 = new Date();
		newDate_1.setTime(time_1 * 1000);
		var pri_time_pri_create_time=newDate_1.format('yyyy-MM-dd h:m:s');*/
		
		//把startCode分离出来，然后以分号连接成一个新数字
		var pri_trueAttendCode='';
		var s=pri_lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
		for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
		  //把startCode分离出来，然后以分号连接成一个新数字
		  // pri_trueAttendCode+=(startCode+Number(s[j]))+'，';
		   pri_trueAttendCode+='<span class="display-ib padding-r-8">'+(startCode+Number(s[j]))+'</span>';
		}
		
		pri_trueAttendCode=pri_trueAttendCode.substring(0,pri_trueAttendCode.length-1);//去掉最后一个分号
		
		var prizeStr='';
		//var pri_luckyCodeStr='';
		
		if(typeof(userId) == "undefined"||pri_uid!=userId){
		   prizeStr+='<h5>恭喜<a href="personal-index-other.html?uid='+user_uid+'" class="text-danger" target="_blank">'+pri_nickname+'</a>获得了本期商品</h5>';
		   }else{
				prizeStr+='<h5>恭喜<a href="personal-index.html?per_market=2" class="text-danger" target="_blank">'+pri_nickname+'</a>获得了本期商品</h5>';
			   } 
		
		prizeStr+='<p>本期参与：<span class="text-danger">'+pri_attend_count+'</span>人次 <a href="javascript:;" class="text-blue" onClick="alertList('+pri_uid+','+pri_lottery_id+');">点击查看>></a></p>';
		
        prizeStr+='<p>揭晓时间：<span>'+pri_time_pri_lottery_time+'</span></p>';           
        prizeStr+='<p>参与时间：<span>'+pri_create_time+'</span></p>';     
		//弹出框中每次参与的幸运码
		/*pri_luckyCodeStr+='<div class="well nomargin">';
		pri_luckyCodeStr+='<p class="text-gray2">'+pri_create_time+'</p>';//创建时间
		pri_luckyCodeStr+='<p class="word-break">'+pri_trueAttendCode+'</p>';//幸运码,弹出框中的
		pri_luckyCodeStr+='</div>';  */          
	 
	 
	 
	 
	    
		var goodsImgStr='';
		goodsImgStr+='<img src="'+goodsImg+'">';
		$("#goodsImg").html(goodsImgStr);//已经揭晓的商品图片
		$("#title").html(''+title+'<span class="text-danger">'+parameters+'</span>');
		$("title").html(''+title+parameters+'-橙果云购');
		$("#lottery_code").html(startCode+pri_lottery_code);//获奖幸运码
        //传递全局变量，开奖码与查看参与码接口中的参与码对比，标红参与码中的开奖码
		glo_ready_lotteryCode=startCode+pri_lottery_code;
		
		
		//中奖用户信息
		/*if(pri_path==pic_host){
			$("#lucky-img").html('<img src="images/default1.png">');
			}else{
				$("#lucky-img").html('<img src="'+pri_path+'">');
				}*/
		//判断中奖用户是否有头像
		 var p = picHostUrl(pic_host,pri_path);//此函数定义在common.js函数中
		 if(typeof(userId) == "undefined"||pri_uid!=userId){
		        $("#lucky-img").html('<a href="personal-index-other.html?uid='+user_uid+'" target="_blank"><img src="'+p+'"></a>');
		 }else{
			 $("#lucky-img").html('<a href="personal-index.html?per_market=2" target="_blank"><img src="'+p+'"></a>');
			 }
		 
		 
		
		$("#lucky-boy2").html(prizeStr);//未弹出框前的获奖用户的信息
		//$("#myAttend_count2").html("一共参与了<span class='text-danger' style='padding:0 3px'>"+pri_attend_count+"</span>人次");//弹出框中--我参与次数
		//$("#luckyCode").html(pri_luckyCodeStr);//弹出框中幸运码本次所参与所获得的
		
		//参与用户信息
		var myLuckyCode=data['luckyCode'];
		var myAttend_countCount=0;//定义全局变量，我参与的总数，是根据每次参与的数量的参与的次数相加  
		var my_luckyCodeStr='';
		if(myLuckyCode.length==0){
		   $("#myAttend").html('您还没有参与本次夺宝哦！');
		   }else{
			   
			   for(i=0;i<myLuckyCode.length;i++){
				 // var attend_count=myLuckyCode[i]['attend_count'];
				  var myAttend_count =Number(myLuckyCode[i]['attend_count']);
			      myAttend_countCount+=myAttend_count;//赋值给全局变量,我参与的次数
				  
				  /*var my_lucky_code=myLuckyCode[i]['lucky_code'];
				  var my_create_time=myLuckyCode[i]['create_time'];
				  //时间戳格式化
				  //把startCode分离出来，然后以分号连接成一个新数字
				  var my_trueAttendCode='';
				  var s=my_lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
				  for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
					//把startCode分离出来，然后以分号连接成一个新数字
					// my_trueAttendCode+=(startCode+Number(s[j]))+'，';
					 my_trueAttendCode+='<span class="display-ib padding-r-8">'+(startCode+Number(s[j]))+'</span>';
				  }
				  
				  my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号
				  
				  my_luckyCodeStr+='<div class="well nomargin">';
				  my_luckyCodeStr+='<p class="text-gray2">'+pri_create_time+'</p>';//创建时间
				  my_luckyCodeStr+='<p class="word-break">'+my_trueAttendCode+'</p>';//幸运码,弹出框中的
				  my_luckyCodeStr+='</div>'; */
				 
			   }
			   $("#myAttend").html('<p class="nomargin">我本期参与：<span class="text-danger">'+myAttend_countCount+'</span>人次 <a href="javascript:;" class="text-blue" onClick="alertList('+userId+','+_lottery_id+');">点击查看>></a></p>');
			   //$("#myAttend_count3").html("一共参与了<span class='text-danger' style='padding:0 3px'>"+myAttend_countCount+"</span>人次");
			   //$("#luckyCode2").html(my_luckyCodeStr);//弹出框中幸运码本次所参与所获得的
			   //点击弹出层按钮---------我参与的，传我自己的uid
			  // $("#alertList").attr("onClick","alertList("+userId+","+lottery_id+");");
			   
		   }
		   
		   /***最新一期****/
		   var new_lottery_id=data['newLottery'][0]['lottery_id'];
		   glo_new_lottery_id=new_lottery_id;
		   var new_pid=data['newLottery'][0]['pid'];
		   
		   var new_need_count=data['newLottery'][0]['need_count'];//总需参与人数
		   var new_attend_count=data['newLottery'][0]['attend_count'];//已经参与人数
		   var new_attend_limit=data['newLottery'][0]['attend_limit'];//最低次数
		   global_attend_limit=new_attend_limit;//全局变量
		   var new_max_attend_limit=data['newLottery'][0]['max_attend_limit']; //最高次数
		    global_max_attend_limit=new_max_attend_limit;//全局变量
		   var new_title=data['newLottery'][0]['title']; 
		   var new_path=data['host']+data['newLottery'][0]['path']; 
		   var remain_my_count=new_need_count-new_attend_count;
		   global_remain=remain_my_count; //全局变量
		   var goods_link=new_pid+'&'+'lottery_id='+new_lottery_id;//给链接地址赋值
		   var progress='';
		   if(new_need_count<1){
				progress=0;
			 }else{
				progress=(new_attend_count/new_need_count)*100;
				 }
		   var newLotteryStr='';
		   
		   newLotteryStr+='<a href="goods-details.html?pid='+goods_link+'" class="new-qishu-img"><img src="'+new_path+'"></a>';
		   newLotteryStr+='<a href="goods-details.html?pid='+goods_link+'" class="new-qishu-content"><h3>'+new_title+'</h3></a>';
           //newLotteryStr+='<p class="text-gray2 ellipsis">请用户购买时备注好正确的支付物卡面值500元</p>';              
           newLotteryStr+='<div class="cg-progress-pre margin-t-8 new-qishu-progress">';                     
           newLotteryStr+='<div class="progress cg-progress cg-progress2">';                
           newLotteryStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%">';                    
           newLotteryStr+='<span class="sr-only">'+progress+'% Complete (warning)</span>';                  
           newLotteryStr+='</div>';                            
           newLotteryStr+='</div>';    
		   newLotteryStr+='<ul class="list-group cg-progress-text clearfix">';                 
           newLotteryStr+='<li class="list-group-item pull-left clearfix col-md-6 text-left">';               
           newLotteryStr+='<p class="text-gray nomargin text-12">'+new_attend_count+'</p>';                 
           newLotteryStr+='<p class="nomargin text-12">已参与人次</p>';
           newLotteryStr+='</li>';                        
           newLotteryStr+='<li class="list-group-item pull-left clearfix col-md-6 text-right">';                       
           newLotteryStr+='<p class="text-danger nomargin text-12">'+remain_my_count+'</p>';                         
           newLotteryStr+='<p class="text-danger nomargin text-12">剩余人次</p>';                                             
           newLotteryStr+='</li>';                       
           newLotteryStr+='</ul>';                           
           newLotteryStr+='</div>';                    
           newLotteryStr+='<div class="count count2 clearfix margin-b-10">';                 
           newLotteryStr+='<span class="pull-left line-height-30 text-12">参与人次:</span>';                
           newLotteryStr+='<div class="clearfix add-red add-red2 pull-left">';                        
           newLotteryStr+='<span class="reduce" onClick="red();">-</span>';                
           newLotteryStr+='<input class="count-input" type="text" value="1" id="count-input">';                   
           newLotteryStr+='<span class="add" onClick="add();">+</span>';                               
           newLotteryStr+='</div>';                       
           newLotteryStr+='</div>';                        
           newLotteryStr+='<p><button type="button" id="nowAdd" class="btn cg-btn-danger cg-btn-fixed-square cg-gouwu">立即抢购</button></p>';   
		   $("#newContent").html(newLotteryStr);     
		   
		
		   
		  // var att_num=parseInt($("#count-input").val());//定义参与按钮的第三个变量
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
				
				$("#nowAdd").attr("onClick","goToCar_two("+new_lottery_id+","+pid+","+att_num+");");//立即参与，必须在此，异步，等DOM建立之后
				
			});
		   $("#nowAdd").attr("onClick","goToCar_two("+new_lottery_id+","+pid+","+att_num+");");//立即参与，必须在此，异步，等DOM建立之后
		  
		   /**********计算结果******************/
		   var pri_total_time=prizeList['total_time'];//此字段在中奖用户json中，但不影响
		   var pri_need_count=prizeList['need_count'];//此字段在中奖用户json中，但不影响
		   var hour_lottery=prizeList['hour_lottery'];//此字段在中奖用户json中，但不影响，时时彩开奖号码
		   var hour_lottery_id=prizeList['hour_lottery_id'];//此字段在中奖用户json中，但不影响,时时彩开奖期号
		   var pri_last_attend_date_time=prizeList['last_attend_date_time'];//此字段在中奖用户json中，但不影响，最后一位用户参与时间
		  
		   $("#lottery_code2").html(startCode+pri_lottery_code);    
		   $("#totalTime").html(pri_total_time); 
		   $("#hour-lottery").html(hour_lottery);
		   $("#hour-lottery_id").html(hour_lottery_id+'期');
		   $("#pri_needAttend").html(pri_need_count);
		   $("#fixed-num").html(startCode);
		   
		   //时间戳格式化
			//时间,需要转为毫秒，现在只精确到秒，
			//var  time_3= my_create_time;
			/*var  time_3= pri_last_attend_time;
			var newDate_3 = new Date();
			newDate_3.setTime(time_3 * 1000);
			var pri_last_attend_time_3=newDate_3.format('yyyy-MM-dd h:m:s');*/
			
		   //列表信息
		   
		   var countList=data['countList'];
		   var resultStr='';
		   
			  
			   
		   for(i=0;i<2;i++){
			   var result_lottery_id=countList[i]['lottery_id'];
			   var result_pid=countList[i]['pid'];
			   var result_uid=countList[i]['uid'];
			   var result_attend_count=countList[i]['attend_count'];
			   var result_create_time=countList[i]['create_time'];//暂时不使用此数据
			   var result_title=countList[i]['title'];
			   var result_nickname=countList[i]['nickname'];
			   var create_date_time=countList[i]['create_date_time'];//时间，已经格式化好的时间
			   var sfm_time=countList[i]['sfm_time'];//未经转化前的字段，毫秒数
			   //时间,需要转为毫秒，现在只精确到秒，
				/*var  time_4= result_create_time;
				var newDate_4 = new Date();
				newDate_4.setTime(time_4 * 1000);
				var result_create_time_4=newDate_4.format('yyyy-MM-dd h:m:s'); */
			   
			   resultStr+='<tr>';
			   resultStr+='<td class="text-center">'+create_date_time+'</td>';
               resultStr+='<td class="position-re td-symbol text-center">';               
               resultStr+='<span>'+sfm_time+'</span>';                     
               resultStr+='<i class="glyphicon glyphicon-arrow-right"></i>';                  
               resultStr+='<i class="glyphicon glyphicon-plus"></i>';                  
               resultStr+='</td>';                   
               resultStr+='<td>'+result_nickname+'</td>';             
               resultStr+='<td> '+result_attend_count+'人次 </td>';                
               resultStr+='<td>（期号：'+result_lottery_id+'）'+result_title+'</td>';               
               resultStr+='</tr>';               
			   
			  }
		   //var flag=1;	  
		  $("#load_more").click(function(){
			   
			   if($(this).html()=='只显示部分数据<span class="glyphicon glyphicon-chevron-up margin-btn"></span>'){
				   
				    var resultStr='';
				    for(i=0;i<2;i++){
					 var result_lottery_id=countList[i]['lottery_id'];
					 var result_pid=countList[i]['pid'];
					 var result_uid=countList[i]['uid'];
					 var result_attend_count=countList[i]['attend_count'];
					 var result_create_time=countList[i]['create_time'];
					 var result_title=countList[i]['title'];
					 var result_nickname=countList[i]['nickname'];
					 var create_date_time=countList[i]['create_date_time'];//时间，已经格式化好的时间
			         var sfm_time=countList[i]['sfm_time'];//未经转化前的字段，毫秒数
					 //时间,需要转为毫秒，现在只精确到秒，
					 /* var  time_4= result_create_time;
					  var newDate_4 = new Date();
					  newDate_4.setTime(time_4 * 1000);
					  var result_create_time_4=newDate_4.format('yyyy-MM-dd h:m:s'); */
					 
					 resultStr+='<tr>';
					 resultStr+='<td class="text-center">'+create_date_time+'</td>';//需要精确到毫秒
					 resultStr+='<td class="position-re td-symbol text-center">';               
					 resultStr+='<span>'+sfm_time+'</span>';                     
					 resultStr+='<i class="glyphicon glyphicon-arrow-right"></i>';                  
					 resultStr+='<i class="glyphicon glyphicon-plus"></i>';                  
					 resultStr+='</td>';                   
					 resultStr+='<td>'+result_nickname+'</td>';             
					 resultStr+='<td> '+result_attend_count+'人次 </td>';                
					 resultStr+='<td>（期号：'+result_lottery_id+'）'+result_title+'</td>';               
					 resultStr+='</tr>';               
					 
					}
				    $("#result_list").html(resultStr);
					$(this).html('展开全部数据<span class="glyphicon glyphicon-chevron-down margin-btn"></span>');
					$(".glyphicon.glyphicon-plus").last().hide();//隐藏最后一个+号
				   }else{
					   var resultStr2='';
					   $(".glyphicon.glyphicon-plus").last().show();
					   for(i=2;i<countList.length;i++){
						   var result_lottery_id=countList[i]['lottery_id'];
						   var result_pid=countList[i]['pid'];
						   var result_uid=countList[i]['uid'];
						   var result_attend_count=countList[i]['attend_count'];
						   var result_create_time=countList[i]['create_time'];
						   var result_title=countList[i]['title'];
						   var result_nickname=countList[i]['nickname'];
						   var create_date_time=countList[i]['create_date_time'];//时间，已经格式化好的时间
			               var sfm_time=countList[i]['sfm_time'];//未经转化前的字段，毫秒数
						   //时间,需要转为毫秒，现在只精确到秒，
							/*var  time_4= result_create_time;
							var newDate_4 = new Date();
							newDate_4.setTime(time_4 * 1000);
							var result_create_time_4=newDate_4.format('yyyy-MM-dd h:m:s'); */
						   
						   resultStr2+='<tr>';
						   resultStr2+='<td class="text-center">'+create_date_time+'</td>';//需要精确到毫秒
						   resultStr2+='<td class="position-re td-symbol text-center">';               
						   resultStr2+='<span>'+sfm_time+'</span>';                     
						   resultStr2+='<i class="glyphicon glyphicon-arrow-right"></i>';                  
						   resultStr2+='<i class="glyphicon glyphicon-plus"></i>';                  
						   resultStr2+='</td>';                   
						   resultStr2+='<td>'+result_nickname+'</td>';             
						   resultStr2+='<td> '+result_attend_count+'人次 </td>';                
						   resultStr2+='<td>（期号：'+result_lottery_id+'）'+result_title+'</td>';               
						   resultStr2+='</tr>';               
						   
						  }
						  $("#result_list").append(resultStr2);
						  $(this).html('只显示部分数据<span class="glyphicon glyphicon-chevron-up margin-btn"></span>');
						  $(".glyphicon.glyphicon-plus").last().hide();
				 
				  }
			});	  
			  
		   $("#result_list").html(resultStr);
		   $(".glyphicon.glyphicon-plus").last().hide();//去掉最后一个+号
		   $("#pri_last_attend_time").html(pri_last_attend_date_time); //最后的参与时间 不需要转化
		   /*************参与记录*************/
		   var attendListStr='';//清空TR内容
		   var attendList=data['attendList'];
		   if(attendList.length==0){
			   attendListStr='<tr><td colspan="5" style="text-align:center">还没有参与记录哦，赶快来参与吧</td></tr>';
			   }
			   
			else{	
				   //alert(attendList.length);
				   // attendList.length也许在哪里使用到了，导致它的长度发生了变化，在这里重新定义
				   var len = attendList.length;
				   
				   for(var i=0;i<len;i++){//参与记录
					var pic_host=data['pic_host'];
					var att_lucky_code=attendList[i]['lucky_code'];
					var att_create_time=attendList[i]['create_time'];//参与时间
					var att_path=attendList[i]['path'];
					var att_nickname=attendList[i]['nickname'];
					var att_attend_count=attendList[i]['attend_count'];
					var att_ip_addresst=attendList[i]['ip_address'];
					var att_attend_ip=attendList[i]['attend_ip'];
					var att_attend_device=attendList[i]['attend_device'];
					var uid=attendList[i]['uid'];
					//rightContentMarking=1为参与记录，2为中奖记录，3为晒单列表
					//var user_uid=uid+'&'+'rightContentMarking='+1;//给链接地址赋值,传递用户ID(查看他人的)
					var user_uid=uid+'&'+'nickname='+escape(att_nickname)+'&'+'rightContentMarking='+1;//给链接地址赋值,传递用户ID
					//时间戳格式化
					/*var timestamp_1 = att_create_time;
					var newDate_1 = new Date();
					newDate_1.setTime(timestamp_1 * 1000);
					var newCreate_timeAtt_1=newDate_1.format('yyyy-MM-dd h:m:s');*/
					
				  
					var trueAttendLucky_code='';//把startCode分离出来，然后以分号连接成一个新数字
					var s=att_lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
					for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
					   //trueAttendLucky_code+=(startCode+Number(s[j]))+'，';
					   trueAttendLucky_code+='<span class="display-ib">'+(startCode+Number(s[j]))+'</span>';  
					}//把startCode分离出来，然后以分号连接成一个新数字
					trueAttendLucky_code=trueAttendLucky_code.substring(0,trueAttendLucky_code.length-1);//去掉最后一个分号
				   
					  
					attendListStr+='<tr>'; 
					attendListStr+='<td>'+att_create_time+'</td>'; 
					attendListStr+='<td class="user-img-table">';
					
					 //判断中奖用户是不是自己并且是否有头像
					 var p = picHostUrl(pic_host,att_path);//此函数定义在common.js函数中
					 if(typeof(userId) == "undefined"||uid!=userId){
						attendListStr+='<a href="personal-index-other.html?uid='+user_uid+'" target="_blank"><img src="'+p+'" width="25" height="25">'+att_nickname+'</a>';
					  }else{
						  attendListStr+='<a href="personal-index.html?per_market=1" target="_blank"><img src="'+p+'" width="25" height="25">'+att_nickname+'</a>';
					  }
					
					
					//attendListStr+='<a href="#">';
					//attendListStr+='<img src="'+att_path+'" width="25" height="25" alt="'+att_nickname+'">';
					//attendListStr+=''+att_nickname+'';
					//attendListStr+='</a>';
					
					attendListStr+='</td>';
					attendListStr+='<td>';
					attendListStr+='<div class="table-hover-btn position-re">'+att_attend_count+'';
					//attendListStr+='<button  type="button" class="btn btn-default mypopover-btn noborder mypopover" title="本次参与'+attendList[i]['attend_count']+'人次" data-container="body" data-content="'+trueAttendLucky_code+'" data-trigger="focus" data-placement="left" data-toggle="popover"> 查看幸运码</button>';
					attendListStr+='</div>';
					//右侧弹出参与次数
					attendListStr+='<div id="popover-head'+i+'" class="hide popover-head">';
					//判断中奖用户是不是自己并且是否有头像
					 //var p = picHostUrl(pic_host,path);//此函数定义在common.js函数中
					 if(typeof(userId) == "undefined"||uid!=userId){
						attendListStr+='<img src="'+p+'" width="25" height="25">';
					  }else{
						  attendListStr+='<img src="'+p+'" width="25" height="25">';
					  }
				  // attendList+='<img src="'+data['host']+data['attendList'][i]['path']+'" width="25">'+data['attendList'][i]['nickname']+'';
				   attendListStr+='<span>本次参与<em>'+data['attendList'][i]['attend_count']+'</em>人次</span>';
				   attendListStr+='</div>';  
				   attendListStr+='<div id="popover-content'+i+'" class="hide popover-content">';    
				   attendListStr+='<p>'+trueAttendLucky_code+'</p>'; 
				   attendListStr+='</div>';
					attendListStr+='</td>';
					attendListStr+='<td>';
					//点击查看按钮
					attendListStr+='<button type="button" id="mypopover'+i+'" class="btn btn-default noborder mypopover" data-placement="left" data-toggle="popover">查看幸运码</button>'
					
					attendListStr+='</td>';
					attendListStr+='<td>'+att_ip_addresst+''+att_attend_ip+'</td>';
					attendListStr+='<td>'+att_attend_device+'</td>';
					attendListStr+='</tr>'
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
			
			$("#attendList").html(attendListStr);

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
				  //var pics= display[i]['pics'];
				  var apply_time= display[i]['apply_time'];
				  var uid=display[i]['uid'];//用户id
				  var nickname= display[i]['nickname'];
				  var userPath=display[i]['path'];
				  var pics=display[i]['pics'];//评论图片，以逗号隔开
				  var truePicsid='';//把startCode分离出来，然后以分号连接成一个新数字
				  var s=pics.split(',');//遍历以逗号相隔的字符串
				 // var user_uid=uid+'&'+'rightContentMarking='+3;//给链接地址赋值,传递用户ID
				  var user_uid=uid+'&'+'nickname='+escape(nickname)+'&'+'rightContentMarking='+3;//给链接地址赋值,传递用户ID
				  
				  disListStr+='<div class="media">';
				  disListStr+='<div class="media-left">';
				  //disListStr+='<a href="#"><img class="media-object" src="'+userPath+'" width="60" alt=""></a>';
				  
				   //判断中奖用户是不是自己并且是否有头像
				   var p = picHostUrl(pic_host,userPath);//此函数定义在common.js函数中
				   if(typeof(userId) == "undefined"||uid!=userId){
					   
					  disListStr+='<div class="user-img"><a href="personal-index-other.html?uid='+user_uid+'" target="_blank"><img src="'+p+'" width="25" height="25"></a></div>';
					}else{
						
						disListStr+='<div class="user-img"><a href="personal-index.html?per_market=3" target="_blank"><img src="'+p+'" width="25" height="25"></a></div>';
					}
                  disListStr+='</div>';          
                  disListStr+='<div class="media-body">';            
                  //disListStr+='<h4 class="media-heading"><a href="#">'+nickname+'</a> <span class="text-gray">'+apply_time+'</span></h4>';
				  disListStr+='<h4 class="media-heading">';   
				  if(typeof(userId) == "undefined"||uid!=userId){
					       disListStr+='<a href="personal-index-other.html?uid='+user_uid+'" class="link-blue" target="_blank">'+nickname+'</a>';  
					   }else{
						   disListStr+='<a href="personal-index.html?per_market=3" class="link-blue" target="_blank">'+nickname+'</a>'; 
						   
						   }  
                  
				  
				  disListStr+=' <span class="text-gray">'+apply_time+'</span></h4>'; 
				  
				  disListStr+='<p class="qishu">第'+lottery_id+'期晒单 <span>'+titlename+'</span></p>';
                  disListStr+=''+description+'';          
                  /*disListStr+='<ul class="piccon">';    
				   for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I         
                        disListStr+='<li><a href="javascript:;" rel="'+pic_host+s[j]+'" class="preview"><img src="'+pic_host+s[j]+'" alt="缩略图" width="100" height="75"></a></li>';   
						
				   }
                  disListStr+='</ul>'; */   
				  if(pics.length>0){
					disListStr+='<ul class="piccon">';
					     for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I         
							  disListStr+='<li><a href="javascript:;" rel="'+pic_host+s[j]+'" class="preview"><img src="'+pic_host+s[j]+'" alt="缩略图" width="100" height="75"></a></li>';   
							  //alert(s[j]);
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

				//$("#disList_count").html(disList_count);
				$("#commentContent").append(disListStr);
				imagePreview();//调用小图显示大图插件
				
				/******规则当中的固定数值，2016.1.8新加，原来是静态数据******/
				var srcCode=data['srcCode'];
		        $(".fixedNum").html(srcCode);
		   
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
	}	
})
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
		       var attendListStr='';//清空TR内容
			   var attendList=data['attendList'];
			   for(var i=0;i<attendList.length;i++){//参与记录
					var pic_host=data['pic_host'];
					var att_lucky_code=attendList[i]['lucky_code'];
					var att_create_time=attendList[i]['create_time'];//参与时间
					var att_path=attendList[i]['path'];
					var att_nickname=attendList[i]['nickname'];
					var att_attend_count=attendList[i]['attend_count'];
					var att_ip_addresst=attendList[i]['ip_address'];
					var att_attend_ip=attendList[i]['attend_ip'];
					var att_attend_device=attendList[i]['attend_device'];
					var startCode=data['startCode'];//开始码
					var uid=data['attendList'][i]['uid'];
					//var user_uid=uid+'&'+'rightContentMarking='+1;//给链接地址赋值,传递用户ID
					var user_uid=uid+'&'+'nickname='+escape(nickname)+'&'+'rightContentMarking='+1;//给链接地址赋值,传递用户ID
					//时间戳格式化
					/*var timestamp_1 = att_create_time;
					var newDate_1 = new Date();
					newDate_1.setTime(timestamp_1 * 1000);
					var newCreate_timeAtt_1=newDate_1.format('yyyy-MM-dd h:m:s');*/
					
				  
					var trueAttendLucky_code='';//把startCode分离出来，然后以分号连接成一个新数字
					var s=att_lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
					for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
					   //trueAttendLucky_code+=(startCode+Number(s[j]))+'，';
					   trueAttendLucky_code+='<span class="display-ib">'+(startCode+Number(s[j]))+'</span>'; 	 
					}//把startCode分离出来，然后以分号连接成一个新数字
					trueAttendLucky_code=trueAttendLucky_code.substring(0,trueAttendLucky_code.length-1);//去掉最后一个分号
				   
					  
					attendListStr+='<tr>'; 
					attendListStr+='<td>'+att_create_time+'</td>'; 
					attendListStr+='<td class="user-img-table">';
					/*attendListStr+='<a href="#">';
					attendListStr+='<img src="'+att_path+'" width="25" height="25" alt="'+att_nickname+'">';
					attendListStr+=''+att_nickname+'';
					attendListStr+='</a>';*/
					
					 //判断中奖用户是不是自己并且是否有头像
					 var p = picHostUrl(pic_host,att_path);//此函数定义在common.js函数中
					 if(typeof(userId) == "undefined"||uid!=userId){
						attendListStr+='<a href="personal-index-other.html?uid='+user_uid+'" target="_blank"><img src="'+p+'" width="25" height="25">'+att_nickname+'</a>';
					  }else{
						  attendListStr+='<a href="personal-index.html?per_market=1" target="_blank"><img src="'+p+'" width="25" height="25">'+att_nickname+'</a>';
					  }
					 
					attendListStr+='</td>';
					attendListStr+='<td>';
					attendListStr+='<div class="table-hover-btn position-re">'+att_attend_count+'';
					//attendListStr+='<button  type="button" class="btn btn-default mypopover-btn noborder mypopover" title="本次参与'+attendList[i]['attend_count']+'人次" data-container="body" data-content="'+trueAttendLucky_code+'" data-trigger="focus" data-placement="left" data-toggle="popover"> 查看幸运码</button>';
					attendListStr+='</div>';
					//右侧弹出参与次数
					attendListStr+='<div id="popover-head'+i+'" class="hide popover-head">';
					//判断中奖用户是不是自己并且是否有头像
					// var p = picHostUrl(pic_host,path);//此函数定义在common.js函数中
					 if(typeof(userId) == "undefined"||uid!=userId){
						attendListStr+='<img src="'+p+'" width="25" height="25">';
					  }else{
						  attendListStr+='<img src="'+p+'" width="25" height="25">';
					  }
				  // attendList+='<img src="'+data['host']+data['attendList'][i]['path']+'" width="25">'+data['attendList'][i]['nickname']+'';
				   attendListStr+='<span>本次参与<em>'+data['attendList'][i]['attend_count']+'</em>人次</span>';
				   attendListStr+='</div>';  
				   attendListStr+='<div id="popover-content'+i+'" class="hide popover-content">';    
				   attendListStr+='<p>'+trueAttendLucky_code+'</p>'; 
				   attendListStr+='</div>';
					attendListStr+='</td>';
					attendListStr+='<td>';
					//点击查看按钮
					attendListStr+='<button type="button" id="mypopover'+i+'" class="btn btn-default noborder mypopover" data-placement="left" data-toggle="popover">查看幸运码</button>'
					
					attendListStr+='</td>';
					attendListStr+='<td>'+att_ip_addresst+''+att_attend_ip+'</td>';
					attendListStr+='<td>'+att_attend_device+'</td>';
					attendListStr+='</tr>'
				   //参与记录
					
				 }
			  //*****************分页
			 //var a_pageCount=data['a_pageCount'];
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
	
			 $("#attendList").html(attendListStr+'0');//参与列表

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

/*********中奖用户的参与码-----弹出框  start******/
//参与记录弹出框
/*function alertList(uid,lottery_id){
  //调用新接口
  $.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Attend/getAttendInfo',  
			data:{
				uid:uid,
				lottery_id:lottery_id,
				
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				/!*$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); *!/
			},
			success:function(data){  
			   
				var code=data['code'];
				var info=data['info'];
				if(code!=200){
					swal({
						title: "",
						text: ''+info+'<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					return;
				}
			   var list=data['list'];	
			   var list_num=data['sum'];//总共参与的人次
			   var luckyCodeStr='';
			   for(i=0;i<list.length;i++){
				   var id=list[i]['id'];//参与序号
				   var code_create_time=list[i]['create_time'];//参与时间
				   var lucky_code=list[i]['lucky_code'];//参与码
				   var my_trueAttendCode='';
				   var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
					for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
					  //把startCode分离出来，然后以分号连接成一个新数字
					  // my_trueAttendCode+=(glo_startcode+Number(s[j]))+'，';
					   my_trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startcode+Number(s[j]))+'</span>';
					}
					
				   //时间戳格式化
				  //参与时间
				  var  time_attend= code_create_time;
				  var newDate_attend = new Date();
				  newDate_attend.setTime(time_attend * 1000);
				  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');	
				  luckyCodeStr+='<div class="well nomargin">';
				  luckyCodeStr+='<p class="text-gray2">'+my_create_time_attend+'</p>';//创建时间
				  luckyCodeStr+='<p class="word-break margin-r_8">'+my_trueAttendCode+'</p>';//幸运码,弹出框中的
				  luckyCodeStr+='</div>';	
			   }
			   
			  $("#myAttend_count2").html('我一共参与了<span class="text-danger">'+list_num+'</span>人次');
			  $("#luckyCode").html(luckyCodeStr);

			   
		  }
		  
  });
  
  $("#myModal").modal("toggle"); 
  
}*/
/*********中奖用户的参与码-----弹出框  end******/


//参与记录中的翻页
//页码按钮
function getPageGoods(pos){ 
     index_attend=pos;
	 attendList(index_attend);
   
	//alert(id+'////'+types+'....'+index);
	
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

//立即加入购物车按钮，最新一期
//购物车加减
var att_num=parseInt($("#count-input").val());
function add(att_num){
	var attend_count=$("#count-input");
	attend_count.val(parseInt(attend_count.val())+1) 
	att_num=attend_count.val();
		
	$("#nowAdd").attr("onClick","goToCar_two("+glo_new_lottery_id+","+pid+","+att_num+");");
	//$("#addTocarBtn").attr("onClick","addToCar_two("+lottery_id+","+pid+","+att_num+");");//加入购物车按钮

}	

function red(att_num){
   var attend_count=$("#count-input");
   attend_count.val(parseInt(attend_count.val())-1) 
   if(parseInt(attend_count.val())<1){ 
	 attend_count.val(1); 
   } 
   att_num=attend_count.val();
   $("#nowAdd").attr("onClick","goToCar_two("+glo_new_lottery_id+","+pid+","+att_num+");");
  // $("#addTocarBtn").attr("onClick","addToCar_two("+lottery_id+","+pid+","+att_num+");");//加入购物车按钮

}

//查看参与弹出框------调用新接口
function alertList(userId,lottery_id){
  
  $.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Attend/getAttendInfo',  
			data:{
				uid:userId,
				lottery_id:lottery_id,
				
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				/*$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); */
			},
			success:function(data){  
			   
				var code=data['code'];
				var info=data['info'];
				if(code!=200){
					swal({
						title: "",
						text: ''+info+'<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					return;
				}
			   var list=data['list'];	
			   var list_num=data['sum'];//总共参与的人次
			   var luckyCodeStr='';
			   for(i=0;i<list.length;i++){
				   var id=list[i]['id'];//参与序号
				   var code_create_time=list[i]['create_time'];//参与时间
				   var lucky_code=list[i]['lucky_code'];//参与码
				   var my_trueAttendCode='';
				   var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
					for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
					  //把startCode分离出来，然后以分号连接成一个新数字
					  // my_trueAttendCode+=(glo_startcode+Number(s[j]))+'，';
					   if(glo_ready_lotteryCode==(glo_startcode+Number(s[j]))){
						   my_trueAttendCode+='<span class="display-ib padding-r-8 text-danger">'+(glo_startcode+Number(s[j]))+'</span>';
					   }else{
						   my_trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startcode+Number(s[j]))+'</span>';
					   }

					}
					//glo_ready_lotteryCode

				   //时间戳格式化
				  //参与时间
				  var  time_attend= code_create_time;
				  var newDate_attend = new Date();
				  newDate_attend.setTime(time_attend * 1000);
				  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');	
				  luckyCodeStr+='<div class="well nomargin">';
				  luckyCodeStr+='<p class="text-gray2">'+my_create_time_attend+'</p>';//创建时间
				  luckyCodeStr+='<p class="word-break margin-r_8">'+my_trueAttendCode+'</p>';//幸运码,弹出框中的
				  luckyCodeStr+='</div>';	
			   }
			   
			  $("#myAttend_count2").html('一共参与了<span class="text-danger">'+list_num+'</span>人次');
			  $("#luckyCode").html(luckyCodeStr);

			   
		  }
		  
  });
  
  $("#myModal").modal("toggle"); 
  
}