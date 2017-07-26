	//封装自定义指令 tap
	Vue.directive('tap', {
		update : function(){
			console.log('ssssss')
		},
		bind : function(ele,data){
			var dataTime = 0;
			var defaultTime = 100;
			var defaultPx = 10;
			var x = 0;
			var y = 0;

			ele.addEventListener('touchstart',function(e){
				x = e.changedTouches[0].clientX;
				y = e.changedTouches[0].clientY;
				dataTime = new Date();
			})
			ele.addEventListener('touchend',function(e){
				var endTime = (new Date() - dataTime);

				var endX = Math.abs(x - e.changedTouches[0].clientX);
				var endY = Math.abs(y - e.changedTouches[0].clientY);

				if(endTime <= defaultTime || (endX <= defaultPx && endY <= defaultPx)){
					data.value();

					if(data.modifiers.prevent){
						e.preventDefault();
						console.log('prevent')
					}
					if(data.modifiers.stop){
						e.stopPropagation();
						console.log('stop')
					}
				}
			})
		}
	})
