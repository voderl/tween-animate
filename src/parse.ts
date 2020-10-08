import { AnimateConfig } from './define';
/**
 * parse from and to
 * @example 
      parseFromTo(
        { x: [1, 2, 3], y: 1 },
        { x: [1, 2, 6], y: 3 },
        { isAssign: false },
      );
 * @param a - from
 * @param b - status - range 0 - 1
 * @render ƒ anonymous(a,b) {
            var a={};var a_x=a["x"]=[];a_x["2"]=3+b*3;a["y"]=1+b*2;return a;
            }
 */
// 生成Animate时，根据to 生成一个render， 再给予时获得最终的函数
parseFromTo({ x: [1, 2, 3], y: 1 }, { x: [1, 2, 6], y: 3 } as any, {
  isAssign: true,
});
type TweenFrom =
  | {
      [key: string]: any;
    }
  | number;
type TweenTo =
  | {
      [key: string]: (v: TweenFrom) => TweenTo | TweenTo | number;
    }
  | number
  | ((v: TweenFrom) => TweenTo);
type TweenType = TweenFrom | TweenTo;
// tweenTo的对象是函数时，带入函数得到值来parse， 先parse，再得到值与最终幻象值
// 只在开始时parse一次, 如果返回为对象，则每次刷新时都更新， 就是当前值
/**
 * 转化为易于显示的格式
 * @param value
 */
function stringfy(obj: TweenType) {
  return JSON.stringify(
    obj,
    (key, value) => (typeof value === 'function' ? value.toString() : value),
    '\t',
  );
}
/**
 * extended Error
 */
class ParseError extends Error {
  constructor(from: TweenType, to: TweenType) {
    const message = `"from" and "to" have different format:
"from":  ${stringfy(from)},
"to"  : ${stringfy(to)}.
`;
    super(message);
    this.name = 'Parse Error';
  }
}
// a,from
// b,status
// c,isAssign
// d, to
// e, parseFromTo
// f， returnValue
// g, parseError
// 得到一个函数(渲染生成下一个函数的函数)，引入from和config，即可得到最终渲染的函数
// 表达式返回最终的
// from 也要一层层解析， from是b开头，to是
// function parseTo(rawTo: TweenTo, config: AnimateConfig) {
//   const toType = typeof rawTo;
//   let expression;
//   if (toType === 'function') {
//     expression = `f=e(a, d, c);`;
//   } else if (toType === 'object') {
//     expression = ``;
//   } else if (toType === 'number') {
//   }
// }
// function baseParseTo(to: TweenTo, expressionKey: string) {
//   let expression = `var expr='';`;
//   for (const key in to as any) {
//     const toValue = to[key];
//     const toType = typeof toValue;
//     if (toType === 'function') {
//       //expression = `f=e(a, d, c);`;
//     } else if (toType === 'object') {
//       expression += `if(typeof ${expressionKey}.key!=='object') throw new g(a,d);
//       ${baseParseTo(toValue, )}`;
//     } else if (toType === 'number') {
//       expression += `if(typeof ${expressionKey}.key!=='number') throw new g(a,d);expr+=`
//     }

//     if ()
//       typeof to[key] === 'function' ? to[key](fromValue) : to[key];
//     if (fromValue !== toValue) {
//       if (typeof toValue === 'object' && typeof fromValue === 'object') {
//         const newExpressionKey = `${expressionKey}_${key}`;
//         expression += `var ${newExpressionKey}=${expressionKey}.${key}${
//           isAssign ? '' : '={}'
//         };${baseParseFromTo(fromValue, toValue, newExpressionKey, isAssign)}`;
//       } else if (typeof toValue === 'number' && typeof fromValue === 'number') {
//         expression += `${expressionKey}.${key}=${fromValue}+b*${
//           toValue - fromValue
//         };`;
//       } else throw new ParseError(fromValue, toValue);
//     }
//   }
//   return expression;
// }
// a: 实际处理
// b: status  0~1进度
type normalObject = {
  [key: string]: any;
};
type updateFunc = (status: number) => any;
function getEmptyType(from: TweenFrom): string {
  if (Array.isArray(from)) return '[]';
  if (typeof from === 'object') return '{}';
  return `throw new Error(\`"from" type error: ${stringfy(from)}\`)`;
}
function parseFromTo(
  from: TweenFrom,
  rawTo: TweenTo,
  config: AnimateConfig,
): updateFunc {
  const to = typeof rawTo === 'function' ? rawTo(from) : rawTo;
  const { isAssign = true } = config || {};
  let expression;
  if (from !== to) {
    if (typeof to === 'object' && typeof from === 'object') {
      expression =
        (isAssign ? '' : `var a=${getEmptyType(from)};`) +
        baseParseFromTo(from, to, 'a', isAssign);
    } else if (typeof to === 'number' && typeof from === 'number') {
      expression = `a=${from}+b*${to - from};`;
    } else throw new ParseError(from, to);
  }
  const func = new Function('a', 'b', expression + 'return a;');
  console.log(func);
  return function tween(status: number) {
    return func(from, status);
  };
}

function baseParseFromTo(
  from: TweenFrom,
  to: TweenTo,
  expressionKey: string,
  isAssign: boolean,
) {
  let expression = '';
  for (const key in to as any) {
    const fromValue = from[key];
    const toValue =
      typeof to[key] === 'function' ? to[key](fromValue) : to[key];
    if (fromValue !== toValue) {
      if (typeof toValue === 'object' && typeof fromValue === 'object') {
        const newExpressionKey = `${expressionKey}_${key}`;
        expression += `var ${newExpressionKey}=${expressionKey}["${key}"]${
          isAssign ? '' : `=${getEmptyType(fromValue)}`
        };${baseParseFromTo(fromValue, toValue, newExpressionKey, isAssign)}`;
      } else if (typeof toValue === 'number' && typeof fromValue === 'number') {
        expression += `${expressionKey}["${key}"]=${fromValue}+b*${
          toValue - fromValue
        };`;
      } else throw new ParseError(fromValue, toValue);
    }
  }
  return expression;
}
export default parseFromTo;
