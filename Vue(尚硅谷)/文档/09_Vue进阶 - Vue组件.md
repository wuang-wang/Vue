## 使用步骤

1. 定义组件（创建组件）
2. 注册组件
3. 使用组件（写组件标签）

## 非单文件组件

### 定义组件

使用`Vue.extend(options)`创建，其中`options`和`new Vue(options) `时传入的那个`options`几乎一样，但也有点区别

区别如下：

- `el`不要写，因为最终所有的组件都要经过一个`vm`的管理，由`vm`中的`el`决定服务哪个容器
- `data`必须写成函数，避免组件被复用时，数据存在引用关系
- 备注：使用 template 可以配置组件结构。

```js
// 创建组件
const schoolConstructor = Vue.extend({
  //  el: '#root',    组件定义时，一定不要写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个服务器
  template: `
        <div>
            <h2>学校名称：{{name}}</h2>
            <h2>学校地址：{{address}}</h2>
        </div>
    `,
  data() {
    return {
      name: "清华大学",
      address: "北京",
    };
  },
});
```

### 注册组件

#### 局部注册

`new Vue`的时候传入`components`选项

```js
new Vue({
  el: "#root",
  data: {},
  // 组件注册
  components: {
    school: school,
  },
});
```

#### 全局注册

`Vue.component('组件名',组件)`

```js
Vue.component('BaseComponentA',BaseComponentA); //第一个参数:组件名称,第二个参数:要注册的组件
```

### 使用组件

```js
<div id="root">
  <school></school>
</div>
```

### 注意点

1. 关于组件名

    - 一个单词组成
        - 第一种写法（首字母小写）：`school`
        - 第二种写法（首字母大写）：`School`
    - 多个单词组成
        - 第一种写法（`kebab-case命名`）：`my-school`
        - 第二种写法（`CamelCase命名`）：`MySchool`（需要`Vue`脚手架支持）

    - 备注：
        - 组件名尽可能回避`HTML`中已有的元素名称，例如：`h2`、`H2`都不行
        - 可以使用`name`配置项指定组件在开发者工具中呈现的名字

2. 关于组件标签

    - 第一种写法：`<school></school>`
    - 第二种写法：`<school/>`
    - 备注：不使用脚手架时，`<school/>`会导致后续组件不能渲染

3. 一个简写方式

    - `const school = Vue.extend(options)`可简写为：`const school = options`

## VueComponent

1. `school`组件本质是一个名为`VueComponent`的构造函数，且不是程序员定义的，是`Vue.extend`生成的

2. 我们只需要写`<school/>`或`<school></school>`我们只需要写，`Vue`解析时会帮我们创建`school组件`的实例对象；即`Vue`帮我们执行的：`new VueComponent(options)`

3. 特别注意：每次调用`Vue.extend`，返回的都是一个全新的`VueComponent`！！！！

4. 关于`this`指向：

    - 组件配置中：
        - `data`函数、`methods`中的函数、`watch`中的函数、`computed`中的函数 它们的`this`均是`VueComponent实例对象`

    - `new Vue(options)`配置中：
        - `data`函数、`methods`中的函数、`watch中`的函数、`computed`中的函数 它们的`this`均是`Vue实例对象`

5. `VueComponent`的实例对象，以后简称`vc`（也可称之为：`组件实例对象`）；`Vue`的实例对象，以后简称`vm`

```js
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
    <script src="../js/vue.js"></script>
</head>

<body>
    <!-- 准备好一个容器-->
    <div id="root">
        <school></school>
        <hello></hello>
    </div>
</body>

<script type="text/javascript">
    Vue.config.productionTip = false

    //定义school组件
    const school = Vue.extend({
        name: 'school',
        template: `
				<div>
					<h2>名称：{{name}}</h2>	
					<h2>地址：{{address}}</h2>	
					<button @click="showName">点我提示姓名</button>
				</div>
			`,
        data() {
            return {
                name: '半夏天南星',
                address: '杭州'
            }
        },
        methods: {
            showName() {
                console.log('showName', this)
            }
        },
    })

    const test = Vue.extend({
        template: `<span>半夏天南星</span>`
    })

    //定义hello组件
    const hello = Vue.extend({
        template: `
				<div>
					<h2>{{msg}}</h2>
					<test></test>	
				</div>
			`,
        data() {
            return {
                msg: '你好啊！'
            }
        },
        components: { test }
    })

    //创建vm
    const vm = new Vue({
        el: '#root',
        components: { school, hello }
    })
</script>

</html>
```

## 单文件组件

#### 代码示例：

::warning:以下示例代码，暂时无法运行，因为需要在`vue`脚手架下才能解析，此处只是展示`单文件组件`的写法

`index.html`

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>主页</title>
</head>
<body>
    <div id="root"></div>
</body>

<script src="../js/vue.min.js"></script>
<script src="./main.js"></script>
</html>
```

`main.js`

```js
import App from './App.vue'

new Vue({
    el: '#root',
    // render: (h) => h(App),
    template: `<App></App>`,
    components: {
        App
    }
});
```

`App.vue`

```vue
<template>
  <div>
      <School></School>
      <Student></Student>
  </div>
</template>

<script>
import School from "./School.vue";
import Student from "./Student.vue";
export default {
  name: "App",
  components: {
    School,
    Student,
  },
};
</script>

<style lang="scss" scoped>
</style>
```

`School.vue`

```vue
<template>
  <div class="school">
    <h2>名称：{{ name }}</h2>
    <h2>地址：{{ address }}</h2>
    <button @click="showName">点我提示姓名</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "半夏天南星",
      address: "杭州",
    };
  },
  methods: {
    showName() {
      console.log("showName", this);
    },
  },
};
</script>

<style lang="" scoped>
.school {
  background: orange;
}
</style>
```

`Student.vue`

```vue
<template>
  <div class="school">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "半夏天南星",
      age: 18,
    };
  },
};
</script>
```
