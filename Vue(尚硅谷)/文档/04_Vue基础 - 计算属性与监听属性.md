## 计算属性(computed)

### 定义

要用的属性不存在，要通过已有属性计算得来

### 原理

底层借助了`Object.defineproperty`方法提供的`getter`和`setter`

### 执行时机

- 初次读取时会执行一次
- 当依赖的数据发生改变时会被再次调用

### 优势

与`methods`实现相比，内部有缓存机制（复用），效率更高，调试方便

### 备注

- 计算属性最终会出现在`vm`上，直接读取使用即可
- 如果计算属性要被修改，那必须写`set函数`去响应修改，且set中要引起计算时以来的数据发生变化

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>计算属性(computed)</title>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        姓：<input type="text" v-model="firstName"><br>
        名：<input type="text" v-model="lastName"><br>
        全名：<span>{{fullName}}</span>
    </div>
</body>

<script>
    Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
    const vm = new Vue({
        el: '#root',
        data: {
            firstName: '半夏',
            lastName: '天南星'
        },
        computed: {
            fullName: {
                // get的作用：当fullName被读取时，get就会被调用，且返回值就作为fullName的值
                // get什么时候调用：1、初次读取fullName时，2、所依赖的数据发生变化时
                get() {
                    // 此处this是vm
                    return this.firstName + '-' + this.lastName
                },
                // set什么时候调用?当fullName被修改时
                set(value) {
                    const arr = value.split('-');
                    this.firstName = arr[0];
                    this.lastName = arr[1];
                }
            }
        }
    })
</script>

</html>
```

## 计算属性简写

```js
computed: {
    fullName: function() {
        return this.firstName + '-' + this.lastName
    }
}
```

## 监听属性(watch)

### 基本使用

1. 当被监视的属性发生变化时，回调函数自动调用，进行相关操作
2. 监视的属性必须存在，才能进行监视
3. 监视的两种写法：
   - `new Vue`时传入`watch`配置
   - 通过`vm.$watch`监视

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>监听属性</title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
    </head>

    <body>
        <div id="root">
            <h3>今天天气很{{info}}</h3>
            <button @click="changeWeather">切换天气</button>
        </div>
    </body>

    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        const vm = new Vue({
            el: '#root',
            data: {
                isHot: true,
            },
            computed: {
                info: function () {
                    return this.isHot ? '炎热' : '凉爽';
                },
            },
            methods: {
                changeWeather() {
                    this.isHot = !this.isHot;
                },
            },
            // 方式一
            watch: {
                isHot: {
                    // 初始化时让handler调用一次
                    immediate: true,
                    // handler何时执行？当isHot发生改变时
                    // handler接收两个参数，newValue：新值  与  oldValue：旧值
                    handler(newValue, oldValue) {
                        console.log(newValue, oldValue);
                    },
                },
            },
        });
        // 方式二
        /* vm.$watch('isHot', {
            // 初始化时让handler调用一次
            immediate: true,
            // handler何时执行？当isHot发生改变时
            // handler接收两个参数，newValue：新值  与  oldValue：旧值
            handler(newValue, oldValue) {
                console.log(newValue, oldValue);
            },
        }); */
    </script>
</html>
```

### 深度监视

1. `Vue`中的`watch`默认不监测对象内部值的改变（一层）
2. 配置`deep：true`可以监测对象内部值改变（多层）

备注：

- `Vue`自身可以检测对象内部值的改变，但`Vue`提供的`watch`默认不可以！
- 使用`watch`时根据数据的具体结构，决定是否采用`深度监视`

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>深度监听</title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
    </head>

    <body>
        <div id="root">
            <h3>a：{{numbers.a}}</h3>
            <button @click="numbers.a++">a值累加</button>
            <h3>b：{{numbers.b}}</h3>
            <button @click="numbers.b++">a值累加</button>
        </div>
    </body>

    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        const vm = new Vue({
            el: '#root',
            data: {
                numbers: {
                    a: 1,
                    b: 1,
                },
            },
            // 方式一
            watch: {
                // 监听多级结构中某个属性的变化
                /* 'numbers.a': {
                    handler(newValue, oldValue) {
                        console.log(newValue, oldValue);
                    },
                }, */
                // 监听多级结构中所有属性的变化
                numbers: {
                    deep: true,  // 开启深度监视，默认为false
                    handler(newValue, oldValue) {
                        console.log('numbers发生变化');
                    },
                },
            },
        });
    </script>
</html>
```

### 监听属性简写

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>监听属性-简写</title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
    </head>

    <body>
        <div id="root">
            <h3>今天天气很{{info}}</h3>
            <button @click="changeWeather">切换天气</button>
        </div>
    </body>

    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        const vm = new Vue({
            el: '#root',
            data: {
                isHot: true,
            },
            computed: {
                info: function () {
                    return this.isHot ? '炎热' : '凉爽';
                },
            },
            methods: {
                changeWeather() {
                    this.isHot = !this.isHot;
                },
            },
            // 方式一
            watch: {
                /* isHot: {
                    // 初始化时让handler调用一次
                    // immediate: true,
                    // handler何时执行？当isHot发生改变时
                    // handler接收两个参数，newValue：新值  与  oldValue：旧值
                    handler(newValue, oldValue) {
                        console.log(newValue, oldValue);
                    },
                }, */
                // 简写，简写时，只允许存在一个配置项，即handler
                isHot(newValue, oldValue) {
                    console.log(newValue, oldValue);
                },
            },
        });
    </script>
</html>
```

### 计算属性(computed)  VS  监听属性(watch)

#### 区别

1. `computed`能完成的功能，`watch`都可以完成
2. `watch`能完成的功能，`computed`不一定能完成，例如：`watch`可以进行异步操作

#### 原则

1. 所被`Vue`管理的函数，最好写成普通函数，这样`this`的指向才是`vm`或`组件实例对象`
2. 所有不被`Vue`所管理的函数（定时器的回调函数、ajax的回调函数），最好写成箭头函数，这样`this`的指向才是`vm`或`组件实例对象`
