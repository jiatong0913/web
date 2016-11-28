var bucketwater = {};

window.onload = function() {
	var doc = document;
	var deg = doc.getElementById('degree');
	var degh = deg.getElementsByTagName('span')[0];
	var degc = deg.getElementsByTagName('span')[1];
	var bucket = doc.getElementById('bucket');
	var dispenser = doc.getElementById('dispenser');
	var heat = doc.getElementById('heat');
	var cool = doc.getElementById('cool');
	var cup1 = doc.getElementById('cup1');
	var cup2 = doc.getElementById('cup2');
	bucketwater = {
		t_hotzone: 20,
		t_coldzone: 20,
		volume: 20,
		heat: function() {
			var h = setInterval(function() {
				if (bucketwater.t_hotzone < 100) {
					bucketwater.t_hotzone++;
					console.log(bucketwater.t_hotzone);
					degh.innerHTML = bucketwater.t_hotzone;
				} else {
					clearInterval(h);

				}
			}, 1000);
		},
		cool: function() {
			var c = setInterval(function() {
				if (bucketwater.t_coldzone > 4) {
					bucketwater.t_coldzone--;
					console.log(bucketwater.t_coldzone);
					degc.innerHTML = bucketwater.t_coldzone;
				} else {
					clearInterval(c);
				}
			}, 500);
		},
		t_auto: function() {
			var c = setInterval(function() {
				if (bucketwater.t_coldzone < 20) {
					bucketwater.t_coldzone++;
					degc.innerHTML = bucketwater.t_coldzone;
				} else {
					clearInterval(c);
				}
			}, 1000);
			var h = setInterval(function() {
				if (bucketwater.t_hotzone > 20) {
					bucketwater.t_hotzone--;
					degc.innerHTML = bucketwater.t_hotzone;
				} else {
					clearInterval(h);
				}
			}, 2000);
		}
	}
	addEvent(heat, 'click', doheat);
	addEvent(cool, 'click', docool);
}

function addEvent(ele, event, handler) {
	if (ele.addEventListener) {
		ele.addEventListener(event, handler, false);
	} else if (ele.attachEvent) {
		ele.attachEvent('on' + event, handler);
	}
}

function doheat() {
	handlerWater('heat');
}

function docool() {
	handlerWater('cool');
}

function handlerWater(command) {
	var doc = document;
	var handler = doc.getElementById(command);
	var span = handler.getElementsByTagName('span')[0];
	if (span.className != 'on') {
		span.className = 'on';
		if (command == 'heat') {
			bucketwater.heat();
		} else if (command == 'cool') {
			bucketwater.cool();
		}
	} else {
		span.className = 'off';
		bucketwater.t_auto();
	}
}