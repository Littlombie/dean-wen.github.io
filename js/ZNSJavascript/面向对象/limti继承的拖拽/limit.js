function limitDrag(id){
    Drag.call(this,id);//继承属性
}
for(var i in Drag.prototype){
    limitDrag.prototype[i] = Drag.prototype[i];
}
// 只要子类需要与分类不一样的部分 ，知识实现子类
// 不一样的部分，其与父类一样的部分还是重用
limitDrag.prototype.fnMove = function(ev){
	var oEvent = ev||event;
	var l = oEvent.clientX-this.disX;
	var t = oEvent.clientY - this.disY;
	if(l<0){
		l=0;

	}else if (l>document.documentElement.clientWidth-this.oDiv.offsetWidth) {
		l = document.documentElement.clientWidth-this.oDiv.offsetWidth;
	}
	if(t<0){
        t=0
	}else if (t>document.documentElement.clientHeight -this.oDiv.offsetHeight) {
		t= document.documentElement.clientHeight-this.oDiv.offsetHeight;
	}
	this.oDiv.style.left = l +'px';
	this.oDiv.style.top = t +'px';
}