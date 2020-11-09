import { isArray } from "../../lib";
import { TriggerOpTypes, TrackOpTypes } from "./operations";

export function effect (fn, options = {}) { // effevt 相当于Vue2的wather
  const effect = createReactiveEffect(fn, options);
  if (!options.lazy) {
    effect(); // 默认effect应该立即被执行
  }
  return effect;
}


let activeEffect; // 当前正在执行的effect
let uid = 0
const effectStack = []; // 存放effect的队列  确保activeEffect为当前的effect
function createReactiveEffect (fn, options) {
  const effect = function () {
    // debugger
    if (!effectStack.includes(effect)) { // 防止递归操作
      try {
        effectStack.push(effect); // 将当前effect放到栈中
        activeEffect = effect; // 标记当前运行的effect
        return fn(); // 执行用户定义的方法
      } finally {
        effectStack.pop(); // 执行完毕后出栈
        activeEffect = effectStack[effectStack.length - 1];
      }
    }

  }
  effect.options = options
  effect.id = uid++; // effect的标号
  effect.deps = []; // effect函数对应的属性
  return effect
}

// {object:{key:[effect1,effect2]}}
const targetMap = new WeakMap()  // 用于储存对象

// target与当前effect关联起来   ---------------- 依赖收集函数
export function track (target, key) {// {target:{name:[effect1,effect2]}}
  if (activeEffect === undefined) {
    return
  }
  let depsMap = targetMap.get(target)

  if (!depsMap) { // 如果没有map，增加map
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set))
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);//双向记忆
  }
}


// 触发更新 ---------------- 触发函数
export function trigger (target, type, key, value, oldValue) {
  // debugger
  let depsMap = targetMap.get(target)
  console.log(depsMap, 'depsMap', target, key);
  if (!depsMap) { // 如果没有map，增加map
    return
  }
  const effects = new Set();
  const computedRunners = new Set();
  const add = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => {
        if (effect.options.computed) {
          computedRunners.add(effect)
        } else {
          effects.add(effect)
        }
      })
    }
  }
  // const run = (effects) => {
  //   if (effects) { effects.forEach(effect => effect()); }
  // }
  // console.log(key, target, 'trigger属性');
  // 数组的操作
  if (isArray(target) && key) {
    switch (key) {
      case 'length':
        depsMap.forEach((dep, index) => {
          // console.log(key, value, dep, index);
          if (key == 'length' || key >= value) {
            add(dep)
            // run(dep)
          }
        })
        break;
      default:
        add(depsMap.get('length'))
        // run(depsMap.get('length'))
        break;
    }
  } else {
    /// 对象的操作
    if (key !== void 0) { // 有key 就找到对应的key的依赖执行
      add(depsMap.get(key))
      // run(depsMap.get(key));
    }
  }
  const run = (effect) => {
    if (effect.options.scheduler) {
      effect.options.scheduler(effect)
    } else {
      effect()
    }
  }
  computedRunners.forEach(run)
  effects.forEach(run)
}
