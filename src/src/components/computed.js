import { isFunction } from "../../lib/index"; // 公用方法
import { effect, track, trigger } from './effect'
import { TriggerOpTypes, TrackOpTypes } from "./operations";
export function computed(getterOrOptions){
  let getter;
  let setter;
  // 判断是否仅读取还是读取设置
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
    setter = () => {}
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  let dirty = true;
  let computed;
  let value;
      // debugger
  let runner = effect(getter, {
    lazy: true, // 默认不执行
    computed: true, // 计算属性
    // 依赖数据更新时调用此方法
    scheduler: () => {
      if (!dirty) {
        dirty = true;
        trigger(computed, TriggerOpTypes.SET, 'value')
      }
    }
  })

  computed = {
    __v_isRef: true,
    get value () {
      if (dirty) {
        value = runner(); // 取值时运行effect
        dirty = false;
      }
      // debugger
      track(computed, 'value');
      return value;
    },
    set value (newValue) {
      setter(newValue)
    }
  }
  return computed;

}
