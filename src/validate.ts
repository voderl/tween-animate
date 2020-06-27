/**
 *  Vue props validate
 */
enum Types {
  String,
  Number,
  Boolean,
  Function,
  Symbol,
}
type propOptionsKey = {
  default?: any;
  required?: boolean;
  type?: Array<Types | boolean> | Types | boolean;
  validator?: CallableFunction;
};
type propOptions = {
  [key: string]: propOptionsKey;
};
type normalObject = {
  [key: string]: any;
};

function warn(data: any) {
  throw new Error(data);
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj: object, key: string) {
  return hasOwnProperty.call(obj, key);
}
function isObject(obj: any) {
  return obj !== null && typeof obj === 'object';
}
const _toString = Object.prototype.toString;
function toRawType(value: object) {
  return _toString.call(value).slice(8, -1);
}
function cached(fn: CallableFunction) {
  const cache = Object.create(null);
  return function cachedFn(str: string) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cached((str: string) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

/**
 * Capitalize a string.
 */
const capitalize = cached((str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

function isPlainObject(obj: object) {
  return _toString.call(obj) === '[object Object]';
}

export function validate(
  propOptions: propOptions,
  propsData: normalObject,
): normalObject {
  Object.keys(propOptions).forEach((key) => {
    propsData[key] = validateProp(key, propOptions, propsData);
  });
  return propsData;
}

export function validateProp(
  key: string,
  propOptions: propOptions,
  propsData: normalObject,
): any {
  const prop = propOptions[key];
  const absent = !hasOwn(propsData, key);
  let value = propsData[key];
  // boolean casting
  const booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      const stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(prop, key);
  }
  // if (
  //   process.env.NODE_ENV !== 'production'
  // ) {
  assertProp(prop, key, value, absent);
  // }
  return value;
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(prop: propOptionsKey, key: string) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }
  const def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    warn(
      'Invalid default value for prop "' +
        key +
        '": ' +
        'Props with type Object/Array must use a factory function ' +
        'to return the default value.',
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def()
    : def;
}

/**
 * Assert whether a prop is valid.
 */
function assertProp(
  prop: propOptionsKey,
  name: string,
  value: any,
  absent: boolean,
) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  let type = prop.type;
  let valid = !type || type === true;
  const expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (let i = 0; i < type.length && !valid; i++) {
      const assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes));
    return;
  }
  const validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
      );
    }
  }
}

const simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value: any, type: any) {
  let valid;
  const expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType,
  };
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn: any) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a: any, b: any) {
  return getType(a) === getType(b);
}

function getTypeIndex(type: any, expectedTypes: any) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  for (let i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }
  return -1;
}

function getInvalidTypeMessage(
  name: string,
  value: any,
  expectedTypes: Array<any>,
) {
  let message =
    `Invalid prop: type check failed for prop "${name}".` +
    ` Expected ${expectedTypes.map(capitalize).join(', ')}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (
    expectedTypes.length === 1 &&
    isExplicable(expectedType) &&
    !isBoolean(expectedType, receivedType)
  ) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}

function styleValue(value: any, type: string) {
  if (type === 'String') {
    return `"${value}"`;
  } else if (type === 'Number') {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}

function isExplicable(value: string) {
  const explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some((elem) => value.toLowerCase() === elem);
}

function isBoolean(...args: Array<string>) {
  return args.some((elem) => elem.toLowerCase() === 'boolean');
}
