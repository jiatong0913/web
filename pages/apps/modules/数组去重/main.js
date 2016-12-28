'use strict';
// var a = function() {
// 	return 1;
// }
// var b = function() {
// 	return 1;
// }
// var c = {
// 	name: 1,
// 	age: 20
// };
// var c1 = '{"name": "a"}';
// var d = {
// 	age: 20,
// 	name: 1
// }
// var e = [1, 3, {name: 1, age: 1}];
// var f = [1, 3, {age: 1, name: 1}];
// console.log(e === f);
// console.log(JSON.parse(JSON.stringify(c)));
// console.log(JSON.parse(JSON.stringify(d)));

// console.log(JSON.stringify(c) === JSON.stringify(d));

var a = ['小明', '小明', 6, 6, true, true, undefined, undefined, null, null];
var b = [[1, 3, 5], [1, 3, 5], [2, 4], ['小明', true, undefined], [2, 4], ['小明', true, undefined]];
var c = [
	{name: "x", age:"16"},
	{name: "x", age:"16"},
	{name: "d", age:"22"},
	{name: "d", age:"21"}
];
var d = [0, 'x', ['x'], {name: 'x'}];
var x;
var container = document.getElementById('container');
var show = document.getElementById('show');
var input = document.getElementById('input');

addEvent(container, 'click', conEvent);
function conEvent(e) {
	var e = e || window.event;
	var target = e.target || e.srcElement;
	switch (target.id) {
		case 'array1':
			x = a;
			break;
		case 'array2':
			x = b;
			break;
		case 'array3':
			x = c;
			break;
		case 'array4':
			x = d;
			break;
		case 'rm-dup':
			x = rmDup(x);
			break;
		default:
			return;
	}
	show.innerHTML = dump(x);
}

// 数组去重利用的是对象中同一个属性名只能对应一个属性值
function rmDup(array) {
	if (Object.prototype.toString.call(array).slice(8, -1).toLowerCase() !== 'array') {
		return;
	}
	// 先对数组进行排序
	array.sort();
	var newArray = [];
	for (var i = 0, l = array.length; i < l; i++) {

		// 若array[i]是基本类型，直接判断newArray中是否存在array[i]
		// 若array[i]是引用类型
		if (array[i] === null || (typeof array[i] !== 'object' && typeof array[i] !== 'function')) {
			if (newArray.indexOf(array[i]) === -1) {
				newArray.push(array[i]);
			}
		} else {

		}
	}

	// 原数组不变，返回一个去重后的新数组
	return newArray;
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