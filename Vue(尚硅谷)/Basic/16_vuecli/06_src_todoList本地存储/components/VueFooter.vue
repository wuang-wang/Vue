<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ totalDone }}</span> / 全部{{ total }}
    </span>
    <button class="btn btn-danger" @click="clearDone">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "VueFooter",
  props: ["todos", "isAllChecked", "clearAllDone"],
  data() {
    return {};
  },
  computed: {
    // 全部数量
    total() {
      return this.todos.length;
    },
    // 已完成数量
    totalDone() {
      return this.todos.reduce(
        (pre, current) => pre + (current.done ? 1 : 0),
        0
      );
    },
    // 是否全部勾选
    isAll: {
      get() {
        return this.totalDone === this.total && this.total > 0;
      },
      set(value) {
        this.isAllChecked(value);
      },
    },
  },
  methods: {
    clearDone() {
      this.clearAllDone();
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>