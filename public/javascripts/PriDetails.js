window.addEventListener('load',function(){
	
	var ip='localhost:1998'; //ip地址
	var aip="47.92.145.129:8000"; //ip地址
	var qiyeIdd = location.href.split('?')[1];
	console.log(qiyeIdd);

	$.ajax({
		type: 'get',
		url: "http://"+ip+"/qenter/qlistDetail",
		async: true,
		data:{
			qiyId:qiyeIdd
		},
		success: function(data) {
			console.log(data)
			console.log(data.results[0].qtitle)
			var html='';
			html+='<li><span>企业名称</span><div>' + data.results[0].qtitle + '</div></li><li><span>企业头像</span><div><img src="' + data.results[0].qheader + '" alt="" /></div></li><li><span>地址</span><div>' + data.results[0].qaddress + '</div></li><li><span>企业负责人</span><div>' + data.results[0].qpeople + '</div></li><li><span>联系方式</span><div>' + data.results[0].qtel + '</div></li><li><span>企业营业执照</span><div><img src="http://47.92.145.129:8000/' + data.results[0].qimg + '" alt="" /></div></li><li><span id="tkeys">团队密钥</span><div>' + data.results[0].qkey + '</div></li><li><span id="tstaus">审核状态</span><div>' + data.results[0].qpass + '</div></li>'
			$("#app_cont").append(html);
			sessionStorage.quid=data.results[0].quid
			console.log(sessionStorage.quid)
		}
	})
	//点击审核通过
	//过去随机数（字母数字+时间戳+uid）
	    var timestamp = Date.parse(new Date()); //获取当前时间戳
		var dom=Math.random().toString(36).substr(2);
		var rand=timestamp+dom;
		console.log(rand);
	
	
	
	
	
	
	$("#yes_pass").click(function(){
		$.ajax({
			type:"post",
			url: "http://"+ip+"/qenter/qdetailPass",
			async:true,
			data:{
				qiyKey: rand+sessionStorage.uid, //：团队密钥（时间戳+uid)
				qiyAudit:"1",
				quid:sessionStorage.quid //：审核状态
			},
			success:function(data){
				console.log(data)
				$("#all").css("display","block");
				$("#sure").click(function(){
					$("#all").css("display","none");
					location.reload()
				})
			}
		});
	})
//点击审核不通过
	$("#no_pass").click(function(){
		$("#all").css("display","block");
		$(".txt_ts").html("该信息未通过")
		$("#sure").click(function(){
			$("#all").css("display","none");
		})
	})
	
	
	
	
	
	
	
	
	
	
	
},false)
