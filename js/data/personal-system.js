// 个人设置
//个人基本信息的显示和修改
$("#mySystem").click(function(){
	sys_info();
});
//基本信息列表
var glo_mobile;
var glo_nickname;
var glo_birthday;
var glo_qq;
var glo_sex;
var glo_mobile_2;

function sys_info(){
	if(typeof(user_token) == "undefined") {
		
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
	
	$("#mySystem").addClass("active").siblings().removeClass("active");
	
	var systemStr='';
	    systemStr+='<div class="row">';
		systemStr+='<div class="per-goods-box nomargin">';
		 // Nav tabs -->
		systemStr+='<ul class="nav nav-tabs" role="tablist">';
		
		systemStr+='<li role="presentation" class="active"><a href="#sys_home" aria-controls="home" role="tab" data-toggle="tab" id="" aria-expanded="true" onClick="sys_info();">个人资料</a></li>';
		systemStr+='<li role="presentation"><a href="#sys_home" aria-controls="profile" role="tab" data-toggle="tab" id=""  aria-expanded="false" onClick="editUserPic()">修改头像</a></li>';
		systemStr+='<li role="presentation"><a href="#sys_home" aria-controls="profile" role="tab" data-toggle="tab" id="editPassBtn" aria-expanded="false" onClick="editPassword();">修改密码</a></li>';
		systemStr+='<li role="presentation"><a href="#sys_home" aria-controls="profile" role="tab" data-toggle="tab" id="" aria-expanded="false" onClick="editPhone();">修改手机</a></li>';
		systemStr+='<li role="presentation"><a href="#sys_home" aria-controls="profile" role="tab" data-toggle="tab" id="" aria-expanded="false" onClick="bind_third();">绑定第三方</a></li>';
		
		systemStr+='</ul>';
		systemStr+='<div class="per_time_tab-content">';
		// Tab panes input -->
		
		// Tab panes input end-->    
		// Tab panes -->
		systemStr+='<div class="tab-content">';
		//用于第三方登录时还没有绑定手机号时的去绑定手机结构
		systemStr+='<div id="layer_text">';
		systemStr+='</div>';
		
		systemStr+='<div role="tabpanel" class="tab-pane active clearfix" id="sys_home">';
		 
		systemStr+='</div>';
		
        $("#rightContent").html(systemStr);
		
		$.ajax({  
			  type:'post',  
			  url:''+ajaxUrl+'/Home/ucenter/userInfo',  
			  data:{
				  user_token:user_token
				  },  
			  cache:false,  
			  dataType:'json',  
			  beforeSend:function(){
				  $("#sys_home").html('<div class="loading"></div>');
				  $(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			  },
			  success:function(data){  
				  var code=data['code'];
				  var info=data['info'];
				  if(code!=200){
					  $("#sys_home").html(info);
					  if(code==517){//如果有未登录提示，则跳到首页
					       /*swal({
								title: "",
								text: ''+info+'，点这里去<a href="login.html" class="text-danger">登陆或者注册</a>',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							},function(){
								

								//设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
								setTimeout(function(){
								  window.location.href="login.html"
								}, 500);
							});*/
						   $("#loginBox").html('<a href="login.html">请登录<a>');
						   $("#regBox a").html("注册").attr({id:"reg_a",href:"login.html?regist=1"});
						   window.location.href='login.html';
					  }
					  return
					  }
				    
				  var userInfo=data['list'];
				  //var phost=userInfo['phost'];	//头像地址前缀
				  var nickname =userInfo['nickname'];
				  glo_nickname=nickname;
				  var uid =userInfo['uid'];
				  var sex =userInfo['sex'];
				  glo_sex=sex;
				  var birthday =userInfo['birthday'];
				  glo_birthday=birthday;
				  var qq =userInfo['qq'];
				  glo_qq=qq;
				  var mobile =userInfo['mobile'];
				  glo_mobile=mobile;
				  var score =userInfo['score'];
				  var brokerage =userInfo['brokerage'];
				  var red_packet =userInfo['red_packet'];
				  var account =userInfo['account'];
				  var login_type=userInfo['login_type'];//用于判断是否是第三方登录，0为本地账户登录，其他为第三方登录
				 // var face=userInfo['face'];//用户头像
				  var sex_2;
				  if(sex==0){
					  sex_2='女';
					  }else{
						  sex_2='男';
						  }
				  var userStr='';
				  //userStr+='<div class="per-per_top"><span>温馨提示：完善以下资料即可获得100积分，橙果1元购不会以任何形式公开您的个人隐私！</span></div>';
				  userStr+='<div class="per_permain" id="basicInfo">'; 
				  userStr+='<div><botton type="botton" class="btn cg-btn-square" onClick="editInfo();">编辑资料</botton></div>';
				  userStr+='<ul class="list-group">'; 
				  userStr+='<li class="list-group-item"><span><b>昵称：</b></span>'+nickname+'</li>';
				  userStr+='<li class="list-group-item"><span><b>性别：</b></span>'+sex_2+'</li>';   
				  userStr+='<li class="list-group-item"><span><b>生日：</b></span>'+birthday+'</li>';
				  userStr+='<li class="list-group-item"><span><b>QQ：</b></span>'+qq+'</li>'; 
				  userStr+='</ul> ';                               
                  userStr+='</div>';  
				  //写入用户头像
				 
				                                   
				  if(login_type!=0){
					  //第三方登录，隐藏修改密码按钮
					  //$("#editPassBtn").parent().hide();
					  } 
				   
				  $("#sys_home").html(userStr);
				  $("#myName").html(nickname);
				  $("#myName2").html(nickname);
				  $(".loading").empty();	  
			  }
		});
}
//构建编辑 DOM
function editInfo(){
	
	
	var editInfoStr='';
	editInfoStr+='<div class="margin-b-20"><botton type="botton" class="btn cg-btn-square" onClick="cancelInfo();">取消编辑</botton></div>';
	editInfoStr+='<div class="form-group clearfix row">';
	editInfoStr+='<label class="col-sm-1 control-label text-right line-height-34">昵称：</label>';
	editInfoStr+='<div class="col-sm-3">';
    editInfoStr+='<input type="text" class="form-control"  placeholder="昵称" id="nickName" value="'+glo_nickname+'">';                                              
    editInfoStr+='</div>';                                                 
    editInfoStr+='</div>';                                                   
    editInfoStr+='<div class="radio radio-check row form-group">';                                                 
    editInfoStr+='<span class="col-md-1 text-right" style="font-weight: 700;">性别：</span>';   
	 if(glo_sex==0){
		editInfoStr+='<input type="radio" name="quux[2]" id="baz[1]">';                                          
		editInfoStr+='<label for="baz[1]">男</label>';                                   
		editInfoStr+='<input type="radio" name="quux[2]" id="baz[2]" checked>';                                             
		editInfoStr+='<label for="baz[2]">女</label>'; 
		}else{
			editInfoStr+='<input type="radio" name="quux[2]" id="baz[1]" checked>';                                          
			editInfoStr+='<label for="baz[1]">男</label>';                                   
			editInfoStr+='<input type="radio" name="quux[2]" id="baz[2]">';                                             
			editInfoStr+='<label for="baz[2]">女</label>'; 
			}
	 
	                                              
    editInfoStr+='</div>'; 
	editInfoStr+='<div class="row form-group margin-t-20">';                                                   
    editInfoStr+='<div class="col-md-1 text-right">';                                                
    editInfoStr+='<label class="line-height-34"> 生日：</label>';                                              
    editInfoStr+='</div>';                                                    
    editInfoStr+='<div class="col-md-3">';                                               
    editInfoStr+='<input type="text" class="Wdate cg_input_2 form-control" placeholder="" onClick="WdatePicker({skin:\'whyGreen\',maxDate:\'%y-%M-%d\'})" id="birthday" value="'+glo_birthday+'">';   //生日只能选今天之前的时间                                         
    editInfoStr+='</div>';                                    
   // editInfoStr+='<div class="text-danger col-md-4 line-height-34">2016年11月13日才能再次编辑您的生日</div>';    
	editInfoStr+='</div>';                                          
    editInfoStr+='<div class="form-group clearfix row">';                                               
    editInfoStr+='<label class="col-sm-1 control-label text-right line-height-34">QQ：</label>';                                            
    editInfoStr+='<div class="col-sm-3">';                                    
    editInfoStr+='<input type="text" class="form-control" placeholder="" id="qq" value="'+glo_qq+'">';                                               
    editInfoStr+='</div>';                                                 
    editInfoStr+='</div>';                                                 
    editInfoStr+='<div class="per-qq-input">';                                                
    editInfoStr+='<button type="button" class="btn cg-btn-danger3" style="margin-left:50px;" id="edidBasic_btn" onClick="postEdit();">保存</button>';
	editInfoStr+='</div>';                                        
                                         
    $("#basicInfo").html(editInfoStr); 	     
	//按钮radio check
	$(".radio-check input").iCheck({
		checkboxClass: 'icheckbox_square-orange',
		radioClass: 'iradio_square-orange ',
		increaseArea: '20%'
	  });                                     
                                        
}
function cancelInfo(){
	sys_info();//取消编辑
	
}
//提交编辑
function postEdit(){
   var 	nickName=$("#nickName").val();
   var  birthday=$("#birthday").val();
   var  qq=$("#qq").val();
   var sex=$('input:radio[name="quux[2]"]:checked').attr("id");
  // var nickNameCheck=/[A-Za-z0-9\u4e00-\u9fa5]{2,8}$/;  //2-8位字符
  //
  var nickNameCheck=/^.{1,8}$/;  //2-8位字符 
   
   var checkQq=/[1-9][0-9]{4,}/;  //腾讯QQ号从10000开始,检车是否为QQ号码
   var sex_2;
   if(sex=='baz[2]'){
	   sex_2=0;//0是女，1是男
	   }else{
		   sex_2=1;
		   }
   
   if(nickName==''){
	   swal({
			title: "",
			text: '请输入昵称',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	if(!(nickNameCheck.test(nickName))){
		//&&nickName!=''
		swal({
			title: "",
			text: '昵称的长度是1-8位字符',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	if(!(checkQq.test(qq))&&qq!=''){
		swal({
			title: "",
			text: '请输入正确的QQ号',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
   $.ajax({  
		type:'post',  
		url:''+ajaxUrl+'/Home/ucenter/userInfoUp',  
		data:{
			user_token:user_token,
			nickname:nickName,
			sex:sex_2,
			birthday:birthday,
			qq:qq
			},  
		cache:false,  
		dataType:'json',  
		beforeSend:function(){
			//$("#sys_home").html('<div class="loading"></div>');
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
			swal({
				title: "",
				text: ''+info+'！',
				html: true,
				type: "success",
				confirmButtonText:"确定",
				confirmButtonColor: "#ff4800",
				
			},function(){
				$.cookie('nickname', nickName, { expires:1, path: '/' });
				sys_info();
				});
			
			
			//$("#basicInfo").html('<div class="margin-t-b-15"><span class="padding-r-15">修改信息成功</span><botton type="botton" class="btn cg-btn-square" onClick="sys_info();">返回个人信息列表</botton></div>');
			
		}
   });
}
//个人头像的显示和修改
function editUserPic(){
	//首先把去绑定手机的结构清空掉
	$("#layer_text").html('');
	var editUserPicStr='';
	editUserPicStr+='<div class="per-per_top"><span>温馨提示：请上传1MB以内的jpg，gif，png图片</span></div>';
	/*editUserPicStr+='<div class="upload-left pull-left">';
	
	
	editUserPicStr+='<div class="upload-img">';
	editUserPicStr+='<div id="container">';
	editUserPicStr+='<a href="javascript:void(0);" id="selectfiles" style="text-align:center; display:block;" class="linkIk">';
	editUserPicStr+='<span class="glyphicon glyphicon-plus"></span>';
	editUserPicStr+='<p style="font-size:16px">点击上传本地图像</p>';
	editUserPicStr+='</a>';
	editUserPicStr+='</div>';
	editUserPicStr+='</div>';
	
	//addDissStr+='<div id="container">';
	//addDissStr+='<a id="selectfiles" href="javascript:void(0);" class="btn cg-btn-square">选择文件</a>';
	//addDissStr+='<a id="postfiles" href="javascript:void(0);" class="btn cg-btn-square margin-l-10">开始上传</a>';
	//addDissStr+='</div>';
	
	
	editUserPicStr+='<div class="upload-input">';
	//editUserPicStr+='<p class="text-center">点击图片并拉动以选择需要剪裁的区域</p>';
	
	
	editUserPicStr+='</div>';
	editUserPicStr+='</div>';*/
	
	editUserPicStr+='<div class="upload-left2">';
	//editUserPicStr+='<div class="upload-prompt">您上传的头像将会分成两种尺寸，请注意头像是否清晰：</div>';
	editUserPicStr+='<div class="right-img">';
	editUserPicStr+='<div id="ossfile" class="clearfix margin-b-10">你的浏览器不支持flash,Silverlight或者HTML5</div>';
	
	editUserPicStr+='</div>';
	//editUserPicStr+='<a href="javascript:void(0);" id="selectfiles" style="text-align:center; display:block;" class="linkIk">';
	//editUserPicStr+='<span class="glyphicon glyphicon-plus"></span>';
	//editUserPicStr+='<p style="font-size:16px">点击上传本地图像</p>';
	//editUserPicStr+='</a>';
	editUserPicStr+='<div id="container">';
	editUserPicStr+='<a id="selectfiles" href="javascript:void(0);" class="btn cg-btn-square">选择文件</a>';
	editUserPicStr+='<a id="postfiles" href="javascript:void(0);" class="btn cg-btn-square margin-l-10">开始上传</a>';
	editUserPicStr+='</div>';
	//editUserPicStr+='<p class="text-center"><button type="button" class="btn" id="postfiles">上传</button></p>';
	
	
	/*editUserPicStr+='<ul>';
	editUserPicStr+='<li><img src="images/upload-180px.jpg" alt=""><p style="padding:10px 38px;">160*160像素</p></li>';
	editUserPicStr+='<li><img src="images/upload-80px.jpg" alt=""><p style="padding:10px 10px;">80*80像素</p></li>';
	editUserPicStr+='</ul>';
	editUserPicStr+='</div>';*/
	//editUserPicStr+='<div id="container">';
	//editUserPicStr+='<a id="selectfiles" href="javascript:void(0);" class="btn cg-btn-square">选择文件</a>';
	//editUserPicStr+='<a id="postfiles" href="javascript:void(0);" class="btn cg-btn-square margin-l-10">开始上传</a>';
	//editUserPicStr+='</div>';
   // editUserPicStr+='<div class="clearfix"></div>';                                            
   // editUserPicStr+='<hr>';   
	//editUserPicStr+='<div id="ossfile" class="clearfix">你的浏览器不支持flash,Silverlight或者HTML5！</div>';
	
	editUserPicStr+='</div>';
	
	editUserPicStr+='</div>';
	$("#sys_home").html(editUserPicStr);
	//从服务器检查是否存在头像
	$.ajax({  
		type:'post',  
		url:''+ajaxUrl+'/Home/ucenter/upPhoto',  
		data:{
			user_token:user_token
			},  
		cache:false,  
		dataType:'json', 
		timeout:60000,
		beforeSend: function(){
			$("#ossfile").html('<div class="loading"></div>');
			$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			},
		success:function(data){
			  var code=data['code'];
			  var info=data['info'];
			  if(code!=200){
				  $("#ossfile").html(info);
				}else{
					var host=data['host'];
					var pic_host=data['pic_host'];
					var path=data['path'];
					var picReg=/^http[\s\S]*$/;
					//var btnUserPicStr='';
					//btnUserPicStr+='<div id="container">';
					//btnUserPicStr+='<a href="javascript:void(0);" id="selectfiles" style="text-align:center; display:block;" class="linkIk">';
					//btnUserPicStr+='<span class="glyphicon glyphicon-plus"></span>';
					//btnUserPicStr+='<p style="font-size:16px">点击上传本地图像</p>';
					//btnUserPicStr+='</a>';
					//btnUserPicStr+='</div>';
					
					if(path<=0){
						$("#ossfile").html('<img src="images/default1.png"/>');
						/*if(glo_sex==1){
							$("#ossfile").html('<img src="images/default1.png" style="height:100%;"/>');
							}else{
								$("#ossfile").html('<img src="images/default2.png" style="height:100%;"/>');
								}*/
						
					}else{
						
						var p=picHostUrl(pic_host,path);//验证有没有头像，是本地登录还是第三方登录
						$("#ossfile").html('<div class="imgBox2"><img src="'+p+'"/></div>');
						/*if(!(picReg.test(path))){
							path=pic_host+path;
							$("#ossfile").html('<div class="imgBox2"><img src="'+path+picScale+'" style="height:100%;"/></div>');
							
							}else{
								$("#ossfile").html('<div class="imgBox2"><img src="'+path+'" style="height:100%;"/></div>');
								
								}*/
						
						$("#selectfiles").text("修改头像");
						}
					
				}
			  
		  }
	  });
	
	//头像文件上传开始
	  accessid = ''
	  accesskey = ''
	  host = ''
	  policyBase64 = ''
	  signature = ''
	  callbackbody = ''
	  filename = ''
	  key = ''
	  expire = 0
	  now = timestamp = Date.parse(new Date()) / 1000; 
	  
	  function send_request()
	  {
		  var xmlhttp = null;
		  if (window.XMLHttpRequest)
			{
				xmlhttp=new XMLHttpRequest();
			}
			else if (window.ActiveXObject)
			{
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
		  
			if (xmlhttp!=null)
			{
				phpUrl = upPicUrl+'/index.php/Home/Upload/get_file?id='+userId+'&type=1'; //1是头像上传  2是晒单图片
				xmlhttp.open( "GET", phpUrl, false );
				
				xmlhttp.send( null );
				return xmlhttp.responseText
			}
			
			else
			{
				alert("Your browser does not support XMLHTTP.");
			}
	  };
	  
	  function get_signature()
	  {
		  //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
		  now = timestamp = Date.parse(new Date()) / 1000; 
		  console.log('get_signature ...');
		  console.log('expire:' + expire.toString());
		  console.log('now:', + now.toString())
		  if (expire < now + 3)
		  {
			  console.log('get new sign')
			  body = send_request()
			  var obj = eval ("(" + body + ")");
			  host = obj['host']
			  policyBase64 = obj['policy']
			  accessid = obj['accessid']
			  signature = obj['signature']
			  expire = parseInt(obj['expire'])
			  callbackbody = obj['callback'] 
			  key = obj['dir']
			  return true;
		  }
		  return false;
	  };
	  
	  function set_upload_param(up)
	  {
		  var ret = get_signature()
		 // if (ret == true)
		  //{
			  new_multipart_params = {
				  'key' : key + Math.uuid()+'.jpg',
				  //'key' : key + '${filename}',
				  'policy': policyBase64,
				  'OSSAccessKeyId': accessid, 
				  'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
				  'callback' : callbackbody,
				  'signature': signature,
			  };
	  
			  up.setOption({
				  'url': host,
				  'multipart_params': new_multipart_params
			  });
			  
	  
			  console.log('reset uploader')
			  //uploader.start();
		 // }
	  }
	  //实例化一个文件上传函数
	  var uploader = new plupload.Uploader({
		  runtimes : 'html5,flash,silverlight,html4',
		  browse_button : 'selectfiles', 
		  container: document.getElementById('container'),
		  flash_swf_url : '../plupload-2.1.2/js/Moxie.swf',
		  silverlight_xap_url : '../plupload-2.1.2/js/Moxie.xap',
	      
		  url : 'http://oss-cn-shenzhen.aliyuncs.com',
		  
		  filters: {
				mime_types : [ //只允许上传图片文件
				  { title : "图片文件", extensions : "jpg,gif,png" }
				],
				max_file_size : '1000kb', //最大只能上传400kb的文件
                prevent_duplicates : true, //不允许选取重复文件
                multi_selection: false,//设置只能单选文件
			  },
		  init: {
			  PostInit: function() {
				  document.getElementById('ossfile').innerHTML = '';
				  document.getElementById('postfiles').onclick = function() {
				  set_upload_param(uploader);
				  uploader.start();
				  return false;
				  };
			  },
	  
			  FilesAdded: function(up, files) {
				 
				  //只上传一张图片
				  $.each(up.files, function (i, file) {
					  if (up.files.length <= 1) {
						  return;
					  }
					  up.removeFile(file);
				  }); 
				  
				  for(var i = 0, len = files.length; i<len; i++){
					    var picStr='';
						var file_name = files[i].name; //文件名
						//构造html来更新UI,构造图片容器
						
						//document.getElementById('ossfile').innerHTML += '<div id="imgBox" class="imgBox pull-left position-re">'
						//+'<div id="' + files[i].id + '"><p class="nomargin imgSize">' + files[i].name + ' (' + plupload.formatSize(files[i].size) + ')</p>'
						//+'<div class="progress upImages_progress"><div class="progress-bar" style="width: 0%"></div></div>'
						//+'</div>'
						//+'<a href="javascript:;" class="margin-r-5 position-ab delete_btn_2" style="right:-5px;top:0px">'
						//+'<span class="glyphicon glyphicon-trash"></span>';
						//+'</a>'
						//+'</div>';
						
						picStr+='<div id="imgBox" class="imgBox2 pull-left position-re">';
						picStr+='<div id="' + files[i].id + '"><p class="nomargin imgSize">' + files[i].name + ' (' + plupload.formatSize(files[i].size) + ')</p><b></b>';
						
						picStr+='<div class="progress upImages_progress cg-progress"><div class="progress-bar progress-bar-warning" style="width: 0%;float:none"></div></div>';
						picStr+='<a href="javascript:;" class="margin-r-5 position-ab delete_btn_2" style="right:-5px;top:0px">';
						picStr+='<span class="glyphicon glyphicon-trash nopadding-left" style="font-size:14px;"></span>';
						picStr+='</a>';
						picStr+='</div>';
						
					    $('#ossfile').html(picStr);
						!function(i){
							previewImage(files[i],function(imgsrc){
								
								$('#imgBox').append('<img src="'+ imgsrc +'" style="height:100%;"/>');
								//$('#file-'+files[i].id).append('<img src="'+ imgsrc +'" />');
								//document.getElementById('imgBox').innerHTML='<img src="'+ imgsrc +'" />'
								
							})
						}(i);
					}
				  
			  },
			  
			  UploadProgress: function(up, file) {
				  var d = document.getElementById(file.id);
				  d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
				  
				  var prog = d.getElementsByTagName('div')[0];
				  var progBar = prog.getElementsByTagName('div')[0]
				  progBar.style.width= 100+'%';
				  progBar.setAttribute('aria-valuenow', file.percent);
			  },
	  
			  FileUploaded: function(up, file, info) {
				  console.log('uploaded')
				  console.log(info.status)
				  set_upload_param(up);
				  if (info.status == 200)
				  {
					  document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传成功';
					  //图片上传成功之后显示用户上传的头像，从服务器获取
					  $.ajax({  
						type:'post',  
						url:''+ajaxUrl+'/Home/ucenter/upPhoto',  
						data:{
							user_token:user_token
							},  
						cache:false,  
						dataType:'json', 
						timeout:60000,
						beforeSend: function(){
							$("#ossfile").html('<div class="loading"></div>');
							$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
							},
						success:function(data){
							  var code=data['code'];
							  var info=data['info'];
							  if(code!=200){
								  $("#ossfile").html(info);
								}else{
									var host=data['host'];
									var pic_host=data['pic_host'];
									var path=data['path'];
									var picReg=/^http[\s\S]*$/;
									//var btnUserPicStr='';
									//btnUserPicStr+='<div id="container">';
									//btnUserPicStr+='<a href="javascript:void(0);" id="selectfiles" style="text-align:center; display:block;" class="linkIk">';
									//btnUserPicStr+='<span class="glyphicon glyphicon-plus"></span>';
									//btnUserPicStr+='<p style="font-size:16px">点击上传本地图像</p>';
									//btnUserPicStr+='</a>';
									//btnUserPicStr+='</div>';
									
									if(path<=0){
										if(glo_sex==1){
											$("#ossfile").html('<img src="images/default1.png"/>');
											}else{
												$("#ossfile").html('<img src="images/default2.png"/>');
												}
										
									}else{
										
										if(!(picReg.test(path))){
											path=pic_host+path;
											$("#ossfile").html('<div class="imgBox2"><img src="'+path+'" /></div>');
											$("#userPic").html('<img src="'+path+'"/>');
											}else{
												$("#ossfile").html('<div class="imgBox2"><img src="'+path+picScale+'"/></div>');
												$("#userPic").html('<img src="'+path+picScale+'"/>');
												}
										
										$("#selectfiles").text("修改头像");
										}
									//$("#ossfile").html('<img src="'+path+'"/>');
									$.cookie('path', path, { expires:1, path: '/' });//修改完成后重新写入用户头像
								}
						      
						  }
					  });
				  }
				  else
				  {
					  document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
				  } 
			  },
	  
			  Error: function(up, err) {
				  set_upload_param(up);
				  document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
			  }
		  }
	  });
	  
	  uploader.init();
	  
	  
	  $(document).on('click', 'a.delete_btn_2', function () {
                $(this).parent().parent().remove();
                var toremove = '';
                var id = $(this).attr("data-val");
                for (var i in uploader.files) {
                    if (uploader.files[i].id === id) {
                        toremove = i;
                    }
                }
                uploader.files.splice(toremove, 1);
            });
	  //定义一个图片预览 函数
	  function previewImage(file,callback){//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
			  if(!file || !/image\//.test(file.type)) return; //确保文件是图片
			  if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
				  var fr = new mOxie.FileReader();
				  fr.onload = function(){
					  callback(fr.result);
					  fr.destroy();
					  fr = null;
				  }
				  fr.readAsDataURL(file.getSource());
			  }else{
				  var preloader = new mOxie.Image();
				  preloader.onload = function() {
					  preloader.downsize( 160, 160 );//先压缩一下要预览的图片,宽200，高300
					  var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
					  callback && callback(imgsrc); //callback传入的参数为预览图片的url
					  preloader.destroy();
					  preloader = null;
				  };
				  preloader.load( file.getSource() );
			  }	
			  
			$(".imgBox").hover(function(){
			
			  $(this).addClass("hover_deleteBtn");
			  },function(){
				  $(this).removeClass("hover_deleteBtn");
				  });  
			  
		  }
		  //头像上传结束 
	
	
}
//修改密码-结构
function editPassword(){
	//$('.nav-tabs a[href="#sys_home"]').tab('show');
	var editPasswordStr='';
	editPasswordStr+='<div class="Change-password">';
	//editPasswordStr+='<p class="nomargin text-danger" id="pass_tip"></p>';
	editPasswordStr+='<div class="form-inline margin-t-8">';
	editPasswordStr+='<div class="form-group">';               
    editPasswordStr+='<label style="width:76px;" class="text-right">旧密码：</label>';    
	editPasswordStr+='<label class="sr-only" >Password</label>';    
	editPasswordStr+='<input class="form-control" placeholder="旧密码" type="password" id="old_pass" onblur="checkPass_length($(this))" onClick="checkPass_length($(this))"/>';   
	//editPasswordStr+='<span class="text-danger padding-l-15">密码错误</span>';                                                            
    editPasswordStr+='</div>';                                            
    editPasswordStr+='</div>';                                            
    editPasswordStr+='<div class="form-inline">';                                            
    editPasswordStr+='<div class="form-group">';                                            
    editPasswordStr+='<label style="width:76px;"class="text-right">新密码：</label>';    
	editPasswordStr+='<label class="sr-only">新密码</label>';                                       
    editPasswordStr+='<input class="form-control" placeholder="密码由6-20位字符组成" type="password" id="new_pass" onblur="checkPass_length($(this))" onClick="checkPass_length($(this))"/>';        
	editPasswordStr+='</div>';                                            
    editPasswordStr+='</div>';
	
	editPasswordStr+='<div class="form-inline">';                                            
    editPasswordStr+='<div class="form-group">';                                            
    editPasswordStr+='<label style="width:76px;class="text-right">确认密码：</label>';    
	editPasswordStr+='<label class="sr-only">确认密码</label>';                                       
    editPasswordStr+='<input class="form-control" placeholder="确认密码" type="password" id="new_pass_2" onblur="checkPass_length($(this))" onClick="checkPass_length($(this))"/>';               
	editPasswordStr+='</div>';                                            
    editPasswordStr+='</div>';  
    editPasswordStr+='<div class="per-personal-sub"><button type="button" class="btn cg-btn-danger3" onClick="post_editPassword();">保存</button></div> ';
	editPasswordStr+='</div>';                                                                                                           
 
    $("#sys_home").html(editPasswordStr);
	$("#pass_tip").hide();
	
}
//修改密码，提交
function post_editPassword(){
	var old_pass=$.md5($("#old_pass").val());
	var new_pass=$("#new_pass").val();
	var new_pass_2=$("#new_pass_2").val();//确认新密码
	var passReg=/^\S{6,20}$/;  //6-20位字符
	if(old_pass==''){
		swal({
			title: "",
			text: '请输入旧密码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	
	if(new_pass==''){
		swal({
			title: "",
			text: '请输入新密码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	if(!(passReg.test(new_pass))){
		//$("#pass_tip").show();
		//$("#pass_tip").html('密码由6-20位字符组成');
		swal({
			title: "",
			text: '密码由6-20位字符组成',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	if(new_pass_2==''){
		swal({
			title: "",
			text: '请再次输入新密码',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	if(new_pass!=new_pass_2){
		swal({
			title: "",
			text: '两次密码不相等',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
		return;
	}
	/*if(!(passReg.test(new_pass))){
		//$("#pass_tip").show();
		//$("#pass_tip").html('密码由6-20位字符组成');
		swal({
			title: "",
			text: '密码由6-20位字符组成',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		});
	}*/else{
		$("#pass_tip").hide();
		$.ajax({  
			type:'post',  
			url:''+ajaxUrl+'/Home/ucenter/upPassword',  
			data:{
				user_token:user_token,
				oldpassword:old_pass,
				newpassword:$.md5(new_pass),
				renewpassword:$.md5(new_pass_2)
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				//$("#sys_home").html('<div class="loading"></div>');
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
					
					if(code==501){
						//清空密码输入框
						$("#old_pass").val('');
					}
					return;
				}
				$("#sys_home").html('<div class="margin-t-b-15"><span class="padding-r-15">修改密码成功</span><botton type="botton" class="btn cg-btn-square" onClick="sys_info();">返回个人信息列表</botton></div>');
				
			}
	   });
	}
	
	
	
}  
//在这里手机号码是否存在的检测一律使用personal-common.js的存储的cookie，                                
//在此读取cookie 保证数据的正确性，此cookie值是在个人中心userinfo中读取的手机号码，并不是登录存下来的手机号码
var userMobile = $.cookie('userMobile');

//修改手机 构建结构
function editPhone(){
	//手机号码用中间用星号显示
	glo_mobile_2=glo_mobile.substring(0,3)+'*****'+glo_mobile.substring(8,11)
	var editPhoneStr='';
	//创建一个空层，用于装当第三方登录，还没有绑定手机时的结构写入
	editPhoneStr+='<div id="layer_bg">';
	editPhoneStr+='</div>';
	
	editPhoneStr+='<div class="sui-steps steps-auto">';
	editPhoneStr+='<div class="wrap">';
	editPhoneStr+='<div class="current" id="step_1">';
    editPhoneStr+='<label><span class="round">1</span><span>验证原手机号码</span></label>';                                      
    editPhoneStr+='<i class="triangle-right-bg"></i><i class="triangle-right"></i>';                                           
    editPhoneStr+='</div>';                                                                                 
    editPhoneStr+='</div>';                                             
    editPhoneStr+='<div class="wrap">';                                          
    editPhoneStr+='<div class="todo" id="step_2">';                                     
    editPhoneStr+='<label><span class="round">2</span><span>输入手机号码</span></label>';                                        
    editPhoneStr+='<i class="triangle-right-bg"></i><i class="triangle-right"></i>';                                           
    editPhoneStr+='</div>';                                                                                 
    editPhoneStr+='</div>';                                            
    editPhoneStr+='<div class="wrap">';  
	editPhoneStr+='<div class="todo" id="step_3">';    
	editPhoneStr+='<label><span class="round">3</span><span>完成</span></label>';                                 
    editPhoneStr+='</div>';                                                                                 
    editPhoneStr+='</div>';  
	editPhoneStr+='</div>'; 
	editPhoneStr+='<div id="doContent">'; 
	//步骤开始
	editPhoneStr+='<div class="password-next">'; 
	editPhoneStr+='<div class="form-inline">'; 
	editPhoneStr+='<div class="form-group">'; 
    editPhoneStr+='<label style="width:90px;" class="text-right">旧手机号码：</label>';   
	editPhoneStr+='<span id="phoneNum">'+glo_mobile_2+'</span>';                                        
    //editPhoneStr+='<input class="form-control" id="phoneNum" placeholder="" type="text">';    
	editPhoneStr+='</div>';                                        
    editPhoneStr+='</div>';                                            
    editPhoneStr+='<div class="form-inline">';                                          
    editPhoneStr+='<div class="form-group">';                                             
    editPhoneStr+='<label style="width:90px;" class="text-right">验证码：</label>';                                  
    editPhoneStr+='<label class="sr-only">验证码</label>';    
	editPhoneStr+='<input class="form-control" placeholder="" type="text" id="sys_ver_1" onblur="check_length($(this))" onClick="check_length($(this))"/>';    
	//editPhoneStr+='<button type="button" class="btn" style="margin-left:20px" onClick="sys_getVe();settime(this);">发送验证码</button>';   
	editPhoneStr+='<input type="button" class="btn cg-btn-danger3"  style="margin-left:20px" onClick="sys_getVe($(this));" id="post_phone_1" value="免费获取验证码">';
	editPhoneStr+='</div>';                                                               
    editPhoneStr+='</div>';                                          
    editPhoneStr+='<div class="per-nextstep-input">';                                            
    editPhoneStr+='<button type="button" class="btn cg-btn-danger3" onClick="sys_next_ve();">下一步</button>';
    editPhoneStr+='</div>';                                                               
    editPhoneStr+='</div>';                                             
	//步骤结束                                   
    editPhoneStr+='</div>';   
	
	$("#sys_home").html(editPhoneStr);   
	
	if(typeof(userMobile) == 'undefined' || userMobile==''){
		
		$("#sys_home").addClass("position-re");
		//遮罩层
		//var newPhoneStr='';
		//显示去绑定手机号链接
		var newPhoneStr2='';
		//newPhoneStr+='<div class="layer_bg">';
		//newPhoneStr+='</div>';
		//$("#sys_home").prepend(newPhoneStr);
		newPhoneStr2+='<div id="layer_text" style="border: 1px solid #ccc;z-index: 100;position: relative;background-color: rgb(255, 255, 255);text-align: center;width: 270px;left: 331px;margin-bottom: -30px;top: 103px;"><p class="nomargin" style="padding: 5px 0px;">您还没有绑定手机，点此去<a href="javascript:;" class="text-danger" data-toggle="modal" data-target="#myModal2">绑定手机号</a></p></div>';
		
		$("#layer_bg").addClass("layer_bg");
		$("#layer_text").html(newPhoneStr2);
		//调用添加地址中的绑定手机的弹出框去绑定手机，绑定成功后关闭弹出框，把号码填充进去
	}                     
} 
//验证旧手机通过后 的下一步 输入新手机的 结构
function sys_nextPhone(){
	$("#step_1").removeClass("current").addClass("todo");
	$("#step_2").removeClass("todo").addClass("current");
	//步骤开始
	var editPhoneNextStr='';
	editPhoneNextStr+='<div class="password-next">'; 
	editPhoneNextStr+='<div class="form-inline">'; 
	editPhoneNextStr+='<div class="form-group">'; 
    editPhoneNextStr+='<label style="width:90px;" class="text-right">新手机号码：</label>';    
	                                  
    editPhoneNextStr+='<input class="form-control" id="phoneNum" placeholder="" type="text">';    
	editPhoneNextStr+='</div>';                                        
    editPhoneNextStr+='</div>';                                            
    editPhoneNextStr+='<div class="form-inline">';                                          
    editPhoneNextStr+='<div class="form-group">';                                             
    editPhoneNextStr+='<label style="width:90px;" class="text-right">验证码：</label>';                                  
    editPhoneNextStr+='<label class="sr-only">验证码</label>';    
	editPhoneNextStr+='<input class="form-control" placeholder="" type="text" id="sys_ver_1" onblur="check_length($(this))" onClick="check_length($(this))"/>';    
	//editPhoneNextStr+='<button type="button" class="btn cg-btn-danger3" style="margin-left:20px" onClick="sys_getVe_new($(this));" id="post_phone_2">发送验证码</button>';

	editPhoneNextStr+='<input type="button" class="btn cg-btn-danger3"  style="margin-left:20px" onClick="sys_getVe_new($(this));" id="post_phone_2" value="发送验证码">';
	//editPhoneNextStr+='<input type="button" class="btn"  id="getPhoneVe"  style="margin-left:20px" onClick="sys_getVe_new();" value="免费获取验证码">';  
	editPhoneNextStr+='</div>';                                                               
    editPhoneNextStr+='</div>';                                          
    editPhoneNextStr+='<div class="per-nextstep-input">';                                            
    editPhoneNextStr+='<button type="button" class="btn cg-btn-danger3" onClick="sys_last_ve();">下一步</button>';
    editPhoneNextStr+='</div>';                                                               
    editPhoneNextStr+='</div>';                                             
	//步骤结束
	$("#doContent").html(editPhoneNextStr);
}                                         

//获取旧手机验证码	
function sys_getVe(obj){
	//var phoneNum=$("#phoneNum").val();
    $.ajax({
		type:'post',
		dataType:'json',
		url:''+ajaxUrl+'/Home/Verify/getVerify',  
			data:{
				user_token:user_token,
				//cellphone:phoneNum,
				cellphone:glo_mobile,
				type:3
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
				//$("#post_phone_1").attr("onclick","settime($(this));");
				settime(obj);
			} 
		});
}	
//获取新手机验证码	
function sys_getVe_new(obj){
	var phoneNum=$("#phoneNum").val();
    $.ajax({
		type:'post',
		dataType:'json',
		url:''+ajaxUrl+'/Home/Verify/getVerify',  
			data:{
				user_token:user_token,
				cellphone:phoneNum,
				//cellphone:glo_mobile,
				type:3,
				status:1
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
				//$("#post_phone_2").attr("onclick","settime($(this));");
				settime_2(obj);
			} 
		});
}	
//倒数120S后重新获取验证码，
//输入旧手机
var countdown=120; 
function settime(obj) { 
    if (countdown == 0) { 
        obj.removeAttr("disabled");
        obj.val("免费获取验证码");
        countdown= 120; 
        return;
    } else { 
        obj.attr("disabled", true);
        //obj.value="重新发送(" + countdown + ")";
		obj.val("重新发送(" + countdown + ")");
		countdown--;
    } 
setTimeout(function() { 
    settime(obj) }
    ,1000) 
}
//输入新手机
var countdown_2=120;
function settime_2(obj) { 
    if (countdown_2 == 0) { 
        obj.removeAttr("disabled");
		obj.val("免费获取验证码");
        countdown_2= 120; 
        return;
    } else { 
        obj.attr("disabled", true);
		obj.val("重新发送(" + countdown_2 + ")");

        countdown_2--; 
    } 
setTimeout(function() { 
    settime_2(obj) }
    ,1000) 
}
//输入旧号码后 点击下一步  验证验证码
function sys_next_ve(){
	//var phoneNum=$("#phoneNum").val();
	var verify=$("#sys_ver_1").val();
	var regVerifyNum_find=/^[0-9]{4,4}$/;  //手机验证码只能是4位数字
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
		url:''+ajaxUrl+'/Home/Verify/checkVerify',  
			data:{
				user_token:user_token,
				//cellphone:phoneNum,
				cellphone:glo_mobile,
				verify:verify,
				type:3
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
				sys_nextPhone();//下一步 输入新手机号  结构
			} 
		});
}                                          
//输入新号码后 点击下一步  验证验证码，成功后点击完成 返回个人基本信息列表
function sys_last_ve(){
	var phoneNum=$("#phoneNum").val();
	var verify=$("#sys_ver_1").val();
	var regExPhone_find=/^1[3|4|5|8][0-9]\d{4,8}$/;//手机号码
	var regVerifyNum_find=/^[0-9]{4,4}$/;  //手机验证码只能是4位数字
	if(!(regExPhone_find.test(phoneNum))){
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
		url:''+ajaxUrl+'/Home/Verify/checkVerify',  
			data:{
				user_token:user_token,
				cellphone:phoneNum,
				//cellphone:glo_mobile,
				verify:verify,
				state:1,
				type:3
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
				
				$("#step_2").removeClass("current").addClass("todo");
	            $("#step_3").removeClass("todo").addClass("current");
				
				var lastStr='';
				  lastStr+='<div class="password-next text-center" style="margin:50px">';
				  lastStr+='<span class="text-danger">恭喜您手机修改成功！</span>';
				  lastStr+='<div class="per-nextstep-input">';                         
				  lastStr+='<button type="button" class="btn margin-t-20" onClick="sys_info();">完成</button>';                lastStr+='</div>';            
				  lastStr+='</div>';                             
			   $("#doContent").html(lastStr);				   
								   
				
				//sys_info();//更换完新手机后  跳回到用户基本信息列表
			} 
		});
}                                       
                                        
//验证码及手机验证码框输入指定长度字符 -----4位字符
function check_length(obj){
	
    	var curLength=obj.val().length; 
		//alert(curLength);
		if(curLength>4){ 
		  var num=obj.val().substr(0,4); 
		   obj.val(num); 
		   //alert(obj.val()); 
		} 
		else{ 
	    	obj.text(4-obj.val().length); 
		}
}
//密码输入框不能超过20位
function checkPass_length(obj){
    	var curLength=obj.val().length; 
		if(curLength>20){ 
		  var num=obj.val().substr(0,20); 
		   obj.val(num); 
		   //alert(obj.val()); 
		} 
		else{ 
	    	obj.text(20-obj.val().length); 
		}
}
/*********绑定第三方 start*************/
function bind_third(){
	//检查是否已经绑定第三方
	$.ajax({
		type: 'post',
		dataType: 'json',
		url: '' + ajaxUrl + '/Home/User/bind_list',
		data: {
			user_token: user_token,

		},
		cache: false,
		success: function (data) {
			var code = data['code'];
			var info = data['info'];
			//1：已绑定；2：未绑定
			var qq_openid=data['bind_list']['qq_openid'];//QQ
			var wb_openid=data['bind_list']['wb_openid'];//微博
			var unionid=data['bind_list']['unionid']; //微信

			var bindStr='';
			bindStr+='<div>';
			bindStr+='<ul class="bind_ul">';
			bindStr+='<li class="clearfix">';
			bindStr+='<div class="pull-left bind_1">绑定微信：免输密码快捷扫码登录和使用微信移动端</div>';
			if(unionid==1)
			{
				bindStr+='<div class="pull-left bind_2"><span class="text-danger">已绑定</span></div>';
				//bindStr+='<div class="pull-left bind_3">524555</div>';
				bindStr+='<div class="pull-left bind_4">';
				bindStr+='<a href="javascript:;"><button type="button" class="btn cg-btn-danger cg-btn-fixed-round weixin" onclick="unbind(3,$(this))">解绑</button></a>';
				bindStr+='</div>';
			}
			else
			{
				bindStr+='<div class="pull-left bind_2"><span class="text-danger">未绑定</span></div>';
				//bindStr+='<div class="pull-left bind_3">524555</div>';
				bindStr+='<div class="pull-left bind_4">';
				bindStr+='<a href="javascript:;"><button type="button" class="btn cg-btn-danger cg-btn-fixed-round weixin" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">去绑定</button></a>';
				bindStr+='</div>';
			}


			bindStr+='<div class="clearfix"></div>';
			bindStr+='<div class="collapse bind_collapse" id="collapseExample">';
			bindStr+='<div>';
			bindStr+='<img src="images/code-cg.jpg"/>';
			bindStr+='<p>微信扫码绑定手机帐号</p>';
			bindStr+='<div>';
			bindStr+='<div>';
			bindStr+='</li>';
			bindStr+='<li class="clearfix">';
			bindStr+='<div class="pull-left bind_1">绑定QQ：免输密码快捷登录</div>';
			if(qq_openid==1)
			{
				bindStr+='<div class="pull-left bind_2"><span class="text-danger">已绑定</span></div>';
				//bindStr+='<div class="pull-left bind_3">524555</div>';
				bindStr+='<div class="pull-left bind_4"><a href="javascript:;"><button type="button" class="btn cg-btn-danger cg-btn-fixed-round qq" onclick="unbind(1,$(this))">解绑</button></a></div>';
			}
			else
			{
				bindStr+='<div class="pull-left bind_2"><span class="text-danger">未绑定</span></div>';
				//bindStr+='<div class="pull-left bind_3">524555</div>';
				bindStr+='<div class="pull-left bind_4"><a href="http://www.cgyyg.com/cgyyg1.0/index.php/Home/user/login?type=1" target="_blank"><button type="button" class="btn cg-btn-danger cg-btn-fixed-round qq">去绑定</button></a></div>';
			}

			bindStr+='</li>';
			bindStr+='<li class="clearfix" style="border-bottom: none">';
			bindStr+='<div class="pull-left bind_1">绑定微博：免输密码快捷登录</div>';
			if(wb_openid==1)
			{
				bindStr+='<div class="pull-left bind_2"><span class="text-danger">已绑定</span></div>';
				//bindStr+='<div class="pull-left bind_3">524555</div>';
				bindStr+='<adiv class="pull-left bind_4"><a href="javascript:;"><button type="button" class="btn cg-btn-danger cg-btn-fixed-round weibo" onclick="unbind(2,$(this))">解绑</button></a><div>';
			}
			else
			{
				bindStr+='<div class="pull-left bind_2"><span class="text-danger">未绑定</span></div>';
				//bindStr+='<div class="pull-left bind_3">524555</div>';
				bindStr+='<div class="pull-left bind_4"><a href="http://www.cgyyg.com/cgyyg1.0/index.php/Home/user/login?type=2" target="_blank"><button type="button" class="btn cg-btn-danger cg-btn-fixed-round weibo">去绑定</button></a></div>';
			}


			bindStr+='</li>';
			bindStr+='</ul>';
			bindStr+='</div>';

			$("#sys_home").html(bindStr);

		}
	});



}
//解绑
function unbind(unbind_type,obj){
	swal({
		title: "",
		text: '您确定解绑吗？',
		html: true,
		type: "warning",
		showCancelButton: true,
		confirmButtonText:"确定",
		cancelButtonText: "取消",
		confirmButtonColor: "#ff4800",
		cancelButtonColor: "#ccc",
	},function(){
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: '' + ajaxUrl + '/Home/User/unbind',
			data: {
				user_token: user_token,
				type:unbind_type

			},
			cache: false,
			success: function (data) {
				var code = data['code'];
				var info = data['info'];
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

				obj.text('去绑定');
				obj.removeAttr("onclick");
				obj.parent().parent().prev().find('span').html('未绑定');
				if(obj.hasClass("weixin")){
					obj.attr({
						"data-toggle":"collapse",
						"href":"#collapseExample",
						"aria-expanded":false,
						"aria-controls":"collapseExample",
					})
				}
				if(obj.hasClass("qq")){
					obj.parent().attr({
						"href":"http://www.cgyyg.com/cgyyg1.0/index.php/Home/user/login?type=1",
						"target":"_blank"
					});
				}
				if(obj.hasClass("weibo")){
					obj.parent().attr({
						"href":"http://www.cgyyg.com/cgyyg1.0/index.php/Home/user/login?type=2",
						"target":"_blank"
					});
				}
			}
		});
	});

}

/*********绑定第三方 end*************/
                                          
                                 
                                  
                                      
                                