// 首页往下滚动后 鼠标经过显示 菜单

 $.ajax({  
 
	  type:'post',  
	  url:''+ajaxUrl+'/Home/Index/category',  

	  cache:false,  
	  dataType:'json',
	  async:false,
	  success:function(data){  

	     var str = "";
			//垂直菜单链接地址传递参数

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

				
			}
			$("#menu-list_0").html(str);//竖直菜单

			//给左上角菜单加点击样式
		  $('#menu-list .item a').each(function () {
			  if ($($(this))[0].href == String(window.location))
				  $(this).addClass('text-danger').css("font-weight","700");
		  });
	  }
 })
