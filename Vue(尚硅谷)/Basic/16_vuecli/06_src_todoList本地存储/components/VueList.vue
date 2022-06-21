<template>
  <ul class="todo-main">
    <!-- 通过属性的方式传递数据 -->
    <VueItem
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todo="todoObj"
      :checkToDo="checkToDo"
      :deleteToDo="deleteToDo"
    />
  </ul>
</template>

<script>
import VueItem from "./VueItem.vue";

export default {
  name: "VueList",
  components: {
    VueItem,
  },
  props: ["todos", "checkToDo", "deleteToDo"],
};
</script>

<style lang="scss" scoped>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>