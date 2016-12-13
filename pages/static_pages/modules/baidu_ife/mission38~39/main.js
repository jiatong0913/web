var student = function(name, chinese, math, english) {
	var obj = {
		name: name,
		chinese: chinese,
		math: math,
		english: english
	}
	obj.total = obj.chinese + obj.math + obj.english;
	return obj; 
}

var initData = [
	student('小明', 80, 90, 70),
	student('小红', 90, 60, 90),
	student('小亮', 60, 100, 70),
	student('小狼', 100, 40, 80),
	student('小狗', 90, 90, 60),
	student('小猪', 80, 70, 50),
	student('小马', 70, 100, 90)
];
var	userData = initData.concat();

window.onload = function() {
	var container = document.getElementById('container');
	var form = document.forms[0];
	addEvent(form, 'submit', function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	});
	var footer = document.getElementById('footer');
	var init = document.getElementById('init');
	addEvent(init, 'click', initTable);
	var submit = document.getElementById('submit');
	addEvent(submit, 'click', addToTable);
	var sort = document.getElementById('sort');
	addEvent(sort, 'click', createSort);
	var freeze = document.getElementById('freeze');
	addEvent(freeze, 'click', tableFreeze);
	var copywrap = document.getElementById('copywrap');
	addEvent(container, 'scroll', scrollByFreeze);
}

//绑定事件函数
function addEvent(ele, event, handler) {
	if (ele.addEventListener) {
		ele.addEventListener(event, handler, false);
	} else if (ele.attachEvent) {
		ele.attachEvent('on' + event, handler)
	}
}

// 生成表格相关函数
function initTable() {
	
	//清空已有的table
	clearTable('table');
	clearTable('tcopy');

	//创建thead
	var thead = createThead();

	//创建tbody
	var tbody = createTbody(initData);

	//创建table
	var table = createTable();

	table.appendChild(thead);
	table.appendChild(tbody);
	container.insertBefore(table, footer);
}

function clearTable(id) {
	var exist = document.getElementById(id);
	if (exist) {
		exist.parentNode.removeChild(exist);
	}
}

function createThead() {
	var thead = document.createElement('thead');
	var tr = document.createElement('tr');
	var title = ['姓名', '语文', '数学', '英语', '总分'];
	var index = [null, 'chinese', 'math', 'english', 'total'];
	for (var i = 0; i < 5; i++) {
		var th = document.createElement('th');
		var text = document.createTextNode(title[i]);
		th.appendChild(text);
		th.setAttribute('index', index[i]);
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	thead.className = 'thead';
	return thead;
}

function createTbody(array) {
	var tbody = document.createElement('tbody');
	for (var i = 0, l = array.length; i < l; i++) {
		var tr = document.createElement('tr');
		for (item in array[i]) {
			var td = document.createElement('td');
			var text = document.createTextNode(array[i][item]);
			td.appendChild(text);
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	tbody.className = 'tbody';
	return tbody;
}

function createTable() {
	var table = document.createElement('table');
	table.className = 'table';
	table.id = 'table';
	table.setAttribute('cellspacing', 0);
	table.setAttribute('border-collapse', 'collapse');
	return table;
}

function addToTable() {

	//判断是否已生成表格
	var table = document.getElementById('table');
	if (table) {
		var name = document.getElementById('name'),
			chinese = document.getElementById('chinese'),
			math = document.getElementById('math'),
			english = document.getElementById('english');

			//中文[\u4e00-\u9fa5]，英文[a-zA-Z]
			var namereg = /[\u4e00-\u9fa5a-zA-Z]/;
			var scorereg = /^\d+$/;
			var scoretest1 = scorereg.test(chinese.value) && scorereg.test(math.value) && scorereg.test(english.value);
			var scoretest2 = chinese.value <= 100 && math.value <= 100 && english.value <= 100;
		if (name.value == '' || chinese.value == '' || math.value == '' || english.value == '') {
			alert('请填写完整信息');
		} else if (!namereg.test(name.value)) {
			alert('名字必须为中文或英文');
		} else if (!scoretest1 || !scoretest2) {
			alert('各科目分数需填0~100的正整数');
		} else {
			if (!document.getElementById('table')) {
				alert('请点击初始化表格按钮');
				init.focus();
			} else {
				var tbody = table.getElementsByTagName('tbody')[0];
				var add = student(name.value, parseInt(chinese.value), parseInt(math.value), parseInt(english.value));
				userData.push(add);
				var tr = document.createElement('tr');
				for (item in add) {
					var td = document.createElement('td');
					var text = document.createTextNode(add[item]);
					td.appendChild(text);
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
				form.reset();
			}
		}
	}	
}

//排序相关函数
function createSort() {

	//判断是否冻结首行
	var tcopy = document.getElementById('tcopy');
	if (tcopy) {

		//如果冻结首行，在tcopy上添加排序按钮
		var tr = tcopy.getElementsByTagName('tr')[0];
		var th = tr.getElementsByTagName('th');
		var existdiv = tr.getElementsByTagName('div');

		//若没有排序按钮时，添加排序按钮
		if (existdiv.length == 0) {
			for (var i = 1; i < th.length; i++) {
				var div = createDiv();
				th[i].appendChild(div);
				th[i].style.position = 'relative';
			}
		}
	} else {

		//如果首行未冻结，判断是否已生成表格
		var table = document.getElementById('table');
		if (table) {

			//如果表格已生成，判断是否已添加过排序按钮
			var tr = table.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
			var th = tr.getElementsByTagName('th');
			var existdiv = tr.getElementsByTagName('div');

			//若没有排序按钮时，添加排序按钮
			if (existdiv.length == 0) {
				for (var i = 1; i < th.length; i++) {
					var div = createDiv();
					th[i].appendChild(div);
					th[i].style.position = 'relative';
				}
			}
		}
	}
}

function createDiv() {
	var div = document.createElement('div');
	var span1 = document.createElement('span');
	span1.className = 'up';
	span1.setAttribute('index', -1);
	addEvent(span1, 'click', sort);
	var span2 = document.createElement('span');
	span2.className = 'down'
	span2.setAttribute('index', 1);
	addEvent(span2, 'click', sort);
	div.appendChild(span1);
	div.appendChild(span2);
	div.className = 'sort';
	return div;
}

function sort() {
	var parentth = this.parentNode.parentNode;
	index = parentth.getAttribute('index');
	if (this.getAttribute('index') == -1) {
		userData.sort(function(a, b) {
			return a[index] - b[index];

		});
	} else if (this.getAttribute('index') == 1) {
		userData.sort(function(a, b) {
			return b[index] - a[index];
		});
	}
	sortTable();
}

function sortTable() {
	//清空已有的table
	clearTable('table');

	//创建thead
	var thead = createThead();

	//创建tbody
	var tbody = createTbody(userData);
	var table = createTable();
	table.appendChild(thead);
	table.appendChild(tbody);
	container.appendChild(table);
	createSort();
}

//冻结相关函数
function tableFreeze() {
	var exist = document.getElementById('tcopy');
	if (!exist) {

		//复制表格
		var tcopy = createCopyTable();
		copywrap.appendChild(tcopy);
	}
}

function createCopyTable() {
	var table = document.getElementById('table');
	if (table) {
		var tcopy = table.cloneNode(true);
		var rows = tcopy.rows;

		//保留thead
		var len = rows.length - 1;
		var tbody = tcopy.lastChild;

		//保留tbody的第一行
		for (var i = len - 1; i >= 0; i--) {
			tbody.removeChild(tbody.lastChild);
		}
		tcopy.id = 'tcopy';
		tcopy.style.position = 'relative';
		tcopy.style.zIndex = '10';
	}
	return tcopy;
}

function scrollByFreeze() {
	
	//获取表格行数和单行高度，从而计算scroll
	var table = document.getElementById('table');
	var theight = table.getElementsByTagName('thead')[0].offsetHeight;
	var rows = table.rows.length;
	var offset = rows * theight;

	//表格未全部翻出视野时，冻结首行
	if (this.scrollTop < offset) {
		copywrap.style.top = this.scrollTop + 'px';
	}
}