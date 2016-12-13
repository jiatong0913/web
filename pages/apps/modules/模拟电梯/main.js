$(function() {
	var elevator = {
		height: 20 + parseInt($('#elevator').height()),  //120
		top: parseInt($('#elevator').position().top), //720
		index: 1,
		direction: 0,
		stop: [],
		stopReverse: [],
		move: function() {

			if (this.stop.length != 0) {
				this.go();
			} else {
				if (this.stopReverse.length != 0) {
					this.stop = this.stopReverse.concat();
					this.stopReverse.length = 0;
					this.go();
				} else {
					this.direction = 0;
					console.log(elevator);
				}
			}
		},
		go: function() {
			setTimeout(function() {
				if (elevator.index != elevator.stop[0]) {
					//电梯未到达
					$('#elevator').stop(true);
					// distance表示距离目的层差几层，以此设定目的位置，和移动时间
					var distance = Math.abs(elevator.stop[0] - elevator.index);
					elevator.top -= 120 * distance * elevator.direction;

					$('#elevator').animate({top: elevator.top + 'px'}, 1000 * distance, function() {
					//电梯到达
					//该层所有灯熄灭
					var $innerbtn_lighton = $('#innerctrl button[index = ' + elevator.stop[0] + ']');
					var $outerbtn_lighton = $('#outerctrl button[index = ' + elevator.stop[0] + ']');
					lightoff($innerbtn_lighton);
					lightoff($outerbtn_lighton);
					//移动到达后更新elevator的index
					elevator.index = Math.floor((720 - elevator.top) / 120) + 1;
					// statusShow();
					// console.log(1);
					// console.log(elevator.top);
					// console.log(elevator.index);
					// console.log(elevator.stop);
					//该层数字从数组中弹出
					elevator.stop.shift();
					console.log(elevator.stop);
					//继续运行
					elevator.move();
					});					
				}
			}, 1000);
		}
	}


	var $innerbtn = $('#innerctrl button');
		$innerbtn.on('click', function() {
			var $index = $(this).attr('index');
			var passby = 0; 
			passby = (($index - elevator.index) > 0) ? 1 : -1;


			//判断按键层是否已在经停层数组内，如果在，此时灯应该是亮的，不做任何事情
			//如果不在，将该层加入经停层数组并排序，电梯运行
			//$.inArray函数，若该值存在数组中，返回索引值，若不在，返回-1
			if ($.inArray($index, stop) < 0) {

				//判断所按数字是否为当前电梯所在层，或是与电梯运行方向相反的层
				if (($index == elevator.index) || (elevator.direction == -passby)) {

					//若是,则按键灯闪烁一下，不做任何事情
					//内部按钮若按相反方向的楼层，不做响应，避免有人乱按
					lightblink($(this));
				} else {
					
					//若不是，按键灯亮，整理stop数组，电梯移动
					lighton($(this));
					elevator.direction = passby;
					elevator.stop.push($index);
					elevator.stop.sort();
					console.log(elevator.stop);
					elevator.move();
				}
			}
		})

	var $outerbtn = $('#outerctrl button');
		$outerbtn.on('click', function() {
			// console.log(elevator.height);
			// console.log(elevator.top);
			var $index = $(this).attr('index');
			//判断是否已按过（该层已在stop或stopReverse数组中）
			if (($.inArray($index, elevator.stop) < 0) && ($.inArray($index, elevator.stopReverse) < 0)) {

				// 若没按过，继续，passby表示该层是否在电梯顺行路径上
				var passby = 0; 
				passby = (($index - elevator.index) > 0) ? 1 : -1;

				//判断电梯运行方向
				if (elevator.direction == 0) {

					// 若电梯静止
					// 若在当前楼层，任务立即执行完毕
					if ($index == elevator.index) {
						lightblink($(this));
					} else {
						lighton($(this));
						elevator.direction = passby;
						elevator.stop.push($index);
						elevator.move();
					}
				} else if (elevator.direction == $(this).attr('direction') == passby) {

					//若该层在电梯顺行路径上，则将该层加入经停层stop
					lighton($(this));
					elevator.stop.push($index);
					elevator.stop.sort();
					elevator.move();
				} else {

					//若该层不在电梯顺行路径上，则将该层加入反向经停层stopReverse
					lighton($(this));
					elevator.stopReverse.push($index);
					elevator.stopReverse.sort();
				}
			}
		})

	//status展示电梯运行方向和当前楼层
	function statusShow() {
		var $direction = $('#direction'),
		$floor = $('#floor');
		$direction.html(elevator.direction);
		$floor.html(elevator.index);
	}

	function lighton($) {
		$.css('backgroundColor', '#fcf8e3');
	}

	function lightoff($) {
		$.css('backgroundColor', '#c6e2ff');
	}

	function lightblink($) {
		$.css('backgroundColor', '#fcf8e3');
		setTimeout(function() {
			$.css('backgroundColor', '#c6e2ff');
		}, 200);
	}
})

