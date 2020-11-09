
import { reactive } from "./reactive";
import { track, trigger } from "./effect";
import { hasChange,isObject }  from "../../lib/index";
import { TriggerOpTypes, TrackOpTypes } from "./operations";
export function ref (value) {
  return createRef(value);
}
// -------------- 对象就进行响应式处理
function convert (rawValue) {
  return isObject(rawValue) ? reactive(rawValue) : rawValue
}
function createRef (rawValue) {
  let value = convert(rawValue);
  let r = {
    __v_isRef: true,
    get value () { // 取值依赖收集
      track(r, 'value')
      return value
    },
    set value (newVal) { // 设置时触发更新
      if (hasChange(newVal, rawValue)) {
        rawValue = newVal;
        value = newVal

        trigger(r, TriggerOpTypes.SET, 'value')
      }
    }
  }
  return r
}
