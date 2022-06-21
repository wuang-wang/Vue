## 不同版本的Vue

1. `vue.js`与`vue.runtime.xxx.js`的区别
   - `vue.js`是完整版的`vue`，包含：`核心功能`+`模板解析器`
   - `vue.runtime.xxx.js`是运行版的`Vue`，只包含：`核心功能`；没有`模板解析器`
2. 因为`vue.runtime.xxx.js`没有`模板解析器`，所以不能使用`template`配置项，需要使用`render函数`接收到`createElement函数`去指定具体内容

## ref属性

1. 被用来给元素或子组件注册引用信息（`id`的替代者）
2. 应用再`html`标签上获取的是真实`DOM`元素，应用在组件标签上是`组件实例对象`（`VueComponent`）
3. 使用方式：
   - `打标识`：`<h2 ref="xxx">......</h2>`或`<User ref="xxx"></User>`
   - `获取`：`this.$refs.xxx`

```js
<template>
  <div>
    <h2 v-text="msg" ref="title"></h2>
    <User ref="user"></User>
    <button @click="showDOM">点击显示对应DOM</button>
  </div>
</template>

<script>
import User from "./components/User.vue";
export default {
  name: "App",
  components: {
    User,
  },
  data() {
    return {
      msg: "Vue脚手架学习！",
    };
  },
  methods: {
    showDOM() {
      console.log(this.$refs.title);  // 获取真实DOM
      console.log(this.$refs.user);  // User组件的实例对象(vc)
    },
  },
};
</script>
```

## props配置

- 功能：让组件接收外部传过来的数据

1. 传递数据

   - `<Demo name="xxx"/>`

2. 接收数据

   - 第一种方式（只接收）

     `props:['name']`

   - 第二种方式（限制类型）

     `props:{`

     ​	`name:String`

     `}`

   - 第三种方式（限制类型、限制必要性、指定默认值）

     `props:{`

     ​	`name:{`

     ​		`type:String,`

     ​		`require: true, // 设置必传`

     ​		`default: 18, // 默认值`

     ​	`}`

     `}`
   
3. 备注

   - `props`是只读的，`Vue`底层会监测用户对`props`的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么就复制`props`的内容到`data`中一份，然后去修改`data`中的数据

`App.vue`

```js
<template>
  <div>
    <User name="半夏天南星" :age="24" address="浙江 - 杭州" />
  </div>
</template>

<script>
import User from "./components/User.vue";
export default {
  name: "App",
  components: {
    User,
  },
};
</script>
```

`User.vue`

```js
<template>
  <div class="school">
    <h2>{{ msg }}</h2>
    <h3>名称：{{ name }}</h3>
    <h3>名称：{{ age }}</h3>
    <h3>地址：{{ address }}</h3>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      msg: "用户信息",
    };
  },
  // 简单声明接收
  // props: ["name", "age", "address"],

  // 接收时对类型进行限制
  // props: {
  //   name: String,
  //   address: String,
  //   age: Number,
  // },

// 接收的同时对数据：进行类型限制 + 默认值的指定 + 必要性的限制
  props: {
    name: {
      type: String,
      require: true,  // 设置必传
    },
    age: {
      type: Number,
      default: 18,  // 默认值
    },
    address: {
      type: String,
      require: true,
    },
  },
};
</script>

<style>
</style>
```

## mixin混入

- 功能：可以把多个组件共用的配置提取成一个混入对象

- 使用方式：

  - 第一步定义混合，例如：

    `{`

    ​	`data(){......},`

    ​	`methods:{......}`

    ​	`......`

    `}`

  - 第二部使用混入，例如：

    1. `全局混入`：`Vue.mixin(xxx)`
    2. `局部混入`：`mixins:['xxx']`

`User.vue`

```js
<template>
  <div class="school">
    <h2>{{ msg }}</h2>
    <h3 @click="showName">名称：{{ name }}</h3>
    <h3>名称：{{ age }}</h3>
    <h3>地址：{{ address }}</h3>
  </div>
</template>

<script>
import { hybrid } from "../mixin";
export default {
  name: "School",
  data() {
    return {
      msg: "用户信息",
      name: "半夏天南星",
      age: "24",
      address: "浙江 - 杭州",
    };
  },
  mixins: [hybrid],
};
</script>

<style>
</style>
```

`School.vue`

```js
<template>
  <div class="school">
    <h2>{{ msg }}</h2>
    <h3 @click="showName">名称：{{ name }}</h3>
    <h3>地址：{{ address }}</h3>
  </div>
</template>

<script>
import { hybrid } from "../mixin";
export default {
  name: "School",
  data() {
    return {
      msg: "学校信息",
      name: "XXXX学院",
      address: "浙江 - 杭州",
    };
  },
  mixins: [hybrid],
};
</script>

<style>
</style>
```

`mixin.js`

```js
export const hybrid = {
    methods: {
        showName() {
            alert(this.name);
        },
    },
};
```

## scoped样式

- 作用：让样式在局部生效，防止冲突
- 写法：`<style scoped>`

![scoped](imgs\scoped.png)
