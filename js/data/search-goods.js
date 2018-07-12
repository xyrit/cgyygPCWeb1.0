// 搜索商品 //给搜索商品页面的 在当前页面打开搜索结果 而不是新页面打开
$(function(){
	
	
  $("#btn_search").click(function(){
	  //对浏览器需要传的字符进行编码
	  if($("#search_input").val()!=''){
		  var search_input=escape($("#search_input").val());
		  $(this).attr("target","_self");
		  $(this).attr("href","goods-search.html?search="+search_input+"")
		  }else{
			  $(this).attr("href","javascript:;")
			  }
  })

  $('#search_input').keydown(function(e){
	var key = e.which;
	if(key==13){
	   if($("#search_input").val()!=''){
			var search_input=escape($("#search_input").val());
			location.href = "goods-search.html?search="+search_input+"";
		}
				
	 }
  }); 
  

});
