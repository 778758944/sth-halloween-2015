<?php
function get_info_upload()
{
	if (empty($_POST['name'])  ||  empty($_POST['tel'])  ||  empty($_POST['openid']))
	{
        $return=array('status'=>'fail','msg'=>'empty post');
        exit(json_encode($return));
        drupal_exit();
	}
	$name=$_POST['name'];
	$tel=(int)$_POST['tel'];
	$openid=$_POST['openid'];
	$result=db_query("SELECT count(tel) as a FROM {award_users_info} where openid=:openid",array(':openid'=>$openid))->fetchObject();  
	$telnum=(int)$result->a;
	if ($telnum!=1)
	{  
	   $timestamp=time();
	   $nid = db_insert('award_users_info')
         ->fields(array(
          'name'       =>$name,
          'tel'        =>$tel,
          'timestamp'  =>$timestamp,
          'openid'     =>$openid
       ))
       ->execute();	
       $return=array('status'=>'success','msg'=>'new record');
       exit(json_encode($return));
       drupal_exit();

	}
	else
	{   
    	$timestamp=time();
    	$nid = db_update('award_users_info')
        ->fields(array('timestamp'   =>$timestamp,
                       'tel'         =>$tel,
                       'name'        =>$name
        	))
        ->condition('openid', $openid,'=')
        ->execute();
        $return=array('status'=>'success','msg'=>'exist record refresh');
        exit(json_encode($return));
        drupal_exit();
    }
}
function get_image_upload()
{
	$openid=$_POST['openid'];
	$data=$_POST["data"];
  $starty=$_POST['starty'];
  $width=$_POST['width'];
	if (strlen($openid)<28 || strlen($data)<50  ||!$width)
	{
		$return=array('status'=>'fail','msg'=>'wrong post');
		exit(json_encode($return));
		drupal_exit();
	}
    
	  //print_r($_FILES);
    //echo $_POST['a'];
    //echo file_get_contents('php://input');
    $data=$_POST["data"];

    //echo $data;
    //$a=(string)time();
    $filestr=variable_get($openid,'');
    $fileshare=variable_get($openid.'share', '');
    if($filestr)
    {
        $fileobj=unserialize($filestr);
        $fileobjshare=unserialize($fileshare);
        file_delete($fileobj,true);
        @file_delete($fileobjshare,true);
    }
    $timestring=(string)time();
    $data_name=$openid.$timestring.'.png';
    $image=base64_decode($data);
    $file = file_save_data($image,'public://userimages//' .$data_name,FILE_EXISTS_REPLACE);
    $fileshare = file_save_data($image,'public://userimages//'.'share'.$data_name,FILE_EXISTS_REPLACE);
    //print_r($fileshare);
     if ($shareimgObj=image_load($fileshare->uri))
     {
       image_crop($shareimgObj, 0, $starty, $width, $width);
       image_scale($shareimgObj,300,300);
       image_save($shareimgObj,'public://userimages//'.'share'.$data_name);
     }
    //$ret=file_validate_image_resolution($file,300,300);
    $str = serialize($file);
    $strshare = serialize($fileshare);
    variable_set($openid,$str);
    variable_set($openid.'share',$strshare);
    $file_url='http://mp.socialvalue.cn/sites/default/files/userimages/'.$data_name;
    $share_url ='http://mp.socialvalue.cn/sites/default/files/userimages/'.'share'.$data_name;
    $result=db_query("SELECT count(image_url) as b FROM {share_image} where openid=:openid",array(':openid'=>$openid))->fetchObject();  
    $imageurl=(int)$result->b;
    if ($imageurl<1)
    {   
    	$timestamp=time();
    	$nid = db_insert('share_image')
         ->fields(array(
          'openid'   =>$openid,
          'image_url'    =>$file_url,
          'timestamp'  =>$timestamp
       ))
       ->execute();
       $return=array('status'=>'success','url'=>$file_url,'shareurl'=>$share_url);
       exit(json_encode($return));
    }
    else
    {   
    	$timestamp=time();
    	$nid = db_update('share_image')
        ->fields(array('timestamp'   =>$timestamp,'image_url'=>$file_url))
        ->condition('openid', $openid,'=')
        ->execute();
       $return=array('status'=>'success','url'=>$file_url,'shareurl'=>$share_url);
       exit(json_encode($return));
    }

    //file_put_contents('a.txt',$data);
    //echo $data;
	// $filename=dirname(__FILE__);  
	// //echo $data;  
	// // echo(date(Y,m,H,i));
	// a
	// $fp=fopen("images/".date("Y-m-d-H-i-s").".png","w");
	// $bol=fwrite($fp,$image);
	// fclose($fp);
}
