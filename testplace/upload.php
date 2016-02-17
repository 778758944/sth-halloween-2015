<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-08-03 15:50:36
 * @version $Id$
 */
$data=$_POST["data"];
$filename=dirname(__FILE__);
// echo(date(Y,m,H,i));

function convert_data($data){
	$image=base64_decode($data);
	save_to_file($image);
}
function save_to_file($image){

	// echo "jj";

	$fp=fopen("images/".date("Y-m-d-H-i-s").".png","w");
	fwrite($fp,$image);
	fclose($fp);
}

convert_data($data);
?>