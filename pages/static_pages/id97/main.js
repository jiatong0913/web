init();

// 全局变量自动轮播
var autoSlide = setInterval(goNext, 5000);

function init() {
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var ident = document.getElementById('identification');
	var ad1Close = document.getElementById('ad1-close');
	var ad2Close = document.getElementById('ad2-close');
	var ad3Close = document.getElementById('ad3-close');
	var imgBox = document.querySelectorAll('div.img');
	for (var i = 0; i < imgBox.length; i++) {
		addEvent(imgBox[i], 'mouseover', showMask);
	}
	addEvent(ident, 'click', slideByPoint);
	addEvent(prev, 'click', goPrev);
	addEvent(next, 'click', goNext);
	addEvent(ad1Close, 'click', close1);
	addEvent(ad2Close, 'click', close2);
	addEvent(ad3Close, 'click', close3);
}

// 点击圆点切换
function slideByPoint(event) {

	// 获取点击目标
	var e = event || window.event;
	var target = e.target || e.srcElement;

	// 判断点击目标不处于active，且属性index有值，说明点击到了非当前的圆点目标
	if (target.className !== 'active' && target.getAttribute('index')) {
		var activeImg = document.querySelector('div.active');
		if (activeImg.offsetLeft === 0) {
			var index = parseInt(activeImg.getAttribute('index'));
			var targetIndex = parseInt(target.getAttribute('index'));
			var targetImg = document.querySelector('div[index=\"' + targetIndex + '\"]');
			var moveSpeed = activeImg.offsetWidth / 10;

			// targetIndex若在右边，direction应为1，否则-1
			var moveDirection = targetIndex > index? 1: -1;
			if (moveDirection === 1) {
				targetImg.className += ' next';
			} else {
				targetImg.className += ' prev';
			}
			animation(index, targetIndex, targetImg, activeImg, moveSpeed, moveDirection, animation);
		}
	}
}

function goNext() {

	// 获取当前active的img
	var activeImg = document.querySelector('div.active');

	// 判断是否处于动画中
	if (activeImg.offsetLeft === 0) {
		// 获取index
		var index = parseInt(activeImg.getAttribute('index'));
		var targetIndex = index + 1;
		if (targetIndex >= 6) {
			targetIndex = 1;
		}
		var targetImg = document.querySelector('div[index=\"' + targetIndex + '\"]');

		// 将目标图片置于当前图片的下一张位置
		targetImg.className += ' next';

		// 指定动画每帧移动距离
		var moveSpeed = activeImg.offsetWidth / 10;

		// 指定移动方向
		var moveDirection = 1;

		animation(index, targetIndex, targetImg, activeImg, moveSpeed, moveDirection, animation);
	}
}

function goPrev() {
	var activeImg = document.querySelector('div.active');
	if (activeImg.offsetLeft === 0) {
		var index = parseInt(activeImg.getAttribute('index'));
		var targetIndex = index - 1;
		if (targetIndex <= 0) {
			targetIndex = 5;
		}
		var targetImg = document.querySelector('div[index=\"' + targetIndex + '\"]');
		targetImg.className += ' prev';
		var moveSpeed = activeImg.offsetWidth / 10;
		var moveDirection = -1;
		animation(index, targetIndex, targetImg, activeImg, moveSpeed, moveDirection, animation);
	}
}

// 各参数类型依次为Number，Number，EleNode，EleNode, Number, Number
function animation(index, targetIndex, targetImg, activeImg, moveSpeed, moveDirection) {
	
	// 先清空autoSlide自动播放
	clearInterval(autoSlide);

	// 执行动画
	var sto = setTimeout(function() {
		var speed = -moveDirection * moveSpeed;

		// targetImg没有到指定位置，则继续动画
		if (targetImg.offsetLeft !== 0) {
			activeImg.style.left = activeImg.offsetLeft + speed + 'px';
			targetImg.style.left = targetImg.offsetLeft + speed + 'px';
			animation(index, targetIndex, targetImg, activeImg, moveSpeed, moveDirection);
		} else {
			activeImg.className = 'slide-img';
			targetImg.className += ' active';

			// 此处需清除style.left，否则该EleNode会保留style.left的值
			// 下次参与动画时有可能与className赋予的left值冲突，易导致bug
			activeImg.style.left = null;
			changePoint(index, targetIndex);

			// 动画结束后恢复autoSlide自动播放
			autoSlide = setInterval(goNext, 5000);
		}
	}, 50);
}

function changePoint(activeIndex, targetIndex) {
	var active = document.querySelector('span[index=\"' + activeIndex + '\"]');
	var target = document.querySelector('span[index=\"' + targetIndex + '\"]');
	active.className = '';
	target.className = 'active';
}

function close1() {
	var ad = document.querySelector('div.float-window-left');
	ad.style.display = 'none';
}

function close2() {
	var ad = document.querySelector('div.float-window-right');
	ad.style.display = 'none';
}

function close3() {
	var ad = document.querySelector('div.pop-ad');
	ad.style.display = 'none';
}

function showMask() {
	var mask = this.getElementsByTagName('div');
	for (var i = 0; i < mask.length; i++) {
		if (mask[i].className === 'mask') {
			mask.style.display = 'block';
		}
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