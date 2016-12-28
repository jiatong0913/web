var a, b, c, d, e, f;

/*!
 * pageSwitch 1.0
 *
 */

(function($){
	"use strict";

	/*说明:获取浏览器前缀*/
	/*实现：判断某个元素的css样式中是否存在transition属性*/
	/*参数：dom元素*/
	/*返回值：boolean，有则返回浏览器样式前缀，否则返回false*/
	var _prefix = (function(temp) {
		var arrayPrefix = ["webkit", "Moz", "o", "ms"],
			props = "";
		for(var i in arrayPrefix) {
			props = arrayPrefix[i] + "Transition";
			if(temp.style[ props ] !== undefined){
				return "-"+ arrayPrefix[i].toLowerCase() + "-";
			}
		}
		return false;
	})(document.createElement(pageSwitch));

	var pageSwitch = (function(){

		// 定义pageSwitch类，接收2个参数，一个元素节点，一个动画参数集合
		function pageSwitch(element, options){
			
			// settings属性，有输入的options就为options，否则为defaults
			this.settings = $.extend(true, $.fn.pageSwitch.defaults, options || {});
			this.element = element;
			this.init();
		}

		pageSwitch.prototype = {
			/*说明：初始化插件*/
			/*实现：初始化dom结构，布局，分页及绑定事件*/
			init : function(){

				// 缓存this对象
				var me = this;
				me.selectors = me.settings.selectors;
				me.sections = me.element.find(me.selectors.sections);
				me.section = me.sections.find(me.selectors.section);
				console.log(me.section);

				me.pagesCount = me.pagesCount();
				me.index = (me.settings.index >= 0 && me.settings.index < me.pagesCount) ? me.settings.index : 0;

				me.canscroll = true;

				if(me.settings.pagination){
					me._initPaging();
				}

				me._initEvent();
			},
			/*说明：获取滑动页面数量*/
			pagesCount : function(){
				return this.section.length;
			},
			/*说明：获取滑动的宽度（横屏滑动）或高度（竖屏滑动）*/
			switchLength : function(){
				return this.element.height();
			},
			/*说明：向前滑动即上一页*/
			prev : function(){
				var me = this;
				if(me.index > 0){
					me.index --;
				}else if(me.settings.loop){
					me.index = me.pagesCount - 1;
				}
				me._scrollPage();
			},
			/*说明：向后滑动即下一页*/
			next : function(){
				var me = this;
				if(me.index < me.pagesCount){
					me.index ++;
				}else if(me.settings.loop){
					me.index = 0;
				}
				me._scrollPage();
			},
			/*说明：初始化分页符*/
			_initPaging : function(){
				var me = this,
					pagesClass = me.selectors.page.substring(1);
				me.activeClass = me.selectors.active.substring(1);

				var pageHtml = "<ul class="+pagesClass+">";
				for(var i = 0 ; i < me.pagesCount; i++){
					pageHtml += "<li></li>";
				}
				me.element.append(pageHtml);
				var pages = me.element.find(me.selectors.page);
				me.pageItem = pages.find("li");
				me.pageItem.eq(me.index).addClass(me.activeClass);

				pages.addClass("vertical");
			},
			/*说明：初始化插件事件*/
			_initEvent : function(){
				var me = this;
				/*绑定鼠标滚轮事件*/
				me.element.on("mousewheel DOMMouseScroll", function(e){
					e.preventDefault();
					var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
					if(me.canscroll){
						if(delta > 0 && (me.index && !me.settings.loop || me.settings.loop)){
							me.prev();
						}else if(delta < 0 && (me.index < (me.pagesCount-1) && !me.settings.loop || me.settings.loop)){
							me.next();
						}
					}
				});

				/*绑定分页click事件*/
				me.element.on("click", me.selectors.page + " li", function(){
					me.index = $(this).index();
					me._scrollPage();
				});

				if(me.settings.keyboard){
					$(window).keydown(function(e){
						var keyCode = e.keyCode;
						if(keyCode == 37 || keyCode == 38){
							me.prev();
						}else if(keyCode == 39 || keyCode == 40){
							me.next();
						}
					});
				}

				/*绑定窗口改变事件*/
				/*为了不频繁调用resize的回调方法，做了延迟*/
				var resizeId;
				$(window).resize(function(){
					clearTimeout(resizeId);
					resizeId = setTimeout(function(){
						var currentLength = me.switchLength();
						var offset = me.section.eq(me.index).offset().top;
						if(Math.abs(offset) > currentLength/2 && me.index < (me.pagesCount - 1)){
							me.index ++;
						}
						if(me.index){
							me._scrollPage();
						}
					},500);
				});

				/*支持CSS3动画的浏览器，绑定transitionend事件(即在动画结束后调用起回调函数)*/
				if(_prefix){
					me.sections.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function(){
						me.canscroll = true;
						if(me.settings.callback && $.type(me.settings.callback) === "function"){
							me.settings.callback();
						}
					})
				}
			},
			/*滑动动画*/
			_scrollPage : function(init){
				var me = this;
				var dest = me.section.eq(me.index).position();
				if(!dest) return;

				me.canscroll = false;
				if(_prefix){
					var translate = "translateY(-"+dest.top+"px)";
					me.sections.css(_prefix+"transition", "all " + me.settings.duration + "ms " + me.settings.easing);
					me.sections.css(_prefix+"transform" , translate);
				}else{
					var animateCss = {top : -dest.top};
					me.sections.animate(animateCss, me.settings.duration, function(){
						me.canscroll = true;
						if(me.settings.callback){
							me.settings.callback();
						}
					});
				}
				if(me.settings.pagination && !init){
					me.pageItem.eq(me.index).addClass(me.activeClass).siblings("li").removeClass(me.activeClass);
				}
			}
		};
		return pageSwitch;
	})();

	$.fn.pageSwitch = function(options){
		return this.each(function(){
			var me = $(this);

			// 获取对象的pageSwitch属性值
			var instance = me.data("pageSwitch");

			if(!instance) {

				// 若无，则添加属性
				var instance = new pageSwitch(me, options);
				me.data("pageSwitch", instance);
			}

			if($.type(options) === "string") return instance[options]();
		});
	};
	
	$.fn.pageSwitch.defaults = {
		selectors : {
			sections : ".sections",
			section : ".section",
			page : ".pages",
			active : ".active",
		},
		index : 0,		//页面开始的索引
		easing : "ease",		//动画效果
		duration : 500,		//动画执行时间
		loop : false,		//是否循环切换
		pagination : true,		//是否进行分页
		keyboard : true,		//是否触发键盘事件
		callback : ""		//回调函数
	};

	$(function(){
		$('[data-pageSwitch]').pageSwitch();
	});
})(jQuery);

// pageSwitch end

$(function() {
	$('#home .toright').on('click', page1ToRight);
	$('#about .toleft').on('click', page1ToLeft);
	$('#exp .toright').on('click', page2ToRight);
	$('#exp .toleft').on('click', page2ToLeft);
	$('#skill .toright').on('click', page3ToRight);
	$('#demo .toleft').on('click', page3ToLeft);
	var abs1 = $('#home .abs');
	var abs3 = $('#exp .toright .abs');
	var abs5 = $('#skill .abs');
	a = setInterval(function() {
		arrowBlink(abs1);
	}, 500);
	c = setInterval(function() {
		arrowBlink(abs3);
	}, 500);
	e = setInterval(function() {
		arrowBlink(abs5);
	}, 500);
});


function arrowBlink(abs) {
	abs.toggleClass('arrow');
}

function page1ToRight() {
	clearInterval(a);
	var abs2 = $('#about .abs');
	$('#home').fadeOut('slow');
	$('#about').fadeIn('slow');
	b = setInterval(function() {
		arrowBlink(abs2);
	}, 500);
}

function page1ToLeft() {
	clearInterval(b);
	var abs1 = $('#home .abs');
	$('#about').fadeOut('slow');
	$('#home').fadeIn('slow');
	a = setInterval(function() {
		arrowBlink(abs1);
	}, 500);
}

function page2ToRight() {
	var abs3 = $('#exp .toright .abs');
	clearInterval(c);
	abs3.removeClass().addClass('abs');
	var abs4 = $('#exp .toleft .abs');
	$('#exp-slider').animate({left: '-60rem'});
	d = setInterval(function() {
		arrowBlink(abs4);
	}, 500);
}

function page2ToLeft() {
	var abs4 = $('#exp .toleft .abs');
	clearInterval(d);
	abs4.removeClass().addClass('abs');
	var abs3 = $('#exp .toright .abs');
	$('#exp-slider').animate({left: 0});
	c = setInterval(function() {
		arrowBlink(abs3);
	}, 500);
}

function page3ToRight() {
	clearInterval(e);
	var abs6 = $('#demo .abs');
	$('#skill').fadeOut('slow');
	$('#demo').fadeIn('slow');
	f = setInterval(function() {
		arrowBlink(abs6);
	}, 500);
}

function page3ToLeft() {
	clearInterval(f);
	var abs5 = $('#skill .abs');
	$('#demo').fadeOut('slow');
	$('#skill').fadeIn('slow');
	e = setInterval(function() {
		arrowBlink(abs5);
	}, 500);
}


