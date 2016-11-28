'use strict';

/* 事件处理函数部分 */

// 添加事件
function addEvent(ele, event, handler) {
	if (ele.addEventListener) {
		
		// DOM2级
		ele.addEventListener(event, handler, false);
	} else if (ele.attachEvent) {

		// IE
		ele.attachEvent('on' + event, handler);
	}
}

// 移除事件
function removeEvent(ele, event, handler) {
	if (ele.removeEventListener) {

		// DOM2级
		ele.removeEventListener(event, handler, false);
	} else if (ele.detachEvent) {

		// IE
		ele.detachEvent('on' + event, handler);
	}
}

// 获取事件
function getEvent(event) {

	// 前者DOM2级，后者IE
	return event || window.event;
}

// 获取事件目标
function getEventTarget(event) {

	// 前者DOM2级，后者IE
	return event.target || event.srcElement;
}

// 阻止默认事件
function preventDefault(event) {
	if (event.preventDefault) {

		// DOM2级
		event.preventDefault();
	} else {

		// IE
		event.returnValue = false;
	}
}

// 阻止事件冒泡
function stopPropagation(event) {
	if (event.stopPropagation) {

		// DOM2级
		event.stopPropagation();
	} else {

		// IE
		event.cancelBubble = true;
	}
}







/* DOM操作 */

// 获取DOM节点
function $$(identifier) {
	if (document.querySelectorAll) {

		// 若支持querySelectorAll，复写函数，并在末尾返回自执行一次得到的结果
		$$ = function(identifier) {
			return document.querySelectorAll(identifier);
		};
	} else {

		// 若不支持querySelectorAll，则只能通过id、class和标签名来获取
		if (identifier.charAt(0) === '#') {
			var node = document.getElementById(identifier.slice(1));
			return node;	
		} else if (identifier.charAt(0) === '.') {
			var node = [];
			var elements = document.getElementsByTagName('*');
			for (var i = 0, len = elements.length; i < len; i++) {
				if (elements[i].className === identifier.slice(1)) {
					node.push(elements[i]);
					return node;
				}
			}
		} else {
			var node = document.getElementsByTagName(identifier);
			if (node) {
				return node;
			} else {
				return false;
			}
		}
	}
	return $$(identifier);
}

function getNodes(element, parent) {
	var parentNode = parent || document;
	return parentNode.getElementsByTagName(element);
}



