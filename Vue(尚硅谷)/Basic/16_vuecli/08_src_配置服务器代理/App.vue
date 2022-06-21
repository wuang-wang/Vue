<template>
  <div id="root">
    <button @click="getInfo">获取数据</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  methods: {
    getInfo() {
      axios
        .get(
          "https://www.fastmock.site/mock/3c15a1cc9a5d206686a03d453e410267/vue/student"
        )
        .then(
          (response) => {
            console.log("数据请求成功", response.data.data);
          },
          (error) => {
            console.log("数据请求失败", error.message);
          }
        );
    },
  },
};
</script>

<style>
</style>