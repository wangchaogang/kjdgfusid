window.addEventListener("load",function(){


//下拉多选
	 $('.selectpicker').selectpicker({
        'selectedText': 'cat'
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
			$("#yu-submit").attr("disabled",true);
			off1=false;
//			console.log("aa")
		}else{
			$("#yu-submit").removeAttr("disabled");
			off1=true;
		}
	})
	var off11=false;
	$("#Jobg").click(function(){
		if(off11){
			$("#yu-submit").attr("disabled",true);
			off11=false;
			console.log("aa")
		}else{
			$("#yu-submit").removeAttr("disabled");
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
				if(nickname_val==''){
					alert("请输入昵称")
				}
				else if(select_val==""){
					alert("请输入设计领域")
				}
				else if(truename_val==""){
					alert("请输入真实姓名")
				}
				else if(email_val==""){
					alert("请输入邮箱")
				}
				else if(!(email_val.match(emailRex))){
			    	alert("邮箱格式输入有误")
			    }
				else if(tel_val==""){
					alert("请输入联系方式")
				}
				else if(!(tel_val.match(telRex))){
			    	alert("手机号输入有误")
			    }
				else if(qq_val==""){
					alert("请输入QQ")
				}
				else if(!(qq_val.match(qqRex))){
			    	alert("QQ输入有误")
			    }
				else if(person_val==""){
					alert("请输入个人介绍")
				}
				else if(!photo_obj){
					alert("请上传头像")
				}
				else if(lxm_works.length<=0){
					alert("请上传个人作品")
				}
				else if(lxm_works.length<4){
					alert("至少上传五张个人作品")
				}
				else if(address_val==""){
					alert("请填写地址")
				}
				else if(idcard_val==""){
					alert("请输入身份证号")
				}
				else if(!(idcard_val.match(shenfRex))){
			    	alert("身份证号输入有误")
			    }
				else if(!lxm_idpic_top){
					alert("请上传身份证正面照")
				}
				else if(!lxm_idpic_bottom){
					alert("请上传身份证反面照")
				}
			    else{
			    	if(!sessionStorage.userId){
			    		alert('请先登录')
			    	}else{
					$.ajax({
						type:"post",
						url:'http://'+ip+'/personal/shop_register',
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
							Applicant: sessionStorage.userId //获取登录人ID填写 获取登录人ID填写 获取登录人ID填写
						},
						success:function(e){
							console.log(e)
							if(e.flag == 1){
								alert('注册成功')
							}else if(e.flag == 2){
								alert('店铺名重复，请修改后重试')
							}else{
								alert('注册失败，请重试')
							}
						}
					});
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
//	 $('.on_tpfil').onload = function (e) {
//                  console.log("成功读取....");
//          }
//	$('.on_tpfil').each(function(){
       
        $('.on_tpfil').change(function(evt){
       		var max_size=51200;
            var finput = $(this);   
            var files = evt.target.files; // 获得文件对象  
            var output = [];
            for (var i = 0, f; f = files[i]; i++){  
            	//检查文件大小
                if(f.size > max_size){   
                    alert("上传的图片不能超过50KB!");   
                    $(this).val('');   
                }else{
                	var formdata = new FormData();
                	var my_pic = this.files[0];
					formdata.append("uploadeFile",this.files[0]);
                	$.ajax({
						url: "http://47.92.145.129:8000/users/huang",
						type: "post",
						data: formdata,
						contentType: false,
						processData: false,
						success: function(data) {
							console.log(data)
							if(data.nem == '正常') {
								var fileReader = new FileReader();
								fileReader.readAsDataURL(my_pic);
								fileReader.onload = function(event) {
									var result = event.target.result; //返回的dataURL
									photo_obj = $.base64.btoa(result)
//									$('.yu_imgon span').css('display','block')
									$('.yu_imgon img')[0].src = result
//									console.log(result)
								}
							}else{
								alert('图片不合法，请重新上传')
							}
						}
					})
                }
            }
        });
//      $(".wyh_teamthings").on("change",".yuh_pic",function() {

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
                		url:"http://47.92.145.129:8000/users/chan",
                		async:true,
                		data:fd,
                		contentType: false,
            			processData: false,
                		success:function(e){
                			
                			console.log(e)
                			lxm_works.push(e.nem)
                			console.log(e.nem)
                			console.log(lxm_works)
                		},
                		error:function(){
			                alert("图片有错");
			            }
                	});
                	
                	
					var index = $(this).index('.han_imgg')
					var result;
                	var fileReader = new FileReader();
//              	lxm_works.push(this.files[0])
					fileReader.readAsDataURL(this.files[0]);
					fileReader.onload = function(event) {
						result = event.target.result; //返回的dataURL
//						lxm_works.push($.base64.btoa(result))
						$('.han_imgg').eq(index-1).attr('src',result)
						$('.han_imgg').eq(index-1).css('position','relative')
						$('.han_imgg').eq(index-1).css('z-index','9')
						$('.yuhan_img_remover span').eq(index).css('display','none')
					}
//					console.log($(this).parent().children('img').attr('src'))

					var html = '<div class="yuhan_img yuhan_img_remover"><input multiple class="yuh_pic cur" type="file"><img src="../images/onImg.png" class="han_imgg cur"><span class="yuhan_img_remove">删除</span></div>'
        			$(this).parent().before(html);	
					$(this).val('')

//					console.log(result)
					for(var i = 0; i < $('.yuhan_img_remove').length; i++){
						$('.yuhan_img_remove')[i].index = i
						$('.yuhan_img_remove')[i].onclick = function(){
							this.parentNode.remove()
							lxm_works.splice(this.index,1)
//							console.log(photo_obj)
//							alert(this.index)
						}
					}

                }
			}
        })
        
        
        $('.yu_sfzzheng').change(function(evt){
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
//              	var formdata = new FormData();
//              	var my_pic = this.files[0];
//					formdata.append("uploadeFile",this.files[0]);
                	var fd = new FormData();
                	fd.append("uploadedFile", this.files[0]);
                	$.ajax({
                		type:"post",
                		url:"http://47.92.145.129:8000/users/chan",
                		async:true,
                		data:fd,
                		contentType: false,
            			processData: false,
                		success:function(e){
                			console.log(e)
                			lxm_idpic_top = e.nem
                			$('.yu_sfzzheng_top')[0].src = 'http://47.92.145.129:8000/'+e.nem
                		},
                		error:function(){
			                alert("图片不合法");
			            }
                	});
                }
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
                		url:"http://47.92.145.129:8000/users/chan",
                		async:true,
                		data:fd,
                		contentType: false,
            			processData: false,
                		success:function(e){
                			console.log(e)
                			lxm_idpic_bottom = e.nem
                			$('.yu_sfzzheng_bottom')[0].src = 'http://47.92.145.129:8000/'+e.nem
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
			$("#yu-submitt").attr("disabled",true);
			off2=false;
			console.log("aa")
		}else{
			$("#yu-submitt").removeAttr("disabled");
			off2=true;
			
		}
	})
	var off22=false;
	$("#Jobt").click(function(){
		if(off22){
			$("#yu-submitt").attr("disabled",true);
			off22=false;
			console.log("aa")
		}else{
			$("#yu-submitt").removeAttr("disabled");
			off22=true;
			
			
		}
	})
	//团队点击团队审核
	$("#yu-submitt").click(function(){
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
		var tname_val=$("#yu_tName").val(); //团队名称
		var tkey_val=$("#yu_tkyes").val(); //团队密钥
		if(nickname_val==''){
			alert("请输入昵称")
		}
		else if(select_val==""){
			alert("请输入设计领域")
		}
		else if(truename_val==""){
			alert("请输入真实姓名")
		}
		else if(email_val==""){
			alert("请输入邮箱")
		}
		else if(!(email_val.match(emailRex))){
	    	alert("邮箱格式输入有误")
	    }
		else if(tel_val==""){
			alert("请输入联系方式")
		}
		else if((tel_val.match(telRex))){
	    	alert("手机号输入有误")
	    }
		else if(qq_val==""){
			alert("请输入QQ")
		}
		else if(!(qq_val.match(qqRex))){
	    	alert("QQ输入有误")
	    }
		else if(person_val==""){
			alert("请输入个人介绍")
		}
		else if(tname_val==""){
			alert("请输入团队名称")
		}
		else if(tkey_val==""){
			alert("请输入团队密钥")
		}
	    else{
			alert("都输入正确");
			
		}
	    
	})
//点击协议----企业
	var off3=false;
	$("#yu_labq").click(function(){
		if(off3){
			$("#yu-submitq").attr("disabled",true);
			off3=false;
			console.log("aa")
		}else{
			$("#yu-submitq").removeAttr("disabled");
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
			alert("请输入昵称")
		}
		else if(select_val==""){
			alert("请输入设计领域")
		}
		else if(truename_val==""){
			alert("请输入真实姓名")
		}
		else if(email_val==""){
			alert("请输入邮箱")
		}
		else if(!(email_val.match(emailRex))){
	    	alert("邮箱格式输入有误")
	    }
		else if(tel_val==""){
			alert("请输入联系方式")
		}
		else if((tel_val.match(telRex))){
	    	alert("手机号输入有误")
	    }
		else if(qq_val==""){
			alert("请输入QQ")
		}
		else if(!(qq_val.match(qqRex))){
	    	alert("QQ输入有误")
	    }
		else if(person_val==""){
			alert("请输入个人介绍")
		}
		else if(qname_val==""){
			alert("请输入企业名称")
		}
		else if(qkey_val==""){
			alert("请输入企业密钥")
		}
	    else{
			alert("都输入正确");
			
		}
	    
	})

},false)