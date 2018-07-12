// 添加商品到购物车
var userId = $.cookie('userId');
var nickname = $.cookie('nickname');
var userMobile = $.cookie('userMobile');
var user_token = $.cookie('user_token');

var str='';
//页面初始化写进全选按钮
$("#checkAllbox").html('<input type="checkbox" class="check-all check" checked/>&nbsp;全选');
if(typeof(user_token) == "undefined"){
	 var goodsList='';
	     goodsList+='<tr>';
		 goodsList+='<td colspan="7" class="text-center">';
		 goodsList+='<p class="margin-t-b-40">您还没有登录，请您点这里去<a href="login.html" class="text-danger">登陆或者注册</a>后把商品加入购物车</p>';
		 goodsList+='</td>';
		 goodsList+='</tr>';
	  $("#goodsList").html(goodsList);
	  $("#foot").css("display","none");
     }else{
		 
		 function getGoods(){
		     $.ajax({  
			  type:'post',  
			  url:''+ajaxUrl+'/Home/Shopcart/index',  
			  data:{
				  user_token:user_token
				  },  
			  cache:false,  
			  dataType:'json', 
			  timeout:60000, 
			  beforeSend:function(){
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
						if(data['code']==517){
							window.location.href='login.html';
							/*swal({
								title: "",
								text: ''+info+'！，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							},function(){
								//设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
								setTimeout(function(){
								  window.location.href="index.html"  
								}, 500);
							});*/
					    }
						return;
					}

			      var goodsList='';
				 // var deteStr='';

				 //如果购物车为空
				if(data['cart']['info'].length==0){
						$("#foot").hide();
						var nullStr='';
						nullStr+='<tr>'
						nullStr+='<td colspan="6"><p class="text-center margin-t-b-40">您的购物车空空如也，不如点击去<a href="index.html" class="text-danger">首页</a>看看吧</p></td>';
						nullStr+='</tr>'
						$("#goodsList").html(nullStr); 
						return; 
					}
				  for(i=0;i<data['cart']['info'].length;i++){
					  
					
					var pid=data['cart']['info'][i]['id'];
					  var lottery_id=data['cart']['info'][i]['lottery_id'];
					  var attend_count=data['cart']['info'][i]['attend_count'];//参与次数
					  var subtotal = parseFloat(data['cart']['info'][i]['attend_count']).toFixed(2); //先把string转为number然后取小数点后两位
					  // alert(attend_count);
					  var price=data['cart']['info'][i]['price'];
					  var title=data['cart']['info'][i]['title'];
					  var path=data['host']+data['cart']['info'][i]['path'];
					  var remain_count=data['cart']['info'][i]['remain_count'];
					  var goodid=data['cart']['info'][i]['goodid'];
					  var goods_link=goodid+'&'+'lottery_id='+lottery_id;//给链接地址赋值
					  
					  //alert(price);
					   goodsList+='<tr>';
					   goodsList+='<td class="cg-checkbox"><input class="check-one check" type="checkbox" name="checklist" value="'+pid+'" onClick="danji('+i+')" checked/></td>';
					   goodsList+='<td class="goods">';
					   goodsList+='<a href="goods-details.html?pid='+goods_link+'"><img src="'+path+'" alt="" id="path'+i+'"/></a>';
					   goodsList+='<a href="goods-details.html?pid='+goods_link+'"><h3 id="title'+i+'">'+title+'</h3></a>';
					   goodsList+='<p class="text-gray">价值：￥<em id="price'+i+'">'+price+'</em></p>';
					   goodsList+='</td>';   
					   if(remain_count==0){
						   goodsList+='<td class="price1 text-center" id="rem'+i+'"><spam class="text-danger">此商品已失效</span></td>';
						   }else{
							   goodsList+='<td class="price1 text-center" id="rem'+i+'">'+remain_count+'</td>';
							   }
					            
					   /*goodsList+='<td class="price text-center">'+price+'</td>';*/                  
					   goodsList+='<td class="count text-center">';                 
					   goodsList+='<div class="clearfix add-red">';     
					   goodsList+='<span class="reduce" onClick="red('+i+');">-</span>';       
					   goodsList+='<input class="count-input coutNum" type="text" id="cout'+i+'" value="'+attend_count+'" onClick="checkNum('+i+');">';   
					   //goodsList+='<input class="count-input" type="text" id="cout'+i+'" value="'+attend_count+'">';      
					   goodsList+='<span class="add" onClick="add('+i+');">+</span>';        
					   goodsList+='</div>';         
					   goodsList+='<p class="add-red-p text-danger" id="tip-p'+i+'">多参与1人次，获奖机会翻倍！</p>';           
					   goodsList+='</td>';        
					   goodsList+='<td class="subtotal text-center" id="sub'+i+'">'+subtotal+'</td>';            
					  // goodsList+='<td class="operation text-center"><input type="hidden" value="'+pid+'"/><span class="delete" data-toggle="modal" data-target=".bs-example-modal-sm" onClick="del('+pid+');">删除</span></td>';     
					  goodsList+='<td class="operation text-center"><input type="hidden" value="'+pid+'"/><span class="delete"  onClick="del('+pid+');">删除</span></td>';    
					   
					   goodsList+='</tr>';
					  
					 
					  }
					 
					 $("#goodsList").html(goodsList);  
					 //人气推荐
					 var HotList=data['cart']['HotList']; 
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
							  hotlListStr+='<img src="'+path+'" alt="'+title+'" title="'+title+'">';
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
							 // hotlListStr+='<button type="button" class="btn btn-warning cg-btn-warning btn-add" onClick="addToCar('+lottery_id+','+pid+','+1+');"><span class="glyphicon glyphicon-shopping-cart"></span></button>';
							  hotlListStr+='</div>';
							  
							  hotlListStr+='</div>';
							  hotlListStr+='</div>';
						  } 
					  }
					  
					 
					 
					 $("#hotList").html(hotlListStr);
					 /*显示购物按钮*/
					 /*$(".product-item").hover(function(){

						$(this).find('div.review').stop(false,true).fadeIn(300);
					   },function(){

						 $(this).find('div.review').stop(false,true).fadeOut(100);
					   }); */
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
					 //数据加载完首先调用全选
					 var checklist =$('input[name="checklist"]');//定为checkbox
					 var isChecked = $(this).prop("checked");
					 var allCheckTotal=0;
					$(".table input[name='checklist']").prop("checked", isChecked);
					//加for循环出来
					 for (var k = 0; k < checklist.length; k++) {
						 if(checklist[k].checked){
							   allCheckTotal+=parseFloat($("#sub"+k+"").text());
								
							   $("#priceTotal").text(allCheckTotal.toFixed(2));
							   $("#selectedTotal").text(""+(k+1)+"");
							 }else{
							   
							   
							   $("#priceTotal").text("0.00");
							 $("#selectedTotal").text("0");
							 }
						 }
                   //数据加载完首先调用全选 end
					  
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
		 });
		 
	 } 
	getGoods();	 
 }
 

 
 function deleteGood(){
	//删除商品
	swal({
		  title: "温馨提示",
		  text: "<span class='text-danger'>您确定要删除选中的商品吗？</span>",
		  type: "warning",
		  html:true,
		  showCancelButton: true,
		  confirmButtonColor: "#ff4800",
		  confirmButtonText:"确定",
		  cancelButtonText:"取消",
		  //confirmButtonText: "确定删除!",
		  closeOnConfirm: false
		},
		function(){
		  
			  $.ajax({  
				  type:'post',  
				  url:''+ajaxUrl+'/Home/Shopcart/delItem',  
				  data:{
					  user_token:user_token,
					  id:str
					  },  
				  
				  cache:false,  
				  dataType:'json',  
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
					   str='';
					  // $(".bs-example-modal-sm").hide();
					  
					   
					   getGoods();
					   
				  },
				  complete:function(){
					// $(".bs-example-modal-sm").hide();
					getGoods();
				   }
				  /*这里不能加ajax 的error 否则删除成功后还是会弹出error里面的弹窗，目前还未找到其他解决方法，只能去掉*/
		  })
		  
		  swal("删除成功!", "已成功删除您选中的商品。", "success");//
		 
		});
	  
	
}


function del(a){
	  str=a;//给模态框的确定按钮添加事件
	  deleteGood();
	  }
$('#deleteAll').click(function(){
   	
	var checklist =$('input[name="checklist"]');//定为checkbox
	if($('input[name="checklist"]:checked').length=="0"){
		//alert("请选择要删除的项")
		swal({
		  title: "温馨提示",
		  text: "<span class='text-danger'>您还没有选择要删除的商品哦!</span>",
		  type: "warning",
		  html:true,
		  //showCancelButton: true,
		  confirmButtonColor: "#ff4800",
		  confirmButtonText:"确定",
		  //confirmButtonText: "确定删除!",
		  closeOnConfirm: false
		}//,
		//function(){
		//  swal("Deleted!", "Your imaginary file has been deleted.", "success");
		//}
		);
		
		
		}
	else{		
	  for (var i = 0; i < checklist.length; i++) {//遍历checkbox

		  if(checklist[i].checked){//判断checkbox选中项
			 
				str=str+checklist[i].value+",";
				//alert(checklist[i].value);
					 
			
		  }
		deleteGood();  
	  }
		str=str.substring(0,str.length-1);

  }
})

//全选按钮

$(".check-all").click(function(){
	 
	 var checklist =$('input[name="checklist"]');//定为checkbox
     var isChecked = $(this).prop("checked");
	 var allCheckTotal=0;
	 $(".table input[name='checklist']").prop("checked", isChecked);
	 //加for循环出来
	 for (var k = 0; k < checklist.length; k++) {
		 if(checklist[k].checked){
			   allCheckTotal+=parseFloat($("#sub"+k+"").text());
			    
			   $("#priceTotal").text(allCheckTotal.toFixed(2));
			   $("#selectedTotal").text(""+(k+1)+"");
			 }else{
			   
			   
			   $("#priceTotal").text("0.00");
			 $("#selectedTotal").text("0");
			 }
		 }
	 
 });
 

function heji(k){
	//总计价格
	var checklist =$('input[name="checklist"]');//定为checkbox
	var sum=0;
	
	for(i=0;i<checklist.length;i++){
		
		if(checklist[i].checked){
				  //判断checkbox选中项
				//sum=parseFloat(sum+$("#sub"+k+"").text());
			   //var subNum=$("#sub"+i+"").text();
			   var coutNum=$("#cout"+i+"").val();
			   //subNum=subNum.toFixed(2);
			   sum+=parseFloat(coutNum);
			   //sum+=parseFloat($("#priceTotal").text())+parseFloat(subNum);
			   
			   //alert(coutNum);
			   //alert(subNum);
		  }
	     
	}
	sum=sum.toFixed(2);
    $("#priceTotal").text(sum);
} 

	
function danji(i) {//点击单个checkbox的时候
		var checklist =$('input[name="checklist"]');//定为checkbox
		//去掉全选按钮的选中
		$(".check-all").prop({checked:false});  
		if(checklist[i].checked){
		    
			var ttt=  parseFloat($("#priceTotal").text())+parseFloat($("#sub"+i+"").text());
			ttt=ttt.toFixed(2);
			  $("#priceTotal").text(ttt);
			  $("#selectedTotal").text($('input[name="checklist"]:checked').length);
			//全选按钮选中 
			
			if(($('input[name="checklist"]:checked')).length==checklist.length){//选中的个数以及所有的checkbox的个数
			  $(".check-all").prop({checked:true}); 
			}
			 
			  
		}else{
			var ttt=parseFloat($("#priceTotal").text())-parseFloat($("#sub"+i+"").text());
			ttt=ttt.toFixed(2);
			  $("#priceTotal").text(ttt);
			  $("#selectedTotal").text($('input[name="checklist"]:checked').length);
			
			}
	}
 
function add(i){//数量的增加
	    var count_input=$(".count-input");   
	    var rem=parseFloat($("#rem"+i+"").text());
		//alert(rem);
		// alert(i)
		var t=$("#cout"+i+"");
		//alert(t.val());
		if(parseInt(t.val())>=rem){
			t.val()==rem;
			$("#tip-p"+i+"").text("参与人数不能超过剩余人次的哦！");
		}
			
		else{
		  t.val(parseInt(t.val())+1);
		  $("#sub"+i+"").text(t.val()+'.00');
		  $("#tip-p"+i+"").text("多参与1人次，获奖机会翻倍！");
		  heji(i);
		  
		}
  }
 function red(i){//数量的减少
	 var count_input=$(".count-input");   
		var t=$("#cout"+i+"");
		t.val(parseInt(t.val())-1) 
		 if(parseInt(t.val())<1){ 
		   t.val(1); 
		   
		 } 
		 else{
			 
			 $("#sub"+i+"").text(t.val()+'.00');
			 $("#tip-p"+i+"").text("多参与1人次，获奖机会翻倍！");
			 //hejijian(i);//调用合计减，点击减的时候总数减去相应的小计
			 heji(i);
			 }
		
		//hejijian(i);//调用合计减，点击减的时候总数减去相应的小计
		
		
  }
 //传值到点击结算按钮

$("#closing").click(function(){//发送数据到服务器

       if($('input[name="checklist"]:checked').length==0){
		   swal({
				title: "",
				text: '您还没有选择商品哦！',
				html: true,
				type: "warning",
				confirmButtonText:"确定",
				confirmButtonColor: "#ff4800",
			});
		   
		 }
	  else{
		  
		
		 var checklist =$('input[name="checklist"]');//定为checkbox
		 var checkZhi='';//传值url前定义变量
		 //for循环出被选中checkbox的个数
		 var j=0;
		  
		 var postdata = new Array();
		 for (var i = 0; i < checklist.length; i++) {
			 
			 if(checklist[i].checked){
				  
				  //alert(checklist[i].value);
				  //alert($("#cout"+i+"").val());
				  var checkSum=$('input[name="checklist"]:checked').length;
				  var id=checklist[i].value;//被选中按钮的ID值
				  var attend_count=$("#cout"+i+"").val();//被选中行的参与次数
				  var title=$("#title"+i+"").text();//被选中行的标题
				  var path=$("#path"+i+"").attr("src");//被选中行的图片路径
				  var price=$("#price"+i+"").text();//被选中行的图片路径
				  var rem=$("#rem"+i+"").text();

				  
				 // postdata[checkSum] = {id:""+id+"",attend_count:""+attend_count+""};
				  postdata[j] = {id:""+id+"",attend_count:""+attend_count+"",title:""+title+"",path:""+path+"",price:""+price+""};
				  //postdata[1] = {id:""+id+"",attend_count:""+attend_count+""};
				  //   postdata[2] = { id: 2, attend_count: "no" };
				
				  j++;
				 // alert(attend_count+'....'+rem);
				 //请注意！！需要转换成数字后才能进行比较大小
				  if(Number(attend_count)>Number(rem)){
					  //调用弹出框插件
					   swal({
						  title: "",
						  text: '您参与的人数不能大于剩余人次的哦！',
						  html: true,
						  type: "warning",
						  confirmButtonText:"确定",
						  confirmButtonColor: "#ff4800",
					  });
					 // alert(attend_count+'.....'+rem+'...'+'参与人数不能大于剩余人次');
					   return;//循环一次，只要有一个选项中的参与次数超过剩余次数就弹出信息，
					  }
				  
				  checkZhi+=id+',';
				  
				  //return;
				 }
				  
				 
			 }
		   
			checkZhi=checkZhi.substring(0,checkZhi.length-1);//去掉最后一个逗号

			  var r = "{\"list\"" + ":" + $.toJSON(postdata)+"}"
			  var post = $.toJSON(postdata); 
			  var content = $.parseJSON(post);

			 $.ajax({
				 type:'post',
				 url:''+ajaxUrl+'/Home/Shopcart/changeNum',
				 dataType:'json',
				 data:{
					 user_token:user_token,
					 content:r
					 },
				 cache:false,
				 success: function(data){
					    var info=data['info'];
						if(data['code']!=200){
							  if(data['code']==517){
								  window.location.href="login.html"
								  /*swal({
									  title: "",
									  text: ''+info+'！，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
									  html: true,
									  type: "error",
									  confirmButtonText:"确定",
									  confirmButtonColor: "#ff4800",
								  },function(){
									  //设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
									  setTimeout(function(){
										  window.location.href="index.html"
									  }, 500);
								  });*/
							  }else{
								  swal({
									  title: "",
									  text: ''+info+'！<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
									  html: true,
									  type: "error",
									  confirmButtonText:"确定",
									  confirmButtonColor: "#ff4800",
								  });
							  }

							  return;
						  }
						  
					  location.href = "payfor2.html?id="+(checkZhi)+"";//传选中的ID号去到支付页面,成功之后才能跳转
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
 
	  
});
//参与数量非合法数字时弹出提示并自动改为1


function checkNum(i){
	
	$("#cout"+i+"").blur(function(){
		//$(this).css("background-color","green");
		$("#sub"+i+"").text($(this).val()+'.00');
		heji(i);
		
		var att_num_blur=$("#cout"+i+"").val();
		var remStr=parseInt($("#rem"+i+"").text());//剩余人次
		var regVerifyNum_find=/^(0|[1-9][0-9]*)$/;//非0开头的数字
		att_num=parseInt(att_num_blur);
		//alert(typeof(remStr))
		if(!(regVerifyNum_find.test(att_num))){
			swal({
				title: "",
				text: '请输入正确的参与数量。',
				html: true,
				type: "error",
				confirmButtonText:"确定",
				confirmButtonColor: "#ff4800",
			}); 
			
			$("#cout"+i+"").val(remStr);
			$("#sub"+i+"").text(remStr+'.00');
			heji(i);
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
			  
			  $("#cout"+i+"").val(remStr);
			  $("#sub"+i+"").text(remStr+'.00');
			  
			  heji(i);
			  return; 
		  }
		 if(att_num>remStr){
			 
			  swal({
				  title: "",
				  text: '请输入正确的参与数量。',
				  html: true,
				  type: "error",
				  confirmButtonText:"确定",
				  confirmButtonColor: "#ff4800",
			  }); 
			 
			  $("#cout"+i+"").val(remStr);
			  $("#sub"+i+"").text(remStr+'.00');
			  
			  heji(i);
			  return;
		  }
		  
  });
}




