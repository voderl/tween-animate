/**
 * parse from and to
 */
import { TweenValue, TweenTo } from 'types';
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
"from": ${stringfy(from)},
"to"  : ${stringfy(to)},
`;
    super(message);
    this.name = 'Parse Error';
  }
}

type Context = {
  count: number;
};

function isPlainNumber(v: any): v is number {
  // test is number and not is NaN
  return typeof v === 'number' && v === v;
}

function parse(from: any, to: TweenTo) {
  let expression = '';
  const context: Context = {
    count: 0,
  };
  if (from !== to) {
    if (typeof to === 'object' && typeof from === 'object') {
      expression = baseParseFromTo(from, to, 'a', context);
    } else if (isPlainNumber(to) && isPlainNumber(from)) {
      expression = `a=${from}+b*${to - from};`;
    } else throw new ParseError(from, to);
  }
  // a: tweening object
  // b: status  0~1
  const func = new Function('a', 'b', expression + 'return a;');
  return function tween(status: number) {
    return func(from, status);
  };
}

const doubleQuoteRegex = /"/g;

function escapeDoubleQuote(input: string) {
  if (input.indexOf(`"`) !== -1) return input.replace(doubleQuoteRegex, `\\"`);
  return input;
}

function baseParseFromTo(
  from: any,
  to: TweenTo,
  expressionKey: string,
  context: Context,
) {
  let expression = '';
  for (const key in to as any) {
    const fromValue = from[key];
    const toValue = to[key];
    if (fromValue !== toValue) {
      if (typeof toValue === 'object' && typeof fromValue === 'object') {
        const newExpressionKey = `a${context.count++}`;
        expression += `var ${newExpressionKey}=${expressionKey}["${escapeDoubleQuote(
          key,
        )}"];${baseParseFromTo(fromValue, toValue, newExpressionKey, context)}`;
      } else if (isPlainNumber(toValue) && isPlainNumber(fromValue)) {
        expression += `${expressionKey}["${escapeDoubleQuote(
          key,
        )}"]=${fromValue}+b*${toValue - fromValue};`;
      } else throw new ParseError(from, to);
    }
  }
  return expression;
}

export default parse;
