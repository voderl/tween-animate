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
import { TweenValue, TweenTo, AnimateOptions } from 'types';
/**
 * stringfy to a better message
 * @param value
 */
function stringfy(obj: TweenValue) {
  return JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'function') return value.toString();
      if (typeof value === 'number') {
        if (isPlainNumber(value)) return value;
        return (value as any).toString();
      }
      return value;
    },
    '\t',
  );
}
/**
 * extended Error
 */
class ParseError extends Error {
  constructor(
    from: TweenValue,
    to: TweenValue,
    _message = `"from" and "to" have different format`,
  ) {
    const message = `${_message}:
"from":  ${stringfy(from)},
"to"  : ${stringfy(to)},
`;
    super(message);
    this.name = 'Parse Error';
  }
}
// a: tweening object
// b: status  0~1

function getEmptyType(from: TweenValue): string {
  if (Array.isArray(from)) return '[]';
  if (typeof from === 'object') return '{}';
  return `throw new Error(\`"from" type error: ${stringfy(from)}\`)`;
}

type Status = {
  count: number;
  config: AnimateOptions;
};

function isPlainNumber(v: any): v is number {
  // test is number and not is NaN
  return typeof v === 'number' && v === v;
}

function parse(
  from: any,
  _to: TweenTo,
  config?: {
    isAssign: boolean;
  },
) {
  const { isAssign = true } = config || {};
  let expression;
  const status: Status = {
    config: config as AnimateOptions,
    count: 0,
  };
  const to = (
    typeof _to === 'function' ? _to(from, status.config) : _to
  ) as TweenValue;
  if (from !== to) {
    if (typeof to === 'object' && typeof from === 'object') {
      expression =
        (isAssign ? '' : `var a=${getEmptyType(from)};`) +
        baseParseFromTo(from, to, 'a', isAssign, status);
    } else if (isPlainNumber(to) && isPlainNumber(from)) {
      expression = `a=${from}+b*${to - from};`;
    } else throw new ParseError(from, to);
  }
  const func = new Function('a', 'b', expression + 'return a;');
  return function tween(status: number) {
    return func(from, status);
  };
}

function baseParseFromTo(
  from: any,
  to: TweenTo,
  expressionKey: string,
  isAssign: boolean,
  status: Status,
) {
  let expression = '';
  for (const key in to as any) {
    const fromValue = from[key];
    const toValue =
      typeof to[key] === 'function'
        ? to[key](fromValue, status.config)
        : to[key];
    if (fromValue !== toValue) {
      if (typeof toValue === 'object' && typeof fromValue === 'object') {
        const newExpressionKey = `a${status.count++}`;
        expression += `var ${newExpressionKey}=${expressionKey}["${key}"]${
          isAssign ? '' : `=${getEmptyType(fromValue)}`
        };${baseParseFromTo(
          fromValue,
          toValue,
          newExpressionKey,
          isAssign,
          status,
        )}`;
      } else if (isPlainNumber(toValue) && isPlainNumber(fromValue)) {
        expression += `${expressionKey}["${key}"]=${fromValue}+b*${
          toValue - fromValue
        };`;
      } else throw new ParseError(fromValue, toValue);
    }
  }
  return expression;
}

export default parse;
