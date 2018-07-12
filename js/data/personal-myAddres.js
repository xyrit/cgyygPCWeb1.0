// 我的收货地址

$("#myAddres").click(function(){
	addList();
	addressList();
	
});

function addList(){
	var addresStr='';
	addresStr+='<div class="row">';
	addresStr+='<div class="per-goods-box nomargin">';
	addresStr+='<ul class="nav nav-tabs" role="tablist">';
	addresStr+='<li role="presentation" class="active"><a href="#home" aria-controls="profile" role="tab" data-toggle="tab" id="virtualMenu" aria-expanded="false">地址管理</a></li>';
	addresStr+='</ul>';
	addresStr+='<div class="per_time_tab-content clearfix">';              
	addresStr+='<div class="per-add_top"><span>已保存<span id="adressdCount" style="padding:0 5px"></span>条地址，还能保存<span id="addressRemain" style="padding:0 5px"></span>条地址</span></div>';   
	 //地址列表开始 
    addresStr+='<div id="addresslist" class="">';           
	 
	
	 
	addresStr+='</div>'; 
	//地址列表结束


	addresStr+='<div class="per-add_mainbg3" id="add_box">';
	addresStr+='<a href="javascript:;" style="text-align:center; display:block;" class="linkIk" onClick="addAdress();">';
	addresStr+='<span class="glyphicon glyphicon-plus"></span>';
	addresStr+='<p style="font-size:16px" class="nomargin">增加新地址</p>';
	addresStr+='</a>';
	addresStr+='</div>';

	                     
	addresStr+='</div>';                     
	addresStr+='</div>';                     
	addresStr+='</div>';
	$("#rightContent").html(addresStr); 
	$("#myAddres").addClass("active").siblings().removeClass("active");
}

//在此读取cookie 保证数据的正确性，此cookie值是在个人中心userinfo中读取的手机号码，并不是登录存下来的手机号码
var userMobile = $.cookie('userMobile');

//地址列表
var glo_remain;
var glo_province;

function addressList(){
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Address/addressList',  
			data:{
				user_token:user_token,
				
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				$("#addresslist").prepend('<div class="loading"></div>');
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
				var address_num=data['address_num'];
				//当可添加的地址数量为0时，隐藏添加按钮
				if(address_num>=3){
					$("#add_box").remove();
				}

				var remain=data['remain'];
				var glo_remain=remain;
				
				var addresStrList='';
				var addressList=data['address'];
				for(i=0;i<addressList.length;i++){
					 var id=addressList[i]['id'];
					 
					 var realname=addressList[i]['realname'];
					 var cellphone=addressList[i]['cellphone'];
					 var status=addressList[i]['status'];//1为默认地址 0是非默认地址
					 var province=addressList[i]['province'];
					 glo_province=province;
					 var city=addressList[i]['city'];
					 var area=addressList[i]['area'];
					 var address=addressList[i]['address'];
					 //默认地址
					 if(status==2){
						  addresStrList+='<div class="per-add_mainbg position-re">';                
						  addresStrList+='<div class="add_main_top">';                  
						  addresStrList+='<p>';  
						  addresStrList+='<a href="javascript:;" id="edit_btn'+i+'" onClick="editAdress('+id+','+i+');"><span class="glyphicon glyphicon-pencil"></span></a>';                      
						  addresStrList+='<span class="glyphicon glyphicon-home margin-r-5"></span>';                         
						  addresStrList+='<span class="text-danger">默认地址</span>';                         
						  addresStrList+='</p>';                          
						  addresStrList+='<p><span id="name_box'+i+'">'+realname+'</span> <span id="phone_box'+i+'">'+cellphone+'</span></p>';                                                         
						  addresStrList+='</div>';                        
						  addresStrList+='<div class="add_main_foot" id="address_box'+i+'"><span id="province'+i+'">'+province+'</span><span id="city'+i+'">'+city+'</span><span id="area'+i+'">'+area+'</span><span id="address'+i+'">'+address+'</span></div>';    
						  addresStrList+='<div class="triangle_down"><img src="images/add_fy.png" alt=""></div>';    
						  addresStrList+='</div>'; 
					  }else{
						 //地址列表											  
						  addresStrList+='<div class="per-add_mainbg2 position-re">';                       
						  addresStrList+='<div class="add_main_top2">';                      
						  addresStrList+='<p style="float: none; text-align: right;">';                     
						  addresStrList+='<a href="javascript:;" class="margin-r-5" onClick="addressDefault('+id+');"><span class="glyphicon glyphicon-home"></span></a>';              
						  addresStrList+='<a href="javascript:;" class="margin-r-5" onClick="editAdress('+id+','+i+');"><span class="glyphicon glyphicon-pencil"></span></a>';                                
						  addresStrList+='<a href="javascript:;" class="margin-r-5" onClick="deleteAdress('+id+')"><span class="glyphicon glyphicon-trash"></span></a>';                      
						  addresStrList+='</p>';                         
						  addresStrList+='<p><span id="name_box'+i+'">'+realname+'</span> <span id="phone_box'+i+'">'+cellphone+'</span></p>';                           
						  addresStrList+='</div>';                         
						  addresStrList+='<div class="add_main_foot2"><span id="province'+i+'">'+province+'</span><span id="city'+i+'">'+city+'</span><span id="area'+i+'">'+area+'</span><span id="address'+i+'">'+address+'</span></div>';    
						  addresStrList+='<div class="triangle_down"><img src="images/add_fy.png" alt=""></div>';    
						  addresStrList+='</div>'; 
					  }
					   
					 
					  
				  }
				  $("#adressdCount").text(address_num);
				  $("#addressRemain").text(remain);
				  $("#addresslist").html(addresStrList); 
				//  alert($("#province0").text());
				$(".loading").hide();  
			}
	});
	
}
//设置默认收货地址

function addressDefault(id){
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Address/addressSet',  
			data:{
				user_token:user_token,
				id:id
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				//$("#rightContent").html('<div class="loading"></div>');
				//$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			},
			success:function(data){ 
			   addressList();
			}
	});
}
//修改地址
function editAdress(id,i){
	//首先获取到地址列表中的值，然后才能构建结构
	var province=$("#province"+i+"").text();
	var city=$("#city"+i+"").text();
    var area=$("#area"+i+"").text();
	var address=$("#address"+i+"").text();
	var name_box=$("#name_box"+i+"").text();
	var phone_box=$("#phone_box"+i+"").text();
	
	var add_str='';
	add_str+='<div class="per-add_mainbg2 per-add_mainbg4 position-re padding-t-10" style="background:none" id="add_content_box">';  
	//add_str+='<a href="javascript:;" class="margin-r-5 position-ab delete_btn" style="right:5px;top:0px"><span class="glyphicon glyphicon-trash"></span></a>';   
	 
	add_str+='<div class="add_main_top2" style="border-bottom: none;">'; 
	 add_str+='<div class="row">';    
	 add_str+='<div class="col-md-3 text-right">';                
	add_str+='<span class="line-height-34">已绑定手机：</span>';    
	 add_str+='</div>';  
	 
	 add_str+='<div class="col-md-5">';                
	add_str+='<p style="line-height: 34px;">'+userMobile+'</p>';    
	 add_str+='</div>';  
	 add_str+='<div class="col-md-4">'; 
	// add_str+='<botton type="botton" class="btn cg-btn-square btn-sm" onclick="settime_address(this);get();">发送手机验证码</botton>';  
	 add_str+='<input type="button" class="btn cg-btn-square btn-sm" onclick="settime_address_2(this);get_edit();" value="免费获取验证码">';  
	 add_str+='</div>';  
	   
	 add_str+='</div>';                      
	add_str+='</div>'; 
	
	add_str+='<div class="add_main_top2">';   
	 add_str+='<div class="row">';   
	 add_str+='<div class="col-md-3 text-right">';  
	  add_str+='<span class="line-height-34">手机验证码：</span>';  
	 add_str+='</div>';
	 add_str+='<div class="col-md-8">';              
	add_str+='<p><input class="form-control" placeholder="手机验证码" id="verify" type="text"></p>';  
	 add_str+='</div>'; 
	// add_str+='<div class="col-md-3">';              
	//add_str+='<p><botton type="botton" class="btn cg-btn-square btn-sm">确定</botton></p>';  
	// add_str+='</div>'; 
	add_str+='</div>';                       
	add_str+='</div>';
	 
	               
	add_str+='<div class="add_main_top2">';   
	 add_str+='<div class="row">';   
	 add_str+='<div class="col-md-3 text-right">';  
	  add_str+='<span class="line-height-34">姓名：</span>';  
	 add_str+='</div>';
	 add_str+='<div class="col-md-8">';              
	add_str+='<p><input class="form-control" placeholder="姓名" id="true_name" type="text" value="'+name_box+'"></p>';  
	 add_str+='</div>'; 
	add_str+='</div>';                       
	add_str+='</div>'; 
	                        
	/*add_str+='<div class="add_main_top2">'; 
	 add_str+='<div class="row">';    
	 add_str+='<div class="col-md-3 text-right">';                
	add_str+='<span class="line-height-34">手机号码：</span>';    
	 add_str+='</div>';  
	 add_str+='<div class="col-md-5">';                
	add_str+='<p><input class="form-control" placeholder="电话号码" id="true_phone" type="text" value="'+phone_box+'"></p>';    
	 add_str+='</div>';  
	 add_str+='<div class="col-md-4">'; 
	 add_str+='<botton type="botton" class="btn cg-btn-square btn-sm" onclick="settime(this);get();">发送手机验证码</botton>';  
	// add_str+='<input type="botton" class="btn cg-btn-square btn-sm" id="getting" value="获取验证码"/>';
	 add_str+='</div>';  
	 add_str+='</div>';                      
	add_str+='</div>'; */ 
	
	add_str+='<div class="add_main_top2">'; 
	 add_str+='<div class="row">';    
	 add_str+='<div class="col-md-3 text-right">';                
	add_str+='<span class="line-height-34">收货人号码：</span>';    
	 add_str+='</div>';  
	 add_str+='<div class="col-md-8">';                
	add_str+='<p><input class="form-control" placeholder="联系号码" id="true_phone" type="text" value="'+phone_box+'"></p>';    
	 add_str+='</div>';  
	  
	 add_str+='</div>';                      
	add_str+='</div>'; 
	
	add_str+='<div class="add_main_top2">';   
	 add_str+='<div class="row">';   
	 add_str+='<div class="col-md-3 text-right">';  
	  add_str+='<span class="line-height-34">收货地址：</span>';  
	 add_str+='</div>';
	
	 add_str+='<div class="col-md-9 form-inline nomargin">';              
	add_str+='<p><select id="Select1" class="form-control margin-r-5"></select><select id="Select2" class="form-control margin-r-5"></select><select id="Select3" class="form-control margin-r-5"></select></p>';  
	 add_str+='</div>'; 
 
	add_str+='</div>';                       
	add_str+='</div>';
	
	
	
	add_str+='<div class="add_main_top2">';  
	  add_str+='<div class="row">';   
	 add_str+='<div class="col-md-3 text-right">';  
	  add_str+='<span class="line-height-34">详细地址：</span>';  
	 add_str+='</div>';  
	 add_str+='<div class="col-md-9 text-right">';                  
	add_str+='<p><textarea class="form-control" rows="3" id="true_address" placeholder="收货地址">'+address+'</textarea></p>';    
	add_str+='</div>';  
	add_str+='</div>';                     
	add_str+='</div>';  
	
	//是否设置默认
	 add_str+='<div class="add_main_foot2">'; 
	 add_str+='<div class="row">';  
	  add_str+='<div class="col-md-5">'; 
	 add_str+='<div class="radio radio-check row form-group margin-l-10">';   
	  add_str+='<label for="baz[1]">设置为默认地址：</label>';  
	  add_str+='<input type="checkbox" name="quux[1]" id="baz[1]">';  
	 add_str+='</div>';                                              
		
     add_str+='</div>'; 
	 add_str+='</div>'; 
	 add_str+='</div>'; 
	 //是否设置默认结束
	
	add_str+='<div class="add_main_foot">';                      
	add_str+='<p><button type="button" class="btn cg-btn-square btn-sm" onclick="getEditAdress('+id+')">保存</button><button type="button" class="btn cg-btn-square2 btn-sm delete_btn margin-l-15">返回</button></p>';                           
	add_str+='</div>';
	add_str+='<div class="triangle_down"><img src="images/add_fy.png" alt=""></div>';    
	add_str+='</div>'; 
	//构建结构
	$("#addresslist").html(add_str);
	//按钮radio check
	$(".radio-check input").iCheck({
		checkboxClass: 'icheckbox_square-orange',
		radioClass: 'iradio_square-orange ',
		increaseArea: '20%'
	  }); 
	//地址联动
	//addressInit('Select1', 'Select2', 'Select3',  '陕西', '宝鸡市', '金台区');
	addressInit('Select1', 'Select2', 'Select3',''+province+'', ''+city+'',''+area+'');
	
	//取消修改
	$(".delete_btn").click(function(){
		  $(this).parent().remove();
		  addressList();
	  });
	  
}
var state_1=0;
function getEditAdress(id){
	//修改地址，与服务器相连接
	var true_name=$("#true_name").val();
	var true_phone=$("#true_phone").val();
	var true_address=$("#true_address").val();
	var province=$("#Select1").val();
	var city=$("#Select2").val();
	var area=$("#Select3").val();
	var verify=$("#verify").val();
	var regExPhone=/^1[3|4|5|8][0-9]\d{4,8}$/;  //手机号码
	var regVerifyNum_check=/^[0-9]{4,4}$/;  //手机验证码只能是4位数字
	//检查checkbox 是否选中
	if($('input:checkbox[name="quux[1]"]:checked').length>0){
		state_1=1
	}else{
		state_1=0;
		}
	if(verify==''){
		swal({
			title: "",
			text: '请输入验证码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}	
	if(!(regVerifyNum_check.test(verify))){
		swal({
			title: "",
			text: '请输入正确的4位手机验证码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}	
	if(true_name==''){
		swal({
			title: "",
			text: '请输入姓名',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	if(true_phone==''){
		swal({
			title: "",
			text: '请输入收货人号码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	if(!(regExPhone.test(true_phone))){
		swal({
			title: "",
			text: '请输入正确的手机号码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	if(true_address==''){
		swal({
			title: "",
			text: '请输入详细地址',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
		
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Address/addressSave',  
			data:{
				user_token:user_token,
				realname:true_name,
				province:province,
				city:city,
				area:area,
				address:true_address,
				cellphone:userMobile,//这是绑定号码
				telephone:true_phone,   //这是收件人号码
				verify:verify,
				id:id,
				state:state_1  //1是设置为默认地址，0是非默认地址
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				//$("#rightContent").html('<div class="loading"></div>');
				//$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			},
			success:function(data){ 
			   var code=data['code'];
			   var info=data['info'];
			   if(code!=200){
					swal({
						title: "",
						text: ''+info+'',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					return;
				}
			   addressList();
			}
	});
}
//添加地址
function addAdress(){
	
	var add_str='';
	add_str+='<div class="per-add_mainbg2 per-add_mainbg4 position-re padding-t-10" style="background:none" id="add_content_box">';  
	//add_str+='<a href="javascript:;" class="margin-r-5 position-ab delete_btn" style="right:5px;top:0px"><span class="glyphicon glyphicon-trash"></span></a>';   
	
	                        
	add_str+='<div class="add_main_top2" style="border-bottom: none;">'; 
	 add_str+='<div class="row" id="bind_phone">';    
	 add_str+='<div class="col-md-3 text-right">';                
	add_str+='<span class="line-height-34">已绑定手机：</span>';    
	 add_str+='</div>';  
	 /*add_str+='<div class="col-md-5">';                
	add_str+='<p style="line-height: 34px;">'+userMobile+'</p>';    
	 add_str+='</div>';  
	 add_str+='<div class="col-md-4">'; 
	
	 add_str+='<input type="button" class="btn cg-btn-square btn-sm" onclick="settime_address_2(this);get();" value="免费获取验证码">';  
	 add_str+='</div>';*/  
	  
	 if(typeof(userMobile) == 'undefined' || userMobile==''){
		  add_str+='<div class="col-md-9">';
		  add_str+='<p style="line-height: 34px;">您还没有绑定手机，点此去<a href="javascript:;" class="text-danger" data-toggle="modal" data-target="#myModal2">绑定手机号</a></p>';
		  add_str+='</div>';
		  
		 }else{
			 add_str+='<div class="col-md-5">';
			 add_str+='<p style="line-height: 34px;">'+userMobile+'</p>';   
			 add_str+='</div>';
			 add_str+='<div class="col-md-4">'; 
			 //add_str+='<botton type="botton" class="btn cg-btn-square btn-sm" onclick="settime_address(this);get();">发送手机验证码</botton>'; 
			 add_str+='<input type="button" class="btn cg-btn-square btn-sm" onclick="settime_address(this);get_add();" value="免费获取验证码">';  
			 add_str+='</div>';
			 }
			 
	 add_str+='</div>';                      
	add_str+='</div>';  
	
	add_str+='<div class="add_main_top2">';   
	 add_str+='<div class="row">';   
	 add_str+='<div class="col-md-3 text-right">';  
	  add_str+='<span class="line-height-34">手机验证码：</span>';  
	 add_str+='</div>';
	 add_str+='<div class="col-md-8">';              
	add_str+='<p><input class="form-control" placeholder="手机验证码" id="verify" type="text"></p>';  
	 add_str+='</div>'; 
	// add_str+='<div class="col-md-3">';              
	//add_str+='<p><botton type="botton" class="btn cg-btn-square btn-sm">确定</botton></p>';  
	// add_str+='</div>'; 
	add_str+='</div>';                       
	add_str+='</div>';
	
	               
	add_str+='<div class="add_main_top2">';   
	 add_str+='<div class="row">';   
	 add_str+='<div class="col-md-3 text-right">';  
	  add_str+='<span class="line-height-34">姓名：</span>';  
	 add_str+='</div>';
	 add_str+='<div class="col-md-8">';              
	add_str+='<p><input class="form-control" placeholder="姓名" id="true_name" type="text"></p>';  
	 add_str+='</div>'; 
	add_str+='</div>';                       
	add_str+='</div>'; 
	
	add_str+='<div class="add_main_top2">'; 
	 add_str+='<div class="row">';    
	 add_str+='<div class="col-md-3 text-right">';                
	add_str+='<span class="line-height-34">收货人号码：</span>';    
	 add_str+='</div>';  
	 add_str+='<div class="col-md-8">';                
	add_str+='<p><input class="form-control" placeholder="联系号码" id="true_phone" type="text"></p>';    
	 add_str+='</div>';  
	  
	 add_str+='</div>';                      
	add_str+='</div>'; 
	
	
	add_str+='<div class="add_main_top2">';   
	 add_str+='<div class="row">';   
	 add_str+='<div class="col-md-3 text-right">';  
	  add_str+='<span class="line-height-34">收货地址：</span>';  
	 add_str+='</div>';
	 add_str+='<div class="col-md-9 form-inline nomargin">';              
	add_str+='<p><select id="Select1" class="form-control margin-r-5"></select><select id="Select2" class="form-control margin-r-5"></select><select id="Select3" class="form-control margin-r-5"></select></p>';  
	 add_str+='</div>'; 
 
	add_str+='</div>';                       
	add_str+='</div>';
	
	add_str+='<div class="add_main_foot">';  
	  add_str+='<div class="row">';   
	 add_str+='<div class="col-md-3 text-right">';  
	  add_str+='<span class="line-height-34">详细地址：</span>';  
	 add_str+='</div>';  
	 add_str+='<div class="col-md-9 text-right">';                  
	add_str+='<p><textarea class="form-control" rows="3" id="true_address" placeholder="收货地址"></textarea></p>';    
	add_str+='</div>';  
	add_str+='</div>';                     
	add_str+='</div>';  
	//是否设置默认
	 add_str+='<div class="add_main_foot2">'; 
	 add_str+='<div class="row">';  
	  add_str+='<div class="col-md-5">'; 
	 add_str+='<div class="radio radio-check row form-group margin-l-10">';   
	  add_str+='<label for="baz[2]">设置为默认地址：</label>';  
	  add_str+='<input type="checkbox" name="quux[2]" id="baz[2]">';  
	 add_str+='</div>';                                              
		
     add_str+='</div>'; 
	 add_str+='</div>'; 
	 add_str+='</div>'; 
	 //是否设置默认结束
	add_str+='<div class="add_main_foot">';                      
	add_str+='<p><button type="button" class="btn cg-btn-square btn-sm" onclick="post_addAdress();">保存</button><button type="button" class="btn cg-btn-square2 btn-sm delete_btn margin-l-15">返回</button></p>';                           
	add_str+='</div>';
	add_str+='<div class="triangle_down"><img src="images/add_fy.png" alt=""></div>';    
	add_str+='</div>'; 
	//判断，只能创建一个添加地址的DOM，
	//获取剩余次数，如果是0，不能再添加
	var addressRemain=$("#addressRemain").text();
	 
	if((typeof(add_content_box)=='undefined') && addressRemain!=0){
		
		//$("#add_box").before(add_str);
	    $("#addresslist").html(add_str); 
		addressInit('Select1', 'Select2', 'Select3');
		//按钮radio check
		$(".radio-check input").iCheck({
			checkboxClass: 'icheckbox_square-orange',
			radioClass: 'iradio_square-orange ',
			increaseArea: '20%'
		  });
		  
	  }
	 
	  $(".delete_btn").click(function(){
		  $(this).parent().remove();
		  addressList();
	  })
}
//添加地址 与服务器链接，未完成,需要发送验证码，点击添加后  跳转到 编辑页面，覆盖掉 地址列表，提交成功后 刷新列表  从新获取
var state_2=0;
function post_addAdress(){
	var true_name=$("#true_name").val();
	var true_phone=$("#true_phone").val();
	var true_address=$("#true_address").val();
	var province=$("#Select1").val();
	var city=$("#Select2").val();
	var area=$("#Select3").val();
	var verify=$("#verify").val();
	var regExPhone=/^1[3|4|5|8][0-9]\d{4,8}$/;  //手机号码
	var regVerifyNum_check=/^[0-9]{4,4}$/;  //手机验证码只能是4位数字
	//检查checkbox 是否选中
	if($('input:checkbox[name="quux[2]"]:checked').length>0){
		state_2=1
	}else{
		state_2=0;
		}
	if(verify==''){
		swal({
			title: "",
			text: '请输入验证码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}	
	if(!(regVerifyNum_check.test(verify))){
		swal({
			title: "",
			text: '请输入正确的4位手机验证码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}	
	if(true_name==''){
		swal({
			title: "",
			text: '请输入姓名',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	if(true_phone==''){
		swal({
			title: "",
			text: '请输入收货人号码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	if(!(regExPhone.test(true_phone))){
		swal({
			title: "",
			text: '请输入正确的手机号码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	if(true_address==''){
		swal({
			title: "",
			text: '请输入详细地址',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Address/addressAdd',  
			data:{
				user_token:user_token,
				realname:true_name,
				province:province,
				city:city,
				area:area,
				address:true_address,
				cellphone:userMobile,//这是绑定号码
				telephone:true_phone,   //这是收件人号码
				verify:verify,
				state:state_2   //如果是设置为1，则是设置为默认地址，如果是0则不是默认地址
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				//$("#rightContent").html('<div class="loading"></div>');
				//$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			},
			success:function(data){ 
			   var code=data['code'];
			   var info=data['info'];
			   /*if(code==517){
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
				}*/
			   if(code!=200){
					swal({
						title: "",
						text: ''+info+'',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					return;
				}
			   addressList();
			}
	});
}
//获取手机验证码	---添加收货地址
function get_add(){
	//var true_phone=$("#true_phone").val();
    $.ajax({
		type:'post',
		dataType:'json',
		url:''+ajaxUrl+'/Home/Verify/getVerify',  
			data:{
				user_token:user_token,
				cellphone:userMobile,
				type:4
				},  
			cache:false, 
			success:function(data){ 
			     var code=data['code'];
				 var info=data['info'];
				 if(code!=200){
					  swal({
						  title: "",
						  text: ''+info+'',
						  html: true,
						  type: "error",
						  confirmButtonText:"确定",
						  confirmButtonColor: "#ff4800",
					  });
					  return;
				  }
			} 
		});
}	
//获取手机验证码	---修改收货地址
function get_edit(){
	//var true_phone=$("#true_phone").val();
    $.ajax({
		type:'post',
		dataType:'json',
		url:''+ajaxUrl+'/Home/Verify/getVerify',  
			data:{
				user_token:user_token,
				cellphone:userMobile,
				type:5
				},  
			cache:false, 
			success:function(data){ 
			     var code=data['code'];
				 var info=data['info'];
				 if(code!=200){
					  swal({
						  title: "",
						  text: ''+info+'',
						  html: true,
						  type: "error",
						  confirmButtonText:"确定",
						  confirmButtonColor: "#ff4800",
					  });
					  return;
				  }
			} 
		});
}
//获取手机验证码-用于第三方登录时，去绑定手机号码-输入手机号后获取手机验证码
function get_phoneIn(){
	var getPhone=$("#getPhone").val();
    $.ajax({
		type:'post',
		dataType:'json',
		url:''+ajaxUrl+'/Home/Verify/getVerify',  
			data:{
				user_token:user_token,
				cellphone:getPhone,
				type:15
				},  
			cache:false, 
			success:function(data){ 
			     var code=data['code'];
				 var info=data['info'];
				 if(code!=200){
					  swal({
						  title: "",
						  text: ''+info+'',
						  html: true,
						  type: "error",
						  confirmButtonText:"确定",
						  confirmButtonColor: "#ff4800",
					  });
					  return;
				  }
			} 
		});
}
//倒数120S后重新获取验证码
//修改地址的倒计时
var countdown=120; 
function settime_address(obj) { 
    if (countdown == 0) { 
        obj.removeAttribute("disabled");    
        obj.value="免费获取验证码"; 
        countdown= 120; 
        return;
    } else { 
        obj.setAttribute("disabled", true); 
        obj.value="重新发送(" + countdown + ")"; 
        countdown--; 
    } 
setTimeout(function() { 
    settime_address(obj) }
    ,1000) 
}
//添加地址的倒计时
var countdown_2=120; 
function settime_address_2(obj) { 
    if (countdown_2 == 0) { 
        obj.removeAttribute("disabled");    
        obj.value="免费获取验证码"; 
        countdown_2= 120; 
        return;
    } else { 
        obj.setAttribute("disabled", true); 
        obj.value="重新发送(" + countdown_2 + ")"; 
        countdown_2--; 
    } 
setTimeout(function() { 
    settime_address_2(obj) }
    ,1000) 
}


//添加地址的倒计时 用于第三方登录时，去绑定手机号码-输入手机号后
var countdown_3=120; 
function settime_address_3(obj) { 
    var getPhone=$("#getPhone").val();
	if(getPhone==''){
		swal({
			title: "",
			text: '请输入手机号码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
    if (countdown_3 == 0) { 
        obj.removeAttribute("disabled");    
        obj.value="免费获取验证码"; 
        countdown_3= 120; 
        return;
    } else { 
        obj.setAttribute("disabled", true); 
        obj.value="重新发送(" + countdown_3 + ")"; 
        countdown_3--; 
    } 
setTimeout(function() { 
    settime_address_3(obj) }
    ,1000) 
}

//删除地址
function deleteAdress(id){
	$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/Address/addressDel',  
			data:{
				user_token:user_token,
				id:id
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				//$("#rightContent").html('<div class="loading"></div>');
				//$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			},
			success:function(data){
				addList();
			   addressList();
			}
	});
}
//用于第三方登录时，去绑定手机号码-输入手机号和手机验证码后验证
function bindPhone_last(){
	var getPhone=$("#getPhone").val();
	var verify=$("#verify-bind").val();
	var regExPhone_find=/^1[3|4|5|8][0-9]\d{4,8}$/;//手机号码
	var regVerifyNum_find=/^[0-9]{4,4}$/;  //手机验证码只能是4位数字
	if(!(regExPhone_find.test(getPhone))){
		swal({
			title: "",
			text: '请输入正确的11位手机号码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	if(!(regVerifyNum_find.test(verify))){
		swal({
			title: "",
			text: '请输入正确的4位手机验证码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
    $.ajax({
		type:'post',
		dataType:'json',
		url:''+ajaxUrl+'/Home/Verify/mobileBind',  
			data:{
				user_token:user_token,
				cellphone:getPhone,
				verify:verify,
				
				},  
			cache:false, 
			success:function(data){ 
			   var code=data['code'];
			   var info=data['info'];
			   if(code!=200){
					swal({
						title: "",
						text: ''+info+'',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					return;
				}
				
				//绑定手机成功后，隐藏模态框，调用个人信息接口，取得手机号码，填充进添加地址中
				getUserInfo_re();
				
			} 
		});
}

function getUserInfo_re(){
	$.ajax({  
		  type:'post',  
		  url:''+ajaxUrl+'/Home/ucenter/userInfo',  
		  data:{
			  user_token:user_token
			  },  
		  cache:false,  
		  dataType:'json',  
		  beforeSend:function(){
		  },
		  success:function(data){  
			  var code=data['code'];
			  var info=data['info'];
			  var list=data['list'];
			  if(code==200){
				  var mobile =list['mobile'];
				  //成功后把手机号码再次存进cookie
				  //$.cookie('userMobile', userMobile, { expires:1, path: '/' });
				  var add_str='';
				  add_str+='<div class="col-md-3 text-right">';                
				  add_str+='<span class="line-height-34">已绑定手机：</span>';    
				   add_str+='</div>';  
				   add_str+='<div class="col-md-5">';                
				  add_str+='<p style="line-height: 34px;">'+mobile+'</p>';    
				   add_str+='</div>';  
				   add_str+='<div class="col-md-4">'; 
				  
				   add_str+='<input type="button" class="btn cg-btn-square btn-sm" onclick="settime_address_2(this);get();" value="免费获取验证码">';  
				   add_str+='</div>';  
				   $("#bind_phone").html(add_str);
				   
				   //修改手机号中，第三方登录时，没有手机号，弹出遮罩层，当绑定手机后，隐藏遮罩层
				    $('#myModal2').modal('hide');
					$("#layer_text").hide();
					$(".layer_bg").hide();
					var mobile2=mobile.substring(0,3)+'*****'+mobile.substring(8,11)
					$("#phoneNum").html(mobile2);
				   
				}
				  
		  }
	});
}