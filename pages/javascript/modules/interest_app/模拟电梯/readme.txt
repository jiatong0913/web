参数说明：

变量：
direction:电梯运行方向
	1：上行，0：电梯静止，-1：下行
	
index:表示楼层
	外部按钮的index表示按钮所在楼层
	内部按钮的index表示目的楼层
	elevator的index表示电梯当前所在楼层
	
stop:表示电梯顺行经停层的数组
stopReverse:表示电梯反向经停层的数组


方法：	
lighton:按钮灯亮，按钮任务启动
lightoff:按钮灯灭，该按钮任务已完成
lightblink:按钮闪烁一次，没有任务，或任务立即执行完毕

执行逻辑：
电梯静止时：
	按电梯所在层的按键，按键闪烁，不工作
	按其他层，按键灯亮，电梯工作

电梯运行时：
	若按钮已按过（亮着），再按没反应
		内部按钮：
			若按钮没按过
				若在顺行方向上，按钮灯亮，数字加入stop数组
				若不在顺行方向上，按钮闪烁，不工作
		外部按钮：
			若按钮没按过
				若在顺行方向上，按钮灯亮，数字加入stop数组
				若不在顺行方向上，按钮灯亮，数字加入stopReverse数组



电梯内部按钮：
	首先判断是否已有人按过，即数组elevator.stop中是否有该按键的index值，已有人按过，则什么都不做，否则继续
		若电梯此时静止：
			判断电梯是否在当前层(elevator.index == 按键的index)，若在当前层，按钮闪烁一次，不做动作
			若电梯不在当前层，将该层加入elevator.stop数组中，按键灯亮，电梯运行方向赋值，电梯启动
	
		若电梯此时处于运行状态：
			判断所按数字是否在运行方向路径上(elevator.direction == passby)，如果不在，按钮闪烁一次，不做动作
			若在，该层加入elevator.stop并对数组排序，电梯启动
			
电梯外部按钮：
	首先判断是否已有人按过，即数组elevator.stop或elevator.stopReverse中是否有该按键的index值，已有人按过，则什么都不做，否则继续
		若电梯此时静止：
			判断电梯是否在当前层(elevator.index == 按键的index)，若在当前层，按钮闪烁一次，不做动作
			若电梯不在当前层，将该层加入elevator.stop数组中，按键灯亮，电梯运行方向赋值，电梯启动
		
		若电梯此时处于运行状态：
			判断所按数字是否在运行方向路径上且方向与电梯运行方向相同(elevator.direction == passby && elevator.direction == 按键的direction)，如果是，按钮灯亮，该层加入elevator.stop数组并排序，电梯运行
			如果不是，按钮灯亮，该层加入elevator.stopReverse并对数组排序
			
电梯move方法：
	如果stop数组长度不为0，电梯启动go方法
	如果stop数组为0
		判断stopReverse长度是否为0，如果不，则stopReverse赋值给stop，stopReverse清空
		如果是，电梯停止

电梯go方法：
	判断电梯是否到达目的层
		若没到，电梯位置向目的层移动
		若到了，该层数字从elevator.stop中移除，该层数字对应的按键灯灭