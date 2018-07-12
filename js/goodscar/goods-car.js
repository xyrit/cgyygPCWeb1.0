// JavaScript Document
(function($){
    /*$(".check-all").click(function () {
		 if($(this).attr("checked", true)){
			$(".table input[name=checklist]").each(function () {
				$(this).attr("checked",true );
				// $(this).next().css({ "background-color": "#3366cc", "color": "#ffffff" });
			});
			GetCount();
			//return
		 }
		  else{
			 $(".table input[name=checklist]").each(function () {
				$(this).removeAttr("checked");
			 });
			 GetCount();
			 //return
		  
		  }
		  
	});*/
	/*var cks = $(":checkbox");
		$(".check-all").toggle(function(){
			cks.prop("checked", true);
			$(this).text("全不选");
		}, function(){
			cks.prop("checked", false);
			$(this).text("全选");
	   });*/
	   $(".check-all").click(function(){
		 var isChecked = $(this).prop("checked");
		  $(".table input[name='checklist']").prop("checked", isChecked);
		  GetCount();
	   });

	//反选
	/*$("#invert").click(function () {
		$(".gwc_tb2 input[name=newslist]").each(function () {
			if ($(this).prop("checked")) {
				$(this).prop("checked", false);
				//$(this).next().css({ "background-color": "#ffffff", "color": "#000000" });
			} else {
				$(this).prop("checked", true);
				//$(this).next().css({ "background-color": "#3366cc", "color": "#000000" });
			} 
		});
		GetCount();
	});*/

	//取消
	/*$("#cancel").click(function () {
		$(".gwc_tb2 input[name=newslist]").each(function () {
			$(this).attr("checked", false);
			// $(this).next().css({ "background-color": "#ffffff", "color": "#000000" });
		});
		GetCount();
	});*/

	// 所有复选(:checkbox)框点击事件
	

	// 输出
	$(".table input[name=checklist]").click(function () {
		// $("#total2").html() = GetCount($(this));
		GetCount();
		//alert(conts);
	});

//******************
//购物车加减



var t = $(".count-input");
//var t=$(this).parent().find('input[class*=count-input]');
$(".add").click(function(){ 
	  var t=$(this).parent().find('input[class*=count-input]'); 
	  zhi= t.val(parseInt(t.val())+1); 
	  
	  //setTotal(); 
	  setTotal(); GetCount();
  }); 
  $(".reduce").click(function(){ 
	 var t=$(this).parent().find('input[class*=count-input]'); 
	zhi= t.val(parseInt(t.val())-1);
	 if(parseInt(t.val())<0){ 
	   t.val(0); 
	 } 
	 //setTotal(); 
	 setTotal(); GetCount();
  });

function GetCount() {
	var conts = 0;
	$(".table input[name=checklist]").each(function () {
		if ($(this).attr("checked")) {
			for (var i = 0; i < $(this).length; i++) {
				conts += parseInt($(this).val());
			}
		}
	});
	$("#priceTotal").html((conts).toFixed(2));
	//$("#jz1").css("display", "none");
	//$("#jz2").css("display", "block");
}


function setTotal() {
	  //alert(parseInt(t.val()))
	  
	  t += parseInt($(this).find('input[class*=text_box]').val())*parseFloat($(this).find('span[class*=price]').text());
	 // $(".check").val(parseInt(t.val()));
	 $(".subtotal").html(t.toFixed(2));
  }
  setTotal();
		


})(jQuery);