// JavaScript Document

	


 $.ajax({  
 
	  type:'post',  
	  url:''+ajaxUrl+'/Home/Index/category',  
	 // data:{},  
	  cache:false,  
	  dataType:'json',
	  async:false,
	  success:function(data){  
	
	     //var data_menu=data;
		
	     var str = "";
			//垂直菜单链接地址传递参数
		// var horizontalMenu='';
			
			for(var i=0;i<data['category'].length;i++){
				
				var categoryLink=data['category'][i]['id'];
			    var categoryEngName=data['category'][i]['name'];
				var categoryTitle=data['category'][i]['title'];//分类名称
				//编码传递
				categoryTitle=escape(categoryTitle);
				str+='<div class="item bo">';
				str+='<h3>';
				str+='<a href="category.html?categoryId='+categoryLink+'&categoryTitle='+categoryTitle+'" id="'+categoryLink+'" class="menuBg_'+i+'">';
				//str+='<span class="glyphicon glyphicon-fire"></span>';
				str+=''+data['category'][i]['title']+'';
				str+='</a>';
				str+='</h3>';
				str+='</div>';
				
				
				/*horizontalMenu+='<li class="list-group-item">';
				horizontalMenu+='<a href="javascript:;" onClick="getGoods('+categoryLink+','+types+','+index+')">';//水平商品菜单--分类和搜索的菜单
				//horizontalMenu+='<a href="javascript:;" onclick="getGoods('+categoryLink+')">';
				if(categoryEngName=="sjsm"){
					horizontalMenu+='<img src="images/category/category1.png">';
					
					}else if(categoryEngName=="qcpj"){
						horizontalMenu+='<img src="images/category/category1.png">';
						}else if(categoryEngName=="shzq"){
						horizontalMenu+='<img src="images/category/category7.png">';
						}else if(categoryEngName=="jpms"){
						horizontalMenu+='<img src="images/category/category5.png">';
						}else if(categoryEngName=="xxyl"){
						horizontalMenu+='<img src="images/category/category6.png">';
						}
						else if(categoryEngName=="jdlv"){
						horizontalMenu+='<img src="images/category/category3.png">';
						}else if(categoryEngName=="qtpp"){
						horizontalMenu+='<img src="images/category/category8.png">';
						}
				
                horizontalMenu+='<p>'+categoryTitle+'</p>';    
                horizontalMenu+='</a>';      
                horizontalMenu+='</li>';  */         
		
				
			}
			$("#menu-list").html(str);//竖直菜单
			//$("#horizontalMenu").html(horizontalMenu);//水平菜单
			
			//给左上角菜单加点击样式
		  $('#menu-list .item a').each(function () {
			  if ($($(this))[0].href == String(window.location))
				  $(this).addClass('text-danger').css({"font-weight":"600"}).animate({"background-positionX":-210},1);
				  if($(this).hasClass("text-danger")){
					 var backStr= $(this).css("background-position");
					 var re_backStr=new RegExp("0","i");
					 var newstart=backStr.replace(re_backStr,"-210");
					 $(this).css("background-position",newstart);
				  }
		  });
	  }
 })
