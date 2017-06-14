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

	var num = 0;
	recruitList(num)
	$('.djs-fy').delegate('li', 'click', function() {
		$('.djs-fy li').remove()
		$('body').scrollTop(0)

		if($(this).text() == '上一页') {
			num--;
			if(lhq_zpfl){
				searchList(num)
			}else {
				recruitList(num)
			}
		} else if($(this).text() == '下一页') {
			num++;
			if(lhq_zpfl){
				searchList(num)
			}else {
				recruitList(num)
			}
		} else if($(this).text() == '···'){
			$('.djs-fy').append(showPages(num+1, lhqzy))
		} else {
			num = Number($(this).text())-1;
			if(lhq_zpfl){
				searchList(num)
			}else {
				recruitList(num)
			}
		}

	})
	
	var lhqzy = '';
	var lhqnewsarr = [];

	var html = '';
	var lhq_qt = [];
	var lhq_zpfl = '';
	$('.lhq_zpfl_one').delegate("span",'click',function(){
		console.log(lhq_zpfl)
		num = 0;
		lhq_zpfl = ''
		$('body').scrollTop(0)
		if($(this).html()=='全部'){
			recruitList(num)
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
			lhq_zpfl = $(this).html();
			console.log(lhq_zpfl)
			searchList(num)
		}

	})
	
	function searchList(num){
		$.ajax({
			type: 'get',
			url:'http://47.92.145.129:8000/resume/lhqsearch',
			async: true,
			data:{
				Workarea:lhq_zpfl,
				num: num
			},
			success: function(data) {
					console.log(data)
					if(data.success == '查无数据'){
						$('.lhq_rlist_ul li').remove();
						$('.djs-fy').css('display','none');
						$('.lhq_rlist_ul').append('<li>搜索不到'+lhq_zpfl+'的简历信息</li>');
					}else{
						$('.djs-fy').css('display','block');
						$('.lhq_rlist_ul li').remove();
						$('.djs-fy li').remove();
						lhqzy = data.totalSize;
						html = ''
						for(var i = 0; i < data.data.length; i++) {
							html += '<li><a href="recruitDetails.html?' + data.data[i].resumeId + '"><span>' + data.data[i].Workarea + '</span><span>' + data.data[i].JobTitle + '</span><span>' + data.data[i].HandsOnBackground + '</span><span>' + data.data[i].FBtime + '</span></a></li>'
						}
						$('.lhq_rlist_ul').append(html)
						$('.djs-fy').append(showPages(num+1, lhqzy))
					}
			}
		})
	}
	
	function recruitList(num){
		$.ajax({
				type: 'get',
				url: 'http://47.92.145.129:8000/resume/list',
				async: true,
				data: {
					num: num
				},
				success: function(data) {
					console.log(data)
					$('.djs-fy li').remove();
					$('.lhq_rlist_ul li').remove();
						lhqzy = data.totalSize;
						html = ''
						for(var i = 0; i < data.data.length; i++) {
							html += '<li><a href="recruitDetails.html?' + data.data[i].resumeId + '"><span>' + data.data[i].Workarea + '</span><span>' + data.data[i].JobTitle + '</span><span>' + data.data[i].HandsOnBackground + '</span><span>' + data.data[i].FBtime + '</span></a></li>'
						}
						$('.lhq_rlist_ul').append(html)
						$('.djs-fy').append(showPages(num+1, lhqzy))
				}
			})
	}
	
	$('.lhq_ypbutton').click(function(){
		if(!sessionStorage.userId){
			layer.msg('请先登录',{time:1000});
		}else{
			location.href='I_want_to_apply.html'
			
		}

	})
	
	
	
	
})
