window.addEventListener("load", function() {
	
		
//	if(!sessionStorage.userId){
//		location.href='../index.html'
//	}
	
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
		$('body').scrollTop(0)

		if($(this).text() == '上一页') {
			num--;
			newList(num)
//			$('.djs-fy').append(showPages(num, lhqzy))
		} else if($(this).text() == '下一页') {
			num++;
			newList(num)
//			$('.djs-fy').append(showPages(num, lhqzy))
		} else if($(this).text() == '···'){
			$('.djs-fy').append(showPages(num+1, lhqzy))
		} else {
			num = (Number($(this).text())-1);
//			$('.djs-fy').append(showPages(num, lhqzy))
			newList(num)
		}

	})
	var lhqzy = '';
	var lhqnewsarr = [];
	//查询
	var html = '';
	var num = 0;
	newList(num)
	function newList(num){
		$.ajax({
			type: 'get',
			url: 'http://47.92.145.129:8000/lhqnews/list',
			async: true,
			data: {
				num: num
			},
			success: function(data) {
				console.log(data)
				$(".lhq_newlist_ul li").remove()
				html = ''
				lhqzy = data.totalSize;
				for(var i = 0; i < data.data.length; i++) {
					html += '<li><a href="newDetails.html?' + data.data[i].newId + '"><span>' + data.data[i].title + '</span><span>系统公告</span><span>' + data.data[i].newTime + '</span></a></li>'
				}
				$('.lhq_newlist_ul').append(html)
				$('.djs-fy').append(showPages(num+1, lhqzy))
			}
		})
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