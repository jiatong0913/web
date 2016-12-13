// 原数组不变，返回一个新数组

// var quickSort1 = function(array) {
// 	if (array.length <= 1) {
// 		return array;
// 	}
// 	var medianIndex = Math.floor(array.length / 2);
// 	var median = array.splice(medianIndex, 1)[0];
// 	var left = [];
// 	var right = [];
// 	for (var i = 0; i < array.length; i++) {
// 		if (array[i] <= median) {
// 			left.push(array[i]);
// 		} else {
// 			right.push(array[i]);
// 		}
// 	}
// 	return quickSort(left).concat([median], quickSort(right));
// };



var quickSort2 = function(array) {
	if (array.length <= 1) {
		return array;
	}

	// 函数search的参数是待排序数组的首末索引
	var search = function(left, right) {

		// 当left < right时，即待排序数组元素大于等于2时，才启动排序排序，否则结束排序
		if (left < right) {
			var i = left,
					j = right;

			// 以数组左侧第一个元素即array[left]为基准值
			var base = array[left];

			// i从左遍历，j从右遍历，直到两者相遇
			while(i < j) {

				// 若j未找到比基准值小的数且i与j未相遇，j就继续查找
				while(array[j] >= base && i < j) {
					j--;
				}

				// 若i未找到比基准值大的数且i与j未相遇，i就继续查找
				while(array[i] <= base && i < j) {
					i++;
				}
				if (i < j) {
					// 若上方循环结束时i < j，则说明i与j都查找到了，则让i与j所在的元素互换

					var tmp = array[j];
					array[j] = array[i];
					array[i] = tmp;
				} else {
					// 若上方循环结束时i = j，则说明i与j至少有一个没查找到，则让i与j共同所在的元素与基准值互换，此时整个循环结束，得到比较后的数组

					array[left] = array[j];
					array[j] = base;
				}
			}

			// 递归调用
			search(left, i - 1);
			search(j + 1, right);
		} else {
			return;
		}
	};

	// 自执行一次
	search(0, array.length - 1);
}

// var e = 3;
// var f = "aa";
// var g = function() {
// 	return 1;
// };
// var h = null;
// var i = undefined;
// var j;
// var k = new Date(2015);
var a = [9, 10, 23, 1, 5, 132, 2, 4];
console.log(a);
quickSort2(a);
// var c = {
// 	a: 3, 
// 	b: 10, 
// 	c: 23, 
// 	rrr: 2, 
// 	d: function() {
// 		var i = 0;
// 	}
// };
// var b = deepCopy(g);
// console.log(b);
// b = new Date();
// console.log(b);
// console.log(g);