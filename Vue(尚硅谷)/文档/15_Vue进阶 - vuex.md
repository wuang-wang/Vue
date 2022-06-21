## Vuex

概念：专门在`Vue`中实现集中式状态（数据）管理的一个`Vue`插件，对`vue`应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信

## Vuex使用时机

+ 多个组件依赖于同一状态
+ 来自不同组件的行为需要变更同一状态

## Vuex原理图

<img src="imgs\vuex.png" style="zoom:80%;" />

## Vuex环境搭建

+ 创建文件：`src/store/index.js`

    ```js
    // 引入Vue核心库
    import Vue from 'vue'
    // 引入Vuex
    import Vuex from 'vuex'
    // 应用Vuex插件
    Vue.use(Vuex) 
    
    // 准备actions - 用于响应组件中的动作
    const actions = {}
    // 准备mutations - 用于操作数据（state）
    const mutations = {}
    // 准备state - 用于存储数据
    const state = {}
    
    // 创建并暴露store
    export default new Vuex.Store({
        actions,
        mutations,
        state,
    })
    ```

    

+ 在`main.js`中创建`vm`时传入`store`配置项

    ```js
    ......
    // 引入store
    import store from './store'
    ......
    
    // 创建 vm
    new Vue({
        el:'#app',
        render: h =>(App),
        store
    })
    ```

## 基本使用

+ 初始化数据、配置`actions`、配置`mutations`，操作文件`store.js`

```js
// 该文件用于创建Vuex中最为核心的store

// 引入Vue核心库
import { setTimeout } from 'core-js'
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 应用Vuex插件
Vue.use(Vuex)

// 准备actions - 用于响应组件中的动作
const actions = {
    // 加
    increment(context, value) {
        context.commit('INCREMENT', value)
    },
    // 减
    decrenent(context, value) {
        context.commit('DECREMENT', value)
    },
    // 为奇数加
    incrementOdd(context, value) {
        if (context.state.sum % 2) {
            context.commit('INCREMENT', value)
        }
    },
    // 等一等再加
    incrementWait(context, value) {
        setTimeout(() => {
            context.commit('INCREMENT', value)
        }, 500)
    }
}
// 准备mutations - 用于操作数据（state）
const mutations = {
    INCREMENT(state, value) {
        state.sum += value
    },
    DECREMENT(state, value) {
        state.sum -= value
    },
}
// 准备state - 用于存储数据
const state = {
    sum: 0
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
})
```

+ 组件中读取`vuex`中的数据：`$store.state.sum`

+ 组件中修改`vuex`中的数据：`$store.dispatch('action中的方法名'，数据)`或`$store.commit('mutions中的方法名'，数据)`

    ::warning:若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写`dispatch`，直接写`commit`

## 四个map方法的使用

### 引入

```js
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
```

### mapState方法

+ 用于·帮助我们映射`state`中的数据为计算属性

```js
computed:{
    // 借助mapState生成计算属性：sum、school、subject（对象写法）
    ...mapState({sum:'sum',school:'school',subject:'subject'})
    
    // 借助mapState生成计算属性：sum、school、subject（数组写法）
    ...mapState(['sum','school','subject'])
}    
```

### mapGetters方法

+ 用于帮助我们映射`getters`中的数据为计算属性
```js
computed:{
    // 借助mapGetters生成计算属性：bigSum（对象写法）
    ...mapGetters({bigSum:'bigSum'})

    // 借助mapGetters生成计算属性：bigSum（数组写法）
    ...mapGetters(['bigSum'])
}   
```

### mapActios方法

+ 用于帮助我们生成与`actions`对话的方法，即：包含`$store.dispatch(xxx)`的函数
```js
computed:{
    // 靠mapActios生成：incrementOdd、incrementWait（对象写法）
    ...mapActios({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})

    // 靠mapActios生成：incrementOdd、incrementWai（数组写法）
    ...mapActios(['jiaOdd','jiaWait'])
}       
```

### mapMutations方法 

+ 用于帮助我们生成`mutations`对话的方法，即：包含`$store.commit(xxx)`的函数
```js
computed:{
    // 借助mapMutations生成对应的方法：increment、decrement（对象写法）
    ...mapMutations({increment:'JIA',decrement:'JIAN'})

    // 借助mapMutations生成对应的方法：increment、decrement（数组写法）
    ...mapMutations(['JIA','JIAN'])
}   
```

::warning:mapActios与mapMutations使用时，若需要传递参数使用，在模板中绑定事件时传递好参数，否则参数是事件对象

## 模块化

+ 目的：让代码更好维护，让多种数据分类更加明确
+ 修改`store.js`

```js
const countAbout = {
  namespaced:true,//开启命名空间
  state:{x:1},
  mutations: { ... },
  actions: { ... },
  getters: {
    bigSum(state){
       return state.sum * 10
    }
  }
}

const personAbout = {
  namespaced:true,//开启命名空间
  state:{ ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    countAbout,
    personAbout
  }
})
```

+ 开启命名空间后，组件中读取`state`数据

```js
//方式一：自己直接读取
this.$store.state.personAbout.list
//方式二：借助mapState读取：
...mapState('countAbout',['sum','school','subject']),
```

+ 开启命名空间后，组件中读取`getters`数据

```js
//方式一：自己直接读取
this.$store.getters['personAbout/firstPersonName']
//方式二：借助mapGetters读取：
...mapGetters('countAbout',['bigSum'])
```

+ 开启命名空间后，组件中调用`dispatch`

```js
//方式一：自己直接dispatch
this.$store.dispatch('personAbout/addPersonWang',person)
//方式二：借助mapActions：
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```

+ 开启命名空间后，组件中调用`commit`

```js
//方式一：自己直接commit
this.$store.commit('personAbout/ADD_PERSON',person)
//方式二：借助mapMutations：
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
```

