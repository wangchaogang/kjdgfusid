window.addEventListener("load",function(){
	
	var ip="localhost:1998"; //ip地址
	var aip="47.92.145.129:8000"; //ip地址

//	var browser={
//	    versions:function(){
//	        var u = navigator.userAgent, app = navigator.appVersion;
//	        return {
//	            trident: u.indexOf('Trident') > -1, //IE内核
//	            presto: u.indexOf('Presto') > -1, //opera内核
//	            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
//	            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
//	            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
//	            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
//	            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
//	            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
//	            iPad: u.indexOf('iPad') > -1, //是否iPad
//	            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
//	            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
//	            qq: u.match(/\sQQ/i) == " qq" //是否QQ
//	        };
//	    }(),
//	    language:(navigator.browserLanguage || navigator.language).toLowerCase()
//	}
	//判断是否IE内核
//	if(browser.versions.trident){ 
//		alert("is IE"); 
//	}
//	//判断是否webKit内核
//	if(browser.versions.webKit){ alert("is webKit"); }
//	//判断是否移动端
//	if(browser.versions.mobile||browser.versions.android||browser.versions.ios){ alert("移动端"); }

//点击协议
	/*var off=false;
	$("#yu_lab").click(function(){
		if(off){
			$("#yu-submit").attr("disabled",true);
			off=false;
		}else{
			$("#yu-submit").removeAttr("disabled");
			off=true;
		}
	})
	var offo=false;
	$("#Job").click(function(){
		if(offo){
			$("#yu-submit").attr("disabled",true);
			offo=false;
		}else{
			$("#yu-submit").removeAttr("disabled");
			offo=true;
		}
	})*/
	//弹框函数
//	function click_sure(){
//		$(".yuhan_ok").click(function(){
//			$(".yu_pop-up").css("display","none");
//		})
//		$(".yu_login_remove").click(function(){
//			$(".yu_pop-up").css("display","none");
//		})
//	}
//点击审核
	if(!sessionStorage.userId){
		layer.msg('请先登录',{time:2000});
	}else{
		$("#yu-submit").click(function(){
			var tpfileVal=$("#headfile").val(); //上传头像
			var qnameVal=$("#yu_qyname").val(); //企业名称
			var qiyenickNameRex = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/; //企业名称验证
			var qadsVal=$("#yu_ads").val(); //企业地址
			var qiyeuserNameRex = /[\u4e00-\u9fa5]/; //企业地址验证
			var qpeonameVal=$("#yu_qypeoname").val(); //企业负责人
			var qtelVal=$("#yu_qitel").val(); //企业联系电话
			var qtelRex=/^1[34578]\d{9}$/;  //手机号验证
			var qpicVal=$("#fileid").val(); //企业营业执照
		
    		if(tpfileVal==""){
				layer.msg('请上传头像',{time:2000});
			}
			else if(qnameVal==""){
				layer.msg('请填写企业名称',{time:2000});
			}
			else if(!(qnameVal.match(qiyenickNameRex))){
				layer.msg('企业名称输入格式错误',{time:2000});
		    }
			else if(qadsVal==""){
				layer.msg('请填写企业地址',{time:2000});
			}
			else if(!(qadsVal.match(qiyeuserNameRex))){
				layer.msg('企业地址输入格式错误',{time:2000});
		    }
			else if(qpeonameVal==""){
				layer.msg('请填写企业负责人',{time:2000});
			}
			else if(!(qpeonameVal.match(qiyeuserNameRex))){
				layer.msg('企业负责人输入格式错误',{time:2000});
		    }
			else if(qtelVal==""){
				layer.msg('请填写负责人联系方式',{time:2000});
			}
			else if(!(qtelVal.match(qtelRex))){
				layer.msg('手机号格式不对',{time:2000});
		    }
			else if(qpicVal==""){
				layer.msg('请上传企业营业执照',{time:2000});
			}
			else if(!($("#Job").is(':checked'))){
				layer.msg('请同意“我保证作原创性，上传的图片没有法律纠纷”并勾选',{time:2000});
			}
			else{
				if(!sessionStorage.userId){
					layer.msg('请先登录',{time:2000});
				}else{
					$.ajax({
						type:"post",
						url:"http://"+aip+"/qenter/enterprise",
						async:true,
						data:{
							CorporateHead: dataURLa,//企业头像
							CompanyName:qnameVal,   //：企业名称
							CompanyAddress:qadsVal,  //：地址
							CompanyLeader: qpeonameVal , //：企业负责人
							CompanyInformation:qtelVal,   //：联系方式
							CompanyKey: "", //：企业密钥
							CompanyWork:imgSrczheng,   //：企业营业执行照
							CompanyAudit:0,   //：企业审核
							nameuid:sessionStorage.userId  //登录人uid
						},
						success:function(data){
							console.log(data)
							console.log("审核通过")
							if(data.flag=="企业已注册"){
								layer.msg('企业已经注册过',{time:2000});
	//							location.reload()
							}
							else if(data.flag=="团队已注册"){
								layer.msg('团队已经注册过',{time:2000});
	//							location.reload()
							}
							else if(data.flag==1){
								console.log("可以注册")
	//							过去随机数（字母数字+时间戳+uid）
							    var timestamp = Date.parse(new Date()); //获取当前时间戳
								var dom=Math.random().toString(36).substr(2);
								var rand=timestamp+dom;
								$("#yu_Popup_window").css("display","block");
								$("#yu_Popup_window_keys").html(rand+sessionStorage.userId);
								$("#yu_Popup_window_btn").click(function(){
								//修改审核状态和密钥
									$.ajax({
										type:"post",
										url: "http://"+aip+"/qenter/qdetailPass",
										async:true,
										data:{
											qiyKey: rand+sessionStorage.userId, //：团队密钥（时间戳+uid)
											qiyAudit:"1", //：审核状态
											quid:sessionStorage.userId 
										},
										success:function(data){
											console.log(data)
											$("#yu_Popup_window").css("display","none");
											location.reload()
											location.href="../index.html";
											
	//										$("#headfile,#yu_qyname,#yu_ads,#yu_qypeoname,#yu_qitel,#fileid").val('');
										}
									})	
								})
							}
						}
					});
					//判断团队、企业注册
					$.ajax({
						type:"post",
						url:'http://'+ip+'/users/tusndui',
						async:true,
						data:{
							uid:sessionStorage.userId,
							yuandid:'2'
						},
						success:function(e){
							console.log(e)
						}
					})
				}	
				
				
				
				
				
				
				
				
				
			}
    	})
	}
		
		
//测试接口


		/*//查询企业密钥
		$.ajax({
			type:"get",
			url:"http://"+ip+"/qenter/qsearchkey",
			async:true,
			data:{
				CompanyKeysq:'11111'  //登录人uid
			},
			success:function(data){
				console.log(data)
//						console.log(data.result[0].tuid)
			}
		});*/
		//查询企业名称
		/*$.ajax({
			type:"get",
			url:"http://"+ip+"/qenter/searchkeys",
			async:true,
			data:{
				companykeyss:'11'  //登录人uid
			},
			success:function(data){
				console.log(data)
//						console.log(data.result[0].tuid)
			}
		});*/
		
		
		//查询企业名称
		/*$.ajax({
					type:"get",
					url:"http://"+ip+"/qenter/searchq",
					async:true,
					data:{
						CompanyName:"我是小钰",   //：团队名称
					},
					success:function(data){
						console.log(data)
//						console.log(data.result[0].tuid)
					}
				});*/
		//审核状态
		/*$.ajax({
			type:"get",
			url:"http://"+ip+"/qenter/auditstausq",
			async:true,
			data:{
				CompanyAudit:"3",   //：团队审核
			},
			success:function(data){
				console.log(data)
			}
		});*/
		//删除信息
		/*$.ajax({
			type:"get",
			url:"http://"+ip+"/qenter/deleteq",
			async:true,
			data:{
				Companyid:"2",   //：企业id
			},
			success:function(data){
				console.log(data)
			}
		});*/
		
	


//上传头像

	//点击加载出来
	$("#headfile").click(function(){
		$(".qloading_imgheader").css("display","block");
		setTimeout(function(){
			$(".qloading_imgheader").css("display","none");
		},10000)
	})
	var dataURL;
//	var aa;
	$("#clipArea").photoClip({
		width: 200,
		height: 200,
		file: "#headfile",
		view: "#view",
		ok: "#clipBtn",
		loadStart: function() {
			console.log("照片读取中");
		},
		loadComplete: function() {
			console.log("照片读取完成");
		},
		clipFinish: function(dataURL) {
//			console.log(dataURL);
			console.log(dataURL.length);
			if(dataURL.length>75000){
				layer.msg('图片过大，不可提交，请重新选择',{time:2000});
			}else{
				dataURLa = $.base64.btoa(dataURL)
			}
		}
	});
	$('#clipBtn').click(function() {
		tops.style.top = '-100%'
	})
	$('#headfile').change(function(evt) {
		if(this.files[0].size>153600){
			layer.msg('图片大小不得超过100kb',{time:5000});
//			$(".qloading_imgheader").css("display","none");
		}else{
//			$(".qloading_imgheader").css("display","none");
			
			var finput = $(this);   
	        var files = evt.target.files; // 获得文件对象  
	        var output = [];
			for (var i = 0, f; f = files[i]; i++){  
	        	var formdata = new FormData();
	        	var my_pic = this.files[0];
				formdata.append("uploadeFile",this.files[0]);
	        	$.ajax({
					url: "http://47.92.145.129:8000/yanzhengs/huang",
					type: "post",
					data: formdata,
					contentType: false,
					processData: false,
					success: function(data) {
						console.log(data)
						if(data.nem == '正常') {
							tops.style.top = 0;
							aa = 1;
						}else if(data.nem == '性感'){
							tops.style.top = 0;
							aa = 2;
						}else if(data.nem == '色情'){
							aa = 3;
							layer.msg('该图片涉及违法',{time:2000});
						}else{
							layer.msg('图片出错了',{time:2000});
						}
					}
				})
	        }
		}
		
	})

	
//上传企业营业执照

	//点击加载出来
	$("#sfzzfile").click(function(){
		$(".qloading_imglicense").css("display","block");
		setTimeout(function(){
			$(".qloading_imglicense").css("display","none");
		},7000)
	})
	$('#sfzzfile').change(function(evt){
   		var max_size=102400;
        var finput = $(this);   
        var files = evt.target.files; // 获得文件对象  
        var output = [];
        for (var i = 0, f; f = files[i]; i++){  
//          	//检查文件大小
            if(f.size > max_size){   
				layer.msg('上传的图片不能超过100KB',{time:2000});
//				$(".qloading_imglicense").css("display","none");
                $(this).val('');   
            }else{
            	var fd = new FormData();
            	fd.append("uploadedFile", this.files[0]);
            	$.ajax({
            		type:"post",
            		url:"http://47.92.145.129:8000/yanzhengs/shenfene",
            		async:true,
            		data:fd,
            		contentType: false,
        			processData: false,
            		success:function(e){
            			console.log(e);
            			imgSrczheng = e.lu;
            			console.log(imgSrczheng)
						if(e.nem!="营业执照"){
							layer.msg('请上传有效证件',{time:2000});
//							$(".qloading_imglicense").css("display","none");
						}else{
							console.log("是营业执照")
//							$(".qloading_imglicense").css("display","none");
							$('.imgsfz')[0].src = 'http://47.92.145.129:8000/'+e.lu;
						}
            		},
            		error:function(){
            			layer.msg('图片不合法',{time:2000});
		            }
            	});
            }
        }
    });
	
	
	
	
	
	
	
	
	
	
	
	
	/*var dataURL;
	var aa;
	$("#clipArea").photoClip({
		width: 200,
		height: 200,
		file: "#headfile",
		view: "#view",
		ok: "#clipBtn",
		loadStart: function() {
			console.log("照片读取中");
		},
		loadComplete: function() {
			console.log("照片读取完成");
		},
		clipFinish: function(dataURL) {
//			console.log(dataURL);
			console.log(dataURL.length);
			dataURLa = $.base64.btoa(dataURL)
			
		}
	});
	$('#clipBtn').click(function() {
		tops.style.top = '-100%'
	})
	$('#headfile').change(function(evt) {
		tops.style.top = 0
		var finput = $(this);   
        var files = evt.target.files; // 获得文件对象  
        var output = [];
		for (var i = 0, f; f = files[i]; i++){  
        	var formdata = new FormData();
        	var my_pic = this.files[0];
			formdata.append("uploadeFile",this.files[0]);
        	$.ajax({
				url: "http://47.92.145.129:8000/yanzhengs/huang",
				type: "post",
				data: formdata,
				contentType: false,
				processData: false,
				success: function(data) {
					console.log(data)
					if(data.nem == '正常') {
						aa = 1;
					}else{
						aa = 2;
					}
				}
			})
        }
	})
*/



	
	
	
/*//上传头像
	var fileH;
	var imgSrcheader = '';
	$('#headfile').change(function() {
		fileH = this.files[0];
		if(fileH.size > 153600) {
			alert("图片过大")
		} else {
		var fileReader = new FileReader();
		fileReader.readAsDataURL(fileH);
		console.log(fileH)
		fileReader.onload = function(event) {
			imgSrcheader = event.target.result; //返回的dataURL  
			console.log(imgSrcheader)
			$('.yu_imghead').attr('src', imgSrcheader);
		}
		var formdata = new FormData();
		formdata.append("uploadeFile", fileH);
		console.log("上传头像成功")
			$.ajax({
				url: "http://47.92.145.129:8000/users/huang",
				type: "post",
				data: formdata,
				contentType: false,
				processData: false,
				success: function(data) {
					console.log(data)
					if(data.nem == '正常') {
						imgSrcheader = $.base64.btoa(imgSrcheader)
					}
				}
			})
		}
	})
		*/
	

	/*var fileZ;
	var imgSrczheng = '';
	$('#sfzzfile').change(function() {
		fileZ = this.files[0];
		if(fileZ.size > 153600) {
			alert("图片过大")
		} else {
		var fileReader = new FileReader();
		fileReader.readAsDataURL(fileZ);
		fileReader.onload = function(event) {
			imgSrczheng = event.target.result; //返回的dataURL  
			console.log(imgSrczheng)
			$('.imgsfz').attr('src', imgSrczheng);
		}
		var formdata = new FormData();
		formdata.append("uploadeFile", fileZ);
		console.log("上传身份正面照成功")
//			$.ajax({
//				url: "http://47.92.145.129:8000/users/huang",
//				type: "post",
//				data: formdata,
//				contentType: false,
//				processData: false,
//				success: function(data) {
//					console.log(data)
//					if(data.nem == '正常') {
//						imgSrczheng = $.base64.btoa(imgSrczheng)
//					}
//				}
//			})
		}
	})*/
	
	
	
	
	
	
},false)






