// 文章列表---文章详情
function GetQueryString(data)//获取地址栏传过来参数
{
     var reg = new RegExp("(^|&)"+ data +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

var notice_pid = GetQueryString("id");
$.ajax({  
	  type:'post',  
	  url:''+ajaxUrl+'/Home/Index/noticeList',  
	  data:{
		 
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
		  var list=data['list'];
		  var artlcleStr='';
		  for(i=0;i<list.length;i++){
			  var id=list[i]['id'];
			  var title=list[i]['title'];
			  var create_time=list[i]['create_time'];
			  var content=list[i]['content'];
			  artlcleStr+='<li class="list-group-item"><a href="javascript:;" onClick="getArticle('+id+');">'+title+'</a></li>';
		  }
	
		  $("#articleList").append(artlcleStr);
		  $(".loading").hide();
	  }
});
getArticle(notice_pid);
function getArticle(id){
	$.ajax({  
		  type:'post',  
		  url:''+ajaxUrl+'/Home/Index/noticeDetail',  
		  data:{
			  id:id
			  },  
		  cache:false,  
		  dataType:'json', 
		  timeout:60000,
		  beforeSend: function(){
			  $("#rightContent").html('<div class="loading"></div>');
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
			  var detail=data['detail'];
			  var content=detail[0]['content'];
			  var create_time=detail[0]['create_time'];
			  var title=detail[0]['title'];
			  //时间戳格式化
			  var timestamp_0 = create_time;
			  var newDate_0 = new Date();
			  newDate_0.setTime(timestamp_0 * 1000);
			  var newcreate_time_0=newDate_0.format('yyyy-MM-dd hh:mm:ss.SS');
				  
			  var rightContentStr='';
			  rightContentStr+='<div class="row">';
			  rightContentStr+='<div class="per-goods-box nomargin">';
			  rightContentStr+='<div class="per_time_tab-content">';
              rightContentStr+='<h3 class="right_h3 text-center" id="articleTitle">'+title+'</h3>';    
              rightContentStr+='<p class="text-center nomargin" id="articleTime">发布时间：'+newcreate_time_0+'</p>';            
              rightContentStr+='<hr class="cg-hr"/>';               
              rightContentStr+='<div class="article-text" id="articleContent">'+content+'';                
             // rightContentStr+='<div class="loading"></div>';                    
              rightContentStr+='</div>';            
              rightContentStr+='</div>';                 
              rightContentStr+='</div>';            
              rightContentStr+='</div>';             
			  
			  $("#rightContent").html(rightContentStr);
			  $(".loading").empty();
		  }
	});
}
