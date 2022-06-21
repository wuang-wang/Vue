<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot name="center"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title"],
};
</script>

<style lang="scss" scoped>
.category {
  background: skyblue;
  width: 30%;
  height: 500px;

  h3 {
    text-align: center;
    background: coral;
  }

  img {
    width: 100%;
  }
}
</style>