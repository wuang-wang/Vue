<template>
  <div class="school">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "半夏天南星",
      age: 18,
    };
  },
};
</script>