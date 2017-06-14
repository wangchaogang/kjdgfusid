<?php
ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);

require_once "../lib/WxPay.Api.php";
require_once "WxPay.NativePay.php";
require_once 'log.php';

//模式一
/**
 * 流程：
 * 1、组装包含支付信息的url，生成二维码
 * 2、用户扫描二维码，进行支付
 * 3、确定支付之后，微信服务器会回调预先配置的回调地址，在【微信开放平台-微信支付-支付配置】中进行配置
 * 4、在接到回调通知之后，用户进行统一下单支付，并返回支付信息以完成支付（见：native_notify.php）
 * 5、支付完成之后，微信服务器会通知支付成功
 * 6、在支付成功通知中需要查单确认是否真正支付成功（见：notify.php）
 */
$notify = new NativePay();
$url1 = $notify->GetPrePayUrl("123456789");
    //第一步：链接数据库 
$conn=@mysql_connect("127.0.0.1:3306","root","root")or die ("mysql链接失败"); 
//第二步: 选择指定的数据库，设置字符集 
@mysql_select_db("kamang",$conn) or die ("db链接失败".mysql_error()); 
mysql_query('SET NAMES UTF8')or die ("字符集设置错误"); 

if(isset($_REQUEST["send"]) && $_REQUEST["send"] != ""){
   $sql="select * from list where listid=".$_REQUEST["send"];  
$result =mysql_query($sql);  
//打印变量的相关信息  
$results = array();
while ($row = mysql_fetch_assoc($result)) {
$results[] = $row;
}
     
     $listID = $results[0]["listid"];
      // pricing
     $qian = $results[0]["pricing"]*100;
     $qian1 = $results[0]["pricing"];
     $names = $results[0]["tradename"];
     $uids = $results[0]["uid"];
     mysql_free_result($result);
      mysql_close($conn);  

  }   
//模式二
/**
 * 流程：
 * 1、调用统一下单，取得code_url，生成二维码
 * 2、用户扫描二维码，进行支付
 * 3、支付完成之后，微信服务器会通知支付成功
 * 4、在支付成功通知中需要查单确认是否真正支付成功（见：notify.php）
 */
$input = new WxPayUnifiedOrder();
$input->SetBody($names);
$input->SetAttach($names);
$num=WxPayConfig::MCHID.date("YmdHis");
$input->SetOut_trade_no($num);
$input->SetTotal_fee($qian);
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag($names);
$input->SetNotify_url("http://www.kamangwang.cc/html/new");
$input->SetTrade_type("NATIVE");
$input->SetProduct_id($listID);
$result = $notify->GetPayUrl($input);
$url2 = $result["code_url"];
?>

<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1" /> 
    <link href="../../../images/logo.png" rel="shortcut icon" />
    <script src="jquery-2.1.1.min.js"></script>
    <title>请支付</title>
    <style type="text/css">
      *{
      	margin: 0;
      	padding: 0;
      }
      #box_div{
      	text-align: center;
      }
      #box_div>#cc{
      	color: #ffffff;
      	font-size: 25px;
      	margin-left: 0;
      	height: 55px;
      	line-height: 55px;
      	background: #005E02;
      }
    </style>
</head>
<body>
	<div id="box_div">
	<div id="cc">扫描二维码完成支付</div><br/>
	<img alt="扫描二扫码支付" src="http://paysdk.weixin.qq.com/example/qrcode.php?data=<?php echo urlencode($url2);?>" style="width:250px;height:250px;margin-top:70px;"/>
	 <div id="myDiv"></div>
	 </div>
	<script>  
     //设置每隔1000毫秒执行一次load() 方法  
    var myIntval=setInterval(function(){load()},1000);
 	// 	var myIntval=setInterval(load,1000);
		// // var int=self.setInterval("clock()",50)
		

    function load(){  
    
         var xmlhttp;    
          if (window.XMLHttpRequest){    
            // code for IE7+, Firefox, Chrome, Opera, Safari    
             xmlhttp=new XMLHttpRequest();    
          }else{    
             // code for IE6, IE5    
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");    
         }    
        xmlhttp.onreadystatechange=function(){    
             if (xmlhttp.readyState==4 && xmlhttp.status==200){    
                 trade_state=xmlhttp.responseText; 
                 console.log(trade_state) 
                if(trade_state=='SUCCESS'){  
                    document.getElementById("myDiv").innerHTML='支付成功 正在为您跳转页面...';  
                      //alert(transaction_id);  
                      //延迟3000毫秒执行tz() 方法
                      // http://47.92.145.129:8000/djsList/buy
                      clearInterval(myIntval);  
                      $.ajax({
						type: 'post',
						url: 'http://47.92.145.129:8000/djsList/buy',
						data: {
							purchaserid: sessionStorage.getItem('userId'),
	                        commodityid: "<?php echo $listID;?>"
						},
						success:function(aa){
							// uids
							$.ajax({
						type: 'post',
						url: 'http://47.92.145.129:8000/tixian/qbc',
						data: {
							qMoney:"<?php echo $qian1;?>",
	                        qUserId:"<?php echo $uids;?>"
							
						},
						success:function(aa){
							// uids
              $.ajax({
            type: 'post',
            url: 'http://47.92.145.129:8000/users/xiao',
            data:{
              uid:"<?php echo $uids;?>"
            },
            success:function(aa){
             setTimeout("location.href='http://www.kamangwang.cc/html/listDetails.html?"+"<?php echo $listID;?>"+"'",3000);
            }
    })
						
						}
						})
						
						}
						})
                     
                      
							
                      
                  }else if(trade_state=='REFUND'){  
                     document.getElementById("myDiv").innerHTML='转入退款'; 
                      clearInterval(myIntval); 
                  }else if(trade_state=='NOTPAY'){  
                      document.getElementById("myDiv").innerHTML='请扫码支付';  
                       
                }else if(trade_state=='CLOSED'){  
                     document.getElementById("myDiv").innerHTML='已关闭';  
                     clearInterval(myIntval);
                 }else if(trade_state=='REVOKED'){  
                      document.getElementById("myDiv").innerHTML='已撤销';  
                     clearInterval(myIntval);
                 }else if(trade_state=='USERPAYING'){  
                      document.getElementById("myDiv").innerHTML='用户支付中';  
                 }else if(trade_state=='PAYERROR'){  
                     document.getElementById("myDiv").innerHTML='支付失败'; 
                      clearInterval(myIntval); 
                  }  
                   
              }    
         }    
        //orderquery.php 文件返回订单状态，通过订单状态确定支付状态  
        xmlhttp.open("POST","orderquery.php",false);   

         //下面这句话必须有    
         //把标签/值对添加到要发送的头文件。    
         xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");    
           xmlhttp.send("out_trade_no=<?php echo $num;?>");  
        
       
         }  
    </script>

 
     
</body>
</html>