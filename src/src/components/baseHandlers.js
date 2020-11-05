import { isObject, isSymbol, isArray, hasOwn, hasChange, isInteger} from "../../lib/index"; // 公用方法
import { reactive } from './reactive'

function createGetter () {
  return function get (target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    // 01.排除symbol类型
    if (isSymbol(target)) {
      return res
    }
    // 依赖收集
     console.log('------------依赖收集功能-------------');
    // 02.--------当取值为对象类型时(对象数组),懒递归操作即在取值时候进行reactive处理
    if (isObject(res)) {
      return reactive(res)
    }
    return res
  }
}

function createSetter () {
  return function set (target, key, value, receiver) {
    //  判断是否时新增还是修改  ---------------  a.数组的逻辑,b.对象的逻辑
    const oldValue = target[key]
    console.log(key, value, target, '设置操作', target.length)
    // 判断是否新增还是修改
    // 数组的判断通过长度,新增长度会变化,另外判断key的是否为init类型，及如果key为length表示修改属性, 对象时,判断对象是否含有该属性
    const hadkey = isArray(target) && isInteger(key)?Number(key)<target.length:hasOwn(target,key);
    if (!hadkey) {
      console.log('新增属性')
    } else if (!hasChange(value, oldValue)){
      console.log('修改属性')
    }

    const result = Reflect.set(target, key, value, receiver);
    return result
  }
}

const get = createGetter() //设置参数
const set = createSetter()

export const mutableHandlers = {
  get,
  set
}
