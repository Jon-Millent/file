;(function (window, document, undefined) {
    function getClientWidth() {
        return document.documentElement.clientWidth || document.body.clientWidth
    }

    function Barrels($ct) {    //0 创建对象
        this.$ct = $ct;
        this.imgNum = 40;
        this.bodyC = getClientWidth()

        this.paddingLeft = 8


        this.baseHeight = this.bodyC >= 800 ? 400 : 200; //！！！！！！预设行高！！！！！！

        this.baseHeight = this.bodyC <= 370 ? 150 : this.baseHeight // hack for iphone se

        this.rowList = [];    //创建空数组，用来放置拿到的图片

        this.$ct.html('')
        this.loadImg();       //开始下载图片
    }


    Barrels.prototype = {

        loadImg: function() {   //2 加载图片
            var _this = this;    //缓存全局this
            var imgUrls = this.getImgUrls(100);
            $.each(imgUrls,function(idx, url){
                var img = new Image();

                img.onload = function(){

                    console.log(img.width)
                    var originWidth = img.width,
                        originHeight = img.height,
                        ratio = originWidth/originHeight;//！！！！！！得到图片原始比例


                    var imgInfo = {
                        target: $(img),
                        width: _this.baseHeight*ratio,//！！！！！！首次缩放
                        height: _this.baseHeight,
                        ratio: ratio
                    };


                    _this.render(imgInfo);
                };
                img.src = url.img;
            });
        },


        render: function(imgInfo){    // 3 预先摆放

            var _this = this;
            var rowList = this.rowList,
                rowWidth = 0,
                rowHeight = 0,
                clientWidth = this.$ct.width(),
                lastImgInfo = imgInfo;

            this.rowList.push(imgInfo);

            $.each(rowList,function(idx, imgInfo){

                try{
                    rowWidth += imgInfo.width;
                    if(rowWidth  > clientWidth ){
                        rowList.pop();
                        rowWidth = rowWidth - lastImgInfo.width;
                        rowHeight = clientWidth * _this.baseHeight / rowWidth;//！！！！！！再次缩放

                        _this.createRow(rowHeight, lastImgInfo.width);
                        _this.rowList = [];
                        _this.rowList.push(lastImgInfo);
                    }
                }catch (e){

                }


            });
        },

        createRow: function(rowHeight, rowWidth){    // 4 正式摆放图片
            var $rowCt = $('<div class="img-row"></div>');
            $.each(this.rowList, function(idx, imgInfo){
                var $imgCt = $('<div class="img-box"></div>'),
                    $img = imgInfo.target;
                $img.height(rowHeight);
                $imgCt.append($img);
                $imgCt.append($('<div class="cover-box"><a href="#"></a></div>'))

                $rowCt.append($imgCt);


            });
            // console.log(this.$ct);
            this.$ct.append($rowCt);
        },



        getImgUrls: function(num) {      //1创建图片
            var urls = [
                {
                    img: './images/1.jpg'
                },
                {
                    img: './images/2.jpg'
                },
                {
                    img: './images/3.jpg'
                },
                {
                    img: './images/4.jpg'
                },
                {
                    img: './images/5.jpg'
                },
                {
                    img: './images/6.jpg'
                },
                {
                    img: './images/7.jpg'
                },
                {
                    img: './images/8.jpg'
                },
                {
                    img: './images/9.jpg'
                },
                {
                    img: './images/10.jpg'
                },
                {
                    img: './images/11.jpg'
                },
                {
                    img: './images/12.jpg'
                },
                {
                    img: './images/13.jpg'
                },
                {
                    img: './images/14.jpeg'
                },
                {
                    img: './images/15.jpg'
                },
                {
                    img: './images/16.jpg'
                },
                {
                    img: './images/17.jpg'
                },
                {
                    img: './images/18.jpg'
                },
                {
                    img: './images/20.jpg'
                },
                {
                    img: './images/21.jpg'
                }
            ]

            return urls;
        }

    };


    window.Barrels = Barrels

})(window, document, undefined);
