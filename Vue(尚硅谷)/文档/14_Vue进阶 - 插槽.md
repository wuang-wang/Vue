### 作用

让父组件可以向子组件指定位置插入`html`结构，也是一种组件间通信的方式，适用于`父组件 ===> 子组件`

### 分类

`默认插槽`、`具名插槽`、`作用域插槽`

### 使用方式

#### 默认插槽

```js
// 父组件
<Category title="美食">
    html结构
</Category>

// 子组件
<template>
  <div class="category">
    <!-- 定义插槽 -->
    <slot>插槽默认内容</slot>
  </div>
</template>
```

#### 具名插槽

```js
// 父组件
<Category>
    <template slot="center">
        <div>html结构1</div>
	</template>
	<template slot="footer">
        <div>html结构2</div>
	</template>
</Category>

// 子组件
<template>
  <div>
    <!-- 定义插槽 -->
    <slot name='center'>插槽默认内容...</slot>
	<slot name='footer'>插槽默认内容...</slot>
  </div>
</template>
```

#### 作用域插槽

##### 理解

+ 数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）
+ 具体编码：

```js
// 父组件
<Category title="游戏">
    <template scope="{games}">
        <ul>
        	<li v-for="(item, index) in games" :key="index">{{ item }}</li>
		</ul>
	</template>
</Category>

// 子组件
<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot :games="games"></slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title"],
  // 数据在子组件
  data() {
    return {
      games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
    };
  },
};
</script>
```

