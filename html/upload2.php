<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-02-18 12:02:31
 * @version $Id$
 */
$data=$_POST["data"];
$img_path="/www/sgh/sites/default/files/userimages".date("Y-m-d-H-i-s").".png";


function convert_data($data){
	$image=base64_decode($data);
	save_to_file($image);
}
function save_to_file($image){

	$fp=fopen($img_path,"w");
	fwrite($fp,$image);
	fclose($fp);
}

$arr=array("url"=>$img_path);

exit(json_encode($arr));


?>