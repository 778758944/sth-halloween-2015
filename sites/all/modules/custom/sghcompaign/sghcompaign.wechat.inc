<?php
function get_wechat_ticket()
{
	$appid =variable_get('wechatappid', '');
  $appsecret=variable_get('wechatappsecret', '');
    // echo $appid;
    // echo '<br>';
    // echo $appsecret;
    // echo '<br>';
    // echo "success";
    // echo $_POST['action'];
    //if ($_POST['action']=='1')
    if (1 ==1) 
    {
        $jsticket=variable_get('jstickt','');
        $expire_time=variable_get('expiretime','');
        $access_token=variable_get('access_token','');
        //echo "expire time:".$expire_time;
        if (empty($jsticket) or empty($expire_time))
        {
           $backtemp = getWechatToken($appid,$appsecret);
           $access_token =$backtemp['access_token'];
           variable_set('access_token', $access_token);
           //print_r($backtemp);
           $backtemp = getJsapiTicket($access_token);
           $jsticket=$backtemp['ticket']; 
           variable_set('jstickt',$jsticket);
           $outline=time()+7200;
           variable_set('expiretime',$outline) ;
           //echo 'new one';
        }
       else
        {
           $current_time=time();
           //echo gettype($current_time);
           $timecount=$expire_time-$current_time;
           // echo $expire_time;
           // echo gettype($expire_time);
           // echo '<br>';
           // echo $current_time;
           // echo '<br>';
           // echo $timecount;
           if (($timecount)<300)
           {
              $backtemp = getWechatToken($appid,$appsecret);
              $access_token =$backtemp['access_token'];
              $backtemp = getJsapiTicket($access_token);
              variable_set('access_token', $access_token);

              $jsticket=$backtemp['ticket'];
              variable_set('jstickt',$jsticket);
              $outline=time()+7200;
              //echo "refresh time:".$outline;
              variable_set('expiretime', $outline);
              //echo 'refresh one';
            }
        }
        
        if ($_POST['action']=='get_accesstoken')
        {
          $return=array('access_token' => $access_token);
          exit(json_encode($return));
          drupal_exit();
        }
        $noncestr = 'SunGlass4Hut5';
        $jsapi_ticket = $jsticket;
        $timestamp = time();
        //$url = 'http://sgh.clients.inzen.com.cn/index.php'; 
        //$url=$_POST['url'];
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $url=$_POST['url'];
        //$url = "$protocol$_SERVER[SERVER_NAME]$_SERVER[REQUEST_URI]";
        $signature = 'jsapi_ticket=' . $jsapi_ticket . '&noncestr=' . $noncestr . '&timestamp=' . $timestamp . '&url=' . $url;
        $signature = sha1($signature); 
 
        $return = array(
          'appid'     => $appid,
          'timestamp' => $timestamp,
          'noncestr'  => $noncestr,
          'ticket'    => $jsticket,
          'signature' => $signature,
          'url'       => $url,
        );
        exit(json_encode($return));

        drupal_exit();
       
    }
}
function getWechatToken($appid,$appsecret)
{
    $url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$appsecret";
    $backjson=json_decode(http_get($url),true);
    if (!empty($backjson))
    {
        //echo 'token suceess';
        return $backjson;
    }
    else
    {   
        $errmsg=$backjson['errcode']+$backjson['errmsg'];
        $return=array('status' => 'fail','msg' =>$backjson['errmsg']);
        return $backjson;
    }
}
function getJsapiTicket($access_token)
{
    $ticketurl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=$access_token&type=jsapi";
    $backjson =json_decode(http_get($ticketurl),true);
    if ($backjson['errcode']!='0')
    {
        $errmsg=$backjson['errcode']+$backjson['errmsg'];
        $return =array('status'=>'fail','msg'=>$errmsg);
        return $return;
    }
    else
    {
        return $backjson;
    }
}
function http_get($url)
{
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_URL,$url);
	curl_setopt($curl,CURLOPT_RETURNTRANSFER, 1);
	$temp=curl_exec($curl);
	curl_close($curl);
	return $temp;
}
function http_post($url,$post_data)
{
  $curl=curl_init();
  curl_setopt($curl,CURLOPT_URL,$url);
  curl_setopt($curl,CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
  $temp=curl_exec($curl);
  curl_close($curl);
  return $temp;
}
function get_user_info()
{
	if (!isset($_GET['code']))
	{
		//触发微信返回code码
		$baseUrl = urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
		//variable_set('baseurl',$baseurl);
		$url = __CreateOauthUrlForCode($baseUrl);
		Header("Location: $url");
		exit();
	}
	else 
	{
		//获取code码，以获取openid
		$code = $_GET['code'];
		$openid = getOpenidFromMp($code);
    //echo $openid;
    $url="http://mp.socialvalue.cn/html/index.php?openid=".$openid;
    drupal_goto($url);
    drupal_exit();
  //   $token_url='http://sgh.clients.inzen.com.cn/wechat/getticket';
  //   $post_data=array('action'=>'get_accesstoken');
  //   $backjson=http_post($token_url,$post_data);
  //   $back=json_decode($backjson,true);
  //   //echo gettype($back);
  //   $access_token=$back['access_token'];
  //   //echo $backjson['access_token'];
  //   //echo $access_token;
		// $info_url="https://api.weixin.qq.com/cgi-bin/user/info?access_token=$access_token&openid=$openid";
  //   $backjson=http_get($info_url);
  //   $back=json_decode($backjson,true);
  //   print_r($back);
    
	}
}
function GetOpenidFromMp($code)
{    
		
	$url = __CreateOauthUrlForOpenid($code);
	//初始化curl
	$ch = curl_init();
	//设置超时
	curl_setopt($ch, CURLOPT_TIMEOUT, 30);
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,FALSE);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,FALSE);
	curl_setopt($ch, CURLOPT_HEADER, FALSE);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	//运行curl，结果以jason形式返回
	$res = curl_exec($ch);
	curl_close($ch);
	//取出openid
	$data = json_decode($res,true);
	//$this->data = $data;
	$openid = $data['openid'];
	return $openid;
}
function ToUrlParams($urlObj)
{
    $buff = "";
    foreach ($urlObj as $k => $v)
    {
      if($k != "sign"){
        $buff .= $k . "=" . $v . "&";
      }
    }
    
    $buff = trim($buff, "&");
    return $buff;
}
function __CreateOauthUrlForOpenid($code)
{
    $appid =variable_get('wechatappid', '');
    $appsecret=variable_get('wechatappsecret', '');
	$urlObj["appid"] =$appid;
	$urlObj["secret"] =$appsecret;
	$urlObj["code"] = $code;
	$urlObj["grant_type"] = "authorization_code";
	$bizString =ToUrlParams($urlObj);
	return "https://api.weixin.qq.com/sns/oauth2/access_token?".$bizString;
}
function __CreateOauthUrlForCode($redirectUrl)
{
    $urlObj["appid"] =variable_get('wechatappid', '');
    $urlObj["redirect_uri"] = "$redirectUrl";
    $urlObj["response_type"] = "code";
    $urlObj["scope"] = "snsapi_base";
    $urlObj["state"] = "STATE"."#wechat_redirect";
    $bizString = ToUrlParams($urlObj);
    return "https://open.weixin.qq.com/connect/oauth2/authorize?".$bizString;
}
function reset_ticket_api()
{
  $pass=$_POST['pass'];
  if ($pass=='aa4655')
  {
     variable_set('access_token', '');
     variable_set('jstickt', '');
     variable_set('expiretime', 0);
     drupal_exit();
  }

}