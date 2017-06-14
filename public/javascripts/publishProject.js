window.addEventListener('load', function() {
	
//	if(!sessionStorage.userId){
//		location.href='../index.html'
//	}
	//点击获取封面
	var lhq_kg = 0;
	$('.lhq_yc_input')[0].addEventListener('change',function(){
		if($(".lhq_yc_input").is(':checked')){
			lhq_kg =1;
		}else{
			lhq_kg =0;
		}
	})
	


	
	$('.xq_but').click(function(){
		$('.lhm').click();
		$('.lhq_jj').css('display','block')
		setTimeout(function(){
			$('.lhq_jj').css('display',"none")
		},3000)
		
		
	})
	var indexx = '';
	$('.lhq_qxx').click(function(){
		location.href='personalData.html'
	})
	$.ajax({
		type: "get",
		url: "http://47.92.145.129:8000/users/nav",
		async: true,
		success: function(data) {
			console.log(data)
			$('.lhq_pP .select_onelhq option').remove()
			var html = ''
			for(var i = 0; i < data.length; i++) {
				html += '<option index="' + data[i].uid + '">' + data[i].names + '</option>'
			}
			$('.lhq_pP .select_onelhq').append(html)
		}
	});

				var file;
				$('#file').change(function() {
					file = this.files[0];

					if(file.size > 153600) {
						$('#tops').css('top','-800px')
						layer.msg('图片过大,无法进行裁剪', {
							time: 1000
						});		
					} else {
						var fileReader = new FileReader();
						fileReader.readAsDataURL(file);
						var formdata = new FormData();
						formdata.append("uploadeFile", file);
						$.ajax({
							url: "http://47.92.145.129:8000/yanzhengs/huang",
							type: "post",
							data: formdata,
							contentType: false,
							processData: false,
							success: function(data) {
								console.log(data)
								if(data.nem == '正常') {
									return
								} else {
									layer.msg('图片审核不通过', {
										time: 1000
									});
		
								}
							}
						})
					}
				})



//	var file;
//	var imgSrc = '';
//	$('.lhm').change(function() {
//		file = this.files[0];
//		if(file.size > 153600) {
//			layer.msg('图片过大,请上传150kb以下的',{time:1000});
//			
//		} else {
//			var fileReader = new FileReader();
//			fileReader.readAsDataURL(file);
//			fileReader.onload = function(event) {
//				imgSrc = event.target.result; //返回的dataURL 
//				$('.lhq_bjt img').remove()
//				$('.lhq_bjt').append('<img src="' + imgSrc + '" class="lhq_bjt_tu"/>')
//				console.log(imgSrc)
//			}
//			var formdata = new FormData();
//			formdata.append("uploadeFile", file);
//			$.ajax({
//				url: "http://47.92.145.129:8000/yanzhengs/huang",
//				type: "post",
//				data: formdata,
//				contentType: false,
//				processData: false,
//				success: function(data) {
//					console.log(data)
//					if(data.nem == '正常') {
//						imgSrc = $.base64.btoa(imgSrc)
//					} else {
//					
//					layer.msg('图片审核不通过',{time:1000});
//						
//					}
//				}
//			})
//		}
//	})

	if(indexx == '') {
		$.ajax({
			type: "post",
			url: "http://47.92.145.129:8000/users/nav2",
			data: {
				uid: 1
			},
			async: true,
			success: function(data) {
				console.log(data)
				if(data.length > 0) {
					$('.lhq_pP .select_twolhq option').remove()
					$('.lhq_pP .select_twolhq').css('display', 'block')
					var html = ''
					for(var i = 0; i < data.length; i++) {
						html += '<option index="' + data[i].uid + '">' + data[i].names + '</option>'
					}
					$('.lhq_pP .select_twolhq').append(html)
				} else {
					$('.lhq_pP .select_twolhq').css('display', 'none')
				}

			}
		})
	}

	$('.select_onelhq').bind('change', function() {
		var indexx = $(this).find("option:selected").attr("index");
		console.log(indexx)
		$.ajax({
			type: "post",
			url: "http://47.92.145.129:8000/users/nav2",
			data: {
				uid: indexx
			},
			async: true,
			success: function(data) {
				console.log(data)
				if(data.length > 0) {
					$('.lhq_pP .select_twolhq option').remove()
					$('.lhq_pP .select_twolhq').css('display', 'block')
					var html = ''
					for(var i = 0; i < data.length; i++) {
						html += '<option index="' + data[i].uid + '">' + data[i].names + '</option>'
					}
					$('.lhq_pP .select_twolhq').append(html)
				} else {
					$('.lhq_pP .select_twolhq').css('display', 'none');
					$('.select_twolhq').val('');
				}

			}
		})
	})

	//上传多张作品	
	var files;
	var fil = '';
	var arrr = '';
	$('#yuh_pic').change(function() {
		$('.lhq_qhl').css('display',"block")
		setTimeout(function(){
			$('.lhq_qhl').css('display',"none")
		},3000)
		fil = this.files[0].name
		console.log(this.files[0])
		console.log(this.value) //获取到选取的图片
		files = this.files[0];
		var fd = new FormData();
		fd.append("uploadedFile", files);

		$.ajax({
			url: "http://47.92.145.129:8000/yanzhengs/chan",
			type: "post",
			data: fd,
			contentType: false,
			processData: false,
			success: function(data) {
				console.log(data)
				$("#yuhan_img").before('<img src="http://47.92.145.129:8000/' + data.nem + '" class="img">');
				arrr += '<img src="http://47.92.145.129:8000/' + data.nem + '">'
				console.log(arrr)
			}
		})
	})
	var lhqdata_name = '';

	$('.lhq_scysb').click(function(){
		$('.ysb_input').click();
	})

		
		
		
	
	var packageSrc = '';
	$('.ysb_input').change(function() {
		file = this.files[0];
		console.log(file)
		if(file.size > 2097152) {
			alert("压缩包文件过大")
		} else {
			var formdata = new FormData();
			formdata.append("uploadeFile", file);
			console.log(formdata)
			$.ajax({
				url: "http://47.92.145.129:8000/yanzhengs/up",
				type: "post",
				data: formdata,
				contentType: false,
				processData: false,
				success: function(data) {
					console.log(data.name)
					if(data.name!=''){
						layer.msg('压缩包上传成功',{time:1000});
//						$('.lhq_scysb').val('点击更换')
					}
					lhqdata_name = data.name
				}
			})
		}

	})

	var lhq_ha;
	$('.lhq_fbb').click(function(){
		
		
		var lhq_fwmc = $('.lhq_fwmc').val();
		var select_twolhq = $('.select_twolhq').val()
		var select_onelhq = $('.select_onelhq').val()
		var lhq_dj = $('.lhq_dj').val();
//		var reg=/^\d+$/;
//		
//		if(reg.test(lhq_dj)==true){
// 			 lhq_ha=lhq_dj
// 		 return true;
//		}else{
//			layer.msg('定价请纯数字',{time:1000});
// 			 return false;
//		}

		if(lhq_fwmc != '' && select_onelhq != '' && lhq_dj != '' && arrr != '' && lhqdata_name != '') {
			$.ajax({
				url: "http://47.92.145.129:8000/djsList/addList",
				type: "post",
				data:{
					cover: $.base64.btoa(sessionStorage.fb_lhq),
					tradename: lhq_fwmc,
					mainclass: select_onelhq,
					subclass: select_twolhq,
					content: arrr,
					pricing:lhq_dj,
					uid:sessionStorage.userId,
					salas: 0,
					package: lhqdata_name,
					original:lhq_kg,
					authority:0
				},
				success: function(data){
					console.log(data)
					if(data.data.insertId>0){
						layer.msg('发布成功',{time:1000});
						setTimeout(function(){
						location.href='personalData.html'
						},2000)
					}else{
						layer.msg('发布失败',{time:1000});
					}
					
				}
			})
		}else{
			layer.msg('请填写完整发布信息',{time:1000});
		}
	})
}, false)