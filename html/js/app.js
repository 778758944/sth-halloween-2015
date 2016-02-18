/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-07 13:40:08
 * @version $Id$
 */
var hardsj=[];
var url="file/Step3/girl2.png";
var imgurl;
var imgurl2="file/Step3/girl2.png";
var finalnum;
var canvas;
var localId="file/Step3/girl2.png";
var shareText=["一个万圣节换装派对，萌翻整个朋友圈"];
var stext="hhhhhhhhhhh";
var shareobj={};
var app=angular.module("myApp",["ngRoute","sghController","sghService","ngAnimate"]);

app.config(["$routeProvider",function($routeProvider){
	$routeProvider.when("/step1",{
		templateUrl:"template/step1.html",
		controller:"FirstCtrl"
	}).
	when("/step2",{
		templateUrl:"template/step2.html",
		controller:"Step2Ctrl"
	}).
	when("/step3",{
		templateUrl:"template/step3.html",
		controller:"Step3Ctrl"
	}).
	when("/step4",{
		templateUrl:"template/step4.html",
		controller:"Step4Ctrl"
	}).
	when("/step5",{
		templateUrl:"template/step4.html",
		controller:"Step5Ctrl"
	}).
	when("/step6",{
		templateUrl:"template/step4.html",
		controller:"Step6Ctrl"
	}).
	when("/step7",{
		templateUrl:"template/step7.html",
		controller:"Step7Ctrl"
	}).
	when("/step8",{
		templateUrl:"template/step8.html",
		controller:"Step8Ctrl"
	}).
	when("/step9",{
		templateUrl:"template/step9.html",
		controller:"Step9Ctrl"
	}).
	when("/step10",{
		templateUrl:"template/step10.html"
	}).
	when("/load",{
		templateUrl:"template/load.html",
		controller:"LoadCtrl"
	}).
	otherwise({
		redirectTo:"/load"
	})
}]);
app.directive("first",function(View){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			var move_wrap=$(".move_wrap"),
			    img_move=$("#img_move"),
			    img=new Image();

			$(".music_icon").animate({opacity:1},1000);
			img.onload=function(){
				img.className="movep";
				var img2=$(img).clone();
				img_move[0].appendChild(img);
				img_move.append(img2);
				img2[0].style.marginLeft="-1px";
				var movep_h=img.offsetHeight;
				move_wrap.height(movep_h);
				img_move.height(movep_h);
				move_wrap.css("top",(View.height-movep_h)/2+"px");
			}
			img.src="file/genal/background.jpg";
		}
	}
});


app.directive("back",function(View){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			var img=new Image(),
			    d_width=View.width,
			    d_height=View.height;


			img.onload=function(){
				img.className="backp";
				ele[0].appendChild(img);
				var height=img.offsetHeight;
				if(height>=d_height){
					$(img).css("top",(d_height-height)/2+"px");
				}
				else{
					$(img).css('height',"100%").css("width","auto").css("left",(d_width-$(img).width())/2+"px");
				}
			}
			img.src="file/Step1/Step1.png";
		}
	}
});

app.directive("text",function(){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			$(ele).css("line-height",$(ele).height()+"px");
		}
	}
});

app.directive("backpp",function(View){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			d_width=View.width,
		    d_height=View.height;
			var img=scope.bg;

			console.log(img);
			// console.log(img);
			img.className="backp";
			ele[0].appendChild(img);
			var height=img.offsetHeight;
			if(height>=d_height){
				$(img).css("top",(d_height-height)/2+"px");
			}
			else{
				$(img).css('height',"100%").css("width","auto").css("left",(d_width-$(img).width())/2+"px");
			}	
		}
	}
});

app.directive("face",function(View,$location,$timeout,Zoom){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			var d_width=View.width,
			    d_height=View.height,
			    c_img,
			    zoom=View.zoom,
			    scaleX=1,
			    rotateStart=0,
			    // console.log(d_width);
			    cvs,
			    ctx,
			    pic_area=$(".deal_pic"),
			    pic_width=pic_area.width(),
			    pic_height=pic_area.height(),
			    img=new Image(),
			    load=false,
			    swipe,
			    hammer,
			    imagedata,
			    radius=0;

			var stage=new Kinetic.Stage({
				container:"cc",
				width:pic_area.width(),
				height:pic_area.height()
			});

			var layer=new Kinetic.Layer();

			cvs=layer.getCanvas()._canvas;
			ctx=layer.getContext()._context;

			// console.log()

			// stage.add(layer);

			// cvs=layer.getCanvas()._canvas;
			// ctx=layer.getContext()._context;


			function clear(x,y,radius){
				ctx.save();
				ctx.globalCompositeOperation="destination-out";
		    	ctx.beginPath();
		    	// var gradient=ctx.createRadialGradient(x,y,0,x,y,radius);
    			// gradient.addColorStop(0,"rgba(0,0,0,0.6)");
    			// gradient.addColorStop(1,"rgba(255,255,255,0)");
		    	ctx.fillStyle="rgba(0,0,0)";
		    	ctx.arc(x,y,radius,Math.PI*2,false);
		    	ctx.fill();
		    	ctx.restore();
			}

			function windowToCanvas(x,y){
		    	var box=pic_area[0].getBoundingClientRect();
		    	return {
		    		x:x-box.left,
		    		y:y-box.top
		    	}
		    }

		    var swipee=function(e){
		    	// alert("jj");
		    	if(e.targetTouches.length==1){
		    		// imagedata=ctx.getImageData(0,0,cvs.width,cvs.height);
		    		console.log(imagedata);
					e.preventDefault();
					// imgdata=ctx.getImageData(0,0,d_width,d_height);
					var pagex=e.targetTouches[0].pageX;
					var pagey=e.targetTouches[0].pageY;
					var pos=windowToCanvas(pagex,pagey);
					console.log(radius);
					clear(pos.x,pos.y,radius);
				}
		    }

		    var infodata=function(){
		    	imagedata=ctx.getImageData(0,0,cvs.width,cvs.height);
		    }

			$(".swipe div").each(function(index,ele){
				ele.addEventListener("touchstart",function(){
					swipe=true;
					c_img.setDraggable(false);
					hammer=null;
					// imagedata=ctx.getImageData(0,0,cvs.width,cvs.height);

					// hammer.stop();
					$(".scale img").each(function(index,ele){
						if(index==0){
							$(ele).attr("src","file/Step3/scalep.png");
						}
						else{
							$(ele).attr("src","file/Step3/scalem.png");
						}
					})
					$(".swipe img").attr("src","file/Step3/swipes.png");
					$(this).children("img").attr("src","file/Step3/select.png");
					console.log(index);
					if(index==0){
						radius=10;
					}
					else if(index==1){
						radius=20;
					}
					else{
						radius=30;
					}
					cvs.addEventListener("touchmove",swipee,false);
					cvs.addEventListener("touchstart",infodata,false);
				},false);
			});

			$(".scale")[0].addEventListener("touchstart",function(e){
				swipe=false;
				c_img.setDraggable(true);



				var data=cvs.toDataURL();


				var image=new Image();

				image.onload=function(){
					layer.clear();
					c_img.destroy();
					c_img=new Kinetic.Image({
						x:0,
						y:0,
						width:image.width,
						height:image.height,
						image:image,
						draggable:true
					});

					layer.add(c_img);
					layer.draw();
					zoom(0,1,cvs,c_img,true,true);
				}

				image.src=data;
				
				cvs.removeEventListener("touchmove",swipee,false);
				cvs.removeEventListener("touchstart",infodata,false);




				$(".swipe img").each(function(index,ele){
					$(ele).attr("src","file/Step3/swipem.png");
				})
				$(this).find("img").each(function(index,ele){
					// console.log(ele);
					if(index==0){
						$(ele).attr("src","file/Step3/s_p.png");
					}
					else{
						$(ele).attr("src","file/Step3/s_m.png");
					}
				});
			},false);

			$("#redo")[0].addEventListener("touchstart",function(){
				if(swipe){
					ctx.putImageData(imagedata,0,0);
				}
			},false);

			$("#toStep4").on("touchstart",function(){
				// alert("kk");
				// console.log(layer);

				canvas=layer.getCanvas()._canvas;
				// alert(canvas);

				$timeout(function(){
					$location.path("/step4");
				},1);

			});
			// $(".logo").css("display","none");

			img.onload=function(){
				load=true;
				var i_width=img.width;
				var i_height=img.height;
				var hh=(pic_width/i_width)*i_height;
				console.log(i_width);
				console.log(i_height);
				console.log(pic_width);
				console.log(pic_height);
				console.log(hh);
				// $(".logo").css("display","none");

				 c_img=new Kinetic.Image({
					x:pic_width/2,
					y:pic_height/2+(pic_height-hh)/2,
					crop:{
						x:0,
						y:0,
						width:i_width,
						height:i_height
					},
					image:img,
					width:pic_width,
					height:hh,
					offset:{
						x:pic_width/2,
						y:pic_height/2,
					},
					draggable:true
				});

				layer.add(c_img);
				stage.add(layer);

				cvs=layer.getCanvas()._canvas;
				ctx=layer.getContext()._context;
				// stage.pixelSize();

				// layer.width=pic_area.width();
				// layer.height=pic_area.height();
				zoom(rotateStart,scaleX,cvs,c_img,true,true);


			}
			img.src=localId;
		}
	}
});
app.directive("showw",function(View){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			// alert("kk");
			var wrap=ele[0],
			    img_list=scope.models,
			    toleft=$(".toLeft"),
			    toright=$(".toRight"),
			    cls=scope.type,
			    i=0;
			for(var i=0;i<img_list.length;i++){
				var div=document.createElement("div");
				div.className=cls;
				div.appendChild(img_list[i]);
				ele[0].appendChild(div);
			}


			if(scope.isS){
				wrap.style.width="700%";
			}
			else{
				wrap.style.width="500%";
			}

			var width=View.width,
			    min=View.width-wrap.offsetWidth,
			    max=0;

			    console.log(min);
			    console.log(max);

			toleft[0].addEventListener("touchstart",function(){
				// alert("ll");
				var pos=wrap.offsetLeft-width;
				if(pos>=min){
					$(wrap).animate({"left":pos+"px"},200);
				}
			},false);

			toright[0].addEventListener("touchstart",function(){
				// alert("kk");
				var pos=wrap.offsetLeft+width;
				if(pos<=max){
					$(wrap).animate({"left":pos+"px"},200);
				}
			})

		}
	}
});
app.directive("bcgd",function(View,$location,$timeout){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			$(".view-content").css("height",View.height+"px");
			$(".logo").css("display","block");

		}
	}
});

app.directive("cmusic",function(Http){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			var element=ele[0],
			    bgm=Http.bgm;
			element.addEventListener("touchstart",function(){
				// alert("kk");
				if(!bgm.paused){
					bgm.pause();
					$(this).children("img").attr("src","file/genal/close.png");
				}
				else{
					bgm.play();
					$(this).children("img").attr("src","file/genal/open.png");
				}
			},false);
		}
	}
});

app.directive("cs",function(View,$location,$timeout){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			var width=View.width,
			    height=View.height,
			    dishw=height-width,
			    y_t=dishw/2,
			    img_list=scope.models,
			    glass_list=scope.glass,
			    bg_list=scope.bgs,
			    toleft=$(".toLeft"),
			    toright=$(".toRight"),
			    arr=[],
			    k=0,
			    hammer,
			    zoom=View.zoom,
			    velocity=500,
			    animating=false,
			    img=new Image(),
			    dym,
			    cvs,
			    next,
			    prev,
			    hammer,
			    can_next=true,
			    step=1,
			    glass_h=(glass_list[0].height*width/glass_list[0].width),
			    glass_t=height*0.4,
			    stage=new Kinetic.Stage({
					container:"container",
					width:width,
					height:height*1.7
				}),

				layer=new Kinetic.Layer({
					id:"layer1"
				}),
				group=new Kinetic.Group();


				// console.log(y_b);
				$(".logo").css("display","block");




				// console.log(cvs);

				function list(img_list,layer,layer2,c_w,c_h,x,y,opaa){
					// console.log(opaa);
					// console.log(layer2);
					var i_width=c_w||width,
					    i_height=c_h||height,
					    posx=x||width,
					    posy=y||0,
					    op=opaa||1;

					for(var i=0;i<img_list.length;i++){
						if(i==0){
							arr[i]=new Kinetic.Image({
								x:0,
								y:posy,
								image:img_list[i],
								width:i_width,
								height:i_height,
								opacity:op
							});



							if(opaa==0.01){
								// alert("opa");
								var speedd=0.5;
								var anii=new Kinetic.Animation(function(frame){
									var o=speedd*(frame.timeDiff/1000)+arr[0].opacity();
									if(o>1){
										anii.stop();
										arr[0].opacity(1);
									}
									else{
										arr[0].opacity(o);
									}
									// arr[i].opacity(opa);
								},layer);
								anii.start();
							}
							// var pos=arr[i].()-width;
						}
						else if(i==img_list.length-1){
							// console.log(i);
							arr[i]=new Kinetic.Image({
								x:-posx,
								y:posy,
								image:img_list[i],
								width:i_width,
								height:i_height
							});
						}
						else{
							arr[i]=new Kinetic.Image({
								x:posx,
								y:posy,
								image:img_list[i],
								width:i_width,
								height:i_height
							});
						}
						layer.add(arr[i]);
					}

					next=function(){
						console.log(img_list.length);
						left=true;
						if(k>=img_list.length-1&&!animating){
							ani(arr[arr.length-1],arr[0],layer2).start();
							arr[arr.length-2].x(width);
							k=0;
						}
						else if(!animating){
							ani(arr[k],arr[k+1],layer2).start();
							if(k==0){
								arr[arr.length-1].x(width);
							}
							else{
								arr[k-1].x(width);
							}
							// arr[k-1].x(width);
							k++;
						}
					}

					prev=function(){
						left=false;
						if(k<=0&&!animating){
							ani(arr[0],arr[arr.length-1],layer2).start();
							arr[arr.length-2].x(-width);
							k=arr.length-1;
						}
						else if(!animating){
							// console.log(layer2);
							ani(arr[k],arr[k-1],layer2).start();
							if(k==1){
								arr[arr.length-1].x(-width);
							}
							else{
								arr[k-2].x(-width);
							}
							// arr[k-2].x(-width);
							k--;
						}
					}
					toleft[0].addEventListener("touchstart",prev,false);


					toright[0].addEventListener("touchstart",next,false);
				}

				function init(){
					arr=[];
					k=0;
					toleft[0].removeEventListener("touchstart",prev,false);
					toright[0].removeEventListener("touchstart",next,false);
				}


				// img.onload=function(){
					list(img_list,layer,layer,width,height,0,height*0.06);
					var i_width=canvas.width,
					    i_height=canvas.height;

					show_h=((width/2)*i_height)/i_width;

				    dym=new Kinetic.Image({
				    	x:width/4,
				    	y:show_h/2+scope.img_pos.top,
				    	image:canvas,
				    	width:width/2,
				    	height:show_h,
				    	offset:{
				    		y:show_h/2
				    	},
				    	draggable:true
				    });

					layer.add(dym);
					stage.add(layer);


					cvs=layer.getCanvas()._canvas;

					zoom(0,1,cvs,dym,true,true);

			$("#toStep5").on("touchstart",function(e){
				if(animating){
					return;
				}
				hammer=null;
				step=step+1;

				if(step==2){



					$("#iff").css("opacity",1);
					finalnum=k;
					shareobj.text=shareText[0];



					layer.toImage({
						callback:function(img){
							// console.log(img);
							console.log(img.width);
							console.log(img.height);
							dym.destroy();
							arr[k].destroy();
							layer.clear();
							dym=new Kinetic.Image({
								x:width/2,
								y:height/2,
								width:img.width,
								height:img.height,
								image:img,
								offset:{
									x:width/2,
									y:height/2
								},
								draggable:true
							});
							layer.add(dym);
							layer.draw();

							var bs=1;
							var speed=660;

							$(".c_text").animate({"opacity":0},500,function(){
								// alert("kk");
								$timeout(function(){
									scope.text="选择你喜欢的墨镜";
									scope.notice="墨镜不太合适？移动或缩放人物试试看。";
									$(".c_text").animate({"opacity":1},500);
								},1)
							});


							// var ani=new Kinetic.Animation(function(frame){
							// 	var dist=bs*(frame.timeDiff/1000);
							// 	dym.
							// })
							var cvs=layer.getCanvas()._canvas;
							// hammer=null;

							// zoom(0,1,cvs,dym,true);
							// console.log(group.width());
							// group.x(-width*1.5/2);
							for(var i=0;i<arr.length;i++){
								if(i!=k){
									arr[i].destroy();
								}
							}

							init();
							// console.log(dym.scale());
							var ani=new Kinetic.Animation(function(frame){
								var dist=bs*(frame.timeDiff/1000);
								var s=speed*(frame.timeDiff/1000);
								// dym.scale();
								var x=dym.scaleX()+dist;
								var y=dym.scaleY()+dist;
								if(x>1.7){
									ani.stop();
									zoom(0,x,cvs,dym,true);
									list(glass_list,layer,layer,width,glass_h,width,glass_t,0.01);
									layer.draw();
								}
								else{
									dym.scale({
										x:x,
										y:y
									});

									dym.move({
										y:s
									});
								}
							},layer);
							ani.start();
						}
					});
				}
				else if(step==3){
					hammer=null;
					// $(".mask1").css("display","none");
					// $(".mask2").css("display","block");
					$("#toStep5").text("确定");
					// list(bg_list,layer,layer);
					// group.draggable(false);
					// layer.draggable(true);

					// layer.scale({
					// 	x:1/2.5,
					// 	y:1/2.5
					// });
					// console.log(layer.x());
					// layer.x(width/2);
					$(".c_text").animate({"opacity":0},500,function(){
						$timeout(function(){
							scope.text="选择你喜欢的场景";
							scope.notice="人物在场景中是可以缩放移动哒。";
							$(".c_text").animate({"opacity":1},500);
						},1)
					});

					layer.toImage({
						callback:function(img){
							stage.height(height);
							console.log(img.width);
							console.log(img.height);
							dym.destroy();
							arr[k].destroy();

							layer.clear();
							dym=new Kinetic.Image({
								x:width/2,
								y:height/2,
								width:img.width,
								height:img.height,
								image:img,
								offset:{
									x:width/2,
									y:height/2
								},
								draggable:true,
								dragBoundFunc:function(pos){
									y_t=pos.y;
									// console.log(dym.width());
									// console.log(dym.height());
									// if(pos.y<y_t+50){
									// 	return {
									// 		x:pos.x,
									// 		y:y_t+50
									// 	}
									// }
									// else if(pos.y>y_b-50){
									// 	return {
									// 		x:pos.x,
									// 		y:y_b-50
									// 	}
									// }
									return {
										x:pos.x,
										y:pos.y
									}
								}
							});


							for(var i=0;i<arr.length;i++){
								if(i!=k){
									arr[i].destroy();
								}
							}

							init();
							var bs=-1;
							var speed=-350;
							var speedx=120;
							var ani=new Kinetic.Animation(function(frame){
								var dist=bs*(frame.timeDiff/1000);
								var s=speed*(frame.timeDiff/1000);
								// dym.scale();
								var x=dym.scaleX()+dist;
								var y=dym.scaleY()+dist;
								var ss=speedx*(frame.timeDiff/1000);
								if(x<0.25){
									ani.stop();
									zoom(0,x,cvs,dym,true);		
								}
								else{
									dym.scale({
										x:x,
										y:y
									});

									dym.move({
										y:s,
										x:ss
									});
								}
							},layer);
							ani.start();

							// init();
							list(bg_list,layer,layer);
							layer.add(dym);
							// layer.draw();
							var cvs=layer.getCanvas()._canvas;
							// hammer=null;

							// zoom(0,1,cvs,dym,true);
							layer.draw();
						}
					})

					// for(var i=0;i<arr.length;i++){
					// 	if(i!=k){
					// 		arr[i].destroy();
					// 	}
					// }

					// init();
					// bgg.destroy();
					// list(bg_list,layer2,layer2);
					// layer2.draw();
					// layer.draw();
				}
				else if(step==4){
					// alert("kk");
					// alert(y_t);
					if(y_t-220<0){
						y_t=0;
					}
					else if(y_t-220+width>height){
						y_t=height-width;
					}
					else{
						y_t=y_t-220;
					}

					// alert(y_t);

					$(".hcing").css("display","block");
					// $(".img")
					$(".hcing").animate({opacity:1},1000);
					stage.toDataURL({
						callback:function(url){
							// alert(y_t);

							// if(View.save){
							// 	imgurl2=url;
							// 	$timeout(function(){
							// 		$location.path(scope.nexts);
							// 	},1);
							// }
							var data=url.substr(22);
							$.post("http://sgh.xingwentao.top/compaign/imageupload",{
								data:data,
								openid:use,
								starty:y_t,
								width:width
							},function(data){
								
								imgurl=JSON.parse(data).url;
								shareobj.url=JSON.parse(data).shareurl;
								// console.log(shareobj.imgUrl);
								// $(".hcing").css("display","none");
								// if(!View.save){
									imgurl2=imgurl;
									// $timeout(function(){
									// 	$(".hcing").css("display","none");
									// 	$location.path(scope.nexts);
									// },1);
								// }

								// alert(imgurl);

								// wx.onMenuShareTimeline({
						  //   		title:stext,
						  //   		link:"http://sgh.xingwentao.top/wechat/author",
						  //   		imgUrl:imgurl,
						  //   		success:function(){
						  //   			$timeout(function(){
						  //   				$location.path("/step8");
						  //   			},1);
						  //   		},
						  //   		cancel:function(){
						    			
						  //   		}
						  //   	});
                                var im=new Image();

                                im.onload=function(){
	                            	wx.onMenuShareAppMessage({
									    title: shareobj.text, // 分享标题
									    link: 'http://sgh.xingwentao.top/wechat/author', // 分享链接
									    imgUrl: shareobj.url, // 分享图标
									    success: function () { 
									        $timeout(function(){
							    				$location.path("/step8");
							    			},1);
									    },
									    cancel: function () { 
									        // 用户取消分享后执行的回调函数
									    }
									});
                                	// wx.onMenuShareAppMessage(shareobj);


								// $timeout(function(){
									wx.onMenuShareTimeline({
							    		title:shareobj.text,
							    		link:"http://sgh.xingwentao.top/wechat/author",
							    		// imgUrl:shareobj.
							    		imgUrl:shareobj.url,
							    		success:function(){
							    			$timeout(function(){
							    				$location.path("/step8");
							    			},1);
							    		},
							    		cancel:function(){
							    			
							    		}
							    	});

							    	// wx.onMenuShareTimeline(shareobj);

							    	$timeout(function(){
										// $(".hcing").css("display","none");
										$location.path(scope.nexts);
									},1);

                                }
                                // alert(shareobj.url);
                                im.src=shareobj.url;
						  //   	wx.onMenuShareAppMessage({
								//     title: stext, // 分享标题
								//     link: 'http://sgh.xingwentao.top/wechat/author', // 分享链接
								//     imgUrl: imgurl, // 分享图标
								//     success: function () { 
								//         $timeout(function(){
						  //   				$location.path("/step8");
						  //   			},1);
								//     },
								//     cancel: function () { 
								//         // 用户取消分享后执行的回调函数
								//     }
								// });


								// // $timeout(function(){
								// 	wx.onMenuShareTimeline({
							 //    		title:stext,
							 //    		link:"http://sgh.xingwentao.top/wechat/author",
							 //    		imgUrl:imgurl,
							 //    		success:function(){
							 //    			$timeout(function(){
							 //    				$location.path("/step8");
							 //    			},1);
							 //    		},
							 //    		cancel:function(){
							    			
							 //    		}
							 //    	});
								// },1000);

								// wx.onMenuShareTimeline({
						  //   		title:stext,
						  //   		link:"http://sgh.xingwentao.top/wechat/author",
						  //   		imgUrl:imgurl,
						  //   		success:function(){
						  //   			$timeout(function(){
						  //   				$location.path("/step8");
						  //   			},1);
						  //   		},
						  //   		cancel:function(){
						    			
						  //   		}
						  //   	});

								// alert(imgurl);
								// $timeout(function(){
								// 	$location.path(scope.nexts);
								// },1);
							});
						}
					})
				}
			});




			function ani(node1,node2,layer){
				animating=true;
				var a=new Kinetic.Animation(function(frame){
					if(left){
						var dist=-velocity*(frame.timeDiff/1000);
						node1.move({
							x:dist
						});
						node2.move({
							x:dist
						});
						if(node2.x()<=0){
							node2.x(0);
							node1.x(-width);
							// node1.x(width);
							animating=false;
							a.stop();
						}
					}
					else{
						var dist=velocity*(frame.timeDiff/1000);
						node1.move({
							x:dist
						});
						node2.move({
							x:dist
						});

						if(node2.getX()>=0){
							node2.setX(0);
							node1.setX(width);
							animating=false;
							a.stop();
						}
					}
				},layer);
				return a;
			}

		}
	}
});
app.directive("rule",function(View){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			var showrule=false,
			    rule=$(".wrap_rule"),
			    share_wrap=$(".share_wrap");
			$(".close").on("touchstart",function(){
				rule.animate({opacity:0},500,function(){
					$(this).css("display","none");
				});
				showrule=true;
			});

			$("#rule").on("touchstart",function(){
				var url="/html/index.php#/step7#rule";
				_hmt.push(["_trackPageview",url]);
				rule.css("display","block");
				rule.animate({opacity:1},500);
			});

			$("#share").on("touchstart",function(){
				var url="/html/index.php#/step7#share";
				_hmt.push(["_trackPageview",url]);
				share_wrap.css("display","block");
				share_wrap.animate({opacity:1},500);
			});

			share_wrap.on("touchstart",function(){
				share_wrap.animate({opacity:0},500,function(){
					share_wrap.css("display","none");
				});
			})
		}
	}
})

app.directive("file",function($location,$timeout){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			ele[0].addEventListener("touchstart",function(){
				wx.chooseImage({
					success:function(res){
					   localId=res.localIds;
					   $timeout(function(){
					   	$location.path("/step3");
					   },1);
					}
				});
			},false);
		}
	}
})

app.directive("fileup",function($timeout,$location){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			var form=document.getElementById("forr");


			$("#user_img").change(function(){
				// alert(use);
				$("#oi").attr("value",use);
				// console.log(new FormData(form));


				// console.dir($("#user_img"));

				setTimeout(function(){
					$.ajax({
						url:"http://sgh.xingwentao.top/html/upload.php",
						type:"POST",
						data:new FormData(form),
						contentType:false,
						processData:false
					}).done(function(result){
						console.log(result);
						console.log(typeof result);
						var res=JSON.parse(result);
						// alert(res.url);
						localId=res.url;
						$timeout(function(){
							$location.path("/step3");
						},1);
					}).fail(function(err){
						alert("err");
					});
				},12);
			})
		}
	}
});

app.directive("sub",function(){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			ele[0].addEventListener("touchstart",function(){
				console.log($("#na").val());
				console.log($("#tt").val());
				var user_info={
					name:$("#na").val(),
					tel:$("#tt").val(),
					openid:use
				};
				var reg=/^1[3|4|5|8][0-9]\d{4,8}$/;
				if(reg.test(user_info.tel)){
					$.post("http://sgh.xingwentao.top/compaign/infoupload",user_info,function(data){
						$(".lucky").css("display","none");
						$(".formm").css("display","none");
						$("#success_info").css("display","block");
						$("#sub").css("display","none");
						$("#again").css("display","block");
					});
				}
				else{
					alert("请输入正确的手机号码");
				}
			},false);
		}
	}
});

app.directive("anfile",function($location,$timeout){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			ele[0].addEventListener("touchstart",function(){
				// $timeout(function(){
	   //      		$location.path("/step3");
	   //      	},1);
				wx.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album', 'camera'], 
				    success:function(res){
				    	var local=res.localIds[0];
				    	wx.uploadImage({
						    localId: local, // 需要上传的图片的本地ID，由chooseImage接口获得
						    isShowProgressTips: 1, // 默认为1，显示进度提示
						    success: function (res) {
						        var serverId = res.serverId;
						        console.log(use);
						        console.log("get IMAGE");
						        $.post("http://sgh.xingwentao.top/html/upload.php",{
						        	server_id:serverId,
						        	openid:use
						        },function(data){
						        	alert(data);
						        	var res=JSON.parse(data);
						        	// alert(res.url);
						        	localId=res.url;
						        	$timeout(function(){
						        		$location.path("/step3");
						        	},1);
						        })
						    }
						});
				    }
				})
			},false)
		}
	}
})
app.directive("shh",function(){
	return {
		restrict:"A",
		link:function(scope,ele,attr){
			console.log(ele[0]);
			$(ele[0]).css("display","block");
		}
	}
});
































