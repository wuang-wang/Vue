## el与data的两种写法

1、`el`有两种写法

 - `new.Vue`时配置`el属性`
 - 先创建`Vue实例`，随后再通过`vm.$mount('#root')`指定`el`的值

2、`data`有两种写法

 - `对象式`
 - `函数式`
 - 如何选择：在使用组件时，`data`必须使用`函数式`，否则会报错

3、一个重要原则

​	- 由`Vue`管理的函数，一定不要写`箭头函数`，一旦写了`箭头函数`，`this`就不再是`Vue`实例了

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>el与data的两种写法</title>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <h3>hello，{{name}}</h3>
    </div>
</body>

<script>
    Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示

    /*
    // el两种写法
    const v = new Vue( {
        el: '#root',  // el第一种写法
        data: {
            name: '半夏天南星'
        }
    })
    // el第二种写法
    v.$mount('#root');
    */

    // data两种写法
    new Vue({
        el: '#root',
        // data第一种写法，对象式
        // data: {
        //     name: '半夏天南星'
        // }
        // data第二种写法，函数式
        data() {
            console.log(this);  // 此处的this是Vue实例对象
            return{
                name: '半夏天南星'
            }
        }
    })
</script>

</html>
```

## MVVM

![mvvm](imgs\mvvm.png)

MVVM模型

1. `M`：`模型（Model）`：data中的数据
2. `V`：`视图（View）`：模板代码
3. `VM`：`视图模型（ViewModel）`：Vue实例

观察发现：

1. `data`中所有的属性，最后都出现在了`vm（ViewModel的简写）`身上

2. `vn`身上所有的属性 及 `Vue`原型上所有的的属性，在`Vue`模板中都可以直接使用

   ![](imgs/%E5%9B%BE7.png)

## 数据代理

### 回顾Object.defineProperty()

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>回顾Object.defineProperty</title>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
    <script src="../js/vue.js"></script>
</head>

<body>
    <script>
        let number = 18;
        let person = {
            name: '半夏天南星',
            sex: '男',
        }

        // Object.defineProperty添加数据时传入三个参数，分别是：修改对象、添加属性、属性值
        Object.defineProperty(person, 'age', {
            // value: 18,  // 属性值
            // enumerable: true,  // 控制属性是否可以枚举，默认是false
            // writable: true,  // 控制属性是否可以被修改，默认是false
            /configurable: true,  // 控制属性是否可以被删除，默认是false

            // 当有人读取person的age属性时，get函数（getter）就会被调用，且返回值就是age的值
            get() {
                console.log('有人读取age属性了');
                return number;
            },
            // 当有人修改person的age属性时，set函数（setter）就会被调用，且会收到修改的具体值
            set(value) {
                console.log('有人修改了age属性，且值为：', value);
                number = value;
            }
        })

        console.log(person);
    </script>
</body>

</html>
```

### 定义

*通过一个对象代理对另一个对象中属性的操作（读/写）*

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>数据代理</title>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
    <script src="../js/vue.js"></script>
</head>

<body>
    <script>
        let obj1 = { x: 100 };
        let obj2 = { y: 100 };

        Object.defineProperty(obj2, 'x', {
            get() {
                return obj1.x;  // 将obj2的x属性值设置为obj1的x值
            },
            set(value) {
                obj1.x = value;
            }
        })
    </script>
</body>
</html>
```

### Vue中的数据代理

- 通过`vm`对象来代理`data`对象中属性的操作(读/写)

`Vue`中数据代理的好处

		- 更加方便的操作`data`中的数据

基本原理

- 通过`Object.defineProperty()`把`data`对象中所有属性添加到`vm`上
- 为每一个添加到`vm`上的属性，都指定一个`getter/setter`
- 在`getter/setter`内部去操作(读/写)`data`中对应的属性

![](imgs\图8.png)