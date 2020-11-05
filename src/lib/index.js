export const isObject =(target)=>{
  return typeof target === 'object'&&  target !== null;
  // return Object.prototype.toString.call(target) === '[object Object]'
}

export const isString =(target)=>{
  return Object.prototype.toString.call(target) === '[object String]'
}

export const isArray =(target)=>{
  return Object.prototype.toString.call(target) === '[object Array]'
}

export const isSymbol =(target)=>{
  return Object.prototype.toString.call(target) === '[object Symbol]'
}

export const isInteger =(target)=>{
  return parseInt(target, 10) === target
}
// 判断对象是否函数某属性
export const hasOwn =(target,key)=>{
  return target.hasOwnProperty(key)
}
// 新值和老值进行对比
export const hasChange =(value,oldValue)=>{
  return  value === oldValue
}
