<?php

define('DRUPAL_ROOT', '/www/sgh');

chdir('/www/sgh');
require_once './includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

$openid=$_POST['openid'];
$droid=$_POST['server_id'];
if($droid)
{
    $url='http://wechat.xingwentao.top/accessToken';
    // $post_data=array('action'=>'get_accesstoken');
    // $back=httpPost($post_data,$url);
    // //echo 'aaaa';
    // $back=json_decode($back,true);
    $access_token=httpGet($url);
    if(!$access_token)
    {
        $return=array('status'=>'fail','msg'=>'wrong access_token');
        exit(json_encode($return));
    }
    $imgurl="http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=$access_token&media_id=$droid";
    $back=httpGet($imgurl);
    //print_r($back);
    if (!$back)
    {
        $return=array('status'=>'fail','msg'=>'get imag from wechat fail');
        exit(json_encode($return));
    }
    $data_name=$openid.'.png';
    $file = file_save_data($back,'public://editimage/' .$data_name,FILE_EXISTS_REPLACE);
    $file_url='http://sgh.xingwentao.top/sites/default/files/editimage/'.$openid.'.png';
    if ($file)
    {
        $return=array('status'=>'success','url'=>$file_url);
        exit(json_encode($return));
    }
    else
    {
         $return=array('status'=>'fail','msg'=>'write image fail');
        exit(json_encode($return));
    }
}
$file=$_FILES['pic'];
//$file=$_POST['data'];
// print_r($_POST);
// print_r($GLOBALS['HTTP_RAW_POST_DATA']);
//echo $openid;
exit(move_uploaded_file);
$flag=move_uploaded_file($_FILES["pic"]["tmp_name"], "/www/sgh/sites/default/files/editimage/" .$openid.".png");
if ($flag)
{    
    $timestamp=(string)time();
	$file_url='http://sgh.xingwentao.top/sites/default/files/editimage/'.$openid.'.png';
	$return=array('status'=>'success','url'=>$file_url);
	exit(json_encode($return));
}
else
{
	$return=array('status'=>'fail','msg'=>'fail');
    exit(json_encode($return));
}

    // $result=db_query("SELECT count(image_url) as b FROM {share_image} where openid=:openid",array(':openid'=>$openid))->fetchObject();  
    // $imageurl=(int)$result->b;
    // if ($imageurl<1)
    // {   
    // 	$timestamp=time();
    // 	$nid = db_insert('edit_image')
    //      ->fields(array(
    //       'openid'   =>$openid,
    //       'url'    =>$file_url
    //    ))
    //    ->execute();
    //    
    // }
    // else
    // {   
    // 	$timestamp=time();
    // 	$nid = db_update('edit_image')
    //     ->fields(array('url'   =>$file_url))
    //     ->condition('openid', $openid,'=')
    //     ->execute();
    //    $return=array('status'=>'success','url'=>$file_url);r
    //    exit(json_encode($return));
    // }
function httpPost($post_data,$url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    $output = curl_exec($ch);   
    curl_close($ch);

    return $output;
}
function httpGet($url)
{
     $curl=curl_init();
     curl_setopt($curl,CURLOPT_URL,$url);
     curl_setopt($curl,CURLOPT_RETURNTRANSFER, 1);
     $temp=curl_exec($curl);
     curl_close($curl);
     return $temp;
 }
?>