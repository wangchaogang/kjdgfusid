window.addEventListener('load', function() {
	var listId = location.href.split('?')[1],
		uid = 0,
		salas = 0,
		html = '',
		num = 0;
	
	sessionStorage.listid = listId
	
	$(".djs_sj").click(function(){
		location.href = "commodityList.html?"+0;
	})


	if(isNaN(sessionStorage.listid) == false) {
		console.log(111)
		listId = listId.split("#")[0];
		$.ajax({
			url: "http://47.92.145.129:8000/djsList/listDetails",
			type: "get",
			data: {
				listId: sessionStorage.listid
			},
			success: function(data) {
				console.log(data)
				uid = data.data[0].uid;
				$('.djs-returnTitle').text(data.data[0].mainclass)
				$('.djs-content>p').text(data.data[0].tradename)
				$('.djs-Content').html(data.data[0].content)
				$('.djs-price>p').text("￥"+data.data[0].pricing+"/张")
				$('#wcg_jiao').text(data.data[0].salas)
				console.log(data.data[0].packageUrl)
				personalData(uid)
				reputation(uid)
				sessionStorage.setItem('pack_Url',data.data[0].packageUrl)
				sessionStorage.setItem('qiand',data.data[0].pricing)
				sessionStorage.u_id=data.data[0].uid;
				if(sessionStorage.succ_ess){
					listPrice(data.data[0].pricing,data.data[0].uid)
				}

			}
		})
	}else if(sessionStorage.succ_ess){
		console.log(sessionStorage.shop_id)
		$.ajax({
			url: "http://47.92.145.129:8000/djsList/listDetails",
			type: "get",
			data: {
				listId: sessionStorage.shop_id
			},
			success: function(data) {
				console.log(data)
				uid = data.data[0].uid;
				$('.djs-returnTitle').text(data.data[0].mainclass)
				$('.djs-content>p').text(data.data[0].tradename)
				$('.djs-Content').html(data.data[0].content)
				$('.djs-price>p').text("￥"+data.data[0].pricing+"/张")
				console.log(data.data[0].packageUrl)
				personalData(uid)
				reputation(uid)
				sessionStorage.setItem('pack_Url',data.data[0].packageUrl)
				sessionStorage.setItem('qiand',data.data[0].pricing)
				sessionStorage.u_id=data.data[0].uid;
				if(sessionStorage.succ_ess){
					listPrice(data.data[0].pricing,data.data[0].uid)
				}

			}
		})
	} else {
		console.log("无参数传递")
	}
	
	function listPrice(price,uid){
		$.ajax({
			url: "http://47.92.145.129:8000/tixian/qbc",
			type: "post",
			data: {
				qMoney: price,
				qUserId: uid
			},
			success: function(data) {
				console.log(data)
			}
		})
	}
	
	

	function personalData(uid) {
		$.ajax({
			url: "http://47.92.145.129:8000/personal/people",
			type: "get",
			data: {
				Applicant: uid
			},
			
			success: function(data) {
				console.log(data)
				if(data.flag == 1){
					
					
					console.log('list')
					$('.djs-data img').attr("src",$.base64.atob(data.results[0].portrait)); //设计师头像
					$('.dis-name p').text(data.results[0].shopName) //设计师名称
					$('.djs-material').text(data.results[0].briefIntroduction) //设计师个人介绍
				}
			}
		})
	}
    
	function reputation(uid) {
		$.ajax({
			url: "http://47.92.145.129:8000/djsList/issueList",
			type: "get",
			data: {
				uid: uid
			},
			success: function(data) {
				console.log(data.data)
				salas = 0
				html = ''
				for(var i = 0; i < data.data.length; i++) {
					salas += data.data[i].salas;
				}
				if(salas > 0 && salas <= 20) {
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 20 && salas <= 40) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 40 && salas <= 60) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 60 && salas <= 80) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 80 && salas <= 100) {
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 100 && salas <= 120) {
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 120 && salas <= 140) {
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 140 && salas <= 160) {
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 160 && salas <= 180) {
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 180 && salas <= 200) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 200 && salas <= 220) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 220 && salas <= 240) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 240 && salas <= 260) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 260 && salas <= 280) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 280 && salas <= 300) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 300 && salas <= 320) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 320 && salas <= 340) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 340 && salas <= 360) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 360 && salas <= 380) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 380 && salas <= 400) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 400 && salas <= 420) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 420 && salas <= 440) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 440 && salas <= 460) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 460 && salas <= 480) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 480 && salas <= 500) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 500 && salas <= 520) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 520 && salas <= 540) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 540 && salas <= 560) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 560 && salas <= 580) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 580 && salas <= 600) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 600 && salas <= 620) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 620 && salas <= 640) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 640 && salas <= 660) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 660 && salas <= 680) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 680 && salas <= 700) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 700 && salas <= 720) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 720 && salas <= 740) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 740 && salas <= 760) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 760 && salas <= 780) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 780 && salas <= 800) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 800 && salas <= 820) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 820 && salas <= 840) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 840 && salas <= 860) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 860 && salas <= 880) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 880 && salas <= 900) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 900 && salas <= 920) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 920 && salas <= 940) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 940 && salas <= 960) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 960 && salas <= 980) {
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 980 && salas <= 1000) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 1000 && salas <= 1020) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 1020 && salas <= 1040) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1040 && salas <= 1060) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1060 && salas <= 1080) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1080 && salas <= 1100) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 1100 && salas <= 1120) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 1120 && salas <= 1140) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1140 && salas <= 1160) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1160 && salas <= 1180) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1180 && salas <= 1200) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1200 && salas <= 1220) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 1220 && salas <= 1240) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1240 && salas <= 1260) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1260 && salas <= 1280) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1280 && salas <= 1300) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1300 && salas <= 1320) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 1320 && salas <= 1340) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1340 && salas <= 1360) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1360 && salas <= 1380) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1380 && salas <= 1400) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1400 && salas <= 1420) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 1420 && salas <= 1440) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1440 && salas <= 1460) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1460 && salas <= 1480) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1480 && salas <= 1500) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 1500 && salas <= 1520) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 1520 && salas <= 1540) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1540 && salas <= 1560) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1560 && salas <= 1580) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1580 && salas <= 1600) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 1600 && salas <= 1620) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 1620 && salas <= 1640) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1640 && salas <= 1660) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1660 && salas <= 1680) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1680 && salas <= 1700) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1700 && salas <= 1720) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 1720 && salas <= 1740) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1740 && salas <= 1760) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1760 && salas <= 1780) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1780 && salas <= 1800) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1800 && salas <= 1820) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 1820 && salas <= 1840) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1840 && salas <= 1860) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1860 && salas <= 1880) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1880 && salas <= 1900) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1900 && salas <= 1920) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 1920 && salas <= 1940) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1940 && salas <= 1960) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1960 && salas <= 1980) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 1980 && salas <= 2000) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 2000 && salas <= 2020) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 2020 && salas <= 2040) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2040 && salas <= 2060) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2060 && salas <= 2080) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2080 && salas <= 2100) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 2100 && salas <= 2120) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 2120 && salas <= 2140) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2140 && salas <= 2160) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2160 && salas <= 2180) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2180 && salas <= 2200) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2200 && salas <= 2220) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 2220 && salas <= 2240) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2240 && salas <= 2260) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2260 && salas <= 2280) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2280 && salas <= 2300) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2300 && salas <= 2320) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 2320 && salas <= 2340) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2340 && salas <= 2360) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2360 && salas <= 2380) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2380 && salas <= 2400) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2400 && salas <= 2420) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 2420 && salas <= 2440) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2440 && salas <= 2460) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2460 && salas <= 2480) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2480 && salas <= 2500) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 2500 && salas <= 2520) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 2520 && salas <= 2540) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2540 && salas <= 2560) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2560 && salas <= 2580) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2580 && salas <= 2600) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 2600 && salas <= 2620) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 2620 && salas <= 2640) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2640 && salas <= 2660) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2660 && salas <= 2680) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2680 && salas <= 2700) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2700 && salas <= 2720) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 2720 && salas <= 2740) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2740 && salas <= 2760) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2760 && salas <= 2780) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2780 && salas <= 2800) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2800 && salas <= 2820) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 2820 && salas <= 2840) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2840 && salas <= 2860) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2860 && salas <= 2880) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2880 && salas <= 2900) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2900 && salas <= 2920) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 2920 && salas <= 2940) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2940 && salas <= 2960) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2960 && salas <= 2980) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 2980 && salas <= 3000) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 3000 && salas <= 3020) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 3020 && salas <= 3040) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3040 && salas <= 3060) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3060 && salas <= 3080) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3080 && salas <= 3100) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 3100 && salas <= 3120) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 3120 && salas <= 3140) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3140 && salas <= 3160) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3160 && salas <= 3180) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3180 && salas <= 3200) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3200 && salas <= 3220) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 3220 && salas <= 3240) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3240 && salas <= 3260) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3260 && salas <= 3280) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3280 && salas <= 3300) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3300 && salas <= 3320) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 3320 && salas <= 3340) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3340 && salas <= 3360) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3360 && salas <= 3380) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3380 && salas <= 3400) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3400 && salas <= 3420) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 3420 && salas <= 3440) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3440 && salas <= 3460) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3460 && salas <= 3480) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3480 && salas <= 3500) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 3500 && salas <= 3520) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 3520 && salas <= 3540) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3540 && salas <= 3560) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3560 && salas <= 3580) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3580 && salas <= 3600) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 3600 && salas <= 3620) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 3620 && salas <= 3640) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3640 && salas <= 3660) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3660 && salas <= 3680) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3680 && salas <= 3700) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3700 && salas <= 3720) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 3720 && salas <= 3740) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3740 && salas <= 3760) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3760 && salas <= 3780) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3780 && salas <= 3800) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3800 && salas <= 3820) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 3820 && salas <= 3840) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3840 && salas <= 3860) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3860 && salas <= 3880) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3880 && salas <= 3900) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3900 && salas <= 3920) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 3920 && salas <= 3940) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3940 && salas <= 3960) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3960 && salas <= 3980) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 3980 && salas <= 4000) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 4000 && salas <= 4020) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 4020 && salas <= 4040) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4040 && salas <= 4060) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4060 && salas <= 4080) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4080 && salas <= 4100) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 4100 && salas <= 4120) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 4120 && salas <= 4140) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4140 && salas <= 4160) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4160 && salas <= 4180) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4180 && salas <= 4200) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4200 && salas <= 4220) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 4220 && salas <= 4240) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4240 && salas <= 4260) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4260 && salas <= 4280) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4280 && salas <= 4300) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4300 && salas <= 4320) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 4320 && salas <= 4340) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4340 && salas <= 4360) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4360 && salas <= 4380) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4380 && salas <= 4400) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4400 && salas <= 4420) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 4420 && salas <= 4440) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4440 && salas <= 4460) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4460 && salas <= 4480) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4480 && salas <= 4500) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 4500 && salas <= 4520) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 4520 && salas <= 4540) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4540 && salas <= 4560) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4560 && salas <= 4580) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4580 && salas <= 4600) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 4600 && salas <= 4620) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 4620 && salas <= 4640) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4640 && salas <= 4660) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4660 && salas <= 4680) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4680 && salas <= 4700) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4700 && salas <= 4720) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 4720 && salas <= 4740) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4740 && salas <= 4760) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4760 && salas <= 4780) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4780 && salas <= 4800) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4800 && salas <= 4820) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 4820 && salas <= 4840) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4840 && salas <= 4860) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4860 && salas <= 4880) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4880 && salas <= 4900) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4900 && salas <= 4920) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 4920 && salas <= 4940) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4940 && salas <= 4960) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4960 && salas <= 4980) {
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 4980 && salas <= 5000) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 5000 && salas <= 5020) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 5020 && salas <= 5040) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5040 && salas < 5060) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5060 && salas <= 5080) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5080 && salas < 5100) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 5100 && salas <= 5120) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 5120 && salas <= 5140) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5140 && salas <= 5160) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5160 && salas <= 5180) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5180 && salas <= 5200) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5200 && salas <= 5220) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 5220 && salas <= 5240) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5240 && salas <= 5260) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5260 && salas <= 5280) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5280 && salas <= 5300) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5300 && salas <= 5320) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 5320 && salas <= 5340) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5340 && salas <= 5360) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5360 && salas <= 5380) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5380 && salas <= 5400) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5400 && salas <= 5420) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 5420 && salas <= 5440) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5440 && salas <= 5460) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5460 && salas <= 5480) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5480 && salas <= 5500) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 5500 && salas <= 5520) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 5520 && salas <= 5540) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5540 && salas <= 5560) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5560 && salas <= 5580) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5580 && salas <= 5600) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 5600 && salas <= 5620) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 5620 && salas <= 5640) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5640 && salas <= 5660) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5660 && salas <= 5680) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5680 && salas <= 5700) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5700 && salas <= 5720) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 5720 && salas <= 5740) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5740 && salas <= 5760) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5760 && salas <= 5780) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5780 && salas <= 5800) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5800 && salas <= 5820) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 5820 && salas <= 5840) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5840 && salas <= 5860) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5860 && salas <= 5880) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5880 && salas <= 5900) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5900 && salas <= 5920) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 5920 && salas <= 5940) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5940 && salas <= 5960) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5960 && salas <= 5980) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 5980 && salas <= 6000) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 6000 && salas <= 6020) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 6020 && salas <= 6040) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6040 && salas <= 6060) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6060 && salas <= 6080) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6080 && salas <= 6100) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 6100 && salas <= 6120) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 6120 && salas <= 6140) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6140 && salas <= 6160) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6160 && salas <= 6180) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6180 && salas <= 6200) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6200 && salas <= 6220) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 6220 && salas <= 6240) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6240 && salas <= 6260) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6260 && salas <= 6280) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6280 && salas <= 6300) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6300 && salas <= 6320) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 6320 && salas <= 6340) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6340 && salas <= 6360) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6360 && salas <= 6380) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6380 && salas <= 6400) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6400 && salas <= 6420) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 6420 && salas <= 6440) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6440 && salas <= 6460) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6460 && salas <= 6480) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6480 && salas <= 6500) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 6500 && salas <= 6520) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 6520 && salas <= 6540) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6540 && salas <= 6560) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6560 && salas <= 6580) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6580 && salas <= 6600) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 6600 && salas <= 6620) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 6620 && salas <= 6640) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6640 && salas <= 6660) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6660 && salas <= 6680) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6680 && salas <= 6700) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6700 && salas <= 6720) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 6720 && salas <= 6740) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6740 && salas <= 6760) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6760 && salas <= 6780) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6780 && salas <= 6800) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6800 && salas <= 6820) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 6820 && salas <= 6840) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6840 && salas <= 6860) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6860 && salas <= 6880) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6880 && salas <= 6900) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6900 && salas <= 6920) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 6920 && salas <= 6940) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6940 && salas <= 6960) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6960 && salas <= 6980) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 6980 && salas <= 7000) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 7000 && salas <= 7020) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 7020 && salas <= 7040) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7040 && salas <= 7060) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7060 && salas <= 7080) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7080 && salas <= 7100) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 7100 && salas <= 7120) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 7120 && salas <= 7140) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7140 && salas <= 7160) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7160 && salas <= 7180) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7180 && salas <= 7200) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7200 && salas <= 7220) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 7220 && salas <= 7240) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7240 && salas <= 7260) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7260 && salas <= 7280) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7280 && salas <= 7300) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7300 && salas <= 7320) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 7320 && salas <= 7340) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7340 && salas <= 7360) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7360 && salas <= 7380) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7380 && salas <= 7400) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7400 && salas <= 7420) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 7420 && salas <= 7440) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7440 && salas <= 7460) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7460 && salas <= 7480) {
					for(var i=0; i<2; i++){
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7480 && salas <= 7500) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 7500 && salas <= 7520) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 7520 && salas <= 7540) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7540 && salas <= 7560) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7560 && salas <= 7580) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7580 && salas <= 7600) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 7600 && salas <= 7620) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 7620 && salas <= 7640) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7640 && salas <= 7660) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7660 && salas <= 7680) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7680 && salas <= 7700) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7700 && salas <= 7720) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 7720 && salas <= 7740) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7740 && salas <= 7760) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7760 && salas <= 7780) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7780 && salas <= 7800) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7800 && salas <= 7820) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 7820 && salas <= 7840) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7840 && salas <= 7860) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7860 && salas <= 7880) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7880 && salas <= 7900) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7900 && salas <= 7920) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 7920 && salas <= 7940) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7940 && salas <= 7960) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7960 && salas <= 7980) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 7980 && salas <= 8000) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 8000 && salas <= 8020) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 8020 && salas <= 8040) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8040 && salas <= 8060) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8060 && salas <= 8080) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8080 && salas <= 8100) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 8100 && salas <= 8120) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 8120 && salas <= 8140) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8140 && salas <= 8160) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8160 && salas <= 8180) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8180 && salas <= 8200) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8200 && salas <= 8220) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 8220 && salas <= 8240) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8240 && salas <= 8260) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8260 && salas <= 8280) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8280 && salas <= 8300) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8300 && salas <= 8320) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 8320 && salas <= 8340) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8340 && salas <= 8360) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8360 && salas <= 8380) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8380 && salas <= 8400) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8400 && salas <= 8420) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 8420 && salas <= 8440) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8440 && salas <= 8460) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8460 && salas <= 8480) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8480 && salas <= 8500) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 8500 && salas <= 8520) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 8520 && salas <= 8540) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8540 && salas <= 8560) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8560 && salas <= 8580) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8580 && salas <= 8600) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 8600 && salas <= 8620) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 8620 && salas <= 8640) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8640 && salas <= 8660) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8660 && salas <= 8680) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8680 && salas <= 8700) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8700 && salas <= 8720) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 8720 && salas <= 8740) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8740 && salas <= 8760) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8760 && salas <= 8780) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8780 && salas <= 8800) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8800 && salas <= 8820) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 8820 && salas <= 8840) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8840 && salas <= 8860) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8860 && salas <= 8880) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8880 && salas <= 8900) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8900 && salas <= 8920) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 8920 && salas <= 8940) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8940 && salas <= 8960) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8960 && salas <= 8980) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 8980 && salas <= 9000) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 9000 && salas <= 9020) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 9020 && salas <= 9040) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9040 && salas <= 9060) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9060 && salas <= 9080) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9080 && salas <= 9100) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 9100 && salas <= 9120) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 9120 && salas <= 9140) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9140 && salas <= 9160) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9160 && salas <= 9180) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9180 && salas <= 9200) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9200 && salas <= 9220) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 9220 && salas <= 9240) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9240 && salas <= 9260) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9260 && salas <= 9280) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9280 && salas <= 9300) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9300 && salas <= 9320) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 9320 && salas <= 9340) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9340 && salas <= 9360) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9360 && salas <= 9380) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9380 && salas <= 9400) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9400 && salas <= 9420) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 9420 && salas <= 9440) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9440 && salas <= 9460) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9460 && salas <= 9480) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9480 && salas <= 9500) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 9500 && salas <= 9520) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 9520 && salas <= 9540) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9540 && salas <= 9560) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9560 && salas <= 9580) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9580 && salas <= 9600) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 9600 && salas <= 9620) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 9620 && salas <= 9640) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9640 && salas <= 9660) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9660 && salas <= 9680) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9680 && salas <= 9700) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9700 && salas <= 9720) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 9720 && salas <= 9740) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9740 && salas <= 9760) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9760 && salas <= 9780) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9780 && salas <= 9800) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9800 && salas <= 9820) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 9820 && salas <= 9840) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9840 && salas <= 9860) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9860 && salas <= 9880) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9880 && salas <= 9900) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9900 && salas <= 9920) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 9920 && salas <= 9940) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9940 && salas <= 9960) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9960 && salas <= 9980) {
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 9980 && salas <= 10000) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 10000 && salas <= 10020) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 10020 && salas <= 10040) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10040 && salas <= 10060) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10060 && salas <= 10080) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10080 && salas <= 10100) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 10100 && salas <= 10120) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 10120 && salas <= 10140) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10140 && salas <= 10160) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10160 && salas <= 10180) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10180 && salas <= 10200) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10200 && salas <= 10220) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 10220 && salas <= 10240) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10240 && salas <= 10260) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10260 && salas <= 10280) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10280 && salas <= 10300) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10300 && salas <= 10320) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 10320 && salas <= 10340) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10340 && salas <= 10360) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10360 && salas <= 10380) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10380 && salas <= 10400) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10400 && salas <= 10420) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 10420 && salas <= 10440) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10440 && salas <= 10460) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10460 && salas <= 10480) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10480 && salas <= 10500) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 10500 && salas <= 10520) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 10520 && salas <= 10540) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10540 && salas <= 10560) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10560 && salas <= 10580) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10580 && salas <= 10600) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 10600 && salas <= 10620) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 10620 && salas <= 10640) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10640 && salas <= 10660) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10660 && salas <= 10680) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10680 && salas <= 10700) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10700 && salas <= 10720) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 10720 && salas <= 10740) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10740 && salas <= 10760) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10760 && salas <= 10780) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10780 && salas <= 10800) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10800 && salas <= 10820) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 10820 && salas <= 10840) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10840 && salas <= 10860) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10860 && salas <= 10880) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10880 && salas <= 10900) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10900 && salas <= 10920) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 10920 && salas <= 10940) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10940 && salas <= 10960) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10960 && salas <= 10980) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 10980 && salas <= 11000) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 11000 && salas <= 11020) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 11020 && salas <= 11040) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11040 && salas <= 11060) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11060 && salas <= 11080) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11080 && salas <= 11100) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 11100 && salas <= 11120) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 11120 && salas <= 11140) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11140 && salas <= 11160) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11160 && salas <= 11180) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11180 && salas <= 11200) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11200 && salas <= 11220) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 11220 && salas <= 11240) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11240 && salas <= 11260) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11260 && salas <= 11280) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11280 && salas <= 11300) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11300 && salas <= 11320) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 11320 && salas <= 11340) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11340 && salas <= 11360) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11360 && salas <= 11380) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11380 && salas <= 11400) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11400 && salas <= 11420) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 11420 && salas <= 11440) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11440 && salas <= 11460) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11460 && salas <= 11480) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11480 && salas <= 11500) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 11500 && salas <= 11520) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 11520 && salas <= 11540) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11540 && salas <= 11560) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11560 && salas <= 11580) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11580 && salas <= 11600) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 11600 && salas <= 11620) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 11620 && salas <= 11640) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11640 && salas <= 11660) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11660 && salas <= 11680) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11680 && salas <= 11700) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11700 && salas <= 11720) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 11720 && salas <= 11740) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11740 && salas <= 11760) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11760 && salas <= 11780) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11780 && salas <= 11800) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11800 && salas <= 11820) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 11820 && salas <= 11840) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11840 && salas <= 11860) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11860 && salas <= 11880) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11880 && salas <= 11900) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11900 && salas <= 11920) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 11920 && salas <= 11940) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11940 && salas <= 11960) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11960 && salas <= 11980) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 11980 && salas <= 12000) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 12000 && salas <= 12020) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 12020 && salas <= 12040) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12040 && salas <= 12060) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12060 && salas <= 12080) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12080 && salas <= 12100) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 12100 && salas <= 12120) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 12120 && salas <= 12140) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12140 && salas <= 12160) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12160 && salas <= 12180) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12180 && salas <= 12200) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12200 && salas <= 12220) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 12220 && salas <= 12240) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12240 && salas <= 12260) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12260 && salas <= 12280) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12280 && salas <= 12300) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12300 && salas <= 12320) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 12320 && salas <= 12340) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12340 && salas <= 12360) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12360 && salas <= 12380) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12380 && salas <= 12400) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12400 && salas <= 12420) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 12420 && salas <= 12440) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12440 && salas <= 12460) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12460 && salas <= 12480) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				}else if(salas > 12480 && salas <= 12500) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 12500 && salas <= 12520) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 12520 && salas <= 12540) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12540 && salas <= 12560) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12560 && salas <= 12580) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12580 && salas <= 12600) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 12600 && salas <= 12620) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 12620 && salas <= 12640) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12640 && salas <= 12660) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12660 && salas <= 12680) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12680 && salas <= 12700) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12700 && salas <= 12720) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 12720 && salas <= 12740) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12740 && salas <= 12760) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12760 && salas <= 12780) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12780 && salas <= 12800) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12800 && salas <= 12820) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 12820 && salas <= 12840) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12840 && salas <= 12860) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12860 && salas <= 12880) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12880 && salas <= 12900) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12900 && salas <= 12920) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 12920 && salas <= 12940) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12940 && salas <= 12960) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12960 && salas <= 12980) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 12980 && salas <= 13000) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 13000 && salas <= 13020) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 13020 && salas <= 13040) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13040 && salas <= 13060) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13060 && salas <= 13080) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13080 && salas <= 13100) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 13100 && salas <= 13120) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 13120 && salas <= 13140) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13140 && salas <= 13160) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13160 && salas <= 13180) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13180 && salas <= 13200) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13200 && salas <= 13220) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 13220 && salas <= 13240) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13240 && salas <= 13260) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13260 && salas <= 13280) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13280 && salas <= 13300) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13300 && salas <= 13320) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 13320 && salas <= 13340) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13340 && salas <= 13360) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13360 && salas <= 13380) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13380 && salas <= 13400) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13400 && salas <= 13420) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 13420 && salas <= 13440) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13440 && salas <= 13460) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13460 && salas <= 13480) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13480 && salas <= 13500) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 13500 && salas <= 13520) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 13520 && salas <= 13540) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13540 && salas <= 13560) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13560 && salas <= 13580) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13580 && salas <= 13600) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 13600 && salas <= 13620) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 13620 && salas <= 13640) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13640 && salas <= 13660) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13660 && salas <= 13680) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13680 && salas <= 13700) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13700 && salas <= 13720) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 13720 && salas <= 13740) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13740 && salas <= 13760) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13760 && salas <= 13780) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13780 && salas <= 13800) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13800 && salas <= 13820) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 13820 && salas <= 13840) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13840 && salas <= 13860) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13860 && salas <= 13880) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13880 && salas <= 13900) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13900 && salas <= 13920) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 13920 && salas <= 13940) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13940 && salas <= 13960) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13960 && salas <= 13980) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 13980 && salas <= 14000) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 14000 && salas <= 14020) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 14020 && salas <= 14040) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14040 && salas <= 14060) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14060 && salas <= 14080) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14080 && salas <= 14100) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 14100 && salas <= 14120) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 14120 && salas <= 14140) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14140 && salas <= 14160) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14160 && salas <= 14180) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14180 && salas <= 14200) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14200 && salas <= 14220) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 14220 && salas <= 14240) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14240 && salas <= 14260) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14260 && salas <= 14280) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14280 && salas <= 14300) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14300 && salas <= 14320) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 14320 && salas <= 14340) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14340 && salas <= 14360) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14360 && salas <= 14380) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14380 && salas <= 14400) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14400 && salas <= 14420) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 14420 && salas <= 14440) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14440 && salas <= 14460) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14460 && salas <= 14480) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14480 && salas <= 14500) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 14500 && salas <= 14520) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 14520 && salas <= 14540) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14540 && salas <= 14560) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14560 && salas <= 14580) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14580 && salas <= 14600) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 14600 && salas <= 14620) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 14620 && salas <= 14640) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14640 && salas <= 14660) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14660 && salas <= 14680) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14680 && salas <= 14700) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14700 && salas <= 14720) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 14720 && salas <= 14730) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14730 && salas <= 14740) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14740 && salas <= 14760) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14760 && salas <= 14780) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14780 && salas <= 14800) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 14800 && salas <= 14810) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14810 && salas <= 14820) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14820 && salas <= 14840) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14840 && salas <= 14860) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14860 && salas <= 14880) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 14880 && salas <= 14900) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14900 && salas <= 14920) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14920 && salas <= 14940) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 14940 && salas <= 14960) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />'; 
					$('.dis-name div').append(html)
				} else if(salas > 14960 && salas <= 14980) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />'; 
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 14980 && salas <= 15000) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />'; 
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15000 && salas < 15020) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15020 && salas <= 15040) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15040 && salas < 15060) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 15060 && salas <= 15080) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 15080 && salas <= 15100) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15100 && salas <= 15120) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15120 && salas <= 15140) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15140 && salas <= 15160) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15160 && salas <= 15180) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 15180 && salas <= 15200) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15200 && salas <= 15220) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15220 && salas <= 15240) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15240 && salas <= 15260) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15260 && salas <= 15280) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 15280 && salas <= 15300) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15300 && salas <= 15320) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15320 && salas <= 15340) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15340 && salas <= 15360) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15360 && salas <= 15380) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 15380 && salas <= 15400) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15400 && salas <= 15420) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15420 && salas <= 15440) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15440 && salas <= 15460) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 15460 && salas <= 15480) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 15480 && salas <= 15500) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15500 && salas <= 15520) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15520 && salas <= 15540) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15540 && salas <= 15560) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 15560 && salas <= 15580) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 15580 && salas <= 15600) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15600 && salas <= 15620) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15620 && salas <= 15640) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15640 && salas <= 15660) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15660 && salas <= 15680) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 15680 && salas <= 15700) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15700 && salas <= 15720) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15720 && salas <= 15740) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15740 && salas <= 15760) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15760 && salas <= 15780) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 15780 && salas <= 15800) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15800 && salas <= 15820) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15820 && salas <= 15840) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15840 && salas <= 15860) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15860 && salas <= 15880) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 15880 && salas <= 15900) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15900 && salas <= 15920) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15920 && salas <= 15940) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 15940 && salas <= 15960) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 15960 && salas <= 15980) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 15980 && salas <= 16000) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16000 && salas <= 16020) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16020 && salas <= 16040) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16040 && salas <= 16060) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 16060 && salas <= 16080) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 16080 && salas <= 16100) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16100 && salas <= 16120) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16120 && salas <= 16140) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16140 && salas <= 16160) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16160 && salas <= 16180) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 16180 && salas <= 16200) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16200 && salas <= 16220) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16220 && salas <= 16240) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16240 && salas <= 16260) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16260 && salas <= 16280) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 16280 && salas <= 16300) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16300 && salas <= 16320) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16320 && salas <= 16340) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16340 && salas <= 16360) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16360 && salas <= 16380) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 16380 && salas <= 16400) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16400 && salas <= 16420) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16420 && salas <= 16440) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16440 && salas <= 16460) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 16460 && salas <= 16480) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 16480 && salas <= 16500) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16500 && salas <= 16520) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16520 && salas <= 16540) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16540 && salas <= 16560) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 16560 && salas <= 16580) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 16580 && salas <= 16600) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16600 && salas <= 16620) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16620 && salas <= 16640) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16640 && salas <= 16660) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16660 && salas <= 16680) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 16680 && salas <= 16700) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16700 && salas <= 16720) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16720 && salas <= 16740) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16740 && salas <= 16760) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16760 && salas <= 16780) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 16780 && salas <= 16800) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16800 && salas <= 16820) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16820 && salas <= 16840) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16840 && salas <= 16860) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16860 && salas <= 16880) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 16880 && salas <= 16900) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16900 && salas <= 16920) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16920 && salas <= 16940) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 16940 && salas <= 16960) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 16960 && salas <= 16980) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 16980 && salas <= 17000) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17000 && salas <= 17020) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17020 && salas <= 17040) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17040 && salas <= 17060) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 17060 && salas <= 17080) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 17080 && salas <= 17100) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17100 && salas <= 17120) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17120 && salas <= 17140) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17140 && salas <= 17160) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17160 && salas <= 17180) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 17180 && salas <= 17200) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17200 && salas <= 17220) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17220 && salas <= 17240) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17240 && salas <= 17260) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17260 && salas <= 17280) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 17280 && salas <= 17300) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17300 && salas <= 17320) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17320 && salas <= 17340) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17340 && salas <= 17360) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17360 && salas <= 17380) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 17380 && salas <= 17400) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17400 && salas <= 17420) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17420 && salas <= 17440) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					html += '<img src="../images/icon/mango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17440 && salas <= 17460) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 17460 && salas <= 17480) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 17480 && salas <= 17500) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17500 && salas <= 17520) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17520 && salas <= 17540) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17540 && salas <= 17560) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 17560 && salas <= 17580) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 17580 && salas <= 17600) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17600 && salas <= 17620) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17620 && salas <= 17640) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17640 && salas <= 17660) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17660 && salas <= 17680) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 17680 && salas <= 17700) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17700 && salas <= 17720) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17720 && salas <= 17740) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17740 && salas <= 17760) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17760 && salas <= 17780) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 17780 && salas <= 17800) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17800 && salas <= 17820) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17820 && salas <= 17840) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17840 && salas <= 17860) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17860 && salas <= 17880) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 17880 && salas <= 17900) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17900 && salas <= 17920) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17920 && salas <= 17940) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 17940 && salas <= 17960) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 17960 && salas <= 17980) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 17980 && salas <= 18000) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18000 && salas <= 18020) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18020 && salas <= 18040) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18040 && salas <= 18060) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 18060 && salas <= 18080) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 18080 && salas <= 18100) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18100 && salas <= 18120) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18120 && salas <= 18140) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18140 && salas <= 18160) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18160 && salas <= 18180) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 18180 && salas <= 18200) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18200 && salas <= 18220) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18220 && salas <= 18240) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18240 && salas <= 18260) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18260 && salas <= 18280) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 18280 && salas <= 18300) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18300 && salas <= 18320) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18320 && salas <= 18340) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18340 && salas <= 18360) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18360 && salas <= 18380) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 18380 && salas <= 18400) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18400 && salas <= 18420) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18420 && salas <= 18440) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18440 && salas <= 18460) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 18460 && salas <= 18480) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 18480 && salas <= 18500) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18500 && salas <= 18520) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18520 && salas <= 18540) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18540 && salas <= 18560) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 18560 && salas <= 18580) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 18580 && salas <= 18600) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18600 && salas <= 18620) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18620 && salas <= 18640) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18640 && salas <= 18660) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18660 && salas <= 18680) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 18680 && salas <= 18700) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18700 && salas <= 18720) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18720 && salas <= 18740) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18740 && salas <= 18760) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18760 && salas <= 18780) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 18780 && salas <= 18800) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18800 && salas <= 18820) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18820 && salas <= 18840) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18840 && salas <= 18860) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18860 && salas <= 18880) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 18880 && salas <= 18900) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18900 && salas <= 18920) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18920 && salas <= 18940) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 18940 && salas <= 18960) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 18960 && salas <= 18980) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 18980 && salas <= 19000) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19000 && salas <= 19020) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19020 && salas <= 19040) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19040 && salas <= 19060) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 19060 && salas <= 19080) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 19080 && salas <= 19100) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19100 && salas <= 19120) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19120 && salas <= 19140) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19140 && salas <= 19160) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19160 && salas <= 19180) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 19180 && salas <= 19200) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19200 && salas <= 19220) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19220 && salas <= 19240) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19240 && salas <= 19260) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19260 && salas <= 19280) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 19280 && salas <= 19300) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19300 && salas <= 19320) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19320 && salas <= 19340) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19340 && salas <= 19360) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19360 && salas <= 19380) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 19380 && salas <= 19400) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19400 && salas <= 19420) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19420 && salas <= 19440) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19440 && salas <= 19460) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 19460 && salas <= 19480) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 19480 && salas <= 19500) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19500 && salas <= 19520) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19520 && salas <= 19540) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19540 && salas <= 19560) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 19560 && salas <= 19580) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 19580 && salas <= 19600) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19600 && salas <= 19620) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19620 && salas <= 19640) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19640 && salas <= 19660) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19660 && salas <= 19680) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 19680 && salas <= 19700) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19700 && salas <= 19720) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19720 && salas <= 19740) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19740 && salas <= 19760) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19760 && salas <= 19780) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 19780 && salas <= 19800) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19800 && salas <= 19820) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19820 && salas <= 19840) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19840 && salas <= 19860) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19860 && salas <= 19880) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 19880 && salas <= 19900) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19900 && salas <= 19920) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19920 && salas <= 19940) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 19940 && salas <= 19960) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 19960 && salas <= 19980) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 19980 && salas <= 20000) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20000 && salas <= 20020) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20020 && salas <= 20040) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20040 && salas <= 20060) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 20060 && salas <= 20080) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 20080 && salas <= 20100) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20100 && salas <= 20120) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20120 && salas <= 20140) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20140 && salas <= 20160) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20160 && salas <= 20180) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 20180 && salas <= 20200) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20200 && salas <= 20220) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20220 && salas <= 20240) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20240 && salas <= 20260) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20260 && salas <= 20280) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 20280 && salas <= 20300) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20300 && salas <= 20320) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20320 && salas <= 20340) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20340 && salas <= 20360) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20360 && salas <= 20380) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 20380 && salas <= 20400) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20400 && salas <= 20420) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20420 && salas <= 20440) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20440 && salas <= 20460) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 20460 && salas <= 20480) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 20480 && salas <= 20500) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20500 && salas <= 20520) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20520 && salas <= 20540) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20540 && salas <= 20560) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 20560 && salas <= 20580) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 20580 && salas <= 20600) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20600 && salas <= 20620) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20620 && salas <= 20640) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20640 && salas <= 20660) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20660 && salas <= 20680) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 20680 && salas <= 20700) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20700 && salas <= 20720) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20720 && salas <= 20740) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20740 && salas <= 20760) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20760 && salas <= 20780) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 20780 && salas <= 20800) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20800 && salas <= 20820) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20820 && salas <= 20840) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20840 && salas <= 20860) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20860 && salas <= 20880) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 20880 && salas <= 20900) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20900 && salas <= 20930) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20930 && salas <= 20960) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 20960 && salas <= 20980) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 20980 && salas <= 21000) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 21000 && salas <= 21020) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21020 && salas <= 21040) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21040 && salas <= 21060) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21060 && salas <= 21080) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 21080 && salas <= 21100) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 21100 && salas <= 21120) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21120 && salas <= 21140) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21140 && salas <= 21160) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21160 && salas <= 21180) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21180 && salas <= 21200) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 21200 && salas <= 21220) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21220 && salas <= 21240) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21240 && salas <= 21260) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21260 && salas <= 21280) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21280 && salas <= 21300) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 21300 && salas <= 21320) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21320 && salas <= 21340) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21340 && salas <= 21360) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21360 && salas <= 21380) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21380 && salas <= 21400) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 21400 && salas <= 21420) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21420 && salas <= 21440) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21440 && salas <= 21460) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21460 && salas <= 21480) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 21480 && salas <= 21500) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 21500 && salas <= 21520) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21520 && salas <= 21540) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21540 && salas <= 21560) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21560 && salas <= 21580) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 21580 && salas <= 21600) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 21600 && salas <= 21620) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21620 && salas <= 21640) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21640 && salas <= 21660) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21660 && salas <= 21680) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21680 && salas <= 21700) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 21700 && salas <= 21720) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21720 && salas <= 21740) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21740 && salas <= 21760) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21760 && salas <= 21780) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21780 && salas <= 21800) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 21800 && salas <= 21820) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21820 && salas <= 21840) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21840 && salas <= 21860) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21860 && salas <= 21880) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21880 && salas <= 21900) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 21900 && salas <= 21920) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21920 && salas <= 21940) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21940 && salas <= 21960) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 21960 && salas <= 21980) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 21980 && salas <= 22000) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 22000 && salas <= 22010) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22010 && salas <= 22020) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22020 && salas <= 22040) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22040 && salas <= 22060) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 22060 && salas <= 22080) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 22080 && salas <= 22100) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22100 && salas <= 22120) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22120 && salas <= 22140) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22140 && salas <= 22160) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22160 && salas <= 22180) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 22180 && salas <= 22200) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22200 && salas <= 22220) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22220 && salas <= 22240) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22240 && salas <= 22260) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22260 && salas <= 22280) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 22280 && salas <= 22300) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22300 && salas <= 22320) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22320 && salas <= 22340) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22340 && salas <= 22360) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22360 && salas <= 22380) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 22380 && salas <= 22400) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22400 && salas <= 22420) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22420 && salas <= 22440) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22440 && salas <= 22460) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 22460 && salas <= 22480) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 22480 && salas <= 22500) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22500 && salas <= 22520) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22520 && salas <= 22540) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22540 && salas <= 22560) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 22560 && salas <= 22580) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 22580 && salas <= 22600) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22600 && salas <= 22620) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22620 && salas <= 22640) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22640 && salas <= 22660) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22660 && salas <= 22680) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 22680 && salas <= 22700) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22700 && salas <= 22720) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22720 && salas <= 22740) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22740 && salas <= 22760) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22760 && salas <= 22780) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 22780 && salas <= 22800) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22800 && salas <= 22820) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22820 && salas <= 22840) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22840 && salas <= 22860) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22860 && salas <= 22880) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 22880 && salas <= 22900) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22900 && salas <= 22920) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22920 && salas <= 22940) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 22940 && salas <= 22960) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 22960 && salas <= 22980) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 22980 && salas <= 23000) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23000 && salas <= 23020) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23020 && salas <= 23040) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23040 && salas <= 23060) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 23060 && salas <= 23080) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 23080 && salas <= 23100) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23100 && salas <= 23120) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23120 && salas <= 23140) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23140 && salas <= 23160) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23160 && salas <= 23180) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 23180 && salas <= 23200) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23200 && salas <= 23220) {
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23220 && salas <= 23240) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23240 && salas <= 23260) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23260 && salas <= 23280) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 23280 && salas <= 23300) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23300 && salas <= 23320) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23320 && salas <= 23340) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23340 && salas <= 23360) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23360 && salas <= 23380) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 23380 && salas <= 23400) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23400 && salas <= 23420) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23420 && salas <= 23440) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23440 && salas <= 23460) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 23460 && salas <= 23480) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 23480 && salas <= 23500) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23500 && salas <= 23520) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23520 && salas <= 23540) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23540 && salas <= 23560) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 23560 && salas <= 23580) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 23580 && salas <= 23600) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23600 && salas <= 23620) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23620 && salas <= 23640) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23640 && salas <= 23660) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23660 && salas <= 23680) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 23680 && salas <= 23700) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23700 && salas <= 23720) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23720 && salas <= 23740) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23740 && salas <= 23760) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23760 && salas <= 23780) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 23780 && salas <= 23800) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23800 && salas <= 23820) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23820 && salas <= 23840) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23840 && salas <= 23860) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23860 && salas <= 23880) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 23880 && salas <= 23900) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23900 && salas <= 23920) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23920 && salas <= 23940) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 23940 && salas <= 23960) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 23960 && salas <= 23980) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 23980 && salas <= 24000) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24000 && salas <= 24020) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24020 && salas <= 24040) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24040 && salas <= 24060) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 24060 && salas <= 24080) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 24080 && salas <= 24100) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24100 && salas <= 24120) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24120 && salas <= 24140) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24140 && salas <= 24160) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24160 && salas <= 24180) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 24180 && salas <= 24200) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24200 && salas <= 24220) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24220 && salas <= 24240) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24240 && salas <= 24260) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24260 && salas <= 24280) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 24280 && salas <= 24300) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24300 && salas <= 24320) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24320 && salas <= 24340) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24340 && salas <= 24360) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24360 && salas <= 24380) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 24380 && salas <= 24400) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24400 && salas <= 24420) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24420 && salas <= 24440) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24440 && salas <= 24460) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 24460 && salas <= 24480) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 24480 && salas <= 24500) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24500 && salas <= 24520) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24520 && salas <= 24540) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24540 && salas <= 24560) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 24560 && salas <= 24580) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 24580 && salas <= 24600) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24600 && salas <= 24620) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24620 && salas <= 24640) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24640 && salas <= 24660) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24660 && salas <= 24680) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 24680 && salas <= 24700) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24700 && salas <= 24720) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24720 && salas <= 24740) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24740 && salas <= 24760) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24760 && salas <= 24780) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 24780 && salas <= 24800) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24800 && salas <= 24820) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24820 && salas <= 24840) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24840 && salas <= 24860) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24860 && salas <= 24880) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 24880 && salas <= 24900) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24900 && salas <= 24920) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 24920 && salas <= 24940) {
					html += '<img src="../images/icon/yellowmango.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/mango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				}else if(salas > 24940 && salas <= 24960) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 24960 && salas <= 24980) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 24980 && salas <= 25000) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25000 && salas <= 25020) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25020 && salas <= 25040) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25040 && salas <= 25060) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 25060 && salas <= 25080) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 25080 && salas <= 25100) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25100 && salas <= 25120) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25120 && salas <= 25140) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25140 && salas <= 25160) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25160 && salas <= 25180) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 25180 && salas <= 25200) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25200 && salas <= 25220) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25220 && salas <= 25240) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25240 && salas <= 25260) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25260 && salas <= 25280) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 25280 && salas <= 25300) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25300 && salas <= 25320) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25320 && salas <= 25340) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25340 && salas <= 25360) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25360 && salas <= 25380) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 25380 && salas <= 25400) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25400 && salas <= 25420) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25420 && salas <= 25440) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25440 && salas <= 25460) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 25460 && salas <= 25480) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 25480 && salas <= 25500) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25500 && salas <= 25520) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25520 && salas <= 25540) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25540 && salas <= 25560) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 25560 && salas <= 25580) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 25580 && salas <= 25600) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25600 && salas <= 25620) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25600 && salas <= 25620) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25620 && salas <= 25640) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25640 && salas <= 25660) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 25660 && salas <= 25680) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25680 && salas <= 25700) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25700 && salas <= 25720) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25720 && salas <= 25740) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25740 && salas <= 25760) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 25760 && salas <= 25780) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25780 && salas <= 25800) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25800 && salas <= 25820) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25820 && salas <= 25840) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25840 && salas <= 25860) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 25860 && salas <= 25880) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25880 && salas <= 25900) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25900 && salas <= 25920) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					html += '<img src="../images/icon/flower.png" alt="" />';
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25920 && salas <= 25940) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 25940 && salas <= 25960) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 25960 && salas <= 25980) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 25980 && salas <= 26000) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26000 && salas <= 26020) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26020 && salas <= 26040) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 26040 && salas <= 26060) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 26060 && salas <= 26080) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26080 && salas <= 26100) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26100 && salas <= 26120) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26120 && salas <= 26140) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26140 && salas <= 26160) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 26160 && salas <= 26180) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26180 && salas <= 26200) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26200 && salas <= 26220) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26220 && salas <= 26240) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26240 && salas <= 26260) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 26260 && salas <= 26280) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26280 && salas <= 26300) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26300 && salas <= 26320) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26320 && salas <= 26340) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26340 && salas <= 26360) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 26360 && salas <= 26380) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26380 && salas <= 26400) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26400 && salas <= 26420) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26420 && salas <= 26440) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					$('.dis-name div').append(html)
				} else if(salas > 26440 && salas <= 26460) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 26460 && salas <= 26480) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26480 && salas <= 26500) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26500 && salas <= 26520) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26520 && salas <= 26540) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 26540 && salas <= 26560) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 26560 && salas <= 26580) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26580 && salas <= 26600) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26600 && salas <= 26620) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					html += '<img src="../images/icon/bud.png" alt="" />'
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26620 && salas <= 26640) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26640 && salas <= 26660) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 26660 && salas <= 26680) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26680 && salas <= 26700) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26700 && salas <= 26720) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26720 && salas <= 26740) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26740 && salas <= 26760) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />';
					$('.dis-name div').append(html)
				} else if(salas > 26760 && salas <= 26780) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26780 && salas <= 26800) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26800 && salas <= 26820) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26820 && salas <= 26840) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26840 && salas <= 26860) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					html += '<img src="../images/icon/leaf.png" alt="" />'
					$('.dis-name div').append(html)
				} else if(salas > 26860 && salas <= 26880) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				} else if(salas > 26880 && salas <= 26900) {
					for(var i = 0; i < 2; i++) {
						html += '<img src="../images/icon/yellowmango.png" alt="" />';
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/flower.png" alt="" />';
					}
					for(var i = 0; i < 4; i++) {
						html += '<img src="../images/icon/bud.png" alt="" />'
					}
					for(var i = 0; i < 3; i++) {
						html += '<img src="../images/icon/leaf.png" alt="" />'
					}
					$('.dis-name div').append(html)
				}
			}
		})
	}
     var jilud
              $.ajax({
						type: 'get',
						url: 'http://47.92.145.129:8000/djsList/buyList',
						data: {
							purchaserid: sessionStorage.getItem('userId')
						},
						success:function(aa){
						    jilud = aa
							}
						})
	$('.buy').click(function() {
		  
		if(sessionStorage.getItem('qiand') == 0){
                   $(".djs-t").text('您可以直接此作品下载');
			setTimeout(function(){
				$(".djs-t").css('opacity',1);
				$(".djs-t").css("transform","scale(1)")
			},0)
			setTimeout(function(){
				$(".djs-t").css('opacity',0);
				$(".djs-t").css("transform","scale(0.5)")
			},1500)
		}else{
             if(sessionStorage.userId){
			if(jilud.data){
               var cad = ''
                     for(var i=0;i<jilud.data.length;i++){
                     	console.log(jilud.data[i].commodityid)
                                if(jilud.data[i].commodityid == sessionStorage.getItem('listid')){
                                	
                                	cad += jilud.data[i].commodityid
                                }
							}
					
							if(cad == ''){
                                 location.href = "buy.html?" + listId;
							}else{
                                       $(".djs-t").text('您以购买，无需重复购买');
                                	setTimeout(function(){
				                    $(".djs-t").css('opacity',1);
				                         $(".djs-t").css("transform","scale(1)")
		                         	},0)
			                     setTimeout(function(){
				                 $(".djs-t").css('opacity',0);
			                  	$(".djs-t").css("transform","scale(0.5)")
		                       	},1500) 

							}
			
			}else{
                location.href = "buy.html?" + listId;
			}
			         
		}else {
			$(".djs-t").text('您还没有登陆，请先登录');
			setTimeout(function(){
				$(".djs-t").css('opacity',1);
				$(".djs-t").css("transform","scale(1)")
			},0)
			setTimeout(function(){
				$(".djs-t").css('opacity',0);
				$(".djs-t").css("transform","scale(0.5)")
			},1500)
		}
		}
		
	})

	

}, false)
