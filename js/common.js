// 常用的基本代码库
// 整理中。。。
// 
// 
//基本的运动动画
//用于元素的运动变化 （宽高、字体大小、透明度、边框宽度变化）
//引用方法：startMove(obj, attr, iTarget);obj表示元素，attr表示要变的属性，iTarget表示变的值
//使用实例：startMove(oDiv,'width','500');
function getStyle(obj, name) {

    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];
    }
}

function startMove(obj, attr, iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var cur = 0;
        if (attr == 'opacity') {
            cur = parseFloat(getStyle(obj, attr)) * 100;
        } else {
            cur = parseInt(getStyle(obj, attr));
        }
        var speed = parseInt(iTarget - cur) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (cur == iTarget) {
            clearInterval(obj.timer);
        } else {
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
    }, 30);
}

// ---------------------------------------------------------------------------

//颜色的渐变动画
//所有代码的执行时间只有24毫秒左右。  
function fadeColor(from, to, callback, duration, totalFrames) {
    //用一个函数来包裹setTimeout，根据帧数来确定延时     
    function doTimeout(color, frame) {
        setTimeout(function() {
            try {
                callback(color);
            } catch (e) {
                JSLog.write(e);
            }
        }, (duration * 1000 / totalFrames) * frame);
        //总持续秒数/每秒帧数*当前帧数=延时(秒)，再乘以1000作为延时(毫秒)      
    }
    // 整个渐变过程的持续时间，默认为1秒     
    var duration = duration || 1;
    // 总帧数，默认为持续秒数*15帧，也即每秒15帧      
    var totalFrames = totalFrames || duration * 15;
    var r, g, b;
    var frame = 1;
    //在第0帧设置起始颜色      
    doTimeout('rgb(' + from.r + ',' + from.g + ',' + from.b + ')', 0);
    //计算每次变化所需要改变的rgb值      
    while (frame < totalFrames + 1) {
        r = Math.ceil(from.r * ((totalFrames - frame) / totalFrames) + to.r * (frame / totalFrames));
        g = Math.ceil(from.g * ((totalFrames - frame) / totalFrames) + to.g * (frame / totalFrames));
        b = Math.ceil(from.b * ((totalFrames - frame) / totalFrames) + to.b * (frame / totalFrames));
        // 调用本frame的doTimeout          
        doTimeout('rgb(' + r + ',' + g + ',' + b + ')', frame);
        frame++;
    }
}

// ---------------------------------------------------------------------------

// 用数组模拟jq的class选择器
function getClassName(ParentId, NewClassName) {
    var AllClassElem = ParentId.getElementsByTagName(" * ");
    var AllClass = [];
    var i = 0;
    for (var i = 0; i < AllClassElem.length; i++) {
        if (AllClassElem[i].className == NewClassName) {
            AllClass.push(AllClassElem[i]);
        }
    }
    return AllClass;
}



// 用法：

var PElementId = document.getElementById("bar");
var buttons = getClassName(PElementId, "sco");

//取id = "bar" 下class = "sco" 的元素；

// ---------------------------------------------------------------------------

// 鼠标事件（对应物体随着鼠标的移动而跟随者移动）
//鼠标事件 封装成函数
function getPos(ev) {
    // body...  
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    return {
        x: ev.clientX + scrollLeft,
        y: ev.clientY + scrollTop
    }
}

// 以下为调用的实例
// document.onmousemove = function(ev) {
//     var oEvent = ev || event
//     var oDiv = document.getElementById('div1');
//     var pos = getPos(oEvent);
//     oDiv.style.left = pos.x + 'px';
//     oDiv.style.top = pos.y + 'px';
// }

// ---------------------------------------------------------------------------


//仿jq addClass方法

HTMLElement.prototype.addClass = function(className) {
    var c = this.className;
    if (c) {
        var arr = c.split("");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == className) {
                return;
            }
        }
        this.className = c + "" + className;
    } else {
        this.className = className;
    }
}

// ---------------------------------------------------------------------------

//仿jq addClass方法2
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) {
        obj.className += " " + cls;
    }
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

function toggleClass(obj,cls){
    if(hasClass(obj,cls)){
        removeClass(obj, cls);
    } else {
        addClass(obj, cls);
    }
}
// ---------------------------------------------------------------------------


// js仿jq sibling方法

function siblings(o) { //参数o就是想取谁的兄弟节点，就把那个元素传进去
    var a = []; //定义一个数组，用来存o的兄弟元素
    var p = o.previousSibling;
    while (p) { //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
        if (p.nodeType === 1) {
            a.push(p);
        }
        p = p.previousSibling //最后把上一个节点赋给p
    }
    a.reverse() //把顺序反转一下 这样元素的顺序就是按先后的了
    var n = o.nextSibling; //再取o的弟弟
    while (n) { //判断有没有下一个弟弟结点 n是nextSibling的意思
        if (n.nodeType === 1) {
            a.push(n);
        }
        n = n.nextSibling;
    }
    //for(var i=0;i<a.length;i++){
    //   a[i].style.fontSize=”12px”;
    //  a[i].style.background=”#fff”;
    // }
    return a //最后按从老大到老小的顺序，把这一组元素返回
}

// ---------------------------------------------------------------------------
// 事件绑定函数 （封装）
function myAddEvent(obj,ev,fn){
    if(obj.attachEvent){
        obj.attachEvent('on'+ev,fn)
    }else{
        obj.addEventListener(ev,fn);
    }
}
