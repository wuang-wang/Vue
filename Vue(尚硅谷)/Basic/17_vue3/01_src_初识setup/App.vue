<template>
  <h1>App组件</h1>
  <h2>{{ name }}</h2>
  <h2>{{ age }}</h2>
  <button @click="sayHello">说话</button>
</template>

<script>
export default {
  name: "App",
  setup() {
    let name = "张三";
    let age = "20";

    function sayHello() {
      alert(`我叫${name},今年${age}!`);
    }

    // 返回一个对象
    return {
      name,
      age,
      sayHello,
    };
  },
};
</script>
