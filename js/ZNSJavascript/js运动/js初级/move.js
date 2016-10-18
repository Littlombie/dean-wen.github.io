//基本的运动动画

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