/**
 * 解析from 和 to， 得出中间value如何变化，或者是直接更改元素
 * 键值解析为数组，可能效率好一点吧？
 */
function stringfy(value) {
  if (typeof value === 'object') return JSON.stringify(value, null, '\t');
  else return `"${value}"`;
}
class ParseError extends Error {
  constructor(from, to) {
    const message = `from and to has different format:
"from":  ${stringfy(from)},
"to"  : ${stringfy(to)}.
`;
    super(message);
    this.name = 'Parse Error';
  }
}
function parseFromTo(fromValue, toValue) {
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

function parseFrom(from, to, list) {
  for (const key in to) {
    const toValue = to[key];
    const fromValue = from[key];
    if (fromValue !== toValue) {
      if (typeof toValue === 'object' && typeof fromValue === 'object') {
        const arr = {
          key,
          list: [],
        };
        parseFrom(fromValue, toValue, arr.list);
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

function getStatus(parsed, value, applyTo = {}) {
  if (parsed === null) return applyTo;
  if (!Array.isArray(parsed)) return parsed.from + value * parsed.step;
  if (applyTo) return baseGetStatus(parsed, value, applyTo);
}

function baseGetStatus(parsed, value, list = {}) {
  parsed.forEach((info) => {
    if (info.from !== undefined) list[info.key] = info.from + value * info.step;
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
function parseTo(parsed, value, obj) {
  if (!Array.isArray(parsed)) return parsed.from + value * parsed.step;
  baseParseTo(obj);
  return obj;
}

function baseParseTo(parsed, value, obj) {
  if (typeof obj !== 'object')
    throw new Error(
      `${obj[info.key]} should be an object, ${JSON.stringify(parsed)}`,
    );
  parsed.forEach((info) => {
    if (info.from !== undefined) obj[info.key] = info.from + value * info.step;
    else baseParseTo(info.list, obj[info.key], value);
  });
}

export { parseFromTo, getStatus };
