window.addEventListener("load",function(){
	
	
//	var ip="localhost:1998"; //ip地址
	var ip="192.168.43.246:1998"; //ip地址
	var aip="47.92.145.129:8000"; //ip地址

	
	



	
////点击协议，
//	var off=false;
//	$("#yu_lab").click(function(){
//		if(off){
//			$("#yu-submit").attr("disabled",true);
//			off=false;
//		}else{
//			$("#yu-submit").removeAttr("disabled");
//			off=true;
//		}
//	})
////点击复选框
//	var offf=false;
//	$("#Job").click(function(){
//		if(offf){
//			$("#yu-submit").attr("disabled",true);
//			offf=false;
//		}else{
//			$("#yu-submit").removeAttr("disabled");
//			offf=true;
//		}
//	})
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
			var shenfRex=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证正则
			var ttelRex=/^1[34578]\d{9}$/;  //手机号验证
			var headVal=$("#headfile").val(); //上传头像
			var sfzzVal=$("#sfzzfile").val(); //身份证正面照
			var sfzfVal=$("#sfzffile").val(); //身份证反面照
			var picVal=$("#picfile").val(); //上传作品
			var shenfVal=$("#shenfid").val(); //身份证
			var teanameVal=$("#yu_teamnamee").val(); //团队名称
			var teamnickNameRex = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/; //团队名称验证
			var tadsVal=$("#yu_address").val(); //团队地址
			var teamuserNameRex = /[\u4e00-\u9fa5]/; //团队地址验证
			var peonameVal=$("#yu_peopname").val(); //团队负责人
			var telVal=$("#yu_telh").val(); //负责人电话
			if(headVal==""){
				layer.msg('您还未上传头像',{time:2000});
			}
			else if(teanameVal==""){
				layer.msg('请填写团队名称',{time:2000});
			}
			else if(!(teanameVal.match(teamnickNameRex))){
				layer.msg('团队名称输入格式错误',{time:2000});
		    }
			else if(tadsVal==""){
				layer.msg('请填写团队地址',{time:2000});
			}
			else if(!(tadsVal.match(teamuserNameRex))){
				layer.msg('团队地址输入格式错误',{time:2000});
		    }
			else if(peonameVal==""){
				layer.msg('请填写团队负责人',{time:2000});
			}
			else if(!(peonameVal.match(teamnickNameRex))){
				layer.msg('团队负责人输入格式错误',{time:2000});
		    }
			else if(telVal==""){
				layer.msg('请填写联系方式',{time:2000});
			}
			else if(!(telVal.match(ttelRex))){
				layer.msg('手机号格式不对',{time:2000});
		    }
			else if(shenfVal==''){
				layer.msg('请填写身份证号',{time:2000});
			}
			else if(!(shenfVal.match(shenfRex))){
				layer.msg('身份证号格式不对',{time:2000});
		    }
			else if(sfzzVal==""){
				layer.msg('请上传身份证正面照',{time:2000});
			}
			else if(arr.split('><').length<5){
				layer.msg('请上传不少于5张作品',{time:2000});
			}
			else if(!($("#Job").is(':checked'))){
				layer.msg('请同意“我保证作原创性，上传的图片没有法律纠纷”并勾选',{time:2000});
			}
			else{
	//团队申请入驻表
				if(!sessionStorage.userId){
					layer.msg('请先登录',{time:2000});
				}else{
					$.ajax({
						type:"post",
						url:"http://"+aip+"/tenter/team",
						async:true,
						data:{
							CorporateHead: dataURLa,//团队头像
							TeamName:teanameVal,   //：团队名称
							TeamAddress:tadsVal,  //：地址
							TeamLeader: peonameVal , //：团队负责人
							TContactInformation:telVal,   //：联系方式
							IdentityCard:shenfVal ,  // ：负责人身份证号
							IdcardZheng:'imgSrczheng',  //身份证正面照
							IdcardFan:'imgSrcfan',  //身份证正面照
							TeamKey: "", //：团队密钥
							TeamWork:arr,   //：团队作品
							TeamAudit:"0"  , //：审核，默认不通过字段为0
							nameuid:sessionStorage.userId  //登录人uid
						},
						success:function(data){
							console.log("审核通过");
							console.log(data)
							if(data.flag=="企业已注册"){
								layer.msg('企业已注册',{time:2000});
							}
							else if(data.flag=="团队已注册"){
								layer.msg('团队已注册',{time:2000});
							}
							else if(data.flag=="注册成功"){
								console.log("可以注册")
								//过去随机数（字母数字+时间戳+uid）
							    var timestamp = Date.parse(new Date()); //获取当前时间戳
								var dom=Math.random().toString(36).substr(2);
								var rand=timestamp+dom;
								console.log(rand)
								$("#yu_Popup_window").css("display","block");
								$("#yu_Popup_window_keys").html(rand+sessionStorage.userId);
								$("#yu_Popup_window_btn").click(function(){
								//修改审核状态和密钥
									$.ajax({
										type:"post",
										url: "http://"+aip+"/tenter/tdetailPass",
										async:true,
										data:{
											TeamKey: rand+sessionStorage.userId, //：团队密钥（时间戳+uid)
											TeamAudit:"1", //：审核状态
											tuid:sessionStorage.userId 
										},
										success:function(data){
											console.log(data)
											$("#yu_Popup_window").css("display","none");
											location.reload()
											location.href="../index.html";
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

			//查询团队密钥
			/*$.ajax({
				type:"get",
				url:"http://"+ip+"/tenter/tsearchkey",
				async:true,
				data:{
					CompanyKeyst:'11111'  //登录人uid
				},
				success:function(data){
					console.log(data)
	//						console.log(data.result[0].tuid)
				}
			});*/



				
			//		console.log("获取密钥");
					/*//查询企业名称
					$.ajax({
						type:"get",
						url:"http://"+aip+"/tenter/searchkeys",
						async:true,
						data:{
							companykeyss:70 //登录人uid
						},
						success:function(data){
							console.log(data)
			//						console.log(data.result[0].tuid)
						}
					});*/
						
					//查询id名称
					/*$.ajax({
						type:"get",
						url:"http://"+ip+"/tenter/search",
						async:true,
						data:{
							Teamid:"33"  //：团队id
						},
						success:function(data){
							console.log(data)
			//						console.log(data.result[0].tuid)
						}
					});*/
			
					
					
					//审核状态
					/*$.ajax({
						type:"get",
						url:"http://"+ip+"/tenter/auditstaus",
						async:true,
						data:{
							TeamAudit:"2"  //审核状态
						},
						success:function(data){
							console.log(data)
						}
					});*/
				//	
				
				
					//删除信息
					/*$.ajax({
						type:"get",
						url:"http://"+ip+"/tenter/delete",
						async:true,
						data:{
							teamidd:"40"   //：团队id
						},
						success:function(data){
							console.log(data)
						}
					});*/







//上传头像
$("#headfile").click(function(){
	$(".loading_imgheader").css("display","block");
	setTimeout(function(){
		$(".loading_imgheader").css("display","none");
	},8000)
})
	var dataURL;
	var aa;
	
	$("#clipArea").photoClip({
		width: 200,
		height: 200,
		file: "#headfile",
		view: "#view",
		ok: "#clipBtn",
		loadStart: function() {
			console.log("ccc")
			console.log("照片读取中");
		},
		loadComplete: function() {
			console.log("ddd")
			console.log("照片读取完成");
		},
		clipFinish: function(dataURL) {
			console.log(dataURL.length);
			if(dataURL.length>75000){
				layer.msg('图片过大，不可提交，请重新选择',{time:2000});
			}else{
				dataURLa = $.base64.btoa(dataURL)
				
			}
		}
	});
//点击裁剪
	$('#clipBtn').click(function() {
		tops.style.top = '-100%'
	})
	
	$('#headfile').change(function(evt) {
		if(this.files[0].size>153600){
			layer.msg('图片大小不得超过100kb',{time:2000});
		}else{
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
	
	
	
	


	
//上传身份照正面	
	//点击加载出来
	$("#sfzzfile").click(function(){
		$(".loading_imgsfzz").css("display","block");
		setTimeout(function(){
			$(".loading_imgsfzz").css("display","none");
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
            			console.log(e)
            			imgSrczheng = e.lu;
            			if(e.nem!="身份证正面"){
							layer.msg('请上传有效证件',{time:2000});
						}else{
							console.log("身份证正面")
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

//上传身份照反面	
//点击加载出来

	$("#sfzffile").click(function(){
		$(".loading_imgsfzf").css("display","block");
		setTimeout(function(){
			$(".loading_imgsfzf").css("display","none");
		},7000)
	})
	 $('#sfzffile').change(function(evt){
   		var max_size=102400;
        var finput = $(this);   
        var files = evt.target.files; // 获得文件对象  
        var output = [];
        for (var i = 0, f; f = files[i]; i++){  
//          	//检查文件大小
            if(f.size > max_size){   
				layer.msg('上传的图片不能超过100KB',{time:2000});
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
            			console.log(e)
            			imgSrcfan = e.lu;
            			if(e.nem!="身份证反面"){
							layer.msg('请上传有效证件',{time:2000});
						}else{
							console.log("身份证反面")
							$('.imgsfzf')[0].src = 'http://47.92.145.129:8000/'+e.lu
						}
            		},
            		error:function(){
						layer.msg('图片不合法',{time:2000});
		            }
            	});
            }
        }
    });

//上传多张作品	
	var files;
    var arr = '';
   //点击加载出来
	$("#yuh_pic").click(function(){
		$(".loading_imgworks").css("display","block");
		setTimeout(function(){
			$(".loading_imgworks").css("display","none");
		},10000)
	})
    $('#yuh_pic').change(function() {
    	console.log(this.files[0])
		console.log(this.value)  //获取到选取的图片
        files=this.files[0];
        var fd = new FormData();
        fd.append("uploadedFile", files);
        //鉴别黄图
        $.ajax({
			url: "http://47.92.145.129:8000/yanzhengs/huang",
			type: "post",
			data: fd,
			contentType: false,
			processData: false,
			success: function(data) {
				console.log(data)
				if(data.nem == '正常' || data.nem == '性感') {
					$.ajax({
			            url:"http://47.92.145.129:8000/yanzhengs/chan",
			            type:"post",
			            data:fd,
			            contentType: false,
			            processData: false,
			            success:function(data){
			            	console.log(data)
			            	$("#yuhan_img").before('<div class="add_img"><img src="http://47.92.145.129:8000/'+data.nem+'" class="img"><div class="glyphicon glyphicon-remove-circle Yu_Delete_the_work" id="Yu_Delete_the_work"></div></div>');
			                arr+='<img src="http://47.92.145.129:8000/'+data.nem+'" class="img">'
			            },
			            error:function(){
			                layer.msg('图片有损坏',{time:2000});
			            }
			        })
				}else if(data.nem == '色情'){
					layer.msg('该图片涉及违法',{time:2000});
				}else{
					layer.msg('图片有损坏',{time:2000});
				}
			}
		})
    })
//删除作品
	$(".yuon_diy").delegate("#Yu_Delete_the_work",'click',function(){
		var det = $(this);
		var url = $(this).siblings($('.img')).attr("src");
		console.log(url);
		var nowDel='<img src="'+url+'" class="img">'; //要删除的那个
		console.log(nowDel);
		$.ajax({
			url:"http://47.92.145.129:8000/yanzhengs/shenle",
			type:"post",
			async:true,
			data:{
				url:url
			},
			success:function(data){
				console.log(data)
				if(data.nam=="成功"){
					det.parent().remove();
					var yesDel = arr.indexOf(nowDel) //删除的那个
					console.log(arr)
					var delQian = arr.slice(0,yesDel) 
					console.log(delQian);//删除的前边
					var delHou = arr.slice(yesDel+nowDel.length)
					console.log(delQian); //删除的后边
					arr=delQian+delHou;
					console.log(arr) //剩下全部
					
				}
			}
		})
	})
	
	
	
	
	
	
	
	/*
			var aaaa = '<img  src="1"  class="img"><img  src="2"  class="img"><img  src="3"  class="img"><img  src="4"  class="img"><img  src="5"  class="img">'
    		var xin='3'
    		var cs = '<img  src="'+xin+'"  class="img">'
    		var ad = aaaa.indexOf(cs) //删除的那个
    		var da = aaaa.slice(0,ad) //删除的前边
    		console.log(da) //1,2
    		var d = aaaa.slice(ad+cs.length) //删除的后边
    		console.log(d) //4 ,5
   			aaaaa = da+d  //剩下的
    		console.log(aaaaa)//1,2,4,5
	*/
	
	
	
/*$('.on_tpfil').change(function(evt){
        	tops.style.top = 0;
//      	alert(1)	
//     		var max_size=102400;
            var finput = $(this);   
            var files = evt.target.files; // 获得文件对象  
            var output = [];
            for (var i = 0, f; f = files[i]; i++){  
            	//检查文件大小
//              if(f.size > max_size){   
//                  alert("上传的图片不能超过100KB!");   
//                  $(this).val('');   
//              }else{
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
								legitimate = 1;
//								$('.yu_imgon img')[0].src = photo_obj;
//								var fileReader = new FileReader();
//								fileReader.readAsDataURL(my_pic);
//								fileReader.onload = function(event) {
//									var result = event.target.result; //返回的dataURL
//									photo_obj = $.base64.btoa(result)
////									$('.yu_imgon span').css('display','block')
									
////									console.log(result)
//								}
							}else{
								legitimate = 2;
							}
//							console.log(legitimate)
						}
					})
//              }
            }
        });*/
	
	
	

	/*var fileH;
	var imgSrcheader = '';
	var dataURL;
	$('#headfile').change(function() {
		tops.style.top = 0
		fileH = this.files[0];
		console.log(fileH)
		var formdata = new FormData();
		formdata.append("uploadeFile", fileH);
		$.ajax({
			url: "http://47.92.145.129:8000/yanzhengs/huang",
			type: "post",
			data: formdata,
			contentType: false,
			processData: false,
			success: function(data) {
				console.log(data)
				sessionStorage.nem=data.nem;
				console.log(sessionStorage.nem)
				if(data.nem == '正常') {
					formdata = $.base64.btoa(formdata)
					console.log(formdata);
					console.log(formdata.length);
				}
			}
		})
	})
	$('#clipBtn').click(function() {
		tops.style.top = '-100%'
	})
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
//			aaa = $.base64.btoa(dataURL)
//			fileH = this.files[0];
			if(fileH.size > 153600) {
//				alert("图片过大")
				$(".yu_pop-up").css("display","block");
				$(".pop_up_content").html("图片过大");
				click_sure();
				
			}else{
				$('.yu_imghead').attr('src', dataURL);
				if(sessionStorage.nem){
					$.ajax({
						type:"post",
						url:"http://"+aip+"/tenter/team",
						async:true,
						data:{
							CorporateHead: dataURL    //企业头像
						},
						success:function(e){
							console.log(e)
							if(sessionStorage.nem=="正常"){
								console.log("ok")
							}else{
								console.log("no")
							}
							console.log("aaaaaaaaok")
						}
					})
				}else{
					console.log("没有nem")
				}
			}
		}
	});*/
	

/*
//上传头像
	var fileH;
	var imgSrcheader = '';
	$('#headfile').change(function() {
		fileH = this.files[0];
		if(fileH.size > 153600) {
			alert("图片过大")
		} else {
		var fileReader = new FileReader();
		fileReader.readAsDataURL(fileH);
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
//						imgSrcheader = $.base64.btoa(imgSrcheader)
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
			$.ajax({
				url: "http://47.92.145.129:8000/users/huang",
				type: "post",
				data: formdata,
				contentType: false,
				processData: false,
				success: function(data) {
					console.log(data)
					if(data.nem == '正常') {
//						imgSrczheng = $.base64.btoa(imgSrczheng)
					}
				}
			})
		}
	})*/





	/*
	var fileF;
	var imgSrcfan = '';
	$('#sfzffile').change(function() {
		fileF = this.files[0];
		if(fileF.size > 153600) {
			alert("图片过大")
		} else {
			var fileReader = new FileReader();
			fileReader.readAsDataURL(fileF);
			fileReader.onload = function(event) {
				imgSrcfan = event.target.result; //返回的dataURL  
				console.log(imgSrcfan)
				$('.imgsfzf').attr('src', imgSrcfan);
			}
			var formdata = new FormData();
			formdata.append("uploadeFile", fileF);
			console.log("上传身份反面照成功")
			$.ajax({
				url: "http://47.92.145.129:8000/users/huang",
				type: "post",
				data: formdata,
				contentType: false,
				processData: false,
				success: function(data) {
					console.log(data)
					if(data.nem == '正常') {
//						imgSrcfan = $.base64.btoa(imgSrcfan)
					}
				}
			})
		}
	})*/


	
},false)
	
