<template>
  <div class="school">
    <h2>名称：{{ name }}</h2>
    <h2>地址：{{ address }}</h2>
    <button @click="showName">点我提示姓名</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "半夏天南星",
      address: "杭州",
    };
  },
  methods: {
    showName() {
      console.log("showName", this);
    },
  },
};
</script>

<style lang="" scoped>
.school {
  background: orange;
}
</style>