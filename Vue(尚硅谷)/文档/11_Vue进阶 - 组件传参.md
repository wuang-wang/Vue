## 父子组件传参

### 父传子

- 一般都是需要传动态的值，所以需要`v-bind`绑定，当然，传递的值也可以是`数字`、`对象`、`数组`等等

- 子组件中接受父页面传过来的值，有几点需要了解：
  - 组件实例的作用域是孤立的
  - 子组件要显式的用`props`选项声明它预期的数据
  
- 示例：

**父组件**

```js
// 定义数据
data() {
    return {
        todos: [
        { id: "001", title: "看书", done: true },
        { id: "002", title: "看电影", done: false },
        { id: "003", title: "运动", done: true },
        ],
    };
},
// 通过属性的方式将数据传递给子组件
<VueFooter :todos="todos" />    
```

**子组件**

```js
// 通过props接收，然后正常使用即可
export default {
  name: "VueFooter",
  props: ["todos"]
};
```


### 子传父

- 在`vue`中，父子组件的关系可以总结为`prop`向下传递，`事件`向上传递。父组件通过`prop`给子组件下发数据，子组件通过`事件`给父组件发送信息

![](imgs\图15.png)

- 每个Vue实例都实现了事件接口：使用`$on(evntName)`监听事件；使用`$emit(eventName,optionalPayload)`触发事件。另外，父组件可以在使用子组件的地方直接用`v-on`来监听子组件触发的事件。

示例：

**子组件**

```js
<template>
  <div>
    <div @click="closePro">弹窗</div>
  </div>
</template>

<script>
export default {
  methods: {
      closePro(){
          this.$emit('closepop',"That's the data that was passed")//通知父组件接收closepop事件改变
      }
  }
};
</script>
```

**父组件**

```js
<template>
  <div>
   <AddWeapp @closepop="closepopEven"></AddWeapp>
  </div>
</template>

<script>
import AddWeapp from "@/components/AddWeapp.vue";
export default {
  components: {
    AddWeapp,
  },
  methods: {
   closepopEven(msg) {
      console.log(msg);
    },
  }
};
</script>
```

## 全局事件总线

`EventBus` 又称为事件总线。在Vue中可以使用 `EventBus` 来作为沟通桥梁的概念，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件

### 全局事件总线

1. 创建全局事件总线，在`main.js` 中创建

```js
// 创建写法1：
let EventBus = new Vue() //vue实例可以作为事件总线
Object.defineProperties(Vue.prototype,{
    $bus:{
       get(){
        return EventBus  
    }   
  }
})
// 创建写法2：
Vue.prototype .$bus = new Vue()
```

2.在组件中基于全局事件总线中发送和监听事件

```js
this.$bus.$emit('nameOfEvent', { ... pass some event data ...});
 
this.$bus.$on('nameOfEvent',($event) => {
  // ...
})
```

### 事件总线

- 创建一个单独的event-bus.js文件

```jsx
//引入vue模块
import Vue from 'vue'
let EventBus = new Vue()
export default EventBus
```

- 在组件中基于事件中线发送事件

```csharp
//a.js
<script>
  import EventBus from event-bus.js
//发送事件，第二个参数可选
  EventBus.$on("aMsg", (msg) => {
      // 发送来的消息
      this.msg = msg;
    });
}
</script>
```

- 在组件中基于事件总线监听事件

```xml
//b.js
<script>
  import EventBus from event-bus.js
EventBus.$on("aMsg",(msg)=>{
//  do something
})
</script>
```

### 移除事件监听

vue是单页应用，如果你在某一个页面刷新了之后，与之相关的EventBus会被移除，这样就导致业务走不下去。还有就是如果业务有反复操作的页面，EventBus 在监听的时候就会触发很多次，也是一个非常大的隐患。这时候我们就需要好好处理 EventBus 在项目中的关系。通常会用到，在vue页面销毁时，同时移除EventBus 事件监听。

```js
<script>
import EventBus from event-bus.js
    //移除事件监听者
    // 最好在组件销毁前
beforeDestroy: function () {
  eventBus.$off('add-todo', this.addTodo)
  eventBus.$off('delete-todo', this.deleteTodo) //两个参数
},
methods: {
  addTodo: function (newTodo) {
    this.todos.push(newTodo)
  },
  deleteTodo: function (todoId) {
    this.todos = this.todos.filter(function (todo) {
      return todo.id !== todoId
    })
  }
</script>
```

`EventBus.$off()` -----------移除当前组件的所有事件监听者
`EventBus.$off(param:string)`------------移除当前组件对某个事件的所有监听
`EventBus.$off(param:string,param)`-------移除某个方法对某个事件的监听如：`this.addTodo`

## 消息订阅与发布

- 一种组件间通信的方式，适用于`任意组件间通信`

- 使用步骤：

    - 安装`pubsub`：`npm i pubsub-js`

    - 引入：`import pubsub from 'pubsub-js'`

    - 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的`回调留在A组件自身`

```js
methods() {
    demo(data) {
        ......
    }
}

mounted() {
    this.pid = pubsub.subscribe('xxx',this.demo)  // 订阅消息
}
```

- 提供数据：`pubsub.publish('xxx',数据)`
- 最好在`beforeDestroy`钩子中，用`PubSub.unsubscribe(pid)`去`取消订阅`

## nextTick

- 语法：`this.$nextTick(function () {});`
- 作用：在下一次DOM更新结束后执行其指定的回调
- 何时使用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在`nextTick`所指定的回调函数中执行