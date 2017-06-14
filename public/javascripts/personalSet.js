window.addEventListener('load',function(){
     var ip = "http://47.92.145.129:8000"   //ip地址
	var jieImg;
     var uid = location.href.split('?')[1];
     var csImgp="ZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFFQUFBQUJBQ0FZQUFBQ3FhWEhlQUFBR3hrbEVRVlI0WHRWYmJWTGNOaGlXMXZtVHNET2xKK2ptSDBUS05Kd2djSUxTRXdST1VIS0N3Z215bkNEYkV4Uk9rT1VFQ1JNcnliOXNUMUFZN09HUGpUclBqdXlSdGZKYWx1UWwxUXd6d0hyMThlajlmTjdYbEF3OEpwUEo5ck5uejE2UFJxTlhVc29KcFhTaWx0dzNscDdqYnlubGdsS0tuL25kM2QzMVlyRzRHWEtMZElqSkdXT3ZDQ0Z2Q0NIN2xGTDg3ajJrbEo4SUlmT3lMTSsvZmZ1MjhKNm81WXZSQU1CTmo4ZmpOMUxLbzlCRHR4MVNnVEhOOC93eWxtUUVBNkFPL2djaDVJUVFzaDM3aGxybWcxcE1zeXc3RHdVaUNBREcyQnRLNlhTREJ6Znh1Q25MOHZqcjE2OFh2c0I3QWJDenN6TjU4dVRKZStpNDc4S1J2emN2aXVMWXgwYjBCbUIzZC9jd1NSSWNmbFBpN29xVmx6VDBBb0F4OW81U0NsMy9ZWWVVY2lxRWVPdTZRV2NBR0dQdkthVkhyaE0vNW5OU3lwa1E0dGhsRDA0QURIVjRLZVUvMkNTbDlCZVh6Zlo1eGhXRVRnQmlIbDVLZVVrSXVjanovTUowWDNDblcxdGJoNFNRUTBycGIzME91eVp1NkpTRXRRQzhlUEZpT2hxTjRPT0RocFR5cjdJc1QxMnROTHhNa2lTbmxGSkVrMEhqNGVIaC9NdVhMNjEycXhVQVplMy9EbHFka0Z2Y2FKcW15emkvNytDY3c4M0N4Ly9VOTd2NjgyVlovdDRXSzFnQlVINytZNGlyVS9wOUtJUkFMTjhZTDErK2ZDMmxiTVFRU0g0K2YvNThaVDZyOG9xTFFEdHhVeFRGbmswQ3JRQnd6ajhFQmptM09LQjVlTTc1bngwaE0wTGMwelJOejNVZ0FBSUFDcFNFZVpxbUJ5YkFLd0F3eHBETUlORHhIcWJJS1FQM3dUVkpRdEtUNS9tQmJpaGpxS1JORlJvQXFNVG1lNGpvRTBLdTBqU3R4VnNkL3FQR0F6Z0JDMTRnei9NOUhRVE9PYVRndGRNRWxvZHNjellBNEp5ZkVrSWdwdDVEU3Jtbml6NWpESWYzNVFRYVlxdU1JdFF6Wkp5bGFZcHpMa2NOUUl6YmwxSmVDeUhxdzhaUUp5bmxzUkJpVm0yWU1mYUpVdnByQUFJM1daWTlyeVNyQm9BeGRrSXBmUmN3TWI3YVFEZnc5cGRiZ1QwUVF1eFYrNG9SbStpZzZnQjg3NnVuRnJBT0twK3ZYQ25zU2ZBb2l1SjU1Y0ppcUlFTzZoSUE1V2JnOTRPR3J2OHhOcXB0cGdZMjFyd1ZxRXNBWW9nVjVrblROTFpLVldyUXNBT2NjeGwwVTRTUUtrU3VKQ0RFVXRkN01RQUlqaWVxaVUzL0hRT0FTZzJvc3Y3L2hpS3FERmJ0QW1PSnF0cFhkQlhBdkZtVy9VeGpSRmhEM2hRaDVEWk4wNXAraStGYWRkdENZd1EvMVlSSWU0VVFOV3ZFR0p1RnByUkR6S2tCY0VZWlk4aTBZaEVRQ3lIRTgycUJHSzVRZDRHWWwzTU9kWTFDeUFKY1NFQlFmRzNhRGt2azVoMWdTU25mQ2lGUWQxaU95T0tQS2E4Z0FURUNvQm9IVzhMaG93cW02UHNtVlIzRy9Rb1NFT3hUTFZLd3dzV3BVQnRKU0JlN0F5N2hSSS8vMWUwUHdrb1BBb0J5aVkzZ0JmOVRwWEp3ZlNBK0cwd3dHQ1JLNlN6THNxbEptQTRnK3ZXZERRWkFHd2k2dEtoWUFSRmtLMmZJT1FjcFc5dUJHUEdLUHNlZ0FDZ1FHb2FzendFaVphaHJsNFFSUkRkRzlNSUVMS3ppOTd3WTRXclhTa3BnTzd5Wm9EVUlMSTFnVkRlSXlNMW14R3liQUR1TS85dllZUFA1SGthMGo1QXQzV0RNUU9pNkxNdERHLzJzZ2lJRVhPQUxVUUd5RGRRQVVPcStiSnNqU1JMc040UVIwbDMyTWhBSzVnR1ZybC9uZWI1dkszbU54Mk1Zc3BxSGM3eWlVMXNIaUlvSDVwRkFPSXVTRElFTHRCMCtRaStCdGVZZkVZU0RHT253YlpabEUvUG1WUkdrNzYyM0NRZUtKV2Y2aHlxTlI5ZFlWMkRWS25ETGRGaEZXU0ZNYTUycmE1WTdpbG9aTzI4UXJ2Z3NoSE9vR093Z1NnemxiaUZFdzZBTkdiV1ppWmE2UEM4amJsSmlxTDMxSmtYTlZEVkcrdHRsSUdPdFdSRzRPb25aS3lBeXN6VWxrcUZGMWE3ejQvT1ZJbWZmYkZNdjRIaXp1SllTV0RRU3RBc0ZVeFg2MmdLZFp6QkxZNjVXdGNIVGJmRDJLMnhXcElCemp0SzZpMGRvZUMydjRxaUZwL095SVYwM3ZlNXoweGIwaUdqdHhWRXMxc08zTmlhSkZVMzJCTVJuRHlzeGkyK0RSTVAzRDVCUXVXRFI2RU53b2ZkdGJyU3RSYVlyUXpRQmlFNnJ1U0NnVjZJY0RHRURzR3IrZFUxU2FHNnlHaFhkaW02Q3RHZ0RRMitHN0dqanZTMks0cFZ6a3hRV2RCRXBsMXY2RVo3cDNTWlhiVHBXMWZneFFmQnVsS3cyM1RmS2VzekRtbXZib2xYem1jNWU0WkNFNHpIQmNEazg5dWNFZ0FJaHVOQzVLVUJjRDk4TEFEejhmN0FKWFRydnBRTDZsNVIzUU51YVM5eTlxVXZIT3JkbFdSNzFmWUhLV1FYMGs2aThIeUFNd2RYN2dIWlZGTVdSYXp1K3ZvQVhBSnFIUUFxTXN0VmpTWU56RGFJTjFTQUF0QVFLTHlUZ1oxTkE0RDBFdkRpNVVranRLejdCQUZRTEtxb2E3VEZvaUJpaTFJYXUwV3RDeUN6UDgxbm9HNk5yYzRHK0tKclBvL0ZTdlVPTWw2ZURxamc0dEpRU2hSRDBIS3k4ZkJHNjEyZ1MwTFlSU01iVHAwLzNreVFCS0NCT3R0VnI5TGIrZ0VYMStueFpscC91NysvbnNXNjZiWC8vQWEyTU5FdUFVRVhQQUFBQUFFbEZUa1N1UW1DQw==";
     
     if(!sessionStorage.userId){
    	location.href="../index.html";
    }
              

//  用户名
    var nickName = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;
    $(".nText").focus(function(){
		$(".nickNText").css("display","block");
		$(".nickNText").text('不支持特殊字符')
	})
	$(".nText").blur(function(){
		var nText = $(".nText").val();
		if(nText.match(nickName)){
		    $(".nickNText").css('display','block');
			$(".nickNText").text("")   
		}else{
			$(".nickNText").css('display','block');
			$(".nickNText").html("用户名不匹配")   
		}		
	});
	
//城市	
   var userName = /[\u4e00-\u9fa5]/;
	$(".addText").focus(function(){		
		$(".addTex").css("display","block");
		$(".addTex").text('地址精确到区')
		
	})
	
	$(".addText").blur(function(){
		var addText = $(".addText").val();
		if(addText.match(userName)){
			if(addText.length>4){			
			$(".addTex").css("display","block");
			$(".addTex").text('')
			}else{
				$(".addTex").css("display","block");
			    $(".addTex").text('地址不详细')
			}
		}else{
			$(".addTex").css("display","block");
			$(".addTex").text('地址不正确')
		}
		
	})
	
//	qq号
var regqq = /[1-9][0-9]{4,14}/;     //要求5~15位，不能以0开头，只能是数字*/  
	$(".telText").focus(function(){
		$(".telTex").css("display","block");
		$(".telTex").text('请输入正确qq号');
	})
	
	$(".telText").blur(function(){
		var telText= $(".telText").val();
		if(telText.match(regqq)){
			if(telText.length<12){
				$(".telTex").css("display","block");
		        $(".telTex").text('');
			}else{
				$(".telTex").css("display","block");
		        $(".telTex").text('qq号不能大于11位');
			}
		}else{
			 $(".telTex").css("display","block");
		     $(".telTex").text('qq号不正确');
		}
	})
	
//  密码	
	var pasExp = /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,}$/;
	 $(".pasText").focus(function(){
	 	$(".passO").css("display","block");
	 	$(".passO").text("请输入正确密码")
	 })
	
	$(".pasText").blur(function(){
		var pasText = $(".pasText").val();
		if(pasText.match(pasExp)){
			$(".passO").css("display","block");
	 	    $(".passO").text("");
		}else{
			$(".passO").css("display","block");
	 	    $(".passO").text("密码不正确");
		}	 	
	 })
	
	 $(".newTwoText").focus(function(){
	 	$(".passTwo").css("display","block");
	 	$(".passTwo").text("请输入正确密码")
	 })
	
	$(".newTwoText").blur(function(){
		var newTwoText = $(".newTwoText").val();
		if($(".pasText").val() == $(".newTwoText").val() ){
			 if(newTwoText.match(pasExp)){
			$(".passTwo").css("display","block");
	 	    $(".passTwo").text("");
		}else{
			$(".passTwo").css("display","block");
	 	    $(".passTwo").text("密码不正确");
		}	
	}else{
		$(".passTwo").css("display","block");
	 	$(".passTwo").text("密码不相等");
	}
		 	
	 })
	
	
	 $(".beSureText").focus(function(){
	 	$(".passThree").css("display","block");
	 	$(".passThree").text("请输入正确密码")
	 })
	
	$(".beSureText").blur(function(){
		if($(".beSureText").val() == $(".newTwoText").val()){
		var beSureText = $(".beSureText").val();
		if(beSureText.match(pasExp)){
			$(".passThree").css("display","block");
	 	    $(".passThree").text("");
		}else{
			$(".passThree").css("display","block");
	 	    $(".passThree").text("密码不正确");
		}
	}else{
		$(".passThree").css("display","block");
	 	$(".passThree").text("密码不相等");
	}
		
})
	
	
function person(){
	$.ajax({
	type: "post",
	url: ""+ip+"/users/gerenaing",
	async: true,
	data: {
		uid:uid
	},
	success: function(data) {
//		console.log(data);
		$(".nText").val(data[0].name);
		$(".addText").val(data[0].suozaichengs);
		$(".telText").val(data[0].shoujih);
		$(".pasText").val(data[0].password);
		$(".newTwoText").val(data[0].password);
		$(".beSureText").val(data[0].password);

		$(".upImg").attr('src',$.base64.atob(data[0].images))	
		jieImg = data[0].images
		if(data[0].xingbye=="女"){
			$(".girl").attr("checked","checked")
		}else if(data[0].xingbye=="男"){
			$(".boy").attr("checked","checked")
		}else if(data[0].xingbye=="保密"){
			$(".Preservation").attr("checked","checked")
		}

	  }

   })
}
	
function person2(){
	$.ajax({
	type: "post",
	url: ""+ip+"/users/gerenaing",
	async: true,
	data: {
		uid:sessionStorage.userId
	},
	success: function(data) {
		if(data.length>0){
		console.log(data);
		$(".nText").val(data[0].name);
		$(".addText").val(data[0].suozaichengs);
		$(".telText").val(data[0].shoujih);
		$(".pasText").val(data[0].password);
		$(".newTwoText").val(data[0].password);
		$(".beSureText").val(data[0].password);
		$("#view").css("background-image","");
		$(".upImg").css("display","block");
		if(data[0].images=="1.jpg"){
		$(".upImg").attr('src',$.base64.atob(csImgp));
		}else if(data[0].images==csImgp){
			$(".upImg").attr('src',$.base64.atob(csImgp));
		}else{
		$(".upImg").attr('src',$.base64.atob(data[0].images));
		jieImg = data[0].images	
		}	
//      console.log($.base64.atob(data[0].images))
		if(data[0].xingbye=="女"){
			$(".girl").attr("checked","checked")
		}else if(data[0].xingbye=="男"){
			$(".boy").attr("checked","checked")
		}else if(data[0].xingbye=="保密"){
			$(".Preservation").attr("checked","checked")
		}
	   }
	
	 }

   })
}

   if(uid){
   	  person()
   }else{
   	  person2()
   }

	
	

var file;
var packageSrc = '';
var imgSrc = '';
var off=false;

var dataUrl;

//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	$(".img").click(function(){
	  $('.img').change(function() {
		file = this.files[0];
	    if(file.size < 153600) {
		$("#tops").css("top","0");
		$(".imgText").css("display","none");
	  }
	})
		
	})
	
	$("#clipBtn").click(function(){
		$("#tops").css("top","-600px");
		$(".upImg").css("display","none");
	})
	
	$("#clipArea").photoClip({
		width: 200,
		height: 200,
		file: "#file",
		view: "#view",
		ok: "#clipBtn",
		loadStart: function() {
			console.log("照片读取中");
		},
		loadComplete: function() {
			console.log("照片读取完成");
		},
		clipFinish: function(dataURL) {	
			dataUrl=dataURL;
			tops.style.top = '-100%';
			console.log(dataURL.length);
			if(dataURL.length<75000){
				jieImg=$.base64.btoa(dataURL);
//				console.log(jieImg);
			}else{
				layer.msg('图片过大不可提交，请重新选择图片！',{time:2000});
			}
		}
	});
    
$('.img').change(function() {
	file = this.files[0];
	if(file.size > 153600) {
		layer.msg('图片过大哦！',{time:1000});
		$(".imgText").css("display","none");
		return;
	} else {
		var fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = function(event) {
			imgSrc = event.target.result; //返回的dataURL  
//			console.log(imgSrc)
			$('.upImg').attr('src', imgSrc);
		}
		var formdata = new FormData();
		formdata.append("uploadeFile", file);
		$.ajax({
			url: ""+ip+"/yanzhengs/huang",
			type: "post",
			data: formdata,
			contentType: false,
			processData: false,
			success: function(data) {
//				console.log(data)
				if(data.nem == '正常') {						
					off=true;										
				}
			}
		})
	}
})


$(".img").click(function(){
	$(".imgText").css("display","block");
	setTimeout(function(){
		$(".imgText").css("display","none");
	},6000)
})

	function upperson(){
		var obj = document.getElementsByClassName("zhj_sex");
    	for(var i=0;i<obj.length;i++){
      	 	 if(obj[i].checked){
           		var abc = obj[i].value;
       		 }
   		}
		var nText = $(".nText").val();
		var addText = $(".addText").val();
		var telText= $(".telText").val();
		var pasText = $(".pasText").val();
		if(nText.match(nickName)){
			if(addText.match(userName)){
				if(telText.match(regExp)){
					if(pasText.match(pasExp)){
						$.ajax({
							type: "post",
							url: ""+ip+"/users/ziliao",
							async: true,
							data: {
								uid:uid,
								name:nText,
								suozaichengs:addText,
								images:imgSrc,
								xingbye:abc,
								shoujih:telText,
								password:pasText
							},
							success: function(data) {
//								console.log(data);
							}
						})		
					}else{
						alert("密码不对")
					}
				}else{
					alert("手机号不对")
				}
			}else{
				alert("地址不对")
			}
		}else{
			alert("用户名不对")
		}	
	}
	
	function upperson2(){		
		var obj = document.getElementsByClassName("zhj_sex");
    	for(var i=0;i<obj.length;i++){
      	 	 if(obj[i].checked){
           		var abc = obj[i].value;
       		 }
   		}
		var nText = $(".nText").val();
		var addText = $(".addText").val();
		var telText= $(".telText").val();
		var pasText = $(".pasText").val();
		if(nText.match(nickName)){
			if(addText.match(userName)){
				if(telText.match(regqq)){
					if(pasText.match(pasExp)){
						if(jieImg){							
//							if(dataUrl.length<75000){
				            $.ajax({
								type: "post",
								url: ""+ip+"/users/ziliao",
								async: true,
								data: {
									uid:sessionStorage.userId,
									name:nText,
									suozaichengs:addText,
									images:jieImg,
									xingbye:abc,
									shoujih:telText,
									password:pasText
								},
								success: function(data) {																											
								  console.log(data);	
								  layer.msg('修改完成咯！',{time:1000});
//	                             setTimeout(function(){
//	                             	  location.href='../index.html'
//	                             },2000)								
								}
							})
//		             		}else{
//		             			layer.msg('图片过大哦，请重新选择图片！',{time:1000});
//		             		}
						}else if($.base64.atob(csImgp)){
								$.ajax({
								type: "post",
								url: ""+ip+"/users/ziliao",
								async: true,
								data: {
									uid:sessionStorage.userId,
									name:nText,
									suozaichengs:addText,
									images:"1.jpg",
									xingbye:abc,
									shoujih:telText,
									password:pasText
								},
								success: function(data) {																											
								  console.log(data);	
								  layer.msg('修改完成咯！',{time:1000});
//	                             setTimeout(function(){
//	                             	  location.href='../index.html'
//	                             },2000)								
								}
							})
							}else{
							$.ajax({
								type: "post",
								url: ""+ip+"/users/ziliao",
								async: true,
								data: {
									uid:sessionStorage.userId,
									name:nText,
									suozaichengs:addText,
									images:jieImg,
									xingbye:abc,
									shoujih:telText,
									password:pasText
								},
								success: function(data) {																											
								  console.log(data);	
								  layer.msg('修改完成咯！',{time:1000});
//	                             setTimeout(function(){
//	                             	  location.href='../index.html'
//	                             },2000)								
								}
							})
						}
								
					}else{
						layer.msg('密码不对哦！',{time:1000});
					}
				}else{
					layer.msg('qq号不正确哦！',{time:1000});
				}
			}else{
				layer.msg('地址不对哦！',{time:1000});
			}
		}else{
			layer.msg('用户不对哦！',{time:1000});
		}	
	}

	
	$(".baoCun").click(function(){			
		if(uid){
			upperson()
		}else{			
			upperson2()
		}
		
	})

	
},false);