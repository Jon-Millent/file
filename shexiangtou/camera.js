;(function() {
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;  
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL; 
    var exArray = []; //存储设备源ID  
    try{
        MediaStreamTrack.getSources(function (sourceInfos) {  
            for (var i = 0; i != sourceInfos.length; ++i) {  
                var sourceInfo = sourceInfos[i];  
                //这里会遍历audio,video，所以要加以区分  
                if (sourceInfo.kind === 'video') {  
                    exArray.push(sourceInfo.id);  
                }  
            }  
        });	
    }catch(e){}

    console.log(exArray,"--------------------------------")
    console.log("--------------------------------")

	function Factory(videoNode){
		this.video = videoNode;
	}
	Factory.prototype.getMedia = function(success,error){
		setTimeout(function(){
			console.log(document.documentElement.clientWidth,"{{{{")
			if (navigator.getUserMedia) {  
	            navigator.getUserMedia({  
	                'video': {  
	                    'optional': [{  
	                        'sourceId': exArray[1] //0为前置摄像头，1为后置  
	                    }]
	                    // width : document.documentElement.clientWidth,
	                    // height : document.documentElement.clientHeight
	                }
	            }, success, function(){
	            	console.log(arguments)
	            });  
	        }else {  
	            console.error('你的浏览器不支持调取摄像头');
	            error();  
	        }	
		},500)
	}
	Factory.prototype.qrcode = function(fn){
		var root = this;
		
        var stop = window.setInterval(function () {  
        	root.canvas.setAttribute('width',root.video.offsetWidth);
			root.canvas.setAttribute('height',root.video.offsetHeight);
            root.contenttext.drawImage(root.video, 0, 0,root.video.offsetWidth,root.video.offsetHeight);  
        	fn(root.canvas);
        }, 500);  

        return function(){
    		clearInterval(stop);
    	}

	}
	Factory.prototype.run = function(success,error){
		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute('id','qr-canvas');
		this.canvas.setAttribute('width',this.video.offsetWidth);
		this.canvas.setAttribute('height',this.video.offsetHeight);
		this.canvas.style.display='none';
		document.body.appendChild(this.canvas);
		this.contenttext = this.canvas.getContext('2d');

		// this.vW = 0;
		// this.vH = 0;
		// this.video.addEventListener('resize',function(){
		// 	console.log(this)
		// })


		var root = this;
		this.getMedia(function(stream){
			console.log(stream)
			if (root.video.mozSrcObject !== undefined) {  
                //Firefox中，video.mozSrcObject最初为null，而不是未定义的，我们可以靠这个来检测Firefox的支持  
                root.video.mozSrcObject = stream;  
            }else {  
                root.video.src = window.URL && window.URL.createObjectURL(stream) || stream;  
            }  
            success && success();
		},function(){
			error && error();
		})
	}

	window.Camera = Factory;
})();
