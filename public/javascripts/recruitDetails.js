window.addEventListener('load',function(){
	
		
	if(!sessionStorage.userId){
		location.href='../index.html'
	}
	
	$('.lhq_button').click(function(){
		$('.lhq_file').click();
	})
		
		$('.lhq_fhzplb_i').text('咖芒招聘');
		$('.lhq_fhzplb').click(function(){
			location.href='recruitList.html'
		})
	var lhq_zpxq = location.href.split('?')[1]
	console.log(lhq_zpxq)
	$.ajax({
		type: 'get',
		url: 'http://47.92.145.129:8000/resume/zpxq',
		async: true,
		data:{
			resumeId:lhq_zpxq
		},
		success: function(data){
			console.log(data)
			$('.Fullname').text(data[0].Fullname);
			$('.Gender').text(data[0].Gender);
			$('.lq_Age').text(data[0].Age);
			$('.PlaceOfOrigin').text(data[0].PlaceOfOrigin);
			$('.ContactNumber').text(data[0].ContactNumber);
			$('.Mailbox').text(data[0].Mailbox);
			$('.HandsOnBackground').text(data[0].HandsOnBackground);
			$('.Education').text(data[0].Education);
			$('.WorkingProperty').text(data[0].WorkingProperty);
			$('.JobTitle').text(data[0].JobTitle);
			$('.Workarea').text(data[0].Workarea);
			$('.CurrentState').text(data[0].CurrentState);
			$('.HeadPortrait').attr('src',$.base64.atob(data[0].HeadPortrait))
			$('.ProfessionalSkills').append(data[0].ProfessionalSkills)
			$('.lhq_gzjl').append(data[0].WorkExperience)
			
			$('.lhq_gzxmjy').append(data[0].WorkProjectExperience)
			
			$('.lhq_zwpj').append(data[0].SelfEvaluation)
			
			
			
			
		
			
			
		}
	})

})