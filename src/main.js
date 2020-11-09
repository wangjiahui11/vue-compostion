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

const { reactive, effect ,computed,ref} = reactivity

// let state = reactive([1,2,3]);
let state = reactive({
  name: '龙山王散人',
  age: 18,
  adress: 'wuhan',
  count:1,
  num:2,
  numbers: [0, 1, 2, 3, 4]
});
// effect(() => {
//   console.log('ok', state.name);
//   let app = document.getElementById('app').innerText = '响应式模块' + '-----------' + state.name
// });

// 计算属性
// 仅读取
const totalCount = computed(()=> state.count + state.num * 10)

// 仅读取和设置
// const totalCount = computed({
//   get(){return state.count + state.num*10},
//   set(newVal){ state.count = newVal }
// })


console.log(totalCount.value);
const title = ref('ref---title');
effect(() => {
  let app = document.getElementById('app').innerText = `${state.name}----${state.num} -----${title.value}`
});

setTimeout(() => {
  state.num=10
  totalCount.value = '新值'
  title.value='修改后的title'
  state.name='修改后的名字'
  console.log(title.value);
  console.log("title.value：", title.value)  // 1
  console.log(totalCount.value);
}, 1000);



// state.a='帅辉'
// state.numbers.length=10
