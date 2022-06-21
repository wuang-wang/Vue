## 定义

- 一种组件间通信的方式，适用于：`子组件 ===> 父组件`

## 使用场景

- A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（`事件的回调在A中`）

## 绑定

- 方式一：在父组件中`<School @schoolName="getSchoolName" />`或`<School v-on:schoolName="getSchoolName" />`

- 方式二：在父组件中：

    ```js
    <School ref="school" />
    ......
    mounted() {
        this.$refs.school.$on('schoolName',this.getSchoolName)
    }
    ```

- 若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法

- 触发自定义事件`this.$emit('schoolName', this.name);`

## 解绑

- `this.$off('schoolName');`



- 组件上也可以绑定原生`DOM事件`，需要使用`native`修饰符
- 注意：通过`this.$refs.xxx.$on('schoolName',回调)`绑定自定义事件时，回调`要么配置在methods中，要么使用箭头函数`，否则`this`指向会出问题