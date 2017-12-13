//定义虚拟数据
var baseData = [
		{name:'首都儿科研究所附属儿童医院',type:'卫生部直属医院',level:'三级甲等',position:'朝阳区',address:'北京市朝阳区雅宝路2号',time:'14:30',phone:'010-85695756',img:'img/hospital-1.jpg'},
		{name:'中日友好医院',type:'卫生部直属医院',level:'三级甲等',position:'朝阳区',address:'北京市朝阳区樱花东路2号',time:'8:30',phone:'010-84205288',img:'img/hospital-2.jpg'},
		{name:'首都医科大学附属北京友谊医院',type:'卫生部直属医院',level:'三级甲等',position:'西城区',address:'北京市西城区永安路95号',time:'9:30',phone:'010-63016616',img:'img/hospital-3.jpg'},
		{name:'首都医科大学附属北京地坛医院',type:'卫生部直属医院',level:'三级甲等',position:'朝阳区',address:'北京市朝阳区樱花东路2号',time:'8:30',phone:'010-84205288',img:'img/hospital-4.jpg'},
		{name:'空军总医院',type:'北京区县属医院',level:'三级甲等',position:'朝阳区',address:'北京市朝阳区樱花东路2号',time:'8:30',phone:'010-84205288',img:'img/hospital-5.jpg'},
		{name:'航天中心医院(原721医院)',type:'北京区县属医院',level:'三级合格',position:'海淀区',address:'北京市海淀区玉泉路15号',time:'8:30',phone:'010-59971160',img:'img/hospital-6.jpg'},
		{name:'北京中医药大学东方医院',type:'北京区县属医院',level:'三级甲等',position:'丰台区',address:'北京丰台区方庄芳星园一区6号',time:'8:30',phone:'010-67689655',img:'img/hospital-1.jpg'},
		{name:'北京电力医院',type:'北京区县属医院',level:'三级合格',position:'丰台区',address:'北京市丰台区太平桥西里甲1号',time:'8:30',phone:'010-84205288',img:'img/hospital-2.jpg'},
		{name:'北京中医医院顺义医院',type:'北京区县属医院',level:'三级甲等',position:'顺义区',address:'北京市顺义区站前东街5号',time:'8:30',phone:'010-84205288',img:'img/hospital-3.jpg'},
		{name:'首都医科大学附属北京潞河医院三级综合医院',type:'其他',level:'三级甲等',position:'通州区',address:'北京市通州区新华南路82号',time:'8:30',phone:'010-69543901',img:'img/hospital-4.jpg'}
	];
var baseHospital= {hospital:baseData}

// 根据对象属性查找
var seekHospital = function(){
	var condetion={
		'type':{},
		'level':{},
		'position':{},
	};
	for(var i=0,l=baseData.length;i<l;i++){
		condetion.type[baseData[i]['type']]=true;
		condetion.level[baseData[i]['level']]=true;
		condetion.position[baseData[i]['position']]=true;
	}
	// console.log(result.type)
	return condetion;
}


// 编写一个函数用来根据数据对象的相关属性进行筛选获取对象
// 如根据type为****的值获得所有对象
var getHospital = function(typeVal,levelVal,positionVal){
	var typeVal = typeVal||'*';
	var levelVal = levelVal||'*';
	var positionVal = positionVal||'*';
	var result = [];//用来保存获得医院列表
	for(i=0;i<baseData.length;i++){
		if(baseData[i]){
			result.push(baseData[i]);
		}
	}
	
	for(var i=0;i<result.length;i++){
		if((typeVal!='*' && result[i].type!=typeVal)||(levelVal!='*' && result[i].level!=levelVal)||(positionVal!='*' && result[i].position!=positionVal)){
			delete result[i];
			// result.splice(i,1);
		}
	}

	var data = [];
	for(i=0;i<result.length;i++){
		if(result[i]){
			data.push(result[i]);
		}
	}
	// console.log(result)
	var obj = {};
	obj.hospital = data;
	return obj;
}
// getHospital('*','*','丰台区');


var findConditionVal=function(){
	var conditionVal = new Array();
	var m = $("#content-filter");
	$(".content-filter-item",m).each(function(index,ele){
		conditionVal[index] = $(this).find(".condition_focus").attr("condition-val")
	})
	console.log(conditionVal)
	return conditionVal;
}

$(document).ready(function(){

	//	更新数据列表
	$('#datalist').on('render',function(ele,data){

		var data=data.hospital;//data为获得数据
		var length=data.length;
		console.log(data)
		var showHospital = new Array();
		var objH={};

		var template  = $('#datalist_tmplate').html();
		$('#datalist').empty();
		console.log(data.length);
		if((Array.isArray(data) && data.length === 0) ){
			$('#datalist').html('<div class="item">没有符合条件的数据！</div>');
		}else{
			for( s in data){
				// console.log(s)
				var html = template
				.replace('{name}',data[s]['name'])
				.replace('{level}',data[s]['level'])
				.replace('{time}',data[s]['time'])
				.replace('{phone}',data[s]['phone'])
				.replace('{address}',data[s]['address'])
				.replace('{img}',data[s]['img'])
				$('#datalist').append(html);
			}
		}

	});

	var contentFilter = $(".content-filter");
	var contentFilterItem = $(".content-filter-item",contentFilter);
	var result = seekHospital();//获得属性
	// console.log(result.type)
	
	contentFilterItem
	.each(function(index,ele){
		// console.log(arguments)
		var m =$(this);//指的是此ele对象
		var conditionName = m.attr('condition');
		for(k in result[conditionName]){
			$('<a href=""><span class="condition" condition-val="'+k+'">'+k+'</span></a>').appendTo(this);
		}
	})
	.on('click','a',function(e){
		$(this).siblings().children().removeClass("condition_focus");
		$(this).children().addClass("condition_focus");
		var findCon = findConditionVal();
		var getH = getHospital(findCon[0],findCon[1],findCon[2]);//获取筛选到的医院
		$('#datalist').triggerHandler('render',getH);
		return false;
	});

	$('#datalist').triggerHandler('render',baseHospital);

})