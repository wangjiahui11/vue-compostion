import { isObject,isString} from "../../lib/index"; // 公用方法
import { mutableHandlers } from "./baseHandlers";  // 代理的方法

export function reactive (target) {
  return createReactiveObject(target, mutableHandlers)
}
const prxoyMap = new WeakMap()  // 用于储存对象
function createReactiveObject (target, baseHandlers) {
  // 01.判断是否为对象
  if (!isObject(target)) return target

  // 02.判断是否缓存
  const existingPrxoy = prxoyMap.get(target)
  if (existingPrxoy){
    return existingPrxoy
  }

  const proxy =new Proxy(target, baseHandlers)
  prxoyMap.set(target,proxy)  // 用于缓存对象
  return proxy
}
