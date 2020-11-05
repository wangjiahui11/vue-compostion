// import { createApp } from 'vue'
// import App from './App.vue'
import './index.css'
// createApp(App).mount('#app')
// import { reactive, effect } from '@vue/reactivity'
// let state = reactive({
//   name: '龙山王散人'
// });

// effect(() => {
//   let app = document.getElementById('app').innerText = '响应式模块'+ '-----------'+ state.name
// });

// --- 手写的方法-------
import * as reactivity from "./src/index"

const { reactive, effect } = reactivity

// let state = reactive({
//   name: '龙山王散人',
//   skill:{
//     a:1
//   }
// });
let state = reactive({
  name: '龙山王散人',
  numbers:[0,1,2,3,4]
});
effect(() => {
  // state.numbers.push(5)
  // let app = document.getElementById('app').innerText = '响应式模块'+ '-----------'+ state.name
});
state.a='帅辉'
state.numbers.length=10
