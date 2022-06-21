import { createStore } from 'vuex';

import state from './components/state';
import actions from './components/actions';
import getters from './components/getters';
import mutations from './components/mutations';
import modA from './storeModules/modA.js';

// 全局store,存放全局使用共享的数据
// 注意：全局模块中不需要开启命名空间
export default createStore({
    state, // 设置的初始属性值
    getters, // 实时监听state值的变化(最新状态)
    mutations, // 定义mutations，用于修改状态(同步)
    actions, // 定义actions，用于修改状态(异步)
    // 局部模块
    modules: {
        modA,
    },
});
