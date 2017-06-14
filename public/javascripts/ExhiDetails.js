window.addEventListener('load',function(){
	
	var ip='localhost:1998'; //ip地址
	var aip="47.92.145.129:8000"; //ip地址
	var teamIdd = location.href.split('?')[1];
//	console.log(teamIdd);

	$.ajax({
		type: 'get',
		url: "http://"+ip+"/tenter/tlistDetail",
		async: true,
		data:{
			teamId:teamIdd
		},
		success: function(data) {
			console.log(data)
			console.log(data.results[0].ttitle)
			var html='';
			html+='<li><span>团队名称</span><div>' + data.results[0].ttitle + '</div></li><li><span>团队头像</span><div><img src="' + data.results[0].theader + '" alt="" /></div></li><li><span>地址</span><div>' + data.results[0].taddress + '</div></li><li><span>团队负责人</span><div>' + data.results[0].tpeople + '</div></li><li><span>联系方式</span><div>' + data.results[0].ttel + '</div></li><li><span>负责人身份证号</span><div>' + data.results[0].tnumberid + '</div></li><li><span>负责人身份证正面照</span><div><img src="http://47.92.145.129:8000/' + data.results[0].tcardzheng + '" alt="" /></div></li><li><span>负责人身份证反面照</span><div><img src="http://47.92.145.129:8000/' + data.results[0].tcardfan + '" alt="" /></div></li><li><span id="tkeys">团队密钥</span><div>' + data.results[0].tkey + '</div></li><li><div><span>上传作品</span>' + data.results[0].tworks + '</div></li><li><span id="tstaus">审核状态</span><div>' + data.results[0].tpass + '</div></li>'
			$("#app_cont").append(html);
			sessionStorage.uid=data.results[0].tuid
//			console.log(sessionStorage.uid)
		
		}
	})
	//点击审核通过
	//过去随机数（字母数字+时间戳+uid）
	    var timestamp = Date.parse(new Date()); //获取当前时间戳
		var dom=Math.random().toString(36).substr(2);
		var rand=timestamp+dom;
	
	
	
	
	
	
	$("#yes_pass").click(function(){
		$.ajax({
			type:"post",
			url: "http://"+ip+"/tenter/tdetailPass",
			async:true,
			data:{
				TeamKey: rand+sessionStorage.uid, //：团队密钥（时间戳+uid)
				TeamAudit:"1",
				tuid:sessionStorage.uid //：审核状态
			},
			success:function(data){
				console.log(data)
//				$("#tkeys").html()
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
