<template>
  <div class="school">
    <h2>{{ msg }}</h2>
    <h3>名称：{{ name }}</h3>
    <h3>名称：{{ age }}</h3>
    <h3>地址：{{ address }}</h3>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      msg: "用户信息",
    };
  },
  // 简单声明接收
  // props: ["name", "age", "address"],

  // 接收时对类型进行限制
  // props: {
  //   name: String,
  //   address: String,
  //   age: Number,
  // },

// 接收的同时对数据：进行类型限制 + 默认值的指定 + 必要性的限制
  props: {
    name: {
      type: String,
      require: true,  // 设置必传
    },
    age: {
      type: Number,
      default: 18,  // 默认值
    },
    address: {
      type: String,
      require: true,
    },
  },
};
</script>

<style>
</style>