<template>
  <div>
    <User name="半夏天南星" :age="24" address="浙江 - 杭州" />
  </div>
</template>

<script>
import User from "./components/User.vue";
export default {
  name: "App",
  components: {
    User,
  },
};
</script>