// js规定范围内等比控制图片大小(2013 - 03 - 12 11: 23: 48) 转载▼
// 标签： 等比控制图片 js图片 js等比 等比缩放 分类： Jquery编程
    < img src = "123.jpg"
onload = "DrawImage(this,200,200)" / >
    function DrawImage(ImgD, FitWidth, FitHeight) {
        var image = new Image();
        image.src = ImgD.src;
        if (image.width > 0 && image.height > 0) {
            if (image.width / image.height >= FitWidth / FitHeight) {
                if (image.width > FitWidth) {
                    ImgD.width = FitWidth;
                    ImgD.height = (image.height * FitWidth) / image.width;
                } else {
                    ImgD.width = image.width;
                    ImgD.height = image.height;
                }
            } else {
                if (image.height > FitHeight) {
                    ImgD.height = FitHeight;
                    ImgD.width = (image.width * FitHeight) / image.height;
                } else {
                    ImgD.width = image.width;
                    ImgD.height = image.height;
                }
            }
        }
    }







-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -

// jquery.scrollLoading.js内容（ 异步加载图片）(2013 - 03 - 07 21: 25: 33) 转载▼
// 标签： 异步加载图片 scrollloading 加载图片 js加载图片 jquery 分类： Jquery编程

    (function($) {
    // alert($.fn.scrollLoading);
    $.fn.scrollLoading = function(options) {
        var defaults = {
            attr: "data-url"
        };
        var params = $.extend({}, defaults, options || {});
        params.cache = [];
        $(this).each(function() {
            var node = this.nodeName.toLowerCase(),
                url = $(this).attr(params["attr"]);
            if (!url) {
                return; }
            var data = {
                obj: $(this),
                tag: node,
                url: url
            };
            params.cache.push(data);
        });

        var loading = function() {
            var st = $(window).scrollTop(),
                sth = st + $(window).height();
            $.each(params.cache, function(i, data) {
                var o = data.obj,
                    tag = data.tag,
                    url = data.url;
                if (o) {
                    post = o.position().top;
                    posb = post + o.height();
                    if ((post > st && post < sth) || (posb > st && posb < sth)) {
                        if (tag === "img") {
                            o.attr("src", url);
                        } else {
                            o.load(url);
                        }
                        data.obj = null;
                    }
                }
            });
            return false;
        };

        loading();
        $(window).bind("scroll", loading);
    };
})(jQuery);


-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -

// jquery异步加载图片(2013 - 03 - 07 21: 30: 45) 转载▼
// 标签： 异步加载图片 jquery异步 js异步加载 加载图片 分类： Jquery编程
// 首先引用jquery.scrollLoading.js(上一篇博文有) 和jquery.js
// 把下面代码放到标签里， 就会得到异步加载图片的效果
//这个在我上一篇博文有这个
$(document).ready(function() {
    //实现图片慢慢浮现出来的效果
    $("img").load(function() {
        //图片默认隐藏  
        $(this).hide();
        //使用fadeIn特效  
        $(this).fadeIn("5000");
    });
    // 异步加载图片，实现逐屏加载图片
    $(".scrollLoading").scrollLoading();
});
// 注意img里的class， 在这里就不细说了
// data - url表示将要异步加载的图片， src表示首先加载的图片（ 一般会是小图片， 或者是一个动画， 网页中全部的src链接同一个图片， 这样网页就加载快好多， 这个时候再异步的加载要加载的图片， 也就现在要说的功能） 
< img class = "scrollLoading"
data - url = "image/logo.jpg"
src = "/Images/120.gif" / >

    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
//     js判断鼠标滑轮滚动方向并根据滚动的方向触发不同的事件(2013 - 04 - 11 15: 35: 38) 转载▼
// 标签： js滑轮 滑轮滚动事件 滑轮滚动触发 鼠标滑轮 鼠标滑轮事件 分类： Jquery编程
    < script >
    var scrollFunc = function(e) {
            var direct = 0;
            e = e || window.event;
            if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件             
                if (e.wheelDelta > 0) { //当滑轮向上滚动时
                    alert("滑轮向上滚动");
                }
                if (e.wheelDelta < 0) { //当滑轮向下滚动时
                    alert("滑轮向下滚动");
                }
            } else if (e.detail) { //Firefox滑轮事件
                if (e.detail > 0) { //当滑轮向上滚动时
                    alert("滑轮向上滚动");
                }
                if (e.detail < 0) { //当滑轮向下滚动时
                    alert("滑轮向下滚动");
                }
            }
            ScrollText(direct);
        }
        //给页面绑定滑轮滚动事件
if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
//滚动滑轮触发scrollFunc方法
window.onmousewheel = document.onmousewheel = scrollFunc; < /script>
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
// css等比控制图片大小(2013 - 04 - 12 10: 10: 14) 转载▼
// 标签： 等比控制图片 css等比图片 expression 分类： Html和CSS
//始终控制图片在DIV中上下左右居中
div {
    width: 400 px;height: 400 px;background: #dddddd;
    display: table - cell;vertical - align: middle;text - align: center;
}
//控制图片等比大小
div img {
    max - width: 400 px;
    max - height: 400 px;
    width: expression_r(this.width > 700 && this.width > this.height ? 400 : auto);
    height: expression_r(this.height > 400 ? 400 : auto);
}

< div > < img src = "1.jpg" > < /div>
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
//     jquery读取xml(2012 - 08 - 15 14: 52: 38) 转载▼
// 标签： xml 杂谈 分类： Jquery编程
// XML：
    < ? xml version = "1.0"
encoding = "utf-8" ? >
    < books >
    < book title = "我的爱"
imageurl = "pic/2.jpg" >
    < description >
    bbbbbbbbbbbbbbbbbb < /description> < /book> < book title = "我的love"
imageurl = "pic/1.jpg" >
    < description >
    aaaaaaaaaaaaaaaaaaa < /description> < /book> < book title = "我的Jquery"
imageurl = "pic/3.jpg" >
    < description >
    ccccccccccccccccc < /description> < /book> < /books>
HTML：
    < html >
    < head >
    < title > Jquery 加载XML < /title> < script src = "Scripts/jquery-1.4.1-vsdoc.js"
type = "text/javascript" > < /script> < script type = "text/javascript" >
    $(document).ready(function() {
        $.post('XMLFile.xml', function(d) {
            $('body').append('<h1> Saturn给你推荐几本书： </h1>');
            $('body').append('<dl />');
            $(d).find('book').each(function() {
                var $book = $(this);
                var title = $book.attr("title");
                var description = $book.find('description').text();
                var imageurl = $book.attr('imageurl');
                var html = '<dt> <img class="bookImage" alt="" src="' + imageurl + '" /> </dt>';
                html += '<dd> <span class="loadingPic" alt="Loading" />';
                html += '<p class="title">' + title + '</p>';
                html += '<p> ' + description + '</p>';
                html += '</dd>';
                $('dl').append($(html));
                $('.loadingPic').fadeOut(2000);
            });
        });
    });

< /script> < /head> < body >
    < /body> < /html>
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -

//     倒计时(2012 - 08 - 31 17: 08: 28) 转载▼
// 标签： 倒计时 计时 js计时 杂谈 分类： Jquery编程

function clock() {
    var deadline = new Date("2012/09/01") //开幕倒计时  
    var now = new Date()
    var diff = -480 - now.getTimezoneOffset() //是北京时间和当地时间的时间差  
    var leave = (deadline.getTime() - now.getTime()) + diff * 60000
    var day = Math.floor(leave / (1000 * 60 * 60 * 24))
    var hour = Math.floor(leave / (1000 * 3600)) - (day * 24)
    var minute = Math.floor(leave / (1000 * 60)) - (day * 24 * 60) - (hour * 60)
    var second = Math.floor(leave / (1000)) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
    var str = "距离结束时间：" + day + "天" + hour + "小时" + minute + "分" + second + "秒……";
    alert(str);
    setTimeout("clock()", 1000);
}
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -


// 让弹出的div居中(2012 - 01 - 17 15: 12: 16) 转载▼
// 标签： 弹出div居中 杂谈 分类： Jquery编程
//控制弹出div的形状     
$("#dialogOrder").window({
        title: '添加新货位',
        zIndex: 10000,
        width: 350,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        closable: false,
        closed: true,
        height: 300,
        draggable: true,
        resizable: false,
        shadow: true,
        modal: true
    })
    //保持弹出居中
window.onscroll = function() {
        centerwh("#dialogOrder");
    }
    //DIV居中
function centerwh(obj) {
    var h1 = document.body.clientHeight;
    var h2 = document.documentElement.clientHeight;
    var isXhtml = (h2 >= h1 && h2 != 0) ? true : false;
    var body = isXhtml ? document.documentElement : document.body;
    var wh = { left: 0, top: 0 };
    var vwh = { w: 0, h: 0 };
    vwh.w = $.browser.msie ? parseInt(body.clientWidth) : parseInt(windows.innerWidth);
    vwh.h = $.browser.msie ? parseInt(body.clientHeight) : parseInt(windows.innerHeight);
    wh.left = (vwh.w / 2) - parseInt($(obj).css("width")) / 2;
    wh.top = body.scrollTop + (vwh.h / 2) - parseInt($(obj).css("height")) / 2;
    if (wh.left <= 0) {
        wh.left = 0;
    }
    if (wh.top <= 0) {
        wh.top = 0;
    }
    var scrollTop = document.documentElement.scrollTop;
    $(obj).window("resize", { left: wh.left, top: wh.top })
}

// 用的时候这样用： centerwh("#dialogOrder");
// 这个dialogOrder是弹出div的id
// 注意：“#” 是jquery里获取id的写法
