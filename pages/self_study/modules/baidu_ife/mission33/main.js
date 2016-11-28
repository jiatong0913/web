function forward() {

	var top = parseInt(square.style.top);
	var left = parseInt(square.style.left);
	if (!(top <= 0 || top >= 400 || left <= 0 || left >= 400)) {
		var h = attr.head;
		switch (h) {
			case 'top':
				square.style.top = parseInt(top) - 40 + 'px';
				break;
			case 'bottom':
				square.style.top = parseInt(top) + 40 + 'px';
				break;
			case 'left':
				square.style.left = parseInt(left) - 40 + 'px';
				break;
			case 'right':
				square.style.left = parseInt(left) + 40 + 'px';
				break;
		}
		return true;
	}

	return false;
}

function turnleft() {
	var d = attr.direction;
	var h = attr.head;
	attr.turncount++;
	var deg = -90 * attr.turncount;
	for (var i = 0; i < 4; i++) {
		if (h == d[i]) {
			if (i == 0) {
				attr.head = d[3];
			} else {
				attr.head = d[i-1];
			}
		}
	}
	square.style.transform = 'rotate(' + deg + 'deg)';
	return true;
}

function turnright() {
	var d = attr.direction;
	var h = attr.head;
	attr.turncount--;
	var deg = -90 * attr.turncount;
	for (var i = 0; i < 4; i++) {
		if (h == d[i]) {
			if (i == 3) {
				attr.head = d[0];
			} else {
				attr.head = d[i+1];
			}
		}
	}
	square.style.transform = 'rotate(' + deg + 'deg)';
	return true;
}

function turnback() {
	turnright();
	turnright();
}

window.onload = function() {
	var doc = document;
	var square = doc.getElementById('square');
	square.style.top = square.offsetTop + 'px';
	square.style.left = square.offsetLeft + 'px';
	var input = doc.getElementById('input');
	var exec = doc.getElementById('exec');
	attr = {
		top: square.offsetTop,
		left: square.offsetLeft,
		turncount: 0,
		direction: ['top', 'right', 'bottom', 'left'],
		head: 'top'
	};
	console.log(attr);
	addEvent(exec, 'click', start);
}

//绑定事件函数
function addEvent(ele, event, handler) {
	if (ele.addEventListener) {
		ele.addEventListener(event, handler, false);
	} else if (ele.attachEvent) {
		ele.attachEvent('on' + event, handler)
	}
}


function start() {
	var command = ['GO', 'TUN LEF', 'TUN RIG', 'TUN BAC'];
	var value = input.value;
	if (value != '') {
		switch (value) {
			case command[0]:
				forward();
				break;
			case command[1]:
				turnleft();
				break;
			case command[2]:
				turnright();
				break;
			case command[3]:
				turnback();
				break;
			default:
				alert('please input correct command!');
				input.value = '';
				input.focus();
				break;
		}
	} else {
		alert('please input command!');
		input.focus();
	}
}
