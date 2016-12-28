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

function getEleChildren(element) {
	var children = element.childNodes;
	var eleChildren = [];
	for (var i = 0, l = children.length; i < l; i++) {
		if (children[i].nodeType === 1) {
			eleChildren.push(children[i]);
		}
	}
	return eleChildren;
}

function getEleSiblings(element) {
	var siblings = element.parentNode.childNodes;
	var eleSiblings = [];
	for (var i = 0, l = siblings.length; i < l; i++) {
		if (siblings[i].nodeType === 1 && siblings[i] !== element) {
			eleSiblings.push(siblings[i]);
		}
	}
	return eleSiblings;
}








/* 数据操作 */


//数组和对象的深度拷贝
function deepCopy(param) {
	var copy;

	//获取参数的类型
	var type = Object.prototype.toString.call(param).slice(8, -1).toLowerCase();
	if (type === 'array') {
		//数组的深度拷贝

		copy = [];
		for (var i = 0; i < param.length; i++) {

			//对每一项递归深度拷贝
			copy.push(deepCopy(param[i]));
		}
		return copy;
	} else if (type ==='object') {
		//对象的深度拷贝

		copy = {};
		for (item in param) {

			//对每一项递归深度拷贝
			copy[item] = deepCopy(param[item]);
		}
		return copy;
	} else {
		//其他任意类型的深度拷贝（包括基本类型以及对象的子类型如：function、Date、RegExp、Math等）
		copy = param;
		return copy;
	}
}


// 深度输出对象和数组
function dump(param) {
	if (Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === 'object') {

		// 若传入参数是对象
		var s = '{';
		for (var item in param) {
			s = s + item +': ' + dump(param[item]) + ', ';
		}

		// 去掉最后的那个', '
		s = s.slice(0, -2);
		s += '}';
	  return s;
	} else if (Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === 'array') {

		// 若传入参数是数组
		var s = '[';
		for (var i = 0, l = param.length; i < l; i++) {
			s = s + dump(param[i]) + ', ';
		}
		s = s.slice(0, -2);
		s += ']';
		return s;
	} else {

		// 若传入参数非数组或对象，则直接返回
		return param;
	}
}

// 比较两个对象/数组的值是否相同，或比较两个函数表达式的内容是否相同
function compareRef(a, b) {

	// 若比较的两个参数是对象或数组
	if (typeof a === 'object' && typeof b === 'object') {

		//获取参数的类型
		var atype = Object.prototype.toString.call(a).slice(8, -1).toLowerCase();
		var btype = Object.prototype.toString.call(b).slice(8, -1).toLowerCase();

		// 若两者数据类型相同
		if (atype === btype) {
			for (var item in a) {

				// 如果a[item]仍然是个数组、对象或函数，那么递归调用compareRef函数
				// 如果a[item]是基本类型，那么直接比较即可
				if (typeof a[item] === 'object' || typeof a[item] === 'function') {
					compareRef(a[item], b[item]);
				} else {
					if (a[item] !== b[item]) {
						return false;
					}
				}
			}
		}
		return true; 
	} else if (typeof a === 'function' && typeof b === 'function') {
		return a.toString() === b.toString();
	}
}