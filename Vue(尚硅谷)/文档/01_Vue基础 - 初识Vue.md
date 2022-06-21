## Vue是什么
`Vue`是一套用于`构建用户界面`的`渐进式J`avaScript框架

Vue可以自底向上逐层的应用

简单应用：只需要一个轻量小巧的核心库

复杂应用：可以映入格式各样的Vue插件

`Vue官网`： https://cn.vuejs.org/

## Vue的特点

1、采用组件化模式，提高代码复用率、切让代码更好维护

2、声明式编码，让编码人员无需直接操作DOM，提高开发效率

3、使用虚拟DOM+优秀的Diff算法，尽量复用DOM节点

<img src="\imgs\图1.png" alt="img" style="zoom: 50%;" />

## 搭建Vue开发环境

### 1、引入`Vue`

方式一：[下载](https://cn.vuejs.org/v2/guide/installation.html)

<img src="\imgs\图2.png" alt="img"  />

方式二：CDN

​	对于制作原型或学习，你可以这样使用最新版本：

```javascript
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
```

对于生产环境，我们推荐链接到一个明确的版本号和构建文件，以避免新版本造成的不可预期的破坏：

```javascript
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
```

### 2、初体验

```javascript
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>模板语法</title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
    </head>
    <body>
        <div id="root"></div>
    </body>

    <script>
        // 初次使用vue，控制台会提示You are running Vue in development mode.Make sure to turn on production mode when deploying for production.只需进行如下设置
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
    </script>
</html>
```

## HelloWorld案例分析

1. 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；
2. root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法
3. root容器里的代码被称为【Vue模板】
4. Vue实例和容器是一一对应的
5. 真实开发中只有一个Vue实例，并且会配合着组件一起使用
6. {{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性
7. 一旦data中的数据发生改变，那么模板中用到该数据的地方会自动更新

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>初识Vue</title>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <h1>Hello,{{ name }}</h1>
    </div>
</body>

<script>
    Vue.config.productionTip = false;  //阻止 vue 在启动时生成生产提示

    // 创建Vue实例
    new Vue({
        el: '#root',  // el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串
        data: {  // data中用于存储数据，数据供el所指定的容器去使用，值暂时先写成一个对象
            name: '半夏天南星',
        }
    });
</script>

</html>
```

![结果](D:\Project\Personal\Vue\文档\imgs\图3.png)