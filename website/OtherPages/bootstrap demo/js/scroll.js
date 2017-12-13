$(document).ready(function() {
      var $root = $('html, body');  //选择器缓存起来。这样每次点击时就不需要再重新查找了
 	var a = $(".nav-box a");
    // console.log(a.length)
 	$(a).click(function() {
     var href = $.attr(this, 'href');
     $root.animate({
         scrollTop: $(href).offset().top-100
     }, 500, function () {
         window.location.hash = href;
     });
     return false;
 });
    // var top=$("#top").offset().top;
    // console.log(top)
    $(".gotop").on("click",function(){
        console.log(this)
        $root.animate({
            scrollTop:0
        },300)
    })
});
