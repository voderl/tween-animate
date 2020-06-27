/**
 * parse from and to
 * @example from: { x: {a: 1}, y: 1}, to : {x: {a: 2}, y: 3}
 * =>  [{key:x, list:[{key:a, from: 1, step: 1}]}, { key: y, from: 1, step: 3}];
 *
 */
/**
 * 转化为易于显示的格式
 * @param value
 */
function stringfy(value: any) {
  if (typeof value === 'object') return JSON.stringify(value, null, '\t');
  else return `"${value}"`;
}
/**
 * extended Error
 */
class ParseError extends Error {
  constructor(from: any, to: any) {
    const message = `from and to has different format:
"from":  ${stringfy(from)},
"to"  : ${stringfy(to)}.
`;
    super(message);
    this.name = 'Parse Error';
  }
}

type tweenInstance = {
  key: string;
  from: number;
  step: number;
};

type tweenChildData = {
  key: string;
  list: tweenData;
};

type tweenNumber = {
  from: number;
  step: number;
};

type tweenObject = Array<tweenInstance | tweenChildData>;
type tweenData = tweenObject | tweenNumber;

type tweenType = object | number;

function parseFromTo(
  fromValue: tweenType,
  toValue: tweenType,
): tweenInstance | tweenData {
  if (fromValue === toValue) return null;
  if (typeof toValue === 'object' && typeof fromValue === 'object') {
    return parseFrom(fromValue, toValue, []);
  } else if (typeof toValue === 'number' && typeof fromValue === 'number') {
    return {
      from: fromValue,
      step: toValue - fromValue,
    };
  } else throw new ParseError(fromValue, toValue);
}

type normalObject = {
  [key: string]: any;
};

function parseFrom(
  from: normalObject,
  to: normalObject,
  list: any[],
): tweenData {
  for (const key in to) {
    const toValue = to[key];
    const fromValue = from[key];
    if (fromValue !== toValue) {
      if (typeof toValue === 'object' && typeof fromValue === 'object') {
        const arr: tweenChildData = {
          key,
          list: parseFrom(fromValue, toValue, []),
        };
        list.push(arr);
      } else if (typeof toValue === 'number' && typeof fromValue === 'number') {
        list.push({
          key,
          from: fromValue,
          step: toValue - fromValue,
        });
      } else throw new ParseError(fromValue, toValue);
    }
  }
  return list;
}

function getStatus(
  parsed: tweenInstance | tweenData,
  value: number,
  applyTo = {},
) {
  if (parsed === null) return applyTo;
  if (!Array.isArray(parsed)) return parsed.from + value * parsed.step;
  return baseGetStatus(parsed, value, applyTo);
}

function isTweenInstance(
  info: tweenInstance | tweenChildData,
): info is tweenInstance {
  return (info as tweenInstance).from !== undefined;
}

function baseGetStatus(
  parsed: tweenData,
  value: number,
  list: normalObject = {},
): object {
  (parsed as tweenObject).forEach((info) => {
    if ('from' in info) list[info.key] = info.from + value * info.step;
    else if (typeof list[info.key] === 'object')
      baseGetStatus(info.list, value, list[info.key]);
    else list[info.key] = baseGetStatus(info.list, value, {});
  });
  return list;
}
// function baseGetStatusWithArr(parsed, value, list = []) {
//   parsed.forEach((info) => {
//     if (info.from !== undefined) {
//       let data = info.from + value * info.step;
//       list.forEach(e => e[info.key] = data);
//     }
//     else if (typeof list[info.key] === 'object')
//       baseGetStatus(info.list, value, list[info.key]);
//     else list[info.key] = baseGetStatus(info.list, value, {});
//   });
//   return list;
// }

// value , easing value
// function parseTo(parsed, value, obj) {
//   if (!Array.isArray(parsed)) return parsed.from + value * parsed.step;
//   baseParseTo(obj);
//   return obj;
// }

// function baseParseTo(parsed, value, obj) {
//   if (typeof obj !== 'object')
//     throw new Error(
//       `${obj[info.key]} should be an object, ${JSON.stringify(parsed)}`,
//     );
//   parsed.forEach((info) => {
//     if (info.from !== undefined) obj[info.key] = info.from + value * info.step;
//     else baseParseTo(info.list, obj[info.key], value);
//   });
// }

export { parseFromTo, getStatus };
