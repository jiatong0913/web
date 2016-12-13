init();

function init() {
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var ident = document.getElementById('identification');
	addEvent(ident, 'click', slideByPoint);
	addEvent(prev, 'click', goPrev);
	addEvent(next, 'click', goNext);

	// 自动轮播
	// var slideAuto = setInterval(goNext, 2000);
}

function slideByPoint(event) {
	var slide = document.getElementById('slide');
	var e = event || window.event;
	var target = e.target || e.srcElement;
	if (target.className !== 'active') {

		// 其他圆点背景色清空
		var siblings = getEleSiblings(target);
		for (var i = 0, l = siblings.length; i < l; i++) {
			siblings[i].className = '';
		}

		// 当前圆点赋背景色
		target.className = 'active';
		var imgWidth = slide.offsetWidth / 7;
		switch (target.getAttribute('index')) {
			case '1':
				slide.style.left = imgWidth + 'px';
				break;
			case '2':
				slide.style.left = imgWidth * 2 + 'px';
				break;
			case '3':
				slide.style.left = imgWidth * 3+ 'px';
				break;
			case '4':
				slide.style.left = imgWidth * 4 + 'px';
				break;
			case "5":
				slide.style.left = imgWidth * 5 + 'px';
				break;
		}
	}
}

function goPrev() {
	var slide = document.getElementById('slide');
	var imgWidth = slide.offsetWidth / 7;
	if (slide.offsetLeft % imgWidth === 0) {
		var direction = -1;
		// 获取index
		var index = -7 * slide.offsetLeft / slide.offsetWidth;
		var slideV = imgWidth / 10;
		var left = slide.offsetLeft;
		if (left >= 0) {
			left = -imgWidth * 5;
		}
		var sto = function() {
			var a = setTimeout(function() {
				if (slide.offsetLeft < left + imgWidth) {
					slide.style.left = slide.offsetLeft + slideV + 'px';
					sto();;
				} else {
					clearTimeout(a);
					if (slide.offsetLeft >= 0) {
						slide.style.left = -imgWidth * 5 + 'px';
					}
					changePoint(index, direction);
				}
			}, 50);
		};
		sto();
	}
}

function changePoint(index, direction) {
	index += direction;
	if (index <= 0) {
		index = 5;
	} else if (index >= 6) {
		index = 1;
	}
	var ident = document.getElementById('identification');
	var span = ident.getElementsByTagName('span');
	for (var i = 0, l = span.length; i < l; i++) {
		if (parseInt(span[i].getAttribute('index')) === index) {
			span[i].className = 'active';
		} else {
			span[i].className = '';
		}
	}
}

function goNext() {
	var slide = document.getElementById('slide');
	var imgWidth = slide.offsetWidth / 7;
	if (slide.offsetLeft % imgWidth === 0) {
		var direction = 1;
		var index = -7 * slide.offsetLeft / slide.offsetWidth;
		var slideV = imgWidth / 10;
		var left = slide.offsetLeft;
		if (left <= -imgWidth * 5) {
			left = 0;
		}
		var sto = function() {
			var a = setTimeout(function() {
				if (slide.offsetLeft > left - imgWidth) {
					slide.style.left = slide.offsetLeft - slideV + 'px';
					sto();;
				} else {
					clearTimeout(a);
					if (slide.offsetLeft <= -imgWidth * 5) {
						slide.style.left = 0;
					}
					changePoint(index, direction);
				}
			}, 50);
		};
		sto();
	}
}

function addEvent(ele, event, handler) {
	if (ele.addEventListener) {
		ele.addEventListener(event, handler, false);
	} else if (ele.attachEvent) {
		ele.attachEvent('on' + event, handler);
	}
}

function getEvent(event) {
	return event || window.event;
}

function getEventTarget(event) {
	return event.target || event.srcElement;
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
