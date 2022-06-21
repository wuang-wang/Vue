`v-bind`：单向绑定解析表达式，可简写为`:xxx`

`v-model`：双向数据绑定

`v-for`：遍历数组/对象/字符串

`v-on`：绑定监听事件，可简写为`@`

`v-if`：条件渲染（动态控制节点是否存在）

`v-else`：条件渲染（动态控制节点是否存在）

`v-show`：条件渲染（动态控制节点是否展示）

## v-text

- 作用：向其所在的节点中渲染文本内容
- 与插值语法的区别：`v-text`会替换掉节点中的内容，`{{xx}}`则不会

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>v-text</title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
    </head>

    <body>
        <div id="root">
            <!-- 插值语法 -->
            <div>{{name}}</div>
            <!-- v-text语法 -->
            <div v-text="name"></div>
        </div>
    </body>

    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        new Vue({
            el: '#root',
            data: {
                name: '半夏天南星',
            },
        });
    </script>
</html>
```

## v-html

- 作用：向指定节点中渲染包含`html`结构的内容
- 与插值语法的区别：
  - `v-html`会替换掉节点中所有的内容，`{{xxx}}`则不会
  - `v-html`可以识别`html`结构
- 严重注意：`v-html`有安全性问题
  - 在网站上动态渲染任意`HTML`是非常危险的，容易导致`XSS`攻击
  - 一定要在可信的内容上使用`v-html`，永不要用在用户提交的内容上

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>v-text</title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
    </head>

    <body>
        <div id="root">
            <!-- v-html语法 -->
            <div v-html="str"></div>
        </div>
    </body>

    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        new Vue({
            el: '#root',
            data: {
                name: '半夏天南星',
                str: '<h3>半夏天南星</h3>'
            },
        });
    </script>
</html>
```

## v-cloak

- 本质是一个特殊属性，`Vue`实例船舰完毕并接管容器后，会删掉`v-cloak`属性
- 使用`css`配合`v-cloak`可以解决网速慢时页面展示出`{{xxx}}`的问题

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>v-cloak</title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
        <style>
            [v-cloak] {
                display: none;
            }
        </style>
    </head>

    <body>
        <div id="root" v-cloak>
            <div>{{name}}</div>
        </div>
    </body>

    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        new Vue({
            el: '#root',
            data: {
                name: '半夏天南星',
            },
        });
    </script>
</html>
```

在简单项目中，使用`v-cloak` 指令是解决屏幕闪动的好方法。但在大型、工程化的项目中（`webpack`、`vue-router`）只有一个空的`div`元素，元素中的内容是通过路由挂载来实现的，这时我们就不需要用到 `v-cloak` 指令

## v-once

- `v-once`所在节点在初次动态渲染后，就视为静态内容了
- 以后数据的改变不会引起`v-once`所在结构的更新，可以用于优化性能

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>v-once</title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
    </head>

    <body>
        <div id="root">
            <h3 v-once>初始化的n值是：{{n}}</h3>
            <h3>当前的n值是：{{n}}</h3>
            <button @click='n++'>点我n+1</button>
        </div>
    </body>

    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        new Vue({
            el: '#root',
            data: {
                n: 1,
            },
        });
    </script>
</html>
```

## v-pre

- 跳过其所在节点的编译过程
- 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>v-pre</title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
    </head>

    <body>
        <div id="root">
            <h3 v-pre>Vue其实很简单</h3>
            <h3 v-pre>当前的n值是：{{n}}</h3>
            <button v-pre @click="n++">点击+1</button>
        </div>
    </body>

    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        new Vue({
            el: '#root',
            data: {
                n: 1,
            },
        });
    </script>
</html>
```

## 自定义指令(函数式)

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title></title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
    </head>

    <body>
        <div id="root">
            <h3>当前n值： <span v-text="n"></span></h3>
            <h3>扩大后的n值： <span v-big="n"></span></h3>
            <button @click='n++'>点击+1</button>
        </div>
    </body>

    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        new Vue({
            el: '#root',
            data: {
                n: 1,
            },
            directives: {
                // 自定义函数何时会被调用：1、指令与元素成功绑定时  2、指令所在的模板被重新解析时
                big(element, binging) {
                    element.innerText = binging.value * 10;
                },
            },
        });
    </script>
</html>
```

## 自定义指令(对象式)

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>自定义指令</title>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <h3>{{name}}</h3>
        <h3>当前n值： <span v-text="n"></span></h3>
        <h3>扩大后的n值： <span v-big="n"></span></h3>
        <button @click='n++'>点击+1</button>
        <hr>
        <!-- 定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点 -->
        <input type="text" v-fbind:value='n'>
    </div>
</body>

<script>
    Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
    new Vue({
        el: '#root',
        data: {
            name: '半夏天南星',
            n: 1,
        },
        directives: {
            // 自定义函数何时会被调用：1、指令与元素成功绑定时  2、指令所在的模板被重新解析时
            big(element, binging) {
                element.innerText = binging.value * 10;
            },
            fbind: {
                // 指令与元素成功绑定时调用
                bind(el, binding) {
                    el.value = binding.value
                },
                // 指令所在元素被插入页面时调用
                inserted(el, binding) {
                    el.focus()
                },
                // 指令所在模板结构被重新解析时调用
                update(el, binding) {
                    el.value = binding.value
                },
            }
        },
    });
</script>

</html>
```

## 自定义指令总结

### 定义语法

- 局部指令

    ```js
    // 方式一    
    new Vue({
    	directives:{
    		指令名:配置对象
    	}
    })
    
    // 方式二
    new Vue({
        directives{
            指令名:回调函数
        }
    })
    ```

    

- 全局指令

    ```js
    // 方式一
    Vue.directive(指令名,配置对象)
    
    // 方式二
    Vue.directive(指令名,回调函数)
    ```

    

### 配置对象中常用的3个回调

- `bind`：指令与元素成功绑定时调用
- `inserted`： 指令所在元素被插入页面时调用
- `update`：指令所在模板结构被重新解析时调用

### 备注

- 指令定义时不加`v-`，但使用时要加`v-`
- 指令名如果是多个单词，要使用`kebab-case`命名方式，不要用`camelCase`命名



