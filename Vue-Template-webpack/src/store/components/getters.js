// 实时监听state值的变化(最新状态)，
// 只是用来方便监听最新的state的变化

const getters = {
    isShow(state) {
        // 承载变化的 names 的值
        return state.names;
    },
    getChangeAges(state) {
        //承载变化的 ages 的值
        return state.ages;
    },
};
// vue2
// ----this.$store.getters.getChangeAges
// vue3
// ----import { useStore } from 'vuex'
// ----const store = useStore()
// ----store.getters.getChangeAges
export default getters;
