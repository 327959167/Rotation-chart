//获取目标元素的属性
function getStyle(el,property){
	if(getComputedStyle){
		return getComputedStyle(el)[property]; 
	}else{
		return el.currentstyle[property]
	}
}

//使元素位移或改变透明度
function animation(el,properties){ //目标元素-参数-值
	
	clearInterval(el.timerId);	//先清除计时器
	el.timerId = setInterval(function(){
		
		for(var property in properties){
			var current;
			var target = properties[property]; //目标值
			
			if(property == "opacity"){	//透明度 or 位移
				current = Math.round((getStyle(el,'opacity'))*100);
			}else{
				current = parseInt(getStyle(el,property));
			}
			
			var speed = (target - current) / 40;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			
			if(property == 'opacity'){
				el.style.opacity = (current + speed)/100 ;
			}else{
				el.style[property] = current + speed + 'px'; //改变元素的left
			}
		}
			
	},10)
}