## 更新时的问题

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>更新时的一个问题</title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
    </head>

    <body>
        <div id="root">
            <h3>人员列表</h3>
            <button @click="updateMei">更新马冬梅的信息</button>
            <ul>
                <li v-for="(p,index) in personList" :key="p.id">{{p.name}} -- {{p.age}} - {{p.sex}}</li>
            </ul>
        </div>
    </body>

    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        new Vue({
            el: '#root',
            data: {
                personList: [
                    { id: 1, name: '马冬梅', age: 18, sex: '女' },
                    { id: 2, name: '周冬雨', age: 19, sex: '女' },
                    { id: 3, name: '周杰伦', age: 20, sex: '男' },
                    { id: 4, name: '温兆伦', age: 21, sex: '男' },
                ],
            },
            methods: {
                updateMei() {
                    // this.personList[0].name = '马老师';  // 可以正常更改
                    // this.personList[0].age = 50;  // 可以正常更改
                    // this.personList[0].sex = '男';  // 可以正常更改

                    this.personList[0] = { id: 1, name: '马老师', age: 50, sex: '男' }; // 点击之后页面未更新数据；但是数据已经更改了，只不过Vue没有监测到
                },
            },
        });
    </script>
</html>
```

![页面数据未更新](D:\Project\Personal\Vue\文档\imgs\图11.png)

![数据已经更新](D:\Project\Personal\Vue\文档\imgs\图12.png)

## Vue监测数据的原理

### 特点

`vue`的`data`监测机制有以下特点：

- 监测数据为对象的时候，必须先声明属性 ，这个属性才是响应式的
- 增加不存在的属性 不能更新视图 `（vm.$set）`
- 修改数组索引和长度 是不会导致视图更新的
- 数组里套对象 对象是支持响应式变化的，如果是常量则没有效果
- 如果新增的数据 `vue`中也会帮你监控（对象类型）

### 原理

![](D:\Project\Personal\Vue\文档\imgs\图13.png)

把`data`中每一组`key`，`value`都加工成了`get `，`set`的写法。`name`的值不是直接获取的，是通过`get`获取的。当修改`name` 的时候会调用`set`

1. 获取`data`中的每一项，加工`data`(可以做响应式了)
2. `vm._data = data`，将加工后的`data`赋值给`vm._data`
3. 当修改`name`的时候，会引起`set`的调用；`set`调用之后可以重新解析模板；之后生成新的虚拟`dom`，执行`diff算法`后，更新页面

### 监测对象

在`js`中有两种方法可以监测到对象的变化`Object.defineProperty`和`ES6的Proxy`,`vue2.0`采用`Object.defineProperty`来监测对象数据的变化。根据`vue`的使用特性，我们要监测对象的所有`key`值，并且对新增的数据也要监测

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>监测对象</title>
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <script src="../js/vue.js"></script>
    </head>

    <body></body>

    <script>
        let data = {
            name: '半夏天南星',
            address: '浙江 - 杭州',
            student: {
                sName: '张三',
            },
        };

        // 创建一个监视的实例对象，用于监视data中属性的变化
        const obs = new Observer(data);
        console.log(obs);

        // 准备一个vm实例对象
        let vm = {};
        vm._data = data = obs;

        // Vue中也是采用递归的方法处理对象
        function Observer(obj) {
            if (typeof obj !== 'object' || obj == null) {
                return obj;
            }
            // 汇总对象中所有的属性形成一个数组
            const keys = Object.keys(obj); // Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致
            // 遍历
            keys.forEach((k) => {
                defineReactive(obj, k, obj[k]);
            });
        }

        // 递归实现对象处理
        function defineReactive(obj, k, value) {
            // 递归对象的值，如果值为对象，也监测
            Observer(value);
            Object.defineProperty(this, k, {
                get() {
                    // 对于对象 我们在这里 收集依赖 watcher
                    return obj[k];
                },
                set(val) {
                    //给某个key设置值的时候 可能也是一个对象 也需要监听
                    Observer(val);
                    //对象： 在这里触发收集的依赖
                    obj[k] = val;
                },
            });
        }
    </script>
</html>
```

对于对象数据的类型处理，我们使用递归（`Vue中也是采用递归的方法处理对象`）来监测对象的每一个属性，同时，我们可能给对象属性赋的新值也可能是个对象，由于`Object.defineProperty`只能监测对象已声明的属性，对于新的对象，我们也要再次调用`observer(newValue)`。同时，`vue`无法监测`obj`在定义时，没有声明的而后来`新增的属性`如name，或者是`delete this.obj.name`这个变化，也就不会更新视图

### 监测数组

Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

`Object`的侦测方式是通过`getter/setter`来实现的，但是更改数组的方法有`push、pop、shift、unshift、splice、sort、reverse`这些原型方法，这种方式是 `getter/setter`办不到的。 因此要检测数组的变化，我们必须自己来实现，所有`vue`对为数组提供了一个`拦截器`，对于要监测的数组都使用拦截器上的方法。

### 总结

1. `vue`会监视data中所有层次的数据

2. 如何`监测对象`中的数据

   - 通过`setter`实现监视，且要在`new Vue`时就传入要监测的数据

     - 对象中后追加的属性，`Vue`默认不做响应式处理

     - 如需给后添加的属性做响应式，请使用如下`API`：

       `Vue.set(target，propertyName/index，value) `或 ` vm.$set(target，propertyName/index，value)`

3. 如何`监测数组`中的数据
   - 通过包裹数组更新元素的方法实现，本质就是做了两件事：
     - 调用原生对应的方法对数组进行更新
     - 重新解析模板，进而更新页面。
4. 在`Vue`修改数组中的某个元素一定要用如下方法：
   - 使用这些`API`：`push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`
   - `Vue.set() `或 `vm.$set()`

**特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！**

**注意：在同一个页面中，两个（或以上）v-for并列存在，并且序列号都使用的是index代号，会导致冲突。**

**解决办法： 分别写不同的序列下标，比如 i j ，或者加前后缀如 'i’等**

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
            <button @click="student.age++">年龄+1</button>
            <button @click="addSex">添加列表属性，默认值： 男</button>
            <button @click='student.sex = "未知"'>修改性别</button>
            <button @click="addFriend">在列表首位添加一个朋友</button>
            <button @click="updateName">修改第一个朋友的名字为：张三</button>
            <button @click="addHobby">添加一个爱好</button>
            <button @click="updateHobby">修改第一个爱好为：烹饪</button>
            <h3>学生姓名： {{student.name}}</h3>
            <h3>学生年龄： {{student.age}}</h3>
            <h3 v-if="student.sex">学生性别： {{student.sex}}</h3>
            <h4>爱好：</h4>
            <li v-for="(h,index) in student.hobby" :key="'i'+index">{{h}}</li>
            <h4>朋友列表：</h4>
            <li v-for="(f,index) in student.friends" :key="'j'+index">{{f.name}} -- {{f.age}}</li>
        </div>
    </body>

    <script>
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
        new Vue({
            el: '#root',
            data: {
                student: {
                    name: '半夏天南星',
                    age: 23,
                    hobby: ['动漫', '电影', '爬山'],
                    friends: [
                        {
                            name: 'Tom',
                            age: 25,
                        },
                        {
                            name: 'Jerry',
                            age: 21,
                        },
                    ],
                },
            },
            methods: {
                addSex() {
                    // 方式一
                    // Vue.set(this.student,'sex','男')
                    // 方式二
                    this.$set(this.student, 'sex', '男');
                },
                addFriend() {
                    this.student.friends.unshift({
                        name: 'Jack',
                        age: 24,
                    });
                },
                updateName() {
                    this.student.friends[0].name = '张三';
                },
                addHobby() {
                    this.student.hobby.push('学习');
                },
                updateHobby() {
                    // this.student.hobby.splice(0,1,'烹饪')
                    // Vue.set(this.student.hobby, 0, '烹饪');
                    this.$set(this.student.hobby, 0, '烹饪');
                },
            },
        });
    </script>
</html>
```

