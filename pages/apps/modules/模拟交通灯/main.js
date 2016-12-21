var trafficLights = function() {
	function trafficLights() {
		this.vertical = {
			left: document.getElementsByClassName('left')[0],
			straight: document.getElementsByClassName('straight')[0],
			number: document.getElementsByClassName('number')[0]
		},
		this.horizontal = {
			left: document.getElementsByClassName('left')[1],
			straight: document.getElementsByClassName('straight')[1],
			number: document.getElementsByClassName('number')[1]
		},

		// index为0表示纵向通行，index为1表示横向通行
		this.index = 0,
		this.straightTime = 20;
		this.leftTime = 10;
		this.green = '#0c3';
		this.yellow = '#f80';
		this.red = '#f00';
		this.gray = '#666';
		this.init = function() {
			var pointer = this;
			pointer.index = 0;
			pointer.leftTime = 3;
			pointer.vertical.straight.style.backgroundColor = pointer.red;
			pointer.horizontal.straight.style.backgroundColor = pointer.red;
			pointer.horizontal.left.style.backgroundColor = pointer.red;
			pointer.readTime(pointer.vertical.left, pointer.vertical.number, pointer.leftTime);
		};
	}

	trafficLights.prototype = {
		
		// typeof light === STRING, typeof time === NUMBER
		readTime: function(direct, number, time) {
			var pointer = this;
			var n = 0;
			if (direct.className === 'left') {
				n = 3;
			} else if (direct.className === 'straight') {
				n = 15;
			}
			var st = function() {
				if (time > 3) {

					// time > 3时，保持绿灯
					pointer.keepLight(direct, pointer.green);

					// 如果是直行，那么当time<=15时，开始显示数字
					if (n === 15 && time <= 15) {
						pointer.blink(number, time);
					}
					setTimeout(function() {
						time --;
						st();
					}, 1000);
				} else if (time > 0 && time <= 3) {

					// 0 < time <= n时，闪烁
					pointer.blink(direct, time);
					pointer.blink(number, time);
					setTimeout(function() {
						time --;
						st();
					}, 1000);
				} else {
					number.innerHTML = '';

					// time = 0时，保持红灯
					pointer.keepLight(direct, pointer.red);
					if (direct.className === 'straight') {

						// 如果当前是直行，则下一刻左转向亮
						pointer.leftTime = 10;
						if (pointer.index === 0) {
							pointer.readTime(pointer.vertical.left, pointer.vertical.number, pointer.leftTime);
						} else {
							pointer.readTime(pointer.horizontal.left, pointer.horizontal.number, pointer.leftTime);
						}
					} else if (direct.className === 'left') {
						// 如果当前是左转向，则下一刻另外一个方向直行灯亮
						pointer.straightTime = 20;
						if (pointer.index === 0) {
							pointer.readTime(pointer.horizontal.straight, pointer.horizontal.number, pointer.straightTime);
							pointer.index = 1;
						} else {
							pointer.readTime(pointer.vertical.straight, pointer.vertical.number, pointer.straightTime);
							pointer.index = 0;
						}
					}
				}
			};
			st();
		},

		// typeof light === typeof color === STRING
		keepLight(direct, color) {
			direct.style.backgroundColor = color;
		},

		// typeof light === STRING, typeof time === NUMBER
		blink: function(direct, time) {
			var pointer = this;
			// 如果不是数字，则黄色闪烁
			if (direct.className !== 'number') {
				direct.style.backgroundColor = pointer.yellow;
				setTimeout(function() {
					direct.style.backgroundColor = pointer.gray;
				}, 500);
			} else {

				// 如果是数字，则黄色字闪烁
				direct.style.color = pointer.yellow;
				direct.innerHTML = time >= 10 ? time : '0' + time;
				setTimeout(function() {
					direct.style.color = pointer.gray;
				}, 500);
			}
		},
	};

	return new trafficLights();
};

var time = document.getElementById('time');
var a = setInterval(function() {
	time.innerHTML = new Date();
}, 1000);
var a = new trafficLights();
console.log(a);

a.init();