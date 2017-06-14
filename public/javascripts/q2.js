 

  var listId = location.href.split('?')[1];
        if(listId){
            listId = listId.split("#")[0];
            $.ajax({
                url: "http://47.92.145.129:8000/djsList/listDetails",
                type: "get",
                async: false,
                data: {
                    listId: listId
                },
                success: function(data) {
                   
                    var uid = data.data[0].uid;
                    personalData(uid)
                    
                }
            })
        }
        
        
        
        function personalData(uid) {
        $.ajax({
            url: "http://47.92.145.129:8000/personal/people",
            type: "get",
            async: false,
            data: {
                Applicant: uid
            },
            success: function(data) {
            
                if(data.flag == 1){
                    sessionStorage.setItem('name',data.results[0].shopName)
                    sessionStorage.setItem('qq',data.results[0].qq)
                    ze()
                }
            }
        })
    }
   
 function ze(){
        /*
         * 皮肤编号 lrkf_blue1 无图版，lrkf_blue2 图片版，更多皮肤敬请期待 懒人qq客服 - http://www.51xuediannao.com/qqkefu/
         * 参数配置参考正文中的参数配置说明
         */
        console.log('q2')
        $("#lrkfwarp").lrkf({
            qqs:[
                {'name':'联系卖家','qq':sessionStorage.getItem('qq')}       //注意最后一个{}不要英文逗号
            ],
            more:" ",               //>>更多方式
//          foot:"8:30-18:00"                                  //底部在线时间，有些风格里面没有给这个预留位置

        });

    }