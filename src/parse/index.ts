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
import { TweenValue, TweenTo } from 'types';
/**
 * stringfy to a better message
 * @param value
 */
function stringfy(obj: TweenValue) {
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
  constructor(from: TweenValue, to: TweenValue) {
    const message = `"from" and "to" have different format:
"from":  ${stringfy(from)},
"to"  : ${stringfy(to)}.
`;
    super(message);
    this.name = 'Parse Error';
  }
}
function getType(o: any) {
  if (Array.isArray(o)) return 'array';
  return typeof o;
}

// a: tweening object
// b: status  0~1

function getEmptyType(from: TweenValue): string {
  if (Array.isArray(from)) return '[]';
  if (typeof from === 'object') return '{}';
  return `throw new Error(\`"from" type error: ${stringfy(from)}\`)`;
}

function parse(
  from: any,
  rawTo: TweenTo,
  config?: {
    isAssign: boolean;
  },
) {
  const to = (typeof rawTo === 'function' ? rawTo(from) : rawTo) as TweenValue;
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
  return function tween(status: number) {
    return func(from, status);
  };
}

function baseParseFromTo(
  from: TweenValue,
  to: TweenValue,
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

export default parse;
