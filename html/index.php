<?php
$openid=$_GET['openid'];
?>


<!DOCTYPE html>
<html ng-app="myApp">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>睛彩万圣节</title>
<meta name="description" content="">
<meta name="keywords" content="">
<meta name="msapplication-tap-highlight" content="no" />
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,maximum-scale=1,user-scalable=no" id="view">
<link href="css/reset.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<link href="css/animate.css" rel="stylesheet">
<script>
	var use="<?php echo $openid; ?>"||"o4cOIjiBKchlwnAAT5cjKVUkHNG8";
	// alert(use);
	window.devicePixelRatio=1;
	//alert(use);
</script>
<script src="contribute/js/angular.js"></script>
<script src="contribute/js/angular-route.js"></script> 
<script src="contribute/js/angular-animate.js"></script>
<script src="contribute/js/kinetic.js"></script>
<!-- <script src="contribute/js/gesture.js"></script> -->
<script src="contribute/js/hammer.js"></script>
<script src="contribute/js/jquery.js"></script>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="js/controller.js"></script>
<script src="js/service.js"></script>
<script src="js/app.js"></script>
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?b25d56c9a27c38b69ab938ccd856e504";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
</head>
<body>
	<!-- <div id="music"><img src="file/genal/open.png"></div> -->
    <div ng-view class="view-content">
    </div>
    <div id="music" cmusic><img src="file/genal/open.png" class="music_icon"></div>
    <!-- <img class="logo" src="file/genal/logo.png"/> -->
</body>
</html>


























