window.onload = function() {
	var root = document.getElementById('root');
	var traversal = document.getElementById('traversal');
	addEvent(traversal, 'click', binaryTraversal);
}

//绑定事件函数
function addEvent(ele, event, handler) {
	if (ele.addEventListener) {
		ele.addEventListener(event, handler, false);
	} else if (ele.attachEvent) {
		ele.attachEvent('on' + event, handler)
	}
}

function binaryTraversal() {
	doTraversal(root);
}

function doTraversal(node) {
	node.style.background = '#f00';
	setTimeout(function() {
		node.style.background = '#fff';
		//获取兄弟节点
		var sibling = siblingNodeFilter(node);
		//获取父级元素的兄弟节点
		var parentSibling = function () {
			var parentNode = node.parentNode;
			var	parentNodeSibling = siblingNodeFilter(parentNode);
			while (!parentNodeSibling) {
				if (parentNode.id == 'root' && !parentNodeSibling) {
					return false;
				}
				parentNode = parentNode.parentNode;
				parentNodeSibling = siblingNodeFilter(parentNode);

			}
			return parentNodeSibling;
		}();
		//获取元素子节点
		var children = function() {
			var children = node.childNodes;
			var returnChildren = [];
			for (var i = 0; i < children.length; i++) {
				if (children[i].nodeType == 1) {
					returnChildren.push(children[i]);
				}
			}
			return returnChildren;
		}();
		if (children.length != 0 || sibling || parentSibling) {
			if (children.length == 0) {

				//如果没有子节点
				if (sibling) {

					//如果有兄弟节点，就访问兄弟节点
					doTraversal(sibling);
				} else {

					// 如果没有兄弟节点，就访问父节点的兄弟节点
					doTraversal(parentSibling);
				}
			} else {
				doTraversal(children[0]);
			}
		} else {
			setTimeout(function() {
				alert('二叉树遍历完毕');
			}, 100);
		}
	}, 100);
}

//获取非文本节点的兄弟节点
function siblingNodeFilter(node) {

	//如果有兄弟节点
	while (node.nextSibling) {

		//去除文本节点
		if (node.nextSibling.nodeType != 1) {
			node = node.nextSibling;
		} else {
			return node.nextSibling;
		}
	}
	return false;
}