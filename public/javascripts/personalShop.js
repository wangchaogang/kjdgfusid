window.addEventListener("load",function(){
	
	console.log(sessionStorage.userId)
	
//	$.ajax({
//		type:"post",
//		url:'http://'+ip+'/users/tusndui',
//		async:true,
//		data:{
//			uid:sessionStorage.userId,
//			yuandid:'0'
//		},
//		success:function(e){
//			console.log(e)
////			layer.msg('注册成功',{time:1000});
//		}
//	})
//	qheader theader
//	$.ajax({
//		type:"get",
//		url:'http://'+ip+'/qenter/qsearchkey',
//		async:true,
//		data:{
//			CompanyKeysq:'111'
//		},
//		success:function(e){
//			console.log(e)
//		}
//	})
//	$.ajax({
//		type:"get",
//		url:'http://'+ip+'/tenter/tsearchkey',
//		async:true,
//		data:{
//			CompanyKeyst:'111'
//		},
//		success:function(e){
//			if(e.flag != '查询成功'){
////				alert(2)
//				layer.msg('密钥错误',{time:1000});
//			}else{
//				console.log(e.result[0].theader)
//			}
//		}
//	})

//下拉多选
	 var lxm_index = $('.ssa').index('.ssa') + 1
	 $('.selectpicker').selectpicker({
        'selectedText': 'cat'
     });
	$.ajax({
		type:"get",
		url:"http://47.92.145.129:8000/users/nav",
		async:true,
		success:function(e){
			$('.ssa')[0].innerText = e[0].names
			$('.ssa')[1].innerText = e[0].names
			$('.ssb')[0].innerText = e[1].names
			$('.ssb')[1].innerText = e[1].names
			$('.ssc')[0].innerText = e[2].names
			$('.ssc')[1].innerText = e[2].names
			$('.ssd')[0].innerText = e[3].names
			$('.ssd')[1].innerText = e[3].names
			
			$('.sse')[0].innerText = e[4].names
			$('.sse')[1].innerText = e[4].names
			$('.ssf')[0].innerText = e[5].names
			$('.ssf')[1].innerText = e[5].names
			$('.ssg')[0].innerText = e[6].names
			$('.ssg')[1].innerText = e[6].names
			$('.ssh')[0].innerText = e[7].names
			$('.ssh')[1].innerText = e[7].names
			
			$('.ssi')[0].innerText = e[8].names
			$('.ssi')[1].innerText = e[8].names
			$('.ssj')[0].innerText = e[9].names
			$('.ssj')[1].innerText = e[9].names
			$('.ssk')[0].innerText = e[10].names
			$('.ssk')[1].innerText = e[10].names
			$('.ssl')[0].innerText = e[11].names
			$('.ssl')[1].innerText = e[11].names
			$('.ssm')[0].innerText = e[12].names
			$('.ssm')[1].innerText = e[12].names
		}
	});
	
    //选项卡	
	$("#geren_single").click(function(){
		//个人
		$("#peopl_gr").css("display","block");
		$("#geren_single").css("height","51px").css("border","1px solid #DDDDDD").css("background","white").css("border-bottom","none");
		//团队
		$("#yu_aboutTeam").css("display","none");
		$("#team_single").css("background","#F7F7F7").css("height","49px").css("border","none");
		//企业
		$("#yu_aboutQiye").css("display","none");
		$("#qiye_single").css("height","49px").css("border","none").css("background","#F7F7F7");
	})
	//点击团队
	$("#team_single").click(function(){
		$("#yu_aboutQiye").css("display","none");
		$("#yu_aboutTeam").css("display","block");
		$("#peopl_gr").css("display","none");
		//团队
		$("#yu_aboutTeam").css("display","block");
		$("#team_single").css("height","51px").css("border","1px solid #DDDDDD").css("background","white").css("border-bottom","none");
		//个人
		$("#geren_single").css("background","#F7F7F7").css("height","49px").css("border","none");
		//企业
		$("#qiye_single").css("height","49px").css("border","none").css("background","#F7F7F7");
		
	})
	$("#qiye_single").click(function(){
		$("#peopl_gr").css("display","none");
		$("#yu_aboutTeam").css("display","none");
		$("#yu_aboutQiye").css("display","block");
		//个人
		$("#geren_single").css("background","#F7F7F7").css("height","49px").css("border","none");
		//团队
		$("#team_single").css("background","#F7F7F7").css("height","49px").css("border","none");
		//企业
		$("#qiye_single").css("height","51px").css("border","1px solid #DDDDDD").css("background","white").css("border-bottom","none");
	})
	
//	var off=false;

//点击协议----个人
	var off1=false;
	$("#yu_lab").click(function(){
		if(off1){
//			$("#yu-submit").attr("disabled",true);
			off1=false;
		}else{
//			$("#yu-submit").removeAttr("disabled");
			off1=true;
		}
	})
	var off11=false;
	$("#Jobg").click(function(){
		if(off11){
			off11=false;
		}else{
			off11=true;
		}
	})
	// 个人点击审核按钮
	$("#yu-submit").click(function(){
		var telRex=/^1[34578]\d{9}$/;  //手机号验证
		var emailRex =  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;//邮箱验证
    	var qqRex=/^\d{5,10}$/;    //qq验证
    	var shenfRex=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证正则
		var nickname_val=$("#yu_nickname").val(); //昵称
		var select_val=$("#id_select").val();  //设计领域
		var truename_val=$("#yu_tname").val(); //真实姓名
		var email_val=$("#yu_email").val(); //邮箱
		var tel_val=$("#yu_telhao").val(); //联系方式
		var qq_val=$("#yu_qqhao").val(); //qq
		var person_val=$("#yu_person").val(); //个人介绍
		var headfile_val=$("#on_tpfil").val(); //上传头像
		var personworks_val=$("#yuh_pic").val(); //个人作品
		var address_val=$("#yu_ads").val(); //地址
		var idcard_val=$("#yu_idhao").val(); //身份证号
		var idpicz_val=$("#yu_sfzzheng").val(); //身份证正面照
		var idpicf_val=$("#yu_sfzfan").val(); //身份证反面照
		if(!sessionStorage.userId){
			layer.msg('请先登录',{time:1000});
		}else{
			if(nickname_val==''){
				layer.msg('请输入昵称',{time:1000});
			}
			else if(select_val==""){
				layer.msg('请输入设计领域',{time:1000});
			}
			else if(truename_val==""){
				layer.msg('请输入真实姓名',{time:1000});
			}
			else if(email_val==""){
				layer.msg('请输入邮箱',{time:1000});
			}
			else if(!(email_val.match(emailRex))){
		    	layer.msg('邮箱格式输入有误',{time:1000});
		    }
			else if(tel_val==""){
				layer.msg('请输入联系方式',{time:1000});
			}
			else if(!(tel_val.match(telRex))){
		    	layer.msg('手机号输入有误',{time:1000});
		    }
			else if(qq_val==""){
				layer.msg('请输入QQ',{time:1000});
			}
			else if(!(qq_val.match(qqRex))){
		    	layer.msg('QQ输入有误',{time:1000});
		    }
			else if(person_val==""){
				layer.msg('请输入个人介绍',{time:1000});
			}
			else if(!photo_obj){
				layer.msg('请上传头像',{time:1000});
			}else if(legitimate != 1){s
				layer.msg('头像不合法',{time:1000});
			}
			else if(lxm_works.length<=0){
				layer.msg('请上传个人作品',{time:1000});
			}
			else if(lxm_works.length<4){
				layer.msg('至少上传五张个人作品',{time:1000});
			}
			else if(address_val==""){
				layer.msg('请填写地址',{time:1000});
			}
			else if(idcard_val==""){s
				layer.msg('请输入身份证号',{time:1000});
			}
			else if(!(idcard_val.match(shenfRex))){
		    	layer.msg('身份证号格式有误',{time:1000});
		    }
			else if(!lxm_idpic_top){
				layer.msg('请上传身份证正面照',{time:1000});
			}
			else if(!lxm_idpic_bottom){
				layer.msg('请上传身份证反面照',{time:1000});
			}
			else if(!off1){
				layer.msg('请阅读用户服务协议',{time:1000});
			}
			else{
				$.ajax({
					type:"post",
					url:'http://'+ip+'/personal/lxmMe',
					async:true,
					data:{
						shopName:nickname_val,
						shopType:$("#id_select").val().join(','),
						realName:truename_val,
						email:email_val,
						phone:tel_val,
						qq:qq_val,
						briefIntroduction:person_val,
						portrait:photo_obj,
						works:lxm_works.join('-'),
						address:address_val,
						userID:idcard_val,
						idPhoto:lxm_idpic_top +'-'+ lxm_idpic_bottom,
						secretKey: '',
						examine:0,
						Applicant: sessionStorage.userId, //获取登录人ID填写 获取登录人ID填写 获取登录人ID填写
						nameuid: sessionStorage.userId
					},
					success:function(e){
						console.log(e)
						if(e.flag == '企业已注册'){
							layer.msg('您已注册过企业',{time:1000});
						}else if(e.flag == '团队已注册'){
							layer.msg('您已注册过团队',{time:1000});
						}else if(e.flag == '个人已注册'){
							layer.msg('您已注册过个人',{time:1000});
						}else if(e.flag == '1'){
							$.ajax({
								type:"post",
								url:'http://'+ip+'/users/tusndui',
								async:true,
								data:{
									uid:sessionStorage.userId,
									yuandid:1
								},
								success:function(e){
									console.log(e)
									sessionStorage.userShop = 1;
									layer.msg('注册个人店铺成功',{time:1000});
									setTimeout(function(){
										location.href = '../index.html'
									},1000)
								},erro:function(e){
									layer.msg('头像错误,请重新上传',{time:1000});
								}
							})	
						}
					}
				})
			}
		}		 
	})
	
	function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file)
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
        }
        return url
    };
	
	var lxm_works = [];
	var photo_obj;
	var lxm_idpic_top;
	var lxm_idpic_bottom;
	var legitimate; //判断头像是否合法
//	 $('.on_tpfil').onload = function (e) {
//                  console.log("成功读取....");
//          }
//	$('.on_tpfil').each(function(){
	
	
		$('.lxm_laji').click(function(){
			$('.lxm_load_one').css('display','block')
			setTimeout(function(){
				$('.lxm_load_one').css('display','none')
			},8000)
		})
	
       
        $('.on_tpfil').change(function(evt){
        	tops.style.display = 'block'
        	
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
						async:false,
						contentType: false,
						processData: false,
						success: function(data) {
							console.log(data)
							if(data.nem == '正常') {
								legitimate = 1;
							}else{
								legitimate = 2;
							}
							console.log(legitimate)
						}
					})
                	if(legitimate == 1){
//						alert(1)
					}else if(legitimate == 2){
//						alert(2)
						layer.msg('头像不合法',{time:1000});
						tops.style.display = 'none'
					}
//              }
            }
        });
		
//		function zsb(){
		$("#clipArea").photoClip({
			width: 200,
			height: 200,
			file: "#on_tpfil",
			ok: "#clipBtn",
			loadStart: function() {
				console.log("照片读取中");
				$('.lxm_load_one').css('display','block')
			},
			loadComplete: function() {
				console.log("照片读取完成");
				$('.lxm_load_one').css('display','none')
			},
			clipFinish: function(dataURL) {
				if(dataURL.length>75000){
					layer.msg('图片过大，请重新上传',{time:1000});
					tops.style.display = 'none'
				}else{
					$('.yu_imgon img')[0].src = dataURL
					tops.style.display = 'none'
					photo_obj = $.base64.btoa(dataURL);
					console.log(photo_obj);
					console.log(dataURL.length);
					layer.msg('上传成功',{time:1000});
				}
			}
		});
//		}
		
		
//		function lxmPho(){
//			tops.style.top = 0;
//		}
        
        
        
        
        
        
//      $(".wyh_teamthings").on("change",".yuh_pic",function() {

		
		$('.lxm_zlaji').click(function(){
//			alert(1)
			setTimeout(function(){
				$('.lxm_load_two').css('display','block')	
			},500)
			setTimeout(function(){
				$('.lxm_load_two').css('display','none')	
			},3500)
		})
	

        $('.yuh_pic').change(function(e){
//      	alert(1)
			var files = e.target.files;
			var max_size=102400;
			
			for (var i = 0, f; f = files[i]; i++){
				if(f.size > max_size){   
                    alert("上传的图片不能超过100KB!");   
                    $(this).val('');   
               }else{
                	var fd = new FormData();
                	fd.append("uploadedFile", this.files[0]);
                	$.ajax({
                		type:"post",
                		url:"http://47.92.145.129:8000/yanzhengs/chan",
                		async:false,
                		data:fd,
                		contentType: false,
            			processData: false,
                		success:function(e){
                			console.log(e)
                			if(e.nem != '色情'){
                				lxm_works.push(e.nem)
	                			console.log(e.nem)
	                			console.log(lxm_works)
	                			result = 'http://47.92.145.129:8000/'+e.nem+''
                			}else{
//              				alert(2)
								sq = 1
                			}
                			              			
                		},
                		error:function(){
			                alert("图片有错");
			            }
                	});
                	
					var index = $(this).index('.han_imgg')
					var result;
					var sq;
					if(sq != 1){
			            var fileReader = new FileReader();
			//          lxm_works.push(this.files[0])
						fileReader.readAsDataURL(this.files[0]);
						fileReader.onload = function(event) {
	//						result = event.target.result; //返回的dataURL
				//			lxm_works.push($.base64.btoa(result))
							$('.han_imgg').eq(index-1).attr('src',result)
							$('.han_imgg').eq(index-1).css('position','relative')
							$('.han_imgg').eq(index-1).css('z-index','9')
							$('.yuhan_img_remover span').eq(index).css('display','none')
						}
	                	var html = '<div class="yuhan_img yuhan_img_remover"><input multiple class="yuh_pic cur" type="file"><img src="../images/onImg.png" class="han_imgg cur"><span class="yuhan_img_remove"><i class="glyphicon glyphicon-remove"></i></i></span></div>'//<span class="yuhan_img_remove"><i class="glyphicon glyphicon-remove"></i></i></span>
	
						$(this).parent().before(html);	
						$(this).val('')
        			}else{
        				layer.msg('图片不合法',{time:1000});
        			}

//					console.log(result)
					for(var i = 0; i < $('.yuhan_img_remove').length; i++){
						$('.yuhan_img_remove')[i].index = i
						$('.yuhan_img_remove')[i].onclick = function(){
							this.parentNode.remove()
							lxm_works.splice(this.index,1)
							console.log(lxm_works)
//							alert(this.index)
						}
					}

                }
			}
       })
        
        
        $('.lxm_why_one').click(function(){
        	$('.lxm_load_three').css('display','block')
        	setTimeout(function(){$('.lxm_load_three').css('display','none')},10000)
        })
        
        $('.lxm_why_two').click(function(){
        	$('.lxm_load_four').css('display','block')
        	setTimeout(function(){$('.lxm_load_four').css('display','none')},10000)
        })
        
        $('.yu_sfzzheng').change(function(evt){
       		var max_size=102400;
            var finput = $(this);   
            var files = evt.target.files; // 获得文件对象  
            var output = [];
            for (var i = 0, f; f = files[i]; i++){  
//          	//检查文件大小
//              if(f.size > max_size){   
//                  alert("上传的图片不能超过100KB!");   
//                  $(this).val('');   
//              }else{
//              	var formdata = new FormData();
//              	var my_pic = this.files[0];
//					formdata.append("uploadeFile",this.files[0]);
                	var fd = new FormData();
                	fd.append("uploadedFile", this.files[0]);
                	$.ajax({
                		type:"post",
                		url:"http://47.92.145.129:8000/yanzhengs/shenfene",//shenfene
                		async:true,
                		data:fd,
                		contentType: false,
            			processData: false,
                		success:function(e){
                			console.log(e)
                			if(e.nem == '请上传有效证件'){
                				layer.msg('请上传有效证件',{time:1000});
                			}else{
                				lxm_idpic_top = e.lu//e.lu
                				$('.yu_sfzzheng_top')[0].src = 'http://47.92.145.129:8000/'+e.lu//e.lu
                			}
                		},
                		error:function(){
			                alert("上传出错了");
			            }
                	});
//              }
            }
        });
        
        $('.yu_sfzfan').change(function(evt){
       		var max_size=102400;
            var finput = $(this);   
            var files = evt.target.files; // 获得文件对象  
            var output = [];
            for (var i = 0, f; f = files[i]; i++){  
//          	//检查文件大小
                if(f.size > max_size){   
                    alert("上传的图片不能超过100KB!");   
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
                			if(e.nem == '请上传有效证件'){
                				layer.msg('请上传有效证件',{time:1000});
                			}else{
                				lxm_idpic_bottom = e.lu
                				$('.yu_sfzzheng_bottom')[0].src = 'http://47.92.145.129:8000/'+e.lu
                			}
                		},
                		error:function(){
			                alert("图片不合法");
			            }
                	});
                }
            }
        });
//点击协议----团队
	var off2=false;
	$("#yu_labt").click(function(){
		if(off2){
//			$("#yu-submitt").attr("disabled",true);
			off2=false;
//			console.log("aa")
		}else{
//			$("#yu-submitt").removeAttr("disabled");
			off2=true;
			
		}
	})
	var off22=false;
	$("#Jobt").click(function(){
		if(off22){
//			$("#yu-submitt").attr("disabled",true);
			off22=false;
//			console.log("aa")
		}else{
//			$("#yu-submitt").removeAttr("disabled");
			off22=true;
		}
	})
	//团队点击团队审核
	$("#yu-submitt").click(function(){
		var telRex=/^1[34578]\d{9}$/;  //手机号验证
		var emailRex =  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;//邮箱验证
    	var qqRex=/^\d{5,10}$/;    //qq验证
    	var shenfRex=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证正则
    	
		var nickname_val=$("#yu_nickname").val(); //昵称
		var select_val=$("#id_select").val();  //设计领域
		var truename_val=$("#yu_tname").val(); //真实姓名
		var email_val=$("#yu_email").val(); //邮箱
		var tel_val=$("#yu_telhao").val(); //联系方式
		var qq_val=$("#yu_qqhao").val(); //qq
		var person_val=$("#yu_person").val(); //个人介绍
		var tname_val=$("#yu_tName").val(); //团队名称
		var tkey_val=$("#yu_tkyes").val(); //团队密钥
		if(nickname_val==''){
			layer.msg('请输入昵称',{time:1000});
		}
		else if(select_val==""){
			layer.msg('请输入设计领域',{time:1000});
		}
		else if(truename_val==""){
			layer.msg('请输入真实姓名',{time:1000});
		}
		else if(email_val==""){
			layer.msg('请输入邮箱',{time:1000});
		}
		else if(!(email_val.match(emailRex))){
	    	layer.msg('邮箱格式输入有误',{time:1000});
	    }
		else if(tel_val==""){
			layer.msg('请输入联系方式',{time:1000});
		}
		else if(!(tel_val.match(telRex))){
			layer.msg('手机号输入有误',{time:1000});
	    }
		else if(qq_val==""){
			layer.msg('请输入QQ',{time:1000});
		}
		else if(!(qq_val.match(qqRex))){
	    	layer.msg('QQ输入有误',{time:1000});
	    }
		else if(person_val==""){
			layer.msg('请输入个人介绍',{time:1000});
		}
		else if(tkey_val==""){
			layer.msg('请输入团队密钥',{time:1000});
		}
		else if(!off22){
			layer.msg('请阅读用户服务协议',{time:1000});
		}
		else{
			$.ajax({
				type:"get",
				url:'http://'+ip+'/tenter/tsearchkey',
				async:true,
				data:{
					CompanyKeyst:tkey_val
				},
				success:function(e){
					if(e.flag != '查询成功'){
		//				alert(2)
						layer.msg('密钥错误',{time:1000});
					}else{
						console.log(e.result[0].theader)
						$.ajax({
							type:"post",
							url:'http://'+ip+'/personal/shop_register',
							async:true,
							data:{
								shopName:nickname_val,  
								shopType:select_val,    
								realName:truename_val,  
								email:email_val, 
								phone:tel_val,       
								qq:qq_val,	    
								briefIntroduction:person_val,   
								portrait:e.result[0].theader,    
								works:'', 
								address:'',	     
								userID:'',   
								idPhoto:'',   
								secretKey:'',  
								examine:0,
								Applicant:sessionStorage.userId   
							},
							success:function(e){
								console.log(e)
								$.ajax({
									type:"post",
									url:'http://'+ip+'/users/tusndui',
									async:false,
									data:{
										uid:sessionStorage.userId,
										yuandid:1
									},
									success:function(e){
										console.log(e)
										layer.msg('注册团队店铺成功',{time:1000});
//										sessionStorage.userShop = 1;
										setTimeout(function(){
											location.href = '../index.html'
										},1000)
									}
								})
							}
						})
					}
				}
			})
		}
	})
//点击协议----企业
	var off3=false;
	$("#yu_labq").click(function(){
		if(off3){
//			$("#yu-submitq").attr("disabled",true);
			off3=false;
//			console.log("aa")
		}else{
//			$("#yu-submitq").removeAttr("disabled");
			off3=true;
		}
	})
	var off33=false;
	$("#Jobq").click(function(){
		if(off33){
			$("#yu-submitq").attr("disabled",true);
			off33=false;
			console.log("aa")
		}else{
			$("#yu-submitq").removeAttr("disabled");
			off33=true;
		}
	})
	//企业点击审核
	$("#yu-submitq").click(function(){
		var telRex=/^1[34578]\d{9}$/;  //手机号验证
		var emailRex =  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;//邮箱验证
		var qqRex=/^\d{5,10}$/;    //qq验证
		var nickname_val=$("#yu_nickname").val(); //昵称
		var select_val=$("#id_select").val();  //设计领域
		var truename_val=$("#yu_tname").val(); //真实姓名
		var email_val=$("#yu_email").val(); //邮箱
		var tel_val=$("#yu_telhao").val(); //联系方式
		var qq_val=$("#yu_qqhao").val(); //qq
		var person_val=$("#yu_person").val(); //个人介绍
		var qname_val=$("#yu_qName").val(); //企业名称
		var qkey_val=$("#yu_qikyes").val(); //企业密钥
		if(nickname_val==''){
			layer.msg('请输入昵称',{time:1000});
		}
		else if(select_val==""){
			layer.msg('请输入设计领域',{time:1000});
		}
		else if(truename_val==""){
			layer.msg('请输入真实姓名',{time:1000});
		}
		else if(email_val==""){
			layer.msg('请输入邮箱',{time:1000});
		}
		else if(!(email_val.match(emailRex))){
	    	layer.msg('邮箱格式输入有误',{time:1000});
	    }
		else if(tel_val==""){
			layer.msg('请输入联系方式',{time:1000});
		}
		else if(!(tel_val.match(telRex))){
	    	layer.msg('手机号输入有误',{time:1000});
	    }
		else if(qq_val==""){
			layer.msg('请输入QQ',{time:1000});
		}
		else if(!(qq_val.match(qqRex))){
	    	layer.msg('QQ输入有误',{time:1000});
	    }
		else if(person_val==""){
			layer.msg('请输入个人介绍',{time:1000});
		}
		else if(qkey_val==""){
			layer.msg('请输入企业密钥',{time:1000});
		}
		else if(!off33){
			layer.msg('请阅读用户服务协议',{time:1000});
		}
	    else{
			$.ajax({
				type:"get",
				url:'http://'+ip+'/qenter/qsearchkey',
				async:true,
				data:{
					CompanyKeysq:qkey_val
				},
				success:function(e){
					if(e.flag != '查询成功'){
						layer.msg('密钥错误',{time:1000});
					}else{
						console.log(e.result[0].theader)
						$.ajax({
							type:"post",
							url:'http://'+ip+'/personal/shop_register',
							async:true,
							data:{
								shopName:nickname_val,  
								shopType:select_val,    
								realName:truename_val,  
								email:email_val, 
								phone:tel_val,       
								qq:qq_val,	    
								briefIntroduction:person_val,   
								portrait:e.result[0].theader,    
								works:'', 
								address:'',	     
								userID:'',   
								idPhoto:'',   
								secretKey:'',  
								examine:0,
								Applicant:sessionStorage.userId   
							},
							success:function(e){
								console.log(e)
								$.ajax({
									type:"post",
									url:'http://'+ip+'/users/tusndui',
									async:true,
									data:{
										uid:sessionStorage.userId,
										yuandid:1
									},
									success:function(e){
										console.log(e)
										layer.msg('注册企业店铺成功',{time:1000});
										sessionStorage.userShop = 1;
										setTimeout(function(){
											location.href = '../index.html'
										},1000)
									}
								})
							}
						})
					}
				}
			})
		}
	})

},false)