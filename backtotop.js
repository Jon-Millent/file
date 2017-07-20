	$('.backtotop').on('click',function(){

		console.log('sssssssssss')
		var speed = 10;
		var anitime = 1000;
		var nowTop = (document.documentElement.scrollTop || document.body.scrollTop);
		var px =  nowTop / (20);

		var time = setInterval(function(){
			nowTop-=px;
			document.documentElement.scrollTop = document.body.scrollTop = nowTop;
			if(nowTop <= 0){
				clearInterval(time);
			}
		},10)
	});
