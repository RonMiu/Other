$(function(){

//首页切换效果
	$("#count1").dayuwscroll({
		parent_ele: '#wrapBox1',
		list_btn: '#tabT04',
		pre_btn: '#left1',
		next_btn: '#right1',
		path: 'left',
		auto: true,
		time: 3000,
		num: 4,
		gd_num: 4,
		waite_time: 1000

})
	$(".fcg-li").mouseenter(function(){
		  $(".fcg-li .btnr").attr("class","btnr border-bai");
	});
	$(".fcg-li").mouseleave(function(){
		  $(".fcg-li .btnr").attr("class","btnr border-blue");
	});
	
	$(".fwx-li").mouseenter(function(){
		  $(".fwx-li .btnr").attr("class","btnr border-bai");
	});
	$(".fwx-li").mouseleave(function(){
		  $(".fwx-li .btnr").attr("class","btnr border-blue");
	});
	
	$(".fjp-li").mouseenter(function(){
		  $(".fjp-li .btnr").attr("class","btnr border-bai");
	});
	$(".fjp-li").mouseleave(function(){
		  $(".fjp-li .btnr").attr("class","btnr border-blue");
	});
	
	$(".fpz-li").mouseenter(function(){
		  $(".fpz-li .btnr").attr("class","btnr border-bai");
	});
	$(".fpz-li").mouseleave(function(){
		  $(".fpz-li .btnr").attr("class","btnr border-blue");
	});
	
	$(".fds-li").mouseenter(function(){
		  $(".fds-li .btnr").attr("class","btnr border-bai");
	});
	$(".fds-li").mouseleave(function(){
		  $(".fds-li .btnr").attr("class","btnr border-blue");
	});
	
	$(".fdl-li").mouseenter(function(){
		  $(".fdl-li .btnr").attr("class","btnr border-bai");
	});
	$(".fdl-li").mouseleave(function(){
		  $(".fdl-li .btnr").attr("class","btnr border-blue");
	});
	
	$(".jm-li").mouseenter(function(){
		  $(".jm-li .btnr").attr("class","btnr border-bai");
	});
	$(".jm-li").mouseleave(function(){
		  $(".jm-li .btnr").attr("class","btnr border-blue");
	});
	
	$(".sm-li").mouseenter(function(){
		  $(".sm-li .btnr").attr("class","btnr border-bai");
	});
	$(".sm-li").mouseleave(function(){
		  $(".sm-li .btnr").attr("class","btnr border-blue");
	});
	
	//产品页导航
	$(".fcg, .fwx, .fjp, .fpz, .fds, .fdl, .jm, .sm").click(function() {
		console.log(1);
		$(".fcg, .fwx, .fjp, .fpz, .fds, .fdl, .jm, .sm").removeClass('on');
		$(this).addClass('on');

	});
	
	//关于我们页导航	
	$(".gy").click(function(){
		$(".gy").attr("class","gy on");
		$(".lx").attr("class","lx");
	});
	$(".lx").click(function(){
		$(".gy").attr("class","gy");
		$(".lx").attr("class","lx on");
	});
})
