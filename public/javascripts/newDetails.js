window.addEventListener('load',function(){
	
		
	// if(!sessionStorage.userId){
	// 	location.href='../index.html'
	// }
	
	var newIdd = location.href.split('?')[1];
	console.log(newIdd);

	$.ajax({
		type: 'get',
		url:  'http://47.92.145.129:8000/lhqnews/xiangqing',
		async: true,
		data:{
			newId:newIdd
		},
		success: function(data) {
			console.log(data)
			$('.lhq_newDetails_title_yi').text(data[0].title)
			$('.lhq_newDetails_title_er').text(data[0].newTime+'/'+data[0].publisher);
			$('.lhq_newDetails_center').text(data[0].newsContent)
		}
	})
})
//	<p class="">新闻表题</p>
//				<p class="lhq_newDetails_title_er">发布时间/发布人</p>
//			</div>
//			<div class="lhq_newDetails_center">