// 该文件用于创建Vuex中最为核心的store

// 引入Vue核心库
import { setTimeout } from 'core-js'
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 应用Vuex插件
Vue.use(Vuex)

// 准备actions - 用于响应组件中的动作
const actions = {
    // // 加
    // increment(context, value) {
    //     context.commit('INCREMENT', value)
    // },
    // // 减
    // decrenent(context, value) {
    //     context.commit('DECREMENT', value)
    // },
    // 为奇数加
    incrementOdd(context, value) {
        if (context.state.sum % 2) {
            context.commit('INCREMENT', value)
        }
    },
    // 等一等再加
    incrementWait(context, value) {
        setTimeout(() => {
            context.commit('INCREMENT', value)
        }, 500)
    }
}
// 准备mutations - 用于操作数据（state）
const mutations = {
    INCREMENT(state, value) {
        state.sum += value
    },
    DECREMENT(state, value) {
        state.sum -= value
    },
}
// 准备state - 用于存储数据
const state = {
    sum: 0
}
// 准备getters - 用于将state中的数据进行加工
const getters = {
    bigSum(state) {
        return state.sum * 10
    }
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
})