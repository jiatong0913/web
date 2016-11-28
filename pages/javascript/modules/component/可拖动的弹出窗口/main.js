// 获取DOM节点
function $$(identifier) {
	if (document.querySelectorAll) {

		// 若支持querySelectorAll，复写函数，并在末尾返回自执行一次得到的结果
		$$ = function(identifier) {
			return document.querySelectorAll(identifier);
		};
	} else {
		var node = [];
		// 若不支持querySelectorAll，则只能通过id、class和标签名来获取
		if (identifier.charAt(0) === '#') {
			node = document.getElementById(identifier.slice(1));
			return node;	
		} else if (identifier.charAt(0) === '.') {
			var elements = document.getElementsByTagName('*');
			for (var i = 0, len = elements.length; i < len; i++) {
				if (elements[i].className === identifier.slice(1)) {
					node.push(elements[i]);
					return node;
				}
			}
		} else {
			node = document.getElementsByTagName(identifier);
			if (node) {
				return node;
			} else {
				return false;
			}
		}
	}
	return $$(identifier);
}

function init() {
	var x, y;
	var btn = $$('#btn')[0];
	addEvent(btn, 'click', showPopup);
}

init();

function addEvent(ele, event, handler) {
	if(ele.addEventListener) {
		ele.addEventListener(event, handler, false);
	} else if(ele.attachEvent) {
		ele.attachEvent('on' + event, handler);
	}
}

function removeEvent(ele, event, handler) {
	if(ele.removeEventListener) {
		ele.removeEventListener(event, handler, false);
	} else if(ele.detachEvent) {
		ele.detachEvent('on' + event, handler);
	}
}

function showPopup() {
	var popup = $$('#popup')[0];
	popup.style.display = 'block';
	var close = $$('#close')[0];
	var isDraggable = false;
	var offsetX = 0,
		offsetY = 0;
	addEvent(close, 'click', hidePopup);
	addEvent(popup, 'mousedown', draggable);
	addEvent(popup, 'mousemove', drag);
	addEvent(document, 'mouseup', disdraggable);
}

function hidePopup() {
	var popup = $$('#popup')[0];
	popup.style.display = 'none';
	removeEvent(close, 'click', hidePopup);
}

function draggable(e) {
	isDraggable = true;
	offsetX = e.pageX - this.offsetLeft;
	offsetY = e.pageY - this.offsetTop;
}

function drag(e) {
	if (isDraggable) {
		var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
		var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		var moveX = e.pageX - offsetX;
		var moveY = e.pageY - offsetY;
		var maxX = clientWidth - this.offsetWidth;
		var maxY = clientHeight - this.offsetHeight;
		this.style.left = Math.min(Math.max(0, moveX), maxX) + 'px';
		this.style.top = Math.min(Math.max(0, moveY), maxY) + 'px';
	}
}

function disdraggable() {
	isDraggable = false;
}