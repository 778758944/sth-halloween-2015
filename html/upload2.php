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
$imgname=date("Y-m-d-H-i-s").".png";

$img_path1="images/".$imgname;
$img_path2="/html/images/".$imgname;


function convert_data($data){
	$image=base64_decode($data);
	save_to_file($image);
}
function save_to_file($image){

	$fp=fopen($img_path1,"w");
	fwrite($fp,$image);
	fclose($fp);
}

convert_data($data);

$arr=array("url"=>$img_path2);

exit(json_encode($arr));


?>