<template>
  <div class="school">
    <h2>{{ msg }}</h2>
    <h3>名称：{{ name }}</h3>
    <h3>地址：{{ address }}</h3>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      msg: "学校信息",
      name: "XXXX学院",
      address: "浙江 - 杭州",
    };
  },
  mounted() {
    // 绑定hello事件
    this.$bus.$on("hello", (data) => {
      console.log("我是School组件，收到了数据", data);
    });
  },
  beforeDestroy() {
    this.$bus.$off("hello");
  },
};
</script>

<style>
</style>