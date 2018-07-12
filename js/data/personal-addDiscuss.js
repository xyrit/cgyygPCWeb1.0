//个人中心----添加晒单
//需要在“去晒单”这个按钮传ID过来
var gloNew_id;
var pic;
function addMyDiss(id){
	//获取从未晒单传过来的参数
	var new_id=id;
	gloNew_id=new_id;
	//构建右边内容结构
	var addDissStr='';
	addDissStr+='<div class="row">';
	addDissStr+='<div class="per-goods-box nomargin">';
	addDissStr+='<ul class="nav nav-tabs">';
    addDissStr+='<li class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">我要晒单</a></li>';    addDissStr+='</ul>';            
    addDissStr+='<div class="sun-details">';   
	              
    addDissStr+='<div class="form-inline">';                    
    addDissStr+='<div class="form-group">';                    
    addDissStr+='<label class="margin-r-5">标题</label>';   
	addDissStr+='<input class="form-control" placeholder="不少于5个字" type="text" id="addTitle">';                  
    addDissStr+='</div>';                                
    addDissStr+='</div>';    
	                              
    addDissStr+='<div class="form-inline margin-t-20">';      
	addDissStr+='<div class="form-group">';   
	addDissStr+='<label class="margin-r-5">内容</label>';                                  
    addDissStr+='<textarea class="form-control" rows="7" style="width:500px" id="addContent"></textarea>';       
	addDissStr+='</div>';                                
    addDissStr+='</div>';  
	
	addDissStr+='<div class="form-inline" id="picList">'; 
	//显示上次上传图片成功但是未晒单成功的图片列表
	 
	 
	addDissStr+='<div class="sun_picture clearfix">';                           
    addDissStr+='<div class="per-red-sub margin-t-b-15">';                          
    addDissStr+='<label>晒单图片：</label>';                                   
    addDissStr+='最多可以上传5张照片，必须是真是的商品照片哦，单张照片大小请勿超过1M  <br>';                                     
    addDissStr+='<p>温馨提示：<span class="text-gray2">如果您使用的是IE浏览器上传图片，可能会弹出“在此页上的ActiveX控件和本页上的其他部分的交互可能不安全。您想允许这种交互吗？”，请你点击“是”就可以继续上传图片了，建议您使用高版本的IE或者其他现代浏览器。</span></p>';    addDissStr+=' </div>';                                   
    addDissStr+='</div>';   
	                                  
    addDissStr+='<hr>';                                      
    /*addDissStr+='<div>';                                     
    addDissStr+='<input id="Button1" type="button" value="选择文件" class="btn cg-btn-square"/>';  
    addDissStr+='<input id="" type="button" value="上传" class="btn cg-btn-square margin-l-10"/>';   
    addDissStr+='<div id="fileList" class="margin-t-20">';                                
    addDissStr+='</div>';                                           
    addDissStr+='</div>'; */
	
	addDissStr+='<div id="container">';
	addDissStr+='<a id="selectfiles" href="javascript:void(0);" class="btn cg-btn-square">选择文件</a>';
	addDissStr+='<a id="postfiles" href="javascript:void(0);" class="btn cg-btn-square margin-l-10">开始上传</a>';
	
	addDissStr+='</div>';
	
	                                    
    addDissStr+='<div class="clearfix"></div>';                                            
    addDissStr+='<hr>';   
	
	addDissStr+='<div id="ossfile_s" class="clearfix">你的浏览器不支持flash,Silverlight或者HTML5！</div>';
	//addDissStr+='<pre id="console"></pre>';
	

	
	                                            
    //addDissStr+='<div id="file_size"></div>';                        
    addDissStr+='</div>';                                       
    addDissStr+='<div class="per-red-sub">';                                                                    
    addDissStr+='<button type="button" class="btn margin-t-20 cg-btn-danger3" id="files" onClick="sendContent();">确认晒单</button>';
    addDissStr+='</div>';                                   
    addDissStr+='</div>';                                
    addDissStr+='</div>';                                                             
    addDissStr+='</div>';                                
    addDissStr+='</div>';                         
                  
    $("#rightContent").html(addDissStr);    
	//获取上次晒过但是未成功提交的晒单内容，（主要是图片）
	
	$.ajax({
		url:''+ajaxUrl+'/Home/Display/orderUp',
		type:'post',
		dataType:'json',
		data:{
			dpid:id
		},
		cache:false,
		success:function(data){
			var code=data['code'];
			var pic_host=data['pic_host'];
			var order_info=data['order_info'];
			var title=order_info['title'];
			var description=order_info['description'];
			var path=order_info['path'];
			glo_path_length=path.length;
			var picList='';
			picList+='<div class="clearfix">';
			for(i=0;i<path.length;i++){
				var path_img=order_info['path'][i];
				picList+='<div class="imgBox3 pull-left position-re">';
				picList+='<img src="'+pic_host+path_img+'"/>';
				picList+='<a href="javascript:;" class="margin-r-5 position-ab delete_btn_3" style="right:-5px;top:0px" onClick="deletePic($(this),'+id+',\''+path_img+'\');"><span class="glyphicon glyphicon-trash"></span></a>';
				picList+='</div>';
			}
			
			picList+='</div>';
			
			$("#addTitle").val(title);
			$("#addContent").html(description);
			
			if(glo_path_length>0){
				$("#picList").prepend(picList);
				if(glo_path_length>=5){
					$("#container").hide();
					$("#container").before().hide();
					}else{
						$("#container").show();
						$("#container").before().show();
						}
				
			}
			$(".imgBox3").hover(function(){
			  $(this).addClass("hover_deleteBtn");
			  },function(){
				  $(this).removeClass("hover_deleteBtn");
				  
			})
			
		}
	});
	  
	  //多图片文件上传开始
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
			  phpUrl = upPicUrl+'/index.php/Home/Upload/get_file?id='+new_id+'&type=2';
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
				  //'key' : key + '${filename}',
				  'key' : key + Math.uuid()+'.jpg',
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
		  //}
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
                prevent_duplicates : true //不允许选取重复文件
			  },
		  init: {
			  PostInit: function() {
				  document.getElementById('ossfile_s').innerHTML = '';
				  document.getElementById('postfiles').onclick = function() {
			      //666666666666666666666666666666666666666666666666666666sendContent();		  
				  set_upload_param(uploader);
				  uploader.start();
				  return false;
				  };
			  },
	  
			  FilesAdded: function(up, files) {
				 
				  
				  /*plupload.each(files, function(file) {
					  document.getElementById('ossfile').innerHTML += '<div class="imgBox">'
					  +'<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
					  +'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
					  +'</div>';
					  +'</div>';
					  
				  });*/
				  for(var i = 0, len = files.length; i<len; i++){
						var file_name = files[i].name; //文件名
						//构造html来更新UI,构造图片列表
						/*if(uploader.files.length>5){ // 最多上传5张图
							//uploader.splice(5,999);
							swal({
								title: "",
								text: '最多上传5张图',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							});
							return;
						}*/
						if(glo_path_length<=5){
							var file_length=5-glo_path_length;//判断返回的图片列表的个数
							}else{
								file_length=5;
								}
						
						if(uploader.files.length>file_length){ // 最多上传5张图
							//uploader.splice(5,999);
							swal({
								title: "",
								text: '最多上传5张图',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							});
							return;
						}
						// var html = '<li id="file-' + files[i].id +'"><p class="file-name">' + file_name + '</p><p class="progress"></p></li>';
						// $(html).appendTo('#file-list');
						document.getElementById('ossfile_s').innerHTML += '<div id="imgBox'+files[i].id+'" class="imgBox pull-left position-re" style="">'
						+'<div id="' + files[i].id + '"><p class="nomargin imgSize">' + files[i].name + ' (' + plupload.formatSize(files[i].size) + ')</p><b></b>'
						+'<div class="progress upImages_progress cg-progress"><div class="progress-bar progress-bar-warning" style="width: 0%"></div></div>'
						+'</div>'
						+'<a href="javascript:;" class="margin-r-5 position-ab delete_btn_2" style="right:-5px;top:0px">'
						+'<span class="glyphicon glyphicon-trash"></span>';
						+'</a>'
						+'</div>';
						
					  
						!function(i){
							previewImage(files[i],function(imgsrc){
								$('#imgBox'+files[i].id+'').append('<img src="'+ imgsrc +'" />');
								//$('#file-'+files[i].id).append('<img src="'+ imgsrc +'" />');
								//document.getElementById('ossfile').innerHTML+='<img src="'+ imgsrc +'" />'
								
							})
						}(i);
					}
				  
			  },
			  
			  UploadProgress: function(up, file) {
				  var d = document.getElementById(file.id);
				  d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
				  
				  var prog = d.getElementsByTagName('div')[0];
				  var progBar = prog.getElementsByTagName('div')[0]
				 // progBar.style.width= 2*file.percent+'px';
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
				  }
				  else
				  {
					  document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
				  } 
			  },
	  
			  Error: function(up, err) {
				  set_upload_param(up);
				  //document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
			  }
		  }
	  });
	  
	  uploader.init();
	  
	  
	  $(document).on('click', 'a.delete_btn_2', function () {
                $(this).parent().remove();
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
				  //glo_path_length=glo_path_length-1;
				  });  
			  
		  }
		  //多图片文件上传结束 
	  
	
}
//晒单未通过后，再次晒单
var glo_path_length;
function addMyDiss_re(id){
	//获取从未晒单传过来的参数
	var new_id=id;
	gloNew_id=new_id;
	//构建右边内容结构
	var addDissStr='';
	addDissStr+='<div class="row">';
	addDissStr+='<div class="per-goods-box nomargin">';
	addDissStr+='<ul class="nav nav-tabs">';
    addDissStr+='<li class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">我要晒单</a></li>';    
	addDissStr+='</ul>';            
    addDissStr+='<div class="sun-details">';   
	              
    addDissStr+='<div class="form-inline">';                    
    addDissStr+='<div class="form-group">';                    
    addDissStr+='<label class="margin-r-5">标题</label>';   
	addDissStr+='<input class="form-control" placeholder="不少于5个字" type="text" id="addTitle">';                  
    addDissStr+='</div>';                                
    addDissStr+='</div>';    
	                              
    addDissStr+='<div class="form-inline margin-t-20">';      
	addDissStr+='<div class="form-group">';   
	addDissStr+='<label class="margin-r-5">内容</label>';                                  
    addDissStr+='<textarea class="form-control" rows="7" style="width:500px" id="addContent"></textarea>';       
	addDissStr+='</div>';                                
    addDissStr+='</div>';  
	
	addDissStr+='<div class="form-inline" id="picList">';  
	//把获取到的上次未通过审核的图片列表
	
	 
	addDissStr+='<div class="sun_picture clearfix">';                           
    addDissStr+='<div class="per-red-sub margin-t-b-15">';                          
    addDissStr+='<label>晒单图片：</label>';                                   
    addDissStr+='最多可以上传5张照片，必须是真是的商品照片哦，单张照片大小请勿超过1M  <br>';                                     
    addDissStr+='<p>温馨提示：<span class="text-gray2">如果您使用的是IE浏览器上传图片，可能会弹出“在此页上的ActiveX控件和本页上的其他部分的交互可能不安全。您想允许这种交互吗？”，请你点击“是”就可以继续上传图片了，建议您使用高版本的IE或者其他现代浏览器。</span></p>';    addDissStr+=' </div>';                                   
    addDissStr+='</div>';   
	                                  
    addDissStr+='<hr>';                                      
   
	
	addDissStr+='<div id="container">';
	addDissStr+='<a id="selectfiles" href="javascript:void(0);" class="btn cg-btn-square">选择文件</a>';
	addDissStr+='<a id="postfiles" href="javascript:void(0);" class="btn cg-btn-square margin-l-10">开始上传</a>';
	
	addDissStr+='</div>';
	
	                                    
    addDissStr+='<div class="clearfix"></div>';                                            
    addDissStr+='<hr>';   
	
	addDissStr+='<div id="ossfile_s" class="clearfix">你的浏览器不支持flash,Silverlight或者HTML5！</div>';
	//addDissStr+='<pre id="console"></pre>';
	
	                                            
    //addDissStr+='<div id="file_size"></div>';                        
    addDissStr+='</div>';                                       
    addDissStr+='<div class="per-red-sub">';                                                                    
    addDissStr+='<button type="button" class="btn margin-t-20 cg-btn-danger3" id="files" onClick="sendContent();">确认晒单</button>';
    addDissStr+='</div>';                                   
    addDissStr+='</div>';                                
    addDissStr+='</div>';                                                             
    addDissStr+='</div>';                                
    addDissStr+='</div>';                         
                  
    $("#rightContent").html(addDissStr);    
	
	//获取上次晒过但是未通过的内容
	
	$.ajax({
		url:''+ajaxUrl+'/Home/Display/orderUp',
		type:'post',
		dataType:'json',
		data:{
			dpid:id
		},
		cache:false,
		success:function(data){
			var code=data['code'];
			var pic_host=data['pic_host'];
			var order_info=data['order_info'];
			var title=order_info['title'];
			var description=order_info['description'];
			var path=order_info['path'];
			glo_path_length=path.length;
			var picList='';
			picList+='<div class="clearfix">';
			for(i=0;i<path.length;i++){
				var path_img=order_info['path'][i];
				picList+='<div class="imgBox3 pull-left position-re">';
				picList+='<img src="'+pic_host+path_img+'"/>';
				picList+='<a href="javascript:;" class="margin-r-5 position-ab delete_btn_3" style="right:-5px;top:0px" onClick="deletePic($(this),'+id+',\''+path_img+'\');"><span class="glyphicon glyphicon-trash"></span></a>';
				picList+='</div>';
			}
			
			picList+='</div>';
			
			$("#addTitle").val(title);
			$("#addContent").html(description);
			
			if(glo_path_length>0){
				$("#picList").prepend(picList);
				if(glo_path_length>=5){
					$("#container").hide();
					$("#container").before().hide();
					}else{
						$("#container").show();
						$("#container").before().show();
						}
				//$("#container").show();
				//$("#container").hide();
			}/*else if(glo_path_length>=5){
					$("#container").hide();
					}else{
					  $("#container").show();
					}*/
				
			$(".imgBox3").hover(function(){
			  $(this).addClass("hover_deleteBtn");
			  },function(){
				  $(this).removeClass("hover_deleteBtn");
				  
			})
			
		}
	});
	
	  
	  //多图片文件上传开始
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
			  phpUrl = upPicUrl+'/index.php/Home/Upload/get_file?id='+new_id+'&type=2';
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
				  //'key' : key + '${filename}',
				  'key' : key + Math.uuid()+'.jpg',
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
		  //}
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
				
			  },
		  init: {
			  PostInit: function() {
				  document.getElementById('ossfile_s').innerHTML = '';
				  document.getElementById('postfiles').onclick = function() {
				  //sendContent();	  
				  set_upload_param(uploader);
				  uploader.start();
				  
				  return false;
				  };
			  },
	  
			  FilesAdded: function(up, files) {
				 
				  
				  /*plupload.each(files, function(file) {
					  document.getElementById('ossfile').innerHTML += '<div class="imgBox">'
					  +'<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
					  +'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
					  +'</div>';
					  +'</div>';
					  
				  });*/
				  
				  for(var i = 0, len = files.length; i<len; i++){
				   
						var file_name = files[i].name; //文件名
						//构造html来更新UI,构造图片列表
						//alert(glo_path_length);
						if(glo_path_length<=5){
							var file_length=5-glo_path_length;//判断返回的图片列表的个数
							}else{
								file_length=5;
								}
						
						if(uploader.files.length>file_length){ // 最多上传5张图
							//uploader.splice(5,999);
							swal({
								title: "",
								text: '最多上传5张图',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							});
							return;
						}
						// var html = '<li id="file-' + files[i].id +'"><p class="file-name">' + file_name + '</p><p class="progress"></p></li>';
						// $(html).appendTo('#file-list');
						document.getElementById('ossfile_s').innerHTML += '<div id="imgBox'+files[i].id+'" class="imgBox pull-left position-re" style="">'
						+'<div id="' + files[i].id + '"><p class="nomargin imgSize">' + files[i].name + ' (' + plupload.formatSize(files[i].size) + ')</p><b></b>'
						+'<div class="progress upImages_progress cg-progress"><div class="progress-bar progress-bar-warning" style="width: 0%"></div></div>'
						+'</div>'
						+'<a href="javascript:;" class="margin-r-5 position-ab delete_btn_2" style="right:-5px;top:0px">'
						+'<span class="glyphicon glyphicon-trash"></span>';
						+'</a>'
						+'</div>';
						
					  
						!function(i){
							previewImage(files[i],function(imgsrc){
								$('#imgBox'+files[i].id+'').append('<img src="'+ imgsrc +'" />');
								//$('#file-'+files[i].id).append('<img src="'+ imgsrc +'" />');
								//document.getElementById('ossfile').innerHTML+='<img src="'+ imgsrc +'" />'
								
							})
						}(i);
					}
				  
			  },
			  
			  UploadProgress: function(up, file) {
				  var d = document.getElementById(file.id);
				  d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
				  
				  var prog = d.getElementsByTagName('div')[0];
				  var progBar = prog.getElementsByTagName('div')[0]
				 // progBar.style.width= 2*file.percent+'px';
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
				  }
				  else
				  {
					  document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
				  } 
			  },
	  
			  Error: function(up, err) {
				  set_upload_param(up);
				  //document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
			  }
		  }
	  });
	  
	  uploader.init();
	  
	  
	  $(document).on('click', 'a.delete_btn_2', function () {
                $(this).parent().remove();
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
				  glo_path_length=glo_path_length-1;
				  });  
			  
		  }
		  //多图片文件上传结束 
	  
	
}
//删除原来接口的图片
function deletePic(obj,id,path_img){
	$.ajax({  
	     
		  type:'post',  
		  url:''+ajaxUrl+'/Home/Display/pictureDel',  
		  data:{
			  user_token:user_token,
			  dpid:id,
			  pic:path_img
			  },  
		  cache:false,  
		  dataType:'json',  
		  beforeSend:function(){
			 //$("#btn-submit").text("正在提交");
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
			 obj.parent().remove();
			 
			 glo_path_length=glo_path_length-1;
			
			$("#container").show();
			$("#container").before().show();
			 
			 //alert(glo_path_length);
		  }
	});
}

function sendContent(){
	var addTitle=$("#addTitle").val();
	var addContent=$("#addContent").val();
	//在此连接服务器，发送数据给服务器
	if(addTitle==''){
		swal({
			title: "",
			text: '请输入晒单标题',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		}); 
		return; 
	}
	if(addContent==''){
		swal({
			title: "",
			text: '请输入晒单内容',
			html: true,
			type: "error",
			confirmButtonText:"确定",
			confirmButtonColor: "#ff4800",
		}); 
		return; 
	}
	$.ajax({  
	     
		  type:'post',  
		  url:''+ajaxUrl+'/Home/Display/orderAdd',  
		  data:{
			  user_token:user_token,
			  id:gloNew_id,
			  title:addTitle,
			  description:addContent, 
			  //pictures:pic
			  photo:'photo'
			  },  
		  cache:false,  
		  dataType:'json',  
		  beforeSend:function(){
			 // $("#rightContent").html('<div class="loading"></div>');
			 // $(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); 
			 $("#btn-submit").text("正在提交");
		  },
		  success:function(data){ 
		     var info=data['info'];
			 var code=data['code'];
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
			//刷新已晒单列表
			
			  //刷新已晒单列表结束
			  getDisRecored_1();
		  }
	});
}
	
