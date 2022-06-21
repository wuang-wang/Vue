<template>
  <div class="school">
    <h2>{{ msg }}</h2>
    <h3>名称：{{ name }}</h3>
    <h3>年龄：{{ age }}</h3>
    <h3>地址：{{ address }}</h3>
    <button @click="sendUserName">发送用户名</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      msg: "用户信息",
      name: "半夏天南星",
      age: "24",
      address: "浙江 - 杭州",
    };
  },
  methods: {
    sendUserName() {
      // 触发自定义事件
      this.$bus.$emit('hello',this.name)
    }
  },
};
</script>

<style>
</style>