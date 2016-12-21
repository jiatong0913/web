  var i = 0;
  var c = document.getElementById('container');
  var children = getEleChildren(c);
  var l = children.length;
  setInterval(blink, 150);

	function blink() {
    var arrow = children[i];
		if (arrow.className !== 'arrow') {
			arrow.className = 'arrow';
			i++;
			if (i > l - 1) {
				i = 0;
			}
		} else {
			arrow.className = 'abs';
			i++;
			if (i > l - 1) {
				i = 0;
			}
		}
	}

	function getEleChildren(element) {
		var children = element.childNodes;
		var eleChildren = [];
		for (var i = 0, l = children.length; i < l; i++) {
			if (children[i].nodeType === 1) {
				eleChildren.push(children[i]);
			}
		}
		return eleChildren;
	}
