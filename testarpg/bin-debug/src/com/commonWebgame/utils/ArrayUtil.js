var egret;
(function (egret) {
    var ArrayUtil = (function () {
        /**
         * 构造函数
         */
        function ArrayUtil() {
        }
        var __egretProto__ = ArrayUtil.prototype;
        /**
         * 数值数组快速升序算法，比 Array.sort() 快很多
         *
         * 快速排序使用分治法（Divide and conquer）策略来把一个序列（list）分为两个子序列（sub-lists）。
         
         步骤为：
         
         1. 从数列中挑出一个元素，称为 "基准"（pivot），
         2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分割之后，该基准是它的最后位置。这个称为分割（partition）操作。
         3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
         
         递回的最底部情形，是数列的大小是零或一，也就是永远都已经被排序好了。虽然一直递回下去，但是这个演算法总会结束，因为在每次的迭代（iteration）中，它至少会把一个元素摆到它最后的位置去。
         * @param arr:Array 数值数组
         * @param firstIndex:int 开始索引
         * @param lastIndex:int 结束索引
         *
         */
        ArrayUtil.quickSort = function (array, firstIndex, lastIndex) {
            if (lastIndex === void 0) { lastIndex = 0; }
            var i = 0;
            var j = 0;
            var x = 0;
            if (firstIndex < lastIndex) {
                i = firstIndex;
                j = lastIndex;
                x = array[i];
                while (i < j) {
                    while (i < j && array[j] > x) {
                        j--; //从右向左找第一个小于x的数
                    }
                    if (i < j) {
                        array[i] = array[j];
                        i++;
                    }
                    while (i < j && array[i] < x) {
                        i++; //从左向右找第一个大于x的数
                    }
                    if (i < j) {
                        array[j] = array[i];
                        j--;
                    }
                }
                array[i] = x;
                ArrayUtil.quickSort(array, firstIndex, i - 1);
                ArrayUtil.quickSort(array, i + 1, lastIndex);
            }
        };
        //
        /**
         * 对象数组快速升序算法，比 Array.sortOn() 慢，但不占内存，内存优化时可用， Array.sortOn() 极占内存
         *
         * 快速排序使用分治法（Divide and conquer）策略来把一个序列（list）分为两个子序列（sub-lists）。
         
         步骤为：
         
         1. 从数列中挑出一个元素，称为 "基准"（pivot），
         2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分割之后，该基准是它的最后位置。这个称为分割（partition）操作。
         3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
         
         递回的最底部情形，是数列的大小是零或一，也就是永远都已经被排序好了。虽然一直递回下去，但是这个演算法总会结束，因为在每次的迭代（iteration）中，它至少会把一个元素摆到它最后的位置去。
         * @param arr:Array 数值数组
         * @param firstIndex:int 开始索引
         * @param lastIndex:int 结束索引
         *
         */
        ArrayUtil.quickSortOn = function (array, attr, firstIndex, lastIndex) {
            if (lastIndex === void 0) { lastIndex = 0; }
            var i = 0;
            var j = 0;
            var x;
            if (firstIndex < lastIndex) {
                i = firstIndex;
                j = lastIndex;
                x = array[i];
                while (i < j) {
                    while (i < j && array[j][attr] > x[attr]) {
                        j--; //从右向左找第一个小于x的数
                    }
                    if (i < j) {
                        array[i] = array[j];
                        i++;
                    }
                    while (i < j && array[i][attr] < x[attr]) {
                        i++; //从左向右找第一个大于x的数
                    }
                    if (i < j) {
                        array[j] = array[i];
                        j--;
                    }
                }
                array[i] = x;
                ArrayUtil.quickSortOn(array, attr, firstIndex, i - 1);
                ArrayUtil.quickSortOn(array, attr, i + 1, lastIndex);
            }
        };
        //
        /**
         * 对象数组快速降序算法，比 Array.sortOn() 慢，但不占内存，内存优化时可用， Array.sortOn() 极占内存
         *
         * 快速排序使用分治法（Divide and conquer）策略来把一个序列（list）分为两个子序列（sub-lists）。
         
         步骤为：
         
         1. 从数列中挑出一个元素，称为 "基准"（pivot），
         2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分割之后，该基准是它的最后位置。这个称为分割（partition）操作。
         3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
         
         递回的最底部情形，是数列的大小是零或一，也就是永远都已经被排序好了。虽然一直递回下去，但是这个演算法总会结束，因为在每次的迭代（iteration）中，它至少会把一个元素摆到它最后的位置去。
         * @param arr:Array 数值数组
         * @param firstIndex:int 开始索引
         * @param lastIndex:int 结束索引
         *
         */
        ArrayUtil.quickSortOn2 = function (array, attr, firstIndex, lastIndex) {
            if (lastIndex === void 0) { lastIndex = 0; }
            var i = 0;
            var j = 0;
            var x;
            if (firstIndex < lastIndex) {
                i = firstIndex;
                j = lastIndex;
                x = array[i];
                while (i < j) {
                    while (i < j && array[j][attr] < x[attr]) {
                        j--; //从右向左找第一个小于x的数
                    }
                    if (i < j) {
                        array[i] = array[j];
                        i++;
                    }
                    while (i < j && array[i][attr] > x[attr]) {
                        i++; //从左向右找第一个大于x的数
                    }
                    if (i < j) {
                        array[j] = array[i];
                        j--;
                    }
                }
                array[i] = x;
                ArrayUtil.quickSortOn2(array, attr, firstIndex, i - 1);
                ArrayUtil.quickSortOn2(array, attr, i + 1, lastIndex);
            }
        };
        //
        /**
         * 数值数组降序排列 (冒泡排序)
         * @param array
         *
         */
        ArrayUtil.sort = function (array) {
            var maxIndex = 0;
            var maxValue = array[0];
            var length = array.length;
            for (var i = 0; i < length; i++) {
                maxIndex = i;
                maxValue = array[i];
                for (var j = i; j < length; j++) {
                    if (maxValue < array[j]) {
                        maxValue = array[j];
                        maxIndex = j;
                    }
                }
                if (maxValue != array[i]) {
                    array[maxIndex] = array[i];
                    array[i] = maxValue;
                }
            }
        };
        //
        /**
         * 将2维数组行列调换，如
         * [
         * [1,2],
         * [3,4]
         * ]
         * ->
         * [
         * [1,3],
         * [2,4]
         * ]
         * @param array:Array
         *
         */
        ArrayUtil.reverse2DRC = function (array) {
            var rows = array.length;
            var columns = array[0].length;
            var temp = null;
            var flagMap = new egret.HashMap();
            var rc = null;
            var cr = null;
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < columns; j++) {
                    rc = i + "_" + j;
                    cr = j + "_" + i;
                    //标记已调换的行和列
                    if (flagMap.containsKey(rc) || flagMap.containsKey(cr))
                        continue;
                    temp = array[i][j];
                    array[i][j] = array[j][i];
                    array[j][i] = temp;
                    flagMap.put(rc, true);
                    flagMap.put(cr, true);
                }
            }
        };
        //
        /**
         * 将2维数组中的子数组倒转， 如
         * [
         * [1,2],
         * [3,4]
         * ]
         * ->
         * [
         * [2,1],
         * [4,3]
         * ]
         * @param array:Array
         *
         */
        ArrayUtil.reverse2DRows = function (array) {
            var length = array.length;
            for (var i = 0; i < length; i++) {
                array[i].reverse();
            }
        };
        //
        /**
         * 数字升序排列
         * @param a
         * @param b
         * @returns {number}
         */
        ArrayUtil.numeric = function (a, b) {
            if (Number(a) > Number(b))
                return 1;
            else if (Number(a) == Number(b))
                return 0;
            return -1;
        };
        /**
         * 数字降序排列
         * @param a
         * @param b
         * @returns {number}
         */
        ArrayUtil.descending = function (a, b) {
            if (Number(a) < Number(b))
                return 1;
            else if (Number(a) == Number(b))
                return 0;
            return -1;
        };
        return ArrayUtil;
    })();
    egret.ArrayUtil = ArrayUtil;
    ArrayUtil.prototype.__class__ = "egret.ArrayUtil";
})(egret || (egret = {}));
