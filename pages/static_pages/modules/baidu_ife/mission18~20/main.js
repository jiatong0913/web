// 添加事件和移除事件函数
var eventUtil = {

	addHandler: function(ele, event, handler) {
		if (ele.addEventListener) {
			ele.addEventListener(event, handler, false);
		} else if (ele.attachEvent) {
			ele.attachEvent('on' + event, handler);
		} else {
			ele['on' + event] = handler;
		}
	},

	removeHandler: function(ele, event, handler) {
		if (ele.removeEventListener) {
			ele.removeEventListener(event, handler, false);
		} else if (ele.detachEvent) {
			ele.detachEvent('on' + event, handler);
		} else {
			ele['on' + event] = null;
		}
	},

	getEvent: function(event) {
		return event || window.event;
	},

	getTarget: function(event) {
		return event.target || event.srcElement;
	},

	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},

	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
} 

window.onload = function() {

	//mission18~19
	var input1 = document.getElementById('input1');
	var wrap1 = document.getElementById('wrap1');
	var container = document.getElementById('container');
	eventUtil.addHandler(wrap1, 'click', queue);

	//mission20
	var area = document.getElementById('area');
	var container2 = document.getElementById('container2');
	var input2 = document.getElementById('input2');
	var query = document.getElementById('query');
	eventUtil.addHandler(wrap2, 'click', queue2);
	eventUtil.addHandler(query, 'click', search);
}


//mission18~19


// 按钮事件委托
function queue(event) {
	event = eventUtil.getEvent(event);
	var target = eventUtil.getTarget(event);
	switch (target.id) {
		case 'left_in':
			leftIn();
			break;
		case 'right_in':
			rightIn();
			break;
		case 'left_out':
			leftOut(container);
			break;
		case 'right_out':
			rightOut(container);
			break;
		case 'random':
			dataRandom();
			break;
		case 'bubble':
			bubble();
			break;
		case 'radix':
			radix();
			break;
	}
}

// 按钮左入
function leftIn() {

	//判断输入框不为空
	if (input1.value != '') {

		//判断输入的值为10~100的整数
		if (/^\d+$/.test(input1.value) && parseInt(input1.value) <= 100 && parseInt(input1.value) >= 10) {

			//判断数据是否已满60个
			if (container.childNodes.length < 60) {

				//创建span节点
				var span = dataSpanCreate(parseInt(input1.value), 'span', true);

				//将span节点插入container
				if (container.childNodes.length = 0) {
					container.appendChild(span);
				} else {
					container.insertBefore(span, container.firstChild);
				}
			} else {
				alert('数据已满60个，请先移除后再添加！');
			}
			input1.value = '';
		} else {
			alert('请输入10~100的整数');
			input1.value = '';
			input1.focus();
		}
	} else {
		alert('请在输入框中输入数据');
		input1.focus();
	}
}

// 按钮右入
function rightIn() {
	if (input1.value != '') {
		if (/^\d+$/.test(input1.value) && parseInt(input1.value) <= 100 && parseInt(input1.value) >= 10) {
			if (container.childNodes.length < 60) {
				var span = dataSpanCreate(parseInt(input1.value), 'span', true);
				container.appendChild(span);
			} else {
				alert('数据已满60个，请先移除后再添加！');
			}
			input1.value = '';
		} else {
			alert('请输入10~100的整数');
			input1.value = '';
			input1.focus();
		}
	} else {
		alert('请在输入框中输入数据');
		input1.focus();
	}
}

function leftOut(container) {
	if (container.childNodes.length != 0) {
		container.removeChild(container.firstChild);
	}
}

function rightOut(container) {
	if (container.childNodes.length != 0) {
		container.removeChild(container.lastChild);
	}
}

function dataRandom() {

	//先清空数据
	container.innerHTML = '';

	//创建文档片段
	var frag = document.createDocumentFragment();
	for (var i = 0; i < 60; i++) {
		var span = dataSpanCreate(Math.ceil(Math.random() * 90 + 10), 'span', true);
		frag.appendChild(span);
	}
	container.appendChild(frag);
}

//创建要插入的数据，返回span节点
function dataSpanCreate(num, className, variable) {
	var span = document.createElement('span');
	var text = document.createTextNode(num);
	span.appendChild(text);
	span.className = className;
	if (variable == true) {
		span.style.lineHeight = span.style.height = num + 'px';
	}
	return span;
}

//冒泡排序
function bubble() {
	var nodelist = container.childNodes;
	var count = 0;
	if (nodelist.length >= 2) {
		var i = j =0;
		var loop = function() {
			if (i < nodelist.length - 1) {
				if (j < nodelist.length - 1 - i) {
					count++;
					nodelist[j + 1].style.background = '#f00';
					var dataChange = setTimeout(function() {
						if (parseInt(nodelist[j].innerHTML) > parseInt(nodelist[j + 1].innerHTML)) {
							container.insertBefore(nodelist[j + 1], nodelist[j]);
							var colorChange = setTimeout(function() {
								nodelist[j].style.background = '#ccc';
								j++;
							}, 2);
						} else {
							nodelist[j].style.background = '#ccc';
							j++;
						}
					}, 2);
					setTimeout(loop, 10);
				} else {
					setTimeout(function() {
						nodelist[j].style.background = '#ccc';
						j = 0;
						i++;
						setTimeout(loop, 10);
					}, 2);
				}
			}
			console.log(count);
		}
		setTimeout(loop, 10);
	}
}

// 基数排序
function radix() {
	var nodelist = container.childNodes;
	if (nodelist.length >= 2) {

		// 变量digit表示待排序的数组中最大的数的位数
		var digit = 1;
		var i = k = 0;
		//取得数据数值的数组
		var array = [];
		for (i = 0; i < nodelist.length; i++) {
			array.push(parseInt(nodelist[i].innerHTML));
		}

		//获取最大值
		var array_max = Math.max.apply(Math, array);

		//获取最大值的位数
		for (i = 1; Math.floor(array_max / Math.pow(10, i)) != 0; i++) {
			digit++;
		}

		// radix排序算法
		var seat = [];
		for (i = 0; i < 10; i++) {
			seat[i] = [];
		}

		for (k = 0; k < digit; k++) {
			//将数据按最低位排入座位
			for (i = 0; i < array.length; i++) {
				var temp = Math.floor(array[i] / Math.pow(10, k)) % 10;
				seat[temp].push(array[i]);
			}

			//清空数组
			array = [];

			// 重新排数组
			for (i = 0; i < 10; i++) {
				for (j = 0; j < seat[i].length; j++) {
					array.push(seat[i][j]);
				}
				seat[i] = [];
			}
		}
		console.log(array);

		for (i = 0; i < nodelist.length; i++) {
			nodelist[i].innerHTML = array[i];
			nodelist[i].style.lineHeight = nodelist[i].style.height = array[i] + 'px';
		}
	}
}




//mission20

// 按钮事件委托
function queue2(event) {
	event = eventUtil.getEvent(event);
	var target = eventUtil.getTarget(event);
	switch (target.id) {
		case 'left_in2':
			leftIn2();
			break;
		case 'right_in2':
			rightIn2();
			break;
		case 'left_out2':
			leftOut(container2);
			break;
		case 'right_out2':
			rightOut(container2);
			break;
	}
}

// 按钮左入
function leftIn2() {

	//判断输入框不为空
	if (area.value != '') {

		//判断输入的值为数字、中文、英文
		//可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为不同内容的间隔

		//中文[\u4e00-\u9fa5]，英文[a-zA-Z]，数字[0-9]
		// var allowContent = /0-9/;
		var allowContent = /[\u4e00-\u9fa5a-zA-Z0-9]/g;
		//中文逗号[\uff0c]，英文逗号[\,]，中文顿号[\u3001]，空格[\s]
		var separator = /[\uff0c\,\u3001\s]/g;


		console.log(allowContent.test(area.value));
		//先检测输入内容去除空格，逗号等是否满足数字、中文、英文的要求
		var testValue = area.value.replace(separator, '');
		console.log(testValue);
		if (allowContent.test(testValue)) {

			//判断数据是否已满60个
			if (container2.childNodes.length < 60) {

				var values = area.value.split(separator);
				var frag = document.createDocumentFragment();
				for (var i = 0; i < values.length; i++) {

					//创建span节点
					var span = dataSpanCreate(values[i], 'span2', false);
					frag.appendChild(span);
				}

				//将span节点插入container
				if (container2.childNodes.length = 0) {
					container2.appendChild(frag);
				} else {
					container2.insertBefore(frag, container2.firstChild);
				}
			} else {
				alert('数据已满60个，请先移除后再添加！');
			}
			area.value = '';
		} else {
			alert('请输入中文、英文或数字，可以逗号/顿号/空格作为不同项的分隔符');
			area.value = '';
			area.focus();
		}
	} else {
		alert('请输入中文、英文或数字，可以逗号/顿号/空格作为不同项的分隔符');
		area.focus();
	}
}

// 按钮右入
function rightIn2() {
	//判断输入框不为空
	if (area.value != '') {

		//判断输入的值为数字、中文、英文
		//可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为不同内容的间隔

		//中文[\u4e00-\u9fa5]，英文[a-zA-Z]，数字[0-9]
		// var allowContent = /0-9/;
		var allowContent = /[\u4e00-\u9fa5a-zA-Z0-9]/g;
		//中文逗号[\uff0c]，英文逗号[\,]，中文顿号[\u3001]，空格[\s]
		var separator = /[\uff0c\,\u3001\s]/g;


		console.log(allowContent.test(area.value));
		//先检测输入内容去除空格，逗号等是否满足数字、中文、英文的要求
		var testValue = area.value.replace(separator, '');
		console.log(testValue);
		if (allowContent.test(testValue)) {

			//判断数据是否已满60个
			if (container2.childNodes.length < 60) {

				var values = area.value.split(separator);
				var frag = document.createDocumentFragment();
				for (var i = 0; i < values.length; i++) {

					//创建span节点
					var span = dataSpanCreate(values[i], 'span2', false);
					frag.appendChild(span);
				}

				//将span节点插入container
				container2.appendChild(frag);
			} else {
				alert('数据已满60个，请先移除后再添加！');
			}
			area.value = '';
		} else {
			alert('请输入中文、英文或数字，可以逗号/顿号/空格作为不同项的分隔符');
			area.value = '';
			area.focus();
		}
	} else {
		alert('请输入中文、英文或数字，可以逗号/顿号/空格作为不同项的分隔符');
		area.focus();
	}
}

function search() {
	if (input2.value != '') {

		var inputValue = input2.value;
		console.log(inputValue);
		var children = container2.childNodes;
		for (var i = 0; i< children.length; i++) {
			if (children[i].innerHTML.indexOf(inputValue) >= 0) {
				children[i].className = 'hit';
			}
		}
		input2.value = '';
	} else {
		alert('请输入要查询的关键字');
		input2.focus();
	}
}