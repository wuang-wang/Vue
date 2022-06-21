<template>
  <h1>当前数值为：{{ num }}</h1>
  <button @click="num++">数值++</button>
  <hr />
  <h1>{{ msg }}</h1>
  <button @click="msg += '~'">更新信息</button>
  <hr />
  <h1>姓名：{{ person.name }}</h1>
  <h1>姓名：{{ person.age }}</h1>
  <h1>薪资：{{ person.job.j1.salary }}K</h1>
  <button @click="person.name += '@'">修改姓名</button>
  <button @click="person.age++">修改年龄</button>
  <button @click="person.job.j1.salary++">修改薪资</button>
</template>

<script>
import { reactive, ref, watch } from "vue";
export default {
  name: "App",
  setup() {
    let num = ref(0);
    let msg = ref("你好啊");
    let person = reactive({
      name: "张三",
      age: "18",
      job: {
        j1: {
          salary: 20,
        },
      },
    });

    // 情况一：监视ref定义的一个响应式数据
    // watch(num, (newValue, oldValue) => {
    //   console.log("监听的数据变化了", newValue, oldValue);
    // },{immediate:true});

    // 情况二：监视ref定义的多个响应式数据
    // watch(
    //   [num, msg],
    //   (newValue, oldValue) => {
    //     console.log("监听的数据变化了", newValue, oldValue);
    //   },
    //   { immediate: true }
    // );

    /*
     * 情况三：监视reactive定义的一个响应式数据中的全部属性
     * 注意：
     *    1、此处无法正确的获取oldValue
     *    2、强制开启了深度监视（deep配置无效）
     */
    // watch(person, (newValue, oldValue) => {
    //   console.log("监听的数据变化了", newValue, oldValue);
    // },{deep:false});  // 此处配置深度监听无效

    // 情况四：监视reactive定义的一个响应式数据中的某一个属性
    // watch(
    //   () => person.age,
    //   (newValue, oldValue) => {
    //     console.log("监听的数据变化了", newValue, oldValue);
    //   }
    // );

    // 情况五：监视reactive定义的一个响应式数据中的某些属性
    // watch([() => person.name, () => person.age], (newValue, oldValue) => {
    //   console.log("监听的数据变化了", newValue, oldValue);
    // });

    // 特殊情况
    watch(
      () => person.job,
      (newValue, oldValue) => {
        console.log("监听的数据变化了", newValue, oldValue);
      },
      { deep: true }
    ); // 此处由于监视的是reactive所定义的对象中的某个属性（且这个属性的值也为对象），所以deep配置有效

    return {
      num,
      msg,
      person,
    };
  },
};
</script>
