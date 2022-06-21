<template>
  <div class="school">
    <h2>{{ msg }}</h2>
    <h3 @click="showName">名称：{{ name }}</h3>
    <h3>地址：{{ address }}</h3>
  </div>
</template>

<script>
import { hybrid } from "../mixin";
export default {
  name: "School",
  data() {
    return {
      msg: "学校信息",
      name: "XXXX学院",
      address: "浙江 - 杭州",
    };
  },
  mixins: [hybrid],
};
</script>

<style>
</style>