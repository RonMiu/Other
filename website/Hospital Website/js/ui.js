$.fn.UiSearch=function(){
		$('.ui-search-selected').on('click',function(){
		$('.ui-search-select-list').show()
		.on('click','a',function(){
			$('.ui-search-selected').text($(this).text());
		});
		return false;
	})
	$('body').on('click',function(){
		$('.ui-search-select-list').hide();
		})
}
// 
$.fn.UiTab=function(caption,content,focus){
	var ui=$(this);
	// var getclass=$(caption).attr('class');
	// console.log(getclass);
	var focus=focus||'';
	var tabs=$(caption,ui);
	var cons=$(content,ui);
	tabs.on('click',function(){
		var index=$(this).index();
		$(this).addClass(focus+' '+'item_focus').siblings().removeClass(focus+' '+'item_focus');
		cons.hide().eq(index).show();
		return false;
	})

}
$.fn.Uigotop=function(){
	var ui=$(this);
	// var el=$('.ui-gotop')
	var el=$('<div class="ui-gotop"></div>');
	ui.append(el);
	el.on('mouseover',function(){
		$(this).text('回到顶部').css("background-image","none")
	})
	.on('mouseout',function(){
		$(this).text(' ').css('background-image','url("./img/icon-go-up.png")');
	})
	.on('click',function(){
		ui.animate({scrollTop:0},500)
	})
	$(window).on('scroll',function(){
		// var bodyHeight=$('body').height();
		// var browserHeight=$(window).height();
		var scrollHeight=$(document).scrollTop();
		if( scrollHeight>0){
			el.fadeIn(500);
		}else{
			el.fadeOut(500);
		}
	})
}

$.fn.UiSlider=function(){
	var ui=$(this);
	var wrap = $('.banner-slider-wrap',ui)
	var items = $('.banner-slider-wrap > .item', ui);
	var dots = $('.banner-slider-process > .item',ui)
	var btn_prev = $('.banner-slider-arrow > .left',ui);
	var btn_next = $('.banner-slider-arrow > .right',ui);
	var index = 0;
	var width = items.eq(0).width();
	var length = items.length;
	var timer=null;

	//具体操作
	wrap.on('move_prev',function(){
		if(index<=0){
			index=length;
		}
		index=index-1;
		wrap.triggerHandler('move_to',index);
	})
	.on('move_next',function(){
		if(index>=length-1){
			index=-1;
		}
		index=index+1;
		wrap.triggerHandler('move_to',index);
	})
	.on('move_to',function(event,index){
		// debugger
		wrap.css('left',index*width*-1);
		dots.removeClass('item_focus').eq(index).addClass('item_focus');
	})
	.on('auto_move',function(){
		timer = setInterval(function(){
			wrap.triggerHandler('move_next');
		},3000);
	})
	.on('mouseover',function(){
		if (timer) {
			clearInterval(timer)
		}
	})
	.on('mouseout',function(){
		wrap.triggerHandler('auto_move')
	})
	.triggerHandler('auto_move');

	//事件
	btn_prev.on('click',function(){
		wrap.triggerHandler('move_prev');
	});
	btn_next.on('click',function(){
		wrap.triggerHandler('move_next');
	})
	dots.on('click',function(){
		var index = $(this).index();
 		wrap.triggerHandler('move_to',index);
	})
}

$.fn.UiCascading = function(){
	var ui = $(this);
	var selects = $('select',ui);
	
	// var data 
	selects
		.on('autoLoad',function(area,level,hospitalName){
		var ui=$(this);
		var method=$(this).attr('data-search');
		// console.log(method)
		var data = AjaxRemoteGetData[method]();
		$(this).find('option').remove();
		$.each(data,function(i,item){
			var el=$('<option>').attr('value',i).text(item);
		 	ui.append(el);
		})
	})
	selects
	.on('change',function(event,index){

		var val = $(this).children('option:selected').text();//获取选中的内容
		var index = selects.index(this);//获得这个选项框的值
		var where=$(this).val();
		console.log(val)
		//获取前面全部选项框选中的值，存在一个数组中当参数
		var chosenVal = new Array();
		if(index>0){
			for(var i=0;i<index;i++){
				chosenVal[i] =$('select',ui).eq(i).children('option:selected').text();
			}
		}//获取了参数
		console.log(chosenVal);
	
		//重置此下拉框的内容后面的选项框
		$('select:gt('+index+')',ui).find('option:gt(0)').remove();
		$('select:gt('+index+')').triggerHandler('reloadOptions')
		// debugger
	})
	.on('reloadOptions',function(array){
		//$(this)是select对象
		var thisSelect = $(this);
		var method=$(this).attr('data-search');
		var index = selects.index(this);
		//获取前面全部选项框选中的值，存在一个数组中当参数
		// var chosenVal = new Array();
		if(index>0){
			for(var i=0;i<index;i++){
				array[i] =$('select',ui).eq(i).children('option:selected').text();
			}
		}//获取了参数
		// console.log(array[0]);
		var data = AjaxRemoteGetData[method](array[0],array[1],array[2]);
		// console.log(data)
		//将data数组的项作为选项添加到下拉框中
		thisSelect.find('option').remove();//清楚此框的选项
		$.each(data,function(i,item){
			var el=$('<option>').attr('value',i).text(item);
		 	thisSelect.append(el);
		})

	})
	//初始化选项框
	selects.eq(0).triggerHandler('autoLoad');
}

$(function () {	
	$('.ui-search').UiSearch();
	$('.content').UiTab('.content-tab-caption > .item','.content-tab-block');
	$('.content-tab-block').UiTab('.content-tab-block-caption > span','.tab-content','caption_foucus');
	$('body').Uigotop();
	$('.ui-slider').UiSlider();
	$('.ui-cascading').UiCascading();
})