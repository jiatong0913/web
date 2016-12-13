init();

function init() {
	var menu = document.getElementById('menu');
	menu.onclick = function(e) {
		var event = getEvent(e);
		var target = getEventTarget(event);
		if (target.nodeName.toLowerCase() === 'dt') {
			var dl = target.parentNode;
			if (dl.className === 'unfold') {
				dl.className = '';
			} else {
				dl.className = 'unfold';
			}
		}
	}
}

function getEvent(event) {
	return event || window.event;
}

function getEventTarget(event) {
	return event.target || event.srcElement;
}