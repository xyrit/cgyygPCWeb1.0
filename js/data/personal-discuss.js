//个人中心，评论晒单
/*********我的评论晒单*********/
//,我的中奖记录
//定义全局变量，当点击相应的查询条件或者翻页时，如果需要恢复默认值的变量就 变默认值，其他照写
//为了防止冲突，全局变量需要加前缀
var dis_index=0;
var dis_state_num=1;
var dis_soso_num=0;
var picListData;
var glo_pic_host;
$("#myComment").click(function(){
	getDisRecored_1();
});

//未翻页前的调用
function getDisRecored_1(){
	dis_index=0;
	dis_state_num=1;
	dis_soso_num=0;
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Display/orderRecord',  
			data:{
				user_token:user_token,
				pageSize:5,
				pageIndex:0,
				state:1, // 1已晒单,0未晒单（必须）
				soso:0
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				$("#rightContent").html('<div class="loading"></div>');
				$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			},
			success:function(data){  
				var code=data['code'];
				var info=data['info'];
				if(code==517){
					swal({
						title: "",
						text: ''+info+'，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					var attendStr='';
					attendStr+='<div class="row">';
					attendStr+='<div class="per-goods-box nomargin">';
					attendStr+='<div class="per_time_tab-content text-center">';
					attendStr+='您还没有登录哦，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>';
					attendStr+='</div>';
					attendStr+='</div>';
					attendStr+='</div>';
					  
					$("#rightContent").html(attendStr);
					return;
				}
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
				$("#myComment").addClass("active").siblings().removeClass("active");
				var attend_pageCount=data['pageCount'];
				var att_list=data['list'];
				picListData=att_list;//赋值全局变量，弹出图片轮播
				//建立DOM结构
				attendStr='';
				attendStr+='<div class="row">';
					attendStr+='<div class="per-goods-box nomargin">';
					 // Nav tabs -->
					attendStr+='<ul class="nav nav-tabs" role="tablist">';
					
					attendStr+='<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab" id="dis_readyMenu" aria-expanded="true">已晒单</a></li>';
					attendStr+='<li role="presentation"><a href="#home" aria-controls="profile" role="tab" data-toggle="tab" id="dis_soonMenu"  aria-expanded="false">未晒单</a></li>';
					
					
					
					attendStr+='</ul>';
					attendStr+='<div class="per_time_tab-content">';
					// Tab panes input -->
					attendStr+='<div class="per-time clearfix">';
					attendStr+='<div class="per-time-left">';
					attendStr+='<a href="javascript:;" class="timeMenu active" data-num="0">全部</a>';
					attendStr+='<a href="javascript:;" class="timeMenu" data-num="1">今天</a>';
					attendStr+='<a href="javascript:;" class="timeMenu" data-num="2">本周</a>';
					attendStr+='<a href="javascript:;" class="timeMenu" data-num="3">本月</a>';
					attendStr+='<a href="javascript:;" class="timeMenu" data-num="4">最近三个月</a>';
					attendStr+='</div>';
				
					attendStr+='</div>';
					// Tab panes input end-->    
					// Tab panes -->
					attendStr+='<div class="tab-content">';
					attendStr+='<div role="tabpanel" class="tab-pane active" id="home">';
					 //商品列表
					attendStr+='<table class="table table-striped table-striped_details_1 table-bordered">';
					attendStr+='<thead>'; 
					attendStr+='<tr>'; 
					attendStr+='<th>商品名称</th>';
					attendStr+='<th id="dis_pic">晒单图片</th>'; 
					attendStr+='<th id="dis_th1" width="155">晒单时间</th>';
					attendStr+='<th width="300" id="dis_th2">分享内容</th>';
					attendStr+='<th width="120" id="dis_th3"></th>';
					//attendStr+='<th width="120" id="dis_th3">奖励（积分）</th>';
					attendStr+='</tr>'; 
					attendStr+='</thead>'; 
					attendStr+='<tbody id="goodsIng">'; 
					
					attendStr+='</tbody>';
					attendStr+='</table>';
					//商品列表结束
					attendStr+='</div>';
					
					//即将揭晓
                   //商品列表结束
                   $("#rightContent").html(attendStr);//把获取到的数据加载进右边内容容器中
					var attendIngStr='';
					
				for(i=0;i<att_list.length;i++){
					var pic_host=data['pic_host'];//已经晒单的晒单图片地址前缀
					glo_pic_host=pic_host;
				    var path_ready=att_list[i]['path'];//已经晒单的晒单图片，这个要单独用for循环出来
					var path_ready_0=att_list[i]['path'][0];//已经晒单的第一张晒单图片
					var id=att_list[i]['id'];
					var title=att_list[i]['title'];
					//var lucky_code=att_list[i]['lucky_code'];
					//var lottery_id=att_list[i]['lottery_id'];
					//var attend_count=att_list[i]['attend_count'];
					//var need_count=att_list[i]['need_count'];
					//var path=data['host']+att_list[i]['path'];
					var create_time=att_list[i]['create_time'];
					//var cover_id=att_list[i]['cover_id'];
					//var lottery_code=Number(att_list[i]['lottery_code']);
					var nickname=att_list[i]['nickname'];
					//var lottery_time=att_list[i]['lottery_time'];
					//var remain_count=att_list[i]['remain_count'];
					var startCode=Number(data['startCode']);
					//var luckyNum=startCode+lottery_code;//这是幸运号码
					var description=att_list[i]['description'];
					var uid=att_list[i]['uid'];
					var score=att_list[i]['score'];
					var product=att_list[i]['product'];//商品名称
					var lottery_id=att_list[i]['lottery_id'];
					var pid=att_list[i]['pid'];
					var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
					//时间戳格式化
					//参与时间
					var  time_attend= create_time;
					var newDate_attend = new Date();
					newDate_attend.setTime(time_attend * 1000);
					var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');
					
					//var s=path_ready.split(',');//遍历以逗号相隔的字符串
					
						
						
					//揭晓时间
					//var  time_lottery= lottery_time;
					//var newDate_lottery = new Date();
					//newDate_lottery.setTime(time_lottery * 1000);
					//var my_lottery_time=newDate_lottery.format('yyyy-MM-dd h:m:s');
					
					//把startCode分离出来，然后以分号连接成一个新数字
					//var my_trueAttendCode='';
					//var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
					//for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
					  //把startCode分离出来，然后以分号连接成一个新数字
					//   my_trueAttendCode+=(startCode+Number(s[j]))+'，';
				//	}
				//	my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号
					
					
					attendIngStr+='<tr>';
					attendIngStr+='<td>';
					attendIngStr+='<a href="ready-publish.html?pid='+goods_link+'" class="text-danger" target="_blank">'+product+'</a>';
					//attendIngStr+='<p class="nomargin">总需：'+need_count+'人次</p>';
					//attendIngStr+='<p class="nomargin">获得者：<a  href="#" class="text-danger">'+nickname+'</a>（本期共参与1人次）</p>';
					//attendIngStr+='<p class="nomargin">幸运号码：'+lottery_code+'</p>';
					//attendIngStr+='<p class="nomargin">揭晓时间：'+my_lottery_time+'</p>';
					//attendIngStr+='<p class="nomargin">参与时间：'+my_create_time_attend+'</p>';
					attendIngStr+='</td>';
					if(path_ready.length<=0){
					     attendIngStr+='<td scope="row"><img src="images/noPic1.jpg" alt="" width="100"></td>';
					   }else{
						  path_ready_0=pic_host+path_ready_0;
						  attendIngStr+='<td scope="row"><img src="'+path_ready_0+'" alt="" width="100" onClick="viewPic('+i+');"  style="cursor:pointer"></td>';
						 }
					//attendIngStr+='<td scope="row"><a href="#"><img src="'+path+'" alt="" width="60"></a></td>';
					attendIngStr+='<td><span class="text-danger">'+my_create_time_attend+'</span></td>';
					attendIngStr+='<td><p class="nomargin"><b>标题：</b>'+title+'</p><p><b>内容：</b>'+description+'</p></td>';
					
					//attendIngStr+='<td>'+score+'</td>';
					attendIngStr+='<td></td>';
					attendIngStr+='</tr>';
					
				}
               
				if(att_list.length<=0){

					$("#goodsIng").html('<tr><td colspan="6" class="text-center"><div class="text-gray"><img src="images/noresult.jpg"/>&nbsp&nbsp小主，您还没有晒单记录，<a href="index.html" class="text-danger">立即参与</a>&nbsp橙果云购&nbsp并晒单吧~</div></td></tr>');
					}else{
						$("#goodsIng").html(attendIngStr);//数据写进
						}
				
				//构建翻页结构
				 //*****************分页
			   
				var attendPageStr='';
				attendPageStr+='<nav class="text-center page">';
				attendPageStr+='<ul class="pagination clearfix" id="pagination">';
				attendPageStr+='</ul>';
				attendPageStr+='<div class="count-box">';
				attendPageStr+='<div class="count-num">共<em id="pageCount"></em>页</div>';
				attendPageStr+='</div>';
				attendPageStr+='</nav>';	
				  
				 var pageCount=data['pageCount'];
				 dis_count=pageCount;
				 var paginationStr='';
					 paginationStr+='<li><a href="javascript:;" onClick="preGoods_disRecord();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
				 for(i=1;i<=pageCount;i++){
					 if((i-1)==dis_index){
						paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_disRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }

				  }
					 paginationStr+='<li><a href="javascript:;" onClick="nextGoods_disRecord();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
				  //*****************分页
				 $("#rightContent").append(attendPageStr);
				 if(pageCount<=0){
					 $("#pagination").parent().hide();
				   }else{
					   $("#pagination").parent().show();
					   $("#pagination").html(paginationStr);
					   $("#pageCount").html(pageCount);
					   
					   }
				 //$("#pagination").html(paginationStr);
				 //$("#pageCount").html(pageCount);
			   
				
				//给当前按钮添加背景色
				/*$(".pageBtnNum").parent().first().addClass("active");
				$(".pageBtnNum").click(function(){
					  $(this).parent().addClass("active").siblings().removeClass("active");;
				  });*/
				  //如果是当前标签打开的情况下，不调用接口
				//实物
				$("#dis_readyMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getDisRecord(0,1,0);
						dis_index=0;
					    dis_state_num=1;
					    dis_soso_num=0;
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
					}
				});
				//虚物
				$("#dis_soonMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getDisRecord(0,0,0);
						dis_index=0;
					    dis_state_num=0;
					    dis_soso_num=0;
						//state_num_lotteryRecord=0;
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
					}
				});
				//按照时间呈现数据,全部，今天，....
				$(".timeMenu").click(function(){
					var new_soso_num=$(this).attr("data-num");
					$(this).addClass("active").siblings().removeClass("active");
					//每切换一次，页码从0开始
					getDisRecord(0,dis_state_num,new_soso_num);
					//把获取到的值赋给全局变量，否则点击翻页时，soso_num又会变为0了
					dis_soso_num=new_soso_num;
				});
				if(att_list.length<=0){
					  //$("#goodsIng").html('<tr><td colspan="6" class="text-center"><span class="text-gray">没有记录</span></td></tr>');
					  
					  return;
					}
				$(".loading").empty();
			},complete:function(){
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
	  });
}

function getDisRecord(dis_index,dis_state_num,dis_soso_num){
	
	dis_state_num_2=dis_state_num;
	dis_index_2=dis_index;
	dis_soso_num_2=dis_soso_num;
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Display/orderRecord',  
			data:{
				user_token:user_token,
				pageSize:5,
				pageIndex:dis_index_2,
				state:dis_state_num_2, //
				soso:dis_soso_num_2
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				$("#goodsIng").html('<div class="loading"></div>');
				$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			},
			success:function(data){ 
			    var attend_pageCount=data['pageCount'];
				var att_list=data['list'];
				picListData=att_list;//赋值全局变量，弹出图片轮播
				if(att_list.length<=0){
					//$("#goodsIng").html('<tr><td colspan="6" class="text-center"><span class="text-gray">没有记录</span></td></tr>');
					$("#goodsIng").html('<tr><td colspan="6" class="text-center"><div class="text-gray"><img src="images/noresult.jpg"/>&nbsp&nbsp小主，您还没有晒单记录，<a href="index.html" class="text-danger">立即参与</a>&nbsp橙果云购&nbsp并晒单吧~</div></td></tr>');
					//$("#pageNav").empty();
					
					}
				else{	
					  var attendIngStr='';
					  for(i=0;i<att_list.length;i++){
						  //未晒单的字段
						  var id=att_list[i]['id'];
						  var title=att_list[i]['title'];
						  var lucky_code=att_list[i]['lucky_code'];
						  
						  var attend_count=att_list[i]['attend_count'];
						  var need_count=att_list[i]['need_count'];
						  var path=data['host']+att_list[i]['path'];
						 // var create_time=att_list[i]['create_time'];
						 // var cover_id=att_list[i]['cover_id'];
						  var lottery_code=Number(att_list[i]['lottery_code']);
						  var nickname=att_list[i]['nickname'];
						  var lottery_time=att_list[i]['lottery_time'];
						  //var remain_count=att_list[i]['remain_count'];
						  var startCode=Number(data['startCode']);
						  var luckyNum=startCode+lottery_code;//这是幸运号码
						  var status=att_list[i]['status'];//状态 0未晒单 1 审核中 2 已晒单（已审核）
						  var attend_time=att_list[i]['attend_time'];//参与时间
						 /* var status0='去晒单';
						  var status3='审核中';
						  var status2='已晒单';*/
						  /*if(status==0){
							  status=status0;
							  }
						  if(status==1){
							  status=status1;
							  }	  
						  if(status==2){
							  status=status2;
							  }	*/
						  //已晒单独有的字段
						 // var id=att_list[i]['id'];
						 // var title=att_list[i]['title'];
						 // var path=data['host']+att_list[i]['path'];
						  var pic_host=data['pic_host'];//已经晒单的晒单图片地址前缀
						  glo_pic_host=pic_host;
						  var path_ready=att_list[i]['path'];//已经晒单的晒单图片,这个要单独用for循环出来
						  var path_ready_0=att_list[i]['path'][0];//已经晒单的第一张晒单图片
						  
						  var create_time=att_list[i]['create_time'];
						  var nickname=att_list[i]['nickname'];
						  var startCode=Number(data['startCode']);
						  var description=att_list[i]['description'];
						  var uid=att_list[i]['uid'];
						  var score=att_list[i]['score'];
						  var product=att_list[i]['product'];//商品名称
						  var lottery_id=att_list[i]['lottery_id'];//期号ID
						  var pid=att_list[i]['pid'];
						  var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
						  
						  //时间戳格式化
						  //已晒单的时间
						  var  time_attend= create_time;
						  var newDate_attend = new Date();
						  newDate_attend.setTime(time_attend * 1000);
						  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');
						  //揭晓时间
						  var  time_lottery= lottery_time;
						  var newDate_lottery = new Date();
						  newDate_lottery.setTime(time_lottery * 1000);
						  var my_lottery_time=newDate_lottery.format('yyyy-MM-dd hh:mm:ss');
						  //未晒单的参与时间
						  var  time_attend2= attend_time;
						  var newDate_attend2 = new Date();
						  newDate_attend2.setTime(time_attend2 * 1000);
						  var my_time_attend2=newDate_attend2.format('yyyy-MM-dd hh:mm:ss');
						  
						  //把startCode分离出来，然后以分号连接成一个新数字
						//  var my_trueAttendCode='';
						//  var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
						//  for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
							//把startCode分离出来，然后以分号连接成一个新数字
						//	 my_trueAttendCode+=(startCode+Number(s[j]))+'，';
					//	  }
						//  my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号
						  
						  //构建DOM,获奖记录的结构
						  attendIngStr+='<tr>';
						  //dis_state_num==1 为已经晒单
						  if(dis_state_num==1){
							  attendIngStr+='<td><a href="ready-publish.html?pid='+goods_link+'" class="text-danger" target="_blank">'+product+'</a></td>';
							  }
							  else{
								    attendIngStr+='<td>';
									attendIngStr+='<a href="ready-publish.html?pid='+goods_link+'" class="text-danger" target="_blank">'+title+'</a>';
									attendIngStr+='<p class="nomargin">总需：'+need_count+'人次</p>';
									//attendIngStr+='<p class="nomargin">获得者：<a  href="#" class="text-danger">'+nickname+'</a>（本期共参与1人次）</p>';
									//attendIngStr+='<p class="nomargin">幸运号码：'+lottery_code+'</p>';
									//attendIngStr+='<p class="nomargin">揭晓时间：'+my_lottery_time+'</p>';
									attendIngStr+='<p class="nomargin">参与时间：'+my_time_attend2+'</p>';
									attendIngStr+='</td>';
								  }
						  if(dis_state_num==1){
							   $("#dis_pic").html("晒单图片");
							   
								if(path_ready.length<=0){
								   attendIngStr+='<td scope="row"><img src="images/noPic1.jpg" alt="" width="100"></td>';
								 }else{
									path_ready_0=pic_host+path_ready_0;
									attendIngStr+='<td scope="row"><img src="'+path_ready_0+'" alt="" width="100" onClick="viewPic('+i+');"  style="cursor:pointer"></td>';
								   }	   
							   
							  }else{
								  $("#dis_pic").html("商品图片");//未晒单
								  attendIngStr+='<td scope="row"><a href="ready-publish.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" alt="" width="60"></a></td>';
								  }		  
						  
						  if(dis_state_num==1){
							  $("#dis_th1").text("晒单时间");
							  attendIngStr+='<td><span class="text-danger">'+my_create_time_attend+'</span></td>';
							  }
						  else{
							  $("#dis_th1").text("幸运号码");
							  attendIngStr+='<td><span class="text-danger">'+luckyNum+'</span></td>';
							  }	  
						 // attendIngStr+='<td><span class="text-danger">'+luckyNum+'</span></td>';
						 if(dis_state_num==1){
							  $("#dis_th2").text("分享内容");
							  attendIngStr+='<td><p class="nomargin"><b>标题：</b>'+title+'</p><p><b>内容：</b>'+description+'</p></td>';
						      }
						 else{
							   $("#dis_th2").text("揭晓时间");
							   attendIngStr+='<td>'+my_lottery_time+'</td>';
						      }
							  
						  if(dis_state_num==1){
							  //$("#dis_th3").text("奖励（积分）");
							  //attendIngStr+='<td>'+score+'</td>';
							  attendIngStr+='<td></td>';
						      }
						 else{
							   $("#dis_th3").text("操作");
							   if(status==0){
								   attendIngStr+='<td><button class="btn btn-danger cg-btn-danger" onClick="addMyDiss('+id+');">去晒单</button></td>';
								   }else if(status==3){
									   attendIngStr+='<td><button class="btn btn-danger cg-btn-danger disabled">审核中</button></td>';
									   }else if(2){
										   attendIngStr+='<td><button class="btn btn-danger cg-btn-danger" onClick="addMyDiss_re('+id+');">未通过</button></td>';
										   }
									   else{
										   attendIngStr+='<td><button class="btn btn-danger cg-btn-danger disabled">已晒单</button></td>';
										   }
							   
						      }
						  
						  
						  attendIngStr+='</tr>';
						  
						  
					  }
					  
					  $("#goodsIng").html(attendIngStr);
				
				}
				//*****************分页
				 var pageCount=data['pageCount'];
				 dis_count=pageCount;
				 var paginationStr='';
					 paginationStr+='<li><a href="javascript:;" onClick="preGoods_disRecord();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
				 for(i=1;i<=pageCount;i++){
					 if((i-1)==dis_index){
						paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_disRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }
					 //paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_disRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }
					 paginationStr+='<li><a href="javascript:;" onClick="nextGoods_disRecord();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
				  //*****************分页
				  if(pageCount<=0){
					 $("#pagination").parent().hide();
				   }else{
					   $("#pagination").parent().show();
					   $("#pagination").html(paginationStr);
					   $("#pageCount").html(pageCount);
					   
					   }
				// $("#pagination").html(paginationStr);
				// $("#pageCount").html(pageCount);
				 
				 $(".pageBtnNum").click(function(){
					  $(this).addClass("active").siblings().removeClass("active");;
				  });
			
			     $(".loading").empty();
			
			 },complete:function(){
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
	});
	
	
}

/****我的晒单记录****翻页按钮函数*********/
function getPageGoods_disRecord(pos){ 

     dis_index=pos;
    getDisRecord(dis_index,dis_state_num,dis_soso_num);
	//alert(id+'////'+types+'....'+index);
	
}

function preGoods_disRecord(){ 
    dis_index=dis_index-1;
	if(dis_index<0){
		dis_index=0;
		return;
	}
   // getGoods(id,types,index);
	getDisRecord(dis_index,dis_state_num,dis_soso_num);
}

function nextGoods_disRecord(){ 
    dis_index=dis_index+1;
	if(dis_index>(dis_count-1)){
		dis_index=dis_count-1;
		return;
	}
    //getGoods(id,types,index);
	getDisRecord(dis_index,dis_state_num,dis_soso_num);
}

//查看晒单列表的图片大图-弹出框+轮播
function viewPic(i){
	$('#myModal3').modal('toggle');
	//先创建轮播图的大结构--不包含数据
	var pathPicStrBox='';
	pathPicStrBox+='<div id="myCarousel" class="carousel slide cg-slide" data-ride="carousel">';
	pathPicStrBox+='<ol class="carousel-indicators" id="indicators-item">';
    pathPicStrBox+='</ol>';              
    pathPicStrBox+='<div class="carousel-inner" role="listbox" id="pic">';                 
    pathPicStrBox+='<div class="loading"></div>';                
    pathPicStrBox+='</div>';                  
    pathPicStrBox+='<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">';                 
    pathPicStrBox+='<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';                   
    pathPicStrBox+='<span class="sr-only">Previous</span>';                 
    pathPicStrBox+='</a>';               
    pathPicStrBox+='<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">';                   
    pathPicStrBox+='<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';                
    pathPicStrBox+='<span class="sr-only">Next</span>';              
    pathPicStrBox+='</a>';              
    pathPicStrBox+='</div>';                  
                    
    $("#myCarouselBox").html(pathPicStrBox);           
	//包含数据的结构
	var path=picListData[i]['path'];
	var pathPicStr_0='';//底部小圆圈
	var pathPicStr='';
	pathPicStr_0+='<li data-target="#myCarousel" data-slide-to="0" class="active"></li>'; 
	pathPicStr+=' <div class="item active">';
	pathPicStr+=' <img class="first-slide" src="'+glo_pic_host+picListData[i]['path'][0]+'" alt="">';  
	pathPicStr+='</div>';
	
	for(j=1;j<path.length;j++){
		var pathPic=path[j];
		pathPicStr_0+='<li data-target="#myCarousel" data-slide-to="'+j+'"></li>';
		pathPicStr+=' <div class="item">';
		pathPicStr+=' <img class="first-slide" src="'+glo_pic_host+pathPic+'" alt="">';
		pathPicStr+='</div>';
	}
	
	$("#pic").html(pathPicStr);
	$("#indicators-item").html(pathPicStr_0);
	
	
}