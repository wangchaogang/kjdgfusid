window.addEventListener('load', function() {
	var listId = location.href.split('?')[1];
	$.ajax({
		url: "http://47.92.145.129:8000/djsList/listDetails",
		type: "get",
		data: {
			listId: listId
		},
		success: function(data) {
			console.log(data)
			$('.djs-left img').attr("src", $.base64.atob(data.data[0].cover));
			$('.djs-text h4').text(data.data[0].tradename)
			$('.djs-price').text("￥"+data.data[0].pricing+"/张")
			$('.djs-pr').text("￥"+data.data[0].pricing+"/张")
			$('.djs-right div span:last-child').text("￥" + parseFloat(data.data[0].pricing) * Number($('.djs-right div span:nth-child(2)').text())+'元');

			$.ajax({
				url: "http://47.92.145.129:8000/personal/people",
				type: "get",
				data: {
					Applicant: data.data[0].uid
				},
				success: function(data) {
					console.log(data)
					if(data.flag == 1){
						$('.djs-name span:last-child').text(data.results[0].shopName) //卖家姓名
					}
				}
			})

			$('.djs-name span:last-child').text() //卖家姓名
		}
	})
	
	
	$(".djs-q").click(function(){
		location.href = "listDetails.html?"+listId
	})
	
	  $('.djs-qr').click(function(){
		if(sessionStorage.userId){
			
		}else {
			$(".djs-tt").text('您还没有登陆，请先登陆');
			setTimeout(function(){
				$(".djs-tt").css('opacity',1);
				$(".djs-tt").css("transform","scale(1)")
			},0)
			setTimeout(function(){
				$(".djs-tt").css('opacity',0);
				$(".djs-tt").css("transform","scale(0.5)")
			},1500)
		}
	})
	
})