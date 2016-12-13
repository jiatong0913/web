var init = function() {
	var container = document.getElementById('container');
	var frag = document.createElement('fragment');
	for (var i = 0; i < 16; i++) {
		for (var j = 0; j < 16; j++) {
			for (var k = 0; k < 16; k++) {
				var div = document.createElement('div');
				var color = '#' + i.toString(16) + j.toString(16) + k.toString(16); 
				div.style.backgroundColor = color;
				frag.appendChild(div);
			}
		}
	}
	container.appendChild(frag);
}

init();