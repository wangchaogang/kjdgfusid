window.addEventListener('load', function() {
	var ip = "http://47.92.145.129:8000"   //ip地址

//个人资料
   var uid = location.href.split('?')[1]
	function img(){
		$.ajax({
			type: "get",
			url: ""+ip+"/personal/people",
			async: true,
			data: {
				Applicant:uid
			},
			success: function(data) {
				console.log(data);
				$(".zhj_personTopName").text(data.results[0].shopName);
				$(".upImg").attr('src',$.base64.atob(data.results[0].portrait))
			}
		})
	
	}
	function imgben(){
		$.ajax({
			type: "get",
			url: ""+ip+"/personal/people",
			async: true,
			data: {
				Applicant:sessionStorage.userId
			},
			success: function(data) {
				console.log(data);
				$(".zhj_personTopName").text(data.results[0].shopName);
				$(".upImg").attr('src',$.base64.atob(data.results[0].portrait))
			}
		})
	
	}
    if(uid){
    	img()
    }else{
    	imgben();
    }


// 初始我的发布
     function fb(){
     	$.ajax({
			type: "get",
			url: ""+ip+"/djsList/issueList",
			async: true,
			data: {
				uid:uid
			},
			success: function(data) {
				console.log(data)
				if(data.success=="查无数据"){
					return
				}else{
				var fbTxt=''		
				for(var i=0;i<data.data.length;i++){
					fbTxt+='<a href="listDetails.html?'+data.data[i].listid+'"><div class="zhj_Modular"><div class="zhj_ModularImg"><img src="'+$.base64.atob(data.data[i].cover)+'" alt="" /></div><div class="zhj_Title">'+data.data[i].tradename+'</div><div class="zhj_price">'+data.data[i].pricing+'</div></div></a>'
				}
				$(".allFB").append(fbTxt);
				}		
		  }		
		})
     }
     
     function fbb(){
     	$.ajax({
			type: "get",
			url: ""+ip+"/djsList/issueList",
			async: true,
			data: {
				uid:sessionStorage.userId
			},
			success: function(data) {
				console.log(data)
				if(data.success=="查无数据"){
					return
				}else{
				var fbTxt=''		
				for(var i=0;i<data.data.length;i++){
					fbTxt+='<a href="listDetails.html?'+data.data[i].listid+'"><div class="zhj_Modular"><div class="zhj_ModularImg"><img src="'+$.base64.atob(data.data[i].cover)+'" alt="" /></div><div class="zhj_Title">'+data.data[i].tradename+'</div><div class="zhj_price">'+data.data[i].pricing+'</div></div></a>'
				}
				$(".allFB").append(fbTxt);
				}		
		  }		
		})
     }

    if(uid){
    	fb()
    }else{
    	fbb()
    }
	
	
}, false);