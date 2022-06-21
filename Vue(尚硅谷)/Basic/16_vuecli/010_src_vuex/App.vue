<template>
  <div class="container">
    <Count> </Count>
  </div>
</template>

<script>
import Count from "./components/Count";

export default {
  name: "App",
  components: {
    Count,
  },
  data() {
    return {};
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
}
</style>