// 定义mutations，用于修改状态(同步)

// 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);

const mutations = {
    changesNames(state) {
        // 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.names = '月影WEB-改变';
    },
    newAges(state, sum) {
        // 同上，这里面的参数除了state之外还传了需要增加的值sum
        state.ages += sum;
    },
};
// vue2
// ----this.$store.commit('changesNames')
// vue3
// ----import { useStore } from 'vuex'
// ----const store = useStore()
// ----store.commit('changesNames')
export default mutations;
