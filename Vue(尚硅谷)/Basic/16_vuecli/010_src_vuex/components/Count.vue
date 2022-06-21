<template>
  <div>
    <h1>当前和为:{{ $store.state.sum }}</h1>
    <h1>当前和扩大10倍为:{{ $store.getters.bigSum }}</h1>
    <select name="" id="" v-model.number="step">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrenent">-</button>
    <button @click="incrementOdd">当前和为奇数再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
    };
  },
  mounted() {
    // console.log(this.$store);
  },
  methods: {
    increment() {
      this.$store.commit("INCREMENT", this.step);
    },
    decrenent() {
      this.$store.commit("DECREMENT", this.step);
    },
    incrementOdd() {
      this.$store.dispatch("incrementOdd", this.step);
    },
    incrementWait() {
      this.$store.dispatch("incrementWait", this.step);
    },
  },
};
</script>

<style lang="less" scoped>
button {
  margin-left: 10px;
}
</style>>