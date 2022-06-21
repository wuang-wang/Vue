// .vue文件可以通过 store 获取初始状态数据
 
const state = {
    name: '吾昂王',
    age:18
}
// vue2 
// ----this.$store.state.names 
// vue3 
// ----import { useStore } from 'vuex'
// ----const store = useStore()
// ----store.state.names
export default state;