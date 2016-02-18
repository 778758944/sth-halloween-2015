<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-02-18 12:02:31
 * @version $Id$
 */
$data=$_POST["data"];
$filename=dirname(__FILE__);
chdir('/www/sgh');
$imgname="aaa".".png";

$img_path1='./html/images/aaa.txt';
$img_path2='/html/images/'.$imgname;


function convert_data($data){
	$image=base64_decode($data);
	save_to_file($image);
}
function save_to_file($image){

	$fp=fopen($img_path1,"r");
	$return_data=fread($fp,$image);
	fclose($fp);
	$arr=array("url"=>$img_path2,"data"=>$return_data);
	exit(json_decode($arr));
}

// convert_data($data);

// $arr=array("url"=>$img_path2);

// exit(json_encode($arr));


?>