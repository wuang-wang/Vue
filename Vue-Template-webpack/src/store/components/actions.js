// 定义actions，用于修改状态(异步)

const actions = {
    changesNames(context) {
        // 自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        context.commit('changesNames');
    },
    getNewAges(context, num) {
        // 同上注释，num为要变化的形参
        context.commit('newAges', num);
    },
};
// vue2
// ----this.$store.dispatch('getNewNum',1)
// vue3
// ----import { useStore } from 'vuex'
// ----const store = useStore()
// ----store.dispatch('getNewNum',1)
export default actions;
