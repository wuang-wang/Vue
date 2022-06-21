<template>
  <div>Home组件</div>
  <button @click="getCarInfo">点击获取数据</button>
  <ul>
    <li v-for="(item, key) in carList" :key="key">
      {{ item.name }} -- {{ item.price }}
    </li>
  </ul>
</template>

<script>
import { ref } from "vue";
import { getCarsList } from "@/request/request";

export default {
  name: "Home",
  setup() {
    const carList = ref();
    async function getCarInfo() {
      const CarInfoParam = {
        // carID: string,
        // carName: string,
      };
      await getCarsList(CarInfoParam).then((res) => {
        carList.value = res.data;
        console.log(carList);
      });
    }

    return { getCarInfo, carList };
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/global.scss";
</style>
