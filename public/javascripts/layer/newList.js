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
			
		} else {
			num = Number($(this).text());
			$('.djs-fy').append(showPages(num, lhqzy))
			lhqfyhan(num)
		}

	})
	var lhqzy = '';
	var lhqnewsarr = [];
	//查询
	var html = '';
	$.ajax({
		type: 'get',
		url: 'http://47.92.145.129:8000/lhqnews/list',
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
		$('.lhq_newlist_ul li').remove();
		html = ''
		console.log(newsindex)
		for(var i = ((newsindex - 1) * 8); i < (newsindex * 8); i++) {
			if(i == lhqnewsarr.length){
				break;
			}else {
				html += '<li><a href="newDetails.html?' + lhqnewsarr[i].newId + '"><span>' + lhqnewsarr[i].title + '</span><span>系统公告</span><span>' + lhqnewsarr[i].newTime + '</span></a></li>'
			}
		}
		$('.lhq_newlist_ul').append(html)
	}

	//添加
	//	function show() {
	//					var mydate = new Date();
	//					var str = "" + mydate.getFullYear() + "/";
	//					str += (mydate.getMonth() + 1) + "/";
	//					str += mydate.getDate();
	//					return str;
	//					}
	//			var lhqtime = show()
	//	$.ajax({
	//		type: 'post',
	//		url: 'http://localhost:3000/lhqnews/TJlist',
	//		async: true,
	//		data:{
	//			title:'你在南方的远洋里',
	//			newsContent:'南山南北海北',
	//			newTime:lhqtime,
	//			publisher:2
	//		},
	//		success: function(data) {
	//			console.log(data)
	//		}
	//	})
	//
	//删除
	//	$.ajax({
	//	type: 'get',
	//		url: 'http://localhost:3000/lhqnews/del',
	//		async: true,
	//		data:{
	//			newId:2
	//		},
	//		success: function(data) {
	//			console.log(data)
	//		}
	//	})	

	//修改
	//$.ajax({
	//	type: 'post',
	//		url: 'http://localhost:3000/lhqnews/xiugai',
	//		async: true,
	//		data:{
	//			title:'你在南方的远洋里',
	//			newsContent:'南山南北海',
	//			newId:1
	//		},
	//		success: function(data) {
	//			console.log(data)
	//		}
	//	})	
	//

})