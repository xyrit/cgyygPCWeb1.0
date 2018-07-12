// 查看他人参与记录，中奖记录，晒单记录，
//

//显示欢迎信息
//rightContentMarking=1为参与记录，2为中奖记录，3为晒单列表
//获取他人的头像
//从服务器获得他人的个人信息,读取用户头像

$.ajax({
	type:'post',
	url:''+ajaxUrl+'/Home/Ucenter/getOtherInfo',
	data:{
		uid:user_uid
	},
	cache:false,
	dataType:'json',
	beforeSend: function(){
		//$(".loading").show();
	},
	success:function(data){
		var code=data['code'];
		var info=data['info'];
		if(code==200){
			var host=data['host'];
			var pic_host=data['pic_host'];

			var nickname_other=data['list']['nickname'];//他人的
			var sex_other=data['list']['sex'];//他人的性别
			var face_other=data['list']['face'];//他人的头像
			var p=picHostUrl(pic_host,face_other);
			$("#userPic").html('<img src="'+p+'">');
            $("#myName2").html(nickname_other);
		}

	}

});

if(typeof(user_token) != "undefined"||typeof(user_token) == "undefined") {
	
	$("#myAccount").hide();//我的账户菜单
	$("#moneyDetail").hide();//我的资金明细
	$("#myIntegral").hide();//我的积分
	$("#myMoney").hide();//我的红包
	$("#inviteFriend").hide();//邀请好友
	$("#myAddres").hide();//我的收货地址
	$("#mySystem").hide();//我的个人中心设置
	$("#myBtnGroup").hide();//签到，修改密码，收货地址 按钮
	
	$("#myName").html(nickname);
	$("#myName2").html(nickname);
	$("#userId").html(user_uid);
	$("#userPhone").parent().empty();
}
else{
	//菜单改变颜色
	$("#myAccount").addClass("active");
	
}
if(typeof(nickname)!='undefined'){
	$("#myName2").html(nickname).next().remove();
}

/*********他人的参与明细*********/

var state_num_lotteryRecord=1;
if(rightContentMarking==1){
	//他人的参与明细
	getAttendList();
	
}
else if(rightContentMarking==2){
	//他人的中奖记录
	getLotteryList();
	//getMyLotteryRecordDetails();
}
else{
	//他人的晒单
    getDisList();
}
		
//他人的参与记录
//1他人参与记录
var attr_index=0;
var attr_state_num=0;
var attr_soso_num=0;
var glo_List;
var glo_startcode;
function getAttendList(){
	//alert(soso_num);
	
	  $.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Attend/attendDetail',  
			data:{
				uid:user_uid,
				pageSize:10,
				pageIndex:0,
				state:0,  //参与明细状态 0 为进行中商品,1为即将揭晓商品,2为已揭晓商品. (必须)
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
				$("#attendRecord").addClass("active").siblings().removeClass("active");
				var attend_pageCount=data['pageCount'];
				var att_list=data['list'];
				
				var startCode=data['startCode'];
				glo_startcode=startCode;//翻页后弹出框调用函数所需要的全
				glo_List=att_list;//翻页后弹出框调用函数所需要的全局
				
				//建立DOM结构
				var attendStr='';
				attendStr+='<div class="row">';
					attendStr+='<div class="per-goods-box nomargin">';
					 // Nav tabs -->
					attendStr+='<ul class="nav nav-tabs" role="tablist">';
					
					attendStr+='<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab" id="ingMenu" aria-expanded="true">进行中商品</a></li>';
					attendStr+='<li role="presentation"><a href="#home" aria-controls="profile" role="tab" data-toggle="tab" id="soonMenu"  aria-expanded="false">等待揭晓商品</a></li>';
					attendStr+='<li role="presentation"><a href="#home" aria-controls="profile" role="tab" data-toggle="tab" id="readyMenu" aria-expanded="false">已揭晓商品</a></li>';
					
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
					/*attendStr+='<div class="per-time-select pull-right">';
					attendStr+='<label>选择时间段：</label>';
					attendStr+='<input type="text" class="cg_input Wdate" onClick="WdatePicker()">';
					attendStr+='<span class="select-time" style="width:10px">-</span>';
					attendStr+='<input type="text" class="cg_input Wdate" onClick="WdatePicker()">';
					attendStr+='<button type="button" class="btn btn-sm cg-btn-square">搜索</button>';
					attendStr+='</div>';*/
					attendStr+='</div>';
					// Tab panes input end-->    
					// Tab panes -->
					attendStr+='<div class="tab-content">';
					attendStr+='<div role="tabpanel" class="tab-pane active" id="home">';
					 //商品列表
					attendStr+='<table class="table table-striped table-striped_details_1 table-bordered">';
					attendStr+='<thead>'; 
					attendStr+='<tr>'; 
					attendStr+='<th>商品图片</th>'; 
					attendStr+='<th class="width-table-tr">商品名称</th>';
					attendStr+='<th width="85">云购状态</th>';
					attendStr+='<th>参与人次</th>';
					attendStr+='<th width="170">参与码</th>';
					attendStr+='<th width="120">操作</th>';
					attendStr+='</tr>'; 
					attendStr+='</thead>'; 
					attendStr+='<tbody id="goodsIng">'; 
					
					attendStr+='</tbody>';
					attendStr+='</table>';
					//商品列表结束
					attendStr+='</div>';
					
					var attendIngStr='';
					
					
					/*else{
						
						}*/
						for(i=0;i<att_list.length;i++){
							var id=att_list[i]['id'];
							var pid=att_list[i]['pid'];
							var title=att_list[i]['title'];
							//var lucky_code=att_list[i]['lucky_code'];
							var lottery_id=att_list[i]['lottery_id'];
							var attend_count=att_list[i]['attend_count'];
							var need_count=att_list[i]['need_count'];
							var path=data['host']+att_list[i]['path'];
							//var create_time=att_list[i]['create_time'];
							var cover_id=att_list[i]['cover_id'];
							var lottery_code=att_list[i]['lottery_code'];
							var nickname=att_list[i]['nickname'];
							var lottery_time=att_list[i]['lottery_time'];
							var remain_count=att_list[i]['remain_count'];
							var startCode=data['startCode'];
							var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
							var uid=att_list[i]['lp_uid'];
							
							var lucky_code_0=att_list[i]['time_code'][0]['lucky_code'];
						    var code_create_time_0=att_list[i]['time_code'][0]['create_time'];
							var attend_all=att_list[i]['attend_all'];//此商品所有的已参与人次
							var progress_attend='';
							 if(need_count<1){
								  progress_attend=0;
							   }else{
								  progress_attend=(attend_all/need_count)*100;
								}
							
							//时间戳格式化
							//参与时间
							var  time_attend= code_create_time_0;
							var newDate_attend = new Date();
							newDate_attend.setTime(time_attend * 1000);
							var my_create_time_attend=newDate_attend.format('yyyy-MM-dd h:m:s');
							
							//把startCode分离出来，然后以分号连接成一个新数字
							//var my_trueAttendCode='';
							var my_trueAttendCode_2='';
							var s=lucky_code_0.split(',');//把startCode分离出来，然后以分号连接成一个新数字
							/*for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
							  //把startCode分离出来，然后以分号连接成一个新数字
							   my_trueAttendCode+=(startCode+Number(s[j]))+'，';
							}
							my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号*/
							//先显示几条，点击后弹出全部数据
							for(var j = 0;j<1;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
							  //把startCode分离出来，然后以分号连接成一个新数字
							   my_trueAttendCode_2+=(startCode+Number(s[j]))+'，';
							}
							my_trueAttendCode_2=my_trueAttendCode_2.substring(0,my_trueAttendCode_2.length-1);//去掉最后一个分号
							
							attendIngStr+='<tr>';
							attendIngStr+='<td scope="row"><a href="goods-details.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" alt="" width="60"></a></td>';
							attendIngStr+='<td class="row_1">';
							attendIngStr+='<div class="cg-progress-pre">';
							attendIngStr+='<div class="pre-tip"><a href="goods-details.html?pid='+goods_link+'" target="_blank" class="text-danger">'+title+'</a></div>';
							attendIngStr+='<div class="progress cg-progress">';
							attendIngStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress_attend+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress_attend+'%">';
							attendIngStr+='<span class="sr-only">'+progress_attend+'% Complete (warning)</span>';
							attendIngStr+='</div>';
							attendIngStr+='</div>';
							attendIngStr+='<div class="pre-tip">';
							attendIngStr+='<p class="nomargin">'+attend_count+'/'+need_count+' (剩余'+remain_count+'人次)</p>';
							attendIngStr+='<p class="nomargin">参与时间：'+my_create_time_attend+'</p>';
							attendIngStr+='</div>';
							attendIngStr+='</div>';
							attendIngStr+='</td>';
							attendIngStr+='<td>正在揭晓</td>';
							attendIngStr+='<td>'+attend_count+'人次<br/><a href="javascript:;" class="text-danger" onClick="goToCar('+lottery_id+','+pid+','+1+');">立即参与</a></td>';
							//attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder mypopover margin-l-10" title="本次参与'+attend_count+'人次" data-content="'+my_trueAttendCode+'" data-trigger="focus" data-placement="left" data-toggle="popover"> 查看全部</button></p</td>';
							//只有一个参与人次的时候不显示按钮
							if(attend_count==1){
							  attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'</p</td>';
							  }else{
								  //attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder margin-l-10" onClick="alertList('+i+');">查看全部</button></p</td>';
								  attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder margin-l-10" onClick="alertList('+lottery_id+');">查看全部</button></p</td>';
								  
								  } 
							
							//attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder margin-l-10" onClick="alertList('+i+');">查看全部</button></p</td>';
							
							attendIngStr+='<td><a href="goods-details.html?pid='+goods_link+'" target="_blank" class="linkIk">查看详情>></a></td>';
							attendIngStr+='</tr>';
							
						}
               
				   
				$("#rightContent").html(attendStr);//把获取到的数据加载进右边内容容器中
				if(att_list.length<=0){
					   $("#goodsIng").html('<tr><td colspan="6" class="text-center"><span class="text-gray">没有记录</span></td></tr>');
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
				 count=pageCount;
				 var paginationStr='';
					 paginationStr+='<li><a href="javascript:;" onClick="preGoods();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
				 /*for(i=1;i<=pageCount;i++){
					 
					 paginationStr+='<li><a href="javascript:;" onClick="getPageGoods('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }*/
				  for(i=1;i<=pageCount;i++){
					 if((i-1)==attr_index){
						paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }
					 //paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }
					 paginationStr+='<li><a href="javascript:;" onClick="nextGoods();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
				  //*****************分页
				 $("#rightContent").append(attendPageStr);
				 $("#pagination").html(paginationStr);
				 $("#pageCount").html(pageCount);
			   
			   //给当前按钮添加背景色
				/*$(".pageBtnNum").parent().first().addClass("active");
				$(".pageBtnNum").click(function(){
					  $(this).parent().addClass("active").siblings().removeClass("active");;
				  });*/
				//如果是当前标签打开的情况下，不调用接口
				
				$("#ingMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getAttendList_2(0,0,0);
						
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
						attr_index=0;
                        attr_state_num=0;
                        attr_soso_num=0;
					}
				});
				$("#soonMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getAttendList_2(0,1,0);
						attr_index=0;
                        attr_state_num=1;
                        attr_soso_num=0;
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
					}
				});
				$("#readyMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getAttendList_2(0,2,0);
						attr_index=0;
                        attr_state_num=2;
                        attr_soso_num=0;
						
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
					}
				});
				//按照时间呈现数据,全部，今天，....
				$(".timeMenu").click(function(){
					var new_soso_num=$(this).attr("data-num");
					$(this).addClass("active").siblings().removeClass("active");
					//每切换一次，页码从0开始
					getAttendList_2(0,attr_state_num,new_soso_num);
					//把获取到的值赋给全局变量，否则点击翻页时，soso_num又会变为0了
					 attr_soso_num=new_soso_num;
					
				});
				//开启tips；
				$('[data-toggle="popover"]').popover();
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

//,他人的参与明细
//参与明细状态
$("#attendRecord").click(function(){
	
	  attr_index=0;
      attr_state_num=0;
      attr_soso_num=0;
	  getAttendList();
});

//参与记录弹出框--未翻页前
/*function alertList(i){
  //在此循环参与记录的全局变量 循环幸运码和时间出来
  var luckyCodeStr='';
  for(k=0;k<glo_List[i]['time_code'].length;k++){
	  var lucky_code=glo_List[i]['time_code'][k]['lucky_code'];
	  var code_create_time=glo_List[i]['time_code'][k]['create_time'];
	  var attend_count=glo_List[i]['attend_count'];
	  
	  //把startCode分离出来，然后以分号连接成一个新数字
	  var my_trueAttendCode='';
	  var my_trueAttendCode_2='';
	  var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
	  for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
		//把startCode分离出来，然后以分号连接成一个新数字
		// my_trueAttendCode+=(glo_startcode+Number(s[j]))+'，';
		 my_trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startcode+Number(s[j]))+'</span>';
	  }
	  my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号
	  //时间戳格式化
	  //参与时间
	  var  time_attend= code_create_time;
	  var newDate_attend = new Date();
	  newDate_attend.setTime(time_attend * 1000);
	  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');
	  
	  luckyCodeStr+='<div class="well nomargin">';
	  luckyCodeStr+='<p class="text-gray2">'+my_create_time_attend+'</p>';//创建时间
	  luckyCodeStr+='<p class="word-break">'+my_trueAttendCode+'</p>';//幸运码,弹出框中的
	  luckyCodeStr+='</div>';
	  
  }
  $("#myModal").modal("toggle");
  $("#myAttend_count2").html('我一共参与了<span class="text-danger">'+attend_count+'</span>人次');
  $("#luckyCode").html(luckyCodeStr);
}*/
//参与记录弹出框--翻页后
/*function alertList2(i){
	
	//$("#myAttend_count2").html('');
    //$("#luckyCode").html('');
	
  //在此循环参与记录的全局变量 循环幸运码和时间出来  注意区分glo_List（为未翻页前的变量）与glo_List2（翻页后的全局变量）
  var luckyCodeStr2='';
  for(k=0;k<glo_List2[i]['time_code'].length;k++){
	  var lucky_code=glo_List2[i]['time_code'][k]['lucky_code'];
	  var code_create_time=glo_List2[i]['time_code'][k]['create_time'];
	  var attend_count=glo_List2[i]['attend_count'];
	  
	  //把startCode分离出来，然后以分号连接成一个新数字
	  var my_trueAttendCode='';
	  var my_trueAttendCode_2='';
	  var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
	  for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
		//把startCode分离出来，然后以分号连接成一个新数字
		// my_trueAttendCode+=(glo_startcode+Number(s[j]))+'，';
		my_trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startcode+Number(s[j]))+'</span>';
	  }
	  my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号
	  //时间戳格式化
	  //参与时间
	  var  time_attend= code_create_time;
	  var newDate_attend = new Date();
	  newDate_attend.setTime(time_attend * 1000);
	  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');
	  
	  luckyCodeStr2+='<div class="well nomargin">';
	  luckyCodeStr2+='<p class="text-gray2">'+my_create_time_attend+'</p>';//创建时间
	  luckyCodeStr2+='<p class="word-break">'+my_trueAttendCode+'</p>';//幸运码,弹出框中的
	  luckyCodeStr2+='</div>';
	  
  }
  $("#myModal").modal("toggle");
  $("#myAttend_count2").html('我一共参与了<span class="text-danger">'+attend_count+'</span>人次');
  $("#luckyCode").html(luckyCodeStr2);
 
  
}*/
//参与记录弹出框
function alertList(lottery_id){
  //调用新接口
  $.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Attend/getAttendInfo',  
			data:{
				uid:user_uid,
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
  
}
var glo_List2;//翻页后弹出框调用函数所需要的全
var glo_startcode2;//翻页后弹出框调用函数所需要的全
var attr_count;
/******他人的参与明细中的 进行中的商品，即将揭晓的商品，已经揭晓的商品，点击再次调用我的参与明细的接口*******/
function getAttendList_2(attr_index,attr_state_num,attr_soso_num){
	var attr_index_2=attr_index;
	var attr_state_num_2=attr_state_num;
	var attr_soso_num_2=attr_soso_num
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Attend/attendDetail',  
			data:{
				uid:user_uid,
				pageSize:10,
				pageIndex:attr_index_2,
				state:attr_state_num_2, //参与明细状态 0 为进行中商品,1为即将揭晓商品,2为已揭晓商品. (必须)
				soso:attr_soso_num_2
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				$("#goodsIng").html('<div class="loading"></div>');
				$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
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
				
				var attend_pageCount=data['pageCount'];
				var att_list=data['list'];
				var startCode=data['startCode'];
				glo_startcode2=startCode;//翻页后弹出框调用函数所需要的全
				glo_List2=att_list;//翻页后弹出框调用函数所需要的全局
				
				if(att_list.length<=0){
					$("#goodsIng").html('<tr><td colspan="6" class="text-center"><span class="text-gray">没有记录</span></td></tr>');
					//$("#pageNav").empty();
					
					}
				else{	
					  var attendIngStr='';
					  for(i=0;i<att_list.length;i++){
						  var id=att_list[i]['id'];
						  var pid=att_list[i]['pid'];
						  var title=att_list[i]['title'];
						  //var lucky_code=att_list[i]['lucky_code'];
						  var lottery_id=att_list[i]['lottery_id'];
						  var attend_count=att_list[i]['attend_count'];
						  var need_count=att_list[i]['need_count'];
						  var path=data['host']+att_list[i]['path'];
						  //var create_time=att_list[i]['create_time'];
						  var cover_id=att_list[i]['cover_id'];
						  var lottery_code=parseInt(startCode)+parseInt(att_list[i]['lottery_code']);
						  var nickname=att_list[i]['nickname'];
						  var lottery_time=att_list[i]['lottery_time'];
						  var remain_count=att_list[i]['remain_count'];
						  var startCode=data['startCode'];
						  var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
						  var lucky_code_0=att_list[i]['time_code'][0]['lucky_code'];
						  var code_create_time_0=att_list[i]['time_code'][0]['create_time'];
						  var uid=att_list[i]['lp_uid'];//中奖用户ID
						  var attend_all=att_list[i]['attend_all'];//此商品所有的已参与人次
						  var progress_attend='';
						   if(need_count<1){
								progress_attend=0;
							 }else{
								progress_attend=(attend_all/need_count)*100;
							  }
						  var user_uid=uid+'&'+'nickname='+escape(nickname)+'&'+'rightContentMarking='+2;//给链接地址赋值,传递用户ID 
						  //时间戳格式化
						  //参与时间
						  var  time_attend= code_create_time_0;
						  var newDate_attend = new Date();
						  newDate_attend.setTime(time_attend * 1000);
						  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd h:m:s');
						  //揭晓时间
						  var  time_lottery= lottery_time;
						  var newDate_lottery = new Date();
						  newDate_lottery.setTime(time_lottery * 1000);
						  var my_lottery_time=newDate_lottery.format('yyyy-MM-dd h:m:s');
						  
						  //把startCode分离出来，然后以分号连接成一个新数字
						  //var my_trueAttendCode='';
						  var my_trueAttendCode_2='';
						  var s=lucky_code_0.split(',');//把startCode分离出来，然后以分号连接成一个新数字
						  /*for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
							//把startCode分离出来，然后以分号连接成一个新数字
							 my_trueAttendCode+=(startCode+Number(s[j]))+'，';
						  }
						  my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号*/
						  //先显示几条，点击后弹出全部数据
						  for(var j = 0;j<1;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
							//把startCode分离出来，然后以分号连接成一个新数字
							 my_trueAttendCode_2+=(startCode+Number(s[j]))+'，';
						  }
						  my_trueAttendCode_2=my_trueAttendCode_2.substring(0,my_trueAttendCode_2.length-1);//去掉最后一个分号
						  
						  //构建DOM,根据attend_num的不同构建不同的结构
						  
						  attendIngStr+='<tr>';
						  if(attr_state_num==0){
							  attendIngStr+='<td scope="row"><a href="goods-details.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" alt="" width="60"></a></td>';
							  
						  }else if(attr_state_num==1){
							  attendIngStr+='<td scope="row"><a href="soon-publish.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" alt="" width="60"></a></td>';
							  }else{
								  attendIngStr+='<td scope="row"><a href="ready-publish.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" alt="" width="60"></a></td>';
								  }
						  
						  
						  if(attr_state_num==2){
							  attendIngStr+='<td>';
							  attendIngStr+='<a href="ready-publish.html?pid='+goods_link+'" target="_blank" class="text-danger">'+title+'</a>';
							  attendIngStr+='<p class="nomargin">总需：'+need_count+'人次</p>';
							  //
							  if(typeof(userId) == "undefined"||uid!=userId){
							    attendIngStr+='<p class="nomargin">获得者：<a href="personal-index-other.html?uid='+user_uid+'" class="text-danger">'+nickname+'</a></p>';
							   }else{
									attendIngStr+='<p class="nomargin">获得者：<a href="personal-index.html?per_market=2" class="text-danger" target="_blank">'+nickname+'</a></p>';
								   } 
							  //
							  
							  attendIngStr+='<p class="nomargin">幸运号码：'+lottery_code+'</p>';
							  attendIngStr+='<p class="nomargin">揭晓时间：'+my_lottery_time+'</p>';
							  attendIngStr+='<p class="nomargin">参与时间：'+my_create_time_attend+'</p>';
							  attendIngStr+='</td>';
							  }else{
								  
							  attendIngStr+='<td class="row_1">';
							  attendIngStr+='<div class="cg-progress-pre">';
							  
							  if(attr_state_num==1){
								  attendIngStr+='<div class="pre-tip"><a href="soon-publish.html?pid='+goods_link+'" class="text-danger">'+title+'</a></div>';
								  }else{
									  //正在进行中，需要进度条
									  attendIngStr+='<div class="pre-tip"><a href="goods-details.html?pid='+goods_link+'" class="text-danger">'+title+'</a></div>';
									  attendIngStr+='<div class="progress cg-progress">';
									  attendIngStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress_attend+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress_attend+'%">';
									  attendIngStr+='<span class="sr-only">'+progress_attend+'% Complete (warning)</span>';
									  attendIngStr+='</div>';
									  attendIngStr+='</div>';
									  attendIngStr+='<div class="pre-tip">';
									  attendIngStr+='<p class="nomargin">'+attend_count+'/'+need_count+' (剩余'+remain_count+'人次)</p>';
									  }
							  //attendIngStr+='<div class="pre-tip"><a href="soon-publish.html?pid='+goods_link+'" class="text-danger">'+title+'</a></div>';
							  /*attendIngStr+='<div class="progress cg-progress">';
							  attendIngStr+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress_attend+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress_attend+'%">';
							  attendIngStr+='<span class="sr-only">'+progress_attend+'% Complete (warning)</span>';
							  attendIngStr+='</div>';
							  attendIngStr+='</div>'*/;
							  attendIngStr+='<div class="pre-tip">';
							  //attendIngStr+='<p class="nomargin">'+attend_count+'/'+need_count+' (剩余'+remain_count+'人次)</p>';
							  attendIngStr+='<p class="nomargin">参与时间：'+my_create_time_attend+'</p>';
							  attendIngStr+='</div>';
							  attendIngStr+='</div>';
							  attendIngStr+='</td>';	
						  }
						  if(attr_state_num==0){
							  attendIngStr+='<td>正在揭晓</td>';
						  }else if(attr_state_num==1){
							  attendIngStr+='<td>即将揭晓</td>';
							  }else{
								  attendIngStr+='<td>已经揭晓</td>';
								  }
						  if(attr_state_num==0){
							  attendIngStr+='<td>'+attend_count+'人次<br/><a href="javascript:;" class="text-danger" onClick="goToCar('+lottery_id+','+pid+','+1+');">立即参与</a></td>';
							  }
							  else{
								  attendIngStr+='<td>'+attend_count+'人次</td>';
								  }
						  
						  
						 // attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder mypopover margin-l-10" title="本次参与'+attend_count+'人次" data-content="'+my_trueAttendCode+'" data-trigger="focus" data-placement="left" data-toggle="popover"> 查看全部</button></p</td>';
						if(attend_count==1){
							  attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'</p</td>';
							  }else{
								  attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder margin-l-10" onClick="alertList('+lottery_id+');">查看全部</button></p</td>';
								  } 
						// attendIngStr+='<td><p class="word-break nomargin">'+my_trueAttendCode_2+'<button  type="button" class="btn-sm cg-btn-square line-height-sm text-white noborder margin-l-10" onClick="alertList2('+i+');">查看全部</button></p</td>';
						 
						 if(attr_state_num==0){
							  attendIngStr+='<td><a href="goods-details.html?pid='+goods_link+'" target="_blank" class="">查看详情>></a></td>';
						  }else if(attr_state_num==1){
							  attendIngStr+='<td><a href="soon-publish.html?pid='+goods_link+'" target="_blank" class="">查看详情>></a></td>';
							  }else{
								  attendIngStr+='<td><a href="ready-publish.html?pid='+goods_link+'" target="_blank" class="">查看详情>></a></td>';
								  }
						  
						  attendIngStr+='</tr>';
						  
					  }
					  
					  $("#goodsIng").html(attendIngStr);
				
				}
				//*****************分页
				 var pageCount=data['pageCount'];
				 attr_count=pageCount;
				 var paginationStr='';
					 paginationStr+='<li><a href="javascript:;" onClick="preGoods();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
				 /*for(i=1;i<=pageCount;i++){
					 paginationStr+='<li><a href="javascript:;" onClick="getPageGoods('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }*/
				  for(i=1;i<=pageCount;i++){
					 if((i-1)==attr_index){
						paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }
					 //paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }
					 paginationStr+='<li><a href="javascript:;" onClick="nextGoods();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
				  //*****************分页
				 $("#pagination").html(paginationStr);
				 $("#pageCount").html(pageCount);
				 //给当前按钮添加背景色
				/*$(".pageBtnNum").parent().first().addClass("active");
				$(".pageBtnNum").click(function(){
					  $(this).parent().addClass("active").siblings().removeClass("active");;
				  });*/
				//开启tips；
				$('[data-toggle="popover"]').popover();
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
//按照时间检索

/****他人的参与记录****翻页按钮函数*********/
function getPageGoods(pos){ 

    attr_index=pos;
    getAttendList_2(attr_index,attr_state_num,attr_soso_num);
	//alert(id+'////'+types+'....'+index);
	
}

function preGoods(){ 
    attr_index=attr_index-1;
	if(attr_index<0){
		attr_index=0;
		return;
	}
   // getGoods(id,types,index);
	getAttendList_2(attr_index,attr_state_num,attr_soso_num);
}

function nextGoods(){ 
    attr_index=attr_index+1;
	if(attr_index>(attr_count-1)){
		attr_index=attr_count-1;
		return;
	}
    //getGoods(id,types,index);
	getAttendList_2(attr_index,attr_state_num,attr_soso_num);//soso_num_2这个为了点击  不同的时间切换后再点击翻页确保绑定soso的值不变
}


//2中奖记录
//需要写两个函数，第一个是默认加载的，第二个是点击翻页等查询的
//pageIndex，soso，state给默认值



/*********查看他人的中奖记录*********/
//点击左侧按钮进入，及各种翻页，按照时间显示
//定义全局变量
var lo_index=0;
var lo_state_num=1;
var lo_soso_num=0;
var lo_count;
$("#luckyRecord").click(function(){
	  lo_index=0;
      lo_state_num=1;
      lo_soso_num=0;
	 getLotteryList();
	 
});
function getLotteryList(){
	
	
	  $.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/UcenterLottery/lotteryRecord',  
			data:{
				uid:user_uid,
				pageSize:5,
				pageIndex:0,
				state:1, // 0 虚拟商品,1实物商品. (必须)
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
				$("#luckyRecord").addClass("active").siblings().removeClass("active");
				var attend_pageCount=data['pageCount'];
				var att_list=data['list'];
				//建立DOM结构
				var attendStr='';
				attendStr+='<div class="row">';
					attendStr+='<div class="per-goods-box nomargin">';
					 // Nav tabs -->
					attendStr+='<ul class="nav nav-tabs" role="tablist">';
					
					attendStr+='<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab" id="readyMenu" aria-expanded="true">实物商品</a></li>';
					attendStr+='<li role="presentation"><a href="#home" aria-controls="profile" role="tab" data-toggle="tab" id="virtualMenu"  aria-expanded="false">虚拟商品</a></li>';
					
					
					
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
					attendStr+='<th>商品图片</th>'; 
					attendStr+='<th class="width-table-tr">商品名称</th>';
					attendStr+='<th>中奖信息</th>';
					attendStr+='<th>参与时间</th>';
					attendStr+='<th>揭晓时间</th>';
					attendStr+='</tr>'; 
					attendStr+='</thead>'; 
					attendStr+='<tbody id="goodsIng">'; 
					
					attendStr+='</tbody>';
					attendStr+='</table>';
					//商品列表结束
					attendStr+='</div>';
					
					//即将揭晓
                    
            
					var attendIngStr='';
					
				for(i=0;i<att_list.length;i++){
					var id=att_list[i]['id'];
					var pid=att_list[i]['pid'];
					var title=att_list[i]['title'];
					//var lucky_code=att_list[i]['lucky_code'];
					var lottery_id=att_list[i]['lottery_id'];
					var attend_count=att_list[i]['attend_count'];
					var need_count=att_list[i]['need_count'];
					var path=data['host']+att_list[i]['path'];
					
				    var attend_time=att_list[i]['attend_time'];//参与时间
					var cover_id=att_list[i]['cover_id'];
					var lottery_code=Number(att_list[i]['lottery_code']);
					//var nickname=att_list[i]['nickname'];
					//var lottery_time=att_list[i]['lottery_time'];
					var apply_time=att_list[i]['apply_time'];//揭晓时间
					var remain_count=att_list[i]['remain_count'];
					var startCode=data['startCode'];
					var luckyNum=startCode+lottery_code;//这是幸运号码
					var status=att_list[i]['status']; //物流状态：1待发货，2待客户签收，3已签收，4已拒绝，5已申请换货，6已拒绝申请换货
					var express_name=att_list[i]['express_name'];//物流公司名称
					var express_number=att_list[i]['express_number'];//物流单号
					var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
					var progress_attend='';
					 if(need_count<1){
						  progress_attend=0;
					   }else{
						  progress_attend=(attend_count/need_count)*100;
						}
					
					var newlottery=startCode+lottery_code; //幸运号码
					
					attendIngStr+='<tr>';
					attendIngStr+='<td scope="row"><a href="ready-publish.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" alt="" width="60"></a></td>';
					attendIngStr+='<td>';
					attendIngStr+='<a href="ready-publish.html?pid='+goods_link+'" target="_blank" class="text-danger">'+title+'</a>';
					attendIngStr+='<p class="nomargin">总需：'+need_count+'人次</p>';
					//attendIngStr+='<p class="nomargin">获得者：<a href="#" class="text-danger">'+nickname+'</a>（本期共参与1人次）</p>';
					attendIngStr+='<p class="nomargin">幸运号码：'+luckyNum+'</p>';
					attendIngStr+='<p class="nomargin">揭晓时间：'+apply_time+'</p>';
					attendIngStr+='<p class="nomargin">参与时间：'+attend_time+'</p>';
					attendIngStr+='</td>';
					attendIngStr+='<td>';
					attendIngStr+='<p class="nomargin">幸运号码：<span class="text-danger">'+newlottery+'</span></p>';
					attendIngStr+='<p class="nomargin">总共参与了：'+attend_count+'人次</p>';
					attendIngStr+='</td>';
					attendIngStr+='<td>';
					attendIngStr+=''+attend_time+'';
					attendIngStr+='</td>';
					attendIngStr+='<td>';
					attendIngStr+=''+apply_time+'';
					attendIngStr+='</td>';
					
					attendIngStr+='</tr>';
					
				}
               
				$("#rightContent").html(attendStr);//把获取到的数据加载进右边内容容器中
				if(att_list.length<=0){
					  $("#goodsIng").html('<tr><td colspan="6" class="text-center"><span class="text-gray">没有记录</span></td></tr>');
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
				 count=pageCount;
				 var paginationStr='';
					 paginationStr+='<li><a href="javascript:;" onClick="preGoods_lotteryRecord();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
				 /*for(i=1;i<=pageCount;i++){
					 paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }*/
				  for(i=1;i<=pageCount;i++){
					 if((i-1)==lo_index){
						paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }
					// paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }
					 paginationStr+='<li><a href="javascript:;" onClick="nextGoods_lotteryRecord();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
				  //*****************分页
				 $("#rightContent").append(attendPageStr);
				 $("#pagination").html(paginationStr);
				 $("#pageCount").html(pageCount);
			   
				
				//给当前按钮添加背景色
				/*$(".pageBtnNum").parent().first().addClass("active");
				$(".pageBtnNum").click(function(){
					  $(this).parent().addClass("active").siblings().removeClass("active");;
				  });*/
				  //如果是当前标签打开的情况下，不调用接口
				//实物
				$("#readyMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getMyLotteryRecordDetails(0,1,0);
						//state_num_lotteryRecord=1;
						//alert(lo_state_num);
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
						lo_index=0;
                        lo_state_num=1;
                        lo_soso_num=0;
						
					}
				});
				//虚物
				$("#virtualMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getMyLotteryRecordDetails(0,0,0);
						//state_num_lotteryRecord=0;
						//alert(lo_state_num);
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
						lo_index=0;
                        lo_state_num=0;
                        lo_soso_num=0;
					}
				});
				//按照时间呈现数据,全部，今天，....
				$(".timeMenu").click(function(){
					var new_soso_num=$(this).attr("data-num");
					$(this).addClass("active").siblings().removeClass("active");
					//每切换一次，页码从0开始
					getMyLotteryRecordDetails(0,lo_state_num,new_soso_num);
					//把获取到的值赋给全局变量，否则点击翻页时，soso_num又会变为0了
					lo_soso_num=new_soso_num;
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


function getMyLotteryRecordDetails(lo_index,lo_state_num,lo_soso_num){
	var lo_index_2=lo_index;
	var lo_state_num_2=lo_state_num;
	var lo_soso_num_2=lo_soso_num;
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/UcenterLottery/lotteryRecord',  
			data:{
				uid:user_uid,
				pageSize:5,
				pageIndex:lo_index_2,
				state:lo_state_num_2, //
				soso:lo_soso_num_2
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
				
				if(att_list.length<=0){
					$("#goodsIng").html('<tr><td colspan="6" class="text-center"><span class="text-gray">没有记录</span></td></tr>');
					//$("#pageNav").empty();
					
					}
				else{	
					  var attendIngStr='';
					  for(i=0;i<att_list.length;i++){
						  var id=att_list[i]['id'];
						  var pid=att_list[i]['pid'];
						  var title=att_list[i]['title'];
						  var lucky_code=att_list[i]['lucky_code'];
						  var lottery_id=att_list[i]['lottery_id'];
						  var attend_count=att_list[i]['attend_count'];
						  var need_count=att_list[i]['need_count'];
						  var path=data['host']+att_list[i]['path'];
						  var attend_time=att_list[i]['attend_time'];//参与时间
						  //var create_time=att_list[i]['create_time'];
						  var cover_id=att_list[i]['cover_id'];
						  var lottery_code=Number(att_list[i]['lottery_code']);
						  //var nickname=att_list[i]['nickname'];
						  //var lottery_time=att_list[i]['lottery_time'];
						  var apply_time=att_list[i]['apply_time'];//揭晓时间
						  var remain_count=att_list[i]['remain_count'];
						  var startCode=data['startCode'];
						  var luckyNum=startCode+lottery_code;//这是幸运号码
						  var status=att_list[i]['status']; //物流状态：1待发货，2待客户签收，3已签收，4已拒绝，5已申请换货，6已拒绝申请换货
						  var express_name=att_list[i]['express_name'];//物流公司名称
				      	  var express_number=att_list[i]['express_number'];//物流单号
						  var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
						  var progress_attend='';
						   if(need_count<1){
								progress_attend=0;
							 }else{
								progress_attend=(attend_count/need_count)*100;
							  }
						  var newlottery=startCode+lottery_code; //幸运号码
						  //时间戳格式化
						  //参与时间
						/*  var  time_attend= create_time;
						  var newDate_attend = new Date();
						  newDate_attend.setTime(time_attend * 1000);
						  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd h:m:s');*/
						  //揭晓时间
						 /* var  time_lottery= lottery_time;
						  var newDate_lottery = new Date();
						  newDate_lottery.setTime(time_lottery * 1000);
						  var my_lottery_time=newDate_lottery.format('yyyy-MM-dd h:m:s');*/
						  
						  //把startCode分离出来，然后以分号连接成一个新数字
						  /*var my_trueAttendCode='';
						  var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
						  for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
							//把startCode分离出来，然后以分号连接成一个新数字
							 my_trueAttendCode+=(startCode+Number(s[j]))+'，';
						  }
						  my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号*/
						  
						  //构建DOM,获奖记录的结构
						  attendIngStr+='<tr>';
						  attendIngStr+='<td scope="row"><a href="ready-publish.html?pid='+goods_link+'" target="_blank"><img src="'+path+'" alt="" width="60"></a></td>';
						  attendIngStr+='<td>';
						  attendIngStr+='<a href="ready-publish.html?pid='+goods_link+'" target="_blank" class="text-danger">'+title+'</a>';
						  attendIngStr+='<p class="nomargin">总需：'+need_count+'人次</p>';
						  //attendIngStr+='<p class="nomargin">获得者：<a href="#" class="text-danger">'+nickname+'</a>（本期共参与1人次）</p>';
						  attendIngStr+='<p class="nomargin">幸运号码：'+luckyNum+'</p>';
						  attendIngStr+='<p class="nomargin">揭晓时间：'+apply_time+'</p>';
						  attendIngStr+='<p class="nomargin">参与时间：'+attend_time+'</p>';
						  attendIngStr+='</td>';
						  attendIngStr+='<td>';
						  attendIngStr+='<p class="nomargin">幸运号码：<span class="text-danger">'+newlottery+'</span></p>';
						  attendIngStr+='<p class="nomargin">总共参与了：'+attend_count+'人次</p>';
						  attendIngStr+='</td>';
						  attendIngStr+='<td>';
						  attendIngStr+=''+attend_time+'';
						  attendIngStr+='</td>';
						  attendIngStr+='<td>';
						  attendIngStr+=''+apply_time+'';
						  attendIngStr+='</td>';
						  
						  attendIngStr+='</tr>';
						  
						  
					  }
					  
					  $("#goodsIng").html(attendIngStr);
				
				}
				//*****************分页
				 var pageCount=data['pageCount'];
				 lo_count=pageCount;
				 var paginationStr='';
					 paginationStr+='<li><a href="javascript:;" onClick="preGoods_lotteryRecord();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
				 /*for(i=1;i<=pageCount;i++){
					 paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }*/
				  for(i=1;i<=pageCount;i++){
					 if((i-1)==lo_index){
						paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }
					// paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }
					 paginationStr+='<li><a href="javascript:;" onClick="nextGoods_lotteryRecord();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
				  //*****************分页
				 $("#pagination").html(paginationStr);
				 $("#pageCount").html(pageCount);
				 
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

/****查看他人的中奖记录****翻页按钮函数*********/

function getPageGoods_lotteryRecord(pos){ 
     lo_index=pos;
     getMyLotteryRecordDetails(lo_index,lo_state_num,lo_soso_num);
	//alert(id+'////'+types+'....'+index);
}
function preGoods_lotteryRecord(){ 
    lo_index=lo_index-1;
	if(lo_index<0){
		lo_index=0;
		return;
	}
   // getGoods(id,types,index);
	getMyLotteryRecordDetails(lo_index,lo_state_num,lo_soso_num);
}
function nextGoods_lotteryRecord(){ 
    lo_index=lo_index+1;
	if(lo_index>(lo_count-1)){
		lo_index=lo_count-1;
		return;
	}
    //getGoods(id,types,index);
	getMyLotteryRecordDetails(lo_index,lo_state_num,lo_soso_num);
}

/*********查看他人的评论晒单*********/
//点击左侧按钮进入，及各种翻页，按照时间显示
//定义全局变量
var dis_index=0;
var dis_state_num=1;
var dis_soso_num=0;
var dis_count;
//3评论晒单
$("#myComment").click(function(){
	dis_index=0;
    dis_state_num=1;
    dis_soso_num=0;
	getDisList();
});

function getDisList(){
	
	  $.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Display/orderRecord',  
			data:{
				uid:user_uid,
				pageSize:5,
				pageIndex:0,
				state:1,  //1. (必须)
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
				//建立DOM结构
				var attendStr='';
				attendStr+='<div class="row">';
					attendStr+='<div class="per-goods-box nomargin">';
					 // Nav tabs -->
					attendStr+='<ul class="nav nav-tabs" role="tablist">';
					
					attendStr+='<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab" id="dis_readyMenu" aria-expanded="true">已晒单</a></li>';
					//attendStr+='<li role="presentation"><a href="#home" aria-controls="profile" role="tab" data-toggle="tab" id="dis_soonMenu"  aria-expanded="false">未晒单</a></li>';
					
					
					
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
					attendStr+='<th>晒单图片</th>'; 
					attendStr+='<th id="dis_th1" width="155">晒单时间</th>';
					attendStr+='<th width="300" id="dis_th2">分享内容</th>';
					
					attendStr+='<th width="120" id="dis_th3">操作</th>';
					attendStr+='</tr>'; 
					attendStr+='</thead>'; 
					attendStr+='<tbody id="goodsIng">'; 
					
					attendStr+='</tbody>';
					attendStr+='</table>';
					//商品列表结束
					attendStr+='</div>';
					
					//即将揭晓
                   //商品列表结束-->
                    $("#rightContent").html(attendStr);//把获取到的数据加载进右边内容容器中
					var attendIngStr='';
					if(att_list.length<=0){
					  $("#goodsIng").html('<tr><td colspan="6" class="text-center"><span class="text-gray">没有记录</span></td></tr>');
					 // return;
					
					}
					else{
						
						for(i=0;i<att_list.length;i++){
							var id=att_list[i]['id'];
							var title=att_list[i]['title'];
							var path=data['host']+att_list[i]['path'];
							var create_time=att_list[i]['create_time'];
							var nickname=att_list[i]['nickname'];
							var startCode=Number(data['startCode']);
							var description=att_list[i]['description'];
							var uid=att_list[i]['uid'];
							var score=att_list[i]['score'];
							var product=att_list[i]['product'];//商品名称
							var pid=att_list[i]['pid'];
						    var lottery_id=att_list[i]['lottery_id'];
							var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
							
							var pic_host=data['pic_host'];//已经晒单的晒单图片地址前缀
				            var path_ready=att_list[i]['path'][0];//已经晒单的第一张晒单图片
							//时间戳格式化
							//参与时间
							var  time_attend= create_time;
							var newDate_attend = new Date();
							newDate_attend.setTime(time_attend * 1000);
							var my_create_time_attend=newDate_attend.format('yyyy-MM-dd h:m:s');
							
							attendIngStr+='<tr>';
							attendIngStr+='<td>';
							attendIngStr+='<a href="ready-publish.html?pid='+goods_link+'" class="text-danger" target="_blank">'+product+'</a>';
							attendIngStr+='</td>';
							if(typeof(path_ready) == 'undefined'){
								   attendIngStr+='<td scope="row"><img src="images/noPic1.jpg" alt="" width="100"></td>';
								   }else{
									   attendIngStr+='<td scope="row"><img src="'+pic_host+path_ready+'" alt="" width="100"></td>';
									   }
							//attendIngStr+='<td scope="row"><a href="#"><img src="'+path+'" alt="" width="60"></a></td>';
							attendIngStr+='<td><span class="text-danger">'+my_create_time_attend+'</span></td>';
							attendIngStr+='<td><p class="nomargin"><b>标题：</b>'+title+'</p><p><b>内容：</b>'+description+'</p></td>';
							
							attendIngStr+='<td><a href="javascript:;" onClick="viewDiss('+id+');">查看详情</a></td>';
							attendIngStr+='</tr>';
							
						  }
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
				 /*for(i=1;i<=pageCount;i++){
					 paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_disRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }*/
				  for(i=1;i<=pageCount;i++){
					 if((i-1)==dis_index){
						paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }
					// paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }
					 paginationStr+='<li><a href="javascript:;" onClick="nextGoods_disRecord();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
				  //*****************分页
				 $("#rightContent").append(attendPageStr);
				 $("#pagination").html(paginationStr);
				 $("#pageCount").html(pageCount);
			   
				
				//给当前按钮添加背景色
				/*$(".pageBtnNum").parent().first().addClass("active");
				$(".pageBtnNum").click(function(){
					  $(this).parent().addClass("active").siblings().removeClass("active");;
				  });*/
				  //如果是当前标签打开的情况下，不调用接口
				//实物
				$("#dis_readyMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getDisList_2(0,1,0);
						dis_index=0;
					    dis_state_num=1;
					    dis_soso_num=0;
						$(".timeMenu").first().addClass("active").siblings().removeClass("active");
					}
				});
				//虚物
				$("#dis_soonMenu").click(function(){
					if(($(this).attr('aria-expanded'))=="false"){
						getDisList_2(0,0,0);
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
					getDisList_2(0,dis_state_num,new_soso_num);
					//把获取到的值赋给全局变量，否则点击翻页时，soso_num又会变为0了
					dis_soso_num=new_soso_num;
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
/************查看他人的晒单---翻页函数************/
function getDisList_2(dis_index,dis_state_num,dis_soso_num){
	
	dis_state_num_2=dis_state_num;
	dis_index_2=dis_index;
	dis_soso_num_2=dis_soso_num;
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Display/orderRecord',  
			data:{
				uid:user_uid,
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
				
				if(att_list.length<=0){
					$("#goodsIng").html('<tr><td colspan="6" class="text-center"><span class="text-gray">没有记录</span></td></tr>');
					}
				else{	
					  var attendIngStr='';
					  for(i=0;i<att_list.length;i++){
						  //已晒单独有的字段
						  var id=att_list[i]['id'];
						  var title=att_list[i]['title'];
						 // var path=data['host']+att_list[i]['path'];
						  var create_time=att_list[i]['create_time'];
						  var nickname=att_list[i]['nickname'];
						  var startCode=Number(data['startCode']);
						  var description=att_list[i]['description'];
						  var uid=att_list[i]['uid'];
						  var score=att_list[i]['score'];
						  var product=att_list[i]['product'];//商品名称
						  var pid=att_list[i]['pid'];
						  var lottery_id=att_list[i]['lottery_id'];
						  var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
						  
						  var pic_host=data['pic_host'];//已经晒单的晒单图片地址前缀
				          var path_ready=att_list[i]['path'][0];//已经晒单的第一张晒单图片
						  //时间戳格式化
						  //已晒单的时间
						  var  time_attend= create_time;
						  var newDate_attend = new Date();
						  newDate_attend.setTime(time_attend * 1000);
						  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd h:m:s');
						  
						  //构建DOM,获奖记录的结构
						  attendIngStr+='<tr>';
						  attendIngStr+='<td><a href="ready-publish.html?pid='+goods_link+'" class="text-danger" target="_blank">'+product+'</a></td>';
						  if(typeof(path_ready) == 'undefined'){
								   attendIngStr+='<td scope="row"><img src="images/noPic1.jpg" alt="" width="100"></td>';
								   }else{
									   attendIngStr+='<td scope="row"><img src="'+pic_host+path_ready+'" alt="" width="100"></td>';
									   }
						  //attendIngStr+='<td scope="row"><a href="#"><img src="'+path+'" alt="" width="60"></a></td>';
						  attendIngStr+='<td><span class="text-danger">'+my_create_time_attend+'</span></td>';
						  attendIngStr+='<td><p class="nomargin"><b>标题：</b>'+title+'</p><p><b>内容：</b>'+description+'</p></td>';
						  attendIngStr+='<td><a href="javascript:;" onClick="viewDiss();">查看详情</a></td>';	  
						  attendIngStr+='</tr>';
						  
						  
					  }
					  
					  $("#goodsIng").html(attendIngStr);
				
				}
				//*****************分页
				 var pageCount=data['pageCount'];
				 lo_count=pageCount;
				 var paginationStr='';
					 paginationStr+='<li><a href="javascript:;" onClick="preGoods_disRecord();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
				 /*for(i=1;i<=pageCount;i++){
					 paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_disRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }*/
				  for(i=1;i<=pageCount;i++){
					 if((i-1)==dis_index){
						paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
					   }else{
							paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
						   }
					// paginationStr+='<li><a href="javascript:;" onClick="getPageGoods_lotteryRecord('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
				  }
					 paginationStr+='<li><a href="javascript:;" onClick="nextGoods_disRecord('+id+');"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
					 
				  //*****************分页
				 $("#pagination").html(paginationStr);
				 $("#pageCount").html(pageCount);
				 
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

/****查看他人的晒单记录****翻页按钮函数*********/
function getPageGoods_disRecord(pos){ 

     dis_index=pos;
    getDisList_2(dis_index,dis_state_num,dis_soso_num);
	//alert(id+'////'+types+'....'+index);
	
}

function preGoods_disRecord(){ 
    dis_index=dis_index-1;
	if(dis_index<0){
		dis_index=0;
		return;
	}
   // getGoods(id,types,index);
	getDisList_2(dis_index,dis_state_num,dis_soso_num);
}

function nextGoods_disRecord(){ 
    dis_index=dis_index+1;
	if(dis_index>(dis_count-1)){
		dis_index=dis_count-1;
		return;
	}
    //getGoods(id,types,index);
	getDisList_2(dis_index,dis_state_num,dis_soso_num);
}
//查看他人晒单详情
function viewDiss(id){
   //构建右边基本结构
   	var attendStr='';
	attendStr+='<div class="row">';
	attendStr+='<div class="per-goods-box nomargin">';
	 // Nav tabs -->
	attendStr+='<ul class="nav nav-tabs" role="tablist">';
	
	attendStr+='<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab" id="dis_readyMenu" aria-expanded="true">已晒单</a></li>';
	attendStr+='</ul>';
	attendStr+='<div class="per_time_tab-content">';
	// Tab panes -->
	attendStr+='<div class="tab-content">';
	attendStr+='<div role="tabpanel" class="tab-pane active" id="home">';
	attendStr+='<div class="loading"></div>';
	 //晒单详情内容
	attendStr+='<div class="border-gray">'; 
    attendStr+='<div class="row">';
	attendStr+='<div class="col-md-6">';
	
	attendStr+='<div class="media">';
	attendStr+='<div class="media-left">';
	attendStr+='<a href="#" target="_blank" id="user_img">';
	//attendStr+='<img class="media-object dis_img" alt="" src="images/01_mid.jpg">';
	attendStr+='</a>';
	attendStr+='</div>';
	attendStr+='<div class="media-body">';
	//attendStr+='<a href="#" target="_blank">';
	attendStr+='<p class="media-heading">获得者：<span class="text-danger" id="userName"></span></p>';
	//attendStr+='</a>';
	attendStr+='<p class="margin-b-5">总共参与：<span class="text-danger" id="userAttend"></span>人次</p>';
	attendStr+='<p class="margin-b-5">幸运号码：<span class="text-danger" id="userLottery"></span></p>';
	attendStr+='<p class="margin-b-5">参与时间：<span id="userTime"></span></p>';
	attendStr+='</div>';
	attendStr+='</div>';
	
	attendStr+='</div>';
	attendStr+='<div class="col-md-6 border-gray-left">';
	
	attendStr+='<div class="media">';
	attendStr+='<div class="media-left">';
	attendStr+='<a href="#" target="_blank" id="goods_img">';
	//attendStr+='<img class="media-object dis_img" alt="" src="images/01_mid.jpg">';
	attendStr+='</a>';
	attendStr+='</div>';
	attendStr+='<div class="media-body">';
	attendStr+='<a href="#" target="_blank" id="goods_title">';
	attendStr+='<p class="media-heading"><span class="text-danger" id="userTitle"></span></p>';
	attendStr+='</a>';
	attendStr+='<p class="margin-b-5">价值：<span class="text-danger" id="prize"></span></p>';
	attendStr+='<p class="margin-b-5">揭晓时间：<span id="userTime2"></span></p>';
	attendStr+='</div>';
	attendStr+='</div>';
	
	attendStr+='</div>';
	attendStr+='</div>';
	attendStr+='</div>';
	//左右两边分栏结束
	//标题 时间 内容 图片
	attendStr+='<div class="xuxian position-re">';
	attendStr+='<div class="xuxianText position-ab">2015-11-25 14:33:52';
	attendStr+='</div>';
	attendStr+='</div>';
	
	attendStr+='<div class="margin-t-20">';
	attendStr+='<h3 class="diss_title" id="diss_title"></h3>';
	attendStr+='</div>';
	
	attendStr+='<div id="diss_content" class="margin-t-20">';
	attendStr+='<p></p>';
	attendStr+='<div id="diss_contentImg">';
	//attendStr+='<img class="media-object dis_img" alt="" src="images/01_mid.jpg">';
	
	attendStr+='</div>';
	attendStr+='</div>';
	//晒单详情内容结束
	attendStr+='</div>';
   
	$("#rightContent").html(attendStr);//把获取到的数据加载进右边内容容器中
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Display/orderInfo',  
			data:{
				dpid:id,
				
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			},
			success:function(data){
				var code=data['code'];
				var info=data['info'];
				if(code!=200){
					swal({
						title: "",
						text: 'info！<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
				}
				var startCode=data['startCode'];
				var order_info=data['order_info'];
				//var nickname=order_info['nickname'];
				var pic_host=data['pic_host'];//头像统一使用的地址
				var face=order_info['face'];//用户头像
				var attend_count=order_info['attend_count'];
				var lottery_code=parseInt(startCode)+parseInt(order_info['lottery_code']);
				var attend_time=order_info['attend_time'];//参与时间
				var dp_time=order_info['dp_time'];//晒单时间
				var dp_title=order_info['dp_title'];//晒单标题
				var description=order_info['description'];
				var pics=order_info['pics'];//晒单图片
				var title=order_info['title'];//商品名称
				var thumbnail=data['host']+order_info['thumbnail'];//商品缩略图
				var apply_time=order_info['apply_time'];//揭晓时间
				var price=order_info['price'];//价值
				var dp_title=order_info['dp_title'];//评论标题
				var pid=order_info['pid'];//商品ID
				var lottery_id=order_info['lottery_id'];//商品期号
				var dissContentImg='';
				var s=pics.split(',');//遍历以逗号相隔的字符串
				var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值,商品ID和期号
				if(pics.length<=0){
					 $("#diss_contentImg").hide();
					}else{
						for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I         
                        
							  dissContentImg+='<img class="media-object dis_img" alt="" src="'+pic_host+''+s[j]+'">';
						 }
						}
				
				
				/*for(i=0;i<pics.length;i++){
					var img=pic_host+pics[i];
					if(img!=pic_host){
						dissContentImg+='<img class="media-object dis_img" alt="" src="'+img+'">';
						}else{
							
							}
				}*/
				
				
				//时间戳格式化
				/*var timestamp_0 = dp_time;
				var newDate_0 = new Date();
				newDate_0.setTime(timestamp_0 * 1000);
				var new_dp_time=newDate_0.format('yyyy-MM-dd hh:mm:ss');*/
				//时间戳格式化
				/*var timestamp_1 = attend_time;
				var newDate_1 = new Date();
				newDate_1.setTime(timestamp_1 * 1000);
				var new_dp_time_2=newDate_1.format('yyyy-MM-dd hh:mm:ss');*/
				/*****************此处需要修改 2016-2-18**************************/
				
				if(face==''){
					    $("#user_img").html('<img class="media-object dis_img" alt="" src="images/default1.png">');
						
					}else{
						$("#user_img").html('<img class="media-object dis_img" alt="" src="'+pic_host+face+'">');
					}
				$("#userName").html(nickname);//此值是浏览器传递过来的
				$("#userAttend").html(attend_count);
				$("#userLottery").html(lottery_code);
				$("#userTime").html(attend_time);
				$("#userTitle").html(title);
				$("#goods_img").attr('href','ready-publish.html?pid='+goods_link+'');
				$("#goods_title").attr('href','ready-publish.html?pid='+goods_link+'');
				$("#goods_img").html('<img class="media-object dis_img" alt="" src="'+thumbnail+'">');
				$("#prize").html(price);
				$("#userTime2").html(apply_time);
				$(".xuxianText").html(dp_time);
				$("#diss_title").html(dp_title);
				$("#diss_content>p").html(description);
				$("#diss_contentImg").html(dissContentImg);//未完成，没有数据不清楚结构
				$(".loading").hide();
			},complete:function(){
				$(".loading").hide();
			},error:function(){
			   swal({
					title: "",
					text: '获取数据失败！<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
					html: true,
					type: "error",
					confirmButtonText:"确定",
					confirmButtonColor: "#ff4800",
				});
			   $(".loading").hide();
			}
	});
	
}









