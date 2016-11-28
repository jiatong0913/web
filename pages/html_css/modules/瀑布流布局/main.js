var json = [];
var name = ["草薙京", "K Dash", "库拉", "矢吹真吾", "麻宫雅典娜", "不知火舞", "丽安娜", "坂崎百合", "克里斯", "八神庵", "特瑞·博格", "洛克"];
for (var i = 0; i < 12; i++) {
	json[i] = {};
	json[i].src = i + '.png';
	json[i].alt = name[i];
}
var container, boxes;

window.onload = function() {
	container = document.getElementById('container');

	//以类名查找元素节点
	boxes = getNodesByClass(container);

	//瀑布布局
	waterfall(container, boxes, 400);

	window.onscroll = updateWaterfall;
}

//参数依次为要获取元素的父元素节点，元素名，类名
function getNodesByClass(parentNode) {
	var nodes = parentNode.getElementsByTagName('div');
	var len = nodes.length;
	var returnNodes = [];
	if (len) {
		for (var i = 0; i < len; i++) {
			if (nodes[i].className == 'box') {
				returnNodes.push(nodes[i]);
			}
		}
		return returnNodes;
	}
	return false;
}

//参数依次为图片的父元素节点（容器），待排布的图片节点集合，图片宽度
function waterfall(container, picBoxes, boxWidth) {

	//获取屏幕可视区域宽度
	var clientW = document.body.clientWidth || document.documentElement.clientWidth;

	//计算每行放的照片数量
	var n = Math.floor(clientW / boxWidth);

	//根据图片宽度和每行照片数量设置图片父元素节点（容器）的宽度，目的是为了居中显示
	container.style.width = n * boxWidth + 'px';
	var len = picBoxes.length;

	//数组h保留每列的高度
	var h = [];
	for (var i = 0; i < len; i++) {
		if (i < n) {
			picBoxes[i].style.width = boxWidth + 'px';
			picBoxes[i].style.top = 0;
			picBoxes[i].style.left = boxWidth * i + 'px';
			h[i] = picBoxes[i].offsetHeight;
		} else {

			//获取数组h中最小高度的索引
			var minIndex = getMinIndex(h);
			picBoxes[i].style.width = boxWidth + 'px';
			picBoxes[i].style.top = h[minIndex] + 'px'; 
			picBoxes[i].style.left = picBoxes[minIndex].style.left;

			//更新h数组
			h[minIndex] += picBoxes[i].offsetHeight;
		}
	}
}

//获取数组内最小元素的索引
function getMinIndex(array) {
	var len = array.length;
	for (var i = 0; i < len; i++) {
		if (array[i] === Math.min.apply(null, array)) {
			return i;
		}
	}
}

function updateWaterfall() {
	if (checkScroll(container, boxes)) {
		createPicbox(container, json);
		boxes = getNodesByClass(container);
		waterfall(container, boxes, 400);
	}
}

function checkScroll(container, boxes) {
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var clientH = document.body.clientHeight || document.documentElement.clientHeight;
	var deltaH = boxes[boxes.length - 1].offsetHeight + parseInt(boxes[boxes.length - 1].style.top) - clientH;
	console.log(scrollTop);
	console.log(deltaH);
	if (scrollTop >= deltaH) {
		return true;
	}
}

function createPicbox(container, json) {
	var len = json.length;
	var frag = document.createElement('fragment');
	for (var i = 0; i < len; i++) {
		var box = document.createElement('div');
		box.className = 'box';
		var pic = document.createElement('div');
		pic.className = 'pic';
		var img = document.createElement('img');
		img.src = json[i].src;
		img.alt = json[i].alt;
		pic.appendChild(img);
		box.appendChild(pic);
		frag.appendChild(box);
	}
	container.appendChild(frag);
}