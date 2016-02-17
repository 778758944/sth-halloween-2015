/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-07 15:31:01
 * @version $Id$
 */
var sghService=angular.module("sghService",[]);
sghService.factory('View', function(){
	// alert(window.devicePixelRatio);
	window.devicePixelRatio=1;
	// alert(window.devicePixelRatio);
	var use=navigator.userAgent;
	var plam=false;
	if(use.indexOf("iPhone")!=-1){
		var save_img=true;
	}
	else{
		var save_img=false;
	}
	var ori_width=document.documentElement.clientWidth;
	var pixelb=ori_width/640;
	document.getElementById("view").content="width=640,minimum-scale="+pixelb+",initial-scale="+pixelb+",maximum-scale="+pixelb+",user-scalable=no";
	var width=document.documentElement.clientWidth;
	var height=document.documentElement.clientHeight;
	var bl=width/414;
	var nrem=bl*26;
	// alert(nrem);
	$("html").css("fontSize",nrem+"px");
	$("html").css("height",height+"px");
	// console.log($(".view-content"));
	$(".view-content").css("height",height+"px");


	function zoom(rotateStart,scaleX,cvs,c_img,isScale,isRotate){


		hammer=new Hammer.Manager(cvs);

        var pinch=new Hammer.Pinch();
        var rotate=new Hammer.Rotate();

        pinch.recognizeWith(rotate);
        hammer.add([pinch,rotate]);

        if(isRotate){
        	// hammer.on("rotatestart",function(){
        	// 	c_img.draggable(false);
        	// })
	        hammer.on("rotatemove",function(e){
	        	// console.log(e);
	        	// c_img.draggable(false);
	        	rot=e.rotation+rotateStart;
	        	c_img.rotation(rot);
	        });

	        hammer.on("rotateend",function(e){
	        	rotateStart=rot;
	        	// c_img.draggable(true);
	        });
	    }

	    if(isScale){
	    	// hammer.on("pinchstart",function(){
	    	// 	c_img.draggable(false);
	    	// });
	    	hammer.on("pinchmove",function(e){
	    		// c_img.draggable(false);
	            scaless=scaleX*e.scale;

	            c_img.scale({
	                x:scaless,
	                y:scaless
	            });
	        });

	        hammer.on("pinchend",function(){
	        	scaleX=scaless;
	        	// c_img.draggable(true);
	        });
	    }
	}

	return {
		nrem:nrem,
		bl:bl,
		width:width,
		height:height,
		zoom:zoom,
		plam:plam,
		save:save_img
	}
});
var j=0;

sghService.factory("Http",function($location,$timeout){
	var bgm=new Audio();
	// alert("kk");

	function getImage2(){
		// console.log(data);
		var img=new Image();
		// var i=0;
		img.onload=function(){
			hardsj.push(img);
			j=j+1;
			if(j<hard.length){
				getImage2();
			}
			else{
				bgm.play();
				// $("#toStep2").animate({opacity:1},1000,function(){
				// 	$(this).css("display","block");
				// });
				// $(".music_icon").animate({opacity:1},1000);
				$timeout(function(){
					$location.path("/step1");
				},1);
			}
		}
		img.src=hard[j];
	}

	var url=$location.protocol()+"://"+$location.host()+":"+$location.port()+"/html";
	// console.log(url);

	var hard=[
	    url+"/file/Step1/Step1.png",
	    url+"/file/Step1/move.jpg",
		url+"/file/Step8/Step8.jpg",
		url+"/file/Step2/Step2.jpg",
		url+"/file/Step4/model1.png",
		url+"/file/Step4/model2.png",
		url+"/file/Step4/model3.png",
		url+"/file/Step4/model4.png",
		url+"/file/Step4/model5.png",
		url+"/file/Step4/model6.png",
		url+"/file/Step4/model7.png",
		url+"/file/glass2/glass1.png",
		url+"/file/glass2/glass2.png",
		url+"/file/glass2/glass3.png",
		url+"/file/glass2/glass4.png",
		url+"/file/glass2/glass5.png",
		url+"/file/Step6/bg1.jpg",
		url+"/file/Step6/bg2.jpg",
		url+"/file/Step6/bg3.jpg",
		url+"/file/Step6/bg4.jpg",
		url+"/file/Step6/bg5.jpg"
		];


	  $.post('http://wechat.xingwentao.top/jssdk', {
	    url: location.href.split('#')[0]
	  }).done(function(data) {
	  	var conf=data;
	  		wx.config({
		      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		      appId: conf.appId, // 必填，公众号的唯一标识
		      timestamp: conf.timestamp, // 必填，生成签名的时间戳
		      nonceStr: conf.nonceStr, // 必填，生成签名的随机串
		      signature: conf.signature,// 必填，签名，见附录1
		      jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage',"chooseImage","uploadImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		    });

		    wx.ready(function(){


		    	wx.onMenuShareTimeline({
		    		title:"一个万圣节换装派对，萌翻整个朋友圈",
		    		link:"http://sgh.xingwentao.top/wechat/author",
		    		imgUrl:"http://sgh.xingwentao.top/html/file/genal/share.jpg",
		    		success:function(){
		    			$timeout(function(){
		    				// $location.path("/step8");
		    			},1);
		    		},
		    		cancel:function(){

		    		}
		    	});

		    	wx.onMenuShareAppMessage({
				    title: '一个万圣节换装派对，萌翻整个朋友圈', // 分享标题
				    link: 'http://sgh.xingwentao.top/wechat/author', // 分享链接
				    imgUrl: 'http://sgh.xingwentao.top/html/file/Step3/genal/share.jpg', // 分享图标
				    success: function () { 
				        $timeout(function(){
		    				// $location.path("/step8");
		    			},1);
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
		    	// getImage2();
	    		bgm.addEventListener("canplaythrough",function(e){
					bgm.loop=true;
					// bgm.play();
			    	getImage2();
				})
				bgm.src="file/bgm.mp3";
				bgm.load();
		    });
	  });
		// $.post("http://sgh.xingwentao.top/wechat/getticket",function(data){
		// 	console.log(data);
		// 	var conf=JSON.parse(data);

		// 	wx.config({
		//       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		//       appId: conf.appid, // 必填，公众号的唯一标识
		//       timestamp: conf.timestamp, // 必填，生成签名的时间戳
		//       nonceStr: conf.noncestr, // 必填，生成签名的随机串
		//       signature: conf.signature,// 必填，签名，见附录1
		//       jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		//     });

		//     wx.ready(function(){
		//     	getImage2();
		//     });
		// });

		// getImage2();


	return {
		name:"jack",
		bgm:bgm
	}
});


sghService.service("Zoom",function(){
	var Zoom=function(rotatedeg,scale,cvs,shape,isScale,isRotate){
		this.startr=rotatedeg;
		this.starts=scale;
		this.cvs=cvs;
		this.shape=shape;
		this.isScale=isScale;
		this.isZoom=isRotate;
		this.scales;
		this.rotates;
     
        this.hammer=new Hammer.Manager(this.cvs);


		if(isScale&&isRotate){
			var pinch=new Hammer.Pinch();
	        var rotate=new Hammer.Rotate();
	        pinch.recognizeWith(rotate);
	        this.hammer.add([pinch,rotate]);
		}
		else if(isScale&&!isRotate){
			var pinch=new Hammer.Pinch();
			this.hammer.add([pinch]);
		}
		else{
			var rotate=new Hammer.Rotate();
			this.hammer.add([rotate]);
		}

		this.hammer.on("rotatemove",this.scale);

        this.hammer.on("rotateend",this.scaleed);

        this.hammer.on("pinchmove",this.scale);

        this.hammer.on("pinchend",this.scaleed);
	}

	Zoom.prototype={
		scale:function(e){
			// scaless=scaleX*e.scale;
			this.scales=this.starts*e.scale;
            this.shape.scale({
                x:this.scales,
                y:this.scales
            });
            // this.starts=this.scales;
		},

		scaleend:function(){
			this.starts=this.scales;
		},

		rotation:function(e){
			this.rotates=this.startr+e.rotation;
			// rot=e.rotation+rotateStart;
        	c_img.rotation(this.rotates);	
		},

		rotationend:function(e){
			this.startr=this.rotates;
		}
	}
	return Zoom;
})





























