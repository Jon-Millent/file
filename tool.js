//获取url后的参数
function GetRequest(names) {   
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
  } 
//获取两日期之间相差的天数
function getNowDays(time){
     var ttime = new Date(time);
     var ntime = new Date();

     var best = new Date();

     best.setTime(ttime.getTime() - ntime.getTime());

     return best.getTime() / 86400000;

}
//获取本地化时间
function getLocationTime(time){
     var gtime = new Date(time);
     return gtime.getFullYear() + '年' + (gtime.getMonth()+1) + '月' + gtime.getDay() +　'日'
}
