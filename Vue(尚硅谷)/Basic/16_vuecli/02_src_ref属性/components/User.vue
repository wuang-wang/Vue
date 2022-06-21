<template>
  <div class="school">
    <h3>名称：{{ name }}</h3>
    <h3>地址：{{ address }}</h3>
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
};
</script>

<style>
.school {
  background: #ccc;
}
</style>