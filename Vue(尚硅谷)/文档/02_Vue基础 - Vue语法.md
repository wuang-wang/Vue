## 模板语法

### Vue模板语法有两大类

1、插值语法

​	功能：用于解析标签体内容

​	写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性

2、指令语法

​	功能：用于解析标签（包括：标签属性、标签体内容、绑定事件......）

​	举例：`v-bind:href='xxx'`或简写为`:href='xxx'`，xxx同样要写js表达式，且可以直接读取到data中的所有属性

​	备注：Vue中有很多的指令，且形式都是：v-???，此处我们只是拿`v-bind`举个例子

3、示例

```html
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
    <div id="root">
        <h1>插值语法</h1>
        <h3>Hello,{{name}}</h3>
        <hr/>
        <h3>指令语法</h3>
        <!-- <a v-bind:href='url.toUpperCase()'>跳转链接</a> -->
        <!-- 简写 -->
        <a :href='school.url'>{{school.name}}跳转链接</a>
    </div>
</body>

<script>
    Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
    new Vue({
        el: '#root',
        data: {
            name: '半夏天南星',
            school: {
                name: 'Vue',
                url: 'https://juejin.cn/user/2700056291190584/posts',
            }
        }
    })
</script>

</html>
```

![图4](imgs\图4.png)

## 插值语法

1. 语法: `{{exp}}`

2. 功能: 向页面输出数据

3. 可以调用对象的方法

    里面写js表达式：有返回值的js代码，而不是js语句

## 指令语法

### 数据绑定

Vue中有两种数据绑定的方式：

​	1、单向数据绑定（v-bind）：数据只能从data流向页面

​	2、双向数据绑定（v-model）：数据不仅能从data流向页面，还可以从页面流向data

​	备注：

		- 双向数据绑定一般都应用在表单类元素上（如：input、select等）
		- `v-model:value`可以简写为`v-model`，因为`v-model`默认收集的就是value值

#### 单项数据绑定

`v-bind`：只能实现单向的数据绑定

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>数据绑定</title>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        单向数据绑定：<input type="text" :value="name"><br>
    </div>
</body>

<script>
    Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
    new Vue({
        el: '#root',
        data: {
            name: '半夏天南星'
        }
    })
</script>

</html>
```

![](imgs\图5.png)

#### 双向数据绑定

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>数据绑定</title>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        单向数据绑定：<input type="text" :value="name"><br>
        双向数据绑定：<input type="text" v-model="name">

        <!-- 如下代码是错误的，因为v-model只能应用在表单类元素（输入类元素）上 -->
        <h2 v-model:x="name">你好啊</h2>
    </div>
</body>

<script>
    Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
    new Vue({
        el: '#root',
        data: {
            name: '半夏天南星'
        }
    })
</script>

</html>
```

![](imgs\图6.png)



### 事件处理

#### 基本使用

1. 使用`v-on:xxx`或`@xxx`绑定事件，其中`xxx`是事件名

2. 事件的回调需要配置在`methods`对象中，最终会在`vm`上

3. `methods`中配置的函数，不要用箭头函数，否则`this`就不是`vm`了

4. `methods`中配置的函数，都是被`Vue`所管理的函数，`this`的指向是`vm`或`组件实例对象`

5. `@click="demo"`和`@click="demo($event)"`效果一致，但后者可以传参

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
            <h2>欢迎访问{{name}}的文章</h2>
            <!-- <button v-on:click="showInfo1">点我</button> -->
            <!-- 简写 -->
            <button @click="showInfo1">点我（不传参）</button>
            <button @click="showInfo2($event,66)">点我（传参）</button>
        </div>
    </body>
    
    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        const vm = new Vue({
            el: '#root',
            data: {
                name: '半夏天南星'
            },
            methods: {
                showInfo1() {
                    console.log(this);  //此处的this是vm
                    alert('同学你好！')
                },
                showInfo2(event,number) {
                    console.log(event);
                    console.log(number);  // 66
                }
            }
        })
    </script>
    
    </html>
    ```

#### 默认修饰符

1. `prevent`：阻止默认事件（常用）

2. stop：阻止事件冒泡（常用）

3. once：事件只触发一次（常用）

4. capture：阻止默认事件

5. self：只有`event.target`是当前操作的元素才出发事件

6. passive：时间的默认行为立即执行，无需等待事件回调执行完毕

```html
	<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title></title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
        <style>
            *{
                margin-top: 20px;
            }
        </style>
    </head>
    
    <body>
        <div id="root">
            <h3>欢迎访问{{name}}的文章</h3>
            <!-- 阻止默认事件（常用） -->
            <a href="https://juejin.cn/user/2700056291190584/posts" @click.prevent='showInfo'>阻止默认事件</a>
            <!-- 阻止事件冒泡（常用） -->
            <div @click='showInfo'>
                <button @click.stop='showInfo'>阻止事件冒泡</button>  
            </div>
            <!-- 事件只触发一次（常用） -->
            <button @click.once='showInfo'>事件只触发一次</button>  
        </div>
    </body>
    
    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        new Vue({
            el: '#root',
            data: {
                name: '半夏天南星'
            },
            methods: {
                showInfo() {
                    alert('准备跳转')
                }
            }
        })
    </script>
    
    </html>
    ``
```

#### 键盘事件

1、`Vue`中常用的案件别名

|  名称  |               按键               |
| :----: | :------------------------------: |
| `回车` |              `enter              |
| `删除` | `delete（捕获“删除”和“退格”键）` |
| `推出` |              `esc`               |
| `空格` |             `space`              |
| `换行` |              `tab`               |
|  `上`  |               `up`               |
|  `下`  |              `down`              |
|  `左`  |              `left`              |
|  `右`  |             `right`              |

2、`Vue`未提供别名的按键，可以使用按键原始的`key`值去绑定，但注意要转为`kebab-case`（短横线命名）

3、系统修饰键（用法特殊）：`ctrl`、`alt`、`shift`、`meta`

	- 配合`keyup`使用，按下修饰键的同时，再按下其他键，随后释放其他键，事件才能被触发
	- 配合`keydown`使用：正常触发事件

4、也可以使用`keyCode`去指定具体的按键（不推荐）

5、`Vue.config.keyCodes.自定义键名 = 键码`，可以去定制按键别名

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
        <h3>欢迎访问{{name}}的文章</h3>
        <input type="text" placeholder="按下回车键提示输入信息" @keyup.enter='showInfo'>
    </div>
</body>

<script>
    Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
    new Vue({
        el: '#root',
        data: {
            name: '半夏天南星'
        },
        methods: {
            showInfo(e) {
                console.log(e.target.value);
            }
        }
    })
</script>

</html>
```

### 条件渲染

#### v-if

- 写法
    - `v-if = "表达式"`
    - `v-else-if = "表达式"`
    - `v-else = "表达式"`

- 适用于：切换频率较低的场景
- 特点：不展示的`DOM`元素直接被移除
- 注意：`v-if`可以和`v-else-if`、`v-else`一起使用，但要求结构不能被`打断`

#### v-show

- 写法：`v-show="表达式"`
- 适用于：切换频率较高的场景
- 特点：不展示的`DOM`元素未被移除，仅仅是使用样式隐藏掉

#### 备注

使用`v-if`的时候，元素可能无法获取到，而使用`v-show`一定可以获取到

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>条件渲染</title>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <!-- 使用v-show条件渲染 -->
        <!-- <h3 v-show="false">欢迎查看{{name}}的文章</h3> -->
        <h3 v-show="1 === 1">欢迎查看{{name}}的文章</h3>
        <!-- 使用v-if条件渲染 -->
        <!-- <h3 v-if="false">欢迎查看{{name}}的文章</h3> -->
        <h3 v-if="1 === 1">欢迎查看{{name}}的文章</h3>
        <button @click='n++'>点击+1</button>
        <!-- v-if与template的配合使用 -->
        <template v-if="n === 1">
            <h3>你好</h3>
            <h3>半夏天南星</h3>
            <h3>浙江-杭州</h3>
        </template>
    </div>
</body>

<script>
    Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
    new Vue({
        el: '#root',
        data: {
            name: '半夏天南星',
            n: 0,
        }
    })
</script>

</html>
```

### 列表渲染

#### v-for

1. 用于展示列表数据
2. 语法：`v-for="(item,index) in xxx" :key="yyy"`
3. 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>列表渲染</title>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <h3>学生列表</h3>
        <ul>
            <li v-for="(p,index) in personList" :key="index">
                {{p.name}} -- {{p.age}}
            </li>
        </ul>
    </div>
</body>

<script>
    Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
    new Vue({
        el: '#root',
        data: {
            personList: [
                { id: 1, name: '张三', age: 18 },
                { id: 2, name: '李四', age: 19 },
                { id: 3, name: '王五', age: 20 },
            ]
        }
    })
</script>

</html>
```

#### key的原理

##### 虚拟DOM中key的作用

`key`的虚拟`DOM`对象的标识，当状态中的数据发生变化时，`Vue`会根据`新数据`生成`新的虚拟DOM`，随后`Vue`进行`新的虚拟DOM`与`旧的虚拟DOM`的差异比较

##### 对比规则

- `旧虚拟DOM`中找到了与`新虚拟DOM`相同的`key`
    - 若`虚拟DOM`中内容没变，直接使用之前的`真实DOM`
    - 若`虚拟DOM`中内容变了，则生成`新的真实DOM`，随后替换掉页面中之前的`真实DOM`

- `旧虚拟DOM`中未找到与`新虚拟DOM`相同的`key`
    - 创建`新的真实DOM`，随后渲染到页面

##### 用index作为key可能引发的问题

- 若对数据进行：`逆序添加`、`逆序删除`等`破坏顺序`操作，会产生没有必要的`真实DOM`更新 ===> `界面效果没问题，但效率低`
- 如果结构中还包含`输入类的DOM`，会产生错误`DOM`更新 ===> `界面有问题`

##### 开发中如何选择key

- 最好使用每条数据的唯一标识作为`key`，比如`id`、`手机号`、`身份证号`、`学号`等唯一值
- 如果不存在对数据的`逆序添加`、`逆序删除`等破坏顺序操作，仅用于渲染列表用于展示，使用`index`作为`key`是没有问题的

#### index作为key

![](imgs\图9.jpg)

#### id作为key

![](imgs\图10.jpg)

### 列表过滤

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>列表过滤</title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
    </head>

    <body>
        <div id="root">
            <h3>人员列表</h3>
            <input type="text" placeholder="请输入关键字" v-model="keyWord" />
            <ul>
                <li v-for="(p,index) in filPersons" :key="index">{{p.name}} -- {{p.age}} - {{p.sex}}</li>
            </ul>
        </div>
    </body>

    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        // wwatch实现
        /* new Vue({
            el: '#root',
            data: {
                keyWord: '',
                personList: [
                    { id: 1, name: '马冬梅', age: 18, sex: '女' },
                    { id: 2, name: '周冬雨', age: 19, sex: '女' },
                    { id: 3, name: '周杰伦', age: 20, sex: '男' },
                    { id: 4, name: '温兆伦', age: 21, sex: '男' },
                ],
                filPersons: [],
            },
            watch: {
                keyWord: {
                    immediate: true,  // 初始化时让handler调用一次
                    handler(val) {
                        // filter不改变原数组
                        this.filPersons = this.personList.filter((p) => {
                            return p.name.indexOf(val) !== -1;
                        });
                    },
                },
            },
        }); */
        new Vue({
            el: '#root',
            data: {
                keyWord: '',
                personList: [
                    { id: 1, name: '马冬梅', age: 18, sex: '女' },
                    { id: 2, name: '周冬雨', age: 19, sex: '女' },
                    { id: 3, name: '周杰伦', age: 20, sex: '男' },
                    { id: 4, name: '温兆伦', age: 21, sex: '男' },
                ],
            },
            computed: {
                filPersons() {
                    return this.personList.filter((p) => {
                        return p.name.indexOf(this.keyWord) !== -1;
                    });
                },
            },
        });
    </script>
</html>
```

### 列表排序

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>列表过滤</title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
    </head>

    <body>
        <div id="root">
            <h3>人员列表</h3>
            <input type="text" placeholder="请输入关键字" v-model="keyWord" />
            <button @click="sortType = 0">原顺序</button>
            <button @click="sortType = 1">降序</button>
            <button @click="sortType = 2">升序</button>
            <ul>
                <li v-for="(p,index) in filPersons" :key="p.id">{{p.name}} -- {{p.age}} - {{p.sex}}</li>
            </ul>
        </div>
    </body>

    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        new Vue({
            el: '#root',
            data: {
                sortType: 0,
                keyWord: '',
                personList: [
                    { id: 1, name: '马冬梅', age: 39, sex: '女' },
                    { id: 2, name: '周冬雨', age: 29, sex: '女' },
                    { id: 3, name: '周杰伦', age: 42, sex: '男' },
                    { id: 4, name: '温兆伦', age: 57, sex: '男' },
                ],
            },
            computed: {
                filPersons() {
                    const arr = this.personList.filter((p) => {
                        return p.name.indexOf(this.keyWord) !== -1;
                    });
                    if (this.sortType) {
                        arr.sort((p1, p2) => {
                            return this.sortType == 1 ? p2.age - p1.age : p1.age - p2.age;
                        });
                    }
                    return arr;
                },
            },
        });
    </script>
</html>
```

