<template>
  <div>
    <TabBar>
      <TabBarItem path="/home">
        <span class="iconfont icon-shouye" slot="item-icon"></span>
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path="/category">
        <span class="iconfont icon-classify-on" slot="item-icon"></span>
        <div slot="item-text">分类</div>
      </TabBarItem>
      <TabBarItem path="/cart">
        <span class="iconfont icon-gouwuche" slot="item-icon"></span>
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem path="/profile">
        <span class="iconfont icon-wode" slot="item-icon"></span>
        <div slot="item-text">我的</div>
      </TabBarItem>
    </TabBar>
  </div>
</template>

<script>
// 引入底部tabbar组件
import TabBar from "./tabbar/TabBar";
// 引入底部tabbar-item组件
import TabBarItem from "./tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  data() {
    return {};
  },
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped></style>
