/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-07 15:46:30
 * @version $Id$
 */
var sghController=angular.module("sghController",[]);

sghController.controller("LoadCtrl",function($scope,$location,Http,View){
	// $scope.start=function(){
	// 	$location.path("/step1");
	// }
	var url="/html/index.php#/load";
	_hmt.push(["_trackPageview",url]);

})






sghController.controller("FirstCtrl",function($scope,$location,View){
	var url="/html/index.php#/step7";
	_hmt.push(["_trackPageview",url]);
	$scope.next=function(){
		$location.path("/step2");
	}
});

sghController.controller("Step2Ctrl",function($scope,$location,View){
	var url="/html/index.php#/step2";
	_hmt.push(["_trackPageview",url]);
	$scope.bg=hardsj[3];
	console.log($scope.bg);
	$scope.next=function(){
		$location.path("/step3");
	}
	$scope.show=View.plam;
});

sghController.controller("Step3Ctrl",function($scope,$location){
	var url="/html/index.php#/step3";
	_hmt.push(["_trackPageview",url]);
	$scope.bg=hardsj[2];
	$scope.next=function(){
		$location.path("/step4");
	}

});

sghController.controller("Step4Ctrl",function($scope,$location,View){
	var url="/html/index.php#/step4";
	_hmt.push(["_trackPageview",url]);
	var width=View.width;
	var height=View.height;
	$scope.bg=hardsj[16];
	$scope.next=function(){
		$location.path("/step5");
	}
	$scope.type="model";
	$scope.models=hardsj.slice(4,11);
	$scope.glass=hardsj.slice(11,16);
	$scope.bgs=hardsj.slice(16);
	$scope.text="选择你喜欢的人物";
	$scope.isS=true;
	$scope.img_width=width*0.15;
	// $scope.img_height=height*0.082;
	$scope.img_pos={
		left:(width-$scope.img_width)/2,
		top:height*0.14
	};
	$scope.nexts="/step7";
	$scope.layout=true;
	$scope.notice="*可移动头像位置与人物匹配，把头像放大至身体的两倍看起来更Q哦！";

});

sghController.controller("Step5Ctrl",function($scope,$location,View){
	var url="/html/index.php#/step5";
	_hmt.push(["_trackPageview",url]);
	var width=View.width;
	var height=View.height;
	$scope.bg=hardsj[16];
	$scope.next=function(){
		$location.path("/step6");
	}
	$scope.type="glass";
	$scope.models=hardsj.slice(11,16);
	$scope.text="选择你喜欢的墨镜";
	$scope.isS=false;
	$scope.img_width=width*2.5;
	$scope.img_height=height*2.5;
	$scope.img_pos={
		left:(width-$scope.img_width)/2,
		top:height*-0.15
	};
	$scope.nexts="/step6";
	$scope.layout=false;
});
sghController.controller("Step6Ctrl",function($scope,$location,View){
	var url="/html/index.php#/step6";
	_hmt.push(["_trackPageview",url]);
	var width=View.width;
	var height=View.height;
	$scope.bg=hardsj[16];
	$scope.next=function(){
		$location.path("/step8");
	}
	$scope.type="bgg";
	$scope.models=hardsj.slice(16);
	$scope.text="选择你喜欢的背景";
	$scope.isS=false;
	$scope.img_width=width;
	$scope.img_height=height;
	$scope.img_pos={
		left:(width-$scope.img_width)/2,
		top:0
	};
	$scope.nexts="/step7";
	$scope.layout=true;
	$scope.upload=true;
});
sghController.controller("Step8Ctrl",function($scope,$location){
	var url="/html/index.php#/step8";
	_hmt.push(["_trackPageview",url]);
	$scope.bg=hardsj[2];
	$scope.next=function(){
		$location.path("/step1");
	}

});
sghController.controller("Step7Ctrl",function($scope,$location){
	var url="/html/index.php#/step7";
	_hmt.push(["_trackPageview",url]);
	$scope.url=imgurl2;
	// $scope.next=function(){
	// 	$location.path("/step9");
	// }
});
// sghController.controller("Step9Ctrl",function($scope,$location)



































