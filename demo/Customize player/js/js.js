$(document).ready(function(){

	var myVideo = $("#myVideo");

	var timeFormat = function(seconds){
		seconds = Math.floor(seconds);
		var min = Math.floor((seconds/60));
		if(min<10){
			min="0"+min;
		}
		var sec = seconds%60;
		if(sec<10){
			sec="0"+sec;
		}
		return min+":"+sec;
	}

	var showTitlAndControl = function(shouldshow){
		if(shouldshow){
			$(".caption").stop().animate({'top':0},500);
			$(".control").stop().animate({'bottom':0})
		}else{
			$(".caption").stop().animate({'top':-36},500)
			$(".control").stop().animate({'bottom':-46})
		}
	}

	var playAndPause = function(){
		if (myVideo[0].paused || myVideo[0].ended) {
			$(".toPause").hide();
			myVideo[0].play();
			$("#play").removeClass("play").addClass("pause")
		}else{
			myVideo[0].pause();
			$(".toPause").show(200);
			$("#play").removeClass("pause").addClass("play")
		}
	}

	var stopVideo = function(){
		myVideo[0].pause();
		updateProgress( $(".progress").offset().left);
		$(".toPause").show(200);
		$("#play").removeClass("pause").addClass("play")
	}

	// 进度条拖拽
	var enableProgressDrag = function(){
		var progressDrag = false;
		$(".progress").on("mousedown",function(e){
			progressDrag = true;
			updateProgress(e.pageX);
		})
		$(document).on("mouseup",function(e){
			if(progressDrag){
			progressDrag = false;
			updateProgress(e.pageX);
			}
		})
		$(document).on("mousemove",function(e){
			if(progressDrag)
			{
			updateProgress(e.pageX);
			}
		})
	}

	var updateProgress = function(x){
			// 视频窗口页面偏移位置
			var vOffsetLeft = $(".progress").offset().left;
			var progressWidth = $(".progress").width();
			var percent = (x - vOffsetLeft)/progressWidth*100;
			if(percent>=100){
				percent=100;
			}
			if(percent<=0){
				percent=0;
			}
			console.log(percent)
			$("#timeBar").css("width",percent+"%");
			myVideo[0].currentTime = myVideo[0].duration*percent/100;
		}

	var enableSoundDrag = function(){
		var soundDrag = false;
		$(".volumeBar").on("mousedown",function(e){
			soundDrag = true;
			updateSound(e.pageX);
		})
		$(document).on("mouseup",function(e){
			if(soundDrag){
			soundDrag = false;
			updateSound(e.pageX);
			}
		})
		$(document).on("mousemove",function(e){
			if(soundDrag)
			{
			updateSound(e.pageX);
			}
		})
	}

	var updateSound = function(x){
			var volumeBarOffsetLeft = $(".volumeBar").offset().left;
			var volumeBarWidth = $(".volumeBar").width();
			var percent = (x - volumeBarOffsetLeft)/volumeBarWidth*100;
			if(percent>=100){
				percent=100;
			}
			if(percent<=0){
				percent=0;
			}
			$(".volumeChange").css("width",percent+"%");
			myVideo[0].volume = percent/100;
		}

	myVideo.on("loadedmetadata",function(){
		showTitlAndControl(false);
		$("#vContainer").hover(function(){
			showTitlAndControl(true)
		},function(){
			showTitlAndControl(false)
		})
		$(".currentTime").text();
		$("#durantion").text(timeFormat(myVideo[0].duration))
		enableProgressDrag();
		enableSoundDrag();
	})

	myVideo.on("canplay",function(){
		$(".loading").fadeOut(500)
	})

	myVideo.on("click",function(){
		playAndPause();
	})

	myVideo.on("timeupdate",function(){
		var currentTime = myVideo[0].currentTime;
		var duration = myVideo[0].duration;
		var percent = 100*currentTime/duration;
		$("#currentTime").text(timeFormat(currentTime))
		$("#timeBar").css("width",percent+"%")
	})

	$("#play").on("click",function(){
		playAndPause();
	})

	$("#stop").on("click",function(){
		stopVideo();
	})

	$("#volume").on("click",function(){
		var currentVol = ($(".volumeBar").width() - $(".volumeChange").width())/$(".volumeBar").width()
		console.log(currentVol)
		if(myVideo[0].muted){
			myVideo[0].muted=false;
			myVideo[0].volume=currentVol;
			$(".volumeChange").css("width",currentVol*100+"%");
			$("#volume").removeClass("volumex").addClass("volume")
		}else{
			myVideo[0].muted=true;
			$(".volumeChange").css("width",0);
			$("#volume").removeClass("volume").addClass("volumex")
		}
	})
})