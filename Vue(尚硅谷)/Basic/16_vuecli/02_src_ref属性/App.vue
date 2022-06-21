<template>
  <div>
    <h2 v-text="msg" ref="title"></h2>
    <User ref="user"></User>
    <button @click="showDOM">点击显示对应DOM</button>
  </div>
</template>

<script>
import User from "./components/User.vue";
export default {
  name: "App",
  components: {
    User,
  },
  data() {
    return {
      msg: "Vue脚手架学习！",
    };
  },
  methods: {
    showDOM() {
      console.log(this.$refs.title);  // 获取真实DOM
      console.log(this.$refs.user);  // 获取真实DOM
    },
  },
};
</script>