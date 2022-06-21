<template>
  <div class="container">
    <Category title="美食">
      <img
        src="https://pic3.zhimg.com/v2-3dce8237284f1f78bacce3e9fa883e90_r.jpg?source=1940ef5c"
        alt=""
        slot="center"
      />
      <a href="https://www.bilibili.com/video/BV1Zy4y1K7SH?p=103&spm_id_from=pageDriver" slot="footer">更多美食</a>
    </Category>

    <Category title="游戏">
      <ul slot="center">
        <li v-for="(item, index) in games" :key="index">{{ item }}</li>
      </ul>
    </Category>

    <Category title="电影">
      <ul slot="center">
        <li v-for="(item, index) in films" :key="index">{{ item }}</li>
      </ul>
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category";

export default {
  name: "App",
  components: {
    Category,
  },
  data() {
    return {
      foods: ["火锅", "烧烤", "小龙虾", "牛排"],
      games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
      films: ["《教父》", "《拆弹专家》", "《你好，李焕英》", "《怒火重案》"],
    };
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
}
</style>