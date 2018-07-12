// JavaScript Document
//公共调用 分类菜单等等
//*********author：Hong***********//

function GetQueryString(data)//获取地址栏传过来参数
{
     var reg = new RegExp("(^|&)"+ data +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


//获取地址栏传过来参数

var categoryId=GetQueryString("categoryId");//垂直菜单
//在商品分类页面，面包屑导航显示点击的导航
var categoryTitle=GetQueryString("categoryTitle");
	categoryTitle=decodeURI(categoryTitle);
//面包屑导航
if(categoryTitle=='null'){
	$("#sub_bread").hide();
}else{
	$("#sub_bread").html(categoryTitle);
	}


var id;//排序用到的id

var types=3;
var index=0;
var count;

//水平菜单
$.ajax({  
	  type:'post',  
	  url:''+ajaxUrl+'/Home/Index/category',  
	 // data:{},  
	  cache:false,  
	  dataType:'json',  
	  beforeSend:function(){
		  $(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
	  },
	  success:function(data){  
	    
	     //var str = "";
			//垂直菜单链接地址传递参数
		 var horizontalMenu='';	
			
			for(var i=0;i<data['category'].length;i++){
				
				var categoryLink=data['category'][i]['id'];
			    var categoryEngName=data['category'][i]['name'];
				var categoryTitle=data['category'][i]['title'];
				/*str+='<div class="item bo">';
				str+='<h3>';
				str+='<a href="category.html?categoryId='+categoryLink+'">';
				str+='<span class="glyphicon glyphicon-fire"></span>';
				str+=''+data['category'][i]['title']+'';
				str+='</a>';
				str+='</h3>';
				str+='</div>';*/
				
				horizontalMenu+='<li class="list-group-item position-re">';
				if(categoryId==categoryLink)
				{
					horizontalMenu+='<a href="javascript:;" class="text-danger child_menu" style="font-weight:700" onClick="getGoods_2('+categoryLink+','+index+',$(this))" data-id="'+categoryLink+'">';//水平商品菜单
				}
				else
				{
					horizontalMenu+='<a href="javascript:;" class="child_menu" onClick="getGoods_2('+categoryLink+','+index+',$(this))" data-id="'+categoryLink+'">';//水平商品菜单
				}
				
				if(categoryEngName=="sjsm")
				{
					horizontalMenu+='<img src="images/category/category-camera.png">';
				}
				else if(categoryEngName=="sjpb")
				{
					horizontalMenu+='<img src="images/category/category-pad.png">';
				}
				else if(categoryEngName=="qb")
				{
					horizontalMenu+='<img src="images/category/category-all.png">';
				}
				else if(categoryEngName=="ydhw")
				{
					horizontalMenu+='<img src="images/category/category-ball.png">';
				}
				else if(categoryEngName=="zbss")
				{
					horizontalMenu+='<img src="images/category/category-watch.png">';
				}
				else if(categoryEngName=="dnbg")
				{
					horizontalMenu+='<img src="images/category/category-computer.png">';
				}
				else if(categoryEngName=="jydq")
				{
					horizontalMenu+='<img src="images/category/category-washer.png">';
				}
				else{
					horizontalMenu+='<img src="images/category/category-other.png">';
				}
				
                horizontalMenu+='<p class="margin-b-0">'+categoryTitle+'</p>';    
                horizontalMenu+='</a>';      
                horizontalMenu+='</li>';           
		
				
			}

			$("#horizontalMenu").html(horizontalMenu);

			$(".child_menu").each(function(index, element) {
                $(this).hover(function(){
					//$(this).stop().animate({top:'0px',opacity:'0.8'},100);
					$(this).find("img").addClass("circle_run");
				},function(){
					//$(this).stop().animate({top:'12px',opacity:'1'},100);
					$(this).find("img").removeClass("circle_run");
				}) 
            });

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


 

getGoods(categoryId,types,index);//默认调用菜单传过来的ID

function getGoods_2(categoryLink,index1,obj){
	getGoods(categoryLink,types,index1);
	//水平菜单点击添加当前样式
	obj.addClass("text-danger").css("font-weight","700").parent().siblings().find("a").removeClass("text-danger").css("font-weight","100");
	/*start 面包屑导航*/
	$("#sub_bread").show();
	var categoryTitle=obj.find("p").text();
	$("#sub_bread").html(categoryTitle);
	/*ebd*/
	//垂直菜单点击添加当前样式
	var horizontal_id=obj.attr("data-id");
	$('#menu-list a').each(function () {
	   var vertical_id=$(this).attr("id");
	   if(horizontal_id==vertical_id){
		  $(this).addClass("text-danger").css("font-weight","700").parent().parent().siblings().find("a").removeClass("text-danger").css("font-weight","100");
		   if($(this).hasClass("text-danger")){
			   var backStr= $(this).css("background-position");
			   var re_backStr=new RegExp("0","i");
			   var newstart=backStr.replace(re_backStr,"-210");

			   $('.item a').each(function(){
				   var backStr2= $(this).css("background-position");
				   var re_backStr_2=new RegExp("-210","i");
				   var newstart_2=backStr2.replace(re_backStr_2,"0");
				   $(this).css("background-position",newstart_2);
			   });

			   $(this).css("background-position",newstart);

		   }
		}
	});
	index=0;
}

function getGoods(categoryLink,types,index){ 
	 var categoryLink1=categoryLink;
	 id=categoryLink;//赋值给排序的id
	var index2=index;
	 $.ajax({  
	  type:'post',  
	  url:''+ajaxUrl+'/Home/Index/categoryById',  
	  data:{
		  id:categoryLink1,
		  pageIndex:index2,
		  pageSize:20,
		  type:types
		  },  
	  cache:false,  
	  dataType:'json',  
	  beforeSend: function(){
		   $(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
		  },
	  success:function(data){ 
	     var code=data['code'];
		 var info=data['info'];
		 if(code!=200){
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
	     var categoryGoodsList='';
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
		
		if(data['list'].length<=0){
			//$("#categoryGoodsList").html('<p class="text-center margin-t-b-40">此分类下的商品为空！</p>');
			$("#categoryGoodsList").html(noListStr);
			$("#categoryGoodsList").addClass("margin-b-20");
			$("#pagination").parent().hide();//列表为空时 隐藏掉页码
			return;
		}
		 $("#pagination").parent().show();//列表不为空时显示页码
	     for(i=0;i<data['list'].length;i++){
			 var lottery_id=data['list'][i]['lottery_id'];
			 var pid=data['list'][i]['pid'];
			 var need_count=data['list'][i]['need_count'];
			 var attend_count=data['list'][i]['attend_count'];
			 var title=data['list'][i]['title'];
			    // title=escape(title);
			 var attend_limit=data['list'][i]['attend_limit'];
			 var max_attend_limit=data['list'][i]['max_attend_limit'];
			 var pics=data['list'][i]['pics'];
			 var content=data['list'][i]['content']; 
			 var path=data['host']+data['list'][i]['path']; 
			 var goodsCount=data['list'].length;
			 var total=data['total'];
			 var goods_link=pid+'&'+'lottery_id='+lottery_id;//给链接地址赋值
			 
			 var progress='';
			  
			  if(need_count<1){
				  progress=0;
			   }else{
				  progress=(attend_count/need_count)*100;
				   }
			  var remain=need_count-attend_count;
				
			
			 categoryGoodsList+='<div class="col-md-3 col-sm-3 goods-listBorder">';
			 categoryGoodsList+='<div class="product-item">';
			 categoryGoodsList+='<div class="product-img text-center">';
             categoryGoodsList+='<a href="goods-details.html?pid='+goods_link+'" target="_blank" title="'+title+'">';
             categoryGoodsList+='<img src="'+path+'" alt="'+title+'" title="'+title+'">';    
             categoryGoodsList+='</a>';           
             categoryGoodsList+='</div>';             
             categoryGoodsList+='<h3 class="product-title margin-b-5"><a href="goods-details.html?pid='+goods_link+'" target="_blank" title="'+title+'">'+title+'</a></h3>';
			 categoryGoodsList+='<p>价值：￥'+need_count+'</p>';     
             categoryGoodsList+='<div class="cg-progress-pre">';       
             //categoryGoodsList+='<div class="pre-tip">限购专区</div>';     
             categoryGoodsList+='<div class="progress cg-progress">';   
             categoryGoodsList+='<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%">';        
             categoryGoodsList+='<span class="sr-only">'+progress+'% Complete (warning)</span>';         
             categoryGoodsList+='</div>';        
             categoryGoodsList+='</div>';       
             categoryGoodsList+='</div>';         
             //categoryGoodsList+='<p>'+attend_count+'/'+need_count+'<span class="text-danger">(剩余'+remain+'人次)</span></p>';
			 categoryGoodsList+='<ul class="list-group cg-progress-text_goods clearfix">';
			 categoryGoodsList+='<li class="list-group-item pull-left clearfix col-md-4 text-center">';
			 categoryGoodsList+='<p class="text-gray nomargin" id="attend_count">'+attend_count+'</p>';
			 categoryGoodsList+='<p class="nomargin">已参与人次</p>';
			 categoryGoodsList+='</li>';
			 categoryGoodsList+='<li class="list-group-item pull-left clearfix col-md-4 text-center">';
			 categoryGoodsList+='<p class="text-gray nomargin" id="attend_count">'+need_count+'</p>';
			 categoryGoodsList+='<p class="nomargin">总需人次</p>';
			 categoryGoodsList+='</li>';
			 categoryGoodsList+='<li class="list-group-item pull-right clearfix col-md-4 text-center">';
			 categoryGoodsList+='<p class="text-danger nomargin" id="remain">'+remain+'</p>';
			 categoryGoodsList+='<p class="text-danger nomargin">剩余人次</p>';
			 categoryGoodsList+='</li>';
			 categoryGoodsList+='</ul>';

             categoryGoodsList+='<div class="review">';         
             categoryGoodsList+='<a href="javascript:;" onClick="goToCar('+lottery_id+','+pid+','+1+');"><button type="button" class="btn btn-danger cg-btn-danger btn-go cg-btn-radius">立即参与</button></a>';
             categoryGoodsList+='<button type="button" class="btn btn-add btnCart cg-btn-radius cg-btn-empty" onClick="addToCar('+lottery_id+','+pid+','+1+');">';
             //categoryGoodsList+='<img src="images/addCart.png" class="addCart"/>';
             categoryGoodsList+='</button>';         
             categoryGoodsList+='</div>';        
             categoryGoodsList+='</div>';       
             categoryGoodsList+='</div>';    
			     
		   }
		 
		
		 $("#categoryGoodsList").html(categoryGoodsList);
		  
		 $("#total").html(total);//该分类下的商品总数

		 //*****************分页
		 var pageCount=data['pageCount'];
		 count=pageCount;
		 var paginationStr='';
			 paginationStr+='<li><a href="javascript:;" onClick="preGoods();"><span class="glyphicon glyphicon-chevron-left"></span>上一页</a></li>';
		  for(i=1;i<=pageCount;i++){
			  if((i-1)==index){
				  paginationStr+='<li class="active"><a href="javascript:;" class="pageBtnNum">'+i+'</a></li>';
			  }else{
				  paginationStr+='<li><a href="javascript:;" onClick="getPageGoods('+(i-1)+');" class="pageBtnNum">'+i+'</a></li>';
			  }

		  }

		  paginationStr+='<li><a href="javascript:;" onClick="nextGoods();"><span class="glyphicon glyphicon-chevron-right"></span>下一页</a></li>';
			
		   


		  if(pageCount==0){
			  $("#pagination").parent().hide();
		  }  
		  else{
			  $("#pagination").html(paginationStr);//翻页
			  $("#pageCount").html(pageCount);//页码总数

			  //TurnTab(1);
		  }
		 
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

//排序
$(".sort").click(function(){
   $(this).addClass("active").siblings().removeClass("active");	
   var type=$(this).attr("data-type");
   getGoods(id,type,0);
   types =type;
 
   //1总需人次升序 2总需人次降序 3剩余人次降序 4即将揭晓
   if($(this).attr("data-type")=="1"){
	   $(this).attr("data-type","2");
	   $(".sort span:last").attr("class","glyphicon glyphicon-arrow-up");
	   }else if($(this).attr("data-type")=="2"){
		   $(this).attr("data-type","1");
		   $(".sort span:last").attr("class","glyphicon glyphicon-arrow-down");
		 }
})

function getPageGoods(pos){
     index=pos;
    getGoods(id,types,index);

}

function preGoods(){ 
    index=index-1;
	if(index<0){
		index=0;
		return;
	}
    getGoods(id,types,index);
	
}

function nextGoods(){ 
    index=index+1;
	if(index>(count-1)){
		index=count-1;
		return;
	}
    getGoods(id,types,index);
	
}



