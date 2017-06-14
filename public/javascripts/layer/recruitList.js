window.addEventListener("load", function() {
	function showPages(page, total) {
		var str = '<li class="page">' + page + '</li>';

		for(var i = 1; i <= 2; i++) {
			if(page - i > 1) {
				str = '<li>' + (page - i) + '</li>' + str;
			}
			if(page + i < total) {
				str = str + '<li>' + (page + i) + '</li>';
			}
		}
		if(page - 3 > 1) {
			str = '<li>···</li>' + str;
		}
		if(page > 1) {
			str = '<li>上一页</li><li>1</li>' + str;
		}
		if(page + 3 < total) {
			str = str + '<li>···</li>';
		}
		if(page < total) {
			str = str + '<li>' + total + '</li><li>下一页</li>';
		}
		return str;
	}

	var num = 1;
	$('.djs-fy').delegate('li', 'click', function() {
		$('.djs-fy li').remove()

		if($(this).text() == '上一页') {
			num--;
			lhqfyhan(num)
			$('.djs-fy').append(showPages(num, lhqzy))
		} else if($(this).text() == '下一页') {
			num++;
			lhqfyhan(num)
			$('.djs-fy').append(showPages(num, lhqzy))
		} else if($(this).text() == '···'){
			return
		} else {
			num = Number($(this).text());
			$('.djs-fy').append(showPages(num, lhqzy))
			lhqfyhan(num)
		}

	})
	
		var lhqzy = '';
		var lhqnewsarr = [];

		var html = '';
	var lhq_qt = [];
	$('.lhq_zpfl_one').delegate("span",'click',function(){
		var lhq_zpfl = $(this).html();
		if(lhq_zpfl=='全部'){
			$.ajax({
				type: 'get',
				url: 'http://47.92.145.129:8000/resume/list',
				async: true,
				success: function(data) {
					console.log(data)
					$('.djs-fy').css('display','block');
					$('.lhq_rlist_ul li').remove();
					$('.djs-fy li').remove();
					lhqzy = Math.ceil(data.length / 8)
					lhqnewsarr = data;
					console.log(lhqnewsarr)
					$('.djs-fy').append(showPages(1, lhqzy))
					lhqfyhan(num)
					}
				})
		}
//		}else if(lhq_zpfl=='其他'){
//			$.ajax({
//				type: 'get',
//				url: 'http://47.92.145.129:8000/resume/list',
//				async: true,
//				success: function(data) {
//					console.log(data)		
//					for(var i = 0;i<data.length;i++){
//						if(data[i].Workarea!='北京'&&data[i].Workarea!='上海'&&data[i].Workarea!='广州'&&data[i].Workarea!='深圳'&&data[i].Workarea!='杭州'){
//							lhq_qt.push(data[i])
//						}
//					}
//					console.log(lhq_qt)
//					if(lhq_qt == ''){
//						$('.lhq_rlist_ul li').remove();
//						$('.djs-fy').css('display','none');
//						$('.lhq_rlist_ul').append('<li>搜索不到'+lhq_zpfl+'的简历信息</li>');
//					}else{
//						$('.djs-fy').css('display','block');
//						$('.lhq_rlist_ul li').remove();
//						$('.djs-fy li').remove();
//						lhqzy = Math.ceil(data.length / 8)
//						lhqnewsarr = lhq_qt;
//						lhq_qt=[];
//						$('.djs-fy').append(showPages(1, lhqzy))
//						lhqfyhan(num)
//					}
//					
//					}
//				})
//		}
else{
			$.ajax({
			type: 'get',
			url:'http://47.92.145.129:8000/resume/lhqsearch',
			async: true,
			data:{
				Workarea:lhq_zpfl
			},
			success: function(data) {
					console.log(data.data)
					if(data.data == ''){
						$('.lhq_rlist_ul li').remove();
						$('.djs-fy').css('display','none');
						$('.lhq_rlist_ul').append('<li>搜索不到'+lhq_zpfl+'的简历信息</li>');
					}else{
						$('.djs-fy').css('display','block');
						$('.lhq_rlist_ul li').remove();
						$('.djs-fy li').remove();
						lhqzy = Math.ceil(data.length / 8)
						lhqnewsarr = data.data;
						console.log(lhqnewsarr)
						$('.djs-fy').append(showPages(1, lhqzy))
						lhqfyhan(num)
					}
			}
		})
		}

	})
	
	
	
	//查询
	$.ajax({
		type: 'get',
		url: 'http://47.92.145.129:8000/resume/list',
		async: true,
		success: function(data) {
			lhqzy = Math.ceil(data.length / 8)
			lhqnewsarr = data;
			console.log(lhqnewsarr)
			$('.djs-fy').append(showPages(1, lhqzy))
			lhqfyhan(num)
		}
	})

	function lhqfyhan(newsindex) {
		$('.lhq_rlist_ul li').remove();
		html = ''
		for(var i = ((newsindex - 1) * 8); i < (newsindex * 8); i++) {
			if(i == lhqnewsarr.length){
				break;
			}else{
				html += '<li><a href="recruitDetails.html?' + lhqnewsarr[i].resumeId + '"><span>' + lhqnewsarr[i].Workarea + '</span><span>' + lhqnewsarr[i].JobTitle + '</span><span>' + lhqnewsarr[i].HandsOnBackground + '</span><span>' + lhqnewsarr[i].FBtime + '</span></a></li>'
			}
		}
		$('.lhq_rlist_ul').append(html)
	}
	
	
	$('.lhq_ypbutton').click(function(){
		if(!sessionStorage.userId){
//			alert('');
						layer.msg('请先登录',{time:1000});
			
		}else{
			location.href='I_want_to_apply.html'
			
		}

	})
	
	
	
	
})
