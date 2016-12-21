'use strict';

var initTags = ['射雕英雄传', '神雕侠侣', '天龙八部', '笑傲江湖', '碧血剑', '雪山飞狐', '连城诀', '鹿鼎记', '书剑恩仇录', '倚天屠龙记', '飞狐外传', '白马啸西风', '鸳鸯刀', '侠客行'];
var colors = ['#8cc540', '#007cdc', '#019fde', '#887ddd', '#cd7bdd', '#ff1244', '#ff8d0b', '#f8bd0b', '#d1d2d4'];
init();

function init() {
	var interval = setInterval(createCloud, 2000);
}

function createCloud() {
	var container = document.getElementById('container');
	var clouds = container.getElementsByTagName('div')[0];
	var width = clouds.offsetWidth;
	var height = clouds.offsetHeight;
	var a = document.createElement('a');
	var taglen = initTags.length;
	var colorlen = colors.length;
	var index = Math.floor(Math.random() * taglen);
	var color = Math.floor(Math.random() * colorlen);
	var left = Math.floor(Math.random() * width);
	var top = Math.floor(Math.random() * height);
	a.className = 'style'; 
	a.innerHTML = initTags[index];
	a.style.color = colors[color];
	a.style.left = left + 'px';
	a.style.top = top + 'px';
	clouds.appendChild(a);
	setTimeout(function() {
		a.parentNode.removeChild(a);
	}, 5000);
}