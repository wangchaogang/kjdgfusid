window.addEventListener('load', function() {
	//导航
	var mainclass = '',
//		subclass = '',
		fenlei = location.href.split('?')[1],
		num = 0;
	mainNav()

	function mainNav() {
		$.ajax({
			type: "get",
			url: "http://47.92.145.129:8000/users/nav",
			async: true,
			success: function(data) {
				$('.djs-navTop ul li').remove()
				$('.djs-navTop ul').append('<li index="0">全部</li>')
				var html = ''
				for(var i = 0; i < data.length; i++) {
					html += '<li index="' + data[i].uid + '">' + data[i].names + '</li>'
				}
				$('.djs-navTop ul').append(html)
			}
		});
	}
	if(fenlei == 1) {
		mainclass = '商标设计注册';
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		zilei(fenlei)
		obtainList(mainclass, num)
	} else if(fenlei == 2) {
		mainclass = 'CI系统设计';
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		zilei(fenlei)
		obtainList(mainclass, num)
	} else if(fenlei == 3) {
		mainclass = '包装设计';
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		zilei(fenlei)
		obtainList(mainclass, num)
	} else if(fenlei == 4) {
		mainclass = '工业产品设计';
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		zilei(fenlei)
		obtainList(mainclass, num)
	} else if(fenlei == 5) {
		mainclass = '商业展示设计';
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		zilei(fenlei)
		obtainList(mainclass, num)
	} else if(fenlei == 6) {
		mainclass = '平面设计';
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		zilei(fenlei)
		obtainList(mainclass, num)
	} else if(fenlei == 7) {
		mainclass = '摄影';
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		zilei(fenlei)
		obtainList(mainclass, num)
	} else if(fenlei == 8) {
		mainclass = '字画手绘';
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		zilei(fenlei)
		obtainList(mainclass, num)
	} else if(fenlei == 9) {
		mainclass = '营销策划';
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		zilei(fenlei)
		obtainList(mainclass, num)
	} else if(fenlei == 10) {
		mainclass = '文案';
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		zilei(fenlei)
		obtainList(mainclass, num)
	} else if(fenlei == 11) {
		mainclass = 'UI设计';
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		zilei(fenlei)
		obtainList(mainclass, num)
	} else if(fenlei == 12) {
		mainclass = 'H5网站开发';
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		zilei(fenlei)
		obtainList(mainclass, num)
	} else if(fenlei == 13) {
		mainclass = 'APP开发';
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		zilei(fenlei)
		obtainList(mainclass, num)
	} else if(fenlei == 0) {
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(Number(fenlei)).addClass("color");
		});
		mainclass = '';
		quan(num)
	}else {
		$(document).ajaxComplete(function() {
			$('.djs-navTop ul li').eq(0).addClass("color");
		});
		fenlei = fenlei.split("=")[1]
		searchList(decodeURI(fenlei), num)
	}

	$('.djs-navTop ul').delegate('li', 'mouseover', function() {
		$(this).css('color', '#EA5813');
	})
	$('.djs-navTop ul').delegate('li', 'mouseout', function() {
		$(this).css('color', '#555555');
	})

	$('.djs-navTop ul').delegate('li', 'click', function() {
		$('.djs-list ul li').remove()
		$(this).addClass("color").siblings().removeClass('color');
		var id = $(this).attr('index');
		location.href = "commodityList.html?" + id;
	})

	function zilei(id){
		$.ajax({
			type: "post",
			url: "http://47.92.145.129:8000/users/nav2",
			async: true,
			data: {
				uid: id
			},
			success: function(data) {
				if(data.length > 0) {
					$('.djs-navBottom').css('display', 'block')
					$('.djs-navBottom ul li').remove()
					var html = ''
					for(var i = 0; i < data.length; i++) {
						html += '<li>' + data[i].names + '</li>'
					}
					$('.djs-navBottom ul').append(html)
				} else {
					$('.djs-navBottom').css('display', 'none')
				}

			}
		});
	}

	$('.djs-navBottom ul').delegate('li', 'mouseover', function() {
		$(this).css('color', '#EA5813');
	})
	$('.djs-navBottom ul').delegate('li', 'mouseout', function() {
		$(this).css('color', '#555555');
	})

	$('.djs-navBottom ul').delegate('li', 'click', function() {
		
		$(".list_loading").css('opacity',1);
		$(this).addClass("color").siblings().removeClass('color');
		mainclass = $(this).text();
		$('.djs-list ul li').remove();
		obtainList(mainclass, num)
	})

	$('.djs-px li:nth-child(1)').mouseover(function() {
		$('.djs-px li:nth-child(1) ul').css("display", "block")
	})
	$('.djs-px li:nth-child(1)').mouseout(function() {
		$('.djs-px li:nth-child(1) ul').css("display", "none")
	})

	//搜索
	function searchList(fenlei,num) {
		$.ajax({
			url: "http://47.92.145.129:8000/djsList/searchList",
			type: "get",
			data: {
				search: fenlei,
				num: num
			},
			success: function(data) {
				console.log(data)
				$(".list_loading").animate({opacity:0},10);
				if(data.success == "查无数据") {
					$(".djs-t").text('此分类暂无商品，敬请期待！');
					setTimeout(function(){
						$(".djs-t").css('opacity',1);
						$(".djs-t").css("transform","scale(1)")
					},0)
					setTimeout(function(){
						$(".djs-t").css('opacity',0);
						$(".djs-t").css("transform","scale(0.5)")
					},1500)
				} else {
					$('.djs-list ul li').remove()
					html = '';
					for(var i = 0; i < data.data.length; i++) {
						html += '<li><a href="listDetails.html?' + data.data[i].listid + '"><img src="' + $.base64.atob(data.data[i].cover) + '" alt="" /><p class="djs-title">' + data.data[i].tradename + '</p><div></div><p class="djs-price">￥' + data.data[i].pricing + '/张</p></a></li>';
					}
					$('.djs-list ul').append(html)
					len = data.totalSize;
					$('.djs-fy li').remove()
					$('.djs-fy').append(showPages(num+1, len))
				}
			}
		})
	}

	//全部列表
	var len;
	var html = '';
	
	function quan(num) {
		$.ajax({
			url: "http://47.92.145.129:8000/djsList/list",
			type: "get",
			data: {
				num: num
			},
			success: function(data) {
				$(".list_loading").animate({opacity:0},10);
				if(data.success == "查无数据") {
					$(".djs-t").text('此分类暂无商品，敬请期待！');
					setTimeout(function(){
						$(".djs-t").css('opacity',1);
						$(".djs-t").css("transform","scale(1)")
					},0)
					setTimeout(function(){
						$(".djs-t").css('opacity',0);
						$(".djs-t").css("transform","scale(0.5)")
					},1500)
				} else {
					$('.djs-list ul li').remove()
					html = '';
					for(var i = 0; i < data.data.length; i++) {
						html += '<li><a href="listDetails.html?' + data.data[i].listid + '"><img src="' + $.base64.atob(data.data[i].cover) + '" alt="" /><p class="djs-title">' + data.data[i].tradename + '</p><div></div><p class="djs-price">￥' + data.data[i].pricing + '/张</p></a></li>';
					}
					$('.djs-list ul').append(html)
					len = data.totalSize;
					$('.djs-fy li').remove()
					$('.djs-fy').append(showPages(num+1, len))
				}
			}
		})
	}

	//获取分类列表
	function obtainList(mainclass, num) {
		$.ajax({
			url: "http://47.92.145.129:8000/djsList/obtainList",
			type: "get",
			data: {
				mainclass: mainclass,
				num: num
			},
			success: function(data) {
				$(".list_loading").animate({opacity:0},10);
				if(data.success == "查无数据") {
					$(".djs-t").text('此分类暂无商品，敬请期待！');
					setTimeout(function(){
						$(".djs-t").css('opacity',1);
						$(".djs-t").css("transform","scale(1)")
					},0)
					setTimeout(function(){
						$(".djs-t").css('opacity',0);
						$(".djs-t").css("transform","scale(0.5)")
					},1500)
				} else {
					$('.djs-list ul li').remove()
					html = '';
					for(var i = 0; i < data.data.length; i++) {
						html += '<li><a href="listDetails.html?' + data.data[i].listid + '"><img src="' + $.base64.atob(data.data[i].cover) + '" alt="" /><p class="djs-title">' + data.data[i].tradename + '</p><div></div><p class="djs-price">￥' + data.data[i].pricing + '/张</p></a></li>';
					}
					$('.djs-list ul').append(html)
					len = data.totalSize;
					$('.djs-fy li').remove()
					$('.djs-fy').append(showPages(num+1, len))
				}
			}
		})
	}

	//分页
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

	
	$('.djs-fy').delegate('li', 'click', function() {
		$(".list_loading").css('opacity',1);
		$('.djs-fy li').remove()
		$('body').animate({scrollTop:0},10);
		if($(this).text() == '上一页') {
			num--;
			if(fenlei == 0){
				quan(num)//全部列表
			}else if(fenlei > 0){
				obtainList(mainclass, num)//分类列表
			}else if(fenlei == "original"){
				original(num)//原创
			}else if(fenlei == "pricepx"){
				pricepx(mainclass, num)//价格
			}else if(fenlei == "salespx"){
				salespx(mainclass, num)//销量
			}else if(fenlei == "authority"){
				authority(num)//官方推荐
			}else {
				searchList(decodeURI(fenlei), num)//搜索
			}
//			$('.djs-fy').append(showPages(num+1, len))
		} else if($(this).text() == '下一页') {
			num++;
			if(fenlei == 0){
				quan(num)
			}else if(fenlei > 0){
				obtainList(mainclass, num)
			}else if(fenlei == "original"){
				original(num)
			}else if(fenlei == "pricepx"){
				pricepx(mainclass, num)
			}else if(fenlei == "salespx"){
				salespx(mainclass, num)
			}else if(fenlei == "authority"){
				authority(num)
			}else {
				searchList(decodeURI(fenlei), num)
			}
//			$('.djs-fy').append(showPages(num+1, len))
		} else if($(this).text() == '···') {
			$('.djs-fy').append(showPages(num+1, len))
			return;
		} else {
			num = (Number($(this).text())-1);
			if(fenlei == 0){
				quan(num)
			}else if(fenlei > 0){
				obtainList(mainclass, num)
			}else if(fenlei == "original"){
				original(num)
			}else if(fenlei == "pricepx"){
				pricepx(mainclass, num)
			}else if(fenlei == "salespx"){
				salespx(mainclass, num)
			}else if(fenlei == "authority"){
				authority(num)
			}else {
				searchList(decodeURI(fenlei), num)
			}
		}

	})

	//点击销量排序
	$('.djs-px>li>ul>li:nth-child(2)').click(function() {
		num = 0;
		fenlei = 'salespx';
		$('.djs-list ul li').remove()
		$(".list_loading").css('opacity',1);
		$('.djs-fy li').remove()
		$('body').animate({scrollTop:0},10);
		salespx(mainclass,num)
	})
	
	function salespx(mainclass,num){
		$.ajax({
			url: "http://47.92.145.129:8000/djsList/salespx",
			type: "get",
			data: {
				mainclass: mainclass,
				num: num
			},
			success: function(data) {
				$(".list_loading").animate({opacity:0},10);
				if(data.success == "success") {
					html = '';
					for(var i = 0; i < data.data.length; i++) {
						html += '<li><a href="listDetails.html?' + data.data[i].listid + '"><img src="' + $.base64.atob(data.data[i].cover) + '" alt="" /><p class="djs-title">' + data.data[i].tradename + '</p><div></div><p class="djs-price">￥' + data.data[i].pricing + '/张</p></a></li>';
					}
					$('.djs-list ul').append(html)
					len = data.totalSize;
					$('.djs-fy li').remove()
					$('.djs-fy').append(showPages(num+1, len))
				}else {
					$(".djs-t").text('此分类暂无商品，敬请期待！');
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
	}

	//点击综合排序
	$('.djs-px>li>ul>li:nth-child(3)').click(function() {
		num = 0;
		fenlei = 'salespx';
		$('.djs-list ul li').remove()
		$(".list_loading").css('opacity',1);
		$('.djs-fy li').remove()
		$('body').animate({scrollTop:0},10);
		salespx(mainclass,num)
	})

	//点击价格排序
	$('.djs-px>li>ul>li:nth-child(1)').click(function() {
		num = 0
		fenlei = 'pricepx';
		$('.djs-list ul li').remove()
		$(".list_loading").css('opacity',1);
		$('.djs-fy li').remove()
		$('body').animate({scrollTop:0},10);
		pricepx(mainclass,num)
	})
	
	function pricepx(mainclass,num){
		$.ajax({
			url: "http://47.92.145.129:8000/djsList/pricepx",
			type: "get",
			data: {
				mainclass: mainclass,
				num: num
			},
			success: function(data) {
				console.log(data)
				$(".list_loading").animate({opacity:0},10);
				if(data.success == "success") {
					$('.djs-list ul li').remove()
					html = '';
					for(var i = 0; i < data.data.length; i++) {
						html += '<li><a href="listDetails.html?' + data.data[i].listid + '"><img src="' + $.base64.atob(data.data[i].cover) + '" alt="" /><p class="djs-title">' + data.data[i].tradename + '</p><div></div><p class="djs-price">￥' + data.data[i].pricing + '/张</p></a></li>';
					}
					$('.djs-list ul').append(html)
					len = data.totalSize;
					$('.djs-fy li').remove()
					$('.djs-fy').append(showPages(num+1, len))
				}else {
					$(".djs-t").text('此分类暂无商品，敬请期待！');
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
	}
	
	//点击官方推荐
	$('.djs-px>li:nth-child(2)').click(function() {
		num = 0
		fenlei = 'pricepx';
		$('.djs-list ul li').remove()
		$(".list_loading").css('opacity',1);
		$('.djs-fy li').remove()
		$('body').animate({scrollTop:0},10);
		authority(num)
	})
	
	function authority(num){
		$.ajax({
			url: "http://47.92.145.129:8000/djsList/authority",
			type: "get",
			data: {
				num: num
			},
			success: function(data) {
				console.log(data)
				$(".list_loading").animate({opacity:0},10);
				if(data.success == "success") {
					$('.djs-list ul li').remove()
					html = '';
					for(var i = 0; i < data.data.length; i++) {
						html += '<li><a href="listDetails.html?' + data.data[i].listid + '"><img src="' + $.base64.atob(data.data[i].cover) + '" alt="" /><p class="djs-title">' + data.data[i].tradename + '</p><div></div><p class="djs-price">￥' + data.data[i].pricing + '/张</p></a></li>';
					}
					$('.djs-list ul').append(html)
					len = data.totalSize;
					$('.djs-fy li').remove()
					$('.djs-fy').append(showPages(num+1, len))
				}else {
					$(".djs-t").text('此分类暂无商品，敬请期待！');
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
	}

	//点击原创设计
	$('.djs-px>li:nth-child(3)').click(function() {
		num = 0;
		fenlei = 'original';
		$('.djs-list ul li').remove()
		$(".list_loading").css('opacity',1);
		$('.djs-fy li').remove()
		$('body').animate({scrollTop:0},10);
		original(num)
	})
	
	function original(num){
		$.ajax({
			url: "http://47.92.145.129:8000/djsList/original",
			type: "get",
			data: {
				num: num
			},
			success: function(data) {
				$(".list_loading").animate({opacity:0},10);
				if(data.success == "success") {
					$('.djs-list ul li').remove()
					html = '';
					for(var i = 0; i < data.data.length; i++) {
						html += '<li><a href="listDetails.html?' + data.data[i].listid + '"><img src="' + $.base64.atob(data.data[i].cover) + '" alt="" /><p class="djs-title">' + data.data[i].tradename + '</p><div></div><p class="djs-price">￥' + data.data[i].pricing + '/张</p></a></li>';
					}
					$('.djs-list ul').append(html)
					len = data.totalSize;
					$('.djs-fy li').remove()
					$('.djs-fy').append(showPages(num+1, len))
				}else {
					$(".djs-t").text('此分类暂无商品，敬请期待！');
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
	}

}, false)
