 $(function(){
    var timer=null;//设置定时器
    var index=0;//索引
    var len=$('.banner div').length;
    //绑定图片轮播事件
    $('.content').on('mouseout',function(){
        timer=setInterval(function(){
        index++;
        if(index>=len){index=0;}
        changeImg();
        },2000)
    })
   $('.content').on('mouseover',function(){ 
    if(timer){
        clearInterval(timer);
    }
   })
     //圆点导航函数
    $('.dot div').on('click',function(){
         index=$(this).index();
       changeImg();
    })
    //左右切换函数！
    $('.next').on('click',function(){
      index++;
      if (index>=len) {index=0;}
      changeImg();
    });
     $('.prev').on('click',function(){
      index--;
      if (index<0) {index=len-1;}
      changeImg();
  
    });
   function changeImg(){
    $('.banner div').eq(index).removeClass('slide').addClass('active');
    $('.banner div').eq(index).siblings().addClass('slide');//切换图片函数
    $('.dot div').eq(index).addClass('dot_act').removeClass('dot_rem');//圆点导航函数
    $('.dot div').eq(index).siblings().removeClass('dot_act').addClass('dot_rem');
   }
    $('.content').mouseout();
})