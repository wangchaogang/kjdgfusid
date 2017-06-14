window.addEventListener('load', function() {
	var ip = "http://47.92.145.129:8000" //ip地址

	if(!sessionStorage.userId) {
		location.href = "../index.html";
	}

	var csImg = "ZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFFQUFBQUJBQ0FZQUFBQ3FhWEhlQUFBR3hrbEVRVlI0WHRWYmJWTGNOaGlXMXZtVHNET2xKK2ptSDBUS05Kd2djSUxTRXdST1VIS0N3Z215bkNEYkV4Uk9rT1VFQ1JNcnliOXNUMUFZN09HUGpUclBqdXlSdGZKYWx1UWwxUXd6d0hyMThlajlmTjdYbEF3OEpwUEo5ck5uejE2UFJxTlhVc29KcFhTaWx0dzNscDdqYnlubGdsS0tuL25kM2QzMVlyRzRHWEtMZElqSkdXT3ZDQ0Z2Q0NIN2xGTDg3ajJrbEo4SUlmT3lMTSsvZmZ1MjhKNm81WXZSQU1CTmo4ZmpOMUxLbzlCRHR4MVNnVEhOOC93eWxtUUVBNkFPL2djaDVJUVFzaDM3aGxybWcxcE1zeXc3RHdVaUNBREcyQnRLNlhTREJ6Znh1Q25MOHZqcjE2OFh2c0I3QWJDenN6TjU4dVRKZStpNDc4S1J2emN2aXVMWXgwYjBCbUIzZC9jd1NSSWNmbFBpN29xVmx6VDBBb0F4OW81U0NsMy9ZWWVVY2lxRWVPdTZRV2NBR0dQdkthVkhyaE0vNW5OU3lwa1E0dGhsRDA0QURIVjRLZVUvMkNTbDlCZVh6Zlo1eGhXRVRnQmlIbDVLZVVrSXVjanovTUowWDNDblcxdGJoNFNRUTBycGIzME91eVp1NkpTRXRRQzhlUEZpT2hxTjRPT0RocFR5cjdJc1QxMnROTHhNa2lTbmxGSkVrMEhqNGVIaC9NdVhMNjEycXhVQVplMy9EbHFka0Z2Y2FKcW15emkvNytDY3c4M0N4Ly9VOTd2NjgyVlovdDRXSzFnQlVINytZNGlyVS9wOUtJUkFMTjhZTDErK2ZDMmxiTVFRU0g0K2YvNThaVDZyOG9xTFFEdHhVeFRGbmswQ3JRQnd6ajhFQmptM09LQjVlTTc1bngwaE0wTGMwelJOejNVZ0FBSUFDcFNFZVpxbUJ5YkFLd0F3eHBETUlORHhIcWJJS1FQM3dUVkpRdEtUNS9tQmJpaGpxS1JORlJvQXFNVG1lNGpvRTBLdTBqU3R4VnNkL3FQR0F6Z0JDMTRnei9NOUhRVE9PYVRndGRNRWxvZHNjellBNEp5ZkVrSWdwdDVEU3Jtbml6NWpESWYzNVFRYVlxdU1JdFF6Wkp5bGFZcHpMa2NOUUl6YmwxSmVDeUhxdzhaUUp5bmxzUkJpVm0yWU1mYUpVdnByQUFJM1daWTlyeVNyQm9BeGRrSXBmUmN3TWI3YVFEZnc5cGRiZ1QwUVF1eFYrNG9SbStpZzZnQjg3NnVuRnJBT0twK3ZYQ25zU2ZBb2l1SjU1Y0ppcUlFTzZoSUE1V2JnOTRPR3J2OHhOcXB0cGdZMjFyd1ZxRXNBWW9nVjVrblROTFpLVldyUXNBT2NjeGwwVTRTUUtrU3VKQ0RFVXRkN01RQUlqaWVxaVUzL0hRT0FTZzJvc3Y3L2hpS3FERmJ0QW1PSnF0cFhkQlhBdkZtVy9VeGpSRmhEM2hRaDVEWk4wNXAraStGYWRkdENZd1EvMVlSSWU0VVFOV3ZFR0p1RnByUkR6S2tCY0VZWlk4aTBZaEVRQ3lIRTgycUJHSzVRZDRHWWwzTU9kWTFDeUFKY1NFQlFmRzNhRGt2azVoMWdTU25mQ2lGUWQxaU95T0tQS2E4Z0FURUNvQm9IVzhMaG93cW02UHNtVlIzRy9Rb1NFT3hUTFZLd3dzV3BVQnRKU0JlN0F5N2hSSS8vMWUwUHdrb1BBb0J5aVkzZ0JmOVRwWEp3ZlNBK0cwd3dHQ1JLNlN6THNxbEptQTRnK3ZXZERRWkFHd2k2dEtoWUFSRmtLMmZJT1FjcFc5dUJHUEdLUHNlZ0FDZ1FHb2FzendFaVphaHJsNFFSUkRkRzlNSUVMS3ppOTd3WTRXclhTa3BnTzd5Wm9EVUlMSTFnVkRlSXlNMW14R3liQUR1TS85dllZUFA1SGthMGo1QXQzV0RNUU9pNkxNdERHLzJzZ2lJRVhPQUxVUUd5RGRRQVVPcStiSnNqU1JMc040UVIwbDMyTWhBSzVnR1ZybC9uZWI1dkszbU54Mk1Zc3BxSGM3eWlVMXNIaUlvSDVwRkFPSXVTRElFTHRCMCtRaStCdGVZZkVZU0RHT253YlpabEUvUG1WUkdrNzYyM0NRZUtKV2Y2aHlxTlI5ZFlWMkRWS25ETGRGaEZXU0ZNYTUycmE1WTdpbG9aTzI4UXJ2Z3NoSE9vR093Z1NnemxiaUZFdzZBTkdiV1ppWmE2UEM4amJsSmlxTDMxSmtYTlZEVkcrdHRsSUdPdFdSRzRPb25aS3lBeXN6VWxrcUZGMWE3ejQvT1ZJbWZmYkZNdjRIaXp1SllTV0RRU3RBc0ZVeFg2MmdLZFp6QkxZNjVXdGNIVGJmRDJLMnhXcElCemp0SzZpMGRvZUMydjRxaUZwL095SVYwM3ZlNXoweGIwaUdqdHhWRXMxc08zTmlhSkZVMzJCTVJuRHlzeGkyK0RSTVAzRDVCUXVXRFI2RU53b2ZkdGJyU3RSYVlyUXpRQmlFNnJ1U0NnVjZJY0RHRURzR3IrZFUxU2FHNnlHaFhkaW02Q3RHZ0RRMitHN0dqanZTMks0cFZ6a3hRV2RCRXBsMXY2RVo3cDNTWlhiVHBXMWZneFFmQnVsS3cyM1RmS2VzekRtbXZib2xYem1jNWU0WkNFNHpIQmNEazg5dWNFZ0FJaHVOQzVLVUJjRDk4TEFEejhmN0FKWFRydnBRTDZsNVIzUU51YVM5eTlxVXZIT3JkbFdSNzFmWUhLV1FYMGs2aThIeUFNd2RYN2dIWlZGTVdSYXp1K3ZvQVhBSnFIUUFxTXN0VmpTWU56RGFJTjFTQUF0QVFLTHlUZ1oxTkE0RDBFdkRpNVVranRLejdCQUZRTEtxb2E3VEZvaUJpaTFJYXUwV3RDeUN6UDgxbm9HNk5yYzRHK0tKclBvL0ZTdlVPTWw2ZURxamc0dEpRU2hSRDBIS3k4ZkJHNjEyZ1MwTFlSU01iVHAwLzNreVFCS0NCT3R0VnI5TGIrZ0VYMStueFpscC91NysvbnNXNjZiWC8vQWEyTU5FdUFVRVhQQUFBQUFFbEZUa1N1UW1DQw=="

	var miyao;
	//个人资料
	function imgben() {
		$.ajax({
			type: "post",
			url: "" + ip + "/users/gerenaing",
			async: true,
			data: {
				uid: sessionStorage.userId
			},
			success: function(data) {
				//console.log(data)
				//console.log(data[0].images);

				if(data[0].images == "1.jpg") {
					$(".upImg").attr("src", $.base64.atob(csImg));
					$(".zhj_personTopName").text(data[0].name);
				} else {
					$(".zhj_personTopName").text(data[0].name);
					$(".upImg").attr('src', $.base64.atob(data[0].images));
				}
			}
		})
	}
	imgben();
	
//调取个人店铺
	$.ajax({
		type: "get",
		url: "" + ip + "/personal/people",
		async: true,
		data: {
			Applicant: sessionStorage.userId
		},
		success: function(data) {
			console.log(data);
			if(data.flag == 1) {
				console.log("查询成功");
				//console.log(data);				 
				$(".zhj_notCertified i").attr("class", "glyphicon glyphicon-eye-open");
				$(".zhj_notCertified span").text("已认证");
				$(".zhj_shop").css("display", "none")
//				$(".allFB").append('<a href="publishProject.html"><div class="zhj_jiajia"><img src="../images/onImg.png" alt="" /></div></a>');
//插入初始钱包钱数	   点击头像名字实现效果
					$.ajax({
						type: "post",
						url: "" + ip + "/tixian/crqb",
						async: true,
						data: {
							qMoney: 0,
							qUserId: sessionStorage.userId
						},
						success: function(data) {
						   $.ajax({
								type: "get",
								url: "" + ip + "/tixian/qb",
								async: true,
								data: {
									qUserId: sessionStorage.userId
								},
								success: function(data) {
									if(data.length > 0) {
										$(".inputTxt").text(data[0].qMoney);
									}
					
								}
							})
						}
					})
			    }
			
			else if(data.flag == 3) {
				console.log("没有该用户信息");
				$(".fabu").css("display", "none");
				$(".qbao").css("display", "none");
				$(".zhj_wallet").css("display", "none")
				$(".zhj_Releases").css("display", "none");
				$(".gmjilu").css('color', '#555555').css("border-bottom", "2px solid #555555").css("background", "white");
				$(".zhj_purchase").css("display", "block");
				$(".zhj_resume").css("display", "none");
				$(".gmjilu").click(function() {
					$(".zhj_purchase").css("display", "block");
					$(".zhj_resume").css("display", "none");
					$(".gmjilu").css('color', '#555555').css("border-bottom", "2px solid #555555").css("background", "white");
					$(".jianli").css('color', 'rgba(0,0,0,0.6)').css("border-bottom", "2px solid #dddddd").css("background", "#F7F7F7");

				})
				$(".jianli").click(function() {
					$(".zhj_resume").css("display", "block");
					$(".zhj_purchase").css("display", "none");
					$(".jianli").css('color', '#555555').css("border-bottom", "2px solid #555555").css("background", "white");
					$(".gmjilu").css('color', 'rgba(0,0,0,0.6)').css("border-bottom", "2px solid #dddddd").css("background", "#F7F7F7");
				    })
		}
	   }
	})


//查询团队密钥
	$.ajax({
		type: "get",
		url: "" + ip + "/tenter/searchkeys",
		async: true,
		data: {
			companykeyss: sessionStorage.userId //登录人uid
		},
		success: function(data) {
			console.log(data);			
			if(data.flag == 1) {
				console.log("查询成功");
				miyao = data.result[0].tkey;
//					console.log(data);
				$(".zhj_notCertified i").attr("class", "glyphicon glyphicon-eye-open")
				$(".zhj_notCertified span").text("已认证");
				$(".butn").css("display", "block");
//				$(".allFB").append('<a href="publishProject.html"><div class="zhj_jiajia"><img src="../images/onImg.png" alt="" /></div></a>');
			}else if(data.flag == 3){
				console.log("查询不到");
			       }
		         }
	          })



// 查询企业密钥
	$.ajax({
		type: "get",
		url: "" + ip + "/qenter/searchkeys",
		async: true,
		data: {
			companykeyss: sessionStorage.userId //登录人uid
		},
		success: function(data) {
			console.log(data);
				//console.log(data.result[0].qkey)
				if(data.flag == 1) {
					miyao = data.result[0].qkey;
					console.log("查询成功");
					$(".zhj_notCertified i").attr("class", "glyphicon glyphicon-eye-open")
					$(".zhj_notCertified span").text("已认证");
					$(".butn").css("display", "block");
//					$(".allFB").append('<a href="publishProject.html"><div class="zhj_jiajia"><img src="../images/onImg.png" alt="" /></div></a>');
				}else if(data.flag == 3){
					console.log("查询不到");																
	        }
		   }
	     })

















	$(".butn").click(function() {
		$(".hqqb").css("display", "block");
		$(".miyaoText").text(miyao)
	})

	$(".mybeSure").click(function() {
		$(".hqqb").css("display", "none");
	})

	// 初始我的发布     
	function fbb() {
		$.ajax({
			type: "get",
			url: "" + ip + "/djsList/issueList",
			async: true,
			data: {
				uid:sessionStorage.userId
			},
			success: function(data) {
				console.log(data);
				$(".allFB .zhj_jiajia").remove();
				if(data.success == "查无数据") {
					$(".allFB").append('<a href="publishProject.html"><div class="zhj_jiajia"><img src="../images/onImg.png" alt="" /></div></a>');
					return
				} else {                   
					var fbTxt = ''
					for(var i = 0; i < data.data.length; i++) {
						fbTxt += '<a href="listDetails.html?' + data.data[i].listid + '"><div class="zhj_Modular"><div class="zhj_ModularImg"><img src="' + $.base64.atob(data.data[i].cover) + '" alt="" /></div><div class="zhj_Title">' + data.data[i].tradename + '</div><div class="zhj_price">' + data.data[i].pricing + '</div></a><div class="zhj_cuo" id=' + data.data[i].listid + '><i class="glyphicon glyphicon-remove-circle"></i></div></div>'
					}
					$(".allFB").append(fbTxt);
					$(".allFB").append('<a href="publishProject.html"><div class="zhj_jiajia"><img src="../images/onImg.png" alt="" /></div></a>');
//					$(".allFB .zhj_jiajia:nth-child(1)").remove();

				}
			}
		})
	}

	fbb()

//	初始化购买记录		        
//	       function gmjl2(){
//	      	$.ajax({
//				type: "get",
//				url: ""+ip+"/djsList/buyList",
//				async: true,
//				data: {
//					purchaserid:sessionStorage.userId
//				},
//				success: function(data) {				
//					console.log(data);
//					if(data.success=="查无数据"){
//						return
//					}else{
//						$(".allJL").children().remove();
//					for(var i=0;i<data.data.length;i++){
//					$.ajax({
//					type: "get",
//					url: ""+ip+"/djsList/listDetails",
//					async: true,
//					data: {
//						listId:data.data[i].commodityid
//					},
//					success: function(data) {
//	//					console.log(data);
//						var JlTxt='';						
//						for(var i=0;i<data.data.length;i++){
//						JlTxt+='<a href="listDetails.html?'+data.data[i].listid+'"><div class="zhj_purchaseModule"><div class="zhj_purchaseModules"><img src="'+$.base64.atob(data.data[i].cover)+'" alt="" /></div><div class="zhj_purchaseTitle">'+data.data[i].tradename+'</div><a href="http://47.92.145.129:8000/'+data.data[i].package+'"><div class="zhj_purchaseprice">下载</div></a></a><div class="zhj_jmcuo"><i class="glyphiconglyphicon-remove-circle" id=' +data.data[i].listid + '></i></div></div>'
//					}
//					$(".allJL").append(JlTxt);
//					}
//				  })
//				}
//			  }			
//			 }
//		    })
//	    } 
	
//	  gmjl2()

	$(".zhj_reset").hover(function() {
		$(".zhj_hoverReset").css('opacity', '1');
	}, function() {
		$(".zhj_hoverReset").css('opacity', '0');
	})

	$(".zhj_shop").hover(function() {
		$(".zhj_hoverShop").css('opacity', '1');
	}, function() {
		$(".zhj_hoverShop").css('opacity', '0');
	})

	$(".zhj_Release").eq(0).css('color', '#555555').css("border-bottom", "2px solid #555555").css("background", "white");
	$(".zhj_Release").click(function() {
		var a = $(this).index(".zhj_Release")
		$(".zhj_Release").eq(a).css('color', '#555555').css("border-bottom", "2px solid #555555").css("background", "white");
		$(".zhj_Release").eq(a).siblings('div').css('color', 'rgba(0,0,0,0.6)').css("border-bottom", "2px solid #dddddd").css("background", "#F7F7F7");
	})

	$(".zhj_wallet").css("display", "none");
	$(".zhj_Releases").css("display", "block");
	$(".zhj_purchase").css("display", "none");
	$(".zhj_resume").css("display", "none");
	$(".zhj_Release").eq(0).click(function() {
		$(".zhj_wallet").css("display", "none");
		$(".zhj_Releases").css("display", "block");
		$(".zhj_purchase").css("display", "none");
		$(".zhj_resume").css("display", "none");

		//我的发布 
		function fbb() {
			$.ajax({
				type: "get",
				url: "" + ip + "/djsList/issueList",
				async: true,
				data: {
					uid: sessionStorage.userId
				},
				success: function(data) {
					$(".allFB").children().remove();
					$(".allFB .zhj_jiajia").remove();
					console.log(data);
					if(data.success == "查无数据") {
						$(".allFB").append('<a href="publishProject.html"><div class="zhj_jiajia"><img src="../images/onImg.png" alt="" /></div></a>');
						return
					} else {
						$(".allFB .zhj_jiajia").remove();
						var fbTxt = ''
						for(var i = 0; i < data.data.length; i++) {
							fbTxt += '<a href="listDetails.html?' + data.data[i].listid + '"><div class="zhj_Modular"><div class="zhj_ModularImg"><img src="' + $.base64.atob(data.data[i].cover) + '" alt="" /></div><div class="zhj_Title">' + data.data[i].tradename + '</div><div class="zhj_price">' + data.data[i].pricing + '</div><div class="zhj_cuo"><i class="glyphicon glyphicon-remove-circle"></i></div></div></a>'
						}
						$(".allFB").append(fbTxt);
						$(".allFB").append('<a href="publishProject.html"><div class="zhj_jiajia"><img src="../images/onImg.png" alt="" /></div></a>');
					}
				}
			})
		}
		fbb()
	})
	
//点击发布中的删除时
	$(".allFB").delegate(".zhj_cuo","click",function(){
		var fbId = $(this).attr("id");
		console.log(fbId)
		var index = $(this).index(".zhj_cuo");
		$.ajax({
			type: "get",
			url: "" + ip + "/djsList/listDel",
			async: true,
			data: {
				listId: fbId
			},
			success: function(data) {
				if(data.success=="success") {
					console.log("删除成功");
					layer.msg('删除成功', {
						time: 1000
					});
					$(".zhj_Modular").eq(index).remove()
				}
			}
		})	
	})	

	$(".zhj_Release").eq(1).click(function() {
		$(".zhj_wallet").css("display", "none");
		$(".zhj_Releases").css("display", "none");
		$(".zhj_purchase").css("display", "block");
		$(".zhj_resume").css("display", "none");

		//购买记录		        
		function gmjl2() {
			$.ajax({
				type: "get",
				url: "" + ip + "/djsList/buyList",
				async: true,
				data: {
					purchaserid: sessionStorage.userId
				},
				success: function(data) {
//					console.log(data);
					if(data.success == "查无数据") {
						return
					} else {
						$(".allJL").children().remove();
						for(var i = 0; i < data.data.length; i++) {
							$.ajax({
								type: "get",
								url: "" + ip + "/djsList/listDetails",
								async: true,
								data: {
									listId: data.data[i].commodityid
								},
								success: function(data) {
									console.log(data);
									if(data.success == 'success'){
										var JlTxt = '';
									for(var i = 0; i < data.data.length; i++) {
							JlTxt+='<a href="listDetails.html?'+data.data[i].listid+'"><div class="zhj_purchaseModule"><div class="zhj_purchaseModules"><img src="'+$.base64.atob(data.data[i].cover)+'" alt="" /></div><div class="zhj_purchaseTitle">'+data.data[i].tradename+'</div></a><a href="http://47.92.145.129:8000/'+data.data[i].packageUrl+'"><div class="zhj_purchaseprice">下载</div></a></div>'
						}
									$(".allJL").append(JlTxt);
									}
									
								}
							})
						}
					}
				}
			})

		}
		gmjl2()
	})

//   	
////点击购买中的删除时
//			$(".allJL").delegate(".zhj_jmcuo","click",function(){
//				var jlId = $(this).attr("id");
//				console.log(jlId)
//				var indexs = $(this).index(".zhj_jmcuo");
//				$.ajax({
//					type: "get",
//					url: "" + ip + "/djsList/listDel",
//					async: true,
//					data: {
//						listId: jlId
//					},
//					success: function(data) {
//						if(data.success=="success") {
//							console.log("删除成功");
//							layer.msg('删除成功', {
//								time: 1000
//							});
//							$(".zhj_purchaseModule").eq(indexs).remove()
//						}
//					}
//				})	
//			})


	$(".zhj_Release").eq(2).click(function() {
		$(".zhj_wallet").css("display", "block");
		$(".zhj_Releases").css("display", "none");
		$(".zhj_purchase").css("display", "none");
		$(".zhj_resume").css("display", "none");
	})

	$(".zhj_Release").eq(3).click(function() {
		$(".zhj_wallet").css("display", "none");
		$(".zhj_Releases").css("display", "none");
		$(".zhj_purchase").css("display", "none");
		$(".zhj_resume").css("display", "block");

		//我的简历	
		function jl2() {
			$.ajax({
				type: "get",
				url: "" + ip + "/resume/fbrxx",
				async: true,
				data: {
					RPublisherId: sessionStorage.userId
				},
				success: function(data) {
					//			console.log(data);
					$(".allJls").children().remove();
					var Jltext = '';
					//         console.log(data);
					for(var i = 0; i < data.length; i++) {
						Jltext += '<div class="resumeAll"><div class="resumeAll_left">' + data[i].Fullname + '</div><div class="resumeAll_line"></div><div class="resumeAll_nickName">' + data[i].JobTitle + '</div><div class="resumeBtnO" id=' + data[i].resumeId + '>删除</div><div class="resumeBtnT" id=' + data[i].resumeId + '>编辑</div></div>'
					}
					$(".allJls").append(Jltext);
				}
			})
		}

		jl2()

	})

	//点击编辑	
	$(".allJls").delegate(".resumeBtnT", "click", function() {
		//		console.log($(this).attr("id"))
		var tiaoId = $(this).attr("id");
		location.href = "I_want_to_apply.html?" + tiaoId
	})

	//点击删除	
	$(".allJls").delegate(".resumeBtnO", "click", function() {
		//		console.log($(this).attr("id"));
		var jlId = $(this).attr("id");
		var index = $(this).index(".resumeBtnO");
		//		console.log(index)
		$.ajax({
			type: "get",
			url: "" + ip + "/resume/jldel",
			async: true,
			data: {
				resumeId: jlId
			},
			success: function(data) {
				//			console.log(data);
				if(data.flag == 2) {
					console.log("删除成功");
					layer.msg('删除成功', {
						time: 1000
					});
					$(".resumeAll").eq(index).remove()
				} else if(data.flag == 1) {
					console.log("后台错误");
				} else {
					console.log("删除失败");
				}
			}
		})
	})

	//提现金额	
	$(".walletCash").click(function() {
		$(".zhj_Withdrawals").css("display", "block")
	})

	$(".cuo").click(function() {
		$(".zhj_Withdrawals").css("display", "none")
	})

	$(".cancel").click(function() {
		$(".zhj_Withdrawals").css("display", "none");
	})

	//提现交易明细
	function txmx2() {
		$.ajax({
			type: "get",
			url: "" + ip + "/tixian/qianbao",
			async: true,
			data: {
				TuseId: sessionStorage.userId
			},
			success: function(data) {
//				console.log(data);
				var html = '';
				for(var i = 0; i < data.length; i++) {
					if(data[i].speed == 0) {
						data[i].speed = "审核不通过";
					} else {
						data[i].speed = "审核已通过";
					}

					html += '<div class="jine"><span class="allje">' + data[i].tMoney + '</span><span class="allLine"></span><span class="allNumb">' + data[i].baoBao + '</span><span class="allLine2"></span><span class="alljindu">' + data[i].speed + '</span></div>'
				}
				$(".allList").append(html);
			}
		})
	 }
	
	txmx2()
	
	//获取钱包钱数  
//	function hqqb2() {
//		$.ajax({
//			type: "get",
//			url: "" + ip + "/tixian/qb",
//			async: true,
//			data: {
//				qUserId: sessionStorage.userId
//			},
//			success: function(data) {
////				console.log(data)
//				if(data.length > 0) {
//					$(".inputTxt").text(data[0].qMoney);
//				}
//
//			}
//		})
//
//	}
//	hqqb2()

	//修改钱包    点击购买时   测试版点击 钱包里的弹出提示模板几个字
//	function xiuqb2() {
//			$.ajax({
//				type: "post",
//				url: "" + ip + "/tixian/qbc",
//				async: true,
//				data: {
//					qMoney: 1000,
//					qUserId: sessionStorage.userId
//				},
//				success: function(data) {
////					console.log(data);
//				}
//			})
//		}
//	
//	$(".smrz").click(function() {		
//		xiuqb2()
//
//	})

	var telExp = /^1[3'/4578]\d{9}$/;
	var regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	var pasExp = /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,}$/;

	$(".AlipayInp").focus(function() {
		$(".datazhb").css("display", "block");
		$(".datazhb").text('支护宝格式为手机号或邮箱');
	})
	$(".AlipayInp").blur(function() {
		var telText = $(".AlipayInp").val();
		if(telText.match(telExp) || telText.match(regEmail)) {
			$(".datazhb").css("display", "block");
			$(".datazhb").text('');
		} else {
			$(".datazhb").css("display", "block");
			$(".datazhb").text('支护宝格式不正确哦！');
		}
	})

	$(".VerificationInp").focus(function() {
		$(".datapas").css("display", "block");
		$(".datapas").text('密码格式为数字加英文哦！');
	})
	$(".VerificationInp").blur(function() {
		var pasText = $(".VerificationInp").val();
		if(pasText.match(pasExp)) {
			$(".datapas").css("display", "block");
			$(".datapas").text('');
		} else {
			$(".datapas").css("display", "block");
			$(".datapas").text('密码格式不正确哦！');
		}
	})

	$(".beSure").click(function() {
		var newM = $(".priceInp").val();
		var zhb = $(".AlipayInp").val();
		var kmPas = $(".VerificationInp").val();

		function allqb2() {
			$.ajax({
				type: "get",
				url: "" + ip + "/tixian/qianbao",
				async: true,
				data: {
					TuseId: sessionStorage.userId
				},
				success: function(data) {
					$.ajax({
						type: "get",
						url: "" + ip + "/tixian/qb",
						async: true,
						data: {
							qUserId: sessionStorage.userId
						},
						success: function(data) {
							//			console.log(data);
							//			  console.log(data[0].qMoney);
							var sMoney = data[0].qMoney;
							if(newM < sMoney) {
//								console.log('你的钱包钱数大于你输入的钱数，可以提现哦！');
								if(newM != "") {
									if(newM >= 100) {
										if(zhb != "") {
											if(kmPas != "") {
												if(zhb.match(telExp) || zhb.match(regEmail)) {
													if(kmPas.match(pasExp)) {

														$.ajax({
															type: "post",
															url: "" + ip + "/tixian/tixian",
															async: true,
															data: {
																tMoney: newM,
																baoBao: zhb,
																speed: 0,
																TuseId: sessionStorage.userId
															},
															success: function(data) {
//																console.log(data)
																layer.msg('提现成功，待审核哦……', {
																	time: 1000
																});
																$(".priceInp").val("");
																$(".AlipayInp").val("");
																$(".VerificationInp").val("");
																//											console.log(data);									
																$(".zhj_Withdrawals").css("display", "none");

																$(".zhj_wallet").css("display", "block");
																$(".zhj_Releases").css("display", "none");
																$(".zhj_purchase").css("display", "none");
																$(".zhj_resume").css("display", "none");
															}
														})

													} else {
//														console.log("密码错误");
														layer.msg('密码错误哦！', {
															time: 1000
														});
													}
												} else {
													//			     	  				console.log('no');
													layer.msg('支护宝不正确哦！', {
														time: 1000
													});
												}
											} else {
												//			     	  			console.log("咖芒密码为空哦！");
												layer.msg('咖芒密码为空哦！', {
													time: 1000
												});
											}
										} else {
											//			     	  		console.log("支护宝为空哦！");
											layer.msg('支护宝为空哦！', {
												time: 1000
											});
										}
									} else {
										layer.msg('提现金额不能低于100元哦！', {
											time: 1000
										});
									}
								} else {
									layer.msg('提现金额为空哦！', {
										time: 1000
									});
								}
							} else if(newM == sMoney) {
								layer.msg('提现后钱包就没钱了，快去充值哦！', {
									time: 1000
								});
							} else {
								layer.msg('钱包里的钱不够了哦！', {
									time: 1000
								});
							}
						}
					})
				}
			})
		}

		if(newM != "" || zhb != "" || kmPas != "") {
			allqb2()
		} else {
			return
		}
		//		$.ajax({
		//			type: "get",
		//			url: ""+ip+"/tixian/qianbao",
		//			async: true,
		//			data: {
		//				TuseId:sessionStorage.userId
		//			},
		//			success: function(data) {
		//			$.ajax({
		//			type: "get",
		//			url: ""+ip+"/tixian/qb",
		//			async: true,
		//			data: {
		//				qUserId:sessionStorage.userId
		//			},
		//			success: function(data) {
		//			console.log(data);
		////			  console.log(data[0].qMoney);
		//			   var sMoney = data[0].qMoney;
		//			     if(newM < sMoney){
		//			     	console.log('你的钱包钱数大于你输入的钱数，可以提现哦！');
		//			     	  if(newM != "") {
		//			     	  	if(zhb != "" ){
		//			     	  		if(kmPas != ""){
		//			     	  			if(zhb.match(telExp) || zhb.match(regEmail)){
		//			     	  				if(kmPas.match(pasExp)){			     	  				
		//			     	  				console.log("密码正确");
		//			     	  				$.ajax({
		//										type: "post",
		//										url: ""+ip+"/tixian/tixian",
		//										async: true,
		//										data: {
		//											tMoney: newM,
		//											baoBao: zhb,
		//											speed: 0,
		//											TuseId:sessionStorage.userId
		//										},
		//										success: function(data) {
		//											$(".priceInp").val("");
		//											$(".AlipayInp").val("");
		//											$(".VerificationInp").val("");
		//											console.log(data);									
		//											$(".zhj_Withdrawals").css("display", "none");
		//												
		//												$(".zhj_wallet").css("display", "block");
		//						$(".zhj_Releases").css("display", "none");
		//						$(".zhj_purchase").css("display", "none");
		//						$(".zhj_resume").css("display", "none");								
		//										}
		//									})						
		//			     	  				
		//			     	  				}else{
		//			     	  					console.log("密码错误")
		//			     	  				}
		//			     	  			}else{
		//			     	  				console.log('no')
		//			     	  			}		
		//			     	  		}else{
		//			     	  			console.log("咖芒密码为空哦！")
		//			     	  		}
		//			     	  	}else{
		//			     	  		console.log("支护宝为空哦！")
		//			     	  	}
		//					}else {
		//						console.log("提现为空哦！")
		//					} 	
		//			     }else if(newM == sMoney){
		//			     	console.log('你的钱包钱数等于你输入的钱数，提现后就没有了哦！');
		//			     }else{
		//			     	console.log('你的钱包里得钱数不够了哦，快去充值哦！');
		//			     }	    
		//			   }			
		//			 })
		//		   }
		//		})
	})

	$(".zhj_personReset").click(function() {
		location.href = "personalSet.html"
	})

	$(".zhj_personShop").click(function() {
		location.href = "personalShop.html"
	})

	$(".zhj_shop").click(function() {
		location.href = "personalShop.html"
	})

	$(".zhj_reset").click(function() {
		location.href = "personalSet.html"
	})

}, false);