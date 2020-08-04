function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * @description 通用基础方法
 */
var base = {};

var utils = _objectSpread2({}, base);

/**
 * @description 将指定字符串或数字转换成数字 undefined | null 会被视为 0
 * @param num {string | number} 带转换的数字
 */
function toNumber(num) {
  var data = Number(num);

  if (isNaN(data)) {
    data = 0;
  }

  return data;
}
/**
 * @description 获取数字的最大精度（即最大小数位数）
 */


function getMaxPrecision() {
  var numPrecisions = [];

  for (var _len = arguments.length, nums = new Array(_len), _key = 0; _key < _len; _key++) {
    nums[_key] = arguments[_key];
  }

  nums.forEach(function (num) {
    var len;

    try {
      len = String(num).split('.')[1].length;
    } catch (err) {
      len = 0;
    }

    numPrecisions.push(len);
  });
  return Math.max.apply(Math, numPrecisions);
}
/**
 * @description 获取数字的精度之和
 */


function getTotalPrecision() {
  var total = 0;

  for (var _len2 = arguments.length, nums = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    nums[_key2] = arguments[_key2];
  }

  nums.forEach(function (num) {
    var len;

    try {
      len = String(num).split('.')[1].length;
    } catch (err) {
      len = 0;
    }

    total += len;
  });
  return total;
}
/**
 * @description 字符串表达式预处理
 * @param {Array|String} expQueue 运算表达式 ['1', '+', '2'] 或 '1 + 2'
 * @returns {Array} 计算队列
 */


var OPERATORS = ['+', '-', '*', '/', '(', ')'];

function preExpCalc(expQueue) {
  if (Array.isArray(expQueue)) {
    return expQueue.map(function (item) {
      var data = String(item);

      if (OPERATORS.indexOf(data) === -1) {
        return toNumber(data);
      }

      return data;
    });
  }

  var result = [];
  var temp = '';

  for (var i = 0; i < expQueue.length; i++) {
    if (OPERATORS.indexOf(expQueue[i]) === -1) {
      temp += expQueue[i];
      continue;
    }

    temp = temp.trim(); // 判断是否为负号

    if (expQueue[i] === '-' && !temp) {
      temp += expQueue[i];
      continue;
    } // 判断是否为左括号


    if (expQueue[i] === '(') {
      result.push(expQueue[i]);
      temp = '';
      continue;
    } // 判断前一个符号是否为右括号


    if (result[result.length - 1] === ')') {
      result.push(expQueue[i]);
      temp = '';
      continue;
    }

    result.push(toNumber(temp), expQueue[i]);
    temp = '';
  }

  if (temp) {
    result.push(toNumber(temp));
  }

  return result;
}
/**
 * @description 处理原生toFixed采用的银行家四舍五入导致的精度问题
 * num * + 1 精度是为了避免数据计算错误 eg. 271395.225 * 100 === 27139522.499999996
 */


function toFixed(num, decimal) {
  var assistNum = Math.pow(10, decimal);
  return (Math.round(10 * assistNum * num / 10) / assistNum).toFixed(decimal);
}

function setNumberDecimal(num) {
  var decimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  var data = toNumber(num);

  if (isNaN(decimal) || decimal < 0) {
    return data;
  }

  return toFixed(data, decimal);
}

function addCalc() {
  var num1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var num2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var decimal = arguments.length > 2 ? arguments[2] : undefined;
  var left = toNumber(num1);
  var right = toNumber(num2);
  var maxPrecision = getMaxPrecision(left, right);
  var assistNum = Math.pow(10, maxPrecision); // 268.34 * 100 === 26833.999999999996

  var result = (mulCalc(left, assistNum) + mulCalc(right, assistNum)) / assistNum;
  return setNumberDecimal(result, decimal);
}

function subCalc() {
  var num1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var num2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var decimal = arguments.length > 2 ? arguments[2] : undefined;
  var result = addCalc(toNumber(num1), -toNumber(num2));
  return setNumberDecimal(result, decimal);
}

function mulCalc() {
  var num1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var num2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var decimal = arguments.length > 2 ? arguments[2] : undefined;
  var left = toNumber(num1);
  var right = toNumber(num2);
  var assistNum = Math.pow(10, getTotalPrecision(left, right));
  var result = toNumber(String(left).replace('.', '')) * toNumber(String(right).replace('.', '')) / assistNum;
  return setNumberDecimal(result, decimal);
}

function divCalc() {
  var num1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var num2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var decimal = arguments.length > 2 ? arguments[2] : undefined;
  var left = toNumber(num1);
  var right = toNumber(num2);
  var maxPrecision = getMaxPrecision(left, right);
  var assistNum = Math.pow(10, maxPrecision);
  var result = mulCalc(num1, assistNum) / mulCalc(num2, assistNum);
  return setNumberDecimal(result, decimal);
}

function expCalc(expQueue, decimal) {
  var queue = preExpCalc(expQueue);
  /**
   * 利用 栈 进行表达式求值 https://www.cnblogs.com/lulipro/p/7450886.html
   * 通过将中缀表达式装换为后缀表达式，便不再需要分界符 '(' ')'，同时运算符的优先级也会比较清晰
   * 逆波兰算法 1. 转换为后缀表达式  2. 依据特殊计算规则  eg. 2 * (3 + 4) => 2 (3 4 +) *
   */
  // 将计算队列转换成 逆波兰表达式队列

  var convert = function convert(queue) {
    var numberStack = [];
    var operatorStack = [];

    var isAddOrSub = function isAddOrSub(item) {
      return item === '+' || item === '-';
    };

    queue.forEach(function (item) {
      // 操作数直接进入队列
      var sItem = String(item);

      if (OPERATORS.indexOf(sItem) === -1) {
        numberStack.push(+item);
        return;
      } // 如果操作符栈为空，或当前操作符为 '(' 左分界符时，直接压入栈中


      while (true) {
        // eslint-disable-line
        if (operatorStack.length === 0 || item === '(') {
          operatorStack.push(sItem);
          break;
        }

        var lastOperator = operatorStack.pop(); // `)` 的优先级最高，只要操作符不为 `(` 则一直输出

        if (item === ')') {
          if (lastOperator !== '(') {
            numberStack.push(lastOperator);
            continue;
          } // 跳出循环，不需要输出 `(`


          break;
        }

        if (lastOperator === '(') {
          operatorStack.push(lastOperator, sItem);
          break;
        } // '+' '-' 操作符的优先级最低


        if (isAddOrSub(item) && !isAddOrSub(lastOperator)) {
          numberStack.push(lastOperator);
          continue;
        }

        operatorStack.push(lastOperator, sItem);
        break;
      }
    });

    while (operatorStack.length) {
      var lastOperator = operatorStack.pop();

      if (lastOperator !== '(') {
        numberStack.push(lastOperator);
      }
    }

    return numberStack;
  }; // 计算处理逆波兰表达式队列


  var calculate = function calculate() {
    var polishArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var result = [];
    polishArr.forEach(function (item) {
      if (OPERATORS.indexOf(String(item)) === -1) {
        return result.push(+item);
      }

      var num2 = result.pop();
      var num1 = result.pop();
      /* eslint-disable */

      switch (item) {
        case '+':
          result.push(addCalc(num1, num2, decimal));
          break;

        case '-':
          result.push(subCalc(num1, num2, decimal));
          break;

        case '*':
          result.push(mulCalc(num1, num2, decimal));
          break;

        case '/':
          result.push(divCalc(num1, num2, decimal));
          break;
      }
      /* eslint-enable */

    });
    return result.pop();
  };

  return calculate(convert(queue));
}
/**
 * @description 浮点数相关计算，所有计算结果均会返回对应字符串
 */


var floatcalculate = {
  setNumberDecimal: setNumberDecimal,
  addCalc: addCalc,
  subCalc: subCalc,
  mulCalc: mulCalc,
  divCalc: divCalc,
  expCalc: expCalc
};

var index = {
  utils: utils,
  floatcalculate: floatcalculate
};

export default index;
