<template>
  <div>
    <User />
    <hr />
    <School />
  </div>
</template>

<script>
import School from "./components/School.vue";
import User from "./components/User.vue";
export default {
  name: "App",
  components: {
    User,
    School,
  },
};
</script>