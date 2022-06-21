<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot :games="games"></slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title"],
  data() {
    return {
      games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
    };
  },
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