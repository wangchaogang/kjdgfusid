window.addEventListener("load",function(){
	
	
	var ip='localhost:1998'; //ip地址
	var aip="47.92.145.129:8000"; //ip地址
	//获取列表
	var html='';
		$.ajax({
			type: 'get',
			url: "http://"+ip+"/qenter/qlist",
			async: true,
			success: function(data) {
				console.log(data);
				console.log(data.results[0].qtitle);
				var html='';
				for(var i=0;i<data.results.length;i++){
					if(data.results[i].qpass==0){
						data.results[i].qpass="未审核"
					}else{
						data.results[i].qpass="已审核"
					}
					html+='<li id="cloum"><a href="PriDetails.html?' + data.results[i].quid + '"><span>' + data.results[i].qtitle + '</span><span>' + data.results[i].qaddress + '</span><span>' + data.results[i].qpeople + '</span><span><button class="btn btn-info" id="tpaa" >'+data.results[i].qpass+'</button>'
				}
				$("#app_cont").append(html)
			}
		})
	
	
	
	
	
	
	
	
},false)