<template>
  <h1>App组件</h1>
  <h2>{{ name }}</h2>
  <h2>{{ age }}</h2>
  <h2>{{ job.type }}</h2>
  <h2>{{ job.salary }}</h2>
  <button @click="changeInfo">修改信息</button>
</template>

<script>
import { ref,reactive } from "vue";
export default {
  name: "App",
  setup() {
    let name = ref("张三");
    let age = ref(20);
    let job = reactive({
      type: "前端工程师",
      salary: "20K",
    });

    function changeInfo() {
      name.value = "李四";
      age.value = 24;
      job.type = "UI设计师";
      job.salary = "15K";
    }
    // 返回一个对象
    return {
      name,
      age,
      job,
      changeInfo,
    };
  },
};
</script>
