<template>
  <ul>
    <li v-for="item in newsList" :key="item.id">
      {{ item.title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      newsList: [
        { id: "001", title: "新闻001" },
        { id: "002", title: "新闻002" },
        { id: "003", title: "新闻003" },
      ],
    };
  },
};
</script>

<style>
</style>