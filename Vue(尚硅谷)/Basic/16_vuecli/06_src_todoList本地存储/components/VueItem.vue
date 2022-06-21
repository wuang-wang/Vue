<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="todo.done"
        @change="handleCheck(todo.id)"
      />
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
  </li>
</template>

<script>
export default {
  name: "VueItem",
  // 接收数据
  props: ["todo", "checkToDo", "deleteToDo"],
  data() {
    return {};
  },
  methods: {
    // 传递勾选 or 取消的id
    handleCheck(id) {
      this.checkToDo(id);
    },
    // 删除todo
    handleDelete(id) {
      if(confirm('确认删除？')){
        this.deleteToDo(id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
li label {
  float: left;
  cursor: pointer;
}
li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}
li button {
  float: right;
  display: none;
  margin-top: 3px;
}
li:before {
  content: initial;
}
li:last-child {
  border-bottom: none;
}
li:hover {
  background: #ccc;
}
li:hover button {
  display: block;
}
</style>