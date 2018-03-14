
// create by mycat
if(window.jQuery){

    $.extend({
        yorkg: {
            getUserAgent: function(){
                var resout = {
                    type: '',
                    version: '',
                    isIe: false
                }
                var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串

                var typer = ''
                var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
                var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
                var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
                var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
                if (isIE) {
                    resout.isIe = true
                    // var IE5 = IE55 = IE6 = IE7 = IE8 = false;
                    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                    reIE.test(userAgent);
                    var fIEVersion = parseFloat(RegExp["$1"]);
                    resout.version = fIEVersion
                }

                return resout
            }
        },
        random : function(lowValue,highValue){
            var choice=highValue-lowValue+1;
            return Math.floor(Math.random()*choice+lowValue);
        },
        getReauest : function() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
    })

    $(function () {
        $('input, textarea').placeholder();
    })

    console.log($.yorkg)
}
