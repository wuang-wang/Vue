## 对象语法

### `v-bind:class`设置一个对象，动态切换class

```js
// 样式是否起作用，根据isActive的布尔值是否为true
<div :class="{'active':isActive}">xxx</div>
```

### `:class`可以和`class`共存

```js
/*
当isActive值为true，isError为false，样式为 static和isActive。
当isActive值为false，isError为true，样式为 static和isError。
当isActive值为true，isError为true ，样式为 static和isActive、isError
*/
<div class="static" :class="{'active':isActive,'error':isError}">xxx</div>
```

### ` :class`可以绑定数据中的对象

```js
<div class="static" :class="classobj">xxx</div>
export default {
  data(){
    return{
      classobj:{               //可以直接绑定一个对象，对象里面有多个样式
        active:true,
        error:false
      }
    }
  }
}
```

## 数组语法

### `v-bind:class`设置一个数组 

**使用了数组就要在data中指定重命名**

```js
<div class="static" :class="[activeCls,errorCls]">xxx</div>
export default {
  data(){
    return{
      activeCls:'active',      //相当于样式active样式在div中重命名 为activeCls
      errorCls:'error'
    }
  }
}
<style>
    .active{xxx}
    .error{xxx}
</style>
```

### 三元表达式

```js
<template>
  <div id="app">
    <div class="static" :class="[isActive?activeCls:errorCls,baseClass]">xxx</div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      isActive:true,
      activeCls:'active',           //当isActive值为true时，会执行activeCls对应的样式 active 并且执行baseClass对应的样式 baseclass
      errorCls:'error',             //当isActive值为false时，会执行errorCls对应的样式 error 并且执行baseClass对应的样式 baseclass
      baseClass:'baseclass'
    }
  }
}
</script>
<style scoped>
.active{
  background: red;
}
.error{
  color: white;
}
.baseclass{
  text-align: center;
}
</style>
```

### 数组语法中使用对象语法

```js
<template>
  <div id="app">
    <div class="static" :class="[{'active':isActive},baseClass]">xxx</div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      isActive:true,                   //因为isActive值为true,样式为active 和 baseClass对应的 baseclass 所以样式为 active、baseclass
      activeCls:'active',
      baseClass:'baseclass'
    }
  }
}
</script>
<style scoped>
.active{
  background: red;
}
.baseclass{
  text-align: center;
}
</style>
```
### 定义一个数组通过不同索引值获取不同样式

```js
// 根据support.type的数组变化，索引到classMap对应的样式
<div class="icon" :class="classMap[support.type]"></div>
created () {
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"]
},
```

## 绑定内联样式

```js
<div id="app">
    <div :style="{color:cl,background:bk}">你好吗？</div></div>
<script>
    new Vue({
        el:'#app',
        data:{
            cl:'red',
            bk:'yellow'
        }
    })
</script>
```

直接绑定到一个样式对象，让模板更清晰：

```js
<div id="app">
	<div :style="testObj">你好吗？</div>
</div>
<script>
    new Vue({
        el:'#app',
        data:{
            testObj:{
                color:red;
                background:yellow;
            }
        }
    })
</script>
```