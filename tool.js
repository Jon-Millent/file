(function (root,factory) {
	
	root.millent = {
		//获取url后的参数
		getRequest : function (names) {   
		     var url = location.search; //获取url中"?"符后的字串   
		     var theRequest = new Object();   
		     if (url.indexOf("?") != -1) {   
		        var str = url.substr(1);   
		        strs = str.split("&");   
		        for(var i = 0; i < strs.length; i ++) {   
		           theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
		        }   
		     }   
		     return names ? theRequest[name] : theRequest;   
		}, 
		//获取两日期之间相差的天数
		getNowDays : function(time){
		     var ttime = new Date(time);
		     var ntime = new Date();

		     var best = new Date();

		     best.setTime(ttime.getTime() - ntime.getTime());

		     return Math.floor(best.getTime() / 86400000);
		},
		//获取本地化时间
		getLocationTime : function(time){
		     var gtime = new Date(time || new Date());
		     return gtime.getFullYear() + '年' + (gtime.getMonth()+1) + '月' + gtime.getDay() +　'日'
		}
	}
	Date.prototype.Format = function (fmt) { //author: meizz
	    var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
})(window,(function(){

	console.log('do your want to do');

})())
