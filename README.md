

## vue3.0 源码分析

### 了解知识点

1. [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
2. [WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
3. [WeakSet](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)
4. [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
5. [Vue Composition API](https://vue-composition-api-rfc.netlify.com/#summary)



### 环境搭建

- 涉及依赖

  1. vite@1.0.0-rc.1：新一代脚手架
  
- 项目搭建

  1. 准备安装脚手架

     ```
     npm install yarn -g   
     
     vite脚手架安装
     npm install -g create-vite-app
     # or
     yarn add -g create-vite-app
     ```

  2. 项目初始化

     ```
     If using npm:
         $ npm init vite-app <project-name>
         $ cd <project-name>
         $ npm install
         $ npm run dev
         
     If using Yarn:
         $ yarn create vite-app <project-name>
         $ cd <project-name>
         $ yarn
         $ yarn dev
     ```

### 分析模块

- **响应式模块**
  1. reactive函数
  2. effect函数
  3. 依赖收集的实现
  4. 计算属性的实现
  5. ref和toRefs实现原理
- **vue3.0 初始化模块**



### 响应式模块分析

- vue3.0 中响应式模块

  ```
  //node_modules\@vue\reactivity\dist\reactivity.global.js 可以看到该源码
  import { reactive, effect } from '@vue/reactivity' 
  //这里的state会被proxy进行代理
  let state = reactive({
      name: 'vue3.0',
      skill：[
          'javaScipt',
          'vue',
          'react',
          'node',
          'es6'
      ]
  });
  effect(() => {
      let app = document.getElementById('app').innerText = '响应式模块'+ '----'+state.name
  })
  ```

- **自己实现reactive**

  1. 创建src文件夹及目录下components文件夹并对应模块js

     ```javascript
     computed.js
     effect.js
     index.js
     reactive.js
     ref.js
     ```

  2. 创建文件夹lib并在其目录下创建index.js方法

  3. .在src/components/index.js中统一整合方法并进行导出

     ```
     export {computed} from './computed';
     export {effect} from './effect';
     export {reactive} from './reactive';
     export {ref} from './ref';
     ```

  4. 在src/index.js导出该方法

     ```
     export * from './components/index'
     ```

  5. main.js 引入

     ```
     // --- 手写的方法-------
     import * as reactivity from "./src/index"
     const { reactive, effect } = reactivity
     let state = reactive({
         name: 'vue3.0',
         skill：[
             'javaScipt',
             'vue',
             'react',
             'node',
             'es6'
         ]
     });
     effect(() => {
       let app = document.getElementById('app').innerText = '响应式模块'+ '--'+state.name
     })
     ```

  6. 

- 







