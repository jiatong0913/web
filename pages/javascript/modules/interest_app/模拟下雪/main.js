function createSnow(parent, className) {
	var doc = document;
	var snow = doc.createElement('div');
	parent.appendChild(snow);
	snow.className = className;
	var width = Math.floor(Math.random() * 20);
	snow.style.width = snow.style.height = width + 'px';

	var left = Math.floor(Math.random() * (parent.offsetWidth - width));
	snow.style.left = left + 'px';
	snow.style.top = -width + 'px';
	return snow; 
}

function startSnow() {
	var doc = document;
	var parent = doc.getElementById('container');
	var pw = parent.offsetWidth;
	var ph = parent.offsetHeight;
	var start = setInterval(function() {
		var snow = createSnow(parent, 'init');
		var sw= parseInt(snow.style.width);
		var rotate = 0;
		var move = setInterval(function() {
			snow.style.top = parseInt(snow.style.top) + ph + 'px';
			snow.style.width = parseInt(snow.style.width) + 1 + 'px';
			snow.style.height = parseInt(snow.style.height) + 1 + 'px';
			rotate += 90;
			snow.style.transform = 'rotate(' + rotate + 'deg)';
			if (parseInt(snow.style.top) > ph) {
				clearInterval(move);
				parent.removeChild(snow);
			}
		}, 3000);		
	}, 25);
	parent.onclick = function() {
		clearInterval(start);
		parent.style.display = 'none';
	};
}

window.onload = function() {
	startSnow();
}