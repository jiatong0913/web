var init = function() {
	var color = {
		浅绿: '#8cc540',
		深蓝: '#007cdc',
		浅蓝: '#019fde',
		深紫: '#887ddd',
		浅紫: '#cd7bdd',
		红: '#ff1244',
		橙: '#ff8d0b',
		黄: '#f8bd0b',
		灰: '#d1d2d4'
	};
	var container = document.getElementById('container');
	var frag = document.createElement('fragment');
		for (item in color) {
			var div = document.createElement('div');
			div.innerHTML = item;
			div.style.backgroundColor = color[item];
			frag.appendChild(div);
		}
	container.appendChild(frag);
}

init();