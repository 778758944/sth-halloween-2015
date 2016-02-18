<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-02-18 12:02:31
 * @version $Id$
 */
$data=$_POST["data"];
$imgname=date("Y-m-d-H-i-s").".png";
$img_path1="/www/sgh/sites/default/files/userimages/".$imgname;
$img_path2="/sites/default/files/userimages/".$imgname;


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