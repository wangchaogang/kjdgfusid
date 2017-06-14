window.addEventListener("load",function(){
	
	
	var ip='localhost:1998'; //ip地址
	var aip="47.92.145.129:8000"; //ip地址
	//获取列表
	var html='';
		$.ajax({
			type: 'get',
			url: "http://"+ip+"/tenter/tlist",
			async: true,
			success: function(data) {
				console.log(data);
				console.log(data.results[0].ttitle);
				var html='';
				for(var i=0;i<data.results.length;i++){
					if(data.results[i].tpass==0){
						data.results[i].tpass="未审核"
					}else{
						data.results[i].tpass="已审核"
					}
					html+='<li id="cloum"><a href="ExhiDetails.html?' + data.results[i].tuid + '"><span>' + data.results[i].ttitle + '</span><span>' + data.results[i].taddress + '</span><span>' + data.results[i].tpeople + '</span><span><button class="btn btn-info" id="tpaa" >'+data.results[i].tpass+'</button>'
				}
				$("#app_cont").append(html)
			}
		})
	
	
	
	
	
	
	
	
},false)