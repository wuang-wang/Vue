<template>
  <div>Home页面</div>
  <button @click="getCarEvent">获取数据</button>
  <div>{{ name }}</div>
  <div>{{ age }}</div>
  <div>
    <router-view></router-view>
  </div>
</template>
 
<script>
import { getCarsList } from "@/servers/request.js";
import { useStore } from "vuex";

export default {
  name: "Home",
  setup() {
    function getCarEvent() {
      getCarsList("/cars")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const store = useStore();
    console.log(store);
    const { name, age } = store.state;

    return {
      getCarEvent,
      name,
      age,
    };
  },
};
</script>